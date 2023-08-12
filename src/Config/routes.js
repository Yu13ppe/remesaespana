import { Login } from '../Pages/Login';
import { Home } from '../Pages/Home';
import { Faqs } from '../Pages/Faqs';
import { Verification } from '../Pages/Verification';
import { Recover } from '../Pages/Recover';
import { Register } from '../Pages/Register';
import { Profile } from '../Pages/Profile';

const routes = [
    {
        title: 'Profile',
        path: '/Profile',
        component: Profile,
        exact: true
    },
    {
        title: 'Faqs',
        path: '/Faqs',
        component: Faqs,
        exact: true
    },
    {
        title: 'Verification',
        path: '/Verification',
        component: Verification,
        exact: true
    },
    {
        title: 'Recover',
        path: '/Recover',
        component: Recover,
        exact: true
    },
    {
        title: 'Register',
        path: '/Register',
        component: Register,
        exact: true
    },
    {
        title: 'Login',
        path: '/Login',
        component: Login,
        exact: true
    },
    {
        title: 'Home',
        path: '/',
        component: Home,
        exact: true
    }
]

export default routes;