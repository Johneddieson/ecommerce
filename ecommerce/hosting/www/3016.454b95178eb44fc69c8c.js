(self.webpackChunkcom_trackingsystem=self.webpackChunkcom_trackingsystem||[]).push([[3016],{3016:(t,e,r)=>{"use strict";r.r(e),r.d(e,{Admintab3PageModule:()=>b});var o=r(8583),n=r(665),a=r(5214),i=r(6476),c=r(4762),s=r(8002),u=r(3018),l=r(1562),d=r(7810);function g(t,e){if(1&t&&(u.TgZ(0,"ion-item",9),u.TgZ(1,"ion-avatar",1),u._UZ(2,"img",10),u.qZA(),u.TgZ(3,"ion-label",11),u.TgZ(4,"h2",11),u._uU(5),u.qZA(),u.TgZ(6,"h3",11),u._uU(7),u.qZA(),u.TgZ(8,"p",11),u._uU(9),u.qZA(),u.qZA(),u.qZA()),2&t){const t=e.$implicit;u.xp6(2),u.s9C("src",t.ImageUrl,u.LSH),u.xp6(3),u.Oqu(t.Category),u.xp6(2),u.Oqu(t.ProductName),u.xp6(2),u.hij("",t.Stock," grams")}}const h=[{path:"",component:(()=>{class t{constructor(t,e,r,o){this.afauth=t,this.afstore=e,this.alertCtrl=r,this.router=o,this.inventoryList=[],this.inventoryList2=[],this.afauth.authState.subscribe(t=>{})}ProductName(t){return(0,c.mG)(this,void 0,void 0,function*(){return yield this.afstore.doc(`Products/${t}`).get().toPromise().then(t=>this.getProductName(t.data()))})}getProductName(t){return t.ProductName}ngOnInit(){this.queryProducts("")}addproduct(){this.alertCtrl.create({header:"Choose",inputs:[{type:"radio",label:"POS",value:"POS"},{type:"radio",label:"View Products",value:"View Products"},{type:"radio",label:"Add Product",value:"Add Product"}],buttons:[{text:"Go",handler:t=>{console.log("data",t),"View Products"==t?this.router.navigateByUrl("/viewproducts"):"Add Product"==t?this.router.navigateByUrl("/add-product"):"POS"==t&&this.router.navigateByUrl("/createpos")}},{text:"Cancel",role:"cancel"}]}).then(t=>{t.present()})}queryProducts(t){return(0,c.mG)(this,void 0,void 0,function*(){this.inventoryReference=this.afstore.collection("Products"),this.sub=this.inventoryReference.snapshotChanges().pipe((0,s.U)(t=>t.map(t=>Object.assign({id:t.payload.doc.id},t.payload.doc.data())))).subscribe(e=>{e=e.sort(function(t,e){return t.ProductName<e.ProductName?-1:t.ProductName>e.ProductName?1:0}),e=""==t?e:e.filter(e=>e.Category==t),this.inventoryList=e})})}SearchCategory(){return(0,c.mG)(this,void 0,void 0,function*(){var t=yield this.alertCtrl.create({header:"Search Category",inputs:[{type:"radio",label:"--SHOW ALL--",value:""},{type:"radio",label:"Milktea",value:"Milktea"},{type:"radio",label:"Fruit tea",value:"Fruit tea"},{type:"radio",label:"Slushee",value:"Slushee"}],buttons:[{text:"Search",handler:t=>{this.queryProducts(t)}},{text:"Close",role:"cancel"}]});yield t.present()})}}return t.\u0275fac=function(e){return new(e||t)(u.Y36(l.zQ),u.Y36(d.ST),u.Y36(a.Br),u.Y36(i.F0))},t.\u0275cmp=u.Xpm({type:t,selectors:[["app-admintab3"]],decls:12,vars:1,consts:[[1,"toolbar"],["slot","start"],["name","arrow-back-outline","slot","icon-only","routerLink","/adminpage/atab1",2,"cursor","pointer"],["fullscreen",""],[1,"bg-transparent"],["color","none","lines","none",4,"ngFor","ngForOf"],["vertical","bottom","horizontal","end","slot","fixed"],["color","tertiary",3,"click"],["name","search-outline"],["color","none","lines","none"],[3,"src"],[2,"font-weight","bolder"]],template:function(t,e){1&t&&(u.TgZ(0,"ion-header"),u.TgZ(1,"ion-toolbar",0),u.TgZ(2,"ion-buttons",1),u._UZ(3,"ion-icon",2),u.qZA(),u.TgZ(4,"ion-title"),u._uU(5,"Inventory"),u.qZA(),u.qZA(),u.qZA(),u.TgZ(6,"ion-content",3),u.TgZ(7,"ion-list",4),u.YNc(8,g,10,4,"ion-item",5),u.qZA(),u.TgZ(9,"ion-fab",6),u.TgZ(10,"ion-fab-button",7),u.NdJ("click",function(){return e.SearchCategory()}),u._UZ(11,"ion-icon",8),u.qZA(),u.qZA(),u.qZA()),2&t&&(u.xp6(8),u.Q6J("ngForOf",e.inventoryList))},directives:[a.Gu,a.sr,a.Sm,a.gu,a.YI,i.rH,a.wd,a.W2,a.q_,o.sg,a.IJ,a.W4,a.Ie,a.BJ,a.Q$],styles:[".toolbar[_ngcontent-%COMP%]{height:84px;--background:#69a03a;color:#fff;font-size:20px;line-height:84px}.addproduct[_ngcontent-%COMP%]{cursor:pointer}.addproduct[_ngcontent-%COMP%]:active{color:red}.bg-transparent[_ngcontent-%COMP%]{background:#0000}ion-content[_ngcontent-%COMP%]{--background:url(backgroundimage.35be21de00795f69fb68.jpg) no-repeat center center/cover;background:linear-gradient(120deg,#2980b9,#8e44ad)}"]}),t})()}];let p=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=u.oAB({type:t}),t.\u0275inj=u.cJS({imports:[[i.Bz.forChild(h)],i.Bz]}),t})(),b=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=u.oAB({type:t}),t.\u0275inj=u.cJS({imports:[[o.ez,n.u5,a.Pc,p]]}),t})()}}]);