import { Link, useNavigate } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="xs" sx={{ pt: 2 }}>
      <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2}>
        <Box gridColumn="span 4">
          <Typography align="center" variant="h6">
            Page Not Found
          </Typography>
        </Box>
        <Box gridColumn="span 2" justifySelf="flex-end">
          <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </Box>
        <Box gridColumn="span 2">
          <Button
            endIcon={<ArrowForwardIcon />}
            component={Link}
            to="/"
            replace={true}
          >
            Go Home
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
