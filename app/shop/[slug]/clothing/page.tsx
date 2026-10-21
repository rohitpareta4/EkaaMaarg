
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getBusinessBySlug } from "@/lib/businesses";
import clothingData from "@/data/clothing.json";

export const instant = false;

type ClothingPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ClothingPage({
  params,
}: ClothingPageProps) {
  const { slug } = await params;

  const shop = await getBusinessBySlug(slug);

  if (
    !shop ||
    !shop.isActive ||
    shop.category !== "clothing" ||
    !shop.features?.productCatalogue
  ) {
    notFound();
  }

  // Filter products belonging to this specific shop.
  const products = clothingData.products.filter(
    (product) =>
      product.shopSlug.trim().toLowerCase() ===
      shop.slug.trim().toLowerCase()
  );

  const whatsapp = shop.whatsapp.replace(/\D/g, "");

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 text-gray-900 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <Link
          href={`/shop/${shop.slug}`}
          className="text-sm font-medium text-green-700 hover:underline"
        >
          ← Back to {shop.name}
        </Link>

        <header className="mt-5 rounded-2xl border border-gray-200 bg-white p-5 sm:p-8">
          <p className="text-sm font-medium text-green-700">
            APNASAATHI · CLOTHING CATALOGUE
          </p>

          <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
            {shop.name}
          </h1>

          <p className="mt-2 text-gray-600">
            Explore clothing products available at {shop.name}.
            Contact the shop for sizes, colors, and availability.
          </p>

          <p className="mt-4 text-sm text-gray-500">
            {products.length} products available in catalogue
          </p>
        </header>

        {products.length > 0 ? (
          <section className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <article
                key={product.id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:shadow-md"
              >
                <div className="relative aspect-[4/5] bg-gray-100 ease-in-out hover:scale-110">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover"
                  />
                </div>

                <div className="p-3 sm:p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    {product.brand}
                  </p>

                  <h2 className="mt-1 font-bold">
                    {product.name}
                  </h2>

                  <p className="mt-2 text-sm leading-5 text-gray-600">
                    {product.description}
                  </p>

                  <p className="mt-3 text-lg font-bold text-green-800">
                    ₹{product.price.toLocaleString("en-IN")}
                  </p>

                  <div className="mt-3">
                    <p className="text-xs font-semibold text-gray-700">
                      Colors
                    </p>

                    <div className="mt-1 flex flex-wrap gap-1">
                      {product.colors.map((color) => (
                        <span
                          key={color}
                          className="rounded-full border border-gray-200 px-2 py-1 text-xs text-gray-600"
                        >
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="text-xs font-semibold text-gray-700">
                      Sizes
                    </p>

                    <p className="mt-1 text-sm text-gray-600">
                      {product.sizes.join(", ")}
                    </p>
                  </div>

                  <p
                    className={`mt-3 text-xs font-medium ${
                      product.inStock
                        ? "text-green-700"
                        : "text-red-600"
                    }`}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </p>

                  {shop.features?.whatsappEnquiries && (
                    <a
                      href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(
                        `Hi, I'm interested in ${product.name} at ${shop.name}. Please share its availability and details.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 flex items-center justify-center rounded-xl bg-green-700 px-3 py-3 text-center text-sm font-semibold text-white hover:bg-green-800"
                    >
                      Enquire on WhatsApp
                    </a>
                  )}
                </div>
              </article>
            ))}
          </section>
        ) : (
          <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-8 text-center">
            <h2 className="text-xl font-semibold">
              Products coming soon
            </h2>

            <p className="mt-2 text-gray-600">
              {shop.name} has not added any products to its catalogue yet.
            </p>

            {shop.features?.whatsappEnquiries && (
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block rounded-xl bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800"
              >
                Contact Shop
              </a>
            )}
          </section>
        )}

        <p className="mt-8 text-center text-xs text-gray-500">
          Prices and availability should be confirmed with the shop.
        </p>
      </div>
    </main>
  );
}
