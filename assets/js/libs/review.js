/**
 * Отзывы
 */
 const addReview = document.querySelector('.add-review-btn');


 addReview.addEventListener('click',async function (e) {
    e.preventDefault()

    const { value: formValues } = await Swal.fire({
        title: 'Оставить отзыв',
        html: 
        `
        <input type="text" class="swal2-input" id="name" placeholder="Имя и фамилия" required>
        
        <input type="url" class="swal2-input" id="vkurl" placeholder="Страница в Vk" required>
        <textarea class="swal2-textarea" placeholder="Введите текст отзыва" id="review-content" required></textarea>
        <div class="rating-header"><span>Рейтинг</span></div>
        <div class="rating-area">
            <input type="radio" id="star-5" name="rating" value="5">
            <label for="star-5" title="Оценка «5»"></label>	
            <input type="radio" id="star-4" name="rating" value="4">
            <label for="star-4" title="Оценка «4»"></label>    
            <input type="radio" id="star-3" name="rating" value="3">
            <label for="star-3" title="Оценка «3»"></label>  
            <input type="radio" id="star-2" name="rating" value="2">
            <label for="star-2" title="Оценка «2»"></label>    
            <input type="radio" id="star-1" name="rating" value="1" checked>
            <label for="star-1" title="Оценка «1»"></label>
        </div>
        `,
        focusConfirm: false, 
        inputAutoTrim: true,
        confirmButtonText: 'Добавить отзыв',
        showCloseButton: true,
        preConfirm: () => {
            return new Promise((resolve) => {
                const formValues = [
                    document.getElementById('name').value,
                    document.getElementById('vkurl').value,
                    document.getElementById('review-content').value,
                ]
                
                if(formValues[0].replace(/\s/g,"") == "" || formValues[1].replace(/\s/g,"") == "" || formValues[2].replace(/\s/g,"") == "")
                {
                    Swal.showValidationMessage('Заполните все поля')
                    resolve()
                } else {
                    Swal.isVisible()
                    Swal.fire({
                        icon: 'success',
                        title: 'Отзыв отправлен!',
                        text: 'Отзыв успешно отправлен на модердацию! После проверки модерации, отзыв будет опубликован на сайте.'
                    })
                    e.target.style.display = 'none'
                    localStorage.setItem('isReviewSend', true)
                }
            })
        },
    })
})

if(localStorage.getItem('isReviewSend') !== null) {
            
    const addReview = document.querySelector('.add-review-btn');

    addReview.style.display = 'none'
}

