const customerModel = require("../models/customer.model");

class CustomerService {
  async createUser(first_name, last_name, email, password) {
    const user = await customerModel.create({
      first_name,
      last_name,
      email,
      password,
    });
    return user;
  }
  async getUser(id) {
    const user = await customerModel.findById(id);
    return user;
  }
  async getAllUsers() {
    const users = await customerModel.find({});
    return users;
  }
  async deleteUser(id) {
    const deletedUser = await customerModel.deleteOne({ _id: id });
    return deletedUser;
  }
  async editUser(id, object) {
    const editedUser = await customerModel.updateOne(
      { _id: id },
      { $set: object }
    );
    return editedUser;
  }
  async getUserByEmail(email) {
    const user = await customerModel.findOne({ email });
    return user;
  }
}
module.exports = CustomerService;
