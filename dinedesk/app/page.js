import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-orange-50">

      {/* NAVBAR */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">

          <Link
            href="/"
            className="text-2xl font-bold text-orange-600"
          >
            🍽️ DineDesk
          </Link>

          <div className="flex gap-6 text-gray-700">
            <Link href="/menu" className="hover:text-orange-600">
              Menu
            </Link>

            <Link href="/reservation" className="hover:text-orange-600">
              Reservation
            </Link>

            <Link href="/orders" className="hover:text-orange-600">
              Orders
            </Link>

            <Link href="/admin" className="hover:text-orange-600">
              Admin
            </Link>
          </div>

        </div>
      </nav>


      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">

        <div className="text-6xl mb-6">
          🍕 🍔 🍹
        </div>

        <p className="text-orange-600 font-semibold tracking-wide">
          ONLINE RESTAURANT ORDERING
        </p>

        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mt-4">
          Delicious food,
          <br />
          delivered with ease.
        </h1>

        <p className="max-w-2xl mx-auto text-gray-600 text-lg mt-6">
          Order your favourite meals online, reserve tables,
          and track your orders using DineDesk.
        </p>

        <div className="flex justify-center gap-4 mt-8">

          <Link
            href="/menu"
            className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700"
          >
            Order Food
          </Link>

          <Link
            href="/reservation"
            className="border border-orange-600 text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-100"
          >
            Reserve Table
          </Link>

        </div>

      </section>


      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 pb-20">

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white rounded-xl p-7 shadow-sm">

            <div className="text-4xl">
              🍕
            </div>

            <h2 className="text-xl font-bold mt-4">
              Digital Menu
            </h2>

            <p className="text-gray-600 mt-2">
              Browse food items by category and
              choose your favourite dishes.
            </p>

          </div>


          <div className="bg-white rounded-xl p-7 shadow-sm">

            <div className="text-4xl">
              🛒
            </div>

            <h2 className="text-xl font-bold mt-4">
              Online Ordering
            </h2>

            <p className="text-gray-600 mt-2">
              Add items to your cart and place
              your restaurant order online.
            </p>

          </div>


          <div className="bg-white rounded-xl p-7 shadow-sm">

            <div className="text-4xl">
              🪑
            </div>

            <h2 className="text-xl font-bold mt-4">
              Table Reservation
            </h2>

            <p className="text-gray-600 mt-2">
              Reserve a table before visiting
              the restaurant.
            </p>

          </div>

        </div>

      </section>


      {/* FOOTER */}
      <footer className="bg-gray-900 text-white text-center py-6">

        <p>
          © 2026 DineDesk — Restaurant Ordering Platform
        </p>

      </footer>

    </main>
  );
}