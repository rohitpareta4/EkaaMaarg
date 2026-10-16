
export type VehicleType = "bike" | "scooty" | "car";

export type VehiclePrice = {
  exShowroom: number | null;
  onRoad: number | null;
};

export type Vehicle = {
  id: string;
  showroomSlug: string;
  name: string;
  brand: string;
  type: VehicleType;
  variant: string;
  price: VehiclePrice;
  fuelType: string;
  engine: string;
  mileage: string;
  description: string;
  features: string[];
  image: string;
  isActive: boolean;
};
