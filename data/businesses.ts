
export type Business = {
  name: string;
  slug: string;
  category: string;
  description: string;
  logo: string;
  googleReviewUrl: string;
  active: boolean;
};

export const businesses: Business[] = [
  {
    name: "Sanjay Electricals",
    slug: "sanjay-electricals",
    category: "Electrical shop",
    description: "Electrical products and accessories.",
    logo: "/Logo.png",
    googleReviewUrl: "https://g.page/r/YOUR_GOOGLE_REVIEW_ID/review",
    active: true,
  },
  {
    name: "ABC Clothing",
    slug: "abc-clothing",
    category: "Clothing store",
    description: "Explore clothing and new collections.",
    logo: "/Logo.png",
    googleReviewUrl: "https://g.page/r/YOUR_OTHER_REVIEW_ID/review",
    active: true,
  },
];

export function getBusinessBySlug(slug: string) {
  return businesses.find(
    (business) => business.slug === slug && business.active
  );
}
