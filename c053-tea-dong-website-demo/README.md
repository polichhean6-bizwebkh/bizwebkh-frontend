# TEA DONG public website + cart demo

Open `index.html` directly in a modern browser. No installation or build step is required. All assets are local; opening a configured Telegram destination requires internet access.

This version preserves the website design and adds a standalone cart. It does not read, write or synchronize with the CMS demo or BizWeb CMS Core. The footer's CMS link is only navigation. The CMS folder has not been modified.

## Ordering walkthrough

1. Choose **+ Add to Cart** on a drink card.
2. Select S/M/L, sweetness (0/25/50/75/100%), ice (No Ice/Less Ice/Normal Ice), quantity and an optional drink note.
3. Add the customized drink. Identical combinations merge; different options or notes create separate lines.
4. Open the header or floating cart. Increase/decrease quantities, remove a line, or confirm clearing the cart. Totals use integer cents.
5. Choose **Order via Telegram**. Enter name and phone; select Pickup or Delivery. Delivery requires an address; Pickup clears and hides it. Add an optional order note.
6. Review and copy the message. With the current placeholder, no Telegram destination opens. Once configured, **Open Telegram** opens a draft for the customer to review and send. Nothing is sent automatically.

S, M and L currently share the same sample price, stated in the customization sheet. The estimate excludes any unconfirmed delivery fee. No payment is collected.

## Telegram configuration — one value

Edit `order-config.js`, line 4:

```js
const TELEGRAM_URL = 'TO_BE_CONFIRMED';
```

Replace this only after the client supplies a confirmed public chat URL in the format `https://t.me/<confirmed_username>`. No TEA DONG username has been invented. Unsupported or unconfigured links retain the placeholder and prevent navigation.

Draft text uses Telegram's documented `?text=` parameter for public username links, URL-encoded using URLSearchParams. See the [official Telegram reference](https://core.telegram.org/api/links#public-username-links). Messages longer than 3,000 characters use a copy-and-paste fallback with a plain chat link. If clipboard access is unavailable, the message is selected for manual copying. Actual Telegram/client behavior must be checked with the real destination before launch.

## Persistence and customer privacy

Only cart lines are saved under localStorage key `c053-tea-dong-cart-v1`: product snapshot, options, quantity and drink note. Refresh restores the cart, including direct file opening in the tested browser. Storage is browser/origin-specific; file-origin behavior may differ between browsers. No cross-device persistence.

Name, phone, delivery address and order note are never written to localStorage, sessionStorage, cookies, a server or analytics. They exist only in the current form/preview. Closing the cart, leaving/reloading the page or receiving a cart change from another tab clears them. Choosing Copy explicitly copies the message to the system clipboard. Choosing Open Telegram explicitly passes the message into a Telegram draft link. These user-controlled copies are outside website storage.

Malformed saved rows are ignored. Product names/prices/images are resolved against the public catalog; unavailable restored items cannot be ordered. Blocked/full storage falls back to an in-memory cart with a warning. Limits: 20 distinct combinations and 99 units per combination.

## Availability

In this folder's `demo-data.js`, set product `availability` to `Available` or `Sold Out`. Citrus Cloud demonstrates Sold Out. Its card is disabled, and the add handler separately checks availability. These are frontend flags, not inventory management.

## Files

- `index.html`: original public sections plus ordering dialogs.
- `styles.css`: original website design, unchanged by this enhancement.
- `app.js`: public sections, filtering and featured-drink handoff.
- `demo-data.js`: standalone public content, independent of the CMS copy.
- `order-config.js`: single Telegram destination setting.
- `cart.js`: customization, cart, validation, totals, persistence and order messages.
- `cart.css`: ordering UI, drawer and mobile bottom sheet.
- `assets/Logo.jpg`, `assets/Drink.jpg`: unchanged real client assets.
- `assets/brown.jpg`, `assets/matcha.jpg`, `assets/strawberry.jpg`, `assets/friends.jpg`: existing illustrative photographs, unchanged.

## QA and scope

The full customization/cart/pickup-message flow passed at 390, 430, 768 and 1366 px: refresh persistence, no page/dialog overflow, no broken images and no console errors. Also tested delivery validation, quantity/removal totals, sold-out blocking, clear controls, copying, direct file opening and encoded Telegram draft construction. Configured links were intercepted during testing; no live Telegram message was sent.

Additional checks covered malformed/tampered cart data, escaped notes, unavailable restored items, cross-tab review invalidation, Escape privacy cleanup and blocked-storage fallback.

No backend, database, payment, KHQR, account, login, POS, inventory system, tracking, Supabase, CMS integration or deployment. English remains the default. Sample products, prices, promotions and store/contact details need client confirmation. Ready for static GitHub source upload.
