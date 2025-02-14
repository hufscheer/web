import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://e6ad1d126d5861647792d958b997477a@o4508818903728128.ingest.us.sentry.io/4508818908708864',
  tracesSampleRate: 1,
  debug: false,
});
