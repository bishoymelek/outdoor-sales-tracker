/* eslint-disable no-param-reassign */

export const userGroupSchema = {
  form: {
    core: [
      {
        id: 'name.ar',
        label: 'name.ar.title',
        type: 'text',
        validationType: 'string',
        validations: [
          {
            type: 'required',
            params: ['validation.required.title']
          }
        ]
      },
      {
        id: 'name.en',
        label: 'name.en.title',
        type: 'text',
        validationType: 'string',
        validations: [
          {
            type: 'required',
            params: ['validation.required.title']
          }
        ]
      }
    ],
    ui: [
      {
        'name.ar': {
          label: {
            xs: 12
          },
          input: {
            xs: 12
          }
        },
        'name.en': {
          label: {
            xs: 12
          },
          input: {
            xs: 12
          }
        }
      }
    ]
  },
  list: {
    keyField: '_id',
    columns: [
      {
        dataField: 'name.ar',
        text: 'name.ar.title'
      },
      {
        dataField: 'name.en',
        text: 'name.en.title'
      },
      {
        dataField: 'update',
        text: 'update.title',
        fieldType: 'button'
      },
      {
        dataField: 'delete',
        text: 'delete.title',
        fieldType: 'button'
      }
    ]
  }
};

export default userGroupSchema;
