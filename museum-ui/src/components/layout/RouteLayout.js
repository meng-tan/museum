import { Outlet, useOutletContext } from "react-router-dom";

import Box from "@mui/material/Box";

export function RouteLayout() {
  const headerHeight = useOutletContext();
  return (
    <Box
      component="main"
      sx={{
        marginTop: `${headerHeight}px`,
        minHeight: `max(500px, calc(100vh - ${headerHeight}px))`
      }}
    >
      <Outlet />
    </Box>
  );
}
