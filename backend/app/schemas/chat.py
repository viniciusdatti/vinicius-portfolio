# Core
from typing import Optional, List
from datetime import datetime

# Libraries
from pydantic import BaseModel, Field

# App - Models
from app.models.chat import ChatStatus, SenderType


class ChatMessageBase(BaseModel):
    content: str = Field(..., max_length=5000)


class ChatMessageCreate(ChatMessageBase):
    sender_type: SenderType


class ChatMessageResponse(ChatMessageBase):
    id: int
    sender_type: SenderType
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True


class ChatSessionBase(BaseModel):
    visitor_name: str = Field(..., max_length=100)
    visitor_company: Optional[str] = Field(None, max_length=200)


class ChatSessionCreate(ChatSessionBase):
    pass


class ChatSessionResponse(ChatSessionBase):
    id: int
    session_id: str
    status: ChatStatus
    unread_count: int
    started_at: datetime
    closed_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class ChatSessionWithMessages(ChatSessionResponse):
    messages: List[ChatMessageResponse] = []


class ChatSessionListItem(BaseModel):
    session_id: str
    visitor_name: str
    visitor_company: Optional[str]
    status: ChatStatus
    unread_count: int
    last_message: Optional[str]
    started_at: datetime

    class Config:
        from_attributes = True


# WebSocket Events
class WSChatMessage(BaseModel):
    type: str  # "message", "typing", "read"
    session_id: str
    content: Optional[str] = None
    sender_type: Optional[SenderType] = None


class WSAdminStatus(BaseModel):
    type: str = "admin_status"
    is_online: bool
