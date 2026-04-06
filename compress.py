import joblib
import os

print("Loading the massive model... (This will take a few seconds)")
model = joblib.load('traffic_severity_model.pkl')

print("Compressing and saving... (Please wait)")
# compress=5 offers massive size reduction
joblib.dump(model, 'traffic_severity_model.pkl', compress=5)

new_size = os.path.getsize('traffic_severity_model.pkl') / (1024 * 1024)
print(f"Done! New model size: {new_size:.2f} MB")