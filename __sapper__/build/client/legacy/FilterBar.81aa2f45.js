import{_ as t,a as n,b as e,c as r,i as o,s as a,d as c,S as i,J as s,K as f,L as l,t as u,h as v,M as h,y as g,z as m,A as p,j as d,B as $,H as y,g as S,D as j,I as x,T as C,P as R,aj as w,o as I,r as B,u as D,v as E,a2 as L,w as b,Z as k,$ as N,a0 as T}from"./client.f77e006f.js";function V(t){var r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}();return function(){var o,a=n(t);if(r){var c=n(this).constructor;o=Reflect.construct(a,arguments,c)}else o=a.apply(this,arguments);return e(this,o)}}function A(t,n,e){var r=t.slice();return r[11]=n[e],r[13]=e,r}function P(t){var n,e=t[11]+"";return{c:function(){n=k(e)},l:function(t){n=N(t,e)},m:function(t,e){S(t,n,e)},p:function(t,r){8&r&&e!==(e=t[11]+"")&&T(n,e)},d:function(t){t&&d(n)}}}function W(t){var n;function e(){for(var n,e=arguments.length,r=new Array(e),o=0;o<e;o++)r[o]=arguments[o];return(n=t)[9].apply(n,[t[11]].concat(r))}var r=new L({props:{className:"filterButton "+((t[13]||t[1]?t[0].match(new RegExp("\\b"+t[11]+"\\b")):""===t[0])?"selectedItem":""),onClick:e,$$slots:{default:[P]},$$scope:{ctx:t}}});return{c:function(){s(r.$$.fragment)},l:function(t){f(r.$$.fragment,t)},m:function(t,e){l(r,t,e),n=!0},p:function(n,o){t=n;var a={};11&o&&(a.className="filterButton "+((t[13]||t[1]?t[0].match(new RegExp("\\b"+t[11]+"\\b")):""===t[0])?"selectedItem":"")),8&o&&(a.onClick=e),16392&o&&(a.$$scope={dirty:o,ctx:t}),r.$set(a)},i:function(t){n||(u(r.$$.fragment,t),n=!0)},o:function(t){v(r.$$.fragment,t),n=!1},d:function(t){h(r,t)}}}function z(t){for(var n,e,r,o,a=t[3],c=[],i=0;i<a.length;i+=1)c[i]=W(A(t,a,i));var s=function(t){return v(c[t],1,1,function(){c[t]=null})};return{c:function(){n=g("div"),e=g("div"),r=g("div");for(var t=0;t<c.length;t+=1)c[t].c();this.h()},l:function(t){n=m(t,"DIV",{class:!0});var o=p(n);e=m(o,"DIV",{class:!0});var a=p(e);r=m(a,"DIV",{class:!0});for(var i=p(r),s=0;s<c.length;s+=1)c[s].l(i);i.forEach(d),a.forEach(d),o.forEach(d),this.h()},h:function(){$(r,"class","filterSet svelte-jjncoj"),$(e,"class","filterScrollRegion svelte-jjncoj"),$(n,"class","filterBar svelte-jjncoj"),y(n,"isCategorySelector",t[1])},m:function(a,i){S(a,n,i),j(n,e),j(e,r);for(var s=0;s<c.length;s+=1)c[s].m(r,null);t[10](e),o=!0},p:function(t,e){var o=x(e,1)[0];if(27&o){var i;for(a=t[3],i=0;i<a.length;i+=1){var f=A(t,a,i);c[i]?(c[i].p(f,o),u(c[i],1)):(c[i]=W(f),c[i].c(),u(c[i],1),c[i].m(r,null))}for(C(),i=a.length;i<c.length;i+=1)s(i);R()}2&o&&y(n,"isCategorySelector",t[1])},i:function(t){if(!o){for(var n=0;n<a.length;n+=1)u(c[n]);o=!0}},o:function(t){c=c.filter(Boolean);for(var n=0;n<c.length;n+=1)v(c[n]);o=!1},d:function(e){e&&d(n),w(c,e),t[10](null)}}}var F=10,H=40;function J(t,n,e){var r,o=n.filterString,a=void 0===o?"":o,c=n.isCategorySelector,i=void 0!==c&&c,s=["design","arts","tech","environment","community","apps","games","music","media","education","food"];function f(t){if("all"===t)e(0,a="");else if(h){if(t){var n=a.trim().split(", ");"other"!==t&&"other"!==a||t===a||(n=[]);var r=n.indexOf(t);-1!==r?n.splice(r,1):n.push(t),n=n.filter(function(t){return t}),e(0,a=n.join(", ").trim())}}else e(0,a=t)}var l=!1;function u(){if(r){var t=r.getElementsByClassName("selectedItem"),n=t&&t.length?t[0]:null;if(n){var e=n.offsetLeft,o=n.offsetLeft+n.offsetWidth,a=r.offsetWidth,c=r.scrollLeft,i=r.scrollLeft+a;if(o<a-F)r.scrollTo(0,0);else if(o>i-F||e<c+F){var s=n.offsetLeft-H;r.scrollTo(s,0)}}}}I(function(){e(5,l=!0)});var v,h;return t.$set=function(t){"filterString"in t&&e(0,a=t.filterString),"isCategorySelector"in t&&e(1,i=t.isCategorySelector)},t.$$.update=function(){2&t.$$.dirty&&e(3,v=i?[].concat(s,["other"]):["all"].concat(s)),2&t.$$.dirty&&(h=i),33&t.$$.dirty&&l&&B(D.mark(function t(){return D.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,E();case 2:u();case 3:case"end":return t.stop()}},t)}))()},[a,i,r,v,f,l,h,s,u,function(t,n){return f(t)},function(t){b[t?"unshift":"push"](function(){e(2,r=t)})}]}var K=function(n){t(s,i);var e=V(s);function s(t){var n;return r(this,s),n=e.call(this),o(c(n),t,J,z,a,{filterString:0,isCategorySelector:1}),n}return s}();export{K as F};
