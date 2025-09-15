import {
  IconCalendar,
  IconLayoutDashboard,
  IconUser,
  IconUserCheck,
  IconUsers,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "MAIN",
  },
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/dashboard",
  },
  {
    navlabel: true,
    subheader: "MANAGEMENT",
  },
  {
    id: uniqueId(),
    title: "Clients",
    icon: IconUsers,
    href: "/dashboard/clients",
  },
  {
    id: uniqueId(),
    title: "Sales",
    icon: IconUserCheck,
    href: "/dashboard/sales",
  },
  {
    id: uniqueId(),
    title: "Meetings",
    icon: IconCalendar,
    href: "/dashboard/meetings",
  },
  {
    navlabel: true,
    subheader: "ACCOUNT",
  },
  {
    id: uniqueId(),
    title: "Profile",
    icon: IconUser,
    href: "/dashboard/profile",
  },
];

export default Menuitems;


