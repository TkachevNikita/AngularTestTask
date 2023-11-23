import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabinetLayoutComponent } from './cabinet-layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';


const routes: Routes = [
  {
    path: '',
    component: CabinetLayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home-page.module').then(m => m.HomeModule)
      },
      {
        path: 'billing',
        loadChildren: () => import('./pages/billing/billing-page.module').then(m => m.BillingModule)
      },
      {
        path: 'inventory',
        loadChildren: () => import('./pages/inventory/inventory-page.module').then(m => m.InventoryModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./pages/profile/profile-page.module').then(m => m.ProfileModule)
      },
      {
        path: 'reports',
        loadChildren: () => import('./pages/reports/reports-page.module').then(m => m.ReportsModule)
      },
    ]
  },
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
