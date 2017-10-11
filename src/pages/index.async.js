import asyncRoute from 'lib/asyncRoute';

export const Home = asyncRoute(() => import('./Home/Home'));

export const Login = asyncRoute(() => import('./Auth/Login'));
export const Register = asyncRoute(() => import('./Auth/Register'));

export const Scrap = asyncRoute(() => import('./Scrap/Scrap'));
export const Write = asyncRoute(() => import('./Scrap/Write'));

export const NoMatch = asyncRoute(() => import('./Common/NoMatch'));