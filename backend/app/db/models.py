from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from datetime import datetime

from app.db.base import Base


class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    gcd_results = relationship("GCDResult", back_populates="user")


class GCDResult(Base):
    __tablename__ = "gcd_results"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    a = Column(Integer, nullable=False)
    b = Column(Integer, nullable=False)
    result = Column(Integer, nullable=False)
    steps = Column(JSON, nullable=False)  
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="gcd_results")