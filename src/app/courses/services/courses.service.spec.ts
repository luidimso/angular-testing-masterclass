import { TestBed } from "@angular/core/testing";
import { CoursesService } from "./courses.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { COURSES } from "../../../../server/db-data";

describe("CoursesService", () => {
    let coursesService:CoursesService;
    let httpTestingController:HttpTestingController;

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
        httpTestingController = TestBed.get(HttpTestingController);
    });

    it('should retrieve all courses', () => {
        coursesService.findAllCourses().subscribe(courses => {
            expect(courses).toBeTruthy('No courses returned');
            expect(courses.length).toBe(12, "Incorrect number of courses");

            const course = courses.find(course => course.id == 12);
            expect(course.titles.description).toBe("Angular Testing Course");
        });

        const request = httpTestingController.expectOne('/api/courses');
        expect(request.request.method).toEqual("GET");
        request.flush({payload: Object.values(COURSES)});
    }); 
});