export const profileSchema = {
  form: {
    core: [
      {
        id: 'fullName',
        label: 'fullName.title',
        placeholder: 'name.placeholder.user',
        type: 'text',
        value: ''
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
            params: ['this field is required']
          },
          {
            type: 'min',
            params: [11, 'phone cannot be less than 11 characters']
          },
          {
            type: 'max',
            params: [11, 'phone cannot be more than 11 characters']
          }
        ]
      },
      {
        id: 'password',
        label: 'password.title',
        placeholder: 'password.placeholder',
        type: 'text',
        inputType: 'password'
      }
    ],
    ui: [
      {
        fullName: {
          label: {
            xs: 12
          },
          input: {
            xs: 12
          }
        }
      },
      {
        phone: {
          label: {
            xs: 12
          },
          input: {
            xs: 12
          }
        },
        password: {
          label: {
            xs: 12
          },
          input: {
            xs: 12
          }
        }
      }
    ]
  }
};

export default profileSchema;
