import React from "react";
import { useLocation } from "react-router-dom";
import { paths } from "../../../utils/constants/constants";
import { Link } from "@mui/material";

interface NavigationLink {
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
            path: paths.CONVERTER,
            label: "Converter",
        },
        {
            path: paths.TRANSACTIONS,
            label: "Transactions",
        },
        {
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
                <NavigationLinkElement link={link} />
            ))}
        </React.Fragment>
    );
};

export default SnetNavigationLinks;
