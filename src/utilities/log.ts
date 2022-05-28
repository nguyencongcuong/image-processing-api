class Log {
	private INFO = 'INFO';
	private ERROR = 'ERROR';
	private WARNING = 'WARNING';
	private DEBUG = 'DEBUG';

	private print<T>(type: string, func: string, content: T): object {
		const result = {
			type,
			func,
			content,
		};

		switch (type) {
			case this.INFO:
				console.log(result);
				break;
			case this.ERROR:
				console.error(result);
				break;
			case this.WARNING:
				console.warn(result);
				break;
			case this.DEBUG:
				console.debug(result);
				break;
			default:
				break;
		}

		return result;
	}

	public info<T>(func: string, content: T): object {
		return this.print(this.INFO, func, content);
	}

	public error<T>(func: string, content: T): object {
		return this.print(this.ERROR, func, content);
	}

	public warning<T>(func: string, content: T): object {
		return this.print(this.WARNING, func, content);
	}

	public debug<T>(func: string, content: T): object {
		return this.print(this.DEBUG, func, content);
	}
}

export default new Log();
