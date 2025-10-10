from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.db.base import engine, Base
from app.routers import auth_router, gcd_router, theory_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(
    title="НОД Визуализатор API",
    description="Образовательный сервис для визуализации алгоритма Евклида",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router.router, prefix="/auth", tags=["Authentication"])
app.include_router(gcd_router.router, prefix="/gcd", tags=["GCD Algorithm"])
app.include_router(theory_router.router, prefix="/theory", tags=["Theory"])


@app.get("/")
async def root():
    return {
        "message": "НОД Визуализатор API",
        "docs": "/docs",
        "version": "1.0.0"
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy"}