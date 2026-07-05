/* ============================================================
   HOTEL 1954 — Shared interactions
   Loaded on every page (root-relative /assets/script.js)
   ============================================================ */
(function () {
  'use strict';

  var WA_NUMBER = '923181444007'; // WhatsApp booking line

  document.addEventListener('DOMContentLoaded', function () {

    /* ---- Base path (works at any root: domain root OR /repo/ on GitHub Pages) ---- */
    var cssRef = document.querySelector('link[rel="stylesheet"][href*="styles.css"]');
    var BASE = cssRef ? cssRef.getAttribute('href').replace(/assets\/styles\.css.*$/, '') : '';

    /* ---- Announcement promo bar (ticker 1, fixed at very top) ---- */
    (function () {
      var items = [
        { i: 'fa-mug-hot', t: 'Complimentary Kashmiri breakfast with every stay' },
        { i: 'fa-calendar-check', t: 'Free cancellation up to 24 hours before arrival' },
        { i: 'fa-water', t: 'River-view rooms now open for the season' },
        { i: 'fa-tags', t: 'Book direct for our very best rate' },
        { i: 'fa-mountain-sun', t: 'Guided Neelum Valley tours arranged on request' }
      ];
      var html = items.map(function (a) {
        return '<span class="ticker-item"><i class="fa-solid ' + a.i + '"></i> ' + a.t +
               '<span class="diamond"><i class="fa-solid fa-gem"></i></span></span>';
      }).join('');
      var bar = document.createElement('div');
      bar.id = 'promo-bar';
      bar.innerHTML = '<div class="ticker ticker--left">' + html + html + '</div>';
      document.body.insertBefore(bar, document.body.firstChild);
      document.body.classList.add('has-promo');
    })();

    /* ---- Second ticker (in-flow strip before footer, opposite direction) ---- */
    (function () {
      var footer = document.getElementById('site-footer');
      if (!footer) return;
      var msgs = ['20+ Rooms & Suites', 'Neelum River & Mountain Views', 'Daily Breakfast Included',
                  '24-Hour Front Desk', 'CCTV Secured & Private Parking', 'Family Friendly Since 2016',
                  'Private Balcony in Every Room'];
      var html = msgs.map(function (m) {
        return '<span class="ticker-item"><i class="fa-solid fa-gem"></i> ' + m + '</span>';
      }).join('');
      var strip = document.createElement('div');
      strip.className = 'ticker-strip';
      strip.innerHTML = '<div class="ticker ticker--right">' + html + html + '</div>';
      footer.parentNode.insertBefore(strip, footer);
    })();

    /* ---- Floating gift / offers button ---- */
    (function () {
      var g = document.createElement('a');
      g.id = 'gift-fab';
      g.href = BASE + 'booking/';
      g.setAttribute('aria-label', 'View seasonal offers');
      g.innerHTML = '<span class="gift-ic"><i class="fa-solid fa-gift"></i></span> Seasonal Offers';
      document.body.appendChild(g);
    })();

    /* ---- Reviews marquee: duplicate row content for a seamless loop ---- */
    document.querySelectorAll('.reviews-row').forEach(function (row) {
      row.innerHTML += row.innerHTML;
    });

    /* ---- Loading screen -------------------------------------- */
    var loader = document.getElementById('loading-screen');
    if (loader) {
      window.addEventListener('load', function () {
        setTimeout(function () { loader.classList.add('is-hidden'); }, 500);
      });
      // Safety fallback
      setTimeout(function () { loader.classList.add('is-hidden'); }, 2600);
    }

    /* ---- Header scroll state --------------------------------- */
    var header = document.getElementById('site-header');
    var hasHero = document.body.classList.contains('has-hero');
    function updateHeader() {
      if (!header) return;
      if (!hasHero) { header.classList.add('header--solid'); header.classList.remove('header--top'); return; }
      if (window.scrollY > 40) {
        header.classList.add('header--solid');
        header.classList.remove('header--top');
      } else {
        header.classList.add('header--top');
        header.classList.remove('header--solid');
      }
    }
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });

    /* ---- Mobile menu ----------------------------------------- */
    var navToggle = document.getElementById('nav-toggle');
    var mobileMenu = document.getElementById('mobile-menu');
    if (navToggle && mobileMenu) {
      navToggle.addEventListener('click', function () {
        var open = mobileMenu.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        document.body.classList.toggle('menu-open', open);
      });
      mobileMenu.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          mobileMenu.classList.remove('is-open');
          navToggle.setAttribute('aria-expanded', 'false');
          document.body.classList.remove('menu-open');
        });
      });
    }

    /* ---- Reveal on scroll ------------------------------------ */
    var reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && reveals.length) {
      var ro = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('is-visible'); ro.unobserve(e.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
      reveals.forEach(function (el) { ro.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add('is-visible'); });
    }

    /* ---- Counter animation ----------------------------------- */
    var counters = document.querySelectorAll('.stat__num[data-target]');
    function animate(el) {
      var target = parseFloat(el.getAttribute('data-target'));
      var suffix = el.getAttribute('data-suffix') || '';
      var dur = 1700, start = null;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        var val = Math.round(eased * target);
        el.innerHTML = val + (suffix ? '<span class="stat__suffix">' + suffix + '</span>' : '');
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    if ('IntersectionObserver' in window && counters.length) {
      var co = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { animate(e.target); co.unobserve(e.target); } });
      }, { threshold: 0.5 });
      counters.forEach(function (c) { co.observe(c); });
    }

    /* ---- Testimonial slider ---------------------------------- */
    var slides = document.querySelectorAll('.testimonial');
    var dotsWrap = document.getElementById('testimonial-dots');
    if (slides.length) {
      var current = 0, timer;
      if (dotsWrap) {
        slides.forEach(function (_, i) {
          var d = document.createElement('button');
          d.className = 'testimonial-dot' + (i === 0 ? ' is-active' : '');
          d.setAttribute('aria-label', 'Testimonial ' + (i + 1));
          d.addEventListener('click', function () { go(i); reset(); });
          dotsWrap.appendChild(d);
        });
      }
      var dots = dotsWrap ? dotsWrap.querySelectorAll('.testimonial-dot') : [];
      function go(n) {
        slides[current].classList.remove('is-active');
        if (dots[current]) dots[current].classList.remove('is-active');
        current = (n + slides.length) % slides.length;
        slides[current].classList.add('is-active');
        if (dots[current]) dots[current].classList.add('is-active');
      }
      function reset() { clearInterval(timer); timer = setInterval(function () { go(current + 1); }, 6000); }
      reset();
    }

    /* ---- Booking search bar (home hero) ---------------------- */
    var bookingBar = document.getElementById('booking-bar');
    if (bookingBar) {
      bookingBar.addEventListener('submit', function (e) {
        e.preventDefault();
        var params = new URLSearchParams();
        var ci = document.getElementById('bb-checkin');
        var co2 = document.getElementById('bb-checkout');
        var g = document.getElementById('bb-guests');
        var r = document.getElementById('bb-room');
        if (ci && ci.value) params.set('checkin', ci.value);
        if (co2 && co2.value) params.set('checkout', co2.value);
        if (g && g.value) params.set('guests', g.value);
        if (r && r.value) params.set('room', r.value);
        window.location.href = BASE + 'booking/?' + params.toString();
      });
    }

    /* ---- Date inputs: min = today ---------------------------- */
    var today = new Date().toISOString().split('T')[0];
    document.querySelectorAll('input[type="date"]').forEach(function (d) {
      if (!d.getAttribute('min')) d.setAttribute('min', today);
    });

    /* ---- Prefill booking form from query params -------------- */
    var bookingForm = document.getElementById('booking-form');
    if (bookingForm && window.location.search) {
      var q = new URLSearchParams(window.location.search);
      var map = { checkin: 'booking-date', checkout: 'booking-checkout', guests: 'booking-guests', room: 'booking-room' };
      Object.keys(map).forEach(function (key) {
        var field = document.getElementById(map[key]);
        var val = q.get(key);
        if (field && val) {
          field.value = val;
          // If select has no matching option, ignore silently
        }
      });
    }

    /* ---- Booking form -> WhatsApp ---------------------------- */
    if (bookingForm) {
      bookingForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var required = bookingForm.querySelectorAll('[required]');
        var ok = true;
        required.forEach(function (f) {
          var field = f.closest('.form-field');
          if (!f.value.trim()) { if (field) field.classList.add('form-field--error'); ok = false; }
          else if (field) field.classList.remove('form-field--error');
        });
        if (!ok) return;
        var val = function (id) { var el = document.getElementById(id); return el ? el.value : ''; };
        var msg = 'Hello Hotel 1954, I would like to reserve a room.%0A%0A'
          + 'Name: ' + encodeURIComponent(val('booking-name')) + '%0A'
          + 'Email: ' + encodeURIComponent(val('booking-email')) + '%0A'
          + 'Phone: ' + encodeURIComponent(val('booking-phone')) + '%0A'
          + 'Room: ' + encodeURIComponent(val('booking-room')) + '%0A'
          + 'Guests: ' + encodeURIComponent(val('booking-guests')) + '%0A'
          + 'Check-in: ' + encodeURIComponent(val('booking-date')) + '%0A'
          + 'Check-out: ' + encodeURIComponent(val('booking-checkout'));
        window.open('https://wa.me/' + WA_NUMBER + '?text=' + msg, '_blank');
        showFormSuccess(bookingForm);
      });
    }

    /* ---- Contact form -> WhatsApp ---------------------------- */
    var contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var val = function (id) { var el = document.getElementById(id); return el ? el.value : ''; };
        var msg = 'Hello Hotel 1954,%0A%0A'
          + 'Name: ' + encodeURIComponent(val('contact-name')) + '%0A'
          + 'Phone: ' + encodeURIComponent(val('contact-phone')) + '%0A'
          + 'Email: ' + encodeURIComponent(val('contact-email')) + '%0A%0A'
          + 'Message: ' + encodeURIComponent(val('contact-message'));
        window.open('https://wa.me/' + WA_NUMBER + '?text=' + msg, '_blank');
        showFormSuccess(contactForm);
      });
    }

    function showFormSuccess(form) {
      var s = form.querySelector('.form-success');
      if (s) { s.classList.add('show'); }
      var btn = form.querySelector('button[type="submit"]');
      if (btn) { var t = btn.innerHTML; btn.innerHTML = '<i class="fa-solid fa-check"></i> Opening WhatsApp…'; setTimeout(function () { btn.innerHTML = t; }, 3000); }
      setTimeout(function () { form.reset(); if (s) s.classList.remove('show'); }, 4000);
    }

    /* ---- Newsletter ------------------------------------------ */
    var news = document.getElementById('newsletter-form');
    if (news) {
      news.addEventListener('submit', function (e) {
        e.preventDefault();
        var note = news.parentNode.querySelector('.newsletter__note');
        if (note) { note.textContent = 'Thank you — you are now on the Hotel 1954 list.'; note.style.color = 'var(--gold-dark)'; }
        news.reset();
      });
    }

    /* ---- WhatsApp widget ------------------------------------- */
    var waFab = document.getElementById('wa-fab');
    var waPopup = document.getElementById('wa-popup');
    var waClose = document.getElementById('wa-close');
    if (waFab && waPopup) {
      waFab.addEventListener('click', function () { waPopup.classList.toggle('open'); });
      if (waClose) waClose.addEventListener('click', function () { waPopup.classList.remove('open'); });
      if (window.innerWidth > 768) {
        setTimeout(function () { waPopup.classList.add('open'); }, 4500);
      }
    }

    /* ---- Back to top ----------------------------------------- */
    var backTop = document.getElementById('back-to-top');
    if (backTop) {
      window.addEventListener('scroll', function () {
        backTop.classList.toggle('is-visible', window.scrollY > 600);
      }, { passive: true });
      backTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    }

    /* ---- Footer year ----------------------------------------- */
    var yr = document.getElementById('footer-year');
    if (yr) yr.textContent = new Date().getFullYear();

  });
})();
