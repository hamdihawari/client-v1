import { useState, useEffect } from "react";

export const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => setMatches(media.matches);
        window.addEventListener("resize", listener);
        return () => window.removeEventListener("resize", listener);
    }, [matches, query]);

    return matches;
}

export default useMediaQuery;



// Case One: 
/* import { useState, useEffect } from "react";

export const useMediaQuery = (query, defaultMatches = window.matchMedia(query)) => {
    const [matches, setMatches] = useState(defaultMatches);

    useEffect(() => {
        const media = window.matchMedia(query);

        const listener = () => setMatches(media.matches);
        if (media.matches !== matches) {
            setMatches(media.matches);
            media.addListener(listener)
        }
        return () => window.removeEventListener("resize", listener);
    }, [query, matches]);

    return matches;
}

export default useMediaQuery; */