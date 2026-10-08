"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);

  async function loadData() {
    const ordersResponse =
      await fetch("/api/orders");

    const reservationsResponse =
      await fetch("/api/reservations");

    setOrders(
      await ordersResponse.json()
    );

    setReservations(
      await reservationsResponse.json()
    );
  }

  useEffect(() => {
    loadData();
  }, []);

  async function updateStatus(id, status) {
    await fetch("/api/orders", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id,
        status
      })
    });

    loadData();
  }

  const revenue = orders.reduce(
    (sum, order) => sum + order.total,
    0
  );

  return (
    <main className="min-h-screen bg-gray-100">

      <nav className="bg-gray-900 text-white px-8 py-5">
        <h1 className="text-2xl font-bold">
          DineDesk Admin Dashboard
        </h1>
      </nav>

      <section className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500">
              Total Orders
            </p>
            <h2 className="text-3xl font-bold mt-2">
              {orders.length}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500">
              Reservations
            </p>
            <h2 className="text-3xl font-bold mt-2">
              {reservations.length}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500">
              Revenue
            </p>
            <h2 className="text-3xl font-bold mt-2">
              ₹{revenue}
            </h2>
          </div>

        </div>


        <div className="bg-white rounded-xl p-6 mt-8">

          <h2 className="text-2xl font-bold">
            Order Management
          </h2>

          <div className="overflow-x-auto mt-5">

            <table className="w-full">

              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">
                    Order
                  </th>

                  <th className="text-left p-3">
                    Customer
                  </th>

                  <th className="text-left p-3">
                    Total
                  </th>

                  <th className="text-left p-3">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>

                {orders.map((order) => (

                  <tr
                    key={order.id}
                    className="border-b"
                  >

                    <td className="p-3">
                      #{order.id}
                    </td>

                    <td className="p-3">
                      {order.customerName}
                    </td>

                    <td className="p-3">
                      ₹{order.total}
                    </td>

                    <td className="p-3">

                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateStatus(
                            order.id,
                            e.target.value
                          )
                        }
                        className="border rounded p-2"
                      >

                        <option value="PENDING">
                          Pending
                        </option>

                        <option value="CONFIRMED">
                          Confirmed
                        </option>

                        <option value="PREPARING">
                          Preparing
                        </option>

                        <option value="OUT_FOR_DELIVERY">
                          Out for Delivery
                        </option>

                        <option value="DELIVERED">
                          Delivered
                        </option>

                        <option value="CANCELLED">
                          Cancelled
                        </option>

                      </select>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>


        <div className="bg-white rounded-xl p-6 mt-8">

          <h2 className="text-2xl font-bold">
            Table Reservations
          </h2>

          <div className="mt-5 space-y-3">

            {reservations.map((reservation) => (

              <div
                key={reservation.id}
                className="border rounded-lg p-4 flex justify-between"
              >

                <div>
                  <h3 className="font-bold">
                    {reservation.customerName}
                  </h3>

                  <p className="text-gray-500">
                    {reservation.phone}
                  </p>
                </div>

                <div className="text-right">
                  <p>
                    👥 {reservation.guests}
                  </p>

                  <p className="text-sm text-gray-500">
                    {new Date(
                      reservation.date
                    ).toLocaleString()}
                  </p>
                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

    </main>
  );
}