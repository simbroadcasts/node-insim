import { LoggerWithoutCallSite, TLogLevelName } from 'tslog';

import { NodeEnvironment } from '../types';

const env = process.env.NODE_ENV as NodeEnvironment;
const debugMinLevel = process.env.DEBUG_MIN_LEVEL as TLogLevelName;

const minLevelByEnv: Record<NodeEnvironment, TLogLevelName> = {
  development: 'debug',
  test: 'fatal',
  production: 'info',
};

const minLevel: TLogLevelName = debugMinLevel ?? minLevelByEnv[env] ?? 'info';

const log = new LoggerWithoutCallSite({
  displayFilePath: env === 'development' ? 'hideNodeModulesOnly' : 'hidden',
  displayInstanceName: false,
  displayFunctionName: false,
  minLevel,
});

export { log };
