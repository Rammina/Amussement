(this.webpackJsonpproject_chat_application=this.webpackJsonpproject_chat_application||[]).push([[0],{107:function(e,a){},110:function(e,a,t){},146:function(e,a,t){},147:function(e,a,t){},148:function(e,a,t){},149:function(e,a,t){},150:function(e,a,t){},151:function(e,a,t){},154:function(e,a,t){"use strict";t.r(a);var n,c=t(0),r=t.n(c),l=t(59),s=t.n(l),m=t(66),o=t(5),i=t(60),u=t.n(i),A=t(61),E=t.n(A),p=t(17),g=t.n(p),f=(t(110),function(e){var a=e.users;return r.a.createElement("div",{className:"textContainer"},r.a.createElement("div",null,r.a.createElement("h1",null,"Realtime Chat Application ",r.a.createElement("span",{role:"img","aria-label":"emoji"},"\ud83d\udcac")),r.a.createElement("h2",null,"Created with React, Express, Node and Socket.IO ",r.a.createElement("span",{role:"img","aria-label":"emoji"},"\u2764\ufe0f")),r.a.createElement("h2",null,"Try it out right now! ",r.a.createElement("span",{role:"img","aria-label":"emoji"},"\u2b05\ufe0f"))),a?r.a.createElement("div",null,r.a.createElement("h1",null,"People currently chatting:"),r.a.createElement("div",{className:"activeContainer"},r.a.createElement("h2",null,a.map((function(e){var a=e.name;return r.a.createElement("div",{key:a,className:"activeItem"},a,r.a.createElement("img",{alt:"Online Icon",src:g.a}))}))))):null)}),h=t(62),d=t.n(h),v=(t(146),t(31)),N=t.n(v),j=function(e){var a=e.message,t=a.text,n=a.user,c=!1,l=e.name.trim().toLowerCase();return n===l&&(c=!0),c?r.a.createElement("div",{className:"messageContainer justifyEnd"},r.a.createElement("p",{className:"sentText pr-10"},l),r.a.createElement("div",{className:"messageBox backgroundBlue"},r.a.createElement("p",{className:"messageText colorWhite"},N.a.emojify(t)))):r.a.createElement("div",{className:"messageContainer justifyStart"},r.a.createElement("div",{className:"messageBox backgroundLight"},r.a.createElement("p",{className:"messageText colorDark"},N.a.emojify(t))),r.a.createElement("p",{className:"sentText pl-10 "},n))},b=(t(147),function(e){var a=e.messages,t=e.name;return r.a.createElement(d.a,{className:"messages"},a.map((function(e,a){return r.a.createElement("div",{key:a},r.a.createElement(j,{message:e,name:t}))})))}),C=t(63),O=t.n(C),I=(t(148),function(e){var a=e.room;return r.a.createElement("div",{className:"infoBar"},r.a.createElement("div",{className:"leftInnerContainer"},r.a.createElement("img",{className:"onlineIcon",src:g.a,alt:"online icon"}),r.a.createElement("h3",null,a)),r.a.createElement("div",{className:"rightInnerContainer"},r.a.createElement("a",{href:"/"},r.a.createElement("img",{src:O.a,alt:"close icon"}))))}),S=(t(149),function(e){var a=e.setMessage,t=e.sendMessage,n=e.message;return r.a.createElement("form",{className:"form"},r.a.createElement("input",{className:"input",type:"text",placeholder:"Type a message...",value:n,onChange:function(e){var t=e.target.value;return a(t)},onKeyPress:function(e){return"Enter"===e.key?t(e):null}}),r.a.createElement("button",{className:"sendButton",onClick:function(e){return t(e)}},"Send"))}),x=(t(150),function(e){var a=e.location,t=Object(c.useState)(""),l=Object(o.a)(t,2),s=l[0],i=l[1],A=Object(c.useState)(""),p=Object(o.a)(A,2),g=p[0],h=p[1],d=Object(c.useState)(""),v=Object(o.a)(d,2),N=v[0],j=v[1],C=Object(c.useState)(""),O=Object(o.a)(C,2),x=O[0],y=O[1],k=Object(c.useState)([]),R=Object(o.a)(k,2),w=R[0],B=R[1],M="https://chika-chat.herokuapp.com/";Object(c.useEffect)((function(){var e=u.a.parse(a.search),t=e.name,c=e.room;n=E()(M),h(c),i(t),n.emit("join",{name:t,room:c},(function(e){e&&alert(e)}))}),[M,a.search]),Object(c.useEffect)((function(){n.on("message",(function(e){B((function(a){return[].concat(Object(m.a)(a),[e])}))})),n.on("roomData",(function(e){var a=e.users;j(a)}))}),[]);return r.a.createElement("div",{className:"outerContainer"},r.a.createElement("div",{className:"container"},r.a.createElement(I,{room:g}),r.a.createElement(b,{messages:w,name:s}),r.a.createElement(S,{message:x,setMessage:y,sendMessage:function(e){e.preventDefault(),x&&n.emit("sendMessage",x,(function(){return y("")}))}})),r.a.createElement(f,{users:N}))}),y=t(18);t(151);function k(){var e=Object(c.useState)(""),a=Object(o.a)(e,2),t=a[0],n=a[1],l=Object(c.useState)(""),s=Object(o.a)(l,2),m=s[0],i=s[1];return r.a.createElement("div",{className:"joinOuterContainer"},r.a.createElement("div",{className:"joinInnerContainer"},r.a.createElement("h1",{className:"heading"},"Join"),r.a.createElement("div",null,r.a.createElement("input",{placeholder:"Name",className:"joinInput",type:"text",onChange:function(e){return n(e.target.value)}})),r.a.createElement("div",null,r.a.createElement("input",{placeholder:"Room",className:"joinInput mt-20",type:"text",onChange:function(e){return i(e.target.value)}})),r.a.createElement(y.b,{onClick:function(e){return t&&m?null:e.preventDefault()},to:"/chat?name=".concat(t,"&room=").concat(m)},r.a.createElement("button",{className:"button mt-20",type:"submit"},"Sign In"))))}var R=t(7),w=function(){return r.a.createElement(y.a,null,r.a.createElement(R.a,{path:"/",exact:!0,component:k}),r.a.createElement(R.a,{path:"/chat",component:x}))};s.a.render(r.a.createElement(w,null),document.getElementById("root"))},17:function(e,a){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAAXNSR0IArs4c6QAAAExJREFUCB1jbPh/le3lx5tNDIwMcQwg8J9hkTi/eh0LWJCBoRwoAAPlQDEGJrhKmDCIBupmQuYjs5lAZiILgNlAMRaQRSAz4UZCLQcAIwYaiAejKoYAAAAASUVORK5CYII="},63:function(e,a){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAHBJREFUGBmNkAEKwCAMA2VfGP2mrx3sOV2us6IymIXQGlNTW9zdhCqcZQm4dmelFUp+CZZa6sYpeUVIFyIixMqjCO51Wy5unQExuYSbSF5JASLqPsqRM21lOoWc89tagr3PSMgOiWlwnUeXWA/E78IfuAX270S3ydAAAAAASUVORK5CYII="},67:function(e,a,t){e.exports=t(154)}},[[67,1,2]]]);
//# sourceMappingURL=main.cf000faa.chunk.js.map