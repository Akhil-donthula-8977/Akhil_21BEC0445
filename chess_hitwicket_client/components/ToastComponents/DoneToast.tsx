// import { toast } from 'react-hot-toast';
// export const DoneToast = (message:string) => {
//     toast(`${message}`, {
//       position: 'top-center',
//       style: {
//         animation: 'bounce 1s',
//         color:"Green"
//       },
//       duration: 1000, 
//     });
//   };
import { toast } from 'react-hot-toast';


import { FaCheckCircle } from "react-icons/fa";
export const DoneToast = (message: string) => {
    toast.custom((t) => (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#d4edda', // Light green background
                color: '#155724', // Dark green text
                padding: '10px',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                fontWeight: 'bold',
                animation: 'bounce 1s',
            }}
        >
            <FaCheckCircle style={{ marginRight: '10px', color: '#155724' }} />
            <span>{message}</span>
        </div>
    ), {
        position: 'top-center',
        duration: 1000,
    });
};
