
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getBusinessBySlug } from "@/lib/businesses";
import WelcomeVoice from "@/components/business/WelcomeVoice";

export const instant = false;


type ShopPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ShopPage({ params }: ShopPageProps) {
  const { slug } = await params;
  const shop = await getBusinessBySlug(slug);

  if (!shop) {
    notFound();
  }

  const phone = shop.phone.replace(/[^\d+]/g, "");
  const whatsapp = shop.whatsapp.replace(/\D/g, "");

  const features = {
    digitalProfile: true,
    productCatalogue: false,
    serviceCatalogue: true,
    whatsappEnquiries: true,
    onlineOrdering: false,
    appointmentBooking: false,
    staffRequests: false,
    requestBill: false,
    customerReviews: false,
    ...shop.features,
  };

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    shop.address
  )}`;

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4">
          <Link href="/" className="text-xl font-bold text-green-700">
            EkaaMaarg
          </Link>

          <Link
            href="/businesses"
            className="text-sm font-medium text-gray-600 hover:text-green-700"
          >
            Explore Shops
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-5 sm:py-10">
        <Link href="/" className="text-sm text-green-700 hover:underline">
          ← Home
        </Link>

        <article className="mt-5 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="relative aspect-[11/12] w-full bg-gray-100">
            <Image
              src={shop.image}
              alt={`${shop.name} business`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>

          <div className="p-5 sm:p-8">
            <span className="inline-block rounded-full bg-green-50 px-3 py-1 text-sm font-medium capitalize text-green-800">
              {shop.category.replace(/-/g, " ")}
            </span>

            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
              {shop.name}
            </h1>

            <p className="mt-3 leading-7 text-gray-600">
              {shop.description}
            </p>

            <div className="mt-5 flex items-start gap-2 text-gray-600">
              <span aria-hidden="true">📍</span>
              <p>{shop.address}</p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <a
                href={`tel:${phone}`}
                className="flex items-center justify-center gap-2 rounded-xl bg-green-700 px-4 py-3 font-semibold text-white hover:bg-green-800"
              >
                <span aria-hidden="true">📞</span>
                Call Shop
              </a>

              {features.whatsappEnquiries && (
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-green-700 px-4 py-3 font-semibold text-green-800 hover:bg-green-50"
                >
                  <span aria-hidden="true">💬</span>
                  WhatsApp
                </a>
              )}

              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-3 font-semibold hover:bg-gray-50"
              >
                <span aria-hidden="true">📍</span>
                Directions
              </a>

              {shop.category === "restaurants" &&
                features.digitalMenu && (
                  <Link
                    href={`/shop/${shop.slug}/menu`}
                    className="flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-4 py-3 font-semibold text-white hover:bg-orange-700"
                  >
                    <span aria-hidden="true">🍽️</span>
                    View Menu
                  </Link>
                )}
            </div>

            {features.digitalProfile && (
              <section className="mt-8 rounded-xl bg-green-50 p-4">
                <h2 className="font-semibold text-green-900">
                  Welcome to {shop.name}
                </h2>

                <div className="mt-3 rounded-2xl border bg-white p-5">
                  <h3 className="text-xl font-bold">Welcome Message</h3>
                  <p className="mt-2 text-gray-600">
                    {shop.welcomeMessage}
                  </p>
                  <WelcomeVoice message={shop.welcomeMessage} />
                </div>
              </section>
            )}

            {(features.serviceCatalogue || features.productCatalogue) && (
              <section className="mt-8">
                <h2 className="text-xl font-bold">
                  {features.productCatalogue && features.serviceCatalogue
                    ? "Services & Products"
                    : features.productCatalogue
                      ? "Products"
                      : "Services"}
                </h2>

                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {shop.services.map((service) => (
                    <li
                      key={service}
                      className="rounded-lg border border-gray-200 px-4 py-3"
                    >
                      <span className="mr-2 text-green-700">✓</span>
                      {service}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="mt-8 border-t pt-6">
              <h2 className="text-xl font-bold">Contact Information</h2>

              <p className="mt-3 text-gray-600">
                <span className="font-medium text-gray-900">Phone:</span>{" "}
                {shop.phone}
              </p>

              <p className="mt-2 text-gray-600">
                <span className="font-medium text-gray-900">City:</span>{" "}
                {shop.city}
              </p>
            </section>
          </div>
        </article>

        <p className="mt-6 text-center text-sm text-gray-500">
          Business information should be verified before publication.
        </p>
      </div>
    </main>
  );
}
