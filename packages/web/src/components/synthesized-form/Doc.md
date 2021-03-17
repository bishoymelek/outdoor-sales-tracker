# FormComponent


## Props:
- formData: Array of objects, each has: 
  - {
    id, label, placeholder,
    type : type of input field,
    validationType,
    validations: Array of objects We use [YUP](https://www.npmjs.com/package/yup)
    }
- uiSchema: Array of objects, each has: 
    ```
        [element-name] : {
            label: {xs,sm,md,lg each has number of coloumns}
            input: {xs,sm,md,lg each has number of coloumns}
        }
    ```
    if you don't want to display label, don't give it values in uiSchema
    


## Example

Sample usage with all available props

```
<FormComponent
    formData={[
        {
            id: 'email',
            label: 'Email',
            placeholder: 'Email',
            type: 'text',
            validationType: 'string',
            value: '',
            validations: [
                {
                    type: 'required',
                    params: ['this field is required'],
                },
                {
                    type: 'min',
                    params: [5, 'email cannot be less than 5 characters'],
                },
                {
                    type: 'max',
                    params: [10, 'email cannot be more than 10 characters'],
                },
                {
                    type: 'email',
                    params: ['please enter a valid email'],
                },
            ],
        }
  ]}
    uiSchema={
        [{
            email: {
                label:{
                    md: 6,
                },
                input:{
                    md: 6,
                }
            }
        }]
    }
/>
```
