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
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var app_data_services_1 = require("../service/app.data.services");
var app_common_service_1 = require("../service/app.common.service");
var AppAccSlBook = (function () {
    function AppAccSlBook(_data, _common, _bldr) {
        this._data = _data;
        this._common = _common;
        this._bldr = _bldr;
        this.table = 'slbook';
        this.allData = [];
        this.error = [];
        this.slData = [];
        this.allGlData = [];
        this.editFlag = false;
        this.emptyData = { "id": -1, "code": null, "name": null, "glid": null, orgid: null };
    }
    ;
    AppAccSlBook.prototype.ngOnInit = function () {
        var _this = this;
        this.orgId = this._common.getOrg();
        console.log('org id  ' + this.orgId);
        this._data.getData(this.table)
            .subscribe(function (resp) {
            _this.allData = resp;
            _this._common.log(resp);
            if (_this.allData.length > 0) {
                _this.slData = _this.allData.filter(function (data) { return data.orgid == _this.orgId; });
            }
        }, function (error) { _this.error = error; });
        this._data.getData('gl')
            .subscribe(function (resp) {
            console.log(' glt ' + resp.length);
            _this.allGlData = resp.filter(function (_data) { return _data.orgid == _this.orgId; });
            console.log(' glt2 ' + _this.allGlData.length);
        }, function (error) { _this.error = error; });
    };
    AppAccSlBook.prototype.initData = function (newData, doc) {
        console.log('init data');
        this.editFlag = true;
        this.editId = -1;
        this.emptyData.orgid = this.orgId;
        this.formDatas = this._bldr.group(this.emptyData);
        if (!newData && doc) {
            console.log('edit data');
            this.editId = doc.id;
            this.formDatas = this._bldr.group(doc);
        }
    };
    return AppAccSlBook;
}());
AppAccSlBook = __decorate([
    core_1.Component({
        selector: 'APP-SLBOOK',
        templateUrl: 'app/views/app.acc.slbook.html'
    }),
    __metadata("design:paramtypes", [app_data_services_1.AppDataService, app_common_service_1.AppCommonService, forms_1.FormBuilder])
], AppAccSlBook);
exports.AppAccSlBook = AppAccSlBook;
//# sourceMappingURL=app.acc.slbook.js.map