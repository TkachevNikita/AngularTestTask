import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillingPageComponent } from './billing-page.component';

const routes: Routes = [
    {
      path: '',
      component: BillingPageComponent
    },
];


export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
