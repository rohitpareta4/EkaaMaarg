
"use client";

import { useEffect, useState } from "react";

type Business = {
  slug: string;
  name: string;
  category?: string;
  address?: string;
  isActive: boolean;
  googleReviewUrl?: string;
};

type Language = "Hinglish" | "Hindi" | "English";
type ReviewMode = "js" | "ai";

type Props = {
  business: Business;
};

type ServiceOption = {
  id: string;
  label: Record<Language, string>;
};

const languages: Language[] = ["Hinglish", "Hindi", "English"];

const SERVICE_CATEGORIES: {
  keywords: string[];
  options: ServiceOption[];
}[] = [
  {
    keywords: ["electrical", "electrician", "electric", "electronics"],
    options: [
      {
        id: "electrical-items",
        label: {
          English: "Electrical items and supplies",
          Hindi: "इलेक्ट्रिकल सामान",
          Hinglish: "Electrical items aur supplies",
        },
      },
      {
        id: "wiring",
        label: {
          English: "Wires and wiring material",
          Hindi: "वायर और वायरिंग का सामान",
          Hinglish: "Wires aur wiring material",
        },
      },
      {
        id: "lighting",
        label: {
          English: "Lights, bulbs and lighting",
          Hindi: "लाइट, बल्ब और लाइटिंग",
          Hinglish: "Lights, bulbs aur lighting",
        },
      },
      {
        id: "switches",
        label: {
          English: "Switches, sockets and accessories",
          Hindi: "स्विच, सॉकेट और एक्सेसरीज़",
          Hinglish: "Switches, sockets aur accessories",
        },
      },
      {
        id: "fans",
        label: {
          English: "Fans and electrical appliances",
          Hindi: "पंखे और इलेक्ट्रिकल उपकरण",
          Hinglish: "Fans aur electrical appliances",
        },
      },
    ],
  },
  {
    keywords: ["clothing", "clothes", "garment", "fashion", "apparel", "boutique"],
    options: [
      {
        id: "menswear",
        label: {
          English: "Men's clothing",
          Hindi: "पुरुषों के कपड़े",
          Hinglish: "Men's clothing",
        },
      },
      {
        id: "womenswear",
        label: {
          English: "Women's clothing",
          Hindi: "महिलाओं के कपड़े",
          Hinglish: "Women's clothing",
        },
      },
      {
        id: "kidswear",
        label: {
          English: "Kids' clothing",
          Hindi: "बच्चों के कपड़े",
          Hinglish: "Kids' clothing",
        },
      },
      {
        id: "ethnicwear",
        label: {
          English: "Ethnic and traditional wear",
          Hindi: "एथनिक और पारंपरिक कपड़े",
          Hinglish: "Ethnic aur traditional wear",
        },
      },
      {
        id: "accessories",
        label: {
          English: "Fashion accessories",
          Hindi: "फैशन एक्सेसरीज़",
          Hinglish: "Fashion accessories",
        },
      },
    ],
  },
  {
    keywords: ["mobile", "phone", "smartphone", "telecom"],
    options: [
      {
        id: "mobile-phones",
        label: {
          English: "Mobile phones",
          Hindi: "मोबाइल फोन",
          Hinglish: "Mobile phones",
        },
      },
      {
        id: "mobile-accessories",
        label: {
          English: "Mobile accessories",
          Hindi: "मोबाइल एक्सेसरीज़",
          Hinglish: "Mobile accessories",
        },
      },
      {
        id: "repairs",
        label: {
          English: "Mobile repair",
          Hindi: "मोबाइल रिपेयर",
          Hinglish: "Mobile repair",
        },
      },
      {
        id: "recharge",
        label: {
          English: "Recharge and SIM services",
          Hindi: "रिचार्ज और सिम सेवाएँ",
          Hinglish: "Recharge aur SIM services",
        },
      },
    ],
  },
  {
    keywords: ["restaurant", "cafe", "café", "food", "dhaba", "bakery", "hotel"],
    options: [
      {
        id: "food",
        label: {
          English: "Food and meals",
          Hindi: "खाना और भोजन",
          Hinglish: "Food aur meals",
        },
      },
      {
        id: "beverages",
        label: {
          English: "Tea, coffee and beverages",
          Hindi: "चाय, कॉफी और पेय",
          Hinglish: "Tea, coffee aur beverages",
        },
      },
      {
        id: "snacks",
        label: {
          English: "Snacks and bakery items",
          Hindi: "स्नैक्स और बेकरी आइटम",
          Hinglish: "Snacks aur bakery items",
        },
      },
      {
        id: "dine-in",
        label: {
          English: "Dine-in",
          Hindi: "रेस्टोरेंट में बैठकर खाना",
          Hinglish: "Dine-in",
        },
      },
      {
        id: "takeaway",
        label: {
          English: "Takeaway or parcel",
          Hindi: "पार्सल या टेकअवे",
          Hinglish: "Takeaway ya parcel",
        },
      },
    ],
  },
  {
    keywords: ["salon", "beauty", "barber", "parlour", "parlor"],
    options: [
      {
        id: "haircut",
        label: {
          English: "Haircut and hairstyling",
          Hindi: "हेयरकट और हेयरस्टाइलिंग",
          Hinglish: "Haircut aur hairstyling",
        },
      },
      {
        id: "haircare",
        label: {
          English: "Hair care",
          Hindi: "हेयर केयर",
          Hinglish: "Hair care",
        },
      },
      {
        id: "skincare",
        label: {
          English: "Skin care and facial",
          Hindi: "स्किन केयर और फेशियल",
          Hinglish: "Skin care aur facial",
        },
      },
      {
        id: "grooming",
        label: {
          English: "Personal grooming",
          Hindi: "पर्सनल ग्रूमिंग",
          Hinglish: "Personal grooming",
        },
      },
    ],
  },
  {
    keywords: ["plumb", "sanitary", "bathroom fittings"],
    options: [
      {
        id: "plumbing",
        label: {
          English: "Plumbing supplies",
          Hindi: "प्लंबिंग का सामान",
          Hinglish: "Plumbing supplies",
        },
      },
      {
        id: "sanitaryware",
        label: {
          English: "Sanitaryware",
          Hindi: "सेनेटरीवेयर",
          Hinglish: "Sanitaryware",
        },
      },
      {
        id: "bathroom-fittings",
        label: {
          English: "Bathroom fittings",
          Hindi: "बाथरूम फिटिंग्स",
          Hinglish: "Bathroom fittings",
        },
      },
      {
        id: "pipes",
        label: {
          English: "Pipes and fittings",
          Hindi: "पाइप और फिटिंग्स",
          Hinglish: "Pipes aur fittings",
        },
      },
    ],
  },
];

