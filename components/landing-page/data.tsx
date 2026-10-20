import { FaGithub, FaGoogleDrive, FaLinkedin } from 'react-icons/fa';
import { z } from 'zod';

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters'),

  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(254, 'Email must not exceed 254 characters'),

  message: z
    .string()
    .trim()
    .min(1, 'Message is required')
    .max(5000, 'Message must not exceed 5000 characters'),
});

export const LANGUAGE_ITEMS = [
  {
    id: 0,
    label: 'HTML',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    href: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
  },
  {
    id: 1,
    label: 'CSS',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    href: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
  },
  {
    id: 2,
    label: 'JavaScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  },
  {
    id: 3,
    label: 'TypeScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    href: 'https://www.typescriptlang.org/',
  },
  {
    id: 4,
    label: 'React',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    href: 'https://react.dev/',
  },
  {
    id: 5,
    label: 'Next.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    href: 'https://nextjs.org/',
  },
  {
    id: 6,
    label: 'Node.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    href: 'https://nodejs.org/',
  },
  {
    id: 7,
    label: 'Express.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    href: 'https://expressjs.com/',
  },
  {
    id: 8,
    label: 'PostgreSQL',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    href: 'https://www.postgresql.org/',
  },
];

export const SKILL_GROUPS = [
  {
    id: 0,
    label: 'Frontend Development',
    items: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'HTML',
      'CSS',
      'Tailwind CSS',
      'Responsive Design',
    ],
  },
  {
    id: 1,
    label: 'Backend Development',
    items: [
      'Node.js',
      'Express.js',
      'REST APIs',
      'Authentication',
      'CRUD Operations',
    ],
  },
  {
    id: 2,
    label: 'Databases',
    items: [
      'PostgreSQL',
      'SQL',
      'Supabase',
      'Relational Database Design',
    ],
  },
  {
    id: 3,
    label: 'Tools & State Management',
    items: [
      'Git',
      'GitHub',
      'Redux Toolkit',
      'Context API',
      'Axios',
      'Vite',
    ],
  },
];

export const SOCIAL_ITEMS = [
  { label: 'CV_Drive',  icon: <FaGoogleDrive size={20} />, href: 'https://drive.google.com/file/d/1OiJOcmBnnf7WlKAtj3ObMvkH-g-dus4F/view?usp=drive_link' },
  { label: 'Github',    icon: <FaGithub size={20} />,      href: 'https://github.com/MuhammedAhmed09' },
  { label: 'LinkedIn',  icon: <FaLinkedin size={20} />,    href: 'https://www.linkedin.com/in/muhammad-ahmad-a29078307/' },
];