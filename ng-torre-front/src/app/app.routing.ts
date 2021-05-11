import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { PostingComponent } from './modules/posting/posting.component';
import { ListOpportunities } from './modules/list.opportunities/list.opportunities.component';
import { ComponentsComponent } from './components/components.component';
import { ROUTES } from './shared/enums/routes'

const routes: Routes =[
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: ROUTES.index, component: ComponentsComponent },
    { path: ROUTES.login, component: LoginComponent },
    { path: ROUTES.posting, component: PostingComponent },
    { path: ROUTES.listOpportunities, component: ListOpportunities }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
