import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://7a298919109b7b4ef3c28d7d92b36786@o4509847405527040.ingest.us.sentry.io/4509855448825856",

  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: true,

  // ...

  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});

