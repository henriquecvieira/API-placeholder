/* eslint-disable no-shadow */
/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */

import getUsers from "../../import/services/axios.placeholder.mjs"
import usersPresenter from "../presenters/usersPresenter.mjs"
import userByIdPresenter from "../presenters/usersByIdPresenter.mjs"
import RepositoryImpl from "../../../infra/repository/index.mjs"
import UserRepository from "../repositories/userRespository.mjs"
import StoreUser from "../use_cases/storeUsers.mjs"
import RemoveUser from "../use_cases/RemoveUser.mjs"
import UUIDGenerator from "../../support/UUIDGenerator.mjs"

const Repository = new UserRepository(RepositoryImpl)

export async function users(req, res, next) {
  try {
    const users = await getUsers()
    const resultUser = usersPresenter(users)
    const storeUserUseCase = new StoreUser(Repository)
    const storedUser = await storeUserUseCase.execute(resultUser)
    console.log(storedUser)
    return res.status(200).json(storedUser)
  } catch (error) {
    console.error(error)
    return next(error)
  }
}

export async function getUserById(req, res, next) {
  try {
    const userId = UUIDGenerator.from(req.params.id)
    const user = await Repository.getUserBy_Id(userId)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    const resultUser = userByIdPresenter(user)
    return res.status(200).json(resultUser)
  } catch (error) {
    console.error(error)
    return next(error)
  }
}

export async function removeUserBy_Id(req, res, next) {
  try {
    const userId = UUIDGenerator.from(req.params.id)
    const user = await Repository.getUserBy_Id(userId)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    const removeUserUseCase = new RemoveUser(Repository)
    await removeUserUseCase.execute(userId)
    return res.status(200).json({ deleted: user })
  } catch (error) {
    console.error(error)
    return next(error)
  }
}
