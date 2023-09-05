import { footerLinks } from "../../utils/constants/constants";

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

//primary flag replaces title with Snet logo and changes block behavior
export const columnsMeta: FooterColumn[] = [
    {
        key: 0,
        isPrimary: true,
        title: "SingularityNet",
        links: [
            {
                key: 0,
                label: "Contact Us",
                href: footerLinks.CONTACT_US,
            },
            {
                key: 1,
                label: "PrivacyPolicy",
                href: footerLinks.PRIVACY_POLICY,
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
                href: footerLinks.AI_MARKETPLACE,
            },
            {
                key: 1,
                label: "AGI Staking",
                href: footerLinks.AGI_STAKING,
            },
            {
                key: 2,
                label: "AI publisher",
                href: footerLinks.AI_PUBLISHER,
            },
            {
                key: 3,
                label: "Developer Portal",
                href: footerLinks.DEVELOPER_PORTAL,
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
                href: footerLinks.BLOG,
            },
            {
                key: 1,
                label: "Documentation",
                href: footerLinks.DOCUMENTATION,
            },
            {
                key: 2,
                label: "Forum",
                href: footerLinks.FORUM,
            },
            {
                key: 3,
                label: "Telegram",
                href: footerLinks.TELEGRAM,
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
                href: footerLinks.SDAO,
            },
            {
                key: 1,
                label: "Rejuve",
                href: footerLinks.REJUVE,
            },
            {
                key: 2,
                label: "Nunet",
                href: footerLinks.NUNET,
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
                href: footerLinks.TWITTER,
            },
            {
                key: 1,
                label: "Facebook",
                href: footerLinks.FACEBOOK,
            },
            {
                key: 2,
                label: "LinkedIn",
                href: footerLinks.LINKED_IN,
            },
            {
                key: 3,
                label: "YouTube",
                href: footerLinks.YOU_TUBE,
            },
            {
                key: 4,
                label: "Instagram",
                href: footerLinks.INSTAGRAM,
            },
        ],
    },
];
