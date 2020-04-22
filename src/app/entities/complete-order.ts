export class CompleteOrderDto {
  private date: Date;
  constructor(
    public userId: string,
    public items: OrderItemDto[]
  ) { 
    this.date = new Date();
  }
}

export class OrderItemDto {
  constructor(
    id: string,
    quantity: string
  ) { }
}

