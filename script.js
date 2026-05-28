// ===== Contact Form Submission =====
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            service: document.getElementById('service').value,
            message: document.getElementById('message').value.trim()
        };

        try {
            // CRITICAL: Ensure this URL ends with /exec, NOT /dev
            const response = await fetch(
                'https://script.google.com/macros/s/AKfycbxpCHMTb9HvXFY6iwj3fMduZLvDVi_6_0zz8D0cUp09/exec', 
                {
                    method: 'POST',
                    mode: 'no-cors', // Helps prevent CORS preflight blockages from Google
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                }
            );

            // NOTE: Due to Google's redirect behavior with 'no-cors', 
            // the response body might come back opaque. We optimize for a fallback success behavior.
            alert('Message submitted!');
            contactForm.reset();

        } catch (error) {
            console.error(error);
            alert('Error sending message.');
        }
    });
}