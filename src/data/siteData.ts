export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function assetUrl(path: string): string {
  if (!path) return path;
  if (BASE_PATH && path.startsWith('/') && !path.startsWith(`${BASE_PATH}/`)) {
    return `${BASE_PATH}${path}`;
  }
  return path;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  shortDesc: string;
  caption: string;
  category: 'ceremony' | 'addresses' | 'oath' | 'felicitations' | 'portraits';
  categoryLabel: string;
  metaTag: string;
  keywords: string;
  featured?: boolean;
}

export interface HeroSlide {
  src: string;
  badge: string;
  title: string;
  desc: string;
  caption: string;
}

export interface CommitteeMember {
  id: string;
  slug: string;
  name: string;
  role: string;
  organisation?: string;
  title?: string;
  headline?: string;
  supportingLine?: string;
  shortBio?: string;
  metaTitle?: string;
  metaDescription?: string;
  avatar?: string;
  avatarWidth?: number;
  avatarHeight?: number;
  avatarAlt?: string;
  secondaryAvatar?: string;
  secondaryAvatarCaption?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  sameAs?: string[];
  confirmedProfiles?: {
    label: string;
    url: string;
    context?: string;
  }[];
  isChairman?: boolean;
  isOfficeBearer?: boolean;
  biography?: string[];
  chapterRoleSection?: string;
  responsibilities?: {
    num: string;
    title: string;
    description: string;
  }[];
  professionalBackground?: {
    organisation: string;
    role: string;
    category: string;
    description: string;
  }[];
  schemaAffiliations?: {
    name: string;
    url?: string;
  }[];
  istdRoles?: string[];
  careerHighlights?: string[];
  educationAndCredentials?: string[];
  expertiseDomains?: string[];
  featuredPhotos?: {
    src: string;
    title: string;
    caption: string;
    category: string;
  }[];
}

export interface ChapterEvent {
  id: string;
  slug: string;
  status: 'upcoming' | 'past';
  year?: string;
  monthLabel?: string;
  isPostAug2026?: boolean;
  title: string;
  subtitleQuestion?: string;
  programmeType:
    | 'Webinar'
    | 'Workshop'
    | 'Seminar'
    | 'Special Session'
    | '57th Foundation Day Session'
    | 'Conference'
    | 'Chapter Milestone'
    | 'Campus Chapter Milestone';
  date: string;
  timeIST: string;
  venue: string;
  speaker?: string;
  speakerDesignation?: string;
  shortDescription: string;
  fullDescription: string[];
  highlights?: string[];
  image: string;
  imageCaption: string;
  isPosterImage?: boolean;
  registrationAvailable?: boolean;
  brochureUrl?: string;
  recordingUrl?: string;
  hasPhotoGallery?: boolean;
  eventPhotos?: {
    src: string;
    title: string;
    caption: string;
    category: string;
  }[];
}

/**
 * Helper to return Prof. (Dr.) Zakkariya K. A.'s affiliation based on event timeline:
 * Events after August 2026 automatically include "National Vice President, ISTD".
 */
export function getZakkariyaAffiliationForEvent(isPostAug2026 = true): string {
  return isPostAug2026
    ? 'National Vice President, ISTD & Founder-Mentor, ISTD Trichur Chapter'
    : 'Regional Vice President (South), ISTD & Founder-Mentor, ISTD Trichur Chapter (National Vice President, ISTD from Aug 2026)';
}

export const OFFICIAL_LINKS = {
  istdNationalWeb: 'https://www.istd.in/',
  istdNationalMembership: 'https://www.istd.in/',
  istdNationalLinkedin: 'https://www.linkedin.com/school/istd-india/',
  istdTrichurLinkedin: 'https://www.linkedin.com/company/istd-trichur/',
};

export const CHAPTER_CONTACTS = {
  chairman: {
    name: 'Tony Chacko',
    role: 'Chairman',
    designation: 'CEO, Tony & Iby',
    phoneDisplay: '+91 9846101034',
    phoneHref: '+919846101034',
    email: 'tonychacko67@gmail.com',
    linkedin: 'https://www.linkedin.com/in/tony-chacko-965622240/',
  },
  secretary: {
    name: 'Jibin N',
    role: 'Secretary',
    designation: 'IT Professional & Entrepreneur',
    phoneDisplay: '+91 9496839168',
    phoneHref: '+919496839168',
    email: 'jibintcr@gmail.com',
    linkedin: 'https://www.linkedin.com/in/jibintcr/',
  },
  treasurer: {
    name: 'Sneha Rose George',
    role: 'Treasurer',
    designation: 'Research Scholar, CUSAT',
    phoneDisplay: '+91 9496839168',
    phoneHref: '+919496839168',
    email: 'jibintcr@gmail.com',
    linkedin: 'https://www.linkedin.com/in/sneha-rose-george-4176a325/',
  },
  location: 'Trichur, Kerala, India',
  nationalOffice: {
    name: 'ISTD National Office (New Delhi)',
    address:
      'Training House, B-23, Qutab Institutional Area, New Mehrauli Road, New Delhi – 110016',
    email: 'info@istd.in',
    website: 'https://www.istd.in/',
  },
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    src: '/images/ISTDTeamTCR/prof-zakkariya-keynote-podium.jpg',
    badge: 'Founder & Mentor • National Vice President, ISTD',
    title: 'Prof. (Dr.) Zakkariya K. A. Addressing ISTD Trichur Chapter',
    desc: 'Founder & Mentor, ISTD Trichur Chapter & National Vice President, ISTD delivering the keynote address at Hotel Pearl Regency, Trichur',
    caption:
      'Prof. (Dr.) Zakkariya K. A. (Founder & Mentor, ISTD Trichur Chapter & National Vice President, ISTD) addressing the gathering at Hotel Pearl Regency, Trichur.',
  },
  {
    src: '/photos/hero-slide-2.jpg',
    badge: 'Chairman’s Address • ISTD Trichur',
    title: 'Welcome Address by Chapter Chairman Tony Chacko',
    desc: 'Outlining the strategic roadmap and L&D programmes of the ISTD Trichur Diamond Chapter',
    caption:
      'Tony Chacko, Chairman of the ISTD Trichur Chapter, addressing members and delegates at Hotel Pearl Regency, Trichur.',
  },
  {
    src: '/images/ISTDTeamTCR/jibin-n-addressing-inauguration.jpg',
    badge: 'Secretary’s Address • Diamond Chapter',
    title: 'Secretary Jibin N Addressing the Chapter Gathering',
    desc: 'Coordinating professional learning, digital innovation, and member engagement across ISTD Trichur',
    caption:
      'Jibin N, Secretary of ISTD Trichur Chapter, addressing the gathering alongside National Treasurer Shri. Nabaghana Pany and Chairman Tony Chacko at the Diamond Chapter inauguration.',
  },
  {
    src: '/photos/chapter-connect-2026-2.jpg',
    badge: 'Chapter Connect 2026 • Hotel Elite International',
    title: 'ISTD Trichur Chapter Members & Executive Leadership',
    desc: 'Trainers, HR leaders, academicians, and entrepreneurs united at Chapter Connect 2026',
    caption:
      'Official group photograph of ISTD Trichur Chapter office bearers and members during Chapter Connect 2026 at Hotel Elite International, Trichur.',
  },
  {
    src: '/photos/hero-slide-3.jpg',
    badge: 'National Recognition • Diamond Chapter',
    title: 'ISTD National Leaders & Trichur Chapter Office Bearers',
    desc: 'Inaugurated in the 55th milestone year of the Indian Society for Training & Development',
    caption:
      'ISTD National President Shri. Atul Shah, Past National President Dr. Yogesh Kumar Upadhyay, National Treasurer Shri. Nabaghana Pany, Founder & Mentor Prof. (Dr.) Zakkariya K. A., Chairman Tony Chacko, Secretary Jibin N, Treasurer Sneha Rose George, and chapter members.',
  },
];

