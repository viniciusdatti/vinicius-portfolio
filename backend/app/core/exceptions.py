"""Global exception handlers for the application."""

import logging
from typing import Any, Dict, cast

from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from sqlalchemy.exc import SQLAlchemyError
from starlette.types import ExceptionHandler

logger = logging.getLogger("portfolio")


class APIException(Exception):
    """Base exception for API errors."""

    def __init__(
        self,
        message: str = "An error occurred",
        status_code: int = status.HTTP_500_INTERNAL_SERVER_ERROR,
        detail: Any = None,
    ):
        self.message = message
        self.status_code = status_code
        self.detail = detail
        super().__init__(self.message)


class NotFoundException(APIException):
    """Resource not found exception."""

    def __init__(self, message: str = "Resource not found"):
        super().__init__(message=message, status_code=status.HTTP_404_NOT_FOUND)


def create_error_response(
    status_code: int,
    message: str,
    detail: Any = None,
) -> Dict[str, Any]:
    """Create standardized error response."""
    response = {"detail": message}
    if detail is not None:
        response["errors"] = detail
    return response


async def api_exception_handler(request: Request, exc: APIException) -> JSONResponse:
    """Handle custom API exceptions."""
    logger.warning(
        f"API Exception: {exc.message} | Path: {request.url.path} | Method: {request.method}"
    )
    return JSONResponse(
        status_code=exc.status_code,
        content=create_error_response(exc.status_code, exc.message, exc.detail),
    )


async def sqlalchemy_exception_handler(
    request: Request, exc: SQLAlchemyError
) -> JSONResponse:
    """Handle SQLAlchemy database exceptions."""
    logger.error(
        f"Database Error | Path: {request.url.path} | Method: {request.method} | Error: {str(exc)}",
        exc_info=True,
    )
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content=create_error_response(
            status.HTTP_500_INTERNAL_SERVER_ERROR,
            "A database error occurred. Please try again later.",
        ),
    )


async def generic_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    """Handle unexpected exceptions."""
    logger.error(
        "Unexpected Error | Path: %s | Method: %s | Error: %s",
        request.url.path,
        request.method,
        str(exc),
        exc_info=True,
    )
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content=create_error_response(
            status.HTTP_500_INTERNAL_SERVER_ERROR,
            "An unexpected error occurred. Please try again later.",
        ),
    )


def register_exception_handlers(app: FastAPI) -> None:
    """Register all exception handlers with the FastAPI app."""
    app.add_exception_handler(
        APIException,
        cast(ExceptionHandler, api_exception_handler),
    )
    app.add_exception_handler(
        SQLAlchemyError,
        cast(ExceptionHandler, sqlalchemy_exception_handler),
    )
    app.add_exception_handler(
        Exception,
        cast(ExceptionHandler, generic_exception_handler),
    )
