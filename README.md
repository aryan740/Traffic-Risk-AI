# Traffic Risk Predictor

**Live Demo:** [View Dashboard](https://aryan740.github.io/Traffic-Risk-AI/)  
**Live API Endpoint:** `https://traffic-risk-ai-1.onrender.com/predict`

## Overview
This is a machine learning web application that predicts the severity of traffic accidents based on weather conditions, time of day, and infrastructure data. 

The project uses a decoupled architecture: a static frontend dashboard hosted on GitHub Pages that communicates with a Python machine learning API hosted on Render.

## Tech Stack
* **Frontend:** HTML, CSS, JavaScript (GitHub Pages)
* **Backend:** Python, FastAPI, Uvicorn (Render)
* **Machine Learning:** Scikit-Learn, Pandas, Joblib
* **Model:** Random Forest Classifier 

## Project Details
* **Data Processing:** Trained on a subset of US Traffic Accident data, focusing on temporal and weather-based features.
* **Class Imbalance:** Utilised SMOTE (Synthetic Minority Over-sampling Technique) to handle the imbalance between minor and severe accidents in the training data.
* **Optimisation:** The final Random Forest model was heavily pruned (reduced depth and estimators) to function efficiently within the 512MB RAM constraints of free cloud hosting.

## Local Setup

**1. Clone the repository:**
```bash
git clone [https://github.com/aryan740/Traffic-Risk-AI.git](https://github.com/aryan740/Traffic-Risk-AI.git)
cd Traffic-Risk-AI
