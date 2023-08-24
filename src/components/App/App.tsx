import React, { Suspense } from "react";
import UnderConstruction from "../UnderConstruction/UnderConstruction";
import useGATracker from "../../hooks/GATracker/GATracker";
import ApplicationRouter from "../../router";

const App = (): JSX.Element => {
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
            <Suspense fallback={null}>
                <ApplicationRouter />
            </Suspense>
        </React.Fragment>
    );
};

export default App;
