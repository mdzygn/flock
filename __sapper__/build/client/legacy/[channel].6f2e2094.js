import{_ as n,a as t,b as o,c,i as r,s as f,d as i,S as a,F as u,y as e,O as s,j as l,G as $,z as d,A as m,B as p,g as h,I as v,h as g,P as y,t as N,Q as H,aD as C,aE as E,a4 as D,aF as I,aG as P,af as L,T as j,R as k,al as w,aH as A,aI as b,ac as O,aJ as x,ab as R,ad as _,aK as S,aL as T,a7 as B,aM as F,ah as M,aN as V,aO as G,J as z,K as J,L as K,M as Q,a1 as U,H as Z,D as q,f as W,aj as X,Z as Y,$ as nn,l as tn}from"./client.fcac0e39.js";import{S as on}from"./Proxy.4511851d.js";import{C as cn}from"./ContentLoader.010ca1db.js";import{N as rn}from"./postPlaceholder.ecee39af.js";import"./Counter.3f87ce19.js";import{P as fn}from"./PostItem.02e77cc5.js";import"./post_like_selected.c79724df.js";function an(n){var c=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(n){return!1}}();return function(){var r,f=t(n);if(c){var i=t(this).constructor;r=Reflect.construct(f,arguments,i)}else r=f.apply(this,arguments);return o(this,r)}}function un(n,t,o){var c=n.slice();return c[19]=t[o],c}function en(n){var t,o=new on({props:{id:"channel",$$slots:{default:[Cn],scrollHeader:[mn]},$$scope:{ctx:n}}});return{c:function(){z(o.$$.fragment)},l:function(n){J(o.$$.fragment,n)},m:function(n,c){K(o,n,c),t=!0},p:function(n,t){var c={};4202944&t&&(c.$$scope={dirty:t,ctx:n}),o.$set(c)},i:function(n){t||(N(o.$$.fragment,n),t=!0)},o:function(n){g(o.$$.fragment,n),t=!1},d:function(n){Q(o,n)}}}function sn(n){var t,o=new cn({props:{label:U.CHANNEL.NOT_FOUND}});return{c:function(){z(o.$$.fragment)},l:function(n){J(o.$$.fragment,n)},m:function(n,c){K(o,n,c),t=!0},p:k,i:function(n){t||(N(o.$$.fragment,n),t=!0)},o:function(n){g(o.$$.fragment,n),t=!1},d:function(n){Q(o,n)}}}function ln(n){var t,o=new cn({props:{label:U.LOADING.CHANNEL}});return{c:function(){z(o.$$.fragment)},l:function(n){J(o.$$.fragment,n)},m:function(n,c){K(o,n,c),t=!0},p:k,i:function(n){t||(N(o.$$.fragment,n),t=!0)},o:function(n){g(o.$$.fragment,n),t=!1},d:function(n){Q(o,n)}}}function $n(n){var t;return{c:function(){t=e("div"),this.h()},l:function(n){t=d(n,"DIV",{class:!0}),m(t).forEach(l),this.h()},h:function(){p(t,"class","channelHeader svelte-7kd43t"),Z(t,"channelHeaderPost",n[6])},m:function(o,c){h(o,t,c),t.innerHTML=n[7]},p:function(n,o){128&o&&(t.innerHTML=n[7]),64&o&&Z(t,"channelHeaderPost",n[6])},d:function(n){n&&l(t)}}}function dn(n){var t,o=new rn({props:{onClick:n[14],className:"newPostHeader"}});return{c:function(){z(o.$$.fragment)},l:function(n){J(o.$$.fragment,n)},m:function(n,c){K(o,n,c),t=!0},p:k,i:function(n){t||(N(o.$$.fragment,n),t=!0)},o:function(n){g(o.$$.fragment,n),t=!1},d:function(n){Q(o,n)}}}function mn(n){var t,o,c,r=n[7]&&$n(n),f=n[6]&&dn(n);return{c:function(){t=e("div"),r&&r.c(),o=u(),f&&f.c(),this.h()},l:function(n){t=d(n,"DIV",{slot:!0});var c=m(t);r&&r.l(c),o=$(c),f&&f.l(c),c.forEach(l),this.h()},h:function(){p(t,"slot","scrollHeader")},m:function(n,i){h(n,t,i),r&&r.m(t,null),q(t,o),f&&f.m(t,null),c=!0},p:function(n,c){n[7]?r?r.p(n,c):((r=$n(n)).c(),r.m(t,o)):r&&(r.d(1),r=null),n[6]?f?(f.p(n,c),64&c&&N(f,1)):((f=dn(n)).c(),N(f,1),f.m(t,null)):f&&(j(),g(f,1,1,function(){f=null}),y())},i:function(n){c||(N(f),c=!0)},o:function(n){g(f),c=!1},d:function(n){n&&l(t),r&&r.d(),f&&f.d()}}}function pn(n){var t,o,c,r,f=[vn,hn],i=[];function a(n,t){return!n[13]||n[8]&&n[8].length?1:0}return t=a(n),o=i[t]=f[t](n),{c:function(){o.c(),c=W()},l:function(n){o.l(n),c=W()},m:function(n,o){i[t].m(n,o),h(n,c,o),r=!0},p:function(n,r){var u=t;(t=a(n))===u?i[t].p(n,r):(j(),g(i[u],1,1,function(){i[u]=null}),y(),(o=i[t])||(o=i[t]=f[t](n)).c(),N(o,1),o.m(c.parentNode,c))},i:function(n){r||(N(o),r=!0)},o:function(n){g(o),r=!1},d:function(n){i[t].d(n),n&&l(c)}}}function hn(n){var t,o=new cn({props:{$$slots:{default:[yn]},$$scope:{ctx:n}}});return{c:function(){z(o.$$.fragment)},l:function(n){J(o.$$.fragment,n)},m:function(n,c){K(o,n,c),t=!0},p:function(n,t){var c={};4194368&t&&(c.$$scope={dirty:t,ctx:n}),o.$set(c)},i:function(n){t||(N(o.$$.fragment,n),t=!0)},o:function(n){g(o.$$.fragment,n),t=!1},d:function(n){Q(o,n)}}}function vn(n){var t,o=new cn({props:{label:U.LOADING.CHANNEL_ITEMS}});return{c:function(){z(o.$$.fragment)},l:function(n){J(o.$$.fragment,n)},m:function(n,c){K(o,n,c),t=!0},p:k,i:function(n){t||(N(o.$$.fragment,n),t=!0)},o:function(n){g(o.$$.fragment,n),t=!1},d:function(n){Q(o,n)}}}function gn(n){var t,o,c,r,f,i;return{c:function(){t=e("br"),o=Y("be the first to "),c=e("a"),r=Y("Add a Post"),this.h()},l:function(n){t=d(n,"BR",{}),o=nn(n,"be the first to "),c=d(n,"A",{href:!0});var f=m(c);r=nn(f,"Add a Post"),f.forEach(l),this.h()},h:function(){p(c,"href","/posts/new")},m:function(a,u){h(a,t,u),h(a,o,u),h(a,c,u),q(c,r),f||(i=tn(c,"click",n[18]),f=!0)},p:k,d:function(n){n&&l(t),n&&l(o),n&&l(c),f=!1,i()}}}function yn(n){var t,o,c,r=U.CHANNEL.NO_POSTS+"",f=n[6]&&gn(n);return{c:function(){t=Y(r),o=u(),f&&f.c(),c=u()},l:function(n){t=nn(n,r),o=$(n),f&&f.l(n),c=$(n)},m:function(n,r){h(n,t,r),h(n,o,r),f&&f.m(n,r),h(n,c,r)},p:function(n,t){n[6]?f?f.p(n,t):((f=gn(n)).c(),f.m(c.parentNode,c)):f&&(f.d(1),f=null)},d:function(n){n&&l(t),n&&l(o),f&&f.d(n),n&&l(c)}}}function Nn(n){var t,o=new fn({props:{post:n[19]}});return{c:function(){z(o.$$.fragment)},l:function(n){J(o.$$.fragment,n)},m:function(n,c){K(o,n,c),t=!0},p:function(n,t){var c={};256&t&&(c.post=n[19]),o.$set(c)},i:function(n){t||(N(o.$$.fragment,n),t=!0)},o:function(n){g(o.$$.fragment,n),t=!1},d:function(n){Q(o,n)}}}function Hn(n){var t,o=new rn({props:{onClick:n[14]}});return{c:function(){z(o.$$.fragment)},l:function(n){J(o.$$.fragment,n)},m:function(n,c){K(o,n,c),t=!0},p:k,i:function(n){t||(N(o.$$.fragment,n),t=!0)},o:function(n){g(o.$$.fragment,n),t=!1},d:function(n){Q(o,n)}}}function Cn(n){for(var t,o,c,r,f,i=n[8],a=[],s=0;s<i.length;s+=1)a[s]=Nn(un(n,i,s));var v=function(n){return g(a[n],1,1,function(){a[n]=null})},H=null;i.length||(H=pn(n));var C=n[6]&&n[8]&&n[8].length>=Dn&&Hn(n);return{c:function(){t=u(),o=e("div"),c=e("div");for(var n=0;n<a.length;n+=1)a[n].c();H&&H.c(),r=u(),C&&C.c(),this.h()},l:function(n){t=$(n),o=d(n,"DIV",{class:!0});var f=m(o);c=d(f,"DIV",{class:!0});for(var i=m(c),u=0;u<a.length;u+=1)a[u].l(i);H&&H.l(i),i.forEach(l),r=$(f),C&&C.l(f),f.forEach(l),this.h()},h:function(){p(c,"class","postsContainer svelte-7kd43t"),p(o,"class","content svelte-7kd43t")},m:function(n,i){h(n,t,i),h(n,o,i),q(o,c);for(var u=0;u<a.length;u+=1)a[u].m(c,null);H&&H.m(c,null),q(o,r),C&&C.m(o,null),f=!0},p:function(n,t){if(24896&t){var r;for(i=n[8],r=0;r<i.length;r+=1){var f=un(n,i,r);a[r]?(a[r].p(f,t),N(a[r],1)):(a[r]=Nn(f),a[r].c(),N(a[r],1),a[r].m(c,null))}for(j(),r=i.length;r<a.length;r+=1)v(r);y(),!i.length&&H?H.p(n,t):i.length?H&&(H.d(1),H=null):((H=pn(n)).c(),H.m(c,null))}n[6]&&n[8]&&n[8].length>=Dn?C?(C.p(n,t),320&t&&N(C,1)):((C=Hn(n)).c(),N(C,1),C.m(o,null)):C&&(j(),g(C,1,1,function(){C=null}),y())},i:function(n){if(!f){for(var t=0;t<i.length;t+=1)N(a[t]);N(C),f=!0}},o:function(n){a=a.filter(Boolean);for(var t=0;t<a.length;t+=1)g(a[t]);g(C),f=!1},d:function(n){n&&l(t),n&&l(o),X(a,n),H&&H.d(),C&&C.d()}}}function En(n){var t,o,c,r,f,i,a;document.title=t=n[1]+"Flock";var H=[ln,sn,en],C=[];function E(n,t){return 7740&t&&(r=!((!n[9]||n[3]&&n[3].id===n[4])&&L(n[5],n[10],n[11])&&(n[2]||!n[12]))),r?0:n[3]&&n[3].id?2:1}return f=E(n,-1),i=C[f]=H[f](n),{c:function(){o=u(),c=e("div"),i.c(),this.h()},l:function(n){s('[data-svelte="svelte-pjz2s7"]',document.head).forEach(l),o=$(n),c=d(n,"DIV",{class:!0});var t=m(c);i.l(t),t.forEach(l),this.h()},h:function(){p(c,"class","pageContent svelte-7kd43t")},m:function(n,t){h(n,o,t),h(n,c,t),C[f].m(c,null),a=!0},p:function(n,o){var r=v(o,1)[0];(!a||2&r)&&t!==(t=n[1]+"Flock")&&(document.title=t);var u=f;(f=E(n,r))===u?C[f].p(n,r):(j(),g(C[u],1,1,function(){C[u]=null}),y(),(i=C[f])||(i=C[f]=H[f](n)).c(),N(i,1),i.m(c,null))},i:function(n){a||(N(i),a=!0)},o:function(n){g(i),a=!1},d:function(n){n&&l(o),n&&l(c),C[f].d()}}}var Dn=6;function In(n,t,o){var c,r,f,i,a,u,e,s,l,$,d=k,m=function(){return d(),d=D(p,function(n){return o(8,a=n)}),p};H(n,w,function(n){return o(2,c=n)}),H(n,A,function(n){return o(3,r=n)}),H(n,b,function(n){return o(4,f=n)}),H(n,O,function(n){return o(5,i=n)}),H(n,x,function(n){return o(9,u=n)}),H(n,R,function(n){return o(10,e=n)}),H(n,_,function(n){return o(11,s=n)}),H(n,S,function(n){return o(12,l=n)}),H(n,T,function(n){return o(13,$=n)}),n.$$.on_destroy.push(function(){return d()}),C(),E();var p=B([]);function h(n){L&&F()}m();var v,g,y,N,L,j;return n.$$.update=function(){4&n.$$.dirty&&o(1,v=c&&c.title&&c.title+" - "||""),4&n.$$.dirty&&o(15,g=c&&c.archived||!1),8&n.$$.dirty&&o(16,y=r&&r.sortByCreated||!1),65552&n.$$.dirty&&m(o(0,p=I({channelId:f,type:"thread",sortByCreated:y}))),36&n.$$.dirty&&o(17,N=i&&V(c)),163848&n.$$.dirty&&o(6,L=r&&(!r.teamOnly||N)&&!g),8&n.$$.dirty&&o(7,j=r&&(r.description||G(r))||null),256&n.$$.dirty&&P(a)},[p,v,c,r,f,i,L,j,a,u,e,s,l,$,h,g,y,N,function(n){return h(),M(n)}]}export default(function(t){n(u,a);var o=an(u);function u(n){var t;return c(this,u),t=o.call(this),r(i(t),n,In,En,f,{}),t}return u}());
