import{_ as n,a as t,b as o,c as r,i as c,s as i,d as a,S as f,F as u,y as e,O as s,j as l,G as $,z as d,A as m,B as p,g as h,I as v,h as g,P as y,t as N,Q as H,aD as b,aE as C,a4 as E,aF as D,aG as I,af as P,T as L,R as j,al as k,aH as w,aI as A,ac as O,aJ as x,ab as R,ad as _,aK as S,aL as T,a7 as B,aM as F,ah as M,aN as V,aO as G,J as z,K as J,L as K,M as Q,a1 as U,H as Z,D as q,f as W,aj as X,Z as Y,$ as nn,l as tn}from"./client.e555a21f.js";import{S as on}from"./Proxy.cb1a6ee2.js";import{C as rn}from"./ContentLoader.9e67bb28.js";import{N as cn}from"./postPlaceholder.22be8740.js";import"./Counter.0655879a.js";import{P as an}from"./PostItem.380a48fb.js";import"./post_like_selected.c79724df.js";function fn(n){var r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(n){return!1}}();return function(){var c,i=t(n);if(r){var a=t(this).constructor;c=Reflect.construct(i,arguments,a)}else c=i.apply(this,arguments);return o(this,c)}}function un(n,t,o){var r=n.slice();return r[19]=t[o],r}function en(n){var t,o=new on({props:{id:"channel",$$slots:{default:[bn],scrollHeader:[mn]},$$scope:{ctx:n}}});return{c:function(){z(o.$$.fragment)},l:function(n){J(o.$$.fragment,n)},m:function(n,r){K(o,n,r),t=!0},p:function(n,t){var r={};4202944&t&&(r.$$scope={dirty:t,ctx:n}),o.$set(r)},i:function(n){t||(N(o.$$.fragment,n),t=!0)},o:function(n){g(o.$$.fragment,n),t=!1},d:function(n){Q(o,n)}}}function sn(n){var t,o=new rn({props:{label:U.CHANNEL.NOT_FOUND}});return{c:function(){z(o.$$.fragment)},l:function(n){J(o.$$.fragment,n)},m:function(n,r){K(o,n,r),t=!0},p:j,i:function(n){t||(N(o.$$.fragment,n),t=!0)},o:function(n){g(o.$$.fragment,n),t=!1},d:function(n){Q(o,n)}}}function ln(n){var t,o=new rn({props:{label:U.LOADING.CHANNEL}});return{c:function(){z(o.$$.fragment)},l:function(n){J(o.$$.fragment,n)},m:function(n,r){K(o,n,r),t=!0},p:j,i:function(n){t||(N(o.$$.fragment,n),t=!0)},o:function(n){g(o.$$.fragment,n),t=!1},d:function(n){Q(o,n)}}}function $n(n){var t;return{c:function(){t=e("div"),this.h()},l:function(n){t=d(n,"DIV",{class:!0}),m(t).forEach(l),this.h()},h:function(){p(t,"class","channelHeader svelte-7kd43t"),Z(t,"channelHeaderPost",n[6])},m:function(o,r){h(o,t,r),t.innerHTML=n[7]},p:function(n,o){128&o&&(t.innerHTML=n[7]),64&o&&Z(t,"channelHeaderPost",n[6])},d:function(n){n&&l(t)}}}function dn(n){var t,o=new cn({props:{onClick:n[14],className:"newPostHeader"}});return{c:function(){z(o.$$.fragment)},l:function(n){J(o.$$.fragment,n)},m:function(n,r){K(o,n,r),t=!0},p:j,i:function(n){t||(N(o.$$.fragment,n),t=!0)},o:function(n){g(o.$$.fragment,n),t=!1},d:function(n){Q(o,n)}}}function mn(n){var t,o,r,c=n[7]&&$n(n),i=n[6]&&dn(n);return{c:function(){t=e("div"),c&&c.c(),o=u(),i&&i.c(),this.h()},l:function(n){t=d(n,"DIV",{slot:!0});var r=m(t);c&&c.l(r),o=$(r),i&&i.l(r),r.forEach(l),this.h()},h:function(){p(t,"slot","scrollHeader")},m:function(n,a){h(n,t,a),c&&c.m(t,null),q(t,o),i&&i.m(t,null),r=!0},p:function(n,r){n[7]?c?c.p(n,r):((c=$n(n)).c(),c.m(t,o)):c&&(c.d(1),c=null),n[6]?i?(i.p(n,r),64&r&&N(i,1)):((i=dn(n)).c(),N(i,1),i.m(t,null)):i&&(L(),g(i,1,1,function(){i=null}),y())},i:function(n){r||(N(i),r=!0)},o:function(n){g(i),r=!1},d:function(n){n&&l(t),c&&c.d(),i&&i.d()}}}function pn(n){var t,o,r,c,i=[vn,hn],a=[];function f(n,t){return!n[13]||n[8]&&n[8].length?1:0}return t=f(n),o=a[t]=i[t](n),{c:function(){o.c(),r=W()},l:function(n){o.l(n),r=W()},m:function(n,o){a[t].m(n,o),h(n,r,o),c=!0},p:function(n,c){var u=t;(t=f(n))===u?a[t].p(n,c):(L(),g(a[u],1,1,function(){a[u]=null}),y(),(o=a[t])||(o=a[t]=i[t](n)).c(),N(o,1),o.m(r.parentNode,r))},i:function(n){c||(N(o),c=!0)},o:function(n){g(o),c=!1},d:function(n){a[t].d(n),n&&l(r)}}}function hn(n){var t,o=new rn({props:{$$slots:{default:[yn]},$$scope:{ctx:n}}});return{c:function(){z(o.$$.fragment)},l:function(n){J(o.$$.fragment,n)},m:function(n,r){K(o,n,r),t=!0},p:function(n,t){var r={};4194368&t&&(r.$$scope={dirty:t,ctx:n}),o.$set(r)},i:function(n){t||(N(o.$$.fragment,n),t=!0)},o:function(n){g(o.$$.fragment,n),t=!1},d:function(n){Q(o,n)}}}function vn(n){var t,o=new rn({props:{label:U.LOADING.CHANNEL_ITEMS}});return{c:function(){z(o.$$.fragment)},l:function(n){J(o.$$.fragment,n)},m:function(n,r){K(o,n,r),t=!0},p:j,i:function(n){t||(N(o.$$.fragment,n),t=!0)},o:function(n){g(o.$$.fragment,n),t=!1},d:function(n){Q(o,n)}}}function gn(n){var t,o,r,c,i,a;return{c:function(){t=e("br"),o=Y("be the first to "),r=e("a"),c=Y("Add a Post"),this.h()},l:function(n){t=d(n,"BR",{}),o=nn(n,"be the first to "),r=d(n,"A",{href:!0});var i=m(r);c=nn(i,"Add a Post"),i.forEach(l),this.h()},h:function(){p(r,"href","/posts/new")},m:function(f,u){h(f,t,u),h(f,o,u),h(f,r,u),q(r,c),i||(a=tn(r,"click",n[18]),i=!0)},p:j,d:function(n){n&&l(t),n&&l(o),n&&l(r),i=!1,a()}}}function yn(n){var t,o,r,c=U.CHANNEL.NO_POSTS+"",i=n[6]&&gn(n);return{c:function(){t=Y(c),o=u(),i&&i.c(),r=u()},l:function(n){t=nn(n,c),o=$(n),i&&i.l(n),r=$(n)},m:function(n,c){h(n,t,c),h(n,o,c),i&&i.m(n,c),h(n,r,c)},p:function(n,t){n[6]?i?i.p(n,t):((i=gn(n)).c(),i.m(r.parentNode,r)):i&&(i.d(1),i=null)},d:function(n){n&&l(t),n&&l(o),i&&i.d(n),n&&l(r)}}}function Nn(n){var t,o=new an({props:{post:n[19]}});return{c:function(){z(o.$$.fragment)},l:function(n){J(o.$$.fragment,n)},m:function(n,r){K(o,n,r),t=!0},p:function(n,t){var r={};256&t&&(r.post=n[19]),o.$set(r)},i:function(n){t||(N(o.$$.fragment,n),t=!0)},o:function(n){g(o.$$.fragment,n),t=!1},d:function(n){Q(o,n)}}}function Hn(n){var t,o=new cn({props:{onClick:n[14]}});return{c:function(){z(o.$$.fragment)},l:function(n){J(o.$$.fragment,n)},m:function(n,r){K(o,n,r),t=!0},p:j,i:function(n){t||(N(o.$$.fragment,n),t=!0)},o:function(n){g(o.$$.fragment,n),t=!1},d:function(n){Q(o,n)}}}function bn(n){for(var t,o,r,c,i,a=n[8],f=[],s=0;s<a.length;s+=1)f[s]=Nn(un(n,a,s));var v=function(n){return g(f[n],1,1,function(){f[n]=null})},H=null;a.length||(H=pn(n));var b=n[6]&&n[8]&&n[8].length>=En&&Hn(n);return{c:function(){t=u(),o=e("div"),r=e("div");for(var n=0;n<f.length;n+=1)f[n].c();H&&H.c(),c=u(),b&&b.c(),this.h()},l:function(n){t=$(n),o=d(n,"DIV",{class:!0});var i=m(o);r=d(i,"DIV",{class:!0});for(var a=m(r),u=0;u<f.length;u+=1)f[u].l(a);H&&H.l(a),a.forEach(l),c=$(i),b&&b.l(i),i.forEach(l),this.h()},h:function(){p(r,"class","postsContainer svelte-7kd43t"),p(o,"class","content svelte-7kd43t")},m:function(n,a){h(n,t,a),h(n,o,a),q(o,r);for(var u=0;u<f.length;u+=1)f[u].m(r,null);H&&H.m(r,null),q(o,c),b&&b.m(o,null),i=!0},p:function(n,t){if(24896&t){var c;for(a=n[8],c=0;c<a.length;c+=1){var i=un(n,a,c);f[c]?(f[c].p(i,t),N(f[c],1)):(f[c]=Nn(i),f[c].c(),N(f[c],1),f[c].m(r,null))}for(L(),c=a.length;c<f.length;c+=1)v(c);y(),!a.length&&H?H.p(n,t):a.length?H&&(H.d(1),H=null):((H=pn(n)).c(),H.m(r,null))}n[6]&&n[8]&&n[8].length>=En?b?(b.p(n,t),320&t&&N(b,1)):((b=Hn(n)).c(),N(b,1),b.m(o,null)):b&&(L(),g(b,1,1,function(){b=null}),y())},i:function(n){if(!i){for(var t=0;t<a.length;t+=1)N(f[t]);N(b),i=!0}},o:function(n){f=f.filter(Boolean);for(var t=0;t<f.length;t+=1)g(f[t]);g(b),i=!1},d:function(n){n&&l(t),n&&l(o),X(f,n),H&&H.d(),b&&b.d()}}}function Cn(n){var t,o,r,c,i,a,f;document.title=t=n[1]+"Flock";var H=[ln,sn,en],b=[];function C(n,t){return 7740&t&&(c=!((!n[9]||n[3]&&n[3].id===n[4])&&P(n[5],n[10],n[11])&&(n[2]||!n[12]))),c?0:n[3]&&n[3].id?2:1}return i=C(n,-1),a=b[i]=H[i](n),{c:function(){o=u(),r=e("div"),a.c(),this.h()},l:function(n){s('[data-svelte="svelte-pjz2s7"]',document.head).forEach(l),o=$(n),r=d(n,"DIV",{class:!0});var t=m(r);a.l(t),t.forEach(l),this.h()},h:function(){p(r,"class","pageContent svelte-7kd43t")},m:function(n,t){h(n,o,t),h(n,r,t),b[i].m(r,null),f=!0},p:function(n,o){var c=v(o,1)[0];(!f||2&c)&&t!==(t=n[1]+"Flock")&&(document.title=t);var u=i;(i=C(n,c))===u?b[i].p(n,c):(L(),g(b[u],1,1,function(){b[u]=null}),y(),(a=b[i])||(a=b[i]=H[i](n)).c(),N(a,1),a.m(r,null))},i:function(n){f||(N(a),f=!0)},o:function(n){g(a),f=!1},d:function(n){n&&l(o),n&&l(r),b[i].d()}}}var En=6;function Dn(n,t,o){var r,c,i,a,f,u,e,s,l,$,d=j,m=function(){return d(),d=E(p,function(n){return o(8,f=n)}),p};H(n,k,function(n){return o(2,r=n)}),H(n,w,function(n){return o(3,c=n)}),H(n,A,function(n){return o(4,i=n)}),H(n,O,function(n){return o(5,a=n)}),H(n,x,function(n){return o(9,u=n)}),H(n,R,function(n){return o(10,e=n)}),H(n,_,function(n){return o(11,s=n)}),H(n,S,function(n){return o(12,l=n)}),H(n,T,function(n){return o(13,$=n)}),n.$$.on_destroy.push(function(){return d()}),b(),C();var p=B([]);function h(n){P&&F()}m();var v,g,y,N,P,L;return n.$$.update=function(){4&n.$$.dirty&&o(1,v=r&&r.title&&r.title+" - "||""),4&n.$$.dirty&&o(15,g=r&&r.archived||!1),8&n.$$.dirty&&o(16,y=c&&c.sortByCreated||!1),65552&n.$$.dirty&&m(o(0,p=D({channelId:i,type:"thread",sortByCreated:y}))),36&n.$$.dirty&&o(17,N=a&&V(r)),163848&n.$$.dirty&&o(6,P=c&&(!c.teamOnly||N)&&!g),8&n.$$.dirty&&o(7,L=c&&(c.description||G(c))||null),256&n.$$.dirty&&I(f)},[p,v,r,c,i,a,P,L,f,u,e,s,l,$,h,g,y,N,function(n){return h(),M(n)}]}export default(function(t){n(u,f);var o=fn(u);function u(n){var t;return r(this,u),t=o.call(this),c(a(t),n,Dn,Cn,i,{}),t}return u}());
