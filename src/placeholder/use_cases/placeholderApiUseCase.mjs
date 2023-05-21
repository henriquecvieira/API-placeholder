import getUsers from "../../import/services/axios.placeholder.mjs"
import usersPresenter from "../presenters/usersPresenter.mjs"
import DataNotFoundException from '../../core/exceptions/DataNotFoundException.mjs'

export default async function getUsersApi() {
  const users = await getUsers()
  if (users.length === 0) {
    throw new DataNotFoundException('users not found!')
  }
  const resultUser = usersPresenter(users)
  return resultUser
}
