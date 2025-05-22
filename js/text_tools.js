// --- Word/Character Counter ---
function initWordCharacterCounter() {
    const textToCount = document.getElementById('textToCount');
    const wordCountSpan = document.getElementById('wordCount');
    const charCountSpacesSpan = document.getElementById('charCountSpaces');
    const charCountNoSpacesSpan = document.getElementById('charCountNoSpaces');
    const sentenceCountSpan = document.getElementById('sentenceCount');
    const paragraphCountSpan = document.getElementById('paragraphCount');

    function updateCounts() {
        const text = textToCount.value;

        // Characters (with spaces)
        charCountSpacesSpan.textContent = text.length;

        // Characters (no spaces)
        charCountNoSpacesSpan.textContent = text.replace(/\s/g, '').length;

        // Words
        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        wordCountSpan.textContent = words.length;

        // Sentences (basic approach: ends with ., ?, ! followed by space or end of string)
        const sentences = text.trim().split(/[.!?]+\s*/).filter(sentence => sentence.length > 0);
        sentenceCountSpan.textContent = sentences.length;

        // Paragraphs (basic: delimited by two or more newlines)
        const paragraphs = text.split(/\n\s*\n/).filter(paragraph => paragraph.trim().length > 0);
        paragraphCountSpan.textContent = paragraphs.length;
    }

    textToCount.addEventListener('input', updateCounts);

    // Initial count when the tool is loaded
    updateCounts();
}

// --- Case Converter ---
function initCaseConverter() {
    const input = document.getElementById('caseConverterInput');
    const output = document.getElementById('caseConverterOutput');
    const buttons = document.querySelectorAll('.tool-section .btn[data-case]');
    const copyButton = document.getElementById('copyConvertedText');

    function convertText(type) {
        let text = input.value;
        let converted = '';

        switch (type) {
            case 'uppercase':
                converted = text.toUpperCase();
                break;
            case 'lowercase':
                converted = text.toLowerCase();
                break;
            case 'capitalize':
                converted = text.toLowerCase().split(' ').map(word => {
                    return word.charAt(0).toUpperCase() + word.slice(1);
                }).join(' ');
                break;
            case 'sentence':
                converted = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
                break;
            case 'toggle':
                converted = text.split('').map(char => {
                    if (char === char.toUpperCase()) {
                        return char.toLowerCase();
                    }
                    return char.toUpperCase();
                }).join('');
                break;
            case 'alternating':
                converted = text.split('').map((char, index) => {
                    if (char === ' ') return ' '; // Preserve spaces
                    return index % 2 === 0 ? char.toLowerCase() : char.toUpperCase();
                }).join('');
                break;
            case 'clear':
                input.value = '';
                converted = '';
                break;
        }
        output.value = converted;
    }

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            convertText(e.target.dataset.case);
        });
    });

    copyButton.addEventListener('click', () => {
        output.select();
        output.setSelectionRange(0, 99999); // For mobile devices
        document.execCommand('copy');
        alert('Copied to clipboard!');
    });

    // Automatically convert on input change if an output exists
    input.addEventListener('input', () => {
        // This is a bit tricky: if a conversion was just done, we don't want to auto-reconvert
        // unless the user types more. A common approach is to only update on button click
        // for case conversion, or to have a default live preview.
        // For now, it only updates when a button is clicked.
    });
}

// --- JSON Formatter & Validator ---
function initJsonFormatterValidator() {
    const jsonInput = document.getElementById('jsonInput');
    const jsonOutput = document.getElementById('jsonOutput');
    const formatButton = document.getElementById('formatJson');
    const validateButton = document.getElementById('validateJson');
    const copyButton = document.getElementById('copyJsonOutput');
    const jsonStatusDiv = document.getElementById('jsonStatus');

    function formatAndValidateJson(validateOnly = false) {
        const inputText = jsonInput.value.trim();
        jsonStatusDiv.classList.remove('alert-success', 'alert-danger', 'd-block');
        jsonStatusDiv.classList.add('d-none');
        jsonStatusDiv.textContent = '';
        jsonOutput.value = '';

        if (!inputText) {
            jsonStatusDiv.textContent = 'Input is empty.';
            jsonStatusDiv.classList.remove('d-none');
            jsonStatusDiv.classList.add('alert-warning', 'd-block');
            return;
        }

        try {
            const parsedJson = JSON.parse(inputText);
            if (!validateOnly) {
                jsonOutput.value = JSON.stringify(parsedJson, null, 2); // Indent with 2 spaces
            }
            jsonStatusDiv.textContent = 'JSON is valid!';
            jsonStatusDiv.classList.remove('d-none');
            jsonStatusDiv.classList.add('alert-success', 'd-block');
        } catch (e) {
            jsonStatusDiv.textContent = `Invalid JSON: ${e.message}`;
            jsonStatusDiv.classList.remove('d-none');
            jsonStatusDiv.classList.add('alert-danger', 'd-block');
        }
    }

    formatButton.addEventListener('click', () => formatAndValidateJson(false));
    validateButton.addEventListener('click', () => formatAndValidateJson(true));
    jsonInput.addEventListener('input', () => {
        // Clear previous output/status on new input
        jsonOutput.value = '';
        jsonStatusDiv.classList.remove('alert-success', 'alert-danger', 'alert-warning', 'd-block');
        jsonStatusDiv.classList.add('d-none');
        jsonStatusDiv.textContent = '';
    });

    copyButton.addEventListener('click', () => {
        if (jsonOutput.value) {
            jsonOutput.select();
            jsonOutput.setSelectionRange(0, 99999);
            document.execCommand('copy');
            alert('Copied formatted JSON to clipboard!');
        } else {
            alert('No formatted JSON to copy.');
        }
    });
}


