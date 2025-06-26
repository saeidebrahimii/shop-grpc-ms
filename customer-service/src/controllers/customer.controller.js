const autoBind = require("auto-bind");
const CustomerService = require("../services/customer.service");
const { hashPassword, compareHashPassword } = require("../utils/password.util");
const { isValidObjectId } = require("mongoose");
const { generateJwtToken } = require("../utils/jwt.util");
class CustomerController {
  #service;
  constructor() {
    this.#service = new CustomerService();
    autoBind(this);
  }
  async getAllUsers(req, res) {
    try {
      const users = await this.#service.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ msg: "Error fetching users" });
    }
  }
  async createUser(req, res) {
    try {
      const { first_name, last_name, email, password } = req.body;
      const hash = await hashPassword(password);
      const user = await this.#service.createUser(
        first_name,
        last_name,
        email,
        hash
      );
      res.status(201).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Error create user." });
    }
  }
  async getUser(req, res) {
    try {
      const { id } = req.params;
      if (!isValidObjectId(id)) {
        res.status(404).json({ msg: "user not found" });
        return;
      }
      const user = await this.#service.getUser(id);
      if (!user) res.status(404).json({ msg: "user not found" });
      else res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Error fetch user." });
    }
  }
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      if (!isValidObjectId(id)) {
        res.status(404).json({ msg: "user not found" });
        return;
      }
      const deletedUser = await this.#service.deleteUser(id);
      if (deletedUser?.deletedCount > 0) {
        res.json({ msg: "Delete successfully" });
      } else {
        res.json({ msg: "Deleted failed." });
      }
    } catch (error) {
      res.status(500).json({ msg: "Error delete user" });
    }
  }
  async editUser(req, res) {
    try {
      const { id } = req.params;
      if (!isValidObjectId(id))
        return res.status(400).json({ msg: "Invalid user ID." });

      if (req.body?.password) {
        req.body.password = await hashPassword(req.body.password);
      }

      const editUser = await this.#service.editUser(id, req.body);
      if (editUser?.modifiedCount > 0) {
        res.json({ msg: "User updated successfully." });
      } else {
        res.status(400).json({ msg: "No changes were made to the user." });
      }
    } catch (error) {
      res.status(500).json({ msg: "Error editing user." });
    }
  }
  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await this.#service.getUserByEmail(email);
      if (!user) return res.status(400).json({ msg: "user not found." });
      const comparePassword = await compareHashPassword(
        password,
        user.password
      );
      if (!comparePassword)
        return res.status(400).json({ msg: "email or password is incorrect." });
      const { access_token, refresh_token } = await generateJwtToken({
        userId: user._id,
      });
      res.json({ access_token, refresh_token });
    } catch (error) {
      res.status(500).json({ msg: "Error login user." });
    }
  }
}
module.exports = new CustomerController();
