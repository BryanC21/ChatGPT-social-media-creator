import { Container, Row, Col, Image } from 'react-bootstrap';
import axios from "axios";
import * as React from 'react';

const UserPage = () => {
    const [user, setUser] = React.useState({});
    const [post, setPost] = React.useState({});

    React.useEffect(() => {
        axios.get(`http://ec2-52-8-240-214.us-west-1.compute.amazonaws.com/api/user/getCurrentUser`, { withCredentials: true })
            .then(function (response) {
                setUser(response.data.results);
            })
            .catch(function (error) {
                console.log(error);
            });
        axios.get(`http://ec2-52-8-240-214.us-west-1.compute.amazonaws.com/api/post/getPostHistory`, { withCredentials: true })
            .then(function (response) {
                setPost(response.data.results);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    return (
        <div style={{margin: "auto"}}>
            <Container >
                <Row>
                    <Col md={6} className="d-flex align-items-center justify-content-center">
                        <Image src={'../../User.png'} fluid style={{ maxWidth: '200px', maxHeight: '200px' }} />
                    </Col>
                    <Col md={6} className="d-flex align-items-start justify-content-start flex-column">
                        <h3 style={{ borderBottom: '2px solid #191970' }}>
                           Name: {user.firstName} {user.lastName}
                        </h3>
                        <p className="text-primary">Email: {user.email}</p>
                        <p>Post History: </p>
                        {post.length ? post.map((item, index) => (
                            <div key={index}>
                                <p>{item.text}</p>
                                <img src={item.image} alt="" />
                                <p>{item.updatedAt}</p>
                            </div>
                        ))
                        : <></>
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    );
}


export default UserPage;