import Home from "~/Pages/Home/Home";
import Explore from "~/Pages/Search/Explore";
import Favorites from "~/Pages/Favorites/Favorites";
import Ticket from "~/Pages/Ticket/Ticket";
import Profile from "~/Pages/Profile/Profile";
import Login from "~/Components/AuthForm/Login/Login";
import MenuModalItem from "~/Components/AuthForm/MenuModalItem/MenuModalItem";
import config from "~/config";
import Register from "~/Components/AuthForm/Register/Register";
import SelectLocal from "~/Components/SelectLocal/SelectLocal";
import TicketDetail from "~/Components/TicketDetail/TicketDetail";
import GetTicket from "~/Components/GetTicket/GetTicket";
import DetailOrder from "~/Components/DetailOrder/DetailOrder.";
import BarCodePage from "~/Components/BarCodePage/BarCodePage";
import QrCodePage from "~/Components/QrCodePage/QrCodePage";


const publicRoutes = [
    {path: config.routes.home, component: Home, requireAuth: true},
    {path: config.routes.search, component: Explore},
    {path: config.routes.favorites, component: Favorites},
    {path: config.routes.ticket, component: Ticket},
    {path: config.routes.profile, component: Profile},
    {path: config.routes.register, component: Register, layout : null , requireAuth: false},
    {path: config.routes.login, component: Login, layout : null},
    {path: config.routes.menulogin, component: MenuModalItem, layout : null},
    {path: config.routes.selectlocal, component: SelectLocal, layout : null},
    {path: config.routes.detail_ticket, component: TicketDetail, layout : null},
    {path: config.routes.get_ticket, component: GetTicket, layout : null},
    {path: config.routes.detail_order, component: DetailOrder, layout : null},
    {path: config.routes.barcodepage, component: BarCodePage, layout : null},
    {path: config.routes.qrcodepage, component: QrCodePage, layout : null},
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
