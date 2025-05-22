// Function for Cooking Unit Converter
function initCookingConverter() {
    const amountInput = document.getElementById('cookingAmount');
    const fromUnitSelect = document.getElementById('cookingFromUnit');
    const toUnitSelect = document.getElementById('cookingToUnit');
    const convertButton = document.getElementById('convertCooking');
    const resultSpan = document.getElementById('cookingResult');

    convertButton.addEventListener('click', () => {
        const amount = parseFloat(amountInput.value);
        const fromUnit = fromUnitSelect.value;
        const toUnit = toUnitSelect.value;
        let result = 0;

        if (isNaN(amount)) {
            resultSpan.textContent = 'Invalid amount';
            return;
        }

        // Conversion logic (simplified example)
        if (fromUnit === 'cups' && toUnit === 'grams') {
            result = amount * 240; // Approx grams in a cup (e.g., water/flour)
        } else if (fromUnit === 'grams' && toUnit === 'cups') {
            result = amount / 240;
        } else if (fromUnit === 'tbsp' && toUnit === 'ml') {
            result = amount * 15;
        } else if (fromUnit === 'ml' && toUnit === 'tbsp') {
            result = amount / 15;
        } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
            result = (amount - 32) * 5 / 9;
        } else if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
            result = (amount * 9 / 5) + 32;
        } else if (fromUnit === toUnit) {
            result = amount;
        } else {
            resultSpan.textContent = 'Conversion not supported for these units.';
            return;
        }

        resultSpan.textContent = result.toFixed(2) + ' ' + toUnit;
    });
}

// Function for Currency Converter
async function initCurrencyConverter() {
    const amountInput = document.getElementById('currencyAmount');
    const fromCurrencySelect = document.getElementById('currencyFrom');
    const toCurrencySelect = document.getElementById('currencyTo');
    const convertButton = document.getElementById('convertCurrency');
    const resultSpan = document.getElementById('currencyResult');

    // Use a public API for real-time rates
    // Example using ExchangeRate-API (Free tier available, limited requests)
    // You would typically sign up for a free API key
    const API_KEY = '65a0df707696dee8fb8288b1'; // REPLACE WITH YOUR ACTUAL API KEY
    const API_BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;

    let exchangeRates = {}; // Store fetched rates

    async function fetchExchangeRates(baseCurrency) {
        try {
            const response = await fetch(`${API_BASE_URL}${baseCurrency}`);
            const data = await response.json();
            if (data.result === 'success') {
                exchangeRates = data.conversion_rates;
                console.log(`Rates fetched for ${baseCurrency}:`, exchangeRates);
            } else {
                console.error('Error fetching exchange rates:', data['error-type']);
                resultSpan.textContent = 'Error fetching rates. Please try again later.';
            }
        } catch (error) {
            console.error('Network error fetching exchange rates:', error);
            resultSpan.textContent = 'Network error. Please check your connection.';
        }
    }

    async function populateCurrencyOptions() {
        // Fetch a base set of currencies (e.g., from USD rates) to get a list
        // Or maintain a static list if the API doesn't provide a direct list endpoint.
        // For simplicity, we'll use a common list here, but a real app would fetch available codes.
        const commonCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR', 'BRL', 'RUB', 'ZAR'];

        fromCurrencySelect.innerHTML = '';
        toCurrencySelect.innerHTML = '';

        commonCurrencies.forEach(code => {
            const option1 = document.createElement('option');
            option1.value = code;
            option1.textContent = code;
            fromCurrencySelect.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = code;
            option2.textContent = code;
            toCurrencySelect.appendChild(option2);
        });

        // Set defaults
        fromCurrencySelect.value = 'USD';
        toCurrencySelect.value = 'INR'; // Assuming India is the current location
        await fetchExchangeRates(fromCurrencySelect.value);
    }

    // Initial population of options and fetching rates
    await populateCurrencyOptions();

    // Re-fetch rates if the 'from' currency changes
    fromCurrencySelect.addEventListener('change', async () => {
        await fetchExchangeRates(fromCurrencySelect.value);
    });

    convertButton.addEventListener('click', () => {
        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        if (isNaN(amount) || amount <= 0) {
            resultSpan.textContent = 'Please enter a valid amount.';
            return;
        }
        if (!exchangeRates[toCurrency]) {
            resultSpan.textContent = 'Rates not available for target currency.';
            return;
        }

        // The API provides rates relative to the base currency (fromCurrency)
        // So, if fromCurrency is X and toCurrency is Y, then the rate is exchangeRates[Y]
        const rate = exchangeRates[toCurrency];
        const convertedAmount = amount * rate;

        resultSpan.textContent = `${convertedAmount.toFixed(2)} ${toCurrency}`;
    });
}

