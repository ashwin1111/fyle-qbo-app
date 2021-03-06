import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkspaceService } from './workspace.service';
import { SettingsService } from './settings/settings.service'
import { forkJoin } from 'rxjs';
import { MappingsService } from './mappings/mappings.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css'],
})
export class BaseComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user'));;
  workspace: any = {};
  isLoading: boolean = true;
  fyleConnected: boolean = false;
  qboConencted: boolean = false;
  generalSettings: any;
  mappingSettings: any;
  showSwitchOrg: boolean = false;

  constructor(private workspaceService: WorkspaceService, private settingsService: SettingsService, private router: Router, private authService: AuthService) {
  }

  getGeneralSettings() { 

    forkJoin(
      [
        this.settingsService.getGeneralSettings(this.workspace.id),
        this.settingsService.getMappingSettings(this.workspace.id)
      ]
    ).subscribe(responses => {
      this.generalSettings = responses[0];
      this.mappingSettings = responses[1]['results'];
      
      let employeeFieldMapping = this.mappingSettings.filter(
        setting => (setting.source_field === 'EMPLOYEE') && 
        (setting.destination_field === 'EMPLOYEE' || setting.destination_field === 'VENDOR')
      )[0];

      let projectFieldMapping = this.mappingSettings.filter(
        settings => settings.source_field === 'PROJECT'
      )[0];

      let costCenterFieldMapping = this.mappingSettings.filter(
        settings => settings.source_field === 'COST_CENTER'
      )[0];

      this.generalSettings['employee_field_mapping'] = employeeFieldMapping.destination_field;

      if (projectFieldMapping) {
        this.generalSettings['project_field_mapping'] = projectFieldMapping.destination_field;
      }

      if (costCenterFieldMapping) {
        this.generalSettings['cost_center_field_mapping'] = costCenterFieldMapping.destination_field;
      }

      localStorage.setItem('generalSettings', JSON.stringify(this.generalSettings));
    });
  }

  switchWorkspace() {
    this.authService.switchWorkspace();
  }

  getSettingsAndNavigate(location) {
    const pathName = window.location.pathname;
    this.isLoading = false;
    if (pathName === '/workspaces') {
      this.router.navigateByUrl(`/workspaces/${this.workspace.id}/${location}`);
    }
    this.getGeneralSettings();
  }

  ngOnInit() {
    const orgsCount = parseInt(localStorage.getItem('orgsCount'));
    if (orgsCount > 1) {
      this.showSwitchOrg = true;
    }
    this.workspaceService.getWorkspaces(this.user.org_id).subscribe(workspaces => {
      if (Array.isArray(workspaces) && workspaces.length) {
        this.workspace = workspaces[0];
        this.getSettingsAndNavigate('expense_groups');
      } else {
        this.workspaceService.createWorkspace().subscribe(workspace => {
          this.workspace = workspace;
          this.getSettingsAndNavigate('settings');
        });
      }
    });
  }
}
