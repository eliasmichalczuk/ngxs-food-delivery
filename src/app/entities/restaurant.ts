export interface Restaurant {
  id: string;
  name: string;
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
  };
  style: string;
  image: string;
  rating: number;
  user: {
    name: string;
    id: string;
    review: string;
  };
}
