import { useState, useEffect } from 'react'

export const useSearchParamsClient = () => {
    const [searchParams, setSearchParams] = useState<URLSearchParams>(new URLSearchParams())
    
    // Get search params after component mounts to avoid SSR issues
    useEffect(() => {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            setSearchParams(urlParams);
        } catch (error) {
            console.warn('Failed to parse URL search params:', error);
            setSearchParams(new URLSearchParams());
        }
    }, []);

    // Listen for URL changes
    useEffect(() => {
        const handleUrlChange = () => {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                setSearchParams(urlParams);
            } catch (error) {
                console.warn('Failed to parse URL search params on change:', error);
                setSearchParams(new URLSearchParams());
            }
        };

        // Listen for popstate events (browser back/forward)
        window.addEventListener('popstate', handleUrlChange);
        
        // Listen for pushstate/replacestate events
        const originalPushState = history.pushState;
        const originalReplaceState = history.replaceState;
        
        history.pushState = function(...args) {
            originalPushState.apply(history, args);
            handleUrlChange();
        };
        
        history.replaceState = function(...args) {
            originalReplaceState.apply(history, args);
            handleUrlChange();
        };

        return () => {
            window.removeEventListener('popstate', handleUrlChange);
            history.pushState = originalPushState;
            history.replaceState = originalReplaceState;
        };
    }, []);

    const get = (key: string): string | null => {
        return searchParams.get(key);
    };

    const getAll = (key: string): string[] => {
        return searchParams.getAll(key);
    };

    const has = (key: string): boolean => {
        return searchParams.has(key);
    };

    const toString = (): string => {
        return searchParams.toString();
    };

    return {
        get,
        getAll,
        has,
        toString,
        searchParams
    };
};
