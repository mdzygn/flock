import{_ as n,a as t,b as o,c,i as r,s as i,d as f,S as u,F as a,y as e,O as s,j as l,G as $,z as d,A as m,B as p,g as h,I as v,h as g,P as y,t as N,Q as H,aD as C,aE as E,a4 as D,aF as I,aG as P,af as b,T as L,R as j,al as k,aH as w,aI as A,ac as O,aJ as x,ab as R,ad as _,aK as S,aL as T,a7 as B,aM as F,ah as M,aN as V,aO as G,J as z,K as J,L as K,M as Q,a1 as U,H as Z,D as q,f as W,aj as X,Z as Y,$ as nn,l as tn}from"./client.df10a313.js";import{S as on}from"./Proxy.73497552.js";import{C as cn}from"./ContentLoader.28cb11bc.js";import{N as rn}from"./postPlaceholder.7b63ee41.js";import"./Counter.a0f269c2.js";import{P as fn}from"./PostItem.5ed99d94.js";import"./post_like_selected.c79724df.js";function un(n){var c=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(n){return!1}}();return function(){var r,i=t(n);if(c){var f=t(this).constructor;r=Reflect.construct(i,arguments,f)}else r=i.apply(this,arguments);return o(this,r)}}function an(n,t,o){var c=n.slice();return c[19]=t[o],c}function en(n){var t,o=new on({props:{id:"channel",$$slots:{default:[Cn],scrollHeader:[mn]},$$scope:{ctx:n}}});return{c:function(){z(o.$$.fragment)},l:function(n){J(o.$$.fragment,n)},m:function(n,c){K(o,n,c),t=!0},p:function(n,t){var c={};4202944&t&&(c.$$scope={dirty:t,ctx:n}),o.$set(c)},i:function(n){t||(N(o.$$.fragment,n),t=!0)},o:function(n){g(o.$$.fragment,n),t=!1},d:function(n){Q(o,n)}}}function sn(n){var t,o=new cn({props:{label:U.CHANNEL.NOT_FOUND}});return{c:function(){z(o.$$.fragment)},l:function(n){J(o.$$.fragment,n)},m:function(n,c){K(o,n,c),t=!0},p:j,i:function(n){t||(N(o.$$.fragment,n),t=!0)},o:function(n){g(o.$$.fragment,n),t=!1},d:function(n){Q(o,n)}}}function ln(n){var t,o=new cn({props:{label:U.LOADING.CHANNEL}});return{c:function(){z(o.$$.fragment)},l:function(n){J(o.$$.fragment,n)},m:function(n,c){K(o,n,c),t=!0},p:j,i:function(n){t||(N(o.$$.fragment,n),t=!0)},o:function(n){g(o.$$.fragment,n),t=!1},d:function(n){Q(o,n)}}}function $n(n){var t;return{c:function(){t=e("div"),this.h()},l:function(n){t=d(n,"DIV",{class:!0}),m(t).forEach(l),this.h()},h:function(){p(t,"class","channelHeader svelte-7kd43t"),Z(t,"channelHeaderPost",n[6])},m:function(o,c){h(o,t,c),t.innerHTML=n[7]},p:function(n,o){128&o&&(t.innerHTML=n[7]),64&o&&Z(t,"channelHeaderPost",n[6])},d:function(n){n&&l(t)}}}function dn(n){var t,o=new rn({props:{onClick:n[14],className:"newPostHeader"}});return{c:function(){z(o.$$.fragment)},l:function(n){J(o.$$.fragment,n)},m:function(n,c){K(o,n,c),t=!0},p:j,i:function(n){t||(N(o.$$.fragment,n),t=!0)},o:function(n){g(o.$$.fragment,n),t=!1},d:function(n){Q(o,n)}}}function mn(n){var t,o,c,r=n[7]&&$n(n),i=n[6]&&dn(n);return{c:function(){t=e("div"),r&&r.c(),o=a(),i&&i.c(),this.h()},l:function(n){t=d(n,"DIV",{slot:!0});var c=m(t);r&&r.l(c),o=$(c),i&&i.l(c),c.forEach(l),this.h()},h:function(){p(t,"slot","scrollHeader")},m:function(n,f){h(n,t,f),r&&r.m(t,null),q(t,o),i&&i.m(t,null),c=!0},p:function(n,c){n[7]?r?r.p(n,c):((r=$n(n)).c(),r.m(t,o)):r&&(r.d(1),r=null),n[6]?i?(i.p(n,c),64&c&&N(i,1)):((i=dn(n)).c(),N(i,1),i.m(t,null)):i&&(L(),g(i,1,1,function(){i=null}),y())},i:function(n){c||(N(i),c=!0)},o:function(n){g(i),c=!1},d:function(n){n&&l(t),r&&r.d(),i&&i.d()}}}function pn(n){var t,o,c,r,i=[vn,hn],f=[];function u(n,t){return!n[13]||n[8]&&n[8].length?1:0}return t=u(n),o=f[t]=i[t](n),{c:function(){o.c(),c=W()},l:function(n){o.l(n),c=W()},m:function(n,o){f[t].m(n,o),h(n,c,o),r=!0},p:function(n,r){var a=t;(t=u(n))===a?f[t].p(n,r):(L(),g(f[a],1,1,function(){f[a]=null}),y(),(o=f[t])||(o=f[t]=i[t](n)).c(),N(o,1),o.m(c.parentNode,c))},i:function(n){r||(N(o),r=!0)},o:function(n){g(o),r=!1},d:function(n){f[t].d(n),n&&l(c)}}}function hn(n){var t,o=new cn({props:{$$slots:{default:[yn]},$$scope:{ctx:n}}});return{c:function(){z(o.$$.fragment)},l:function(n){J(o.$$.fragment,n)},m:function(n,c){K(o,n,c),t=!0},p:function(n,t){var c={};4194368&t&&(c.$$scope={dirty:t,ctx:n}),o.$set(c)},i:function(n){t||(N(o.$$.fragment,n),t=!0)},o:function(n){g(o.$$.fragment,n),t=!1},d:function(n){Q(o,n)}}}function vn(n){var t,o=new cn({props:{label:U.LOADING.CHANNEL_ITEMS}});return{c:function(){z(o.$$.fragment)},l:function(n){J(o.$$.fragment,n)},m:function(n,c){K(o,n,c),t=!0},p:j,i:function(n){t||(N(o.$$.fragment,n),t=!0)},o:function(n){g(o.$$.fragment,n),t=!1},d:function(n){Q(o,n)}}}function gn(n){var t,o,c,r,i,f;return{c:function(){t=e("br"),o=Y("be the first to "),c=e("a"),r=Y("Add a Post"),this.h()},l:function(n){t=d(n,"BR",{}),o=nn(n,"be the first to "),c=d(n,"A",{href:!0});var i=m(c);r=nn(i,"Add a Post"),i.forEach(l),this.h()},h:function(){p(c,"href","/posts/new")},m:function(u,a){h(u,t,a),h(u,o,a),h(u,c,a),q(c,r),i||(f=tn(c,"click",n[18]),i=!0)},p:j,d:function(n){n&&l(t),n&&l(o),n&&l(c),i=!1,f()}}}function yn(n){var t,o,c,r=U.CHANNEL.NO_POSTS+"",i=n[6]&&gn(n);return{c:function(){t=Y(r),o=a(),i&&i.c(),c=a()},l:function(n){t=nn(n,r),o=$(n),i&&i.l(n),c=$(n)},m:function(n,r){h(n,t,r),h(n,o,r),i&&i.m(n,r),h(n,c,r)},p:function(n,t){n[6]?i?i.p(n,t):((i=gn(n)).c(),i.m(c.parentNode,c)):i&&(i.d(1),i=null)},d:function(n){n&&l(t),n&&l(o),i&&i.d(n),n&&l(c)}}}function Nn(n){var t,o=new fn({props:{post:n[19]}});return{c:function(){z(o.$$.fragment)},l:function(n){J(o.$$.fragment,n)},m:function(n,c){K(o,n,c),t=!0},p:function(n,t){var c={};256&t&&(c.post=n[19]),o.$set(c)},i:function(n){t||(N(o.$$.fragment,n),t=!0)},o:function(n){g(o.$$.fragment,n),t=!1},d:function(n){Q(o,n)}}}function Hn(n){var t,o=new rn({props:{onClick:n[14]}});return{c:function(){z(o.$$.fragment)},l:function(n){J(o.$$.fragment,n)},m:function(n,c){K(o,n,c),t=!0},p:j,i:function(n){t||(N(o.$$.fragment,n),t=!0)},o:function(n){g(o.$$.fragment,n),t=!1},d:function(n){Q(o,n)}}}function Cn(n){for(var t,o,c,r,i,f=n[8],u=[],s=0;s<f.length;s+=1)u[s]=Nn(an(n,f,s));var v=function(n){return g(u[n],1,1,function(){u[n]=null})},H=null;f.length||(H=pn(n));var C=n[6]&&n[8]&&n[8].length>=Dn&&Hn(n);return{c:function(){t=a(),o=e("div"),c=e("div");for(var n=0;n<u.length;n+=1)u[n].c();H&&H.c(),r=a(),C&&C.c(),this.h()},l:function(n){t=$(n),o=d(n,"DIV",{class:!0});var i=m(o);c=d(i,"DIV",{class:!0});for(var f=m(c),a=0;a<u.length;a+=1)u[a].l(f);H&&H.l(f),f.forEach(l),r=$(i),C&&C.l(i),i.forEach(l),this.h()},h:function(){p(c,"class","postsContainer svelte-7kd43t"),p(o,"class","content svelte-7kd43t")},m:function(n,f){h(n,t,f),h(n,o,f),q(o,c);for(var a=0;a<u.length;a+=1)u[a].m(c,null);H&&H.m(c,null),q(o,r),C&&C.m(o,null),i=!0},p:function(n,t){if(24896&t){var r;for(f=n[8],r=0;r<f.length;r+=1){var i=an(n,f,r);u[r]?(u[r].p(i,t),N(u[r],1)):(u[r]=Nn(i),u[r].c(),N(u[r],1),u[r].m(c,null))}for(L(),r=f.length;r<u.length;r+=1)v(r);y(),!f.length&&H?H.p(n,t):f.length?H&&(H.d(1),H=null):((H=pn(n)).c(),H.m(c,null))}n[6]&&n[8]&&n[8].length>=Dn?C?(C.p(n,t),320&t&&N(C,1)):((C=Hn(n)).c(),N(C,1),C.m(o,null)):C&&(L(),g(C,1,1,function(){C=null}),y())},i:function(n){if(!i){for(var t=0;t<f.length;t+=1)N(u[t]);N(C),i=!0}},o:function(n){u=u.filter(Boolean);for(var t=0;t<u.length;t+=1)g(u[t]);g(C),i=!1},d:function(n){n&&l(t),n&&l(o),X(u,n),H&&H.d(),C&&C.d()}}}function En(n){var t,o,c,r,i,f,u;document.title=t=n[1]+"Flock";var H=[ln,sn,en],C=[];function E(n,t){return 7740&t&&(r=!((!n[9]||n[3]&&n[3].id===n[4])&&b(n[5],n[10],n[11])&&(n[2]||!n[12]))),r?0:n[3]&&n[3].id?2:1}return i=E(n,-1),f=C[i]=H[i](n),{c:function(){o=a(),c=e("div"),f.c(),this.h()},l:function(n){s('[data-svelte="svelte-pjz2s7"]',document.head).forEach(l),o=$(n),c=d(n,"DIV",{class:!0});var t=m(c);f.l(t),t.forEach(l),this.h()},h:function(){p(c,"class","pageContent svelte-7kd43t")},m:function(n,t){h(n,o,t),h(n,c,t),C[i].m(c,null),u=!0},p:function(n,o){var r=v(o,1)[0];(!u||2&r)&&t!==(t=n[1]+"Flock")&&(document.title=t);var a=i;(i=E(n,r))===a?C[i].p(n,r):(L(),g(C[a],1,1,function(){C[a]=null}),y(),(f=C[i])||(f=C[i]=H[i](n)).c(),N(f,1),f.m(c,null))},i:function(n){u||(N(f),u=!0)},o:function(n){g(f),u=!1},d:function(n){n&&l(o),n&&l(c),C[i].d()}}}var Dn=6;function In(n,t,o){var c,r,i,f,u,a,e,s,l,$,d=j,m=function(){return d(),d=D(p,function(n){return o(8,u=n)}),p};H(n,k,function(n){return o(2,c=n)}),H(n,w,function(n){return o(3,r=n)}),H(n,A,function(n){return o(4,i=n)}),H(n,O,function(n){return o(5,f=n)}),H(n,x,function(n){return o(9,a=n)}),H(n,R,function(n){return o(10,e=n)}),H(n,_,function(n){return o(11,s=n)}),H(n,S,function(n){return o(12,l=n)}),H(n,T,function(n){return o(13,$=n)}),n.$$.on_destroy.push(function(){return d()}),C(),E();var p=B([]);function h(n){b&&F()}m();var v,g,y,N,b,L;return n.$$.update=function(){4&n.$$.dirty&&o(1,v=c&&c.title&&c.title+" - "||""),4&n.$$.dirty&&o(15,g=c&&c.archived||!1),8&n.$$.dirty&&o(16,y=r&&r.sortByCreated||!1),65552&n.$$.dirty&&m(o(0,p=I({channelId:i,type:"thread",sortByCreated:y}))),36&n.$$.dirty&&o(17,N=f&&V(c)),163848&n.$$.dirty&&o(6,b=r&&(!r.teamOnly||N)&&!g),8&n.$$.dirty&&o(7,L=r&&(r.description||G(r))||null),256&n.$$.dirty&&P(u)},[p,v,c,r,i,f,b,L,u,a,e,s,l,$,h,g,y,N,function(n){return h(),M(n)}]}export default(function(t){n(a,u);var o=un(a);function a(n){var t;return c(this,a),t=o.call(this),r(f(t),n,In,En,i,{}),t}return a}());
