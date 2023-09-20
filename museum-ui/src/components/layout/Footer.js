import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { APP } from "@tools/constant";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#bbdefb",
        pb: "2rem",
        boxShadow: "inset 0 0 5px 1px rgba(0, 0, 0, 0.3)"
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          pt: "2rem",
          pb: "1rem"
        }}
      >
        <Grid
          container
          columns={{ xs: 4, sm: 8, md: 12 }}
          spacing={{ xs: 3, md: 4 }}
        >
          <Grid item xs={4}>
            <Typography variant="overline">Address</Typography>
            <Typography component="address">
              1 Tech Valley Dr
              <br />
              Westford, MA 01886
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="overline">Hours</Typography>
            <Typography>Tuesday &ndash; Sunday, 10 am &ndash; 5 pm</Typography>
            <Typography>Friday, 10 am &ndash; 9 pm</Typography>
            <Typography>Closed Monday</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="overline" component="p">
              Contact
            </Typography>
            <Typography component="a" href="tel:857-250-0027">
              857-250-0027
            </Typography>
            <br />
            <Typography component="a" href="mailto:tanmeng.job@gmail.com">
              tanmeng.job@gmail.com
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Typography variant="body2" align="center">
        &copy; {`2019 - ${new Date().getFullYear()} ${APP.NAME}`}
      </Typography>
    </Box>
  );
}
