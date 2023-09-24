import { useState } from "react";
import { Outlet } from "react-router-dom";

export const ExhibitionsLayout = () => {
  const [query, setQuery] = useState({
    date: null,
    page: 1
  });

  return <Outlet context={[query, setQuery]} />;
};
