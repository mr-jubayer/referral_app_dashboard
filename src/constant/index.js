import { IconDashboard, IconTree } from "@tabler/icons-react";

const navList = [
  {
    title: "Overview",
    url: "/",
    icon: IconDashboard,
  },
  {
    title: "Manage Users",
    url: "/users",
    icon: IconTree,
  },
  {
    title: "Referral Tree",
    url: "/referral-tree",
    icon: IconTree,
  },
  {
    title: "Deposits",
    url: "/deposits",
    icon: IconTree,
  },
  {
    title: "Withdrawn",
    url: "/withdrawn",
    icon: IconTree,
  },
];

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODljMzE0ZWY5MTAxZTQ4YWE0YzA4ODEiLCJ1c2VybmFtZSI6InRlc3RhZG1pbiIsImlhdCI6MTc1NTA2NjcwMiwiZXhwIjoxNzU1MTUzMTAyfQ.mEEJFgkoH6d-1fSH1LKmhVHjiKIFalmxRVQ654ad8f8";

export { navList, token };