export const GALLERY_CATEGORIES = [
  { id: 'all', label: 'All Photos', count: 41 },
  { id: 'ceremony', label: 'Inaugural Ceremony', count: 5 },
  { id: 'addresses', label: 'Addresses & Dais', count: 8 },
  { id: 'oath', label: 'Oath of Office', count: 4 },
  { id: 'felicitations', label: 'Felicitations', count: 11 },
  { id: 'portraits', label: 'Group Photographs', count: 13 },
] as const;

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'photo-1',
    src: '/photos/istd-22.jpeg',
    title: 'Lighting of the Ceremonial Lamp by Chapter and National Leaders',
    shortDesc:
      'Chairman Shri. Tony Chacko and Prof. (Dr.) Zakkariya K. A. lighting the lamp in the presence of ISTD National Leaders.',
    caption:
      'Chairman Shri. Tony Chacko and Founder-Mentor Prof. (Dr.) Zakkariya K. A. lighting the ceremonial lamp alongside National President Shri. Atul Shah, National Treasurer Shri. Nabaghana Pany, and Past National President Dr. Yogesh Kumar Upadhyay on 30 March 2026 at Hotel Pearl Regency, Trichur.',
    category: 'ceremony',
    categoryLabel: 'Inaugural Ceremony',
    metaTag: '30 March 2026 • Hotel Pearl Regency, Trichur',
    keywords:
      'lamp lighting nilavilakku tony chacko zakkariya atul shah nabaghana pany yogesh upadhyay inauguration trichur',
    featured: true,
  },
  {
    id: 'photo-new-zakkariya-podium',
    src: '/images/ISTDTeamTCR/prof-zakkariya-keynote-podium.jpg',
    title: 'Keynote Address by Founder & Mentor Prof. (Dr.) Zakkariya K. A.',
    shortDesc:
      'Prof. (Dr.) Zakkariya K. A. delivering the keynote address at Hotel Pearl Regency, Trichur.',
    caption:
      'Prof. (Dr.) Zakkariya K. A. (Founder & Mentor, ISTD Trichur Chapter; National Vice President, ISTD) delivering the keynote address from the podium at Hotel Pearl Regency, Trichur on 30 March 2026.',
    category: 'addresses',
    categoryLabel: 'Addresses & Dais',
    metaTag: '30 March 2026 • Hotel Pearl Regency, Trichur',
    keywords:
      'zakkariya keynote speech podium pearl regency trichur national vice president founder mentor',
    featured: true,
  },
  {
    id: 'photo-new-tony-felicitation',
    src: '/images/ISTDTeamTCR/tony-chacko-national-president-felicitation.jpg',
    title: 'Felicitation of Chairman Shri. Tony Chacko by National President Shri. Atul Shah',
    shortDesc:
      'ISTD National President Shri. Atul Shah felicitating Chapter Chairman Shri. Tony Chacko on stage.',
    caption:
      'ISTD National President Shri. Atul Shah felicitating ISTD Trichur Chapter Chairman Shri. Tony Chacko with a ceremonial shawl as National Treasurer Shri. Nabaghana Pany applauds during the Diamond Chapter Inauguration on 30 March 2026.',
    category: 'felicitations',
    categoryLabel: 'Felicitations',
    metaTag: '30 March 2026 • Hotel Pearl Regency, Trichur',
    keywords:
      'tony chacko chairman atul shah nabaghana pany felicitation shawl trichur',
    featured: true,
  },
  {
    id: 'photo-new-jibin-address',
    src: '/images/ISTDTeamTCR/jibin-n-addressing-inauguration.jpg',
    title: 'Address by Chapter Secretary Jibin N at the Diamond Chapter Inauguration',
    shortDesc:
      'Secretary Jibin N addressing the gathering on stage alongside National and Chapter dignitaries.',
    caption:
      'Jibin N, Secretary of ISTD Trichur Chapter, addressing the gathering during the Diamond Chapter Inauguration on 30 March 2026, flanked by National Treasurer Shri. Nabaghana Pany, Chairman Shri. Tony Chacko, and Cochin Chapter President Shri. Suresh Babu M.',
    category: 'addresses',
    categoryLabel: 'Addresses & Dais',
    metaTag: '30 March 2026 • Hotel Pearl Regency, Trichur',
    keywords:
      'jibin n secretary speech address inauguration trichur tony chacko nabaghana pany',
    featured: true,
  },
  {
    id: 'photo-new-jibin-national',
    src: '/images/ISTDTeamTCR/jibin-n-national-president-felicitation.jpg',
    title: 'Secretary Jibin N Greeted by National President Shri. Atul Shah & National Treasurer Shri. Nabaghana Pany',
    shortDesc:
      'Jibin N (Secretary, ISTD Trichur Chapter) greeted on stage by ISTD National Leaders.',
    caption:
      'Jibin N, Secretary of ISTD Trichur Chapter, shaking hands with National Treasurer Shri. Nabaghana Pany as National President Shri. Atul Shah looks on during the Diamond Chapter Inauguration on 30 March 2026.',
    category: 'felicitations',
    categoryLabel: 'Felicitations',
    metaTag: '30 March 2026 • Hotel Pearl Regency, Trichur',
    keywords:
      'jibin n secretary atul shah nabaghana pany handshake felicitation trichur',
  },
  {
    id: 'photo-new-jibin-zakkariya',
    src: '/images/ISTDTeamTCR/jibin-n-prof-zakkariya-felicitation.jpg',
    title: 'Founder & Mentor Prof. (Dr.) Zakkariya K. A. and Secretary Jibin N on the Inaugural Dais',
    shortDesc:
      'Prof. (Dr.) Zakkariya K. A. and Secretary Jibin N shaking hands as National President Shri. Atul Shah applauds.',
    caption:
      'Founder & Mentor Prof. (Dr.) Zakkariya K. A. and Secretary Jibin N shaking hands on the dais while National President Shri. Atul Shah applauds during the ISTD Trichur Diamond Chapter Inauguration (30 March 2026).',
    category: 'felicitations',
    categoryLabel: 'Felicitations',
    metaTag: '30 March 2026 • Hotel Pearl Regency, Trichur',
    keywords:
      'jibin n zakkariya atul shah handshake felicitation diamond chapter trichur',
  },
  {
    id: 'photo-new-jibin-dignitaries',
    src: '/images/ISTDTeamTCR/jibin-n-dignitaries-meet.jpg',
    title: 'Secretary Jibin N with Academic & Chapter Dignitaries',
    shortDesc:
      'Jibin N with senior academicians and chapter members during the inaugural fellowship.',
    caption:
      'Secretary Jibin N with senior academic leaders and ISTD Trichur Chapter members during the inaugural fellowship gathering at Trichur.',
    category: 'portraits',
    categoryLabel: 'Group Photographs',
    metaTag: '30 March 2026 • Trichur',
    keywords: 'jibin n dignitaries academic leaders group photo trichur',
  },
  {
    id: 'photo-2',
    src: '/photos/istd-in.jpeg',
    title: 'Past National President Dr. Yogesh Kumar Upadhyay Lighting the Lamp',
    shortDesc:
      'Dr. Yogesh Kumar Upadhyay lighting the ceremonial lamp during the inauguration of the ISTD Trichur Chapter.',
    caption:
      'Dr. Yogesh Kumar Upadhyay (Past National President, ISTD) lighting the ceremonial lamp during the Diamond Chapter inauguration on 30 March 2026, alongside Shri. Nabaghana Pany, Shri. Atul Shah, Prof. (Dr.) Zakkariya K. A., and Shri. Tony Chacko.',
    category: 'ceremony',
    categoryLabel: 'Inaugural Ceremony',
    metaTag: '30 March 2026',
    keywords:
      'lamp lighting yogesh kumar upadhyay atul shah nabaghana pany zakkariya tony chacko',
  },
  {
    id: 'photo-3',
    src: '/photos/istd-national-president.jpeg',
    title: 'Presentation of the Diamond Chapter Recognition',
    shortDesc:
      'National President Shri. Atul Shah presenting the Diamond Chapter recognition during the inaugural session.',
    caption:
      'ISTD National President Shri. Atul Shah presenting the Diamond Chapter recognition to Prof. (Dr.) Zakkariya K. A. as National Treasurer Shri. Nabaghana Pany looks on.',
    category: 'ceremony',
    categoryLabel: 'Inaugural Ceremony',
    metaTag: '30 March 2026',
    keywords:
      'atul shah national president charter handover zakkariya nabaghana pany',
  },
  {
    id: 'photo-4',
    src: '/photos/istd-tony-chacko.jpeg',
    title: 'Welcome Address by Chapter Chairman Shri. Tony Chacko',
    shortDesc:
      'Chapter Chairman Shri. Tony Chacko addressing the gathering at Hotel Pearl Regency, Trichur.',
    caption:
      'Shri. Tony Chacko, Chairman of the ISTD Trichur Chapter, delivering the welcome address during the chapter inauguration at Hotel Pearl Regency on 30 March 2026.',
    category: 'addresses',
    categoryLabel: 'Addresses & Dais',
    metaTag: '30 March 2026',
    keywords: 'tony chacko chairman speech address podium pearl regency trichur',
  },
  {
    id: 'photo-5',
    src: '/photos/istd-calicut.jpeg',
    title: 'Dignitaries on the Dais at Hotel Pearl Regency, Trichur',
    shortDesc:
      'National and Regional ISTD leaders seated on the dais during the formal inauguration proceedings.',
    caption:
      'Inaugural dais at Hotel Pearl Regency, Trichur on 30 March 2026 featuring Dr. Yogesh Kumar Upadhyay, Shri. Nabaghana Pany, Shri. Atul Shah, Prof. (Dr.) Zakkariya K. A., and Shri. Tony Chacko.',
    category: 'addresses',
    categoryLabel: 'Addresses & Dais',
    metaTag: '30 March 2026',
    keywords:
      'dais stage banner diamond chapter trichur pearl regency dignitaries',
    featured: true,
  },
  {
    id: 'photo-6',
    src: '/photos/istd-treasurer.jpeg',
    title: 'Address by National Treasurer Shri. Nabaghana Pany',
    shortDesc:
      'Shri. Nabaghana Pany addressing chapter members during the inaugural session.',
    caption:
      'Shri. Nabaghana Pany (National Treasurer, ISTD) addressing the ISTD Trichur Chapter members at Hotel Pearl Regency on 30 March 2026.',
    category: 'addresses',
    categoryLabel: 'Addresses & Dais',
    metaTag: '30 March 2026',
    keywords: 'nabaghana pany national treasurer speech address dais',
  },
  {
    id: 'photo-7',
    src: '/photos/istd-3.jpeg',
    title: 'Administration of the Oath of Office on the Dais',
    shortDesc:
      'National President Shri. Atul Shah administering the oath of office with dignitaries and the Chapter Chairman.',
    caption:
      'National President Shri. Atul Shah administering the oath of office alongside Dr. Yogesh Kumar Upadhyay, Shri. Nabaghana Pany, Prof. (Dr.) Zakkariya K. A., and Chapter Chairman Shri. Tony Chacko.',
    category: 'oath',
    categoryLabel: 'Oath of Office',
    metaTag: '30 March 2026',
    keywords:
      'oath swearing in pledge dais atul shah tony chacko zakkariya nabaghana pany yogesh',
  },
  {
    id: 'photo-8',
    src: '/photos/istd-higher-officials.jpeg',
    title: 'Dignitaries During the Swearing-In Ceremony',
    shortDesc:
      'Shri. Nabaghana Pany, Prof. (Dr.) Zakkariya K. A., and Chairman Shri. Tony Chacko during the oath ceremony.',
    caption:
      'Shri. Nabaghana Pany (National Treasurer, ISTD), Prof. (Dr.) Zakkariya K. A., and Shri. Tony Chacko (Chairman, ISTD Trichur Chapter) during the swearing-in ceremony.',
    category: 'oath',
    categoryLabel: 'Oath of Office',
    metaTag: '30 March 2026',
    keywords:
      'oath pledge higher officials nabaghana pany zakkariya tony chacko',
  },
  {
    id: 'photo-9',
    src: '/photos/istd-audience.jpeg',
    title: 'Chapter Members Taking the Membership Pledge',
    shortDesc:
      'Chapter members and committee representatives standing to take the pledge during the inauguration.',
    caption:
      'ISTD Trichur Chapter members and committee representatives taking the pledge during the inauguration ceremony on 30 March 2026.',
    category: 'oath',
    categoryLabel: 'Oath of Office',
    metaTag: '30 March 2026',
    keywords: 'audience members oath pledge sureshkumar',
  },
  {
    id: 'photo-10',
    src: '/photos/istd-kozhikkod.jpeg',
    title: 'Installation of Office Bearers and Managing Committee Members',
    shortDesc:
      'Secretary Mr. Jibin N and fellow office bearers taking the oath of office.',
    caption:
      'Secretary Mr. Jibin N and fellow office bearers and committee members taking the oath of office during the chapter inauguration on 30 March 2026.',
    category: 'oath',
    categoryLabel: 'Oath of Office',
    metaTag: '30 March 2026',
    keywords: 'jibin secretary oath swearing in members',
  },
  {
    id: 'photo-11',
    src: '/photos/istd-national-tony.jpeg',
    title: 'Memento Presentation to Chapter Chairman Shri. Tony Chacko',
    shortDesc:
      'National President Shri. Atul Shah presenting a memento to Chapter Chairman Shri. Tony Chacko.',
    caption:
      'ISTD National President Shri. Atul Shah presenting a memento to Trichur Chapter Chairman Shri. Tony Chacko, with Founder-Mentor Prof. (Dr.) Zakkariya K. A.',
    category: 'felicitations',
    categoryLabel: 'Felicitations',
    metaTag: '30 March 2026',
    keywords: 'atul shah tony chacko memento felicitation zakkariya',
  },
  {
    id: 'photo-12',
    src: '/photos/istd-sneha.jpeg',
    title: 'Felicitation of Chapter Treasurer Ms. Sneha Rose George',
    shortDesc:
      'Prof. (Dr.) Zakkariya K. A. presenting a memento to Treasurer Ms. Sneha Rose George.',
    caption:
      'Prof. (Dr.) Zakkariya K. A. presenting a token of appreciation to ISTD Trichur Chapter Treasurer Ms. Sneha Rose George.',
    category: 'felicitations',
    categoryLabel: 'Felicitations',
    metaTag: '30 March 2026',
    keywords: 'sneha rose george treasurer zakkariya tony chacko felicitation',
  },
  {
    id: 'photo-13',
    src: '/photos/istd-participants.jpeg',
    title: 'Felicitation of Past National President Dr. Yogesh Kumar Upadhyay',
    shortDesc:
      'Chapter Secretary Mr. Jibin N honouring Past National President Dr. Yogesh Kumar Upadhyay with a ponnada.',
    caption:
      'Chapter Secretary Mr. Jibin N draping a traditional ponnada (shawl) to honour Past National President Dr. Yogesh Kumar Upadhyay during the inauguration ceremony on 30 March 2026.',
    category: 'felicitations',
    categoryLabel: 'Felicitations',
    metaTag: '30 March 2026',
    keywords:
      'jibin secretary yogesh kumar upadhyay ponnada shawl felicitation',
  },
  {
    id: 'photo-14',
    src: '/photos/istd-national-treasurer.jpeg',
    title: 'Felicitation of National Treasurer Shri. Nabaghana Pany',
    shortDesc:
      'Honouring ISTD National Treasurer Shri. Nabaghana Pany with a traditional ponnada on the dais.',
    caption:
      'Honouring ISTD National Treasurer Shri. Nabaghana Pany with a traditional ponnada on the dais, alongside National President Shri. Atul Shah and Dr. Yogesh Kumar Upadhyay.',
    category: 'felicitations',
    categoryLabel: 'Felicitations',
    metaTag: '30 March 2026',
    keywords:
      'nabaghana pany national treasurer ponnada shawl atul shah yogesh',
  },
  {
    id: 'photo-15',
    src: '/photos/istd-zakkria.jpeg',
    title: 'Felicitation of Founder & Mentor Prof. (Dr.) Zakkariya K. A.',
    shortDesc:
      'National President Shri. Atul Shah presenting a memento to Prof. (Dr.) Zakkariya K. A.',
    caption:
      'National President Shri. Atul Shah and National Treasurer Shri. Nabaghana Pany presenting a memento to Prof. (Dr.) Zakkariya K. A.',
    category: 'felicitations',
    categoryLabel: 'Felicitations',
    metaTag: '30 March 2026',
    keywords: 'zakkariya atul shah nabaghana pany memento felicitation',
  },
  {
    id: 'photo-16',
    src: '/photos/tony.jpeg',
    title: 'Presentation of Memento by National President Shri. Atul Shah',
    shortDesc:
      'National President Shri. Atul Shah presenting a token of appreciation during the inaugural ceremony.',
    caption:
      'National President Shri. Atul Shah presenting a memento during the ISTD Trichur Chapter inauguration on 30 March 2026.',
    category: 'felicitations',
    categoryLabel: 'Felicitations',
    metaTag: '30 March 2026',
    keywords: 'atul shah memento felicitation committee leadership',
  },
  {
    id: 'photo-17',
    src: '/photos/istd-national.jpeg',
    title: 'Presentation of Commemorative Framed Artwork',
    shortDesc:
      'National President Shri. Atul Shah presenting a framed memento during the felicitation ceremony.',
    caption:
      'National President Shri. Atul Shah presenting a commemorative framed artwork during the inauguration ceremony on 30 March 2026.',
    category: 'felicitations',
    categoryLabel: 'Felicitations',
    metaTag: '30 March 2026',
    keywords: 'atul shah memento presentation appreciation inauguration',
  },
  {
    id: 'photo-18',
    src: '/photos/istd-zakkariya.jpeg',
    title: 'Presentation of Tokens of Appreciation to Chapter Contributors',
    shortDesc:
      'Prof. (Dr.) Zakkariya K. A. presenting tokens of appreciation during the felicitation segment.',
    caption:
      'Prof. (Dr.) Zakkariya K. A. presenting tokens of appreciation to chapter members and contributors on 30 March 2026.',
    category: 'felicitations',
    categoryLabel: 'Felicitations',
    metaTag: '30 March 2026',
    keywords: 'zakkariya appreciation gift delegates felicitation',
  },
  {
    id: 'photo-19',
    src: '/photos/team-istd.jpeg',
    title: 'Group Photograph of ISTD National Leaders and Trichur Chapter Members',
    shortDesc:
      'ISTD Trichur Chapter members together with ISTD National and Regional office bearers.',
    caption:
      'Shri. Atul Shah, Dr. Yogesh Kumar Upadhyay, Shri. Nabaghana Pany, Prof. (Dr.) Zakkariya K. A., and Chairman Shri. Tony Chacko with the members of the ISTD Trichur Chapter on 30 March 2026.',
    category: 'portraits',
    categoryLabel: 'Group Photographs',
    metaTag: '30 March 2026 • Hotel Pearl Regency, Trichur',
    keywords:
      'group photo team istd national leaders tony chacko zakkariya atul shah nabaghana pany yogesh',
    featured: true,
  },
  {
    id: 'photo-20',
    src: '/photos/team.jpeg',
    title: 'Office Bearers and Managing Committee with National Dignitaries',
    shortDesc:
      'Office bearers and committee members of the Trichur Chapter alongside ISTD National leadership.',
    caption:
      'Treasurer Ms. Sneha Rose George, Secretary Mr. Jibin N, Managing Committee members, National President Shri. Atul Shah, Chairman Shri. Tony Chacko, and Founder-Mentor Prof. (Dr.) Zakkariya K. A.',
    category: 'portraits',
    categoryLabel: 'Group Photographs',
    metaTag: '30 March 2026',
    keywords:
      'team managing committee tony chacko jibin sneha atul shah zakkariya',
  },
  {
    id: 'photo-21',
    src: '/photos/istd.jpeg',
    title: 'ISTD Trichur Chapter Members with National Office Bearers',
    shortDesc:
      'Chapter members and office bearers posing with ISTD National and Regional leaders.',
    caption:
      'Secretary Mr. Jibin N, Managing Committee members, National President Shri. Atul Shah, Chairman Shri. Tony Chacko, Prof. (Dr.) Zakkariya K. A., and Shri. Nabaghana Pany with chapter members.',
    category: 'portraits',
    categoryLabel: 'Group Photographs',
    metaTag: '30 March 2026',
    keywords:
      'istd group portrait jibin tony chacko zakkariya nabaghana pany atul shah',
  },
  {
    id: 'photo-22',
    src: '/photos/istd-participants-group.jpeg',
    title: 'Chapter Office Bearers and Members with National President Shri. Atul Shah',
    shortDesc:
      'Treasurer Ms. Sneha Rose George, Secretary Mr. Jibin N, and chapter members with National President Shri. Atul Shah.',
    caption:
      'Treasurer Ms. Sneha Rose George, Secretary Mr. Jibin N, and Trichur Chapter members with ISTD National President Shri. Atul Shah on 30 March 2026.',
    category: 'portraits',
    categoryLabel: 'Group Photographs',
    metaTag: '30 March 2026',
    keywords: 'participants sneha rose jibin atul shah group',
  },
  {
    id: 'photo-23',
    src: '/photos/istd-tcr-inauguration.jpeg',
    title: 'Interaction Between National President Shri. Atul Shah and Chapter Members',
    shortDesc:
      'National President Shri. Atul Shah in conversation with Trichur Chapter committee members.',
    caption:
      'National President Shri. Atul Shah interacting with Trichur Chapter members during the inaugural meeting on 30 March 2026.',
    category: 'portraits',
    categoryLabel: 'Group Photographs',
    metaTag: '30 March 2026',
    keywords: 'networking candid atul shah inauguration',
  },
  {
    id: 'photo-24',
    src: '/photos/istd-tony.jpeg',
    title: 'Chairman Shri. Tony Chacko and Chapter Members Welcoming Delegates',
    shortDesc:
      'Chairman Shri. Tony Chacko and chapter members prior to the inaugural session at Hotel Pearl Regency.',
    caption:
      'Chairman Shri. Tony Chacko and chapter members welcoming delegates at Hotel Pearl Regency, Trichur on 30 March 2026.',
    category: 'portraits',
    categoryLabel: 'Group Photographs',
    metaTag: '30 March 2026',
    keywords: 'tony chacko leaders fellowship',
  },
  {
    id: 'photo-25',
    src: '/photos/chapter-connect-2026-poster.jpg',
    title: 'Official Poster — Chapter Connect 2026 (Members’ Orientation & Networking Programme)',
    shortDesc:
      'Official poster for ISTD Trichur Chapter Connect 2026 held on 27 June 2026 at Hotel Elite International, Trichur.',
    caption:
      'Official programme poster for ISTD Trichur Chapter Connect 2026 — Inaugural Members’ Orientation & Professional Networking Programme held on 27 June 2026 (10:30 AM to 1:00 PM) at Hotel Elite International, Trichur.',
    category: 'ceremony',
    categoryLabel: 'Chapter Milestones',
    metaTag: '27 June 2026 • Chapter Connect',
    keywords:
      'chapter connect 2026 official poster hotel elite international trichur',
  },
  {
    id: 'photo-26',
    src: '/photos/chapter-connect-2026-banner.jpg',
    title: 'Chapter Connect 2026 Stage Banner — ISTD Trichur Chapter',
    shortDesc:
      'Official stage backdrop banner for Chapter Connect 2026 at Hotel Elite International, Trichur.',
    caption:
      'Official backdrop banner for ISTD Trichur Chapter Connect 2026 — Professional Networking & Member Engagement Forum (27 June 2026, Hotel Elite International).',
    category: 'ceremony',
    categoryLabel: 'Chapter Milestones',
    metaTag: '27 June 2026 • Chapter Connect',
    keywords:
      'chapter connect 2026 stage banner hotel elite international',
  },
  {
    id: 'photo-27',
    src: '/photos/chapter-connect-2026-1.jpg',
    title: 'Chairman Shri. Tony Chacko Addressing Members at Chapter Connect 2026',
    shortDesc:
      'Chairman Shri. Tony Chacko addressing members at Chapter Connect 2026 with Prof. (Dr.) Zakkariya K. A. and office bearers on the dais.',
    caption:
      'Chairman Shri. Tony Chacko addressing members during Chapter Connect 2026 (Members’ Orientation & Professional Networking Programme) at Hotel Elite International, Trichur on 27 June 2026, with Founder & Mentor Prof. (Dr.) Zakkariya K. A., Secretary Jibin N, Treasurer Sneha Rose George, and committee leaders on the dais.',
    category: 'addresses',
    categoryLabel: 'Addresses',
    metaTag: '27 June 2026 • Chapter Connect',
    keywords:
      'chapter connect 2026 tony chacko zakkariya sneha rose jibin hotel elite international',
  },
  {
    id: 'photo-28',
    src: '/photos/chapter-connect-2026-6.jpg',
    title: 'Presidential Address by Chairman Shri. Tony Chacko at Chapter Connect 2026',
    shortDesc:
      'Chapter Chairman Shri. Tony Chacko delivering the presidential & orientation address at Hotel Elite International.',
    caption:
      'Chapter Chairman Shri. Tony Chacko delivering the welcome and orientation address from the podium at Hotel Elite International during Chapter Connect 2026 (27 June 2026).',
    category: 'addresses',
    categoryLabel: 'Addresses',
    metaTag: '27 June 2026 • Chapter Connect',
    keywords:
      'chapter connect 2026 tony chacko presidential address podium',
  },
  {
    id: 'photo-29',
    src: '/photos/chapter-connect-2026-2.jpg',
    title: 'ISTD Trichur Chapter Members Group Photograph at Chapter Connect 2026',
    shortDesc:
      'Group photograph of ISTD Trichur Chapter office bearers and members at Chapter Connect 2026, Hotel Elite International.',
    caption:
      'Official group photograph of ISTD Trichur Chapter office bearers, leadership team, and members during Chapter Connect 2026 at Hotel Elite International, Trichur on 27 June 2026.',
    category: 'portraits',
    categoryLabel: 'Group Photographs',
    metaTag: '27 June 2026 • Chapter Connect',
    keywords:
      'chapter connect 2026 group photo members hotel elite international trichur',
  },
  {
    id: 'photo-30',
    src: '/photos/chapter-connect-2026-3.jpg',
    title: 'Member Orientation Address at Chapter Connect 2026',
    shortDesc:
      'Address at the podium during the Chapter Connect 2026 Members’ Orientation & Networking Programme at Hotel Elite International.',
    caption:
      'Session address during Chapter Connect 2026 at Hotel Elite International, Trichur on 27 June 2026, sharing perspectives on training, consultancy, and chapter collaboration.',
    category: 'addresses',
    categoryLabel: 'Addresses',
    metaTag: '27 June 2026 • Chapter Connect',
    keywords:
      'chapter connect 2026 podium address orientation hotel elite international',
  },
  {
    id: 'photo-31',
    src: '/photos/chapter-connect-2026-4.jpg',
    title: 'Interactive Team-Building & Networking Activity at Chapter Connect 2026',
    shortDesc:
      'Chapter members participating in an interactive team-building and ice-breaking activity at Chapter Connect 2026.',
    caption:
      'ISTD Trichur Chapter members engaging in an interactive team-building and collaborative networking exercise during Chapter Connect 2026 at Hotel Elite International on 27 June 2026.',
    category: 'portraits',
    categoryLabel: 'Chapter Gathering',
    metaTag: '27 June 2026 • Chapter Connect',
    keywords:
      'chapter connect 2026 team building networking activity members',
  },
  {
    id: 'photo-32',
    src: '/photos/chapter-connect-2026-5.jpg',
    title: 'Collaborative Member Presentations & Engagement at Chapter Connect 2026',
    shortDesc:
      'Members sharing insights during the interactive networking activity at Chapter Connect 2026.',
    caption:
      'Chapter members presenting and collaborating during the interactive networking session at Chapter Connect 2026 at Hotel Elite International, Trichur on 27 June 2026.',
    category: 'portraits',
    categoryLabel: 'Chapter Gathering',
    metaTag: '27 June 2026 • Chapter Connect',
    keywords:
      'chapter connect 2026 member presentation engagement collaboration',
  },
  {
    id: 'photo-33',
    src: '/photos/chapter-connect-2026-7.jpg',
    title: 'Member Introduction & Interactive Networking Forum at Chapter Connect 2026',
    shortDesc:
      'Chapter members participating in the interactive stage networking session at Hotel Elite International.',
    caption:
      'Members participating in the interactive introduction and networking forum on stage during Chapter Connect 2026 at Hotel Elite International, Trichur (27 June 2026).',
    category: 'portraits',
    categoryLabel: 'Chapter Gathering',
    metaTag: '27 June 2026 • Chapter Connect',
    keywords:
      'chapter connect 2026 stage networking introduction members',
  },
  {
    id: 'photo-34',
    src: '/photos/chapter-connect-2026-8.jpg',
    title: 'Chapter Connect 2026 Interactive Session in Progress',
    shortDesc:
      'Wide view of members engaging in collaborative discussions and networking at Hotel Elite International.',
    caption:
      'Wide-angle view of the interactive networking session and member engagement activities during Chapter Connect 2026 at Hotel Elite International, Trichur on 27 June 2026.',
    category: 'portraits',
    categoryLabel: 'Chapter Gathering',
    metaTag: '27 June 2026 • Chapter Connect',
    keywords:
      'chapter connect 2026 wide hall session members networking',
  },
  {
    id: 'photo-35',
    src: '/photos/chapter-connect-2026-9.jpg',
    title: 'Main Dais & Venue Setup for Chapter Connect 2026 at Hotel Elite International',
    shortDesc:
      'Conference hall and stage setup for ISTD Trichur Chapter Connect 2026 at Hotel Elite International, Trichur.',
    caption:
      'Main conference hall and dais setup at Hotel Elite International, Trichur for the ISTD Trichur Chapter Connect 2026 Members’ Orientation & Networking Programme (27 June 2026).',
    category: 'ceremony',
    categoryLabel: 'Chapter Milestones',
    metaTag: '27 June 2026 • Chapter Connect',
    keywords:
      'chapter connect 2026 venue stage setup hotel elite international',
  },
];

