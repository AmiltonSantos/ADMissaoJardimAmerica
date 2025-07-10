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
        path: "https://www.instagram.com/admissaojardimamerica/",
        newTab: false,
      },
      {
        id: 42,
        title: "YouTube",
        path: "https://www.youtube.com/@assembleiadedeusmissao-jar3253",
        newTab: true,
      },
      {
        id: 43,
        title: "Facebook",
        path: "https://www.facebook.com/admissaojardimamerica/?locale=pt_BR",
        newTab: true,
      }
    ],
  },
];
export default menuData;
