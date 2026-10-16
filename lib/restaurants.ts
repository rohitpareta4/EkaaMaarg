import restaurantMenusData from "@/data/restaurant-menus.json";
import type { RestaurantMenu } from "@/types/restaurant";

const restaurantMenus = restaurantMenusData as RestaurantMenu[];

export async function getRestaurantMenuBySlug(
  slug: string
): Promise<RestaurantMenu | null> {
  const restaurantMenu = restaurantMenus.find(
    (item) => item.businessSlug === slug
  );

  return restaurantMenu ?? null;
}