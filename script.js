document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const urlInput = document.getElementById('url');
    const descInput = document.getElementById('description');
    const resultArea = document.getElementById('result-area');
    const qrContainer = document.getElementById('qrcode');
    const resultDesc = document.getElementById('result-desc');
    const resultLink = document.getElementById('result-link');

    let qrcode = null;

    generateBtn.addEventListener('click', () => {
        const url = urlInput.value.trim();
        const description = descInput.value.trim();

        if (!url) {
            alert('URL을 입력해주세요!');
            urlInput.focus();
            return;
        }

        // Show result area
        resultArea.classList.remove('hidden');

        // Clear previous QR
        qrContainer.innerHTML = '';

        // Generate QR
        // Using qrcode.js library
        qrcode = new QRCode(qrContainer, {
            text: url,
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        // Update text
        resultDesc.textContent = description || '나만의 QR 코드';
        resultLink.textContent = url;

        // Scroll to result
        resultArea.scrollIntoView({ behavior: 'smooth' });
    });

    // Allow Enter key to trigger generation
    urlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            generateBtn.click();
        }
    });

    descInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            generateBtn.click();
        }
    });
});
