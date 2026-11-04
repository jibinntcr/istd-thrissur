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
  title: string;
  avatar: string;
  email?: string;
  phone?: string;
  isChairman?: boolean;
  isOfficeBearer?: boolean;
}

export interface ProgramItem {
  id: string;
  badge?: string;
  duration: string;
  title: string;
  shortTitle: string;
  description: string;
  fullDescription: string;
  features: string[];
  featured?: boolean;
  iconType: 'diploma' | 'layers' | 'shield';
}

export interface EventItem {
  id: string;
  title: string;
  dateBadge: string;
  speaker: string;
  description: string;
  image: string;
  venueOrMode: string;
  isMilestone?: boolean;
  lightboxTitle?: string;
  lightboxCaption?: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    src: '/photos/istd-22.jpeg',
    badge: 'Diamond Chapter Inauguration',
    title: 'Diamond Chapter Inauguration — Ceremonial Lamp Lighting',
    desc: 'Graced by ISTD National & Regional Dignitaries at Pearl Regency, Thrissur',
    caption:
      'Chairman Shri. Tony Chacko and Regional VP Prof. (Dr.) Zakkariya K A lighting the ceremonial Nilavilakku alongside ISTD National President Shri. Atul Shah, National Treasurer Shri. Nabaghan Pany, and Past National President Dr. Yogesh Kumar Upadhyay.',
  },
  {
    src: '/photos/team-istd.jpeg',
    badge: 'Leadership & Fraternity',
    title: 'ISTD National Leaders & Thrissur Chapter Cohort',
    desc: 'National President Shri. Atul Shah & Executive Dignitaries with Thrissur Chapter Members',
    caption:
      'National President Shri. Atul Shah, Past National President Dr. Yogesh Kumar Upadhyay, National Treasurer Shri. Nabaghan Pany, Regional VP Prof. (Dr.) Zakkariya K A, and Chairman Shri. Tony Chacko with the Thrissur Chapter fraternity.',
  },
  {
    src: '/photos/istd-national-president.jpeg',
    badge: 'Charter Presentation',
    title: 'Official Diamond Chapter Charter Presentation',
    desc: 'National President Shri. Atul Shah presenting the official chapter mandate',
    caption:
      'ISTD National President Shri. Atul Shah formally presenting the Diamond Chapter recognition to Regional Vice President Prof. (Dr.) Zakkariya K A as National Treasurer Shri. Nabaghan Pany applauds.',
  },
  {
    src: '/photos/istd-calicut.jpeg',
    badge: 'Inaugural Plenary',
    title: 'Inaugural Session at Hotel Pearl Regency, Thrissur',
    desc: 'Dignitaries on the dais during the historic 30th March 2026 inauguration',
    caption:
      'Full view of the inaugural dais at Hotel Pearl Regency, Thrissur featuring Dr. Yogesh Kumar Upadhyay, Shri. Nabaghan Pany, Shri. Atul Shah, Prof. (Dr.) Zakkariya K A, and Chairman Shri. Tony Chacko.',
  },
];

