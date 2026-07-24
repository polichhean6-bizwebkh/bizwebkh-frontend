// =============================================================================
// RESORT CONFIGURATION — single source of truth for editable business content.
// BizWeb KH: update resort name, contact info, policies, and hero copy here.
// This file is consumed across the public site and dashboard "Website Content"
// module so client edits never require touching component code.
// =============================================================================

export const resortConfig = {
  name: 'Kep Ocean Resort',
  shortName: 'Kep Ocean',
  tagline: 'A Peaceful Escape by the Sea',
  logoInitials: 'KOR',

  hero: {
    title: 'Your Peaceful Escape by the Sea',
    subtitle:
      'Relax in a private villa, enjoy fresh food and refreshing drinks, and experience the natural beauty of Kep.',
  },

  about: {
    story:
      'Kep Ocean Resort was created around a simple idea: a small number of private villas, cared for personally, in one of the most peaceful corners of the Cambodian coast. With only 8 villas, we are able to give every guest genuine, attentive hospitality rather than the anonymous scale of a large hotel.',
    mission:
      'Our mission is to offer a calm, natural, and welcoming retreat where couples, families, and small groups can slow down, enjoy fresh local food, and reconnect with the coastline of Kep.',
    values: [
      'Personal, attentive hospitality — never anonymous',
      'Respect for Kep’s natural coastline and quiet character',
      'Fresh, honest food sourced locally where possible',
      'A peaceful setting suitable for couples and families alike',
    ],
  },

  contact: {
    addressLine1: 'Kep Coastal Road',
    addressLine2: 'Kep, Cambodia (exact address to be confirmed by client)',
    phone: '+855 12 345 678',
    telegram: '@KepOceanResort',
    whatsapp: '+855 12 345 678',
    email: 'info@kepoceanresort.com',
    facebook: 'facebook.com/kepoceanresort',
    mapsQuery: 'Kep, Cambodia',
    checkIn: '14:00',
    checkOut: '12:00',
  },

  policies: {
    cancellation:
      'Free cancellation up to 3 days before check-in. Cancellations within 3 days of arrival forfeit the deposit. This is placeholder policy text for client review.',
    depositPercent: 30,
    taxPercent: 0,
    serviceChargePercent: 5,
    currency: 'USD',
    secondaryCurrency: 'KHR',
    khrExchangeRate: 4100,
    confirmationMessage:
      'Thank you for choosing Kep Ocean Resort. Your booking request has been received. Our team will contact you to confirm villa availability and payment details.',
  },

  social: {
    facebook: 'https://facebook.com/kepoceanresort',
    instagram: 'https://instagram.com/kepoceanresort',
    telegram: 'https://t.me/kepoceanresort',
  },
};

export const demoDisclaimer =
  'This is a frontend concept and booking-system demonstration prepared for client review. Production booking operations require a secure backend, database, authentication, notification services, data protection, backups, and appropriate payment integration.';
