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
    href: "/sections/dashboard",
  },
  {
    navlabel: true,
    subheader: "MANAGEMENT",
  },
  {
    id: uniqueId(),
    title: "Clients",
    icon: IconUsers,
    href: "/sections/clients",
  },
  {
    id: uniqueId(),
    title: "Sales",
    icon: IconUserCheck,
    href: "/sections/sales",
  },
  {
    id: uniqueId(),
    title: "Meetings",
    icon: IconCalendar,
    href: "/sections/meetings",
  },
  {
    navlabel: true,
    subheader: "ACCOUNT",
  },
  {
    id: uniqueId(),
    title: "Profile",
    icon: IconUser,
    href: "/sections/profile",
  },
];

export default Menuitems;


