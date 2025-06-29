import { QueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export const useInitQueryClient = () => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return queryClient;
};
