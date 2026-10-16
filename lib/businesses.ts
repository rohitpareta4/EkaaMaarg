
import shopsData from "@/data/shops.json";
import type { Business } from "@/types/business";

const shops = shopsData as Business[];

export async function getBusinesses(): Promise<Business[]> {
  return shops.filter((shop) => shop.isActive);
}

export async function getBusinessBySlug(
  slug: string
): Promise<Business | null> {
  const shop = shops.find(
    (item) => item.slug === slug && item.isActive
  );

  return shop ?? null;
}

export async function getBusinessesByCategory(
  category: string
): Promise<Business[]> {
  return shops.filter(
    (shop) => shop.isActive && shop.category === category
  );
}
