import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import router from './routes';
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { useAuthStore } from './store/useAuthStore';

const app = createApp(App);
const pinia = createPinia();

const queryClient = new QueryClient();

app.use(pinia);
app.use(router);
app.use(VueQueryPlugin, { queryClient });
app.use(ToastPlugin);

const auth = useAuthStore();

auth.loadUserFromLocalstorage();
app.mount('#app');
