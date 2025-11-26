document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const resultArea = document.getElementById('result-area');
    const qrContainer = document.getElementById('qrcode');
    const resultDesc = document.getElementById('result-desc');
    const resultLink = document.getElementById('result-link');

    // Tabs
    const tabs = document.querySelectorAll('.tab-btn');
    const forms = {
        link: document.getElementById('form-link'),
        wifi: document.getElementById('form-wifi'),
        contact: document.getElementById('form-contact')
    };
    let currentTab = 'link';

    // Tab Switching Logic
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update Tab UI
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update Form Visibility
            currentTab = tab.dataset.tab;
            Object.values(forms).forEach(f => f.classList.add('hidden'));
            forms[currentTab].classList.remove('hidden');

            // Hide result area when switching tabs
            resultArea.classList.add('hidden');
        });
    });

    let qrcode = null;

    generateBtn.addEventListener('click', () => {
        let qrText = '';
        let displayDesc = '';
        let displaySub = '';

        // Logic based on current tab
        if (currentTab === 'link') {
            const url = document.getElementById('url').value.trim();
            const desc = document.getElementById('description').value.trim();

            if (!url) {
                alert('URL을 입력해주세요!');
                return;
            }
            qrText = url;
            displayDesc = desc || '나만의 링크 QR';
            displaySub = url;

        } else if (currentTab === 'wifi') {
            const ssid = document.getElementById('wifi-ssid').value.trim();
            const pw = document.getElementById('wifi-pw').value.trim();

            if (!ssid) {
                alert('와이파이 이름을 입력해주세요!');
                return;
            }
            // WiFi QR Format: WIFI:T:WPA;S:MyNetwork;P:MyPassword;;
            qrText = `WIFI:T:WPA;S:${ssid};P:${pw};;`;
            displayDesc = `WiFi: ${ssid}`;
            displaySub = '와이파이 자동 연결';

        } else if (currentTab === 'contact') {
            const name = document.getElementById('contact-name').value.trim();
            const phone = document.getElementById('contact-phone').value.trim();
            const email = document.getElementById('contact-email').value.trim();

            if (!name || !phone) {
                alert('이름과 전화번호를 입력해주세요!');
                return;
            }
            // vCard Format
            qrText = `BEGIN:VCARD\nVERSION:3.0\nN:${name}\nTEL:${phone}\nEMAIL:${email}\nEND:VCARD`;
            displayDesc = `명함: ${name}`;
            displaySub = phone;
        }

        // Show result area
        resultArea.classList.remove('hidden');

        // Clear previous QR
        qrContainer.innerHTML = '';

        // Generate QR
        qrcode = new QRCode(qrContainer, {
            text: qrText,
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        // Update text
        resultDesc.textContent = displayDesc;
        resultLink.textContent = displaySub;

        // Scroll to result
        resultArea.scrollIntoView({ behavior: 'smooth' });
    });
});
