import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from "./components/landingPage/landing-page.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";

const routes: Routes = [
    {
        path: '', component: LandingPageComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                component:DashboardComponent,
            },
        ]
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
      },
]


@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class PageRoutingModule { }
