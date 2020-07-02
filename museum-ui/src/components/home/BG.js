import React from 'react'



export default function BG(props) {

    const styles = {
        height: '100vh',
        background: `url(${props.img}) no-repeat`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
    }

    return (
        <div style={styles}>
            {props.children}
        </div>
    )
}