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
  name: string;
  role: string;
  title?: string;
  avatar?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  isChairman?: boolean;
  isOfficeBearer?: boolean;
}

export interface ChapterEvent {
  id: string;
  slug: string;
  status: 'upcoming' | 'past';
  title: string;
  subtitleQuestion?: string;
  programmeType: 'Webinar' | 'Workshop' | 'Seminar' | 'Conference' | 'Chapter Milestone';
  date: string;
  timeIST: string;
  venue: string;
  speaker?: string;
  speakerDesignation?: string;
  shortDescription: string;
  fullDescription: string[];
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
    name: 'Sneha Rose George',
    role: 'Secretary',
    designation: 'Research Scholar, CUSAT',
    linkedin: 'https://www.linkedin.com/in/sneha-rose-george-4176a325/',
  },
  treasurer: {
    name: 'Jibin N',
    role: 'Treasurer',
    designation: 'Technology Director & Consultant',
    phoneDisplay: '+91 9496839168',
    phoneHref: '+919496839168',
    email: 'jibintcr@gmail.com',
    linkedin: 'https://www.linkedin.com/in/jibintcr/',
  },
  location: 'Thrissur, Kerala, India',
  nationalOffice: {
    name: 'ISTD National Office (New Delhi)',
    address: 'Training House, B-23, Qutab Institutional Area, New Mehrauli Road, New Delhi – 110016',
    email: 'info@istd.in',
    website: 'https://www.istd.in/',
  },
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    src: '/photos/hero-slide-1.jpg',
    badge: 'Keynote Address • Thrissur Chapter',
    title: 'Prof. (Dr.) Zakkariya K A Addressing the Gathering',
    desc: 'Regional Vice President (South), ISTD speaking at the Thrissur Chapter',
    caption:
      'Prof. (Dr.) Zakkariya K A (Regional Vice President – South, ISTD) addressing the gathering at Hotel Pearl Regency, Thrissur.',
  },
  {
    src: '/photos/hero-slide-2.jpg',
    badge: 'Chairman’s Address • Thrissur Chapter',
    title: 'Welcome Address by Chapter Chairman Shri. Tony Chacko',
    desc: 'Outlining the vision and programmes of the ISTD Thrissur Chapter',
    caption:
      'Shri. Tony Chacko, Chairman of the ISTD Thrissur Chapter, addressing members and delegates at Hotel Pearl Regency, Thrissur.',
  },
  {
    src: '/photos/hero-slide-3.jpg',
    badge: 'Chapter Leadership & Dignitaries',
    title: 'ISTD National Leaders & Thrissur Chapter Managing Committee',
    desc: 'National and Regional ISTD leaders alongside the Thrissur Chapter Office Bearers and Committee',
    caption:
      'ISTD National President Shri. Atul Shah, Past National President Dr. Yogesh Kumar Upadhyay, National Treasurer Shri. Nabaghana Pany, Regional VP (South) Prof. (Dr.) Zakkariya K A, Chairman Shri. Tony Chacko, Secretary Ms. Sneha Rose George, Treasurer Mr. Jibin N, and committee members.',
  },
  {
    src: '/photos/hero-slide-4.jpg',
    badge: 'Oath of Office • Thrissur Chapter',
    title: 'Installation & Oath of Office of Chapter Members',
    desc: 'Office bearers and members taking the oath of commitment to Training & Development',
    caption:
      'Chapter office bearers and managing committee members taking the formal oath of office during the installation ceremony in Thrissur.',
  },
];