/**
 * Strict order requested by user:
 * 1. Founder & Mentor (Prof. (Dr.) Zakkariya K. A.)
 * 2. Chairman (Tony Chacko)
 * 3. Secretary (Jibin N)
 * 4. Treasurer (Sneha Rose George)
 */
export const OFFICE_BEARERS: CommitteeMember[] = [
  {
    id: 'member-zakkariya',
    slug: 'prof-dr-zakkariya-k-a',
    name: 'Prof. (Dr.) Zakkariya K. A.',
    role: 'Founder & Mentor',
    organisation: 'ISTD Trichur Chapter',
    title:
      'National Vice President, ISTD & Senior Professor, School of Management Studies, CUSAT',
    headline:
      'Founder & Mentor, ISTD Trichur Chapter • National Vice President, ISTD',
    supportingLine:
      'National Institutional Governance, Higher Education Leadership & Academic–Industry Mentorship',
    shortBio:
      'National Vice President of ISTD and Senior Professor & former Director at the School of Management Studies, CUSAT. Instrumental in founding and mentoring the ISTD Trichur Diamond Chapter.',
    metaTitle:
      'Prof. (Dr.) Zakkariya K. A. | Founder & Mentor & National Vice President | ISTD Trichur Chapter',
    metaDescription:
      'Meet Prof. (Dr.) Zakkariya K. A., Founder & Mentor of ISTD Trichur Chapter, National Vice President of ISTD, and Senior Professor at the School of Management Studies, CUSAT.',
    avatar: '/images/ISTDTeamTCR/zakkariya-ka.jpg',
    avatarWidth: 682,
    avatarHeight: 1024,
    avatarAlt:
      'Prof. (Dr.) Zakkariya K. A., Founder & Mentor of ISTD Trichur Chapter and National Vice President of ISTD',
    secondaryAvatar: '/images/ISTDTeamTCR/zakkariya-ka-2.jpg',
    secondaryAvatarCaption:
      'Prof. (Dr.) Zakkariya K. A. — National Vice President, ISTD & Senior Professor at the School of Management Studies, CUSAT.',
    linkedin: 'https://www.linkedin.com/in/zakkariya-k-a-b28606109/',
    sameAs: ['https://www.linkedin.com/in/zakkariya-k-a-b28606109/'],
    confirmedProfiles: [
      {
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/in/zakkariya-k-a-b28606109/',
        context: 'Official Professional Profile',
      },
    ],
    isChairman: true,
    isOfficeBearer: true,
    biography: [
      'Prof. (Dr.) Zakkariya K. A. is a distinguished academician, institution builder, and Senior Professor of Management at the School of Management Studies (SMS), Cochin University of Science and Technology (CUSAT), Kerala. He serves as the National Vice President of the Indian Society for Training & Development (ISTD), New Delhi (elected August 2026, having previously served as Regional Vice President – South), and is the Founder & Mentor of the ISTD Trichur Diamond Chapter.',
      'With over two decades of academic, research, and administrative leadership, Dr. Zakkariya has served as Director of the School of Management Studies (CUSAT), Founder-Director of the DDU KAUSHAL Kendra (DDUKK) at CUSAT, Director of Students’ Welfare (CUSAT), and Director of the Aligarh Muslim University (AMU) Centre at Malappuram. He was nominated three times to the Syndicate of CUSAT by the Government of Kerala—becoming the youngest-ever Syndicate member in 2003—and is the only university professor in Kerala elected six consecutive times to a University Senate.',
      'An internationally recognized researcher and mentor, he played a pivotal role in integrating CUSAT into a multi-million-euro European Union Erasmus+ Capacity Building project in Higher Education and served as a Guest Researcher at Dresden University of Technology (TU Dresden), Germany (2023). He has co-authored over 100 research papers in leading international journals (Emerald, Taylor & Francis, InderScience, and Sage) and has guided numerous Ph.D. scholars in Organizational Behavior, Human Resource Management, Marketing, and Sustainability.',
    ],
    chapterRoleSection:
      'As Founder & Mentor of ISTD Trichur Chapter and National Vice President of ISTD, Prof. (Dr.) Zakkariya K. A. provides institutional guidance, strategic mentorship, and academic–industry linkage for the chapter’s professional learning initiatives, student chapters, and leadership programmes.',
    responsibilities: [
      {
        num: '01',
        title: 'Founding Vision & Institutional Mentorship',
        description:
          'Guiding the strategic roadmap, governance standards, and long-term institutional development of the ISTD Trichur Diamond Chapter.',
      },
      {
        num: '02',
        title: 'National ISTD Representation & Synergy',
        description:
          'Connecting regional L&D practitioners and academic institutions in Central Kerala with national initiatives of ISTD New Delhi as National Vice President.',
      },
      {
        num: '03',
        title: 'Academic–Industry & Campus Chapter Expansion',
        description:
          'Mentoring university and college student chapters—including the inaugural Student Chapter at Christ College of Engineering (Autonomous)—to bridge theory and workplace practice.',
      },
      {
        num: '04',
        title: 'Research, Faculty & Executive Development',
        description:
          'Fostering scholarly inquiry, management research collaborations, and executive capability development across industry and higher education.',
      },
    ],
    professionalBackground: [
      {
        organisation: 'ISTD Trichur Chapter',
        role: 'Founder & Mentor',
        category: 'Chapter Governance & Mentorship',
        description:
          'Provides strategic guidance and mentorship to the chapter’s office bearers, student chapters, and professional development initiatives.',
      },
      {
        organisation: 'Indian Society for Training & Development (ISTD), New Delhi',
        role: 'National Vice President',
        category: 'National Professional Body Leadership',
        description:
          'Serves as National Vice President of ISTD (from August 2026) after serving as Regional Vice President (South); conferred the ISTD Fellowship (2022–23) and National ISTD Best Member Award.',
      },
      {
        organisation: 'School of Management Studies (SMS), CUSAT',
        role: 'Senior Professor & Former Director',
        category: 'Higher Education & Management Research',
        description:
          'Over two decades of postgraduate teaching, doctoral supervision, and research in Organizational Behavior, Human Resource Management, and Marketing.',
      },
      {
        organisation: 'DDU KAUSHAL Kendra (DDUKK), CUSAT',
        role: 'Founder-Director',
        category: 'Institution Building & Vocational Education',
        description:
          'Established the UGC-funded Centre for Vocational Education at CUSAT and founded the Centre for Employee Empowerment & Skill Acquisition (CEESA) and Centre for Teaching Excellence (CTE).',
      },
    ],
    schemaAffiliations: [
      {
        name: 'Cochin University of Science and Technology (CUSAT)',
      },
      {
        name: 'Indian Society for Training & Development (ISTD)',
        url: 'https://www.istd.in/',
      },
    ],
    istdRoles: [
      'Founder & Mentor, ISTD Trichur Diamond Chapter (Inaugurated 30 March 2026)',
      'National Vice President, Indian Society for Training & Development (ISTD), New Delhi (from August 2026)',
      'Former Regional Vice President (South), ISTD',
      'Past Chairman & Hon. Secretary, ISTD Kochi Chapter',
      'Conferred the prestigious ISTD Fellowship (2022–23) & National ISTD Best Member Award',
      'Chief Guest & Inaugurator, First ISTD Student Chapter at Christ College of Engineering (Autonomous)',
    ],
    careerHighlights: [
      'Senior Professor & Former Director, School of Management Studies (SMS), Cochin University of Science and Technology (CUSAT)',
      'Founder-Director, DDU KAUSHAL Kendra (DDUKK), CUSAT — established the ₹40 Million UGC-funded Centre for Vocational Education (the only university in Kerala selected by the UGC)',
      'Founder, Centre for Employee Empowerment & Skill Acquisition (CEESA) and Centre for Teaching Excellence (CTE) under the EU Erasmus+ project at CUSAT',
      'Guest Researcher, Dresden University of Technology (TU Dresden), Germany (2023) under the European Union Erasmus+ scheme',
      'Three-time Government-nominated Member of the CUSAT Syndicate & six-time consecutively elected Member of the University Senate',
      'Former Director of Students’ Welfare, CUSAT & Former Director, Aligarh Muslim University (AMU) Centre, Malappuram',
      'Published 100+ peer-reviewed papers in high-impact international journals (Emerald, Taylor & Francis, InderScience) and shortlisted for the National Award for Best Teacher (2025)',
    ],
    educationAndCredentials: [
      'Ph.D. in Management — Cochin University of Science and Technology (CUSAT)',
      'Master of Business Administration (MBA) — University of Calicut',
      'Master of Human Resource Management (MHRM) — University of Kerala',
      'M.A. in Psychology (Secured Second Rank) — University of Calicut',
      'Fellow of the Indian Society for Training & Development (ISTD Fellowship, 2022–23)',
    ],
    expertiseDomains: [
      'Organizational Behavior & Leadership',
      'Human Resource Development (HRD)',
      'Institution Building & Higher Education Governance',
      'Workplace Spirituality & Sustainability',
      'Consumer Behavior & Services Marketing',
      'Academic–Industry Collaboration & Vocational Skill Development',
    ],
    featuredPhotos: [
      {
        src: '/images/ISTDTeamTCR/prof-zakkariya-keynote-podium.jpg',
        title: 'Keynote Address at the ISTD Trichur Diamond Chapter Inauguration',
        caption:
          'Prof. (Dr.) Zakkariya K. A. delivering the keynote address at the podium during the Diamond Chapter inauguration at Hotel Pearl Regency, Trichur (30 March 2026).',
        category: 'Keynote Address',
      },
      {
        src: '/photos/istd-national-president.jpeg',
        title: 'Receiving the Diamond Chapter Recognition',
        caption:
          'ISTD National President Shri. Atul Shah presenting the Diamond Chapter recognition to Prof. (Dr.) Zakkariya K. A. on 30 March 2026.',
        category: 'Chapter Milestone',
      },
      {
        src: '/images/ISTDTeamTCR/jibin-n-prof-zakkariya-felicitation.jpg',
        title: 'With Secretary Jibin N and National President Shri. Atul Shah on the Dais',
        caption:
          'Founder & Mentor Prof. (Dr.) Zakkariya K. A. shaking hands with Secretary Jibin N as National President Shri. Atul Shah applauds.',
        category: 'Leadership Fellowship',
      },
      {
        src: '/photos/istd-zakkria.jpeg',
        title: 'Felicitation by ISTD National Leadership',
        caption:
          'National President Shri. Atul Shah and National Treasurer Shri. Nabaghana Pany presenting a memento to Prof. (Dr.) Zakkariya K. A.',
        category: 'Felicitation',
      },
    ],
  },
  {
    id: 'member-tony',
    slug: 'tony-chacko',
    name: 'Tony Chacko',
    role: 'Chairman',
    organisation: 'ISTD Trichur Chapter',
    title: 'CEO & Principal Consultant, Tony & Iby Global Solutions Pvt. Ltd.',
    headline: 'Chairman, ISTD Trichur Chapter',
    supportingLine:
      'Chapter Governance, Corporate Advisory, Institutional Partnerships & Executive Strategy',
    shortBio:
      'Multidisciplinary management consultant, legal advisor, and CEO of Tony & Iby Global Solutions with over 30 years of corporate advisory experience. Leads ISTD Trichur Chapter as Chairman.',
    metaTitle: 'Tony Chacko | Chairman | ISTD Trichur Chapter',
    metaDescription:
      'Meet Tony Chacko, Chairman of ISTD Trichur Chapter, management consultant, legal advisor, and CEO of Tony & Iby Global Solutions Pvt. Ltd.',
    avatar: '/images/ISTDTeamTCR/tony-chacko.jpg',
    avatarWidth: 640,
    avatarHeight: 641,
    avatarAlt: 'Tony Chacko, Chairman of ISTD Trichur Chapter',
    email: 'tonychacko67@gmail.com',
    phone: '+919846101034',
    linkedin: 'https://www.linkedin.com/in/tony-chacko-965622240/',
    sameAs: ['https://www.linkedin.com/in/tony-chacko-965622240/'],
    confirmedProfiles: [
      {
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/in/tony-chacko-965622240/',
        context: 'Official Professional Profile',
      },
    ],
    isChairman: true,
    isOfficeBearer: true,
    biography: [
      'Tony Chacko serves as Chairman of ISTD Trichur Chapter, leading the chapter’s strategic direction, institutional partnerships, corporate outreach, and member engagement across Trichur and Central Kerala.',
      'He is the Founder, CEO, and Principal Consultant of Tony & Iby Global Solutions Private Limited (continuing the management consultancy practice established in 1989 in Trichur). With over three decades of multidisciplinary advisory experience, he works with enterprises, SMEs, startups, and educational institutions across corporate governance, finance, taxation, legal compliance, and organisational development.',
      'Under his chairmanship, ISTD Trichur Chapter was inaugurated as an ISTD Diamond Chapter on 30 March 2026, established its first Student Chapter at Christ College of Engineering (Autonomous), and convened Chapter Connect 2026.',
    ],
    chapterRoleSection:
      'As Chairman, Tony Chacko presides over chapter governance, represents ISTD Trichur Chapter in regional and national forums, and guides institutional collaborations across industry and academia.',
    responsibilities: [
      {
        num: '01',
        title: 'Executive Leadership & Chapter Governance',
        description:
          'Presiding over the Managing Committee and steering the strategic direction of the ISTD Trichur Diamond Chapter.',
      },
      {
        num: '02',
        title: 'Corporate & Industry Outreach',
        description:
          'Building partnerships with corporate enterprises, SMEs, and industry leaders across Trichur and Central Kerala.',
      },
      {
        num: '03',
        title: 'Institutional & Campus Collaborations',
        description:
          'Leading institutional alliances with autonomous colleges and universities to nurture future-ready talent.',
      },
      {
        num: '04',
        title: 'Member Fellowship & Flagship Forums',
        description:
          'Convening chapter milestone programmes such as Chapter Connect 2026 and executive leadership roundtables.',
      },
    ],
    professionalBackground: [
      {
        organisation: 'ISTD Trichur Chapter',
        role: 'Chairman',
        category: 'Chapter Governance & Leadership',
        description:
          'Leads the chapter’s executive committee, institutional collaborations, campus chapters, and professional networking initiatives.',
      },
      {
        organisation: 'Tony & Iby Global Solutions Pvt. Ltd.',
        role: 'Founder, CEO & Principal Consultant',
        category: 'Management, Legal & Financial Consultancy',
        description:
          'Advises enterprises, SMEs, startups, and institutions on corporate strategy, governance, legal compliance, taxation, and organisational transformation.',
      },
    ],
    schemaAffiliations: [
      {
        name: 'Tony & Iby Global Solutions Private Limited',
      },
    ],
    istdRoles: [
      'Chairman, ISTD Trichur Diamond Chapter',
      'Presidential Speaker, First ISTD Student Chapter Inauguration at Christ College of Engineering (Autonomous)',
      'Convenor & Host Chairman, Chapter Connect 2026 — Members’ Orientation & Professional Networking Forum',
      'Lead Institutional Liaison for Corporate & Campus Chapter Partnerships in Central Kerala',
    ],
    careerHighlights: [
      'Founder, CEO & Principal Consultant, Tony & Iby Global Solutions Private Limited, Trichur',
      'Over 30+ years of leadership experience in Management Consultancy, Corporate Law, Taxation, Accounting, and Strategic Advisory (legacy originating in 1989)',
      'Advisor to corporate enterprises, SMEs, startups, and academic institutions on organizational development and regulatory governance',
      'Spearheaded the formation and installation of the ISTD Trichur Diamond Chapter in ISTD’s 55th milestone year',
    ],
    educationAndCredentials: [
      'Executive Post Graduate Programme (EPGP) — Indian Institute of Management (IIM), Kozhikode',
      'Master of Business Administration (MBA in Finance)',
      'Master of Laws (LL.M.) & Bachelor of Laws (LL.B.)',
      'Bachelor of Commerce (B.Com)',
    ],
    expertiseDomains: [
      'Corporate Strategy & Management Consulting',
      'Organizational Leadership & Governance',
      'Corporate Law, Taxation & Financial Advisory',
      'SME & Startup Ecosystem Mentoring',
      'Industry–Academia Institutional Partnerships',
    ],
    featuredPhotos: [
      {
        src: '/images/ISTDTeamTCR/tony-chacko-national-president-felicitation.jpg',
        title: 'Felicitation by ISTD National President Shri. Atul Shah',
        caption:
          'ISTD National President Shri. Atul Shah felicitating Chapter Chairman Shri. Tony Chacko alongside National Treasurer Shri. Nabaghana Pany during the Diamond Chapter Inauguration (30 March 2026).',
        category: 'National Felicitation',
      },
      {
        src: '/photos/istd-tony-chacko.jpeg',
        title: 'Welcome Address at the Chapter Inauguration',
        caption:
          'Chairman Shri. Tony Chacko delivering the welcome address during the Diamond Chapter inauguration at Hotel Pearl Regency, Trichur (30 March 2026).',
        category: 'Presidential Address',
      },
      {
        src: '/photos/chapter-connect-2026-1.jpg',
        title: 'Addressing Members at Chapter Connect 2026',
        caption:
          'Chairman Shri. Tony Chacko addressing members at Chapter Connect 2026 at Hotel Elite International, Trichur (27 June 2026).',
        category: 'Chapter Connect 2026',
      },
    ],
  },
  {
    id: 'member-jibin',
    slug: 'jibin-n',
    name: 'Jibin N',
    role: 'Secretary',
    organisation: 'ISTD Trichur Chapter',
    title: 'Managing Director, NEOM Panels & Founder, Infinio Technology Solutions',
    headline: 'Secretary, ISTD Trichur Chapter',
    supportingLine:
      'Chapter Coordination, Technology & Business Leadership, Work Integrated Learning & Community Initiatives',
    shortBio:
      'Jibin N serves as Secretary of ISTD Trichur Chapter. An IT professional and entrepreneur, his background includes technology, teaching, professional development and community initiatives.',
    metaTitle: 'Jibin N | Secretary | ISTD Trichur Chapter',
    metaDescription:
      'Meet Jibin N, Secretary of ISTD Trichur Chapter, an IT professional and entrepreneur involved in professional learning, teaching and community initiatives.',
    avatar: '/images/team/jibin-n-istd-thrissur-secretary.jpg',
    avatarWidth: 400,
    avatarHeight: 400,
    avatarAlt: 'Jibin N, Secretary of ISTD Trichur Chapter',
    email: 'jibintcr@gmail.com',
    phone: '+919496839168',
    linkedin: 'https://www.linkedin.com/in/jibintcr/',
    sameAs: [
      'https://www.linkedin.com/in/jibintcr/',
      'https://neompanels-new.vercel.app/team/jibin-n',
    ],
    confirmedProfiles: [
      {
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/in/jibintcr/',
        context: 'Professional Network Profile',
      },
      {
        label: 'NEOM Panels',
        url: 'https://neompanels-new.vercel.app/team/jibin-n',
        context: 'Managing Director — Executive Leadership Profile',
      },
    ],
    isOfficeBearer: true,
    biography: [
      'Jibin N serves as Secretary of ISTD Trichur Chapter. An IT professional and entrepreneur, he brings a background spanning information technology, business leadership, teaching and community initiatives.',
      'He is the Founder of Infinio Technology Solutions and Flexon Sports Foundation, and the Managing Director of NEOM Panels, where he guides strategic direction, brand development (Starwoods and NEOM Packing Plywood) and long-term business growth. His academic activities include teaching and evaluation through BITS Pilani’s Work Integrated Learning Programmes.',
      'His involvement with ISTD Trichur Chapter reflects his interest in professional learning, knowledge exchange and connecting people across industry and academia.',
    ],
    chapterRoleSection:
      'As Secretary, Jibin supports the coordination of chapter activities, communication with members and the organisation of professional learning programmes, working with the chapter’s office bearers and committee.',
    responsibilities: [
      {
        num: '01',
        title: 'Chapter Coordination & Governance',
        description:
          'Coordinating executive committee operations, statutory documentation, and chapter activities in alignment with ISTD Trichur Chapter objectives.',
      },
      {
        num: '02',
        title: 'Professional Learning Programmes',
        description:
          'Organising executive webinars, technology and AI learning sessions, and L&D forums for practitioners, educators, and students.',
      },
      {
        num: '03',
        title: 'Member Communication & Engagement',
        description:
          'Facilitating member onboarding, orientation programmes such as Chapter Connect 2026, and collaborative networking across Trichur.',
      },
      {
        num: '04',
        title: 'Industry–Academia & Digital Initiatives',
        description:
          'Connecting corporate leaders, entrepreneurs, and academic institutions while stewarding the chapter’s digital presence.',
      },
    ],
    professionalBackground: [
      {
        organisation: 'ISTD Trichur Chapter',
        role: 'Secretary',
        category: 'Professional Association & Chapter Role',
        description:
          'Supports the coordination of chapter activities, communication with members, and the organisation of professional learning programmes alongside the chapter’s office bearers and committee.',
      },
      {
        organisation: 'NEOM Panels',
        role: 'Managing Director',
        category: 'Enterprise Leadership',
        description:
          'Guides strategic direction, brand development (Starwoods and NEOM Packing Plywood) and business growth, with a focus on digital capabilities, customer experience and B2B relationships.',
      },
      {
        organisation: 'Infinio Technology Solutions',
        role: 'Founder',
        category: 'Information Technology & Business Leadership',
        description:
          'Entrepreneurial leadership in information technology solutions, software systems, digital transformation, and professional mentoring.',
      },
      {
        organisation: 'Flexon Sports Foundation',
        role: 'Founder',
        category: 'Community & Sports Initiatives',
        description:
          'Founder supporting community engagement, youth empowerment, and sustainable sports development initiatives.',
      },
      {
        organisation: 'BITS Pilani Work Integrated Learning Programmes',
        role: 'Teaching & Evaluation',
        category: 'Academic Activity',
        description:
          'Academic teaching and evaluation activities through BITS Pilani’s Work Integrated Learning Programmes (WILP).',
      },
    ],
    schemaAffiliations: [
      {
        name: 'NEOM Panels',
        url: 'https://neompanels-new.vercel.app',
      },
      {
        name: 'Infinio Technology Solutions',
      },
      {
        name: 'Flexon Sports Foundation',
      },
    ],
    expertiseDomains: [
      'Information Technology & Digital Systems',
      'Strategic Direction & Brand Development',
      'Professional Learning & Development (L&D)',
      'Work Integrated Learning & Higher Education',
      'Entrepreneurship & B2B Growth Strategy',
      'Community & Sports Stewardship',
    ],
    featuredPhotos: [
      {
        src: '/images/ISTDTeamTCR/jibin-n-addressing-inauguration.jpg',
        title: 'Addressing the ISTD Trichur Diamond Chapter Inauguration',
        caption:
          'Jibin N, Secretary of ISTD Trichur Chapter, addressing the gathering at Hotel Pearl Regency, Trichur alongside National Treasurer Shri. Nabaghana Pany and Chairman Shri. Tony Chacko (30 March 2026).',
        category: 'Secretary’s Address',
      },
      {
        src: '/images/ISTDTeamTCR/jibin-n-national-president-felicitation.jpg',
        title: 'With ISTD National President Shri. Atul Shah & National Treasurer Shri. Nabaghana Pany',
        caption:
          'Secretary Jibin N greeted on stage by National Treasurer Shri. Nabaghana Pany and National President Shri. Atul Shah during the Diamond Chapter Inauguration (30 March 2026).',
        category: 'National Leadership',
      },
      {
        src: '/images/ISTDTeamTCR/jibin-n-prof-zakkariya-felicitation.jpg',
        title: 'With Founder & Mentor Prof. (Dr.) Zakkariya K. A. on the Inaugural Dais',
        caption:
          'Founder & Mentor Prof. (Dr.) Zakkariya K. A. and Secretary Jibin N shaking hands on stage as National President Shri. Atul Shah applauds (30 March 2026).',
        category: 'Chapter Milestone',
      },
      {
        src: '/images/ISTDTeamTCR/jibin-n-dignitaries-meet.jpg',
        title: 'Fellowship with Academic & Chapter Dignitaries',
        caption:
          'Secretary Jibin N with senior academic leaders and ISTD Trichur Chapter members during the inaugural fellowship gathering.',
        category: 'Leadership Fellowship',
      },
    ],
  },
  {
    id: 'member-sneha',
    slug: 'sneha-rose-george',
    name: 'Sneha Rose George',
    role: 'Treasurer',
    organisation: 'ISTD Trichur Chapter',
    title: 'Research Scholar, School of Management Studies, CUSAT',
    headline: 'Treasurer, ISTD Trichur Chapter',
    supportingLine:
      'Resource Stewardship, Management Research & Academic Programme Coordination',
    shortBio:
      'Management researcher at the School of Management Studies, Cochin University of Science and Technology (CUSAT), serving on the executive leadership of ISTD Trichur Chapter.',
    metaTitle: 'Sneha Rose George | Treasurer | ISTD Trichur Chapter',
    metaDescription:
      'Meet Sneha Rose George, Treasurer of ISTD Trichur Chapter and Research Scholar at the School of Management Studies, Cochin University of Science and Technology (CUSAT).',
    avatar: '/images/ISTDTeamTCR/sneha-rose.jpg',
    avatarWidth: 600,
    avatarHeight: 600,
    avatarAlt: 'Sneha Rose George, Treasurer of ISTD Trichur Chapter',
    linkedin: 'https://www.linkedin.com/in/sneha-rose-george-4176a325/',
    sameAs: ['https://www.linkedin.com/in/sneha-rose-george-4176a325/'],
    confirmedProfiles: [
      {
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/in/sneha-rose-george-4176a325/',
        context: 'Official Professional Profile',
      },
    ],
    isOfficeBearer: true,
    biography: [
      'Sneha Rose George serves on the executive committee of ISTD Trichur Chapter as Treasurer, supporting chapter administration, member engagement, and academic–practitioner programmes.',
      'She is a doctoral Research Scholar at the School of Management Studies (SMS), Cochin University of Science and Technology (CUSAT), Kochi. Her academic research focuses on customer engagement, digital consumer behavior, mobile application adoption, and the role of artificial intelligence in modern services.',
      'Within ISTD Trichur Chapter, she contributes to curating knowledge-sharing sessions, academic dialogues, and student chapter coordination across Trichur and Central Kerala.',
    ],
    chapterRoleSection:
      'As Treasurer on the executive committee of ISTD Trichur Chapter, Sneha Rose George supports chapter administration, resource stewardship, member coordination, and the organisation of academic and professional learning programmes.',
    responsibilities: [
      {
        num: '01',
        title: 'Financial & Resource Stewardship',
        description:
          'Overseeing chapter accounts, budgeting for learning programmes, and maintaining transparent financial governance.',
      },
      {
        num: '02',
        title: 'Academic & Research Forum Curation',
        description:
          'Coordinating management dialogues, Foundation Day sessions, and research-oriented webinars for chapter members.',
      },
      {
        num: '03',
        title: 'Student Chapter & Youth Engagement',
        description:
          'Supporting campus outreach and academic–industry bridging programmes across higher education institutions.',
      },
      {
        num: '04',
        title: 'Member Onboarding & Documentation',
        description:
          'Assisting with membership records, event documentation, and collaborative member orientation sessions.',
      },
    ],
    professionalBackground: [
      {
        organisation: 'ISTD Trichur Chapter',
        role: 'Treasurer',
        category: 'Chapter Governance & Administration',
        description:
          'Supports chapter operations, resource stewardship, member onboarding, and academic–industry learning sessions.',
      },
      {
        organisation: 'School of Management Studies (SMS), CUSAT',
        role: 'Research Scholar',
        category: 'Academic Research',
        description:
          'Conducts doctoral research in management, focusing on digital consumer behavior, customer engagement, and AI in services.',
      },
    ],
    schemaAffiliations: [
      {
        name: 'Cochin University of Science and Technology (CUSAT)',
      },
    ],
    istdRoles: [
      'Treasurer & Executive Office Bearer, ISTD Trichur Diamond Chapter (Installed 30 March 2026)',
      'Programme Coordinator for ISTD Trichur Knowledge Webinars, Foundation Day Sessions & Research Forums',
      'Committee Lead for Member Onboarding, Chapter Connect 2026 & Student Chapter Coordination',
    ],
    careerHighlights: [
      'Doctoral Research Scholar, School of Management Studies (SMS), Cochin University of Science and Technology (CUSAT)',
      'Published and presented management research on Customer Engagement, AI in Consumer Services, and Digital Behavior in reputed academic forums and journals',
      'Active contributor to university-level faculty development, academic conferences, and research methodology workshops',
    ],
    educationAndCredentials: [
      'Doctoral Research Scholar (Ph.D. Programme in Management) — School of Management Studies, CUSAT',
      'Postgraduate Degree in Management / Commerce',
    ],
    expertiseDomains: [
      'Management & Consumer Behavior Research',
      'AI in Services & Digital Engagement',
      'Academic Programme Curation & Coordination',
      'Higher Education & Student Chapter Engagement',
      'Training Documentation & Chapter Governance',
    ],
    featuredPhotos: [
      {
        src: '/photos/istd-sneha.jpeg',
        title: 'Felicitation at the Diamond Chapter Inauguration',
        caption:
          'Prof. (Dr.) Zakkariya K. A. presenting a token of appreciation to Sneha Rose George during the inauguration on 30 March 2026.',
        category: 'Chapter Inauguration',
      },
    ],
  },
];

