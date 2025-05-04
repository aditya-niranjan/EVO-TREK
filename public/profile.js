/**
 * Profile Page JavaScript
 * Handles password update form submission and confirmation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get the password update form
    const passwordForm = document.getElementById('passwordForm');

    // Add event listener for form submission
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(e) {
            // Show confirmation dialog
            if (!confirm('Are you sure you want to update your password? You will need to log in again.')) {
                e.preventDefault(); // Prevent form submission if user cancels
                return false;
            }

            // Validate passwords
            const oldPassword = passwordForm.querySelector('input[name="oldPassword"]').value;
            const newPassword = passwordForm.querySelector('input[name="newPassword"]').value;

            if (!oldPassword || !newPassword) {
                alert('Please enter both old and new passwords.');
                e.preventDefault();
                return false;
            }

            if (newPassword.length < 6) {
                alert('New password must be at least 6 characters long.');
                e.preventDefault();
                return false;
            }

            // If all validations pass, the form will submit normally
            return true;
        });
    }

    // Handle order history
    const clearHistoryBtn = document.querySelector('.clear-history-btn');
    if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener('click', function(e) {
            if (!confirm('Are you sure you want to clear your order history? This action cannot be undone.')) {
                e.preventDefault();
            }
        });
    }
});