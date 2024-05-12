import type { LayoutConfig } from '@/dynamicUI/components/ComponentConfig';

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
              'id': 'headline',
              'text': 'Alphabetical Cartogram',
              'level': 1
            }
          },
          {
            'type': 'Textarea',
            'properties': {
              'id': 'textarea',
              'label': 'Alt Text',
              'placeholder': 'Enter alt text',
              'fieldName': 'alt',
              'action': 'updateField'
            }
          },
          {
            'type': 'Image',
            'properties': {
              'id': 'image',
              'src': 'https://imgs.xkcd.com/comics/alphabetical_cartogram.png',
              'alt': 'Alphabetical Cartogram Image'
            }
          },
          {
            'type': 'Headline',
            'properties': {
              'id': 'headline',
              'text': 'Details',
              'level': 2
            }
          },
          {
            'type': 'Input',
            'properties': {
              'id': 'input',
              'label': 'Title',
              'placeholder': 'Enter title',
              'fieldName': 'title',
              'action': 'updateField'
            }
          },
          {
            'type': 'Input',
            'properties': {
              'id': 'input',
              'label': 'Day',
              'placeholder': 'Enter day',
              'fieldName': 'day',
              'action': 'updateField'
            }
          },
          {
            'type': 'Input',
            'properties': {
              'id': 'input',
              'label': 'Month',
              'placeholder': 'Enter month',
              'fieldName': 'month',
              'action': 'updateField'
            }
          },
          {
            'type': 'Input',
            'properties': {
              'id': 'input',
              'label': 'Year',
              'placeholder': 'Enter year',
              'fieldName': 'year',
              'action': 'updateField'
            }
          },
          {
            'type': 'Button',
            'properties': {
              'id': 'input',
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
    { defaultLayout:
      {
        'components':[{ 'type':'CardLayout','properties':{ 'id':'cardLayout','components':[{ 'type':'Headline','properties':{ 'id':'headline','text':'Personal Information','level':1 } },{ 'type':'FlexLayout','properties':{ 'id':'flexLayout','direction':'row','components':[{ 'type':'Image','properties':{ 'id':'image','fieldName':'picture.large','alt':'User Profile Picture' } },{ 'type':'FlexLayout','properties':{ 'id':'flexLayout','direction':'column','components':[{ 'type':'LabeledText','properties':{ 'id':'labeledText','fieldName':'name.title','label':'Title','separator':':','fontSize':'md' } },{ 'type':'LabeledText','properties':{ 'id':'labeledText','fieldName':'name.first','label':'First Name','separator':':','fontSize':'md' } },{ 'type':'LabeledText','properties':{ 'id':'labeledText','fieldName':'name.last','label':'Last Name','separator':':','fontSize':'md' } },{ 'type':'LabeledText','properties':{ 'id':'labeledText','fieldName':'gender','label':'Gender','separator':':','fontSize':'md' } },{ 'type':'LabeledText','properties':{ 'id':'labeledText','fieldName':'dob.age','label':'Age','separator':':','fontSize':'md' } },{ 'type':'LabeledText','properties':{ 'id':'labeledText','fieldName':'nat','label':'Nationality','separator':':','fontSize':'md' } }] } }] } }] } },{ 'type':'CardLayout','properties':{ 'id':'cardLayout','components':[{ 'type':'Headline','properties':{ 'id':'headline','text':'Contact Information','level':1 } },{ 'type':'LabeledText','properties':{ 'id':'labeledText','fieldName':'email','label':'Email','separator':':','fontSize':'md' } },{ 'type':'LabeledText','properties':{ 'id':'labeledText','fieldName':'phone','label':'Phone','separator':':','fontSize':'md' } },{ 'type':'LabeledText','properties':{ 'id':'labeledText','fieldName':'cell','label':'Cell','separator':':','fontSize':'md' } }] } },{ 'type':'CardLayout','properties':{ 'id':'cardLayout','components':[{ 'type':'Headline','properties':{ 'id':'headline','text':'Address Information','level':1 } },{ 'type':'LabeledText','properties':{ 'id':'labeledText','fieldName':'location.street.number','label':'Street Number','separator':':','fontSize':'md' } },{ 'type':'LabeledText','properties':{ 'id':'labeledText','fieldName':'location.street.name','label':'Street Name','separator':':','fontSize':'md' } },{ 'type':'LabeledText','properties':{ 'id':'labeledText','fieldName':'location.city','label':'City','separator':':','fontSize':'md' } },{ 'type':'LabeledText','properties':{ 'id':'labeledText','fieldName':'location.state','label':'State','separator':':','fontSize':'md' } },{ 'type':'LabeledText','properties':{ 'id':'labeledText','fieldName':'location.country','label':'Country','separator':':','fontSize':'md' } },{ 'type':'LabeledText','properties':{ 'id':'labeledText','fieldName':'location.postcode','label':'Postcode','separator':':','fontSize':'md' } }] } }]
      } as LayoutConfig
    },
    { defaultLayoutWithInput:
        { 'components':[{ 'type':'CardLayout','properties':{ 'id':'cardLayout','components':[{ 'type':'Headline','properties':{ 'id':'headline','text':'Personal Information','level':1 } },{ 'type':'Image','properties':{ 'id':'image','fieldName':'picture.large','alt':'Profile Picture' } },{ 'type':'LabeledText','properties':{ 'id':'labeledText','fieldName':'name.title','label':'Title','separator':':','fontSize':'md' } },{ 'type':'LabeledText','properties':{ 'id':'labeledText','fieldName':'name.first','label':'First Name','separator':':','fontSize':'md' } },{ 'type':'LabeledText','properties':{ 'id':'labeledText','fieldName':'name.last','label':'Last Name','separator':':','fontSize':'md' } },{ 'type':'LabeledText','properties':{ 'id':'labeledText','fieldName':'gender','label':'Gender','separator':':','fontSize':'md' } },{ 'type':'LabeledText','properties':{ 'id':'labeledText','fieldName':'dob.age','label':'Age','separator':':','fontSize':'md' } },{ 'type':'LabeledText','properties':{ 'id':'labeledText','fieldName':'nat','label':'Nationality','separator':':','fontSize':'md' } }] } },{ 'type':'CardLayout','properties':{ 'id':'cardLayout','components':[{ 'type':'Headline','properties':{ 'id':'headline','text':'Contact Information','level':2 } },{ 'type':'Form','properties':{ 'id':'form','fieldName':'','submitFormat':{ 'email':'email','phone':'phone','cell':'cell','country':'location.country' },'validation':'submit','components':[{ 'type':'Input','properties':{ 'id':'input','label':'Email','fieldName':'email' } },{ 'type':'Input','properties':{ 'id':'input','label':'Phone','fieldName':'phone' } },{ 'type':'Input','properties':{ 'id':'input','label':'Cell','fieldName':'cell' } },{ 'type':'Input','properties':{ 'id':'input','fieldName':'location.country','label':'Country' } },{ 'type':'Button','properties':{ 'id':'button','text':'Submit','type':'submit' } }] } }] } },{ 'type':'CardLayout','properties':{ 'id':'cardLayout','components':[{ 'type':'Headline','properties':{ 'id':'headline','text':'Address Information','level':3 } },{ 'type':'LabeledText','properties':{ 'id':'labeledText','fieldName':'location.street.name','label':'Street Name','separator':':','fontSize':'md' } },{ 'type':'LabeledText','properties':{ 'id':'labeledText','fieldName':'location.city','label':'City','separator':':','fontSize':'md' } },{ 'type':'LabeledText','properties':{ 'id':'labeledText','fieldName':'location.state','label':'State','separator':':','fontSize':'md' } },{ 'type':'LabeledText','properties':{ 'id':'labeledText','fieldName':'location.country','label':'Country','separator':':','fontSize':'md','format':['UPPERCASE'] } },{ 'type':'LabeledText','properties':{ 'id':'labeledText','fieldName':'location.postcode','label':'Postal Code','separator':':','fontSize':'md' } }] } }] }
    }
  ],
};
