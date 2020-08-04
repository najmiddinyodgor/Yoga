window.addEventListener('DOMContentLoaded', function (evt) {
	
	'use strict'

	// Tab


	let infoBtn = document.querySelectorAll('.info-header-tab'),
		info = document.querySelector('.info-header'),
		infoContent = document.querySelectorAll('.info-tabcontent');

	function hideTabContent(a) {
		for (let i = a; i < infoContent.length; i++) {
			infoContent[i].classList.remove('show');
			infoContent[i].classList.add('hide');
		}
	};

	function showTabContent(a) {
		if (infoContent[a].classList.contains('hide')) {
			infoContent[a].classList.remove('hide');
			infoContent[a].classList.add('show');
		}
	};


	hideTabContent(1);


	info.addEventListener('click', function(evt) {
		let target = evt.target;

		if (target && target.classList.contains('info-header-tab')) {
			for (let i = 0; i < infoBtn.length; i++) {
				if (target == infoBtn[i]) {
					hideTabContent(0);
					showTabContent(i);
					break;
				}
			};
		}
	});

	// ----------------------------

	// Timer

	let deadline = '2020-09-5';

	function getTimeRemaining (endtime) {
		let t = Date.parse(endtime) - Date.parse(new Date());
		
		let seconds = Math.floor((t/1000) % 60),
			minutes = Math.floor((t/1000/60) % 60),
			hours = Math.floor(t/(1000*60*60));

		return {
			'total': t,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		}
	};

	function setClock (id, endtime) {
		
		let timer = document.getElementById(id),
			hours = document.querySelector('.hours'),
			minutes = document.querySelector('.minutes'),
			seconds = document.querySelector('.seconds'),
			timeInterval = setInterval(updateClock, 1000);

		function updateClock() {
			let t = getTimeRemaining(endtime);

			t.hours < 10 ? hours.textContent = '0' + t.hours : hours.textContent = t.hours;
			t.minutes < 10 ? minutes.textContent = '0' + t.minutes : minutes.textContent = t.minutes;
			t.seconds < 10 ? seconds.textContent = '0' + t.seconds : seconds.textContent = t.seconds;

			if (t.total == 0) {
				clearInterval(timeInterval);
			}

		}
	};

	setClock(timer, deadline);

	// --------------------------------

	// Modal

	let moreBtn = document.querySelector('.more'),
		closeBtn = document.querySelector('.popup-close'),
		modal = document.querySelector('.overlay');

	moreBtn.addEventListener('click', function(evt) {
		modal.style.display = 'block';
		document.body.style.overflow = 'hidden';
	});

	closeBtn.addEventListener('click', function(evt) {
		modal.style.display = 'none';
		document.body.style.overflow = '';
	});

	// -------------------------------

	// ModalForm

	let message = {
		loading: "Загрузка...",
		succes: "Спасибо! С вами скоро свяжемся",
		failure: "Что-то пошло не так..."
	};

	let modalForm = document.querySelector('.main-form'),
		modalInput = modalForm.getElementsByTagName('input'),
		statusMessage = document.createElement('span');

	statusMessage.classList.add('status');

	modalForm.addEventListener('submit', function(evt) {
		evt.preventDefault();

		this.appendChild(statusMessage);

		let request = new XMLHttpRequest();
		request.open('POST', 'server.php');
		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		// request.setRequestHeader('Content-Type', 'application/json; charset/utf-8');

		let formData = new FormData(form);

		// let obj = {};
		// formData.forEach((value, key) => {
		// 	obj[key] = value;
		// })
		// let json = JSON.stringify(obj);
		// request.send(json);

		request.send(formData);

		request.addEventListener('readystatechange', function() {
			if (this.readyState < 4) {
				statusMessage.textContent = message.loading;
			} else if (this.readyState === 4 && this.status === 200) {
				statusMessage.textContent = message.succes;
			} else {
				statusMessage.textContent = message.failure;
			}
		});

		for (let i = 0; i < modalInput.length; i++) {
			modalInput[i].value = "";
		}
	});

	// ------------------------------

	// Slider

	let slides = document.querySelectorAll('.slider-item'),
		prevBtn = document.querySelector('.prev'),
		nextBtn = document.querySelector('.next'),
		dotsWrap = document.querySelector('.slider-dots'),
		dots = document.querySelectorAll('.dot');


	let slideIndex = 1;

	function showSlide(n) {
		if (n > slides.length) {
			slideIndex = 1;
		}

		if (n < 1) {
			slideIndex = slides.length;
		}

		slides.forEach( (item) => item.style.display = 'none');
		dots.forEach( (item) => item.classList.remove('dot-active'));

		slides[slideIndex - 1].style.display = 'block';
		dots[slideIndex - 1].classList.add('dot-active');		
	}

	function plusSlide(n) {
		showSlide(slideIndex += n);
	}

	function currentSlide(n) {
		showSlide(slideIndex = n);
	}

	dotsWrap.addEventListener('click', function(evt){
		let target = evt.target;

		for (let i = 0; i < dots.length + 1; i++) {
			if (target.classList.contains('dot') && dots[i - 1] == target) {
				currentSlide(i);
			}
		}
	});

	prevBtn.addEventListener('click', () => {
		plusSlide(-1);
	});

	nextBtn.addEventListener('click', () => {
		plusSlide(1);
	});

	showSlide(slideIndex);

	// ------------------------------

	// Calculator 

	let peopleInput = document.querySelectorAll('.counter-block-input')[0],
		daysInput = document.querySelectorAll('.counter-block-input')[1],
		countrysInput = document.querySelector('#select'),
		totalInput = document.querySelector('.counter-total'),

		peopleSum = 0,
		daysSum = 0,
		total = 0;

		totalInput.innerHTML = '0';

	peopleInput.addEventListener('change', function() {
		 peopleSum = +this.value;
		 total = (peopleSum + daysSum)*16;

		 if (daysInput.value == '' || peopleSum == 0) {
		 	totalInput.innerHTML = '0';
		 } else {
		 	totalInput.innerHTML = total;
		 }
	});

	daysInput.addEventListener('change', function() {
		 daysSum = +this.value;
		 total = (peopleSum + daysSum)*16;

		 if (peopleInput.value == '' || daysSum == 0) {
		 	totalInput.innerHTML = '0';
		 } else {
		 	totalInput.innerHTML = total;
		 }
	});


	countrysInput.addEventListener('change', function() {
		if (daysInput.value == '' || peopleInput == '') {
			totalInput.innerHTML = '0';
		} else {
			let t = total;
			totalInput.innerHTML = t * (this.options[this.selectedIndex].value);
		}
	});

	// --------------------------

	// ContactForm

	let contactForm = document.querySelector('#form');
});