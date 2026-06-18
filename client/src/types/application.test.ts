import { describe, it, expect } from 'vitest'
import type { Application, ApplicationFormData, JobType, ApplicationStatus } from '@/types/application'

describe('Application Types', () => {
  it('should have correct JobType values matching server', () => {
    const jobTypes: JobType[] = ['INTERNSHIP', 'FULL_TIME', 'PART_TIME']
    jobTypes.forEach((type) => {
      expect(['INTERNSHIP', 'FULL_TIME', 'PART_TIME']).toContain(type)
    })
  })

  it('should have correct ApplicationStatus values matching server', () => {
    const statuses: ApplicationStatus[] = ['APPLIED', 'INTERVIEWING', 'OFFER', 'REJECTED']
    statuses.forEach((status) => {
      expect(['APPLIED', 'INTERVIEWING', 'OFFER', 'REJECTED']).toContain(status)
    })
  })

  it('should create valid ApplicationFormData', () => {
    const formData: ApplicationFormData = {
      company_name: 'Acme Corp',
      job_title: 'Developer',
      job_type: 'FULL_TIME',
      status: 'APPLIED',
      applied_date: '2026-06-15',
    }

    expect(formData.company_name).toBe('Acme Corp')
    expect(formData.job_title).toBe('Developer')
    expect(formData.job_type).toBe('FULL_TIME')
    expect(formData.status).toBe('APPLIED')
    expect(formData.applied_date).toBe('2026-06-15')
  })

  it('should create valid Application', () => {
    const application: Application = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      company_name: 'Acme Corp',
      job_title: 'Developer',
      job_type: 'FULL_TIME',
      status: 'APPLIED',
      applied_date: '2026-06-15',
      notes: 'Test notes',
      created_at: '2026-06-15T10:00:00Z',
      updated_at: '2026-06-15T10:00:00Z',
    }

    expect(application.id).toBeDefined()
    expect(application.company_name).toBe('Acme Corp')
    expect(application.job_type).toBe('FULL_TIME')
    expect(application.status).toBe('APPLIED')
  })
})