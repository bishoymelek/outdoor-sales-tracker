import React from 'react';
import {
  Badge,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Row,
  Col
} from 'reactstrap';
import {
  AppSwitch
  // @ts-ignore
} from '@coreui/react';
import Btn from '../Btn';
import i18next from 'i18next';

interface propsTypes {
  children?: any;
  header: any;
  footer: any;
  outlineVariant: any;
  classNames: any;
  closeBtn: any;
  headerSwitch: any;
  headerBadge: any;
  headerIcon: any;
  footerCustomBtnList: any;
  t: any;
}

function Component({
  title,
  header = { isVisible: true },
  children,
  footer,
  outlineVariant,
  classNames,
  closeBtn,
  headerSwitch,
  headerBadge,
  headerIcon,
  footerCustomBtnList,
  t
}: any): JSX.Element {
  return (
    <Card
      className={outlineVariant && `border-${outlineVariant} ${classNames}`}
    >
      {header && header.isVisible && (
        <CardHeader>
          {header.title || (title && <span>{header.title || title}</span>)}
          {header.action && (
            <div className="card-header-actions">
              {headerSwitch && headerSwitch.isVisible && (
                <AppSwitch
                  className="float-right mb-0"
                  label
                  color={headerSwitch.variant}
                  defaultChecked
                  size="sm"
                />
              )}
              {headerBadge && headerBadge.isVisible && (
                <Badge color={headerBadge.variant} className="float-right">
                  {headerBadge.title}
                </Badge>
              )}
              {headerIcon && headerIcon.isVisible && (
                <i className={`${headerIcon.icon} float-right`} />
              )}
              {closeBtn && closeBtn.isVisible ? (
                <button
                  type="submit"
                  className="card-header-action btn btn-close"
                  onClick={closeBtn.onClick}
                >
                  ff
                  <i className="icon-close" />
                </button>
              ) : null}
            </div>
          )}
        </CardHeader>
      )}
      <CardBody>{children}</CardBody>
      {footer && footer.isVisible && (
        <CardFooter>
          <Row>
            <Col xs={12}>{footer.content}</Col>
            <Col xs={12}>
              <Row className="flex-row-reverse">
                {footerCustomBtnList && footerCustomBtnList.length
                  ? // @ts-ignore
                    footerCustomBtnList.map((one: any) => {
                      if (
                        typeof one.btn === 'string' &&
                        typeof one.handler === 'function'
                      ) {
                        return (
                          <Col xs={6}>
                            <Btn
                              variant={one.variant}
                              label={i18next.t(one.label)}
                              onClickHandler={one.handler}
                            />
                          </Col>
                        );
                      }
                      return <></>;
                    })
                  : null}
              </Row>
            </Col>
          </Row>
        </CardFooter>
      )}
    </Card>
  );
}

export default Component;
