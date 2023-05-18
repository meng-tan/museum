import { Component } from "react";
import { Link } from "react-router-dom";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, CardHeader, Container, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Pagination from "@mui/material/Pagination";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { debounce } from "lodash";

import axiosInstance from "@service/axiosInstance";
import ExhibitionService from "@service/ExhibitionService";
import urlConfig from "@service/urlConfig";

import bg4 from "@img/archer.jpg";

class ExhibitionContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: null,
      page: 1,
      totalPage: 1,
      keywords: "",
      exhibitions: []
    };
    this.exhibitionService = ExhibitionService.getInstance();
  }

  componentDidMount() {
    this.findByDate(this.state.date, this.state.page);
    axiosInstance
      .get(urlConfig.listAll, {
        params: {
          ID: 12345
        }
      })
      .then((data) =>
        this.setState({
          exhibitions: data
          // totalPage:data.totalPage
        })
      )
      .catch((err) => console.log("err:", err));
  }

  findByDate = (date, page) => {
    this.exhibitionService.findByDate(date, page).then((res) => {
      this.setState({
        exhibitions: res.exhibitions,
        totalPage: res.totalPage
      });
    });
  };

  changeDate = (date) => {
    this.setState(
      {
        date: dayjs(date).format("YYYY-MM-DD"),
        page: 1
      },
      () => {
        this.findByDate(this.state.date, this.state.page);
      }
    );
  };

  handlePageChange = (event, value) => {
    this.setState(
      {
        page: value
      },
      () => {
        if (this.state.keywords.trim().length) {
          this.findByKeywords(this.state.keywords.trim(), this.state.page);
        } else {
          this.findByDate(this.state.date, this.state.page);
        }
      }
    );
  };

  findByKeywords = debounce((keywords, page) => {
    console.log("hit");

    this.exhibitionService.findByKeywords(keywords, page).then((res) => {
      this.setState({
        exhibitions: res.exhibitions,
        totalPage: res.totalPage
      });
    });
  }, 300);

  inputChange = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => {
        if (this.state.keywords.trim().length) {
          this.setState(
            {
              page: 1
            },
            () => {
              this.findByKeywords(this.state.keywords.trim(), this.state.page);
            }
          );
        } else {
          this.setState(
            {
              page: 1
            },
            () => {
              this.findByDate(
                dayjs(new Date()).format("YYYY-MM-DD"),
                this.state.page
              );
            }
          );
        }
      }
    );
  };

  render() {
    const { exhibitions, page, totalPage } = this.state;
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
          <Grid
            container
            spacing={{
              xs: 1
            }}
          >
            <Grid item xs={12} md={5}>
              <DatePicker
                value={this.state.date}
                onChange={this.changeDate}
                label="Filter by Month"
                views={["year", "month"]}
                openTo="month"
                disablePast
                // disabled
                format="MM-YYYY"
                sx={{
                  width: "100%"
                }}
              />
            </Grid>
            <Grid item xs={12} md={2} alignSelf="center">
              <Typography variant="overline" align="center" component="p">
                or
              </Typography>
            </Grid>
            <Grid item xs={12} md={5}>
              <TextField
                label="Search by Keywords"
                variant="outlined"
                fullWidth
                name="keywords"
                value={this.state.keywords}
                onChange={this.inputChange}
              />
            </Grid>
          </Grid>

          <Box
            sx={{
              mt: {
                xs: 2,
                md: 3
              }
            }}
          >
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
                          image={bg4}
                          // image={exhibition.imgUrl}
                          alt={exhibition.title}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <CardHeader title={exhibition.title} />
                        <CardContent>
                          <Typography variant="subtitle1">
                            {`Duration: ${dayjs(exhibition.dateFrom).format(
                              "YYYY/MM/DD"
                            )} ~ ${dayjs(exhibition.dateTo).format(
                              "YYYY/MM/DD"
                            )}`}
                          </Typography>
                          <Typography variant="subtitle1">
                            {`Location: ${exhibition.location}`}
                          </Typography>
                        </CardContent>
                      </Grid>

                      <Grid item xs={12} md={2}>
                        <CardActions>
                          <Button
                            disabled={
                              dayjs(new Date()) > dayjs(exhibition.dateTo)
                            }
                            endIcon={<ArrowForwardIcon />}
                            component={Link}
                            to={`/exhibitions/${exhibition._id}`}
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

export default ExhibitionContainer;