export const GALLERY_CATEGORIES = [
  { id: 'all', label: 'All Photos', count: 24 },
  { id: 'ceremony', label: 'Inaugural Ceremony', count: 3 },
  { id: 'addresses', label: 'Addresses & Dais', count: 3 },
  { id: 'oath', label: 'Oath of Office', count: 4 },
  { id: 'felicitations', label: 'Felicitations', count: 8 },
  { id: 'portraits', label: 'Group Photographs', count: 6 },
] as const;

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'photo-1',
    src: '/photos/istd-22.jpeg',
    title: 'Lighting of the Ceremonial Lamp by Chapter and Regional Leaders',
    shortDesc:
      'Chairman Shri. Tony Chacko and Regional Vice President Prof. (Dr.) Zakkariya K A lighting the lamp in the presence of ISTD National Leaders.',
    caption:
      'Chairman Shri. Tony Chacko and Regional Vice President (South) Prof. (Dr.) Zakkariya K A lighting the ceremonial lamp alongside National President Shri. Atul Shah, National Treasurer Shri. Nabaghana Pany, and Past National President Dr. Yogesh Kumar Upadhyay on 30 March 2026.',
    category: 'ceremony',
    categoryLabel: 'Inaugural Ceremony',
    metaTag: '30 March 2026 • Hotel Pearl Regency',
    keywords: 'lamp lighting nilavilakku tony chacko zakkariya atul shah nabaghana pany yogesh upadhyay inauguration',
    featured: true,
  },
  {
    id: 'photo-2',
    src: '/photos/istd-in.jpeg',
    title: 'Past National President Dr. Yogesh Kumar Upadhyay Lighting the Lamp',
    shortDesc:
      'Dr. Yogesh Kumar Upadhyay lighting the ceremonial lamp during the inauguration of the ISTD Thrissur Chapter.',
    caption:
      'Dr. Yogesh Kumar Upadhyay (Past National President, ISTD) lighting the ceremonial lamp during the Diamond Chapter inauguration on 30 March 2026, alongside Shri. Nabaghana Pany, Shri. Atul Shah, Prof. (Dr.) Zakkariya K A, and Shri. Tony Chacko.',
    category: 'ceremony',
    categoryLabel: 'Inaugural Ceremony',
    metaTag: '30 March 2026',
    keywords: 'lamp lighting yogesh kumar upadhyay atul shah nabaghana pany zakkariya tony chacko',
  },
  {
    id: 'photo-3',
    src: '/photos/istd-national-president.jpeg',
    title: 'Presentation of the Diamond Chapter Recognition',
    shortDesc:
      'National President Shri. Atul Shah presenting the Diamond Chapter recognition during the inaugural session.',
    caption:
      'ISTD National President Shri. Atul Shah presenting the Diamond Chapter recognition to Regional Vice President (South) Prof. (Dr.) Zakkariya K A as National Treasurer Shri. Nabaghana Pany looks on.',
    category: 'ceremony',
    categoryLabel: 'Inaugural Ceremony',
    metaTag: '30 March 2026',
    keywords: 'atul shah national president charter handover zakkariya nabaghana pany',
  },
  {
    id: 'photo-4',
    src: '/photos/istd-tony-chacko.jpeg',
    title: 'Welcome Address by Chapter Chairman Shri. Tony Chacko',
    shortDesc:
      'Chapter Chairman Shri. Tony Chacko addressing the gathering at Hotel Pearl Regency, Thrissur.',
    caption:
      'Shri. Tony Chacko, Chairman of the ISTD Thrissur Chapter, delivering the welcome address during the chapter inauguration at Hotel Pearl Regency on 30 March 2026.',
    category: 'addresses',
    categoryLabel: 'Addresses & Dais',
    metaTag: '30 March 2026',
    keywords: 'tony chacko chairman speech address podium pearl regency',
  },
  {
    id: 'photo-5',
    src: '/photos/istd-calicut.jpeg',
    title: 'Dignitaries on the Dais at Hotel Pearl Regency, Thrissur',
    shortDesc:
      'National and Regional ISTD leaders seated on the dais during the formal inauguration proceedings.',
    caption:
      'Inaugural dais at Hotel Pearl Regency, Thrissur on 30 March 2026 featuring Dr. Yogesh Kumar Upadhyay, Shri. Nabaghana Pany, Shri. Atul Shah, Prof. (Dr.) Zakkariya K A, and Shri. Tony Chacko.',
    category: 'addresses',
    categoryLabel: 'Addresses & Dais',
    metaTag: '30 March 2026',
    keywords: 'dais stage banner diamond chapter trichur pearl regency dignitaries',
    featured: true,
  },
  {
    id: 'photo-6',
    src: '/photos/istd-treasurer.jpeg',
    title: 'Address by National Treasurer Shri. Nabaghana Pany',
    shortDesc:
      'Shri. Nabaghana Pany addressing chapter members during the inaugural session.',
    caption:
      'Shri. Nabaghana Pany (National Treasurer, ISTD) addressing the ISTD Thrissur Chapter members at Hotel Pearl Regency on 30 March 2026.',
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
      'National President Shri. Atul Shah administering the oath of office alongside Dr. Yogesh Kumar Upadhyay, Shri. Nabaghana Pany, Prof. (Dr.) Zakkariya K A, and Chapter Chairman Shri. Tony Chacko.',
    category: 'oath',
    categoryLabel: 'Oath of Office',
    metaTag: '30 March 2026',
    keywords: 'oath swearing in pledge dais atul shah tony chacko zakkariya nabaghana pany yogesh',
  },
  {
    id: 'photo-8',
    src: '/photos/istd-higher-officials.jpeg',
    title: 'Dignitaries During the Swearing-In Ceremony',
    shortDesc:
      'Shri. Nabaghana Pany, Prof. (Dr.) Zakkariya K A, and Chairman Shri. Tony Chacko during the oath ceremony.',
    caption:
      'Shri. Nabaghana Pany (National Treasurer, ISTD), Prof. (Dr.) Zakkariya K A (Regional Vice President, South), and Shri. Tony Chacko (Chairman, ISTD Thrissur Chapter) during the swearing-in ceremony.',
    category: 'oath',
    categoryLabel: 'Oath of Office',
    metaTag: '30 March 2026',
    keywords: 'oath pledge higher officials nabaghana pany zakkariya tony chacko',
  },
  {
    id: 'photo-9',
    src: '/photos/istd-audience.jpeg',
    title: 'Chapter Members Taking the Membership Pledge',
    shortDesc:
      'Chapter members and committee representatives standing to take the pledge during the inauguration.',
    caption:
      'ISTD Thrissur Chapter members and committee representatives taking the pledge during the inauguration ceremony on 30 March 2026.',
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
      'Treasurer Mr. Jibin N and fellow office bearers taking the oath of office.',
    caption:
      'Treasurer Mr. Jibin N and fellow office bearers and committee members taking the oath of office during the chapter inauguration on 30 March 2026.',
    category: 'oath',
    categoryLabel: 'Oath of Office',
    metaTag: '30 March 2026',
    keywords: 'jibin treasurer oath swearing in members',
  },
  {
    id: 'photo-11',
    src: '/photos/istd-national-tony.jpeg',
    title: 'Memento Presentation to Chapter Chairman Shri. Tony Chacko',
    shortDesc:
      'National President Shri. Atul Shah presenting a memento to Chapter Chairman Shri. Tony Chacko.',
    caption:
      'ISTD National President Shri. Atul Shah presenting a memento to Thrissur Chapter Chairman Shri. Tony Chacko, with Regional Vice President Prof. (Dr.) Zakkariya K A.',
    category: 'felicitations',
    categoryLabel: 'Felicitations',
    metaTag: '30 March 2026',
    keywords: 'atul shah tony chacko memento felicitation zakkariya',
  },
  {
    id: 'photo-12',
    src: '/photos/istd-sneha.jpeg',
    title: 'Felicitation of Chapter Secretary Ms. Sneha Rose George',
    shortDesc:
      'Regional Vice President Prof. (Dr.) Zakkariya K A presenting a memento to Secretary Ms. Sneha Rose George.',
    caption:
      'Regional Vice President (South) Prof. (Dr.) Zakkariya K A presenting a token of appreciation to ISTD Thrissur Chapter Secretary Ms. Sneha Rose George.',
    category: 'felicitations',
    categoryLabel: 'Felicitations',
    metaTag: '30 March 2026',
    keywords: 'sneha rose george secretary zakkariya tony chacko felicitation',
  },
  {
    id: 'photo-13',
    src: '/photos/istd-participants.jpeg',
    title: 'Felicitation of Past National President Dr. Yogesh Kumar Upadhyay',
    shortDesc:
      'Chapter Treasurer Mr. Jibin N honouring Past National President Dr. Yogesh Kumar Upadhyay with a ponnada.',
    caption:
      'Chapter Treasurer Mr. Jibin N draping a traditional ponnada (shawl) to honour Past National President Dr. Yogesh Kumar Upadhyay during the inauguration ceremony on 30 March 2026.',
    category: 'felicitations',
    categoryLabel: 'Felicitations',
    metaTag: '30 March 2026',
    keywords: 'jibin treasurer yogesh kumar upadhyay ponnada shawl felicitation',
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
    keywords: 'nabaghana pany national treasurer ponnada shawl atul shah yogesh',
  },
  {
    id: 'photo-15',
    src: '/photos/istd-zakkria.jpeg',
    title: 'Felicitation of Regional Vice President Prof. (Dr.) Zakkariya K A',
    shortDesc:
      'National President Shri. Atul Shah presenting a memento to Prof. (Dr.) Zakkariya K A.',
    caption:
      'National President Shri. Atul Shah and National Treasurer Shri. Nabaghana Pany presenting a memento to Regional Vice President (South) Prof. (Dr.) Zakkariya K A.',
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
      'National President Shri. Atul Shah presenting a memento during the ISTD Thrissur Chapter inauguration on 30 March 2026.',
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
      'Prof. (Dr.) Zakkariya K A presenting tokens of appreciation during the felicitation segment.',
    caption:
      'Regional Vice President (South) Prof. (Dr.) Zakkariya K A presenting tokens of appreciation to chapter members and contributors on 30 March 2026.',
    category: 'felicitations',
    categoryLabel: 'Felicitations',
    metaTag: '30 March 2026',
    keywords: 'zakkariya appreciation gift delegates felicitation',
  },
  {
    id: 'photo-19',
    src: '/photos/team-istd.jpeg',
    title: 'Group Photograph of ISTD National Leaders and Thrissur Chapter Members',
    shortDesc:
      'ISTD Thrissur Chapter members together with ISTD National and Regional office bearers.',
    caption:
      'Shri. Atul Shah, Dr. Yogesh Kumar Upadhyay, Shri. Nabaghana Pany, Prof. (Dr.) Zakkariya K A, and Chairman Shri. Tony Chacko with the members of the ISTD Thrissur Chapter on 30 March 2026.',
    category: 'portraits',
    categoryLabel: 'Group Photographs',
    metaTag: '30 March 2026 • Hotel Pearl Regency',
    keywords: 'group photo team istd national leaders tony chacko zakkariya atul shah nabaghana pany yogesh',
    featured: true,
  },
  {
    id: 'photo-20',
    src: '/photos/team.jpeg',
    title: 'Office Bearers and Managing Committee with National Dignitaries',
    shortDesc:
      'Office bearers and committee members of the Thrissur Chapter alongside ISTD National leadership.',
    caption:
      'Secretary Ms. Sneha Rose George, Treasurer Mr. Jibin N, Managing Committee members, National President Shri. Atul Shah, Chairman Shri. Tony Chacko, and Regional Vice President Prof. (Dr.) Zakkariya K A.',
    category: 'portraits',
    categoryLabel: 'Group Photographs',
    metaTag: '30 March 2026',
    keywords: 'team managing committee tony chacko jibin sneha atul shah zakkariya',
  },
  {
    id: 'photo-21',
    src: '/photos/istd.jpeg',
    title: 'ISTD Thrissur Chapter Members with National Office Bearers',
    shortDesc:
      'Chapter members and office bearers posing with ISTD National and Regional leaders.',
    caption:
      'Treasurer Mr. Jibin N, Managing Committee members, National President Shri. Atul Shah, Chairman Shri. Tony Chacko, Prof. (Dr.) Zakkariya K A, and Shri. Nabaghana Pany with chapter members.',
    category: 'portraits',
    categoryLabel: 'Group Photographs',
    metaTag: '30 March 2026',
    keywords: 'istd group portrait jibin tony chacko zakkariya nabaghana pany atul shah',
  },
  {
    id: 'photo-22',
    src: '/photos/istd-participants-group.jpeg',
    title: 'Chapter Office Bearers and Members with National President Shri. Atul Shah',
    shortDesc:
      'Secretary Ms. Sneha Rose George, Treasurer Mr. Jibin N, and chapter members with National President Shri. Atul Shah.',
    caption:
      'Secretary Ms. Sneha Rose George, Treasurer Mr. Jibin N, and Thrissur Chapter members with ISTD National President Shri. Atul Shah on 30 March 2026.',
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
      'National President Shri. Atul Shah in conversation with Thrissur Chapter committee members.',
    caption:
      'National President Shri. Atul Shah interacting with Thrissur Chapter members during the inaugural meeting on 30 March 2026.',
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
      'Chairman Shri. Tony Chacko and chapter members welcoming delegates at Hotel Pearl Regency, Thrissur on 30 March 2026.',
    category: 'portraits',
    categoryLabel: 'Group Photographs',
    metaTag: '30 March 2026',
    keywords: 'tony chacko leaders fellowship',
  },
];

