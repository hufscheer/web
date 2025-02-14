import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://e6ad1d126d5861647792d958b997477a@o4508818903728128.ingest.us.sentry.io/4508818908708864',
  integrations: [Sentry.replayIntegration()],
  tracesSampleRate: 1,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  debug: false,
});
