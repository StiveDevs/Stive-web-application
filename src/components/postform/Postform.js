import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';
import Checkout from '../checkout/Checkout'
import Postcard from '../postcard/Postcard'
import Container from '@mui/material/Container';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';

import AddCircleIcon from '@mui/icons-material/AddCircle';


function Postform() {
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(!open);
    };
    const handleClickAway = () => {
        setOpen(false);
    };

    return (
        <div>
            <AddCircleIcon onClick={handleClick}>Create</AddCircleIcon>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <Container maxWidth="sm">
                        <CancelTwoToneIcon onClick={handleClick}>Close backdrop</CancelTwoToneIcon>
                        <Checkout />
                </Container>
            </Backdrop>
        </div>
    );
}

export default Postform;
