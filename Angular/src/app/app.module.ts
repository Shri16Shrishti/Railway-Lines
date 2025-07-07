import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';  
import { AppRoutingModule } from './app-routing.module'; 
import { TrainDetailComponent } from './train-detail/train-detail.component'; 
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { SearchResultComponent } from './search-result/search-result.component';


@NgModule({
  declarations: [
    AppComponent,  
    TrainDetailComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    FormsModule,
    SearchResultComponent,
    HttpClientModule

    
  ],
  imports: [
    BrowserModule,           
    AppRoutingModule, 
    RouterModule ,
    HttpClientModule       
  ],
  providers: [provideHttpClient()],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]  
})
export class AppModule { }
