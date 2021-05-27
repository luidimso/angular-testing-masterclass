import { TestBed } from "@angular/core/testing";
import { CoursesService } from "./courses.service";
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe("CoursesService", () => {
    let coursesService:CoursesService;
    let httpTestingController: HttpClientTestingModule;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                CoursesService
            ]
        });

        coursesService = TestBed.get(CoursesService);
        httpTestingController = TestBed.get(HttpClientTestingModule);
    });

    it('should retrieve all courses', () => {

    });
});