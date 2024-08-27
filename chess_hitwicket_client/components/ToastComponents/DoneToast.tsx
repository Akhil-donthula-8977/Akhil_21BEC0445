import { toast } from 'react-hot-toast';
export const DoneToast = (message:string) => {
    toast(`${message}`, {
      position: 'top-center',
      style: {
        animation: 'bounce 1s',
        color:"Green"
      },
      duration: 1000, 
    });
  };