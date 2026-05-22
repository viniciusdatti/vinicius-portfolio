/**
 * Chat domain types shared across chat modules (breaks import cycles).
 */

export enum ChatSessionStatus {
  Active = 'active',
  Closed = 'closed',
  Archived = 'archived',
}

export enum ChatMessageSenderType {
  Visitor = 'visitor',
  Admin = 'admin',
}

export interface ChatSession {
  session_id: string;
  visitor_name: string;
  visitor_company: string | null;
  status: ChatSessionStatus;
  unread_count: number;
  last_message: string | null;
  started_at: string;
}

export interface ChatMessage {
  id: number;
  content: string;
  sender_type: ChatMessageSenderType;
  is_read: boolean;
  created_at: string;
}
