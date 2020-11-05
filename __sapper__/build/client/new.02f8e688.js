import{S as a,i as e,s,n as t,p as c,H as r,e as l,c as n,q as i,r as o,u as f,I as d,g as u,h as v,a as h,w as $,j as p,m,t as E,b as g,d as I,bC as C,ad as T,bf as w,aI as b,aJ as D,N,v as O,E as _,aG as R,F as y,J as x,aK as S,a6 as P,bD as V,bE as L,aH as J,x as j,M as A}from"./client.3c58eb54.js";import"./SearchBar.bd81e333.js";import{N as H}from"./next_arrow.b1598f96.js";import{L as W}from"./LimitedTextfield.727dc40c.js";import{I as F}from"./ImageSelectionBox.15a57962.js";function M(a){let e,s=A.NEW_PROJECT.CONFIRM+"";return{c(){e=r(s)},l(a){e=d(a,s)},m(a,s){p(a,e,s)},p:j,d(a){a&&u(e)}}}function U(a){let e,s,t,i,C,w,V,L,J,j,U,k,B,G,Y,X,q,K,z,Q,Z,aa,ea,sa,ta,ca,ra,la,na,ia,oa,fa,da,ua,va,ha,$a=A.NEW_PROJECT.TITLE+"",pa=A.NEW_PROJECT.DESCRIPTION+"",ma=(a[7]?a[7]:a[6])+"",Ea=a[7]?" characters over":a[9]?" characters remaining":"",ga=A.NEW_PROJECT.DESCRIPTION_NOTE+"",Ia=A.NEW_PROJECT.HEADER_IMAGE+"",Ca=A.NEW_PROJECT.PRIVACY_NOTE+"";function Ta(e){a[18].call(null,e)}function wa(e){a[19].call(null,e)}function ba(e){a[20].call(null,e)}function Da(e){a[21].call(null,e)}let Na={maxlength:T.MAX_PROJECT_DESCRIPTION_CHARS};void 0!==a[1]&&(Na.value=a[1]),void 0!==a[5]&&(Na.field=a[5]),void 0!==a[6]&&(Na.remainingChars=a[6]),void 0!==a[7]&&(Na.charsOver=a[7]);const Oa=new W({props:Na});function _a(e){a[23].call(null,e)}function Ra(e){a[24].call(null,e)}b.push(()=>D(Oa,"value",Ta)),b.push(()=>D(Oa,"field",wa)),b.push(()=>D(Oa,"remainingChars",ba)),b.push(()=>D(Oa,"charsOver",Da)),Oa.$on("keypress",a[22]);let ya={contextSearchString:a[8],uploadType:"projectHeader",itemId:a[11]};void 0!==a[2]&&(ya.image=a[2]),void 0!==a[3]&&(ya.fileIsUploading=a[3]);const xa=new F({props:ya});b.push(()=>D(xa,"image",_a)),b.push(()=>D(xa,"fileIsUploading",Ra));const Sa=new N({props:{className:"nextButton",disabled:!a[10],onClick:a[12],icon:H,$$slots:{default:[M]},$$scope:{ctx:a}}});return{c(){e=c("div"),s=c("div"),t=c("div"),i=c("div"),C=r($a),w=l(),V=c("input"),L=l(),J=c("div"),j=c("div"),U=r(pa),k=l(),B=c("div"),G=r(ma),Y=r(Ea),X=l(),n(Oa.$$.fragment),Z=l(),aa=c("div"),ea=l(),sa=c("div"),ta=c("div"),ca=r(Ia),ra=l(),n(xa.$$.fragment),ia=l(),oa=c("div"),fa=l(),da=c("div"),n(Sa.$$.fragment),this.h()},l(a){e=o(a,"DIV",{class:!0});var c=f(e);s=o(c,"DIV",{class:!0});var r=f(s);t=o(r,"DIV",{class:!0});var l=f(t);i=o(l,"DIV",{class:!0});var n=f(i);C=d(n,$a),n.forEach(u),w=v(l),V=o(l,"INPUT",{type:!0,class:!0}),l.forEach(u),L=v(r),J=o(r,"DIV",{class:!0});var $=f(J);j=o($,"DIV",{class:!0});var p=f(j);U=d(p,pa),p.forEach(u),k=v($),B=o($,"DIV",{class:!0});var m=f(B);G=d(m,ma),Y=d(m,Ea),m.forEach(u),X=v($),h(Oa.$$.fragment,$),Z=v($),aa=o($,"DIV",{class:!0}),f(aa).forEach(u),$.forEach(u),ea=v(r),sa=o(r,"DIV",{class:!0});var E=f(sa);ta=o(E,"DIV",{class:!0});var g=f(ta);ca=d(g,Ia),g.forEach(u),ra=v(E),h(xa.$$.fragment,E),E.forEach(u),ia=v(r),oa=o(r,"DIV",{class:!0}),f(oa).forEach(u),fa=v(r),da=o(r,"DIV",{class:!0});var I=f(da);h(Sa.$$.fragment,I),I.forEach(u),r.forEach(u),c.forEach(u),this.h()},h(){O(i,"class","label svelte-1wir4cc"),O(V,"type","text"),O(V,"class","svelte-1wir4cc"),O(t,"class","field introField svelte-1wir4cc"),O(j,"class","label svelte-1wir4cc"),O(B,"class","fieldCharCount svelte-1wir4cc"),_(B,"charCountLow",a[9]),_(B,"charCountOver",a[7]),O(aa,"class","fieldNote svelte-1wir4cc"),O(J,"class","field descriptionField svelte-1wir4cc"),O(ta,"class","label headerImageLabel svelte-1wir4cc"),O(sa,"class","field headerImageField svelte-1wir4cc"),O(oa,"class","fieldNote privacyNote svelte-1wir4cc"),O(da,"class","actions svelte-1wir4cc"),O(s,"class","panelContent svelte-1wir4cc"),O(e,"class","content svelte-1wir4cc")},m(c,r){p(c,e,r),$(e,s),$(s,t),$(t,i),$(i,C),$(t,w),$(t,V),R(V,a[0]),a[16](V),$(s,L),$(s,J),$(J,j),$(j,U),$(J,k),$(J,B),$(B,G),$(B,Y),$(J,X),m(Oa,J,null),$(J,Z),$(J,aa),aa.innerHTML=ga,$(s,ea),$(s,sa),$(sa,ta),$(ta,ca),$(sa,ra),m(xa,sa,null),$(s,ia),$(s,oa),oa.innerHTML=Ca,$(s,fa),$(s,da),m(Sa,da,null),ua=!0,va||(ha=[y(V,"input",a[15]),y(V,"keypress",a[17])],va=!0)},p(a,e){1&e&&V.value!==a[0]&&R(V,a[0]),(!ua||192&e)&&ma!==(ma=(a[7]?a[7]:a[6])+"")&&x(G,ma),(!ua||640&e)&&Ea!==(Ea=a[7]?" characters over":a[9]?" characters remaining":"")&&x(Y,Ea),512&e&&_(B,"charCountLow",a[9]),128&e&&_(B,"charCountOver",a[7]);const s={};!q&&2&e&&(q=!0,s.value=a[1],S(()=>q=!1)),!K&&32&e&&(K=!0,s.field=a[5],S(()=>K=!1)),!z&&64&e&&(z=!0,s.remainingChars=a[6],S(()=>z=!1)),!Q&&128&e&&(Q=!0,s.charsOver=a[7],S(()=>Q=!1)),Oa.$set(s);const t={};256&e&&(t.contextSearchString=a[8]),!la&&4&e&&(la=!0,t.image=a[2],S(()=>la=!1)),!na&&8&e&&(na=!0,t.fileIsUploading=a[3],S(()=>na=!1)),xa.$set(t);const c={};1024&e&&(c.disabled=!a[10]),33554432&e&&(c.$$scope={dirty:e,ctx:a}),Sa.$set(c)},i(a){ua||(E(Oa.$$.fragment,a),E(xa.$$.fragment,a),E(Sa.$$.fragment,a),ua=!0)},o(a){g(Oa.$$.fragment,a),g(xa.$$.fragment,a),g(Sa.$$.fragment,a),ua=!1},d(s){s&&u(e),a[16](null),I(Oa),I(xa),I(Sa),va=!1,P(ha)}}}function k(a){let e,s,C,T;const w=new t({props:{$$slots:{default:[U]},$$scope:{ctx:a}}});return{c(){e=c("style"),s=r("body {\r\n\t\t\toverscroll-behavior-y: contain; /* Disables pull-to-refresh but allows overscroll effects. */\r\n\t\t}"),C=l(),n(w.$$.fragment),this.h()},l(a){const t=i('[data-svelte="svelte-1ja50yt"]',document.head);e=o(t,"STYLE",{});var c=f(e);s=d(c,"body {\r\n\t\t\toverscroll-behavior-y: contain; /* Disables pull-to-refresh but allows overscroll effects. */\r\n\t\t}"),c.forEach(u),t.forEach(u),C=v(a),h(w.$$.fragment,a),this.h()},h(){document.title="Flock"},m(a,t){$(document.head,e),$(e,s),p(a,C,t),m(w,a,t),T=!0},p(a,[e]){const s={};33556479&e&&(s.$$scope={dirty:e,ctx:a}),w.$set(s)},i(a){T||(E(w.$$.fragment,a),T=!0)},o(a){g(w.$$.fragment,a),T=!1},d(a){u(e),a&&u(C),I(w,a)}}}function B(a,e,s){let t,c,r,l,n,i="",o="",f=C(),d=null,u="";function v(){V("updateContextString",()=>{s(8,u=(i+" "+o).trim())},T.UPDATE_CONTEXT_STRING_DELAY)}function h(){if(m){const a={title:w(i),description:w(o),headerImage:d,id:f};L(a)}}function $(){m&&h()}let p,m;return a.$$.update=(()=>{64&a.$$.dirty&&s(9,p=""!==l&&l<T.PROJECT_DESCRIPTION_CHARS_LOW),3&a.$$.dirty&&v(),143&a.$$.dirty&&s(10,m=w(i)&&w(o)&&!n&&d&&!t)}),[i,o,d,t,c,r,l,n,u,p,m,f,h,$,v,function(){i=this.value,s(0,i)},function(a){b[a?"unshift":"push"](()=>{s(4,c=a)})},a=>J(a,{target:r}),function(a){s(1,o=a)},function(a){s(5,r=a)},function(a){s(6,l=a)},function(a){s(7,n=a)},a=>J(a,{action:$}),function(a){s(2,d=a)},function(a){s(3,t=a)}]}export default class extends a{constructor(a){super(),e(this,a,B,k,s,{})}}