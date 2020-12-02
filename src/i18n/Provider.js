import { Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import { LOCALES } from './constants';
import content from './content/content';

const Provider = ({ children, locale = LOCALES.ENGLISH }) => (
  <IntlProvider
    textComponent={Fragment}
    locale={locale}
    messages={content[locale]}
    defaultRichTextElements={{
      strong: (chunks) => <strong>{chunks}</strong>,
      br: () => <br />,
      p: (chunks) => <p>{chunks}</p>,
    }}
  >
    {children}
  </IntlProvider>
);
export default Provider;
