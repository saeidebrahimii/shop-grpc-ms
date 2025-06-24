const { authClient } = require("../../server");

class CustomerService {
  async validateToken(token) {
    return new Promise((resolve, reject) => {
      authClient.ValidateToken({ token }, (err, response) => {
        if (err || !response?.valid) return reject("Unauthorized");
        resolve(response);
      });
    });
  }
}
module.exports = CustomerService;