export const GALLERY_CATEGORIES = [
  { id: 'all', label: 'All Photos', count: 24 },
  { id: 'ceremony', label: 'Inaugural Ceremony', count: 3 },
  { id: 'addresses', label: 'Keynote & Addresses', count: 3 },
  { id: 'oath', label: 'Oath & Swearing-In', count: 4 },
  { id: 'felicitations', label: 'Felicitations & Honors', count: 8 },
  { id: 'portraits', label: 'Leadership & Community', count: 6 },
] as const;

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'photo-1',
    src: '/photos/istd-22.jpeg',
    title: 'Auspicious Lamp Lighting by Chapter & Regional Leadership',
    shortDesc:
      'Chairman Shri. Tony Chacko and Regional VP Prof. (Dr.) Zakkariya K A lighting the traditional lamp in the presence of ISTD National Leaders.',
    caption:
      'Chairman Shri. Tony Chacko and Regional Vice President (South) Prof. (Dr.) Zakkariya K A lighting the ceremonial Nilavilakku alongside National President Shri. Atul Shah, National Treasurer Shri. Nabaghan Pany, and Past National President Dr. Yogesh Kumar Upadhyay.',
    category: 'ceremony',
    categoryLabel: 'Inaugural Ceremony',
    metaTag: 'Pearl Regency, Thrissur',
    keywords: 'lamp lighting nilavilakku tony chacko zakkariya atul shah nabaghan pany yogesh upadhyay inauguration',
    featured: true,
  },
  {
    id: 'photo-2',
    src: '/photos/istd-in.jpeg',
    title: 'Dignitaries Lighting the Ceremonial Nilavilakku',
    shortDesc:
      'Past National President Dr. Yogesh Kumar Upadhyay kindling the lamp to mark the official launch of the Diamond Chapter.',
    caption:
      'Dr. Yogesh Kumar Upadhyay (Past National President, ISTD) lighting the ceremonial lamp during the Diamond Chapter Inauguration, flanked by Shri. Nabaghan Pany, Shri. Atul Shah, Prof. (Dr.) Zakkariya K A, and Shri. Tony Chacko.',
    category: 'ceremony',
    categoryLabel: 'Inaugural Ceremony',
    metaTag: '30th March 2026',
    keywords: 'lamp lighting yogesh kumar upadhyay atul shah nabaghan pany zakkariya tony chacko',
  },
  {
    id: 'photo-3',
    src: '/photos/istd-national-president.jpeg',
    title: 'Official Diamond Chapter Charter Presentation',
    shortDesc:
      'National President Shri. Atul Shah formally conferring the Diamond Chapter mandate during the inaugural session.',
    caption:
      'ISTD National President Shri. Atul Shah formally presenting the Diamond Chapter recognition to Regional Vice President Prof. (Dr.) Zakkariya K A as National Treasurer Shri. Nabaghan Pany applauds.',
    category: 'ceremony',
    categoryLabel: 'Inaugural Ceremony',
    metaTag: 'National Recognition',
    keywords: 'atul shah national president charter handover zakkariya nabaghan pany',
  },
  {
    id: 'photo-4',
    src: '/photos/istd-tony-chacko.jpeg',
    title: "Chairman's Vision Address — Shri. Tony Chacko",
    shortDesc:
      'Chapter Chairman Shri. Tony Chacko outlining the strategic roadmap for corporate training and HR development in Thrissur.',
    caption:
      "Shri. Tony Chacko, Chairman of ISTD Thrissur Chapter, delivering the welcome and strategic vision address at Hotel Pearl Regency, outlining the chapter's roadmap for L&D excellence across Central Kerala.",
    category: 'addresses',
    categoryLabel: 'Keynote & Addresses',
    metaTag: "Chairman's Address",
    keywords: 'tony chacko chairman speech address podium pearl regency',
  },
  {
    id: 'photo-5',
    src: '/photos/istd-calicut.jpeg',
    title: 'Inaugural Plenary Session & Dignitary Dais',
    shortDesc:
      'National and Regional ISTD leaders seated on the dais during the formal inauguration proceedings at Pearl Regency.',
    caption:
      'Full view of the inaugural dais at Pearl Regency featuring Dr. Yogesh Kumar Upadhyay, Shri. Nabaghan Pany, Shri. Atul Shah, Prof. (Dr.) Zakkariya K A, and Shri. Tony Chacko.',
    category: 'addresses',
    categoryLabel: 'Keynote & Addresses',
    metaTag: 'Plenary Session',
    keywords: 'dais stage banner diamond chapter trichur pearl regency dignitaries',
    featured: true,
  },
  {
    id: 'photo-6',
    src: '/photos/istd-treasurer.jpeg',
    title: 'Special Address by National Treasurer Shri. Nabaghan Pany',
    shortDesc:
      'Shri. Nabaghan Pany sharing insights on national L&D standards and chapter excellence from the podium.',
    caption:
      "Shri. Nabaghan Pany (National Treasurer, ISTD) addressing the Thrissur Chapter members and highlighting ISTD's national growth and flagship certification initiatives.",
    category: 'addresses',
    categoryLabel: 'Keynote & Addresses',
    metaTag: 'National Leadership',
    keywords: 'nabaghan pany national treasurer speech address dais',
  },
  {
    id: 'photo-7',
    src: '/photos/istd-3.jpeg',
    title: 'Administering the Official Leadership Oath',
    shortDesc:
      'National President Shri. Atul Shah leading the solemn swearing-in pledge with the dignitaries and Chapter Chairman.',
    caption:
      'National President Shri. Atul Shah administering the solemn oath of office alongside Dr. Yogesh Kumar Upadhyay, Shri. Nabaghan Pany, Prof. (Dr.) Zakkariya K A, and Chapter Chairman Shri. Tony Chacko.',
    category: 'oath',
    categoryLabel: 'Oath & Swearing-In',
    metaTag: 'Swearing-In Ceremony',
    keywords: 'oath swearing in pledge dais atul shah tony chacko zakkariya nabaghan pany yogesh',
  },
  {
    id: 'photo-8',
    src: '/photos/istd-higher-officials.jpeg',
    title: 'Dignitaries Upholding the ISTD Charter Pledge',
    shortDesc:
      'Shri. Nabaghan Pany, Prof. (Dr.) Zakkariya K A, and Chairman Shri. Tony Chacko during the formal oath ceremony.',
    caption:
      'Shri. Nabaghan Pany (National Treasurer), Prof. (Dr.) Zakkariya K A (Regional VP - South), and Shri. Tony Chacko (Chairman, ISTD Thrissur) taking the pledge during the swearing-in ceremony.',
    category: 'oath',
    categoryLabel: 'Oath & Swearing-In',
    metaTag: 'Governance Pledge',
    keywords: 'oath pledge higher officials nabaghan pany zakkariya tony chacko',
  },
  {
    id: 'photo-9',
    src: '/photos/istd-audience.jpeg',
    title: 'Members Taking the Collective Commitment Oath',
    shortDesc:
      'Senior trainers, educators, and committee members pledging their commitment to advancing HRD across Central Kerala.',
    caption:
      'ISTD Thrissur Chapter committee members, trainers, and HR professionals standing in unison to take the membership pledge.',
    category: 'oath',
    categoryLabel: 'Oath & Swearing-In',
    metaTag: 'Member Induction',
    keywords: 'audience members oath pledge sureshkumar',
  },
  {
    id: 'photo-10',
    src: '/photos/istd-kozhikkod.jpeg',
    title: 'Swearing-In of Executive Committee & Members',
    shortDesc:
      'Chapter Treasurer Jibin N and fellow leaders taking the solemn oath to serve the L&D fraternity.',
    caption:
      'Treasurer Jibin N and fellow office bearers and members taking the oath of office during the Diamond Chapter inauguration.',
    category: 'oath',
    categoryLabel: 'Oath & Swearing-In',
    metaTag: 'Executive Induction',
    keywords: 'jibin treasurer oath swearing in members kozhikkod',
  },
  {
    id: 'photo-11',
    src: '/photos/istd-national-tony.jpeg',
    title: 'Commemorative Memento to Chairman Shri. Tony Chacko',
    shortDesc:
      'National President Shri. Atul Shah presenting a token of appreciation to Chapter Chairman Shri. Tony Chacko.',
    caption:
      'ISTD National President Shri. Atul Shah presenting a commemorative memento to Thrissur Chapter Chairman Shri. Tony Chacko, with Regional VP Prof. (Dr.) Zakkariya K A looking on.',
    category: 'felicitations',
    categoryLabel: 'Felicitations & Honors',
    metaTag: 'Leadership Honor',
    keywords: 'atul shah tony chacko memento felicitation zakkariya',
  },
  {
    id: 'photo-12',
    src: '/photos/istd-sneha.jpeg',
    title: 'Honoring Chapter Secretary Sneha Rose George',
    shortDesc:
      'Regional Vice President Prof. (Dr.) Zakkariya K A presenting a token of appreciation to Secretary Sneha Rose George.',
    caption:
      'Regional Vice President (South) Prof. (Dr.) Zakkariya K A presenting a token of appreciation to ISTD Thrissur Chapter Secretary Sneha Rose George.',
    category: 'felicitations',
    categoryLabel: 'Felicitations & Honors',
    metaTag: 'Executive Recognition',
    keywords: 'sneha rose george secretary zakkariya tony chacko felicitation',
  },
  {
    id: 'photo-13',
    src: '/photos/istd-participants.jpeg',
    title: 'Traditional Ponnada Honor to Dr. Yogesh Kumar Upadhyay',
    shortDesc:
      'Chapter Treasurer Jibin N honoring Past National President Dr. Yogesh Kumar Upadhyay with a traditional shawl.',
    caption:
      'Chapter Treasurer Jibin N draping a traditional Kerala ponnada (shawl) to honor Past National President Dr. Yogesh Kumar Upadhyay during the inaugural ceremony.',
    category: 'felicitations',
    categoryLabel: 'Felicitations & Honors',
    metaTag: 'Dignitary Felicitation',
    keywords: 'jibin treasurer yogesh kumar upadhyay ponnada shawl felicitation',
  },
  {
    id: 'photo-14',
    src: '/photos/istd-national-treasurer.jpeg',
    title: 'Felicitation of National Treasurer Shri. Nabaghan Pany',
    shortDesc:
      'Draping the ceremonial ponnada to welcome and honor ISTD National Treasurer Shri. Nabaghan Pany.',
    caption:
      'Honoring ISTD National Treasurer Shri. Nabaghan Pany with a traditional ponnada (shawl) on the dais, applauded by National President Shri. Atul Shah and Dr. Yogesh Kumar Upadhyay.',
    category: 'felicitations',
    categoryLabel: 'Felicitations & Honors',
    metaTag: 'Dignitary Felicitation',
    keywords: 'nabaghan pany national treasurer ponnada shawl atul shah yogesh',
  },
  {
    id: 'photo-15',
    src: '/photos/istd-zakkria.jpeg',
    title: 'Honoring Regional VP Prof. (Dr.) Zakkariya K A',
    shortDesc:
      'National President Shri. Atul Shah presenting a memento of appreciation to Prof. (Dr.) Zakkariya K A.',
    caption:
      'National President Shri. Atul Shah and National Treasurer Shri. Nabaghan Pany presenting a commemorative token of appreciation to Regional Vice President (South) Prof. (Dr.) Zakkariya K A.',
    category: 'felicitations',
    categoryLabel: 'Felicitations & Honors',
    metaTag: 'Regional Leadership',
    keywords: 'zakkariya atul shah nabaghan pany memento felicitation',
  },
  {
    id: 'photo-16',
    src: '/photos/tony.jpeg',
    title: 'Commemorative Memento Presentation',
    shortDesc:
      'National President Shri. Atul Shah presenting a token of appreciation during the felicitation ceremony.',
    caption:
      'National President Shri. Atul Shah presenting a commemorative memento of appreciation during the Diamond Chapter inauguration.',
    category: 'felicitations',
    categoryLabel: 'Felicitations & Honors',
    metaTag: 'Leadership Recognition',
    keywords: 'atul shah memento felicitation committee leadership',
  },
  {
    id: 'photo-17',
    src: '/photos/istd-national.jpeg',
    title: 'Presentation of Commemorative Chapter Artwork',
    shortDesc:
      'National President Shri. Atul Shah presenting a custom framed memento during the felicitation ceremony.',
    caption:
      'National President Shri. Atul Shah presenting a framed commemorative artwork during the Diamond Chapter inauguration ceremony.',
    category: 'felicitations',
    categoryLabel: 'Felicitations & Honors',
    metaTag: 'Special Recognition',
    keywords: 'atul shah memento presentation appreciation inauguration',
  },
  {
    id: 'photo-18',
    src: '/photos/istd-zakkariya.jpeg',
    title: 'Recognizing Chapter Contributors & Delegates',
    shortDesc:
      'Prof. (Dr.) Zakkariya K A honoring members and supporters during the inaugural felicitation segment.',
    caption:
      'Regional Vice President (South) Prof. (Dr.) Zakkariya K A presenting tokens of appreciation to chapter members and contributors.',
    category: 'felicitations',
    categoryLabel: 'Felicitations & Honors',
    metaTag: 'Member Felicitation',
    keywords: 'zakkariya appreciation gift delegates felicitation',
  },
  {
    id: 'photo-19',
    src: '/photos/team-istd.jpeg',
    title: 'Grand Inaugural Portrait — National & Chapter Leadership',
    shortDesc:
      'The complete ISTD Thrissur Diamond Chapter cohort together with the National Executive Council dignitaries.',
    caption:
      'Dignitaries Shri. Atul Shah, Dr. Yogesh Kumar Upadhyay, Shri. Nabaghan Pany, Prof. (Dr.) Zakkariya K A, and Chairman Shri. Tony Chacko posing with the full ISTD Thrissur Chapter fraternity.',
    category: 'portraits',
    categoryLabel: 'Leadership & Community',
    metaTag: 'Official Portrait',
    keywords: 'group photo team istd national leaders tony chacko zakkariya atul shah nabaghan pany yogesh',
    featured: true,
  },
  {
    id: 'photo-20',
    src: '/photos/team.jpeg',
    title: 'Managing Committee & Dignitaries Ensemble',
    shortDesc:
      'Office bearers and executive committee members of the Thrissur Chapter alongside ISTD National leadership.',
    caption:
      'Front row featuring Secretary Sneha Rose George, Treasurer Jibin N, Managing Committee Leaders, National President Shri. Atul Shah, Chairman Shri. Tony Chacko, and Regional VP Prof. (Dr.) Zakkariya K A with chapter members.',
    category: 'portraits',
    categoryLabel: 'Leadership & Community',
    metaTag: 'Committee Portrait',
    keywords: 'team managing committee tony chacko jibin sneha atul shah zakkariya',
  },
  {
    id: 'photo-21',
    src: '/photos/istd.jpeg',
    title: 'Chapter Leadership & Member Delegation',
    shortDesc:
      "A proud moment celebrating the launch of Central Kerala's premier L&D professional community.",
    caption:
      'Treasurer Jibin N, Managing Committee Leaders, National President Shri. Atul Shah, Chairman Shri. Tony Chacko, Prof. (Dr.) Zakkariya K A, and Shri. Nabaghan Pany with chapter members.',
    category: 'portraits',
    categoryLabel: 'Leadership & Community',
    metaTag: 'Chapter Delegation',
    keywords: 'istd group portrait jibin tony chacko zakkariya nabaghan pany atul shah',
  },
  {
    id: 'photo-22',
    src: '/photos/istd-participants-group.jpeg',
    title: 'Core Executive Team & Chapter Members',
    shortDesc:
      'Secretary Sneha Rose George, Treasurer Jibin N, and committee leaders with National President Shri. Atul Shah.',
    caption:
      'Secretary Sneha Rose George, Treasurer Jibin N, Managing Committee Leaders, and fellow Thrissur Chapter members posing with National President Shri. Atul Shah.',
    category: 'portraits',
    categoryLabel: 'Leadership & Community',
    metaTag: 'Core Team',
    keywords: 'participants sneha rose jibin atul shah group',
  },
  {
    id: 'photo-23',
    src: '/photos/istd-tcr-inauguration.jpeg',
    title: 'Executive Networking & Strategic Dialogue',
    shortDesc:
      'Candid conversation between National President Shri. Atul Shah and Thrissur Chapter committee leaders.',
    caption:
      'National President Shri. Atul Shah engaging in an interactive discussion with chapter leaders during the inaugural meet.',
    category: 'portraits',
    categoryLabel: 'Leadership & Community',
    metaTag: 'Leadership Dialogue',
    keywords: 'networking candid atul shah inauguration',
  },
  {
    id: 'photo-24',
    src: '/photos/istd-tony.jpeg',
    title: 'Chapter Fellowship & Welcome Gathering',
    shortDesc:
      'Chairman Shri. Tony Chacko and senior leaders welcoming delegates to the Diamond Chapter inauguration.',
    caption:
      'Chairman Shri. Tony Chacko and senior chapter leaders during the pre-inaugural fellowship.',
    category: 'portraits',
    categoryLabel: 'Leadership & Community',
    metaTag: 'Chapter Fellowship',
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
    isChairman: true,
    isOfficeBearer: true,
  },
  {
    id: 'member-sneha',
    name: 'Sneha Rose George',
    role: 'Secretary',
    title: 'Research Scholar, CUSAT',
    avatar: '/images/ISTDTeamTCR/sneha-rose.jpg',
    email: 'info@istd.in',
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
    isOfficeBearer: true,
  },
];

