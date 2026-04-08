# Start with a standard Python environment
FROM python:3.10

# Set the working directory
WORKDIR /code

# Copy the requirements and install them
COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copy your actual code and models into the container
COPY . /code

# Hugging Face REQUIRES the server to run on port 7860
CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "7860"]