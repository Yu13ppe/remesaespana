import { Login } from '../Pages/Login';
import { Home } from '../Pages/Home';
import { Faqs } from '../Pages/Faqs';
import { Verification } from '../Pages/Verification';
import { Recover } from '../Pages/Recover';
import { Register } from '../Pages/Register';
import { Changes } from '../Pages/Changes';
import { Profile } from '../Pages/Profile';
import { AdmRe } from '../Pages/AdmRe';
import { Users } from '../Pages/Users';

const routes = [
    {
        title: 'AdmRe',
        path: '/AdmRe',
        component: AdmRe,
        exact: true
    },
    {
        title: 'Users',
        path: '/Users',
        component: Users,
        exact: true
    },
    {
        title: 'Faqs',
        path: '/Faqs',
        component: Faqs,
        exact: true
    },
    {
        title: 'Profile',
        path: '/Profile',
        component: Profile,
        exact: true
    },
    {
        title: 'Changes',
        path: '/Changes',
        component: Changes,
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
        title: 'Map',
        path: '/',
        component: Home,
        exact: true
    }
]

export default routes;