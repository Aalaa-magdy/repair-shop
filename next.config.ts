import type { NextConfig } from "next";

import { withSentryConfig } from "@sentry/nextjs";

const nextConfig = {
     
};

// Make sure adding Sentry options is the last code to run before exporting
export default withSentryConfig(nextConfig, {
   org: "zed-f2",
  project: "repairshop",
  // Pass the auth token
  authToken: process.env.SENTRY_AUTH_TOKEN,
  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

    // Essential for source maps
 
  tunnelRoute: "/monitoring",

  disableLogger: true,


});

