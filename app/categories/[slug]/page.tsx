import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBusinessesByCategory } from "@/lib/businesses";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

const categoryNames: Record<string, string> = {
  electronics: "Electronics",
  restaurants: "Restaurants",
  clothing: "Clothing",
  "beauty-salon": "Beauty & Salon",
  stationery: "Stationery",
  services: "Local Services",
};

export function generateStaticParams() {
  return Object.keys(categoryNames).map((slug) => ({
    slug,
  }));
}

async function CategoryContent({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categoryName = categoryNames[slug];

  if (!categoryName) {
    notFound();
  }

  const shops = await getBusinessesByCategory(slug);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link href="/" className="text-2xl font-bold text-green-700">
            ApnaSaathi
          </Link>

          <Link
            href="/businesses"
            className="text-sm font-medium text-gray-600 hover:text-green-700"
          >
            All Businesses
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-10">
        <Link
          href="/"
          className="text-sm font-medium text-green-700 hover:underline"
        >
          ← Home
        </Link>

        <h1 className="mt-5 text-3xl font-bold sm:text-4xl">
          {categoryName}
        </h1>

        <p className="mt-3 text-gray-600">
          Explore {categoryName.toLowerCase()} businesses in Kota.
        </p>

        <p className="mt-5 text-sm text-gray-500">
          {shops.length} businesses found
        </p>

        {shops.length === 0 ? (
          <div className="mt-6 rounded-2xl border bg-white p-8 text-center">
            <h2 className="text-lg font-semibold">
              No businesses in this category yet
            </h2>

            <p className="mt-2 text-gray-600">
              Check another category or explore all businesses.
            </p>

            <Link
              href="/businesses"
              className="mt-5 inline-block rounded-xl bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800"
            >
              Explore All Businesses
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shops.map((shop) => (
              <article
                key={shop.id}
                className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-md"
              >
                <h2 className="text-xl font-bold">{shop.name}</h2>

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