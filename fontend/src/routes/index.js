import Home from '~/Pages/Home/Home';
import Singer from '~/Pages/Singer/Singer';
import Login from '~/Pages/Login/Login';
import NotFound from '~/Pages/404NotFound/404NotFound';
import Admin from '~/Pages/Admin/Admin';
import AdminSlider from '~/Pages/AdminSlider/AdminSlider';
import AdminTopics from '~/Pages/AdminTopics/AdminTopics';
import AdminNation from '~/Pages/AdminNation/AdminNation';
import AdminCategory from '~/Pages/AdminCategory/AdminCategory';
import AdminSinger from '~/Pages/AdminSinger/AdminSinger';
import AdminMusic from '~/Pages/AdminMusic/AdminMusic';
import UserPage from '~/Pages/UserPage/UserPage';
import SingerMusic from '~/Pages/SingerMusic/SingerMusic';

export const publicRouter = [
    { path: '/', component: Home },
    { path: '/login', component: Login, layout: null },
    { path: '/error', component: NotFound, layout: null },
    { path: '/singer/:id', component: Singer },
    { path: '/singer/:id/song', component: SingerMusic },
];
export const userRouter = [{ path: '/user', component: UserPage }];
export const adminRouter = [
    { path: '/admin', component: Admin },
    { path: '/admin/slider', component: AdminSlider },
    { path: '/admin/topics', component: AdminTopics },
    { path: '/admin/nation', component: AdminNation },
    { path: '/admin/category', component: AdminCategory },
    { path: '/admin/singer', component: AdminSinger },
    { path: '/admin/music', component: AdminMusic },
];
