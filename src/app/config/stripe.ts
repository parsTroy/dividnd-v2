import test from "node:test";

export const PLANS = [
  {
    name: "Free",
    slug: "free",
    positions: 10,
    price: {
      amount: 0,
      priceIds: {
        test: "",
        production: "",
      },
    },
  },
  {
    name: "Pro Monthly",
    slug: "pro-monthly",
    positions: 250,
    price: {
      amount: 9.99,
      priceIds: {
        test: "price_1P2dtHD3o6n9SJ96MVG41dEL",
        production: "",
      },
    },
  },
  // {
  //   name: "Pro Annual",
  //   slug: "pro-annual",
  //   positions: 200,
  //   price: {
  //     amount: 99.99,
  //     priceIds: {
  //       test: "price_1P2dtHD3o6n9SJ96ms377xRn",
  //       production: "",
  //     },
  //   },
  // },
  // {
  //   name: "Pro Lifetime",
  //   slug: "pro-lifetime",
  //   positions: 200,
  //   price: {
  //     amount: 499.99,
  //     priceIds: {
  //       test: "price_1P2dtHD3o6n9SJ96GbPs0Sm8",
  //       production: "",
  //     },
  //   },
  // },
];