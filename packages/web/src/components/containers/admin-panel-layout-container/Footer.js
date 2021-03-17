import React from 'react';

function DefaultFooter({ config }) {
  const { poweredBy, company } = config;
  return (
    <>
      <span>
        <a href={company.url}>{company.name}</a> &copy; 2019
      </span>
      <span className="ml-auto">
        Powered by <a href={poweredBy.url}>{poweredBy.name}</a>
      </span>
    </>
  );
}

export default DefaultFooter;
