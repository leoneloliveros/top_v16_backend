//schema.validate({ username: 'abc', birth_year: 1994 });

const validateRequest = (schema, property) => (req, res, next) => {
  const { value, error } = schema.validate({
    [property]: req[property] // ['params']: req['params'] => params: req.params
  })

  if (error) {
    return res.status(400).json({ message: 'error de middleware', error: error.details.message })
  }

  req[property] = value[property] // req.params = value.params
  next()

}

module.exports = validateRequest