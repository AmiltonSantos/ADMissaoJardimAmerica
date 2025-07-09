import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Inicio",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "Ofertar",
    path: "/about",
    newTab: false,
  },
  {
    id: 33,
    title: "Programação",
    path: "/blog",
    newTab: false,
  },
  {
    id: 3,
    title: "Como chegar",
    path: "/location",
    newTab: false,
  },
  {
    id: 4,
    title: "Redes Sociais",
    newTab: false,
    submenu: [
      {
        id: 41,
        title: "Instagram",
        path: "/about",
        newTab: false,
      },
      {
        id: 42,
        title: "YouTube",
        path: "/location",
        newTab: false,
      },
      {
        id: 43,
        title: "Facebook",
        path: "/blog",
        newTab: false,
      }
    ],
  },
];
export default menuData;
