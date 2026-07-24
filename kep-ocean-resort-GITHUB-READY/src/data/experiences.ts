import type { Experience } from '../types';
import { experienceImagePool } from './images';

export const experiences: Experience[] = [
  { id: 'e1', name: 'Kep Beach Visit', image: experienceImagePool.beach, description: 'Kep\'s quiet main beach is a short ride away — a relaxed spot for a swim or an evening walk.', operatedByResort: false },
  { id: 'e2', name: 'Rabbit Island Trip', image: experienceImagePool.island, description: 'A boat ride to Koh Tonsay (Rabbit Island) for a day of swimming and simple beachside seafood.', operatedByResort: false },
  { id: 'e3', name: 'Kep Crab Market', image: experienceImagePool.crabMarket, description: 'Visit the famous Crab Market to see the daily catch and enjoy fresh crab overlooking the sea.', operatedByResort: false },
  { id: 'e4', name: 'Kep National Park', image: experienceImagePool.nationalPark, description: 'Walking trails through coastal forest with viewpoints over the Gulf of Kep.', operatedByResort: false },
  { id: 'e5', name: 'Sunset Viewing', image: experienceImagePool.sunset, description: 'Watch the sunset from the resort bar or a nearby viewpoint — a highlight of any stay in Kep.', operatedByResort: true },
  { id: 'e6', name: 'Cycling Around Kep', image: experienceImagePool.cycling, description: 'Rent a bicycle to explore Kep\'s quiet coastal roads and old French-era villas at your own pace.', operatedByResort: false },
  { id: 'e7', name: 'Local Food Experiences', image: experienceImagePool.localFood, description: 'Sample Kep\'s renowned crab and pepper dishes at local restaurants around town.', operatedByResort: false },
  { id: 'e8', name: 'Private Relaxation', image: experienceImagePool.relaxation, description: 'Simply relax at the resort — private balcony time, the pool, and quiet garden spaces.', operatedByResort: true },
];
