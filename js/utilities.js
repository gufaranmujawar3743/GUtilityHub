// --- Color Picker ---
function initColorPicker() {
    const colorInput = document.getElementById('colorInput');
    const colorPreview = document.getElementById('colorPreview');
    const hexValueSpan = document.getElementById('hexValue');
    const rgbValueSpan = document.getElementById('rgbValue');
    const hslValueSpan = document.getElementById('hslValue');

    function updateColorDisplay(colorHex) {
        colorPreview.style.backgroundColor = colorHex;
        hexValueSpan.textContent = colorHex.toUpperCase();

        // Convert HEX to RGB
        let r = parseInt(colorHex.slice(1, 3), 16);
        let g = parseInt(colorHex.slice(3, 5), 16);
        let b = parseInt(colorHex.slice(5, 7), 16);
        rgbValueSpan.textContent = `rgb(${r}, ${g}, ${b})`;

        // Convert RGB to HSL
        r /= 255;
        g /= 255;
        b /= 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0; // achromatic
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        h = Math.round(h * 360);
        s = Math.round(s * 100);
        l = Math.round(l * 100);

        hslValueSpan.textContent = `hsl(${h}, ${s}%, ${l}%)`;
    }

    colorInput.addEventListener('input', (event) => {
        updateColorDisplay(event.target.value);
    });

    // Initial display based on default color input value
    updateColorDisplay(colorInput.value);
}

// --- Favicon Generator ---
function initFaviconGenerator() {
    const fileInput = document.getElementById('faviconImageUpload');
    const generateButton = document.getElementById('generateFavicon');
    const downloadArea = document.getElementById('faviconDownloadArea');
    const faviconPreview = document.getElementById('faviconPreview');
    const faviconDownloadLink = document.getElementById('faviconDownloadLink');
    const statusDiv = document.getElementById('faviconStatus');

    // Hide download area initially
    downloadArea.style.display = 'none';

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            generateButton.disabled = false;
            statusDiv.textContent = '';
        } else {
            generateButton.disabled = true;
            downloadArea.style.display = 'none';
        }
    });

    generateButton.addEventListener('click', () => {
        const file = fileInput.files[0];
        if (!file) {
            statusDiv.textContent = 'Please upload an image first.';
            return;
        }

        statusDiv.textContent = 'Generating...';

        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const size = 64; // Common favicon size, also 16, 32, 48
                canvas.width = size;
                canvas.height = size;
                const ctx = canvas.getContext('2d');

                // Draw the image, scaling it to fit the canvas
                ctx.drawImage(img, 0, 0, size, size);

                // Favicon.ico is a complex format not easily generated in pure JS on client-side.
                // Modern browsers mostly support PNG favicons.
                // We'll generate a PNG data URL and suggest saving it as .ico or .png.
                const dataURL = canvas.toDataURL('image/png'); // Can also try 'image/vnd.microsoft.icon' but browser support varies.

                faviconPreview.src = dataURL;
                faviconDownloadLink.href = dataURL;
                faviconDownloadLink.download = 'favicon.png'; // Suggest .png as .ico is tricky

                statusDiv.textContent = 'Favicon generated (as PNG). Save as .ico or use .png directly!';
                downloadArea.style.display = 'block';

                // Provide a warning about .ico format
                const warningDiv = document.createElement('div');
                warningDiv.classList.add('alert', 'alert-warning', 'mt-2');
                warningDiv.textContent = 'Note: True .ico (multi-resolution) generation is complex client-side. This generates a PNG which most modern browsers support as a favicon. For a full .ico, server-side tools are usually needed.';
                downloadArea.appendChild(warningDiv);

            };
            img.onerror = function() {
                statusDiv.textContent = 'Could not load image.';
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    });
}

