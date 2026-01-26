import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Page404 } from './pages/page404/page404';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: Page404 },
];
