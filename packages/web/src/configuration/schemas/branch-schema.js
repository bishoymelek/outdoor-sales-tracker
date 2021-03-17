import resourcesList from 'store-config/resourcesList.json';
import { cityLookupMapper } from 'store/data-providers/mapperUtils';

/* eslint-disable no-param-reassign */

export const branchSchema = {
  form: {
    core: [
      {
        id: 'branch_name',
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
        id: 'en_name',
        label: 'name.en.title',
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
        id: 'branch_code',
        label: 'branch.code.title',
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
        id: 'governantId',
        label: 'city.title',
        placeholder: 'city.placeholder',
        type: 'dropdown',
        customFields: {
          customHandlers: {
            valueMapper: data => {
              return (data[0] && data[0].name && data[0].name.ar) || '';
            }
          },
          storeName: resourcesList.UserGroup,
          labelField: 'ar',
          keyField: '_id',
          dataRef: [
            {
              storeName: resourcesList.City
            }
          ],
          dataMapper: state => ({
            list: cityLookupMapper(state[`${resourcesList.City}_0`])
          })
        }
      }
    ],
    ui: [
      {
        branch_name: {
          label: {
            xs: 12
          },
          input: {
            xs: 12
          }
        },
        en_name: {
          label: {
            xs: 12
          },
          input: {
            xs: 12
          }
        }
      },
      {
        branch_code: {
          label: {
            xs: 12
          },
          input: {
            xs: 12
          }
        },
        governantId: {
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
        dataField: 'branch_name',
        text: 'name.ar.title'
      },
      {
        dataField: 'en_name',
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

export default branchSchema;
