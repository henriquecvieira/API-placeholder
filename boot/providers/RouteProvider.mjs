import healthCheck from '../../src/maintenance/healthcheck.mjs'
import wrongWay from '../../src/maintenance/wrongWay.mjs'
import volume from '../../src/volume/routes.mjs'

function registerRoutes(app) {
  app.use(healthCheck)
  app.use(volume)
  app.use(wrongWay)
}

export default {
  boot: (app) => {
    registerRoutes(app)
  }
}
