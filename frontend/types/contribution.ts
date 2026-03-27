export interface Contribution {
  id: number;
  user_id: number;
  amount: number;
  type?: string;
  note?: string;
  date: string;
}

export interface ContributionPayload {
  amount: number;
  type?: string;
  note?: string;
}
