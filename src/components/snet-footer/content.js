const PrimaryFooterLeft = [
  {
    label: 'Contact Us',
    link: 'https://singularitynet.io/contact/',
    internalLink: false
  },
  {
    label: 'Privacy Policy',
    link: 'https://public.singularitynet.io/privacy_policy.html',
    internalLink: false
  }
];

const PrimaryFooterMain = [
  {
    title: 'Products',
    children: [
      { label: 'AI Marketplace', link: 'https://beta.singularitynet.io', internalLink: false },
      { label: 'AGI Staking', link: 'https://staking.singularitynet.io', internalLink: false },
      { label: 'AI Publisher', link: 'https://publisher.singularitynet.io/', internalLink: false },
      { label: 'Developer Portal', link: 'https://dev.singularitynet.io/', internalLink: false }
    ]
  },
  {
    title: 'Community',
    children: [
      { label: 'Official Blog', link: 'https://blog.singularitynet.io/', internalLink: false },
      { label: 'Documentation', link: 'https://singularitynet.gitbook.io/welcome-to-gitbook/bridge/overview', internalLink: false },
      { label: 'Forum', link: 'https://community.singularitynet.io/', internalLink: false },
      { label: 'Telegram', link: 'https://telegram.me/singularitynet', internalLink: false }
    ]
  },
  {
    title: 'Ecosystem',
    children: [
      { label: 'SingularityDAO', link: 'https://singularitydao.ai/', internalLink: false },
      { label: 'Rejuve', link: 'https://rejuve.ai/', internalLink: false },
      { label: 'Nunet', link: 'https://nunet.io/', internalLink: false }
    ]
  },
  {
    title: 'Social Media',
    children: [
      { label: 'Twitter', link: 'https://twitter.com/singularity_net', internalLink: false },
      { label: 'Facebook', link: 'https://www.facebook.com/singularityNET.io', internalLink: false },
      { label: 'Linkedin', link: 'https://www.linkedin.com/company/singularitynet/', internalLink: false },
      { label: 'Youtube', link: 'https://www.youtube.com/channel/UCbTE8vfz5zuEK5uRnc2yjrw', internalLink: false },
      { label: 'Instagram', link: 'https://instagram.com/singularitynet.io', internalLink: false }
    ]
  }
];

export const FooterData = {
  PrimaryFooterLeft,
  PrimaryFooterMain
};
