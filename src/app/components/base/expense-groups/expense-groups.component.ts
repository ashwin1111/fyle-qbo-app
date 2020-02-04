import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseGroupsService } from './expense-groups.service';

@Component({
  selector: 'app-expense-groups',
  templateUrl: './expense-groups.component.html',
  styleUrls: ['./expense-groups.component.css', '../base.component.css'],
})
export class ExpenseGroupsComponent implements OnInit {
  workspaceId: number;
  expenseGroups: [any];
  isLoading = true;
  nextPageLink: string;
  previousPageLink: string;
  count: number;
  limit: number = 10;
  offset: number = 0;
  state = 'READY';
  ready: string = 'active';;
  complete: string;
  all: string
  allSelected: boolean;

  constructor(private route: ActivatedRoute, private expenseGroupService: ExpenseGroupsService, private router: Router) {}

  syncExpenseGroups() {
    this.expenseGroupService.syncExpenseGroups(this.workspaceId).subscribe(task => {
      this.router.navigateByUrl(`/workspaces/${this.workspaceId}/tasks`);
    });
  }
  
  nextPage() {
    this.offset = this.offset + this.limit;
    this.isLoading = true;
    this.getPaginatedExpenses();
  }

  previousPage() {
    this.offset = this.offset - this.limit;
    this.isLoading = true;
    this.getPaginatedExpenses();
  }
  
  changeState(state: string) {
    this.isLoading = true;
    this.offset = 0;
    if(state === 'ALL') {
      this.state = 'ALL';
      this.ready = '';
      this.complete = '';
      this.all = 'active';
    } else if(state === 'READY') {
      this.state = 'READY';
      this.ready = 'active';
      this.complete = '';
      this.all = '';
    } else if(state === 'COMPLETE') {
      this.state = 'COMPLETE';
      this.ready = '';
      this.complete = 'active';
      this.all = '';
    }
    this.getPaginatedExpenses();
  }

  getSelectedOptions() { 
    let expenseGroupIds = this.expenseGroups.filter(expenseGroup => expenseGroup.selected).map(expenseGroup => expenseGroup.id);
    console.log(expenseGroupIds);
    return expenseGroupIds;
  }

  toggleSelectAll() {
    this.expenseGroups.map(expenseGroup => expenseGroup.selected = this.allSelected);
  }

  getPaginatedExpenses() {
    this.expenseGroupService.getExpenseGroups(this.workspaceId, this.limit, this.offset, this.state).subscribe(expenseGroups => {
      this.nextPageLink = expenseGroups.next;
      this.previousPageLink = expenseGroups.previous;
      this.count = expenseGroups.count;
      this.expenseGroups = expenseGroups.results;
      this.allSelected = false;      
      this.isLoading = false;
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.workspaceId = +params['workspace_id'];
      this.getPaginatedExpenses();
    });
  }
}
