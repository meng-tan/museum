import { Outlet, useOutletContext } from "react-router-dom";

import Box from "@mui/material/Box";

export default function RouteLayout() {
  const headerHeight = useOutletContext();

  return (
    <Box
      sx={{
        marginTop: `${headerHeight}px`,
        minHeight: `calc(100vh - ${headerHeight}px)`
      }}
    >
      <Outlet />
    </Box>
  );
}
