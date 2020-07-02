import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';

import { withStyles } from '@material-ui/core/styles';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import Moment from 'moment';
import TextField from '@material-ui/core/TextField';
import { debounce } from 'lodash'
import ExhibitionService from '../service/ExhibitionService'
import Box from '@material-ui/core/Box';
import Pagination from '@material-ui/lab/Pagination';


const styles = {
    root: {
        background: '#bbdefb',
        padding: '4vh',
        display: 'flex',
    },
    left: {
        flex: '1'
    },
    right: {
        flex: '2',
        minHeight: '100vh',
        marginLeft: '4vh'
    },
    card: {
        display: 'flex',
        margin: '2vh 0',
        height: '25vh'
    },
    cover: {
        flex: '1',
    },
    details: {
        flex: '2',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    content: {
        overflow: 'hidden',
    },
};


class ExhibitionContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            date: Moment(new Date()).format('YYYY-MM-DD'),
            page: 1,
            totalPage: 1,
            keywords: '',
            exhibitions: [],
        }
        this.exhibitionService = ExhibitionService.getInstance()
    }

    componentDidMount() {
        this.findByDate(this.state.date, this.state.page)
    }

    findByDate = (date, page) => {
        this.exhibitionService
            .findByDate(date, page)
            .then(res => {
                this.setState({
                    exhibitions: res.exhibitions,
                    totalPage: res.totalPage
                })
            })
    }

    changeDate = date => {
        this.setState({
            date: Moment(date).format('YYYY-MM-DD'),
            page: 1
        }, () => {
            this.findByDate(this.state.date, this.state.page)
        })
    }

    handlePageChange = (event, value) => {
        this.setState({
            page: value
        }, () => {
            if (this.state.keywords.trim().length) {
                this.findByKeywords(this.state.keywords.trim(), this.state.page)
            } else {
                this.findByDate(this.state.date, this.state.page)
            }
        })
    }

    findByKeywords = debounce((keywords, page) => {
        console.log("hit")

        this.exhibitionService
            .findByKeywords(keywords, page)
            .then(res => {
                this.setState({
                    exhibitions: res.exhibitions,
                    totalPage: res.totalPage
                })
            })
    }, 300)

    inputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            if (this.state.keywords.trim().length) {
                this.setState({
                    page: 1
                }, () => {
                    this.findByKeywords(this.state.keywords.trim(), this.state.page)
                })
            } else {
                this.setState({
                    page: 1
                }, () => {
                    this.findByDate(Moment(new Date()).format('YYYY-MM-DD'), this.state.page)
                })
            }
        })
    }

    checkDetails = id => {
        this.props.history.push('/exhibitions/id/' + id);
    }

    render() {
        const { classes } = this.props;
        const { exhibitions, page, totalPage } = this.state;

        return (
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <div className={classes.root}>
                    <aside className={classes.left}>
                        <DatePicker
                            className={classes.datepicker}
                            autoOk
                            orientation="landscape"
                            variant="static"
                            openTo="date"
                            value={this.state.date}
                            onChange={this.changeDate}
                        />
                    </aside>
                    <main className={classes.right}>
                        <TextField
                            id="outlined-basic"
                            label="Keywords"
                            variant="outlined"
                            fullWidth
                            name="keywords"
                            value={this.state.keywords}
                            onChange={this.inputChange}
                        />
                        {exhibitions.length ?
                            <React.Fragment>
                                {exhibitions.map(exhibition =>
                                    <Card key={exhibition._id} className={classes.card}>
                                        <CardMedia
                                            className={classes.cover}
                                            image={exhibition.imgUrl}
                                        />
                                        <div className={classes.details}>
                                            <CardContent className={classes.content}>
                                                <Typography variant="h6">{exhibition.title}</Typography>
                                                <Typography variant="subtitle1">
                                                    From: {Moment.utc(exhibition.dateFrom).local().format('YYYY/MM/DD hh:mm a')}
                                                </Typography>
                                                <Typography variant="subtitle1">
                                                    To: {Moment.utc(exhibition.dateTo).local().format('YYYY/MM/DD hh:mm a')}
                                                </Typography>
                                                <Typography variant="subtitle1">{exhibition.location}</Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button
                                                    disabled={Moment(new Date()) > Moment.utc(exhibition.dateTo).local()}
                                                    onClick={() => { this.checkDetails(exhibition._id) }}
                                                    variant="contained"
                                                    color="secondary">
                                                    Tickets
                                            </Button>
                                            </CardActions>
                                        </div>
                                    </Card>)}
                                <Box display="flex" justifyContent="center">
                                    <Pagination
                                        className={classes.page}
                                        page={page}
                                        onChange={this.handlePageChange}
                                        count={totalPage}
                                        shape="rounded"
                                        color="primary" />
                                </Box>
                            </React.Fragment>
                            : <Typography variant="subtitle1">0 matching results.</Typography>
                        }
                    </main>

                </div>
            </MuiPickersUtilsProvider>

        )
    }
}


export default withStyles(styles)(ExhibitionContainer);