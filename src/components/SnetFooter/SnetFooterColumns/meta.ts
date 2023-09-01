export interface FooterLink {
    label: string;
    href: string;
}

export interface FooterColumn {
    title: React.ReactElement | string;
    links: FooterLink[];
}

export const columnsMeta: FooterColumn[] = [
    {
        title: "Snet",
        links: [
            {
                label: "Contact Us",
                href: "https://singularitynet.io/contact/",
            },
            {
                label: "PrivacyPolicy",
                href: "https://public.singularitynet.io/privacy_policy.html",
            },
        ],
    },
    {
        title: "Products",
        links: [
            {
                label: "AI Marketplace",
                href: "https://beta.singularitynet.io",
            },
            {
                label: "AGI Staking",
                href: "https://staking.singularitynet.io",
            },
            {
                label: "AI publisher",
                href: "https://publisher.singularitynet.io/",
            },
            {
                label: "Developer Portal",
                href: "https://dev.singularitynet.io/",
            },
        ],
    },
    {
        title: "Community",
        links: [
            {
                label: "Official Blog",
                href: "https://blog.singularitynet.io/",
            },
            {
                label: "Documentation",
                href: "https://singularitynet.gitbook.io/welcome-to-gitbook/",
            },
            {
                label: "Forum",
                href: "https://community.singularitynet.io/",
            },
            {
                label: "Telegram",
                href: "https://telegram.me/singularitynet",
            },
        ],
    },
    {
        title: "Ecosystem",
        links: [
            {
                label: "Singularity DAO",
                href: "https://singularitydao.ai/",
            },
            {
                label: "Rejuve",
                href: "https://rejuve.ai/",
            },
            {
                label: "Nunet",
                href: "https://nunet.io/",
            },
        ],
    },
    {
        title: "Social Media",
        links: [
            {
                label: "Twitter",
                href: "https://twitter.com/singularity_net",
            },
            {
                label: "Facebook",
                href: "https://www.facebook.com/singularityNET.io",
            },
            {
                label: "LinkedIn",
                href: "https://www.linkedin.com/company/singularitynet/",
            },
            {
                label: "YouTube",
                href: "https://www.youtube.com/channel/UCbTE8vfz5zuEK5uRnc2yjrw",
            },
            {
                label: "Instagram",
                href: "https://instagram.com/singularitynet.io",
            },
        ],
    },
];
