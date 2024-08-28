import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './components/landingPage/landing-page.component';
import { PageRoutingModule } from './page-routing.module';
import { DashboardService } from './services/dashboard.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ViewlistComponent } from './components/dashboard/viewList/viewList.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LandingPageComponent,
    DashboardComponent,
    ViewlistComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    MaterialModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    PageRoutingModule,
    MaterialModule
  ],
  providers: [
    DashboardService,
  ]
})
export class PageModule { }
