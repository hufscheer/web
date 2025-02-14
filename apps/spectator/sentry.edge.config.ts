import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://3379cf3c650d2c15761d6f23ddaa757e@o4508818903728128.ingest.us.sentry.io/4508818906415104',
  tracesSampleRate: 1,
  debug: false,
});
