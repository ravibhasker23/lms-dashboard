import { TestBed } from '@angular/core/testing';
import { LmsDashboardService } from './lms-dashboard.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LmsDashboardService', () => {
  let service: LmsDashboardService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new LmsDashboardService(httpClientSpy as any);

    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [LmsDashboardService],
    });
    service = TestBed.get(LmsDashboardService);
  });

  it('should be created', () => {
    const service: LmsDashboardService = TestBed.get(LmsDashboardService);
    expect(service).toBeTruthy();
  });

  it('be able to retrieve courses from the API via GET', () => {
    service.fetchCourses().subscribe((res) => {
      expect(res).toBeDefined();
    });
  });

  it('be able to download the pdf from the API via POST', () => {
    const cert = '';
    service.downloadCertificate(cert).subscribe((res) => {
      expect(res).toBeDefined();
    });
  });
});
