export type BusinessFeatures = {
  digitalProfile: boolean;
  productCatalogue: boolean;
  serviceCatalogue: boolean;
  whatsappEnquiries: boolean;
  onlineOrdering: boolean;
  appointmentBooking: boolean;
  staffRequests: boolean;
  requestBill: boolean;
  customerReviews: boolean;
  digitalMenu: boolean;
  vehicleCatalogue: boolean;
};


export type Business = {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  phone: string;
  whatsapp: string;
  address: string;
  city: string;
  image: string;
  services: string[];
  welcomeMessage: string;
  isActive: boolean;
  features?: BusinessFeatures;
    googleReviewUrl?: string;

};