// --- QR Code Generator ---
// Requires an external library like qrious.js
// Add this to your index.html <head>:
// <script src="https://cdn.jsdelivr.net/npm/qrious@4.0.2/dist/qrious.min.js"></script>
function initQrCodeGenerator() {
    const qrTextInput = document.getElementById('qrTextInput');
    const qrSizeInput = document.getElementById('qrSize');
    const generateButton = document.getElementById('generateQrCode');
    const qrCodeContainer = document.getElementById('qrcode');

    // Initialize QRious object (it will draw to a canvas within the container)
    // Make sure 'QRious' is available globally (from the CDN script)
    let qr = new QRious({
        element: document.createElement('canvas'),
        size: parseInt(qrSizeInput.value),
        value: qrTextInput.value || 'Hello, Utility Hub!'
    });

    qrCodeContainer.innerHTML = ''; // Clear previous QR
    qrCodeContainer.appendChild(qr.element);

    generateButton.addEventListener('click', () => {
        const text = qrTextInput.value.trim();
        const size = parseInt(qrSizeInput.value);

        if (!text) {
            alert('Please enter text or a URL for the QR code.');
            return;
        }
        if (isNaN(size) || size < 64 || size > 1024) {
            alert('Please enter a valid QR code size (64-1024 pixels).');
            return;
        }

        qr.set({
            value: text,
            size: size
        });

        qrCodeContainer.innerHTML = ''; // Clear previous QR
        qrCodeContainer.appendChild(qr.element);
    });

    // Generate QR on initial load with placeholder text
    qrTextInput.value = window.location.href; // Default to current URL
    generateButton.click();
}

// --- Checklist ---
function initChecklist() {
    const newItemInput = document.getElementById('checklistNewItem');
    const addButton = document.getElementById('addChecklistItem');
    const itemsList = document.getElementById('checklistItems');
    const clearButton = document.getElementById('clearChecklist');
    const localStorageKey = 'ultimateUtilityHubChecklist';

    // Ensure all elements are found before adding listeners
    if (!newItemInput || !addButton || !itemsList || !clearButton) {
        console.error("Error: One or more checklist elements not found in DOM.");
        // Optionally display a user-friendly message in the tool container
        document.getElementById('tool-container').innerHTML = '<div class="alert alert-danger">Checklist tool failed to load. Please report this error.</div>';
        return; // Exit the function if elements are missing
    }

    function loadChecklist() {
        itemsList.innerHTML = ''; // Clear current list
        const items = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
        items.forEach(item => addChecklistItemToDOM(item.text, item.completed));
    }

    function saveChecklist() {
        const items = [];
        itemsList.querySelectorAll('li').forEach(li => {
            items.push({
                text: li.querySelector('span').textContent,
                completed: li.classList.contains('list-group-item-success')
            });
        });
        localStorage.setItem(localStorageKey, JSON.stringify(items));
    }

    function addChecklistItemToDOM(text, completed = false) {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        if (completed) {
            li.classList.add('list-group-item-success');
        }

        const textSpan = document.createElement('span');
        textSpan.textContent = text;
        if (completed) {
            textSpan.style.textDecoration = 'line-through';
        }

        const buttonsDiv = document.createElement('div');

        const completeButton = document.createElement('button');
        completeButton.classList.add('btn', 'btn-sm', 'me-2');
        completeButton.innerHTML = '<i class="fas fa-check"></i>'; // FontAwesome check icon
        if (completed) {
            completeButton.classList.add('btn-warning');
        } else {
            completeButton.classList.add('btn-success');
        }
        completeButton.addEventListener('click', () => {
            li.classList.toggle('list-group-item-success');
            textSpan.style.textDecoration = li.classList.contains('list-group-item-success') ? 'line-through' : 'none';
            completeButton.classList.toggle('btn-success');
            completeButton.classList.toggle('btn-warning');
            saveChecklist();
        });

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>'; // FontAwesome trash icon
        deleteButton.addEventListener('click', () => {
            li.remove();
            saveChecklist();
        });

        buttonsDiv.appendChild(completeButton);
        buttonsDiv.appendChild(deleteButton);

        li.appendChild(textSpan);
        li.appendChild(buttonsDiv);
        itemsList.appendChild(li);
    }

    addButton.addEventListener('click', () => {
        const itemText = newItemInput.value.trim();
        if (itemText) {
            addChecklistItemToDOM(itemText);
            saveChecklist();
            newItemInput.value = ''; // Clear input
            newItemInput.focus();
        }
    });

    newItemInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addButton.click();
        }
    });

    clearButton.addEventListener('click', () => {
        itemsList.querySelectorAll('li.list-group-item-success').forEach(li => li.remove());
        saveChecklist();
    });

    // Load checklist on tool activation
    loadChecklist();
}


