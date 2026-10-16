
import Link from "next/link";
import { getBusinesses } from "@/lib/businesses";

export default async function BusinessesPage() {
  const shops = await getBusinesses();

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link href="/" className="text-2xl font-bold text-green-700">
            ApnaSaathi
          </Link>

          <Link
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-green-700"
          >
            Home
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-10">
        <h1 className="text-3xl font-bold sm:text-4xl">
          Explore Local Businesses
        </h1>

        <p className="mt-3 text-gray-600">
          Kota ke local businesses aur services discover karo.
        </p>

        <form
          action="/businesses"
          method="GET"
          className="mt-7 flex flex-col gap-3 sm:flex-row"
        >
          <input
            type="search"
            name="q"
            placeholder="Shop ya service search karo..."
            aria-label="Search businesses"
            className="min-w-0 flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-700"
          />

          <button
            type="submit"
            className="rounded-xl bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
          >
            Search
          </button>
        </form>

        <div className="mt-8 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            All Businesses
          </h2>

          <span className="text-sm text-gray-500">
            {shops.length} businesses
          </span>
        </div>

        {shops.length === 0 ? (
          <div className="mt-6 rounded-xl border bg-white p-8 text-center">
            <p className="font-semibold">No businesses available yet.</p>
            <p className="mt-2 text-sm text-gray-500">
              Please check again later.
            </p>
          </div>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shops.map((shop) => (
              <article
                key={shop.id}
                className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-md"
              >
                <span className="inline-block rounded-full bg-green-50 px-3 py-1 text-xs font-semibold capitalize text-green-800">
                  {shop.category.replace(/-/g, " ")}
                </span>

                <h3 className="mt-4 text-xl font-bold">
                  {shop.name}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {shop.description}
                </p>

                <p className="mt-3 text-sm text-gray-500">
                  📍 {shop.city}
                </p>

                <Link
                  href={`/shop/${shop.slug}`}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-green-700 px-4 py-3 font-semibold text-white hover:bg-green-800"
                >
                  View Shop Profile →
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      <footer className="border-t bg-white px-5 py-6 text-center text-sm text-gray-500">
        © 2026 ApnaSaathi · Kota, Rajasthan
      </footer>
    </main>
  );
}
