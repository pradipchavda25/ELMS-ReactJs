
import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './singleblog.css'
import axios from 'axios';
import Loader from '../Loader';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function CyberSecurityBlog() {

  const [data, setData] = useState([]);
  const [blogdata, setblogdata] = useState([]);

  const img_url = "http://localhost:1337";
  const blog_url = "http://localhost:3000/";

  useEffect(() => {
    axios.get('http://localhost:1337/api/blogs/?populate=%2A')
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        const Data = response.data;
        setData(Data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  useEffect(() => {
    axios.get('http://localhost:1337/api/blog-cards?populate=%2A')
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        const BlogData = response.data;
        setblogdata(BlogData.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (

    <Container className='main-container'>
      <Row className='sub-container'>
        <Col sm={8}>
          <div>
            <div className='header'>
              <h1 className='main-course-title'>{data[1]?.attributes?.title}</h1>

              <p>this are top blogs available in e-learning. you can read according to your interests</p>
            </div>

            <div className='blog-section'>
              <div className='left-side'>

                <Card className='blog-card'>
                  <CardMedia className='course-hero-img'
                    sx={{ height: 140 }}
                    image={`${img_url}${data[1]?.attributes?.blogimage?.data?.attributes?.url}`}
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {data[1]?.attributes?.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {data[1]?.attributes?.blogcontent}
                    </Typography>
                  </CardContent>
                </Card>

              </div>
              <div className='right-side'>
              </div>
            </div>
          </div> <br />
        </Col>

        {/* SIDE BAR FOR OTHER COURSES        */}
        <Col sm={4} className='more-courses'><br />
          <h5 className='more-course-title'> MORE BLOGS</h5> <br />
          <div className='left-side-courses'>
            {blogdata.length === 0 ? (
              <><Loader /><br /><br /><br /></>
            ) : (
              blogdata.map((item, index) => (
                <Card className='blog-card' sx={{ maxWidth: 345 }} key={item.id}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image={`${img_url}${item?.attributes?.blogimage?.data?.attributes?.url}`}
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item?.attributes?.blogtitle}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item?.attributes?.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link to={`${blog_url}${item?.attributes?.blogurl}`}>
                      <Button variant='outlined' size="small">Learn More</Button>
                    </Link>
                  </CardActions>
                </Card>
              ))
            )}
          </div>
        </Col> <br />
      </Row>
    </Container>


  )
}
