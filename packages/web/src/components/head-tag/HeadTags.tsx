import React from 'react';
import { Helmet } from 'react-helmet';
import i18next from 'i18next';

export default function Component(props: any): JSX.Element {
  const { children, name } = props;
  return (
    <>
      <Helmet>
        <title>{i18next.t(name) || 'Untitled'}</title>
      </Helmet>
      {children}
    </>
  );
}
