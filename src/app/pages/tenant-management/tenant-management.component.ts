import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { PlusOutline } from '@ant-design/icons-angular/icons';
import { TenantService } from '../../services/tenant.service';

@Component({
  selector: 'app-tenant-management',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule, NzCardModule, NzFormModule, NzTableModule, NzInputModule, NzButtonModule, NzIconModule],
  templateUrl: './tenant-management.component.html',
  styleUrl: './tenant-management.component.css'
})
export class TenantManagementComponent implements OnInit {
  newTenant = {
    clinicName: '',
    tenantId: '',
    schemaname: '',
    representativeName: '',
    dburl: '',
    username: '',
    password: '',
    phone: '',
    address: '',
    email: '',
    website: ''
  };

  tenants: any[] = [];

  constructor(
    private tenantService: TenantService,
    private message: NzMessageService,
    private iconService: NzIconService
  ) {
    this.iconService.addIcon(PlusOutline);
  }


  ngOnInit() {
    this.loadTenants(); // Gọi API để lấy danh sách phòng khám
  }

  loadTenants() {
    this.tenantService.getTenants().subscribe({
      next: (data) => {
        this.tenants = data;
      },
      error: (err) => {
        console.error('Lỗi khi lấy danh sách phòng khám:', err);
      }
    });
  }

  createTenant() {
    if (!this.newTenant.clinicName || !this.newTenant.tenantId) {
      this.message.error('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    this.tenantService.createTenant(this.newTenant).subscribe({
      next: (response) => {
        this.message.success('Thêm phòng khám thành công!');


        this.tenants = [...this.tenants, response];

        this.resetForm();
        this.loadTenants();
      },
      error: (error) => {
        console.error('Lỗi khi tạo phòng khám:', error);
        this.message.error('Có lỗi xảy ra, vui lòng thử lại!');
        this.loadTenants();
      }
    });
  }


  deleteTenant(tenantId: string) {
    
    this.tenantService.deleteTenant(tenantId).subscribe({
      next: () => {
        this.tenants = this.tenants.filter(tenant => tenant.tenantId !== tenantId);
        this.message.success('Xóa phòng khám thành công!');
        this.loadTenants();
      },
      error: (error) => {
        const errorMessage = error?.error?.message || 'Xóa thất bại! Vui lòng thử lại.';
        console.error('Lỗi khi xóa phòng khám:', errorMessage);
        this.message.error(errorMessage);
        this.loadTenants();
      }
    });
  }
  isEditing: boolean = false;
  editTenant(tenant: any) {
    console.log('Tenant được chọn:', tenant);
    this.newTenant = { ...tenant };  // Copy dữ liệu tenant vào biến newTenant
    this.isEditing = true;  // Bật chế độ chỉnh sửa
  }
  updateTenant() {
    if (!this.newTenant.tenantId) {
      this.message.error('Không tìm thấy ID phòng khám để cập nhật!');
      return;
    }

    console.log('Dữ liệu gửi API:', this.newTenant); // Kiểm tra dữ liệu trước khi gửi

    this.tenantService.updateTenant(this.newTenant).subscribe({
      next: (updatedTenant) => {
        this.message.success('Cập nhật thông tin phòng khám thành công!');

        const index = this.tenants.findIndex(t => t.clinicId === this.newTenant.tenantId);
        if (index !== -1) {
          this.tenants[index] = { ...updatedTenant };
        }
        this.cancelEdit(); // Thoát chế độ chỉnh sửa

        this.resetForm();
        this.loadTenants();
      },
      error: (error) => {
        console.error('Lỗi khi cập nhật phòng khám:', error);
        this.message.error('Có lỗi xảy ra, vui lòng thử lại!');
        this.loadTenants();
      }
    });
  }
  cancelEdit() {
    this.isEditing = false;

  }

  resetForm() {
    this.newTenant = {
      clinicName: '',
      tenantId: '',
      schemaname: '',
      representativeName: '',
      dburl: '',
      username: '',
      password: '',
      phone: '',
      address: '',
      email: '',
      website: ''
    };
  }
}