import React from "react";
import GeneralLayout from "../../layouts/GeneralLayout";
import SnetConverterForm from "../../components/SnetConverterForm";

const Converter = (): React.ReactElement => {
    return (
        <React.Fragment>
            <GeneralLayout>
                <SnetConverterForm />
            </GeneralLayout>
        </React.Fragment>
    )
}

export default Converter;