export const OFFICE_BEARERS: CommitteeMember[] = [
  {
    id: 'member-tony',
    name: 'Tony Chacko',
    role: 'Chairman',
    title: 'CEO, Tony & Iby',
    avatar: '/images/ISTDTeamTCR/tony-chacko.jpg',
    email: 'tonychacko67@gmail.com',
    phone: '+919846101034',
    linkedin: 'https://www.linkedin.com/in/tony-chacko-965622240/',
    isChairman: true,
    isOfficeBearer: true,
  },
  {
    id: 'member-sneha',
    name: 'Sneha Rose George',
    role: 'Secretary',
    title: 'Research Scholar, CUSAT',
    avatar: '/images/ISTDTeamTCR/sneha-rose.jpg',
    linkedin: 'https://www.linkedin.com/in/sneha-rose-george-4176a325/',
    isOfficeBearer: true,
  },
  {
    id: 'member-jibin',
    name: 'Jibin N',
    role: 'Treasurer',
    title: 'Technology Director & Consultant',
    avatar: '/images/ISTDTeamTCR/jibin-n.jpg',
    email: 'jibintcr@gmail.com',
    phone: '+919496839168',
    linkedin: 'https://www.linkedin.com/in/jibintcr/',
    isOfficeBearer: true,
  },
];

