export function formValidation(form, usernameInput, emailInput, passwordInput, dateInput) {
    let form = document.querySelector('#register-form');
    let emailInput = document.querySelector('#email');
    let passwordInput = document.querySelector('#password');





    function validateForm() {
        let isValidEmail = validateEmail();
        let isValidPassword = validatePassword();
        return isValidEmail && isValidPassword;
    }
    function showErrorMessage(input, message) {
        let container = input.parentElement; // The .input-wrapper

        // Remove an existing error
        let error = container.querySelector('.error-message');
        if (error) {
            container.removeChild(error);
        }

        // Now add the error if the message isn’t empty
        if (message) {
            let error = document.createElement('div');
            error.classList.add('error-message');
            error.innerText = message;
            container.appendChild(error);
        }
    }


    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Do not submit to the server
        if (validateForm()) {
            alert('Success!');
        }
    })
}