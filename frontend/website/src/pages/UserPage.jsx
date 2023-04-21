import styled from "@emotion/styled";
//import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import * as React from 'react';
import { useNavigate, useParams } from "react-router-dom";
//import Footer from "../components/Footer";
//import Header from '../components/Header';
import { getToken } from '../util';
import CheckIcon from '@mui/icons-material/CheckCircleTwoTone';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import Post from "../../../../backend/database/models/Post";
import User from "../../../../backend/database/models/User";
import Platform from "../../../../backend/database/models/Platform";

const Image = styled('img')({
    height: '100%',
    width: '100%'
});

const UserPage = () => {
    const params = useParams();



    const navigate = useNavigate();
    const [user, setUser] = React.useState({});

    React.useEffect(() => {
        axios.get(`${config.BASE_URL}/users/${params.userId}`, {
            headers: {
                authorization: `Bearer ${getToken()}`
            }
        })
            .then(function (response) {
                // console.log(response.data)
                setUser(response.data);
            })
            .catch(function (error) {

                console.log(error);
            });
    }, []);


    return (
        <>
            <Header />
            <Container maxWidth='sm' style={{ marginTop: 36, marginBottom: 36 }}>
                <Box border={1} borderRadius={2} my={2} px={8} py={2} key={'user'} borderColor='#64646430' style={{ background: 'aliceblue' }}>
                    <Grid container my={4} direction='row' justifyContent="center" alignItems="center">
                        <Grid item xs={6} p={4}>
                            <Image src={'../../male-user.png'} />
                        </Grid>
                        <Grid item xs={6}>
                        <Typography variant="subtitle2" color='info.main'>
                                {Platform.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} justifyContent="flex-start" alignItems="flex-start" textAlign='left'>
                            <Typography variant="h6" color='info.main' borderBottom={2}>
                                {User.firstName} {User.lastName}
                            </Typography>
                            <Typography variant="subtitle2" color='info.main'>
                                {User.email}
                            </Typography>
                            <Typography variant="subtitle2" >
                                Images Created: {Post.image}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Footer />
        </>
    );
}


export default UserPage;