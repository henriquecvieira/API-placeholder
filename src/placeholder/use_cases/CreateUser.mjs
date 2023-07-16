import userByIdPresenter from "../presenters/usersByIdPresenter.mjs"
import UUIDGenerator from "../../support/UUIDGenerator.mjs"
import eventoEmitter from "../../events/EventEmitter.mjs"

class CreateUser {
  constructor(repository) {
    this.repository = repository
  }

  async execute(user) {
    const existentUser = await this.repository.searchUserByEmail(user.email)
    if (existentUser) {
      throw new Error("User with the same email already exists")
    }

    const newUser = {
      createdAt: new Date(),
      _id: UUIDGenerator.generate(),
      ...user,
    }
    eventoEmitter.emit("meuEvento", newUser)

    const resultUser = userByIdPresenter(newUser)
    return resultUser
  }
}

export default CreateUser
