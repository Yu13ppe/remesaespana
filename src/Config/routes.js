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
import { Dashboard } from '../Pages/Dashboard';
import { Movements } from '../Pages/Movements';
import { UserVerificated } from '../Pages/UserVerificated';
import { UserNoVerificated } from '../Pages/UserNoVerificated';
import { Relation } from '../Pages/Relation';
import { Banks } from '../Pages/Banks';
import { CurrencyUpdate } from '../Pages/CurrencyUpdate';

const routes = [
    {
        title: 'UserVerificated',
        path: '/UserVerificated',
        component: UserVerificated,
        exact: true
    },
    {
        title: 'Relation',
        path: '/Relation',
        component: Relation,
        exact: true
    },
    {
        title: 'UserNoVerificated',
        path: '/UserNoVerificated',
        component: UserNoVerificated,
        exact: true
    },
    {
        title: 'Banks',
        path: '/Banks',
        component: Banks,
        exact: true
    },
    {
        title: 'CurrencyUpdate',
        path: '/CurrencyUpdate',
        component: CurrencyUpdate,
        exact: true
    },
    {
        title: 'AdmRe',
        path: '/AdmRe',
        component: AdmRe,
        exact: true
    },
    {
        title: 'Movements',
        path: '/Movements',
        component: Movements,
        exact: true
    },
    {
        title: 'Dashboard',
        path: '/Dashboard',
        component: Dashboard,
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