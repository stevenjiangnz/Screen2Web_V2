import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-zone-selector',
  templateUrl: './zone-selector.component.html',
  styleUrls: ['./zone-selector.component.scss']
})
export class ZoneSelectorComponent implements OnInit {
  private currentZone;
  private currentAccount;
  private tradingDate;
  constructor(private router: Router) { }

  ngOnInit() {
    this.currentZone = {
      name: 'zone 1'
    };

    this.currentAccount = {
      name: 'account 001'
    }
    this.tradingDate = 20111009;
  }

  onSettingClick(event) {
    this.router.navigate(['/trade/setting']);
  }
}
