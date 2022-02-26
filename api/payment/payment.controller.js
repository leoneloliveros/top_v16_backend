const { createCardToken } = require("./payment.service")
const { addCreditCards } = require("../user/user.service")

async function createTokenHandler(req, res) {
  const { cardNumber, cardExpYear, cardExpMonth, cardCvc } = req.body
  const creditCardInfo = {
    "card[number]": cardNumber,
    "card[exp_year]": cardExpYear,
    "card[exp_month]": cardExpMonth,
    "card[cvc]": cardCvc
  }

  try {
    const result = await createCardToken(creditCardInfo)
    console.log("🚀 ~ file: payment.controller.js ~ line 15 ~ createTokenHandler ~ result", result)
    
    const user = req.user
    const creditCard = {}
    await addCreditCards(user, creditCard )


  } catch(err) {

  }
}

function createCustomerHandler() {

}

function makePaymentHandler(){

}

module.exports = {
  createTokenHandler,
  createCustomerHandler,
  makePaymentHandler
}