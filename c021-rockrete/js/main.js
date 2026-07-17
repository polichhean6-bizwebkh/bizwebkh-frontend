const toggle=document.querySelector('.menu-toggle'),links=document.querySelector('.nav-links'),top=document.querySelector('.back-top');
toggle.addEventListener('click',()=>{const open=links.classList.toggle('open');toggle.setAttribute('aria-expanded',open);});
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');toggle.setAttribute('aria-expanded','false');}));
window.addEventListener('scroll',()=>top.classList.toggle('show',scrollY>500)); top.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
document.querySelector('#year').textContent=new Date().getFullYear();
document.querySelector('.inquiry-form').addEventListener('submit',e=>{e.preventDefault();e.currentTarget.querySelector('.form-success').textContent='Thank you — your inquiry has been received for this demo.';e.currentTarget.reset();});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.15});document.querySelectorAll('.reveal').forEach(e=>observer.observe(e));
if(window.lucide)window.lucide.createIcons({attrs:{'stroke-width':1.8}});
