import { Dish } from './../../entities/dish';
export class ItemOnBag {
  private _bagId: number;
  get bagId() {
    return this._bagId;
  }

  constructor(
    public id: string,
    public name: string,
    public description: string,
    public price: number,
    public currency: string,
    public quantity: number
  ) { }
}
