"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MenuPage() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then((data) => setMenu(data));

    const saved = localStorage.getItem("dinedesk-cart");

    if (saved) {
      setCart(JSON.parse(saved));
    }
  }, []);

  function addToCart(item) {
    const existing = cart.find(
      (x) => x.menuItemId === item.id
    );

    let updated;

    if (existing) {
      updated = cart.map((x) =>
        x.menuItemId === item.id
          ? { ...x, quantity: x.quantity + 1 }
          : x
      );
    } else {
      updated = [
        ...cart,
        {
          menuItemId: item.id,
          name: item.name,
          price: item.price,
          quantity: 1
        }
      ];
    }

    setCart(updated);

    localStorage.setItem(
      "dinedesk-cart",
      JSON.stringify(updated)
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">

      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between">

          <Link
            href="/"
            className="text-2xl font-bold text-orange-600"
          >
            🍽️ DineDesk
          </Link>

          <Link
            href="/cart"
            className="bg-orange-600 text-white px-5 py-2 rounded-lg"
          >
            🛒 Cart ({cart.reduce(
              (sum, item) => sum + item.quantity,
              0
            )})
          </Link>

        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-6 py-12">

        <h1 className="text-4xl font-bold">
          Our Menu
        </h1>

        <p className="text-gray-500 mt-2">
          Fresh food prepared specially for you.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-10">

          {menu.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >

              <div className="h-44 bg-orange-100 flex items-center justify-center text-6xl">
                {item.category.name === "Pizza"
                  ? "🍕"
                  : item.category.name === "Burgers"
                  ? "🍔"
                  : "🥤"}
              </div>

              <div className="p-6">

                <span className="text-sm text-orange-600 font-semibold">
                  {item.category.name}
                </span>

                <h2 className="text-xl font-bold mt-2">
                  {item.name}
                </h2>

                <p className="text-gray-500 text-sm mt-2">
                  {item.description}
                </p>

                <div className="flex justify-between items-center mt-6">

                  <span className="text-xl font-bold">
                    ₹{item.price}
                  </span>

                  <button
                    onClick={() => addToCart(item)}
                    className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
                  >
                    Add to Cart
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

    </main>
  );
}
