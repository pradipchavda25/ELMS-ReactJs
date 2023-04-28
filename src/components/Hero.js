import React from 'react'
import './hero.css';
import Button from '@mui/material/Button';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import IconButton from '@mui/material/IconButton';
import hero from '../images/heromain.jpg';
import { Link } from "react-router-dom";
import { useAuthContext } from '../authentication/context/AuthContext';
export default function Heromain() {

  const { user } = useAuthContext();

  return (
    <><div className='hero'>
      <div className='heromain'>
        <div className='lefthero'>
          <h1 className='herotitle'>A New Way of <br /> Digital Learning</h1>
          <p className='subline'>Lets shape our future generation with a more efficient way of learning. helped by existing technology.</p>
          <Button variant="contained" className='getstarted'>
            {user ? (
              <Link className='get_started' to='/courses'>Get Started</Link>
            ) : (
              <Link className='get_started' to='/login'>Get Started</Link>
            )}
          </Button>
          <div className='tutorial'>
            <IconButton className='playicon' color="primary" aria-label="upload picture" component="label">
              <PlayCircleFilledIcon />
            </IconButton>
            <p className='playline'>Learn how</p>
          </div>
        </div>
        <div className='righthero'>
          <img src={hero} className='heroimg' alt="React Logo" />
        </div>
      </div>
    </div>
    </>
  )
}
