/* eslint-disable no-underscore-dangle */

export default function usersByIdPresenter(users) {
  return {
    _id: users._id,
    id: users.id,
    address: users.address,
    company: users.company,
    email: users.email,
    name: users.name,
  }
}
