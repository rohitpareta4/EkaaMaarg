
import vehiclesData from "@/data/vehicles.json";
import type { Vehicle } from "@/types/vehicle";

export interface VehicleRepository {
  getActiveByShowroomSlug(showroomSlug: string): Promise<Vehicle[]>;
  getActiveById(id: string): Promise<Vehicle | null>;
}

class JsonVehicleRepository implements VehicleRepository {
  private readonly vehicles: Vehicle[] = vehiclesData as Vehicle[];

  async getActiveByShowroomSlug(
    showroomSlug: string
  ): Promise<Vehicle[]> {
    return this.vehicles.filter(
      (vehicle) =>
        vehicle.isActive &&
        vehicle.showroomSlug === showroomSlug
    );
  }

  async getActiveById(id: string): Promise<Vehicle | null> {
    const vehicle = this.vehicles.find(
      (item) => item.id === id && item.isActive
    );

    return vehicle ?? null;
  }
}

// Pages and other application code use this interface.
// The JSON implementation can later be replaced with PostgreSQL.
const vehicleRepository: VehicleRepository =
  new JsonVehicleRepository();

export async function getVehiclesByShowroom(
  showroomSlug: string
): Promise<Vehicle[]> {
  return vehicleRepository.getActiveByShowroomSlug(showroomSlug);
}

export async function getVehicleById(
  id: string
): Promise<Vehicle | null> {
  return vehicleRepository.getActiveById(id);
}
