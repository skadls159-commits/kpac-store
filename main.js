document.addEventListener('DOMContentLoaded', function () {
  // mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
      toggle.textContent = links.classList.contains('open') ? '✕' : '☰';
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.textContent = '☰';
      });
    });
  }

  // scroll reveal
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && items.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // header shadow on scroll
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 8) header.style.boxShadow = '0 8px 24px rgba(11,17,48,.08)';
      else header.style.boxShadow = 'none';
    });
  }

  // number count-up
  var counters = document.querySelectorAll('.count-up');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-target')) || 0;
    var decimals = parseInt(el.getAttribute('data-decimals'), 10) || 0;
    var format = function (v) {
      return decimals > 0
        ? v.toFixed(decimals)
        : Math.round(v).toLocaleString('ko-KR');
    };
    if (reduceMotion) { el.textContent = format(target); return; }
    var duration = 1400;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = eased * target;
      el.textContent = format(value);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = format(target);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window && counters.length) {
    var cIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          animateCount(e.target);
          cIo.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { cIo.observe(el); });
  } else {
    counters.forEach(function (el) { el.textContent = el.getAttribute('data-target'); });
  }

  // 실시간 공고 카테고리 필터
  var chips = document.querySelectorAll('.bizfeed-chip');
  var cards = document.querySelectorAll('.bizfeed-card');
  if (chips.length && cards.length) {
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        var cat = chip.getAttribute('data-cat');
        cards.forEach(function (card) {
          var show = cat === 'all' || card.getAttribute('data-cat') === cat;
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }
});
