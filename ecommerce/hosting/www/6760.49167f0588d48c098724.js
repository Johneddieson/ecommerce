(self.webpackChunkcom_trackingsystem=self.webpackChunkcom_trackingsystem||[]).push([[6760],{6760:(t,n,e)=>{"use strict";e.r(n),e.d(n,{SignupPageModule:()=>b});var i=e(8583),o=e(665),s=e(5214),r=e(6476),a=e(9765),d=e(3018),c=e(3388),g=e(7810),l=e(1562);function p(t,n){if(1&t){const t=d.EpF();d.TgZ(0,"div",13),d.NdJ("click",function(){return d.CHM(t),d.oxw().ResetPassword()}),d._uU(1,"Forgot Password?"),d.qZA()}}function u(t,n){if(1&t){const t=d.EpF();d.TgZ(0,"button",14),d.NdJ("click",function(){return d.CHM(t),d.oxw().SignUp()}),d._uU(1,"Sign Up"),d.qZA()}}function h(t,n){if(1&t){const t=d.EpF();d.TgZ(0,"button",14),d.NdJ("click",function(){return d.CHM(t),d.oxw().navigateadmin()}),d._uU(1,"Continue as Admin"),d.qZA()}}function m(t,n){if(1&t){const t=d.EpF();d.TgZ(0,"button",14),d.NdJ("click",function(){return d.CHM(t),d.oxw().navigatecustomer()}),d._uU(1,"Continue as Customer"),d.qZA()}}const f=function(){return{standalone:!0}},C=[{path:"",component:(()=>{class t{constructor(t,n,e,i,o,s,r,d,c){this.navCtrl=t,this.auth=n,this.afstore=e,this.afauth=i,this.loadingCtrl=o,this.alertCtrl=s,this.router=r,this.applicationRef=d,this.zone=c,this.unsubscriber=new a.xQ,this.ishide=!1,this.isthisadmin=!1}ngOnInit(){this.router.events.subscribe(()=>{this.zone.run(()=>{setTimeout(()=>{this.applicationRef.tick();var t=JSON.parse(sessionStorage.getItem("user"));null!=t?(this.ishide=!0,"customer"==t.displayName?(this.continueAsCustomer=`CONTINUE AS ${t.displayName.toUpperCase()}`,this.isthisadmin=!1):(this.continueAsCustomer=`CONTINUE AS ${t.displayName.toUpperCase()}`,this.isthisadmin=!0)):this.ishide=!1},0)})})}ResetPassword(){this.alertCtrl.create({header:"Reset Password",inputs:[{name:"Email",placeholder:"Please type your email",type:"email"}],buttons:[{text:"Ok",handler:t=>{console.log("hahaha",t),this.auth.ForgotPassword(t.Email).then(t=>{this.alertCtrl.create({header:"Success",message:"The reset password code has been sent to your email"}).then(t=>{t.present()})}).catch(t=>{this.alertCtrl.create({header:"Error",message:"Email not found"}).then(t=>{t.present()})})}}]}).then(t=>{t.present()})}navigateadmin(){this.router.navigateByUrl("adminpage")}navigatecustomer(){this.router.navigateByUrl("tabs")}gotosignin(){this.navCtrl.navigateForward("login")}SignUp(){console.log("email",this.Email1),console.log("password",this.Password1),this.auth.SignUp(this.Email1,this.Password1).then(t=>{this.loadingCtrl.create({message:"Registering User..."}).then(n=>{n.present(),t.user.updateProfile({displayName:"admin"}),sessionStorage.setItem("user",JSON.stringify(t.user)),this.afstore.doc(`users/${t.user.uid}`).set({Email:this.Email1,Uid:t.user.uid,FirstName:"",LastName:"",Address1:"",Address2:"",PhoneNumber:""}).then(t=>{}).catch(t=>{console.log("err",t)}),setTimeout(()=>{n.dismiss(),this.router.navigateByUrl("/tabs"),this.Email1="",this.Password1=""},3e3)})}).catch(t=>{this.loadingCtrl.create({message:"Registering User..."}).then(n=>{n.present(),setTimeout(()=>{n.dismiss(),this.alertCtrl.create({message:t.message}).then(t=>{t.present()})},3e3)})})}}return t.\u0275fac=function(n){return new(n||t)(d.Y36(s.SH),d.Y36(c.u),d.Y36(g.ST),d.Y36(l.zQ),d.Y36(s.HT),d.Y36(s.Br),d.Y36(r.F0),d.Y36(d.z2F),d.Y36(d.R0b))},t.\u0275cmp=d.Xpm({type:t,selectors:[["app-signup"]],decls:29,vars:13,consts:[["charset","utf-8"],[1,"center"],[3,"hidden"],[1,"link",3,"click"],["method","post"],[1,"txt_field"],["type","text","required","",3,"disabled","ngModel","ngModelOptions","ngModelChange"],["email",""],["type","password","required","",3,"disabled","ngModel","ngModelOptions","ngModelChange"],["password",""],["class","pass",3,"click",4,"ngIf"],["class","button",3,"click",4,"ngIf"],[1,"signup_link"],[1,"pass",3,"click"],[1,"button",3,"click"]],template:function(t,n){1&t&&(d.TgZ(0,"ion-content"),d.TgZ(1,"head"),d._UZ(2,"meta",0),d.qZA(),d.TgZ(3,"body"),d.TgZ(4,"div",1),d.TgZ(5,"h1"),d._uU(6,"Sign Up"),d.qZA(),d.TgZ(7,"h5",2),d._uU(8,"Already a member? "),d.TgZ(9,"a",3),d.NdJ("click",function(){return n.gotosignin()}),d._uU(10,"Sign In"),d.qZA(),d.qZA(),d.TgZ(11,"form",4),d.TgZ(12,"div",5),d.TgZ(13,"input",6,7),d.NdJ("ngModelChange",function(t){return n.Email1=t}),d.qZA(),d._UZ(15,"span"),d.TgZ(16,"label"),d._uU(17,"Email"),d.qZA(),d.qZA(),d.TgZ(18,"div",5),d.TgZ(19,"input",8,9),d.NdJ("ngModelChange",function(t){return n.Password1=t}),d.qZA(),d._UZ(21,"span"),d.TgZ(22,"label"),d._uU(23,"Password"),d.qZA(),d.qZA(),d.YNc(24,p,2,0,"div",10),d.YNc(25,u,2,0,"button",11),d.YNc(26,h,2,0,"button",11),d.YNc(27,m,2,0,"button",11),d._UZ(28,"div",12),d.qZA(),d.qZA(),d.qZA(),d.qZA()),2&t&&(d.xp6(7),d.Q6J("hidden",n.ishide),d.xp6(6),d.Q6J("disabled",n.ishide)("ngModel",n.Email1)("ngModelOptions",d.DdM(11,f)),d.xp6(6),d.Q6J("disabled",n.ishide)("ngModel",n.Password1)("ngModelOptions",d.DdM(12,f)),d.xp6(5),d.Q6J("ngIf",!n.ishide),d.xp6(1),d.Q6J("ngIf",!n.ishide),d.xp6(1),d.Q6J("ngIf",n.ishide&&n.isthisadmin),d.xp6(1),d.Q6J("ngIf",n.ishide&&!n.isthisadmin))},directives:[s.W2,o._Y,o.JL,o.F,o.Fj,o.Q7,o.JJ,o.On,i.O5],styles:['@import url("https://fonts.googleapis.com/css2?family=Noto+Sans:wght@700&family=Poppins:wght@400;500;600&display=swap");ion-content[_ngcontent-%COMP%]{--background:url(milktea4.3ed5f27e398ed742c252.jpg) no-repeat center center/cover;background:linear-gradient(120deg,#2980b9,#8e44ad)}*[_ngcontent-%COMP%]{box-sizing:border-box;font-family:Poppins,sans-serif}*[_ngcontent-%COMP%], body[_ngcontent-%COMP%]{margin:0;padding:0}body[_ngcontent-%COMP%]{height:100vh;overflow:hidden}.center[_ngcontent-%COMP%]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:400px;background:#fff;border-radius:10px;box-shadow:10px 10px 15px #0000000d}.center[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{text-align:center;padding:20px 0}.center[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{text-align:center;border-bottom:1px solid silver}.center[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{padding:0 40px;box-sizing:border-box}form[_ngcontent-%COMP%]   .txt_field[_ngcontent-%COMP%]{position:relative;border-bottom:2px solid #adadad;margin:30px 0}.txt_field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:100%;padding:0 5px;height:40px;font-size:16px;border:none;background:none;outline:none}.txt_field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{position:absolute;top:50%;left:5px;color:#adadad;transform:translateY(-50%);font-size:16px;pointer-events:none;transition:.5s}.txt_field[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:before{content:"";position:absolute;top:40px;left:0;width:0;height:2px;background:#2691d9;transition:.5s}.txt_field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus ~ label[_ngcontent-%COMP%], .txt_field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:valid ~ label[_ngcontent-%COMP%]{top:-5px;color:#2691d9}.txt_field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus ~ span[_ngcontent-%COMP%]:before, .txt_field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:valid ~ span[_ngcontent-%COMP%]:before{width:100%}.pass[_ngcontent-%COMP%]{margin:-5px 0 20px 5px;color:#a6a6a6;cursor:pointer}.pass[_ngcontent-%COMP%]:hover{text-decoration:underline}.button[_ngcontent-%COMP%], input[type=submit][_ngcontent-%COMP%]{width:100%;height:50px;border:1px solid;background:#2691d9;font-size:18px;color:#e9f4fb;font-weight:700;cursor:pointer;outline:none}input[type=submit][_ngcontent-%COMP%]:hover{border-color:#2691d9;transition:.5s}.signup_link[_ngcontent-%COMP%]{margin:30px 0;text-align:center;font-size:16px;color:#666}.signup_link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#2691d9;text-decoration:none}.signup_link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{text-decoration:underline}.link[_ngcontent-%COMP%]{cursor:pointer;color:#5d5de2}']}),t})()}];let _=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=d.oAB({type:t}),t.\u0275inj=d.cJS({imports:[[r.Bz.forChild(C)],r.Bz]}),t})(),b=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=d.oAB({type:t}),t.\u0275inj=d.cJS({imports:[[i.ez,o.u5,s.Pc,_]]}),t})()}}]);