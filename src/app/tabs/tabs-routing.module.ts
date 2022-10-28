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
        path: 'editarperfil',
        loadChildren: () => import('../editarperfil/editarperfil.module').then( m => m.EditarperfilPageModule),
      },

      {
        path: 'servicos',
        loadChildren: () => import('../servicos/servicos.module').then( m => m.ServicosPageModule),
      },

      {
        path: 'novoservico',
        loadChildren: () => import('../novoservico/novoservico.module').then( m => m.NovoservicoPageModule),
      },

      {
        path: 'confirmaservico',
        loadChildren: () => import('../confirmaservico/confirmaservico.module').then( m => m.ConfirmaservicoPageModule),
      },

      {
        path: 'detailservico',
        loadChildren: () => import('../detailservico/detailservico.module').then( m => m.DetailservicoPageModule),
      },

      {
        path: 'pageservico',
        loadChildren: () => import('../pageservico/pageservico.module').then( m => m.PageservicoPageModule),
      },

      {
        path: 'pageproduto',
        loadChildren: () => import('../pageproduto/pageproduto.module').then( m => m.PageprodutoPageModule),
      },

      {
        path: 'mural',
        loadChildren: () => import('../mural/mural.module').then( m => m.MuralPageModule),
      },

      {
        path: 'loja',
        loadChildren: () => import('../loja/loja.module').then( m => m.LojaPageModule),
      },

      {
        path: 'novomural',
        loadChildren: () => import('../novomural/novomural.module').then( m => m.NovomuralPageModule),
      },

      {
        path: 'notificacoes',
        loadChildren: () => import('../notificacoes/notificacoes.module').then( m => m.NotificacoesPageModule),
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}