export const COMMITTEE_MEMBERS: CommitteeMember[] = [
  {
    id: 'member-suresh',
    name: 'Sureshkumar K P',
    role: 'Committee Member',
    avatar: '/images/suresh-kp.jpg',
  },
  {
    id: 'member-sajan',
    name: 'Adv. Sajan Janardanan',
    role: 'Committee Member',
    avatar: '/images/sajan-janardanan.jpg',
  },
  {
    id: 'member-fazal',
    name: 'Fazal Mohamed',
    role: 'Committee Member',
    avatar: '/images/fazal-mohamed.jpg',
  },
];

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
    name: 'Prof. (Dr.) Zakkariya K A',
    designation: 'Regional Vice President, ISTD (South)',
    linkedin: 'https://www.linkedin.com/in/zakkariya-k-a-b28606109/',
    photo: '/photos/istd-zakkariya.jpeg',
  },
  {
    name: 'Shri. Tony Chacko',
    designation: 'Chairman, ISTD Thrissur Chapter',
    linkedin: 'https://www.linkedin.com/in/tony-chacko-965622240/',
    photo: '/photos/istd-tony-chacko.jpeg',
  },
];

export const CHAPTER_CORE_CONTRIBUTORS = [
  {
    name: 'Shri. Tony Chacko',
    role: 'Chairman',
    linkedin: 'https://www.linkedin.com/in/tony-chacko-965622240/',
  },
  {
    name: 'Ms. Sneha Rose George',
    role: 'Secretary',
    linkedin: 'https://www.linkedin.com/in/sneha-rose-george-4176a325/',
  },
  {
    name: 'Mr. Jibin N',
    role: 'Treasurer',
    linkedin: 'https://www.linkedin.com/in/jibintcr/',
  },
  { name: 'Mr. Nisam', role: 'Chapter Member & Contributor' },
  { name: 'Dr. Minu Gopal', role: 'Chapter Member & Contributor' },
  { name: 'Dr. Dhanya Alex', role: 'Chapter Member & Contributor' },
  { name: 'Mr. Jobin Kuriakose', role: 'Chapter Member & Contributor' },
  { name: 'Mr. Anil Komban', role: 'Chapter Member & Contributor' },
  { name: 'Ms. Rohini', role: 'Chapter Member & Contributor' },
  { name: 'Mr. Manoj Pushkaran', role: 'Chapter Member & Contributor' },
];

