import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const Package = require('../../package.json')
import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'

import Application from '../../src/support/Application.mjs'

export default {
  boot: (app) => {
    Sentry.init({
      maxBreadcrumbs: 10,
      debug: !Application.isInProductionMode(),
      dsn: 'https://f9049d23a7a74d8d8fe5135835c103ec@o500502.ingest.sentry.io/6635094',
      integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({ app }),
        new Sentry.Integrations.OnUnhandledRejection()
      ],
      denyUrls: ['/healthcheck'],
      environment: process.env.ENVIRONMENT,
      release: `${Package.name}@${Package.version}`,
      sampleRate: 1,
      tracesSampleRate: 0.1,
      attachStacktrace: true
    })

    app.use(Sentry.Handlers.requestHandler())
    app.use(Sentry.Handlers.tracingHandler())
  },

  handleError: (app) => {
    app.use(Sentry.Handlers.errorHandler({
      shouldHandleError(error) {
        return error.status > 401
      }
    }))
  }
}
