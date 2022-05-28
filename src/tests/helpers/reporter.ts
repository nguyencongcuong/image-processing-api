import {
	DisplayProcessor,
	SpecReporter,
	StacktraceOption,
} from 'jasmine-spec-reporter';
import SuitInfo = jasmine.JasmineStartedInfo;

class CustomProcessor extends DisplayProcessor {
	public displayJasmineStarted(info: SuitInfo, log: string): string {
		return `${log}`;
	}
}

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(
	new SpecReporter({
		spec: {
			displayStacktrace: StacktraceOption.NONE,
		},
		customProcessors: [CustomProcessor],
	})
);
