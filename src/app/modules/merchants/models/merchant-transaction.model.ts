export interface MerchantTransaction {
  id: number;
  merchant_id: number;
  credit: number;
  type: number;
  remark: string;
  refunded: boolean;
  refund_transaction_id: number;
}