/**
 * Operational system events for the realtime workspace event log.
 */

export enum SystemEventType {
  TransportInit = 'transport_init',
  TransportLive = 'transport_live',
  TransportDown = 'transport_down',
  TransportReconnect = 'transport_reconnect',
  SessionOpen = 'session_open',
  SessionResume = 'session_resume',
  SessionClosed = 'session_closed',
  MessageIn = 'message_in',
  MessageOut = 'message_out',
  PresenceChange = 'presence_change',
  Typing = 'typing',
  ContextAttach = 'context_attach',
  ContextInject = 'context_inject',
  ContextDetach = 'context_detach',
}

export enum SystemEventLevel {
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
}

export interface SystemEvent {
  id: string;
  type: SystemEventType;
  level: SystemEventLevel;
  messageKey: string;
  messageParams?: Record<string, string>;
  at: string;
}
