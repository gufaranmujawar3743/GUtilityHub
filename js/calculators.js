function initBMICalculator() {
    const heightInput = document.getElementById('bmiHeight');
    const weightInput = document.getElementById('bmiWeight');
    const calculateButton = document.getElementById('calculateBMI');
    const bmiResultSpan = document.getElementById('bmiResult');
    const bmiCategorySpan = document.getElementById('bmiCategory');

    calculateButton.addEventListener('click', () => {
        const heightCm = parseFloat(heightInput.value);
        const weightKg = parseFloat(weightInput.value);

        if (isNaN(heightCm) || isNaN(weightKg) || heightCm <= 0 || weightKg <= 0) {
            bmiResultSpan.textContent = 'Invalid input';
            bmiCategorySpan.textContent = '';
            return;
        }

        const heightM = heightCm / 100; // Convert cm to meters
        const bmi = weightKg / (heightM * heightM);
        let category = '';

        if (bmi < 18.5) {
            category = 'Underweight';
        } else if (bmi >= 18.5 && bmi < 24.9) {
            category = 'Normal weight';
        } else if (bmi >= 25 && bmi < 29.9) {
            category = 'Overweight';
        } else {
            category = 'Obesity';
        }

        bmiResultSpan.textContent = bmi.toFixed(2);
        bmiCategorySpan.textContent = category;
    });
}

// --- Typing Speed Calculator ---
function initTypingSpeedCalculator() {
    const typingTextElement = document.getElementById('typingText');
    const typingInput = document.getElementById('typingInput');
    const startButton = document.getElementById('startTypingTest');
    const resetButton = document.getElementById('resetTypingTest');
    const wpmResultSpan = document.getElementById('wpmResult');
    const accuracyResultSpan = document.getElementById('accuracyResult');
    const timeElapsedSpan = document.getElementById('timeElapsed');

    const sampleTexts = [
        "The quick brown fox jumps over the lazy dog.",
        "Programming is fun and challenging, requiring logical thinking and problem-solving skills.",
        "Practice makes perfect. The more you type, the faster and more accurate you will become.",
        "A journey of a thousand miles begins with a single step.",
        "Innovation distinguishes between a leader and a follower."
    ];

    let timer;
    let startTime;
    let typedCharacters = 0;
    let correctCharacters = 0;

    function resetTest() {
        clearInterval(timer);
        typingInput.value = '';
        typingInput.disabled = true;
        startButton.style.display = 'inline-block';
        resetButton.style.display = 'none';
        wpmResultSpan.textContent = '0';
        accuracyResultSpan.textContent = '100.00%';
        timeElapsedSpan.textContent = '0';
        typedCharacters = 0;
        correctCharacters = 0;
        typingTextElement.textContent = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
        typingInput.style.borderColor = ''; // Reset border color
    }

    function calculateResults() {
        const elapsedTime = (new Date() - startTime) / 1000; // in seconds
        timeElapsedSpan.textContent = elapsedTime.toFixed(0);

        if (elapsedTime > 0) {
            const wordsTyped = typingInput.value.split(/\s+/).filter(word => word !== '').length;
            const wpm = (correctCharacters / 5) / (elapsedTime / 60); // 5 chars per word
            wpmResultSpan.textContent = Math.round(wpm);

            const accuracy = (correctCharacters / typedCharacters) * 100 || 100;
            accuracyResultSpan.textContent = accuracy.toFixed(2) + '%';
        }
    }

    startButton.addEventListener('click', () => {
        resetTest(); // Reset before starting to ensure a clean slate
        typingInput.disabled = false;
        typingInput.focus();
        startButton.style.display = 'none';
        resetButton.style.display = 'inline-block';

        startTime = new Date();
        timer = setInterval(calculateResults, 1000); // Update results every second
    });

    typingInput.addEventListener('input', () => {
        const typedText = typingInput.value;
        const originalText = typingTextElement.textContent;

        typedCharacters = typedText.length;
        correctCharacters = 0;

        let charMismatch = false;
        for (let i = 0; i < typedText.length; i++) {
            if (typedText[i] === originalText[i]) {
                correctCharacters++;
            } else {
                charMismatch = true;
                break; // Stop checking accuracy after the first mismatch
            }
        }

        if (charMismatch) {
            typingInput.style.borderColor = 'red';
        } else {
            typingInput.style.borderColor = 'green';
        }

        // If user has typed the entire text, end the test
        if (typedText === originalText) {
            clearInterval(timer);
            typingInput.disabled = true;
            typingInput.style.borderColor = ''; // Reset border
            calculateResults(); // Final calculation
            alert('Typing test complete!');
        }
    });

    resetButton.addEventListener('click', resetTest);

    resetTest(); // Initialize the test when the tool is loaded
}

