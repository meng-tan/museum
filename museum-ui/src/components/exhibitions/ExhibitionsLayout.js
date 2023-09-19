import { useState } from "react";
import { Outlet } from "react-router-dom";

import { Box } from "@mui/material";

export const ExhibitionsLayout = () => {
  const [query, setQuery] = useState({
    date: null,
    page: 1
  });

  return (
    <Box bgcolor="beige" minHeight="inherit">
      <Outlet context={[query, setQuery]} />
    </Box>
  );
};
