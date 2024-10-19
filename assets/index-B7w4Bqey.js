var Rl=n=>{throw TypeError(n)};var Ca=(n,e,A)=>e.has(n)||Rl("Cannot "+A);var k=(n,e,A)=>(Ca(n,e,"read from private field"),A?A.call(n):e.get(n)),We=(n,e,A)=>e.has(n)?Rl("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(n):e.set(n,A),Ie=(n,e,A,t)=>(Ca(n,e,"write to private field"),t?t.call(n,A):e.set(n,A),A),Dl=(n,e,A)=>(Ca(n,e,"access private method"),A);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))t(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&t(s)}).observe(document,{childList:!0,subtree:!0});function A(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(i){if(i.ep)return;i.ep=!0;const r=A(i);fetch(i.href,r)}})();/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.17.0
 * @author George Michael Brower
 * @license MIT
 */class Ft{constructor(e,A,t,i,r="div"){this.parent=e,this.object=A,this.property=t,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement("div"),this.domElement.classList.add("controller"),this.domElement.classList.add(i),this.$name=document.createElement("div"),this.$name.classList.add("name"),Ft.nextNameID=Ft.nextNameID||0,this.$name.id="lil-gui-name-"+ ++Ft.nextNameID,this.$widget=document.createElement(r),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(t)}name(e){return this._name=e,this.$name.innerHTML=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled||(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e)),this}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const A=this.parent.add(this.object,this.property,e);return A.name(this._name),this.destroy(),A}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.object[this.property]=e,this._callOnChange(),this.updateDisplay(),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}let Bd=class extends Ft{constructor(e,A,t){super(e,A,t,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}};function Fo(n){let e,A;return(e=n.match(/(#|0x)?([a-f0-9]{6})/i))?A=e[2]:(e=n.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?A=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=n.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(A=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),!!A&&"#"+A}const _d={isPrimitive:!0,match:n=>typeof n=="string",fromHexString:Fo,toHexString:Fo},wr={isPrimitive:!0,match:n=>typeof n=="number",fromHexString:n=>parseInt(n.substring(1),16),toHexString:n=>"#"+n.toString(16).padStart(6,0)},wd={isPrimitive:!1,match:Array.isArray,fromHexString(n,e,A=1){const t=wr.fromHexString(n);e[0]=(t>>16&255)/255*A,e[1]=(t>>8&255)/255*A,e[2]=(255&t)/255*A},toHexString:([n,e,A],t=1)=>wr.toHexString(n*(t=255/t)<<16^e*t<<8^A*t<<0)},vd={isPrimitive:!1,match:n=>Object(n)===n,fromHexString(n,e,A=1){const t=wr.fromHexString(n);e.r=(t>>16&255)/255*A,e.g=(t>>8&255)/255*A,e.b=(255&t)/255*A},toHexString:({r:n,g:e,b:A},t=1)=>wr.toHexString(n*(t=255/t)<<16^e*t<<8^A*t<<0)},Ed=[_d,wr,wd,vd];let Cd=class extends Ft{constructor(e,A,t,i){var r;super(e,A,t,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=(r=this.initialValue,Ed.find(s=>s.match(r))),this._rgbScale=i,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const s=Fo(this.$text.value);s&&this._setValueFromHexString(s)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const A=this._format.fromHexString(e);this.setValue(A)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}};class xa extends Ft{constructor(e,A,t){super(e,A,t,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",i=>{i.preventDefault(),this.getValue().call(this.object)}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class xd extends Ft{constructor(e,A,t,i,r,s){super(e,A,t,"number"),this._initInput(),this.min(i),this.max(r);const a=s!==void 0;this.step(a?s:this._getImplicitStep(),a),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,A=!0){return this._step=e,this._stepExplicit=A,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let A=(e-this._min)/(this._max-this._min);A=Math.max(0,Math.min(A,1)),this.$fill.style.width=100*A+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$disable=this.$input;const e=c=>{const u=parseFloat(this.$input.value);isNaN(u)||(this._snapClampSetValue(u+c),this.$input.value=this.getValue())};let A,t,i,r,s,a=!1;const o=c=>{if(a){const u=c.clientX-A,h=c.clientY-t;Math.abs(h)>5?(c.preventDefault(),this.$input.blur(),a=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(u)>5&&l()}if(!a){const u=c.clientY-i;s-=u*this._step*this._arrowKeyMultiplier(c),r+s>this._max?s=this._max-r:r+s<this._min&&(s=this._min-r),this._snapClampSetValue(r+s)}i=c.clientY},l=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",o),window.removeEventListener("mouseup",l)};this.$input.addEventListener("input",()=>{let c=parseFloat(this.$input.value);isNaN(c)||(this._stepExplicit&&(c=this._snap(c)),this.setValue(this._clamp(c)))}),this.$input.addEventListener("keydown",c=>{c.code==="Enter"&&this.$input.blur(),c.code==="ArrowUp"&&(c.preventDefault(),e(this._step*this._arrowKeyMultiplier(c))),c.code==="ArrowDown"&&(c.preventDefault(),e(this._step*this._arrowKeyMultiplier(c)*-1))}),this.$input.addEventListener("wheel",c=>{this._inputFocused&&(c.preventDefault(),e(this._step*this._normalizeMouseWheel(c)))},{passive:!1}),this.$input.addEventListener("mousedown",c=>{A=c.clientX,t=i=c.clientY,a=!0,r=this.getValue(),s=0,window.addEventListener("mousemove",o),window.addEventListener("mouseup",l)}),this.$input.addEventListener("focus",()=>{this._inputFocused=!0}),this.$input.addEventListener("blur",()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()})}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const e=h=>{const p=this.$slider.getBoundingClientRect();let g=(m=h,d=p.left,f=p.right,v=this._min,w=this._max,(m-d)/(f-d)*(w-v)+v);var m,d,f,v,w;this._snapClampSetValue(g)},A=h=>{e(h.clientX)},t=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",A),window.removeEventListener("mouseup",t)};let i,r,s=!1;const a=h=>{h.preventDefault(),this._setDraggingStyle(!0),e(h.touches[0].clientX),s=!1},o=h=>{if(s){const p=h.touches[0].clientX-i,g=h.touches[0].clientY-r;Math.abs(p)>Math.abs(g)?a(h):(window.removeEventListener("touchmove",o),window.removeEventListener("touchend",l))}else h.preventDefault(),e(h.touches[0].clientX)},l=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",o),window.removeEventListener("touchend",l)},c=this._callOnFinishChange.bind(this);let u;this.$slider.addEventListener("mousedown",h=>{this._setDraggingStyle(!0),e(h.clientX),window.addEventListener("mousemove",A),window.addEventListener("mouseup",t)}),this.$slider.addEventListener("touchstart",h=>{h.touches.length>1||(this._hasScrollBar?(i=h.touches[0].clientX,r=h.touches[0].clientY,s=!0):a(h),window.addEventListener("touchmove",o,{passive:!1}),window.addEventListener("touchend",l))},{passive:!1}),this.$slider.addEventListener("wheel",h=>{if(Math.abs(h.deltaX)<Math.abs(h.deltaY)&&this._hasScrollBar)return;h.preventDefault();const p=this._normalizeMouseWheel(h)*this._step;this._snapClampSetValue(this.getValue()+p),this.$input.value=this.getValue(),clearTimeout(u),u=setTimeout(c,400)},{passive:!1})}_setDraggingStyle(e,A="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle("lil-gui-"+A,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:A,deltaY:t}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(A=0,t=-e.wheelDelta/120,t*=this._stepExplicit?1:10),A+-t}_arrowKeyMultiplier(e){let A=this._stepExplicit?1:10;return e.shiftKey?A*=10:e.altKey&&(A/=10),A}_snap(e){const A=Math.round(e/this._step)*this._step;return parseFloat(A.toPrecision(15))}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class Ud extends Ft{constructor(e,A,t,i){super(e,A,t,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this._values=Array.isArray(i)?i:Object.values(i),this._names=Array.isArray(i)?i:Object.keys(i),this._names.forEach(r=>{const s=document.createElement("option");s.innerHTML=r,this.$select.appendChild(s)}),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.updateDisplay()}updateDisplay(){const e=this.getValue(),A=this._values.indexOf(e);return this.$select.selectedIndex=A,this.$display.innerHTML=A===-1?e:this._names[A],this}}let yd=class extends Ft{constructor(e,A,t){super(e,A,t,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",i=>{i.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}},Hl=!1;class hl{constructor({parent:e,autoPlace:A=e===void 0,container:t,width:i,title:r="Controls",injectStyles:s=!0,touchStyles:a=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("div"),this.$title.classList.add("title"),this.$title.setAttribute("role","button"),this.$title.setAttribute("aria-expanded",!0),this.$title.setAttribute("tabindex",0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("keydown",o=>{o.code!=="Enter"&&o.code!=="Space"||(o.preventDefault(),this.$title.click())}),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(r),a&&this.domElement.classList.add("allow-touch-styles"),this.parent)return this.parent.children.push(this),this.parent.folders.push(this),void this.parent.$children.appendChild(this.domElement);this.domElement.classList.add("root"),!Hl&&s&&(function(o){const l=document.createElement("style");l.innerHTML=o;const c=document.querySelector("head link[rel=stylesheet], head style");c?document.head.insertBefore(l,c):document.head.appendChild(l)}('.lil-gui{--background-color:#1f1f1f;--text-color:#ebebeb;--title-background-color:#111;--title-text-color:#ebebeb;--widget-color:#424242;--hover-color:#4f4f4f;--focus-color:#595959;--number-color:#2cc9ff;--string-color:#a2db3c;--font-size:11px;--input-font-size:11px;--font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;--font-family-mono:Menlo,Monaco,Consolas,"Droid Sans Mono",monospace;--padding:4px;--spacing:4px;--widget-height:20px;--name-width:45%;--slider-knob-width:2px;--slider-input-width:27%;--color-input-width:27%;--slider-input-min-width:45px;--color-input-min-width:45px;--folder-indent:7px;--widget-padding:0 0 0 3px;--widget-border-radius:2px;--checkbox-size:calc(var(--widget-height)*0.75);--scrollbar-width:5px;background-color:var(--background-color);color:var(--text-color);font-family:var(--font-family);font-size:var(--font-size);font-style:normal;font-weight:400;line-height:1;text-align:left;touch-action:manipulation;user-select:none;-webkit-user-select:none}.lil-gui,.lil-gui *{box-sizing:border-box;margin:0;padding:0}.lil-gui.root{display:flex;flex-direction:column;width:var(--width,245px)}.lil-gui.root>.title{background:var(--title-background-color);color:var(--title-text-color)}.lil-gui.root>.children{overflow-x:hidden;overflow-y:auto}.lil-gui.root>.children::-webkit-scrollbar{background:var(--background-color);height:var(--scrollbar-width);width:var(--scrollbar-width)}.lil-gui.root>.children::-webkit-scrollbar-thumb{background:var(--focus-color);border-radius:var(--scrollbar-width)}.lil-gui.force-touch-styles{--widget-height:28px;--padding:6px;--spacing:6px;--font-size:13px;--input-font-size:16px;--folder-indent:10px;--scrollbar-width:7px;--slider-input-min-width:50px;--color-input-min-width:65px}.lil-gui.autoPlace{max-height:100%;position:fixed;right:15px;top:0;z-index:1001}.lil-gui .controller{align-items:center;display:flex;margin:var(--spacing) 0;padding:0 var(--padding)}.lil-gui .controller.disabled{opacity:.5}.lil-gui .controller.disabled,.lil-gui .controller.disabled *{pointer-events:none!important}.lil-gui .controller>.name{flex-shrink:0;line-height:var(--widget-height);min-width:var(--name-width);padding-right:var(--spacing);white-space:pre}.lil-gui .controller .widget{align-items:center;display:flex;min-height:var(--widget-height);position:relative;width:100%}.lil-gui .controller.string input{color:var(--string-color)}.lil-gui .controller.boolean .widget{cursor:pointer}.lil-gui .controller.color .display{border-radius:var(--widget-border-radius);height:var(--widget-height);position:relative;width:100%}.lil-gui .controller.color input[type=color]{cursor:pointer;height:100%;opacity:0;width:100%}.lil-gui .controller.color input[type=text]{flex-shrink:0;font-family:var(--font-family-mono);margin-left:var(--spacing);min-width:var(--color-input-min-width);width:var(--color-input-width)}.lil-gui .controller.option select{max-width:100%;opacity:0;position:absolute;width:100%}.lil-gui .controller.option .display{background:var(--widget-color);border-radius:var(--widget-border-radius);height:var(--widget-height);line-height:var(--widget-height);max-width:100%;overflow:hidden;padding-left:.55em;padding-right:1.75em;pointer-events:none;position:relative;word-break:break-all}.lil-gui .controller.option .display.active{background:var(--focus-color)}.lil-gui .controller.option .display:after{bottom:0;content:"↕";font-family:lil-gui;padding-right:.375em;position:absolute;right:0;top:0}.lil-gui .controller.option .widget,.lil-gui .controller.option select{cursor:pointer}.lil-gui .controller.number input{color:var(--number-color)}.lil-gui .controller.number.hasSlider input{flex-shrink:0;margin-left:var(--spacing);min-width:var(--slider-input-min-width);width:var(--slider-input-width)}.lil-gui .controller.number .slider{background-color:var(--widget-color);border-radius:var(--widget-border-radius);cursor:ew-resize;height:var(--widget-height);overflow:hidden;padding-right:var(--slider-knob-width);touch-action:pan-y;width:100%}.lil-gui .controller.number .slider.active{background-color:var(--focus-color)}.lil-gui .controller.number .slider.active .fill{opacity:.95}.lil-gui .controller.number .fill{border-right:var(--slider-knob-width) solid var(--number-color);box-sizing:content-box;height:100%}.lil-gui-dragging .lil-gui{--hover-color:var(--widget-color)}.lil-gui-dragging *{cursor:ew-resize!important}.lil-gui-dragging.lil-gui-vertical *{cursor:ns-resize!important}.lil-gui .title{--title-height:calc(var(--widget-height) + var(--spacing)*1.25);-webkit-tap-highlight-color:transparent;text-decoration-skip:objects;cursor:pointer;font-weight:600;height:var(--title-height);line-height:calc(var(--title-height) - 4px);outline:none;padding:0 var(--padding)}.lil-gui .title:before{content:"▾";display:inline-block;font-family:lil-gui;padding-right:2px}.lil-gui .title:active{background:var(--title-background-color);opacity:.75}.lil-gui.root>.title:focus{text-decoration:none!important}.lil-gui.closed>.title:before{content:"▸"}.lil-gui.closed>.children{opacity:0;transform:translateY(-7px)}.lil-gui.closed:not(.transition)>.children{display:none}.lil-gui.transition>.children{overflow:hidden;pointer-events:none;transition-duration:.3s;transition-property:height,opacity,transform;transition-timing-function:cubic-bezier(.2,.6,.35,1)}.lil-gui .children:empty:before{content:"Empty";display:block;font-style:italic;height:var(--widget-height);line-height:var(--widget-height);margin:var(--spacing) 0;opacity:.5;padding:0 var(--padding)}.lil-gui.root>.children>.lil-gui>.title{border-width:0;border-bottom:1px solid var(--widget-color);border-left:0 solid var(--widget-color);border-right:0 solid var(--widget-color);border-top:1px solid var(--widget-color);transition:border-color .3s}.lil-gui.root>.children>.lil-gui.closed>.title{border-bottom-color:transparent}.lil-gui+.controller{border-top:1px solid var(--widget-color);margin-top:0;padding-top:var(--spacing)}.lil-gui .lil-gui .lil-gui>.title{border:none}.lil-gui .lil-gui .lil-gui>.children{border:none;border-left:2px solid var(--widget-color);margin-left:var(--folder-indent)}.lil-gui .lil-gui .controller{border:none}.lil-gui input{-webkit-tap-highlight-color:transparent;background:var(--widget-color);border:0;border-radius:var(--widget-border-radius);color:var(--text-color);font-family:var(--font-family);font-size:var(--input-font-size);height:var(--widget-height);outline:none;width:100%}.lil-gui input:disabled{opacity:1}.lil-gui input[type=number],.lil-gui input[type=text]{padding:var(--widget-padding)}.lil-gui input[type=number]:focus,.lil-gui input[type=text]:focus{background:var(--focus-color)}.lil-gui input::-webkit-inner-spin-button,.lil-gui input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.lil-gui input[type=number]{-moz-appearance:textfield}.lil-gui input[type=checkbox]{appearance:none;-webkit-appearance:none;border-radius:var(--widget-border-radius);cursor:pointer;height:var(--checkbox-size);text-align:center;width:var(--checkbox-size)}.lil-gui input[type=checkbox]:checked:before{content:"✓";font-family:lil-gui;font-size:var(--checkbox-size);line-height:var(--checkbox-size)}.lil-gui button{-webkit-tap-highlight-color:transparent;background:var(--widget-color);border:1px solid var(--widget-color);border-radius:var(--widget-border-radius);color:var(--text-color);cursor:pointer;font-family:var(--font-family);font-size:var(--font-size);height:var(--widget-height);line-height:calc(var(--widget-height) - 4px);outline:none;text-align:center;text-transform:none;width:100%}.lil-gui button:active{background:var(--focus-color)}@font-face{font-family:lil-gui;src:url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff")}@media (pointer:coarse){.lil-gui.allow-touch-styles{--widget-height:28px;--padding:6px;--spacing:6px;--font-size:13px;--input-font-size:16px;--folder-indent:10px;--scrollbar-width:7px;--slider-input-min-width:50px;--color-input-min-width:65px}}@media (hover:hover){.lil-gui .controller.color .display:hover:before{border:1px solid #fff9;border-radius:var(--widget-border-radius);bottom:0;content:" ";display:block;left:0;position:absolute;right:0;top:0}.lil-gui .controller.option .display.focus{background:var(--focus-color)}.lil-gui .controller.option .widget:hover .display{background:var(--hover-color)}.lil-gui .controller.number .slider:hover{background-color:var(--hover-color)}body:not(.lil-gui-dragging) .lil-gui .title:hover{background:var(--title-background-color);opacity:.85}.lil-gui .title:focus{text-decoration:underline var(--focus-color)}.lil-gui input:hover{background:var(--hover-color)}.lil-gui input:active{background:var(--focus-color)}.lil-gui input[type=checkbox]:focus{box-shadow:inset 0 0 0 1px var(--focus-color)}.lil-gui button:hover{background:var(--hover-color);border-color:var(--hover-color)}.lil-gui button:focus{border-color:var(--focus-color)}}'),Hl=!0),t?t.appendChild(this.domElement):A&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),i&&this.domElement.style.setProperty("--width",i+"px"),this.domElement.addEventListener("keydown",o=>o.stopPropagation()),this.domElement.addEventListener("keyup",o=>o.stopPropagation())}add(e,A,t,i,r){if(Object(t)===t)return new Ud(this,e,A,t);const s=e[A];switch(typeof s){case"number":return new xd(this,e,A,t,i,r);case"boolean":return new Bd(this,e,A);case"string":return new yd(this,e,A);case"function":return new xa(this,e,A)}console.error(`gui.add failed
	property:`,A,`
	object:`,e,`
	value:`,s)}addColor(e,A,t=1){return new Cd(this,e,A,t)}addFolder(e){return new hl({parent:this,title:e})}load(e,A=!0){return e.controllers&&this.controllers.forEach(t=>{t instanceof xa||t._name in e.controllers&&t.load(e.controllers[t._name])}),A&&e.folders&&this.folders.forEach(t=>{t._title in e.folders&&t.load(e.folders[t._title])}),this}save(e=!0){const A={controllers:{},folders:{}};return this.controllers.forEach(t=>{if(!(t instanceof xa)){if(t._name in A.controllers)throw new Error(`Cannot save GUI with duplicate property "${t._name}"`);A.controllers[t._name]=t.save()}}),e&&this.folders.forEach(t=>{if(t._title in A.folders)throw new Error(`Cannot save GUI with duplicate folder "${t._title}"`);A.folders[t._title]=t.save()}),A}open(e=!0){return this._closed=!e,this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._closed=!e,this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const A=this.$children.clientHeight;this.$children.style.height=A+"px",this.domElement.classList.add("transition");const t=r=>{r.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",t))};this.$children.addEventListener("transitionend",t);const i=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=i+"px"})}),this}title(e){return this._title=e,this.$title.innerHTML=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(A=>A.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(A=>{e=e.concat(A.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(A=>{e=e.concat(A.foldersRecursive())}),e}}var Mt=(n=>(n[n.STOLEN_NECKLACE=0]="STOLEN_NECKLACE",n[n.SHADER_LAMP=1]="SHADER_LAMP",n[n.SPACE_COLOR=2]="SPACE_COLOR",n[n.SINUSOID=3]="SINUSOID",n))(Mt||{}),oe=(n=>(n.SETTINGS_CHANGED="settings-changed",n.CHANGE_THEME="change-theme",n.THEME_CHANGED="theme-changed",n.SHOW_IMPRINT="show-imprint",n.HIDE_IMPRINT="hide-imprint",n.UPDATE_VISIBLE="update-visible",n.MODEL_CHANGED="model-changed",n.CREATE_SPHERE="create-sphere",n.SET_NECKLACE_CONFIGURATION_BY_NUMBER="necklace-configuration-by-number",n.SET_NECKLACE_CONFIGURATION_BY_STRING="necklace-configuration-by-string",n.UPDATE_SPHERE_MATERIAL="update-material",n.NECKLACE_CUT="necklace-cut",n))(oe||{});(n=>{function e(A){const t=new Event(A.toString(),{bubbles:!0});document.body.dispatchEvent(t)}n.dispatchEvent=e})(oe||(oe={}));class vh{constructor(e,A){let t=!1;new MutationObserver(r=>{t&&r.forEach((s,a)=>A(s,a))}).observe(e,{attributes:!0,attributeFilter:["class"]}),t=!0}}const Sd="modulepreload",Md=function(n){return"/necklace-splitting/"+n},Pl={},Fd=function(e,A,t){let i=Promise.resolve();if(A&&A.length>0){document.getElementsByTagName("link");const s=document.querySelector("meta[property=csp-nonce]"),a=(s==null?void 0:s.nonce)||(s==null?void 0:s.getAttribute("nonce"));i=Promise.allSettled(A.map(o=>{if(o=Md(o),o in Pl)return;Pl[o]=!0;const l=o.endsWith(".css"),c=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${o}"]${c}`))return;const u=document.createElement("link");if(u.rel=l?"stylesheet":Sd,l||(u.as="script"),u.crossOrigin="",u.href=o,a&&u.setAttribute("nonce",a),document.head.appendChild(u),l)return new Promise((h,p)=>{u.addEventListener("load",h),u.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${o}`)))})}))}function r(s){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=s,window.dispatchEvent(a),!a.defaultPrevented)throw s}return i.then(s=>{for(const a of s||[])a.status==="rejected"&&r(a.reason);return e().catch(r)})};/*!
 * html2canvas 1.4.1 <https://html2canvas.hertzen.com>
 * Copyright (c) 2022 Niklas von Hertzen <https://hertzen.com>
 * Released under MIT License
 *//*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */var bo=function(n,e){return bo=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(A,t){A.__proto__=t}||function(A,t){for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(A[i]=t[i])},bo(n,e)};function wt(n,e){if(typeof e!="function"&&e!==null)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");bo(n,e);function A(){this.constructor=n}n.prototype=e===null?Object.create(e):(A.prototype=e.prototype,new A)}var To=function(){return To=Object.assign||function(e){for(var A,t=1,i=arguments.length;t<i;t++){A=arguments[t];for(var r in A)Object.prototype.hasOwnProperty.call(A,r)&&(e[r]=A[r])}return e},To.apply(this,arguments)};function kA(n,e,A,t){function i(r){return r instanceof A?r:new A(function(s){s(r)})}return new(A||(A=Promise))(function(r,s){function a(c){try{l(t.next(c))}catch(u){s(u)}}function o(c){try{l(t.throw(c))}catch(u){s(u)}}function l(c){c.done?r(c.value):i(c.value).then(a,o)}l((t=t.apply(n,[])).next())})}function DA(n,e){var A={label:0,sent:function(){if(r[0]&1)throw r[1];return r[1]},trys:[],ops:[]},t,i,r,s;return s={next:a(0),throw:a(1),return:a(2)},typeof Symbol=="function"&&(s[Symbol.iterator]=function(){return this}),s;function a(l){return function(c){return o([l,c])}}function o(l){if(t)throw new TypeError("Generator is already executing.");for(;A;)try{if(t=1,i&&(r=l[0]&2?i.return:l[0]?i.throw||((r=i.return)&&r.call(i),0):i.next)&&!(r=r.call(i,l[1])).done)return r;switch(i=0,r&&(l=[l[0]&2,r.value]),l[0]){case 0:case 1:r=l;break;case 4:return A.label++,{value:l[1],done:!1};case 5:A.label++,i=l[1],l=[0];continue;case 7:l=A.ops.pop(),A.trys.pop();continue;default:if(r=A.trys,!(r=r.length>0&&r[r.length-1])&&(l[0]===6||l[0]===2)){A=0;continue}if(l[0]===3&&(!r||l[1]>r[0]&&l[1]<r[3])){A.label=l[1];break}if(l[0]===6&&A.label<r[1]){A.label=r[1],r=l;break}if(r&&A.label<r[2]){A.label=r[2],A.ops.push(l);break}r[2]&&A.ops.pop(),A.trys.pop();continue}l=e.call(n,A)}catch(c){l=[6,c],i=0}finally{t=r=0}if(l[0]&5)throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}}function Hr(n,e,A){if(arguments.length===2)for(var t=0,i=e.length,r;t<i;t++)(r||!(t in e))&&(r||(r=Array.prototype.slice.call(e,0,t)),r[t]=e[t]);return n.concat(r||e)}var Xt=function(){function n(e,A,t,i){this.left=e,this.top=A,this.width=t,this.height=i}return n.prototype.add=function(e,A,t,i){return new n(this.left+e,this.top+A,this.width+t,this.height+i)},n.fromClientRect=function(e,A){return new n(A.left+e.windowBounds.left,A.top+e.windowBounds.top,A.width,A.height)},n.fromDOMRectList=function(e,A){var t=Array.from(A).find(function(i){return i.width!==0});return t?new n(t.left+e.windowBounds.left,t.top+e.windowBounds.top,t.width,t.height):n.EMPTY},n.EMPTY=new n(0,0,0,0),n}(),ta=function(n,e){return Xt.fromClientRect(n,e.getBoundingClientRect())},bd=function(n){var e=n.body,A=n.documentElement;if(!e||!A)throw new Error("Unable to get document size");var t=Math.max(Math.max(e.scrollWidth,A.scrollWidth),Math.max(e.offsetWidth,A.offsetWidth),Math.max(e.clientWidth,A.clientWidth)),i=Math.max(Math.max(e.scrollHeight,A.scrollHeight),Math.max(e.offsetHeight,A.offsetHeight),Math.max(e.clientHeight,A.clientHeight));return new Xt(0,0,t,i)},na=function(n){for(var e=[],A=0,t=n.length;A<t;){var i=n.charCodeAt(A++);if(i>=55296&&i<=56319&&A<t){var r=n.charCodeAt(A++);(r&64512)===56320?e.push(((i&1023)<<10)+(r&1023)+65536):(e.push(i),A--)}else e.push(i)}return e},pA=function(){for(var n=[],e=0;e<arguments.length;e++)n[e]=arguments[e];if(String.fromCodePoint)return String.fromCodePoint.apply(String,n);var A=n.length;if(!A)return"";for(var t=[],i=-1,r="";++i<A;){var s=n[i];s<=65535?t.push(s):(s-=65536,t.push((s>>10)+55296,s%1024+56320)),(i+1===A||t.length>16384)&&(r+=String.fromCharCode.apply(String,t),t.length=0)}return r},Ol="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Td=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(var Pr=0;Pr<Ol.length;Pr++)Td[Ol.charCodeAt(Pr)]=Pr;var Nl="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",ir=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(var Or=0;Or<Nl.length;Or++)ir[Nl.charCodeAt(Or)]=Or;var Qd=function(n){var e=n.length*.75,A=n.length,t,i=0,r,s,a,o;n[n.length-1]==="="&&(e--,n[n.length-2]==="="&&e--);var l=typeof ArrayBuffer<"u"&&typeof Uint8Array<"u"&&typeof Uint8Array.prototype.slice<"u"?new ArrayBuffer(e):new Array(e),c=Array.isArray(l)?l:new Uint8Array(l);for(t=0;t<A;t+=4)r=ir[n.charCodeAt(t)],s=ir[n.charCodeAt(t+1)],a=ir[n.charCodeAt(t+2)],o=ir[n.charCodeAt(t+3)],c[i++]=r<<2|s>>4,c[i++]=(s&15)<<4|a>>2,c[i++]=(a&3)<<6|o&63;return l},Id=function(n){for(var e=n.length,A=[],t=0;t<e;t+=2)A.push(n[t+1]<<8|n[t]);return A},Ld=function(n){for(var e=n.length,A=[],t=0;t<e;t+=4)A.push(n[t+3]<<24|n[t+2]<<16|n[t+1]<<8|n[t]);return A},Gn=5,fl=11,Ua=2,Rd=fl-Gn,Eh=65536>>Gn,Dd=1<<Gn,ya=Dd-1,Hd=1024>>Gn,Pd=Eh+Hd,Od=Pd,Nd=32,Gd=Od+Nd,Vd=65536>>fl,kd=1<<Rd,Kd=kd-1,Gl=function(n,e,A){return n.slice?n.slice(e,A):new Uint16Array(Array.prototype.slice.call(n,e,A))},zd=function(n,e,A){return n.slice?n.slice(e,A):new Uint32Array(Array.prototype.slice.call(n,e,A))},Wd=function(n,e){var A=Qd(n),t=Array.isArray(A)?Ld(A):new Uint32Array(A),i=Array.isArray(A)?Id(A):new Uint16Array(A),r=24,s=Gl(i,r/2,t[4]/2),a=t[5]===2?Gl(i,(r+t[4])/2):zd(t,Math.ceil((r+t[4])/4));return new Xd(t[0],t[1],t[2],t[3],s,a)},Xd=function(){function n(e,A,t,i,r,s){this.initialValue=e,this.errorValue=A,this.highStart=t,this.highValueIndex=i,this.index=r,this.data=s}return n.prototype.get=function(e){var A;if(e>=0){if(e<55296||e>56319&&e<=65535)return A=this.index[e>>Gn],A=(A<<Ua)+(e&ya),this.data[A];if(e<=65535)return A=this.index[Eh+(e-55296>>Gn)],A=(A<<Ua)+(e&ya),this.data[A];if(e<this.highStart)return A=Gd-Vd+(e>>fl),A=this.index[A],A+=e>>Gn&Kd,A=this.index[A],A=(A<<Ua)+(e&ya),this.data[A];if(e<=1114111)return this.data[this.highValueIndex]}return this.errorValue},n}(),Vl="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Yd=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(var Nr=0;Nr<Vl.length;Nr++)Yd[Vl.charCodeAt(Nr)]=Nr;var Jd="KwAAAAAAAAAACA4AUD0AADAgAAACAAAAAAAIABAAGABAAEgAUABYAGAAaABgAGgAYgBqAF8AZwBgAGgAcQB5AHUAfQCFAI0AlQCdAKIAqgCyALoAYABoAGAAaABgAGgAwgDKAGAAaADGAM4A0wDbAOEA6QDxAPkAAQEJAQ8BFwF1AH0AHAEkASwBNAE6AUIBQQFJAVEBWQFhAWgBcAF4ATAAgAGGAY4BlQGXAZ8BpwGvAbUBvQHFAc0B0wHbAeMB6wHxAfkBAQIJAvEBEQIZAiECKQIxAjgCQAJGAk4CVgJeAmQCbAJ0AnwCgQKJApECmQKgAqgCsAK4ArwCxAIwAMwC0wLbAjAA4wLrAvMC+AIAAwcDDwMwABcDHQMlAy0DNQN1AD0DQQNJA0kDSQNRA1EDVwNZA1kDdQB1AGEDdQBpA20DdQN1AHsDdQCBA4kDkQN1AHUAmQOhA3UAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AKYDrgN1AHUAtgO+A8YDzgPWAxcD3gPjA+sD8wN1AHUA+wMDBAkEdQANBBUEHQQlBCoEFwMyBDgEYABABBcDSARQBFgEYARoBDAAcAQzAXgEgASIBJAEdQCXBHUAnwSnBK4EtgS6BMIEyAR1AHUAdQB1AHUAdQCVANAEYABgAGAAYABgAGAAYABgANgEYADcBOQEYADsBPQE/AQEBQwFFAUcBSQFLAU0BWQEPAVEBUsFUwVbBWAAYgVgAGoFcgV6BYIFigWRBWAAmQWfBaYFYABgAGAAYABgAKoFYACxBbAFuQW6BcEFwQXHBcEFwQXPBdMF2wXjBeoF8gX6BQIGCgYSBhoGIgYqBjIGOgZgAD4GRgZMBmAAUwZaBmAAYABgAGAAYABgAGAAYABgAGAAYABgAGIGYABpBnAGYABgAGAAYABgAGAAYABgAGAAYAB4Bn8GhQZgAGAAYAB1AHcDFQSLBmAAYABgAJMGdQA9A3UAmwajBqsGqwaVALMGuwbDBjAAywbSBtIG1QbSBtIG0gbSBtIG0gbdBuMG6wbzBvsGAwcLBxMHAwcbByMHJwcsBywHMQcsB9IGOAdAB0gHTgfSBkgHVgfSBtIG0gbSBtIG0gbSBtIG0gbSBiwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdgAGAALAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdbB2MHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB2kH0gZwB64EdQB1AHUAdQB1AHUAdQB1AHUHfQdgAIUHjQd1AHUAlQedB2AAYAClB6sHYACzB7YHvgfGB3UAzgfWBzMB3gfmB1EB7gf1B/0HlQENAQUIDQh1ABUIHQglCBcDLQg1CD0IRQhNCEEDUwh1AHUAdQBbCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIcAh3CHoIMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIgggwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAALAcsBywHLAcsBywHLAcsBywHLAcsB4oILAcsB44I0gaWCJ4Ipgh1AHUAqgiyCHUAdQB1AHUAdQB1AHUAdQB1AHUAtwh8AXUAvwh1AMUIyQjRCNkI4AjoCHUAdQB1AO4I9gj+CAYJDgkTCS0HGwkjCYIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiAAIAAAAFAAYABgAGIAXwBgAHEAdQBFAJUAogCyAKAAYABgAEIA4ABGANMA4QDxAMEBDwE1AFwBLAE6AQEBUQF4QkhCmEKoQrhCgAHIQsAB0MLAAcABwAHAAeDC6ABoAHDCwMMAAcABwAHAAdDDGMMAAcAB6MM4wwjDWMNow3jDaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAEjDqABWw6bDqABpg6gAaABoAHcDvwOPA+gAaABfA/8DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DpcPAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcAB9cPKwkyCToJMAB1AHUAdQBCCUoJTQl1AFUJXAljCWcJawkwADAAMAAwAHMJdQB2CX4JdQCECYoJjgmWCXUAngkwAGAAYABxAHUApgn3A64JtAl1ALkJdQDACTAAMAAwADAAdQB1AHUAdQB1AHUAdQB1AHUAowYNBMUIMAAwADAAMADICcsJ0wnZCRUE4QkwAOkJ8An4CTAAMAB1AAAKvwh1AAgKDwoXCh8KdQAwACcKLgp1ADYKqAmICT4KRgowADAAdQB1AE4KMAB1AFYKdQBeCnUAZQowADAAMAAwADAAMAAwADAAMAAVBHUAbQowADAAdQC5CXUKMAAwAHwBxAijBogEMgF9CoQKiASMCpQKmgqIBKIKqgquCogEDQG2Cr4KxgrLCjAAMADTCtsKCgHjCusK8Qr5CgELMAAwADAAMAB1AIsECQsRC3UANAEZCzAAMAAwADAAMAB1ACELKQswAHUANAExCzkLdQBBC0kLMABRC1kLMAAwADAAMAAwADAAdQBhCzAAMAAwAGAAYABpC3ELdwt/CzAAMACHC4sLkwubC58Lpwt1AK4Ltgt1APsDMAAwADAAMAAwADAAMAAwAL4LwwvLC9IL1wvdCzAAMADlC+kL8Qv5C/8LSQswADAAMAAwADAAMAAwADAAMAAHDDAAMAAwADAAMAAODBYMHgx1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1ACYMMAAwADAAdQB1AHUALgx1AHUAdQB1AHUAdQA2DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AD4MdQBGDHUAdQB1AHUAdQB1AEkMdQB1AHUAdQB1AFAMMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQBYDHUAdQB1AF8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUA+wMVBGcMMAAwAHwBbwx1AHcMfwyHDI8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAYABgAJcMMAAwADAAdQB1AJ8MlQClDDAAMACtDCwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB7UMLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AA0EMAC9DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAsBywHLAcsBywHLAcsBywHLQcwAMEMyAwsBywHLAcsBywHLAcsBywHLAcsBywHzAwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1ANQM2QzhDDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMABgAGAAYABgAGAAYABgAOkMYADxDGAA+AwADQYNYABhCWAAYAAODTAAMAAwADAAFg1gAGAAHg37AzAAMAAwADAAYABgACYNYAAsDTQNPA1gAEMNPg1LDWAAYABgAGAAYABgAGAAYABgAGAAUg1aDYsGVglhDV0NcQBnDW0NdQ15DWAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAlQCBDZUAiA2PDZcNMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAnw2nDTAAMAAwADAAMAAwAHUArw23DTAAMAAwADAAMAAwADAAMAAwADAAMAB1AL8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQDHDTAAYABgAM8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA1w11ANwNMAAwAD0B5A0wADAAMAAwADAAMADsDfQN/A0EDgwOFA4wABsOMAAwADAAMAAwADAAMAAwANIG0gbSBtIG0gbSBtIG0gYjDigOwQUuDsEFMw7SBjoO0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGQg5KDlIOVg7SBtIGXg5lDm0OdQ7SBtIGfQ6EDooOjQ6UDtIGmg6hDtIG0gaoDqwO0ga0DrwO0gZgAGAAYADEDmAAYAAkBtIGzA5gANIOYADaDokO0gbSBt8O5w7SBu8O0gb1DvwO0gZgAGAAxA7SBtIG0gbSBtIGYABgAGAAYAAED2AAsAUMD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHJA8sBywHLAcsBywHLAccDywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywPLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAc0D9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHPA/SBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gYUD0QPlQCVAJUAMAAwADAAMACVAJUAlQCVAJUAlQCVAEwPMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA//8EAAQABAAEAAQABAAEAAQABAANAAMAAQABAAIABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQACgATABcAHgAbABoAHgAXABYAEgAeABsAGAAPABgAHABLAEsASwBLAEsASwBLAEsASwBLABgAGAAeAB4AHgATAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYAGwASAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWAA0AEQAeAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAFAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJABYAGgAbABsAGwAeAB0AHQAeAE8AFwAeAA0AHgAeABoAGwBPAE8ADgBQAB0AHQAdAE8ATwAXAE8ATwBPABYAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAFAATwBAAE8ATwBPAEAATwBQAFAATwBQAB4AHgAeAB4AHgAeAB0AHQAdAB0AHgAdAB4ADgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgBQAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkACQAJAAkACQAJAAkABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAFAAHgAeAB4AKwArAFAAUABQAFAAGABQACsAKwArACsAHgAeAFAAHgBQAFAAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUAAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAYAA0AKwArAB4AHgAbACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAB4ABAAEAB4ABAAEABMABAArACsAKwArACsAKwArACsAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAKwArACsAKwBWAFYAVgBWAB4AHgArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AGgAaABoAGAAYAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQAEwAEACsAEwATAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABLAEsASwBLAEsASwBLAEsASwBLABoAGQAZAB4AUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABMAUAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABABQAFAABAAEAB4ABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUAAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAFAABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQAUABQAB4AHgAYABMAUAArACsABAAbABsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAFAABAAEAAQABAAEAFAABAAEAAQAUAAEAAQABAAEAAQAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArACsAHgArAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAUAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEAA0ADQBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUAArACsAKwBQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABABQACsAKwArACsAKwArACsAKwAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUAAaABoAUABQAFAAUABQAEwAHgAbAFAAHgAEACsAKwAEAAQABAArAFAAUABQAFAAUABQACsAKwArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQACsAUABQACsAKwAEACsABAAEAAQABAAEACsAKwArACsABAAEACsAKwAEAAQABAArACsAKwAEACsAKwArACsAKwArACsAUABQAFAAUAArAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLAAQABABQAFAAUAAEAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAArACsAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AGwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAKwArACsAKwArAAQABAAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAAQAUAArAFAAUABQAFAAUABQACsAKwArAFAAUABQACsAUABQAFAAUAArACsAKwBQAFAAKwBQACsAUABQACsAKwArAFAAUAArACsAKwBQAFAAUAArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAAQABAAEAAQABAArACsAKwAEAAQABAArAAQABAAEAAQAKwArAFAAKwArACsAKwArACsABAArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAHgAeAB4AHgAeAB4AGwAeACsAKwArACsAKwAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAUABQAFAAKwArACsAKwArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwAOAFAAUABQAFAAUABQAFAAHgBQAAQABAAEAA4AUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAKwArAAQAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAKwArACsAKwArACsAUAArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABABQAB4AKwArACsAKwBQAFAAUAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQABoAUABQAFAAUABQAFAAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQACsAUAArACsAUABQAFAAUABQAFAAUAArACsAKwAEACsAKwArACsABAAEAAQABAAEAAQAKwAEACsABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgAqACsAKwArACsAGwBcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAeAEsASwBLAEsASwBLAEsASwBLAEsADQANACsAKwArACsAKwBcAFwAKwBcACsAXABcAFwAXABcACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAXAArAFwAXABcAFwAXABcAFwAXABcAFwAKgBcAFwAKgAqACoAKgAqACoAKgAqACoAXAArACsAXABcAFwAXABcACsAXAArACoAKgAqACoAKgAqACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwBcAFwAXABcAFAADgAOAA4ADgAeAA4ADgAJAA4ADgANAAkAEwATABMAEwATAAkAHgATAB4AHgAeAAQABAAeAB4AHgAeAB4AHgBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQAFAADQAEAB4ABAAeAAQAFgARABYAEQAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAAQABAAEAAQADQAEAAQAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAA0ADQAeAB4AHgAeAB4AHgAEAB4AHgAeAB4AHgAeACsAHgAeAA4ADgANAA4AHgAeAB4AHgAeAAkACQArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgBcAEsASwBLAEsASwBLAEsASwBLAEsADQANAB4AHgAeAB4AXABcAFwAXABcAFwAKgAqACoAKgBcAFwAXABcACoAKgAqAFwAKgAqACoAXABcACoAKgAqACoAKgAqACoAXABcAFwAKgAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqAFwAKgBLAEsASwBLAEsASwBLAEsASwBLACoAKgAqACoAKgAqAFAAUABQAFAAUABQACsAUAArACsAKwArACsAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAKwBQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsABAAEAAQAHgANAB4AHgAeAB4AHgAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUAArACsADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWABEAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQANAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAANAA0AKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUAArAAQABAArACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqAA0ADQAVAFwADQAeAA0AGwBcACoAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwAeAB4AEwATAA0ADQAOAB4AEwATAB4ABAAEAAQACQArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAHgArACsAKwATABMASwBLAEsASwBLAEsASwBLAEsASwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAXABcAFwAXABcACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAXAArACsAKwAqACoAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsAHgAeAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKwAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKwArAAQASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACoAKgAqACoAKgAqACoAXAAqACoAKgAqACoAKgArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABABQAFAAUABQAFAAUABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwANAA0AHgANAA0ADQANAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwAeAB4AHgAeAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArAA0ADQANAA0ADQBLAEsASwBLAEsASwBLAEsASwBLACsAKwArAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUAAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAAQAUABQAFAAUABQAFAABABQAFAABAAEAAQAUAArACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQACsAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQACsAKwAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQACsAHgAeAB4AHgAeAB4AHgAOAB4AKwANAA0ADQANAA0ADQANAAkADQANAA0ACAAEAAsABAAEAA0ACQANAA0ADAAdAB0AHgAXABcAFgAXABcAFwAWABcAHQAdAB4AHgAUABQAFAANAAEAAQAEAAQABAAEAAQACQAaABoAGgAaABoAGgAaABoAHgAXABcAHQAVABUAHgAeAB4AHgAeAB4AGAAWABEAFQAVABUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ADQAeAA0ADQANAA0AHgANAA0ADQAHAB4AHgAeAB4AKwAEAAQABAAEAAQABAAEAAQABAAEAFAAUAArACsATwBQAFAAUABQAFAAHgAeAB4AFgARAE8AUABPAE8ATwBPAFAAUABQAFAAUAAeAB4AHgAWABEAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArABsAGwAbABsAGwAbABsAGgAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGgAbABsAGwAbABoAGwAbABoAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAHgAeAFAAGgAeAB0AHgBQAB4AGgAeAB4AHgAeAB4AHgAeAB4AHgBPAB4AUAAbAB4AHgBQAFAAUABQAFAAHgAeAB4AHQAdAB4AUAAeAFAAHgBQAB4AUABPAFAAUAAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgBQAFAAUABQAE8ATwBQAFAAUABQAFAATwBQAFAATwBQAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAUABQAFAATwBPAE8ATwBPAE8ATwBPAE8ATwBQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABPAB4AHgArACsAKwArAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHQAdAB4AHgAeAB0AHQAeAB4AHQAeAB4AHgAdAB4AHQAbABsAHgAdAB4AHgAeAB4AHQAeAB4AHQAdAB0AHQAeAB4AHQAeAB0AHgAdAB0AHQAdAB0AHQAeAB0AHgAeAB4AHgAeAB0AHQAdAB0AHgAeAB4AHgAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB0AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAdAB0AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAWABEAHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AHQAdAB0AHgAeAB0AHgAeAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlAB4AHQAdAB4AHgAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AJQAlAB0AHQAlAB4AJQAlACUAIAAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAdAB0AHQAeAB0AJQAdAB0AHgAdAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAdAB0AHQAdACUAHgAlACUAJQAdACUAJQAdAB0AHQAlACUAHQAdACUAHQAdACUAJQAlAB4AHQAeAB4AHgAeAB0AHQAlAB0AHQAdAB0AHQAdACUAJQAlACUAJQAdACUAJQAgACUAHQAdACUAJQAlACUAJQAlACUAJQAeAB4AHgAlACUAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AFwAXABcAFwAXABcAHgATABMAJQAeAB4AHgAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARABYAEQAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAeAB4AKwArACsAKwArABMADQANAA0AUAATAA0AUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUAANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAA0ADQANAA0ADQANAA0ADQAeAA0AFgANAB4AHgAXABcAHgAeABcAFwAWABEAFgARABYAEQAWABEADQANAA0ADQATAFAADQANAB4ADQANAB4AHgAeAB4AHgAMAAwADQANAA0AHgANAA0AFgANAA0ADQANAA0ADQANAA0AHgANAB4ADQANAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArAA0AEQARACUAJQBHAFcAVwAWABEAFgARABYAEQAWABEAFgARACUAJQAWABEAFgARABYAEQAWABEAFQAWABEAEQAlAFcAVwBXAFcAVwBXAFcAVwBXAAQABAAEAAQABAAEACUAVwBXAFcAVwA2ACUAJQBXAFcAVwBHAEcAJQAlACUAKwBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBRAFcAUQBXAFEAVwBXAFcAVwBXAFcAUQBXAFcAVwBXAFcAVwBRAFEAKwArAAQABAAVABUARwBHAFcAFQBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBRAFcAVwBXAFcAVwBXAFEAUQBXAFcAVwBXABUAUQBHAEcAVwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwAlACUAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACsAKwArACsAKwArACsAKwArACsAKwArAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBPAE8ATwBPAE8ATwBPAE8AJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADQATAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQAHgBQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAeAA0ADQANAA0ADQArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAAQAUABQAFAABABQAFAAUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAeAB4AHgAeAAQAKwArACsAUABQAFAAUABQAFAAHgAeABoAHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADgAOABMAEwArACsAKwArACsAKwArACsABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUAAeAB4AHgBQAA4AUABQAAQAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAB4AWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYACsAKwArAAQAHgAeAB4AHgAeAB4ADQANAA0AHgAeAB4AHgArAFAASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArAB4AHgBcAFwAXABcAFwAKgBcAFwAXABcAFwAXABcAFwAXABcAEsASwBLAEsASwBLAEsASwBLAEsAXABcAFwAXABcACsAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAFAAUABQAAQAUABQAFAAUABQAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAHgANAA0ADQBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAKgAqACoAXABcACoAKgBcAFwAXABcAFwAKgAqAFwAKgBcACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAA0ADQBQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQADQAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAVABVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBUAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVACsAKwArACsAKwArACsAKwArACsAKwArAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAKwArACsAKwBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAKwArACsAKwAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArACsAKwArAFYABABWAFYAVgBWAFYAVgBWAFYAVgBWAB4AVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgArAFYAVgBWAFYAVgArAFYAKwBWAFYAKwBWAFYAKwBWAFYAVgBWAFYAVgBWAFYAVgBWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAEQAWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAaAB4AKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAGAARABEAGAAYABMAEwAWABEAFAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACUAJQAlACUAJQAWABEAFgARABYAEQAWABEAFgARABYAEQAlACUAFgARACUAJQAlACUAJQAlACUAEQAlABEAKwAVABUAEwATACUAFgARABYAEQAWABEAJQAlACUAJQAlACUAJQAlACsAJQAbABoAJQArACsAKwArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAcAKwATACUAJQAbABoAJQAlABYAEQAlACUAEQAlABEAJQBXAFcAVwBXAFcAVwBXAFcAVwBXABUAFQAlACUAJQATACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXABYAJQARACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAWACUAEQAlABYAEQARABYAEQARABUAVwBRAFEAUQBRAFEAUQBRAFEAUQBRAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcARwArACsAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXACsAKwBXAFcAVwBXAFcAVwArACsAVwBXAFcAKwArACsAGgAbACUAJQAlABsAGwArAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAAQAB0AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsADQANAA0AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAA0AUABQAFAAUAArACsAKwArAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwBQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAUABQAFAAUABQAAQABAAEACsABAAEACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAKwBQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAA0ADQANAA0ADQANAA0ADQAeACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAArACsAKwArAFAAUABQAFAAUAANAA0ADQANAA0ADQAUACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsADQANAA0ADQANAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArAAQABAANACsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAB4AHgAeAB4AHgArACsAKwArACsAKwAEAAQABAAEAAQABAAEAA0ADQAeAB4AHgAeAB4AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsASwBLAEsASwBLAEsASwBLAEsASwANAA0ADQANAFAABAAEAFAAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAeAA4AUAArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAADQANAB4ADQAEAAQABAAEAB4ABAAEAEsASwBLAEsASwBLAEsASwBLAEsAUAAOAFAADQANAA0AKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAA0AHgANAA0AHgAEACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAA0AKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsABAAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAUAArACsAKwArACsAKwAEACsAKwArACsAKwBQAFAAUABQAFAABAAEACsAKwAEAAQABAAEAAQABAAEACsAKwArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABABQAFAAUABQAA0ADQANAA0AHgBLAEsASwBLAEsASwBLAEsASwBLAA0ADQArAB4ABABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUAAeAFAAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABAAEAAQADgANAA0AEwATAB4AHgAeAA0ADQANAA0ADQANAA0ADQANAA0ADQANAA0ADQANAFAAUABQAFAABAAEACsAKwAEAA0ADQAeAFAAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKwArACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBcAFwADQANAA0AKgBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQAKwAEAAQAKwArAAQABAAEAAQAUAAEAFAABAAEAA0ADQANACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABABQAA4AUAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAOAB4ADQANAA0ADQAOAB4ABAArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAA0ADQANAFAADgAOAA4ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAFAADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAOABMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAArACsAKwAEACsABAAEACsABAAEAAQABAAEAAQABABQAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAaABoAGgAaAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABIAEgAQwBDAEMAUABQAFAAUABDAFAAUABQAEgAQwBIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABDAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAJAAkACQAJAAkACQAJABYAEQArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwANAA0AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAANACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQANAB4AHgAeAB4AHgAeAFAAUABQAFAADQAeACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAA0AHgAeACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAARwBHABUARwAJACsAKwArACsAKwArACsAKwArACsAKwAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUQBRAFEAKwArACsAKwArACsAKwArACsAKwArACsAKwBRAFEAUQBRACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAHgAEAAQADQAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQABAAEAAQABAAeAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQAHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAKwArAFAAKwArAFAAUAArACsAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUAArAFAAUABQAFAAUABQAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAHgAeAFAAUABQAFAAUAArAFAAKwArACsAUABQAFAAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeACsAKwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4ABAAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAHgAeAA0ADQANAA0AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArAAQABAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwBQAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArABsAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAB4AHgAeAB4ABAAEAAQABAAEAAQABABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArABYAFgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAGgBQAFAAUAAaAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUAArACsAKwArACsAKwBQACsAKwArACsAUAArAFAAKwBQACsAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUAArAFAAKwBQACsAUAArAFAAUAArAFAAKwArAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAKwBQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AJQAlACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeACUAJQAlAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAlACUAJQAlACUAHgAlACUAJQAlACUAIAAgACAAJQAlACAAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACEAIQAhACEAIQAlACUAIAAgACUAJQAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAIAAlACUAJQAlACAAIAAgACUAIAAgACAAJQAlACUAJQAlACUAJQAgACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAlAB4AJQAeACUAJQAlACUAJQAgACUAJQAlACUAHgAlAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACAAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABcAFwAXABUAFQAVAB4AHgAeAB4AJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAgACUAJQAgACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAIAAgACUAJQAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACAAIAAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACAAIAAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAA==",kl=50,qd=1,Ch=2,xh=3,Zd=4,jd=5,Kl=7,Uh=8,zl=9,ln=10,Qo=11,Wl=12,Io=13,$d=14,rr=15,Lo=16,Gr=17,Ji=18,ep=19,Xl=20,Ro=21,qi=22,Sa=23,Jn=24,et=25,sr=26,ar=27,qn=28,Ap=29,Fn=30,tp=31,Vr=32,kr=33,Do=34,Ho=35,Po=36,vr=37,Oo=38,Fs=39,bs=40,Ma=41,yh=42,np=43,ip=[9001,65288],Sh="!",qe="×",Kr="÷",No=Wd(Jd),Rt=[Fn,Po],Go=[qd,Ch,xh,jd],Mh=[ln,Uh],Yl=[ar,sr],rp=Go.concat(Mh),Jl=[Oo,Fs,bs,Do,Ho],sp=[rr,Io],ap=function(n,e){e===void 0&&(e="strict");var A=[],t=[],i=[];return n.forEach(function(r,s){var a=No.get(r);if(a>kl?(i.push(!0),a-=kl):i.push(!1),["normal","auto","loose"].indexOf(e)!==-1&&[8208,8211,12316,12448].indexOf(r)!==-1)return t.push(s),A.push(Lo);if(a===Zd||a===Qo){if(s===0)return t.push(s),A.push(Fn);var o=A[s-1];return rp.indexOf(o)===-1?(t.push(t[s-1]),A.push(o)):(t.push(s),A.push(Fn))}if(t.push(s),a===tp)return A.push(e==="strict"?Ro:vr);if(a===yh||a===Ap)return A.push(Fn);if(a===np)return r>=131072&&r<=196605||r>=196608&&r<=262141?A.push(vr):A.push(Fn);A.push(a)}),[t,A,i]},Fa=function(n,e,A,t){var i=t[A];if(Array.isArray(n)?n.indexOf(i)!==-1:n===i)for(var r=A;r<=t.length;){r++;var s=t[r];if(s===e)return!0;if(s!==ln)break}if(i===ln)for(var r=A;r>0;){r--;var a=t[r];if(Array.isArray(n)?n.indexOf(a)!==-1:n===a)for(var o=A;o<=t.length;){o++;var s=t[o];if(s===e)return!0;if(s!==ln)break}if(a!==ln)break}return!1},ql=function(n,e){for(var A=n;A>=0;){var t=e[A];if(t===ln)A--;else return t}return 0},op=function(n,e,A,t,i){if(A[t]===0)return qe;var r=t-1;if(Array.isArray(i)&&i[r]===!0)return qe;var s=r-1,a=r+1,o=e[r],l=s>=0?e[s]:0,c=e[a];if(o===Ch&&c===xh)return qe;if(Go.indexOf(o)!==-1)return Sh;if(Go.indexOf(c)!==-1||Mh.indexOf(c)!==-1)return qe;if(ql(r,e)===Uh)return Kr;if(No.get(n[r])===Qo||(o===Vr||o===kr)&&No.get(n[a])===Qo||o===Kl||c===Kl||o===zl||[ln,Io,rr].indexOf(o)===-1&&c===zl||[Gr,Ji,ep,Jn,qn].indexOf(c)!==-1||ql(r,e)===qi||Fa(Sa,qi,r,e)||Fa([Gr,Ji],Ro,r,e)||Fa(Wl,Wl,r,e))return qe;if(o===ln)return Kr;if(o===Sa||c===Sa)return qe;if(c===Lo||o===Lo)return Kr;if([Io,rr,Ro].indexOf(c)!==-1||o===$d||l===Po&&sp.indexOf(o)!==-1||o===qn&&c===Po||c===Xl||Rt.indexOf(c)!==-1&&o===et||Rt.indexOf(o)!==-1&&c===et||o===ar&&[vr,Vr,kr].indexOf(c)!==-1||[vr,Vr,kr].indexOf(o)!==-1&&c===sr||Rt.indexOf(o)!==-1&&Yl.indexOf(c)!==-1||Yl.indexOf(o)!==-1&&Rt.indexOf(c)!==-1||[ar,sr].indexOf(o)!==-1&&(c===et||[qi,rr].indexOf(c)!==-1&&e[a+1]===et)||[qi,rr].indexOf(o)!==-1&&c===et||o===et&&[et,qn,Jn].indexOf(c)!==-1)return qe;if([et,qn,Jn,Gr,Ji].indexOf(c)!==-1)for(var u=r;u>=0;){var h=e[u];if(h===et)return qe;if([qn,Jn].indexOf(h)!==-1)u--;else break}if([ar,sr].indexOf(c)!==-1)for(var u=[Gr,Ji].indexOf(o)!==-1?s:r;u>=0;){var h=e[u];if(h===et)return qe;if([qn,Jn].indexOf(h)!==-1)u--;else break}if(Oo===o&&[Oo,Fs,Do,Ho].indexOf(c)!==-1||[Fs,Do].indexOf(o)!==-1&&[Fs,bs].indexOf(c)!==-1||[bs,Ho].indexOf(o)!==-1&&c===bs||Jl.indexOf(o)!==-1&&[Xl,sr].indexOf(c)!==-1||Jl.indexOf(c)!==-1&&o===ar||Rt.indexOf(o)!==-1&&Rt.indexOf(c)!==-1||o===Jn&&Rt.indexOf(c)!==-1||Rt.concat(et).indexOf(o)!==-1&&c===qi&&ip.indexOf(n[a])===-1||Rt.concat(et).indexOf(c)!==-1&&o===Ji)return qe;if(o===Ma&&c===Ma){for(var p=A[r],g=1;p>0&&(p--,e[p]===Ma);)g++;if(g%2!==0)return qe}return o===Vr&&c===kr?qe:Kr},lp=function(n,e){e||(e={lineBreak:"normal",wordBreak:"normal"});var A=ap(n,e.lineBreak),t=A[0],i=A[1],r=A[2];(e.wordBreak==="break-all"||e.wordBreak==="break-word")&&(i=i.map(function(a){return[et,Fn,yh].indexOf(a)!==-1?vr:a}));var s=e.wordBreak==="keep-all"?r.map(function(a,o){return a&&n[o]>=19968&&n[o]<=40959}):void 0;return[t,i,s]},cp=function(){function n(e,A,t,i){this.codePoints=e,this.required=A===Sh,this.start=t,this.end=i}return n.prototype.slice=function(){return pA.apply(void 0,this.codePoints.slice(this.start,this.end))},n}(),up=function(n,e){var A=na(n),t=lp(A,e),i=t[0],r=t[1],s=t[2],a=A.length,o=0,l=0;return{next:function(){if(l>=a)return{done:!0,value:null};for(var c=qe;l<a&&(c=op(A,r,i,++l,s))===qe;);if(c!==qe||l===a){var u=new cp(A,c,o,l);return o=l,{value:u,done:!1}}return{done:!0,value:null}}}},hp=1,fp=2,br=4,Zl=8,Ls=10,jl=47,hr=92,dp=9,pp=32,zr=34,Zi=61,gp=35,mp=36,Bp=37,Wr=39,Xr=40,ji=41,_p=95,WA=45,wp=33,vp=60,Ep=62,Cp=64,xp=91,Up=93,yp=61,Sp=123,Yr=63,Mp=125,$l=124,Fp=126,bp=128,ec=65533,ba=42,Qn=43,Tp=44,Qp=58,Ip=59,Er=46,Lp=0,Rp=8,Dp=11,Hp=14,Pp=31,Op=127,vt=-1,Fh=48,bh=97,Th=101,Np=102,Gp=117,Vp=122,Qh=65,Ih=69,Lh=70,kp=85,Kp=90,HA=function(n){return n>=Fh&&n<=57},zp=function(n){return n>=55296&&n<=57343},Zn=function(n){return HA(n)||n>=Qh&&n<=Lh||n>=bh&&n<=Np},Wp=function(n){return n>=bh&&n<=Vp},Xp=function(n){return n>=Qh&&n<=Kp},Yp=function(n){return Wp(n)||Xp(n)},Jp=function(n){return n>=bp},Jr=function(n){return n===Ls||n===dp||n===pp},Rs=function(n){return Yp(n)||Jp(n)||n===_p},Ac=function(n){return Rs(n)||HA(n)||n===WA},qp=function(n){return n>=Lp&&n<=Rp||n===Dp||n>=Hp&&n<=Pp||n===Op},rn=function(n,e){return n!==hr?!1:e!==Ls},qr=function(n,e,A){return n===WA?Rs(e)||rn(e,A):Rs(n)?!0:!!(n===hr&&rn(n,e))},Ta=function(n,e,A){return n===Qn||n===WA?HA(e)?!0:e===Er&&HA(A):HA(n===Er?e:n)},Zp=function(n){var e=0,A=1;(n[e]===Qn||n[e]===WA)&&(n[e]===WA&&(A=-1),e++);for(var t=[];HA(n[e]);)t.push(n[e++]);var i=t.length?parseInt(pA.apply(void 0,t),10):0;n[e]===Er&&e++;for(var r=[];HA(n[e]);)r.push(n[e++]);var s=r.length,a=s?parseInt(pA.apply(void 0,r),10):0;(n[e]===Ih||n[e]===Th)&&e++;var o=1;(n[e]===Qn||n[e]===WA)&&(n[e]===WA&&(o=-1),e++);for(var l=[];HA(n[e]);)l.push(n[e++]);var c=l.length?parseInt(pA.apply(void 0,l),10):0;return A*(i+a*Math.pow(10,-s))*Math.pow(10,o*c)},jp={type:2},$p={type:3},eg={type:4},Ag={type:13},tg={type:8},ng={type:21},ig={type:9},rg={type:10},sg={type:11},ag={type:12},og={type:14},Zr={type:23},lg={type:1},cg={type:25},ug={type:24},hg={type:26},fg={type:27},dg={type:28},pg={type:29},gg={type:31},Vo={type:32},Rh=function(){function n(){this._value=[]}return n.prototype.write=function(e){this._value=this._value.concat(na(e))},n.prototype.read=function(){for(var e=[],A=this.consumeToken();A!==Vo;)e.push(A),A=this.consumeToken();return e},n.prototype.consumeToken=function(){var e=this.consumeCodePoint();switch(e){case zr:return this.consumeStringToken(zr);case gp:var A=this.peekCodePoint(0),t=this.peekCodePoint(1),i=this.peekCodePoint(2);if(Ac(A)||rn(t,i)){var r=qr(A,t,i)?fp:hp,s=this.consumeName();return{type:5,value:s,flags:r}}break;case mp:if(this.peekCodePoint(0)===Zi)return this.consumeCodePoint(),Ag;break;case Wr:return this.consumeStringToken(Wr);case Xr:return jp;case ji:return $p;case ba:if(this.peekCodePoint(0)===Zi)return this.consumeCodePoint(),og;break;case Qn:if(Ta(e,this.peekCodePoint(0),this.peekCodePoint(1)))return this.reconsumeCodePoint(e),this.consumeNumericToken();break;case Tp:return eg;case WA:var a=e,o=this.peekCodePoint(0),l=this.peekCodePoint(1);if(Ta(a,o,l))return this.reconsumeCodePoint(e),this.consumeNumericToken();if(qr(a,o,l))return this.reconsumeCodePoint(e),this.consumeIdentLikeToken();if(o===WA&&l===Ep)return this.consumeCodePoint(),this.consumeCodePoint(),ug;break;case Er:if(Ta(e,this.peekCodePoint(0),this.peekCodePoint(1)))return this.reconsumeCodePoint(e),this.consumeNumericToken();break;case jl:if(this.peekCodePoint(0)===ba)for(this.consumeCodePoint();;){var c=this.consumeCodePoint();if(c===ba&&(c=this.consumeCodePoint(),c===jl))return this.consumeToken();if(c===vt)return this.consumeToken()}break;case Qp:return hg;case Ip:return fg;case vp:if(this.peekCodePoint(0)===wp&&this.peekCodePoint(1)===WA&&this.peekCodePoint(2)===WA)return this.consumeCodePoint(),this.consumeCodePoint(),cg;break;case Cp:var u=this.peekCodePoint(0),h=this.peekCodePoint(1),p=this.peekCodePoint(2);if(qr(u,h,p)){var s=this.consumeName();return{type:7,value:s}}break;case xp:return dg;case hr:if(rn(e,this.peekCodePoint(0)))return this.reconsumeCodePoint(e),this.consumeIdentLikeToken();break;case Up:return pg;case yp:if(this.peekCodePoint(0)===Zi)return this.consumeCodePoint(),tg;break;case Sp:return sg;case Mp:return ag;case Gp:case kp:var g=this.peekCodePoint(0),m=this.peekCodePoint(1);return g===Qn&&(Zn(m)||m===Yr)&&(this.consumeCodePoint(),this.consumeUnicodeRangeToken()),this.reconsumeCodePoint(e),this.consumeIdentLikeToken();case $l:if(this.peekCodePoint(0)===Zi)return this.consumeCodePoint(),ig;if(this.peekCodePoint(0)===$l)return this.consumeCodePoint(),ng;break;case Fp:if(this.peekCodePoint(0)===Zi)return this.consumeCodePoint(),rg;break;case vt:return Vo}return Jr(e)?(this.consumeWhiteSpace(),gg):HA(e)?(this.reconsumeCodePoint(e),this.consumeNumericToken()):Rs(e)?(this.reconsumeCodePoint(e),this.consumeIdentLikeToken()):{type:6,value:pA(e)}},n.prototype.consumeCodePoint=function(){var e=this._value.shift();return typeof e>"u"?-1:e},n.prototype.reconsumeCodePoint=function(e){this._value.unshift(e)},n.prototype.peekCodePoint=function(e){return e>=this._value.length?-1:this._value[e]},n.prototype.consumeUnicodeRangeToken=function(){for(var e=[],A=this.consumeCodePoint();Zn(A)&&e.length<6;)e.push(A),A=this.consumeCodePoint();for(var t=!1;A===Yr&&e.length<6;)e.push(A),A=this.consumeCodePoint(),t=!0;if(t){var i=parseInt(pA.apply(void 0,e.map(function(o){return o===Yr?Fh:o})),16),r=parseInt(pA.apply(void 0,e.map(function(o){return o===Yr?Lh:o})),16);return{type:30,start:i,end:r}}var s=parseInt(pA.apply(void 0,e),16);if(this.peekCodePoint(0)===WA&&Zn(this.peekCodePoint(1))){this.consumeCodePoint(),A=this.consumeCodePoint();for(var a=[];Zn(A)&&a.length<6;)a.push(A),A=this.consumeCodePoint();var r=parseInt(pA.apply(void 0,a),16);return{type:30,start:s,end:r}}else return{type:30,start:s,end:s}},n.prototype.consumeIdentLikeToken=function(){var e=this.consumeName();return e.toLowerCase()==="url"&&this.peekCodePoint(0)===Xr?(this.consumeCodePoint(),this.consumeUrlToken()):this.peekCodePoint(0)===Xr?(this.consumeCodePoint(),{type:19,value:e}):{type:20,value:e}},n.prototype.consumeUrlToken=function(){var e=[];if(this.consumeWhiteSpace(),this.peekCodePoint(0)===vt)return{type:22,value:""};var A=this.peekCodePoint(0);if(A===Wr||A===zr){var t=this.consumeStringToken(this.consumeCodePoint());return t.type===0&&(this.consumeWhiteSpace(),this.peekCodePoint(0)===vt||this.peekCodePoint(0)===ji)?(this.consumeCodePoint(),{type:22,value:t.value}):(this.consumeBadUrlRemnants(),Zr)}for(;;){var i=this.consumeCodePoint();if(i===vt||i===ji)return{type:22,value:pA.apply(void 0,e)};if(Jr(i))return this.consumeWhiteSpace(),this.peekCodePoint(0)===vt||this.peekCodePoint(0)===ji?(this.consumeCodePoint(),{type:22,value:pA.apply(void 0,e)}):(this.consumeBadUrlRemnants(),Zr);if(i===zr||i===Wr||i===Xr||qp(i))return this.consumeBadUrlRemnants(),Zr;if(i===hr)if(rn(i,this.peekCodePoint(0)))e.push(this.consumeEscapedCodePoint());else return this.consumeBadUrlRemnants(),Zr;else e.push(i)}},n.prototype.consumeWhiteSpace=function(){for(;Jr(this.peekCodePoint(0));)this.consumeCodePoint()},n.prototype.consumeBadUrlRemnants=function(){for(;;){var e=this.consumeCodePoint();if(e===ji||e===vt)return;rn(e,this.peekCodePoint(0))&&this.consumeEscapedCodePoint()}},n.prototype.consumeStringSlice=function(e){for(var A=5e4,t="";e>0;){var i=Math.min(A,e);t+=pA.apply(void 0,this._value.splice(0,i)),e-=i}return this._value.shift(),t},n.prototype.consumeStringToken=function(e){var A="",t=0;do{var i=this._value[t];if(i===vt||i===void 0||i===e)return A+=this.consumeStringSlice(t),{type:0,value:A};if(i===Ls)return this._value.splice(0,t),lg;if(i===hr){var r=this._value[t+1];r!==vt&&r!==void 0&&(r===Ls?(A+=this.consumeStringSlice(t),t=-1,this._value.shift()):rn(i,r)&&(A+=this.consumeStringSlice(t),A+=pA(this.consumeEscapedCodePoint()),t=-1))}t++}while(!0)},n.prototype.consumeNumber=function(){var e=[],A=br,t=this.peekCodePoint(0);for((t===Qn||t===WA)&&e.push(this.consumeCodePoint());HA(this.peekCodePoint(0));)e.push(this.consumeCodePoint());t=this.peekCodePoint(0);var i=this.peekCodePoint(1);if(t===Er&&HA(i))for(e.push(this.consumeCodePoint(),this.consumeCodePoint()),A=Zl;HA(this.peekCodePoint(0));)e.push(this.consumeCodePoint());t=this.peekCodePoint(0),i=this.peekCodePoint(1);var r=this.peekCodePoint(2);if((t===Ih||t===Th)&&((i===Qn||i===WA)&&HA(r)||HA(i)))for(e.push(this.consumeCodePoint(),this.consumeCodePoint()),A=Zl;HA(this.peekCodePoint(0));)e.push(this.consumeCodePoint());return[Zp(e),A]},n.prototype.consumeNumericToken=function(){var e=this.consumeNumber(),A=e[0],t=e[1],i=this.peekCodePoint(0),r=this.peekCodePoint(1),s=this.peekCodePoint(2);if(qr(i,r,s)){var a=this.consumeName();return{type:15,number:A,flags:t,unit:a}}return i===Bp?(this.consumeCodePoint(),{type:16,number:A,flags:t}):{type:17,number:A,flags:t}},n.prototype.consumeEscapedCodePoint=function(){var e=this.consumeCodePoint();if(Zn(e)){for(var A=pA(e);Zn(this.peekCodePoint(0))&&A.length<6;)A+=pA(this.consumeCodePoint());Jr(this.peekCodePoint(0))&&this.consumeCodePoint();var t=parseInt(A,16);return t===0||zp(t)||t>1114111?ec:t}return e===vt?ec:e},n.prototype.consumeName=function(){for(var e="";;){var A=this.consumeCodePoint();if(Ac(A))e+=pA(A);else if(rn(A,this.peekCodePoint(0)))e+=pA(this.consumeEscapedCodePoint());else return this.reconsumeCodePoint(A),e}},n}(),Dh=function(){function n(e){this._tokens=e}return n.create=function(e){var A=new Rh;return A.write(e),new n(A.read())},n.parseValue=function(e){return n.create(e).parseComponentValue()},n.parseValues=function(e){return n.create(e).parseComponentValues()},n.prototype.parseComponentValue=function(){for(var e=this.consumeToken();e.type===31;)e=this.consumeToken();if(e.type===32)throw new SyntaxError("Error parsing CSS component value, unexpected EOF");this.reconsumeToken(e);var A=this.consumeComponentValue();do e=this.consumeToken();while(e.type===31);if(e.type===32)return A;throw new SyntaxError("Error parsing CSS component value, multiple values found when expecting only one")},n.prototype.parseComponentValues=function(){for(var e=[];;){var A=this.consumeComponentValue();if(A.type===32)return e;e.push(A),e.push()}},n.prototype.consumeComponentValue=function(){var e=this.consumeToken();switch(e.type){case 11:case 28:case 2:return this.consumeSimpleBlock(e.type);case 19:return this.consumeFunction(e)}return e},n.prototype.consumeSimpleBlock=function(e){for(var A={type:e,values:[]},t=this.consumeToken();;){if(t.type===32||Bg(t,e))return A;this.reconsumeToken(t),A.values.push(this.consumeComponentValue()),t=this.consumeToken()}},n.prototype.consumeFunction=function(e){for(var A={name:e.value,values:[],type:18};;){var t=this.consumeToken();if(t.type===32||t.type===3)return A;this.reconsumeToken(t),A.values.push(this.consumeComponentValue())}},n.prototype.consumeToken=function(){var e=this._tokens.shift();return typeof e>"u"?Vo:e},n.prototype.reconsumeToken=function(e){this._tokens.unshift(e)},n}(),Tr=function(n){return n.type===15},zi=function(n){return n.type===17},iA=function(n){return n.type===20},mg=function(n){return n.type===0},ko=function(n,e){return iA(n)&&n.value===e},Hh=function(n){return n.type!==31},Ni=function(n){return n.type!==31&&n.type!==4},Tt=function(n){var e=[],A=[];return n.forEach(function(t){if(t.type===4){if(A.length===0)throw new Error("Error parsing function args, zero tokens for arg");e.push(A),A=[];return}t.type!==31&&A.push(t)}),A.length&&e.push(A),e},Bg=function(n,e){return e===11&&n.type===12||e===28&&n.type===29?!0:e===2&&n.type===3},_n=function(n){return n.type===17||n.type===15},mA=function(n){return n.type===16||_n(n)},Ph=function(n){return n.length>1?[n[0],n[1]]:[n[0]]},FA={type:17,number:0,flags:br},dl={type:16,number:50,flags:br},cn={type:16,number:100,flags:br},or=function(n,e,A){var t=n[0],i=n[1];return[sA(t,e),sA(typeof i<"u"?i:t,A)]},sA=function(n,e){if(n.type===16)return n.number/100*e;if(Tr(n))switch(n.unit){case"rem":case"em":return 16*n.number;case"px":default:return n.number}return n.number},Oh="deg",Nh="grad",Gh="rad",Vh="turn",ia={name:"angle",parse:function(n,e){if(e.type===15)switch(e.unit){case Oh:return Math.PI*e.number/180;case Nh:return Math.PI/200*e.number;case Gh:return e.number;case Vh:return Math.PI*2*e.number}throw new Error("Unsupported angle type")}},kh=function(n){return n.type===15&&(n.unit===Oh||n.unit===Nh||n.unit===Gh||n.unit===Vh)},Kh=function(n){var e=n.filter(iA).map(function(A){return A.value}).join(" ");switch(e){case"to bottom right":case"to right bottom":case"left top":case"top left":return[FA,FA];case"to top":case"bottom":return ot(0);case"to bottom left":case"to left bottom":case"right top":case"top right":return[FA,cn];case"to right":case"left":return ot(90);case"to top left":case"to left top":case"right bottom":case"bottom right":return[cn,cn];case"to bottom":case"top":return ot(180);case"to top right":case"to right top":case"left bottom":case"bottom left":return[cn,FA];case"to left":case"right":return ot(270)}return 0},ot=function(n){return Math.PI*n/180},fn={name:"color",parse:function(n,e){if(e.type===18){var A=_g[e.name];if(typeof A>"u")throw new Error('Attempting to parse an unsupported color function "'+e.name+'"');return A(n,e.values)}if(e.type===5){if(e.value.length===3){var t=e.value.substring(0,1),i=e.value.substring(1,2),r=e.value.substring(2,3);return un(parseInt(t+t,16),parseInt(i+i,16),parseInt(r+r,16),1)}if(e.value.length===4){var t=e.value.substring(0,1),i=e.value.substring(1,2),r=e.value.substring(2,3),s=e.value.substring(3,4);return un(parseInt(t+t,16),parseInt(i+i,16),parseInt(r+r,16),parseInt(s+s,16)/255)}if(e.value.length===6){var t=e.value.substring(0,2),i=e.value.substring(2,4),r=e.value.substring(4,6);return un(parseInt(t,16),parseInt(i,16),parseInt(r,16),1)}if(e.value.length===8){var t=e.value.substring(0,2),i=e.value.substring(2,4),r=e.value.substring(4,6),s=e.value.substring(6,8);return un(parseInt(t,16),parseInt(i,16),parseInt(r,16),parseInt(s,16)/255)}}if(e.type===20){var a=Wt[e.value.toUpperCase()];if(typeof a<"u")return a}return Wt.TRANSPARENT}},dn=function(n){return(255&n)===0},xA=function(n){var e=255&n,A=255&n>>8,t=255&n>>16,i=255&n>>24;return e<255?"rgba("+i+","+t+","+A+","+e/255+")":"rgb("+i+","+t+","+A+")"},un=function(n,e,A,t){return(n<<24|e<<16|A<<8|Math.round(t*255)<<0)>>>0},tc=function(n,e){if(n.type===17)return n.number;if(n.type===16){var A=e===3?1:255;return e===3?n.number/100*A:Math.round(n.number/100*A)}return 0},nc=function(n,e){var A=e.filter(Ni);if(A.length===3){var t=A.map(tc),i=t[0],r=t[1],s=t[2];return un(i,r,s,1)}if(A.length===4){var a=A.map(tc),i=a[0],r=a[1],s=a[2],o=a[3];return un(i,r,s,o)}return 0};function Qa(n,e,A){return A<0&&(A+=1),A>=1&&(A-=1),A<1/6?(e-n)*A*6+n:A<1/2?e:A<2/3?(e-n)*6*(2/3-A)+n:n}var ic=function(n,e){var A=e.filter(Ni),t=A[0],i=A[1],r=A[2],s=A[3],a=(t.type===17?ot(t.number):ia.parse(n,t))/(Math.PI*2),o=mA(i)?i.number/100:0,l=mA(r)?r.number/100:0,c=typeof s<"u"&&mA(s)?sA(s,1):1;if(o===0)return un(l*255,l*255,l*255,1);var u=l<=.5?l*(o+1):l+o-l*o,h=l*2-u,p=Qa(h,u,a+1/3),g=Qa(h,u,a),m=Qa(h,u,a-1/3);return un(p*255,g*255,m*255,c)},_g={hsl:ic,hsla:ic,rgb:nc,rgba:nc},fr=function(n,e){return fn.parse(n,Dh.create(e).parseComponentValue())},Wt={ALICEBLUE:4042850303,ANTIQUEWHITE:4209760255,AQUA:16777215,AQUAMARINE:2147472639,AZURE:4043309055,BEIGE:4126530815,BISQUE:4293182719,BLACK:255,BLANCHEDALMOND:4293643775,BLUE:65535,BLUEVIOLET:2318131967,BROWN:2771004159,BURLYWOOD:3736635391,CADETBLUE:1604231423,CHARTREUSE:2147418367,CHOCOLATE:3530104575,CORAL:4286533887,CORNFLOWERBLUE:1687547391,CORNSILK:4294499583,CRIMSON:3692313855,CYAN:16777215,DARKBLUE:35839,DARKCYAN:9145343,DARKGOLDENROD:3095837695,DARKGRAY:2846468607,DARKGREEN:6553855,DARKGREY:2846468607,DARKKHAKI:3182914559,DARKMAGENTA:2332068863,DARKOLIVEGREEN:1433087999,DARKORANGE:4287365375,DARKORCHID:2570243327,DARKRED:2332033279,DARKSALMON:3918953215,DARKSEAGREEN:2411499519,DARKSLATEBLUE:1211993087,DARKSLATEGRAY:793726975,DARKSLATEGREY:793726975,DARKTURQUOISE:13554175,DARKVIOLET:2483082239,DEEPPINK:4279538687,DEEPSKYBLUE:12582911,DIMGRAY:1768516095,DIMGREY:1768516095,DODGERBLUE:512819199,FIREBRICK:2988581631,FLORALWHITE:4294635775,FORESTGREEN:579543807,FUCHSIA:4278255615,GAINSBORO:3705462015,GHOSTWHITE:4177068031,GOLD:4292280575,GOLDENROD:3668254975,GRAY:2155905279,GREEN:8388863,GREENYELLOW:2919182335,GREY:2155905279,HONEYDEW:4043305215,HOTPINK:4285117695,INDIANRED:3445382399,INDIGO:1258324735,IVORY:4294963455,KHAKI:4041641215,LAVENDER:3873897215,LAVENDERBLUSH:4293981695,LAWNGREEN:2096890111,LEMONCHIFFON:4294626815,LIGHTBLUE:2916673279,LIGHTCORAL:4034953471,LIGHTCYAN:3774873599,LIGHTGOLDENRODYELLOW:4210742015,LIGHTGRAY:3553874943,LIGHTGREEN:2431553791,LIGHTGREY:3553874943,LIGHTPINK:4290167295,LIGHTSALMON:4288707327,LIGHTSEAGREEN:548580095,LIGHTSKYBLUE:2278488831,LIGHTSLATEGRAY:2005441023,LIGHTSLATEGREY:2005441023,LIGHTSTEELBLUE:2965692159,LIGHTYELLOW:4294959359,LIME:16711935,LIMEGREEN:852308735,LINEN:4210091775,MAGENTA:4278255615,MAROON:2147483903,MEDIUMAQUAMARINE:1724754687,MEDIUMBLUE:52735,MEDIUMORCHID:3126187007,MEDIUMPURPLE:2473647103,MEDIUMSEAGREEN:1018393087,MEDIUMSLATEBLUE:2070474495,MEDIUMSPRINGGREEN:16423679,MEDIUMTURQUOISE:1221709055,MEDIUMVIOLETRED:3340076543,MIDNIGHTBLUE:421097727,MINTCREAM:4127193855,MISTYROSE:4293190143,MOCCASIN:4293178879,NAVAJOWHITE:4292783615,NAVY:33023,OLDLACE:4260751103,OLIVE:2155872511,OLIVEDRAB:1804477439,ORANGE:4289003775,ORANGERED:4282712319,ORCHID:3664828159,PALEGOLDENROD:4008225535,PALEGREEN:2566625535,PALETURQUOISE:2951671551,PALEVIOLETRED:3681588223,PAPAYAWHIP:4293907967,PEACHPUFF:4292524543,PERU:3448061951,PINK:4290825215,PLUM:3718307327,POWDERBLUE:2967529215,PURPLE:2147516671,REBECCAPURPLE:1714657791,RED:4278190335,ROSYBROWN:3163525119,ROYALBLUE:1097458175,SADDLEBROWN:2336560127,SALMON:4202722047,SANDYBROWN:4104413439,SEAGREEN:780883967,SEASHELL:4294307583,SIENNA:2689740287,SILVER:3233857791,SKYBLUE:2278484991,SLATEBLUE:1784335871,SLATEGRAY:1887473919,SLATEGREY:1887473919,SNOW:4294638335,SPRINGGREEN:16744447,STEELBLUE:1182971135,TAN:3535047935,TEAL:8421631,THISTLE:3636451583,TOMATO:4284696575,TRANSPARENT:0,TURQUOISE:1088475391,VIOLET:4001558271,WHEAT:4125012991,WHITE:4294967295,WHITESMOKE:4126537215,YELLOW:4294902015,YELLOWGREEN:2597139199},wg={name:"background-clip",initialValue:"border-box",prefix:!1,type:1,parse:function(n,e){return e.map(function(A){if(iA(A))switch(A.value){case"padding-box":return 1;case"content-box":return 2}return 0})}},vg={name:"background-color",initialValue:"transparent",prefix:!1,type:3,format:"color"},ra=function(n,e){var A=fn.parse(n,e[0]),t=e[1];return t&&mA(t)?{color:A,stop:t}:{color:A,stop:null}},rc=function(n,e){var A=n[0],t=n[n.length-1];A.stop===null&&(A.stop=FA),t.stop===null&&(t.stop=cn);for(var i=[],r=0,s=0;s<n.length;s++){var a=n[s].stop;if(a!==null){var o=sA(a,e);o>r?i.push(o):i.push(r),r=o}else i.push(null)}for(var l=null,s=0;s<i.length;s++){var c=i[s];if(c===null)l===null&&(l=s);else if(l!==null){for(var u=s-l,h=i[l-1],p=(c-h)/(u+1),g=1;g<=u;g++)i[l+g-1]=p*g;l=null}}return n.map(function(m,d){var f=m.color;return{color:f,stop:Math.max(Math.min(1,i[d]/e),0)}})},Eg=function(n,e,A){var t=e/2,i=A/2,r=sA(n[0],e)-t,s=i-sA(n[1],A);return(Math.atan2(s,r)+Math.PI*2)%(Math.PI*2)},Cg=function(n,e,A){var t=typeof n=="number"?n:Eg(n,e,A),i=Math.abs(e*Math.sin(t))+Math.abs(A*Math.cos(t)),r=e/2,s=A/2,a=i/2,o=Math.sin(t-Math.PI/2)*a,l=Math.cos(t-Math.PI/2)*a;return[i,r-l,r+l,s-o,s+o]},ft=function(n,e){return Math.sqrt(n*n+e*e)},sc=function(n,e,A,t,i){var r=[[0,0],[0,e],[n,0],[n,e]];return r.reduce(function(s,a){var o=a[0],l=a[1],c=ft(A-o,t-l);return(i?c<s.optimumDistance:c>s.optimumDistance)?{optimumCorner:a,optimumDistance:c}:s},{optimumDistance:i?1/0:-1/0,optimumCorner:null}).optimumCorner},xg=function(n,e,A,t,i){var r=0,s=0;switch(n.size){case 0:n.shape===0?r=s=Math.min(Math.abs(e),Math.abs(e-t),Math.abs(A),Math.abs(A-i)):n.shape===1&&(r=Math.min(Math.abs(e),Math.abs(e-t)),s=Math.min(Math.abs(A),Math.abs(A-i)));break;case 2:if(n.shape===0)r=s=Math.min(ft(e,A),ft(e,A-i),ft(e-t,A),ft(e-t,A-i));else if(n.shape===1){var a=Math.min(Math.abs(A),Math.abs(A-i))/Math.min(Math.abs(e),Math.abs(e-t)),o=sc(t,i,e,A,!0),l=o[0],c=o[1];r=ft(l-e,(c-A)/a),s=a*r}break;case 1:n.shape===0?r=s=Math.max(Math.abs(e),Math.abs(e-t),Math.abs(A),Math.abs(A-i)):n.shape===1&&(r=Math.max(Math.abs(e),Math.abs(e-t)),s=Math.max(Math.abs(A),Math.abs(A-i)));break;case 3:if(n.shape===0)r=s=Math.max(ft(e,A),ft(e,A-i),ft(e-t,A),ft(e-t,A-i));else if(n.shape===1){var a=Math.max(Math.abs(A),Math.abs(A-i))/Math.max(Math.abs(e),Math.abs(e-t)),u=sc(t,i,e,A,!1),l=u[0],c=u[1];r=ft(l-e,(c-A)/a),s=a*r}break}return Array.isArray(n.size)&&(r=sA(n.size[0],t),s=n.size.length===2?sA(n.size[1],i):r),[r,s]},Ug=function(n,e){var A=ot(180),t=[];return Tt(e).forEach(function(i,r){if(r===0){var s=i[0];if(s.type===20&&s.value==="to"){A=Kh(i);return}else if(kh(s)){A=ia.parse(n,s);return}}var a=ra(n,i);t.push(a)}),{angle:A,stops:t,type:1}},jr=function(n,e){var A=ot(180),t=[];return Tt(e).forEach(function(i,r){if(r===0){var s=i[0];if(s.type===20&&["top","left","right","bottom"].indexOf(s.value)!==-1){A=Kh(i);return}else if(kh(s)){A=(ia.parse(n,s)+ot(270))%ot(360);return}}var a=ra(n,i);t.push(a)}),{angle:A,stops:t,type:1}},yg=function(n,e){var A=ot(180),t=[],i=1,r=0,s=3,a=[];return Tt(e).forEach(function(o,l){var c=o[0];if(l===0){if(iA(c)&&c.value==="linear"){i=1;return}else if(iA(c)&&c.value==="radial"){i=2;return}}if(c.type===18){if(c.name==="from"){var u=fn.parse(n,c.values[0]);t.push({stop:FA,color:u})}else if(c.name==="to"){var u=fn.parse(n,c.values[0]);t.push({stop:cn,color:u})}else if(c.name==="color-stop"){var h=c.values.filter(Ni);if(h.length===2){var u=fn.parse(n,h[1]),p=h[0];zi(p)&&t.push({stop:{type:16,number:p.number*100,flags:p.flags},color:u})}}}}),i===1?{angle:(A+ot(180))%ot(360),stops:t,type:i}:{size:s,shape:r,stops:t,position:a,type:i}},zh="closest-side",Wh="farthest-side",Xh="closest-corner",Yh="farthest-corner",Jh="circle",qh="ellipse",Zh="cover",jh="contain",Sg=function(n,e){var A=0,t=3,i=[],r=[];return Tt(e).forEach(function(s,a){var o=!0;if(a===0){var l=!1;o=s.reduce(function(u,h){if(l)if(iA(h))switch(h.value){case"center":return r.push(dl),u;case"top":case"left":return r.push(FA),u;case"right":case"bottom":return r.push(cn),u}else(mA(h)||_n(h))&&r.push(h);else if(iA(h))switch(h.value){case Jh:return A=0,!1;case qh:return A=1,!1;case"at":return l=!0,!1;case zh:return t=0,!1;case Zh:case Wh:return t=1,!1;case jh:case Xh:return t=2,!1;case Yh:return t=3,!1}else if(_n(h)||mA(h))return Array.isArray(t)||(t=[]),t.push(h),!1;return u},o)}if(o){var c=ra(n,s);i.push(c)}}),{size:t,shape:A,stops:i,position:r,type:2}},$r=function(n,e){var A=0,t=3,i=[],r=[];return Tt(e).forEach(function(s,a){var o=!0;if(a===0?o=s.reduce(function(c,u){if(iA(u))switch(u.value){case"center":return r.push(dl),!1;case"top":case"left":return r.push(FA),!1;case"right":case"bottom":return r.push(cn),!1}else if(mA(u)||_n(u))return r.push(u),!1;return c},o):a===1&&(o=s.reduce(function(c,u){if(iA(u))switch(u.value){case Jh:return A=0,!1;case qh:return A=1,!1;case jh:case zh:return t=0,!1;case Wh:return t=1,!1;case Xh:return t=2,!1;case Zh:case Yh:return t=3,!1}else if(_n(u)||mA(u))return Array.isArray(t)||(t=[]),t.push(u),!1;return c},o)),o){var l=ra(n,s);i.push(l)}}),{size:t,shape:A,stops:i,position:r,type:2}},Mg=function(n){return n.type===1},Fg=function(n){return n.type===2},pl={name:"image",parse:function(n,e){if(e.type===22){var A={url:e.value,type:0};return n.cache.addImage(e.value),A}if(e.type===18){var t=$h[e.name];if(typeof t>"u")throw new Error('Attempting to parse an unsupported image function "'+e.name+'"');return t(n,e.values)}throw new Error("Unsupported image type "+e.type)}};function bg(n){return!(n.type===20&&n.value==="none")&&(n.type!==18||!!$h[n.name])}var $h={"linear-gradient":Ug,"-moz-linear-gradient":jr,"-ms-linear-gradient":jr,"-o-linear-gradient":jr,"-webkit-linear-gradient":jr,"radial-gradient":Sg,"-moz-radial-gradient":$r,"-ms-radial-gradient":$r,"-o-radial-gradient":$r,"-webkit-radial-gradient":$r,"-webkit-gradient":yg},Tg={name:"background-image",initialValue:"none",type:1,prefix:!1,parse:function(n,e){if(e.length===0)return[];var A=e[0];return A.type===20&&A.value==="none"?[]:e.filter(function(t){return Ni(t)&&bg(t)}).map(function(t){return pl.parse(n,t)})}},Qg={name:"background-origin",initialValue:"border-box",prefix:!1,type:1,parse:function(n,e){return e.map(function(A){if(iA(A))switch(A.value){case"padding-box":return 1;case"content-box":return 2}return 0})}},Ig={name:"background-position",initialValue:"0% 0%",type:1,prefix:!1,parse:function(n,e){return Tt(e).map(function(A){return A.filter(mA)}).map(Ph)}},Lg={name:"background-repeat",initialValue:"repeat",prefix:!1,type:1,parse:function(n,e){return Tt(e).map(function(A){return A.filter(iA).map(function(t){return t.value}).join(" ")}).map(Rg)}},Rg=function(n){switch(n){case"no-repeat":return 1;case"repeat-x":case"repeat no-repeat":return 2;case"repeat-y":case"no-repeat repeat":return 3;case"repeat":default:return 0}},yi;(function(n){n.AUTO="auto",n.CONTAIN="contain",n.COVER="cover"})(yi||(yi={}));var Dg={name:"background-size",initialValue:"0",prefix:!1,type:1,parse:function(n,e){return Tt(e).map(function(A){return A.filter(Hg)})}},Hg=function(n){return iA(n)||mA(n)},sa=function(n){return{name:"border-"+n+"-color",initialValue:"transparent",prefix:!1,type:3,format:"color"}},Pg=sa("top"),Og=sa("right"),Ng=sa("bottom"),Gg=sa("left"),aa=function(n){return{name:"border-radius-"+n,initialValue:"0 0",prefix:!1,type:1,parse:function(e,A){return Ph(A.filter(mA))}}},Vg=aa("top-left"),kg=aa("top-right"),Kg=aa("bottom-right"),zg=aa("bottom-left"),oa=function(n){return{name:"border-"+n+"-style",initialValue:"solid",prefix:!1,type:2,parse:function(e,A){switch(A){case"none":return 0;case"dashed":return 2;case"dotted":return 3;case"double":return 4}return 1}}},Wg=oa("top"),Xg=oa("right"),Yg=oa("bottom"),Jg=oa("left"),la=function(n){return{name:"border-"+n+"-width",initialValue:"0",type:0,prefix:!1,parse:function(e,A){return Tr(A)?A.number:0}}},qg=la("top"),Zg=la("right"),jg=la("bottom"),$g=la("left"),em={name:"color",initialValue:"transparent",prefix:!1,type:3,format:"color"},Am={name:"direction",initialValue:"ltr",prefix:!1,type:2,parse:function(n,e){switch(e){case"rtl":return 1;case"ltr":default:return 0}}},tm={name:"display",initialValue:"inline-block",prefix:!1,type:1,parse:function(n,e){return e.filter(iA).reduce(function(A,t){return A|nm(t.value)},0)}},nm=function(n){switch(n){case"block":case"-webkit-box":return 2;case"inline":return 4;case"run-in":return 8;case"flow":return 16;case"flow-root":return 32;case"table":return 64;case"flex":case"-webkit-flex":return 128;case"grid":case"-ms-grid":return 256;case"ruby":return 512;case"subgrid":return 1024;case"list-item":return 2048;case"table-row-group":return 4096;case"table-header-group":return 8192;case"table-footer-group":return 16384;case"table-row":return 32768;case"table-cell":return 65536;case"table-column-group":return 131072;case"table-column":return 262144;case"table-caption":return 524288;case"ruby-base":return 1048576;case"ruby-text":return 2097152;case"ruby-base-container":return 4194304;case"ruby-text-container":return 8388608;case"contents":return 16777216;case"inline-block":return 33554432;case"inline-list-item":return 67108864;case"inline-table":return 134217728;case"inline-flex":return 268435456;case"inline-grid":return 536870912}return 0},im={name:"float",initialValue:"none",prefix:!1,type:2,parse:function(n,e){switch(e){case"left":return 1;case"right":return 2;case"inline-start":return 3;case"inline-end":return 4}return 0}},rm={name:"letter-spacing",initialValue:"0",prefix:!1,type:0,parse:function(n,e){return e.type===20&&e.value==="normal"?0:e.type===17||e.type===15?e.number:0}},Ds;(function(n){n.NORMAL="normal",n.STRICT="strict"})(Ds||(Ds={}));var sm={name:"line-break",initialValue:"normal",prefix:!1,type:2,parse:function(n,e){switch(e){case"strict":return Ds.STRICT;case"normal":default:return Ds.NORMAL}}},am={name:"line-height",initialValue:"normal",prefix:!1,type:4},ac=function(n,e){return iA(n)&&n.value==="normal"?1.2*e:n.type===17?e*n.number:mA(n)?sA(n,e):e},om={name:"list-style-image",initialValue:"none",type:0,prefix:!1,parse:function(n,e){return e.type===20&&e.value==="none"?null:pl.parse(n,e)}},lm={name:"list-style-position",initialValue:"outside",prefix:!1,type:2,parse:function(n,e){switch(e){case"inside":return 0;case"outside":default:return 1}}},Ko={name:"list-style-type",initialValue:"none",prefix:!1,type:2,parse:function(n,e){switch(e){case"disc":return 0;case"circle":return 1;case"square":return 2;case"decimal":return 3;case"cjk-decimal":return 4;case"decimal-leading-zero":return 5;case"lower-roman":return 6;case"upper-roman":return 7;case"lower-greek":return 8;case"lower-alpha":return 9;case"upper-alpha":return 10;case"arabic-indic":return 11;case"armenian":return 12;case"bengali":return 13;case"cambodian":return 14;case"cjk-earthly-branch":return 15;case"cjk-heavenly-stem":return 16;case"cjk-ideographic":return 17;case"devanagari":return 18;case"ethiopic-numeric":return 19;case"georgian":return 20;case"gujarati":return 21;case"gurmukhi":return 22;case"hebrew":return 22;case"hiragana":return 23;case"hiragana-iroha":return 24;case"japanese-formal":return 25;case"japanese-informal":return 26;case"kannada":return 27;case"katakana":return 28;case"katakana-iroha":return 29;case"khmer":return 30;case"korean-hangul-formal":return 31;case"korean-hanja-formal":return 32;case"korean-hanja-informal":return 33;case"lao":return 34;case"lower-armenian":return 35;case"malayalam":return 36;case"mongolian":return 37;case"myanmar":return 38;case"oriya":return 39;case"persian":return 40;case"simp-chinese-formal":return 41;case"simp-chinese-informal":return 42;case"tamil":return 43;case"telugu":return 44;case"thai":return 45;case"tibetan":return 46;case"trad-chinese-formal":return 47;case"trad-chinese-informal":return 48;case"upper-armenian":return 49;case"disclosure-open":return 50;case"disclosure-closed":return 51;case"none":default:return-1}}},ca=function(n){return{name:"margin-"+n,initialValue:"0",prefix:!1,type:4}},cm=ca("top"),um=ca("right"),hm=ca("bottom"),fm=ca("left"),dm={name:"overflow",initialValue:"visible",prefix:!1,type:1,parse:function(n,e){return e.filter(iA).map(function(A){switch(A.value){case"hidden":return 1;case"scroll":return 2;case"clip":return 3;case"auto":return 4;case"visible":default:return 0}})}},pm={name:"overflow-wrap",initialValue:"normal",prefix:!1,type:2,parse:function(n,e){switch(e){case"break-word":return"break-word";case"normal":default:return"normal"}}},ua=function(n){return{name:"padding-"+n,initialValue:"0",prefix:!1,type:3,format:"length-percentage"}},gm=ua("top"),mm=ua("right"),Bm=ua("bottom"),_m=ua("left"),wm={name:"text-align",initialValue:"left",prefix:!1,type:2,parse:function(n,e){switch(e){case"right":return 2;case"center":case"justify":return 1;case"left":default:return 0}}},vm={name:"position",initialValue:"static",prefix:!1,type:2,parse:function(n,e){switch(e){case"relative":return 1;case"absolute":return 2;case"fixed":return 3;case"sticky":return 4}return 0}},Em={name:"text-shadow",initialValue:"none",type:1,prefix:!1,parse:function(n,e){return e.length===1&&ko(e[0],"none")?[]:Tt(e).map(function(A){for(var t={color:Wt.TRANSPARENT,offsetX:FA,offsetY:FA,blur:FA},i=0,r=0;r<A.length;r++){var s=A[r];_n(s)?(i===0?t.offsetX=s:i===1?t.offsetY=s:t.blur=s,i++):t.color=fn.parse(n,s)}return t})}},Cm={name:"text-transform",initialValue:"none",prefix:!1,type:2,parse:function(n,e){switch(e){case"uppercase":return 2;case"lowercase":return 1;case"capitalize":return 3}return 0}},xm={name:"transform",initialValue:"none",prefix:!0,type:0,parse:function(n,e){if(e.type===20&&e.value==="none")return null;if(e.type===18){var A=Sm[e.name];if(typeof A>"u")throw new Error('Attempting to parse an unsupported transform function "'+e.name+'"');return A(e.values)}return null}},Um=function(n){var e=n.filter(function(A){return A.type===17}).map(function(A){return A.number});return e.length===6?e:null},ym=function(n){var e=n.filter(function(o){return o.type===17}).map(function(o){return o.number}),A=e[0],t=e[1];e[2],e[3];var i=e[4],r=e[5];e[6],e[7],e[8],e[9],e[10],e[11];var s=e[12],a=e[13];return e[14],e[15],e.length===16?[A,t,i,r,s,a]:null},Sm={matrix:Um,matrix3d:ym},oc={type:16,number:50,flags:br},Mm=[oc,oc],Fm={name:"transform-origin",initialValue:"50% 50%",prefix:!0,type:1,parse:function(n,e){var A=e.filter(mA);return A.length!==2?Mm:[A[0],A[1]]}},bm={name:"visible",initialValue:"none",prefix:!1,type:2,parse:function(n,e){switch(e){case"hidden":return 1;case"collapse":return 2;case"visible":default:return 0}}},dr;(function(n){n.NORMAL="normal",n.BREAK_ALL="break-all",n.KEEP_ALL="keep-all"})(dr||(dr={}));var Tm={name:"word-break",initialValue:"normal",prefix:!1,type:2,parse:function(n,e){switch(e){case"break-all":return dr.BREAK_ALL;case"keep-all":return dr.KEEP_ALL;case"normal":default:return dr.NORMAL}}},Qm={name:"z-index",initialValue:"auto",prefix:!1,type:0,parse:function(n,e){if(e.type===20)return{auto:!0,order:0};if(zi(e))return{auto:!1,order:e.number};throw new Error("Invalid z-index number parsed")}},ef={name:"time",parse:function(n,e){if(e.type===15)switch(e.unit.toLowerCase()){case"s":return 1e3*e.number;case"ms":return e.number}throw new Error("Unsupported time type")}},Im={name:"opacity",initialValue:"1",type:0,prefix:!1,parse:function(n,e){return zi(e)?e.number:1}},Lm={name:"text-decoration-color",initialValue:"transparent",prefix:!1,type:3,format:"color"},Rm={name:"text-decoration-line",initialValue:"none",prefix:!1,type:1,parse:function(n,e){return e.filter(iA).map(function(A){switch(A.value){case"underline":return 1;case"overline":return 2;case"line-through":return 3;case"none":return 4}return 0}).filter(function(A){return A!==0})}},Dm={name:"font-family",initialValue:"",prefix:!1,type:1,parse:function(n,e){var A=[],t=[];return e.forEach(function(i){switch(i.type){case 20:case 0:A.push(i.value);break;case 17:A.push(i.number.toString());break;case 4:t.push(A.join(" ")),A.length=0;break}}),A.length&&t.push(A.join(" ")),t.map(function(i){return i.indexOf(" ")===-1?i:"'"+i+"'"})}},Hm={name:"font-size",initialValue:"0",prefix:!1,type:3,format:"length"},Pm={name:"font-weight",initialValue:"normal",type:0,prefix:!1,parse:function(n,e){if(zi(e))return e.number;if(iA(e))switch(e.value){case"bold":return 700;case"normal":default:return 400}return 400}},Om={name:"font-variant",initialValue:"none",type:1,prefix:!1,parse:function(n,e){return e.filter(iA).map(function(A){return A.value})}},Nm={name:"font-style",initialValue:"normal",prefix:!1,type:2,parse:function(n,e){switch(e){case"oblique":return"oblique";case"italic":return"italic";case"normal":default:return"normal"}}},_A=function(n,e){return(n&e)!==0},Gm={name:"content",initialValue:"none",type:1,prefix:!1,parse:function(n,e){if(e.length===0)return[];var A=e[0];return A.type===20&&A.value==="none"?[]:e}},Vm={name:"counter-increment",initialValue:"none",prefix:!0,type:1,parse:function(n,e){if(e.length===0)return null;var A=e[0];if(A.type===20&&A.value==="none")return null;for(var t=[],i=e.filter(Hh),r=0;r<i.length;r++){var s=i[r],a=i[r+1];if(s.type===20){var o=a&&zi(a)?a.number:1;t.push({counter:s.value,increment:o})}}return t}},km={name:"counter-reset",initialValue:"none",prefix:!0,type:1,parse:function(n,e){if(e.length===0)return[];for(var A=[],t=e.filter(Hh),i=0;i<t.length;i++){var r=t[i],s=t[i+1];if(iA(r)&&r.value!=="none"){var a=s&&zi(s)?s.number:0;A.push({counter:r.value,reset:a})}}return A}},Km={name:"duration",initialValue:"0s",prefix:!1,type:1,parse:function(n,e){return e.filter(Tr).map(function(A){return ef.parse(n,A)})}},zm={name:"quotes",initialValue:"none",prefix:!0,type:1,parse:function(n,e){if(e.length===0)return null;var A=e[0];if(A.type===20&&A.value==="none")return null;var t=[],i=e.filter(mg);if(i.length%2!==0)return null;for(var r=0;r<i.length;r+=2){var s=i[r].value,a=i[r+1].value;t.push({open:s,close:a})}return t}},lc=function(n,e,A){if(!n)return"";var t=n[Math.min(e,n.length-1)];return t?A?t.open:t.close:""},Wm={name:"box-shadow",initialValue:"none",type:1,prefix:!1,parse:function(n,e){return e.length===1&&ko(e[0],"none")?[]:Tt(e).map(function(A){for(var t={color:255,offsetX:FA,offsetY:FA,blur:FA,spread:FA,inset:!1},i=0,r=0;r<A.length;r++){var s=A[r];ko(s,"inset")?t.inset=!0:_n(s)?(i===0?t.offsetX=s:i===1?t.offsetY=s:i===2?t.blur=s:t.spread=s,i++):t.color=fn.parse(n,s)}return t})}},Xm={name:"paint-order",initialValue:"normal",prefix:!1,type:1,parse:function(n,e){var A=[0,1,2],t=[];return e.filter(iA).forEach(function(i){switch(i.value){case"stroke":t.push(1);break;case"fill":t.push(0);break;case"markers":t.push(2);break}}),A.forEach(function(i){t.indexOf(i)===-1&&t.push(i)}),t}},Ym={name:"-webkit-text-stroke-color",initialValue:"currentcolor",prefix:!1,type:3,format:"color"},Jm={name:"-webkit-text-stroke-width",initialValue:"0",type:0,prefix:!1,parse:function(n,e){return Tr(e)?e.number:0}},qm=function(){function n(e,A){var t,i;this.animationDuration=de(e,Km,A.animationDuration),this.backgroundClip=de(e,wg,A.backgroundClip),this.backgroundColor=de(e,vg,A.backgroundColor),this.backgroundImage=de(e,Tg,A.backgroundImage),this.backgroundOrigin=de(e,Qg,A.backgroundOrigin),this.backgroundPosition=de(e,Ig,A.backgroundPosition),this.backgroundRepeat=de(e,Lg,A.backgroundRepeat),this.backgroundSize=de(e,Dg,A.backgroundSize),this.borderTopColor=de(e,Pg,A.borderTopColor),this.borderRightColor=de(e,Og,A.borderRightColor),this.borderBottomColor=de(e,Ng,A.borderBottomColor),this.borderLeftColor=de(e,Gg,A.borderLeftColor),this.borderTopLeftRadius=de(e,Vg,A.borderTopLeftRadius),this.borderTopRightRadius=de(e,kg,A.borderTopRightRadius),this.borderBottomRightRadius=de(e,Kg,A.borderBottomRightRadius),this.borderBottomLeftRadius=de(e,zg,A.borderBottomLeftRadius),this.borderTopStyle=de(e,Wg,A.borderTopStyle),this.borderRightStyle=de(e,Xg,A.borderRightStyle),this.borderBottomStyle=de(e,Yg,A.borderBottomStyle),this.borderLeftStyle=de(e,Jg,A.borderLeftStyle),this.borderTopWidth=de(e,qg,A.borderTopWidth),this.borderRightWidth=de(e,Zg,A.borderRightWidth),this.borderBottomWidth=de(e,jg,A.borderBottomWidth),this.borderLeftWidth=de(e,$g,A.borderLeftWidth),this.boxShadow=de(e,Wm,A.boxShadow),this.color=de(e,em,A.color),this.direction=de(e,Am,A.direction),this.display=de(e,tm,A.display),this.float=de(e,im,A.cssFloat),this.fontFamily=de(e,Dm,A.fontFamily),this.fontSize=de(e,Hm,A.fontSize),this.fontStyle=de(e,Nm,A.fontStyle),this.fontVariant=de(e,Om,A.fontVariant),this.fontWeight=de(e,Pm,A.fontWeight),this.letterSpacing=de(e,rm,A.letterSpacing),this.lineBreak=de(e,sm,A.lineBreak),this.lineHeight=de(e,am,A.lineHeight),this.listStyleImage=de(e,om,A.listStyleImage),this.listStylePosition=de(e,lm,A.listStylePosition),this.listStyleType=de(e,Ko,A.listStyleType),this.marginTop=de(e,cm,A.marginTop),this.marginRight=de(e,um,A.marginRight),this.marginBottom=de(e,hm,A.marginBottom),this.marginLeft=de(e,fm,A.marginLeft),this.opacity=de(e,Im,A.opacity);var r=de(e,dm,A.overflow);this.overflowX=r[0],this.overflowY=r[r.length>1?1:0],this.overflowWrap=de(e,pm,A.overflowWrap),this.paddingTop=de(e,gm,A.paddingTop),this.paddingRight=de(e,mm,A.paddingRight),this.paddingBottom=de(e,Bm,A.paddingBottom),this.paddingLeft=de(e,_m,A.paddingLeft),this.paintOrder=de(e,Xm,A.paintOrder),this.position=de(e,vm,A.position),this.textAlign=de(e,wm,A.textAlign),this.textDecorationColor=de(e,Lm,(t=A.textDecorationColor)!==null&&t!==void 0?t:A.color),this.textDecorationLine=de(e,Rm,(i=A.textDecorationLine)!==null&&i!==void 0?i:A.textDecoration),this.textShadow=de(e,Em,A.textShadow),this.textTransform=de(e,Cm,A.textTransform),this.transform=de(e,xm,A.transform),this.transformOrigin=de(e,Fm,A.transformOrigin),this.visibility=de(e,bm,A.visibility),this.webkitTextStrokeColor=de(e,Ym,A.webkitTextStrokeColor),this.webkitTextStrokeWidth=de(e,Jm,A.webkitTextStrokeWidth),this.wordBreak=de(e,Tm,A.wordBreak),this.zIndex=de(e,Qm,A.zIndex)}return n.prototype.isVisible=function(){return this.display>0&&this.opacity>0&&this.visibility===0},n.prototype.isTransparent=function(){return dn(this.backgroundColor)},n.prototype.isTransformed=function(){return this.transform!==null},n.prototype.isPositioned=function(){return this.position!==0},n.prototype.isPositionedWithZIndex=function(){return this.isPositioned()&&!this.zIndex.auto},n.prototype.isFloating=function(){return this.float!==0},n.prototype.isInlineLevel=function(){return _A(this.display,4)||_A(this.display,33554432)||_A(this.display,268435456)||_A(this.display,536870912)||_A(this.display,67108864)||_A(this.display,134217728)},n}(),Zm=function(){function n(e,A){this.content=de(e,Gm,A.content),this.quotes=de(e,zm,A.quotes)}return n}(),cc=function(){function n(e,A){this.counterIncrement=de(e,Vm,A.counterIncrement),this.counterReset=de(e,km,A.counterReset)}return n}(),de=function(n,e,A){var t=new Rh,i=A!==null&&typeof A<"u"?A.toString():e.initialValue;t.write(i);var r=new Dh(t.read());switch(e.type){case 2:var s=r.parseComponentValue();return e.parse(n,iA(s)?s.value:e.initialValue);case 0:return e.parse(n,r.parseComponentValue());case 1:return e.parse(n,r.parseComponentValues());case 4:return r.parseComponentValue();case 3:switch(e.format){case"angle":return ia.parse(n,r.parseComponentValue());case"color":return fn.parse(n,r.parseComponentValue());case"image":return pl.parse(n,r.parseComponentValue());case"length":var a=r.parseComponentValue();return _n(a)?a:FA;case"length-percentage":var o=r.parseComponentValue();return mA(o)?o:FA;case"time":return ef.parse(n,r.parseComponentValue())}break}},jm="data-html2canvas-debug",$m=function(n){var e=n.getAttribute(jm);switch(e){case"all":return 1;case"clone":return 2;case"parse":return 3;case"render":return 4;default:return 0}},zo=function(n,e){var A=$m(n);return A===1||e===A},Qt=function(){function n(e,A){if(this.context=e,this.textNodes=[],this.elements=[],this.flags=0,zo(A,3))debugger;this.styles=new qm(e,window.getComputedStyle(A,null)),Yo(A)&&(this.styles.animationDuration.some(function(t){return t>0})&&(A.style.animationDuration="0s"),this.styles.transform!==null&&(A.style.transform="none")),this.bounds=ta(this.context,A),zo(A,4)&&(this.flags|=16)}return n}(),eB="AAAAAAAAAAAAEA4AGBkAAFAaAAACAAAAAAAIABAAGAAwADgACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAAQABIAEQATAAIABAACAAQAAgAEAAIABAAVABcAAgAEAAIABAACAAQAGAAaABwAHgAgACIAI4AlgAIABAAmwCjAKgAsAC2AL4AvQDFAMoA0gBPAVYBWgEIAAgACACMANoAYgFkAWwBdAF8AX0BhQGNAZUBlgGeAaMBlQGWAasBswF8AbsBwwF0AcsBYwHTAQgA2wG/AOMBdAF8AekB8QF0AfkB+wHiAHQBfAEIAAMC5gQIAAsCEgIIAAgAFgIeAggAIgIpAggAMQI5AkACygEIAAgASAJQAlgCYAIIAAgACAAKBQoFCgUTBRMFGQUrBSsFCAAIAAgACAAIAAgACAAIAAgACABdAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABoAmgCrwGvAQgAbgJ2AggAHgEIAAgACADnAXsCCAAIAAgAgwIIAAgACAAIAAgACACKAggAkQKZAggAPADJAAgAoQKkAqwCsgK6AsICCADJAggA0AIIAAgACAAIANYC3gIIAAgACAAIAAgACABAAOYCCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAkASoB+QIEAAgACAA8AEMCCABCBQgACABJBVAFCAAIAAgACAAIAAgACAAIAAgACABTBVoFCAAIAFoFCABfBWUFCAAIAAgACAAIAAgAbQUIAAgACAAIAAgACABzBXsFfQWFBYoFigWKBZEFigWKBYoFmAWfBaYFrgWxBbkFCAAIAAgACAAIAAgACAAIAAgACAAIAMEFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAMgFCADQBQgACAAIAAgACAAIAAgACAAIAAgACAAIAO4CCAAIAAgAiQAIAAgACABAAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAD0AggACAD8AggACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIANYFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAMDvwAIAAgAJAIIAAgACAAIAAgACAAIAAgACwMTAwgACAB9BOsEGwMjAwgAKwMyAwsFYgE3A/MEPwMIAEUDTQNRAwgAWQOsAGEDCAAIAAgACAAIAAgACABpAzQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFIQUoBSwFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABtAwgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABMAEwACAAIAAgACAAIABgACAAIAAgACAC/AAgACAAyAQgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACAAIAAwAAgACAAIAAgACAAIAAgACAAIAAAARABIAAgACAAIABQASAAIAAgAIABwAEAAjgCIABsAqAC2AL0AigDQAtwC+IJIQqVAZUBWQqVAZUBlQGVAZUBlQGrC5UBlQGVAZUBlQGVAZUBlQGVAXsKlQGVAbAK6wsrDGUMpQzlDJUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAfAKAAuZA64AtwCJALoC6ADwAAgAuACgA/oEpgO6AqsD+AAIAAgAswMIAAgACAAIAIkAuwP5AfsBwwPLAwgACAAIAAgACADRA9kDCAAIAOED6QMIAAgACAAIAAgACADuA/YDCAAIAP4DyQAIAAgABgQIAAgAXQAOBAgACAAIAAgACAAIABMECAAIAAgACAAIAAgACAD8AAQBCAAIAAgAGgQiBCoECAExBAgAEAEIAAgACAAIAAgACAAIAAgACAAIAAgACAA4BAgACABABEYECAAIAAgATAQYAQgAVAQIAAgACAAIAAgACAAIAAgACAAIAFoECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAOQEIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAB+BAcACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAEABhgSMBAgACAAIAAgAlAQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAwAEAAQABAADAAMAAwADAAQABAAEAAQABAAEAAQABHATAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAdQMIAAgACAAIAAgACAAIAMkACAAIAAgAfQMIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACFA4kDCAAIAAgACAAIAOcBCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAIcDCAAIAAgACAAIAAgACAAIAAgACAAIAJEDCAAIAAgACADFAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABgBAgAZgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAbAQCBXIECAAIAHkECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABAAJwEQACjBKoEsgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAC6BMIECAAIAAgACAAIAAgACABmBAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAxwQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAGYECAAIAAgAzgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBd0FXwUIAOIF6gXxBYoF3gT5BQAGCAaKBYoFigWKBYoFigWKBYoFigWKBYoFigXWBIoFigWKBYoFigWKBYoFigWKBYsFEAaKBYoFigWKBYoFigWKBRQGCACKBYoFigWKBQgACAAIANEECAAIABgGigUgBggAJgYIAC4GMwaKBYoF0wQ3Bj4GigWKBYoFigWKBYoFigWKBYoFigWKBYoFigUIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWLBf///////wQABAAEAAQABAAEAAQABAAEAAQAAwAEAAQAAgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAQADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUAAAAFAAUAAAAFAAUAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAQAAAAUABQAFAAUABQAFAAAAAAAFAAUAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAFAAUAAQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAAABwAHAAcAAAAHAAcABwAFAAEAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAcABwAFAAUAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAQABAAAAAAAAAAAAAAAFAAUABQAFAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAHAAcAAAAHAAcAAAAAAAUABQAHAAUAAQAHAAEABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwABAAUABQAFAAUAAAAAAAAAAAAAAAEAAQABAAEAAQABAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABQANAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAABQAHAAUABQAFAAAAAAAAAAcABQAFAAUABQAFAAQABAAEAAQABAAEAAQABAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUAAAAFAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAUAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAcABwAFAAcABwAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUABwAHAAUABQAFAAUAAAAAAAcABwAAAAAABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAAAAAAAAAAABQAFAAAAAAAFAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAFAAUABQAFAAUAAAAFAAUABwAAAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABwAFAAUABQAFAAAAAAAHAAcAAAAAAAcABwAFAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAAAAAAAAAHAAcABwAAAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAUABQAFAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAHAAcABQAHAAcAAAAFAAcABwAAAAcABwAFAAUAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAFAAcABwAFAAUABQAAAAUAAAAHAAcABwAHAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAHAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUAAAAFAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAUAAAAFAAUAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABwAFAAUABQAFAAUABQAAAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABQAFAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAFAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAHAAUABQAFAAUABQAFAAUABwAHAAcABwAHAAcABwAHAAUABwAHAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABwAHAAcABwAFAAUABwAHAAcAAAAAAAAAAAAHAAcABQAHAAcABwAHAAcABwAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAUABQAFAAUABQAFAAUAAAAFAAAABQAAAAAABQAFAAUABQAFAAUABQAFAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAUABQAFAAUABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABwAFAAcABwAHAAcABwAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAUABQAFAAUABwAHAAUABQAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABQAFAAcABwAHAAUABwAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAcABQAFAAUABQAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAAAAAABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAAAAAAAAAFAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAUABQAHAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAFAAUABQAFAAcABwAFAAUABwAHAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAcABwAFAAUABwAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABQAAAAAABQAFAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAcABwAAAAAAAAAAAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAcABwAFAAcABwAAAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAFAAUABQAAAAUABQAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABwAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAHAAcABQAHAAUABQAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAAABwAHAAAAAAAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAFAAUABwAFAAcABwAFAAcABQAFAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAAAAAABwAHAAcABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAFAAcABwAFAAUABQAFAAUABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAUABQAFAAcABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABQAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAAAAAAFAAUABwAHAAcABwAFAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAHAAUABQAFAAUABQAFAAUABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAABQAAAAUABQAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAHAAcAAAAFAAUAAAAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABQAFAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAABQAFAAUABQAFAAUABQAAAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAFAAUABQAFAAUADgAOAA4ADgAOAA4ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAMAAwADAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAAAAAAAAAAAAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAAAAAAAAAAAAsADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwACwAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAADgAOAA4AAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAAAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4AAAAOAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAAAAAAAAAAAA4AAAAOAAAAAAAAAAAADgAOAA4AAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAA=",uc="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",lr=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(var es=0;es<uc.length;es++)lr[uc.charCodeAt(es)]=es;var AB=function(n){var e=n.length*.75,A=n.length,t,i=0,r,s,a,o;n[n.length-1]==="="&&(e--,n[n.length-2]==="="&&e--);var l=typeof ArrayBuffer<"u"&&typeof Uint8Array<"u"&&typeof Uint8Array.prototype.slice<"u"?new ArrayBuffer(e):new Array(e),c=Array.isArray(l)?l:new Uint8Array(l);for(t=0;t<A;t+=4)r=lr[n.charCodeAt(t)],s=lr[n.charCodeAt(t+1)],a=lr[n.charCodeAt(t+2)],o=lr[n.charCodeAt(t+3)],c[i++]=r<<2|s>>4,c[i++]=(s&15)<<4|a>>2,c[i++]=(a&3)<<6|o&63;return l},tB=function(n){for(var e=n.length,A=[],t=0;t<e;t+=2)A.push(n[t+1]<<8|n[t]);return A},nB=function(n){for(var e=n.length,A=[],t=0;t<e;t+=4)A.push(n[t+3]<<24|n[t+2]<<16|n[t+1]<<8|n[t]);return A},Vn=5,gl=11,Ia=2,iB=gl-Vn,Af=65536>>Vn,rB=1<<Vn,La=rB-1,sB=1024>>Vn,aB=Af+sB,oB=aB,lB=32,cB=oB+lB,uB=65536>>gl,hB=1<<iB,fB=hB-1,hc=function(n,e,A){return n.slice?n.slice(e,A):new Uint16Array(Array.prototype.slice.call(n,e,A))},dB=function(n,e,A){return n.slice?n.slice(e,A):new Uint32Array(Array.prototype.slice.call(n,e,A))},pB=function(n,e){var A=AB(n),t=Array.isArray(A)?nB(A):new Uint32Array(A),i=Array.isArray(A)?tB(A):new Uint16Array(A),r=24,s=hc(i,r/2,t[4]/2),a=t[5]===2?hc(i,(r+t[4])/2):dB(t,Math.ceil((r+t[4])/4));return new gB(t[0],t[1],t[2],t[3],s,a)},gB=function(){function n(e,A,t,i,r,s){this.initialValue=e,this.errorValue=A,this.highStart=t,this.highValueIndex=i,this.index=r,this.data=s}return n.prototype.get=function(e){var A;if(e>=0){if(e<55296||e>56319&&e<=65535)return A=this.index[e>>Vn],A=(A<<Ia)+(e&La),this.data[A];if(e<=65535)return A=this.index[Af+(e-55296>>Vn)],A=(A<<Ia)+(e&La),this.data[A];if(e<this.highStart)return A=cB-uB+(e>>gl),A=this.index[A],A+=e>>Vn&fB,A=this.index[A],A=(A<<Ia)+(e&La),this.data[A];if(e<=1114111)return this.data[this.highValueIndex]}return this.errorValue},n}(),fc="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",mB=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(var As=0;As<fc.length;As++)mB[fc.charCodeAt(As)]=As;var BB=1,Ra=2,Da=3,dc=4,pc=5,_B=7,gc=8,Ha=9,Pa=10,mc=11,Bc=12,_c=13,wc=14,Oa=15,wB=function(n){for(var e=[],A=0,t=n.length;A<t;){var i=n.charCodeAt(A++);if(i>=55296&&i<=56319&&A<t){var r=n.charCodeAt(A++);(r&64512)===56320?e.push(((i&1023)<<10)+(r&1023)+65536):(e.push(i),A--)}else e.push(i)}return e},vB=function(){for(var n=[],e=0;e<arguments.length;e++)n[e]=arguments[e];if(String.fromCodePoint)return String.fromCodePoint.apply(String,n);var A=n.length;if(!A)return"";for(var t=[],i=-1,r="";++i<A;){var s=n[i];s<=65535?t.push(s):(s-=65536,t.push((s>>10)+55296,s%1024+56320)),(i+1===A||t.length>16384)&&(r+=String.fromCharCode.apply(String,t),t.length=0)}return r},EB=pB(eB),nt="×",Na="÷",CB=function(n){return EB.get(n)},xB=function(n,e,A){var t=A-2,i=e[t],r=e[A-1],s=e[A];if(r===Ra&&s===Da)return nt;if(r===Ra||r===Da||r===dc||s===Ra||s===Da||s===dc)return Na;if(r===gc&&[gc,Ha,mc,Bc].indexOf(s)!==-1||(r===mc||r===Ha)&&(s===Ha||s===Pa)||(r===Bc||r===Pa)&&s===Pa||s===_c||s===pc||s===_B||r===BB)return nt;if(r===_c&&s===wc){for(;i===pc;)i=e[--t];if(i===wc)return nt}if(r===Oa&&s===Oa){for(var a=0;i===Oa;)a++,i=e[--t];if(a%2===0)return nt}return Na},UB=function(n){var e=wB(n),A=e.length,t=0,i=0,r=e.map(CB);return{next:function(){if(t>=A)return{done:!0,value:null};for(var s=nt;t<A&&(s=xB(e,r,++t))===nt;);if(s!==nt||t===A){var a=vB.apply(null,e.slice(i,t));return i=t,{value:a,done:!1}}return{done:!0,value:null}}}},yB=function(n){for(var e=UB(n),A=[],t;!(t=e.next()).done;)t.value&&A.push(t.value.slice());return A},SB=function(n){var e=123;if(n.createRange){var A=n.createRange();if(A.getBoundingClientRect){var t=n.createElement("boundtest");t.style.height=e+"px",t.style.display="block",n.body.appendChild(t),A.selectNode(t);var i=A.getBoundingClientRect(),r=Math.round(i.height);if(n.body.removeChild(t),r===e)return!0}}return!1},MB=function(n){var e=n.createElement("boundtest");e.style.width="50px",e.style.display="block",e.style.fontSize="12px",e.style.letterSpacing="0px",e.style.wordSpacing="0px",n.body.appendChild(e);var A=n.createRange();e.innerHTML=typeof"".repeat=="function"?"&#128104;".repeat(10):"";var t=e.firstChild,i=na(t.data).map(function(o){return pA(o)}),r=0,s={},a=i.every(function(o,l){A.setStart(t,r),A.setEnd(t,r+o.length);var c=A.getBoundingClientRect();r+=o.length;var u=c.x>s.x||c.y>s.y;return s=c,l===0?!0:u});return n.body.removeChild(e),a},FB=function(){return typeof new Image().crossOrigin<"u"},bB=function(){return typeof new XMLHttpRequest().responseType=="string"},TB=function(n){var e=new Image,A=n.createElement("canvas"),t=A.getContext("2d");if(!t)return!1;e.src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";try{t.drawImage(e,0,0),A.toDataURL()}catch{return!1}return!0},vc=function(n){return n[0]===0&&n[1]===255&&n[2]===0&&n[3]===255},QB=function(n){var e=n.createElement("canvas"),A=100;e.width=A,e.height=A;var t=e.getContext("2d");if(!t)return Promise.reject(!1);t.fillStyle="rgb(0, 255, 0)",t.fillRect(0,0,A,A);var i=new Image,r=e.toDataURL();i.src=r;var s=Wo(A,A,0,0,i);return t.fillStyle="red",t.fillRect(0,0,A,A),Ec(s).then(function(a){t.drawImage(a,0,0);var o=t.getImageData(0,0,A,A).data;t.fillStyle="red",t.fillRect(0,0,A,A);var l=n.createElement("div");return l.style.backgroundImage="url("+r+")",l.style.height=A+"px",vc(o)?Ec(Wo(A,A,0,0,l)):Promise.reject(!1)}).then(function(a){return t.drawImage(a,0,0),vc(t.getImageData(0,0,A,A).data)}).catch(function(){return!1})},Wo=function(n,e,A,t,i){var r="http://www.w3.org/2000/svg",s=document.createElementNS(r,"svg"),a=document.createElementNS(r,"foreignObject");return s.setAttributeNS(null,"width",n.toString()),s.setAttributeNS(null,"height",e.toString()),a.setAttributeNS(null,"width","100%"),a.setAttributeNS(null,"height","100%"),a.setAttributeNS(null,"x",A.toString()),a.setAttributeNS(null,"y",t.toString()),a.setAttributeNS(null,"externalResourcesRequired","true"),s.appendChild(a),a.appendChild(i),s},Ec=function(n){return new Promise(function(e,A){var t=new Image;t.onload=function(){return e(t)},t.onerror=A,t.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(new XMLSerializer().serializeToString(n))})},SA={get SUPPORT_RANGE_BOUNDS(){var n=SB(document);return Object.defineProperty(SA,"SUPPORT_RANGE_BOUNDS",{value:n}),n},get SUPPORT_WORD_BREAKING(){var n=SA.SUPPORT_RANGE_BOUNDS&&MB(document);return Object.defineProperty(SA,"SUPPORT_WORD_BREAKING",{value:n}),n},get SUPPORT_SVG_DRAWING(){var n=TB(document);return Object.defineProperty(SA,"SUPPORT_SVG_DRAWING",{value:n}),n},get SUPPORT_FOREIGNOBJECT_DRAWING(){var n=typeof Array.from=="function"&&typeof window.fetch=="function"?QB(document):Promise.resolve(!1);return Object.defineProperty(SA,"SUPPORT_FOREIGNOBJECT_DRAWING",{value:n}),n},get SUPPORT_CORS_IMAGES(){var n=FB();return Object.defineProperty(SA,"SUPPORT_CORS_IMAGES",{value:n}),n},get SUPPORT_RESPONSE_TYPE(){var n=bB();return Object.defineProperty(SA,"SUPPORT_RESPONSE_TYPE",{value:n}),n},get SUPPORT_CORS_XHR(){var n="withCredentials"in new XMLHttpRequest;return Object.defineProperty(SA,"SUPPORT_CORS_XHR",{value:n}),n},get SUPPORT_NATIVE_TEXT_SEGMENTATION(){var n=!!(typeof Intl<"u"&&Intl.Segmenter);return Object.defineProperty(SA,"SUPPORT_NATIVE_TEXT_SEGMENTATION",{value:n}),n}},pr=function(){function n(e,A){this.text=e,this.bounds=A}return n}(),IB=function(n,e,A,t){var i=DB(e,A),r=[],s=0;return i.forEach(function(a){if(A.textDecorationLine.length||a.trim().length>0)if(SA.SUPPORT_RANGE_BOUNDS){var o=Cc(t,s,a.length).getClientRects();if(o.length>1){var l=ml(a),c=0;l.forEach(function(h){r.push(new pr(h,Xt.fromDOMRectList(n,Cc(t,c+s,h.length).getClientRects()))),c+=h.length})}else r.push(new pr(a,Xt.fromDOMRectList(n,o)))}else{var u=t.splitText(a.length);r.push(new pr(a,LB(n,t))),t=u}else SA.SUPPORT_RANGE_BOUNDS||(t=t.splitText(a.length));s+=a.length}),r},LB=function(n,e){var A=e.ownerDocument;if(A){var t=A.createElement("html2canvaswrapper");t.appendChild(e.cloneNode(!0));var i=e.parentNode;if(i){i.replaceChild(t,e);var r=ta(n,t);return t.firstChild&&i.replaceChild(t.firstChild,t),r}}return Xt.EMPTY},Cc=function(n,e,A){var t=n.ownerDocument;if(!t)throw new Error("Node has no owner document");var i=t.createRange();return i.setStart(n,e),i.setEnd(n,e+A),i},ml=function(n){if(SA.SUPPORT_NATIVE_TEXT_SEGMENTATION){var e=new Intl.Segmenter(void 0,{granularity:"grapheme"});return Array.from(e.segment(n)).map(function(A){return A.segment})}return yB(n)},RB=function(n,e){if(SA.SUPPORT_NATIVE_TEXT_SEGMENTATION){var A=new Intl.Segmenter(void 0,{granularity:"word"});return Array.from(A.segment(n)).map(function(t){return t.segment})}return PB(n,e)},DB=function(n,e){return e.letterSpacing!==0?ml(n):RB(n,e)},HB=[32,160,4961,65792,65793,4153,4241],PB=function(n,e){for(var A=up(n,{lineBreak:e.lineBreak,wordBreak:e.overflowWrap==="break-word"?"break-word":e.wordBreak}),t=[],i,r=function(){if(i.value){var s=i.value.slice(),a=na(s),o="";a.forEach(function(l){HB.indexOf(l)===-1?o+=pA(l):(o.length&&t.push(o),t.push(pA(l)),o="")}),o.length&&t.push(o)}};!(i=A.next()).done;)r();return t},OB=function(){function n(e,A,t){this.text=NB(A.data,t.textTransform),this.textBounds=IB(e,this.text,t,A)}return n}(),NB=function(n,e){switch(e){case 1:return n.toLowerCase();case 3:return n.replace(GB,VB);case 2:return n.toUpperCase();default:return n}},GB=/(^|\s|:|-|\(|\))([a-z])/g,VB=function(n,e,A){return n.length>0?e+A.toUpperCase():n},tf=function(n){wt(e,n);function e(A,t){var i=n.call(this,A,t)||this;return i.src=t.currentSrc||t.src,i.intrinsicWidth=t.naturalWidth,i.intrinsicHeight=t.naturalHeight,i.context.cache.addImage(i.src),i}return e}(Qt),nf=function(n){wt(e,n);function e(A,t){var i=n.call(this,A,t)||this;return i.canvas=t,i.intrinsicWidth=t.width,i.intrinsicHeight=t.height,i}return e}(Qt),rf=function(n){wt(e,n);function e(A,t){var i=n.call(this,A,t)||this,r=new XMLSerializer,s=ta(A,t);return t.setAttribute("width",s.width+"px"),t.setAttribute("height",s.height+"px"),i.svg="data:image/svg+xml,"+encodeURIComponent(r.serializeToString(t)),i.intrinsicWidth=t.width.baseVal.value,i.intrinsicHeight=t.height.baseVal.value,i.context.cache.addImage(i.svg),i}return e}(Qt),sf=function(n){wt(e,n);function e(A,t){var i=n.call(this,A,t)||this;return i.value=t.value,i}return e}(Qt),Xo=function(n){wt(e,n);function e(A,t){var i=n.call(this,A,t)||this;return i.start=t.start,i.reversed=typeof t.reversed=="boolean"&&t.reversed===!0,i}return e}(Qt),kB=[{type:15,flags:0,unit:"px",number:3}],KB=[{type:16,flags:0,number:50}],zB=function(n){return n.width>n.height?new Xt(n.left+(n.width-n.height)/2,n.top,n.height,n.height):n.width<n.height?new Xt(n.left,n.top+(n.height-n.width)/2,n.width,n.width):n},WB=function(n){var e=n.type===XB?new Array(n.value.length+1).join("•"):n.value;return e.length===0?n.placeholder||"":e},Hs="checkbox",Ps="radio",XB="password",xc=707406591,Bl=function(n){wt(e,n);function e(A,t){var i=n.call(this,A,t)||this;switch(i.type=t.type.toLowerCase(),i.checked=t.checked,i.value=WB(t),(i.type===Hs||i.type===Ps)&&(i.styles.backgroundColor=3739148031,i.styles.borderTopColor=i.styles.borderRightColor=i.styles.borderBottomColor=i.styles.borderLeftColor=2779096575,i.styles.borderTopWidth=i.styles.borderRightWidth=i.styles.borderBottomWidth=i.styles.borderLeftWidth=1,i.styles.borderTopStyle=i.styles.borderRightStyle=i.styles.borderBottomStyle=i.styles.borderLeftStyle=1,i.styles.backgroundClip=[0],i.styles.backgroundOrigin=[0],i.bounds=zB(i.bounds)),i.type){case Hs:i.styles.borderTopRightRadius=i.styles.borderTopLeftRadius=i.styles.borderBottomRightRadius=i.styles.borderBottomLeftRadius=kB;break;case Ps:i.styles.borderTopRightRadius=i.styles.borderTopLeftRadius=i.styles.borderBottomRightRadius=i.styles.borderBottomLeftRadius=KB;break}return i}return e}(Qt),af=function(n){wt(e,n);function e(A,t){var i=n.call(this,A,t)||this,r=t.options[t.selectedIndex||0];return i.value=r&&r.text||"",i}return e}(Qt),of=function(n){wt(e,n);function e(A,t){var i=n.call(this,A,t)||this;return i.value=t.value,i}return e}(Qt),lf=function(n){wt(e,n);function e(A,t){var i=n.call(this,A,t)||this;i.src=t.src,i.width=parseInt(t.width,10)||0,i.height=parseInt(t.height,10)||0,i.backgroundColor=i.styles.backgroundColor;try{if(t.contentWindow&&t.contentWindow.document&&t.contentWindow.document.documentElement){i.tree=uf(A,t.contentWindow.document.documentElement);var r=t.contentWindow.document.documentElement?fr(A,getComputedStyle(t.contentWindow.document.documentElement).backgroundColor):Wt.TRANSPARENT,s=t.contentWindow.document.body?fr(A,getComputedStyle(t.contentWindow.document.body).backgroundColor):Wt.TRANSPARENT;i.backgroundColor=dn(r)?dn(s)?i.styles.backgroundColor:s:r}}catch{}return i}return e}(Qt),YB=["OL","UL","MENU"],Ts=function(n,e,A,t){for(var i=e.firstChild,r=void 0;i;i=r)if(r=i.nextSibling,hf(i)&&i.data.trim().length>0)A.textNodes.push(new OB(n,i,A.styles));else if(Ci(i))if(gf(i)&&i.assignedNodes)i.assignedNodes().forEach(function(a){return Ts(n,a,A,t)});else{var s=cf(n,i);s.styles.isVisible()&&(JB(i,s,t)?s.flags|=4:qB(s.styles)&&(s.flags|=2),YB.indexOf(i.tagName)!==-1&&(s.flags|=8),A.elements.push(s),i.slot,i.shadowRoot?Ts(n,i.shadowRoot,s,t):!Os(i)&&!ff(i)&&!Ns(i)&&Ts(n,i,s,t))}},cf=function(n,e){return Jo(e)?new tf(n,e):df(e)?new nf(n,e):ff(e)?new rf(n,e):ZB(e)?new sf(n,e):jB(e)?new Xo(n,e):$B(e)?new Bl(n,e):Ns(e)?new af(n,e):Os(e)?new of(n,e):pf(e)?new lf(n,e):new Qt(n,e)},uf=function(n,e){var A=cf(n,e);return A.flags|=4,Ts(n,e,A,A),A},JB=function(n,e,A){return e.styles.isPositionedWithZIndex()||e.styles.opacity<1||e.styles.isTransformed()||_l(n)&&A.styles.isTransparent()},qB=function(n){return n.isPositioned()||n.isFloating()},hf=function(n){return n.nodeType===Node.TEXT_NODE},Ci=function(n){return n.nodeType===Node.ELEMENT_NODE},Yo=function(n){return Ci(n)&&typeof n.style<"u"&&!Qs(n)},Qs=function(n){return typeof n.className=="object"},ZB=function(n){return n.tagName==="LI"},jB=function(n){return n.tagName==="OL"},$B=function(n){return n.tagName==="INPUT"},e0=function(n){return n.tagName==="HTML"},ff=function(n){return n.tagName==="svg"},_l=function(n){return n.tagName==="BODY"},df=function(n){return n.tagName==="CANVAS"},Uc=function(n){return n.tagName==="VIDEO"},Jo=function(n){return n.tagName==="IMG"},pf=function(n){return n.tagName==="IFRAME"},yc=function(n){return n.tagName==="STYLE"},A0=function(n){return n.tagName==="SCRIPT"},Os=function(n){return n.tagName==="TEXTAREA"},Ns=function(n){return n.tagName==="SELECT"},gf=function(n){return n.tagName==="SLOT"},Sc=function(n){return n.tagName.indexOf("-")>0},t0=function(){function n(){this.counters={}}return n.prototype.getCounterValue=function(e){var A=this.counters[e];return A&&A.length?A[A.length-1]:1},n.prototype.getCounterValues=function(e){var A=this.counters[e];return A||[]},n.prototype.pop=function(e){var A=this;e.forEach(function(t){return A.counters[t].pop()})},n.prototype.parse=function(e){var A=this,t=e.counterIncrement,i=e.counterReset,r=!0;t!==null&&t.forEach(function(a){var o=A.counters[a.counter];o&&a.increment!==0&&(r=!1,o.length||o.push(1),o[Math.max(0,o.length-1)]+=a.increment)});var s=[];return r&&i.forEach(function(a){var o=A.counters[a.counter];s.push(a.counter),o||(o=A.counters[a.counter]=[]),o.push(a.reset)}),s},n}(),Mc={integers:[1e3,900,500,400,100,90,50,40,10,9,5,4,1],values:["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"]},Fc={integers:[9e3,8e3,7e3,6e3,5e3,4e3,3e3,2e3,1e3,900,800,700,600,500,400,300,200,100,90,80,70,60,50,40,30,20,10,9,8,7,6,5,4,3,2,1],values:["Ք","Փ","Ւ","Ց","Ր","Տ","Վ","Ս","Ռ","Ջ","Պ","Չ","Ո","Շ","Ն","Յ","Մ","Ճ","Ղ","Ձ","Հ","Կ","Ծ","Խ","Լ","Ի","Ժ","Թ","Ը","Է","Զ","Ե","Դ","Գ","Բ","Ա"]},n0={integers:[1e4,9e3,8e3,7e3,6e3,5e3,4e3,3e3,2e3,1e3,400,300,200,100,90,80,70,60,50,40,30,20,19,18,17,16,15,10,9,8,7,6,5,4,3,2,1],values:["י׳","ט׳","ח׳","ז׳","ו׳","ה׳","ד׳","ג׳","ב׳","א׳","ת","ש","ר","ק","צ","פ","ע","ס","נ","מ","ל","כ","יט","יח","יז","טז","טו","י","ט","ח","ז","ו","ה","ד","ג","ב","א"]},i0={integers:[1e4,9e3,8e3,7e3,6e3,5e3,4e3,3e3,2e3,1e3,900,800,700,600,500,400,300,200,100,90,80,70,60,50,40,30,20,10,9,8,7,6,5,4,3,2,1],values:["ჵ","ჰ","ჯ","ჴ","ხ","ჭ","წ","ძ","ც","ჩ","შ","ყ","ღ","ქ","ფ","ჳ","ტ","ს","რ","ჟ","პ","ო","ჲ","ნ","მ","ლ","კ","ი","თ","ჱ","ზ","ვ","ე","დ","გ","ბ","ა"]},jn=function(n,e,A,t,i,r){return n<e||n>A?Cr(n,i,r.length>0):t.integers.reduce(function(s,a,o){for(;n>=a;)n-=a,s+=t.values[o];return s},"")+r},mf=function(n,e,A,t){var i="";do A||n--,i=t(n)+i,n/=e;while(n*e>=e);return i},dA=function(n,e,A,t,i){var r=A-e+1;return(n<0?"-":"")+(mf(Math.abs(n),r,t,function(s){return pA(Math.floor(s%r)+e)})+i)},Cn=function(n,e,A){A===void 0&&(A=". ");var t=e.length;return mf(Math.abs(n),t,!1,function(i){return e[Math.floor(i%t)]})+A},wi=1,tn=2,nn=4,cr=8,Dt=function(n,e,A,t,i,r){if(n<-9999||n>9999)return Cr(n,4,i.length>0);var s=Math.abs(n),a=i;if(s===0)return e[0]+a;for(var o=0;s>0&&o<=4;o++){var l=s%10;l===0&&_A(r,wi)&&a!==""?a=e[l]+a:l>1||l===1&&o===0||l===1&&o===1&&_A(r,tn)||l===1&&o===1&&_A(r,nn)&&n>100||l===1&&o>1&&_A(r,cr)?a=e[l]+(o>0?A[o-1]:"")+a:l===1&&o>0&&(a=A[o-1]+a),s=Math.floor(s/10)}return(n<0?t:"")+a},bc="十百千萬",Tc="拾佰仟萬",Qc="マイナス",Ga="마이너스",Cr=function(n,e,A){var t=A?". ":"",i=A?"、":"",r=A?", ":"",s=A?" ":"";switch(e){case 0:return"•"+s;case 1:return"◦"+s;case 2:return"◾"+s;case 5:var a=dA(n,48,57,!0,t);return a.length<4?"0"+a:a;case 4:return Cn(n,"〇一二三四五六七八九",i);case 6:return jn(n,1,3999,Mc,3,t).toLowerCase();case 7:return jn(n,1,3999,Mc,3,t);case 8:return dA(n,945,969,!1,t);case 9:return dA(n,97,122,!1,t);case 10:return dA(n,65,90,!1,t);case 11:return dA(n,1632,1641,!0,t);case 12:case 49:return jn(n,1,9999,Fc,3,t);case 35:return jn(n,1,9999,Fc,3,t).toLowerCase();case 13:return dA(n,2534,2543,!0,t);case 14:case 30:return dA(n,6112,6121,!0,t);case 15:return Cn(n,"子丑寅卯辰巳午未申酉戌亥",i);case 16:return Cn(n,"甲乙丙丁戊己庚辛壬癸",i);case 17:case 48:return Dt(n,"零一二三四五六七八九",bc,"負",i,tn|nn|cr);case 47:return Dt(n,"零壹貳參肆伍陸柒捌玖",Tc,"負",i,wi|tn|nn|cr);case 42:return Dt(n,"零一二三四五六七八九",bc,"负",i,tn|nn|cr);case 41:return Dt(n,"零壹贰叁肆伍陆柒捌玖",Tc,"负",i,wi|tn|nn|cr);case 26:return Dt(n,"〇一二三四五六七八九","十百千万",Qc,i,0);case 25:return Dt(n,"零壱弐参四伍六七八九","拾百千万",Qc,i,wi|tn|nn);case 31:return Dt(n,"영일이삼사오육칠팔구","십백천만",Ga,r,wi|tn|nn);case 33:return Dt(n,"零一二三四五六七八九","十百千萬",Ga,r,0);case 32:return Dt(n,"零壹貳參四五六七八九","拾百千",Ga,r,wi|tn|nn);case 18:return dA(n,2406,2415,!0,t);case 20:return jn(n,1,19999,i0,3,t);case 21:return dA(n,2790,2799,!0,t);case 22:return dA(n,2662,2671,!0,t);case 22:return jn(n,1,10999,n0,3,t);case 23:return Cn(n,"あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわゐゑをん");case 24:return Cn(n,"いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせす");case 27:return dA(n,3302,3311,!0,t);case 28:return Cn(n,"アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン",i);case 29:return Cn(n,"イロハニホヘトチリヌルヲワカヨタレソツネナラムウヰノオクヤマケフコエテアサキユメミシヱヒモセス",i);case 34:return dA(n,3792,3801,!0,t);case 37:return dA(n,6160,6169,!0,t);case 38:return dA(n,4160,4169,!0,t);case 39:return dA(n,2918,2927,!0,t);case 40:return dA(n,1776,1785,!0,t);case 43:return dA(n,3046,3055,!0,t);case 44:return dA(n,3174,3183,!0,t);case 45:return dA(n,3664,3673,!0,t);case 46:return dA(n,3872,3881,!0,t);case 3:default:return dA(n,48,57,!0,t)}},Bf="data-html2canvas-ignore",Ic=function(){function n(e,A,t){if(this.context=e,this.options=t,this.scrolledElements=[],this.referenceElement=A,this.counters=new t0,this.quoteDepth=0,!A.ownerDocument)throw new Error("Cloned element does not have an owner document");this.documentElement=this.cloneNode(A.ownerDocument.documentElement,!1)}return n.prototype.toIFrame=function(e,A){var t=this,i=r0(e,A);if(!i.contentWindow)return Promise.reject("Unable to find iframe window");var r=e.defaultView.pageXOffset,s=e.defaultView.pageYOffset,a=i.contentWindow,o=a.document,l=o0(i).then(function(){return kA(t,void 0,void 0,function(){var c,u;return DA(this,function(h){switch(h.label){case 0:return this.scrolledElements.forEach(h0),a&&(a.scrollTo(A.left,A.top),/(iPad|iPhone|iPod)/g.test(navigator.userAgent)&&(a.scrollY!==A.top||a.scrollX!==A.left)&&(this.context.logger.warn("Unable to restore scroll position for cloned document"),this.context.windowBounds=this.context.windowBounds.add(a.scrollX-A.left,a.scrollY-A.top,0,0))),c=this.options.onclone,u=this.clonedReferenceElement,typeof u>"u"?[2,Promise.reject("Error finding the "+this.referenceElement.nodeName+" in the cloned document")]:o.fonts&&o.fonts.ready?[4,o.fonts.ready]:[3,2];case 1:h.sent(),h.label=2;case 2:return/(AppleWebKit)/g.test(navigator.userAgent)?[4,a0(o)]:[3,4];case 3:h.sent(),h.label=4;case 4:return typeof c=="function"?[2,Promise.resolve().then(function(){return c(o,u)}).then(function(){return i})]:[2,i]}})})});return o.open(),o.write(c0(document.doctype)+"<html></html>"),u0(this.referenceElement.ownerDocument,r,s),o.replaceChild(o.adoptNode(this.documentElement),o.documentElement),o.close(),l},n.prototype.createElementClone=function(e){if(zo(e,2))debugger;if(df(e))return this.createCanvasClone(e);if(Uc(e))return this.createVideoClone(e);if(yc(e))return this.createStyleClone(e);var A=e.cloneNode(!1);return Jo(A)&&(Jo(e)&&e.currentSrc&&e.currentSrc!==e.src&&(A.src=e.currentSrc,A.srcset=""),A.loading==="lazy"&&(A.loading="eager")),Sc(A)?this.createCustomElementClone(A):A},n.prototype.createCustomElementClone=function(e){var A=document.createElement("html2canvascustomelement");return Va(e.style,A),A},n.prototype.createStyleClone=function(e){try{var A=e.sheet;if(A&&A.cssRules){var t=[].slice.call(A.cssRules,0).reduce(function(r,s){return s&&typeof s.cssText=="string"?r+s.cssText:r},""),i=e.cloneNode(!1);return i.textContent=t,i}}catch(r){if(this.context.logger.error("Unable to access cssRules property",r),r.name!=="SecurityError")throw r}return e.cloneNode(!1)},n.prototype.createCanvasClone=function(e){var A;if(this.options.inlineImages&&e.ownerDocument){var t=e.ownerDocument.createElement("img");try{return t.src=e.toDataURL(),t}catch{this.context.logger.info("Unable to inline canvas contents, canvas is tainted",e)}}var i=e.cloneNode(!1);try{i.width=e.width,i.height=e.height;var r=e.getContext("2d"),s=i.getContext("2d");if(s)if(!this.options.allowTaint&&r)s.putImageData(r.getImageData(0,0,e.width,e.height),0,0);else{var a=(A=e.getContext("webgl2"))!==null&&A!==void 0?A:e.getContext("webgl");if(a){var o=a.getContextAttributes();(o==null?void 0:o.preserveDrawingBuffer)===!1&&this.context.logger.warn("Unable to clone WebGL context as it has preserveDrawingBuffer=false",e)}s.drawImage(e,0,0)}return i}catch{this.context.logger.info("Unable to clone canvas as it is tainted",e)}return i},n.prototype.createVideoClone=function(e){var A=e.ownerDocument.createElement("canvas");A.width=e.offsetWidth,A.height=e.offsetHeight;var t=A.getContext("2d");try{return t&&(t.drawImage(e,0,0,A.width,A.height),this.options.allowTaint||t.getImageData(0,0,A.width,A.height)),A}catch{this.context.logger.info("Unable to clone video as it is tainted",e)}var i=e.ownerDocument.createElement("canvas");return i.width=e.offsetWidth,i.height=e.offsetHeight,i},n.prototype.appendChildNode=function(e,A,t){(!Ci(A)||!A0(A)&&!A.hasAttribute(Bf)&&(typeof this.options.ignoreElements!="function"||!this.options.ignoreElements(A)))&&(!this.options.copyStyles||!Ci(A)||!yc(A))&&e.appendChild(this.cloneNode(A,t))},n.prototype.cloneChildNodes=function(e,A,t){for(var i=this,r=e.shadowRoot?e.shadowRoot.firstChild:e.firstChild;r;r=r.nextSibling)if(Ci(r)&&gf(r)&&typeof r.assignedNodes=="function"){var s=r.assignedNodes();s.length&&s.forEach(function(a){return i.appendChildNode(A,a,t)})}else this.appendChildNode(A,r,t)},n.prototype.cloneNode=function(e,A){if(hf(e))return document.createTextNode(e.data);if(!e.ownerDocument)return e.cloneNode(!1);var t=e.ownerDocument.defaultView;if(t&&Ci(e)&&(Yo(e)||Qs(e))){var i=this.createElementClone(e);i.style.transitionProperty="none";var r=t.getComputedStyle(e),s=t.getComputedStyle(e,":before"),a=t.getComputedStyle(e,":after");this.referenceElement===e&&Yo(i)&&(this.clonedReferenceElement=i),_l(i)&&p0(i);var o=this.counters.parse(new cc(this.context,r)),l=this.resolvePseudoContent(e,i,s,gr.BEFORE);Sc(e)&&(A=!0),Uc(e)||this.cloneChildNodes(e,i,A),l&&i.insertBefore(l,i.firstChild);var c=this.resolvePseudoContent(e,i,a,gr.AFTER);return c&&i.appendChild(c),this.counters.pop(o),(r&&(this.options.copyStyles||Qs(e))&&!pf(e)||A)&&Va(r,i),(e.scrollTop!==0||e.scrollLeft!==0)&&this.scrolledElements.push([i,e.scrollLeft,e.scrollTop]),(Os(e)||Ns(e))&&(Os(i)||Ns(i))&&(i.value=e.value),i}return e.cloneNode(!1)},n.prototype.resolvePseudoContent=function(e,A,t,i){var r=this;if(t){var s=t.content,a=A.ownerDocument;if(!(!a||!s||s==="none"||s==="-moz-alt-content"||t.display==="none")){this.counters.parse(new cc(this.context,t));var o=new Zm(this.context,t),l=a.createElement("html2canvaspseudoelement");Va(t,l),o.content.forEach(function(u){if(u.type===0)l.appendChild(a.createTextNode(u.value));else if(u.type===22){var h=a.createElement("img");h.src=u.value,h.style.opacity="1",l.appendChild(h)}else if(u.type===18){if(u.name==="attr"){var p=u.values.filter(iA);p.length&&l.appendChild(a.createTextNode(e.getAttribute(p[0].value)||""))}else if(u.name==="counter"){var g=u.values.filter(Ni),m=g[0],d=g[1];if(m&&iA(m)){var f=r.counters.getCounterValue(m.value),v=d&&iA(d)?Ko.parse(r.context,d.value):3;l.appendChild(a.createTextNode(Cr(f,v,!1)))}}else if(u.name==="counters"){var w=u.values.filter(Ni),m=w[0],C=w[1],d=w[2];if(m&&iA(m)){var b=r.counters.getCounterValues(m.value),U=d&&iA(d)?Ko.parse(r.context,d.value):3,S=C&&C.type===0?C.value:"",H=b.map(function(M){return Cr(M,U,!1)}).join(S);l.appendChild(a.createTextNode(H))}}}else if(u.type===20)switch(u.value){case"open-quote":l.appendChild(a.createTextNode(lc(o.quotes,r.quoteDepth++,!0)));break;case"close-quote":l.appendChild(a.createTextNode(lc(o.quotes,--r.quoteDepth,!1)));break;default:l.appendChild(a.createTextNode(u.value))}}),l.className=qo+" "+Zo;var c=i===gr.BEFORE?" "+qo:" "+Zo;return Qs(A)?A.className.baseValue+=c:A.className+=c,l}}},n.destroy=function(e){return e.parentNode?(e.parentNode.removeChild(e),!0):!1},n}(),gr;(function(n){n[n.BEFORE=0]="BEFORE",n[n.AFTER=1]="AFTER"})(gr||(gr={}));var r0=function(n,e){var A=n.createElement("iframe");return A.className="html2canvas-container",A.style.visibility="hidden",A.style.position="fixed",A.style.left="-10000px",A.style.top="0px",A.style.border="0",A.width=e.width.toString(),A.height=e.height.toString(),A.scrolling="no",A.setAttribute(Bf,"true"),n.body.appendChild(A),A},s0=function(n){return new Promise(function(e){if(n.complete){e();return}if(!n.src){e();return}n.onload=e,n.onerror=e})},a0=function(n){return Promise.all([].slice.call(n.images,0).map(s0))},o0=function(n){return new Promise(function(e,A){var t=n.contentWindow;if(!t)return A("No window assigned for iframe");var i=t.document;t.onload=n.onload=function(){t.onload=n.onload=null;var r=setInterval(function(){i.body.childNodes.length>0&&i.readyState==="complete"&&(clearInterval(r),e(n))},50)}})},l0=["all","d","content"],Va=function(n,e){for(var A=n.length-1;A>=0;A--){var t=n.item(A);l0.indexOf(t)===-1&&e.style.setProperty(t,n.getPropertyValue(t))}return e},c0=function(n){var e="";return n&&(e+="<!DOCTYPE ",n.name&&(e+=n.name),n.internalSubset&&(e+=n.internalSubset),n.publicId&&(e+='"'+n.publicId+'"'),n.systemId&&(e+='"'+n.systemId+'"'),e+=">"),e},u0=function(n,e,A){n&&n.defaultView&&(e!==n.defaultView.pageXOffset||A!==n.defaultView.pageYOffset)&&n.defaultView.scrollTo(e,A)},h0=function(n){var e=n[0],A=n[1],t=n[2];e.scrollLeft=A,e.scrollTop=t},f0=":before",d0=":after",qo="___html2canvas___pseudoelement_before",Zo="___html2canvas___pseudoelement_after",Lc=`{
    content: "" !important;
    display: none !important;
}`,p0=function(n){g0(n,"."+qo+f0+Lc+`
         .`+Zo+d0+Lc)},g0=function(n,e){var A=n.ownerDocument;if(A){var t=A.createElement("style");t.textContent=e,n.appendChild(t)}},_f=function(){function n(){}return n.getOrigin=function(e){var A=n._link;return A?(A.href=e,A.href=A.href,A.protocol+A.hostname+A.port):"about:blank"},n.isSameOrigin=function(e){return n.getOrigin(e)===n._origin},n.setContext=function(e){n._link=e.document.createElement("a"),n._origin=n.getOrigin(e.location.href)},n._origin="about:blank",n}(),m0=function(){function n(e,A){this.context=e,this._options=A,this._cache={}}return n.prototype.addImage=function(e){var A=Promise.resolve();return this.has(e)||(Ka(e)||v0(e))&&(this._cache[e]=this.loadImage(e)).catch(function(){}),A},n.prototype.match=function(e){return this._cache[e]},n.prototype.loadImage=function(e){return kA(this,void 0,void 0,function(){var A,t,i,r,s=this;return DA(this,function(a){switch(a.label){case 0:return A=_f.isSameOrigin(e),t=!ka(e)&&this._options.useCORS===!0&&SA.SUPPORT_CORS_IMAGES&&!A,i=!ka(e)&&!A&&!Ka(e)&&typeof this._options.proxy=="string"&&SA.SUPPORT_CORS_XHR&&!t,!A&&this._options.allowTaint===!1&&!ka(e)&&!Ka(e)&&!i&&!t?[2]:(r=e,i?[4,this.proxy(r)]:[3,2]);case 1:r=a.sent(),a.label=2;case 2:return this.context.logger.debug("Added image "+e.substring(0,256)),[4,new Promise(function(o,l){var c=new Image;c.onload=function(){return o(c)},c.onerror=l,(E0(r)||t)&&(c.crossOrigin="anonymous"),c.src=r,c.complete===!0&&setTimeout(function(){return o(c)},500),s._options.imageTimeout>0&&setTimeout(function(){return l("Timed out ("+s._options.imageTimeout+"ms) loading image")},s._options.imageTimeout)})];case 3:return[2,a.sent()]}})})},n.prototype.has=function(e){return typeof this._cache[e]<"u"},n.prototype.keys=function(){return Promise.resolve(Object.keys(this._cache))},n.prototype.proxy=function(e){var A=this,t=this._options.proxy;if(!t)throw new Error("No proxy defined");var i=e.substring(0,256);return new Promise(function(r,s){var a=SA.SUPPORT_RESPONSE_TYPE?"blob":"text",o=new XMLHttpRequest;o.onload=function(){if(o.status===200)if(a==="text")r(o.response);else{var u=new FileReader;u.addEventListener("load",function(){return r(u.result)},!1),u.addEventListener("error",function(h){return s(h)},!1),u.readAsDataURL(o.response)}else s("Failed to proxy resource "+i+" with status code "+o.status)},o.onerror=s;var l=t.indexOf("?")>-1?"&":"?";if(o.open("GET",""+t+l+"url="+encodeURIComponent(e)+"&responseType="+a),a!=="text"&&o instanceof XMLHttpRequest&&(o.responseType=a),A._options.imageTimeout){var c=A._options.imageTimeout;o.timeout=c,o.ontimeout=function(){return s("Timed out ("+c+"ms) proxying "+i)}}o.send()})},n}(),B0=/^data:image\/svg\+xml/i,_0=/^data:image\/.*;base64,/i,w0=/^data:image\/.*/i,v0=function(n){return SA.SUPPORT_SVG_DRAWING||!C0(n)},ka=function(n){return w0.test(n)},E0=function(n){return _0.test(n)},Ka=function(n){return n.substr(0,4)==="blob"},C0=function(n){return n.substr(-3).toLowerCase()==="svg"||B0.test(n)},he=function(){function n(e,A){this.type=0,this.x=e,this.y=A}return n.prototype.add=function(e,A){return new n(this.x+e,this.y+A)},n}(),$n=function(n,e,A){return new he(n.x+(e.x-n.x)*A,n.y+(e.y-n.y)*A)},ts=function(){function n(e,A,t,i){this.type=1,this.start=e,this.startControl=A,this.endControl=t,this.end=i}return n.prototype.subdivide=function(e,A){var t=$n(this.start,this.startControl,e),i=$n(this.startControl,this.endControl,e),r=$n(this.endControl,this.end,e),s=$n(t,i,e),a=$n(i,r,e),o=$n(s,a,e);return A?new n(this.start,t,s,o):new n(o,a,r,this.end)},n.prototype.add=function(e,A){return new n(this.start.add(e,A),this.startControl.add(e,A),this.endControl.add(e,A),this.end.add(e,A))},n.prototype.reverse=function(){return new n(this.end,this.endControl,this.startControl,this.start)},n}(),rt=function(n){return n.type===1},x0=function(){function n(e){var A=e.styles,t=e.bounds,i=or(A.borderTopLeftRadius,t.width,t.height),r=i[0],s=i[1],a=or(A.borderTopRightRadius,t.width,t.height),o=a[0],l=a[1],c=or(A.borderBottomRightRadius,t.width,t.height),u=c[0],h=c[1],p=or(A.borderBottomLeftRadius,t.width,t.height),g=p[0],m=p[1],d=[];d.push((r+o)/t.width),d.push((g+u)/t.width),d.push((s+m)/t.height),d.push((l+h)/t.height);var f=Math.max.apply(Math,d);f>1&&(r/=f,s/=f,o/=f,l/=f,u/=f,h/=f,g/=f,m/=f);var v=t.width-o,w=t.height-h,C=t.width-u,b=t.height-m,U=A.borderTopWidth,S=A.borderRightWidth,H=A.borderBottomWidth,z=A.borderLeftWidth,B=sA(A.paddingTop,e.bounds.width),M=sA(A.paddingRight,e.bounds.width),K=sA(A.paddingBottom,e.bounds.width),W=sA(A.paddingLeft,e.bounds.width);this.topLeftBorderDoubleOuterBox=r>0||s>0?lA(t.left+z/3,t.top+U/3,r-z/3,s-U/3,tA.TOP_LEFT):new he(t.left+z/3,t.top+U/3),this.topRightBorderDoubleOuterBox=r>0||s>0?lA(t.left+v,t.top+U/3,o-S/3,l-U/3,tA.TOP_RIGHT):new he(t.left+t.width-S/3,t.top+U/3),this.bottomRightBorderDoubleOuterBox=u>0||h>0?lA(t.left+C,t.top+w,u-S/3,h-H/3,tA.BOTTOM_RIGHT):new he(t.left+t.width-S/3,t.top+t.height-H/3),this.bottomLeftBorderDoubleOuterBox=g>0||m>0?lA(t.left+z/3,t.top+b,g-z/3,m-H/3,tA.BOTTOM_LEFT):new he(t.left+z/3,t.top+t.height-H/3),this.topLeftBorderDoubleInnerBox=r>0||s>0?lA(t.left+z*2/3,t.top+U*2/3,r-z*2/3,s-U*2/3,tA.TOP_LEFT):new he(t.left+z*2/3,t.top+U*2/3),this.topRightBorderDoubleInnerBox=r>0||s>0?lA(t.left+v,t.top+U*2/3,o-S*2/3,l-U*2/3,tA.TOP_RIGHT):new he(t.left+t.width-S*2/3,t.top+U*2/3),this.bottomRightBorderDoubleInnerBox=u>0||h>0?lA(t.left+C,t.top+w,u-S*2/3,h-H*2/3,tA.BOTTOM_RIGHT):new he(t.left+t.width-S*2/3,t.top+t.height-H*2/3),this.bottomLeftBorderDoubleInnerBox=g>0||m>0?lA(t.left+z*2/3,t.top+b,g-z*2/3,m-H*2/3,tA.BOTTOM_LEFT):new he(t.left+z*2/3,t.top+t.height-H*2/3),this.topLeftBorderStroke=r>0||s>0?lA(t.left+z/2,t.top+U/2,r-z/2,s-U/2,tA.TOP_LEFT):new he(t.left+z/2,t.top+U/2),this.topRightBorderStroke=r>0||s>0?lA(t.left+v,t.top+U/2,o-S/2,l-U/2,tA.TOP_RIGHT):new he(t.left+t.width-S/2,t.top+U/2),this.bottomRightBorderStroke=u>0||h>0?lA(t.left+C,t.top+w,u-S/2,h-H/2,tA.BOTTOM_RIGHT):new he(t.left+t.width-S/2,t.top+t.height-H/2),this.bottomLeftBorderStroke=g>0||m>0?lA(t.left+z/2,t.top+b,g-z/2,m-H/2,tA.BOTTOM_LEFT):new he(t.left+z/2,t.top+t.height-H/2),this.topLeftBorderBox=r>0||s>0?lA(t.left,t.top,r,s,tA.TOP_LEFT):new he(t.left,t.top),this.topRightBorderBox=o>0||l>0?lA(t.left+v,t.top,o,l,tA.TOP_RIGHT):new he(t.left+t.width,t.top),this.bottomRightBorderBox=u>0||h>0?lA(t.left+C,t.top+w,u,h,tA.BOTTOM_RIGHT):new he(t.left+t.width,t.top+t.height),this.bottomLeftBorderBox=g>0||m>0?lA(t.left,t.top+b,g,m,tA.BOTTOM_LEFT):new he(t.left,t.top+t.height),this.topLeftPaddingBox=r>0||s>0?lA(t.left+z,t.top+U,Math.max(0,r-z),Math.max(0,s-U),tA.TOP_LEFT):new he(t.left+z,t.top+U),this.topRightPaddingBox=o>0||l>0?lA(t.left+Math.min(v,t.width-S),t.top+U,v>t.width+S?0:Math.max(0,o-S),Math.max(0,l-U),tA.TOP_RIGHT):new he(t.left+t.width-S,t.top+U),this.bottomRightPaddingBox=u>0||h>0?lA(t.left+Math.min(C,t.width-z),t.top+Math.min(w,t.height-H),Math.max(0,u-S),Math.max(0,h-H),tA.BOTTOM_RIGHT):new he(t.left+t.width-S,t.top+t.height-H),this.bottomLeftPaddingBox=g>0||m>0?lA(t.left+z,t.top+Math.min(b,t.height-H),Math.max(0,g-z),Math.max(0,m-H),tA.BOTTOM_LEFT):new he(t.left+z,t.top+t.height-H),this.topLeftContentBox=r>0||s>0?lA(t.left+z+W,t.top+U+B,Math.max(0,r-(z+W)),Math.max(0,s-(U+B)),tA.TOP_LEFT):new he(t.left+z+W,t.top+U+B),this.topRightContentBox=o>0||l>0?lA(t.left+Math.min(v,t.width+z+W),t.top+U+B,v>t.width+z+W?0:o-z+W,l-(U+B),tA.TOP_RIGHT):new he(t.left+t.width-(S+M),t.top+U+B),this.bottomRightContentBox=u>0||h>0?lA(t.left+Math.min(C,t.width-(z+W)),t.top+Math.min(w,t.height+U+B),Math.max(0,u-(S+M)),h-(H+K),tA.BOTTOM_RIGHT):new he(t.left+t.width-(S+M),t.top+t.height-(H+K)),this.bottomLeftContentBox=g>0||m>0?lA(t.left+z+W,t.top+b,Math.max(0,g-(z+W)),m-(H+K),tA.BOTTOM_LEFT):new he(t.left+z+W,t.top+t.height-(H+K))}return n}(),tA;(function(n){n[n.TOP_LEFT=0]="TOP_LEFT",n[n.TOP_RIGHT=1]="TOP_RIGHT",n[n.BOTTOM_RIGHT=2]="BOTTOM_RIGHT",n[n.BOTTOM_LEFT=3]="BOTTOM_LEFT"})(tA||(tA={}));var lA=function(n,e,A,t,i){var r=4*((Math.sqrt(2)-1)/3),s=A*r,a=t*r,o=n+A,l=e+t;switch(i){case tA.TOP_LEFT:return new ts(new he(n,l),new he(n,l-a),new he(o-s,e),new he(o,e));case tA.TOP_RIGHT:return new ts(new he(n,e),new he(n+s,e),new he(o,l-a),new he(o,l));case tA.BOTTOM_RIGHT:return new ts(new he(o,e),new he(o,e+a),new he(n+s,l),new he(n,l));case tA.BOTTOM_LEFT:default:return new ts(new he(o,l),new he(o-s,l),new he(n,e+a),new he(n,e))}},Gs=function(n){return[n.topLeftBorderBox,n.topRightBorderBox,n.bottomRightBorderBox,n.bottomLeftBorderBox]},U0=function(n){return[n.topLeftContentBox,n.topRightContentBox,n.bottomRightContentBox,n.bottomLeftContentBox]},Vs=function(n){return[n.topLeftPaddingBox,n.topRightPaddingBox,n.bottomRightPaddingBox,n.bottomLeftPaddingBox]},y0=function(){function n(e,A,t){this.offsetX=e,this.offsetY=A,this.matrix=t,this.type=0,this.target=6}return n}(),ns=function(){function n(e,A){this.path=e,this.target=A,this.type=1}return n}(),S0=function(){function n(e){this.opacity=e,this.type=2,this.target=6}return n}(),M0=function(n){return n.type===0},wf=function(n){return n.type===1},F0=function(n){return n.type===2},Rc=function(n,e){return n.length===e.length?n.some(function(A,t){return A===e[t]}):!1},b0=function(n,e,A,t,i){return n.map(function(r,s){switch(s){case 0:return r.add(e,A);case 1:return r.add(e+t,A);case 2:return r.add(e+t,A+i);case 3:return r.add(e,A+i)}return r})},vf=function(){function n(e){this.element=e,this.inlineLevel=[],this.nonInlineLevel=[],this.negativeZIndex=[],this.zeroOrAutoZIndexOrTransformedOrOpacity=[],this.positiveZIndex=[],this.nonPositionedFloats=[],this.nonPositionedInlineLevel=[]}return n}(),Ef=function(){function n(e,A){if(this.container=e,this.parent=A,this.effects=[],this.curves=new x0(this.container),this.container.styles.opacity<1&&this.effects.push(new S0(this.container.styles.opacity)),this.container.styles.transform!==null){var t=this.container.bounds.left+this.container.styles.transformOrigin[0].number,i=this.container.bounds.top+this.container.styles.transformOrigin[1].number,r=this.container.styles.transform;this.effects.push(new y0(t,i,r))}if(this.container.styles.overflowX!==0){var s=Gs(this.curves),a=Vs(this.curves);Rc(s,a)?this.effects.push(new ns(s,6)):(this.effects.push(new ns(s,2)),this.effects.push(new ns(a,4)))}}return n.prototype.getEffects=function(e){for(var A=[2,3].indexOf(this.container.styles.position)===-1,t=this.parent,i=this.effects.slice(0);t;){var r=t.effects.filter(function(o){return!wf(o)});if(A||t.container.styles.position!==0||!t.parent){if(i.unshift.apply(i,r),A=[2,3].indexOf(t.container.styles.position)===-1,t.container.styles.overflowX!==0){var s=Gs(t.curves),a=Vs(t.curves);Rc(s,a)||i.unshift(new ns(a,6))}}else i.unshift.apply(i,r);t=t.parent}return i.filter(function(o){return _A(o.target,e)})},n}(),jo=function(n,e,A,t){n.container.elements.forEach(function(i){var r=_A(i.flags,4),s=_A(i.flags,2),a=new Ef(i,n);_A(i.styles.display,2048)&&t.push(a);var o=_A(i.flags,8)?[]:t;if(r||s){var l=r||i.styles.isPositioned()?A:e,c=new vf(a);if(i.styles.isPositioned()||i.styles.opacity<1||i.styles.isTransformed()){var u=i.styles.zIndex.order;if(u<0){var h=0;l.negativeZIndex.some(function(g,m){return u>g.element.container.styles.zIndex.order?(h=m,!1):h>0}),l.negativeZIndex.splice(h,0,c)}else if(u>0){var p=0;l.positiveZIndex.some(function(g,m){return u>=g.element.container.styles.zIndex.order?(p=m+1,!1):p>0}),l.positiveZIndex.splice(p,0,c)}else l.zeroOrAutoZIndexOrTransformedOrOpacity.push(c)}else i.styles.isFloating()?l.nonPositionedFloats.push(c):l.nonPositionedInlineLevel.push(c);jo(a,c,r?c:A,o)}else i.styles.isInlineLevel()?e.inlineLevel.push(a):e.nonInlineLevel.push(a),jo(a,e,A,o);_A(i.flags,8)&&Cf(i,o)})},Cf=function(n,e){for(var A=n instanceof Xo?n.start:1,t=n instanceof Xo?n.reversed:!1,i=0;i<e.length;i++){var r=e[i];r.container instanceof sf&&typeof r.container.value=="number"&&r.container.value!==0&&(A=r.container.value),r.listValue=Cr(A,r.container.styles.listStyleType,!0),A+=t?-1:1}},T0=function(n){var e=new Ef(n,null),A=new vf(e),t=[];return jo(e,A,A,t),Cf(e.container,t),A},Dc=function(n,e){switch(e){case 0:return lt(n.topLeftBorderBox,n.topLeftPaddingBox,n.topRightBorderBox,n.topRightPaddingBox);case 1:return lt(n.topRightBorderBox,n.topRightPaddingBox,n.bottomRightBorderBox,n.bottomRightPaddingBox);case 2:return lt(n.bottomRightBorderBox,n.bottomRightPaddingBox,n.bottomLeftBorderBox,n.bottomLeftPaddingBox);case 3:default:return lt(n.bottomLeftBorderBox,n.bottomLeftPaddingBox,n.topLeftBorderBox,n.topLeftPaddingBox)}},Q0=function(n,e){switch(e){case 0:return lt(n.topLeftBorderBox,n.topLeftBorderDoubleOuterBox,n.topRightBorderBox,n.topRightBorderDoubleOuterBox);case 1:return lt(n.topRightBorderBox,n.topRightBorderDoubleOuterBox,n.bottomRightBorderBox,n.bottomRightBorderDoubleOuterBox);case 2:return lt(n.bottomRightBorderBox,n.bottomRightBorderDoubleOuterBox,n.bottomLeftBorderBox,n.bottomLeftBorderDoubleOuterBox);case 3:default:return lt(n.bottomLeftBorderBox,n.bottomLeftBorderDoubleOuterBox,n.topLeftBorderBox,n.topLeftBorderDoubleOuterBox)}},I0=function(n,e){switch(e){case 0:return lt(n.topLeftBorderDoubleInnerBox,n.topLeftPaddingBox,n.topRightBorderDoubleInnerBox,n.topRightPaddingBox);case 1:return lt(n.topRightBorderDoubleInnerBox,n.topRightPaddingBox,n.bottomRightBorderDoubleInnerBox,n.bottomRightPaddingBox);case 2:return lt(n.bottomRightBorderDoubleInnerBox,n.bottomRightPaddingBox,n.bottomLeftBorderDoubleInnerBox,n.bottomLeftPaddingBox);case 3:default:return lt(n.bottomLeftBorderDoubleInnerBox,n.bottomLeftPaddingBox,n.topLeftBorderDoubleInnerBox,n.topLeftPaddingBox)}},L0=function(n,e){switch(e){case 0:return is(n.topLeftBorderStroke,n.topRightBorderStroke);case 1:return is(n.topRightBorderStroke,n.bottomRightBorderStroke);case 2:return is(n.bottomRightBorderStroke,n.bottomLeftBorderStroke);case 3:default:return is(n.bottomLeftBorderStroke,n.topLeftBorderStroke)}},is=function(n,e){var A=[];return rt(n)?A.push(n.subdivide(.5,!1)):A.push(n),rt(e)?A.push(e.subdivide(.5,!0)):A.push(e),A},lt=function(n,e,A,t){var i=[];return rt(n)?i.push(n.subdivide(.5,!1)):i.push(n),rt(A)?i.push(A.subdivide(.5,!0)):i.push(A),rt(t)?i.push(t.subdivide(.5,!0).reverse()):i.push(t),rt(e)?i.push(e.subdivide(.5,!1).reverse()):i.push(e),i},xf=function(n){var e=n.bounds,A=n.styles;return e.add(A.borderLeftWidth,A.borderTopWidth,-(A.borderRightWidth+A.borderLeftWidth),-(A.borderTopWidth+A.borderBottomWidth))},ks=function(n){var e=n.styles,A=n.bounds,t=sA(e.paddingLeft,A.width),i=sA(e.paddingRight,A.width),r=sA(e.paddingTop,A.width),s=sA(e.paddingBottom,A.width);return A.add(t+e.borderLeftWidth,r+e.borderTopWidth,-(e.borderRightWidth+e.borderLeftWidth+t+i),-(e.borderTopWidth+e.borderBottomWidth+r+s))},R0=function(n,e){return n===0?e.bounds:n===2?ks(e):xf(e)},D0=function(n,e){return n===0?e.bounds:n===2?ks(e):xf(e)},za=function(n,e,A){var t=R0(vi(n.styles.backgroundOrigin,e),n),i=D0(vi(n.styles.backgroundClip,e),n),r=H0(vi(n.styles.backgroundSize,e),A,t),s=r[0],a=r[1],o=or(vi(n.styles.backgroundPosition,e),t.width-s,t.height-a),l=P0(vi(n.styles.backgroundRepeat,e),o,r,t,i),c=Math.round(t.left+o[0]),u=Math.round(t.top+o[1]);return[l,c,u,s,a]},ei=function(n){return iA(n)&&n.value===yi.AUTO},rs=function(n){return typeof n=="number"},H0=function(n,e,A){var t=e[0],i=e[1],r=e[2],s=n[0],a=n[1];if(!s)return[0,0];if(mA(s)&&a&&mA(a))return[sA(s,A.width),sA(a,A.height)];var o=rs(r);if(iA(s)&&(s.value===yi.CONTAIN||s.value===yi.COVER)){if(rs(r)){var l=A.width/A.height;return l<r!=(s.value===yi.COVER)?[A.width,A.width/r]:[A.height*r,A.height]}return[A.width,A.height]}var c=rs(t),u=rs(i),h=c||u;if(ei(s)&&(!a||ei(a))){if(c&&u)return[t,i];if(!o&&!h)return[A.width,A.height];if(h&&o){var p=c?t:i*r,g=u?i:t/r;return[p,g]}var m=c?t:A.width,d=u?i:A.height;return[m,d]}if(o){var f=0,v=0;return mA(s)?f=sA(s,A.width):mA(a)&&(v=sA(a,A.height)),ei(s)?f=v*r:(!a||ei(a))&&(v=f/r),[f,v]}var w=null,C=null;if(mA(s)?w=sA(s,A.width):a&&mA(a)&&(C=sA(a,A.height)),w!==null&&(!a||ei(a))&&(C=c&&u?w/t*i:A.height),C!==null&&ei(s)&&(w=c&&u?C/i*t:A.width),w!==null&&C!==null)return[w,C];throw new Error("Unable to calculate background-size for element")},vi=function(n,e){var A=n[e];return typeof A>"u"?n[0]:A},P0=function(n,e,A,t,i){var r=e[0],s=e[1],a=A[0],o=A[1];switch(n){case 2:return[new he(Math.round(t.left),Math.round(t.top+s)),new he(Math.round(t.left+t.width),Math.round(t.top+s)),new he(Math.round(t.left+t.width),Math.round(o+t.top+s)),new he(Math.round(t.left),Math.round(o+t.top+s))];case 3:return[new he(Math.round(t.left+r),Math.round(t.top)),new he(Math.round(t.left+r+a),Math.round(t.top)),new he(Math.round(t.left+r+a),Math.round(t.height+t.top)),new he(Math.round(t.left+r),Math.round(t.height+t.top))];case 1:return[new he(Math.round(t.left+r),Math.round(t.top+s)),new he(Math.round(t.left+r+a),Math.round(t.top+s)),new he(Math.round(t.left+r+a),Math.round(t.top+s+o)),new he(Math.round(t.left+r),Math.round(t.top+s+o))];default:return[new he(Math.round(i.left),Math.round(i.top)),new he(Math.round(i.left+i.width),Math.round(i.top)),new he(Math.round(i.left+i.width),Math.round(i.height+i.top)),new he(Math.round(i.left),Math.round(i.height+i.top))]}},O0="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",Hc="Hidden Text",N0=function(){function n(e){this._data={},this._document=e}return n.prototype.parseMetrics=function(e,A){var t=this._document.createElement("div"),i=this._document.createElement("img"),r=this._document.createElement("span"),s=this._document.body;t.style.visibility="hidden",t.style.fontFamily=e,t.style.fontSize=A,t.style.margin="0",t.style.padding="0",t.style.whiteSpace="nowrap",s.appendChild(t),i.src=O0,i.width=1,i.height=1,i.style.margin="0",i.style.padding="0",i.style.verticalAlign="baseline",r.style.fontFamily=e,r.style.fontSize=A,r.style.margin="0",r.style.padding="0",r.appendChild(this._document.createTextNode(Hc)),t.appendChild(r),t.appendChild(i);var a=i.offsetTop-r.offsetTop+2;t.removeChild(r),t.appendChild(this._document.createTextNode(Hc)),t.style.lineHeight="normal",i.style.verticalAlign="super";var o=i.offsetTop-t.offsetTop+2;return s.removeChild(t),{baseline:a,middle:o}},n.prototype.getMetrics=function(e,A){var t=e+" "+A;return typeof this._data[t]>"u"&&(this._data[t]=this.parseMetrics(e,A)),this._data[t]},n}(),Uf=function(){function n(e,A){this.context=e,this.options=A}return n}(),G0=1e4,V0=function(n){wt(e,n);function e(A,t){var i=n.call(this,A,t)||this;return i._activeEffects=[],i.canvas=t.canvas?t.canvas:document.createElement("canvas"),i.ctx=i.canvas.getContext("2d"),t.canvas||(i.canvas.width=Math.floor(t.width*t.scale),i.canvas.height=Math.floor(t.height*t.scale),i.canvas.style.width=t.width+"px",i.canvas.style.height=t.height+"px"),i.fontMetrics=new N0(document),i.ctx.scale(i.options.scale,i.options.scale),i.ctx.translate(-t.x,-t.y),i.ctx.textBaseline="bottom",i._activeEffects=[],i.context.logger.debug("Canvas renderer initialized ("+t.width+"x"+t.height+") with scale "+t.scale),i}return e.prototype.applyEffects=function(A){for(var t=this;this._activeEffects.length;)this.popEffect();A.forEach(function(i){return t.applyEffect(i)})},e.prototype.applyEffect=function(A){this.ctx.save(),F0(A)&&(this.ctx.globalAlpha=A.opacity),M0(A)&&(this.ctx.translate(A.offsetX,A.offsetY),this.ctx.transform(A.matrix[0],A.matrix[1],A.matrix[2],A.matrix[3],A.matrix[4],A.matrix[5]),this.ctx.translate(-A.offsetX,-A.offsetY)),wf(A)&&(this.path(A.path),this.ctx.clip()),this._activeEffects.push(A)},e.prototype.popEffect=function(){this._activeEffects.pop(),this.ctx.restore()},e.prototype.renderStack=function(A){return kA(this,void 0,void 0,function(){var t;return DA(this,function(i){switch(i.label){case 0:return t=A.element.container.styles,t.isVisible()?[4,this.renderStackContent(A)]:[3,2];case 1:i.sent(),i.label=2;case 2:return[2]}})})},e.prototype.renderNode=function(A){return kA(this,void 0,void 0,function(){return DA(this,function(t){switch(t.label){case 0:if(_A(A.container.flags,16))debugger;return A.container.styles.isVisible()?[4,this.renderNodeBackgroundAndBorders(A)]:[3,3];case 1:return t.sent(),[4,this.renderNodeContent(A)];case 2:t.sent(),t.label=3;case 3:return[2]}})})},e.prototype.renderTextWithLetterSpacing=function(A,t,i){var r=this;if(t===0)this.ctx.fillText(A.text,A.bounds.left,A.bounds.top+i);else{var s=ml(A.text);s.reduce(function(a,o){return r.ctx.fillText(o,a,A.bounds.top+i),a+r.ctx.measureText(o).width},A.bounds.left)}},e.prototype.createFontStyle=function(A){var t=A.fontVariant.filter(function(s){return s==="normal"||s==="small-caps"}).join(""),i=X0(A.fontFamily).join(", "),r=Tr(A.fontSize)?""+A.fontSize.number+A.fontSize.unit:A.fontSize.number+"px";return[[A.fontStyle,t,A.fontWeight,r,i].join(" "),i,r]},e.prototype.renderTextNode=function(A,t){return kA(this,void 0,void 0,function(){var i,r,s,a,o,l,c,u,h=this;return DA(this,function(p){return i=this.createFontStyle(t),r=i[0],s=i[1],a=i[2],this.ctx.font=r,this.ctx.direction=t.direction===1?"rtl":"ltr",this.ctx.textAlign="left",this.ctx.textBaseline="alphabetic",o=this.fontMetrics.getMetrics(s,a),l=o.baseline,c=o.middle,u=t.paintOrder,A.textBounds.forEach(function(g){u.forEach(function(m){switch(m){case 0:h.ctx.fillStyle=xA(t.color),h.renderTextWithLetterSpacing(g,t.letterSpacing,l);var d=t.textShadow;d.length&&g.text.trim().length&&(d.slice(0).reverse().forEach(function(f){h.ctx.shadowColor=xA(f.color),h.ctx.shadowOffsetX=f.offsetX.number*h.options.scale,h.ctx.shadowOffsetY=f.offsetY.number*h.options.scale,h.ctx.shadowBlur=f.blur.number,h.renderTextWithLetterSpacing(g,t.letterSpacing,l)}),h.ctx.shadowColor="",h.ctx.shadowOffsetX=0,h.ctx.shadowOffsetY=0,h.ctx.shadowBlur=0),t.textDecorationLine.length&&(h.ctx.fillStyle=xA(t.textDecorationColor||t.color),t.textDecorationLine.forEach(function(f){switch(f){case 1:h.ctx.fillRect(g.bounds.left,Math.round(g.bounds.top+l),g.bounds.width,1);break;case 2:h.ctx.fillRect(g.bounds.left,Math.round(g.bounds.top),g.bounds.width,1);break;case 3:h.ctx.fillRect(g.bounds.left,Math.ceil(g.bounds.top+c),g.bounds.width,1);break}}));break;case 1:t.webkitTextStrokeWidth&&g.text.trim().length&&(h.ctx.strokeStyle=xA(t.webkitTextStrokeColor),h.ctx.lineWidth=t.webkitTextStrokeWidth,h.ctx.lineJoin=window.chrome?"miter":"round",h.ctx.strokeText(g.text,g.bounds.left,g.bounds.top+l)),h.ctx.strokeStyle="",h.ctx.lineWidth=0,h.ctx.lineJoin="miter";break}})}),[2]})})},e.prototype.renderReplacedElement=function(A,t,i){if(i&&A.intrinsicWidth>0&&A.intrinsicHeight>0){var r=ks(A),s=Vs(t);this.path(s),this.ctx.save(),this.ctx.clip(),this.ctx.drawImage(i,0,0,A.intrinsicWidth,A.intrinsicHeight,r.left,r.top,r.width,r.height),this.ctx.restore()}},e.prototype.renderNodeContent=function(A){return kA(this,void 0,void 0,function(){var t,i,r,s,a,o,v,v,l,c,u,h,C,p,g,b,m,d,f,v,w,C,b;return DA(this,function(U){switch(U.label){case 0:this.applyEffects(A.getEffects(4)),t=A.container,i=A.curves,r=t.styles,s=0,a=t.textNodes,U.label=1;case 1:return s<a.length?(o=a[s],[4,this.renderTextNode(o,r)]):[3,4];case 2:U.sent(),U.label=3;case 3:return s++,[3,1];case 4:if(!(t instanceof tf))return[3,8];U.label=5;case 5:return U.trys.push([5,7,,8]),[4,this.context.cache.match(t.src)];case 6:return v=U.sent(),this.renderReplacedElement(t,i,v),[3,8];case 7:return U.sent(),this.context.logger.error("Error loading image "+t.src),[3,8];case 8:if(t instanceof nf&&this.renderReplacedElement(t,i,t.canvas),!(t instanceof rf))return[3,12];U.label=9;case 9:return U.trys.push([9,11,,12]),[4,this.context.cache.match(t.svg)];case 10:return v=U.sent(),this.renderReplacedElement(t,i,v),[3,12];case 11:return U.sent(),this.context.logger.error("Error loading svg "+t.svg.substring(0,255)),[3,12];case 12:return t instanceof lf&&t.tree?(l=new e(this.context,{scale:this.options.scale,backgroundColor:t.backgroundColor,x:0,y:0,width:t.width,height:t.height}),[4,l.render(t.tree)]):[3,14];case 13:c=U.sent(),t.width&&t.height&&this.ctx.drawImage(c,0,0,t.width,t.height,t.bounds.left,t.bounds.top,t.bounds.width,t.bounds.height),U.label=14;case 14:if(t instanceof Bl&&(u=Math.min(t.bounds.width,t.bounds.height),t.type===Hs?t.checked&&(this.ctx.save(),this.path([new he(t.bounds.left+u*.39363,t.bounds.top+u*.79),new he(t.bounds.left+u*.16,t.bounds.top+u*.5549),new he(t.bounds.left+u*.27347,t.bounds.top+u*.44071),new he(t.bounds.left+u*.39694,t.bounds.top+u*.5649),new he(t.bounds.left+u*.72983,t.bounds.top+u*.23),new he(t.bounds.left+u*.84,t.bounds.top+u*.34085),new he(t.bounds.left+u*.39363,t.bounds.top+u*.79)]),this.ctx.fillStyle=xA(xc),this.ctx.fill(),this.ctx.restore()):t.type===Ps&&t.checked&&(this.ctx.save(),this.ctx.beginPath(),this.ctx.arc(t.bounds.left+u/2,t.bounds.top+u/2,u/4,0,Math.PI*2,!0),this.ctx.fillStyle=xA(xc),this.ctx.fill(),this.ctx.restore())),k0(t)&&t.value.length){switch(h=this.createFontStyle(r),C=h[0],p=h[1],g=this.fontMetrics.getMetrics(C,p).baseline,this.ctx.font=C,this.ctx.fillStyle=xA(r.color),this.ctx.textBaseline="alphabetic",this.ctx.textAlign=z0(t.styles.textAlign),b=ks(t),m=0,t.styles.textAlign){case 1:m+=b.width/2;break;case 2:m+=b.width;break}d=b.add(m,0,0,-b.height/2+1),this.ctx.save(),this.path([new he(b.left,b.top),new he(b.left+b.width,b.top),new he(b.left+b.width,b.top+b.height),new he(b.left,b.top+b.height)]),this.ctx.clip(),this.renderTextWithLetterSpacing(new pr(t.value,d),r.letterSpacing,g),this.ctx.restore(),this.ctx.textBaseline="alphabetic",this.ctx.textAlign="left"}if(!_A(t.styles.display,2048))return[3,20];if(t.styles.listStyleImage===null)return[3,19];if(f=t.styles.listStyleImage,f.type!==0)return[3,18];v=void 0,w=f.url,U.label=15;case 15:return U.trys.push([15,17,,18]),[4,this.context.cache.match(w)];case 16:return v=U.sent(),this.ctx.drawImage(v,t.bounds.left-(v.width+10),t.bounds.top),[3,18];case 17:return U.sent(),this.context.logger.error("Error loading list-style-image "+w),[3,18];case 18:return[3,20];case 19:A.listValue&&t.styles.listStyleType!==-1&&(C=this.createFontStyle(r)[0],this.ctx.font=C,this.ctx.fillStyle=xA(r.color),this.ctx.textBaseline="middle",this.ctx.textAlign="right",b=new Xt(t.bounds.left,t.bounds.top+sA(t.styles.paddingTop,t.bounds.width),t.bounds.width,ac(r.lineHeight,r.fontSize.number)/2+1),this.renderTextWithLetterSpacing(new pr(A.listValue,b),r.letterSpacing,ac(r.lineHeight,r.fontSize.number)/2+2),this.ctx.textBaseline="bottom",this.ctx.textAlign="left"),U.label=20;case 20:return[2]}})})},e.prototype.renderStackContent=function(A){return kA(this,void 0,void 0,function(){var t,i,f,r,s,f,a,o,f,l,c,f,u,h,f,p,g,f,m,d,f;return DA(this,function(v){switch(v.label){case 0:if(_A(A.element.container.flags,16))debugger;return[4,this.renderNodeBackgroundAndBorders(A.element)];case 1:v.sent(),t=0,i=A.negativeZIndex,v.label=2;case 2:return t<i.length?(f=i[t],[4,this.renderStack(f)]):[3,5];case 3:v.sent(),v.label=4;case 4:return t++,[3,2];case 5:return[4,this.renderNodeContent(A.element)];case 6:v.sent(),r=0,s=A.nonInlineLevel,v.label=7;case 7:return r<s.length?(f=s[r],[4,this.renderNode(f)]):[3,10];case 8:v.sent(),v.label=9;case 9:return r++,[3,7];case 10:a=0,o=A.nonPositionedFloats,v.label=11;case 11:return a<o.length?(f=o[a],[4,this.renderStack(f)]):[3,14];case 12:v.sent(),v.label=13;case 13:return a++,[3,11];case 14:l=0,c=A.nonPositionedInlineLevel,v.label=15;case 15:return l<c.length?(f=c[l],[4,this.renderStack(f)]):[3,18];case 16:v.sent(),v.label=17;case 17:return l++,[3,15];case 18:u=0,h=A.inlineLevel,v.label=19;case 19:return u<h.length?(f=h[u],[4,this.renderNode(f)]):[3,22];case 20:v.sent(),v.label=21;case 21:return u++,[3,19];case 22:p=0,g=A.zeroOrAutoZIndexOrTransformedOrOpacity,v.label=23;case 23:return p<g.length?(f=g[p],[4,this.renderStack(f)]):[3,26];case 24:v.sent(),v.label=25;case 25:return p++,[3,23];case 26:m=0,d=A.positiveZIndex,v.label=27;case 27:return m<d.length?(f=d[m],[4,this.renderStack(f)]):[3,30];case 28:v.sent(),v.label=29;case 29:return m++,[3,27];case 30:return[2]}})})},e.prototype.mask=function(A){this.ctx.beginPath(),this.ctx.moveTo(0,0),this.ctx.lineTo(this.canvas.width,0),this.ctx.lineTo(this.canvas.width,this.canvas.height),this.ctx.lineTo(0,this.canvas.height),this.ctx.lineTo(0,0),this.formatPath(A.slice(0).reverse()),this.ctx.closePath()},e.prototype.path=function(A){this.ctx.beginPath(),this.formatPath(A),this.ctx.closePath()},e.prototype.formatPath=function(A){var t=this;A.forEach(function(i,r){var s=rt(i)?i.start:i;r===0?t.ctx.moveTo(s.x,s.y):t.ctx.lineTo(s.x,s.y),rt(i)&&t.ctx.bezierCurveTo(i.startControl.x,i.startControl.y,i.endControl.x,i.endControl.y,i.end.x,i.end.y)})},e.prototype.renderRepeat=function(A,t,i,r){this.path(A),this.ctx.fillStyle=t,this.ctx.translate(i,r),this.ctx.fill(),this.ctx.translate(-i,-r)},e.prototype.resizeImage=function(A,t,i){var r;if(A.width===t&&A.height===i)return A;var s=(r=this.canvas.ownerDocument)!==null&&r!==void 0?r:document,a=s.createElement("canvas");a.width=Math.max(1,t),a.height=Math.max(1,i);var o=a.getContext("2d");return o.drawImage(A,0,0,A.width,A.height,0,0,t,i),a},e.prototype.renderBackgroundImage=function(A){return kA(this,void 0,void 0,function(){var t,i,r,s,a,o;return DA(this,function(l){switch(l.label){case 0:t=A.styles.backgroundImage.length-1,i=function(c){var u,h,p,B,R,Y,W,T,H,g,B,R,Y,W,T,m,d,f,v,w,C,b,U,S,H,z,B,M,K,W,T,G,R,Y,X,J,q,Ae,ae,ve,N,Z;return DA(this,function(fe){switch(fe.label){case 0:if(c.type!==0)return[3,5];u=void 0,h=c.url,fe.label=1;case 1:return fe.trys.push([1,3,,4]),[4,r.context.cache.match(h)];case 2:return u=fe.sent(),[3,4];case 3:return fe.sent(),r.context.logger.error("Error loading background-image "+h),[3,4];case 4:return u&&(p=za(A,t,[u.width,u.height,u.width/u.height]),B=p[0],R=p[1],Y=p[2],W=p[3],T=p[4],H=r.ctx.createPattern(r.resizeImage(u,W,T),"repeat"),r.renderRepeat(B,H,R,Y)),[3,6];case 5:Mg(c)?(g=za(A,t,[null,null,null]),B=g[0],R=g[1],Y=g[2],W=g[3],T=g[4],m=Cg(c.angle,W,T),d=m[0],f=m[1],v=m[2],w=m[3],C=m[4],b=document.createElement("canvas"),b.width=W,b.height=T,U=b.getContext("2d"),S=U.createLinearGradient(f,w,v,C),rc(c.stops,d).forEach(function(Ee){return S.addColorStop(Ee.stop,xA(Ee.color))}),U.fillStyle=S,U.fillRect(0,0,W,T),W>0&&T>0&&(H=r.ctx.createPattern(b,"repeat"),r.renderRepeat(B,H,R,Y))):Fg(c)&&(z=za(A,t,[null,null,null]),B=z[0],M=z[1],K=z[2],W=z[3],T=z[4],G=c.position.length===0?[dl]:c.position,R=sA(G[0],W),Y=sA(G[G.length-1],T),X=xg(c,R,Y,W,T),J=X[0],q=X[1],J>0&&q>0&&(Ae=r.ctx.createRadialGradient(M+R,K+Y,0,M+R,K+Y,J),rc(c.stops,J*2).forEach(function(Ee){return Ae.addColorStop(Ee.stop,xA(Ee.color))}),r.path(B),r.ctx.fillStyle=Ae,J!==q?(ae=A.bounds.left+.5*A.bounds.width,ve=A.bounds.top+.5*A.bounds.height,N=q/J,Z=1/N,r.ctx.save(),r.ctx.translate(ae,ve),r.ctx.transform(1,0,0,N,0,0),r.ctx.translate(-ae,-ve),r.ctx.fillRect(M,Z*(K-ve)+ve,W,T*Z),r.ctx.restore()):r.ctx.fill())),fe.label=6;case 6:return t--,[2]}})},r=this,s=0,a=A.styles.backgroundImage.slice(0).reverse(),l.label=1;case 1:return s<a.length?(o=a[s],[5,i(o)]):[3,4];case 2:l.sent(),l.label=3;case 3:return s++,[3,1];case 4:return[2]}})})},e.prototype.renderSolidBorder=function(A,t,i){return kA(this,void 0,void 0,function(){return DA(this,function(r){return this.path(Dc(i,t)),this.ctx.fillStyle=xA(A),this.ctx.fill(),[2]})})},e.prototype.renderDoubleBorder=function(A,t,i,r){return kA(this,void 0,void 0,function(){var s,a;return DA(this,function(o){switch(o.label){case 0:return t<3?[4,this.renderSolidBorder(A,i,r)]:[3,2];case 1:return o.sent(),[2];case 2:return s=Q0(r,i),this.path(s),this.ctx.fillStyle=xA(A),this.ctx.fill(),a=I0(r,i),this.path(a),this.ctx.fill(),[2]}})})},e.prototype.renderNodeBackgroundAndBorders=function(A){return kA(this,void 0,void 0,function(){var t,i,r,s,a,o,l,c,u=this;return DA(this,function(h){switch(h.label){case 0:return this.applyEffects(A.getEffects(2)),t=A.container.styles,i=!dn(t.backgroundColor)||t.backgroundImage.length,r=[{style:t.borderTopStyle,color:t.borderTopColor,width:t.borderTopWidth},{style:t.borderRightStyle,color:t.borderRightColor,width:t.borderRightWidth},{style:t.borderBottomStyle,color:t.borderBottomColor,width:t.borderBottomWidth},{style:t.borderLeftStyle,color:t.borderLeftColor,width:t.borderLeftWidth}],s=K0(vi(t.backgroundClip,0),A.curves),i||t.boxShadow.length?(this.ctx.save(),this.path(s),this.ctx.clip(),dn(t.backgroundColor)||(this.ctx.fillStyle=xA(t.backgroundColor),this.ctx.fill()),[4,this.renderBackgroundImage(A.container)]):[3,2];case 1:h.sent(),this.ctx.restore(),t.boxShadow.slice(0).reverse().forEach(function(p){u.ctx.save();var g=Gs(A.curves),m=p.inset?0:G0,d=b0(g,-m+(p.inset?1:-1)*p.spread.number,(p.inset?1:-1)*p.spread.number,p.spread.number*(p.inset?-2:2),p.spread.number*(p.inset?-2:2));p.inset?(u.path(g),u.ctx.clip(),u.mask(d)):(u.mask(g),u.ctx.clip(),u.path(d)),u.ctx.shadowOffsetX=p.offsetX.number+m,u.ctx.shadowOffsetY=p.offsetY.number,u.ctx.shadowColor=xA(p.color),u.ctx.shadowBlur=p.blur.number,u.ctx.fillStyle=p.inset?xA(p.color):"rgba(0,0,0,1)",u.ctx.fill(),u.ctx.restore()}),h.label=2;case 2:a=0,o=0,l=r,h.label=3;case 3:return o<l.length?(c=l[o],c.style!==0&&!dn(c.color)&&c.width>0?c.style!==2?[3,5]:[4,this.renderDashedDottedBorder(c.color,c.width,a,A.curves,2)]:[3,11]):[3,13];case 4:return h.sent(),[3,11];case 5:return c.style!==3?[3,7]:[4,this.renderDashedDottedBorder(c.color,c.width,a,A.curves,3)];case 6:return h.sent(),[3,11];case 7:return c.style!==4?[3,9]:[4,this.renderDoubleBorder(c.color,c.width,a,A.curves)];case 8:return h.sent(),[3,11];case 9:return[4,this.renderSolidBorder(c.color,a,A.curves)];case 10:h.sent(),h.label=11;case 11:a++,h.label=12;case 12:return o++,[3,3];case 13:return[2]}})})},e.prototype.renderDashedDottedBorder=function(A,t,i,r,s){return kA(this,void 0,void 0,function(){var a,o,l,c,u,h,p,g,m,d,f,v,w,C,b,U,b,U;return DA(this,function(S){return this.ctx.save(),a=L0(r,i),o=Dc(r,i),s===2&&(this.path(o),this.ctx.clip()),rt(o[0])?(l=o[0].start.x,c=o[0].start.y):(l=o[0].x,c=o[0].y),rt(o[1])?(u=o[1].end.x,h=o[1].end.y):(u=o[1].x,h=o[1].y),i===0||i===2?p=Math.abs(l-u):p=Math.abs(c-h),this.ctx.beginPath(),s===3?this.formatPath(a):this.formatPath(o.slice(0,2)),g=t<3?t*3:t*2,m=t<3?t*2:t,s===3&&(g=t,m=t),d=!0,p<=g*2?d=!1:p<=g*2+m?(f=p/(2*g+m),g*=f,m*=f):(v=Math.floor((p+m)/(g+m)),w=(p-v*g)/(v-1),C=(p-(v+1)*g)/v,m=C<=0||Math.abs(m-w)<Math.abs(m-C)?w:C),d&&(s===3?this.ctx.setLineDash([0,g+m]):this.ctx.setLineDash([g,m])),s===3?(this.ctx.lineCap="round",this.ctx.lineWidth=t):this.ctx.lineWidth=t*2+1.1,this.ctx.strokeStyle=xA(A),this.ctx.stroke(),this.ctx.setLineDash([]),s===2&&(rt(o[0])&&(b=o[3],U=o[0],this.ctx.beginPath(),this.formatPath([new he(b.end.x,b.end.y),new he(U.start.x,U.start.y)]),this.ctx.stroke()),rt(o[1])&&(b=o[1],U=o[2],this.ctx.beginPath(),this.formatPath([new he(b.end.x,b.end.y),new he(U.start.x,U.start.y)]),this.ctx.stroke())),this.ctx.restore(),[2]})})},e.prototype.render=function(A){return kA(this,void 0,void 0,function(){var t;return DA(this,function(i){switch(i.label){case 0:return this.options.backgroundColor&&(this.ctx.fillStyle=xA(this.options.backgroundColor),this.ctx.fillRect(this.options.x,this.options.y,this.options.width,this.options.height)),t=T0(A),[4,this.renderStack(t)];case 1:return i.sent(),this.applyEffects([]),[2,this.canvas]}})})},e}(Uf),k0=function(n){return n instanceof of||n instanceof af?!0:n instanceof Bl&&n.type!==Ps&&n.type!==Hs},K0=function(n,e){switch(n){case 0:return Gs(e);case 2:return U0(e);case 1:default:return Vs(e)}},z0=function(n){switch(n){case 1:return"center";case 2:return"right";case 0:default:return"left"}},W0=["-apple-system","system-ui"],X0=function(n){return/iPhone OS 15_(0|1)/.test(window.navigator.userAgent)?n.filter(function(e){return W0.indexOf(e)===-1}):n},Y0=function(n){wt(e,n);function e(A,t){var i=n.call(this,A,t)||this;return i.canvas=t.canvas?t.canvas:document.createElement("canvas"),i.ctx=i.canvas.getContext("2d"),i.options=t,i.canvas.width=Math.floor(t.width*t.scale),i.canvas.height=Math.floor(t.height*t.scale),i.canvas.style.width=t.width+"px",i.canvas.style.height=t.height+"px",i.ctx.scale(i.options.scale,i.options.scale),i.ctx.translate(-t.x,-t.y),i.context.logger.debug("EXPERIMENTAL ForeignObject renderer initialized ("+t.width+"x"+t.height+" at "+t.x+","+t.y+") with scale "+t.scale),i}return e.prototype.render=function(A){return kA(this,void 0,void 0,function(){var t,i;return DA(this,function(r){switch(r.label){case 0:return t=Wo(this.options.width*this.options.scale,this.options.height*this.options.scale,this.options.scale,this.options.scale,A),[4,J0(t)];case 1:return i=r.sent(),this.options.backgroundColor&&(this.ctx.fillStyle=xA(this.options.backgroundColor),this.ctx.fillRect(0,0,this.options.width*this.options.scale,this.options.height*this.options.scale)),this.ctx.drawImage(i,-this.options.x*this.options.scale,-this.options.y*this.options.scale),[2,this.canvas]}})})},e}(Uf),J0=function(n){return new Promise(function(e,A){var t=new Image;t.onload=function(){e(t)},t.onerror=A,t.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(new XMLSerializer().serializeToString(n))})},q0=function(){function n(e){var A=e.id,t=e.enabled;this.id=A,this.enabled=t,this.start=Date.now()}return n.prototype.debug=function(){for(var e=[],A=0;A<arguments.length;A++)e[A]=arguments[A];this.enabled&&(typeof window<"u"&&window.console&&typeof console.debug=="function"?console.debug.apply(console,Hr([this.id,this.getTime()+"ms"],e)):this.info.apply(this,e))},n.prototype.getTime=function(){return Date.now()-this.start},n.prototype.info=function(){for(var e=[],A=0;A<arguments.length;A++)e[A]=arguments[A];this.enabled&&typeof window<"u"&&window.console&&typeof console.info=="function"&&console.info.apply(console,Hr([this.id,this.getTime()+"ms"],e))},n.prototype.warn=function(){for(var e=[],A=0;A<arguments.length;A++)e[A]=arguments[A];this.enabled&&(typeof window<"u"&&window.console&&typeof console.warn=="function"?console.warn.apply(console,Hr([this.id,this.getTime()+"ms"],e)):this.info.apply(this,e))},n.prototype.error=function(){for(var e=[],A=0;A<arguments.length;A++)e[A]=arguments[A];this.enabled&&(typeof window<"u"&&window.console&&typeof console.error=="function"?console.error.apply(console,Hr([this.id,this.getTime()+"ms"],e)):this.info.apply(this,e))},n.instances={},n}(),Z0=function(){function n(e,A){var t;this.windowBounds=A,this.instanceName="#"+n.instanceCount++,this.logger=new q0({id:this.instanceName,enabled:e.logging}),this.cache=(t=e.cache)!==null&&t!==void 0?t:new m0(this,e)}return n.instanceCount=1,n}(),yf=function(n,e){return e===void 0&&(e={}),j0(n,e)};typeof window<"u"&&_f.setContext(window);var j0=function(n,e){return kA(void 0,void 0,void 0,function(){var A,t,i,r,s,a,o,l,c,u,h,p,g,m,d,f,v,w,C,b,S,U,S,H,z,B,M,K,W,T,G,R,Y,X,J,q,Ae,ae,ve,N;return DA(this,function(Z){switch(Z.label){case 0:if(!n||typeof n!="object")return[2,Promise.reject("Invalid element provided as first argument")];if(A=n.ownerDocument,!A)throw new Error("Element is not attached to a Document");if(t=A.defaultView,!t)throw new Error("Document is not attached to a Window");return i={allowTaint:(H=e.allowTaint)!==null&&H!==void 0?H:!1,imageTimeout:(z=e.imageTimeout)!==null&&z!==void 0?z:15e3,proxy:e.proxy,useCORS:(B=e.useCORS)!==null&&B!==void 0?B:!1},r=To({logging:(M=e.logging)!==null&&M!==void 0?M:!0,cache:e.cache},i),s={windowWidth:(K=e.windowWidth)!==null&&K!==void 0?K:t.innerWidth,windowHeight:(W=e.windowHeight)!==null&&W!==void 0?W:t.innerHeight,scrollX:(T=e.scrollX)!==null&&T!==void 0?T:t.pageXOffset,scrollY:(G=e.scrollY)!==null&&G!==void 0?G:t.pageYOffset},a=new Xt(s.scrollX,s.scrollY,s.windowWidth,s.windowHeight),o=new Z0(r,a),l=(R=e.foreignObjectRendering)!==null&&R!==void 0?R:!1,c={allowTaint:(Y=e.allowTaint)!==null&&Y!==void 0?Y:!1,onclone:e.onclone,ignoreElements:e.ignoreElements,inlineImages:l,copyStyles:l},o.logger.debug("Starting document clone with size "+a.width+"x"+a.height+" scrolled to "+-a.left+","+-a.top),u=new Ic(o,n,c),h=u.clonedReferenceElement,h?[4,u.toIFrame(A,a)]:[2,Promise.reject("Unable to find element in cloned iframe")];case 1:return p=Z.sent(),g=_l(h)||e0(h)?bd(h.ownerDocument):ta(o,h),m=g.width,d=g.height,f=g.left,v=g.top,w=$0(o,h,e.backgroundColor),C={canvas:e.canvas,backgroundColor:w,scale:(J=(X=e.scale)!==null&&X!==void 0?X:t.devicePixelRatio)!==null&&J!==void 0?J:1,x:((q=e.x)!==null&&q!==void 0?q:0)+f,y:((Ae=e.y)!==null&&Ae!==void 0?Ae:0)+v,width:(ae=e.width)!==null&&ae!==void 0?ae:Math.ceil(m),height:(ve=e.height)!==null&&ve!==void 0?ve:Math.ceil(d)},l?(o.logger.debug("Document cloned, using foreign object rendering"),S=new Y0(o,C),[4,S.render(h)]):[3,3];case 2:return b=Z.sent(),[3,5];case 3:return o.logger.debug("Document cloned, element located at "+f+","+v+" with size "+m+"x"+d+" using computed rendering"),o.logger.debug("Starting DOM parsing"),U=uf(o,h),w===U.styles.backgroundColor&&(U.styles.backgroundColor=Wt.TRANSPARENT),o.logger.debug("Starting renderer for element at "+C.x+","+C.y+" with size "+C.width+"x"+C.height),S=new V0(o,C),[4,S.render(U)];case 4:b=Z.sent(),Z.label=5;case 5:return(!((N=e.removeContainer)!==null&&N!==void 0)||N)&&(Ic.destroy(p)||o.logger.error("Cannot detach cloned iframe as it is not in the DOM anymore")),o.logger.debug("Finished rendering"),[2,b]}})})},$0=function(n,e,A){var t=e.ownerDocument,i=t.documentElement?fr(n,getComputedStyle(t.documentElement).backgroundColor):Wt.TRANSPARENT,r=t.body?fr(n,getComputedStyle(t.body).backgroundColor):Wt.TRANSPARENT,s=typeof A=="string"?fr(n,A):A===null?Wt.TRANSPARENT:4294967295;return e===t.documentElement?dn(i)?dn(r)?s:r:i:s};const e_=async()=>await Fd(()=>import("./imprint-gen-BZuRNGWs.js"),[]),A_='<hr><p style="opacity: 1.0;">Dieses Impressum wurde erstellt durch <a href="https://www.impressum-generator.de" rel="nofollow">impressum-generator.de</a>.</p>',t_=`<hr><div class="center" width=100%>
<button id="hide-imprint" onclick="document.body.dispatchEvent(new Event('${oe.HIDE_IMPRINT.toString()}', { bubbles: true }))">Close</button></div>`;class n_{constructor(){window.addEventListener("resize",()=>this.redraw()),new vh(document.body,()=>this.redraw()),document.body.addEventListener(oe.SHOW_IMPRINT.toString(),e=>this.show()),document.body.addEventListener(oe.HIDE_IMPRINT.toString(),e=>this.hide()),document.body.addEventListener("keydown",e=>{(e.key==="Esc"||e.key==="Escape")&&this.hide()})}redraw(){this.div!==void 0&&(this.hide(),this.show())}async isAvailable(){const e=await e_();return this.decryptedAES=e.decryptedAES,this.decryptedAES()!==void 0}show(){if(this.div===void 0){this.div=document.createElement("div");const e=this.div;e.classList.add("imprint"),e.innerHTML=this.decryptedAES(),document.body.appendChild(e);const A=window.getComputedStyle(document.body),t=e.scrollWidth,i=e.scrollHeight,r=A.getPropertyValue("background-color");yf(e,{backgroundColor:r,windowWidth:t,windowHeight:i}).then(s=>{s.classList.add("padding"),e.innerHTML="",e.appendChild(s);const a=document.createElement("p");a.classList.add("padding"),a.innerHTML=A_+t_,e.appendChild(a)})}}hide(){this.div!==void 0&&(document.body.removeChild(this.div),this.div=void 0)}}const Pc="toggle",i_="div",Wa="clicked",r_="-div",Xa="-icon",Oc="show";var bi,Ti,yr;class Sf{constructor(e){We(this,bi);We(this,Ti,[]);We(this,yr);Ie(this,yr,e.event),Ie(this,Ti,e.icons);const A=document.createElement(i_);A.classList.add(`${Pc}${r_}`),A.classList.add(e.classToken);for(const i of e.icons){const r=this.createSVGElement(i,e.classToken);A.innerHTML+=r}(e.container||document.body).appendChild(A),A.addEventListener("click",()=>A.classList.add(Wa)),A.addEventListener("animationend",()=>{if(A.classList.contains(Wa)){A.classList.remove(Wa);const i=new Event(e.event,{bubbles:!0});A.dispatchEvent(i)}}),Ie(this,bi,A)}show(e){var A;(A=this.icon(e))==null||A.classList.add(Oc)}toggle(){var e;for(let A=0;A<k(this,Ti).length;A++)(e=this.icon(A))==null||e.classList.toggle(Oc)}icon(e){return k(this,bi).querySelector(`#${k(this,Ti)[e].id}${Xa}`)}createSVGElement(e,A){const t=document.createElement("template");t.innerHTML=e.svg;const i=t.content.firstElementChild;return i.id=`${e.id}${Xa}`,i.classList.add(`${Pc}${Xa}`),i.classList.add(A),i.outerHTML}addOnClickListener(e){k(this,bi).addEventListener(k(this,yr),e)}}bi=new WeakMap,Ti=new WeakMap,yr=new WeakMap;const s_=`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" id="settings-icon" class="toggle-icon" viewBox="0 0 24 24" width="512" height="512">
    <path d="M12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z"/>
    <path d="M21.294,13.9l-.444-.256a9.1,9.1,0,0,0,0-3.29l.444-.256a3,3,0,1,0-3-5.2l-.445.257A8.977,8.977,0,0,0,15,3.513V3A3,3,0,0,0,9,3v.513A8.977,8.977,0,0,0,6.152,5.159L5.705,4.9a3,3,0,0,0-3,5.2l.444.256a9.1,9.1,0,0,0,0,3.29l-.444.256a3,3,0,1,0,3,5.2l.445-.257A8.977,8.977,0,0,0,9,20.487V21a3,3,0,0,0,6,0v-.513a8.977,8.977,0,0,0,2.848-1.646l.447.258a3,3,0,0,0,3-5.2Zm-2.548-3.776a7.048,7.048,0,0,1,0,3.75,1,1,0,0,0,.464,1.133l1.084.626a1,1,0,0,1-1,1.733l-1.086-.628a1,1,0,0,0-1.215.165,6.984,6.984,0,0,1-3.243,1.875,1,1,0,0,0-.751.969V21a1,1,0,0,1-2,0V19.748a1,1,0,0,0-.751-.969A6.984,6.984,0,0,1,7.006,16.9a1,1,0,0,0-1.215-.165l-1.084.627a1,1,0,1,1-1-1.732l1.084-.626a1,1,0,0,0,.464-1.133,7.048,7.048,0,0,1,0-3.75A1,1,0,0,0,4.79,8.992L3.706,8.366a1,1,0,0,1,1-1.733l1.086.628A1,1,0,0,0,7.006,7.1a6.984,6.984,0,0,1,3.243-1.875A1,1,0,0,0,11,4.252V3a1,1,0,0,1,2,0V4.252a1,1,0,0,0,.751.969A6.984,6.984,0,0,1,16.994,7.1a1,1,0,0,0,1.215.165l1.084-.627a1,1,0,1,1,1,1.732l-1.084.626A1,1,0,0,0,18.746,10.125Z"/>
</svg>
`,a_={id:"open",svg:s_},o_=`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" id="settings-close-icon" class="toggle-icon" viewBox="0 0 24 24" width="512" height="512">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
</svg>`,l_={id:"close",svg:o_};var an,Ln,on;class c_{constructor(e){We(this,an);We(this,Ln);We(this,on);Ie(this,an,!0),Ie(this,Ln,new Sf({icons:[a_,l_],classToken:"settings",event:oe.SETTINGS_CHANGED})),Ie(this,on,e),k(this,on).hide(),k(this,Ln).show(k(this,an)?0:1),k(this,Ln).addOnClickListener(()=>this.guiShowHide())}guiShowHide(){k(this,an)?(this.toggle(),k(this,on).show(),k(this,on).open()):k(this,on).$title.click()}toggle(){Ie(this,an,!k(this,an)),k(this,Ln).toggle()}}an=new WeakMap,Ln=new WeakMap,on=new WeakMap;const $o=.001,u_=$o*$o,h_=32,Ks=["Stolen Necklace","Shader Lamp","Space Colors","Sinusoid"],re={showcase:Ks[Mt.STOLEN_NECKLACE],int_mode:Mt.STOLEN_NECKLACE,necklace:{number_of_jewels:24,configuration:13579652,string:"",show_solution_band:!0,show_solutions:!0,epsilon:.01,discrete:!0},sphere:{radius:15,segments:128,offset_octant:0,use_bad_on_sphere_check:!1,show_borsuk_ulam_proof_shape:!1},animation:{rotation_x:0,rotation_y:0,rotation_z:0,reset_speed:f_,trigger_reset:!1,run:!1},view:{stats_monitor_visible:!1,necklace_visible:!0,gauge_visible:!0,show_single_thiefs_region:!0,axes_visible:!0,mesh_visible:!1,faces_visible:!0},color:{scale_red:1,scale_green:1,scale_blue:1,alpha:1},capture:{},imprint:()=>oe.dispatchEvent(oe.SHOW_IMPRINT),radio:Ks[Mt.STOLEN_NECKLACE],text:void 0};var Sr,Rn,Qi,LA,cl,ul;const $s=class $s{constructor(){We(this,Sr);We(this,Rn);We(this,Qi);We(this,LA);We(this,cl);We(this,ul);Ie(this,LA,new hl),k(this,LA).domElement.id="gui",this.createSettingsIcon(),this.createShowHideListener(),this.createShowcaseFolder(),this.createNecklaceFolder(),this.createViewFolder(),this.createCaptureFolder()}static addRadioButtonsFolder(e,A,t,i,r=(s,a,o)=>{}){const s=e.addFolder(A);return $s.addRadioButtons(s,t,i,r),s}static addRadioButtons(e,A,t,i=(r,s,a)=>{}){const r=A;A={},t.forEach((s,a)=>{const o=`option_${a}`;A[o]=r===s}),t.forEach((s,a)=>{const o=`option_${a}`;e.add(A,o).name(s).listen().onChange(()=>{for(let l in A)A[l]=o===l;i(A,o,a)})})}createSettingsIcon(){const e=new c_(k(this,LA));new vh(k(this,LA).domElement,(A,t)=>{const i=A.target;t===0&&!(i!=null&&i.classList.contains("transition"))&&(i!=null&&i.classList.contains("closed"))&&(k(this,LA).hide(),k(this,LA).close(),e.toggle())})}createShowHideListener(){window.addEventListener("keydown",e=>{(e.key==="h"||e.key==="H")&&(k(this,Qi)?k(this,LA).show():k(this,LA).hide(),Ie(this,Qi,!k(this,Qi)))})}createShowcaseFolder(){Ie(this,Rn,$s.addRadioButtonsFolder(k(this,LA),`Showcase: ${re.radio}`,re.radio,Ks,(e,A,t)=>{re.int_mode=t,oe.dispatchEvent(oe.CREATE_SPHERE),k(this,Rn).title(`Showcase: ${Ks[t]}`),k(this,Rn).close()})),k(this,Rn).close()}createNecklaceFolder(){const e=k(this,LA).addFolder("Necklace");e.add(re.necklace,"number_of_jewels",0,h_,1).name("Jewels").onChange(()=>{const t=2**re.necklace.number_of_jewels-1;re.necklace.configuration=Math.min(t,re.necklace.configuration),A.min(0).max(t).setValue(re.necklace.configuration),oe.dispatchEvent(oe.UPDATE_SPHERE_MATERIAL)});const A=e.add(re.necklace,"configuration",0,2**re.necklace.number_of_jewels-1,1).name("Configuration").onChange(()=>oe.dispatchEvent(oe.SET_NECKLACE_CONFIGURATION_BY_NUMBER));e.add(re.necklace,"string").name("String").onChange(()=>oe.dispatchEvent(oe.SET_NECKLACE_CONFIGURATION_BY_STRING)),e.add(re.necklace,"discrete").name("Discrete").onChange(()=>oe.dispatchEvent(oe.UPDATE_SPHERE_MATERIAL)),e.add(re.necklace,"show_solution_band").name("Solution Band").onChange(()=>oe.dispatchEvent(oe.UPDATE_SPHERE_MATERIAL)),e.add(re.necklace,"show_solutions").name("Solutions").onChange(()=>oe.dispatchEvent(oe.UPDATE_SPHERE_MATERIAL)),e.add(re.necklace,"epsilon",0,.15).name("epsilon").onChange(()=>oe.dispatchEvent(oe.UPDATE_SPHERE_MATERIAL)),e.close()}createViewFolder(){const e=k(this,LA).addFolder("View");e.add(re.view,"show_single_thiefs_region").name("Single Thief's Area").onChange(()=>oe.dispatchEvent(oe.UPDATE_SPHERE_MATERIAL)),e.add(re.view,"axes_visible").name("Axes").onChange(()=>oe.dispatchEvent(oe.UPDATE_VISIBLE)),e.add(re.view,"mesh_visible").name("Mesh").onChange(()=>oe.dispatchEvent(oe.UPDATE_VISIBLE)),e.add(re.view,"faces_visible").name("Faces").onChange(()=>oe.dispatchEvent(oe.UPDATE_VISIBLE)),e.close(),this.createSphereSubFolder(e),this.createControlsSubFolder(e),this.createColorSubFolder(e),this.createAnimationSubFolder(e)}createSphereSubFolder(e){const A=e.addFolder("Sphere");A.add(re.sphere,"radius",1,50,1).name("Radius").onChange(()=>oe.dispatchEvent(oe.CREATE_SPHERE)),A.add(re.sphere,"offset_octant",0,5,.1).name("Octant Offset").onChange(()=>oe.dispatchEvent(oe.CREATE_SPHERE)),A.add(re.sphere,"use_bad_on_sphere_check").name("Bad Check").onChange(()=>oe.dispatchEvent(oe.UPDATE_SPHERE_MATERIAL)),A.add(re.sphere,"show_borsuk_ulam_proof_shape").name("Borsuk-Ulam Proof").onChange(()=>oe.dispatchEvent(oe.UPDATE_SPHERE_MATERIAL)),A.add(re.sphere,"segments",3,511,1).name("Segments").onChange(()=>oe.dispatchEvent(oe.CREATE_SPHERE)),A.close()}createControlsSubFolder(e){const A=e.addFolder("Other Controls");A.add(re.view,"stats_monitor_visible").name("Monitor").onChange(()=>oe.dispatchEvent(oe.UPDATE_VISIBLE)),A.add(re.view,"necklace_visible").name("Necklace").onChange(()=>oe.dispatchEvent(oe.UPDATE_VISIBLE)),A.add(re.view,"gauge_visible").name("Gauge").onChange(()=>oe.dispatchEvent(oe.UPDATE_VISIBLE)),A.close()}createColorSubFolder(e){const A=e.addFolder("Color");A.add(re.color,"scale_red",0,1).name("Red").onChange(()=>oe.dispatchEvent(oe.UPDATE_SPHERE_MATERIAL)),A.add(re.color,"scale_green",0,1).name("Green").onChange(()=>oe.dispatchEvent(oe.UPDATE_SPHERE_MATERIAL)),A.add(re.color,"scale_blue",0,1).name("Blue").onChange(()=>oe.dispatchEvent(oe.UPDATE_SPHERE_MATERIAL)),A.add(re.color,"alpha",0,1).name("Alpha").onChange(()=>oe.dispatchEvent(oe.CREATE_SPHERE)),A.close()}createAnimationSubFolder(e){const A=e.addFolder("Animation"),t=.5;A.add(re.animation,"run").name("Rotate [Hz]").listen(),A.add(re.animation,"rotation_x",-t,t,.1).name("X").listen(),A.add(re.animation,"rotation_y",-t,t,.1).name("Y").listen(),A.add(re.animation,"rotation_z",-t,t,.1).name("Z").listen(),A.add(re.animation,"reset_speed").name("Reset Rotation"),A.close()}createCaptureFolder(){const e=k(this,LA).addFolder("Screen capture");new n_().isAvailable().then(i=>{i&&k(this,LA).add(re,"imprint").name("Imprint")}),e.close(),Ie(this,Sr,e)}get captureFolder(){return k(this,Sr)}};Sr=new WeakMap,Rn=new WeakMap,Qi=new WeakMap,LA=new WeakMap,cl=new WeakMap,ul=new WeakMap;let zs=$s;function f_(){re.animation.trigger_reset=!0,re.animation.run=!1,re.animation.rotation_x=0,re.animation.rotation_y=0,re.animation.rotation_z=0}const d_=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="512" height="512">
    <path d="M12,9c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3S10.35,9,12,9 M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5 S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1 s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0 c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95 c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41 L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41 s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06 c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"/>
</svg>`,p_={id:"light",svg:d_},g_=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="512" height="512">
    <path d="M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19 c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36 c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"/>
</svg>`,m_={id:"dark",svg:g_},Ya="dark",Ja="light";var Et,Ii;class B_{constructor(e){We(this,Et);We(this,Ii);Ie(this,Ii,new Sf({container:(e==null?void 0:e.container)||document.body,icons:[p_,m_],classToken:"themes",event:oe.CHANGE_THEME.toString()})),this.initTheme(),this.registerOnThemeChange(document.body)}initTheme(){Ie(this,Et,this.preferredTheme()),document.body.classList.add(k(this,Et)?Ya:Ja),k(this,Ii).show(k(this,Et)?0:1),oe.dispatchEvent(oe.THEME_CHANGED)}preferredTheme(){return window.matchMedia("(prefers-color-scheme: dark)").matches}registerOnThemeChange(e){e.addEventListener(oe.CHANGE_THEME.toString(),()=>{this.onThemeChange(e)})}onThemeChange(e){const A=k(this,Et)?Ya:Ja,t=k(this,Et)?Ja:Ya;e.classList.replace(A,t)||e.classList.add(t),Ie(this,Et,!k(this,Et)),k(this,Ii).toggle(),oe.dispatchEvent(oe.THEME_CHANGED)}}Et=new WeakMap,Ii=new WeakMap;HTMLCanvasElement.prototype.getContext=function(n){return function(e,A){return A=A||{},A.preserveDrawingBuffer=!0,n.call(this,e,A)}}(HTMLCanvasElement.prototype.getContext);const Nc=["All","Sphere","Necklace"];var Li,Mr,Ri,ea,Mf;class __{constructor(e,A={all:void 0,sphere:void 0,necklace:void 0}){We(this,ea);We(this,Li);We(this,Mr);We(this,Ri);Ie(this,Li,()=>document.body),Dl(this,ea,Mf).call(this,e,A),document.addEventListener("keydown",t=>{t.altKey&&t.key==="s"&&(t.stopPropagation(),t.preventDefault(),this.capture())})}capture(e=k(this,Li)){console.log(`screenCapture ${e}`);const A=e();if(!A)throw new Error("No element to capture");setTimeout(()=>{const i=window.getComputedStyle(document.body).getPropertyValue("background-color");yf(A,{backgroundColor:i}).then(r=>{const s=document.createElement("a");s.href=r.toDataURL(),s.download="necklace.png",s.click()})},100)}}Li=new WeakMap,Mr=new WeakMap,Ri=new WeakMap,ea=new WeakSet,Mf=function(e,A){Ie(this,Mr,[A.all,A.sphere,A.necklace]);const t=e.folder,i=e.property;i.selection=Nc[0],Ie(this,Ri,0),Ie(this,Li,()=>k(this,Mr)[k(this,Ri)]),i.on_capture_clicked=()=>this.capture(),zs.addRadioButtons(t,i.selection,Nc,(r,s,a)=>{Ie(this,Ri,a)}),t.add(i,"on_capture_clicked").name("Click or press 'alt s'")};/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const wl="161",Ai={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},ti={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},w_=0,Gc=1,v_=2,Ff=1,E_=2,Vt=3,wn=0,XA=1,gt=2,pn=0,Si=1,Vc=2,kc=3,Kc=4,C_=5,bn=100,x_=101,U_=102,zc=103,Wc=104,y_=200,S_=201,M_=202,F_=203,el=204,Al=205,b_=206,T_=207,Q_=208,I_=209,L_=210,R_=211,D_=212,H_=213,P_=214,O_=0,N_=1,G_=2,Ws=3,V_=4,k_=5,K_=6,z_=7,bf=0,W_=1,X_=2,gn=0,Y_=1,J_=2,q_=3,Z_=4,j_=5,$_=6,Tf=300,Gi=301,Vi=302,tl=303,nl=304,ha=306,il=1e3,mt=1001,rl=1002,KA=1003,Xc=1004,$i=1005,zA=1006,qa=1007,In=1008,mn=1009,ew=1010,Aw=1011,vl=1012,Qf=1013,hn=1014,Kt=1015,xr=1016,If=1017,Lf=1018,kn=1020,tw=1021,Bt=1023,nw=1024,iw=1025,Kn=1026,ki=1027,rw=1028,Rf=1029,sw=1030,Df=1031,Hf=1033,Za=33776,ja=33777,$a=33778,eo=33779,Yc=35840,Jc=35841,qc=35842,Zc=35843,Pf=36196,jc=37492,$c=37496,eu=37808,Au=37809,tu=37810,nu=37811,iu=37812,ru=37813,su=37814,au=37815,ou=37816,lu=37817,cu=37818,uu=37819,hu=37820,fu=37821,Ao=36492,du=36494,pu=36495,aw=36283,gu=36284,mu=36285,Bu=36286,Of=3e3,zn=3001,ow=3200,lw=3201,cw=0,uw=1,at="",MA="srgb",Yt="srgb-linear",El="display-p3",fa="display-p3-linear",Xs="linear",oA="srgb",Ys="rec709",Js="p3",ni=7680,_u=519,hw=512,fw=513,dw=514,Nf=515,pw=516,gw=517,mw=518,Bw=519,wu=35044,vu="300 es",sl=1035,zt=2e3,qs=2001;class Yn{addEventListener(e,A){this._listeners===void 0&&(this._listeners={});const t=this._listeners;t[e]===void 0&&(t[e]=[]),t[e].indexOf(A)===-1&&t[e].push(A)}hasEventListener(e,A){if(this._listeners===void 0)return!1;const t=this._listeners;return t[e]!==void 0&&t[e].indexOf(A)!==-1}removeEventListener(e,A){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const r=i.indexOf(A);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const t=this._listeners[e.type];if(t!==void 0){e.target=this;const i=t.slice(0);for(let r=0,s=i.length;r<s;r++)i[r].call(this,e);e.target=null}}}const QA=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Eu=1234567;const mr=Math.PI/180,Ur=180/Math.PI;function Wi(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,A=Math.random()*4294967295|0,t=Math.random()*4294967295|0;return(QA[n&255]+QA[n>>8&255]+QA[n>>16&255]+QA[n>>24&255]+"-"+QA[e&255]+QA[e>>8&255]+"-"+QA[e>>16&15|64]+QA[e>>24&255]+"-"+QA[A&63|128]+QA[A>>8&255]+"-"+QA[A>>16&255]+QA[A>>24&255]+QA[t&255]+QA[t>>8&255]+QA[t>>16&255]+QA[t>>24&255]).toLowerCase()}function PA(n,e,A){return Math.max(e,Math.min(A,n))}function Cl(n,e){return(n%e+e)%e}function _w(n,e,A,t,i){return t+(n-e)*(i-t)/(A-e)}function ww(n,e,A){return n!==e?(A-n)/(e-n):0}function Br(n,e,A){return(1-A)*n+A*e}function vw(n,e,A,t){return Br(n,e,1-Math.exp(-A*t))}function Ew(n,e=1){return e-Math.abs(Cl(n,e*2)-e)}function Cw(n,e,A){return n<=e?0:n>=A?1:(n=(n-e)/(A-e),n*n*(3-2*n))}function xw(n,e,A){return n<=e?0:n>=A?1:(n=(n-e)/(A-e),n*n*n*(n*(n*6-15)+10))}function Uw(n,e){return n+Math.floor(Math.random()*(e-n+1))}function yw(n,e){return n+Math.random()*(e-n)}function Sw(n){return n*(.5-Math.random())}function Mw(n){n!==void 0&&(Eu=n);let e=Eu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Fw(n){return n*mr}function bw(n){return n*Ur}function al(n){return(n&n-1)===0&&n!==0}function Tw(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Zs(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Qw(n,e,A,t,i){const r=Math.cos,s=Math.sin,a=r(A/2),o=s(A/2),l=r((e+t)/2),c=s((e+t)/2),u=r((e-t)/2),h=s((e-t)/2),p=r((t-e)/2),g=s((t-e)/2);switch(i){case"XYX":n.set(a*c,o*u,o*h,a*l);break;case"YZY":n.set(o*h,a*c,o*u,a*l);break;case"ZXZ":n.set(o*u,o*h,a*c,a*l);break;case"XZX":n.set(a*c,o*g,o*p,a*l);break;case"YXY":n.set(o*p,a*c,o*g,a*l);break;case"ZYZ":n.set(o*g,o*p,a*c,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Ei(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function NA(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Iw={DEG2RAD:mr,RAD2DEG:Ur,generateUUID:Wi,clamp:PA,euclideanModulo:Cl,mapLinear:_w,inverseLerp:ww,lerp:Br,damp:vw,pingpong:Ew,smoothstep:Cw,smootherstep:xw,randInt:Uw,randFloat:yw,randFloatSpread:Sw,seededRandom:Mw,degToRad:Fw,radToDeg:bw,isPowerOfTwo:al,ceilPowerOfTwo:Tw,floorPowerOfTwo:Zs,setQuaternionFromProperEuler:Qw,normalize:NA,denormalize:Ei};class Fe{constructor(e=0,A=0){Fe.prototype.isVector2=!0,this.x=e,this.y=A}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,A){return this.x=e,this.y=A,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,A){switch(e){case 0:this.x=A;break;case 1:this.y=A;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,A){return this.x=e.x+A.x,this.y=e.y+A.y,this}addScaledVector(e,A){return this.x+=e.x*A,this.y+=e.y*A,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,A){return this.x=e.x-A.x,this.y=e.y-A.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const A=this.x,t=this.y,i=e.elements;return this.x=i[0]*A+i[3]*t+i[6],this.y=i[1]*A+i[4]*t+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,A){return this.x=Math.max(e.x,Math.min(A.x,this.x)),this.y=Math.max(e.y,Math.min(A.y,this.y)),this}clampScalar(e,A){return this.x=Math.max(e,Math.min(A,this.x)),this.y=Math.max(e,Math.min(A,this.y)),this}clampLength(e,A){const t=this.length();return this.divideScalar(t||1).multiplyScalar(Math.max(e,Math.min(A,t)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const A=Math.sqrt(this.lengthSq()*e.lengthSq());if(A===0)return Math.PI/2;const t=this.dot(e)/A;return Math.acos(PA(t,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const A=this.x-e.x,t=this.y-e.y;return A*A+t*t}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,A){return this.x+=(e.x-this.x)*A,this.y+=(e.y-this.y)*A,this}lerpVectors(e,A,t){return this.x=e.x+(A.x-e.x)*t,this.y=e.y+(A.y-e.y)*t,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,A=0){return this.x=e[A],this.y=e[A+1],this}toArray(e=[],A=0){return e[A]=this.x,e[A+1]=this.y,e}fromBufferAttribute(e,A){return this.x=e.getX(A),this.y=e.getY(A),this}rotateAround(e,A){const t=Math.cos(A),i=Math.sin(A),r=this.x-e.x,s=this.y-e.y;return this.x=r*t-s*i+e.x,this.y=r*i+s*t+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ye{constructor(e,A,t,i,r,s,a,o,l){Ye.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,A,t,i,r,s,a,o,l)}set(e,A,t,i,r,s,a,o,l){const c=this.elements;return c[0]=e,c[1]=i,c[2]=a,c[3]=A,c[4]=r,c[5]=o,c[6]=t,c[7]=s,c[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const A=this.elements,t=e.elements;return A[0]=t[0],A[1]=t[1],A[2]=t[2],A[3]=t[3],A[4]=t[4],A[5]=t[5],A[6]=t[6],A[7]=t[7],A[8]=t[8],this}extractBasis(e,A,t){return e.setFromMatrix3Column(this,0),A.setFromMatrix3Column(this,1),t.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const A=e.elements;return this.set(A[0],A[4],A[8],A[1],A[5],A[9],A[2],A[6],A[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,A){const t=e.elements,i=A.elements,r=this.elements,s=t[0],a=t[3],o=t[6],l=t[1],c=t[4],u=t[7],h=t[2],p=t[5],g=t[8],m=i[0],d=i[3],f=i[6],v=i[1],w=i[4],C=i[7],b=i[2],U=i[5],S=i[8];return r[0]=s*m+a*v+o*b,r[3]=s*d+a*w+o*U,r[6]=s*f+a*C+o*S,r[1]=l*m+c*v+u*b,r[4]=l*d+c*w+u*U,r[7]=l*f+c*C+u*S,r[2]=h*m+p*v+g*b,r[5]=h*d+p*w+g*U,r[8]=h*f+p*C+g*S,this}multiplyScalar(e){const A=this.elements;return A[0]*=e,A[3]*=e,A[6]*=e,A[1]*=e,A[4]*=e,A[7]*=e,A[2]*=e,A[5]*=e,A[8]*=e,this}determinant(){const e=this.elements,A=e[0],t=e[1],i=e[2],r=e[3],s=e[4],a=e[5],o=e[6],l=e[7],c=e[8];return A*s*c-A*a*l-t*r*c+t*a*o+i*r*l-i*s*o}invert(){const e=this.elements,A=e[0],t=e[1],i=e[2],r=e[3],s=e[4],a=e[5],o=e[6],l=e[7],c=e[8],u=c*s-a*l,h=a*o-c*r,p=l*r-s*o,g=A*u+t*h+i*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const m=1/g;return e[0]=u*m,e[1]=(i*l-c*t)*m,e[2]=(a*t-i*s)*m,e[3]=h*m,e[4]=(c*A-i*o)*m,e[5]=(i*r-a*A)*m,e[6]=p*m,e[7]=(t*o-l*A)*m,e[8]=(s*A-t*r)*m,this}transpose(){let e;const A=this.elements;return e=A[1],A[1]=A[3],A[3]=e,e=A[2],A[2]=A[6],A[6]=e,e=A[5],A[5]=A[7],A[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const A=this.elements;return e[0]=A[0],e[1]=A[3],e[2]=A[6],e[3]=A[1],e[4]=A[4],e[5]=A[7],e[6]=A[2],e[7]=A[5],e[8]=A[8],this}setUvTransform(e,A,t,i,r,s,a){const o=Math.cos(r),l=Math.sin(r);return this.set(t*o,t*l,-t*(o*s+l*a)+s+e,-i*l,i*o,-i*(-l*s+o*a)+a+A,0,0,1),this}scale(e,A){return this.premultiply(to.makeScale(e,A)),this}rotate(e){return this.premultiply(to.makeRotation(-e)),this}translate(e,A){return this.premultiply(to.makeTranslation(e,A)),this}makeTranslation(e,A){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,A,0,0,1),this}makeRotation(e){const A=Math.cos(e),t=Math.sin(e);return this.set(A,-t,0,t,A,0,0,0,1),this}makeScale(e,A){return this.set(e,0,0,0,A,0,0,0,1),this}equals(e){const A=this.elements,t=e.elements;for(let i=0;i<9;i++)if(A[i]!==t[i])return!1;return!0}fromArray(e,A=0){for(let t=0;t<9;t++)this.elements[t]=e[t+A];return this}toArray(e=[],A=0){const t=this.elements;return e[A]=t[0],e[A+1]=t[1],e[A+2]=t[2],e[A+3]=t[3],e[A+4]=t[4],e[A+5]=t[5],e[A+6]=t[6],e[A+7]=t[7],e[A+8]=t[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const to=new Ye;function Gf(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function js(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Lw(){const n=js("canvas");return n.style.display="block",n}const Cu={};function Mi(n){n in Cu||(Cu[n]=!0,console.warn(n))}const xu=new Ye().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Uu=new Ye().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),ss={[Yt]:{transfer:Xs,primaries:Ys,toReference:n=>n,fromReference:n=>n},[MA]:{transfer:oA,primaries:Ys,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[fa]:{transfer:Xs,primaries:Js,toReference:n=>n.applyMatrix3(Uu),fromReference:n=>n.applyMatrix3(xu)},[El]:{transfer:oA,primaries:Js,toReference:n=>n.convertSRGBToLinear().applyMatrix3(Uu),fromReference:n=>n.applyMatrix3(xu).convertLinearToSRGB()}},Rw=new Set([Yt,fa]),nA={enabled:!0,_workingColorSpace:Yt,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!Rw.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,A){if(this.enabled===!1||e===A||!e||!A)return n;const t=ss[e].toReference,i=ss[A].fromReference;return i(t(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return ss[n].primaries},getTransfer:function(n){return n===at?Xs:ss[n].transfer}};function Fi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function no(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ii;class Vf{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let A;if(e instanceof HTMLCanvasElement)A=e;else{ii===void 0&&(ii=js("canvas")),ii.width=e.width,ii.height=e.height;const t=ii.getContext("2d");e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),A=ii}return A.width>2048||A.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),A.toDataURL("image/jpeg",.6)):A.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const A=js("canvas");A.width=e.width,A.height=e.height;const t=A.getContext("2d");t.drawImage(e,0,0,e.width,e.height);const i=t.getImageData(0,0,e.width,e.height),r=i.data;for(let s=0;s<r.length;s++)r[s]=Fi(r[s]/255)*255;return t.putImageData(i,0,0),A}else if(e.data){const A=e.data.slice(0);for(let t=0;t<A.length;t++)A instanceof Uint8Array||A instanceof Uint8ClampedArray?A[t]=Math.floor(Fi(A[t]/255)*255):A[t]=Fi(A[t]);return{data:A,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Dw=0;class kf{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Dw++}),this.uuid=Wi(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const A=e===void 0||typeof e=="string";if(!A&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const t={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let s=0,a=i.length;s<a;s++)i[s].isDataTexture?r.push(io(i[s].image)):r.push(io(i[s]))}else r=io(i);t.url=r}return A||(e.images[this.uuid]=t),t}}function io(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Vf.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Hw=0;class YA extends Yn{constructor(e=YA.DEFAULT_IMAGE,A=YA.DEFAULT_MAPPING,t=mt,i=mt,r=zA,s=In,a=Bt,o=mn,l=YA.DEFAULT_ANISOTROPY,c=at){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Hw++}),this.uuid=Wi(),this.name="",this.source=new kf(e),this.mipmaps=[],this.mapping=A,this.channel=0,this.wrapS=t,this.wrapT=i,this.magFilter=r,this.minFilter=s,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=o,this.offset=new Fe(0,0),this.repeat=new Fe(1,1),this.center=new Fe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ye,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof c=="string"?this.colorSpace=c:(Mi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=c===zn?MA:at),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const A=e===void 0||typeof e=="string";if(!A&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const t={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(t.userData=this.userData),A||(e.textures[this.uuid]=t),t}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Tf)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case il:e.x=e.x-Math.floor(e.x);break;case mt:e.x=e.x<0?0:1;break;case rl:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case il:e.y=e.y-Math.floor(e.y);break;case mt:e.y=e.y<0?0:1;break;case rl:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Mi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===MA?zn:Of}set encoding(e){Mi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===zn?MA:at}}YA.DEFAULT_IMAGE=null;YA.DEFAULT_MAPPING=Tf;YA.DEFAULT_ANISOTROPY=1;class bA{constructor(e=0,A=0,t=0,i=1){bA.prototype.isVector4=!0,this.x=e,this.y=A,this.z=t,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,A,t,i){return this.x=e,this.y=A,this.z=t,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,A){switch(e){case 0:this.x=A;break;case 1:this.y=A;break;case 2:this.z=A;break;case 3:this.w=A;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,A){return this.x=e.x+A.x,this.y=e.y+A.y,this.z=e.z+A.z,this.w=e.w+A.w,this}addScaledVector(e,A){return this.x+=e.x*A,this.y+=e.y*A,this.z+=e.z*A,this.w+=e.w*A,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,A){return this.x=e.x-A.x,this.y=e.y-A.y,this.z=e.z-A.z,this.w=e.w-A.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const A=this.x,t=this.y,i=this.z,r=this.w,s=e.elements;return this.x=s[0]*A+s[4]*t+s[8]*i+s[12]*r,this.y=s[1]*A+s[5]*t+s[9]*i+s[13]*r,this.z=s[2]*A+s[6]*t+s[10]*i+s[14]*r,this.w=s[3]*A+s[7]*t+s[11]*i+s[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const A=Math.sqrt(1-e.w*e.w);return A<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/A,this.y=e.y/A,this.z=e.z/A),this}setAxisAngleFromRotationMatrix(e){let A,t,i,r;const o=e.elements,l=o[0],c=o[4],u=o[8],h=o[1],p=o[5],g=o[9],m=o[2],d=o[6],f=o[10];if(Math.abs(c-h)<.01&&Math.abs(u-m)<.01&&Math.abs(g-d)<.01){if(Math.abs(c+h)<.1&&Math.abs(u+m)<.1&&Math.abs(g+d)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;A=Math.PI;const w=(l+1)/2,C=(p+1)/2,b=(f+1)/2,U=(c+h)/4,S=(u+m)/4,H=(g+d)/4;return w>C&&w>b?w<.01?(t=0,i=.707106781,r=.707106781):(t=Math.sqrt(w),i=U/t,r=S/t):C>b?C<.01?(t=.707106781,i=0,r=.707106781):(i=Math.sqrt(C),t=U/i,r=H/i):b<.01?(t=.707106781,i=.707106781,r=0):(r=Math.sqrt(b),t=S/r,i=H/r),this.set(t,i,r,A),this}let v=Math.sqrt((d-g)*(d-g)+(u-m)*(u-m)+(h-c)*(h-c));return Math.abs(v)<.001&&(v=1),this.x=(d-g)/v,this.y=(u-m)/v,this.z=(h-c)/v,this.w=Math.acos((l+p+f-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,A){return this.x=Math.max(e.x,Math.min(A.x,this.x)),this.y=Math.max(e.y,Math.min(A.y,this.y)),this.z=Math.max(e.z,Math.min(A.z,this.z)),this.w=Math.max(e.w,Math.min(A.w,this.w)),this}clampScalar(e,A){return this.x=Math.max(e,Math.min(A,this.x)),this.y=Math.max(e,Math.min(A,this.y)),this.z=Math.max(e,Math.min(A,this.z)),this.w=Math.max(e,Math.min(A,this.w)),this}clampLength(e,A){const t=this.length();return this.divideScalar(t||1).multiplyScalar(Math.max(e,Math.min(A,t)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,A){return this.x+=(e.x-this.x)*A,this.y+=(e.y-this.y)*A,this.z+=(e.z-this.z)*A,this.w+=(e.w-this.w)*A,this}lerpVectors(e,A,t){return this.x=e.x+(A.x-e.x)*t,this.y=e.y+(A.y-e.y)*t,this.z=e.z+(A.z-e.z)*t,this.w=e.w+(A.w-e.w)*t,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,A=0){return this.x=e[A],this.y=e[A+1],this.z=e[A+2],this.w=e[A+3],this}toArray(e=[],A=0){return e[A]=this.x,e[A+1]=this.y,e[A+2]=this.z,e[A+3]=this.w,e}fromBufferAttribute(e,A){return this.x=e.getX(A),this.y=e.getY(A),this.z=e.getZ(A),this.w=e.getW(A),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Pw extends Yn{constructor(e=1,A=1,t={}){super(),this.isRenderTarget=!0,this.width=e,this.height=A,this.depth=1,this.scissor=new bA(0,0,e,A),this.scissorTest=!1,this.viewport=new bA(0,0,e,A);const i={width:e,height:A,depth:1};t.encoding!==void 0&&(Mi("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===zn?MA:at),t=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:zA,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},t),this.texture=new YA(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=t.generateMipmaps,this.texture.internalFormat=t.internalFormat,this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.depthTexture=t.depthTexture,this.samples=t.samples}setSize(e,A,t=1){(this.width!==e||this.height!==A||this.depth!==t)&&(this.width=e,this.height=A,this.depth=t,this.texture.image.width=e,this.texture.image.height=A,this.texture.image.depth=t,this.dispose()),this.viewport.set(0,0,e,A),this.scissor.set(0,0,e,A)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const A=Object.assign({},e.texture.image);return this.texture.source=new kf(A),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Wn extends Pw{constructor(e=1,A=1,t={}){super(e,A,t),this.isWebGLRenderTarget=!0}}class Kf extends YA{constructor(e=null,A=1,t=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:A,height:t,depth:i},this.magFilter=KA,this.minFilter=KA,this.wrapR=mt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ow extends YA{constructor(e=null,A=1,t=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:A,height:t,depth:i},this.magFilter=KA,this.minFilter=KA,this.wrapR=mt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Xn{constructor(e=0,A=0,t=0,i=1){this.isQuaternion=!0,this._x=e,this._y=A,this._z=t,this._w=i}static slerpFlat(e,A,t,i,r,s,a){let o=t[i+0],l=t[i+1],c=t[i+2],u=t[i+3];const h=r[s+0],p=r[s+1],g=r[s+2],m=r[s+3];if(a===0){e[A+0]=o,e[A+1]=l,e[A+2]=c,e[A+3]=u;return}if(a===1){e[A+0]=h,e[A+1]=p,e[A+2]=g,e[A+3]=m;return}if(u!==m||o!==h||l!==p||c!==g){let d=1-a;const f=o*h+l*p+c*g+u*m,v=f>=0?1:-1,w=1-f*f;if(w>Number.EPSILON){const b=Math.sqrt(w),U=Math.atan2(b,f*v);d=Math.sin(d*U)/b,a=Math.sin(a*U)/b}const C=a*v;if(o=o*d+h*C,l=l*d+p*C,c=c*d+g*C,u=u*d+m*C,d===1-a){const b=1/Math.sqrt(o*o+l*l+c*c+u*u);o*=b,l*=b,c*=b,u*=b}}e[A]=o,e[A+1]=l,e[A+2]=c,e[A+3]=u}static multiplyQuaternionsFlat(e,A,t,i,r,s){const a=t[i],o=t[i+1],l=t[i+2],c=t[i+3],u=r[s],h=r[s+1],p=r[s+2],g=r[s+3];return e[A]=a*g+c*u+o*p-l*h,e[A+1]=o*g+c*h+l*u-a*p,e[A+2]=l*g+c*p+a*h-o*u,e[A+3]=c*g-a*u-o*h-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,A,t,i){return this._x=e,this._y=A,this._z=t,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,A=!0){const t=e._x,i=e._y,r=e._z,s=e._order,a=Math.cos,o=Math.sin,l=a(t/2),c=a(i/2),u=a(r/2),h=o(t/2),p=o(i/2),g=o(r/2);switch(s){case"XYZ":this._x=h*c*u+l*p*g,this._y=l*p*u-h*c*g,this._z=l*c*g+h*p*u,this._w=l*c*u-h*p*g;break;case"YXZ":this._x=h*c*u+l*p*g,this._y=l*p*u-h*c*g,this._z=l*c*g-h*p*u,this._w=l*c*u+h*p*g;break;case"ZXY":this._x=h*c*u-l*p*g,this._y=l*p*u+h*c*g,this._z=l*c*g+h*p*u,this._w=l*c*u-h*p*g;break;case"ZYX":this._x=h*c*u-l*p*g,this._y=l*p*u+h*c*g,this._z=l*c*g-h*p*u,this._w=l*c*u+h*p*g;break;case"YZX":this._x=h*c*u+l*p*g,this._y=l*p*u+h*c*g,this._z=l*c*g-h*p*u,this._w=l*c*u-h*p*g;break;case"XZY":this._x=h*c*u-l*p*g,this._y=l*p*u-h*c*g,this._z=l*c*g+h*p*u,this._w=l*c*u+h*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s)}return A===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,A){const t=A/2,i=Math.sin(t);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(t),this._onChangeCallback(),this}setFromRotationMatrix(e){const A=e.elements,t=A[0],i=A[4],r=A[8],s=A[1],a=A[5],o=A[9],l=A[2],c=A[6],u=A[10],h=t+a+u;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(c-o)*p,this._y=(r-l)*p,this._z=(s-i)*p}else if(t>a&&t>u){const p=2*Math.sqrt(1+t-a-u);this._w=(c-o)/p,this._x=.25*p,this._y=(i+s)/p,this._z=(r+l)/p}else if(a>u){const p=2*Math.sqrt(1+a-t-u);this._w=(r-l)/p,this._x=(i+s)/p,this._y=.25*p,this._z=(o+c)/p}else{const p=2*Math.sqrt(1+u-t-a);this._w=(s-i)/p,this._x=(r+l)/p,this._y=(o+c)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,A){let t=e.dot(A)+1;return t<Number.EPSILON?(t=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=t):(this._x=0,this._y=-e.z,this._z=e.y,this._w=t)):(this._x=e.y*A.z-e.z*A.y,this._y=e.z*A.x-e.x*A.z,this._z=e.x*A.y-e.y*A.x,this._w=t),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(PA(this.dot(e),-1,1)))}rotateTowards(e,A){const t=this.angleTo(e);if(t===0)return this;const i=Math.min(1,A/t);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,A){const t=e._x,i=e._y,r=e._z,s=e._w,a=A._x,o=A._y,l=A._z,c=A._w;return this._x=t*c+s*a+i*l-r*o,this._y=i*c+s*o+r*a-t*l,this._z=r*c+s*l+t*o-i*a,this._w=s*c-t*a-i*o-r*l,this._onChangeCallback(),this}slerp(e,A){if(A===0)return this;if(A===1)return this.copy(e);const t=this._x,i=this._y,r=this._z,s=this._w;let a=s*e._w+t*e._x+i*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=s,this._x=t,this._y=i,this._z=r,this;const o=1-a*a;if(o<=Number.EPSILON){const p=1-A;return this._w=p*s+A*this._w,this._x=p*t+A*this._x,this._y=p*i+A*this._y,this._z=p*r+A*this._z,this.normalize(),this}const l=Math.sqrt(o),c=Math.atan2(l,a),u=Math.sin((1-A)*c)/l,h=Math.sin(A*c)/l;return this._w=s*u+this._w*h,this._x=t*u+this._x*h,this._y=i*u+this._y*h,this._z=r*u+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,A,t){return this.copy(e).slerp(A,t)}random(){const e=Math.random(),A=Math.sqrt(1-e),t=Math.sqrt(e),i=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(A*Math.cos(i),t*Math.sin(r),t*Math.cos(r),A*Math.sin(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,A=0){return this._x=e[A],this._y=e[A+1],this._z=e[A+2],this._w=e[A+3],this._onChangeCallback(),this}toArray(e=[],A=0){return e[A]=this._x,e[A+1]=this._y,e[A+2]=this._z,e[A+3]=this._w,e}fromBufferAttribute(e,A){return this._x=e.getX(A),this._y=e.getY(A),this._z=e.getZ(A),this._w=e.getW(A),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class Q{constructor(e=0,A=0,t=0){Q.prototype.isVector3=!0,this.x=e,this.y=A,this.z=t}set(e,A,t){return t===void 0&&(t=this.z),this.x=e,this.y=A,this.z=t,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,A){switch(e){case 0:this.x=A;break;case 1:this.y=A;break;case 2:this.z=A;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,A){return this.x=e.x+A.x,this.y=e.y+A.y,this.z=e.z+A.z,this}addScaledVector(e,A){return this.x+=e.x*A,this.y+=e.y*A,this.z+=e.z*A,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,A){return this.x=e.x-A.x,this.y=e.y-A.y,this.z=e.z-A.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,A){return this.x=e.x*A.x,this.y=e.y*A.y,this.z=e.z*A.z,this}applyEuler(e){return this.applyQuaternion(yu.setFromEuler(e))}applyAxisAngle(e,A){return this.applyQuaternion(yu.setFromAxisAngle(e,A))}applyMatrix3(e){const A=this.x,t=this.y,i=this.z,r=e.elements;return this.x=r[0]*A+r[3]*t+r[6]*i,this.y=r[1]*A+r[4]*t+r[7]*i,this.z=r[2]*A+r[5]*t+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const A=this.x,t=this.y,i=this.z,r=e.elements,s=1/(r[3]*A+r[7]*t+r[11]*i+r[15]);return this.x=(r[0]*A+r[4]*t+r[8]*i+r[12])*s,this.y=(r[1]*A+r[5]*t+r[9]*i+r[13])*s,this.z=(r[2]*A+r[6]*t+r[10]*i+r[14])*s,this}applyQuaternion(e){const A=this.x,t=this.y,i=this.z,r=e.x,s=e.y,a=e.z,o=e.w,l=2*(s*i-a*t),c=2*(a*A-r*i),u=2*(r*t-s*A);return this.x=A+o*l+s*u-a*c,this.y=t+o*c+a*l-r*u,this.z=i+o*u+r*c-s*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const A=this.x,t=this.y,i=this.z,r=e.elements;return this.x=r[0]*A+r[4]*t+r[8]*i,this.y=r[1]*A+r[5]*t+r[9]*i,this.z=r[2]*A+r[6]*t+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,A){return this.x=Math.max(e.x,Math.min(A.x,this.x)),this.y=Math.max(e.y,Math.min(A.y,this.y)),this.z=Math.max(e.z,Math.min(A.z,this.z)),this}clampScalar(e,A){return this.x=Math.max(e,Math.min(A,this.x)),this.y=Math.max(e,Math.min(A,this.y)),this.z=Math.max(e,Math.min(A,this.z)),this}clampLength(e,A){const t=this.length();return this.divideScalar(t||1).multiplyScalar(Math.max(e,Math.min(A,t)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,A){return this.x+=(e.x-this.x)*A,this.y+=(e.y-this.y)*A,this.z+=(e.z-this.z)*A,this}lerpVectors(e,A,t){return this.x=e.x+(A.x-e.x)*t,this.y=e.y+(A.y-e.y)*t,this.z=e.z+(A.z-e.z)*t,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,A){const t=e.x,i=e.y,r=e.z,s=A.x,a=A.y,o=A.z;return this.x=i*o-r*a,this.y=r*s-t*o,this.z=t*a-i*s,this}projectOnVector(e){const A=e.lengthSq();if(A===0)return this.set(0,0,0);const t=e.dot(this)/A;return this.copy(e).multiplyScalar(t)}projectOnPlane(e){return ro.copy(this).projectOnVector(e),this.sub(ro)}reflect(e){return this.sub(ro.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const A=Math.sqrt(this.lengthSq()*e.lengthSq());if(A===0)return Math.PI/2;const t=this.dot(e)/A;return Math.acos(PA(t,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const A=this.x-e.x,t=this.y-e.y,i=this.z-e.z;return A*A+t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,A,t){const i=Math.sin(A)*e;return this.x=i*Math.sin(t),this.y=Math.cos(A)*e,this.z=i*Math.cos(t),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,A,t){return this.x=e*Math.sin(A),this.y=t,this.z=e*Math.cos(A),this}setFromMatrixPosition(e){const A=e.elements;return this.x=A[12],this.y=A[13],this.z=A[14],this}setFromMatrixScale(e){const A=this.setFromMatrixColumn(e,0).length(),t=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=A,this.y=t,this.z=i,this}setFromMatrixColumn(e,A){return this.fromArray(e.elements,A*4)}setFromMatrix3Column(e,A){return this.fromArray(e.elements,A*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,A=0){return this.x=e[A],this.y=e[A+1],this.z=e[A+2],this}toArray(e=[],A=0){return e[A]=this.x,e[A+1]=this.y,e[A+2]=this.z,e}fromBufferAttribute(e,A){return this.x=e.getX(A),this.y=e.getY(A),this.z=e.getZ(A),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,A=Math.random()*Math.PI*2,t=Math.sqrt(1-e**2);return this.x=t*Math.cos(A),this.y=t*Math.sin(A),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ro=new Q,yu=new Xn;class Qr{constructor(e=new Q(1/0,1/0,1/0),A=new Q(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=A}set(e,A){return this.min.copy(e),this.max.copy(A),this}setFromArray(e){this.makeEmpty();for(let A=0,t=e.length;A<t;A+=3)this.expandByPoint(ct.fromArray(e,A));return this}setFromBufferAttribute(e){this.makeEmpty();for(let A=0,t=e.count;A<t;A++)this.expandByPoint(ct.fromBufferAttribute(e,A));return this}setFromPoints(e){this.makeEmpty();for(let A=0,t=e.length;A<t;A++)this.expandByPoint(e[A]);return this}setFromCenterAndSize(e,A){const t=ct.copy(A).multiplyScalar(.5);return this.min.copy(e).sub(t),this.max.copy(e).add(t),this}setFromObject(e,A=!1){return this.makeEmpty(),this.expandByObject(e,A)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,A=!1){e.updateWorldMatrix(!1,!1);const t=e.geometry;if(t!==void 0){const r=t.getAttribute("position");if(A===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let s=0,a=r.count;s<a;s++)e.isMesh===!0?e.getVertexPosition(s,ct):ct.fromBufferAttribute(r,s),ct.applyMatrix4(e.matrixWorld),this.expandByPoint(ct);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),as.copy(e.boundingBox)):(t.boundingBox===null&&t.computeBoundingBox(),as.copy(t.boundingBox)),as.applyMatrix4(e.matrixWorld),this.union(as)}const i=e.children;for(let r=0,s=i.length;r<s;r++)this.expandByObject(i[r],A);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,A){return A.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,ct),ct.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let A,t;return e.normal.x>0?(A=e.normal.x*this.min.x,t=e.normal.x*this.max.x):(A=e.normal.x*this.max.x,t=e.normal.x*this.min.x),e.normal.y>0?(A+=e.normal.y*this.min.y,t+=e.normal.y*this.max.y):(A+=e.normal.y*this.max.y,t+=e.normal.y*this.min.y),e.normal.z>0?(A+=e.normal.z*this.min.z,t+=e.normal.z*this.max.z):(A+=e.normal.z*this.max.z,t+=e.normal.z*this.min.z),A<=-e.constant&&t>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(er),os.subVectors(this.max,er),ri.subVectors(e.a,er),si.subVectors(e.b,er),ai.subVectors(e.c,er),qt.subVectors(si,ri),Zt.subVectors(ai,si),xn.subVectors(ri,ai);let A=[0,-qt.z,qt.y,0,-Zt.z,Zt.y,0,-xn.z,xn.y,qt.z,0,-qt.x,Zt.z,0,-Zt.x,xn.z,0,-xn.x,-qt.y,qt.x,0,-Zt.y,Zt.x,0,-xn.y,xn.x,0];return!so(A,ri,si,ai,os)||(A=[1,0,0,0,1,0,0,0,1],!so(A,ri,si,ai,os))?!1:(ls.crossVectors(qt,Zt),A=[ls.x,ls.y,ls.z],so(A,ri,si,ai,os))}clampPoint(e,A){return A.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ct).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ct).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ht[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ht[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ht[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ht[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ht[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ht[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ht[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ht[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ht),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Ht=[new Q,new Q,new Q,new Q,new Q,new Q,new Q,new Q],ct=new Q,as=new Qr,ri=new Q,si=new Q,ai=new Q,qt=new Q,Zt=new Q,xn=new Q,er=new Q,os=new Q,ls=new Q,Un=new Q;function so(n,e,A,t,i){for(let r=0,s=n.length-3;r<=s;r+=3){Un.fromArray(n,r);const a=i.x*Math.abs(Un.x)+i.y*Math.abs(Un.y)+i.z*Math.abs(Un.z),o=e.dot(Un),l=A.dot(Un),c=t.dot(Un);if(Math.max(-Math.max(o,l,c),Math.min(o,l,c))>a)return!1}return!0}const Nw=new Qr,Ar=new Q,ao=new Q;let da=class{constructor(e=new Q,A=-1){this.isSphere=!0,this.center=e,this.radius=A}set(e,A){return this.center.copy(e),this.radius=A,this}setFromPoints(e,A){const t=this.center;A!==void 0?t.copy(A):Nw.setFromPoints(e).getCenter(t);let i=0;for(let r=0,s=e.length;r<s;r++)i=Math.max(i,t.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const A=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=A*A}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,A){const t=this.center.distanceToSquared(e);return A.copy(e),t>this.radius*this.radius&&(A.sub(this.center).normalize(),A.multiplyScalar(this.radius).add(this.center)),A}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ar.subVectors(e,this.center);const A=Ar.lengthSq();if(A>this.radius*this.radius){const t=Math.sqrt(A),i=(t-this.radius)*.5;this.center.addScaledVector(Ar,i/t),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ao.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ar.copy(e.center).add(ao)),this.expandByPoint(Ar.copy(e.center).sub(ao))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}};const Pt=new Q,oo=new Q,cs=new Q,jt=new Q,lo=new Q,us=new Q,co=new Q;class pa{constructor(e=new Q,A=new Q(0,0,-1)){this.origin=e,this.direction=A}set(e,A){return this.origin.copy(e),this.direction.copy(A),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,A){return A.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Pt)),this}closestPointToPoint(e,A){A.subVectors(e,this.origin);const t=A.dot(this.direction);return t<0?A.copy(this.origin):A.copy(this.origin).addScaledVector(this.direction,t)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const A=Pt.subVectors(e,this.origin).dot(this.direction);return A<0?this.origin.distanceToSquared(e):(Pt.copy(this.origin).addScaledVector(this.direction,A),Pt.distanceToSquared(e))}distanceSqToSegment(e,A,t,i){oo.copy(e).add(A).multiplyScalar(.5),cs.copy(A).sub(e).normalize(),jt.copy(this.origin).sub(oo);const r=e.distanceTo(A)*.5,s=-this.direction.dot(cs),a=jt.dot(this.direction),o=-jt.dot(cs),l=jt.lengthSq(),c=Math.abs(1-s*s);let u,h,p,g;if(c>0)if(u=s*o-a,h=s*a-o,g=r*c,u>=0)if(h>=-g)if(h<=g){const m=1/c;u*=m,h*=m,p=u*(u+s*h+2*a)+h*(s*u+h+2*o)+l}else h=r,u=Math.max(0,-(s*h+a)),p=-u*u+h*(h+2*o)+l;else h=-r,u=Math.max(0,-(s*h+a)),p=-u*u+h*(h+2*o)+l;else h<=-g?(u=Math.max(0,-(-s*r+a)),h=u>0?-r:Math.min(Math.max(-r,-o),r),p=-u*u+h*(h+2*o)+l):h<=g?(u=0,h=Math.min(Math.max(-r,-o),r),p=h*(h+2*o)+l):(u=Math.max(0,-(s*r+a)),h=u>0?r:Math.min(Math.max(-r,-o),r),p=-u*u+h*(h+2*o)+l);else h=s>0?-r:r,u=Math.max(0,-(s*h+a)),p=-u*u+h*(h+2*o)+l;return t&&t.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(oo).addScaledVector(cs,h),p}intersectSphere(e,A){Pt.subVectors(e.center,this.origin);const t=Pt.dot(this.direction),i=Pt.dot(Pt)-t*t,r=e.radius*e.radius;if(i>r)return null;const s=Math.sqrt(r-i),a=t-s,o=t+s;return o<0?null:a<0?this.at(o,A):this.at(a,A)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const A=e.normal.dot(this.direction);if(A===0)return e.distanceToPoint(this.origin)===0?0:null;const t=-(this.origin.dot(e.normal)+e.constant)/A;return t>=0?t:null}intersectPlane(e,A){const t=this.distanceToPlane(e);return t===null?null:this.at(t,A)}intersectsPlane(e){const A=e.distanceToPoint(this.origin);return A===0||e.normal.dot(this.direction)*A<0}intersectBox(e,A){let t,i,r,s,a,o;const l=1/this.direction.x,c=1/this.direction.y,u=1/this.direction.z,h=this.origin;return l>=0?(t=(e.min.x-h.x)*l,i=(e.max.x-h.x)*l):(t=(e.max.x-h.x)*l,i=(e.min.x-h.x)*l),c>=0?(r=(e.min.y-h.y)*c,s=(e.max.y-h.y)*c):(r=(e.max.y-h.y)*c,s=(e.min.y-h.y)*c),t>s||r>i||((r>t||isNaN(t))&&(t=r),(s<i||isNaN(i))&&(i=s),u>=0?(a=(e.min.z-h.z)*u,o=(e.max.z-h.z)*u):(a=(e.max.z-h.z)*u,o=(e.min.z-h.z)*u),t>o||a>i)||((a>t||t!==t)&&(t=a),(o<i||i!==i)&&(i=o),i<0)?null:this.at(t>=0?t:i,A)}intersectsBox(e){return this.intersectBox(e,Pt)!==null}intersectTriangle(e,A,t,i,r){lo.subVectors(A,e),us.subVectors(t,e),co.crossVectors(lo,us);let s=this.direction.dot(co),a;if(s>0){if(i)return null;a=1}else if(s<0)a=-1,s=-s;else return null;jt.subVectors(this.origin,e);const o=a*this.direction.dot(us.crossVectors(jt,us));if(o<0)return null;const l=a*this.direction.dot(lo.cross(jt));if(l<0||o+l>s)return null;const c=-a*jt.dot(co);return c<0?null:this.at(c/s,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class UA{constructor(e,A,t,i,r,s,a,o,l,c,u,h,p,g,m,d){UA.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,A,t,i,r,s,a,o,l,c,u,h,p,g,m,d)}set(e,A,t,i,r,s,a,o,l,c,u,h,p,g,m,d){const f=this.elements;return f[0]=e,f[4]=A,f[8]=t,f[12]=i,f[1]=r,f[5]=s,f[9]=a,f[13]=o,f[2]=l,f[6]=c,f[10]=u,f[14]=h,f[3]=p,f[7]=g,f[11]=m,f[15]=d,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new UA().fromArray(this.elements)}copy(e){const A=this.elements,t=e.elements;return A[0]=t[0],A[1]=t[1],A[2]=t[2],A[3]=t[3],A[4]=t[4],A[5]=t[5],A[6]=t[6],A[7]=t[7],A[8]=t[8],A[9]=t[9],A[10]=t[10],A[11]=t[11],A[12]=t[12],A[13]=t[13],A[14]=t[14],A[15]=t[15],this}copyPosition(e){const A=this.elements,t=e.elements;return A[12]=t[12],A[13]=t[13],A[14]=t[14],this}setFromMatrix3(e){const A=e.elements;return this.set(A[0],A[3],A[6],0,A[1],A[4],A[7],0,A[2],A[5],A[8],0,0,0,0,1),this}extractBasis(e,A,t){return e.setFromMatrixColumn(this,0),A.setFromMatrixColumn(this,1),t.setFromMatrixColumn(this,2),this}makeBasis(e,A,t){return this.set(e.x,A.x,t.x,0,e.y,A.y,t.y,0,e.z,A.z,t.z,0,0,0,0,1),this}extractRotation(e){const A=this.elements,t=e.elements,i=1/oi.setFromMatrixColumn(e,0).length(),r=1/oi.setFromMatrixColumn(e,1).length(),s=1/oi.setFromMatrixColumn(e,2).length();return A[0]=t[0]*i,A[1]=t[1]*i,A[2]=t[2]*i,A[3]=0,A[4]=t[4]*r,A[5]=t[5]*r,A[6]=t[6]*r,A[7]=0,A[8]=t[8]*s,A[9]=t[9]*s,A[10]=t[10]*s,A[11]=0,A[12]=0,A[13]=0,A[14]=0,A[15]=1,this}makeRotationFromEuler(e){const A=this.elements,t=e.x,i=e.y,r=e.z,s=Math.cos(t),a=Math.sin(t),o=Math.cos(i),l=Math.sin(i),c=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const h=s*c,p=s*u,g=a*c,m=a*u;A[0]=o*c,A[4]=-o*u,A[8]=l,A[1]=p+g*l,A[5]=h-m*l,A[9]=-a*o,A[2]=m-h*l,A[6]=g+p*l,A[10]=s*o}else if(e.order==="YXZ"){const h=o*c,p=o*u,g=l*c,m=l*u;A[0]=h+m*a,A[4]=g*a-p,A[8]=s*l,A[1]=s*u,A[5]=s*c,A[9]=-a,A[2]=p*a-g,A[6]=m+h*a,A[10]=s*o}else if(e.order==="ZXY"){const h=o*c,p=o*u,g=l*c,m=l*u;A[0]=h-m*a,A[4]=-s*u,A[8]=g+p*a,A[1]=p+g*a,A[5]=s*c,A[9]=m-h*a,A[2]=-s*l,A[6]=a,A[10]=s*o}else if(e.order==="ZYX"){const h=s*c,p=s*u,g=a*c,m=a*u;A[0]=o*c,A[4]=g*l-p,A[8]=h*l+m,A[1]=o*u,A[5]=m*l+h,A[9]=p*l-g,A[2]=-l,A[6]=a*o,A[10]=s*o}else if(e.order==="YZX"){const h=s*o,p=s*l,g=a*o,m=a*l;A[0]=o*c,A[4]=m-h*u,A[8]=g*u+p,A[1]=u,A[5]=s*c,A[9]=-a*c,A[2]=-l*c,A[6]=p*u+g,A[10]=h-m*u}else if(e.order==="XZY"){const h=s*o,p=s*l,g=a*o,m=a*l;A[0]=o*c,A[4]=-u,A[8]=l*c,A[1]=h*u+m,A[5]=s*c,A[9]=p*u-g,A[2]=g*u-p,A[6]=a*c,A[10]=m*u+h}return A[3]=0,A[7]=0,A[11]=0,A[12]=0,A[13]=0,A[14]=0,A[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Gw,e,Vw)}lookAt(e,A,t){const i=this.elements;return jA.subVectors(e,A),jA.lengthSq()===0&&(jA.z=1),jA.normalize(),$t.crossVectors(t,jA),$t.lengthSq()===0&&(Math.abs(t.z)===1?jA.x+=1e-4:jA.z+=1e-4,jA.normalize(),$t.crossVectors(t,jA)),$t.normalize(),hs.crossVectors(jA,$t),i[0]=$t.x,i[4]=hs.x,i[8]=jA.x,i[1]=$t.y,i[5]=hs.y,i[9]=jA.y,i[2]=$t.z,i[6]=hs.z,i[10]=jA.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,A){const t=e.elements,i=A.elements,r=this.elements,s=t[0],a=t[4],o=t[8],l=t[12],c=t[1],u=t[5],h=t[9],p=t[13],g=t[2],m=t[6],d=t[10],f=t[14],v=t[3],w=t[7],C=t[11],b=t[15],U=i[0],S=i[4],H=i[8],z=i[12],B=i[1],M=i[5],K=i[9],W=i[13],T=i[2],G=i[6],R=i[10],Y=i[14],X=i[3],J=i[7],q=i[11],Ae=i[15];return r[0]=s*U+a*B+o*T+l*X,r[4]=s*S+a*M+o*G+l*J,r[8]=s*H+a*K+o*R+l*q,r[12]=s*z+a*W+o*Y+l*Ae,r[1]=c*U+u*B+h*T+p*X,r[5]=c*S+u*M+h*G+p*J,r[9]=c*H+u*K+h*R+p*q,r[13]=c*z+u*W+h*Y+p*Ae,r[2]=g*U+m*B+d*T+f*X,r[6]=g*S+m*M+d*G+f*J,r[10]=g*H+m*K+d*R+f*q,r[14]=g*z+m*W+d*Y+f*Ae,r[3]=v*U+w*B+C*T+b*X,r[7]=v*S+w*M+C*G+b*J,r[11]=v*H+w*K+C*R+b*q,r[15]=v*z+w*W+C*Y+b*Ae,this}multiplyScalar(e){const A=this.elements;return A[0]*=e,A[4]*=e,A[8]*=e,A[12]*=e,A[1]*=e,A[5]*=e,A[9]*=e,A[13]*=e,A[2]*=e,A[6]*=e,A[10]*=e,A[14]*=e,A[3]*=e,A[7]*=e,A[11]*=e,A[15]*=e,this}determinant(){const e=this.elements,A=e[0],t=e[4],i=e[8],r=e[12],s=e[1],a=e[5],o=e[9],l=e[13],c=e[2],u=e[6],h=e[10],p=e[14],g=e[3],m=e[7],d=e[11],f=e[15];return g*(+r*o*u-i*l*u-r*a*h+t*l*h+i*a*p-t*o*p)+m*(+A*o*p-A*l*h+r*s*h-i*s*p+i*l*c-r*o*c)+d*(+A*l*u-A*a*p-r*s*u+t*s*p+r*a*c-t*l*c)+f*(-i*a*c-A*o*u+A*a*h+i*s*u-t*s*h+t*o*c)}transpose(){const e=this.elements;let A;return A=e[1],e[1]=e[4],e[4]=A,A=e[2],e[2]=e[8],e[8]=A,A=e[6],e[6]=e[9],e[9]=A,A=e[3],e[3]=e[12],e[12]=A,A=e[7],e[7]=e[13],e[13]=A,A=e[11],e[11]=e[14],e[14]=A,this}setPosition(e,A,t){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=A,i[14]=t),this}invert(){const e=this.elements,A=e[0],t=e[1],i=e[2],r=e[3],s=e[4],a=e[5],o=e[6],l=e[7],c=e[8],u=e[9],h=e[10],p=e[11],g=e[12],m=e[13],d=e[14],f=e[15],v=u*d*l-m*h*l+m*o*p-a*d*p-u*o*f+a*h*f,w=g*h*l-c*d*l-g*o*p+s*d*p+c*o*f-s*h*f,C=c*m*l-g*u*l+g*a*p-s*m*p-c*a*f+s*u*f,b=g*u*o-c*m*o-g*a*h+s*m*h+c*a*d-s*u*d,U=A*v+t*w+i*C+r*b;if(U===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const S=1/U;return e[0]=v*S,e[1]=(m*h*r-u*d*r-m*i*p+t*d*p+u*i*f-t*h*f)*S,e[2]=(a*d*r-m*o*r+m*i*l-t*d*l-a*i*f+t*o*f)*S,e[3]=(u*o*r-a*h*r-u*i*l+t*h*l+a*i*p-t*o*p)*S,e[4]=w*S,e[5]=(c*d*r-g*h*r+g*i*p-A*d*p-c*i*f+A*h*f)*S,e[6]=(g*o*r-s*d*r-g*i*l+A*d*l+s*i*f-A*o*f)*S,e[7]=(s*h*r-c*o*r+c*i*l-A*h*l-s*i*p+A*o*p)*S,e[8]=C*S,e[9]=(g*u*r-c*m*r-g*t*p+A*m*p+c*t*f-A*u*f)*S,e[10]=(s*m*r-g*a*r+g*t*l-A*m*l-s*t*f+A*a*f)*S,e[11]=(c*a*r-s*u*r-c*t*l+A*u*l+s*t*p-A*a*p)*S,e[12]=b*S,e[13]=(c*m*i-g*u*i+g*t*h-A*m*h-c*t*d+A*u*d)*S,e[14]=(g*a*i-s*m*i-g*t*o+A*m*o+s*t*d-A*a*d)*S,e[15]=(s*u*i-c*a*i+c*t*o-A*u*o-s*t*h+A*a*h)*S,this}scale(e){const A=this.elements,t=e.x,i=e.y,r=e.z;return A[0]*=t,A[4]*=i,A[8]*=r,A[1]*=t,A[5]*=i,A[9]*=r,A[2]*=t,A[6]*=i,A[10]*=r,A[3]*=t,A[7]*=i,A[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,A=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],t=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(A,t,i))}makeTranslation(e,A,t){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,A,0,0,1,t,0,0,0,1),this}makeRotationX(e){const A=Math.cos(e),t=Math.sin(e);return this.set(1,0,0,0,0,A,-t,0,0,t,A,0,0,0,0,1),this}makeRotationY(e){const A=Math.cos(e),t=Math.sin(e);return this.set(A,0,t,0,0,1,0,0,-t,0,A,0,0,0,0,1),this}makeRotationZ(e){const A=Math.cos(e),t=Math.sin(e);return this.set(A,-t,0,0,t,A,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,A){const t=Math.cos(A),i=Math.sin(A),r=1-t,s=e.x,a=e.y,o=e.z,l=r*s,c=r*a;return this.set(l*s+t,l*a-i*o,l*o+i*a,0,l*a+i*o,c*a+t,c*o-i*s,0,l*o-i*a,c*o+i*s,r*o*o+t,0,0,0,0,1),this}makeScale(e,A,t){return this.set(e,0,0,0,0,A,0,0,0,0,t,0,0,0,0,1),this}makeShear(e,A,t,i,r,s){return this.set(1,t,r,0,e,1,s,0,A,i,1,0,0,0,0,1),this}compose(e,A,t){const i=this.elements,r=A._x,s=A._y,a=A._z,o=A._w,l=r+r,c=s+s,u=a+a,h=r*l,p=r*c,g=r*u,m=s*c,d=s*u,f=a*u,v=o*l,w=o*c,C=o*u,b=t.x,U=t.y,S=t.z;return i[0]=(1-(m+f))*b,i[1]=(p+C)*b,i[2]=(g-w)*b,i[3]=0,i[4]=(p-C)*U,i[5]=(1-(h+f))*U,i[6]=(d+v)*U,i[7]=0,i[8]=(g+w)*S,i[9]=(d-v)*S,i[10]=(1-(h+m))*S,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,A,t){const i=this.elements;let r=oi.set(i[0],i[1],i[2]).length();const s=oi.set(i[4],i[5],i[6]).length(),a=oi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],ut.copy(this);const l=1/r,c=1/s,u=1/a;return ut.elements[0]*=l,ut.elements[1]*=l,ut.elements[2]*=l,ut.elements[4]*=c,ut.elements[5]*=c,ut.elements[6]*=c,ut.elements[8]*=u,ut.elements[9]*=u,ut.elements[10]*=u,A.setFromRotationMatrix(ut),t.x=r,t.y=s,t.z=a,this}makePerspective(e,A,t,i,r,s,a=zt){const o=this.elements,l=2*r/(A-e),c=2*r/(t-i),u=(A+e)/(A-e),h=(t+i)/(t-i);let p,g;if(a===zt)p=-(s+r)/(s-r),g=-2*s*r/(s-r);else if(a===qs)p=-s/(s-r),g=-s*r/(s-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return o[0]=l,o[4]=0,o[8]=u,o[12]=0,o[1]=0,o[5]=c,o[9]=h,o[13]=0,o[2]=0,o[6]=0,o[10]=p,o[14]=g,o[3]=0,o[7]=0,o[11]=-1,o[15]=0,this}makeOrthographic(e,A,t,i,r,s,a=zt){const o=this.elements,l=1/(A-e),c=1/(t-i),u=1/(s-r),h=(A+e)*l,p=(t+i)*c;let g,m;if(a===zt)g=(s+r)*u,m=-2*u;else if(a===qs)g=r*u,m=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return o[0]=2*l,o[4]=0,o[8]=0,o[12]=-h,o[1]=0,o[5]=2*c,o[9]=0,o[13]=-p,o[2]=0,o[6]=0,o[10]=m,o[14]=-g,o[3]=0,o[7]=0,o[11]=0,o[15]=1,this}equals(e){const A=this.elements,t=e.elements;for(let i=0;i<16;i++)if(A[i]!==t[i])return!1;return!0}fromArray(e,A=0){for(let t=0;t<16;t++)this.elements[t]=e[t+A];return this}toArray(e=[],A=0){const t=this.elements;return e[A]=t[0],e[A+1]=t[1],e[A+2]=t[2],e[A+3]=t[3],e[A+4]=t[4],e[A+5]=t[5],e[A+6]=t[6],e[A+7]=t[7],e[A+8]=t[8],e[A+9]=t[9],e[A+10]=t[10],e[A+11]=t[11],e[A+12]=t[12],e[A+13]=t[13],e[A+14]=t[14],e[A+15]=t[15],e}}const oi=new Q,ut=new UA,Gw=new Q(0,0,0),Vw=new Q(1,1,1),$t=new Q,hs=new Q,jA=new Q,Su=new UA,Mu=new Xn;class ga{constructor(e=0,A=0,t=0,i=ga.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=A,this._z=t,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,A,t,i=this._order){return this._x=e,this._y=A,this._z=t,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,A=this._order,t=!0){const i=e.elements,r=i[0],s=i[4],a=i[8],o=i[1],l=i[5],c=i[9],u=i[2],h=i[6],p=i[10];switch(A){case"XYZ":this._y=Math.asin(PA(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-c,p),this._z=Math.atan2(-s,r)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-PA(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(o,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(PA(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-s,l)):(this._y=0,this._z=Math.atan2(o,r));break;case"ZYX":this._y=Math.asin(-PA(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(o,r)):(this._x=0,this._z=Math.atan2(-s,l));break;case"YZX":this._z=Math.asin(PA(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-c,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-PA(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-c,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+A)}return this._order=A,t===!0&&this._onChangeCallback(),this}setFromQuaternion(e,A,t){return Su.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Su,A,t)}setFromVector3(e,A=this._order){return this.set(e.x,e.y,e.z,A)}reorder(e){return Mu.setFromEuler(this),this.setFromQuaternion(Mu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],A=0){return e[A]=this._x,e[A+1]=this._y,e[A+2]=this._z,e[A+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ga.DEFAULT_ORDER="XYZ";class xl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let kw=0;const Fu=new Q,li=new Xn,Ot=new UA,fs=new Q,tr=new Q,Kw=new Q,zw=new Xn,bu=new Q(1,0,0),Tu=new Q(0,1,0),Qu=new Q(0,0,1),Ww={type:"added"},Xw={type:"removed"};class JA extends Yn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:kw++}),this.uuid=Wi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=JA.DEFAULT_UP.clone();const e=new Q,A=new ga,t=new Xn,i=new Q(1,1,1);function r(){t.setFromEuler(A,!1)}function s(){A.setFromQuaternion(t,void 0,!1)}A._onChange(r),t._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:A},quaternion:{configurable:!0,enumerable:!0,value:t},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new UA},normalMatrix:{value:new Ye}}),this.matrix=new UA,this.matrixWorld=new UA,this.matrixAutoUpdate=JA.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=JA.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new xl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,A){this.quaternion.setFromAxisAngle(e,A)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,A){return li.setFromAxisAngle(e,A),this.quaternion.multiply(li),this}rotateOnWorldAxis(e,A){return li.setFromAxisAngle(e,A),this.quaternion.premultiply(li),this}rotateX(e){return this.rotateOnAxis(bu,e)}rotateY(e){return this.rotateOnAxis(Tu,e)}rotateZ(e){return this.rotateOnAxis(Qu,e)}translateOnAxis(e,A){return Fu.copy(e).applyQuaternion(this.quaternion),this.position.add(Fu.multiplyScalar(A)),this}translateX(e){return this.translateOnAxis(bu,e)}translateY(e){return this.translateOnAxis(Tu,e)}translateZ(e){return this.translateOnAxis(Qu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ot.copy(this.matrixWorld).invert())}lookAt(e,A,t){e.isVector3?fs.copy(e):fs.set(e,A,t);const i=this.parent;this.updateWorldMatrix(!0,!1),tr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ot.lookAt(tr,fs,this.up):Ot.lookAt(fs,tr,this.up),this.quaternion.setFromRotationMatrix(Ot),i&&(Ot.extractRotation(i.matrixWorld),li.setFromRotationMatrix(Ot),this.quaternion.premultiply(li.invert()))}add(e){if(arguments.length>1){for(let A=0;A<arguments.length;A++)this.add(arguments[A]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Ww)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.remove(arguments[t]);return this}const A=this.children.indexOf(e);return A!==-1&&(e.parent=null,this.children.splice(A,1),e.dispatchEvent(Xw)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ot.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ot.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ot),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,A){if(this[e]===A)return this;for(let t=0,i=this.children.length;t<i;t++){const s=this.children[t].getObjectByProperty(e,A);if(s!==void 0)return s}}getObjectsByProperty(e,A,t=[]){this[e]===A&&t.push(this);const i=this.children;for(let r=0,s=i.length;r<s;r++)i[r].getObjectsByProperty(e,A,t);return t}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(tr,e,Kw),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(tr,zw,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const A=this.matrixWorld.elements;return e.set(A[8],A[9],A[10]).normalize()}raycast(){}traverse(e){e(this);const A=this.children;for(let t=0,i=A.length;t<i;t++)A[t].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const A=this.children;for(let t=0,i=A.length;t<i;t++)A[t].traverseVisible(e)}traverseAncestors(e){const A=this.parent;A!==null&&(e(A),A.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const A=this.children;for(let t=0,i=A.length;t<i;t++){const r=A[t];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,A){const t=this.parent;if(e===!0&&t!==null&&t.matrixWorldAutoUpdate===!0&&t.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),A===!0){const i=this.children;for(let r=0,s=i.length;r<s;r++){const a=i[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const A=e===void 0||typeof e=="string",t={};A&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},t.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,o){return a[o.uuid]===void 0&&(a[o.uuid]=o.toJSON(e)),o.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const o=a.shapes;if(Array.isArray(o))for(let l=0,c=o.length;l<c;l++){const u=o[l];r(e.shapes,u)}else r(e.shapes,o)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let o=0,l=this.material.length;o<l;o++)a.push(r(e.materials,this.material[o]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const o=this.animations[a];i.animations.push(r(e.animations,o))}}if(A){const a=s(e.geometries),o=s(e.materials),l=s(e.textures),c=s(e.images),u=s(e.shapes),h=s(e.skeletons),p=s(e.animations),g=s(e.nodes);a.length>0&&(t.geometries=a),o.length>0&&(t.materials=o),l.length>0&&(t.textures=l),c.length>0&&(t.images=c),u.length>0&&(t.shapes=u),h.length>0&&(t.skeletons=h),p.length>0&&(t.animations=p),g.length>0&&(t.nodes=g)}return t.object=i,t;function s(a){const o=[];for(const l in a){const c=a[l];delete c.metadata,o.push(c)}return o}}clone(e){return new this.constructor().copy(this,e)}copy(e,A=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),A===!0)for(let t=0;t<e.children.length;t++){const i=e.children[t];this.add(i.clone())}return this}}JA.DEFAULT_UP=new Q(0,1,0);JA.DEFAULT_MATRIX_AUTO_UPDATE=!0;JA.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ht=new Q,Nt=new Q,uo=new Q,Gt=new Q,ci=new Q,ui=new Q,Iu=new Q,ho=new Q,fo=new Q,po=new Q;class St{constructor(e=new Q,A=new Q,t=new Q){this.a=e,this.b=A,this.c=t}static getNormal(e,A,t,i){i.subVectors(t,A),ht.subVectors(e,A),i.cross(ht);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,A,t,i,r){ht.subVectors(i,A),Nt.subVectors(t,A),uo.subVectors(e,A);const s=ht.dot(ht),a=ht.dot(Nt),o=ht.dot(uo),l=Nt.dot(Nt),c=Nt.dot(uo),u=s*l-a*a;if(u===0)return r.set(0,0,0),null;const h=1/u,p=(l*o-a*c)*h,g=(s*c-a*o)*h;return r.set(1-p-g,g,p)}static containsPoint(e,A,t,i){return this.getBarycoord(e,A,t,i,Gt)===null?!1:Gt.x>=0&&Gt.y>=0&&Gt.x+Gt.y<=1}static getInterpolation(e,A,t,i,r,s,a,o){return this.getBarycoord(e,A,t,i,Gt)===null?(o.x=0,o.y=0,"z"in o&&(o.z=0),"w"in o&&(o.w=0),null):(o.setScalar(0),o.addScaledVector(r,Gt.x),o.addScaledVector(s,Gt.y),o.addScaledVector(a,Gt.z),o)}static isFrontFacing(e,A,t,i){return ht.subVectors(t,A),Nt.subVectors(e,A),ht.cross(Nt).dot(i)<0}set(e,A,t){return this.a.copy(e),this.b.copy(A),this.c.copy(t),this}setFromPointsAndIndices(e,A,t,i){return this.a.copy(e[A]),this.b.copy(e[t]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,A,t,i){return this.a.fromBufferAttribute(e,A),this.b.fromBufferAttribute(e,t),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ht.subVectors(this.c,this.b),Nt.subVectors(this.a,this.b),ht.cross(Nt).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return St.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,A){return St.getBarycoord(e,this.a,this.b,this.c,A)}getInterpolation(e,A,t,i,r){return St.getInterpolation(e,this.a,this.b,this.c,A,t,i,r)}containsPoint(e){return St.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return St.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,A){const t=this.a,i=this.b,r=this.c;let s,a;ci.subVectors(i,t),ui.subVectors(r,t),ho.subVectors(e,t);const o=ci.dot(ho),l=ui.dot(ho);if(o<=0&&l<=0)return A.copy(t);fo.subVectors(e,i);const c=ci.dot(fo),u=ui.dot(fo);if(c>=0&&u<=c)return A.copy(i);const h=o*u-c*l;if(h<=0&&o>=0&&c<=0)return s=o/(o-c),A.copy(t).addScaledVector(ci,s);po.subVectors(e,r);const p=ci.dot(po),g=ui.dot(po);if(g>=0&&p<=g)return A.copy(r);const m=p*l-o*g;if(m<=0&&l>=0&&g<=0)return a=l/(l-g),A.copy(t).addScaledVector(ui,a);const d=c*g-p*u;if(d<=0&&u-c>=0&&p-g>=0)return Iu.subVectors(r,i),a=(u-c)/(u-c+(p-g)),A.copy(i).addScaledVector(Iu,a);const f=1/(d+m+h);return s=m*f,a=h*f,A.copy(t).addScaledVector(ci,s).addScaledVector(ui,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const zf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},en={h:0,s:0,l:0},ds={h:0,s:0,l:0};function go(n,e,A){return A<0&&(A+=1),A>1&&(A-=1),A<1/6?n+(e-n)*6*A:A<1/2?e:A<2/3?n+(e-n)*6*(2/3-A):n}class AA{constructor(e,A,t){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,A,t)}set(e,A,t){if(A===void 0&&t===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,A,t);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,A=MA){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,nA.toWorkingColorSpace(this,A),this}setRGB(e,A,t,i=nA.workingColorSpace){return this.r=e,this.g=A,this.b=t,nA.toWorkingColorSpace(this,i),this}setHSL(e,A,t,i=nA.workingColorSpace){if(e=Cl(e,1),A=PA(A,0,1),t=PA(t,0,1),A===0)this.r=this.g=this.b=t;else{const r=t<=.5?t*(1+A):t+A-t*A,s=2*t-r;this.r=go(s,r,e+1/3),this.g=go(s,r,e),this.b=go(s,r,e-1/3)}return nA.toWorkingColorSpace(this,i),this}setStyle(e,A=MA){function t(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const s=i[1],a=i[2];switch(s){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return t(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,A);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return t(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,A);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return t(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,A);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],s=r.length;if(s===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,A);if(s===6)return this.setHex(parseInt(r,16),A);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,A);return this}setColorName(e,A=MA){const t=zf[e.toLowerCase()];return t!==void 0?this.setHex(t,A):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Fi(e.r),this.g=Fi(e.g),this.b=Fi(e.b),this}copyLinearToSRGB(e){return this.r=no(e.r),this.g=no(e.g),this.b=no(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=MA){return nA.fromWorkingColorSpace(IA.copy(this),e),Math.round(PA(IA.r*255,0,255))*65536+Math.round(PA(IA.g*255,0,255))*256+Math.round(PA(IA.b*255,0,255))}getHexString(e=MA){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,A=nA.workingColorSpace){nA.fromWorkingColorSpace(IA.copy(this),A);const t=IA.r,i=IA.g,r=IA.b,s=Math.max(t,i,r),a=Math.min(t,i,r);let o,l;const c=(a+s)/2;if(a===s)o=0,l=0;else{const u=s-a;switch(l=c<=.5?u/(s+a):u/(2-s-a),s){case t:o=(i-r)/u+(i<r?6:0);break;case i:o=(r-t)/u+2;break;case r:o=(t-i)/u+4;break}o/=6}return e.h=o,e.s=l,e.l=c,e}getRGB(e,A=nA.workingColorSpace){return nA.fromWorkingColorSpace(IA.copy(this),A),e.r=IA.r,e.g=IA.g,e.b=IA.b,e}getStyle(e=MA){nA.fromWorkingColorSpace(IA.copy(this),e);const A=IA.r,t=IA.g,i=IA.b;return e!==MA?`color(${e} ${A.toFixed(3)} ${t.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(A*255)},${Math.round(t*255)},${Math.round(i*255)})`}offsetHSL(e,A,t){return this.getHSL(en),this.setHSL(en.h+e,en.s+A,en.l+t)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,A){return this.r=e.r+A.r,this.g=e.g+A.g,this.b=e.b+A.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,A){return this.r+=(e.r-this.r)*A,this.g+=(e.g-this.g)*A,this.b+=(e.b-this.b)*A,this}lerpColors(e,A,t){return this.r=e.r+(A.r-e.r)*t,this.g=e.g+(A.g-e.g)*t,this.b=e.b+(A.b-e.b)*t,this}lerpHSL(e,A){this.getHSL(en),e.getHSL(ds);const t=Br(en.h,ds.h,A),i=Br(en.s,ds.s,A),r=Br(en.l,ds.l,A);return this.setHSL(t,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const A=this.r,t=this.g,i=this.b,r=e.elements;return this.r=r[0]*A+r[3]*t+r[6]*i,this.g=r[1]*A+r[4]*t+r[7]*i,this.b=r[2]*A+r[5]*t+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,A=0){return this.r=e[A],this.g=e[A+1],this.b=e[A+2],this}toArray(e=[],A=0){return e[A]=this.r,e[A+1]=this.g,e[A+2]=this.b,e}fromBufferAttribute(e,A){return this.r=e.getX(A),this.g=e.getY(A),this.b=e.getZ(A),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const IA=new AA;AA.NAMES=zf;let Yw=0;class Ir extends Yn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Yw++}),this.uuid=Wi(),this.name="",this.type="Material",this.blending=Si,this.side=wn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=el,this.blendDst=Al,this.blendEquation=bn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new AA(0,0,0),this.blendAlpha=0,this.depthFunc=Ws,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=_u,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ni,this.stencilZFail=ni,this.stencilZPass=ni,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const A in e){const t=e[A];if(t===void 0){console.warn(`THREE.Material: parameter '${A}' has value of undefined.`);continue}const i=this[A];if(i===void 0){console.warn(`THREE.Material: '${A}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(t):i&&i.isVector3&&t&&t.isVector3?i.copy(t):this[A]=t}}toJSON(e){const A=e===void 0||typeof e=="string";A&&(e={textures:{},images:{}});const t={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),this.color&&this.color.isColor&&(t.color=this.color.getHex()),this.roughness!==void 0&&(t.roughness=this.roughness),this.metalness!==void 0&&(t.metalness=this.metalness),this.sheen!==void 0&&(t.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(t.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(t.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(t.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(t.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(t.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(t.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(t.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(t.shininess=this.shininess),this.clearcoat!==void 0&&(t.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(t.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(t.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(t.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(t.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,t.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(t.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(t.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(t.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(t.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(t.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(t.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(t.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(t.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(t.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(t.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(t.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(t.lightMap=this.lightMap.toJSON(e).uuid,t.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(t.aoMap=this.aoMap.toJSON(e).uuid,t.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(t.bumpMap=this.bumpMap.toJSON(e).uuid,t.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(t.normalMap=this.normalMap.toJSON(e).uuid,t.normalMapType=this.normalMapType,t.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(t.displacementMap=this.displacementMap.toJSON(e).uuid,t.displacementScale=this.displacementScale,t.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(t.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(t.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(t.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(t.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(t.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(t.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(t.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(t.combine=this.combine)),this.envMapIntensity!==void 0&&(t.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(t.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(t.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(t.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(t.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(t.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(t.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(t.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(t.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(t.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(t.size=this.size),this.shadowSide!==null&&(t.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(t.sizeAttenuation=this.sizeAttenuation),this.blending!==Si&&(t.blending=this.blending),this.side!==wn&&(t.side=this.side),this.vertexColors===!0&&(t.vertexColors=!0),this.opacity<1&&(t.opacity=this.opacity),this.transparent===!0&&(t.transparent=!0),this.blendSrc!==el&&(t.blendSrc=this.blendSrc),this.blendDst!==Al&&(t.blendDst=this.blendDst),this.blendEquation!==bn&&(t.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(t.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(t.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(t.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(t.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(t.blendAlpha=this.blendAlpha),this.depthFunc!==Ws&&(t.depthFunc=this.depthFunc),this.depthTest===!1&&(t.depthTest=this.depthTest),this.depthWrite===!1&&(t.depthWrite=this.depthWrite),this.colorWrite===!1&&(t.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(t.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==_u&&(t.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(t.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(t.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ni&&(t.stencilFail=this.stencilFail),this.stencilZFail!==ni&&(t.stencilZFail=this.stencilZFail),this.stencilZPass!==ni&&(t.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(t.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(t.rotation=this.rotation),this.polygonOffset===!0&&(t.polygonOffset=!0),this.polygonOffsetFactor!==0&&(t.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(t.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(t.linewidth=this.linewidth),this.dashSize!==void 0&&(t.dashSize=this.dashSize),this.gapSize!==void 0&&(t.gapSize=this.gapSize),this.scale!==void 0&&(t.scale=this.scale),this.dithering===!0&&(t.dithering=!0),this.alphaTest>0&&(t.alphaTest=this.alphaTest),this.alphaHash===!0&&(t.alphaHash=!0),this.alphaToCoverage===!0&&(t.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(t.premultipliedAlpha=!0),this.forceSinglePass===!0&&(t.forceSinglePass=!0),this.wireframe===!0&&(t.wireframe=!0),this.wireframeLinewidth>1&&(t.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(t.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(t.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(t.flatShading=!0),this.visible===!1&&(t.visible=!1),this.toneMapped===!1&&(t.toneMapped=!1),this.fog===!1&&(t.fog=!1),Object.keys(this.userData).length>0&&(t.userData=this.userData);function i(r){const s=[];for(const a in r){const o=r[a];delete o.metadata,s.push(o)}return s}if(A){const r=i(e.textures),s=i(e.images);r.length>0&&(t.textures=r),s.length>0&&(t.images=s)}return t}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const A=e.clippingPlanes;let t=null;if(A!==null){const i=A.length;t=new Array(i);for(let r=0;r!==i;++r)t[r]=A[r].clone()}return this.clippingPlanes=t,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Ul extends Ir{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new AA(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=bf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const gA=new Q,ps=new Fe;class bt{constructor(e,A,t=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=A,this.count=e!==void 0?e.length/A:0,this.normalized=t,this.usage=wu,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Kt,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return Mi("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,A){this.updateRanges.push({start:e,count:A})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,A,t){e*=this.itemSize,t*=A.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=A.array[t+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let A=0,t=this.count;A<t;A++)ps.fromBufferAttribute(this,A),ps.applyMatrix3(e),this.setXY(A,ps.x,ps.y);else if(this.itemSize===3)for(let A=0,t=this.count;A<t;A++)gA.fromBufferAttribute(this,A),gA.applyMatrix3(e),this.setXYZ(A,gA.x,gA.y,gA.z);return this}applyMatrix4(e){for(let A=0,t=this.count;A<t;A++)gA.fromBufferAttribute(this,A),gA.applyMatrix4(e),this.setXYZ(A,gA.x,gA.y,gA.z);return this}applyNormalMatrix(e){for(let A=0,t=this.count;A<t;A++)gA.fromBufferAttribute(this,A),gA.applyNormalMatrix(e),this.setXYZ(A,gA.x,gA.y,gA.z);return this}transformDirection(e){for(let A=0,t=this.count;A<t;A++)gA.fromBufferAttribute(this,A),gA.transformDirection(e),this.setXYZ(A,gA.x,gA.y,gA.z);return this}set(e,A=0){return this.array.set(e,A),this}getComponent(e,A){let t=this.array[e*this.itemSize+A];return this.normalized&&(t=Ei(t,this.array)),t}setComponent(e,A,t){return this.normalized&&(t=NA(t,this.array)),this.array[e*this.itemSize+A]=t,this}getX(e){let A=this.array[e*this.itemSize];return this.normalized&&(A=Ei(A,this.array)),A}setX(e,A){return this.normalized&&(A=NA(A,this.array)),this.array[e*this.itemSize]=A,this}getY(e){let A=this.array[e*this.itemSize+1];return this.normalized&&(A=Ei(A,this.array)),A}setY(e,A){return this.normalized&&(A=NA(A,this.array)),this.array[e*this.itemSize+1]=A,this}getZ(e){let A=this.array[e*this.itemSize+2];return this.normalized&&(A=Ei(A,this.array)),A}setZ(e,A){return this.normalized&&(A=NA(A,this.array)),this.array[e*this.itemSize+2]=A,this}getW(e){let A=this.array[e*this.itemSize+3];return this.normalized&&(A=Ei(A,this.array)),A}setW(e,A){return this.normalized&&(A=NA(A,this.array)),this.array[e*this.itemSize+3]=A,this}setXY(e,A,t){return e*=this.itemSize,this.normalized&&(A=NA(A,this.array),t=NA(t,this.array)),this.array[e+0]=A,this.array[e+1]=t,this}setXYZ(e,A,t,i){return e*=this.itemSize,this.normalized&&(A=NA(A,this.array),t=NA(t,this.array),i=NA(i,this.array)),this.array[e+0]=A,this.array[e+1]=t,this.array[e+2]=i,this}setXYZW(e,A,t,i,r){return e*=this.itemSize,this.normalized&&(A=NA(A,this.array),t=NA(t,this.array),i=NA(i,this.array),r=NA(r,this.array)),this.array[e+0]=A,this.array[e+1]=t,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==wu&&(e.usage=this.usage),e}}class Wf extends bt{constructor(e,A,t){super(new Uint16Array(e),A,t)}}class Xf extends bt{constructor(e,A,t){super(new Uint32Array(e),A,t)}}class qA extends bt{constructor(e,A,t){super(new Float32Array(e),A,t)}}let Jw=0;const tt=new UA,mo=new JA,hi=new Q,$A=new Qr,nr=new Qr,CA=new Q;class It extends Yn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Jw++}),this.uuid=Wi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Gf(e)?Xf:Wf)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,A){return this.attributes[e]=A,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,A,t=0){this.groups.push({start:e,count:A,materialIndex:t})}clearGroups(){this.groups=[]}setDrawRange(e,A){this.drawRange.start=e,this.drawRange.count=A}applyMatrix4(e){const A=this.attributes.position;A!==void 0&&(A.applyMatrix4(e),A.needsUpdate=!0);const t=this.attributes.normal;if(t!==void 0){const r=new Ye().getNormalMatrix(e);t.applyNormalMatrix(r),t.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return tt.makeRotationFromQuaternion(e),this.applyMatrix4(tt),this}rotateX(e){return tt.makeRotationX(e),this.applyMatrix4(tt),this}rotateY(e){return tt.makeRotationY(e),this.applyMatrix4(tt),this}rotateZ(e){return tt.makeRotationZ(e),this.applyMatrix4(tt),this}translate(e,A,t){return tt.makeTranslation(e,A,t),this.applyMatrix4(tt),this}scale(e,A,t){return tt.makeScale(e,A,t),this.applyMatrix4(tt),this}lookAt(e){return mo.lookAt(e),mo.updateMatrix(),this.applyMatrix4(mo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(hi).negate(),this.translate(hi.x,hi.y,hi.z),this}setFromPoints(e){const A=[];for(let t=0,i=e.length;t<i;t++){const r=e[t];A.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new qA(A,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Qr);const e=this.attributes.position,A=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new Q(-1/0,-1/0,-1/0),new Q(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),A)for(let t=0,i=A.length;t<i;t++){const r=A[t];$A.setFromBufferAttribute(r),this.morphTargetsRelative?(CA.addVectors(this.boundingBox.min,$A.min),this.boundingBox.expandByPoint(CA),CA.addVectors(this.boundingBox.max,$A.max),this.boundingBox.expandByPoint(CA)):(this.boundingBox.expandByPoint($A.min),this.boundingBox.expandByPoint($A.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new da);const e=this.attributes.position,A=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new Q,1/0);return}if(e){const t=this.boundingSphere.center;if($A.setFromBufferAttribute(e),A)for(let r=0,s=A.length;r<s;r++){const a=A[r];nr.setFromBufferAttribute(a),this.morphTargetsRelative?(CA.addVectors($A.min,nr.min),$A.expandByPoint(CA),CA.addVectors($A.max,nr.max),$A.expandByPoint(CA)):($A.expandByPoint(nr.min),$A.expandByPoint(nr.max))}$A.getCenter(t);let i=0;for(let r=0,s=e.count;r<s;r++)CA.fromBufferAttribute(e,r),i=Math.max(i,t.distanceToSquared(CA));if(A)for(let r=0,s=A.length;r<s;r++){const a=A[r],o=this.morphTargetsRelative;for(let l=0,c=a.count;l<c;l++)CA.fromBufferAttribute(a,l),o&&(hi.fromBufferAttribute(e,l),CA.add(hi)),i=Math.max(i,t.distanceToSquared(CA))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,A=this.attributes;if(e===null||A.position===void 0||A.normal===void 0||A.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const t=e.array,i=A.position.array,r=A.normal.array,s=A.uv.array,a=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new bt(new Float32Array(4*a),4));const o=this.getAttribute("tangent").array,l=[],c=[];for(let B=0;B<a;B++)l[B]=new Q,c[B]=new Q;const u=new Q,h=new Q,p=new Q,g=new Fe,m=new Fe,d=new Fe,f=new Q,v=new Q;function w(B,M,K){u.fromArray(i,B*3),h.fromArray(i,M*3),p.fromArray(i,K*3),g.fromArray(s,B*2),m.fromArray(s,M*2),d.fromArray(s,K*2),h.sub(u),p.sub(u),m.sub(g),d.sub(g);const W=1/(m.x*d.y-d.x*m.y);isFinite(W)&&(f.copy(h).multiplyScalar(d.y).addScaledVector(p,-m.y).multiplyScalar(W),v.copy(p).multiplyScalar(m.x).addScaledVector(h,-d.x).multiplyScalar(W),l[B].add(f),l[M].add(f),l[K].add(f),c[B].add(v),c[M].add(v),c[K].add(v))}let C=this.groups;C.length===0&&(C=[{start:0,count:t.length}]);for(let B=0,M=C.length;B<M;++B){const K=C[B],W=K.start,T=K.count;for(let G=W,R=W+T;G<R;G+=3)w(t[G+0],t[G+1],t[G+2])}const b=new Q,U=new Q,S=new Q,H=new Q;function z(B){S.fromArray(r,B*3),H.copy(S);const M=l[B];b.copy(M),b.sub(S.multiplyScalar(S.dot(M))).normalize(),U.crossVectors(H,M);const W=U.dot(c[B])<0?-1:1;o[B*4]=b.x,o[B*4+1]=b.y,o[B*4+2]=b.z,o[B*4+3]=W}for(let B=0,M=C.length;B<M;++B){const K=C[B],W=K.start,T=K.count;for(let G=W,R=W+T;G<R;G+=3)z(t[G+0]),z(t[G+1]),z(t[G+2])}}computeVertexNormals(){const e=this.index,A=this.getAttribute("position");if(A!==void 0){let t=this.getAttribute("normal");if(t===void 0)t=new bt(new Float32Array(A.count*3),3),this.setAttribute("normal",t);else for(let h=0,p=t.count;h<p;h++)t.setXYZ(h,0,0,0);const i=new Q,r=new Q,s=new Q,a=new Q,o=new Q,l=new Q,c=new Q,u=new Q;if(e)for(let h=0,p=e.count;h<p;h+=3){const g=e.getX(h+0),m=e.getX(h+1),d=e.getX(h+2);i.fromBufferAttribute(A,g),r.fromBufferAttribute(A,m),s.fromBufferAttribute(A,d),c.subVectors(s,r),u.subVectors(i,r),c.cross(u),a.fromBufferAttribute(t,g),o.fromBufferAttribute(t,m),l.fromBufferAttribute(t,d),a.add(c),o.add(c),l.add(c),t.setXYZ(g,a.x,a.y,a.z),t.setXYZ(m,o.x,o.y,o.z),t.setXYZ(d,l.x,l.y,l.z)}else for(let h=0,p=A.count;h<p;h+=3)i.fromBufferAttribute(A,h+0),r.fromBufferAttribute(A,h+1),s.fromBufferAttribute(A,h+2),c.subVectors(s,r),u.subVectors(i,r),c.cross(u),t.setXYZ(h+0,c.x,c.y,c.z),t.setXYZ(h+1,c.x,c.y,c.z),t.setXYZ(h+2,c.x,c.y,c.z);this.normalizeNormals(),t.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let A=0,t=e.count;A<t;A++)CA.fromBufferAttribute(e,A),CA.normalize(),e.setXYZ(A,CA.x,CA.y,CA.z)}toNonIndexed(){function e(a,o){const l=a.array,c=a.itemSize,u=a.normalized,h=new l.constructor(o.length*c);let p=0,g=0;for(let m=0,d=o.length;m<d;m++){a.isInterleavedBufferAttribute?p=o[m]*a.data.stride+a.offset:p=o[m]*c;for(let f=0;f<c;f++)h[g++]=l[p++]}return new bt(h,c,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const A=new It,t=this.index.array,i=this.attributes;for(const a in i){const o=i[a],l=e(o,t);A.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const o=[],l=r[a];for(let c=0,u=l.length;c<u;c++){const h=l[c],p=e(h,t);o.push(p)}A.morphAttributes[a]=o}A.morphTargetsRelative=this.morphTargetsRelative;const s=this.groups;for(let a=0,o=s.length;a<o;a++){const l=s[a];A.addGroup(l.start,l.count,l.materialIndex)}return A}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const o=this.parameters;for(const l in o)o[l]!==void 0&&(e[l]=o[l]);return e}e.data={attributes:{}};const A=this.index;A!==null&&(e.data.index={type:A.array.constructor.name,array:Array.prototype.slice.call(A.array)});const t=this.attributes;for(const o in t){const l=t[o];e.data.attributes[o]=l.toJSON(e.data)}const i={};let r=!1;for(const o in this.morphAttributes){const l=this.morphAttributes[o],c=[];for(let u=0,h=l.length;u<h;u++){const p=l[u];c.push(p.toJSON(e.data))}c.length>0&&(i[o]=c,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const A={};this.name=e.name;const t=e.index;t!==null&&this.setIndex(t.clone(A));const i=e.attributes;for(const l in i){const c=i[l];this.setAttribute(l,c.clone(A))}const r=e.morphAttributes;for(const l in r){const c=[],u=r[l];for(let h=0,p=u.length;h<p;h++)c.push(u[h].clone(A));this.morphAttributes[l]=c}this.morphTargetsRelative=e.morphTargetsRelative;const s=e.groups;for(let l=0,c=s.length;l<c;l++){const u=s[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const o=e.boundingSphere;return o!==null&&(this.boundingSphere=o.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Lu=new UA,yn=new pa,gs=new da,Ru=new Q,fi=new Q,di=new Q,pi=new Q,Bo=new Q,ms=new Q,Bs=new Fe,_s=new Fe,ws=new Fe,Du=new Q,Hu=new Q,Pu=new Q,vs=new Q,Es=new Q;class _t extends JA{constructor(e=new It,A=new Ul){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=A,this.updateMorphTargets()}copy(e,A){return super.copy(e,A),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const A=this.geometry.morphAttributes,t=Object.keys(A);if(t.length>0){const i=A[t[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=i.length;r<s;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,A){const t=this.geometry,i=t.attributes.position,r=t.morphAttributes.position,s=t.morphTargetsRelative;A.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(r&&a){ms.set(0,0,0);for(let o=0,l=r.length;o<l;o++){const c=a[o],u=r[o];c!==0&&(Bo.fromBufferAttribute(u,e),s?ms.addScaledVector(Bo,c):ms.addScaledVector(Bo.sub(A),c))}A.add(ms)}return A}raycast(e,A){const t=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(t.boundingSphere===null&&t.computeBoundingSphere(),gs.copy(t.boundingSphere),gs.applyMatrix4(r),yn.copy(e.ray).recast(e.near),!(gs.containsPoint(yn.origin)===!1&&(yn.intersectSphere(gs,Ru)===null||yn.origin.distanceToSquared(Ru)>(e.far-e.near)**2))&&(Lu.copy(r).invert(),yn.copy(e.ray).applyMatrix4(Lu),!(t.boundingBox!==null&&yn.intersectsBox(t.boundingBox)===!1)&&this._computeIntersections(e,A,yn)))}_computeIntersections(e,A,t){let i;const r=this.geometry,s=this.material,a=r.index,o=r.attributes.position,l=r.attributes.uv,c=r.attributes.uv1,u=r.attributes.normal,h=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(s))for(let g=0,m=h.length;g<m;g++){const d=h[g],f=s[d.materialIndex],v=Math.max(d.start,p.start),w=Math.min(a.count,Math.min(d.start+d.count,p.start+p.count));for(let C=v,b=w;C<b;C+=3){const U=a.getX(C),S=a.getX(C+1),H=a.getX(C+2);i=Cs(this,f,e,t,l,c,u,U,S,H),i&&(i.faceIndex=Math.floor(C/3),i.face.materialIndex=d.materialIndex,A.push(i))}}else{const g=Math.max(0,p.start),m=Math.min(a.count,p.start+p.count);for(let d=g,f=m;d<f;d+=3){const v=a.getX(d),w=a.getX(d+1),C=a.getX(d+2);i=Cs(this,s,e,t,l,c,u,v,w,C),i&&(i.faceIndex=Math.floor(d/3),A.push(i))}}else if(o!==void 0)if(Array.isArray(s))for(let g=0,m=h.length;g<m;g++){const d=h[g],f=s[d.materialIndex],v=Math.max(d.start,p.start),w=Math.min(o.count,Math.min(d.start+d.count,p.start+p.count));for(let C=v,b=w;C<b;C+=3){const U=C,S=C+1,H=C+2;i=Cs(this,f,e,t,l,c,u,U,S,H),i&&(i.faceIndex=Math.floor(C/3),i.face.materialIndex=d.materialIndex,A.push(i))}}else{const g=Math.max(0,p.start),m=Math.min(o.count,p.start+p.count);for(let d=g,f=m;d<f;d+=3){const v=d,w=d+1,C=d+2;i=Cs(this,s,e,t,l,c,u,v,w,C),i&&(i.faceIndex=Math.floor(d/3),A.push(i))}}}}function qw(n,e,A,t,i,r,s,a){let o;if(e.side===XA?o=t.intersectTriangle(s,r,i,!0,a):o=t.intersectTriangle(i,r,s,e.side===wn,a),o===null)return null;Es.copy(a),Es.applyMatrix4(n.matrixWorld);const l=A.ray.origin.distanceTo(Es);return l<A.near||l>A.far?null:{distance:l,point:Es.clone(),object:n}}function Cs(n,e,A,t,i,r,s,a,o,l){n.getVertexPosition(a,fi),n.getVertexPosition(o,di),n.getVertexPosition(l,pi);const c=qw(n,e,A,t,fi,di,pi,vs);if(c){i&&(Bs.fromBufferAttribute(i,a),_s.fromBufferAttribute(i,o),ws.fromBufferAttribute(i,l),c.uv=St.getInterpolation(vs,fi,di,pi,Bs,_s,ws,new Fe)),r&&(Bs.fromBufferAttribute(r,a),_s.fromBufferAttribute(r,o),ws.fromBufferAttribute(r,l),c.uv1=St.getInterpolation(vs,fi,di,pi,Bs,_s,ws,new Fe),c.uv2=c.uv1),s&&(Du.fromBufferAttribute(s,a),Hu.fromBufferAttribute(s,o),Pu.fromBufferAttribute(s,l),c.normal=St.getInterpolation(vs,fi,di,pi,Du,Hu,Pu,new Q),c.normal.dot(t.direction)>0&&c.normal.multiplyScalar(-1));const u={a,b:o,c:l,normal:new Q,materialIndex:0};St.getNormal(fi,di,pi,u.normal),c.face=u}return c}class Lr extends It{constructor(e=1,A=1,t=1,i=1,r=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:A,depth:t,widthSegments:i,heightSegments:r,depthSegments:s};const a=this;i=Math.floor(i),r=Math.floor(r),s=Math.floor(s);const o=[],l=[],c=[],u=[];let h=0,p=0;g("z","y","x",-1,-1,t,A,e,s,r,0),g("z","y","x",1,-1,t,A,-e,s,r,1),g("x","z","y",1,1,e,t,A,i,s,2),g("x","z","y",1,-1,e,t,-A,i,s,3),g("x","y","z",1,-1,e,A,t,i,r,4),g("x","y","z",-1,-1,e,A,-t,i,r,5),this.setIndex(o),this.setAttribute("position",new qA(l,3)),this.setAttribute("normal",new qA(c,3)),this.setAttribute("uv",new qA(u,2));function g(m,d,f,v,w,C,b,U,S,H,z){const B=C/S,M=b/H,K=C/2,W=b/2,T=U/2,G=S+1,R=H+1;let Y=0,X=0;const J=new Q;for(let q=0;q<R;q++){const Ae=q*M-W;for(let ae=0;ae<G;ae++){const ve=ae*B-K;J[m]=ve*v,J[d]=Ae*w,J[f]=T,l.push(J.x,J.y,J.z),J[m]=0,J[d]=0,J[f]=U>0?1:-1,c.push(J.x,J.y,J.z),u.push(ae/S),u.push(1-q/H),Y+=1}}for(let q=0;q<H;q++)for(let Ae=0;Ae<S;Ae++){const ae=h+Ae+G*q,ve=h+Ae+G*(q+1),N=h+(Ae+1)+G*(q+1),Z=h+(Ae+1)+G*q;o.push(ae,ve,Z),o.push(ve,N,Z),X+=6}a.addGroup(p,X,z),p+=X,h+=Y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Lr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ki(n){const e={};for(const A in n){e[A]={};for(const t in n[A]){const i=n[A][t];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[A][t]=null):e[A][t]=i.clone():Array.isArray(i)?e[A][t]=i.slice():e[A][t]=i}}return e}function GA(n){const e={};for(let A=0;A<n.length;A++){const t=Ki(n[A]);for(const i in t)e[i]=t[i]}return e}function Zw(n){const e=[];for(let A=0;A<n.length;A++)e.push(n[A].clone());return e}function Yf(n){return n.getRenderTarget()===null?n.outputColorSpace:nA.workingColorSpace}const jw={clone:Ki,merge:GA};var $w=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ev=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Jt extends Ir{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=$w,this.fragmentShader=ev,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ki(e.uniforms),this.uniformsGroups=Zw(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const A=super.toJSON(e);A.glslVersion=this.glslVersion,A.uniforms={};for(const i in this.uniforms){const s=this.uniforms[i].value;s&&s.isTexture?A.uniforms[i]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?A.uniforms[i]={type:"c",value:s.getHex()}:s&&s.isVector2?A.uniforms[i]={type:"v2",value:s.toArray()}:s&&s.isVector3?A.uniforms[i]={type:"v3",value:s.toArray()}:s&&s.isVector4?A.uniforms[i]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?A.uniforms[i]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?A.uniforms[i]={type:"m4",value:s.toArray()}:A.uniforms[i]={value:s}}Object.keys(this.defines).length>0&&(A.defines=this.defines),A.vertexShader=this.vertexShader,A.fragmentShader=this.fragmentShader,A.lights=this.lights,A.clipping=this.clipping;const t={};for(const i in this.extensions)this.extensions[i]===!0&&(t[i]=!0);return Object.keys(t).length>0&&(A.extensions=t),A}}class Jf extends JA{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new UA,this.projectionMatrix=new UA,this.projectionMatrixInverse=new UA,this.coordinateSystem=zt}copy(e,A){return super.copy(e,A),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,A){super.updateWorldMatrix(e,A),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const An=new Q,Ou=new Fe,Nu=new Fe;class st extends Jf{constructor(e=50,A=1,t=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=t,this.far=i,this.focus=10,this.aspect=A,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,A){return super.copy(e,A),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const A=.5*this.getFilmHeight()/e;this.fov=Ur*2*Math.atan(A),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(mr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ur*2*Math.atan(Math.tan(mr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,A,t){An.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),A.set(An.x,An.y).multiplyScalar(-e/An.z),An.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(An.x,An.y).multiplyScalar(-e/An.z)}getViewSize(e,A){return this.getViewBounds(e,Ou,Nu),A.subVectors(Nu,Ou)}setViewOffset(e,A,t,i,r,s){this.aspect=e/A,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=A,this.view.offsetX=t,this.view.offsetY=i,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let A=e*Math.tan(mr*.5*this.fov)/this.zoom,t=2*A,i=this.aspect*t,r=-.5*i;const s=this.view;if(this.view!==null&&this.view.enabled){const o=s.fullWidth,l=s.fullHeight;r+=s.offsetX*i/o,A-=s.offsetY*t/l,i*=s.width/o,t*=s.height/l}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,A,A-t,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const A=super.toJSON(e);return A.object.fov=this.fov,A.object.zoom=this.zoom,A.object.near=this.near,A.object.far=this.far,A.object.focus=this.focus,A.object.aspect=this.aspect,this.view!==null&&(A.object.view=Object.assign({},this.view)),A.object.filmGauge=this.filmGauge,A.object.filmOffset=this.filmOffset,A}}const gi=-90,mi=1;class Av extends JA{constructor(e,A,t){super(),this.type="CubeCamera",this.renderTarget=t,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new st(gi,mi,e,A);i.layers=this.layers,this.add(i);const r=new st(gi,mi,e,A);r.layers=this.layers,this.add(r);const s=new st(gi,mi,e,A);s.layers=this.layers,this.add(s);const a=new st(gi,mi,e,A);a.layers=this.layers,this.add(a);const o=new st(gi,mi,e,A);o.layers=this.layers,this.add(o);const l=new st(gi,mi,e,A);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,A=this.children.concat(),[t,i,r,s,a,o]=A;for(const l of A)this.remove(l);if(e===zt)t.up.set(0,1,0),t.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),o.up.set(0,1,0),o.lookAt(0,0,-1);else if(e===qs)t.up.set(0,-1,0),t.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),o.up.set(0,-1,0),o.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of A)this.add(l),l.updateMatrixWorld()}update(e,A){this.parent===null&&this.updateMatrixWorld();const{renderTarget:t,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,s,a,o,l,c]=this.children,u=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const m=t.texture.generateMipmaps;t.texture.generateMipmaps=!1,e.setRenderTarget(t,0,i),e.render(A,r),e.setRenderTarget(t,1,i),e.render(A,s),e.setRenderTarget(t,2,i),e.render(A,a),e.setRenderTarget(t,3,i),e.render(A,o),e.setRenderTarget(t,4,i),e.render(A,l),t.texture.generateMipmaps=m,e.setRenderTarget(t,5,i),e.render(A,c),e.setRenderTarget(u,h,p),e.xr.enabled=g,t.texture.needsPMREMUpdate=!0}}class qf extends YA{constructor(e,A,t,i,r,s,a,o,l,c){e=e!==void 0?e:[],A=A!==void 0?A:Gi,super(e,A,t,i,r,s,a,o,l,c),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class tv extends Wn{constructor(e=1,A={}){super(e,e,A),this.isWebGLCubeRenderTarget=!0;const t={width:e,height:e,depth:1},i=[t,t,t,t,t,t];A.encoding!==void 0&&(Mi("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),A.colorSpace=A.encoding===zn?MA:at),this.texture=new qf(i,A.mapping,A.wrapS,A.wrapT,A.magFilter,A.minFilter,A.format,A.type,A.anisotropy,A.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=A.generateMipmaps!==void 0?A.generateMipmaps:!1,this.texture.minFilter=A.minFilter!==void 0?A.minFilter:zA}fromEquirectangularTexture(e,A){this.texture.type=A.type,this.texture.colorSpace=A.colorSpace,this.texture.generateMipmaps=A.generateMipmaps,this.texture.minFilter=A.minFilter,this.texture.magFilter=A.magFilter;const t={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Lr(5,5,5),r=new Jt({name:"CubemapFromEquirect",uniforms:Ki(t.uniforms),vertexShader:t.vertexShader,fragmentShader:t.fragmentShader,side:XA,blending:pn});r.uniforms.tEquirect.value=A;const s=new _t(i,r),a=A.minFilter;return A.minFilter===In&&(A.minFilter=zA),new Av(1,10,this).update(e,s),A.minFilter=a,s.geometry.dispose(),s.material.dispose(),this}clear(e,A,t,i){const r=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(A,t,i);e.setRenderTarget(r)}}const _o=new Q,nv=new Q,iv=new Ye;class sn{constructor(e=new Q(1,0,0),A=0){this.isPlane=!0,this.normal=e,this.constant=A}set(e,A){return this.normal.copy(e),this.constant=A,this}setComponents(e,A,t,i){return this.normal.set(e,A,t),this.constant=i,this}setFromNormalAndCoplanarPoint(e,A){return this.normal.copy(e),this.constant=-A.dot(this.normal),this}setFromCoplanarPoints(e,A,t){const i=_o.subVectors(t,A).cross(nv.subVectors(e,A)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,A){return A.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,A){const t=e.delta(_o),i=this.normal.dot(t);if(i===0)return this.distanceToPoint(e.start)===0?A.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:A.copy(e.start).addScaledVector(t,r)}intersectsLine(e){const A=this.distanceToPoint(e.start),t=this.distanceToPoint(e.end);return A<0&&t>0||t<0&&A>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,A){const t=A||iv.getNormalMatrix(e),i=this.coplanarPoint(_o).applyMatrix4(e),r=this.normal.applyMatrix3(t).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Sn=new da,xs=new Q;class Zf{constructor(e=new sn,A=new sn,t=new sn,i=new sn,r=new sn,s=new sn){this.planes=[e,A,t,i,r,s]}set(e,A,t,i,r,s){const a=this.planes;return a[0].copy(e),a[1].copy(A),a[2].copy(t),a[3].copy(i),a[4].copy(r),a[5].copy(s),this}copy(e){const A=this.planes;for(let t=0;t<6;t++)A[t].copy(e.planes[t]);return this}setFromProjectionMatrix(e,A=zt){const t=this.planes,i=e.elements,r=i[0],s=i[1],a=i[2],o=i[3],l=i[4],c=i[5],u=i[6],h=i[7],p=i[8],g=i[9],m=i[10],d=i[11],f=i[12],v=i[13],w=i[14],C=i[15];if(t[0].setComponents(o-r,h-l,d-p,C-f).normalize(),t[1].setComponents(o+r,h+l,d+p,C+f).normalize(),t[2].setComponents(o+s,h+c,d+g,C+v).normalize(),t[3].setComponents(o-s,h-c,d-g,C-v).normalize(),t[4].setComponents(o-a,h-u,d-m,C-w).normalize(),A===zt)t[5].setComponents(o+a,h+u,d+m,C+w).normalize();else if(A===qs)t[5].setComponents(a,u,m,w).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+A);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Sn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const A=e.geometry;A.boundingSphere===null&&A.computeBoundingSphere(),Sn.copy(A.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Sn)}intersectsSprite(e){return Sn.center.set(0,0,0),Sn.radius=.7071067811865476,Sn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Sn)}intersectsSphere(e){const A=this.planes,t=e.center,i=-e.radius;for(let r=0;r<6;r++)if(A[r].distanceToPoint(t)<i)return!1;return!0}intersectsBox(e){const A=this.planes;for(let t=0;t<6;t++){const i=A[t];if(xs.x=i.normal.x>0?e.max.x:e.min.x,xs.y=i.normal.y>0?e.max.y:e.min.y,xs.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(xs)<0)return!1}return!0}containsPoint(e){const A=this.planes;for(let t=0;t<6;t++)if(A[t].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function jf(){let n=null,e=!1,A=null,t=null;function i(r,s){A(r,s),t=n.requestAnimationFrame(i)}return{start:function(){e!==!0&&A!==null&&(t=n.requestAnimationFrame(i),e=!0)},stop:function(){n.cancelAnimationFrame(t),e=!1},setAnimationLoop:function(r){A=r},setContext:function(r){n=r}}}function rv(n,e){const A=e.isWebGL2,t=new WeakMap;function i(l,c){const u=l.array,h=l.usage,p=u.byteLength,g=n.createBuffer();n.bindBuffer(c,g),n.bufferData(c,u,h),l.onUploadCallback();let m;if(u instanceof Float32Array)m=n.FLOAT;else if(u instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(A)m=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else m=n.UNSIGNED_SHORT;else if(u instanceof Int16Array)m=n.SHORT;else if(u instanceof Uint32Array)m=n.UNSIGNED_INT;else if(u instanceof Int32Array)m=n.INT;else if(u instanceof Int8Array)m=n.BYTE;else if(u instanceof Uint8Array)m=n.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)m=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:g,type:m,bytesPerElement:u.BYTES_PER_ELEMENT,version:l.version,size:p}}function r(l,c,u){const h=c.array,p=c._updateRange,g=c.updateRanges;if(n.bindBuffer(u,l),p.count===-1&&g.length===0&&n.bufferSubData(u,0,h),g.length!==0){for(let m=0,d=g.length;m<d;m++){const f=g[m];A?n.bufferSubData(u,f.start*h.BYTES_PER_ELEMENT,h,f.start,f.count):n.bufferSubData(u,f.start*h.BYTES_PER_ELEMENT,h.subarray(f.start,f.start+f.count))}c.clearUpdateRanges()}p.count!==-1&&(A?n.bufferSubData(u,p.offset*h.BYTES_PER_ELEMENT,h,p.offset,p.count):n.bufferSubData(u,p.offset*h.BYTES_PER_ELEMENT,h.subarray(p.offset,p.offset+p.count)),p.count=-1),c.onUploadCallback()}function s(l){return l.isInterleavedBufferAttribute&&(l=l.data),t.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);const c=t.get(l);c&&(n.deleteBuffer(c.buffer),t.delete(l))}function o(l,c){if(l.isGLBufferAttribute){const h=t.get(l);(!h||h.version<l.version)&&t.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);const u=t.get(l);if(u===void 0)t.set(l,i(l,c));else if(u.version<l.version){if(u.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(u.buffer,l,c),u.version=l.version}}return{get:s,remove:a,update:o}}class ma extends It{constructor(e=1,A=1,t=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:A,widthSegments:t,heightSegments:i};const r=e/2,s=A/2,a=Math.floor(t),o=Math.floor(i),l=a+1,c=o+1,u=e/a,h=A/o,p=[],g=[],m=[],d=[];for(let f=0;f<c;f++){const v=f*h-s;for(let w=0;w<l;w++){const C=w*u-r;g.push(C,-v,0),m.push(0,0,1),d.push(w/a),d.push(1-f/o)}}for(let f=0;f<o;f++)for(let v=0;v<a;v++){const w=v+l*f,C=v+l*(f+1),b=v+1+l*(f+1),U=v+1+l*f;p.push(w,C,U),p.push(C,b,U)}this.setIndex(p),this.setAttribute("position",new qA(g,3)),this.setAttribute("normal",new qA(m,3)),this.setAttribute("uv",new qA(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ma(e.width,e.height,e.widthSegments,e.heightSegments)}}var sv=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,av=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,ov=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,lv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,cv=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,uv=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,hv=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,fv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,dv=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,pv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,gv=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,mv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Bv=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,_v=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,wv=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,vv=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Ev=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Cv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,xv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Uv=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,yv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Sv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Mv=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Fv=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,bv=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Tv=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Qv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Iv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Lv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Rv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Dv="gl_FragColor = linearToOutputTexel( gl_FragColor );",Hv=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,Pv=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Ov=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Nv=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Gv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Vv=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,kv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Kv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,zv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Wv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Xv=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Yv=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Jv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,qv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Zv=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,jv=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,$v=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,eE=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,AE=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,tE=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,nE=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,iE=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,rE=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,sE=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,aE=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,oE=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lE=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,cE=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,uE=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,hE=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,fE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,dE=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,pE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,gE=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,mE=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,BE=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,_E=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,wE=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,vE=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,EE=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,CE=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,xE=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,UE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,yE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,SE=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ME=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,FE=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,bE=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,TE=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,QE=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,IE=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,LE=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,RE=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,DE=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,HE=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,PE=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,OE=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,NE=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,GE=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,VE=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,kE=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,KE=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,zE=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,WE=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,XE=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,YE=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,JE=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,qE=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ZE=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,jE=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,$E=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,eC=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,AC=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,tC=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,nC=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,iC=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const rC=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,sC=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,aC=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,oC=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lC=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cC=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,uC=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,hC=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,fC=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,dC=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,pC=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,gC=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mC=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,BC=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,_C=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,wC=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vC=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,EC=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,CC=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,xC=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,UC=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,yC=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,SC=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,MC=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,FC=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,bC=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,TC=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,QC=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,IC=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,LC=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,RC=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,DC=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,HC=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,PC=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ke={alphahash_fragment:sv,alphahash_pars_fragment:av,alphamap_fragment:ov,alphamap_pars_fragment:lv,alphatest_fragment:cv,alphatest_pars_fragment:uv,aomap_fragment:hv,aomap_pars_fragment:fv,batching_pars_vertex:dv,batching_vertex:pv,begin_vertex:gv,beginnormal_vertex:mv,bsdfs:Bv,iridescence_fragment:_v,bumpmap_pars_fragment:wv,clipping_planes_fragment:vv,clipping_planes_pars_fragment:Ev,clipping_planes_pars_vertex:Cv,clipping_planes_vertex:xv,color_fragment:Uv,color_pars_fragment:yv,color_pars_vertex:Sv,color_vertex:Mv,common:Fv,cube_uv_reflection_fragment:bv,defaultnormal_vertex:Tv,displacementmap_pars_vertex:Qv,displacementmap_vertex:Iv,emissivemap_fragment:Lv,emissivemap_pars_fragment:Rv,colorspace_fragment:Dv,colorspace_pars_fragment:Hv,envmap_fragment:Pv,envmap_common_pars_fragment:Ov,envmap_pars_fragment:Nv,envmap_pars_vertex:Gv,envmap_physical_pars_fragment:$v,envmap_vertex:Vv,fog_vertex:kv,fog_pars_vertex:Kv,fog_fragment:zv,fog_pars_fragment:Wv,gradientmap_pars_fragment:Xv,lightmap_fragment:Yv,lightmap_pars_fragment:Jv,lights_lambert_fragment:qv,lights_lambert_pars_fragment:Zv,lights_pars_begin:jv,lights_toon_fragment:eE,lights_toon_pars_fragment:AE,lights_phong_fragment:tE,lights_phong_pars_fragment:nE,lights_physical_fragment:iE,lights_physical_pars_fragment:rE,lights_fragment_begin:sE,lights_fragment_maps:aE,lights_fragment_end:oE,logdepthbuf_fragment:lE,logdepthbuf_pars_fragment:cE,logdepthbuf_pars_vertex:uE,logdepthbuf_vertex:hE,map_fragment:fE,map_pars_fragment:dE,map_particle_fragment:pE,map_particle_pars_fragment:gE,metalnessmap_fragment:mE,metalnessmap_pars_fragment:BE,morphcolor_vertex:_E,morphnormal_vertex:wE,morphtarget_pars_vertex:vE,morphtarget_vertex:EE,normal_fragment_begin:CE,normal_fragment_maps:xE,normal_pars_fragment:UE,normal_pars_vertex:yE,normal_vertex:SE,normalmap_pars_fragment:ME,clearcoat_normal_fragment_begin:FE,clearcoat_normal_fragment_maps:bE,clearcoat_pars_fragment:TE,iridescence_pars_fragment:QE,opaque_fragment:IE,packing:LE,premultiplied_alpha_fragment:RE,project_vertex:DE,dithering_fragment:HE,dithering_pars_fragment:PE,roughnessmap_fragment:OE,roughnessmap_pars_fragment:NE,shadowmap_pars_fragment:GE,shadowmap_pars_vertex:VE,shadowmap_vertex:kE,shadowmask_pars_fragment:KE,skinbase_vertex:zE,skinning_pars_vertex:WE,skinning_vertex:XE,skinnormal_vertex:YE,specularmap_fragment:JE,specularmap_pars_fragment:qE,tonemapping_fragment:ZE,tonemapping_pars_fragment:jE,transmission_fragment:$E,transmission_pars_fragment:eC,uv_pars_fragment:AC,uv_pars_vertex:tC,uv_vertex:nC,worldpos_vertex:iC,background_vert:rC,background_frag:sC,backgroundCube_vert:aC,backgroundCube_frag:oC,cube_vert:lC,cube_frag:cC,depth_vert:uC,depth_frag:hC,distanceRGBA_vert:fC,distanceRGBA_frag:dC,equirect_vert:pC,equirect_frag:gC,linedashed_vert:mC,linedashed_frag:BC,meshbasic_vert:_C,meshbasic_frag:wC,meshlambert_vert:vC,meshlambert_frag:EC,meshmatcap_vert:CC,meshmatcap_frag:xC,meshnormal_vert:UC,meshnormal_frag:yC,meshphong_vert:SC,meshphong_frag:MC,meshphysical_vert:FC,meshphysical_frag:bC,meshtoon_vert:TC,meshtoon_frag:QC,points_vert:IC,points_frag:LC,shadow_vert:RC,shadow_frag:DC,sprite_vert:HC,sprite_frag:PC},le={common:{diffuse:{value:new AA(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ye}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ye}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ye}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ye},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ye},normalScale:{value:new Fe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ye},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ye}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ye}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ye}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new AA(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new AA(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0},uvTransform:{value:new Ye}},sprite:{diffuse:{value:new AA(16777215)},opacity:{value:1},center:{value:new Fe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}}},yt={basic:{uniforms:GA([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.fog]),vertexShader:ke.meshbasic_vert,fragmentShader:ke.meshbasic_frag},lambert:{uniforms:GA([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new AA(0)}}]),vertexShader:ke.meshlambert_vert,fragmentShader:ke.meshlambert_frag},phong:{uniforms:GA([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new AA(0)},specular:{value:new AA(1118481)},shininess:{value:30}}]),vertexShader:ke.meshphong_vert,fragmentShader:ke.meshphong_frag},standard:{uniforms:GA([le.common,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.roughnessmap,le.metalnessmap,le.fog,le.lights,{emissive:{value:new AA(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag},toon:{uniforms:GA([le.common,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.gradientmap,le.fog,le.lights,{emissive:{value:new AA(0)}}]),vertexShader:ke.meshtoon_vert,fragmentShader:ke.meshtoon_frag},matcap:{uniforms:GA([le.common,le.bumpmap,le.normalmap,le.displacementmap,le.fog,{matcap:{value:null}}]),vertexShader:ke.meshmatcap_vert,fragmentShader:ke.meshmatcap_frag},points:{uniforms:GA([le.points,le.fog]),vertexShader:ke.points_vert,fragmentShader:ke.points_frag},dashed:{uniforms:GA([le.common,le.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ke.linedashed_vert,fragmentShader:ke.linedashed_frag},depth:{uniforms:GA([le.common,le.displacementmap]),vertexShader:ke.depth_vert,fragmentShader:ke.depth_frag},normal:{uniforms:GA([le.common,le.bumpmap,le.normalmap,le.displacementmap,{opacity:{value:1}}]),vertexShader:ke.meshnormal_vert,fragmentShader:ke.meshnormal_frag},sprite:{uniforms:GA([le.sprite,le.fog]),vertexShader:ke.sprite_vert,fragmentShader:ke.sprite_frag},background:{uniforms:{uvTransform:{value:new Ye},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ke.background_vert,fragmentShader:ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:ke.backgroundCube_vert,fragmentShader:ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ke.cube_vert,fragmentShader:ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ke.equirect_vert,fragmentShader:ke.equirect_frag},distanceRGBA:{uniforms:GA([le.common,le.displacementmap,{referencePosition:{value:new Q},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ke.distanceRGBA_vert,fragmentShader:ke.distanceRGBA_frag},shadow:{uniforms:GA([le.lights,le.fog,{color:{value:new AA(0)},opacity:{value:1}}]),vertexShader:ke.shadow_vert,fragmentShader:ke.shadow_frag}};yt.physical={uniforms:GA([yt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ye},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ye},clearcoatNormalScale:{value:new Fe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ye},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ye},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ye},sheen:{value:0},sheenColor:{value:new AA(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ye},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ye},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ye},transmissionSamplerSize:{value:new Fe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ye},attenuationDistance:{value:0},attenuationColor:{value:new AA(0)},specularColor:{value:new AA(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ye},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ye},anisotropyVector:{value:new Fe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ye}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag};const Us={r:0,b:0,g:0};function OC(n,e,A,t,i,r,s){const a=new AA(0);let o=r===!0?0:1,l,c,u=null,h=0,p=null;function g(d,f){let v=!1,w=f.isScene===!0?f.background:null;w&&w.isTexture&&(w=(f.backgroundBlurriness>0?A:e).get(w)),w===null?m(a,o):w&&w.isColor&&(m(w,1),v=!0);const C=n.xr.getEnvironmentBlendMode();C==="additive"?t.buffers.color.setClear(0,0,0,1,s):C==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||v)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),w&&(w.isCubeTexture||w.mapping===ha)?(c===void 0&&(c=new _t(new Lr(1,1,1),new Jt({name:"BackgroundCubeMaterial",uniforms:Ki(yt.backgroundCube.uniforms),vertexShader:yt.backgroundCube.vertexShader,fragmentShader:yt.backgroundCube.fragmentShader,side:XA,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(b,U,S){this.matrixWorld.copyPosition(S.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=w,c.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=f.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,c.material.toneMapped=nA.getTransfer(w.colorSpace)!==oA,(u!==w||h!==w.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,u=w,h=w.version,p=n.toneMapping),c.layers.enableAll(),d.unshift(c,c.geometry,c.material,0,0,null)):w&&w.isTexture&&(l===void 0&&(l=new _t(new ma(2,2),new Jt({name:"BackgroundMaterial",uniforms:Ki(yt.background.uniforms),vertexShader:yt.background.vertexShader,fragmentShader:yt.background.fragmentShader,side:wn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=w,l.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,l.material.toneMapped=nA.getTransfer(w.colorSpace)!==oA,w.matrixAutoUpdate===!0&&w.updateMatrix(),l.material.uniforms.uvTransform.value.copy(w.matrix),(u!==w||h!==w.version||p!==n.toneMapping)&&(l.material.needsUpdate=!0,u=w,h=w.version,p=n.toneMapping),l.layers.enableAll(),d.unshift(l,l.geometry,l.material,0,0,null))}function m(d,f){d.getRGB(Us,Yf(n)),t.buffers.color.setClear(Us.r,Us.g,Us.b,f,s)}return{getClearColor:function(){return a},setClearColor:function(d,f=1){a.set(d),o=f,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(d){o=d,m(a,o)},render:g}}function NC(n,e,A,t){const i=n.getParameter(n.MAX_VERTEX_ATTRIBS),r=t.isWebGL2?null:e.get("OES_vertex_array_object"),s=t.isWebGL2||r!==null,a={},o=d(null);let l=o,c=!1;function u(T,G,R,Y,X){let J=!1;if(s){const q=m(Y,R,G);l!==q&&(l=q,p(l.object)),J=f(T,Y,R,X),J&&v(T,Y,R,X)}else{const q=G.wireframe===!0;(l.geometry!==Y.id||l.program!==R.id||l.wireframe!==q)&&(l.geometry=Y.id,l.program=R.id,l.wireframe=q,J=!0)}X!==null&&A.update(X,n.ELEMENT_ARRAY_BUFFER),(J||c)&&(c=!1,H(T,G,R,Y),X!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,A.get(X).buffer))}function h(){return t.isWebGL2?n.createVertexArray():r.createVertexArrayOES()}function p(T){return t.isWebGL2?n.bindVertexArray(T):r.bindVertexArrayOES(T)}function g(T){return t.isWebGL2?n.deleteVertexArray(T):r.deleteVertexArrayOES(T)}function m(T,G,R){const Y=R.wireframe===!0;let X=a[T.id];X===void 0&&(X={},a[T.id]=X);let J=X[G.id];J===void 0&&(J={},X[G.id]=J);let q=J[Y];return q===void 0&&(q=d(h()),J[Y]=q),q}function d(T){const G=[],R=[],Y=[];for(let X=0;X<i;X++)G[X]=0,R[X]=0,Y[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:G,enabledAttributes:R,attributeDivisors:Y,object:T,attributes:{},index:null}}function f(T,G,R,Y){const X=l.attributes,J=G.attributes;let q=0;const Ae=R.getAttributes();for(const ae in Ae)if(Ae[ae].location>=0){const N=X[ae];let Z=J[ae];if(Z===void 0&&(ae==="instanceMatrix"&&T.instanceMatrix&&(Z=T.instanceMatrix),ae==="instanceColor"&&T.instanceColor&&(Z=T.instanceColor)),N===void 0||N.attribute!==Z||Z&&N.data!==Z.data)return!0;q++}return l.attributesNum!==q||l.index!==Y}function v(T,G,R,Y){const X={},J=G.attributes;let q=0;const Ae=R.getAttributes();for(const ae in Ae)if(Ae[ae].location>=0){let N=J[ae];N===void 0&&(ae==="instanceMatrix"&&T.instanceMatrix&&(N=T.instanceMatrix),ae==="instanceColor"&&T.instanceColor&&(N=T.instanceColor));const Z={};Z.attribute=N,N&&N.data&&(Z.data=N.data),X[ae]=Z,q++}l.attributes=X,l.attributesNum=q,l.index=Y}function w(){const T=l.newAttributes;for(let G=0,R=T.length;G<R;G++)T[G]=0}function C(T){b(T,0)}function b(T,G){const R=l.newAttributes,Y=l.enabledAttributes,X=l.attributeDivisors;R[T]=1,Y[T]===0&&(n.enableVertexAttribArray(T),Y[T]=1),X[T]!==G&&((t.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[t.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](T,G),X[T]=G)}function U(){const T=l.newAttributes,G=l.enabledAttributes;for(let R=0,Y=G.length;R<Y;R++)G[R]!==T[R]&&(n.disableVertexAttribArray(R),G[R]=0)}function S(T,G,R,Y,X,J,q){q===!0?n.vertexAttribIPointer(T,G,R,X,J):n.vertexAttribPointer(T,G,R,Y,X,J)}function H(T,G,R,Y){if(t.isWebGL2===!1&&(T.isInstancedMesh||Y.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;w();const X=Y.attributes,J=R.getAttributes(),q=G.defaultAttributeValues;for(const Ae in J){const ae=J[Ae];if(ae.location>=0){let ve=X[Ae];if(ve===void 0&&(Ae==="instanceMatrix"&&T.instanceMatrix&&(ve=T.instanceMatrix),Ae==="instanceColor"&&T.instanceColor&&(ve=T.instanceColor)),ve!==void 0){const N=ve.normalized,Z=ve.itemSize,fe=A.get(ve);if(fe===void 0)continue;const Ee=fe.buffer,Te=fe.type,Be=fe.bytesPerElement,Ze=t.isWebGL2===!0&&(Te===n.INT||Te===n.UNSIGNED_INT||ve.gpuType===Qf);if(ve.isInterleavedBufferAttribute){const He=ve.data,L=He.stride,BA=ve.offset;if(He.isInstancedInterleavedBuffer){for(let Se=0;Se<ae.locationSize;Se++)b(ae.location+Se,He.meshPerAttribute);T.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=He.meshPerAttribute*He.count)}else for(let Se=0;Se<ae.locationSize;Se++)C(ae.location+Se);n.bindBuffer(n.ARRAY_BUFFER,Ee);for(let Se=0;Se<ae.locationSize;Se++)S(ae.location+Se,Z/ae.locationSize,Te,N,L*Be,(BA+Z/ae.locationSize*Se)*Be,Ze)}else{if(ve.isInstancedBufferAttribute){for(let He=0;He<ae.locationSize;He++)b(ae.location+He,ve.meshPerAttribute);T.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=ve.meshPerAttribute*ve.count)}else for(let He=0;He<ae.locationSize;He++)C(ae.location+He);n.bindBuffer(n.ARRAY_BUFFER,Ee);for(let He=0;He<ae.locationSize;He++)S(ae.location+He,Z/ae.locationSize,Te,N,Z*Be,Z/ae.locationSize*He*Be,Ze)}}else if(q!==void 0){const N=q[Ae];if(N!==void 0)switch(N.length){case 2:n.vertexAttrib2fv(ae.location,N);break;case 3:n.vertexAttrib3fv(ae.location,N);break;case 4:n.vertexAttrib4fv(ae.location,N);break;default:n.vertexAttrib1fv(ae.location,N)}}}}U()}function z(){K();for(const T in a){const G=a[T];for(const R in G){const Y=G[R];for(const X in Y)g(Y[X].object),delete Y[X];delete G[R]}delete a[T]}}function B(T){if(a[T.id]===void 0)return;const G=a[T.id];for(const R in G){const Y=G[R];for(const X in Y)g(Y[X].object),delete Y[X];delete G[R]}delete a[T.id]}function M(T){for(const G in a){const R=a[G];if(R[T.id]===void 0)continue;const Y=R[T.id];for(const X in Y)g(Y[X].object),delete Y[X];delete R[T.id]}}function K(){W(),c=!0,l!==o&&(l=o,p(l.object))}function W(){o.geometry=null,o.program=null,o.wireframe=!1}return{setup:u,reset:K,resetDefaultState:W,dispose:z,releaseStatesOfGeometry:B,releaseStatesOfProgram:M,initAttributes:w,enableAttribute:C,disableUnusedAttributes:U}}function GC(n,e,A,t){const i=t.isWebGL2;let r;function s(c){r=c}function a(c,u){n.drawArrays(r,c,u),A.update(u,r,1)}function o(c,u,h){if(h===0)return;let p,g;if(i)p=n,g="drawArraysInstanced";else if(p=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[g](r,c,u,h),A.update(u,r,h)}function l(c,u,h){if(h===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<h;g++)this.render(c[g],u[g]);else{p.multiDrawArraysWEBGL(r,c,0,u,0,h);let g=0;for(let m=0;m<h;m++)g+=u[m];A.update(g,r,1)}}this.setMode=s,this.render=a,this.renderInstances=o,this.renderMultiDraw=l}function VC(n,e,A){let t;function i(){if(t!==void 0)return t;if(e.has("EXT_texture_filter_anisotropic")===!0){const S=e.get("EXT_texture_filter_anisotropic");t=n.getParameter(S.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else t=0;return t}function r(S){if(S==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";S="mediump"}return S==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const s=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext";let a=A.precision!==void 0?A.precision:"highp";const o=r(a);o!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",o,"instead."),a=o);const l=s||e.has("WEBGL_draw_buffers"),c=A.logarithmicDepthBuffer===!0,u=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),h=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),d=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),f=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),w=h>0,C=s||e.has("OES_texture_float"),b=w&&C,U=s?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:s,drawBuffers:l,getMaxAnisotropy:i,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:c,maxTextures:u,maxVertexTextures:h,maxTextureSize:p,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:d,maxVaryings:f,maxFragmentUniforms:v,vertexTextures:w,floatFragmentTextures:C,floatVertexTextures:b,maxSamples:U}}function kC(n){const e=this;let A=null,t=0,i=!1,r=!1;const s=new sn,a=new Ye,o={value:null,needsUpdate:!1};this.uniform=o,this.numPlanes=0,this.numIntersection=0,this.init=function(u,h){const p=u.length!==0||h||t!==0||i;return i=h,t=u.length,p},this.beginShadows=function(){r=!0,c(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,h){A=c(u,h,0)},this.setState=function(u,h,p){const g=u.clippingPlanes,m=u.clipIntersection,d=u.clipShadows,f=n.get(u);if(!i||g===null||g.length===0||r&&!d)r?c(null):l();else{const v=r?0:t,w=v*4;let C=f.clippingState||null;o.value=C,C=c(g,h,w,p);for(let b=0;b!==w;++b)C[b]=A[b];f.clippingState=C,this.numIntersection=m?this.numPlanes:0,this.numPlanes+=v}};function l(){o.value!==A&&(o.value=A,o.needsUpdate=t>0),e.numPlanes=t,e.numIntersection=0}function c(u,h,p,g){const m=u!==null?u.length:0;let d=null;if(m!==0){if(d=o.value,g!==!0||d===null){const f=p+m*4,v=h.matrixWorldInverse;a.getNormalMatrix(v),(d===null||d.length<f)&&(d=new Float32Array(f));for(let w=0,C=p;w!==m;++w,C+=4)s.copy(u[w]).applyMatrix4(v,a),s.normal.toArray(d,C),d[C+3]=s.constant}o.value=d,o.needsUpdate=!0}return e.numPlanes=m,e.numIntersection=0,d}}function KC(n){let e=new WeakMap;function A(s,a){return a===tl?s.mapping=Gi:a===nl&&(s.mapping=Vi),s}function t(s){if(s&&s.isTexture){const a=s.mapping;if(a===tl||a===nl)if(e.has(s)){const o=e.get(s).texture;return A(o,s.mapping)}else{const o=s.image;if(o&&o.height>0){const l=new tv(o.height);return l.fromEquirectangularTexture(n,s),e.set(s,l),s.addEventListener("dispose",i),A(l.texture,s.mapping)}else return null}}return s}function i(s){const a=s.target;a.removeEventListener("dispose",i);const o=e.get(a);o!==void 0&&(e.delete(a),o.dispose())}function r(){e=new WeakMap}return{get:t,dispose:r}}class zC extends Jf{constructor(e=-1,A=1,t=1,i=-1,r=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=A,this.top=t,this.bottom=i,this.near=r,this.far=s,this.updateProjectionMatrix()}copy(e,A){return super.copy(e,A),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,A,t,i,r,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=A,this.view.offsetX=t,this.view.offsetY=i,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),A=(this.top-this.bottom)/(2*this.zoom),t=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=t-e,s=t+e,a=i+A,o=i-A;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,s=r+l*this.view.width,a-=c*this.view.offsetY,o=a-c*this.view.height}this.projectionMatrix.makeOrthographic(r,s,a,o,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const A=super.toJSON(e);return A.object.zoom=this.zoom,A.object.left=this.left,A.object.right=this.right,A.object.top=this.top,A.object.bottom=this.bottom,A.object.near=this.near,A.object.far=this.far,this.view!==null&&(A.object.view=Object.assign({},this.view)),A}}const xi=4,Gu=[.125,.215,.35,.446,.526,.582],Tn=20,wo=new zC,Vu=new AA;let vo=null,Eo=0,Co=0;const Mn=(1+Math.sqrt(5))/2,Bi=1/Mn,ku=[new Q(1,1,1),new Q(-1,1,1),new Q(1,1,-1),new Q(-1,1,-1),new Q(0,Mn,Bi),new Q(0,Mn,-Bi),new Q(Bi,0,Mn),new Q(-Bi,0,Mn),new Q(Mn,Bi,0),new Q(-Mn,Bi,0)];class Ku{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,A=0,t=.1,i=100){vo=this._renderer.getRenderTarget(),Eo=this._renderer.getActiveCubeFace(),Co=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,t,i,r),A>0&&this._blur(r,0,0,A),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,A=null){return this._fromTexture(e,A)}fromCubemap(e,A=null){return this._fromTexture(e,A)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Wu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(vo,Eo,Co),e.scissorTest=!1,ys(e,0,0,e.width,e.height)}_fromTexture(e,A){e.mapping===Gi||e.mapping===Vi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),vo=this._renderer.getRenderTarget(),Eo=this._renderer.getActiveCubeFace(),Co=this._renderer.getActiveMipmapLevel();const t=A||this._allocateTargets();return this._textureToCubeUV(e,t),this._applyPMREM(t),this._cleanup(t),t}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),A=4*this._cubeSize,t={magFilter:zA,minFilter:zA,generateMipmaps:!1,type:xr,format:Bt,colorSpace:Yt,depthBuffer:!1},i=zu(e,A,t);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==A){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=zu(e,A,t);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=WC(r)),this._blurMaterial=XC(r,e,A)}return i}_compileMaterial(e){const A=new _t(this._lodPlanes[0],e);this._renderer.compile(A,wo)}_sceneToCubeUV(e,A,t,i){const a=new st(90,1,A,t),o=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],c=this._renderer,u=c.autoClear,h=c.toneMapping;c.getClearColor(Vu),c.toneMapping=gn,c.autoClear=!1;const p=new Ul({name:"PMREM.Background",side:XA,depthWrite:!1,depthTest:!1}),g=new _t(new Lr,p);let m=!1;const d=e.background;d?d.isColor&&(p.color.copy(d),e.background=null,m=!0):(p.color.copy(Vu),m=!0);for(let f=0;f<6;f++){const v=f%3;v===0?(a.up.set(0,o[f],0),a.lookAt(l[f],0,0)):v===1?(a.up.set(0,0,o[f]),a.lookAt(0,l[f],0)):(a.up.set(0,o[f],0),a.lookAt(0,0,l[f]));const w=this._cubeSize;ys(i,v*w,f>2?w:0,w,w),c.setRenderTarget(i),m&&c.render(g,a),c.render(e,a)}g.geometry.dispose(),g.material.dispose(),c.toneMapping=h,c.autoClear=u,e.background=d}_textureToCubeUV(e,A){const t=this._renderer,i=e.mapping===Gi||e.mapping===Vi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Wu());const r=i?this._cubemapMaterial:this._equirectMaterial,s=new _t(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const o=this._cubeSize;ys(A,0,0,3*o,2*o),t.setRenderTarget(A),t.render(s,wo)}_applyPMREM(e){const A=this._renderer,t=A.autoClear;A.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const r=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),s=ku[(i-1)%ku.length];this._blur(e,i-1,i,r,s)}A.autoClear=t}_blur(e,A,t,i,r){const s=this._pingPongRenderTarget;this._halfBlur(e,s,A,t,i,"latitudinal",r),this._halfBlur(s,e,t,t,i,"longitudinal",r)}_halfBlur(e,A,t,i,r,s,a){const o=this._renderer,l=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const c=3,u=new _t(this._lodPlanes[i],l),h=l.uniforms,p=this._sizeLods[t]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Tn-1),m=r/g,d=isFinite(r)?1+Math.floor(c*m):Tn;d>Tn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${d} samples when the maximum is set to ${Tn}`);const f=[];let v=0;for(let S=0;S<Tn;++S){const H=S/m,z=Math.exp(-H*H/2);f.push(z),S===0?v+=z:S<d&&(v+=2*z)}for(let S=0;S<f.length;S++)f[S]=f[S]/v;h.envMap.value=e.texture,h.samples.value=d,h.weights.value=f,h.latitudinal.value=s==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:w}=this;h.dTheta.value=g,h.mipInt.value=w-t;const C=this._sizeLods[i],b=3*C*(i>w-xi?i-w+xi:0),U=4*(this._cubeSize-C);ys(A,b,U,3*C,2*C),o.setRenderTarget(A),o.render(u,wo)}}function WC(n){const e=[],A=[],t=[];let i=n;const r=n-xi+1+Gu.length;for(let s=0;s<r;s++){const a=Math.pow(2,i);A.push(a);let o=1/a;s>n-xi?o=Gu[s-n+xi-1]:s===0&&(o=0),t.push(o);const l=1/(a-2),c=-l,u=1+l,h=[c,c,u,c,u,u,c,c,u,u,c,u],p=6,g=6,m=3,d=2,f=1,v=new Float32Array(m*g*p),w=new Float32Array(d*g*p),C=new Float32Array(f*g*p);for(let U=0;U<p;U++){const S=U%3*2/3-1,H=U>2?0:-1,z=[S,H,0,S+2/3,H,0,S+2/3,H+1,0,S,H,0,S+2/3,H+1,0,S,H+1,0];v.set(z,m*g*U),w.set(h,d*g*U);const B=[U,U,U,U,U,U];C.set(B,f*g*U)}const b=new It;b.setAttribute("position",new bt(v,m)),b.setAttribute("uv",new bt(w,d)),b.setAttribute("faceIndex",new bt(C,f)),e.push(b),i>xi&&i--}return{lodPlanes:e,sizeLods:A,sigmas:t}}function zu(n,e,A){const t=new Wn(n,e,A);return t.texture.mapping=ha,t.texture.name="PMREM.cubeUv",t.scissorTest=!0,t}function ys(n,e,A,t,i){n.viewport.set(e,A,t,i),n.scissor.set(e,A,t,i)}function XC(n,e,A){const t=new Float32Array(Tn),i=new Q(0,1,0);return new Jt({name:"SphericalGaussianBlur",defines:{n:Tn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/A,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:t},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:yl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:pn,depthTest:!1,depthWrite:!1})}function Wu(){return new Jt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:yl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:pn,depthTest:!1,depthWrite:!1})}function Xu(){return new Jt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:yl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:pn,depthTest:!1,depthWrite:!1})}function yl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function YC(n){let e=new WeakMap,A=null;function t(a){if(a&&a.isTexture){const o=a.mapping,l=o===tl||o===nl,c=o===Gi||o===Vi;if(l||c)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let u=e.get(a);return A===null&&(A=new Ku(n)),u=l?A.fromEquirectangular(a,u):A.fromCubemap(a,u),e.set(a,u),u.texture}else{if(e.has(a))return e.get(a).texture;{const u=a.image;if(l&&u&&u.height>0||c&&u&&i(u)){A===null&&(A=new Ku(n));const h=l?A.fromEquirectangular(a):A.fromCubemap(a);return e.set(a,h),a.addEventListener("dispose",r),h.texture}else return null}}}return a}function i(a){let o=0;const l=6;for(let c=0;c<l;c++)a[c]!==void 0&&o++;return o===l}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap,A!==null&&(A.dispose(),A=null)}return{get:t,dispose:s}}function JC(n){const e={};function A(t){if(e[t]!==void 0)return e[t];let i;switch(t){case"WEBGL_depth_texture":i=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=n.getExtension(t)}return e[t]=i,i}return{has:function(t){return A(t)!==null},init:function(t){t.isWebGL2?(A("EXT_color_buffer_float"),A("WEBGL_clip_cull_distance")):(A("WEBGL_depth_texture"),A("OES_texture_float"),A("OES_texture_half_float"),A("OES_texture_half_float_linear"),A("OES_standard_derivatives"),A("OES_element_index_uint"),A("OES_vertex_array_object"),A("ANGLE_instanced_arrays")),A("OES_texture_float_linear"),A("EXT_color_buffer_half_float"),A("WEBGL_multisampled_render_to_texture")},get:function(t){const i=A(t);return i===null&&console.warn("THREE.WebGLRenderer: "+t+" extension not supported."),i}}}function qC(n,e,A,t){const i={},r=new WeakMap;function s(u){const h=u.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);for(const g in h.morphAttributes){const m=h.morphAttributes[g];for(let d=0,f=m.length;d<f;d++)e.remove(m[d])}h.removeEventListener("dispose",s),delete i[h.id];const p=r.get(h);p&&(e.remove(p),r.delete(h)),t.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,A.memory.geometries--}function a(u,h){return i[h.id]===!0||(h.addEventListener("dispose",s),i[h.id]=!0,A.memory.geometries++),h}function o(u){const h=u.attributes;for(const g in h)e.update(h[g],n.ARRAY_BUFFER);const p=u.morphAttributes;for(const g in p){const m=p[g];for(let d=0,f=m.length;d<f;d++)e.update(m[d],n.ARRAY_BUFFER)}}function l(u){const h=[],p=u.index,g=u.attributes.position;let m=0;if(p!==null){const v=p.array;m=p.version;for(let w=0,C=v.length;w<C;w+=3){const b=v[w+0],U=v[w+1],S=v[w+2];h.push(b,U,U,S,S,b)}}else if(g!==void 0){const v=g.array;m=g.version;for(let w=0,C=v.length/3-1;w<C;w+=3){const b=w+0,U=w+1,S=w+2;h.push(b,U,U,S,S,b)}}else return;const d=new(Gf(h)?Xf:Wf)(h,1);d.version=m;const f=r.get(u);f&&e.remove(f),r.set(u,d)}function c(u){const h=r.get(u);if(h){const p=u.index;p!==null&&h.version<p.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:o,getWireframeAttribute:c}}function ZC(n,e,A,t){const i=t.isWebGL2;let r;function s(p){r=p}let a,o;function l(p){a=p.type,o=p.bytesPerElement}function c(p,g){n.drawElements(r,g,a,p*o),A.update(g,r,1)}function u(p,g,m){if(m===0)return;let d,f;if(i)d=n,f="drawElementsInstanced";else if(d=e.get("ANGLE_instanced_arrays"),f="drawElementsInstancedANGLE",d===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[f](r,g,a,p*o,m),A.update(g,r,m)}function h(p,g,m){if(m===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let f=0;f<m;f++)this.render(p[f]/o,g[f]);else{d.multiDrawElementsWEBGL(r,g,0,a,p,0,m);let f=0;for(let v=0;v<m;v++)f+=g[v];A.update(f,r,1)}}this.setMode=s,this.setIndex=l,this.render=c,this.renderInstances=u,this.renderMultiDraw=h}function jC(n){const e={geometries:0,textures:0},A={frame:0,calls:0,triangles:0,points:0,lines:0};function t(r,s,a){switch(A.calls++,s){case n.TRIANGLES:A.triangles+=a*(r/3);break;case n.LINES:A.lines+=a*(r/2);break;case n.LINE_STRIP:A.lines+=a*(r-1);break;case n.LINE_LOOP:A.lines+=a*r;break;case n.POINTS:A.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",s);break}}function i(){A.calls=0,A.triangles=0,A.points=0,A.lines=0}return{memory:e,render:A,programs:null,autoReset:!0,reset:i,update:t}}function $C(n,e){return n[0]-e[0]}function ex(n,e){return Math.abs(e[1])-Math.abs(n[1])}function Ax(n,e,A){const t={},i=new Float32Array(8),r=new WeakMap,s=new bA,a=[];for(let l=0;l<8;l++)a[l]=[l,0];function o(l,c,u){const h=l.morphTargetInfluences;if(e.isWebGL2===!0){const g=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,m=g!==void 0?g.length:0;let d=r.get(c);if(d===void 0||d.count!==m){let G=function(){W.dispose(),r.delete(c),c.removeEventListener("dispose",G)};var p=G;d!==void 0&&d.texture.dispose();const w=c.morphAttributes.position!==void 0,C=c.morphAttributes.normal!==void 0,b=c.morphAttributes.color!==void 0,U=c.morphAttributes.position||[],S=c.morphAttributes.normal||[],H=c.morphAttributes.color||[];let z=0;w===!0&&(z=1),C===!0&&(z=2),b===!0&&(z=3);let B=c.attributes.position.count*z,M=1;B>e.maxTextureSize&&(M=Math.ceil(B/e.maxTextureSize),B=e.maxTextureSize);const K=new Float32Array(B*M*4*m),W=new Kf(K,B,M,m);W.type=Kt,W.needsUpdate=!0;const T=z*4;for(let R=0;R<m;R++){const Y=U[R],X=S[R],J=H[R],q=B*M*4*R;for(let Ae=0;Ae<Y.count;Ae++){const ae=Ae*T;w===!0&&(s.fromBufferAttribute(Y,Ae),K[q+ae+0]=s.x,K[q+ae+1]=s.y,K[q+ae+2]=s.z,K[q+ae+3]=0),C===!0&&(s.fromBufferAttribute(X,Ae),K[q+ae+4]=s.x,K[q+ae+5]=s.y,K[q+ae+6]=s.z,K[q+ae+7]=0),b===!0&&(s.fromBufferAttribute(J,Ae),K[q+ae+8]=s.x,K[q+ae+9]=s.y,K[q+ae+10]=s.z,K[q+ae+11]=J.itemSize===4?s.w:1)}}d={count:m,texture:W,size:new Fe(B,M)},r.set(c,d),c.addEventListener("dispose",G)}let f=0;for(let w=0;w<h.length;w++)f+=h[w];const v=c.morphTargetsRelative?1:1-f;u.getUniforms().setValue(n,"morphTargetBaseInfluence",v),u.getUniforms().setValue(n,"morphTargetInfluences",h),u.getUniforms().setValue(n,"morphTargetsTexture",d.texture,A),u.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}else{const g=h===void 0?0:h.length;let m=t[c.id];if(m===void 0||m.length!==g){m=[];for(let C=0;C<g;C++)m[C]=[C,0];t[c.id]=m}for(let C=0;C<g;C++){const b=m[C];b[0]=C,b[1]=h[C]}m.sort(ex);for(let C=0;C<8;C++)C<g&&m[C][1]?(a[C][0]=m[C][0],a[C][1]=m[C][1]):(a[C][0]=Number.MAX_SAFE_INTEGER,a[C][1]=0);a.sort($C);const d=c.morphAttributes.position,f=c.morphAttributes.normal;let v=0;for(let C=0;C<8;C++){const b=a[C],U=b[0],S=b[1];U!==Number.MAX_SAFE_INTEGER&&S?(d&&c.getAttribute("morphTarget"+C)!==d[U]&&c.setAttribute("morphTarget"+C,d[U]),f&&c.getAttribute("morphNormal"+C)!==f[U]&&c.setAttribute("morphNormal"+C,f[U]),i[C]=S,v+=S):(d&&c.hasAttribute("morphTarget"+C)===!0&&c.deleteAttribute("morphTarget"+C),f&&c.hasAttribute("morphNormal"+C)===!0&&c.deleteAttribute("morphNormal"+C),i[C]=0)}const w=c.morphTargetsRelative?1:1-v;u.getUniforms().setValue(n,"morphTargetBaseInfluence",w),u.getUniforms().setValue(n,"morphTargetInfluences",i)}}return{update:o}}function tx(n,e,A,t){let i=new WeakMap;function r(o){const l=t.render.frame,c=o.geometry,u=e.get(o,c);if(i.get(u)!==l&&(e.update(u),i.set(u,l)),o.isInstancedMesh&&(o.hasEventListener("dispose",a)===!1&&o.addEventListener("dispose",a),i.get(o)!==l&&(A.update(o.instanceMatrix,n.ARRAY_BUFFER),o.instanceColor!==null&&A.update(o.instanceColor,n.ARRAY_BUFFER),i.set(o,l))),o.isSkinnedMesh){const h=o.skeleton;i.get(h)!==l&&(h.update(),i.set(h,l))}return u}function s(){i=new WeakMap}function a(o){const l=o.target;l.removeEventListener("dispose",a),A.remove(l.instanceMatrix),l.instanceColor!==null&&A.remove(l.instanceColor)}return{update:r,dispose:s}}class $f extends YA{constructor(e,A,t,i,r,s,a,o,l,c){if(c=c!==void 0?c:Kn,c!==Kn&&c!==ki)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");t===void 0&&c===Kn&&(t=hn),t===void 0&&c===ki&&(t=kn),super(null,i,r,s,a,o,c,t,l),this.isDepthTexture=!0,this.image={width:e,height:A},this.magFilter=a!==void 0?a:KA,this.minFilter=o!==void 0?o:KA,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const A=super.toJSON(e);return this.compareFunction!==null&&(A.compareFunction=this.compareFunction),A}}const ed=new YA,Ad=new $f(1,1);Ad.compareFunction=Nf;const td=new Kf,nd=new Ow,id=new qf,Yu=[],Ju=[],qu=new Float32Array(16),Zu=new Float32Array(9),ju=new Float32Array(4);function Xi(n,e,A){const t=n[0];if(t<=0||t>0)return n;const i=e*A;let r=Yu[i];if(r===void 0&&(r=new Float32Array(i),Yu[i]=r),e!==0){t.toArray(r,0);for(let s=1,a=0;s!==e;++s)a+=A,n[s].toArray(r,a)}return r}function wA(n,e){if(n.length!==e.length)return!1;for(let A=0,t=n.length;A<t;A++)if(n[A]!==e[A])return!1;return!0}function vA(n,e){for(let A=0,t=e.length;A<t;A++)n[A]=e[A]}function Ba(n,e){let A=Ju[e];A===void 0&&(A=new Int32Array(e),Ju[e]=A);for(let t=0;t!==e;++t)A[t]=n.allocateTextureUnit();return A}function nx(n,e){const A=this.cache;A[0]!==e&&(n.uniform1f(this.addr,e),A[0]=e)}function ix(n,e){const A=this.cache;if(e.x!==void 0)(A[0]!==e.x||A[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),A[0]=e.x,A[1]=e.y);else{if(wA(A,e))return;n.uniform2fv(this.addr,e),vA(A,e)}}function rx(n,e){const A=this.cache;if(e.x!==void 0)(A[0]!==e.x||A[1]!==e.y||A[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),A[0]=e.x,A[1]=e.y,A[2]=e.z);else if(e.r!==void 0)(A[0]!==e.r||A[1]!==e.g||A[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),A[0]=e.r,A[1]=e.g,A[2]=e.b);else{if(wA(A,e))return;n.uniform3fv(this.addr,e),vA(A,e)}}function sx(n,e){const A=this.cache;if(e.x!==void 0)(A[0]!==e.x||A[1]!==e.y||A[2]!==e.z||A[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),A[0]=e.x,A[1]=e.y,A[2]=e.z,A[3]=e.w);else{if(wA(A,e))return;n.uniform4fv(this.addr,e),vA(A,e)}}function ax(n,e){const A=this.cache,t=e.elements;if(t===void 0){if(wA(A,e))return;n.uniformMatrix2fv(this.addr,!1,e),vA(A,e)}else{if(wA(A,t))return;ju.set(t),n.uniformMatrix2fv(this.addr,!1,ju),vA(A,t)}}function ox(n,e){const A=this.cache,t=e.elements;if(t===void 0){if(wA(A,e))return;n.uniformMatrix3fv(this.addr,!1,e),vA(A,e)}else{if(wA(A,t))return;Zu.set(t),n.uniformMatrix3fv(this.addr,!1,Zu),vA(A,t)}}function lx(n,e){const A=this.cache,t=e.elements;if(t===void 0){if(wA(A,e))return;n.uniformMatrix4fv(this.addr,!1,e),vA(A,e)}else{if(wA(A,t))return;qu.set(t),n.uniformMatrix4fv(this.addr,!1,qu),vA(A,t)}}function cx(n,e){const A=this.cache;A[0]!==e&&(n.uniform1i(this.addr,e),A[0]=e)}function ux(n,e){const A=this.cache;if(e.x!==void 0)(A[0]!==e.x||A[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),A[0]=e.x,A[1]=e.y);else{if(wA(A,e))return;n.uniform2iv(this.addr,e),vA(A,e)}}function hx(n,e){const A=this.cache;if(e.x!==void 0)(A[0]!==e.x||A[1]!==e.y||A[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),A[0]=e.x,A[1]=e.y,A[2]=e.z);else{if(wA(A,e))return;n.uniform3iv(this.addr,e),vA(A,e)}}function fx(n,e){const A=this.cache;if(e.x!==void 0)(A[0]!==e.x||A[1]!==e.y||A[2]!==e.z||A[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),A[0]=e.x,A[1]=e.y,A[2]=e.z,A[3]=e.w);else{if(wA(A,e))return;n.uniform4iv(this.addr,e),vA(A,e)}}function dx(n,e){const A=this.cache;A[0]!==e&&(n.uniform1ui(this.addr,e),A[0]=e)}function px(n,e){const A=this.cache;if(e.x!==void 0)(A[0]!==e.x||A[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),A[0]=e.x,A[1]=e.y);else{if(wA(A,e))return;n.uniform2uiv(this.addr,e),vA(A,e)}}function gx(n,e){const A=this.cache;if(e.x!==void 0)(A[0]!==e.x||A[1]!==e.y||A[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),A[0]=e.x,A[1]=e.y,A[2]=e.z);else{if(wA(A,e))return;n.uniform3uiv(this.addr,e),vA(A,e)}}function mx(n,e){const A=this.cache;if(e.x!==void 0)(A[0]!==e.x||A[1]!==e.y||A[2]!==e.z||A[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),A[0]=e.x,A[1]=e.y,A[2]=e.z,A[3]=e.w);else{if(wA(A,e))return;n.uniform4uiv(this.addr,e),vA(A,e)}}function Bx(n,e,A){const t=this.cache,i=A.allocateTextureUnit();t[0]!==i&&(n.uniform1i(this.addr,i),t[0]=i);const r=this.type===n.SAMPLER_2D_SHADOW?Ad:ed;A.setTexture2D(e||r,i)}function _x(n,e,A){const t=this.cache,i=A.allocateTextureUnit();t[0]!==i&&(n.uniform1i(this.addr,i),t[0]=i),A.setTexture3D(e||nd,i)}function wx(n,e,A){const t=this.cache,i=A.allocateTextureUnit();t[0]!==i&&(n.uniform1i(this.addr,i),t[0]=i),A.setTextureCube(e||id,i)}function vx(n,e,A){const t=this.cache,i=A.allocateTextureUnit();t[0]!==i&&(n.uniform1i(this.addr,i),t[0]=i),A.setTexture2DArray(e||td,i)}function Ex(n){switch(n){case 5126:return nx;case 35664:return ix;case 35665:return rx;case 35666:return sx;case 35674:return ax;case 35675:return ox;case 35676:return lx;case 5124:case 35670:return cx;case 35667:case 35671:return ux;case 35668:case 35672:return hx;case 35669:case 35673:return fx;case 5125:return dx;case 36294:return px;case 36295:return gx;case 36296:return mx;case 35678:case 36198:case 36298:case 36306:case 35682:return Bx;case 35679:case 36299:case 36307:return _x;case 35680:case 36300:case 36308:case 36293:return wx;case 36289:case 36303:case 36311:case 36292:return vx}}function Cx(n,e){n.uniform1fv(this.addr,e)}function xx(n,e){const A=Xi(e,this.size,2);n.uniform2fv(this.addr,A)}function Ux(n,e){const A=Xi(e,this.size,3);n.uniform3fv(this.addr,A)}function yx(n,e){const A=Xi(e,this.size,4);n.uniform4fv(this.addr,A)}function Sx(n,e){const A=Xi(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,A)}function Mx(n,e){const A=Xi(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,A)}function Fx(n,e){const A=Xi(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,A)}function bx(n,e){n.uniform1iv(this.addr,e)}function Tx(n,e){n.uniform2iv(this.addr,e)}function Qx(n,e){n.uniform3iv(this.addr,e)}function Ix(n,e){n.uniform4iv(this.addr,e)}function Lx(n,e){n.uniform1uiv(this.addr,e)}function Rx(n,e){n.uniform2uiv(this.addr,e)}function Dx(n,e){n.uniform3uiv(this.addr,e)}function Hx(n,e){n.uniform4uiv(this.addr,e)}function Px(n,e,A){const t=this.cache,i=e.length,r=Ba(A,i);wA(t,r)||(n.uniform1iv(this.addr,r),vA(t,r));for(let s=0;s!==i;++s)A.setTexture2D(e[s]||ed,r[s])}function Ox(n,e,A){const t=this.cache,i=e.length,r=Ba(A,i);wA(t,r)||(n.uniform1iv(this.addr,r),vA(t,r));for(let s=0;s!==i;++s)A.setTexture3D(e[s]||nd,r[s])}function Nx(n,e,A){const t=this.cache,i=e.length,r=Ba(A,i);wA(t,r)||(n.uniform1iv(this.addr,r),vA(t,r));for(let s=0;s!==i;++s)A.setTextureCube(e[s]||id,r[s])}function Gx(n,e,A){const t=this.cache,i=e.length,r=Ba(A,i);wA(t,r)||(n.uniform1iv(this.addr,r),vA(t,r));for(let s=0;s!==i;++s)A.setTexture2DArray(e[s]||td,r[s])}function Vx(n){switch(n){case 5126:return Cx;case 35664:return xx;case 35665:return Ux;case 35666:return yx;case 35674:return Sx;case 35675:return Mx;case 35676:return Fx;case 5124:case 35670:return bx;case 35667:case 35671:return Tx;case 35668:case 35672:return Qx;case 35669:case 35673:return Ix;case 5125:return Lx;case 36294:return Rx;case 36295:return Dx;case 36296:return Hx;case 35678:case 36198:case 36298:case 36306:case 35682:return Px;case 35679:case 36299:case 36307:return Ox;case 35680:case 36300:case 36308:case 36293:return Nx;case 36289:case 36303:case 36311:case 36292:return Gx}}class kx{constructor(e,A,t){this.id=e,this.addr=t,this.cache=[],this.type=A.type,this.setValue=Ex(A.type)}}class Kx{constructor(e,A,t){this.id=e,this.addr=t,this.cache=[],this.type=A.type,this.size=A.size,this.setValue=Vx(A.type)}}class zx{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,A,t){const i=this.seq;for(let r=0,s=i.length;r!==s;++r){const a=i[r];a.setValue(e,A[a.id],t)}}}const xo=/(\w+)(\])?(\[|\.)?/g;function $u(n,e){n.seq.push(e),n.map[e.id]=e}function Wx(n,e,A){const t=n.name,i=t.length;for(xo.lastIndex=0;;){const r=xo.exec(t),s=xo.lastIndex;let a=r[1];const o=r[2]==="]",l=r[3];if(o&&(a=a|0),l===void 0||l==="["&&s+2===i){$u(A,l===void 0?new kx(a,n,e):new Kx(a,n,e));break}else{let u=A.map[a];u===void 0&&(u=new zx(a),$u(A,u)),A=u}}}class Is{constructor(e,A){this.seq=[],this.map={};const t=e.getProgramParameter(A,e.ACTIVE_UNIFORMS);for(let i=0;i<t;++i){const r=e.getActiveUniform(A,i),s=e.getUniformLocation(A,r.name);Wx(r,s,this)}}setValue(e,A,t,i){const r=this.map[A];r!==void 0&&r.setValue(e,t,i)}setOptional(e,A,t){const i=A[t];i!==void 0&&this.setValue(e,t,i)}static upload(e,A,t,i){for(let r=0,s=A.length;r!==s;++r){const a=A[r],o=t[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,i)}}static seqWithValue(e,A){const t=[];for(let i=0,r=e.length;i!==r;++i){const s=e[i];s.id in A&&t.push(s)}return t}}function eh(n,e,A){const t=n.createShader(e);return n.shaderSource(t,A),n.compileShader(t),t}const Xx=37297;let Yx=0;function Jx(n,e){const A=n.split(`
`),t=[],i=Math.max(e-6,0),r=Math.min(e+6,A.length);for(let s=i;s<r;s++){const a=s+1;t.push(`${a===e?">":" "} ${a}: ${A[s]}`)}return t.join(`
`)}function qx(n){const e=nA.getPrimaries(nA.workingColorSpace),A=nA.getPrimaries(n);let t;switch(e===A?t="":e===Js&&A===Ys?t="LinearDisplayP3ToLinearSRGB":e===Ys&&A===Js&&(t="LinearSRGBToLinearDisplayP3"),n){case Yt:case fa:return[t,"LinearTransferOETF"];case MA:case El:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[t,"LinearTransferOETF"]}}function Ah(n,e,A){const t=n.getShaderParameter(e,n.COMPILE_STATUS),i=n.getShaderInfoLog(e).trim();if(t&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const s=parseInt(r[1]);return A.toUpperCase()+`

`+i+`

`+Jx(n.getShaderSource(e),s)}else return i}function Zx(n,e){const A=qx(e);return`vec4 ${n}( vec4 value ) { return ${A[0]}( ${A[1]}( value ) ); }`}function jx(n,e){let A;switch(e){case Y_:A="Linear";break;case J_:A="Reinhard";break;case q_:A="OptimizedCineon";break;case Z_:A="ACESFilmic";break;case $_:A="AgX";break;case j_:A="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),A="Linear"}return"vec3 "+n+"( vec3 color ) { return "+A+"ToneMapping( color ); }"}function $x(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.alphaToCoverage||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ui).join(`
`)}function eU(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ui).join(`
`)}function AU(n){const e=[];for(const A in n){const t=n[A];t!==!1&&e.push("#define "+A+" "+t)}return e.join(`
`)}function tU(n,e){const A={},t=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let i=0;i<t;i++){const r=n.getActiveAttrib(e,i),s=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),A[s]={type:r.type,location:n.getAttribLocation(e,s),locationSize:a}}return A}function Ui(n){return n!==""}function th(n,e){const A=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,A).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function nh(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const nU=/^[ \t]*#include +<([\w\d./]+)>/gm;function ol(n){return n.replace(nU,rU)}const iU=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function rU(n,e){let A=ke[e];if(A===void 0){const t=iU.get(e);if(t!==void 0)A=ke[t],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,t);else throw new Error("Can not resolve #include <"+e+">")}return ol(A)}const sU=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ih(n){return n.replace(sU,aU)}function aU(n,e,A,t){let i="";for(let r=parseInt(e);r<parseInt(A);r++)i+=t.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function rh(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	`;return n.isWebGL2&&(e+=`precision ${n.precision} sampler3D;
		precision ${n.precision} sampler2DArray;
		precision ${n.precision} sampler2DShadow;
		precision ${n.precision} samplerCubeShadow;
		precision ${n.precision} sampler2DArrayShadow;
		precision ${n.precision} isampler2D;
		precision ${n.precision} isampler3D;
		precision ${n.precision} isamplerCube;
		precision ${n.precision} isampler2DArray;
		precision ${n.precision} usampler2D;
		precision ${n.precision} usampler3D;
		precision ${n.precision} usamplerCube;
		precision ${n.precision} usampler2DArray;
		`),n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function oU(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Ff?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===E_?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Vt&&(e="SHADOWMAP_TYPE_VSM"),e}function lU(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Gi:case Vi:e="ENVMAP_TYPE_CUBE";break;case ha:e="ENVMAP_TYPE_CUBE_UV";break}return e}function cU(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Vi:e="ENVMAP_MODE_REFRACTION";break}return e}function uU(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case bf:e="ENVMAP_BLENDING_MULTIPLY";break;case W_:e="ENVMAP_BLENDING_MIX";break;case X_:e="ENVMAP_BLENDING_ADD";break}return e}function hU(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const A=Math.log2(e)-2,t=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,A),7*16)),texelHeight:t,maxMip:A}}function fU(n,e,A,t){const i=n.getContext(),r=A.defines;let s=A.vertexShader,a=A.fragmentShader;const o=oU(A),l=lU(A),c=cU(A),u=uU(A),h=hU(A),p=A.isWebGL2?"":$x(A),g=eU(A),m=AU(r),d=i.createProgram();let f,v,w=A.glslVersion?"#version "+A.glslVersion+`
`:"";A.isRawShaderMaterial?(f=["#define SHADER_TYPE "+A.shaderType,"#define SHADER_NAME "+A.shaderName,m].filter(Ui).join(`
`),f.length>0&&(f+=`
`),v=[p,"#define SHADER_TYPE "+A.shaderType,"#define SHADER_NAME "+A.shaderName,m].filter(Ui).join(`
`),v.length>0&&(v+=`
`)):(f=[rh(A),"#define SHADER_TYPE "+A.shaderType,"#define SHADER_NAME "+A.shaderName,m,A.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",A.batching?"#define USE_BATCHING":"",A.instancing?"#define USE_INSTANCING":"",A.instancingColor?"#define USE_INSTANCING_COLOR":"",A.useFog&&A.fog?"#define USE_FOG":"",A.useFog&&A.fogExp2?"#define FOG_EXP2":"",A.map?"#define USE_MAP":"",A.envMap?"#define USE_ENVMAP":"",A.envMap?"#define "+c:"",A.lightMap?"#define USE_LIGHTMAP":"",A.aoMap?"#define USE_AOMAP":"",A.bumpMap?"#define USE_BUMPMAP":"",A.normalMap?"#define USE_NORMALMAP":"",A.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",A.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",A.displacementMap?"#define USE_DISPLACEMENTMAP":"",A.emissiveMap?"#define USE_EMISSIVEMAP":"",A.anisotropy?"#define USE_ANISOTROPY":"",A.anisotropyMap?"#define USE_ANISOTROPYMAP":"",A.clearcoatMap?"#define USE_CLEARCOATMAP":"",A.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",A.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",A.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",A.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",A.specularMap?"#define USE_SPECULARMAP":"",A.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",A.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",A.roughnessMap?"#define USE_ROUGHNESSMAP":"",A.metalnessMap?"#define USE_METALNESSMAP":"",A.alphaMap?"#define USE_ALPHAMAP":"",A.alphaHash?"#define USE_ALPHAHASH":"",A.transmission?"#define USE_TRANSMISSION":"",A.transmissionMap?"#define USE_TRANSMISSIONMAP":"",A.thicknessMap?"#define USE_THICKNESSMAP":"",A.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",A.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",A.mapUv?"#define MAP_UV "+A.mapUv:"",A.alphaMapUv?"#define ALPHAMAP_UV "+A.alphaMapUv:"",A.lightMapUv?"#define LIGHTMAP_UV "+A.lightMapUv:"",A.aoMapUv?"#define AOMAP_UV "+A.aoMapUv:"",A.emissiveMapUv?"#define EMISSIVEMAP_UV "+A.emissiveMapUv:"",A.bumpMapUv?"#define BUMPMAP_UV "+A.bumpMapUv:"",A.normalMapUv?"#define NORMALMAP_UV "+A.normalMapUv:"",A.displacementMapUv?"#define DISPLACEMENTMAP_UV "+A.displacementMapUv:"",A.metalnessMapUv?"#define METALNESSMAP_UV "+A.metalnessMapUv:"",A.roughnessMapUv?"#define ROUGHNESSMAP_UV "+A.roughnessMapUv:"",A.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+A.anisotropyMapUv:"",A.clearcoatMapUv?"#define CLEARCOATMAP_UV "+A.clearcoatMapUv:"",A.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+A.clearcoatNormalMapUv:"",A.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+A.clearcoatRoughnessMapUv:"",A.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+A.iridescenceMapUv:"",A.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+A.iridescenceThicknessMapUv:"",A.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+A.sheenColorMapUv:"",A.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+A.sheenRoughnessMapUv:"",A.specularMapUv?"#define SPECULARMAP_UV "+A.specularMapUv:"",A.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+A.specularColorMapUv:"",A.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+A.specularIntensityMapUv:"",A.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+A.transmissionMapUv:"",A.thicknessMapUv?"#define THICKNESSMAP_UV "+A.thicknessMapUv:"",A.vertexTangents&&A.flatShading===!1?"#define USE_TANGENT":"",A.vertexColors?"#define USE_COLOR":"",A.vertexAlphas?"#define USE_COLOR_ALPHA":"",A.vertexUv1s?"#define USE_UV1":"",A.vertexUv2s?"#define USE_UV2":"",A.vertexUv3s?"#define USE_UV3":"",A.pointsUvs?"#define USE_POINTS_UV":"",A.flatShading?"#define FLAT_SHADED":"",A.skinning?"#define USE_SKINNING":"",A.morphTargets?"#define USE_MORPHTARGETS":"",A.morphNormals&&A.flatShading===!1?"#define USE_MORPHNORMALS":"",A.morphColors&&A.isWebGL2?"#define USE_MORPHCOLORS":"",A.morphTargetsCount>0&&A.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",A.morphTargetsCount>0&&A.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+A.morphTextureStride:"",A.morphTargetsCount>0&&A.isWebGL2?"#define MORPHTARGETS_COUNT "+A.morphTargetsCount:"",A.doubleSided?"#define DOUBLE_SIDED":"",A.flipSided?"#define FLIP_SIDED":"",A.shadowMapEnabled?"#define USE_SHADOWMAP":"",A.shadowMapEnabled?"#define "+o:"",A.sizeAttenuation?"#define USE_SIZEATTENUATION":"",A.numLightProbes>0?"#define USE_LIGHT_PROBES":"",A.useLegacyLights?"#define LEGACY_LIGHTS":"",A.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",A.logarithmicDepthBuffer&&A.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ui).join(`
`),v=[p,rh(A),"#define SHADER_TYPE "+A.shaderType,"#define SHADER_NAME "+A.shaderName,m,A.useFog&&A.fog?"#define USE_FOG":"",A.useFog&&A.fogExp2?"#define FOG_EXP2":"",A.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",A.map?"#define USE_MAP":"",A.matcap?"#define USE_MATCAP":"",A.envMap?"#define USE_ENVMAP":"",A.envMap?"#define "+l:"",A.envMap?"#define "+c:"",A.envMap?"#define "+u:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",A.lightMap?"#define USE_LIGHTMAP":"",A.aoMap?"#define USE_AOMAP":"",A.bumpMap?"#define USE_BUMPMAP":"",A.normalMap?"#define USE_NORMALMAP":"",A.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",A.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",A.emissiveMap?"#define USE_EMISSIVEMAP":"",A.anisotropy?"#define USE_ANISOTROPY":"",A.anisotropyMap?"#define USE_ANISOTROPYMAP":"",A.clearcoat?"#define USE_CLEARCOAT":"",A.clearcoatMap?"#define USE_CLEARCOATMAP":"",A.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",A.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",A.iridescence?"#define USE_IRIDESCENCE":"",A.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",A.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",A.specularMap?"#define USE_SPECULARMAP":"",A.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",A.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",A.roughnessMap?"#define USE_ROUGHNESSMAP":"",A.metalnessMap?"#define USE_METALNESSMAP":"",A.alphaMap?"#define USE_ALPHAMAP":"",A.alphaTest?"#define USE_ALPHATEST":"",A.alphaHash?"#define USE_ALPHAHASH":"",A.sheen?"#define USE_SHEEN":"",A.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",A.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",A.transmission?"#define USE_TRANSMISSION":"",A.transmissionMap?"#define USE_TRANSMISSIONMAP":"",A.thicknessMap?"#define USE_THICKNESSMAP":"",A.vertexTangents&&A.flatShading===!1?"#define USE_TANGENT":"",A.vertexColors||A.instancingColor?"#define USE_COLOR":"",A.vertexAlphas?"#define USE_COLOR_ALPHA":"",A.vertexUv1s?"#define USE_UV1":"",A.vertexUv2s?"#define USE_UV2":"",A.vertexUv3s?"#define USE_UV3":"",A.pointsUvs?"#define USE_POINTS_UV":"",A.gradientMap?"#define USE_GRADIENTMAP":"",A.flatShading?"#define FLAT_SHADED":"",A.doubleSided?"#define DOUBLE_SIDED":"",A.flipSided?"#define FLIP_SIDED":"",A.shadowMapEnabled?"#define USE_SHADOWMAP":"",A.shadowMapEnabled?"#define "+o:"",A.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",A.numLightProbes>0?"#define USE_LIGHT_PROBES":"",A.useLegacyLights?"#define LEGACY_LIGHTS":"",A.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",A.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",A.logarithmicDepthBuffer&&A.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",A.toneMapping!==gn?"#define TONE_MAPPING":"",A.toneMapping!==gn?ke.tonemapping_pars_fragment:"",A.toneMapping!==gn?jx("toneMapping",A.toneMapping):"",A.dithering?"#define DITHERING":"",A.opaque?"#define OPAQUE":"",ke.colorspace_pars_fragment,Zx("linearToOutputTexel",A.outputColorSpace),A.useDepthPacking?"#define DEPTH_PACKING "+A.depthPacking:"",`
`].filter(Ui).join(`
`)),s=ol(s),s=th(s,A),s=nh(s,A),a=ol(a),a=th(a,A),a=nh(a,A),s=ih(s),a=ih(a),A.isWebGL2&&A.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,f=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,v=["precision mediump sampler2DArray;","#define varying in",A.glslVersion===vu?"":"layout(location = 0) out highp vec4 pc_fragColor;",A.glslVersion===vu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const C=w+f+s,b=w+v+a,U=eh(i,i.VERTEX_SHADER,C),S=eh(i,i.FRAGMENT_SHADER,b);i.attachShader(d,U),i.attachShader(d,S),A.index0AttributeName!==void 0?i.bindAttribLocation(d,0,A.index0AttributeName):A.morphTargets===!0&&i.bindAttribLocation(d,0,"position"),i.linkProgram(d);function H(K){if(n.debug.checkShaderErrors){const W=i.getProgramInfoLog(d).trim(),T=i.getShaderInfoLog(U).trim(),G=i.getShaderInfoLog(S).trim();let R=!0,Y=!0;if(i.getProgramParameter(d,i.LINK_STATUS)===!1)if(R=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(i,d,U,S);else{const X=Ah(i,U,"vertex"),J=Ah(i,S,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(d,i.VALIDATE_STATUS)+`

Material Name: `+K.name+`
Material Type: `+K.type+`

Program Info Log: `+W+`
`+X+`
`+J)}else W!==""?console.warn("THREE.WebGLProgram: Program Info Log:",W):(T===""||G==="")&&(Y=!1);Y&&(K.diagnostics={runnable:R,programLog:W,vertexShader:{log:T,prefix:f},fragmentShader:{log:G,prefix:v}})}i.deleteShader(U),i.deleteShader(S),z=new Is(i,d),B=tU(i,d)}let z;this.getUniforms=function(){return z===void 0&&H(this),z};let B;this.getAttributes=function(){return B===void 0&&H(this),B};let M=A.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(d,Xx)),M},this.destroy=function(){t.releaseStatesOfProgram(this),i.deleteProgram(d),this.program=void 0},this.type=A.shaderType,this.name=A.shaderName,this.id=Yx++,this.cacheKey=e,this.usedTimes=1,this.program=d,this.vertexShader=U,this.fragmentShader=S,this}let dU=0;class pU{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const A=e.vertexShader,t=e.fragmentShader,i=this._getShaderStage(A),r=this._getShaderStage(t),s=this._getShaderCacheForMaterial(e);return s.has(i)===!1&&(s.add(i),i.usedTimes++),s.has(r)===!1&&(s.add(r),r.usedTimes++),this}remove(e){const A=this.materialCache.get(e);for(const t of A)t.usedTimes--,t.usedTimes===0&&this.shaderCache.delete(t.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const A=this.materialCache;let t=A.get(e);return t===void 0&&(t=new Set,A.set(e,t)),t}_getShaderStage(e){const A=this.shaderCache;let t=A.get(e);return t===void 0&&(t=new gU(e),A.set(e,t)),t}}class gU{constructor(e){this.id=dU++,this.code=e,this.usedTimes=0}}function mU(n,e,A,t,i,r,s){const a=new xl,o=new pU,l=new Set,c=[],u=i.isWebGL2,h=i.logarithmicDepthBuffer,p=i.vertexTextures;let g=i.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function d(B){return l.add(B),B===0?"uv":`uv${B}`}function f(B,M,K,W,T){const G=W.fog,R=T.geometry,Y=B.isMeshStandardMaterial?W.environment:null,X=(B.isMeshStandardMaterial?A:e).get(B.envMap||Y),J=X&&X.mapping===ha?X.image.height:null,q=m[B.type];B.precision!==null&&(g=i.getMaxPrecision(B.precision),g!==B.precision&&console.warn("THREE.WebGLProgram.getParameters:",B.precision,"not supported, using",g,"instead."));const Ae=R.morphAttributes.position||R.morphAttributes.normal||R.morphAttributes.color,ae=Ae!==void 0?Ae.length:0;let ve=0;R.morphAttributes.position!==void 0&&(ve=1),R.morphAttributes.normal!==void 0&&(ve=2),R.morphAttributes.color!==void 0&&(ve=3);let N,Z,fe,Ee;if(q){const Je=yt[q];N=Je.vertexShader,Z=Je.fragmentShader}else N=B.vertexShader,Z=B.fragmentShader,o.update(B),fe=o.getVertexShaderID(B),Ee=o.getFragmentShaderID(B);const Te=n.getRenderTarget(),Be=T.isInstancedMesh===!0,Ze=T.isBatchedMesh===!0,He=!!B.map,L=!!B.matcap,BA=!!X,Se=!!B.aoMap,Le=!!B.lightMap,Ce=!!B.bumpMap,aA=!!B.normalMap,Pe=!!B.displacementMap,x=!!B.emissiveMap,_=!!B.metalnessMap,D=!!B.roughnessMap,ie=B.anisotropy>0,j=B.clearcoat>0,te=B.iridescence>0,_e=B.sheen>0,ce=B.transmission>0,me=ie&&!!B.anisotropyMap,be=j&&!!B.clearcoatMap,Oe=j&&!!B.clearcoatNormalMap,$=j&&!!B.clearcoatRoughnessMap,eA=te&&!!B.iridescenceMap,Ke=te&&!!B.iridescenceThicknessMap,Re=_e&&!!B.sheenColorMap,Ue=_e&&!!B.sheenRoughnessMap,pe=!!B.specularMap,Ge=!!B.specularColorMap,F=!!B.specularIntensityMap,se=ce&&!!B.transmissionMap,ue=ce&&!!B.thicknessMap,ye=!!B.gradientMap,y=!!B.alphaMap,ne=B.alphaTest>0,ee=!!B.alphaHash,we=!!B.extensions;let Me=gn;B.toneMapped&&(Te===null||Te.isXRRenderTarget===!0)&&(Me=n.toneMapping);const je={isWebGL2:u,shaderID:q,shaderType:B.type,shaderName:B.name,vertexShader:N,fragmentShader:Z,defines:B.defines,customVertexShaderID:fe,customFragmentShaderID:Ee,isRawShaderMaterial:B.isRawShaderMaterial===!0,glslVersion:B.glslVersion,precision:g,batching:Ze,instancing:Be,instancingColor:Be&&T.instanceColor!==null,supportsVertexTextures:p,outputColorSpace:Te===null?n.outputColorSpace:Te.isXRRenderTarget===!0?Te.texture.colorSpace:Yt,alphaToCoverage:!!B.alphaToCoverage,map:He,matcap:L,envMap:BA,envMapMode:BA&&X.mapping,envMapCubeUVHeight:J,aoMap:Se,lightMap:Le,bumpMap:Ce,normalMap:aA,displacementMap:p&&Pe,emissiveMap:x,normalMapObjectSpace:aA&&B.normalMapType===uw,normalMapTangentSpace:aA&&B.normalMapType===cw,metalnessMap:_,roughnessMap:D,anisotropy:ie,anisotropyMap:me,clearcoat:j,clearcoatMap:be,clearcoatNormalMap:Oe,clearcoatRoughnessMap:$,iridescence:te,iridescenceMap:eA,iridescenceThicknessMap:Ke,sheen:_e,sheenColorMap:Re,sheenRoughnessMap:Ue,specularMap:pe,specularColorMap:Ge,specularIntensityMap:F,transmission:ce,transmissionMap:se,thicknessMap:ue,gradientMap:ye,opaque:B.transparent===!1&&B.blending===Si&&B.alphaToCoverage===!1,alphaMap:y,alphaTest:ne,alphaHash:ee,combine:B.combine,mapUv:He&&d(B.map.channel),aoMapUv:Se&&d(B.aoMap.channel),lightMapUv:Le&&d(B.lightMap.channel),bumpMapUv:Ce&&d(B.bumpMap.channel),normalMapUv:aA&&d(B.normalMap.channel),displacementMapUv:Pe&&d(B.displacementMap.channel),emissiveMapUv:x&&d(B.emissiveMap.channel),metalnessMapUv:_&&d(B.metalnessMap.channel),roughnessMapUv:D&&d(B.roughnessMap.channel),anisotropyMapUv:me&&d(B.anisotropyMap.channel),clearcoatMapUv:be&&d(B.clearcoatMap.channel),clearcoatNormalMapUv:Oe&&d(B.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:$&&d(B.clearcoatRoughnessMap.channel),iridescenceMapUv:eA&&d(B.iridescenceMap.channel),iridescenceThicknessMapUv:Ke&&d(B.iridescenceThicknessMap.channel),sheenColorMapUv:Re&&d(B.sheenColorMap.channel),sheenRoughnessMapUv:Ue&&d(B.sheenRoughnessMap.channel),specularMapUv:pe&&d(B.specularMap.channel),specularColorMapUv:Ge&&d(B.specularColorMap.channel),specularIntensityMapUv:F&&d(B.specularIntensityMap.channel),transmissionMapUv:se&&d(B.transmissionMap.channel),thicknessMapUv:ue&&d(B.thicknessMap.channel),alphaMapUv:y&&d(B.alphaMap.channel),vertexTangents:!!R.attributes.tangent&&(aA||ie),vertexColors:B.vertexColors,vertexAlphas:B.vertexColors===!0&&!!R.attributes.color&&R.attributes.color.itemSize===4,pointsUvs:T.isPoints===!0&&!!R.attributes.uv&&(He||y),fog:!!G,useFog:B.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:B.flatShading===!0,sizeAttenuation:B.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:T.isSkinnedMesh===!0,morphTargets:R.morphAttributes.position!==void 0,morphNormals:R.morphAttributes.normal!==void 0,morphColors:R.morphAttributes.color!==void 0,morphTargetsCount:ae,morphTextureStride:ve,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:B.dithering,shadowMapEnabled:n.shadowMap.enabled&&K.length>0,shadowMapType:n.shadowMap.type,toneMapping:Me,useLegacyLights:n._useLegacyLights,decodeVideoTexture:He&&B.map.isVideoTexture===!0&&nA.getTransfer(B.map.colorSpace)===oA,premultipliedAlpha:B.premultipliedAlpha,doubleSided:B.side===gt,flipSided:B.side===XA,useDepthPacking:B.depthPacking>=0,depthPacking:B.depthPacking||0,index0AttributeName:B.index0AttributeName,extensionDerivatives:we&&B.extensions.derivatives===!0,extensionFragDepth:we&&B.extensions.fragDepth===!0,extensionDrawBuffers:we&&B.extensions.drawBuffers===!0,extensionShaderTextureLOD:we&&B.extensions.shaderTextureLOD===!0,extensionClipCullDistance:we&&B.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:we&&B.extensions.multiDraw===!0&&t.has("WEBGL_multi_draw"),rendererExtensionFragDepth:u||t.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||t.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||t.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:B.customProgramCacheKey()};return je.vertexUv1s=l.has(1),je.vertexUv2s=l.has(2),je.vertexUv3s=l.has(3),l.clear(),je}function v(B){const M=[];if(B.shaderID?M.push(B.shaderID):(M.push(B.customVertexShaderID),M.push(B.customFragmentShaderID)),B.defines!==void 0)for(const K in B.defines)M.push(K),M.push(B.defines[K]);return B.isRawShaderMaterial===!1&&(w(M,B),C(M,B),M.push(n.outputColorSpace)),M.push(B.customProgramCacheKey),M.join()}function w(B,M){B.push(M.precision),B.push(M.outputColorSpace),B.push(M.envMapMode),B.push(M.envMapCubeUVHeight),B.push(M.mapUv),B.push(M.alphaMapUv),B.push(M.lightMapUv),B.push(M.aoMapUv),B.push(M.bumpMapUv),B.push(M.normalMapUv),B.push(M.displacementMapUv),B.push(M.emissiveMapUv),B.push(M.metalnessMapUv),B.push(M.roughnessMapUv),B.push(M.anisotropyMapUv),B.push(M.clearcoatMapUv),B.push(M.clearcoatNormalMapUv),B.push(M.clearcoatRoughnessMapUv),B.push(M.iridescenceMapUv),B.push(M.iridescenceThicknessMapUv),B.push(M.sheenColorMapUv),B.push(M.sheenRoughnessMapUv),B.push(M.specularMapUv),B.push(M.specularColorMapUv),B.push(M.specularIntensityMapUv),B.push(M.transmissionMapUv),B.push(M.thicknessMapUv),B.push(M.combine),B.push(M.fogExp2),B.push(M.sizeAttenuation),B.push(M.morphTargetsCount),B.push(M.morphAttributeCount),B.push(M.numDirLights),B.push(M.numPointLights),B.push(M.numSpotLights),B.push(M.numSpotLightMaps),B.push(M.numHemiLights),B.push(M.numRectAreaLights),B.push(M.numDirLightShadows),B.push(M.numPointLightShadows),B.push(M.numSpotLightShadows),B.push(M.numSpotLightShadowsWithMaps),B.push(M.numLightProbes),B.push(M.shadowMapType),B.push(M.toneMapping),B.push(M.numClippingPlanes),B.push(M.numClipIntersection),B.push(M.depthPacking)}function C(B,M){a.disableAll(),M.isWebGL2&&a.enable(0),M.supportsVertexTextures&&a.enable(1),M.instancing&&a.enable(2),M.instancingColor&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),B.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.skinning&&a.enable(4),M.morphTargets&&a.enable(5),M.morphNormals&&a.enable(6),M.morphColors&&a.enable(7),M.premultipliedAlpha&&a.enable(8),M.shadowMapEnabled&&a.enable(9),M.useLegacyLights&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.alphaToCoverage&&a.enable(20),B.push(a.mask)}function b(B){const M=m[B.type];let K;if(M){const W=yt[M];K=jw.clone(W.uniforms)}else K=B.uniforms;return K}function U(B,M){let K;for(let W=0,T=c.length;W<T;W++){const G=c[W];if(G.cacheKey===M){K=G,++K.usedTimes;break}}return K===void 0&&(K=new fU(n,M,B,r),c.push(K)),K}function S(B){if(--B.usedTimes===0){const M=c.indexOf(B);c[M]=c[c.length-1],c.pop(),B.destroy()}}function H(B){o.remove(B)}function z(){o.dispose()}return{getParameters:f,getProgramCacheKey:v,getUniforms:b,acquireProgram:U,releaseProgram:S,releaseShaderCache:H,programs:c,dispose:z}}function BU(){let n=new WeakMap;function e(r){let s=n.get(r);return s===void 0&&(s={},n.set(r,s)),s}function A(r){n.delete(r)}function t(r,s,a){n.get(r)[s]=a}function i(){n=new WeakMap}return{get:e,remove:A,update:t,dispose:i}}function _U(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function sh(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function ah(){const n=[];let e=0;const A=[],t=[],i=[];function r(){e=0,A.length=0,t.length=0,i.length=0}function s(u,h,p,g,m,d){let f=n[e];return f===void 0?(f={id:u.id,object:u,geometry:h,material:p,groupOrder:g,renderOrder:u.renderOrder,z:m,group:d},n[e]=f):(f.id=u.id,f.object=u,f.geometry=h,f.material=p,f.groupOrder=g,f.renderOrder=u.renderOrder,f.z=m,f.group=d),e++,f}function a(u,h,p,g,m,d){const f=s(u,h,p,g,m,d);p.transmission>0?t.push(f):p.transparent===!0?i.push(f):A.push(f)}function o(u,h,p,g,m,d){const f=s(u,h,p,g,m,d);p.transmission>0?t.unshift(f):p.transparent===!0?i.unshift(f):A.unshift(f)}function l(u,h){A.length>1&&A.sort(u||_U),t.length>1&&t.sort(h||sh),i.length>1&&i.sort(h||sh)}function c(){for(let u=e,h=n.length;u<h;u++){const p=n[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:A,transmissive:t,transparent:i,init:r,push:a,unshift:o,finish:c,sort:l}}function wU(){let n=new WeakMap;function e(t,i){const r=n.get(t);let s;return r===void 0?(s=new ah,n.set(t,[s])):i>=r.length?(s=new ah,r.push(s)):s=r[i],s}function A(){n=new WeakMap}return{get:e,dispose:A}}function vU(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let A;switch(e.type){case"DirectionalLight":A={direction:new Q,color:new AA};break;case"SpotLight":A={position:new Q,direction:new Q,color:new AA,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":A={position:new Q,color:new AA,distance:0,decay:0};break;case"HemisphereLight":A={direction:new Q,skyColor:new AA,groundColor:new AA};break;case"RectAreaLight":A={color:new AA,position:new Q,halfWidth:new Q,halfHeight:new Q};break}return n[e.id]=A,A}}}function EU(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let A;switch(e.type){case"DirectionalLight":A={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Fe};break;case"SpotLight":A={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Fe};break;case"PointLight":A={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Fe,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=A,A}}}let CU=0;function xU(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function UU(n,e){const A=new vU,t=EU(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new Q);const r=new Q,s=new UA,a=new UA;function o(c,u){let h=0,p=0,g=0;for(let K=0;K<9;K++)i.probe[K].set(0,0,0);let m=0,d=0,f=0,v=0,w=0,C=0,b=0,U=0,S=0,H=0,z=0;c.sort(xU);const B=u===!0?Math.PI:1;for(let K=0,W=c.length;K<W;K++){const T=c[K],G=T.color,R=T.intensity,Y=T.distance,X=T.shadow&&T.shadow.map?T.shadow.map.texture:null;if(T.isAmbientLight)h+=G.r*R*B,p+=G.g*R*B,g+=G.b*R*B;else if(T.isLightProbe){for(let J=0;J<9;J++)i.probe[J].addScaledVector(T.sh.coefficients[J],R);z++}else if(T.isDirectionalLight){const J=A.get(T);if(J.color.copy(T.color).multiplyScalar(T.intensity*B),T.castShadow){const q=T.shadow,Ae=t.get(T);Ae.shadowBias=q.bias,Ae.shadowNormalBias=q.normalBias,Ae.shadowRadius=q.radius,Ae.shadowMapSize=q.mapSize,i.directionalShadow[m]=Ae,i.directionalShadowMap[m]=X,i.directionalShadowMatrix[m]=T.shadow.matrix,C++}i.directional[m]=J,m++}else if(T.isSpotLight){const J=A.get(T);J.position.setFromMatrixPosition(T.matrixWorld),J.color.copy(G).multiplyScalar(R*B),J.distance=Y,J.coneCos=Math.cos(T.angle),J.penumbraCos=Math.cos(T.angle*(1-T.penumbra)),J.decay=T.decay,i.spot[f]=J;const q=T.shadow;if(T.map&&(i.spotLightMap[S]=T.map,S++,q.updateMatrices(T),T.castShadow&&H++),i.spotLightMatrix[f]=q.matrix,T.castShadow){const Ae=t.get(T);Ae.shadowBias=q.bias,Ae.shadowNormalBias=q.normalBias,Ae.shadowRadius=q.radius,Ae.shadowMapSize=q.mapSize,i.spotShadow[f]=Ae,i.spotShadowMap[f]=X,U++}f++}else if(T.isRectAreaLight){const J=A.get(T);J.color.copy(G).multiplyScalar(R),J.halfWidth.set(T.width*.5,0,0),J.halfHeight.set(0,T.height*.5,0),i.rectArea[v]=J,v++}else if(T.isPointLight){const J=A.get(T);if(J.color.copy(T.color).multiplyScalar(T.intensity*B),J.distance=T.distance,J.decay=T.decay,T.castShadow){const q=T.shadow,Ae=t.get(T);Ae.shadowBias=q.bias,Ae.shadowNormalBias=q.normalBias,Ae.shadowRadius=q.radius,Ae.shadowMapSize=q.mapSize,Ae.shadowCameraNear=q.camera.near,Ae.shadowCameraFar=q.camera.far,i.pointShadow[d]=Ae,i.pointShadowMap[d]=X,i.pointShadowMatrix[d]=T.shadow.matrix,b++}i.point[d]=J,d++}else if(T.isHemisphereLight){const J=A.get(T);J.skyColor.copy(T.color).multiplyScalar(R*B),J.groundColor.copy(T.groundColor).multiplyScalar(R*B),i.hemi[w]=J,w++}}v>0&&(e.isWebGL2?n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=le.LTC_FLOAT_1,i.rectAreaLTC2=le.LTC_FLOAT_2):(i.rectAreaLTC1=le.LTC_HALF_1,i.rectAreaLTC2=le.LTC_HALF_2):n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=le.LTC_FLOAT_1,i.rectAreaLTC2=le.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=le.LTC_HALF_1,i.rectAreaLTC2=le.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=h,i.ambient[1]=p,i.ambient[2]=g;const M=i.hash;(M.directionalLength!==m||M.pointLength!==d||M.spotLength!==f||M.rectAreaLength!==v||M.hemiLength!==w||M.numDirectionalShadows!==C||M.numPointShadows!==b||M.numSpotShadows!==U||M.numSpotMaps!==S||M.numLightProbes!==z)&&(i.directional.length=m,i.spot.length=f,i.rectArea.length=v,i.point.length=d,i.hemi.length=w,i.directionalShadow.length=C,i.directionalShadowMap.length=C,i.pointShadow.length=b,i.pointShadowMap.length=b,i.spotShadow.length=U,i.spotShadowMap.length=U,i.directionalShadowMatrix.length=C,i.pointShadowMatrix.length=b,i.spotLightMatrix.length=U+S-H,i.spotLightMap.length=S,i.numSpotLightShadowsWithMaps=H,i.numLightProbes=z,M.directionalLength=m,M.pointLength=d,M.spotLength=f,M.rectAreaLength=v,M.hemiLength=w,M.numDirectionalShadows=C,M.numPointShadows=b,M.numSpotShadows=U,M.numSpotMaps=S,M.numLightProbes=z,i.version=CU++)}function l(c,u){let h=0,p=0,g=0,m=0,d=0;const f=u.matrixWorldInverse;for(let v=0,w=c.length;v<w;v++){const C=c[v];if(C.isDirectionalLight){const b=i.directional[h];b.direction.setFromMatrixPosition(C.matrixWorld),r.setFromMatrixPosition(C.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(f),h++}else if(C.isSpotLight){const b=i.spot[g];b.position.setFromMatrixPosition(C.matrixWorld),b.position.applyMatrix4(f),b.direction.setFromMatrixPosition(C.matrixWorld),r.setFromMatrixPosition(C.target.matrixWorld),b.direction.sub(r),b.direction.transformDirection(f),g++}else if(C.isRectAreaLight){const b=i.rectArea[m];b.position.setFromMatrixPosition(C.matrixWorld),b.position.applyMatrix4(f),a.identity(),s.copy(C.matrixWorld),s.premultiply(f),a.extractRotation(s),b.halfWidth.set(C.width*.5,0,0),b.halfHeight.set(0,C.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),m++}else if(C.isPointLight){const b=i.point[p];b.position.setFromMatrixPosition(C.matrixWorld),b.position.applyMatrix4(f),p++}else if(C.isHemisphereLight){const b=i.hemi[d];b.direction.setFromMatrixPosition(C.matrixWorld),b.direction.transformDirection(f),d++}}}return{setup:o,setupView:l,state:i}}function oh(n,e){const A=new UU(n,e),t=[],i=[];function r(){t.length=0,i.length=0}function s(u){t.push(u)}function a(u){i.push(u)}function o(u){A.setup(t,u)}function l(u){A.setupView(t,u)}return{init:r,state:{lightsArray:t,shadowsArray:i,lights:A},setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function yU(n,e){let A=new WeakMap;function t(r,s=0){const a=A.get(r);let o;return a===void 0?(o=new oh(n,e),A.set(r,[o])):s>=a.length?(o=new oh(n,e),a.push(o)):o=a[s],o}function i(){A=new WeakMap}return{get:t,dispose:i}}class SU extends Ir{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ow,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class MU extends Ir{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const FU=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,bU=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function TU(n,e,A){let t=new Zf;const i=new Fe,r=new Fe,s=new bA,a=new SU({depthPacking:lw}),o=new MU,l={},c=A.maxTextureSize,u={[wn]:XA,[XA]:wn,[gt]:gt},h=new Jt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Fe},radius:{value:4}},vertexShader:FU,fragmentShader:bU}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const g=new It;g.setAttribute("position",new bt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const m=new _t(g,h),d=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ff;let f=this.type;this.render=function(U,S,H){if(d.enabled===!1||d.autoUpdate===!1&&d.needsUpdate===!1||U.length===0)return;const z=n.getRenderTarget(),B=n.getActiveCubeFace(),M=n.getActiveMipmapLevel(),K=n.state;K.setBlending(pn),K.buffers.color.setClear(1,1,1,1),K.buffers.depth.setTest(!0),K.setScissorTest(!1);const W=f!==Vt&&this.type===Vt,T=f===Vt&&this.type!==Vt;for(let G=0,R=U.length;G<R;G++){const Y=U[G],X=Y.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;i.copy(X.mapSize);const J=X.getFrameExtents();if(i.multiply(J),r.copy(X.mapSize),(i.x>c||i.y>c)&&(i.x>c&&(r.x=Math.floor(c/J.x),i.x=r.x*J.x,X.mapSize.x=r.x),i.y>c&&(r.y=Math.floor(c/J.y),i.y=r.y*J.y,X.mapSize.y=r.y)),X.map===null||W===!0||T===!0){const Ae=this.type!==Vt?{minFilter:KA,magFilter:KA}:{};X.map!==null&&X.map.dispose(),X.map=new Wn(i.x,i.y,Ae),X.map.texture.name=Y.name+".shadowMap",X.camera.updateProjectionMatrix()}n.setRenderTarget(X.map),n.clear();const q=X.getViewportCount();for(let Ae=0;Ae<q;Ae++){const ae=X.getViewport(Ae);s.set(r.x*ae.x,r.y*ae.y,r.x*ae.z,r.y*ae.w),K.viewport(s),X.updateMatrices(Y,Ae),t=X.getFrustum(),C(S,H,X.camera,Y,this.type)}X.isPointLightShadow!==!0&&this.type===Vt&&v(X,H),X.needsUpdate=!1}f=this.type,d.needsUpdate=!1,n.setRenderTarget(z,B,M)};function v(U,S){const H=e.update(m);h.defines.VSM_SAMPLES!==U.blurSamples&&(h.defines.VSM_SAMPLES=U.blurSamples,p.defines.VSM_SAMPLES=U.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),U.mapPass===null&&(U.mapPass=new Wn(i.x,i.y)),h.uniforms.shadow_pass.value=U.map.texture,h.uniforms.resolution.value=U.mapSize,h.uniforms.radius.value=U.radius,n.setRenderTarget(U.mapPass),n.clear(),n.renderBufferDirect(S,null,H,h,m,null),p.uniforms.shadow_pass.value=U.mapPass.texture,p.uniforms.resolution.value=U.mapSize,p.uniforms.radius.value=U.radius,n.setRenderTarget(U.map),n.clear(),n.renderBufferDirect(S,null,H,p,m,null)}function w(U,S,H,z){let B=null;const M=H.isPointLight===!0?U.customDistanceMaterial:U.customDepthMaterial;if(M!==void 0)B=M;else if(B=H.isPointLight===!0?o:a,n.localClippingEnabled&&S.clipShadows===!0&&Array.isArray(S.clippingPlanes)&&S.clippingPlanes.length!==0||S.displacementMap&&S.displacementScale!==0||S.alphaMap&&S.alphaTest>0||S.map&&S.alphaTest>0){const K=B.uuid,W=S.uuid;let T=l[K];T===void 0&&(T={},l[K]=T);let G=T[W];G===void 0&&(G=B.clone(),T[W]=G,S.addEventListener("dispose",b)),B=G}if(B.visible=S.visible,B.wireframe=S.wireframe,z===Vt?B.side=S.shadowSide!==null?S.shadowSide:S.side:B.side=S.shadowSide!==null?S.shadowSide:u[S.side],B.alphaMap=S.alphaMap,B.alphaTest=S.alphaTest,B.map=S.map,B.clipShadows=S.clipShadows,B.clippingPlanes=S.clippingPlanes,B.clipIntersection=S.clipIntersection,B.displacementMap=S.displacementMap,B.displacementScale=S.displacementScale,B.displacementBias=S.displacementBias,B.wireframeLinewidth=S.wireframeLinewidth,B.linewidth=S.linewidth,H.isPointLight===!0&&B.isMeshDistanceMaterial===!0){const K=n.properties.get(B);K.light=H}return B}function C(U,S,H,z,B){if(U.visible===!1)return;if(U.layers.test(S.layers)&&(U.isMesh||U.isLine||U.isPoints)&&(U.castShadow||U.receiveShadow&&B===Vt)&&(!U.frustumCulled||t.intersectsObject(U))){U.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,U.matrixWorld);const W=e.update(U),T=U.material;if(Array.isArray(T)){const G=W.groups;for(let R=0,Y=G.length;R<Y;R++){const X=G[R],J=T[X.materialIndex];if(J&&J.visible){const q=w(U,J,z,B);U.onBeforeShadow(n,U,S,H,W,q,X),n.renderBufferDirect(H,null,W,q,U,X),U.onAfterShadow(n,U,S,H,W,q,X)}}}else if(T.visible){const G=w(U,T,z,B);U.onBeforeShadow(n,U,S,H,W,G,null),n.renderBufferDirect(H,null,W,G,U,null),U.onAfterShadow(n,U,S,H,W,G,null)}}const K=U.children;for(let W=0,T=K.length;W<T;W++)C(K[W],S,H,z,B)}function b(U){U.target.removeEventListener("dispose",b);for(const H in l){const z=l[H],B=U.target.uuid;B in z&&(z[B].dispose(),delete z[B])}}}function QU(n,e,A){const t=A.isWebGL2;function i(){let y=!1;const ne=new bA;let ee=null;const we=new bA(0,0,0,0);return{setMask:function(Me){ee!==Me&&!y&&(n.colorMask(Me,Me,Me,Me),ee=Me)},setLocked:function(Me){y=Me},setClear:function(Me,je,Je,rA,yA){yA===!0&&(Me*=rA,je*=rA,Je*=rA),ne.set(Me,je,Je,rA),we.equals(ne)===!1&&(n.clearColor(Me,je,Je,rA),we.copy(ne))},reset:function(){y=!1,ee=null,we.set(-1,0,0,0)}}}function r(){let y=!1,ne=null,ee=null,we=null;return{setTest:function(Me){Me?Be(n.DEPTH_TEST):Ze(n.DEPTH_TEST)},setMask:function(Me){ne!==Me&&!y&&(n.depthMask(Me),ne=Me)},setFunc:function(Me){if(ee!==Me){switch(Me){case O_:n.depthFunc(n.NEVER);break;case N_:n.depthFunc(n.ALWAYS);break;case G_:n.depthFunc(n.LESS);break;case Ws:n.depthFunc(n.LEQUAL);break;case V_:n.depthFunc(n.EQUAL);break;case k_:n.depthFunc(n.GEQUAL);break;case K_:n.depthFunc(n.GREATER);break;case z_:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ee=Me}},setLocked:function(Me){y=Me},setClear:function(Me){we!==Me&&(n.clearDepth(Me),we=Me)},reset:function(){y=!1,ne=null,ee=null,we=null}}}function s(){let y=!1,ne=null,ee=null,we=null,Me=null,je=null,Je=null,rA=null,yA=null;return{setTest:function($e){y||($e?Be(n.STENCIL_TEST):Ze(n.STENCIL_TEST))},setMask:function($e){ne!==$e&&!y&&(n.stencilMask($e),ne=$e)},setFunc:function($e,hA,OA){(ee!==$e||we!==hA||Me!==OA)&&(n.stencilFunc($e,hA,OA),ee=$e,we=hA,Me=OA)},setOp:function($e,hA,OA){(je!==$e||Je!==hA||rA!==OA)&&(n.stencilOp($e,hA,OA),je=$e,Je=hA,rA=OA)},setLocked:function($e){y=$e},setClear:function($e){yA!==$e&&(n.clearStencil($e),yA=$e)},reset:function(){y=!1,ne=null,ee=null,we=null,Me=null,je=null,Je=null,rA=null,yA=null}}}const a=new i,o=new r,l=new s,c=new WeakMap,u=new WeakMap;let h={},p={},g=new WeakMap,m=[],d=null,f=!1,v=null,w=null,C=null,b=null,U=null,S=null,H=null,z=new AA(0,0,0),B=0,M=!1,K=null,W=null,T=null,G=null,R=null;const Y=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,J=0;const q=n.getParameter(n.VERSION);q.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(q)[1]),X=J>=1):q.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),X=J>=2);let Ae=null,ae={};const ve=n.getParameter(n.SCISSOR_BOX),N=n.getParameter(n.VIEWPORT),Z=new bA().fromArray(ve),fe=new bA().fromArray(N);function Ee(y,ne,ee,we){const Me=new Uint8Array(4),je=n.createTexture();n.bindTexture(y,je),n.texParameteri(y,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(y,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Je=0;Je<ee;Je++)t&&(y===n.TEXTURE_3D||y===n.TEXTURE_2D_ARRAY)?n.texImage3D(ne,0,n.RGBA,1,1,we,0,n.RGBA,n.UNSIGNED_BYTE,Me):n.texImage2D(ne+Je,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Me);return je}const Te={};Te[n.TEXTURE_2D]=Ee(n.TEXTURE_2D,n.TEXTURE_2D,1),Te[n.TEXTURE_CUBE_MAP]=Ee(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),t&&(Te[n.TEXTURE_2D_ARRAY]=Ee(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Te[n.TEXTURE_3D]=Ee(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),o.setClear(1),l.setClear(0),Be(n.DEPTH_TEST),o.setFunc(Ws),Pe(!1),x(Gc),Be(n.CULL_FACE),Ce(pn);function Be(y){h[y]!==!0&&(n.enable(y),h[y]=!0)}function Ze(y){h[y]!==!1&&(n.disable(y),h[y]=!1)}function He(y,ne){return p[y]!==ne?(n.bindFramebuffer(y,ne),p[y]=ne,t&&(y===n.DRAW_FRAMEBUFFER&&(p[n.FRAMEBUFFER]=ne),y===n.FRAMEBUFFER&&(p[n.DRAW_FRAMEBUFFER]=ne)),!0):!1}function L(y,ne){let ee=m,we=!1;if(y)if(ee=g.get(ne),ee===void 0&&(ee=[],g.set(ne,ee)),y.isWebGLMultipleRenderTargets){const Me=y.texture;if(ee.length!==Me.length||ee[0]!==n.COLOR_ATTACHMENT0){for(let je=0,Je=Me.length;je<Je;je++)ee[je]=n.COLOR_ATTACHMENT0+je;ee.length=Me.length,we=!0}}else ee[0]!==n.COLOR_ATTACHMENT0&&(ee[0]=n.COLOR_ATTACHMENT0,we=!0);else ee[0]!==n.BACK&&(ee[0]=n.BACK,we=!0);we&&(A.isWebGL2?n.drawBuffers(ee):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ee))}function BA(y){return d!==y?(n.useProgram(y),d=y,!0):!1}const Se={[bn]:n.FUNC_ADD,[x_]:n.FUNC_SUBTRACT,[U_]:n.FUNC_REVERSE_SUBTRACT};if(t)Se[zc]=n.MIN,Se[Wc]=n.MAX;else{const y=e.get("EXT_blend_minmax");y!==null&&(Se[zc]=y.MIN_EXT,Se[Wc]=y.MAX_EXT)}const Le={[y_]:n.ZERO,[S_]:n.ONE,[M_]:n.SRC_COLOR,[el]:n.SRC_ALPHA,[L_]:n.SRC_ALPHA_SATURATE,[Q_]:n.DST_COLOR,[b_]:n.DST_ALPHA,[F_]:n.ONE_MINUS_SRC_COLOR,[Al]:n.ONE_MINUS_SRC_ALPHA,[I_]:n.ONE_MINUS_DST_COLOR,[T_]:n.ONE_MINUS_DST_ALPHA,[R_]:n.CONSTANT_COLOR,[D_]:n.ONE_MINUS_CONSTANT_COLOR,[H_]:n.CONSTANT_ALPHA,[P_]:n.ONE_MINUS_CONSTANT_ALPHA};function Ce(y,ne,ee,we,Me,je,Je,rA,yA,$e){if(y===pn){f===!0&&(Ze(n.BLEND),f=!1);return}if(f===!1&&(Be(n.BLEND),f=!0),y!==C_){if(y!==v||$e!==M){if((w!==bn||U!==bn)&&(n.blendEquation(n.FUNC_ADD),w=bn,U=bn),$e)switch(y){case Si:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Vc:n.blendFunc(n.ONE,n.ONE);break;case kc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Kc:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",y);break}else switch(y){case Si:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Vc:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case kc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Kc:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",y);break}C=null,b=null,S=null,H=null,z.set(0,0,0),B=0,v=y,M=$e}return}Me=Me||ne,je=je||ee,Je=Je||we,(ne!==w||Me!==U)&&(n.blendEquationSeparate(Se[ne],Se[Me]),w=ne,U=Me),(ee!==C||we!==b||je!==S||Je!==H)&&(n.blendFuncSeparate(Le[ee],Le[we],Le[je],Le[Je]),C=ee,b=we,S=je,H=Je),(rA.equals(z)===!1||yA!==B)&&(n.blendColor(rA.r,rA.g,rA.b,yA),z.copy(rA),B=yA),v=y,M=!1}function aA(y,ne){y.side===gt?Ze(n.CULL_FACE):Be(n.CULL_FACE);let ee=y.side===XA;ne&&(ee=!ee),Pe(ee),y.blending===Si&&y.transparent===!1?Ce(pn):Ce(y.blending,y.blendEquation,y.blendSrc,y.blendDst,y.blendEquationAlpha,y.blendSrcAlpha,y.blendDstAlpha,y.blendColor,y.blendAlpha,y.premultipliedAlpha),o.setFunc(y.depthFunc),o.setTest(y.depthTest),o.setMask(y.depthWrite),a.setMask(y.colorWrite);const we=y.stencilWrite;l.setTest(we),we&&(l.setMask(y.stencilWriteMask),l.setFunc(y.stencilFunc,y.stencilRef,y.stencilFuncMask),l.setOp(y.stencilFail,y.stencilZFail,y.stencilZPass)),D(y.polygonOffset,y.polygonOffsetFactor,y.polygonOffsetUnits),y.alphaToCoverage===!0?Be(n.SAMPLE_ALPHA_TO_COVERAGE):Ze(n.SAMPLE_ALPHA_TO_COVERAGE)}function Pe(y){K!==y&&(y?n.frontFace(n.CW):n.frontFace(n.CCW),K=y)}function x(y){y!==w_?(Be(n.CULL_FACE),y!==W&&(y===Gc?n.cullFace(n.BACK):y===v_?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ze(n.CULL_FACE),W=y}function _(y){y!==T&&(X&&n.lineWidth(y),T=y)}function D(y,ne,ee){y?(Be(n.POLYGON_OFFSET_FILL),(G!==ne||R!==ee)&&(n.polygonOffset(ne,ee),G=ne,R=ee)):Ze(n.POLYGON_OFFSET_FILL)}function ie(y){y?Be(n.SCISSOR_TEST):Ze(n.SCISSOR_TEST)}function j(y){y===void 0&&(y=n.TEXTURE0+Y-1),Ae!==y&&(n.activeTexture(y),Ae=y)}function te(y,ne,ee){ee===void 0&&(Ae===null?ee=n.TEXTURE0+Y-1:ee=Ae);let we=ae[ee];we===void 0&&(we={type:void 0,texture:void 0},ae[ee]=we),(we.type!==y||we.texture!==ne)&&(Ae!==ee&&(n.activeTexture(ee),Ae=ee),n.bindTexture(y,ne||Te[y]),we.type=y,we.texture=ne)}function _e(){const y=ae[Ae];y!==void 0&&y.type!==void 0&&(n.bindTexture(y.type,null),y.type=void 0,y.texture=void 0)}function ce(){try{n.compressedTexImage2D.apply(n,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function me(){try{n.compressedTexImage3D.apply(n,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function be(){try{n.texSubImage2D.apply(n,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function Oe(){try{n.texSubImage3D.apply(n,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function $(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function eA(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function Ke(){try{n.texStorage2D.apply(n,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function Re(){try{n.texStorage3D.apply(n,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function Ue(){try{n.texImage2D.apply(n,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function pe(){try{n.texImage3D.apply(n,arguments)}catch(y){console.error("THREE.WebGLState:",y)}}function Ge(y){Z.equals(y)===!1&&(n.scissor(y.x,y.y,y.z,y.w),Z.copy(y))}function F(y){fe.equals(y)===!1&&(n.viewport(y.x,y.y,y.z,y.w),fe.copy(y))}function se(y,ne){let ee=u.get(ne);ee===void 0&&(ee=new WeakMap,u.set(ne,ee));let we=ee.get(y);we===void 0&&(we=n.getUniformBlockIndex(ne,y.name),ee.set(y,we))}function ue(y,ne){const we=u.get(ne).get(y);c.get(ne)!==we&&(n.uniformBlockBinding(ne,we,y.__bindingPointIndex),c.set(ne,we))}function ye(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),t===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},Ae=null,ae={},p={},g=new WeakMap,m=[],d=null,f=!1,v=null,w=null,C=null,b=null,U=null,S=null,H=null,z=new AA(0,0,0),B=0,M=!1,K=null,W=null,T=null,G=null,R=null,Z.set(0,0,n.canvas.width,n.canvas.height),fe.set(0,0,n.canvas.width,n.canvas.height),a.reset(),o.reset(),l.reset()}return{buffers:{color:a,depth:o,stencil:l},enable:Be,disable:Ze,bindFramebuffer:He,drawBuffers:L,useProgram:BA,setBlending:Ce,setMaterial:aA,setFlipSided:Pe,setCullFace:x,setLineWidth:_,setPolygonOffset:D,setScissorTest:ie,activeTexture:j,bindTexture:te,unbindTexture:_e,compressedTexImage2D:ce,compressedTexImage3D:me,texImage2D:Ue,texImage3D:pe,updateUBOMapping:se,uniformBlockBinding:ue,texStorage2D:Ke,texStorage3D:Re,texSubImage2D:be,texSubImage3D:Oe,compressedTexSubImage2D:$,compressedTexSubImage3D:eA,scissor:Ge,viewport:F,reset:ye}}function IU(n,e,A,t,i,r,s){const a=i.isWebGL2,o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new WeakMap;let u;const h=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(x,_){return p?new OffscreenCanvas(x,_):js("canvas")}function m(x,_,D,ie){let j=1;if((x.width>ie||x.height>ie)&&(j=ie/Math.max(x.width,x.height)),j<1||_===!0)if(typeof HTMLImageElement<"u"&&x instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&x instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&x instanceof ImageBitmap){const te=_?Zs:Math.floor,_e=te(j*x.width),ce=te(j*x.height);u===void 0&&(u=g(_e,ce));const me=D?g(_e,ce):u;return me.width=_e,me.height=ce,me.getContext("2d").drawImage(x,0,0,_e,ce),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+x.width+"x"+x.height+") to ("+_e+"x"+ce+")."),me}else return"data"in x&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+x.width+"x"+x.height+")."),x;return x}function d(x){return al(x.width)&&al(x.height)}function f(x){return a?!1:x.wrapS!==mt||x.wrapT!==mt||x.minFilter!==KA&&x.minFilter!==zA}function v(x,_){return x.generateMipmaps&&_&&x.minFilter!==KA&&x.minFilter!==zA}function w(x){n.generateMipmap(x)}function C(x,_,D,ie,j=!1){if(a===!1)return _;if(x!==null){if(n[x]!==void 0)return n[x];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+x+"'")}let te=_;if(_===n.RED&&(D===n.FLOAT&&(te=n.R32F),D===n.HALF_FLOAT&&(te=n.R16F),D===n.UNSIGNED_BYTE&&(te=n.R8)),_===n.RED_INTEGER&&(D===n.UNSIGNED_BYTE&&(te=n.R8UI),D===n.UNSIGNED_SHORT&&(te=n.R16UI),D===n.UNSIGNED_INT&&(te=n.R32UI),D===n.BYTE&&(te=n.R8I),D===n.SHORT&&(te=n.R16I),D===n.INT&&(te=n.R32I)),_===n.RG&&(D===n.FLOAT&&(te=n.RG32F),D===n.HALF_FLOAT&&(te=n.RG16F),D===n.UNSIGNED_BYTE&&(te=n.RG8)),_===n.RGBA){const _e=j?Xs:nA.getTransfer(ie);D===n.FLOAT&&(te=n.RGBA32F),D===n.HALF_FLOAT&&(te=n.RGBA16F),D===n.UNSIGNED_BYTE&&(te=_e===oA?n.SRGB8_ALPHA8:n.RGBA8),D===n.UNSIGNED_SHORT_4_4_4_4&&(te=n.RGBA4),D===n.UNSIGNED_SHORT_5_5_5_1&&(te=n.RGB5_A1)}return(te===n.R16F||te===n.R32F||te===n.RG16F||te===n.RG32F||te===n.RGBA16F||te===n.RGBA32F)&&e.get("EXT_color_buffer_float"),te}function b(x,_,D){return v(x,D)===!0||x.isFramebufferTexture&&x.minFilter!==KA&&x.minFilter!==zA?Math.log2(Math.max(_.width,_.height))+1:x.mipmaps!==void 0&&x.mipmaps.length>0?x.mipmaps.length:x.isCompressedTexture&&Array.isArray(x.image)?_.mipmaps.length:1}function U(x){return x===KA||x===Xc||x===$i?n.NEAREST:n.LINEAR}function S(x){const _=x.target;_.removeEventListener("dispose",S),z(_),_.isVideoTexture&&c.delete(_)}function H(x){const _=x.target;_.removeEventListener("dispose",H),M(_)}function z(x){const _=t.get(x);if(_.__webglInit===void 0)return;const D=x.source,ie=h.get(D);if(ie){const j=ie[_.__cacheKey];j.usedTimes--,j.usedTimes===0&&B(x),Object.keys(ie).length===0&&h.delete(D)}t.remove(x)}function B(x){const _=t.get(x);n.deleteTexture(_.__webglTexture);const D=x.source,ie=h.get(D);delete ie[_.__cacheKey],s.memory.textures--}function M(x){const _=x.texture,D=t.get(x),ie=t.get(_);if(ie.__webglTexture!==void 0&&(n.deleteTexture(ie.__webglTexture),s.memory.textures--),x.depthTexture&&x.depthTexture.dispose(),x.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(D.__webglFramebuffer[j]))for(let te=0;te<D.__webglFramebuffer[j].length;te++)n.deleteFramebuffer(D.__webglFramebuffer[j][te]);else n.deleteFramebuffer(D.__webglFramebuffer[j]);D.__webglDepthbuffer&&n.deleteRenderbuffer(D.__webglDepthbuffer[j])}else{if(Array.isArray(D.__webglFramebuffer))for(let j=0;j<D.__webglFramebuffer.length;j++)n.deleteFramebuffer(D.__webglFramebuffer[j]);else n.deleteFramebuffer(D.__webglFramebuffer);if(D.__webglDepthbuffer&&n.deleteRenderbuffer(D.__webglDepthbuffer),D.__webglMultisampledFramebuffer&&n.deleteFramebuffer(D.__webglMultisampledFramebuffer),D.__webglColorRenderbuffer)for(let j=0;j<D.__webglColorRenderbuffer.length;j++)D.__webglColorRenderbuffer[j]&&n.deleteRenderbuffer(D.__webglColorRenderbuffer[j]);D.__webglDepthRenderbuffer&&n.deleteRenderbuffer(D.__webglDepthRenderbuffer)}if(x.isWebGLMultipleRenderTargets)for(let j=0,te=_.length;j<te;j++){const _e=t.get(_[j]);_e.__webglTexture&&(n.deleteTexture(_e.__webglTexture),s.memory.textures--),t.remove(_[j])}t.remove(_),t.remove(x)}let K=0;function W(){K=0}function T(){const x=K;return x>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+x+" texture units while this GPU supports only "+i.maxTextures),K+=1,x}function G(x){const _=[];return _.push(x.wrapS),_.push(x.wrapT),_.push(x.wrapR||0),_.push(x.magFilter),_.push(x.minFilter),_.push(x.anisotropy),_.push(x.internalFormat),_.push(x.format),_.push(x.type),_.push(x.generateMipmaps),_.push(x.premultiplyAlpha),_.push(x.flipY),_.push(x.unpackAlignment),_.push(x.colorSpace),_.join()}function R(x,_){const D=t.get(x);if(x.isVideoTexture&&aA(x),x.isRenderTargetTexture===!1&&x.version>0&&D.__version!==x.version){const ie=x.image;if(ie===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ie.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(D,x,_);return}}A.bindTexture(n.TEXTURE_2D,D.__webglTexture,n.TEXTURE0+_)}function Y(x,_){const D=t.get(x);if(x.version>0&&D.__version!==x.version){Z(D,x,_);return}A.bindTexture(n.TEXTURE_2D_ARRAY,D.__webglTexture,n.TEXTURE0+_)}function X(x,_){const D=t.get(x);if(x.version>0&&D.__version!==x.version){Z(D,x,_);return}A.bindTexture(n.TEXTURE_3D,D.__webglTexture,n.TEXTURE0+_)}function J(x,_){const D=t.get(x);if(x.version>0&&D.__version!==x.version){fe(D,x,_);return}A.bindTexture(n.TEXTURE_CUBE_MAP,D.__webglTexture,n.TEXTURE0+_)}const q={[il]:n.REPEAT,[mt]:n.CLAMP_TO_EDGE,[rl]:n.MIRRORED_REPEAT},Ae={[KA]:n.NEAREST,[Xc]:n.NEAREST_MIPMAP_NEAREST,[$i]:n.NEAREST_MIPMAP_LINEAR,[zA]:n.LINEAR,[qa]:n.LINEAR_MIPMAP_NEAREST,[In]:n.LINEAR_MIPMAP_LINEAR},ae={[hw]:n.NEVER,[Bw]:n.ALWAYS,[fw]:n.LESS,[Nf]:n.LEQUAL,[dw]:n.EQUAL,[mw]:n.GEQUAL,[pw]:n.GREATER,[gw]:n.NOTEQUAL};function ve(x,_,D){if(_.type===Kt&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===zA||_.magFilter===qa||_.magFilter===$i||_.magFilter===In||_.minFilter===zA||_.minFilter===qa||_.minFilter===$i||_.minFilter===In)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),D?(n.texParameteri(x,n.TEXTURE_WRAP_S,q[_.wrapS]),n.texParameteri(x,n.TEXTURE_WRAP_T,q[_.wrapT]),(x===n.TEXTURE_3D||x===n.TEXTURE_2D_ARRAY)&&n.texParameteri(x,n.TEXTURE_WRAP_R,q[_.wrapR]),n.texParameteri(x,n.TEXTURE_MAG_FILTER,Ae[_.magFilter]),n.texParameteri(x,n.TEXTURE_MIN_FILTER,Ae[_.minFilter])):(n.texParameteri(x,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(x,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(x===n.TEXTURE_3D||x===n.TEXTURE_2D_ARRAY)&&n.texParameteri(x,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(_.wrapS!==mt||_.wrapT!==mt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(x,n.TEXTURE_MAG_FILTER,U(_.magFilter)),n.texParameteri(x,n.TEXTURE_MIN_FILTER,U(_.minFilter)),_.minFilter!==KA&&_.minFilter!==zA&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),_.compareFunction&&(n.texParameteri(x,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(x,n.TEXTURE_COMPARE_FUNC,ae[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const ie=e.get("EXT_texture_filter_anisotropic");if(_.magFilter===KA||_.minFilter!==$i&&_.minFilter!==In||_.type===Kt&&e.has("OES_texture_float_linear")===!1||a===!1&&_.type===xr&&e.has("OES_texture_half_float_linear")===!1)return;(_.anisotropy>1||t.get(_).__currentAnisotropy)&&(n.texParameterf(x,ie.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,i.getMaxAnisotropy())),t.get(_).__currentAnisotropy=_.anisotropy)}}function N(x,_){let D=!1;x.__webglInit===void 0&&(x.__webglInit=!0,_.addEventListener("dispose",S));const ie=_.source;let j=h.get(ie);j===void 0&&(j={},h.set(ie,j));const te=G(_);if(te!==x.__cacheKey){j[te]===void 0&&(j[te]={texture:n.createTexture(),usedTimes:0},s.memory.textures++,D=!0),j[te].usedTimes++;const _e=j[x.__cacheKey];_e!==void 0&&(j[x.__cacheKey].usedTimes--,_e.usedTimes===0&&B(_)),x.__cacheKey=te,x.__webglTexture=j[te].texture}return D}function Z(x,_,D){let ie=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(ie=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(ie=n.TEXTURE_3D);const j=N(x,_),te=_.source;A.bindTexture(ie,x.__webglTexture,n.TEXTURE0+D);const _e=t.get(te);if(te.version!==_e.__version||j===!0){A.activeTexture(n.TEXTURE0+D);const ce=nA.getPrimaries(nA.workingColorSpace),me=_.colorSpace===at?null:nA.getPrimaries(_.colorSpace),be=_.colorSpace===at||ce===me?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,be);const Oe=f(_)&&d(_.image)===!1;let $=m(_.image,Oe,!1,i.maxTextureSize);$=Pe(_,$);const eA=d($)||a,Ke=r.convert(_.format,_.colorSpace);let Re=r.convert(_.type),Ue=C(_.internalFormat,Ke,Re,_.colorSpace,_.isVideoTexture);ve(ie,_,eA);let pe;const Ge=_.mipmaps,F=a&&_.isVideoTexture!==!0&&Ue!==Pf,se=_e.__version===void 0||j===!0,ue=te.dataReady,ye=b(_,$,eA);if(_.isDepthTexture)Ue=n.DEPTH_COMPONENT,a?_.type===Kt?Ue=n.DEPTH_COMPONENT32F:_.type===hn?Ue=n.DEPTH_COMPONENT24:_.type===kn?Ue=n.DEPTH24_STENCIL8:Ue=n.DEPTH_COMPONENT16:_.type===Kt&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),_.format===Kn&&Ue===n.DEPTH_COMPONENT&&_.type!==vl&&_.type!==hn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),_.type=hn,Re=r.convert(_.type)),_.format===ki&&Ue===n.DEPTH_COMPONENT&&(Ue=n.DEPTH_STENCIL,_.type!==kn&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),_.type=kn,Re=r.convert(_.type))),se&&(F?A.texStorage2D(n.TEXTURE_2D,1,Ue,$.width,$.height):A.texImage2D(n.TEXTURE_2D,0,Ue,$.width,$.height,0,Ke,Re,null));else if(_.isDataTexture)if(Ge.length>0&&eA){F&&se&&A.texStorage2D(n.TEXTURE_2D,ye,Ue,Ge[0].width,Ge[0].height);for(let y=0,ne=Ge.length;y<ne;y++)pe=Ge[y],F?ue&&A.texSubImage2D(n.TEXTURE_2D,y,0,0,pe.width,pe.height,Ke,Re,pe.data):A.texImage2D(n.TEXTURE_2D,y,Ue,pe.width,pe.height,0,Ke,Re,pe.data);_.generateMipmaps=!1}else F?(se&&A.texStorage2D(n.TEXTURE_2D,ye,Ue,$.width,$.height),ue&&A.texSubImage2D(n.TEXTURE_2D,0,0,0,$.width,$.height,Ke,Re,$.data)):A.texImage2D(n.TEXTURE_2D,0,Ue,$.width,$.height,0,Ke,Re,$.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){F&&se&&A.texStorage3D(n.TEXTURE_2D_ARRAY,ye,Ue,Ge[0].width,Ge[0].height,$.depth);for(let y=0,ne=Ge.length;y<ne;y++)pe=Ge[y],_.format!==Bt?Ke!==null?F?ue&&A.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,y,0,0,0,pe.width,pe.height,$.depth,Ke,pe.data,0,0):A.compressedTexImage3D(n.TEXTURE_2D_ARRAY,y,Ue,pe.width,pe.height,$.depth,0,pe.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):F?ue&&A.texSubImage3D(n.TEXTURE_2D_ARRAY,y,0,0,0,pe.width,pe.height,$.depth,Ke,Re,pe.data):A.texImage3D(n.TEXTURE_2D_ARRAY,y,Ue,pe.width,pe.height,$.depth,0,Ke,Re,pe.data)}else{F&&se&&A.texStorage2D(n.TEXTURE_2D,ye,Ue,Ge[0].width,Ge[0].height);for(let y=0,ne=Ge.length;y<ne;y++)pe=Ge[y],_.format!==Bt?Ke!==null?F?ue&&A.compressedTexSubImage2D(n.TEXTURE_2D,y,0,0,pe.width,pe.height,Ke,pe.data):A.compressedTexImage2D(n.TEXTURE_2D,y,Ue,pe.width,pe.height,0,pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):F?ue&&A.texSubImage2D(n.TEXTURE_2D,y,0,0,pe.width,pe.height,Ke,Re,pe.data):A.texImage2D(n.TEXTURE_2D,y,Ue,pe.width,pe.height,0,Ke,Re,pe.data)}else if(_.isDataArrayTexture)F?(se&&A.texStorage3D(n.TEXTURE_2D_ARRAY,ye,Ue,$.width,$.height,$.depth),ue&&A.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,$.width,$.height,$.depth,Ke,Re,$.data)):A.texImage3D(n.TEXTURE_2D_ARRAY,0,Ue,$.width,$.height,$.depth,0,Ke,Re,$.data);else if(_.isData3DTexture)F?(se&&A.texStorage3D(n.TEXTURE_3D,ye,Ue,$.width,$.height,$.depth),ue&&A.texSubImage3D(n.TEXTURE_3D,0,0,0,0,$.width,$.height,$.depth,Ke,Re,$.data)):A.texImage3D(n.TEXTURE_3D,0,Ue,$.width,$.height,$.depth,0,Ke,Re,$.data);else if(_.isFramebufferTexture){if(se)if(F)A.texStorage2D(n.TEXTURE_2D,ye,Ue,$.width,$.height);else{let y=$.width,ne=$.height;for(let ee=0;ee<ye;ee++)A.texImage2D(n.TEXTURE_2D,ee,Ue,y,ne,0,Ke,Re,null),y>>=1,ne>>=1}}else if(Ge.length>0&&eA){F&&se&&A.texStorage2D(n.TEXTURE_2D,ye,Ue,Ge[0].width,Ge[0].height);for(let y=0,ne=Ge.length;y<ne;y++)pe=Ge[y],F?ue&&A.texSubImage2D(n.TEXTURE_2D,y,0,0,Ke,Re,pe):A.texImage2D(n.TEXTURE_2D,y,Ue,Ke,Re,pe);_.generateMipmaps=!1}else F?(se&&A.texStorage2D(n.TEXTURE_2D,ye,Ue,$.width,$.height),ue&&A.texSubImage2D(n.TEXTURE_2D,0,0,0,Ke,Re,$)):A.texImage2D(n.TEXTURE_2D,0,Ue,Ke,Re,$);v(_,eA)&&w(ie),_e.__version=te.version,_.onUpdate&&_.onUpdate(_)}x.__version=_.version}function fe(x,_,D){if(_.image.length!==6)return;const ie=N(x,_),j=_.source;A.bindTexture(n.TEXTURE_CUBE_MAP,x.__webglTexture,n.TEXTURE0+D);const te=t.get(j);if(j.version!==te.__version||ie===!0){A.activeTexture(n.TEXTURE0+D);const _e=nA.getPrimaries(nA.workingColorSpace),ce=_.colorSpace===at?null:nA.getPrimaries(_.colorSpace),me=_.colorSpace===at||_e===ce?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);const be=_.isCompressedTexture||_.image[0].isCompressedTexture,Oe=_.image[0]&&_.image[0].isDataTexture,$=[];for(let y=0;y<6;y++)!be&&!Oe?$[y]=m(_.image[y],!1,!0,i.maxCubemapSize):$[y]=Oe?_.image[y].image:_.image[y],$[y]=Pe(_,$[y]);const eA=$[0],Ke=d(eA)||a,Re=r.convert(_.format,_.colorSpace),Ue=r.convert(_.type),pe=C(_.internalFormat,Re,Ue,_.colorSpace),Ge=a&&_.isVideoTexture!==!0,F=te.__version===void 0||ie===!0,se=j.dataReady;let ue=b(_,eA,Ke);ve(n.TEXTURE_CUBE_MAP,_,Ke);let ye;if(be){Ge&&F&&A.texStorage2D(n.TEXTURE_CUBE_MAP,ue,pe,eA.width,eA.height);for(let y=0;y<6;y++){ye=$[y].mipmaps;for(let ne=0;ne<ye.length;ne++){const ee=ye[ne];_.format!==Bt?Re!==null?Ge?se&&A.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+y,ne,0,0,ee.width,ee.height,Re,ee.data):A.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+y,ne,pe,ee.width,ee.height,0,ee.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ge?se&&A.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+y,ne,0,0,ee.width,ee.height,Re,Ue,ee.data):A.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+y,ne,pe,ee.width,ee.height,0,Re,Ue,ee.data)}}}else{ye=_.mipmaps,Ge&&F&&(ye.length>0&&ue++,A.texStorage2D(n.TEXTURE_CUBE_MAP,ue,pe,$[0].width,$[0].height));for(let y=0;y<6;y++)if(Oe){Ge?se&&A.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+y,0,0,0,$[y].width,$[y].height,Re,Ue,$[y].data):A.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+y,0,pe,$[y].width,$[y].height,0,Re,Ue,$[y].data);for(let ne=0;ne<ye.length;ne++){const we=ye[ne].image[y].image;Ge?se&&A.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+y,ne+1,0,0,we.width,we.height,Re,Ue,we.data):A.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+y,ne+1,pe,we.width,we.height,0,Re,Ue,we.data)}}else{Ge?se&&A.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+y,0,0,0,Re,Ue,$[y]):A.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+y,0,pe,Re,Ue,$[y]);for(let ne=0;ne<ye.length;ne++){const ee=ye[ne];Ge?se&&A.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+y,ne+1,0,0,Re,Ue,ee.image[y]):A.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+y,ne+1,pe,Re,Ue,ee.image[y])}}}v(_,Ke)&&w(n.TEXTURE_CUBE_MAP),te.__version=j.version,_.onUpdate&&_.onUpdate(_)}x.__version=_.version}function Ee(x,_,D,ie,j,te){const _e=r.convert(D.format,D.colorSpace),ce=r.convert(D.type),me=C(D.internalFormat,_e,ce,D.colorSpace);if(!t.get(_).__hasExternalTextures){const Oe=Math.max(1,_.width>>te),$=Math.max(1,_.height>>te);j===n.TEXTURE_3D||j===n.TEXTURE_2D_ARRAY?A.texImage3D(j,te,me,Oe,$,_.depth,0,_e,ce,null):A.texImage2D(j,te,me,Oe,$,0,_e,ce,null)}A.bindFramebuffer(n.FRAMEBUFFER,x),Ce(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ie,j,t.get(D).__webglTexture,0,Le(_)):(j===n.TEXTURE_2D||j>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,ie,j,t.get(D).__webglTexture,te),A.bindFramebuffer(n.FRAMEBUFFER,null)}function Te(x,_,D){if(n.bindRenderbuffer(n.RENDERBUFFER,x),_.depthBuffer&&!_.stencilBuffer){let ie=a===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(D||Ce(_)){const j=_.depthTexture;j&&j.isDepthTexture&&(j.type===Kt?ie=n.DEPTH_COMPONENT32F:j.type===hn&&(ie=n.DEPTH_COMPONENT24));const te=Le(_);Ce(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,te,ie,_.width,_.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,te,ie,_.width,_.height)}else n.renderbufferStorage(n.RENDERBUFFER,ie,_.width,_.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,x)}else if(_.depthBuffer&&_.stencilBuffer){const ie=Le(_);D&&Ce(_)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,ie,n.DEPTH24_STENCIL8,_.width,_.height):Ce(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ie,n.DEPTH24_STENCIL8,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,x)}else{const ie=_.isWebGLMultipleRenderTargets===!0?_.texture:[_.texture];for(let j=0;j<ie.length;j++){const te=ie[j],_e=r.convert(te.format,te.colorSpace),ce=r.convert(te.type),me=C(te.internalFormat,_e,ce,te.colorSpace),be=Le(_);D&&Ce(_)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,be,me,_.width,_.height):Ce(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,be,me,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,me,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Be(x,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(A.bindFramebuffer(n.FRAMEBUFFER,x),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!t.get(_.depthTexture).__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),R(_.depthTexture,0);const ie=t.get(_.depthTexture).__webglTexture,j=Le(_);if(_.depthTexture.format===Kn)Ce(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ie,0,j):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ie,0);else if(_.depthTexture.format===ki)Ce(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ie,0,j):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ie,0);else throw new Error("Unknown depthTexture format")}function Ze(x){const _=t.get(x),D=x.isWebGLCubeRenderTarget===!0;if(x.depthTexture&&!_.__autoAllocateDepthBuffer){if(D)throw new Error("target.depthTexture not supported in Cube render targets");Be(_.__webglFramebuffer,x)}else if(D){_.__webglDepthbuffer=[];for(let ie=0;ie<6;ie++)A.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[ie]),_.__webglDepthbuffer[ie]=n.createRenderbuffer(),Te(_.__webglDepthbuffer[ie],x,!1)}else A.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer=n.createRenderbuffer(),Te(_.__webglDepthbuffer,x,!1);A.bindFramebuffer(n.FRAMEBUFFER,null)}function He(x,_,D){const ie=t.get(x);_!==void 0&&Ee(ie.__webglFramebuffer,x,x.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),D!==void 0&&Ze(x)}function L(x){const _=x.texture,D=t.get(x),ie=t.get(_);x.addEventListener("dispose",H),x.isWebGLMultipleRenderTargets!==!0&&(ie.__webglTexture===void 0&&(ie.__webglTexture=n.createTexture()),ie.__version=_.version,s.memory.textures++);const j=x.isWebGLCubeRenderTarget===!0,te=x.isWebGLMultipleRenderTargets===!0,_e=d(x)||a;if(j){D.__webglFramebuffer=[];for(let ce=0;ce<6;ce++)if(a&&_.mipmaps&&_.mipmaps.length>0){D.__webglFramebuffer[ce]=[];for(let me=0;me<_.mipmaps.length;me++)D.__webglFramebuffer[ce][me]=n.createFramebuffer()}else D.__webglFramebuffer[ce]=n.createFramebuffer()}else{if(a&&_.mipmaps&&_.mipmaps.length>0){D.__webglFramebuffer=[];for(let ce=0;ce<_.mipmaps.length;ce++)D.__webglFramebuffer[ce]=n.createFramebuffer()}else D.__webglFramebuffer=n.createFramebuffer();if(te)if(i.drawBuffers){const ce=x.texture;for(let me=0,be=ce.length;me<be;me++){const Oe=t.get(ce[me]);Oe.__webglTexture===void 0&&(Oe.__webglTexture=n.createTexture(),s.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&x.samples>0&&Ce(x)===!1){const ce=te?_:[_];D.__webglMultisampledFramebuffer=n.createFramebuffer(),D.__webglColorRenderbuffer=[],A.bindFramebuffer(n.FRAMEBUFFER,D.__webglMultisampledFramebuffer);for(let me=0;me<ce.length;me++){const be=ce[me];D.__webglColorRenderbuffer[me]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,D.__webglColorRenderbuffer[me]);const Oe=r.convert(be.format,be.colorSpace),$=r.convert(be.type),eA=C(be.internalFormat,Oe,$,be.colorSpace,x.isXRRenderTarget===!0),Ke=Le(x);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ke,eA,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+me,n.RENDERBUFFER,D.__webglColorRenderbuffer[me])}n.bindRenderbuffer(n.RENDERBUFFER,null),x.depthBuffer&&(D.__webglDepthRenderbuffer=n.createRenderbuffer(),Te(D.__webglDepthRenderbuffer,x,!0)),A.bindFramebuffer(n.FRAMEBUFFER,null)}}if(j){A.bindTexture(n.TEXTURE_CUBE_MAP,ie.__webglTexture),ve(n.TEXTURE_CUBE_MAP,_,_e);for(let ce=0;ce<6;ce++)if(a&&_.mipmaps&&_.mipmaps.length>0)for(let me=0;me<_.mipmaps.length;me++)Ee(D.__webglFramebuffer[ce][me],x,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,me);else Ee(D.__webglFramebuffer[ce],x,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0);v(_,_e)&&w(n.TEXTURE_CUBE_MAP),A.unbindTexture()}else if(te){const ce=x.texture;for(let me=0,be=ce.length;me<be;me++){const Oe=ce[me],$=t.get(Oe);A.bindTexture(n.TEXTURE_2D,$.__webglTexture),ve(n.TEXTURE_2D,Oe,_e),Ee(D.__webglFramebuffer,x,Oe,n.COLOR_ATTACHMENT0+me,n.TEXTURE_2D,0),v(Oe,_e)&&w(n.TEXTURE_2D)}A.unbindTexture()}else{let ce=n.TEXTURE_2D;if((x.isWebGL3DRenderTarget||x.isWebGLArrayRenderTarget)&&(a?ce=x.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),A.bindTexture(ce,ie.__webglTexture),ve(ce,_,_e),a&&_.mipmaps&&_.mipmaps.length>0)for(let me=0;me<_.mipmaps.length;me++)Ee(D.__webglFramebuffer[me],x,_,n.COLOR_ATTACHMENT0,ce,me);else Ee(D.__webglFramebuffer,x,_,n.COLOR_ATTACHMENT0,ce,0);v(_,_e)&&w(ce),A.unbindTexture()}x.depthBuffer&&Ze(x)}function BA(x){const _=d(x)||a,D=x.isWebGLMultipleRenderTargets===!0?x.texture:[x.texture];for(let ie=0,j=D.length;ie<j;ie++){const te=D[ie];if(v(te,_)){const _e=x.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,ce=t.get(te).__webglTexture;A.bindTexture(_e,ce),w(_e),A.unbindTexture()}}}function Se(x){if(a&&x.samples>0&&Ce(x)===!1){const _=x.isWebGLMultipleRenderTargets?x.texture:[x.texture],D=x.width,ie=x.height;let j=n.COLOR_BUFFER_BIT;const te=[],_e=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ce=t.get(x),me=x.isWebGLMultipleRenderTargets===!0;if(me)for(let be=0;be<_.length;be++)A.bindFramebuffer(n.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.RENDERBUFFER,null),A.bindFramebuffer(n.FRAMEBUFFER,ce.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.TEXTURE_2D,null,0);A.bindFramebuffer(n.READ_FRAMEBUFFER,ce.__webglMultisampledFramebuffer),A.bindFramebuffer(n.DRAW_FRAMEBUFFER,ce.__webglFramebuffer);for(let be=0;be<_.length;be++){te.push(n.COLOR_ATTACHMENT0+be),x.depthBuffer&&te.push(_e);const Oe=ce.__ignoreDepthValues!==void 0?ce.__ignoreDepthValues:!1;if(Oe===!1&&(x.depthBuffer&&(j|=n.DEPTH_BUFFER_BIT),x.stencilBuffer&&(j|=n.STENCIL_BUFFER_BIT)),me&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ce.__webglColorRenderbuffer[be]),Oe===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[_e]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_e])),me){const $=t.get(_[be]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,$,0)}n.blitFramebuffer(0,0,D,ie,0,0,D,ie,j,n.NEAREST),l&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,te)}if(A.bindFramebuffer(n.READ_FRAMEBUFFER,null),A.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),me)for(let be=0;be<_.length;be++){A.bindFramebuffer(n.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.RENDERBUFFER,ce.__webglColorRenderbuffer[be]);const Oe=t.get(_[be]).__webglTexture;A.bindFramebuffer(n.FRAMEBUFFER,ce.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.TEXTURE_2D,Oe,0)}A.bindFramebuffer(n.DRAW_FRAMEBUFFER,ce.__webglMultisampledFramebuffer)}}function Le(x){return Math.min(i.maxSamples,x.samples)}function Ce(x){const _=t.get(x);return a&&x.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function aA(x){const _=s.render.frame;c.get(x)!==_&&(c.set(x,_),x.update())}function Pe(x,_){const D=x.colorSpace,ie=x.format,j=x.type;return x.isCompressedTexture===!0||x.isVideoTexture===!0||x.format===sl||D!==Yt&&D!==at&&(nA.getTransfer(D)===oA?a===!1?e.has("EXT_sRGB")===!0&&ie===Bt?(x.format=sl,x.minFilter=zA,x.generateMipmaps=!1):_=Vf.sRGBToLinear(_):(ie!==Bt||j!==mn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",D)),_}this.allocateTextureUnit=T,this.resetTextureUnits=W,this.setTexture2D=R,this.setTexture2DArray=Y,this.setTexture3D=X,this.setTextureCube=J,this.rebindTextures=He,this.setupRenderTarget=L,this.updateRenderTargetMipmap=BA,this.updateMultisampleRenderTarget=Se,this.setupDepthRenderbuffer=Ze,this.setupFrameBufferTexture=Ee,this.useMultisampledRTT=Ce}function LU(n,e,A){const t=A.isWebGL2;function i(r,s=at){let a;const o=nA.getTransfer(s);if(r===mn)return n.UNSIGNED_BYTE;if(r===If)return n.UNSIGNED_SHORT_4_4_4_4;if(r===Lf)return n.UNSIGNED_SHORT_5_5_5_1;if(r===ew)return n.BYTE;if(r===Aw)return n.SHORT;if(r===vl)return n.UNSIGNED_SHORT;if(r===Qf)return n.INT;if(r===hn)return n.UNSIGNED_INT;if(r===Kt)return n.FLOAT;if(r===xr)return t?n.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===tw)return n.ALPHA;if(r===Bt)return n.RGBA;if(r===nw)return n.LUMINANCE;if(r===iw)return n.LUMINANCE_ALPHA;if(r===Kn)return n.DEPTH_COMPONENT;if(r===ki)return n.DEPTH_STENCIL;if(r===sl)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===rw)return n.RED;if(r===Rf)return n.RED_INTEGER;if(r===sw)return n.RG;if(r===Df)return n.RG_INTEGER;if(r===Hf)return n.RGBA_INTEGER;if(r===Za||r===ja||r===$a||r===eo)if(o===oA)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===Za)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===ja)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===$a)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===eo)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===Za)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===ja)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===$a)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===eo)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Yc||r===Jc||r===qc||r===Zc)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===Yc)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Jc)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===qc)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Zc)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Pf)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===jc||r===$c)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(r===jc)return o===oA?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===$c)return o===oA?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===eu||r===Au||r===tu||r===nu||r===iu||r===ru||r===su||r===au||r===ou||r===lu||r===cu||r===uu||r===hu||r===fu)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(r===eu)return o===oA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Au)return o===oA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===tu)return o===oA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===nu)return o===oA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===iu)return o===oA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===ru)return o===oA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===su)return o===oA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===au)return o===oA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===ou)return o===oA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===lu)return o===oA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===cu)return o===oA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===uu)return o===oA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===hu)return o===oA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===fu)return o===oA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Ao||r===du||r===pu)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(r===Ao)return o===oA?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===du)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===pu)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===aw||r===gu||r===mu||r===Bu)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(r===Ao)return a.COMPRESSED_RED_RGTC1_EXT;if(r===gu)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===mu)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Bu)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===kn?t?n.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):n[r]!==void 0?n[r]:null}return{convert:i}}class RU extends st{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class ur extends JA{constructor(){super(),this.isGroup=!0,this.type="Group"}}const DU={type:"move"};class Uo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ur,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ur,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Q,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Q),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ur,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Q,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Q),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const A=this._hand;if(A)for(const t of e.hand.values())this._getHandJoint(A,t)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,A,t){let i=null,r=null,s=null;const a=this._targetRay,o=this._grip,l=this._hand;if(e&&A.session.visibilityState!=="visible-blurred"){if(l&&e.hand){s=!0;for(const m of e.hand.values()){const d=A.getJointPose(m,t),f=this._getHandJoint(l,m);d!==null&&(f.matrix.fromArray(d.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=d.radius),f.visible=d!==null}const c=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],h=c.position.distanceTo(u.position),p=.02,g=.005;l.inputState.pinching&&h>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else o!==null&&e.gripSpace&&(r=A.getPose(e.gripSpace,t),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1));a!==null&&(i=A.getPose(e.targetRaySpace,t),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(DU)))}return a!==null&&(a.visible=i!==null),o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),this}_getHandJoint(e,A){if(e.joints[A.jointName]===void 0){const t=new ur;t.matrixAutoUpdate=!1,t.visible=!1,e.joints[A.jointName]=t,e.add(t)}return e.joints[A.jointName]}}const HU=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,PU=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepthEXT = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepthEXT = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class OU{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,A,t){if(this.texture===null){const i=new YA,r=e.properties.get(i);r.__webglTexture=A.texture,(A.depthNear!=t.depthNear||A.depthFar!=t.depthFar)&&(this.depthNear=A.depthNear,this.depthFar=A.depthFar),this.texture=i}}render(e,A){if(this.texture!==null){if(this.mesh===null){const t=A.cameras[0].viewport,i=new Jt({extensions:{fragDepth:!0},vertexShader:HU,fragmentShader:PU,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new _t(new ma(20,20),i)}e.render(this.mesh,A)}}reset(){this.texture=null,this.mesh=null}}class NU extends Yn{constructor(e,A){super();const t=this;let i=null,r=1,s=null,a="local-floor",o=1,l=null,c=null,u=null,h=null,p=null,g=null;const m=new OU,d=A.getContextAttributes();let f=null,v=null;const w=[],C=[],b=new Fe;let U=null;const S=new st;S.layers.enable(1),S.viewport=new bA;const H=new st;H.layers.enable(2),H.viewport=new bA;const z=[S,H],B=new RU;B.layers.enable(1),B.layers.enable(2);let M=null,K=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(N){let Z=w[N];return Z===void 0&&(Z=new Uo,w[N]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(N){let Z=w[N];return Z===void 0&&(Z=new Uo,w[N]=Z),Z.getGripSpace()},this.getHand=function(N){let Z=w[N];return Z===void 0&&(Z=new Uo,w[N]=Z),Z.getHandSpace()};function W(N){const Z=C.indexOf(N.inputSource);if(Z===-1)return;const fe=w[Z];fe!==void 0&&(fe.update(N.inputSource,N.frame,l||s),fe.dispatchEvent({type:N.type,data:N.inputSource}))}function T(){i.removeEventListener("select",W),i.removeEventListener("selectstart",W),i.removeEventListener("selectend",W),i.removeEventListener("squeeze",W),i.removeEventListener("squeezestart",W),i.removeEventListener("squeezeend",W),i.removeEventListener("end",T),i.removeEventListener("inputsourceschange",G);for(let N=0;N<w.length;N++){const Z=C[N];Z!==null&&(C[N]=null,w[N].disconnect(Z))}M=null,K=null,m.reset(),e.setRenderTarget(f),p=null,h=null,u=null,i=null,v=null,ve.stop(),t.isPresenting=!1,e.setPixelRatio(U),e.setSize(b.width,b.height,!1),t.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(N){r=N,t.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(N){a=N,t.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||s},this.setReferenceSpace=function(N){l=N},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(N){if(i=N,i!==null){if(f=e.getRenderTarget(),i.addEventListener("select",W),i.addEventListener("selectstart",W),i.addEventListener("selectend",W),i.addEventListener("squeeze",W),i.addEventListener("squeezestart",W),i.addEventListener("squeezeend",W),i.addEventListener("end",T),i.addEventListener("inputsourceschange",G),d.xrCompatible!==!0&&await A.makeXRCompatible(),U=e.getPixelRatio(),e.getSize(b),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const Z={antialias:i.renderState.layers===void 0?d.antialias:!0,alpha:!0,depth:d.depth,stencil:d.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(i,A,Z),i.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),v=new Wn(p.framebufferWidth,p.framebufferHeight,{format:Bt,type:mn,colorSpace:e.outputColorSpace,stencilBuffer:d.stencil})}else{let Z=null,fe=null,Ee=null;d.depth&&(Ee=d.stencil?A.DEPTH24_STENCIL8:A.DEPTH_COMPONENT24,Z=d.stencil?ki:Kn,fe=d.stencil?kn:hn);const Te={colorFormat:A.RGBA8,depthFormat:Ee,scaleFactor:r};u=new XRWebGLBinding(i,A),h=u.createProjectionLayer(Te),i.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),v=new Wn(h.textureWidth,h.textureHeight,{format:Bt,type:mn,depthTexture:new $f(h.textureWidth,h.textureHeight,fe,void 0,void 0,void 0,void 0,void 0,void 0,Z),stencilBuffer:d.stencil,colorSpace:e.outputColorSpace,samples:d.antialias?4:0});const Be=e.properties.get(v);Be.__ignoreDepthValues=h.ignoreDepthValues}v.isXRRenderTarget=!0,this.setFoveation(o),l=null,s=await i.requestReferenceSpace(a),ve.setContext(i),ve.start(),t.isPresenting=!0,t.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function G(N){for(let Z=0;Z<N.removed.length;Z++){const fe=N.removed[Z],Ee=C.indexOf(fe);Ee>=0&&(C[Ee]=null,w[Ee].disconnect(fe))}for(let Z=0;Z<N.added.length;Z++){const fe=N.added[Z];let Ee=C.indexOf(fe);if(Ee===-1){for(let Be=0;Be<w.length;Be++)if(Be>=C.length){C.push(fe),Ee=Be;break}else if(C[Be]===null){C[Be]=fe,Ee=Be;break}if(Ee===-1)break}const Te=w[Ee];Te&&Te.connect(fe)}}const R=new Q,Y=new Q;function X(N,Z,fe){R.setFromMatrixPosition(Z.matrixWorld),Y.setFromMatrixPosition(fe.matrixWorld);const Ee=R.distanceTo(Y),Te=Z.projectionMatrix.elements,Be=fe.projectionMatrix.elements,Ze=Te[14]/(Te[10]-1),He=Te[14]/(Te[10]+1),L=(Te[9]+1)/Te[5],BA=(Te[9]-1)/Te[5],Se=(Te[8]-1)/Te[0],Le=(Be[8]+1)/Be[0],Ce=Ze*Se,aA=Ze*Le,Pe=Ee/(-Se+Le),x=Pe*-Se;Z.matrixWorld.decompose(N.position,N.quaternion,N.scale),N.translateX(x),N.translateZ(Pe),N.matrixWorld.compose(N.position,N.quaternion,N.scale),N.matrixWorldInverse.copy(N.matrixWorld).invert();const _=Ze+Pe,D=He+Pe,ie=Ce-x,j=aA+(Ee-x),te=L*He/D*_,_e=BA*He/D*_;N.projectionMatrix.makePerspective(ie,j,te,_e,_,D),N.projectionMatrixInverse.copy(N.projectionMatrix).invert()}function J(N,Z){Z===null?N.matrixWorld.copy(N.matrix):N.matrixWorld.multiplyMatrices(Z.matrixWorld,N.matrix),N.matrixWorldInverse.copy(N.matrixWorld).invert()}this.updateCamera=function(N){if(i===null)return;m.texture!==null&&(N.near=m.depthNear,N.far=m.depthFar),B.near=H.near=S.near=N.near,B.far=H.far=S.far=N.far,(M!==B.near||K!==B.far)&&(i.updateRenderState({depthNear:B.near,depthFar:B.far}),M=B.near,K=B.far,S.near=M,S.far=K,H.near=M,H.far=K,S.updateProjectionMatrix(),H.updateProjectionMatrix(),N.updateProjectionMatrix());const Z=N.parent,fe=B.cameras;J(B,Z);for(let Ee=0;Ee<fe.length;Ee++)J(fe[Ee],Z);fe.length===2?X(B,S,H):B.projectionMatrix.copy(S.projectionMatrix),q(N,B,Z)};function q(N,Z,fe){fe===null?N.matrix.copy(Z.matrixWorld):(N.matrix.copy(fe.matrixWorld),N.matrix.invert(),N.matrix.multiply(Z.matrixWorld)),N.matrix.decompose(N.position,N.quaternion,N.scale),N.updateMatrixWorld(!0),N.projectionMatrix.copy(Z.projectionMatrix),N.projectionMatrixInverse.copy(Z.projectionMatrixInverse),N.isPerspectiveCamera&&(N.fov=Ur*2*Math.atan(1/N.projectionMatrix.elements[5]),N.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(h===null&&p===null))return o},this.setFoveation=function(N){o=N,h!==null&&(h.fixedFoveation=N),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=N)},this.hasDepthSensing=function(){return m.texture!==null};let Ae=null;function ae(N,Z){if(c=Z.getViewerPose(l||s),g=Z,c!==null){const fe=c.views;p!==null&&(e.setRenderTargetFramebuffer(v,p.framebuffer),e.setRenderTarget(v));let Ee=!1;fe.length!==B.cameras.length&&(B.cameras.length=0,Ee=!0);for(let Be=0;Be<fe.length;Be++){const Ze=fe[Be];let He=null;if(p!==null)He=p.getViewport(Ze);else{const BA=u.getViewSubImage(h,Ze);He=BA.viewport,Be===0&&(e.setRenderTargetTextures(v,BA.colorTexture,h.ignoreDepthValues?void 0:BA.depthStencilTexture),e.setRenderTarget(v))}let L=z[Be];L===void 0&&(L=new st,L.layers.enable(Be),L.viewport=new bA,z[Be]=L),L.matrix.fromArray(Ze.transform.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale),L.projectionMatrix.fromArray(Ze.projectionMatrix),L.projectionMatrixInverse.copy(L.projectionMatrix).invert(),L.viewport.set(He.x,He.y,He.width,He.height),Be===0&&(B.matrix.copy(L.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),Ee===!0&&B.cameras.push(L)}const Te=i.enabledFeatures;if(Te&&Te.includes("depth-sensing")){const Be=u.getDepthInformation(fe[0]);Be&&Be.isValid&&Be.texture&&m.init(e,Be,i.renderState)}}for(let fe=0;fe<w.length;fe++){const Ee=C[fe],Te=w[fe];Ee!==null&&Te!==void 0&&Te.update(Ee,Z,l||s)}m.render(e,B),Ae&&Ae(N,Z),Z.detectedPlanes&&t.dispatchEvent({type:"planesdetected",data:Z}),g=null}const ve=new jf;ve.setAnimationLoop(ae),this.setAnimationLoop=function(N){Ae=N},this.dispose=function(){}}}function GU(n,e){function A(d,f){d.matrixAutoUpdate===!0&&d.updateMatrix(),f.value.copy(d.matrix)}function t(d,f){f.color.getRGB(d.fogColor.value,Yf(n)),f.isFog?(d.fogNear.value=f.near,d.fogFar.value=f.far):f.isFogExp2&&(d.fogDensity.value=f.density)}function i(d,f,v,w,C){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(d,f):f.isMeshToonMaterial?(r(d,f),u(d,f)):f.isMeshPhongMaterial?(r(d,f),c(d,f)):f.isMeshStandardMaterial?(r(d,f),h(d,f),f.isMeshPhysicalMaterial&&p(d,f,C)):f.isMeshMatcapMaterial?(r(d,f),g(d,f)):f.isMeshDepthMaterial?r(d,f):f.isMeshDistanceMaterial?(r(d,f),m(d,f)):f.isMeshNormalMaterial?r(d,f):f.isLineBasicMaterial?(s(d,f),f.isLineDashedMaterial&&a(d,f)):f.isPointsMaterial?o(d,f,v,w):f.isSpriteMaterial?l(d,f):f.isShadowMaterial?(d.color.value.copy(f.color),d.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(d,f){d.opacity.value=f.opacity,f.color&&d.diffuse.value.copy(f.color),f.emissive&&d.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(d.map.value=f.map,A(f.map,d.mapTransform)),f.alphaMap&&(d.alphaMap.value=f.alphaMap,A(f.alphaMap,d.alphaMapTransform)),f.bumpMap&&(d.bumpMap.value=f.bumpMap,A(f.bumpMap,d.bumpMapTransform),d.bumpScale.value=f.bumpScale,f.side===XA&&(d.bumpScale.value*=-1)),f.normalMap&&(d.normalMap.value=f.normalMap,A(f.normalMap,d.normalMapTransform),d.normalScale.value.copy(f.normalScale),f.side===XA&&d.normalScale.value.negate()),f.displacementMap&&(d.displacementMap.value=f.displacementMap,A(f.displacementMap,d.displacementMapTransform),d.displacementScale.value=f.displacementScale,d.displacementBias.value=f.displacementBias),f.emissiveMap&&(d.emissiveMap.value=f.emissiveMap,A(f.emissiveMap,d.emissiveMapTransform)),f.specularMap&&(d.specularMap.value=f.specularMap,A(f.specularMap,d.specularMapTransform)),f.alphaTest>0&&(d.alphaTest.value=f.alphaTest);const v=e.get(f).envMap;if(v&&(d.envMap.value=v,d.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,d.reflectivity.value=f.reflectivity,d.ior.value=f.ior,d.refractionRatio.value=f.refractionRatio),f.lightMap){d.lightMap.value=f.lightMap;const w=n._useLegacyLights===!0?Math.PI:1;d.lightMapIntensity.value=f.lightMapIntensity*w,A(f.lightMap,d.lightMapTransform)}f.aoMap&&(d.aoMap.value=f.aoMap,d.aoMapIntensity.value=f.aoMapIntensity,A(f.aoMap,d.aoMapTransform))}function s(d,f){d.diffuse.value.copy(f.color),d.opacity.value=f.opacity,f.map&&(d.map.value=f.map,A(f.map,d.mapTransform))}function a(d,f){d.dashSize.value=f.dashSize,d.totalSize.value=f.dashSize+f.gapSize,d.scale.value=f.scale}function o(d,f,v,w){d.diffuse.value.copy(f.color),d.opacity.value=f.opacity,d.size.value=f.size*v,d.scale.value=w*.5,f.map&&(d.map.value=f.map,A(f.map,d.uvTransform)),f.alphaMap&&(d.alphaMap.value=f.alphaMap,A(f.alphaMap,d.alphaMapTransform)),f.alphaTest>0&&(d.alphaTest.value=f.alphaTest)}function l(d,f){d.diffuse.value.copy(f.color),d.opacity.value=f.opacity,d.rotation.value=f.rotation,f.map&&(d.map.value=f.map,A(f.map,d.mapTransform)),f.alphaMap&&(d.alphaMap.value=f.alphaMap,A(f.alphaMap,d.alphaMapTransform)),f.alphaTest>0&&(d.alphaTest.value=f.alphaTest)}function c(d,f){d.specular.value.copy(f.specular),d.shininess.value=Math.max(f.shininess,1e-4)}function u(d,f){f.gradientMap&&(d.gradientMap.value=f.gradientMap)}function h(d,f){d.metalness.value=f.metalness,f.metalnessMap&&(d.metalnessMap.value=f.metalnessMap,A(f.metalnessMap,d.metalnessMapTransform)),d.roughness.value=f.roughness,f.roughnessMap&&(d.roughnessMap.value=f.roughnessMap,A(f.roughnessMap,d.roughnessMapTransform)),e.get(f).envMap&&(d.envMapIntensity.value=f.envMapIntensity)}function p(d,f,v){d.ior.value=f.ior,f.sheen>0&&(d.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),d.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(d.sheenColorMap.value=f.sheenColorMap,A(f.sheenColorMap,d.sheenColorMapTransform)),f.sheenRoughnessMap&&(d.sheenRoughnessMap.value=f.sheenRoughnessMap,A(f.sheenRoughnessMap,d.sheenRoughnessMapTransform))),f.clearcoat>0&&(d.clearcoat.value=f.clearcoat,d.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(d.clearcoatMap.value=f.clearcoatMap,A(f.clearcoatMap,d.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(d.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,A(f.clearcoatRoughnessMap,d.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(d.clearcoatNormalMap.value=f.clearcoatNormalMap,A(f.clearcoatNormalMap,d.clearcoatNormalMapTransform),d.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===XA&&d.clearcoatNormalScale.value.negate())),f.iridescence>0&&(d.iridescence.value=f.iridescence,d.iridescenceIOR.value=f.iridescenceIOR,d.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],d.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(d.iridescenceMap.value=f.iridescenceMap,A(f.iridescenceMap,d.iridescenceMapTransform)),f.iridescenceThicknessMap&&(d.iridescenceThicknessMap.value=f.iridescenceThicknessMap,A(f.iridescenceThicknessMap,d.iridescenceThicknessMapTransform))),f.transmission>0&&(d.transmission.value=f.transmission,d.transmissionSamplerMap.value=v.texture,d.transmissionSamplerSize.value.set(v.width,v.height),f.transmissionMap&&(d.transmissionMap.value=f.transmissionMap,A(f.transmissionMap,d.transmissionMapTransform)),d.thickness.value=f.thickness,f.thicknessMap&&(d.thicknessMap.value=f.thicknessMap,A(f.thicknessMap,d.thicknessMapTransform)),d.attenuationDistance.value=f.attenuationDistance,d.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(d.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(d.anisotropyMap.value=f.anisotropyMap,A(f.anisotropyMap,d.anisotropyMapTransform))),d.specularIntensity.value=f.specularIntensity,d.specularColor.value.copy(f.specularColor),f.specularColorMap&&(d.specularColorMap.value=f.specularColorMap,A(f.specularColorMap,d.specularColorMapTransform)),f.specularIntensityMap&&(d.specularIntensityMap.value=f.specularIntensityMap,A(f.specularIntensityMap,d.specularIntensityMapTransform))}function g(d,f){f.matcap&&(d.matcap.value=f.matcap)}function m(d,f){const v=e.get(f).light;d.referencePosition.value.setFromMatrixPosition(v.matrixWorld),d.nearDistance.value=v.shadow.camera.near,d.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:t,refreshMaterialUniforms:i}}function VU(n,e,A,t){let i={},r={},s=[];const a=A.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function o(v,w){const C=w.program;t.uniformBlockBinding(v,C)}function l(v,w){let C=i[v.id];C===void 0&&(g(v),C=c(v),i[v.id]=C,v.addEventListener("dispose",d));const b=w.program;t.updateUBOMapping(v,b);const U=e.render.frame;r[v.id]!==U&&(h(v),r[v.id]=U)}function c(v){const w=u();v.__bindingPointIndex=w;const C=n.createBuffer(),b=v.__size,U=v.usage;return n.bindBuffer(n.UNIFORM_BUFFER,C),n.bufferData(n.UNIFORM_BUFFER,b,U),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,C),C}function u(){for(let v=0;v<a;v++)if(s.indexOf(v)===-1)return s.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(v){const w=i[v.id],C=v.uniforms,b=v.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let U=0,S=C.length;U<S;U++){const H=Array.isArray(C[U])?C[U]:[C[U]];for(let z=0,B=H.length;z<B;z++){const M=H[z];if(p(M,U,z,b)===!0){const K=M.__offset,W=Array.isArray(M.value)?M.value:[M.value];let T=0;for(let G=0;G<W.length;G++){const R=W[G],Y=m(R);typeof R=="number"||typeof R=="boolean"?(M.__data[0]=R,n.bufferSubData(n.UNIFORM_BUFFER,K+T,M.__data)):R.isMatrix3?(M.__data[0]=R.elements[0],M.__data[1]=R.elements[1],M.__data[2]=R.elements[2],M.__data[3]=0,M.__data[4]=R.elements[3],M.__data[5]=R.elements[4],M.__data[6]=R.elements[5],M.__data[7]=0,M.__data[8]=R.elements[6],M.__data[9]=R.elements[7],M.__data[10]=R.elements[8],M.__data[11]=0):(R.toArray(M.__data,T),T+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,K,M.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(v,w,C,b){const U=v.value,S=w+"_"+C;if(b[S]===void 0)return typeof U=="number"||typeof U=="boolean"?b[S]=U:b[S]=U.clone(),!0;{const H=b[S];if(typeof U=="number"||typeof U=="boolean"){if(H!==U)return b[S]=U,!0}else if(H.equals(U)===!1)return H.copy(U),!0}return!1}function g(v){const w=v.uniforms;let C=0;const b=16;for(let S=0,H=w.length;S<H;S++){const z=Array.isArray(w[S])?w[S]:[w[S]];for(let B=0,M=z.length;B<M;B++){const K=z[B],W=Array.isArray(K.value)?K.value:[K.value];for(let T=0,G=W.length;T<G;T++){const R=W[T],Y=m(R),X=C%b;X!==0&&b-X<Y.boundary&&(C+=b-X),K.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),K.__offset=C,C+=Y.storage}}}const U=C%b;return U>0&&(C+=b-U),v.__size=C,v.__cache={},this}function m(v){const w={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(w.boundary=4,w.storage=4):v.isVector2?(w.boundary=8,w.storage=8):v.isVector3||v.isColor?(w.boundary=16,w.storage=12):v.isVector4?(w.boundary=16,w.storage=16):v.isMatrix3?(w.boundary=48,w.storage=48):v.isMatrix4?(w.boundary=64,w.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),w}function d(v){const w=v.target;w.removeEventListener("dispose",d);const C=s.indexOf(w.__bindingPointIndex);s.splice(C,1),n.deleteBuffer(i[w.id]),delete i[w.id],delete r[w.id]}function f(){for(const v in i)n.deleteBuffer(i[v]);s=[],i={},r={}}return{bind:o,update:l,dispose:f}}class rd{constructor(e={}){const{canvas:A=Lw(),context:t=null,depth:i=!0,stencil:r=!0,alpha:s=!1,antialias:a=!1,premultipliedAlpha:o=!0,preserveDrawingBuffer:l=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let h;t!==null?h=t.getContextAttributes().alpha:h=s;const p=new Uint32Array(4),g=new Int32Array(4);let m=null,d=null;const f=[],v=[];this.domElement=A,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=MA,this._useLegacyLights=!1,this.toneMapping=gn,this.toneMappingExposure=1;const w=this;let C=!1,b=0,U=0,S=null,H=-1,z=null;const B=new bA,M=new bA;let K=null;const W=new AA(0);let T=0,G=A.width,R=A.height,Y=1,X=null,J=null;const q=new bA(0,0,G,R),Ae=new bA(0,0,G,R);let ae=!1;const ve=new Zf;let N=!1,Z=!1,fe=null;const Ee=new UA,Te=new Fe,Be=new Q,Ze={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function He(){return S===null?Y:1}let L=t;function BA(E,I){for(let O=0;O<E.length;O++){const V=E[O],P=A.getContext(V,I);if(P!==null)return P}return null}try{const E={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:o,preserveDrawingBuffer:l,powerPreference:c,failIfMajorPerformanceCaveat:u};if("setAttribute"in A&&A.setAttribute("data-engine",`three.js r${wl}`),A.addEventListener("webglcontextlost",ye,!1),A.addEventListener("webglcontextrestored",y,!1),A.addEventListener("webglcontextcreationerror",ne,!1),L===null){const I=["webgl2","webgl","experimental-webgl"];if(w.isWebGL1Renderer===!0&&I.shift(),L=BA(I,E),L===null)throw BA(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&L instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),L.getShaderPrecisionFormat===void 0&&(L.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let Se,Le,Ce,aA,Pe,x,_,D,ie,j,te,_e,ce,me,be,Oe,$,eA,Ke,Re,Ue,pe,Ge,F;function se(){Se=new JC(L),Le=new VC(L,Se,e),Se.init(Le),pe=new LU(L,Se,Le),Ce=new QU(L,Se,Le),aA=new jC(L),Pe=new BU,x=new IU(L,Se,Ce,Pe,Le,pe,aA),_=new KC(w),D=new YC(w),ie=new rv(L,Le),Ge=new NC(L,Se,ie,Le),j=new qC(L,ie,aA,Ge),te=new tx(L,j,ie,aA),Ke=new Ax(L,Le,x),Oe=new kC(Pe),_e=new mU(w,_,D,Se,Le,Ge,Oe),ce=new GU(w,Pe),me=new wU,be=new yU(Se,Le),eA=new OC(w,_,D,Ce,te,h,o),$=new TU(w,te,Le),F=new VU(L,aA,Le,Ce),Re=new GC(L,Se,aA,Le),Ue=new ZC(L,Se,aA,Le),aA.programs=_e.programs,w.capabilities=Le,w.extensions=Se,w.properties=Pe,w.renderLists=me,w.shadowMap=$,w.state=Ce,w.info=aA}se();const ue=new NU(w,L);this.xr=ue,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const E=Se.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Se.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(E){E!==void 0&&(Y=E,this.setSize(G,R,!1))},this.getSize=function(E){return E.set(G,R)},this.setSize=function(E,I,O=!0){if(ue.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=E,R=I,A.width=Math.floor(E*Y),A.height=Math.floor(I*Y),O===!0&&(A.style.width=E+"px",A.style.height=I+"px"),this.setViewport(0,0,E,I)},this.getDrawingBufferSize=function(E){return E.set(G*Y,R*Y).floor()},this.setDrawingBufferSize=function(E,I,O){G=E,R=I,Y=O,A.width=Math.floor(E*O),A.height=Math.floor(I*O),this.setViewport(0,0,E,I)},this.getCurrentViewport=function(E){return E.copy(B)},this.getViewport=function(E){return E.copy(q)},this.setViewport=function(E,I,O,V){E.isVector4?q.set(E.x,E.y,E.z,E.w):q.set(E,I,O,V),Ce.viewport(B.copy(q).multiplyScalar(Y).floor())},this.getScissor=function(E){return E.copy(Ae)},this.setScissor=function(E,I,O,V){E.isVector4?Ae.set(E.x,E.y,E.z,E.w):Ae.set(E,I,O,V),Ce.scissor(M.copy(Ae).multiplyScalar(Y).floor())},this.getScissorTest=function(){return ae},this.setScissorTest=function(E){Ce.setScissorTest(ae=E)},this.setOpaqueSort=function(E){X=E},this.setTransparentSort=function(E){J=E},this.getClearColor=function(E){return E.copy(eA.getClearColor())},this.setClearColor=function(){eA.setClearColor.apply(eA,arguments)},this.getClearAlpha=function(){return eA.getClearAlpha()},this.setClearAlpha=function(){eA.setClearAlpha.apply(eA,arguments)},this.clear=function(E=!0,I=!0,O=!0){let V=0;if(E){let P=!1;if(S!==null){const ge=S.texture.format;P=ge===Hf||ge===Df||ge===Rf}if(P){const ge=S.texture.type,xe=ge===mn||ge===hn||ge===vl||ge===kn||ge===If||ge===Lf,Qe=eA.getClearColor(),De=eA.getClearAlpha(),ze=Qe.r,Ne=Qe.g,Ve=Qe.b;xe?(p[0]=ze,p[1]=Ne,p[2]=Ve,p[3]=De,L.clearBufferuiv(L.COLOR,0,p)):(g[0]=ze,g[1]=Ne,g[2]=Ve,g[3]=De,L.clearBufferiv(L.COLOR,0,g))}else V|=L.COLOR_BUFFER_BIT}I&&(V|=L.DEPTH_BUFFER_BIT),O&&(V|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){A.removeEventListener("webglcontextlost",ye,!1),A.removeEventListener("webglcontextrestored",y,!1),A.removeEventListener("webglcontextcreationerror",ne,!1),me.dispose(),be.dispose(),Pe.dispose(),_.dispose(),D.dispose(),te.dispose(),Ge.dispose(),F.dispose(),_e.dispose(),ue.dispose(),ue.removeEventListener("sessionstart",yA),ue.removeEventListener("sessionend",$e),fe&&(fe.dispose(),fe=null),hA.stop()};function ye(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function y(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const E=aA.autoReset,I=$.enabled,O=$.autoUpdate,V=$.needsUpdate,P=$.type;se(),aA.autoReset=E,$.enabled=I,$.autoUpdate=O,$.needsUpdate=V,$.type=P}function ne(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function ee(E){const I=E.target;I.removeEventListener("dispose",ee),we(I)}function we(E){Me(E),Pe.remove(E)}function Me(E){const I=Pe.get(E).programs;I!==void 0&&(I.forEach(function(O){_e.releaseProgram(O)}),E.isShaderMaterial&&_e.releaseShaderCache(E))}this.renderBufferDirect=function(E,I,O,V,P,ge){I===null&&(I=Ze);const xe=P.isMesh&&P.matrixWorld.determinant()<0,Qe=dd(E,I,O,V,P);Ce.setMaterial(V,xe);let De=O.index,ze=1;if(V.wireframe===!0){if(De=j.getWireframeAttribute(O),De===void 0)return;ze=2}const Ne=O.drawRange,Ve=O.attributes.position;let fA=Ne.start*ze,ZA=(Ne.start+Ne.count)*ze;ge!==null&&(fA=Math.max(fA,ge.start*ze),ZA=Math.min(ZA,(ge.start+ge.count)*ze)),De!==null?(fA=Math.max(fA,0),ZA=Math.min(ZA,De.count)):Ve!=null&&(fA=Math.max(fA,0),ZA=Math.min(ZA,Ve.count));const EA=ZA-fA;if(EA<0||EA===1/0)return;Ge.setup(P,V,Qe,O,De);let Lt,cA=Re;if(De!==null&&(Lt=ie.get(De),cA=Ue,cA.setIndex(Lt)),P.isMesh)V.wireframe===!0?(Ce.setLineWidth(V.wireframeLinewidth*He()),cA.setMode(L.LINES)):cA.setMode(L.TRIANGLES);else if(P.isLine){let Xe=V.linewidth;Xe===void 0&&(Xe=1),Ce.setLineWidth(Xe*He()),P.isLineSegments?cA.setMode(L.LINES):P.isLineLoop?cA.setMode(L.LINE_LOOP):cA.setMode(L.LINE_STRIP)}else P.isPoints?cA.setMode(L.POINTS):P.isSprite&&cA.setMode(L.TRIANGLES);if(P.isBatchedMesh)cA.renderMultiDraw(P._multiDrawStarts,P._multiDrawCounts,P._multiDrawCount);else if(P.isInstancedMesh)cA.renderInstances(fA,EA,P.count);else if(O.isInstancedBufferGeometry){const Xe=O._maxInstanceCount!==void 0?O._maxInstanceCount:1/0,_a=Math.min(O.instanceCount,Xe);cA.renderInstances(fA,EA,_a)}else cA.render(fA,EA)};function je(E,I,O){E.transparent===!0&&E.side===gt&&E.forceSinglePass===!1?(E.side=XA,E.needsUpdate=!0,Dr(E,I,O),E.side=wn,E.needsUpdate=!0,Dr(E,I,O),E.side=gt):Dr(E,I,O)}this.compile=function(E,I,O=null){O===null&&(O=E),d=be.get(O),d.init(),v.push(d),O.traverseVisible(function(P){P.isLight&&P.layers.test(I.layers)&&(d.pushLight(P),P.castShadow&&d.pushShadow(P))}),E!==O&&E.traverseVisible(function(P){P.isLight&&P.layers.test(I.layers)&&(d.pushLight(P),P.castShadow&&d.pushShadow(P))}),d.setupLights(w._useLegacyLights);const V=new Set;return E.traverse(function(P){const ge=P.material;if(ge)if(Array.isArray(ge))for(let xe=0;xe<ge.length;xe++){const Qe=ge[xe];je(Qe,O,P),V.add(Qe)}else je(ge,O,P),V.add(ge)}),v.pop(),d=null,V},this.compileAsync=function(E,I,O=null){const V=this.compile(E,I,O);return new Promise(P=>{function ge(){if(V.forEach(function(xe){Pe.get(xe).currentProgram.isReady()&&V.delete(xe)}),V.size===0){P(E);return}setTimeout(ge,10)}Se.get("KHR_parallel_shader_compile")!==null?ge():setTimeout(ge,10)})};let Je=null;function rA(E){Je&&Je(E)}function yA(){hA.stop()}function $e(){hA.start()}const hA=new jf;hA.setAnimationLoop(rA),typeof self<"u"&&hA.setContext(self),this.setAnimationLoop=function(E){Je=E,ue.setAnimationLoop(E),E===null?hA.stop():hA.start()},ue.addEventListener("sessionstart",yA),ue.addEventListener("sessionend",$e),this.render=function(E,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),ue.enabled===!0&&ue.isPresenting===!0&&(ue.cameraAutoUpdate===!0&&ue.updateCamera(I),I=ue.getCamera()),E.isScene===!0&&E.onBeforeRender(w,E,I,S),d=be.get(E,v.length),d.init(),v.push(d),Ee.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),ve.setFromProjectionMatrix(Ee),Z=this.localClippingEnabled,N=Oe.init(this.clippingPlanes,Z),m=me.get(E,f.length),m.init(),f.push(m),OA(E,I,0,w.sortObjects),m.finish(),w.sortObjects===!0&&m.sort(X,J),this.info.render.frame++,N===!0&&Oe.beginShadows();const O=d.state.shadowsArray;if($.render(O,E,I),N===!0&&Oe.endShadows(),this.info.autoReset===!0&&this.info.reset(),(ue.enabled===!1||ue.isPresenting===!1||ue.hasDepthSensing()===!1)&&eA.render(m,E),d.setupLights(w._useLegacyLights),I.isArrayCamera){const V=I.cameras;for(let P=0,ge=V.length;P<ge;P++){const xe=V[P];Fl(m,E,xe,xe.viewport)}}else Fl(m,E,I);S!==null&&(x.updateMultisampleRenderTarget(S),x.updateRenderTargetMipmap(S)),E.isScene===!0&&E.onAfterRender(w,E,I),Ge.resetDefaultState(),H=-1,z=null,v.pop(),v.length>0?d=v[v.length-1]:d=null,f.pop(),f.length>0?m=f[f.length-1]:m=null};function OA(E,I,O,V){if(E.visible===!1)return;if(E.layers.test(I.layers)){if(E.isGroup)O=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(I);else if(E.isLight)d.pushLight(E),E.castShadow&&d.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||ve.intersectsSprite(E)){V&&Be.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Ee);const xe=te.update(E),Qe=E.material;Qe.visible&&m.push(E,xe,Qe,O,Be.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||ve.intersectsObject(E))){const xe=te.update(E),Qe=E.material;if(V&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Be.copy(E.boundingSphere.center)):(xe.boundingSphere===null&&xe.computeBoundingSphere(),Be.copy(xe.boundingSphere.center)),Be.applyMatrix4(E.matrixWorld).applyMatrix4(Ee)),Array.isArray(Qe)){const De=xe.groups;for(let ze=0,Ne=De.length;ze<Ne;ze++){const Ve=De[ze],fA=Qe[Ve.materialIndex];fA&&fA.visible&&m.push(E,xe,fA,O,Be.z,Ve)}}else Qe.visible&&m.push(E,xe,Qe,O,Be.z,null)}}const ge=E.children;for(let xe=0,Qe=ge.length;xe<Qe;xe++)OA(ge[xe],I,O,V)}function Fl(E,I,O,V){const P=E.opaque,ge=E.transmissive,xe=E.transparent;d.setupLightsView(O),N===!0&&Oe.setGlobalState(w.clippingPlanes,O),ge.length>0&&fd(P,ge,I,O),V&&Ce.viewport(B.copy(V)),P.length>0&&Rr(P,I,O),ge.length>0&&Rr(ge,I,O),xe.length>0&&Rr(xe,I,O),Ce.buffers.depth.setTest(!0),Ce.buffers.depth.setMask(!0),Ce.buffers.color.setMask(!0),Ce.setPolygonOffset(!1)}function fd(E,I,O,V){if((O.isScene===!0?O.overrideMaterial:null)!==null)return;const ge=Le.isWebGL2;fe===null&&(fe=new Wn(1,1,{generateMipmaps:!0,type:Se.has("EXT_color_buffer_half_float")?xr:mn,minFilter:In,samples:ge?4:0})),w.getDrawingBufferSize(Te),ge?fe.setSize(Te.x,Te.y):fe.setSize(Zs(Te.x),Zs(Te.y));const xe=w.getRenderTarget();w.setRenderTarget(fe),w.getClearColor(W),T=w.getClearAlpha(),T<1&&w.setClearColor(16777215,.5),w.clear();const Qe=w.toneMapping;w.toneMapping=gn,Rr(E,O,V),x.updateMultisampleRenderTarget(fe),x.updateRenderTargetMipmap(fe);let De=!1;for(let ze=0,Ne=I.length;ze<Ne;ze++){const Ve=I[ze],fA=Ve.object,ZA=Ve.geometry,EA=Ve.material,Lt=Ve.group;if(EA.side===gt&&fA.layers.test(V.layers)){const cA=EA.side;EA.side=XA,EA.needsUpdate=!0,bl(fA,O,V,ZA,EA,Lt),EA.side=cA,EA.needsUpdate=!0,De=!0}}De===!0&&(x.updateMultisampleRenderTarget(fe),x.updateRenderTargetMipmap(fe)),w.setRenderTarget(xe),w.setClearColor(W,T),w.toneMapping=Qe}function Rr(E,I,O){const V=I.isScene===!0?I.overrideMaterial:null;for(let P=0,ge=E.length;P<ge;P++){const xe=E[P],Qe=xe.object,De=xe.geometry,ze=V===null?xe.material:V,Ne=xe.group;Qe.layers.test(O.layers)&&bl(Qe,I,O,De,ze,Ne)}}function bl(E,I,O,V,P,ge){E.onBeforeRender(w,I,O,V,P,ge),E.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),P.onBeforeRender(w,I,O,V,E,ge),P.transparent===!0&&P.side===gt&&P.forceSinglePass===!1?(P.side=XA,P.needsUpdate=!0,w.renderBufferDirect(O,I,V,P,E,ge),P.side=wn,P.needsUpdate=!0,w.renderBufferDirect(O,I,V,P,E,ge),P.side=gt):w.renderBufferDirect(O,I,V,P,E,ge),E.onAfterRender(w,I,O,V,P,ge)}function Dr(E,I,O){I.isScene!==!0&&(I=Ze);const V=Pe.get(E),P=d.state.lights,ge=d.state.shadowsArray,xe=P.state.version,Qe=_e.getParameters(E,P.state,ge,I,O),De=_e.getProgramCacheKey(Qe);let ze=V.programs;V.environment=E.isMeshStandardMaterial?I.environment:null,V.fog=I.fog,V.envMap=(E.isMeshStandardMaterial?D:_).get(E.envMap||V.environment),ze===void 0&&(E.addEventListener("dispose",ee),ze=new Map,V.programs=ze);let Ne=ze.get(De);if(Ne!==void 0){if(V.currentProgram===Ne&&V.lightsStateVersion===xe)return Ql(E,Qe),Ne}else Qe.uniforms=_e.getUniforms(E),E.onBuild(O,Qe,w),E.onBeforeCompile(Qe,w),Ne=_e.acquireProgram(Qe,De),ze.set(De,Ne),V.uniforms=Qe.uniforms;const Ve=V.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Ve.clippingPlanes=Oe.uniform),Ql(E,Qe),V.needsLights=gd(E),V.lightsStateVersion=xe,V.needsLights&&(Ve.ambientLightColor.value=P.state.ambient,Ve.lightProbe.value=P.state.probe,Ve.directionalLights.value=P.state.directional,Ve.directionalLightShadows.value=P.state.directionalShadow,Ve.spotLights.value=P.state.spot,Ve.spotLightShadows.value=P.state.spotShadow,Ve.rectAreaLights.value=P.state.rectArea,Ve.ltc_1.value=P.state.rectAreaLTC1,Ve.ltc_2.value=P.state.rectAreaLTC2,Ve.pointLights.value=P.state.point,Ve.pointLightShadows.value=P.state.pointShadow,Ve.hemisphereLights.value=P.state.hemi,Ve.directionalShadowMap.value=P.state.directionalShadowMap,Ve.directionalShadowMatrix.value=P.state.directionalShadowMatrix,Ve.spotShadowMap.value=P.state.spotShadowMap,Ve.spotLightMatrix.value=P.state.spotLightMatrix,Ve.spotLightMap.value=P.state.spotLightMap,Ve.pointShadowMap.value=P.state.pointShadowMap,Ve.pointShadowMatrix.value=P.state.pointShadowMatrix),V.currentProgram=Ne,V.uniformsList=null,Ne}function Tl(E){if(E.uniformsList===null){const I=E.currentProgram.getUniforms();E.uniformsList=Is.seqWithValue(I.seq,E.uniforms)}return E.uniformsList}function Ql(E,I){const O=Pe.get(E);O.outputColorSpace=I.outputColorSpace,O.batching=I.batching,O.instancing=I.instancing,O.instancingColor=I.instancingColor,O.skinning=I.skinning,O.morphTargets=I.morphTargets,O.morphNormals=I.morphNormals,O.morphColors=I.morphColors,O.morphTargetsCount=I.morphTargetsCount,O.numClippingPlanes=I.numClippingPlanes,O.numIntersection=I.numClipIntersection,O.vertexAlphas=I.vertexAlphas,O.vertexTangents=I.vertexTangents,O.toneMapping=I.toneMapping}function dd(E,I,O,V,P){I.isScene!==!0&&(I=Ze),x.resetTextureUnits();const ge=I.fog,xe=V.isMeshStandardMaterial?I.environment:null,Qe=S===null?w.outputColorSpace:S.isXRRenderTarget===!0?S.texture.colorSpace:Yt,De=(V.isMeshStandardMaterial?D:_).get(V.envMap||xe),ze=V.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,Ne=!!O.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Ve=!!O.morphAttributes.position,fA=!!O.morphAttributes.normal,ZA=!!O.morphAttributes.color;let EA=gn;V.toneMapped&&(S===null||S.isXRRenderTarget===!0)&&(EA=w.toneMapping);const Lt=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,cA=Lt!==void 0?Lt.length:0,Xe=Pe.get(V),_a=d.state.lights;if(N===!0&&(Z===!0||E!==z)){const At=E===z&&V.id===H;Oe.setState(V,E,At)}let uA=!1;V.version===Xe.__version?(Xe.needsLights&&Xe.lightsStateVersion!==_a.state.version||Xe.outputColorSpace!==Qe||P.isBatchedMesh&&Xe.batching===!1||!P.isBatchedMesh&&Xe.batching===!0||P.isInstancedMesh&&Xe.instancing===!1||!P.isInstancedMesh&&Xe.instancing===!0||P.isSkinnedMesh&&Xe.skinning===!1||!P.isSkinnedMesh&&Xe.skinning===!0||P.isInstancedMesh&&Xe.instancingColor===!0&&P.instanceColor===null||P.isInstancedMesh&&Xe.instancingColor===!1&&P.instanceColor!==null||Xe.envMap!==De||V.fog===!0&&Xe.fog!==ge||Xe.numClippingPlanes!==void 0&&(Xe.numClippingPlanes!==Oe.numPlanes||Xe.numIntersection!==Oe.numIntersection)||Xe.vertexAlphas!==ze||Xe.vertexTangents!==Ne||Xe.morphTargets!==Ve||Xe.morphNormals!==fA||Xe.morphColors!==ZA||Xe.toneMapping!==EA||Le.isWebGL2===!0&&Xe.morphTargetsCount!==cA)&&(uA=!0):(uA=!0,Xe.__version=V.version);let vn=Xe.currentProgram;uA===!0&&(vn=Dr(V,I,P));let Il=!1,Yi=!1,wa=!1;const TA=vn.getUniforms(),En=Xe.uniforms;if(Ce.useProgram(vn.program)&&(Il=!0,Yi=!0,wa=!0),V.id!==H&&(H=V.id,Yi=!0),Il||z!==E){TA.setValue(L,"projectionMatrix",E.projectionMatrix),TA.setValue(L,"viewMatrix",E.matrixWorldInverse);const At=TA.map.cameraPosition;At!==void 0&&At.setValue(L,Be.setFromMatrixPosition(E.matrixWorld)),Le.logarithmicDepthBuffer&&TA.setValue(L,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&TA.setValue(L,"isOrthographic",E.isOrthographicCamera===!0),z!==E&&(z=E,Yi=!0,wa=!0)}if(P.isSkinnedMesh){TA.setOptional(L,P,"bindMatrix"),TA.setOptional(L,P,"bindMatrixInverse");const At=P.skeleton;At&&(Le.floatVertexTextures?(At.boneTexture===null&&At.computeBoneTexture(),TA.setValue(L,"boneTexture",At.boneTexture,x)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}P.isBatchedMesh&&(TA.setOptional(L,P,"batchingTexture"),TA.setValue(L,"batchingTexture",P._matricesTexture,x));const va=O.morphAttributes;if((va.position!==void 0||va.normal!==void 0||va.color!==void 0&&Le.isWebGL2===!0)&&Ke.update(P,O,vn),(Yi||Xe.receiveShadow!==P.receiveShadow)&&(Xe.receiveShadow=P.receiveShadow,TA.setValue(L,"receiveShadow",P.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(En.envMap.value=De,En.flipEnvMap.value=De.isCubeTexture&&De.isRenderTargetTexture===!1?-1:1),Yi&&(TA.setValue(L,"toneMappingExposure",w.toneMappingExposure),Xe.needsLights&&pd(En,wa),ge&&V.fog===!0&&ce.refreshFogUniforms(En,ge),ce.refreshMaterialUniforms(En,V,Y,R,fe),Is.upload(L,Tl(Xe),En,x)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Is.upload(L,Tl(Xe),En,x),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&TA.setValue(L,"center",P.center),TA.setValue(L,"modelViewMatrix",P.modelViewMatrix),TA.setValue(L,"normalMatrix",P.normalMatrix),TA.setValue(L,"modelMatrix",P.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){const At=V.uniformsGroups;for(let Ea=0,md=At.length;Ea<md;Ea++)if(Le.isWebGL2){const Ll=At[Ea];F.update(Ll,vn),F.bind(Ll,vn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return vn}function pd(E,I){E.ambientLightColor.needsUpdate=I,E.lightProbe.needsUpdate=I,E.directionalLights.needsUpdate=I,E.directionalLightShadows.needsUpdate=I,E.pointLights.needsUpdate=I,E.pointLightShadows.needsUpdate=I,E.spotLights.needsUpdate=I,E.spotLightShadows.needsUpdate=I,E.rectAreaLights.needsUpdate=I,E.hemisphereLights.needsUpdate=I}function gd(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return U},this.getRenderTarget=function(){return S},this.setRenderTargetTextures=function(E,I,O){Pe.get(E.texture).__webglTexture=I,Pe.get(E.depthTexture).__webglTexture=O;const V=Pe.get(E);V.__hasExternalTextures=!0,V.__hasExternalTextures&&(V.__autoAllocateDepthBuffer=O===void 0,V.__autoAllocateDepthBuffer||Se.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),V.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(E,I){const O=Pe.get(E);O.__webglFramebuffer=I,O.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(E,I=0,O=0){S=E,b=I,U=O;let V=!0,P=null,ge=!1,xe=!1;if(E){const De=Pe.get(E);De.__useDefaultFramebuffer!==void 0?(Ce.bindFramebuffer(L.FRAMEBUFFER,null),V=!1):De.__webglFramebuffer===void 0?x.setupRenderTarget(E):De.__hasExternalTextures&&x.rebindTextures(E,Pe.get(E.texture).__webglTexture,Pe.get(E.depthTexture).__webglTexture);const ze=E.texture;(ze.isData3DTexture||ze.isDataArrayTexture||ze.isCompressedArrayTexture)&&(xe=!0);const Ne=Pe.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Ne[I])?P=Ne[I][O]:P=Ne[I],ge=!0):Le.isWebGL2&&E.samples>0&&x.useMultisampledRTT(E)===!1?P=Pe.get(E).__webglMultisampledFramebuffer:Array.isArray(Ne)?P=Ne[O]:P=Ne,B.copy(E.viewport),M.copy(E.scissor),K=E.scissorTest}else B.copy(q).multiplyScalar(Y).floor(),M.copy(Ae).multiplyScalar(Y).floor(),K=ae;if(Ce.bindFramebuffer(L.FRAMEBUFFER,P)&&Le.drawBuffers&&V&&Ce.drawBuffers(E,P),Ce.viewport(B),Ce.scissor(M),Ce.setScissorTest(K),ge){const De=Pe.get(E.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+I,De.__webglTexture,O)}else if(xe){const De=Pe.get(E.texture),ze=I||0;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,De.__webglTexture,O||0,ze)}H=-1},this.readRenderTargetPixels=function(E,I,O,V,P,ge,xe){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Qe=Pe.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&xe!==void 0&&(Qe=Qe[xe]),Qe){Ce.bindFramebuffer(L.FRAMEBUFFER,Qe);try{const De=E.texture,ze=De.format,Ne=De.type;if(ze!==Bt&&pe.convert(ze)!==L.getParameter(L.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Ve=Ne===xr&&(Se.has("EXT_color_buffer_half_float")||Le.isWebGL2&&Se.has("EXT_color_buffer_float"));if(Ne!==mn&&pe.convert(Ne)!==L.getParameter(L.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ne===Kt&&(Le.isWebGL2||Se.has("OES_texture_float")||Se.has("WEBGL_color_buffer_float")))&&!Ve){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=E.width-V&&O>=0&&O<=E.height-P&&L.readPixels(I,O,V,P,pe.convert(ze),pe.convert(Ne),ge)}finally{const De=S!==null?Pe.get(S).__webglFramebuffer:null;Ce.bindFramebuffer(L.FRAMEBUFFER,De)}}},this.copyFramebufferToTexture=function(E,I,O=0){const V=Math.pow(2,-O),P=Math.floor(I.image.width*V),ge=Math.floor(I.image.height*V);x.setTexture2D(I,0),L.copyTexSubImage2D(L.TEXTURE_2D,O,0,0,E.x,E.y,P,ge),Ce.unbindTexture()},this.copyTextureToTexture=function(E,I,O,V=0){const P=I.image.width,ge=I.image.height,xe=pe.convert(O.format),Qe=pe.convert(O.type);x.setTexture2D(O,0),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,O.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,O.unpackAlignment),I.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,V,E.x,E.y,P,ge,xe,Qe,I.image.data):I.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,V,E.x,E.y,I.mipmaps[0].width,I.mipmaps[0].height,xe,I.mipmaps[0].data):L.texSubImage2D(L.TEXTURE_2D,V,E.x,E.y,xe,Qe,I.image),V===0&&O.generateMipmaps&&L.generateMipmap(L.TEXTURE_2D),Ce.unbindTexture()},this.copyTextureToTexture3D=function(E,I,O,V,P=0){if(w.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const ge=E.max.x-E.min.x+1,xe=E.max.y-E.min.y+1,Qe=E.max.z-E.min.z+1,De=pe.convert(V.format),ze=pe.convert(V.type);let Ne;if(V.isData3DTexture)x.setTexture3D(V,0),Ne=L.TEXTURE_3D;else if(V.isDataArrayTexture||V.isCompressedArrayTexture)x.setTexture2DArray(V,0),Ne=L.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,V.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,V.unpackAlignment);const Ve=L.getParameter(L.UNPACK_ROW_LENGTH),fA=L.getParameter(L.UNPACK_IMAGE_HEIGHT),ZA=L.getParameter(L.UNPACK_SKIP_PIXELS),EA=L.getParameter(L.UNPACK_SKIP_ROWS),Lt=L.getParameter(L.UNPACK_SKIP_IMAGES),cA=O.isCompressedTexture?O.mipmaps[P]:O.image;L.pixelStorei(L.UNPACK_ROW_LENGTH,cA.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,cA.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,E.min.x),L.pixelStorei(L.UNPACK_SKIP_ROWS,E.min.y),L.pixelStorei(L.UNPACK_SKIP_IMAGES,E.min.z),O.isDataTexture||O.isData3DTexture?L.texSubImage3D(Ne,P,I.x,I.y,I.z,ge,xe,Qe,De,ze,cA.data):O.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),L.compressedTexSubImage3D(Ne,P,I.x,I.y,I.z,ge,xe,Qe,De,cA.data)):L.texSubImage3D(Ne,P,I.x,I.y,I.z,ge,xe,Qe,De,ze,cA),L.pixelStorei(L.UNPACK_ROW_LENGTH,Ve),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,fA),L.pixelStorei(L.UNPACK_SKIP_PIXELS,ZA),L.pixelStorei(L.UNPACK_SKIP_ROWS,EA),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Lt),P===0&&V.generateMipmaps&&L.generateMipmap(Ne),Ce.unbindTexture()},this.initTexture=function(E){E.isCubeTexture?x.setTextureCube(E,0):E.isData3DTexture?x.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?x.setTexture2DArray(E,0):x.setTexture2D(E,0),Ce.unbindTexture()},this.resetState=function(){b=0,U=0,S=null,Ce.reset(),Ge.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zt}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const A=this.getContext();A.drawingBufferColorSpace=e===El?"display-p3":"srgb",A.unpackColorSpace=nA.workingColorSpace===fa?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===MA?zn:Of}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===zn?MA:Yt}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class kU extends rd{}kU.prototype.isWebGL1Renderer=!0;class KU extends JA{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,A){return super.copy(e,A),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const A=super.toJSON(e);return this.fog!==null&&(A.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(A.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(A.object.backgroundIntensity=this.backgroundIntensity),A}}class sd extends Ir{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new AA(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const lh=new Q,ch=new Q,uh=new UA,yo=new pa,Ss=new da;class zU extends JA{constructor(e=new It,A=new sd){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=A,this.updateMorphTargets()}copy(e,A){return super.copy(e,A),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const A=e.attributes.position,t=[0];for(let i=1,r=A.count;i<r;i++)lh.fromBufferAttribute(A,i-1),ch.fromBufferAttribute(A,i),t[i]=t[i-1],t[i]+=lh.distanceTo(ch);e.setAttribute("lineDistance",new qA(t,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,A){const t=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,s=t.drawRange;if(t.boundingSphere===null&&t.computeBoundingSphere(),Ss.copy(t.boundingSphere),Ss.applyMatrix4(i),Ss.radius+=r,e.ray.intersectsSphere(Ss)===!1)return;uh.copy(i).invert(),yo.copy(e.ray).applyMatrix4(uh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),o=a*a,l=new Q,c=new Q,u=new Q,h=new Q,p=this.isLineSegments?2:1,g=t.index,d=t.attributes.position;if(g!==null){const f=Math.max(0,s.start),v=Math.min(g.count,s.start+s.count);for(let w=f,C=v-1;w<C;w+=p){const b=g.getX(w),U=g.getX(w+1);if(l.fromBufferAttribute(d,b),c.fromBufferAttribute(d,U),yo.distanceSqToSegment(l,c,h,u)>o)continue;h.applyMatrix4(this.matrixWorld);const H=e.ray.origin.distanceTo(h);H<e.near||H>e.far||A.push({distance:H,point:u.clone().applyMatrix4(this.matrixWorld),index:w,face:null,faceIndex:null,object:this})}}else{const f=Math.max(0,s.start),v=Math.min(d.count,s.start+s.count);for(let w=f,C=v-1;w<C;w+=p){if(l.fromBufferAttribute(d,w),c.fromBufferAttribute(d,w+1),yo.distanceSqToSegment(l,c,h,u)>o)continue;h.applyMatrix4(this.matrixWorld);const U=e.ray.origin.distanceTo(h);U<e.near||U>e.far||A.push({distance:U,point:u.clone().applyMatrix4(this.matrixWorld),index:w,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const A=this.geometry.morphAttributes,t=Object.keys(A);if(t.length>0){const i=A[t[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=i.length;r<s;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}const hh=new Q,fh=new Q;class WU extends zU{constructor(e,A){super(e,A),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const A=e.attributes.position,t=[];for(let i=0,r=A.count;i<r;i+=2)hh.fromBufferAttribute(A,i),fh.fromBufferAttribute(A,i+1),t[i]=i===0?0:t[i-1],t[i+1]=t[i]+hh.distanceTo(fh);e.setAttribute("lineDistance",new qA(t,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Sl extends It{constructor(e=1,A=32,t=16,i=0,r=Math.PI*2,s=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:A,heightSegments:t,phiStart:i,phiLength:r,thetaStart:s,thetaLength:a},A=Math.max(3,Math.floor(A)),t=Math.max(2,Math.floor(t));const o=Math.min(s+a,Math.PI);let l=0;const c=[],u=new Q,h=new Q,p=[],g=[],m=[],d=[];for(let f=0;f<=t;f++){const v=[],w=f/t;let C=0;f===0&&s===0?C=.5/A:f===t&&o===Math.PI&&(C=-.5/A);for(let b=0;b<=A;b++){const U=b/A;u.x=-e*Math.cos(i+U*r)*Math.sin(s+w*a),u.y=e*Math.cos(s+w*a),u.z=e*Math.sin(i+U*r)*Math.sin(s+w*a),g.push(u.x,u.y,u.z),h.copy(u).normalize(),m.push(h.x,h.y,h.z),d.push(U+C,1-w),v.push(l++)}c.push(v)}for(let f=0;f<t;f++)for(let v=0;v<A;v++){const w=c[f][v+1],C=c[f][v],b=c[f+1][v],U=c[f+1][v+1];(f!==0||s>0)&&p.push(w,C,U),(f!==t-1||o<Math.PI)&&p.push(C,b,U)}this.setIndex(p),this.setAttribute("position",new qA(g,3)),this.setAttribute("normal",new qA(m,3)),this.setAttribute("uv",new qA(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Sl(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class XU{constructor(e,A,t=0,i=1/0){this.ray=new pa(e,A),this.near=t,this.far=i,this.camera=null,this.layers=new xl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,A){this.ray.set(e,A)}setFromCamera(e,A){A.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(A.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(A).sub(this.ray.origin).normalize(),this.camera=A):A.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(A.near+A.far)/(A.near-A.far)).unproject(A),this.ray.direction.set(0,0,-1).transformDirection(A.matrixWorld),this.camera=A):console.error("THREE.Raycaster: Unsupported camera type: "+A.type)}intersectObject(e,A=!0,t=[]){return ll(e,this,t,A),t.sort(dh),t}intersectObjects(e,A=!0,t=[]){for(let i=0,r=e.length;i<r;i++)ll(e[i],this,t,A);return t.sort(dh),t}}function dh(n,e){return n.distance-e.distance}function ll(n,e,A,t){if(n.layers.test(e.layers)&&n.raycast(e,A),t===!0){const i=n.children;for(let r=0,s=i.length;r<s;r++)ll(i[r],e,A,!0)}}class ph{constructor(e=1,A=0,t=0){return this.radius=e,this.phi=A,this.theta=t,this}set(e,A,t){return this.radius=e,this.phi=A,this.theta=t,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,A,t){return this.radius=Math.sqrt(e*e+A*A+t*t),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,t),this.phi=Math.acos(PA(A/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class YU extends WU{constructor(e=1){const A=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],t=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],i=new It;i.setAttribute("position",new qA(A,3)),i.setAttribute("color",new qA(t,3));const r=new sd({vertexColors:!0,toneMapped:!1});super(i,r),this.type="AxesHelper"}setColors(e,A,t){const i=new AA,r=this.geometry.attributes.color.array;return i.set(e),i.toArray(r,0),i.toArray(r,3),i.set(A),i.toArray(r,6),i.toArray(r,9),i.set(t),i.toArray(r,12),i.toArray(r,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:wl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=wl);const gh={type:"change"},So={type:"start"},mh={type:"end"},Ms=new pa,Bh=new sn,JU=Math.cos(70*Iw.DEG2RAD);class qU extends Yn{constructor(e,A){super(),this.object=e,this.domElement=A,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new Q,this.cursor=new Q,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ai.ROTATE,MIDDLE:Ai.DOLLY,RIGHT:Ai.PAN},this.touches={ONE:ti.ROTATE,TWO:ti.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return a.phi},this.getAzimuthalAngle=function(){return a.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(F){F.addEventListener("keydown",be),this._domElementKeyEvents=F},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",be),this._domElementKeyEvents=null},this.saveState=function(){t.target0.copy(t.target),t.position0.copy(t.object.position),t.zoom0=t.object.zoom},this.reset=function(){t.target.copy(t.target0),t.object.position.copy(t.position0),t.object.zoom=t.zoom0,t.object.updateProjectionMatrix(),t.dispatchEvent(gh),t.update(),r=i.NONE},this.update=function(){const F=new Q,se=new Xn().setFromUnitVectors(e.up,new Q(0,1,0)),ue=se.clone().invert(),ye=new Q,y=new Xn,ne=new Q,ee=2*Math.PI;return function(Me=null){const je=t.object.position;F.copy(je).sub(t.target),F.applyQuaternion(se),a.setFromVector3(F),t.autoRotate&&r===i.NONE&&K(B(Me)),t.enableDamping?(a.theta+=o.theta*t.dampingFactor,a.phi+=o.phi*t.dampingFactor):(a.theta+=o.theta,a.phi+=o.phi);let Je=t.minAzimuthAngle,rA=t.maxAzimuthAngle;isFinite(Je)&&isFinite(rA)&&(Je<-Math.PI?Je+=ee:Je>Math.PI&&(Je-=ee),rA<-Math.PI?rA+=ee:rA>Math.PI&&(rA-=ee),Je<=rA?a.theta=Math.max(Je,Math.min(rA,a.theta)):a.theta=a.theta>(Je+rA)/2?Math.max(Je,a.theta):Math.min(rA,a.theta)),a.phi=Math.max(t.minPolarAngle,Math.min(t.maxPolarAngle,a.phi)),a.makeSafe(),t.enableDamping===!0?t.target.addScaledVector(c,t.dampingFactor):t.target.add(c),t.target.sub(t.cursor),t.target.clampLength(t.minTargetRadius,t.maxTargetRadius),t.target.add(t.cursor),t.zoomToCursor&&U||t.object.isOrthographicCamera?a.radius=q(a.radius):a.radius=q(a.radius*l),F.setFromSpherical(a),F.applyQuaternion(ue),je.copy(t.target).add(F),t.object.lookAt(t.target),t.enableDamping===!0?(o.theta*=1-t.dampingFactor,o.phi*=1-t.dampingFactor,c.multiplyScalar(1-t.dampingFactor)):(o.set(0,0,0),c.set(0,0,0));let yA=!1;if(t.zoomToCursor&&U){let $e=null;if(t.object.isPerspectiveCamera){const hA=F.length();$e=q(hA*l);const OA=hA-$e;t.object.position.addScaledVector(C,OA),t.object.updateMatrixWorld()}else if(t.object.isOrthographicCamera){const hA=new Q(b.x,b.y,0);hA.unproject(t.object),t.object.zoom=Math.max(t.minZoom,Math.min(t.maxZoom,t.object.zoom/l)),t.object.updateProjectionMatrix(),yA=!0;const OA=new Q(b.x,b.y,0);OA.unproject(t.object),t.object.position.sub(OA).add(hA),t.object.updateMatrixWorld(),$e=F.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),t.zoomToCursor=!1;$e!==null&&(this.screenSpacePanning?t.target.set(0,0,-1).transformDirection(t.object.matrix).multiplyScalar($e).add(t.object.position):(Ms.origin.copy(t.object.position),Ms.direction.set(0,0,-1).transformDirection(t.object.matrix),Math.abs(t.object.up.dot(Ms.direction))<JU?e.lookAt(t.target):(Bh.setFromNormalAndCoplanarPoint(t.object.up,t.target),Ms.intersectPlane(Bh,t.target))))}else t.object.isOrthographicCamera&&(yA=l!==1,yA&&(t.object.zoom=Math.max(t.minZoom,Math.min(t.maxZoom,t.object.zoom/l)),t.object.updateProjectionMatrix()));return l=1,U=!1,yA||ye.distanceToSquared(t.object.position)>s||8*(1-y.dot(t.object.quaternion))>s||ne.distanceToSquared(t.target)>0?(t.dispatchEvent(gh),ye.copy(t.object.position),y.copy(t.object.quaternion),ne.copy(t.target),!0):!1}}(),this.dispose=function(){t.domElement.removeEventListener("contextmenu",eA),t.domElement.removeEventListener("pointerdown",x),t.domElement.removeEventListener("pointercancel",D),t.domElement.removeEventListener("wheel",te),t.domElement.removeEventListener("pointermove",_),t.domElement.removeEventListener("pointerup",D),t._domElementKeyEvents!==null&&(t._domElementKeyEvents.removeEventListener("keydown",be),t._domElementKeyEvents=null)};const t=this,i={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let r=i.NONE;const s=1e-6,a=new ph,o=new ph;let l=1;const c=new Q,u=new Fe,h=new Fe,p=new Fe,g=new Fe,m=new Fe,d=new Fe,f=new Fe,v=new Fe,w=new Fe,C=new Q,b=new Fe;let U=!1;const S=[],H={};let z=!1;function B(F){return F!==null?2*Math.PI/60*t.autoRotateSpeed*F:2*Math.PI/60/60*t.autoRotateSpeed}function M(F){const se=Math.abs(F*.01);return Math.pow(.95,t.zoomSpeed*se)}function K(F){o.theta-=F}function W(F){o.phi-=F}const T=function(){const F=new Q;return function(ue,ye){F.setFromMatrixColumn(ye,0),F.multiplyScalar(-ue),c.add(F)}}(),G=function(){const F=new Q;return function(ue,ye){t.screenSpacePanning===!0?F.setFromMatrixColumn(ye,1):(F.setFromMatrixColumn(ye,0),F.crossVectors(t.object.up,F)),F.multiplyScalar(ue),c.add(F)}}(),R=function(){const F=new Q;return function(ue,ye){const y=t.domElement;if(t.object.isPerspectiveCamera){const ne=t.object.position;F.copy(ne).sub(t.target);let ee=F.length();ee*=Math.tan(t.object.fov/2*Math.PI/180),T(2*ue*ee/y.clientHeight,t.object.matrix),G(2*ye*ee/y.clientHeight,t.object.matrix)}else t.object.isOrthographicCamera?(T(ue*(t.object.right-t.object.left)/t.object.zoom/y.clientWidth,t.object.matrix),G(ye*(t.object.top-t.object.bottom)/t.object.zoom/y.clientHeight,t.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),t.enablePan=!1)}}();function Y(F){t.object.isPerspectiveCamera||t.object.isOrthographicCamera?l/=F:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),t.enableZoom=!1)}function X(F){t.object.isPerspectiveCamera||t.object.isOrthographicCamera?l*=F:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),t.enableZoom=!1)}function J(F,se){if(!t.zoomToCursor)return;U=!0;const ue=t.domElement.getBoundingClientRect(),ye=F-ue.left,y=se-ue.top,ne=ue.width,ee=ue.height;b.x=ye/ne*2-1,b.y=-(y/ee)*2+1,C.set(b.x,b.y,1).unproject(t.object).sub(t.object.position).normalize()}function q(F){return Math.max(t.minDistance,Math.min(t.maxDistance,F))}function Ae(F){u.set(F.clientX,F.clientY)}function ae(F){J(F.clientX,F.clientX),f.set(F.clientX,F.clientY)}function ve(F){g.set(F.clientX,F.clientY)}function N(F){h.set(F.clientX,F.clientY),p.subVectors(h,u).multiplyScalar(t.rotateSpeed);const se=t.domElement;K(2*Math.PI*p.x/se.clientHeight),W(2*Math.PI*p.y/se.clientHeight),u.copy(h),t.update()}function Z(F){v.set(F.clientX,F.clientY),w.subVectors(v,f),w.y>0?Y(M(w.y)):w.y<0&&X(M(w.y)),f.copy(v),t.update()}function fe(F){m.set(F.clientX,F.clientY),d.subVectors(m,g).multiplyScalar(t.panSpeed),R(d.x,d.y),g.copy(m),t.update()}function Ee(F){J(F.clientX,F.clientY),F.deltaY<0?X(M(F.deltaY)):F.deltaY>0&&Y(M(F.deltaY)),t.update()}function Te(F){let se=!1;switch(F.code){case t.keys.UP:F.ctrlKey||F.metaKey||F.shiftKey?W(2*Math.PI*t.rotateSpeed/t.domElement.clientHeight):R(0,t.keyPanSpeed),se=!0;break;case t.keys.BOTTOM:F.ctrlKey||F.metaKey||F.shiftKey?W(-2*Math.PI*t.rotateSpeed/t.domElement.clientHeight):R(0,-t.keyPanSpeed),se=!0;break;case t.keys.LEFT:F.ctrlKey||F.metaKey||F.shiftKey?K(2*Math.PI*t.rotateSpeed/t.domElement.clientHeight):R(t.keyPanSpeed,0),se=!0;break;case t.keys.RIGHT:F.ctrlKey||F.metaKey||F.shiftKey?K(-2*Math.PI*t.rotateSpeed/t.domElement.clientHeight):R(-t.keyPanSpeed,0),se=!0;break}se&&(F.preventDefault(),t.update())}function Be(F){if(S.length===1)u.set(F.pageX,F.pageY);else{const se=pe(F),ue=.5*(F.pageX+se.x),ye=.5*(F.pageY+se.y);u.set(ue,ye)}}function Ze(F){if(S.length===1)g.set(F.pageX,F.pageY);else{const se=pe(F),ue=.5*(F.pageX+se.x),ye=.5*(F.pageY+se.y);g.set(ue,ye)}}function He(F){const se=pe(F),ue=F.pageX-se.x,ye=F.pageY-se.y,y=Math.sqrt(ue*ue+ye*ye);f.set(0,y)}function L(F){t.enableZoom&&He(F),t.enablePan&&Ze(F)}function BA(F){t.enableZoom&&He(F),t.enableRotate&&Be(F)}function Se(F){if(S.length==1)h.set(F.pageX,F.pageY);else{const ue=pe(F),ye=.5*(F.pageX+ue.x),y=.5*(F.pageY+ue.y);h.set(ye,y)}p.subVectors(h,u).multiplyScalar(t.rotateSpeed);const se=t.domElement;K(2*Math.PI*p.x/se.clientHeight),W(2*Math.PI*p.y/se.clientHeight),u.copy(h)}function Le(F){if(S.length===1)m.set(F.pageX,F.pageY);else{const se=pe(F),ue=.5*(F.pageX+se.x),ye=.5*(F.pageY+se.y);m.set(ue,ye)}d.subVectors(m,g).multiplyScalar(t.panSpeed),R(d.x,d.y),g.copy(m)}function Ce(F){const se=pe(F),ue=F.pageX-se.x,ye=F.pageY-se.y,y=Math.sqrt(ue*ue+ye*ye);v.set(0,y),w.set(0,Math.pow(v.y/f.y,t.zoomSpeed)),Y(w.y),f.copy(v);const ne=(F.pageX+se.x)*.5,ee=(F.pageY+se.y)*.5;J(ne,ee)}function aA(F){t.enableZoom&&Ce(F),t.enablePan&&Le(F)}function Pe(F){t.enableZoom&&Ce(F),t.enableRotate&&Se(F)}function x(F){t.enabled!==!1&&(S.length===0&&(t.domElement.setPointerCapture(F.pointerId),t.domElement.addEventListener("pointermove",_),t.domElement.addEventListener("pointerup",D)),Ke(F),F.pointerType==="touch"?Oe(F):ie(F))}function _(F){t.enabled!==!1&&(F.pointerType==="touch"?$(F):j(F))}function D(F){switch(Re(F),S.length){case 0:t.domElement.releasePointerCapture(F.pointerId),t.domElement.removeEventListener("pointermove",_),t.domElement.removeEventListener("pointerup",D),t.dispatchEvent(mh),r=i.NONE;break;case 1:const se=S[0],ue=H[se];Oe({pointerId:se,pageX:ue.x,pageY:ue.y});break}}function ie(F){let se;switch(F.button){case 0:se=t.mouseButtons.LEFT;break;case 1:se=t.mouseButtons.MIDDLE;break;case 2:se=t.mouseButtons.RIGHT;break;default:se=-1}switch(se){case Ai.DOLLY:if(t.enableZoom===!1)return;ae(F),r=i.DOLLY;break;case Ai.ROTATE:if(F.ctrlKey||F.metaKey||F.shiftKey){if(t.enablePan===!1)return;ve(F),r=i.PAN}else{if(t.enableRotate===!1)return;Ae(F),r=i.ROTATE}break;case Ai.PAN:if(F.ctrlKey||F.metaKey||F.shiftKey){if(t.enableRotate===!1)return;Ae(F),r=i.ROTATE}else{if(t.enablePan===!1)return;ve(F),r=i.PAN}break;default:r=i.NONE}r!==i.NONE&&t.dispatchEvent(So)}function j(F){switch(r){case i.ROTATE:if(t.enableRotate===!1)return;N(F);break;case i.DOLLY:if(t.enableZoom===!1)return;Z(F);break;case i.PAN:if(t.enablePan===!1)return;fe(F);break}}function te(F){t.enabled===!1||t.enableZoom===!1||r!==i.NONE||(F.preventDefault(),t.dispatchEvent(So),Ee(_e(F)),t.dispatchEvent(mh))}function _e(F){const se=F.deltaMode,ue={clientX:F.clientX,clientY:F.clientY,deltaY:F.deltaY};switch(se){case 1:ue.deltaY*=16;break;case 2:ue.deltaY*=100;break}return F.ctrlKey&&!z&&(ue.deltaY*=10),ue}function ce(F){F.key==="Control"&&(z=!0,t.domElement.getRootNode().addEventListener("keyup",me,{passive:!0,capture:!0}))}function me(F){F.key==="Control"&&(z=!1,t.domElement.getRootNode().removeEventListener("keyup",me,{passive:!0,capture:!0}))}function be(F){t.enabled===!1||t.enablePan===!1||Te(F)}function Oe(F){switch(Ue(F),S.length){case 1:switch(t.touches.ONE){case ti.ROTATE:if(t.enableRotate===!1)return;Be(F),r=i.TOUCH_ROTATE;break;case ti.PAN:if(t.enablePan===!1)return;Ze(F),r=i.TOUCH_PAN;break;default:r=i.NONE}break;case 2:switch(t.touches.TWO){case ti.DOLLY_PAN:if(t.enableZoom===!1&&t.enablePan===!1)return;L(F),r=i.TOUCH_DOLLY_PAN;break;case ti.DOLLY_ROTATE:if(t.enableZoom===!1&&t.enableRotate===!1)return;BA(F),r=i.TOUCH_DOLLY_ROTATE;break;default:r=i.NONE}break;default:r=i.NONE}r!==i.NONE&&t.dispatchEvent(So)}function $(F){switch(Ue(F),r){case i.TOUCH_ROTATE:if(t.enableRotate===!1)return;Se(F),t.update();break;case i.TOUCH_PAN:if(t.enablePan===!1)return;Le(F),t.update();break;case i.TOUCH_DOLLY_PAN:if(t.enableZoom===!1&&t.enablePan===!1)return;aA(F),t.update();break;case i.TOUCH_DOLLY_ROTATE:if(t.enableZoom===!1&&t.enableRotate===!1)return;Pe(F),t.update();break;default:r=i.NONE}}function eA(F){t.enabled!==!1&&F.preventDefault()}function Ke(F){S.push(F.pointerId)}function Re(F){delete H[F.pointerId];for(let se=0;se<S.length;se++)if(S[se]==F.pointerId){S.splice(se,1);return}}function Ue(F){let se=H[F.pointerId];se===void 0&&(se=new Fe,H[F.pointerId]=se),se.set(F.pageX,F.pageY)}function pe(F){const se=F.pointerId===S[0]?S[1]:S[0];return H[se]}t.domElement.addEventListener("contextmenu",eA),t.domElement.addEventListener("pointerdown",x),t.domElement.addEventListener("pointercancel",D),t.domElement.addEventListener("wheel",te,{passive:!1}),t.domElement.getRootNode().addEventListener("keydown",ce,{passive:!0,capture:!0}),this.update()}}var Di,Dn,Ct,Fr;class ad{constructor(e,A={id:"canvas",container:document.body}){We(this,Di);We(this,Dn);We(this,Ct);We(this,Fr);this.model=e,Ie(this,Di,A.id),Ie(this,Dn,A.container)}get container(){return k(this,Dn)}get canvas(){return k(this,Ct)}set canvas(e){if(k(this,Ct)!==void 0)throw Error("Canvas already set");Ie(this,Ct,e)}get domElement(){if(k(this,Ct)===void 0){const e=this.initializeCanvas();k(this,Di)!==void 0&&e.setAttribute("id",k(this,Di)),e.classList.add("sphere");const A=this;let t=!1;return Ie(this,Fr,new MutationObserver(i=>{t&&i.forEach((r,s,a)=>{A.onMutation(r)})})),k(this,Fr).observe(k(this,Dn),{attributes:!0,attributeFilter:["class"]}),k(this,Dn).appendChild(e),t=!0,e}return k(this,Ct)}set visible(e){k(this,Ct)!==void 0&&(k(this,Ct).style.visibility=e?"visible":"hidden")}}Di=new WeakMap,Dn=new WeakMap,Ct=new WeakMap,Fr=new WeakMap;class ZU{constructor(e,A=void 0,t=void 0){this.setSize(e,A,t),window.addEventListener("resize",()=>{this.setSize(e,A,t),this.onResize()})}setSize(e,A,t){const i=Math.min(innerWidth,e.clientWidth),r=Math.min(innerHeight,e.clientHeight);A!==void 0&&(A.aspect=i/r,A.updateProjectionMatrix()),t!==void 0&&(t.setSize(i,r),t.setPixelRatio(window.devicePixelRatio))}onResize(){}}var _r=function(){var n=0,e=document.createElement("div");e.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",e.addEventListener("click",function(c){c.preventDefault(),t(++n%e.children.length)},!1);function A(c){return e.appendChild(c.dom),c}function t(c){for(var u=0;u<e.children.length;u++)e.children[u].style.display=u===c?"block":"none";n=c}var i=(performance||Date).now(),r=i,s=0,a=A(new _r.Panel("FPS","#0ff","#002")),o=A(new _r.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var l=A(new _r.Panel("MB","#f08","#201"));return t(0),{REVISION:16,dom:e,addPanel:A,showPanel:t,begin:function(){i=(performance||Date).now()},end:function(){s++;var c=(performance||Date).now();if(o.update(c-i,200),c>=r+1e3&&(a.update(s*1e3/(c-r),100),r=c,s=0,l)){var u=performance.memory;l.update(u.usedJSHeapSize/1048576,u.jsHeapSizeLimit/1048576)}return c},update:function(){i=this.end()},domElement:e,setMode:t}};_r.Panel=function(n,e,A){var t=1/0,i=0,r=Math.round,s=r(window.devicePixelRatio||1),a=80*s,o=48*s,l=3*s,c=2*s,u=3*s,h=15*s,p=74*s,g=30*s,m=document.createElement("canvas");m.width=a,m.height=o,m.style.cssText="width:80px;height:48px";var d=m.getContext("2d");return d.font="bold "+9*s+"px Helvetica,Arial,sans-serif",d.textBaseline="top",d.fillStyle=A,d.fillRect(0,0,a,o),d.fillStyle=e,d.fillText(n,l,c),d.fillRect(u,h,p,g),d.fillStyle=A,d.globalAlpha=.9,d.fillRect(u,h,p,g),{dom:m,update:function(f,v){t=Math.min(t,f),i=Math.max(i,f),d.fillStyle=A,d.globalAlpha=1,d.fillRect(0,0,a,h),d.fillStyle=e,d.fillText(r(f)+" "+n+" ("+r(t)+"-"+r(i)+")",l,c),d.drawImage(m,u+s,h,p-s,g,u,h,p-s,g),d.fillRect(u+p-s,h,s,g),d.fillStyle=A,d.globalAlpha=.9,d.fillRect(u+p-s,h,s,r((1-f/v)*g))}}};const od="visible",Bn=_r();Bn[od]=n=>{Bn.domElement.style.visibility=n?"visible":"hidden"};Bn.showPanel(0);document.body.appendChild(Bn.dom);Bn[od](re.view.stats_monitor_visible);var jU=`uniform int u_mode;
uniform bool u_necklace_absolute;
uniform bool u_necklace_discrete;
uniform bool u_show_solution_band;
uniform bool u_show_solutions;
uniform bool u_show_single_thiefs_region;
uniform float u_epsilon;
uniform vec3 u_radius_vector;
uniform float u_offset_sphere_octant;
uniform bool u_use_bad_on_sphere_check;
uniform bool u_show_borsuk_ulam_proof_shape;
uniform vec3 u_scale_color;
uniform float u_alpha;
uniform int u_count_0;
uniform int u_count_1;
uniform int u_input[MAX_JEWELS];
uniform vec3 u_intersect;
varying vec3 v_pos;
varying vec3 v_sphereData_p;
varying float v_sphereData_octant;
varying float v_sphereData_valid;
vec2 calculate_stolen_necklace_discrete(vec3 cuts) {
    int size = u_count_0 + u_count_1;
    float xSq = cuts.x * cuts.x * float(size);
    float ySq = cuts.y * cuts.y * float(size);

    vec2 thief = vec2(0.0, 0.0);
    for(int i = 0; i < size; i++) {
        
        int jewel_type = u_input[i];
        float q = float(i);
        if(q < xSq) {
            if(cuts.x > 0.0) {
                thief[jewel_type] += 1.0;
            }
        } else if(q < xSq + ySq) {
            if(cuts.y > 0.0) {
                thief[jewel_type] += 1.0;
            }
        } else if(cuts.z > 0.0) {
            thief[jewel_type] += 1.0;
        }
    }
    return thief;
}

/** 
 * Calculate the continous distribution of the jewels 
 * based on the squared (x,y,z) values of the given position.
 * 
 * @param cuts {vec3} the given position representing the two cuts
 * @returns {vec2} the number jewels (per type) assigned to first thief
 */
vec2 calculate_stolen_necklace_continous(vec3 cuts) {
    int size = u_count_0 + u_count_1;
    float xSq = cuts.x * cuts.x * float(size);
    float ySq = cuts.y * cuts.y * float(size);

    vec2 thief = vec2(0.0, 0.0);
    for(int i = 0; i < size; i++) {
        
        int jewel_type = u_input[i];
        float q = float(i + 1);

        float dx = 0.0;
        float dy = 0.0;
        float dz = 0.0;

        if(q <= ceil(xSq)) {
            if(q <= floor(xSq)) {
                dx = 1.0;
            } else {
                dx = fract(xSq);
                if(q > xSq + ySq) {
                    dy = ySq;
                    dz = 1.0 - dx - dy;
                } else {
                    dy = 1.0 - dx;
                }
            }
        } else if(q <= ceil(xSq + ySq)) {
            if(q <= floor(xSq + ySq)) {
                dy = 1.0;
            } else {
                dy = fract(xSq + ySq);
                dz = 1.0 - dy;
            }
        } else {
            dz = 1.0;
        }

        if(dx != 0.0 && cuts.x > 0.0) {
            thief[jewel_type] += dx;
        }
        if(dy != 0.0 && cuts.y > 0.0) {
            thief[jewel_type] += dy;
        }
        if(dz != 0.0 && cuts.z > 0.0) {
            thief[jewel_type] += dz;
        }
    }
    return thief;
}

vec2 canonicalThief(vec2 thief) {
    float x = u_count_0 != 0 ? thief.x / float(u_count_0) : 0.0;
    float y = u_count_1 != 0 ? thief.y / float(u_count_1) : 0.0;
    return vec2(x, y);
}

/** 
 * Calculate the distribution of the jewels based on the squared (x,y,z) values
 * of the given position.
 * 
 * @param cuts {vec3} the given position representing the two cuts
 * @returns {vec2} the number jewels (per type) assigned to first thief
 */
vec2 calculate_stolen_necklace(vec3 cuts) {
    vec2 thief_a = u_necklace_discrete ? calculate_stolen_necklace_discrete(cuts) : calculate_stolen_necklace_continous(cuts);
    return canonicalThief(thief_a);
}
struct SphereData {
    vec3 p;
    float octant;
    bool valid;
};

#define M_PI 3.1415926535897932384626433832795

vec3 borsuk_ulam_proof(vec3 p) {
    if(!u_show_borsuk_ulam_proof_shape) {
        return vec3(p);
    }
    vec3 x = vec3(p);
    vec2 g_x;
    if(u_mode == MODE_STOLEN_NECKLACE || u_mode == MODE_SHADER_LAMP) {
        g_x = calculate_stolen_necklace(x) - calculate_stolen_necklace(-x);
    } else if(u_mode == MODE_SPACE_COLOR) {
        g_x = 2.0 * vec2(p.xy);
    } else if(u_mode == MODE_SINUSOID) {
        g_x = vec2(sin(M_PI * p.x), sin(M_PI * p.y)) - vec2(sin(M_PI * -p.x), sin(M_PI * -p.y));
    }
    return vec3(g_x, x.z);
}

SphereData displace_octant(vec3 p, float offset) {
    SphereData sd;
    sd.valid = true;
    if(offset == 0.0) {
        sd.p = p;
    } else if(p.x >= 0.0 && p.y >= 0.0 && p.z >= 0.0) {
        
        sd.p = p + vec3(offset, offset, offset);
        sd.octant = 1.0;
    } else if(p.x > 0.0 && p.y > 0.0 && p.z < 0.0) {
        
        sd.p = p + vec3(offset, offset, -offset);
        sd.octant = 1.0;
    } else if(p.x > 0.0 && p.y < 0.0 && p.z > 0.0) {
        
        sd.p = p + vec3(offset, -offset, offset);
        sd.octant = 2.0;
    } else if(p.x > 0.0 && p.y < 0.0 && p.z < 0.0) {
        
        sd.p = p + vec3(offset, -offset, -offset);
        sd.octant = 3.0;
    } else if(p.x < 0.0 && p.y > 0.0 && p.z > 0.0) {
        
        sd.p = p + vec3(-offset, offset, offset);
        sd.octant = 4.0;
    } else if(p.x < 0.0 && p.y > 0.0 && p.z < 0.0) {
        
        sd.p = p + vec3(-offset, offset, -offset);
        sd.octant = 5.0;
    } else if(p.x < 0.0 && p.y < 0.0 && p.z > 0.0) {
        
        sd.p = p + vec3(-offset, -offset, offset);
        sd.octant = 6.0;
    } else if(p.x < 0.0 && p.y < 0.0 && p.z < 0.0) {
        
        sd.p = p + vec3(-offset, -offset, -offset);
        sd.octant = 7.0;
    } else {
        sd.p = p;
        sd.valid = false;
    }
    return sd;
}

void main() {
    
    vec3 g_x = borsuk_ulam_proof(position / u_radius_vector) * u_radius_vector;
    SphereData sd_shader = displace_octant(g_x, u_offset_sphere_octant);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(sd_shader.p, 1.0);

    v_pos = position / u_radius_vector;

    
    SphereData sd_out = displace_octant(v_pos, u_offset_sphere_octant / u_radius_vector.x);
    v_sphereData_p = sd_out.p;
    v_sphereData_octant = sd_out.octant;
    v_sphereData_valid = sd_out.valid ? 1.0 : 0.0;
}`,$U=`#define M_PI 3.1415926535897932384626433832795
uniform int u_mode;
uniform bool u_necklace_absolute;
uniform bool u_necklace_discrete;
uniform bool u_show_solution_band;
uniform bool u_show_solutions;
uniform bool u_show_single_thiefs_region;
uniform float u_epsilon;
uniform vec3 u_radius_vector;
uniform float u_offset_sphere_octant;
uniform bool u_use_bad_on_sphere_check;
uniform bool u_show_borsuk_ulam_proof_shape;
uniform vec3 u_scale_color;
uniform float u_alpha;
uniform int u_count_0;
uniform int u_count_1;
uniform int u_input[MAX_JEWELS];
uniform vec3 u_intersect;
varying vec3 v_pos;
varying vec3 v_sphereData_p;
varying float v_sphereData_octant;
varying float v_sphereData_valid;
vec2 calculate_stolen_necklace_discrete(vec3 cuts) {
    int size = u_count_0 + u_count_1;
    float xSq = cuts.x * cuts.x * float(size);
    float ySq = cuts.y * cuts.y * float(size);

    vec2 thief = vec2(0.0, 0.0);
    for(int i = 0; i < size; i++) {
        
        int jewel_type = u_input[i];
        float q = float(i);
        if(q < xSq) {
            if(cuts.x > 0.0) {
                thief[jewel_type] += 1.0;
            }
        } else if(q < xSq + ySq) {
            if(cuts.y > 0.0) {
                thief[jewel_type] += 1.0;
            }
        } else if(cuts.z > 0.0) {
            thief[jewel_type] += 1.0;
        }
    }
    return thief;
}

/** 
 * Calculate the continous distribution of the jewels 
 * based on the squared (x,y,z) values of the given position.
 * 
 * @param cuts {vec3} the given position representing the two cuts
 * @returns {vec2} the number jewels (per type) assigned to first thief
 */
vec2 calculate_stolen_necklace_continous(vec3 cuts) {
    int size = u_count_0 + u_count_1;
    float xSq = cuts.x * cuts.x * float(size);
    float ySq = cuts.y * cuts.y * float(size);

    vec2 thief = vec2(0.0, 0.0);
    for(int i = 0; i < size; i++) {
        
        int jewel_type = u_input[i];
        float q = float(i + 1);

        float dx = 0.0;
        float dy = 0.0;
        float dz = 0.0;

        if(q <= ceil(xSq)) {
            if(q <= floor(xSq)) {
                dx = 1.0;
            } else {
                dx = fract(xSq);
                if(q > xSq + ySq) {
                    dy = ySq;
                    dz = 1.0 - dx - dy;
                } else {
                    dy = 1.0 - dx;
                }
            }
        } else if(q <= ceil(xSq + ySq)) {
            if(q <= floor(xSq + ySq)) {
                dy = 1.0;
            } else {
                dy = fract(xSq + ySq);
                dz = 1.0 - dy;
            }
        } else {
            dz = 1.0;
        }

        if(dx != 0.0 && cuts.x > 0.0) {
            thief[jewel_type] += dx;
        }
        if(dy != 0.0 && cuts.y > 0.0) {
            thief[jewel_type] += dy;
        }
        if(dz != 0.0 && cuts.z > 0.0) {
            thief[jewel_type] += dz;
        }
    }
    return thief;
}

vec2 canonicalThief(vec2 thief) {
    float x = u_count_0 != 0 ? thief.x / float(u_count_0) : 0.0;
    float y = u_count_1 != 0 ? thief.y / float(u_count_1) : 0.0;
    return vec2(x, y);
}

/** 
 * Calculate the distribution of the jewels based on the squared (x,y,z) values
 * of the given position.
 * 
 * @param cuts {vec3} the given position representing the two cuts
 * @returns {vec2} the number jewels (per type) assigned to first thief
 */
vec2 calculate_stolen_necklace(vec3 cuts) {
    vec2 thief_a = u_necklace_discrete ? calculate_stolen_necklace_discrete(cuts) : calculate_stolen_necklace_continous(cuts);
    return canonicalThief(thief_a);
}

vec2 deltaTarget() {
    float x = u_count_0 != 0 ? 0.5 : 0.0;
    float y = u_count_1 != 0 ? 0.5 : 0.0;
    return vec2(x, y);
}
vec3 deltaColor(vec2 thief_a, vec2 thief_b) {
    vec2 target = deltaTarget();
    float dist_thief_a = distance(thief_a, target);
    float dist_thief_b = distance(thief_b, target);
    float blue = dist_thief_a < u_epsilon ? 1.0 - dist_thief_a : 0.0;
    return vec3(dist_thief_a, dist_thief_b, blue);
}

bool isSolutionArea(vec2 thief_a, vec2 thief_b) {
    vec2 target = deltaTarget();
    float dist_thief_a = distance(thief_a, target);
    float dist_thief_b = distance(thief_b, target);
    return dist_thief_a < u_epsilon;
}

bool isActiveRegion() {
    return u_show_single_thiefs_region || (!(v_pos.x >= 0.0 && v_pos.y >= 0.0 && v_pos.z >= 0.0) && !(v_pos.x < 0.0 && v_pos.y < 0.0 && v_pos.z < 0.0));
}

vec4 scale_color(vec3 color) {
    return vec4(color * u_scale_color, u_alpha);
}
float inter(float a, float b, float x) {
    return (x - a) / (b - a);
}
bool isOnSphere(vec3 p, float oct, float valid) {
    float offset = u_offset_sphere_octant / u_radius_vector.x;
    return (valid != 0.0) && (abs(p.x) >= offset) && (abs(p.y) >= offset) && (abs(p.z) >= offset);

}
bool isValidSphereData() {
    if(u_use_bad_on_sphere_check) {
        return v_sphereData_valid == 1.0;
    }
    return v_sphereData_valid != 0.0;
}
vec3 calculateSolutionArea(vec3 colorIn, vec3 cuts) {
    if(!u_show_solution_band) {
        return colorIn;
    }
    float xSq = cuts.x * cuts.x;
    float ySq = cuts.y * cuts.y;
    float zSq = cuts.z * cuts.z;

    vec2 thief_a = vec2(0.0, 0.0);
    if(cuts.x > 0.0) {
        thief_a.x += xSq;
    } else {
        thief_a.y += xSq;
    }
    if(cuts.y > 0.0) {
        thief_a.x += ySq;
    } else {
        thief_a.y += ySq;
    }
    if(cuts.z > 0.0) {
        thief_a.x += zSq;
    } else {
        thief_a.y += zSq;
    }

    vec2 thief_b = vec2(1.0) - thief_a;
    return isSolutionArea(thief_a, thief_b) ? vec3(0.5, 0.0, 0.0) + colorIn : colorIn;
}
void fragColorWithIntersect(vec3 colorIn) {
    vec3 intersect = u_intersect / u_radius_vector;

    vec3 color = colorIn;
    float dist = distance(v_pos, intersect);
    float epsilon = 0.05;
    if(dist < epsilon) {
        float t = inter(0.0, epsilon, dist);
        color = mix(vec3(1.0), color, t);
    }
    gl_FragColor = scale_color(color);
}

void main() {
    if(!isValidSphereData()) {
        gl_FragColor = scale_color(v_pos);
    }

    
    if(u_mode == MODE_STOLEN_NECKLACE || u_mode == MODE_SHADER_LAMP) {
        if(isActiveRegion() && isOnSphere(v_sphereData_p, v_sphereData_octant, v_sphereData_valid)) {
            vec2 thief_a = calculate_stolen_necklace(v_pos);
            vec2 thief_b = vec2(1.0) - thief_a;
            vec3 color = vec3(thief_a, 0.0);
            if(u_mode == MODE_SHADER_LAMP) {
                color = ((thief_a - thief_b).xyy * 0.5) + vec3(0.5);
            }
            if(u_show_solutions && isSolutionArea(thief_a, thief_b)) {
                color = deltaColor(thief_a, thief_b);
            }
            color = calculateSolutionArea(color, v_pos);
            fragColorWithIntersect(color);
        }
        return;
    } else if(u_mode == MODE_SPACE_COLOR) {
        fragColorWithIntersect(v_pos);
        return;
    } else if(u_mode == MODE_SINUSOID && isValidSphereData()) {
        vec3 color = vec3(sin(M_PI * v_pos.x), sin(M_PI * v_pos.y), sin(M_PI * v_pos.z));
        fragColorWithIntersect(color);
    }
    return;
}`;const Mo={x:0,y:0};var Hi,Hn,Pi,kt,dt,VA,Oi,pt,it,Pn,Aa,On;class ey extends ad{constructor(A,t={id:"sphere",container:document.body}){super(A,t);We(this,Hi);We(this,Hn);We(this,Pi);We(this,kt);We(this,dt);We(this,VA);We(this,Oi);We(this,pt);We(this,it);We(this,Pn);We(this,Aa);We(this,On);this.canvas=this.domElement}initializeCanvas(){Ie(this,Hi,new Q(-1,20,-30)),Ie(this,Hn,new KU),Ie(this,Pi,new XU),Ie(this,kt,new st(75,this.container.clientWidth/this.container.clientHeight,.1,1e3)),Ie(this,dt,new rd({antialias:!0}));const A=k(this,dt).domElement;return this.container.appendChild(A),Ie(this,Aa,new ZU(this.container,k(this,kt),k(this,dt))),Ie(this,VA,new _t(this.createSphereGeometry(),this.createSphereMaterial())),k(this,VA).visible=re.view.faces_visible,Ie(this,pt,new _t(this.createSphereGeometry(),new Ul({wireframe:!0,side:gt,transparent:!0}))),k(this,pt).visible=re.view.mesh_visible,Ie(this,Pn,new YU(20)),k(this,Pn).visible=re.view.axes_visible,Ie(this,it,new ur),k(this,it).add(k(this,VA),k(this,pt),k(this,Pn)),k(this,Hn).add(k(this,it)),Ie(this,Oi,new qU(k(this,kt),k(this,dt).domElement)),k(this,kt).position.z=50,k(this,Oi).update(),this.container.addEventListener(oe.CREATE_SPHERE.toString(),()=>this.createSphere()),this.container.addEventListener("mousemove",t=>{Mo.x=t.clientX/this.container.clientWidth*2-1,Mo.y=-(t.clientY/this.container.clientHeight)*2+1}),this.container.addEventListener(oe.UPDATE_SPHERE_MATERIAL.toString(),()=>this.updateSphereMaterial()),this.container.addEventListener(oe.UPDATE_VISIBLE.toString(),()=>this.updateVisibility()),this.container.addEventListener(oe.THEME_CHANGED.toString(),()=>this.updateVisibility()),A}onMutation(A){const i=window.getComputedStyle(this.container).getPropertyValue("background-color");k(this,Hn).background=new AA(i)}get captureElement(){return k(this,dt).domElement}render(){const A=t=>{k(this,On)===void 0&&Ie(this,On,t),this._render(t-k(this,On)),Ie(this,On,t),requestAnimationFrame(A)};A((performance||Date).now())}_render(A){if(Bn.begin(),k(this,Oi).update(),k(this,dt).render(k(this,Hn),k(this,kt)),k(this,VA).visible||k(this,pt).visible){k(this,Pi).setFromCamera(Mo,k(this,kt));const t=k(this,Pi).intersectObject(k(this,VA)),i=k(this,VA).material.uniforms;if(t.length>0&&!re.animation.run){const r=t[0].point.clone();i.u_intersect.value=r,this._setIntersect(r)}else i.u_intersect.value=new Q,this.domElement.style.cursor="auto"}if(re.animation.trigger_reset)re.animation.trigger_reset=!1,k(this,it).rotation.x=0,k(this,it).rotation.y=0,k(this,it).rotation.z=0;else if(re.animation.run){const t=Math.PI*A/500;k(this,it).rotation.x+=re.animation.rotation_x*t,k(this,it).rotation.y+=re.animation.rotation_y*t,k(this,it).rotation.z+=re.animation.rotation_z*t}Bn.end()}_setIntersect(A){if(A.distanceToSquared(k(this,Hi))>u_){this.domElement.style.cursor="none",Ie(this,Hi,A);const t=re.sphere.radius||1;this.model.applyCut(A.clone().divideScalar(t))}}createSphere(){k(this,VA).geometry.dispose(),k(this,pt).geometry.dispose();const A=this.createSphereGeometry();k(this,VA).geometry=A,k(this,pt).geometry=A,this.updateSphereMaterial()}createSphereGeometry(){const A=re.sphere.segments;return new Sl(re.sphere.radius,A,A/2)}createSphereMaterial(){return new Jt({vertexShader:jU,fragmentShader:$U,side:gt,transparent:!0,defines:this.defines,uniforms:this.uniforms})}get defines(){return{MAX_JEWELS:Math.max(1,this.model.necklace.length),MODE_STOLEN_NECKLACE:Mt.STOLEN_NECKLACE,MODE_SHADER_LAMP:Mt.SHADER_LAMP,MODE_SPACE_COLOR:Mt.SPACE_COLOR,MODE_SINUSOID:Mt.SINUSOID}}get uniforms(){return re.sphere.offset_octant/re.sphere.radius,{u_mode:{type:"i",value:re.int_mode},u_necklace_discrete:{type:"b",value:re.necklace.discrete},u_input:{type:"i",value:this.model.necklace},u_count_0:{type:"i",value:this.model.count_0},u_count_1:{type:"i",value:this.model.count_1},u_offset_sphere_octant:{type:"f",value:re.sphere.offset_octant},u_use_bad_on_sphere_check:{type:"b",value:re.sphere.use_bad_on_sphere_check},u_show_borsuk_ulam_proof_shape:{type:"b",value:re.sphere.show_borsuk_ulam_proof_shape},u_radius_vector:{type:"v3",value:new Q(re.sphere.radius,re.sphere.radius,re.sphere.radius)},u_scale_color:{type:"v3",value:new Q(re.color.scale_red,re.color.scale_green,re.color.scale_blue)},u_epsilon:{type:"f",value:re.necklace.epsilon},u_show_solution_band:{type:"b",value:re.necklace.show_solution_band},u_show_solutions:{type:"b",value:re.necklace.show_solutions},u_show_single_thiefs_region:{type:"b",value:re.view.show_single_thiefs_region},u_alpha:{type:"f",value:re.color.alpha},u_time:{type:"f",value:1},u_resolution:{type:"v2",value:new Fe(k(this,dt).domElement.width,k(this,dt).domElement.height)},u_intersect:{type:"v3",value:new Q(0,0,0)}}}updateSphereMaterial(){k(this,VA)!==void 0&&k(this,VA).material.dispose(),k(this,VA).material=this.createSphereMaterial(),k(this,pt).material.transparent=re.color.alpha!=1,oe.dispatchEvent(oe.MODEL_CHANGED)}updateVisibility(){k(this,Pn).visible=re.view.axes_visible,k(this,pt).visible=re.view.mesh_visible,k(this,VA).visible=re.view.faces_visible,Bn.visible(re.view.stats_monitor_visible),oe.dispatchEvent(oe.MODEL_CHANGED)}}Hi=new WeakMap,Hn=new WeakMap,Pi=new WeakMap,kt=new WeakMap,dt=new WeakMap,VA=new WeakMap,Oi=new WeakMap,pt=new WeakMap,it=new WeakMap,Pn=new WeakMap,Aa=new WeakMap,On=new WeakMap;const Ay="--jewel-a-color",ty="--jewel-b-color",ld="--thief-a-color",cd="--thief-b-color",ny=`${ld}-light`,iy=`${cd}-light`,ry="--between-jewels-color",sy="--gauge-color",ay="red",oy="green",ly="rgb(0,191,255)",_i=10,_h=20,cy=5,uy=7;class hy extends ad{constructor(e,A={id:"necklace",container:document.body}){super(e,A),this.canvas=this.domElement,window.addEventListener("resize",()=>{const t=Math.min(innerWidth,this.container.clientWidth),i=Math.min(innerHeight,this.container.clientHeight);this.canvas.width=t,this.canvas.height=i,this.render()})}onMutation(e){this.render()}initializeCanvas(){const e=document.createElement("canvas");return e.setAttribute("id","necklace"),e.classList.add("necklace"),this.container.addEventListener(oe.NECKLACE_CUT.toString(),()=>this.render()),this.container.addEventListener(oe.MODEL_CHANGED.toString(),()=>this.render()),e}get size(){return this.model.size}get width(){return this.canvas.width}get height(){return this.canvas.height}get jewelWidth(){return this.width/this.size}get thief_a_color(){return getComputedStyle(document.body).getPropertyValue(ld)}get thief_b_color(){return getComputedStyle(document.body).getPropertyValue(cd)}get thief_a_color_light(){return getComputedStyle(document.body).getPropertyValue(ny)}get thief_b_color_light(){return getComputedStyle(document.body).getPropertyValue(iy)}get between_jewels_color(){return getComputedStyle(document.body).getPropertyValue(ry)}get jewel_a_color(){return getComputedStyle(document.body).getPropertyValue(Ay)}get jewel_b_color(){return getComputedStyle(document.body).getPropertyValue(ty)}get gauge_color(){return getComputedStyle(document.body).getPropertyValue(sy)}get captureElement(){return this.domElement}get showNecklace(){return re.int_mode===Mt.STOLEN_NECKLACE&&re.view.necklace_visible}get showGauge(){return re.int_mode===Mt.STOLEN_NECKLACE&&re.view.gauge_visible}render(){this.canvas!==void 0&&this._render()}_render(){this.canvas.width=this.canvas.clientWidth,this.canvas.height=this.canvas.clientHeight;const e=this.canvas.getContext("2d");if(e!==null){const A=e,t=0,i=0;let r=t;const s=this.model.cuts;if(this.showNecklace&&(this.drawNecklace(A,r,i,s),s!==void 0&&this.drawSegments(A,s)),this.model.thief_a!==void 0&&this.showGauge){const a=this.model.canonicalThief(this.model.thief_a),o=this.model.canonicalThief(this.model.thief_b);this.drawGauge(A,50,a,o)}re.text&&(A.font="12px",A.fillStyle="rgb(255,255,255)",A.fillText(re.text,0,150))}}drawNecklace(e,A,t,i){const s=_i+_h;i===void 0&&(e.fillStyle=this.between_jewels_color,e.fillRect(A,t,this.width,_i));const a=this.jewel_a_color,o=this.jewel_b_color;let l=A;for(let c=0;c<this.size;c++){const u=this.model.necklace[Math.floor(c)];e.fillStyle=u===0?a:o,e.fillRect(l,t+this.yOffset(i,c/this.size,s),this.jewelWidth-2,_i),l+=this.jewelWidth}}drawSegments(e,A){let t=0;e.save(),e.lineWidth=this.showNecklace?1:_i,e.strokeStyle=ay,t=this.drawSegment(e,t,A.x),e.strokeStyle=oy,t=this.drawSegment(e,t,A.y),e.strokeStyle=ly,t=this.drawSegment(e,t,A.z),e.restore()}drawSegment(e,A,t){e.beginPath();const i=this.yOffsetSegment(t)+e.lineWidth;e.moveTo(A,i);const r=A+Math.ceil(t*t*this.width);return e.lineTo(r,i),e.stroke(),r}yOffsetSegment(e){const A=this.showNecklace?cy:_h+_i;return(e<0?A:0)+(this.showNecklace?_i+uy:0)}drawGauge(e,A,t,i){const r=this.height-A,s=3,o=r-2;if(o>=10){const l=Math.SQRT1_2*o,c=this.width/2-o,u=new Fe(c+o,A+o),h=this.thief_a_color,p=this.thief_b_color,g=this.gauge_color;e.beginPath(),e.fillStyle=this.thief_a_color_light,e.moveTo(u.x,u.y),e.arc(u.x,u.y,o,-Math.PI,-Math.PI/2),e.lineTo(u.x,u.y),e.closePath(),e.fill(),e.beginPath(),e.fillStyle=this.thief_b_color_light,e.moveTo(u.x,u.y),e.arc(u.x,u.y,o,-Math.PI/2,0),e.lineTo(u.x,u.y),e.closePath(),e.fill(),e.beginPath(),e.lineWidth=1,e.setLineDash([1,1]),e.arc(u.x,u.y,o/2,0,-Math.PI,!0),e.stroke(),e.beginPath(),e.strokeStyle=h,e.setLineDash([]),e.moveTo(u.x,u.y),e.lineTo(u.x-t.x*l,u.y-t.y*l),e.stroke(),e.beginPath(),e.strokeStyle=p,e.moveTo(u.x,u.y),e.lineTo(u.x+i.x*l,u.y-i.y*l),e.stroke();const m=1-Math.SQRT1_2*t.distanceTo(i),d=255+-255*m,f=0+255*m;e.beginPath(),e.lineWidth=s,e.strokeStyle=`rgb(${d},${f}, 0)`,e.arc(u.x,u.y,o,-Math.PI,-Math.PI*(1-m),!1),e.stroke(),e.beginPath(),e.lineWidth=s,e.strokeStyle=g,e.arc(u.x,u.y,o,-Math.PI*(1-m),0,!1),e.stroke()}}yOffset(e,A,t){if(e===void 0)return 0;const i=e.x*e.x,r=e.y*e.y;return A<i?e.x<0?t:0:A<i+r?e.y<0?t:0:e.z<0?t:0}}function wh(n){return n%1}var xt,RA,Nn,Ut;class fy{constructor(){We(this,xt);We(this,RA);We(this,Nn);We(this,Ut);this.initializeStatus(0),window.addEventListener(oe.SET_NECKLACE_CONFIGURATION_BY_NUMBER,()=>this.necklaceFromInt(re.necklace.configuration,re.necklace.number_of_jewels)),window.addEventListener(oe.SET_NECKLACE_CONFIGURATION_BY_STRING,()=>this.necklaceFromStr(re.necklace.string))}get necklace(){return[...k(this,xt)]}necklaceFromInt(e,A){this.initializeStatus(A);const t=e.toString(2);if(e!=0){const i=t.length-1;for(let r=i;r>=0;r--)k(this,xt)[i-r]=t[r]==="0"?0:1}for(const i of k(this,xt))i===0?k(this,RA).x+=1:k(this,RA).y+=1;oe.dispatchEvent(oe.UPDATE_SPHERE_MATERIAL)}necklaceFromStr(e){this.initializeStatus(1),Ie(this,xt,[]);for(let A=0;A<e.length;A++){const t=e.charCodeAt(A),i=t.toString(2);if(t!=0)for(const r of i)k(this,xt).push(r==="0"?0:1)}for(const A of k(this,xt))A===0?k(this,RA).x+=1:k(this,RA).y+=1;oe.dispatchEvent(oe.UPDATE_SPHERE_MATERIAL)}get size(){if(this.cnt.x<0||this.cnt.y<0)throw Error("Necklace not initialized");return this.cnt.x+this.cnt.y}applyCut(e){this.cuts=e,e!==void 0&&Ie(this,Ut,re.necklace.discrete?this.applyCutDiscrete(e):this.applyCutContinous(e)),oe.dispatchEvent(oe.NECKLACE_CUT)}applyCutDiscrete(e){if(this.cuts=e,e){const A=this.size,t=e.x*e.x*A,i=e.y*e.y*A,r=[0,0];for(let s=0;s<A;s++){const a=this.necklace[s],o=s;o<t?e.x>0&&r[a]++:o<t+i?e.y>0&&r[a]++:e.z>0&&r[a]++}return new Fe(r[0],r[1])}return new Fe(0,0)}applyCutContinous(e){if(this.cuts=e,e){const A=this.size,t=e.x*e.x*A,i=e.y*e.y*A,r=[0,0];for(let s=0;s<A;s++){const a=this.necklace[s],o=s+1;let l=0,c=0,u=0;o<=Math.ceil(t)?o<=Math.floor(t)?l=1:(l=wh(t),o>t+i?(c=i,u=1-l-c):c=1-l):o<=Math.ceil(t+i)?o<=Math.floor(t+i)?c=1:(c=wh(t+i),u=1-c):u=1,l!==0&&e.x>0&&(r[a]+=l),c!==0&&e.y>0&&(r[a]+=c),u!==0&&e.z>0&&(r[a]+=u)}return new Fe(r[0],r[1])}return new Fe(0,0)}initializeStatus(e){Ie(this,xt,Array(e).fill(0)),Ie(this,RA,new Fe(0,0)),Ie(this,Nn,new Q(0,0)),Ie(this,Ut,new Fe(0,0))}get cnt(){return k(this,RA).clone()}set cnt(e){Ie(this,RA,e.clone())}get count_0(){return k(this,RA).x}get count_1(){return k(this,RA).y}get cuts(){return k(this,Nn)?k(this,Nn).clone():void 0}set cuts(e){e!==void 0&&(this.assertSphere(e),Ie(this,Nn,e.clone()))}assertSphere(e,A=1){if(e.length()-A>$o)throw new Error(`Input vector ${e} not close enough to sphere with radius ${A}, dist to orgin: ${e.length()}`)}get thief_a(){return k(this,Ut)!==void 0?k(this,Ut).clone():new Fe(0,0)}set thief_a(e){Ie(this,Ut,e.clone())}get thief_b(){return k(this,Ut)!==void 0?this.cnt.sub(k(this,Ut)):new Fe(0,0)}canonicalThief(e){const A=k(this,RA).x!==0?e.x/k(this,RA).x:0,t=k(this,RA).y!==0?e.y/k(this,RA).y:0;return new Fe(A,t)}}xt=new WeakMap,RA=new WeakMap,Nn=new WeakMap,Ut=new WeakMap;const dy=new zs,py=new B_,ud=new fy,hd=new ey(ud),gy=new hy(ud);oe.dispatchEvent(oe.SET_NECKLACE_CONFIGURATION_BY_NUMBER);hd.render();new __({folder:dy.captureFolder,property:re.capture},{all:document.body,sphere:hd.captureElement,necklace:gy.captureElement});const Ml=document.createElement("SPAN");Ml.setAttribute("id","version-info");Ml.innerHTML="v0.4.11";document.body.insertAdjacentElement("beforeend",Ml);py.initTheme();
