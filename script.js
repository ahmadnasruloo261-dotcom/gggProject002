// ===== Contact Form Submission =====
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // 1. Package data as standard URL form parameters instead of JSON
        const formData = new URLSearchParams();
        formData.append('name', document.getElementById('name').value.trim());
        formData.append('email', document.getElementById('email').value.trim());
        formData.append('service', document.getElementById('service').value);
        formData.append('message', document.getElementById('message').value.trim());

        try {
            // Make sure this URL ends with /exec
            const response = await fetch(
                'https://script.google.com/macros/s/AKfycbxpCHMTb9HvXFY6iwj3fMduZLvDVi_6_0zz8D0cUp09/exec', 
                {
                    method: 'POST',
                    body: formData, // Sending URL-encoded text format
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            );

            const result = await response.json();

            if (result.success) {
                alert('Message sent successfully!');
                contactForm.reset();
            } else {
                alert('Something went wrong: ' + result.message);
            }

        } catch (error) {
            console.error(error);
            alert('Error sending message.');
        }
    });
}