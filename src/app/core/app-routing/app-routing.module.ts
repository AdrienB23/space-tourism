import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from '../../components/home/home.component';
import {DestinationComponent} from '../../components/destination/destination.component';
import { CrewComponent } from '../../components/crew/crew.component';
import {TechnologyComponent} from '../../components/technology/technology.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'destination/:dest', component: DestinationComponent },
  { path: 'crew/:crew', component: CrewComponent },
  { path: 'technology/:tech', component: TechnologyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
