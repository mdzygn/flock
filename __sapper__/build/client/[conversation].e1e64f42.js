import{S as s,i as e,s as t,p as n,H as a,r as l,u as r,I as o,g as c,v as i,j as $,w as u,J as d,c as m,a as f,m as g,t as h,b as p,d as v,x as y,e as I,h as E,E as w,y as b,k as D,l as S,b5 as _,Y as T,Q as k,U as A,af as V,b6 as C,b7 as N,T as x,ac as H,ad as M,W as O,N as j,aj as L,a3 as B,aA as R,b8 as G,b9 as q,aE as F,aG as W,F as z,a6 as U,ba as J,bb as K,bc as P,bd as X,be as Q,o as Y,bf as Z,ab as ss,aI as es,aH as ts,bg as ns,bh as as,q as ls,bi as rs,bj as os,M as cs,bk as is,bl as $s,b3 as us,bm as ds,bn as ms,n as fs,aJ as gs,aK as hs,f as ps}from"./client.01f003d3.js";import"./Hotspot.9c34f817.js";import"./ContentPanel.73fe2893.js";import{C as vs}from"./ContentLoader.8429b239.js";import{L as ys}from"./post_like_selected.c79724df.js";import{S as Is}from"./send.53c7ac4a.js";import{L as Es}from"./Location.d91bf6a1.js";function ws(s){let e,t;return{c(){e=n("div"),t=a(s[3]),this.h()},l(n){e=l(n,"DIV",{class:!0});var a=r(e);t=o(a,s[3]),a.forEach(c),this.h()},h(){i(e,"class","dateHeader svelte-1oxr1ak")},m(s,n){$(s,e,n),u(e,t)},p(s,e){8&e&&d(t,s[3])},d(s){s&&c(e)}}}function bs(s){let e;const t=new O({props:{user:s[4],onClick:s[10]?s[11]:null,useThumb:!0}});return{c(){m(t.$$.fragment)},l(s){f(t.$$.fragment,s)},m(s,n){g(t,s,n),e=!0},p(s,e){const n={};16&e&&(n.user=s[4]),1024&e&&(n.onClick=s[10]?s[11]:null),t.$set(n)},i(s){e||(h(t.$$.fragment,s),e=!0)},o(s){p(t.$$.fragment,s),e=!1},d(s){v(t,s)}}}function Ds(s){let e;const t=new j({props:{className:"likeButton",icon:ys}});return{c(){m(t.$$.fragment)},l(s){f(t.$$.fragment,s)},m(s,n){g(t,s,n),e=!0},p:y,i(s){e||(h(t.$$.fragment,s),e=!0)},o(s){p(t.$$.fragment,s),e=!1},d(s){v(t,s)}}}function Ss(s){let e,t,a,o,d,m,f,g,v,y=s[8]&&ws(s),S=!s[5]&&!s[7]&&bs(s),_=s[9]&&Ds();return{c(){e=n("div"),y&&y.c(),t=I(),a=n("div"),S&&S.c(),o=I(),d=n("div"),m=n("div"),f=n("div"),g=I(),_&&_.c(),this.h()},l(s){e=l(s,"DIV",{class:!0});var n=r(e);y&&y.l(n),t=E(n),a=l(n,"DIV",{class:!0});var i=r(a);S&&S.l(i),o=E(i),d=l(i,"DIV",{class:!0});var $=r(d);m=l($,"DIV",{class:!0});var u=r(m);f=l(u,"DIV",{class:!0}),r(f).forEach(c),u.forEach(c),g=E($),_&&_.l($),$.forEach(c),i.forEach(c),n.forEach(c),this.h()},h(){i(f,"class","message svelte-1oxr1ak"),i(m,"class","detailInnerContent svelte-1oxr1ak"),i(d,"class","detailContent svelte-1oxr1ak"),i(a,"class","messageContent svelte-1oxr1ak"),w(a,"userBreak",s[6]),w(a,"isSelf",s[5]),i(e,"class","messageListItem svelte-1oxr1ak")},m(n,l){$(n,e,l),y&&y.m(e,null),u(e,t),u(e,a),S&&S.m(a,null),u(a,o),u(a,d),u(d,m),u(m,f),f.innerHTML=s[2],u(d,g),_&&_.m(d,null),v=!0},p(s,[n]){s[8]?y?y.p(s,n):((y=ws(s)).c(),y.m(e,t)):y&&(y.d(1),y=null),s[5]||s[7]?S&&(b(),p(S,1,1,()=>{S=null}),D()):S?(S.p(s,n),160&n&&h(S,1)):((S=bs(s)).c(),h(S,1),S.m(a,o)),(!v||4&n)&&(f.innerHTML=s[2]),s[9]?_?(_.p(s,n),512&n&&h(_,1)):((_=Ds()).c(),h(_,1),_.m(d,null)):_&&(b(),p(_,1,1,()=>{_=null}),D()),64&n&&w(a,"userBreak",s[6]),32&n&&w(a,"isSelf",s[5])},i(s){v||(h(S),h(_),v=!0)},o(s){p(S),p(_),v=!1},d(s){s&&c(e),y&&y.d(),S&&S.d(),_&&_.d()}}}function _s(s,e,t){let n,a,l,r,o,c=y,i=()=>(c(),c=k(B,s=>t(12,n=s)),B),$=y,u=y;S(s,_,s=>t(16,a=s)),S(s,T,s=>t(19,r=s)),s.$$.on_destroy.push(()=>c()),s.$$.on_destroy.push(()=>$()),s.$$.on_destroy.push(()=>u());let d,m,f,g,h,p,v,I,E,w,b,D,O,j,{message:B}=e;return i(),s.$set=(s=>{"message"in s&&i(t(0,B=s.message))}),s.$$.update=(()=>{4096&s.$$.dirty&&(()=>(u(),u=k(d,s=>t(20,o=s)),d))(t(1,d=n&&n.lastMessage||A(null))),4096&s.$$.dirty&&t(2,m=n&&n.message&&V(n.message)||""),4096&s.$$.dirty&&(f=n&&n.id||null),4096&s.$$.dirty&&t(14,g=n&&n.createdAt||null),16384&s.$$.dirty&&t(3,h=g&&C(g)||""),69632&s.$$.dirty&&t(15,p=n&&a&&N(a,n.userId)||null),49152&s.$$.dirty&&(()=>($(),$=k(v,s=>t(18,l=s)),v))(t(4,v=p&&g&&x(p,g)||A(null))),294912&s.$$.dirty&&t(17,I=l&&l.name||p&&p.name||""),557056&s.$$.dirty&&t(5,E=!p||p.id===r),1052672&s.$$.dirty&&t(6,w=o&&n.userId!==o.userId||!1),1052672&s.$$.dirty&&t(7,b=o&&n.userId==o.userId||!1),1052672&s.$$.dirty&&t(8,D=n&&(!o||H(o.createdAt,n.createdAt)>M.DATE_SHOWN_MESSAGE_DATE_DIFF)||!1),4096&s.$$.dirty&&t(9,O=n&&n.likes&&n.likes.length||!1),s.$$.dirty,262144&s.$$.dirty&&t(10,j=l&&l.name||!1)}),[B,d,m,h,v,E,w,b,D,O,j,function(){j&&L(l.id)}]}class Ts extends s{constructor(s){super(),e(this,s,_s,Ss,t,{message:0})}}function ks(s,e,t){const n=s.slice();return n[3]=e[t],n}function As(s){let e;const t=new Ts({props:{message:s[3]}});return{c(){m(t.$$.fragment)},l(s){f(t.$$.fragment,s)},m(s,n){g(t,s,n),e=!0},p(s,e){const n={};4&e&&(n.message=s[3]),t.$set(n)},i(s){e||(h(t.$$.fragment,s),e=!0)},o(s){p(t.$$.fragment,s),e=!1},d(s){v(t,s)}}}function Vs(s){let e,t,a,o=s[2],u=[];for(let e=0;e<o.length;e+=1)u[e]=As(ks(s,o,e));const d=s=>p(u[s],1,1,()=>{u[s]=null});return{c(){e=n("div");for(let s=0;s<u.length;s+=1)u[s].c();this.h()},l(s){e=l(s,"DIV",{class:!0});var t=r(e);for(let s=0;s<u.length;s+=1)u[s].l(t);t.forEach(c),this.h()},h(){i(e,"class",t="messageList "+s[1]+" svelte-szvkl4")},m(s,t){$(s,e,t);for(let s=0;s<u.length;s+=1)u[s].m(e,null);a=!0},p(s,[n]){if(4&n){let t;for(o=s[2],t=0;t<o.length;t+=1){const a=ks(s,o,t);u[t]?(u[t].p(a,n),h(u[t],1)):(u[t]=As(a),u[t].c(),h(u[t],1),u[t].m(e,null))}for(b(),t=o.length;t<u.length;t+=1)d(t);D()}(!a||2&n&&t!==(t="messageList "+s[1]+" svelte-szvkl4"))&&i(e,"class",t)},i(s){if(!a){for(let s=0;s<o.length;s+=1)h(u[s]);a=!0}},o(s){u=u.filter(Boolean);for(let s=0;s<u.length;s+=1)p(u[s]);a=!1},d(s){s&&c(e),B(u,s)}}}function Cs(s,e,t){let n,a=y,l=()=>(a(),a=k(r,s=>t(2,n=s)),r);s.$$.on_destroy.push(()=>a());let{messages:r}=e;l();let{className:o=""}=e;return s.$set=(s=>{"messages"in s&&l(t(0,r=s.messages)),"className"in s&&t(1,o=s.className)}),[r,o,n]}class Ns extends s{constructor(s){super(),e(this,s,Cs,Vs,t,{messages:0,className:1})}}function xs(s){let e,t,a,o,d,y,w,b;const D=new j({props:{className:"sendButton",disabled:!s[2],onClick:s[3],icon:Is}});return{c(){e=n("div"),t=n("div"),m(D.$$.fragment),a=I(),o=n("div"),d=n("textarea"),this.h()},l(s){e=l(s,"DIV",{class:!0});var n=r(e);t=l(n,"DIV",{class:!0});var i=r(t);f(D.$$.fragment,i),a=E(i),o=l(i,"DIV",{class:!0});var $=r(o);d=l($,"TEXTAREA",{rows:!0,class:!0}),r(d).forEach(c),$.forEach(c),i.forEach(c),n.forEach(c),this.h()},h(){i(d,"rows","1"),i(d,"class","svelte-uhjl0u"),i(o,"class","field svelte-uhjl0u"),i(t,"class","fieldRegion svelte-uhjl0u"),i(e,"class","messageInput svelte-uhjl0u")},m(n,l){$(n,e,l),u(e,t),g(D,t,null),u(t,a),u(t,o),u(o,d),W(d,s[0]),s[13](d),y=!0,w||(b=[z(d,"input",s[12]),z(d,"keypress",s[14])],w=!0)},p(s,[e]){const t={};4&e&&(t.disabled=!s[2]),D.$set(t),1&e&&W(d,s[0])},i(s){y||(h(D.$$.fragment,s),y=!0)},o(s){p(D.$$.fragment,s),y=!1},d(t){t&&c(e),v(D),s[13](null),w=!1,U(b)}}}function Hs(s,e,t){let n,a,l;S(s,J,s=>t(6,n=s)),S(s,K,s=>t(7,a=s)),S(s,P,s=>t(8,l=s));let r,{message:o=""}=e,{image:c=null}=e,i=X(),$=Q();function u(){if(f){const s={id:i,message:Z(o)};n&&!a&&(s.conversationId=n),c&&(s.image=c),a&&(s.newConversation=!0,s.targetUserIds=l,s.conversationId=$),t(0,o=""),i=X(),function(s){if(!R())return;const e=G(s);return e.then(s=>{s&&!s.error&&s.newConversation&&(s.conversation&&q(s.conversation),s.conversationId&&F(s.conversationId,!0,!0))}),e}(s).then(s=>{s&&(s.success||s.addedMessage||s.duplicateKey)})}}function d(){f&&(u(),r&&r.focus())}function m(){(async()=>{if(await ss(),r&&r.style&&"undefined"!=typeof window&&window.getComputedStyle){if(t(1,r.style.height="inherit",r),window.getComputedStyle(r)){const s=r.scrollHeight+4;t(1,r.style.height=s+"px",r)}}})()}Y(()=>{r&&r.focus()});let f;return s.$set=(s=>{"message"in s&&t(0,o=s.message),"image"in s&&t(4,c=s.image)}),s.$$.update=(()=>{209&s.$$.dirty&&t(2,f=(n||a)&&!(!Z(o)&&!c)),1&s.$$.dirty&&m()}),[o,r,f,d,c,i,n,a,l,$,u,m,function(){o=this.value,t(0,o)},function(s){es[s?"unshift":"push"](()=>{t(1,r=s)})},s=>ts(s,{action:d,actionOnCtrl:!0,preventBlur:!0})]}class Ms extends s{constructor(s){super(),e(this,s,Hs,xs,t,{message:0,image:4})}}function Os(s){let e;const t=new Es({props:{location:s[2]}});return{c(){m(t.$$.fragment)},l(s){f(t.$$.fragment,s)},m(s,n){g(t,s,n),e=!0},p(s,e){const n={};4&e&&(n.location=s[2]),t.$set(n)},i(s){e||(h(t.$$.fragment,s),e=!0)},o(s){p(t.$$.fragment,s),e=!1},d(s){v(t,s)}}}function js(s){let e,t,y,w,S,_,T,k,A,V,C,N,x;const H=new O({props:{user:ns,useThumb:!0}});let M=s[2]&&Os(s);return{c(){e=n("div"),t=n("div"),y=n("div"),m(H.$$.fragment),w=I(),S=n("div"),_=a(s[0]),T=I(),k=n("div"),A=a(s[1]),V=I(),M&&M.c(),this.h()},l(n){e=l(n,"DIV",{class:!0});var a=r(e);t=l(a,"DIV",{class:!0});var i=r(t);y=l(i,"DIV",{class:!0});var $=r(y);f(H.$$.fragment,$),w=E($),S=l($,"DIV",{class:!0});var u=r(S);_=o(u,s[0]),u.forEach(c),T=E($),k=l($,"DIV",{class:!0});var d=r(k);A=o(d,s[1]),d.forEach(c),$.forEach(c),V=E(i),M&&M.l(i),i.forEach(c),a.forEach(c),this.h()},h(){i(S,"class","userDisplayName svelte-yn8q53"),i(k,"class","username svelte-yn8q53"),i(y,"class","profileRegion button svelte-yn8q53"),i(t,"class","profileInfo svelte-yn8q53"),i(e,"class","conversationProfile svelte-yn8q53")},m(n,a){$(n,e,a),u(e,t),u(t,y),g(H,y,null),u(y,w),u(y,S),u(S,_),u(y,T),u(y,k),u(k,A),u(t,V),M&&M.m(t,null),C=!0,N||(x=z(y,"click",s[3]),N=!0)},p(s,[e]){(!C||1&e)&&d(_,s[0]),(!C||2&e)&&d(A,s[1]),s[2]?M?(M.p(s,e),4&e&&h(M,1)):((M=Os(s)).c(),h(M,1),M.m(t,null)):M&&(b(),p(M,1,1,()=>{M=null}),D())},i(s){C||(h(H.$$.fragment,s),h(M),C=!0)},o(s){p(H.$$.fragment,s),p(M),C=!1},d(s){s&&c(e),v(H),M&&M.d(),N=!1,x()}}}function Ls(s,e,t){let n,a,l,r;return S(s,ns,s=>t(4,n=s)),s.$$.update=(()=>{16&s.$$.dirty&&t(0,a=n&&n.name||""),16&s.$$.dirty&&t(1,l=n&&n.username&&"@"+n.username||""),16&s.$$.dirty&&t(2,r=n&&n.location||"")}),[a,l,r,function(){n&&n.id&&L(n.id)}]}class Bs extends s{constructor(s){super(),e(this,s,Ls,js,t,{})}}function Rs(s){let e,t;function n(e){s[27].call(null,e)}let a={onScroll:s[10],anchorToBottom:!0,id:"conversation",$$slots:{default:[zs]},$$scope:{ctx:s}};void 0!==s[2]&&(a.scrollRegion=s[2]);const l=new fs({props:a});return es.push(()=>gs(l,"scrollRegion",n)),{c(){m(l.$$.fragment)},l(s){f(l.$$.fragment,s)},m(s,e){g(l,s,e),t=!0},p(s,t){const n={};268435617&t&&(n.$$scope={dirty:t,ctx:s}),!e&&4&t&&(e=!0,n.scrollRegion=s[2],hs(()=>e=!1)),l.$set(n)},i(s){t||(h(l.$$.fragment,s),t=!0)},o(s){p(l.$$.fragment,s),t=!1},d(s){v(l,s)}}}function Gs(s){let e;const t=new vs({props:{label:cs.CONVERSATION.NO_MESSAGES}});return{c(){m(t.$$.fragment)},l(s){f(t.$$.fragment,s)},m(s,n){g(t,s,n),e=!0},p:y,i(s){e||(h(t.$$.fragment,s),e=!0)},o(s){p(t.$$.fragment,s),e=!1},d(s){v(t,s)}}}function qs(s){let e;const t=new vs({props:{label:cs.LOADING.MESSAGES}});return{c(){m(t.$$.fragment)},l(s){f(t.$$.fragment,s)},m(s,n){g(t,s,n),e=!0},p:y,i(s){e||(h(t.$$.fragment,s),e=!0)},o(s){p(t.$$.fragment,s),e=!1},d(s){v(t,s)}}}function Fs(s){let e;const t=new Ns({props:{messages:s[0]}});return{c(){m(t.$$.fragment)},l(s){f(t.$$.fragment,s)},m(s,n){g(t,s,n),e=!0},p(s,e){const n={};1&e&&(n.messages=s[0]),t.$set(n)},i(s){e||(h(t.$$.fragment,s),e=!0)},o(s){p(t.$$.fragment,s),e=!1},d(s){v(t,s)}}}function Ws(s){let e;const t=new Bs({});return{c(){m(t.$$.fragment)},l(s){f(t.$$.fragment,s)},m(s,n){g(t,s,n),e=!0},p:y,i(s){e||(h(t.$$.fragment,s),e=!0)},o(s){p(t.$$.fragment,s),e=!1},d(s){v(t,s)}}}function zs(s){let e,t,n,a;const l=[Ws,Fs],r=[];function o(s,e){return s[7]?0:s[5]?1:-1}return~(e=o(s))&&(t=r[e]=l[e](s)),{c(){t&&t.c(),n=ps()},l(s){t&&t.l(s),n=ps()},m(s,t){~e&&r[e].m(s,t),$(s,n,t),a=!0},p(s,a){let c=e;(e=o(s))===c?~e&&r[e].p(s,a):(t&&(b(),p(r[c],1,1,()=>{r[c]=null}),D()),~e?((t=r[e])||(t=r[e]=l[e](s)).c(),h(t,1),t.m(n.parentNode,n)):t=null)},i(s){a||(h(t),a=!0)},o(s){p(t),a=!1},d(s){~e&&r[e].d(s),s&&c(n)}}}function Us(s){let e,t,d,m,f,g=cs.CONVERSATION.MESSAGES_ADDED+"";return{c(){e=n("div"),t=n("div"),d=a(g),this.h()},l(s){e=l(s,"DIV",{class:!0});var n=r(e);t=l(n,"DIV",{class:!0});var a=r(t);d=o(a,g),a.forEach(c),n.forEach(c),this.h()},h(){i(t,"class","messagesAddedIndicator button svelte-ed6b4u"),i(e,"class","messagesAddedIndicatorContainer svelte-ed6b4u")},m(n,a){$(n,e,a),u(e,t),u(t,d),m||(f=z(t,"click",s[9]),m=!0)},p:y,d(s){s&&c(e),m=!1,f()}}}function Js(s){let e;const t=new Ms({});return{c(){m(t.$$.fragment)},l(s){f(t.$$.fragment,s)},m(s,n){g(t,s,n),e=!0},i(s){e||(h(t.$$.fragment,s),e=!0)},o(s){p(t.$$.fragment,s),e=!1},d(s){v(t,s)}}}function Ks(s){let e,t,a,o,d,m,f,g,v,y;as(s[26]);const S=[qs,Gs,Rs],_=[];function T(s,e){return s[6]?0:s[5]&&s[5].length||s[7]?2:1}o=T(s),d=_[o]=S[o](s);let k=s[1]&&Us(s),A=s[8]&&Js();return{c(){e=I(),t=n("div"),a=n("div"),d.c(),m=I(),k&&k.c(),f=I(),A&&A.c(),this.h()},l(s){ls('[data-svelte="svelte-1y4v7mn"]',document.head).forEach(c),e=E(s),t=l(s,"DIV",{class:!0});var n=r(t);a=l(n,"DIV",{class:!0});var o=r(a);d.l(o),m=E(o),k&&k.l(o),o.forEach(c),f=E(n),A&&A.l(n),n.forEach(c),this.h()},h(){document.title="Flock",i(a,"class","messagesView svelte-ed6b4u"),w(a,"newConversation",s[7]),i(t,"class","content svelte-ed6b4u")},m(n,l){$(n,e,l),$(n,t,l),u(t,a),_[o].m(a,null),u(a,m),k&&k.m(a,null),u(t,f),A&&A.m(t,null),g=!0,v||(y=z(window,"resize",s[26]),v=!0)},p(s,[e]){let n=o;(o=T(s))===n?_[o].p(s,e):(b(),p(_[n],1,1,()=>{_[n]=null}),D(),(d=_[o])||(d=_[o]=S[o](s)).c(),h(d,1),d.m(a,m)),s[1]?k?k.p(s,e):((k=Us(s)).c(),k.m(a,null)):k&&(k.d(1),k=null),128&e&&w(a,"newConversation",s[7]),s[8]?A?256&e&&h(A,1):((A=Js()).c(),h(A,1),A.m(t,null)):A&&(b(),p(A,1,1,()=>{A=null}),D())},i(s){g||(h(d),h(A),g=!0)},o(s){p(d),p(A),g=!1},d(s){s&&c(e),s&&c(t),_[o].d(),k&&k.d(),A&&A.d(),v=!1,y()}}}function Ps(s,e,t){let n,a,l,r,o,c,i,$,u=y,d=()=>(u(),u=k(f,s=>t(5,o=s)),f);S(s,_,s=>t(14,n=s)),S(s,T,s=>t(15,a=s)),S(s,is,s=>t(16,l=s)),S(s,J,s=>t(17,r=s)),S(s,$s,s=>t(19,c=s)),S(s,us,s=>t(21,i=s)),S(s,K,s=>t(7,$=s)),s.$$.on_destroy.push(()=>u()),rs();let m=0,{messages:f=A(null)}=e;function g(){d(t(0,f=n&&ds({conversationId:r},null,n.isNew)||f))}d();let h,p,v,I=!1,E=0;async function w(){h&&(await ss(),h&&h.scrollTo(0,h.scrollHeight))}async function b(){h&&o&&o.length>m&&(h.scrollTop+h.offsetHeight>h.scrollHeight-M.MIN_AUTO_SCROLL_BOTTOM_DIST?(await ss(),h.scrollTo(0,h.scrollHeight)):t(1,I=!0)),m=o?o.length:0}let D,V,C,N,x,H,O=!1;return Y(()=>{O=!0,ms.on("messagedAdded",w)}),os(()=>{O=!1,ms.off("messagedAdded",w)}),s.$set=(s=>{"messages"in s&&d(t(0,f=s.messages))}),s.$$.update=(()=>{16384&s.$$.dirty&&g(),98304&s.$$.dirty&&rs(),32&s.$$.dirty&&b(),524320&s.$$.dirty&&t(18,D=c&&!o),2244608&s.$$.dirty&&t(20,V=i&&(!n||n.id!==r)),1310848&s.$$.dirty&&t(6,C=(D||V)&&!$),49344&s.$$.dirty&&t(8,N=!C&&a&&(n||$)),16384&s.$$.dirty&&t(22,x=n&&n.isGroup||!1),4194304&s.$$.dirty&&(H=x?"messages_group_view":"message_view"),4120&s.$$.dirty&&(p&&v<M.MOBILE_DEVICE_MAX_WIDTH&&p<E&&(w(),(async()=>{await ss(),w()})()),t(12,E=p))}),[f,I,h,p,v,o,C,$,N,w,function(){I&&h.scrollTop+h.offsetHeight>h.scrollHeight-M.MIN_HIDE_MESSAGES_BOTTOM_DIST&&t(1,I=!1)},m,E,O,n,a,l,r,D,c,V,i,x,H,g,b,function(){t(3,p=window.innerHeight),t(4,v=window.innerWidth)},function(s){t(2,h=s)}]}export default class extends s{constructor(s){super(),e(this,s,Ps,Ks,t,{messages:0})}}
