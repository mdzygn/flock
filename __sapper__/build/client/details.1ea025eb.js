import{S as e,i as t,s,q as a,R as l,z as n,C as c,H as i,r,u as o,T as d,d as u,A as f,D as $,x as p,b as m,E as h,t as E,c as I,F as g,J as v,ai as T,v as D,aJ as _,l as A,B as k,U as w,aM as C,ac as L,L as S,I as y,ad as O,c3 as P,bW as R,m as x,c4 as b,c5 as N,bl as V,c6 as J,N as M,aK as F,bC as j,n as z,W as H,K as U,V as G,aL as B,aI as K}from"./client.bf3f0363.js";import{S as W}from"./Proxy.b0650cb8.js";import"./Hotspot.d95f93bd.js";import"./SearchBar.617defcc.js";import{F as X}from"./FilterBar.48d1f08b.js";import"./next_arrow.b1598f96.js";import{L as q}from"./LimitedTextfield.6e90771b.js";import{I as Y}from"./ImageSelectionBox.9544d649.js";import{S as Q,A as Z}from"./save.71e29683.js";import{C as ee}from"./cancel.feaa218b.js";function te(e){let t,s;const l=new H({props:{className:"saveButton",onClick:e[37],icon:Q,disabled:!e[34],$$slots:{default:[se]},$$scope:{ctx:e}}});return{c(){t=a("div"),c(l.$$.fragment),this.h()},l(e){t=r(e,"DIV",{class:!0});var s=o(t);$(l.$$.fragment,s),s.forEach(u),this.h()},h(){D(t,"class","actions topActions svelte-19krwee")},m(e,a){m(e,t,a),h(l,t,null),s=!0},p(e,t){const s={};8&t[1]&&(s.disabled=!e[34]),2&t[3]&&(s.$$scope={dirty:t,ctx:e}),l.$set(s)},i(e){s||(E(l.$$.fragment,e),s=!0)},o(e){I(l.$$.fragment,e),s=!1},d(e){e&&u(t),g(l)}}}function se(e){let t,s=G.EDIT_PROJECT_DETAILS.CONFIRM+"";return{c(){t=l(s)},l(e){t=d(e,s)},m(e,s){m(e,t,s)},p:U,d(e){e&&u(t)}}}function ae(e){let t,s,i,v,T,k,w,O,P,R,x,b,N,V,J,M,F,j,H,U,K,W,q,Y,Q,Z,ee,te,se,ae,ie,re,oe=G.EDIT_PROJECT_DETAILS.LOCATION+"",de=G.EDIT_PROJECT_DETAILS.LOCATION_TIP+"",ue=G.EDIT_PROJECT_DETAILS.CATEGORIES+"",fe=G.EDIT_PROJECT_DETAILS.TAGS+"",$e=G.EDIT_PROJECT_DETAILS.TAGS_TIP+"",pe=G.EDIT_PROJECT_DETAILS.SKILLS+"",me=G.EDIT_PROJECT_DETAILS.SKILLS_TIP+"",he="edit"===e[35]&&le(e);function Ee(e,t){return e[7]?ce:ne}let Ie=Ee(e),ge=Ie(e);function ve(t){e[59].call(null,t)}let Te={isCategorySelector:!0};void 0!==e[3]&&(Te.filterString=e[3]);const De=new X({props:Te});return z.push(()=>B(De,"filterString",ve)),{c(){t=a("div"),he&&he.c(),s=n(),i=a("div"),v=a("div"),T=l(oe),k=a("span"),w=n(),O=a("input"),P=n(),R=a("div"),x=a("div"),b=l(ue),N=n(),ge.c(),V=n(),c(De.$$.fragment),M=n(),F=a("div"),j=a("div"),H=l(fe),U=a("span"),K=n(),W=a("textarea"),q=n(),Y=a("div"),Q=a("div"),Z=l(pe),ee=a("span"),te=n(),se=a("textarea"),this.h()},l(e){t=r(e,"DIV",{class:!0});var a=o(t);he&&he.l(a),s=f(a),i=r(a,"DIV",{class:!0});var l=o(i);v=r(l,"DIV",{class:!0});var n=o(v);T=d(n,oe),k=r(n,"SPAN",{class:!0}),o(k).forEach(u),n.forEach(u),w=f(l),O=r(l,"INPUT",{type:!0,autocapitalize:!0,class:!0}),l.forEach(u),P=f(a),R=r(a,"DIV",{id:!0,class:!0});var c=o(R);x=r(c,"DIV",{class:!0});var p=o(x);b=d(p,ue),N=f(p),ge.l(p),p.forEach(u),V=f(c),$(De.$$.fragment,c),c.forEach(u),M=f(a),F=r(a,"DIV",{class:!0});var m=o(F);j=r(m,"DIV",{class:!0});var h=o(j);H=d(h,fe),U=r(h,"SPAN",{class:!0}),o(U).forEach(u),h.forEach(u),K=f(m),W=r(m,"TEXTAREA",{}),o(W).forEach(u),m.forEach(u),q=f(a),Y=r(a,"DIV",{class:!0});var E=o(Y);Q=r(E,"DIV",{class:!0});var I=o(Q);Z=d(I,pe),ee=r(I,"SPAN",{class:!0}),o(ee).forEach(u),I.forEach(u),te=f(E),se=r(E,"TEXTAREA",{}),o(se).forEach(u),E.forEach(u),a.forEach(u),this.h()},h(){D(k,"class","tip svelte-19krwee"),D(v,"class","label labelDetails svelte-19krwee"),D(O,"type","text"),D(O,"autocapitalize","sentences"),D(O,"class","svelte-19krwee"),D(i,"class","field svelte-19krwee"),D(x,"class","label labelDetails svelte-19krwee"),D(R,"id","categories"),D(R,"class","field descriptionField svelte-19krwee"),D(U,"class","tip svelte-19krwee"),D(j,"class","label labelDetails svelte-19krwee"),D(F,"class","field descriptionField svelte-19krwee"),D(ee,"class","tip svelte-19krwee"),D(Q,"class","label labelDetails svelte-19krwee"),D(Y,"class","field descriptionField svelte-19krwee"),D(t,"class","mainProjectDetails svelte-19krwee")},m(a,l){m(a,t,l),he&&he.m(t,null),p(t,s),p(t,i),p(i,v),p(v,T),p(v,k),k.innerHTML=de,p(i,w),p(i,O),_(O,e[6]),e[56](O),p(t,P),p(t,R),p(R,x),p(x,b),p(x,N),ge.m(x,null),p(R,V),h(De,R,null),p(t,M),p(t,F),p(F,j),p(j,H),p(j,U),U.innerHTML=$e,p(F,K),p(F,W),_(W,e[4]),e[61](W),p(t,q),p(t,Y),p(Y,Q),p(Q,Z),p(Q,ee),ee.innerHTML=me,p(Y,te),p(Y,se),_(se,e[5]),e[64](se),ae=!0,ie||(re=[A(O,"input",e[55]),A(O,"keypress",e[57]),A(O,"keyup",e[58]),A(W,"input",e[60]),A(W,"keyup",e[62]),A(se,"input",e[63]),A(se,"keyup",e[65])],ie=!0)},p(e,a){"edit"===e[35]?he?(he.p(e,a),16&a[1]&&E(he,1)):((he=le(e)).c(),E(he,1),he.m(t,s)):he&&(S(),I(he,1,1,()=>{he=null}),y()),64&a[0]&&O.value!==e[6]&&_(O,e[6]),Ie===(Ie=Ee(e))&&ge?ge.p(e,a):(ge.d(1),(ge=Ie(e))&&(ge.c(),ge.m(x,null)));const l={};!J&&8&a[0]&&(J=!0,l.filterString=e[3],C(()=>J=!1)),De.$set(l),16&a[0]&&_(W,e[4]),32&a[0]&&_(se,e[5])},i(e){ae||(E(he),E(De.$$.fragment,e),ae=!0)},o(e){I(he),I(De.$$.fragment,e),ae=!1},d(s){s&&u(t),he&&he.d(),e[56](null),ge.d(),g(De),e[61](null),e[64](null),ie=!1,L(re)}}}function le(e){let t,s,i,v,S,y,O,P,R,x,b,N,V,J,M,j,H,U,K,W,X,Q,Z,ee,te,se,ae,le,ne=G.NEW_PROJECT.TITLE+"",ce=G.NEW_PROJECT.DESCRIPTION+"",ie=(e[14]?e[14]:e[13])+"",re=e[14]?" characters over":e[33]?" characters remaining":"",oe=G.NEW_PROJECT.HEADER_IMAGE+"";function de(t){e[49].call(null,t)}function ue(t){e[50].call(null,t)}function fe(t){e[51].call(null,t)}function $e(t){e[52].call(null,t)}let pe={maxlength:T.MAX_PROJECT_DESCRIPTION_CHARS,autocapitalize:"sentences"};void 0!==e[1]&&(pe.value=e[1]),void 0!==e[24]&&(pe.field=e[24]),void 0!==e[13]&&(pe.remainingChars=e[13]),void 0!==e[14]&&(pe.charsOver=e[14]);const me=new q({props:pe});function he(t){e[53].call(null,t)}function Ee(t){e[54].call(null,t)}z.push(()=>B(me,"value",de)),z.push(()=>B(me,"field",ue)),z.push(()=>B(me,"remainingChars",fe)),z.push(()=>B(me,"charsOver",$e)),me.$on("keypress",F);let Ie={uploadType:"projectHeader",itemId:e[36]};void 0!==e[2]&&(Ie.image=e[2]),void 0!==e[8]&&(Ie.fileIsUploading=e[8]);const ge=new Y({props:Ie});return z.push(()=>B(ge,"image",he)),z.push(()=>B(ge,"fileIsUploading",Ee)),{c(){t=a("div"),s=a("div"),i=l(ne),v=n(),S=a("input"),y=n(),O=a("div"),P=a("div"),R=l(ce),x=n(),b=a("div"),N=l(ie),V=l(re),J=n(),c(me.$$.fragment),K=n(),W=a("div"),X=a("div"),Q=l(oe),Z=n(),c(ge.$$.fragment),this.h()},l(e){t=r(e,"DIV",{class:!0});var a=o(t);s=r(a,"DIV",{class:!0});var l=o(s);i=d(l,ne),l.forEach(u),v=f(a),S=r(a,"INPUT",{type:!0,autocapitalize:!0,class:!0}),a.forEach(u),y=f(e),O=r(e,"DIV",{class:!0});var n=o(O);P=r(n,"DIV",{class:!0});var c=o(P);R=d(c,ce),c.forEach(u),x=f(n),b=r(n,"DIV",{class:!0});var p=o(b);N=d(p,ie),V=d(p,re),p.forEach(u),J=f(n),$(me.$$.fragment,n),n.forEach(u),K=f(e),W=r(e,"DIV",{class:!0});var m=o(W);X=r(m,"DIV",{class:!0});var h=o(X);Q=d(h,oe),h.forEach(u),Z=f(m),$(ge.$$.fragment,m),m.forEach(u),this.h()},h(){D(s,"class","label svelte-19krwee"),D(S,"type","text"),D(S,"autocapitalize","sentences"),D(S,"class","svelte-19krwee"),D(t,"class","field svelte-19krwee"),D(P,"class","label svelte-19krwee"),D(b,"class","fieldCharCount svelte-19krwee"),k(b,"charCountLow",e[33]),k(b,"charCountOver",e[14]),D(O,"class","field descriptionField svelte-19krwee"),D(X,"class","label headerImageLabel svelte-19krwee"),D(W,"class","field headerImageField svelte-19krwee")},m(a,l){m(a,t,l),p(t,s),p(s,i),p(t,v),p(t,S),_(S,e[0]),m(a,y,l),m(a,O,l),p(O,P),p(P,R),p(O,x),p(O,b),p(b,N),p(b,V),p(O,J),h(me,O,null),m(a,K,l),m(a,W,l),p(W,X),p(X,Q),p(W,Z),h(ge,W,null),se=!0,ae||(le=[A(S,"input",e[46]),A(S,"keypress",e[47]),A(S,"keyup",e[48])],ae=!0)},p(e,t){1&t[0]&&S.value!==e[0]&&_(S,e[0]),(!se||24576&t[0])&&ie!==(ie=(e[14]?e[14]:e[13])+"")&&w(N,ie),(!se||16384&t[0]|4&t[1])&&re!==(re=e[14]?" characters over":e[33]?" characters remaining":"")&&w(V,re),4&t[1]&&k(b,"charCountLow",e[33]),16384&t[0]&&k(b,"charCountOver",e[14]);const s={};!M&&2&t[0]&&(M=!0,s.value=e[1],C(()=>M=!1)),!j&&16777216&t[0]&&(j=!0,s.field=e[24],C(()=>j=!1)),!H&&8192&t[0]&&(H=!0,s.remainingChars=e[13],C(()=>H=!1)),!U&&16384&t[0]&&(U=!0,s.charsOver=e[14],C(()=>U=!1)),me.$set(s);const a={};32&t[1]&&(a.itemId=e[36]),!ee&&4&t[0]&&(ee=!0,a.image=e[2],C(()=>ee=!1)),!te&&256&t[0]&&(te=!0,a.fileIsUploading=e[8],C(()=>te=!1)),ge.$set(a)},i(e){se||(E(me.$$.fragment,e),E(ge.$$.fragment,e),se=!0)},o(e){I(me.$$.fragment,e),I(ge.$$.fragment,e),se=!1},d(e){e&&u(t),e&&u(y),e&&u(O),g(me),e&&u(K),e&&u(W),g(ge),ae=!1,L(le)}}}function ne(e){let t,s=G.EDIT_PROJECT_DETAILS.CATEGORIES_TIP+"";return{c(){t=a("span"),this.h()},l(e){t=r(e,"SPAN",{class:!0}),o(t).forEach(u),this.h()},h(){D(t,"class","tip svelte-19krwee")},m(e,a){m(e,t,a),t.innerHTML=s},p:U,d(e){e&&u(t)}}}function ce(e){let t,s;return{c(){t=a("span"),s=l("please select at least one category"),this.h()},l(e){t=r(e,"SPAN",{class:!0});var a=o(t);s=d(a,"please select at least one category"),a.forEach(u),this.h()},h(){D(t,"class","errorLabel svelte-19krwee")},m(e,a){m(e,t,a),p(t,s)},p:U,d(e){e&&u(t)}}}function ie(e){let t,s,c,i,$,h,g,v,T,k,w,C,O,P,R,x,b,N,V,J,M,F,j,z,H,U,B,K,W,X,q,Y,Q,Z,ee,te,se,ae,le,ne,ce,ie,de,ue,pe,me=G.EDIT_PROJECT_DETAILS.OVERVIEW_HEADING+"",Ie=G.EDIT_PROJECT_DETAILS.DETAIL_1_LABEL+"",ge=G.EDIT_PROJECT_DETAILS.DETAIL_1_TIP+"",De=G.EDIT_PROJECT_DETAILS.DETAIL_2_LABEL+"",_e=G.EDIT_PROJECT_DETAILS.DETAIL_2_TIP+"",Ae=G.EDIT_PROJECT_DETAILS.DETAIL_3_LABEL+"",ke=G.EDIT_PROJECT_DETAILS.DETAIL_3_TIP+"",we=G.EDIT_PROJECT_DETAILS.DETAIL_4_LABEL+"",Ce=G.EDIT_PROJECT_DETAILS.DETAIL_4_TIP+"";const Le=[oe,re],Se=[];function ye(e,t){return e[19]||e[23][0]?0:1}i=ye(e),$=Se[i]=Le[i](e);const Oe=[$e,fe],Pe=[];function Re(e,t){return e[20]||e[23][1]?0:1}P=Re(e),R=Pe[P]=Oe[P](e);const xe=[Ee,he],be=[];function Ne(e,t){return e[21]||e[23][2]?0:1}z=Ne(e),H=be[z]=xe[z](e);const Ve=[Te,ve],Je=[];function Me(e,t){return e[22]||e[23][3]?0:1}return Z=Me(e),ee=Je[Z]=Ve[Z](e),{c(){t=a("div"),s=l(me),c=n(),$.c(),h=n(),g=a("div"),v=a("div"),T=l(Ie),k=a("span"),w=n(),C=a("textarea"),O=n(),R.c(),x=n(),b=a("div"),N=a("div"),V=l(De),J=a("span"),M=n(),F=a("textarea"),j=n(),H.c(),U=n(),B=a("div"),K=a("div"),W=l(Ae),X=a("span"),q=n(),Y=a("textarea"),Q=n(),ee.c(),te=n(),se=a("div"),ae=a("div"),le=l(we),ne=a("span"),ce=n(),ie=a("textarea"),this.h()},l(e){t=r(e,"DIV",{class:!0});var a=o(t);s=d(a,me),a.forEach(u),c=f(e),$.l(e),h=f(e),g=r(e,"DIV",{class:!0});var l=o(g);v=r(l,"DIV",{class:!0});var n=o(v);T=d(n,Ie),k=r(n,"SPAN",{class:!0}),o(k).forEach(u),n.forEach(u),w=f(l),C=r(l,"TEXTAREA",{class:!0,autocapitalize:!0}),o(C).forEach(u),l.forEach(u),O=f(e),R.l(e),x=f(e),b=r(e,"DIV",{class:!0});var i=o(b);N=r(i,"DIV",{class:!0});var p=o(N);V=d(p,De),J=r(p,"SPAN",{class:!0}),o(J).forEach(u),p.forEach(u),M=f(i),F=r(i,"TEXTAREA",{class:!0,autocapitalize:!0}),o(F).forEach(u),i.forEach(u),j=f(e),H.l(e),U=f(e),B=r(e,"DIV",{class:!0});var m=o(B);K=r(m,"DIV",{class:!0});var E=o(K);W=d(E,Ae),X=r(E,"SPAN",{class:!0}),o(X).forEach(u),E.forEach(u),q=f(m),Y=r(m,"TEXTAREA",{class:!0,autocapitalize:!0}),o(Y).forEach(u),m.forEach(u),Q=f(e),ee.l(e),te=f(e),se=r(e,"DIV",{class:!0});var I=o(se);ae=r(I,"DIV",{class:!0});var D=o(ae);le=d(D,we),ne=r(D,"SPAN",{class:!0}),o(ne).forEach(u),D.forEach(u),ce=f(I),ie=r(I,"TEXTAREA",{class:!0,autocapitalize:!0}),o(ie).forEach(u),I.forEach(u),this.h()},h(){D(t,"class","sectionTitle svelte-19krwee"),D(k,"class","tip svelte-19krwee"),D(v,"class","label labelDetails svelte-19krwee"),D(C,"class","detailTextarea"),D(C,"autocapitalize","sentences"),D(g,"class","field svelte-19krwee"),D(J,"class","tip svelte-19krwee"),D(N,"class","label labelDetails svelte-19krwee"),D(F,"class","detailTextarea"),D(F,"autocapitalize","sentences"),D(b,"class","field svelte-19krwee"),D(X,"class","tip svelte-19krwee"),D(K,"class","label labelDetails svelte-19krwee"),D(Y,"class","detailTextarea"),D(Y,"autocapitalize","sentences"),D(B,"class","field svelte-19krwee"),D(ne,"class","tip svelte-19krwee"),D(ae,"class","label labelDetails svelte-19krwee"),D(ie,"class","detailTextarea"),D(ie,"autocapitalize","sentences"),D(se,"class","field svelte-19krwee")},m(a,l){m(a,t,l),p(t,s),m(a,c,l),Se[i].m(a,l),m(a,h,l),m(a,g,l),p(g,v),p(v,T),p(v,k),k.innerHTML=ge,p(g,w),p(g,C),e[70](C),_(C,e[15]),m(a,O,l),Pe[P].m(a,l),m(a,x,l),m(a,b,l),p(b,N),p(N,V),p(N,J),J.innerHTML=_e,p(b,M),p(b,F),e[77](F),_(F,e[16]),m(a,j,l),be[z].m(a,l),m(a,U,l),m(a,B,l),p(B,K),p(K,W),p(K,X),X.innerHTML=ke,p(B,q),p(B,Y),e[84](Y),_(Y,e[17]),m(a,Q,l),Je[Z].m(a,l),m(a,te,l),m(a,se,l),p(se,ae),p(ae,le),p(ae,ne),ne.innerHTML=Ce,p(se,ce),p(se,ie),e[91](ie),_(ie,e[18]),de=!0,ue||(pe=[A(C,"input",e[71]),A(C,"keyup",e[72]),A(F,"input",e[78]),A(F,"keyup",e[79]),A(Y,"input",e[85]),A(Y,"keyup",e[86]),A(ie,"input",e[92]),A(ie,"keyup",e[93])],ue=!0)},p(e,t){let s=i;(i=ye(e))===s?Se[i].p(e,t):(S(),I(Se[s],1,1,()=>{Se[s]=null}),y(),($=Se[i])||($=Se[i]=Le[i](e)).c(),E($,1),$.m(h.parentNode,h)),32768&t[0]&&_(C,e[15]);let a=P;(P=Re(e))===a?Pe[P].p(e,t):(S(),I(Pe[a],1,1,()=>{Pe[a]=null}),y(),(R=Pe[P])||(R=Pe[P]=Oe[P](e)).c(),E(R,1),R.m(x.parentNode,x)),65536&t[0]&&_(F,e[16]);let l=z;(z=Ne(e))===l?be[z].p(e,t):(S(),I(be[l],1,1,()=>{be[l]=null}),y(),(H=be[z])||(H=be[z]=xe[z](e)).c(),E(H,1),H.m(U.parentNode,U)),131072&t[0]&&_(Y,e[17]);let n=Z;(Z=Me(e))===n?Je[Z].p(e,t):(S(),I(Je[n],1,1,()=>{Je[n]=null}),y(),(ee=Je[Z])||(ee=Je[Z]=Ve[Z](e)).c(),E(ee,1),ee.m(te.parentNode,te)),262144&t[0]&&_(ie,e[18])},i(e){de||(E($),E(R),E(H),E(ee),de=!0)},o(e){I($),I(R),I(H),I(ee),de=!1},d(s){s&&u(t),s&&u(c),Se[i].d(s),s&&u(h),s&&u(g),e[70](null),s&&u(O),Pe[P].d(s),s&&u(x),s&&u(b),e[77](null),s&&u(j),be[z].d(s),s&&u(U),s&&u(B),e[84](null),s&&u(Q),Je[Z].d(s),s&&u(te),s&&u(se),e[91](null),ue=!1,L(pe)}}}function re(e){let t,s;const l=new H({props:{className:"addImage",icon:Z,onClick:e[69],$$slots:{default:[de]},$$scope:{ctx:e}}});return{c(){t=a("div"),c(l.$$.fragment),this.h()},l(e){t=r(e,"DIV",{class:!0});var s=o(t);$(l.$$.fragment,s),s.forEach(u),this.h()},h(){D(t,"class","imageField svelte-19krwee")},m(e,a){m(e,t,a),h(l,t,null),s=!0},p(e,t){const s={};2&t[3]&&(s.$$scope={dirty:t,ctx:e}),l.$set(s)},i(e){s||(E(l.$$.fragment,e),s=!0)},o(e){I(l.$$.fragment,e),s=!1},d(e){e&&u(t),g(l)}}}function oe(e){let t,s,l,i,d;const p=new H({props:{className:"addImage removeImage",icon:K,onClick:e[66],$$slots:{default:[ue]},$$scope:{ctx:e}}});function v(t){e[67].call(null,t)}function T(t){e[68].call(null,t)}let _={className:"detailImageSelector",containMode:!0,imageType:Ve,itemIndex:"1",uploadType:"projectDetail",itemId:e[36]};void 0!==e[19]&&(_.image=e[19]),void 0!==e[9]&&(_.fileIsUploading=e[9]);const A=new Y({props:_});return z.push(()=>B(A,"image",v)),z.push(()=>B(A,"fileIsUploading",T)),{c(){t=a("div"),c(p.$$.fragment),s=n(),c(A.$$.fragment),this.h()},l(e){t=r(e,"DIV",{class:!0});var a=o(t);$(p.$$.fragment,a),a.forEach(u),s=f(e),$(A.$$.fragment,e),this.h()},h(){D(t,"class","imageField svelte-19krwee")},m(e,a){m(e,t,a),h(p,t,null),m(e,s,a),h(A,e,a),d=!0},p(e,t){const s={};2&t[3]&&(s.$$scope={dirty:t,ctx:e}),p.$set(s);const a={};32&t[1]&&(a.itemId=e[36]),!l&&524288&t[0]&&(l=!0,a.image=e[19],C(()=>l=!1)),!i&&512&t[0]&&(i=!0,a.fileIsUploading=e[9],C(()=>i=!1)),A.$set(a)},i(e){d||(E(p.$$.fragment,e),E(A.$$.fragment,e),d=!0)},o(e){I(p.$$.fragment,e),I(A.$$.fragment,e),d=!1},d(e){e&&u(t),g(p),e&&u(s),g(A,e)}}}function de(e){let t,s=G.EDIT_PROJECT_DETAILS.ADD_IMAGE+"";return{c(){t=l(s)},l(e){t=d(e,s)},m(e,s){m(e,t,s)},p:U,d(e){e&&u(t)}}}function ue(e){let t,s=G.EDIT_PROJECT_DETAILS.REMOVE_IMAGE+"";return{c(){t=l(s)},l(e){t=d(e,s)},m(e,s){m(e,t,s)},p:U,d(e){e&&u(t)}}}function fe(e){let t,s;const l=new H({props:{className:"addImage",icon:Z,onClick:e[76],$$slots:{default:[pe]},$$scope:{ctx:e}}});return{c(){t=a("div"),c(l.$$.fragment),this.h()},l(e){t=r(e,"DIV",{class:!0});var s=o(t);$(l.$$.fragment,s),s.forEach(u),this.h()},h(){D(t,"class","imageField svelte-19krwee")},m(e,a){m(e,t,a),h(l,t,null),s=!0},p(e,t){const s={};2&t[3]&&(s.$$scope={dirty:t,ctx:e}),l.$set(s)},i(e){s||(E(l.$$.fragment,e),s=!0)},o(e){I(l.$$.fragment,e),s=!1},d(e){e&&u(t),g(l)}}}function $e(e){let t,s,l,i,d;const p=new H({props:{className:"addImage",onClick:e[73],$$slots:{default:[me]},$$scope:{ctx:e}}});function v(t){e[74].call(null,t)}function T(t){e[75].call(null,t)}let _={className:"detailImageSelector",containMode:!0,imageType:Ve,itemIndex:"2",uploadType:"projectDetail",itemId:e[36]};void 0!==e[20]&&(_.image=e[20]),void 0!==e[10]&&(_.fileIsUploading=e[10]);const A=new Y({props:_});return z.push(()=>B(A,"image",v)),z.push(()=>B(A,"fileIsUploading",T)),{c(){t=a("div"),c(p.$$.fragment),s=n(),c(A.$$.fragment),this.h()},l(e){t=r(e,"DIV",{class:!0});var a=o(t);$(p.$$.fragment,a),a.forEach(u),s=f(e),$(A.$$.fragment,e),this.h()},h(){D(t,"class","imageField svelte-19krwee")},m(e,a){m(e,t,a),h(p,t,null),m(e,s,a),h(A,e,a),d=!0},p(e,t){const s={};2&t[3]&&(s.$$scope={dirty:t,ctx:e}),p.$set(s);const a={};32&t[1]&&(a.itemId=e[36]),!l&&1048576&t[0]&&(l=!0,a.image=e[20],C(()=>l=!1)),!i&&1024&t[0]&&(i=!0,a.fileIsUploading=e[10],C(()=>i=!1)),A.$set(a)},i(e){d||(E(p.$$.fragment,e),E(A.$$.fragment,e),d=!0)},o(e){I(p.$$.fragment,e),I(A.$$.fragment,e),d=!1},d(e){e&&u(t),g(p),e&&u(s),g(A,e)}}}function pe(e){let t,s=G.EDIT_PROJECT_DETAILS.ADD_IMAGE+"";return{c(){t=l(s)},l(e){t=d(e,s)},m(e,s){m(e,t,s)},p:U,d(e){e&&u(t)}}}function me(e){let t,s=G.EDIT_PROJECT_DETAILS.REMOVE_IMAGE+"";return{c(){t=l(s)},l(e){t=d(e,s)},m(e,s){m(e,t,s)},p:U,d(e){e&&u(t)}}}function he(e){let t,s;const l=new H({props:{className:"addImage",icon:Z,onClick:e[83],$$slots:{default:[Ie]},$$scope:{ctx:e}}});return{c(){t=a("div"),c(l.$$.fragment),this.h()},l(e){t=r(e,"DIV",{class:!0});var s=o(t);$(l.$$.fragment,s),s.forEach(u),this.h()},h(){D(t,"class","imageField svelte-19krwee")},m(e,a){m(e,t,a),h(l,t,null),s=!0},p(e,t){const s={};2&t[3]&&(s.$$scope={dirty:t,ctx:e}),l.$set(s)},i(e){s||(E(l.$$.fragment,e),s=!0)},o(e){I(l.$$.fragment,e),s=!1},d(e){e&&u(t),g(l)}}}function Ee(e){let t,s,l,i,d;const p=new H({props:{className:"addImage",onClick:e[80],$$slots:{default:[ge]},$$scope:{ctx:e}}});function v(t){e[81].call(null,t)}function T(t){e[82].call(null,t)}let _={className:"detailImageSelector",containMode:!0,imageType:Ve,itemIndex:"3",uploadType:"projectDetail",itemId:e[36]};void 0!==e[21]&&(_.image=e[21]),void 0!==e[11]&&(_.fileIsUploading=e[11]);const A=new Y({props:_});return z.push(()=>B(A,"image",v)),z.push(()=>B(A,"fileIsUploading",T)),{c(){t=a("div"),c(p.$$.fragment),s=n(),c(A.$$.fragment),this.h()},l(e){t=r(e,"DIV",{class:!0});var a=o(t);$(p.$$.fragment,a),a.forEach(u),s=f(e),$(A.$$.fragment,e),this.h()},h(){D(t,"class","imageField svelte-19krwee")},m(e,a){m(e,t,a),h(p,t,null),m(e,s,a),h(A,e,a),d=!0},p(e,t){const s={};2&t[3]&&(s.$$scope={dirty:t,ctx:e}),p.$set(s);const a={};32&t[1]&&(a.itemId=e[36]),!l&&2097152&t[0]&&(l=!0,a.image=e[21],C(()=>l=!1)),!i&&2048&t[0]&&(i=!0,a.fileIsUploading=e[11],C(()=>i=!1)),A.$set(a)},i(e){d||(E(p.$$.fragment,e),E(A.$$.fragment,e),d=!0)},o(e){I(p.$$.fragment,e),I(A.$$.fragment,e),d=!1},d(e){e&&u(t),g(p),e&&u(s),g(A,e)}}}function Ie(e){let t,s=G.EDIT_PROJECT_DETAILS.ADD_IMAGE+"";return{c(){t=l(s)},l(e){t=d(e,s)},m(e,s){m(e,t,s)},p:U,d(e){e&&u(t)}}}function ge(e){let t,s=G.EDIT_PROJECT_DETAILS.REMOVE_IMAGE+"";return{c(){t=l(s)},l(e){t=d(e,s)},m(e,s){m(e,t,s)},p:U,d(e){e&&u(t)}}}function ve(e){let t,s;const l=new H({props:{className:"addImage",icon:Z,onClick:e[90],$$slots:{default:[De]},$$scope:{ctx:e}}});return{c(){t=a("div"),c(l.$$.fragment),this.h()},l(e){t=r(e,"DIV",{class:!0});var s=o(t);$(l.$$.fragment,s),s.forEach(u),this.h()},h(){D(t,"class","imageField svelte-19krwee")},m(e,a){m(e,t,a),h(l,t,null),s=!0},p(e,t){const s={};2&t[3]&&(s.$$scope={dirty:t,ctx:e}),l.$set(s)},i(e){s||(E(l.$$.fragment,e),s=!0)},o(e){I(l.$$.fragment,e),s=!1},d(e){e&&u(t),g(l)}}}function Te(e){let t,s,l,i,d;const p=new H({props:{className:"addImage",onClick:e[87],$$slots:{default:[_e]},$$scope:{ctx:e}}});function v(t){e[88].call(null,t)}function T(t){e[89].call(null,t)}let _={className:"detailImageSelector",containMode:!0,imageType:Ve,itemIndex:"4",uploadType:"projectDetail",itemId:e[36]};void 0!==e[22]&&(_.image=e[22]),void 0!==e[12]&&(_.fileIsUploading=e[12]);const A=new Y({props:_});return z.push(()=>B(A,"image",v)),z.push(()=>B(A,"fileIsUploading",T)),{c(){t=a("div"),c(p.$$.fragment),s=n(),c(A.$$.fragment),this.h()},l(e){t=r(e,"DIV",{class:!0});var a=o(t);$(p.$$.fragment,a),a.forEach(u),s=f(e),$(A.$$.fragment,e),this.h()},h(){D(t,"class","imageField svelte-19krwee")},m(e,a){m(e,t,a),h(p,t,null),m(e,s,a),h(A,e,a),d=!0},p(e,t){const s={};2&t[3]&&(s.$$scope={dirty:t,ctx:e}),p.$set(s);const a={};32&t[1]&&(a.itemId=e[36]),!l&&4194304&t[0]&&(l=!0,a.image=e[22],C(()=>l=!1)),!i&&4096&t[0]&&(i=!0,a.fileIsUploading=e[12],C(()=>i=!1)),A.$set(a)},i(e){d||(E(p.$$.fragment,e),E(A.$$.fragment,e),d=!0)},o(e){I(p.$$.fragment,e),I(A.$$.fragment,e),d=!1},d(e){e&&u(t),g(p),e&&u(s),g(A,e)}}}function De(e){let t,s=G.EDIT_PROJECT_DETAILS.ADD_IMAGE+"";return{c(){t=l(s)},l(e){t=d(e,s)},m(e,s){m(e,t,s)},p:U,d(e){e&&u(t)}}}function _e(e){let t,s=G.EDIT_PROJECT_DETAILS.REMOVE_IMAGE+"";return{c(){t=l(s)},l(e){t=d(e,s)},m(e,s){m(e,t,s)},p:U,d(e){e&&u(t)}}}function Ae(e){let t;const s=new H({props:{className:"cancelButton",onClick:e[40],icon:ee,$$slots:{default:[ke]},$$scope:{ctx:e}}});return{c(){c(s.$$.fragment)},l(e){$(s.$$.fragment,e)},m(e,a){h(s,e,a),t=!0},p(e,t){const a={};2&t[3]&&(a.$$scope={dirty:t,ctx:e}),s.$set(a)},i(e){t||(E(s.$$.fragment,e),t=!0)},o(e){I(s.$$.fragment,e),t=!1},d(e){g(s,e)}}}function ke(e){let t,s=G.EDIT_PROJECT_DETAILS.CANCEL+"";return{c(){t=l(s)},l(e){t=d(e,s)},m(e,s){m(e,t,s)},p:U,d(e){e&&u(t)}}}function we(e){let t;const s=new H({props:{className:"saveButton",onClick:e[37],disabled:!e[34],icon:Q,$$slots:{default:[Se]},$$scope:{ctx:e}}});return{c(){c(s.$$.fragment)},l(e){$(s.$$.fragment,e)},m(e,a){h(s,e,a),t=!0},p(e,t){const a={};8&t[1]&&(a.disabled=!e[34]),2&t[3]&&(a.$$scope={dirty:t,ctx:e}),s.$set(a)},i(e){t||(E(s.$$.fragment,e),t=!0)},o(e){I(s.$$.fragment,e),t=!1},d(e){g(s,e)}}}function Ce(e){let t;const s=new H({props:{className:"saveButton",onClick:e[37],disabled:!e[34],icon:Q,$$slots:{default:[ye]},$$scope:{ctx:e}}});return{c(){c(s.$$.fragment)},l(e){$(s.$$.fragment,e)},m(e,a){h(s,e,a),t=!0},p(e,t){const a={};8&t[1]&&(a.disabled=!e[34]),2&t[3]&&(a.$$scope={dirty:t,ctx:e}),s.$set(a)},i(e){t||(E(s.$$.fragment,e),t=!0)},o(e){I(s.$$.fragment,e),t=!1},d(e){g(s,e)}}}function Le(e){let t;const s=new H({props:{className:"saveButton",onClick:e[37],disabled:!e[34],icon:Q,$$slots:{default:[Oe]},$$scope:{ctx:e}}});return{c(){c(s.$$.fragment)},l(e){$(s.$$.fragment,e)},m(e,a){h(s,e,a),t=!0},p(e,t){const a={};8&t[1]&&(a.disabled=!e[34]),2&t[3]&&(a.$$scope={dirty:t,ctx:e}),s.$set(a)},i(e){t||(E(s.$$.fragment,e),t=!0)},o(e){I(s.$$.fragment,e),t=!1},d(e){g(s,e)}}}function Se(e){let t,s=G.EDIT_PROJECT_DETAILS.CONFIRM+"";return{c(){t=l(s)},l(e){t=d(e,s)},m(e,s){m(e,t,s)},p:U,d(e){e&&u(t)}}}function ye(e){let t,s=G.NEW_PROJECT.DETAILS_3_CONFIRM+"";return{c(){t=l(s)},l(e){t=d(e,s)},m(e,s){m(e,t,s)},p:U,d(e){e&&u(t)}}}function Oe(e){let t,s=G.NEW_PROJECT.DETAILS_2_CONFIRM+"";return{c(){t=l(s)},l(e){t=d(e,s)},m(e,s){m(e,t,s)},p:U,d(e){e&&u(t)}}}function Pe(e){let t,s,l,c,i,d,$,h,g,v,T=("edit"===e[35]||"addDetails"===e[35])&&te(e),_=("edit"===e[35]||"details2"===e[35])&&ae(e),A="details2"!==e[35]&&ie(e),k=("edit"===e[35]||"addDetails"===e[35])&&Ae(e);const w=[Le,Ce,we],C=[];function L(e,t){return"details2"===e[35]?0:"details3"===e[35]?1:2}return h=L(e),g=C[h]=w[h](e),{c(){t=a("div"),s=a("div"),T&&T.c(),l=n(),_&&_.c(),c=n(),A&&A.c(),i=n(),d=a("div"),k&&k.c(),$=n(),g.c(),this.h()},l(e){t=r(e,"DIV",{class:!0});var a=o(t);s=r(a,"DIV",{class:!0});var n=o(s);T&&T.l(n),l=f(n),_&&_.l(n),c=f(n),A&&A.l(n),i=f(n),d=r(n,"DIV",{class:!0});var p=o(d);k&&k.l(p),$=f(p),g.l(p),p.forEach(u),n.forEach(u),a.forEach(u),this.h()},h(){D(d,"class","actions svelte-19krwee"),D(s,"class","panelContent svelte-19krwee"),D(t,"class","content svelte-19krwee")},m(e,a){m(e,t,a),p(t,s),T&&T.m(s,null),p(s,l),_&&_.m(s,null),p(s,c),A&&A.m(s,null),p(s,i),p(s,d),k&&k.m(d,null),p(d,$),C[h].m(d,null),v=!0},p(e,t){"edit"===e[35]||"addDetails"===e[35]?T?(T.p(e,t),16&t[1]&&E(T,1)):((T=te(e)).c(),E(T,1),T.m(s,l)):T&&(S(),I(T,1,1,()=>{T=null}),y()),"edit"===e[35]||"details2"===e[35]?_?(_.p(e,t),16&t[1]&&E(_,1)):((_=ae(e)).c(),E(_,1),_.m(s,c)):_&&(S(),I(_,1,1,()=>{_=null}),y()),"details2"!==e[35]?A?(A.p(e,t),16&t[1]&&E(A,1)):((A=ie(e)).c(),E(A,1),A.m(s,i)):A&&(S(),I(A,1,1,()=>{A=null}),y()),"edit"===e[35]||"addDetails"===e[35]?k?(k.p(e,t),16&t[1]&&E(k,1)):((k=Ae(e)).c(),E(k,1),k.m(d,$)):k&&(S(),I(k,1,1,()=>{k=null}),y());let a=h;(h=L(e))===a?C[h].p(e,t):(S(),I(C[a],1,1,()=>{C[a]=null}),y(),(g=C[h])||(g=C[h]=w[h](e)).c(),E(g,1),g.m(d,null))},i(e){v||(E(T),E(_),E(A),E(k),E(g),v=!0)},o(e){I(T),I(_),I(A),I(k),I(g),v=!1},d(e){e&&u(t),T&&T.d(),_&&_.d(),A&&A.d(),k&&k.d(),C[h].d()}}}function Re(e){let t,s,v,T,D;document.title=t=e[32]+"Flock";const _=new W({props:{$$slots:{default:[Pe]},$$scope:{ctx:e}}});return{c(){s=a("style"),v=l("body {\r\n\t\t\toverscroll-behavior-y: contain; /* Disables pull-to-refresh but allows overscroll effects. */\r\n\t\t}"),T=n(),c(_.$$.fragment)},l(e){const t=i('[data-svelte="svelte-1m76c4p"]',document.head);s=r(t,"STYLE",{});var a=o(s);v=d(a,"body {\r\n\t\t\toverscroll-behavior-y: contain; /* Disables pull-to-refresh but allows overscroll effects. */\r\n\t\t}"),a.forEach(u),t.forEach(u),T=f(e),$(_.$$.fragment,e)},m(e,t){p(document.head,s),p(s,v),m(e,T,t),h(_,e,t),D=!0},p(e,s){(!D||2&s[1])&&t!==(t=e[32]+"Flock")&&(document.title=t);const a={};2147483647&s[0]|61&s[1]|2&s[3]&&(a.$$scope={dirty:s,ctx:e}),_.$set(a)},i(e){D||(E(_.$$.fragment,e),D=!0)},o(e){I(_.$$.fragment,e),D=!1},d(e){u(s),e&&u(T),g(_,e)}}}const xe=130,be=388,Ne=4,Ve=null;function Je(e){return Math.min(Math.max(e+Ne,xe),be)}function Me(e,t){return e&&e.details&&e.details[t]&&e.details[t].image||null}function Fe(e,t,s){let a,l,n;v(e,O,e=>s(42,a=e)),v(e,P,e=>s(35,l=e)),v(e,R,e=>s(36,n=e));let c,i,r,o,d,u,f,$,p,m,h,E,I,g,D,_=a&&a.title||"",A=a&&a.description||"",k=a&&a.headerImage||"",w=a&&a.categories||"",C=a&&a.tags||"",L=a&&a.skills||"",S=a&&a.location||"",y=!1,H="",U="",G="",B="",K=null,W=null,X=null,q=null,Y=[],Q=!1;async function Z(){await x(),E&&s(28,E.style="height: "+Je(E.scrollHeight)+"px",E),I&&s(29,I.style="height: "+Je(I.scrollHeight)+"px",I),g&&s(30,g.style="height: "+Je(g.scrollHeight)+"px",g),D&&s(31,D.style="height: "+Je(D.scrollHeight)+"px",D)}function ee(e,t){const s=e&&e.details&&e.details[t]&&e.details[t].detail||"";return s?b(s):s}function te(e){s(23,Y[e]=!0,Y)}function se(e){switch(s(23,Y[e]=!1,Y),e){case 0:s(19,K=null);break;case 1:s(20,W=null);break;case 2:s(21,X=null);break;case 3:s(22,q=null)}}let ae,le,ne,ce;return e.$$.update=(()=>{2048&e.$$.dirty[1]&&s(32,ae=a&&a.title&&a.title+" - "||""),7936&e.$$.dirty[0]&&s(43,le=c||i||r||o||d),8192&e.$$.dirty[0]&&s(33,ne=""!==u&&u<T.PROJECT_DESCRIPTION_CHARS_LOW),16387&e.$$.dirty[0]|4112&e.$$.dirty[1]&&s(34,ce=("edit"!==l||V(_)&&V(A)&&!f)&&!le),3072&e.$$.dirty[1]&&(Q||(s(41,Q=!0),s(15,H=ee(a,0)),s(16,U=ee(a,1)),s(17,G=ee(a,2)),s(18,B=ee(a,3)),s(19,K=Me(a,0)),s(20,W=Me(a,1)),s(21,X=Me(a,2)),s(22,q=Me(a,3)),Z()))}),[_,A,k,w,C,L,S,y,c,i,r,o,d,u,f,H,U,G,B,K,W,X,q,Y,$,p,m,h,E,I,g,D,ae,ne,ce,l,n,function(){if(!ce)return;if(!w.trim())return s(7,y=!0),void N("categories");let e=null;a.details&&(e=JSON.parse(JSON.stringify(a.details))),e||(e=[]);const t=[H,U,G,B],n=[K,W,X,q];for(let s=0;s<4;s++)e[s]=e[s]||{},e[s].detail=V(t[s]),e[s].image=n[s];const c={details:e};"edit"===l?Object.assign(c,{title:V(_),description:V(A),headerImage:k,categories:V(w),tags:V(C),skills:V(L),location:V(S)}):"details2"===l&&Object.assign(c,{categories:V(w),tags:V(C),skills:V(L),location:V(S)}),J(c,{editProjectDetails:"details2"===l,showProjectInfo:"addDetails"===l||"details3"===l})},te,se,function(){M("projects/"+n)},Q,a,le,Z,ee,function(){_=this.value,s(0,_)},e=>F(e,{target:$}),e=>j(e,{capitalizeFirstKeypress:!0}),function(e){s(1,A=e)},function(e){s(24,$=e)},function(e){s(13,u=e)},function(e){s(14,f=e)},function(e){s(2,k=e)},function(e){s(8,c=e)},function(){S=this.value,s(6,S)},function(e){z[e?"unshift":"push"](()=>{s(27,h=e)})},e=>F(e,{target:E}),e=>j(e,{capitalizeFirstKeypress:!0}),function(e){s(3,w=e)},function(){C=this.value,s(4,C)},function(e){z[e?"unshift":"push"](()=>{s(25,p=e)})},e=>j(e,{keepLowerCase:!0}),function(){L=this.value,s(5,L)},function(e){z[e?"unshift":"push"](()=>{s(26,m=e)})},e=>j(e,{keepLowerCase:!0}),()=>se(0),function(e){s(19,K=e),s(41,Q),s(42,a)},function(e){s(9,i=e)},()=>te(0),function(e){z[e?"unshift":"push"](()=>{s(28,E=e)})},function(){H=this.value,s(15,H),s(41,Q),s(42,a)},e=>j(e,{capitalizeFirstKeypress:!0}),()=>se(1),function(e){s(20,W=e),s(41,Q),s(42,a)},function(e){s(10,r=e)},()=>te(1),function(e){z[e?"unshift":"push"](()=>{s(29,I=e)})},function(){U=this.value,s(16,U),s(41,Q),s(42,a)},e=>j(e,{capitalizeFirstKeypress:!0}),()=>se(2),function(e){s(21,X=e),s(41,Q),s(42,a)},function(e){s(11,o=e)},()=>te(2),function(e){z[e?"unshift":"push"](()=>{s(30,g=e)})},function(){G=this.value,s(17,G),s(41,Q),s(42,a)},e=>j(e,{capitalizeFirstKeypress:!0}),()=>se(3),function(e){s(22,q=e),s(41,Q),s(42,a)},function(e){s(12,d=e)},()=>te(3),function(e){z[e?"unshift":"push"](()=>{s(31,D=e)})},function(){B=this.value,s(18,B),s(41,Q),s(42,a)},e=>j(e,{capitalizeFirstKeypress:!0})]}export default class extends e{constructor(e){super(),t(this,e,Fe,Re,s,{},[-1,-1,-1,-1])}}