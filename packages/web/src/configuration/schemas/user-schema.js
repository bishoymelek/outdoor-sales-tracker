import resourcesList from 'store-config/resourcesList.json';
import { userGroupListMapper } from 'configuration/dataMappers';

const branchLookupMapping = resp => {
  return resp.data && resp.data.list && resp.data.list.length
    ? resp.data.list.map(item => ({
        id: item._id,
        name: item.branch_name ? item.branch_name : ''
      }))
    : [];
};
export const userSchema = {
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
        id: 'email',
        label: 'email.title',
        placeholder: 'email.placeholder',
        type: 'text',
        inputType: 'email'
      },
      {
        id: 'password',
        label: 'password.title',
        placeholder: 'password.placeholder',
        type: 'text',
        inputType: 'password'
      },
      {
        id: 'groups',
        label: 'groups.title',
        placeholder: 'groups.placeholder',
        type: 'dropdown',
        validationType: 'string',
        validations: [
          {
            type: 'required',
            params: ['this field is required']
          }
        ],
        customFields: {
          nameMapper: data => {
            if (data && data.length) {
              return data.length && data[0].name && data[0].name.ar;
            }
            if (data && data.name) return data && data.name;
            return data;
          },
          storeName: resourcesList.UserGroup,
          labelField: 'ar',
          keyField: '_id',
          dataRef: [
            {
              storeName: resourcesList.UserGroup
            }
          ],
          dataMapper: state => {
            return { list: userGroupListMapper(state[`${resourcesList.UserGroup}_0`]) }
          }
        }
      }
      // {
      //   id: 'branchId',
      //   label: 'branch.title',
      //   placeholder: 'branch.placeholder',
      //   type: 'dropdown',
      //   customFields: {
      //     nameMapper: data => {
      //       if (data) {
      //         if (data && data.length) {
      //           return (data[0] && data[0].name && data[0].name.ar) || '';
      //         }
      //         return data.branch_name;
      //       }
      //     },
      //     index: 1,
      //     storeName: resourcesList.Branch,
      //     labelField: 'branch_name',
      //     keyField: '_id',
      //     dataRef: [
      //       {
      //         storeName: resourcesList.Branch
      //       }
      //     ],
      //     dataMapper: state => ({
      //       list: branchLookupMapping(state[`${resourcesList.Branch}_0`])
      //     })
      //   }
      // }
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
      },
      {
        groups: {
          label: {
            xs: 12
          },
          input: {
            xs: 12
          }
        }
        // branchId: {
        //   label: {
        //     xs: 12
        //   },
        //   input: {
        //     xs: 12
        //   }
        // }
      },
      {
        phone: {
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
        dataField: 'fullName',
        text: 'fullName.title'
      },
      {
        dataField: 'email',
        text: 'email.title'
      },
      {
        dataField: 'role.code',
        text: 'job.title',
        sort: true
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

export default userSchema;
