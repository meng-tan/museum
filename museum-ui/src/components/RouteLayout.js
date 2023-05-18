import { useContext } from "react";
import { Outlet } from "react-router-dom";

import Box from "@mui/material/Box";

import { HeaderContext } from "@tools/Context";

export default function RouteLayout() {
  const headerHeight = useContext(HeaderContext);

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