export const COMMITTEE_MEMBERS: CommitteeMember[] = [
  {
    id: 'member-suresh',
    name: 'Sureshkumar K P',
    role: 'Committee Member',
    title: 'Senior HR Consultant & Trainer',
    avatar: '/images/suresh-kp.jpg',
    email: 'info@istd.in',
  },
  {
    id: 'member-sajan',
    name: 'Adv. Sajan Janardanan',
    role: 'Committee Member',
    title: 'Legal Counsel & Corporate Advisor',
    avatar: '/images/sajan-janardanan.jpg',
    email: 'info@istd.in',
  },
  {
    id: 'member-fazal',
    name: 'Fazal Mohamed',
    role: 'Committee Member',
    title: 'L&D Specialist & Facilitator',
    avatar: '/images/fazal-mohamed.jpg',
    email: 'info@istd.in',
  },
];

export const FLAGSHIP_PROGRAMS: ProgramItem[] = [
  {
    id: 'pgpSection',
    badge: 'National Diploma',
    duration: '15-Month Postgraduate Program',
    shortTitle: 'PGP-TL&D',
    title: 'PGP-TL&D (Post Graduate Program in Training, Learning & Development)',
    description:
      'Post Graduate Program in Training, Learning & Development: A comprehensive 15-month program recognized by Govt of India to create impactful learning leaders.',
    fullDescription:
      'A 15-month program designed to equip professionals with the skills to create impactful learning experiences. Recognised by the Ministry of Education, Govt. of India for recruitment to superior posts under the Central Government.',
    features: [
      'Govt. of India recognized qualification',
      'Comprehensive 4-Semester modular curriculum',
      'Live weekend masterclasses & expert faculty mentorship',
      'Real-world organizational training project work',
      '50+ students actively enrolled in Kerala cohort',
    ],
    featured: true,
    iconType: 'diploma',
  },
  {
    id: 'tttSection',
    duration: 'Master Certification',
    shortTitle: 'Certified Train The Trainer',
    title: 'Certified Train The Trainer',
    description:
      'A masterclass in modern experiential facilitation, adult learning pedagogy, instructional design, and stage presentation skills.',
    fullDescription:
      'A comprehensive program to master modern facilitation and training methodologies. Empowers emerging and practicing trainers with experiential tools and adult learning frameworks.',
    features: [
      'Training Needs Analysis (TNA) & Kirkpatrick Evaluation',
      'Adult learning theories & ADDIE framework',
      'Facilitation psychology and gamified learning design',
      'Micro-teaching assessment with individual feedback',
      'Certified Trainer credential from ISTD',
    ],
    iconType: 'layers',
  },
  {
    id: 'poshSection',
    duration: 'Compliance & Legal Specialization',
    shortTitle: 'Certified POSH Trainer',
    title: 'Certified POSH Trainer',
    description:
      'Equip yourself to build safe workplaces with our specialized Prevention of Sexual Harassment trainer certification and legal compliance insights.',
    fullDescription:
      'Equip yourself to build safe workplaces with our specialized Prevention of Sexual Harassment trainer certification. Covers legal mandates, sensitivity handling, and IC committee enablement.',
    features: [
      'Deep-dive into PoSH Act (2013) legal provisions',
      'Internal Committee (IC) capacity building',
      'Inquiry procedures, drafting reports & compliance audits',
      'Interactive role-plays & investigation protocols',
      'Empanelled certified POSH consultant badge',
    ],
    iconType: 'shield',
  },
];

