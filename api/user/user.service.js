const User = require('./user.model')
const get = require('lodash/get')

async function getUserByEmail(email) {
  const user = await User.findOne({ email }) || {}
  return user
}

async function findUser() {
  return await User.find({ }) 
}

async function findOneUser(query) {
  const user = await User.findOne(query)
  return user
}

async function updateBilling(user, info, type) {
  const creditCards = get(user, 'billing.creditCards', [])
  const customerId = get(user, 'billing.customerId', null)

  const customer = {
    billing: {
      creditCards: type == 'card' ? creditCards.concat(info) : creditCards , 
      customerId: type == 'customer' ? info : customerId
    }
  }
  const updatedUser = await User.findByIdAndUpdate(user._id, customer, {
    new: true
  })
  return updatedUser
}

async function addCreditCards(user, card) {
  const creditCards = get(user, 'billing.creditCards', [])

  const customer = {
    billing: {
      creditCards: creditCards.concat(card)
    }
  }
  const updatedUser = await User.findByIdAndUpdate(user._id, customer, {
    new: true
  })
  return updatedUser
}

async function addBillingCustomerId(user, customerId) {
  const creditCards = get(user, 'billing.creditCards', [])
  const customer = {
    billing: {
      creditCards,
      customerId
    }
  }

  const updatedUser = await User.findByIdAndUpdate(user._id, customer, {
    new: true
  })
  return updatedUser
}

module.exports = {
  getUserByEmail,
  findOneUser,
  updateBilling
}


