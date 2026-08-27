import { getFetcher } from '@hcc/api-base';

const apiBaseUrl = process.env.API_BASE_URL ?? '/api';

export const fetcher = getFetcher(apiBaseUrl);
