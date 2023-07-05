import { Routes, Route, Navigate } from 'react-router-dom';
import { publicRouter, adminRouter } from './routes';
import DefaultLayout from './layout/DefaultLayout/DefaultLayout';
import { Fragment } from 'react';
import AdminLayout from './layout/AdminLayout/AdminLayout';
function App() {
    const user = JSON.parse(localStorage.getItem('user'));
    let admin = false;
    if (user) {
        admin = user.isAdmin;
    }
    return (
        <div className="App">
            <Routes>
                {publicRouter.map((route, index) => {
                    const Layout = route.layout === null ? Fragment : DefaultLayout;
                    const Page = route.component;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
                {adminRouter.map((route, index) => {
                    const Page = route.component;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                admin ? (
                                    <AdminLayout>
                                        <Page />
                                    </AdminLayout>
                                ) : (
                                    <Navigate to={'/login'} />
                                )
                            }
                        />
                    );
                })}
            </Routes>
        </div>
    );
}

export default App;
