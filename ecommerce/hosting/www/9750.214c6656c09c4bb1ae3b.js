(self.webpackChunkcom_trackingsystem=self.webpackChunkcom_trackingsystem||[]).push([[9750],{9750:(e,t,n)=>{"use strict";n.r(t),n.d(t,{Admintab2PageModule:()=>h});var o=n(8583),i=n(665),r=n(5214),a=n(6476),c=n(8002),l=n(3018),s=n(7810),d=n(1562);function u(e,t){if(1&e&&(l.TgZ(0,"ion-item",12),l.TgZ(1,"ion-avatar",13),l._UZ(2,"img",14),l.qZA(),l.TgZ(3,"ion-label"),l.TgZ(4,"h2",15),l._uU(5),l.qZA(),l.TgZ(6,"p",15),l._uU(7),l.qZA(),l.TgZ(8,"p",15),l._uU(9),l.ALo(10,"currency"),l.qZA(),l.qZA(),l.qZA()),2&e){const e=t.$implicit;l.xp6(2),l.s9C("src",e.ImageUrl,l.LSH),l.xp6(3),l.hij("Product Name: ",e.ProductName,""),l.xp6(2),l.hij("Quantity: ",e.Quantity,""),l.xp6(2),l.hij("Unit Price: ",l.xi3(10,4,e.UnitPrice,"\u20b1"),"")}}function g(e,t){if(1&e&&(l.TgZ(0,"ion-accordion"),l.TgZ(1,"ion-item",8),l.TgZ(2,"ion-label",9),l._uU(3),l._UZ(4,"br"),l._uU(5),l._UZ(6,"br"),l._uU(7),l._UZ(8,"br"),l._uU(9),l._UZ(10,"br"),l._uU(11),l._UZ(12,"br"),l._uU(13),l._UZ(14,"br"),l._uU(15),l._UZ(16,"br"),l._uU(17),l.ALo(18,"currency"),l._UZ(19,"br"),l._uU(20),l.qZA(),l.qZA(),l.TgZ(21,"ion-list",10),l.YNc(22,u,11,7,"ion-item",11),l.qZA(),l.qZA()),2&e){const e=t.$implicit;l.xp6(3),l.AsE(" Fullname : ",e.BillingFirstname," ",e.BillingLastname," "),l.xp6(2),l.hij(" Email: ",e.Billingemail," "),l.xp6(2),l.hij(" Address: ",e.BillingAddress1," "),l.xp6(2),l.hij(" Phone Number: ",e.BillingPhonenumber," "),l.xp6(2),l.hij(" Date Ordered : ",e.Datetime," "),l.xp6(2),l.hij(" Discount : ",e.Discount," "),l.xp6(2),l.hij(" Payment : ",e.PaymentMethod," "),l.xp6(2),l.hij(" Total Amount : ",l.xi3(18,11,e.TotalAmount,"\u20b1")," "),l.xp6(3),l.hij(" Status : ",e.Status," "),l.xp6(2),l.Q6J("ngForOf",e.OrderDetails)}}const p=[{path:"",component:(()=>{class e{constructor(e,t,n,o,i){this.afstore=e,this.afauth=t,this.router=n,this.currencyPipe=o,this.alertCtrl=i,this.allPendingOrders=[],this.afauth.authState.subscribe(e=>{e&&e.uid&&(this.productReference=this.afstore.collection("History"),this.sub=this.productReference.snapshotChanges().pipe((0,c.U)(e=>e.map(e=>Object.assign({id:e.payload.doc.id},e.payload.doc.data())))).subscribe(e=>{e=(e=e.map((e,t)=>Object.assign({BillingAddress1:e.BillingAddress1,BillingAddress2:e.BillingAddress2,BillingFirstname:e.BillingFirstname,BillingIndexId:e.BillingIndexId,BillingLastname:e.BillingLastname,BillingPhonenumber:e.BillingPhonenumber,Billingemail:e.Billingemail,Datetime:e.Datetime,Status:e.Status,TotalAmount:e.TotalAmount,id:e.id,DatetimeToSort:e.DatetimeToSort,OrderDetails:e.OrderDetails,Discount:e.Discount,PaymentMethod:e.PaymentMethod}))).sort((e,t)=>Number(t.DatetimeToSort)-Number(e.DatetimeToSort)),console.log("the data",e),this.allPendingOrders=e}))})}ngOnInit(){}addproduct(){this.alertCtrl.create({header:"Choose",inputs:[{type:"radio",label:"POS",value:"POS"},{type:"radio",label:"View Products",value:"View Products"},{type:"radio",label:"Add Product",value:"Add Product"},{type:"radio",label:"Inventory",value:"Inventory"}],buttons:[{text:"Go",handler:e=>{console.log("data",e),"View Products"==e?this.router.navigateByUrl("/viewproducts"):"Add Product"==e?this.router.navigateByUrl("/add-product"):"POS"==e?this.router.navigateByUrl("/createpos"):"Inventory"==e&&this.router.navigateByUrl("/inventory")}},{text:"Cancel",role:"cancel"}]}).then(e=>{e.present()})}}return e.\u0275fac=function(t){return new(t||e)(l.Y36(s.ST),l.Y36(d.zQ),l.Y36(a.F0),l.Y36(o.H9),l.Y36(r.Br))},e.\u0275cmp=l.Xpm({type:e,selectors:[["app-admintab2"]],decls:12,vars:1,consts:[[1,"toolbar"],["slot","end"],[1,"addproduct",3,"click"],["size","large","name","settings"],["hidden","",1,"addproduct"],["size","large","name","text-outline"],["multiple","true"],[4,"ngFor","ngForOf"],["slot","header","lines","none"],["text-wrap","",1,"labelname",2,"font-weight","1000","color","black"],["slot","content",1,"bg-transparent"],["color","none","lines","none",4,"ngFor","ngForOf"],["color","none","lines","none"],["slot","start"],[3,"src"],[2,"font-weight","1000","color","white"]],template:function(e,t){1&e&&(l.TgZ(0,"ion-header"),l.TgZ(1,"ion-toolbar",0),l.TgZ(2,"ion-buttons",1),l.TgZ(3,"ion-button",2),l.NdJ("click",function(){return t.addproduct()}),l._UZ(4,"ion-icon",3),l.qZA(),l.TgZ(5,"ion-button",4),l._UZ(6,"ion-icon",5),l.qZA(),l.qZA(),l.TgZ(7,"ion-title"),l._uU(8,"History"),l.qZA(),l.qZA(),l.qZA(),l.TgZ(9,"ion-content"),l.TgZ(10,"ion-accordion-group",6),l.YNc(11,g,23,14,"ion-accordion",7),l.qZA(),l.qZA()),2&e&&(l.xp6(11),l.Q6J("ngForOf",t.allPendingOrders))},directives:[r.Gu,r.sr,r.Sm,r.YG,r.gu,r.wd,r.W2,r.eh,o.sg,r.We,r.Ie,r.Q$,r.q_,r.BJ],pipes:[o.H9],styles:[".toolbar[_ngcontent-%COMP%]{height:84px;--background:#69a03a;color:#fff;font-size:20px;line-height:84px}.addproduct[_ngcontent-%COMP%]{cursor:pointer}.addproduct[_ngcontent-%COMP%]:active{color:red}.labeldate[_ngcontent-%COMP%]{font-family:Verdana,Geneva,Tahoma,sans-serif;font-weight:900}.labelname[_ngcontent-%COMP%]{font-family:Trebuchet MS,Lucida Sans Unicode,Lucida Grande,Lucida Sans,Arial,sans-serif;font-weight:900;font-size:18px;color:#2f0101}.totalamount[_ngcontent-%COMP%]{font-family:Gill Sans,Gill Sans MT,Calibri,Trebuchet MS,sans-serif;font-weight:bolder}ion-accordion.accordion-expanded[_ngcontent-%COMP%]   ion-item[slot=header][_ngcontent-%COMP%]{--background:url(backgroundimage.35be21de00795f69fb68.jpg) no-repeat center center/cover}ion-accordion.accordion-collapsed[_ngcontent-%COMP%]   ion-item[slot=header][_ngcontent-%COMP%]{--background:url(backgroundimage3.5f20fa4f128f1fd27053.jpg) no-repeat center center/cover}ion-accordion.accordion-expanded[_ngcontent-%COMP%]   [slot=content][_ngcontent-%COMP%], ion-accordion.accordion-expanding[_ngcontent-%COMP%]   [slot=content][_ngcontent-%COMP%]{--ion-item-background:url(backgroundimage2.2480a2c01d0396aec9a7.jpg) no-repeat center center/cover}"]}),e})()}];let m=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=l.oAB({type:e}),e.\u0275inj=l.cJS({imports:[[a.Bz.forChild(p)],a.Bz]}),e})(),h=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=l.oAB({type:e}),e.\u0275inj=l.cJS({imports:[[o.ez,i.u5,r.Pc,m]]}),e})()}}]);