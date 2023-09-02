import React from "react";
import SnetNavigation from "../../components/SnetNavigation";
import SnetFooter from "../../components/SnetFooter";

interface Props {
    children: React.ReactElement;
}

const GeneralLayout = ({ children }: Props): React.ReactElement => {
    return (
        <React.Fragment>
            <header className="navigation-bar">
                <SnetNavigation />
            </header>
            <main>
                {children}
            </main>
            <footer>
                <SnetFooter />
            </footer>
        </React.Fragment>
    );
};

export default GeneralLayout;
