import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DatasetOverviewComponent} from './components/homepage/dataset-overview/dataset-overview.component';
import {DatasetDetailComponent} from './components/homepage/dataset-detail/dataset-detail.component';


const routes: Routes = [
  {path: 'homepage', component: DatasetOverviewComponent,
    children: [
      {path: ':edit', component: DatasetDetailComponent}]},
  {path: '', pathMatch: 'full', redirectTo: 'homepage'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
