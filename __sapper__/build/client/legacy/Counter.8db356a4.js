import{_ as t,a as n,b as s,c as a,i as c,s as r,d as e,S as i,y as o,Z as u,z as f,A as l,$ as v,j as h,B as d,H as p,g as m,D as y,a0 as N,f as b,I as w,R}from"./client.e229b9da.js";function D(t){var a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}();return function(){var c,r=n(t);if(a){var e=n(this).constructor;c=Reflect.construct(r,arguments,e)}else c=r.apply(this,arguments);return s(this,c)}}function x(t){var n,s,a;return{c:function(){n=o("div"),s=o("div"),a=u(t[0]),this.h()},l:function(c){n=f(c,"DIV",{class:!0});var r=l(n);s=f(r,"DIV",{class:!0});var e=l(s);a=v(e,t[0]),e.forEach(h),r.forEach(h),this.h()},h:function(){d(s,"class","counter svelte-1odxsrs"),p(s,"hasNew",t[1]),p(s,"default",!t[1]),d(n,"class","counterContainer svelte-1odxsrs")},m:function(t,c){m(t,n,c),y(n,s),y(s,a)},p:function(t,n){1&n&&N(a,t[0]),2&n&&p(s,"hasNew",t[1]),2&n&&p(s,"default",!t[1])},d:function(t){t&&h(n)}}}function I(t){var n,s=t[2]&&x(t);return{c:function(){s&&s.c(),n=b()},l:function(t){s&&s.l(t),n=b()},m:function(t,a){s&&s.m(t,a),m(t,n,a)},p:function(t,a){var c=w(a,1)[0];t[2]?s?s.p(t,c):((s=x(t)).c(),s.m(n.parentNode,n)):s&&(s.d(1),s=null)},i:R,o:R,d:function(t){s&&s.d(t),t&&h(n)}}}function g(t,n,s){var a=n.count,c=void 0===a?0:a,r=n.hasNew,e=void 0!==r&&r,i=n.visible,o=void 0===i||i;return t.$set=function(t){"count"in t&&s(0,c=t.count),"hasNew"in t&&s(1,e=t.hasNew),"visible"in t&&s(2,o=t.visible)},[c,e,o]}var j=function(n){t(o,i);var s=D(o);function o(t){var n;return a(this,o),n=s.call(this),c(e(n),t,g,I,r,{count:0,hasNew:1,visible:2}),n}return o}();export{j as C};
