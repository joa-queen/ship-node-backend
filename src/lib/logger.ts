/* eslint-disable no-console */
import envs from './envs';

const log = (...msgs: string[]) => {
  if (envs.NODE_ENV !== 'test') {
    console.info(msgs);
  }
};

const logger = {
  info: (msg: string, ...rest: string[]) => log(`ℹ️  ${msg}`, ...rest),
  debug: (msg: string, ...rest: string[]) => {
    if (envs.DEBUG) log(`ℹ️  ${msg}`, ...rest);
  },
  warning: (msg: string, ...rest: string[]) => log(`⚠️  ${msg}`, ...rest),
  success: (msg: string, ...rest: string[]) => log(`✅  ${msg}`, ...rest),
  error: (msg: string, context?: any) => {
    let output = `❌  ${msg}`;
    if (context) {
      output += `\n${JSON.stringify(context, null, 2)}`;
    }
    log(output);
  },
  deadlyError: (msg: string, context?: any) => {
    let output = `💀  ${msg}`;
    if (context) {
      output += `\n${JSON.stringify(context, null, 2)}`;
    }
    console.error(output);
  },
  search: (msg: string) => log(`🔍  ${msg}`),
  custom: (icon: string, msg: string) => log(`${icon}  ${msg}`),
  print: (msg: string) => log(msg),
};

export default logger;
