import{S as t,i as e,s as o,n,e as s,p as r,c as a,q as c,g as l,h as i,r as $,u as d,a as p,v as u,j as f,m as h,t as m,b as g,d as w,l as j,Q as v,an as y,aU as S,bp as b,bq as L,br as N,aI as P,aJ as I,aK as O,f as x,y as A,k as C,x as E,bs as M,bt as _,bu as H,bv as T,ay as D,A as R,U as k,M as B,N as F,a2 as J,w as V,H as G,I as U,K as W,L as q,F as K,J as Q}from"./client.70f714b9.js";import"./Hotspot.d06cbe31.js";import"./ContentPanel.352fa8dd.js";import{C as z}from"./ContentLoader.ceeb8367.js";import"./Counter.ff914223.js";import{S as X}from"./SearchBar.e83e32fa.js";import{P as Y}from"./ProjectList.d41b96db.js";import"./private.1409d27c.js";import{A as Z}from"./add_project.82d4bda8.js";function tt(t){let e,o,n;function s(e){t[23].call(null,e)}let c={};void 0!==t[4]&&(c.searchString=t[4]);const i=new X({props:c});return P.push(()=>I(i,"searchString",s)),{c(){e=r("div"),a(i.$$.fragment),this.h()},l(t){e=$(t,"DIV",{slot:!0});var o=d(e);p(i.$$.fragment,o),o.forEach(l),this.h()},h(){u(e,"slot","scrollHeader")},m(t,o){f(t,e,o),h(i,e,null),n=!0},p(t,e){const n={};!o&&16&e&&(o=!0,n.searchString=t[4],O(()=>o=!1)),i.$set(n)},i(t){n||(m(i.$$.fragment,t),n=!0)},o(t){g(i.$$.fragment,t),n=!1},d(t){t&&l(e),w(i)}}}function et(t){let e,o,n,c;const j=new Y({props:{title:"Projects",projects:t[14],searchString:t[3],showLastActive:!0,displayLimit:t[5]?0:pt,showMoreAction:t[7]?t[13]:t[11],forceShowMoreShow:t[7],showMoreLabel:t[7]?B.FOLLOWING_PROJECTS.BUTTON_ARCHIVED_PROJECTS:null,showIfNoProjects:!0,hideShowMoreWithVisibility:!0,showPrivateIcon:!0,$$slots:{default:[rt]},$$scope:{ctx:t}}}),v=new F({props:{className:"newProjectButton",onClick:J,icon:Z,$$slots:{default:[at]},$$scope:{ctx:t}}}),y=new Y({props:{title:"Following",className:"followingProjects",projects:t[15],showLastActive:!0,displayLimit:t[6]?0:ut,showMoreAction:t[12],searchString:t[3],showIfNoProjects:!0,showPrivateIcon:!0,$$slots:{default:[it]},$$scope:{ctx:t}}});return{c(){e=r("div"),a(j.$$.fragment),o=s(),a(v.$$.fragment),n=s(),a(y.$$.fragment),this.h()},l(t){e=$(t,"DIV",{class:!0});var s=d(e);p(j.$$.fragment,s),o=i(s),p(v.$$.fragment,s),n=i(s),p(y.$$.fragment,s),s.forEach(l),this.h()},h(){u(e,"class","projectsContent svelte-xddo5k")},m(t,s){f(t,e,s),h(j,e,null),V(e,o),h(v,e,null),V(e,n),h(y,e,null),c=!0},p(t,e){const o={};8&e&&(o.searchString=t[3]),32&e&&(o.displayLimit=t[5]?0:pt),128&e&&(o.showMoreAction=t[7]?t[13]:t[11]),128&e&&(o.forceShowMoreShow=t[7]),128&e&&(o.showMoreLabel=t[7]?B.FOLLOWING_PROJECTS.BUTTON_ARCHIVED_PROJECTS:null),16777224&e&&(o.$$scope={dirty:e,ctx:t}),j.$set(o);const n={};16777216&e&&(n.$$scope={dirty:e,ctx:t}),v.$set(n);const s={};64&e&&(s.displayLimit=t[6]?0:ut),8&e&&(s.searchString=t[3]),16777224&e&&(s.$$scope={dirty:e,ctx:t}),y.$set(s)},i(t){c||(m(j.$$.fragment,t),m(v.$$.fragment,t),m(y.$$.fragment,t),c=!0)},o(t){g(j.$$.fragment,t),g(v.$$.fragment,t),g(y.$$.fragment,t),c=!1},d(t){t&&l(e),w(j),w(v),w(y)}}}function ot(t){let e;const o=new z({props:{label:B.LOADING.FOLLOWING}});return{c(){a(o.$$.fragment)},l(t){p(o.$$.fragment,t)},m(t,n){h(o,t,n),e=!0},p:E,i(t){e||(m(o.$$.fragment,t),e=!0)},o(t){g(o.$$.fragment,t),e=!1},d(t){w(o,t)}}}function nt(t){let e;const o=t[22].default,n=W(o,t,t[24],null),s=n||function(t){let e,o,n,s,a,c,i;return{c(){e=G("you have not shared any projects"),o=r("br"),n=G("create a "),s=r("a"),a=G("New Project"),this.h()},l(t){e=U(t,"you have not shared any projects"),o=$(t,"BR",{}),n=U(t,"create a "),s=$(t,"A",{href:!0});var r=d(s);a=U(r,"New Project"),r.forEach(l),this.h()},h(){u(s,"href","javascript:void(0)")},m(t,r){f(t,e,r),f(t,o,r),f(t,n,r),f(t,s,r),V(s,a),c||(i=K(s,"click",J),c=!0)},p:E,d(t){t&&l(e),t&&l(o),t&&l(n),t&&l(s),c=!1,i()}}}();return{c(){s&&s.c()},l(t){s&&s.l(t)},m(t,o){s&&s.m(t,o),e=!0},p(t,e){n&&n.p&&16777216&e&&q(n,o,t,t[24],e,null,null)},i(t){e||(m(s,t),e=!0)},o(t){g(s,t),e=!1},d(t){s&&s.d(t)}}}function st(t){let e;const o=t[22].default,n=W(o,t,t[24],null),s=n||function(t){let e,o,n;return{c(){e=G('no projects found matching "'),o=G(t[3]),n=G('"')},l(s){e=U(s,'no projects found matching "'),o=U(s,t[3]),n=U(s,'"')},m(t,s){f(t,e,s),f(t,o,s),f(t,n,s)},p(t,e){8&e&&Q(o,t[3])},d(t){t&&l(e),t&&l(o),t&&l(n)}}}(t);return{c(){s&&s.c()},l(t){s&&s.l(t)},m(t,o){s&&s.m(t,o),e=!0},p(t,e){n?n.p&&16777216&e&&q(n,o,t,t[24],e,null,null):s&&s.p&&8&e&&s.p(t,e)},i(t){e||(m(s,t),e=!0)},o(t){g(s,t),e=!1},d(t){s&&s.d(t)}}}function rt(t){let e,o,n,s;const r=[st,nt],a=[];function c(t,e){return t[3]?0:1}return e=c(t),o=a[e]=r[e](t),{c(){o.c(),n=x()},l(t){o.l(t),n=x()},m(t,o){a[e].m(t,o),f(t,n,o),s=!0},p(t,s){let l=e;(e=c(t))===l?a[e].p(t,s):(A(),g(a[l],1,1,()=>{a[l]=null}),C(),(o=a[e])||(o=a[e]=r[e](t)).c(),m(o,1),o.m(n.parentNode,n))},i(t){s||(m(o),s=!0)},o(t){g(o),s=!1},d(t){a[e].d(t),t&&l(n)}}}function at(t){let e;return{c(){e=G("new project")},l(t){e=U(t,"new project")},m(t,o){f(t,e,o)},d(t){t&&l(e)}}}function ct(t){let e;const o=t[22].default,n=W(o,t,t[24],null),s=n||function(t){let e,o,n,s,a;return{c(){e=G("you aren't following any projects"),o=r("br"),n=r("a"),s=G("Discover"),a=G(" inspiring projects to follow"),this.h()},l(t){e=U(t,"you aren't following any projects"),o=$(t,"BR",{}),n=$(t,"A",{href:!0});var r=d(n);s=U(r,"Discover"),r.forEach(l),a=U(t," inspiring projects to follow"),this.h()},h(){u(n,"href","discover")},m(t,r){f(t,e,r),f(t,o,r),f(t,n,r),V(n,s),f(t,a,r)},d(t){t&&l(e),t&&l(o),t&&l(n),t&&l(a)}}}();return{c(){s&&s.c()},l(t){s&&s.l(t)},m(t,o){s&&s.m(t,o),e=!0},p(t,e){n&&n.p&&16777216&e&&q(n,o,t,t[24],e,null,null)},i(t){e||(m(s,t),e=!0)},o(t){g(s,t),e=!1},d(t){s&&s.d(t)}}}function lt(t){let e;const o=t[22].default,n=W(o,t,t[24],null),s=n||function(t){let e,o,n;return{c(){e=G('no followed projects matching "'),o=G(t[3]),n=G('"')},l(s){e=U(s,'no followed projects matching "'),o=U(s,t[3]),n=U(s,'"')},m(t,s){f(t,e,s),f(t,o,s),f(t,n,s)},p(t,e){8&e&&Q(o,t[3])},d(t){t&&l(e),t&&l(o),t&&l(n)}}}(t);return{c(){s&&s.c()},l(t){s&&s.l(t)},m(t,o){s&&s.m(t,o),e=!0},p(t,e){n?n.p&&16777216&e&&q(n,o,t,t[24],e,null,null):s&&s.p&&8&e&&s.p(t,e)},i(t){e||(m(s,t),e=!0)},o(t){g(s,t),e=!1},d(t){s&&s.d(t)}}}function it(t){let e,o,n,s;const r=[lt,ct],a=[];function c(t,e){return t[3]?0:1}return e=c(t),o=a[e]=r[e](t),{c(){o.c(),n=x()},l(t){o.l(t),n=x()},m(t,o){a[e].m(t,o),f(t,n,o),s=!0},p(t,s){let l=e;(e=c(t))===l?a[e].p(t,s):(A(),g(a[l],1,1,()=>{a[l]=null}),C(),(o=a[e])||(o=a[e]=r[e](t)).c(),m(o,1),o.m(n.parentNode,n))},i(t){s||(m(o),s=!0)},o(t){g(o),s=!1},d(t){a[e].d(t),t&&l(n)}}}function $t(t){let e,o,n,r,a;const c=[ot,et],$=[];function d(t,e){return!t[10]||t[9]&&t[9].length||t[8]&&t[8].length?1:0}return o=d(t),n=$[o]=c[o](t),{c(){e=s(),n.c(),r=x()},l(t){e=i(t),n.l(t),r=x()},m(t,n){f(t,e,n),$[o].m(t,n),f(t,r,n),a=!0},p(t,e){let s=o;(o=d(t))===s?$[o].p(t,e):(A(),g($[s],1,1,()=>{$[s]=null}),C(),(n=$[o])||(n=$[o]=c[o](t)).c(),m(n,1),n.m(r.parentNode,r))},i(t){a||(m(n),a=!0)},o(t){g(n),a=!1},d(t){t&&l(e),$[o].d(t),t&&l(r)}}}function dt(t){let e,o,j;const v=new n({props:{id:"projects",headerStartHidden:!0,headerHiddenOffset:45,hideHeaderShadowAtTop:!0,hideShadowMargin:45,$$slots:{default:[$t],scrollHeader:[tt]},$$scope:{ctx:t}}});return{c(){e=s(),o=r("div"),a(v.$$.fragment),this.h()},l(t){c('[data-svelte="svelte-1y4v7mn"]',document.head).forEach(l),e=i(t),o=$(t,"DIV",{class:!0});var n=d(o);p(v.$$.fragment,n),n.forEach(l),this.h()},h(){document.title="Flock",u(o,"class","content svelte-xddo5k")},m(t,n){f(t,e,n),f(t,o,n),h(v,o,null),j=!0},p(t,[e]){const o={};16779256&e&&(o.$$scope={dirty:e,ctx:t}),v.$set(o)},i(t){j||(m(v.$$.fragment,t),j=!0)},o(t){g(v.$$.fragment,t),j=!1},d(t){t&&l(e),t&&l(o),w(v)}}}const pt=3,ut=16;function ft(t,e,o){let n,s,r,a,c,l,i,$,d,p,u=E,f=()=>(u(),u=v(O,t=>o(19,c=t)),O),h=E,m=()=>(h(),h=v(I,t=>o(8,l=t)),I),g=E,w=()=>(g(),g=v(P,t=>o(9,$=t)),P);j(t,M,t=>o(4,n=t)),j(t,_,t=>o(5,s=t)),j(t,H,t=>o(6,r=t)),j(t,T,t=>o(16,a=t)),j(t,D,t=>o(10,p=t)),t.$$.on_destroy.push(()=>u()),t.$$.on_destroy.push(()=>h()),t.$$.on_destroy.push(()=>g());let P=k([]);w();let I=k([]);m();let O=k([]);f();let x=k([]);j(t,x,t=>o(20,i=t));let A=k([]);j(t,A,t=>o(21,d=t));let C,B,F,J,{$$slots:V={},$$scope:G}=e;return t.$set=(t=>{"$$scope"in t&&o(24,G=t.$$scope)}),t.$$.update=(()=>{16&t.$$.dirty&&o(3,C=n),32&t.$$.dirty&&o(17,B=s?0:pt+1),64&t.$$.dirty&&o(18,F=r?0:ut+1),131592&t.$$.dirty&&y(x,i=S($,{searchString:C,limit:B})),1704224&t.$$.dirty&&o(7,J=c&&c.length&&(s||l&&i.length<B)),262408&t.$$.dirty&&y(A,d=S(l,{searchString:C,limit:F}))}),w(o(0,P=b())),m(o(1,I=L())),f(o(2,O=N())),[P,I,O,C,n,s,r,J,l,$,p,function(){y(_,s=!0)},function(){y(H,r=!0)},function(){n&&y(T,a=n),R("projects/archive")},x,A,a,B,F,c,i,d,V,function(t){n=t,M.set(n)},G]}export default class extends t{constructor(t){super(),e(this,t,ft,dt,o,{})}}
