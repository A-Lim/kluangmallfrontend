export class UpdatePointsVm {
  user_id: number;
  type: 'add' | 'deduct';
  amount: number;
  description: string;
}