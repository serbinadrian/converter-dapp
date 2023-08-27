import React from "react";
import "./style.css";
import SnetNavigation from "../../components/SnetNavigation";

interface Props {
    children: React.ReactElement;
}

const GeneralLayout = ({ children }: Props): React.ReactElement => {

    return (
        <React.Fragment>
            <header>
                <SnetNavigation />
            </header>
            <main>{children}</main>
        </React.Fragment>
    );
};

export default GeneralLayout;
