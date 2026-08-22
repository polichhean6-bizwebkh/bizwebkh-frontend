const telegramUsername = 'USERNAME';
const products = {
  books: [
    ['English Grammar Guide','Language Book','A clear guide to everyday English grammar.','$5','cover-blue'],
    ['Mathematics Practice','Practice Book','Build confidence with guided math exercises.','$4','cover-coral'],
    ['Khmer Study Guide','Khmer Language','Key ideas for clearer Khmer study.','$3','cover-green'],
    ['Exam Preparation','Revision Guide','A focused companion for exam season.','$6','cover-navy'],
    ['Science Discovery','Science Book','Explore foundational science concepts.','$5','cover-gold'],
    ['Smart Study Habits','Student Guide','Simple routines for stronger learning.','$4','cover-purple']
  ],
  materials: [
    ['Grade 12 Math Summary','Math Notes','Essential formulas and worked examples.','$2'],
    ['English Vocabulary Notes','Language Notes','Useful word lists for daily practice.','$2'],
    ['Physics Formula Sheet','Science Guide','Core physics formulas in one place.','$1.50'],
    ['Khmer Literature Notes','Khmer Notes','Helpful ideas for literature study.','$2'],
    ['Exam Practice Worksheet','Worksheet','Extra questions to test your knowledge.','$1'],
    ['Study Planner Pack','Study Tool','Plan your week and track your goals.','$2']
  ],
  videos: [
    ['Basic English Speaking','Video Course','Speak with more comfort in daily situations.','45 min','$3'],
    ['Math Problem Solving','Video Course','Step-by-step strategies for common problems.','55 min','$3'],
    ['Exam Preparation Tips','Video Lesson','A calmer way to prepare before exam day.','30 min','Free'],
    ['Khmer Writing Skills','Video Course','Build clearer, more confident writing skills.','40 min','$2'],
    ['Physics Basics','Video Course','Understand key physics ideas from the start.','50 min','$3'],
    ['Study Skills for Students','Video Lesson','Focus, plan and learn more effectively.','35 min','$2']
  ]
};
function escapeHtml(value){return value.replace(/[&<>'"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));}
function makeCard(data,type,index){
  const [title,tag,description,extra,priceOrClass] = data;
  let art, price;
  if(type==='books'){art=`<div class="card-art"><div class="book-cover ${priceOrClass}"><small>STUDYSPARK</small><strong>${escapeHtml(title)}</strong></div></div>`;price=extra;}
  if(type==='materials'){art=`<div class="card-art material-art"><div class="material-paper"><b>${escapeHtml(title)}</b><i></i><i></i><i></i></div></div>`;price=extra;}
  if(type==='videos'){art=`<div class="card-art video-art"><div class="video-window"><small>STUDYSPARK VIDEO</small><b>${escapeHtml(title)}</b><span class="video-play">▶</span></div></div>`;price=priceOrClass;}
  const duration=type==='videos'?` · ${extra}`:'';
  return `<article class="product-card reveal">${art}<div class="card-info"><span class="card-tag">${escapeHtml(tag)}${duration}</span><h3>${escapeHtml(title)}</h3><p>${escapeHtml(description)}</p><div class="card-bottom"><span class="price">${escapeHtml(price)}</span><button class="buy-btn" data-product="${escapeHtml(title)}" data-price="${escapeHtml(price)}">Buy →</button></div></div></article>`;
}
Object.entries(products).forEach(([type,items])=>document.getElementById(`${type}-grid`).innerHTML=items.map((item,index)=>makeCard(item,type,index)).join(''));
const dialog=document.getElementById('buy-modal');
document.addEventListener('click',event=>{
  const buy=event.target.closest('.buy-btn');
  if(buy){const product=buy.dataset.product,price=buy.dataset.price;document.getElementById('modal-product').textContent=product;document.getElementById('modal-price').textContent=`Price: ${price}`;document.getElementById('modal-telegram').href=`https://t.me/${telegramUsername}?text=${encodeURIComponent(`Hello, I’m interested in: ${product}\n\nPrice: ${price}\n\nPlease send me more information.`)}`;dialog.showModal();}
  if(event.target.closest('.modal-close')||event.target.closest('.modal-cancel'))dialog.close();
  const navLink=event.target.closest('.main-nav a');if(navLink)document.querySelector('.main-nav').classList.remove('open');
});
document.querySelector('.menu-toggle').addEventListener('click',event=>{const nav=document.querySelector('.main-nav'),open=nav.classList.toggle('open');event.currentTarget.setAttribute('aria-expanded',open);});
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
