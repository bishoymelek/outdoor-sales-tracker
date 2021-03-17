export const authSchema = {
  loginForm: {
    core: [
      {
        id: 'email',
        label: 'email.title',
        placeholder: 'email.placeholder',
        type: 'text',
        inputType: 'email',
        validationType: 'string',
        validations: [
          {
            type: 'required',
            params: ['validation.required.title']
          },
          { type: 'email', params: ['validation.email.title'] }
        ]
      },
      {
        id: 'password',
        label: 'password.title',
        placeholder: 'password.placeholder',
        type: 'text',
        inputType: 'password',
        validationType: 'string',
        validations: [
          {
            type: 'required',
            params: ['validation.required.title']
          }
          // { type: 'min', params: ['validation.min.7.title'] }
        ]
      }
    ],
    ui: [
      {
        email: {
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

export default authSchema;
