/* =======================================================
   C043 - Kanharoth Cosmetics Demo — Inline SVG icon set
   Stroke-based line icons (Lucide-inspired), no emoji, no external
   icon font/CDN dependency — keeps the demo fully self-contained.
   ======================================================= */
const ICONS = {
  search: `<svg class="icon" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>`,
  cart: `<svg class="icon" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1.4"/><circle cx="19" cy="21" r="1.4"/><path d="M2.5 3h2.6l2.3 12.2a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.6L21.5 8H6"/></svg>`,
  menu: `<svg class="icon" viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18"/></svg>`,
  x: `<svg class="icon" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>`,
  phone: `<svg class="icon" viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .7 3a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 6 6l1.2-1.3a2 2 0 0 1 2.1-.4c1 .4 2 .6 3 .7a2 2 0 0 1 1.6 2z"/></svg>`,
  truck: `<svg class="icon" viewBox="0 0 24 24"><rect x="1" y="6" width="14" height="11" rx="1.2"/><path d="M15 10h4l3 3v4h-7z"/><circle cx="6" cy="19.5" r="1.6"/><circle cx="17.5" cy="19.5" r="1.6"/></svg>`,
  shield: `<svg class="icon" viewBox="0 0 24 24"><path d="M12 2.5l7.5 3.2V11c0 5.2-3.3 8.7-7.5 10.5C7.8 19.7 4.5 16.2 4.5 11V5.7L12 2.5z"/><path d="M9 12l2 2 4-4.2"/></svg>`,
  message: `<svg class="icon" viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-8 8H7l-4 3 1-4.5A8 8 0 1 1 21 12z"/></svg>`,
  star: `<svg class="icon" viewBox="0 0 24 24" stroke-width="1.6"><path d="M12 2.5l2.9 6 6.6.8-4.8 4.6 1.2 6.6L12 17.4l-5.9 3.1 1.2-6.6-4.8-4.6 6.6-.8z"/></svg>`,
  plus: `<svg class="icon" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>`,
  minus: `<svg class="icon" viewBox="0 0 24 24"><path d="M5 12h14"/></svg>`,
  trash: `<svg class="icon" viewBox="0 0 24 24"><path d="M3 6h18M8 6V4.5A1.5 1.5 0 0 1 9.5 3h5A1.5 1.5 0 0 1 16 4.5V6m2 0-.8 13.4A2 2 0 0 1 15.2 21H8.8a2 2 0 0 1-2-1.6L6 6"/><path d="M10 11v6M14 11v6"/></svg>`,
  chevron: `<svg class="icon" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>`,
  plusCircle: `<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5"/><path d="M12 8v8M8 12h8"/></svg>`,
  check: `<svg class="icon" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>`,
  checkCircle: `<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5"/><path d="M8 12.5l2.5 2.5 5.5-6"/></svg>`,
  send: `<svg class="icon" viewBox="0 0 24 24"><path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4z"/></svg>`,
  users: `<svg class="icon" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/></svg>`,
  package: `<svg class="icon" viewBox="0 0 24 24"><path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/></svg>`,
  tag: `<svg class="icon" viewBox="0 0 24 24"><path d="M20.6 12.6L12.6 20.6a2 2 0 0 1-2.8 0l-7-7a2 2 0 0 1 0-2.8L10.8 2.8A2 2 0 0 1 12.2 2.2l7 0a2 2 0 0 1 2 2v6.5a2 2 0 0 1-.6 1.9z"/><circle cx="15.5" cy="7.5" r="1.4"/></svg>`,
  sparkles: `<svg class="icon" viewBox="0 0 24 24"><path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/></svg>`,
  heart: `<svg class="icon" viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-10-9.3C.5 8 2 4.5 5.6 4a5 5 0 0 1 6.4 2.6A5 5 0 0 1 18.4 4c3.6.5 5.1 4 3.6 7.7C19.5 16.4 12 21 12 21z"/></svg>`,
  facebook: `<svg class="icon" viewBox="0 0 24 24"><path d="M15 3h-2.5A4.5 4.5 0 0 0 8 7.5V10H5.5v3.5H8V21h3.5v-7.5h2.7l.5-3.5h-3.2V7.8c0-1 .3-1.8 1.7-1.8H15z"/></svg>`,
  instagram: `<svg class="icon" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1"/></svg>`,
  telegram: `<svg class="icon" viewBox="0 0 24 24" stroke-width="1.6"><path d="M21.5 3.5L2.5 11l6 2.3M21.5 3.5L15.7 21l-7.2-7.7M21.5 3.5L8.5 13.3"/></svg>`,
  clock: `<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5"/><path d="M12 7v5.5l3.5 2"/></svg>`,
  mapPin: `<svg class="icon" viewBox="0 0 24 24"><path d="M20 10.5c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10.5" r="2.7"/></svg>`,
  mail: `<svg class="icon" viewBox="0 0 24 24"><rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="M3 6l9 7 9-7"/></svg>`,
  copy: `<svg class="icon" viewBox="0 0 24 24"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
};
function icon(name, extraClass){
  const svg = ICONS[name] || "";
  if (!extraClass) return svg;
  return svg.replace('class="icon"', `class="icon ${extraClass}"`);
}
