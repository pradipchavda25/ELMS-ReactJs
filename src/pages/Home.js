import React from 'react'
import AboutUs from '../components/About-us/AboutUs';
import Heromain from '../components/Hero';
import Courses from '../components/Courses-section/Courses';
import Features from '../components/Feature-section/Features';

export default function Home() {
  return (
    <div>
        <Heromain /><br />
        <Courses /><br />
        <AboutUs /><br />
        <Features /><br />
    </div>
  )
}
