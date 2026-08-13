document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form');
    const phoneInput = form.querySelector('input[name="tel"]');
    const nameInput = form.querySelector('input[name="name"]');
    const emailInput = form.querySelector('input[name="email"]');
    const politicsCheckbox = form.querySelector('input[name="politick"]');
    const newsCheckbox = form.querySelector('input[name="news"]');

    // Маска телефона

    phoneInput.addEventListener('focus', function () {
        if (!this.value) {
            this.value = '+7 ';
            setTimeout(() => {
                this.setSelectionRange(
                    this.value.length,
                    this.value.length
                );
            }, 0);
        }
    });

    phoneInput.addEventListener('input', function () {
        let value = this.value;
        let digits = value.replace(/\D/g, '');

        if (digits.startsWith('8')) {
            digits = '7' + digits.slice(1);
        }

        if (digits.startsWith('7')) {
            digits = digits.slice(1);
        }

        digits = digits.slice(0, 10);

        this.value = formatPhone(digits);
    });


    function formatPhone(digits) {
        let result = '+7';

        if (digits.length > 0) {
            result += ' (' + digits.slice(0, 3);
        }

        if (digits.length >= 3) {
            result += ') ' + digits.slice(3, 6);
        }

        if (digits.length >= 6) {
            result += '-' + digits.slice(6, 8);
        }

        if (digits.length >= 8) {
            result += '-' + digits.slice(8, 10);
        }

        return result;
    }

    phoneInput.addEventListener('keydown', function (e) {
        const allowedKeys = [
            'Backspace',
            'Delete',
            'ArrowLeft',
            'ArrowRight',
            'ArrowUp',
            'ArrowDown',
            'Home',
            'End',
            'Tab'
        ];

        if (
            allowedKeys.includes(e.key) ||
            e.ctrlKey ||
            e.metaKey
        ) {
            return;
        }

        if (!/^\d$/.test(e.key)) {
            e.preventDefault();
        }
    });

    phoneInput.addEventListener('blur', function () {
        const digits = this.value.replace(/\D/g, '');

        if (digits.length !== 11) {
            this.value = '';
        }
    });


    // Удаление ошибки при вводе
    [nameInput, phoneInput, emailInput].forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('is-err');
        });
    });


    politicsCheckbox.addEventListener('change', () => {
        politicsCheckbox
            .closest('.checkbox-label')
            .classList.remove('is-err');
    });


    // Показ ошибки
    function showError(input) {
        input.classList.add('is-err');
    }


    // Проверка имени

    function validateName() {
        const value = nameInput.value.trim();

        if (value.length < 2) {
            showError(nameInput);
            return false;
        }

        return true;
    }


    // Проверка телефона

    function validatePhone() {
        const digits = phoneInput.value.replace(/\D/g, '');

        if (
            digits.length !== 11 ||
            !digits.startsWith('7')
        ) {
            showError(phoneInput);
            return false;
        }

        return true;
    }


    // Проверка email

    function validateEmail() {
        const value = emailInput.value.trim();

        const emailRegex =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(value)) {
            showError(emailInput);
            return false;
        }

        return true;
    }


    // Проверка согласия

    function validatePolitics() {
        if (!politicsCheckbox.checked) {
            politicsCheckbox
                .closest('.checkbox-label')
                .classList.add('is-err');

            return false;
        }

        return true;
    }


    // Submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const isNameValid = validateName();
        const isPhoneValid = validatePhone();
        const isEmailValid = validateEmail();
        const isPoliticsValid = validatePolitics();

        if (
            isNameValid &&
            isPhoneValid &&
            isEmailValid &&
            isPoliticsValid
        ) {
            const formData = {
                name: nameInput.value.trim(),
                phone: phoneInput.value.trim(),
                email: emailInput.value.trim(),
                politics: politicsCheckbox.checked,
                news: newsCheckbox.checked
            };

            alert('форма отправлена')
            console.log('Данные формы:', formData);

            

            nameInput.value = '';
            phoneInput.value = '';
            emailInput.value = '';

            politicsCheckbox.checked = false;
            newsCheckbox.checked = false;

            nameInput.classList.remove('is-err');
            phoneInput.classList.remove('is-err');
            emailInput.classList.remove('is-err');

            politicsCheckbox
                .closest('.checkbox-label')
                .classList.remove('is-err');

            newsCheckbox
                .closest('.checkbox-label')
                .classList.remove('is-err');
        }
    });
});