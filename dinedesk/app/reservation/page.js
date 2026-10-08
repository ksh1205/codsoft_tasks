"use client";

import { useState } from "react";
import Link from "next/link";

export default function ReservationPage() {
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    date: "",
    guests: 2
  });

  async function submitReservation(e) {
    e.preventDefault();

    const response = await fetch(
      "/api/reservations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.error);
      return;
    }

    alert("Table reserved successfully!");

    setForm({
      customerName: "",
      phone: "",
      date: "",
      guests: 2
    });
  }

  return (
    <main className="min-h-screen bg-orange-50">

      <nav className="bg-white shadow-sm px-6 py-5">
        <Link
          href="/"
          className="text-2xl font-bold text-orange-600"
        >
          🍽️ DineDesk
        </Link>
      </nav>

      <section className="max-w-xl mx-auto px-6 py-16">

        <div className="bg-white rounded-xl shadow-sm p-8">

          <h1 className="text-3xl font-bold">
            Reserve a Table
          </h1>

          <p className="text-gray-500 mt-2">
            Book your table in advance.
          </p>

          <form
            onSubmit={submitReservation}
            className="mt-8"
          >

            <input
              required
              className="w-full border p-3 rounded-lg"
              placeholder="Full Name"
              value={form.customerName}
              onChange={(e) =>
                setForm({
                  ...form,
                  customerName: e.target.value
                })
              }
            />

            <input
              required
              className="w-full border p-3 rounded-lg mt-4"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value
                })
              }
            />

            <input
              required
              type="datetime-local"
              className="w-full border p-3 rounded-lg mt-4"
              value={form.date}
              onChange={(e) =>
                setForm({
                  ...form,
                  date: e.target.value
                })
              }
            />

            <input
              required
              type="number"
              min="1"
              max="12"
              className="w-full border p-3 rounded-lg mt-4"
              value={form.guests}
              onChange={(e) =>
                setForm({
                  ...form,
                  guests: e.target.value
                })
              }
            />

            <button
              className="w-full bg-orange-600 text-white py-3 rounded-lg mt-5 font-bold"
            >
              Reserve Table
            </button>

          </form>

        </div>

      </section>

    </main>
  );
}