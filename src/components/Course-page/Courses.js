import React, { useEffect, useState } from 'react';
import './courses.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Loader';

export default function Courses() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:1337/api/course-categories')
            .then((response) => {
                const dataRes = response.data.data;
                setData(dataRes);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className='body'>
            <section className='course-section'>
                <h2 className='page-title'>Course Categories</h2><br />
                <div class="container">
                    {data.length === 0 ? (
                        <Loader />
                    ) : (
                        data.map((item) => (
                            <div class="card">
                                <div class="box">
                                    <div class="content">

                                        <div key={item.id}>
                                            <h2>{item.id}</h2>
                                            <h3>{item.attributes.title}</h3>
                                            <p>{item.attributes.detail}</p>
                                        </div>

                                        <Link to='/it-courses' className='links'>
                                            Explore...
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </div>
    );
}
