"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var app_data_services_1 = require("../service/app.data.services");
var app_common_service_1 = require("../service/app.common.service");
var AppAccDocDets = (function () {
    function AppAccDocDets(_data, _common, _bldr, _route, _actrout, _loc) {
        this._data = _data;
        this._common = _common;
        this._bldr = _bldr;
        this._route = _route;
        this._actrout = _actrout;
        this._loc = _loc;
        this.detRows = [];
        this.emptyDoc = {};
        this.doc = this._actrout.snapshot.params['doc'];
        console.log(this.doc);
    }
    ;
    AppAccDocDets.prototype.ngOnInit = function () {
        console.log('doc: ' + this.doc);
        this.emptyDoc = JSON.parse(this.doc);
        this.formDatas = this._bldr.group(this.emptyDoc);
        console.log(this.emptyDoc['id']);
    };
    return AppAccDocDets;
}());
AppAccDocDets = __decorate([
    core_1.Component({
        selector: 'APP-DOC-DET',
        templateUrl: 'app/views/app.acc.dockdet.html'
    }),
    __metadata("design:paramtypes", [app_data_services_1.AppDataService, app_common_service_1.AppCommonService, forms_1.FormBuilder, router_1.Router, router_1.ActivatedRoute, common_1.Location])
], AppAccDocDets);
exports.AppAccDocDets = AppAccDocDets;
//# sourceMappingURL=app.acc.docdet.js.map