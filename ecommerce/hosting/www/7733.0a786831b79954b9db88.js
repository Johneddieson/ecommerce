(self.webpackChunkcom_trackingsystem=self.webpackChunkcom_trackingsystem||[]).push([[7733],{6175:(t,e,o)=>{"use strict";o.d(e,{q:()=>r});var n=o(8583),i=o(5214),a=o(6476),s=o(3018);let r=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=s.oAB({type:t}),t.\u0275inj=s.cJS({imports:[[n.ez,i.Pc,a.Bz]]}),t})()},7733:(t,e,o)=>{"use strict";o.r(e),o.d(e,{TabsPageModule:()=>m});var n=o(5214),i=o(8583),a=o(665),s=o(6476),r=o(8002),c=o(6738),l=o(3018),u=o(7810),h=o(1562),d=o(3388);function b(t,e){if(1&t&&(l.TgZ(0,"ion-badge",12),l._uU(1),l.qZA()),2&t){const t=l.oxw();l.xp6(1),l.Oqu(t.notifCounts)}}const g=[{path:"",component:(()=>{class t{constructor(t,e,o,n,i,a,s,l,u){this.router=t,this.afstore=e,this.afauth=o,this.loadingCtrl=n,this.locationStrategy=i,this.auth=a,this.alertCtrl=s,this.applicationRef=l,this.zone=u,this.notificationsList=[],this.notifCounts=0,this.afauth.authState.subscribe(e=>{e&&e.uid&&(t.navigateByUrl("admin"==e.displayName?"adminpage":"tabs"),this.notificationsReference=this.afstore.collection(`users/${e.uid}/notifications`),this.sub=this.notificationsReference.snapshotChanges().pipe((0,r.U)(t=>t.map(t=>Object.assign({id:t.payload.doc.id},t.payload.doc.data())))).subscribe(t=>{t=(t=t.map((t,e)=>Object.assign({id:t.id,Datetime:t.Datetime,DatetimeToSort:c(t.Datetime).toDate(),read:t.read,remarks:t.remarks,Message:t.Message}))).sort((t,e)=>Number(e.DatetimeToSort)-Number(t.DatetimeToSort)),this.notificationsList=t,console.log("wewewew",this.notificationsList);var e=t.filter(t=>1!=t.read);this.notifCounts=e.length,console.log("count",this.notifCounts)}))})}ngOnInit(){}logout(){this.alertCtrl.create({message:"Are you sure want to logout?",buttons:[{text:"Yes",handler:()=>{this.auth.SignOut()}},{text:"No",role:"cancel"}]}).then(t=>{t.present()})}}return t.\u0275fac=function(e){return new(e||t)(l.Y36(s.F0),l.Y36(u.ST),l.Y36(h.zQ),l.Y36(n.HT),l.Y36(i.S$),l.Y36(d.u),l.Y36(n.Br),l.Y36(l.z2F),l.Y36(l.R0b))},t.\u0275cmp=l.Xpm({type:t,selectors:[["app-tabs"]],decls:23,vars:1,consts:[["slot","bottom"],["tab","product"],["name","list"],["tab","tab1"],["name","cart"],["tab","tab3"],["name","create-outline"],["tab","tab2"],["name","notifications"],["color","danger",4,"ngIf"],[3,"click"],["name","log-out-outline"],["color","danger"]],template:function(t,e){1&t&&(l.TgZ(0,"ion-tabs"),l.TgZ(1,"ion-tab-bar",0),l.TgZ(2,"ion-tab-button",1),l._UZ(3,"ion-icon",2),l.TgZ(4,"ion-label"),l._uU(5,"Products"),l.qZA(),l.qZA(),l.TgZ(6,"ion-tab-button",3),l._UZ(7,"ion-icon",4),l.TgZ(8,"ion-label"),l._uU(9,"Buy Product"),l.qZA(),l.qZA(),l.TgZ(10,"ion-tab-button",5),l._UZ(11,"ion-icon",6),l.TgZ(12,"ion-label"),l._uU(13,"Edit Information"),l.qZA(),l.qZA(),l.TgZ(14,"ion-tab-button",7),l._UZ(15,"ion-icon",8),l.YNc(16,b,2,1,"ion-badge",9),l.TgZ(17,"ion-label"),l._uU(18,"Notifications"),l.qZA(),l.qZA(),l.TgZ(19,"ion-tab-button",10),l.NdJ("click",function(){return e.logout()}),l._UZ(20,"ion-icon",11),l.TgZ(21,"ion-label"),l._uU(22,"Log out"),l.qZA(),l.qZA(),l.qZA(),l.qZA()),2&t&&(l.xp6(16),l.Q6J("ngIf",0!=e.notifCounts))},directives:[n.UN,n.yq,n.ZU,n.gu,n.Q$,i.O5,n.yp],styles:[""]}),t})(),children:[{path:"product",loadChildren:()=>o.e(7333).then(o.bind(o,7333)).then(t=>t.MenuPageModule)},{path:"tab1",loadChildren:()=>Promise.all([o.e(8592),o.e(3952)]).then(o.bind(o,3952)).then(t=>t.HomePageModule)},{path:"tab2",loadChildren:()=>Promise.all([o.e(8592),o.e(8381)]).then(o.bind(o,8381)).then(t=>t.Tab2PageModule)},{path:"tab3",loadChildren:()=>Promise.all([o.e(8592),o.e(3831)]).then(o.bind(o,3831)).then(t=>t.Tab3PageModule)},{path:"",redirectTo:"/tabs/product",pathMatch:"full"}]},{path:"",redirectTo:"/tabs/product",pathMatch:"full"}];let p=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=l.oAB({type:t}),t.\u0275inj=l.cJS({imports:[[s.Bz.forChild(g)]]}),t})();var f=o(6175);let m=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=l.oAB({type:t}),t.\u0275inj=l.cJS({imports:[[n.Pc,i.ez,a.u5,p,f.q]]}),t})()}}]);