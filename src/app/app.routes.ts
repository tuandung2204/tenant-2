import { RouterModule, Routes } from '@angular/router';
import { TenantManagementComponent } from './pages/tenant-management/tenant-management.component';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TenantGuard } from './guards/tenant.guard';

export const routes: Routes = [
  { path: '', component: TenantManagementComponent },
  {
    path: ':tenantId/dashboard',
    component: DashboardComponent,
    canActivate: [TenantGuard]
  },
  { path: '**', redirectTo: '' }

];
@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }