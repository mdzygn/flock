import{_ as t,a as n,b as a,c as e,i as r,s as c,d as s,S as i,w as o,y as l,P as u,j as f,e as v,q as d,z as h,A as $,Q as p,l as m,n as E,f as g,C as I,o as C,m as T,p as R,t as y,g as D,h as w,bL as N,al as O,bn as b,aQ as _,aR as P,W as S,B as x,M as V,aO as L,N as A,R as j,aS as J,ae as W,bM as M,bN as H,aP as F,D as U,V as k}from"./client.5cc92f90.js";import"./SearchBar.c2607b51.js";import{N as B}from"./next_arrow.b1598f96.js";import{L as Y}from"./LimitedTextfield.c9ec5cc9.js";import{I as G}from"./ImageSelectionBox.4cb0a206.js";function Q(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}();return function(){var r,c=n(t);if(e){var s=n(this).constructor;r=Reflect.construct(c,arguments,s)}else r=c.apply(this,arguments);return a(this,r)}}function X(t){var n,a=k.NEW_PROJECT.CONFIRM+"";return{c:function(){n=u(a)},l:function(t){n=p(t,a)},m:function(t,a){C(t,n,a)},p:U,d:function(t){t&&m(n)}}}function q(t){var n,a,e,r,c,s,i,o,d,R,N,b,M,H,F,U,Q,q,z,K,Z,tt,nt,at,et,rt,ct,st,it,ot,lt,ut,ft,vt,dt,ht,$t=k.NEW_PROJECT.TITLE+"",pt=k.NEW_PROJECT.DESCRIPTION+"",mt=(t[7]?t[7]:t[6])+"",Et=t[7]?" characters over":t[9]?" characters remaining":"",gt=k.NEW_PROJECT.DESCRIPTION_NOTE+"",It=k.NEW_PROJECT.HEADER_IMAGE+"",Ct=k.NEW_PROJECT.PRIVACY_NOTE+"";function Tt(n){t[18].call(null,n)}function Rt(n){t[19].call(null,n)}function yt(n){t[20].call(null,n)}function Dt(n){t[21].call(null,n)}var wt={maxlength:O.MAX_PROJECT_DESCRIPTION_CHARS};void 0!==t[1]&&(wt.value=t[1]),void 0!==t[5]&&(wt.field=t[5]),void 0!==t[6]&&(wt.remainingChars=t[6]),void 0!==t[7]&&(wt.charsOver=t[7]);var Nt=new Y({props:wt});function Ot(n){t[23].call(null,n)}function bt(n){t[24].call(null,n)}_.push(function(){return P(Nt,"value",Tt)}),_.push(function(){return P(Nt,"field",Rt)}),_.push(function(){return P(Nt,"remainingChars",yt)}),_.push(function(){return P(Nt,"charsOver",Dt)}),Nt.$on("keypress",t[22]);var _t={contextSearchString:t[8],uploadType:"projectHeader",itemId:t[11]};void 0!==t[2]&&(_t.image=t[2]),void 0!==t[3]&&(_t.fileIsUploading=t[3]);var Pt=new G({props:_t});_.push(function(){return P(Pt,"image",Ot)}),_.push(function(){return P(Pt,"fileIsUploading",bt)});var St=new S({props:{className:"nextButton",disabled:!t[10],onClick:t[12],icon:B,$$slots:{default:[X]},$$scope:{ctx:t}}});return{c:function(){n=l("div"),a=l("div"),e=l("div"),r=l("div"),c=u($t),s=f(),i=l("input"),o=f(),d=l("div"),R=l("div"),N=u(pt),b=f(),M=l("div"),H=u(mt),F=u(Et),U=f(),v(Nt.$$.fragment),Z=f(),tt=l("div"),nt=f(),at=l("div"),et=l("div"),rt=u(It),ct=f(),v(Pt.$$.fragment),ot=f(),lt=l("div"),ut=f(),ft=l("div"),v(St.$$.fragment),this.h()},l:function(t){n=h(t,"DIV",{class:!0});var l=$(n);a=h(l,"DIV",{class:!0});var u=$(a);e=h(u,"DIV",{class:!0});var f=$(e);r=h(f,"DIV",{class:!0});var v=$(r);c=p(v,$t),v.forEach(m),s=E(f),i=h(f,"INPUT",{type:!0,class:!0}),f.forEach(m),o=E(u),d=h(u,"DIV",{class:!0});var I=$(d);R=h(I,"DIV",{class:!0});var C=$(R);N=p(C,pt),C.forEach(m),b=E(I),M=h(I,"DIV",{class:!0});var T=$(M);H=p(T,mt),F=p(T,Et),T.forEach(m),U=E(I),g(Nt.$$.fragment,I),Z=E(I),tt=h(I,"DIV",{class:!0}),$(tt).forEach(m),I.forEach(m),nt=E(u),at=h(u,"DIV",{class:!0});var y=$(at);et=h(y,"DIV",{class:!0});var D=$(et);rt=p(D,It),D.forEach(m),ct=E(y),g(Pt.$$.fragment,y),y.forEach(m),ot=E(u),lt=h(u,"DIV",{class:!0}),$(lt).forEach(m),ut=E(u),ft=h(u,"DIV",{class:!0});var w=$(ft);g(St.$$.fragment,w),w.forEach(m),u.forEach(m),l.forEach(m),this.h()},h:function(){x(r,"class","label svelte-1wir4cc"),x(i,"type","text"),x(i,"class","svelte-1wir4cc"),x(e,"class","field introField svelte-1wir4cc"),x(R,"class","label svelte-1wir4cc"),x(M,"class","fieldCharCount svelte-1wir4cc"),V(M,"charCountLow",t[9]),V(M,"charCountOver",t[7]),x(tt,"class","fieldNote svelte-1wir4cc"),x(d,"class","field descriptionField svelte-1wir4cc"),x(et,"class","label headerImageLabel svelte-1wir4cc"),x(at,"class","field headerImageField svelte-1wir4cc"),x(lt,"class","fieldNote privacyNote svelte-1wir4cc"),x(ft,"class","actions svelte-1wir4cc"),x(a,"class","panelContent svelte-1wir4cc"),x(n,"class","content svelte-1wir4cc")},m:function(l,u){C(l,n,u),I(n,a),I(a,e),I(e,r),I(r,c),I(e,s),I(e,i),L(i,t[0]),t[16](i),I(a,o),I(a,d),I(d,R),I(R,N),I(d,b),I(d,M),I(M,H),I(M,F),I(d,U),T(Nt,d,null),I(d,Z),I(d,tt),tt.innerHTML=gt,I(a,nt),I(a,at),I(at,et),I(et,rt),I(at,ct),T(Pt,at,null),I(a,ot),I(a,lt),lt.innerHTML=Ct,I(a,ut),I(a,ft),T(St,ft,null),vt=!0,dt||(ht=[A(i,"input",t[15]),A(i,"keypress",t[17])],dt=!0)},p:function(t,n){1&n&&i.value!==t[0]&&L(i,t[0]),(!vt||192&n)&&mt!==(mt=(t[7]?t[7]:t[6])+"")&&j(H,mt),(!vt||640&n)&&Et!==(Et=t[7]?" characters over":t[9]?" characters remaining":"")&&j(F,Et),512&n&&V(M,"charCountLow",t[9]),128&n&&V(M,"charCountOver",t[7]);var a={};!Q&&2&n&&(Q=!0,a.value=t[1],J(function(){return Q=!1})),!q&&32&n&&(q=!0,a.field=t[5],J(function(){return q=!1})),!z&&64&n&&(z=!0,a.remainingChars=t[6],J(function(){return z=!1})),!K&&128&n&&(K=!0,a.charsOver=t[7],J(function(){return K=!1})),Nt.$set(a);var e={};256&n&&(e.contextSearchString=t[8]),!st&&4&n&&(st=!0,e.image=t[2],J(function(){return st=!1})),!it&&8&n&&(it=!0,e.fileIsUploading=t[3],J(function(){return it=!1})),Pt.$set(e);var r={};1024&n&&(r.disabled=!t[10]),33554432&n&&(r.$$scope={dirty:n,ctx:t}),St.$set(r)},i:function(t){vt||(y(Nt.$$.fragment,t),y(Pt.$$.fragment,t),y(St.$$.fragment,t),vt=!0)},o:function(t){D(Nt.$$.fragment,t),D(Pt.$$.fragment,t),D(St.$$.fragment,t),vt=!1},d:function(a){a&&m(n),t[16](null),w(Nt),w(Pt),w(St),dt=!1,W(ht)}}}function z(t){var n,a,e,r,c=new o({props:{$$slots:{default:[q]},$$scope:{ctx:t}}});return{c:function(){n=l("style"),a=u("body {\r\n\t\t\toverscroll-behavior-y: contain; /* Disables pull-to-refresh but allows overscroll effects. */\r\n\t\t}"),e=f(),v(c.$$.fragment),this.h()},l:function(t){var r=d('[data-svelte="svelte-1ja50yt"]',document.head);n=h(r,"STYLE",{});var s=$(n);a=p(s,"body {\r\n\t\t\toverscroll-behavior-y: contain; /* Disables pull-to-refresh but allows overscroll effects. */\r\n\t\t}"),s.forEach(m),r.forEach(m),e=E(t),g(c.$$.fragment,t),this.h()},h:function(){document.title="Flock"},m:function(t,s){I(document.head,n),I(n,a),C(t,e,s),T(c,t,s),r=!0},p:function(t,n){var a=R(n,1)[0],e={};33556479&a&&(e.$$scope={dirty:a,ctx:t}),c.$set(e)},i:function(t){r||(y(c.$$.fragment,t),r=!0)},o:function(t){D(c.$$.fragment,t),r=!1},d:function(t){m(n),t&&m(e),w(c,t)}}}function K(t,n,a){var e,r,c,s,i,o="",l="",u=N(),f=null,v="";function d(){M("updateContextString",function(){a(8,v=(o+" "+l).trim())},O.UPDATE_CONTEXT_STRING_DELAY)}function h(){if(m){var t={title:b(o),description:b(l),headerImage:f,id:u};H(t)}}function $(){m&&h()}var p,m;return t.$$.update=function(){64&t.$$.dirty&&a(9,p=""!==s&&s<O.PROJECT_DESCRIPTION_CHARS_LOW),3&t.$$.dirty&&d(),143&t.$$.dirty&&a(10,m=b(o)&&b(l)&&!i&&f&&!e)},[o,l,f,e,r,c,s,i,v,p,m,u,h,$,d,function(){o=this.value,a(0,o)},function(t){_[t?"unshift":"push"](function(){a(4,r=t)})},function(t){return F(t,{target:c})},function(t){a(1,l=t)},function(t){a(5,c=t)},function(t){a(6,s=t)},function(t){a(7,i=t)},function(t){return F(t,{action:$})},function(t){a(2,f=t)},function(t){a(3,e=t)}]}export default(function(n){t(o,i);var a=Q(o);function o(t){var n;return e(this,o),n=a.call(this),r(s(n),t,K,z,c,{}),n}return o}());