// --- Stopwatch ---
let stopwatchTimer;
let stopwatchRunning = false;
let stopwatchStartTime;
let stopwatchElapsedTime = 0; // Total elapsed time in milliseconds
let stopwatchLapCounter = 1;

function formatTime(ms) {
    const hours = Math.floor(ms / 3600000);
    ms %= 3600000;
    const minutes = Math.floor(ms / 60000);
    ms %= 60000;
    const seconds = Math.floor(ms / 1000);
    ms %= 1000;
    const milliseconds = ms;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
}

function updateStopwatchDisplay() {
    const now = performance.now(); // More precise than Date.now() for durations
    stopwatchElapsedTime = now - stopwatchStartTime;
    document.getElementById('stopwatchDisplay').textContent = formatTime(stopwatchElapsedTime);
}

function initStopwatch() {
    const display = document.getElementById('stopwatchDisplay');
    const startButton = document.getElementById('stopwatchStart');
    const pauseButton = document.getElementById('stopwatchPause');
    const resetButton = document.getElementById('stopwatchReset');
    const lapButton = document.getElementById('stopwatchLap');
    const lapsList = document.getElementById('stopwatchLaps');

    // Reset state when the tool is loaded
    clearInterval(stopwatchTimer);
    stopwatchRunning = false;
    stopwatchElapsedTime = 0;
    stopwatchLapCounter = 1;
    display.textContent = '00:00:00.000';
    lapsList.innerHTML = '';
    startButton.disabled = false;
    pauseButton.disabled = true;
    resetButton.disabled = true;
    lapButton.disabled = true;


    startButton.addEventListener('click', () => {
        if (!stopwatchRunning) {
            stopwatchStartTime = performance.now() - stopwatchElapsedTime; // Adjust start time for pause
            stopwatchTimer = setInterval(updateStopwatchDisplay, 10); // Update every 10ms for precision
            stopwatchRunning = true;
            startButton.disabled = true;
            pauseButton.disabled = false;
            resetButton.disabled = false;
            lapButton.disabled = false;
        }
    });

    pauseButton.addEventListener('click', () => {
        if (stopwatchRunning) {
            clearInterval(stopwatchTimer);
            stopwatchRunning = false;
            startButton.disabled = false;
            pauseButton.disabled = true;
        }
    });

    resetButton.addEventListener('click', () => {
        clearInterval(stopwatchTimer);
        stopwatchRunning = false;
        stopwatchElapsedTime = 0;
        stopwatchLapCounter = 1;
        display.textContent = '00:00:00.000';
        lapsList.innerHTML = '';
        startButton.disabled = false;
        pauseButton.disabled = true;
        resetButton.disabled = true;
        lapButton.disabled = true;
    });

    let lastLapTime = 0; // To calculate individual lap times
    lapButton.addEventListener('click', () => {
        if (stopwatchRunning) {
            const lapTime = stopwatchElapsedTime - lastLapTime;
            const li = document.createElement('li');
            li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            li.innerHTML = `<span>Lap ${stopwatchLapCounter}: ${formatTime(lapTime)}</span> <small class="text-muted">Total: ${formatTime(stopwatchElapsedTime)}</small>`;
            lapsList.prepend(li); // Add to top of the list
            lastLapTime = stopwatchElapsedTime;
            stopwatchLapCounter++;
        }
    });
}

// --- Metronome ---
let audioContext;
let oscillator;
let gainNode;
let metronomeInterval;
let nextBeatTime;
let currentBpm = 120;
let isMetronomeRunning = false;
let beatDisplayElement;

