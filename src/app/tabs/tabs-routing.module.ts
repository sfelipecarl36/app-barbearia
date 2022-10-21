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
      },

      {
        path: 'historico',
        loadChildren: () => import('../historico/historico.module').then( m => m.HistoricoPageModule),
      },

      {
        path: 'perfil',
        loadChildren: () => import('../perfil/perfil.module').then( m => m.PerfilPageModule),
      },

      {
        path: 'mural',
        loadChildren: () => import('../mural/mural.module').then( m => m.MuralPageModule),
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}