import React from "react";

interface Props {
    children: React.ReactElement;
}

const GeneralLayout = ({ children }: Props): React.ReactElement => {
    return (
        <React.Fragment>
            <main>
                {children}
            </main>
        </React.Fragment>
    );
};

export default GeneralLayout;
