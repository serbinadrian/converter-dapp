import ReactGA from "react-ga";

const useGATracker = () => {
    const setup = (): void => {
        const trackingId: string | undefined =
            process.env.REACT_APP_GA_TRACKING_ID;

        if (!trackingId) {
            return;
        }

        ReactGA.initialize(trackingId, {
            standardImplementation: true,
        });
        ReactGA.pageview(window.location.pathname + window.location.search);
    };

    return {
        setup,
    };
};

export default useGATracker;