// --- URL Encoder / Decoder ---
function initUrlEncoderDecoder() {
    const urlInput = document.getElementById('urlInput');
    const urlOutput = document.getElementById('urlOutput');
    const encodeButton = document.getElementById('encodeUrl');
    const decodeButton = document.getElementById('decodeUrl');
    const copyButton = document.getElementById('copyUrlOutput');

    encodeButton.addEventListener('click', () => {
        urlOutput.value = encodeURIComponent(urlInput.value);
    });

    decodeButton.addEventListener('click', () => {
        try {
            urlOutput.value = decodeURIComponent(urlInput.value);
        } catch (e) {
            urlOutput.value = `Error decoding: ${e.message}`;
        }
    });

    copyButton.addEventListener('click', () => {
        if (urlOutput.value) {
            urlOutput.select();
            urlOutput.setSelectionRange(0, 99999);
            document.execCommand('copy');
            alert('Copied to clipboard!');
        } else {
            alert('No output to copy.');
        }
    });
}


// --- Text Diff Tool ---
function initTextDiffTool() {
    const originalTextarea = document.getElementById('originalText');
    const newTextarea = document.getElementById('newText');
    const compareButton = document.getElementById('compareTexts');
    const diffOutputDiv = document.getElementById('diffOutput');

    compareButton.addEventListener('click', () => {
        const original = originalTextarea.value;
        const edited = newTextarea.value;

        // Basic character-by-character diff (simplified)
        // For a true, robust line-by-line or word-by-word diff,
        // a dedicated library like 'diff-match-patch' is recommended.
        // This example only highlights additions/removals if one string contains the other.

        // For a more meaningful diff, consider a line-by-line comparison:
        const originalLines = original.split('\n');
        const newLines = edited.split('\n');

        let htmlDiff = '';
        let i = 0, j = 0;

        while (i < originalLines.length || j < newLines.length) {
            if (i < originalLines.length && j < newLines.length && originalLines[i] === newLines[j]) {
                htmlDiff += `<div>${escapeHtml(originalLines[i])}</div>`; // Same line
                i++;
                j++;
            } else {
                if (i < originalLines.length) {
                    htmlDiff += `<div style="color: red;">- ${escapeHtml(originalLines[i])}</div>`; // Removed
                    i++;
                }
                if (j < newLines.length) {
                    htmlDiff += `<div style="color: green;">+ ${escapeHtml(newLines[j])}</div>`; // Added
                    j++;
                }
            }
        }

        if (original === "" && edited === "") {
            diffOutputDiv.innerHTML = "Enter text to compare.";
        } else if (original === edited) {
            diffOutputDiv.innerHTML = "Texts are identical.";
        } else {
            diffOutputDiv.innerHTML = htmlDiff || "No common differences found (try line-by-line changes for better results).";
        }
    });

    function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    }
}

// --- Simple Note Pad (already exists, keep it) ---
function initSimpleNotepad() {
    const notepadTextarea = document.getElementById('notepadText');
    const saveButton = document.getElementById('saveNote');
    const localStorageKey = 'ultimateUtilityHubNotepad';

    // Load saved note on initialization
    const savedNote = localStorage.getItem(localStorageKey);
    if (savedNote) {
        notepadTextarea.value = savedNote;
    }

    // Save note automatically on input
    notepadTextarea.addEventListener('input', () => {
        localStorage.setItem(localStorageKey, notepadTextarea.value);
    });

    // Optionally add a save button click listener (though input event is more direct)
    saveButton.addEventListener('click', () => {
        localStorage.setItem(localStorageKey, notepadTextarea.value);
        alert('Note saved!');
    });
}