export const COMMITTEE_MEMBERS: CommitteeMember[] = [];

export const INAUGURATION_DIGNITARIES = [
  {
    name: 'Shri. Atul Shah',
    designation: 'National President, ISTD',
    linkedin: 'https://www.linkedin.com/in/atul-shah-5333b4241/',
    photo: '/photos/istd-national-president.jpeg',
  },
  {
    name: 'Shri. Nabaghana Pany',
    designation: 'National Treasurer, ISTD',
    linkedin: 'https://www.linkedin.com/in/nabaghana-pany-56322019/',
    photo: '/photos/istd-national-treasurer.jpeg',
  },
  {
    name: 'Dr. Yogesh Kumar Upadhyay',
    designation: 'Past National President, ISTD',
    linkedin: 'https://www.linkedin.com/in/dr-yogesh-kumar-upadhyay-694849a/',
    photo: '/photos/istd-participants.jpeg',
  },
  {
    name: 'Prof. (Dr.) Zakkariya K. A.',
    designation:
      'Founder & Mentor, ISTD Trichur Chapter & National Vice President, ISTD',
    linkedin: 'https://www.linkedin.com/in/zakkariya-k-a-b28606109/',
    photo: '/images/ISTDTeamTCR/zakkariya-ka.jpg',
  },
  {
    name: 'Shri. Tony Chacko',
    designation: 'Chairman, ISTD Trichur Chapter',
    linkedin: 'https://www.linkedin.com/in/tony-chacko-965622240/',
    photo: '/photos/istd-tony-chacko.jpeg',
  },
];

