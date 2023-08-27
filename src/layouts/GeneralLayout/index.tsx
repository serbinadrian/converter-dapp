import React from "react";
import "./style.css";
import SnetNavigation from "../../components/SnetNavigation";

interface Props {
    children: React.ReactElement;
}

const GeneralLayout = ({ children }: Props): React.ReactElement => {

    return (
        <React.Fragment>
            <header className="navigation-bar">
                <SnetNavigation />
            </header>
            <main>{children}</main>
        </React.Fragment>
    );
};

export default GeneralLayout;
