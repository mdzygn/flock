import{S as t,i as e,s as n,z as s,q as l,H as a,d as r,A as o,r as c,u as i,v as $,b as f,c as d,I as m,t as u,J as p,ar as h,b1 as g,aT as b,Y as v,b2 as w,b3 as N,a7 as y,L as j,K as E,ad as H,aN as A,aR as C,aO as D,a4 as L,b4 as P,a3 as I,a5 as O,b5 as x,b6 as S,$ as _,m as T,a9 as k,b7 as B,b8 as F,b9 as V,C as M,D as z,E as G,ax as R,F as q,e as J,V as K,B as U,l as Y,G as Q,x as W,ab as X,n as Z,aA as tt,R as et,T as nt}from"./client.b937c12a.js";import{S as st}from"./Proxy.9d528d01.js";import{C as lt}from"./ContentLoader.83142d4b.js";import{N as at}from"./postPlaceholder.f2ef4393.js";import"./Counter.d1f8bedf.js";import{A as rt,P as ot}from"./AddPost.72487217.js";import"./post_like_selected.c79724df.js";import"./ImageSelectionBox.c261bb91.js";import"./SearchBar.393201ad.js";import"./next_arrow.b1598f96.js";import"./add_small.fcdad09e.js";import"./send.53c7ac4a.js";import{E as ct}from"./EditPost.1e29d955.js";function it(t,e,n){const s=t.slice();return s[30]=e[n],s}function $t(t){let e,n,l;const a=new st({props:{id:"channel",topOffset:t[4],showScrollHeader:!t[3],$$slots:{default:[jt],scrollHeader:[pt]},$$scope:{ctx:t}}});let c=t[11]&&Et(t);return{c(){M(a.$$.fragment),e=s(),c&&c.c(),n=J()},l(t){z(a.$$.fragment,t),e=o(t),c&&c.l(t),n=J()},m(t,s){G(a,t,s),f(t,e,s),c&&c.m(t,s),f(t,n,s),l=!0},p(t,e){const s={};16&e[0]&&(s.topOffset=t[4]),8&e[0]&&(s.showScrollHeader=!t[3]),276482&e[0]|4&e[1]&&(s.$$scope={dirty:e,ctx:t}),a.$set(s),t[11]?c?(c.p(t,e),2048&e[0]&&u(c,1)):((c=Et(t)).c(),u(c,1),c.m(n.parentNode,n)):c&&(j(),d(c,1,1,()=>{c=null}),m())},i(t){l||(u(a.$$.fragment,t),u(c),l=!0)},o(t){d(a.$$.fragment,t),d(c),l=!1},d(t){q(a,t),t&&r(e),c&&c.d(t),t&&r(n)}}}function ft(t){let e;const n=new lt({props:{label:K.CHANNEL.NOT_FOUND}});return{c(){M(n.$$.fragment)},l(t){z(n.$$.fragment,t)},m(t,s){G(n,t,s),e=!0},p:E,i(t){e||(u(n.$$.fragment,t),e=!0)},o(t){d(n.$$.fragment,t),e=!1},d(t){q(n,t)}}}function dt(t){let e;const n=new lt({props:{label:K.LOADING.CHANNEL}});return{c(){M(n.$$.fragment)},l(t){z(n.$$.fragment,t)},m(t,s){G(n,t,s),e=!0},p:E,i(t){e||(u(n.$$.fragment,t),e=!0)},o(t){d(n.$$.fragment,t),e=!1},d(t){q(n,t)}}}function mt(t){let e,n,s;return{c(){e=l("div"),this.h()},l(t){e=c(t,"DIV",{class:!0}),i(e).forEach(r),this.h()},h(){$(e,"class","channelHeaderDescription svelte-9bjw9t"),U(e,"channelHeaderPost",t[11])},m(l,a){f(l,e,a),e.innerHTML=t[12],n||(s=Y(e,"click",function(){Q(t[11]?t[21]:null)&&(t[11]?t[21]:null).apply(this,arguments)}),n=!0)},p(n,s){t=n,4096&s[0]&&(e.innerHTML=t[12]),2048&s[0]&&U(e,"channelHeaderPost",t[11])},d(t){t&&r(e),n=!1,s()}}}function ut(t){let e;const n=new rt({props:{newPostMessage:t[1],onClick:t[21],submitLabel:K.CHANNEL.ADD_POST}});return{c(){M(n.$$.fragment)},l(t){z(n.$$.fragment,t)},m(t,s){G(n,t,s),e=!0},p(t,e){const s={};2&e[0]&&(s.newPostMessage=t[1]),n.$set(s)},i(t){e||(u(n.$$.fragment,t),e=!0)},o(t){d(n.$$.fragment,t),e=!1},d(t){q(n,t)}}}function pt(t){let e,n,a,p,h=t[12]&&mt(t),g=t[11]&&ut(t);return{c(){e=l("div"),n=l("div"),h&&h.c(),a=s(),g&&g.c(),this.h()},l(t){e=c(t,"DIV",{slot:!0});var s=i(e);n=c(s,"DIV",{class:!0});var l=i(n);h&&h.l(l),a=o(l),g&&g.l(l),l.forEach(r),s.forEach(r),this.h()},h(){$(n,"class","channelHeader svelte-9bjw9t"),$(e,"slot","scrollHeader")},m(t,s){f(t,e,s),W(e,n),h&&h.m(n,null),W(n,a),g&&g.m(n,null),p=!0},p(t,e){t[12]?h?h.p(t,e):((h=mt(t)).c(),h.m(n,a)):h&&(h.d(1),h=null),t[11]?g?(g.p(t,e),2048&e[0]&&u(g,1)):((g=ut(t)).c(),u(g,1),g.m(n,null)):g&&(j(),d(g,1,1,()=>{g=null}),m())},i(t){p||(u(g),p=!0)},o(t){d(g),p=!1},d(t){t&&r(e),h&&h.d(),g&&g.d()}}}function ht(t){let e,n,s,l;const a=[bt,gt],o=[];function c(t,e){return!t[18]||t[13]&&t[13].length?1:0}return e=c(t),n=o[e]=a[e](t),{c(){n.c(),s=J()},l(t){n.l(t),s=J()},m(t,n){o[e].m(t,n),f(t,s,n),l=!0},p(t,l){let r=e;(e=c(t))===r?o[e].p(t,l):(j(),d(o[r],1,1,()=>{o[r]=null}),m(),(n=o[e])||(n=o[e]=a[e](t)).c(),u(n,1),n.m(s.parentNode,s))},i(t){l||(u(n),l=!0)},o(t){d(n),l=!1},d(t){o[e].d(t),t&&r(s)}}}function gt(t){let e;const n=new lt({props:{$$slots:{default:[wt]},$$scope:{ctx:t}}});return{c(){M(n.$$.fragment)},l(t){z(n.$$.fragment,t)},m(t,s){G(n,t,s),e=!0},p(t,e){const s={};2048&e[0]|4&e[1]&&(s.$$scope={dirty:e,ctx:t}),n.$set(s)},i(t){e||(u(n.$$.fragment,t),e=!0)},o(t){d(n.$$.fragment,t),e=!1},d(t){q(n,t)}}}function bt(t){let e;const n=new lt({props:{label:K.LOADING.CHANNEL_ITEMS}});return{c(){M(n.$$.fragment)},l(t){z(n.$$.fragment,t)},m(t,s){G(n,t,s),e=!0},p:E,i(t){e||(u(n.$$.fragment,t),e=!0)},o(t){d(n.$$.fragment,t),e=!1},d(t){q(n,t)}}}function vt(t){let e,n,s,a,o,d;return{c(){e=l("br"),n=et("be the first to "),s=l("a"),a=et("Add a Post"),this.h()},l(t){e=c(t,"BR",{}),n=nt(t,"be the first to "),s=c(t,"A",{href:!0});var l=i(s);a=nt(l,"Add a Post"),l.forEach(r),this.h()},h(){$(s,"href","/posts/new")},m(l,r){f(l,e,r),f(l,n,r),f(l,s,r),W(s,a),o||(d=Y(s,"click",t[26]),o=!0)},p:E,d(t){t&&r(e),t&&r(n),t&&r(s),o=!1,d()}}}function wt(t){let e,n,l,a=K.CHANNEL.NO_POSTS+"",c=t[11]&&vt(t);return{c(){e=et(a),n=s(),c&&c.c(),l=s()},l(t){e=nt(t,a),n=o(t),c&&c.l(t),l=o(t)},m(t,s){f(t,e,s),f(t,n,s),c&&c.m(t,s),f(t,l,s)},p(t,e){t[11]?c?c.p(t,e):((c=vt(t)).c(),c.m(l.parentNode,l)):c&&(c.d(1),c=null)},d(t){t&&r(e),t&&r(n),c&&c.d(t),t&&r(l)}}}function Nt(t){let e;const n=new ot({props:{post:t[30]}});return{c(){M(n.$$.fragment)},l(t){z(n.$$.fragment,t)},m(t,s){G(n,t,s),e=!0},p(t,e){const s={};8192&e[0]&&(s.post=t[30]),n.$set(s)},i(t){e||(u(n.$$.fragment,t),e=!0)},o(t){d(n.$$.fragment,t),e=!1},d(t){q(n,t)}}}function yt(t){let e;const n=new at({props:{onClick:t[21]}});return{c(){M(n.$$.fragment)},l(t){z(n.$$.fragment,t)},m(t,s){G(n,t,s),e=!0},p:E,i(t){e||(u(n.$$.fragment,t),e=!0)},o(t){d(n.$$.fragment,t),e=!1},d(t){q(n,t)}}}function jt(t){let e,n,a,p,h,g=t[13],b=[];for(let e=0;e<g.length;e+=1)b[e]=Nt(it(t,g,e));const v=t=>d(b[t],1,1,()=>{b[t]=null});let w=null;g.length||(w=ht(t));let N=t[11]&&t[13]&&t[13].length>=At&&yt(t);return{c(){e=s(),n=l("div"),a=l("div");for(let t=0;t<b.length;t+=1)b[t].c();w&&w.c(),p=s(),N&&N.c(),this.h()},l(t){e=o(t),n=c(t,"DIV",{class:!0});var s=i(n);a=c(s,"DIV",{class:!0});var l=i(a);for(let t=0;t<b.length;t+=1)b[t].l(l);w&&w.l(l),l.forEach(r),p=o(s),N&&N.l(s),s.forEach(r),this.h()},h(){$(a,"class","postsContainer svelte-9bjw9t"),$(n,"class","content svelte-9bjw9t")},m(t,s){f(t,e,s),f(t,n,s),W(n,a);for(let t=0;t<b.length;t+=1)b[t].m(a,null);w&&w.m(a,null),W(n,p),N&&N.m(n,null),h=!0},p(t,e){if(2369536&e[0]){let n;for(g=t[13],n=0;n<g.length;n+=1){const s=it(t,g,n);b[n]?(b[n].p(s,e),u(b[n],1)):(b[n]=Nt(s),b[n].c(),u(b[n],1),b[n].m(a,null))}for(j(),n=g.length;n<b.length;n+=1)v(n);m(),!g.length&&w?w.p(t,e):g.length?w&&(w.d(1),w=null):((w=ht(t)).c(),w.m(a,null))}t[11]&&t[13]&&t[13].length>=At?N?(N.p(t,e),10240&e[0]&&u(N,1)):((N=yt(t)).c(),u(N,1),N.m(n,null)):N&&(j(),d(N,1,1,()=>{N=null}),m())},i(t){if(!h){for(let t=0;t<g.length;t+=1)u(b[t]);u(N),h=!0}},o(t){b=b.filter(Boolean);for(let t=0;t<b.length;t+=1)d(b[t]);d(N),h=!1},d(t){t&&r(e),t&&r(n),X(b,t),w&&w.d(),N&&N.d()}}}function Et(t){let e,n,s,l;function a(e){t[27].call(null,e)}function r(e){t[28].call(null,e)}function o(e){t[29].call(null,e)}let c={shown:t[3],submitLabel:K.CHANNEL.ADD_POST,inlineComponent:!0};void 0!==t[1]&&(c.message=t[1]),void 0!==t[2]&&(c.messageField=t[2]),void 0!==t[5]&&(c.element=t[5]);const i=new ct({props:c});return Z.push(()=>tt(i,"message",a)),Z.push(()=>tt(i,"messageField",r)),Z.push(()=>tt(i,"element",o)),i.$on("hide",t[20]),i.$on("resize",t[19]),{c(){M(i.$$.fragment)},l(t){z(i.$$.fragment,t)},m(t,e){G(i,t,e),l=!0},p(t,l){const a={};8&l[0]&&(a.shown=t[3]),!e&&2&l[0]&&(e=!0,a.message=t[1],R(()=>e=!1)),!n&&4&l[0]&&(n=!0,a.messageField=t[2],R(()=>n=!1)),!s&&32&l[0]&&(s=!0,a.element=t[5],R(()=>s=!1)),i.$set(a)},i(t){l||(u(i.$$.fragment,t),l=!0)},o(t){d(i.$$.fragment,t),l=!1},d(t){q(i,t)}}}function Ht(t){let e,n,p,h,g,b,v;document.title=e=t[6]+"Flock";const w=[dt,ft,$t],N=[];function E(t,e){return 247680&e[0]&&(h=!((!t[14]||t[8]&&t[8].id===t[9])&&y(t[10],t[15],t[16])&&(t[7]||!t[17]))),h?0:t[8]&&t[8].id?2:1}return g=E(t,[-1]),b=N[g]=w[g](t),{c(){n=s(),p=l("div"),b.c(),this.h()},l(t){a('[data-svelte="svelte-pjz2s7"]',document.head).forEach(r),n=o(t),p=c(t,"DIV",{class:!0});var e=i(p);b.l(e),e.forEach(r),this.h()},h(){$(p,"class","pageContent svelte-9bjw9t")},m(t,e){f(t,n,e),f(t,p,e),N[g].m(p,null),v=!0},p(t,n){(!v||64&n[0])&&e!==(e=t[6]+"Flock")&&(document.title=e);let s=g;(g=E(t,n))===s?N[g].p(t,n):(j(),d(N[s],1,1,()=>{N[s]=null}),m(),(b=N[g])||(b=N[g]=w[g](t)).c(),u(b,1),b.m(p,null))},i(t){v||(u(b),v=!0)},o(t){d(b),v=!1},d(t){t&&r(n),t&&r(p),N[g].d()}}}const At=6;function Ct(t,e,n){let s,l,a,r,o,c,i,$,f,d,m,u=E,y=()=>(u(),u=v(j,t=>n(13,c=t)),j);p(t,H,t=>n(7,s=t)),p(t,A,t=>n(23,l=t)),p(t,C,t=>n(8,a=t)),p(t,D,t=>n(9,r=t)),p(t,L,t=>n(10,o=t)),p(t,P,t=>n(14,i=t)),p(t,I,t=>n(15,$=t)),p(t,O,t=>n(16,f=t)),p(t,x,t=>n(17,d=t)),p(t,S,t=>n(18,m=t)),t.$$.on_destroy.push(()=>u()),h(A,l="thread"),g(),b();let j=_([]);y();let M="",z=null,G=!1,R=0,q=null;async function J(){await T(),n(4,R=G&&q&&q.offsetHeight||0)}async function K(t){k(t),B()&&(n(3,G=!0),z&&(await T(),z.focus()))}let U,Y,Q,W,X,Z;return t.$$.update=(()=>{128&t.$$.dirty[0]&&n(6,U=s&&s.title&&s.title+" - "||""),128&t.$$.dirty[0]&&n(22,Y=s&&s.archived||!1),256&t.$$.dirty[0]&&n(24,Q=a&&a.sortByCreated||!1),16777728&t.$$.dirty[0]&&y(n(0,j=w({channelId:r,type:"thread",sortByCreated:Q}))),1152&t.$$.dirty[0]&&n(25,W=o&&F(s)),37748992&t.$$.dirty[0]&&n(11,X=a&&(!a.teamOnly||W)&&!Y),256&t.$$.dirty[0]&&n(12,Z=a&&(a.description||V(a))||null),40&t.$$.dirty[0]&&J(),8192&t.$$.dirty[0]&&N(c)}),[j,M,z,G,R,q,U,s,a,r,o,X,Z,c,i,$,f,d,m,J,function(){n(3,G=!1)},K,Y,l,Q,W,t=>(K(),k(t)),function(t){n(1,M=t)},function(t){n(2,z=t)},function(t){n(5,q=t)}]}export default class extends t{constructor(t){super(),e(this,t,Ct,Ht,n,{},[-1,-1])}}