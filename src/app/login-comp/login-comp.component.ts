import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-comp',
  templateUrl: './login-comp.component.html',
  styleUrls: ['./login-comp.component.css']
})
export class LoginCompComponent implements OnInit {
  private clickMessage = '';
  constructor() { }

  ngOnInit() {
  }
  onClickMe() {
    this.clickMessage = 'You are my hero!';
  }
}
