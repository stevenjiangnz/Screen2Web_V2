import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import * as _ from 'underscore';
import { ToasterService } from 'angular2-toaster';
import { ShareService } from '../../services/share.service';
import { MessageService } from '../../services/message.service';
import { Share, StateEvent } from '../../model/EntityDefinitions';
import { TREE_ACTIONS, KEYS, IActionMapping, TreeNode } from 'angular-tree-component';

@Component({
  selector: 'app-stock-nav',
  templateUrl: './stock-nav.component.html',
  styleUrls: ['./stock-nav.component.scss']
})
export class StockNavComponent implements OnInit {
  private searchUpdated: Subject<string> = new Subject<string>();
  private treeModel: any;

  nodes = null;
  treeState = null;

  actionMapping: IActionMapping = {
    mouse: {
      click: (tree, node, $event) => {
        if (node.hasChildren) {
          TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
        } else {
          TREE_ACTIONS.TOGGLE_SELECTED(tree, node, $event);
        }
      }
    }
  };

  treeOptions = {
    actionMapping: this.actionMapping
  };

  constructor(private shareService: ShareService, private messageService: MessageService, private toasterService: ToasterService) { }

  private onSearchType(value: string, tree: any) {
    this.searchUpdated.next(value); // Emit the event to all listeners that signed up - we will sign up in our contractor
  }

  ngOnInit() {
    this.searchUpdated.debounceTime(500).subscribe(searchTextValue => {
      this.filterTree(searchTextValue);
    });
    this.getShareList();
  }

  private onTreeInitialized(event) {
    this.treeModel = event.treeModel;
    this.applyTreeState();
  }
  onEvent(event) {
    if (event.eventName === 'activate') {
      const node = event.node;
      const state = new StateEvent();
      state.eventType = 'Stock-Select';
      state.shareId = node.data.id;
      state.data = node.data;

      // this.toasterService.pop('success', 'Args Title', 'Args Body');
      this.messageService.publishStockSelect(state);
    }
  }

  filterTree(searchText: string) {
    if (searchText === '') {
      this.treeModel.clearFilter();
    } else {
      this.treeModel.filterNodes((node: TreeNode) => {
        let isMatch = false;
        if (node.data.name.toUpperCase().indexOf(searchText.toUpperCase()) >= 0 ||
          (node.data.description && node.data.description.toUpperCase().indexOf(searchText.toUpperCase()) >= 0)) {
          isMatch = true;
        }

        return isMatch;
      });
    }
  }

  private setState(state) {
    localStorage.treeState = JSON.stringify(state);
  }

  private getShareList() {
    this.shareService.getShareList().then((shareList) => {
      const treeObj = this.buildTreeObj(shareList);
      this.nodes = treeObj;
    });
  }

  private applyTreeState() {
    const state = localStorage.treeState && JSON.parse(localStorage.treeState);
    if (state) {
      // tslint:disable-next-line:forin
      for (const id in state.expandedNodeIds) {
        if (state.expandedNodeIds[id]) {
          const node = this.treeModel.getNodeById(id.toString());
          if (node) {
            node.expand();
          }
        }
      }

      for (const id in state.activeNodeIds) {
        if (state.activeNodeIds[id]) {
          const node = this.treeModel.getNodeById(id.toString());
          if (node) {
            node.setActiveAndVisible();
          }
        }
      }
    }
  }

  private buildTreeObj(shareList: Share[]): any {
    const nodes = [{
      id: 'Stock',
      name: 'Stock',
      children: this.shareListToTreeObj(shareList, 'Stock', 'sector')
    },
    {
      id: 'ETF',
      name: 'ETF',
      children: this.shareListToTreeObj(shareList, 'ETF', 'industry')
    },
    { name: 'Watch' },
    { name: 'Scan' }];
    return nodes;
  }

  private shareListToTreeObj(shareList: Share[], shareType: string, group: string): any {
    const nodes = new Array();
    const filterShares = _.filter(shareList, (item) => item.shareType === shareType);

    const groupShares = _.groupBy(filterShares, group);

    // tslint:disable-next-line:forin
    for (const prop in groupShares) {
      const sectorShares = new Array();

      _.each(groupShares[prop], (share) => {
        sectorShares.push({ id: share.id.toString(), name: share.symbol, description: share.name });
      });

      nodes.push({ id: prop, name: prop, children: _.sortBy(sectorShares, 'name') });
    }

    return _.sortBy(nodes, 'name');
  }
}
