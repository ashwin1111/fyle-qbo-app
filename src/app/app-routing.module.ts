import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaseComponent } from './components/base/base.component';

import { TasksComponent } from './components/base/tasks/tasks.component';
import { ExpenseGroupsComponent } from './components/base/expense-groups/expense-groups.component';
import { BillsComponent } from './components/base/bills/bills.component';
import { ChecksComponent } from './components/base/checks/checks.component';
import { JournalEntriesComponent } from './components/base/journal-entries/journal-entries.component';
import { CreditCardPurchasesComponent } from './components/base/credit-card-purchases/credit-card-purchases.component';
import { MappingsComponent } from './components/base/mappings/mappings.component';
import { SettingsComponent } from './components/base/settings/settings.component';

import { AuthGuard } from './core/guard/auth.guard'
import { FyleCallbackComponent } from './components/base/settings/fyle-callback/fyle-callback.component';
import { QBOCallbackComponent } from './components/base/settings/qbo-callback/qbo-callback.component';
import { CategoryComponent } from './components/base/mappings/category/category.component';
import { EmployeeComponent } from './components/base/mappings/employee/employee.component';
import { GeneralComponent } from './components/base/mappings/general/general.component';
import { ProjectComponent } from './components/base/mappings/project/project.component';
import { CostCenterComponent } from './components/base/mappings/cost-center/cost-center.component';
import { ViewExpenseGroupComponent } from './components/base/expense-groups/view-expense-group/view-expense-group.component';
import { WorkspacesGuard } from './core/guard/workspaces.guard';
import { MappingErrorsComponent } from './components/base/tasks/mapping-errors/mapping-errors.component';

// const authRoutes: Routes = [
//   {
//     path: '',
//     redirectTo: '/workspaces',
//     pathMatch: 'full'
//   },
//   {
//     path: 'auth',
//     component: AuthComponent,
//     children: [
//       {
//         path: 'login',
//         component: LoginComponent
//       },
//       {
//         path: 'callback',
//         component: CallbackComponent
//       },
//       {
//         path: 'logout',
//         component: LogoutComponent
//       }
//     ]
//   },
//   {
//     path: '**',
//     redirectTo: 'workspaces',
//     pathMatch: 'full'
//   }
// ];

const baseModuleRoutes: Routes = [
  {
    path: 'workspaces',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      { path: ':workspace_id/tasks', component: TasksComponent, canActivate: [WorkspacesGuard] },
      { path: ':workspace_id/tasks/:task_id/errors', component: MappingErrorsComponent },
      {
        path: ':workspace_id/expense_groups',
        component: ExpenseGroupsComponent,
        canActivate: [WorkspacesGuard]
      },
      { path: ':workspace_id/expense_groups/:expense_group_id/view', component: ViewExpenseGroupComponent, canActivate: [WorkspacesGuard] },
      { path: ':workspace_id/bills', component: BillsComponent , canActivate: [WorkspacesGuard]},
      { path: ':workspace_id/checks', component: ChecksComponent , canActivate: [WorkspacesGuard]},
      { path: ':workspace_id/journal_entries', component: JournalEntriesComponent, canActivate: [WorkspacesGuard]},
      { path: ':workspace_id/credit_card_purchases', component: CreditCardPurchasesComponent, canActivate: [WorkspacesGuard]},
      { 
        path: ':workspace_id/mappings', 
        component: MappingsComponent,
        canActivate: [WorkspacesGuard],
        children: [
          { path: 'general', component: GeneralComponent },
          { path: 'categories', component: CategoryComponent },
          { path: 'employees', component: EmployeeComponent },
          { path: 'projects', component: ProjectComponent },
          { path: 'cost_centers', component: CostCenterComponent },
        ]
      },
      { path: ':workspace_id/settings', component: SettingsComponent },
      { path: 'fyle/callback', component: FyleCallbackComponent },
      { path: 'qbo/callback', component: QBOCallbackComponent }
    ]
  },
  {
    path: '',
    redirectTo: '/workspaces',
    pathMatch: 'full'
  },
  { 
    path: 'auth', 
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) 
  },
  {
    path: '**',
    redirectTo: 'workspaces',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(baseModuleRoutes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
