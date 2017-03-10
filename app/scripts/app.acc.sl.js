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
var AppAccSl = (function () {
    function AppAccSl(_data, _common, _bldr) {
        this._data = _data;
        this._common = _common;
        this._bldr = _bldr;
        this.table = 'sl';
        this.allData = [];
        this.error = [];
        this.slData = [];
        this.slbook = [];
        this.editFlag = false;
        this.emptyData = { name: null, glid: null, slcode: null, address1: null, address2: null, city: null, state: null, country: null, pin: null, phone: null, contact: null, email: null, id: -1, orgid: null };
    }
    ;
    AppAccSl.prototype.ngOnInit = function () {
        var _this = this;
        this.orgId = this._common.getOrg();
        console.log('org id  ' + this.orgId);
        this._data.getData(this.table)
            .subscribe(function (resp) {
            _this.allData = resp;
            _this._common.log(resp);
            if (_this.allData.length > 0) {
                _this.slData = _this.allData.filter(function (data) { return data.orgid == _this.orgId && data.slcode == _this.slcode; });
            }
        }, function (error) { _this.error = error; });
        this._data.getData('slbook')
            .subscribe(function (resp) {
            console.log('slbook ' + resp.length);
            _this.slbook = resp.filter(function (_data) { return _data.orgid == _this.orgId && _data.type == 'SL'; });
            console.log(' slbook2 ' + _this.slbook.length);
        }, function (error) { _this.error = error; });
    };
    AppAccSl.prototype.initData = function (newData, doc) {
        console.log('init data');
        this.editFlag = true;
        this.editId = -1;
        this.emptyData.orgid = this.orgId;
        this.emptyData.slcode = this.slcode;
        this.emptyData.glid = this.glid;
        this.formDatas = this._bldr.group(this.emptyData);
        if (!newData && doc) {
            console.log('edit data');
            this.editId = doc.id;
            this.formDatas = this._bldr.group(doc);
        }
    };
    AppAccSl.prototype.addData = function () {
        console.log('Add Data');
        this.initData(true, null);
        //this.emptyData.orgid = this.orgId ;
        this.slData.unshift(this.emptyData);
    };
    AppAccSl.prototype.onCancel = function (id, index) {
        console.log('cancel data');
        this.editFlag = false;
        this.editId = undefined;
        if (id == -1) {
            this.slData.splice(index, 1);
        }
    };
    AppAccSl.prototype.deleteData = function (id, index) {
        var _this = this;
        if (confirm("Delete this Ledger Definition? ")) {
            this._data.deleteData(this.table, id).subscribe(function (resp) {
                _this._common.log(resp);
                if (resp.affectedRows >= 1) {
                    //let indx = this._common.findIndex(this.allGlData , 'id== '+this.slData[index].glid);
                    //if (indx >= 0) {
                    //     this.updateGl(this.allGlData[indx] , null, null ) ;
                    // }
                    _this.slData.splice(index, 1);
                }
            }, function (error) { return _this.error = error; });
        }
    };
    AppAccSl.prototype.editData = function (id, index) {
        console.log(' Data');
        this.initData(false, this.slData[index]);
        //this.emptyData.orgid = this.orgId ;
        //this.glData.unshift(this.emptyData) ;
    };
    AppAccSl.prototype.saveData = function (id, index) {
        var _this = this;
        var data = this.formDatas.value;
        data.code = data.code.toUpperCase();
        console.log(' Save  ' + id + "/" + index);
        var indx = this._common.findIndex(this.slData, 'code== "' + data.code + '"');
        //console.log(' dup id ' + dupid) ;
        if (indx >= 0) {
            if (this.slData[indx].id != id) {
                alert("The code already exists, pls enter diferent code");
                return;
            }
        }
        indx = this._common.findIndex(this.slData, 'name=="' + data.name + '"');
        //console.log(' dup id ' + dupid) ;
        if (indx >= 0) {
            if (this.slData[indx].id != id) {
                alert("The Name already exists, pls enter diferent Name");
                return;
            }
        }
        if (id == -1) {
            console.log('insert data');
            console.log(data);
            //console.log(' dup id ' + dupid) ;
            //this.glData[index].orgid = this.orgId ;
            // insert
            this._data.insertData(this.table, data).subscribe(function (respData) {
                _this.slData[index] = data;
                _this.slData[index].id = respData.id;
            }, function (respError) { _this.error = respError; });
        }
        else {
            console.log('update data');
            var updGl = false;
            this._data.updateData(this.table, data).subscribe(function (respData) {
            }, function (respError) { _this.error = respError; });
        }
        this.onCancel(-2, -2);
    };
    ;
    AppAccSl.prototype.onChange = function (event) {
        console.log('sl code ' + this.slcode);
        if (this.slcode) {
            var indx = this._common.findIndex(this.slbook, "code== '" + this.slcode + "'");
            console.log(' Gl index ' + indx);
            this.glid = this.slbook[indx].glid;
            console.log(' Gl id ' + this.glid);
        }
    };
    return AppAccSl;
}());
AppAccSl = __decorate([
    core_1.Component({
        selector: 'APP-SLBOOK',
        templateUrl: 'app/views/app.acc.sl.html'
    }),
    __metadata("design:paramtypes", [app_data_services_1.AppDataService, app_common_service_1.AppCommonService, forms_1.FormBuilder])
], AppAccSl);
exports.AppAccSl = AppAccSl;
//# sourceMappingURL=app.acc.sl.js.map