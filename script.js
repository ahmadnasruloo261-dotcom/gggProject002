// ===== Contact Form Submission =====
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Package data as standard URL form parameters
        const formData = new URLSearchParams();
        formData.append('name', document.getElementById('name').value.trim());
        formData.append('email', document.getElementById('email').value.trim());
        formData.append('service', document.getElementById('service').value);
        formData.append('message', document.getElementById('message').value.trim());

        try {
            // CRITICAL: Ensure this URL ends with /exec, NOT /dev
            await fetch(
                'https://script.google.com/macros/s/AKfycbxpCHMTb9HvXFY6iwj3fMduZLvDVi_6_0zz8D0cUp09/exec', 
                {
                    method: 'POST',
                    mode: 'no-cors', // <-- FIX: Prevents the browser from blocking the submission
                    body: formData,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            );

            // Note: In 'no-cors' mode, JS cannot read the response body back from Google.
            // If the fetch didn't throw a network failure, the data sent successfully!
            alert('Message sent successfully!');
            contactForm.reset();

        } catch (error) {
            console.error('Submission Error:', error);
            alert('Error sending message.');
        }
    });
}