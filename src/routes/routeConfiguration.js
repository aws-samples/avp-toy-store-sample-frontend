import { createBrowserRouter, Navigate } from 'react-router-dom';

import ListOrders from "./listOrders";
import Order from "./order";
import Home from "./home";
import RoleManagement from './roleManagement';
import {stores} from '../components/Layout';

export const ROUTEMAP = {
    home: '/store/:storeId/home',
    listOrders: 'store/:storeId/orders',
    order: 'store/:storeId/order/:orderId',
    roleManagement: 'store/:storeId/roleManagement',
};

export const router = createBrowserRouter(
    [
        {
            path: ROUTEMAP.home,
            element: <Home />,
        },
        {
            path: ROUTEMAP.order,
            element: <Order />,
        },
        {
            path: ROUTEMAP.listOrders,
            element: <ListOrders />,
        },
        {
            path: ROUTEMAP.roleManagement,
            element: <RoleManagement />,
        },
        {
            path: '/',
            element: <Navigate to={"/store/"+ stores[0] +"/home"} /> ,
        }
    ],
    {
        basename: '/',
    }
);