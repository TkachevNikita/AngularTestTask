import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page.component';

const routes: Routes = [
    {
      path: '',
      component: HomePageComponent
    },
];


export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
