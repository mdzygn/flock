import{_ as n,a as t,b as a,c as e,i as r,s as i,d as s,S as c,y as o,z as u,A as l,l as f,B as h,M as v,o as d,aO as m,N as p,p as g,D as y,ae as x,bE as O,bF as $,aQ as w}from"./client.4c9ba926.js";function b(n){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(n){return!1}}();return function(){var r,i=t(n);if(e){var s=t(this).constructor;r=Reflect.construct(i,arguments,s)}else r=i.apply(this,arguments);return a(this,r)}}function R(n){var t,a,e,r;return{c:function(){t=o("textarea"),this.h()},l:function(n){t=u(n,"TEXTAREA",{maxlength:!0,class:!0}),l(t).forEach(f),this.h()},h:function(){h(t,"maxlength",a=n[3]&&!n[4]?n[3]:""),h(t,"class","svelte-o89be7"),v(t,"charsOver",n[4]&&n[2])},m:function(a,i){d(a,t,i),m(t,n[0]),n[11](t),e||(r=[p(t,"input",n[10]),p(t,"keypress",n[8]),p(t,"keypress",n[9])],e=!0)},p:function(n,e){var r=g(e,1)[0];24&r&&a!==(a=n[3]&&!n[4]?n[3]:"")&&h(t,"maxlength",a),1&r&&m(t,n[0]),20&r&&v(t,"charsOver",n[4]&&n[2])},i:y,o:y,d:function(a){a&&f(t),n[11](null),e=!1,x(r)}}}function E(n,t,a){var e=O(),r=t.value,i=void 0===r?"":r,s=t.field,c=void 0===s?null:s,o=t.maxlength,u=t.allowOverflow,l=void 0===u||u,f=t.remainingChars,h=void 0===f?"":f,v=t.charsOver,d=void 0===v?"":v;function m(n){i.length>=o&&n.preventDefault()}return n.$set=function(n){"value"in n&&a(0,i=n.value),"field"in n&&a(1,c=n.field),"maxlength"in n&&a(3,o=n.maxlength),"allowOverflow"in n&&a(4,l=n.allowOverflow),"remainingChars"in n&&a(5,h=n.remainingChars),"charsOver"in n&&a(2,d=n.charsOver)},n.$$.update=function(){25&n.$$.dirty&&!l&&i.length>o&&a(0,i=i.substr(0,o)),9&n.$$.dirty&&a(5,h=Math.max(0,o-i.length)),9&n.$$.dirty&&a(2,d=Math.max(0,i.length-o)),18&n.$$.dirty&&!l&&c&&c.addEventListener("keypress",function(n){return m(n)})},[i,c,d,o,l,h,e,m,function(t){$(n,t)},function(t){$(n,t)},function(){i=this.value,a(0,i),a(4,l),a(3,o)},function(n){w[n?"unshift":"push"](function(){a(1,c=n)})}]}var C=function(t){n(o,c);var a=b(o);function o(n){var t;return e(this,o),t=a.call(this),r(s(t),n,E,R,i,{value:0,field:1,maxlength:3,allowOverflow:4,remainingChars:5,charsOver:2}),t}return o}();export{C as L};
