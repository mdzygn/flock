import{S as t,i as s,s as e,W as a,p as n,r,u as l,g as o,v as c,j as i,c as $,e as f,H as d,a as u,h,I as m,m as v,w as p,F as g,J as y,t as I,b as E,d as j,l as N,Y as V,Q as b,af as w,b0 as D,R as S,b1 as A,T as C,U as O,b2 as R,x,aE as T,ad as _,y as L,k,b3 as B,Z as P,_ as M,b4 as H,a0 as F,a2 as G,f as W,a3 as q,M as J,n as Q,q as U}from"./client.3c58eb54.js";import"./Hotspot.caf8438e.js";import"./ContentPanel.74b5a69d.js";import{C as X}from"./ContentLoader.96416f59.js";function Y(t){let s;return{c(){s=n("div"),this.h()},l(t){s=r(t,"DIV",{class:!0}),l(s).forEach(o),this.h()},h(){c(s,"class","unseenIcon svelte-7jfayp")},m(t,e){i(t,s,e)},d(t){t&&o(s)}}}function Z(t){let s,e,N,V,b,w,D,S,A,C,O,x,T,_,L,k;const B=new a({props:{user:t[4],useThumb:!0}});let P=!t[2]&&Y();return{c(){s=n("div"),$(B.$$.fragment),e=f(),N=n("div"),V=n("div"),b=n("div"),w=d(t[5]),D=f(),S=n("div"),C=n("span"),O=d(t[3]),x=f(),T=n("div"),P&&P.c(),this.h()},l(a){s=r(a,"DIV",{class:!0});var n=l(s);u(B.$$.fragment,n),e=h(n),N=r(n,"DIV",{class:!0});var c=l(N);V=r(c,"DIV",{class:!0});var i=l(V);b=r(i,"DIV",{class:!0});var $=l(b);w=m($,t[5]),$.forEach(o),D=h(i),S=r(i,"DIV",{class:!0});var f=l(S);C=r(f,"SPAN",{class:!0});var d=l(C);O=m(d,t[3]),d.forEach(o),f.forEach(o),i.forEach(o),c.forEach(o),x=h(n),T=r(n,"DIV",{class:!0});var v=l(T);P&&P.l(v),v.forEach(o),n.forEach(o),this.h()},h(){c(b,"class","title svelte-7jfayp"),A=new R(C),c(C,"class","dateString svelte-7jfayp"),c(S,"class","message svelte-7jfayp"),c(V,"class","detailInnerContent svelte-7jfayp"),c(N,"class","detailContent svelte-7jfayp"),c(T,"class","info svelte-7jfayp"),c(s,"class","conversationListItem svelte-7jfayp")},m(a,n){i(a,s,n),v(B,s,null),p(s,e),p(s,N),p(N,V),p(V,b),p(b,w),p(V,D),p(V,S),A.m(t[1],S),p(S,C),p(C,O),p(s,x),p(s,T),P&&P.m(T,null),_=!0,L||(k=g(s,"click",t[6]),L=!0)},p(t,[s]){const e={};16&s&&(e.user=t[4]),B.$set(e),(!_||32&s)&&y(w,t[5]),(!_||2&s)&&A.p(t[1]),(!_||8&s)&&y(O,t[3]),t[2]?P&&(P.d(1),P=null):P||((P=Y()).c(),P.m(T,null))},i(t){_||(I(B.$$.fragment,t),_=!0)},o(t){E(B.$$.fragment,t),_=!1},d(t){t&&o(s),j(B),P&&P.d(),L=!1,k()}}}function z(t,s,e){let a,n,r,l=x,o=()=>(l(),l=b(k,t=>e(8,a=t)),k),c=x;N(t,V,t=>e(13,n=t)),t.$$.on_destroy.push(()=>l()),t.$$.on_destroy.push(()=>c());let i,$,f,d,u,h,m,v,p,g,y,I,E,j,R,L,{conversation:k}=s;return o(),t.$set=(t=>{"conversation"in t&&o(e(0,k=t.conversation))}),t.$$.update=(()=>{256&t.$$.dirty&&e(7,i=a&&a.title||""),256&t.$$.dirty&&e(9,$=a&&a.lastSenderId||null),256&t.$$.dirty&&e(10,f=a&&a.lastMessageText||""),1024&t.$$.dirty&&e(11,d=f&&w(f,{disallowLinks:!0,collapseBreaks:!0})),10752&t.$$.dirty&&e(12,u=d&&($===n?"you: "+d:d)),4096&t.$$.dirty&&e(14,h=u&&D(u,_.CONVERSATION_MAX_PREVIEW_LENGTH)),16384&t.$$.dirty&&e(1,m=h||"(image)"),256&t.$$.dirty&&(v=a&&a.id||null),256&t.$$.dirty&&(p=a&&a.projectId||null),256&t.$$.dirty&&e(2,g=!a||a.viewed),256&t.$$.dirty&&e(17,y=a&&a.lastMessageAt||null),131072&t.$$.dirty&&e(3,I=y&&" - "+S(y)||""),256&t.$$.dirty&&e(18,E=a&&A(a)||null),393216&t.$$.dirty&&(()=>(c(),c=b(j,t=>e(20,r=t)),j))(e(4,j=E&&y&&C(E,y)||O(null))),1310720&t.$$.dirty&&e(19,R=r&&r.name||E&&E.name||""),524416&t.$$.dirty&&e(5,L=i||R||"")}),[k,m,g,I,j,L,function(){v&&T(v)}]}class K extends t{constructor(t){super(),s(this,t,z,Z,e,{conversation:0})}}function tt(t,s,e){const a=t.slice();return a[8]=s[e],a}function st(t){let s,e,a,$,u,v,y,I,E,j,N,V,b,w,D=J.CONVERSATIONS.NO_CONVERSATIONS+"";return{c(){s=n("div"),e=d(D),a=n("br"),$=n("br"),u=f(),v=n("a"),y=d("Discover"),I=d(" inspiring projects to get involved with"),E=n("br"),j=d("or create a "),N=n("a"),V=d("New Project"),this.h()},l(t){s=r(t,"DIV",{class:!0});var n=l(s);e=m(n,D),a=r(n,"BR",{}),$=r(n,"BR",{}),u=h(n),v=r(n,"A",{href:!0});var c=l(v);y=m(c,"Discover"),c.forEach(o),I=m(n," inspiring projects to get involved with"),E=r(n,"BR",{}),j=m(n,"or create a "),N=r(n,"A",{href:!0});var i=l(N);V=m(i,"New Project"),i.forEach(o),n.forEach(o),this.h()},h(){c(v,"href","discover"),c(N,"href","javascript:void(0)"),c(s,"class","noConversations svelte-pui8gu")},m(t,n){i(t,s,n),p(s,e),p(s,a),p(s,$),p(s,u),p(s,v),p(v,y),p(s,I),p(s,E),p(s,j),p(s,N),p(N,V),b||(w=g(N,"click",G),b=!0)},p:x,i:x,o:x,d(t){t&&o(s),b=!1,w()}}}function et(t){let s,e,a=t[3],n=[];for(let s=0;s<a.length;s+=1)n[s]=nt(tt(t,a,s));const r=t=>E(n[t],1,1,()=>{n[t]=null});return{c(){for(let t=0;t<n.length;t+=1)n[t].c();s=W()},l(t){for(let s=0;s<n.length;s+=1)n[s].l(t);s=W()},m(t,a){for(let s=0;s<n.length;s+=1)n[s].m(t,a);i(t,s,a),e=!0},p(t,e){if(8&e){let l;for(a=t[3],l=0;l<a.length;l+=1){const r=tt(t,a,l);n[l]?(n[l].p(r,e),I(n[l],1)):(n[l]=nt(r),n[l].c(),I(n[l],1),n[l].m(s.parentNode,s))}for(L(),l=a.length;l<n.length;l+=1)r(l);k()}},i(t){if(!e){for(let t=0;t<a.length;t+=1)I(n[t]);e=!0}},o(t){n=n.filter(Boolean);for(let t=0;t<n.length;t+=1)E(n[t]);e=!1},d(t){q(n,t),t&&o(s)}}}function at(t){let s;const e=new X({props:{label:J.LOADING.CONVERSATIONS}});return{c(){$(e.$$.fragment)},l(t){u(e.$$.fragment,t)},m(t,a){v(e,t,a),s=!0},p:x,i(t){s||(I(e.$$.fragment,t),s=!0)},o(t){E(e.$$.fragment,t),s=!1},d(t){j(e,t)}}}function nt(t){let s;const e=new K({props:{conversation:t[8]}});return{c(){$(e.$$.fragment)},l(t){u(e.$$.fragment,t)},m(t,a){v(e,t,a),s=!0},p(t,s){const a={};8&s&&(a.conversation=t[8]),e.$set(a)},i(t){s||(I(e.$$.fragment,t),s=!0)},o(t){E(e.$$.fragment,t),s=!1},d(t){j(e,t)}}}function rt(t){let s,e,a,$,f,d;const u=[at,et,st],h=[];function m(t,s){return 116&s&&(e=!(!t[2]&&F(t[5],t[4],t[6]))),e?0:t[3]&&t[3].length?1:2}return a=m(t,-1),$=h[a]=u[a](t),{c(){s=n("div"),$.c(),this.h()},l(t){s=r(t,"DIV",{class:!0});var e=l(s);$.l(e),e.forEach(o),this.h()},h(){c(s,"class",f="conversationList "+t[0]+" svelte-pui8gu")},m(t,e){i(t,s,e),h[a].m(s,null),d=!0},p(t,[e]){let n=a;(a=m(t,e))===n?h[a].p(t,e):(L(),E(h[n],1,1,()=>{h[n]=null}),k(),($=h[a])||($=h[a]=u[a](t)).c(),I($,1),$.m(s,null)),(!d||1&e&&f!==(f="conversationList "+t[0]+" svelte-pui8gu"))&&c(s,"class",f)},i(t){d||(I($),d=!0)},o(t){E($),d=!1},d(t){t&&o(s),h[a].d()}}}function lt(t,s,e){let a,n,r,l,o,c=x,i=()=>(c(),c=b($,t=>e(3,n=t)),$);N(t,B,t=>e(7,a=t)),N(t,V,t=>e(4,r=t)),N(t,P,t=>e(5,l=t)),N(t,M,t=>e(6,o=t)),t.$$.on_destroy.push(()=>c());let $=O(null);i();let f,{className:d=""}=s;return t.$set=(t=>{"className"in t&&e(0,d=t.className)}),t.$$.update=(()=>{136&t.$$.dirty&&e(2,f=a&&!n),16&t.$$.dirty&&i(e(1,$=H({userId:r})))}),[d,$,f,n,r,l,o]}class ot extends t{constructor(t){super(),s(this,t,lt,rt,e,{className:0})}}function ct(t){let s;const e=new ot({});return{c(){$(e.$$.fragment)},l(t){u(e.$$.fragment,t)},m(t,a){v(e,t,a),s=!0},i(t){s||(I(e.$$.fragment,t),s=!0)},o(t){E(e.$$.fragment,t),s=!1},d(t){j(e,t)}}}function it(t){let s,e,a;const d=new Q({props:{id:"messages",$$slots:{default:[ct]},$$scope:{ctx:t}}});return{c(){s=f(),e=n("div"),$(d.$$.fragment),this.h()},l(t){U('[data-svelte="svelte-1y4v7mn"]',document.head).forEach(o),s=h(t),e=r(t,"DIV",{class:!0});var a=l(e);u(d.$$.fragment,a),a.forEach(o),this.h()},h(){document.title="Flock",c(e,"class","content")},m(t,n){i(t,s,n),i(t,e,n),v(d,e,null),a=!0},p(t,[s]){const e={};1&s&&(e.$$scope={dirty:s,ctx:t}),d.$set(e)},i(t){a||(I(d.$$.fragment,t),a=!0)},o(t){E(d.$$.fragment,t),a=!1},d(t){t&&o(s),t&&o(e),j(d)}}}export default class extends t{constructor(t){super(),s(this,t,null,it,e,{})}}