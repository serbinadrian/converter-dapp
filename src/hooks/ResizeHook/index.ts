import { useState, useEffect } from "react";

export const useResize = () => {
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

    const handleResize = (): void => {
        setWindowWidth(window.innerWidth);
    };

    const addWindowResizeListener = (): void => {
        window.addEventListener("resize", handleResize);
    };

    const removeWindowResizeListener = (): void => {
        window.removeEventListener("resize", handleResize);
    };

    useEffect(() => {
        addWindowResizeListener();
        return () => {
            removeWindowResizeListener();
        };
    });

    return {
        windowWidth,
    };
};
