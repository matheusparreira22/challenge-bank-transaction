export class Money {
  value: number;

  constructor(amount: number) {
    amount = parseFloat(amount.toString());

    if (amount <= 0) {
      throw new Error('amount cannot be negative or zero');
    }

    this.value = parseFloat(amount.toFixed(2));

  }

  add(other: number) {
    return new Money(this.value + other);
  }

  subtraction(other: number) {
    return new Money(this.value - other);
  }
}
