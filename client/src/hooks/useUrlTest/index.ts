import { useLocation, matchPath } from 'react-router-dom';

interface IUseUrlTest {
  usePathMatch: (urls: string) => boolean;
  usePathMatchList: (urls: string[]) => boolean;
};

export function useUrlTest(): IUseUrlTest {
  const usePathMatchList = (urls: string[]) => {
    const location = useLocation();
    for (let i = 0; i < urls.length; i = + 1)
      if (matchPath(urls[i], location.pathname) !== null)
        return true;

    return false;
  };

  const usePathMatch = (url: string) => {
    const location = useLocation();

    return (matchPath(url, location.pathname) !== null)
  }

  return {
    usePathMatch,
    usePathMatchList,
  };
};

