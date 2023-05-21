/* eslint-disable camelcase */
export default function usersByCreatedIdPresenter(storeUsers) {
  return storeUsers.map(
    ({ createdAt, _id, name, email, address, phone, website, company }) => ({
      createdAt,
      _id,
      name,
      email,
      address,
      phone,
      website,
      company,
    })
  )
}
