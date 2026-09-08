export type PastorType = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  imageUrl?: string;
};

export type ChurchType = {
  id: string;
  name: string;
  address: string;
  number: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  pastors: PastorType[];
  imageUrl?: string;
};

export type DevotionalType = {
  id: string;
  title: string;
  verse: string;
  date: string;
  content: string;
};
