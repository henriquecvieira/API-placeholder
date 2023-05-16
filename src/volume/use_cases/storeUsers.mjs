/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import usersBy_IdPresenter from "../presenters/usersBy_IdPresenter.mjs"
import UUIDGenerator from "../../support/UUIDGenerator.mjs"

class StoreUsers {
  constructor(repository) {
    this.repository = repository
  }

  async execute(params) {
    const resultCreateUser = []
    const resultExistentUsers = []
    // for (let i = 0; i < params.length; i++) {
    //   var hasUser = await this.repository.getUserById(params[i].id)
    //   const resultUser = usersBy_IdPresenter(hasUser)
    for (const param of params) {
      let hasUser = await this.repository.getUserById(param.id)
      const resultUser = usersBy_IdPresenter(hasUser)

      if (hasUser.length > 0) {
        console.log("users already exists!")
        resultExistentUsers.push(resultUser)
        continue
      }
      // params[i]._id = UUIDGenerator.generate()
      // await this.repository.save(params[i])
      // resultCreateUser.push(params[i])
      const newUser = {
        ...param,
        _id: UUIDGenerator.generate(),
      }
      await this.repository.save(newUser)
      resultCreateUser.push(newUser)
    }
    return { resultExistentUsers, resultCreateUser }
  }
}

export default StoreUsers
