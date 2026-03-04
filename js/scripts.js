WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight
BODY = document.getElementsByTagName('body')[0]


document.addEventListener('DOMContentLoaded', function() {
	// Page links slider
	const pageLinksSliders = [],
		pageLinks = document.querySelectorAll('.page_links .swiper')

	pageLinks.forEach((el, i) => {
		el.classList.add('page_links_s' + i)

		const swiper = new Swiper('.page_links_s' + i, {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			spaceBetween: 40,
			slidesPerView: 'auto',
		})

		pageLinksSliders.push(swiper)

		$(el).find('.swiper-slide').click(function () {
			swiper.slideTo($(this).index(), 500)
		})
	})


	// Portfolio slider
	const portfolioSliders = [],
		portfolio = document.querySelectorAll('.portfolio .swiper')

	portfolio.forEach((el, i) => {
		el.classList.add('portfolio_s' + i)

		let options = {
			loop: true,
			loopAdditionalSlides: 1,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			lazy: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			slidesPerView: 1,
			breakpoints: {
				0: {
					spaceBetween: 5
				},
				768: {
					spaceBetween: 20
				}
			},
		}

		portfolioSliders.push(new Swiper('.portfolio_s' + i, options))
	})


	// Portfolio data tabs slider
	const portfolioDataTabsSliders = [],
		portfolioDataTabs = document.querySelectorAll('.portfolio_data .swiper')

	portfolioDataTabs.forEach((el, i) => {
		el.classList.add('portfolio_data_s' + i)

		const swiper = new Swiper('.portfolio_data_s' + i, {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			spaceBetween: 40,
			slidesPerView: 'auto',
		})

		portfolioDataTabsSliders.push(swiper)

		$(el).find('.swiper-slide').click(function () {
			swiper.slideTo($(this).index(), 500)
		})
	})


	// Fancybox
	const fancyOptions = {
		dragToClose: false,
		placeFocusBack: false,
		l10n: {
			CLOSE: 'Закрыть',
			NEXT: 'Следующий',
			PREV: 'Предыдущий',
			MODAL: 'Вы можете закрыть это модальное окно нажав клавишу ESC'
		},
		tpl: {
			closeButton: '<button data-fancybox-close class="f-button is-close-btn" title="{{CLOSE}}"><svg><use xlink:href="images/sprite.svg#ic_close"></use></svg></button>',

			main: `<div class="fancybox__container" role="dialog" aria-modal="true" aria-label="{{MODAL}}" tabindex="-1">
				<div class="fancybox__backdrop"></div>
				<div class="fancybox__carousel"></div>
				<div class="fancybox__footer"></div>
			</div>`,
		}
	}


	// Modals
	$('.modal_btn').click(function(e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show(
			[{
				src: `#${e.target.getAttribute('data-modal')}`,
				type: 'inline'
			}],
			fancyOptions
		)
	})


	$('.modal .close_btn').click(function(e) {
		e.preventDefault()

		Fancybox.close()
	})


	// Zoom images
	Fancybox.bind('.fancy_img', {
		...fancyOptions,
		Image: {
			zoom: false
		},
		Thumbs: {
			autoStart: false
		}
	})


	// Mob. menu
	$('.mob_header .mob_menu_btn, .mob_menu .close_btn').click((e) => {
		e.preventDefault()

		$('.mob_header .mob_menu_btn').toggleClass('active')
		$('body').toggleClass('lock')
		$('.mob_menu').toggleClass('show')
	})


	// Phone input mask
	const phoneInputs = document.querySelectorAll('input[type=tel]')

	if (phoneInputs) {
		phoneInputs.forEach(el => {
			IMask(el, {
				mask: '+{7} (000) 000-00-00',
				lazy: true
			})
		})
	}


	// Directions
	$('.directions .section .name').click(function(e) {
		e.preventDefault()

		const section = $(this).closest('.section')

		if (!section.hasClass('open')) {
			$('.directions .section').removeClass('open')

			section.addClass('open')
		}
	})


	// Tabs
	var locationHash = window.location.hash

	$('body').on('click', '.tabs .btn', function(e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			let parent = $(this).closest('.tabs_container'),
				activeTab = $(this).data('content'),
				activeTabContent = $(activeTab),
				level = $(this).data('level')

			parent.find('.tabs:first .btn').removeClass('active')
			parent.find('.tab_content.' + level).removeClass('active')

			$(this).addClass('active')
			activeTabContent.addClass('active')
		}
	})

	if (locationHash && $('.tabs_container').length) {
		let activeTab = $(`.tabs button[data-content="${locationHash}"]`),
			activeTabContent = $(locationHash),
			parent = activeTab.closest('.tabs_container'),
			level = activeTab.data('level')

		parent.find('.tabs:first .btn').removeClass('active')
		parent.find('.tab_content.' + level).removeClass('active')

		activeTab.addClass('active')
		activeTabContent.addClass('active')

		$('html, body').stop().animate({ scrollTop: $activeTabContent.offset().top }, 1000)
	}


	// Accordion
	$('body').on('click', '.accordion .accordion_item .head', function(e) {
		e.preventDefault()

		let item = $(this).closest('.accordion_item'),
			accordion = $(this).closest('.accordion')

		if (item.hasClass('active')) {
			item.removeClass('active').find('.data').slideUp(300)
		} else {
			accordion.find('.accordion_item').removeClass('active')
			accordion.find('.data').slideUp(300)

			item.addClass('active').find('.data').slideDown(300)
		}
	})


	// Mob. header
	mobHeader = document.querySelector('.mob_header')


	// Change quantity
	$('body').on('click', '.amount .minus', function (e) {
		e.preventDefault()

		const $parent = $(this).closest('.amount'),
			$input = $parent.find('.input'),
			inputVal = parseFloat($input.val()),
			minimum = parseFloat($input.data('minimum')),
			step = parseFloat($input.data('step')),
			unit = $input.data('unit')

		if (inputVal > minimum) $input.val(inputVal - step + unit)
	})

	$('body').on('click', '.amount .plus', function (e) {
		e.preventDefault()

		const $parent = $(this).closest('.amount'),
			$input = $parent.find('.input'),
			inputVal = parseFloat($input.val()),
			maximum = parseFloat($input.data('maximum')),
			step = parseFloat($input.data('step')),
			unit = $input.data('unit')

		if (inputVal < maximum) $input.val(inputVal + step + unit)
	})

	$('.amount .input').keydown(function () {
		const _self = $(this),
			maximum = parseInt(_self.data('maximum'))

		setTimeout(() => {
			if (_self.val() == '' || _self.val() == 0) _self.val(parseInt(_self.data('minimum')))
			if (_self.val() > maximum) _self.val(maximum)
		})
	})


	// Quiz
	var currentStep = 1

	$('#quiz_modal .next_btn').click(function(e) {
		e.preventDefault()

		const step = $(this).closest('.step')

		step.hide()

		currentStep++

		$('#quiz_modal .step' + currentStep).fadeIn(300)
	})

	$('#quiz_modal .prev_btn').click(function(e) {
		e.preventDefault()

		const step = $(this).closest('.step')

		step.hide()

		currentStep = currentStep - 1

		$('#quiz_modal .step' + currentStep).fadeIn(300)
	})


	if (is_touch_device()) {
		const subMenus = document.querySelectorAll('header .menu .sub')

		// Submenu on the touch screen
		$('header .menu .item > a.sub_link').click(function (e) {
			const dropdown = $(this).next()

			if (dropdown.css('visibility') === 'hidden') {
				e.preventDefault()

				subMenus.forEach(el => el.classList.remove('show'))
				dropdown.addClass('show')

				BODY.style = 'cursor: pointer;'
			}
		})

		// Close the submenu when clicking outside it
		document.addEventListener('click', e => {
			if ($(e.target).closest('.menu').length === 0) {
				subMenus.forEach(el => el.classList.remove('show'))

				BODY.style = 'cursor: default;'
			}
		})
	}
})



window.addEventListener('scroll', function () {
	// Mob. header
	window.scrollY > 0
		? mobHeader.classList.add('fixed')
		: mobHeader.classList.remove('fixed')
})



window.addEventListener('resize', function () {
	WH = window.innerHeight || document.clientHeight || BODY.clientHeight

	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Overwrite window width
		WW = window.innerWidth || document.clientWidth || BODY.clientWidth


		// Mob. version
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 390) document.getElementsByTagName('meta')['viewport'].content = 'width=390, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}
	}
})