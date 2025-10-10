from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.db.base import get_db
from app.db.models import User, GCDResult
from app.schemas.gcd_schema import GCDRequest, GCDResponse, GCDHistoryItem
from app.services.euclid_service import EuclidService
from app.core.security import get_current_user

router = APIRouter()
euclid_service = EuclidService()


@router.post("/calculate", response_model=GCDResponse)
async def calculate_gcd(
    request: GCDRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    try:
        result, steps = euclid_service.calculate_gcd_with_steps(request.a, request.b)
        
        gcd_result = GCDResult(
            user_id=current_user.id,
            a=request.a,
            b=request.b,
            result=result,
            steps=[step.dict() for step in steps]
        )
        
        db.add(gcd_result)
        db.commit()
        db.refresh(gcd_result)
        
        return GCDResponse(
            steps=steps,
            result=result
        )
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Ошибка при вычислении НОД: {str(e)}"
        )


@router.get("/history", response_model=List[GCDHistoryItem])
async def get_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
    limit: int = 10
):
    history = db.query(GCDResult)\
        .filter(GCDResult.user_id == current_user.id)\
        .order_by(GCDResult.created_at.desc())\
        .limit(limit)\
        .all()
    
    return history


@router.get("/history/{result_id}", response_model=GCDHistoryItem)
async def get_history_item(
    result_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    result = db.query(GCDResult)\
        .filter(GCDResult.id == result_id, GCDResult.user_id == current_user.id)\
        .first()
    
    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Результат не найден"
        )
    
    return result


@router.delete("/history/{result_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_history_item(
    result_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    result = db.query(GCDResult)\
        .filter(GCDResult.id == result_id, GCDResult.user_id == current_user.id)\
        .first()
    
    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Результат не найден"
        )
    
    db.delete(result)
    db.commit()
    
    return None