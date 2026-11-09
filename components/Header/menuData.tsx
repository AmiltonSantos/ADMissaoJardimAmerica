import { REDES } from "@/lib/igreja";
import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Inicio",
    path: "/",
    newTab: false,
  },
  {
    id: 16,
    title: "Nossa História",
    path: "/historia",
    newTab: false,
  },
  {
    id: 2,
    title: "Ofertar",
    path: "/ofertar",
    newTab: false,
  },
  {
    id: 33,
    title: "Programação",
    path: "/programacao",
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
        path: REDES.instagram,
        newTab: true,
      },
      {
        id: 42,
        title: "YouTube",
        path: REDES.youtube,
        newTab: true,
      },
      {
        id: 43,
        title: "Facebook",
        path: REDES.facebook,
        newTab: true,
      },
    ],
  },
];
export default menuData;