// converters.js

// ... (previous functions like initCookingConverter, initCurrencyConverter) ...

function initTimezoneConverter() {
    const tzDateTimeInput = document.getElementById('tzDateTime');
    const tzFromSelect = document.getElementById('tzFrom');
    const tzToSelect = document.getElementById('tzTo');
    const convertTimeZoneBtn = document.getElementById('convertTimeZone');
    const tzResultSpan = document.getElementById('tzResult');

    // Populate time zone options (a common set, you can expand this)
    const timeZones = [
        { value: 'America/New_York', label: 'New York (Eastern Time)' },
        { value: 'America/Los_Angeles', label: 'Los Angeles (Pacific Time)' },
        { value: 'Europe/London', label: 'London (GMT/BST)' },
        { value: 'Europe/Berlin', label: 'Berlin (CET/CEST)' },
        { value: 'Asia/Kolkata', label: 'Kolkata (IST)' }, // India Standard Time
        { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
        { value: 'Australia/Sydney', label: 'Sydney (AEST/AEDT)' },
        { value: 'Etc/UTC', label: 'Coordinated Universal Time (UTC)' },
        // Add more time zones as needed
    ];

    function populateTimeZones() {
        tzFromSelect.innerHTML = '';
        tzToSelect.innerHTML = '';

        timeZones.forEach(tz => {
            const optionFrom = document.createElement('option');
            optionFrom.value = tz.value;
            optionFrom.textContent = tz.label;
            tzFromSelect.appendChild(optionFrom);

            const optionTo = document.createElement('option');
            optionTo.value = tz.value;
            optionTo.textContent = tz.label;
            tzToSelect.appendChild(optionTo);
        });

        // Set default values (e.g., current location and a common destination)
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (timeZones.some(tz => tz.value === userTimeZone)) {
            tzFromSelect.value = userTimeZone;
        } else {
             // Fallback to a common one if user's timezone isn't in list
            tzFromSelect.value = 'Asia/Kolkata'; // Assuming India is the current location
        }
        tzToSelect.value = 'Europe/London';
    }

    // Set default date and time to current local time
    function setDefaultDateTime() {
        const now = new Date();
        // Format to YYYY-MM-DDTHH:MM for datetime-local input
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        tzDateTimeInput.value = `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    function convertTimeZone() {
        const dateTimeStr = tzDateTimeInput.value;
        const fromTimeZone = tzFromSelect.value;
        const toTimeZone = tzToSelect.value;

        if (!dateTimeStr) {
            tzResultSpan.textContent = "Please enter a date and time.";
            return;
        }

        try {
            // Create a Date object from the input string, considering the 'from' timezone.
            // This is tricky because Date() itself is always in local time or UTC.
            // We'll parse it as if it's in the 'fromTimeZone' and then convert.
            // The best way is to use Intl.DateTimeFormat to format the *input* date
            // into a string that represents the UTC time, then create a Date object from that.

            // Get the year, month, day, hours, minutes from the input
            const [datePart, timePart] = dateTimeStr.split('T');
            const [year, month, day] = datePart.split('-').map(Number);
            const [hours, minutes] = timePart.split(':').map(Number);

            // Create a date object in the 'from' timezone (conceptually)
            // Using a temporary Date object and then converting its components to UTC
            // based on the 'fromTimeZone' offset. This is a common workaround.
            const tempDate = new Date(year, month - 1, day, hours, minutes); // This is in local time

            // Calculate offset difference to get the true UTC equivalent of the input date
            // in the specified fromTimeZone. This is complex without a library like moment-timezone.
            // A simpler, but less robust approach for user input is to directly use
            // Intl.DateTimeFormat to format to the target timezone.

            // More robust approach using Intl.DateTimeFormat for conversion:
            // Parse the input date and time as UTC
            const inputDateUTC = new Date(Date.UTC(year, month - 1, day, hours, minutes));

            // Format this UTC date into the 'from' timezone to get its local time representation
            const fromDateTimeFormatter = new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
                timeZone: fromTimeZone,
                timeZoneName: 'shortOffset', // For things like GMT+5:30
            });

            // Re-parse the formatted date string to ensure it's treated as being in the 'from' timezone.
            // This is still not perfect for arbitrary date parsing with timezone shifts.
            // For a robust solution, you might need a library like `luxon` or `moment-timezone`.

            // Let's use the simpler, direct conversion of a standard Date object:
            // Treat the input `dateTimeStr` as local time and then convert it.
            // This assumes the user inputs their current local time, and wants to see it elsewhere.
            // If the user inputs a specific time *in* a specific timezone, it's harder.

            // Let's stick with the more common usage: user enters local time, wants to know what time it is in another TZ
            // Or, user enters a time and wants to know what it corresponds to in other TZs.
            // For the latter, `Intl.DateTimeFormat` is good.

            // Correct approach for 'what time is 2025-05-22 17:00 in Asia/Kolkata equivalent to in Europe/London?'
            // 1. Create a `Date` object from the input.
            // 2. Format that `Date` object to the `fromTimeZone` to understand its *actual* timestamp.
            // 3. Take that *actual* timestamp and format it to the `toTimeZone`.

            // To accurately interpret the input date and time as being in the `fromTimeZone`:
            // Create a Date object from the input string.
            const inputDate = new Date(dateTimeStr); // This will parse it as local time.

            // Get the offset of the 'from' timezone relative to UTC for the given date
            // This is complex and usually requires a library.
            // Native JS `Intl.DateTimeFormat` is good for *formatting* to a timezone,
            // but not for *parsing* a string as if it's already in a given timezone.

            // A common workaround is to manually adjust the UTC time based on timezone offsets.
            // However, this is prone to errors with daylight saving.

            // Let's use `Intl.DateTimeFormat`'s direct formatting capability:
            // Assume input `tzDateTimeInput.value` is being entered *as if it's already in the "From Time Zone"*.
            // We'll then use `Intl.DateTimeFormat` to reformat this interpreted date into the "To Time Zone".

            const dateToConvert = new Date(tzDateTimeInput.value); // This will be parsed in local timezone

            const formatter = new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZoneName: 'short',
                hour12: true, // or false based on preference
                timeZone: toTimeZone
            });

            const convertedTime = formatter.format(dateToConvert);
            tzResultSpan.textContent = convertedTime;

        } catch (error) {
            console.error("Time zone conversion error:", error);
            tzResultSpan.textContent = "Error during conversion. Please check input.";
        }
    }

    populateTimeZones();
    setDefaultDateTime(); // Set default to current local time
    convertTimeZoneBtn.addEventListener('click', convertTimeZone);

    // Also update on change of inputs
    tzDateTimeInput.addEventListener('change', convertTimeZone);
    tzFromSelect.addEventListener('change', convertTimeZone);
    tzToSelect.addEventListener('change', convertTimeZone);

    // Initial conversion on load
    convertTimeZone();
}

// ... (previous functions like initCookingConverter, initCurrencyConverter) ...

// --- Clothing Size Converter ---
function initClothingSizeConverter() {
    const clothingTypeSelect = document.getElementById('clothingType');
    const fromCountrySelect = document.getElementById('clothingFromCountry');
    const sizeInput = document.getElementById('clothingSizeInput');
    const toCountrySelect = document.getElementById('clothingToCountry');
    const convertButton = document.getElementById('convertClothingSize');
    const resultSpan = document.getElementById('clothingSizeResult');

    // This is a highly simplified lookup. Real-world clothing conversion is complex!
    // You would need extensive data, often separate for each item type and gender.
    const clothingSizeMaps = {
        // Example: Women's Tops/Dresses (US, UK, EU, JP)
        'womens-top': {
            'US': {
                'XS': { 'UK': '6', 'EU': '34', 'JP': '5' },
                'S': { 'UK': '8', 'EU': '36', 'JP': '7' },
                'M': { 'UK': '10-12', 'EU': '38-40', 'JP': '9-11' },
                'L': { 'UK': '14-16', 'EU': '42-44', 'JP': '13-15' },
                'XL': { 'UK': '18', 'EU': '46', 'JP': '17' },
                '2': { 'UK': '6', 'EU': '34', 'JP': '5' },
                '4': { 'UK': '8', 'EU': '36', 'JP': '7' },
                '6': { 'UK': '10', 'EU': '38', 'JP': '9' },
                '8': { 'UK': '12', 'EU': '40', 'JP': '11' },
                '10': { 'UK': '14', 'EU': '42', 'JP': '13' },
                '12': { 'UK': '16', 'EU': '44', 'JP': '15' },
                '14': { 'UK': '18', 'EU': '46', 'JP': '17' },
                // Add more numeric US sizes here
            },
            'UK': {
                '6': { 'US': '2', 'EU': '34', 'JP': '5' },
                '8': { 'US': '4', 'EU': '36', 'JP': '7' },
                '10': { 'US': '6', 'EU': '38', 'JP': '9' },
                '12': { 'US': '8', 'EU': '40', 'JP': '11' },
                '14': { 'US': '10', 'EU': '42', 'JP': '13' },
                '16': { 'US': '12', 'EU': '44', 'JP': '15' },
                '18': { 'US': '14', 'EU': '46', 'JP': '17' },
            },
            'EU': {
                '34': { 'US': '2', 'UK': '6', 'JP': '5' },
                '36': { 'US': '4', 'UK': '8', 'JP': '7' },
                '38': { 'US': '6', 'UK': '10', 'JP': '9' },
                '40': { 'US': '8', 'UK': '12', 'JP': '11' },
                '42': { 'US': '10', 'UK': '14', 'JP': '13' },
                '44': { 'US': '12', 'UK': '16', 'JP': '15' },
                '46': { 'US': '14', 'UK': '18', 'JP': '17' },
            },
            'JP': {
                '5': { 'US': '2', 'UK': '6', 'EU': '34' },
                '7': { 'US': '4', 'UK': '8', 'EU': '36' },
                '9': { 'US': '6', 'UK': '10', 'EU': '38' },
                '11': { 'US': '8', 'UK': '12', 'EU': '40' },
                '13': { 'US': '10', 'UK': '14', 'EU': '42' },
                '15': { 'US': '12', 'UK': '16', 'EU': '44' },
                '17': { 'US': '14', 'UK': '18', 'EU': '46' },
            }
            // Add more countries/regions and sizes
        },
        // You'd need to add 'womens-bottom', 'mens-top', 'mens-bottom', 'kids'
        // with their respective complex size charts. This is just a starting point.
    };

    convertButton.addEventListener('click', () => {
        const clothingType = clothingTypeSelect.value;
        const fromCountry = fromCountrySelect.value;
        const toCountry = toCountrySelect.value;
        const inputSize = sizeInput.value.trim().toUpperCase(); // Normalize input

        resultSpan.textContent = ''; // Clear previous result

        if (!inputSize) {
            resultSpan.textContent = 'Please enter a size.';
            return;
        }

        if (fromCountry === toCountry) {
            resultSpan.textContent = `Already in ${fromCountry} size: ${inputSize}`;
            return;
        }

        const sizeMap = clothingSizeMaps[clothingType];

        if (!sizeMap) {
            resultSpan.textContent = 'Conversion data not available for this clothing type.';
            return;
        }
        if (!sizeMap[fromCountry]) {
            resultSpan.textContent = `Conversion from ${fromCountry} not available for this type.`;
            return;
        }

        const fromCountrySizes = sizeMap[fromCountry];
        if (fromCountrySizes[inputSize] && fromCountrySizes[inputSize][toCountry]) {
            resultSpan.textContent = `${inputSize} (${fromCountry}) is approximately ${fromCountrySizes[inputSize][toCountry]} (${toCountry}).`;
        } else {
            resultSpan.textContent = `Conversion from ${fromCountry} size ${inputSize} to ${toCountry} not found.`;
        }
    });
}

// --- Shoe Size Converter ---
function initShoeSizeConverter() {
    const shoeGenderSelect = document.getElementById('shoeGender');
    const fromCountrySelect = document.getElementById('shoeFromCountry');
    const sizeInput = document.getElementById('shoeSizeInput');
    const toCountrySelect = document.getElementById('shoeToCountry');
    const convertButton = document.getElementById('convertShoeSize');
    const resultSpan = document.getElementById('shoeSizeResult');

    // Simplified shoe size conversions. Real charts are detailed!
    // Data typically includes different scales (e.g., US men's, US women's, US kids', EU, UK, CM)
    const shoeSizeMaps = {
        'mens': {
            'US': { // US Men's to other systems
                '5': {'EU': '38', 'UK': '4.5', 'JP': '23', 'CM': '23.5'},
                '6': {'EU': '39', 'UK': '5.5', 'JP': '24', 'CM': '24.5'},
                '7': {'EU': '40', 'UK': '6.5', 'JP': '25', 'CM': '25.5'},
                '8': {'EU': '41', 'UK': '7.5', 'JP': '26', 'CM': '26.5'},
                '9': {'EU': '42', 'UK': '8.5', 'JP': '27', 'CM': '27.5'},
                '10': {'EU': '43', 'UK': '9.5', 'JP': '28', 'CM': '28.5'},
                '11': {'EU': '44', 'UK': '10.5', 'JP': '29', 'CM': '29.5'},
                '12': {'EU': '45', 'UK': '11.5', 'JP': '30', 'CM': '30.5'},
                // Add more sizes
            },
            'EU': { // EU Men's to other systems
                '38': {'US': '5', 'UK': '4.5', 'JP': '23', 'CM': '23.5'},
                '39': {'US': '6', 'UK': '5.5', 'JP': '24', 'CM': '24.5'},
                '40': {'US': '7', 'UK': '6.5', 'JP': '25', 'CM': '25.5'},
                '41': {'US': '8', 'UK': '7.5', 'JP': '26', 'CM': '26.5'},
                '42': {'US': '9', 'UK': '8.5', 'JP': '27', 'CM': '27.5'},
                '43': {'US': '10', 'UK': '9.5', 'JP': '28', 'CM': '28.5'},
                '44': {'US': '11', 'UK': '10.5', 'JP': '29', 'CM': '29.5'},
                '45': {'US': '12', 'UK': '11.5', 'JP': '30', 'CM': '30.5'},
                // Add more sizes
            },
            'UK': { // UK Men's to other systems
                '4.5': {'US': '5', 'EU': '38', 'JP': '23', 'CM': '23.5'},
                '5.5': {'US': '6', 'EU': '39', 'JP': '24', 'CM': '24.5'},
                '6.5': {'US': '7', 'EU': '40', 'JP': '25', 'CM': '25.5'},
                '7.5': {'US': '8', 'EU': '41', 'JP': '26', 'CM': '26.5'},
                '8.5': {'US': '9', 'EU': '42', 'JP': '27', 'CM': '27.5'},
                '9.5': {'US': '10', 'EU': '43', 'JP': '28', 'CM': '28.5'},
                '10.5': {'US': '11', 'EU': '44', 'JP': '29', 'CM': '29.5'},
                '11.5': {'US': '12', 'EU': '45', 'JP': '30', 'CM': '30.5'},
                // Add more sizes
            },
            'JP': { // JP Men's to other systems (JP is often in CM)
                '23': {'US': '5', 'UK': '4.5', 'EU': '38', 'CM': '23.5'},
                '24': {'US': '6', 'UK': '5.5', 'EU': '39', 'CM': '24.5'},
                '25': {'US': '7', 'UK': '6.5', 'EU': '40', 'CM': '25.5'},
                '26': {'US': '8', 'UK': '7.5', 'EU': '41', 'CM': '26.5'},
                '27': {'US': '9', 'UK': '8.5', 'EU': '42', 'CM': '27.5'},
                '28': {'US': '10', 'UK': '9.5', 'EU': '43', 'CM': '28.5'},
                '29': {'US': '11', 'UK': '10.5', 'EU': '44', 'CM': '29.5'},
                '30': {'US': '12', 'UK': '11.5', 'EU': '45', 'CM': '30.5'},
                // Add more sizes
            },
            'CM': { // Foot Length in CM to other systems
                '23.5': {'US': '5', 'UK': '4.5', 'EU': '38', 'JP': '23'},
                '24.5': {'US': '6', 'UK': '5.5', 'EU': '39', 'JP': '24'},
                '25.5': {'US': '7', 'UK': '6.5', 'EU': '40', 'JP': '25'},
                '26.5': {'US': '8', 'UK': '7.5', 'EU': '41', 'JP': '26'},
                '27.5': {'US': '9', 'UK': '8.5', 'EU': '42', 'JP': '27'},
                '28.5': {'US': '10', 'UK': '9.5', 'EU': '43', 'JP': '28'},
                '29.5': {'US': '11', 'UK': '10.5', 'EU': '44', 'JP': '29'},
                '30.5': {'US': '12', 'UK': '11.5', 'EU': '45', 'JP': '30'},
                // Add more sizes
            }
        },
        'womens': {
            'US': {
                '5': {'EU': '35', 'UK': '2.5', 'JP': '21', 'CM': '22'},
                '6': {'EU': '36', 'UK': '3.5', 'JP': '22', 'CM': '23'},
                '7': {'EU': '37', 'UK': '4.5', 'JP': '23', 'CM': '24'},
                '8': {'EU': '38', 'UK': '5.5', 'JP': '24', 'CM': '25'},
                '9': {'EU': '39-40', 'UK': '6.5', 'JP': '25', 'CM': '26'},
                '10': {'EU': '41', 'UK': '7.5', 'JP': '26', 'CM': '27'},
                // Add more sizes
            },
            'EU': {
                '35': {'US': '5', 'UK': '2.5', 'JP': '21', 'CM': '22'},
                '36': {'US': '6', 'UK': '3.5', 'JP': '22', 'CM': '23'},
                '37': {'US': '7', 'UK': '4.5', 'JP': '23', 'CM': '24'},
                '38': {'US': '8', 'UK': '5.5', 'JP': '24', 'CM': '25'},
                '39': {'US': '9', 'UK': '6.5', 'JP': '25', 'CM': '26'},
                '40': {'US': '9', 'UK': '6.5', 'JP': '25', 'CM': '26'}, // Overlap with 39
                '41': {'US': '10', 'UK': '7.5', 'JP': '26', 'CM': '27'},
                // Add more sizes
            },
            // ... add UK, JP, CM for women's similarly ...
        },
        'kids': {
            // Kids' sizes are even more complex, often by age group and region.
            // This would require a large dataset.
            // Example for US Toddler:
            'US': {
                '5C': {'EU': '21', 'UK': '4.5'},
                '6C': {'EU': '22', 'UK': '5.5'},
                '7C': {'EU': '23', 'UK': '6.5'},
                // ...
            }
        }
    };


    convertButton.addEventListener('click', () => {
        const gender = shoeGenderSelect.value;
        const fromCountry = fromCountrySelect.value;
        const toCountry = toCountrySelect.value;
        const inputSize = sizeInput.value.trim();

        resultSpan.textContent = ''; // Clear previous result

        if (!inputSize) {
            resultSpan.textContent = 'Please enter a size.';
            return;
        }

        if (fromCountry === toCountry) {
            resultSpan.textContent = `Already in ${fromCountry} size: ${inputSize}`;
            return;
        }

        const genderMap = shoeSizeMaps[gender];
        if (!genderMap) {
            resultSpan.textContent = 'Conversion data not available for this gender.';
            return;
        }
        if (!genderMap[fromCountry]) {
            resultSpan.textContent = `Conversion from ${fromCountry} not available for ${gender}.`;
            return;
        }

        const fromCountrySizes = genderMap[fromCountry];
        // For shoe sizes, sometimes numbers are floats (e.g., US 7.5, UK 6.5)
        // Ensure the lookup key matches the map.
        let convertedSize = fromCountrySizes[inputSize];
        if (!convertedSize) {
            // Try parsing as float if it's a number and the direct string lookup failed
            const floatInput = parseFloat(inputSize);
            if (!isNaN(floatInput) && fromCountrySizes[floatInput.toString()]) {
                convertedSize = fromCountrySizes[floatInput.toString()];
            } else if (!isNaN(floatInput) && fromCountrySizes[inputSize]) { // Handle cases like "7.0"
                 convertedSize = fromCountrySizes[inputSize];
            }
        }


        if (convertedSize && convertedSize[toCountry]) {
            resultSpan.textContent = `${inputSize} (${fromCountry}, ${gender}'s) is approximately ${convertedSize[toCountry]} (${toCountry}).`;
        } else {
            resultSpan.textContent = `Conversion from ${fromCountry} size ${inputSize} to ${toCountry} not found for ${gender}.`;
        }
    });
}