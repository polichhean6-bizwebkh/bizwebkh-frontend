import type { Villa } from '../types';
import { villaImagePool } from './images';

const amenitiesFull = [
  'Air conditioning', 'Wi-Fi', 'Private bathroom', 'Hot water', 'Television',
  'Mini refrigerator', 'Balcony', 'Sea or garden view', 'Breakfast option', 'Parking', 'Towels', 'Toiletries',
];

const houseRulesDefault = [
  'Check-in from 14:00, check-out by 12:00',
  'No smoking inside villas',
  'Pets are not permitted',
  'Please respect quiet hours from 22:00',
  'Additional guests beyond capacity must be arranged in advance',
];

export const villas: Villa[] = [
  {
    id: 'v1', code: 'KOR-V1', slug: 'ocean-view-villa',
    name: 'Ocean View Villa', type: 'Ocean View',
    shortDescription: 'A bright villa with uninterrupted sea views and a private balcony.',
    fullDescription: 'Wake up to the sound of the waves in our Ocean View Villa, positioned to capture the best sunrise light over the Gulf of Kep. The villa features a private balcony, a spacious king bed, and a calm neutral interior designed to keep the focus on the view outside.',
    images: [villaImagePool[0], villaImagePool[3], villaImagePool[6], villaImagePool[9]],
    maxGuests: 2, beds: '1 King Bed', bathrooms: 1, sizeSqm: 32, view: 'Ocean View',
    amenities: amenitiesFull, houseRules: houseRulesDefault,
    pricePerNight: 78, status: 'Available', cleaningStatus: 'Clean', featured: true,
  },
  {
    id: 'v2', code: 'KOR-V2', slug: 'garden-villa',
    name: 'Garden Villa', type: 'Garden View',
    shortDescription: 'A quiet villa surrounded by tropical greenery, ideal for a peaceful stay.',
    fullDescription: 'Tucked among frangipani trees and coastal palms, the Garden Villa is our most tranquil room. It suits guests who want privacy and shade, with a private outdoor sitting area that opens onto the resort garden.',
    images: [villaImagePool[1], villaImagePool[4], villaImagePool[7], villaImagePool[10]],
    maxGuests: 2, beds: '1 Queen Bed', bathrooms: 1, sizeSqm: 28, view: 'Garden View',
    amenities: amenitiesFull, houseRules: houseRulesDefault,
    pricePerNight: 58, status: 'Occupied', cleaningStatus: 'Clean', currentGuest: 'Sok Dara',
  },
  {
    id: 'v3', code: 'KOR-V3', slug: 'family-villa',
    name: 'Family Villa', type: 'Garden View',
    shortDescription: 'A spacious two-bedroom villa built for families and small groups.',
    fullDescription: 'The Family Villa offers two separate bedrooms and a shared living area, making it the most flexible option at the resort. It comfortably accommodates families or small groups traveling together while keeping the same peaceful garden setting.',
    images: [villaImagePool[2], villaImagePool[5], villaImagePool[8], villaImagePool[11]],
    maxGuests: 5, beds: '1 King Bed + 2 Single Beds', bathrooms: 2, sizeSqm: 48, view: 'Garden View',
    amenities: amenitiesFull, houseRules: houseRulesDefault,
    pricePerNight: 115, status: 'Available', cleaningStatus: 'Clean', featured: true,
  },
  {
    id: 'v4', code: 'KOR-V4', slug: 'deluxe-couple-villa',
    name: 'Deluxe Couple Villa', type: 'Sunset View',
    shortDescription: 'An intimate villa designed for couples, with romantic touches and sunset views.',
    fullDescription: 'Designed with couples in mind, this villa includes a private outdoor soaking area, soft lighting, and unobstructed views toward the sunset. A favorite for anniversaries and honeymoons.',
    images: [villaImagePool[3], villaImagePool[6], villaImagePool[9], villaImagePool[0]],
    maxGuests: 2, beds: '1 King Bed', bathrooms: 1, sizeSqm: 34, view: 'Sunset View',
    amenities: amenitiesFull, houseRules: houseRulesDefault,
    pricePerNight: 92, status: 'Reserved', cleaningStatus: 'Clean',
  },
  {
    id: 'v5', code: 'KOR-V5', slug: 'sunset-villa',
    name: 'Sunset Villa', type: 'Sunset View',
    shortDescription: 'West-facing villa with the resort\'s best vantage point for evening light.',
    fullDescription: 'The Sunset Villa sits at the western edge of the property, giving guests a front-row seat to Kep\'s famous evening skies from a private balcony daybed.',
    images: [villaImagePool[4], villaImagePool[7], villaImagePool[10], villaImagePool[1]],
    maxGuests: 3, beds: '1 King Bed + 1 Single Bed', bathrooms: 1, sizeSqm: 36, view: 'Sunset View',
    amenities: amenitiesFull, houseRules: houseRulesDefault,
    pricePerNight: 88, status: 'Cleaning', cleaningStatus: 'Cleaning',
  },
  {
    id: 'v6', code: 'KOR-V6', slug: 'poolside-villa',
    name: 'Poolside Villa', type: 'Pool View',
    shortDescription: 'Steps from the relaxation pool, with direct pool-facing seating.',
    fullDescription: 'Positioned closest to the resort\'s small relaxation pool, this villa is ideal for guests who want easy access to the water without leaving their private terrace far behind.',
    images: [villaImagePool[5], villaImagePool[8], villaImagePool[11], villaImagePool[2]],
    maxGuests: 2, beds: '1 Queen Bed', bathrooms: 1, sizeSqm: 30, view: 'Pool View',
    amenities: amenitiesFull, houseRules: houseRulesDefault,
    pricePerNight: 68, status: 'Available', cleaningStatus: 'Clean',
  },
  {
    id: 'v7', code: 'KOR-V7', slug: 'tropical-villa',
    name: 'Tropical Villa', type: 'Garden View',
    shortDescription: 'An open, airy villa with natural materials and tropical styling.',
    fullDescription: 'Built with natural wood and woven textures, the Tropical Villa leans into a relaxed island feel with an open-air outdoor shower and a private hammock corner.',
    images: [villaImagePool[6], villaImagePool[9], villaImagePool[0], villaImagePool[3]],
    maxGuests: 3, beds: '1 King Bed + 1 Single Bed', bathrooms: 1, sizeSqm: 34, view: 'Garden View',
    amenities: amenitiesFull, houseRules: houseRulesDefault,
    pricePerNight: 72, status: 'Maintenance', cleaningStatus: 'Clean', maintenanceNote: 'Air conditioning service scheduled',
  },
  {
    id: 'v8', code: 'KOR-V8', slug: 'premium-ocean-villa',
    name: 'Premium Ocean Villa', type: 'Ocean View',
    shortDescription: 'Our largest and most private villa, with panoramic sea views.',
    fullDescription: 'The Premium Ocean Villa is the flagship room at Kep Ocean Resort — the largest footprint, the widest balcony, and the most panoramic sea view on the property. A dedicated choice for guests wanting extra space and privacy.',
    images: [villaImagePool[7], villaImagePool[10], villaImagePool[1], villaImagePool[4]],
    maxGuests: 4, beds: '1 King Bed + 1 Sofa Bed', bathrooms: 2, sizeSqm: 52, view: 'Ocean View',
    amenities: amenitiesFull, houseRules: houseRulesDefault,
    pricePerNight: 145, status: 'Available', cleaningStatus: 'Clean', featured: true,
  },
];

export const getVillaBySlug = (slug: string) => villas.find((v) => v.slug === slug);
export const getVillaById = (id: string) => villas.find((v) => v.id === id);
