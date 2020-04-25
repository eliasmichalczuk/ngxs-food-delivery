import { Dish } from './../../entities/dish';
export class ItemOnBag {
  private _bagId: number;
  get bagId() {
    return this._bagId;
  }
  private _calledToBeEdited: boolean;
  get calledToBeEdited() {
    return this._calledToBeEdited;
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
