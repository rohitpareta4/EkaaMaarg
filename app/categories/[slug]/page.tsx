import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBusinessesByCategory } from "@/lib/businesses";
import Image from "next/image";


type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

const CURRENT_YEAR = 2026;

const categoryNames: Record<string, string> = {
  electricians: "Electricians",
  electronics: "Electronics",
  restaurants: "Restaurants",
  clothing: "Clothing",
  "beauty-salon": "Beauty & Salon",
  stationery: "Stationery",
  services: "Local Services",
};

export function generateStaticParams() {
  return Object.keys(categoryNames).map((slug) => ({ slug }));
}

async function CategoryContent({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categoryName = categoryNames[slug];

  if (!categoryName) notFound();

  const shops = await getBusinessesByCategory(slug);
  const isClothing = slug === "clothing";

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navbar */}
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="text-2xl font-extrabold tracking-tight">
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
            className="rounded-xl bg-green-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
          >
            All Businesses
          </Link>
        </div>
      </header>

      {/* Category banner */}
      {isClothing ? (
        <section className="relative overflow-hidden bg-green-950 text-white">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-green-500/20 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-5 py-12 sm:px-8 sm:py-16 md:grid-cols-2">
            <div>
              <Link
                href="/"
                className="text-sm font-medium text-green-200 hover:text-white"
              >
                ← Back to Home
              </Link>

              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-green-300">
                ApnaSaathi · Local Fashion
              </p>

              <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
                Discover Clothing
                <span className="block text-green-300">
                  Shops Near You
                </span>
              </h1>

              <p className="mt-5 max-w-xl leading-7 text-green-100/80">
                Explore local clothing stores in Kota, discover their
                collections, and connect directly with your favourite shops.
              </p>

              <a
                href="#available-shops"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-green-950 transition hover:bg-green-100"
              >
                Explore Available Shops
                <span aria-hidden="true">↓</span>
              </a>
            </div>

            <div className="flex min-h-56 items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-8">
              <div className="text-center">
                <span className="text-7xl" aria-hidden="true">
                  👗
                </span>
                <p className="mt-4 text-lg font-semibold">
                  Your Style, Your City
                </p>
                <p className="mt-2 text-sm text-green-100/70">
                  Discover fashion from local businesses
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-green-50">
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
            <Link
              href="/"
              className="text-sm font-medium text-green-700 hover:underline"
            >
              ← Home
            </Link>

            <h1 className="mt-5 text-3xl font-extrabold sm:text-4xl">
              Explore {categoryName}
            </h1>

            <p className="mt-3 text-gray-600">
              Discover local {categoryName.toLowerCase()} businesses in Kota.
            </p>
          </div>
        </section>
      )}

      {/* Available shops */}
      <section
        id="available-shops"
        className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16"
      >
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-green-700">
              Explore Local Businesses
            </p>

            <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
              Available {isClothing ? "Clothing Shops" : categoryName}
            </h2>

            <p className="mt-2 text-gray-600">
              Choose a shop to explore its business profile.
            </p>
          </div>

          <p className="text-sm font-medium text-gray-500">
            {shops.length} {shops.length === 1 ? "shop" : "shops"} found
          </p>
        </div>

        {shops.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white px-6 py-12 text-center">
            <div className="text-5xl" aria-hidden="true">
              🏪
            </div>

            <h3 className="mt-4 text-xl font-bold">
              No {isClothing ? "clothing shops" : "businesses"} available yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-gray-600">
              We are working on bringing more local businesses to ApnaSaathi.
              Check out other businesses in the meantime.
            </p>

            <Link
              href="/businesses"
              className="mt-6 inline-flex rounded-xl bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800"
            >
              Explore All Businesses →
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shops.map((shop) => (
              <article
                key={shop.id}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-200 hover:-translate-y-1 hover:border-green-300 hover:shadow-lg"
              >
                <div className="flex h-36 items-center justify-center bg-green-50">
                  <span className="text-6xl" aria-hidden="true">
                    {isClothing ? "👕" : "🏪"}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold">{shop.name}</h3>

                  <p className="mt-2 line-clamp-2 min-h-12 text-sm leading-6 text-gray-600">
                    {shop.description || "Explore this local business."}
                  </p>

                  <p className="mt-3 text-sm text-gray-500">
                    📍 {shop.city || "Kota, Rajasthan"}
                  </p>

                  <Link
                    href={`/shop/${shop.slug}`}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-4 py-3 font-semibold text-white transition hover:bg-green-800"
                  >
                    View Shop Profile
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <footer className="border-t border-gray-200 bg-white px-5 py-6 text-center text-sm text-gray-500">
          © {CURRENT_YEAR} ApnaSaathi · Kota, Rajasthan
      </footer>
    </main>
  );
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-gray-50 px-5 py-20 text-center">
          <p className="text-gray-600">Loading businesses...</p>
        </main>
      }
    >
      <CategoryContent params={params} />
    </Suspense>
  );
}
