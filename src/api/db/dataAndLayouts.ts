import type { LayoutConfig } from '@/interfaces/components/ComponentConfig';

export const xkcd = {
  layout: {
    components: [{
      'type': 'FlexLayout',
      'properties': {
        'direction': 'column',
        'components': [
          {
            'type': 'Headline',
            'properties': {
              'text': 'Alphabetical Cartogram',
              'level': 1
            }
          },
          {
            'type': 'Textarea',
            'properties': {
              'label': 'Alt Text',
              'placeholder': 'Enter alt text',
              'fieldName': 'alt',
              'action': 'updateField'
            }
          },
          {
            'type': 'Image',
            'properties': {
              'src': 'https://imgs.xkcd.com/comics/alphabetical_cartogram.png',
              'alt': 'Alphabetical Cartogram Image'
            }
          },
          {
            'type': 'Headline',
            'properties': {
              'text': 'Details',
              'level': 2
            }
          },
          {
            'type': 'Input',
            'properties': {
              'label': 'Title',
              'placeholder': 'Enter title',
              'fieldName': 'title',
              'action': 'updateField'
            }
          },
          {
            'type': 'Input',
            'properties': {
              'label': 'Day',
              'placeholder': 'Enter day',
              'fieldName': 'day',
              'action': 'updateField'
            }
          },
          {
            'type': 'Input',
            'properties': {
              'label': 'Month',
              'placeholder': 'Enter month',
              'fieldName': 'month',
              'action': 'updateField'
            }
          },
          {
            'type': 'Input',
            'properties': {
              'label': 'Year',
              'placeholder': 'Enter year',
              'fieldName': 'year',
              'action': 'updateField'
            }
          },
          {
            'type': 'Button',
            'properties': {
              'text': 'Submit',
              'action': 'submitForm'
            }
          }
        ]
      }
    }]
  } as LayoutConfig,
  data: {
    'month': '5',
    'num': 2927,
    'link': '',
    'year': '2024',
    'news': '',
    'safe_title': 'Alphabetical Cartogram',
    'transcript': '',
    'alt': 'Poor Weeoming.',
    'img': 'https://imgs.xkcd.com/comics/alphabetical_cartogram.png',
    'title': 'Alphabetical Cartogram',
    'day': '1'
  }
};

