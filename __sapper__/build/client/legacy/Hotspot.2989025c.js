import{_ as t,a as n,b as c,c as i,i as s,s as o,d as r,S as e,f,g as u,I as a,R as l,j as h,y as p,z as v,A as y,B as d,H as m,l as k,N as R,Z as z,$ as b,D as C}from"./client.001b89e0.js";function D(t){var i=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}();return function(){var s,o=n(t);if(i){var r=n(this).constructor;s=Reflect.construct(o,arguments,r)}else s=o.apply(this,arguments);return c(this,s)}}function g(t){var n,c,i;return{c:function(){n=p("div"),this.h()},l:function(t){n=v(t,"DIV",{class:!0,style:!0}),y(n).forEach(h),this.h()},h:function(){d(n,"class","hotspot svelte-1pfzviz"),d(n,"style",t[2]),m(n,"button",t[1])},m:function(s,o){u(s,n,o),c||(i=k(n,"click",function(){R(t[1])&&t[1].apply(this,arguments)}),c=!0)},p:function(c,i){t=c,4&i&&d(n,"style",t[2]),2&i&&m(n,"button",t[1])},d:function(t){t&&h(n),c=!1,i()}}}function j(t){var n,c,i,s;return{c:function(){n=p("a"),c=z(" "),this.h()},l:function(t){n=v(t,"A",{href:!0,class:!0,style:!0});var i=y(n);c=b(i," "),i.forEach(h),this.h()},h:function(){d(n,"href",t[0]),d(n,"class","hotspot svelte-1pfzviz"),d(n,"style",t[2])},m:function(o,r){u(o,n,r),C(n,c),i||(s=k(n,"click",function(){R(t[1])&&t[1].apply(this,arguments)}),i=!0)},p:function(c,i){t=c,1&i&&d(n,"href",t[0]),4&i&&d(n,"style",t[2])},d:function(t){t&&h(n),i=!1,s()}}}function x(t){var n;function c(t,n){return t[0]?j:g}var i=c(t),s=i(t);return{c:function(){s.c(),n=f()},l:function(t){s.l(t),n=f()},m:function(t,c){s.m(t,c),u(t,n,c)},p:function(t,o){var r=a(o,1)[0];i===(i=c(t))&&s?s.p(t,r):(s.d(1),(s=i(t))&&(s.c(),s.m(n.parentNode,n)))},i:l,o:l,d:function(t){s.d(t),t&&h(n)}}}function A(t,n,c){var i=n.href,s=void 0===i?null:i,o=n.onClick,r=void 0===o?null:o,e=n.style,f=void 0===e?null:e;return t.$set=function(t){"href"in t&&c(0,s=t.href),"onClick"in t&&c(1,r=t.onClick),"style"in t&&c(2,f=t.style)},[s,r,f]}var E=function(n){t(f,e);var c=D(f);function f(t){var n;return i(this,f),n=c.call(this),s(r(n),t,A,x,o,{href:0,onClick:1,style:2}),n}return f}();export{E as H};
