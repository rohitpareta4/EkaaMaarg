
import Link from "next/link";
import Image from "next/image";


const categories = [
  { name: "Electricians", icon: "⚡", slug: "electricians" },
  { name: "Restaurants", icon: "🍽️", slug: "restaurants" },
  { name: "Clothing", icon: "👕", slug: "clothing" },
  { name: "Electronics", icon: "🔌", slug: "electronics" },
  { name: "Beauty & Salon", icon: "✂️", slug: "beauty-salon" },
  { name: "More Services", icon: "🏪", slug: "services" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link href="/" className="text-2xl font-bold text-green-700">
            <Image
  src="/logo/Logo.png"
  alt="ApnaSaathi Logo"
  width={100}
  height={50}
  className="transition-transform duration-300 ease-in-out hover:scale-110"
/>
          </Link>

          <Link
            href="/businesses"
            className="rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800"
          >
            Explore Shops
          </Link>
        </div>
      </header>

      <section className="bg-green-50 px-5 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-green-700">
            Your local business companion
          </p>

          <h1 className="text-4xl font-bold leading-tight sm:text-6xl">
            Apne shehar ki shops,
            <span className="block text-green-700">
              ab ek hi jagah.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
            Kota ke local businesses discover karo, unse directly connect
            karo aur apne aas-paas ki services aasani se dhoondo.
          </p>

          <form
            action="/businesses"
            method="GET"
            className="mx-auto mt-8 flex max-w-xl flex-col gap-3 rounded-2xl bg-white p-3 shadow-sm sm:flex-row"
          >
            <input
              type="search"
              name="q"
              placeholder="Shop ya service search karo..."
              aria-label="Search shops and services"
              className="min-w-0 flex-1 rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-green-600"
            />

            <button
              type="submit"
              className="rounded-lg bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
            >
              Search
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-500">
            Local shops ko support karo ❤️
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Explore Categories</h2>
          <p className="mt-2 text-gray-600">
            Apni zaroorat ke hisaab se business chuno.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:border-green-600 hover:shadow-md"
            >
              <span className="text-3xl" aria-hidden="true">
                {category.icon}
              </span>

              <h3 className="mt-3 font-semibold">{category.name}</h3>

              <p className="mt-1 text-sm text-gray-500">
                Explore businesses
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-14">
        <div className="rounded-2xl bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-bold">
            Kya aapka bhi business hai?
          </h2>

          <p className="mt-2 max-w-2xl text-gray-600">
            Apni shop ko digital profile do. Customers aapke business ki
            details dekh sakte hain aur directly aapse contact kar sakte hain.
          </p>

          <p className="mt-4 text-sm font-medium text-green-700">
            ApnaSaathi par apne business ko lane ke liye humse contact karein.
          </p>
        </div>
      </section>

      <footer className="border-t bg-white px-5 py-6 text-center text-sm text-gray-500">
        © 2026 EkaaMaarg · Kota, Rajasthan
      </footer>
    </main>
  );
}
