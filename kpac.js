(function(){
  document.documentElement.classList.add('js');
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var header=document.querySelector('.header'),hero=document.querySelector('.hero'),prog=document.getElementById('prog');
  var toggle=document.querySelector('.nav-toggle');
  if(toggle)toggle.addEventListener('click',function(){var o=document.body.classList.toggle('nav-open');toggle.setAttribute('aria-expanded',o);toggle.setAttribute('aria-label',o?'메뉴 닫기':'메뉴 열기');frame()});
  document.querySelectorAll('#mMenu a').forEach(function(a){a.addEventListener('click',function(){document.body.classList.remove('nav-open')})});
  var bg=document.querySelector('.hero-bg'),mBar=document.getElementById('mBar');
  function frame(){var y=window.scrollY,h=document.documentElement.scrollHeight-window.innerHeight;
    if(header){header.classList.toggle('scrolled',y>8);header.classList.toggle('dark',!!hero&&y<hero.offsetHeight-header.offsetHeight&&!document.body.classList.contains('nav-open'))}
    if(prog)prog.style.transform='scaleX('+(h>0?Math.min(y/h,1):0)+')';
    if(bg&&!reduce&&y<1400)bg.style.setProperty('--hy',(y*0.3).toFixed(1)+'px');
    if(mBar&&hero)mBar.classList.toggle('show',y>hero.offsetHeight*0.5);
  }
  var t=false;window.addEventListener('scroll',function(){if(!t){t=true;requestAnimationFrame(function(){t=false;frame()})}},{passive:true});window.addEventListener('resize',frame);frame();
  var rv=document.querySelectorAll('.reveal,.line-in');
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.08,rootMargin:'0px 0px -40px 0px'});rv.forEach(function(el){io.observe(el)})}else rv.forEach(function(el){el.classList.add('in')});
  document.querySelectorAll('.count').forEach(function(el){var to=+el.getAttribute('data-to');if(reduce||!('IntersectionObserver' in window))return;el.textContent='0';var o=new IntersectionObserver(function(es){if(!es[0].isIntersecting)return;o.disconnect();var s=null;(function st(ts){if(!s)s=ts;var p=Math.min((ts-s)/1300,1);el.textContent=Math.round((1-Math.pow(1-p,3))*to).toLocaleString('ko-KR');if(p<1)requestAnimationFrame(st)})(performance.now())},{threshold:.5});o.observe(el)});
  var jumps=document.querySelectorAll('.jump a');
  if(jumps.length&&'IntersectionObserver' in window){var jo=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){jumps.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-40% 0px -55% 0px'});jumps.forEach(function(a){var s=document.querySelector(a.getAttribute('href'));if(s)jo.observe(s)})}
  document.addEventListener('click',function(e){var a=e.target.closest('a[href^="#"]');if(!a)return;var id=a.getAttribute('href');if(id.length<2)return;var el=document.querySelector(id);if(!el)return;e.preventDefault();window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY-(window.innerWidth<=768?120:136),behavior:reduce?'auto':'smooth'});history.replaceState(null,'',id)});
  var lb=document.getElementById('lb');
  if(lb){document.querySelectorAll('[data-full]').forEach(function(b){b.addEventListener('click',function(){lb.querySelector('img').src=b.getAttribute('data-full');lb.querySelector('img').alt=b.getAttribute('data-alt')||'';lb.classList.add('on')})});lb.addEventListener('click',function(){lb.classList.remove('on')});document.addEventListener('keydown',function(e){if(e.key==='Escape')lb.classList.remove('on')})}
})();