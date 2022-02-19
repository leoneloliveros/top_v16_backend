
async function loginUserHandler(req, res) {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "User not found" })
    }

    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
      return res.status(500).json({ message: "Wrong password"})
    }

    //genere un token
    const token = jsonwebtoken.sign(user.profile, 'holaMundo', {
      expiresIn: '100',
    })
    // return res.status(200).json({ message: "correct login", user: user.profile })
    return res.status(200).json({ message: "correct login", token, user: user.profile })


  } catch(error) {

  }
}

function verifyToken(req, res) {
  //;;
}

module.exports = loginUserHandler