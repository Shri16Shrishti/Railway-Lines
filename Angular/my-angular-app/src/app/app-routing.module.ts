import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TrainDetailComponent } from './train-detail/train-detail.component'; 
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SearchResultComponent } from './search-result/search-result.component';


const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' } ,
  // { path: 'train-detail', component: TrainDetailComponent } ,
  { path: '', component: HomeComponent },
  { path: 'train-detail', component: TrainDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'search-result', component: SearchResultComponent },
];


@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes,{
    useHash:true,
    onSameUrlNavigation:'reload',
  }),
    CommonModule],
    exports: [RouterModule],
})
export class AppRoutingModule { }
