import { ReactNode } from "react";

export interface MainContextType {
    loaded: boolean;
    setSiteLoader: (val: boolean) => void;
    settings: any; // You can replace `any` with a proper type if you know the shape
}

export type MainProviderType = {
    children: ReactNode;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export type TimerType = {
    start_time: number;
    end_time: number;
}