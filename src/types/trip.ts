export type TripItemBase = {
  id: string;
  city?: string;
  notes?: string;
  link?: string;
  createdAt: string;
  updatedAt: string;
};

export type Stay = TripItemBase & {
  type: "stay";
  name: string;
  address?: string;
  checkIn: string;
  checkOut: string;
  reservationCode?: string;
  pin?: string;
  contact?: string;
  source?: "Booking" | "Airbnb" | "Other";
  arrivalInstructions?: string;
  guests?: string;
  price?: string;
};

export type Flight = TripItemBase & {
  type: "flight";
  airline: string;
  flightNumber?: string;
  reservationCode?: string;
  origin: string;
  destination: string;
  departureDate: string;
  departureTime?: string;
  arrivalDate?: string;
  arrivalTime?: string;
  terminal?: string;
  gate?: string;
  baggage?: string;
};

export type Reservation = TripItemBase & {
  type: "reservation";
  title: string;
  category?: "car" | "restaurant" | "tour" | "other";
  city?: string;
  date?: string;
  time?: string;
  address?: string;
  reservationCode?: string;
  status?: "pending" | "confirmed" | "done";
};

export type OtherItem = TripItemBase & {
  type: "other";
  title: string;
  category?: string;
  city?: string;
  date?: string;
};

export type TripItem = Stay | Flight | Reservation | OtherItem;

export type TripItemType = TripItem["type"];
