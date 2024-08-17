import React from 'react';


export const useMatchMedia = (query) => {
    const [isMatched, setIsMatched] = React.useState(window.matchMedia(query).matches);
    
    React.useEffect(() => {

        const mediaList = window.matchMedia(query);
        const matchMediaChange = () => setIsMatched(mediaList.matches);
         
        mediaList.addEventListener('change', matchMediaChange);

        return () => mediaList.removeEventListener('change', matchMediaChange);
    }, [query]);

    return isMatched;

  }