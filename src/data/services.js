import programmation from '../assets/images/programmation.jpg';
import digitalMarketing from '../assets/images/digitalMarketing.jpg';
import photography from '../assets/images/photography.jpg';
import translation from '../assets/images/translation.jpg';
import design from '../assets/images/design.jpg';
import motion from '../assets/images/motion.jpeg';
import voice from '../assets/images/voice.jpg';
import architecture from '../assets/images/architecture.jpg';
import { FormattedMessage } from 'react-intl';

export const services = [
  {
    title: <FormattedMessage id="services.programmation" />,
    background: programmation,
    list: ['programmation'],
  },
  {
    title: <FormattedMessage id="services.marketing" />,
    background: digitalMarketing,
    list: ['digitalMark'],
  },
  {
    title: <FormattedMessage id="services.photography" />,
    background: photography,
    list: ['hello'],
  },
  {
    title: <FormattedMessage id="services.translation" />,
    background: translation,
    list: ['hello'],
  },
  {
    title: <FormattedMessage id="services.voice" />,
    background: voice,
    list: ['hello'],
  },
  {
    title: <FormattedMessage id="services.design" />,
    background: design,
    list: ['hello'],
  },
  {
    title: <FormattedMessage id="services.motion" />,
    background: motion,
    list: ['hello'],
  },
  {
    title: <FormattedMessage id="services.architecture" />,
    background: architecture,
    list: ['architec'],
  },
];
