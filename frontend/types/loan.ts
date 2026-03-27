export interface Loan {
  id: number;
  user_id: number;
  amount: number;
  interest?: number;
  status: string;
  requested_at: string;
  due_date?: string;
  repaid: boolean;
  note?: string;
}

export interface LoanPayload {
  amount: number;
  interest?: number;
  due_date?: string;
  note?: string;
}
