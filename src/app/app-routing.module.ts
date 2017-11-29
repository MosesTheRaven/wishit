import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {MyWishlistsComponent} from "./my-wishlists/my-wishlists.component";
import {FriendsComponent} from "./friends/friends.component";
import {UserSpaceComponent} from "./user-space/user-space.component";
import {NgModule} from "@angular/core";
import {LogInComponent} from "./auth/log-in/log-in.component";
import {SingInComponent} from "./auth/sing-in/sing-in.component";
import {RouteGuard} from "./auth/route-guard";
import {UserSettingsComponent} from "./user-settings/user-settings.component";

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'my-wishlists', component: MyWishlistsComponent, canActivate: [RouteGuard]},
  {path: 'friends', component: FriendsComponent, canActivate: [RouteGuard]},
  {path: 'user-space', component: UserSpaceComponent, canActivate: [RouteGuard]},
  {path: 'login', component: LogInComponent},
  {path: 'sign-in', component: SingInComponent},
  {path: 'user-settings', component: UserSettingsComponent},


];

@NgModule({
  imports: [
      RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
