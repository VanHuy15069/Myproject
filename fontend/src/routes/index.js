import Home from '~/Pages/Home/Home';
import Login from '~/Pages/Login/Login';
import NotFound from '~/Pages/404NotFound/404NotFound';
import Admin from '~/Pages/Admin/Admin';
import AdminSlider from '~/Pages/AdminSlider/AdminSlider';
import AdminTopics from '~/Pages/AdminTopics/AdminTopics';
import AdminNation from '~/Pages/AdminNation/AdminNation';
import AdminCategory from '~/Pages/AdminCategory/AdminCategory';
import AdminSinger from '~/Pages/AdminSinger/AdminSinger';

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
    { path: '/admin/nation', component: AdminNation },
    { path: '/admin/category', component: AdminCategory },
    { path: '/admin/singer', component: AdminSinger },
];
