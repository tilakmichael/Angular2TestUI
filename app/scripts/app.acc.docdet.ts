import { Location } from '@angular/common';
import { Router,ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AppDataService } from '../service/app.data.services';
import {AppCommonService} from '../service/app.common.service';


@Component({
    selector:'APP-DOC-DET',
    templateUrl:'app/views/app.acc.dockdet.html'
})

export class AppAccDocDets implements OnInit{
    public table:string = 'table' ;
    public error=[] ;
    public doc:string ; 
    public formDatas:FormGroup ;
    public detData:FormGroup ; 
    public detRows=[] ;
    public allDetRows=[] ; 
    public emptyDoc={} ;
    public pager:any={};
    public editFlag = false ; 
    public editId   = undefined ;
    public orgId    = undefined ;
    public glId    = undefined ;
    public lgrname = undefined ;
    public emptyData = {id:-1,docid:1,glid:null,slid:null,describ:null,amount:null,crdr:null, orgid:null} ;


    public allgl = [] ; 
    public glrows = [] ; 
    public allsl  = [] ; 
    public slrows = [] ; 
    public slglrows   = [] ;
    constructor( private _data:AppDataService , private _common:AppCommonService , private _bldr:FormBuilder, private _route:Router, private _actrout:ActivatedRoute, private _loc:Location) { 
       this.doc =   this._actrout.snapshot.params['doc'] ;
       console.log(this.doc);

    };

    ngOnInit(){
       this.initSetup() ; 
       if (this.formDatas.controls['id'].value >= 0) {
            this._data.getData('docdet/'+this.formDatas.controls['id'].value )
            .subscribe(resp => {
               this.allDetRows = resp ;
               this._common.log(resp) ; 
               this.setPage(1) ;
               this.sumDetData() ;
               console.log('det row length'+this.detRows.length);
            }, error => {this.error = error  }) ;

       } ; 
       // get allgl anf glrows
       console.log('get gl' + this.orgId);
       this._data.getData('gl'  )
            .subscribe(resp => {
               this.allgl = resp ;
               console.log('get gl count ' + this.allgl.length);
               this.glrows = this.allgl.filter(_data =>  _data.orgid == this.orgId && _data.id !== this.glId ) ;
               console.log('get gl count ' + this.glrows.length);
       }, error => {this.error = error  }) ;

       // get allgl anf glrows
       console.log('get sl') ; 
       this._data.getData('sl' )
            .subscribe(resp => {
               this.allsl = resp ;
                console.log('get sl count ' + this.allsl.length);
               this.slrows = this.allsl.filter(_data => _data.orgid == this.orgId ) ;
               console.log('get sl count ' + this.slrows.length);
       }, error => {this.error = error  }) ;

    }


 onCancel(){
    console.log('cancel data') ; 
    this.editFlag = false ;
    this.editId   = undefined;
   // if (id==-1){ 
   //    this.detRows.splice(index, 1);
   // }
    this._loc.back() ;    
 }

 initSetup() {
       console.log(' initsetup  ');
       this.orgId    = this._common.getOrg() ;
       this.emptyDoc = JSON.parse(this.doc);
       console.log(this.emptyDoc);  
       this.formDatas =  this._bldr.group(this.emptyDoc);
       
       //this._bldr.group(this.formDatas) ;
       this.formDatas.controls['docdate'].setValue( this._common.sqlDt2Jdt(this.emptyDoc['docdate']) ) ;   
       this.formDatas.controls['refdate'].setValue( this._common.sqlDt2Jdt(this.emptyDoc['refdate']) ) ;
      
       console.log(' sl code' + this.emptyDoc['code']) ;

       if (this.emptyDoc['code'].value !== null && this.emptyDoc['code'] !== undefined) {
            
            this._data.getData('slbook' )
            .subscribe(resp => {
               let idx = this._common.findIndex(resp, 'code =="'+this.emptyDoc['code']+'"' ) ;
               if (idx > 0 ) {
                   this.lgrname = resp[idx].name  ;
                   this.glId   =  resp[idx].glid  ;
                    console.log(' gld id ' + this.glId)
               } 
            }, error => {this.error = error  }) ;

       }

 }

 glChange( _event) {
   console.log('gl chnge ' , _event) ; 
   this.initGlSl(_event);
 }

 initGlSl(glId:number) {
   console.log('initglsl');   
   let idx = this._common.findIndex(this.glrows, 'id=='+glId) ;
   if (idx >= 0) {
      let bookledger = this.glrows[idx].bookledger ;
      console.log('SL Code '+ bookledger) ;  
      if (bookledger == 'SL') {
          console.log ('sl rwos' + this.slrows.length ) ;
          this.slglrows = this.slrows.filter(_data =>  _data.glid==glId );
          console.log ('sl ros' + this.slglrows.length ) ;
      }else {
          this.slglrows=[] ; 
      }
   } 
 }

 initData(newData:boolean, doc:any){
    console.log('init data') ; 
    this.editFlag  = true ;
    this.editId    = -1;
    this.emptyData.orgid = this.formDatas.controls['orgid'].value ;
    this.emptyData.docid = this.formDatas.controls['id'].value ;
    this.emptyData.crdr = 'D' ;
    //if (this.formDatas.controls['crdr'].value  == 'C' ) {
    //   this.emptyData.crdr = 'D' ;
    //}

    this.detData = this._bldr.group(this.emptyData )
    if (!newData && doc ){
        console.log('edit data'); 
       this.editId   = doc.id ;
       this.detData = this._bldr.group(doc );
       this.initGlSl(doc.glid) ; 
       
    }
}   

sumDetData(){
    console.log('sum data ' + this.allDetRows.length) ;

    if (this.allDetRows.length > 0 ) { 
       if (this.allDetRows.length > 1 ) {  
          this.formDatas.controls['amount'].setValue(this.allDetRows.reduce((a,b) => a.amount+b.amount, 0 ) ) ;
       }else {
         console.log('sum data 2 ' + this.allDetRows[0].amount ) ;
         this.formDatas.controls['amount'].setValue(this.allDetRows[0].amount)  ; 
       } 
       console.log('sum data 2 ' + this.formDatas.controls['amount'].value ) ;
      
    }  
}
 
addDetData() {
    console.log('Add Data') ; 
    this.initData(true, null) ; 
    this.detRows.unshift(this.emptyData) ;
}

deleteDetData(id:number, index:number) {
       if (confirm( "Delete this detail? ")) {
          this._data.deleteData(this.table, id).subscribe(resp => {
               this._common.log( resp ) ;
               if (resp.affectedRows >= 1) { 
                  this.detRows.splice(index, 1);
                  let indx = this._common.findIndex(this.allDetRows, 'id=='+id ) ; 
                  if (indx >= 0 ) {
                      this.allDetRows.splice(indx, 1) ;

                  }
                  this.sumDetData() ;
               }     

                                
           }, error => this.error = error  )
       }   
}

editDetData(id:number, index:number) {
    console.log(' Data') ; 
    this.initData(false, this.detRows[index]) ; 

}

onDetCancel(id, index){
    console.log('cancel data') ; 
    this.editFlag = false ;
    this.editId   = undefined;
    if (id==-1){ 
       this.detRows.splice(index, 1);
    }
}



setPage(page:number){
    if ( page < 1 || page > this.pager.totalPages){
        return ;
    }
      this.pager = this._common.getPager(this.allDetRows.length, page,5);
      this.detRows= this.allDetRows.slice(this.pager.startIndex, this.pager.endIndex+1)

      console.log(this.detRows[0]) ;
    }


}    
