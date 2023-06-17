/* eslint-disable import/prefer-default-export */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */

import EventEmitter from 'events';
import userByIdPresenter from '../presenters/usersByIdPresenter.mjs'
import RepositoryImpl from '../../../infra/repository/index.mjs'
import UserRepository from '../repositories/userRespository.mjs'
import StoreUsers from '../use_cases/storeUsers.mjs'
import RemoveById from '../use_cases/RemoveById.mjs'
import getUsersApi from "../use_cases/placeholderApiUseCase.mjs";
import SearchById from '../use_cases/SearchById.mjs'
import SearchIdValidator from '../controllers/validators/SearchId.mjs'
import CreateUser from '../use_cases/CreateUser.mjs';
import searchUsersByDate from '../use_cases/searchUsersByDate.mjs';

const Repository = new UserRepository(RepositoryImpl)


const storeUsersUseCase = new StoreUsers(Repository);

export async function users(_, res, next) {
  try {
    const users = await getUsersApi();
    const storedUser = await storeUsersUseCase.execute(users);

    return res.status(200).json(storedUser);
  } catch (error) {
    return next(error);
  }
}

export async function getUserById(req, res, next) {
  try {
    await SearchIdValidator.validate(req.params)
    const userId = req.params.id
    const searchIdUseCase = new SearchById(Repository)
    const storedUser = await searchIdUseCase.execute(userId)
    const resultUser = userByIdPresenter(storedUser)
    return res.status(200).json(resultUser)
  } catch (error) {
    return next(error)
  }
}

export async function removeUserByCreatedId(req, res, next) {
  try {
    await SearchIdValidator.validate(req.params)
    const userId = req.params.id
    const removeByIdUseCase = new RemoveById(Repository)
    await removeByIdUseCase.execute(userId)
    return res.status(200).json("succesfully removed")
  } catch (error) {
    return next(error)
  }
}

export async function getUsersByDate(req, res, next) {
  try {
    const date = req.query.createdAt
    const searchByDateUseCase = new searchUsersByDate(Repository)
    const users = await searchByDateUseCase.execute(date)
    return res.status(200).json(users)
  } catch (error) {
    return next(error)
  }
}

export async function createUser(req, res, next) {
  try {
    const user = req.body
    const CreateUserUseCase = new CreateUser(Repository)
    const createdUser = await CreateUserUseCase.execute(user)
    // const showInsertedUser = await storeUserUseCase.execute(user)
    return res.status(200).json(createdUser)
  } catch (error) {
    return next(error)
  }
}
