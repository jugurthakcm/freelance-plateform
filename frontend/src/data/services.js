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
    list: [
      'Wordpress',
      'Plateformes de création de sites web',
      'Création de sites e-commerce ',
      'Programmation web',
      'Cours de codage en ligne',
      'Cybersécurité & protection des données',
      'Assistance et IT',
      'Analyse des données et rapports',
      'Convertir des fichiers',
      'Base de données',
      'Tests utilisateurs',
    ],
  },
  {
    title: <FormattedMessage id="services.marketing" />,
    background: digitalMarketing,
    list: [
      'Marketing des réseaux sociaux',
      'SEO',
      'Publicités sur les réseaux sociaux',
      'Marketing de contenu',
      'Marketing vidéo',
      'SEM',
      'Stratégies Marketing',
      "Analyses d'audience Internet",
      "Marketing d'Influence",
      'Community Management',
      'SEO local',
      'Recherche de noms de domaine',
      'Marketing e-commerce',
      'Autres',
    ],
  },
  {
    title: <FormattedMessage id="services.photography" />,
    background: photography,
    list: ['Photography'],
  },
  {
    title: <FormattedMessage id="services.translation" />,
    background: translation,
    list: [
      'Articles & Blog',
      'Traductions',
      'Relectures & Corrections',
      'Contenu de sites Web',
      'Rédactions de podcast',
      'Contenu pour réseaux sociaux',
      'Écriture de scénarios',
      "Noms d'entreprises et slogans",
      'Écriture créative',
      'Recherches & Comptes rendus',
      'Autres',
    ],
  },
  {
    title: <FormattedMessage id="services.voice" />,
    background: voice,
    list: ['Voice'],
  },
  {
    title: <FormattedMessage id="services.design" />,
    background: design,
    list: [
      'Conception de logo',
      'Cartes de visite & Papeterie',
      'Illustrations',
      'Conception de posters',
      'Conception de signalisation',
      'Conception de dépliants',
      'Couverture de podcast',
      'Design de packaging',
      'Storyboards',
      'Webdesign & Design mobile',
      'Design pour réseaux sociaux',
      'Conception de cartes postales',
      'Conception de catalogues',
      'Conception de menu',
      "Conception d'invitations",
      'Portraits & Caricatures',
      'Bandes dessinées & Comics',
      'Bannières web',
      'Retouche Photoshop',
      'Conception industrielle & de produits',
      "Conception de stand d'exposition",
      'Conception de présentations',
      "Réalisation d'infographies",
    ],
  },
  {
    title: <FormattedMessage id="services.motion" />,
    background: motion,
    list: [
      'Vidéo & Animation',
      'Montages vidéos',
      'Pubs vidéos',
      'GIF animés',
      'Animation de logo',
      'Introductions et conclusions',
      "Aperçus de sites Web et d'applications",
      'Vidéos explicatives',
      'Animations de produits 3D',
      'Paroles & Vidéoclips',
      'Effets spéciaux',
      'Vidéos diaporama',
      'Article to Videos',
    ],
  },
  {
    title: <FormattedMessage id="services.architecture" />,
    background: architecture,
    list: [
      'Architecture intérieure',
      'Arcihtecture urbanisme',
      'Architecture paysagiste',
    ],
  },
];
