import React, { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import UnderConstruction from "../UnderConstruction/UnderConstruction";
import useGATracker from "../../hooks/GATracker/GATracker";
import ApplicationRouter from "../../router";
import "./style.css";

const App = (): React.ReactElement => {
    const tracker = useGATracker();
    tracker.setup();

    const isApplicationInConstructionMode: boolean = JSON.parse(
        process.env.REACT_APP_IS_UNDER_CONSTRUCTION ?? "false"
    );

    if (isApplicationInConstructionMode) {
        return <UnderConstruction />;
    }

    return (
        <React.Fragment>
            <Suspense fallback={<LinearProgress />}>
                <ApplicationRouter />
            </Suspense>
        </React.Fragment>
    );
};

export default App;