export const CHAPTER_CORE_CONTRIBUTORS = [
  {
    name: 'Prof. (Dr.) Zakkariya K. A.',
    role: 'Founder & Mentor (National Vice President, ISTD)',
    linkedin: 'https://www.linkedin.com/in/zakkariya-k-a-b28606109/',
  },
  {
    name: 'Tony Chacko',
    role: 'Chairman',
    linkedin: 'https://www.linkedin.com/in/tony-chacko-965622240/',
  },
  {
    name: 'Jibin N',
    role: 'Secretary',
    linkedin: 'https://www.linkedin.com/in/jibintcr/',
  },
  {
    name: 'Sneha Rose George',
    role: 'Treasurer',
    linkedin: 'https://www.linkedin.com/in/sneha-rose-george-4176a325/',
  },
  { name: 'Mr. Nisam', role: 'Chapter Member & Contributor' },
  { name: 'Dr. Minu Gopal', role: 'Chapter Member & Contributor' },
  { name: 'Dr. Dhanya Alex', role: 'Chapter Member & Contributor' },
  { name: 'Mr. Jobin Kuriakose', role: 'Chapter Member & Contributor' },
  { name: 'Mr. Anil Komban', role: 'Chapter Member & Contributor' },
  { name: 'Ms. Rohini', role: 'Chapter Member & Contributor' },
  { name: 'Mr. Manoj Pushkaran', role: 'Chapter Member & Contributor' },
];

