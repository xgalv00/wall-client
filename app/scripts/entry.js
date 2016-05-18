var angular = require('angular');

require('angular-resource');
require('angular-ui-router');
require('ng-file-upload');
require('ngstorage');

//TODO find better way to include angular-bootstrap to bundle
// simple require returns only templates for ui bootstrap. $uibModal isn't there
// if import only minified version of templates file everything works
// question is to require minified versions of node modules
// require('angular-bootstrap');
require('./libs/ui-bootstrap');
require('./libs/ui-bootstrap-tpls');

require('./app');
require('./constants');
require('./controllers');
require('./services');
