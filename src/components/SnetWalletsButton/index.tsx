import React from "react";
import "./style.css";
import { Box, Button } from "@mui/material";

const SnetWalletsButton = (): React.ReactElement => {
    return (
        <React.Fragment>
            <Box className="wallets-button-container">
                <Button variant="contained">Connect wallets</Button>
            </Box>
        </React.Fragment>
    );
};

export default SnetWalletsButton;
