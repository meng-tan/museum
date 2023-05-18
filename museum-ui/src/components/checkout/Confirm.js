import { Link } from "react-router-dom";

import Typography from "@mui/material/Typography";

export default function Confirm(props) {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Thank you for your order.
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Your order number is #
        <Link to="/orders">{props.exhibitionOrder._id}</Link>.
      </Typography>
    </>
  );
}
