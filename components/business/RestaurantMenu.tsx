"use client";

import { useMemo, useState } from "react";
import type { RestaurantMenu as RestaurantMenuType } from "@/types/restaurant";

type RestaurantMenuProps = {
  menu: RestaurantMenuType;
  restaurantName: string;
  whatsapp: string;
};

type Cart = Record<string, number>;

export default function RestaurantMenu({
  menu,
  restaurantName,
  whatsapp,
}: RestaurantMenuProps) {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<Cart>({});
  const [showCheckout, setShowCheckout] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [orderType, setOrderType] = useState<"dine-in" | "takeaway">(
    "dine-in"
  );
  const [checkoutError, setCheckoutError] = useState("");

  // Search menu items.
  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return menu.items.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );
  }, [menu.items, search]);

  // Calculate cart and total.
  const selectedItems = menu.items.filter(
    (item) => (cart[item.id] ?? 0) > 0
  );

  const totalQuantity = selectedItems.reduce(
    (total, item) => total + cart[item.id],
    0
  );

  const totalPrice = selectedItems.reduce(
    (total, item) => total + item.price * cart[item.id],
    0
  );

  // Change item quantity.
  function updateQuantity(itemId: string, change: number) {
    setCart((currentCart) => {
      const newQuantity = Math.max(
        0,
        (currentCart[itemId] ?? 0) + change
      );

      return {
        ...currentCart,
        [itemId]: newQuantity,
      };
    });
  }

  // Validate details and prepare the WhatsApp order.
  function handleOrder() {
    setCheckoutError("");

    if (selectedItems.length === 0) {
      setCheckoutError("Please select at least one dish.");
      return;
    }

    // Table number is compulsory for dine-in orders.
    if (orderType === "dine-in" && !tableNumber.trim()) {
      setCheckoutError("Please enter your table number.");
      return;
    }

    // Name is optional. Validate phone only when provided.
    const phone = customerPhone.replace(/\D/g, "");

    if (
      customerPhone.trim() &&
      !/^[6-9]\d{9}$/.test(phone)
    ) {
      setCheckoutError(
        "Enter a valid 10-digit Indian mobile number, or leave it blank."
      );
      return;
    }

    const whatsappNumber = whatsapp.replace(/\D/g, "");

    if (!/^\d{10,15}$/.test(whatsappNumber)) {
      setCheckoutError(
        "The restaurant's WhatsApp number is not configured correctly."
      );
      return;
    }

    const itemsText = selectedItems
      .map(
        (item) =>
          `${item.name} x ${cart[item.id]} = Rs. ${
            item.price * cart[item.id]
          }`
      )
      .join("\n");

    const orderMessage = [
      `NEW ORDER - ${restaurantName}`,
      "",
      `Customer Name: ${customerName.trim() || "Not provided"}`,
      `Customer Mobile: ${phone || "Not provided"}`,
      `Order Type: ${orderType === "dine-in" ? "Dine-in" : "Takeaway"}`,
      ...(orderType === "dine-in"
        ? [`Table Number: ${tableNumber.trim()}`]
        : []),
      "",
      "ORDER DETAILS:",
      itemsText,
      "",
      `Total Quantity: ${totalQuantity}`,
      `TOTAL AMOUNT: Rs. ${totalPrice}`,
      "",
      "Please confirm this order with the customer.",
    ].join("\n");

    const orderUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      orderMessage
    )}`;

    window.open(orderUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <section className="mt-6">
      {/* Restaurant heading */}
      <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-7">
        <h1 className="text-3xl font-bold">{restaurantName}</h1>

        <p className="mt-2 text-gray-600">
          Browse the menu, select quantities, and place your order.
        </p>

        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search dishes..."
          aria-label="Search menu"
          className="mt-5 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
        />
      </div>

      {/* Menu list */}
      <div className="mt-5 space-y-3">
        {filteredItems.map((item) => {
          const quantity = cart[item.id] ?? 0;

          return (
            <article
              key={item.id}
              className="flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-4 sm:p-5"
            >
              <div className="min-w-0 flex-1">
                <h2 className="font-semibold text-gray-900">
                  {item.name}
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                  {item.description}
                </p>

                <p className="mt-2 font-bold text-green-700">
                  Rs. {item.price}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                {quantity === 0 ? (
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, 1)}
                    className="rounded-lg border border-green-600 px-4 py-2 font-semibold text-green-700 hover:bg-green-50"
                  >
                    Add
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, -1)}
                      aria-label={`Decrease ${item.name} quantity`}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 text-lg font-bold"
                    >
                      −
                    </button>

                    <span className="min-w-5 text-center font-semibold">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, 1)}
                      aria-label={`Increase ${item.name} quantity`}
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-700 text-lg font-bold text-white"
                    >
                      +
                    </button>
                  </>
                )}
              </div>
            </article>
          );
        })}

        {filteredItems.length === 0 && (
          <p className="rounded-xl bg-white p-5 text-gray-600">
            No dishes found. Try another search.
          </p>
        )}
      </div>

      {/* Cart and checkout */}
      <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold">Your Order</h2>

        <div className="mt-3 flex justify-between text-gray-600">
          <span>Total quantity</span>
          <span>{totalQuantity}</span>
        </div>

        <div className="mt-2 flex justify-between text-lg font-bold">
          <span>Total amount</span>
          <span>Rs. {totalPrice}</span>
        </div>

        {!showCheckout ? (
          <button
            type="button"
            disabled={totalQuantity === 0}
            onClick={() => {
              setCheckoutError("");
              setShowCheckout(true);
            }}
            className="mt-5 w-full rounded-xl bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            Continue to Customer Details
          </button>
        ) : (
          <div className="mt-6 border-t border-gray-200 pt-5">
            <h3 className="text-xl font-bold">Customer Details</h3>

            <p className="mt-1 text-sm text-gray-600">
              Name and mobile are optional. A table number is required for dine-in orders.
            </p>

            <form
              className="mt-4 space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                handleOrder();
              }}
            >
              {/* Optional name */}
              <div>
                <label
                  htmlFor="customerName"
                  className="mb-1 block text-sm font-medium"
                >
                  Customer Name (Optional)
                </label>

                <input
                  id="customerName"
                  type="text"
                  autoComplete="name"
                  value={customerName}
                  onChange={(event) =>
                    setCustomerName(event.target.value)
                  }
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3"
                />
              </div>

              {/* Optional mobile */}
              <div>
                <label
                  htmlFor="customerPhone"
                  className="mb-1 block text-sm font-medium"
                >
                  Mobile Number (Optional)
                </label>

                <input
                  id="customerPhone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  maxLength={10}
                  value={customerPhone}
                  onChange={(event) =>
                    setCustomerPhone(
                      event.target.value.replace(/\D/g, "").slice(0, 10)
                    )
                  }
                  placeholder="10-digit mobile number"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3"
                />
              </div>

              {/* Order type */}
              <div>
                <label
                  htmlFor="orderType"
                  className="mb-1 block text-sm font-medium"
                >
                  Order Type *
                </label>

                <select
                  id="orderType"
                  value={orderType}
                  onChange={(event) => {
                    setOrderType(
                      event.target.value as "dine-in" | "takeaway"
                    );
                    setCheckoutError("");
                  }}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3"
                >
                  <option value="dine-in">Dine-in</option>
                  <option value="takeaway">Takeaway</option>
                </select>
              </div>

              {/* Required table number for dine-in */}
              {orderType === "dine-in" && (
                <div>
                  <label
                    htmlFor="tableNumber"
                    className="mb-1 block text-sm font-medium"
                  >
                    Table Number *
                  </label>

                  <input
                    id="tableNumber"
                    type="text"
                    required
                    value={tableNumber}
                    onChange={(event) =>
                      setTableNumber(event.target.value)
                    }
                    placeholder="e.g. Table 4"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3"
                  />
                </div>
              )}

              {/* Order summary */}
              <div className="rounded-xl bg-gray-50 p-4">
                <h4 className="font-semibold">Order Summary</h4>

                <div className="mt-3 space-y-2">
                  {selectedItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between gap-3 text-sm"
                    >
                      <span>
                        {item.name} × {cart[item.id]}
                      </span>

                      <span className="shrink-0">
                        Rs. {item.price * cart[item.id]}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex justify-between border-t pt-3 font-bold">
                  <span>Total</span>
                  <span>Rs. {totalPrice}</span>
                </div>
              </div>

              {checkoutError && (
                <p
                  role="alert"
                  className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
                >
                  {checkoutError}
                </p>
              )}

              <button
                type="submit"
                className="w-full rounded-xl bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800"
              >
                Place Order on WhatsApp
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowCheckout(false);
                  setCheckoutError("");
                }}
                className="w-full rounded-xl border border-gray-300 px-5 py-3 font-medium text-gray-700 hover:bg-gray-50"
              >
                Back to Menu
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}