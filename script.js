document.getElementById('executeBtn').addEventListener('click', async function() {
    
    const btn = this;
    const btnText = btn.querySelector('span');
    const resultPanel = document.getElementById('resultPanel');
    const gaugeBar = document.getElementById('gaugeBar');
    const riskScoreText = document.getElementById('riskScore');
    const severityBadge = document.getElementById('severityBadge');
    const severityText = document.getElementById('severityText');

    // 1. Visually enter processing state
    btn.classList.add('processing');
    btnText.innerText = 'Analyzing Telemetry...';
    resultPanel.classList.add('hidden'); // Hide old results
    
    // Reset Gauge
    gaugeBar.style.width = '0%';
    riskScoreText.innerText = '00.00%';

    // 2. Collect form data
    const payload = {
        Hour: parseInt(document.getElementById('Hour').value) || 12,
        Weekday: parseInt(document.getElementById('Weekday').value),
        Month: parseInt(document.getElementById('Month').value) || 6,
        Temperature: parseFloat(document.getElementById('Temperature').value) || 70.0,
        Visibility: parseFloat(document.getElementById('Visibility').value) || 10.0,
        Wind_Speed: parseFloat(document.getElementById('Wind_Speed').value) || 5.0,
        Humidity: parseFloat(document.getElementById('Humidity').value) || 50.0,
        Junction: document.getElementById('Junction').checked ? 1 : 0,
        Traffic_Signal: document.getElementById('Traffic_Signal').checked ? 1 : 0,
        Crossing: document.getElementById('Crossing').checked ? 1 : 0,
        Stop: document.getElementById('Stop').checked ? 1 : 0,
        Weather: document.getElementById('Weather').value || 'Clear'
    };

    try {
        // 3. API Call to Hugging Face
        const response = await fetch('https://aryan7004-traffic-risk-api.hf.space/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error('Network fault');
        
        const result = await response.json();

        // 4. Update UI with AI results
        
        // Show panel
        resultPanel.classList.remove('hidden');

        // Update Gauge/Score
        const score = result.risk_score;
        gaugeBar.style.width = `${score}%`;
        riskScoreText.innerText = `${score.toFixed(2)}%`;

        // Reset Badge class
        severityBadge.className = 'status-badge'; 

        // Apply visual logic based on severity class
        if (result.severity_class === 2) {
            severityBadge.innerText = 'Severe Risk';
            severityBadge.classList.add('severe');
            severityText.innerText = 'Class 2: High Probability of Injury or Fatality';
        } else {
            severityBadge.innerText = 'Minor Risk';
            severityBadge.classList.add('minor');
            severityText.innerText = 'Class 1: Likely Property Damage / Minor Fender Bender';
        }

    } catch (error) {
        console.error('Error:', error);
        alert('API Communication Error. Check if backend is awake.');
    } finally {
        // 5. Reset button state
        btn.classList.remove('processing');
        btnText.innerText = 'Execute Analysis';
    }
});