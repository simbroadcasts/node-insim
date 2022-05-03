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

function createLog(name?: string) {
  return new LoggerWithoutCallSite({
    name,
    displayFilePath: 'hidden',
    displayInstanceName: false,
    displayFunctionName: false,
    minLevel,
    exposeStack: false,
  });
}

const log = createLog();

export { createLog, log };
