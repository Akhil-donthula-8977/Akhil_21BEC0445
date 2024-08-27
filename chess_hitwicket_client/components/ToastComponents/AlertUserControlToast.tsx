// import { toast } from 'react-hot-toast';
// export const showToast = (message:string) => {
//     toast(`${message}`, {
//       position: 'top-center',
//       style: {
//         animation: 'bounce 1s',
//         color:"red"
//       },
//       duration: 1000, 
//     });
//   };
import { toast } from 'react-hot-toast';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
export const showToast = (message: string) => {
  toast.custom((t) => (
      <div
          style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#f8d7da', // Light red background
              color: '#721c24', // Dark red text
              padding: '10px',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              fontWeight: 'bold',
              animation: 'bounce 1s',
          }}
      >
          <FaExclamationTriangle style={{ marginRight: '10px', color: '#721c24' }} />
          <span>{message}</span>
      </div>
  ), {
      position: 'top-center',
      duration: 1000,
  });
};