// Edit this file to make the site yours. Everything here is also the
// fallback content shown when the API is unavailable.
// All copy below is lorem ipsum placeholder text.

export const profile = {
  name: 'Jebin Vasanth',
  role: 'Software Engineer',
  headline: 'Building backend systems and solving engineering problems.',
  intro: 'Software Engineer at Mastercard, passionate about backend development, system design, and building scalable applications.',
  email: 'jebinvasanth2020@gmail.com',
  links: [
    { label: 'GitHub', href: 'https://github.com/JebinVasanth098/' },
    { label: 'LinkedIn', href: 'https://in.linkedin.com/in/jebin-vasanth-652b93226' },
  ],
};

export const askSuggestions = [
  'List his projects',
  'What is his role at Mastercard?',
  'What are his skills?',
];

export const fallbackProjects = [
  {
    slug: 'lorem-ipsum-one',
    name: 'Lorem ipsum project',
    summary:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio praesent libero, sed cursus ante dapibus diam.',
    stack: ['Lorem', 'Ipsum', 'Dolor'],
    links: [{ label: 'Source', href: 'https://github.com/your-handle/project-one' }], // TODO
  },
  {
    slug: 'dolor-sit-amet',
    name: 'Dolor sit amet',
    summary:
      'Sed nisi nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum, praesent mauris fusce nec tellus sed augue semper porta.',
    stack: ['Consectetur', 'Adipiscing'],
    links: [],
  },
  {
    slug: 'consectetur-elit',
    name: 'Consectetur adipiscing',
    summary:
      'Mauris massa vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra.',
    stack: ['Elit', 'Tempor', 'Magna'],
    links: [{ label: 'Source', href: 'https://github.com/your-handle/project-three' }], // TODO
  },
];

export const fallbackPosts = [
  {
  slug: 'lorem-ipsum-dolor',
  title: 'Lorem ipsum dolor sit amet',
  date: '2026-10-10',
  summary: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
  tags: ['Lorem', 'Ipsum'],
  readTime: '3 min read',
  body: [
    { type: 'paragraph', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { type: 'heading', content: 'Curabitur pretium' },
    { type: 'paragraph', content: 'Nullam varius, turpis et commodo pharetra, est eros bibendum elit.' },
    { type: 'list', items: ['Point one', 'Point two'] },
    { type: 'quote', content: 'Integer in mauris eu nibh euismod gravida.' },
  ],
},
];

export const experience = [
  {
    role: 'Software Engineer',
    org: 'Mastercard',
    period: '2025 to present',
    summary:
      'Working as a software engineer at Mastercard, where I am responsible for creating data viz, data pipelines,developing R packages and building internal tools for data analysis and visualization.',
  },
  {
    role: 'Data Analyst',
    org: 'TCS',
    period: '2024 to 2025',
    summary:
      'Worked as a data analyst at TCS, where I was responsible for analyzing large datasets, creating reports and dashboards, and providing insights to support business decisions.',
  },
  {
    role: 'Front End Developer',
    org: 'Thermo Fisher Scientific',
    period: '2023 to 2023'
  }
];
