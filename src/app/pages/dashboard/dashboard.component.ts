import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  tenantId: string = "";
  tenant: any = null;

  constructor(private route: ActivatedRoute, private localStorageService: LocalStorageService) {}

  ngOnInit() {
    this.tenantId = this.route.snapshot.paramMap.get('tenantId') || '';
  
    // Đọc từ localStorage và parse lại thành mảng
    const tenantsJson = this.localStorageService.getItem<string>('tenants');
    const tenants = tenantsJson ? JSON.parse(tenantsJson) : [];
  
    this.tenant = tenants.find((t: { id: string }) => t.id === this.tenantId);  
    console.log('Đang xem dashboard của phòng khám:', this.tenant);
  }
}
