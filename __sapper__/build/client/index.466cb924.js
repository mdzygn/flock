import{S as t,i as e,s as o,z as n,q as s,C as r,H as a,d as c,A as l,r as i,u as $,D as p,v as d,b as u,E as f,t as h,c as m,F as g,J as w,Y as j,ar as y,aX as v,br as S,bs as b,bt as L,n as N,aM as P,aN as x,e as C,L as I,I as O,K as A,bu as E,bv as M,bw as T,bx as _,aC as D,N as H,$ as R,a8 as V,a9 as B,V as F,W as k,x as J,R as W,T as G,p as U,y as q,l as z,U as K}from"./client.bfcc6923.js";import{S as X}from"./Proxy.ed17349e.js";import"./Hotspot.3e24c739.js";import"./ContentPanel.e03e13b8.js";import{C as Y}from"./ContentLoader.7e990154.js";import"./Counter.4471f26b.js";import{S as Q}from"./SearchBar.3a3bc3e0.js";import{P as Z}from"./ProjectList.3f40eb0c.js";import"./private.1409d27c.js";import{A as tt}from"./add_project.82d4bda8.js";function et(t){let e,o,n;function a(e){t[23].call(null,e)}let l={};void 0!==t[4]&&(l.searchString=t[4]);const w=new Q({props:l});return N.push(()=>P(w,"searchString",a)),{c(){e=s("div"),r(w.$$.fragment),this.h()},l(t){e=i(t,"DIV",{slot:!0});var o=$(e);p(w.$$.fragment,o),o.forEach(c),this.h()},h(){d(e,"slot","scrollHeader")},m(t,o){u(t,e,o),f(w,e,null),n=!0},p(t,e){const n={};!o&&16&e&&(o=!0,n.searchString=t[4],x(()=>o=!1)),w.$set(n)},i(t){n||(h(w.$$.fragment,t),n=!0)},o(t){m(w.$$.fragment,t),n=!1},d(t){t&&c(e),g(w)}}}function ot(t){let e,o,a,w;const j=new Z({props:{title:"Projects",projects:t[14],searchString:t[3],showLastActive:!0,displayLimit:t[5]?0:ut,showMoreAction:t[7]?t[13]:t[11],forceShowMoreShow:t[7],showMoreLabel:t[7]?F.FOLLOWING_PROJECTS.BUTTON_ARCHIVED_PROJECTS:null,showIfNoProjects:!0,hideShowMoreWithVisibility:!0,showPrivateIcon:!0,$$slots:{default:[at]},$$scope:{ctx:t}}}),y=new k({props:{className:"newProjectButton",onClick:V,icon:tt,$$slots:{default:[ct]},$$scope:{ctx:t}}}),v=new Z({props:{title:"Following",className:"followingProjects",projects:t[15],showLastActive:!0,displayLimit:t[6]?0:ft,showMoreAction:t[12],searchString:t[3],showIfNoProjects:!0,showPrivateIcon:!0,$$slots:{default:[$t]},$$scope:{ctx:t}}});return{c(){e=s("div"),r(j.$$.fragment),o=n(),r(y.$$.fragment),a=n(),r(v.$$.fragment),this.h()},l(t){e=i(t,"DIV",{class:!0});var n=$(e);p(j.$$.fragment,n),o=l(n),p(y.$$.fragment,n),a=l(n),p(v.$$.fragment,n),n.forEach(c),this.h()},h(){d(e,"class","projectsContent svelte-xddo5k")},m(t,n){u(t,e,n),f(j,e,null),J(e,o),f(y,e,null),J(e,a),f(v,e,null),w=!0},p(t,e){const o={};8&e&&(o.searchString=t[3]),32&e&&(o.displayLimit=t[5]?0:ut),128&e&&(o.showMoreAction=t[7]?t[13]:t[11]),128&e&&(o.forceShowMoreShow=t[7]),128&e&&(o.showMoreLabel=t[7]?F.FOLLOWING_PROJECTS.BUTTON_ARCHIVED_PROJECTS:null),33554440&e&&(o.$$scope={dirty:e,ctx:t}),j.$set(o);const n={};33554432&e&&(n.$$scope={dirty:e,ctx:t}),y.$set(n);const s={};64&e&&(s.displayLimit=t[6]?0:ft),8&e&&(s.searchString=t[3]),33554440&e&&(s.$$scope={dirty:e,ctx:t}),v.$set(s)},i(t){w||(h(j.$$.fragment,t),h(y.$$.fragment,t),h(v.$$.fragment,t),w=!0)},o(t){m(j.$$.fragment,t),m(y.$$.fragment,t),m(v.$$.fragment,t),w=!1},d(t){t&&c(e),g(j),g(y),g(v)}}}function nt(t){let e;const o=new Y({props:{label:F.LOADING.FOLLOWING}});return{c(){r(o.$$.fragment)},l(t){p(o.$$.fragment,t)},m(t,n){f(o,t,n),e=!0},p:A,i(t){e||(h(o.$$.fragment,t),e=!0)},o(t){m(o.$$.fragment,t),e=!1},d(t){g(o,t)}}}function st(t){let e;const o=t[22].default,n=U(o,t,t[25],null),r=n||function(t){let e,o,n,r,a,l,p;return{c(){e=W("you have not shared any projects"),o=s("br"),n=W("create a "),r=s("a"),a=W("New Project"),this.h()},l(t){e=G(t,"you have not shared any projects"),o=i(t,"BR",{}),n=G(t,"create a "),r=i(t,"A",{href:!0});var s=$(r);a=G(s,"New Project"),s.forEach(c),this.h()},h(){d(r,"href","/projects/new")},m(s,c){u(s,e,c),u(s,o,c),u(s,n,c),u(s,r,c),J(r,a),l||(p=z(r,"click",t[24]),l=!0)},p:A,d(t){t&&c(e),t&&c(o),t&&c(n),t&&c(r),l=!1,p()}}}(t);return{c(){r&&r.c()},l(t){r&&r.l(t)},m(t,o){r&&r.m(t,o),e=!0},p(t,e){n&&n.p&&33554432&e&&q(n,o,t,t[25],e,null,null)},i(t){e||(h(r,t),e=!0)},o(t){m(r,t),e=!1},d(t){r&&r.d(t)}}}function rt(t){let e;const o=t[22].default,n=U(o,t,t[25],null),s=n||function(t){let e,o,n;return{c(){e=W('no projects found matching "'),o=W(t[3]),n=W('"')},l(s){e=G(s,'no projects found matching "'),o=G(s,t[3]),n=G(s,'"')},m(t,s){u(t,e,s),u(t,o,s),u(t,n,s)},p(t,e){8&e&&K(o,t[3])},d(t){t&&c(e),t&&c(o),t&&c(n)}}}(t);return{c(){s&&s.c()},l(t){s&&s.l(t)},m(t,o){s&&s.m(t,o),e=!0},p(t,e){n?n.p&&33554432&e&&q(n,o,t,t[25],e,null,null):s&&s.p&&8&e&&s.p(t,e)},i(t){e||(h(s,t),e=!0)},o(t){m(s,t),e=!1},d(t){s&&s.d(t)}}}function at(t){let e,o,n,s;const r=[rt,st],a=[];function l(t,e){return t[3]?0:1}return e=l(t),o=a[e]=r[e](t),{c(){o.c(),n=C()},l(t){o.l(t),n=C()},m(t,o){a[e].m(t,o),u(t,n,o),s=!0},p(t,s){let c=e;(e=l(t))===c?a[e].p(t,s):(I(),m(a[c],1,1,()=>{a[c]=null}),O(),(o=a[e])||(o=a[e]=r[e](t)).c(),h(o,1),o.m(n.parentNode,n))},i(t){s||(h(o),s=!0)},o(t){m(o),s=!1},d(t){a[e].d(t),t&&c(n)}}}function ct(t){let e;return{c(){e=W("new project")},l(t){e=G(t,"new project")},m(t,o){u(t,e,o)},d(t){t&&c(e)}}}function lt(t){let e;const o=t[22].default,n=U(o,t,t[25],null),r=n||function(t){let e,o,n,r,a;return{c(){e=W("you aren't following any projects"),o=s("br"),n=s("a"),r=W("Discover"),a=W(" inspiring projects to follow"),this.h()},l(t){e=G(t,"you aren't following any projects"),o=i(t,"BR",{}),n=i(t,"A",{href:!0});var s=$(n);r=G(s,"Discover"),s.forEach(c),a=G(t," inspiring projects to follow"),this.h()},h(){d(n,"href","discover")},m(t,s){u(t,e,s),u(t,o,s),u(t,n,s),J(n,r),u(t,a,s)},d(t){t&&c(e),t&&c(o),t&&c(n),t&&c(a)}}}();return{c(){r&&r.c()},l(t){r&&r.l(t)},m(t,o){r&&r.m(t,o),e=!0},p(t,e){n&&n.p&&33554432&e&&q(n,o,t,t[25],e,null,null)},i(t){e||(h(r,t),e=!0)},o(t){m(r,t),e=!1},d(t){r&&r.d(t)}}}function it(t){let e;const o=t[22].default,n=U(o,t,t[25],null),s=n||function(t){let e,o,n;return{c(){e=W('no followed projects matching "'),o=W(t[3]),n=W('"')},l(s){e=G(s,'no followed projects matching "'),o=G(s,t[3]),n=G(s,'"')},m(t,s){u(t,e,s),u(t,o,s),u(t,n,s)},p(t,e){8&e&&K(o,t[3])},d(t){t&&c(e),t&&c(o),t&&c(n)}}}(t);return{c(){s&&s.c()},l(t){s&&s.l(t)},m(t,o){s&&s.m(t,o),e=!0},p(t,e){n?n.p&&33554432&e&&q(n,o,t,t[25],e,null,null):s&&s.p&&8&e&&s.p(t,e)},i(t){e||(h(s,t),e=!0)},o(t){m(s,t),e=!1},d(t){s&&s.d(t)}}}function $t(t){let e,o,n,s;const r=[it,lt],a=[];function l(t,e){return t[3]?0:1}return e=l(t),o=a[e]=r[e](t),{c(){o.c(),n=C()},l(t){o.l(t),n=C()},m(t,o){a[e].m(t,o),u(t,n,o),s=!0},p(t,s){let c=e;(e=l(t))===c?a[e].p(t,s):(I(),m(a[c],1,1,()=>{a[c]=null}),O(),(o=a[e])||(o=a[e]=r[e](t)).c(),h(o,1),o.m(n.parentNode,n))},i(t){s||(h(o),s=!0)},o(t){m(o),s=!1},d(t){a[e].d(t),t&&c(n)}}}function pt(t){let e,o,s,r,a;const i=[nt,ot],$=[];function p(t,e){return!t[10]||t[9]&&t[9].length||t[8]&&t[8].length?1:0}return o=p(t),s=$[o]=i[o](t),{c(){e=n(),s.c(),r=C()},l(t){e=l(t),s.l(t),r=C()},m(t,n){u(t,e,n),$[o].m(t,n),u(t,r,n),a=!0},p(t,e){let n=o;(o=p(t))===n?$[o].p(t,e):(I(),m($[n],1,1,()=>{$[n]=null}),O(),(s=$[o])||(s=$[o]=i[o](t)).c(),h(s,1),s.m(r.parentNode,r))},i(t){a||(h(s),a=!0)},o(t){m(s),a=!1},d(t){t&&c(e),$[o].d(t),t&&c(r)}}}function dt(t){let e,o,w;const j=new X({props:{id:"projects",headerStartHidden:!0,headerHiddenOffset:45,hideHeaderShadowAtTop:!0,hideShadowMargin:45,$$slots:{default:[pt],scrollHeader:[et]},$$scope:{ctx:t}}});return{c(){e=n(),o=s("div"),r(j.$$.fragment),this.h()},l(t){a('[data-svelte="svelte-1y4v7mn"]',document.head).forEach(c),e=l(t),o=i(t,"DIV",{class:!0});var n=$(o);p(j.$$.fragment,n),n.forEach(c),this.h()},h(){document.title="Flock",d(o,"class","content svelte-xddo5k")},m(t,n){u(t,e,n),u(t,o,n),f(j,o,null),w=!0},p(t,[e]){const o={};33556472&e&&(o.$$scope={dirty:e,ctx:t}),j.$set(o)},i(t){w||(h(j.$$.fragment,t),w=!0)},o(t){m(j.$$.fragment,t),w=!1},d(t){t&&c(e),t&&c(o),g(j)}}}const ut=3,ft=16;function ht(t,e,o){let n,s,r,a,c,l,i,$,p,d,u=A,f=()=>(u(),u=j(C,t=>o(19,c=t)),C),h=A,m=()=>(h(),h=j(x,t=>o(8,l=t)),x),g=A,N=()=>(g(),g=j(P,t=>o(9,$=t)),P);w(t,E,t=>o(4,n=t)),w(t,M,t=>o(5,s=t)),w(t,T,t=>o(6,r=t)),w(t,_,t=>o(16,a=t)),w(t,D,t=>o(10,d=t)),t.$$.on_destroy.push(()=>u()),t.$$.on_destroy.push(()=>h()),t.$$.on_destroy.push(()=>g());let P=R([]);N();let x=R([]);m();let C=R([]);f();let I=R([]);w(t,I,t=>o(20,i=t));let O=R([]);w(t,O,t=>o(21,p=t));let{$$slots:F={},$$scope:k}=e;let J,W,G,U;return t.$set=(t=>{"$$scope"in t&&o(25,k=t.$$scope)}),t.$$.update=(()=>{16&t.$$.dirty&&o(3,J=n),32&t.$$.dirty&&o(17,W=s?0:ut+1),64&t.$$.dirty&&o(18,G=r?0:ft+1),131592&t.$$.dirty&&y(I,i=v($,{searchString:J,limit:W})),1704224&t.$$.dirty&&o(7,U=c&&c.length&&(s||l&&i.length<W)),262408&t.$$.dirty&&y(O,p=v(l,{searchString:J,limit:G}))}),N(o(0,P=S())),m(o(1,x=b())),f(o(2,C=L())),[P,x,C,J,n,s,r,U,l,$,d,function(){y(M,s=!0)},function(){y(T,r=!0)},function(){n&&y(_,a=n),H("projects/archive")},I,O,a,W,G,c,i,p,F,function(t){n=t,E.set(n)},t=>(V(),B(t)),k]}export default class extends t{constructor(t){super(),e(this,t,ht,dt,o,{})}}
