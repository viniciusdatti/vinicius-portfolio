"""Script to create an admin user."""

# Core
import sys
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))

# Libraries
from sqlalchemy.orm import Session

# App - Database
from app.db.session import SessionLocal

# App - Models
from app.models.user import User, UserRole

# App - Core
from app.core.security import get_password_hash


def create_admin_user(
    email: str,
    password: str,
    name: str,
    role: UserRole = UserRole.ADMIN
) -> User:
    """Create an admin user in the database."""
    db: Session = SessionLocal()
    
    try:
        # Check if user already exists
        existing_user = db.query(User).filter(User.email == email).first()
        if existing_user:
            print(f"User with email {email} already exists!")
            return existing_user
        
        # Create new user
        hashed_password = get_password_hash(password)
        user = User(
            email=email,
            hashed_password=hashed_password,
            name=name,
            role=role,
            is_active=True
        )
        
        db.add(user)
        db.commit()
        db.refresh(user)
        
        print(f"Admin user created successfully!")
        print(f"  Email: {email}")
        print(f"  Name: {name}")
        print(f"  Role: {role.value}")
        
        return user
    
    finally:
        db.close()


if __name__ == "__main__":
    # Default admin credentials
    ADMIN_EMAIL = "admin@viniciusdatti.com"
    ADMIN_PASSWORD = "admin123"
    ADMIN_NAME = "Vinicius Datti"
    
    print("Creating admin user...")
    create_admin_user(
        email=ADMIN_EMAIL,
        password=ADMIN_PASSWORD,
        name=ADMIN_NAME,
        role=UserRole.SUPER_ADMIN
    )
