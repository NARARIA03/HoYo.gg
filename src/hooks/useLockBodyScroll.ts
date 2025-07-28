import { useEffect } from 'react';

type HookProps = {
  isLock: boolean;
};

export const useLockBodyScroll = ({ isLock }: HookProps) => {
  useEffect(() => {
    if (isLock) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isLock]);
};
