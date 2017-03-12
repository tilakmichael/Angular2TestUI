import { AppAccDocDet } from './../scripts/app.acc.docdet';
import { AppAccDoc } from './../scripts/app.acc.doc';
import {Routes, RouterModule, provideRoutes } from '@angular/router' ;
import {ModuleWithProviders} from '@angular/core' ; 


import {AppAccGl} from '../scripts/app.acc.gl';
import {AppAccOrgs} from '../scripts/app.acc.orgs' ;
import {AppAccHome} from '../scripts/app.acc.home' ; 
import {AppAccLookups } from '../scripts/app.acc.lookups' ; 
import {AppAccTypes} from '../scripts/app.acc.types' ;
import {AppAccPeriod} from '../scripts/app.acc.period' ;
import {AppAccSlBook} from '../scripts/app.acc.slbook' ;
import { AppAccBook} from '../scripts/app.acc.book' ; 
import { AppAccSl} from '../scripts/app.acc.sl' ;
import { AppAccDocs} from '../scripts/app.acc.doc' ;
import { AppAccDocDets} from '../scripts/app.acc.docdet';


const routes:Routes=[
    {path:'', component:AppAccHome} , 
    {path:'orgs', component:AppAccOrgs} ,
    {path:'lookups', component:AppAccLookups},
    {path:'types', component:AppAccTypes} ,
    {path:'period', component:AppAccPeriod}, 
    {path:'gl', component:AppAccGl},
    {path:'slbook', component:AppAccSlBook},
    {path:'book', component:AppAccBook},
    {path:'sl', component:AppAccSl},   
    {path:'doc', component:AppAccDocs},
    {path:'docdet/:doc', component:AppAccDocDets},   
] ;

export const MenuRoutes: ModuleWithProviders = RouterModule.forRoot(routes) ;
export const MenuComponents = [ AppAccOrgs, AppAccTypes,AppAccLookups,AppAccHome,AppAccPeriod, AppAccGl,AppAccSlBook,AppAccBook,AppAccSl,AppAccDocs,AppAccDocDets] ; 

