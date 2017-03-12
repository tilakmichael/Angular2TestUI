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

    public doc:string ; 
    public formDatas:FormGroup ;
    public detData:FormGroup ; 
    public detRows=[] ; 
    public emptyDoc={} ;
    

    constructor( private _data:AppDataService , private _common:AppCommonService , private _bldr:FormBuilder, private _route:Router, private _actrout:ActivatedRoute, private _loc:Location) { 
       this.doc =   this._actrout.snapshot.params['doc'] ;
       console.log(this.doc);

    };

    ngOnInit(){
       console.log('doc: '+this.doc);
       this.emptyDoc = JSON.parse(this.doc);
       this.formDatas =  this._bldr.group(this.emptyDoc);
       console.log( this.emptyDoc['id']) ;



    }

}    