export interface CampusChapter {
  id: string;
  slug: string;
  institutionName: string;
  shortName: string;
  badge: string;
  statusLabel: string;
  location: string;
  posterImage: string;
  posterCaption: string;
  summary: string;
  descriptionParagraphs: string[];
  dignitaries: {
    name: string;
    role: string;
    highlight: string;
    photo?: string;
    linkedin?: string;
  }[];
  focusAreas: {
    title: string;
    description: string;
  }[];
  galleryPhotos: {
    src: string;
    title: string;
    caption: string;
    category: string;
  }[];
}

export const CAMPUS_CHAPTERS: CampusChapter[] = [
  {
    id: 'campus-cce-autonomous',
    slug: 'christ-college-of-engineering',
    institutionName: 'Christ College of Engineering (Autonomous)',
    shortName: 'Christ College of Engineering',
    badge: 'First Student Chapter • ISTD Trichur Chapter',
    statusLabel: 'Inaugural Campus Chapter',
    location: 'Irinjalakuda, Trichur, Kerala',
    posterImage: '/images/campus-chapter-cce.jpg',
    posterCaption:
      'Official Inauguration Poster — ISTD Trichur First Student Chapter at Christ College of Engineering (Autonomous).',
    summary:
      'Inaugurated as the ISTD Trichur Chapter’s first student chapter at Christ College of Engineering (Autonomous), creating a dedicated platform for students to connect academic learning with professional practice, engage with experienced practitioners, and develop as future professionals.',
    descriptionParagraphs: [
      'ISTD Trichur Chapter successfully inaugurated its first student chapter at Christ College of Engineering (Autonomous), marking a major academic-industry milestone for the chapter.',
      'The chapter creates a dedicated space for students to connect academic learning with professional practice, engage with experienced practitioners, and develop as future professionals.',
      'The inaugural program featured an inspiring address by Prof. (Dr.) Zakkariya K. A. (Founder & Mentor, ISTD Trichur Chapter & National Vice President, ISTD), followed by the official inauguration and lighting of the ceremonial lamp. Mr. Tony Chacko, Chairman of the ISTD Trichur Chapter, also addressed the gathering of students and faculty.',
      'Through this association with the students and faculty of Christ College of Engineering (Autonomous), the ISTD Trichur Chapter continues its mission of nurturing future-ready professionals and leaders.',
    ],
    dignitaries: [
      {
        name: 'Prof. (Dr.) Zakkariya K. A.',
        role: 'Founder & Mentor, ISTD Trichur Chapter & National Vice President, ISTD',
        highlight:
          'Inaugural Address, Official Inauguration of the Student Chapter & Lighting of the Ceremonial Lamp',
        photo: '/images/ISTDTeamTCR/zakkariya-ka.jpg',
        linkedin: 'https://www.linkedin.com/in/zakkariya-k-a-b28606109/',
      },
      {
        name: 'Mr. Tony Chacko',
        role: 'Chairman, ISTD Trichur Chapter',
        highlight:
          'Presidential & Chapter Chairman’s Address to the Students and Faculty of Christ College of Engineering',
        photo: '/images/ISTDTeamTCR/tony-chacko.jpg',
        linkedin: 'https://www.linkedin.com/in/tony-chacko-965622240/',
      },
    ],
    focusAreas: [
      {
        title: 'Connecting Academic Learning with Practice',
        description:
          'Bridging engineering and academic curricula with real-world workplace methodologies, organisational dynamics, and applied problem-solving.',
      },
      {
        title: 'Engagement with Experienced Practitioners',
        description:
          'Direct mentorship, expert lectures, and interactive dialogues with industry leaders, L&D heads, and senior professionals from the ISTD network.',
      },
      {
        title: 'Developing Future Professionals',
        description:
          'Cultivating communication, leadership, teamwork, ethical professionalism, and career readiness among student members.',
      },
      {
        title: 'Student-Faculty-Industry Collaboration',
        description:
          'Joint workshops, technical & management forums, research initiatives, and campus-to-corporate developmental programmes.',
      },
    ],
    galleryPhotos: [
      {
        src: '/images/campus-chapter-cce.jpg',
        title:
          'Inauguration of First Student Chapter — Christ College of Engineering (Autonomous)',
        caption:
          'Official announcement poster for the inauguration of the ISTD Trichur Chapter’s First Student Chapter at Christ College of Engineering (Autonomous), featuring addresses by Prof. (Dr.) Zakkariya K. A. and Mr. Tony Chacko (Chairman, ISTD Trichur Chapter).',
        category: 'Campus Chapter Inauguration',
      },
    ],
  },
];

