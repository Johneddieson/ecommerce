(self.webpackChunkcom_trackingsystem=self.webpackChunkcom_trackingsystem||[]).push([[9097],{9097:(t,n,e)=>{"use strict";e.r(n),e.d(n,{LoginPageModule:()=>C});var o=e(8583),i=e(665),s=e(5214),a=e(6476),r=e(3018),c=e(3388),d=e(7810),g=e(1562);function l(t,n){if(1&t){const t=r.EpF();r.TgZ(0,"div",13),r.NdJ("click",function(){return r.CHM(t),r.oxw().ResetPassword()}),r._uU(1,"Forgot Password?"),r.qZA()}}function p(t,n){if(1&t){const t=r.EpF();r.TgZ(0,"button",14),r.NdJ("click",function(){r.CHM(t);const n=r.oxw(),e=r.MAs(14),o=r.MAs(20);return n.LogIn(e,o)}),r._uU(1,"Login"),r.qZA()}}function u(t,n){if(1&t){const t=r.EpF();r.TgZ(0,"button",14),r.NdJ("click",function(){return r.CHM(t),r.oxw().navigateadmin()}),r._uU(1,"Continue as Admin"),r.qZA()}}function h(t,n){if(1&t){const t=r.EpF();r.TgZ(0,"button",14),r.NdJ("click",function(){return r.CHM(t),r.oxw().navigatecustomer()}),r._uU(1,"Continue as Customer"),r.qZA()}}const f=function(){return{standalone:!0}},m=[{path:"",component:(()=>{class t{constructor(t,n,e,o,i,s,a,r,c){this.navCtrl=t,this.auth=n,this.afstore=e,this.afauth=o,this.loadingCtrl=i,this.alertCtrl=s,this.router=a,this.applicationRef=r,this.zone=c,this.ishide=!1,this.isthisadmin=!1}ngOnInit(){this.router.events.subscribe(()=>{this.zone.run(()=>{setTimeout(()=>{this.applicationRef.tick();var t=JSON.parse(sessionStorage.getItem("user"));null!=t?(this.ishide=!0,"customer"==t.displayName?(this.continueAsCustomer=`CONTINUE AS ${t.displayName.toUpperCase()}`,this.isthisadmin=!1):(this.continueAsCustomer=`CONTINUE AS ${t.displayName.toUpperCase()}`,this.isthisadmin=!0)):this.ishide=!1},0)})})}ResetPassword(){this.alertCtrl.create({header:"Reset Password",inputs:[{name:"Email",placeholder:"Please type your email",type:"email"}],buttons:[{text:"Ok",handler:t=>{console.log("hahaha",t),this.auth.ForgotPassword(t.Email).then(t=>{this.alertCtrl.create({header:"Success",message:"The reset password code has been sent to your email"}).then(t=>{t.present()})}).catch(t=>{this.alertCtrl.create({header:"Error",message:"Email not found"}).then(t=>{t.present()})})}}]}).then(t=>{t.present()})}LogIn(t,n){this.auth.SignIn(t.value,n.value).then(t=>{this.router.navigateByUrl("admin"==t.user.displayName?"adminpage":"tabs"),sessionStorage.setItem("user",JSON.stringify(t.user)),this.Email1="",this.Password1=""}).catch(t=>{this.alertCtrl.create({message:t.message}).then(t=>{t.present()})})}navigateadmin(){this.router.navigateByUrl("adminpage")}navigatecustomer(){this.router.navigateByUrl("tabs")}gotosignup(){this.navCtrl.navigateForward("signup")}}return t.\u0275fac=function(n){return new(n||t)(r.Y36(s.SH),r.Y36(c.u),r.Y36(d.ST),r.Y36(g.zQ),r.Y36(s.HT),r.Y36(s.Br),r.Y36(a.F0),r.Y36(r.z2F),r.Y36(r.R0b))},t.\u0275cmp=r.Xpm({type:t,selectors:[["app-login"]],decls:29,vars:13,consts:[["charset","utf-8"],[1,"center"],[3,"hidden"],[1,"link",3,"click"],["method","post"],[1,"txt_field"],["type","text","required","",3,"disabled","ngModel","ngModelOptions","ngModelChange"],["email",""],["type","password","required","",3,"disabled","ngModel","ngModelOptions","ngModelChange"],["password",""],["class","pass",3,"click",4,"ngIf"],["class","button",3,"click",4,"ngIf"],[1,"signup_link"],[1,"pass",3,"click"],[1,"button",3,"click"]],template:function(t,n){1&t&&(r.TgZ(0,"ion-content"),r.TgZ(1,"head"),r._UZ(2,"meta",0),r.qZA(),r.TgZ(3,"body"),r.TgZ(4,"div",1),r.TgZ(5,"h1"),r._uU(6,"Sign In"),r.qZA(),r.TgZ(7,"h5",2),r._uU(8,"New Here? "),r.TgZ(9,"a",3),r.NdJ("click",function(){return n.gotosignup()}),r._uU(10,"Sign Up"),r.qZA(),r.qZA(),r.TgZ(11,"form",4),r.TgZ(12,"div",5),r.TgZ(13,"input",6,7),r.NdJ("ngModelChange",function(t){return n.Email1=t}),r.qZA(),r._UZ(15,"span"),r.TgZ(16,"label"),r._uU(17,"Email"),r.qZA(),r.qZA(),r.TgZ(18,"div",5),r.TgZ(19,"input",8,9),r.NdJ("ngModelChange",function(t){return n.Password1=t}),r.qZA(),r._UZ(21,"span"),r.TgZ(22,"label"),r._uU(23,"Password"),r.qZA(),r.qZA(),r.YNc(24,l,2,0,"div",10),r.YNc(25,p,2,0,"button",11),r.YNc(26,u,2,0,"button",11),r.YNc(27,h,2,0,"button",11),r._UZ(28,"div",12),r.qZA(),r.qZA(),r.qZA(),r.qZA()),2&t&&(r.xp6(7),r.Q6J("hidden",n.ishide),r.xp6(6),r.Q6J("disabled",n.ishide)("ngModel",n.Email1)("ngModelOptions",r.DdM(11,f)),r.xp6(6),r.Q6J("disabled",n.ishide)("ngModel",n.Password1)("ngModelOptions",r.DdM(12,f)),r.xp6(5),r.Q6J("ngIf",!n.ishide),r.xp6(1),r.Q6J("ngIf",!n.ishide),r.xp6(1),r.Q6J("ngIf",n.ishide&&n.isthisadmin),r.xp6(1),r.Q6J("ngIf",n.ishide&&!n.isthisadmin))},directives:[s.W2,i._Y,i.JL,i.F,i.Fj,i.Q7,i.JJ,i.On,o.O5],styles:['@import url("https://fonts.googleapis.com/css2?family=Noto+Sans:wght@700&family=Poppins:wght@400;500;600&display=swap");ion-content[_ngcontent-%COMP%]{--background:url(milktea4.3ed5f27e398ed742c252.jpg) no-repeat center center/cover;background:linear-gradient(120deg,#2980b9,#8e44ad)}*[_ngcontent-%COMP%]{box-sizing:border-box;font-family:Poppins,sans-serif}*[_ngcontent-%COMP%], body[_ngcontent-%COMP%]{margin:0;padding:0}body[_ngcontent-%COMP%]{height:100vh;overflow:hidden}.center[_ngcontent-%COMP%]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:400px;background:#fff;border-radius:10px;box-shadow:10px 10px 15px #0000000d}.center[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{text-align:center;padding:20px 0}.center[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{text-align:center;border-bottom:1px solid silver}.center[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]{padding:0 40px;box-sizing:border-box}form[_ngcontent-%COMP%]   .txt_field[_ngcontent-%COMP%]{position:relative;border-bottom:2px solid #adadad;margin:30px 0}.txt_field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:100%;padding:0 5px;height:40px;font-size:16px;border:none;background:none;outline:none}.txt_field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{position:absolute;top:50%;left:5px;color:#adadad;transform:translateY(-50%);font-size:16px;pointer-events:none;transition:.5s}.txt_field[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:before{content:"";position:absolute;top:40px;left:0;width:0;height:2px;background:#2691d9;transition:.5s}.txt_field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus ~ label[_ngcontent-%COMP%], .txt_field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:valid ~ label[_ngcontent-%COMP%]{top:-5px;color:#2691d9}.txt_field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus ~ span[_ngcontent-%COMP%]:before, .txt_field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:valid ~ span[_ngcontent-%COMP%]:before{width:100%}.pass[_ngcontent-%COMP%]{margin:-5px 0 20px 5px;color:#a6a6a6;cursor:pointer}.pass[_ngcontent-%COMP%]:hover{text-decoration:underline}.button[_ngcontent-%COMP%], input[type=submit][_ngcontent-%COMP%]{width:100%;height:50px;border:1px solid;background:#2691d9;font-size:18px;color:#e9f4fb;font-weight:700;cursor:pointer;outline:none}input[type=submit][_ngcontent-%COMP%]:hover{border-color:#2691d9;transition:.5s}.signup_link[_ngcontent-%COMP%]{margin:30px 0;text-align:center;font-size:16px;color:#666}.signup_link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#2691d9;text-decoration:none}.signup_link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{text-decoration:underline}.link[_ngcontent-%COMP%]{cursor:pointer;color:#5d5de2}']}),t})()}];let _=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=r.oAB({type:t}),t.\u0275inj=r.cJS({imports:[[a.Bz.forChild(m)],a.Bz]}),t})(),C=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=r.oAB({type:t}),t.\u0275inj=r.cJS({imports:[[o.ez,i.u5,s.Pc,_]]}),t})()}}]);