import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
// Required components for which route services to be activated
import { SignInComponent } from './components/sign-in/sign-in.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
// Import canActivate guards
import { AuthGuard } from './shared/auth.guard';
import { SecureInnerPagesGuard } from './shared/secure-inner-pages.guard';
// Include route guard in routes array

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },

  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
  },

  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule),
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./verify-email/verify-email.module').then( m => m.VerifyEmailPageModule),
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule),
  },
  {
    path: 'novoservico',
    loadChildren: () => import('./novoservico/novoservico.module').then( m => m.NovoservicoPageModule),
  },
  {
    path: 'historico',
    loadChildren: () => import('./historico/historico.module').then( m => m.HistoricoPageModule),
  },

  {
    path: 'user-profile',
    loadChildren: () => import('./components/user-profile/user-profile.component').then( m => m.UserProfileComponent),
  },
  
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule),
  },
  {
    path: 'confirmaservico',
    loadChildren: () => import('./confirmaservico/confirmaservico.module').then( m => m.ConfirmaservicoPageModule)
  },  {
    path: 'mural',
    loadChildren: () => import('./mural/mural.module').then( m => m.MuralPageModule)
  },
  {
    path: 'novomural',
    loadChildren: () => import('./novomural/novomural.module').then( m => m.NovomuralPageModule)
  }





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
