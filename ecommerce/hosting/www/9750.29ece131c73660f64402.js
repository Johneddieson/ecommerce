(self.webpackChunkcom_trackingsystem=self.webpackChunkcom_trackingsystem||[]).push([[9750],{9750:(e,t,i)=>{"use strict";i.r(t),i.d(t,{Admintab2PageModule:()=>h});var n=i(8583),o=i(665),a=i(5214),r=i(6476),l=i(8002),s=i(3018),c=i(7810),d=i(1562);function u(e,t){if(1&e&&(s.TgZ(0,"ion-item",9),s.TgZ(1,"ion-avatar",10),s._UZ(2,"img",11),s.qZA(),s.TgZ(3,"ion-label"),s.TgZ(4,"h2"),s._uU(5),s.qZA(),s.TgZ(6,"h3"),s._uU(7),s.qZA(),s.TgZ(8,"p"),s._uU(9),s.qZA(),s.TgZ(10,"p"),s._uU(11),s.qZA(),s.TgZ(12,"p"),s._uU(13),s.qZA(),s.TgZ(14,"p"),s._uU(15),s.qZA(),s.TgZ(16,"p"),s._uU(17),s.ALo(18,"currency"),s.qZA(),s.qZA(),s.qZA()),2&e){const e=t.$implicit,i=s.oxw().$implicit;s.xp6(2),s.s9C("src",e.ImageUrl,s.LSH),s.xp6(3),s.hij("Product Name: ",e.ProductName,""),s.xp6(2),s.hij("Email: ",i.Billingemail,""),s.xp6(2),s.hij("Address1: ",i.BillingAddress1,""),s.xp6(2),s.hij("Address2: ",i.BillingAddress2,""),s.xp6(2),s.hij("Phone Number: ",i.BillingPhonenumber,""),s.xp6(2),s.hij("Quantity: ",e.Quantity,""),s.xp6(2),s.hij("Unit Price: ",s.xi3(18,8,e.UnitPrice,"\u20b1"),"")}}function g(e,t){if(1&e&&(s.TgZ(0,"ion-accordion"),s.TgZ(1,"ion-item",5),s.TgZ(2,"ion-label",6),s._uU(3),s._UZ(4,"br"),s._uU(5),s._UZ(6,"br"),s._uU(7),s.ALo(8,"currency"),s._UZ(9,"br"),s._uU(10),s.qZA(),s.qZA(),s.TgZ(11,"ion-list",7),s.YNc(12,u,19,11,"ion-item",8),s.qZA(),s.qZA()),2&e){const e=t.$implicit;s.xp6(3),s.AsE("",e.BillingFirstname," ",e.BillingLastname,""),s.xp6(2),s.hij(" Date Ordered : ",e.Datetime," "),s.xp6(2),s.hij(" Total Amount : ",s.xi3(8,6,e.TotalAmount,"\u20b1")," "),s.xp6(3),s.hij(" Status : ",e.Status," "),s.xp6(2),s.Q6J("ngForOf",e.OrderDetails)}}const p=[{path:"",component:(()=>{class e{constructor(e,t,i,n,o){this.afstore=e,this.afauth=t,this.router=i,this.currencyPipe=n,this.alertCtrl=o,this.allPendingOrders=[],this.afauth.authState.subscribe(e=>{e&&e.uid&&(this.productReference=this.afstore.collection("History"),this.sub=this.productReference.snapshotChanges().pipe((0,l.U)(e=>e.map(e=>Object.assign({id:e.payload.doc.id},e.payload.doc.data())))).subscribe(e=>{console.log("all orders",e),e=(e=e.map((e,t)=>Object.assign({BillingAddress1:e.BillingAddress1,BillingAddress2:e.BillingAddress2,BillingFirstname:e.BillingFirstname,BillingIndexId:e.BillingIndexId,BillingLastname:e.BillingLastname,BillingPhonenumber:e.BillingPhonenumber,Billingemail:e.Billingemail,Datetime:e.Datetime,Status:"Closed"==e.Status?"Approved":"Cancelled",TotalAmount:e.TotalAmount,id:e.id,DatetimeToSort:e.DatetimeToSort,OrderDetails:e.OrderDetails}))).sort((e,t)=>Number(t.DatetimeToSort)-Number(e.DatetimeToSort)),console.log("the data",e),this.allPendingOrders=e}))})}ngOnInit(){}addproduct(){this.alertCtrl.create({header:"Choose",inputs:[{type:"radio",label:"POS",value:"POS"},{type:"radio",label:"View Products",value:"View Products"},{type:"radio",label:"Add Product",value:"Add Product"},{type:"radio",label:"Change Password",value:"Change Password"}],buttons:[{text:"Go",handler:e=>{console.log("data",e),"View Products"==e?this.router.navigateByUrl("/viewproducts"):"Add Product"==e?this.router.navigateByUrl("/add-product"):"POS"==e&&this.router.navigateByUrl("/createpos")}},{text:"Cancel",role:"cancel"}]}).then(e=>{e.present()})}}return e.\u0275fac=function(t){return new(t||e)(s.Y36(c.ST),s.Y36(d.zQ),s.Y36(r.F0),s.Y36(n.H9),s.Y36(a.Br))},e.\u0275cmp=s.Xpm({type:e,selectors:[["app-admintab2"]],decls:9,vars:1,consts:[[1,"toolbar"],["slot","end"],["size","large","name","settings",1,"addproduct",3,"click"],["multiple","true"],[4,"ngFor","ngForOf"],["slot","header","lines","none"],[1,"labelname"],["slot","content"],["lines","none",4,"ngFor","ngForOf"],["lines","none"],["slot","start"],[3,"src"]],template:function(e,t){1&e&&(s.TgZ(0,"ion-header"),s.TgZ(1,"ion-toolbar",0),s.TgZ(2,"ion-buttons",1),s.TgZ(3,"ion-icon",2),s.NdJ("click",function(){return t.addproduct()}),s.qZA(),s.qZA(),s.TgZ(4,"ion-title"),s._uU(5,"History"),s.qZA(),s.qZA(),s.qZA(),s.TgZ(6,"ion-content"),s.TgZ(7,"ion-accordion-group",3),s.YNc(8,g,13,9,"ion-accordion",4),s.qZA(),s.qZA()),2&e&&(s.xp6(8),s.Q6J("ngForOf",t.allPendingOrders))},directives:[a.Gu,a.sr,a.Sm,a.gu,a.wd,a.W2,a.eh,n.sg,a.We,a.Ie,a.Q$,a.q_,a.BJ],pipes:[n.H9],styles:[".toolbar[_ngcontent-%COMP%]{height:84px;--background:#69a03a;color:#fff;font-size:20px;line-height:84px}.addproduct[_ngcontent-%COMP%]{cursor:pointer}.addproduct[_ngcontent-%COMP%]:active{color:red}.labeldate[_ngcontent-%COMP%]{font-family:Verdana,Geneva,Tahoma,sans-serif;font-weight:900}.labelname[_ngcontent-%COMP%]{font-family:Trebuchet MS,Lucida Sans Unicode,Lucida Grande,Lucida Sans,Arial,sans-serif;font-weight:900;font-size:18px;color:#2f0101}.totalamount[_ngcontent-%COMP%]{font-family:Gill Sans,Gill Sans MT,Calibri,Trebuchet MS,sans-serif;font-weight:bolder}ion-accordion.accordion-expanded[_ngcontent-%COMP%]   ion-item[slot=header][_ngcontent-%COMP%]{--background:#69a03a;--color:#fff}"]}),e})()}];let m=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=s.oAB({type:e}),e.\u0275inj=s.cJS({imports:[[r.Bz.forChild(p)],r.Bz]}),e})(),h=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=s.oAB({type:e}),e.\u0275inj=s.cJS({imports:[[n.ez,o.u5,a.Pc,m]]}),e})()}}]);