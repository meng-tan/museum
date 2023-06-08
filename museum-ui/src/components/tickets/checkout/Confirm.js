import { Link } from "react-router-dom";

import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

export default function Confirm(props) {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Thank you for your order.
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Your order number is{" "}
        <Chip
          label={` #${props.exhibitionOrder?._id}`}
          component={Link}
          to="/orders"
          clickable
        />
      </Typography>
    </>
  );
}
