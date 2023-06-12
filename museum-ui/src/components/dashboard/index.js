import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { selectUser } from "@features/userSlice";
import { withAuth } from "@tools/func";

const Dashboard = () => {
  const user = useSelector(selectUser);
  return (
    <Container maxWidth="xs" sx={{ pt: 2 }}>
      <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2}>
        <Box gridColumn="span 4">
          <Typography align="center" variant="h6">
            {`Hello, ${user?.username}`}
          </Typography>
        </Box>
        <Box gridColumn="span 2" justifySelf="flex-end">
          <Button
            startIcon={<ArrowBackIcon />}
            component={Link}
            to="/exhibitions"
          >
            Exhibitions
          </Button>
        </Box>
        <Box gridColumn="span 2">
          <Button endIcon={<ArrowForwardIcon />} component={Link} to="/orders">
            Order History
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default withAuth(Dashboard);
