import { lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Header } from "../app/components/Header";
import { AuthLayout } from "../app/components/AuthLayout";

const Main = lazy(() => import('../modules/Main'));
const Login = lazy(() => import('../modules/Login'));
const Registration = lazy(() => import('../modules/Registration'));
const Details = lazy(() => import('../modules/Details'));
const CreatePost = lazy(() => import('../modules/CreatePost'));
const Users = lazy(() => import('../modules/Users'));
const Edit = lazy(() => import('../modules/Edit'));

export enum ERoutes {
    home = '/',
    details = '/details/:id',
    login = '/auth/login',
    registration = '/auth/registration',
    create = '/create',
    edit = '/edit',
    users = '/users',
}

const routeConfig = [
    { path: ERoutes.home, component: Main, exact: true },
    { path: ERoutes.create, component: CreatePost, exact: true },
    { path: ERoutes.details, component: Details, exact: true },
    { path: ERoutes.users, component: Users, exact: true },
    { path: ERoutes.edit, component: Edit, exact: true },
];

export const Routes = () =>
    <Switch>
        <Route path='/auth'>
            <AuthLayout>
                <Switch>
                    <Route
                        path={ERoutes.registration}
                        component={Registration}
                    />
                    <Route path={ERoutes.login} component={Login} />
                </Switch>
            </AuthLayout>
        </Route>
        <Route path='/'>
            <Header />
            {routeConfig.map((route, index) => <Route {...route} key={index} />)}
        </Route>
        <Redirect to='/' />
    </Switch>;
