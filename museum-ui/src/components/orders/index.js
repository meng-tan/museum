import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";

import {
  Container,
  Chip,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography
} from "@mui/material";
import dayjs from "dayjs";
import debounce from "lodash/debounce";

import { thunkedCloseMask, thunkedOpenMask } from "@features/maskSlice";
import axiosInstance from "@service/axiosInstance";
import urlConfig from "@service/urlConfig";
import { withAuth } from "@tools/func";

function Orders() {
  const [hasNext, setHasNext] = useState(true);
  const [page, setPage] = useState(0); // current page

  const [orders, setOrders] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  const listContainer = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    axiosInstance
      .get(urlConfig.listExhibitionOrders, {
        params: {
          page
        }
      })
      .then(({ totalPage: pages, exhibitionOrders }) => {
        if (pages === 0) {
          setHasNext(false);
        } else if (exhibitionOrders.length) {
          setTotalPage(pages);
          setOrders((prevOrders) => prevOrders.concat(exhibitionOrders));
        }
      })
      .finally(() =>
        setTimeout(() => {
          dispatch(thunkedCloseMask());
        }, 1000)
      );
  }, [page, dispatch]);

  useEffect(() => {
    const handleNextPage = debounce(() => {
      const scrollHeight = listContainer.current.scrollHeight;
      const { scrollTop, clientHeight } = document.documentElement;
      // 60px is about to header height
      const marginToFooter = scrollHeight + 60 - (scrollTop + clientHeight);
      if (marginToFooter <= 0) {
        dispatch(
          thunkedOpenMask({
            msg: "Loading More..."
          })
        );
        setPage((page) => page + 1);
      }
    }, 1000);
    if (hasNext) {
      window.addEventListener("scroll", handleNextPage);
    } else {
      window.removeEventListener("scroll", handleNextPage);
    }
    return () => {
      window.removeEventListener("scroll", handleNextPage);
    };
  }, [hasNext, dispatch]);

  useEffect(() => {
    if (page + 1 === totalPage) {
      setHasNext(false);
    }
  }, [page, totalPage]);

  return (
    <Container
      maxWidth="md"
      ref={listContainer}
      sx={{
        py: {
          xs: 2,
          md: 3
        }
      }}
    >
      {orders.length ? (
        <>
          {orders.map((order) => (
            <Paper
              elevation={3}
              key={order._id}
              sx={{
                p: {
                  xs: 1,
                  md: 2
                },
                mb: {
                  xs: 2,
                  md: 3
                }
              }}
            >
              <Grid container alignItems="baseline">
                <Grid item xs={12} md={6}>
                  <Typography variant="caption" gutterBottom component={"p"}>
                    Order Number: #{order._id}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="body2"
                    gutterBottom
                    color="textSecondary"
                    textAlign={{ md: "right" }}
                  >
                    Placed Time:{" "}
                    {dayjs(order.placedTime).format("MMMM D YYYY, h:mm:ss a")}
                  </Typography>
                </Grid>
              </Grid>

              <Divider />
              <List disablePadding dense>
                <ListItem>
                  <ListItemText primary={order.exhibitionTitle} />
                </ListItem>
                {Object.keys(order.tickets).map((key) => (
                  <ListItem key={`${order._id}-${key}`}>
                    <ListItemText secondary={key} />
                    <Typography variant="body2" color="textSecondary">
                      ${order.tickets[key].price} * {order.tickets[key].amount}
                    </Typography>
                  </ListItem>
                ))}
                <ListItem>
                  <ListItemText />
                  <Typography variant="subtitle1">
                    Total: ${order.total}
                  </Typography>
                </ListItem>
              </List>
            </Paper>
          ))}
          {!hasNext && (
            <Divider>
              <Chip label="No more orders" />
            </Divider>
          )}
        </>
      ) : (
        <Divider>
          <Chip label="You haven't placed any orders yet." />
        </Divider>
      )}
    </Container>
  );
}

export default withAuth(Orders);
