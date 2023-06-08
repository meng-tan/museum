import { useState, useEffect } from "react";
import { Link, Outlet, useParams } from "react-router-dom";

import { Breadcrumbs, Container, Typography } from "@mui/material";

import axiosInstance from "@service/axiosInstance";
import urlConfig from "@service/urlConfig";

export const TicketsCheckoutLayout = () => {
  const { id } = useParams();

  const [exhibition, setExhibition] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(urlConfig.getExhibition(id))
      .then((data) => setExhibition(data));
  }, [id]);

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: "inherit",
        pb: 1
      }}
    >
      <Breadcrumbs
        py={{
          xs: 1,
          md: 2
        }}
      >
        <Link to="/exhibitions">Exhibitions</Link>
        <Typography
          color="textPrimary"
          component={Link}
          to={`/exhibitions/${id}/tickets`}
          reloadDocument={true}
        >
          {exhibition?.title}
        </Typography>
      </Breadcrumbs>

      <Outlet context={[exhibition]} />
    </Container>
  );
};