export const ALL_CHAPTER_EVENTS: ChapterEvent[] = [
  {
    id: 'event-aiot-boopathy',
    slug: 'advancing-aiot-research',
    status: 'upcoming',
    title: 'Advancing AIoT Research: From Intelligent Algorithms to Real-World Applications',
    subtitleQuestion: 'How can intelligent algorithms translate into real-world applications?',
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
      'ISTD Trichur Chapter invites you to an online session on “Advancing AIoT Research: From Intelligent Algorithms to Real-World Applications.”',
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
    title: 'From AI Assistants to AI Agents: The Next Shift in Business',
    programmeType: 'Webinar',
    date: '8 August 2026',
    timeIST: 'Online Session (IST)',
    venue: 'Online Session',
    speaker: 'Shaheen Siddique',
    shortDescription:
      'An online session exploring the evolution of AI tools and how businesses and professionals can leverage AI agents for sustainable growth.',
    fullDescription: [
      'This online webinar organised by the ISTD Thrissur Chapter examined the transition from conversational AI assistants to autonomous AI agents in workplace and business environments.',
      'Led by speaker Shaheen Siddique, the session covered practical applications for HR professionals, trainers, educators, and business managers looking to integrate AI-assisted workflows responsibly and effectively.',
    ],
    image: '/images/event-ai-agents.jpg',
    imageCaption:
      'Session visual for “From AI Assistants to AI Agents: The Next Shift in Business” led by Shaheen Siddique on 8 August 2026.',
    hasPhotoGallery: false,
    eventPhotos: [
      {
        src: '/images/event-ai-agents.jpg',
        title: 'From AI Assistants to AI Agents: The Next Shift in Business',
        caption:
          'Online webinar led by Shaheen Siddique on 8 August 2026 exploring how businesses and L&D practitioners can adopt AI agents.',
        category: 'Session Archive',
      },
    ],
  },
  {
    id: 'event-future-ld',
    slug: 'future-of-ld-ai-ecosystems',
    status: 'past',
    title: 'Future of L&D: Building Intelligent Learning Ecosystems with AI',
    programmeType: 'Seminar',
    date: '11 April 2026',
    timeIST: 'Foundation Day Special Session (IST)',
    venue: 'Online / Chapter Session',
    speaker: 'Chapter Resource Panel',
    shortDescription:
      'A Foundation Day special session exploring how Artificial Intelligence is reshaping Learning and Development for organisations and academic institutions.',
    fullDescription: [
      'Held on 11 April 2026 to mark ISTD Foundation Day, this special session explored how Artificial Intelligence is reshaping Learning and Development across corporate organisations and educational institutions.',
      'Participants discussed modern instructional design, adaptive learning ecosystems, and the evolving role of L&D practitioners.',
    ],
    image: '/images/event-future-ld.jpg',
    imageCaption:
      'Foundation Day special session on Building Intelligent Learning Ecosystems with AI (11 April 2026).',
    hasPhotoGallery: false,
    eventPhotos: [
      {
        src: '/images/event-future-ld.jpg',
        title: 'Future of L&D: Building Intelligent Learning Ecosystems with AI',
        caption:
          'Foundation Day special session held on 11 April 2026 on AI-enabled learning ecosystems.',
        category: 'Session Archive',
      },
    ],
  },
  {
    id: 'event-inauguration-2026',
    slug: 'inauguration',
    status: 'past',
    title: 'ISTD Trichur Chapter Inaugurated as Diamond Chapter in ISTD’s 55th Year',
    programmeType: 'Chapter Milestone',
    date: '30 March 2026',
    timeIST: 'Inaugural Session (IST)',
    venue: 'Hotel Pearl Regency, Thrissur',
    speaker: 'Shri. Atul Shah (National President, ISTD) & National/Regional Dignitaries',
    shortDescription:
      'Official inauguration of the ISTD Thrissur (Trichur) Chapter as the Diamond Chapter of the Indian Society for Training & Development (ISTD) in its 55th year, together with the installation of office bearers.',
    fullDescription: [
      'We are pleased to share the successful inauguration of the ISTD Trichur Chapter on 30 March 2026, marking the establishment of the Diamond Chapter of the Indian Society for Training & Development (ISTD) in its 55th year.',
      'The launch of the Trichur Chapter reflects a collective commitment to strengthening the training and development ecosystem by creating a professional platform for learning, knowledge exchange, collaboration, and leadership development.',
      'The chapter is envisioned as a space that brings together trainers, educators, HR professionals, academicians, and industry leaders to contribute meaningfully to professional growth in the region.',
      'The successful formation and inauguration of the chapter, along with the strong membership response and installation of office bearers, reflect the dedication, coordination, and shared vision of everyone involved in this initiative.',
      'The ISTD Trichur Chapter begins its journey with a clear purpose: to support professional excellence in training, learning, and human resource development through meaningful engagement and sustained collaboration.',
    ],
    image: '/photos/istd-22.jpeg',
    imageCaption:
      'Chairman Shri. Tony Chacko and Regional Vice President (South) Prof. (Dr.) Zakkariya K A lighting the ceremonial lamp alongside National President Shri. Atul Shah, National Treasurer Shri. Nabaghana Pany, and Past National President Dr. Yogesh Kumar Upadhyay on 30 March 2026.',
    hasPhotoGallery: true,
  },
];
