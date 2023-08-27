import { Route, Routes } from "react-router-dom";
import { paths } from "../utils/constants/constants";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import Contact from "../pages/Contact";
import Converter from "../pages/Converter";
import NotFound from "../pages/NotFound";
import Transactions from "../pages/Transactions";

const ApplicationRouter = (): React.ReactElement => {
    return (
        <React.Fragment>
            <BrowserRouter>
                <Routes>
                    <Route path={paths.CONVERTER} element={<Converter />} />
                    <Route
                        path={paths.TRANSACTIONS}
                        element={<Transactions />}
                    />
                    <Route path={paths.CONTACT} element={<Contact />} />
                    <Route path={paths.NOT_FOUND} element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </React.Fragment>
    );
};

export default ApplicationRouter;
