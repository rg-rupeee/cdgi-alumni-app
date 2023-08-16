const express = require('express');
const fs = require('fs');
const path = require('path');
const logger = require('../configs/logger');

const router = express.Router();

const converseRoutes = ['auth', 'dashboard'];

const isDirectory = (folder, source) =>
  fs.lstatSync(path.join(folder, source)).isDirectory();

const initRoutes = () => {
  fs.readdirSync(__dirname)
    .filter((file) => isDirectory(__dirname, file))
    .forEach((file) => {
      const moduleRouter = express.Router();
      const currentFile = path.join(__dirname, file);

      fs.readdirSync(currentFile)
        .filter((module) => isDirectory(currentFile, module))
        .forEach((module) => {
          const routeFile = `./${file}/${module}/${
            converseRoutes.includes(file) ? file : module
          }.route`;
          // eslint-disable-next-line global-require, import/no-dynamic-require
          moduleRouter.use(`/${module}`, require(routeFile));
          logger.info(`Loaded API: ${file}/${module}`);
        });

      router.use(`/${file}`, moduleRouter);
    });

  return router;
};

module.exports = initRoutes;
