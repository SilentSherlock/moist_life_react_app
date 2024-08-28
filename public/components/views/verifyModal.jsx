// components/VerifyModal.js
import React, {useEffect, useState} from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const VerifyModal = ({ title, initPhone, modalOpen, initAccountState, handleClose, handleSubmit, children }) => {
    console.log("initPhone ", initPhone)
    const [code, setCode] = useState('');
    const [phone, setPhone] = useState(initPhone);
    const [accountState, setAccountState] = useState(initAccountState);


    useEffect(() => {
        setPhone(initPhone);
        setAccountState(accountState)
    },[modalOpen, initPhone, accountState]);

    const onSubmit = () => {
        console.log("onSubmit phone %s code %s", phone, code);
        handleSubmit(phone, code);
    };

    return (
        <Modal open={modalOpen} onClose={handleClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    backgroundColor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography variant="h6" component="h2">
                    {title}
                </Typography>
                <TextField
                    label="Account"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={initPhone}
                    disabled={true}
                />
                <TextField
                    label={title}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    sx={{ display: ("0" === accountState ? "none" : "block") }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button variant="contained" color="primary" onClick={onSubmit}>
                        提交
                    </Button>
                    {children}
                </Box>
            </Box>
        </Modal>
    );
};

export default VerifyModal;
