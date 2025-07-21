import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './core/app-routing/app-routing.module';
import { DestinationComponent } from './components/destination/destination.component';
import { CrewComponent } from './components/crew/crew.component';
import { TechnologyComponent } from './components/technology/technology.component';
import { HttpClientModule } from '@angular/common/http';
import {Drawer} from 'primeng/drawer';
import {NgOptimizedImage} from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {Button, ButtonDirective} from "primeng/button";
import { TextPipe } from './core/pipes/text.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    DestinationComponent,
    CrewComponent,
    TechnologyComponent,
    TextPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    Drawer,
    NgOptimizedImage,
    BrowserAnimationsModule,
    Button,
    ButtonDirective
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
