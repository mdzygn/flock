import{S as t,i as e,s as n,z as s,q as l,H as a,d as r,A as o,r as c,u as i,v as $,b as m,c as d,I as f,t as u,J as p,as as h,bd as g,b1 as b,Y as v,be as N,bf as C,a7 as D,L as S,K as y,ad as w,aZ as E,aV as A,bg as H,a4 as I,bh as j,a3 as _,a5 as L,bi as O,bj as P,$ as x,m as T,a9 as k,bk as B,bl as F,b3 as V,C as q,D as M,E as U,aL as z,F as G,e as R,U as J,B as K,l as X,G as Y,x as Z,ab as Q,n as W,aM as tt,R as et,T as nt}from"./client.9f5af520.js";import{S as st}from"./Proxy.ba10d480.js";import{C as lt}from"./ContentLoader.8a90430e.js";import{A as at,P as rt,N as ot}from"./AddPost.816ec651.js";import"./Counter.88c5a585.js";import"./post_like_selected.c79724df.js";import"./comment_small.d9789f17.js";import"./index.d0938ad8.js";import"./ImageSelectionBox.b6a2e2d1.js";import"./SearchBar.6bcadeac.js";import"./next_arrow.b1598f96.js";import"./add_small.fcdad09e.js";import"./send.53c7ac4a.js";import{E as ct}from"./EditPost.3bd28a97.js";function it(t,e,n){const s=t.slice();return s[30]=e[n],s}function $t(t){let e,n,l;const a=new st({props:{id:"channel",topOffset:t[4],showScrollHeader:!t[3],$$slots:{default:[St],scrollHeader:[pt]},$$scope:{ctx:t}}});let c=t[12]&&yt(t);return{c(){q(a.$$.fragment),e=s(),c&&c.c(),n=R()},l(t){M(a.$$.fragment,t),e=o(t),c&&c.l(t),n=R()},m(t,s){U(a,t,s),m(t,e,s),c&&c.m(t,s),m(t,n,s),l=!0},p(t,e){const s={};16&e[0]&&(s.topOffset=t[4]),8&e[0]&&(s.showScrollHeader=!t[3]),275458&e[0]|4&e[1]&&(s.$$scope={dirty:e,ctx:t}),a.$set(s),t[12]?c?(c.p(t,e),4096&e[0]&&u(c,1)):((c=yt(t)).c(),u(c,1),c.m(n.parentNode,n)):c&&(S(),d(c,1,1,()=>{c=null}),f())},i(t){l||(u(a.$$.fragment,t),u(c),l=!0)},o(t){d(a.$$.fragment,t),d(c),l=!1},d(t){G(a,t),t&&r(e),c&&c.d(t),t&&r(n)}}}function mt(t){let e;const n=new lt({props:{label:J.CHANNEL.NOT_FOUND}});return{c(){q(n.$$.fragment)},l(t){M(n.$$.fragment,t)},m(t,s){U(n,t,s),e=!0},p:y,i(t){e||(u(n.$$.fragment,t),e=!0)},o(t){d(n.$$.fragment,t),e=!1},d(t){G(n,t)}}}function dt(t){let e;const n=new lt({props:{label:J.LOADING.CHANNEL}});return{c(){q(n.$$.fragment)},l(t){M(n.$$.fragment,t)},m(t,s){U(n,t,s),e=!0},p:y,i(t){e||(u(n.$$.fragment,t),e=!0)},o(t){d(n.$$.fragment,t),e=!1},d(t){G(n,t)}}}function ft(t){let e,n,s;return{c(){e=l("div"),this.h()},l(t){e=c(t,"DIV",{class:!0}),i(e).forEach(r),this.h()},h(){$(e,"class","channelHeaderDescription svelte-15pd0q9"),K(e,"channelHeaderPost",t[12])},m(l,a){m(l,e,a),e.innerHTML=t[13],n||(s=X(e,"click",function(){Y(t[12]?t[21]:null)&&(t[12]?t[21]:null).apply(this,arguments)}),n=!0)},p(n,s){t=n,8192&s[0]&&(e.innerHTML=t[13]),4096&s[0]&&K(e,"channelHeaderPost",t[12])},d(t){t&&r(e),n=!1,s()}}}function ut(t){let e;const n=new at({props:{newPostMessage:t[1],onClick:t[21],submitLabel:J.CHANNEL.ADD_POST}});return{c(){q(n.$$.fragment)},l(t){M(n.$$.fragment,t)},m(t,s){U(n,t,s),e=!0},p(t,e){const s={};2&e[0]&&(s.newPostMessage=t[1]),n.$set(s)},i(t){e||(u(n.$$.fragment,t),e=!0)},o(t){d(n.$$.fragment,t),e=!1},d(t){G(n,t)}}}function pt(t){let e,n,a,p,h=t[13]&&ft(t),g=t[12]&&ut(t);return{c(){e=l("div"),n=l("div"),h&&h.c(),a=s(),g&&g.c(),this.h()},l(t){e=c(t,"DIV",{slot:!0});var s=i(e);n=c(s,"DIV",{class:!0});var l=i(n);h&&h.l(l),a=o(l),g&&g.l(l),l.forEach(r),s.forEach(r),this.h()},h(){$(n,"class","channelHeader svelte-15pd0q9"),$(e,"slot","scrollHeader")},m(t,s){m(t,e,s),Z(e,n),h&&h.m(n,null),Z(n,a),g&&g.m(n,null),p=!0},p(t,e){t[13]?h?h.p(t,e):((h=ft(t)).c(),h.m(n,a)):h&&(h.d(1),h=null),t[12]?g?(g.p(t,e),4096&e[0]&&u(g,1)):((g=ut(t)).c(),u(g,1),g.m(n,null)):g&&(S(),d(g,1,1,()=>{g=null}),f())},i(t){p||(u(g),p=!0)},o(t){d(g),p=!1},d(t){t&&r(e),h&&h.d(),g&&g.d()}}}function ht(t){let e,n,s,l;const a=[bt,gt],o=[];function c(t,e){return!t[18]||t[10]&&t[10].length?1:0}return e=c(t),n=o[e]=a[e](t),{c(){n.c(),s=R()},l(t){n.l(t),s=R()},m(t,n){o[e].m(t,n),m(t,s,n),l=!0},p(t,l){let r=e;(e=c(t))===r?o[e].p(t,l):(S(),d(o[r],1,1,()=>{o[r]=null}),f(),(n=o[e])||(n=o[e]=a[e](t)).c(),u(n,1),n.m(s.parentNode,s))},i(t){l||(u(n),l=!0)},o(t){d(n),l=!1},d(t){o[e].d(t),t&&r(s)}}}function gt(t){let e;const n=new lt({props:{$$slots:{default:[Nt]},$$scope:{ctx:t}}});return{c(){q(n.$$.fragment)},l(t){M(n.$$.fragment,t)},m(t,s){U(n,t,s),e=!0},p(t,e){const s={};4096&e[0]|4&e[1]&&(s.$$scope={dirty:e,ctx:t}),n.$set(s)},i(t){e||(u(n.$$.fragment,t),e=!0)},o(t){d(n.$$.fragment,t),e=!1},d(t){G(n,t)}}}function bt(t){let e;const n=new lt({props:{label:J.LOADING.CHANNEL_ITEMS}});return{c(){q(n.$$.fragment)},l(t){M(n.$$.fragment,t)},m(t,s){U(n,t,s),e=!0},p:y,i(t){e||(u(n.$$.fragment,t),e=!0)},o(t){d(n.$$.fragment,t),e=!1},d(t){G(n,t)}}}function vt(t){let e,n,s,a,o,d,f=J.DISCUSSIONS.ADD_POST_CTA_PREFIX+"",u=J.DISCUSSIONS.ADD_POST_CTA+"";return{c(){e=l("br"),n=et(f),s=l("a"),a=et(u),this.h()},l(t){e=c(t,"BR",{}),n=nt(t,f),s=c(t,"A",{href:!0});var l=i(s);a=nt(l,u),l.forEach(r),this.h()},h(){$(s,"href","/posts/new")},m(l,r){m(l,e,r),m(l,n,r),m(l,s,r),Z(s,a),o||(d=X(s,"click",t[26]),o=!0)},p:y,d(t){t&&r(e),t&&r(n),t&&r(s),o=!1,d()}}}function Nt(t){let e,n,l,a=J.CHANNEL.NO_POSTS+"",c=t[12]&&vt(t);return{c(){e=et(a),n=s(),c&&c.c(),l=s()},l(t){e=nt(t,a),n=o(t),c&&c.l(t),l=o(t)},m(t,s){m(t,e,s),m(t,n,s),c&&c.m(t,s),m(t,l,s)},p(t,e){t[12]?c?c.p(t,e):((c=vt(t)).c(),c.m(l.parentNode,l)):c&&(c.d(1),c=null)},d(t){t&&r(e),t&&r(n),c&&c.d(t),t&&r(l)}}}function Ct(t){let e;const n=new rt({props:{post:t[30]}});return{c(){q(n.$$.fragment)},l(t){M(n.$$.fragment,t)},m(t,s){U(n,t,s),e=!0},p(t,e){const s={};1024&e[0]&&(s.post=t[30]),n.$set(s)},i(t){e||(u(n.$$.fragment,t),e=!0)},o(t){d(n.$$.fragment,t),e=!1},d(t){G(n,t)}}}function Dt(t){let e;const n=new ot({props:{onClick:t[21]}});return{c(){q(n.$$.fragment)},l(t){M(n.$$.fragment,t)},m(t,s){U(n,t,s),e=!0},p:y,i(t){e||(u(n.$$.fragment,t),e=!0)},o(t){d(n.$$.fragment,t),e=!1},d(t){G(n,t)}}}function St(t){let e,n,a,p,h,g=t[10],b=[];for(let e=0;e<g.length;e+=1)b[e]=Ct(it(t,g,e));const v=t=>d(b[t],1,1,()=>{b[t]=null});let N=null;g.length||(N=ht(t));let C=t[12]&&t[10]&&t[10].length>=Et&&Dt(t);return{c(){e=s(),n=l("div"),a=l("div");for(let t=0;t<b.length;t+=1)b[t].c();N&&N.c(),p=s(),C&&C.c(),this.h()},l(t){e=o(t),n=c(t,"DIV",{class:!0});var s=i(n);a=c(s,"DIV",{class:!0});var l=i(a);for(let t=0;t<b.length;t+=1)b[t].l(l);N&&N.l(l),l.forEach(r),p=o(s),C&&C.l(s),s.forEach(r),this.h()},h(){$(a,"class","postsContainer svelte-15pd0q9"),$(n,"class","content svelte-15pd0q9")},m(t,s){m(t,e,s),m(t,n,s),Z(n,a);for(let t=0;t<b.length;t+=1)b[t].m(a,null);N&&N.m(a,null),Z(n,p),C&&C.m(n,null),h=!0},p(t,e){if(2364416&e[0]){let n;for(g=t[10],n=0;n<g.length;n+=1){const s=it(t,g,n);b[n]?(b[n].p(s,e),u(b[n],1)):(b[n]=Ct(s),b[n].c(),u(b[n],1),b[n].m(a,null))}for(S(),n=g.length;n<b.length;n+=1)v(n);f(),!g.length&&N?N.p(t,e):g.length?N&&(N.d(1),N=null):((N=ht(t)).c(),N.m(a,null))}t[12]&&t[10]&&t[10].length>=Et?C?(C.p(t,e),5120&e[0]&&u(C,1)):((C=Dt(t)).c(),u(C,1),C.m(n,null)):C&&(S(),d(C,1,1,()=>{C=null}),f())},i(t){if(!h){for(let t=0;t<g.length;t+=1)u(b[t]);u(C),h=!0}},o(t){b=b.filter(Boolean);for(let t=0;t<b.length;t+=1)d(b[t]);d(C),h=!1},d(t){t&&r(e),t&&r(n),Q(b,t),N&&N.d(),C&&C.d()}}}function yt(t){let e,n,s,l;function a(e){t[27].call(null,e)}function r(e){t[28].call(null,e)}function o(e){t[29].call(null,e)}let c={shown:t[3],submitLabel:J.CHANNEL.ADD_POST,inlineComponent:!0,smallNextButton:!0};void 0!==t[1]&&(c.message=t[1]),void 0!==t[2]&&(c.messageField=t[2]),void 0!==t[5]&&(c.element=t[5]);const i=new ct({props:c});return W.push(()=>tt(i,"message",a)),W.push(()=>tt(i,"messageField",r)),W.push(()=>tt(i,"element",o)),i.$on("hide",t[20]),i.$on("resize",t[19]),{c(){q(i.$$.fragment)},l(t){M(i.$$.fragment,t)},m(t,e){U(i,t,e),l=!0},p(t,l){const a={};8&l[0]&&(a.shown=t[3]),!e&&2&l[0]&&(e=!0,a.message=t[1],z(()=>e=!1)),!n&&4&l[0]&&(n=!0,a.messageField=t[2],z(()=>n=!1)),!s&&32&l[0]&&(s=!0,a.element=t[5],z(()=>s=!1)),i.$set(a)},i(t){l||(u(i.$$.fragment,t),l=!0)},o(t){d(i.$$.fragment,t),l=!1},d(t){G(i,t)}}}function wt(t){let e,n,p,h,g,b,v;document.title=e=t[6]+"Flock";const N=[dt,mt,$t],C=[];function y(t,e){return 248704&e[0]&&(h=!((!t[14]||t[8]&&t[8].id===t[9])&&D(t[11],t[15],t[16])&&(t[7]||!t[17]))),h?0:t[8]&&t[8].id?2:1}return g=y(t,[-1]),b=C[g]=N[g](t),{c(){n=s(),p=l("div"),b.c(),this.h()},l(t){a('[data-svelte="svelte-pjz2s7"]',document.head).forEach(r),n=o(t),p=c(t,"DIV",{class:!0});var e=i(p);b.l(e),e.forEach(r),this.h()},h(){$(p,"class","pageContent svelte-15pd0q9")},m(t,e){m(t,n,e),m(t,p,e),C[g].m(p,null),v=!0},p(t,n){(!v||64&n[0])&&e!==(e=t[6]+"Flock")&&(document.title=e);let s=g;(g=y(t,n))===s?C[g].p(t,n):(S(),d(C[s],1,1,()=>{C[s]=null}),f(),(b=C[g])||(b=C[g]=N[g](t)).c(),u(b,1),b.m(p,null))},i(t){v||(u(b),v=!0)},o(t){d(b),v=!1},d(t){t&&r(n),t&&r(p),C[g].d()}}}const Et=6;function At(t,e,n){let s,l,a,r,o,c,i,$,m,d,f,u=y,D=()=>(u(),u=v(S,t=>n(10,o=t)),S);p(t,w,t=>n(7,s=t)),p(t,E,t=>n(23,l=t)),p(t,A,t=>n(8,a=t)),p(t,H,t=>n(9,r=t)),p(t,I,t=>n(11,c=t)),p(t,j,t=>n(14,i=t)),p(t,_,t=>n(15,$=t)),p(t,L,t=>n(16,m=t)),p(t,O,t=>n(17,d=t)),p(t,P,t=>n(18,f=t)),t.$$.on_destroy.push(()=>u()),h(E,l="thread"),g(),b();let S=x([]);D();let q="",M=null,U=!1,z=0,G=null;async function R(){await T(),n(4,z=U&&G&&G.offsetHeight||0)}async function J(t){k(t),B()&&(n(3,U=!0),M&&(await T(),M.focus()))}let K,X,Y,Z,Q,W;return t.$$.update=(()=>{128&t.$$.dirty[0]&&n(6,K=s&&s.title&&s.title+" - "||""),128&t.$$.dirty[0]&&n(22,X=s&&s.archived||!1),256&t.$$.dirty[0]&&n(24,Y=a&&a.sortByCreated||!1),16777728&t.$$.dirty[0]&&D(n(0,S=N({channelId:r,type:"thread",sortByCreated:Y}))),1024&t.$$.dirty[0]&&C(o),2176&t.$$.dirty[0]&&n(25,Z=c&&F(s)),37748992&t.$$.dirty[0]&&n(12,Q=a&&(!a.teamOnly||Z)&&!X),256&t.$$.dirty[0]&&n(13,W=a&&(a.description||V(a))||null),40&t.$$.dirty[0]&&R()}),[S,q,M,U,z,G,K,s,a,r,o,c,Q,W,i,$,m,d,f,R,function(){n(3,U=!1)},J,X,l,Y,Z,t=>(J(),k(t)),function(t){n(1,q=t)},function(t){n(2,M=t)},function(t){n(5,G=t)}]}export default class extends t{constructor(t){super(),e(this,t,At,wt,n,{},[-1,-1])}}