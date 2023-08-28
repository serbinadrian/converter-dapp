import React from "react";
import "./style.css";
import { Box, Button } from "@mui/material";

interface Props {
    onClick: () => void;
}

const SnetWalletsButton = ({ onClick }: Props): React.ReactElement => {
    return (
        <React.Fragment>
            <Box className="wallets-button-container">
                <Button variant="contained" onClick={onClick}>
                    Connect wallets
                </Button>
            </Box>
        </React.Fragment>
    );
};

export default SnetWalletsButton;
