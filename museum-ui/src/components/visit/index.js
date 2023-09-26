import { useEffect } from "react";

import { Loader } from "@googlemaps/js-api-loader";
import { Box, Container, Typography } from "@mui/material";

import { APP } from "@tools/constant";

import { config } from "../../config";

export default function Visit() {
  useEffect(() => {
    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey: config.mapsApiKey,
          version: "weekly"
        });
        const { Map } = await loader.importLibrary("maps");

        const position = { lat: 42.552, lng: -71.441 };

        const map = new Map(document.getElementById("map-container"), {
          center: position,
          zoom: 12,
          disableDefaultUI: true,
          gestureHandling: "cooperative",
          mapId: "MAP_ID"
        });
        const {
          // AdvancedMarkerElement,
          Marker,
          Animation
        } = await loader.importLibrary("marker");
        // eslint-disable-next-line no-unused-vars
        const marker = new Marker({
          map,
          position,
          title: APP.NAME,
          animation: Animation.DROP
        });
      } catch (error) {
        console.log(error);
      }
    };
    initMap();
  }, []);

  return (
    <Box
      sx={{
        display: "flex", // fix margin collapse
        flexFlow: "column"
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h4" color="primary.light" mt={3}>
          Getting Here
        </Typography>
      </Container>

      <Box
        id="map-container"
        sx={{
          mt: 1,
          height: "300px"
        }}
      />

      <Container
        maxWidth="md"
        sx={{
          py: "2rem",
          my: 2,
          background: "var(--bg-gray)"
        }}
      >
        <Typography variant="h6">Address</Typography>
        <Typography variant="body1">{APP.ADDRESS}</Typography>
        <Typography variant="subtitle2" mt={2}>
          Parking
        </Typography>
        <Typography variant="body2">
          {`The Museum parking garage, located at ${APP.ADDRESS}, is
          open 24 hours a day, seven days a week. A parking discount is
          available to Museum Members during Museum operating hours. To receive
          a discount, Museum Members must have their tickets validated at the
          Visitor Information Desk. For more information, please call
          ${APP.PHONE}.`}
        </Typography>
        <Typography variant="subtitle2" mt={2}>
          Subway
        </Typography>
        <Typography variant="body2">
          Travel on the A, B, C, and D subway lines
        </Typography>
        <Typography variant="subtitle2" mt={2}>
          Bus
        </Typography>
        <Typography variant="body2">Take the X, Y, or Z bus lines</Typography>
      </Container>

      <Container maxWidth="md">
        <Typography variant="h4" color="primary.light" mt={3}>
          Plan A Visit
        </Typography>
      </Container>

      <Container
        maxWidth="md"
        sx={{
          py: "2rem",
          my: 2,
          background: "var(--bg-gray)"
        }}
      >
        <Typography variant="h6" gutterBottom>
          Hours
        </Typography>
        <Typography variant="body1">
          Tuesday &ndash; Sunday, 10 am &ndash; 5 pm
        </Typography>
        <Typography variant="body1">Friday, 10 am &ndash; 9 pm</Typography>
        <Typography variant="body1">Closed Monday</Typography>
        <Typography variant="body2" mt={2}>
          Closed September 19, Thanksgiving Day, December 25, January 1, and the
          first Monday in May.
        </Typography>
      </Container>
    </Box>
  );
}
