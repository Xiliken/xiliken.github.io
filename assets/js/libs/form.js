/**
 * Работа с масками ввода 
 */

 
 
 /** 
  * Валидация формы
  */
 const validateForm = function() {
     const contactForm = document.querySelector('.contact-form');
     const validation = new JustValidate('.contact-form');
     const phoneMask = contactForm.querySelector('input[type="tel"]');
 
     const inputMask = new Inputmask('+7 (999) 999-99-99');
 
     inputMask.mask(phoneMask);
 
     validation
         .addField('.input-phone', 
         [
             {
                rule: 'required',
                value: true,
                errorMessage: () => {
                    showMessage('error', 'Введите телефон')
                }
             },
             {
                 rule: 'function',
                 validator: function() 
                 {
                    const phone = phoneMask.inputmask.unmaskedvalue();
                    return phone.length === 10;
                 },
                 errorMessage: () => {
                    showMessage('error', 'Введите корректный номер телефона')
                 }
             },
     ])
         .addField('.input-name', 
         [
             {
             rule: 'required',
             value: true,
             errorMessage: () => {
                 showMessage('error', 'Введите имя')
             }
             },
            {
                rule: 'minLength',
                value: 3,
                errorMessage: () => {
                    showMessage('error', 'Имя не может быть короче 3-х символов')
                }
            },
            {
                rule: 'maxLength',
                value: 30,
                errorMessage: () => {
                    showMessage('error', 'Имя не может быть длиннее 30 символов')
                }
            },
     ])
         .addField('.input-message', 
         [
             {
             rule: 'required',
             value: true,
             errorMessage: () => {
                 showMessage('error', 'Введите сообщение')
             }
         },
         {
             rule: 'minLength',
             value: 20,
             errorMessage: () => {
                 showMessage('error', 'Сообщение не может быть короче 20 символов')
             }
         },
         {
             rule: 'maxLength',
             value: 300,
             errorMessage: () => {
                 showMessage('error', 'Сообщение не может быть длиннее 300 символов')
             }
         },
     ])
        .onSuccess((event) => {
            let formData = new FormData(event.target)
    
            let xhr = new XMLHttpRequest();
    
            xhr.onreadystatechange = () => {
                if(xhr.readyState === 4) 
                {
                    if(xhr.status === 200)
                    {
                        showMessage('success', 'Сообщение отправлено');
                        console.log('Отправлено')
                    }
                }
            }
            xhr.open('POST', 'mail.php', true);
            xhr.send(formData);

            event.target.reset();
        })
 
 }

 validateForm();
 
 /** 
  * Сообщение на формах
  */
 
 function showMessage(type = 'success',title, position = 'top-end', timer = 1500)
 {
    const message = Swal.mixin({
         toast: true,
         position: position,
         showConfirmButton: false,
         timer: timer,
         timerProgressBar: true,
     })
 
     message.fire({
         icon: type,
         title: title
     })
 }
