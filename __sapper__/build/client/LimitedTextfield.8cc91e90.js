import{S as a,i as e,s as t,q as s,r as i,u as l,d as n,v as r,B as u,b as h,aJ as c,l as o,G as p,K as f,ac as v,bA as m,bB as g,n as d,bC as x}from"./client.0abc6ae2.js";function $(a){let e,t,m,g;return{c(){e=s("textarea"),this.h()},l(a){e=i(a,"TEXTAREA",{autocapitalize:!0,maxlength:!0,class:!0}),l(e).forEach(n),this.h()},h(){r(e,"autocapitalize",a[4]),r(e,"maxlength",t=a[3]&&!a[5]?a[3]:""),r(e,"class","svelte-o89be7"),u(e,"charsOver",a[5]&&a[2])},m(t,s){h(t,e,s),c(e,a[0]),a[12](e),m||(g=[o(e,"input",a[11]),o(e,"keypress",a[9]),o(e,"keypress",a[10]),o(e,"keyup",function(){p(a[4]?a[13]:null)&&(a[4]?a[13]:null).apply(this,arguments)})],m=!0)},p(s,[i]){a=s,16&i&&r(e,"autocapitalize",a[4]),40&i&&t!==(t=a[3]&&!a[5]?a[3]:"")&&r(e,"maxlength",t),1&i&&c(e,a[0]),36&i&&u(e,"charsOver",a[5]&&a[2])},i:f,o:f,d(t){t&&n(e),a[12](null),m=!1,v(g)}}}function y(a,e,t){const s=m();let{value:i=""}=e,{field:l=null}=e,{maxlength:n}=e,{autocapitalize:r=""}=e,{allowOverflow:u=!0}=e,{remainingChars:h=""}=e,{charsOver:c=""}=e;function o(a){i.length>=n&&a.preventDefault()}return a.$set=(a=>{"value"in a&&t(0,i=a.value),"field"in a&&t(1,l=a.field),"maxlength"in a&&t(3,n=a.maxlength),"autocapitalize"in a&&t(4,r=a.autocapitalize),"allowOverflow"in a&&t(5,u=a.allowOverflow),"remainingChars"in a&&t(6,h=a.remainingChars),"charsOver"in a&&t(2,c=a.charsOver)}),a.$$.update=(()=>{41&a.$$.dirty&&!u&&i.length>n&&t(0,i=i.substr(0,n)),9&a.$$.dirty&&t(6,h=Math.max(0,n-i.length)),9&a.$$.dirty&&t(2,c=Math.max(0,i.length-n)),34&a.$$.dirty&&!u&&l&&l.addEventListener("keypress",a=>o(a))}),[i,l,c,n,r,u,h,s,o,function(e){g(a,e)},function(e){g(a,e)},function(){i=this.value,t(0,i),t(5,u),t(3,n)},function(a){d[a?"unshift":"push"](()=>{t(1,l=a)})},a=>x(a,{capitalizeFirstKeypress:!0})]}class O extends a{constructor(a){super(),e(this,a,y,$,t,{value:0,field:1,maxlength:3,autocapitalize:4,allowOverflow:5,remainingChars:6,charsOver:2})}}export{O as L};
