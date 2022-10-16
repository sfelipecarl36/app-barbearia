import { NgModule } from '@angular/core';
import { Routes, RouterModule, ChildrenOutletContexts } from '@angular/router';
import 'firebase/firestore'; //Older Version
import 'firebase/compat/firestore'; //v9
import 'firebase/auth';
// import { AuthGuard } from '../services/guards/auth.guard';
import { TabsPage } from './tabs.page';
import { HomePage } from '../home/home.page';
import { HomePageModule } from '../home/home.module';
import { AuthenticationService } from '../shared/authentication-service';
import { AuthGuard } from '../shared/auth.guard';
import { SecureInnerPagesGuard } from '../shared/secure-inner-pages.guard';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule),
        // canActivate: [SecureInnerPagesGuard]
      },

      {
        path: 'historico',
        loadChildren: () => import('../historico/historico.module').then( m => m.HistoricoPageModule),
        // canActivate: [AuthGuard]
      },

      {
        path: 'perfil',
        loadChildren: () => import('../perfil/perfil.module').then( m => m.PerfilPageModule),
        // canActivate: [AuthGuard]
      },

      {
        path: 'novoservico',
        loadChildren: () => import('../novoservico/novoservico.module').then( m => m.NovoservicoPageModule),
        // canActivate: [AuthGuard]
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}