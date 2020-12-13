import { MerchantTransaction } from 'app/modules/merchants/models/merchant-transaction.model';

export interface MerchantTransactionResponse {
  credit_balance: number;
  transaction: MerchantTransaction;
}