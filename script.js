 async function analyzeRisk() {
            const btn = document.querySelector('button');
            btn.innerText = "PROCESSING...";
            
            const payload = {
                Hour: parseInt(document.getElementById('hour').value),
                Weekday: parseInt(document.getElementById('weekday').value),
                Month: parseInt(document.getElementById('month').value),
                Temperature: parseFloat(document.getElementById('temp').value),
                Visibility: parseFloat(document.getElementById('visibility').value),
                Wind_Speed: parseFloat(document.getElementById('wind').value),
                Humidity: parseFloat(document.getElementById('humidity').value),
                Junction: document.getElementById('junction').checked ? 1 : 0,
                Traffic_Signal: document.getElementById('signal').checked ? 1 : 0,
                Crossing: document.getElementById('crossing').checked ? 1 : 0,
                Stop: parseInt(document.getElementById('stop').value),
                Weather: document.getElementById('weather').value
            };

            try {
                const response = await fetch('https://traffic-risk-ai-1.onrender.com/predict', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                
                const data = await response.json();
                const score = data.risk_score;
                
                document.getElementById('riskScore').innerText = Math.round(score) + '%';
                
                const badge = document.getElementById('statusBadge');
                const text = document.getElementById('analysisText');
                
                // Reset meter
                for(let i=1; i<=5; i++) document.getElementById(`seg${i}`).style.background = 'rgba(255,255,255,0.1)';

                if (data.severity_class === 1 || score >= 50) {
                    badge.innerText = "CRITICAL RISK";
                    badge.style.color = "#ffe4e6"; badge.style.background = "var(--danger)";
                    document.getElementById('riskScore').style.color = "#fda4af"; // Soft red text
                    text.innerHTML = "High probability of severe traffic disruption. Visibility and temporal alignment strongly correlate with historical fatal incidents.";
                    
                    // Fill meter red based on score
                    let segments = Math.ceil((score / 100) * 5);
                    for(let i=1; i<=segments; i++) document.getElementById(`seg${i}`).style.background = 'var(--danger)';
                } else {
                    badge.innerText = "MINOR ACCIDENT";
                    badge.style.color = "#d1fae5"; badge.style.background = "var(--safe)";
                    document.getElementById('riskScore').style.color = "#6ee7b7"; // Soft green text
                    text.innerHTML = "Conditions align with low-impact fender-bender profiles. Weather data does not indicate systemic hazard.";
                    
                    // Fill meter green based on score
                    let segments = Math.max(1, Math.ceil((score / 100) * 5));
                    for(let i=1; i<=segments; i++) document.getElementById(`seg${i}`).style.background = 'var(--safe)';
                }

            } catch (error) {
                alert("Backend offline. Start Uvicorn server.");
            } finally {
                btn.innerText = "EXECUTE ANALYSIS";
            }
        }