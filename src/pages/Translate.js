import React from 'react';
import Provider from '../i18n/Provider';
import { FormattedMessage } from 'react-intl';

const Translate = () => {
  return (
    <Provider locale="french">
      <FormattedMessage id="hello" />
    </Provider>
  );
};

export default Translate;
