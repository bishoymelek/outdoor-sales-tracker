import React from 'react';
import { useTranslation } from 'react-i18next';

export function Translation({ children }: any): JSX.Element {
  const { t } = useTranslation();
  return <>{React.cloneElement(children, { t })}</>;
}

export default Translation;
