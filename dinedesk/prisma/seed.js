const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const pizza = await prisma.category.upsert({
    where: { name: "Pizza" },
    update: {},
    create: { name: "Pizza" }
  });

  const burgers = await prisma.category.upsert({
    where: { name: "Burgers" },
    update: {},
    create: { name: "Burgers" }
  });

  const drinks = await prisma.category.upsert({
    where: { name: "Drinks" },
    update: {},
    create: { name: "Drinks" }
  });

  const menuItems = [
    {
      name: "Margherita Pizza",
      description: "Classic tomato, mozzarella and basil",
      price: 249,
      categoryId: pizza.id
    },
    {
      name: "Farmhouse Pizza",
      description: "Fresh vegetables with mozzarella",
      price: 329,
      categoryId: pizza.id
    },
    {
      name: "Cheese Burger",
      description: "Burger with cheddar cheese",
      price: 199,
      categoryId: burgers.id
    },
    {
      name: "Chicken Burger",
      description: "Crispy chicken with special sauce",
      price: 229,
      categoryId: burgers.id
    },
    {
      name: "Cold Coffee",
      description: "Creamy chilled coffee",
      price: 129,
      categoryId: drinks.id
    },
    {
      name: "Fresh Lime Soda",
      description: "Refreshing lime soda",
      price: 89,
      categoryId: drinks.id
    }
  ];

  for (const item of menuItems) {
    const existing = await prisma.menuItem.findFirst({
      where: {
        name: item.name
      }
    });

    if (!existing) {
      await prisma.menuItem.create({
        data: item
      });
    }
  }

  console.log("DineDesk database seeded successfully!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });