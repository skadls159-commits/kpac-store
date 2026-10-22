/* kpac-attr.js · v40 r177b — 리마인드 코드(k)·광고 출처(src/ad/utm/gclid…)를 모든 페이지에서 기억(30일 · 첫/마지막)하고, 모든 신청 폼에 같이 실어 보내요. 도메인 이동(github.io ↔ kpac.store)에도 링크에 붙여 넘겨요. */
(function(){
  if (window.KPAC_ATTR) return;
  var KEYS=['k','src','ad','adg','gcid','gag','gad','gkw','gnet','utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','gbraid','wbraid','fbclid','ttclid'];
  var LK='kpac_attr_v2', TTL=30*864e5, KTTL=14*864e5, AW='AW-18048988442', LBL='AW-18048988442/iDYiCNiihN4cEJrqtp5D';
  var q=new URLSearchParams(location.search), cur={}, has=false;
  KEYS.forEach(function(k){var v=q.get(k); if(v){cur[k]=String(v).slice(0,200); has=true;}});
  function rd(){ var o=null; try{o=JSON.parse(localStorage.getItem(LK)||'null');}catch(e){}
    if(!o){ try{var m=document.cookie.match(/(?:^|; )kpac_attr=([^;]*)/); if(m) o=JSON.parse(decodeURIComponent(m[1]));}catch(e){} }
    if(o&&o.last&&Date.now()-(o.last.t||0)>TTL) o=null; return o||{}; }
  var S=rd();
  if(has){ cur.t=Date.now(); cur.ref=(document.referrer||'').slice(0,200); cur.url=location.href.split('#')[0].slice(0,480);
    if(!cur.k && S.last && S.last.k && !(cur.src||cur.gclid||cur.gbraid||cur.wbraid||cur.fbclid)) cur.k=S.last.k;
    S.last=cur; if(!S.first) S.first=cur;
    try{localStorage.setItem(LK,JSON.stringify(S));}catch(e){}
    try{var cv=encodeURIComponent(JSON.stringify({first:S.first,last:S.last})); if(cv.length<3800) document.cookie='kpac_attr='+cv+'; path=/; max-age='+(30*86400)+'; SameSite=Lax';}catch(e){} }
  var L=S.last||{}, F=S.first||{};
  function k(){ return (L.k && Date.now()-(L.t||0)<KTTL) ? L.k : ''; }
  function isGoogle(){ return !!(L.gclid||L.gbraid||L.wbraid||/^google/i.test(L.src||'')||/google/i.test(L.utm_source||'')); }
  function fields(){ var o={};
    KEYS.forEach(function(x){ if(L[x]) o[x]=L[x]; });
    if(o.gbraid&&!o.gclid) o.gclid=o.gbraid; if(o.wbraid&&!o.gclid) o.gclid=o.wbraid;
    if(L.ref) o.referrer=L.ref; if(L.url) o.landing=L.url;
    if(F.t&&F.t!==L.t){ o.first_src=F.src||F.utm_source||(F.k?'alimtalk':''); o.first_ad=F.ad||F.utm_content||''; o.first_at=new Date(F.t).toISOString(); }
    o.page_now=location.href.split('#')[0].slice(0,300); return o; }
  function qs(){ var p=new URLSearchParams(); KEYS.forEach(function(x){ if(L[x] && !(x==='k' && !k())) p.set(x,L[x]); }); return p; }
  window.KPAC_ATTR={k:k, fields:fields, isGoogle:isGoogle, qs:qs, data:function(){return S;}};
  /* 도메인 이동: github.io 랜딩 → kpac.store 링크에 출처를 붙여서 넘김 (kpac.store 안에서는 저장값을 같이 씀) */
  function deco(){ if(!(L.src||L.k||L.gclid||L.gbraid||L.wbraid||L.utm_source)) return;
    var as=document.querySelectorAll('a[href]'); for(var i=0;i<as.length;i++){ var a=as[i]; try{ var u=new URL(a.getAttribute('href'),document.baseURI);
      if(!/^https?:/.test(u.protocol)) continue; if(u.hostname===location.hostname && u.hostname!=='kpac.store') continue;
      if(!/(^|\.)kpac\.store$|skadls159-commits\.github\.io$/.test(u.hostname) || u.hostname===location.hostname) continue;
      var p=qs(); p.forEach(function(v,key){ if(!u.searchParams.get(key)) u.searchParams.set(key,v); }); a.href=u.toString(); }catch(e){} } }
  /* 구글 태그: 없으면 불러오고(링커·url_passthrough), 있으면 링커만 */
  window.dataLayer=window.dataLayer||[]; if(typeof window.gtag!=='function'){ window.gtag=function(){dataLayer.push(arguments);}; }
  gtag('set','linker',{domains:['kpac.store','skadls159-commits.github.io'],accept_incoming:true});
  function tagUp(){ var hasTag=!!document.querySelector('script[src*="googletagmanager.com/gtag/js"]'); if(hasTag) return; var s=document.createElement('script'); s.async=true; s.src='https://www.googletagmanager.com/gtag/js?id='+AW; document.head.appendChild(s); gtag('js',new Date()); gtag('config',AW,{url_passthrough:true}); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',tagUp); else tagUp();
  /* 페이지가 이미 같은 전환을 보내면(랜딩·ceo·start) 여기선 안 보냄 → 두 번 안 잡힘 */
  window.KPAC_ATTR.conv=function(){ var pageHasConv=document.documentElement.innerHTML.indexOf('iDYiCNiihN4cEJrqtp5D')>=0; if(pageHasConv||window.__kpacConvDone) return; window.__kpacConvDone=true;
    if(!isGoogle()) return; try{ gtag('event','conversion',{send_to:LBL,value:1.0,currency:'KRW'}); }catch(e){} };
  /* 모든 신청 전송(fetch)에 출처를 같이 실음: Apps Script 웹훅 · CRM /api/intake · /api/book */
  var of=window.fetch; if(of){ window.fetch=function(u,o){ try{ var url=String(u&&u.url||u||''); var hit=/script\.google\.com\/macros|\/api\/intake|\/api\/book(\?|$)/.test(url);
      if(hit && o && o.method && /post/i.test(o.method) && typeof o.body==='string' && o.body.charAt(0)==='{'){ var b=JSON.parse(o.body), f=fields(), ch=false;
        for(var x in f){ if(b[x]==null||b[x]===''){ b[x]=f[x]; ch=true; } }
        if(/\/api\/book/.test(url) && !b.k && k()){ b.k=k(); ch=true; }
        if(/script\.google/.test(url) && (!b.channel||b.channel==='kpac_store') && (L.src||L.utm_source||(L.k?'alimtalk':''))){ b.channel=L.src||L.utm_source||'alimtalk'; ch=true; }
        if(ch){ o=Object.assign({},o,{body:JSON.stringify(b)}); }
        var isLead=/script\.google|\/api\/intake|\/api\/book(\?|$)/.test(url);
        return of.call(this,u,o).then(function(r){ try{ if(isLead && r && (r.ok||r.type==='opaque') && !/\/api\/intake/.test(url)) window.KPAC_ATTR.conv(); }catch(e){} return r; }); } }catch(e){}
    return of.apply(this,arguments); }; }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',deco); else deco();
  setTimeout(deco,1500);
})();
