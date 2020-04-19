import { Dish } from './dish';

export interface Menu {
  id: string;
  restaurantId: string;
  dishes: Dish[];
}
