from typing import List, Tuple
from app.schemas.gcd_schema import GCDStep


class EuclidService:
    @staticmethod
    def calculate_gcd_with_steps(a: int, b: int) -> Tuple[int, List[GCDStep]]:
        steps = []
        if a < b:
            a, b = b, a
        
        while b != 0:
            quotient = a // b
            remainder = a % b
            
            steps.append(GCDStep(
                a=a,
                b=b,
                quotient=quotient,
                remainder=remainder
            ))
            
            a, b = b, remainder
        
        result = a
        
        return result, steps
    
    @staticmethod
    def get_explanation() -> dict:
        return {
            "title": "Алгоритм Евклида",
            "description": (
                "Алгоритм Евклида — это эффективный метод нахождения наибольшего общего делителя (НОД) "
                "двух целых чисел. Основан на принципе: НОД(a, b) = НОД(b, a mod b). "
                "Алгоритм повторяется до тех пор, пока остаток не станет равен нулю. "
                "Последнее ненулевое значение и будет НОД."
            ),
            "complexity": "O(log min(a, b))",
            "examples": [
                {
                    "a": 48,
                    "b": 18,
                    "result": 6,
                    "explanation": "48 = 18 × 2 + 12, затем 18 = 12 × 1 + 6, затем 12 = 6 × 2 + 0. НОД = 6"
                },
                {
                    "a": 100,
                    "b": 35,
                    "result": 5,
                    "explanation": "100 = 35 × 2 + 30, 35 = 30 × 1 + 5, 30 = 5 × 6 + 0. НОД = 5"
                }
            ]
        }