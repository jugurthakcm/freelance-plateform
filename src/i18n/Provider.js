import { Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import { LOCALES } from './locales';
import content from './content/content';
import flatten from 'flat';

const I18nProvider = ({ children, locale = LOCALES.ENGLISH }) => (
  <IntlProvider
    textComponent={Fragment}
    locale={locale}
    messages={flatten(content[locale])}
    defaultRichTextElements={{
      strong: (chunks) => <strong>{chunks}</strong>,
      br: () => <br />,
      p: (chunks) => <p>{chunks}</p>,
    }}
  >
    {children}
  </IntlProvider>
);
export default I18nProvider;
