export interface Notification {
  id: number;
  user_id?: number;
  message: string;
  type?: string;
  created_at: string;
  read: boolean;
}

export interface NotificationPayload {
  message: string;
  type?: string;
  user_id?: number;
}
