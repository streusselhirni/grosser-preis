import { createApp } from 'vue';
import App from './App.vue';
import store from './store';

import BalmUI from 'balm-ui';
import BalmUiPlus from 'balm-ui-plus';
import 'balm-ui-css';
import './assets/normalize.css';
import './assets/style.scss';

const app = createApp(App);
app.use(store);
app.use(BalmUI);
app.use(BalmUiPlus);

app.mount('#app');
