export default function usersPresenter(users) {
  return users.map(({ id, name, email, address, company }) => ({
    id,
    name,
    email,
    address,
    company,
  }))
}
