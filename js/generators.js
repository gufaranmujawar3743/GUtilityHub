// --- Random Password Generator (already exists, keep it) ---
function initPasswordGenerator() {
    const lengthInput = document.getElementById('passwordLength');
    const uppercaseCheckbox = document.getElementById('includeUppercase');
    const lowercaseCheckbox = document.getElementById('includeLowercase');
    const numbersCheckbox = document.getElementById('includeNumbers');
    const symbolsCheckbox = document.getElementById('includeSymbols');
    const generateButton = document.getElementById('generatePassword');
    const generatedPasswordInput = document.getElementById('generatedPassword');
    const copyButton = document.getElementById('copyPassword');

    const charset = {
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+~`|}{[]\:;?><,./-='
    };

    generateButton.addEventListener('click', () => {
        let allChars = '';
        if (lowercaseCheckbox.checked) allChars += charset.lowercase;
        if (uppercaseCheckbox.checked) allChars += charset.uppercase;
        if (numbersCheckbox.checked) allChars += charset.numbers;
        if (symbolsCheckbox.checked) allChars += charset.symbols;

        const length = parseInt(lengthInput.value);
        let password = '';

        if (allChars.length === 0) {
            generatedPasswordInput.value = 'Select at least one character type!';
            return;
        }
        if (length < 4 || length > 64 || isNaN(length)) {
            generatedPasswordInput.value = 'Length must be between 4 and 64';
            return;
        }

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * allChars.length);
            password += allChars[randomIndex];
        }
        generatedPasswordInput.value = password;
    });

    copyButton.addEventListener('click', () => {
        if (generatedPasswordInput.value) {
            generatedPasswordInput.select();
            generatedPasswordInput.setSelectionRange(0, 99999);
            document.execCommand('copy');
            alert('Password copied to clipboard!');
        } else {
            alert('No password generated yet!');
        }
    });

    // Generate a default password on load
    generateButton.click();
}


// --- Random Number Generator ---
function initRandomNumberGenerator() {
    const minInput = document.getElementById('randomNumberMin');
    const maxInput = document.getElementById('randomNumberMax');
    const generateButton = document.getElementById('generateRandomNumber');
    const resultSpan = document.getElementById('randomNumberResult');

    generateButton.addEventListener('click', () => {
        let min = parseInt(minInput.value);
        let max = parseInt(maxInput.value);

        if (isNaN(min) || isNaN(max)) {
            resultSpan.textContent = 'Please enter valid numbers.';
            return;
        }

        if (min > max) {
            [min, max] = [max, min]; // Swap if min is greater than max
        }

        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        resultSpan.textContent = randomNumber;
    });

    // Generate a number on initial load
    generateButton.click();
}

// --- Dice Roller ---
function initDiceRoller() {
    const numDiceInput = document.getElementById('numDice');
    const diceSidesInput = document.getElementById('diceSides');
    const rollButton = document.getElementById('rollDice');
    const resultSpan = document.getElementById('diceResult');

    rollButton.addEventListener('click', () => {
        const numDice = parseInt(numDiceInput.value);
        const diceSides = parseInt(diceSidesInput.value);

        if (isNaN(numDice) || numDice < 1 || numDice > 10 ||
            isNaN(diceSides) || diceSides < 2 || diceSides > 100) {
            resultSpan.textContent = 'Please enter valid numbers (1-10 dice, 2-100 sides).';
            return;
        }

        let rolls = [];
        let total = 0;
        for (let i = 0; i < numDice; i++) {
            const roll = Math.floor(Math.random() * diceSides) + 1;
            rolls.push(roll);
            total += roll;
        }

        if (numDice > 1) {
            resultSpan.textContent = `Rolls: ${rolls.join(', ')} (Total: ${total})`;
        } else {
            resultSpan.textContent = `Roll: ${rolls[0]}`;
        }
    });

    // Initial roll
    rollButton.click();
}

// --- Coin Flipper ---
function initCoinFlipper() {
    const flipButton = document.getElementById('flipCoin');
    const resultSpan = document.getElementById('coinResult');
    const coinImage = document.getElementById('coinImage');

    // You'll need to have these images in your `img/` folder
    // For example: `img/heads.png` and `img/tails.png`
    // Or you can just display text.
    const headsImage = 'https://toppng.com/uploads/preview/pile-of-gold-coins-png-11552726089l6dydf39e2.png';
    const tailsImage = 'https://thumbs.dreamstime.com/b/tail-side-coin-isolated-vector-illustration-tail-side-coin-isolated-vector-illustration-190850449.jpg';
    const placeholderImage = 'https://png.pngtree.com/png-clipart/20220430/original/pngtree-money-coin-icon-png-image_7598509.png'; // Or your default coin image

    // Set initial image
    coinImage.src = placeholderImage;
    coinImage.alt = 'Coin Placeholder';
    resultSpan.textContent = 'Click Flip Coin!';

    flipButton.addEventListener('click', () => {
        resultSpan.textContent = ''; // Clear previous result
        coinImage.src = placeholderImage; // Reset to placeholder during animation/wait
        coinImage.classList.add('flipping'); // Add animation class (if you add CSS for it)

        // Simulate a flip delay
        setTimeout(() => {
            const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
            resultSpan.textContent = result;
            coinImage.src = result === 'Heads' ? headsImage : tailsImage;
            coinImage.alt = result;
            coinImage.classList.remove('flipping'); // Remove animation class
        }, 800); // Adjust delay for animation
    });

    // Optional: Add CSS to `css/style.css` for a flipping animation
    /*
    @keyframes flip {
        0% { transform: rotateY(0deg); }
        50% { transform: rotateY(180deg); }
        100% { transform: rotateY(360deg); }
    }
    .flipping {
        animation: flip 0.8s ease-out forwards;
    }
    */
}

// --- Random Team Picker ---
function initRandomTeamPicker() {
    const playerNamesInput = document.getElementById('playerNames');
    const numTeamsInput = document.getElementById('numTeams');
    const pickTeamsButton = document.getElementById('pickTeams');
    const teamResultsDiv = document.getElementById('teamResults');

    // Placeholder players for convenience
    playerNamesInput.value = "Alice\nBob\nCharlie\nDavid\nEve\nFrank\nGrace\nHeidi";
    numTeamsInput.value = 2;

    pickTeamsButton.addEventListener('click', () => {
        const playerNames = playerNamesInput.value.split('\n')
            .map(name => name.trim())
            .filter(name => name !== ''); // Get non-empty names

        const numTeams = parseInt(numTeamsInput.value);

        teamResultsDiv.innerHTML = ''; // Clear previous results

        if (playerNames.length === 0) {
            teamResultsDiv.innerHTML = '<div class="alert alert-warning">Please enter player names.</div>';
            return;
        }
        if (isNaN(numTeams) || numTeams < 1) {
            teamResultsDiv.innerHTML = '<div class="alert alert-warning">Please enter a valid number of teams (at least 1).</div>';
            return;
        }
        if (numTeams > playerNames.length) {
            teamResultsDiv.innerHTML = '<div class="alert alert-warning">Cannot have more teams than players.</div>';
            return;
        }

        // Shuffle players using Fisher-Yates algorithm
        for (let i = playerNames.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [playerNames[i], playerNames[j]] = [playerNames[j], playerNames[i]];
        }

        // Distribute players into teams
        const teams = Array.from({ length: numTeams }, () => []);
        playerNames.forEach((player, index) => {
            teams[index % numTeams].push(player);
        });

        // Display results
        teams.forEach((team, index) => {
            const teamCard = document.createElement('div');
            teamCard.classList.add('card', 'mb-3', 'bg-light');
            teamCard.innerHTML = `
                <div class="card-header">Team ${index + 1}</div>
                <ul class="list-group list-group-flush">
                    ${team.map(player => `<li class="list-group-item">${player}</li>`).join('')}
                </ul>
            `;
            teamResultsDiv.appendChild(teamCard);
        });
    });
}

// --- Decision Maker / Spinner Wheel ---
function initDecisionMaker() {
    const optionsInput = document.getElementById('decisionOptions');
    const makeDecisionButton = document.getElementById('makeDecision');
    const decisionResultSpan = document.getElementById('decisionResult');

    // Placeholder options for convenience
    optionsInput.value = "Pizza\nBurger\nSalad\nTacos";

    makeDecisionButton.addEventListener('click', () => {
        const options = optionsInput.value.split('\n')
            .map(option => option.trim())
            .filter(option => option !== ''); // Get non-empty options

        if (options.length === 0) {
            decisionResultSpan.textContent = 'Please enter at least one option.';
            return;
        }

        const randomIndex = Math.floor(Math.random() * options.length);
        const chosenOption = options[randomIndex];

        // Simple animation/effect: quickly show "..." then the result
        decisionResultSpan.textContent = 'Deciding...';
        setTimeout(() => {
            decisionResultSpan.textContent = chosenOption;
        }, 700); // Short delay for effect
    });
}