const User = require('./user.model')
const get = require('lodash/get')

async function getUserByEmail(email) {
  const user = await User.findOne({ email }) || {}
  return user
}

async function findOneUser(query) {
  const user = await User.findOne(query)
  return user
}

async function addCreditCards(user, card) {
  const customer = {
    creditCards: user.creditCards.concat(card)
  }
  const updatedUser = await User.findByIdAndUpdate(user._id, customer, {
    new: true
  })
  return updatedUser
}

module.exports = {
  getUserByEmail,
  findOneUser,
  addCreditCards
}


