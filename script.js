// script.js
document.addEventListener('DOMContentLoaded', () => {
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    const subscribeBtn = document.getElementById('subscribeBtn');
    const newsletterEmail = document.getElementById('newsletterEmail');

    learnMoreBtn.addEventListener('click', () => {
        // Add your "Learn More" button functionality here
        // For example, you could scroll to a specific section or open a new page
        alert("Learn More clicked!"); // Placeholder
    });

    subscribeBtn.addEventListener('click', () => {
        const email = newsletterEmail.value;
        if (isValidEmail(email)) {
            // Here, you would typically send the email to your server
            // For demonstration, we'll just show an alert
            alert(`Subscribed with email: ${email}`);
            newsletterEmail.value = ''; // Clear the input field
        } else {
            alert("Please enter a valid email address.");
        }
    });

    function isValidEmail(email) {
        // Basic email validation using a regular expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});