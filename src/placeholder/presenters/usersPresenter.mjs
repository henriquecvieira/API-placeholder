export default function usersPresenter(users) {
  return users.map(({ id, name, email, phone, website, address, company }) => ({
    id,
    name,
    email,
    address,
    phone,
    website,
    company,
  }))
}
