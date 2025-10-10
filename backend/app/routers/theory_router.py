from fastapi import APIRouter
from app.schemas.gcd_schema import TheoryResponse
from app.services.euclid_service import EuclidService

router = APIRouter()
euclid_service = EuclidService()

theory_cache = {}


@router.get("/euclid", response_model=TheoryResponse)
async def get_euclid_theory():
    if "euclid" in theory_cache:
        return theory_cache["euclid"]
    
    theory = euclid_service.get_explanation()
    theory_cache["euclid"] = theory
    
    return TheoryResponse(**theory)


@router.get("/complexity")
async def get_complexity_info():
    return {
        "time_complexity": "O(log min(a, b))",
        "space_complexity": "O(1)",
        "description": (
            "Временная сложность алгоритма Евклида логарифмическая, "
            "что делает его очень эффективным даже для больших чисел. "
            "Пространственная сложность константная - O(1), "
            "так как используется фиксированное количество переменных."
        ),
        "worst_case": "Последовательные числа Фибоначчи",
        "best_case": "Одно число кратно другому"
    }


@router.get("/applications")
async def get_applications():
    return {
        "applications": [
            {
                "title": "Упрощение дробей",
                "description": "НОД используется для сокращения дробей до несократимого вида"
            },
            {
                "title": "Криптография",
                "description": "Расширенный алгоритм Евклида применяется в RSA шифровании"
            },
            {
                "title": "Решение диофантовых уравнений",
                "description": "Поиск целочисленных решений линейных уравнений"
            },
            {
                "title": "Периодические дроби",
                "description": "Нахождение периода в десятичном представлении дроби"
            }
        ]
    }