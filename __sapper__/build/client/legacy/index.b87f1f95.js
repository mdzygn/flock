import{_ as n,a as t,b as r,c as e,i as a,s as c,d as o,S as i,a2 as s,y as u,z as f,A as l,l as v,B as $,o as h,e as d,j as p,P as m,f as y,n as g,Q as R,b8 as E,m as I,C as D,N,p as j,R as b,t as V,g as S,h as w,u as A,a4 as C,Y as O,an as P,b9 as _,Z as x,ba as L,$ as T,a0 as k,D as B,aM as M,al as G,E as H,r as q,bb as z,a5 as F,a6 as Q,bc as W,a8 as X,aa as Y,k as Z,ab as J,V as K,w as U,q as nn}from"./client.5cc92f90.js";import"./Hotspot.602a43bb.js";import"./ContentPanel.e1b4f1b3.js";import{C as tn}from"./ContentLoader.990f6b92.js";function rn(n){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(n){return!1}}();return function(){var a,c=t(n);if(e){var o=t(this).constructor;a=Reflect.construct(c,arguments,o)}else a=c.apply(this,arguments);return r(this,a)}}function en(n){var t;return{c:function(){t=u("div"),this.h()},l:function(n){t=f(n,"DIV",{class:!0}),l(t).forEach(v),this.h()},h:function(){$(t,"class","unseenIcon svelte-7jfayp")},m:function(n,r){h(n,t,r)},d:function(n){n&&v(t)}}}function an(n){var t,r,e,a,c,o,i,A,C,O,P,_,x,L,T,k,B=new s({props:{user:n[4],useThumb:!0}}),M=!n[2]&&en();return{c:function(){t=u("div"),d(B.$$.fragment),r=p(),e=u("div"),a=u("div"),c=u("div"),o=m(n[5]),i=p(),A=u("div"),O=u("span"),P=m(n[3]),_=p(),x=u("div"),M&&M.c(),this.h()},l:function(s){t=f(s,"DIV",{class:!0});var u=l(t);y(B.$$.fragment,u),r=g(u),e=f(u,"DIV",{class:!0});var $=l(e);a=f($,"DIV",{class:!0});var h=l(a);c=f(h,"DIV",{class:!0});var d=l(c);o=R(d,n[5]),d.forEach(v),i=g(h),A=f(h,"DIV",{class:!0});var p=l(A);O=f(p,"SPAN",{class:!0});var m=l(O);P=R(m,n[3]),m.forEach(v),p.forEach(v),h.forEach(v),$.forEach(v),_=g(u),x=f(u,"DIV",{class:!0});var E=l(x);M&&M.l(E),E.forEach(v),u.forEach(v),this.h()},h:function(){$(c,"class","title svelte-7jfayp"),C=new E(O),$(O,"class","dateString svelte-7jfayp"),$(A,"class","message svelte-7jfayp"),$(a,"class","detailInnerContent svelte-7jfayp"),$(e,"class","detailContent svelte-7jfayp"),$(x,"class","info svelte-7jfayp"),$(t,"class","conversationListItem svelte-7jfayp")},m:function(s,u){h(s,t,u),I(B,t,null),D(t,r),D(t,e),D(e,a),D(a,c),D(c,o),D(a,i),D(a,A),C.m(n[1],A),D(A,O),D(O,P),D(t,_),D(t,x),M&&M.m(x,null),L=!0,T||(k=N(t,"click",n[6]),T=!0)},p:function(n,t){var r=j(t,1)[0],e={};16&r&&(e.user=n[4]),B.$set(e),(!L||32&r)&&b(o,n[5]),(!L||2&r)&&C.p(n[1]),(!L||8&r)&&b(P,n[3]),n[2]?M&&(M.d(1),M=null):M||((M=en()).c(),M.m(x,null))},i:function(n){L||(V(B.$$.fragment,n),L=!0)},o:function(n){S(B.$$.fragment,n),L=!1},d:function(n){n&&v(t),w(B),M&&M.d(),T=!1,k()}}}function cn(n,t,r){var e,a,c,o=B,i=function(){return o(),o=O(N,function(n){return r(8,e=n)}),N},s=B;A(n,C,function(n){return r(13,a=n)}),n.$$.on_destroy.push(function(){return o()}),n.$$.on_destroy.push(function(){return s()});var u,f,l,v,$,h,d,p,m,y,g,R,E,I,D,N=t.conversation;return i(),n.$set=function(n){"conversation"in n&&i(r(0,N=n.conversation))},n.$$.update=function(){256&n.$$.dirty&&r(7,u=e&&e.title||""),256&n.$$.dirty&&r(9,f=e&&e.lastSenderId||null),256&n.$$.dirty&&r(10,l=e&&e.lastMessageText||""),1024&n.$$.dirty&&r(11,v=l&&P(l,{disallowLinks:!0,collapseBreaks:!0})),10752&n.$$.dirty&&r(12,$=v&&(f===a?"you: "+v:v)),4096&n.$$.dirty&&r(14,h=$&&_($,G.CONVERSATION_MAX_PREVIEW_LENGTH)),16384&n.$$.dirty&&r(1,d=h||"(image)"),256&n.$$.dirty&&(p=e&&e.id||null),256&n.$$.dirty&&(e&&e.projectId||null),256&n.$$.dirty&&r(2,m=!e||e.viewed),256&n.$$.dirty&&r(17,y=e&&e.lastMessageAt||null),131072&n.$$.dirty&&r(3,g=y&&" - "+x(y)||""),256&n.$$.dirty&&r(18,R=e&&L(e)||null),393216&n.$$.dirty&&(r(4,E=R&&y&&T(R,y)||k(null)),s(),s=O(E,function(n){return r(20,c=n)})),1310720&n.$$.dirty&&r(19,I=c&&c.name||R&&R.name||""),524416&n.$$.dirty&&r(5,D=u||I||"")},[N,d,m,g,E,D,function(){p&&M(p)}]}var on=function(t){n(s,i);var r=rn(s);function s(n){var t;return e(this,s),t=r.call(this),a(o(t),n,cn,an,c,{conversation:0}),t}return s}();function sn(n){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(n){return!1}}();return function(){var a,c=t(n);if(e){var o=t(this).constructor;a=Reflect.construct(c,arguments,o)}else a=c.apply(this,arguments);return r(this,a)}}function un(n,t,r){var e=n.slice();return e[8]=t[r],e}function fn(n){var t,r,e,a,c,o,i,s,d,y,E,I,j,b,V=K.CONVERSATIONS.NO_CONVERSATIONS+"";return{c:function(){t=u("div"),r=m(V),e=u("br"),a=u("br"),c=p(),o=u("a"),i=m("Discover"),s=m(" inspiring projects to get involved with"),d=u("br"),y=m("or create a "),E=u("a"),I=m("New Project"),this.h()},l:function(n){t=f(n,"DIV",{class:!0});var u=l(t);r=R(u,V),e=f(u,"BR",{}),a=f(u,"BR",{}),c=g(u),o=f(u,"A",{href:!0});var $=l(o);i=R($,"Discover"),$.forEach(v),s=R(u," inspiring projects to get involved with"),d=f(u,"BR",{}),y=R(u,"or create a "),E=f(u,"A",{href:!0});var h=l(E);I=R(h,"New Project"),h.forEach(v),u.forEach(v),this.h()},h:function(){$(o,"href","discover"),$(E,"href","javascript:void(0)"),$(t,"class","noConversations svelte-pui8gu")},m:function(n,u){h(n,t,u),D(t,r),D(t,e),D(t,a),D(t,c),D(t,o),D(o,i),D(t,s),D(t,d),D(t,y),D(t,E),D(E,I),j||(b=N(E,"click",Y),j=!0)},p:B,i:B,o:B,d:function(n){n&&v(t),j=!1,b()}}}function ln(n){for(var t,r,e=n[3],a=[],c=0;c<e.length;c+=1)a[c]=$n(un(n,e,c));var o=function(n){return S(a[n],1,1,function(){a[n]=null})};return{c:function(){for(var n=0;n<a.length;n+=1)a[n].c();t=Z()},l:function(n){for(var r=0;r<a.length;r+=1)a[r].l(n);t=Z()},m:function(n,e){for(var c=0;c<a.length;c+=1)a[c].m(n,e);h(n,t,e),r=!0},p:function(n,r){if(8&r){var c;for(e=n[3],c=0;c<e.length;c+=1){var i=un(n,e,c);a[c]?(a[c].p(i,r),V(a[c],1)):(a[c]=$n(i),a[c].c(),V(a[c],1),a[c].m(t.parentNode,t))}for(H(),c=e.length;c<a.length;c+=1)o(c);q()}},i:function(n){if(!r){for(var t=0;t<e.length;t+=1)V(a[t]);r=!0}},o:function(n){a=a.filter(Boolean);for(var t=0;t<a.length;t+=1)S(a[t]);r=!1},d:function(n){J(a,n),n&&v(t)}}}function vn(n){var t,r=new tn({props:{label:K.LOADING.CONVERSATIONS}});return{c:function(){d(r.$$.fragment)},l:function(n){y(r.$$.fragment,n)},m:function(n,e){I(r,n,e),t=!0},p:B,i:function(n){t||(V(r.$$.fragment,n),t=!0)},o:function(n){S(r.$$.fragment,n),t=!1},d:function(n){w(r,n)}}}function $n(n){var t,r=new on({props:{conversation:n[8]}});return{c:function(){d(r.$$.fragment)},l:function(n){y(r.$$.fragment,n)},m:function(n,e){I(r,n,e),t=!0},p:function(n,t){var e={};8&t&&(e.conversation=n[8]),r.$set(e)},i:function(n){t||(V(r.$$.fragment,n),t=!0)},o:function(n){S(r.$$.fragment,n),t=!1},d:function(n){w(r,n)}}}function hn(n){var t,r,e,a,c,o,i=[vn,ln,fn],s=[];function d(n,t){return 116&t&&(r=!(!n[2]&&X(n[5],n[4],n[6]))),r?0:n[3]&&n[3].length?1:2}return e=d(n,-1),a=s[e]=i[e](n),{c:function(){t=u("div"),a.c(),this.h()},l:function(n){t=f(n,"DIV",{class:!0});var r=l(t);a.l(r),r.forEach(v),this.h()},h:function(){$(t,"class",c="conversationList "+n[0]+" svelte-pui8gu")},m:function(n,r){h(n,t,r),s[e].m(t,null),o=!0},p:function(n,r){var u=j(r,1)[0],f=e;(e=d(n,u))===f?s[e].p(n,u):(H(),S(s[f],1,1,function(){s[f]=null}),q(),(a=s[e])||(a=s[e]=i[e](n)).c(),V(a,1),a.m(t,null)),(!o||1&u&&c!==(c="conversationList "+n[0]+" svelte-pui8gu"))&&$(t,"class",c)},i:function(n){o||(V(a),o=!0)},o:function(n){S(a),o=!1},d:function(n){n&&v(t),s[e].d()}}}function dn(n,t,r){var e,a,c,o,i,s=B,u=function(){return s(),s=O(f,function(n){return r(3,a=n)}),f};A(n,z,function(n){return r(7,e=n)}),A(n,C,function(n){return r(4,c=n)}),A(n,F,function(n){return r(5,o=n)}),A(n,Q,function(n){return r(6,i=n)}),n.$$.on_destroy.push(function(){return s()});var f=k(null);u();var l,v=t.className,$=void 0===v?"":v;return n.$set=function(n){"className"in n&&r(0,$=n.className)},n.$$.update=function(){136&n.$$.dirty&&r(2,l=e&&!a),16&n.$$.dirty&&u(r(1,f=W({userId:c})))},[$,f,l,a,c,o,i]}var pn=function(t){n(s,i);var r=sn(s);function s(n){var t;return e(this,s),t=r.call(this),a(o(t),n,dn,hn,c,{className:0}),t}return s}();function mn(n){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(n){return!1}}();return function(){var a,c=t(n);if(e){var o=t(this).constructor;a=Reflect.construct(c,arguments,o)}else a=c.apply(this,arguments);return r(this,a)}}function yn(n){var t,r=new pn({});return{c:function(){d(r.$$.fragment)},l:function(n){y(r.$$.fragment,n)},m:function(n,e){I(r,n,e),t=!0},i:function(n){t||(V(r.$$.fragment,n),t=!0)},o:function(n){S(r.$$.fragment,n),t=!1},d:function(n){w(r,n)}}}function gn(n){var t,r,e,a=new U({props:{id:"messages",$$slots:{default:[yn]},$$scope:{ctx:n}}});return{c:function(){t=p(),r=u("div"),d(a.$$.fragment),this.h()},l:function(n){nn('[data-svelte="svelte-1y4v7mn"]',document.head).forEach(v),t=g(n),r=f(n,"DIV",{class:!0});var e=l(r);y(a.$$.fragment,e),e.forEach(v),this.h()},h:function(){document.title="Flock",$(r,"class","content")},m:function(n,c){h(n,t,c),h(n,r,c),I(a,r,null),e=!0},p:function(n,t){var r=j(t,1)[0],e={};1&r&&(e.$$scope={dirty:r,ctx:n}),a.$set(e)},i:function(n){e||(V(a.$$.fragment,n),e=!0)},o:function(n){S(a.$$.fragment,n),e=!1},d:function(n){n&&v(t),n&&v(r),w(a)}}}export default(function(t){n(s,i);var r=mn(s);function s(n){var t;return e(this,s),t=r.call(this),a(o(t),n,null,gn,c,{}),t}return s}());