// --- Investment Calculator ---
function initInvestmentCalculator() {
    const initialInvestmentInput = document.getElementById('initialInvestment');
    const monthlyContributionInput = document.getElementById('monthlyContribution');
    const annualInterestRateInput = document.getElementById('annualInterestRate');
    const investmentPeriodInput = document.getElementById('investmentPeriod');
    const calculateButton = document.getElementById('calculateInvestment');
    const investmentResultSpan = document.getElementById('investmentResult');
    const totalContributionsSpan = document.getElementById('totalContributions');
    const totalInterestSpan = document.getElementById('totalInterest');

    calculateButton.addEventListener('click', () => {
        let initialInvestment = parseFloat(initialInvestmentInput.value);
        let monthlyContribution = parseFloat(monthlyContributionInput.value);
        let annualInterestRate = parseFloat(annualInterestRateInput.value);
        let investmentPeriodYears = parseInt(investmentPeriodInput.value);

        if (isNaN(initialInvestment) || initialInvestment < 0 ||
            isNaN(monthlyContribution) || monthlyContribution < 0 ||
            isNaN(annualInterestRate) || annualInterestRate < 0 ||
            isNaN(investmentPeriodYears) || investmentPeriodYears <= 0) {
            investmentResultSpan.textContent = '$N/A';
            totalContributionsSpan.textContent = '$N/A';
            totalInterestSpan.textContent = '$N/A';
            alert('Please enter valid positive numbers for all fields.');
            return;
        }

        const monthlyInterestRate = (annualInterestRate / 100) / 12;
        const totalMonths = investmentPeriodYears * 12;

        let futureValue = initialInvestment;
        let totalContributions = initialInvestment;

        for (let i = 0; i < totalMonths; i++) {
            futureValue = futureValue * (1 + monthlyInterestRate);
            futureValue += monthlyContribution;
            if (i < totalMonths) { // Don't add contribution for the last iteration, it's compounded
                totalContributions += monthlyContribution;
            }
        }

        const totalInterestEarned = futureValue - totalContributions;

        investmentResultSpan.textContent = `$${futureValue.toFixed(2)}`;
        totalContributionsSpan.textContent = `$${totalContributions.toFixed(2)}`;
        totalInterestSpan.textContent = `$${totalInterestEarned.toFixed(2)}`;
    });
}

// --- Loan/Mortgage Calculator ---
function initLoanMortgageCalculator() {
    const loanAmountInput = document.getElementById('loanAmount');
    const loanInterestRateInput = document.getElementById('loanInterestRate');
    const loanTermInput = document.getElementById('loanTerm');
    const calculateButton = document.getElementById('calculateLoan');
    const monthlyPaymentResultSpan = document.getElementById('monthlyPaymentResult');
    const totalLoanPaymentSpan = document.getElementById('totalLoanPayment');
    const totalLoanInterestSpan = document.getElementById('totalLoanInterest');

    calculateButton.addEventListener('click', () => {
        let principal = parseFloat(loanAmountInput.value);
        let annualRate = parseFloat(loanInterestRateInput.value);
        let termYears = parseInt(loanTermInput.value);

        if (isNaN(principal) || principal <= 0 ||
            isNaN(annualRate) || annualRate < 0 ||
            isNaN(termYears) || termYears <= 0) {
            monthlyPaymentResultSpan.textContent = '$N/A';
            totalLoanPaymentSpan.textContent = '$N/A';
            totalLoanInterestSpan.textContent = '$N/A';
            alert('Please enter valid positive numbers for all fields.');
            return;
        }

        const monthlyRate = annualRate / 100 / 12;
        const numberOfPayments = termYears * 12;

        let monthlyPayment;
        if (monthlyRate === 0) {
            monthlyPayment = principal / numberOfPayments; // Simple interest if rate is 0
        } else {
            monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        }

        const totalPayment = monthlyPayment * numberOfPayments;
        const totalInterest = totalPayment - principal;

        monthlyPaymentResultSpan.textContent = `$${monthlyPayment.toFixed(2)}`;
        totalLoanPaymentSpan.textContent = `$${totalPayment.toFixed(2)}`;
        totalLoanInterestSpan.textContent = `$${totalInterest.toFixed(2)}`;
    });
}

