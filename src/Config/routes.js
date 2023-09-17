import { Login } from '../Pages/Login';
import { Home } from '../Pages/Home';
import { Faqs } from '../Pages/Faqs';
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
import { Privacy } from '../Pages/Privacy';

const routes = [
    {
        title: 'UserVerificated',
        path: '/UserVerificated',
        component: UserVerificated,
    },
    {
        title: 'Relation',
        path: '/Relation',
        component: Relation,
    },
    {
        title: 'UserNoVerificated',
        path: '/UserNoVerificated',
        component: UserNoVerificated,
    },
    {
        title: 'Banks',
        path: '/Banks',
        component: Banks,
    },
    {
        title: 'CurrencyUpdate',
        path: '/CurrencyUpdate',
        component: CurrencyUpdate,
    },
    {
        title: 'AdmRe',
        path: '/AdmRe',
        component: AdmRe,
    },
    {
        title: 'Movements',
        path: '/Movements',
        component: Movements,
    },
    {
        title: 'Dashboard',
        path: '/Dashboard',
        component: Dashboard,
    },
    {
        title: 'Users',
        path: '/Users',
        component: Users,
    },
    {
        title: 'Faqs',
        path: '/Faqs',
        component: Faqs,
    },
    {
        title: 'Profile',
        path: '/Profile',
        component: Profile,
    },
    {
        title: 'Changes',
        path: '/Changes',
        component: Changes,
    },
    {
        title: 'Recover',
        path: '/Recover',
        component: Recover,
    },
    {
        title: 'Register',
        path: '/Register',
        component: Register,
    },
    {
        title: 'Login',
        path: '/Login',
        component: Login,
    },
    {
        title: 'Privacy',
        path: '/Privacy',
        component: Privacy,
    },
    {
        title: '',
        path: '/',
        component: Home,
    }
]

export default routes;