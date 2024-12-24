from fastapi import APIRouter, Depends

from server.infra.dependencies import get_connection
from server.infra.models.product import Product
from server.infra.productRepo import ProductRepo


product_router = APIRouter(prefix="/product", tags=["Products"])


@product_router.get("/", response_model=list[Product])
async def get_products(conn=Depends(get_connection)):
    product_repo = ProductRepo(conn)
    return product_repo.get_all()


@product_router.get("/products_category", response_model=list[Product])
async def get_products_by_category(category: str, conn=Depends(get_connection)):
    product_repo = ProductRepo(conn)
    return product_repo.get_by_category(category)


@product_router.get("/categories", response_model=list[str])
async def get_categories(conn=Depends(get_connection)):
    product_repo = ProductRepo(conn)
    return product_repo.get_all_categories()


