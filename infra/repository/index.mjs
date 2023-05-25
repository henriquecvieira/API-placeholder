/* eslint max-len: ["error", { "code": 105}] */
import * as queries from "./Mongo/queries/index.mjs"
import { default as MongoImpl } from "./Mongo/index.mjs"

class RepositoryWrapper {
  constructor(impl, queryString) {
    this.queries = queryString
    this.impl = impl
  }

  save(collection, data) {
    return this.impl.save(collection, data)
  }

  remove(collection, id) {
    return this.impl.remove(collection, id)
  }

  get(collection, id) {
    return this.impl.get(collection, id)
  }

  getAll(collection) {
    return this.impl.getAll(collection)
  }
  async searchUserById(collection, id) {
    const statement = this.queries.searchUserById
    return this.impl.find(collection, statement.query(id))
  }

  async searchUserByCreatedId(collection, id) {
    const statement = this.queries.searchUserByCreatedId
    return this.impl.findOne(collection, statement.query(id))
  }

  async searchUsersByDate(collection, createdAt) {
    const statement = this.queries.searchUsersByDate
    return this.impl.find(collection, statement.query(createdAt))
  }
  async searchUserByEmail(collection, email) {
    const statement = this.queries.searchUserByEmail
    return this.impl.findOne(collection, statement.query(email))
  }

  // async searchVolumeByIdentifier(identifier) {
  //   const statement = this.queries.searchVolumeByIdentifier
  //   return this.impl.find(statement.collection, statement.query(identifier))
  // }

  // async searchVolumeSupervisorByDate(params) {
  //   const statement = this.queries.searchVolumeSupervisorByDate
  //   return this.impl.aggregate(statement.collection, statement.query(params))
  // }

  // async searchPriceAverageMonthsSupervisorByDate(params) {
  //   const statement = this.queries.searchPriceAverageMonthsSupervisorByDate
  //   return this.impl.aggregate(statement.collection, statement.query(params))
  // }

  // async searchPriceAverageSupervisorByDate(params) {
  //   const statement = this.queries.searchPriceAverageSupervisorByDate
  //   return this.impl.aggregate(statement.collection, statement.query(params))
  // }

  // async searchDailyAverageSupervisorByDate(params) {
  //   const statement = this.queries.searchDailyAverageSupervisorByDate
  //   return this.impl.aggregate(statement.collection, statement.query(params))
  // }

  // async searchVolumeByDayMetric(params) {
  //   const statement = this.queries.searchVolumeByDayMetric
  //   return this.impl.aggregate(statement.collection, statement.query(params))
  // }

  // async searchVolumeByMonthMetric(params) {
  //   const statement = this.queries.searchVolumeByMonthMetric
  //   return this.impl.aggregate(statement.collection, statement.query(params))
  // }
}

export { Implementation } from "./Mongo/index.mjs"
export default new RepositoryWrapper(MongoImpl, queries)
