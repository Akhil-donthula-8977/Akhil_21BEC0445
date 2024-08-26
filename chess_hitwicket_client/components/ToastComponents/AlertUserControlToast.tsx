import { toast } from 'react-hot-toast';
export const showToast = (message:string) => {
    toast(`${message}`, {
      position: 'top-center',
      style: {
        animation: 'bounce 1s',
        color:"red"
      },
      duration: 1000, 
    });
  };