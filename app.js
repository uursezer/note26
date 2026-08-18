(function(){
var qs=function(s,c){return (c||document).querySelector(s)},
qsa=function(s,c){return [].slice.call((c||document).querySelectorAll(s))};
qsa('#pipe .step').forEach(function(step){
var btn=qs('.step-btn',step);
btn.setAttribute('aria-expanded','false');
btn.addEventListener('click',function(){
var open=step.classList.toggle('open');
btn.setAttribute('aria-expanded',open?'true':'false');
});
});
var ex=qs('#expandAll');
ex.addEventListener('click',function(){
var next=ex.getAttribute('aria-pressed')!=='true';
ex.setAttribute('aria-pressed',next?'true':'false');
ex.textContent=next?'Hepsini kapat':'Hepsini aç';
qsa('#pipe .step').forEach(function(s){
s.classList.toggle('open',next);
qs('.step-btn',s).setAttribute('aria-expanded',next?'true':'false');
});
});
var rb=qs('#onlyRaw');
rb.addEventListener('click',function(){
var next=rb.getAttribute('aria-pressed')!=='true';
rb.setAttribute('aria-pressed',next?'true':'false');
qsa('#pipe .step').forEach(function(s){
s.classList.toggle('dim', next && s.dataset.space!=='raw');
});
});
var links=qsa('#nav a'), map={}, crumb=qs('#crumb2');
links.forEach(function(a){ map[a.getAttribute('href').slice(1)]=a; });
var io=new IntersectionObserver(function(es){
es.forEach(function(e){
if(!e.isIntersecting) return;
links.forEach(function(a){a.classList.remove('on')});
var a=map[e.target.id];
if(a){ a.classList.add('on'); if(crumb) crumb.textContent=a.textContent.replace(/^\s*\S*\s*/,'').trim()||a.textContent.trim(); }
});
},{rootMargin:'-80px 0px -70% 0px',threshold:0});
qsa('.page section').forEach(function(s){io.observe(s)});
var input=qs('#q'), empty=qs('#empty');
var cards=qsa('.rule').concat(qsa('.fix'));
input.addEventListener('input',function(){
var t=input.value.trim().toLowerCase();
if(!t){
cards.forEach(function(c){c.style.display=''});
qsa('.page section').forEach(function(s){s.style.display=''});
empty.classList.remove('on'); return;
}
var hits=0;
cards.forEach(function(c){
var ok=c.textContent.toLowerCase().indexOf(t)>-1;
c.style.display=ok?'':'none'; if(ok) hits++;
});
qsa('.page section').forEach(function(s){
var inner=qsa('.rule',s).concat(qsa('.fix',s));
if(!inner.length){ s.style.display='none'; return; }
s.style.display=inner.some(function(c){return c.style.display!=='none'})?'':'none';
});
empty.classList.toggle('on',hits===0);
});
document.addEventListener('keydown',function(e){
if((e.key==='k'&&(e.metaKey||e.ctrlKey))||(e.key==='/'&&document.activeElement!==input)){
e.preventDefault(); input.focus(); input.select();
}
if(e.key==='Escape'&&document.activeElement===input){
input.value=''; input.dispatchEvent(new Event('input')); input.blur();
}
});
})();