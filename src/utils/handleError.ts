import { useToast } from 'vue-toast-notification';
import { AxiosError } from 'axios';

const $toast = useToast();
const handleError = (err: unknown) => {
  console.log(err);
  if (err instanceof AxiosError) {
    $toast.error(err?.response?.data?.message);
  } else $toast.error('Wrong occur.');
};

export default handleError;
