class RemoveUser {
  constructor(repository) {
    this.repository = repository
  }

  async execute(params) {
    const result = await this.repository.remove(params)
    if (!result) {
      return { message: "user not found" }
    }
    return result
  }
}

export default RemoveUser
