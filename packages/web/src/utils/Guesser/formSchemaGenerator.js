/* eslint-disable no-unused-expressions */

function titlePropertyModifier(string) {
  const newStr = [];
  for (let index = 0; index < string.length; index += 1) {
    const character = string.charAt(index);
    if (index === 0) {
      newStr.push(character.toUpperCase());
    } else if (character == character.toUpperCase()) {
      newStr.push(' ');
      newStr.push(character);
    } else if (character == character.toLowerCase()) {
      newStr.push(character);
    }
  }
  return newStr.join('');
}

function generateFormUISchema(schema) {
  const { properties } = schema;
  const newUiSchema = { 'ui:field': 'layout', 'ui:layout': [{}] };
  const arrOfProps = Object.entries(properties)
    ? Object.entries(properties)
    : [];
  arrOfProps.length
    ? arrOfProps.map(([propKey, propValue]) => {
        newUiSchema['ui:layout'][0][propKey] = {};
        newUiSchema['ui:layout'][0][propKey].sm = 6;
      })
    : null;
  return newUiSchema;
}

function generateFormSchema(schema) {
  const { properties } = schema;
  const newSchema = {};
  const arrOfProps = Object.entries(properties)
    ? Object.entries(properties)
    : [];
  // TODO:
  for (let i = 0; i < arrOfProps.length; i += 1) {}
  arrOfProps.length
    ? arrOfProps.map(([propKey, propValue]) => {
        newSchema[propKey] = {
          ...propValue,
          title: titlePropertyModifier(propKey)
        };
      })
    : null;
  return newSchema;
}
export { generateFormUISchema, generateFormSchema };
