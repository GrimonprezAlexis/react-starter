import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import SimpleReactLightbox from 'simple-react-lightbox'


ReactDOM.render(<SimpleReactLightbox><App /></SimpleReactLightbox>, document.getElementById('root'));
registerServiceWorker();