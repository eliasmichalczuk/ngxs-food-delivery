export class CreateOrder {

  constructor(
    restaurantId: string,
    orders: {
      id: string,
      quantity: number
    } [],
    userId: string
  ) { }

  static empty(): CreateOrder {
    return new CreateOrder('', [], '');
  }
}
