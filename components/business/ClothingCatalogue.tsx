
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import clothingData from "../../data/clothing.json";

type ClothingProduct = (typeof clothingData.products)[number];

function ProductImage({ product }: { product: ClothingProduct }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-neutral-100">
      {!imageFailed ? (
        <Image
          src={product.image}
          alt={product.name}
          fill
          unoptimized
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-3 text-neutral-500">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            aria-hidden="true"
          >
            <path d="M16 3l5 4-3 4-2-2v12H8V9l-2 2-3-4 5-4h2a4 4 0 008 0z" />
          </svg>
          <span className="text-sm">Product image coming soon</span>
        </div>
      )}
    </div>
  );
}

export default function ClothingCatalogue() {
  const [search, setSearch] = useState("");
  const [selectedColor, setSelectedColor] = useState("All");

  const products = clothingData.products;

  const colors = useMemo(
    () => [
      "All",
      ...new Set(products.flatMap((product) => product.colors)),
    ],
    [products]
  );

  const filteredProducts = products.filter((product) => {
    const query = search.toLowerCase().trim();

    const matchesSearch =
      product.name.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query);

    const matchesColor =
      selectedColor === "All" ||
      product.colors.includes(selectedColor);

    return matchesSearch && matchesColor;
  });

  return (
    <main className="min-h-screen bg-white px-4 py-8 text-neutral-900 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
            ApnaSaathi Collections
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Clothing & Fashion
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-600 sm:text-base">
            Explore everyday essentials and traditional styles
            from your local clothing stores.
          </p>
        </header>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search clothes or brands..."
            aria-label="Search clothing products"
            className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-neutral-500 sm:max-w-md"
          />

          <select
            value={selectedColor}
            onChange={(event) => setSelectedColor(event.target.value)}
            aria-label="Filter by color"
            className="rounded-xl border border-neutral-200 bg-white px-4 py-3 outline-none focus:border-neutral-500"
          >
            {colors.map((color) => (
              <option key={color} value={color}>
                {color === "All" ? "All colors" : color}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            All clothing
          </h2>
          <span className="text-sm text-neutral-500">
            {filteredProducts.length} products
          </span>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="group min-w-0"
              >
                <ProductImage product={product} />

                <div className="pt-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                    {product.brand}
                  </p>

                  <h3 className="mt-1 font-semibold leading-6">
                    {product.name}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm leading-5 text-neutral-600">
                    {product.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <span
                        key={color}
                        className="rounded-full border border-neutral-200 px-2.5 py-1 text-xs text-neutral-600"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-neutral-300 py-16 text-center">
            <p className="font-medium">No matching products found</p>
            <p className="mt-2 text-sm text-neutral-500">
              Try another search or choose a different color.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedColor("All");
              }}
              className="mt-4 rounded-lg bg-neutral-900 px-4 py-2 text-sm text-white"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
