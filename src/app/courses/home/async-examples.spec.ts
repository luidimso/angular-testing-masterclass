import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing";

describe("Async Testing Examples", () => {
    it("Asynchronous test example with Jasmine done()", (done:DoneFn) => {
        let test = false;
        setTimeout(() => {
            test = true;
            expect(test).toBeTruthy();
            done();
        }, 1000);
    });


    it("Asynchronous test example with fakeAsync()", fakeAsync(() => {
        let test = false;
        setTimeout(() => {
            test = true;
        }, 1000);
        flush();
        expect(test).toBeTruthy();
    }));


    it("Asynchronous test example with Promise", fakeAsync(() => {
        let test = false;
        Promise.resolve().then(() => {
            test = true;
        });
        flushMicrotasks();
        expect(test).toBeTruthy();
    }));


    it("Asynchronous test example with Promises and setTimeout()", fakeAsync(() => {
        let counter = 0;
        Promise.resolve().then(() => {
            counter += 10;

            setTimeout(() => {
                counter += 1;
            }, 1000);
        });
        expect(counter).toBe(0);
        flushMicrotasks();
        expect(counter).toBe(10);
        tick(500);
        expect(counter).toBe(10);
        tick(500);
        expect(counter).toBe(11);
    }));
});