import { fakeAsync, flush, tick } from "@angular/core/testing";

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
});