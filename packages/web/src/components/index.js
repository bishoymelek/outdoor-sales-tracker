import { synthesizeComponent } from 'react-state';
import ErrorBoundary from './error-boundary';
import HeadTags from './head-tag';
import ToggleDirection from './toggle-direction';
import Card from './card';
import Form from './Form';
import Modal from './modal';
import Tabs from './tabs';
import DateRangePicker from './date-range-picker';
import { ProtectedRoute, ProtectedRouteHOC } from './hoc-protected-route';
import SynthesizedDropdown from './synthesized-dropdown';
import SynthesizedSpinner from './synthesized-spinner';
import { SynthesizedAlert } from './synthesized-alert/SynthesizedAlert';
import { SynthesizedTable } from './synthesized-table';
import Translation from './Translation';
import SchemaEditor from './schema-editor';
import CustomTagDropdown from './synthesized-custom-tag-dropdown';
import AdminPanelLayoutContainerStoreConfig from './containers/admin-panel-layout-container/stateConfig';
import AdminPanelLayoutContainer from './containers/admin-panel-layout-container';
import LayoutContainerComponent from './containers/layout-container';
import { stateConfig as LayoutContainerStateConfig } from './containers/layout-container/stateConfig';

const LayoutContainer = synthesizeComponent(
  LayoutContainerComponent,
  LayoutContainerStateConfig
);

const AdminPanelContainer = synthesizeComponent(
  AdminPanelLayoutContainer,
  AdminPanelLayoutContainerStoreConfig
);

export {
  LayoutContainer,
  AdminPanelContainer,
  CustomTagDropdown,
  SchemaEditor,
  Form,
  Modal,
  Tabs,
  Card,
  DateRangePicker,
  ErrorBoundary,
  HeadTags,
  ToggleDirection,
  ProtectedRoute,
  ProtectedRouteHOC,
  Translation,
  SynthesizedTable,
  SynthesizedDropdown,
  SynthesizedSpinner,
  SynthesizedAlert
};
