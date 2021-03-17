import React, { ReactNode } from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import i18next from 'i18next';

interface HeaderProps {
  title: string;
  icon?: string;
}
interface CardProps {
  header: HeaderProps;
  children: ReactNode;
}

export function Component(props: CardProps): JSX.Element {
  const { header, children } = props;
  return (
    <Card className="card-accent-primary">
      {header ? (
        <CardHeader>
          <strong>{i18next.t(header.title)}</strong>
        </CardHeader>
      ) : null}
      <CardBody> {children}</CardBody>
    </Card>
  );
}

Component.defaultProps = {};

export default Component;
