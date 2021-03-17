import { synthesizeComponent } from 'react-state';
import { AlertHOC } from '../hoc-alert';
import Component from './Form';

export const Form = synthesizeComponent(AlertHOC(Component));
export default Form;
