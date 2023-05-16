export default function usersBy_IdPresenter(storeUsers) {
  return storeUsers.map(({ _id, id, name, email, address, company }) => ({
    _id,
    id,
    name,
    email,
    address,
    company,
  }))
}
