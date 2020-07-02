import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import UserService from '../service/UserService'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Moment from 'moment';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import ExhibitionService from '../service/ExhibitionService'

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const styles = {
    root: {

    },
    breadcrumb: {
        margin: '4vh 0 2vh 0'
    },
    main: {

    },
    cover: {
        height: '40vh',
        display: 'flex',
        padding: '0 8vh',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'url(/img/ink-h.png)'
    },
    table: {
        marginBottom: '4vh',
    },
};

class Ticket extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false,
            alert: false,
            exhibition: {
                tickets: []
            },
            adult: 0,
            senior: 0,
            student: 0,
            child: 0,
            total: 0,
        }
        this.exhibitionService = ExhibitionService.getInstance()
        this.userService = UserService.getInstance()
    }
    handleClose = () => {
        this.setState({
            open: false
        })
    }

    componentDidMount() {
        this.exhibitionService.findById(
            this.props.match.params.id
        ).then(exhibition => {
            this.setState({ exhibition })
        })

    }

    sub = key => {
        if (this.state[key] > 0) {
            this.setState({ [key]: this.state[key] - 1 }, () => {
                this.sum()
            })
        }
    }

    add = key => {
        if (this.state[key] < this.state.exhibition.tickets[key].stock) {
            this.setState({ [key]: this.state[key] + 1 }, () => {
                this.sum()
            })
        } else {
            this.setState({ alert: true })
        }
    }

    sum = () => {
        let total = 0
        const { tickets } = this.state.exhibition
        for (let key in tickets) {
            total += this.state[key] * tickets[key].price
        }
        this.setState({ total });
    }

    checkout = () => {
        if (this.userService.isLoggedIn()) {
            let data = {}
            const { tickets } = this.state.exhibition

            for (let key in tickets) {
                if (this.state[key]) {
                    data[key] = {
                        amount: this.state[key],
                        price: tickets[key].price
                    }
                }
            }

            this.props.history.push({
                pathname: '/exhibitions/id/' + this.props.match.params.id + '/checkout',
                state: {
                    tickets: data,
                    total: this.state.total,
                    title: this.state.exhibition.title
                }
            });
        } else {
            this.setState({ open: true })
        }
    }

    handleAlertClose = (event) => {
        this.setState({ alert: false })
    };




    render() {
        const { classes } = this.props;
        const { exhibition, open, alert } = this.state;


        return (
            <Container className={classes.root}>

                <Snackbar open={alert} autoHideDuration={3000} onClose={this.handleAlertClose}>
                    <Alert
                        elevation={6}
                        variant="filled"
                        onClose={this.handleAlertClose}
                        severity="warning">
                        Can not exceed stock
                </Alert>
                </Snackbar>

                <Dialog onClose={this.handleClose} open={open}>
                    <DialogTitle id="dialog-title" onClose={this.handleClose}>
                        Info
                 </DialogTitle>
                    <DialogContent dividers>
                        <Typography gutterBottom>
                            Please <Link color="inherit" href="/auth">Login</Link> first
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={this.handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>

                <Breadcrumbs className={classes.breadcrumb}>
                    <Link color="inherit" href="/exhibitions">Exhibitions</Link>
                    <Typography color="textPrimary">{exhibition.title}</Typography>
                </Breadcrumbs>

                <Paper elevation={3} className={classes.cover}>
                    <Typography variant="subtitle1">{exhibition.description}</Typography>
                    <Typography variant="h6">
                        Duration: {Moment.utc(exhibition.dateFrom).local().format('YYYY/MM/DD hh:mm a')}
                        ~
                        {Moment.utc(exhibition.dateTo).local().format('YYYY/MM/DD hh:mm a')}</Typography>
                    <Typography variant="h6">Location: {exhibition.location}</Typography>
                </Paper>

                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Type</TableCell>
                            <TableCell align='center'>Price</TableCell>
                            <TableCell align='center'>Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(exhibition.tickets).map(key =>
                            <TableRow key={key}>
                                <TableCell align='center'>{key}</TableCell>
                                <TableCell align='center'>${exhibition.tickets[key].price}</TableCell>
                                {exhibition.tickets[key].stock ?
                                    <TableCell align='center'>
                                        <ButtonGroup color="primary">
                                            <Button onClick={() => this.sub(key)}><RemoveIcon /></Button>
                                            <Button>{this.state[key]}</Button>
                                            <Button onClick={() => this.add(key)}><AddIcon /></Button>
                                        </ButtonGroup>
                                    </TableCell>
                                    : <TableCell align='center'>sold out</TableCell>
                                }
                            </TableRow>
                        )}
                    </TableBody>

                    <TableFooter>
                        <TableRow>
                            <TableCell align='center'></TableCell>
                            <TableCell align='center'>Subtotal: ${this.state.total}</TableCell>
                            <TableCell align='center'>
                                <Button
                                    disabled={this.state.total === 0}
                                    onClick={this.checkout}
                                    variant="contained"
                                    color="secondary">
                                    checkout
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableFooter>

                </Table>
            </Container>
        )
    }
}

export default withStyles(styles)(Ticket)
