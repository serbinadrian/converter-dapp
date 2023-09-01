import { paths } from "../../../utils/constants/constants";

export interface NavigationLink {
    key: string;
    path: string;
    label: string;
}

export const linksMeta: NavigationLink[] = [
    {
        key: "converter",
        path: paths.CONVERTER,
        label: "Converter",
    },
    {
        key: "transactions",
        path: paths.TRANSACTIONS,
        label: "Transactions",
    },
    {
        key: "contact",
        path: paths.CONTACT,
        label: "Contact",
    },
];
