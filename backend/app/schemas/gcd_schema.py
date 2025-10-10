from pydantic import BaseModel, Field
from typing import List
from datetime import datetime


class GCDStep(BaseModel):
    a: int
    b: int
    quotient: int
    remainder: int


class GCDRequest(BaseModel):
    a: int = Field(..., gt=0, description="Первое число (должно быть больше 0)")
    b: int = Field(..., gt=0, description="Второе число (должно быть больше 0)")


class GCDResponse(BaseModel):
    steps: List[GCDStep]
    result: int
    
    class Config:
        from_attributes = True


class GCDHistoryItem(BaseModel):
    id: int
    a: int
    b: int
    result: int
    steps: List[dict]
    created_at: datetime
    
    class Config:
        from_attributes = True


class UserSchema(BaseModel):
    id: int
    email: str
    created_at: datetime
    
    class Config:
        from_attributes = True


class UserCreate(BaseModel):
    email: str = Field(..., description="Email пользователя")
    password: str = Field(..., min_length=6, description="Пароль (минимум 6 символов)")


class UserLogin(BaseModel):
    email: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TheoryResponse(BaseModel):
    title: str
    description: str
    complexity: str
    examples: List[dict]