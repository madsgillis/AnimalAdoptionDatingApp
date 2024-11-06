// Gets appropriate colored tag based on status of animal
// Helper function 
import { Badge } from 'react-bootstrap';

// For status tag customization
function StatusTag({ status }) {
    const getStatusVariant = (status) => {
      switch (status) {
        case 'Adopted':
            return 'adopted';
        case 'Available':
            return 'available';
        case 'On Hold':
          return 'on-hold';
        case 'Currently Unavailable':
          return 'currently-unavailable';
        default:
          return 'primary';
      }
    };

    // custom colors
    const customStyles = {
        'available': { backgroundColor: '#d4e3c7', color: '#000000' },
        'adopted': { backgroundColor: '#e1c7e3', color: '#000000' },
        'on-hold': { backgroundColor: '#f9c382', color: '#000000' },
        'currently-unavailable': { backgroundColor: '#a6a5a5', color: '#000000' },
      };

    const variant = getStatusVariant(status);
    const style = customStyles[variant] || {};

    return (
        <Badge bg={variant} style={style}>
            {status}
        </Badge>
      );
    }

export default StatusTag;