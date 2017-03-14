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
        this.table = 'table';
        this.error = [];
        this.detRows = [];
        this.allDetRows = [];
        this.emptyDoc = {};
        this.pager = {};
        this.editFlag = false;
        this.editId = undefined;
        this.orgId = undefined;
        this.glId = undefined;
        this.lgrname = undefined;
        this.emptyData = { id: -1, docid: 1, glid: null, slid: null, describ: null, amount: null, crdr: null, orgid: null };
        this.allgl = [];
        this.glrows = [];
        this.allsl = [];
        this.slrows = [];
        this.slglrows = [];
        this.doc = this._actrout.snapshot.params['doc'];
        console.log(this.doc);
    }
    ;
    AppAccDocDets.prototype.ngOnInit = function () {
        var _this = this;
        this.initSetup();
        if (this.formDatas.controls['id'].value >= 0) {
            this._data.getData('docdet/' + this.formDatas.controls['id'].value)
                .subscribe(function (resp) {
                _this.allDetRows = resp;
                _this._common.log(resp);
                _this.setPage(1);
                _this.sumDetData();
                console.log('det row length' + _this.detRows.length);
            }, function (error) { _this.error = error; });
        }
        ;
        // get allgl anf glrows
        console.log('get gl' + this.orgId);
        this._data.getData('gl')
            .subscribe(function (resp) {
            _this.allgl = resp;
            console.log('get gl count ' + _this.allgl.length);
            _this.glrows = _this.allgl.filter(function (_data) { return _data.orgid == _this.orgId && _data.id !== _this.glId; });
            console.log('get gl count ' + _this.glrows.length);
        }, function (error) { _this.error = error; });
        // get allgl anf glrows
        console.log('get sl');
        this._data.getData('sl')
            .subscribe(function (resp) {
            _this.allsl = resp;
            console.log('get sl count ' + _this.allsl.length);
            _this.slrows = _this.allsl.filter(function (_data) { return _data.orgid == _this.orgId; });
            console.log('get sl count ' + _this.slrows.length);
        }, function (error) { _this.error = error; });
    };
    AppAccDocDets.prototype.onCancel = function () {
        console.log('cancel data');
        this.editFlag = false;
        this.editId = undefined;
        // if (id==-1){ 
        //    this.detRows.splice(index, 1);
        // }
        this._loc.back();
    };
    AppAccDocDets.prototype.initSetup = function () {
        var _this = this;
        console.log(' initsetup  ');
        this.orgId = this._common.getOrg();
        this.emptyDoc = JSON.parse(this.doc);
        console.log(this.emptyDoc);
        this.formDatas = this._bldr.group(this.emptyDoc);
        //this._bldr.group(this.formDatas) ;
        this.formDatas.controls['docdate'].setValue(this._common.sqlDt2Jdt(this.emptyDoc['docdate']));
        this.formDatas.controls['refdate'].setValue(this._common.sqlDt2Jdt(this.emptyDoc['refdate']));
        console.log(' sl code' + this.emptyDoc['code']);
        if (this.emptyDoc['code'].value !== null && this.emptyDoc['code'] !== undefined) {
            this._data.getData('slbook')
                .subscribe(function (resp) {
                var idx = _this._common.findIndex(resp, 'code =="' + _this.emptyDoc['code'] + '"');
                if (idx > 0) {
                    _this.lgrname = resp[idx].name;
                    _this.glId = resp[idx].glid;
                    console.log(' gld id ' + _this.glId);
                }
            }, function (error) { _this.error = error; });
        }
    };
    AppAccDocDets.prototype.glChange = function (_event) {
        console.log('gl chnge ', _event);
        this.initGlSl(_event);
    };
    AppAccDocDets.prototype.initGlSl = function (glId) {
        console.log('initglsl');
        var idx = this._common.findIndex(this.glrows, 'id==' + glId);
        if (idx >= 0) {
            var bookledger = this.glrows[idx].bookledger;
            console.log('SL Code ' + bookledger);
            if (bookledger == 'SL') {
                console.log('sl rwos' + this.slrows.length);
                this.slglrows = this.slrows.filter(function (_data) { return _data.glid == glId; });
                console.log('sl ros' + this.slglrows.length);
            }
            else {
                this.slglrows = [];
            }
        }
    };
    AppAccDocDets.prototype.initData = function (newData, doc) {
        console.log('init data');
        this.editFlag = true;
        this.editId = -1;
        this.emptyData.orgid = this.formDatas.controls['orgid'].value;
        this.emptyData.docid = this.formDatas.controls['id'].value;
        this.emptyData.crdr = 'D';
        //if (this.formDatas.controls['crdr'].value  == 'C' ) {
        //   this.emptyData.crdr = 'D' ;
        //}
        this.detData = this._bldr.group(this.emptyData);
        if (!newData && doc) {
            console.log('edit data');
            this.editId = doc.id;
            this.detData = this._bldr.group(doc);
            this.initGlSl(doc.glid);
        }
    };
    AppAccDocDets.prototype.sumDetData = function () {
        console.log('sum data ' + this.allDetRows.length);
        if (this.allDetRows.length > 0) {
            if (this.allDetRows.length > 1) {
                this.formDatas.controls['amount'].setValue(this.allDetRows.reduce(function (a, b) { return a.amount + b.amount; }, 0));
            }
            else {
                console.log('sum data 2 ' + this.allDetRows[0].amount);
                this.formDatas.controls['amount'].setValue(this.allDetRows[0].amount);
            }
            console.log('sum data 2 ' + this.formDatas.controls['amount'].value);
        }
    };
    AppAccDocDets.prototype.addDetData = function () {
        console.log('Add Data');
        this.initData(true, null);
        this.detRows.unshift(this.emptyData);
    };
    AppAccDocDets.prototype.deleteDetData = function (id, index) {
        var _this = this;
        if (confirm("Delete this detail? ")) {
            this._data.deleteData(this.table, id).subscribe(function (resp) {
                _this._common.log(resp);
                if (resp.affectedRows >= 1) {
                    _this.detRows.splice(index, 1);
                    var indx = _this._common.findIndex(_this.allDetRows, 'id==' + id);
                    if (indx >= 0) {
                        _this.allDetRows.splice(indx, 1);
                    }
                    _this.sumDetData();
                }
            }, function (error) { return _this.error = error; });
        }
    };
    AppAccDocDets.prototype.editDetData = function (id, index) {
        console.log(' Data');
        this.initData(false, this.detRows[index]);
    };
    AppAccDocDets.prototype.onDetCancel = function (id, index) {
        console.log('cancel data');
        this.editFlag = false;
        this.editId = undefined;
        if (id == -1) {
            this.detRows.splice(index, 1);
        }
    };
    AppAccDocDets.prototype.setPage = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this._common.getPager(this.allDetRows.length, page, 5);
        this.detRows = this.allDetRows.slice(this.pager.startIndex, this.pager.endIndex + 1);
        console.log(this.detRows[0]);
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