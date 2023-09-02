import { paths } from "../../../utils/constants/constants";

export interface NavigationLink {
    key: number;
    path: string;
    label: string;
}

export const linksMeta: NavigationLink[] = [
    {
        key: 0,
        path: paths.CONVERTER,
        label: "Converter",
    },
    {
        key: 1,
        path: paths.TRANSACTIONS,
        label: "Transactions",
    },
    {
        key: 2,
        path: paths.CONTACT,
        label: "Contact",
    },
];
