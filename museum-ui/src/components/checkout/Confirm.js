import React from 'react'
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export default function Confirm(props) {
    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom>Thank you for your order.</Typography>
            <Typography variant="subtitle2" gutterBottom>
                Your order number is #
                <Link href="/orders">{props.exhibitionOrder._id}</Link>
                .</Typography>
        </React.Fragment>
    )
}
