export interface FooterLink {
    key: number;
    label: string;
    href: string;
}

export interface FooterColumn {
    key: number;
    isPrimary: boolean;
    title: React.ReactElement | string;
    links: FooterLink[];
}

export const columnsMeta: FooterColumn[] = [
    {
        key: 0,
        isPrimary: true,
        title: "Snet",
        links: [
            {
                key: 0,
                label: "Contact Us",
                href: "https://singularitynet.io/contact/",
            },
            {
                key: 1,
                label: "PrivacyPolicy",
                href: "https://public.singularitynet.io/privacy_policy.html",
            },
        ],
    },
    {
        key: 1,
        isPrimary: false,
        title: "Products",
        links: [
            {
                key: 0,
                label: "AI Marketplace",
                href: "https://beta.singularitynet.io",
            },
            {
                key: 1,
                label: "AGI Staking",
                href: "https://staking.singularitynet.io",
            },
            {
                key: 2,
                label: "AI publisher",
                href: "https://publisher.singularitynet.io/",
            },
            {
                key: 3,
                label: "Developer Portal",
                href: "https://dev.singularitynet.io/",
            },
        ],
    },
    {
        key: 2,
        isPrimary: false,
        title: "Community",
        links: [
            {
                key: 0,
                label: "Official Blog",
                href: "https://blog.singularitynet.io/",
            },
            {
                key: 1,
                label: "Documentation",
                href: "https://singularitynet.gitbook.io/welcome-to-gitbook/",
            },
            {
                key: 2,
                label: "Forum",
                href: "https://community.singularitynet.io/",
            },
            {
                key: 3,
                label: "Telegram",
                href: "https://telegram.me/singularitynet",
            },
        ],
    },
    {
        key: 3,
        isPrimary: false,
        title: "Ecosystem",
        links: [
            {
                key: 0,
                label: "Singularity DAO",
                href: "https://singularitydao.ai/",
            },
            {
                key: 1,
                label: "Rejuve",
                href: "https://rejuve.ai/",
            },
            {
                key: 2,
                label: "Nunet",
                href: "https://nunet.io/",
            },
        ],
    },
    {
        key: 4,
        isPrimary: false,
        title: "Social Media",
        links: [
            {
                key: 0,
                label: "Twitter",
                href: "https://twitter.com/singularity_net",
            },
            {
                key: 1,
                label: "Facebook",
                href: "https://www.facebook.com/singularityNET.io",
            },
            {
                key: 2,
                label: "LinkedIn",
                href: "https://www.linkedin.com/company/singularitynet/",
            },
            {
                key: 3,
                label: "YouTube",
                href: "https://www.youtube.com/channel/UCbTE8vfz5zuEK5uRnc2yjrw",
            },
            {
                key: 4,
                label: "Instagram",
                href: "https://instagram.com/singularitynet.io",
            },
        ],
    },
];
