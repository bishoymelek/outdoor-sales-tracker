import React from 'react';
import { dataActions } from 'react-state';
// @ts-ignore
import toJsonSchema from 'to-json-schema';
import '@json-editor/json-editor';
import { Row, Col, Button } from 'reactstrap';
import { SynthesizedSpinner, Card } from 'components';

class SchemaEditor extends React.PureComponent<any, any> {
  editor: any;

  initEditorFunctionInterval: NodeJS.Timeout;

  constructor(props: any) {
    super(props);
    this.state = {
      isObjLoaded: false,
      obj: null,
      isSchemaLoaded: false,
      schema: null
    };
    this.onSave = this.onSave.bind(this);
    this.initEditor = this.initEditor.bind(this);
    this.startInitalizingEditor = this.startInitalizingEditor.bind(this);
    this.initEditorFunctionInterval = setInterval(
      () => this.startInitalizingEditor(),
      30
    );
  }

  componentDidUpdate(): void {
    const { isObjLoaded, isSchemaLoaded, schema } = this.state;
    if (!isSchemaLoaded && schema && isObjLoaded) {
      this.initEditor();
    }
  }

  onSave(): void {
    const { fireDataAction, onSaveHandler, storeName } = this.props;
    const data = this.editor.getValue();
    if (onSaveHandler) {
      onSaveHandler(data);
    } else if (storeName) {
      fireDataAction(dataActions.update, data, storeName);
    }
  }

  startInitalizingEditor(): void {
    const { obj } = this.props;
    const { isObjLoaded } = this.state;
    if (!isObjLoaded && obj && obj.footer) {
      this.setState((prevState: any) => ({
        ...prevState,
        obj,
        isObjLoaded: true
      }));
      this.objectToSchema(obj);
      clearInterval(this.initEditorFunctionInterval);
    }
  }

  objectToSchema(obj: any): void {
    try {
      const schema: any = toJsonSchema(obj);
      if (schema) {
        this.setState((prevState: any) => ({
          ...prevState,
          schema
        }));
      }
    } catch (error) {
      console.error(error);
    }
  }

  initEditor(): void {
    const { schema, obj } = this.state;
    if (document.getElementsByClassName('schemaEditor')[0]) {
      // @ts-ignore
      this.editor = new window.JSONEditor(
        document.getElementsByClassName('schemaEditor')[0],
        {
          object_layout: 'grid',
          theme: 'bootstrap4',
          disable_edit_json: true,
          disable_properties: true,
          iconlib: 'fontawesome4',
          schema,
          startval: obj
        }
      );
      this.setState((prevState: any) => ({
        ...prevState,
        isSchemaLoaded: true
      }));
    }
  }

  render(): JSX.Element {
    const { title, isLoading, sid } = this.props;
    return (
      <>
        <SynthesizedSpinner hasOverlay isLoading={isLoading} psid={sid} />
        <Card header={{ title }}>
          <Row className="flex-row-reverse">
            <Col xs={2}>
              <Button onClick={this.onSave} label="Save" />
            </Col>
            <Col xs={12}>
              <div className="schemaEditor" />
            </Col>
          </Row>
        </Card>
      </>
    );
  }
}

// @ts-ignore
SchemaEditor.defaultProps = {
  sid: 'schemaEditor',
  obj: {}
};
export default SchemaEditor;
