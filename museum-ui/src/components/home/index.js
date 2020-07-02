import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Cube from './Cube'
import Typing from './Typing'
import Slider from './Slider'

import Typography from '@material-ui/core/Typography';
import BG from './BG';

const useStyles = makeStyles((theme) => ({
    container: {
    },
    main: {
        background: '#bbdefb'
    },

}));


export default function Home() {
    const classes = useStyles();
    const bg1 =  '/img/look.jpg'
    const bg2 =  '/img/gallery2.jpg'
    const bg3 =  '/img/carter.jpg'
    return (
        <div className={classes.container}>
            <main className={classes.main}>
                <BG img={bg1}>
                    <Typing />
                </BG>
                <Slider />
                <BG img={bg2}/>
                    <Cube />
                <BG img={bg3}/>
            </main>
        </div>
    )
}
