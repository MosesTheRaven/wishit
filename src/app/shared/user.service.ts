
import {EventEmitter} from "@angular/core";
export class UserService{

  statusChange : any = new EventEmitter<any>();


  constructor(){}

  set(userFromDatabase){
    localStorage.setItem('user', JSON.stringify(userFromDatabase));
    this.statusChange.emit(userFromDatabase);
  }
  destroy(){
    localStorage.removeItem('user');
    this.statusChange.emit(null);
  }



}
