/* Standalone public-website cart. Never reads or writes CMS storage. */
(() => {
 'use strict';
 const STORAGE_KEY = 'c053-tea-dong-cart-v1';
 const E = TeaDemo.esc;
 const $ = id => document.getElementById(id);
 const sizes = {S:'Small', M:'Medium', L:'Large'};
 const sweetness = ['0%','25%','50%','75%','100%'];
 const ice = ['No Ice','Less Ice','Normal Ice'];
 const money = cents => '$'+(cents/100).toFixed(2);
 const catalog = () => TeaDemo.defaults.products;
 const productFor = id => catalog().find(p=>p.id===id&&p.status==='Published');
 const available = p => Boolean(p && p.availability!=='Sold Out');
 const centsFor = p => Math.round(Number(p.price)*100);
 const cleanNote = value => typeof value==='string'?value.replace(/[\u0000-\u001f\u007f]/g,' ').trim().slice(0,120):'';
 const signature = line => JSON.stringify([line.product.id,line.size,line.sweetness,line.ice,line.note]);
 let cart = [], selectedProduct = null, selectedQuantity = 1, cartStep = 'items';
 let message = '', storageOK = true, saveWarning = false;
 const productDialog = $('product-dialog'), cartDialog = $('cart-dialog');

 function normalize(value) {
   if(!Array.isArray(value)) return [];
   const output=[];
   value.slice(0,20).forEach(raw=>{
     if(!raw||typeof raw!=='object')return;
     const product=productFor(raw.product?.id);
     if(!product||!['S','M','L'].includes(raw.size)||!sweetness.includes(raw.sweetness)||!ice.includes(raw.ice)||!Number.isInteger(raw.quantity)||raw.quantity<1||raw.quantity>99)return;
     const line={product:{id:product.id,name:product.name,image:product.image,price:product.price},size:raw.size,sweetness:raw.sweetness,ice:raw.ice,quantity:raw.quantity,note:cleanNote(raw.note)};
     const existing=output.find(item=>signature(item)===signature(line));
     if(existing)existing.quantity=Math.min(99,existing.quantity+line.quantity);else output.push(line);
   });
   return output;
 }
 function load() {
   try { const value=JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]');cart=normalize(value); }
   catch { cart=[]; }
 }
 function persist() {
   try { localStorage.setItem(STORAGE_KEY,JSON.stringify(cart));storageOK=true;saveWarning=false; }
   catch { storageOK=false;saveWarning=true; }
 }
 function totals() { return cart.reduce((sum,line)=>({count:sum.count+line.quantity,cents:sum.cents+centsFor(line.product)*line.quantity}),{count:0,cents:0}); }
 function ready() { return cart.length>0 && cart.every(line=>available(productFor(line.product.id))); }
 function updateCounts() {
   const total=totals();
   document.querySelectorAll('[data-cart-count]').forEach(el=>el.textContent=total.count);
   document.querySelectorAll('[data-open-cart]').forEach(el=>el.setAttribute('aria-label',`Open cart, ${total.count} ${total.count===1?'drink':'drinks'}`));
   $('floating-total').textContent=total.count?money(total.cents):'Find your sip';
 }
 function lockScroll(){document.body.classList.toggle('order-dialog-open',productDialog.open||cartDialog.open)}
 function announce(text){const full=text+(saveWarning?' Cart stays for this visit only; browser storage is unavailable.':'');toast(full);if(productDialog.open)$('product-feedback').textContent=full;}
 function optionGroup(title,name,values,chosen) {
   return `<fieldset class="drink-choice"><legend>${title}</legend><div class="choice-row">${values.map(value=>`<label class="choice"><input type="radio" name="${name}" value="${E(value)}" ${value===chosen?'checked':''}><span>${E(value)}</span></label>`).join('')}</div></fieldset>`;
 }
 function openProduct(id,options={}) {
   const product=productFor(id);
   if(!available(product)){announce('This drink is sold out. Pick another fresh sip.');return;}
   selectedProduct=product;selectedQuantity=1;
   $('product-title').textContent=product.name;
   $('product-description').textContent=product.description;
   $('product-option-image').src=TeaDemo.safeImage(product.image);
   $('product-option-image').alt=product.name;
   $('product-unit-price').textContent=money(centsFor(product));
   $('product-choice-fields').innerHTML=optionGroup('Size','size',['S','M','L'],sizes[options.size]?options.size:'M')+optionGroup('Sweetness','sweetness',sweetness,sweetness.includes(options.sweetness)?options.sweetness:'50%')+optionGroup('Ice','ice',ice,ice.includes(options.ice)?options.ice:'Normal Ice');
   $('drink-note').value='';$('product-feedback').textContent='';updateProductQuantity();
   productDialog.showModal();lockScroll();
 }
 function updateProductQuantity(){
   $('product-quantity').textContent=selectedQuantity;
   $('product-minus').disabled=selectedQuantity===1;
   $('product-plus').disabled=selectedQuantity===99;
   $('add-drink-total').textContent=selectedProduct?money(centsFor(selectedProduct)*selectedQuantity):'';
 }
 function renderCart(focusAction,focusIndex) {
   const total=totals();
   $('cart-heading-count').textContent=`${total.count} ${total.count===1?'drink':'drinks'} · made your way`;
   $('cart-items').innerHTML=cart.length?cart.map((line,index)=>{
     const inStock=available(productFor(line.product.id));
     return `<article class="cart-line"><img src="${TeaDemo.safeImage(line.product.image)}" alt="${E(line.product.name)}"><div class="cart-line-main"><div class="cart-line-top"><h3>${E(line.product.name)}</h3><button class="remove-line" data-cart-action="remove" data-index="${index}" aria-label="Remove ${E(line.product.name)}">×</button></div><p class="line-options">${sizes[line.size]} · ${E(line.sweetness)} sugar · ${E(line.ice)}</p>${line.note?`<p class="line-note">Note: ${E(line.note)}</p>`:''}${inStock?'':'<p class="unavailable-text">Sold out — remove to continue.</p>'}<p class="unit-price">${money(centsFor(line.product))} each</p><div class="cart-line-bottom"><div class="quantity-stepper"><button data-cart-action="minus" data-index="${index}" aria-label="Decrease ${E(line.product.name)} quantity" ${line.quantity===1?'disabled':''}>−</button><span>${line.quantity}</span><button data-cart-action="plus" data-index="${index}" aria-label="Increase ${E(line.product.name)} quantity" ${line.quantity===99||!inStock?'disabled':''}>+</button></div><strong aria-label="Subtotal ${money(centsFor(line.product)*line.quantity)}">${money(centsFor(line.product)*line.quantity)}</strong></div></div></article>`;
   }).join(''):`<div class="cart-empty"><span aria-hidden="true">♡</span><h3>Your next happy sip<br>starts here.</h3><p>Pick a drink, make it yours, and add a little happy to your day.</p><button class="button" id="browse-menu">Explore the menu ↗</button></div>`;
   $('cart-clear').hidden=!cart.length;
   $('cart-summary').hidden=!cart.length;
   $('cart-total-items').textContent=total.count;
   $('cart-total').textContent=money(total.cents);
   $('cart-checkout').disabled=!ready();
   $('cart-storage-note').hidden=storageOK;
   if(focusAction){const target=$('cart-items').querySelector(`[data-cart-action="${focusAction}"][data-index="${focusIndex}"]:not(:disabled)`);(target||$('cart-items').querySelector('button:not(:disabled)')||$('cart-close')).focus();}
 }
 function showStep(step) {
   cartStep=step;
   ['items','customer','review'].forEach(name=>$(`cart-${name}-step`).hidden=name!==step);
   $('cart-title').textContent={items:'Your happy little cart.',customer:'Make it a tea date.',review:'One last look.'}[step];
   if(step==='items') renderCart();
   if(step==='customer'){$('customer-total').textContent=money(totals().cents);$('customer-name').focus();}
   if(step==='review')$('order-preview').focus();
 }
 function clearCustomer() {
   $('customer-form').reset();
   [...$('customer-form').elements].forEach(field=>field.setCustomValidity?.(''));
   $('delivery-address-field').hidden=true;
   $('customer-address').required=false;
   $('order-preview').value='';message='';
   $('telegram-open').removeAttribute('href');
   $('copy-feedback').textContent='';
 }
 function openCart(){clearCustomer();showStep('items');cartDialog.showModal();lockScroll();}
 function formatMessage(customer) {
   const lines=cart.map((line,index)=>`${index+1}. ${line.product.name}\nSize: ${sizes[line.size]}\nSweetness: ${line.sweetness}\nIce: ${line.ice}\nQty: ${line.quantity}\nUnit price: ${money(centsFor(line.product))}${line.note?'\nDrink note: '+line.note:''}\nSubtotal: ${money(centsFor(line.product)*line.quantity)}`);
   return `Hello TEA DONG,\n\nI would like to order:\n\n${lines.join('\n\n')}\n\nTotal Items: ${totals().count}\nEstimated Total: ${money(totals().cents)}\n\nCustomer Name: ${customer.name}\nPhone: ${customer.phone}\nOrder Type: ${customer.type}\nDelivery Address: ${customer.type==='Delivery'?customer.address:'Not applicable (Pickup)'}\nOrder Note: ${customer.note||'None'}\n\nPlease confirm availability and the final total. Thank you!`;
 }
 function telegramDestination() {
   if(TELEGRAM_URL==='TO_BE_CONFIRMED')return null;
   try {
     const url=new URL(TELEGRAM_URL);
     if(url.protocol!=='https:'||url.hostname!=='t.me'||url.port||url.username||url.password||url.search||url.hash||!/^\/[a-zA-Z][a-zA-Z0-9_]{3,31}\/?$/.test(url.pathname))return null;
     if(['share','joinchat','addstickers','proxy','login','confirmphone'].includes(url.pathname.replaceAll('/','').toLowerCase()))return null;
     return url;
   } catch {return null;}
 }
 function prepareTelegram() {
   const destination=telegramDestination();
   const open=$('telegram-open');
   $('telegram-pending').hidden=Boolean(destination);
   open.hidden=!destination;
   $('telegram-ready-note').hidden=!destination;
   $('telegram-long-note').hidden=message.length<=3000||!destination;
   if(destination){if(message.length<=3000)destination.searchParams.set('text',message);open.href=destination.href;open.textContent=message.length<=3000?'Open Telegram ↗':'Open Telegram & paste ↗';}
   else open.removeAttribute('href');
 }
 function invalidateReview(){
   $('order-preview').value='';message='';$('telegram-open').removeAttribute('href');
   if(cartDialog.open&&cartStep==='review')showStep('items');
 }

 $('product-form').addEventListener('submit',event=>{
   event.preventDefault();
   if(!available(productFor(selectedProduct?.id))){announce('This drink is no longer available.');productDialog.close();return;}
   const values=new FormData(event.target);
   const line={product:{id:selectedProduct.id,name:selectedProduct.name,image:selectedProduct.image,price:selectedProduct.price},size:values.get('size'),sweetness:values.get('sweetness'),ice:values.get('ice'),quantity:selectedQuantity,note:cleanNote(values.get('note'))};
   const existing=cart.find(item=>signature(item)===signature(line));
   if(existing&&existing.quantity+line.quantity>99){announce('Up to 99 drinks per combination. Adjust the quantity in your cart.');return;}
   if(!existing&&cart.length>=20){announce('Your cart has 20 combinations. Remove one before adding another.');return;}
   if(existing)existing.quantity+=line.quantity;else cart.push(line);
   persist();updateCounts();productDialog.close();announce(`${line.quantity} ${selectedProduct.name} added to your cart.`);
 });
 $('product-minus').onclick=()=>{selectedQuantity=Math.max(1,selectedQuantity-1);updateProductQuantity()};
 $('product-plus').onclick=()=>{selectedQuantity=Math.min(99,selectedQuantity+1);updateProductQuantity()};
 $('product-close').onclick=()=>productDialog.close();
 $('cart-close').onclick=()=>{clearCustomer();cartDialog.close()};
 productDialog.addEventListener('close',()=>{selectedProduct=null;$('drink-note').value='';lockScroll()});
 cartDialog.addEventListener('close',()=>{clearCustomer();$('clear-confirm').hidden=true;lockScroll()});
 document.addEventListener('click',event=>{
   const add=event.target.closest('[data-add-drink]');if(add&&!add.disabled)openProduct(add.dataset.addDrink);
   if(event.target.closest('[data-open-cart]'))openCart();
   if(event.target.closest('#browse-menu')){cartDialog.close();$('menu').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
   const action=event.target.closest('[data-cart-action]');
   if(action){
     const index=Number(action.dataset.index),line=cart[index];if(!line)return;
     if(action.dataset.cartAction==='remove')cart.splice(index,1);
     if(action.dataset.cartAction==='minus')line.quantity=Math.max(1,line.quantity-1);
     if(action.dataset.cartAction==='plus'&&available(productFor(line.product.id)))line.quantity=Math.min(99,line.quantity+1);
     persist();updateCounts();invalidateReview();renderCart(action.dataset.cartAction,index);
     $('cart-change-feedback').textContent=`Cart updated. ${totals().count} drinks, ${money(totals().cents)} estimated total.`;
   }
 });
 $('cart-clear').onclick=()=>{$('clear-confirm').hidden=false;$('confirm-clear').focus()};
 $('cancel-clear').onclick=()=>{$('clear-confirm').hidden=true;$('cart-clear').focus()};
 $('confirm-clear').onclick=()=>{cart=[];persist();updateCounts();clearCustomer();$('clear-confirm').hidden=true;showStep('items');$('browse-menu').focus();announce('Cart cleared. Your next fresh start awaits.')};
 $('cart-checkout').onclick=()=>{if(ready())showStep('customer')};
 $('back-to-cart').onclick=()=>showStep('items');
 $('back-to-details').onclick=()=>{message='';$('order-preview').value='';$('telegram-open').removeAttribute('href');showStep('customer')};
 $('customer-form').addEventListener('change',()=>{
   const delivery=$('customer-form').elements.orderType.value==='Delivery';
   $('delivery-address-field').hidden=!delivery;$('customer-address').required=delivery;
   if(!delivery)$('customer-address').value='';
 });
 $('customer-form').addEventListener('input',event=>event.target.setCustomValidity?.(''));
 $('customer-form').addEventListener('submit',event=>{
   event.preventDefault();if(!ready()){showStep('items');return;}
   const fields=event.target.elements;
   for(const name of ['customerName','phone',...(fields.orderType.value==='Delivery'?['address']:[])]){
     if(!fields[name].value.trim()){fields[name].setCustomValidity('Please complete this field.');fields[name].reportValidity();return;}
   }
   if(!/^[+\d\s().-]{6,30}$/.test(fields.phone.value.trim())||(fields.phone.value.match(/\d/g)||[]).length<6){fields.phone.setCustomValidity('Enter a phone number with at least 6 digits.');fields.phone.reportValidity();return;}
   const singleLine=value=>value.trim().replace(/[\r\n\t]+/g,' ');
   message=formatMessage({name:singleLine(fields.customerName.value),phone:singleLine(fields.phone.value),type:fields.orderType.value,address:singleLine(fields.address.value),note:singleLine(fields.orderNote.value)});
   $('order-preview').value=message;$('copy-feedback').textContent='';prepareTelegram();showStep('review');
 });
 $('copy-order').onclick=async()=>{
   try {if(!navigator.clipboard?.writeText)throw Error();await navigator.clipboard.writeText(message);$('copy-feedback').textContent='Order copied. Paste it into the confirmed TEA DONG chat.';}
   catch {$('order-preview').focus();$('order-preview').select();$('copy-feedback').textContent='Message selected. Use your browser’s Copy command to copy it.';}
 };
 $('telegram-open').onclick=event=>{if(!ready()||!message||!telegramDestination()){event.preventDefault();return;}$('copy-feedback').textContent='Review the draft and tap Send in Telegram. Your cart stays here until you clear it.';};
 window.addEventListener('storage',event=>{
   if(event.key!==STORAGE_KEY&&event.key!==null)return;
   load();updateCounts();invalidateReview();
   if(cartDialog.open){clearCustomer();showStep('items');$('cart-change-feedback').textContent='Cart changed in another tab. Review it before continuing.';}
 });
 window.addEventListener('pagehide',clearCustomer);
 window.addEventListener('pageshow',event=>{if(event.persisted){clearCustomer();if(cartDialog.open)showStep('items')}});
 load();updateCounts();
 window.TeaCart={openProduct,openCart};
})();
