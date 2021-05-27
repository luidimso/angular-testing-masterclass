import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

describe('CalculatorService', () => {
    let calculator:CalculatorService;
    let loggerSpy:any;

    beforeEach(() => {
        console.log("Calling before ");
        loggerSpy = jasmine.createSpyObj('LoggerService', ["log"]);
        calculator = new CalculatorService(loggerSpy);
    });

    it('should add two numbers', () => {
        console.log("add test");
        const result = calculator.add(2, 2);
        expect(result).toBe(4);
        expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    });

    it('should subtract two numbers', () => {
        console.log("subtract")
        const result = calculator.subtract(2, 2);
        expect(result).toBe(0);
        expect(loggerSpy.log).toHaveBeenCalledTimes(1);
    });
});