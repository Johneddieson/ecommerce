(self.webpackChunkcom_trackingsystem=self.webpackChunkcom_trackingsystem||[]).push([[2071],{2071:(t,e,n)=>{"use strict";n.r(e),n.d(e,{CheckoutPageModule:()=>p});var i=n(8583),o=n(665),r=n(5214),a=n(6476),s=n(8002),c=n(6738),g=n(3018),l=n(1562),h=n(7810),m=n(1423);function u(t,e){if(1&t){const t=g.EpF();g.TgZ(0,"ion-item"),g.TgZ(1,"ion-thumbnail",1),g._UZ(2,"img",8),g.qZA(),g.TgZ(3,"ion-label"),g.TgZ(4,"h2"),g._uU(5),g.TgZ(6,"span",9),g._uU(7),g.ALo(8,"currency"),g.qZA(),g.qZA(),g._UZ(9,"h3"),g.TgZ(10,"p",10),g._uU(11),g.qZA(),g.TgZ(12,"div",11),g._UZ(13,"span",12),g._uU(14),g._UZ(15,"span",13),g.TgZ(16,"span",14),g.TgZ(17,"button",15),g.NdJ("click",function(){const e=g.CHM(t).$implicit;return g.oxw().singleDelete(e)}),g._uU(18," Remove"),g.qZA(),g.qZA(),g.qZA(),g.qZA(),g.qZA()}if(2&t){const t=e.$implicit;g.xp6(2),g.s9C("src",t.ImageUrl,g.LSH),g.xp6(3),g.hij("",t.ProductName," "),g.xp6(2),g.Oqu(g.xi3(8,5,t.UnitPrice,"\u20b1")),g.xp6(4),g.hij(" ",t.Stock," remaining stock"),g.xp6(3),g.hij(" ",t.Quantity," ")}}function d(t,e){if(1&t){const t=g.EpF();g.TgZ(0,"ion-button",16),g.NdJ("click",function(){return g.CHM(t),g.oxw().OrderNow()}),g._uU(1,"Confirm Order"),g.qZA()}}const f=[{path:"",component:(()=>{class t{constructor(t,e,n,i,o,r){this.alertCtrl=t,this.locationStrategy=e,this.router=n,this.afauth=i,this.afstore=o,this.msg=r,this.getCartDetails=[],this.total=0,this.cartItem=0,this.getOrders=[],this.myInformation={},this.afauth.authState.subscribe(t=>{t&&t.uid&&(this.meReference=o.doc(`users/${t.uid}`),this.sub=this.meReference.valueChanges().subscribe(t=>{this.myInformation=t,this.afstore.collection("Orders").snapshotChanges().pipe((0,s.U)(t=>t.map(t=>Object.assign({id:t.payload.doc.id},t.payload.doc.data())))).subscribe(t=>{this.getOrders=t,console.log("orders",this.getOrders);var e=this.getOrders;e=e.map((t,e)=>(console.log("orders",t),Object.assign({},t,{})))})}))})}ngOnInit(){this.CartDetails(),this.loadCart()}CartDetails(){sessionStorage.getItem("cart")&&(this.getCartDetails=JSON.parse(sessionStorage.getItem("cart")))}inc(t,e){for(let n=0;n<this.getCartDetails.length;n++)this.getCartDetails[n].id===t&&(this.getCartDetails[n].Quantity=e+1);sessionStorage.setItem("cart",JSON.stringify(this.getCartDetails)),this.loadCart()}dec(t,e){for(let n=0;n<this.getCartDetails.length;n++)this.getCartDetails[n].id===t&&1!=e&&(this.getCartDetails[n].Quantity=e-1);sessionStorage.setItem("cart",JSON.stringify(this.getCartDetails)),this.loadCart()}loadCart(){sessionStorage.getItem("cart")&&(this.getCartDetails=JSON.parse(sessionStorage.getItem("cart")),this.total=this.getCartDetails.reduce((t,e)=>t+e.UnitPrice*e.Quantity,0))}removeall(){sessionStorage.removeItem("cart"),this.getCartDetails=[],this.total=0,this.cartItem=0,this.msg.cartSubject.next(this.cartItem),this.loadCart()}singleDelete(t){if(sessionStorage.getItem("cart")){this.getCartDetails=JSON.parse(sessionStorage.getItem("cart"));for(let e=0;e<this.getCartDetails.length;e++)this.getCartDetails[e].id===t.id&&(this.getCartDetails.splice(e,1),sessionStorage.setItem("cart",JSON.stringify(this.getCartDetails)),this.loadCart(),this.cartItemFunc())}}cartItemFunc(){var t=JSON.parse(sessionStorage.getItem("cart"));this.cartItem=t.length,this.msg.cartSubject.next(this.cartItem)}gotohome(){this.router.navigate(["tabs"])}OrderNow(){this.alertCtrl.create({message:"Are you sure you want to finalize your order?",buttons:[{text:"Ok",handler:()=>{this.alertCtrl.create({message:"Ordered Successfully!",buttons:[{text:"Ok",role:"cancel"}]}).then(t=>{if(console.log("my info",this.myInformation),this.myInformation.FirstName&&this.myInformation.LastName&&this.myInformation.Address1&&this.myInformation.Address2&&this.myInformation.PhoneNumber){t.present();var e=c(new Date).format("DD-MM-YYYY hh:mm A");this.afstore.collection("Orders").add({OrderDetails:this.getCartDetails,BillingFirstname:this.myInformation.FirstName,BillingLastname:this.myInformation.LastName,BillingAddress1:this.myInformation.Address1,BillingAddress2:this.myInformation.Address2,BillingPhonenumber:this.myInformation.PhoneNumber,Billingemail:this.myInformation.Email,BillingIndexId:this.myInformation.Uid,Status:"Open",Datetime:e,TotalAmount:parseFloat(this.total.toString()).toFixed(2),DatetimeToSort:new Date}).then(t=>{}).catch(t=>{alert(t)}),this.removeall()}else this.alertCtrl.create({message:"Please fill up about your details first.",buttons:[{text:"Ok",handler:()=>{this.router.navigateByUrl("/tabs/tab3")}}]}).then(t=>{t.present()})})}},{text:"Cancel",role:"cancel"}]}).then(t=>{t.present()})}}return t.\u0275fac=function(e){return new(e||t)(g.Y36(r.Br),g.Y36(i.S$),g.Y36(a.F0),g.Y36(l.zQ),g.Y36(h.ST),g.Y36(m.g))},t.\u0275cmp=g.Xpm({type:t,selectors:[["app-checkout"]],decls:22,vars:6,consts:[[1,"toolbar"],["slot","start"],["name","checkbox",1,"buttonsactive"],[1,"container"],[4,"ngFor","ngForOf"],["size","7"],["size","5"],["color","light",3,"click",4,"ngIf"],[3,"src"],[2,"float","right","color","#69a03a"],[1,"rate"],["id","qty"],[1,"minus"],[1,"plus"],[2,"float","right"],["id","btn",3,"click"],["color","light",3,"click"]],template:function(t,e){1&t&&(g.TgZ(0,"ion-header"),g.TgZ(1,"ion-toolbar",0),g.TgZ(2,"ion-buttons",1),g._UZ(3,"ion-icon",2),g.qZA(),g.TgZ(4,"ion-title"),g._uU(5,"Check Out"),g.qZA(),g.qZA(),g.qZA(),g.TgZ(6,"ion-content"),g.TgZ(7,"div",3),g.TgZ(8,"ion-grid"),g.TgZ(9,"ion-row"),g.TgZ(10,"ion-col"),g.TgZ(11,"ion-list"),g.YNc(12,u,19,8,"ion-item",4),g.qZA(),g.qZA(),g.qZA(),g.qZA(),g.qZA(),g.qZA(),g.TgZ(13,"ion-footer"),g.TgZ(14,"ion-row"),g.TgZ(15,"ion-col",5),g.TgZ(16,"ion-text"),g.TgZ(17,"h4"),g._uU(18),g.ALo(19,"currency"),g.qZA(),g.qZA(),g.qZA(),g.TgZ(20,"ion-col",6),g.YNc(21,d,2,0,"ion-button",7),g.qZA(),g.qZA(),g.qZA()),2&t&&(g.xp6(12),g.Q6J("ngForOf",e.getCartDetails),g.xp6(6),g.hij("Total : ",g.xi3(19,3,e.total,"\u20b1")," "),g.xp6(3),g.Q6J("ngIf",e.total>0))},directives:[r.Gu,r.sr,r.Sm,r.gu,r.wd,r.W2,r.jY,r.Nd,r.wI,r.q_,i.sg,r.fr,r.yW,i.O5,r.Ie,r.Bs,r.Q$,r.YG],pipes:[i.H9],styles:[".toolbar[_ngcontent-%COMP%]{height:84px;--background:#69a03a;color:#fff;font-size:20px;line-height:84px}.buttonsactive[_ngcontent-%COMP%]:active{background-color:red;font-weight:500}.container[_ngcontent-%COMP%]{width:100%}.container[_ngcontent-%COMP%]   ion-thumbnail[_ngcontent-%COMP%]{width:100px!important;height:100px!important}.container[_ngcontent-%COMP%]   ion-thumbnail[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{border-radius:10px}.container[_ngcontent-%COMP%]   .rate[_ngcontent-%COMP%]{color:#ccc}.container[_ngcontent-%COMP%]   #qty[_ngcontent-%COMP%]{margin-top:5px}.container[_ngcontent-%COMP%]   #qty[_ngcontent-%COMP%]   .minus[_ngcontent-%COMP%]{font-weight:600;padding:5px;margin-right:20px;cursor:pointer}.container[_ngcontent-%COMP%]   #qty[_ngcontent-%COMP%]   .plus[_ngcontent-%COMP%]{margin-left:20px;font-weight:600;padding:5px;cursor:pointer}.container[_ngcontent-%COMP%]   #qty[_ngcontent-%COMP%]   #btn[_ngcontent-%COMP%]{padding:10px 20px;color:#fff;background-color:red}.container[_ngcontent-%COMP%]   #qty[_ngcontent-%COMP%]   #btn[_ngcontent-%COMP%]:active{background-color:#051542}.container[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{margin:10px;color:#69a03a}ion-footer[_ngcontent-%COMP%]{--background:#69a03a}ion-footer[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]{background:#69a03a;color:#fff}ion-footer[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]:last-child{text-align:end}"]}),t})()}];let C=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=g.oAB({type:t}),t.\u0275inj=g.cJS({imports:[[a.Bz.forChild(f)],a.Bz]}),t})(),p=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=g.oAB({type:t}),t.\u0275inj=g.cJS({imports:[[i.ez,o.u5,r.Pc,C]]}),t})()}}]);