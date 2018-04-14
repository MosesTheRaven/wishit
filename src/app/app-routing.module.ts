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
import {SettingsUpdatePasswordComponent} from "./settings-update-password/settings-update-password.component";
import {SettingsUpdateEmailComponent} from "./settings-update-email/settings-update-email.component";
import {SettingsUpdateNicknameComponent} from "./settings-update-nickname/settings-update-nickname.component";
import {FriendsManageComponent} from "./friends-manage/friends-manage.component";
import {FriendsAddComponent} from "./friends-add/friends-add.component";
import {CreateWishlistComponent} from "./my-wishlists/create-wishlist/create-wishlist.component";
import {ManageWishlistsComponent} from "./my-wishlists/manage-wishlists/manage-wishlists.component";

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'my-wishlists', component: MyWishlistsComponent, canActivate: [RouteGuard]},
  {path: 'friends', component: FriendsComponent, canActivate: [RouteGuard]},
  {path: 'user-space', component: UserSpaceComponent, canActivate: [RouteGuard]},
  {path: 'login', component: LogInComponent},
  {path: 'sign-in', component: SingInComponent},
  {path: 'user-settings', component: UserSettingsComponent},
  {path: 'settings-update-password', component: SettingsUpdatePasswordComponent},
  {path: 'settings-update-email', component: SettingsUpdateEmailComponent},
  {path: 'settings-update-nickname', component: SettingsUpdateNicknameComponent},
  {path: 'friends-add', component: FriendsAddComponent},
  {path: 'friends-manage', component: FriendsManageComponent},
  {path: 'my-wishlists/create-wishlist', component: CreateWishlistComponent},
  {path: 'my-wishlists/manage-wishlists', component: ManageWishlistsComponent}


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