export const ALL_CHAPTER_EVENTS: ChapterEvent[] = [
  {
    id: 'event-campus-cce-inauguration',
    slug: 'christ-college-student-chapter-inauguration',
    status: 'past',
    year: '2026',
    monthLabel: 'September 2026 • Campus Milestone',
    isPostAug2026: true,
    title:
      'Inauguration of First Student Chapter at Christ College of Engineering (Autonomous)',
    programmeType: 'Campus Chapter Milestone',
    date: 'Completed Inaugural Ceremony (Post-August 2026)',
    timeIST: 'Campus Inaugural Session (IST)',
    venue: 'Christ College of Engineering (Autonomous), Irinjalakuda, Trichur',
    speaker:
      'Prof. (Dr.) Zakkariya K. A. (National Vice President, ISTD & Founder-Mentor) & Tony Chacko (Chairman, ISTD Trichur Chapter)',
    speakerDesignation:
      'National Vice President, ISTD & Chairman, ISTD Trichur Chapter',
    shortDescription:
      'Successful inauguration of the ISTD Trichur Chapter’s first student chapter at Christ College of Engineering (Autonomous), featuring the inaugural address and lamp-lighting ceremony by Prof. (Dr.) Zakkariya K. A. (National Vice President, ISTD & Founder-Mentor, ISTD Trichur Chapter) and an address by Tony Chacko (Chairman, ISTD Trichur Chapter).',
    fullDescription: [
      'ISTD Trichur Chapter successfully inaugurated its first student chapter at Christ College of Engineering (Autonomous), establishing a vibrant institutional bridge between academia and industry.',
      'The student chapter creates a dedicated space for students to connect academic learning with professional practice, engage with experienced practitioners, and develop as future professionals.',
      'The inaugural program featured a keynote address by Prof. (Dr.) Zakkariya K. A., National Vice President, ISTD & Founder-Mentor of ISTD Trichur Chapter, followed by the official inauguration of the student chapter and lighting of the ceremonial lamp. Tony Chacko, Chairman of the ISTD Trichur Chapter, also addressed the gathering of faculty members and students.',
      'This milestone marks the beginning of a sustained collaboration with the students and faculty of Christ College of Engineering (Autonomous) through practitioner sessions, leadership forums, and skill-development initiatives.',
    ],
    image: '/images/campus-chapter-cce.jpg',
    imageCaption:
      'Official Poster — Inauguration of ISTD Trichur First Student Chapter at Christ College of Engineering (Autonomous).',
    isPosterImage: true,
    registrationAvailable: false,
    hasPhotoGallery: false,
    eventPhotos: [
      {
        src: '/images/campus-chapter-cce.jpg',
        title:
          'Inauguration of First Student Chapter — Christ College of Engineering (Autonomous)',
        caption:
          'ISTD Trichur First Student Chapter Inauguration at Christ College of Engineering (Autonomous), featuring addresses by Prof. (Dr.) Zakkariya K. A. (National Vice President, ISTD) and Tony Chacko (Chairman, ISTD Trichur Chapter).',
        category: 'Campus Chapter Milestone',
      },
    ],
  },
  {
    id: 'event-aiot-boopathy',
    slug: 'advancing-aiot-research',
    status: 'upcoming',
    year: '2026',
    monthLabel: 'November 2026',
    isPostAug2026: true,
    title:
      'Advancing AIoT Research: From Intelligent Algorithms to Real-World Applications',
    subtitleQuestion:
      'How can intelligent algorithms translate into real-world applications?',
    programmeType: 'Webinar',
    date: '10 November 2026',
    timeIST: '7:00 PM – 8:00 PM IST',
    venue: 'Google Meet (Online Session)',
    speaker: 'Boopathy',
    speakerDesignation: 'CTO, Monzha Research Labs Pvt. Ltd.',
    shortDescription:
      'How can intelligent algorithms translate into real-world applications? Explore the convergence of Artificial Intelligence and the Internet of Things, and how research can connect intelligent algorithms with practical applications.',
    fullDescription: [
      'How can intelligent algorithms translate into real-world applications?',
      'ISTD Trichur Chapter (guided by Founder & Mentor Prof. (Dr.) Zakkariya K. A., National Vice President, ISTD, and Chairman Tony Chacko) invites you to an online session on “Advancing AIoT Research: From Intelligent Algorithms to Real-World Applications.”',
      'Explore the convergence of Artificial Intelligence and the Internet of Things, and how research can connect intelligent algorithms with practical applications.',
      'We welcome researchers, educators, students, and technology professionals to join us for an evening of learning and fresh perspectives on AIoT.',
      'Organised by ISTD Trichur Chapter.',
    ],
    image: '/images/event-aiot-boopathy.jpg',
    imageCaption:
      'Official Event Poster — Advancing AIoT Research: From Intelligent Algorithms to Real-World Applications by Resource Person Boopathy (CTO, Monzha Research Labs Pvt. Ltd.) on 10 November 2026, 7:00 PM – 8:00 PM IST via Google Meet.',
    isPosterImage: true,
    registrationAvailable: true,
    eventPhotos: [
      {
        src: '/images/event-aiot-boopathy.jpg',
        title: 'Official Session Poster — Advancing AIoT Research',
        caption:
          'Online session on “Advancing AIoT Research: From Intelligent Algorithms to Real-World Applications” by Resource Person Boopathy, CTO, Monzha Research Labs Pvt. Ltd. (10 November 2026, 7:00 PM – 8:00 PM IST, Google Meet).',
        category: 'Event Poster',
      },
    ],
  },
  {
    id: 'event-ai-agents',
    slug: 'ai-agents-in-business',
    status: 'past',
    year: '2026',
    monthLabel: 'August 2026',
    isPostAug2026: true,
    title: 'From AI Assistants to AI Agents: The Next Shift in Business',
    programmeType: 'Webinar',
    date: '8 August 2026',
    timeIST: '7:30 PM – 8:30 PM IST',
    venue: 'Online Session',
    speaker: 'Shaheen Siddique',
    speakerDesignation: 'Solutions Consultant, Google Cloud Consulting',
    shortDescription:
      'Artificial intelligence is moving beyond responding to instructions. The next phase is about AI agents that can support decisions, coordinate tasks, and enable more intelligent business workflows.',
    fullDescription: [
      'Artificial intelligence is moving beyond responding to instructions. The next phase is about AI agents that can support decisions, coordinate tasks and enable more intelligent business workflows.',
      'ISTD Trichur Chapter organised an insightful online session with Shaheen Siddique, Solutions Consultant, Google Cloud Consulting, exploring this evolving shift and what it means for businesses.',
    ],
    image: '/images/event-ai-agents.jpg',
    imageCaption:
      'Official Event Poster — From AI Assistants to AI Agents: The Next Shift in Business with Shaheen Siddique (Solutions Consultant, Google Cloud Consulting) on 8 August 2026, 7:30 PM – 8:30 PM IST.',
    isPosterImage: true,
    hasPhotoGallery: false,
    eventPhotos: [
      {
        src: '/images/event-ai-agents.jpg',
        title: 'Official Session Poster — From AI Assistants to AI Agents',
        caption:
          'Online session on “From AI Assistants to AI Agents: The Next Shift in Business” with Shaheen Siddique, Solutions Consultant, Google Cloud Consulting (8 August 2026, 7:30 PM – 8:30 PM IST).',
        category: 'Event Poster',
      },
    ],
  },
  {
    id: 'event-healthy-habits',
    slug: 'healthy-habits-of-high-performers',
    status: 'past',
    year: '2026',
    monthLabel: 'July 2026',
    isPostAug2026: false,
    title: 'Healthy Habits of High Performers',
    programmeType: 'Special Session',
    date: '25 July 2026',
    timeIST: '7:30 PM – 8:30 PM IST',
    venue: 'Online Session',
    speaker: 'Dr. Ashik Kareem',
    speakerDesignation:
      'Serial Entrepreneur | Speaker on Performance, Mindset & Wellness',
    shortDescription:
      'High performance is not only about working harder—it is about building the right habits, maintaining energy, strengthening mindset, and creating routines that support long-term personal and professional growth.',
    fullDescription: [
      'ISTD Trichur Chapter organised a special session on “Healthy Habits of High Performers” with Dr. Ashik Kareem (Serial Entrepreneur | Speaker on Performance, Mindset & Wellness).',
      'High performance is not only about working harder. It is about building the right habits, maintaining energy, strengthening mindset, and creating routines that support long-term personal and professional growth.',
      'This session offered practical insights into discipline, wellness, mindset, energy management, and sustainable performance, helping participants understand how consistent healthy habits can improve focus, resilience, and overall effectiveness.',
    ],
    image: '/images/event-healthy-habits.jpg',
    imageCaption:
      'Official Event Poster — Healthy Habits of High Performers with Dr. Ashik Kareem (Serial Entrepreneur | Speaker on Performance, Mindset & Wellness) on 25 July 2026, 7:30 PM – 8:30 PM IST.',
    isPosterImage: true,
    hasPhotoGallery: false,
    eventPhotos: [
      {
        src: '/images/event-healthy-habits.jpg',
        title: 'Official Session Poster — Healthy Habits of High Performers',
        caption:
          'Special session on “Healthy Habits of High Performers” with Dr. Ashik Kareem, Serial Entrepreneur & Speaker on Performance, Mindset & Wellness (25 July 2026, 7:30 PM – 8:30 PM IST).',
        category: 'Event Poster',
      },
    ],
  },
  {
    id: 'event-chapter-connect-2026',
    slug: 'chapter-connect-2026',
    status: 'past',
    year: '2026',
    monthLabel: 'June 2026',
    isPostAug2026: false,
    title:
      'Chapter Connect 2026 — Members’ Orientation & Professional Networking Programme',
    subtitleQuestion: 'Connect. Collaborate. Grow.',
    programmeType: 'Special Session',
    date: '27 June 2026',
    timeIST: '10:30 AM – 1:00 PM IST',
    venue: 'Hotel Elite International, Trichur',
    speaker:
      'Prof. (Dr.) Zakkariya K. A. (Founder & Mentor), Tony Chacko (Chairman) & Chapter Leadership Team',
    speakerDesignation:
      'Members’ Orientation & Professional Networking Forum • ISTD Trichur Chapter',
    shortDescription:
      'A dedicated members’ orientation and professional networking programme hosted by the ISTD Trichur Chapter at Hotel Elite International, focused on connection, collaboration, and chapter engagement.',
    fullDescription: [
      'ISTD Trichur Chapter hosted Chapter Connect 2026, a members’ orientation and professional networking programme focused on connection, collaboration, and chapter engagement.',
      'The programme was designed to bring members together to understand the chapter’s vision, explore upcoming initiatives, and build meaningful professional relationships within the ISTD community.',
      'Held on 27 June 2026 from 10:30 AM to 1:00 PM at Hotel Elite International, Trichur, the session featured leadership addresses by Prof. (Dr.) Zakkariya K. A. (Founder & Mentor, ISTD Trichur Chapter; subsequently elected National Vice President, ISTD in August 2026) and Tony Chacko (Chairman, ISTD Trichur Chapter), member introductions, interactive team-building exercises, and collaborative discussions under the theme “Connect. Collaborate. Grow.”',
    ],
    image: '/photos/chapter-connect-2026-poster.jpg',
    imageCaption:
      'Official Event Poster — Chapter Connect 2026 (Members’ Orientation & Professional Networking Programme) held on 27 June 2026 from 10:30 AM to 1:00 PM at Hotel Elite International, Trichur.',
    isPosterImage: false,
    registrationAvailable: false,
    hasPhotoGallery: true,
    eventPhotos: [
      {
        src: '/photos/chapter-connect-2026-poster.jpg',
        title: 'Official Programme Poster — Chapter Connect 2026',
        caption:
          'Official poster for ISTD Trichur Chapter Connect 2026 — Inaugural Members’ Orientation & Networking Programme held on 27 June 2026 (10:30 AM to 1:00 PM) at Hotel Elite International, Trichur.',
        category: 'Event Poster',
      },
      {
        src: '/photos/chapter-connect-2026-banner.jpg',
        title: 'Chapter Connect 2026 Official Stage Banner',
        caption:
          'Official stage banner for ISTD Trichur Chapter Connect 2026 — Professional Networking & Member Engagement Forum (27 June 2026, Hotel Elite International).',
        category: 'Stage Banner',
      },
      {
        src: '/photos/chapter-connect-2026-1.jpg',
        title: 'Chairman Tony Chacko Addressing Chapter Connect 2026',
        caption:
          'Chairman Tony Chacko addressing members from the podium at Hotel Elite International during Chapter Connect 2026 (27 June 2026), with Founder-Mentor Prof. (Dr.) Zakkariya K. A., Secretary Jibin N, Treasurer Sneha Rose George, and committee leaders on the dais.',
        category: 'Leadership Address',
      },
      {
        src: '/photos/chapter-connect-2026-6.jpg',
        title: 'Presidential Address by Chairman Tony Chacko',
        caption:
          'Chapter Chairman Tony Chacko delivering the orientation and welcome address at Hotel Elite International during Chapter Connect 2026.',
        category: 'Leadership Address',
      },
      {
        src: '/photos/chapter-connect-2026-2.jpg',
        title:
          'Group Photograph of ISTD Trichur Chapter Members at Chapter Connect 2026',
        caption:
          'Official group photograph of ISTD Trichur Chapter office bearers and members during Chapter Connect 2026 at Hotel Elite International, Trichur on 27 June 2026.',
        category: 'Group Photograph',
      },
      {
        src: '/photos/chapter-connect-2026-3.jpg',
        title: 'Member Orientation & Knowledge Sharing Address',
        caption:
          'Session address at the podium during Chapter Connect 2026 at Hotel Elite International, Trichur (27 June 2026).',
        category: 'Orientation Session',
      },
      {
        src: '/photos/chapter-connect-2026-4.jpg',
        title: 'Interactive Team-Building & Ice-Breaking Activity',
        caption:
          'Chapter members participating in an interactive team-building and networking activity during Chapter Connect 2026 at Hotel Elite International.',
        category: 'Member Engagement',
      },
      {
        src: '/photos/chapter-connect-2026-5.jpg',
        title: 'Collaborative Group Presentations by Chapter Members',
        caption:
          'Members sharing insights and collaborating during the interactive networking activity at Chapter Connect 2026 (27 June 2026).',
        category: 'Networking Forum',
      },
      {
        src: '/photos/chapter-connect-2026-7.jpg',
        title: 'Interactive Stage Networking & Member Introductions',
        caption:
          'Members participating in the interactive stage introduction and networking session at Hotel Elite International during Chapter Connect 2026.',
        category: 'Networking Forum',
      },
      {
        src: '/photos/chapter-connect-2026-8.jpg',
        title: 'Wide View of Chapter Connect 2026 Interactive Session',
        caption:
          'Chapter members engaging in collaborative discussions and networking activities at Hotel Elite International, Trichur (27 June 2026).',
        category: 'Member Engagement',
      },
      {
        src: '/photos/chapter-connect-2026-9.jpg',
        title: 'Main Conference Hall & Dais Setup at Hotel Elite International',
        caption:
          'Main conference hall and dais prepared for Chapter Connect 2026 at Hotel Elite International, Trichur.',
        category: 'Venue & Dais',
      },
    ],
  },
  {
    id: 'event-future-ld',
    slug: 'future-of-ld-ai-ecosystems',
    status: 'past',
    year: '2026',
    monthLabel: 'April 2026',
    isPostAug2026: false,
    title: 'Future of L&D: Building Intelligent Learning Ecosystems with AI',
    programmeType: '57th Foundation Day Session',
    date: 'Saturday, 11 April 2026',
    timeIST: '7:00 PM IST',
    venue: 'Google Meet (Online Session)',
    speaker: 'Sreekanth D, Ph.D',
    speakerDesignation: 'Head - Knowledge Office, ICT Academy of Kerala',
    shortDescription:
      'Organised as part of the 57th ISTD Foundation Day celebrations, exploring how Artificial Intelligence is transforming Learning and Development through intelligent, adaptive, and future-ready learning ecosystems.',
    fullDescription: [
      'The ISTD Trichur Chapter, as part of the 57th ISTD Foundation Day celebrations of the Indian Society for Training & Development (ISTD), organised a special session on “Future of L&D: Building Intelligent Learning Ecosystems with AI.”',
      'The session was led by Sreekanth D, Ph.D, Head - Knowledge Office, ICT Academy of Kerala, and explored how Artificial Intelligence is transforming Learning and Development through more intelligent, adaptive, and future-ready learning ecosystems.',
      'This session brought together trainers, educators, HR professionals, learning leaders, and students to understand the evolving role of AI in the future of learning.',
    ],
    image: '/images/event-future-ld.jpg',
    imageCaption:
      'Official Event Poster — Future of L&D: Building Intelligent Learning Ecosystems with AI led by Dr. Sreekanth D (Head - Knowledge Office, ICT Academy of Kerala) on Saturday, 11 April 2026 at 7:00 PM IST via Google Meet.',
    isPosterImage: true,
    hasPhotoGallery: false,
    eventPhotos: [
      {
        src: '/images/event-future-ld.jpg',
        title:
          'Official Session Poster — Future of L&D: Building Intelligent Learning Ecosystems with AI',
        caption:
          '57th ISTD Foundation Day special session led by Dr. Sreekanth D, Head - Knowledge Office, ICT Academy of Kerala (Saturday, 11 April 2026 at 7:00 PM IST, Google Meet).',
        category: 'Event Poster',
      },
    ],
  },
  {
    id: 'event-inauguration-2026',
    slug: 'inauguration',
    status: 'past',
    year: '2026',
    monthLabel: 'March 2026',
    isPostAug2026: false,
    title:
      'ISTD Trichur Chapter Inaugurated as Diamond Chapter in ISTD’s 55th Year',
    programmeType: 'Chapter Milestone',
    date: '30 March 2026',
    timeIST: 'Inaugural Session (IST)',
    venue: 'Hotel Pearl Regency, Trichur',
    speaker:
      'Shri. Atul Shah (National President, ISTD), Prof. (Dr.) Zakkariya K. A. (Regional Vice President – South, ISTD; Founder-Mentor) & Dignitaries',
    speakerDesignation:
      'ISTD National Leadership & ISTD Trichur Chapter Office Bearers',
    shortDescription:
      'Official inauguration of the ISTD Trichur Chapter as the Diamond Chapter of the Indian Society for Training & Development (ISTD) in its 55th year, together with the installation of office bearers.',
    fullDescription: [
      'We are pleased to share the successful inauguration of the ISTD Trichur Chapter on 30 March 2026, marking the establishment of the Diamond Chapter of the Indian Society for Training & Development (ISTD) in its 55th year.',
      'The launch of the Trichur Chapter reflects a collective commitment to strengthening the training and development ecosystem by creating a professional platform for learning, knowledge exchange, collaboration, and leadership development.',
      'The chapter is envisioned as a space that brings together trainers, educators, HR professionals, academicians, and industry leaders to contribute meaningfully to professional growth in the region.',
      'The successful formation and inauguration of the chapter, along with the strong membership response and installation of office bearers, reflect the dedication, coordination, and shared vision of everyone involved in this initiative.',
      'The ISTD Trichur Chapter begins its journey with a clear purpose: to support professional excellence in training, learning, and human resource development through meaningful engagement and sustained collaboration.',
    ],
    image: '/photos/istd-22.jpeg',
    imageCaption:
      'Chairman Tony Chacko and Founder-Mentor Prof. (Dr.) Zakkariya K. A. lighting the ceremonial lamp alongside National President Shri. Atul Shah, National Treasurer Shri. Nabaghana Pany, and Past National President Dr. Yogesh Kumar Upadhyay on 30 March 2026.',
    hasPhotoGallery: true,
  },
];
