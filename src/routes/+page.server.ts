import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  // This will be used for initial SEO data and metadata
  return {
    meta: {
      title: 'Rahul Nangare - Senior Cloud Network & Automation Engineer',
      description: 'Interactive portfolio showcasing expertise in network infrastructure, cloud automation, Python scripting, AWS, Juniper devices, and modern DevOps practices.',
      keywords: 'network engineer, cloud automation, python, aws, juniper, ansible, infrastructure, devops, pune',
      ogImage: '/images/og-image-portfolio.jpg',
      canonical: 'https://rahulnangare.com'
    },
    portfolio: {
      name: 'Rahul Nangare',
      tagline: 'Senior Cloud Network & Automation Engineer',
      location: 'Pune, Maharashtra, India',
      experience: '10+ years',
      specializations: [
        'Network Infrastructure',
        'Cloud Automation', 
        'Python Scripting',
        'AWS Solutions',
        'Juniper Technologies'
      ]
    }
  };
};