const GENERAL_OPTIONS: ServiceOption[] = [
  {
    id: "products",
    label: {
      English: "Products or items",
      Hindi: "प्रोडक्ट या सामान",
      Hinglish: "Products ya items",
    },
  },
  {
    id: "service",
    label: {
      English: "Service received",
      Hindi: "ली गई सेवा",
      Hinglish: "Li gayi service",
    },
  },
  {
    id: "consultation",
    label: {
      English: "Advice or consultation",
      Hindi: "सलाह या परामर्श",
      Hinglish: "Advice ya consultation",
    },
  },
  {
    id: "other",
    label: {
      English: "Other",
      Hindi: "अन्य",
      Hinglish: "Other",
    },
  },
];

function getServiceOptions(category?: string): ServiceOption[] {
  const normalized = (category || "").toLowerCase();

  const match = SERVICE_CATEGORIES.find((group) =>
    group.keywords.some((keyword) => normalized.includes(keyword))
  );

  return match?.options ?? GENERAL_OPTIONS;
}


function getReviewTemplates(
  name: string,
  selectedServices: string[],
  stars: number,
  language: Language
): string[] {
  const items = selectedServices.join(", ");
  const business = name.trim();

  const templates: Record<Language, Record<string, string[]>> = {
    English: {
      positive: [
        `Got what I came for${items ? ` — ${items}` : ""}. Had a good experience here.`,
        `Visited ${business}${items ? ` for ${items}` : ""}. Would consider coming back.`,
        `${business}${items ? ` was on my list for ${items}` : ""}. Glad I checked it out.`,
      ],
      neutral: [
        `Visited ${business}${items ? ` for ${items}` : ""}. There’s a little room for improvement.`,
        `Stopped by ${business}${items ? ` to check out ${items}` : ""}. It was an okay experience.`,
        `${business}${items ? ` — came in looking for ${items}` : ""}. My experience was average.`,
      ],
      negative: [
        `Visited ${business}${items ? ` for ${items}` : ""}. My experience could have been better.`,
        `Came to ${business}${items ? ` looking for ${items}` : ""}. I expected a better experience.`,
        `${business}${items ? ` — ${items}` : ""}. There’s room to improve the overall experience.`,
      ],
    },
    Hindi: {
      positive: [
        `${business}${items ? ` mein ${items} ke liye aaya tha` : " aaya tha"}. Achha experience raha.`,
        `${business}${items ? ` se ${items} ke liye` : ""} aaya tha. Dobara aana pasand karunga.`,
        `${business} par aakar achha laga${items ? `, khaaskar ${items} ke liye` : ""}.`,
      ],
      neutral: [
        `${business}${items ? ` mein ${items} ke liye` : ""} aaya tha. Experience theek-thaak raha.`,
        `${business} mein kuch cheezon mein improvement ki gunjaish hai.`,
        `${business}${items ? ` par ${items} ke liye` : ""} aaya tha. Mera experience average raha.`,
      ],
      negative: [
        `${business}${items ? ` mein ${items} ke liye` : ""} aaya tha. Experience aur achha ho sakta tha.`,
        `${business} se mujhe thodi aur behtar service ki umeed thi.`,
        `${business} mein overall experience meri expectation jaisa nahi raha.`,
      ],
    },
    Hinglish: {
      positive: [
        `${business}${items ? ` se ${items} liye` : " visit kiya"}. Overall experience achha raha.`,
        `${business}${items ? ` gaya tha ${items} ke liye` : " gaya tha"}. Would visit again.`,
        `${business} check out kiya${items ? ` for ${items}` : ""}. Achha experience tha.`,
      ],
      neutral: [
        `${business}${items ? ` gaya tha ${items} ke liye` : " visit kiya"}. Experience okay tha.`,
        `${business} ka experience average raha, thodi improvement ho sakti hai.`,
        `${business}${items ? ` par ${items} ke liye` : ""} gaya tha. Theek-thaak experience.`,
      ],
      negative: [
        `${business}${items ? ` gaya tha ${items} ke liye` : ""}. Experience better ho sakta tha.`,
        `${business} se thodi better service ki expectation thi.`,
        `${business} ka overall experience meri expectations ke according nahi tha.`,
      ],
    },
  };

  const tone =
    stars >= 4 ? "positive" : stars === 3 ? "neutral" : "negative";

  const languageKey = language in templates ? language : "Hinglish";
  const options = templates[languageKey][tone];

  // Rotate the order so the first suggestion isn't always the same.
  const offset = Math.floor(Math.random() * options.length);
  return [...options.slice(offset), ...options.slice(0, offset)];
}


