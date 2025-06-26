const customerModel = require("../models/customer.model");
const { getOrSetCache, deleteCache } = require("./redis.service");

class CustomerService {
  async createUser(first_name, last_name, email, password) {
    const user = await customerModel.create({
      first_name,
      last_name,
      email,
      password,
    });
    if (user) {
      await deleteCache("users");
    }
    return user;
  }
  async getUser(id) {
    const user = await getOrSetCache(`users:${id}`, async () => {
      return await customerModel.findById(id);
    });
    return user;
  }
  async getAllUsers() {
    const users = await getOrSetCache(`users`, async () => {
      return await customerModel.find({});
    });
    return users;
  }
  async deleteUser(id) {
    const deletedUser = await customerModel.deleteOne({ _id: id });
    if (deletedUser.deletedCount > 0) {
      await deleteCache(`users:${id}`);
      await deleteCache("users");
    }
    return deletedUser;
  }
  async editUser(id, object) {
    const editedUser = await customerModel.updateOne(
      { _id: id },
      { $set: object }
    );
    if (editedUser.modifiedCount > 0) {
      await deleteCache(`users:${id}`);
      await deleteCache("users");
    }
    return editedUser;
  }
  async getUserByEmail(email) {
    const user = await customerModel.findOne({ email });
    return user;
  }
}
module.exports = CustomerService;
