class User {
  constructor(repositoryImpl) {
    this.collection = "users"
    this.repository = repositoryImpl
  }

  async save(params) {
    return this.repository.save(this.collection, params)
  }

  async getById(id) {
    const data = await this.repository.get(this.collection, id)

    if (data?.length === 0) {
      return null
    }

    return data
  }

  async getUserById(id) {
    const data = await this.repository.searchUserById(this.collection, id)

    if (!data) {
      return null
    }

    return data
  }

  async getUserBy_Id(id) {
    const data = await this.repository.get(this.collection, id)

    if (!data) {
      return null
    }

    return data
  }

  async remove(id) {
    return this.repository.remove(this.collection, id)
  }
}

export default User
