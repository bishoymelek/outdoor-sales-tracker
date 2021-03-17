import React from 'react';
import i18next from 'i18next';

function DefaultFooter({ config }) {
  const { poweredBy, company } = config;
  return (
    <>
      <span>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={company[`${i18next.language}Url`]}
        >
          {i18next.t(company.name)}
        </a>
        &copy; 2020
      </span>
      <span className="ml-auto">
        {`${i18next.t('powered.by.title')} `}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={company[`${i18next.language}Url`]}
        >
          {i18next.t(poweredBy.name)}
        </a>
      </span>
    </>
  );
}

export default DefaultFooter;
