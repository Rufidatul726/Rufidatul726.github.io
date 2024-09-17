// script.js

document.addEventListener('DOMContentLoaded', function () {  // When the page is loaded
    var elements = document.querySelectorAll('.txt-rotate');
    let hamberger = document.querySelector(".hamberger");
    let times = document.querySelector('.times');
    let mobileNav = document.querySelector('.mobile-nav');
    let navLinks = document.querySelectorAll('.nav-link');
    
    for (var i = 0; i < elements.length; i++) {
        var toRotate = JSON.parse(elements[i].getAttribute('data-rotate'));
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], toRotate, period);
        }
    }

    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css); 

    hamberger.addEventListener('click', function () {
        mobileNav.classList.add('open');
    });

    times.addEventListener('click', function () {
        mobileNav.classList.remove('open');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            mobileNav.classList.remove('open');
        });
    });
});

var TxtRotate = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
        delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

$(document).ready(function () {
    $('.slide-wrapper').slick({
        arrows: false,
        dots: true,
        appendDots: '.slider-dot',
        dotsClass: 'dots',
    });
});


function scrollToSection(sectionId) {
    var section = document.getElementById(sectionId);

    section.scrollIntoView({ behavior: 'smooth' });
}