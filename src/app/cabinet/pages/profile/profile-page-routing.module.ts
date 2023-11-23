import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './profile-page.component';

const routes: Routes = [
    {
      path: '',
      component: ProfilePageComponent
    },
];


export const routing: ModuleWithProviders<RouterModule> = RouterModule.forChild(routes);