function playClick(volume = 1.0) {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.connect(gain);
    gain.connect(audioContext.destination);

    osc.type = 'sine'; // Or 'square', 'triangle', 'sawtooth'
    osc.frequency.setValueAtTime(440, audioContext.currentTime); // A4 note
    gain.gain.setValueAtTime(volume, audioContext.currentTime);

    osc.start(audioContext.currentTime);
    osc.stop(audioContext.currentTime + 0.05); // Short click sound
}

function scheduler() {
    while (nextBeatTime < audioContext.currentTime + 0.1) { // Schedule sounds a bit in the future
        playClick(1.0); // Play a click
        // Update visual indicator
        if (beatDisplayElement) {
            beatDisplayElement.classList.add('active-beat');
            setTimeout(() => {
                beatDisplayElement.classList.remove('active-beat');
            }, 50); // Remove highlight quickly
        }
        nextBeatTime += 60 / currentBpm; // Advance to next beat time
    }
}

function startMetronome() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContext.state === 'suspended') {
        audioContext.resume(); // Resume if suspended (e.g., after user interaction)
    }

    isMetronomeRunning = true;
    nextBeatTime = audioContext.currentTime;
    metronomeInterval = setInterval(scheduler, 25); // Check for new beats every 25ms
    document.getElementById('metronomeStartStop').textContent = 'Stop';
    document.getElementById('metronomeStartStop').classList.remove('btn-primary');
    document.getElementById('metronomeStartStop').classList.add('btn-danger');
}

function stopMetronome() {
    clearInterval(metronomeInterval);
    isMetronomeRunning = false;
    document.getElementById('metronomeStartStop').textContent = 'Start';
    document.getElementById('metronomeStartStop').classList.remove('btn-danger');
    document.getElementById('metronomeStartStop').classList.add('btn-primary');
    if (beatDisplayElement) {
        beatDisplayElement.classList.remove('active-beat');
    }
}

function initMetronome() {
    const bpmInput = document.getElementById('metronomeBpm');
    const bpmValueSpan = document.getElementById('metronomeBpmValue');
    const startStopButton = document.getElementById('metronomeStartStop');
    const tapButton = document.getElementById('metronomeTap');
    beatDisplayElement = document.getElementById('metronomeBeatDisplay'); // Assign global reference

    // Reset state when the tool is loaded
    stopMetronome();
    bpmInput.value = 120;
    currentBpm = 120;
    bpmValueSpan.textContent = 120;
    beatDisplayElement.classList.remove('active-beat'); // Ensure no lingering highlight


    bpmInput.addEventListener('input', () => {
        currentBpm = parseInt(bpmInput.value);
        bpmValueSpan.textContent = currentBpm;
        if (isMetronomeRunning) {
            // Restart scheduler with new BPM
            stopMetronome();
            startMetronome();
        }
    });

    startStopButton.addEventListener('click', () => {
        if (isMetronomeRunning) {
            stopMetronome();
        } else {
            startMetronome();
        }
    });

    // Tap Tempo logic
    let tapTimes = [];
    tapButton.addEventListener('click', () => {
        const now = Date.now();
        tapTimes.push(now);

        // Keep only the last few taps (e.g., 4 taps for 3 intervals)
        const maxTaps = 5; // 5 taps for 4 intervals
        if (tapTimes.length > maxTaps) {
            tapTimes.shift(); // Remove the oldest tap
        }

        if (tapTimes.length > 1) {
            let totalInterval = 0;
            for (let i = 0; i < tapTimes.length - 1; i++) {
                totalInterval += (tapTimes[i+1] - tapTimes[i]);
            }
            const avgInterval = totalInterval / (tapTimes.length - 1); // milliseconds

            if (avgInterval > 0) {
                let calculatedBpm = Math.round(60000 / avgInterval);
                if (calculatedBpm < 40) calculatedBpm = 40;
                if (calculatedBpm > 240) calculatedBpm = 240;

                bpmInput.value = calculatedBpm;
                currentBpm = calculatedBpm;
                bpmValueSpan.textContent = currentBpm;

                if (isMetronomeRunning) {
                    stopMetronome();
                    startMetronome();
                }
            }
        }
    });
}