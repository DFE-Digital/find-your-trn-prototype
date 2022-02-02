import { wizard } from 'govuk-prototype-rig'
import { userMatchesDQTRecord } from '../utils/dqt.js'

export function trnWizardPaths (req) {
  const paths = [
    '/start',
    '/trn-holder',
    '/ask-questions',
    '/name',
    '/dob',
    '/ni-number',
    '/itt-provider',
    '/email',
    '/check-answers',
    '/trn-sent',
    '/no-match',
    '/submit-request',
    '/helpdesk-request-submitted',
    '/'
  ]

  return wizard.nextAndBackPaths(paths, req)
}

export function trnWizardForks (req) {
  const forks = [
    {
      currentPath: '/trn-holder',
      storedData: ['wizard', 'do-you-have-a-trn'],
      excludedValues: ['yes'],
      forkPath: '/you-dont-have-a-trn'
    },
    {
      currentPath: '/ni-number',
      excludedValues: [],
      forkPath: (value) => {
        if (userMatchesDQTRecord(req.session.data)) {
          return '/email'
        } else {
          return '/itt-provider'
        }
      }
    },
    {
      currentPath: '/check-answers',
      excludedValues: [],
      forkPath: (value) => {
        if (req.session.data.features.helpdeskOnly.on) {
          return 'helpdesk-request-submitted'
        } else if (userMatchesDQTRecord(req.session.data)) {
          return '/trn-sent'
        } else {
          return '/no-match'
        }
      }
    }
  ]
  return wizard.nextForkPath(forks, req)
}
