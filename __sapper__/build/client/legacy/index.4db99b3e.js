import{_ as n,a as t,b as o,c as r,i as c,s as i,d as e,S as u,F as a,y as f,J as s,O as l,j as $,G as d,z as p,A as h,K as m,B as v,g,L as w,I as j,t as y,h as S,M as b,Q as P,a4 as L,az as N,b3 as O,bB as x,bC as E,bD as I,w as R,aT as A,aU as C,f as D,T,P as _,R as M,bE as H,bF as B,bG as F,bH as V,aK as G,V as k,a7 as J,ag as W,ah as U,a1 as z,a2 as K,D as Q,Z,$ as q,x as X,E as Y,l as nn,a0 as tn}from"./client.e229b9da.js";import{S as on}from"./Proxy.828d0d07.js";import"./Hotspot.5c809319.js";import"./ContentPanel.9936b39d.js";import{C as rn}from"./ContentLoader.a887c96e.js";import"./Counter.8db356a4.js";import{S as cn}from"./SearchBar.69b8642b.js";import{P as en}from"./ProjectList.6f231ab8.js";import"./private.1409d27c.js";import{A as un}from"./add_project.82d4bda8.js";function an(n){var r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(n){return!1}}();return function(){var c,i=t(n);if(r){var e=t(this).constructor;c=Reflect.construct(i,arguments,e)}else c=i.apply(this,arguments);return o(this,c)}}function fn(n){var t,o,r;function c(t){n[23].call(null,t)}var i={};void 0!==n[4]&&(i.searchString=n[4]);var e=new cn({props:i});return R.push(function(){return A(e,"searchString",c)}),{c:function(){t=f("div"),s(e.$$.fragment),this.h()},l:function(n){t=p(n,"DIV",{slot:!0});var o=h(t);m(e.$$.fragment,o),o.forEach($),this.h()},h:function(){v(t,"slot","scrollHeader")},m:function(n,o){g(n,t,o),w(e,t,null),r=!0},p:function(n,t){var r={};!o&&16&t&&(o=!0,r.searchString=n[4],C(function(){return o=!1})),e.$set(r)},i:function(n){r||(y(e.$$.fragment,n),r=!0)},o:function(n){S(e.$$.fragment,n),r=!1},d:function(n){n&&$(t),b(e)}}}function sn(n){var t,o,r,c,i=new en({props:{title:"Projects",projects:n[14],searchString:n[3],showLastActive:!0,displayLimit:n[5]?0:yn,showMoreAction:n[7]?n[13]:n[11],forceShowMoreShow:n[7],showMoreLabel:n[7]?z.FOLLOWING_PROJECTS.BUTTON_ARCHIVED_PROJECTS:null,showIfNoProjects:!0,hideShowMoreWithVisibility:!0,showPrivateIcon:!0,$$slots:{default:[pn]},$$scope:{ctx:n}}}),e=new K({props:{className:"newProjectButton",onClick:W,icon:un,$$slots:{default:[hn]},$$scope:{ctx:n}}}),u=new en({props:{title:"Following",className:"followingProjects",projects:n[15],showLastActive:!0,displayLimit:n[6]?0:Sn,showMoreAction:n[12],searchString:n[3],showIfNoProjects:!0,showPrivateIcon:!0,$$slots:{default:[gn]},$$scope:{ctx:n}}});return{c:function(){t=f("div"),s(i.$$.fragment),o=a(),s(e.$$.fragment),r=a(),s(u.$$.fragment),this.h()},l:function(n){t=p(n,"DIV",{class:!0});var c=h(t);m(i.$$.fragment,c),o=d(c),m(e.$$.fragment,c),r=d(c),m(u.$$.fragment,c),c.forEach($),this.h()},h:function(){v(t,"class","projectsContent svelte-xddo5k")},m:function(n,a){g(n,t,a),w(i,t,null),Q(t,o),w(e,t,null),Q(t,r),w(u,t,null),c=!0},p:function(n,t){var o={};8&t&&(o.searchString=n[3]),32&t&&(o.displayLimit=n[5]?0:yn),128&t&&(o.showMoreAction=n[7]?n[13]:n[11]),128&t&&(o.forceShowMoreShow=n[7]),128&t&&(o.showMoreLabel=n[7]?z.FOLLOWING_PROJECTS.BUTTON_ARCHIVED_PROJECTS:null),33554440&t&&(o.$$scope={dirty:t,ctx:n}),i.$set(o);var r={};33554432&t&&(r.$$scope={dirty:t,ctx:n}),e.$set(r);var c={};64&t&&(c.displayLimit=n[6]?0:Sn),8&t&&(c.searchString=n[3]),33554440&t&&(c.$$scope={dirty:t,ctx:n}),u.$set(c)},i:function(n){c||(y(i.$$.fragment,n),y(e.$$.fragment,n),y(u.$$.fragment,n),c=!0)},o:function(n){S(i.$$.fragment,n),S(e.$$.fragment,n),S(u.$$.fragment,n),c=!1},d:function(n){n&&$(t),b(i),b(e),b(u)}}}function ln(n){var t,o=new rn({props:{label:z.LOADING.FOLLOWING}});return{c:function(){s(o.$$.fragment)},l:function(n){m(o.$$.fragment,n)},m:function(n,r){w(o,n,r),t=!0},p:M,i:function(n){t||(y(o.$$.fragment,n),t=!0)},o:function(n){S(o.$$.fragment,n),t=!1},d:function(n){b(o,n)}}}function $n(n){var t,o=n[22].default,r=X(o,n,n[25],null),c=r||function(n){var t,o,r,c,i,e,u;return{c:function(){t=Z("you have not shared any projects"),o=f("br"),r=Z("create a "),c=f("a"),i=Z("New Project"),this.h()},l:function(n){t=q(n,"you have not shared any projects"),o=p(n,"BR",{}),r=q(n,"create a "),c=p(n,"A",{href:!0});var e=h(c);i=q(e,"New Project"),e.forEach($),this.h()},h:function(){v(c,"href","/projects/new")},m:function(a,f){g(a,t,f),g(a,o,f),g(a,r,f),g(a,c,f),Q(c,i),e||(u=nn(c,"click",n[24]),e=!0)},p:M,d:function(n){n&&$(t),n&&$(o),n&&$(r),n&&$(c),e=!1,u()}}}(n);return{c:function(){c&&c.c()},l:function(n){c&&c.l(n)},m:function(n,o){c&&c.m(n,o),t=!0},p:function(n,t){r&&r.p&&33554432&t&&Y(r,o,n,n[25],t,null,null)},i:function(n){t||(y(c,n),t=!0)},o:function(n){S(c,n),t=!1},d:function(n){c&&c.d(n)}}}function dn(n){var t,o=n[22].default,r=X(o,n,n[25],null),c=r||function(n){var t,o,r;return{c:function(){t=Z('no projects found matching "'),o=Z(n[3]),r=Z('"')},l:function(c){t=q(c,'no projects found matching "'),o=q(c,n[3]),r=q(c,'"')},m:function(n,c){g(n,t,c),g(n,o,c),g(n,r,c)},p:function(n,t){8&t&&tn(o,n[3])},d:function(n){n&&$(t),n&&$(o),n&&$(r)}}}(n);return{c:function(){c&&c.c()},l:function(n){c&&c.l(n)},m:function(n,o){c&&c.m(n,o),t=!0},p:function(n,t){r?r.p&&33554432&t&&Y(r,o,n,n[25],t,null,null):c&&c.p&&8&t&&c.p(n,t)},i:function(n){t||(y(c,n),t=!0)},o:function(n){S(c,n),t=!1},d:function(n){c&&c.d(n)}}}function pn(n){var t,o,r,c,i=[dn,$n],e=[];function u(n,t){return n[3]?0:1}return t=u(n),o=e[t]=i[t](n),{c:function(){o.c(),r=D()},l:function(n){o.l(n),r=D()},m:function(n,o){e[t].m(n,o),g(n,r,o),c=!0},p:function(n,c){var a=t;(t=u(n))===a?e[t].p(n,c):(T(),S(e[a],1,1,function(){e[a]=null}),_(),(o=e[t])||(o=e[t]=i[t](n)).c(),y(o,1),o.m(r.parentNode,r))},i:function(n){c||(y(o),c=!0)},o:function(n){S(o),c=!1},d:function(n){e[t].d(n),n&&$(r)}}}function hn(n){var t;return{c:function(){t=Z("new project")},l:function(n){t=q(n,"new project")},m:function(n,o){g(n,t,o)},d:function(n){n&&$(t)}}}function mn(n){var t,o,r,c,i,e,u=n[22].default,a=X(u,n,n[25],null),s=a||{c:function(){o=Z("you aren't following any projects"),r=f("br"),c=f("a"),i=Z("Discover"),e=Z(" inspiring projects to follow"),this.h()},l:function(n){o=q(n,"you aren't following any projects"),r=p(n,"BR",{}),c=p(n,"A",{href:!0});var t=h(c);i=q(t,"Discover"),t.forEach($),e=q(n," inspiring projects to follow"),this.h()},h:function(){v(c,"href","discover")},m:function(n,t){g(n,o,t),g(n,r,t),g(n,c,t),Q(c,i),g(n,e,t)},d:function(n){n&&$(o),n&&$(r),n&&$(c),n&&$(e)}};return{c:function(){s&&s.c()},l:function(n){s&&s.l(n)},m:function(n,o){s&&s.m(n,o),t=!0},p:function(n,t){a&&a.p&&33554432&t&&Y(a,u,n,n[25],t,null,null)},i:function(n){t||(y(s,n),t=!0)},o:function(n){S(s,n),t=!1},d:function(n){s&&s.d(n)}}}function vn(n){var t,o=n[22].default,r=X(o,n,n[25],null),c=r||function(n){var t,o,r;return{c:function(){t=Z('no followed projects matching "'),o=Z(n[3]),r=Z('"')},l:function(c){t=q(c,'no followed projects matching "'),o=q(c,n[3]),r=q(c,'"')},m:function(n,c){g(n,t,c),g(n,o,c),g(n,r,c)},p:function(n,t){8&t&&tn(o,n[3])},d:function(n){n&&$(t),n&&$(o),n&&$(r)}}}(n);return{c:function(){c&&c.c()},l:function(n){c&&c.l(n)},m:function(n,o){c&&c.m(n,o),t=!0},p:function(n,t){r?r.p&&33554432&t&&Y(r,o,n,n[25],t,null,null):c&&c.p&&8&t&&c.p(n,t)},i:function(n){t||(y(c,n),t=!0)},o:function(n){S(c,n),t=!1},d:function(n){c&&c.d(n)}}}function gn(n){var t,o,r,c,i=[vn,mn],e=[];function u(n,t){return n[3]?0:1}return t=u(n),o=e[t]=i[t](n),{c:function(){o.c(),r=D()},l:function(n){o.l(n),r=D()},m:function(n,o){e[t].m(n,o),g(n,r,o),c=!0},p:function(n,c){var a=t;(t=u(n))===a?e[t].p(n,c):(T(),S(e[a],1,1,function(){e[a]=null}),_(),(o=e[t])||(o=e[t]=i[t](n)).c(),y(o,1),o.m(r.parentNode,r))},i:function(n){c||(y(o),c=!0)},o:function(n){S(o),c=!1},d:function(n){e[t].d(n),n&&$(r)}}}function wn(n){var t,o,r,c,i,e=[ln,sn],u=[];function f(n,t){return!n[10]||n[9]&&n[9].length||n[8]&&n[8].length?1:0}return o=f(n),r=u[o]=e[o](n),{c:function(){t=a(),r.c(),c=D()},l:function(n){t=d(n),r.l(n),c=D()},m:function(n,r){g(n,t,r),u[o].m(n,r),g(n,c,r),i=!0},p:function(n,t){var i=o;(o=f(n))===i?u[o].p(n,t):(T(),S(u[i],1,1,function(){u[i]=null}),_(),(r=u[o])||(r=u[o]=e[o](n)).c(),y(r,1),r.m(c.parentNode,c))},i:function(n){i||(y(r),i=!0)},o:function(n){S(r),i=!1},d:function(n){n&&$(t),u[o].d(n),n&&$(c)}}}function jn(n){var t,o,r,c=new on({props:{id:"projects",headerStartHidden:!0,headerHiddenOffset:45,hideHeaderShadowAtTop:!0,hideShadowMargin:45,$$slots:{default:[wn],scrollHeader:[fn]},$$scope:{ctx:n}}});return{c:function(){t=a(),o=f("div"),s(c.$$.fragment),this.h()},l:function(n){l('[data-svelte="svelte-1y4v7mn"]',document.head).forEach($),t=d(n),o=p(n,"DIV",{class:!0});var r=h(o);m(c.$$.fragment,r),r.forEach($),this.h()},h:function(){document.title="Flock",v(o,"class","content svelte-xddo5k")},m:function(n,i){g(n,t,i),g(n,o,i),w(c,o,null),r=!0},p:function(n,t){var o=j(t,1)[0],r={};33556472&o&&(r.$$scope={dirty:o,ctx:n}),c.$set(r)},i:function(n){r||(y(c.$$.fragment,n),r=!0)},o:function(n){S(c.$$.fragment,n),r=!1},d:function(n){n&&$(t),n&&$(o),b(c)}}}var yn=3,Sn=16;function bn(n,t,o){var r,c,i,e,u,a,f,s,l,$,d=M,p=function(){return d(),d=L(y,function(n){return o(19,u=n)}),y},h=M,m=function(){return h(),h=L(j,function(n){return o(8,a=n)}),j},v=M,g=function(){return v(),v=L(w,function(n){return o(9,s=n)}),w};P(n,H,function(n){return o(4,r=n)}),P(n,B,function(n){return o(5,c=n)}),P(n,F,function(n){return o(6,i=n)}),P(n,V,function(n){return o(16,e=n)}),P(n,G,function(n){return o(10,$=n)}),n.$$.on_destroy.push(function(){return d()}),n.$$.on_destroy.push(function(){return h()}),n.$$.on_destroy.push(function(){return v()});var w=J([]);g();var j=J([]);m();var y=J([]);p();var S=J([]);P(n,S,function(n){return o(20,f=n)});var b=J([]);P(n,b,function(n){return o(21,l=n)});var R=t.$$slots,A=void 0===R?{}:R,C=t.$$scope;var D,T,_,z;return n.$set=function(n){"$$scope"in n&&o(25,C=n.$$scope)},n.$$.update=function(){16&n.$$.dirty&&o(3,D=r),32&n.$$.dirty&&o(17,T=c?0:yn+1),64&n.$$.dirty&&o(18,_=i?0:Sn+1),131592&n.$$.dirty&&N(S,f=O(s,{searchString:D,limit:T})),1704224&n.$$.dirty&&o(7,z=u&&u.length&&(c||a&&f.length<T)),262408&n.$$.dirty&&N(b,l=O(a,{searchString:D,limit:_}))},g(o(0,w=x())),m(o(1,j=E())),p(o(2,y=I())),[w,j,y,D,r,c,i,z,a,s,$,function(){N(B,c=!0)},function(){N(F,i=!0)},function(){r&&N(V,e=r),k("projects/archive")},S,b,e,T,_,u,f,l,A,function(n){r=n,H.set(r)},function(n){return W(),U(n)},C]}export default(function(t){n(a,u);var o=an(a);function a(n){var t;return r(this,a),t=o.call(this),c(e(t),n,bn,jn,i,{}),t}return a}());
