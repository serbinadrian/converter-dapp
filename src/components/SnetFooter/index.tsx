import React from "react";
import SnetFooterColumns from "./SnetFooterColumns";
import SnetFooterCopyright from "./SnetFooterCopyright";
import "./style.css";
import { Box } from "@mui/material";

const SnetFooter = (): React.ReactElement => {
    return (
        <React.Fragment>
            <Box className="snet-footer">
                <SnetFooterColumns />
                <SnetFooterCopyright />
            </Box>
        </React.Fragment>
    );
};

export default SnetFooter;
