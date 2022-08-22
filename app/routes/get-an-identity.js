import wizard from '../wizards/get-an-identity.js'

export const getAnIdentityRoutes = router => {
  router.all('/get-an-identity/:view', (req, res, next) => {
    res.locals.paths = wizard(req)
    res.locals.getAnIdentityJourney = true
    res.locals.serviceUrl = '/get-an-identity/email'
    res.locals.serviceName = req.session.data.identityServiceName || 'Get an identity to access Teacher Services'
    next()
  })

  router.post(['/get-an-identity/name', '/get-an-identity/official-name'], (req, res, next) => {
    const data = req.session.data
    if (!data.features.fullName.on) {
      req.session.data['full-name'] = `${req.body['first-name']} ${req.body['last-name']}`
      req.session.data['previous-name'] = `${req.body['previous-first-name']} ${req.body['previous-last-name']}`
    }
    next()
  })

  router.get('/get-an-identity/email', (req, res) => {
    res.render('email')
  })

  router.get('/get-an-identity/name', (req, res) => {
    res.render('name')
  })

  router.get('/get-an-identity/dob', (req, res) => {
    res.render('dob')
  })

  router.get('/get-an-identity/have-nino', (req, res) => {
    res.render('have-nino')
  })

  router.get('/get-an-identity/nino', (req, res) => {
    res.render('nino')
  })

  router.get('/get-an-identity/have-qts', (req, res) => {
    res.render('have-qts')
  })

  router.get('/get-an-identity/how-qts', (req, res) => {
    res.render('how-qts')
  })

  router.get('/get-an-identity/change-email-confirmation', (req, res) => {
    res.render('get-an-identity/email-confirmation')
  })

  router.get('/get-an-identity/return-to-service', (req, res) => {
    res.redirect(req.session.data.returnToService)
  })

  router.post(['/get-an-identity/finish', '/get-an-identity/signed-in-as'], (req, res, next) => {
    if (req.session.data.returnToService) {
      res.redirect(307, req.session.data.returnToService)
    } else {
      next()
    }
  })

  router.post('/get-an-identity/:view', (req, res) => {
    res.redirect(res.locals.paths.next)
  })
}