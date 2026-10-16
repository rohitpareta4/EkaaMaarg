export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
};

export type RestaurantMenu = {
  businessSlug: string;
  items: MenuItem[];
};