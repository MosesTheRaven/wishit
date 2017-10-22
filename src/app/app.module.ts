import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HeaderComponent} from "./header/header.component";
import { UserSpaceComponent } from './user-space/user-space.component';
import { FriendsComponent } from './friends/friends.component';
import { MyWishlistsComponent } from './my-wishlists/my-wishlists.component';
import { SingInComponent } from './auth/sing-in/sing-in.component';
import { LogInComponent } from './auth/log-in/log-in.component';
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserSpaceComponent,
    FriendsComponent,
    MyWishlistsComponent,
    SingInComponent,
    LogInComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
