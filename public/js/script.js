const phoneInput = document.getElementById('phone');
const submitButton = document.getElementById('submit-btn');
const phoneError = document.getElementById('phone-error');

        // Add event listener to phone input
        phoneInput.addEventListener('input', (event) => {
            const phoneValue = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters

            // Check if phone number is exactly 10 digits
            if (phoneValue.length === 10) {
                submitButton.disabled = false; 
                phoneError.style.display = 'none';
            } else {
                submitButton.disabled = true; 
                phoneError.style.display = 'block'; 
            }

            // Update the input value with only digits
            event.target.value = phoneValue;
        });

