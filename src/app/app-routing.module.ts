import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {MyWishlistsComponent} from "./my-wishlists/my-wishlists.component";
import {FriendsComponent} from "./friends/friends.component";
import {UserSpaceComponent} from "./user-space/user-space.component";
import {NgModule} from "@angular/core";

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'my-wishlists', component: MyWishlistsComponent},
  {path: 'friends', component: FriendsComponent},
  {path: 'user-space', component: UserSpaceComponent},

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
