import asyncRoute from 'lib/asyncRoute';

export const Home = asyncRoute(() => import('./Home/Home'));
export const Personal = asyncRoute(() => import('./Personal/Personal'));

export const Login = asyncRoute(() => import('./Auth/Login'));
export const Register = asyncRoute(() => import('./Auth/Register'));

/* 스크랩 */
export const Scrap = asyncRoute(() => import('./Scrap/Scrap'));
export const ScrapList = asyncRoute(() => import('./Scrap/List'));
export const ScrapWrite = asyncRoute(() => import('./Scrap/Write'));

/* 발자국 */
export const Review = asyncRoute(() => import('./Review/Review'));
export const ReviewList = asyncRoute(() => import('./Review/List'));
export const ReviewWrite = asyncRoute(() => import('./Review/Write'));

export const NoMatch = asyncRoute(() => import('./Common/NoMatch'));