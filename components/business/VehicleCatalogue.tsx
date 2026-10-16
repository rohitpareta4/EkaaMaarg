
"use client";

import { useState } from "react";
import type { Vehicle } from "@/types/vehicle";

type VehicleCatalogueProps = {
  vehicles: Vehicle[];
  showroomName: string;
  whatsapp: string;
};

export default function VehicleCatalogue({
  vehicles,
  showroomName,
  whatsapp,
}: VehicleCatalogueProps) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesType = filter === "all" || vehicle.type === filter;

    const query = search.trim().toLowerCase();
    const matchesSearch =
      !query ||
      vehicle.name.toLowerCase().includes(query) ||
      vehicle.brand.toLowerCase().includes(query);

    return matchesType && matchesSearch;
  });

  function formatPrice(price: number | null) {
    if (price === null) return "Price on request";

    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  }

  function listenToFeatures(vehicle: Vehicle) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Audio playback is not supported by this browser.");
      return;
    }

    window.speechSynthesis.cancel();

    if (speakingId === vehicle.id) {
      setSpeakingId(null);
      return;
    }

    const details = [
      `Introducing ${vehicle.name} by ${vehicle.brand}.`,
      `Vehicle type: ${vehicle.type}.`,
      `Variant: ${vehicle.variant}.`,
      `Fuel type: ${vehicle.fuelType}.`,
      `Engine: ${vehicle.engine}.`,
      `Mileage: ${vehicle.mileage}.`,
      `Description: ${vehicle.description}.`,
      `Features: ${vehicle.features.join(". ")}.`,
      `Ex-showroom price: ${formatPrice(vehicle.price.exShowroom)}.`,
      `On-road price: ${formatPrice(vehicle.price.onRoad)}.`,
      `For more information, contact ${showroomName}.`,
    ].join(" ");

    const speech = new SpeechSynthesisUtterance(details);
    speech.lang = "en-IN";
    speech.rate = 0.9;

    speech.onend = () => setSpeakingId(null);
    speech.onerror = () => setSpeakingId(null);

    setSpeakingId(vehicle.id);
    window.speechSynthesis.speak(speech);
  }

  function stopSpeaking() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    setSpeakingId(null);
  }

  function getWhatsAppUrl(vehicle: Vehicle) {
    const number = whatsapp.replace(/\D/g, "");

    const message = [
      `Hello ${showroomName},`,
      `I am interested in the ${vehicle.name}.`,
      `Variant: ${vehicle.variant}.`,
      `Ex-showroom price: ${formatPrice(vehicle.price.exShowroom)}.`,
      "Please share the current on-road price and availability.",
    ].join("\n");

    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  }

  return (
    <section className="mt-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Vehicle Catalogue
        </h1>
        <p className="mt-2 text-gray-600">
          Explore vehicles, compare specifications and listen to their features.
        </p>
      </div>

      <input
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search by vehicle or brand..."
        aria-label="Search vehicles"
        className="mb-4 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {[
          { value: "all", label: "All Vehicles" },
          { value: "bike", label: "Bikes" },
          { value: "scooty", label: "Scooties" },
          { value: "car", label: "Cars" },
        ].map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setFilter(option.value)}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              filter === option.value
                ? "bg-green-700 text-white"
                : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {filteredVehicles.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
          <p className="font-medium text-gray-800">
            No vehicles found.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Try another search or category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {filteredVehicles.map((vehicle) => (
            <article
              key={vehicle.id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
            >
              <img
                src={vehicle.image}
                alt={vehicle.name}
                loading="lazy"
                className="h-56 w-full bg-gray-100 object-cover"
              />

              <div className="p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium capitalize text-green-800">
                    {vehicle.type}
                  </span>

                  <span className="text-xs text-gray-500">
                    {vehicle.brand}
                  </span>
                </div>

                <h2 className="mt-3 text-xl font-bold text-gray-900">
                  {vehicle.name}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {vehicle.variant}
                </p>

                <p className="mt-4 text-2xl font-bold text-green-700">
                  {formatPrice(vehicle.price.exShowroom)}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Ex-showroom price; confirm current pricing with the showroom.
                </p>

                <div className="mt-4 space-y-2 text-sm text-gray-700">
                  <p>
                    <span className="font-semibold">Fuel:</span>{" "}
                    {vehicle.fuelType}
                  </p>
                  <p>
                    <span className="font-semibold">Engine:</span>{" "}
                    {vehicle.engine}
                  </p>
                  <p>
                    <span className="font-semibold">Mileage:</span>{" "}
                    {vehicle.mileage}
                  </p>
                </div>

                <p className="mt-4 text-sm leading-6 text-gray-600">
                  {vehicle.description}
                </p>

                <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-gray-600">
                  {vehicle.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => listenToFeatures(vehicle)}
                  className="mt-5 w-full rounded-xl border border-green-700 px-4 py-3 font-semibold text-green-800 hover:bg-green-50"
                >
                  {speakingId === vehicle.id
                    ? "■ Stop Listening"
                    : "🔊 Listen to Features"}
                </button>

                <a
                  href={getWhatsAppUrl(vehicle)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block rounded-xl bg-green-700 px-4 py-3 text-center font-semibold text-white hover:bg-green-800"
                >
                  Enquire on WhatsApp
                </a>
              </div>
            </article>
          ))}
        </div>
      )}

      {speakingId && (
        <button
          type="button"
          onClick={stopSpeaking}
          className="fixed bottom-5 right-5 rounded-full bg-gray-900 px-5 py-3 font-semibold text-white shadow-lg"
        >
          Stop Audio
        </button>
      )}
    </section>
  );
}
