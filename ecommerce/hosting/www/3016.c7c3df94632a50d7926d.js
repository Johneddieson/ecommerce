(self.webpackChunkcom_trackingsystem=self.webpackChunkcom_trackingsystem||[]).push([[3016],{3016:(t,e,n)=>{"use strict";n.r(e),n.d(e,{Admintab3PageModule:()=>h});var o=n(8583),r=n(665),i=n(5214),a=n(6476),s=n(4762),c=n(8002),u=n(3018),d=n(1562),l=n(7810);function g(t,e){if(1&t&&(u.TgZ(0,"ion-item",8),u.TgZ(1,"ion-avatar",1),u._UZ(2,"img",9),u.qZA(),u.TgZ(3,"ion-label",10),u.TgZ(4,"h2",10),u._uU(5),u.qZA(),u.TgZ(6,"h3",10),u._uU(7),u.qZA(),u.TgZ(8,"p",10),u._uU(9),u.qZA(),u.TgZ(10,"p",10),u._uU(11),u.qZA(),u.qZA(),u.qZA()),2&t){const t=e.$implicit;u.xp6(2),u.s9C("src",t.ImageUrl,u.LSH),u.xp6(3),u.Oqu(t.ProductName),u.xp6(2),u.Oqu(t.Quantity),u.xp6(2),u.Oqu(t.Destination),u.xp6(2),u.Oqu(t.Datetime)}}const p=[{path:"",component:(()=>{class t{constructor(t,e,n,o){this.afauth=t,this.afstore=e,this.alertCtrl=n,this.router=o,this.inventoryList=[],this.inventoryList2=[],this.afauth.authState.subscribe(t=>{t&&t.uid&&(this.inventoryReference=this.afstore.collection("Inventory"),this.sub=this.inventoryReference.snapshotChanges().pipe((0,c.U)(t=>t.map(t=>Object.assign({id:t.payload.doc.id},t.payload.doc.data())))).subscribe(t=>{t=t.map((t,e)=>Object.assign({id:t.id,Datetime:t.Datetime,DatetimeToSort:t.DatetimeToSort,Destination:t.Destination,ImageUrl:t.ImageUrl,read:t.read,Quantity:t.Quantity,UnitPrice:t.UnitPrice,ProductName:t.ProductName})),console.log("the data",t),t=t.sort((t,e)=>Number(e.DatetimeToSort)-Number(t.DatetimeToSort)),this.inventoryList=t}))})}ProductName(t){return(0,s.mG)(this,void 0,void 0,function*(){return yield this.afstore.doc(`Products/${t}`).get().toPromise().then(t=>this.getProductName(t.data()))})}getProductName(t){return t.ProductName}ngOnInit(){}addproduct(){this.alertCtrl.create({header:"Choose",inputs:[{type:"radio",label:"POS",value:"POS"},{type:"radio",label:"View Products",value:"View Products"},{type:"radio",label:"Add Product",value:"Add Product"}],buttons:[{text:"Go",handler:t=>{console.log("data",t),"View Products"==t?this.router.navigateByUrl("/viewproducts"):"Add Product"==t?this.router.navigateByUrl("/add-product"):"POS"==t&&this.router.navigateByUrl("/createpos")}},{text:"Cancel",role:"cancel"}]}).then(t=>{t.present()})}}return t.\u0275fac=function(e){return new(e||t)(u.Y36(d.zQ),u.Y36(l.ST),u.Y36(i.Br),u.Y36(a.F0))},t.\u0275cmp=u.Xpm({type:t,selectors:[["app-admintab3"]],decls:11,vars:1,consts:[[1,"toolbar"],["slot","start"],["name","cart"],["slot","end"],["size","large","name","settings",1,"addproduct",3,"click"],["fullscreen",""],[1,"bg-transparent"],["color","none","lines","none",4,"ngFor","ngForOf"],["color","none","lines","none"],[3,"src"],[2,"font-weight","bolder"]],template:function(t,e){1&t&&(u.TgZ(0,"ion-header"),u.TgZ(1,"ion-toolbar",0),u.TgZ(2,"ion-buttons",1),u._UZ(3,"ion-icon",2),u.qZA(),u.TgZ(4,"ion-buttons",3),u.TgZ(5,"ion-icon",4),u.NdJ("click",function(){return e.addproduct()}),u.qZA(),u.qZA(),u.TgZ(6,"ion-title"),u._uU(7,"Inventory Movement"),u.qZA(),u.qZA(),u.qZA(),u.TgZ(8,"ion-content",5),u.TgZ(9,"ion-list",6),u.YNc(10,g,12,5,"ion-item",7),u.qZA(),u.qZA()),2&t&&(u.xp6(10),u.Q6J("ngForOf",e.inventoryList))},directives:[i.Gu,i.sr,i.Sm,i.gu,i.wd,i.W2,i.q_,o.sg,i.Ie,i.BJ,i.Q$],styles:[".toolbar[_ngcontent-%COMP%]{height:84px;--background:#69a03a;color:#fff;font-size:20px;line-height:84px}.bg-transparent[_ngcontent-%COMP%]{background:#0000}ion-content[_ngcontent-%COMP%]{--background:url(backgroundimage.35be21de00795f69fb68.jpg) no-repeat center center/cover;background:linear-gradient(120deg,#2980b9,#8e44ad)}"]}),t})()}];let m=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=u.oAB({type:t}),t.\u0275inj=u.cJS({imports:[[a.Bz.forChild(p)],a.Bz]}),t})(),h=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=u.oAB({type:t}),t.\u0275inj=u.cJS({imports:[[o.ez,r.u5,i.Pc,m]]}),t})()}}]);