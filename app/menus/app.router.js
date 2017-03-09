"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var app_acc_gl_1 = require("../scripts/app.acc.gl");
var app_acc_orgs_1 = require("../scripts/app.acc.orgs");
var app_acc_home_1 = require("../scripts/app.acc.home");
var app_acc_lookups_1 = require("../scripts/app.acc.lookups");
var app_acc_types_1 = require("../scripts/app.acc.types");
var app_acc_period_1 = require("../scripts/app.acc.period");
var app_acc_slbook_1 = require("../scripts/app.acc.slbook");
var routes = [
    { path: '', component: app_acc_home_1.AppAccHome },
    { path: 'orgs', component: app_acc_orgs_1.AppAccOrgs },
    { path: 'lookups', component: app_acc_lookups_1.AppAccLookups },
    { path: 'types', component: app_acc_types_1.AppAccTypes },
    { path: 'period', component: app_acc_period_1.AppAccPeriod },
    { path: 'gl', component: app_acc_gl_1.AppAccGl },
    { path: 'slbook', component: app_acc_slbook_1.AppAccSlBook },
];
exports.MenuRoutes = router_1.RouterModule.forRoot(routes);
exports.MenuComponents = [app_acc_orgs_1.AppAccOrgs, app_acc_types_1.AppAccTypes, app_acc_lookups_1.AppAccLookups, app_acc_home_1.AppAccHome, app_acc_period_1.AppAccPeriod, app_acc_gl_1.AppAccGl, app_acc_slbook_1.AppAccSlBook];
//# sourceMappingURL=app.router.js.map