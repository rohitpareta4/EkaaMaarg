import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getBusinessBySlug } from "@/lib/businesses";
import ReviewExperience from "@/components/review/ReviewExperience";

type Props = {
  params: Promise<{ slug: string }>;
};

export default function ReviewPage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading review...
        </div>
      }
    >
      <ReviewContent params={params} />
    </Suspense>
  );
}

async function ReviewContent({ params }: Props) {
  const { slug } = await params;
  const business = await getBusinessBySlug(slug);

  if (!business || !business.isActive) {
    notFound();
  }

  return <ReviewExperience business={business} />;
}