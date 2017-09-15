import asyncRoute from 'lib/asyncRoute';

export const Home = asyncRoute(() => import('./Home'));
export const Login = asyncRoute(() => import('./Login'));
export const Register = asyncRoute(() => import('./Register'));
export const Write = asyncRoute(() => import('./Write'));
export const NoMatch = asyncRoute(() => import('./NoMatch'));