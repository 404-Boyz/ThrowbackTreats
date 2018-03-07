const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/allusers', (req, res, next) => {
  User.findAll({
    attributes: ['id', 'email', 'isAdmin']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.put('/:id', function (req, res, next) {
  console.log(req.body)
  User.findById(req.params.id)
    .then(user => {
      return user.update(
        req.body
      )
    })
    .then(user => res.status(200).send(user))
    .catch(next)
})

router.delete('/:id', function (req, res, next) {
  const id = req.params.id;

  User.destroy({ where: { id } })
    .then(() => res.status(204).end())
    .catch(next);
});