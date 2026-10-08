"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    const saved = localStorage.getItem("dinedesk-cart");

    if (saved) {
      setCart(JSON.parse(saved));
    }
  }, []);

  function updateQuantity(id, change) {
    const updated = cart
      .map((item) =>
        item.menuItemId === id
          ? {
              ...item,
              quantity: item.quantity + change
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updated);

    localStorage.setItem(
      "dinedesk-cart",
      JSON.stringify(updated)
    );
  }

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  async function placeOrder() {
    if (!customer.name || !customer.phone) {
      alert("Please enter your name and phone.");
      return;
    }

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        customerName: customer.name,
        phone: customer.phone,
        address: customer.address,
        items: cart
      })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error);
      return;
    }

    localStorage.removeItem("dinedesk-cart");

    setCart([]);

    alert(
      `Order #${data.id} placed successfully!`
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">

      <nav className="bg-white shadow-sm px-6 py-5">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/menu"
            className="text-orange-600 font-semibold"
          >
            ← Back to Menu
          </Link>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-6 py-12">

        <h1 className="text-4xl font-bold">
          Your Cart
        </h1>

        {cart.length === 0 ? (

          <div className="bg-white p-10 rounded-xl mt-8 text-center">

            <p className="text-gray-500">
              Your cart is empty.
            </p>

            <Link
              href="/menu"
              className="inline-block mt-5 bg-orange-600 text-white px-6 py-3 rounded-lg"
            >
              Browse Menu
            </Link>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 gap-8 mt-8">

            <div className="bg-white rounded-xl p-6">

              {cart.map((item) => (

                <div
                  key={item.menuItemId}
                  className="flex justify-between items-center border-b py-5"
                >

                  <div>
                    <h3 className="font-bold">
                      {item.name}
                    </h3>

                    <p className="text-gray-500">
                      ₹{item.price}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">

                    <button
                      onClick={() =>
                        updateQuantity(
                          item.menuItemId,
                          -1
                        )
                      }
                      className="border px-3 py-1 rounded"
                    >
                      −
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(
                          item.menuItemId,
                          1
                        )
                      }
                      className="border px-3 py-1 rounded"
                    >
                      +
                    </button>

                  </div>

                </div>

              ))}

              <div className="flex justify-between mt-6 text-xl font-bold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

            </div>


            <div className="bg-white rounded-xl p-6">

              <h2 className="text-2xl font-bold">
                Checkout
              </h2>

              <input
                className="w-full border p-3 rounded-lg mt-5"
                placeholder="Full Name"
                value={customer.name}
                onChange={(e) =>
                  setCustomer({
                    ...customer,
                    name: e.target.value
                  })
                }
              />

              <input
                className="w-full border p-3 rounded-lg mt-4"
                placeholder="Phone Number"
                value={customer.phone}
                onChange={(e) =>
                  setCustomer({
                    ...customer,
                    phone: e.target.value
                  })
                }
              />

              <textarea
                className="w-full border p-3 rounded-lg mt-4"
                placeholder="Delivery Address"
                value={customer.address}
                onChange={(e) =>
                  setCustomer({
                    ...customer,
                    address: e.target.value
                  })
                }
              />

              <button
                onClick={placeOrder}
                className="w-full bg-orange-600 text-white py-3 rounded-lg mt-5 font-bold"
              >
                Place Order — ₹{total}
              </button>

            </div>

          </div>

        )}

      </section>

    </main>
  );
}