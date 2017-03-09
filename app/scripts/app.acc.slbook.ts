import { FormGroup, FormBuilder } from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import { AppDataService } from '../service/app.data.services';
import {AppCommonService} from '../service/app.common.service';



@Component({
    selector:'APP-SLBOOK' ,
    templateUrl:'app/views/app.acc.slbook.html'
})  


export class AppAccSlBook implements OnInit{

 public table:string =  'slbook' ;   
 public allData= [] ;
 public error = []  ;
 public slData=[] ;
 public allGlData=[] ; 
 public formDatas:FormGroup ; 
 public orgId:number ;
 public editFlag:boolean=false;
 public editId:number;
 public emptyData = {"id":-1,"code":null,"name":null,"glid":null, orgid:null} ;

 constructor( private _data:AppDataService , private _common:AppCommonService , private _bldr:FormBuilder) { };

 ngOnInit(){
 
        this.orgId = this._common.getOrg() ;
        console.log('org id  ' + this.orgId) ; 
        this._data.getData(this.table )
            .subscribe(resp => {
            this.allData = resp ;
            this._common.log(resp) ; 
            if (this.allData.length > 0){
               this.slData = this.allData.filter(data => { return  data.orgid==this.orgId });
            }  
        }, error => {this.error = error  }) ;

        this._data.getData('gl' )
            .subscribe(resp => {
            console.log(' glt ' + resp.length) ;     
            this.allGlData = resp.filter( _data => _data.orgid==this.orgId  ) ;
            console.log(' glt2 ' + this.allGlData.length) ; 
        }, error => {this.error = error  }) ;
 }


 initData(newData:boolean, doc:any){
    console.log('init data') ; 
    this.editFlag  = true ;
    this.editId    = -1;
    this.emptyData.orgid = this.orgId ;
    this.formDatas = this._bldr.group(this.emptyData )
    if (!newData && doc ){
        console.log('edit data'); 
       this.editId   = doc.id ;
       this.formDatas = this._bldr.group(doc )
       
    }

}

    
}
