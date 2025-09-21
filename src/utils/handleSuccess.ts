import { useToast } from 'vue-toast-notification';

const $toast = useToast();
const handleSuccess = (message: string) => {
  $toast.success(message, { position: 'top-right' });
};

export default handleSuccess;
