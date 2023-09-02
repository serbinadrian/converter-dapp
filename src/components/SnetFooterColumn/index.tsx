import React from "react";
import { Box, Link } from "@mui/material";
import SnetLogo, { logoVariants } from "../SnetLogo";
import type { FooterColumn, FooterLink } from "../SnetFooterColumns/meta";
import "./style.css";

interface Props {
    column: FooterColumn;
}

const SnetFooterColumn = ({ column }: Props): React.ReactElement => {
    const columnClassName = column.isPrimary
        ? "footer-column primary"
        : "footer-column";

    const ColumnTitle = (): React.ReactElement => {
        return (
            <React.Fragment>
                {column.isPrimary ? (
                    <SnetLogo
                        variant={logoVariants.LIGHT}
                        additionalClassName={"column-title"}
                    />
                ) : (
                    <h3 className="column-title">{column.title}</h3>
                )}
            </React.Fragment>
        );
    };

    const ColumnLinks = (): React.ReactElement => {
        return (
            <React.Fragment>
                <ul className="column-links">
                    {column.links.map((link: FooterLink) => (
                        <li key={link.key}>
                            <Link href={link.href} className="column-link">
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </React.Fragment>
        );
    };

    return (
        <React.Fragment>
            <Box className={columnClassName}>
                <ColumnTitle />
                <ColumnLinks />
            </Box>
        </React.Fragment>
    );
};

export default SnetFooterColumn;
