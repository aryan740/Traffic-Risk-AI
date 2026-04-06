from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib

app = FastAPI()

# This allows your HTML file to talk to your Python server safely
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model and exact columns
model = joblib.load('traffic_severity_model.pkl')
model_columns = joblib.load('model_columns.pkl')

# Define the expected incoming data from the website
class TrafficData(BaseModel):
    Hour: int
    Weekday: int
    Month: int
    Temperature: float
    Visibility: float
    Wind_Speed: float
    Humidity: float
    Junction: int
    Traffic_Signal: int
    Crossing: int
    Stop: int
    Weather: str

@app.post("/predict")
def predict_severity(data: TrafficData):
    # 1. Create a blank dataframe with 0.0s so it accepts decimal coordinates
    df = pd.DataFrame(0.0, index=[0], columns=model_columns)
    
    # 2. Inject the direct numerical data
    df.at[0, 'Hour'] = data.Hour
    df.at[0, 'Weekday'] = data.Weekday
    df.at[0, 'Month'] = data.Month
    df.at[0, 'Temperature(F)'] = data.Temperature
    df.at[0, 'Visibility(mi)'] = data.Visibility
    df.at[0, 'Wind_Speed(mph)'] = data.Wind_Speed
    df.at[0, 'Humidity(%)'] = data.Humidity
    df.at[0, 'Junction'] = data.Junction
    df.at[0, 'Traffic_Signal'] = data.Traffic_Signal
    df.at[0, 'Crossing'] = data.Crossing
    df.at[0, 'Stop'] = data.Stop
    
    # 3. THE FIX: Inject realistic baseline data for missing GPS columns
    # If the model expects these columns, we feed it a California highway baseline instead of the middle of the ocean
    if 'Start_Lat' in df.columns:
        df.at[0, 'Start_Lat'] = 36.77 
    if 'Start_Lng' in df.columns:
        df.at[0, 'Start_Lng'] = -119.41
    if 'Distance(mi)' in df.columns:
        df.at[0, 'Distance(mi)'] = 1.0 
    
    # 4. FIXING THE WEATHER BUG: Smart matching
    for col in df.columns:
        if 'Weather_Condition' in col and data.Weather.lower() in col.lower():
            df.at[0, col] = 1
            
    # 5. Generate Prediction and Risk Probability
    prediction = int(model.predict(df)[0])
    probability = model.predict_proba(df)[0][1] * 100 
    
    return {
        "severity_class": prediction,
        "risk_score": round(probability, 2)
    }