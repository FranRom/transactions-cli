
export const SANITIZE_MOCK = {
  ORIGIN_TX_DATA: [
    {
      user_id: '4a1b84f7-9756-4549-837e-9574c7ffc142',
      timestamp: '1970-01-01T00:00:00.000Z',
      currency: 'GBP',
      amount: '+5.00'
    },
    {
      user_id: '4a1b84f7-9756-4549-837e-9574c7ffc142',
      timestamp: '1970-01-01T00:00:00.000Z',
      currency: 'USD',
      amount: '-12.00'
    },
    {
      user_id: 'faf4a6fe-c839-4ee3-ac11-ee3957ac6332',
      timestamp: '1970-01-01T00:00:00.000Z',
      currency: 'EUR',
      amount: '-3.99'
    },
  ],
  NO_MANDATORY_FIELD_TX: [
    {
      user_id: '4a1b84f7-9756-4549-837e-9574c7ffc142',
      timestamp: '1970-01-01T00:00:00.000Z',
      currency: 'GBP',
      amount: '+5.00'
    },
    {
      timestamp: '1970-01-01T00:00:00.000Z',
      currency: 'USD',
      amount: '-12.00'
    },
    {
      user_id: 'faf4a6fe-c839-4ee3-ac11-ee3957ac6332',
      currency: 'EUR',
      amount: '-3.99'
    },
    {
      user_id: 'faf4a6fe-c839-4ee3-ac11-ee3957ac6332',
      timestamp: '1970-01-01T00:00:00.000Z',
      amount: '-3.99'
    },
    {
      user_id: 'faf4a6fe-c839-4ee3-ac11-ee3957ac6332',
      timestamp: '1970-01-01T00:00:00.000Z',
      currency: 'EUR',
    },
  ],
  NO_TYPE_TX: [
    {
      user_id: 4,
      timestamp: '1970-01-01T00:00:00.000Z',
      currency: 'GBP',
      amount: '+5.00'
    },
    {
      user_id: '4a1b84f7-9756-4549-837e-9574c7ffc142',
      timestamp: [],
      currency: 'USD',
      amount: '-12.00'
    },
    {
      user_id: 'faf4a6fe-c839-4ee3-ac11-ee3957ac6332',
      timestamp: '1970-01-01T00:00:00.000Z',
      currency: {},
      amount: '-3.99'
    },
    {
      user_id: 'faf4a6fe-c839-4ee3-ac11-ee3957ac6332',
      timestamp: '1970-01-01T00:00:00.000Z',
      currency: 'USD',
      amount: '-3.99'
    },
  ],
  NO_ACCEPTED_CURRENCY_TX: [
    {
      user_id: '4a1b84f7-9756-4549-837e-9574c7ffc142',
      timestamp: '1970-01-01T00:00:00.000Z',
      currency: 'ANOTHER',
      amount: '+5.00'
    },
    {
      user_id: '4a1b84f7-9756-4549-837e-9574c7ffc142',
      timestamp: '1970-01-01T00:00:00.000Z',
      currency: 'USD',
      amount: '-12.00'
    }
  ],
  NO_PREFIX_TX: [
    {
      user_id: '4a1b84f7-9756-4549-837e-9574c7ffc142',
      timestamp: '1970-01-01T00:00:00.000Z',
      currency: 'ANOTHER',
      amount: '5.00'
    },
    {
      user_id: '4a1b84f7-9756-4549-837e-9574c7ffc142',
      timestamp: '1970-01-01T00:00:00.000Z',
      currency: 'USD',
      amount: '-12.00'
    }
  ],
  WRONG_AMOUNT_TX: [
    {
      user_id: '4a1b84f7-9756-4549-837e-9574c7ffc142',
      timestamp: '24-8-3',
      currency: 'ANOTHER',
      amount: '+Six'
    },
    {
      user_id: '4a1b84f7-9756-4549-837e-9574c7ffc142',
      timestamp: '1970-01-01T00:00:00.000Z',
      currency: 'USD',
      amount: '-12.00'
    }
  ],
  NO_TIMESTAMP_TX: [
    {
      user_id: '4a1b84f7-9756-4549-837e-9574c7ffc142',
      timestamp: '24-8-3',
      currency: 'ANOTHER',
      amount: '+5.00'
    },
    {
      user_id: '4a1b84f7-9756-4549-837e-9574c7ffc142',
      timestamp: '1970-01-01T00:00:00.000Z',
      currency: 'USD',
      amount: '-12.00'
    }
  ]
}

export const BAlANCES_MOCK = {
  TX_TO_BALANCES: [
    {
      user_id: '4a1b84f7-9756-4549-837e-9574c7ffc142',
      timestamp: '1970-01-01T00:00:00.000Z',
      currency: 'USD',
      amount: '-12.00'
    },
    {
      user_id: '4a1b84f7-9756-4549-837e-9574c7ffc142',
      timestamp: '1980-01-01T00:00:00.000Z',
      currency: 'USD',
      amount: '-8.00'
    },
    {
      user_id: '4a1b84f7-9756-4549-837e-9574c7ffc142',
      timestamp: '2010-09-01T00:00:00.000Z',
      currency: 'EUR',
      amount: '-10.00'
    },
    {
      user_id: '4a1b84f7-9756-4549-837e-9574c7ffc142',
      timestamp: '2022-09-06T15:34:04.545Z',
      currency: 'EUR',
      amount: '+30.00'
    },
    {
      user_id: 'faf4a6fe-c839-4ee3-ac11-ee3957ac6332',
      timestamp: '1970-01-01T00:00:00.000Z',
      currency: 'EUR',
      amount: '-3.99'
    }
  ],
  TX_GROUPED_BY_USER: {
    '4a1b84f7-9756-4549-837e-9574c7ffc142': {
      GBP: '0',
      EUR: '+20.00',
      USD: '-20.00',
      lastActivity: '2022-09-06'
    },
    'faf4a6fe-c839-4ee3-ac11-ee3957ac6332': {
      GBP: '0',
      EUR: '-3.99',
      USD: '0',
      lastActivity: '1970-01-01'
    }
  }
}
