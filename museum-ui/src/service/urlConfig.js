const urlConfig = {
  listExhibitions: "/exhibitions",
  getExhibition: (id) => `/exhibitions/${id}`,
  register: "/register",
  login: "/login",
  googleAuth: "/google-auth",
  listPayments: "/payments",
  getPayment: (id) => `/payments/${id}`,
  buyTickets: "/exhibitions/buy-tickets",
  listExhibitionOrders: "/exhibition-orders"
};

export default urlConfig;
