import React from 'react';
import Button from '@mui/material/Button';

function CautionButton() {
    const [open, setOpen] = useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Caution
        </Button>
        
      </div>
    );
  }
  
  export default CautionButton;
  

export default CautionButton;
