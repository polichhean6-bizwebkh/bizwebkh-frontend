/* =======================================================
   C043 - Kanharoth Cosmetics Demo — Telegram order flow
   Placing an order builds a readable order summary and opens Telegram (direct chat first,
   group fallback second) so a human confirms the order manually.
   Replace the placeholder handle/group link below with the real ones
   before going live.
   ======================================================= */
const TELEGRAM_CONFIG = {
  directUsername: "kanharoth_cosmetics",       // placeholder — replace with the real Telegram username
  groupLink: "https://t.me/kanharoth_cosmetics_orders", // placeholder — replace with the real group link
};

function buildOrderSummaryText(customer, items, storeLabel){
  const lines = [];
  lines.push(`🛍️ New Order — ${storeLabel || "Kanharoth Cosmetics"}`);
  lines.push("");
  lines.push(`Customer: ${customer.name || "-"}`);
  lines.push(`Phone / Telegram: ${customer.phone || "-"}`);
  lines.push(`Delivery Address: ${customer.address || "-"}`);
  lines.push("");
  lines.push("Items:");
  let subtotal = 0;
  items.forEach(i=>{
    const name = getLang()==="km" ? i.product.nameKm : i.product.name;
    const price = i.product.sale || i.product.price;
    const lineTotal = price * i.qty;
    subtotal += lineTotal;
    lines.push(`- ${name} × ${i.qty} — ${money(lineTotal)}`);
  });
  lines.push("");
  lines.push(`Total: ${money(subtotal)}`);
  lines.push("");
  lines.push(`Note: ${customer.note || "-"}`);
  return lines.join("\n");
}

function telegramDirectLink(text){
  return `https://t.me/${TELEGRAM_CONFIG.directUsername}?text=${encodeURIComponent(text)}`;
}
function telegramChatLink(){
  return `https://t.me/${TELEGRAM_CONFIG.directUsername}`;
}
function telegramGroupLink(){
  return TELEGRAM_CONFIG.groupLink;
}

function showToast(message){
  let el = document.getElementById("app-toast");
  if (!el){
    el = document.createElement("div");
    el.id = "app-toast";
    el.className = "toast";
    document.body.appendChild(el);
  }
  el.innerHTML = `${icon("checkCircle")}<span>${message}</span>`;
  el.classList.add("show");
  clearTimeout(el._t);
  el._t = setTimeout(()=> el.classList.remove("show"), 2600);
}

function copyText(text, confirmationMessage){
  if (navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).then(()=> showToast(confirmationMessage || t("tg_copied")))
      .catch(()=> fallbackCopy(text, confirmationMessage));
  } else {
    fallbackCopy(text, confirmationMessage);
  }
}
function fallbackCopy(text, confirmationMessage){
  const ta = document.createElement("textarea");
  ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
  document.body.appendChild(ta); ta.select();
  try{ document.execCommand("copy"); showToast(confirmationMessage || t("tg_copied")); }catch(e){}
  document.body.removeChild(ta);
}
function copyOrderAndOpenTelegram(summary){
  copyText(summary, t("tg_order_copied"));
  window.location.assign(telegramChatLink());
}
