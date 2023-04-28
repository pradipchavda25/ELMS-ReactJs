import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './blog.css'
import axios from 'axios';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
export default function Blogs() {
  const [data, setData] = useState([]);

  const img_url = "http://localhost:1337";
  const blog_url = "http://localhost:3000/";

  useEffect(() => {
    axios.get('http://localhost:1337/api/blog-cards?populate=%2A')
      .then((response) => {
        const Data = response.data;
        setData(Data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <><div>
      <div className='header'>
        <h1>BLOGS</h1>
        <p>this are top blogs available in e-learning. you can read according to your interests</p>
      </div>
      <div className='blog-section'>
        <div className='left-side'>
          {data.length === 0 ? (
            <><Loader /><br /><br /><br /></>
          ) : (
            data.map((item, index) => (
              <Card className='blog-card' sx={{ maxWidth: 345 }} key={item.id}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={`${img_url}${item?.attributes?.blogimage?.data?.attributes?.url}`} />
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
      </div>
    </div><br /></>
  )
}
