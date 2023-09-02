import React from "react";
import { Box } from "@mui/material";
import SnetFooterColumns from "../SnetFooterColumns";
import SnetFooterCopyright from "../SnetFooterCopyright";
import "./style.css";

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
