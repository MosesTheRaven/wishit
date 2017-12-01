import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import * as firebase from "firebase";
import {NotificationService} from "../shared/notification.service";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  constructor(private notifier: NotificationService) { }

  ngOnInit() {
  }




}
