import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequirementsApiService } from '../services/requirements-api.service';
import { Requirement } from '../models/requirement.model';
import { RequirementCardComponent } from './requirement-card.component';
import { RequirementFormComponent } from './requirement-form.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RequirementCardComponent, RequirementFormComponent],
  template: `
    <div class="dashboard">
      <header class="dashboard-header">
        <div class="header-content">
          <h1>Requirements Manager</h1>
          <p class="subtitle">Track and manage service requirements</p>
        </div>
        <button class="btn-primary" (click)="showCreateForm = true">
          <span class="btn-icon">+</span> New Requirement
        </button>
      </header>

      <div class="filters">
        <button
          class="filter-btn"
          [class.active]="selectedFilter === 'all'"
          (click)="filterRequirements('all')">
          All <span class="count">{{ requirements.length }}</span>
        </button>
        <button
          class="filter-btn status-pending"
          [class.active]="selectedFilter === 'pending'"
          (click)="filterRequirements('pending')">
          Pending <span class="count">{{ getCountByStatus('pending') }}</span>
        </button>
        <button
          class="filter-btn status-in-progress"
          [class.active]="selectedFilter === 'in-progress'"
          (click)="filterRequirements('in-progress')">
          In Progress <span class="count">{{ getCountByStatus('in-progress') }}</span>
        </button>
        <button
          class="filter-btn status-complete"
          [class.active]="selectedFilter === 'complete'"
          (click)="filterRequirements('complete')">
          Complete <span class="count">{{ getCountByStatus('complete') }}</span>
        </button>
      </div>

      <div class="requirements-grid" *ngIf="!loading && filteredRequirements.length > 0">
        <app-requirement-card
          *ngFor="let requirement of filteredRequirements"
          [requirement]="requirement"
          (delete)="deleteRequirement($event)"
          (edit)="editRequirement($event)"
          (refresh)="loadRequirements()">
        </app-requirement-card>
      </div>

      <div class="empty-state" *ngIf="!loading && filteredRequirements.length === 0">
        <div class="empty-icon">📋</div>
        <h3>No requirements found</h3>
        <p>{{ selectedFilter === 'all' ? 'Create your first requirement to get started' : 'No requirements with this status' }}</p>
        <button class="btn-primary" (click)="showCreateForm = true" *ngIf="selectedFilter === 'all'">
          Create Requirement
        </button>
      </div>

      <div class="loading-state" *ngIf="loading">
        <div class="spinner"></div>
        <p>Loading requirements...</p>
      </div>
    </div>

    <app-requirement-form
      *ngIf="showCreateForm || editingRequirement"
      [requirement]="editingRequirement"
      (save)="saveRequirement($event)"
      (cancel)="cancelForm()">
    </app-requirement-form>
  `,
  styles: [`
    .dashboard {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 2rem;
    }

    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .header-content h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: white;
      margin: 0;
      text-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .subtitle {
      color: rgba(255,255,255,0.9);
      font-size: 1.1rem;
      margin: 0.5rem 0 0 0;
    }

    .btn-primary {
      background: white;
      color: #667eea;
      border: none;
      padding: 0.875rem 1.75rem;
      border-radius: 12px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0,0,0,0.15);
    }

    .btn-icon {
      font-size: 1.25rem;
      font-weight: 600;
    }

    .filters {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }

    .filter-btn {
      background: rgba(255,255,255,0.2);
      color: white;
      border: 2px solid transparent;
      padding: 0.75rem 1.5rem;
      border-radius: 10px;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      backdrop-filter: blur(10px);
    }

    .filter-btn:hover {
      background: rgba(255,255,255,0.3);
      transform: translateY(-1px);
    }

    .filter-btn.active {
      background: white;
      color: #667eea;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }

    .count {
      background: rgba(0,0,0,0.1);
      padding: 0.25rem 0.5rem;
      border-radius: 6px;
      font-size: 0.85rem;
    }

    .filter-btn.active .count {
      background: #667eea;
      color: white;
    }

    .requirements-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 1.5rem;
      animation: fadeIn 0.5s ease;
    }

    .empty-state, .loading-state {
      text-align: center;
      padding: 4rem 2rem;
      background: rgba(255,255,255,0.95);
      border-radius: 16px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.1);
    }

    .empty-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
      opacity: 0.5;
    }

    .empty-state h3 {
      font-size: 1.5rem;
      color: #2d3748;
      margin-bottom: 0.5rem;
    }

    .empty-state p {
      color: #718096;
      margin-bottom: 1.5rem;
    }

    .spinner {
      width: 50px;
      height: 50px;
      border: 4px solid rgba(102, 126, 234, 0.1);
      border-top-color: #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 1rem;
    }

    .loading-state p {
      color: #718096;
      font-size: 1.1rem;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @media (max-width: 768px) {
      .dashboard {
        padding: 1rem;
      }

      .header-content h1 {
        font-size: 2rem;
      }

      .requirements-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  requirements: Requirement[] = [];
  filteredRequirements: Requirement[] = [];
  selectedFilter: string = 'all';
  loading = true;
  showCreateForm = false;
  editingRequirement: Requirement | null = null;

  constructor(private apiService: RequirementsApiService) {}

  ngOnInit() {
    this.loadRequirements();
  }

  loadRequirements() {
    this.loading = true;
    this.apiService.getRequirements().subscribe({
      next: (data) => {
        this.requirements = data;
        this.applyFilter();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading requirements:', err);
        this.loading = false;
      }
    });
  }

  filterRequirements(status: string) {
    this.selectedFilter = status;
    this.applyFilter();
  }

  applyFilter() {
    if (this.selectedFilter === 'all') {
      this.filteredRequirements = this.requirements;
    } else {
      this.filteredRequirements = this.requirements.filter(
        req => req.status === this.selectedFilter
      );
    }
  }

  getCountByStatus(status: string): number {
    return this.requirements.filter(req => req.status === status).length;
  }

  deleteRequirement(id: string) {
    if (confirm('Are you sure you want to delete this requirement?')) {
      this.apiService.deleteRequirement(id).subscribe({
        next: () => this.loadRequirements(),
        error: (err) => console.error('Error deleting requirement:', err)
      });
    }
  }

  editRequirement(requirement: Requirement) {
    this.editingRequirement = requirement;
    this.showCreateForm = false;
  }

  saveRequirement(data: any) {
    if (this.editingRequirement) {
      this.apiService.updateRequirement(this.editingRequirement.id, data).subscribe({
        next: () => {
          this.loadRequirements();
          this.cancelForm();
        },
        error: (err) => console.error('Error updating requirement:', err)
      });
    } else {
      this.apiService.createRequirement(data).subscribe({
        next: () => {
          this.loadRequirements();
          this.cancelForm();
        },
        error: (err) => console.error('Error creating requirement:', err)
      });
    }
  }

  cancelForm() {
    this.showCreateForm = false;
    this.editingRequirement = null;
  }
}
