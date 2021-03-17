import React from 'react';
import i18next from 'i18next';
import * as customFields from './custom-fields';

/**
 *
 * @param {Array} columns schema columns array
 * @param {Function} translatingFunction translation handling function
 */
const handleLocale = (columns = []) => {
  if (!columns.length) {
    throw Error('Please provide columns array for the schema');
  } else {
    return columns.length
      ? columns.map(columnItem => {
          return {
            ...columnItem,
            text: i18next.t(columnItem.text)
          };
        })
      : [];
  }
};

/**
 *
 * @param {*} param
 * @param {*} CustomFieldComponent
 * @param {*} customProps
 */
const appendCustomField = (
  { dataField, text, ...mainProps },
  CustomFieldComponent,
  customProps = {}
) => {
  try {
    const { onClickHandler, ...restProps } = customProps;
    return {
      text,
      dataField,
      formatter: (cell, rowData) => (
        <CustomFieldComponent
          {...restProps}
          {...mainProps}
          text={text}
          value={cell}
          onClickHandler={
            onClickHandler ? onClickHandler.bind(cell, rowData) : null
          }
        />
      )
    };
  } catch (error) {
    console.error('error/handle-appending-table-custom-field', error);
  }
};

/**
 * Handling Appending custom Fields,
 * It supports only the below defined fields
 * @param {Array} columns
 * @param {Object} customProps custom props for the columns
 */
const handleAppendingCustomFields = (columns = [], customProps = {}) => {
  try {
    if (!columns.length) {
      throw Error('Please provide columns array for the schema');
    } else {
      const columnsCustomFieldsMapper = {
        button: customFields.Btn,
        customField: customFields.CustomTableField
      };
      return columns.map(columnItem => {
        const { fieldType, ...columnItemRestProps } = columnItem;
        if (fieldType && columnsCustomFieldsMapper[fieldType]) {
          return appendCustomField(
            { ...columnItemRestProps },
            columnsCustomFieldsMapper[fieldType],
            customProps[columnItem?.dataField]
          );
        }
        return { ...columnItem };
      });
    }
  } catch (error) {
    console.error('error/handle-appending-table-fields', error);
  }
};

const schemaFactory = ({ schema, customFieldProps }) => {
  const localizedSchemaColumns = handleLocale(schema.columns);
  const ColumnsAppendedWithCustomFields = handleAppendingCustomFields(
    localizedSchemaColumns,
    customFieldProps
  );
  return { ...schema, columns: ColumnsAppendedWithCustomFields };
};

export { schemaFactory, handleAppendingCustomFields, handleLocale };
