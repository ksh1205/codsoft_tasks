import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const orders = await prisma.order.findMany({
    include: {
      items: {
        include: {
          menuItem: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return NextResponse.json(orders);
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (
      !body.customerName ||
      !body.phone ||
      !body.items ||
      body.items.length === 0
    ) {
      return NextResponse.json(
        { error: "Missing order information" },
        { status: 400 }
      );
    }

    const ids = body.items.map(
      (item) => Number(item.menuItemId)
    );

    const products = await prisma.menuItem.findMany({
      where: {
        id: {
          in: ids
        }
      }
    });

    let total = 0;

    const orderItems = body.items.map((item) => {
      const product = products.find(
        (p) => p.id === Number(item.menuItemId)
      );

      const quantity = Number(item.quantity);

      total += product.price * quantity;

      return {
        menuItemId: product.id,
        quantity,
        price: product.price
      };
    });

    const order = await prisma.order.create({
      data: {
        customerName: body.customerName,
        phone: body.phone,
        address: body.address || "",
        total,
        items: {
          create: orderItems
        }
      }
    });

    return NextResponse.json(order);

  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  const body = await request.json();

  const order = await prisma.order.update({
    where: {
      id: Number(body.id)
    },
    data: {
      status: body.status
    }
  });

  return NextResponse.json(order);
}