import lallImg from '../assets/landing/lall.webp'
import lunnonImg from '../assets/landing/lunnon.webp'
import fleggImg from '../assets/landing/flegg.webp'
import user1Img from '../assets/landing/user1.png'
import user2Img from '../assets/landing/user2.png'

export const mockStudents = [
  {
    id: 0,
    name: 'Nnadi Betel',
    level: 300,
    age: 25,
    paymentStatus: 'paid',
    wallet: '0xAbCd...1234',
  },
  {
    id: 1,
    name: 'Owase Samuel',
    level: 300,
    age: 24,
    paymentStatus: 'unpaid',
    wallet: '0x0000...0000',
  },
  {
    id: 2,
    name: 'Arowolo Mutmahinat',
    level: 100,
    age: 19,
    paymentStatus: 'paid',
    wallet: '0x9fA1...77bC',
  },
]

export const mockStaff = [
  {
    id: 0,
    name: 'Miss Shuiab Ganiyat',
    salary: 2500,
    status: 'active',
    wallet: '0xDeAd...bEeF',
    lastPaid: '2025-02-28',
  },
  {
    id: 1,
    name: 'Miss Egbela Joy',
    salary: 1300,
    status: 'suspended',
    wallet: '0x1111...2222',
    lastPaid: null,
  },
  {
    id: 2,
    name: 'Mr. Adefala Taiwo',
    salary: 2500,
    status: 'active',
    wallet: '0x7aB2...e91C',
    lastPaid: '2025-03-12',
  },
]

export const mockContractBalance = 985000

export const landingStats = [
  { id: 'stat-students', value: '10,000+', label: 'Students Enrolled' },
  { id: 'stat-faculty', value: '500+', label: 'Faculty Members' },
  { id: 'stat-transactions', value: '$2M+', label: 'Transactions Processed' },
  { id: 'stat-uptime', value: '99.9%', label: 'Uptime Guarantee' },
]

export const landingSecurityChecks = [
  'Ethereum L2 secured with full transparency',
  'AES-256 encryption at rest & in transit',
  '99.9% uptime SLA + daily on-chain backups',
  'Multi-sig wallet protection for institutional funds',
]

export const landingTestimonials = [
  {
    id: 'testimonial-1',
    name: 'Dr. Dolapo Ajala',
    role: 'School Administrator',
    org: 'Redhill Academy',
    location: 'Lagos, NG',
    image: lallImg,
    quote:
      'ExcelSchool has transformed our administrative processes, making communication and resource management seamless. The blockchain transparency gave our board complete confidence in financial reporting.',
  },
  {
    id: 'testimonial-2',
    name: 'Prof. Adeleke Theophilus',
    role: 'Dean of Students',
    org: 'Lunnon University',
    location: 'Ibadan, NG',
    image: lunnonImg,
    quote:
      "ExcelSchool's robust features have streamlined our operations, from attendance tracking to payroll. It's reliable, intuitive, and has significantly enhanced our efficiency across all departments.",
  },
  {
    id: 'testimonial-3',
    name: 'Gyimah Tunbosun',
    role: 'Lead Instructor',
    org: 'Wellington College',
    location: 'Accra, GH',
    image: fleggImg,
    quote:
      "Using ExcelSchool has made institutional management so much easier, with instant access to on-chain records and teaching resources. It saves time and boosts our team's productivity.",
  },
  {
    id: 'testimonial-4',
    name: 'Ajah Nursca',
    role: 'Registrar',
    org: 'Newbridge Institute',
    location: 'Abuja, NG',
    image: user1Img,
    quote:
      'The ledger dashboard made audits painless. We can verify approvals and fees in minutes, not days.',
  },
  {
    id: 'testimonial-5',
    name: 'Sunday Justice',
    role: 'Bursar',
    org: 'Riverside Polytechnic',
    location: 'Port Harcourt, NG',
    image: user2Img,
    quote:
      'Payroll runs are smoother and errors dropped sharply after onboarding ExcelSchool. Our staff love the transparency.',
  },
]
