/* eslint-disable camelcase */
export default function usersBy_IdPresenter(storeUsers) {
  return storeUsers.map(({
    createdAt,_id, name, email, address, company,
  }) => ({
    createdAt,
    _id,
    name,
    email,
    address,
    company
  }))
}
