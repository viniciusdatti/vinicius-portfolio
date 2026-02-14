"""Logging configuration for the application."""

import logging
import sys
from typing import Optional

from .config import get_settings


def setup_logging(level: Optional[str] = None) -> logging.Logger:
    """
    Configure and return the application logger.

    Args:
        level: Optional log level override. Uses settings if not provided.

    Returns:
        Configured logger instance.
    """
    settings = get_settings()
    log_level = level or settings.log_level

    # Create formatter
    formatter = logging.Formatter(
        fmt="%(asctime)s | %(levelname)-8s | %(name)s | %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
    )

    # Configure handler
    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(formatter)

    # Configure root logger
    logger = logging.getLogger("portfolio")
    logger.setLevel(getattr(logging, log_level.upper(), logging.INFO))
    logger.handlers = [handler]

    return logger


def get_logger(name: str = "portfolio") -> logging.Logger:
    """
    Get a logger instance.

    Args:
        name: Logger name (usually module name).

    Returns:
        Logger instance.
    """
    return logging.getLogger(name)
