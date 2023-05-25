/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import usersByCreatedIdPresenter from "../presenters/usersByCreatedIdPresenter.mjs"
import UUIDGenerator from "../../support/UUIDGenerator.mjs"


class StoreUsers {
  constructor(repository) {
    this.repository = repository
  }
  async execute(params) {
    const resultCreateUser = []
    const resultExistentUsers = []
    for (const param of params) {
      let hasUser = await this.repository.getUserById(param.id)
      if (hasUser.length > 0) {
        console.log("users already exists!")
        const resultUser = usersByCreatedIdPresenter(hasUser)
        resultExistentUsers.push(resultUser)
        continue
      }
      const newUser = {
        createdAt: new Date(),
        _id: UUIDGenerator.generate(),
        ...param,
      }
      await this.repository.save(newUser)
      resultCreateUser.push(newUser)
    }
    const responseCreateUser = resultCreateUser.map((user) => ({
      ...user,
      createdAt: user.createdAt.toString(),
    }))

    return { resultExistentUsers, responseCreateUser }
  }
}

export default StoreUsers
