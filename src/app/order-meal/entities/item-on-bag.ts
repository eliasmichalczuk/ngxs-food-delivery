import { Dish } from './../../entities/dish';
export class ItemOnBag {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public price: number,
    public currency: string,
    public quantity: number
  ) { }
}
