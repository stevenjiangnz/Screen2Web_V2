import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { StateEvent } from '../model/EntityDefinitions';

import { ShareService } from '../services/share.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {

  constructor(private messageService: MessageService) {
    this.messageService.currentState$.subscribe(state => {
      console.log('in receiver: ' + state.shareId);
    });
  }

  ngOnInit() {
  }

}
