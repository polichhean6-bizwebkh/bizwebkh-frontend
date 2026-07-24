// Centralized placeholder image registry (Unsplash, royalty-free).
// BizWeb KH: replace these URLs with final client photography — every image
// in the site is sourced from this file (or villas.ts / menu.ts for
// item-specific photos) to make swapping assets straightforward later.

const u = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const heroImages = [
  u('photo-1573843981267-be1999ff37cd', 1920),
  u('photo-1520250497591-112f2f40a3f4', 1920),
  u('photo-1571003123894-1f0594d2b5d9', 1920),
];

export const villaImagePool = [
  u('photo-1571003123894-1f0594d2b5d9'),
  u('photo-1582719508461-905c673771fd'),
  u('photo-1520454974749-611b7248ffdb'),
  u('photo-1602002418082-a4443e081dd1'),
  u('photo-1611892440504-42a792e24d32'),
  u('photo-1590490360182-c33d57733427'),
  u('photo-1618773928121-c32242e63f39'),
  u('photo-1571896349842-33c89424de2d'),
  u('photo-1600585154340-be6161a56a0c'),
  u('photo-1584132967334-10e028bd69f7'),
  u('photo-1591825729269-caeb344f6df2'),
  u('photo-1520277739336-7bf67edfa768'),
];

export const foodImagePool = {
  breakfast: u('photo-1512058564366-18510be2db19'),
  khmer: u('photo-1559847844-5315695dadae'),
  seafood: u('photo-1621506289937-a8e4df240d0b'),
  western: u('photo-1546069901-ba9599a7e63c'),
  snacks: u('photo-1541014741259-de529411b96a'),
  juice: u('photo-1476224203421-9ac39bcb3327'),
  coffee: u('photo-1495474472287-4d71bcdd2085'),
};

export const barImagePool = {
  cocktail: u('photo-1519821172141-b5d8342665f0'),
  cocktail2: u('photo-1470337458703-46ad1756a187'),
  bar: u('photo-1544145945-f90425340c7e'),
  beer: u('photo-1546171753-97d7676e4602'),
  wine: u('photo-1414235077428-338989a2e8c0'),
  sunsetDrinks: u('photo-1536935338788-846bb9981813'),
};

export const experienceImagePool = {
  beach: u('photo-1507525428034-b723cf961d3e'),
  island: u('photo-1500375592092-40eb2168fd21'),
  crabMarket: u('photo-1544943910-4c1dc44aab44'),
  nationalPark: u('photo-1441974231531-c6227db76b6e'),
  sunset: u('photo-1493558103817-58b2924bce98'),
  cycling: u('photo-1471506480208-91b3a4cc78be'),
  localFood: u('photo-1559847844-5315695dadae'),
  relaxation: u('photo-1544161515-4ab6ce6db874'),
};

export const lifestyleImages = {
  couple: u('photo-1544148103-0773bf10d330'),
  family: u('photo-1476514525535-07fb3b4ae5f1'),
  ocean: u('photo-1500375592092-40eb2168fd21'),
  aerial: u('photo-1520277739336-7bf67edfa768'),
};
