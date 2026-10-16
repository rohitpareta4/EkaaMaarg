import Link from "next/link";
import { notFound } from "next/navigation";

import { getBusinessBySlug } from "@/lib/businesses";
import { getRestaurantMenuBySlug } from "@/lib/restaurants";
import RestaurantMenu from "@/components/business/RestaurantMenu";

export const instant = false;

type MenuPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function MenuPage({ params }: MenuPageProps) {
  const { slug } = await params;

  // Find the business.
  const shop = await getBusinessBySlug(slug);

  if (!shop) {
    notFound();
  }

  // Only restaurants can have menus.
  if (shop.category !== "restaurants") {
    notFound();
  }

  // Find this restaurant's menu.
  const menu = await getRestaurantMenuBySlug(shop.slug);

  // Handle missing or invalid menu data safely.
  if (!menu || !Array.isArray(menu.items)) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-8 text-gray-900 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <Link
            href={`/shop/${shop.slug}`}
            className="text-sm font-medium text-green-700 hover:underline"
          >
            ← Back to {shop.name}
          </Link>

          <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
            <h1 className="text-2xl font-bold">
              {shop.name} Menu
            </h1>

            <p className="mt-3 text-gray-600">
              The menu has not been added yet. Please contact the restaurant for its menu.
            </p>
          </section>
        </div>
      </main>
    );
  }

  // Display the menu and customer checkout form.
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 text-gray-900 sm:px-5 sm:py-10">
      <div className="mx-auto max-w-3xl">
        <Link
          href={`/shop/${shop.slug}`}
          className="text-sm font-medium text-green-700 hover:underline"
        >
          ← Back to {shop.name}
        </Link>

        <RestaurantMenu
          menu={menu}
          restaurantName={shop.name}
          whatsapp={shop.whatsapp}
        />

        <p className="mt-6 text-center text-xs text-gray-500">
          Menu prices are provided by the restaurant. Please confirm your order directly with the restaurant.
        </p>
      </div>
    </main>
  );
}