export const CHAPTER_EVENTS: EventItem[] = [
  {
    id: 'event-ai-agents',
    title: 'From AI Assistants to AI Agents: The Next Shift in Business',
    dateBadge: 'August 8, 2026',
    speaker: 'Speaker: Shaheen Siddique',
    description:
      'An exclusive online session exploring the evolution of AI tools and how businesses and trainers can leverage autonomous AI agents for sustainable productivity and workflow innovation.',
    image: '/images/event-ai-agents.jpg',
    venueOrMode: 'Mode: Online Webinar',
  },
  {
    id: 'event-future-ld',
    title: 'Future of L&D: Building Intelligent Learning Ecosystems with AI',
    dateBadge: 'April 11, 2026',
    speaker: 'Speaker: ISTD Expert Panel',
    description:
      'A Foundation Day special session exploring how Artificial Intelligence is reshaping Learning and Development for organizations, colleges, and training institutes.',
    image: '/images/event-future-ld.jpg',
    venueOrMode: 'Foundation Day Special',
  },
];

export const TESTIMONIALS = [
  {
    id: 't1',
    quote:
      'ISTD Thrissur provides an incredible platform for trainers to network, unlearn, and relearn. The local webinars on AI and future tech in HR have been eye-opening and highly practical.',
    author: 'Senior Corporate Trainer',
    role: 'ISTD Thrissur Chapter Member',
  },
  {
    id: 't2',
    quote:
      'The collaborative spirit of the Thrissur chapter members has helped me elevate my corporate training programs significantly. Highly recommended for any L&D professional.',
    author: 'Executive L&D Consultant',
    role: 'Leading Tech & Manufacturing Sectors',
  },
  {
    id: 't3',
    quote:
      'Being part of ISTD has connected me with the most seasoned HR leaders and educators across Kerala. The PGP program is truly a game-changer for aspiring learning leaders.',
    author: 'Head of Talent Development',
    role: 'Cochin & Thrissur Region',
  },
];
