(self.webpackChunkcom_trackingsystem=self.webpackChunkcom_trackingsystem||[]).push([[6976],{6976:(t,e,n)=>{"use strict";n.r(e),n.d(e,{AdmincheckoutPageModule:()=>O});var i=n(8583),a=n(665),o=n(5214),r=n(6476),s=n(6738),c=n(8002),l=n(2329),g=n(3018),h=n(1562),u=n(7810),m=n(1423);function d(t,e){if(1&t){const t=g.EpF();g.TgZ(0,"ion-item"),g.TgZ(1,"ion-thumbnail",1),g._UZ(2,"img",8),g.qZA(),g.TgZ(3,"ion-label"),g.TgZ(4,"h2"),g._uU(5),g.TgZ(6,"span",9),g._uU(7),g.ALo(8,"currency"),g.qZA(),g.qZA(),g._UZ(9,"h3"),g.TgZ(10,"p",10),g._uU(11),g.qZA(),g.TgZ(12,"div",11),g._UZ(13,"span",12),g._uU(14),g._UZ(15,"span",13),g.TgZ(16,"span",14),g.TgZ(17,"button",15),g.NdJ("click",function(){const e=g.CHM(t).$implicit;return g.oxw().singleDelete(e)}),g._uU(18," Remove"),g.qZA(),g.qZA(),g.qZA(),g.qZA(),g.qZA()}if(2&t){const t=e.$implicit;g.xp6(2),g.s9C("src",t.ImageUrl,g.LSH),g.xp6(3),g.hij("",t.ProductName," "),g.xp6(2),g.Oqu(g.xi3(8,5,t.UnitPrice,"\u20b1")),g.xp6(4),g.hij(" ",t.Stock," remaining stock"),g.xp6(3),g.hij(" ",t.Quantity," ")}}function C(t,e){if(1&t){const t=g.EpF();g.TgZ(0,"ion-button",16),g.NdJ("click",function(){return g.CHM(t),g.oxw().OrderNow()}),g._uU(1,"Confirm Order"),g.qZA()}}const p=[{path:"",component:(()=>{class t{constructor(t,e,n,i,a,o){this.alertCtrl=t,this.locationStrategy=e,this.router=n,this.afauth=i,this.afstore=a,this.msg=o,this.getCartDetails=[],this.getCurrentProductDetails=[],this.total=0,this.cartItem=0,this.getOrders=[],this.myInformation={},this.afauth.authState.subscribe(t=>{t&&t.uid&&(this.stockRefence=this.afstore.collection("Products"),this.stockRefence.snapshotChanges().pipe((0,c.U)(t=>t.map(t=>Object.assign({id:t.payload.doc.id},t.payload.doc.data())))).subscribe(t=>{this.getCartDetails=JSON.parse(sessionStorage.getItem("cart"));var e,n=(e=t,this.getCartDetails.map(t=>Object.assign({},Object.assign({},t,{Stock:e.find(e=>e.id===t.id&&e).Stock,Category:t.Category,ImageUrl:t.ImageUrl,ProductName:t.ProductName,Quantity:t.Quantity,UnitPrice:t.UnitPrice,id:t.id}))));sessionStorage.removeItem("cart"),this.getCartDetails=sessionStorage.setItem("cart",JSON.stringify(n)),this.CartDetails()}),this.meReference=a.doc(`users/${t.uid}`),this.sub=this.meReference.valueChanges().subscribe(t=>{this.myInformation=t}))})}ngOnInit(){this.CartDetails(),this.loadCart()}CartDetails(){sessionStorage.getItem("cart")&&(this.getCartDetails=JSON.parse(sessionStorage.getItem("cart")))}inc(t,e){for(let n=0;n<this.getCartDetails.length;n++)this.getCartDetails[n].id===t&&(this.getCartDetails[n].Quantity=e+1);sessionStorage.setItem("cart",JSON.stringify(this.getCartDetails)),this.loadCart()}dec(t,e){for(let n=0;n<this.getCartDetails.length;n++)this.getCartDetails[n].id===t&&1!=e&&(this.getCartDetails[n].Quantity=e-1);sessionStorage.setItem("cart",JSON.stringify(this.getCartDetails)),this.loadCart()}loadCart(){sessionStorage.getItem("cart")&&(this.getCartDetails=JSON.parse(sessionStorage.getItem("cart")),this.total=this.getCartDetails.reduce((t,e)=>t+e.UnitPrice*e.Quantity,0))}removeall(){sessionStorage.removeItem("cart"),this.getCartDetails=[],this.total=0,this.cartItem=0,this.msg.cartSubject.next(this.cartItem),this.loadCart()}singleDelete(t){if(sessionStorage.getItem("cart")){this.getCartDetails=JSON.parse(sessionStorage.getItem("cart"));for(let e=0;e<this.getCartDetails.length;e++)this.getCartDetails[e].id===t.id&&(this.getCartDetails.splice(e,1),sessionStorage.setItem("cart",JSON.stringify(this.getCartDetails)),this.loadCart(),this.cartItemFunc())}}cartItemFunc(){var t=JSON.parse(sessionStorage.getItem("cart"));this.cartItem=t.length,this.msg.cartSubject.next(this.cartItem)}gotohome(){this.router.navigate(["tabs"])}OrderNow(){this.CartDetails();var t=this.getCartDetails.filter(t=>t.Quantity>t.Stock);if(t.length>0)alert(`Insufficient Stock: \n  ${t.map(function(t){return`${t.ProductName} > ${t.Stock} current stock \n`}).join("\n")}`);else{this.CartDetails();var e=this.getCartDetails.filter(t=>t.Quantity>t.Stock);if(e.length>0)alert(`Insufficient Stock: \n  ${e.map(function(t){return t.ProductName}).join("\n")}`);else{let t=this.getCartDetails.length>1?"orders":"order",e="";this.alertCtrl.create({message:"Are you sure you want to approve this order?",buttons:[{text:"Ok",handler:()=>{this.alertCtrl.create({header:"Customer Name",inputs:[{name:"Name",placeholder:"Customer Name",type:"text"}],buttons:[{text:"Ok",handler:n=>{n.Name&&null!=n.Name?n.Name.length<4?alert("Name of customer should be four characters minimum"):this.alertCtrl.create({message:`${n.Name} ${t} has been approved!`,buttons:[{text:"Ok",role:"cancel"}]}).then(t=>{t.present();var i=s(new Date).format("DD-MM-YYYY hh:mm A");this.afstore.collection("Orders").add({OrderDetails:this.getCartDetails,BillingFirstname:n.Name,BillingLastname:"Walk-In",BillingAddress1:"Walk-In",BillingAddress2:"Walk-In",BillingPhonenumber:"Walk-In",Billingemail:"Walk-In",BillingIndexId:"",Status:"Approved",Datetime:i,TotalAmount:parseFloat(this.total.toString()).toFixed(2),DatetimeToSort:new Date}).then(t=>{e=t.id}).catch(t=>{}),this.getCartDetails.forEach(t=>{this.afstore.doc(`Products/${t.id}`).update({Stock:l.Z.firestore.FieldValue.increment(-t.Quantity)})}),this.getCartDetails.forEach(t=>{this.afstore.collection("Inventory").add({Quantity:-1*parseInt(t.Quantity),Datetime:i,read:!1,Destination:n.Name,ProductName:t.ProductName,UnitPrice:t.UnitPrice,ImageUrl:t.ImageUrl,DatetimeToSort:new Date})}),this.afstore.collection("History").add({BillingAddress1:"Walk-In",BillingAddress2:"Walk-In",BillingFirstname:n.Name,BillingIndexId:"",BillingLastname:"Walk-In",BillingPhonenumber:"Walk-In",Billingemail:"Walk-In",Datetime:i,Status:"Closed",TotalAmount:parseFloat(this.total.toString()).toFixed(2),id:e,OrderDetails:this.getCartDetails,read:!1,DatetimeToSort:new Date}),this.removeall()}):alert("Name of customer is required")}},{text:"Cancel",handler:t=>{}}]}).then(t=>{t.present()})}},{text:"Cancel",role:"cancel"}]}).then(t=>{t.present()})}}}}return t.\u0275fac=function(e){return new(e||t)(g.Y36(o.Br),g.Y36(i.S$),g.Y36(r.F0),g.Y36(h.zQ),g.Y36(u.ST),g.Y36(m.g))},t.\u0275cmp=g.Xpm({type:t,selectors:[["app-admincheckout"]],decls:22,vars:6,consts:[[1,"toolbar"],["slot","start"],["name","checkbox",1,"buttonsactive"],[1,"container"],[4,"ngFor","ngForOf"],["size","7"],["size","5"],["color","light",3,"click",4,"ngIf"],[3,"src"],[2,"float","right","color","#69a03a"],[1,"rate"],["id","qty"],[1,"minus"],[1,"plus"],[2,"float","right"],["id","btn",3,"click"],["color","light",3,"click"]],template:function(t,e){1&t&&(g.TgZ(0,"ion-header"),g.TgZ(1,"ion-toolbar",0),g.TgZ(2,"ion-buttons",1),g._UZ(3,"ion-icon",2),g.qZA(),g.TgZ(4,"ion-title"),g._uU(5,"Check Out"),g.qZA(),g.qZA(),g.qZA(),g.TgZ(6,"ion-content"),g.TgZ(7,"div",3),g.TgZ(8,"ion-grid"),g.TgZ(9,"ion-row"),g.TgZ(10,"ion-col"),g.TgZ(11,"ion-list"),g.YNc(12,d,19,8,"ion-item",4),g.qZA(),g.qZA(),g.qZA(),g.qZA(),g.qZA(),g.qZA(),g.TgZ(13,"ion-footer"),g.TgZ(14,"ion-row"),g.TgZ(15,"ion-col",5),g.TgZ(16,"ion-text"),g.TgZ(17,"h4"),g._uU(18),g.ALo(19,"currency"),g.qZA(),g.qZA(),g.qZA(),g.TgZ(20,"ion-col",6),g.YNc(21,C,2,0,"ion-button",7),g.qZA(),g.qZA(),g.qZA()),2&t&&(g.xp6(12),g.Q6J("ngForOf",e.getCartDetails),g.xp6(6),g.hij("Total : ",g.xi3(19,3,e.total,"\u20b1")," "),g.xp6(3),g.Q6J("ngIf",e.total>0))},directives:[o.Gu,o.sr,o.Sm,o.gu,o.wd,o.W2,o.jY,o.Nd,o.wI,o.q_,i.sg,o.fr,o.yW,i.O5,o.Ie,o.Bs,o.Q$,o.YG],pipes:[i.H9],styles:[".toolbar[_ngcontent-%COMP%]{height:84px;--background:#69a03a;color:#fff;font-size:20px;line-height:84px}.buttonsactive[_ngcontent-%COMP%]:active{background-color:red;font-weight:500}.container[_ngcontent-%COMP%]{width:100%}.container[_ngcontent-%COMP%]   ion-thumbnail[_ngcontent-%COMP%]{width:100px!important;height:100px!important}.container[_ngcontent-%COMP%]   ion-thumbnail[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{border-radius:10px}.container[_ngcontent-%COMP%]   .rate[_ngcontent-%COMP%]{color:#ccc}.container[_ngcontent-%COMP%]   #qty[_ngcontent-%COMP%]{margin-top:5px}.container[_ngcontent-%COMP%]   #qty[_ngcontent-%COMP%]   .minus[_ngcontent-%COMP%]{font-weight:600;padding:5px;margin-right:20px;cursor:pointer}.container[_ngcontent-%COMP%]   #qty[_ngcontent-%COMP%]   .plus[_ngcontent-%COMP%]{margin-left:20px;font-weight:600;padding:5px;cursor:pointer}.container[_ngcontent-%COMP%]   #qty[_ngcontent-%COMP%]   #btn[_ngcontent-%COMP%]{padding:10px 20px;color:#fff;background-color:red}.container[_ngcontent-%COMP%]   #qty[_ngcontent-%COMP%]   #btn[_ngcontent-%COMP%]:active{background-color:#051542}.container[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{margin:10px;color:#69a03a}ion-footer[_ngcontent-%COMP%]{--background:#69a03a}ion-footer[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]{background:#69a03a;color:#fff}ion-footer[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%]   ion-col[_ngcontent-%COMP%]:last-child{text-align:end}"]}),t})()}];let f=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=g.oAB({type:t}),t.\u0275inj=g.cJS({imports:[[r.Bz.forChild(p)],r.Bz]}),t})(),O=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=g.oAB({type:t}),t.\u0275inj=g.cJS({imports:[[i.ez,a.u5,o.Pc,f]]}),t})()}}]);