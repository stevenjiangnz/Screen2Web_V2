import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home-portal',
  templateUrl: './home-portal.component.html',
  styleUrls: ['./home-portal.component.scss']
})
export class HomePortalComponent implements OnInit {
  environmentName = environment.testProp;

  constructor() { }

  ngOnInit() {
  }

}
