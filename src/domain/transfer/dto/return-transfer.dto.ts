export class ReturnTransferDto {
  id: string;
  sender: {
    id: string;
    ballance: number;
  };
  amount: number;
  authorized: boolean;
  createdAt: Date;
}
