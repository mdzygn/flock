import{_ as n,a as t,b as c,c as o,i,s as r,d as a,S as e,y as f,z as u,A as s,j as l,B as h,g as v,t as p,f as d,J as m,K as g,L as $,h as y,M as S,T as D,P as R,aj as T,I as L,a2 as N,Z as k,$ as x,D as I,a0 as j}from"./client.e555a21f.js";function w(n){var o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(n){return!1}}();return function(){var i,r=t(n);if(o){var a=t(this).constructor;i=Reflect.construct(r,arguments,a)}else i=r.apply(this,arguments);return c(this,i)}}function z(n,t,c){var o=n.slice();return o[3]=t[c],o[5]=c,o}function P(n){for(var t,c,o=n[1],i=[],r=0;r<o.length;r+=1)i[r]=C(z(n,o,r));var a=function(n){return y(i[n],1,1,function(){i[n]=null})};return{c:function(){t=f("div");for(var n=0;n<i.length;n+=1)i[n].c();this.h()},l:function(n){t=u(n,"DIV",{class:!0});for(var c=s(t),o=0;o<i.length;o+=1)i[o].l(c);c.forEach(l),this.h()},h:function(){h(t,"class","tagSet svelte-ouwm5z")},m:function(n,o){v(n,t,o);for(var r=0;r<i.length;r+=1)i[r].m(t,null);c=!0},p:function(n,c){if(7&c){var r;for(o=n[1],r=0;r<o.length;r+=1){var e=z(n,o,r);i[r]?(i[r].p(e,c),p(i[r],1)):(i[r]=C(e),i[r].c(),p(i[r],1),i[r].m(t,null))}for(D(),r=o.length;r<i.length;r+=1)a(r);R()}},i:function(n){if(!c){for(var t=0;t<o.length;t+=1)p(i[t]);c=!0}},o:function(n){i=i.filter(Boolean);for(var t=0;t<i.length;t+=1)y(i[t]);c=!1},d:function(n){n&&l(t),T(i,n)}}}function b(n){var t,c=new N({props:{className:"tag",href:n[0]?"discover?search="+encodeURIComponent(n[3]):"",$$slots:{default:[B]},$$scope:{ctx:n}}});return{c:function(){m(c.$$.fragment)},l:function(n){g(c.$$.fragment,n)},m:function(n,o){$(c,n,o),t=!0},p:function(n,t){var o={};3&t&&(o.href=n[0]?"discover?search="+encodeURIComponent(n[3]):""),70&t&&(o.$$scope={dirty:t,ctx:n}),c.$set(o)},i:function(n){t||(p(c.$$.fragment,n),t=!0)},o:function(n){y(c.$$.fragment,n),t=!1},d:function(n){S(c,n)}}}function A(n){var t,c;return{c:function(){t=f("span"),c=k(", "),this.h()},l:function(n){t=u(n,"SPAN",{class:!0});var o=s(t);c=x(o,", "),o.forEach(l),this.h()},h:function(){h(t,"class","invisibleSeparator svelte-ouwm5z")},m:function(n,o){v(n,t,o),I(t,c)},d:function(n){n&&l(t)}}}function B(n){var t,c,o=n[3]+"",i=n[5]<n[1].length-1&&(!n[2]||n[5]<n[2]-1)&&A();return{c:function(){t=k(o),i&&i.c(),c=d()},l:function(n){t=x(n,o),i&&i.l(n),c=d()},m:function(n,o){v(n,t,o),i&&i.m(n,o),v(n,c,o)},p:function(n,r){2&r&&o!==(o=n[3]+"")&&j(t,o),n[5]<n[1].length-1&&(!n[2]||n[5]<n[2]-1)?i||((i=A()).c(),i.m(c.parentNode,c)):i&&(i.d(1),i=null)},d:function(n){n&&l(t),i&&i.d(n),n&&l(c)}}}function C(n){var t,c,o=(!n[2]||n[5]<n[2])&&b(n);return{c:function(){o&&o.c(),t=d()},l:function(n){o&&o.l(n),t=d()},m:function(n,i){o&&o.m(n,i),v(n,t,i),c=!0},p:function(n,c){!n[2]||n[5]<n[2]?o?(o.p(n,c),4&c&&p(o,1)):((o=b(n)).c(),p(o,1),o.m(t.parentNode,t)):o&&(D(),y(o,1,1,function(){o=null}),R())},i:function(n){c||(p(o),c=!0)},o:function(n){y(o),c=!1},d:function(n){o&&o.d(n),n&&l(t)}}}function E(n){var t,c,o=n[1]&&P(n);return{c:function(){o&&o.c(),t=d()},l:function(n){o&&o.l(n),t=d()},m:function(n,i){o&&o.m(n,i),v(n,t,i),c=!0},p:function(n,c){var i=L(c,1)[0];n[1]?o?(o.p(n,i),2&i&&p(o,1)):((o=P(n)).c(),p(o,1),o.m(t.parentNode,t)):o&&(D(),y(o,1,1,function(){o=null}),R())},i:function(n){c||(p(o),c=!0)},o:function(n){y(o),c=!1},d:function(n){o&&o.d(n),n&&l(t)}}}function U(n,t,c){var o=t.linkToDiscoverSearch,i=void 0===o||o,r=t.tags,a=void 0===r?null:r,e=t.displayLimit,f=void 0===e?0:e;return n.$set=function(n){"linkToDiscoverSearch"in n&&c(0,i=n.linkToDiscoverSearch),"tags"in n&&c(1,a=n.tags),"displayLimit"in n&&c(2,f=n.displayLimit)},[i,a,f]}var J=function(t){n(f,e);var c=w(f);function f(n){var t;return o(this,f),t=c.call(this),i(a(t),n,U,E,r,{linkToDiscoverSearch:0,tags:1,displayLimit:2}),t}return f}();export{J as T};