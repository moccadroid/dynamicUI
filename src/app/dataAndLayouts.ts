import type { LayoutConfig } from '@/interfaces/config/ComponentConfig';

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
  } as LayoutConfig,
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
  llama70bLayout: {
    'type': 'LayoutConfig',
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
  } as LayoutConfig
};
