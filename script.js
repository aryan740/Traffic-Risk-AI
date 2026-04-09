document.getElementById('predictionForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const btn = document.getElementById('submitBtn');
    btn.innerText = 'Processing...';
    btn.disabled = true;

    // Build the payload, injecting the hidden Humidity requirement
    const payload = {
        Hour: parseInt(document.getElementById('Hour').value),
        Weekday: parseInt(document.getElementById('Weekday').value),
        Month: parseInt(document.getElementById('Month').value),
        Temperature: parseFloat(document.getElementById('Temperature').value),
        Visibility: parseFloat(document.getElementById('Visibility').value),
        Wind_Speed: parseFloat(document.getElementById('Wind_Speed').value),
        Humidity: 50.0,  // Hidden default to satisfy the backend
        Junction: parseInt(document.getElementById('Junction').value),
        Traffic_Signal: parseInt(document.getElementById('Traffic_Signal').value),
        Crossing: parseInt(document.getElementById('Crossing').value),
        Stop: parseInt(document.getElementById('Stop').value),
        Weather: document.getElementById('Weather').value
    };

    try {
        const response = await fetch('https://aryan7004-traffic-risk-api.hf.space/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        
        // Update UI
        const resultCard = document.getElementById('resultCard');
        const scoreElement = document.getElementById('riskScore');
        const labelElement = document.getElementById('severityLabel');
        const titleElement = document.getElementById('resultTitle');

        titleElement.innerText = "Calculated Risk";
        scoreElement.innerText = result.risk_score;

        // Reset classes
        resultCard.className = 'card result-card';
        scoreElement.className = '';
        labelElement.className = '';

        // Dynamic Styling based on severity
        if (result.severity_class === 1 || result.risk_score > 60) {
            resultCard.classList.add('danger-glow');
            scoreElement.classList.add('danger-text');
            labelElement.classList.add('danger-text');
            labelElement.innerText = "SEVERE RISK DETECTED";
        } else {
            resultCard.classList.add('warning-glow');
            scoreElement.classList.add('warning-text');
            labelElement.classList.add('warning-text');
            labelElement.innerText = "MODERATE / MINOR RISK";
        }

    } catch (error) {
        alert("Connection failed. The AI container might be waking up, try again in 30 seconds.");
        console.error(error);
    } finally {
        btn.innerText = 'Execute Analysis';
        btn.disabled = false;
    }
});