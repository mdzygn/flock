import{S as t,i as e,s,n as a,p as l,H as n,e as c,c as i,q as o,r,u,I as d,g as f,h as $,a as m,w as p,j as h,m as E,t as I,b as g,d as v,l as T,ad as D,v as _,aG as A,F as C,E as L,J as S,aK as O,a6 as P,y as R,k as x,a7 as b,bY as N,bN as y,ab as V,bZ as J,b_ as M,bf as w,b$ as k,A as F,aH as j,aI as H,N as U,x as G,M as B,aJ as W,aF as X}from"./client.3c58eb54.js";import"./Hotspot.caf8438e.js";import"./SearchBar.bd81e333.js";import{F as K}from"./FilterBar.3a4e17b0.js";import"./next_arrow.b1598f96.js";import{L as Y}from"./LimitedTextfield.727dc40c.js";import{I as q}from"./ImageSelectionBox.15a57962.js";import{S as Z,A as z}from"./save.71e29683.js";import{C as Q}from"./cancel.feaa218b.js";function tt(t){let e,s;const a=new U({props:{className:"saveButton",onClick:t[37],icon:Z,disabled:!t[34],$$slots:{default:[et]},$$scope:{ctx:t}}});return{c(){e=l("div"),i(a.$$.fragment),this.h()},l(t){e=r(t,"DIV",{class:!0});var s=u(e);m(a.$$.fragment,s),s.forEach(f),this.h()},h(){_(e,"class","actions topActions svelte-5t8ucs")},m(t,l){h(t,e,l),E(a,e,null),s=!0},p(t,e){const s={};8&e[1]&&(s.disabled=!t[34]),16777216&e[2]&&(s.$$scope={dirty:e,ctx:t}),a.$set(s)},i(t){s||(I(a.$$.fragment,t),s=!0)},o(t){g(a.$$.fragment,t),s=!1},d(t){t&&f(e),v(a)}}}function et(t){let e,s=B.EDIT_PROJECT_DETAILS.CONFIRM+"";return{c(){e=n(s)},l(t){e=d(t,s)},m(t,s){h(t,e,s)},p:G,d(t){t&&f(e)}}}function st(t){let e,s,a,o,T,D,L,S,b,N,y,V,J,M,w,k,F,j,U,G,X,Y,q,Z,z,Q,tt,et,st,ct,it,ot,rt=B.EDIT_PROJECT_DETAILS.LOCATION+"",ut=B.EDIT_PROJECT_DETAILS.LOCATION_TIP+"",dt=B.EDIT_PROJECT_DETAILS.CATEGORIES+"",ft=B.EDIT_PROJECT_DETAILS.TAGS+"",$t=B.EDIT_PROJECT_DETAILS.TAGS_TIP+"",mt=B.EDIT_PROJECT_DETAILS.SKILLS+"",pt=B.EDIT_PROJECT_DETAILS.SKILLS_TIP+"",ht="edit"===t[35]&&at(t);function Et(t,e){return t[7]?nt:lt}let It=Et(t),gt=It(t);function vt(e){t[57].call(null,e)}let Tt={isCategorySelector:!0};void 0!==t[3]&&(Tt.filterString=t[3]);const Dt=new K({props:Tt});return H.push(()=>W(Dt,"filterString",vt)),{c(){e=l("div"),ht&&ht.c(),s=c(),a=l("div"),o=l("div"),T=n(rt),D=l("span"),L=c(),S=l("input"),b=c(),N=l("div"),y=l("div"),V=n(dt),J=c(),gt.c(),M=c(),i(Dt.$$.fragment),k=c(),F=l("div"),j=l("div"),U=n(ft),G=l("span"),X=c(),Y=l("textarea"),q=c(),Z=l("div"),z=l("div"),Q=n(mt),tt=l("span"),et=c(),st=l("textarea"),this.h()},l(t){e=r(t,"DIV",{class:!0});var l=u(e);ht&&ht.l(l),s=$(l),a=r(l,"DIV",{class:!0});var n=u(a);o=r(n,"DIV",{class:!0});var c=u(o);T=d(c,rt),D=r(c,"SPAN",{class:!0}),u(D).forEach(f),c.forEach(f),L=$(n),S=r(n,"INPUT",{type:!0,class:!0}),n.forEach(f),b=$(l),N=r(l,"DIV",{id:!0,class:!0});var i=u(N);y=r(i,"DIV",{class:!0});var p=u(y);V=d(p,dt),J=$(p),gt.l(p),p.forEach(f),M=$(i),m(Dt.$$.fragment,i),i.forEach(f),k=$(l),F=r(l,"DIV",{class:!0});var h=u(F);j=r(h,"DIV",{class:!0});var E=u(j);U=d(E,ft),G=r(E,"SPAN",{class:!0}),u(G).forEach(f),E.forEach(f),X=$(h),Y=r(h,"TEXTAREA",{}),u(Y).forEach(f),h.forEach(f),q=$(l),Z=r(l,"DIV",{class:!0});var I=u(Z);z=r(I,"DIV",{class:!0});var g=u(z);Q=d(g,mt),tt=r(g,"SPAN",{class:!0}),u(tt).forEach(f),g.forEach(f),et=$(I),st=r(I,"TEXTAREA",{}),u(st).forEach(f),I.forEach(f),l.forEach(f),this.h()},h(){_(D,"class","tip svelte-5t8ucs"),_(o,"class","label labelDetails svelte-5t8ucs"),_(S,"type","text"),_(S,"class","svelte-5t8ucs"),_(a,"class","field svelte-5t8ucs"),_(y,"class","label labelDetails svelte-5t8ucs"),_(N,"id","categories"),_(N,"class","field descriptionField svelte-5t8ucs"),_(G,"class","tip svelte-5t8ucs"),_(j,"class","label labelDetails svelte-5t8ucs"),_(F,"class","field descriptionField svelte-5t8ucs"),_(tt,"class","tip svelte-5t8ucs"),_(z,"class","label labelDetails svelte-5t8ucs"),_(Z,"class","field descriptionField svelte-5t8ucs"),_(e,"class","mainProjectDetails svelte-5t8ucs")},m(l,n){h(l,e,n),ht&&ht.m(e,null),p(e,s),p(e,a),p(a,o),p(o,T),p(o,D),D.innerHTML=ut,p(a,L),p(a,S),A(S,t[6]),t[55](S),p(e,b),p(e,N),p(N,y),p(y,V),p(y,J),gt.m(y,null),p(N,M),E(Dt,N,null),p(e,k),p(e,F),p(F,j),p(j,U),p(j,G),G.innerHTML=$t,p(F,X),p(F,Y),A(Y,t[4]),t[59](Y),p(e,q),p(e,Z),p(Z,z),p(z,Q),p(z,tt),tt.innerHTML=pt,p(Z,et),p(Z,st),A(st,t[5]),t[61](st),ct=!0,it||(ot=[C(S,"input",t[54]),C(S,"keypress",t[56]),C(Y,"input",t[58]),C(st,"input",t[60])],it=!0)},p(t,a){"edit"===t[35]?ht?(ht.p(t,a),16&a[1]&&I(ht,1)):((ht=at(t)).c(),I(ht,1),ht.m(e,s)):ht&&(R(),g(ht,1,1,()=>{ht=null}),x()),64&a[0]&&S.value!==t[6]&&A(S,t[6]),It===(It=Et(t))&&gt?gt.p(t,a):(gt.d(1),(gt=It(t))&&(gt.c(),gt.m(y,null)));const l={};!w&&8&a[0]&&(w=!0,l.filterString=t[3],O(()=>w=!1)),Dt.$set(l),16&a[0]&&A(Y,t[4]),32&a[0]&&A(st,t[5])},i(t){ct||(I(ht),I(Dt.$$.fragment,t),ct=!0)},o(t){g(ht),g(Dt.$$.fragment,t),ct=!1},d(s){s&&f(e),ht&&ht.d(),t[55](null),gt.d(),v(Dt),t[59](null),t[61](null),it=!1,P(ot)}}}function at(t){let e,s,a,o,T,R,x,b,N,y,V,J,M,w,k,F,U,G,X,K,Z,z,Q,tt,et,st,at,lt,nt=B.NEW_PROJECT.TITLE+"",ct=B.NEW_PROJECT.DESCRIPTION+"",it=(t[14]?t[14]:t[13])+"",ot=t[14]?" characters over":t[33]?" characters remaining":"",rt=B.NEW_PROJECT.HEADER_IMAGE+"";function ut(e){t[48].call(null,e)}function dt(e){t[49].call(null,e)}function ft(e){t[50].call(null,e)}function $t(e){t[51].call(null,e)}let mt={maxlength:D.MAX_PROJECT_DESCRIPTION_CHARS};void 0!==t[1]&&(mt.value=t[1]),void 0!==t[24]&&(mt.field=t[24]),void 0!==t[13]&&(mt.remainingChars=t[13]),void 0!==t[14]&&(mt.charsOver=t[14]);const pt=new Y({props:mt});function ht(e){t[52].call(null,e)}function Et(e){t[53].call(null,e)}H.push(()=>W(pt,"value",ut)),H.push(()=>W(pt,"field",dt)),H.push(()=>W(pt,"remainingChars",ft)),H.push(()=>W(pt,"charsOver",$t)),pt.$on("keypress",j);let It={uploadType:"projectHeader",itemId:t[36]};void 0!==t[2]&&(It.image=t[2]),void 0!==t[8]&&(It.fileIsUploading=t[8]);const gt=new q({props:It});return H.push(()=>W(gt,"image",ht)),H.push(()=>W(gt,"fileIsUploading",Et)),{c(){e=l("div"),s=l("div"),a=n(nt),o=c(),T=l("input"),R=c(),x=l("div"),b=l("div"),N=n(ct),y=c(),V=l("div"),J=n(it),M=n(ot),w=c(),i(pt.$$.fragment),X=c(),K=l("div"),Z=l("div"),z=n(rt),Q=c(),i(gt.$$.fragment),this.h()},l(t){e=r(t,"DIV",{class:!0});var l=u(e);s=r(l,"DIV",{class:!0});var n=u(s);a=d(n,nt),n.forEach(f),o=$(l),T=r(l,"INPUT",{type:!0,class:!0}),l.forEach(f),R=$(t),x=r(t,"DIV",{class:!0});var c=u(x);b=r(c,"DIV",{class:!0});var i=u(b);N=d(i,ct),i.forEach(f),y=$(c),V=r(c,"DIV",{class:!0});var p=u(V);J=d(p,it),M=d(p,ot),p.forEach(f),w=$(c),m(pt.$$.fragment,c),c.forEach(f),X=$(t),K=r(t,"DIV",{class:!0});var h=u(K);Z=r(h,"DIV",{class:!0});var E=u(Z);z=d(E,rt),E.forEach(f),Q=$(h),m(gt.$$.fragment,h),h.forEach(f),this.h()},h(){_(s,"class","label svelte-5t8ucs"),_(T,"type","text"),_(T,"class","svelte-5t8ucs"),_(e,"class","field svelte-5t8ucs"),_(b,"class","label svelte-5t8ucs"),_(V,"class","fieldCharCount svelte-5t8ucs"),L(V,"charCountLow",t[33]),L(V,"charCountOver",t[14]),_(x,"class","field descriptionField svelte-5t8ucs"),_(Z,"class","label headerImageLabel svelte-5t8ucs"),_(K,"class","field headerImageField svelte-5t8ucs")},m(l,n){h(l,e,n),p(e,s),p(s,a),p(e,o),p(e,T),A(T,t[0]),h(l,R,n),h(l,x,n),p(x,b),p(b,N),p(x,y),p(x,V),p(V,J),p(V,M),p(x,w),E(pt,x,null),h(l,X,n),h(l,K,n),p(K,Z),p(Z,z),p(K,Q),E(gt,K,null),st=!0,at||(lt=[C(T,"input",t[46]),C(T,"keypress",t[47])],at=!0)},p(t,e){1&e[0]&&T.value!==t[0]&&A(T,t[0]),(!st||24576&e[0])&&it!==(it=(t[14]?t[14]:t[13])+"")&&S(J,it),(!st||16384&e[0]|4&e[1])&&ot!==(ot=t[14]?" characters over":t[33]?" characters remaining":"")&&S(M,ot),4&e[1]&&L(V,"charCountLow",t[33]),16384&e[0]&&L(V,"charCountOver",t[14]);const s={};!k&&2&e[0]&&(k=!0,s.value=t[1],O(()=>k=!1)),!F&&16777216&e[0]&&(F=!0,s.field=t[24],O(()=>F=!1)),!U&&8192&e[0]&&(U=!0,s.remainingChars=t[13],O(()=>U=!1)),!G&&16384&e[0]&&(G=!0,s.charsOver=t[14],O(()=>G=!1)),pt.$set(s);const a={};32&e[1]&&(a.itemId=t[36]),!tt&&4&e[0]&&(tt=!0,a.image=t[2],O(()=>tt=!1)),!et&&256&e[0]&&(et=!0,a.fileIsUploading=t[8],O(()=>et=!1)),gt.$set(a)},i(t){st||(I(pt.$$.fragment,t),I(gt.$$.fragment,t),st=!0)},o(t){g(pt.$$.fragment,t),g(gt.$$.fragment,t),st=!1},d(t){t&&f(e),t&&f(R),t&&f(x),v(pt),t&&f(X),t&&f(K),v(gt),at=!1,P(lt)}}}function lt(t){let e,s=B.EDIT_PROJECT_DETAILS.CATEGORIES_TIP+"";return{c(){e=l("span"),this.h()},l(t){e=r(t,"SPAN",{class:!0}),u(e).forEach(f),this.h()},h(){_(e,"class","tip svelte-5t8ucs")},m(t,a){h(t,e,a),e.innerHTML=s},p:G,d(t){t&&f(e)}}}function nt(t){let e,s;return{c(){e=l("span"),s=n("please select at least one category"),this.h()},l(t){e=r(t,"SPAN",{class:!0});var a=u(e);s=d(a,"please select at least one category"),a.forEach(f),this.h()},h(){_(e,"class","errorLabel svelte-5t8ucs")},m(t,a){h(t,e,a),p(e,s)},p:G,d(t){t&&f(e)}}}function ct(t){let e,s,a,i,o,m,E,v,T,D,L,S,O,b,N,y,V,J,M,w,k,F,j,H,U,G,W,X,K,Y,q,Z,z,Q,tt,et,st,at,lt,nt,ct,rt,ut,$t,mt,Et=B.EDIT_PROJECT_DETAILS.OVERVIEW_HEADING+"",It=B.EDIT_PROJECT_DETAILS.DETAIL_1_LABEL+"",Tt=B.EDIT_PROJECT_DETAILS.DETAIL_1_TIP+"",Dt=B.EDIT_PROJECT_DETAILS.DETAIL_2_LABEL+"",_t=B.EDIT_PROJECT_DETAILS.DETAIL_2_TIP+"",At=B.EDIT_PROJECT_DETAILS.DETAIL_3_LABEL+"",Ct=B.EDIT_PROJECT_DETAILS.DETAIL_3_TIP+"",Lt=B.EDIT_PROJECT_DETAILS.DETAIL_4_LABEL+"",St=B.EDIT_PROJECT_DETAILS.DETAIL_4_TIP+"";const Ot=[ot,it],Pt=[];function Rt(t,e){return t[19]||t[23][0]?0:1}i=Rt(t),o=Pt[i]=Ot[i](t);const xt=[ft,dt],bt=[];function Nt(t,e){return t[20]||t[23][1]?0:1}b=Nt(t),N=bt[b]=xt[b](t);const yt=[ht,pt],Vt=[];function Jt(t,e){return t[21]||t[23][2]?0:1}H=Jt(t),U=Vt[H]=yt[H](t);const Mt=[vt,gt],wt=[];function kt(t,e){return t[22]||t[23][3]?0:1}return Q=kt(t),tt=wt[Q]=Mt[Q](t),{c(){e=l("div"),s=n(Et),a=c(),o.c(),m=c(),E=l("div"),v=l("div"),T=n(It),D=l("span"),L=c(),S=l("textarea"),O=c(),N.c(),y=c(),V=l("div"),J=l("div"),M=n(Dt),w=l("span"),k=c(),F=l("textarea"),j=c(),U.c(),G=c(),W=l("div"),X=l("div"),K=n(At),Y=l("span"),q=c(),Z=l("textarea"),z=c(),tt.c(),et=c(),st=l("div"),at=l("div"),lt=n(Lt),nt=l("span"),ct=c(),rt=l("textarea"),this.h()},l(t){e=r(t,"DIV",{class:!0});var l=u(e);s=d(l,Et),l.forEach(f),a=$(t),o.l(t),m=$(t),E=r(t,"DIV",{class:!0});var n=u(E);v=r(n,"DIV",{class:!0});var c=u(v);T=d(c,It),D=r(c,"SPAN",{class:!0}),u(D).forEach(f),c.forEach(f),L=$(n),S=r(n,"TEXTAREA",{class:!0}),u(S).forEach(f),n.forEach(f),O=$(t),N.l(t),y=$(t),V=r(t,"DIV",{class:!0});var i=u(V);J=r(i,"DIV",{class:!0});var p=u(J);M=d(p,Dt),w=r(p,"SPAN",{class:!0}),u(w).forEach(f),p.forEach(f),k=$(i),F=r(i,"TEXTAREA",{class:!0}),u(F).forEach(f),i.forEach(f),j=$(t),U.l(t),G=$(t),W=r(t,"DIV",{class:!0});var h=u(W);X=r(h,"DIV",{class:!0});var I=u(X);K=d(I,At),Y=r(I,"SPAN",{class:!0}),u(Y).forEach(f),I.forEach(f),q=$(h),Z=r(h,"TEXTAREA",{class:!0}),u(Z).forEach(f),h.forEach(f),z=$(t),tt.l(t),et=$(t),st=r(t,"DIV",{class:!0});var g=u(st);at=r(g,"DIV",{class:!0});var _=u(at);lt=d(_,Lt),nt=r(_,"SPAN",{class:!0}),u(nt).forEach(f),_.forEach(f),ct=$(g),rt=r(g,"TEXTAREA",{class:!0}),u(rt).forEach(f),g.forEach(f),this.h()},h(){_(e,"class","sectionTitle svelte-5t8ucs"),_(D,"class","tip svelte-5t8ucs"),_(v,"class","label labelDetails svelte-5t8ucs"),_(S,"class","detailTextarea"),_(E,"class","field svelte-5t8ucs"),_(w,"class","tip svelte-5t8ucs"),_(J,"class","label labelDetails svelte-5t8ucs"),_(F,"class","detailTextarea"),_(V,"class","field svelte-5t8ucs"),_(Y,"class","tip svelte-5t8ucs"),_(X,"class","label labelDetails svelte-5t8ucs"),_(Z,"class","detailTextarea"),_(W,"class","field svelte-5t8ucs"),_(nt,"class","tip svelte-5t8ucs"),_(at,"class","label labelDetails svelte-5t8ucs"),_(rt,"class","detailTextarea"),_(st,"class","field svelte-5t8ucs")},m(l,n){h(l,e,n),p(e,s),h(l,a,n),Pt[i].m(l,n),h(l,m,n),h(l,E,n),p(E,v),p(v,T),p(v,D),D.innerHTML=Tt,p(E,L),p(E,S),t[66](S),A(S,t[15]),h(l,O,n),bt[b].m(l,n),h(l,y,n),h(l,V,n),p(V,J),p(J,M),p(J,w),w.innerHTML=_t,p(V,k),p(V,F),t[72](F),A(F,t[16]),h(l,j,n),Vt[H].m(l,n),h(l,G,n),h(l,W,n),p(W,X),p(X,K),p(X,Y),Y.innerHTML=Ct,p(W,q),p(W,Z),t[78](Z),A(Z,t[17]),h(l,z,n),wt[Q].m(l,n),h(l,et,n),h(l,st,n),p(st,at),p(at,lt),p(at,nt),nt.innerHTML=St,p(st,ct),p(st,rt),t[84](rt),A(rt,t[18]),ut=!0,$t||(mt=[C(S,"input",t[67]),C(F,"input",t[73]),C(Z,"input",t[79]),C(rt,"input",t[85])],$t=!0)},p(t,e){let s=i;(i=Rt(t))===s?Pt[i].p(t,e):(R(),g(Pt[s],1,1,()=>{Pt[s]=null}),x(),(o=Pt[i])||(o=Pt[i]=Ot[i](t)).c(),I(o,1),o.m(m.parentNode,m)),32768&e[0]&&A(S,t[15]);let a=b;(b=Nt(t))===a?bt[b].p(t,e):(R(),g(bt[a],1,1,()=>{bt[a]=null}),x(),(N=bt[b])||(N=bt[b]=xt[b](t)).c(),I(N,1),N.m(y.parentNode,y)),65536&e[0]&&A(F,t[16]);let l=H;(H=Jt(t))===l?Vt[H].p(t,e):(R(),g(Vt[l],1,1,()=>{Vt[l]=null}),x(),(U=Vt[H])||(U=Vt[H]=yt[H](t)).c(),I(U,1),U.m(G.parentNode,G)),131072&e[0]&&A(Z,t[17]);let n=Q;(Q=kt(t))===n?wt[Q].p(t,e):(R(),g(wt[n],1,1,()=>{wt[n]=null}),x(),(tt=wt[Q])||(tt=wt[Q]=Mt[Q](t)).c(),I(tt,1),tt.m(et.parentNode,et)),262144&e[0]&&A(rt,t[18])},i(t){ut||(I(o),I(N),I(U),I(tt),ut=!0)},o(t){g(o),g(N),g(U),g(tt),ut=!1},d(s){s&&f(e),s&&f(a),Pt[i].d(s),s&&f(m),s&&f(E),t[66](null),s&&f(O),bt[b].d(s),s&&f(y),s&&f(V),t[72](null),s&&f(j),Vt[H].d(s),s&&f(G),s&&f(W),t[78](null),s&&f(z),wt[Q].d(s),s&&f(et),s&&f(st),t[84](null),$t=!1,P(mt)}}}function it(t){let e,s;const a=new U({props:{className:"addImage",icon:z,onClick:t[65],$$slots:{default:[rt]},$$scope:{ctx:t}}});return{c(){e=l("div"),i(a.$$.fragment),this.h()},l(t){e=r(t,"DIV",{class:!0});var s=u(e);m(a.$$.fragment,s),s.forEach(f),this.h()},h(){_(e,"class","imageField svelte-5t8ucs")},m(t,l){h(t,e,l),E(a,e,null),s=!0},p(t,e){const s={};16777216&e[2]&&(s.$$scope={dirty:e,ctx:t}),a.$set(s)},i(t){s||(I(a.$$.fragment,t),s=!0)},o(t){g(a.$$.fragment,t),s=!1},d(t){t&&f(e),v(a)}}}function ot(t){let e,s,a,n,o;const d=new U({props:{className:"addImage removeImage",icon:X,onClick:t[62],$$slots:{default:[ut]},$$scope:{ctx:t}}});function p(e){t[63].call(null,e)}function T(e){t[64].call(null,e)}let D={className:"detailImageSelector",containMode:!0,imageType:Jt,itemIndex:"1",uploadType:"projectDetail",itemId:t[36]};void 0!==t[19]&&(D.image=t[19]),void 0!==t[9]&&(D.fileIsUploading=t[9]);const A=new q({props:D});return H.push(()=>W(A,"image",p)),H.push(()=>W(A,"fileIsUploading",T)),{c(){e=l("div"),i(d.$$.fragment),s=c(),i(A.$$.fragment),this.h()},l(t){e=r(t,"DIV",{class:!0});var a=u(e);m(d.$$.fragment,a),a.forEach(f),s=$(t),m(A.$$.fragment,t),this.h()},h(){_(e,"class","imageField svelte-5t8ucs")},m(t,a){h(t,e,a),E(d,e,null),h(t,s,a),E(A,t,a),o=!0},p(t,e){const s={};16777216&e[2]&&(s.$$scope={dirty:e,ctx:t}),d.$set(s);const l={};32&e[1]&&(l.itemId=t[36]),!a&&524288&e[0]&&(a=!0,l.image=t[19],O(()=>a=!1)),!n&&512&e[0]&&(n=!0,l.fileIsUploading=t[9],O(()=>n=!1)),A.$set(l)},i(t){o||(I(d.$$.fragment,t),I(A.$$.fragment,t),o=!0)},o(t){g(d.$$.fragment,t),g(A.$$.fragment,t),o=!1},d(t){t&&f(e),v(d),t&&f(s),v(A,t)}}}function rt(t){let e,s=B.EDIT_PROJECT_DETAILS.ADD_IMAGE+"";return{c(){e=n(s)},l(t){e=d(t,s)},m(t,s){h(t,e,s)},p:G,d(t){t&&f(e)}}}function ut(t){let e,s=B.EDIT_PROJECT_DETAILS.REMOVE_IMAGE+"";return{c(){e=n(s)},l(t){e=d(t,s)},m(t,s){h(t,e,s)},p:G,d(t){t&&f(e)}}}function dt(t){let e,s;const a=new U({props:{className:"addImage",icon:z,onClick:t[71],$$slots:{default:[$t]},$$scope:{ctx:t}}});return{c(){e=l("div"),i(a.$$.fragment),this.h()},l(t){e=r(t,"DIV",{class:!0});var s=u(e);m(a.$$.fragment,s),s.forEach(f),this.h()},h(){_(e,"class","imageField svelte-5t8ucs")},m(t,l){h(t,e,l),E(a,e,null),s=!0},p(t,e){const s={};16777216&e[2]&&(s.$$scope={dirty:e,ctx:t}),a.$set(s)},i(t){s||(I(a.$$.fragment,t),s=!0)},o(t){g(a.$$.fragment,t),s=!1},d(t){t&&f(e),v(a)}}}function ft(t){let e,s,a,n,o;const d=new U({props:{className:"addImage",onClick:t[68],$$slots:{default:[mt]},$$scope:{ctx:t}}});function p(e){t[69].call(null,e)}function T(e){t[70].call(null,e)}let D={className:"detailImageSelector",containMode:!0,imageType:Jt,itemIndex:"2",uploadType:"projectDetail",itemId:t[36]};void 0!==t[20]&&(D.image=t[20]),void 0!==t[10]&&(D.fileIsUploading=t[10]);const A=new q({props:D});return H.push(()=>W(A,"image",p)),H.push(()=>W(A,"fileIsUploading",T)),{c(){e=l("div"),i(d.$$.fragment),s=c(),i(A.$$.fragment),this.h()},l(t){e=r(t,"DIV",{class:!0});var a=u(e);m(d.$$.fragment,a),a.forEach(f),s=$(t),m(A.$$.fragment,t),this.h()},h(){_(e,"class","imageField svelte-5t8ucs")},m(t,a){h(t,e,a),E(d,e,null),h(t,s,a),E(A,t,a),o=!0},p(t,e){const s={};16777216&e[2]&&(s.$$scope={dirty:e,ctx:t}),d.$set(s);const l={};32&e[1]&&(l.itemId=t[36]),!a&&1048576&e[0]&&(a=!0,l.image=t[20],O(()=>a=!1)),!n&&1024&e[0]&&(n=!0,l.fileIsUploading=t[10],O(()=>n=!1)),A.$set(l)},i(t){o||(I(d.$$.fragment,t),I(A.$$.fragment,t),o=!0)},o(t){g(d.$$.fragment,t),g(A.$$.fragment,t),o=!1},d(t){t&&f(e),v(d),t&&f(s),v(A,t)}}}function $t(t){let e,s=B.EDIT_PROJECT_DETAILS.ADD_IMAGE+"";return{c(){e=n(s)},l(t){e=d(t,s)},m(t,s){h(t,e,s)},p:G,d(t){t&&f(e)}}}function mt(t){let e,s=B.EDIT_PROJECT_DETAILS.REMOVE_IMAGE+"";return{c(){e=n(s)},l(t){e=d(t,s)},m(t,s){h(t,e,s)},p:G,d(t){t&&f(e)}}}function pt(t){let e,s;const a=new U({props:{className:"addImage",icon:z,onClick:t[77],$$slots:{default:[Et]},$$scope:{ctx:t}}});return{c(){e=l("div"),i(a.$$.fragment),this.h()},l(t){e=r(t,"DIV",{class:!0});var s=u(e);m(a.$$.fragment,s),s.forEach(f),this.h()},h(){_(e,"class","imageField svelte-5t8ucs")},m(t,l){h(t,e,l),E(a,e,null),s=!0},p(t,e){const s={};16777216&e[2]&&(s.$$scope={dirty:e,ctx:t}),a.$set(s)},i(t){s||(I(a.$$.fragment,t),s=!0)},o(t){g(a.$$.fragment,t),s=!1},d(t){t&&f(e),v(a)}}}function ht(t){let e,s,a,n,o;const d=new U({props:{className:"addImage",onClick:t[74],$$slots:{default:[It]},$$scope:{ctx:t}}});function p(e){t[75].call(null,e)}function T(e){t[76].call(null,e)}let D={className:"detailImageSelector",containMode:!0,imageType:Jt,itemIndex:"3",uploadType:"projectDetail",itemId:t[36]};void 0!==t[21]&&(D.image=t[21]),void 0!==t[11]&&(D.fileIsUploading=t[11]);const A=new q({props:D});return H.push(()=>W(A,"image",p)),H.push(()=>W(A,"fileIsUploading",T)),{c(){e=l("div"),i(d.$$.fragment),s=c(),i(A.$$.fragment),this.h()},l(t){e=r(t,"DIV",{class:!0});var a=u(e);m(d.$$.fragment,a),a.forEach(f),s=$(t),m(A.$$.fragment,t),this.h()},h(){_(e,"class","imageField svelte-5t8ucs")},m(t,a){h(t,e,a),E(d,e,null),h(t,s,a),E(A,t,a),o=!0},p(t,e){const s={};16777216&e[2]&&(s.$$scope={dirty:e,ctx:t}),d.$set(s);const l={};32&e[1]&&(l.itemId=t[36]),!a&&2097152&e[0]&&(a=!0,l.image=t[21],O(()=>a=!1)),!n&&2048&e[0]&&(n=!0,l.fileIsUploading=t[11],O(()=>n=!1)),A.$set(l)},i(t){o||(I(d.$$.fragment,t),I(A.$$.fragment,t),o=!0)},o(t){g(d.$$.fragment,t),g(A.$$.fragment,t),o=!1},d(t){t&&f(e),v(d),t&&f(s),v(A,t)}}}function Et(t){let e,s=B.EDIT_PROJECT_DETAILS.ADD_IMAGE+"";return{c(){e=n(s)},l(t){e=d(t,s)},m(t,s){h(t,e,s)},p:G,d(t){t&&f(e)}}}function It(t){let e,s=B.EDIT_PROJECT_DETAILS.REMOVE_IMAGE+"";return{c(){e=n(s)},l(t){e=d(t,s)},m(t,s){h(t,e,s)},p:G,d(t){t&&f(e)}}}function gt(t){let e,s;const a=new U({props:{className:"addImage",icon:z,onClick:t[83],$$slots:{default:[Tt]},$$scope:{ctx:t}}});return{c(){e=l("div"),i(a.$$.fragment),this.h()},l(t){e=r(t,"DIV",{class:!0});var s=u(e);m(a.$$.fragment,s),s.forEach(f),this.h()},h(){_(e,"class","imageField svelte-5t8ucs")},m(t,l){h(t,e,l),E(a,e,null),s=!0},p(t,e){const s={};16777216&e[2]&&(s.$$scope={dirty:e,ctx:t}),a.$set(s)},i(t){s||(I(a.$$.fragment,t),s=!0)},o(t){g(a.$$.fragment,t),s=!1},d(t){t&&f(e),v(a)}}}function vt(t){let e,s,a,n,o;const d=new U({props:{className:"addImage",onClick:t[80],$$slots:{default:[Dt]},$$scope:{ctx:t}}});function p(e){t[81].call(null,e)}function T(e){t[82].call(null,e)}let D={className:"detailImageSelector",containMode:!0,imageType:Jt,itemIndex:"4",uploadType:"projectDetail",itemId:t[36]};void 0!==t[22]&&(D.image=t[22]),void 0!==t[12]&&(D.fileIsUploading=t[12]);const A=new q({props:D});return H.push(()=>W(A,"image",p)),H.push(()=>W(A,"fileIsUploading",T)),{c(){e=l("div"),i(d.$$.fragment),s=c(),i(A.$$.fragment),this.h()},l(t){e=r(t,"DIV",{class:!0});var a=u(e);m(d.$$.fragment,a),a.forEach(f),s=$(t),m(A.$$.fragment,t),this.h()},h(){_(e,"class","imageField svelte-5t8ucs")},m(t,a){h(t,e,a),E(d,e,null),h(t,s,a),E(A,t,a),o=!0},p(t,e){const s={};16777216&e[2]&&(s.$$scope={dirty:e,ctx:t}),d.$set(s);const l={};32&e[1]&&(l.itemId=t[36]),!a&&4194304&e[0]&&(a=!0,l.image=t[22],O(()=>a=!1)),!n&&4096&e[0]&&(n=!0,l.fileIsUploading=t[12],O(()=>n=!1)),A.$set(l)},i(t){o||(I(d.$$.fragment,t),I(A.$$.fragment,t),o=!0)},o(t){g(d.$$.fragment,t),g(A.$$.fragment,t),o=!1},d(t){t&&f(e),v(d),t&&f(s),v(A,t)}}}function Tt(t){let e,s=B.EDIT_PROJECT_DETAILS.ADD_IMAGE+"";return{c(){e=n(s)},l(t){e=d(t,s)},m(t,s){h(t,e,s)},p:G,d(t){t&&f(e)}}}function Dt(t){let e,s=B.EDIT_PROJECT_DETAILS.REMOVE_IMAGE+"";return{c(){e=n(s)},l(t){e=d(t,s)},m(t,s){h(t,e,s)},p:G,d(t){t&&f(e)}}}function _t(t){let e;const s=new U({props:{className:"cancelButton",onClick:t[40],icon:Q,$$slots:{default:[At]},$$scope:{ctx:t}}});return{c(){i(s.$$.fragment)},l(t){m(s.$$.fragment,t)},m(t,a){E(s,t,a),e=!0},p(t,e){const a={};16777216&e[2]&&(a.$$scope={dirty:e,ctx:t}),s.$set(a)},i(t){e||(I(s.$$.fragment,t),e=!0)},o(t){g(s.$$.fragment,t),e=!1},d(t){v(s,t)}}}function At(t){let e,s=B.EDIT_PROJECT_DETAILS.CANCEL+"";return{c(){e=n(s)},l(t){e=d(t,s)},m(t,s){h(t,e,s)},p:G,d(t){t&&f(e)}}}function Ct(t){let e;const s=new U({props:{className:"saveButton",onClick:t[37],disabled:!t[34],icon:Z,$$slots:{default:[Ot]},$$scope:{ctx:t}}});return{c(){i(s.$$.fragment)},l(t){m(s.$$.fragment,t)},m(t,a){E(s,t,a),e=!0},p(t,e){const a={};8&e[1]&&(a.disabled=!t[34]),16777216&e[2]&&(a.$$scope={dirty:e,ctx:t}),s.$set(a)},i(t){e||(I(s.$$.fragment,t),e=!0)},o(t){g(s.$$.fragment,t),e=!1},d(t){v(s,t)}}}function Lt(t){let e;const s=new U({props:{className:"saveButton",onClick:t[37],disabled:!t[34],icon:Z,$$slots:{default:[Pt]},$$scope:{ctx:t}}});return{c(){i(s.$$.fragment)},l(t){m(s.$$.fragment,t)},m(t,a){E(s,t,a),e=!0},p(t,e){const a={};8&e[1]&&(a.disabled=!t[34]),16777216&e[2]&&(a.$$scope={dirty:e,ctx:t}),s.$set(a)},i(t){e||(I(s.$$.fragment,t),e=!0)},o(t){g(s.$$.fragment,t),e=!1},d(t){v(s,t)}}}function St(t){let e;const s=new U({props:{className:"saveButton",onClick:t[37],disabled:!t[34],icon:Z,$$slots:{default:[Rt]},$$scope:{ctx:t}}});return{c(){i(s.$$.fragment)},l(t){m(s.$$.fragment,t)},m(t,a){E(s,t,a),e=!0},p(t,e){const a={};8&e[1]&&(a.disabled=!t[34]),16777216&e[2]&&(a.$$scope={dirty:e,ctx:t}),s.$set(a)},i(t){e||(I(s.$$.fragment,t),e=!0)},o(t){g(s.$$.fragment,t),e=!1},d(t){v(s,t)}}}function Ot(t){let e,s=B.EDIT_PROJECT_DETAILS.CONFIRM+"";return{c(){e=n(s)},l(t){e=d(t,s)},m(t,s){h(t,e,s)},p:G,d(t){t&&f(e)}}}function Pt(t){let e,s=B.NEW_PROJECT.DETAILS_3_CONFIRM+"";return{c(){e=n(s)},l(t){e=d(t,s)},m(t,s){h(t,e,s)},p:G,d(t){t&&f(e)}}}function Rt(t){let e,s=B.NEW_PROJECT.DETAILS_2_CONFIRM+"";return{c(){e=n(s)},l(t){e=d(t,s)},m(t,s){h(t,e,s)},p:G,d(t){t&&f(e)}}}function xt(t){let e,s,a,n,i,o,d,m,E,v,T=("edit"===t[35]||"addDetails"===t[35])&&tt(t),D=("edit"===t[35]||"details2"===t[35])&&st(t),A="details2"!==t[35]&&ct(t),C=("edit"===t[35]||"addDetails"===t[35])&&_t(t);const L=[St,Lt,Ct],S=[];function O(t,e){return"details2"===t[35]?0:"details3"===t[35]?1:2}return m=O(t),E=S[m]=L[m](t),{c(){e=l("div"),s=l("div"),T&&T.c(),a=c(),D&&D.c(),n=c(),A&&A.c(),i=c(),o=l("div"),C&&C.c(),d=c(),E.c(),this.h()},l(t){e=r(t,"DIV",{class:!0});var l=u(e);s=r(l,"DIV",{class:!0});var c=u(s);T&&T.l(c),a=$(c),D&&D.l(c),n=$(c),A&&A.l(c),i=$(c),o=r(c,"DIV",{class:!0});var m=u(o);C&&C.l(m),d=$(m),E.l(m),m.forEach(f),c.forEach(f),l.forEach(f),this.h()},h(){_(o,"class","actions svelte-5t8ucs"),_(s,"class","panelContent svelte-5t8ucs"),_(e,"class","content svelte-5t8ucs")},m(t,l){h(t,e,l),p(e,s),T&&T.m(s,null),p(s,a),D&&D.m(s,null),p(s,n),A&&A.m(s,null),p(s,i),p(s,o),C&&C.m(o,null),p(o,d),S[m].m(o,null),v=!0},p(t,e){"edit"===t[35]||"addDetails"===t[35]?T?(T.p(t,e),16&e[1]&&I(T,1)):((T=tt(t)).c(),I(T,1),T.m(s,a)):T&&(R(),g(T,1,1,()=>{T=null}),x()),"edit"===t[35]||"details2"===t[35]?D?(D.p(t,e),16&e[1]&&I(D,1)):((D=st(t)).c(),I(D,1),D.m(s,n)):D&&(R(),g(D,1,1,()=>{D=null}),x()),"details2"!==t[35]?A?(A.p(t,e),16&e[1]&&I(A,1)):((A=ct(t)).c(),I(A,1),A.m(s,i)):A&&(R(),g(A,1,1,()=>{A=null}),x()),"edit"===t[35]||"addDetails"===t[35]?C?(C.p(t,e),16&e[1]&&I(C,1)):((C=_t(t)).c(),I(C,1),C.m(o,d)):C&&(R(),g(C,1,1,()=>{C=null}),x());let l=m;(m=O(t))===l?S[m].p(t,e):(R(),g(S[l],1,1,()=>{S[l]=null}),x(),(E=S[m])||(E=S[m]=L[m](t)).c(),I(E,1),E.m(o,null))},i(t){v||(I(T),I(D),I(A),I(C),I(E),v=!0)},o(t){g(T),g(D),g(A),g(C),g(E),v=!1},d(t){t&&f(e),T&&T.d(),D&&D.d(),A&&A.d(),C&&C.d(),S[m].d()}}}function bt(t){let e,s,T,D,_;document.title=e=t[32]+"Flock";const A=new a({props:{$$slots:{default:[xt]},$$scope:{ctx:t}}});return{c(){s=l("style"),T=n("body {\r\n\t\t\toverscroll-behavior-y: contain; /* Disables pull-to-refresh but allows overscroll effects. */\r\n\t\t}"),D=c(),i(A.$$.fragment)},l(t){const e=o('[data-svelte="svelte-1m76c4p"]',document.head);s=r(e,"STYLE",{});var a=u(s);T=d(a,"body {\r\n\t\t\toverscroll-behavior-y: contain; /* Disables pull-to-refresh but allows overscroll effects. */\r\n\t\t}"),a.forEach(f),e.forEach(f),D=$(t),m(A.$$.fragment,t)},m(t,e){p(document.head,s),p(s,T),h(t,D,e),E(A,t,e),_=!0},p(t,s){(!_||2&s[1])&&e!==(e=t[32]+"Flock")&&(document.title=e);const a={};2147483647&s[0]|61&s[1]|16777216&s[2]&&(a.$$scope={dirty:s,ctx:t}),A.$set(a)},i(t){_||(I(A.$$.fragment,t),_=!0)},o(t){g(A.$$.fragment,t),_=!1},d(t){f(s),t&&f(D),v(A,t)}}}const Nt=130,yt=388,Vt=4,Jt=null;function Mt(t){return Math.min(Math.max(t+Vt,Nt),yt)}function wt(t,e){return t&&t.details&&t.details[e]&&t.details[e].image||null}function kt(t,e,s){let a,l,n;T(t,b,t=>s(42,a=t)),T(t,N,t=>s(35,l=t)),T(t,y,t=>s(36,n=t));let c,i,o,r,u,d,f,$,m,p,h,E,I,g,v,_=a&&a.title||"",A=a&&a.description||"",C=a&&a.headerImage||"",L=a&&a.categories||"",S=a&&a.tags||"",O=a&&a.skills||"",P=a&&a.location||"",R=!1,x="",U="",G="",B="",W=null,X=null,K=null,Y=null,q=[],Z=!1;async function z(){await V(),E&&s(28,E.style="height: "+Mt(E.scrollHeight)+"px",E),I&&s(29,I.style="height: "+Mt(I.scrollHeight)+"px",I),g&&s(30,g.style="height: "+Mt(g.scrollHeight)+"px",g),v&&s(31,v.style="height: "+Mt(v.scrollHeight)+"px",v)}function Q(t,e){const s=t&&t.details&&t.details[e]&&t.details[e].detail||"";return s?J(s):s}function tt(t){s(23,q[t]=!0,q)}function et(t){switch(s(23,q[t]=!1,q),t){case 0:s(19,W=null);break;case 1:s(20,X=null);break;case 2:s(21,K=null);break;case 3:s(22,Y=null)}}let st,at,lt,nt;return t.$$.update=(()=>{2048&t.$$.dirty[1]&&s(32,st=a&&a.title&&a.title+" - "||""),7936&t.$$.dirty[0]&&s(43,at=c||i||o||r||u),8192&t.$$.dirty[0]&&s(33,lt=""!==d&&d<D.PROJECT_DESCRIPTION_CHARS_LOW),16387&t.$$.dirty[0]|4112&t.$$.dirty[1]&&s(34,nt=("edit"!==l||w(_)&&w(A)&&!f)&&!at),3072&t.$$.dirty[1]&&(Z||(s(41,Z=!0),s(15,x=Q(a,0)),s(16,U=Q(a,1)),s(17,G=Q(a,2)),s(18,B=Q(a,3)),s(19,W=wt(a,0)),s(20,X=wt(a,1)),s(21,K=wt(a,2)),s(22,Y=wt(a,3)),z()))}),[_,A,C,L,S,O,P,R,c,i,o,r,u,d,f,x,U,G,B,W,X,K,Y,q,$,m,p,h,E,I,g,v,st,lt,nt,l,n,function(){if(!nt)return;if(!L.trim())return s(7,R=!0),void M("categories");let t=null;a.details&&(t=JSON.parse(JSON.stringify(a.details))),t||(t=[]);const e=[x,U,G,B],n=[W,X,K,Y];for(let s=0;s<4;s++)t[s]=t[s]||{},t[s].detail=w(e[s]),t[s].image=n[s];const c={details:t};"edit"===l?Object.assign(c,{title:w(_),description:w(A),headerImage:C,categories:w(L),tags:w(S),skills:w(O),location:w(P)}):"details2"===l&&Object.assign(c,{categories:w(L),tags:w(S),skills:w(O),location:w(P)}),k(c,{editProjectDetails:"details2"===l,showProjectInfo:"addDetails"===l||"details3"===l})},tt,et,function(){F("projects/"+n)},Z,a,at,z,Q,function(){_=this.value,s(0,_)},t=>j(t,{target:$}),function(t){s(1,A=t)},function(t){s(24,$=t)},function(t){s(13,d=t)},function(t){s(14,f=t)},function(t){s(2,C=t)},function(t){s(8,c=t)},function(){P=this.value,s(6,P)},function(t){H[t?"unshift":"push"](()=>{s(27,h=t)})},t=>j(t,{target:E}),function(t){s(3,L=t)},function(){S=this.value,s(4,S)},function(t){H[t?"unshift":"push"](()=>{s(25,m=t)})},function(){O=this.value,s(5,O)},function(t){H[t?"unshift":"push"](()=>{s(26,p=t)})},()=>et(0),function(t){s(19,W=t),s(41,Z),s(42,a)},function(t){s(9,i=t)},()=>tt(0),function(t){H[t?"unshift":"push"](()=>{s(28,E=t)})},function(){x=this.value,s(15,x),s(41,Z),s(42,a)},()=>et(1),function(t){s(20,X=t),s(41,Z),s(42,a)},function(t){s(10,o=t)},()=>tt(1),function(t){H[t?"unshift":"push"](()=>{s(29,I=t)})},function(){U=this.value,s(16,U),s(41,Z),s(42,a)},()=>et(2),function(t){s(21,K=t),s(41,Z),s(42,a)},function(t){s(11,r=t)},()=>tt(2),function(t){H[t?"unshift":"push"](()=>{s(30,g=t)})},function(){G=this.value,s(17,G),s(41,Z),s(42,a)},()=>et(3),function(t){s(22,Y=t),s(41,Z),s(42,a)},function(t){s(12,u=t)},()=>tt(3),function(t){H[t?"unshift":"push"](()=>{s(31,v=t)})},function(){B=this.value,s(18,B),s(41,Z),s(42,a)}]}export default class extends t{constructor(t){super(),e(this,t,kt,bt,s,{},[-1,-1,-1])}}
