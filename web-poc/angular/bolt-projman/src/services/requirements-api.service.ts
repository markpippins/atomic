import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Requirement, CreateRequirementDto, UpdateRequirementDto, SubItem } from '../models/requirement.model';

@Injectable({
  providedIn: 'root'
})
export class RequirementsApiService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getRequirements(): Observable<Requirement[]> {
    return this.http.get<Requirement[]>(`${this.apiUrl}/requirements`);
  }

  getRequirementById(id: string): Observable<Requirement> {
    return this.http.get<Requirement>(`${this.apiUrl}/requirements/${id}`);
  }

  getRequirementsByStatus(status: string): Observable<Requirement[]> {
    return this.http.get<Requirement[]>(`${this.apiUrl}/requirements/status/${status}`);
  }

  createRequirement(requirement: CreateRequirementDto): Observable<Requirement> {
    return this.http.post<Requirement>(`${this.apiUrl}/requirements`, requirement);
  }

  updateRequirement(id: string, requirement: UpdateRequirementDto): Observable<Requirement> {
    return this.http.put<Requirement>(`${this.apiUrl}/requirements/${id}`, requirement);
  }

  deleteRequirement(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/requirements/${id}`);
  }

  addSubItem(requirementId: string, subItem: { name: string; status: string }): Observable<SubItem> {
    return this.http.post<SubItem>(`${this.apiUrl}/requirements/${requirementId}/subitems`, subItem);
  }

  updateSubItem(requirementId: string, subItemId: string, subItem: { name?: string; status?: string }): Observable<SubItem> {
    return this.http.put<SubItem>(`${this.apiUrl}/requirements/${requirementId}/subitems/${subItemId}`, subItem);
  }

  deleteSubItem(requirementId: string, subItemId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/requirements/${requirementId}/subitems/${subItemId}`);
  }
}
