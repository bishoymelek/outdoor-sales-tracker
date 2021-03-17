import React from 'react';
import {
  Col,
  Container,
  Row,
  FormGroup,
  FormFeedback,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Button
} from 'reactstrap';
import AuthService from 'utils/auth';
import {
  SynthesizedSpinner,
  ToggleDirection,
  SynthesizedAlert
} from 'components';
import history from 'utils/history';
import { loginSchema } from 'configuration/validationSchemas';
import logoAr from 'assets/img/brand/logo-ar.jpg';
import logoEn from 'assets/img/brand/logo.jpg';
import resourcesList from 'store-config/resourcesList.json';
import i18next from 'i18next';
import { Formik, Form, Field } from 'formik';
import { mapLoadingProp } from 'utils/data-mappers';
import dmStoreResponseMapper from 'utils/api';

class Login extends React.PureComponent {
  componentDidUpdate() {
    const { accountDetails, changeValue } = this.props;
    /**
     * check if token is stored in local storage
     * and account details and the user permissions list received
     */
    if (
      AuthService.isLoggedIn()
      // TODO: uncomment this
      // && accountDetails.permissions.length
    ) {
      changeValue('account', 'data', accountDetails);
      history.push('/');
    }
  }

  render() {
    const { sid, fireDataAction, resources } = this.props;
    return (
      <>
        <Container fluid>
          <div className="d-flex flex-row-reverse">
            <div className="float-right position-absolute ">
              <ToggleDirection />
            </div>
          </div>
          <SynthesizedSpinner
            dataRef={resources}
            dataMapper={data => ({
              isLoading: mapLoadingProp(data)
            })}
            hasOverlay
            psid={sid}
          />
          <div className="app flex-row align-items-center login-container">
            <Row className="justify-content-center">
              <Col
                xs={9}
                md={6}
                lg={5}
                className="d-flex align-items-center p-3 p-m-0 pb-md-0 pb-3 bg-white"
              >
                <img
                  className="img-fluid"
                  alt="logo"
                  src={i18next.language === 'ar' ? logoAr : logoEn}
                />
              </Col>
              <Col xs={9} md={6} lg={5} className="bg-primary p-3 p-md-4">
                <SynthesizedAlert
                  psid={sid}
                  dataRef={[
                    {
                      storeName: resourcesList.Account
                    }
                  ]}
                  dataMapper={data => ({
                    ...dmStoreResponseMapper(data, resourcesList.Account)
                  })}
                />
                <Row>
                  <Col>
                    <h1>{i18next.t('login.title')}</h1>
                    <p className="text-muted-light">
                      {i18next.t('login.description')}
                    </p>
                  </Col>
                </Row>
                <Formik
                  validateOnChange
                  validationSchema={loginSchema}
                  onSubmit={values => {
                    fireDataAction('login', values, resourcesList.Account, sid);
                  }}
                  initialValues={{ email: '', password: '' }}
                >
                  {({ handleSubmit, touched, errors }) => {
                    return (
                      <Form className="with-aligned-label">
                        <Row form>
                          <Col md={12}>
                            <FormGroup>
                              <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    {i18next.t('email.label')}
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Field
                                  type="email"
                                  name="email"
                                  placeholder={i18next.t('email.placeholder')}
                                  className={`form-control ${
                                    touched.login && errors.login
                                      ? 'is-invalid'
                                      : ''
                                  }`}
                                />
                                <InputGroupAddon addonType="append">
                                  <InputGroupText>
                                    <i className="fa fa-user" />
                                  </InputGroupText>
                                </InputGroupAddon>
                              </InputGroup>
                              <FormFeedback>
                                {touched.email && errors.email && (
                                  <p className="invalid-field">
                                    {i18next.t(errors.email)}
                                  </p>
                                )}
                              </FormFeedback>
                            </FormGroup>
                          </Col>
                          <Col md={12}>
                            <FormGroup>
                              <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    {i18next.t('password.title')}
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Field
                                  autoComplete="current-password"
                                  type="password"
                                  name="password"
                                  placeholder={i18next.t(
                                    'password.placeholder'
                                  )}
                                  className={`form-control ${
                                    touched.password && errors.password
                                      ? 'is-invalid'
                                      : ''
                                  }`}
                                />
                                <InputGroupAddon addonType="append">
                                  <InputGroupText>
                                    <i className="fa fa-asterisk" />
                                  </InputGroupText>
                                </InputGroupAddon>
                              </InputGroup>
                              <FormFeedback>
                                {touched.password && errors.password && (
                                  <p className="invalid-field">
                                    {i18next.t(errors.password)}
                                  </p>
                                )}
                              </FormFeedback>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row className="flex-row-reverse">
                          <Col xs={6}>
                            <Button
                              onClick={handleSubmit}
                              type="submit"
                              color="primary"
                              className="form-btn btn-outline-light"
                            >
                              <i className="fa fa-dot-circle-o" />
                              {i18next.t('login.title')}
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    );
                  }}
                </Formik>
              </Col>
            </Row>
          </div>
        </Container>
      </>
    );
  }
}
Login.defaultProps = {
  sid: 'loginRoute'
};
export default Login;
