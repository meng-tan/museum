import { Fragment } from "react";

import { css } from "@emotion/react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { APP } from "@tools/constant";

const number = css({
  fontWeight: "bold",
  fontSize: "1.4rem"
});
const borderBottom = css({
  borderBottom: "1px solid #77CCE9"
});

const data = [
  { name: "Paintings", amount: 1000, y: 25.97 },
  { name: "Sculptures", amount: 600, y: 15.58 },
  { name: "Furniture", amount: 200, y: 5.19 },
  { name: "Textiles", amount: 100, y: 2.6 },
  { name: "Silver", amount: 300, y: 7.79 },
  { name: "Ceramics", amount: 400, y: 10.39 },
  { name: "Rare books", amount: 500, y: 12.99 },
  { name: "Archival objects", amount: 750, y: 19.48 }
];
export default function Collection() {
  const options = {
    chart: {
      backgroundColor: "transparent"
    },
    title: {
      text: ""
    },

    series: [
      {
        type: "pie",
        name: "Percentage",
        data
      }
    ]
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Box
        sx={{
          px: 1,
          pt: 4,
          pb: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
          bgcolor: "#E6E6FB",
          clipPath:
            "polygon(100% 0%, 0% 0% , 0.00% 93.75%, 2.00% 93.64%, 4.00% 93.31%, 6.00% 92.78%, 8.00% 92.06%, 10.00% 91.17%, 12.00% 90.16%, 14.00% 89.05%, 16.00% 87.89%, 18.00% 86.72%, 20.00% 85.57%, 22.00% 84.49%, 24.00% 83.52%, 26.00% 82.68%, 28.00% 82.02%, 30.00% 81.56%, 32.00% 81.30%, 34.00% 81.26%, 36.00% 81.45%, 38.00% 81.84%, 40.00% 82.44%, 42.00% 83.22%, 44.00% 84.15%, 46.00% 85.20%, 48.00% 86.33%, 50.00% 87.50%, 52.00% 88.67%, 54.00% 89.80%, 56.00% 90.85%, 58.00% 91.78%, 60.00% 92.56%, 62.00% 93.16%, 64.00% 93.55%, 66.00% 93.74%, 68.00% 93.70%, 70.00% 93.44%, 72.00% 92.98%, 74.00% 92.32%, 76.00% 91.48%, 78.00% 90.51%, 80.00% 89.43%, 82.00% 88.28%, 84.00% 87.11%, 86.00% 85.95%, 88.00% 84.84%, 90.00% 83.83%, 92.00% 82.94%, 94.00% 82.22%, 96.00% 81.69%, 98.00% 81.36%, 100.00% 81.25%)"
          //   clipPath: "polygon(0 0, 100% 0, 100% 80%, 0 100%)"
        }}
      >
        <Typography
          variant="h5"
          color="primary.light"
          textTransform="uppercase"
        >
          Collection
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            lineHeight: "2rem",
            width: "max(75%, 300px)"
          }}
        >
          {APP.NAME} collected and carefully displayed a collection comprised of
          more than <span css={number}>2600</span> paintings, sculptures,
          furniture, textiles, silver, ceramics, <span css={number}>500</span>{" "}
          rare books, and <span css={number}>750</span> archival objects from
          ancient Rome, Medieval Europe, Renaissance Italy, Asia, the Islamic
          world and 19th-century France and America.
        </Typography>
      </Box>

      <Grid
        container
        component={Paper}
        sx={{
          bgcolor: "#EAF5F9",
          borderRadius: "1rem",
          p: 2,
          m: 2,
          alignSelf: "center",
          width: {
            xs: "calc(100% - 16px)",
            md: "75%"
          }
        }}
      >
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Statistics
          </Typography>
          <Box
            display="grid"
            gridTemplateColumns={"repeat(2, 1fr)"}
            rowGap={2}
            alignItems={"end"}
          >
            {data.map((item) => (
              <Fragment key={item.name}>
                <Typography variant="body1" css={borderBottom}>
                  {item.name}
                </Typography>
                <Typography
                  variant="h6"
                  textAlign={"right"}
                  //   justifySelf={"end"}
                  css={borderBottom}
                >
                  {item.amount}
                </Typography>
              </Fragment>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </Grid>
      </Grid>
    </Box>
  );
}
