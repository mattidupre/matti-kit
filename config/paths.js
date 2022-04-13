/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable no-multi-assign */
const path = require('path');
const ROOT = require('find-yarn-workspace-root')(__dirname);

const rootPackage = require(path.join(ROOT, 'package.json'));
const WORKSPACES = rootPackage.workspaces.reduce(
  (obj, workspaceRelativePath) => {
    const workspacePath = path.join(workspaceRelativePath);
    const { name: workspaceName } = require(path.join(
      ROOT,
      workspacePath,
      'package.json',
    ));
    return { ...obj, [workspaceName]: workspacePath };
  },
  {},
);

const NODE_MODULES = path.join(ROOT, 'node_modules');

const WORKSPACE = process.cwd(); // TODO: Test this with Lerna

module.exports = {
  ROOT,
  WORKSPACES,
  WORKSPACE,
  NODE_MODULES,
};
