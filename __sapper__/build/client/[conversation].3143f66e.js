import{S as s,i as e,s as t,q as n,R as a,r as l,u as r,T as o,d as c,v as i,b as $,x as d,U as u,C as m,D as f,E as g,t as h,c as p,F as v,K as y,z as I,A as E,B as w,L as b,I as D,J as S,ba as _,a3 as T,Y as V,$ as A,ak as C,bb as N,bc as k,_ as H,ah as M,ai as L,a1 as O,W as j,an as x,ab as B,bd as R,be as q,bf as G,aH as z,aJ as F,l as W,ac as K,bg as P,bh as U,bi as J,bj as X,bk as Y,o as Q,bl as Z,m as ss,n as es,aK as ts,bm as ns,a as as,H as ls,bn as rs,g as os,V as cs,bo as is,bp as $s,b8 as ds,bq as us,br as ms,aL as fs,aM as gs,e as hs}from"./client.0abc6ae2.js";import{S as ps}from"./Proxy.f0e0d240.js";import"./Hotspot.d380ec0c.js";import"./ContentPanel.e2c8aad7.js";import{C as vs}from"./ContentLoader.62cd3f9f.js";import{L as ys}from"./post_like_selected.c79724df.js";import{S as Is}from"./send.53c7ac4a.js";import{L as Es}from"./Location.78bad849.js";function ws(s){let e,t;return{c(){e=n("div"),t=a(s[3]),this.h()},l(n){e=l(n,"DIV",{class:!0});var a=r(e);t=o(a,s[3]),a.forEach(c),this.h()},h(){i(e,"class","dateHeader svelte-37ndgl")},m(s,n){$(s,e,n),d(e,t)},p(s,e){8&e&&u(t,s[3])},d(s){s&&c(e)}}}function bs(s){let e;const t=new O({props:{user:s[4],onClick:s[10]?s[11]:null,useThumb:!0}});return{c(){m(t.$$.fragment)},l(s){f(t.$$.fragment,s)},m(s,n){g(t,s,n),e=!0},p(s,e){const n={};16&e&&(n.user=s[4]),1024&e&&(n.onClick=s[10]?s[11]:null),t.$set(n)},i(s){e||(h(t.$$.fragment,s),e=!0)},o(s){p(t.$$.fragment,s),e=!1},d(s){v(t,s)}}}function Ds(s){let e;const t=new j({props:{className:"likeButton",icon:ys}});return{c(){m(t.$$.fragment)},l(s){f(t.$$.fragment,s)},m(s,n){g(t,s,n),e=!0},p:y,i(s){e||(h(t.$$.fragment,s),e=!0)},o(s){p(t.$$.fragment,s),e=!1},d(s){v(t,s)}}}function Ss(s){let e,t,a,o,u,m,f,g,v,y=s[8]&&ws(s),S=!s[5]&&!s[7]&&bs(s),_=s[9]&&Ds();return{c(){e=n("div"),y&&y.c(),t=I(),a=n("div"),S&&S.c(),o=I(),u=n("div"),m=n("div"),f=n("div"),g=I(),_&&_.c(),this.h()},l(s){e=l(s,"DIV",{class:!0});var n=r(e);y&&y.l(n),t=E(n),a=l(n,"DIV",{class:!0});var i=r(a);S&&S.l(i),o=E(i),u=l(i,"DIV",{class:!0});var $=r(u);m=l($,"DIV",{class:!0});var d=r(m);f=l(d,"DIV",{class:!0}),r(f).forEach(c),d.forEach(c),g=E($),_&&_.l($),$.forEach(c),i.forEach(c),n.forEach(c),this.h()},h(){i(f,"class","message svelte-37ndgl"),i(m,"class","detailInnerContent svelte-37ndgl"),i(u,"class","detailContent svelte-37ndgl"),i(a,"class","messageContent svelte-37ndgl"),w(a,"userBreak",s[6]),w(a,"isSelf",s[5]),i(e,"class","messageListItem svelte-37ndgl")},m(n,l){$(n,e,l),y&&y.m(e,null),d(e,t),d(e,a),S&&S.m(a,null),d(a,o),d(a,u),d(u,m),d(m,f),f.innerHTML=s[2],d(u,g),_&&_.m(u,null),v=!0},p(s,[n]){s[8]?y?y.p(s,n):((y=ws(s)).c(),y.m(e,t)):y&&(y.d(1),y=null),s[5]||s[7]?S&&(b(),p(S,1,1,()=>{S=null}),D()):S?(S.p(s,n),160&n&&h(S,1)):((S=bs(s)).c(),h(S,1),S.m(a,o)),(!v||4&n)&&(f.innerHTML=s[2]),s[9]?_?(_.p(s,n),512&n&&h(_,1)):((_=Ds()).c(),h(_,1),_.m(u,null)):_&&(b(),p(_,1,1,()=>{_=null}),D()),64&n&&w(a,"userBreak",s[6]),32&n&&w(a,"isSelf",s[5])},i(s){v||(h(S),h(_),v=!0)},o(s){p(S),p(_),v=!1},d(s){s&&c(e),y&&y.d(),S&&S.d(),_&&_.d()}}}function _s(s,e,t){let n,a,l,r,o,c=y,i=()=>(c(),c=V(B,s=>t(12,n=s)),B),$=y,d=y;S(s,_,s=>t(16,a=s)),S(s,T,s=>t(19,r=s)),s.$$.on_destroy.push(()=>c()),s.$$.on_destroy.push(()=>$()),s.$$.on_destroy.push(()=>d());let u,m,f,g,h,p,v,I,E,w,b,D,O,j,{message:B}=e;return i(),s.$set=(s=>{"message"in s&&i(t(0,B=s.message))}),s.$$.update=(()=>{4096&s.$$.dirty&&(()=>(d(),d=V(u,s=>t(20,o=s)),u))(t(1,u=n&&n.lastMessage||A(null))),4096&s.$$.dirty&&t(2,m=n&&n.message&&C(n.message)||""),4096&s.$$.dirty&&(f=n&&n.id||null),4096&s.$$.dirty&&t(14,g=n&&n.createdAt||null),16384&s.$$.dirty&&t(3,h=g&&N(g)||""),69632&s.$$.dirty&&t(15,p=n&&a&&k(a,n.userId)||null),49152&s.$$.dirty&&(()=>($(),$=V(v,s=>t(18,l=s)),v))(t(4,v=p&&g&&H(p,g)||A(null))),294912&s.$$.dirty&&t(17,I=l&&l.name||p&&p.name||""),557056&s.$$.dirty&&t(5,E=!p||p.id===r),1052672&s.$$.dirty&&t(6,w=o&&n.userId!==o.userId||!1),1052672&s.$$.dirty&&t(7,b=o&&n.userId==o.userId||!1),1052672&s.$$.dirty&&t(8,D=n&&(!o||M(o.createdAt,n.createdAt)>L.DATE_SHOWN_MESSAGE_DATE_DIFF)||!1),4096&s.$$.dirty&&t(9,O=n&&n.likes&&n.likes.length||!1),s.$$.dirty,262144&s.$$.dirty&&t(10,j=l&&l.name||!1)}),[B,u,m,h,v,E,w,b,D,O,j,function(){j&&x(l.id)}]}class Ts extends s{constructor(s){super(),e(this,s,_s,Ss,t,{message:0})}}function Vs(s,e,t){const n=s.slice();return n[3]=e[t],n}function As(s){let e;const t=new Ts({props:{message:s[3]}});return{c(){m(t.$$.fragment)},l(s){f(t.$$.fragment,s)},m(s,n){g(t,s,n),e=!0},p(s,e){const n={};4&e&&(n.message=s[3]),t.$set(n)},i(s){e||(h(t.$$.fragment,s),e=!0)},o(s){p(t.$$.fragment,s),e=!1},d(s){v(t,s)}}}function Cs(s){let e,t,a,o=s[2],d=[];for(let e=0;e<o.length;e+=1)d[e]=As(Vs(s,o,e));const u=s=>p(d[s],1,1,()=>{d[s]=null});return{c(){e=n("div");for(let s=0;s<d.length;s+=1)d[s].c();this.h()},l(s){e=l(s,"DIV",{class:!0});var t=r(e);for(let s=0;s<d.length;s+=1)d[s].l(t);t.forEach(c),this.h()},h(){i(e,"class",t="messageList "+s[1]+" svelte-szvkl4")},m(s,t){$(s,e,t);for(let s=0;s<d.length;s+=1)d[s].m(e,null);a=!0},p(s,[n]){if(4&n){let t;for(o=s[2],t=0;t<o.length;t+=1){const a=Vs(s,o,t);d[t]?(d[t].p(a,n),h(d[t],1)):(d[t]=As(a),d[t].c(),h(d[t],1),d[t].m(e,null))}for(b(),t=o.length;t<d.length;t+=1)u(t);D()}(!a||2&n&&t!==(t="messageList "+s[1]+" svelte-szvkl4"))&&i(e,"class",t)},i(s){if(!a){for(let s=0;s<o.length;s+=1)h(d[s]);a=!0}},o(s){d=d.filter(Boolean);for(let s=0;s<d.length;s+=1)p(d[s]);a=!1},d(s){s&&c(e),B(d,s)}}}function Ns(s,e,t){let n,a=y,l=()=>(a(),a=V(r,s=>t(2,n=s)),r);s.$$.on_destroy.push(()=>a());let{messages:r}=e;l();let{className:o=""}=e;return s.$set=(s=>{"messages"in s&&l(t(0,r=s.messages)),"className"in s&&t(1,o=s.className)}),[r,o,n]}class ks extends s{constructor(s){super(),e(this,s,Ns,Cs,t,{messages:0,className:1})}}function Hs(s){let e,t,a,o,u,y,w,b;const D=new j({props:{className:"sendButton",disabled:!s[2],onClick:s[3],icon:Is}});return{c(){e=n("div"),t=n("div"),m(D.$$.fragment),a=I(),o=n("div"),u=n("textarea"),this.h()},l(s){e=l(s,"DIV",{class:!0});var n=r(e);t=l(n,"DIV",{class:!0});var i=r(t);f(D.$$.fragment,i),a=E(i),o=l(i,"DIV",{class:!0});var $=r(o);u=l($,"TEXTAREA",{rows:!0,class:!0}),r(u).forEach(c),$.forEach(c),i.forEach(c),n.forEach(c),this.h()},h(){i(u,"rows","1"),i(u,"class","svelte-uhjl0u"),i(o,"class","field svelte-uhjl0u"),i(t,"class","fieldRegion svelte-uhjl0u"),i(e,"class","messageInput svelte-uhjl0u")},m(n,l){$(n,e,l),d(e,t),g(D,t,null),d(t,a),d(t,o),d(o,u),F(u,s[0]),s[13](u),y=!0,w||(b=[W(u,"input",s[12]),W(u,"keypress",s[14])],w=!0)},p(s,[e]){const t={};4&e&&(t.disabled=!s[2]),D.$set(t),1&e&&F(u,s[0])},i(s){y||(h(D.$$.fragment,s),y=!0)},o(s){p(D.$$.fragment,s),y=!1},d(t){t&&c(e),v(D),s[13](null),w=!1,K(b)}}}function Ms(s,e,t){let n,a,l;S(s,P,s=>t(6,n=s)),S(s,U,s=>t(7,a=s)),S(s,J,s=>t(8,l=s));let r,{message:o=""}=e,{image:c=null}=e,i=X(),$=Y();function d(){if(f){const s={id:i,message:Z(o)};n&&!a&&(s.conversationId=n),c&&(s.image=c),a&&(s.newConversation=!0,s.targetUserIds=l,s.conversationId=$),t(0,o=""),i=X(),function(s){if(!R())return;const e=q(s);return e&&e.then(s=>{s&&!s.error&&s.newConversation&&(s.conversation&&G(s.conversation),s.conversationId&&z(s.conversationId,!0,!0))}),e}(s).then(s=>{s&&(s.success||s.addedMessage||s.duplicateKey)})}}function u(){f&&(d(),r&&r.focus())}function m(){(async()=>{if(await ss(),r&&r.style&&"undefined"!=typeof window&&window.getComputedStyle){if(t(1,r.style.height="inherit",r),window.getComputedStyle(r)){const s=r.scrollHeight+4;t(1,r.style.height=s+"px",r)}}})()}Q(()=>{r&&r.focus()});let f;return s.$set=(s=>{"message"in s&&t(0,o=s.message),"image"in s&&t(4,c=s.image)}),s.$$.update=(()=>{209&s.$$.dirty&&t(2,f=(n||a)&&!(!Z(o)&&!c)),1&s.$$.dirty&&m()}),[o,r,f,u,c,i,n,a,l,$,d,m,function(){o=this.value,t(0,o)},function(s){es[s?"unshift":"push"](()=>{t(1,r=s)})},s=>ts(s,{action:u,actionOnCtrl:!0,preventBlur:!0})]}class Ls extends s{constructor(s){super(),e(this,s,Ms,Hs,t,{message:0,image:4})}}function Os(s){let e;const t=new Es({props:{location:s[2]}});return{c(){m(t.$$.fragment)},l(s){f(t.$$.fragment,s)},m(s,n){g(t,s,n),e=!0},p(s,e){const n={};4&e&&(n.location=s[2]),t.$set(n)},i(s){e||(h(t.$$.fragment,s),e=!0)},o(s){p(t.$$.fragment,s),e=!1},d(s){v(t,s)}}}function js(s){let e,t,y,w,S,_,T,V,A,C,N,k,H;const M=new O({props:{user:ns,useThumb:!0}});let L=s[2]&&Os(s);return{c(){e=n("div"),t=n("div"),y=n("div"),m(M.$$.fragment),w=I(),S=n("div"),_=a(s[0]),T=I(),V=n("div"),A=a(s[1]),C=I(),L&&L.c(),this.h()},l(n){e=l(n,"DIV",{class:!0});var a=r(e);t=l(a,"DIV",{class:!0});var i=r(t);y=l(i,"DIV",{class:!0});var $=r(y);f(M.$$.fragment,$),w=E($),S=l($,"DIV",{class:!0});var d=r(S);_=o(d,s[0]),d.forEach(c),T=E($),V=l($,"DIV",{class:!0});var u=r(V);A=o(u,s[1]),u.forEach(c),$.forEach(c),C=E(i),L&&L.l(i),i.forEach(c),a.forEach(c),this.h()},h(){i(S,"class","userDisplayName svelte-yn8q53"),i(V,"class","username svelte-yn8q53"),i(y,"class","profileRegion button svelte-yn8q53"),i(t,"class","profileInfo svelte-yn8q53"),i(e,"class","conversationProfile svelte-yn8q53")},m(n,a){$(n,e,a),d(e,t),d(t,y),g(M,y,null),d(y,w),d(y,S),d(S,_),d(y,T),d(y,V),d(V,A),d(t,C),L&&L.m(t,null),N=!0,k||(H=W(y,"click",s[3]),k=!0)},p(s,[e]){(!N||1&e)&&u(_,s[0]),(!N||2&e)&&u(A,s[1]),s[2]?L?(L.p(s,e),4&e&&h(L,1)):((L=Os(s)).c(),h(L,1),L.m(t,null)):L&&(b(),p(L,1,1,()=>{L=null}),D())},i(s){N||(h(M.$$.fragment,s),h(L),N=!0)},o(s){p(M.$$.fragment,s),p(L),N=!1},d(s){s&&c(e),v(M),L&&L.d(),k=!1,H()}}}function xs(s,e,t){let n,a,l,r;return S(s,ns,s=>t(4,n=s)),s.$$.update=(()=>{16&s.$$.dirty&&t(0,a=n&&n.name||""),16&s.$$.dirty&&t(1,l=n&&n.username&&"@"+n.username||""),16&s.$$.dirty&&t(2,r=n&&n.location||"")}),[a,l,r,function(){n&&n.id&&x(n.id)}]}class Bs extends s{constructor(s){super(),e(this,s,xs,js,t,{})}}function Rs(s){let e,t;function n(e){s[27].call(null,e)}let a={onScroll:s[10],anchorToBottom:!0,id:"conversation",$$slots:{default:[Ws]},$$scope:{ctx:s}};void 0!==s[2]&&(a.scrollRegion=s[2]);const l=new ps({props:a});return es.push(()=>fs(l,"scrollRegion",n)),{c(){m(l.$$.fragment)},l(s){f(l.$$.fragment,s)},m(s,e){g(l,s,e),t=!0},p(s,t){const n={};268435617&t&&(n.$$scope={dirty:t,ctx:s}),!e&&4&t&&(e=!0,n.scrollRegion=s[2],gs(()=>e=!1)),l.$set(n)},i(s){t||(h(l.$$.fragment,s),t=!0)},o(s){p(l.$$.fragment,s),t=!1},d(s){v(l,s)}}}function qs(s){let e;const t=new vs({props:{label:cs.CONVERSATION.NO_MESSAGES}});return{c(){m(t.$$.fragment)},l(s){f(t.$$.fragment,s)},m(s,n){g(t,s,n),e=!0},p:y,i(s){e||(h(t.$$.fragment,s),e=!0)},o(s){p(t.$$.fragment,s),e=!1},d(s){v(t,s)}}}function Gs(s){let e;const t=new vs({props:{label:cs.LOADING.MESSAGES}});return{c(){m(t.$$.fragment)},l(s){f(t.$$.fragment,s)},m(s,n){g(t,s,n),e=!0},p:y,i(s){e||(h(t.$$.fragment,s),e=!0)},o(s){p(t.$$.fragment,s),e=!1},d(s){v(t,s)}}}function zs(s){let e;const t=new ks({props:{messages:s[0]}});return{c(){m(t.$$.fragment)},l(s){f(t.$$.fragment,s)},m(s,n){g(t,s,n),e=!0},p(s,e){const n={};1&e&&(n.messages=s[0]),t.$set(n)},i(s){e||(h(t.$$.fragment,s),e=!0)},o(s){p(t.$$.fragment,s),e=!1},d(s){v(t,s)}}}function Fs(s){let e;const t=new Bs({});return{c(){m(t.$$.fragment)},l(s){f(t.$$.fragment,s)},m(s,n){g(t,s,n),e=!0},p:y,i(s){e||(h(t.$$.fragment,s),e=!0)},o(s){p(t.$$.fragment,s),e=!1},d(s){v(t,s)}}}function Ws(s){let e,t,n,a;const l=[Fs,zs],r=[];function o(s,e){return s[7]?0:s[5]?1:-1}return~(e=o(s))&&(t=r[e]=l[e](s)),{c(){t&&t.c(),n=hs()},l(s){t&&t.l(s),n=hs()},m(s,t){~e&&r[e].m(s,t),$(s,n,t),a=!0},p(s,a){let c=e;(e=o(s))===c?~e&&r[e].p(s,a):(t&&(b(),p(r[c],1,1,()=>{r[c]=null}),D()),~e?((t=r[e])||(t=r[e]=l[e](s)).c(),h(t,1),t.m(n.parentNode,n)):t=null)},i(s){a||(h(t),a=!0)},o(s){p(t),a=!1},d(s){~e&&r[e].d(s),s&&c(n)}}}function Ks(s){let e,t,u,m,f,g=cs.CONVERSATION.MESSAGES_ADDED+"";return{c(){e=n("div"),t=n("div"),u=a(g),this.h()},l(s){e=l(s,"DIV",{class:!0});var n=r(e);t=l(n,"DIV",{class:!0});var a=r(t);u=o(a,g),a.forEach(c),n.forEach(c),this.h()},h(){i(t,"class","messagesAddedIndicator button svelte-ed6b4u"),i(e,"class","messagesAddedIndicatorContainer svelte-ed6b4u")},m(n,a){$(n,e,a),d(e,t),d(t,u),m||(f=W(t,"click",s[9]),m=!0)},p:y,d(s){s&&c(e),m=!1,f()}}}function Ps(s){let e;const t=new Ls({});return{c(){m(t.$$.fragment)},l(s){f(t.$$.fragment,s)},m(s,n){g(t,s,n),e=!0},i(s){e||(h(t.$$.fragment,s),e=!0)},o(s){p(t.$$.fragment,s),e=!1},d(s){v(t,s)}}}function Us(s){let e,t,a,o,u,m,f,g,v,y;as(s[26]);const S=[Gs,qs,Rs],_=[];function T(s,e){return s[6]?0:s[5]&&s[5].length||s[7]?2:1}o=T(s),u=_[o]=S[o](s);let V=s[1]&&Ks(s),A=s[8]&&Ps();return{c(){e=I(),t=n("div"),a=n("div"),u.c(),m=I(),V&&V.c(),f=I(),A&&A.c(),this.h()},l(s){ls('[data-svelte="svelte-1y4v7mn"]',document.head).forEach(c),e=E(s),t=l(s,"DIV",{class:!0});var n=r(t);a=l(n,"DIV",{class:!0});var o=r(a);u.l(o),m=E(o),V&&V.l(o),o.forEach(c),f=E(n),A&&A.l(n),n.forEach(c),this.h()},h(){document.title="Flock",i(a,"class","messagesView svelte-ed6b4u"),w(a,"newConversation",s[7]),i(t,"class","content svelte-ed6b4u")},m(n,l){$(n,e,l),$(n,t,l),d(t,a),_[o].m(a,null),d(a,m),V&&V.m(a,null),d(t,f),A&&A.m(t,null),g=!0,v||(y=W(window,"resize",s[26]),v=!0)},p(s,[e]){let n=o;(o=T(s))===n?_[o].p(s,e):(b(),p(_[n],1,1,()=>{_[n]=null}),D(),(u=_[o])||(u=_[o]=S[o](s)).c(),h(u,1),u.m(a,m)),s[1]?V?V.p(s,e):((V=Ks(s)).c(),V.m(a,null)):V&&(V.d(1),V=null),128&e&&w(a,"newConversation",s[7]),s[8]?A?256&e&&h(A,1):((A=Ps()).c(),h(A,1),A.m(t,null)):A&&(b(),p(A,1,1,()=>{A=null}),D())},i(s){g||(h(u),h(A),g=!0)},o(s){p(u),p(A),g=!1},d(s){s&&c(e),s&&c(t),_[o].d(),V&&V.d(),A&&A.d(),v=!1,y()}}}function Js(s,e,t){let n,a,l,r,o,c,i,$,d=y,u=()=>(d(),d=V(f,s=>t(5,o=s)),f);S(s,_,s=>t(14,n=s)),S(s,T,s=>t(15,a=s)),S(s,is,s=>t(16,l=s)),S(s,P,s=>t(17,r=s)),S(s,$s,s=>t(19,c=s)),S(s,ds,s=>t(21,i=s)),S(s,U,s=>t(7,$=s)),s.$$.on_destroy.push(()=>d()),rs();let m=0,{messages:f=A(null)}=e;function g(){u(t(0,f=n&&us({conversationId:r},null,n.isNew)||f))}u();let h,p,v,I=!1,E=0;async function w(){h&&(await ss(),h&&h.scrollTo(0,h.scrollHeight))}async function b(){h&&o&&o.length>m&&(h.scrollTop+h.offsetHeight>h.scrollHeight-L.MIN_AUTO_SCROLL_BOTTOM_DIST?(await ss(),h.scrollTo(0,h.scrollHeight)):t(1,I=!0)),m=o?o.length:0}let D,C,N,k,H,M,O=!1;return Q(()=>{O=!0,ms.on("messagedAdded",w)}),os(()=>{O=!1,ms.off("messagedAdded",w)}),s.$set=(s=>{"messages"in s&&u(t(0,f=s.messages))}),s.$$.update=(()=>{16384&s.$$.dirty&&g(),98304&s.$$.dirty&&rs(),32&s.$$.dirty&&b(),524320&s.$$.dirty&&t(18,D=c&&!o),2244608&s.$$.dirty&&t(20,C=i&&(!n||n.id!==r)),1310848&s.$$.dirty&&t(6,N=(D||C)&&!$),49344&s.$$.dirty&&t(8,k=!N&&a&&(n||$)),16384&s.$$.dirty&&t(22,H=n&&n.isGroup||!1),4194304&s.$$.dirty&&(M=H?"messages_group_view":"message_view"),4120&s.$$.dirty&&(p&&v<L.MOBILE_DEVICE_MAX_WIDTH&&p<E&&(w(),(async()=>{await ss(),w()})()),t(12,E=p))}),[f,I,h,p,v,o,N,$,k,w,function(){I&&h.scrollTop+h.offsetHeight>h.scrollHeight-L.MIN_HIDE_MESSAGES_BOTTOM_DIST&&t(1,I=!1)},m,E,O,n,a,l,r,D,c,C,i,H,M,g,b,function(){t(3,p=window.innerHeight),t(4,v=window.innerWidth)},function(s){t(2,h=s)}]}export default class extends s{constructor(s){super(),e(this,s,Js,Us,t,{messages:0})}}
