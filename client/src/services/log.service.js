import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'

import { loggerDNS } from '../config.json'

function init() {
  Sentry.init({
    dsn: loggerDNS,
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0
  })
}

function log(err) {
  Sentry.captureException(err)
}

const logService = {
  init,
  log
}

export default logService
