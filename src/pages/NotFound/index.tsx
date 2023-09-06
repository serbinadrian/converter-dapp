import { Box } from "@mui/material";
import React from "react";

const NotFound = (): React.ReactElement => {
    return (
        <React.Fragment>
            <Box className="not-found">
                <img
                    src={
                        require("../../assets/images/background/not_found.svg")
                            .default
                    }
                    alt="Not Found"
                />
            </Box>
        </React.Fragment>
    );
};

export default NotFound;
