import { ReactNode } from "react";

export interface basicPopupProps {
    shouldShow: boolean;
    title: string;
    onRequestClose: () => void;
    children: ReactNode;
}