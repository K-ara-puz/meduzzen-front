import { ReactNode } from "react";

export interface BasicPopupProps {
    shouldShow: boolean;
    title: string;
    onRequestClose: () => void;
    children: ReactNode;
}