export default function ReviewExperience({ business }: Props) {
  const serviceOptions = getServiceOptions(business.category);

  const [stars, setStars] = useState(5);
  const [language, setLanguage] = useState<Language>("Hinglish");
  const [reviewMode, setReviewMode] = useState<ReviewMode>("js");

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [suggestionVersion, setSuggestionVersion] = useState(0);

  const [selectedReview, setSelectedReview] = useState("");
  const [editedReview, setEditedReview] = useState("");
  const [aiDrafts, setAiDrafts] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const selectedServiceLabels = serviceOptions
    .filter((option) => selectedServices.includes(option.id))
    .map((option) => option.label[language]);

  useEffect(() => {
    if (selectedServiceLabels.length === 0) {
      setSuggestions([]);
      return;
    }

    setSuggestions(
      getReviewTemplates(
        business.name,
        selectedServiceLabels,
        stars,
        language
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    business.name,
    stars,
    language,
    selectedServices,
    suggestionVersion,
  ]);

  function clearSelection() {
    setSelectedReview("");
    setEditedReview("");
    setConfirmed(false);
    setError("");
    setNotice("");
  }

  function chooseReview(review: string) {
    setSelectedReview(review);
    setEditedReview(review);
    setConfirmed(false);
    setError("");
    setNotice("");
  }

  function changeStars(value: number) {
    setStars(value);
    setReviewMode("js");
    setAiDrafts([]);
    clearSelection();
  }

  function changeLanguage(value: Language) {
    setLanguage(value);
    setReviewMode("js");
    setAiDrafts([]);
    clearSelection();
  }

  function toggleService(id: string) {
    setSelectedServices((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );

    setReviewMode("js");
    setAiDrafts([]);
    clearSelection();
  }

  async function generateAIReviews() {
    if (selectedServices.length === 0) {
      setError("Pehle apne products ya services select karein.");
      return;
    }

    setLoading(true);
    setError("");
    setNotice("");
    setReviewMode("ai");
    setAiDrafts([]);
    clearSelection();

    try {
      const response = await fetch("/api/review-suggestions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug: business.slug,
          stars,
          language,
          experience:
            `Customer selected these products/services as relevant to their visit: ` +
            `${selectedServiceLabels.join(", ")}. ` +
            `Business: ${business.name}. ` +
            `Rating selected: ${stars}/5. ` +
            "Use only the selected details. Do not invent quality, satisfaction, " +
            "staff behaviour, prices, events, or other experiences. " +
            "Generate concise wording without claiming anything not supplied.",
        }),
        signal: AbortSignal.timeout(25000),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "AI suggestions are unavailable."
        );
      }

      if (!Array.isArray(data.drafts)) {
        throw new Error("Invalid AI response.");
      }

      const drafts = data.drafts.filter(
        (item: unknown): item is string =>
          typeof item === "string" &&
          item.trim().length > 0 &&
          item.trim().length <= 2000
      );

      if (drafts.length === 0) {
        throw new Error("No valid suggestions were returned.");
      }

      setAiDrafts(drafts);
    } catch {
      setError(
        "AI suggestions abhi available nahi hain. Instant suggestions use kar sakte hain."
      );
    } finally {
      setLoading(false);
    }
  }


  const goToGoogleProfile = async () => {
  const reviewText = editedReview.trim();

  if (!reviewText) {
    setNotice("Pehle apna review select ya likho.");
    return;
  }

  if (!business.googleReviewUrl) {
    setNotice("Google review link available nahi hai.");
    return;
  }

  // Click ke turant baad Google page kholne ki koshish
  const googleTab = window.open(
    business.googleReviewUrl,
    "_blank"
  );

  try {
    await navigator.clipboard.writeText(reviewText);
    setNotice(
      "Review copy ho gaya! Google page par paste karke submit karo."
    );
  } catch (error) {
    console.error("Clipboard copy failed:", error);

    setNotice(
      "Review automatic copy nahi hua. Review ko manually copy karke Google par paste karo."
    );
  }

  if (!googleTab) {
    setNotice(
      "Google page popup se block hua ho sakta hai. Google review link manually kholo."
    );
  }
};



  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 text-gray-900">
      <div className="mx-auto w-full max-w-lg">
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
          <header className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl">
              ⭐
            </div>

            <h1 className="text-2xl font-bold">
              Review {business.name}
            </h1>

            {business.category && (
              <p className="mt-1 text-sm text-gray-500">
                {business.category}
              </p>
            )}

            {business.address && (
              <p className="mt-1 text-sm text-gray-500">
                {business.address}
              </p>
            )}

            <p className="mt-3 text-sm text-gray-600">
              Select your rating and the products or services relevant to your visit.
            </p>
          </header>

          {/* Rating */}
          <section className="mb-6">
            <p className="mb-3 text-center text-sm font-semibold">
              Your rating
            </p>

            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => changeStars(star)}
                  aria-label={`${star} star${star > 1 ? "s" : ""}`}
                  aria-pressed={stars === star}
                  className={`text-4xl transition hover:scale-110 ${
                    star <= stars ? "text-amber-400" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>

            <p className="mt-2 text-center text-sm text-gray-500">
              {stars} out of 5 stars
            </p>
          </section>

          {/* Language */}
          <section className="mb-6">
            <label
              htmlFor="review-language"
              className="mb-2 block text-sm font-semibold"
            >
              Review language
            </label>

            <select
              id="review-language"
              value={language}
              onChange={(event) =>
                changeLanguage(event.target.value as Language)
              }
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500"
            >
              {languages.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </section>

          {/* Category-specific services */}
          <section className="mb-6">
            <h2 className="mb-1 font-semibold">
              What did you visit or buy?
            </h2>

            <p className="mb-3 text-xs leading-5 text-gray-500">
              Select all that genuinely apply to your visit.
            </p>

            <div className="space-y-2">
              {serviceOptions.map((option) => (
                <label
                  key={option.id}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 text-sm transition ${
                    selectedServices.includes(option.id)
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedServices.includes(option.id)}
                    onChange={() => toggleService(option.id)}
                    className="mt-0.5 h-4 w-4 accent-blue-600"
                  />

                  <span>{option.label[language]}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Instant suggestions */}
          {reviewMode === "js" && (
            <section className="mb-5">
              <h2 className="mb-3 font-semibold">
                {selectedServices.length > 0
                  ? "Choose your review"
                  : "Select a product or service first"}
              </h2>

              {selectedServices.length > 0 && (
                <>
                  <div className="space-y-3">
                    {suggestions.map((review, index) => (
                      <button
                        key={`${suggestionVersion}-${index}-${review}`}
                        type="button"
                        onClick={() => chooseReview(review)}
                        aria-pressed={selectedReview === review}
                        className={`w-full rounded-xl border p-4 text-left text-sm leading-6 transition ${
                          selectedReview === review
                            ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                      >
                        <span className="flex items-start gap-3">
                          <span
                            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs ${
                              selectedReview === review
                                ? "border-blue-600 bg-blue-600 text-white"
                                : "border-gray-300"
                            }`}
                          >
                            {selectedReview === review ? "✓" : ""}
                          </span>

                          <span>{review}</span>
                        </span>
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSuggestionVersion((version) => version + 1);
                      clearSelection();
                    }}
                    className="mt-3 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm font-semibold hover:bg-gray-50"
                  >
                    ↻ More suggestions
                  </button>

                  <p className="mt-2 text-xs leading-5 text-gray-500">
                    Please edit the suggested wording if needed so it accurately
                    describes your own experience.
                  </p>
                </>
              )}
            </section>
          )}

          {/* Optional Groq AI */}
          <section className="mb-5">
            <button
              type="button"
              onClick={generateAIReviews}
              disabled={loading || selectedServices.length === 0}
              className="w-full rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 font-semibold text-blue-800 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Generating..." : "✨ Generate More with AI"}
            </button>

            {reviewMode === "ai" && aiDrafts.length > 0 && (
              <div className="mt-4 space-y-3">
                <h2 className="font-semibold">AI suggestions</h2>

                {aiDrafts.map((review, index) => (
                  <button
                    key={`${index}-${review}`}
                    type="button"
                    onClick={() => chooseReview(review)}
                    aria-pressed={selectedReview === review}
                    className={`w-full rounded-xl border p-4 text-left text-sm leading-6 ${
                      selectedReview === review
                        ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    {review}
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* Editable review */}
          {selectedReview && (
            <section className="mb-5">
              <label
                htmlFor="final-review"
                className="mb-2 block text-sm font-semibold"
              >
                Your review
              </label>

              <textarea
                id="final-review"
                value={editedReview}
                onChange={(event) => {
                  setEditedReview(event.target.value);
                  setConfirmed(false);
                  setNotice("");
                }}
                rows={4}
                maxLength={2000}
                className="w-full rounded-xl border border-gray-300 p-3 text-sm leading-6 outline-none focus:border-blue-500"
              />

              <label className="mt-3 flex cursor-pointer items-start gap-3 text-sm leading-5 text-gray-600">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(event) => setConfirmed(event.target.checked)}
                  className="mt-1 h-4 w-4 accent-blue-600"
                />

                <span>
                  I confirm this review accurately reflects my genuine experience.
                </span>
              </label>
            </section>
          )}

          {/* Messages */}
          {error && (
            <p
              role="alert"
              className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          {notice && (
            <p
              role="status"
              className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-800"
            >
              {notice}
            </p>
          )}

          {/* Google */}
          <button
            type="button"
            onClick={goToGoogleProfile}
            disabled={!selectedReview || !confirmed}
            className="w-full rounded-xl bg-blue-600 px-4 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            Go to Google Profile ↗
          </button>

          {business.googleReviewUrl && (
            <a
              href={business.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block text-center text-sm font-medium text-blue-700 underline"
            >
              Open Google review page
            </a>
          )}

          <p className="mt-4 text-center text-xs text-gray-400">
            Powered by EkaaMaarg
          </p>
        </section>
      </div>
    </main>
  );
}
