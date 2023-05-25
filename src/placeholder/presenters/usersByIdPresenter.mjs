export default function usersByIdPresenter(user) {
  const { _id, id, address, phone, website, company, email, name, createdAt } =
    user

  return {
    _id,
    id,
    address,
    phone,
    website,
    company,
    email,
    name,
    createdAt,
  }
}
