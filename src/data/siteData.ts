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
  linkedin?: string;
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
    src: '/photos/team-istd.jpeg',
    badge: 'ISTD Thrissur Chapter • 55 Years of ISTD Legacy',
    title: 'Leading Transformation Through Training & Development',
    desc: 'Connecting HR Leaders, Corporate Trainers, Academicians & Industry Pioneers across Central Kerala',
    caption:
      'ISTD National & Regional Executive Leaders together with the ISTD Thrissur (Trichur) Chapter Managing Committee and professional fraternity.',
  },
  {
    src: '/photos/istd-calicut.jpeg',
    badge: 'Executive Knowledge Exchange',
    title: 'Strengthening the Regional L&D & HRD Ecosystem',
    desc: 'A collaborative forum for learning, knowledge exchange, and leadership development',
    caption:
      'National and Regional ISTD leaders sharing strategic perspectives on human resource development and workplace learning excellence.',
  },
  {
    src: '/photos/istd-national-president.jpeg',
    badge: 'National Affiliation • ISTD New Delhi',
    title: 'Recognized National Platform for L&D Professionals',
    desc: 'Affiliated with ISTD National (Est. 1970) and IFTDO Geneva',
    caption:
      'ISTD National President Shri. Atul Shah, Regional Vice President (South) Prof. (Dr.) Zakkariya K A, and National Treasurer Shri. Nabaghana Pany.',
  },
  {
    src: '/photos/istd-22.jpeg',
    badge: 'Tradition & Professional Excellence',
    title: 'Empowering Organizations & Learning Leaders in Kerala',
    desc: 'Advancing human capital through knowledge exchange, research, and executive forums',
    caption:
      'Chapter Chairman Shri. Tony Chacko and Regional VP Prof. (Dr.) Zakkariya K A alongside ISTD National Executive leaders.',
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
      "Shri. Nabaghan Pany (National Treasurer, ISTD) addressing the Thrissur Chapter members and highlighting ISTD's national growth and collaborative learning initiatives.",
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
    email: 'info@istd.in',
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

export const OFFICIAL_LINKS = {
  istdNationalWeb: 'https://www.istd.in/',
  istdNationalLinkedin: 'https://www.linkedin.com/school/istd-india/',
  istdTrichurLinkedin: 'https://www.linkedin.com/company/istd-trichur/',
};

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
    designation: 'Chairman, ISTD Trichur Chapter',
    linkedin: 'https://www.linkedin.com/in/tony-chacko-965622240/',
    photo: '/photos/istd-tony-chacko.jpeg',
  },
];

export const CHAPTER_CORE_CONTRIBUTORS = [
  {
    name: 'Shri. Tony Chacko',
    role: 'Chairman, ISTD Trichur Chapter',
    linkedin: 'https://www.linkedin.com/in/tony-chacko-965622240/',
  },
  {
    name: 'Ms. Sneha Rose George',
    role: 'Secretary, ISTD Trichur Chapter',
    linkedin: 'https://www.linkedin.com/in/sneha-rose-george-4176a325/',
  },
  {
    name: 'Mr. Jibin N',
    role: 'Treasurer, ISTD Trichur Chapter',
    linkedin: 'https://www.linkedin.com/in/jibintcr/',
  },
  {
    name: 'Mr. Nisam',
    role: 'Chapter Leadership & Core Team',
  },
  {
    name: 'Dr. Minu Gopal',
    role: 'Chapter Leadership & Core Team',
  },
  {
    name: 'Dr. Dhanya Alex',
    role: 'Chapter Leadership & Core Team',
  },
  {
    name: 'Mr. Jobin Kuriakose',
    role: 'Chapter Leadership & Core Team',
  },
  {
    name: 'Mr. Anil Komban',
    role: 'Chapter Leadership & Core Team',
  },
  {
    name: 'Ms. Rohini',
    role: 'Chapter Leadership & Core Team',
  },
  {
    name: 'Mr. Manoj Pushkaran',
    role: 'Chapter Leadership & Core Team',
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
    id: 'knowledgeForums',
    badge: 'Core Initiative',
    duration: 'Monthly & Quarterly Forums',
    shortTitle: 'Executive Knowledge Sharing & L&D Forums',
    title: 'Executive Knowledge Sharing & L&D Forums',
    description:
      'Interactive conclaves, expert webinars, and leadership roundtables exploring emerging trends in AI, workplace learning, and organizational development.',
    fullDescription:
      'Curated monthly and quarterly knowledge-sharing sessions bringing together CHROs, corporate trainers, academicians, and industry practitioners to exchange actionable insights on modern L&D.',
    features: [
      'Expert webinars on AI, Future of Work & HR transformation',
      'Interactive panel discussions with industry & academic leaders',
      'Case-study presentations on organizational talent practices',
      'Peer-to-peer problem solving & best-practice exchange',
      'Open to HR practitioners, trainers, educators & leaders',
    ],
    featured: true,
    iconType: 'layers',
  },
  {
    id: 'academiaCollaboration',
    duration: 'Institutional Partnerships',
    shortTitle: 'Industry–Academia & Campus Initiatives',
    title: 'Industry–Academia & Campus Collaboration',
    description:
      'Bridging universities, B-schools, and industry leaders across Central Kerala through Faculty Development Programs (FDPs) and employability labs.',
    fullDescription:
      'A dedicated collaborative bridge connecting colleges, universities, and research scholars with corporate HR leaders to align academic learning with real-world workplace readiness.',
    features: [
      'Faculty Development Programs (FDPs) on modern pedagogy',
      'Campus-to-Corporate employability & leadership sessions',
      'Joint research & scholarly exchange with universities',
      'Mentorship for management & HR students across Kerala',
      'Institutional tie-ups with premier colleges in Thrissur',
    ],
    iconType: 'diploma',
  },
  {
    id: 'trainerLabs',
    duration: 'Practitioner Community',
    shortTitle: 'Facilitator & HRD Skill Labs',
    title: 'Corporate HRD & Facilitator Skill Labs',
    description:
      'Hands-on peer-learning labs and workshops designed for corporate trainers, educators, and OD practitioners to sharpen facilitation methodologies.',
    fullDescription:
      'Practical, experiential workshops where trainers, facilitators, and HR professionals co-create learning tools, explore adult learning frameworks, and elevate workplace training impact.',
    features: [
      'Experiential facilitation & instructional design clinics',
      'Training Needs Identification (TNI) & impact evaluation',
      'Behavioral coaching, leadership labs & group dynamics',
      'Custom corporate MDP & organizational OD advisory',
      'Collaborative networking across Central Kerala chapters',
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
      'Being part of ISTD has connected me with the most seasoned HR leaders and educators across Kerala. The knowledge-sharing sessions and peer network are truly invaluable for learning leaders.',
    author: 'Head of Talent Development',
    role: 'Cochin & Thrissur Region',
  },
];