export const userData = {
  data: {
    'gender': 'male',
    'name': {
      'title': 'Monsieur',
      'first': 'Erwin',
      'last': 'Lopez'
    },
    'location': {
      'street': {
        'number': 6332,
        'name': 'Rue Chazière'
      },
      'city': 'Geltwil',
      'state': 'Valais',
      'country': 'Switzerland',
      'postcode': 7585,
      'coordinates': {
        'latitude': '-61.9947',
        'longitude': '-89.1339'
      },
      'timezone': {
        'offset': '+4:00',
        'description': 'Abu Dhabi, Muscat, Baku, Tbilisi'
      }
    },
    'email': 'erwin.lopez@example.com',
    'login': {
      'uuid': '49aa75de-98af-4fc2-8b0d-41bbbc20be8a',
      'username': 'angryswan337',
      'password': 'rambo',
      'salt': 'JHP90Vic',
      'md5': 'adc6deccfd7a8dbb1037d268bd570ca1',
      'sha1': '2a340cece404a439191c681efff45f164e8da9ce',
      'sha256': '9ba2b401b8feb00c300d1a661d98182e7a4f2eb465e479391bfc7aa3511273d2'
    },
    'dob': {
      'date': '1951-01-16T17:26:06.849Z',
      'age': 73
    },
    'registered': {
      'date': '2017-03-05T12:03:17.715Z',
      'age': 7
    },
    'phone': '078 106 95 62',
    'cell': '079 636 85 58',
    'id': {
      'name': 'AVS',
      'value': '756.0499.8082.98'
    },
    'picture': {
      'large': 'https://randomuser.me/api/portraits/men/74.jpg',
      'medium': 'https://randomuser.me/api/portraits/med/men/74.jpg',
      'thumbnail': 'https://randomuser.me/api/portraits/thumb/men/74.jpg'
    },
    'nat': 'CH'
  },
  layouts: [
    {
      layout: {
        'components': [
          {
            'type': 'FlexLayout',
            'properties': {
              'direction': 'column',
              'components': [
                {
                  'type': 'Headline',
                  'properties': {
                    'text': 'User Information',
                    'level': 2
                  }
                },
                {
                  'type': 'FlexLayout',
                  'properties': {
                    'direction': 'row',
                    'components': [
                      {
                        'type': 'Image',
                        'properties': {
                          'fieldName': 'picture.large',
                          'alt': 'User Picture'
                        }
                      },
                      {
                        'type': 'FlexLayout',
                        'properties': {
                          'direction': 'column',
                          'components': [
                            {
                              'type': 'Input',
                              'properties': {
                                'label': 'Name',
                                'fieldName': 'name.title',
                                'action': 'updateField'
                              }
                            },
                            {
                              'type': 'Input',
                              'properties': {
                                'label': 'First Name',
                                'fieldName': 'name.first',
                                'action': 'updateField'
                              }
                            },
                            {
                              'type': 'Input',
                              'properties': {
                                'label': 'Last Name',
                                'fieldName': 'name.last',
                                'action': 'updateField'
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                },
                {
                  'type': 'FlexLayout',
                  'properties': {
                    'direction': 'row',
                    'components': [
                      {
                        'type': 'Input',
                        'properties': {
                          'label': 'Gender',
                          'fieldName': 'gender',
                          'action': 'updateField'
                        }
                      },
                      {
                        'type': 'Input',
                        'properties': {
                          'label': 'Date of Birth',
                          'fieldName': 'dob.date',
                          'action': 'updateField'
                        }
                      },
                      {
                        'type': 'Input',
                        'properties': {
                          'label': 'Age',
                          'fieldName': 'dob.age',
                          'action': 'updateField'
                        }
                      }
                    ]
                  }
                },
                {
                  'type': 'FlexLayout',
                  'properties': {
                    'direction': 'column',
                    'components': [
                      {
                        'type': 'Headline',
                        'properties': {
                          'text': 'Location',
                          'level': 3
                        }
                      },
                      {
                        'type': 'Input',
                        'properties': {
                          'label': 'Street Number',
                          'fieldName': 'location.street.number',
                          'action': 'updateField'
                        }
                      },
                      {
                        'type': 'Input',
                        'properties': {
                          'label': 'Street Name',
                          'fieldName': 'location.street.name',
                          'action': 'updateField'
                        }
                      },
                      {
                        'type': 'Input',
                        'properties': {
                          'label': 'City',
                          'fieldName': 'location.city',
                          'action': 'updateField'
                        }
                      },
                      {
                        'type': 'Input',
                        'properties': {
                          'label': 'State',
                          'fieldName': 'location.state',
                          'action': 'updateField'
                        }
                      },
                      {
                        'type': 'Input',
                        'properties': {
                          'label': 'Country',
                          'fieldName': 'location.country',
                          'action': 'updateField'
                        }
                      },
                      {
                        'type': 'Input',
                        'properties': {
                          'label': 'Postcode',
                          'fieldName': 'location.postcode',
                          'action': 'updateField'
                        }
                      }
                    ]
                  }
                },
                {
                  'type': 'Headline',
                  'properties': {
                    'text': 'Contact Information',
                    'level': 3
                  }
                },
                {
                  'type': 'Input',
                  'properties': {
                    'label': 'Email',
                    'fieldName': 'email',
                    'action': 'updateField'
                  }
                },
                {
                  'type': 'Input',
                  'properties': {
                    'label': 'Phone',
                    'fieldName': 'phone',
                    'action': 'updateField'
                  }
                },
                {
                  'type': 'Input',
                  'properties': {
                    'label': 'Cell',
                    'fieldName': 'cell',
                    'action': 'updateField'
                  }
                },
                {
                  'type': 'FlexLayout',
                  'properties': {
                    'direction': 'column',
                    'components': [
                      {
                        'type': 'Headline',
                        'properties': {
                          'text': 'Login Information',
                          'level': 3
                        }
                      },
                      {
                        'type': 'Input',
                        'properties': {
                          'label': 'Username',
                          'fieldName': 'login.username',
                          'action': 'updateField'
                        }
                      },
                      {
                        'type': 'Input',
                        'properties': {
                          'label': 'Password',
                          'fieldName': 'login.password',
                          'action': 'updateField'
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      } as LayoutConfig
    },
    {
      llama8bLayout: {
        components:
        [
          {
            type: 'Headline',
            properties: { text: 'Person Details', level: 1 }
          },
          {
            type: 'FlexLayout',
            properties: {
              direction: 'row',
              components: [
                {
                  type: 'Input',
                  properties: {
                    label: 'Name',
                    placeholder: '',
                    fieldName: 'name.title',
                    action: 'updateField'
                  }
                },
                {
                  type: 'Input',
                  properties: {
                    label: 'First Name',
                    placeholder: '',
                    fieldName: 'name.first',
                    action: 'updateField'
                  }
                },
                {
                  type: 'Input',
                  properties: {
                    label: 'Last Name',
                    placeholder: '',
                    fieldName: 'name.last',
                    action: 'updateField'
                  }
                }
              ]
            }
          },
          {
            type: 'Headline',
            properties: { text: 'Location', level: 2 }
          },
          {
            type: 'FlexLayout',
            properties: {
              direction: 'column',
              components: [
                {
                  type: 'Headline',
                  properties: { text: 'Street', level: 3 }
                },
                {
                  type: 'Input',
                  properties: {
                    label: 'Number',
                    placeholder: '',
                    fieldName: 'location.street.number',
                    action: 'updateField'
                  }
                },
                {
                  type: 'Input',
                  properties: {
                    label: 'Name',
                    placeholder: '',
                    fieldName: 'location.street.name',
                    action: 'updateField'
                  }
                }
              ]
            },

          },
          {
            type: 'Headline',
            properties: { text: 'Email', level: 2 }
          },
          {
            type: 'Input',
            properties: {
              label: 'Email Address',
              placeholder: '',
              fieldName: 'email',
              action: 'updateField'
            }
          },
          {
            type: 'Headline',
            properties: { text: 'Login', level: 2 }
          },
          {
            type: 'Input',
            properties: {
              label: 'Username',
              placeholder: '',
              fieldName: 'login.username',
              action: 'updateField'
            }
          },
          {
            type: 'Headline',
            properties: { text: 'Date of Birth', level: 2 }
          },
          {
            type: 'Input',
            properties: {
              label: 'Date of Birth',
              placeholder: '',
              fieldName: 'dob.date',
              action: 'updateField'
            }
          },
          {
            type: 'Headline',
            properties: { text: 'Phone Numbers', level: 2 }
          },
          {
            type: 'Input',
            properties: {
              label: 'Phone',
              placeholder: '',
              fieldName: 'phone',
              action: 'updateField'
            }
          },
          {
            type: 'Input',
            properties: {
              label: 'Cell',
              placeholder: '',
              fieldName: 'cell',
              action: 'updateField'
            }
          },
          {
            type: 'Headline',
            properties: { text: 'ID', level: 2 }
          },
          {
            type: 'Input',
            properties: {
              label: 'Name',
              placeholder: '',
              fieldName: 'id.name',
              action: 'updateField'
            }
          },
          {
            type: 'Input',
            properties: {
              label: 'Value',
              placeholder: '',
              fieldName: 'id.value',
              action: 'updateField'
            }
          },
          {
            type: 'Headline',
            properties: { text: 'Picture', level: 2 }
          },
          {
            type: 'Image',
            properties: {
              fieldName: 'picture.large',
              alt: ''
            }
          },
          {
            type: 'Image',
            properties: {
              fieldName: 'picture.medium',
              alt: ''
            }
          },
          {
            type: 'Image',
            properties: {
              fieldName: 'picture.thumbnail',
              alt: ''
            }
          },
          {
            type: 'Headline',
            properties: { text: 'Nationality', level: 2 }
          },
          {
            type: 'Input',
            properties: {
              label: '',
              placeholder: '',
              fieldName: 'nat',
              action: 'updateField'
            }
          }
        ]
      } as LayoutConfig,
    },
    {
      llama70bLayout: {
        'components': [
          {
            'type': 'Input',
            'properties': {
              'label': 'Username',
              'placeholder': '',
              'fieldName': 'login.username'
            }
          },
          {
            'type': 'Headline',
            'properties': {
              'text': 'Date of Birth'
            }
          },
          {
            'type': 'Input',
            'properties': {
              'label': 'Date of Birth',
              'placeholder': '',
              'fieldName': 'dob.date'
            }
          },
          {
            'type': 'Headline',
            'properties': {
              'text': 'Phone Numbers'
            }
          },
          {
            'type': 'Input',
            'properties': {
              'label': 'Nat',
              'placeholder': '',
              'fieldName': 'nat.CH'
            }
          },
          {
            'type': 'FlexLayout',
            'properties': {
              'direction': 'row',
              'components': [
                {
                  'type': 'Input',
                  'properties': {
                    'label': 'Name',
                    'placeholder': '',
                    'fieldName': 'name.title'
                  }
                },
                {
                  'type': 'Input',
                  'properties': {
                    'label': 'Username',
                    'placeholder': '',
                    'fieldName': 'login.username'
                  }
                },
                {
                  'type': 'Input',
                  'properties': {
                    'label': 'Phone',
                    'placeholder': '',
                    'fieldName': 'phone'
                  }
                },
                {
                  'type': 'Image',
                  'properties': {
                    'alt': '',
                    'fieldName': 'picture.large'
                  }
                }
              ]
            },
          }
        ]
      } as LayoutConfig,
    },
    {
      cardLayout: {
        'components': [
          {
            'type': 'CardLayout',
            'properties': {
              'title': 'User Information',
              'components': [
                {
                  'type': 'Image',
                  'properties': {
                    'fieldName': 'picture.large',
                    'alt': 'User\'s Profile Picture'
                  }
                },
                {
                  'type': 'FlexLayout',
                  'properties': {
                    'direction': 'column',
                    'components': [
                      {
                        'type': 'Headline',
                        'properties': {
                          'text': 'Name',
                          'level': 2
                        }
                      },
                      {
                        'type': 'Input',
                        'properties': {
                          'label': 'Title',
                          'fieldName': 'name.title',
                          'action': 'updateField'
                        }
                      },
                      {
                        'type': 'Input',
                        'properties': {
                          'label': 'First Name',
                          'fieldName': 'name.first',
                          'action': 'updateField'
                        }
                      },
                      {
                        'type': 'Input',
                        'properties': {
                          'label': 'Last Name',
                          'fieldName': 'name.last',
                          'action': 'updateField'
                        }
                      }
                    ]
                  }
                },
                {
                  'type': 'FlexLayout',
                  'properties': {
                    'direction': 'column',
                    'components': [
                      {
                        'type': 'Headline',
                        'properties': {
                          'text': 'Location',
                          'level': 2
                        }
                      },
                      {
                        'type': 'Input',
                        'properties': {
                          'label': 'Street Number',
                          'fieldName': 'location.street.number',
                          'action': 'updateField'
                        }
                      },
                      {
                        'type': 'Input',
                        'properties': {
                          'label': 'Street Name',
                          'fieldName': 'location.street.name',
                          'action': 'updateField'
                        }
                      },
                      {
                        'type': 'Input',
                        'properties': {
                          'label': 'City',
                          'fieldName': 'location.city',
                          'action': 'updateField'
                        }
                      },
                      {
                        'type': 'Input',
                        'properties': {
                          'label': 'State',
                          'fieldName': 'location.state',
                          'action': 'updateField'
                        }
                      },
                      {
                        'type': 'Input',
                        'properties': {
                          'label': 'Country',
                          'fieldName': 'location.country',
                          'action': 'updateField'
                        }
                      },
                      {
                        'type': 'Input',
                        'properties': {
                          'label': 'Postcode',
                          'fieldName': 'location.postcode',
                          'action': 'updateField'
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            'type': 'FlexLayout',
            'properties': {
              'direction': 'column',
              'components': [
                {
                  'type': 'Headline',
                  'properties': {
                    'text': 'Other Information',
                    'level': 2
                  }
                },
                {
                  'type': 'Input',
                  'properties': {
                    'label': 'Email',
                    'fieldName': 'email',
                    'action': 'updateField'
                  }
                },
                {
                  'type': 'Input',
                  'properties': {
                    'label': 'Username',
                    'fieldName': 'login.username',
                    'action': 'updateField'
                  }
                },
                {
                  'type': 'Input',
                  'properties': {
                    'label': 'Phone',
                    'fieldName': 'phone',
                    'action': 'updateField'
                  }
                },
                {
                  'type': 'Input',
                  'properties': {
                    'label': 'Cell',
                    'fieldName': 'cell',
                    'action': 'updateField'
                  }
                }
              ]
            }
          }
        ]
      } as LayoutConfig,
    },
    {
      labledTextProfile: {
        'components': [
          {
            'type': 'FlexLayout',
            'properties': {
              'direction': 'column',
              'components': [
                {
                  'type': 'CardLayout',
                  'properties': {
                    'title': 'Profile Information',
                    'components': [
                      {
                        'type': 'FlexLayout',
                        'properties': {
                          'direction': 'row',
                          'components': [
                            {
                              'type': 'Image',
                              'properties': {
                                'fieldName': 'picture.medium',
                                'alt': 'Profile Picture'
                              }
                            },
                            {
                              'type': 'FlexLayout',
                              'properties': {
                                'direction': 'column',
                                'components': [
                                  {
                                    'type': 'LabeledText',
                                    'properties': {
                                      'fieldName': 'name.title',
                                      'label': 'Title',
                                      'separator': ':',
                                      'fontSize': 'md'
                                    }
                                  },
                                  {
                                    'type': 'LabeledText',
                                    'properties': {
                                      'fieldName': 'name.first',
                                      'label': 'First Name',
                                      'separator': ':',
                                      'fontSize': 'md'
                                    }
                                  },
                                  {
                                    'type': 'LabeledText',
                                    'properties': {
                                      'fieldName': 'name.last',
                                      'label': 'Last Name',
                                      'separator': ':',
                                      'fontSize': 'md'
                                    }
                                  },
                                  {
                                    'type': 'LabeledText',
                                    'properties': {
                                      'fieldName': 'gender',
                                      'label': 'Gender',
                                      'separator': ':',
                                      'fontSize': 'md'
                                    }
                                  },
                                  {
                                    'type': 'LabeledText',
                                    'properties': {
                                      'fieldName': 'dob.date',
                                      'label': 'Date of Birth',
                                      'separator': ':',
                                      'fontSize': 'md'
                                    }
                                  },
                                  {
                                    'type': 'LabeledText',
                                    'properties': {
                                      'fieldName': 'phone',
                                      'label': 'Phone',
                                      'separator': ':',
                                      'fontSize': 'md'
                                    }
                                  },
                                  {
                                    'type': 'LabeledText',
                                    'properties': {
                                      'fieldName': 'cell',
                                      'label': 'Cell',
                                      'separator': ':',
                                      'fontSize': 'md'
                                    }
                                  }
                                ]
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                },
                {
                  'type': 'CardLayout',
                  'properties': {
                    'title': 'Location Information',
                    'components': [
                      {
                        'type': 'LabeledText',
                        'properties': {
                          'fieldName': 'location.street.number',
                          'label': 'Street Number',
                          'separator': ':',
                          'fontSize': 'md'
                        }
                      },
                      {
                        'type': 'LabeledText',
                        'properties': {
                          'fieldName': 'location.street.name',
                          'label': 'Street Name',
                          'separator': ':',
                          'fontSize': 'md'
                        }
                      },
                      {
                        'type': 'LabeledText',
                        'properties': {
                          'fieldName': 'location.city',
                          'label': 'City',
                          'separator': ':',
                          'fontSize': 'md'
                        }
                      },
                      {
                        'type': 'LabeledText',
                        'properties': {
                          'fieldName': 'location.state',
                          'label': 'State',
                          'separator': ':',
                          'fontSize': 'md'
                        }
                      },
                      {
                        'type': 'LabeledText',
                        'properties': {
                          'fieldName': 'location.country',
                          'label': 'Country',
                          'separator': ':',
                          'fontSize': 'md'
                        }
                      },
                      {
                        'type': 'LabeledText',
                        'properties': {
                          'fieldName': 'location.postcode',
                          'label': 'Postcode',
                          'separator': ':',
                          'fontSize': 'md'
                        }
                      }
                    ]
                  }
                },
                {
                  'type': 'CardLayout',
                  'properties': {
                    'title': 'Login Information',
                    'components': [
                      {
                        'type': 'LabeledText',
                        'properties': {
                          'fieldName': 'login.username',
                          'label': 'Username',
                          'separator': ':',
                          'fontSize': 'md'
                        }
                      },
                      {
                        'type': 'LabeledText',
                        'properties': {
                          'fieldName': 'login.password',
                          'label': 'Password',
                          'separator': ':',
                          'fontSize': 'md'
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      } as LayoutConfig
    },
    {
      labeledTextLayout: {
        'components': [
          {
            'type': 'FlexLayout',
            'properties': {
              'direction': 'column',
              'components': [
                {
                  'type': 'CardLayout',
                  'properties': {
                    'title': 'Profile Information',
                    'components': [
                      {
                        'type': 'LabeledText',
                        'properties': {
                          'fieldName': 'name.title',
                          'label': 'Title',
                          'separator': ':',
                          'fontSize': 'md'
                        }
                      },
                      {
                        'type': 'LabeledText',
                        'properties': {
                          'fieldName': 'name.first',
                          'label': 'First Name',
                          'separator': ':',
                          'fontSize': 'md'
                        }
                      },
                      {
                        'type': 'LabeledText',
                        'properties': {
                          'fieldName': 'name.last',
                          'label': 'Last Name',
                          'separator': ':',
                          'fontSize': 'md'
                        }
                      },
                      {
                        'type': 'LabeledText',
                        'properties': {
                          'fieldName': 'gender',
                          'label': 'Gender',
                          'separator': ':',
                          'fontSize': 'md'
                        }
                      },
                      {
                        'type': 'LabeledText',
                        'properties': {
                          'fieldName': 'dob.date',
                          'label': 'Date of Birth',
                          'separator': ':',
                          'fontSize': 'md'
                        }
                      },
                      {
                        'type': 'LabeledText',
                        'properties': {
                          'fieldName': 'phone',
                          'label': 'Phone',
                          'separator': ':',
                          'fontSize': 'md'
                        }
                      },
                      {
                        'type': 'LabeledText',
                        'properties': {
                          'fieldName': 'cell',
                          'label': 'Cell',
                          'separator': ':',
                          'fontSize': 'md'
                        }
                      }
                    ]
                  }
                },
                {
                  'type': 'CardLayout',
                  'properties': {
                    'title': 'Location Information',
                    'components': [
                      {
                        'type': 'LabeledText',
                        'properties': {
                          'fieldName': 'location.street.number',
                          'label': 'Street Number',
                          'separator': ':',
                          'fontSize': 'md'
                        }
                      },
                      {
                        'type': 'LabeledText',
                        'properties': {
                          'fieldName': 'location.street.name',
                          'label': 'Street Name',
                          'separator': ':',
                          'fontSize': 'md'
                        }
                      },
                      {
                        'type': 'LabeledText',
                        'properties': {
                          'fieldName': 'location.city',
                          'label': 'City',
                          'separator': ':',
                          'fontSize': 'md'
                        }
                      },
                      {
                        'type': 'LabeledText',
                        'properties': {
                          'fieldName': 'location.state',
                          'label': 'State',
                          'separator': ':',
                          'fontSize': 'md'
                        }
                      },
                      {
                        'type': 'LabeledText',
                        'properties': {
                          'fieldName': 'location.country',
                          'label': 'Country',
                          'separator': ':',
                          'fontSize': 'md'
                        }
                      },
                      {
                        'type': 'LabeledText',
                        'properties': {
                          'fieldName': 'location.postcode',
                          'label': 'Postcode',
                          'separator': ':',
                          'fontSize': 'md'
                        }
                      }
                    ]
                  }
                },
                {
                  'type': 'CardLayout',
                  'properties': {
                    'title': 'Login Information',
                    'components': [
                      {
                        'type': 'LabeledText',
                        'properties': {
                          'fieldName': 'login.username',
                          'label': 'Username',
                          'separator': ':',
                          'fontSize': 'md'
                        }
                      },
                      {
                        'type': 'LabeledText',
                        'properties': {
                          'fieldName': 'login.password',
                          'label': 'Password',
                          'separator': ':',
                          'fontSize': 'md'
                        }
                      }
                    ]
                  }
                },
                {
                  'type': 'CardLayout',
                  'properties': {
                    'title': 'Picture',
                    'components': [
                      {
                        'type': 'Image',
                        'properties': {
                          'fieldName': 'picture.medium',
                          'alt': 'Profile Picture'
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      textLayout: {
        'components': [
          {
            'type': 'CardLayout',
            'properties': {
              'title': 'User Information',
              'components': [
                {
                  'type': 'FlexLayout',
                  'properties': {
                    'direction': 'column',
                    'components': [
                      {
                        'type': 'Image',
                        'properties': {
                          'fieldName': 'picture.large',
                          'alt': 'User Profile Picture'
                        }
                      },
                      {
                        'type': 'Headline',
                        'properties': {
                          'text': 'Name',
                          'level': 2
                        }
                      },
                      {
                        'type': 'Text',
                        'properties': {
                          'fieldName': 'name.title',
                          'fontSize': 'lg'
                        }
                      },
                      {
                        'type': 'Text',
                        'properties': {
                          'fieldName': 'name.first',
                          'fontSize': 'lg'
                        }
                      },
                      {
                        'type': 'Text',
                        'properties': {
                          'fieldName': 'name.last',
                          'fontSize': 'lg'
                        }
                      }
                    ]
                  }
                },
                {
                  'type': 'FlexLayout',
                  'properties': {
                    'direction': 'row',
                    'components': [
                      {
                        'type': 'FlexLayout',
                        'properties': {
                          'direction': 'column',
                          'components': [
                            {
                              'type': 'Headline',
                              'properties': {
                                'text': 'Location',
                                'level': 3
                              }
                            },
                            {
                              'type': 'Text',
                              'properties': {
                                'fieldName': 'location.street.number',
                                'fontSize': 'sm'
                              }
                            },
                            {
                              'type': 'Text',
                              'properties': {
                                'fieldName': 'location.street.name',
                                'fontSize': 'sm'
                              }
                            },
                            {
                              'type': 'Text',
                              'properties': {
                                'fieldName': 'location.city',
                                'fontSize': 'sm'
                              }
                            },
                            {
                              'type': 'Text',
                              'properties': {
                                'fieldName': 'location.state',
                                'fontSize': 'sm'
                              }
                            },
                            {
                              'type': 'Text',
                              'properties': {
                                'fieldName': 'location.country',
                                'fontSize': 'sm'
                              }
                            },
                            {
                              'type': 'Text',
                              'properties': {
                                'fieldName': 'location.postcode',
                                'fontSize': 'sm'
                              }
                            }
                          ]
                        }
                      },
                      {
                        'type': 'FlexLayout',
                        'properties': {
                          'direction': 'column',
                          'components': [
                            {
                              'type': 'Headline',
                              'properties': {
                                'text': 'Coordinates',
                                'level': 3
                              }
                            },
                            {
                              'type': 'Text',
                              'properties': {
                                'fieldName': 'location.coordinates.latitude',
                                'fontSize': 'sm'
                              }
                            },
                            {
                              'type': 'Text',
                              'properties': {
                                'fieldName': 'location.coordinates.longitude',
                                'fontSize': 'sm'
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            'type': 'CardLayout',
            'properties': {
              'title': 'Contact Information',
              'components': [
                {
                  'type': 'FlexLayout',
                  'properties': {
                    'direction': 'column',
                    'components': [
                      {
                        'type': 'Headline',
                        'properties': {
                          'text': 'Email',
                          'level': 3
                        }
                      },
                      {
                        'type': 'Text',
                        'properties': {
                          'fieldName': 'email',
                          'fontSize': 'md'
                        }
                      }
                    ]
                  }
                },
                {
                  'type': 'FlexLayout',
                  'properties': {
                    'direction': 'column',
                    'components': [
                      {
                        'type': 'Headline',
                        'properties': {
                          'text': 'Phone',
                          'level': 3
                        }
                      },
                      {
                        'type': 'Text',
                        'properties': {
                          'fieldName': 'phone',
                          'fontSize': 'md'
                        }
                      },
                      {
                        'type': 'Headline',
                        'properties': {
                          'text': 'Cell',
                          'level': 3
                        }
                      },
                      {
                        'type': 'Text',
                        'properties': {
                          'fieldName': 'cell',
                          'fontSize': 'md'
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            'type': 'CardLayout',
            'properties': {
              'title': 'Login Information',
              'components': [
                {
                  'type': 'FlexLayout',
                  'properties': {
                    'direction': 'column',
                    'components': [
                      {
                        'type': 'Headline',
                        'properties': {
                          'text': 'Username',
                          'level': 3
                        }
                      },
                      {
                        'type': 'Text',
                        'properties': {
                          'fieldName': 'login.username',
                          'fontSize': 'md'
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            'type': 'CardLayout',
            'properties': {
              'title': 'Date of Birth',
              'components': [
                {
                  'type': 'FlexLayout',
                  'properties': {
                    'direction': 'column',
                    'components': [
                      {
                        'type': 'Headline',
                        'properties': {
                          'text': 'Date',
                          'level': 3
                        }
                      },
                      {
                        'type': 'Text',
                        'properties': {
                          'fieldName': 'dob.date',
                          'fontSize': 'md'
                        }
                      }
                    ]
                  }
                },
                {
                  'type': 'FlexLayout',
                  'properties': {
                    'direction': 'column',
                    'components': [
                      {
                        'type': 'Headline',
                        'properties': {
                          'text': 'Age',
                          'level': 3
                        }
                      },
                      {
                        'type': 'Text',
                        'properties': {
                          'fieldName': 'dob.age',
                          'fontSize': 'md'
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            'type': 'CardLayout',
            'properties': {
              'title': 'Registered Information',
              'components': [
                {
                  'type': 'FlexLayout',
                  'properties': {
                    'direction': 'column',
                    'components': [
                      {
                        'type': 'Headline',
                        'properties': {
                          'text': 'Date',
                          'level': 3
                        }
                      },
                      {
                        'type': 'Text',
                        'properties': {
                          'fieldName': 'registered.date',
                          'fontSize': 'md'
                        }
                      }
                    ]
                  }
                },
                {
                  'type': 'FlexLayout',
                  'properties': {
                    'direction': 'column',
                    'components': [
                      {
                        'type': 'Headline',
                        'properties': {
                          'text': 'Age',
                          'level': 3
                        }
                      },
                      {
                        'type': 'Text',
                        'properties': {
                          'fieldName': 'registered.age',
                          'fontSize': 'md'
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        ]
      } as LayoutConfig,
    },
    {
      firstAPI: {  'components': [{      'type': 'CardLayout',      'properties': {        'title': 'Personal Information',        'components': [{            'type': 'Image',            'properties': {              'fieldName': 'picture.large',              'alt': 'Profile Picture'            }          },          {            'type': 'LabeledText',            'properties': {              'fieldName': 'name.title',              'label': 'Title',              'separator': ':',              'fontSize': 'md'            }          },          {            'type': 'LabeledText',            'properties': {              'fieldName': 'name.first',              'label': 'First Name',              'separator': ':',              'fontSize': 'md'            }          },          {            'type': 'LabeledText',            'properties': {              'fieldName': 'name.last',              'label': 'Last Name',              'separator': ':',              'fontSize': 'md'            }          },          {            'type': 'LabeledText',            'properties': {              'fieldName': 'gender',              'label': 'Gender',              'separator': ':',              'fontSize': 'md'            }          },          {            'type': 'LabeledText',            'properties': {              'fieldName': 'dob.date',              'label': 'Date of Birth',              'separator': ':',              'fontSize': 'md'            }          }]      }    },    {      'type': 'CardLayout',      'properties': {        'title': 'Contact Information',        'components': [{            'type': 'LabeledText',            'properties': {              'fieldName': 'email',              'label': 'Email',              'separator': ':',              'fontSize': 'md'            }          },          {            'type': 'LabeledText',            'properties': {              'fieldName': 'phone',              'label': 'Phone',              'separator': ':',              'fontSize': 'md'            }          },          {            'type': 'LabeledText',            'properties': {              'fieldName': 'cell',              'label': 'Cell',              'separator': ':',              'fontSize': 'md'            }          },          {            'type': 'LabeledText',            'properties': {              'fieldName': 'location.street.number',              'label': 'Street Number',              'separator': ':',              'fontSize': 'md'            }          },          {            'type': 'LabeledText',            'properties': {              'fieldName': 'location.street.name',              'label': 'Street Name',              'separator': ':',              'fontSize': 'md'            }          },          {            'type': 'LabeledText',            'properties': {              'fieldName': 'location.city',              'label': 'City',              'separator': ':',              'fontSize': 'md'            }          },          {            'type': 'LabeledText',            'properties': {              'fieldName': 'location.state',              'label': 'State',              'separator': ':',              'fontSize': 'md'            }          },          {            'type': 'LabeledText',            'properties': {              'fieldName': 'location.country',              'label': 'Country',              'separator': ':',              'fontSize': 'md'            }          },          {            'type': 'LabeledText',            'properties': {              'fieldName': 'location.postcode',              'label': 'Postcode',              'separator': ':',              'fontSize': 'md'            }          }]      }    },    {      'type': 'CardLayout',      'properties': {        'title': 'Login Information',        'components': [{            'type': 'LabeledText',            'properties': {              'fieldName': 'login.uuid',              'label': 'UUID',              'separator': ':',              'fontSize': 'md'            }          },          {            'type': 'LabeledText',            'properties': {              'fieldName': 'login.username',              'label': 'Username',              'separator': ':',              'fontSize': 'md'            }          }]      }    },    {      'type': 'CardLayout',      'properties': {        'title': 'Registered Information',        'components': [{            'type': 'LabeledText',            'properties': {              'fieldName': 'registered.date',              'label': 'Registration Date',              'separator': ':',              'fontSize': 'md'            }          }]      }    }] }
    },
    {
      withInstructions: { 'components':[{ 'type':'CardLayout','properties':{ 'title':'User Information','components':[{ 'type':'FlexLayout','properties':{ 'direction':'column','components':[{ 'type':'CardLayout','properties':{ 'title':'Personal Information','components':[{ 'type':'FlexLayout','properties':{ 'direction':'row','components':[{ 'type':'Image','properties':{ 'fieldName':'picture.large','alt':'Profile Picture' } },{ 'type':'FlexLayout','properties':{ 'direction':'column','components':[{ 'type':'Input','properties':{ 'label':'Title','fieldName':'name.title','action':'updateField' } },{ 'type':'Input','properties':{ 'label':'First Name','fieldName':'name.first','action':'updateField' } },{ 'type':'Input','properties':{ 'label':'Last Name','fieldName':'name.last','action':'updateField' } },{ 'type':'Input','properties':{ 'label':'Gender','fieldName':'gender','action':'updateField' } },{ 'type':'Input','properties':{ 'label':'Age','fieldName':'dob.age','action':'updateField' } },{ 'type':'Button','properties':{ 'text':'Save','action':'submitForm' } }] } }] } }] } },{ 'type':'CardLayout','properties':{ 'title':'Contact Information','components':[{ 'type':'LabeledText','properties':{ 'fieldName':'email','label':'Email','separator':':','fontSize':'lg' } },{ 'type':'LabeledText','properties':{ 'fieldName':'phone','label':'Phone','separator':':','fontSize':'lg' } },{ 'type':'LabeledText','properties':{ 'fieldName':'cell','label':'Cell','separator':':','fontSize':'lg' } }] } },{ 'type':'CardLayout','properties':{ 'title':'Location Information','components':[{ 'type':'LabeledText','properties':{ 'fieldName':'location.street.name','label':'Street','separator':':','fontSize':'lg' } },{ 'type':'LabeledText','properties':{ 'fieldName':'location.city','label':'City','separator':':','fontSize':'lg' } },{ 'type':'LabeledText','properties':{ 'fieldName':'location.state','label':'State','separator':':','fontSize':'lg' } },{ 'type':'LabeledText','properties':{ 'fieldName':'location.country','label':'Country','separator':':','fontSize':'lg' } },{ 'type':'LabeledText','properties':{ 'fieldName':'location.postcode','label':'Postcode','separator':':','fontSize':'lg' } }] } },{ 'type':'CardLayout','properties':{ 'title':'Login Information','components':[{ 'type':'LabeledText','properties':{ 'fieldName':'login.username','label':'Username','separator':':','fontSize':'lg' } },{ 'type':'LabeledText','properties':{ 'fieldName':'login.password','label':'Password','separator':':','fontSize':'lg' } },{ 'type':'LabeledText','properties':{ 'fieldName':'login.uuid','label':'UUID','separator':':','fontSize':'lg' } },{ 'type':'LabeledText','properties':{ 'fieldName':'login.salt','label':'Salt','separator':':','fontSize':'lg' } },{ 'type':'LabeledText','properties':{ 'fieldName':'login.md5','label':'MD5','separator':':','fontSize':'lg' } },{ 'type':'LabeledText','properties':{ 'fieldName':'login.sha1','label':'SHA1','separator':':','fontSize':'lg' } },{ 'type':'LabeledText','properties':{ 'fieldName':'login.sha256','label':'SHA256','separator':':','fontSize':'lg' } }] } }] } }] } }] }
    },
    {
      mixtral8x7b: {
        'components': [
          {
            'type': 'CardLayout',
            'properties': {
              'title': 'User Information',
              'components': [
                {
                  'type': 'FlexLayout',
                  'properties': {
                    'direction': 'row',
                    'components': [
                      {
                        'type': 'Image',
                        'properties': {
                          'fieldName': 'picture.large',
                          'alt': 'User Profile Picture'
                        }
                      },
                      {
                        'type': 'FlexLayout',
                        'properties': {
                          'direction': 'column',
                          'components': [
                            {
                              'type': 'LabeledText',
                              'properties': {
                                'fieldName': 'name.title',
                                'label': 'Title',
                                'separator': ':',
                                'fontSize': 'md'
                              }
                            },
                            {
                              'type': 'LabeledText',
                              'properties': {
                                'fieldName': 'name.first',
                                'label': 'First Name',
                                'separator': ':',
                                'fontSize': 'md'
                              }
                            },
                            {
                              'type': 'LabeledText',
                              'properties': {
                                'fieldName': 'name.last',
                                'label': 'Last Name',
                                'separator': ':',
                                'fontSize': 'md'
                              }
                            },
                            {
                              'type': 'LabeledText',
                              'properties': {
                                'fieldName': 'gender',
                                'label': 'Gender',
                                'separator': ':',
                                'fontSize': 'md'
                              }
                            },
                            {
                              'type': 'LabeledText',
                              'properties': {
                                'fieldName': 'email',
                                'label': 'Email',
                                'separator': ':',
                                'fontSize': 'md'
                              }
                            },
                            {
                              'type': 'LabeledText',
                              'properties': {
                                'fieldName': 'phone',
                                'label': 'Phone Number',
                                'separator': ':',
                                'fontSize': 'md'
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            'type': 'CardLayout',
            'properties': {
              'title': 'Location',
              'components': [
                {
                  'type': 'LabeledText',
                  'properties': {
                    'fieldName': 'location.street.name',
                    'label': 'Street Name',
                    'separator': ':',
                    'fontSize': 'md'
                  }
                },
                {
                  'type': 'LabeledText',
                  'properties': {
                    'fieldName': 'location.street.number',
                    'label': 'Street Number',
                    'separator': ':',
                    'fontSize': 'md'
                  }
                },
                {
                  'type': 'LabeledText',
                  'properties': {
                    'fieldName': 'location.city',
                    'label': 'City',
                    'separator': ':',
                    'fontSize': 'md'
                  }
                },
                {
                  'type': 'LabeledText',
                  'properties': {
                    'fieldName': 'location.state',
                    'label': 'State',
                    'separator': ':',
                    'fontSize': 'md'
                  }
                },
                {
                  'type': 'LabeledText',
                  'properties': {
                    'fieldName': 'location.country',
                    'label': 'Country',
                    'separator': ':',
                    'fontSize': 'md'
                  }
                },
                {
                  'type': 'LabeledText',
                  'properties': {
                    'fieldName': 'location.postcode',
                    'label': 'Postcode',
                    'separator': ':',
                    'fontSize': 'md'
                  }
                },
                {
                  'type': 'LabeledText',
                  'properties': {
                    'fieldName': 'location.coordinates.latitude',
                    'label': 'Latitude',
                    'separator': ':',
                    'fontSize': 'md'
                  }
                },
                {
                  'type': 'LabeledText',
                  'properties': {
                    'fieldName': 'location.coordinates.longitude',
                    'label': 'Longitude',
                    'separator': ':',
                    'fontSize': 'md'
                  }
                },
                {
                  'type': 'LabeledText',
                  'properties': {
                    'fieldName': 'location.timezone.offset',
                    'label': 'Timezone Offset',
                    'separator': ':',
                    'fontSize': 'md'
                  }
                },
                {
                  'type': 'LabeledText',
                  'properties': {
                    'fieldName': 'location.timezone.description',
                    'label': 'Timezone Description',
                    'separator': ':',
                    'fontSize': 'md'
                  }
                }
              ]
            }
          },
          {
            'type': 'CardLayout',
            'properties': {
              'title': 'Registration and DOB',
              'components': [
                {
                  'type': 'LabeledText',
                  'properties': {
                    'fieldName': 'registered.date',
                    'label': 'Registration Date',
                    'separator': ':',
                    'fontSize': 'md'
                  }
                },
                {
                  'type': 'LabeledText',
                  'properties': {
                    'fieldName': 'dob.date',
                    'label': 'Date of Birth',
                    'separator': ':',
                    'fontSize': 'md'
                  }
                }
              ]
            }
          },
          {
            'type': 'CardLayout',
            'properties': {
              'title': 'Authentication',
              'components': [
                {
                  'type': 'LabeledText',
                  'properties': {
                    'fieldName': 'login.uuid',
                    'label': 'UUID',
                    'separator': ':',
                    'fontSize': 'md'
                  }
                },
                {
                  'type': 'LabeledText',
                  'properties': {
                    'fieldName': 'login.username',
                    'label': 'Username',
                    'separator': ':',
                    'fontSize': 'md'
                  }
                },
                {
                  'type': 'LabeledText',
                  'properties': {
                    'fieldName': 'login.password',
                    'label': 'Password',
                    'separator': ':',
                    'fontSize': 'md'
                  }
                },
                {
                  'type': 'LabeledText',
                  'properties': {
                    'fieldName': 'login.salt',
                    'label': 'Salt',
                    'separator': ':',
                    'fontSize': 'md'
                  }
                },
                {
                  'type': 'LabeledText',
                  'properties': {
                    'fieldName': 'login.md5',
                    'label': 'MD5',
                    'separator': ':',
                    'fontSize': 'md'
                  }
                },
                {
                  'type': 'LabeledText',
                  'properties': {
                    'fieldName': 'login.sha1',
                    'label': 'SHA1',
                    'separator': ':',
                    'fontSize': 'md'
                  }
                },
                {
                  'type': 'LabeledText',
                  'properties': {
                    'fieldName': 'login.sha256',
                    'label': 'SHA256',
                    'separator': ':',
                    'fontSize': 'md'
                  }
                }
              ]
            }
          },
          {
            'type': 'CardLayout',
            'properties': {
              'title': 'Identifier',
              'components': [
                {
                  'type': 'LabeledText',
                  'properties': {
                    'fieldName': 'id.name',
                    'label': 'Identifier Name',
                    'separator': ':',
                    'fontSize': 'md'
                  }
                },
                {
                  'type': 'LabeledText',
                  'properties': {
                    'fieldName': 'id.value',
                    'label': 'Identifier Value',
                    'separator': ':',
                    'fontSize': 'md'
                  }
                }
              ]
            }
          }
        ]
      }
    }
  ],
};
