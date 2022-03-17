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
      { label: 'AI Marketplace', link: 'https://beta.singularitynet.io' },
      { label: 'AGI Staking', link: 'https://staking.singularitynet.io' },
      { label: 'AI Publisher', link: 'https://publisher.singularitynet.io/' },
      { label: 'Developer Portal', link: 'https://dev.singularitynet.io/' }
    ]
  },
  {
    title: 'Community',
    children: [
      { label: 'Official Blog', link: 'http://blog.singularitynet.io/' },
      { label: 'Documentation', link: 'https://singularitynet.gitbook.io/welcome-to-gitbook/bridge/overview' },
      { label: 'Forum', link: 'https://community.singularitynet.io/' },
      { label: 'Telegram', link: 'https://telegram.me/singularitynet' }
    ]
  },
  {
    title: 'Ecosystem',
    children: [
      { label: 'SingularityDAO', link: 'https://singularitydao.ai/' },
      { label: 'Rejuve', link: 'https://rejuve.ai/' },
      { label: 'Nunet', link: 'https://nunet.io/' }
    ]
  },
  {
    title: 'Social Media',
    children: [
      { label: 'Twitter', link: 'https://twitter.com/singularity_net' },
      { label: 'Facebook', link: 'https://www.facebook.com/singularityNET.io' },
      { label: 'Linkedin', link: 'https://www.linkedin.com/company/singularitynet/' },
      { label: 'Youtube', link: 'https://www.youtube.com/channel/UCbTE8vfz5zuEK5uRnc2yjrw' },
      { label: 'Instagram', link: 'https://instagram.com/singularitynet.io' }
    ]
  }
];

export const FooterData = {
  PrimaryFooterLeft,
  PrimaryFooterMain
};
