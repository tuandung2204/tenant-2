import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TenantService {
  private apiUrl = 'http://localhost:8081/api/tenants';

  constructor(private http: HttpClient) {}
  // Lấy danh sách tất cả phòng khám từ backend
  getTenants(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  createTenant(tenantData: any): Observable<any> {
    return this.http.post(this.apiUrl, tenantData);
  }
  // Gửi yêu cầu DELETE để xóa phòng khám
  deleteTenant(tenantId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${tenantId}`);
  }
  updateTenant(tenant: any): Observable<any> {
    return this.http.put(this.apiUrl, tenant);
  }
}
