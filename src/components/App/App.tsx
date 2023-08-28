import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { LinearProgress } from "@mui/material";
import UnderConstruction from "../UnderConstruction/UnderConstruction";
import useGATracker from "../../hooks/GATracker/GATracker";
import ApplicationRouter from "../../router";
import store from "../../store/index";
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

    console.log('store', store);

    return (
        <React.Fragment>
            <Suspense fallback={<LinearProgress />}>
                <Provider store={store}>
                    <ApplicationRouter />
                </Provider>
            </Suspense>
        </React.Fragment>
    );
};

export default App;
