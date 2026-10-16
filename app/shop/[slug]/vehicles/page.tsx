
import Link from "next/link";
import { notFound } from "next/navigation";

import { getBusinessBySlug } from "@/lib/businesses";
import { getVehiclesByShowroom } from "@/lib/vehicles";
import VehicleCatalogue from "@/components/business/VehicleCatalogue";

export const instant = false;

type VehiclesPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function VehiclesPage({
  params,
}: VehiclesPageProps) {
  const { slug } = await params;

  const showroom = await getBusinessBySlug(slug);

  if (!showroom || !showroom.isActive) {
    notFound();
  }

  if (!showroom.features?.vehicleCatalogue) {
    notFound();
  }

  const vehicles = await getVehiclesByShowroom(showroom.slug);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 text-gray-900 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <Link
          href={`/shop/${showroom.slug}`}
          className="text-sm font-medium text-green-700 hover:underline"
        >
          ← Back to {showroom.name}
        </Link>

        <header className="mt-5 rounded-2xl border border-gray-200 bg-white p-5 sm:p-8">
          <p className="text-sm font-medium text-green-700">
            EK AAMAARG · DIGITAL SHOWROOM
          </p>

          <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
            {showroom.name}
          </h1>

          <p className="mt-2 text-gray-600">
            Explore available vehicles, listen to their features, and
            contact the showroom for current prices and availability.
          </p>
        </header>

        {vehicles.length > 0 ? (
          <VehicleCatalogue
            vehicles={vehicles}
            showroomName={showroom.name}
            whatsapp={showroom.whatsapp}
          />
        ) : (
          <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-8 text-center">
            <h2 className="text-xl font-semibold">
              Vehicles coming soon
            </h2>
            <p className="mt-2 text-gray-600">
              This showroom has not added any vehicles yet. Please contact
              the showroom for current availability.
            </p>
            {showroom.features?.whatsappEnquiries && (
              <a
                href={`https://wa.me/${showroom.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block rounded-xl bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800"
              >
                Contact Showroom
              </a>
            )}
          </section>
        )}

        <p className="mt-8 text-center text-xs text-gray-500">
          Prices and specifications should be confirmed with the showroom.
        </p>
      </div>
    </main>
  );
}
