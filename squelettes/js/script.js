
// ===============================================================
// DOCUMENT READY INIT
// ===============================================================

window.addEventListener('load', function(){

    // ===============================================================
    // NAV
    // ===============================================================
    let navIsOpen = false;

    function initNav(){
        const nav = document.querySelector('.js-nav');
        let y = window.scrollY;

        if (y > 100) {
            nav.classList.add('over');
        };

        window.addEventListener('scroll', function(evt){
            if (window.scrollY > y && window.scrollY > 100 && nav.classList.contains('inactive') === false) {
                nav.classList.add('inactive');
                nav.classList.remove('over');
            };
            if (window.scrollY < y && nav.classList.contains('inactive') === true) {
                nav.classList.remove('inactive');
                nav.classList.add('over');
            };
            if (window.scrollY == 0) {
                nav.classList.remove('over');
            };
            y = window.scrollY;
        });

        document.querySelector('.js-burger').onclick = function(e){
            e.preventDefault();
            toggleNav();
        };

    }; initNav();

    function toggleNav(){
        const body = document.querySelector('body');
        const menu = document.querySelector('.js-menu');
        const burger = document.querySelector('.js-burger');

        if (navIsOpen === false) {
            body.classList.add('menu-is-open');
            menu.classList.add('open');
            burger.classList.remove('inactif');
            burger.classList.add('active');
            navIsOpen = true;
        }else{
            body.classList.remove('menu-is-open');
            menu.classList.remove('open');
            burger.classList.remove('active');
            burger.classList.add('inactif');
            navIsOpen = false;
        };
    };
    
});
