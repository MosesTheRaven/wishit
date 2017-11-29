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
import {FormsModule} from "@angular/forms";
import {RouteGuard} from "./auth/route-guard";
import { NotificationComponent } from './notification/notification.component';
import {NotificationService} from "./shared/notification.service";
import {MyFireService} from "./shared/myfire.service";
import {UserService} from "./shared/user.service";
import {UserSettingsComponent} from "./user-settings/user-settings.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserSpaceComponent,
    FriendsComponent,
    MyWishlistsComponent,
    SingInComponent,
    LogInComponent,
    HomeComponent,
    NotificationComponent,
    UserSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [RouteGuard, NotificationService, MyFireService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
