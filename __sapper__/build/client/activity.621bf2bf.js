import{O as t,S as e,i as s,s as n,p as l,e as a,H as r,r as i,u as c,h as o,I as d,g as u,v as h,j as $,w as f,J as m,F as p,y as v,b as g,k as y,t as I,Q as b,R as T,T as N,U as D,M as E,x as j,C as O,V as w,D as V,W as q,c as A,a as C,m as P,d as x,l as F,X as L,Y as _,Z as R,_ as S,$ as B,a0 as k,f as H,a1 as M,a2 as G,a3 as J,n as U,q as X}from"./client.3c58eb54.js";import"./Hotspot.caf8438e.js";import"./ContentPanel.74b5a69d.js";import{C as Q}from"./ContentLoader.96416f59.js";function W(t){let e,s;return{c(){e=l("img"),this.h()},l(t){e=i(t,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){h(e,"class","thumb svelte-1by30qb"),e.src!==(s=t[1])&&h(e,"src",s),h(e,"alt",t[8])},m(t,s){$(t,e,s)},p(t,n){2&n&&e.src!==(s=t[1])&&h(e,"src",s),256&n&&h(e,"alt",t[8])},i:j,o:j,d(t){t&&u(e)}}}function Y(t){let e;const s=new q({props:{user:t[7],useThumb:!0}});return{c(){A(s.$$.fragment)},l(t){C(s.$$.fragment,t)},m(t,n){P(s,t,n),e=!0},p(t,e){const n={};128&e&&(n.user=t[7]),s.$set(n)},i(t){e||(I(s.$$.fragment,t),e=!0)},o(t){g(s.$$.fragment,t),e=!1},d(t){x(s,t)}}}function Z(t){let e,s,n,p=t[5]&&z(t);return{c(){e=l("div"),p&&p.c(),s=a(),n=r(t[6]),this.h()},l(l){e=i(l,"DIV",{class:!0});var a=c(e);p&&p.l(a),s=o(a),n=d(a,t[6]),a.forEach(u),this.h()},h(){h(e,"class","detail svelte-1by30qb")},m(t,l){$(t,e,l),p&&p.m(e,null),f(e,s),f(e,n)},p(t,l){t[5]?p?p.p(t,l):((p=z(t)).c(),p.m(e,s)):p&&(p.d(1),p=null),64&l&&m(n,t[6])},d(t){t&&u(e),p&&p.d()}}}function z(t){let e,s,n,a,o=E.NOTIFICATION.PROJECT_PREFIX+"";return{c(){e=r(o),s=l("span"),n=r(t[5]),a=r(" -"),this.h()},l(l){e=d(l,o),s=i(l,"SPAN",{class:!0});var r=c(s);n=d(r,t[5]),r.forEach(u),a=d(l," -"),this.h()},h(){h(s,"class","projectTitle svelte-1by30qb")},m(t,l){$(t,e,l),$(t,s,l),f(s,n),$(t,a,l)},p(t,e){32&e&&m(n,t[5])},d(t){t&&u(e),t&&u(s),t&&u(a)}}}function K(t){let e;return{c(){e=l("div"),this.h()},l(t){e=i(t,"DIV",{class:!0}),c(e).forEach(u),this.h()},h(){h(e,"class","unseenIcon svelte-1by30qb")},m(t,s){$(t,e,s)},d(t){t&&u(e)}}}function tt(t){let e,s,n,b,T,N,D,E,j,O,w,V,q,A,C,P;const x=[Y,W],F=[];function L(t,e){return t[2]?0:1}s=L(t),n=F[s]=x[s](t);let _=t[6]&&Z(t),R=!t[4]&&K();return{c(){e=l("div"),n.c(),b=a(),T=l("div"),N=l("div"),D=l("div"),E=r(t[8]),j=a(),O=l("div"),w=a(),_&&_.c(),V=a(),q=l("div"),R&&R.c(),this.h()},l(s){e=i(s,"DIV",{class:!0});var l=c(e);n.l(l),b=o(l),T=i(l,"DIV",{class:!0});var a=c(T);N=i(a,"DIV",{class:!0});var r=c(N);D=i(r,"DIV",{class:!0});var h=c(D);E=d(h,t[8]),h.forEach(u),j=o(r),O=i(r,"DIV",{class:!0}),c(O).forEach(u),w=o(r),_&&_.l(r),r.forEach(u),a.forEach(u),V=o(l),q=i(l,"DIV",{class:!0});var $=c(q);R&&R.l($),$.forEach(u),l.forEach(u),this.h()},h(){h(D,"class","title svelte-1by30qb"),h(O,"class","message svelte-1by30qb"),h(N,"class","detailInnerContent svelte-1by30qb"),h(T,"class","detailContent svelte-1by30qb"),h(q,"class","info svelte-1by30qb"),h(e,"class","notifcationListItem svelte-1by30qb")},m(n,l){$(n,e,l),F[s].m(e,null),f(e,b),f(e,T),f(T,N),f(N,D),f(D,E),f(N,j),f(N,O),O.innerHTML=t[3],f(N,w),_&&_.m(N,null),f(e,V),f(e,q),R&&R.m(q,null),A=!0,C||(P=p(e,"click",t[9]),C=!0)},p(t,[l]){let a=s;(s=L(t))===a?F[s].p(t,l):(v(),g(F[a],1,1,()=>{F[a]=null}),y(),(n=F[s])||(n=F[s]=x[s](t)).c(),I(n,1),n.m(e,b)),(!A||256&l)&&m(E,t[8]),(!A||8&l)&&(O.innerHTML=t[3]),t[6]?_?_.p(t,l):((_=Z(t)).c(),_.m(N,null)):_&&(_.d(1),_=null),t[4]?R&&(R.d(1),R=null):R||((R=K()).c(),R.m(q,null))},i(t){A||(I(n),A=!0)},o(t){g(n),A=!1},d(t){t&&u(e),F[s].d(),_&&_.d(),R&&R.d(),C=!1,P()}}}function et(e,s,n){let l,a,r=j,i=()=>(r(),r=b(P,t=>n(10,l=t)),P),c=j;e.$$.on_destroy.push(()=>r()),e.$$.on_destroy.push(()=>c());let o,d,u,h,$,f,m,p,v,g,y,I,E,q,A,C,{notification:P}=s;return i(),e.$set=(t=>{"notification"in t&&i(n(0,P=t.notification))}),e.$$.update=(()=>{1024&e.$$.dirty&&n(2,d=l&&l.isUserAction||!0),1024&e.$$.dirty&&n(11,u=l&&l.title||""),1024&e.$$.dirty&&n(3,h=l&&function(e){let s=null;if(e.indirect||e.notPriority)s="<i>(indirect)</i>";else switch(e.type){case t.POST_ADDED:e.threadId?s=e.threadTitle?'replied in "'+e.threadTitle+'"':e.channelTitle?"replied to a post in #"+e.channelTitle:"replied to a post":e.channelId?s=e.channelTitle?"added a post to #"+e.channelTitle:"added a post":e.projectId&&(s="posted an update")}return s}(l)||""),1024&e.$$.dirty&&($=l&&l.postId||null),1024&e.$$.dirty&&(f=l&&l.threadId||null),1024&e.$$.dirty&&(m=l&&l.channelId||null),1024&e.$$.dirty&&(p=l&&l.projectId||null),1024&e.$$.dirty&&n(4,v=l&&l.viewed||!1),1024&e.$$.dirty&&n(5,g=l&&l.projectTitle),1024&e.$$.dirty&&n(16,y=l&&l.createdAt||null),65536&e.$$.dirty&&n(6,I=y&&T(y)||""),1024&e.$$.dirty&&n(17,E=l&&l.actors&&l.actors.length&&l.actors[0]||null),196608&e.$$.dirty&&(()=>(c(),c=b(q,t=>n(19,a=t)),q))(n(7,q=E&&y&&N(E,y)||D(null))),655360&e.$$.dirty&&n(18,A=a&&a.name||E&&E.name||""),264192&e.$$.dirty&&n(8,C=u||A||"")}),n(1,o=""),[P,"",d,h,v,g,I,q,C,function(){f?O(f,{anchorToBottom:!0}):$?O($):m?w(m):p&&V(p)}]}class st extends e{constructor(t){super(),s(this,t,et,tt,n,{notification:0})}}function nt(t,e,s){const n=t.slice();return n[8]=e[s],n}function lt(t){let e,s,n=t[3],l=[];for(let e=0;e<n.length;e+=1)l[e]=ct(nt(t,n,e));const a=t=>g(l[t],1,1,()=>{l[t]=null});let r=null;return n.length||(r=rt()),{c(){for(let t=0;t<l.length;t+=1)l[t].c();e=H(),r&&r.c()},l(t){for(let e=0;e<l.length;e+=1)l[e].l(t);e=H(),r&&r.l(t)},m(t,n){for(let e=0;e<l.length;e+=1)l[e].m(t,n);$(t,e,n),r&&r.m(t,n),s=!0},p(t,s){if(8&s){let i;for(n=t[3],i=0;i<n.length;i+=1){const a=nt(t,n,i);l[i]?(l[i].p(a,s),I(l[i],1)):(l[i]=ct(a),l[i].c(),I(l[i],1),l[i].m(e.parentNode,e))}for(v(),i=n.length;i<l.length;i+=1)a(i);y(),!n.length&&r?r.p(t,s):n.length?r&&(r.d(1),r=null):((r=rt()).c(),r.m(e.parentNode,e))}},i(t){if(!s){for(let t=0;t<n.length;t+=1)I(l[t]);s=!0}},o(t){l=l.filter(Boolean);for(let t=0;t<l.length;t+=1)g(l[t]);s=!1},d(t){J(l,t),t&&u(e),r&&r.d(t)}}}function at(t){let e;const s=new Q({props:{label:E.LOADING.NOTIFICATIONS}});return{c(){A(s.$$.fragment)},l(t){C(s.$$.fragment,t)},m(t,n){P(s,t,n),e=!0},p:j,i(t){e||(I(s.$$.fragment,t),e=!0)},o(t){g(s.$$.fragment,t),e=!1},d(t){x(s,t)}}}function rt(t){let e,s,n,m,v,g,y,I,b,T,N,D,O,w,V,q=E.NOTIFICATIONS.NO_NOTIFICATIONS+"";return{c(){e=l("div"),s=r(q),n=l("br"),m=l("br"),v=a(),g=l("a"),y=r("Discover"),I=r(" inspiring projects to get involved with"),b=l("br"),T=r("or create a "),N=l("a"),D=r("New Project"),O=a(),this.h()},l(t){e=i(t,"DIV",{class:!0});var l=c(e);s=d(l,q),n=i(l,"BR",{}),m=i(l,"BR",{}),v=o(l),g=i(l,"A",{href:!0});var a=c(g);y=d(a,"Discover"),a.forEach(u),I=d(l," inspiring projects to get involved with"),b=i(l,"BR",{}),T=d(l,"or create a "),N=i(l,"A",{href:!0});var r=c(N);D=d(r,"New Project"),r.forEach(u),O=o(l),l.forEach(u),this.h()},h(){h(g,"href","discover"),h(N,"href","javascript:void(0)"),h(e,"class","noNotifications svelte-u931uv")},m(t,l){$(t,e,l),f(e,s),f(e,n),f(e,m),f(e,v),f(e,g),f(g,y),f(e,I),f(e,b),f(e,T),f(e,N),f(N,D),f(e,O),w||(V=p(N,"click",G),w=!0)},p:j,d(t){t&&u(e),w=!1,V()}}}function it(t){let e;const s=new st({props:{notification:t[8]}});return{c(){A(s.$$.fragment)},l(t){C(s.$$.fragment,t)},m(t,n){P(s,t,n),e=!0},p(t,e){const n={};8&e&&(n.notification=t[8]),s.$set(n)},i(t){e||(I(s.$$.fragment,t),e=!0)},o(t){g(s.$$.fragment,t),e=!1},d(t){x(s,t)}}}function ct(t){let e,s,n=!M(t[8]).indirect&&!M(t[8]).notPriority,l=n&&it(t);return{c(){l&&l.c(),e=H()},l(t){l&&l.l(t),e=H()},m(t,n){l&&l.m(t,n),$(t,e,n),s=!0},p(t,s){8&s&&(n=!M(t[8]).indirect&&!M(t[8]).notPriority),n?l?(l.p(t,s),8&s&&I(l,1)):((l=it(t)).c(),I(l,1),l.m(e.parentNode,e)):l&&(v(),g(l,1,1,()=>{l=null}),y())},i(t){s||(I(l),s=!0)},o(t){g(l),s=!1},d(t){l&&l.d(t),t&&u(e)}}}function ot(t){let e,s,n,a,r,o;const d=[at,lt],f=[];function m(t,e){return 116&e&&(s=!(!t[2]&&k(t[5],t[4],t[6]))),s?0:1}return n=m(t,-1),a=f[n]=d[n](t),{c(){e=l("div"),a.c(),this.h()},l(t){e=i(t,"DIV",{class:!0});var s=c(e);a.l(s),s.forEach(u),this.h()},h(){h(e,"class",r="notificationList "+t[0]+" svelte-u931uv")},m(t,s){$(t,e,s),f[n].m(e,null),o=!0},p(t,[s]){let l=n;(n=m(t,s))===l?f[n].p(t,s):(v(),g(f[l],1,1,()=>{f[l]=null}),y(),(a=f[n])||(a=f[n]=d[n](t)).c(),I(a,1),a.m(e,null)),(!o||1&s&&r!==(r="notificationList "+t[0]+" svelte-u931uv"))&&h(e,"class",r)},i(t){o||(I(a),o=!0)},o(t){g(a),o=!1},d(t){t&&u(e),f[n].d()}}}function dt(t,e,s){let n,l,a,r,i,c=j,o=()=>(c(),c=b(d,t=>s(3,l=t)),d);F(t,L,t=>s(7,n=t)),F(t,_,t=>s(4,a=t)),F(t,R,t=>s(5,r=t)),F(t,S,t=>s(6,i=t)),t.$$.on_destroy.push(()=>c());let d=D([]);o();let u,{className:h=""}=e;return t.$set=(t=>{"className"in t&&s(0,h=t.className)}),t.$$.update=(()=>{136&t.$$.dirty&&s(2,u=n&&!l),16&t.$$.dirty&&o(s(1,d=B({userId:a})))}),[h,d,u,l,a,r,i]}class ut extends e{constructor(t){super(),s(this,t,dt,ot,n,{className:0})}}function ht(t){let e;const s=new ut({});return{c(){A(s.$$.fragment)},l(t){C(s.$$.fragment,t)},m(t,n){P(s,t,n),e=!0},i(t){e||(I(s.$$.fragment,t),e=!0)},o(t){g(s.$$.fragment,t),e=!1},d(t){x(s,t)}}}function $t(t){let e,s,n;const r=new U({props:{id:"activity",$$slots:{default:[ht]},$$scope:{ctx:t}}});return{c(){e=a(),s=l("div"),A(r.$$.fragment),this.h()},l(t){X('[data-svelte="svelte-1y4v7mn"]',document.head).forEach(u),e=o(t),s=i(t,"DIV",{class:!0});var n=c(s);C(r.$$.fragment,n),n.forEach(u),this.h()},h(){document.title="Flock",h(s,"class","content")},m(t,l){$(t,e,l),$(t,s,l),P(r,s,null),n=!0},p(t,[e]){const s={};1&e&&(s.$$scope={dirty:e,ctx:t}),r.$set(s)},i(t){n||(I(r.$$.fragment,t),n=!0)},o(t){g(r.$$.fragment,t),n=!1},d(t){t&&u(e),t&&u(s),x(r)}}}export default class extends e{constructor(t){super(),s(this,t,null,$t,n,{})}}