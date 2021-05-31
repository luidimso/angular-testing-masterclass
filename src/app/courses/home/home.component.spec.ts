import {async, ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed, waitForAsync} from '@angular/core/testing';
import {CoursesModule} from '../courses.module';
import {DebugElement} from '@angular/core';

import {HomeComponent} from './home.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CoursesService} from '../services/courses.service';
import {HttpClient} from '@angular/common/http';
import {COURSES} from '../../../../server/db-data';
import {setupCourses} from '../common/setup-test-data';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {click} from '../common/test-utils';
import { element } from 'protractor';
import { doesNotReject } from 'assert';


describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component:HomeComponent;
  let element: DebugElement;
  let coursesService:any;

  const beginnerCourses = setupCourses().filter(course => course.category == 'BEGINNER');
  const advancedCourses = setupCourses().filter(course => course.category == 'ADVANCED');

  const coursesServiceSpy = jasmine.createSpyObj('CoursesService', ['findAllCourses']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CoursesModule,
        NoopAnimationsModule,
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: CoursesService,
          useValue: coursesServiceSpy
        }
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
      element = fixture.debugElement;
      coursesService = TestBed.get(CoursesService);
    });
  }));

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });


  it("should display only beginner courses", () => {
    coursesService.findAllCourses.and.returnValue(of(beginnerCourses));
    fixture.detectChanges();
    const tabs = element.queryAll(By.css(".mat-tab-label"));
    expect(tabs.length).toBe(1, "Unexpected number of tabs found");
  });


  it("should display only advanced courses", () => {
    coursesService.findAllCourses.and.returnValue(of(advancedCourses));
    fixture.detectChanges();
    const tabs = element.queryAll(By.css(".mat-tab-label"));
    expect(tabs.length).toBe(1, "Unexpected number of tabs found");
  });


  it("should display both tabs", () => {
    coursesService.findAllCourses.and.returnValue(of(setupCourses()));
    fixture.detectChanges();
    const tabs = element.queryAll(By.css(".mat-tab-label"));
    expect(tabs.length).toBe(2, "Unexpected number of tabs found");
  });


  it("should display advanced courses when tab clicked", fakeAsync(() => {
    coursesService.findAllCourses.and.returnValue(of(setupCourses()));
    fixture.detectChanges();
    const tabs = element.queryAll(By.css(".mat-tab-label"));
    click(tabs[1]);
    fixture.detectChanges();
    flush();
    const cardsTitles = element.queryAll(By.css(".mat-card-title"));
    expect(cardsTitles.length).toBeGreaterThan(0, "Could not find card title");
    expect(cardsTitles[0].nativeElement.textContent).toContain("Angular Testing Course");
  }));
});


