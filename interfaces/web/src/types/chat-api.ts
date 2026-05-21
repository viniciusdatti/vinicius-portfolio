/**
 * Chat REST API contracts (DTOs).
 */

/** GET /chat/sessions row (admin). */
export interface ChatApiSessionDto {
  session_id: string;
  visitor_name: string;
  visitor_company?: string;
  started_at: string;
  unread_count?: number;
  last_message?: string;
}

/** GET /chat/sessions/{id}/messages row (admin). */
export interface ChatApiMessageDto {
  id: number;
  session_id: string;
  content: string;
  sender_type: string;
  is_read: boolean;
  created_at: string | ChatApiDateField;
}

/** GET /chat/sessions/{id}/visitor-messages row (public). */
export interface ChatApiVisitorMessageDto {
  id: number;
  content: string;
  sender_type: string;
  is_read: boolean;
  created_at: string;
}

/** FastAPI may serialize dates as ISO strings or objects. */
export type ChatApiDateField = string | { toISOString?: () => string };
