import { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";

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
import dayjs, { extend } from "dayjs";
import utc from "dayjs/plugin/utc";

import axiosInstance from "@service/axiosInstance";
import urlConfig from "@service/urlConfig";

extend(utc);

export const Exhibitions = () => {
  const [query, setQuery] = useOutletContext();

  const [dateError, setDateError] = useState(" ");

  const [res, setRes] = useState({
    totalPage: 0,
    exhibitions: []
  });

  const listExhibitions = ({ page, date }) => {
    axiosInstance
      .get(urlConfig.listExhibitions, {
        params: {
          page,
          date: date && dayjs(date).utc().format("YYYY-MM-DD")
        }
      })
      .then(({ exhibitions, totalPage }) => {
        setRes({
          exhibitions,
          totalPage
        });
      })
      .finally(() => {
        document.documentElement.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
      });
  };

  const handlePageChange = (event, value) => {
    setQuery((prev) => ({
      ...prev,
      page: value
    }));
  };

  const validateDate = (newError) => {
    let dateError;
    switch (newError) {
      case "disablePast":
        dateError = "Please select a future date";
        break;
      case "invalidDate":
        dateError = "Invalid Date";
        break;
      default:
        dateError = " ";
    }
    setDateError(dateError);
  };

  const changeDate = (date, context) => {
    if (context.validationError == null) {
      setQuery({
        date: date && dayjs(date).format("YYYY-MM-DD"), // date could be null
        page: 1
      });
    }
  };

  useEffect(() => {
    listExhibitions(query);
  }, [query]);

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
          value={query.date && dayjs(query.date)}
          disablePast={true}
          onError={validateDate}
          slotProps={{
            textField: {
              helperText: dateError
            }
          }}
          onChange={changeDate}
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
          {res.exhibitions.length ? (
            <>
              {res.exhibitions.map((exhibition) => (
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
                        <Typography variant="subtitle2">
                          {`Duration: ${dayjs
                            .utc(exhibition.dateFrom)
                            .local()
                            .format("YYYY/MM/DD")} ~ ${dayjs
                            .utc(exhibition.dateTo)
                            .local()
                            .format("YYYY/MM/DD")}`}
                        </Typography>
                        <Typography variant="subtitle2">
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
                page={query.page}
                onChange={handlePageChange}
                count={res.totalPage}
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
            <Typography variant="body2">No exhibitions found.</Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
};
