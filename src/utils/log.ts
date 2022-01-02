import { LoggerWithoutCallSite } from 'tslog';
import { TLogLevelName } from 'tslog/dist/types/interfaces';

const isDevelopment = process.env.NODE_ENV === 'development';
const minLevel: TLogLevelName =
  (process.env.DEBUG_MIN_LEVEL as TLogLevelName) ??
  (isDevelopment ? 'debug' : 'info');

const log = new LoggerWithoutCallSite({
  displayFilePath: isDevelopment ? 'hideNodeModulesOnly' : 'hidden',
  displayInstanceName: false,
  displayFunctionName: false,
  minLevel,
});

export { log };
