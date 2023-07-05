import Home from '~/Pages/Home/Home';
import Login from '~/Pages/Login/Login';
import NotFound from '~/Pages/404NotFound/404NotFound';
import Admin from '~/Pages/Admin/Admin';
import AdminSlider from '~/Pages/AdminSlider/AdminSlider';
import AdminTopics from '~/Pages/AdminTopics/AdminTopics';

export const publicRouter = [
    { path: '/', component: Home },
    { path: '/login', component: Login, layout: null },
    { path: '/error', component: NotFound, layout: null },
];
export const userRouter = [];
export const adminRouter = [
    { path: '/admin', component: Admin },
    { path: '/admin/slider', component: AdminSlider },
    { path: '/admin/topics', component: AdminTopics },
];
