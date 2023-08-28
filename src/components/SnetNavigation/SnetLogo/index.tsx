import { Link } from "@mui/material";
import { paths } from "../../../utils/constants/constants";
import React from "react";

const SnetLogo = (): React.ReactElement => {

    return (
        <React.Fragment>
            <Link href={paths.CONVERTER} className="nav-element">
                <img src={require("../../../assets/images/bridge_logo.svg").default} alt="SingularityNet Bridge"/>
            </Link>
        </React.Fragment>
    );
};

export default SnetLogo;
