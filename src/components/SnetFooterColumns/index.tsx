import React from "react";
import { Box } from "@mui/material";
import { columnsMeta, type FooterColumn } from "./meta";
import SnetFooterColumn from "../SnetFooterColumn";
import "./style.css";

const SnetFooterColumns = (): React.ReactElement => {
    const FooterColumnsContent = (): React.ReactElement => {
        return (
            <React.Fragment>
                {columnsMeta.map((column: FooterColumn) => (
                    <SnetFooterColumn key={column.key} column={column} />
                ))}
            </React.Fragment>
        );
    };

    return (
        <React.Fragment>
            <Box className="columns-container">
                <FooterColumnsContent />
            </Box>
        </React.Fragment>
    );
};

export default SnetFooterColumns;
