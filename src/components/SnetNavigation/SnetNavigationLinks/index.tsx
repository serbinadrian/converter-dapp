import React from "react";
import { useLocation } from "react-router-dom";
import { paths } from "../../../utils/constants/constants";
import { Link } from "@mui/material";

interface NavigationLink {
    key: string;
    path: string;
    label: string;
}

interface NavigationLinkProps {
    link: NavigationLink;
}

const SnetNavigationLinks = (): React.ReactElement => {
    const currentPage = useLocation();

    const linksMeta: NavigationLink[] = [
        {
            key: "converter",
            path: paths.CONVERTER,
            label: "Converter",
        },
        {
            key: "transactions",
            path: paths.TRANSACTIONS,
            label: "Transactions",
        },
        {
            key: "contact",
            path: paths.CONTACT,
            label: "Contact",
        },
    ];

    const NavigationLinkElement = ({
        link,
    }: NavigationLinkProps): React.ReactElement => {
        const linkClassName =
            currentPage.pathname === link.path
                ? "active nav-element"
                : "nav-element";

        return (
            <React.Fragment>
                <Link href={link.path} className={linkClassName}>
                    {link.label}
                </Link>
            </React.Fragment>
        );
    };

    return (
        <React.Fragment>
            {linksMeta.map((link: NavigationLink) => (
                <NavigationLinkElement link={link} key={link.key}/>
            ))}
        </React.Fragment>
    );
};

export default SnetNavigationLinks;
