import { IS_SERVER } from '@/constants/env';

export const getEndpoint = <T>(endpoints: { client: T; server: T }) => {
  return endpoints[IS_SERVER ? 'server' : 'client'];
};
