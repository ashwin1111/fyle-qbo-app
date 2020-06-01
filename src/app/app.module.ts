import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseComponent } from './components/base/base.component';
import { TasksComponent } from './components/base/tasks/tasks.component';
import { ExpenseGroupsComponent } from './components/base/expense-groups/expense-groups.component';
import { BillsComponent } from './components/base/bills/bills.component';
import { MappingsComponent } from './components/base/mappings/mappings.component';
import { SettingsComponent } from './components/base/settings/settings.component';
import { JwtInterceptor } from './core/interceptor/jwt.interceptor';
import { QBOCallbackComponent } from './components/base/settings/qbo-callback/qbo-callback.component';
import { FyleCallbackComponent } from './components/base/settings/fyle-callback/fyle-callback.component';
import { CategoryComponent } from './components/base/mappings/category/category.component';
import { EmployeeComponent } from './components/base/mappings/employee/employee.component';
import { GeneralComponent } from './components/base/mappings/general/general.component';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectComponent } from './components/base/mappings/project/project.component';
import { CostCenterComponent } from './components/base/mappings/cost-center/cost-center.component';
import { ViewExpenseGroupComponent } from './components/base/expense-groups/view-expense-group/view-expense-group.component';
import { MappingErrorsComponent } from './components/base/tasks/mapping-errors/mapping-errors.component';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { ChecksComponent } from './components/base/checks/checks.component';
import { JournalEntriesComponent } from './components/base/journal-entries/journal-entries.component';
import { CreditCardPurchasesComponent } from './components/base/credit-card-purchases/credit-card-purchases.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { LoaderComponent } from './shared/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    TasksComponent,
    ExpenseGroupsComponent,
    BillsComponent,
    MappingsComponent,
    SettingsComponent,
    QBOCallbackComponent,
    FyleCallbackComponent,
    CategoryComponent,
    EmployeeComponent,
    GeneralComponent,
    ProjectComponent,
    CostCenterComponent,
    ViewExpenseGroupComponent,
    MappingErrorsComponent,
    ChecksComponent,
    JournalEntriesComponent,
    CreditCardPurchasesComponent,
  ],
  entryComponents: [
    EmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    Ng2FlatpickrModule,
    CoreModule,
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    NgbActiveModal
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
