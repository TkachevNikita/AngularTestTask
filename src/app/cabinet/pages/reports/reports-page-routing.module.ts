import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsPageComponent } from './reports-page.component';

const routes: Routes = [
    {
      path: '',
      component: ReportsPageComponent
    },
];


export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
