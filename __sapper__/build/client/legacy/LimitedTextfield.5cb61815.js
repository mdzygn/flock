import{_ as n,a as t,b as e,c as a,i as r,s as i,d as s,S as o,y as c,z as u,A as l,l as f,B as h,M as v,o as d,aO as m,N as p,p as g,D as y,ae as x,bE as O,bF as $,aQ as w}from"./client.f42deb56.js";function b(n){var a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(n){return!1}}();return function(){var r,i=t(n);if(a){var s=t(this).constructor;r=Reflect.construct(i,arguments,s)}else r=i.apply(this,arguments);return e(this,r)}}function R(n){var t,e,a,r;return{c:function(){t=c("textarea"),this.h()},l:function(n){t=u(n,"TEXTAREA",{maxlength:!0,class:!0}),l(t).forEach(f),this.h()},h:function(){h(t,"maxlength",e=n[3]&&!n[4]?n[3]:""),h(t,"class","svelte-o89be7"),v(t,"charsOver",n[4]&&n[2])},m:function(e,i){d(e,t,i),m(t,n[0]),n[11](t),a||(r=[p(t,"input",n[10]),p(t,"keypress",n[8]),p(t,"keypress",n[9])],a=!0)},p:function(n,a){var r=g(a,1)[0];24&r&&e!==(e=n[3]&&!n[4]?n[3]:"")&&h(t,"maxlength",e),1&r&&m(t,n[0]),20&r&&v(t,"charsOver",n[4]&&n[2])},i:y,o:y,d:function(e){e&&f(t),n[11](null),a=!1,x(r)}}}function E(n,t,e){var a=O(),r=t.value,i=void 0===r?"":r,s=t.field,o=void 0===s?null:s,c=t.maxlength,u=t.allowOverflow,l=void 0===u||u,f=t.remainingChars,h=void 0===f?"":f,v=t.charsOver,d=void 0===v?"":v;function m(n){i.length>=c&&n.preventDefault()}return n.$set=function(n){"value"in n&&e(0,i=n.value),"field"in n&&e(1,o=n.field),"maxlength"in n&&e(3,c=n.maxlength),"allowOverflow"in n&&e(4,l=n.allowOverflow),"remainingChars"in n&&e(5,h=n.remainingChars),"charsOver"in n&&e(2,d=n.charsOver)},n.$$.update=function(){25&n.$$.dirty&&!l&&i.length>c&&e(0,i=i.substr(0,c)),9&n.$$.dirty&&e(5,h=Math.max(0,c-i.length)),9&n.$$.dirty&&e(2,d=Math.max(0,i.length-c)),18&n.$$.dirty&&!l&&o&&o.addEventListener("keypress",function(n){return m(n)})},[i,o,d,c,l,h,a,m,function(t){$(n,t)},function(t){$(n,t)},function(){i=this.value,e(0,i),e(4,l),e(3,c)},function(n){w[n?"unshift":"push"](function(){e(1,o=n)})}]}var C=function(t){n(c,o);var e=b(c);function c(n){var t;return a(this,c),t=e.call(this),r(s(t),n,E,R,i,{value:0,field:1,maxlength:3,allowOverflow:4,remainingChars:5,charsOver:2}),t}return c}();export{C as L};
