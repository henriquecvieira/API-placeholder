import userByIdPresenter from "../presenters/usersByIdPresenter.mjs"
import UUIDGenerator from "../../support/UUIDGenerator.mjs"

class CreateUser {
  constructor(repository) {
    this.repository = repository
  }

  async execute(user) {
    const existingUser = await this.repository.searchUserByEmail(user.email)
    if (existingUser) {
      throw new Error("User with the same email already exists")
    }

    const newUser = {
      createdAt: new Date(),
      _id: UUIDGenerator.generate(),
      ...user,
    }

    await this.repository.save(newUser)

    const resultUser = userByIdPresenter(newUser)
    return resultUser
  }
}

export default CreateUser
