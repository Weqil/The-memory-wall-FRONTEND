import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { MemoryPeopleComponent } from './views/memory-people/memory-people.component';
import { VeteransComponent } from './views/veterans/veterans.component';
import { VeteranShowComponent } from './views/veteran-show/veteran-show.component';
import { LoginComponent } from './views/login/login.component';
import { CreateComponent } from './views/create/create.component';
export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path:'create', component: CreateComponent},
    {path:'veterans/:id', component: VeteransComponent},
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path:'memory', component: MemoryPeopleComponent},
    {path:'veteran/:id', component: VeteranShowComponent, outlet: 'secondRouter'},
    

    {path:'login', component: LoginComponent},
    {path: '**', redirectTo: 'home', pathMatch: 'full'}
];
