export const employeeSchema = {
  form: {
    core: [
      {
        id: 'name',
        label: 'name.title',
        placeholder: 'name.placeholder.employee',
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
        id: 'phone',
        label: 'phone.title',
        placeholder: 'phone.placeholder',
        type: 'text',
        inputType: 'tel',
        value: '',
        validationType: 'string',
        validations: [
          {
            type: 'required',
            params: ['validation.required.title']
          },
          {
            type: 'min',
            params: [11, 'validation.min.7.title']
          },
          {
            type: 'max',
            params: [11, 'validation.max.11.title']
          }
        ]
      },
      {
        id: 'code',
        label: 'code.title',
        placeholder: 'code.placeholder.employee',
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
        id: 'job',
        label: 'job.title',
        placeholder: 'job.placeholder',
        type: 'dropdown',
        customFields: {
          storeName: 'Job',
          labelField: 'name',
          keyField: '_id',
          dataMapper: dm => {
            return {
              list: dm
            };
          },
          dataRef: [
            {
              storeName: 'Job',
              default: []
            }
          ]
        },
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
        name: {
          label: {
            xs: 12
          },
          input: {
            xs: 12
          }
        },
        phone: {
          label: {
            xs: 12
          },
          input: {
            xs: 12
          }
        }
      },
      {
        code: {
          label: {
            xs: 12
          },
          input: {
            xs: 12
          }
        },
        job: {
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
        dataField: 'name',
        sort: true,
        text: 'name.title'
      },
      {
        dataField: 'phone',
        text: 'phone.title',
        sort: true
      },
      {
        dataField: 'dataEntry',
        text: 'dataEntry.title',
        sort: true
      }
    ]
  }
};

export default employeeSchema;
