import {
  MdDashboard,
  MdLock,
  MdPerson,
  MdShoppingCart,
  MdEmail,
  MdNotifications,
  MdSettings,
  MdOutlinePages,
  MdAddAlert,
  MdPhotoAlbum,
  MdMouse,
  MdColorize,
  MdPieChart,
  MdDocumentScanner,
  MdMenuBook,
} from "react-icons/md";
import { GiOverInfinity } from "react-icons/gi";
import { IoDocumentText } from "react-icons/io5";
import { AiOutlineFontSize } from "react-icons/ai";
import { BsTable, BsLayers } from "react-icons/bs";
import { VscOpenPreview } from "react-icons/vsc";

export const navMasterData = [
  {
    Icon: MdDashboard,
    title: "Dashboard",
    details: ["Dashboard", "Analytics", "CRM"],
    items: "",
    note: "",
  },
  {
    Icon: MdLock,
    title: "Authentication",
    details: ["Login", "Registration", "Forget Password"],
    items: "",
    note: "",
  },
  {
    Icon: MdPerson,
    title: "Users",
    details: ["User List", "User Profile", "My Account"],
    items: "",
    note: "HOT",
  },
  {
    Icon: GiOverInfinity,
    title: "Products",
    details: ["Product List", "Product View", "Product Upload"],
    items: "",
    note: "NEW",
  },
  {
    Icon: IoDocumentText,
    title: "Invoices",
    details: ["Invoice List", "Invoice Details"],
    items: "",
    note: "",
  },
  {
    Icon: MdShoppingCart,
    title: "Orders",
    details: [],
    items: "05",
    note: "",
  },
  {
    Icon: MdEmail,
    title: "Messages",
    details: [],
    items: "03",
    note: "",
  },
  {
    Icon: MdNotifications,
    title: "Notification",
    details: [],
    items: "9+",
    note: "",
  },
  {
    Icon: MdSettings,
    title: "Settings",
    details: [],
    items: "",
    note: "",
  },
  {
    Icon: MdOutlinePages,
    title: "Black Page",
    details: [],
    items: "",
    note: "",
  },
];

export const navBlocksData = [
  {
    Icon: MdAddAlert,
    title: "Alerts",
    details: [],
    items: "",
    note: "",
  },
  {
    Icon: MdPhotoAlbum,
    title: "Avatars",
    details: [],
    items: "",
    note: "",
  },
  {
    Icon: AiOutlineFontSize,
    title: "Headings",
    details: [],
    items: "",
    note: "",
  },
  {
    Icon: MdMouse,
    title: "Buttons",
    details: [],
    items: "",
    note: "",
  },
  {
    Icon: MdColorize,
    title: "Colors",
    details: [],
    items: "",
    note: "",
  },
  {
    Icon: MdPieChart,
    title: "Charts",
    details: [],
    items: "",
    note: "",
  },
  {
    Icon: MdDocumentScanner,
    title: "Fields",
    details: [],
    items: "",
    note: "",
  },
  {
    Icon: BsTable,
    title: "Tables",
    details: [],
    items: "",
    note: "",
  },
];

export const navSupportsData = [
  {
    Icon: VscOpenPreview,
    title: "Overview",
    details: [],
    items: "",
    note: "",
  },
  {
    Icon: MdMenuBook,
    title: "Documentation",
    details: [],
    items: "",
    note: "",
  },
  {
    Icon: BsLayers,
    title: "Change Log",
    details: [],
    items: "",
    note: "",
  },
];
