export const categorySchema = {
  form: {
    core: [
      {
        id: 'categoryName',
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
        id: 'categoryCode',
        label: 'code.title',
        type: 'text',
        inputType: 'number',
        validationType: 'number',
        validations: [
          {
            type: 'required',
            params: ['validation.required.title']
          }
        ]
      },
      {
        id: 'img',
        label: 'image.title',
        type: 'text',
        validationType: 'text',
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
        categoryName: {
          label: {
            xs: 12
          },
          input: {
            xs: 12
          }
        },
        categoryCode: {
          label: {
            xs: 12
          },
          input: {
            xs: 12
          }
        }
      },
      {
        img: {
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
        dataField: 'categoryName',
        text: 'name.title'
      },
      {
        dataField: 'categoryCode',
        text: 'code.title'
      },
      {
        dataField: 'update',
        text: 'update.title',
        fieldType: 'button'
      }
    ]
  }
};

export default categorySchema;
