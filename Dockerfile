FROM python:3.10

# Hugging Face requires a non-root user
RUN useradd -m -u 1000 user
USER user
ENV PATH="/home/user/.local/bin:$PATH"

WORKDIR /code

# Copy and install dependencies securely
COPY --chown=user ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copy your actual code and models into the container
COPY --chown=user . /code

# Boot the server on HF's mandatory port
CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "7860"]