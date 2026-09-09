/* Shared browser-local demo model. Keep this file identical in both demos. */
window.TeaDemo = (() => {
 const key='c053-tea-dong-v1';
 const defaults={products:[
 {id:'orange',name:'Orange Green Tea',category:'Fruit Tea',description:'Bright citrus. Fresh green tea. Pure sunshine.',price:2.50,image:'assets/Drink.jpg',status:'Published',featured:true,best:true},
 {id:'brown',name:'Brown Sugar Milk Tea',category:'Milk Tea',description:'Rich brown sugar, creamy milk & chewy pearls.',price:2.75,image:'assets/brown.jpg',status:'Published',best:true},
 {id:'matcha',name:'Matcha Latte',category:'Latte',description:'Earthy matcha meets a silky milk finish.',price:3,image:'assets/matcha.jpg',status:'Published',best:true},
 {id:'strawberry',name:'Strawberry Milk Tea',category:'Milk Tea',description:'A little berry sweet, a little dreamy.',price:2.75,image:'assets/strawberry.jpg',status:'Published',best:true},
 {id:'fresh',name:'Iced Matcha Tea',category:'Fresh Tea',description:'A refreshing green tea moment.',price:2.25,image:'assets/matcha.jpg',status:'Published'},
 {id:'smoothie',name:'Strawberry Smoothie',category:'Smoothies',description:'Creamy berry goodness, blended with ice.',price:3.25,image:'assets/strawberry.jpg',status:'Published'},
 {id:'special',name:'Citrus Cloud',category:'Special Drinks',description:'Our sunny citrus-inspired sample special.',price:3.25,image:'assets/Drink.jpg',status:'Published'}],
 categories:['Milk Tea','Fruit Tea','Fresh Tea','Latte','Smoothies','Special Drinks'],
 promos:[{id:'p1',title:'Good tea. Better together.',description:'Buy 2 and enjoy a special price. Bring your tea buddy.',start:'',end:'',status:'Published',image:'assets/Drink.jpg'},{id:'p2',title:'After class, tea time.',description:'Student Happy Hour. Your study break just got sweeter.',start:'',end:'',status:'Published',image:'assets/strawberry.jpg'},{id:'p3',title:'Meet your seasonal crush.',description:'A fresh new flavor for your next happy moment.',start:'',end:'',status:'Draft',image:'assets/matcha.jpg'}],
 home:{title:'Fresh. Fun. TEA DONG.',subtitle:'A little tea. A lot of happy. Freshly made sips for wherever your day takes you.',image:'assets/Drink.jpg',bestTitle:'Your new usual.',featured:'orange',why:'Fresh ingredients, made to order, fun flavors, friendly prices.',cta:'Ready for your next tea?'},
 gallery:[{id:'g1',image:'assets/friends.jpg',caption:'Better with your favorite people.',hidden:false},{id:'g2',image:'assets/strawberry.jpg',caption:'Pink looks good on your day.',hidden:false},{id:'g3',image:'assets/Drink.jpg',caption:'A little sunshine on ice.',hidden:false},{id:'g4',image:'assets/matcha.jpg',caption:'In our matcha era.',hidden:false}],
 store:{name:'TEA DONG',address:'Store address coming soon',phone:'',telegram:'',hours:'Opening hours coming soon',map:'',instagram:'',tiktok:''},
 seo:{title:'TEA DONG — Fresh tea. Happy moments.',description:'Find your next favorite milk tea, fruit tea and fresh sip at TEA DONG.'},media:['assets/Drink.jpg','assets/Logo.jpg','assets/brown.jpg','assets/matcha.jpg','assets/strawberry.jpg','assets/friends.jpg'],settings:{language:'English'}};
 let memory;
 function read(){try{return JSON.parse(localStorage.getItem(key))||structuredClone(defaults)}catch{return memory||structuredClone(defaults)}}
 function save(data){try{localStorage.setItem(key,JSON.stringify(data));memory=data;return true}catch{return false}}
 const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const safeImage=v=> /^(assets\/[\w.-]+|data:image\/(png|jpeg|webp);base64,[a-zA-Z0-9+/=]+)$/.test(v||'')?v:'assets/Drink.jpg';
 function exportData(data){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));a.download='tea-dong-demo.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
 return {key,defaults,read,save,esc,safeImage,exportData};
})();
