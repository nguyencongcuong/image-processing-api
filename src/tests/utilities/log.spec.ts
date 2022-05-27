import log from '../../utilities/log';

describe('Log Util', () => {

  it(`Should return an object with correct keys / values`, () => {
    // Arrange
    const func = 'printLog()';
    const content = 'This is printLog() content';
    const expectedInfoLog = { type: 'INFO', func, content };
    const expectedErrorLog = { type: 'ERROR', func, content };
    const expectedWarningLog = { type: 'WARNING', func, content };
    const expectedDebugLog = { type: 'DEBUG', func, content };

    // Act
    const logInfo = log.info(func, content);
    const errorLog = log.error(func, content);
    const warningLog = log.warning(func, content);
    const debugLog = log.debug(func, content);

    // Assert
    expect(logInfo).toEqual(expectedInfoLog);
    expect(errorLog).toEqual(expectedErrorLog);
    expect(warningLog).toEqual(expectedWarningLog);
    expect(debugLog).toEqual(expectedDebugLog);
  });

  it('should has the second arg (content) receiving any data type', () => {
    // Arrange
    const func = 'printProfile()'
    const content = {
      name: 'Nguyen Cong Cuong',
      age: 28
    };
    const expectedInfoLog = { type: 'INFO', func, content };
    const expectedErrorLog = { type: 'ERROR', func, content };
    const expectedWarningLog = { type: 'WARNING', func, content };
    const expectedDebugLog = { type: 'DEBUG', func, content };

    // Act
    const infoLog = log.info(func, content);
    const errorLog = log.error(func, content);
    const warningLog = log.warning(func, content);
    const debugLog = log.debug(func, content);

    // Assert
    expect(infoLog).toEqual(expectedInfoLog);
    expect(errorLog).toEqual(expectedErrorLog);
    expect(warningLog).toEqual(expectedWarningLog);
    expect(debugLog).toEqual(expectedDebugLog);
  });

});