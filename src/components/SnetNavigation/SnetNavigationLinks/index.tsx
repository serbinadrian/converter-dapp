import React from "react";
import { Link } from "@mui/material";
import { useLocation } from "react-router-dom";
import { linksMeta, type NavigationLink } from "./meta";

interface NavigationLinkProps {
    link: NavigationLink;
}

const SnetNavigationLinks = (): React.ReactElement => {
    const currentPage = useLocation();

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
