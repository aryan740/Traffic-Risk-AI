# Traffic Risk Predictor

**Live Demo:** [View Dashboard](https://aryan740.github.io/Traffic-Risk-AI/)  
**Live API Endpoint:** `https://aryan7004-traffic-risk-api.hf.space/predict`

## Overview
This is a machine learning web application that predicts the severity of traffic accidents based on weather conditions, time of day, and infrastructure data. 

The project uses a decoupled architecture: a static frontend dashboard hosted on GitHub Pages that communicates with a containerized Python machine learning API hosted on Hugging Face Spaces.

## Tech Stack
* **Frontend:** HTML, CSS, JavaScript (GitHub Pages)
* **Backend:** Python, FastAPI, Uvicorn, Docker (Hugging Face Spaces)
* **Machine Learning:** Scikit-Learn, Pandas, Joblib
* **Model:** Random Forest Classifier 

## Project Details
* **Data Processing:** Trained on a subset of US Traffic Accident data, focusing on temporal and weather-based features.
* **Class Imbalance:** Utilized SMOTE (Synthetic Minority Over-sampling Technique) to handle the imbalance between minor and severe accidents in the training data.
* **Architecture Pivot:** The backend was containerized using Docker to ensure environment consistency and deployed to Hugging Face's robust AI infrastructure, bypassing the severe memory limits of standard free-tier cloud hosts.

## Local Setup

**1. Clone the repository:**
```bash
git clone [https://github.com/aryan740/Traffic-Risk-AI.git](https://github.com/aryan740/Traffic-Risk-AI.git)
cd Traffic-Risk-AI