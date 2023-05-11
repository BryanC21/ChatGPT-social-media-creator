import { Container, Row, Col, Image } from 'react-bootstrap';
import axios from "axios";
import * as React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { getToken } from '../util';
import Post from "../../../../backend/database/models/Post";
import Platform from "../../../../backend/database/models/Platform";
import User from "../../../../backend/database/models/User";
import { getByPost } from "../../../../backend/controllers/UserController";


const UserPage = () => {
    const params = useParams();



    const navigate = useNavigate();
    const [user, setUser] = React.useState({});

    React.useEffect(() => {
        axios.get(`http://localhost:5003/api/user/getCurrentUser`, {
            headers: {
                authorization: `Bearer ${getToken()}`
            }
        })
            .then(function (response) {
                // console.log(response.data)
                setUser(response.data.results);
            })
            .catch(function (error) {

                console.log(error);
            });
    }, []);

    const [post, getByPost] = React.useState({});
    React.useEffect(() => {
        axios.get(`http://localhost:5003/api/post/getPostHistory`, {
            headers: {
                authorization: `Bearer ${getToken()}`
            }
        })
            .then(function (response) {
                // console.log(response.data)
                getByPost(response.data.results);
            })
            .catch(function (error) {

                console.log(error);
            });
    }, []);


    return (
        <>
            <Header />
            <Container fluid style={{ marginTop: 36, marginBottom: 36 }}>
                <Row>
                    <Col md={6} className="d-flex align-items-center justify-content-center">
                        <Image src={'../../User.png'} />
                    </Col>
                    <Col md={6}>
                        <h6 className="text-primary">Twitter</h6>
                    </Col>
                    <Col md={6} className="d-flex align-items-start justify-content-start flex-column">
                        <h3 style={{ borderBottom: '2px solid #191970' }}>
                            {user.first_name} {user.last_name}
                        </h3>
                        <p className="text-primary">{user.email}</p>
                        <p>Images Created: {post.image}</p>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
}


export default UserPage;