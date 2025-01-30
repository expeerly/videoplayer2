import { useEffect, useState } from 'react';
import { useVideoState } from './useVideoState';

export const useVideoTypeManager = (
  pathname: string,
  operations: ReturnType<typeof useVideoState>['operations']
) => {
  const [activeVideosType, setActiveVideosType] = useState<string>('');

  useEffect(() => {
    if (pathname === '/explore') {
      setActiveVideosType('explore');
    }

    if (pathname.split('/').length === 4 && activeVideosType !== pathname) {
      setActiveVideosType(pathname);
      operations.clearVideos();
      operations.setLoading(true);
    }
  }, [pathname, activeVideosType, operations]);

  return activeVideosType;
};
