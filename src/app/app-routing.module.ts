import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CabinetGuardService } from './services/cabinet.guard.service';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'cabinet',
        pathMatch: 'full'
    },
    {
        path: 'cabinet',
        loadChildren: () => import('./cabinet/cabinet-layout.module').then(m => m.CabinetLayoutModule),
        canActivate: [CabinetGuardService],
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
