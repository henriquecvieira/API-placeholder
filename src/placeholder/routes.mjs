/* eslint-disable camelcase */
/* eslint-disable max-len */
// import * as VolumeController from "./controllers/VolumeController.mjs"
// import * as VolumeDailyAverageSupervisorController from "./controllers/VolumeDailyAverageSupervisorController.mjs"
// import * as VolumePriceAverageSupervisorController from "./controllers/VolumePriceAverageSupervisorController.mjs"
// import * as VolumePriceAverageMonthsSupervisorController from "./controllers/VolumePriceAverageMonthsSupervisorController.mjs"
// import * as VolumeSupervisorController from "./controllers/VolumeSupervisorController.mjs"
// import * as VolumeMetricController from "./controllers/VolumeMetricController.mjs"
import {
  users,
  getUserById,
  removeUserBy_Id
} from './controllers/placeholderController.mjs'
// import authToken from '../../infra/json_webtoken/authToken.mjs'

import { Router } from 'express'

const router = Router()

// router.route('/v1/volume/Supervisor/priceAverage/months').get(VolumePriceAverageMonthsSupervisorController.search); // add authToken.validateToken,
router.route('/v1/users').get(users)
router.route('/v1/user/:id').get(getUserById)
router.route('/v1/user/:id').delete(removeUserBy_Id)
export default router
