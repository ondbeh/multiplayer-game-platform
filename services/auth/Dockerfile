FROM python:3.9-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy source files
COPY src/ ./src/

# Make sure there's an __init__.py in each directory
RUN touch src/__init__.py src/utils/__init__.py

# Set PYTHONPATH for module imports
ENV PYTHONPATH=/app

# Expose port
EXPOSE 8000

# Use uvicorn to run the FastAPI app
CMD ["python", "src/main.py"]