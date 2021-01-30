module.exports = {
  missingRule: {
    data: {
      name: 'ali',
    },
  },

  invalidDataType: {
    rule: {
      field: 'hey',
      condition: 'eq',
      condition_value: 'aloha',
    },
    data: 23,
  },

  missingData: {
    rule: {
      name: 'ali',
    },
  },

  stringRule: {
    rule: 'lessthan5',
    data: 'ali',
  },

  missingRuleField: {
    rule: {
      field: 'hello',
      condition: 'eq',
    },
    data: {
      hello: 'el',
    },
  },

  invalidCondition: {
    rule: {
      field: 'hello',
      condition: 'equals',
      condition_value: 'el',
    },
    data: {
      hello: 'el',
    },
  },

  fieldMissingInArrayData: {
    rule: {
      field: '5',
      condition: 'contains',
      condition_value: 'rocinante',
    },
    data: ['The Nauvoo', 'The Razorback', 'The Roci', 'Tycho'],
  },

  fieldMissingInStringData: {
    rule: {
      field: '24',
      condition: 'eq',
      condition_value: 'y',
    },
    data: 'wahala be like bicycle',
  },

  fieldMissingInObjectData: {
    rule: {
      field: 'hey',
      condition: 'eq',
      condition_value: 'aloha',
    },
    data: {
      a: 'zoo',
    },
  },

  threeLevelNesting: {
    rule: {
      field: 'missions.count.local.abacus',
      condition: 'gte',
      condition_value: 30,
    },
    data: {
      name: 'James Holden',
      crew: 'Rocinante',
      age: 34,
      position: 'Captain',
      missions: {
        count: {
          local: 30,
          foreign: 17,
        },
        successful: 44,
        failed: 1,
      },
    },
  },

  validationSuccess: {
    rule: {
      field: 'missions.count',
      condition: 'gte',
      condition_value: 30,
    },
    data: {
      name: 'James Holden',
      crew: 'Rocinante',
      age: 34,
      position: 'Captain',
      missions: {
        count: 45,
        successful: 44,
        failed: 1,
      },
    },
  },

  validationError: {
    rule: {
      field: '0',
      condition: 'eq',
      condition_value: 'a',
    },
    data: 'damien-marley',
  },

  nestedDataSuccess: {
    rule: {
      field: 'missions.locations.0',
      condition: 'contains',
      condition_value: 'okuta',
    },
    data: {
      name: 'James Holden',
      crew: 'Rocinante',
      age: 34,
      position: 'Captain',
      missions: {
        count: 33,
        successful: 44,
        locations: ['abeokuta', 'mars'],
        failed: 1,
      },
    },
  },
};
