const menuBtn = document.querySelector('.menu-btn');
const navlist = document.querySelector('.nav-list');
const phoneNumber = document.querySelector('.phone').querySelector('a');




/**
 * Конфигурация Swiper
 */
const swiper = new Swiper('.swiper', {
    spaceBetween: 30,
    breakpoints:
    {
        320:
        {
            spaceBetween: 300,
            slidesPerView: 1
        }
    },
    centeredSlides: true,
    autoplay: {
        delay: 7500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    loop: true,
});

/**
 * Яндекс карты
 */
function mapsInit() {
    const mapKrsk = new ymaps.Map('map-krsk', {
        center: [56.019661,92.86239],
        zoom: 16
    });
    const placemarkKrsk = new ymaps.Placemark([56.019661,92.86239], {
        balloonContentHeader: 'AVTORITET',
        balloonContent: `
            <div class="balloon">
                    <span>Режим работы</span>
                    <ul class="balloon-info-list">
                        <li class="balloon-info-list-item">ПН - ПТ 10:00 - 19:00</li>
                        <li class="balloon-info-list-item">СБ 10:00 - 16:00</li>
                        <li class="balloon-info-list-item">ВС - Выходной</li>
                    </ul>
                    <br>
                    <p>Телефон: 7 (913) 445 90 85</p>
            </div>
        `,
    }, {
        preset: 'islands#darkOrangeDotIcon'
    })

	mapKrsk.controls.remove('geolocationControl'); // удаляем геолокацию
    mapKrsk.controls.remove('searchControl'); // удаляем поиск
    mapKrsk.controls.remove('trafficControl'); // удаляем контроль трафика
    mapKrsk.controls.remove('typeSelector'); // удаляем тип
    mapKrsk.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
    mapKrsk.controls.remove('zoomControl'); // удаляем контрол зуммирования
    mapKrsk.controls.remove('rulerControl'); // удаляем контрол правил

    mapKrsk.geoObjects.add(placemarkKrsk);

    const mapAbakan = new ymaps.Map('map-abakan', {
        center: [53.751947,91.405772],
        zoom: 16
    });
    const placemarkAbakan = new ymaps.Placemark([53.751947,91.405772], {
        balloonContentHeader: 'AVTORITET',
        balloonContent: `
            <div class="balloon">
                    <span>Режим работы</span>
                    <ul class="balloon-info-list">
                        <li class="balloon-info-list-item">ПН - СБ 10:00 - 18:00</li>
                        <li class="balloon-info-list-item">ВС - Выходной</li>
                    </ul>
                    <br>
                    <p>Телефон: 7 (902) 012 80 64</p>
            </div>
        `
    }, {
        preset: 'islands#darkOrangeDotIcon'
    })

    mapAbakan.controls.remove('geolocationControl'); // удаляем геолокацию
    mapAbakan.controls.remove('searchControl'); // удаляем поиск
    mapAbakan.controls.remove('trafficControl'); // удаляем контроль трафика
    mapAbakan.controls.remove('typeSelector'); // удаляем тип
    mapAbakan.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
    mapAbakan.controls.remove('zoomControl'); // удаляем контрол зуммирования
    mapAbakan.controls.remove('rulerControl'); // удаляем контрол правил

    mapAbakan.geoObjects.add(placemarkAbakan);
}

const geo = document.querySelector('.geo');


/**
 * Табы
 */
const tab = function () {
    let tabNav = document.querySelectorAll('.tabs-nav-item'),
        tabContent = document.querySelectorAll('.tab'),
        tabName;

    tabNav.forEach(item => {
        item.addEventListener('click', selectTabNav)
    })

    function selectTabNav () 
    {
        tabNav.forEach(item => {
            item.classList.remove('active')
        })
        this.classList.add('active')
        tabName = this.dataset.tabName;
        selectTabContent(tabName);
        
    }

    function selectTabContent(tabName)
    {
        tabContent.forEach(item => {
            item.classList.contains(tabName) ? item.classList.add('active') : item.classList.remove('active')
        })
    }

}


/**
 * Геолокация
 */

geo.addEventListener('click', async function(e) {

    e.preventDefault()

   const { value: formValues } = await Swal.fire({
        html: `
            <h2>Выберите город:</h2>
            <ul class="cities-list">
                <li class="cities-list-item">
                    <a href="#" id="krasnoyarsk" class="link">Красноярск</a>
                </li>
                <li class="cities-list-item">
                    <a href="#" id="abakan" class="link">Абакан</a>
                </li>
                <li class="cities-list-item">
                    <a href="#" id="moscow" class="link">Москва</a>
                </li>         
                <li class="cities-list-item">
                    <a href="#" id="zelenogorsk" class="link">Зеленогорск</a>
                </li>
                <li class="cities-list-item">
                    <a href="#" id="novosibirsk" class="link">Новосибирск</a>
                </li>
                <li class="cities-list-item">
                    <a href="#" id="omsk" class="link">Омск</a>
                </li>
                <li class="cities-list-item">
                    <a href="#" id="tomsk" class="link">Томск</a>
                </li>
                <li class="cities-list-item">
                    <a href="#" id="volgograd" class="link">Волгоград</a>
                </li>
            </ul>
        `,
        showConfirmButton: false,
        focusConfirm: false,
        showCloseButton: true,
        timerProgressBar: false,
        showLoaderOnConfirm: false,
        didOpen: () => {
            const cities = document.querySelector('.cities-list');
            const geoData = document.querySelector('.geo-desc').querySelector('span');
            const phoneInfo = document.querySelector('.phone-info');
            const phoneNumber = document.querySelector('.phone').querySelector('a');

            cities.addEventListener('click', (e) => {
                e.preventDefault()

                if(e.target.classList.contains('link'))
                {
                    const cityName = e.target.textContent;

                    switch(e.target.id)
                    {
                        case 'abakan':
                            geoData.innerHTML = `Абакан`;
                            phoneInfo.innerHTML = 'Абакан';
                            phoneNumber.innerHTML = '+7 (902) 012 80 64';
                            Swal.close();
                            break;
                        case 'krasnoyarsk':
                            geoData.innerHTML = `Красноярск`;
                            phoneInfo.innerHTML = 'Красноярск';
                            phoneNumber.innerHTML = '+7 (913) 445 90 85';   
                            Swal.close();
                            break;
                        default:
                            geoData.innerHTML = cityName;
                            phoneInfo.innerHTML = cityName;
                            phoneNumber.innerHTML = '+7 (913) 445 90 85';
                            Swal.close();
                            break;
                    }
                }
                
            })
        }
    },)
})



/**
 * Модальное окно с доставкой 
 */
 const deliveryModalInit = (e) =>
 {
     const link = document.querySelector('.nav-item-delivery');
 
     link.addEventListener('click', (e) => {
         e.preventDefault();
         Swal.fire({
             html: `
             <section class="delivery-section">
             <div class="section-title">
                 <h1>Оплата</h1>
                 <span>Информация об оплате</span>
             </div>
     
             <div class="container-center">
                 <ul class="pay-methods">
                    <li class="pay-method-item">
                        <i class="fas fa-money-check-alt"></i>
                        <span>На расчетный счет организации от физических и юридических лиц</span>
                    </li>
                    <li class="pay-method-item">
                        <img src="assets/img/sber-logo.svg">
                        <span>На карту сбербанка</span>
                    </li>
                 </ul>
            </div> <!-- Container End -->

            <div class="container-center">
                <div class="section-title">
                    <h1>Доставка</h1>
                    <span>Информация о доставке</span>                    <span class="danger">Важно!</span>
                    Возможна оплата по факту предоставления фото отправленных запчастей в транспортной компании с предоставлением накладной (увы, все мы живем в это время)
                </p>
            </div>
  
            
            <div class="container-center">
                <div class="section-title">
                    <h1>Гарантии</h1>
                    <span>Информация о гарантиях</span>
                </div>

                <p class="payment-content">
                    <ul class="garant-list">
                        <li>На сложные агрегаты (ДВС КПП)</li>
                            <ul>
                                <li>при установке у нас - <span class="danger">6 месяцев</span></li>
                                <li>при установке в сторонних сервисах - <span class="danger">1 месяц</span></li>
                            </ul>
                        <li>Кузовные детали - <span class="danger">2 недели</span></li>
                    </ul>
                </p>
            </div>         
         </section> 
             `,
             showCloseButton: true,
             showConfirmButton: false,
             backdrop: true,
             width: 1000,
             showCloseButton: true,
             showConfirmButton: false,
             backdrop: true,
             width: 1000,
         });
     })
 }

 /**
 * Меню
 */

menuBtn.addEventListener('click', function() {
    this.classList.toggle('active');
    navlist.classList.toggle('active');
})


/**
 * Инициализация подсказок
 */
tippy('#viber', {
    content: 'Написать в Viber'
})

tippy('#whatsapp', {
    content: 'Написать в WhatsApp'
})


/**
 * Инициализация
 */


window.onload = () => {
    deliveryModalInit();
    tab();
    AOS.init();
}

ymaps.ready(mapsInit);




