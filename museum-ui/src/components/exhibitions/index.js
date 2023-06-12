import { Component } from "react";
import { Link } from "react-router-dom";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Typography,
  Box,
  CardHeader,
  Container,
  Grid,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Pagination
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import axiosInstance from "@service/axiosInstance";
import urlConfig from "@service/urlConfig";

dayjs.extend(utc);

class Exhibitions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: null,
      errorMessage: " ",
      page: 1,
      totalPage: 1,
      exhibitions: []
    };
  }

  componentDidMount() {
    this.listByPage(this.state.page);
  }

  listByPage = (page) => {
    axiosInstance
      .get(urlConfig.listExhibitions, {
        params: {
          page
        }
      })
      .then(({ exhibitions, totalPage }) => {
        this.setState({
          exhibitions,
          totalPage
        });
      });
  };

  validateDate = (newError) => {
    let errorMessage;
    switch (newError) {
      case "disablePast":
        errorMessage = "Please select a future date";
        break;
      case "invalidDate":
        errorMessage = "Your date is not valid";
        break;
      default:
        errorMessage = " ";
    }
    this.setState({ errorMessage });
  };

  changeDate = (date, context) => {
    if (date && context.validationError == null) {
      this.setState({
        date: dayjs(date).format("YYYY-MM-DD"),
        page: 1
      });
      this.findByDate(date, 1);
    } else if (date === null) {
      this.setState({
        date,
        page: 1
      });
      this.listByPage(1);
    }
  };

  findByDate = (date, page) => {
    axiosInstance
      .get(urlConfig.listExhibitions, {
        params: {
          page,
          date: dayjs(date).utc().format("YYYY-MM-DD")
        }
      })
      .then(({ exhibitions, totalPage }) => {
        this.setState({
          exhibitions,
          totalPage
        });
      });
  };

  handlePageChange = (event, value) => {
    this.setState(
      {
        page: value
      },
      () => {
        document.documentElement.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
      }
    );
    if (this.state.date) {
      this.findByDate(this.state.date, value);
    } else {
      this.listByPage(value);
    }
  };

  render() {
    const { date, errorMessage, exhibitions, page, totalPage } = this.state;
    return (
      <Box bgcolor="beige" minHeight="inherit">
        <Container
          maxWidth="md"
          sx={{
            py: {
              xs: 2,
              sm: 3,
              md: 4
            }
          }}
        >
          <DatePicker
            value={date}
            disablePast={true}
            onError={this.validateDate}
            slotProps={{
              textField: {
                helperText: errorMessage
              }
            }}
            onChange={this.changeDate}
            label="Filter by Month"
            views={["year", "month"]}
            openTo="month"
            format="YYYY-MM"
            sx={{
              width: "100%"
            }}
          />

          <Box
            sx={{
              mt: {
                xs: 2,
                md: 3
              }
            }}
          >
            {/* better to use skeleton */}
            {exhibitions.length ? (
              <>
                {exhibitions.map((exhibition) => (
                  <Card
                    key={exhibition._id}
                    sx={{
                      mb: {
                        xs: 2,
                        md: 3
                      }
                    }}
                  >
                    <Grid container alignItems="center">
                      <Grid
                        item
                        xs={12}
                        md={4}
                        height="14rem"
                        alignSelf="stretch"
                      >
                        <CardMedia
                          component="img"
                          height="100%"
                          image={require(`../../assets${exhibition.imgUrl}`)}
                          alt={exhibition.title}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <CardHeader title={exhibition.title} />
                        <CardContent>
                          <Typography variant="subtitle1">
                            {`Duration: ${dayjs
                              .utc(exhibition.dateFrom)
                              .local()
                              .format("YYYY/MM/DD")} ~ ${dayjs
                              .utc(exhibition.dateTo)
                              .local()
                              .format("YYYY/MM/DD")}`}
                          </Typography>
                          <Typography variant="subtitle1">
                            {`Location: ${exhibition.location}`}
                          </Typography>
                        </CardContent>
                      </Grid>

                      <Grid item xs={12} md={2}>
                        <CardActions sx={{ py: 2 }}>
                          <Button
                            disabled={dayjs().isAfter(
                              dayjs.utc(exhibition.dateTo).local()
                            )}
                            endIcon={<ArrowForwardIcon />}
                            component={Link}
                            to={`/exhibitions/${exhibition._id}/tickets`}
                            variant="contained"
                            sx={{
                              m: "auto"
                            }}
                          >
                            Tickets
                          </Button>
                        </CardActions>
                      </Grid>
                    </Grid>
                  </Card>
                ))}
                <Pagination
                  page={page}
                  onChange={this.handlePageChange}
                  count={totalPage}
                  shape="rounded"
                  variant="outlined"
                  color="primary"
                  sx={{
                    width: "max-content",
                    m: "auto"
                  }}
                />
              </>
            ) : (
              <Typography variant="body2">0 matching results.</Typography>
            )}
          </Box>
        </Container>
      </Box>
    );
  }
}

export default Exhibitions;
