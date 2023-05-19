import getUsers from '../../import/services/axios.placeholder.mjs';
import usersPresenter from '../presenters/usersPresenter.mjs'

export default async function getUsersApi() {
    const users = await getUsers();
    if (users.length===0) {
      return res.status(404).json({ message: 'users not found' });
    }
    const resultUser = usersPresenter(users)
    return resultUser;
}
