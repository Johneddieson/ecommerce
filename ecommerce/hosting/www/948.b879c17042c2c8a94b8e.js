(self.webpackChunkcom_trackingsystem=self.webpackChunkcom_trackingsystem||[]).push([[948],{948:(t,e,r)=>{"use strict";r.r(e),r.d(e,{EditproductPageModule:()=>F});var o=r(8583),n=r(665),i=r(5214),s=r(6476),a=r(6738),c=r(3018),l=r(1841),d=r(7810);function u(t,e){if(1&t&&c._UZ(0,"img",20),2&t){const t=c.oxw();c.s9C("src",t.photoLink,c.LSH)}}function g(t,e){1&t&&(c.TgZ(0,"ion-text",21),c._uU(1," Product Name shouldn't be empty "),c.qZA())}function m(t,e){if(1&t&&(c.TgZ(0,"ion-text",23),c._uU(1),c.qZA()),2&t){const t=c.oxw(2);c.xp6(1),c.hij(" ",t.registerForm.controls.firstname.errors.invalidMsg," ")}}function p(t,e){if(1&t&&(c.TgZ(0,"div",22),c.YNc(1,m,2,1,"ion-text",14),c.qZA()),2&t){const t=c.oxw();c.xp6(1),c.Q6J("ngIf",t.registerForm.controls.firstname.errors.invalidMsg)}}function h(t,e){1&t&&(c.TgZ(0,"ion-text",23),c._uU(1," Product Name must be minimum 5 characters long "),c.qZA())}function f(t,e){1&t&&(c.TgZ(0,"ion-text",23),c._uU(1," Stock of product shouldn't be empty "),c.qZA())}function b(t,e){if(1&t&&(c.TgZ(0,"ion-text",23),c._uU(1),c.qZA()),2&t){const t=c.oxw(2);c.xp6(1),c.hij(" ",t.registerForm.controls.cellphonenumber.errors.invalidMsg," ")}}function Z(t,e){if(1&t&&(c.TgZ(0,"div",22),c.YNc(1,b,2,1,"ion-text",14),c.qZA()),2&t){const t=c.oxw();c.xp6(1),c.Q6J("ngIf",t.registerForm.controls.cellphonenumber.errors.invalidMsg)}}function w(t,e){1&t&&(c.TgZ(0,"ion-text",23),c._uU(1," Price of product shouldn't be empty "),c.qZA())}function x(t,e){if(1&t&&(c.TgZ(0,"ion-text",23),c._uU(1),c.qZA()),2&t){const t=c.oxw(2);c.xp6(1),c.hij(" ",t.registerForm.controls.password.errors.invalidMsg," ")}}function v(t,e){if(1&t&&(c.TgZ(0,"div",22),c.YNc(1,x,2,1,"ion-text",14),c.qZA()),2&t){const t=c.oxw();c.xp6(1),c.Q6J("ngIf",t.registerForm.controls.password.errors.invalidMsg)}}const P=[{path:"",component:(()=>{class t{constructor(t,e,r,o,n,i){this.actRoute=t,this.http=e,this.formBuilder=r,this.loadingCtrl=o,this.alertCtrl=n,this.afstore=i,this.withPhoto=!1,this.isdisabled=!1,this.id=t.snapshot.paramMap.get("id"),this.productReference=this.afstore.doc(`Products/${this.id}`),this.sub=this.productReference.valueChanges().subscribe(t=>{this.productname=t.ProductName,this.stock=t.Stock.toString(),this.price=t.UnitPrice,this.photoLink=t.ImageUrl,this.withPhoto=!0,this.currentstock=t.Stock.toString()})}ngOnInit(){this.registerForm=new n.cw({firstname:new n.NI("",[n.kI.required,this.customPatternValid({pattern:/^([A-Z][a-z]*((\s[A-Za-z])?[a-z]*)*)$/,msg:"Always Starts With Capital Letter"}),this.customPatternValid({pattern:/^([^0-9]*)$/,msg:"Numbers is not allowed"}),n.kI.minLength(5)]),cellphonenumber:new n.NI("",[n.kI.required,this.customPatternValid({pattern:/^[+-]?(?:\d*[1-9]\d*(?:\.\d+)?|0+\.\d*[1-9]\d*)$/,msg:"This format is not allowed"}),this.customPatternValid({pattern:/^([^.?!-]*)$/,msg:"Negative is not allowed"}),this.customPatternValid({pattern:/^([^.?!_]*)$/,msg:"Under Score is not allowed"}),this.customPatternValid({pattern:/^([^.?!=]*)$/,msg:"Equal is not allowed"}),this.customPatternValid({pattern:/^([^.?!+]*)$/,msg:"Plus is not allowed"}),this.customPatternValid({pattern:/^([^.?!.]*)$/,msg:"Period is not allowed"})]),password:new n.NI("",[n.kI.required,this.customPatternValid({pattern:/^[+-]?(?:\d*[1-9]\d*(?:\.\d+)?|0+\.\d*[1-9]\d*)$/,msg:"This format is not allowed"}),this.customPatternValid({pattern:/^([^-]*)$/,msg:"Negative is not allowed"}),this.customPatternValid({pattern:/^([^?!_]*)$/,msg:"Under Score is not allowed"}),this.customPatternValid({pattern:/^([^?!=]*)$/,msg:"Equal is not allowed"}),this.customPatternValid({pattern:/^([^?!+]*)$/,msg:"Plus is not allowed"})])})}customPatternValid(t){return console.log("wew",t),e=>e.value&&!e.value.match(t.pattern)?{invalidMsg:t.msg}:null}reset(){console.log("wew",this.myInputVariable.value),this.myInputVariable.value=""}fileChanged(t){const e=t.target.files;console.log("the files",e);const r=new FormData;r.append("file",e[0]),r.append("UPLOADCARE_PUB_KEY","2f6b781d802ebb97d2e3"),this.http.post("https://upload.uploadcare.com/base/",r).subscribe(t=>{var r={events:t};for(var o in r){console.log("wew",r[o].file);for(const t of e)this.photoLink=`https://ucarecdn.com/${r[o].file}/${t.name}`}this.withPhoto=!0})}submit(){this.loadingCtrl.create({message:"Updating Product"}).then(t=>{t.present(),setTimeout(()=>{t.dismiss(),this.alertCtrl.create({header:"Officially Updated",message:"You updated the product successfully",buttons:[{text:"Ok",role:"cancel"}]}).then(t=>{t.present()}).catch(t=>{})},3e3)}).catch(t=>{});var t=a(new Date).format("DD-MM-YYYY hh:mm A");if(parseInt(this.registerForm.value.cellphonenumber)==parseInt(this.currentstock))this.productReference.update({Stock:parseInt(this.registerForm.value.cellphonenumber),UnitPrice:this.registerForm.value.password,ImageUrl:this.photoLink});else if(parseInt(this.registerForm.value.cellphonenumber)>parseInt(this.currentstock)){var e=parseInt(this.registerForm.value.cellphonenumber)-parseInt(this.currentstock);this.productReference.update({Stock:parseInt(this.registerForm.value.cellphonenumber),UnitPrice:this.registerForm.value.password,ImageUrl:this.photoLink}),this.afstore.collection("Inventory").add({Quantity:1*e,Datetime:t,read:!1,Destination:"Admin",ProductName:this.registerForm.value.firstname,UnitPrice:this.registerForm.value.password,ImageUrl:this.photoLink,DatetimeToSort:new Date})}else{var r=parseInt(this.currentstock)-parseInt(this.registerForm.value.cellphonenumber);this.productReference.update({Stock:parseInt(this.registerForm.value.cellphonenumber),UnitPrice:this.registerForm.value.password,ImageUrl:this.photoLink}),this.afstore.collection("Inventory").add({Quantity:-1*r,Datetime:t,read:!1,Destination:"Admin",ProductName:this.registerForm.value.firstname,UnitPrice:this.registerForm.value.password,ImageUrl:this.photoLink,DatetimeToSort:new Date})}}}return t.\u0275fac=function(e){return new(e||t)(c.Y36(s.gz),c.Y36(l.eN),c.Y36(n.qu),c.Y36(i.HT),c.Y36(i.Br),c.Y36(d.ST))},t.\u0275cmp=c.Xpm({type:t,selectors:[["app-editproduct"]],viewQuery:function(t,e){if(1&t&&c.Gf(i.pK,5),2&t){let t;c.iGM(t=c.CRH())&&(e.myInputVariable=t.first)}},decls:35,vars:14,consts:[[1,"toolbar"],["slot","start"],["name","pencil"],[1,"ion-padding","ion-text-center"],["class","camera",3,"src",4,"ngIf"],["type","file",3,"change"],[1,"form"],["hidden","","type","file","accept","image/*",1,"uploadfile",3,"change"],["inputFile",""],["novalidate","",3,"formGroup","ngSubmit"],["lines","none"],["placeholder","Enter product name","formControlName","firstname",3,"disabled","ngModel","ngModelChange"],["type","text","color","danger",4,"ngIf"],["class","error",4,"ngIf"],["color","danger",4,"ngIf"],["type","tel","placeholder","Enter Stock","formControlName","cellphonenumber",3,"ngModel","ngModelChange"],["type","tel","placeholder","Enter Price","formControlName","password",3,"ngModel","ngModelChange"],["type","submit","hidden",""],["btn",""],["color","dark","expand","block",3,"disabled","click"],[1,"camera",3,"src"],["type","text","color","danger"],[1,"error"],["color","danger"]],template:function(t,e){if(1&t){const t=c.EpF();c.TgZ(0,"ion-header"),c.TgZ(1,"ion-toolbar",0),c.TgZ(2,"ion-buttons",1),c._UZ(3,"ion-icon",2),c.qZA(),c.TgZ(4,"ion-title"),c._uU(5,"Edit Product"),c.qZA(),c.qZA(),c.qZA(),c.TgZ(6,"ion-content",3),c.YNc(7,u,1,1,"img",4),c.TgZ(8,"ion-input",5),c.NdJ("change",function(t){return e.fileChanged(t)}),c.qZA(),c._UZ(9,"br"),c._UZ(10,"br"),c._UZ(11,"br"),c._UZ(12,"br"),c._UZ(13,"br"),c.TgZ(14,"div",6),c.TgZ(15,"ion-input",7,8),c.NdJ("change",function(t){return e.fileChanged(t)}),c.qZA(),c.TgZ(17,"form",9),c.NdJ("ngSubmit",function(){return e.submit()}),c.TgZ(18,"ion-item",10),c.TgZ(19,"ion-input",11),c.NdJ("ngModelChange",function(t){return e.productname=t}),c.qZA(),c.qZA(),c.YNc(20,g,2,0,"ion-text",12),c.YNc(21,p,2,1,"div",13),c.YNc(22,h,2,0,"ion-text",14),c.TgZ(23,"ion-item",10),c.TgZ(24,"ion-input",15),c.NdJ("ngModelChange",function(t){return e.stock=t}),c.qZA(),c.qZA(),c.YNc(25,f,2,0,"ion-text",14),c.YNc(26,Z,2,1,"div",13),c.TgZ(27,"ion-item",10),c.TgZ(28,"ion-input",16),c.NdJ("ngModelChange",function(t){return e.price=t}),c.qZA(),c.qZA(),c.YNc(29,w,2,0,"ion-text",14),c.YNc(30,v,2,1,"div",13),c._UZ(31,"button",17,18),c.TgZ(33,"ion-button",19),c.NdJ("click",function(){return c.CHM(t),c.MAs(32).click()}),c._uU(34,"Update Product"),c.qZA(),c.qZA(),c.qZA(),c.qZA()}2&t&&(c.xp6(7),c.Q6J("ngIf",""!=e.photoLink),c.xp6(10),c.Q6J("formGroup",e.registerForm),c.xp6(2),c.Q6J("disabled",!e.isdisabled)("ngModel",e.productname),c.xp6(1),c.Q6J("ngIf",e.registerForm.get("firstname").hasError("required")&&e.registerForm.get("firstname").touched),c.xp6(1),c.Q6J("ngIf",!e.registerForm.controls.firstname.valid&&(e.registerForm.controls.firstname.dirty||e.registerForm.controls.firstname.touched)),c.xp6(1),c.Q6J("ngIf",e.registerForm.get("firstname").hasError("minlength")&&e.registerForm.get("firstname").touched),c.xp6(2),c.Q6J("ngModel",e.stock),c.xp6(1),c.Q6J("ngIf",e.registerForm.get("cellphonenumber").hasError("required")&&e.registerForm.get("cellphonenumber").touched),c.xp6(1),c.Q6J("ngIf",!e.registerForm.controls.cellphonenumber.valid&&(e.registerForm.controls.cellphonenumber.dirty||e.registerForm.controls.cellphonenumber.touched)),c.xp6(2),c.Q6J("ngModel",e.price),c.xp6(1),c.Q6J("ngIf",e.registerForm.get("password").hasError("required")&&e.registerForm.get("password").touched),c.xp6(1),c.Q6J("ngIf",!e.registerForm.controls.password.valid&&(e.registerForm.controls.password.dirty||e.registerForm.controls.password.touched)),c.xp6(3),c.Q6J("disabled",e.registerForm.invalid))},directives:[i.Gu,i.sr,i.Sm,i.gu,i.wd,i.W2,o.O5,i.pK,i.j9,n._Y,n.JL,n.sg,i.Ie,n.JJ,n.u,i.YG,i.yW],styles:[".toolbar[_ngcontent-%COMP%]{height:84px;--background:#69a03a;color:#fff;font-size:20px;line-height:84px}.camera[_ngcontent-%COMP%]{width:200px;height:128px;margin:0 auto}.logo[_ngcontent-%COMP%]{margin-top:6%}.logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:100px}.form[_ngcontent-%COMP%]{margin-top:-20px}.form[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]{border-radius:5px;border:2px solid grey;margin-bottom:10px}ion-button[_ngcontent-%COMP%]{text-transform:none}"]}),t})()}];let I=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=c.oAB({type:t}),t.\u0275inj=c.cJS({imports:[[s.Bz.forChild(P)],s.Bz]}),t})(),F=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=c.oAB({type:t}),t.\u0275inj=c.cJS({imports:[[o.ez,n.u5,i.Pc,n.UX,I]]}),t})()}}]);