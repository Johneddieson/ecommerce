(self.webpackChunkcom_trackingsystem=self.webpackChunkcom_trackingsystem||[]).push([[9595],{9595:(t,e,o)=>{"use strict";o.r(e),o.d(e,{DashboardPageModule:()=>f});var n=o(8583),i=o(665),r=o(5214),a=o(6476),s=o(4762),d=o(3018),c=o(8002),l=o(1562),g=o(7810);const p=["productbtn"];function h(t,e){if(1&t&&(d.TgZ(0,"ion-col",3),d.TgZ(1,"ion-card"),d._UZ(2,"img",4),d.TgZ(3,"ion-card-content"),d.TgZ(4,"h1"),d._uU(5),d.qZA(),d.TgZ(6,"ion-label"),d._uU(7),d.qZA(),d.qZA(),d.qZA(),d.qZA()),2&t){const t=e.$implicit;d.xp6(2),d.Q6J("src",t.ImageUrl,d.LSH),d.xp6(3),d.Oqu(t.Category),d.xp6(2),d.hij(" ",t.ProductName," ")}}const u=[{path:"",component:(()=>{class t{constructor(t,e,o,n,i){this.afauth=t,this.afstore=e,this.actRoute=o,this.router=n,this.alertCtrl=i,this.dropdown=!1,this.dropdownmobile=!1,this.iconName="chevron-up",this.products=[],this.afauth.authState.subscribe(t=>{t&&t.uid&&this.actRoute.queryParams.subscribe(t=>{this.productCollection=null==t.category?this.afstore.collection("Products"):this.afstore.collection("Products",e=>e.where("Category","==",t.category)),this.sub=this.productCollection.snapshotChanges().pipe((0,c.U)(t=>t.map(t=>Object.assign({id:t.payload.doc.id},t.payload.doc.data())))).subscribe(t=>{console.log("Dab,",t),this.products=t})})})}ngOnInit(){}hideDropdown(t){const e=t.clientX,o=t.clientY,n=this.productbtn.nativeElement.getBoundingClientRect();(e<n.left+2||e>n.right-2||o<n.top+2)&&(this.dropdown=!1)}categories(){this.dropdownmobile=!0,this.alertCtrl.create({header:"Choose Category",buttons:[{text:"All",handler:t=>{this.router.navigateByUrl("/dashboard")}},{text:"Milktea",handler:t=>{this.router.navigateByUrl("/dashboard?category=Milktea")}},{text:"Fruit Tea",handler:t=>{this.router.navigateByUrl("/dashboard?category=Fruit tea")}},{text:"Slushee",handler:t=>{this.router.navigateByUrl("/dashboard?category=Slushee")}}]}).then(t=>{t.present()})}categoriesdown(){return(0,s.mG)(this,void 0,void 0,function*(){this.dropdownmobile=!1})}}return t.\u0275fac=function(e){return new(e||t)(d.Y36(l.zQ),d.Y36(g.ST),d.Y36(a.gz),d.Y36(a.F0),d.Y36(r.Br))},t.\u0275cmp=d.Xpm({type:t,selectors:[["app-dashboard"]],viewQuery:function(t,e){if(1&t&&d.Gf(p,5,d.SBq),2&t){let t;d.iGM(t=d.CRH())&&(e.productbtn=t.first)}},inputs:{title:"title"},decls:4,vars:1,consts:[["color","medium"],[1,"ion-justify-content-center"],["size","12","size-sm","6","size-md","4","size-lg","3","size-xl","2",4,"ngFor","ngForOf"],["size","12","size-sm","6","size-md","4","size-lg","3","size-xl","2"],[3,"src"]],template:function(t,e){1&t&&(d.TgZ(0,"ion-content",0),d.TgZ(1,"ion-grid"),d.TgZ(2,"ion-row",1),d.YNc(3,h,8,3,"ion-col",2),d.qZA(),d.qZA(),d.qZA()),2&t&&(d.xp6(3),d.Q6J("ngForOf",e.products))},directives:[r.W2,r.jY,r.Nd,n.sg,r.wI,r.PM,r.FN,r.Q$],styles:["@media (min-width: 768px){.mobile-header[_ngcontent-%COMP%]{display:none}.header[_ngcontent-%COMP%]{display:flex;background:linear-gradient(120deg,#2980b9,#8e44ad);padding-left:40px;padding-right:40px}}@media (max-width: 768px){.mobile-header[_ngcontent-%COMP%]{display:block}.header[_ngcontent-%COMP%]{display:none}}.active-item[_ngcontent-%COMP%]{border-bottom:2px solid var(--ion-color-dark)}.dropdown[_ngcontent-%COMP%]{width:136px;height:150px;background:#fff;position:absolute;top:40px;left:87px;z-index:1}.dropdown[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]:hover{--ion-item-color:var(--ion-color-primary)}.hero[_ngcontent-%COMP%]{background-image:url(https://ucarecdn.com/b4223107-fa83-4409-9ca9-b80e6ef36a5d/mixologistremovebgpreview.png);background-repeat:no-repeat;background-position:50%;background-size:cover;height:30vh;width:100%}ion-grid[_ngcontent-%COMP%]{--ion-grid-padding-sm:20px;--ion-grid-padding-md:30px;--ion-grid-padding-lg:40px;--ion-grid-padding-xl:100px}h1[_ngcontent-%COMP%]{text-transform:uppercase}"]}),t})()}];let m=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=d.oAB({type:t}),t.\u0275inj=d.cJS({imports:[[a.Bz.forChild(u)],a.Bz]}),t})();var b=o(6175);let f=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=d.oAB({type:t}),t.\u0275inj=d.cJS({imports:[[n.ez,i.u5,r.Pc,m,b.q]]}),t})()}}]);