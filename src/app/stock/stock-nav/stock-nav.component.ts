import { Component, OnInit } from '@angular/core';
import * as _ from 'underscore';
import { ShareService } from '../../services/share.service';
import { Share } from '../../model/EntityDefinitions';

@Component({
  selector: 'app-stock-nav',
  templateUrl: './stock-nav.component.html',
  styleUrls: ['./stock-nav.component.scss']
})
export class StockNavComponent implements OnInit {
  nodes = [
    {
      name: 'root1',
      children: [
        { id: 2, name: 'child1' },
        { id: 3, name: 'child2' }
      ]
    },
    {
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
    this.service.getShareList().then((shareList) => {
      console.log('share list count: ' + shareList.length);
      const treeObj = this.buildTreeObj(shareList);
      this.nodes = treeObj;
    });
  }

  private buildTreeObj(shareList: Share[]): any {
    const nodes = [{name: 'Stock',
      children: this.shareListToTreeObj(shareList, 'Stock', 'sector')},
  {name: 'ETF',
  children: this.shareListToTreeObj(shareList, 'ETF', 'industry')},
  {name: 'Watch'},
  {name: 'Scan'}];
    return nodes;
  }

  private shareListToTreeObj(shareList: Share[], shareType: string, group: string): any {
    const nodes = new Array();
    const filterShares = _.filter(shareList, (item) => item.shareType === shareType);

    console.log(filterShares[0]);
    const groupShares = _.groupBy(filterShares, group);

    // tslint:disable-next-line:forin
    for (const prop in groupShares) {
      const sectorShares = new Array();

      _.each(groupShares[prop], (share) => {
        sectorShares.push({id: share.id, name: share.symbol, description: share.name});
      });

      nodes.push({name: prop, children: _.sortBy(sectorShares, 'name')});
    }

    return _.sortBy(nodes, 'name');
  }
}
