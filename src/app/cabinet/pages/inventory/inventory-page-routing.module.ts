import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryPageComponent } from './inventory-page.component';

const routes: Routes = [
    {
      path: '',
      component: InventoryPageComponent
    },
];


export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
