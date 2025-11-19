import { JSX } from "react/jsx-runtime";

export interface ISpecialty {
    map(arg0: (speciality: any) => JSX.Element): import("react").ReactNode;
    id: string;
    title: string;
    icon: string;
}