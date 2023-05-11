import styled from "@emotion/styled";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import * as React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from '../components/Header';
import { getToken } from '../util';
import Post from "../../../../backend/database/models/Post";
import Platform from "../../../../backend/database/models/Platform";
import User from "../../../../backend/database/models/User";
import { getByPost } from "../../../../backend/controllers/UserController";

const Image = styled('img')({
    height: '100%',
    width: '100%'
});

const UserPage = () => {
    const params = useParams();



    const navigate = useNavigate();
    const [user, setUser] = React.useState({});

    React.useEffect(() => {
        axios.get(`http://localhost:5003/users/${params.userId}`, {
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

    const [post, getByPost] = React.useState({});
    React.useEffect(() => {
        axios.get(`http://localhost:5003/api/users/${params.userId}`, {
            headers: {
                authorization: `Bearer ${getToken()}`
            }
        })
            .then(function (response) {
                // console.log(response.data)
                getByPost(response.data);
            })
            .catch(function (error) {

                console.log(error);
            });
    }, []);


    return (
        <>
            <Header />
            <Container maxWidth='sm' style={{ marginTop: 36, marginBottom: 36 }}>
                <Box border={1} borderRadius={2} my={2} px={8} py={2} key={'user'} borderColor='#8FBC8F' style={{ background: 'palegreen' }}>
                    <Grid container my={4} direction='row' justifyContent="center" alignItems="center">
                        <Grid item xs={6} p={4}>
                            <Image src={'../../User.png'} />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="subtitle2" color='#00008B'>
                                Twitter
                            </Typography>
                        </Grid>
                        <Grid item xs={6} justifyContent="flex-start" alignItems="flex-start" textAlign='left'>
                            <Typography variant="h5" color='#191970' borderBottom={2}>
                                {user.first_name} {user.last_name}
                            </Typography>
                            <Typography variant="subtitle2" color='#00008B'>
                                {user.email}
                            </Typography>
                            <Typography variant="subtitle2" >
                                Images Created: {post.image}
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