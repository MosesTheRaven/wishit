
import {EventEmitter, Injectable} from "@angular/core";
@Injectable()
export class UserService{

  statusChange : any = new EventEmitter<any>();


  constructor(){}

  set(userFromDatabase){
    localStorage.setItem('user', JSON.stringify(userFromDatabase));
    this.statusChange.emit(userFromDatabase);
  }
  getProfile(){
    return JSON.parse(localStorage.getItem("user"));

  }
  destroy(){
    localStorage.removeItem('user');
    this.statusChange.emit(null);
  }



}
