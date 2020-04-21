/* eslint-disable @typescript-eslint/no-require-imports */
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const packageJson = require('./../package.json');
const currentVersion = packageJson.version;
const child_process = require('child_process');

const parseVersion = (versionString: string) => {
  const [numberVersion, aliasVersionStr] = versionString.split('-');
  const [large, middle, small] = numberVersion.split('.').map(Number);

  let aliasSuffix: string | undefined;
  let aliasVersion: number | undefined;
  if (aliasVersionStr) {
    const [suffix, version] = aliasVersionStr.split('.');
    aliasSuffix = suffix;
    aliasVersion = Number(version);
  }

  return { large, middle, small, aliasSuffix, aliasVersion };
};

const currentVersionDetail = parseVersion(currentVersion);
type NextVersionType = 'large' | 'middle' | 'small' | 'alpha' | 'beta' | 'rc';

const createNextVersion = (
  versionDetail: ReturnType<typeof parseVersion>,
  nextType: NextVersionType
) => {
  const { large, middle, small, aliasSuffix, aliasVersion } = versionDetail;
  switch (nextType) {
    case 'alpha':
    case 'beta':
    case 'rc': {
      return `${large}.${middle}.${small}-${nextType}.${
        aliasSuffix === nextType ? (aliasVersion || 0) + 1 : 0
      }`;
    }
    case 'large': {
      return `${large + 1}.${middle}.${small}`;
    }
    case 'middle': {
      return `${large}.${middle + 1}.${small}`;
    }
    case 'small': {
      return `${large}.${middle}.${small + 1}`;
    }
  }
};

const choicesList: NextVersionType[] = ['alpha', 'beta', 'rc', 'large', 'middle', 'small'];
const CUSTOM_VERSION = '自定义版本';

const timeLog = (logInfo: string) => {
  const nowDate = new Date();
  console.log(
    `[${nowDate.toLocaleString()}.${nowDate
      .getMilliseconds()
      .toString()
      .padStart(3, '0')}] ${logInfo}`
  );
};

const release = async (versionStr: string) => {
  const util = require('util');
  const exec = util.promisify(child_process.exec);

  // =================== 修改版本 ===================
  packageJson.version = versionStr;
  timeLog(`🤔开始修改package.json版本`);
  await fs.writeFileSync(path.resolve(__dirname, './../package.json'), JSON.stringify(packageJson));
  await exec("pretty-quick --pattern='package.json'");
  timeLog('😁修改package.json版本成功');

  // =================== 代码推送git仓库 ===================
  timeLog('🤔代码开始推送到git仓库');
  await exec('git add package.json');
  await exec(`git commit -m "v${versionStr}" -n`);
  await exec('git push -f');
  timeLog('😁代码推送到git仓库成功');

  // =================== 打包及发布npm ===================
  timeLog('🤔开始打包和发布NPM');
  await exec('npm run build && npm publish');
  timeLog('😁发布NPM成功');

  // =================== git仓库打TAG ===================
  timeLog('🤔开始打TAG推送到git仓库');
  await exec(`git tag v${versionStr}`);
  await exec(`git push origin tag v${versionStr}`);
  timeLog('😁打TAG推送到git仓库成功');
};

let startTime = 0;

inquirer
  .prompt([
    {
      type: 'list',
      name: 'version',
      message: `请选择将要发布的版本 (当前 ${currentVersion})`,
      choices: choicesList
        .map((v) => createNextVersion(currentVersionDetail, v))
        .concat([CUSTOM_VERSION])
    }
  ])
  .then(({ version }: any) => {
    if (version === CUSTOM_VERSION) {
      return inquirer.prompt([{ type: 'input', name: 'version', message: '输入自定义版本号' }]);
    }
    return { version };
  })
  .then(({ version }: any) => {
    startTime = Date.now();
    return release(version);
  })
  .then(() => {
    timeLog(`😝发布成功 总共耗时${((Date.now() - startTime) / 1000).toFixed(3)}s`);
  })
  .catch((err: any) => {
    console.log(err, 'error o');
  });
