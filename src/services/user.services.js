const jwt = require('jsonwebtoken')
const userRepository = require('../repository/user.repository')
const CustomError = require('../utils/customError')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')

dotenv.config()
class UserServices {
  async login(email, password) {
    const user = await userRepository.findUserByEmail(email)
    //check user có tồn tại hay không
    if (!user) {
      throw new CustomError(401, 'Email or password is incorrect')
    }

    // check password có đúng hay không
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      throw new CustomError(401, 'Email or password is incorrect')
    }

    // tạo token
    const access_token = jwt.sign(
      { email },
      process.env.JWT_SECRET_ACCESS_TOKEN,
      { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRED_IN }
    )
    const refresh_token = jwt.sign(
      { email },
      process.env.JWT_SECRET_REFRESH_TOKEN,
      { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRED_IN }
    )
    return { access_token, refresh_token }
  }

  async registerUser({ email, password, fullname, address, phone }) {
    const existedUser = await userRepository.findUserByEmail(email)
    if (existedUser) {
      throw new CustomError(400, 'Email already existed')
    }
    const salt = parseInt(process.env.SALT, 10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = await userRepository.createUser({
      email,
      password: hashedPassword,
      fullname,
      address,
      phone
    })
    return newUser
  }

  async getUserInfor(email) {
    const userInfor = await userRepository.getUserInfor(email)
    return userInfor
  }

  async UpdateUser(user) {
    const existedUser = await userRepository.findUserByEmail(user.email)
    if(!existedUser) {
      throw new CustomError(401, 'user not found') 
    }
    const updatedUser = await userRepository.updateUser(user)
    
    return updatedUser
  }

}

const userServices = new UserServices()
module.exports = userServices
