(self.webpackChunkcom_trackingsystem=self.webpackChunkcom_trackingsystem||[]).push([[3831],{3831:(e,n,t)=>{"use strict";t.r(n),t.d(n,{Tab3PageModule:()=>m});var s=t(5214),o=t(6476),i=t(8583),r=t(665),a=t(3018),d=t(7810),l=t(1562);let c=(()=>{class e{constructor(e,n,t,s){this.afstore=e,this.afauth=n,this.loadingCtrl=t,this.alertCtrl=s,this.afauth.authState.subscribe(e=>{e&&e.uid&&(this.meReference=this.afstore.doc(`users/${e.uid}`),this.sub=this.meReference.valueChanges().subscribe(e=>{console.log("my information",e),this.firstname=e.FirstName,this.lastname=e.LastName,this.address1=e.Address1,this.address2=e.Address2,this.phonenumber=`${e.PhoneNumber}`}))})}Edit(){this.loadingCtrl.create({message:"Editing Please Wait..."}).then(e=>{e.present(),this.alertCtrl.create({message:"You edited your information successfully",buttons:[{text:"Ok",role:"cancel"}]}).then(n=>{setTimeout(()=>{e.dismiss(),n.present(),this.meReference.update({FirstName:this.firstname,LastName:this.lastname,Address1:this.address1,Address2:this.address2,PhoneNumber:this.phonenumber})},3e3)}).catch(e=>{})}).catch(e=>{})}}return e.\u0275fac=function(n){return new(n||e)(a.Y36(d.ST),a.Y36(l.zQ),a.Y36(s.HT),a.Y36(s.Br))},e.\u0275cmp=a.Xpm({type:e,selectors:[["app-tab3"]],decls:26,vars:5,consts:[[1,"wrapper"],["lines","none"],["position","floating"],["type","text","placeholder","First Name",3,"ngModel","ngModelChange"],["type","text","placeholder","Last Name",3,"ngModel","ngModelChange"],["type","text","placeholder","Address 1",3,"ngModel","ngModelChange"],["type","text","placeholder","Address 2",3,"ngModel","ngModelChange"],["type","number","placeholder","Phone Number",3,"ngModel","ngModelChange"],[3,"click"]],template:function(e,n){1&e&&(a.TgZ(0,"ion-content"),a.TgZ(1,"div",0),a.TgZ(2,"h3"),a._uU(3,"My Information"),a.qZA(),a.TgZ(4,"ion-item",1),a.TgZ(5,"ion-label",2),a._uU(6,"First Name"),a.qZA(),a.TgZ(7,"ion-input",3),a.NdJ("ngModelChange",function(e){return n.firstname=e}),a.qZA(),a.qZA(),a.TgZ(8,"ion-item",1),a.TgZ(9,"ion-label",2),a._uU(10,"Last Name"),a.qZA(),a.TgZ(11,"ion-input",4),a.NdJ("ngModelChange",function(e){return n.lastname=e}),a.qZA(),a.qZA(),a.TgZ(12,"ion-item",1),a.TgZ(13,"ion-label",2),a._uU(14,"Address1"),a.qZA(),a.TgZ(15,"ion-input",5),a.NdJ("ngModelChange",function(e){return n.address1=e}),a.qZA(),a.qZA(),a.TgZ(16,"ion-item",1),a.TgZ(17,"ion-label",2),a._uU(18,"Address2"),a.qZA(),a.TgZ(19,"ion-input",6),a.NdJ("ngModelChange",function(e){return n.address2=e}),a.qZA(),a.qZA(),a.TgZ(20,"ion-item",1),a.TgZ(21,"ion-label",2),a._uU(22,"Phone Number"),a.qZA(),a.TgZ(23,"ion-input",7),a.NdJ("ngModelChange",function(e){return n.phonenumber=e}),a.qZA(),a.qZA(),a.TgZ(24,"ion-button",8),a.NdJ("click",function(){return n.Edit()}),a._uU(25,"Edit"),a.qZA(),a.qZA(),a.qZA()),2&e&&(a.xp6(7),a.Q6J("ngModel",n.firstname),a.xp6(4),a.Q6J("ngModel",n.lastname),a.xp6(4),a.Q6J("ngModel",n.address1),a.xp6(4),a.Q6J("ngModel",n.address2),a.xp6(4),a.Q6J("ngModel",n.phonenumber))},directives:[s.W2,s.Ie,s.Q$,s.pK,s.j9,r.JJ,r.On,s.as,s.YG],styles:[".wrapper[_ngcontent-%COMP%]{width:90%;margin:10% auto}ion-item[_ngcontent-%COMP%]{margin:10% auto 3%;--background:#cac6c6;border-radius:10px}ion-footer[_ngcontent-%COMP%]{background:#fff;padding:20px;text-align:center;font-weight:600}#clickable[_ngcontent-%COMP%]{cursor:pointer}"]}),e})();var u=t(581);const g=[{path:"",component:c}];let h=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=a.oAB({type:e}),e.\u0275inj=a.cJS({imports:[[o.Bz.forChild(g)],o.Bz]}),e})(),m=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=a.oAB({type:e}),e.\u0275inj=a.cJS({imports:[[s.Pc,i.ez,r.u5,u.e,o.Bz.forChild([{path:"",component:c}]),h]]}),e})()}}]);