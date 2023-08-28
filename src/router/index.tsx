import { Route, Routes } from "react-router-dom";
import { paths } from "../utils/constants/constants";
import { BrowserRouter } from "react-router-dom";
import React from "react";

const Converter = React.lazy(() => import('../pages/Converter'));
const Transactions = React.lazy(() => import('../pages/Transactions'));
const Contact = React.lazy(() => import('../pages/Contact'));
const NotFound = React.lazy(() => import('../pages/NotFound'));

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
