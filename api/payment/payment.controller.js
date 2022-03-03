const { createCardToken, createCustomer, createPayment } = require("./payment.service")
const { updateBilling } = require("../user/user.service")
const Payment = require('./payment.model')

async function createTokenHandler(req, res) {
  const { cardNumber, cardExpYear, cardExpMonth, cardCvc } = req.body
  const creditCardInfo = {
    "card[number]": cardNumber,
    "card[exp_year]": cardExpYear,
    "card[exp_month]": cardExpMonth,
    "card[cvc]": cardCvc
  }

  try {
    const { card, id, status } = await createCardToken(creditCardInfo)
    
    const user = req.user
    const creditCard = {
      expMonth: card.exp_month,
      expYear: card.exp_year,
      name: card.name,
      mask: card.mask,
      tokenId: id,
    };
    await updateBilling(user, creditCard, 'card')

    res.status(200).json({ card, id, status, user })


  } catch(err) {
    res.status(500).send({ message: 'Error al crear el token en epayco', error})
  }
}

async function createCustomerHandler(req, res) {
  const user = req.user
  try {
    const { data } = await createCustomer(user)
    await updateBilling(user, data.customerId, 'customer')
    
    res.status(200).json({ message: 'customer created', data, user })
  } catch(err) {
    console.log(err)
  }
}

async function makePaymentHandler(req, res){
  const { user, body: payment }= req
  try {
    const { data, success } = await createPayment(user, payment)

    await Payment.create({
      userId: user._id,
      refId: data.recibo,
      bill: payment.bill,
      description: payment.description,
      value: payment.value,
      tax: payment?.tax,
      taxBase: payment?.taxBase,
    });
    
    res.status(200).json({ message: 'customer created', data, user })
  } catch(err) {
    console.log(err)
  }
}

module.exports = {
  createTokenHandler,
  createCustomerHandler,
  makePaymentHandler
}