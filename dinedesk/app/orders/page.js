"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">

      <nav className="bg-white shadow-sm px-6 py-5">

        <div className="max-w-6xl mx-auto flex justify-between">

          <Link
            href="/"
            className="text-2xl font-bold text-orange-600"
          >
            🍽️ DineDesk
          </Link>

          <Link href="/menu">
            Menu
          </Link>

        </div>

      </nav>

      <section className="max-w-5xl mx-auto px-6 py-12">

        <h1 className="text-4xl font-bold">
          Orders
        </h1>

        <div className="space-y-5 mt-8">

          {orders.map((order) => (

            <div
              key={order.id}
              className="bg-white p-6 rounded-xl shadow-sm"
            >

              <div className="flex justify-between">

                <div>
                  <h2 className="text-xl font-bold">
                    Order #{order.id}
                  </h2>

                  <p className="text-gray-500">
                    {order.customerName}
                  </p>
                </div>

                <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full h-fit">
                  {order.status}
                </span>

              </div>

              <div className="mt-5">

                {order.items.map((item) => (

                  <div
                    key={item.id}
                    className="flex justify-between py-2"
                  >
                    <span>
                      {item.menuItem.name} × {item.quantity}
                    </span>

                    <span>
                      ₹{item.price * item.quantity}
                    </span>
                  </div>

                ))}

              </div>

              <div className="border-t mt-4 pt-4 flex justify-between font-bold">
                <span>Total</span>
                <span>₹{order.total}</span>
              </div>

            </div>

          ))}

          {orders.length === 0 && (
            <div className="bg-white p-10 rounded-xl text-center text-gray-500">
              No orders placed yet.
            </div>
          )}

        </div>

      </section>

    </main>
  );
}