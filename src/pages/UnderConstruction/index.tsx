import { Box } from "@mui/material";
import React from "react";

const UnderConstruction = (): React.ReactElement => {
    return (
        <React.Fragment>
            <Box className="under-construction">
                <img
                    src={
                        require("../../assets/images/background/under_construction.svg")
                            .default
                    }
                    alt="under-construction"
                />
            </Box>
        </React.Fragment>
    );
};

export default UnderConstruction;