// --- Working Days Calculator ---
function initWorkingDaysCalculator() {
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const holidaysInput = document.getElementById('holidays');
    const calculateButton = document.getElementById('calculateWorkingDays');
    const resultSpan = document.getElementById('workingDaysResult');

    calculateButton.addEventListener('click', () => {
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);
        const holidaysStr = holidaysInput.value.trim();
        const holidays = holidaysStr.split(',').map(h => new Date(h.trim()).toDateString()); // Convert to string for easy comparison

        if (isNaN(startDate) || isNaN(endDate) || startDate > endDate) {
            resultSpan.textContent = 'Please enter valid start and end dates.';
            return;
        }

        let workingDays = 0;
        let currentDate = new Date(startDate); // Start from the beginning date

        while (currentDate <= endDate) {
            const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

            // Check if it's a weekday (Monday to Friday) and not a holiday
            if (dayOfWeek >= 1 && dayOfWeek <= 5 && !holidays.includes(currentDate.toDateString())) {
                workingDays++;
            }
            currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
        }

        resultSpan.textContent = workingDays;
    });

    // Set default dates for convenience
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    startDateInput.valueAsDate = today;
    endDateInput.valueAsDate = nextWeek;
}

// --- Time Duration Calculator ---
function initTimeDurationCalculator() {
    const startTimeInput = document.getElementById('startTime');
    const endTimeInput = document.getElementById('endTime');
    const calculateButton = document.getElementById('calculateTimeDuration');
    const resultSpan = document.getElementById('timeDurationResult');

    calculateButton.addEventListener('click', () => {
        const startTime = new Date(startTimeInput.value);
        const endTime = new Date(endTimeInput.value);

        if (isNaN(startTime) || isNaN(endTime) || startTime > endTime) {
            resultSpan.textContent = 'Please enter valid start and end dates/times.';
            return;
        }

        const diffMilliseconds = endTime - startTime; // Difference in milliseconds

        const seconds = Math.floor((diffMilliseconds / 1000) % 60);
        const minutes = Math.floor((diffMilliseconds / (1000 * 60)) % 60);
        const hours = Math.floor((diffMilliseconds / (1000 * 60 * 60)) % 24);
        const days = Math.floor(diffMilliseconds / (1000 * 60 * 60 * 24));

        let duration = '';
        if (days > 0) duration += `${days} days, `;
        duration += `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        resultSpan.textContent = duration;
    });

    // Set default current time for convenience
    const now = new Date();
    // Format to YYYY-MM-DDTHH:MM for datetime-local input
    const pad = (num) => num.toString().padStart(2, '0');
    const defaultDateTime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
    startTimeInput.value = defaultDateTime;

    const oneHourLater = new Date(now.getTime() + (60 * 60 * 1000));
    const defaultEndTime = `${oneHourLater.getFullYear()}-${pad(oneHourLater.getMonth() + 1)}-${pad(oneHourLater.getDate())}T${pad(oneHourLater.getHours())}:${pad(oneHourLater.getMinutes())}`;
    endTimeInput.value = defaultEndTime;
}


// --- Countdown Timer ---
let countdownInterval;
let countdownTargetDate;

function updateCountdownDisplay(displayElement, titleElement, targetDate) {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        clearInterval(countdownInterval);
        displayElement.textContent = 'EXPIRED!';
        titleElement.textContent = 'Event has passed.';
        document.getElementById('startCountdown').style.display = 'inline-block';
        document.getElementById('resetCountdown').style.display = 'none';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    displayElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    titleElement.textContent = document.getElementById('countdownTitle').value || 'Untitled Event';
}

function initCountdownTimer() {
    const countdownDateTimeInput = document.getElementById('countdownDateTime');
    const countdownTitleInput = document.getElementById('countdownTitle');
    const startButton = document.getElementById('startCountdown');
    const resetButton = document.getElementById('resetCountdown');
    const countdownDisplay = document.getElementById('countdownDisplay');
    const countdownEventTitle = document.getElementById('countdownEventTitle');

    // Clear any existing interval when the tool is loaded/reloaded
    clearInterval(countdownInterval);
    countdownDisplay.textContent = '0d 0h 0m 0s';
    countdownEventTitle.textContent = '';
    countdownDateTimeInput.value = '';
    countdownTitleInput.value = '';
    startButton.style.display = 'inline-block';
    resetButton.style.display = 'none';

    startButton.addEventListener('click', () => {
        const dateTimeStr = countdownDateTimeInput.value;
        const title = countdownTitleInput.value.trim();

        if (!dateTimeStr) {
            alert('Please select a target date and time.');
            return;
        }

        countdownTargetDate = new Date(dateTimeStr).getTime();

        if (isNaN(countdownTargetDate)) {
            alert('Invalid date or time format.');
            return;
        }

        clearInterval(countdownInterval); // Clear any old interval
        countdownInterval = setInterval(() => {
            updateCountdownDisplay(countdownDisplay, countdownEventTitle, countdownTargetDate);
        }, 1000);

        startButton.style.display = 'none';
        resetButton.style.display = 'inline-block';
        updateCountdownDisplay(countdownDisplay, countdownEventTitle, countdownTargetDate); // Initial display
    });

    resetButton.addEventListener('click', () => {
        clearInterval(countdownInterval);
        countdownDisplay.textContent = '0d 0h 0m 0s';
        countdownEventTitle.textContent = '';
        countdownDateTimeInput.value = '';
        countdownTitleInput.value = '';
        startButton.style.display = 'inline-block';
        resetButton.style.display = 'none';
    });

    // Set a default date for convenience (e.g., a week from now)
    const now = new Date();
    const oneWeekLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const pad = (num) => num.toString().padStart(2, '0');
    const defaultDateTime = `${oneWeekLater.getFullYear()}-${pad(oneWeekLater.getMonth() + 1)}-${pad(oneWeekLater.getDate())}T${pad(oneWeekLater.getHours())}:${pad(oneWeekLater.getMinutes())}`;
    countdownDateTimeInput.value = defaultDateTime;
    countdownTitleInput.value = 'My Next Goal';
}

// --- Due Date Calculator ---
function initDueDateCalculator() {
    const baseDateInput = document.getElementById('baseDate');
    const daysToAddInput = document.getElementById('daysToAdd');
    const calculateButton = document.getElementById('calculateDueDate');
    const resultSpan = document.getElementById('dueDateResult');

    calculateButton.addEventListener('click', () => {
        const baseDate = new Date(baseDateInput.value);
        const daysToAdd = parseInt(daysToAddInput.value);

        if (isNaN(baseDate) || isNaN(daysToAdd) || daysToAdd < 0) {
            resultSpan.textContent = 'Please enter a valid base date and number of days.';
            return;
        }

        // Create a new date object and add days
        const dueDate = new Date(baseDate);
        dueDate.setDate(baseDate.getDate() + daysToAdd);

        resultSpan.textContent = dueDate.toLocaleDateString(); // Format nicely for the user
    });

    // Set default base date to today
    baseDateInput.valueAsDate = new Date();
}