import { Component, OnInit } from '@angular/core';
import { ShareService } from '../../services/share.service';

@Component({
  selector: 'app-stock-nav',
  templateUrl: './stock-nav.component.html',
  styleUrls: ['./stock-nav.component.scss']
})
export class StockNavComponent implements OnInit {
  nodes = [
    {
      id: 1,
      name: 'root1',
      children: [
        { id: 2, name: 'child1' },
        { id: 3, name: 'child2' }
      ]
    },
    {
      id: 4,
      name: 'root2',
      children: [
        { id: 5, name: 'child2.1' },
        {
          id: 6,
          name: 'child2.2',
          children: [
            { id: 7, name: 'subsub' }
          ]
        }
      ]
    }
  ];

  constructor(private service: ShareService) { }

  ngOnInit() {
    this.getShareList();
  }

  private getShareList() {
    this.service.getShareList().subscribe((data) => {
          console.log('stock nav get share list...', data);
    });
  }

}
