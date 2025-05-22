document.addEventListener('DOMContentLoaded', () => {
    const sidebarNav = document.getElementById('sidebar-nav');
    const toolContainer = document.getElementById('tool-container');

    // Function to render a specific tool's HTML and activate its JS
    function renderTool(toolName) {
        toolContainer.innerHTML = ''; // Clear previous content
        let toolHtml = '';
        let activateToolFunction = null;

        // Use a switch statement or a map to define content and activation for each tool
        switch (toolName) {
            case 'cooking-converter':
                toolHtml = `
                    <div class="tool-section">
                        <h3>Cooking Unit Converter</h3>
                        <div class="mb-3">
                            <label for="cookingAmount" class="form-label">Amount</label>
                            <input type="number" class="form-control" id="cookingAmount" value="1">
                        </div>
                        <div class="mb-3">
                            <label for="cookingFromUnit" class="form-label">From Unit</label>
                            <select class="form-select" id="cookingFromUnit">
                                <option value="cups">Cups</option>
                                <option value="grams">Grams</option>
                                <option value="tbsp">Tablespoons</option>
                                <option value="ml">Milliliters</option>
                                <option value="fahrenheit">Fahrenheit</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="cookingToUnit" class="form-label">To Unit</label>
                            <select class="form-select" id="cookingToUnit">
                                <option value="grams">Grams</option>
                                <option value="cups">Cups</option>
                                <option value="ml">Milliliters</option>
                                <option value="tbsp">Tablespoons</option>
                                <option value="celsius">Celsius</option>
                                <option value="fahrenheit">Fahrenheit</option> </select>
                        </div>
                        <button class="btn btn-primary" id="convertCooking">Convert</button>
                        <h4 class="mt-3">Result: <span id="cookingResult"></span></h4>
                    </div>
                `;
                activateToolFunction = initCookingConverter; // Function from converters.js
                break;
            case 'currency-converter':
                toolHtml = `
                    <div class="tool-section">
                        <h3>Currency Converter</h3>
                        <p class="text-muted">Rates update daily via <a href="https://www.exchangerate-api.com/" target="_blank">ExchangeRate-API</a>.</p>
                        <div class="alert alert-warning d-none" role="alert" id="currencyApiWarning">
                            <strong>API Key Needed!</strong> Please get a free API key from <a href="https://www.exchangerate-api.com/" target="_blank" class="alert-link">exchangerate-api.com</a> and replace 'YOUR_EXCHANGERATE_API_KEY' in <code>js/converters.js</code>.
                        </div>
                        <div class="mb-3">
                            <label for="currencyAmount" class="form-label">Amount</label>
                            <input type="number" class="form-control" id="currencyAmount" value="1">
                        </div>
                        <div class="mb-3">
                            <label for="currencyFrom" class="form-label">From Currency</label>
                            <select class="form-select" id="currencyFrom">
                                <option value="">Loading...</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="currencyTo" class="form-label">To Currency</label>
                            <select class="form-select" id="currencyTo">
                                <option value="">Loading...</option>
                            </select>
                        </div>
                        <button class="btn btn-primary" id="convertCurrency">Convert</button>
                        <h4 class="mt-3">Result: <span id="currencyResult"></span></h4>
                    </div>
                `;
                activateToolFunction = initCurrencyConverter; // Function from converters.js
                break;
            case 'timezone-converter':
                toolHtml = `
                    <div class="tool-section">
                        <h3>Time Zone Converter</h3>
                        <p class="text-muted">Input a date and time, and convert it to another time zone.</p>
                        <div class="mb-3">
                            <label for="tzDateTime" class="form-label">Date and Time</label>
                            <input type="datetime-local" class="form-control" id="tzDateTime">
                        </div>
                        <div class="mb-3">
                            <label for="tzFrom" class="form-label">From Time Zone</label>
                            <select class="form-select" id="tzFrom">
                                <option value="America/New_York">New York (Eastern Time)</option>
                                <option value="Europe/London">London (GMT/BST)</option>
                                <option value="Asia/Kolkata" selected>Kolkata (IST)</option>
                                <option value="Asia/Tokyo">Tokyo (JST)</option>
                                <option value="America/Los_Angeles">Los Angeles (Pacific Time)</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="tzTo" class="form-label">To Time Zone</label>
                            <select class="form-select" id="tzTo">
                                <option value="Europe/London">London (GMT/BST)</option>
                                <option value="Asia/Kolkata">Kolkata (IST)</option>
                                <option value="America/New_York">New York (Eastern Time)</option>
                                <option value="Asia/Tokyo">Tokyo (JST)</option>
                                <option value="America/Los_Angeles" selected>Los Angeles (Pacific Time)</option>
                            </select>
                        </div>
                        <button class="btn btn-primary" id="convertTimeZone">Convert Time</button>
                        <h4 class="mt-3">Converted Time: <span id="tzResult"></span></h4>
                    </div>
                `;
                activateToolFunction = initTimezoneConverter;
                break;
            // ... add other converters similarly ...
            case 'clothing-size-converter':
                toolHtml = `
                    <div class="tool-section">
                        <h3>Clothing Size Converter</h3>
                        <p class="text-muted">Convert international clothing sizes (e.g., US to EU, UK to JP).</p>
                        <div class="mb-3">
                            <label for="clothingType" class="form-label">Type</label>
                            <select class="form-select" id="clothingType">
                                <option value="womens-top">Women's Tops/Dresses</option>
                                <option value="womens-bottom">Women's Bottoms</option>
                                <option value="mens-top">Men's Tops</option>
                                <option value="mens-bottom">Men's Bottoms</option>
                                <option value="kids">Kids' Clothing</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="clothingFromCountry" class="form-label">From Country/Region</label>
                            <select class="form-select" id="clothingFromCountry">
                                <option value="US">US</option>
                                <option value="EU">EU</option>
                                <option value="UK">UK</option>
                                <option value="IT">IT</option>
                                <option value="FR">FR</option>
                                <option value="JP">JP</option>
                                <option value="KR">KR</option>
                                <option value="AU">AU</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="clothingSizeInput" class="form-label">Size (e.g., S, M, L, 8, 38)</label>
                            <input type="text" class="form-control" id="clothingSizeInput" placeholder="Enter size">
                        </div>
                        <div class="mb-3">
                            <label for="clothingToCountry" class="form-label">To Country/Region</label>
                            <select class="form-select" id="clothingToCountry">
                                <option value="EU">EU</option>
                                <option value="US">US</option>
                                <option value="UK">UK</option>
                                <option value="IT">IT</option>
                                <option value="FR">FR</option>
                                <option value="JP">JP</option>
                                <option value="KR">KR</option>
                                <option value="AU">AU</option>
                            </select>
                        </div>
                        <button class="btn btn-primary" id="convertClothingSize">Convert Size</button>
                        <h4 class="mt-3">Result: <span id="clothingSizeResult"></span></h4>
                    </div>
                `;
                activateToolFunction = initClothingSizeConverter; // Function from converters.js
                break;

            case 'shoe-size-converter':
                toolHtml = `
                    <div class="tool-section">
                        <h3>Shoe Size Converter</h3>
                        <p class="text-muted">Convert international shoe sizes.</p>
                        <div class="mb-3">
                            <label for="shoeGender" class="form-label">Gender</label>
                            <select class="form-select" id="shoeGender">
                                <option value="mens">Men's</option>
                                <option value="womens">Women's</option>
                                <option value="kids">Kids'</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="shoeFromCountry" class="form-label">From Country/Region</label>
                            <select class="form-select" id="shoeFromCountry">
                                <option value="US">US</option>
                                <option value="EU">EU (CM)</option>
                                <option value="UK">UK</option>
                                <option value="JP">JP (CM)</option>
                                <option value="AU">AU</option>
                                <option value="CM">CM (Foot Length)</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="shoeSizeInput" class="form-label">Size</label>
                            <input type="text" class="form-control" id="shoeSizeInput" placeholder="Enter size">
                        </div>
                        <div class="mb-3">
                            <label for="shoeToCountry" class="form-label">To Country/Region</label>
                            <select class="form-select" id="shoeToCountry">
                                <option value="EU">EU (CM)</option>
                                <option value="US">US</option>
                                <option value="UK">UK</option>
                                <option value="JP">JP (CM)</option>
                                <option value="AU">AU</option>
                                <option value="CM">CM (Foot Length)</option>
                            </select>
                        </div>
                        <button class="btn btn-primary" id="convertShoeSize">Convert Size</button>
                        <h4 class="mt-3">Result: <span id="shoeSizeResult"></span></h4>
                    </div>
                `;
                activateToolFunction = initShoeSizeConverter; // Function from converters.js
                break;
            case 'typing-speed-calculator':
                toolHtml = `
                    <div class="tool-section">
                        <h3>Typing Speed Calculator</h3>
                        <p class="text-muted">Type the text below and see your WPM.</p>
                        <div class="card mb-3">
                            <div class="card-body">
                                <p id="typingText" class="card-text fs-5">The quick brown fox jumps over the lazy dog.</p>
                            </div>
                        </div>
                        <textarea class="form-control" id="typingInput" rows="5" placeholder="Start typing here to begin..."></textarea>
                        <button class="btn btn-primary mt-3" id="startTypingTest">Start Test</button>
                        <button class="btn btn-danger mt-3 ms-2" id="resetTypingTest" style="display:none;">Reset</button>
                        <h4 class="mt-3">WPM: <span id="wpmResult">0</span></h4>
                        <p>Accuracy: <span id="accuracyResult">100%</span></p>
                        <p>Time: <span id="timeElapsed">0</span> seconds</p>
                    </div>
                `;
                activateToolFunction = initTypingSpeedCalculator;
                break;
            case 'investment-calculator':
                toolHtml = `
                    <div class="tool-section">
                        <h3>Investment Calculator (Compound Interest)</h3>
                        <div class="mb-3">
                            <label for="initialInvestment" class="form-label">Initial Investment</label>
                            <div class="input-group">
                                <span class="input-group-text">$</span>
                                <input type="number" class="form-control" id="initialInvestment" value="1000">
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="monthlyContribution" class="form-label">Monthly Contribution</label>
                            <div class="input-group">
                                <span class="input-group-text">$</span>
                                <input type="number" class="form-control" id="monthlyContribution" value="100">
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="annualInterestRate" class="form-label">Annual Interest Rate (%)</label>
                            <div class="input-group">
                                <input type="number" class="form-control" id="annualInterestRate" value="7">
                                <span class="input-group-text">%</span>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="investmentPeriod" class="form-label">Investment Period (Years)</label>
                            <input type="number" class="form-control" id="investmentPeriod" value="10">
                        </div>
                        <button class="btn btn-primary" id="calculateInvestment">Calculate Investment</button>
                        <h4 class="mt-3">Future Value: <span id="investmentResult">$0.00</span></h4>
                        <p>Total Contributions: <span id="totalContributions">$0.00</span></p>
                        <p>Total Interest Earned: <span id="totalInterest">$0.00</span></p>
                    </div>
                `;
                activateToolFunction = initInvestmentCalculator;
                break;
            case 'loan-mortgage-calculator':
                toolHtml = `
                    <div class="tool-section">
                        <h3>Loan/Mortgage Calculator</h3>
                        <div class="mb-3">
                            <label for="loanAmount" class="form-label">Loan Amount</label>
                            <div class="input-group">
                                <span class="input-group-text">$</span>
                                <input type="number" class="form-control" id="loanAmount" value="200000">
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="loanInterestRate" class="form-label">Annual Interest Rate (%)</label>
                            <div class="input-group">
                                <input type="number" class="form-control" id="loanInterestRate" value="4.5">
                                <span class="input-group-text">%</span>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="loanTerm" class="form-label">Loan Term (Years)</label>
                            <input type="number" class="form-control" id="loanTerm" value="30">
                        </div>
                        <button class="btn btn-primary" id="calculateLoan">Calculate Payment</button>
                        <h4 class="mt-3">Monthly Payment: <span id="monthlyPaymentResult">$0.00</span></h4>
                        <p>Total Payment: <span id="totalLoanPayment">$0.00</span></p>
                        <p>Total Interest: <span id="totalLoanInterest">$0.00</span></p>
                    </div>
                `;
                activateToolFunction = initLoanMortgageCalculator;
                break;
            case 'bmi-calculator':
                toolHtml = `
                    <div class="tool-section">
                        <h3>BMI Calculator</h3>
                        <div class="mb-3">
                            <label for="bmiHeight" class="form-label">Height (cm)</label>
                            <input type="number" class="form-control" id="bmiHeight" placeholder="e.g., 175">
                        </div>
                        <div class="mb-3">
                            <label for="bmiWeight" class="form-label">Weight (kg)</label>
                            <input type="number" class="form-control" id="bmiWeight" placeholder="e.g., 70">
                        </div>
                        <button class="btn btn-primary" id="calculateBMI">Calculate BMI</button>
                        <h4 class="mt-3">BMI: <span id="bmiResult"></span></h4>
                        <p>Category: <span id="bmiCategory"></span></p>
                    </div>
                `;
                activateToolFunction = initBMICalculator; // Function from calculators.js
                break;
            case 'working-days-calculator':
                toolHtml = `
                    <div class="tool-section">
                        <h3>Working Days Calculator</h3>
                        <div class="mb-3">
                            <label for="startDate" class="form-label">Start Date</label>
                            <input type="date" class="form-control" id="startDate">
                        </div>
                        <div class="mb-3">
                            <label for="endDate" class="form-label">End Date</label>
                            <input type="date" class="form-control" id="endDate">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Exclude Holidays (comma-separated YYYY-MM-DD)</label>
                            <input type="text" class="form-control" id="holidays" placeholder="e.g., 2025-01-01, 2025-12-25">
                        </div>
                        <button class="btn btn-primary" id="calculateWorkingDays">Calculate Working Days</button>
                        <h4 class="mt-3">Working Days: <span id="workingDaysResult"></span></h4>
                    </div>
                `;
                activateToolFunction = initWorkingDaysCalculator;
                break;
            case 'time-duration-calculator':
                toolHtml = `
                    <div class="tool-section">
                        <h3>Time Duration Calculator</h3>
                        <div class="mb-3">
                            <label for="startTime" class="form-label">Start Date and Time</label>
                            <input type="datetime-local" class="form-control" id="startTime">
                        </div>
                        <div class="mb-3">
                            <label for="endTime" class="form-label">End Date and Time</label>
                            <input type="datetime-local" class="form-control" id="endTime">
                        </div>
                        <button class="btn btn-primary" id="calculateTimeDuration">Calculate Duration</button>
                        <h4 class="mt-3">Duration: <span id="timeDurationResult"></span></h4>
                    </div>
                `;
                activateToolFunction = initTimeDurationCalculator;
                break;
            case 'countdown-timer':
                toolHtml = `
                    <div class="tool-section">
                        <h3>Countdown Timer</h3>
                        <div class="mb-3">
                            <label for="countdownDateTime" class="form-label">Countdown To (Date and Time)</label>
                            <input type="datetime-local" class="form-control" id="countdownDateTime">
                        </div>
                        <div class="mb-3">
                            <label for="countdownTitle" class="form-label">Event Title (Optional)</label>
                            <input type="text" class="form-control" id="countdownTitle" placeholder="e.g., Project Deadline">
                        </div>
                        <button class="btn btn-primary" id="startCountdown">Start Countdown</button>
                        <button class="btn btn-danger ms-2" id="resetCountdown" style="display:none;">Reset</button>
                        <h2 class="mt-4 text-center" id="countdownDisplay"></h2>
                        <p class="text-center text-muted" id="countdownEventTitle"></p>
                    </div>
                `;
                activateToolFunction = initCountdownTimer;
                break;
            case 'due-date-calculator':
                toolHtml = `
                    <div class="tool-section">
                        <h3>Due Date Calculator (Add Days)</h3>
                        <div class="mb-3">
                            <label for="baseDate" class="form-label">Base Date</label>
                            <input type="date" class="form-control" id="baseDate">
                        </div>
                        <div class="mb-3">
                            <label for="daysToAdd" class="form-label">Days to Add</label>
                            <input type="number" class="form-control" id="daysToAdd" value="280" min="1">
                        </div>
                        <button class="btn btn-primary" id="calculateDueDate">Calculate Due Date</button>
                        <h4 class="mt-3">Calculated Due Date: <span id="dueDateResult"></span></h4>
                    </div>
                `;
                activateToolFunction = initDueDateCalculator;
                break;

            // ... add other calculators similarly ...

            // ... (previous cases for converters, calculators, etc.) ...

            case 'word-character-counter':
                toolHtml = `
                    <div class="tool-section">
                        <h3>Word/Character Counter</h3>
                        <p class="text-muted">Count words, characters, and sentences in your text.</p>
                        <textarea class="form-control" id="textToCount" rows="10" placeholder="Paste your text here..."></textarea>
                        <div class="mt-3 row">
                            <div class="col-md-6">
                                <p><strong>Words:</strong> <span id="wordCount">0</span></p>
                                <p><strong>Characters (with spaces):</strong> <span id="charCountSpaces">0</span></p>
                                <p><strong>Characters (no spaces):</strong> <span id="charCountNoSpaces">0</span></p>
                            </div>
                            <div class="col-md-6">
                                <p><strong>Sentences:</strong> <span id="sentenceCount">0</span></p>
                                <p><strong>Paragraphs:</strong> <span id="paragraphCount">0</span></p>
                            </div>
                        </div>
                    </div>
                `;
                activateToolFunction = initWordCharacterCounter;
                break;
            case 'case-converter':
                toolHtml = `
                    <div class="tool-section">
                        <h3>Case Converter</h3>
                        <p class="text-muted">Convert text to UPPERCASE, lowercase, Capitalize, and more.</p>
                        <textarea class="form-control mb-3" id="caseConverterInput" rows="5" placeholder="Type or paste your text here..."></textarea>
                        <div class="d-flex flex-wrap gap-2 mb-3">
                            <button class="btn btn-outline-primary" data-case="uppercase">UPPERCASE</button>
                            <button class="btn btn-outline-primary" data-case="lowercase">lowercase</button>
                            <button class="btn btn-outline-primary" data-case="capitalize">Capitalize Words</button>
                            <button class="btn btn-outline-primary" data-case="sentence">Sentence case</button>
                            <button class="btn btn-outline-primary" data-case="toggle">tOGGLE cASE</button>
                            <button class="btn btn-outline-primary" data-case="alternating">AlTeRnAtInG cAsE</button>
                            <button class="btn btn-outline-secondary" data-case="clear">Clear</button>
                        </div>
                        <textarea class="form-control" id="caseConverterOutput" rows="5" readonly placeholder="Converted text will appear here..."></textarea>
                        <button class="btn btn-secondary mt-3" id="copyConvertedText"><i class="far fa-copy"></i> Copy Output</button>
                    </div>
                `;
                activateToolFunction = initCaseConverter;
                break;
            case 'json-formatter-validator':
                toolHtml = `
                    <div class="tool-section">
                        <h3>JSON Formatter & Validator</h3>
                        <p class="text-muted">Format and validate your JSON data.</p>
                        <div class="row">
                            <div class="col-md-6">
                                <label for="jsonInput" class="form-label">JSON Input</label>
                                <textarea class="form-control" id="jsonInput" rows="15" placeholder='{"name": "John Doe", "age": 30, "isStudent": false, "courses": ["Math", "Science"]}'></textarea>
                            </div>
                            <div class="col-md-6">
                                <label for="jsonOutput" class="form-label">Formatted JSON Output</label>
                                <textarea class="form-control" id="jsonOutput" rows="15" readonly></textarea>
                            </div>
                        </div>
                        <div class="mt-3 d-flex gap-2">
                            <button class="btn btn-primary" id="formatJson">Format JSON</button>
                            <button class="btn btn-success" id="validateJson">Validate JSON</button>
                            <button class="btn btn-secondary" id="copyJsonOutput"><i class="far fa-copy"></i> Copy Output</button>
                        </div>
                        <div id="jsonStatus" class="mt-3 alert d-none"></div>
                    </div>
                `;
                activateToolFunction = initJsonFormatterValidator;
                break;
            case 'url-encoder-decoder':
                toolHtml = `
                    <div class="tool-section">
                        <h3>URL Encoder / Decoder</h3>
                        <p class="text-muted">Encode or decode URL components (e.g., query parameters).</p>
                        <div class="mb-3">
                            <label for="urlInput" class="form-label">URL / Text Input</label>
                            <textarea class="form-control" id="urlInput" rows="5" placeholder="e.g., https://example.com/search?q=hello world&param=test value"></textarea>
                        </div>
                        <div class="d-flex flex-wrap gap-2 mb-3">
                            <button class="btn btn-primary" id="encodeUrl">Encode URL</button>
                            <button class="btn btn-info" id="decodeUrl">Decode URL</button>
                        </div>
                        <div class="mb-3">
                            <label for="urlOutput" class="form-label">Encoded / Decoded Output</label>
                            <textarea class="form-control" id="urlOutput" rows="5" readonly></textarea>
                        </div>
                        <button class="btn btn-secondary mt-3" id="copyUrlOutput"><i class="far fa-copy"></i> Copy Output</button>
                    </div>
                `;
                activateToolFunction = initUrlEncoderDecoder;
                break;
            case 'text-diff-tool':
                toolHtml = `
                    <div class="tool-section">
                        <h3>Text Diff Tool</h3>
                        <p class="text-muted">Compare two texts to find differences.</p>
                        <div class="row">
                            <div class="col-md-6">
                                <label for="originalText" class="form-label">Original Text</label>
                                <textarea class="form-control" id="originalText" rows="10" placeholder="Paste your first text here..."></textarea>
                            </div>
                            <div class="col-md-6">
                                <label for="newText" class="form-label">New Text</label>
                                <textarea class="form-control" id="newText" rows="10" placeholder="Paste your second text here..."></textarea>
                            </div>
                        </div>
                        <button class="btn btn-primary mt-3" id="compareTexts">Compare Texts</button>
                        <div class="mt-3">
                            <h4>Differences:</h4>
                            <div id="diffOutput" class="bg-light p-3 border rounded" style="white-space: pre-wrap; font-family: monospace;">
                                </div>
                            <p class="text-muted mt-2">
                                <span style="color: green; font-weight: bold;">+ Added</span> &nbsp;
                                <span style="color: red; font-weight: bold;">- Removed</span>
                            </p>
                        </div>
                    </div>
                `;
                // Note: For text diff, we'll need an external library for robust diffing.
                // For simplicity, I'll show a basic char-by-char diff in the JS.
                // A better solution would integrate something like `diff-match-patch`.
                activateToolFunction = initTextDiffTool;
                break;
            case 'simple-note-pad':
                toolHtml = `
                    <div class="tool-section">
                        <h3>Simple Note Pad</h3>
                        <textarea class="form-control" id="notepadText" rows="10" placeholder="Start typing your notes here..."></textarea>
                        <button class="btn btn-primary mt-3" id="saveNote">Save Note</button>
                        <p class="text-muted mt-2">Notes are saved automatically in your browser.</p>
                    </div>
                `;
                activateToolFunction = initSimpleNotepad; // Function from text_tools.js
                break;

            case 'random-password-generator':
                toolHtml = `
                    <div class="tool-section">
                        <h3>Random Password Generator</h3>
                        <div class="mb-3">
                            <label for="passwordLength" class="form-label">Length</label>
                            <input type="number" class="form-control" id="passwordLength" value="12" min="4" max="64">
                        </div>
                        <div class="form-check mb-2">
                            <input class="form-check-input" type="checkbox" id="includeUppercase" checked>
                            <label class="form-check-label" for="includeUppercase">Include Uppercase</label>
                        </div>
                        <div class="form-check mb-2">
                            <input class="form-check-input" type="checkbox" id="includeLowercase" checked>
                            <label class="form-check-label" for="includeLowercase">Include Lowercase</label>
                        </div>
                        <div class="form-check mb-2">
                            <input class="form-check-input" type="checkbox" id="includeNumbers" checked>
                            <label class="form-check-label" for="includeNumbers">Include Numbers</label>
                        </div>
                        <div class="form-check mb-3">
                            <input class="form-check-input" type="checkbox" id="includeSymbols">
                            <label class="form-check-label" for="includeSymbols">Include Symbols</label>
                        </div>
                        <button class="btn btn-primary" id="generatePassword">Generate Password</button>
                        <div class="input-group mt-3">
                            <input type="text" class="form-control" id="generatedPassword" readonly placeholder="Your password will appear here">
                            <button class="btn btn-outline-secondary" type="button" id="copyPassword"><i class="far fa-copy"></i></button>
                        </div>
                    </div>
                `;
                activateToolFunction = initPasswordGenerator; // Function from generators.js
                break;
            // ... (previous cases for converters, calculators, text tools, etc.) ...

            case 'random-password-generator': // Keep this one, it should already be there
                toolHtml = `
                    <div class="tool-section">
                        <h3>Random Password Generator</h3>
                        <div class="mb-3">
                            <label for="passwordLength" class="form-label">Length</label>
                            <input type="number" class="form-control" id="passwordLength" value="12" min="4" max="64">
                        </div>
                        <div class="form-check mb-2">
                            <input class="form-check-input" type="checkbox" id="includeUppercase" checked>
                            <label class="form-check-label" for="includeUppercase">Include Uppercase</label>
                        </div>
                        <div class="form-check mb-2">
                            <input class="form-check-input" type="checkbox" id="includeLowercase" checked>
                            <label class="form-check-label" for="includeLowercase">Include Lowercase</label>
                        </div>
                        <div class="form-check mb-2">
                            <input class="form-check-input" type="checkbox" id="includeNumbers" checked>
                            <label class="form-check-label" for="includeNumbers">Include Numbers</label>
                        </div>
                        <div class="form-check mb-3">
                            <input class="form-check-input" type="checkbox" id="includeSymbols">
                            <label class="form-check-label" for="includeSymbols">Include Symbols</label>
                        </div>
                        <button class="btn btn-primary" id="generatePassword">Generate Password</button>
                        <div class="input-group mt-3">
                            <input type="text" class="form-control" id="generatedPassword" readonly placeholder="Your password will appear here">
                            <button class="btn btn-outline-secondary" type="button" id="copyPassword"><i class="far fa-copy"></i></button>
                        </div>
                    </div>
                `;
                activateToolFunction = initPasswordGenerator;
                break;
            case 'random-number-generator':
                toolHtml = `
                    <div class="tool-section">
                        <h3>Random Number Generator</h3>
                        <div class="mb-3">
                            <label for="randomNumberMin" class="form-label">Minimum</label>
                            <input type="number" class="form-control" id="randomNumberMin" value="1">
                        </div>
                        <div class="mb-3">
                            <label for="randomNumberMax" class="form-label">Maximum</label>
                            <input type="number" class="form-control" id="randomNumberMax" value="100">
                        </div>
                        <button class="btn btn-primary" id="generateRandomNumber">Generate Number</button>
                        <h4 class="mt-3">Result: <span id="randomNumberResult"></span></h4>
                    </div>
                `;
                activateToolFunction = initRandomNumberGenerator;
                break;
            case 'dice-roller':
                toolHtml = `
                    <div class="tool-section">
                        <h3>Dice Roller</h3>
                        <div class="mb-3">
                            <label for="numDice" class="form-label">Number of Dice</label>
                            <input type="number" class="form-control" id="numDice" value="1" min="1" max="10">
                        </div>
                        <div class="mb-3">
                            <label for="diceSides" class="form-label">Sides per Die (e.g., 6 for a standard die)</label>
                            <input type="number" class="form-control" id="diceSides" value="6" min="2" max="100">
                        </div>
                        <button class="btn btn-primary" id="rollDice">Roll Dice</button>
                        <h4 class="mt-3">Result: <span id="diceResult"></span></h4>
                    </div>
                `;
                activateToolFunction = initDiceRoller;
                break;
            case 'coin-flipper':
                toolHtml = `
                    <div class="tool-section text-center">
                        <h3>Coin Flipper</h3>
                        <p class="text-muted">Click the button to flip a coin.</p>
                        <img src="img/coin_placeholder.png" alt="Coin" id="coinImage" class="img-fluid my-3" style="max-height: 150px; border-radius: 50%; border: 2px solid #ccc;">
                        <button class="btn btn-primary btn-lg" id="flipCoin">Flip Coin</button>
                        <h4 class="mt-3">Result: <span id="coinResult"></span></h4>
                    </div>
                `;
                // Add a placeholder image in img/coin_placeholder.png (or just show text)
                activateToolFunction = initCoinFlipper;
                break;
            case 'random-team-picker':
                toolHtml = `
                    <div class="tool-section">
                        <h3>Random Team Picker</h3>
                        <div class="mb-3">
                            <label for="playerNames" class="form-label">Enter Player Names (one per line)</label>
                            <textarea class="form-control" id="playerNames" rows="6" placeholder="Alice&#10;Bob&#10;Charlie&#10;David&#10;Eve&#10;Frank"></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="numTeams" class="form-label">Number of Teams</label>
                            <input type="number" class="form-control" id="numTeams" value="2" min="1">
                        </div>
                        <button class="btn btn-primary" id="pickTeams">Generate Teams</button>
                        <div class="mt-3" id="teamResults">
                            </div>
                    </div>
                `;
                activateToolFunction = initRandomTeamPicker;
                break;
            case 'decision-maker':
                toolHtml = `
                    <div class="tool-section">
                        <h3>Decision Maker / Spinner Wheel</h3>
                        <p class="text-muted">Enter options (one per line) and click to get a random decision.</p>
                        <div class="mb-3">
                            <label for="decisionOptions" class="form-label">Enter Options (one per line)</label>
                            <textarea class="form-control" id="decisionOptions" rows="6" placeholder="Option A&#10;Option B&#10;Option C&#10;Option D"></textarea>
                        </div>
                        <button class="btn btn-primary" id="makeDecision">Make Decision</button>
                        <h2 class="mt-3 text-center" id="decisionResult"></h2>
                    </div>
                `;
                activateToolFunction = initDecisionMaker;
                break;

            // ... (rest of the main.js file) ...
            // ... (previous cases for converters, calculators, text tools, generators, etc.) ...

            case 'color-picker':
                toolHtml = `
                    <div class="tool-section">
                        <h3>Color Picker</h3>
                        <p class="text-muted">Select a color and get its HEX, RGB, and HSL values.</p>
                        <div class="mb-3">
                            <label for="colorInput" class="form-label">Choose Color</label>
                            <input type="color" class="form-control form-control-color" id="colorInput" value="#007bff">
                        </div>
                        <div class="mb-3">
                            <label for="colorPreview" class="form-label">Color Preview</label>
                            <div id="colorPreview" style="width: 100%; height: 80px; background-color: #007bff; border: 1px solid #ccc; border-radius: 5px;"></div>
                        </div>
                        <div class="mt-3">
                            <p><strong>HEX:</strong> <span id="hexValue">#007BFF</span></p>
                            <p><strong>RGB:</strong> <span id="rgbValue">rgb(0, 123, 255)</span></p>
                            <p><strong>HSL:</strong> <span id="hslValue">hsl(210, 100%, 50%)</span></p>
                        </div>
                    </div>
                `;
                activateToolFunction = initColorPicker;
                break;
            case 'favicon-generator':
                toolHtml = `
                    <div class="tool-section">
                        <h3>Favicon Generator</h3>
                        <p class="text-muted">Upload an image to generate a favicon.ico.</p>
                        <div class="mb-3">
                            <label for="faviconImageUpload" class="form-label">Upload Image (JPG, PNG, GIF)</label>
                            <input class="form-control" type="file" id="faviconImageUpload" accept="image/png, image/jpeg, image/gif">
                        </div>
                        <button class="btn btn-primary" id="generateFavicon" disabled>Generate Favicon</button>
                        <div class="mt-3" id="faviconDownloadArea" style="display:none;">
                            <h4>Download your Favicon:</h4>
                            <p>Right-click the image and "Save Image As..." or click the link.</p>
                            <img id="faviconPreview" src="" alt="Generated Favicon" class="img-thumbnail" style="width: 64px; height: 64px; margin-right: 10px;">
                            <a id="faviconDownloadLink" href="#" download="favicon.ico" class="btn btn-success"><i class="fas fa-download"></i> Download favicon.ico</a>
                        </div>
                        <div id="faviconStatus" class="mt-3"></div>
                    </div>
                `;
                // Note: Favicon generation usually requires server-side processing or a dedicated library
                // This will be a client-side demo showing how it *might* work, but true ICO generation is hard in pure JS.
                // We'll generate a PNG of appropriate size and suggest saving as .ico.
                activateToolFunction = initFaviconGenerator;
                break;
            case 'qr-code-generator':
                toolHtml = `
                    <div class="tool-section">
                        <h3>QR Code Generator</h3>
                        <p class="text-muted">Enter text or a URL to generate a QR code.</p>
                        <div class="mb-3">
                            <label for="qrTextInput" class="form-label">Text or URL</label>
                            <textarea class="form-control" id="qrTextInput" rows="3" placeholder="https://www.example.com"></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="qrSize" class="form-label">QR Code Size (pixels)</label>
                            <input type="number" class="form-control" id="qrSize" value="256" min="64" max="1024">
                        </div>
                        <button class="btn btn-primary" id="generateQrCode">Generate QR Code</button>
                        <div class="mt-3 text-center">
                            <div id="qrcode" class="d-inline-block p-2 border rounded"></div>
                            <p class="mt-2 text-muted">Right-click the QR code to save it.</p>
                        </div>
                    </div>
                `;
                // Requires an external library: qrcode.js or qrious
                // I'll use qrious for a simpler setup.
                activateToolFunction = initQrCodeGenerator;
                break;
             case 'checklist':
                toolHtml = `
                    <div class="tool-section">
                        <h3>Simple Checklist</h3>
                        <p class="text-muted">Create and manage your to-do list. Your list is saved in your browser.</p>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" id="checklistNewItem" placeholder="Add a new item">
                            <button class="btn btn-primary" type="button" id="addChecklistItem">Add</button>
                        </div>
                        <ul class="list-group" id="checklistItems">
                            </ul>
                        <button class="btn btn-danger mt-3" id="clearChecklist">Clear All Completed</button>
                    </div>
                `;
                activateToolFunction = initChecklist; // Ensure this is 'initChecklist'
                break;
            case 'stopwatch':
                toolHtml = `
                    <div class="tool-section text-center">
                        <h3>Stopwatch</h3>
                        <div class="stopwatch-display display-1 fw-bold my-4" id="stopwatchDisplay">00:00:00.000</div>
                        <div class="d-flex justify-content-center gap-2 mb-3">
                            <button class="btn btn-success btn-lg" id="stopwatchStart">Start</button>
                            <button class="btn btn-warning btn-lg" id="stopwatchPause">Pause</button>
                            <button class="btn btn-danger btn-lg" id="stopwatchReset">Reset</button>
                            <button class="btn btn-info btn-lg" id="stopwatchLap">Lap</button>
                        </div>
                        <h4>Laps:</h4>
                        <ul class="list-group text-start" id="stopwatchLaps">
                            </ul>
                    </div>
                `;
                activateToolFunction = initStopwatch;
                break;
            case 'metronome':
                toolHtml = `
                    <div class="tool-section text-center">
                        <h3>Metronome</h3>
                        <p class="text-muted">Set the tempo (BPM) and start the metronome.</p>
                        <div class="mb-4">
                            <label for="metronomeBpm" class="form-label fs-4">BPM: <span id="metronomeBpmValue">120</span></label>
                            <input type="range" class="form-range" id="metronomeBpm" min="40" max="240" value="120">
                        </div>
                        <div class="d-flex justify-content-center gap-3">
                            <button class="btn btn-primary btn-lg" id="metronomeStartStop">Start</button>
                            <button class="btn btn-secondary btn-lg" id="metronomeTap">Tap Tempo</button>
                        </div>
                        <div class="mt-4">
                            <div id="metronomeBeatDisplay" class="d-inline-block border border-primary rounded-circle p-4" style="width: 60px; height: 60px;"></div>
                        </div>
                    </div>
                `;
                // Metronome needs Web Audio API for accurate timing
                activateToolFunction = initMetronome;
                break;

            // ... (rest of the main.js file) ...
            // ... add cases for all other tools ...
            default:
                toolHtml = `<h2 class="text-center text-muted mt-5">Select a tool from the sidebar to get started!</h2>`;
                break;
        }

        toolContainer.innerHTML = toolHtml;
        if (activateToolFunction) {
            activateToolFunction(); // Call the specific tool's initialization function
        }
    }

    // Handle sidebar navigation clicks
    sidebarNav.addEventListener('click', (event) => {
        const target = event.target.closest('.nav-link'); // Get the closest .nav-link ancestor

        if (target && target.tagName === 'A') { // Ensure a link was clicked
            event.preventDefault(); // Prevent default link behavior

            // Handle Category Link Clicks (toggle sub-menu visibility)
            if (target.dataset.category) {
                const category = target.dataset.category;
                const subMenu = sidebarNav.querySelector(`ul[data-parent-category="${category}"]`);

                if (subMenu) {
                    // Hide all other open sub-menus
                    sidebarNav.querySelectorAll('ul[data-parent-category]').forEach(ul => {
                        if (ul !== subMenu) {
                            ul.style.display = 'none';
                        }
                    });
                    // Toggle the clicked category's sub-menu
                    subMenu.style.display = subMenu.style.display === 'block' ? 'none' : 'block';

                    // Update active class for category link (optional, for visual feedback)
                    sidebarNav.querySelectorAll('.nav-link[data-category]').forEach(link => {
                        link.classList.remove('active');
                    });
                    if (subMenu.style.display === 'block') {
                        target.classList.add('active');
                    }
                }
            }

            // Handle Tool Link Clicks (render tool content and set active class)
            const toolName = target.dataset.tool;
            if (toolName) {
                // Remove active class from all other tool links
                sidebarNav.querySelectorAll('.nav-link[data-tool]').forEach(link => {
                    link.classList.remove('active');
                });
                // Set active class on the clicked tool link
                target.classList.add('active');
                renderTool(toolName); // Render the selected tool
            }
        }
    });

    // Initial load: Render default message or the first tool
    renderTool(null);
});
