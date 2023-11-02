var va=(n,e,A)=>{if(!e.has(n))throw TypeError("Cannot "+A)};var k=(n,e,A)=>(va(n,e,"read from private field"),A?A.call(n):e.get(n)),ke=(n,e,A)=>{if(e.has(n))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(n):e.set(n,A)},be=(n,e,A,t)=>(va(n,e,"write to private field"),t?t.call(n,A):e.set(n,A),A);var Ll=(n,e,A)=>(va(n,e,"access private method"),A);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))t(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&t(s)}).observe(document,{childList:!0,subtree:!0});function A(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(i){if(i.ep)return;i.ep=!0;const r=A(i);fetch(i.href,r)}})();/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.17.0
 * @author George Michael Brower
 * @license MIT
 */class Ft{constructor(e,A,t,i,r="div"){this.parent=e,this.object=A,this.property=t,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement("div"),this.domElement.classList.add("controller"),this.domElement.classList.add(i),this.$name=document.createElement("div"),this.$name.classList.add("name"),Ft.nextNameID=Ft.nextNameID||0,this.$name.id="lil-gui-name-"+ ++Ft.nextNameID,this.$widget=document.createElement(r),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(t)}name(e){return this._name=e,this.$name.innerHTML=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled||(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e)),this}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const A=this.parent.add(this.object,this.property,e);return A.name(this._name),this.destroy(),A}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.object[this.property]=e,this._callOnChange(),this.updateDisplay(),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}let cd=class extends Ft{constructor(e,A,t){super(e,A,t,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}};function So(n){let e,A;return(e=n.match(/(#|0x)?([a-f0-9]{6})/i))?A=e[2]:(e=n.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?A=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=n.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(A=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),!!A&&"#"+A}const ud={isPrimitive:!0,match:n=>typeof n=="string",fromHexString:So,toHexString:So},mr={isPrimitive:!0,match:n=>typeof n=="number",fromHexString:n=>parseInt(n.substring(1),16),toHexString:n=>"#"+n.toString(16).padStart(6,0)},hd={isPrimitive:!1,match:Array.isArray,fromHexString(n,e,A=1){const t=mr.fromHexString(n);e[0]=(t>>16&255)/255*A,e[1]=(t>>8&255)/255*A,e[2]=(255&t)/255*A},toHexString:([n,e,A],t=1)=>mr.toHexString(n*(t=255/t)<<16^e*t<<8^A*t<<0)},fd={isPrimitive:!1,match:n=>Object(n)===n,fromHexString(n,e,A=1){const t=mr.fromHexString(n);e.r=(t>>16&255)/255*A,e.g=(t>>8&255)/255*A,e.b=(255&t)/255*A},toHexString:({r:n,g:e,b:A},t=1)=>mr.toHexString(n*(t=255/t)<<16^e*t<<8^A*t<<0)},dd=[ud,mr,hd,fd];let pd=class extends Ft{constructor(e,A,t,i){var r;super(e,A,t,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=(r=this.initialValue,dd.find(s=>s.match(r))),this._rgbScale=i,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const s=So(this.$text.value);s&&this._setValueFromHexString(s)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const A=this._format.fromHexString(e);this.setValue(A)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}};class Ea extends Ft{constructor(e,A,t){super(e,A,t,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",i=>{i.preventDefault(),this.getValue().call(this.object)}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class gd extends Ft{constructor(e,A,t,i,r,s){super(e,A,t,"number"),this._initInput(),this.min(i),this.max(r);const a=s!==void 0;this.step(a?s:this._getImplicitStep(),a),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,A=!0){return this._step=e,this._stepExplicit=A,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let A=(e-this._min)/(this._max-this._min);A=Math.max(0,Math.min(A,1)),this.$fill.style.width=100*A+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$disable=this.$input;const e=c=>{const u=parseFloat(this.$input.value);isNaN(u)||(this._snapClampSetValue(u+c),this.$input.value=this.getValue())};let A,t,i,r,s,a=!1;const o=c=>{if(a){const u=c.clientX-A,h=c.clientY-t;Math.abs(h)>5?(c.preventDefault(),this.$input.blur(),a=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(u)>5&&l()}if(!a){const u=c.clientY-i;s-=u*this._step*this._arrowKeyMultiplier(c),r+s>this._max?s=this._max-r:r+s<this._min&&(s=this._min-r),this._snapClampSetValue(r+s)}i=c.clientY},l=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",o),window.removeEventListener("mouseup",l)};this.$input.addEventListener("input",()=>{let c=parseFloat(this.$input.value);isNaN(c)||(this._stepExplicit&&(c=this._snap(c)),this.setValue(this._clamp(c)))}),this.$input.addEventListener("keydown",c=>{c.code==="Enter"&&this.$input.blur(),c.code==="ArrowUp"&&(c.preventDefault(),e(this._step*this._arrowKeyMultiplier(c))),c.code==="ArrowDown"&&(c.preventDefault(),e(this._step*this._arrowKeyMultiplier(c)*-1))}),this.$input.addEventListener("wheel",c=>{this._inputFocused&&(c.preventDefault(),e(this._step*this._normalizeMouseWheel(c)))},{passive:!1}),this.$input.addEventListener("mousedown",c=>{A=c.clientX,t=i=c.clientY,a=!0,r=this.getValue(),s=0,window.addEventListener("mousemove",o),window.addEventListener("mouseup",l)}),this.$input.addEventListener("focus",()=>{this._inputFocused=!0}),this.$input.addEventListener("blur",()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()})}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const e=h=>{const p=this.$slider.getBoundingClientRect();let g=(m=h,d=p.left,f=p.right,v=this._min,w=this._max,(m-d)/(f-d)*(w-v)+v);var m,d,f,v,w;this._snapClampSetValue(g)},A=h=>{e(h.clientX)},t=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",A),window.removeEventListener("mouseup",t)};let i,r,s=!1;const a=h=>{h.preventDefault(),this._setDraggingStyle(!0),e(h.touches[0].clientX),s=!1},o=h=>{if(s){const p=h.touches[0].clientX-i,g=h.touches[0].clientY-r;Math.abs(p)>Math.abs(g)?a(h):(window.removeEventListener("touchmove",o),window.removeEventListener("touchend",l))}else h.preventDefault(),e(h.touches[0].clientX)},l=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",o),window.removeEventListener("touchend",l)},c=this._callOnFinishChange.bind(this);let u;this.$slider.addEventListener("mousedown",h=>{this._setDraggingStyle(!0),e(h.clientX),window.addEventListener("mousemove",A),window.addEventListener("mouseup",t)}),this.$slider.addEventListener("touchstart",h=>{h.touches.length>1||(this._hasScrollBar?(i=h.touches[0].clientX,r=h.touches[0].clientY,s=!0):a(h),window.addEventListener("touchmove",o,{passive:!1}),window.addEventListener("touchend",l))},{passive:!1}),this.$slider.addEventListener("wheel",h=>{if(Math.abs(h.deltaX)<Math.abs(h.deltaY)&&this._hasScrollBar)return;h.preventDefault();const p=this._normalizeMouseWheel(h)*this._step;this._snapClampSetValue(this.getValue()+p),this.$input.value=this.getValue(),clearTimeout(u),u=setTimeout(c,400)},{passive:!1})}_setDraggingStyle(e,A="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle("lil-gui-"+A,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:A,deltaY:t}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(A=0,t=-e.wheelDelta/120,t*=this._stepExplicit?1:10),A+-t}_arrowKeyMultiplier(e){let A=this._stepExplicit?1:10;return e.shiftKey?A*=10:e.altKey&&(A/=10),A}_snap(e){const A=Math.round(e/this._step)*this._step;return parseFloat(A.toPrecision(15))}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class md extends Ft{constructor(e,A,t,i){super(e,A,t,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this._values=Array.isArray(i)?i:Object.values(i),this._names=Array.isArray(i)?i:Object.keys(i),this._names.forEach(r=>{const s=document.createElement("option");s.innerHTML=r,this.$select.appendChild(s)}),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.updateDisplay()}updateDisplay(){const e=this.getValue(),A=this._values.indexOf(e);return this.$select.selectedIndex=A,this.$display.innerHTML=A===-1?e:this._names[A],this}}let Bd=class extends Ft{constructor(e,A,t){super(e,A,t,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",i=>{i.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}},Rl=!1;class cl{constructor({parent:e,autoPlace:A=e===void 0,container:t,width:i,title:r="Controls",injectStyles:s=!0,touchStyles:a=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("div"),this.$title.classList.add("title"),this.$title.setAttribute("role","button"),this.$title.setAttribute("aria-expanded",!0),this.$title.setAttribute("tabindex",0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("keydown",o=>{o.code!=="Enter"&&o.code!=="Space"||(o.preventDefault(),this.$title.click())}),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(r),a&&this.domElement.classList.add("allow-touch-styles"),this.parent)return this.parent.children.push(this),this.parent.folders.push(this),void this.parent.$children.appendChild(this.domElement);this.domElement.classList.add("root"),!Rl&&s&&(function(o){const l=document.createElement("style");l.innerHTML=o;const c=document.querySelector("head link[rel=stylesheet], head style");c?document.head.insertBefore(l,c):document.head.appendChild(l)}('.lil-gui{--background-color:#1f1f1f;--text-color:#ebebeb;--title-background-color:#111;--title-text-color:#ebebeb;--widget-color:#424242;--hover-color:#4f4f4f;--focus-color:#595959;--number-color:#2cc9ff;--string-color:#a2db3c;--font-size:11px;--input-font-size:11px;--font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;--font-family-mono:Menlo,Monaco,Consolas,"Droid Sans Mono",monospace;--padding:4px;--spacing:4px;--widget-height:20px;--name-width:45%;--slider-knob-width:2px;--slider-input-width:27%;--color-input-width:27%;--slider-input-min-width:45px;--color-input-min-width:45px;--folder-indent:7px;--widget-padding:0 0 0 3px;--widget-border-radius:2px;--checkbox-size:calc(var(--widget-height)*0.75);--scrollbar-width:5px;background-color:var(--background-color);color:var(--text-color);font-family:var(--font-family);font-size:var(--font-size);font-style:normal;font-weight:400;line-height:1;text-align:left;touch-action:manipulation;user-select:none;-webkit-user-select:none}.lil-gui,.lil-gui *{box-sizing:border-box;margin:0;padding:0}.lil-gui.root{display:flex;flex-direction:column;width:var(--width,245px)}.lil-gui.root>.title{background:var(--title-background-color);color:var(--title-text-color)}.lil-gui.root>.children{overflow-x:hidden;overflow-y:auto}.lil-gui.root>.children::-webkit-scrollbar{background:var(--background-color);height:var(--scrollbar-width);width:var(--scrollbar-width)}.lil-gui.root>.children::-webkit-scrollbar-thumb{background:var(--focus-color);border-radius:var(--scrollbar-width)}.lil-gui.force-touch-styles{--widget-height:28px;--padding:6px;--spacing:6px;--font-size:13px;--input-font-size:16px;--folder-indent:10px;--scrollbar-width:7px;--slider-input-min-width:50px;--color-input-min-width:65px}.lil-gui.autoPlace{max-height:100%;position:fixed;right:15px;top:0;z-index:1001}.lil-gui .controller{align-items:center;display:flex;margin:var(--spacing) 0;padding:0 var(--padding)}.lil-gui .controller.disabled{opacity:.5}.lil-gui .controller.disabled,.lil-gui .controller.disabled *{pointer-events:none!important}.lil-gui .controller>.name{flex-shrink:0;line-height:var(--widget-height);min-width:var(--name-width);padding-right:var(--spacing);white-space:pre}.lil-gui .controller .widget{align-items:center;display:flex;min-height:var(--widget-height);position:relative;width:100%}.lil-gui .controller.string input{color:var(--string-color)}.lil-gui .controller.boolean .widget{cursor:pointer}.lil-gui .controller.color .display{border-radius:var(--widget-border-radius);height:var(--widget-height);position:relative;width:100%}.lil-gui .controller.color input[type=color]{cursor:pointer;height:100%;opacity:0;width:100%}.lil-gui .controller.color input[type=text]{flex-shrink:0;font-family:var(--font-family-mono);margin-left:var(--spacing);min-width:var(--color-input-min-width);width:var(--color-input-width)}.lil-gui .controller.option select{max-width:100%;opacity:0;position:absolute;width:100%}.lil-gui .controller.option .display{background:var(--widget-color);border-radius:var(--widget-border-radius);height:var(--widget-height);line-height:var(--widget-height);max-width:100%;overflow:hidden;padding-left:.55em;padding-right:1.75em;pointer-events:none;position:relative;word-break:break-all}.lil-gui .controller.option .display.active{background:var(--focus-color)}.lil-gui .controller.option .display:after{bottom:0;content:"↕";font-family:lil-gui;padding-right:.375em;position:absolute;right:0;top:0}.lil-gui .controller.option .widget,.lil-gui .controller.option select{cursor:pointer}.lil-gui .controller.number input{color:var(--number-color)}.lil-gui .controller.number.hasSlider input{flex-shrink:0;margin-left:var(--spacing);min-width:var(--slider-input-min-width);width:var(--slider-input-width)}.lil-gui .controller.number .slider{background-color:var(--widget-color);border-radius:var(--widget-border-radius);cursor:ew-resize;height:var(--widget-height);overflow:hidden;padding-right:var(--slider-knob-width);touch-action:pan-y;width:100%}.lil-gui .controller.number .slider.active{background-color:var(--focus-color)}.lil-gui .controller.number .slider.active .fill{opacity:.95}.lil-gui .controller.number .fill{border-right:var(--slider-knob-width) solid var(--number-color);box-sizing:content-box;height:100%}.lil-gui-dragging .lil-gui{--hover-color:var(--widget-color)}.lil-gui-dragging *{cursor:ew-resize!important}.lil-gui-dragging.lil-gui-vertical *{cursor:ns-resize!important}.lil-gui .title{--title-height:calc(var(--widget-height) + var(--spacing)*1.25);-webkit-tap-highlight-color:transparent;text-decoration-skip:objects;cursor:pointer;font-weight:600;height:var(--title-height);line-height:calc(var(--title-height) - 4px);outline:none;padding:0 var(--padding)}.lil-gui .title:before{content:"▾";display:inline-block;font-family:lil-gui;padding-right:2px}.lil-gui .title:active{background:var(--title-background-color);opacity:.75}.lil-gui.root>.title:focus{text-decoration:none!important}.lil-gui.closed>.title:before{content:"▸"}.lil-gui.closed>.children{opacity:0;transform:translateY(-7px)}.lil-gui.closed:not(.transition)>.children{display:none}.lil-gui.transition>.children{overflow:hidden;pointer-events:none;transition-duration:.3s;transition-property:height,opacity,transform;transition-timing-function:cubic-bezier(.2,.6,.35,1)}.lil-gui .children:empty:before{content:"Empty";display:block;font-style:italic;height:var(--widget-height);line-height:var(--widget-height);margin:var(--spacing) 0;opacity:.5;padding:0 var(--padding)}.lil-gui.root>.children>.lil-gui>.title{border-width:0;border-bottom:1px solid var(--widget-color);border-left:0 solid var(--widget-color);border-right:0 solid var(--widget-color);border-top:1px solid var(--widget-color);transition:border-color .3s}.lil-gui.root>.children>.lil-gui.closed>.title{border-bottom-color:transparent}.lil-gui+.controller{border-top:1px solid var(--widget-color);margin-top:0;padding-top:var(--spacing)}.lil-gui .lil-gui .lil-gui>.title{border:none}.lil-gui .lil-gui .lil-gui>.children{border:none;border-left:2px solid var(--widget-color);margin-left:var(--folder-indent)}.lil-gui .lil-gui .controller{border:none}.lil-gui input{-webkit-tap-highlight-color:transparent;background:var(--widget-color);border:0;border-radius:var(--widget-border-radius);color:var(--text-color);font-family:var(--font-family);font-size:var(--input-font-size);height:var(--widget-height);outline:none;width:100%}.lil-gui input:disabled{opacity:1}.lil-gui input[type=number],.lil-gui input[type=text]{padding:var(--widget-padding)}.lil-gui input[type=number]:focus,.lil-gui input[type=text]:focus{background:var(--focus-color)}.lil-gui input::-webkit-inner-spin-button,.lil-gui input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.lil-gui input[type=number]{-moz-appearance:textfield}.lil-gui input[type=checkbox]{appearance:none;-webkit-appearance:none;border-radius:var(--widget-border-radius);cursor:pointer;height:var(--checkbox-size);text-align:center;width:var(--checkbox-size)}.lil-gui input[type=checkbox]:checked:before{content:"✓";font-family:lil-gui;font-size:var(--checkbox-size);line-height:var(--checkbox-size)}.lil-gui button{-webkit-tap-highlight-color:transparent;background:var(--widget-color);border:1px solid var(--widget-color);border-radius:var(--widget-border-radius);color:var(--text-color);cursor:pointer;font-family:var(--font-family);font-size:var(--font-size);height:var(--widget-height);line-height:calc(var(--widget-height) - 4px);outline:none;text-align:center;text-transform:none;width:100%}.lil-gui button:active{background:var(--focus-color)}@font-face{font-family:lil-gui;src:url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff")}@media (pointer:coarse){.lil-gui.allow-touch-styles{--widget-height:28px;--padding:6px;--spacing:6px;--font-size:13px;--input-font-size:16px;--folder-indent:10px;--scrollbar-width:7px;--slider-input-min-width:50px;--color-input-min-width:65px}}@media (hover:hover){.lil-gui .controller.color .display:hover:before{border:1px solid #fff9;border-radius:var(--widget-border-radius);bottom:0;content:" ";display:block;left:0;position:absolute;right:0;top:0}.lil-gui .controller.option .display.focus{background:var(--focus-color)}.lil-gui .controller.option .widget:hover .display{background:var(--hover-color)}.lil-gui .controller.number .slider:hover{background-color:var(--hover-color)}body:not(.lil-gui-dragging) .lil-gui .title:hover{background:var(--title-background-color);opacity:.85}.lil-gui .title:focus{text-decoration:underline var(--focus-color)}.lil-gui input:hover{background:var(--hover-color)}.lil-gui input:active{background:var(--focus-color)}.lil-gui input[type=checkbox]:focus{box-shadow:inset 0 0 0 1px var(--focus-color)}.lil-gui button:hover{background:var(--hover-color);border-color:var(--hover-color)}.lil-gui button:focus{border-color:var(--focus-color)}}'),Rl=!0),t?t.appendChild(this.domElement):A&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),i&&this.domElement.style.setProperty("--width",i+"px"),this.domElement.addEventListener("keydown",o=>o.stopPropagation()),this.domElement.addEventListener("keyup",o=>o.stopPropagation())}add(e,A,t,i,r){if(Object(t)===t)return new md(this,e,A,t);const s=e[A];switch(typeof s){case"number":return new gd(this,e,A,t,i,r);case"boolean":return new cd(this,e,A);case"string":return new Bd(this,e,A);case"function":return new Ea(this,e,A)}console.error(`gui.add failed
	property:`,A,`
	object:`,e,`
	value:`,s)}addColor(e,A,t=1){return new pd(this,e,A,t)}addFolder(e){return new cl({parent:this,title:e})}load(e,A=!0){return e.controllers&&this.controllers.forEach(t=>{t instanceof Ea||t._name in e.controllers&&t.load(e.controllers[t._name])}),A&&e.folders&&this.folders.forEach(t=>{t._title in e.folders&&t.load(e.folders[t._title])}),this}save(e=!0){const A={controllers:{},folders:{}};return this.controllers.forEach(t=>{if(!(t instanceof Ea)){if(t._name in A.controllers)throw new Error(`Cannot save GUI with duplicate property "${t._name}"`);A.controllers[t._name]=t.save()}}),e&&this.folders.forEach(t=>{if(t._title in A.folders)throw new Error(`Cannot save GUI with duplicate folder "${t._title}"`);A.folders[t._title]=t.save()}),A}open(e=!0){return this._closed=!e,this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._closed=!e,this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const A=this.$children.clientHeight;this.$children.style.height=A+"px",this.domElement.classList.add("transition");const t=r=>{r.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",t))};this.$children.addEventListener("transitionend",t);const i=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=i+"px"})}),this}title(e){return this._title=e,this.$title.innerHTML=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(A=>A.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(A=>{e=e.concat(A.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(A=>{e=e.concat(A.foldersRecursive())}),e}}var St=(n=>(n[n.STOLEN_NECKLACE=0]="STOLEN_NECKLACE",n[n.SHADER_LAMP=1]="SHADER_LAMP",n[n.SPACE_COLOR=2]="SPACE_COLOR",n[n.SINUSOID=3]="SINUSOID",n))(St||{}),ae=(n=>(n.SETTINGS_CHANGED="settings-changed",n.CHANGE_THEME="change-theme",n.THEME_CHANGED="theme-changed",n.SHOW_IMPRINT="show-imprint",n.HIDE_IMPRINT="hide-imprint",n.UPDATE_VISIBLE="update-visible",n.MODEL_CHANGED="model-changed",n.CREATE_SPHERE="create-sphere",n.SET_NECKLACE_CONFIGURATION_BY_NUMBER="necklace-configuration-by-number",n.SET_NECKLACE_CONFIGURATION_BY_STRING="necklace-configuration-by-string",n.UPDATE_SPHERE_MATERIAL="update-material",n.NECKLACE_CUT="necklace-cut",n))(ae||{});(n=>{function e(A){const t=new Event(A.toString(),{bubbles:!0});document.body.dispatchEvent(t)}n.dispatchEvent=e})(ae||(ae={}));class mh{constructor(e,A){let t=!1;new MutationObserver(r=>{t&&r.forEach((s,a)=>A(s,a))}).observe(e,{attributes:!0,attributeFilter:["class"]}),t=!0}}const _d="modulepreload",wd=function(n){return"/necklace-splitting/"+n},Dl={},vd=function(e,A,t){if(!A||A.length===0)return e();const i=document.getElementsByTagName("link");return Promise.all(A.map(r=>{if(r=wd(r),r in Dl)return;Dl[r]=!0;const s=r.endsWith(".css"),a=s?'[rel="stylesheet"]':"";if(!!t)for(let c=i.length-1;c>=0;c--){const u=i[c];if(u.href===r&&(!s||u.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${r}"]${a}`))return;const l=document.createElement("link");if(l.rel=s?"stylesheet":_d,s||(l.as="script",l.crossOrigin=""),l.href=r,document.head.appendChild(l),s)return new Promise((c,u)=>{l.addEventListener("load",c),l.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${r}`)))})})).then(()=>e()).catch(r=>{const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=r,window.dispatchEvent(s),!s.defaultPrevented)throw r})};/*!
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
***************************************************************************** */var Mo=function(n,e){return Mo=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(A,t){A.__proto__=t}||function(A,t){for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(A[i]=t[i])},Mo(n,e)};function _t(n,e){if(typeof e!="function"&&e!==null)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");Mo(n,e);function A(){this.constructor=n}n.prototype=e===null?Object.create(e):(A.prototype=e.prototype,new A)}var Fo=function(){return Fo=Object.assign||function(e){for(var A,t=1,i=arguments.length;t<i;t++){A=arguments[t];for(var r in A)Object.prototype.hasOwnProperty.call(A,r)&&(e[r]=A[r])}return e},Fo.apply(this,arguments)};function GA(n,e,A,t){function i(r){return r instanceof A?r:new A(function(s){s(r)})}return new(A||(A=Promise))(function(r,s){function a(c){try{l(t.next(c))}catch(u){s(u)}}function o(c){try{l(t.throw(c))}catch(u){s(u)}}function l(c){c.done?r(c.value):i(c.value).then(a,o)}l((t=t.apply(n,e||[])).next())})}function IA(n,e){var A={label:0,sent:function(){if(r[0]&1)throw r[1];return r[1]},trys:[],ops:[]},t,i,r,s;return s={next:a(0),throw:a(1),return:a(2)},typeof Symbol=="function"&&(s[Symbol.iterator]=function(){return this}),s;function a(l){return function(c){return o([l,c])}}function o(l){if(t)throw new TypeError("Generator is already executing.");for(;A;)try{if(t=1,i&&(r=l[0]&2?i.return:l[0]?i.throw||((r=i.return)&&r.call(i),0):i.next)&&!(r=r.call(i,l[1])).done)return r;switch(i=0,r&&(l=[l[0]&2,r.value]),l[0]){case 0:case 1:r=l;break;case 4:return A.label++,{value:l[1],done:!1};case 5:A.label++,i=l[1],l=[0];continue;case 7:l=A.ops.pop(),A.trys.pop();continue;default:if(r=A.trys,!(r=r.length>0&&r[r.length-1])&&(l[0]===6||l[0]===2)){A=0;continue}if(l[0]===3&&(!r||l[1]>r[0]&&l[1]<r[3])){A.label=l[1];break}if(l[0]===6&&A.label<r[1]){A.label=r[1],r=l;break}if(r&&A.label<r[2]){A.label=r[2],A.ops.push(l);break}r[2]&&A.ops.pop(),A.trys.pop();continue}l=e.call(n,A)}catch(c){l=[6,c],i=0}finally{t=r=0}if(l[0]&5)throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}}function Rr(n,e,A){if(A||arguments.length===2)for(var t=0,i=e.length,r;t<i;t++)(r||!(t in e))&&(r||(r=Array.prototype.slice.call(e,0,t)),r[t]=e[t]);return n.concat(r||e)}var Wt=function(){function n(e,A,t,i){this.left=e,this.top=A,this.width=t,this.height=i}return n.prototype.add=function(e,A,t,i){return new n(this.left+e,this.top+A,this.width+t,this.height+i)},n.fromClientRect=function(e,A){return new n(A.left+e.windowBounds.left,A.top+e.windowBounds.top,A.width,A.height)},n.fromDOMRectList=function(e,A){var t=Array.from(A).find(function(i){return i.width!==0});return t?new n(t.left+e.windowBounds.left,t.top+e.windowBounds.top,t.width,t.height):n.EMPTY},n.EMPTY=new n(0,0,0,0),n}(),Aa=function(n,e){return Wt.fromClientRect(n,e.getBoundingClientRect())},Ed=function(n){var e=n.body,A=n.documentElement;if(!e||!A)throw new Error("Unable to get document size");var t=Math.max(Math.max(e.scrollWidth,A.scrollWidth),Math.max(e.offsetWidth,A.offsetWidth),Math.max(e.clientWidth,A.clientWidth)),i=Math.max(Math.max(e.scrollHeight,A.scrollHeight),Math.max(e.offsetHeight,A.offsetHeight),Math.max(e.clientHeight,A.clientHeight));return new Wt(0,0,t,i)},ta=function(n){for(var e=[],A=0,t=n.length;A<t;){var i=n.charCodeAt(A++);if(i>=55296&&i<=56319&&A<t){var r=n.charCodeAt(A++);(r&64512)===56320?e.push(((i&1023)<<10)+(r&1023)+65536):(e.push(i),A--)}else e.push(i)}return e},cA=function(){for(var n=[],e=0;e<arguments.length;e++)n[e]=arguments[e];if(String.fromCodePoint)return String.fromCodePoint.apply(String,n);var A=n.length;if(!A)return"";for(var t=[],i=-1,r="";++i<A;){var s=n[i];s<=65535?t.push(s):(s-=65536,t.push((s>>10)+55296,s%1024+56320)),(i+1===A||t.length>16384)&&(r+=String.fromCharCode.apply(String,t),t.length=0)}return r},Hl="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Cd=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(var Dr=0;Dr<Hl.length;Dr++)Cd[Hl.charCodeAt(Dr)]=Dr;var Pl="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",$i=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(var Hr=0;Hr<Pl.length;Hr++)$i[Pl.charCodeAt(Hr)]=Hr;var xd=function(n){var e=n.length*.75,A=n.length,t,i=0,r,s,a,o;n[n.length-1]==="="&&(e--,n[n.length-2]==="="&&e--);var l=typeof ArrayBuffer<"u"&&typeof Uint8Array<"u"&&typeof Uint8Array.prototype.slice<"u"?new ArrayBuffer(e):new Array(e),c=Array.isArray(l)?l:new Uint8Array(l);for(t=0;t<A;t+=4)r=$i[n.charCodeAt(t)],s=$i[n.charCodeAt(t+1)],a=$i[n.charCodeAt(t+2)],o=$i[n.charCodeAt(t+3)],c[i++]=r<<2|s>>4,c[i++]=(s&15)<<4|a>>2,c[i++]=(a&3)<<6|o&63;return l},Ud=function(n){for(var e=n.length,A=[],t=0;t<e;t+=2)A.push(n[t+1]<<8|n[t]);return A},yd=function(n){for(var e=n.length,A=[],t=0;t<e;t+=4)A.push(n[t+3]<<24|n[t+2]<<16|n[t+1]<<8|n[t]);return A},On=5,ul=6+5,Ca=2,Sd=ul-On,Bh=65536>>On,Md=1<<On,xa=Md-1,Fd=1024>>On,bd=Bh+Fd,Td=bd,Qd=32,Id=Td+Qd,Ld=65536>>ul,Rd=1<<Sd,Dd=Rd-1,Ol=function(n,e,A){return n.slice?n.slice(e,A):new Uint16Array(Array.prototype.slice.call(n,e,A))},Hd=function(n,e,A){return n.slice?n.slice(e,A):new Uint32Array(Array.prototype.slice.call(n,e,A))},Pd=function(n,e){var A=xd(n),t=Array.isArray(A)?yd(A):new Uint32Array(A),i=Array.isArray(A)?Ud(A):new Uint16Array(A),r=24,s=Ol(i,r/2,t[4]/2),a=t[5]===2?Ol(i,(r+t[4])/2):Hd(t,Math.ceil((r+t[4])/4));return new Od(t[0],t[1],t[2],t[3],s,a)},Od=function(){function n(e,A,t,i,r,s){this.initialValue=e,this.errorValue=A,this.highStart=t,this.highValueIndex=i,this.index=r,this.data=s}return n.prototype.get=function(e){var A;if(e>=0){if(e<55296||e>56319&&e<=65535)return A=this.index[e>>On],A=(A<<Ca)+(e&xa),this.data[A];if(e<=65535)return A=this.index[Bh+(e-55296>>On)],A=(A<<Ca)+(e&xa),this.data[A];if(e<this.highStart)return A=Id-Ld+(e>>ul),A=this.index[A],A+=e>>On&Dd,A=this.index[A],A=(A<<Ca)+(e&xa),this.data[A];if(e<=1114111)return this.data[this.highValueIndex]}return this.errorValue},n}(),Nl="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Nd=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(var Pr=0;Pr<Nl.length;Pr++)Nd[Nl.charCodeAt(Pr)]=Pr;var Gd="KwAAAAAAAAAACA4AUD0AADAgAAACAAAAAAAIABAAGABAAEgAUABYAGAAaABgAGgAYgBqAF8AZwBgAGgAcQB5AHUAfQCFAI0AlQCdAKIAqgCyALoAYABoAGAAaABgAGgAwgDKAGAAaADGAM4A0wDbAOEA6QDxAPkAAQEJAQ8BFwF1AH0AHAEkASwBNAE6AUIBQQFJAVEBWQFhAWgBcAF4ATAAgAGGAY4BlQGXAZ8BpwGvAbUBvQHFAc0B0wHbAeMB6wHxAfkBAQIJAvEBEQIZAiECKQIxAjgCQAJGAk4CVgJeAmQCbAJ0AnwCgQKJApECmQKgAqgCsAK4ArwCxAIwAMwC0wLbAjAA4wLrAvMC+AIAAwcDDwMwABcDHQMlAy0DNQN1AD0DQQNJA0kDSQNRA1EDVwNZA1kDdQB1AGEDdQBpA20DdQN1AHsDdQCBA4kDkQN1AHUAmQOhA3UAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AKYDrgN1AHUAtgO+A8YDzgPWAxcD3gPjA+sD8wN1AHUA+wMDBAkEdQANBBUEHQQlBCoEFwMyBDgEYABABBcDSARQBFgEYARoBDAAcAQzAXgEgASIBJAEdQCXBHUAnwSnBK4EtgS6BMIEyAR1AHUAdQB1AHUAdQCVANAEYABgAGAAYABgAGAAYABgANgEYADcBOQEYADsBPQE/AQEBQwFFAUcBSQFLAU0BWQEPAVEBUsFUwVbBWAAYgVgAGoFcgV6BYIFigWRBWAAmQWfBaYFYABgAGAAYABgAKoFYACxBbAFuQW6BcEFwQXHBcEFwQXPBdMF2wXjBeoF8gX6BQIGCgYSBhoGIgYqBjIGOgZgAD4GRgZMBmAAUwZaBmAAYABgAGAAYABgAGAAYABgAGAAYABgAGIGYABpBnAGYABgAGAAYABgAGAAYABgAGAAYAB4Bn8GhQZgAGAAYAB1AHcDFQSLBmAAYABgAJMGdQA9A3UAmwajBqsGqwaVALMGuwbDBjAAywbSBtIG1QbSBtIG0gbSBtIG0gbdBuMG6wbzBvsGAwcLBxMHAwcbByMHJwcsBywHMQcsB9IGOAdAB0gHTgfSBkgHVgfSBtIG0gbSBtIG0gbSBtIG0gbSBiwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdgAGAALAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdbB2MHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB2kH0gZwB64EdQB1AHUAdQB1AHUAdQB1AHUHfQdgAIUHjQd1AHUAlQedB2AAYAClB6sHYACzB7YHvgfGB3UAzgfWBzMB3gfmB1EB7gf1B/0HlQENAQUIDQh1ABUIHQglCBcDLQg1CD0IRQhNCEEDUwh1AHUAdQBbCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIcAh3CHoIMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIgggwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAALAcsBywHLAcsBywHLAcsBywHLAcsB4oILAcsB44I0gaWCJ4Ipgh1AHUAqgiyCHUAdQB1AHUAdQB1AHUAdQB1AHUAtwh8AXUAvwh1AMUIyQjRCNkI4AjoCHUAdQB1AO4I9gj+CAYJDgkTCS0HGwkjCYIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiAAIAAAAFAAYABgAGIAXwBgAHEAdQBFAJUAogCyAKAAYABgAEIA4ABGANMA4QDxAMEBDwE1AFwBLAE6AQEBUQF4QkhCmEKoQrhCgAHIQsAB0MLAAcABwAHAAeDC6ABoAHDCwMMAAcABwAHAAdDDGMMAAcAB6MM4wwjDWMNow3jDaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAEjDqABWw6bDqABpg6gAaABoAHcDvwOPA+gAaABfA/8DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DpcPAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcAB9cPKwkyCToJMAB1AHUAdQBCCUoJTQl1AFUJXAljCWcJawkwADAAMAAwAHMJdQB2CX4JdQCECYoJjgmWCXUAngkwAGAAYABxAHUApgn3A64JtAl1ALkJdQDACTAAMAAwADAAdQB1AHUAdQB1AHUAdQB1AHUAowYNBMUIMAAwADAAMADICcsJ0wnZCRUE4QkwAOkJ8An4CTAAMAB1AAAKvwh1AAgKDwoXCh8KdQAwACcKLgp1ADYKqAmICT4KRgowADAAdQB1AE4KMAB1AFYKdQBeCnUAZQowADAAMAAwADAAMAAwADAAMAAVBHUAbQowADAAdQC5CXUKMAAwAHwBxAijBogEMgF9CoQKiASMCpQKmgqIBKIKqgquCogEDQG2Cr4KxgrLCjAAMADTCtsKCgHjCusK8Qr5CgELMAAwADAAMAB1AIsECQsRC3UANAEZCzAAMAAwADAAMAB1ACELKQswAHUANAExCzkLdQBBC0kLMABRC1kLMAAwADAAMAAwADAAdQBhCzAAMAAwAGAAYABpC3ELdwt/CzAAMACHC4sLkwubC58Lpwt1AK4Ltgt1APsDMAAwADAAMAAwADAAMAAwAL4LwwvLC9IL1wvdCzAAMADlC+kL8Qv5C/8LSQswADAAMAAwADAAMAAwADAAMAAHDDAAMAAwADAAMAAODBYMHgx1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1ACYMMAAwADAAdQB1AHUALgx1AHUAdQB1AHUAdQA2DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AD4MdQBGDHUAdQB1AHUAdQB1AEkMdQB1AHUAdQB1AFAMMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQBYDHUAdQB1AF8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUA+wMVBGcMMAAwAHwBbwx1AHcMfwyHDI8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAYABgAJcMMAAwADAAdQB1AJ8MlQClDDAAMACtDCwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB7UMLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AA0EMAC9DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAsBywHLAcsBywHLAcsBywHLQcwAMEMyAwsBywHLAcsBywHLAcsBywHLAcsBywHzAwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1ANQM2QzhDDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMABgAGAAYABgAGAAYABgAOkMYADxDGAA+AwADQYNYABhCWAAYAAODTAAMAAwADAAFg1gAGAAHg37AzAAMAAwADAAYABgACYNYAAsDTQNPA1gAEMNPg1LDWAAYABgAGAAYABgAGAAYABgAGAAUg1aDYsGVglhDV0NcQBnDW0NdQ15DWAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAlQCBDZUAiA2PDZcNMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAnw2nDTAAMAAwADAAMAAwAHUArw23DTAAMAAwADAAMAAwADAAMAAwADAAMAB1AL8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQDHDTAAYABgAM8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA1w11ANwNMAAwAD0B5A0wADAAMAAwADAAMADsDfQN/A0EDgwOFA4wABsOMAAwADAAMAAwADAAMAAwANIG0gbSBtIG0gbSBtIG0gYjDigOwQUuDsEFMw7SBjoO0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGQg5KDlIOVg7SBtIGXg5lDm0OdQ7SBtIGfQ6EDooOjQ6UDtIGmg6hDtIG0gaoDqwO0ga0DrwO0gZgAGAAYADEDmAAYAAkBtIGzA5gANIOYADaDokO0gbSBt8O5w7SBu8O0gb1DvwO0gZgAGAAxA7SBtIG0gbSBtIGYABgAGAAYAAED2AAsAUMD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHJA8sBywHLAcsBywHLAccDywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywPLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAc0D9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHPA/SBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gYUD0QPlQCVAJUAMAAwADAAMACVAJUAlQCVAJUAlQCVAEwPMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA//8EAAQABAAEAAQABAAEAAQABAANAAMAAQABAAIABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQACgATABcAHgAbABoAHgAXABYAEgAeABsAGAAPABgAHABLAEsASwBLAEsASwBLAEsASwBLABgAGAAeAB4AHgATAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYAGwASAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWAA0AEQAeAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAFAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJABYAGgAbABsAGwAeAB0AHQAeAE8AFwAeAA0AHgAeABoAGwBPAE8ADgBQAB0AHQAdAE8ATwAXAE8ATwBPABYAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAFAATwBAAE8ATwBPAEAATwBQAFAATwBQAB4AHgAeAB4AHgAeAB0AHQAdAB0AHgAdAB4ADgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgBQAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkACQAJAAkACQAJAAkABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAFAAHgAeAB4AKwArAFAAUABQAFAAGABQACsAKwArACsAHgAeAFAAHgBQAFAAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUAAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAYAA0AKwArAB4AHgAbACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAB4ABAAEAB4ABAAEABMABAArACsAKwArACsAKwArACsAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAKwArACsAKwBWAFYAVgBWAB4AHgArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AGgAaABoAGAAYAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQAEwAEACsAEwATAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABLAEsASwBLAEsASwBLAEsASwBLABoAGQAZAB4AUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABMAUAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABABQAFAABAAEAB4ABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUAAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAFAABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQAUABQAB4AHgAYABMAUAArACsABAAbABsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAFAABAAEAAQABAAEAFAABAAEAAQAUAAEAAQABAAEAAQAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArACsAHgArAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAUAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEAA0ADQBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUAArACsAKwBQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABABQACsAKwArACsAKwArACsAKwAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUAAaABoAUABQAFAAUABQAEwAHgAbAFAAHgAEACsAKwAEAAQABAArAFAAUABQAFAAUABQACsAKwArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQACsAUABQACsAKwAEACsABAAEAAQABAAEACsAKwArACsABAAEACsAKwAEAAQABAArACsAKwAEACsAKwArACsAKwArACsAUABQAFAAUAArAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLAAQABABQAFAAUAAEAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAArACsAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AGwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAKwArACsAKwArAAQABAAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAAQAUAArAFAAUABQAFAAUABQACsAKwArAFAAUABQACsAUABQAFAAUAArACsAKwBQAFAAKwBQACsAUABQACsAKwArAFAAUAArACsAKwBQAFAAUAArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAAQABAAEAAQABAArACsAKwAEAAQABAArAAQABAAEAAQAKwArAFAAKwArACsAKwArACsABAArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAHgAeAB4AHgAeAB4AGwAeACsAKwArACsAKwAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAUABQAFAAKwArACsAKwArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwAOAFAAUABQAFAAUABQAFAAHgBQAAQABAAEAA4AUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAKwArAAQAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAKwArACsAKwArACsAUAArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABABQAB4AKwArACsAKwBQAFAAUAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQABoAUABQAFAAUABQAFAAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQACsAUAArACsAUABQAFAAUABQAFAAUAArACsAKwAEACsAKwArACsABAAEAAQABAAEAAQAKwAEACsABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgAqACsAKwArACsAGwBcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAeAEsASwBLAEsASwBLAEsASwBLAEsADQANACsAKwArACsAKwBcAFwAKwBcACsAXABcAFwAXABcACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAXAArAFwAXABcAFwAXABcAFwAXABcAFwAKgBcAFwAKgAqACoAKgAqACoAKgAqACoAXAArACsAXABcAFwAXABcACsAXAArACoAKgAqACoAKgAqACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwBcAFwAXABcAFAADgAOAA4ADgAeAA4ADgAJAA4ADgANAAkAEwATABMAEwATAAkAHgATAB4AHgAeAAQABAAeAB4AHgAeAB4AHgBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQAFAADQAEAB4ABAAeAAQAFgARABYAEQAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAAQABAAEAAQADQAEAAQAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAA0ADQAeAB4AHgAeAB4AHgAEAB4AHgAeAB4AHgAeACsAHgAeAA4ADgANAA4AHgAeAB4AHgAeAAkACQArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgBcAEsASwBLAEsASwBLAEsASwBLAEsADQANAB4AHgAeAB4AXABcAFwAXABcAFwAKgAqACoAKgBcAFwAXABcACoAKgAqAFwAKgAqACoAXABcACoAKgAqACoAKgAqACoAXABcAFwAKgAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqAFwAKgBLAEsASwBLAEsASwBLAEsASwBLACoAKgAqACoAKgAqAFAAUABQAFAAUABQACsAUAArACsAKwArACsAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAKwBQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsABAAEAAQAHgANAB4AHgAeAB4AHgAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUAArACsADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWABEAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQANAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAANAA0AKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUAArAAQABAArACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqAA0ADQAVAFwADQAeAA0AGwBcACoAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwAeAB4AEwATAA0ADQAOAB4AEwATAB4ABAAEAAQACQArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAHgArACsAKwATABMASwBLAEsASwBLAEsASwBLAEsASwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAXABcAFwAXABcACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAXAArACsAKwAqACoAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsAHgAeAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKwAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKwArAAQASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACoAKgAqACoAKgAqACoAXAAqACoAKgAqACoAKgArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABABQAFAAUABQAFAAUABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwANAA0AHgANAA0ADQANAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwAeAB4AHgAeAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArAA0ADQANAA0ADQBLAEsASwBLAEsASwBLAEsASwBLACsAKwArAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUAAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAAQAUABQAFAAUABQAFAABABQAFAABAAEAAQAUAArACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQACsAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQACsAKwAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQACsAHgAeAB4AHgAeAB4AHgAOAB4AKwANAA0ADQANAA0ADQANAAkADQANAA0ACAAEAAsABAAEAA0ACQANAA0ADAAdAB0AHgAXABcAFgAXABcAFwAWABcAHQAdAB4AHgAUABQAFAANAAEAAQAEAAQABAAEAAQACQAaABoAGgAaABoAGgAaABoAHgAXABcAHQAVABUAHgAeAB4AHgAeAB4AGAAWABEAFQAVABUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ADQAeAA0ADQANAA0AHgANAA0ADQAHAB4AHgAeAB4AKwAEAAQABAAEAAQABAAEAAQABAAEAFAAUAArACsATwBQAFAAUABQAFAAHgAeAB4AFgARAE8AUABPAE8ATwBPAFAAUABQAFAAUAAeAB4AHgAWABEAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArABsAGwAbABsAGwAbABsAGgAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGgAbABsAGwAbABoAGwAbABoAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAHgAeAFAAGgAeAB0AHgBQAB4AGgAeAB4AHgAeAB4AHgAeAB4AHgBPAB4AUAAbAB4AHgBQAFAAUABQAFAAHgAeAB4AHQAdAB4AUAAeAFAAHgBQAB4AUABPAFAAUAAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgBQAFAAUABQAE8ATwBQAFAAUABQAFAATwBQAFAATwBQAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAUABQAFAATwBPAE8ATwBPAE8ATwBPAE8ATwBQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABPAB4AHgArACsAKwArAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHQAdAB4AHgAeAB0AHQAeAB4AHQAeAB4AHgAdAB4AHQAbABsAHgAdAB4AHgAeAB4AHQAeAB4AHQAdAB0AHQAeAB4AHQAeAB0AHgAdAB0AHQAdAB0AHQAeAB0AHgAeAB4AHgAeAB0AHQAdAB0AHgAeAB4AHgAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB0AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAdAB0AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAWABEAHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AHQAdAB0AHgAeAB0AHgAeAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlAB4AHQAdAB4AHgAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AJQAlAB0AHQAlAB4AJQAlACUAIAAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAdAB0AHQAeAB0AJQAdAB0AHgAdAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAdAB0AHQAdACUAHgAlACUAJQAdACUAJQAdAB0AHQAlACUAHQAdACUAHQAdACUAJQAlAB4AHQAeAB4AHgAeAB0AHQAlAB0AHQAdAB0AHQAdACUAJQAlACUAJQAdACUAJQAgACUAHQAdACUAJQAlACUAJQAlACUAJQAeAB4AHgAlACUAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AFwAXABcAFwAXABcAHgATABMAJQAeAB4AHgAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARABYAEQAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAeAB4AKwArACsAKwArABMADQANAA0AUAATAA0AUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUAANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAA0ADQANAA0ADQANAA0ADQAeAA0AFgANAB4AHgAXABcAHgAeABcAFwAWABEAFgARABYAEQAWABEADQANAA0ADQATAFAADQANAB4ADQANAB4AHgAeAB4AHgAMAAwADQANAA0AHgANAA0AFgANAA0ADQANAA0ADQANAA0AHgANAB4ADQANAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArAA0AEQARACUAJQBHAFcAVwAWABEAFgARABYAEQAWABEAFgARACUAJQAWABEAFgARABYAEQAWABEAFQAWABEAEQAlAFcAVwBXAFcAVwBXAFcAVwBXAAQABAAEAAQABAAEACUAVwBXAFcAVwA2ACUAJQBXAFcAVwBHAEcAJQAlACUAKwBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBRAFcAUQBXAFEAVwBXAFcAVwBXAFcAUQBXAFcAVwBXAFcAVwBRAFEAKwArAAQABAAVABUARwBHAFcAFQBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBRAFcAVwBXAFcAVwBXAFEAUQBXAFcAVwBXABUAUQBHAEcAVwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwAlACUAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACsAKwArACsAKwArACsAKwArACsAKwArAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBPAE8ATwBPAE8ATwBPAE8AJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADQATAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQAHgBQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAeAA0ADQANAA0ADQArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAAQAUABQAFAABABQAFAAUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAeAB4AHgAeAAQAKwArACsAUABQAFAAUABQAFAAHgAeABoAHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADgAOABMAEwArACsAKwArACsAKwArACsABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUAAeAB4AHgBQAA4AUABQAAQAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAB4AWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYACsAKwArAAQAHgAeAB4AHgAeAB4ADQANAA0AHgAeAB4AHgArAFAASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArAB4AHgBcAFwAXABcAFwAKgBcAFwAXABcAFwAXABcAFwAXABcAEsASwBLAEsASwBLAEsASwBLAEsAXABcAFwAXABcACsAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAFAAUABQAAQAUABQAFAAUABQAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAHgANAA0ADQBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAKgAqACoAXABcACoAKgBcAFwAXABcAFwAKgAqAFwAKgBcACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAA0ADQBQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQADQAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAVABVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBUAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVACsAKwArACsAKwArACsAKwArACsAKwArAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAKwArACsAKwBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAKwArACsAKwAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArACsAKwArAFYABABWAFYAVgBWAFYAVgBWAFYAVgBWAB4AVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgArAFYAVgBWAFYAVgArAFYAKwBWAFYAKwBWAFYAKwBWAFYAVgBWAFYAVgBWAFYAVgBWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAEQAWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAaAB4AKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAGAARABEAGAAYABMAEwAWABEAFAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACUAJQAlACUAJQAWABEAFgARABYAEQAWABEAFgARABYAEQAlACUAFgARACUAJQAlACUAJQAlACUAEQAlABEAKwAVABUAEwATACUAFgARABYAEQAWABEAJQAlACUAJQAlACUAJQAlACsAJQAbABoAJQArACsAKwArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAcAKwATACUAJQAbABoAJQAlABYAEQAlACUAEQAlABEAJQBXAFcAVwBXAFcAVwBXAFcAVwBXABUAFQAlACUAJQATACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXABYAJQARACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAWACUAEQAlABYAEQARABYAEQARABUAVwBRAFEAUQBRAFEAUQBRAFEAUQBRAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcARwArACsAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXACsAKwBXAFcAVwBXAFcAVwArACsAVwBXAFcAKwArACsAGgAbACUAJQAlABsAGwArAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAAQAB0AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsADQANAA0AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAA0AUABQAFAAUAArACsAKwArAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwBQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAUABQAFAAUABQAAQABAAEACsABAAEACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAKwBQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAA0ADQANAA0ADQANAA0ADQAeACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAArACsAKwArAFAAUABQAFAAUAANAA0ADQANAA0ADQAUACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsADQANAA0ADQANAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArAAQABAANACsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAB4AHgAeAB4AHgArACsAKwArACsAKwAEAAQABAAEAAQABAAEAA0ADQAeAB4AHgAeAB4AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsASwBLAEsASwBLAEsASwBLAEsASwANAA0ADQANAFAABAAEAFAAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAeAA4AUAArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAADQANAB4ADQAEAAQABAAEAB4ABAAEAEsASwBLAEsASwBLAEsASwBLAEsAUAAOAFAADQANAA0AKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAA0AHgANAA0AHgAEACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAA0AKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsABAAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAUAArACsAKwArACsAKwAEACsAKwArACsAKwBQAFAAUABQAFAABAAEACsAKwAEAAQABAAEAAQABAAEACsAKwArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABABQAFAAUABQAA0ADQANAA0AHgBLAEsASwBLAEsASwBLAEsASwBLAA0ADQArAB4ABABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUAAeAFAAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABAAEAAQADgANAA0AEwATAB4AHgAeAA0ADQANAA0ADQANAA0ADQANAA0ADQANAA0ADQANAFAAUABQAFAABAAEACsAKwAEAA0ADQAeAFAAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKwArACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBcAFwADQANAA0AKgBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQAKwAEAAQAKwArAAQABAAEAAQAUAAEAFAABAAEAA0ADQANACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABABQAA4AUAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAOAB4ADQANAA0ADQAOAB4ABAArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAA0ADQANAFAADgAOAA4ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAFAADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAOABMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAArACsAKwAEACsABAAEACsABAAEAAQABAAEAAQABABQAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAaABoAGgAaAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABIAEgAQwBDAEMAUABQAFAAUABDAFAAUABQAEgAQwBIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABDAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAJAAkACQAJAAkACQAJABYAEQArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwANAA0AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAANACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQANAB4AHgAeAB4AHgAeAFAAUABQAFAADQAeACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAA0AHgAeACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAARwBHABUARwAJACsAKwArACsAKwArACsAKwArACsAKwAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUQBRAFEAKwArACsAKwArACsAKwArACsAKwArACsAKwBRAFEAUQBRACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAHgAEAAQADQAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQABAAEAAQABAAeAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQAHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAKwArAFAAKwArAFAAUAArACsAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUAArAFAAUABQAFAAUABQAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAHgAeAFAAUABQAFAAUAArAFAAKwArACsAUABQAFAAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeACsAKwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4ABAAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAHgAeAA0ADQANAA0AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArAAQABAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwBQAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArABsAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAB4AHgAeAB4ABAAEAAQABAAEAAQABABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArABYAFgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAGgBQAFAAUAAaAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUAArACsAKwArACsAKwBQACsAKwArACsAUAArAFAAKwBQACsAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUAArAFAAKwBQACsAUAArAFAAUAArAFAAKwArAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAKwBQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AJQAlACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeACUAJQAlAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAlACUAJQAlACUAHgAlACUAJQAlACUAIAAgACAAJQAlACAAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACEAIQAhACEAIQAlACUAIAAgACUAJQAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAIAAlACUAJQAlACAAIAAgACUAIAAgACAAJQAlACUAJQAlACUAJQAgACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAlAB4AJQAeACUAJQAlACUAJQAgACUAJQAlACUAHgAlAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACAAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABcAFwAXABUAFQAVAB4AHgAeAB4AJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAgACUAJQAgACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAIAAgACUAJQAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACAAIAAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACAAIAAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAA==",Gl=50,Vd=1,_h=2,wh=3,Kd=4,kd=5,Vl=7,vh=8,Kl=9,sn=10,bo=11,kl=12,To=13,zd=14,er=15,Qo=16,Or=17,zi=18,Wd=19,zl=20,Io=21,Wi=22,Ua=23,Xn=24,ZA=25,Ar=26,tr=27,Yn=28,Xd=29,Mn=30,Yd=31,Nr=32,Gr=33,Lo=34,Ro=35,Do=36,Br=37,Ho=38,Ms=39,Fs=40,ya=41,Eh=42,Jd=43,qd=[9001,65288],Ch="!",Je="×",Vr="÷",Po=Pd(Gd),Rt=[Mn,Do],Oo=[Vd,_h,wh,kd],xh=[sn,vh],Wl=[tr,Ar],Zd=Oo.concat(xh),Xl=[Ho,Ms,Fs,Lo,Ro],jd=[er,To],$d=function(n,e){e===void 0&&(e="strict");var A=[],t=[],i=[];return n.forEach(function(r,s){var a=Po.get(r);if(a>Gl?(i.push(!0),a-=Gl):i.push(!1),["normal","auto","loose"].indexOf(e)!==-1&&[8208,8211,12316,12448].indexOf(r)!==-1)return t.push(s),A.push(Qo);if(a===Kd||a===bo){if(s===0)return t.push(s),A.push(Mn);var o=A[s-1];return Zd.indexOf(o)===-1?(t.push(t[s-1]),A.push(o)):(t.push(s),A.push(Mn))}if(t.push(s),a===Yd)return A.push(e==="strict"?Io:Br);if(a===Eh||a===Xd)return A.push(Mn);if(a===Jd)return r>=131072&&r<=196605||r>=196608&&r<=262141?A.push(Br):A.push(Mn);A.push(a)}),[t,A,i]},Sa=function(n,e,A,t){var i=t[A];if(Array.isArray(n)?n.indexOf(i)!==-1:n===i)for(var r=A;r<=t.length;){r++;var s=t[r];if(s===e)return!0;if(s!==sn)break}if(i===sn)for(var r=A;r>0;){r--;var a=t[r];if(Array.isArray(n)?n.indexOf(a)!==-1:n===a)for(var o=A;o<=t.length;){o++;var s=t[o];if(s===e)return!0;if(s!==sn)break}if(a!==sn)break}return!1},Yl=function(n,e){for(var A=n;A>=0;){var t=e[A];if(t===sn)A--;else return t}return 0},ep=function(n,e,A,t,i){if(A[t]===0)return Je;var r=t-1;if(Array.isArray(i)&&i[r]===!0)return Je;var s=r-1,a=r+1,o=e[r],l=s>=0?e[s]:0,c=e[a];if(o===_h&&c===wh)return Je;if(Oo.indexOf(o)!==-1)return Ch;if(Oo.indexOf(c)!==-1||xh.indexOf(c)!==-1)return Je;if(Yl(r,e)===vh)return Vr;if(Po.get(n[r])===bo||(o===Nr||o===Gr)&&Po.get(n[a])===bo||o===Vl||c===Vl||o===Kl||[sn,To,er].indexOf(o)===-1&&c===Kl||[Or,zi,Wd,Xn,Yn].indexOf(c)!==-1||Yl(r,e)===Wi||Sa(Ua,Wi,r,e)||Sa([Or,zi],Io,r,e)||Sa(kl,kl,r,e))return Je;if(o===sn)return Vr;if(o===Ua||c===Ua)return Je;if(c===Qo||o===Qo)return Vr;if([To,er,Io].indexOf(c)!==-1||o===zd||l===Do&&jd.indexOf(o)!==-1||o===Yn&&c===Do||c===zl||Rt.indexOf(c)!==-1&&o===ZA||Rt.indexOf(o)!==-1&&c===ZA||o===tr&&[Br,Nr,Gr].indexOf(c)!==-1||[Br,Nr,Gr].indexOf(o)!==-1&&c===Ar||Rt.indexOf(o)!==-1&&Wl.indexOf(c)!==-1||Wl.indexOf(o)!==-1&&Rt.indexOf(c)!==-1||[tr,Ar].indexOf(o)!==-1&&(c===ZA||[Wi,er].indexOf(c)!==-1&&e[a+1]===ZA)||[Wi,er].indexOf(o)!==-1&&c===ZA||o===ZA&&[ZA,Yn,Xn].indexOf(c)!==-1)return Je;if([ZA,Yn,Xn,Or,zi].indexOf(c)!==-1)for(var u=r;u>=0;){var h=e[u];if(h===ZA)return Je;if([Yn,Xn].indexOf(h)!==-1)u--;else break}if([tr,Ar].indexOf(c)!==-1)for(var u=[Or,zi].indexOf(o)!==-1?s:r;u>=0;){var h=e[u];if(h===ZA)return Je;if([Yn,Xn].indexOf(h)!==-1)u--;else break}if(Ho===o&&[Ho,Ms,Lo,Ro].indexOf(c)!==-1||[Ms,Lo].indexOf(o)!==-1&&[Ms,Fs].indexOf(c)!==-1||[Fs,Ro].indexOf(o)!==-1&&c===Fs||Xl.indexOf(o)!==-1&&[zl,Ar].indexOf(c)!==-1||Xl.indexOf(c)!==-1&&o===tr||Rt.indexOf(o)!==-1&&Rt.indexOf(c)!==-1||o===Xn&&Rt.indexOf(c)!==-1||Rt.concat(ZA).indexOf(o)!==-1&&c===Wi&&qd.indexOf(n[a])===-1||Rt.concat(ZA).indexOf(c)!==-1&&o===zi)return Je;if(o===ya&&c===ya){for(var p=A[r],g=1;p>0&&(p--,e[p]===ya);)g++;if(g%2!==0)return Je}return o===Nr&&c===Gr?Je:Vr},Ap=function(n,e){e||(e={lineBreak:"normal",wordBreak:"normal"});var A=$d(n,e.lineBreak),t=A[0],i=A[1],r=A[2];(e.wordBreak==="break-all"||e.wordBreak==="break-word")&&(i=i.map(function(a){return[ZA,Mn,Eh].indexOf(a)!==-1?Br:a}));var s=e.wordBreak==="keep-all"?r.map(function(a,o){return a&&n[o]>=19968&&n[o]<=40959}):void 0;return[t,i,s]},tp=function(){function n(e,A,t,i){this.codePoints=e,this.required=A===Ch,this.start=t,this.end=i}return n.prototype.slice=function(){return cA.apply(void 0,this.codePoints.slice(this.start,this.end))},n}(),np=function(n,e){var A=ta(n),t=Ap(A,e),i=t[0],r=t[1],s=t[2],a=A.length,o=0,l=0;return{next:function(){if(l>=a)return{done:!0,value:null};for(var c=Je;l<a&&(c=ep(A,r,i,++l,s))===Je;);if(c!==Je||l===a){var u=new tp(A,c,o,l);return o=l,{value:u,done:!1}}return{done:!0,value:null}}}},ip=1,rp=2,Mr=4,Jl=8,Is=10,ql=47,or=92,sp=9,ap=32,Kr=34,Xi=61,op=35,lp=36,cp=37,kr=39,zr=40,Yi=41,up=95,KA=45,hp=33,fp=60,dp=62,pp=64,gp=91,mp=93,Bp=61,_p=123,Wr=63,wp=125,Zl=124,vp=126,Ep=128,jl=65533,Ma=42,Tn=43,Cp=44,xp=58,Up=59,_r=46,yp=0,Sp=8,Mp=11,Fp=14,bp=31,Tp=127,vt=-1,Uh=48,yh=97,Sh=101,Qp=102,Ip=117,Lp=122,Mh=65,Fh=69,bh=70,Rp=85,Dp=90,LA=function(n){return n>=Uh&&n<=57},Hp=function(n){return n>=55296&&n<=57343},Jn=function(n){return LA(n)||n>=Mh&&n<=bh||n>=yh&&n<=Qp},Pp=function(n){return n>=yh&&n<=Lp},Op=function(n){return n>=Mh&&n<=Dp},Np=function(n){return Pp(n)||Op(n)},Gp=function(n){return n>=Ep},Xr=function(n){return n===Is||n===sp||n===ap},Ls=function(n){return Np(n)||Gp(n)||n===up},$l=function(n){return Ls(n)||LA(n)||n===KA},Vp=function(n){return n>=yp&&n<=Sp||n===Mp||n>=Fp&&n<=bp||n===Tp},An=function(n,e){return n!==or?!1:e!==Is},Yr=function(n,e,A){return n===KA?Ls(e)||An(e,A):Ls(n)?!0:!!(n===or&&An(n,e))},Fa=function(n,e,A){return n===Tn||n===KA?LA(e)?!0:e===_r&&LA(A):LA(n===_r?e:n)},Kp=function(n){var e=0,A=1;(n[e]===Tn||n[e]===KA)&&(n[e]===KA&&(A=-1),e++);for(var t=[];LA(n[e]);)t.push(n[e++]);var i=t.length?parseInt(cA.apply(void 0,t),10):0;n[e]===_r&&e++;for(var r=[];LA(n[e]);)r.push(n[e++]);var s=r.length,a=s?parseInt(cA.apply(void 0,r),10):0;(n[e]===Fh||n[e]===Sh)&&e++;var o=1;(n[e]===Tn||n[e]===KA)&&(n[e]===KA&&(o=-1),e++);for(var l=[];LA(n[e]);)l.push(n[e++]);var c=l.length?parseInt(cA.apply(void 0,l),10):0;return A*(i+a*Math.pow(10,-s))*Math.pow(10,o*c)},kp={type:2},zp={type:3},Wp={type:4},Xp={type:13},Yp={type:8},Jp={type:21},qp={type:9},Zp={type:10},jp={type:11},$p={type:12},eg={type:14},Jr={type:23},Ag={type:1},tg={type:25},ng={type:24},ig={type:26},rg={type:27},sg={type:28},ag={type:29},og={type:31},No={type:32},Th=function(){function n(){this._value=[]}return n.prototype.write=function(e){this._value=this._value.concat(ta(e))},n.prototype.read=function(){for(var e=[],A=this.consumeToken();A!==No;)e.push(A),A=this.consumeToken();return e},n.prototype.consumeToken=function(){var e=this.consumeCodePoint();switch(e){case Kr:return this.consumeStringToken(Kr);case op:var A=this.peekCodePoint(0),t=this.peekCodePoint(1),i=this.peekCodePoint(2);if($l(A)||An(t,i)){var r=Yr(A,t,i)?rp:ip,s=this.consumeName();return{type:5,value:s,flags:r}}break;case lp:if(this.peekCodePoint(0)===Xi)return this.consumeCodePoint(),Xp;break;case kr:return this.consumeStringToken(kr);case zr:return kp;case Yi:return zp;case Ma:if(this.peekCodePoint(0)===Xi)return this.consumeCodePoint(),eg;break;case Tn:if(Fa(e,this.peekCodePoint(0),this.peekCodePoint(1)))return this.reconsumeCodePoint(e),this.consumeNumericToken();break;case Cp:return Wp;case KA:var a=e,o=this.peekCodePoint(0),l=this.peekCodePoint(1);if(Fa(a,o,l))return this.reconsumeCodePoint(e),this.consumeNumericToken();if(Yr(a,o,l))return this.reconsumeCodePoint(e),this.consumeIdentLikeToken();if(o===KA&&l===dp)return this.consumeCodePoint(),this.consumeCodePoint(),ng;break;case _r:if(Fa(e,this.peekCodePoint(0),this.peekCodePoint(1)))return this.reconsumeCodePoint(e),this.consumeNumericToken();break;case ql:if(this.peekCodePoint(0)===Ma)for(this.consumeCodePoint();;){var c=this.consumeCodePoint();if(c===Ma&&(c=this.consumeCodePoint(),c===ql))return this.consumeToken();if(c===vt)return this.consumeToken()}break;case xp:return ig;case Up:return rg;case fp:if(this.peekCodePoint(0)===hp&&this.peekCodePoint(1)===KA&&this.peekCodePoint(2)===KA)return this.consumeCodePoint(),this.consumeCodePoint(),tg;break;case pp:var u=this.peekCodePoint(0),h=this.peekCodePoint(1),p=this.peekCodePoint(2);if(Yr(u,h,p)){var s=this.consumeName();return{type:7,value:s}}break;case gp:return sg;case or:if(An(e,this.peekCodePoint(0)))return this.reconsumeCodePoint(e),this.consumeIdentLikeToken();break;case mp:return ag;case Bp:if(this.peekCodePoint(0)===Xi)return this.consumeCodePoint(),Yp;break;case _p:return jp;case wp:return $p;case Ip:case Rp:var g=this.peekCodePoint(0),m=this.peekCodePoint(1);return g===Tn&&(Jn(m)||m===Wr)&&(this.consumeCodePoint(),this.consumeUnicodeRangeToken()),this.reconsumeCodePoint(e),this.consumeIdentLikeToken();case Zl:if(this.peekCodePoint(0)===Xi)return this.consumeCodePoint(),qp;if(this.peekCodePoint(0)===Zl)return this.consumeCodePoint(),Jp;break;case vp:if(this.peekCodePoint(0)===Xi)return this.consumeCodePoint(),Zp;break;case vt:return No}return Xr(e)?(this.consumeWhiteSpace(),og):LA(e)?(this.reconsumeCodePoint(e),this.consumeNumericToken()):Ls(e)?(this.reconsumeCodePoint(e),this.consumeIdentLikeToken()):{type:6,value:cA(e)}},n.prototype.consumeCodePoint=function(){var e=this._value.shift();return typeof e>"u"?-1:e},n.prototype.reconsumeCodePoint=function(e){this._value.unshift(e)},n.prototype.peekCodePoint=function(e){return e>=this._value.length?-1:this._value[e]},n.prototype.consumeUnicodeRangeToken=function(){for(var e=[],A=this.consumeCodePoint();Jn(A)&&e.length<6;)e.push(A),A=this.consumeCodePoint();for(var t=!1;A===Wr&&e.length<6;)e.push(A),A=this.consumeCodePoint(),t=!0;if(t){var i=parseInt(cA.apply(void 0,e.map(function(o){return o===Wr?Uh:o})),16),r=parseInt(cA.apply(void 0,e.map(function(o){return o===Wr?bh:o})),16);return{type:30,start:i,end:r}}var s=parseInt(cA.apply(void 0,e),16);if(this.peekCodePoint(0)===KA&&Jn(this.peekCodePoint(1))){this.consumeCodePoint(),A=this.consumeCodePoint();for(var a=[];Jn(A)&&a.length<6;)a.push(A),A=this.consumeCodePoint();var r=parseInt(cA.apply(void 0,a),16);return{type:30,start:s,end:r}}else return{type:30,start:s,end:s}},n.prototype.consumeIdentLikeToken=function(){var e=this.consumeName();return e.toLowerCase()==="url"&&this.peekCodePoint(0)===zr?(this.consumeCodePoint(),this.consumeUrlToken()):this.peekCodePoint(0)===zr?(this.consumeCodePoint(),{type:19,value:e}):{type:20,value:e}},n.prototype.consumeUrlToken=function(){var e=[];if(this.consumeWhiteSpace(),this.peekCodePoint(0)===vt)return{type:22,value:""};var A=this.peekCodePoint(0);if(A===kr||A===Kr){var t=this.consumeStringToken(this.consumeCodePoint());return t.type===0&&(this.consumeWhiteSpace(),this.peekCodePoint(0)===vt||this.peekCodePoint(0)===Yi)?(this.consumeCodePoint(),{type:22,value:t.value}):(this.consumeBadUrlRemnants(),Jr)}for(;;){var i=this.consumeCodePoint();if(i===vt||i===Yi)return{type:22,value:cA.apply(void 0,e)};if(Xr(i))return this.consumeWhiteSpace(),this.peekCodePoint(0)===vt||this.peekCodePoint(0)===Yi?(this.consumeCodePoint(),{type:22,value:cA.apply(void 0,e)}):(this.consumeBadUrlRemnants(),Jr);if(i===Kr||i===kr||i===zr||Vp(i))return this.consumeBadUrlRemnants(),Jr;if(i===or)if(An(i,this.peekCodePoint(0)))e.push(this.consumeEscapedCodePoint());else return this.consumeBadUrlRemnants(),Jr;else e.push(i)}},n.prototype.consumeWhiteSpace=function(){for(;Xr(this.peekCodePoint(0));)this.consumeCodePoint()},n.prototype.consumeBadUrlRemnants=function(){for(;;){var e=this.consumeCodePoint();if(e===Yi||e===vt)return;An(e,this.peekCodePoint(0))&&this.consumeEscapedCodePoint()}},n.prototype.consumeStringSlice=function(e){for(var A=5e4,t="";e>0;){var i=Math.min(A,e);t+=cA.apply(void 0,this._value.splice(0,i)),e-=i}return this._value.shift(),t},n.prototype.consumeStringToken=function(e){var A="",t=0;do{var i=this._value[t];if(i===vt||i===void 0||i===e)return A+=this.consumeStringSlice(t),{type:0,value:A};if(i===Is)return this._value.splice(0,t),Ag;if(i===or){var r=this._value[t+1];r!==vt&&r!==void 0&&(r===Is?(A+=this.consumeStringSlice(t),t=-1,this._value.shift()):An(i,r)&&(A+=this.consumeStringSlice(t),A+=cA(this.consumeEscapedCodePoint()),t=-1))}t++}while(!0)},n.prototype.consumeNumber=function(){var e=[],A=Mr,t=this.peekCodePoint(0);for((t===Tn||t===KA)&&e.push(this.consumeCodePoint());LA(this.peekCodePoint(0));)e.push(this.consumeCodePoint());t=this.peekCodePoint(0);var i=this.peekCodePoint(1);if(t===_r&&LA(i))for(e.push(this.consumeCodePoint(),this.consumeCodePoint()),A=Jl;LA(this.peekCodePoint(0));)e.push(this.consumeCodePoint());t=this.peekCodePoint(0),i=this.peekCodePoint(1);var r=this.peekCodePoint(2);if((t===Fh||t===Sh)&&((i===Tn||i===KA)&&LA(r)||LA(i)))for(e.push(this.consumeCodePoint(),this.consumeCodePoint()),A=Jl;LA(this.peekCodePoint(0));)e.push(this.consumeCodePoint());return[Kp(e),A]},n.prototype.consumeNumericToken=function(){var e=this.consumeNumber(),A=e[0],t=e[1],i=this.peekCodePoint(0),r=this.peekCodePoint(1),s=this.peekCodePoint(2);if(Yr(i,r,s)){var a=this.consumeName();return{type:15,number:A,flags:t,unit:a}}return i===cp?(this.consumeCodePoint(),{type:16,number:A,flags:t}):{type:17,number:A,flags:t}},n.prototype.consumeEscapedCodePoint=function(){var e=this.consumeCodePoint();if(Jn(e)){for(var A=cA(e);Jn(this.peekCodePoint(0))&&A.length<6;)A+=cA(this.consumeCodePoint());Xr(this.peekCodePoint(0))&&this.consumeCodePoint();var t=parseInt(A,16);return t===0||Hp(t)||t>1114111?jl:t}return e===vt?jl:e},n.prototype.consumeName=function(){for(var e="";;){var A=this.consumeCodePoint();if($l(A))e+=cA(A);else if(An(A,this.peekCodePoint(0)))e+=cA(this.consumeEscapedCodePoint());else return this.reconsumeCodePoint(A),e}},n}(),Qh=function(){function n(e){this._tokens=e}return n.create=function(e){var A=new Th;return A.write(e),new n(A.read())},n.parseValue=function(e){return n.create(e).parseComponentValue()},n.parseValues=function(e){return n.create(e).parseComponentValues()},n.prototype.parseComponentValue=function(){for(var e=this.consumeToken();e.type===31;)e=this.consumeToken();if(e.type===32)throw new SyntaxError("Error parsing CSS component value, unexpected EOF");this.reconsumeToken(e);var A=this.consumeComponentValue();do e=this.consumeToken();while(e.type===31);if(e.type===32)return A;throw new SyntaxError("Error parsing CSS component value, multiple values found when expecting only one")},n.prototype.parseComponentValues=function(){for(var e=[];;){var A=this.consumeComponentValue();if(A.type===32)return e;e.push(A),e.push()}},n.prototype.consumeComponentValue=function(){var e=this.consumeToken();switch(e.type){case 11:case 28:case 2:return this.consumeSimpleBlock(e.type);case 19:return this.consumeFunction(e)}return e},n.prototype.consumeSimpleBlock=function(e){for(var A={type:e,values:[]},t=this.consumeToken();;){if(t.type===32||cg(t,e))return A;this.reconsumeToken(t),A.values.push(this.consumeComponentValue()),t=this.consumeToken()}},n.prototype.consumeFunction=function(e){for(var A={name:e.value,values:[],type:18};;){var t=this.consumeToken();if(t.type===32||t.type===3)return A;this.reconsumeToken(t),A.values.push(this.consumeComponentValue())}},n.prototype.consumeToken=function(){var e=this._tokens.shift();return typeof e>"u"?No:e},n.prototype.reconsumeToken=function(e){this._tokens.unshift(e)},n}(),Fr=function(n){return n.type===15},Gi=function(n){return n.type===17},eA=function(n){return n.type===20},lg=function(n){return n.type===0},Go=function(n,e){return eA(n)&&n.value===e},Ih=function(n){return n.type!==31},Di=function(n){return n.type!==31&&n.type!==4},Tt=function(n){var e=[],A=[];return n.forEach(function(t){if(t.type===4){if(A.length===0)throw new Error("Error parsing function args, zero tokens for arg");e.push(A),A=[];return}t.type!==31&&A.push(t)}),A.length&&e.push(A),e},cg=function(n,e){return e===11&&n.type===12||e===28&&n.type===29?!0:e===2&&n.type===3},mn=function(n){return n.type===17||n.type===15},pA=function(n){return n.type===16||mn(n)},Lh=function(n){return n.length>1?[n[0],n[1]]:[n[0]]},yA={type:17,number:0,flags:Mr},hl={type:16,number:50,flags:Mr},an={type:16,number:100,flags:Mr},nr=function(n,e,A){var t=n[0],i=n[1];return[tA(t,e),tA(typeof i<"u"?i:t,A)]},tA=function(n,e){if(n.type===16)return n.number/100*e;if(Fr(n))switch(n.unit){case"rem":case"em":return 16*n.number;case"px":default:return n.number}return n.number},Rh="deg",Dh="grad",Hh="rad",Ph="turn",na={name:"angle",parse:function(n,e){if(e.type===15)switch(e.unit){case Rh:return Math.PI*e.number/180;case Dh:return Math.PI/200*e.number;case Hh:return e.number;case Ph:return Math.PI*2*e.number}throw new Error("Unsupported angle type")}},Oh=function(n){return n.type===15&&(n.unit===Rh||n.unit===Dh||n.unit===Hh||n.unit===Ph)},Nh=function(n){var e=n.filter(eA).map(function(A){return A.value}).join(" ");switch(e){case"to bottom right":case"to right bottom":case"left top":case"top left":return[yA,yA];case"to top":case"bottom":return at(0);case"to bottom left":case"to left bottom":case"right top":case"top right":return[yA,an];case"to right":case"left":return at(90);case"to top left":case"to left top":case"right bottom":case"bottom right":return[an,an];case"to bottom":case"top":return at(180);case"to top right":case"to right top":case"left bottom":case"bottom left":return[an,yA];case"to left":case"right":return at(270)}return 0},at=function(n){return Math.PI*n/180},un={name:"color",parse:function(n,e){if(e.type===18){var A=ug[e.name];if(typeof A>"u")throw new Error('Attempting to parse an unsupported color function "'+e.name+'"');return A(n,e.values)}if(e.type===5){if(e.value.length===3){var t=e.value.substring(0,1),i=e.value.substring(1,2),r=e.value.substring(2,3);return on(parseInt(t+t,16),parseInt(i+i,16),parseInt(r+r,16),1)}if(e.value.length===4){var t=e.value.substring(0,1),i=e.value.substring(1,2),r=e.value.substring(2,3),s=e.value.substring(3,4);return on(parseInt(t+t,16),parseInt(i+i,16),parseInt(r+r,16),parseInt(s+s,16)/255)}if(e.value.length===6){var t=e.value.substring(0,2),i=e.value.substring(2,4),r=e.value.substring(4,6);return on(parseInt(t,16),parseInt(i,16),parseInt(r,16),1)}if(e.value.length===8){var t=e.value.substring(0,2),i=e.value.substring(2,4),r=e.value.substring(4,6),s=e.value.substring(6,8);return on(parseInt(t,16),parseInt(i,16),parseInt(r,16),parseInt(s,16)/255)}}if(e.type===20){var a=zt[e.value.toUpperCase()];if(typeof a<"u")return a}return zt.TRANSPARENT}},hn=function(n){return(255&n)===0},EA=function(n){var e=255&n,A=255&n>>8,t=255&n>>16,i=255&n>>24;return e<255?"rgba("+i+","+t+","+A+","+e/255+")":"rgb("+i+","+t+","+A+")"},on=function(n,e,A,t){return(n<<24|e<<16|A<<8|Math.round(t*255)<<0)>>>0},ec=function(n,e){if(n.type===17)return n.number;if(n.type===16){var A=e===3?1:255;return e===3?n.number/100*A:Math.round(n.number/100*A)}return 0},Ac=function(n,e){var A=e.filter(Di);if(A.length===3){var t=A.map(ec),i=t[0],r=t[1],s=t[2];return on(i,r,s,1)}if(A.length===4){var a=A.map(ec),i=a[0],r=a[1],s=a[2],o=a[3];return on(i,r,s,o)}return 0};function ba(n,e,A){return A<0&&(A+=1),A>=1&&(A-=1),A<1/6?(e-n)*A*6+n:A<1/2?e:A<2/3?(e-n)*6*(2/3-A)+n:n}var tc=function(n,e){var A=e.filter(Di),t=A[0],i=A[1],r=A[2],s=A[3],a=(t.type===17?at(t.number):na.parse(n,t))/(Math.PI*2),o=pA(i)?i.number/100:0,l=pA(r)?r.number/100:0,c=typeof s<"u"&&pA(s)?tA(s,1):1;if(o===0)return on(l*255,l*255,l*255,1);var u=l<=.5?l*(o+1):l+o-l*o,h=l*2-u,p=ba(h,u,a+1/3),g=ba(h,u,a),m=ba(h,u,a-1/3);return on(p*255,g*255,m*255,c)},ug={hsl:tc,hsla:tc,rgb:Ac,rgba:Ac},lr=function(n,e){return un.parse(n,Qh.create(e).parseComponentValue())},zt={ALICEBLUE:4042850303,ANTIQUEWHITE:4209760255,AQUA:16777215,AQUAMARINE:2147472639,AZURE:4043309055,BEIGE:4126530815,BISQUE:4293182719,BLACK:255,BLANCHEDALMOND:4293643775,BLUE:65535,BLUEVIOLET:2318131967,BROWN:2771004159,BURLYWOOD:3736635391,CADETBLUE:1604231423,CHARTREUSE:2147418367,CHOCOLATE:3530104575,CORAL:4286533887,CORNFLOWERBLUE:1687547391,CORNSILK:4294499583,CRIMSON:3692313855,CYAN:16777215,DARKBLUE:35839,DARKCYAN:9145343,DARKGOLDENROD:3095837695,DARKGRAY:2846468607,DARKGREEN:6553855,DARKGREY:2846468607,DARKKHAKI:3182914559,DARKMAGENTA:2332068863,DARKOLIVEGREEN:1433087999,DARKORANGE:4287365375,DARKORCHID:2570243327,DARKRED:2332033279,DARKSALMON:3918953215,DARKSEAGREEN:2411499519,DARKSLATEBLUE:1211993087,DARKSLATEGRAY:793726975,DARKSLATEGREY:793726975,DARKTURQUOISE:13554175,DARKVIOLET:2483082239,DEEPPINK:4279538687,DEEPSKYBLUE:12582911,DIMGRAY:1768516095,DIMGREY:1768516095,DODGERBLUE:512819199,FIREBRICK:2988581631,FLORALWHITE:4294635775,FORESTGREEN:579543807,FUCHSIA:4278255615,GAINSBORO:3705462015,GHOSTWHITE:4177068031,GOLD:4292280575,GOLDENROD:3668254975,GRAY:2155905279,GREEN:8388863,GREENYELLOW:2919182335,GREY:2155905279,HONEYDEW:4043305215,HOTPINK:4285117695,INDIANRED:3445382399,INDIGO:1258324735,IVORY:4294963455,KHAKI:4041641215,LAVENDER:3873897215,LAVENDERBLUSH:4293981695,LAWNGREEN:2096890111,LEMONCHIFFON:4294626815,LIGHTBLUE:2916673279,LIGHTCORAL:4034953471,LIGHTCYAN:3774873599,LIGHTGOLDENRODYELLOW:4210742015,LIGHTGRAY:3553874943,LIGHTGREEN:2431553791,LIGHTGREY:3553874943,LIGHTPINK:4290167295,LIGHTSALMON:4288707327,LIGHTSEAGREEN:548580095,LIGHTSKYBLUE:2278488831,LIGHTSLATEGRAY:2005441023,LIGHTSLATEGREY:2005441023,LIGHTSTEELBLUE:2965692159,LIGHTYELLOW:4294959359,LIME:16711935,LIMEGREEN:852308735,LINEN:4210091775,MAGENTA:4278255615,MAROON:2147483903,MEDIUMAQUAMARINE:1724754687,MEDIUMBLUE:52735,MEDIUMORCHID:3126187007,MEDIUMPURPLE:2473647103,MEDIUMSEAGREEN:1018393087,MEDIUMSLATEBLUE:2070474495,MEDIUMSPRINGGREEN:16423679,MEDIUMTURQUOISE:1221709055,MEDIUMVIOLETRED:3340076543,MIDNIGHTBLUE:421097727,MINTCREAM:4127193855,MISTYROSE:4293190143,MOCCASIN:4293178879,NAVAJOWHITE:4292783615,NAVY:33023,OLDLACE:4260751103,OLIVE:2155872511,OLIVEDRAB:1804477439,ORANGE:4289003775,ORANGERED:4282712319,ORCHID:3664828159,PALEGOLDENROD:4008225535,PALEGREEN:2566625535,PALETURQUOISE:2951671551,PALEVIOLETRED:3681588223,PAPAYAWHIP:4293907967,PEACHPUFF:4292524543,PERU:3448061951,PINK:4290825215,PLUM:3718307327,POWDERBLUE:2967529215,PURPLE:2147516671,REBECCAPURPLE:1714657791,RED:4278190335,ROSYBROWN:3163525119,ROYALBLUE:1097458175,SADDLEBROWN:2336560127,SALMON:4202722047,SANDYBROWN:4104413439,SEAGREEN:780883967,SEASHELL:4294307583,SIENNA:2689740287,SILVER:3233857791,SKYBLUE:2278484991,SLATEBLUE:1784335871,SLATEGRAY:1887473919,SLATEGREY:1887473919,SNOW:4294638335,SPRINGGREEN:16744447,STEELBLUE:1182971135,TAN:3535047935,TEAL:8421631,THISTLE:3636451583,TOMATO:4284696575,TRANSPARENT:0,TURQUOISE:1088475391,VIOLET:4001558271,WHEAT:4125012991,WHITE:4294967295,WHITESMOKE:4126537215,YELLOW:4294902015,YELLOWGREEN:2597139199},hg={name:"background-clip",initialValue:"border-box",prefix:!1,type:1,parse:function(n,e){return e.map(function(A){if(eA(A))switch(A.value){case"padding-box":return 1;case"content-box":return 2}return 0})}},fg={name:"background-color",initialValue:"transparent",prefix:!1,type:3,format:"color"},ia=function(n,e){var A=un.parse(n,e[0]),t=e[1];return t&&pA(t)?{color:A,stop:t}:{color:A,stop:null}},nc=function(n,e){var A=n[0],t=n[n.length-1];A.stop===null&&(A.stop=yA),t.stop===null&&(t.stop=an);for(var i=[],r=0,s=0;s<n.length;s++){var a=n[s].stop;if(a!==null){var o=tA(a,e);o>r?i.push(o):i.push(r),r=o}else i.push(null)}for(var l=null,s=0;s<i.length;s++){var c=i[s];if(c===null)l===null&&(l=s);else if(l!==null){for(var u=s-l,h=i[l-1],p=(c-h)/(u+1),g=1;g<=u;g++)i[l+g-1]=p*g;l=null}}return n.map(function(m,d){var f=m.color;return{color:f,stop:Math.max(Math.min(1,i[d]/e),0)}})},dg=function(n,e,A){var t=e/2,i=A/2,r=tA(n[0],e)-t,s=i-tA(n[1],A);return(Math.atan2(s,r)+Math.PI*2)%(Math.PI*2)},pg=function(n,e,A){var t=typeof n=="number"?n:dg(n,e,A),i=Math.abs(e*Math.sin(t))+Math.abs(A*Math.cos(t)),r=e/2,s=A/2,a=i/2,o=Math.sin(t-Math.PI/2)*a,l=Math.cos(t-Math.PI/2)*a;return[i,r-l,r+l,s-o,s+o]},ht=function(n,e){return Math.sqrt(n*n+e*e)},ic=function(n,e,A,t,i){var r=[[0,0],[0,e],[n,0],[n,e]];return r.reduce(function(s,a){var o=a[0],l=a[1],c=ht(A-o,t-l);return(i?c<s.optimumDistance:c>s.optimumDistance)?{optimumCorner:a,optimumDistance:c}:s},{optimumDistance:i?1/0:-1/0,optimumCorner:null}).optimumCorner},gg=function(n,e,A,t,i){var r=0,s=0;switch(n.size){case 0:n.shape===0?r=s=Math.min(Math.abs(e),Math.abs(e-t),Math.abs(A),Math.abs(A-i)):n.shape===1&&(r=Math.min(Math.abs(e),Math.abs(e-t)),s=Math.min(Math.abs(A),Math.abs(A-i)));break;case 2:if(n.shape===0)r=s=Math.min(ht(e,A),ht(e,A-i),ht(e-t,A),ht(e-t,A-i));else if(n.shape===1){var a=Math.min(Math.abs(A),Math.abs(A-i))/Math.min(Math.abs(e),Math.abs(e-t)),o=ic(t,i,e,A,!0),l=o[0],c=o[1];r=ht(l-e,(c-A)/a),s=a*r}break;case 1:n.shape===0?r=s=Math.max(Math.abs(e),Math.abs(e-t),Math.abs(A),Math.abs(A-i)):n.shape===1&&(r=Math.max(Math.abs(e),Math.abs(e-t)),s=Math.max(Math.abs(A),Math.abs(A-i)));break;case 3:if(n.shape===0)r=s=Math.max(ht(e,A),ht(e,A-i),ht(e-t,A),ht(e-t,A-i));else if(n.shape===1){var a=Math.max(Math.abs(A),Math.abs(A-i))/Math.max(Math.abs(e),Math.abs(e-t)),u=ic(t,i,e,A,!1),l=u[0],c=u[1];r=ht(l-e,(c-A)/a),s=a*r}break}return Array.isArray(n.size)&&(r=tA(n.size[0],t),s=n.size.length===2?tA(n.size[1],i):r),[r,s]},mg=function(n,e){var A=at(180),t=[];return Tt(e).forEach(function(i,r){if(r===0){var s=i[0];if(s.type===20&&s.value==="to"){A=Nh(i);return}else if(Oh(s)){A=na.parse(n,s);return}}var a=ia(n,i);t.push(a)}),{angle:A,stops:t,type:1}},qr=function(n,e){var A=at(180),t=[];return Tt(e).forEach(function(i,r){if(r===0){var s=i[0];if(s.type===20&&["top","left","right","bottom"].indexOf(s.value)!==-1){A=Nh(i);return}else if(Oh(s)){A=(na.parse(n,s)+at(270))%at(360);return}}var a=ia(n,i);t.push(a)}),{angle:A,stops:t,type:1}},Bg=function(n,e){var A=at(180),t=[],i=1,r=0,s=3,a=[];return Tt(e).forEach(function(o,l){var c=o[0];if(l===0){if(eA(c)&&c.value==="linear"){i=1;return}else if(eA(c)&&c.value==="radial"){i=2;return}}if(c.type===18){if(c.name==="from"){var u=un.parse(n,c.values[0]);t.push({stop:yA,color:u})}else if(c.name==="to"){var u=un.parse(n,c.values[0]);t.push({stop:an,color:u})}else if(c.name==="color-stop"){var h=c.values.filter(Di);if(h.length===2){var u=un.parse(n,h[1]),p=h[0];Gi(p)&&t.push({stop:{type:16,number:p.number*100,flags:p.flags},color:u})}}}}),i===1?{angle:(A+at(180))%at(360),stops:t,type:i}:{size:s,shape:r,stops:t,position:a,type:i}},Gh="closest-side",Vh="farthest-side",Kh="closest-corner",kh="farthest-corner",zh="circle",Wh="ellipse",Xh="cover",Yh="contain",_g=function(n,e){var A=0,t=3,i=[],r=[];return Tt(e).forEach(function(s,a){var o=!0;if(a===0){var l=!1;o=s.reduce(function(u,h){if(l)if(eA(h))switch(h.value){case"center":return r.push(hl),u;case"top":case"left":return r.push(yA),u;case"right":case"bottom":return r.push(an),u}else(pA(h)||mn(h))&&r.push(h);else if(eA(h))switch(h.value){case zh:return A=0,!1;case Wh:return A=1,!1;case"at":return l=!0,!1;case Gh:return t=0,!1;case Xh:case Vh:return t=1,!1;case Yh:case Kh:return t=2,!1;case kh:return t=3,!1}else if(mn(h)||pA(h))return Array.isArray(t)||(t=[]),t.push(h),!1;return u},o)}if(o){var c=ia(n,s);i.push(c)}}),{size:t,shape:A,stops:i,position:r,type:2}},Zr=function(n,e){var A=0,t=3,i=[],r=[];return Tt(e).forEach(function(s,a){var o=!0;if(a===0?o=s.reduce(function(c,u){if(eA(u))switch(u.value){case"center":return r.push(hl),!1;case"top":case"left":return r.push(yA),!1;case"right":case"bottom":return r.push(an),!1}else if(pA(u)||mn(u))return r.push(u),!1;return c},o):a===1&&(o=s.reduce(function(c,u){if(eA(u))switch(u.value){case zh:return A=0,!1;case Wh:return A=1,!1;case Yh:case Gh:return t=0,!1;case Vh:return t=1,!1;case Kh:return t=2,!1;case Xh:case kh:return t=3,!1}else if(mn(u)||pA(u))return Array.isArray(t)||(t=[]),t.push(u),!1;return c},o)),o){var l=ia(n,s);i.push(l)}}),{size:t,shape:A,stops:i,position:r,type:2}},wg=function(n){return n.type===1},vg=function(n){return n.type===2},fl={name:"image",parse:function(n,e){if(e.type===22){var A={url:e.value,type:0};return n.cache.addImage(e.value),A}if(e.type===18){var t=Jh[e.name];if(typeof t>"u")throw new Error('Attempting to parse an unsupported image function "'+e.name+'"');return t(n,e.values)}throw new Error("Unsupported image type "+e.type)}};function Eg(n){return!(n.type===20&&n.value==="none")&&(n.type!==18||!!Jh[n.name])}var Jh={"linear-gradient":mg,"-moz-linear-gradient":qr,"-ms-linear-gradient":qr,"-o-linear-gradient":qr,"-webkit-linear-gradient":qr,"radial-gradient":_g,"-moz-radial-gradient":Zr,"-ms-radial-gradient":Zr,"-o-radial-gradient":Zr,"-webkit-radial-gradient":Zr,"-webkit-gradient":Bg},Cg={name:"background-image",initialValue:"none",type:1,prefix:!1,parse:function(n,e){if(e.length===0)return[];var A=e[0];return A.type===20&&A.value==="none"?[]:e.filter(function(t){return Di(t)&&Eg(t)}).map(function(t){return fl.parse(n,t)})}},xg={name:"background-origin",initialValue:"border-box",prefix:!1,type:1,parse:function(n,e){return e.map(function(A){if(eA(A))switch(A.value){case"padding-box":return 1;case"content-box":return 2}return 0})}},Ug={name:"background-position",initialValue:"0% 0%",type:1,prefix:!1,parse:function(n,e){return Tt(e).map(function(A){return A.filter(pA)}).map(Lh)}},yg={name:"background-repeat",initialValue:"repeat",prefix:!1,type:1,parse:function(n,e){return Tt(e).map(function(A){return A.filter(eA).map(function(t){return t.value}).join(" ")}).map(Sg)}},Sg=function(n){switch(n){case"no-repeat":return 1;case"repeat-x":case"repeat no-repeat":return 2;case"repeat-y":case"no-repeat repeat":return 3;case"repeat":default:return 0}},Ci;(function(n){n.AUTO="auto",n.CONTAIN="contain",n.COVER="cover"})(Ci||(Ci={}));var Mg={name:"background-size",initialValue:"0",prefix:!1,type:1,parse:function(n,e){return Tt(e).map(function(A){return A.filter(Fg)})}},Fg=function(n){return eA(n)||pA(n)},ra=function(n){return{name:"border-"+n+"-color",initialValue:"transparent",prefix:!1,type:3,format:"color"}},bg=ra("top"),Tg=ra("right"),Qg=ra("bottom"),Ig=ra("left"),sa=function(n){return{name:"border-radius-"+n,initialValue:"0 0",prefix:!1,type:1,parse:function(e,A){return Lh(A.filter(pA))}}},Lg=sa("top-left"),Rg=sa("top-right"),Dg=sa("bottom-right"),Hg=sa("bottom-left"),aa=function(n){return{name:"border-"+n+"-style",initialValue:"solid",prefix:!1,type:2,parse:function(e,A){switch(A){case"none":return 0;case"dashed":return 2;case"dotted":return 3;case"double":return 4}return 1}}},Pg=aa("top"),Og=aa("right"),Ng=aa("bottom"),Gg=aa("left"),oa=function(n){return{name:"border-"+n+"-width",initialValue:"0",type:0,prefix:!1,parse:function(e,A){return Fr(A)?A.number:0}}},Vg=oa("top"),Kg=oa("right"),kg=oa("bottom"),zg=oa("left"),Wg={name:"color",initialValue:"transparent",prefix:!1,type:3,format:"color"},Xg={name:"direction",initialValue:"ltr",prefix:!1,type:2,parse:function(n,e){switch(e){case"rtl":return 1;case"ltr":default:return 0}}},Yg={name:"display",initialValue:"inline-block",prefix:!1,type:1,parse:function(n,e){return e.filter(eA).reduce(function(A,t){return A|Jg(t.value)},0)}},Jg=function(n){switch(n){case"block":case"-webkit-box":return 2;case"inline":return 4;case"run-in":return 8;case"flow":return 16;case"flow-root":return 32;case"table":return 64;case"flex":case"-webkit-flex":return 128;case"grid":case"-ms-grid":return 256;case"ruby":return 512;case"subgrid":return 1024;case"list-item":return 2048;case"table-row-group":return 4096;case"table-header-group":return 8192;case"table-footer-group":return 16384;case"table-row":return 32768;case"table-cell":return 65536;case"table-column-group":return 131072;case"table-column":return 262144;case"table-caption":return 524288;case"ruby-base":return 1048576;case"ruby-text":return 2097152;case"ruby-base-container":return 4194304;case"ruby-text-container":return 8388608;case"contents":return 16777216;case"inline-block":return 33554432;case"inline-list-item":return 67108864;case"inline-table":return 134217728;case"inline-flex":return 268435456;case"inline-grid":return 536870912}return 0},qg={name:"float",initialValue:"none",prefix:!1,type:2,parse:function(n,e){switch(e){case"left":return 1;case"right":return 2;case"inline-start":return 3;case"inline-end":return 4}return 0}},Zg={name:"letter-spacing",initialValue:"0",prefix:!1,type:0,parse:function(n,e){return e.type===20&&e.value==="normal"?0:e.type===17||e.type===15?e.number:0}},Rs;(function(n){n.NORMAL="normal",n.STRICT="strict"})(Rs||(Rs={}));var jg={name:"line-break",initialValue:"normal",prefix:!1,type:2,parse:function(n,e){switch(e){case"strict":return Rs.STRICT;case"normal":default:return Rs.NORMAL}}},$g={name:"line-height",initialValue:"normal",prefix:!1,type:4},rc=function(n,e){return eA(n)&&n.value==="normal"?1.2*e:n.type===17?e*n.number:pA(n)?tA(n,e):e},em={name:"list-style-image",initialValue:"none",type:0,prefix:!1,parse:function(n,e){return e.type===20&&e.value==="none"?null:fl.parse(n,e)}},Am={name:"list-style-position",initialValue:"outside",prefix:!1,type:2,parse:function(n,e){switch(e){case"inside":return 0;case"outside":default:return 1}}},Vo={name:"list-style-type",initialValue:"none",prefix:!1,type:2,parse:function(n,e){switch(e){case"disc":return 0;case"circle":return 1;case"square":return 2;case"decimal":return 3;case"cjk-decimal":return 4;case"decimal-leading-zero":return 5;case"lower-roman":return 6;case"upper-roman":return 7;case"lower-greek":return 8;case"lower-alpha":return 9;case"upper-alpha":return 10;case"arabic-indic":return 11;case"armenian":return 12;case"bengali":return 13;case"cambodian":return 14;case"cjk-earthly-branch":return 15;case"cjk-heavenly-stem":return 16;case"cjk-ideographic":return 17;case"devanagari":return 18;case"ethiopic-numeric":return 19;case"georgian":return 20;case"gujarati":return 21;case"gurmukhi":return 22;case"hebrew":return 22;case"hiragana":return 23;case"hiragana-iroha":return 24;case"japanese-formal":return 25;case"japanese-informal":return 26;case"kannada":return 27;case"katakana":return 28;case"katakana-iroha":return 29;case"khmer":return 30;case"korean-hangul-formal":return 31;case"korean-hanja-formal":return 32;case"korean-hanja-informal":return 33;case"lao":return 34;case"lower-armenian":return 35;case"malayalam":return 36;case"mongolian":return 37;case"myanmar":return 38;case"oriya":return 39;case"persian":return 40;case"simp-chinese-formal":return 41;case"simp-chinese-informal":return 42;case"tamil":return 43;case"telugu":return 44;case"thai":return 45;case"tibetan":return 46;case"trad-chinese-formal":return 47;case"trad-chinese-informal":return 48;case"upper-armenian":return 49;case"disclosure-open":return 50;case"disclosure-closed":return 51;case"none":default:return-1}}},la=function(n){return{name:"margin-"+n,initialValue:"0",prefix:!1,type:4}},tm=la("top"),nm=la("right"),im=la("bottom"),rm=la("left"),sm={name:"overflow",initialValue:"visible",prefix:!1,type:1,parse:function(n,e){return e.filter(eA).map(function(A){switch(A.value){case"hidden":return 1;case"scroll":return 2;case"clip":return 3;case"auto":return 4;case"visible":default:return 0}})}},am={name:"overflow-wrap",initialValue:"normal",prefix:!1,type:2,parse:function(n,e){switch(e){case"break-word":return"break-word";case"normal":default:return"normal"}}},ca=function(n){return{name:"padding-"+n,initialValue:"0",prefix:!1,type:3,format:"length-percentage"}},om=ca("top"),lm=ca("right"),cm=ca("bottom"),um=ca("left"),hm={name:"text-align",initialValue:"left",prefix:!1,type:2,parse:function(n,e){switch(e){case"right":return 2;case"center":case"justify":return 1;case"left":default:return 0}}},fm={name:"position",initialValue:"static",prefix:!1,type:2,parse:function(n,e){switch(e){case"relative":return 1;case"absolute":return 2;case"fixed":return 3;case"sticky":return 4}return 0}},dm={name:"text-shadow",initialValue:"none",type:1,prefix:!1,parse:function(n,e){return e.length===1&&Go(e[0],"none")?[]:Tt(e).map(function(A){for(var t={color:zt.TRANSPARENT,offsetX:yA,offsetY:yA,blur:yA},i=0,r=0;r<A.length;r++){var s=A[r];mn(s)?(i===0?t.offsetX=s:i===1?t.offsetY=s:t.blur=s,i++):t.color=un.parse(n,s)}return t})}},pm={name:"text-transform",initialValue:"none",prefix:!1,type:2,parse:function(n,e){switch(e){case"uppercase":return 2;case"lowercase":return 1;case"capitalize":return 3}return 0}},gm={name:"transform",initialValue:"none",prefix:!0,type:0,parse:function(n,e){if(e.type===20&&e.value==="none")return null;if(e.type===18){var A=_m[e.name];if(typeof A>"u")throw new Error('Attempting to parse an unsupported transform function "'+e.name+'"');return A(e.values)}return null}},mm=function(n){var e=n.filter(function(A){return A.type===17}).map(function(A){return A.number});return e.length===6?e:null},Bm=function(n){var e=n.filter(function(o){return o.type===17}).map(function(o){return o.number}),A=e[0],t=e[1];e[2],e[3];var i=e[4],r=e[5];e[6],e[7],e[8],e[9],e[10],e[11];var s=e[12],a=e[13];return e[14],e[15],e.length===16?[A,t,i,r,s,a]:null},_m={matrix:mm,matrix3d:Bm},sc={type:16,number:50,flags:Mr},wm=[sc,sc],vm={name:"transform-origin",initialValue:"50% 50%",prefix:!0,type:1,parse:function(n,e){var A=e.filter(pA);return A.length!==2?wm:[A[0],A[1]]}},Em={name:"visible",initialValue:"none",prefix:!1,type:2,parse:function(n,e){switch(e){case"hidden":return 1;case"collapse":return 2;case"visible":default:return 0}}},cr;(function(n){n.NORMAL="normal",n.BREAK_ALL="break-all",n.KEEP_ALL="keep-all"})(cr||(cr={}));var Cm={name:"word-break",initialValue:"normal",prefix:!1,type:2,parse:function(n,e){switch(e){case"break-all":return cr.BREAK_ALL;case"keep-all":return cr.KEEP_ALL;case"normal":default:return cr.NORMAL}}},xm={name:"z-index",initialValue:"auto",prefix:!1,type:0,parse:function(n,e){if(e.type===20)return{auto:!0,order:0};if(Gi(e))return{auto:!1,order:e.number};throw new Error("Invalid z-index number parsed")}},qh={name:"time",parse:function(n,e){if(e.type===15)switch(e.unit.toLowerCase()){case"s":return 1e3*e.number;case"ms":return e.number}throw new Error("Unsupported time type")}},Um={name:"opacity",initialValue:"1",type:0,prefix:!1,parse:function(n,e){return Gi(e)?e.number:1}},ym={name:"text-decoration-color",initialValue:"transparent",prefix:!1,type:3,format:"color"},Sm={name:"text-decoration-line",initialValue:"none",prefix:!1,type:1,parse:function(n,e){return e.filter(eA).map(function(A){switch(A.value){case"underline":return 1;case"overline":return 2;case"line-through":return 3;case"none":return 4}return 0}).filter(function(A){return A!==0})}},Mm={name:"font-family",initialValue:"",prefix:!1,type:1,parse:function(n,e){var A=[],t=[];return e.forEach(function(i){switch(i.type){case 20:case 0:A.push(i.value);break;case 17:A.push(i.number.toString());break;case 4:t.push(A.join(" ")),A.length=0;break}}),A.length&&t.push(A.join(" ")),t.map(function(i){return i.indexOf(" ")===-1?i:"'"+i+"'"})}},Fm={name:"font-size",initialValue:"0",prefix:!1,type:3,format:"length"},bm={name:"font-weight",initialValue:"normal",type:0,prefix:!1,parse:function(n,e){if(Gi(e))return e.number;if(eA(e))switch(e.value){case"bold":return 700;case"normal":default:return 400}return 400}},Tm={name:"font-variant",initialValue:"none",type:1,prefix:!1,parse:function(n,e){return e.filter(eA).map(function(A){return A.value})}},Qm={name:"font-style",initialValue:"normal",prefix:!1,type:2,parse:function(n,e){switch(e){case"oblique":return"oblique";case"italic":return"italic";case"normal":default:return"normal"}}},gA=function(n,e){return(n&e)!==0},Im={name:"content",initialValue:"none",type:1,prefix:!1,parse:function(n,e){if(e.length===0)return[];var A=e[0];return A.type===20&&A.value==="none"?[]:e}},Lm={name:"counter-increment",initialValue:"none",prefix:!0,type:1,parse:function(n,e){if(e.length===0)return null;var A=e[0];if(A.type===20&&A.value==="none")return null;for(var t=[],i=e.filter(Ih),r=0;r<i.length;r++){var s=i[r],a=i[r+1];if(s.type===20){var o=a&&Gi(a)?a.number:1;t.push({counter:s.value,increment:o})}}return t}},Rm={name:"counter-reset",initialValue:"none",prefix:!0,type:1,parse:function(n,e){if(e.length===0)return[];for(var A=[],t=e.filter(Ih),i=0;i<t.length;i++){var r=t[i],s=t[i+1];if(eA(r)&&r.value!=="none"){var a=s&&Gi(s)?s.number:0;A.push({counter:r.value,reset:a})}}return A}},Dm={name:"duration",initialValue:"0s",prefix:!1,type:1,parse:function(n,e){return e.filter(Fr).map(function(A){return qh.parse(n,A)})}},Hm={name:"quotes",initialValue:"none",prefix:!0,type:1,parse:function(n,e){if(e.length===0)return null;var A=e[0];if(A.type===20&&A.value==="none")return null;var t=[],i=e.filter(lg);if(i.length%2!==0)return null;for(var r=0;r<i.length;r+=2){var s=i[r].value,a=i[r+1].value;t.push({open:s,close:a})}return t}},ac=function(n,e,A){if(!n)return"";var t=n[Math.min(e,n.length-1)];return t?A?t.open:t.close:""},Pm={name:"box-shadow",initialValue:"none",type:1,prefix:!1,parse:function(n,e){return e.length===1&&Go(e[0],"none")?[]:Tt(e).map(function(A){for(var t={color:255,offsetX:yA,offsetY:yA,blur:yA,spread:yA,inset:!1},i=0,r=0;r<A.length;r++){var s=A[r];Go(s,"inset")?t.inset=!0:mn(s)?(i===0?t.offsetX=s:i===1?t.offsetY=s:i===2?t.blur=s:t.spread=s,i++):t.color=un.parse(n,s)}return t})}},Om={name:"paint-order",initialValue:"normal",prefix:!1,type:1,parse:function(n,e){var A=[0,1,2],t=[];return e.filter(eA).forEach(function(i){switch(i.value){case"stroke":t.push(1);break;case"fill":t.push(0);break;case"markers":t.push(2);break}}),A.forEach(function(i){t.indexOf(i)===-1&&t.push(i)}),t}},Nm={name:"-webkit-text-stroke-color",initialValue:"currentcolor",prefix:!1,type:3,format:"color"},Gm={name:"-webkit-text-stroke-width",initialValue:"0",type:0,prefix:!1,parse:function(n,e){return Fr(e)?e.number:0}},Vm=function(){function n(e,A){var t,i;this.animationDuration=ge(e,Dm,A.animationDuration),this.backgroundClip=ge(e,hg,A.backgroundClip),this.backgroundColor=ge(e,fg,A.backgroundColor),this.backgroundImage=ge(e,Cg,A.backgroundImage),this.backgroundOrigin=ge(e,xg,A.backgroundOrigin),this.backgroundPosition=ge(e,Ug,A.backgroundPosition),this.backgroundRepeat=ge(e,yg,A.backgroundRepeat),this.backgroundSize=ge(e,Mg,A.backgroundSize),this.borderTopColor=ge(e,bg,A.borderTopColor),this.borderRightColor=ge(e,Tg,A.borderRightColor),this.borderBottomColor=ge(e,Qg,A.borderBottomColor),this.borderLeftColor=ge(e,Ig,A.borderLeftColor),this.borderTopLeftRadius=ge(e,Lg,A.borderTopLeftRadius),this.borderTopRightRadius=ge(e,Rg,A.borderTopRightRadius),this.borderBottomRightRadius=ge(e,Dg,A.borderBottomRightRadius),this.borderBottomLeftRadius=ge(e,Hg,A.borderBottomLeftRadius),this.borderTopStyle=ge(e,Pg,A.borderTopStyle),this.borderRightStyle=ge(e,Og,A.borderRightStyle),this.borderBottomStyle=ge(e,Ng,A.borderBottomStyle),this.borderLeftStyle=ge(e,Gg,A.borderLeftStyle),this.borderTopWidth=ge(e,Vg,A.borderTopWidth),this.borderRightWidth=ge(e,Kg,A.borderRightWidth),this.borderBottomWidth=ge(e,kg,A.borderBottomWidth),this.borderLeftWidth=ge(e,zg,A.borderLeftWidth),this.boxShadow=ge(e,Pm,A.boxShadow),this.color=ge(e,Wg,A.color),this.direction=ge(e,Xg,A.direction),this.display=ge(e,Yg,A.display),this.float=ge(e,qg,A.cssFloat),this.fontFamily=ge(e,Mm,A.fontFamily),this.fontSize=ge(e,Fm,A.fontSize),this.fontStyle=ge(e,Qm,A.fontStyle),this.fontVariant=ge(e,Tm,A.fontVariant),this.fontWeight=ge(e,bm,A.fontWeight),this.letterSpacing=ge(e,Zg,A.letterSpacing),this.lineBreak=ge(e,jg,A.lineBreak),this.lineHeight=ge(e,$g,A.lineHeight),this.listStyleImage=ge(e,em,A.listStyleImage),this.listStylePosition=ge(e,Am,A.listStylePosition),this.listStyleType=ge(e,Vo,A.listStyleType),this.marginTop=ge(e,tm,A.marginTop),this.marginRight=ge(e,nm,A.marginRight),this.marginBottom=ge(e,im,A.marginBottom),this.marginLeft=ge(e,rm,A.marginLeft),this.opacity=ge(e,Um,A.opacity);var r=ge(e,sm,A.overflow);this.overflowX=r[0],this.overflowY=r[r.length>1?1:0],this.overflowWrap=ge(e,am,A.overflowWrap),this.paddingTop=ge(e,om,A.paddingTop),this.paddingRight=ge(e,lm,A.paddingRight),this.paddingBottom=ge(e,cm,A.paddingBottom),this.paddingLeft=ge(e,um,A.paddingLeft),this.paintOrder=ge(e,Om,A.paintOrder),this.position=ge(e,fm,A.position),this.textAlign=ge(e,hm,A.textAlign),this.textDecorationColor=ge(e,ym,(t=A.textDecorationColor)!==null&&t!==void 0?t:A.color),this.textDecorationLine=ge(e,Sm,(i=A.textDecorationLine)!==null&&i!==void 0?i:A.textDecoration),this.textShadow=ge(e,dm,A.textShadow),this.textTransform=ge(e,pm,A.textTransform),this.transform=ge(e,gm,A.transform),this.transformOrigin=ge(e,vm,A.transformOrigin),this.visibility=ge(e,Em,A.visibility),this.webkitTextStrokeColor=ge(e,Nm,A.webkitTextStrokeColor),this.webkitTextStrokeWidth=ge(e,Gm,A.webkitTextStrokeWidth),this.wordBreak=ge(e,Cm,A.wordBreak),this.zIndex=ge(e,xm,A.zIndex)}return n.prototype.isVisible=function(){return this.display>0&&this.opacity>0&&this.visibility===0},n.prototype.isTransparent=function(){return hn(this.backgroundColor)},n.prototype.isTransformed=function(){return this.transform!==null},n.prototype.isPositioned=function(){return this.position!==0},n.prototype.isPositionedWithZIndex=function(){return this.isPositioned()&&!this.zIndex.auto},n.prototype.isFloating=function(){return this.float!==0},n.prototype.isInlineLevel=function(){return gA(this.display,4)||gA(this.display,33554432)||gA(this.display,268435456)||gA(this.display,536870912)||gA(this.display,67108864)||gA(this.display,134217728)},n}(),Km=function(){function n(e,A){this.content=ge(e,Im,A.content),this.quotes=ge(e,Hm,A.quotes)}return n}(),oc=function(){function n(e,A){this.counterIncrement=ge(e,Lm,A.counterIncrement),this.counterReset=ge(e,Rm,A.counterReset)}return n}(),ge=function(n,e,A){var t=new Th,i=A!==null&&typeof A<"u"?A.toString():e.initialValue;t.write(i);var r=new Qh(t.read());switch(e.type){case 2:var s=r.parseComponentValue();return e.parse(n,eA(s)?s.value:e.initialValue);case 0:return e.parse(n,r.parseComponentValue());case 1:return e.parse(n,r.parseComponentValues());case 4:return r.parseComponentValue();case 3:switch(e.format){case"angle":return na.parse(n,r.parseComponentValue());case"color":return un.parse(n,r.parseComponentValue());case"image":return fl.parse(n,r.parseComponentValue());case"length":var a=r.parseComponentValue();return mn(a)?a:yA;case"length-percentage":var o=r.parseComponentValue();return pA(o)?o:yA;case"time":return qh.parse(n,r.parseComponentValue())}break}},km="data-html2canvas-debug",zm=function(n){var e=n.getAttribute(km);switch(e){case"all":return 1;case"clone":return 2;case"parse":return 3;case"render":return 4;default:return 0}},Ko=function(n,e){var A=zm(n);return A===1||e===A},Qt=function(){function n(e,A){if(this.context=e,this.textNodes=[],this.elements=[],this.flags=0,Ko(A,3))debugger;this.styles=new Vm(e,window.getComputedStyle(A,null)),Wo(A)&&(this.styles.animationDuration.some(function(t){return t>0})&&(A.style.animationDuration="0s"),this.styles.transform!==null&&(A.style.transform="none")),this.bounds=Aa(this.context,A),Ko(A,4)&&(this.flags|=16)}return n}(),Wm="AAAAAAAAAAAAEA4AGBkAAFAaAAACAAAAAAAIABAAGAAwADgACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAAQABIAEQATAAIABAACAAQAAgAEAAIABAAVABcAAgAEAAIABAACAAQAGAAaABwAHgAgACIAI4AlgAIABAAmwCjAKgAsAC2AL4AvQDFAMoA0gBPAVYBWgEIAAgACACMANoAYgFkAWwBdAF8AX0BhQGNAZUBlgGeAaMBlQGWAasBswF8AbsBwwF0AcsBYwHTAQgA2wG/AOMBdAF8AekB8QF0AfkB+wHiAHQBfAEIAAMC5gQIAAsCEgIIAAgAFgIeAggAIgIpAggAMQI5AkACygEIAAgASAJQAlgCYAIIAAgACAAKBQoFCgUTBRMFGQUrBSsFCAAIAAgACAAIAAgACAAIAAgACABdAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABoAmgCrwGvAQgAbgJ2AggAHgEIAAgACADnAXsCCAAIAAgAgwIIAAgACAAIAAgACACKAggAkQKZAggAPADJAAgAoQKkAqwCsgK6AsICCADJAggA0AIIAAgACAAIANYC3gIIAAgACAAIAAgACABAAOYCCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAkASoB+QIEAAgACAA8AEMCCABCBQgACABJBVAFCAAIAAgACAAIAAgACAAIAAgACABTBVoFCAAIAFoFCABfBWUFCAAIAAgACAAIAAgAbQUIAAgACAAIAAgACABzBXsFfQWFBYoFigWKBZEFigWKBYoFmAWfBaYFrgWxBbkFCAAIAAgACAAIAAgACAAIAAgACAAIAMEFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAMgFCADQBQgACAAIAAgACAAIAAgACAAIAAgACAAIAO4CCAAIAAgAiQAIAAgACABAAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAD0AggACAD8AggACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIANYFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAMDvwAIAAgAJAIIAAgACAAIAAgACAAIAAgACwMTAwgACAB9BOsEGwMjAwgAKwMyAwsFYgE3A/MEPwMIAEUDTQNRAwgAWQOsAGEDCAAIAAgACAAIAAgACABpAzQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFIQUoBSwFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABtAwgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABMAEwACAAIAAgACAAIABgACAAIAAgACAC/AAgACAAyAQgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACAAIAAwAAgACAAIAAgACAAIAAgACAAIAAAARABIAAgACAAIABQASAAIAAgAIABwAEAAjgCIABsAqAC2AL0AigDQAtwC+IJIQqVAZUBWQqVAZUBlQGVAZUBlQGrC5UBlQGVAZUBlQGVAZUBlQGVAXsKlQGVAbAK6wsrDGUMpQzlDJUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAfAKAAuZA64AtwCJALoC6ADwAAgAuACgA/oEpgO6AqsD+AAIAAgAswMIAAgACAAIAIkAuwP5AfsBwwPLAwgACAAIAAgACADRA9kDCAAIAOED6QMIAAgACAAIAAgACADuA/YDCAAIAP4DyQAIAAgABgQIAAgAXQAOBAgACAAIAAgACAAIABMECAAIAAgACAAIAAgACAD8AAQBCAAIAAgAGgQiBCoECAExBAgAEAEIAAgACAAIAAgACAAIAAgACAAIAAgACAA4BAgACABABEYECAAIAAgATAQYAQgAVAQIAAgACAAIAAgACAAIAAgACAAIAFoECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAOQEIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAB+BAcACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAEABhgSMBAgACAAIAAgAlAQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAwAEAAQABAADAAMAAwADAAQABAAEAAQABAAEAAQABHATAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAdQMIAAgACAAIAAgACAAIAMkACAAIAAgAfQMIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACFA4kDCAAIAAgACAAIAOcBCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAIcDCAAIAAgACAAIAAgACAAIAAgACAAIAJEDCAAIAAgACADFAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABgBAgAZgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAbAQCBXIECAAIAHkECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABAAJwEQACjBKoEsgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAC6BMIECAAIAAgACAAIAAgACABmBAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAxwQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAGYECAAIAAgAzgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBd0FXwUIAOIF6gXxBYoF3gT5BQAGCAaKBYoFigWKBYoFigWKBYoFigWKBYoFigXWBIoFigWKBYoFigWKBYoFigWKBYsFEAaKBYoFigWKBYoFigWKBRQGCACKBYoFigWKBQgACAAIANEECAAIABgGigUgBggAJgYIAC4GMwaKBYoF0wQ3Bj4GigWKBYoFigWKBYoFigWKBYoFigWKBYoFigUIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWLBf///////wQABAAEAAQABAAEAAQABAAEAAQAAwAEAAQAAgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAQADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUAAAAFAAUAAAAFAAUAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAQAAAAUABQAFAAUABQAFAAAAAAAFAAUAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAFAAUAAQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAAABwAHAAcAAAAHAAcABwAFAAEAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAcABwAFAAUAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAQABAAAAAAAAAAAAAAAFAAUABQAFAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAHAAcAAAAHAAcAAAAAAAUABQAHAAUAAQAHAAEABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwABAAUABQAFAAUAAAAAAAAAAAAAAAEAAQABAAEAAQABAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABQANAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAABQAHAAUABQAFAAAAAAAAAAcABQAFAAUABQAFAAQABAAEAAQABAAEAAQABAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUAAAAFAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAUAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAcABwAFAAcABwAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUABwAHAAUABQAFAAUAAAAAAAcABwAAAAAABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAAAAAAAAAAABQAFAAAAAAAFAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAFAAUABQAFAAUAAAAFAAUABwAAAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABwAFAAUABQAFAAAAAAAHAAcAAAAAAAcABwAFAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAAAAAAAAAHAAcABwAAAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAUABQAFAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAHAAcABQAHAAcAAAAFAAcABwAAAAcABwAFAAUAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAFAAcABwAFAAUABQAAAAUAAAAHAAcABwAHAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAHAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUAAAAFAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAUAAAAFAAUAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABwAFAAUABQAFAAUABQAAAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABQAFAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAFAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAHAAUABQAFAAUABQAFAAUABwAHAAcABwAHAAcABwAHAAUABwAHAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABwAHAAcABwAFAAUABwAHAAcAAAAAAAAAAAAHAAcABQAHAAcABwAHAAcABwAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAUABQAFAAUABQAFAAUAAAAFAAAABQAAAAAABQAFAAUABQAFAAUABQAFAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAUABQAFAAUABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABwAFAAcABwAHAAcABwAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAUABQAFAAUABwAHAAUABQAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABQAFAAcABwAHAAUABwAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAcABQAFAAUABQAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAAAAAABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAAAAAAAAAFAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAUABQAHAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAFAAUABQAFAAcABwAFAAUABwAHAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAcABwAFAAUABwAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABQAAAAAABQAFAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAcABwAAAAAAAAAAAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAcABwAFAAcABwAAAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAFAAUABQAAAAUABQAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABwAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAHAAcABQAHAAUABQAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAAABwAHAAAAAAAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAFAAUABwAFAAcABwAFAAcABQAFAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAAAAAABwAHAAcABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAFAAcABwAFAAUABQAFAAUABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAUABQAFAAcABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABQAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAAAAAAFAAUABwAHAAcABwAFAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAHAAUABQAFAAUABQAFAAUABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAABQAAAAUABQAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAHAAcAAAAFAAUAAAAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABQAFAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAABQAFAAUABQAFAAUABQAAAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAFAAUABQAFAAUADgAOAA4ADgAOAA4ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAMAAwADAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAAAAAAAAAAAAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAAAAAAAAAAAAsADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwACwAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAADgAOAA4AAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAAAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4AAAAOAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAAAAAAAAAAAA4AAAAOAAAAAAAAAAAADgAOAA4AAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAA=",lc="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",ir=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(var jr=0;jr<lc.length;jr++)ir[lc.charCodeAt(jr)]=jr;var Xm=function(n){var e=n.length*.75,A=n.length,t,i=0,r,s,a,o;n[n.length-1]==="="&&(e--,n[n.length-2]==="="&&e--);var l=typeof ArrayBuffer<"u"&&typeof Uint8Array<"u"&&typeof Uint8Array.prototype.slice<"u"?new ArrayBuffer(e):new Array(e),c=Array.isArray(l)?l:new Uint8Array(l);for(t=0;t<A;t+=4)r=ir[n.charCodeAt(t)],s=ir[n.charCodeAt(t+1)],a=ir[n.charCodeAt(t+2)],o=ir[n.charCodeAt(t+3)],c[i++]=r<<2|s>>4,c[i++]=(s&15)<<4|a>>2,c[i++]=(a&3)<<6|o&63;return l},Ym=function(n){for(var e=n.length,A=[],t=0;t<e;t+=2)A.push(n[t+1]<<8|n[t]);return A},Jm=function(n){for(var e=n.length,A=[],t=0;t<e;t+=4)A.push(n[t+3]<<24|n[t+2]<<16|n[t+1]<<8|n[t]);return A},Nn=5,dl=6+5,Ta=2,qm=dl-Nn,Zh=65536>>Nn,Zm=1<<Nn,Qa=Zm-1,jm=1024>>Nn,$m=Zh+jm,eB=$m,AB=32,tB=eB+AB,nB=65536>>dl,iB=1<<qm,rB=iB-1,cc=function(n,e,A){return n.slice?n.slice(e,A):new Uint16Array(Array.prototype.slice.call(n,e,A))},sB=function(n,e,A){return n.slice?n.slice(e,A):new Uint32Array(Array.prototype.slice.call(n,e,A))},aB=function(n,e){var A=Xm(n),t=Array.isArray(A)?Jm(A):new Uint32Array(A),i=Array.isArray(A)?Ym(A):new Uint16Array(A),r=24,s=cc(i,r/2,t[4]/2),a=t[5]===2?cc(i,(r+t[4])/2):sB(t,Math.ceil((r+t[4])/4));return new oB(t[0],t[1],t[2],t[3],s,a)},oB=function(){function n(e,A,t,i,r,s){this.initialValue=e,this.errorValue=A,this.highStart=t,this.highValueIndex=i,this.index=r,this.data=s}return n.prototype.get=function(e){var A;if(e>=0){if(e<55296||e>56319&&e<=65535)return A=this.index[e>>Nn],A=(A<<Ta)+(e&Qa),this.data[A];if(e<=65535)return A=this.index[Zh+(e-55296>>Nn)],A=(A<<Ta)+(e&Qa),this.data[A];if(e<this.highStart)return A=tB-nB+(e>>dl),A=this.index[A],A+=e>>Nn&rB,A=this.index[A],A=(A<<Ta)+(e&Qa),this.data[A];if(e<=1114111)return this.data[this.highValueIndex]}return this.errorValue},n}(),uc="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",lB=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(var $r=0;$r<uc.length;$r++)lB[uc.charCodeAt($r)]=$r;var cB=1,Ia=2,La=3,hc=4,fc=5,uB=7,dc=8,Ra=9,Da=10,pc=11,gc=12,mc=13,Bc=14,Ha=15,hB=function(n){for(var e=[],A=0,t=n.length;A<t;){var i=n.charCodeAt(A++);if(i>=55296&&i<=56319&&A<t){var r=n.charCodeAt(A++);(r&64512)===56320?e.push(((i&1023)<<10)+(r&1023)+65536):(e.push(i),A--)}else e.push(i)}return e},fB=function(){for(var n=[],e=0;e<arguments.length;e++)n[e]=arguments[e];if(String.fromCodePoint)return String.fromCodePoint.apply(String,n);var A=n.length;if(!A)return"";for(var t=[],i=-1,r="";++i<A;){var s=n[i];s<=65535?t.push(s):(s-=65536,t.push((s>>10)+55296,s%1024+56320)),(i+1===A||t.length>16384)&&(r+=String.fromCharCode.apply(String,t),t.length=0)}return r},dB=aB(Wm),At="×",Pa="÷",pB=function(n){return dB.get(n)},gB=function(n,e,A){var t=A-2,i=e[t],r=e[A-1],s=e[A];if(r===Ia&&s===La)return At;if(r===Ia||r===La||r===hc||s===Ia||s===La||s===hc)return Pa;if(r===dc&&[dc,Ra,pc,gc].indexOf(s)!==-1||(r===pc||r===Ra)&&(s===Ra||s===Da)||(r===gc||r===Da)&&s===Da||s===mc||s===fc||s===uB||r===cB)return At;if(r===mc&&s===Bc){for(;i===fc;)i=e[--t];if(i===Bc)return At}if(r===Ha&&s===Ha){for(var a=0;i===Ha;)a++,i=e[--t];if(a%2===0)return At}return Pa},mB=function(n){var e=hB(n),A=e.length,t=0,i=0,r=e.map(pB);return{next:function(){if(t>=A)return{done:!0,value:null};for(var s=At;t<A&&(s=gB(e,r,++t))===At;);if(s!==At||t===A){var a=fB.apply(null,e.slice(i,t));return i=t,{value:a,done:!1}}return{done:!0,value:null}}}},BB=function(n){for(var e=mB(n),A=[],t;!(t=e.next()).done;)t.value&&A.push(t.value.slice());return A},_B=function(n){var e=123;if(n.createRange){var A=n.createRange();if(A.getBoundingClientRect){var t=n.createElement("boundtest");t.style.height=e+"px",t.style.display="block",n.body.appendChild(t),A.selectNode(t);var i=A.getBoundingClientRect(),r=Math.round(i.height);if(n.body.removeChild(t),r===e)return!0}}return!1},wB=function(n){var e=n.createElement("boundtest");e.style.width="50px",e.style.display="block",e.style.fontSize="12px",e.style.letterSpacing="0px",e.style.wordSpacing="0px",n.body.appendChild(e);var A=n.createRange();e.innerHTML=typeof"".repeat=="function"?"&#128104;".repeat(10):"";var t=e.firstChild,i=ta(t.data).map(function(o){return cA(o)}),r=0,s={},a=i.every(function(o,l){A.setStart(t,r),A.setEnd(t,r+o.length);var c=A.getBoundingClientRect();r+=o.length;var u=c.x>s.x||c.y>s.y;return s=c,l===0?!0:u});return n.body.removeChild(e),a},vB=function(){return typeof new Image().crossOrigin<"u"},EB=function(){return typeof new XMLHttpRequest().responseType=="string"},CB=function(n){var e=new Image,A=n.createElement("canvas"),t=A.getContext("2d");if(!t)return!1;e.src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";try{t.drawImage(e,0,0),A.toDataURL()}catch{return!1}return!0},_c=function(n){return n[0]===0&&n[1]===255&&n[2]===0&&n[3]===255},xB=function(n){var e=n.createElement("canvas"),A=100;e.width=A,e.height=A;var t=e.getContext("2d");if(!t)return Promise.reject(!1);t.fillStyle="rgb(0, 255, 0)",t.fillRect(0,0,A,A);var i=new Image,r=e.toDataURL();i.src=r;var s=ko(A,A,0,0,i);return t.fillStyle="red",t.fillRect(0,0,A,A),wc(s).then(function(a){t.drawImage(a,0,0);var o=t.getImageData(0,0,A,A).data;t.fillStyle="red",t.fillRect(0,0,A,A);var l=n.createElement("div");return l.style.backgroundImage="url("+r+")",l.style.height=A+"px",_c(o)?wc(ko(A,A,0,0,l)):Promise.reject(!1)}).then(function(a){return t.drawImage(a,0,0),_c(t.getImageData(0,0,A,A).data)}).catch(function(){return!1})},ko=function(n,e,A,t,i){var r="http://www.w3.org/2000/svg",s=document.createElementNS(r,"svg"),a=document.createElementNS(r,"foreignObject");return s.setAttributeNS(null,"width",n.toString()),s.setAttributeNS(null,"height",e.toString()),a.setAttributeNS(null,"width","100%"),a.setAttributeNS(null,"height","100%"),a.setAttributeNS(null,"x",A.toString()),a.setAttributeNS(null,"y",t.toString()),a.setAttributeNS(null,"externalResourcesRequired","true"),s.appendChild(a),a.appendChild(i),s},wc=function(n){return new Promise(function(e,A){var t=new Image;t.onload=function(){return e(t)},t.onerror=A,t.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(new XMLSerializer().serializeToString(n))})},xA={get SUPPORT_RANGE_BOUNDS(){var n=_B(document);return Object.defineProperty(xA,"SUPPORT_RANGE_BOUNDS",{value:n}),n},get SUPPORT_WORD_BREAKING(){var n=xA.SUPPORT_RANGE_BOUNDS&&wB(document);return Object.defineProperty(xA,"SUPPORT_WORD_BREAKING",{value:n}),n},get SUPPORT_SVG_DRAWING(){var n=CB(document);return Object.defineProperty(xA,"SUPPORT_SVG_DRAWING",{value:n}),n},get SUPPORT_FOREIGNOBJECT_DRAWING(){var n=typeof Array.from=="function"&&typeof window.fetch=="function"?xB(document):Promise.resolve(!1);return Object.defineProperty(xA,"SUPPORT_FOREIGNOBJECT_DRAWING",{value:n}),n},get SUPPORT_CORS_IMAGES(){var n=vB();return Object.defineProperty(xA,"SUPPORT_CORS_IMAGES",{value:n}),n},get SUPPORT_RESPONSE_TYPE(){var n=EB();return Object.defineProperty(xA,"SUPPORT_RESPONSE_TYPE",{value:n}),n},get SUPPORT_CORS_XHR(){var n="withCredentials"in new XMLHttpRequest;return Object.defineProperty(xA,"SUPPORT_CORS_XHR",{value:n}),n},get SUPPORT_NATIVE_TEXT_SEGMENTATION(){var n=!!(typeof Intl<"u"&&Intl.Segmenter);return Object.defineProperty(xA,"SUPPORT_NATIVE_TEXT_SEGMENTATION",{value:n}),n}},ur=function(){function n(e,A){this.text=e,this.bounds=A}return n}(),UB=function(n,e,A,t){var i=MB(e,A),r=[],s=0;return i.forEach(function(a){if(A.textDecorationLine.length||a.trim().length>0)if(xA.SUPPORT_RANGE_BOUNDS){var o=vc(t,s,a.length).getClientRects();if(o.length>1){var l=pl(a),c=0;l.forEach(function(h){r.push(new ur(h,Wt.fromDOMRectList(n,vc(t,c+s,h.length).getClientRects()))),c+=h.length})}else r.push(new ur(a,Wt.fromDOMRectList(n,o)))}else{var u=t.splitText(a.length);r.push(new ur(a,yB(n,t))),t=u}else xA.SUPPORT_RANGE_BOUNDS||(t=t.splitText(a.length));s+=a.length}),r},yB=function(n,e){var A=e.ownerDocument;if(A){var t=A.createElement("html2canvaswrapper");t.appendChild(e.cloneNode(!0));var i=e.parentNode;if(i){i.replaceChild(t,e);var r=Aa(n,t);return t.firstChild&&i.replaceChild(t.firstChild,t),r}}return Wt.EMPTY},vc=function(n,e,A){var t=n.ownerDocument;if(!t)throw new Error("Node has no owner document");var i=t.createRange();return i.setStart(n,e),i.setEnd(n,e+A),i},pl=function(n){if(xA.SUPPORT_NATIVE_TEXT_SEGMENTATION){var e=new Intl.Segmenter(void 0,{granularity:"grapheme"});return Array.from(e.segment(n)).map(function(A){return A.segment})}return BB(n)},SB=function(n,e){if(xA.SUPPORT_NATIVE_TEXT_SEGMENTATION){var A=new Intl.Segmenter(void 0,{granularity:"word"});return Array.from(A.segment(n)).map(function(t){return t.segment})}return bB(n,e)},MB=function(n,e){return e.letterSpacing!==0?pl(n):SB(n,e)},FB=[32,160,4961,65792,65793,4153,4241],bB=function(n,e){for(var A=np(n,{lineBreak:e.lineBreak,wordBreak:e.overflowWrap==="break-word"?"break-word":e.wordBreak}),t=[],i,r=function(){if(i.value){var s=i.value.slice(),a=ta(s),o="";a.forEach(function(l){FB.indexOf(l)===-1?o+=cA(l):(o.length&&t.push(o),t.push(cA(l)),o="")}),o.length&&t.push(o)}};!(i=A.next()).done;)r();return t},TB=function(){function n(e,A,t){this.text=QB(A.data,t.textTransform),this.textBounds=UB(e,this.text,t,A)}return n}(),QB=function(n,e){switch(e){case 1:return n.toLowerCase();case 3:return n.replace(IB,LB);case 2:return n.toUpperCase();default:return n}},IB=/(^|\s|:|-|\(|\))([a-z])/g,LB=function(n,e,A){return n.length>0?e+A.toUpperCase():n},jh=function(n){_t(e,n);function e(A,t){var i=n.call(this,A,t)||this;return i.src=t.currentSrc||t.src,i.intrinsicWidth=t.naturalWidth,i.intrinsicHeight=t.naturalHeight,i.context.cache.addImage(i.src),i}return e}(Qt),$h=function(n){_t(e,n);function e(A,t){var i=n.call(this,A,t)||this;return i.canvas=t,i.intrinsicWidth=t.width,i.intrinsicHeight=t.height,i}return e}(Qt),ef=function(n){_t(e,n);function e(A,t){var i=n.call(this,A,t)||this,r=new XMLSerializer,s=Aa(A,t);return t.setAttribute("width",s.width+"px"),t.setAttribute("height",s.height+"px"),i.svg="data:image/svg+xml,"+encodeURIComponent(r.serializeToString(t)),i.intrinsicWidth=t.width.baseVal.value,i.intrinsicHeight=t.height.baseVal.value,i.context.cache.addImage(i.svg),i}return e}(Qt),Af=function(n){_t(e,n);function e(A,t){var i=n.call(this,A,t)||this;return i.value=t.value,i}return e}(Qt),zo=function(n){_t(e,n);function e(A,t){var i=n.call(this,A,t)||this;return i.start=t.start,i.reversed=typeof t.reversed=="boolean"&&t.reversed===!0,i}return e}(Qt),RB=[{type:15,flags:0,unit:"px",number:3}],DB=[{type:16,flags:0,number:50}],HB=function(n){return n.width>n.height?new Wt(n.left+(n.width-n.height)/2,n.top,n.height,n.height):n.width<n.height?new Wt(n.left,n.top+(n.height-n.width)/2,n.width,n.width):n},PB=function(n){var e=n.type===OB?new Array(n.value.length+1).join("•"):n.value;return e.length===0?n.placeholder||"":e},Ds="checkbox",Hs="radio",OB="password",Ec=707406591,gl=function(n){_t(e,n);function e(A,t){var i=n.call(this,A,t)||this;switch(i.type=t.type.toLowerCase(),i.checked=t.checked,i.value=PB(t),(i.type===Ds||i.type===Hs)&&(i.styles.backgroundColor=3739148031,i.styles.borderTopColor=i.styles.borderRightColor=i.styles.borderBottomColor=i.styles.borderLeftColor=2779096575,i.styles.borderTopWidth=i.styles.borderRightWidth=i.styles.borderBottomWidth=i.styles.borderLeftWidth=1,i.styles.borderTopStyle=i.styles.borderRightStyle=i.styles.borderBottomStyle=i.styles.borderLeftStyle=1,i.styles.backgroundClip=[0],i.styles.backgroundOrigin=[0],i.bounds=HB(i.bounds)),i.type){case Ds:i.styles.borderTopRightRadius=i.styles.borderTopLeftRadius=i.styles.borderBottomRightRadius=i.styles.borderBottomLeftRadius=RB;break;case Hs:i.styles.borderTopRightRadius=i.styles.borderTopLeftRadius=i.styles.borderBottomRightRadius=i.styles.borderBottomLeftRadius=DB;break}return i}return e}(Qt),tf=function(n){_t(e,n);function e(A,t){var i=n.call(this,A,t)||this,r=t.options[t.selectedIndex||0];return i.value=r&&r.text||"",i}return e}(Qt),nf=function(n){_t(e,n);function e(A,t){var i=n.call(this,A,t)||this;return i.value=t.value,i}return e}(Qt),rf=function(n){_t(e,n);function e(A,t){var i=n.call(this,A,t)||this;i.src=t.src,i.width=parseInt(t.width,10)||0,i.height=parseInt(t.height,10)||0,i.backgroundColor=i.styles.backgroundColor;try{if(t.contentWindow&&t.contentWindow.document&&t.contentWindow.document.documentElement){i.tree=af(A,t.contentWindow.document.documentElement);var r=t.contentWindow.document.documentElement?lr(A,getComputedStyle(t.contentWindow.document.documentElement).backgroundColor):zt.TRANSPARENT,s=t.contentWindow.document.body?lr(A,getComputedStyle(t.contentWindow.document.body).backgroundColor):zt.TRANSPARENT;i.backgroundColor=hn(r)?hn(s)?i.styles.backgroundColor:s:r}}catch{}return i}return e}(Qt),NB=["OL","UL","MENU"],bs=function(n,e,A,t){for(var i=e.firstChild,r=void 0;i;i=r)if(r=i.nextSibling,of(i)&&i.data.trim().length>0)A.textNodes.push(new TB(n,i,A.styles));else if(vi(i))if(hf(i)&&i.assignedNodes)i.assignedNodes().forEach(function(a){return bs(n,a,A,t)});else{var s=sf(n,i);s.styles.isVisible()&&(GB(i,s,t)?s.flags|=4:VB(s.styles)&&(s.flags|=2),NB.indexOf(i.tagName)!==-1&&(s.flags|=8),A.elements.push(s),i.slot,i.shadowRoot?bs(n,i.shadowRoot,s,t):!Ps(i)&&!lf(i)&&!Os(i)&&bs(n,i,s,t))}},sf=function(n,e){return Xo(e)?new jh(n,e):cf(e)?new $h(n,e):lf(e)?new ef(n,e):KB(e)?new Af(n,e):kB(e)?new zo(n,e):zB(e)?new gl(n,e):Os(e)?new tf(n,e):Ps(e)?new nf(n,e):uf(e)?new rf(n,e):new Qt(n,e)},af=function(n,e){var A=sf(n,e);return A.flags|=4,bs(n,e,A,A),A},GB=function(n,e,A){return e.styles.isPositionedWithZIndex()||e.styles.opacity<1||e.styles.isTransformed()||ml(n)&&A.styles.isTransparent()},VB=function(n){return n.isPositioned()||n.isFloating()},of=function(n){return n.nodeType===Node.TEXT_NODE},vi=function(n){return n.nodeType===Node.ELEMENT_NODE},Wo=function(n){return vi(n)&&typeof n.style<"u"&&!Ts(n)},Ts=function(n){return typeof n.className=="object"},KB=function(n){return n.tagName==="LI"},kB=function(n){return n.tagName==="OL"},zB=function(n){return n.tagName==="INPUT"},WB=function(n){return n.tagName==="HTML"},lf=function(n){return n.tagName==="svg"},ml=function(n){return n.tagName==="BODY"},cf=function(n){return n.tagName==="CANVAS"},Cc=function(n){return n.tagName==="VIDEO"},Xo=function(n){return n.tagName==="IMG"},uf=function(n){return n.tagName==="IFRAME"},xc=function(n){return n.tagName==="STYLE"},XB=function(n){return n.tagName==="SCRIPT"},Ps=function(n){return n.tagName==="TEXTAREA"},Os=function(n){return n.tagName==="SELECT"},hf=function(n){return n.tagName==="SLOT"},Uc=function(n){return n.tagName.indexOf("-")>0},YB=function(){function n(){this.counters={}}return n.prototype.getCounterValue=function(e){var A=this.counters[e];return A&&A.length?A[A.length-1]:1},n.prototype.getCounterValues=function(e){var A=this.counters[e];return A||[]},n.prototype.pop=function(e){var A=this;e.forEach(function(t){return A.counters[t].pop()})},n.prototype.parse=function(e){var A=this,t=e.counterIncrement,i=e.counterReset,r=!0;t!==null&&t.forEach(function(a){var o=A.counters[a.counter];o&&a.increment!==0&&(r=!1,o.length||o.push(1),o[Math.max(0,o.length-1)]+=a.increment)});var s=[];return r&&i.forEach(function(a){var o=A.counters[a.counter];s.push(a.counter),o||(o=A.counters[a.counter]=[]),o.push(a.reset)}),s},n}(),yc={integers:[1e3,900,500,400,100,90,50,40,10,9,5,4,1],values:["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"]},Sc={integers:[9e3,8e3,7e3,6e3,5e3,4e3,3e3,2e3,1e3,900,800,700,600,500,400,300,200,100,90,80,70,60,50,40,30,20,10,9,8,7,6,5,4,3,2,1],values:["Ք","Փ","Ւ","Ց","Ր","Տ","Վ","Ս","Ռ","Ջ","Պ","Չ","Ո","Շ","Ն","Յ","Մ","Ճ","Ղ","Ձ","Հ","Կ","Ծ","Խ","Լ","Ի","Ժ","Թ","Ը","Է","Զ","Ե","Դ","Գ","Բ","Ա"]},JB={integers:[1e4,9e3,8e3,7e3,6e3,5e3,4e3,3e3,2e3,1e3,400,300,200,100,90,80,70,60,50,40,30,20,19,18,17,16,15,10,9,8,7,6,5,4,3,2,1],values:["י׳","ט׳","ח׳","ז׳","ו׳","ה׳","ד׳","ג׳","ב׳","א׳","ת","ש","ר","ק","צ","פ","ע","ס","נ","מ","ל","כ","יט","יח","יז","טז","טו","י","ט","ח","ז","ו","ה","ד","ג","ב","א"]},qB={integers:[1e4,9e3,8e3,7e3,6e3,5e3,4e3,3e3,2e3,1e3,900,800,700,600,500,400,300,200,100,90,80,70,60,50,40,30,20,10,9,8,7,6,5,4,3,2,1],values:["ჵ","ჰ","ჯ","ჴ","ხ","ჭ","წ","ძ","ც","ჩ","შ","ყ","ღ","ქ","ფ","ჳ","ტ","ს","რ","ჟ","პ","ო","ჲ","ნ","მ","ლ","კ","ი","თ","ჱ","ზ","ვ","ე","დ","გ","ბ","ა"]},qn=function(n,e,A,t,i,r){return n<e||n>A?wr(n,i,r.length>0):t.integers.reduce(function(s,a,o){for(;n>=a;)n-=a,s+=t.values[o];return s},"")+r},ff=function(n,e,A,t){var i="";do A||n--,i=t(n)+i,n/=e;while(n*e>=e);return i},lA=function(n,e,A,t,i){var r=A-e+1;return(n<0?"-":"")+(ff(Math.abs(n),r,t,function(s){return cA(Math.floor(s%r)+e)})+i)},En=function(n,e,A){A===void 0&&(A=". ");var t=e.length;return ff(Math.abs(n),t,!1,function(i){return e[Math.floor(i%t)]})+A},Bi=1,$t=2,en=4,rr=8,Dt=function(n,e,A,t,i,r){if(n<-9999||n>9999)return wr(n,4,i.length>0);var s=Math.abs(n),a=i;if(s===0)return e[0]+a;for(var o=0;s>0&&o<=4;o++){var l=s%10;l===0&&gA(r,Bi)&&a!==""?a=e[l]+a:l>1||l===1&&o===0||l===1&&o===1&&gA(r,$t)||l===1&&o===1&&gA(r,en)&&n>100||l===1&&o>1&&gA(r,rr)?a=e[l]+(o>0?A[o-1]:"")+a:l===1&&o>0&&(a=A[o-1]+a),s=Math.floor(s/10)}return(n<0?t:"")+a},Mc="十百千萬",Fc="拾佰仟萬",bc="マイナス",Oa="마이너스",wr=function(n,e,A){var t=A?". ":"",i=A?"、":"",r=A?", ":"",s=A?" ":"";switch(e){case 0:return"•"+s;case 1:return"◦"+s;case 2:return"◾"+s;case 5:var a=lA(n,48,57,!0,t);return a.length<4?"0"+a:a;case 4:return En(n,"〇一二三四五六七八九",i);case 6:return qn(n,1,3999,yc,3,t).toLowerCase();case 7:return qn(n,1,3999,yc,3,t);case 8:return lA(n,945,969,!1,t);case 9:return lA(n,97,122,!1,t);case 10:return lA(n,65,90,!1,t);case 11:return lA(n,1632,1641,!0,t);case 12:case 49:return qn(n,1,9999,Sc,3,t);case 35:return qn(n,1,9999,Sc,3,t).toLowerCase();case 13:return lA(n,2534,2543,!0,t);case 14:case 30:return lA(n,6112,6121,!0,t);case 15:return En(n,"子丑寅卯辰巳午未申酉戌亥",i);case 16:return En(n,"甲乙丙丁戊己庚辛壬癸",i);case 17:case 48:return Dt(n,"零一二三四五六七八九",Mc,"負",i,$t|en|rr);case 47:return Dt(n,"零壹貳參肆伍陸柒捌玖",Fc,"負",i,Bi|$t|en|rr);case 42:return Dt(n,"零一二三四五六七八九",Mc,"负",i,$t|en|rr);case 41:return Dt(n,"零壹贰叁肆伍陆柒捌玖",Fc,"负",i,Bi|$t|en|rr);case 26:return Dt(n,"〇一二三四五六七八九","十百千万",bc,i,0);case 25:return Dt(n,"零壱弐参四伍六七八九","拾百千万",bc,i,Bi|$t|en);case 31:return Dt(n,"영일이삼사오육칠팔구","십백천만",Oa,r,Bi|$t|en);case 33:return Dt(n,"零一二三四五六七八九","十百千萬",Oa,r,0);case 32:return Dt(n,"零壹貳參四五六七八九","拾百千",Oa,r,Bi|$t|en);case 18:return lA(n,2406,2415,!0,t);case 20:return qn(n,1,19999,qB,3,t);case 21:return lA(n,2790,2799,!0,t);case 22:return lA(n,2662,2671,!0,t);case 22:return qn(n,1,10999,JB,3,t);case 23:return En(n,"あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわゐゑをん");case 24:return En(n,"いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせす");case 27:return lA(n,3302,3311,!0,t);case 28:return En(n,"アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン",i);case 29:return En(n,"イロハニホヘトチリヌルヲワカヨタレソツネナラムウヰノオクヤマケフコエテアサキユメミシヱヒモセス",i);case 34:return lA(n,3792,3801,!0,t);case 37:return lA(n,6160,6169,!0,t);case 38:return lA(n,4160,4169,!0,t);case 39:return lA(n,2918,2927,!0,t);case 40:return lA(n,1776,1785,!0,t);case 43:return lA(n,3046,3055,!0,t);case 44:return lA(n,3174,3183,!0,t);case 45:return lA(n,3664,3673,!0,t);case 46:return lA(n,3872,3881,!0,t);case 3:default:return lA(n,48,57,!0,t)}},df="data-html2canvas-ignore",Tc=function(){function n(e,A,t){if(this.context=e,this.options=t,this.scrolledElements=[],this.referenceElement=A,this.counters=new YB,this.quoteDepth=0,!A.ownerDocument)throw new Error("Cloned element does not have an owner document");this.documentElement=this.cloneNode(A.ownerDocument.documentElement,!1)}return n.prototype.toIFrame=function(e,A){var t=this,i=ZB(e,A);if(!i.contentWindow)return Promise.reject("Unable to find iframe window");var r=e.defaultView.pageXOffset,s=e.defaultView.pageYOffset,a=i.contentWindow,o=a.document,l=e0(i).then(function(){return GA(t,void 0,void 0,function(){var c,u;return IA(this,function(h){switch(h.label){case 0:return this.scrolledElements.forEach(i0),a&&(a.scrollTo(A.left,A.top),/(iPad|iPhone|iPod)/g.test(navigator.userAgent)&&(a.scrollY!==A.top||a.scrollX!==A.left)&&(this.context.logger.warn("Unable to restore scroll position for cloned document"),this.context.windowBounds=this.context.windowBounds.add(a.scrollX-A.left,a.scrollY-A.top,0,0))),c=this.options.onclone,u=this.clonedReferenceElement,typeof u>"u"?[2,Promise.reject("Error finding the "+this.referenceElement.nodeName+" in the cloned document")]:o.fonts&&o.fonts.ready?[4,o.fonts.ready]:[3,2];case 1:h.sent(),h.label=2;case 2:return/(AppleWebKit)/g.test(navigator.userAgent)?[4,$B(o)]:[3,4];case 3:h.sent(),h.label=4;case 4:return typeof c=="function"?[2,Promise.resolve().then(function(){return c(o,u)}).then(function(){return i})]:[2,i]}})})});return o.open(),o.write(t0(document.doctype)+"<html></html>"),n0(this.referenceElement.ownerDocument,r,s),o.replaceChild(o.adoptNode(this.documentElement),o.documentElement),o.close(),l},n.prototype.createElementClone=function(e){if(Ko(e,2))debugger;if(cf(e))return this.createCanvasClone(e);if(Cc(e))return this.createVideoClone(e);if(xc(e))return this.createStyleClone(e);var A=e.cloneNode(!1);return Xo(A)&&(Xo(e)&&e.currentSrc&&e.currentSrc!==e.src&&(A.src=e.currentSrc,A.srcset=""),A.loading==="lazy"&&(A.loading="eager")),Uc(A)?this.createCustomElementClone(A):A},n.prototype.createCustomElementClone=function(e){var A=document.createElement("html2canvascustomelement");return Na(e.style,A),A},n.prototype.createStyleClone=function(e){try{var A=e.sheet;if(A&&A.cssRules){var t=[].slice.call(A.cssRules,0).reduce(function(r,s){return s&&typeof s.cssText=="string"?r+s.cssText:r},""),i=e.cloneNode(!1);return i.textContent=t,i}}catch(r){if(this.context.logger.error("Unable to access cssRules property",r),r.name!=="SecurityError")throw r}return e.cloneNode(!1)},n.prototype.createCanvasClone=function(e){var A;if(this.options.inlineImages&&e.ownerDocument){var t=e.ownerDocument.createElement("img");try{return t.src=e.toDataURL(),t}catch{this.context.logger.info("Unable to inline canvas contents, canvas is tainted",e)}}var i=e.cloneNode(!1);try{i.width=e.width,i.height=e.height;var r=e.getContext("2d"),s=i.getContext("2d");if(s)if(!this.options.allowTaint&&r)s.putImageData(r.getImageData(0,0,e.width,e.height),0,0);else{var a=(A=e.getContext("webgl2"))!==null&&A!==void 0?A:e.getContext("webgl");if(a){var o=a.getContextAttributes();(o==null?void 0:o.preserveDrawingBuffer)===!1&&this.context.logger.warn("Unable to clone WebGL context as it has preserveDrawingBuffer=false",e)}s.drawImage(e,0,0)}return i}catch{this.context.logger.info("Unable to clone canvas as it is tainted",e)}return i},n.prototype.createVideoClone=function(e){var A=e.ownerDocument.createElement("canvas");A.width=e.offsetWidth,A.height=e.offsetHeight;var t=A.getContext("2d");try{return t&&(t.drawImage(e,0,0,A.width,A.height),this.options.allowTaint||t.getImageData(0,0,A.width,A.height)),A}catch{this.context.logger.info("Unable to clone video as it is tainted",e)}var i=e.ownerDocument.createElement("canvas");return i.width=e.offsetWidth,i.height=e.offsetHeight,i},n.prototype.appendChildNode=function(e,A,t){(!vi(A)||!XB(A)&&!A.hasAttribute(df)&&(typeof this.options.ignoreElements!="function"||!this.options.ignoreElements(A)))&&(!this.options.copyStyles||!vi(A)||!xc(A))&&e.appendChild(this.cloneNode(A,t))},n.prototype.cloneChildNodes=function(e,A,t){for(var i=this,r=e.shadowRoot?e.shadowRoot.firstChild:e.firstChild;r;r=r.nextSibling)if(vi(r)&&hf(r)&&typeof r.assignedNodes=="function"){var s=r.assignedNodes();s.length&&s.forEach(function(a){return i.appendChildNode(A,a,t)})}else this.appendChildNode(A,r,t)},n.prototype.cloneNode=function(e,A){if(of(e))return document.createTextNode(e.data);if(!e.ownerDocument)return e.cloneNode(!1);var t=e.ownerDocument.defaultView;if(t&&vi(e)&&(Wo(e)||Ts(e))){var i=this.createElementClone(e);i.style.transitionProperty="none";var r=t.getComputedStyle(e),s=t.getComputedStyle(e,":before"),a=t.getComputedStyle(e,":after");this.referenceElement===e&&Wo(i)&&(this.clonedReferenceElement=i),ml(i)&&a0(i);var o=this.counters.parse(new oc(this.context,r)),l=this.resolvePseudoContent(e,i,s,hr.BEFORE);Uc(e)&&(A=!0),Cc(e)||this.cloneChildNodes(e,i,A),l&&i.insertBefore(l,i.firstChild);var c=this.resolvePseudoContent(e,i,a,hr.AFTER);return c&&i.appendChild(c),this.counters.pop(o),(r&&(this.options.copyStyles||Ts(e))&&!uf(e)||A)&&Na(r,i),(e.scrollTop!==0||e.scrollLeft!==0)&&this.scrolledElements.push([i,e.scrollLeft,e.scrollTop]),(Ps(e)||Os(e))&&(Ps(i)||Os(i))&&(i.value=e.value),i}return e.cloneNode(!1)},n.prototype.resolvePseudoContent=function(e,A,t,i){var r=this;if(t){var s=t.content,a=A.ownerDocument;if(!(!a||!s||s==="none"||s==="-moz-alt-content"||t.display==="none")){this.counters.parse(new oc(this.context,t));var o=new Km(this.context,t),l=a.createElement("html2canvaspseudoelement");Na(t,l),o.content.forEach(function(u){if(u.type===0)l.appendChild(a.createTextNode(u.value));else if(u.type===22){var h=a.createElement("img");h.src=u.value,h.style.opacity="1",l.appendChild(h)}else if(u.type===18){if(u.name==="attr"){var p=u.values.filter(eA);p.length&&l.appendChild(a.createTextNode(e.getAttribute(p[0].value)||""))}else if(u.name==="counter"){var g=u.values.filter(Di),m=g[0],d=g[1];if(m&&eA(m)){var f=r.counters.getCounterValue(m.value),v=d&&eA(d)?Vo.parse(r.context,d.value):3;l.appendChild(a.createTextNode(wr(f,v,!1)))}}else if(u.name==="counters"){var w=u.values.filter(Di),m=w[0],C=w[1],d=w[2];if(m&&eA(m)){var x=r.counters.getCounterValues(m.value),U=d&&eA(d)?Vo.parse(r.context,d.value):3,y=C&&C.type===0?C.value:"",R=x.map(function(z){return wr(z,U,!1)}).join(y);l.appendChild(a.createTextNode(R))}}}else if(u.type===20)switch(u.value){case"open-quote":l.appendChild(a.createTextNode(ac(o.quotes,r.quoteDepth++,!0)));break;case"close-quote":l.appendChild(a.createTextNode(ac(o.quotes,--r.quoteDepth,!1)));break;default:l.appendChild(a.createTextNode(u.value))}}),l.className=Yo+" "+Jo;var c=i===hr.BEFORE?" "+Yo:" "+Jo;return Ts(A)?A.className.baseValue+=c:A.className+=c,l}}},n.destroy=function(e){return e.parentNode?(e.parentNode.removeChild(e),!0):!1},n}(),hr;(function(n){n[n.BEFORE=0]="BEFORE",n[n.AFTER=1]="AFTER"})(hr||(hr={}));var ZB=function(n,e){var A=n.createElement("iframe");return A.className="html2canvas-container",A.style.visibility="hidden",A.style.position="fixed",A.style.left="-10000px",A.style.top="0px",A.style.border="0",A.width=e.width.toString(),A.height=e.height.toString(),A.scrolling="no",A.setAttribute(df,"true"),n.body.appendChild(A),A},jB=function(n){return new Promise(function(e){if(n.complete){e();return}if(!n.src){e();return}n.onload=e,n.onerror=e})},$B=function(n){return Promise.all([].slice.call(n.images,0).map(jB))},e0=function(n){return new Promise(function(e,A){var t=n.contentWindow;if(!t)return A("No window assigned for iframe");var i=t.document;t.onload=n.onload=function(){t.onload=n.onload=null;var r=setInterval(function(){i.body.childNodes.length>0&&i.readyState==="complete"&&(clearInterval(r),e(n))},50)}})},A0=["all","d","content"],Na=function(n,e){for(var A=n.length-1;A>=0;A--){var t=n.item(A);A0.indexOf(t)===-1&&e.style.setProperty(t,n.getPropertyValue(t))}return e},t0=function(n){var e="";return n&&(e+="<!DOCTYPE ",n.name&&(e+=n.name),n.internalSubset&&(e+=n.internalSubset),n.publicId&&(e+='"'+n.publicId+'"'),n.systemId&&(e+='"'+n.systemId+'"'),e+=">"),e},n0=function(n,e,A){n&&n.defaultView&&(e!==n.defaultView.pageXOffset||A!==n.defaultView.pageYOffset)&&n.defaultView.scrollTo(e,A)},i0=function(n){var e=n[0],A=n[1],t=n[2];e.scrollLeft=A,e.scrollTop=t},r0=":before",s0=":after",Yo="___html2canvas___pseudoelement_before",Jo="___html2canvas___pseudoelement_after",Qc=`{
    content: "" !important;
    display: none !important;
}`,a0=function(n){o0(n,"."+Yo+r0+Qc+`
         .`+Jo+s0+Qc)},o0=function(n,e){var A=n.ownerDocument;if(A){var t=A.createElement("style");t.textContent=e,n.appendChild(t)}},pf=function(){function n(){}return n.getOrigin=function(e){var A=n._link;return A?(A.href=e,A.href=A.href,A.protocol+A.hostname+A.port):"about:blank"},n.isSameOrigin=function(e){return n.getOrigin(e)===n._origin},n.setContext=function(e){n._link=e.document.createElement("a"),n._origin=n.getOrigin(e.location.href)},n._origin="about:blank",n}(),l0=function(){function n(e,A){this.context=e,this._options=A,this._cache={}}return n.prototype.addImage=function(e){var A=Promise.resolve();return this.has(e)||(Va(e)||f0(e))&&(this._cache[e]=this.loadImage(e)).catch(function(){}),A},n.prototype.match=function(e){return this._cache[e]},n.prototype.loadImage=function(e){return GA(this,void 0,void 0,function(){var A,t,i,r,s=this;return IA(this,function(a){switch(a.label){case 0:return A=pf.isSameOrigin(e),t=!Ga(e)&&this._options.useCORS===!0&&xA.SUPPORT_CORS_IMAGES&&!A,i=!Ga(e)&&!A&&!Va(e)&&typeof this._options.proxy=="string"&&xA.SUPPORT_CORS_XHR&&!t,!A&&this._options.allowTaint===!1&&!Ga(e)&&!Va(e)&&!i&&!t?[2]:(r=e,i?[4,this.proxy(r)]:[3,2]);case 1:r=a.sent(),a.label=2;case 2:return this.context.logger.debug("Added image "+e.substring(0,256)),[4,new Promise(function(o,l){var c=new Image;c.onload=function(){return o(c)},c.onerror=l,(d0(r)||t)&&(c.crossOrigin="anonymous"),c.src=r,c.complete===!0&&setTimeout(function(){return o(c)},500),s._options.imageTimeout>0&&setTimeout(function(){return l("Timed out ("+s._options.imageTimeout+"ms) loading image")},s._options.imageTimeout)})];case 3:return[2,a.sent()]}})})},n.prototype.has=function(e){return typeof this._cache[e]<"u"},n.prototype.keys=function(){return Promise.resolve(Object.keys(this._cache))},n.prototype.proxy=function(e){var A=this,t=this._options.proxy;if(!t)throw new Error("No proxy defined");var i=e.substring(0,256);return new Promise(function(r,s){var a=xA.SUPPORT_RESPONSE_TYPE?"blob":"text",o=new XMLHttpRequest;o.onload=function(){if(o.status===200)if(a==="text")r(o.response);else{var u=new FileReader;u.addEventListener("load",function(){return r(u.result)},!1),u.addEventListener("error",function(h){return s(h)},!1),u.readAsDataURL(o.response)}else s("Failed to proxy resource "+i+" with status code "+o.status)},o.onerror=s;var l=t.indexOf("?")>-1?"&":"?";if(o.open("GET",""+t+l+"url="+encodeURIComponent(e)+"&responseType="+a),a!=="text"&&o instanceof XMLHttpRequest&&(o.responseType=a),A._options.imageTimeout){var c=A._options.imageTimeout;o.timeout=c,o.ontimeout=function(){return s("Timed out ("+c+"ms) proxying "+i)}}o.send()})},n}(),c0=/^data:image\/svg\+xml/i,u0=/^data:image\/.*;base64,/i,h0=/^data:image\/.*/i,f0=function(n){return xA.SUPPORT_SVG_DRAWING||!p0(n)},Ga=function(n){return h0.test(n)},d0=function(n){return u0.test(n)},Va=function(n){return n.substr(0,4)==="blob"},p0=function(n){return n.substr(-3).toLowerCase()==="svg"||c0.test(n)},de=function(){function n(e,A){this.type=0,this.x=e,this.y=A}return n.prototype.add=function(e,A){return new n(this.x+e,this.y+A)},n}(),Zn=function(n,e,A){return new de(n.x+(e.x-n.x)*A,n.y+(e.y-n.y)*A)},es=function(){function n(e,A,t,i){this.type=1,this.start=e,this.startControl=A,this.endControl=t,this.end=i}return n.prototype.subdivide=function(e,A){var t=Zn(this.start,this.startControl,e),i=Zn(this.startControl,this.endControl,e),r=Zn(this.endControl,this.end,e),s=Zn(t,i,e),a=Zn(i,r,e),o=Zn(s,a,e);return A?new n(this.start,t,s,o):new n(o,a,r,this.end)},n.prototype.add=function(e,A){return new n(this.start.add(e,A),this.startControl.add(e,A),this.endControl.add(e,A),this.end.add(e,A))},n.prototype.reverse=function(){return new n(this.end,this.endControl,this.startControl,this.start)},n}(),nt=function(n){return n.type===1},g0=function(){function n(e){var A=e.styles,t=e.bounds,i=nr(A.borderTopLeftRadius,t.width,t.height),r=i[0],s=i[1],a=nr(A.borderTopRightRadius,t.width,t.height),o=a[0],l=a[1],c=nr(A.borderBottomRightRadius,t.width,t.height),u=c[0],h=c[1],p=nr(A.borderBottomLeftRadius,t.width,t.height),g=p[0],m=p[1],d=[];d.push((r+o)/t.width),d.push((g+u)/t.width),d.push((s+m)/t.height),d.push((l+h)/t.height);var f=Math.max.apply(Math,d);f>1&&(r/=f,s/=f,o/=f,l/=f,u/=f,h/=f,g/=f,m/=f);var v=t.width-o,w=t.height-h,C=t.width-u,x=t.height-m,U=A.borderTopWidth,y=A.borderRightWidth,R=A.borderBottomWidth,B=A.borderLeftWidth,M=tA(A.paddingTop,e.bounds.width),z=tA(A.paddingRight,e.bounds.width),J=tA(A.paddingBottom,e.bounds.width),Y=tA(A.paddingLeft,e.bounds.width);this.topLeftBorderDoubleOuterBox=r>0||s>0?sA(t.left+B/3,t.top+U/3,r-B/3,s-U/3,je.TOP_LEFT):new de(t.left+B/3,t.top+U/3),this.topRightBorderDoubleOuterBox=r>0||s>0?sA(t.left+v,t.top+U/3,o-y/3,l-U/3,je.TOP_RIGHT):new de(t.left+t.width-y/3,t.top+U/3),this.bottomRightBorderDoubleOuterBox=u>0||h>0?sA(t.left+C,t.top+w,u-y/3,h-R/3,je.BOTTOM_RIGHT):new de(t.left+t.width-y/3,t.top+t.height-R/3),this.bottomLeftBorderDoubleOuterBox=g>0||m>0?sA(t.left+B/3,t.top+x,g-B/3,m-R/3,je.BOTTOM_LEFT):new de(t.left+B/3,t.top+t.height-R/3),this.topLeftBorderDoubleInnerBox=r>0||s>0?sA(t.left+B*2/3,t.top+U*2/3,r-B*2/3,s-U*2/3,je.TOP_LEFT):new de(t.left+B*2/3,t.top+U*2/3),this.topRightBorderDoubleInnerBox=r>0||s>0?sA(t.left+v,t.top+U*2/3,o-y*2/3,l-U*2/3,je.TOP_RIGHT):new de(t.left+t.width-y*2/3,t.top+U*2/3),this.bottomRightBorderDoubleInnerBox=u>0||h>0?sA(t.left+C,t.top+w,u-y*2/3,h-R*2/3,je.BOTTOM_RIGHT):new de(t.left+t.width-y*2/3,t.top+t.height-R*2/3),this.bottomLeftBorderDoubleInnerBox=g>0||m>0?sA(t.left+B*2/3,t.top+x,g-B*2/3,m-R*2/3,je.BOTTOM_LEFT):new de(t.left+B*2/3,t.top+t.height-R*2/3),this.topLeftBorderStroke=r>0||s>0?sA(t.left+B/2,t.top+U/2,r-B/2,s-U/2,je.TOP_LEFT):new de(t.left+B/2,t.top+U/2),this.topRightBorderStroke=r>0||s>0?sA(t.left+v,t.top+U/2,o-y/2,l-U/2,je.TOP_RIGHT):new de(t.left+t.width-y/2,t.top+U/2),this.bottomRightBorderStroke=u>0||h>0?sA(t.left+C,t.top+w,u-y/2,h-R/2,je.BOTTOM_RIGHT):new de(t.left+t.width-y/2,t.top+t.height-R/2),this.bottomLeftBorderStroke=g>0||m>0?sA(t.left+B/2,t.top+x,g-B/2,m-R/2,je.BOTTOM_LEFT):new de(t.left+B/2,t.top+t.height-R/2),this.topLeftBorderBox=r>0||s>0?sA(t.left,t.top,r,s,je.TOP_LEFT):new de(t.left,t.top),this.topRightBorderBox=o>0||l>0?sA(t.left+v,t.top,o,l,je.TOP_RIGHT):new de(t.left+t.width,t.top),this.bottomRightBorderBox=u>0||h>0?sA(t.left+C,t.top+w,u,h,je.BOTTOM_RIGHT):new de(t.left+t.width,t.top+t.height),this.bottomLeftBorderBox=g>0||m>0?sA(t.left,t.top+x,g,m,je.BOTTOM_LEFT):new de(t.left,t.top+t.height),this.topLeftPaddingBox=r>0||s>0?sA(t.left+B,t.top+U,Math.max(0,r-B),Math.max(0,s-U),je.TOP_LEFT):new de(t.left+B,t.top+U),this.topRightPaddingBox=o>0||l>0?sA(t.left+Math.min(v,t.width-y),t.top+U,v>t.width+y?0:Math.max(0,o-y),Math.max(0,l-U),je.TOP_RIGHT):new de(t.left+t.width-y,t.top+U),this.bottomRightPaddingBox=u>0||h>0?sA(t.left+Math.min(C,t.width-B),t.top+Math.min(w,t.height-R),Math.max(0,u-y),Math.max(0,h-R),je.BOTTOM_RIGHT):new de(t.left+t.width-y,t.top+t.height-R),this.bottomLeftPaddingBox=g>0||m>0?sA(t.left+B,t.top+Math.min(x,t.height-R),Math.max(0,g-B),Math.max(0,m-R),je.BOTTOM_LEFT):new de(t.left+B,t.top+t.height-R),this.topLeftContentBox=r>0||s>0?sA(t.left+B+Y,t.top+U+M,Math.max(0,r-(B+Y)),Math.max(0,s-(U+M)),je.TOP_LEFT):new de(t.left+B+Y,t.top+U+M),this.topRightContentBox=o>0||l>0?sA(t.left+Math.min(v,t.width+B+Y),t.top+U+M,v>t.width+B+Y?0:o-B+Y,l-(U+M),je.TOP_RIGHT):new de(t.left+t.width-(y+z),t.top+U+M),this.bottomRightContentBox=u>0||h>0?sA(t.left+Math.min(C,t.width-(B+Y)),t.top+Math.min(w,t.height+U+M),Math.max(0,u-(y+z)),h-(R+J),je.BOTTOM_RIGHT):new de(t.left+t.width-(y+z),t.top+t.height-(R+J)),this.bottomLeftContentBox=g>0||m>0?sA(t.left+B+Y,t.top+x,Math.max(0,g-(B+Y)),m-(R+J),je.BOTTOM_LEFT):new de(t.left+B+Y,t.top+t.height-(R+J))}return n}(),je;(function(n){n[n.TOP_LEFT=0]="TOP_LEFT",n[n.TOP_RIGHT=1]="TOP_RIGHT",n[n.BOTTOM_RIGHT=2]="BOTTOM_RIGHT",n[n.BOTTOM_LEFT=3]="BOTTOM_LEFT"})(je||(je={}));var sA=function(n,e,A,t,i){var r=4*((Math.sqrt(2)-1)/3),s=A*r,a=t*r,o=n+A,l=e+t;switch(i){case je.TOP_LEFT:return new es(new de(n,l),new de(n,l-a),new de(o-s,e),new de(o,e));case je.TOP_RIGHT:return new es(new de(n,e),new de(n+s,e),new de(o,l-a),new de(o,l));case je.BOTTOM_RIGHT:return new es(new de(o,e),new de(o,e+a),new de(n+s,l),new de(n,l));case je.BOTTOM_LEFT:default:return new es(new de(o,l),new de(o-s,l),new de(n,e+a),new de(n,e))}},Ns=function(n){return[n.topLeftBorderBox,n.topRightBorderBox,n.bottomRightBorderBox,n.bottomLeftBorderBox]},m0=function(n){return[n.topLeftContentBox,n.topRightContentBox,n.bottomRightContentBox,n.bottomLeftContentBox]},Gs=function(n){return[n.topLeftPaddingBox,n.topRightPaddingBox,n.bottomRightPaddingBox,n.bottomLeftPaddingBox]},B0=function(){function n(e,A,t){this.offsetX=e,this.offsetY=A,this.matrix=t,this.type=0,this.target=6}return n}(),As=function(){function n(e,A){this.path=e,this.target=A,this.type=1}return n}(),_0=function(){function n(e){this.opacity=e,this.type=2,this.target=6}return n}(),w0=function(n){return n.type===0},gf=function(n){return n.type===1},v0=function(n){return n.type===2},Ic=function(n,e){return n.length===e.length?n.some(function(A,t){return A===e[t]}):!1},E0=function(n,e,A,t,i){return n.map(function(r,s){switch(s){case 0:return r.add(e,A);case 1:return r.add(e+t,A);case 2:return r.add(e+t,A+i);case 3:return r.add(e,A+i)}return r})},mf=function(){function n(e){this.element=e,this.inlineLevel=[],this.nonInlineLevel=[],this.negativeZIndex=[],this.zeroOrAutoZIndexOrTransformedOrOpacity=[],this.positiveZIndex=[],this.nonPositionedFloats=[],this.nonPositionedInlineLevel=[]}return n}(),Bf=function(){function n(e,A){if(this.container=e,this.parent=A,this.effects=[],this.curves=new g0(this.container),this.container.styles.opacity<1&&this.effects.push(new _0(this.container.styles.opacity)),this.container.styles.transform!==null){var t=this.container.bounds.left+this.container.styles.transformOrigin[0].number,i=this.container.bounds.top+this.container.styles.transformOrigin[1].number,r=this.container.styles.transform;this.effects.push(new B0(t,i,r))}if(this.container.styles.overflowX!==0){var s=Ns(this.curves),a=Gs(this.curves);Ic(s,a)?this.effects.push(new As(s,6)):(this.effects.push(new As(s,2)),this.effects.push(new As(a,4)))}}return n.prototype.getEffects=function(e){for(var A=[2,3].indexOf(this.container.styles.position)===-1,t=this.parent,i=this.effects.slice(0);t;){var r=t.effects.filter(function(o){return!gf(o)});if(A||t.container.styles.position!==0||!t.parent){if(i.unshift.apply(i,r),A=[2,3].indexOf(t.container.styles.position)===-1,t.container.styles.overflowX!==0){var s=Ns(t.curves),a=Gs(t.curves);Ic(s,a)||i.unshift(new As(a,6))}}else i.unshift.apply(i,r);t=t.parent}return i.filter(function(o){return gA(o.target,e)})},n}(),qo=function(n,e,A,t){n.container.elements.forEach(function(i){var r=gA(i.flags,4),s=gA(i.flags,2),a=new Bf(i,n);gA(i.styles.display,2048)&&t.push(a);var o=gA(i.flags,8)?[]:t;if(r||s){var l=r||i.styles.isPositioned()?A:e,c=new mf(a);if(i.styles.isPositioned()||i.styles.opacity<1||i.styles.isTransformed()){var u=i.styles.zIndex.order;if(u<0){var h=0;l.negativeZIndex.some(function(g,m){return u>g.element.container.styles.zIndex.order?(h=m,!1):h>0}),l.negativeZIndex.splice(h,0,c)}else if(u>0){var p=0;l.positiveZIndex.some(function(g,m){return u>=g.element.container.styles.zIndex.order?(p=m+1,!1):p>0}),l.positiveZIndex.splice(p,0,c)}else l.zeroOrAutoZIndexOrTransformedOrOpacity.push(c)}else i.styles.isFloating()?l.nonPositionedFloats.push(c):l.nonPositionedInlineLevel.push(c);qo(a,c,r?c:A,o)}else i.styles.isInlineLevel()?e.inlineLevel.push(a):e.nonInlineLevel.push(a),qo(a,e,A,o);gA(i.flags,8)&&_f(i,o)})},_f=function(n,e){for(var A=n instanceof zo?n.start:1,t=n instanceof zo?n.reversed:!1,i=0;i<e.length;i++){var r=e[i];r.container instanceof Af&&typeof r.container.value=="number"&&r.container.value!==0&&(A=r.container.value),r.listValue=wr(A,r.container.styles.listStyleType,!0),A+=t?-1:1}},C0=function(n){var e=new Bf(n,null),A=new mf(e),t=[];return qo(e,A,A,t),_f(e.container,t),A},Lc=function(n,e){switch(e){case 0:return ot(n.topLeftBorderBox,n.topLeftPaddingBox,n.topRightBorderBox,n.topRightPaddingBox);case 1:return ot(n.topRightBorderBox,n.topRightPaddingBox,n.bottomRightBorderBox,n.bottomRightPaddingBox);case 2:return ot(n.bottomRightBorderBox,n.bottomRightPaddingBox,n.bottomLeftBorderBox,n.bottomLeftPaddingBox);case 3:default:return ot(n.bottomLeftBorderBox,n.bottomLeftPaddingBox,n.topLeftBorderBox,n.topLeftPaddingBox)}},x0=function(n,e){switch(e){case 0:return ot(n.topLeftBorderBox,n.topLeftBorderDoubleOuterBox,n.topRightBorderBox,n.topRightBorderDoubleOuterBox);case 1:return ot(n.topRightBorderBox,n.topRightBorderDoubleOuterBox,n.bottomRightBorderBox,n.bottomRightBorderDoubleOuterBox);case 2:return ot(n.bottomRightBorderBox,n.bottomRightBorderDoubleOuterBox,n.bottomLeftBorderBox,n.bottomLeftBorderDoubleOuterBox);case 3:default:return ot(n.bottomLeftBorderBox,n.bottomLeftBorderDoubleOuterBox,n.topLeftBorderBox,n.topLeftBorderDoubleOuterBox)}},U0=function(n,e){switch(e){case 0:return ot(n.topLeftBorderDoubleInnerBox,n.topLeftPaddingBox,n.topRightBorderDoubleInnerBox,n.topRightPaddingBox);case 1:return ot(n.topRightBorderDoubleInnerBox,n.topRightPaddingBox,n.bottomRightBorderDoubleInnerBox,n.bottomRightPaddingBox);case 2:return ot(n.bottomRightBorderDoubleInnerBox,n.bottomRightPaddingBox,n.bottomLeftBorderDoubleInnerBox,n.bottomLeftPaddingBox);case 3:default:return ot(n.bottomLeftBorderDoubleInnerBox,n.bottomLeftPaddingBox,n.topLeftBorderDoubleInnerBox,n.topLeftPaddingBox)}},y0=function(n,e){switch(e){case 0:return ts(n.topLeftBorderStroke,n.topRightBorderStroke);case 1:return ts(n.topRightBorderStroke,n.bottomRightBorderStroke);case 2:return ts(n.bottomRightBorderStroke,n.bottomLeftBorderStroke);case 3:default:return ts(n.bottomLeftBorderStroke,n.topLeftBorderStroke)}},ts=function(n,e){var A=[];return nt(n)?A.push(n.subdivide(.5,!1)):A.push(n),nt(e)?A.push(e.subdivide(.5,!0)):A.push(e),A},ot=function(n,e,A,t){var i=[];return nt(n)?i.push(n.subdivide(.5,!1)):i.push(n),nt(A)?i.push(A.subdivide(.5,!0)):i.push(A),nt(t)?i.push(t.subdivide(.5,!0).reverse()):i.push(t),nt(e)?i.push(e.subdivide(.5,!1).reverse()):i.push(e),i},wf=function(n){var e=n.bounds,A=n.styles;return e.add(A.borderLeftWidth,A.borderTopWidth,-(A.borderRightWidth+A.borderLeftWidth),-(A.borderTopWidth+A.borderBottomWidth))},Vs=function(n){var e=n.styles,A=n.bounds,t=tA(e.paddingLeft,A.width),i=tA(e.paddingRight,A.width),r=tA(e.paddingTop,A.width),s=tA(e.paddingBottom,A.width);return A.add(t+e.borderLeftWidth,r+e.borderTopWidth,-(e.borderRightWidth+e.borderLeftWidth+t+i),-(e.borderTopWidth+e.borderBottomWidth+r+s))},S0=function(n,e){return n===0?e.bounds:n===2?Vs(e):wf(e)},M0=function(n,e){return n===0?e.bounds:n===2?Vs(e):wf(e)},Ka=function(n,e,A){var t=S0(_i(n.styles.backgroundOrigin,e),n),i=M0(_i(n.styles.backgroundClip,e),n),r=F0(_i(n.styles.backgroundSize,e),A,t),s=r[0],a=r[1],o=nr(_i(n.styles.backgroundPosition,e),t.width-s,t.height-a),l=b0(_i(n.styles.backgroundRepeat,e),o,r,t,i),c=Math.round(t.left+o[0]),u=Math.round(t.top+o[1]);return[l,c,u,s,a]},jn=function(n){return eA(n)&&n.value===Ci.AUTO},ns=function(n){return typeof n=="number"},F0=function(n,e,A){var t=e[0],i=e[1],r=e[2],s=n[0],a=n[1];if(!s)return[0,0];if(pA(s)&&a&&pA(a))return[tA(s,A.width),tA(a,A.height)];var o=ns(r);if(eA(s)&&(s.value===Ci.CONTAIN||s.value===Ci.COVER)){if(ns(r)){var l=A.width/A.height;return l<r!=(s.value===Ci.COVER)?[A.width,A.width/r]:[A.height*r,A.height]}return[A.width,A.height]}var c=ns(t),u=ns(i),h=c||u;if(jn(s)&&(!a||jn(a))){if(c&&u)return[t,i];if(!o&&!h)return[A.width,A.height];if(h&&o){var p=c?t:i*r,g=u?i:t/r;return[p,g]}var m=c?t:A.width,d=u?i:A.height;return[m,d]}if(o){var f=0,v=0;return pA(s)?f=tA(s,A.width):pA(a)&&(v=tA(a,A.height)),jn(s)?f=v*r:(!a||jn(a))&&(v=f/r),[f,v]}var w=null,C=null;if(pA(s)?w=tA(s,A.width):a&&pA(a)&&(C=tA(a,A.height)),w!==null&&(!a||jn(a))&&(C=c&&u?w/t*i:A.height),C!==null&&jn(s)&&(w=c&&u?C/i*t:A.width),w!==null&&C!==null)return[w,C];throw new Error("Unable to calculate background-size for element")},_i=function(n,e){var A=n[e];return typeof A>"u"?n[0]:A},b0=function(n,e,A,t,i){var r=e[0],s=e[1],a=A[0],o=A[1];switch(n){case 2:return[new de(Math.round(t.left),Math.round(t.top+s)),new de(Math.round(t.left+t.width),Math.round(t.top+s)),new de(Math.round(t.left+t.width),Math.round(o+t.top+s)),new de(Math.round(t.left),Math.round(o+t.top+s))];case 3:return[new de(Math.round(t.left+r),Math.round(t.top)),new de(Math.round(t.left+r+a),Math.round(t.top)),new de(Math.round(t.left+r+a),Math.round(t.height+t.top)),new de(Math.round(t.left+r),Math.round(t.height+t.top))];case 1:return[new de(Math.round(t.left+r),Math.round(t.top+s)),new de(Math.round(t.left+r+a),Math.round(t.top+s)),new de(Math.round(t.left+r+a),Math.round(t.top+s+o)),new de(Math.round(t.left+r),Math.round(t.top+s+o))];default:return[new de(Math.round(i.left),Math.round(i.top)),new de(Math.round(i.left+i.width),Math.round(i.top)),new de(Math.round(i.left+i.width),Math.round(i.height+i.top)),new de(Math.round(i.left),Math.round(i.height+i.top))]}},T0="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",Rc="Hidden Text",Q0=function(){function n(e){this._data={},this._document=e}return n.prototype.parseMetrics=function(e,A){var t=this._document.createElement("div"),i=this._document.createElement("img"),r=this._document.createElement("span"),s=this._document.body;t.style.visibility="hidden",t.style.fontFamily=e,t.style.fontSize=A,t.style.margin="0",t.style.padding="0",t.style.whiteSpace="nowrap",s.appendChild(t),i.src=T0,i.width=1,i.height=1,i.style.margin="0",i.style.padding="0",i.style.verticalAlign="baseline",r.style.fontFamily=e,r.style.fontSize=A,r.style.margin="0",r.style.padding="0",r.appendChild(this._document.createTextNode(Rc)),t.appendChild(r),t.appendChild(i);var a=i.offsetTop-r.offsetTop+2;t.removeChild(r),t.appendChild(this._document.createTextNode(Rc)),t.style.lineHeight="normal",i.style.verticalAlign="super";var o=i.offsetTop-t.offsetTop+2;return s.removeChild(t),{baseline:a,middle:o}},n.prototype.getMetrics=function(e,A){var t=e+" "+A;return typeof this._data[t]>"u"&&(this._data[t]=this.parseMetrics(e,A)),this._data[t]},n}(),vf=function(){function n(e,A){this.context=e,this.options=A}return n}(),I0=1e4,L0=function(n){_t(e,n);function e(A,t){var i=n.call(this,A,t)||this;return i._activeEffects=[],i.canvas=t.canvas?t.canvas:document.createElement("canvas"),i.ctx=i.canvas.getContext("2d"),t.canvas||(i.canvas.width=Math.floor(t.width*t.scale),i.canvas.height=Math.floor(t.height*t.scale),i.canvas.style.width=t.width+"px",i.canvas.style.height=t.height+"px"),i.fontMetrics=new Q0(document),i.ctx.scale(i.options.scale,i.options.scale),i.ctx.translate(-t.x,-t.y),i.ctx.textBaseline="bottom",i._activeEffects=[],i.context.logger.debug("Canvas renderer initialized ("+t.width+"x"+t.height+") with scale "+t.scale),i}return e.prototype.applyEffects=function(A){for(var t=this;this._activeEffects.length;)this.popEffect();A.forEach(function(i){return t.applyEffect(i)})},e.prototype.applyEffect=function(A){this.ctx.save(),v0(A)&&(this.ctx.globalAlpha=A.opacity),w0(A)&&(this.ctx.translate(A.offsetX,A.offsetY),this.ctx.transform(A.matrix[0],A.matrix[1],A.matrix[2],A.matrix[3],A.matrix[4],A.matrix[5]),this.ctx.translate(-A.offsetX,-A.offsetY)),gf(A)&&(this.path(A.path),this.ctx.clip()),this._activeEffects.push(A)},e.prototype.popEffect=function(){this._activeEffects.pop(),this.ctx.restore()},e.prototype.renderStack=function(A){return GA(this,void 0,void 0,function(){var t;return IA(this,function(i){switch(i.label){case 0:return t=A.element.container.styles,t.isVisible()?[4,this.renderStackContent(A)]:[3,2];case 1:i.sent(),i.label=2;case 2:return[2]}})})},e.prototype.renderNode=function(A){return GA(this,void 0,void 0,function(){return IA(this,function(t){switch(t.label){case 0:if(gA(A.container.flags,16))debugger;return A.container.styles.isVisible()?[4,this.renderNodeBackgroundAndBorders(A)]:[3,3];case 1:return t.sent(),[4,this.renderNodeContent(A)];case 2:t.sent(),t.label=3;case 3:return[2]}})})},e.prototype.renderTextWithLetterSpacing=function(A,t,i){var r=this;if(t===0)this.ctx.fillText(A.text,A.bounds.left,A.bounds.top+i);else{var s=pl(A.text);s.reduce(function(a,o){return r.ctx.fillText(o,a,A.bounds.top+i),a+r.ctx.measureText(o).width},A.bounds.left)}},e.prototype.createFontStyle=function(A){var t=A.fontVariant.filter(function(s){return s==="normal"||s==="small-caps"}).join(""),i=O0(A.fontFamily).join(", "),r=Fr(A.fontSize)?""+A.fontSize.number+A.fontSize.unit:A.fontSize.number+"px";return[[A.fontStyle,t,A.fontWeight,r,i].join(" "),i,r]},e.prototype.renderTextNode=function(A,t){return GA(this,void 0,void 0,function(){var i,r,s,a,o,l,c,u,h=this;return IA(this,function(p){return i=this.createFontStyle(t),r=i[0],s=i[1],a=i[2],this.ctx.font=r,this.ctx.direction=t.direction===1?"rtl":"ltr",this.ctx.textAlign="left",this.ctx.textBaseline="alphabetic",o=this.fontMetrics.getMetrics(s,a),l=o.baseline,c=o.middle,u=t.paintOrder,A.textBounds.forEach(function(g){u.forEach(function(m){switch(m){case 0:h.ctx.fillStyle=EA(t.color),h.renderTextWithLetterSpacing(g,t.letterSpacing,l);var d=t.textShadow;d.length&&g.text.trim().length&&(d.slice(0).reverse().forEach(function(f){h.ctx.shadowColor=EA(f.color),h.ctx.shadowOffsetX=f.offsetX.number*h.options.scale,h.ctx.shadowOffsetY=f.offsetY.number*h.options.scale,h.ctx.shadowBlur=f.blur.number,h.renderTextWithLetterSpacing(g,t.letterSpacing,l)}),h.ctx.shadowColor="",h.ctx.shadowOffsetX=0,h.ctx.shadowOffsetY=0,h.ctx.shadowBlur=0),t.textDecorationLine.length&&(h.ctx.fillStyle=EA(t.textDecorationColor||t.color),t.textDecorationLine.forEach(function(f){switch(f){case 1:h.ctx.fillRect(g.bounds.left,Math.round(g.bounds.top+l),g.bounds.width,1);break;case 2:h.ctx.fillRect(g.bounds.left,Math.round(g.bounds.top),g.bounds.width,1);break;case 3:h.ctx.fillRect(g.bounds.left,Math.ceil(g.bounds.top+c),g.bounds.width,1);break}}));break;case 1:t.webkitTextStrokeWidth&&g.text.trim().length&&(h.ctx.strokeStyle=EA(t.webkitTextStrokeColor),h.ctx.lineWidth=t.webkitTextStrokeWidth,h.ctx.lineJoin=window.chrome?"miter":"round",h.ctx.strokeText(g.text,g.bounds.left,g.bounds.top+l)),h.ctx.strokeStyle="",h.ctx.lineWidth=0,h.ctx.lineJoin="miter";break}})}),[2]})})},e.prototype.renderReplacedElement=function(A,t,i){if(i&&A.intrinsicWidth>0&&A.intrinsicHeight>0){var r=Vs(A),s=Gs(t);this.path(s),this.ctx.save(),this.ctx.clip(),this.ctx.drawImage(i,0,0,A.intrinsicWidth,A.intrinsicHeight,r.left,r.top,r.width,r.height),this.ctx.restore()}},e.prototype.renderNodeContent=function(A){return GA(this,void 0,void 0,function(){var t,i,r,s,a,o,v,v,l,c,u,h,C,p,g,x,m,d,f,v,w,C,x;return IA(this,function(U){switch(U.label){case 0:this.applyEffects(A.getEffects(4)),t=A.container,i=A.curves,r=t.styles,s=0,a=t.textNodes,U.label=1;case 1:return s<a.length?(o=a[s],[4,this.renderTextNode(o,r)]):[3,4];case 2:U.sent(),U.label=3;case 3:return s++,[3,1];case 4:if(!(t instanceof jh))return[3,8];U.label=5;case 5:return U.trys.push([5,7,,8]),[4,this.context.cache.match(t.src)];case 6:return v=U.sent(),this.renderReplacedElement(t,i,v),[3,8];case 7:return U.sent(),this.context.logger.error("Error loading image "+t.src),[3,8];case 8:if(t instanceof $h&&this.renderReplacedElement(t,i,t.canvas),!(t instanceof ef))return[3,12];U.label=9;case 9:return U.trys.push([9,11,,12]),[4,this.context.cache.match(t.svg)];case 10:return v=U.sent(),this.renderReplacedElement(t,i,v),[3,12];case 11:return U.sent(),this.context.logger.error("Error loading svg "+t.svg.substring(0,255)),[3,12];case 12:return t instanceof rf&&t.tree?(l=new e(this.context,{scale:this.options.scale,backgroundColor:t.backgroundColor,x:0,y:0,width:t.width,height:t.height}),[4,l.render(t.tree)]):[3,14];case 13:c=U.sent(),t.width&&t.height&&this.ctx.drawImage(c,0,0,t.width,t.height,t.bounds.left,t.bounds.top,t.bounds.width,t.bounds.height),U.label=14;case 14:if(t instanceof gl&&(u=Math.min(t.bounds.width,t.bounds.height),t.type===Ds?t.checked&&(this.ctx.save(),this.path([new de(t.bounds.left+u*.39363,t.bounds.top+u*.79),new de(t.bounds.left+u*.16,t.bounds.top+u*.5549),new de(t.bounds.left+u*.27347,t.bounds.top+u*.44071),new de(t.bounds.left+u*.39694,t.bounds.top+u*.5649),new de(t.bounds.left+u*.72983,t.bounds.top+u*.23),new de(t.bounds.left+u*.84,t.bounds.top+u*.34085),new de(t.bounds.left+u*.39363,t.bounds.top+u*.79)]),this.ctx.fillStyle=EA(Ec),this.ctx.fill(),this.ctx.restore()):t.type===Hs&&t.checked&&(this.ctx.save(),this.ctx.beginPath(),this.ctx.arc(t.bounds.left+u/2,t.bounds.top+u/2,u/4,0,Math.PI*2,!0),this.ctx.fillStyle=EA(Ec),this.ctx.fill(),this.ctx.restore())),R0(t)&&t.value.length){switch(h=this.createFontStyle(r),C=h[0],p=h[1],g=this.fontMetrics.getMetrics(C,p).baseline,this.ctx.font=C,this.ctx.fillStyle=EA(r.color),this.ctx.textBaseline="alphabetic",this.ctx.textAlign=H0(t.styles.textAlign),x=Vs(t),m=0,t.styles.textAlign){case 1:m+=x.width/2;break;case 2:m+=x.width;break}d=x.add(m,0,0,-x.height/2+1),this.ctx.save(),this.path([new de(x.left,x.top),new de(x.left+x.width,x.top),new de(x.left+x.width,x.top+x.height),new de(x.left,x.top+x.height)]),this.ctx.clip(),this.renderTextWithLetterSpacing(new ur(t.value,d),r.letterSpacing,g),this.ctx.restore(),this.ctx.textBaseline="alphabetic",this.ctx.textAlign="left"}if(!gA(t.styles.display,2048))return[3,20];if(t.styles.listStyleImage===null)return[3,19];if(f=t.styles.listStyleImage,f.type!==0)return[3,18];v=void 0,w=f.url,U.label=15;case 15:return U.trys.push([15,17,,18]),[4,this.context.cache.match(w)];case 16:return v=U.sent(),this.ctx.drawImage(v,t.bounds.left-(v.width+10),t.bounds.top),[3,18];case 17:return U.sent(),this.context.logger.error("Error loading list-style-image "+w),[3,18];case 18:return[3,20];case 19:A.listValue&&t.styles.listStyleType!==-1&&(C=this.createFontStyle(r)[0],this.ctx.font=C,this.ctx.fillStyle=EA(r.color),this.ctx.textBaseline="middle",this.ctx.textAlign="right",x=new Wt(t.bounds.left,t.bounds.top+tA(t.styles.paddingTop,t.bounds.width),t.bounds.width,rc(r.lineHeight,r.fontSize.number)/2+1),this.renderTextWithLetterSpacing(new ur(A.listValue,x),r.letterSpacing,rc(r.lineHeight,r.fontSize.number)/2+2),this.ctx.textBaseline="bottom",this.ctx.textAlign="left"),U.label=20;case 20:return[2]}})})},e.prototype.renderStackContent=function(A){return GA(this,void 0,void 0,function(){var t,i,f,r,s,f,a,o,f,l,c,f,u,h,f,p,g,f,m,d,f;return IA(this,function(v){switch(v.label){case 0:if(gA(A.element.container.flags,16))debugger;return[4,this.renderNodeBackgroundAndBorders(A.element)];case 1:v.sent(),t=0,i=A.negativeZIndex,v.label=2;case 2:return t<i.length?(f=i[t],[4,this.renderStack(f)]):[3,5];case 3:v.sent(),v.label=4;case 4:return t++,[3,2];case 5:return[4,this.renderNodeContent(A.element)];case 6:v.sent(),r=0,s=A.nonInlineLevel,v.label=7;case 7:return r<s.length?(f=s[r],[4,this.renderNode(f)]):[3,10];case 8:v.sent(),v.label=9;case 9:return r++,[3,7];case 10:a=0,o=A.nonPositionedFloats,v.label=11;case 11:return a<o.length?(f=o[a],[4,this.renderStack(f)]):[3,14];case 12:v.sent(),v.label=13;case 13:return a++,[3,11];case 14:l=0,c=A.nonPositionedInlineLevel,v.label=15;case 15:return l<c.length?(f=c[l],[4,this.renderStack(f)]):[3,18];case 16:v.sent(),v.label=17;case 17:return l++,[3,15];case 18:u=0,h=A.inlineLevel,v.label=19;case 19:return u<h.length?(f=h[u],[4,this.renderNode(f)]):[3,22];case 20:v.sent(),v.label=21;case 21:return u++,[3,19];case 22:p=0,g=A.zeroOrAutoZIndexOrTransformedOrOpacity,v.label=23;case 23:return p<g.length?(f=g[p],[4,this.renderStack(f)]):[3,26];case 24:v.sent(),v.label=25;case 25:return p++,[3,23];case 26:m=0,d=A.positiveZIndex,v.label=27;case 27:return m<d.length?(f=d[m],[4,this.renderStack(f)]):[3,30];case 28:v.sent(),v.label=29;case 29:return m++,[3,27];case 30:return[2]}})})},e.prototype.mask=function(A){this.ctx.beginPath(),this.ctx.moveTo(0,0),this.ctx.lineTo(this.canvas.width,0),this.ctx.lineTo(this.canvas.width,this.canvas.height),this.ctx.lineTo(0,this.canvas.height),this.ctx.lineTo(0,0),this.formatPath(A.slice(0).reverse()),this.ctx.closePath()},e.prototype.path=function(A){this.ctx.beginPath(),this.formatPath(A),this.ctx.closePath()},e.prototype.formatPath=function(A){var t=this;A.forEach(function(i,r){var s=nt(i)?i.start:i;r===0?t.ctx.moveTo(s.x,s.y):t.ctx.lineTo(s.x,s.y),nt(i)&&t.ctx.bezierCurveTo(i.startControl.x,i.startControl.y,i.endControl.x,i.endControl.y,i.end.x,i.end.y)})},e.prototype.renderRepeat=function(A,t,i,r){this.path(A),this.ctx.fillStyle=t,this.ctx.translate(i,r),this.ctx.fill(),this.ctx.translate(-i,-r)},e.prototype.resizeImage=function(A,t,i){var r;if(A.width===t&&A.height===i)return A;var s=(r=this.canvas.ownerDocument)!==null&&r!==void 0?r:document,a=s.createElement("canvas");a.width=Math.max(1,t),a.height=Math.max(1,i);var o=a.getContext("2d");return o.drawImage(A,0,0,A.width,A.height,0,0,t,i),a},e.prototype.renderBackgroundImage=function(A){return GA(this,void 0,void 0,function(){var t,i,r,s,a,o;return IA(this,function(l){switch(l.label){case 0:t=A.styles.backgroundImage.length-1,i=function(c){var u,h,p,M,X,K,Y,T,R,g,M,X,K,Y,T,m,d,f,v,w,C,x,U,y,R,B,M,z,J,Y,T,N,X,K,ee,Z,q,Q,O,le,he,fe;return IA(this,function(Ce){switch(Ce.label){case 0:if(c.type!==0)return[3,5];u=void 0,h=c.url,Ce.label=1;case 1:return Ce.trys.push([1,3,,4]),[4,r.context.cache.match(h)];case 2:return u=Ce.sent(),[3,4];case 3:return Ce.sent(),r.context.logger.error("Error loading background-image "+h),[3,4];case 4:return u&&(p=Ka(A,t,[u.width,u.height,u.width/u.height]),M=p[0],X=p[1],K=p[2],Y=p[3],T=p[4],R=r.ctx.createPattern(r.resizeImage(u,Y,T),"repeat"),r.renderRepeat(M,R,X,K)),[3,6];case 5:wg(c)?(g=Ka(A,t,[null,null,null]),M=g[0],X=g[1],K=g[2],Y=g[3],T=g[4],m=pg(c.angle,Y,T),d=m[0],f=m[1],v=m[2],w=m[3],C=m[4],x=document.createElement("canvas"),x.width=Y,x.height=T,U=x.getContext("2d"),y=U.createLinearGradient(f,w,v,C),nc(c.stops,d).forEach(function(Re){return y.addColorStop(Re.stop,EA(Re.color))}),U.fillStyle=y,U.fillRect(0,0,Y,T),Y>0&&T>0&&(R=r.ctx.createPattern(x,"repeat"),r.renderRepeat(M,R,X,K))):vg(c)&&(B=Ka(A,t,[null,null,null]),M=B[0],z=B[1],J=B[2],Y=B[3],T=B[4],N=c.position.length===0?[hl]:c.position,X=tA(N[0],Y),K=tA(N[N.length-1],T),ee=gg(c,X,K,Y,T),Z=ee[0],q=ee[1],Z>0&&q>0&&(Q=r.ctx.createRadialGradient(z+X,J+K,0,z+X,J+K,Z),nc(c.stops,Z*2).forEach(function(Re){return Q.addColorStop(Re.stop,EA(Re.color))}),r.path(M),r.ctx.fillStyle=Q,Z!==q?(O=A.bounds.left+.5*A.bounds.width,le=A.bounds.top+.5*A.bounds.height,he=q/Z,fe=1/he,r.ctx.save(),r.ctx.translate(O,le),r.ctx.transform(1,0,0,he,0,0),r.ctx.translate(-O,-le),r.ctx.fillRect(z,fe*(J-le)+le,Y,T*fe),r.ctx.restore()):r.ctx.fill())),Ce.label=6;case 6:return t--,[2]}})},r=this,s=0,a=A.styles.backgroundImage.slice(0).reverse(),l.label=1;case 1:return s<a.length?(o=a[s],[5,i(o)]):[3,4];case 2:l.sent(),l.label=3;case 3:return s++,[3,1];case 4:return[2]}})})},e.prototype.renderSolidBorder=function(A,t,i){return GA(this,void 0,void 0,function(){return IA(this,function(r){return this.path(Lc(i,t)),this.ctx.fillStyle=EA(A),this.ctx.fill(),[2]})})},e.prototype.renderDoubleBorder=function(A,t,i,r){return GA(this,void 0,void 0,function(){var s,a;return IA(this,function(o){switch(o.label){case 0:return t<3?[4,this.renderSolidBorder(A,i,r)]:[3,2];case 1:return o.sent(),[2];case 2:return s=x0(r,i),this.path(s),this.ctx.fillStyle=EA(A),this.ctx.fill(),a=U0(r,i),this.path(a),this.ctx.fill(),[2]}})})},e.prototype.renderNodeBackgroundAndBorders=function(A){return GA(this,void 0,void 0,function(){var t,i,r,s,a,o,l,c,u=this;return IA(this,function(h){switch(h.label){case 0:return this.applyEffects(A.getEffects(2)),t=A.container.styles,i=!hn(t.backgroundColor)||t.backgroundImage.length,r=[{style:t.borderTopStyle,color:t.borderTopColor,width:t.borderTopWidth},{style:t.borderRightStyle,color:t.borderRightColor,width:t.borderRightWidth},{style:t.borderBottomStyle,color:t.borderBottomColor,width:t.borderBottomWidth},{style:t.borderLeftStyle,color:t.borderLeftColor,width:t.borderLeftWidth}],s=D0(_i(t.backgroundClip,0),A.curves),i||t.boxShadow.length?(this.ctx.save(),this.path(s),this.ctx.clip(),hn(t.backgroundColor)||(this.ctx.fillStyle=EA(t.backgroundColor),this.ctx.fill()),[4,this.renderBackgroundImage(A.container)]):[3,2];case 1:h.sent(),this.ctx.restore(),t.boxShadow.slice(0).reverse().forEach(function(p){u.ctx.save();var g=Ns(A.curves),m=p.inset?0:I0,d=E0(g,-m+(p.inset?1:-1)*p.spread.number,(p.inset?1:-1)*p.spread.number,p.spread.number*(p.inset?-2:2),p.spread.number*(p.inset?-2:2));p.inset?(u.path(g),u.ctx.clip(),u.mask(d)):(u.mask(g),u.ctx.clip(),u.path(d)),u.ctx.shadowOffsetX=p.offsetX.number+m,u.ctx.shadowOffsetY=p.offsetY.number,u.ctx.shadowColor=EA(p.color),u.ctx.shadowBlur=p.blur.number,u.ctx.fillStyle=p.inset?EA(p.color):"rgba(0,0,0,1)",u.ctx.fill(),u.ctx.restore()}),h.label=2;case 2:a=0,o=0,l=r,h.label=3;case 3:return o<l.length?(c=l[o],c.style!==0&&!hn(c.color)&&c.width>0?c.style!==2?[3,5]:[4,this.renderDashedDottedBorder(c.color,c.width,a,A.curves,2)]:[3,11]):[3,13];case 4:return h.sent(),[3,11];case 5:return c.style!==3?[3,7]:[4,this.renderDashedDottedBorder(c.color,c.width,a,A.curves,3)];case 6:return h.sent(),[3,11];case 7:return c.style!==4?[3,9]:[4,this.renderDoubleBorder(c.color,c.width,a,A.curves)];case 8:return h.sent(),[3,11];case 9:return[4,this.renderSolidBorder(c.color,a,A.curves)];case 10:h.sent(),h.label=11;case 11:a++,h.label=12;case 12:return o++,[3,3];case 13:return[2]}})})},e.prototype.renderDashedDottedBorder=function(A,t,i,r,s){return GA(this,void 0,void 0,function(){var a,o,l,c,u,h,p,g,m,d,f,v,w,C,x,U,x,U;return IA(this,function(y){return this.ctx.save(),a=y0(r,i),o=Lc(r,i),s===2&&(this.path(o),this.ctx.clip()),nt(o[0])?(l=o[0].start.x,c=o[0].start.y):(l=o[0].x,c=o[0].y),nt(o[1])?(u=o[1].end.x,h=o[1].end.y):(u=o[1].x,h=o[1].y),i===0||i===2?p=Math.abs(l-u):p=Math.abs(c-h),this.ctx.beginPath(),s===3?this.formatPath(a):this.formatPath(o.slice(0,2)),g=t<3?t*3:t*2,m=t<3?t*2:t,s===3&&(g=t,m=t),d=!0,p<=g*2?d=!1:p<=g*2+m?(f=p/(2*g+m),g*=f,m*=f):(v=Math.floor((p+m)/(g+m)),w=(p-v*g)/(v-1),C=(p-(v+1)*g)/v,m=C<=0||Math.abs(m-w)<Math.abs(m-C)?w:C),d&&(s===3?this.ctx.setLineDash([0,g+m]):this.ctx.setLineDash([g,m])),s===3?(this.ctx.lineCap="round",this.ctx.lineWidth=t):this.ctx.lineWidth=t*2+1.1,this.ctx.strokeStyle=EA(A),this.ctx.stroke(),this.ctx.setLineDash([]),s===2&&(nt(o[0])&&(x=o[3],U=o[0],this.ctx.beginPath(),this.formatPath([new de(x.end.x,x.end.y),new de(U.start.x,U.start.y)]),this.ctx.stroke()),nt(o[1])&&(x=o[1],U=o[2],this.ctx.beginPath(),this.formatPath([new de(x.end.x,x.end.y),new de(U.start.x,U.start.y)]),this.ctx.stroke())),this.ctx.restore(),[2]})})},e.prototype.render=function(A){return GA(this,void 0,void 0,function(){var t;return IA(this,function(i){switch(i.label){case 0:return this.options.backgroundColor&&(this.ctx.fillStyle=EA(this.options.backgroundColor),this.ctx.fillRect(this.options.x,this.options.y,this.options.width,this.options.height)),t=C0(A),[4,this.renderStack(t)];case 1:return i.sent(),this.applyEffects([]),[2,this.canvas]}})})},e}(vf),R0=function(n){return n instanceof nf||n instanceof tf?!0:n instanceof gl&&n.type!==Hs&&n.type!==Ds},D0=function(n,e){switch(n){case 0:return Ns(e);case 2:return m0(e);case 1:default:return Gs(e)}},H0=function(n){switch(n){case 1:return"center";case 2:return"right";case 0:default:return"left"}},P0=["-apple-system","system-ui"],O0=function(n){return/iPhone OS 15_(0|1)/.test(window.navigator.userAgent)?n.filter(function(e){return P0.indexOf(e)===-1}):n},N0=function(n){_t(e,n);function e(A,t){var i=n.call(this,A,t)||this;return i.canvas=t.canvas?t.canvas:document.createElement("canvas"),i.ctx=i.canvas.getContext("2d"),i.options=t,i.canvas.width=Math.floor(t.width*t.scale),i.canvas.height=Math.floor(t.height*t.scale),i.canvas.style.width=t.width+"px",i.canvas.style.height=t.height+"px",i.ctx.scale(i.options.scale,i.options.scale),i.ctx.translate(-t.x,-t.y),i.context.logger.debug("EXPERIMENTAL ForeignObject renderer initialized ("+t.width+"x"+t.height+" at "+t.x+","+t.y+") with scale "+t.scale),i}return e.prototype.render=function(A){return GA(this,void 0,void 0,function(){var t,i;return IA(this,function(r){switch(r.label){case 0:return t=ko(this.options.width*this.options.scale,this.options.height*this.options.scale,this.options.scale,this.options.scale,A),[4,G0(t)];case 1:return i=r.sent(),this.options.backgroundColor&&(this.ctx.fillStyle=EA(this.options.backgroundColor),this.ctx.fillRect(0,0,this.options.width*this.options.scale,this.options.height*this.options.scale)),this.ctx.drawImage(i,-this.options.x*this.options.scale,-this.options.y*this.options.scale),[2,this.canvas]}})})},e}(vf),G0=function(n){return new Promise(function(e,A){var t=new Image;t.onload=function(){e(t)},t.onerror=A,t.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(new XMLSerializer().serializeToString(n))})},V0=function(){function n(e){var A=e.id,t=e.enabled;this.id=A,this.enabled=t,this.start=Date.now()}return n.prototype.debug=function(){for(var e=[],A=0;A<arguments.length;A++)e[A]=arguments[A];this.enabled&&(typeof window<"u"&&window.console&&typeof console.debug=="function"?console.debug.apply(console,Rr([this.id,this.getTime()+"ms"],e)):this.info.apply(this,e))},n.prototype.getTime=function(){return Date.now()-this.start},n.prototype.info=function(){for(var e=[],A=0;A<arguments.length;A++)e[A]=arguments[A];this.enabled&&typeof window<"u"&&window.console&&typeof console.info=="function"&&console.info.apply(console,Rr([this.id,this.getTime()+"ms"],e))},n.prototype.warn=function(){for(var e=[],A=0;A<arguments.length;A++)e[A]=arguments[A];this.enabled&&(typeof window<"u"&&window.console&&typeof console.warn=="function"?console.warn.apply(console,Rr([this.id,this.getTime()+"ms"],e)):this.info.apply(this,e))},n.prototype.error=function(){for(var e=[],A=0;A<arguments.length;A++)e[A]=arguments[A];this.enabled&&(typeof window<"u"&&window.console&&typeof console.error=="function"?console.error.apply(console,Rr([this.id,this.getTime()+"ms"],e)):this.info.apply(this,e))},n.instances={},n}(),K0=function(){function n(e,A){var t;this.windowBounds=A,this.instanceName="#"+n.instanceCount++,this.logger=new V0({id:this.instanceName,enabled:e.logging}),this.cache=(t=e.cache)!==null&&t!==void 0?t:new l0(this,e)}return n.instanceCount=1,n}(),Ef=function(n,e){return e===void 0&&(e={}),k0(n,e)};typeof window<"u"&&pf.setContext(window);var k0=function(n,e){return GA(void 0,void 0,void 0,function(){var A,t,i,r,s,a,o,l,c,u,h,p,g,m,d,f,v,w,C,x,y,U,y,R,B,M,z,J,Y,T,N,X,K,ee,Z,q,Q,O,le,he;return IA(this,function(fe){switch(fe.label){case 0:if(!n||typeof n!="object")return[2,Promise.reject("Invalid element provided as first argument")];if(A=n.ownerDocument,!A)throw new Error("Element is not attached to a Document");if(t=A.defaultView,!t)throw new Error("Document is not attached to a Window");return i={allowTaint:(R=e.allowTaint)!==null&&R!==void 0?R:!1,imageTimeout:(B=e.imageTimeout)!==null&&B!==void 0?B:15e3,proxy:e.proxy,useCORS:(M=e.useCORS)!==null&&M!==void 0?M:!1},r=Fo({logging:(z=e.logging)!==null&&z!==void 0?z:!0,cache:e.cache},i),s={windowWidth:(J=e.windowWidth)!==null&&J!==void 0?J:t.innerWidth,windowHeight:(Y=e.windowHeight)!==null&&Y!==void 0?Y:t.innerHeight,scrollX:(T=e.scrollX)!==null&&T!==void 0?T:t.pageXOffset,scrollY:(N=e.scrollY)!==null&&N!==void 0?N:t.pageYOffset},a=new Wt(s.scrollX,s.scrollY,s.windowWidth,s.windowHeight),o=new K0(r,a),l=(X=e.foreignObjectRendering)!==null&&X!==void 0?X:!1,c={allowTaint:(K=e.allowTaint)!==null&&K!==void 0?K:!1,onclone:e.onclone,ignoreElements:e.ignoreElements,inlineImages:l,copyStyles:l},o.logger.debug("Starting document clone with size "+a.width+"x"+a.height+" scrolled to "+-a.left+","+-a.top),u=new Tc(o,n,c),h=u.clonedReferenceElement,h?[4,u.toIFrame(A,a)]:[2,Promise.reject("Unable to find element in cloned iframe")];case 1:return p=fe.sent(),g=ml(h)||WB(h)?Ed(h.ownerDocument):Aa(o,h),m=g.width,d=g.height,f=g.left,v=g.top,w=z0(o,h,e.backgroundColor),C={canvas:e.canvas,backgroundColor:w,scale:(Z=(ee=e.scale)!==null&&ee!==void 0?ee:t.devicePixelRatio)!==null&&Z!==void 0?Z:1,x:((q=e.x)!==null&&q!==void 0?q:0)+f,y:((Q=e.y)!==null&&Q!==void 0?Q:0)+v,width:(O=e.width)!==null&&O!==void 0?O:Math.ceil(m),height:(le=e.height)!==null&&le!==void 0?le:Math.ceil(d)},l?(o.logger.debug("Document cloned, using foreign object rendering"),y=new N0(o,C),[4,y.render(h)]):[3,3];case 2:return x=fe.sent(),[3,5];case 3:return o.logger.debug("Document cloned, element located at "+f+","+v+" with size "+m+"x"+d+" using computed rendering"),o.logger.debug("Starting DOM parsing"),U=af(o,h),w===U.styles.backgroundColor&&(U.styles.backgroundColor=zt.TRANSPARENT),o.logger.debug("Starting renderer for element at "+C.x+","+C.y+" with size "+C.width+"x"+C.height),y=new L0(o,C),[4,y.render(U)];case 4:x=fe.sent(),fe.label=5;case 5:return(!((he=e.removeContainer)!==null&&he!==void 0)||he)&&(Tc.destroy(p)||o.logger.error("Cannot detach cloned iframe as it is not in the DOM anymore")),o.logger.debug("Finished rendering"),[2,x]}})})},z0=function(n,e,A){var t=e.ownerDocument,i=t.documentElement?lr(n,getComputedStyle(t.documentElement).backgroundColor):zt.TRANSPARENT,r=t.body?lr(n,getComputedStyle(t.body).backgroundColor):zt.TRANSPARENT,s=typeof A=="string"?lr(n,A):A===null?zt.TRANSPARENT:4294967295;return e===t.documentElement?hn(i)?hn(r)?s:r:i:s};const W0=async()=>await vd(()=>import("./imprint-gen-3e61d80c.js"),[]),X0='<hr><p style="opacity: 1.0;">Dieses Impressum wurde erstellt durch <a href="https://www.impressum-generator.de" rel="nofollow">impressum-generator.de</a>.</p>',Y0=`<hr><div class="center" width=100%>
<button id="hide-imprint" onclick="document.body.dispatchEvent(new Event('${ae.HIDE_IMPRINT.toString()}', { bubbles: true }))">Close</button></div>`;class J0{constructor(){window.addEventListener("resize",()=>this.redraw()),new mh(document.body,()=>this.redraw()),document.body.addEventListener(ae.SHOW_IMPRINT.toString(),e=>this.show()),document.body.addEventListener(ae.HIDE_IMPRINT.toString(),e=>this.hide()),document.body.addEventListener("keydown",e=>{(e.key==="Esc"||e.key==="Escape")&&this.hide()})}redraw(){this.div!==void 0&&(this.hide(),this.show())}async isAvailable(){const e=await W0();return this.decryptedAES=e.decryptedAES,this.decryptedAES()!==void 0}show(){if(this.div===void 0){this.div=document.createElement("div");const e=this.div;e.classList.add("imprint"),e.innerHTML=this.decryptedAES(),document.body.appendChild(e);const A=window.getComputedStyle(document.body),t=e.scrollWidth,i=e.scrollHeight,r=A.getPropertyValue("background-color");Ef(e,{backgroundColor:r,windowWidth:t,windowHeight:i}).then(s=>{s.classList.add("padding"),e.innerHTML="",e.appendChild(s);const a=document.createElement("p");a.classList.add("padding"),a.innerHTML=X0+Y0,e.appendChild(a)})}}hide(){this.div!==void 0&&(document.body.removeChild(this.div),this.div=void 0)}}const Dc="toggle",q0="div",ka="clicked",Z0="-div",za="-icon",Hc="show";var yi,Si,xr;class Cf{constructor(e){ke(this,yi,void 0);ke(this,Si,[]);ke(this,xr,void 0);be(this,xr,e.event),be(this,Si,e.icons);const A=document.createElement(q0);A.classList.add(`${Dc}${Z0}`),A.classList.add(e.classToken);for(const i of e.icons){const r=this.createSVGElement(i,e.classToken);A.innerHTML+=r}(e.container||document.body).appendChild(A),A.addEventListener("click",()=>A.classList.add(ka)),A.addEventListener("animationend",()=>{if(A.classList.contains(ka)){A.classList.remove(ka);const i=new Event(e.event,{bubbles:!0});A.dispatchEvent(i)}}),be(this,yi,A)}show(e){var A;(A=this.icon(e))==null||A.classList.add(Hc)}toggle(){var e;for(let A=0;A<k(this,Si).length;A++)(e=this.icon(A))==null||e.classList.toggle(Hc)}icon(e){return k(this,yi).querySelector(`#${k(this,Si)[e].id}${za}`)}createSVGElement(e,A){const t=document.createElement("template");t.innerHTML=e.svg;const i=t.content.firstElementChild;return i.id=`${e.id}${za}`,i.classList.add(`${Dc}${za}`),i.classList.add(A),i.outerHTML}addOnClickListener(e){k(this,yi).addEventListener(k(this,xr),e)}}yi=new WeakMap,Si=new WeakMap,xr=new WeakMap;const j0=`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" id="settings-icon" class="toggle-icon" viewBox="0 0 24 24" width="512" height="512">
    <path d="M12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z"/>
    <path d="M21.294,13.9l-.444-.256a9.1,9.1,0,0,0,0-3.29l.444-.256a3,3,0,1,0-3-5.2l-.445.257A8.977,8.977,0,0,0,15,3.513V3A3,3,0,0,0,9,3v.513A8.977,8.977,0,0,0,6.152,5.159L5.705,4.9a3,3,0,0,0-3,5.2l.444.256a9.1,9.1,0,0,0,0,3.29l-.444.256a3,3,0,1,0,3,5.2l.445-.257A8.977,8.977,0,0,0,9,20.487V21a3,3,0,0,0,6,0v-.513a8.977,8.977,0,0,0,2.848-1.646l.447.258a3,3,0,0,0,3-5.2Zm-2.548-3.776a7.048,7.048,0,0,1,0,3.75,1,1,0,0,0,.464,1.133l1.084.626a1,1,0,0,1-1,1.733l-1.086-.628a1,1,0,0,0-1.215.165,6.984,6.984,0,0,1-3.243,1.875,1,1,0,0,0-.751.969V21a1,1,0,0,1-2,0V19.748a1,1,0,0,0-.751-.969A6.984,6.984,0,0,1,7.006,16.9a1,1,0,0,0-1.215-.165l-1.084.627a1,1,0,1,1-1-1.732l1.084-.626a1,1,0,0,0,.464-1.133,7.048,7.048,0,0,1,0-3.75A1,1,0,0,0,4.79,8.992L3.706,8.366a1,1,0,0,1,1-1.733l1.086.628A1,1,0,0,0,7.006,7.1a6.984,6.984,0,0,1,3.243-1.875A1,1,0,0,0,11,4.252V3a1,1,0,0,1,2,0V4.252a1,1,0,0,0,.751.969A6.984,6.984,0,0,1,16.994,7.1a1,1,0,0,0,1.215.165l1.084-.627a1,1,0,1,1,1,1.732l-1.084.626A1,1,0,0,0,18.746,10.125Z"/>
</svg>
`,$0={id:"open",svg:j0},e_=`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" id="settings-close-icon" class="toggle-icon" viewBox="0 0 24 24" width="512" height="512">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
</svg>`,A_={id:"close",svg:e_};var nn,Qn,rn;class t_{constructor(e){ke(this,nn,void 0);ke(this,Qn,void 0);ke(this,rn,void 0);be(this,nn,!0),be(this,Qn,new Cf({icons:[$0,A_],classToken:"settings",event:ae.SETTINGS_CHANGED})),be(this,rn,e),k(this,rn).hide(),k(this,Qn).show(k(this,nn)?0:1),k(this,Qn).addOnClickListener(()=>this.guiShowHide())}guiShowHide(){k(this,nn)?(this.toggle(),k(this,rn).show(),k(this,rn).open()):k(this,rn).$title.click()}toggle(){be(this,nn,!k(this,nn)),k(this,Qn).toggle()}}nn=new WeakMap,Qn=new WeakMap,rn=new WeakMap;const Zo=.001,n_=Zo*Zo,i_=32,Ks=["Stolen Necklace","Shader Lamp","Space Colors","Sinusoid"],te={showcase:Ks[St.STOLEN_NECKLACE],int_mode:St.STOLEN_NECKLACE,necklace:{number_of_jewels:24,configuration:13579652,string:"",show_solution_band:!0,show_solutions:!0,epsilon:.01,discrete:!0},sphere:{radius:15,segments:128,offset_octant:0,use_bad_on_sphere_check:!1,show_borsuk_ulam_proof_shape:!1},animation:{rotation_x:0,rotation_y:0,rotation_z:0,reset_speed:r_,trigger_reset:!1,run:!1},view:{stats_monitor_visible:!1,necklace_visible:!0,gauge_visible:!0,show_single_thiefs_region:!0,axes_visible:!0,mesh_visible:!1,faces_visible:!0},color:{scale_red:1,scale_green:1,scale_blue:1,alpha:1},capture:{},imprint:()=>ae.dispatchEvent(ae.SHOW_IMPRINT),radio:Ks[St.STOLEN_NECKLACE],text:void 0};var Ur,In,Mi,TA,ol,ll;const js=class js{constructor(){ke(this,Ur,void 0);ke(this,In,void 0);ke(this,Mi,void 0);ke(this,TA,void 0);ke(this,ol,void 0);ke(this,ll,void 0);be(this,TA,new cl),k(this,TA).domElement.id="gui",this.createSettingsIcon(),this.createShowHideListener(),this.createShowcaseFolder(),this.createNecklaceFolder(),this.createViewFolder(),this.createCaptureFolder()}static addRadioButtonsFolder(e,A,t,i,r=(s,a,o)=>{}){const s=e.addFolder(A);return js.addRadioButtons(s,t,i,r),s}static addRadioButtons(e,A,t,i=(r,s,a)=>{}){const r=A;A={},t.forEach((s,a)=>{const o=`option_${a}`;A[o]=r===s}),t.forEach((s,a)=>{const o=`option_${a}`;e.add(A,o).name(s).listen().onChange(()=>{for(let l in A)A[l]=o===l;i(A,o,a)})})}createSettingsIcon(){const e=new t_(k(this,TA));new mh(k(this,TA).domElement,(A,t)=>{const i=A.target;t===0&&!(i!=null&&i.classList.contains("transition"))&&(i!=null&&i.classList.contains("closed"))&&(k(this,TA).hide(),k(this,TA).close(),e.toggle())})}createShowHideListener(){window.addEventListener("keydown",e=>{(e.key==="h"||e.key==="H")&&(k(this,Mi)?k(this,TA).show():k(this,TA).hide(),be(this,Mi,!k(this,Mi)))})}createShowcaseFolder(){be(this,In,js.addRadioButtonsFolder(k(this,TA),`Showcase: ${te.radio}`,te.radio,Ks,(e,A,t)=>{te.int_mode=t,ae.dispatchEvent(ae.CREATE_SPHERE),k(this,In).title(`Showcase: ${Ks[t]}`),k(this,In).close()})),k(this,In).close()}createNecklaceFolder(){const e=k(this,TA).addFolder("Necklace");e.add(te.necklace,"number_of_jewels",0,i_,1).name("Jewels").onChange(()=>{const t=2**te.necklace.number_of_jewels-1;te.necklace.configuration=Math.min(t,te.necklace.configuration),A.min(0).max(t).setValue(te.necklace.configuration),ae.dispatchEvent(ae.UPDATE_SPHERE_MATERIAL)});const A=e.add(te.necklace,"configuration",0,2**te.necklace.number_of_jewels-1,1).name("Configuration").onChange(()=>ae.dispatchEvent(ae.SET_NECKLACE_CONFIGURATION_BY_NUMBER));e.add(te.necklace,"string").name("String").onChange(()=>ae.dispatchEvent(ae.SET_NECKLACE_CONFIGURATION_BY_STRING)),e.add(te.necklace,"discrete").name("Discrete").onChange(()=>ae.dispatchEvent(ae.UPDATE_SPHERE_MATERIAL)),e.add(te.necklace,"show_solution_band").name("Solution Band").onChange(()=>ae.dispatchEvent(ae.UPDATE_SPHERE_MATERIAL)),e.add(te.necklace,"show_solutions").name("Solutions").onChange(()=>ae.dispatchEvent(ae.UPDATE_SPHERE_MATERIAL)),e.add(te.necklace,"epsilon",0,.15).name("epsilon").onChange(()=>ae.dispatchEvent(ae.UPDATE_SPHERE_MATERIAL)),e.close()}createViewFolder(){const e=k(this,TA).addFolder("View");e.add(te.view,"show_single_thiefs_region").name("Single Thief's Area").onChange(()=>ae.dispatchEvent(ae.UPDATE_SPHERE_MATERIAL)),e.add(te.view,"axes_visible").name("Axes").onChange(()=>ae.dispatchEvent(ae.UPDATE_VISIBLE)),e.add(te.view,"mesh_visible").name("Mesh").onChange(()=>ae.dispatchEvent(ae.UPDATE_VISIBLE)),e.add(te.view,"faces_visible").name("Faces").onChange(()=>ae.dispatchEvent(ae.UPDATE_VISIBLE)),e.close(),this.createSphereSubFolder(e),this.createControlsSubFolder(e),this.createColorSubFolder(e),this.createAnimationSubFolder(e)}createSphereSubFolder(e){const A=e.addFolder("Sphere");A.add(te.sphere,"radius",1,50,1).name("Radius").onChange(()=>ae.dispatchEvent(ae.CREATE_SPHERE)),A.add(te.sphere,"offset_octant",0,5,.1).name("Octant Offset").onChange(()=>ae.dispatchEvent(ae.CREATE_SPHERE)),A.add(te.sphere,"use_bad_on_sphere_check").name("Bad Check").onChange(()=>ae.dispatchEvent(ae.UPDATE_SPHERE_MATERIAL)),A.add(te.sphere,"show_borsuk_ulam_proof_shape").name("Borsuk-Ulam Proof").onChange(()=>ae.dispatchEvent(ae.UPDATE_SPHERE_MATERIAL)),A.add(te.sphere,"segments",3,511,1).name("Segments").onChange(()=>ae.dispatchEvent(ae.CREATE_SPHERE)),A.close()}createControlsSubFolder(e){const A=e.addFolder("Other Controls");A.add(te.view,"stats_monitor_visible").name("Monitor").onChange(()=>ae.dispatchEvent(ae.UPDATE_VISIBLE)),A.add(te.view,"necklace_visible").name("Necklace").onChange(()=>ae.dispatchEvent(ae.UPDATE_VISIBLE)),A.add(te.view,"gauge_visible").name("Gauge").onChange(()=>ae.dispatchEvent(ae.UPDATE_VISIBLE)),A.close()}createColorSubFolder(e){const A=e.addFolder("Color");A.add(te.color,"scale_red",0,1).name("Red").onChange(()=>ae.dispatchEvent(ae.UPDATE_SPHERE_MATERIAL)),A.add(te.color,"scale_green",0,1).name("Green").onChange(()=>ae.dispatchEvent(ae.UPDATE_SPHERE_MATERIAL)),A.add(te.color,"scale_blue",0,1).name("Blue").onChange(()=>ae.dispatchEvent(ae.UPDATE_SPHERE_MATERIAL)),A.add(te.color,"alpha",0,1).name("Alpha").onChange(()=>ae.dispatchEvent(ae.CREATE_SPHERE)),A.close()}createAnimationSubFolder(e){const A=e.addFolder("Animation"),t=.5;A.add(te.animation,"run").name("Rotate [Hz]").listen(),A.add(te.animation,"rotation_x",-t,t,.1).name("X").listen(),A.add(te.animation,"rotation_y",-t,t,.1).name("Y").listen(),A.add(te.animation,"rotation_z",-t,t,.1).name("Z").listen(),A.add(te.animation,"reset_speed").name("Reset Rotation"),A.close()}createCaptureFolder(){const e=k(this,TA).addFolder("Screen capture");new J0().isAvailable().then(i=>{i&&k(this,TA).add(te,"imprint").name("Imprint")}),e.close(),be(this,Ur,e)}get captureFolder(){return k(this,Ur)}};Ur=new WeakMap,In=new WeakMap,Mi=new WeakMap,TA=new WeakMap,ol=new WeakMap,ll=new WeakMap;let ks=js;function r_(){te.animation.trigger_reset=!0,te.animation.run=!1,te.animation.rotation_x=0,te.animation.rotation_y=0,te.animation.rotation_z=0}const s_=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="512" height="512">
    <path d="M12,9c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3S10.35,9,12,9 M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5 S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1 s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0 c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95 c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41 L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41 s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06 c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"/>
</svg>`,a_={id:"light",svg:s_},o_=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="512" height="512">
    <path d="M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19 c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36 c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"/>
</svg>`,l_={id:"dark",svg:o_},Wa="dark",Xa="light";var Et,Fi;class c_{constructor(e){ke(this,Et,void 0);ke(this,Fi,void 0);be(this,Fi,new Cf({container:(e==null?void 0:e.container)||document.body,icons:[a_,l_],classToken:"themes",event:ae.CHANGE_THEME.toString()})),this.initTheme(),this.registerOnThemeChange(document.body)}initTheme(){be(this,Et,this.preferredTheme()),document.body.classList.add(k(this,Et)?Wa:Xa),k(this,Fi).show(k(this,Et)?0:1),ae.dispatchEvent(ae.THEME_CHANGED)}preferredTheme(){return window.matchMedia("(prefers-color-scheme: dark)").matches}registerOnThemeChange(e){e.addEventListener(ae.CHANGE_THEME.toString(),()=>{this.onThemeChange(e)})}onThemeChange(e){const A=k(this,Et)?Wa:Xa,t=k(this,Et)?Xa:Wa;e.classList.replace(A,t)||e.classList.add(t),be(this,Et,!k(this,Et)),k(this,Fi).toggle(),ae.dispatchEvent(ae.THEME_CHANGED)}}Et=new WeakMap,Fi=new WeakMap;HTMLCanvasElement.prototype.getContext=function(n){return function(e,A){return A=A||{},A.preserveDrawingBuffer=!0,n.call(this,e,A)}}(HTMLCanvasElement.prototype.getContext);const Pc=["All","Sphere","Necklace"];var bi,yr,Ti,$s,xf;class u_{constructor(e,A={all:void 0,sphere:void 0,necklace:void 0}){ke(this,$s);ke(this,bi,void 0);ke(this,yr,void 0);ke(this,Ti,void 0);be(this,bi,()=>document.body),Ll(this,$s,xf).call(this,e,A),document.addEventListener("keydown",t=>{t.altKey&&t.key==="s"&&(t.stopPropagation(),t.preventDefault(),this.capture())})}capture(e=k(this,bi)){console.log(`screenCapture ${e}`);const A=e();if(!A)throw new Error("No element to capture");setTimeout(()=>{const i=window.getComputedStyle(document.body).getPropertyValue("background-color");Ef(A,{backgroundColor:i}).then(r=>{const s=document.createElement("a");s.href=r.toDataURL(),s.download="necklace.png",s.click()})},100)}}bi=new WeakMap,yr=new WeakMap,Ti=new WeakMap,$s=new WeakSet,xf=function(e,A){be(this,yr,[A.all,A.sphere,A.necklace]);const t=e.folder,i=e.property;i.selection=Pc[0],be(this,Ti,0),be(this,bi,()=>k(this,yr)[k(this,Ti)]),i.on_capture_clicked=()=>this.capture(),ks.addRadioButtons(t,i.selection,Pc,(r,s,a)=>{be(this,Ti,a)}),t.add(i,"on_capture_clicked").name("Click or press 'alt s'")};/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Bl="158",$n={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},ei={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},h_=0,Oc=1,f_=2,Uf=1,d_=2,Vt=3,Bn=0,kA=1,gt=2,fn=0,xi=1,Nc=2,Gc=3,Vc=4,p_=5,Fn=100,g_=101,m_=102,Kc=103,kc=104,B_=200,__=201,w_=202,v_=203,jo=204,$o=205,E_=206,C_=207,x_=208,U_=209,y_=210,S_=211,M_=212,F_=213,b_=214,T_=0,Q_=1,I_=2,zs=3,L_=4,R_=5,D_=6,H_=7,yf=0,P_=1,O_=2,dn=0,N_=1,G_=2,V_=3,K_=4,k_=5,Sf=300,Hi=301,Pi=302,el=303,Al=304,ua=306,tl=1e3,mt=1001,nl=1002,VA=1003,zc=1004,Ya=1005,it=1006,z_=1007,vr=1008,pn=1009,W_=1010,X_=1011,_l=1012,Mf=1013,ln=1014,cn=1015,Er=1016,Ff=1017,bf=1018,Gn=1020,Y_=1021,Bt=1023,J_=1024,q_=1025,Vn=1026,Oi=1027,Z_=1028,Tf=1029,j_=1030,Qf=1031,If=1033,Ja=33776,qa=33777,Za=33778,ja=33779,Wc=35840,Xc=35841,Yc=35842,Jc=35843,$_=36196,qc=37492,Zc=37496,jc=37808,$c=37809,eu=37810,Au=37811,tu=37812,nu=37813,iu=37814,ru=37815,su=37816,au=37817,ou=37818,lu=37819,cu=37820,uu=37821,$a=36492,hu=36494,fu=36495,ew=36283,du=36284,pu=36285,gu=36286,Lf=3e3,Kn=3001,Aw=3200,tw=3201,nw=0,iw=1,st="",UA="srgb",Xt="srgb-linear",wl="display-p3",ha="display-p3-linear",Ws="linear",iA="srgb",Xs="rec709",Ys="p3",Ai=7680,mu=519,rw=512,sw=513,aw=514,ow=515,lw=516,cw=517,uw=518,hw=519,Bu=35044,_u="300 es",il=1035,kt=2e3,Js=2001;class Wn{addEventListener(e,A){this._listeners===void 0&&(this._listeners={});const t=this._listeners;t[e]===void 0&&(t[e]=[]),t[e].indexOf(A)===-1&&t[e].push(A)}hasEventListener(e,A){if(this._listeners===void 0)return!1;const t=this._listeners;return t[e]!==void 0&&t[e].indexOf(A)!==-1}removeEventListener(e,A){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const r=i.indexOf(A);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const t=this._listeners[e.type];if(t!==void 0){e.target=this;const i=t.slice(0);for(let r=0,s=i.length;r<s;r++)i[r].call(this,e);e.target=null}}}const FA=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let wu=1234567;const fr=Math.PI/180,Cr=180/Math.PI;function Vi(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,A=Math.random()*4294967295|0,t=Math.random()*4294967295|0;return(FA[n&255]+FA[n>>8&255]+FA[n>>16&255]+FA[n>>24&255]+"-"+FA[e&255]+FA[e>>8&255]+"-"+FA[e>>16&15|64]+FA[e>>24&255]+"-"+FA[A&63|128]+FA[A>>8&255]+"-"+FA[A>>16&255]+FA[A>>24&255]+FA[t&255]+FA[t>>8&255]+FA[t>>16&255]+FA[t>>24&255]).toLowerCase()}function RA(n,e,A){return Math.max(e,Math.min(A,n))}function vl(n,e){return(n%e+e)%e}function fw(n,e,A,t,i){return t+(n-e)*(i-t)/(A-e)}function dw(n,e,A){return n!==e?(A-n)/(e-n):0}function dr(n,e,A){return(1-A)*n+A*e}function pw(n,e,A,t){return dr(n,e,1-Math.exp(-A*t))}function gw(n,e=1){return e-Math.abs(vl(n,e*2)-e)}function mw(n,e,A){return n<=e?0:n>=A?1:(n=(n-e)/(A-e),n*n*(3-2*n))}function Bw(n,e,A){return n<=e?0:n>=A?1:(n=(n-e)/(A-e),n*n*n*(n*(n*6-15)+10))}function _w(n,e){return n+Math.floor(Math.random()*(e-n+1))}function ww(n,e){return n+Math.random()*(e-n)}function vw(n){return n*(.5-Math.random())}function Ew(n){n!==void 0&&(wu=n);let e=wu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Cw(n){return n*fr}function xw(n){return n*Cr}function rl(n){return(n&n-1)===0&&n!==0}function Uw(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function qs(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function yw(n,e,A,t,i){const r=Math.cos,s=Math.sin,a=r(A/2),o=s(A/2),l=r((e+t)/2),c=s((e+t)/2),u=r((e-t)/2),h=s((e-t)/2),p=r((t-e)/2),g=s((t-e)/2);switch(i){case"XYX":n.set(a*c,o*u,o*h,a*l);break;case"YZY":n.set(o*h,a*c,o*u,a*l);break;case"ZXZ":n.set(o*u,o*h,a*c,a*l);break;case"XZX":n.set(a*c,o*g,o*p,a*l);break;case"YXY":n.set(o*p,a*c,o*g,a*l);break;case"ZYZ":n.set(o*g,o*p,a*c,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function wi(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function PA(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Sw={DEG2RAD:fr,RAD2DEG:Cr,generateUUID:Vi,clamp:RA,euclideanModulo:vl,mapLinear:fw,inverseLerp:dw,lerp:dr,damp:pw,pingpong:gw,smoothstep:mw,smootherstep:Bw,randInt:_w,randFloat:ww,randFloatSpread:vw,seededRandom:Ew,degToRad:Cw,radToDeg:xw,isPowerOfTwo:rl,ceilPowerOfTwo:Uw,floorPowerOfTwo:qs,setQuaternionFromProperEuler:yw,normalize:PA,denormalize:wi};class Se{constructor(e=0,A=0){Se.prototype.isVector2=!0,this.x=e,this.y=A}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,A){return this.x=e,this.y=A,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,A){switch(e){case 0:this.x=A;break;case 1:this.y=A;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,A){return this.x=e.x+A.x,this.y=e.y+A.y,this}addScaledVector(e,A){return this.x+=e.x*A,this.y+=e.y*A,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,A){return this.x=e.x-A.x,this.y=e.y-A.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const A=this.x,t=this.y,i=e.elements;return this.x=i[0]*A+i[3]*t+i[6],this.y=i[1]*A+i[4]*t+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,A){return this.x=Math.max(e.x,Math.min(A.x,this.x)),this.y=Math.max(e.y,Math.min(A.y,this.y)),this}clampScalar(e,A){return this.x=Math.max(e,Math.min(A,this.x)),this.y=Math.max(e,Math.min(A,this.y)),this}clampLength(e,A){const t=this.length();return this.divideScalar(t||1).multiplyScalar(Math.max(e,Math.min(A,t)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const A=Math.sqrt(this.lengthSq()*e.lengthSq());if(A===0)return Math.PI/2;const t=this.dot(e)/A;return Math.acos(RA(t,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const A=this.x-e.x,t=this.y-e.y;return A*A+t*t}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,A){return this.x+=(e.x-this.x)*A,this.y+=(e.y-this.y)*A,this}lerpVectors(e,A,t){return this.x=e.x+(A.x-e.x)*t,this.y=e.y+(A.y-e.y)*t,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,A=0){return this.x=e[A],this.y=e[A+1],this}toArray(e=[],A=0){return e[A]=this.x,e[A+1]=this.y,e}fromBufferAttribute(e,A){return this.x=e.getX(A),this.y=e.getY(A),this}rotateAround(e,A){const t=Math.cos(A),i=Math.sin(A),r=this.x-e.x,s=this.y-e.y;return this.x=r*t-s*i+e.x,this.y=r*i+s*t+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ze{constructor(e,A,t,i,r,s,a,o,l){ze.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,A,t,i,r,s,a,o,l)}set(e,A,t,i,r,s,a,o,l){const c=this.elements;return c[0]=e,c[1]=i,c[2]=a,c[3]=A,c[4]=r,c[5]=o,c[6]=t,c[7]=s,c[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const A=this.elements,t=e.elements;return A[0]=t[0],A[1]=t[1],A[2]=t[2],A[3]=t[3],A[4]=t[4],A[5]=t[5],A[6]=t[6],A[7]=t[7],A[8]=t[8],this}extractBasis(e,A,t){return e.setFromMatrix3Column(this,0),A.setFromMatrix3Column(this,1),t.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const A=e.elements;return this.set(A[0],A[4],A[8],A[1],A[5],A[9],A[2],A[6],A[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,A){const t=e.elements,i=A.elements,r=this.elements,s=t[0],a=t[3],o=t[6],l=t[1],c=t[4],u=t[7],h=t[2],p=t[5],g=t[8],m=i[0],d=i[3],f=i[6],v=i[1],w=i[4],C=i[7],x=i[2],U=i[5],y=i[8];return r[0]=s*m+a*v+o*x,r[3]=s*d+a*w+o*U,r[6]=s*f+a*C+o*y,r[1]=l*m+c*v+u*x,r[4]=l*d+c*w+u*U,r[7]=l*f+c*C+u*y,r[2]=h*m+p*v+g*x,r[5]=h*d+p*w+g*U,r[8]=h*f+p*C+g*y,this}multiplyScalar(e){const A=this.elements;return A[0]*=e,A[3]*=e,A[6]*=e,A[1]*=e,A[4]*=e,A[7]*=e,A[2]*=e,A[5]*=e,A[8]*=e,this}determinant(){const e=this.elements,A=e[0],t=e[1],i=e[2],r=e[3],s=e[4],a=e[5],o=e[6],l=e[7],c=e[8];return A*s*c-A*a*l-t*r*c+t*a*o+i*r*l-i*s*o}invert(){const e=this.elements,A=e[0],t=e[1],i=e[2],r=e[3],s=e[4],a=e[5],o=e[6],l=e[7],c=e[8],u=c*s-a*l,h=a*o-c*r,p=l*r-s*o,g=A*u+t*h+i*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const m=1/g;return e[0]=u*m,e[1]=(i*l-c*t)*m,e[2]=(a*t-i*s)*m,e[3]=h*m,e[4]=(c*A-i*o)*m,e[5]=(i*r-a*A)*m,e[6]=p*m,e[7]=(t*o-l*A)*m,e[8]=(s*A-t*r)*m,this}transpose(){let e;const A=this.elements;return e=A[1],A[1]=A[3],A[3]=e,e=A[2],A[2]=A[6],A[6]=e,e=A[5],A[5]=A[7],A[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const A=this.elements;return e[0]=A[0],e[1]=A[3],e[2]=A[6],e[3]=A[1],e[4]=A[4],e[5]=A[7],e[6]=A[2],e[7]=A[5],e[8]=A[8],this}setUvTransform(e,A,t,i,r,s,a){const o=Math.cos(r),l=Math.sin(r);return this.set(t*o,t*l,-t*(o*s+l*a)+s+e,-i*l,i*o,-i*(-l*s+o*a)+a+A,0,0,1),this}scale(e,A){return this.premultiply(eo.makeScale(e,A)),this}rotate(e){return this.premultiply(eo.makeRotation(-e)),this}translate(e,A){return this.premultiply(eo.makeTranslation(e,A)),this}makeTranslation(e,A){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,A,0,0,1),this}makeRotation(e){const A=Math.cos(e),t=Math.sin(e);return this.set(A,-t,0,t,A,0,0,0,1),this}makeScale(e,A){return this.set(e,0,0,0,A,0,0,0,1),this}equals(e){const A=this.elements,t=e.elements;for(let i=0;i<9;i++)if(A[i]!==t[i])return!1;return!0}fromArray(e,A=0){for(let t=0;t<9;t++)this.elements[t]=e[t+A];return this}toArray(e=[],A=0){const t=this.elements;return e[A]=t[0],e[A+1]=t[1],e[A+2]=t[2],e[A+3]=t[3],e[A+4]=t[4],e[A+5]=t[5],e[A+6]=t[6],e[A+7]=t[7],e[A+8]=t[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const eo=new ze;function Rf(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Zs(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Mw(){const n=Zs("canvas");return n.style.display="block",n}const vu={};function pr(n){n in vu||(vu[n]=!0,console.warn(n))}const Eu=new ze().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Cu=new ze().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),is={[Xt]:{transfer:Ws,primaries:Xs,toReference:n=>n,fromReference:n=>n},[UA]:{transfer:iA,primaries:Xs,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[ha]:{transfer:Ws,primaries:Ys,toReference:n=>n.applyMatrix3(Cu),fromReference:n=>n.applyMatrix3(Eu)},[wl]:{transfer:iA,primaries:Ys,toReference:n=>n.convertSRGBToLinear().applyMatrix3(Cu),fromReference:n=>n.applyMatrix3(Eu).convertLinearToSRGB()}},Fw=new Set([Xt,ha]),$e={enabled:!0,_workingColorSpace:Xt,get legacyMode(){return console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),!this.enabled},set legacyMode(n){console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),this.enabled=!n},get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!Fw.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,A){if(this.enabled===!1||e===A||!e||!A)return n;const t=is[e].toReference,i=is[A].fromReference;return i(t(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return is[n].primaries},getTransfer:function(n){return n===st?Ws:is[n].transfer}};function Ui(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ao(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ti;class Df{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let A;if(e instanceof HTMLCanvasElement)A=e;else{ti===void 0&&(ti=Zs("canvas")),ti.width=e.width,ti.height=e.height;const t=ti.getContext("2d");e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),A=ti}return A.width>2048||A.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),A.toDataURL("image/jpeg",.6)):A.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const A=Zs("canvas");A.width=e.width,A.height=e.height;const t=A.getContext("2d");t.drawImage(e,0,0,e.width,e.height);const i=t.getImageData(0,0,e.width,e.height),r=i.data;for(let s=0;s<r.length;s++)r[s]=Ui(r[s]/255)*255;return t.putImageData(i,0,0),A}else if(e.data){const A=e.data.slice(0);for(let t=0;t<A.length;t++)A instanceof Uint8Array||A instanceof Uint8ClampedArray?A[t]=Math.floor(Ui(A[t]/255)*255):A[t]=Ui(A[t]);return{data:A,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let bw=0;class Hf{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:bw++}),this.uuid=Vi(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const A=e===void 0||typeof e=="string";if(!A&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const t={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let s=0,a=i.length;s<a;s++)i[s].isDataTexture?r.push(to(i[s].image)):r.push(to(i[s]))}else r=to(i);t.url=r}return A||(e.images[this.uuid]=t),t}}function to(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Df.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Tw=0;class jA extends Wn{constructor(e=jA.DEFAULT_IMAGE,A=jA.DEFAULT_MAPPING,t=mt,i=mt,r=it,s=vr,a=Bt,o=pn,l=jA.DEFAULT_ANISOTROPY,c=st){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Tw++}),this.uuid=Vi(),this.name="",this.source=new Hf(e),this.mipmaps=[],this.mapping=A,this.channel=0,this.wrapS=t,this.wrapT=i,this.magFilter=r,this.minFilter=s,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=o,this.offset=new Se(0,0),this.repeat=new Se(1,1),this.center=new Se(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof c=="string"?this.colorSpace=c:(pr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=c===Kn?UA:st),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const A=e===void 0||typeof e=="string";if(!A&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const t={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(t.userData=this.userData),A||(e.textures[this.uuid]=t),t}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Sf)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case tl:e.x=e.x-Math.floor(e.x);break;case mt:e.x=e.x<0?0:1;break;case nl:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case tl:e.y=e.y-Math.floor(e.y);break;case mt:e.y=e.y<0?0:1;break;case nl:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return pr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===UA?Kn:Lf}set encoding(e){pr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Kn?UA:st}}jA.DEFAULT_IMAGE=null;jA.DEFAULT_MAPPING=Sf;jA.DEFAULT_ANISOTROPY=1;class SA{constructor(e=0,A=0,t=0,i=1){SA.prototype.isVector4=!0,this.x=e,this.y=A,this.z=t,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,A,t,i){return this.x=e,this.y=A,this.z=t,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,A){switch(e){case 0:this.x=A;break;case 1:this.y=A;break;case 2:this.z=A;break;case 3:this.w=A;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,A){return this.x=e.x+A.x,this.y=e.y+A.y,this.z=e.z+A.z,this.w=e.w+A.w,this}addScaledVector(e,A){return this.x+=e.x*A,this.y+=e.y*A,this.z+=e.z*A,this.w+=e.w*A,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,A){return this.x=e.x-A.x,this.y=e.y-A.y,this.z=e.z-A.z,this.w=e.w-A.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const A=this.x,t=this.y,i=this.z,r=this.w,s=e.elements;return this.x=s[0]*A+s[4]*t+s[8]*i+s[12]*r,this.y=s[1]*A+s[5]*t+s[9]*i+s[13]*r,this.z=s[2]*A+s[6]*t+s[10]*i+s[14]*r,this.w=s[3]*A+s[7]*t+s[11]*i+s[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const A=Math.sqrt(1-e.w*e.w);return A<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/A,this.y=e.y/A,this.z=e.z/A),this}setAxisAngleFromRotationMatrix(e){let A,t,i,r;const o=e.elements,l=o[0],c=o[4],u=o[8],h=o[1],p=o[5],g=o[9],m=o[2],d=o[6],f=o[10];if(Math.abs(c-h)<.01&&Math.abs(u-m)<.01&&Math.abs(g-d)<.01){if(Math.abs(c+h)<.1&&Math.abs(u+m)<.1&&Math.abs(g+d)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;A=Math.PI;const w=(l+1)/2,C=(p+1)/2,x=(f+1)/2,U=(c+h)/4,y=(u+m)/4,R=(g+d)/4;return w>C&&w>x?w<.01?(t=0,i=.707106781,r=.707106781):(t=Math.sqrt(w),i=U/t,r=y/t):C>x?C<.01?(t=.707106781,i=0,r=.707106781):(i=Math.sqrt(C),t=U/i,r=R/i):x<.01?(t=.707106781,i=.707106781,r=0):(r=Math.sqrt(x),t=y/r,i=R/r),this.set(t,i,r,A),this}let v=Math.sqrt((d-g)*(d-g)+(u-m)*(u-m)+(h-c)*(h-c));return Math.abs(v)<.001&&(v=1),this.x=(d-g)/v,this.y=(u-m)/v,this.z=(h-c)/v,this.w=Math.acos((l+p+f-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,A){return this.x=Math.max(e.x,Math.min(A.x,this.x)),this.y=Math.max(e.y,Math.min(A.y,this.y)),this.z=Math.max(e.z,Math.min(A.z,this.z)),this.w=Math.max(e.w,Math.min(A.w,this.w)),this}clampScalar(e,A){return this.x=Math.max(e,Math.min(A,this.x)),this.y=Math.max(e,Math.min(A,this.y)),this.z=Math.max(e,Math.min(A,this.z)),this.w=Math.max(e,Math.min(A,this.w)),this}clampLength(e,A){const t=this.length();return this.divideScalar(t||1).multiplyScalar(Math.max(e,Math.min(A,t)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,A){return this.x+=(e.x-this.x)*A,this.y+=(e.y-this.y)*A,this.z+=(e.z-this.z)*A,this.w+=(e.w-this.w)*A,this}lerpVectors(e,A,t){return this.x=e.x+(A.x-e.x)*t,this.y=e.y+(A.y-e.y)*t,this.z=e.z+(A.z-e.z)*t,this.w=e.w+(A.w-e.w)*t,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,A=0){return this.x=e[A],this.y=e[A+1],this.z=e[A+2],this.w=e[A+3],this}toArray(e=[],A=0){return e[A]=this.x,e[A+1]=this.y,e[A+2]=this.z,e[A+3]=this.w,e}fromBufferAttribute(e,A){return this.x=e.getX(A),this.y=e.getY(A),this.z=e.getZ(A),this.w=e.getW(A),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Qw extends Wn{constructor(e=1,A=1,t={}){super(),this.isRenderTarget=!0,this.width=e,this.height=A,this.depth=1,this.scissor=new SA(0,0,e,A),this.scissorTest=!1,this.viewport=new SA(0,0,e,A);const i={width:e,height:A,depth:1};t.encoding!==void 0&&(pr("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Kn?UA:st),t=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:it,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},t),this.texture=new jA(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=t.generateMipmaps,this.texture.internalFormat=t.internalFormat,this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.depthTexture=t.depthTexture,this.samples=t.samples}setSize(e,A,t=1){(this.width!==e||this.height!==A||this.depth!==t)&&(this.width=e,this.height=A,this.depth=t,this.texture.image.width=e,this.texture.image.height=A,this.texture.image.depth=t,this.dispose()),this.viewport.set(0,0,e,A),this.scissor.set(0,0,e,A)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const A=Object.assign({},e.texture.image);return this.texture.source=new Hf(A),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class kn extends Qw{constructor(e=1,A=1,t={}){super(e,A,t),this.isWebGLRenderTarget=!0}}class Pf extends jA{constructor(e=null,A=1,t=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:A,height:t,depth:i},this.magFilter=VA,this.minFilter=VA,this.wrapR=mt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Iw extends jA{constructor(e=null,A=1,t=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:A,height:t,depth:i},this.magFilter=VA,this.minFilter=VA,this.wrapR=mt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class zn{constructor(e=0,A=0,t=0,i=1){this.isQuaternion=!0,this._x=e,this._y=A,this._z=t,this._w=i}static slerpFlat(e,A,t,i,r,s,a){let o=t[i+0],l=t[i+1],c=t[i+2],u=t[i+3];const h=r[s+0],p=r[s+1],g=r[s+2],m=r[s+3];if(a===0){e[A+0]=o,e[A+1]=l,e[A+2]=c,e[A+3]=u;return}if(a===1){e[A+0]=h,e[A+1]=p,e[A+2]=g,e[A+3]=m;return}if(u!==m||o!==h||l!==p||c!==g){let d=1-a;const f=o*h+l*p+c*g+u*m,v=f>=0?1:-1,w=1-f*f;if(w>Number.EPSILON){const x=Math.sqrt(w),U=Math.atan2(x,f*v);d=Math.sin(d*U)/x,a=Math.sin(a*U)/x}const C=a*v;if(o=o*d+h*C,l=l*d+p*C,c=c*d+g*C,u=u*d+m*C,d===1-a){const x=1/Math.sqrt(o*o+l*l+c*c+u*u);o*=x,l*=x,c*=x,u*=x}}e[A]=o,e[A+1]=l,e[A+2]=c,e[A+3]=u}static multiplyQuaternionsFlat(e,A,t,i,r,s){const a=t[i],o=t[i+1],l=t[i+2],c=t[i+3],u=r[s],h=r[s+1],p=r[s+2],g=r[s+3];return e[A]=a*g+c*u+o*p-l*h,e[A+1]=o*g+c*h+l*u-a*p,e[A+2]=l*g+c*p+a*h-o*u,e[A+3]=c*g-a*u-o*h-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,A,t,i){return this._x=e,this._y=A,this._z=t,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,A){const t=e._x,i=e._y,r=e._z,s=e._order,a=Math.cos,o=Math.sin,l=a(t/2),c=a(i/2),u=a(r/2),h=o(t/2),p=o(i/2),g=o(r/2);switch(s){case"XYZ":this._x=h*c*u+l*p*g,this._y=l*p*u-h*c*g,this._z=l*c*g+h*p*u,this._w=l*c*u-h*p*g;break;case"YXZ":this._x=h*c*u+l*p*g,this._y=l*p*u-h*c*g,this._z=l*c*g-h*p*u,this._w=l*c*u+h*p*g;break;case"ZXY":this._x=h*c*u-l*p*g,this._y=l*p*u+h*c*g,this._z=l*c*g+h*p*u,this._w=l*c*u-h*p*g;break;case"ZYX":this._x=h*c*u-l*p*g,this._y=l*p*u+h*c*g,this._z=l*c*g-h*p*u,this._w=l*c*u+h*p*g;break;case"YZX":this._x=h*c*u+l*p*g,this._y=l*p*u+h*c*g,this._z=l*c*g-h*p*u,this._w=l*c*u-h*p*g;break;case"XZY":this._x=h*c*u-l*p*g,this._y=l*p*u-h*c*g,this._z=l*c*g+h*p*u,this._w=l*c*u+h*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s)}return A!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,A){const t=A/2,i=Math.sin(t);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(t),this._onChangeCallback(),this}setFromRotationMatrix(e){const A=e.elements,t=A[0],i=A[4],r=A[8],s=A[1],a=A[5],o=A[9],l=A[2],c=A[6],u=A[10],h=t+a+u;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(c-o)*p,this._y=(r-l)*p,this._z=(s-i)*p}else if(t>a&&t>u){const p=2*Math.sqrt(1+t-a-u);this._w=(c-o)/p,this._x=.25*p,this._y=(i+s)/p,this._z=(r+l)/p}else if(a>u){const p=2*Math.sqrt(1+a-t-u);this._w=(r-l)/p,this._x=(i+s)/p,this._y=.25*p,this._z=(o+c)/p}else{const p=2*Math.sqrt(1+u-t-a);this._w=(s-i)/p,this._x=(r+l)/p,this._y=(o+c)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,A){let t=e.dot(A)+1;return t<Number.EPSILON?(t=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=t):(this._x=0,this._y=-e.z,this._z=e.y,this._w=t)):(this._x=e.y*A.z-e.z*A.y,this._y=e.z*A.x-e.x*A.z,this._z=e.x*A.y-e.y*A.x,this._w=t),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(RA(this.dot(e),-1,1)))}rotateTowards(e,A){const t=this.angleTo(e);if(t===0)return this;const i=Math.min(1,A/t);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,A){const t=e._x,i=e._y,r=e._z,s=e._w,a=A._x,o=A._y,l=A._z,c=A._w;return this._x=t*c+s*a+i*l-r*o,this._y=i*c+s*o+r*a-t*l,this._z=r*c+s*l+t*o-i*a,this._w=s*c-t*a-i*o-r*l,this._onChangeCallback(),this}slerp(e,A){if(A===0)return this;if(A===1)return this.copy(e);const t=this._x,i=this._y,r=this._z,s=this._w;let a=s*e._w+t*e._x+i*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=s,this._x=t,this._y=i,this._z=r,this;const o=1-a*a;if(o<=Number.EPSILON){const p=1-A;return this._w=p*s+A*this._w,this._x=p*t+A*this._x,this._y=p*i+A*this._y,this._z=p*r+A*this._z,this.normalize(),this._onChangeCallback(),this}const l=Math.sqrt(o),c=Math.atan2(l,a),u=Math.sin((1-A)*c)/l,h=Math.sin(A*c)/l;return this._w=s*u+this._w*h,this._x=t*u+this._x*h,this._y=i*u+this._y*h,this._z=r*u+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,A,t){return this.copy(e).slerp(A,t)}random(){const e=Math.random(),A=Math.sqrt(1-e),t=Math.sqrt(e),i=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(A*Math.cos(i),t*Math.sin(r),t*Math.cos(r),A*Math.sin(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,A=0){return this._x=e[A],this._y=e[A+1],this._z=e[A+2],this._w=e[A+3],this._onChangeCallback(),this}toArray(e=[],A=0){return e[A]=this._x,e[A+1]=this._y,e[A+2]=this._z,e[A+3]=this._w,e}fromBufferAttribute(e,A){return this._x=e.getX(A),this._y=e.getY(A),this._z=e.getZ(A),this._w=e.getW(A),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(e=0,A=0,t=0){I.prototype.isVector3=!0,this.x=e,this.y=A,this.z=t}set(e,A,t){return t===void 0&&(t=this.z),this.x=e,this.y=A,this.z=t,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,A){switch(e){case 0:this.x=A;break;case 1:this.y=A;break;case 2:this.z=A;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,A){return this.x=e.x+A.x,this.y=e.y+A.y,this.z=e.z+A.z,this}addScaledVector(e,A){return this.x+=e.x*A,this.y+=e.y*A,this.z+=e.z*A,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,A){return this.x=e.x-A.x,this.y=e.y-A.y,this.z=e.z-A.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,A){return this.x=e.x*A.x,this.y=e.y*A.y,this.z=e.z*A.z,this}applyEuler(e){return this.applyQuaternion(xu.setFromEuler(e))}applyAxisAngle(e,A){return this.applyQuaternion(xu.setFromAxisAngle(e,A))}applyMatrix3(e){const A=this.x,t=this.y,i=this.z,r=e.elements;return this.x=r[0]*A+r[3]*t+r[6]*i,this.y=r[1]*A+r[4]*t+r[7]*i,this.z=r[2]*A+r[5]*t+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const A=this.x,t=this.y,i=this.z,r=e.elements,s=1/(r[3]*A+r[7]*t+r[11]*i+r[15]);return this.x=(r[0]*A+r[4]*t+r[8]*i+r[12])*s,this.y=(r[1]*A+r[5]*t+r[9]*i+r[13])*s,this.z=(r[2]*A+r[6]*t+r[10]*i+r[14])*s,this}applyQuaternion(e){const A=this.x,t=this.y,i=this.z,r=e.x,s=e.y,a=e.z,o=e.w,l=2*(s*i-a*t),c=2*(a*A-r*i),u=2*(r*t-s*A);return this.x=A+o*l+s*u-a*c,this.y=t+o*c+a*l-r*u,this.z=i+o*u+r*c-s*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const A=this.x,t=this.y,i=this.z,r=e.elements;return this.x=r[0]*A+r[4]*t+r[8]*i,this.y=r[1]*A+r[5]*t+r[9]*i,this.z=r[2]*A+r[6]*t+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,A){return this.x=Math.max(e.x,Math.min(A.x,this.x)),this.y=Math.max(e.y,Math.min(A.y,this.y)),this.z=Math.max(e.z,Math.min(A.z,this.z)),this}clampScalar(e,A){return this.x=Math.max(e,Math.min(A,this.x)),this.y=Math.max(e,Math.min(A,this.y)),this.z=Math.max(e,Math.min(A,this.z)),this}clampLength(e,A){const t=this.length();return this.divideScalar(t||1).multiplyScalar(Math.max(e,Math.min(A,t)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,A){return this.x+=(e.x-this.x)*A,this.y+=(e.y-this.y)*A,this.z+=(e.z-this.z)*A,this}lerpVectors(e,A,t){return this.x=e.x+(A.x-e.x)*t,this.y=e.y+(A.y-e.y)*t,this.z=e.z+(A.z-e.z)*t,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,A){const t=e.x,i=e.y,r=e.z,s=A.x,a=A.y,o=A.z;return this.x=i*o-r*a,this.y=r*s-t*o,this.z=t*a-i*s,this}projectOnVector(e){const A=e.lengthSq();if(A===0)return this.set(0,0,0);const t=e.dot(this)/A;return this.copy(e).multiplyScalar(t)}projectOnPlane(e){return no.copy(this).projectOnVector(e),this.sub(no)}reflect(e){return this.sub(no.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const A=Math.sqrt(this.lengthSq()*e.lengthSq());if(A===0)return Math.PI/2;const t=this.dot(e)/A;return Math.acos(RA(t,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const A=this.x-e.x,t=this.y-e.y,i=this.z-e.z;return A*A+t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,A,t){const i=Math.sin(A)*e;return this.x=i*Math.sin(t),this.y=Math.cos(A)*e,this.z=i*Math.cos(t),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,A,t){return this.x=e*Math.sin(A),this.y=t,this.z=e*Math.cos(A),this}setFromMatrixPosition(e){const A=e.elements;return this.x=A[12],this.y=A[13],this.z=A[14],this}setFromMatrixScale(e){const A=this.setFromMatrixColumn(e,0).length(),t=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=A,this.y=t,this.z=i,this}setFromMatrixColumn(e,A){return this.fromArray(e.elements,A*4)}setFromMatrix3Column(e,A){return this.fromArray(e.elements,A*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,A=0){return this.x=e[A],this.y=e[A+1],this.z=e[A+2],this}toArray(e=[],A=0){return e[A]=this.x,e[A+1]=this.y,e[A+2]=this.z,e}fromBufferAttribute(e,A){return this.x=e.getX(A),this.y=e.getY(A),this.z=e.getZ(A),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,A=Math.random()*Math.PI*2,t=Math.sqrt(1-e**2);return this.x=t*Math.cos(A),this.y=t*Math.sin(A),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const no=new I,xu=new zn;class br{constructor(e=new I(1/0,1/0,1/0),A=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=A}set(e,A){return this.min.copy(e),this.max.copy(A),this}setFromArray(e){this.makeEmpty();for(let A=0,t=e.length;A<t;A+=3)this.expandByPoint(lt.fromArray(e,A));return this}setFromBufferAttribute(e){this.makeEmpty();for(let A=0,t=e.count;A<t;A++)this.expandByPoint(lt.fromBufferAttribute(e,A));return this}setFromPoints(e){this.makeEmpty();for(let A=0,t=e.length;A<t;A++)this.expandByPoint(e[A]);return this}setFromCenterAndSize(e,A){const t=lt.copy(A).multiplyScalar(.5);return this.min.copy(e).sub(t),this.max.copy(e).add(t),this}setFromObject(e,A=!1){return this.makeEmpty(),this.expandByObject(e,A)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,A=!1){e.updateWorldMatrix(!1,!1);const t=e.geometry;if(t!==void 0){const r=t.getAttribute("position");if(A===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let s=0,a=r.count;s<a;s++)e.isMesh===!0?e.getVertexPosition(s,lt):lt.fromBufferAttribute(r,s),lt.applyMatrix4(e.matrixWorld),this.expandByPoint(lt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),rs.copy(e.boundingBox)):(t.boundingBox===null&&t.computeBoundingBox(),rs.copy(t.boundingBox)),rs.applyMatrix4(e.matrixWorld),this.union(rs)}const i=e.children;for(let r=0,s=i.length;r<s;r++)this.expandByObject(i[r],A);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,A){return A.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,lt),lt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let A,t;return e.normal.x>0?(A=e.normal.x*this.min.x,t=e.normal.x*this.max.x):(A=e.normal.x*this.max.x,t=e.normal.x*this.min.x),e.normal.y>0?(A+=e.normal.y*this.min.y,t+=e.normal.y*this.max.y):(A+=e.normal.y*this.max.y,t+=e.normal.y*this.min.y),e.normal.z>0?(A+=e.normal.z*this.min.z,t+=e.normal.z*this.max.z):(A+=e.normal.z*this.max.z,t+=e.normal.z*this.min.z),A<=-e.constant&&t>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ji),ss.subVectors(this.max,Ji),ni.subVectors(e.a,Ji),ii.subVectors(e.b,Ji),ri.subVectors(e.c,Ji),Yt.subVectors(ii,ni),Jt.subVectors(ri,ii),Cn.subVectors(ni,ri);let A=[0,-Yt.z,Yt.y,0,-Jt.z,Jt.y,0,-Cn.z,Cn.y,Yt.z,0,-Yt.x,Jt.z,0,-Jt.x,Cn.z,0,-Cn.x,-Yt.y,Yt.x,0,-Jt.y,Jt.x,0,-Cn.y,Cn.x,0];return!io(A,ni,ii,ri,ss)||(A=[1,0,0,0,1,0,0,0,1],!io(A,ni,ii,ri,ss))?!1:(as.crossVectors(Yt,Jt),A=[as.x,as.y,as.z],io(A,ni,ii,ri,ss))}clampPoint(e,A){return A.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,lt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(lt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ht[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ht[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ht[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ht[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ht[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ht[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ht[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ht[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ht),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Ht=[new I,new I,new I,new I,new I,new I,new I,new I],lt=new I,rs=new br,ni=new I,ii=new I,ri=new I,Yt=new I,Jt=new I,Cn=new I,Ji=new I,ss=new I,as=new I,xn=new I;function io(n,e,A,t,i){for(let r=0,s=n.length-3;r<=s;r+=3){xn.fromArray(n,r);const a=i.x*Math.abs(xn.x)+i.y*Math.abs(xn.y)+i.z*Math.abs(xn.z),o=e.dot(xn),l=A.dot(xn),c=t.dot(xn);if(Math.max(-Math.max(o,l,c),Math.min(o,l,c))>a)return!1}return!0}const Lw=new br,qi=new I,ro=new I;let fa=class{constructor(e=new I,A=-1){this.center=e,this.radius=A}set(e,A){return this.center.copy(e),this.radius=A,this}setFromPoints(e,A){const t=this.center;A!==void 0?t.copy(A):Lw.setFromPoints(e).getCenter(t);let i=0;for(let r=0,s=e.length;r<s;r++)i=Math.max(i,t.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const A=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=A*A}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,A){const t=this.center.distanceToSquared(e);return A.copy(e),t>this.radius*this.radius&&(A.sub(this.center).normalize(),A.multiplyScalar(this.radius).add(this.center)),A}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;qi.subVectors(e,this.center);const A=qi.lengthSq();if(A>this.radius*this.radius){const t=Math.sqrt(A),i=(t-this.radius)*.5;this.center.addScaledVector(qi,i/t),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ro.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(qi.copy(e.center).add(ro)),this.expandByPoint(qi.copy(e.center).sub(ro))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}};const Pt=new I,so=new I,os=new I,qt=new I,ao=new I,ls=new I,oo=new I;class da{constructor(e=new I,A=new I(0,0,-1)){this.origin=e,this.direction=A}set(e,A){return this.origin.copy(e),this.direction.copy(A),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,A){return A.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Pt)),this}closestPointToPoint(e,A){A.subVectors(e,this.origin);const t=A.dot(this.direction);return t<0?A.copy(this.origin):A.copy(this.origin).addScaledVector(this.direction,t)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const A=Pt.subVectors(e,this.origin).dot(this.direction);return A<0?this.origin.distanceToSquared(e):(Pt.copy(this.origin).addScaledVector(this.direction,A),Pt.distanceToSquared(e))}distanceSqToSegment(e,A,t,i){so.copy(e).add(A).multiplyScalar(.5),os.copy(A).sub(e).normalize(),qt.copy(this.origin).sub(so);const r=e.distanceTo(A)*.5,s=-this.direction.dot(os),a=qt.dot(this.direction),o=-qt.dot(os),l=qt.lengthSq(),c=Math.abs(1-s*s);let u,h,p,g;if(c>0)if(u=s*o-a,h=s*a-o,g=r*c,u>=0)if(h>=-g)if(h<=g){const m=1/c;u*=m,h*=m,p=u*(u+s*h+2*a)+h*(s*u+h+2*o)+l}else h=r,u=Math.max(0,-(s*h+a)),p=-u*u+h*(h+2*o)+l;else h=-r,u=Math.max(0,-(s*h+a)),p=-u*u+h*(h+2*o)+l;else h<=-g?(u=Math.max(0,-(-s*r+a)),h=u>0?-r:Math.min(Math.max(-r,-o),r),p=-u*u+h*(h+2*o)+l):h<=g?(u=0,h=Math.min(Math.max(-r,-o),r),p=h*(h+2*o)+l):(u=Math.max(0,-(s*r+a)),h=u>0?r:Math.min(Math.max(-r,-o),r),p=-u*u+h*(h+2*o)+l);else h=s>0?-r:r,u=Math.max(0,-(s*h+a)),p=-u*u+h*(h+2*o)+l;return t&&t.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(so).addScaledVector(os,h),p}intersectSphere(e,A){Pt.subVectors(e.center,this.origin);const t=Pt.dot(this.direction),i=Pt.dot(Pt)-t*t,r=e.radius*e.radius;if(i>r)return null;const s=Math.sqrt(r-i),a=t-s,o=t+s;return o<0?null:a<0?this.at(o,A):this.at(a,A)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const A=e.normal.dot(this.direction);if(A===0)return e.distanceToPoint(this.origin)===0?0:null;const t=-(this.origin.dot(e.normal)+e.constant)/A;return t>=0?t:null}intersectPlane(e,A){const t=this.distanceToPlane(e);return t===null?null:this.at(t,A)}intersectsPlane(e){const A=e.distanceToPoint(this.origin);return A===0||e.normal.dot(this.direction)*A<0}intersectBox(e,A){let t,i,r,s,a,o;const l=1/this.direction.x,c=1/this.direction.y,u=1/this.direction.z,h=this.origin;return l>=0?(t=(e.min.x-h.x)*l,i=(e.max.x-h.x)*l):(t=(e.max.x-h.x)*l,i=(e.min.x-h.x)*l),c>=0?(r=(e.min.y-h.y)*c,s=(e.max.y-h.y)*c):(r=(e.max.y-h.y)*c,s=(e.min.y-h.y)*c),t>s||r>i||((r>t||isNaN(t))&&(t=r),(s<i||isNaN(i))&&(i=s),u>=0?(a=(e.min.z-h.z)*u,o=(e.max.z-h.z)*u):(a=(e.max.z-h.z)*u,o=(e.min.z-h.z)*u),t>o||a>i)||((a>t||t!==t)&&(t=a),(o<i||i!==i)&&(i=o),i<0)?null:this.at(t>=0?t:i,A)}intersectsBox(e){return this.intersectBox(e,Pt)!==null}intersectTriangle(e,A,t,i,r){ao.subVectors(A,e),ls.subVectors(t,e),oo.crossVectors(ao,ls);let s=this.direction.dot(oo),a;if(s>0){if(i)return null;a=1}else if(s<0)a=-1,s=-s;else return null;qt.subVectors(this.origin,e);const o=a*this.direction.dot(ls.crossVectors(qt,ls));if(o<0)return null;const l=a*this.direction.dot(ao.cross(qt));if(l<0||o+l>s)return null;const c=-a*qt.dot(oo);return c<0?null:this.at(c/s,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class CA{constructor(e,A,t,i,r,s,a,o,l,c,u,h,p,g,m,d){CA.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,A,t,i,r,s,a,o,l,c,u,h,p,g,m,d)}set(e,A,t,i,r,s,a,o,l,c,u,h,p,g,m,d){const f=this.elements;return f[0]=e,f[4]=A,f[8]=t,f[12]=i,f[1]=r,f[5]=s,f[9]=a,f[13]=o,f[2]=l,f[6]=c,f[10]=u,f[14]=h,f[3]=p,f[7]=g,f[11]=m,f[15]=d,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new CA().fromArray(this.elements)}copy(e){const A=this.elements,t=e.elements;return A[0]=t[0],A[1]=t[1],A[2]=t[2],A[3]=t[3],A[4]=t[4],A[5]=t[5],A[6]=t[6],A[7]=t[7],A[8]=t[8],A[9]=t[9],A[10]=t[10],A[11]=t[11],A[12]=t[12],A[13]=t[13],A[14]=t[14],A[15]=t[15],this}copyPosition(e){const A=this.elements,t=e.elements;return A[12]=t[12],A[13]=t[13],A[14]=t[14],this}setFromMatrix3(e){const A=e.elements;return this.set(A[0],A[3],A[6],0,A[1],A[4],A[7],0,A[2],A[5],A[8],0,0,0,0,1),this}extractBasis(e,A,t){return e.setFromMatrixColumn(this,0),A.setFromMatrixColumn(this,1),t.setFromMatrixColumn(this,2),this}makeBasis(e,A,t){return this.set(e.x,A.x,t.x,0,e.y,A.y,t.y,0,e.z,A.z,t.z,0,0,0,0,1),this}extractRotation(e){const A=this.elements,t=e.elements,i=1/si.setFromMatrixColumn(e,0).length(),r=1/si.setFromMatrixColumn(e,1).length(),s=1/si.setFromMatrixColumn(e,2).length();return A[0]=t[0]*i,A[1]=t[1]*i,A[2]=t[2]*i,A[3]=0,A[4]=t[4]*r,A[5]=t[5]*r,A[6]=t[6]*r,A[7]=0,A[8]=t[8]*s,A[9]=t[9]*s,A[10]=t[10]*s,A[11]=0,A[12]=0,A[13]=0,A[14]=0,A[15]=1,this}makeRotationFromEuler(e){const A=this.elements,t=e.x,i=e.y,r=e.z,s=Math.cos(t),a=Math.sin(t),o=Math.cos(i),l=Math.sin(i),c=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const h=s*c,p=s*u,g=a*c,m=a*u;A[0]=o*c,A[4]=-o*u,A[8]=l,A[1]=p+g*l,A[5]=h-m*l,A[9]=-a*o,A[2]=m-h*l,A[6]=g+p*l,A[10]=s*o}else if(e.order==="YXZ"){const h=o*c,p=o*u,g=l*c,m=l*u;A[0]=h+m*a,A[4]=g*a-p,A[8]=s*l,A[1]=s*u,A[5]=s*c,A[9]=-a,A[2]=p*a-g,A[6]=m+h*a,A[10]=s*o}else if(e.order==="ZXY"){const h=o*c,p=o*u,g=l*c,m=l*u;A[0]=h-m*a,A[4]=-s*u,A[8]=g+p*a,A[1]=p+g*a,A[5]=s*c,A[9]=m-h*a,A[2]=-s*l,A[6]=a,A[10]=s*o}else if(e.order==="ZYX"){const h=s*c,p=s*u,g=a*c,m=a*u;A[0]=o*c,A[4]=g*l-p,A[8]=h*l+m,A[1]=o*u,A[5]=m*l+h,A[9]=p*l-g,A[2]=-l,A[6]=a*o,A[10]=s*o}else if(e.order==="YZX"){const h=s*o,p=s*l,g=a*o,m=a*l;A[0]=o*c,A[4]=m-h*u,A[8]=g*u+p,A[1]=u,A[5]=s*c,A[9]=-a*c,A[2]=-l*c,A[6]=p*u+g,A[10]=h-m*u}else if(e.order==="XZY"){const h=s*o,p=s*l,g=a*o,m=a*l;A[0]=o*c,A[4]=-u,A[8]=l*c,A[1]=h*u+m,A[5]=s*c,A[9]=p*u-g,A[2]=g*u-p,A[6]=a*c,A[10]=m*u+h}return A[3]=0,A[7]=0,A[11]=0,A[12]=0,A[13]=0,A[14]=0,A[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Rw,e,Dw)}lookAt(e,A,t){const i=this.elements;return JA.subVectors(e,A),JA.lengthSq()===0&&(JA.z=1),JA.normalize(),Zt.crossVectors(t,JA),Zt.lengthSq()===0&&(Math.abs(t.z)===1?JA.x+=1e-4:JA.z+=1e-4,JA.normalize(),Zt.crossVectors(t,JA)),Zt.normalize(),cs.crossVectors(JA,Zt),i[0]=Zt.x,i[4]=cs.x,i[8]=JA.x,i[1]=Zt.y,i[5]=cs.y,i[9]=JA.y,i[2]=Zt.z,i[6]=cs.z,i[10]=JA.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,A){const t=e.elements,i=A.elements,r=this.elements,s=t[0],a=t[4],o=t[8],l=t[12],c=t[1],u=t[5],h=t[9],p=t[13],g=t[2],m=t[6],d=t[10],f=t[14],v=t[3],w=t[7],C=t[11],x=t[15],U=i[0],y=i[4],R=i[8],B=i[12],M=i[1],z=i[5],J=i[9],Y=i[13],T=i[2],N=i[6],X=i[10],K=i[14],ee=i[3],Z=i[7],q=i[11],Q=i[15];return r[0]=s*U+a*M+o*T+l*ee,r[4]=s*y+a*z+o*N+l*Z,r[8]=s*R+a*J+o*X+l*q,r[12]=s*B+a*Y+o*K+l*Q,r[1]=c*U+u*M+h*T+p*ee,r[5]=c*y+u*z+h*N+p*Z,r[9]=c*R+u*J+h*X+p*q,r[13]=c*B+u*Y+h*K+p*Q,r[2]=g*U+m*M+d*T+f*ee,r[6]=g*y+m*z+d*N+f*Z,r[10]=g*R+m*J+d*X+f*q,r[14]=g*B+m*Y+d*K+f*Q,r[3]=v*U+w*M+C*T+x*ee,r[7]=v*y+w*z+C*N+x*Z,r[11]=v*R+w*J+C*X+x*q,r[15]=v*B+w*Y+C*K+x*Q,this}multiplyScalar(e){const A=this.elements;return A[0]*=e,A[4]*=e,A[8]*=e,A[12]*=e,A[1]*=e,A[5]*=e,A[9]*=e,A[13]*=e,A[2]*=e,A[6]*=e,A[10]*=e,A[14]*=e,A[3]*=e,A[7]*=e,A[11]*=e,A[15]*=e,this}determinant(){const e=this.elements,A=e[0],t=e[4],i=e[8],r=e[12],s=e[1],a=e[5],o=e[9],l=e[13],c=e[2],u=e[6],h=e[10],p=e[14],g=e[3],m=e[7],d=e[11],f=e[15];return g*(+r*o*u-i*l*u-r*a*h+t*l*h+i*a*p-t*o*p)+m*(+A*o*p-A*l*h+r*s*h-i*s*p+i*l*c-r*o*c)+d*(+A*l*u-A*a*p-r*s*u+t*s*p+r*a*c-t*l*c)+f*(-i*a*c-A*o*u+A*a*h+i*s*u-t*s*h+t*o*c)}transpose(){const e=this.elements;let A;return A=e[1],e[1]=e[4],e[4]=A,A=e[2],e[2]=e[8],e[8]=A,A=e[6],e[6]=e[9],e[9]=A,A=e[3],e[3]=e[12],e[12]=A,A=e[7],e[7]=e[13],e[13]=A,A=e[11],e[11]=e[14],e[14]=A,this}setPosition(e,A,t){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=A,i[14]=t),this}invert(){const e=this.elements,A=e[0],t=e[1],i=e[2],r=e[3],s=e[4],a=e[5],o=e[6],l=e[7],c=e[8],u=e[9],h=e[10],p=e[11],g=e[12],m=e[13],d=e[14],f=e[15],v=u*d*l-m*h*l+m*o*p-a*d*p-u*o*f+a*h*f,w=g*h*l-c*d*l-g*o*p+s*d*p+c*o*f-s*h*f,C=c*m*l-g*u*l+g*a*p-s*m*p-c*a*f+s*u*f,x=g*u*o-c*m*o-g*a*h+s*m*h+c*a*d-s*u*d,U=A*v+t*w+i*C+r*x;if(U===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const y=1/U;return e[0]=v*y,e[1]=(m*h*r-u*d*r-m*i*p+t*d*p+u*i*f-t*h*f)*y,e[2]=(a*d*r-m*o*r+m*i*l-t*d*l-a*i*f+t*o*f)*y,e[3]=(u*o*r-a*h*r-u*i*l+t*h*l+a*i*p-t*o*p)*y,e[4]=w*y,e[5]=(c*d*r-g*h*r+g*i*p-A*d*p-c*i*f+A*h*f)*y,e[6]=(g*o*r-s*d*r-g*i*l+A*d*l+s*i*f-A*o*f)*y,e[7]=(s*h*r-c*o*r+c*i*l-A*h*l-s*i*p+A*o*p)*y,e[8]=C*y,e[9]=(g*u*r-c*m*r-g*t*p+A*m*p+c*t*f-A*u*f)*y,e[10]=(s*m*r-g*a*r+g*t*l-A*m*l-s*t*f+A*a*f)*y,e[11]=(c*a*r-s*u*r-c*t*l+A*u*l+s*t*p-A*a*p)*y,e[12]=x*y,e[13]=(c*m*i-g*u*i+g*t*h-A*m*h-c*t*d+A*u*d)*y,e[14]=(g*a*i-s*m*i-g*t*o+A*m*o+s*t*d-A*a*d)*y,e[15]=(s*u*i-c*a*i+c*t*o-A*u*o-s*t*h+A*a*h)*y,this}scale(e){const A=this.elements,t=e.x,i=e.y,r=e.z;return A[0]*=t,A[4]*=i,A[8]*=r,A[1]*=t,A[5]*=i,A[9]*=r,A[2]*=t,A[6]*=i,A[10]*=r,A[3]*=t,A[7]*=i,A[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,A=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],t=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(A,t,i))}makeTranslation(e,A,t){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,A,0,0,1,t,0,0,0,1),this}makeRotationX(e){const A=Math.cos(e),t=Math.sin(e);return this.set(1,0,0,0,0,A,-t,0,0,t,A,0,0,0,0,1),this}makeRotationY(e){const A=Math.cos(e),t=Math.sin(e);return this.set(A,0,t,0,0,1,0,0,-t,0,A,0,0,0,0,1),this}makeRotationZ(e){const A=Math.cos(e),t=Math.sin(e);return this.set(A,-t,0,0,t,A,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,A){const t=Math.cos(A),i=Math.sin(A),r=1-t,s=e.x,a=e.y,o=e.z,l=r*s,c=r*a;return this.set(l*s+t,l*a-i*o,l*o+i*a,0,l*a+i*o,c*a+t,c*o-i*s,0,l*o-i*a,c*o+i*s,r*o*o+t,0,0,0,0,1),this}makeScale(e,A,t){return this.set(e,0,0,0,0,A,0,0,0,0,t,0,0,0,0,1),this}makeShear(e,A,t,i,r,s){return this.set(1,t,r,0,e,1,s,0,A,i,1,0,0,0,0,1),this}compose(e,A,t){const i=this.elements,r=A._x,s=A._y,a=A._z,o=A._w,l=r+r,c=s+s,u=a+a,h=r*l,p=r*c,g=r*u,m=s*c,d=s*u,f=a*u,v=o*l,w=o*c,C=o*u,x=t.x,U=t.y,y=t.z;return i[0]=(1-(m+f))*x,i[1]=(p+C)*x,i[2]=(g-w)*x,i[3]=0,i[4]=(p-C)*U,i[5]=(1-(h+f))*U,i[6]=(d+v)*U,i[7]=0,i[8]=(g+w)*y,i[9]=(d-v)*y,i[10]=(1-(h+m))*y,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,A,t){const i=this.elements;let r=si.set(i[0],i[1],i[2]).length();const s=si.set(i[4],i[5],i[6]).length(),a=si.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],ct.copy(this);const l=1/r,c=1/s,u=1/a;return ct.elements[0]*=l,ct.elements[1]*=l,ct.elements[2]*=l,ct.elements[4]*=c,ct.elements[5]*=c,ct.elements[6]*=c,ct.elements[8]*=u,ct.elements[9]*=u,ct.elements[10]*=u,A.setFromRotationMatrix(ct),t.x=r,t.y=s,t.z=a,this}makePerspective(e,A,t,i,r,s,a=kt){const o=this.elements,l=2*r/(A-e),c=2*r/(t-i),u=(A+e)/(A-e),h=(t+i)/(t-i);let p,g;if(a===kt)p=-(s+r)/(s-r),g=-2*s*r/(s-r);else if(a===Js)p=-s/(s-r),g=-s*r/(s-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return o[0]=l,o[4]=0,o[8]=u,o[12]=0,o[1]=0,o[5]=c,o[9]=h,o[13]=0,o[2]=0,o[6]=0,o[10]=p,o[14]=g,o[3]=0,o[7]=0,o[11]=-1,o[15]=0,this}makeOrthographic(e,A,t,i,r,s,a=kt){const o=this.elements,l=1/(A-e),c=1/(t-i),u=1/(s-r),h=(A+e)*l,p=(t+i)*c;let g,m;if(a===kt)g=(s+r)*u,m=-2*u;else if(a===Js)g=r*u,m=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return o[0]=2*l,o[4]=0,o[8]=0,o[12]=-h,o[1]=0,o[5]=2*c,o[9]=0,o[13]=-p,o[2]=0,o[6]=0,o[10]=m,o[14]=-g,o[3]=0,o[7]=0,o[11]=0,o[15]=1,this}equals(e){const A=this.elements,t=e.elements;for(let i=0;i<16;i++)if(A[i]!==t[i])return!1;return!0}fromArray(e,A=0){for(let t=0;t<16;t++)this.elements[t]=e[t+A];return this}toArray(e=[],A=0){const t=this.elements;return e[A]=t[0],e[A+1]=t[1],e[A+2]=t[2],e[A+3]=t[3],e[A+4]=t[4],e[A+5]=t[5],e[A+6]=t[6],e[A+7]=t[7],e[A+8]=t[8],e[A+9]=t[9],e[A+10]=t[10],e[A+11]=t[11],e[A+12]=t[12],e[A+13]=t[13],e[A+14]=t[14],e[A+15]=t[15],e}}const si=new I,ct=new CA,Rw=new I(0,0,0),Dw=new I(1,1,1),Zt=new I,cs=new I,JA=new I,Uu=new CA,yu=new zn;class pa{constructor(e=0,A=0,t=0,i=pa.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=A,this._z=t,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,A,t,i=this._order){return this._x=e,this._y=A,this._z=t,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,A=this._order,t=!0){const i=e.elements,r=i[0],s=i[4],a=i[8],o=i[1],l=i[5],c=i[9],u=i[2],h=i[6],p=i[10];switch(A){case"XYZ":this._y=Math.asin(RA(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-c,p),this._z=Math.atan2(-s,r)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-RA(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(o,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(RA(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-s,l)):(this._y=0,this._z=Math.atan2(o,r));break;case"ZYX":this._y=Math.asin(-RA(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(o,r)):(this._x=0,this._z=Math.atan2(-s,l));break;case"YZX":this._z=Math.asin(RA(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-c,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-RA(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-c,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+A)}return this._order=A,t===!0&&this._onChangeCallback(),this}setFromQuaternion(e,A,t){return Uu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Uu,A,t)}setFromVector3(e,A=this._order){return this.set(e.x,e.y,e.z,A)}reorder(e){return yu.setFromEuler(this),this.setFromQuaternion(yu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],A=0){return e[A]=this._x,e[A+1]=this._y,e[A+2]=this._z,e[A+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}pa.DEFAULT_ORDER="XYZ";class El{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Hw=0;const Su=new I,ai=new zn,Ot=new CA,us=new I,Zi=new I,Pw=new I,Ow=new zn,Mu=new I(1,0,0),Fu=new I(0,1,0),bu=new I(0,0,1),Nw={type:"added"},Gw={type:"removed"};class zA extends Wn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Hw++}),this.uuid=Vi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=zA.DEFAULT_UP.clone();const e=new I,A=new pa,t=new zn,i=new I(1,1,1);function r(){t.setFromEuler(A,!1)}function s(){A.setFromQuaternion(t,void 0,!1)}A._onChange(r),t._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:A},quaternion:{configurable:!0,enumerable:!0,value:t},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new CA},normalMatrix:{value:new ze}}),this.matrix=new CA,this.matrixWorld=new CA,this.matrixAutoUpdate=zA.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=zA.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.layers=new El,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,A){this.quaternion.setFromAxisAngle(e,A)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,A){return ai.setFromAxisAngle(e,A),this.quaternion.multiply(ai),this}rotateOnWorldAxis(e,A){return ai.setFromAxisAngle(e,A),this.quaternion.premultiply(ai),this}rotateX(e){return this.rotateOnAxis(Mu,e)}rotateY(e){return this.rotateOnAxis(Fu,e)}rotateZ(e){return this.rotateOnAxis(bu,e)}translateOnAxis(e,A){return Su.copy(e).applyQuaternion(this.quaternion),this.position.add(Su.multiplyScalar(A)),this}translateX(e){return this.translateOnAxis(Mu,e)}translateY(e){return this.translateOnAxis(Fu,e)}translateZ(e){return this.translateOnAxis(bu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ot.copy(this.matrixWorld).invert())}lookAt(e,A,t){e.isVector3?us.copy(e):us.set(e,A,t);const i=this.parent;this.updateWorldMatrix(!0,!1),Zi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ot.lookAt(Zi,us,this.up):Ot.lookAt(us,Zi,this.up),this.quaternion.setFromRotationMatrix(Ot),i&&(Ot.extractRotation(i.matrixWorld),ai.setFromRotationMatrix(Ot),this.quaternion.premultiply(ai.invert()))}add(e){if(arguments.length>1){for(let A=0;A<arguments.length;A++)this.add(arguments[A]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Nw)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.remove(arguments[t]);return this}const A=this.children.indexOf(e);return A!==-1&&(e.parent=null,this.children.splice(A,1),e.dispatchEvent(Gw)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ot.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ot.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ot),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,A){if(this[e]===A)return this;for(let t=0,i=this.children.length;t<i;t++){const s=this.children[t].getObjectByProperty(e,A);if(s!==void 0)return s}}getObjectsByProperty(e,A){let t=[];this[e]===A&&t.push(this);for(let i=0,r=this.children.length;i<r;i++){const s=this.children[i].getObjectsByProperty(e,A);s.length>0&&(t=t.concat(s))}return t}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zi,e,Pw),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zi,Ow,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const A=this.matrixWorld.elements;return e.set(A[8],A[9],A[10]).normalize()}raycast(){}traverse(e){e(this);const A=this.children;for(let t=0,i=A.length;t<i;t++)A[t].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const A=this.children;for(let t=0,i=A.length;t<i;t++)A[t].traverseVisible(e)}traverseAncestors(e){const A=this.parent;A!==null&&(e(A),A.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const A=this.children;for(let t=0,i=A.length;t<i;t++){const r=A[t];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,A){const t=this.parent;if(e===!0&&t!==null&&t.matrixWorldAutoUpdate===!0&&t.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),A===!0){const i=this.children;for(let r=0,s=i.length;r<s;r++){const a=i[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const A=e===void 0||typeof e=="string",t={};A&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},t.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON()));function r(a,o){return a[o.uuid]===void 0&&(a[o.uuid]=o.toJSON(e)),o.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const o=a.shapes;if(Array.isArray(o))for(let l=0,c=o.length;l<c;l++){const u=o[l];r(e.shapes,u)}else r(e.shapes,o)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let o=0,l=this.material.length;o<l;o++)a.push(r(e.materials,this.material[o]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const o=this.animations[a];i.animations.push(r(e.animations,o))}}if(A){const a=s(e.geometries),o=s(e.materials),l=s(e.textures),c=s(e.images),u=s(e.shapes),h=s(e.skeletons),p=s(e.animations),g=s(e.nodes);a.length>0&&(t.geometries=a),o.length>0&&(t.materials=o),l.length>0&&(t.textures=l),c.length>0&&(t.images=c),u.length>0&&(t.shapes=u),h.length>0&&(t.skeletons=h),p.length>0&&(t.animations=p),g.length>0&&(t.nodes=g)}return t.object=i,t;function s(a){const o=[];for(const l in a){const c=a[l];delete c.metadata,o.push(c)}return o}}clone(e){return new this.constructor().copy(this,e)}copy(e,A=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),A===!0)for(let t=0;t<e.children.length;t++){const i=e.children[t];this.add(i.clone())}return this}}zA.DEFAULT_UP=new I(0,1,0);zA.DEFAULT_MATRIX_AUTO_UPDATE=!0;zA.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ut=new I,Nt=new I,lo=new I,Gt=new I,oi=new I,li=new I,Tu=new I,co=new I,uo=new I,ho=new I;let hs=!1;class pt{constructor(e=new I,A=new I,t=new I){this.a=e,this.b=A,this.c=t}static getNormal(e,A,t,i){i.subVectors(t,A),ut.subVectors(e,A),i.cross(ut);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,A,t,i,r){ut.subVectors(i,A),Nt.subVectors(t,A),lo.subVectors(e,A);const s=ut.dot(ut),a=ut.dot(Nt),o=ut.dot(lo),l=Nt.dot(Nt),c=Nt.dot(lo),u=s*l-a*a;if(u===0)return r.set(-2,-1,-1);const h=1/u,p=(l*o-a*c)*h,g=(s*c-a*o)*h;return r.set(1-p-g,g,p)}static containsPoint(e,A,t,i){return this.getBarycoord(e,A,t,i,Gt),Gt.x>=0&&Gt.y>=0&&Gt.x+Gt.y<=1}static getUV(e,A,t,i,r,s,a,o){return hs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),hs=!0),this.getInterpolation(e,A,t,i,r,s,a,o)}static getInterpolation(e,A,t,i,r,s,a,o){return this.getBarycoord(e,A,t,i,Gt),o.setScalar(0),o.addScaledVector(r,Gt.x),o.addScaledVector(s,Gt.y),o.addScaledVector(a,Gt.z),o}static isFrontFacing(e,A,t,i){return ut.subVectors(t,A),Nt.subVectors(e,A),ut.cross(Nt).dot(i)<0}set(e,A,t){return this.a.copy(e),this.b.copy(A),this.c.copy(t),this}setFromPointsAndIndices(e,A,t,i){return this.a.copy(e[A]),this.b.copy(e[t]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,A,t,i){return this.a.fromBufferAttribute(e,A),this.b.fromBufferAttribute(e,t),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ut.subVectors(this.c,this.b),Nt.subVectors(this.a,this.b),ut.cross(Nt).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return pt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,A){return pt.getBarycoord(e,this.a,this.b,this.c,A)}getUV(e,A,t,i,r){return hs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),hs=!0),pt.getInterpolation(e,this.a,this.b,this.c,A,t,i,r)}getInterpolation(e,A,t,i,r){return pt.getInterpolation(e,this.a,this.b,this.c,A,t,i,r)}containsPoint(e){return pt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return pt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,A){const t=this.a,i=this.b,r=this.c;let s,a;oi.subVectors(i,t),li.subVectors(r,t),co.subVectors(e,t);const o=oi.dot(co),l=li.dot(co);if(o<=0&&l<=0)return A.copy(t);uo.subVectors(e,i);const c=oi.dot(uo),u=li.dot(uo);if(c>=0&&u<=c)return A.copy(i);const h=o*u-c*l;if(h<=0&&o>=0&&c<=0)return s=o/(o-c),A.copy(t).addScaledVector(oi,s);ho.subVectors(e,r);const p=oi.dot(ho),g=li.dot(ho);if(g>=0&&p<=g)return A.copy(r);const m=p*l-o*g;if(m<=0&&l>=0&&g<=0)return a=l/(l-g),A.copy(t).addScaledVector(li,a);const d=c*g-p*u;if(d<=0&&u-c>=0&&p-g>=0)return Tu.subVectors(r,i),a=(u-c)/(u-c+(p-g)),A.copy(i).addScaledVector(Tu,a);const f=1/(d+m+h);return s=m*f,a=h*f,A.copy(t).addScaledVector(oi,s).addScaledVector(li,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Of={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},jt={h:0,s:0,l:0},fs={h:0,s:0,l:0};function fo(n,e,A){return A<0&&(A+=1),A>1&&(A-=1),A<1/6?n+(e-n)*6*A:A<1/2?e:A<2/3?n+(e-n)*6*(2/3-A):n}class Ze{constructor(e,A,t){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,A,t)}set(e,A,t){if(A===void 0&&t===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,A,t);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,A=UA){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$e.toWorkingColorSpace(this,A),this}setRGB(e,A,t,i=$e.workingColorSpace){return this.r=e,this.g=A,this.b=t,$e.toWorkingColorSpace(this,i),this}setHSL(e,A,t,i=$e.workingColorSpace){if(e=vl(e,1),A=RA(A,0,1),t=RA(t,0,1),A===0)this.r=this.g=this.b=t;else{const r=t<=.5?t*(1+A):t+A-t*A,s=2*t-r;this.r=fo(s,r,e+1/3),this.g=fo(s,r,e),this.b=fo(s,r,e-1/3)}return $e.toWorkingColorSpace(this,i),this}setStyle(e,A=UA){function t(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const s=i[1],a=i[2];switch(s){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return t(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,A);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return t(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,A);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return t(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,A);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],s=r.length;if(s===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,A);if(s===6)return this.setHex(parseInt(r,16),A);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,A);return this}setColorName(e,A=UA){const t=Of[e.toLowerCase()];return t!==void 0?this.setHex(t,A):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ui(e.r),this.g=Ui(e.g),this.b=Ui(e.b),this}copyLinearToSRGB(e){return this.r=Ao(e.r),this.g=Ao(e.g),this.b=Ao(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=UA){return $e.fromWorkingColorSpace(bA.copy(this),e),Math.round(RA(bA.r*255,0,255))*65536+Math.round(RA(bA.g*255,0,255))*256+Math.round(RA(bA.b*255,0,255))}getHexString(e=UA){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,A=$e.workingColorSpace){$e.fromWorkingColorSpace(bA.copy(this),A);const t=bA.r,i=bA.g,r=bA.b,s=Math.max(t,i,r),a=Math.min(t,i,r);let o,l;const c=(a+s)/2;if(a===s)o=0,l=0;else{const u=s-a;switch(l=c<=.5?u/(s+a):u/(2-s-a),s){case t:o=(i-r)/u+(i<r?6:0);break;case i:o=(r-t)/u+2;break;case r:o=(t-i)/u+4;break}o/=6}return e.h=o,e.s=l,e.l=c,e}getRGB(e,A=$e.workingColorSpace){return $e.fromWorkingColorSpace(bA.copy(this),A),e.r=bA.r,e.g=bA.g,e.b=bA.b,e}getStyle(e=UA){$e.fromWorkingColorSpace(bA.copy(this),e);const A=bA.r,t=bA.g,i=bA.b;return e!==UA?`color(${e} ${A.toFixed(3)} ${t.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(A*255)},${Math.round(t*255)},${Math.round(i*255)})`}offsetHSL(e,A,t){return this.getHSL(jt),this.setHSL(jt.h+e,jt.s+A,jt.l+t)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,A){return this.r=e.r+A.r,this.g=e.g+A.g,this.b=e.b+A.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,A){return this.r+=(e.r-this.r)*A,this.g+=(e.g-this.g)*A,this.b+=(e.b-this.b)*A,this}lerpColors(e,A,t){return this.r=e.r+(A.r-e.r)*t,this.g=e.g+(A.g-e.g)*t,this.b=e.b+(A.b-e.b)*t,this}lerpHSL(e,A){this.getHSL(jt),e.getHSL(fs);const t=dr(jt.h,fs.h,A),i=dr(jt.s,fs.s,A),r=dr(jt.l,fs.l,A);return this.setHSL(t,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const A=this.r,t=this.g,i=this.b,r=e.elements;return this.r=r[0]*A+r[3]*t+r[6]*i,this.g=r[1]*A+r[4]*t+r[7]*i,this.b=r[2]*A+r[5]*t+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,A=0){return this.r=e[A],this.g=e[A+1],this.b=e[A+2],this}toArray(e=[],A=0){return e[A]=this.r,e[A+1]=this.g,e[A+2]=this.b,e}fromBufferAttribute(e,A){return this.r=e.getX(A),this.g=e.getY(A),this.b=e.getZ(A),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const bA=new Ze;Ze.NAMES=Of;let Vw=0;class Tr extends Wn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Vw++}),this.uuid=Vi(),this.name="",this.type="Material",this.blending=xi,this.side=Bn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=jo,this.blendDst=$o,this.blendEquation=Fn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ze(0,0,0),this.blendAlpha=0,this.depthFunc=zs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=mu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ai,this.stencilZFail=Ai,this.stencilZPass=Ai,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const A in e){const t=e[A];if(t===void 0){console.warn(`THREE.Material: parameter '${A}' has value of undefined.`);continue}const i=this[A];if(i===void 0){console.warn(`THREE.Material: '${A}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(t):i&&i.isVector3&&t&&t.isVector3?i.copy(t):this[A]=t}}toJSON(e){const A=e===void 0||typeof e=="string";A&&(e={textures:{},images:{}});const t={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),this.color&&this.color.isColor&&(t.color=this.color.getHex()),this.roughness!==void 0&&(t.roughness=this.roughness),this.metalness!==void 0&&(t.metalness=this.metalness),this.sheen!==void 0&&(t.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(t.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(t.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(t.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(t.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(t.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(t.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(t.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(t.shininess=this.shininess),this.clearcoat!==void 0&&(t.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(t.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(t.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(t.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(t.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,t.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(t.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(t.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(t.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(t.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(t.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(t.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(t.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(t.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(t.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(t.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(t.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(t.lightMap=this.lightMap.toJSON(e).uuid,t.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(t.aoMap=this.aoMap.toJSON(e).uuid,t.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(t.bumpMap=this.bumpMap.toJSON(e).uuid,t.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(t.normalMap=this.normalMap.toJSON(e).uuid,t.normalMapType=this.normalMapType,t.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(t.displacementMap=this.displacementMap.toJSON(e).uuid,t.displacementScale=this.displacementScale,t.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(t.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(t.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(t.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(t.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(t.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(t.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(t.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(t.combine=this.combine)),this.envMapIntensity!==void 0&&(t.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(t.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(t.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(t.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(t.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(t.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(t.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(t.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(t.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(t.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(t.size=this.size),this.shadowSide!==null&&(t.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(t.sizeAttenuation=this.sizeAttenuation),this.blending!==xi&&(t.blending=this.blending),this.side!==Bn&&(t.side=this.side),this.vertexColors===!0&&(t.vertexColors=!0),this.opacity<1&&(t.opacity=this.opacity),this.transparent===!0&&(t.transparent=!0),this.blendSrc!==jo&&(t.blendSrc=this.blendSrc),this.blendDst!==$o&&(t.blendDst=this.blendDst),this.blendEquation!==Fn&&(t.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(t.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(t.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(t.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(t.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(t.blendAlpha=this.blendAlpha),this.depthFunc!==zs&&(t.depthFunc=this.depthFunc),this.depthTest===!1&&(t.depthTest=this.depthTest),this.depthWrite===!1&&(t.depthWrite=this.depthWrite),this.colorWrite===!1&&(t.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(t.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==mu&&(t.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(t.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(t.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ai&&(t.stencilFail=this.stencilFail),this.stencilZFail!==Ai&&(t.stencilZFail=this.stencilZFail),this.stencilZPass!==Ai&&(t.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(t.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(t.rotation=this.rotation),this.polygonOffset===!0&&(t.polygonOffset=!0),this.polygonOffsetFactor!==0&&(t.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(t.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(t.linewidth=this.linewidth),this.dashSize!==void 0&&(t.dashSize=this.dashSize),this.gapSize!==void 0&&(t.gapSize=this.gapSize),this.scale!==void 0&&(t.scale=this.scale),this.dithering===!0&&(t.dithering=!0),this.alphaTest>0&&(t.alphaTest=this.alphaTest),this.alphaHash===!0&&(t.alphaHash=!0),this.alphaToCoverage===!0&&(t.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(t.premultipliedAlpha=!0),this.forceSinglePass===!0&&(t.forceSinglePass=!0),this.wireframe===!0&&(t.wireframe=!0),this.wireframeLinewidth>1&&(t.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(t.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(t.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(t.flatShading=!0),this.visible===!1&&(t.visible=!1),this.toneMapped===!1&&(t.toneMapped=!1),this.fog===!1&&(t.fog=!1),Object.keys(this.userData).length>0&&(t.userData=this.userData);function i(r){const s=[];for(const a in r){const o=r[a];delete o.metadata,s.push(o)}return s}if(A){const r=i(e.textures),s=i(e.images);r.length>0&&(t.textures=r),s.length>0&&(t.images=s)}return t}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const A=e.clippingPlanes;let t=null;if(A!==null){const i=A.length;t=new Array(i);for(let r=0;r!==i;++r)t[r]=A[r].clone()}return this.clippingPlanes=t,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Cl extends Tr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=yf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const dA=new I,ds=new Se;class bt{constructor(e,A,t=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=A,this.count=e!==void 0?e.length/A:0,this.normalized=t,this.usage=Bu,this.updateRange={offset:0,count:-1},this.gpuType=cn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,A,t){e*=this.itemSize,t*=A.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=A.array[t+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let A=0,t=this.count;A<t;A++)ds.fromBufferAttribute(this,A),ds.applyMatrix3(e),this.setXY(A,ds.x,ds.y);else if(this.itemSize===3)for(let A=0,t=this.count;A<t;A++)dA.fromBufferAttribute(this,A),dA.applyMatrix3(e),this.setXYZ(A,dA.x,dA.y,dA.z);return this}applyMatrix4(e){for(let A=0,t=this.count;A<t;A++)dA.fromBufferAttribute(this,A),dA.applyMatrix4(e),this.setXYZ(A,dA.x,dA.y,dA.z);return this}applyNormalMatrix(e){for(let A=0,t=this.count;A<t;A++)dA.fromBufferAttribute(this,A),dA.applyNormalMatrix(e),this.setXYZ(A,dA.x,dA.y,dA.z);return this}transformDirection(e){for(let A=0,t=this.count;A<t;A++)dA.fromBufferAttribute(this,A),dA.transformDirection(e),this.setXYZ(A,dA.x,dA.y,dA.z);return this}set(e,A=0){return this.array.set(e,A),this}getComponent(e,A){let t=this.array[e*this.itemSize+A];return this.normalized&&(t=wi(t,this.array)),t}setComponent(e,A,t){return this.normalized&&(t=PA(t,this.array)),this.array[e*this.itemSize+A]=t,this}getX(e){let A=this.array[e*this.itemSize];return this.normalized&&(A=wi(A,this.array)),A}setX(e,A){return this.normalized&&(A=PA(A,this.array)),this.array[e*this.itemSize]=A,this}getY(e){let A=this.array[e*this.itemSize+1];return this.normalized&&(A=wi(A,this.array)),A}setY(e,A){return this.normalized&&(A=PA(A,this.array)),this.array[e*this.itemSize+1]=A,this}getZ(e){let A=this.array[e*this.itemSize+2];return this.normalized&&(A=wi(A,this.array)),A}setZ(e,A){return this.normalized&&(A=PA(A,this.array)),this.array[e*this.itemSize+2]=A,this}getW(e){let A=this.array[e*this.itemSize+3];return this.normalized&&(A=wi(A,this.array)),A}setW(e,A){return this.normalized&&(A=PA(A,this.array)),this.array[e*this.itemSize+3]=A,this}setXY(e,A,t){return e*=this.itemSize,this.normalized&&(A=PA(A,this.array),t=PA(t,this.array)),this.array[e+0]=A,this.array[e+1]=t,this}setXYZ(e,A,t,i){return e*=this.itemSize,this.normalized&&(A=PA(A,this.array),t=PA(t,this.array),i=PA(i,this.array)),this.array[e+0]=A,this.array[e+1]=t,this.array[e+2]=i,this}setXYZW(e,A,t,i,r){return e*=this.itemSize,this.normalized&&(A=PA(A,this.array),t=PA(t,this.array),i=PA(i,this.array),r=PA(r,this.array)),this.array[e+0]=A,this.array[e+1]=t,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Bu&&(e.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(e.updateRange=this.updateRange),e}}class Nf extends bt{constructor(e,A,t){super(new Uint16Array(e),A,t)}}class Gf extends bt{constructor(e,A,t){super(new Uint32Array(e),A,t)}}class WA extends bt{constructor(e,A,t){super(new Float32Array(e),A,t)}}let Kw=0;const et=new CA,po=new zA,ci=new I,qA=new br,ji=new br,vA=new I;class It extends Wn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Kw++}),this.uuid=Vi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Rf(e)?Gf:Nf)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,A){return this.attributes[e]=A,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,A,t=0){this.groups.push({start:e,count:A,materialIndex:t})}clearGroups(){this.groups=[]}setDrawRange(e,A){this.drawRange.start=e,this.drawRange.count=A}applyMatrix4(e){const A=this.attributes.position;A!==void 0&&(A.applyMatrix4(e),A.needsUpdate=!0);const t=this.attributes.normal;if(t!==void 0){const r=new ze().getNormalMatrix(e);t.applyNormalMatrix(r),t.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return et.makeRotationFromQuaternion(e),this.applyMatrix4(et),this}rotateX(e){return et.makeRotationX(e),this.applyMatrix4(et),this}rotateY(e){return et.makeRotationY(e),this.applyMatrix4(et),this}rotateZ(e){return et.makeRotationZ(e),this.applyMatrix4(et),this}translate(e,A,t){return et.makeTranslation(e,A,t),this.applyMatrix4(et),this}scale(e,A,t){return et.makeScale(e,A,t),this.applyMatrix4(et),this}lookAt(e){return po.lookAt(e),po.updateMatrix(),this.applyMatrix4(po.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ci).negate(),this.translate(ci.x,ci.y,ci.z),this}setFromPoints(e){const A=[];for(let t=0,i=e.length;t<i;t++){const r=e[t];A.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new WA(A,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new br);const e=this.attributes.position,A=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),A)for(let t=0,i=A.length;t<i;t++){const r=A[t];qA.setFromBufferAttribute(r),this.morphTargetsRelative?(vA.addVectors(this.boundingBox.min,qA.min),this.boundingBox.expandByPoint(vA),vA.addVectors(this.boundingBox.max,qA.max),this.boundingBox.expandByPoint(vA)):(this.boundingBox.expandByPoint(qA.min),this.boundingBox.expandByPoint(qA.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fa);const e=this.attributes.position,A=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new I,1/0);return}if(e){const t=this.boundingSphere.center;if(qA.setFromBufferAttribute(e),A)for(let r=0,s=A.length;r<s;r++){const a=A[r];ji.setFromBufferAttribute(a),this.morphTargetsRelative?(vA.addVectors(qA.min,ji.min),qA.expandByPoint(vA),vA.addVectors(qA.max,ji.max),qA.expandByPoint(vA)):(qA.expandByPoint(ji.min),qA.expandByPoint(ji.max))}qA.getCenter(t);let i=0;for(let r=0,s=e.count;r<s;r++)vA.fromBufferAttribute(e,r),i=Math.max(i,t.distanceToSquared(vA));if(A)for(let r=0,s=A.length;r<s;r++){const a=A[r],o=this.morphTargetsRelative;for(let l=0,c=a.count;l<c;l++)vA.fromBufferAttribute(a,l),o&&(ci.fromBufferAttribute(e,l),vA.add(ci)),i=Math.max(i,t.distanceToSquared(vA))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,A=this.attributes;if(e===null||A.position===void 0||A.normal===void 0||A.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const t=e.array,i=A.position.array,r=A.normal.array,s=A.uv.array,a=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new bt(new Float32Array(4*a),4));const o=this.getAttribute("tangent").array,l=[],c=[];for(let M=0;M<a;M++)l[M]=new I,c[M]=new I;const u=new I,h=new I,p=new I,g=new Se,m=new Se,d=new Se,f=new I,v=new I;function w(M,z,J){u.fromArray(i,M*3),h.fromArray(i,z*3),p.fromArray(i,J*3),g.fromArray(s,M*2),m.fromArray(s,z*2),d.fromArray(s,J*2),h.sub(u),p.sub(u),m.sub(g),d.sub(g);const Y=1/(m.x*d.y-d.x*m.y);isFinite(Y)&&(f.copy(h).multiplyScalar(d.y).addScaledVector(p,-m.y).multiplyScalar(Y),v.copy(p).multiplyScalar(m.x).addScaledVector(h,-d.x).multiplyScalar(Y),l[M].add(f),l[z].add(f),l[J].add(f),c[M].add(v),c[z].add(v),c[J].add(v))}let C=this.groups;C.length===0&&(C=[{start:0,count:t.length}]);for(let M=0,z=C.length;M<z;++M){const J=C[M],Y=J.start,T=J.count;for(let N=Y,X=Y+T;N<X;N+=3)w(t[N+0],t[N+1],t[N+2])}const x=new I,U=new I,y=new I,R=new I;function B(M){y.fromArray(r,M*3),R.copy(y);const z=l[M];x.copy(z),x.sub(y.multiplyScalar(y.dot(z))).normalize(),U.crossVectors(R,z);const Y=U.dot(c[M])<0?-1:1;o[M*4]=x.x,o[M*4+1]=x.y,o[M*4+2]=x.z,o[M*4+3]=Y}for(let M=0,z=C.length;M<z;++M){const J=C[M],Y=J.start,T=J.count;for(let N=Y,X=Y+T;N<X;N+=3)B(t[N+0]),B(t[N+1]),B(t[N+2])}}computeVertexNormals(){const e=this.index,A=this.getAttribute("position");if(A!==void 0){let t=this.getAttribute("normal");if(t===void 0)t=new bt(new Float32Array(A.count*3),3),this.setAttribute("normal",t);else for(let h=0,p=t.count;h<p;h++)t.setXYZ(h,0,0,0);const i=new I,r=new I,s=new I,a=new I,o=new I,l=new I,c=new I,u=new I;if(e)for(let h=0,p=e.count;h<p;h+=3){const g=e.getX(h+0),m=e.getX(h+1),d=e.getX(h+2);i.fromBufferAttribute(A,g),r.fromBufferAttribute(A,m),s.fromBufferAttribute(A,d),c.subVectors(s,r),u.subVectors(i,r),c.cross(u),a.fromBufferAttribute(t,g),o.fromBufferAttribute(t,m),l.fromBufferAttribute(t,d),a.add(c),o.add(c),l.add(c),t.setXYZ(g,a.x,a.y,a.z),t.setXYZ(m,o.x,o.y,o.z),t.setXYZ(d,l.x,l.y,l.z)}else for(let h=0,p=A.count;h<p;h+=3)i.fromBufferAttribute(A,h+0),r.fromBufferAttribute(A,h+1),s.fromBufferAttribute(A,h+2),c.subVectors(s,r),u.subVectors(i,r),c.cross(u),t.setXYZ(h+0,c.x,c.y,c.z),t.setXYZ(h+1,c.x,c.y,c.z),t.setXYZ(h+2,c.x,c.y,c.z);this.normalizeNormals(),t.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let A=0,t=e.count;A<t;A++)vA.fromBufferAttribute(e,A),vA.normalize(),e.setXYZ(A,vA.x,vA.y,vA.z)}toNonIndexed(){function e(a,o){const l=a.array,c=a.itemSize,u=a.normalized,h=new l.constructor(o.length*c);let p=0,g=0;for(let m=0,d=o.length;m<d;m++){a.isInterleavedBufferAttribute?p=o[m]*a.data.stride+a.offset:p=o[m]*c;for(let f=0;f<c;f++)h[g++]=l[p++]}return new bt(h,c,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const A=new It,t=this.index.array,i=this.attributes;for(const a in i){const o=i[a],l=e(o,t);A.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const o=[],l=r[a];for(let c=0,u=l.length;c<u;c++){const h=l[c],p=e(h,t);o.push(p)}A.morphAttributes[a]=o}A.morphTargetsRelative=this.morphTargetsRelative;const s=this.groups;for(let a=0,o=s.length;a<o;a++){const l=s[a];A.addGroup(l.start,l.count,l.materialIndex)}return A}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const o=this.parameters;for(const l in o)o[l]!==void 0&&(e[l]=o[l]);return e}e.data={attributes:{}};const A=this.index;A!==null&&(e.data.index={type:A.array.constructor.name,array:Array.prototype.slice.call(A.array)});const t=this.attributes;for(const o in t){const l=t[o];e.data.attributes[o]=l.toJSON(e.data)}const i={};let r=!1;for(const o in this.morphAttributes){const l=this.morphAttributes[o],c=[];for(let u=0,h=l.length;u<h;u++){const p=l[u];c.push(p.toJSON(e.data))}c.length>0&&(i[o]=c,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const A={};this.name=e.name;const t=e.index;t!==null&&this.setIndex(t.clone(A));const i=e.attributes;for(const l in i){const c=i[l];this.setAttribute(l,c.clone(A))}const r=e.morphAttributes;for(const l in r){const c=[],u=r[l];for(let h=0,p=u.length;h<p;h++)c.push(u[h].clone(A));this.morphAttributes[l]=c}this.morphTargetsRelative=e.morphTargetsRelative;const s=e.groups;for(let l=0,c=s.length;l<c;l++){const u=s[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const o=e.boundingSphere;return o!==null&&(this.boundingSphere=o.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Qu=new CA,Un=new da,ps=new fa,Iu=new I,ui=new I,hi=new I,fi=new I,go=new I,gs=new I,ms=new Se,Bs=new Se,_s=new Se,Lu=new I,Ru=new I,Du=new I,ws=new I,vs=new I;class Mt extends zA{constructor(e=new It,A=new Cl){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=A,this.updateMorphTargets()}copy(e,A){return super.copy(e,A),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const A=this.geometry.morphAttributes,t=Object.keys(A);if(t.length>0){const i=A[t[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=i.length;r<s;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,A){const t=this.geometry,i=t.attributes.position,r=t.morphAttributes.position,s=t.morphTargetsRelative;A.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(r&&a){gs.set(0,0,0);for(let o=0,l=r.length;o<l;o++){const c=a[o],u=r[o];c!==0&&(go.fromBufferAttribute(u,e),s?gs.addScaledVector(go,c):gs.addScaledVector(go.sub(A),c))}A.add(gs)}return A}raycast(e,A){const t=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(t.boundingSphere===null&&t.computeBoundingSphere(),ps.copy(t.boundingSphere),ps.applyMatrix4(r),Un.copy(e.ray).recast(e.near),!(ps.containsPoint(Un.origin)===!1&&(Un.intersectSphere(ps,Iu)===null||Un.origin.distanceToSquared(Iu)>(e.far-e.near)**2))&&(Qu.copy(r).invert(),Un.copy(e.ray).applyMatrix4(Qu),!(t.boundingBox!==null&&Un.intersectsBox(t.boundingBox)===!1)&&this._computeIntersections(e,A,Un)))}_computeIntersections(e,A,t){let i;const r=this.geometry,s=this.material,a=r.index,o=r.attributes.position,l=r.attributes.uv,c=r.attributes.uv1,u=r.attributes.normal,h=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(s))for(let g=0,m=h.length;g<m;g++){const d=h[g],f=s[d.materialIndex],v=Math.max(d.start,p.start),w=Math.min(a.count,Math.min(d.start+d.count,p.start+p.count));for(let C=v,x=w;C<x;C+=3){const U=a.getX(C),y=a.getX(C+1),R=a.getX(C+2);i=Es(this,f,e,t,l,c,u,U,y,R),i&&(i.faceIndex=Math.floor(C/3),i.face.materialIndex=d.materialIndex,A.push(i))}}else{const g=Math.max(0,p.start),m=Math.min(a.count,p.start+p.count);for(let d=g,f=m;d<f;d+=3){const v=a.getX(d),w=a.getX(d+1),C=a.getX(d+2);i=Es(this,s,e,t,l,c,u,v,w,C),i&&(i.faceIndex=Math.floor(d/3),A.push(i))}}else if(o!==void 0)if(Array.isArray(s))for(let g=0,m=h.length;g<m;g++){const d=h[g],f=s[d.materialIndex],v=Math.max(d.start,p.start),w=Math.min(o.count,Math.min(d.start+d.count,p.start+p.count));for(let C=v,x=w;C<x;C+=3){const U=C,y=C+1,R=C+2;i=Es(this,f,e,t,l,c,u,U,y,R),i&&(i.faceIndex=Math.floor(C/3),i.face.materialIndex=d.materialIndex,A.push(i))}}else{const g=Math.max(0,p.start),m=Math.min(o.count,p.start+p.count);for(let d=g,f=m;d<f;d+=3){const v=d,w=d+1,C=d+2;i=Es(this,s,e,t,l,c,u,v,w,C),i&&(i.faceIndex=Math.floor(d/3),A.push(i))}}}}function kw(n,e,A,t,i,r,s,a){let o;if(e.side===kA?o=t.intersectTriangle(s,r,i,!0,a):o=t.intersectTriangle(i,r,s,e.side===Bn,a),o===null)return null;vs.copy(a),vs.applyMatrix4(n.matrixWorld);const l=A.ray.origin.distanceTo(vs);return l<A.near||l>A.far?null:{distance:l,point:vs.clone(),object:n}}function Es(n,e,A,t,i,r,s,a,o,l){n.getVertexPosition(a,ui),n.getVertexPosition(o,hi),n.getVertexPosition(l,fi);const c=kw(n,e,A,t,ui,hi,fi,ws);if(c){i&&(ms.fromBufferAttribute(i,a),Bs.fromBufferAttribute(i,o),_s.fromBufferAttribute(i,l),c.uv=pt.getInterpolation(ws,ui,hi,fi,ms,Bs,_s,new Se)),r&&(ms.fromBufferAttribute(r,a),Bs.fromBufferAttribute(r,o),_s.fromBufferAttribute(r,l),c.uv1=pt.getInterpolation(ws,ui,hi,fi,ms,Bs,_s,new Se),c.uv2=c.uv1),s&&(Lu.fromBufferAttribute(s,a),Ru.fromBufferAttribute(s,o),Du.fromBufferAttribute(s,l),c.normal=pt.getInterpolation(ws,ui,hi,fi,Lu,Ru,Du,new I),c.normal.dot(t.direction)>0&&c.normal.multiplyScalar(-1));const u={a,b:o,c:l,normal:new I,materialIndex:0};pt.getNormal(ui,hi,fi,u.normal),c.face=u}return c}class Qr extends It{constructor(e=1,A=1,t=1,i=1,r=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:A,depth:t,widthSegments:i,heightSegments:r,depthSegments:s};const a=this;i=Math.floor(i),r=Math.floor(r),s=Math.floor(s);const o=[],l=[],c=[],u=[];let h=0,p=0;g("z","y","x",-1,-1,t,A,e,s,r,0),g("z","y","x",1,-1,t,A,-e,s,r,1),g("x","z","y",1,1,e,t,A,i,s,2),g("x","z","y",1,-1,e,t,-A,i,s,3),g("x","y","z",1,-1,e,A,t,i,r,4),g("x","y","z",-1,-1,e,A,-t,i,r,5),this.setIndex(o),this.setAttribute("position",new WA(l,3)),this.setAttribute("normal",new WA(c,3)),this.setAttribute("uv",new WA(u,2));function g(m,d,f,v,w,C,x,U,y,R,B){const M=C/y,z=x/R,J=C/2,Y=x/2,T=U/2,N=y+1,X=R+1;let K=0,ee=0;const Z=new I;for(let q=0;q<X;q++){const Q=q*z-Y;for(let O=0;O<N;O++){const le=O*M-J;Z[m]=le*v,Z[d]=Q*w,Z[f]=T,l.push(Z.x,Z.y,Z.z),Z[m]=0,Z[d]=0,Z[f]=U>0?1:-1,c.push(Z.x,Z.y,Z.z),u.push(O/y),u.push(1-q/R),K+=1}}for(let q=0;q<R;q++)for(let Q=0;Q<y;Q++){const O=h+Q+N*q,le=h+Q+N*(q+1),he=h+(Q+1)+N*(q+1),fe=h+(Q+1)+N*q;o.push(O,le,fe),o.push(le,he,fe),ee+=6}a.addGroup(p,ee,B),p+=ee,h+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ni(n){const e={};for(const A in n){e[A]={};for(const t in n[A]){const i=n[A][t];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[A][t]=null):e[A][t]=i.clone():Array.isArray(i)?e[A][t]=i.slice():e[A][t]=i}}return e}function OA(n){const e={};for(let A=0;A<n.length;A++){const t=Ni(n[A]);for(const i in t)e[i]=t[i]}return e}function zw(n){const e=[];for(let A=0;A<n.length;A++)e.push(n[A].clone());return e}function Vf(n){return n.getRenderTarget()===null?n.outputColorSpace:$e.workingColorSpace}const Ww={clone:Ni,merge:OA};var Xw=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Yw=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class _n extends Tr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Xw,this.fragmentShader=Yw,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ni(e.uniforms),this.uniformsGroups=zw(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const A=super.toJSON(e);A.glslVersion=this.glslVersion,A.uniforms={};for(const i in this.uniforms){const s=this.uniforms[i].value;s&&s.isTexture?A.uniforms[i]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?A.uniforms[i]={type:"c",value:s.getHex()}:s&&s.isVector2?A.uniforms[i]={type:"v2",value:s.toArray()}:s&&s.isVector3?A.uniforms[i]={type:"v3",value:s.toArray()}:s&&s.isVector4?A.uniforms[i]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?A.uniforms[i]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?A.uniforms[i]={type:"m4",value:s.toArray()}:A.uniforms[i]={value:s}}Object.keys(this.defines).length>0&&(A.defines=this.defines),A.vertexShader=this.vertexShader,A.fragmentShader=this.fragmentShader,A.lights=this.lights,A.clipping=this.clipping;const t={};for(const i in this.extensions)this.extensions[i]===!0&&(t[i]=!0);return Object.keys(t).length>0&&(A.extensions=t),A}}class Kf extends zA{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new CA,this.projectionMatrix=new CA,this.projectionMatrixInverse=new CA,this.coordinateSystem=kt}copy(e,A){return super.copy(e,A),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,A){super.updateWorldMatrix(e,A),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class rt extends Kf{constructor(e=50,A=1,t=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=t,this.far=i,this.focus=10,this.aspect=A,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,A){return super.copy(e,A),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const A=.5*this.getFilmHeight()/e;this.fov=Cr*2*Math.atan(A),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(fr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Cr*2*Math.atan(Math.tan(fr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,A,t,i,r,s){this.aspect=e/A,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=A,this.view.offsetX=t,this.view.offsetY=i,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let A=e*Math.tan(fr*.5*this.fov)/this.zoom,t=2*A,i=this.aspect*t,r=-.5*i;const s=this.view;if(this.view!==null&&this.view.enabled){const o=s.fullWidth,l=s.fullHeight;r+=s.offsetX*i/o,A-=s.offsetY*t/l,i*=s.width/o,t*=s.height/l}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,A,A-t,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const A=super.toJSON(e);return A.object.fov=this.fov,A.object.zoom=this.zoom,A.object.near=this.near,A.object.far=this.far,A.object.focus=this.focus,A.object.aspect=this.aspect,this.view!==null&&(A.object.view=Object.assign({},this.view)),A.object.filmGauge=this.filmGauge,A.object.filmOffset=this.filmOffset,A}}const di=-90,pi=1;class Jw extends zA{constructor(e,A,t){super(),this.type="CubeCamera",this.renderTarget=t,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new rt(di,pi,e,A);i.layers=this.layers,this.add(i);const r=new rt(di,pi,e,A);r.layers=this.layers,this.add(r);const s=new rt(di,pi,e,A);s.layers=this.layers,this.add(s);const a=new rt(di,pi,e,A);a.layers=this.layers,this.add(a);const o=new rt(di,pi,e,A);o.layers=this.layers,this.add(o);const l=new rt(di,pi,e,A);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,A=this.children.concat(),[t,i,r,s,a,o]=A;for(const l of A)this.remove(l);if(e===kt)t.up.set(0,1,0),t.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),o.up.set(0,1,0),o.lookAt(0,0,-1);else if(e===Js)t.up.set(0,-1,0),t.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),o.up.set(0,-1,0),o.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of A)this.add(l),l.updateMatrixWorld()}update(e,A){this.parent===null&&this.updateMatrixWorld();const{renderTarget:t,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,s,a,o,l,c]=this.children,u=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const m=t.texture.generateMipmaps;t.texture.generateMipmaps=!1,e.setRenderTarget(t,0,i),e.render(A,r),e.setRenderTarget(t,1,i),e.render(A,s),e.setRenderTarget(t,2,i),e.render(A,a),e.setRenderTarget(t,3,i),e.render(A,o),e.setRenderTarget(t,4,i),e.render(A,l),t.texture.generateMipmaps=m,e.setRenderTarget(t,5,i),e.render(A,c),e.setRenderTarget(u,h,p),e.xr.enabled=g,t.texture.needsPMREMUpdate=!0}}class kf extends jA{constructor(e,A,t,i,r,s,a,o,l,c){e=e!==void 0?e:[],A=A!==void 0?A:Hi,super(e,A,t,i,r,s,a,o,l,c),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class qw extends kn{constructor(e=1,A={}){super(e,e,A),this.isWebGLCubeRenderTarget=!0;const t={width:e,height:e,depth:1},i=[t,t,t,t,t,t];A.encoding!==void 0&&(pr("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),A.colorSpace=A.encoding===Kn?UA:st),this.texture=new kf(i,A.mapping,A.wrapS,A.wrapT,A.magFilter,A.minFilter,A.format,A.type,A.anisotropy,A.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=A.generateMipmaps!==void 0?A.generateMipmaps:!1,this.texture.minFilter=A.minFilter!==void 0?A.minFilter:it}fromEquirectangularTexture(e,A){this.texture.type=A.type,this.texture.colorSpace=A.colorSpace,this.texture.generateMipmaps=A.generateMipmaps,this.texture.minFilter=A.minFilter,this.texture.magFilter=A.magFilter;const t={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Qr(5,5,5),r=new _n({name:"CubemapFromEquirect",uniforms:Ni(t.uniforms),vertexShader:t.vertexShader,fragmentShader:t.fragmentShader,side:kA,blending:fn});r.uniforms.tEquirect.value=A;const s=new Mt(i,r),a=A.minFilter;return A.minFilter===vr&&(A.minFilter=it),new Jw(1,10,this).update(e,s),A.minFilter=a,s.geometry.dispose(),s.material.dispose(),this}clear(e,A,t,i){const r=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(A,t,i);e.setRenderTarget(r)}}const mo=new I,Zw=new I,jw=new ze;class tn{constructor(e=new I(1,0,0),A=0){this.isPlane=!0,this.normal=e,this.constant=A}set(e,A){return this.normal.copy(e),this.constant=A,this}setComponents(e,A,t,i){return this.normal.set(e,A,t),this.constant=i,this}setFromNormalAndCoplanarPoint(e,A){return this.normal.copy(e),this.constant=-A.dot(this.normal),this}setFromCoplanarPoints(e,A,t){const i=mo.subVectors(t,A).cross(Zw.subVectors(e,A)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,A){return A.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,A){const t=e.delta(mo),i=this.normal.dot(t);if(i===0)return this.distanceToPoint(e.start)===0?A.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:A.copy(e.start).addScaledVector(t,r)}intersectsLine(e){const A=this.distanceToPoint(e.start),t=this.distanceToPoint(e.end);return A<0&&t>0||t<0&&A>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,A){const t=A||jw.getNormalMatrix(e),i=this.coplanarPoint(mo).applyMatrix4(e),r=this.normal.applyMatrix3(t).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const yn=new fa,Cs=new I;class zf{constructor(e=new tn,A=new tn,t=new tn,i=new tn,r=new tn,s=new tn){this.planes=[e,A,t,i,r,s]}set(e,A,t,i,r,s){const a=this.planes;return a[0].copy(e),a[1].copy(A),a[2].copy(t),a[3].copy(i),a[4].copy(r),a[5].copy(s),this}copy(e){const A=this.planes;for(let t=0;t<6;t++)A[t].copy(e.planes[t]);return this}setFromProjectionMatrix(e,A=kt){const t=this.planes,i=e.elements,r=i[0],s=i[1],a=i[2],o=i[3],l=i[4],c=i[5],u=i[6],h=i[7],p=i[8],g=i[9],m=i[10],d=i[11],f=i[12],v=i[13],w=i[14],C=i[15];if(t[0].setComponents(o-r,h-l,d-p,C-f).normalize(),t[1].setComponents(o+r,h+l,d+p,C+f).normalize(),t[2].setComponents(o+s,h+c,d+g,C+v).normalize(),t[3].setComponents(o-s,h-c,d-g,C-v).normalize(),t[4].setComponents(o-a,h-u,d-m,C-w).normalize(),A===kt)t[5].setComponents(o+a,h+u,d+m,C+w).normalize();else if(A===Js)t[5].setComponents(a,u,m,w).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+A);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),yn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const A=e.geometry;A.boundingSphere===null&&A.computeBoundingSphere(),yn.copy(A.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(yn)}intersectsSprite(e){return yn.center.set(0,0,0),yn.radius=.7071067811865476,yn.applyMatrix4(e.matrixWorld),this.intersectsSphere(yn)}intersectsSphere(e){const A=this.planes,t=e.center,i=-e.radius;for(let r=0;r<6;r++)if(A[r].distanceToPoint(t)<i)return!1;return!0}intersectsBox(e){const A=this.planes;for(let t=0;t<6;t++){const i=A[t];if(Cs.x=i.normal.x>0?e.max.x:e.min.x,Cs.y=i.normal.y>0?e.max.y:e.min.y,Cs.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Cs)<0)return!1}return!0}containsPoint(e){const A=this.planes;for(let t=0;t<6;t++)if(A[t].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Wf(){let n=null,e=!1,A=null,t=null;function i(r,s){A(r,s),t=n.requestAnimationFrame(i)}return{start:function(){e!==!0&&A!==null&&(t=n.requestAnimationFrame(i),e=!0)},stop:function(){n.cancelAnimationFrame(t),e=!1},setAnimationLoop:function(r){A=r},setContext:function(r){n=r}}}function $w(n,e){const A=e.isWebGL2,t=new WeakMap;function i(l,c){const u=l.array,h=l.usage,p=n.createBuffer();n.bindBuffer(c,p),n.bufferData(c,u,h),l.onUploadCallback();let g;if(u instanceof Float32Array)g=n.FLOAT;else if(u instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(A)g=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=n.UNSIGNED_SHORT;else if(u instanceof Int16Array)g=n.SHORT;else if(u instanceof Uint32Array)g=n.UNSIGNED_INT;else if(u instanceof Int32Array)g=n.INT;else if(u instanceof Int8Array)g=n.BYTE;else if(u instanceof Uint8Array)g=n.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)g=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:p,type:g,bytesPerElement:u.BYTES_PER_ELEMENT,version:l.version}}function r(l,c,u){const h=c.array,p=c.updateRange;n.bindBuffer(u,l),p.count===-1?n.bufferSubData(u,0,h):(A?n.bufferSubData(u,p.offset*h.BYTES_PER_ELEMENT,h,p.offset,p.count):n.bufferSubData(u,p.offset*h.BYTES_PER_ELEMENT,h.subarray(p.offset,p.offset+p.count)),p.count=-1),c.onUploadCallback()}function s(l){return l.isInterleavedBufferAttribute&&(l=l.data),t.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);const c=t.get(l);c&&(n.deleteBuffer(c.buffer),t.delete(l))}function o(l,c){if(l.isGLBufferAttribute){const h=t.get(l);(!h||h.version<l.version)&&t.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);const u=t.get(l);u===void 0?t.set(l,i(l,c)):u.version<l.version&&(r(u.buffer,l,c),u.version=l.version)}return{get:s,remove:a,update:o}}class xl extends It{constructor(e=1,A=1,t=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:A,widthSegments:t,heightSegments:i};const r=e/2,s=A/2,a=Math.floor(t),o=Math.floor(i),l=a+1,c=o+1,u=e/a,h=A/o,p=[],g=[],m=[],d=[];for(let f=0;f<c;f++){const v=f*h-s;for(let w=0;w<l;w++){const C=w*u-r;g.push(C,-v,0),m.push(0,0,1),d.push(w/a),d.push(1-f/o)}}for(let f=0;f<o;f++)for(let v=0;v<a;v++){const w=v+l*f,C=v+l*(f+1),x=v+1+l*(f+1),U=v+1+l*f;p.push(w,C,U),p.push(C,x,U)}this.setIndex(p),this.setAttribute("position",new WA(g,3)),this.setAttribute("normal",new WA(m,3)),this.setAttribute("uv",new WA(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xl(e.width,e.height,e.widthSegments,e.heightSegments)}}var ev=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Av=`#ifdef USE_ALPHAHASH
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
#endif`,tv=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,nv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,iv=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,rv=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,sv=`#ifdef USE_AOMAP
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
#endif`,av=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ov=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,lv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,cv=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,uv=`#ifdef USE_IRIDESCENCE
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
#endif`,hv=`#ifdef USE_BUMPMAP
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
#endif`,fv=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
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
#endif`,dv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,pv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,gv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,mv=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Bv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,_v=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,wv=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,vv=`#define PI 3.141592653589793
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
} // validated`,Ev=`#ifdef ENVMAP_TYPE_CUBE_UV
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
	#define cubeUV_v0 0.339
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_v1 0.276
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_v4 0.046
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_v5 0.016
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_v6 0.0038
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
#endif`,Cv=`vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,xv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Uv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,yv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Sv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Mv="gl_FragColor = linearToOutputTexel( gl_FragColor );",Fv=`
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
}`,bv=`#ifdef USE_ENVMAP
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
#endif`,Tv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Qv=`#ifdef USE_ENVMAP
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
#endif`,Iv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Lv=`#ifdef USE_ENVMAP
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
#endif`,Rv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Dv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Hv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Pv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ov=`#ifdef USE_GRADIENTMAP
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
}`,Nv=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Gv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Vv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Kv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,kv=`uniform bool receiveShadow;
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
#endif`,zv=`#ifdef USE_ENVMAP
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
#endif`,Wv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Xv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Yv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Jv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,qv=`PhysicalMaterial material;
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
	anisotropyV /= material.anisotropy;
	material.anisotropy = saturate( material.anisotropy );
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x - tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x + tbn[ 0 ] * anisotropyV.y;
#endif`,Zv=`struct PhysicalMaterial {
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
}`,jv=`
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
#endif`,$v=`#if defined( RE_IndirectDiffuse )
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
#endif`,eE=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,AE=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,tE=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,nE=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,iE=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,rE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,sE=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,aE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,oE=`#if defined( USE_POINTS_UV )
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
#endif`,lE=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,cE=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,uE=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,hE=`#ifdef USE_MORPHNORMALS
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
#endif`,fE=`#ifdef USE_MORPHTARGETS
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
#endif`,dE=`#ifdef USE_MORPHTARGETS
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
#endif`,pE=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,gE=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,mE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,BE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_E=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,wE=`#ifdef USE_NORMALMAP
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
#endif`,vE=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,EE=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,CE=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,xE=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,UE=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,yE=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,SE=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ME=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,FE=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,bE=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,TE=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,QE=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,IE=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,LE=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,RE=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,DE=`float getShadowMask() {
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
}`,HE=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,PE=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	uniform int boneTextureSize;
	mat4 getBoneMatrix( const in float i ) {
		float j = i * 4.0;
		float x = mod( j, float( boneTextureSize ) );
		float y = floor( j / float( boneTextureSize ) );
		float dx = 1.0 / float( boneTextureSize );
		float dy = 1.0 / float( boneTextureSize );
		y = dy * ( y + 0.5 );
		vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
		vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
		vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
		vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
		mat4 bone = mat4( v1, v2, v3, v4 );
		return bone;
	}
#endif`,OE=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,NE=`#ifdef USE_SKINNING
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
#endif`,GE=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,VE=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,KE=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,kE=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,zE=`#ifdef USE_TRANSMISSION
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
#endif`,WE=`#ifdef USE_TRANSMISSION
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
#endif`,XE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,YE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,JE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,qE=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ZE=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,jE=`uniform sampler2D t2D;
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
}`,$E=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,eC=`#ifdef ENVMAP_TYPE_CUBE
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
}`,AC=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,tC=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nC=`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
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
}`,iC=`#if DEPTH_PACKING == 3200
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
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
}`,rC=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
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
}`,sC=`#define DISTANCE
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,aC=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,oC=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lC=`uniform float scale;
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
}`,cC=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,uC=`#include <common>
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
}`,hC=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,fC=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
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
}`,dC=`#define LAMBERT
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,pC=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
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
}`,gC=`#define MATCAP
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,mC=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
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
}`,BC=`#define NORMAL
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
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,_C=`#define PHONG
varying vec3 vViewPosition;
#include <common>
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
}`,wC=`#define PHONG
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,vC=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
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
}`,EC=`#define STANDARD
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,CC=`#define TOON
varying vec3 vViewPosition;
#include <common>
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
}`,xC=`#define TOON
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,UC=`uniform float size;
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
}`,yC=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,SC=`#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
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
}`,MC=`uniform vec3 color;
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
}`,FC=`uniform float rotation;
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
}`,bC=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,Ve={alphahash_fragment:ev,alphahash_pars_fragment:Av,alphamap_fragment:tv,alphamap_pars_fragment:nv,alphatest_fragment:iv,alphatest_pars_fragment:rv,aomap_fragment:sv,aomap_pars_fragment:av,begin_vertex:ov,beginnormal_vertex:lv,bsdfs:cv,iridescence_fragment:uv,bumpmap_pars_fragment:hv,clipping_planes_fragment:fv,clipping_planes_pars_fragment:dv,clipping_planes_pars_vertex:pv,clipping_planes_vertex:gv,color_fragment:mv,color_pars_fragment:Bv,color_pars_vertex:_v,color_vertex:wv,common:vv,cube_uv_reflection_fragment:Ev,defaultnormal_vertex:Cv,displacementmap_pars_vertex:xv,displacementmap_vertex:Uv,emissivemap_fragment:yv,emissivemap_pars_fragment:Sv,colorspace_fragment:Mv,colorspace_pars_fragment:Fv,envmap_fragment:bv,envmap_common_pars_fragment:Tv,envmap_pars_fragment:Qv,envmap_pars_vertex:Iv,envmap_physical_pars_fragment:zv,envmap_vertex:Lv,fog_vertex:Rv,fog_pars_vertex:Dv,fog_fragment:Hv,fog_pars_fragment:Pv,gradientmap_pars_fragment:Ov,lightmap_fragment:Nv,lightmap_pars_fragment:Gv,lights_lambert_fragment:Vv,lights_lambert_pars_fragment:Kv,lights_pars_begin:kv,lights_toon_fragment:Wv,lights_toon_pars_fragment:Xv,lights_phong_fragment:Yv,lights_phong_pars_fragment:Jv,lights_physical_fragment:qv,lights_physical_pars_fragment:Zv,lights_fragment_begin:jv,lights_fragment_maps:$v,lights_fragment_end:eE,logdepthbuf_fragment:AE,logdepthbuf_pars_fragment:tE,logdepthbuf_pars_vertex:nE,logdepthbuf_vertex:iE,map_fragment:rE,map_pars_fragment:sE,map_particle_fragment:aE,map_particle_pars_fragment:oE,metalnessmap_fragment:lE,metalnessmap_pars_fragment:cE,morphcolor_vertex:uE,morphnormal_vertex:hE,morphtarget_pars_vertex:fE,morphtarget_vertex:dE,normal_fragment_begin:pE,normal_fragment_maps:gE,normal_pars_fragment:mE,normal_pars_vertex:BE,normal_vertex:_E,normalmap_pars_fragment:wE,clearcoat_normal_fragment_begin:vE,clearcoat_normal_fragment_maps:EE,clearcoat_pars_fragment:CE,iridescence_pars_fragment:xE,opaque_fragment:UE,packing:yE,premultiplied_alpha_fragment:SE,project_vertex:ME,dithering_fragment:FE,dithering_pars_fragment:bE,roughnessmap_fragment:TE,roughnessmap_pars_fragment:QE,shadowmap_pars_fragment:IE,shadowmap_pars_vertex:LE,shadowmap_vertex:RE,shadowmask_pars_fragment:DE,skinbase_vertex:HE,skinning_pars_vertex:PE,skinning_vertex:OE,skinnormal_vertex:NE,specularmap_fragment:GE,specularmap_pars_fragment:VE,tonemapping_fragment:KE,tonemapping_pars_fragment:kE,transmission_fragment:zE,transmission_pars_fragment:WE,uv_pars_fragment:XE,uv_pars_vertex:YE,uv_vertex:JE,worldpos_vertex:qE,background_vert:ZE,background_frag:jE,backgroundCube_vert:$E,backgroundCube_frag:eC,cube_vert:AC,cube_frag:tC,depth_vert:nC,depth_frag:iC,distanceRGBA_vert:rC,distanceRGBA_frag:sC,equirect_vert:aC,equirect_frag:oC,linedashed_vert:lC,linedashed_frag:cC,meshbasic_vert:uC,meshbasic_frag:hC,meshlambert_vert:fC,meshlambert_frag:dC,meshmatcap_vert:pC,meshmatcap_frag:gC,meshnormal_vert:mC,meshnormal_frag:BC,meshphong_vert:_C,meshphong_frag:wC,meshphysical_vert:vC,meshphysical_frag:EC,meshtoon_vert:CC,meshtoon_frag:xC,points_vert:UC,points_frag:yC,shadow_vert:SC,shadow_frag:MC,sprite_vert:FC,sprite_frag:bC},ue={common:{diffuse:{value:new Ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ze}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ze},normalScale:{value:new Se(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0},uvTransform:{value:new ze}},sprite:{diffuse:{value:new Ze(16777215)},opacity:{value:1},center:{value:new Se(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}}},yt={basic:{uniforms:OA([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.fog]),vertexShader:Ve.meshbasic_vert,fragmentShader:Ve.meshbasic_frag},lambert:{uniforms:OA([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new Ze(0)}}]),vertexShader:Ve.meshlambert_vert,fragmentShader:Ve.meshlambert_frag},phong:{uniforms:OA([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new Ze(0)},specular:{value:new Ze(1118481)},shininess:{value:30}}]),vertexShader:Ve.meshphong_vert,fragmentShader:Ve.meshphong_frag},standard:{uniforms:OA([ue.common,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.roughnessmap,ue.metalnessmap,ue.fog,ue.lights,{emissive:{value:new Ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag},toon:{uniforms:OA([ue.common,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.gradientmap,ue.fog,ue.lights,{emissive:{value:new Ze(0)}}]),vertexShader:Ve.meshtoon_vert,fragmentShader:Ve.meshtoon_frag},matcap:{uniforms:OA([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,{matcap:{value:null}}]),vertexShader:Ve.meshmatcap_vert,fragmentShader:Ve.meshmatcap_frag},points:{uniforms:OA([ue.points,ue.fog]),vertexShader:Ve.points_vert,fragmentShader:Ve.points_frag},dashed:{uniforms:OA([ue.common,ue.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ve.linedashed_vert,fragmentShader:Ve.linedashed_frag},depth:{uniforms:OA([ue.common,ue.displacementmap]),vertexShader:Ve.depth_vert,fragmentShader:Ve.depth_frag},normal:{uniforms:OA([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,{opacity:{value:1}}]),vertexShader:Ve.meshnormal_vert,fragmentShader:Ve.meshnormal_frag},sprite:{uniforms:OA([ue.sprite,ue.fog]),vertexShader:Ve.sprite_vert,fragmentShader:Ve.sprite_frag},background:{uniforms:{uvTransform:{value:new ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ve.background_vert,fragmentShader:Ve.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ve.backgroundCube_vert,fragmentShader:Ve.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ve.cube_vert,fragmentShader:Ve.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ve.equirect_vert,fragmentShader:Ve.equirect_frag},distanceRGBA:{uniforms:OA([ue.common,ue.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ve.distanceRGBA_vert,fragmentShader:Ve.distanceRGBA_frag},shadow:{uniforms:OA([ue.lights,ue.fog,{color:{value:new Ze(0)},opacity:{value:1}}]),vertexShader:Ve.shadow_vert,fragmentShader:Ve.shadow_frag}};yt.physical={uniforms:OA([yt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ze},clearcoatNormalScale:{value:new Se(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ze},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ze},sheen:{value:0},sheenColor:{value:new Ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ze},transmissionSamplerSize:{value:new Se},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ze},attenuationDistance:{value:0},attenuationColor:{value:new Ze(0)},specularColor:{value:new Ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ze},anisotropyVector:{value:new Se},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ze}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag};const xs={r:0,b:0,g:0};function TC(n,e,A,t,i,r,s){const a=new Ze(0);let o=r===!0?0:1,l,c,u=null,h=0,p=null;function g(d,f){let v=!1,w=f.isScene===!0?f.background:null;w&&w.isTexture&&(w=(f.backgroundBlurriness>0?A:e).get(w)),w===null?m(a,o):w&&w.isColor&&(m(w,1),v=!0);const C=n.xr.getEnvironmentBlendMode();C==="additive"?t.buffers.color.setClear(0,0,0,1,s):C==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||v)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),w&&(w.isCubeTexture||w.mapping===ua)?(c===void 0&&(c=new Mt(new Qr(1,1,1),new _n({name:"BackgroundCubeMaterial",uniforms:Ni(yt.backgroundCube.uniforms),vertexShader:yt.backgroundCube.vertexShader,fragmentShader:yt.backgroundCube.fragmentShader,side:kA,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(x,U,y){this.matrixWorld.copyPosition(y.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=w,c.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=f.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,c.material.toneMapped=$e.getTransfer(w.colorSpace)!==iA,(u!==w||h!==w.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,u=w,h=w.version,p=n.toneMapping),c.layers.enableAll(),d.unshift(c,c.geometry,c.material,0,0,null)):w&&w.isTexture&&(l===void 0&&(l=new Mt(new xl(2,2),new _n({name:"BackgroundMaterial",uniforms:Ni(yt.background.uniforms),vertexShader:yt.background.vertexShader,fragmentShader:yt.background.fragmentShader,side:Bn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=w,l.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,l.material.toneMapped=$e.getTransfer(w.colorSpace)!==iA,w.matrixAutoUpdate===!0&&w.updateMatrix(),l.material.uniforms.uvTransform.value.copy(w.matrix),(u!==w||h!==w.version||p!==n.toneMapping)&&(l.material.needsUpdate=!0,u=w,h=w.version,p=n.toneMapping),l.layers.enableAll(),d.unshift(l,l.geometry,l.material,0,0,null))}function m(d,f){d.getRGB(xs,Vf(n)),t.buffers.color.setClear(xs.r,xs.g,xs.b,f,s)}return{getClearColor:function(){return a},setClearColor:function(d,f=1){a.set(d),o=f,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(d){o=d,m(a,o)},render:g}}function QC(n,e,A,t){const i=n.getParameter(n.MAX_VERTEX_ATTRIBS),r=t.isWebGL2?null:e.get("OES_vertex_array_object"),s=t.isWebGL2||r!==null,a={},o=d(null);let l=o,c=!1;function u(T,N,X,K,ee){let Z=!1;if(s){const q=m(K,X,N);l!==q&&(l=q,p(l.object)),Z=f(T,K,X,ee),Z&&v(T,K,X,ee)}else{const q=N.wireframe===!0;(l.geometry!==K.id||l.program!==X.id||l.wireframe!==q)&&(l.geometry=K.id,l.program=X.id,l.wireframe=q,Z=!0)}ee!==null&&A.update(ee,n.ELEMENT_ARRAY_BUFFER),(Z||c)&&(c=!1,R(T,N,X,K),ee!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,A.get(ee).buffer))}function h(){return t.isWebGL2?n.createVertexArray():r.createVertexArrayOES()}function p(T){return t.isWebGL2?n.bindVertexArray(T):r.bindVertexArrayOES(T)}function g(T){return t.isWebGL2?n.deleteVertexArray(T):r.deleteVertexArrayOES(T)}function m(T,N,X){const K=X.wireframe===!0;let ee=a[T.id];ee===void 0&&(ee={},a[T.id]=ee);let Z=ee[N.id];Z===void 0&&(Z={},ee[N.id]=Z);let q=Z[K];return q===void 0&&(q=d(h()),Z[K]=q),q}function d(T){const N=[],X=[],K=[];for(let ee=0;ee<i;ee++)N[ee]=0,X[ee]=0,K[ee]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:X,attributeDivisors:K,object:T,attributes:{},index:null}}function f(T,N,X,K){const ee=l.attributes,Z=N.attributes;let q=0;const Q=X.getAttributes();for(const O in Q)if(Q[O].location>=0){const he=ee[O];let fe=Z[O];if(fe===void 0&&(O==="instanceMatrix"&&T.instanceMatrix&&(fe=T.instanceMatrix),O==="instanceColor"&&T.instanceColor&&(fe=T.instanceColor)),he===void 0||he.attribute!==fe||fe&&he.data!==fe.data)return!0;q++}return l.attributesNum!==q||l.index!==K}function v(T,N,X,K){const ee={},Z=N.attributes;let q=0;const Q=X.getAttributes();for(const O in Q)if(Q[O].location>=0){let he=Z[O];he===void 0&&(O==="instanceMatrix"&&T.instanceMatrix&&(he=T.instanceMatrix),O==="instanceColor"&&T.instanceColor&&(he=T.instanceColor));const fe={};fe.attribute=he,he&&he.data&&(fe.data=he.data),ee[O]=fe,q++}l.attributes=ee,l.attributesNum=q,l.index=K}function w(){const T=l.newAttributes;for(let N=0,X=T.length;N<X;N++)T[N]=0}function C(T){x(T,0)}function x(T,N){const X=l.newAttributes,K=l.enabledAttributes,ee=l.attributeDivisors;X[T]=1,K[T]===0&&(n.enableVertexAttribArray(T),K[T]=1),ee[T]!==N&&((t.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[t.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](T,N),ee[T]=N)}function U(){const T=l.newAttributes,N=l.enabledAttributes;for(let X=0,K=N.length;X<K;X++)N[X]!==T[X]&&(n.disableVertexAttribArray(X),N[X]=0)}function y(T,N,X,K,ee,Z,q){q===!0?n.vertexAttribIPointer(T,N,X,ee,Z):n.vertexAttribPointer(T,N,X,K,ee,Z)}function R(T,N,X,K){if(t.isWebGL2===!1&&(T.isInstancedMesh||K.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;w();const ee=K.attributes,Z=X.getAttributes(),q=N.defaultAttributeValues;for(const Q in Z){const O=Z[Q];if(O.location>=0){let le=ee[Q];if(le===void 0&&(Q==="instanceMatrix"&&T.instanceMatrix&&(le=T.instanceMatrix),Q==="instanceColor"&&T.instanceColor&&(le=T.instanceColor)),le!==void 0){const he=le.normalized,fe=le.itemSize,Ce=A.get(le);if(Ce===void 0)continue;const Re=Ce.buffer,Te=Ce.type,De=Ce.bytesPerElement,nA=t.isWebGL2===!0&&(Te===n.INT||Te===n.UNSIGNED_INT||le.gpuType===Mf);if(le.isInterleavedBufferAttribute){const Ge=le.data,D=Ge.stride,MA=le.offset;if(Ge.isInstancedInterleavedBuffer){for(let Ue=0;Ue<O.locationSize;Ue++)x(O.location+Ue,Ge.meshPerAttribute);T.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=Ge.meshPerAttribute*Ge.count)}else for(let Ue=0;Ue<O.locationSize;Ue++)C(O.location+Ue);n.bindBuffer(n.ARRAY_BUFFER,Re);for(let Ue=0;Ue<O.locationSize;Ue++)y(O.location+Ue,fe/O.locationSize,Te,he,D*De,(MA+fe/O.locationSize*Ue)*De,nA)}else{if(le.isInstancedBufferAttribute){for(let Ge=0;Ge<O.locationSize;Ge++)x(O.location+Ge,le.meshPerAttribute);T.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let Ge=0;Ge<O.locationSize;Ge++)C(O.location+Ge);n.bindBuffer(n.ARRAY_BUFFER,Re);for(let Ge=0;Ge<O.locationSize;Ge++)y(O.location+Ge,fe/O.locationSize,Te,he,fe*De,fe/O.locationSize*Ge*De,nA)}}else if(q!==void 0){const he=q[Q];if(he!==void 0)switch(he.length){case 2:n.vertexAttrib2fv(O.location,he);break;case 3:n.vertexAttrib3fv(O.location,he);break;case 4:n.vertexAttrib4fv(O.location,he);break;default:n.vertexAttrib1fv(O.location,he)}}}}U()}function B(){J();for(const T in a){const N=a[T];for(const X in N){const K=N[X];for(const ee in K)g(K[ee].object),delete K[ee];delete N[X]}delete a[T]}}function M(T){if(a[T.id]===void 0)return;const N=a[T.id];for(const X in N){const K=N[X];for(const ee in K)g(K[ee].object),delete K[ee];delete N[X]}delete a[T.id]}function z(T){for(const N in a){const X=a[N];if(X[T.id]===void 0)continue;const K=X[T.id];for(const ee in K)g(K[ee].object),delete K[ee];delete X[T.id]}}function J(){Y(),c=!0,l!==o&&(l=o,p(l.object))}function Y(){o.geometry=null,o.program=null,o.wireframe=!1}return{setup:u,reset:J,resetDefaultState:Y,dispose:B,releaseStatesOfGeometry:M,releaseStatesOfProgram:z,initAttributes:w,enableAttribute:C,disableUnusedAttributes:U}}function IC(n,e,A,t){const i=t.isWebGL2;let r;function s(l){r=l}function a(l,c){n.drawArrays(r,l,c),A.update(c,r,1)}function o(l,c,u){if(u===0)return;let h,p;if(i)h=n,p="drawArraysInstanced";else if(h=e.get("ANGLE_instanced_arrays"),p="drawArraysInstancedANGLE",h===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}h[p](r,l,c,u),A.update(c,r,u)}this.setMode=s,this.render=a,this.renderInstances=o}function LC(n,e,A){let t;function i(){if(t!==void 0)return t;if(e.has("EXT_texture_filter_anisotropic")===!0){const y=e.get("EXT_texture_filter_anisotropic");t=n.getParameter(y.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else t=0;return t}function r(y){if(y==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";y="mediump"}return y==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const s=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext";let a=A.precision!==void 0?A.precision:"highp";const o=r(a);o!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",o,"instead."),a=o);const l=s||e.has("WEBGL_draw_buffers"),c=A.logarithmicDepthBuffer===!0,u=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),h=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),d=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),f=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),w=h>0,C=s||e.has("OES_texture_float"),x=w&&C,U=s?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:s,drawBuffers:l,getMaxAnisotropy:i,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:c,maxTextures:u,maxVertexTextures:h,maxTextureSize:p,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:d,maxVaryings:f,maxFragmentUniforms:v,vertexTextures:w,floatFragmentTextures:C,floatVertexTextures:x,maxSamples:U}}function RC(n){const e=this;let A=null,t=0,i=!1,r=!1;const s=new tn,a=new ze,o={value:null,needsUpdate:!1};this.uniform=o,this.numPlanes=0,this.numIntersection=0,this.init=function(u,h){const p=u.length!==0||h||t!==0||i;return i=h,t=u.length,p},this.beginShadows=function(){r=!0,c(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,h){A=c(u,h,0)},this.setState=function(u,h,p){const g=u.clippingPlanes,m=u.clipIntersection,d=u.clipShadows,f=n.get(u);if(!i||g===null||g.length===0||r&&!d)r?c(null):l();else{const v=r?0:t,w=v*4;let C=f.clippingState||null;o.value=C,C=c(g,h,w,p);for(let x=0;x!==w;++x)C[x]=A[x];f.clippingState=C,this.numIntersection=m?this.numPlanes:0,this.numPlanes+=v}};function l(){o.value!==A&&(o.value=A,o.needsUpdate=t>0),e.numPlanes=t,e.numIntersection=0}function c(u,h,p,g){const m=u!==null?u.length:0;let d=null;if(m!==0){if(d=o.value,g!==!0||d===null){const f=p+m*4,v=h.matrixWorldInverse;a.getNormalMatrix(v),(d===null||d.length<f)&&(d=new Float32Array(f));for(let w=0,C=p;w!==m;++w,C+=4)s.copy(u[w]).applyMatrix4(v,a),s.normal.toArray(d,C),d[C+3]=s.constant}o.value=d,o.needsUpdate=!0}return e.numPlanes=m,e.numIntersection=0,d}}function DC(n){let e=new WeakMap;function A(s,a){return a===el?s.mapping=Hi:a===Al&&(s.mapping=Pi),s}function t(s){if(s&&s.isTexture&&s.isRenderTargetTexture===!1){const a=s.mapping;if(a===el||a===Al)if(e.has(s)){const o=e.get(s).texture;return A(o,s.mapping)}else{const o=s.image;if(o&&o.height>0){const l=new qw(o.height/2);return l.fromEquirectangularTexture(n,s),e.set(s,l),s.addEventListener("dispose",i),A(l.texture,s.mapping)}else return null}}return s}function i(s){const a=s.target;a.removeEventListener("dispose",i);const o=e.get(a);o!==void 0&&(e.delete(a),o.dispose())}function r(){e=new WeakMap}return{get:t,dispose:r}}class HC extends Kf{constructor(e=-1,A=1,t=1,i=-1,r=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=A,this.top=t,this.bottom=i,this.near=r,this.far=s,this.updateProjectionMatrix()}copy(e,A){return super.copy(e,A),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,A,t,i,r,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=A,this.view.offsetX=t,this.view.offsetY=i,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),A=(this.top-this.bottom)/(2*this.zoom),t=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=t-e,s=t+e,a=i+A,o=i-A;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,s=r+l*this.view.width,a-=c*this.view.offsetY,o=a-c*this.view.height}this.projectionMatrix.makeOrthographic(r,s,a,o,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const A=super.toJSON(e);return A.object.zoom=this.zoom,A.object.left=this.left,A.object.right=this.right,A.object.top=this.top,A.object.bottom=this.bottom,A.object.near=this.near,A.object.far=this.far,this.view!==null&&(A.object.view=Object.assign({},this.view)),A}}const Ei=4,Hu=[.125,.215,.35,.446,.526,.582],bn=20,Bo=new HC,Pu=new Ze;let _o=null,wo=0,vo=0;const Sn=(1+Math.sqrt(5))/2,gi=1/Sn,Ou=[new I(1,1,1),new I(-1,1,1),new I(1,1,-1),new I(-1,1,-1),new I(0,Sn,gi),new I(0,Sn,-gi),new I(gi,0,Sn),new I(-gi,0,Sn),new I(Sn,gi,0),new I(-Sn,gi,0)];class Nu{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,A=0,t=.1,i=100){_o=this._renderer.getRenderTarget(),wo=this._renderer.getActiveCubeFace(),vo=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,t,i,r),A>0&&this._blur(r,0,0,A),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,A=null){return this._fromTexture(e,A)}fromCubemap(e,A=null){return this._fromTexture(e,A)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ku(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Vu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(_o,wo,vo),e.scissorTest=!1,Us(e,0,0,e.width,e.height)}_fromTexture(e,A){e.mapping===Hi||e.mapping===Pi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),_o=this._renderer.getRenderTarget(),wo=this._renderer.getActiveCubeFace(),vo=this._renderer.getActiveMipmapLevel();const t=A||this._allocateTargets();return this._textureToCubeUV(e,t),this._applyPMREM(t),this._cleanup(t),t}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),A=4*this._cubeSize,t={magFilter:it,minFilter:it,generateMipmaps:!1,type:Er,format:Bt,colorSpace:Xt,depthBuffer:!1},i=Gu(e,A,t);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==A){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Gu(e,A,t);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=PC(r)),this._blurMaterial=OC(r,e,A)}return i}_compileMaterial(e){const A=new Mt(this._lodPlanes[0],e);this._renderer.compile(A,Bo)}_sceneToCubeUV(e,A,t,i){const a=new rt(90,1,A,t),o=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],c=this._renderer,u=c.autoClear,h=c.toneMapping;c.getClearColor(Pu),c.toneMapping=dn,c.autoClear=!1;const p=new Cl({name:"PMREM.Background",side:kA,depthWrite:!1,depthTest:!1}),g=new Mt(new Qr,p);let m=!1;const d=e.background;d?d.isColor&&(p.color.copy(d),e.background=null,m=!0):(p.color.copy(Pu),m=!0);for(let f=0;f<6;f++){const v=f%3;v===0?(a.up.set(0,o[f],0),a.lookAt(l[f],0,0)):v===1?(a.up.set(0,0,o[f]),a.lookAt(0,l[f],0)):(a.up.set(0,o[f],0),a.lookAt(0,0,l[f]));const w=this._cubeSize;Us(i,v*w,f>2?w:0,w,w),c.setRenderTarget(i),m&&c.render(g,a),c.render(e,a)}g.geometry.dispose(),g.material.dispose(),c.toneMapping=h,c.autoClear=u,e.background=d}_textureToCubeUV(e,A){const t=this._renderer,i=e.mapping===Hi||e.mapping===Pi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ku()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Vu());const r=i?this._cubemapMaterial:this._equirectMaterial,s=new Mt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const o=this._cubeSize;Us(A,0,0,3*o,2*o),t.setRenderTarget(A),t.render(s,Bo)}_applyPMREM(e){const A=this._renderer,t=A.autoClear;A.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const r=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),s=Ou[(i-1)%Ou.length];this._blur(e,i-1,i,r,s)}A.autoClear=t}_blur(e,A,t,i,r){const s=this._pingPongRenderTarget;this._halfBlur(e,s,A,t,i,"latitudinal",r),this._halfBlur(s,e,t,t,i,"longitudinal",r)}_halfBlur(e,A,t,i,r,s,a){const o=this._renderer,l=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const c=3,u=new Mt(this._lodPlanes[i],l),h=l.uniforms,p=this._sizeLods[t]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*bn-1),m=r/g,d=isFinite(r)?1+Math.floor(c*m):bn;d>bn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${d} samples when the maximum is set to ${bn}`);const f=[];let v=0;for(let y=0;y<bn;++y){const R=y/m,B=Math.exp(-R*R/2);f.push(B),y===0?v+=B:y<d&&(v+=2*B)}for(let y=0;y<f.length;y++)f[y]=f[y]/v;h.envMap.value=e.texture,h.samples.value=d,h.weights.value=f,h.latitudinal.value=s==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:w}=this;h.dTheta.value=g,h.mipInt.value=w-t;const C=this._sizeLods[i],x=3*C*(i>w-Ei?i-w+Ei:0),U=4*(this._cubeSize-C);Us(A,x,U,3*C,2*C),o.setRenderTarget(A),o.render(u,Bo)}}function PC(n){const e=[],A=[],t=[];let i=n;const r=n-Ei+1+Hu.length;for(let s=0;s<r;s++){const a=Math.pow(2,i);A.push(a);let o=1/a;s>n-Ei?o=Hu[s-n+Ei-1]:s===0&&(o=0),t.push(o);const l=1/(a-2),c=-l,u=1+l,h=[c,c,u,c,u,u,c,c,u,u,c,u],p=6,g=6,m=3,d=2,f=1,v=new Float32Array(m*g*p),w=new Float32Array(d*g*p),C=new Float32Array(f*g*p);for(let U=0;U<p;U++){const y=U%3*2/3-1,R=U>2?0:-1,B=[y,R,0,y+2/3,R,0,y+2/3,R+1,0,y,R,0,y+2/3,R+1,0,y,R+1,0];v.set(B,m*g*U),w.set(h,d*g*U);const M=[U,U,U,U,U,U];C.set(M,f*g*U)}const x=new It;x.setAttribute("position",new bt(v,m)),x.setAttribute("uv",new bt(w,d)),x.setAttribute("faceIndex",new bt(C,f)),e.push(x),i>Ei&&i--}return{lodPlanes:e,sizeLods:A,sigmas:t}}function Gu(n,e,A){const t=new kn(n,e,A);return t.texture.mapping=ua,t.texture.name="PMREM.cubeUv",t.scissorTest=!0,t}function Us(n,e,A,t,i){n.viewport.set(e,A,t,i),n.scissor.set(e,A,t,i)}function OC(n,e,A){const t=new Float32Array(bn),i=new I(0,1,0);return new _n({name:"SphericalGaussianBlur",defines:{n:bn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/A,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:t},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Ul(),fragmentShader:`

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
		`,blending:fn,depthTest:!1,depthWrite:!1})}function Vu(){return new _n({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ul(),fragmentShader:`

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
		`,blending:fn,depthTest:!1,depthWrite:!1})}function Ku(){return new _n({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ul(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:fn,depthTest:!1,depthWrite:!1})}function Ul(){return`

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
	`}function NC(n){let e=new WeakMap,A=null;function t(a){if(a&&a.isTexture){const o=a.mapping,l=o===el||o===Al,c=o===Hi||o===Pi;if(l||c)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let u=e.get(a);return A===null&&(A=new Nu(n)),u=l?A.fromEquirectangular(a,u):A.fromCubemap(a,u),e.set(a,u),u.texture}else{if(e.has(a))return e.get(a).texture;{const u=a.image;if(l&&u&&u.height>0||c&&u&&i(u)){A===null&&(A=new Nu(n));const h=l?A.fromEquirectangular(a):A.fromCubemap(a);return e.set(a,h),a.addEventListener("dispose",r),h.texture}else return null}}}return a}function i(a){let o=0;const l=6;for(let c=0;c<l;c++)a[c]!==void 0&&o++;return o===l}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap,A!==null&&(A.dispose(),A=null)}return{get:t,dispose:s}}function GC(n){const e={};function A(t){if(e[t]!==void 0)return e[t];let i;switch(t){case"WEBGL_depth_texture":i=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=n.getExtension(t)}return e[t]=i,i}return{has:function(t){return A(t)!==null},init:function(t){t.isWebGL2?A("EXT_color_buffer_float"):(A("WEBGL_depth_texture"),A("OES_texture_float"),A("OES_texture_half_float"),A("OES_texture_half_float_linear"),A("OES_standard_derivatives"),A("OES_element_index_uint"),A("OES_vertex_array_object"),A("ANGLE_instanced_arrays")),A("OES_texture_float_linear"),A("EXT_color_buffer_half_float"),A("WEBGL_multisampled_render_to_texture")},get:function(t){const i=A(t);return i===null&&console.warn("THREE.WebGLRenderer: "+t+" extension not supported."),i}}}function VC(n,e,A,t){const i={},r=new WeakMap;function s(u){const h=u.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);for(const g in h.morphAttributes){const m=h.morphAttributes[g];for(let d=0,f=m.length;d<f;d++)e.remove(m[d])}h.removeEventListener("dispose",s),delete i[h.id];const p=r.get(h);p&&(e.remove(p),r.delete(h)),t.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,A.memory.geometries--}function a(u,h){return i[h.id]===!0||(h.addEventListener("dispose",s),i[h.id]=!0,A.memory.geometries++),h}function o(u){const h=u.attributes;for(const g in h)e.update(h[g],n.ARRAY_BUFFER);const p=u.morphAttributes;for(const g in p){const m=p[g];for(let d=0,f=m.length;d<f;d++)e.update(m[d],n.ARRAY_BUFFER)}}function l(u){const h=[],p=u.index,g=u.attributes.position;let m=0;if(p!==null){const v=p.array;m=p.version;for(let w=0,C=v.length;w<C;w+=3){const x=v[w+0],U=v[w+1],y=v[w+2];h.push(x,U,U,y,y,x)}}else if(g!==void 0){const v=g.array;m=g.version;for(let w=0,C=v.length/3-1;w<C;w+=3){const x=w+0,U=w+1,y=w+2;h.push(x,U,U,y,y,x)}}else return;const d=new(Rf(h)?Gf:Nf)(h,1);d.version=m;const f=r.get(u);f&&e.remove(f),r.set(u,d)}function c(u){const h=r.get(u);if(h){const p=u.index;p!==null&&h.version<p.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:o,getWireframeAttribute:c}}function KC(n,e,A,t){const i=t.isWebGL2;let r;function s(h){r=h}let a,o;function l(h){a=h.type,o=h.bytesPerElement}function c(h,p){n.drawElements(r,p,a,h*o),A.update(p,r,1)}function u(h,p,g){if(g===0)return;let m,d;if(i)m=n,d="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),d="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[d](r,p,a,h*o,g),A.update(p,r,g)}this.setMode=s,this.setIndex=l,this.render=c,this.renderInstances=u}function kC(n){const e={geometries:0,textures:0},A={frame:0,calls:0,triangles:0,points:0,lines:0};function t(r,s,a){switch(A.calls++,s){case n.TRIANGLES:A.triangles+=a*(r/3);break;case n.LINES:A.lines+=a*(r/2);break;case n.LINE_STRIP:A.lines+=a*(r-1);break;case n.LINE_LOOP:A.lines+=a*r;break;case n.POINTS:A.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",s);break}}function i(){A.calls=0,A.triangles=0,A.points=0,A.lines=0}return{memory:e,render:A,programs:null,autoReset:!0,reset:i,update:t}}function zC(n,e){return n[0]-e[0]}function WC(n,e){return Math.abs(e[1])-Math.abs(n[1])}function XC(n,e,A){const t={},i=new Float32Array(8),r=new WeakMap,s=new SA,a=[];for(let l=0;l<8;l++)a[l]=[l,0];function o(l,c,u){const h=l.morphTargetInfluences;if(e.isWebGL2===!0){const g=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,m=g!==void 0?g.length:0;let d=r.get(c);if(d===void 0||d.count!==m){let N=function(){Y.dispose(),r.delete(c),c.removeEventListener("dispose",N)};var p=N;d!==void 0&&d.texture.dispose();const w=c.morphAttributes.position!==void 0,C=c.morphAttributes.normal!==void 0,x=c.morphAttributes.color!==void 0,U=c.morphAttributes.position||[],y=c.morphAttributes.normal||[],R=c.morphAttributes.color||[];let B=0;w===!0&&(B=1),C===!0&&(B=2),x===!0&&(B=3);let M=c.attributes.position.count*B,z=1;M>e.maxTextureSize&&(z=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const J=new Float32Array(M*z*4*m),Y=new Pf(J,M,z,m);Y.type=cn,Y.needsUpdate=!0;const T=B*4;for(let X=0;X<m;X++){const K=U[X],ee=y[X],Z=R[X],q=M*z*4*X;for(let Q=0;Q<K.count;Q++){const O=Q*T;w===!0&&(s.fromBufferAttribute(K,Q),J[q+O+0]=s.x,J[q+O+1]=s.y,J[q+O+2]=s.z,J[q+O+3]=0),C===!0&&(s.fromBufferAttribute(ee,Q),J[q+O+4]=s.x,J[q+O+5]=s.y,J[q+O+6]=s.z,J[q+O+7]=0),x===!0&&(s.fromBufferAttribute(Z,Q),J[q+O+8]=s.x,J[q+O+9]=s.y,J[q+O+10]=s.z,J[q+O+11]=Z.itemSize===4?s.w:1)}}d={count:m,texture:Y,size:new Se(M,z)},r.set(c,d),c.addEventListener("dispose",N)}let f=0;for(let w=0;w<h.length;w++)f+=h[w];const v=c.morphTargetsRelative?1:1-f;u.getUniforms().setValue(n,"morphTargetBaseInfluence",v),u.getUniforms().setValue(n,"morphTargetInfluences",h),u.getUniforms().setValue(n,"morphTargetsTexture",d.texture,A),u.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}else{const g=h===void 0?0:h.length;let m=t[c.id];if(m===void 0||m.length!==g){m=[];for(let C=0;C<g;C++)m[C]=[C,0];t[c.id]=m}for(let C=0;C<g;C++){const x=m[C];x[0]=C,x[1]=h[C]}m.sort(WC);for(let C=0;C<8;C++)C<g&&m[C][1]?(a[C][0]=m[C][0],a[C][1]=m[C][1]):(a[C][0]=Number.MAX_SAFE_INTEGER,a[C][1]=0);a.sort(zC);const d=c.morphAttributes.position,f=c.morphAttributes.normal;let v=0;for(let C=0;C<8;C++){const x=a[C],U=x[0],y=x[1];U!==Number.MAX_SAFE_INTEGER&&y?(d&&c.getAttribute("morphTarget"+C)!==d[U]&&c.setAttribute("morphTarget"+C,d[U]),f&&c.getAttribute("morphNormal"+C)!==f[U]&&c.setAttribute("morphNormal"+C,f[U]),i[C]=y,v+=y):(d&&c.hasAttribute("morphTarget"+C)===!0&&c.deleteAttribute("morphTarget"+C),f&&c.hasAttribute("morphNormal"+C)===!0&&c.deleteAttribute("morphNormal"+C),i[C]=0)}const w=c.morphTargetsRelative?1:1-v;u.getUniforms().setValue(n,"morphTargetBaseInfluence",w),u.getUniforms().setValue(n,"morphTargetInfluences",i)}}return{update:o}}function YC(n,e,A,t){let i=new WeakMap;function r(o){const l=t.render.frame,c=o.geometry,u=e.get(o,c);if(i.get(u)!==l&&(e.update(u),i.set(u,l)),o.isInstancedMesh&&(o.hasEventListener("dispose",a)===!1&&o.addEventListener("dispose",a),i.get(o)!==l&&(A.update(o.instanceMatrix,n.ARRAY_BUFFER),o.instanceColor!==null&&A.update(o.instanceColor,n.ARRAY_BUFFER),i.set(o,l))),o.isSkinnedMesh){const h=o.skeleton;i.get(h)!==l&&(h.update(),i.set(h,l))}return u}function s(){i=new WeakMap}function a(o){const l=o.target;l.removeEventListener("dispose",a),A.remove(l.instanceMatrix),l.instanceColor!==null&&A.remove(l.instanceColor)}return{update:r,dispose:s}}const Xf=new jA,Yf=new Pf,Jf=new Iw,qf=new kf,ku=[],zu=[],Wu=new Float32Array(16),Xu=new Float32Array(9),Yu=new Float32Array(4);function Ki(n,e,A){const t=n[0];if(t<=0||t>0)return n;const i=e*A;let r=ku[i];if(r===void 0&&(r=new Float32Array(i),ku[i]=r),e!==0){t.toArray(r,0);for(let s=1,a=0;s!==e;++s)a+=A,n[s].toArray(r,a)}return r}function mA(n,e){if(n.length!==e.length)return!1;for(let A=0,t=n.length;A<t;A++)if(n[A]!==e[A])return!1;return!0}function BA(n,e){for(let A=0,t=e.length;A<t;A++)n[A]=e[A]}function ga(n,e){let A=zu[e];A===void 0&&(A=new Int32Array(e),zu[e]=A);for(let t=0;t!==e;++t)A[t]=n.allocateTextureUnit();return A}function JC(n,e){const A=this.cache;A[0]!==e&&(n.uniform1f(this.addr,e),A[0]=e)}function qC(n,e){const A=this.cache;if(e.x!==void 0)(A[0]!==e.x||A[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),A[0]=e.x,A[1]=e.y);else{if(mA(A,e))return;n.uniform2fv(this.addr,e),BA(A,e)}}function ZC(n,e){const A=this.cache;if(e.x!==void 0)(A[0]!==e.x||A[1]!==e.y||A[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),A[0]=e.x,A[1]=e.y,A[2]=e.z);else if(e.r!==void 0)(A[0]!==e.r||A[1]!==e.g||A[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),A[0]=e.r,A[1]=e.g,A[2]=e.b);else{if(mA(A,e))return;n.uniform3fv(this.addr,e),BA(A,e)}}function jC(n,e){const A=this.cache;if(e.x!==void 0)(A[0]!==e.x||A[1]!==e.y||A[2]!==e.z||A[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),A[0]=e.x,A[1]=e.y,A[2]=e.z,A[3]=e.w);else{if(mA(A,e))return;n.uniform4fv(this.addr,e),BA(A,e)}}function $C(n,e){const A=this.cache,t=e.elements;if(t===void 0){if(mA(A,e))return;n.uniformMatrix2fv(this.addr,!1,e),BA(A,e)}else{if(mA(A,t))return;Yu.set(t),n.uniformMatrix2fv(this.addr,!1,Yu),BA(A,t)}}function ex(n,e){const A=this.cache,t=e.elements;if(t===void 0){if(mA(A,e))return;n.uniformMatrix3fv(this.addr,!1,e),BA(A,e)}else{if(mA(A,t))return;Xu.set(t),n.uniformMatrix3fv(this.addr,!1,Xu),BA(A,t)}}function Ax(n,e){const A=this.cache,t=e.elements;if(t===void 0){if(mA(A,e))return;n.uniformMatrix4fv(this.addr,!1,e),BA(A,e)}else{if(mA(A,t))return;Wu.set(t),n.uniformMatrix4fv(this.addr,!1,Wu),BA(A,t)}}function tx(n,e){const A=this.cache;A[0]!==e&&(n.uniform1i(this.addr,e),A[0]=e)}function nx(n,e){const A=this.cache;if(e.x!==void 0)(A[0]!==e.x||A[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),A[0]=e.x,A[1]=e.y);else{if(mA(A,e))return;n.uniform2iv(this.addr,e),BA(A,e)}}function ix(n,e){const A=this.cache;if(e.x!==void 0)(A[0]!==e.x||A[1]!==e.y||A[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),A[0]=e.x,A[1]=e.y,A[2]=e.z);else{if(mA(A,e))return;n.uniform3iv(this.addr,e),BA(A,e)}}function rx(n,e){const A=this.cache;if(e.x!==void 0)(A[0]!==e.x||A[1]!==e.y||A[2]!==e.z||A[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),A[0]=e.x,A[1]=e.y,A[2]=e.z,A[3]=e.w);else{if(mA(A,e))return;n.uniform4iv(this.addr,e),BA(A,e)}}function sx(n,e){const A=this.cache;A[0]!==e&&(n.uniform1ui(this.addr,e),A[0]=e)}function ax(n,e){const A=this.cache;if(e.x!==void 0)(A[0]!==e.x||A[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),A[0]=e.x,A[1]=e.y);else{if(mA(A,e))return;n.uniform2uiv(this.addr,e),BA(A,e)}}function ox(n,e){const A=this.cache;if(e.x!==void 0)(A[0]!==e.x||A[1]!==e.y||A[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),A[0]=e.x,A[1]=e.y,A[2]=e.z);else{if(mA(A,e))return;n.uniform3uiv(this.addr,e),BA(A,e)}}function lx(n,e){const A=this.cache;if(e.x!==void 0)(A[0]!==e.x||A[1]!==e.y||A[2]!==e.z||A[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),A[0]=e.x,A[1]=e.y,A[2]=e.z,A[3]=e.w);else{if(mA(A,e))return;n.uniform4uiv(this.addr,e),BA(A,e)}}function cx(n,e,A){const t=this.cache,i=A.allocateTextureUnit();t[0]!==i&&(n.uniform1i(this.addr,i),t[0]=i),A.setTexture2D(e||Xf,i)}function ux(n,e,A){const t=this.cache,i=A.allocateTextureUnit();t[0]!==i&&(n.uniform1i(this.addr,i),t[0]=i),A.setTexture3D(e||Jf,i)}function hx(n,e,A){const t=this.cache,i=A.allocateTextureUnit();t[0]!==i&&(n.uniform1i(this.addr,i),t[0]=i),A.setTextureCube(e||qf,i)}function fx(n,e,A){const t=this.cache,i=A.allocateTextureUnit();t[0]!==i&&(n.uniform1i(this.addr,i),t[0]=i),A.setTexture2DArray(e||Yf,i)}function dx(n){switch(n){case 5126:return JC;case 35664:return qC;case 35665:return ZC;case 35666:return jC;case 35674:return $C;case 35675:return ex;case 35676:return Ax;case 5124:case 35670:return tx;case 35667:case 35671:return nx;case 35668:case 35672:return ix;case 35669:case 35673:return rx;case 5125:return sx;case 36294:return ax;case 36295:return ox;case 36296:return lx;case 35678:case 36198:case 36298:case 36306:case 35682:return cx;case 35679:case 36299:case 36307:return ux;case 35680:case 36300:case 36308:case 36293:return hx;case 36289:case 36303:case 36311:case 36292:return fx}}function px(n,e){n.uniform1fv(this.addr,e)}function gx(n,e){const A=Ki(e,this.size,2);n.uniform2fv(this.addr,A)}function mx(n,e){const A=Ki(e,this.size,3);n.uniform3fv(this.addr,A)}function Bx(n,e){const A=Ki(e,this.size,4);n.uniform4fv(this.addr,A)}function _x(n,e){const A=Ki(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,A)}function wx(n,e){const A=Ki(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,A)}function vx(n,e){const A=Ki(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,A)}function Ex(n,e){n.uniform1iv(this.addr,e)}function Cx(n,e){n.uniform2iv(this.addr,e)}function xx(n,e){n.uniform3iv(this.addr,e)}function Ux(n,e){n.uniform4iv(this.addr,e)}function yx(n,e){n.uniform1uiv(this.addr,e)}function Sx(n,e){n.uniform2uiv(this.addr,e)}function Mx(n,e){n.uniform3uiv(this.addr,e)}function Fx(n,e){n.uniform4uiv(this.addr,e)}function bx(n,e,A){const t=this.cache,i=e.length,r=ga(A,i);mA(t,r)||(n.uniform1iv(this.addr,r),BA(t,r));for(let s=0;s!==i;++s)A.setTexture2D(e[s]||Xf,r[s])}function Tx(n,e,A){const t=this.cache,i=e.length,r=ga(A,i);mA(t,r)||(n.uniform1iv(this.addr,r),BA(t,r));for(let s=0;s!==i;++s)A.setTexture3D(e[s]||Jf,r[s])}function Qx(n,e,A){const t=this.cache,i=e.length,r=ga(A,i);mA(t,r)||(n.uniform1iv(this.addr,r),BA(t,r));for(let s=0;s!==i;++s)A.setTextureCube(e[s]||qf,r[s])}function Ix(n,e,A){const t=this.cache,i=e.length,r=ga(A,i);mA(t,r)||(n.uniform1iv(this.addr,r),BA(t,r));for(let s=0;s!==i;++s)A.setTexture2DArray(e[s]||Yf,r[s])}function Lx(n){switch(n){case 5126:return px;case 35664:return gx;case 35665:return mx;case 35666:return Bx;case 35674:return _x;case 35675:return wx;case 35676:return vx;case 5124:case 35670:return Ex;case 35667:case 35671:return Cx;case 35668:case 35672:return xx;case 35669:case 35673:return Ux;case 5125:return yx;case 36294:return Sx;case 36295:return Mx;case 36296:return Fx;case 35678:case 36198:case 36298:case 36306:case 35682:return bx;case 35679:case 36299:case 36307:return Tx;case 35680:case 36300:case 36308:case 36293:return Qx;case 36289:case 36303:case 36311:case 36292:return Ix}}class Rx{constructor(e,A,t){this.id=e,this.addr=t,this.cache=[],this.setValue=dx(A.type)}}class Dx{constructor(e,A,t){this.id=e,this.addr=t,this.cache=[],this.size=A.size,this.setValue=Lx(A.type)}}class Hx{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,A,t){const i=this.seq;for(let r=0,s=i.length;r!==s;++r){const a=i[r];a.setValue(e,A[a.id],t)}}}const Eo=/(\w+)(\])?(\[|\.)?/g;function Ju(n,e){n.seq.push(e),n.map[e.id]=e}function Px(n,e,A){const t=n.name,i=t.length;for(Eo.lastIndex=0;;){const r=Eo.exec(t),s=Eo.lastIndex;let a=r[1];const o=r[2]==="]",l=r[3];if(o&&(a=a|0),l===void 0||l==="["&&s+2===i){Ju(A,l===void 0?new Rx(a,n,e):new Dx(a,n,e));break}else{let u=A.map[a];u===void 0&&(u=new Hx(a),Ju(A,u)),A=u}}}class Qs{constructor(e,A){this.seq=[],this.map={};const t=e.getProgramParameter(A,e.ACTIVE_UNIFORMS);for(let i=0;i<t;++i){const r=e.getActiveUniform(A,i),s=e.getUniformLocation(A,r.name);Px(r,s,this)}}setValue(e,A,t,i){const r=this.map[A];r!==void 0&&r.setValue(e,t,i)}setOptional(e,A,t){const i=A[t];i!==void 0&&this.setValue(e,t,i)}static upload(e,A,t,i){for(let r=0,s=A.length;r!==s;++r){const a=A[r],o=t[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,i)}}static seqWithValue(e,A){const t=[];for(let i=0,r=e.length;i!==r;++i){const s=e[i];s.id in A&&t.push(s)}return t}}function qu(n,e,A){const t=n.createShader(e);return n.shaderSource(t,A),n.compileShader(t),t}const Ox=37297;let Nx=0;function Gx(n,e){const A=n.split(`
`),t=[],i=Math.max(e-6,0),r=Math.min(e+6,A.length);for(let s=i;s<r;s++){const a=s+1;t.push(`${a===e?">":" "} ${a}: ${A[s]}`)}return t.join(`
`)}function Vx(n){const e=$e.getPrimaries($e.workingColorSpace),A=$e.getPrimaries(n);let t;switch(e===A?t="":e===Ys&&A===Xs?t="LinearDisplayP3ToLinearSRGB":e===Xs&&A===Ys&&(t="LinearSRGBToLinearDisplayP3"),n){case Xt:case ha:return[t,"LinearTransferOETF"];case UA:case wl:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[t,"LinearTransferOETF"]}}function Zu(n,e,A){const t=n.getShaderParameter(e,n.COMPILE_STATUS),i=n.getShaderInfoLog(e).trim();if(t&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const s=parseInt(r[1]);return A.toUpperCase()+`

`+i+`

`+Gx(n.getShaderSource(e),s)}else return i}function Kx(n,e){const A=Vx(e);return`vec4 ${n}( vec4 value ) { return ${A[0]}( ${A[1]}( value ) ); }`}function kx(n,e){let A;switch(e){case N_:A="Linear";break;case G_:A="Reinhard";break;case V_:A="OptimizedCineon";break;case K_:A="ACESFilmic";break;case k_:A="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),A="Linear"}return"vec3 "+n+"( vec3 color ) { return "+A+"ToneMapping( color ); }"}function zx(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(sr).join(`
`)}function Wx(n){const e=[];for(const A in n){const t=n[A];t!==!1&&e.push("#define "+A+" "+t)}return e.join(`
`)}function Xx(n,e){const A={},t=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let i=0;i<t;i++){const r=n.getActiveAttrib(e,i),s=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),A[s]={type:r.type,location:n.getAttribLocation(e,s),locationSize:a}}return A}function sr(n){return n!==""}function ju(n,e){const A=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,A).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function $u(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Yx=/^[ \t]*#include +<([\w\d./]+)>/gm;function sl(n){return n.replace(Yx,qx)}const Jx=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function qx(n,e){let A=Ve[e];if(A===void 0){const t=Jx.get(e);if(t!==void 0)A=Ve[t],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,t);else throw new Error("Can not resolve #include <"+e+">")}return sl(A)}const Zx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function eh(n){return n.replace(Zx,jx)}function jx(n,e,A,t){let i="";for(let r=parseInt(e);r<parseInt(A);r++)i+=t.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Ah(n){let e="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function $x(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Uf?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===d_?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Vt&&(e="SHADOWMAP_TYPE_VSM"),e}function eU(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Hi:case Pi:e="ENVMAP_TYPE_CUBE";break;case ua:e="ENVMAP_TYPE_CUBE_UV";break}return e}function AU(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Pi:e="ENVMAP_MODE_REFRACTION";break}return e}function tU(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case yf:e="ENVMAP_BLENDING_MULTIPLY";break;case P_:e="ENVMAP_BLENDING_MIX";break;case O_:e="ENVMAP_BLENDING_ADD";break}return e}function nU(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const A=Math.log2(e)-2,t=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,A),7*16)),texelHeight:t,maxMip:A}}function iU(n,e,A,t){const i=n.getContext(),r=A.defines;let s=A.vertexShader,a=A.fragmentShader;const o=$x(A),l=eU(A),c=AU(A),u=tU(A),h=nU(A),p=A.isWebGL2?"":zx(A),g=Wx(r),m=i.createProgram();let d,f,v=A.glslVersion?"#version "+A.glslVersion+`
`:"";A.isRawShaderMaterial?(d=["#define SHADER_TYPE "+A.shaderType,"#define SHADER_NAME "+A.shaderName,g].filter(sr).join(`
`),d.length>0&&(d+=`
`),f=[p,"#define SHADER_TYPE "+A.shaderType,"#define SHADER_NAME "+A.shaderName,g].filter(sr).join(`
`),f.length>0&&(f+=`
`)):(d=[Ah(A),"#define SHADER_TYPE "+A.shaderType,"#define SHADER_NAME "+A.shaderName,g,A.instancing?"#define USE_INSTANCING":"",A.instancingColor?"#define USE_INSTANCING_COLOR":"",A.useFog&&A.fog?"#define USE_FOG":"",A.useFog&&A.fogExp2?"#define FOG_EXP2":"",A.map?"#define USE_MAP":"",A.envMap?"#define USE_ENVMAP":"",A.envMap?"#define "+c:"",A.lightMap?"#define USE_LIGHTMAP":"",A.aoMap?"#define USE_AOMAP":"",A.bumpMap?"#define USE_BUMPMAP":"",A.normalMap?"#define USE_NORMALMAP":"",A.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",A.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",A.displacementMap?"#define USE_DISPLACEMENTMAP":"",A.emissiveMap?"#define USE_EMISSIVEMAP":"",A.anisotropy?"#define USE_ANISOTROPY":"",A.anisotropyMap?"#define USE_ANISOTROPYMAP":"",A.clearcoatMap?"#define USE_CLEARCOATMAP":"",A.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",A.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",A.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",A.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",A.specularMap?"#define USE_SPECULARMAP":"",A.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",A.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",A.roughnessMap?"#define USE_ROUGHNESSMAP":"",A.metalnessMap?"#define USE_METALNESSMAP":"",A.alphaMap?"#define USE_ALPHAMAP":"",A.alphaHash?"#define USE_ALPHAHASH":"",A.transmission?"#define USE_TRANSMISSION":"",A.transmissionMap?"#define USE_TRANSMISSIONMAP":"",A.thicknessMap?"#define USE_THICKNESSMAP":"",A.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",A.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",A.mapUv?"#define MAP_UV "+A.mapUv:"",A.alphaMapUv?"#define ALPHAMAP_UV "+A.alphaMapUv:"",A.lightMapUv?"#define LIGHTMAP_UV "+A.lightMapUv:"",A.aoMapUv?"#define AOMAP_UV "+A.aoMapUv:"",A.emissiveMapUv?"#define EMISSIVEMAP_UV "+A.emissiveMapUv:"",A.bumpMapUv?"#define BUMPMAP_UV "+A.bumpMapUv:"",A.normalMapUv?"#define NORMALMAP_UV "+A.normalMapUv:"",A.displacementMapUv?"#define DISPLACEMENTMAP_UV "+A.displacementMapUv:"",A.metalnessMapUv?"#define METALNESSMAP_UV "+A.metalnessMapUv:"",A.roughnessMapUv?"#define ROUGHNESSMAP_UV "+A.roughnessMapUv:"",A.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+A.anisotropyMapUv:"",A.clearcoatMapUv?"#define CLEARCOATMAP_UV "+A.clearcoatMapUv:"",A.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+A.clearcoatNormalMapUv:"",A.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+A.clearcoatRoughnessMapUv:"",A.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+A.iridescenceMapUv:"",A.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+A.iridescenceThicknessMapUv:"",A.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+A.sheenColorMapUv:"",A.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+A.sheenRoughnessMapUv:"",A.specularMapUv?"#define SPECULARMAP_UV "+A.specularMapUv:"",A.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+A.specularColorMapUv:"",A.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+A.specularIntensityMapUv:"",A.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+A.transmissionMapUv:"",A.thicknessMapUv?"#define THICKNESSMAP_UV "+A.thicknessMapUv:"",A.vertexTangents&&A.flatShading===!1?"#define USE_TANGENT":"",A.vertexColors?"#define USE_COLOR":"",A.vertexAlphas?"#define USE_COLOR_ALPHA":"",A.vertexUv1s?"#define USE_UV1":"",A.vertexUv2s?"#define USE_UV2":"",A.vertexUv3s?"#define USE_UV3":"",A.pointsUvs?"#define USE_POINTS_UV":"",A.flatShading?"#define FLAT_SHADED":"",A.skinning?"#define USE_SKINNING":"",A.morphTargets?"#define USE_MORPHTARGETS":"",A.morphNormals&&A.flatShading===!1?"#define USE_MORPHNORMALS":"",A.morphColors&&A.isWebGL2?"#define USE_MORPHCOLORS":"",A.morphTargetsCount>0&&A.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",A.morphTargetsCount>0&&A.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+A.morphTextureStride:"",A.morphTargetsCount>0&&A.isWebGL2?"#define MORPHTARGETS_COUNT "+A.morphTargetsCount:"",A.doubleSided?"#define DOUBLE_SIDED":"",A.flipSided?"#define FLIP_SIDED":"",A.shadowMapEnabled?"#define USE_SHADOWMAP":"",A.shadowMapEnabled?"#define "+o:"",A.sizeAttenuation?"#define USE_SIZEATTENUATION":"",A.numLightProbes>0?"#define USE_LIGHT_PROBES":"",A.useLegacyLights?"#define LEGACY_LIGHTS":"",A.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",A.logarithmicDepthBuffer&&A.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(sr).join(`
`),f=[p,Ah(A),"#define SHADER_TYPE "+A.shaderType,"#define SHADER_NAME "+A.shaderName,g,A.useFog&&A.fog?"#define USE_FOG":"",A.useFog&&A.fogExp2?"#define FOG_EXP2":"",A.map?"#define USE_MAP":"",A.matcap?"#define USE_MATCAP":"",A.envMap?"#define USE_ENVMAP":"",A.envMap?"#define "+l:"",A.envMap?"#define "+c:"",A.envMap?"#define "+u:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",A.lightMap?"#define USE_LIGHTMAP":"",A.aoMap?"#define USE_AOMAP":"",A.bumpMap?"#define USE_BUMPMAP":"",A.normalMap?"#define USE_NORMALMAP":"",A.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",A.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",A.emissiveMap?"#define USE_EMISSIVEMAP":"",A.anisotropy?"#define USE_ANISOTROPY":"",A.anisotropyMap?"#define USE_ANISOTROPYMAP":"",A.clearcoat?"#define USE_CLEARCOAT":"",A.clearcoatMap?"#define USE_CLEARCOATMAP":"",A.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",A.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",A.iridescence?"#define USE_IRIDESCENCE":"",A.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",A.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",A.specularMap?"#define USE_SPECULARMAP":"",A.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",A.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",A.roughnessMap?"#define USE_ROUGHNESSMAP":"",A.metalnessMap?"#define USE_METALNESSMAP":"",A.alphaMap?"#define USE_ALPHAMAP":"",A.alphaTest?"#define USE_ALPHATEST":"",A.alphaHash?"#define USE_ALPHAHASH":"",A.sheen?"#define USE_SHEEN":"",A.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",A.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",A.transmission?"#define USE_TRANSMISSION":"",A.transmissionMap?"#define USE_TRANSMISSIONMAP":"",A.thicknessMap?"#define USE_THICKNESSMAP":"",A.vertexTangents&&A.flatShading===!1?"#define USE_TANGENT":"",A.vertexColors||A.instancingColor?"#define USE_COLOR":"",A.vertexAlphas?"#define USE_COLOR_ALPHA":"",A.vertexUv1s?"#define USE_UV1":"",A.vertexUv2s?"#define USE_UV2":"",A.vertexUv3s?"#define USE_UV3":"",A.pointsUvs?"#define USE_POINTS_UV":"",A.gradientMap?"#define USE_GRADIENTMAP":"",A.flatShading?"#define FLAT_SHADED":"",A.doubleSided?"#define DOUBLE_SIDED":"",A.flipSided?"#define FLIP_SIDED":"",A.shadowMapEnabled?"#define USE_SHADOWMAP":"",A.shadowMapEnabled?"#define "+o:"",A.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",A.numLightProbes>0?"#define USE_LIGHT_PROBES":"",A.useLegacyLights?"#define LEGACY_LIGHTS":"",A.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",A.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",A.logarithmicDepthBuffer&&A.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",A.toneMapping!==dn?"#define TONE_MAPPING":"",A.toneMapping!==dn?Ve.tonemapping_pars_fragment:"",A.toneMapping!==dn?kx("toneMapping",A.toneMapping):"",A.dithering?"#define DITHERING":"",A.opaque?"#define OPAQUE":"",Ve.colorspace_pars_fragment,Kx("linearToOutputTexel",A.outputColorSpace),A.useDepthPacking?"#define DEPTH_PACKING "+A.depthPacking:"",`
`].filter(sr).join(`
`)),s=sl(s),s=ju(s,A),s=$u(s,A),a=sl(a),a=ju(a,A),a=$u(a,A),s=eh(s),a=eh(a),A.isWebGL2&&A.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,d=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,f=["precision mediump sampler2DArray;","#define varying in",A.glslVersion===_u?"":"layout(location = 0) out highp vec4 pc_fragColor;",A.glslVersion===_u?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const w=v+d+s,C=v+f+a,x=qu(i,i.VERTEX_SHADER,w),U=qu(i,i.FRAGMENT_SHADER,C);i.attachShader(m,x),i.attachShader(m,U),A.index0AttributeName!==void 0?i.bindAttribLocation(m,0,A.index0AttributeName):A.morphTargets===!0&&i.bindAttribLocation(m,0,"position"),i.linkProgram(m);function y(z){if(n.debug.checkShaderErrors){const J=i.getProgramInfoLog(m).trim(),Y=i.getShaderInfoLog(x).trim(),T=i.getShaderInfoLog(U).trim();let N=!0,X=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1)if(N=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(i,m,x,U);else{const K=Zu(i,x,"vertex"),ee=Zu(i,U,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Program Info Log: `+J+`
`+K+`
`+ee)}else J!==""?console.warn("THREE.WebGLProgram: Program Info Log:",J):(Y===""||T==="")&&(X=!1);X&&(z.diagnostics={runnable:N,programLog:J,vertexShader:{log:Y,prefix:d},fragmentShader:{log:T,prefix:f}})}i.deleteShader(x),i.deleteShader(U),R=new Qs(i,m),B=Xx(i,m)}let R;this.getUniforms=function(){return R===void 0&&y(this),R};let B;this.getAttributes=function(){return B===void 0&&y(this),B};let M=A.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(m,Ox)),M},this.destroy=function(){t.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=A.shaderType,this.name=A.shaderName,this.id=Nx++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=x,this.fragmentShader=U,this}let rU=0;class sU{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const A=e.vertexShader,t=e.fragmentShader,i=this._getShaderStage(A),r=this._getShaderStage(t),s=this._getShaderCacheForMaterial(e);return s.has(i)===!1&&(s.add(i),i.usedTimes++),s.has(r)===!1&&(s.add(r),r.usedTimes++),this}remove(e){const A=this.materialCache.get(e);for(const t of A)t.usedTimes--,t.usedTimes===0&&this.shaderCache.delete(t.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const A=this.materialCache;let t=A.get(e);return t===void 0&&(t=new Set,A.set(e,t)),t}_getShaderStage(e){const A=this.shaderCache;let t=A.get(e);return t===void 0&&(t=new aU(e),A.set(e,t)),t}}class aU{constructor(e){this.id=rU++,this.code=e,this.usedTimes=0}}function oU(n,e,A,t,i,r,s){const a=new El,o=new sU,l=[],c=i.isWebGL2,u=i.logarithmicDepthBuffer,h=i.vertexTextures;let p=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(B){return B===0?"uv":`uv${B}`}function d(B,M,z,J,Y){const T=J.fog,N=Y.geometry,X=B.isMeshStandardMaterial?J.environment:null,K=(B.isMeshStandardMaterial?A:e).get(B.envMap||X),ee=K&&K.mapping===ua?K.image.height:null,Z=g[B.type];B.precision!==null&&(p=i.getMaxPrecision(B.precision),p!==B.precision&&console.warn("THREE.WebGLProgram.getParameters:",B.precision,"not supported, using",p,"instead."));const q=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,Q=q!==void 0?q.length:0;let O=0;N.morphAttributes.position!==void 0&&(O=1),N.morphAttributes.normal!==void 0&&(O=2),N.morphAttributes.color!==void 0&&(O=3);let le,he,fe,Ce;if(Z){const hA=yt[Z];le=hA.vertexShader,he=hA.fragmentShader}else le=B.vertexShader,he=B.fragmentShader,o.update(B),fe=o.getVertexShaderID(B),Ce=o.getFragmentShaderID(B);const Re=n.getRenderTarget(),Te=Y.isInstancedMesh===!0,De=!!B.map,nA=!!B.matcap,Ge=!!K,D=!!B.aoMap,MA=!!B.lightMap,Ue=!!B.bumpMap,Qe=!!B.normalMap,Ie=!!B.displacementMap,rA=!!B.emissiveMap,Oe=!!B.metalnessMap,He=!!B.roughnessMap,qe=B.anisotropy>0,uA=B.clearcoat>0,_A=B.iridescence>0,S=B.sheen>0,_=B.transmission>0,H=qe&&!!B.anisotropyMap,ne=uA&&!!B.clearcoatMap,$=uA&&!!B.clearcoatNormalMap,ie=uA&&!!B.clearcoatRoughnessMap,we=_A&&!!B.iridescenceMap,oe=_A&&!!B.iridescenceThicknessMap,pe=S&&!!B.sheenColorMap,F=S&&!!B.sheenRoughnessMap,se=!!B.specularMap,j=!!B.specularColorMap,Me=!!B.specularIntensityMap,ve=_&&!!B.transmissionMap,ye=_&&!!B.thicknessMap,_e=!!B.gradientMap,Be=!!B.alphaMap,We=B.alphaTest>0,b=!!B.alphaHash,ce=!!B.extensions,Ae=!!N.attributes.uv1,W=!!N.attributes.uv2,re=!!N.attributes.uv3;let xe=dn;return B.toneMapped&&(Re===null||Re.isXRRenderTarget===!0)&&(xe=n.toneMapping),{isWebGL2:c,shaderID:Z,shaderType:B.type,shaderName:B.name,vertexShader:le,fragmentShader:he,defines:B.defines,customVertexShaderID:fe,customFragmentShaderID:Ce,isRawShaderMaterial:B.isRawShaderMaterial===!0,glslVersion:B.glslVersion,precision:p,instancing:Te,instancingColor:Te&&Y.instanceColor!==null,supportsVertexTextures:h,outputColorSpace:Re===null?n.outputColorSpace:Re.isXRRenderTarget===!0?Re.texture.colorSpace:Xt,map:De,matcap:nA,envMap:Ge,envMapMode:Ge&&K.mapping,envMapCubeUVHeight:ee,aoMap:D,lightMap:MA,bumpMap:Ue,normalMap:Qe,displacementMap:h&&Ie,emissiveMap:rA,normalMapObjectSpace:Qe&&B.normalMapType===iw,normalMapTangentSpace:Qe&&B.normalMapType===nw,metalnessMap:Oe,roughnessMap:He,anisotropy:qe,anisotropyMap:H,clearcoat:uA,clearcoatMap:ne,clearcoatNormalMap:$,clearcoatRoughnessMap:ie,iridescence:_A,iridescenceMap:we,iridescenceThicknessMap:oe,sheen:S,sheenColorMap:pe,sheenRoughnessMap:F,specularMap:se,specularColorMap:j,specularIntensityMap:Me,transmission:_,transmissionMap:ve,thicknessMap:ye,gradientMap:_e,opaque:B.transparent===!1&&B.blending===xi,alphaMap:Be,alphaTest:We,alphaHash:b,combine:B.combine,mapUv:De&&m(B.map.channel),aoMapUv:D&&m(B.aoMap.channel),lightMapUv:MA&&m(B.lightMap.channel),bumpMapUv:Ue&&m(B.bumpMap.channel),normalMapUv:Qe&&m(B.normalMap.channel),displacementMapUv:Ie&&m(B.displacementMap.channel),emissiveMapUv:rA&&m(B.emissiveMap.channel),metalnessMapUv:Oe&&m(B.metalnessMap.channel),roughnessMapUv:He&&m(B.roughnessMap.channel),anisotropyMapUv:H&&m(B.anisotropyMap.channel),clearcoatMapUv:ne&&m(B.clearcoatMap.channel),clearcoatNormalMapUv:$&&m(B.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ie&&m(B.clearcoatRoughnessMap.channel),iridescenceMapUv:we&&m(B.iridescenceMap.channel),iridescenceThicknessMapUv:oe&&m(B.iridescenceThicknessMap.channel),sheenColorMapUv:pe&&m(B.sheenColorMap.channel),sheenRoughnessMapUv:F&&m(B.sheenRoughnessMap.channel),specularMapUv:se&&m(B.specularMap.channel),specularColorMapUv:j&&m(B.specularColorMap.channel),specularIntensityMapUv:Me&&m(B.specularIntensityMap.channel),transmissionMapUv:ve&&m(B.transmissionMap.channel),thicknessMapUv:ye&&m(B.thicknessMap.channel),alphaMapUv:Be&&m(B.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(Qe||qe),vertexColors:B.vertexColors,vertexAlphas:B.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,vertexUv1s:Ae,vertexUv2s:W,vertexUv3s:re,pointsUvs:Y.isPoints===!0&&!!N.attributes.uv&&(De||Be),fog:!!T,useFog:B.fog===!0,fogExp2:T&&T.isFogExp2,flatShading:B.flatShading===!0,sizeAttenuation:B.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:Y.isSkinnedMesh===!0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:Q,morphTextureStride:O,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:B.dithering,shadowMapEnabled:n.shadowMap.enabled&&z.length>0,shadowMapType:n.shadowMap.type,toneMapping:xe,useLegacyLights:n._useLegacyLights,decodeVideoTexture:De&&B.map.isVideoTexture===!0&&$e.getTransfer(B.map.colorSpace)===iA,premultipliedAlpha:B.premultipliedAlpha,doubleSided:B.side===gt,flipSided:B.side===kA,useDepthPacking:B.depthPacking>=0,depthPacking:B.depthPacking||0,index0AttributeName:B.index0AttributeName,extensionDerivatives:ce&&B.extensions.derivatives===!0,extensionFragDepth:ce&&B.extensions.fragDepth===!0,extensionDrawBuffers:ce&&B.extensions.drawBuffers===!0,extensionShaderTextureLOD:ce&&B.extensions.shaderTextureLOD===!0,rendererExtensionFragDepth:c||t.has("EXT_frag_depth"),rendererExtensionDrawBuffers:c||t.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:c||t.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:B.customProgramCacheKey()}}function f(B){const M=[];if(B.shaderID?M.push(B.shaderID):(M.push(B.customVertexShaderID),M.push(B.customFragmentShaderID)),B.defines!==void 0)for(const z in B.defines)M.push(z),M.push(B.defines[z]);return B.isRawShaderMaterial===!1&&(v(M,B),w(M,B),M.push(n.outputColorSpace)),M.push(B.customProgramCacheKey),M.join()}function v(B,M){B.push(M.precision),B.push(M.outputColorSpace),B.push(M.envMapMode),B.push(M.envMapCubeUVHeight),B.push(M.mapUv),B.push(M.alphaMapUv),B.push(M.lightMapUv),B.push(M.aoMapUv),B.push(M.bumpMapUv),B.push(M.normalMapUv),B.push(M.displacementMapUv),B.push(M.emissiveMapUv),B.push(M.metalnessMapUv),B.push(M.roughnessMapUv),B.push(M.anisotropyMapUv),B.push(M.clearcoatMapUv),B.push(M.clearcoatNormalMapUv),B.push(M.clearcoatRoughnessMapUv),B.push(M.iridescenceMapUv),B.push(M.iridescenceThicknessMapUv),B.push(M.sheenColorMapUv),B.push(M.sheenRoughnessMapUv),B.push(M.specularMapUv),B.push(M.specularColorMapUv),B.push(M.specularIntensityMapUv),B.push(M.transmissionMapUv),B.push(M.thicknessMapUv),B.push(M.combine),B.push(M.fogExp2),B.push(M.sizeAttenuation),B.push(M.morphTargetsCount),B.push(M.morphAttributeCount),B.push(M.numDirLights),B.push(M.numPointLights),B.push(M.numSpotLights),B.push(M.numSpotLightMaps),B.push(M.numHemiLights),B.push(M.numRectAreaLights),B.push(M.numDirLightShadows),B.push(M.numPointLightShadows),B.push(M.numSpotLightShadows),B.push(M.numSpotLightShadowsWithMaps),B.push(M.numLightProbes),B.push(M.shadowMapType),B.push(M.toneMapping),B.push(M.numClippingPlanes),B.push(M.numClipIntersection),B.push(M.depthPacking)}function w(B,M){a.disableAll(),M.isWebGL2&&a.enable(0),M.supportsVertexTextures&&a.enable(1),M.instancing&&a.enable(2),M.instancingColor&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),B.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.skinning&&a.enable(4),M.morphTargets&&a.enable(5),M.morphNormals&&a.enable(6),M.morphColors&&a.enable(7),M.premultipliedAlpha&&a.enable(8),M.shadowMapEnabled&&a.enable(9),M.useLegacyLights&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),B.push(a.mask)}function C(B){const M=g[B.type];let z;if(M){const J=yt[M];z=Ww.clone(J.uniforms)}else z=B.uniforms;return z}function x(B,M){let z;for(let J=0,Y=l.length;J<Y;J++){const T=l[J];if(T.cacheKey===M){z=T,++z.usedTimes;break}}return z===void 0&&(z=new iU(n,M,B,r),l.push(z)),z}function U(B){if(--B.usedTimes===0){const M=l.indexOf(B);l[M]=l[l.length-1],l.pop(),B.destroy()}}function y(B){o.remove(B)}function R(){o.dispose()}return{getParameters:d,getProgramCacheKey:f,getUniforms:C,acquireProgram:x,releaseProgram:U,releaseShaderCache:y,programs:l,dispose:R}}function lU(){let n=new WeakMap;function e(r){let s=n.get(r);return s===void 0&&(s={},n.set(r,s)),s}function A(r){n.delete(r)}function t(r,s,a){n.get(r)[s]=a}function i(){n=new WeakMap}return{get:e,remove:A,update:t,dispose:i}}function cU(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function th(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function nh(){const n=[];let e=0;const A=[],t=[],i=[];function r(){e=0,A.length=0,t.length=0,i.length=0}function s(u,h,p,g,m,d){let f=n[e];return f===void 0?(f={id:u.id,object:u,geometry:h,material:p,groupOrder:g,renderOrder:u.renderOrder,z:m,group:d},n[e]=f):(f.id=u.id,f.object=u,f.geometry=h,f.material=p,f.groupOrder=g,f.renderOrder=u.renderOrder,f.z=m,f.group=d),e++,f}function a(u,h,p,g,m,d){const f=s(u,h,p,g,m,d);p.transmission>0?t.push(f):p.transparent===!0?i.push(f):A.push(f)}function o(u,h,p,g,m,d){const f=s(u,h,p,g,m,d);p.transmission>0?t.unshift(f):p.transparent===!0?i.unshift(f):A.unshift(f)}function l(u,h){A.length>1&&A.sort(u||cU),t.length>1&&t.sort(h||th),i.length>1&&i.sort(h||th)}function c(){for(let u=e,h=n.length;u<h;u++){const p=n[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:A,transmissive:t,transparent:i,init:r,push:a,unshift:o,finish:c,sort:l}}function uU(){let n=new WeakMap;function e(t,i){const r=n.get(t);let s;return r===void 0?(s=new nh,n.set(t,[s])):i>=r.length?(s=new nh,r.push(s)):s=r[i],s}function A(){n=new WeakMap}return{get:e,dispose:A}}function hU(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let A;switch(e.type){case"DirectionalLight":A={direction:new I,color:new Ze};break;case"SpotLight":A={position:new I,direction:new I,color:new Ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":A={position:new I,color:new Ze,distance:0,decay:0};break;case"HemisphereLight":A={direction:new I,skyColor:new Ze,groundColor:new Ze};break;case"RectAreaLight":A={color:new Ze,position:new I,halfWidth:new I,halfHeight:new I};break}return n[e.id]=A,A}}}function fU(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let A;switch(e.type){case"DirectionalLight":A={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se};break;case"SpotLight":A={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se};break;case"PointLight":A={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=A,A}}}let dU=0;function pU(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function gU(n,e){const A=new hU,t=fU(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new I);const r=new I,s=new CA,a=new CA;function o(c,u){let h=0,p=0,g=0;for(let J=0;J<9;J++)i.probe[J].set(0,0,0);let m=0,d=0,f=0,v=0,w=0,C=0,x=0,U=0,y=0,R=0,B=0;c.sort(pU);const M=u===!0?Math.PI:1;for(let J=0,Y=c.length;J<Y;J++){const T=c[J],N=T.color,X=T.intensity,K=T.distance,ee=T.shadow&&T.shadow.map?T.shadow.map.texture:null;if(T.isAmbientLight)h+=N.r*X*M,p+=N.g*X*M,g+=N.b*X*M;else if(T.isLightProbe){for(let Z=0;Z<9;Z++)i.probe[Z].addScaledVector(T.sh.coefficients[Z],X);B++}else if(T.isDirectionalLight){const Z=A.get(T);if(Z.color.copy(T.color).multiplyScalar(T.intensity*M),T.castShadow){const q=T.shadow,Q=t.get(T);Q.shadowBias=q.bias,Q.shadowNormalBias=q.normalBias,Q.shadowRadius=q.radius,Q.shadowMapSize=q.mapSize,i.directionalShadow[m]=Q,i.directionalShadowMap[m]=ee,i.directionalShadowMatrix[m]=T.shadow.matrix,C++}i.directional[m]=Z,m++}else if(T.isSpotLight){const Z=A.get(T);Z.position.setFromMatrixPosition(T.matrixWorld),Z.color.copy(N).multiplyScalar(X*M),Z.distance=K,Z.coneCos=Math.cos(T.angle),Z.penumbraCos=Math.cos(T.angle*(1-T.penumbra)),Z.decay=T.decay,i.spot[f]=Z;const q=T.shadow;if(T.map&&(i.spotLightMap[y]=T.map,y++,q.updateMatrices(T),T.castShadow&&R++),i.spotLightMatrix[f]=q.matrix,T.castShadow){const Q=t.get(T);Q.shadowBias=q.bias,Q.shadowNormalBias=q.normalBias,Q.shadowRadius=q.radius,Q.shadowMapSize=q.mapSize,i.spotShadow[f]=Q,i.spotShadowMap[f]=ee,U++}f++}else if(T.isRectAreaLight){const Z=A.get(T);Z.color.copy(N).multiplyScalar(X),Z.halfWidth.set(T.width*.5,0,0),Z.halfHeight.set(0,T.height*.5,0),i.rectArea[v]=Z,v++}else if(T.isPointLight){const Z=A.get(T);if(Z.color.copy(T.color).multiplyScalar(T.intensity*M),Z.distance=T.distance,Z.decay=T.decay,T.castShadow){const q=T.shadow,Q=t.get(T);Q.shadowBias=q.bias,Q.shadowNormalBias=q.normalBias,Q.shadowRadius=q.radius,Q.shadowMapSize=q.mapSize,Q.shadowCameraNear=q.camera.near,Q.shadowCameraFar=q.camera.far,i.pointShadow[d]=Q,i.pointShadowMap[d]=ee,i.pointShadowMatrix[d]=T.shadow.matrix,x++}i.point[d]=Z,d++}else if(T.isHemisphereLight){const Z=A.get(T);Z.skyColor.copy(T.color).multiplyScalar(X*M),Z.groundColor.copy(T.groundColor).multiplyScalar(X*M),i.hemi[w]=Z,w++}}v>0&&(e.isWebGL2||n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ue.LTC_FLOAT_1,i.rectAreaLTC2=ue.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=ue.LTC_HALF_1,i.rectAreaLTC2=ue.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=h,i.ambient[1]=p,i.ambient[2]=g;const z=i.hash;(z.directionalLength!==m||z.pointLength!==d||z.spotLength!==f||z.rectAreaLength!==v||z.hemiLength!==w||z.numDirectionalShadows!==C||z.numPointShadows!==x||z.numSpotShadows!==U||z.numSpotMaps!==y||z.numLightProbes!==B)&&(i.directional.length=m,i.spot.length=f,i.rectArea.length=v,i.point.length=d,i.hemi.length=w,i.directionalShadow.length=C,i.directionalShadowMap.length=C,i.pointShadow.length=x,i.pointShadowMap.length=x,i.spotShadow.length=U,i.spotShadowMap.length=U,i.directionalShadowMatrix.length=C,i.pointShadowMatrix.length=x,i.spotLightMatrix.length=U+y-R,i.spotLightMap.length=y,i.numSpotLightShadowsWithMaps=R,i.numLightProbes=B,z.directionalLength=m,z.pointLength=d,z.spotLength=f,z.rectAreaLength=v,z.hemiLength=w,z.numDirectionalShadows=C,z.numPointShadows=x,z.numSpotShadows=U,z.numSpotMaps=y,z.numLightProbes=B,i.version=dU++)}function l(c,u){let h=0,p=0,g=0,m=0,d=0;const f=u.matrixWorldInverse;for(let v=0,w=c.length;v<w;v++){const C=c[v];if(C.isDirectionalLight){const x=i.directional[h];x.direction.setFromMatrixPosition(C.matrixWorld),r.setFromMatrixPosition(C.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(f),h++}else if(C.isSpotLight){const x=i.spot[g];x.position.setFromMatrixPosition(C.matrixWorld),x.position.applyMatrix4(f),x.direction.setFromMatrixPosition(C.matrixWorld),r.setFromMatrixPosition(C.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(f),g++}else if(C.isRectAreaLight){const x=i.rectArea[m];x.position.setFromMatrixPosition(C.matrixWorld),x.position.applyMatrix4(f),a.identity(),s.copy(C.matrixWorld),s.premultiply(f),a.extractRotation(s),x.halfWidth.set(C.width*.5,0,0),x.halfHeight.set(0,C.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),m++}else if(C.isPointLight){const x=i.point[p];x.position.setFromMatrixPosition(C.matrixWorld),x.position.applyMatrix4(f),p++}else if(C.isHemisphereLight){const x=i.hemi[d];x.direction.setFromMatrixPosition(C.matrixWorld),x.direction.transformDirection(f),d++}}}return{setup:o,setupView:l,state:i}}function ih(n,e){const A=new gU(n,e),t=[],i=[];function r(){t.length=0,i.length=0}function s(u){t.push(u)}function a(u){i.push(u)}function o(u){A.setup(t,u)}function l(u){A.setupView(t,u)}return{init:r,state:{lightsArray:t,shadowsArray:i,lights:A},setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function mU(n,e){let A=new WeakMap;function t(r,s=0){const a=A.get(r);let o;return a===void 0?(o=new ih(n,e),A.set(r,[o])):s>=a.length?(o=new ih(n,e),a.push(o)):o=a[s],o}function i(){A=new WeakMap}return{get:t,dispose:i}}class BU extends Tr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Aw,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class _U extends Tr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const wU=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,vU=`uniform sampler2D shadow_pass;
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
}`;function EU(n,e,A){let t=new zf;const i=new Se,r=new Se,s=new SA,a=new BU({depthPacking:tw}),o=new _U,l={},c=A.maxTextureSize,u={[Bn]:kA,[kA]:Bn,[gt]:gt},h=new _n({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Se},radius:{value:4}},vertexShader:wU,fragmentShader:vU}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const g=new It;g.setAttribute("position",new bt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const m=new Mt(g,h),d=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Uf;let f=this.type;this.render=function(x,U,y){if(d.enabled===!1||d.autoUpdate===!1&&d.needsUpdate===!1||x.length===0)return;const R=n.getRenderTarget(),B=n.getActiveCubeFace(),M=n.getActiveMipmapLevel(),z=n.state;z.setBlending(fn),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const J=f!==Vt&&this.type===Vt,Y=f===Vt&&this.type!==Vt;for(let T=0,N=x.length;T<N;T++){const X=x[T],K=X.shadow;if(K===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(K.autoUpdate===!1&&K.needsUpdate===!1)continue;i.copy(K.mapSize);const ee=K.getFrameExtents();if(i.multiply(ee),r.copy(K.mapSize),(i.x>c||i.y>c)&&(i.x>c&&(r.x=Math.floor(c/ee.x),i.x=r.x*ee.x,K.mapSize.x=r.x),i.y>c&&(r.y=Math.floor(c/ee.y),i.y=r.y*ee.y,K.mapSize.y=r.y)),K.map===null||J===!0||Y===!0){const q=this.type!==Vt?{minFilter:VA,magFilter:VA}:{};K.map!==null&&K.map.dispose(),K.map=new kn(i.x,i.y,q),K.map.texture.name=X.name+".shadowMap",K.camera.updateProjectionMatrix()}n.setRenderTarget(K.map),n.clear();const Z=K.getViewportCount();for(let q=0;q<Z;q++){const Q=K.getViewport(q);s.set(r.x*Q.x,r.y*Q.y,r.x*Q.z,r.y*Q.w),z.viewport(s),K.updateMatrices(X,q),t=K.getFrustum(),C(U,y,K.camera,X,this.type)}K.isPointLightShadow!==!0&&this.type===Vt&&v(K,y),K.needsUpdate=!1}f=this.type,d.needsUpdate=!1,n.setRenderTarget(R,B,M)};function v(x,U){const y=e.update(m);h.defines.VSM_SAMPLES!==x.blurSamples&&(h.defines.VSM_SAMPLES=x.blurSamples,p.defines.VSM_SAMPLES=x.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),x.mapPass===null&&(x.mapPass=new kn(i.x,i.y)),h.uniforms.shadow_pass.value=x.map.texture,h.uniforms.resolution.value=x.mapSize,h.uniforms.radius.value=x.radius,n.setRenderTarget(x.mapPass),n.clear(),n.renderBufferDirect(U,null,y,h,m,null),p.uniforms.shadow_pass.value=x.mapPass.texture,p.uniforms.resolution.value=x.mapSize,p.uniforms.radius.value=x.radius,n.setRenderTarget(x.map),n.clear(),n.renderBufferDirect(U,null,y,p,m,null)}function w(x,U,y,R){let B=null;const M=y.isPointLight===!0?x.customDistanceMaterial:x.customDepthMaterial;if(M!==void 0)B=M;else if(B=y.isPointLight===!0?o:a,n.localClippingEnabled&&U.clipShadows===!0&&Array.isArray(U.clippingPlanes)&&U.clippingPlanes.length!==0||U.displacementMap&&U.displacementScale!==0||U.alphaMap&&U.alphaTest>0||U.map&&U.alphaTest>0){const z=B.uuid,J=U.uuid;let Y=l[z];Y===void 0&&(Y={},l[z]=Y);let T=Y[J];T===void 0&&(T=B.clone(),Y[J]=T),B=T}if(B.visible=U.visible,B.wireframe=U.wireframe,R===Vt?B.side=U.shadowSide!==null?U.shadowSide:U.side:B.side=U.shadowSide!==null?U.shadowSide:u[U.side],B.alphaMap=U.alphaMap,B.alphaTest=U.alphaTest,B.map=U.map,B.clipShadows=U.clipShadows,B.clippingPlanes=U.clippingPlanes,B.clipIntersection=U.clipIntersection,B.displacementMap=U.displacementMap,B.displacementScale=U.displacementScale,B.displacementBias=U.displacementBias,B.wireframeLinewidth=U.wireframeLinewidth,B.linewidth=U.linewidth,y.isPointLight===!0&&B.isMeshDistanceMaterial===!0){const z=n.properties.get(B);z.light=y}return B}function C(x,U,y,R,B){if(x.visible===!1)return;if(x.layers.test(U.layers)&&(x.isMesh||x.isLine||x.isPoints)&&(x.castShadow||x.receiveShadow&&B===Vt)&&(!x.frustumCulled||t.intersectsObject(x))){x.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,x.matrixWorld);const J=e.update(x),Y=x.material;if(Array.isArray(Y)){const T=J.groups;for(let N=0,X=T.length;N<X;N++){const K=T[N],ee=Y[K.materialIndex];if(ee&&ee.visible){const Z=w(x,ee,R,B);n.renderBufferDirect(y,null,J,Z,x,K)}}}else if(Y.visible){const T=w(x,Y,R,B);n.renderBufferDirect(y,null,J,T,x,null)}}const z=x.children;for(let J=0,Y=z.length;J<Y;J++)C(z[J],U,y,R,B)}}function CU(n,e,A){const t=A.isWebGL2;function i(){let b=!1;const ce=new SA;let Ae=null;const W=new SA(0,0,0,0);return{setMask:function(re){Ae!==re&&!b&&(n.colorMask(re,re,re,re),Ae=re)},setLocked:function(re){b=re},setClear:function(re,xe,Xe,hA,$A){$A===!0&&(re*=hA,xe*=hA,Xe*=hA),ce.set(re,xe,Xe,hA),W.equals(ce)===!1&&(n.clearColor(re,xe,Xe,hA),W.copy(ce))},reset:function(){b=!1,Ae=null,W.set(-1,0,0,0)}}}function r(){let b=!1,ce=null,Ae=null,W=null;return{setTest:function(re){re?De(n.DEPTH_TEST):nA(n.DEPTH_TEST)},setMask:function(re){ce!==re&&!b&&(n.depthMask(re),ce=re)},setFunc:function(re){if(Ae!==re){switch(re){case T_:n.depthFunc(n.NEVER);break;case Q_:n.depthFunc(n.ALWAYS);break;case I_:n.depthFunc(n.LESS);break;case zs:n.depthFunc(n.LEQUAL);break;case L_:n.depthFunc(n.EQUAL);break;case R_:n.depthFunc(n.GEQUAL);break;case D_:n.depthFunc(n.GREATER);break;case H_:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Ae=re}},setLocked:function(re){b=re},setClear:function(re){W!==re&&(n.clearDepth(re),W=re)},reset:function(){b=!1,ce=null,Ae=null,W=null}}}function s(){let b=!1,ce=null,Ae=null,W=null,re=null,xe=null,Xe=null,hA=null,$A=null;return{setTest:function(AA){b||(AA?De(n.STENCIL_TEST):nA(n.STENCIL_TEST))},setMask:function(AA){ce!==AA&&!b&&(n.stencilMask(AA),ce=AA)},setFunc:function(AA,DA,wt){(Ae!==AA||W!==DA||re!==wt)&&(n.stencilFunc(AA,DA,wt),Ae=AA,W=DA,re=wt)},setOp:function(AA,DA,wt){(xe!==AA||Xe!==DA||hA!==wt)&&(n.stencilOp(AA,DA,wt),xe=AA,Xe=DA,hA=wt)},setLocked:function(AA){b=AA},setClear:function(AA){$A!==AA&&(n.clearStencil(AA),$A=AA)},reset:function(){b=!1,ce=null,Ae=null,W=null,re=null,xe=null,Xe=null,hA=null,$A=null}}}const a=new i,o=new r,l=new s,c=new WeakMap,u=new WeakMap;let h={},p={},g=new WeakMap,m=[],d=null,f=!1,v=null,w=null,C=null,x=null,U=null,y=null,R=null,B=new Ze(0,0,0),M=0,z=!1,J=null,Y=null,T=null,N=null,X=null;const K=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let ee=!1,Z=0;const q=n.getParameter(n.VERSION);q.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(q)[1]),ee=Z>=1):q.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),ee=Z>=2);let Q=null,O={};const le=n.getParameter(n.SCISSOR_BOX),he=n.getParameter(n.VIEWPORT),fe=new SA().fromArray(le),Ce=new SA().fromArray(he);function Re(b,ce,Ae,W){const re=new Uint8Array(4),xe=n.createTexture();n.bindTexture(b,xe),n.texParameteri(b,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(b,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Xe=0;Xe<Ae;Xe++)t&&(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)?n.texImage3D(ce,0,n.RGBA,1,1,W,0,n.RGBA,n.UNSIGNED_BYTE,re):n.texImage2D(ce+Xe,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,re);return xe}const Te={};Te[n.TEXTURE_2D]=Re(n.TEXTURE_2D,n.TEXTURE_2D,1),Te[n.TEXTURE_CUBE_MAP]=Re(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),t&&(Te[n.TEXTURE_2D_ARRAY]=Re(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Te[n.TEXTURE_3D]=Re(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),o.setClear(1),l.setClear(0),De(n.DEPTH_TEST),o.setFunc(zs),Oe(!1),He(Oc),De(n.CULL_FACE),Ie(fn);function De(b){h[b]!==!0&&(n.enable(b),h[b]=!0)}function nA(b){h[b]!==!1&&(n.disable(b),h[b]=!1)}function Ge(b,ce){return p[b]!==ce?(n.bindFramebuffer(b,ce),p[b]=ce,t&&(b===n.DRAW_FRAMEBUFFER&&(p[n.FRAMEBUFFER]=ce),b===n.FRAMEBUFFER&&(p[n.DRAW_FRAMEBUFFER]=ce)),!0):!1}function D(b,ce){let Ae=m,W=!1;if(b)if(Ae=g.get(ce),Ae===void 0&&(Ae=[],g.set(ce,Ae)),b.isWebGLMultipleRenderTargets){const re=b.texture;if(Ae.length!==re.length||Ae[0]!==n.COLOR_ATTACHMENT0){for(let xe=0,Xe=re.length;xe<Xe;xe++)Ae[xe]=n.COLOR_ATTACHMENT0+xe;Ae.length=re.length,W=!0}}else Ae[0]!==n.COLOR_ATTACHMENT0&&(Ae[0]=n.COLOR_ATTACHMENT0,W=!0);else Ae[0]!==n.BACK&&(Ae[0]=n.BACK,W=!0);W&&(A.isWebGL2?n.drawBuffers(Ae):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(Ae))}function MA(b){return d!==b?(n.useProgram(b),d=b,!0):!1}const Ue={[Fn]:n.FUNC_ADD,[g_]:n.FUNC_SUBTRACT,[m_]:n.FUNC_REVERSE_SUBTRACT};if(t)Ue[Kc]=n.MIN,Ue[kc]=n.MAX;else{const b=e.get("EXT_blend_minmax");b!==null&&(Ue[Kc]=b.MIN_EXT,Ue[kc]=b.MAX_EXT)}const Qe={[B_]:n.ZERO,[__]:n.ONE,[w_]:n.SRC_COLOR,[jo]:n.SRC_ALPHA,[y_]:n.SRC_ALPHA_SATURATE,[x_]:n.DST_COLOR,[E_]:n.DST_ALPHA,[v_]:n.ONE_MINUS_SRC_COLOR,[$o]:n.ONE_MINUS_SRC_ALPHA,[U_]:n.ONE_MINUS_DST_COLOR,[C_]:n.ONE_MINUS_DST_ALPHA,[S_]:n.CONSTANT_COLOR,[M_]:n.ONE_MINUS_CONSTANT_COLOR,[F_]:n.CONSTANT_ALPHA,[b_]:n.ONE_MINUS_CONSTANT_ALPHA};function Ie(b,ce,Ae,W,re,xe,Xe,hA,$A,AA){if(b===fn){f===!0&&(nA(n.BLEND),f=!1);return}if(f===!1&&(De(n.BLEND),f=!0),b!==p_){if(b!==v||AA!==z){if((w!==Fn||U!==Fn)&&(n.blendEquation(n.FUNC_ADD),w=Fn,U=Fn),AA)switch(b){case xi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Nc:n.blendFunc(n.ONE,n.ONE);break;case Gc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Vc:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",b);break}else switch(b){case xi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Nc:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Gc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Vc:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",b);break}C=null,x=null,y=null,R=null,B.set(0,0,0),M=0,v=b,z=AA}return}re=re||ce,xe=xe||Ae,Xe=Xe||W,(ce!==w||re!==U)&&(n.blendEquationSeparate(Ue[ce],Ue[re]),w=ce,U=re),(Ae!==C||W!==x||xe!==y||Xe!==R)&&(n.blendFuncSeparate(Qe[Ae],Qe[W],Qe[xe],Qe[Xe]),C=Ae,x=W,y=xe,R=Xe),(hA.equals(B)===!1||$A!==M)&&(n.blendColor(hA.r,hA.g,hA.b,$A),B.copy(hA),M=$A),v=b,z=!1}function rA(b,ce){b.side===gt?nA(n.CULL_FACE):De(n.CULL_FACE);let Ae=b.side===kA;ce&&(Ae=!Ae),Oe(Ae),b.blending===xi&&b.transparent===!1?Ie(fn):Ie(b.blending,b.blendEquation,b.blendSrc,b.blendDst,b.blendEquationAlpha,b.blendSrcAlpha,b.blendDstAlpha,b.blendColor,b.blendAlpha,b.premultipliedAlpha),o.setFunc(b.depthFunc),o.setTest(b.depthTest),o.setMask(b.depthWrite),a.setMask(b.colorWrite);const W=b.stencilWrite;l.setTest(W),W&&(l.setMask(b.stencilWriteMask),l.setFunc(b.stencilFunc,b.stencilRef,b.stencilFuncMask),l.setOp(b.stencilFail,b.stencilZFail,b.stencilZPass)),uA(b.polygonOffset,b.polygonOffsetFactor,b.polygonOffsetUnits),b.alphaToCoverage===!0?De(n.SAMPLE_ALPHA_TO_COVERAGE):nA(n.SAMPLE_ALPHA_TO_COVERAGE)}function Oe(b){J!==b&&(b?n.frontFace(n.CW):n.frontFace(n.CCW),J=b)}function He(b){b!==h_?(De(n.CULL_FACE),b!==Y&&(b===Oc?n.cullFace(n.BACK):b===f_?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):nA(n.CULL_FACE),Y=b}function qe(b){b!==T&&(ee&&n.lineWidth(b),T=b)}function uA(b,ce,Ae){b?(De(n.POLYGON_OFFSET_FILL),(N!==ce||X!==Ae)&&(n.polygonOffset(ce,Ae),N=ce,X=Ae)):nA(n.POLYGON_OFFSET_FILL)}function _A(b){b?De(n.SCISSOR_TEST):nA(n.SCISSOR_TEST)}function S(b){b===void 0&&(b=n.TEXTURE0+K-1),Q!==b&&(n.activeTexture(b),Q=b)}function _(b,ce,Ae){Ae===void 0&&(Q===null?Ae=n.TEXTURE0+K-1:Ae=Q);let W=O[Ae];W===void 0&&(W={type:void 0,texture:void 0},O[Ae]=W),(W.type!==b||W.texture!==ce)&&(Q!==Ae&&(n.activeTexture(Ae),Q=Ae),n.bindTexture(b,ce||Te[b]),W.type=b,W.texture=ce)}function H(){const b=O[Q];b!==void 0&&b.type!==void 0&&(n.bindTexture(b.type,null),b.type=void 0,b.texture=void 0)}function ne(){try{n.compressedTexImage2D.apply(n,arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function $(){try{n.compressedTexImage3D.apply(n,arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function ie(){try{n.texSubImage2D.apply(n,arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function we(){try{n.texSubImage3D.apply(n,arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function oe(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function pe(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function F(){try{n.texStorage2D.apply(n,arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function se(){try{n.texStorage3D.apply(n,arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function j(){try{n.texImage2D.apply(n,arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function Me(){try{n.texImage3D.apply(n,arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function ve(b){fe.equals(b)===!1&&(n.scissor(b.x,b.y,b.z,b.w),fe.copy(b))}function ye(b){Ce.equals(b)===!1&&(n.viewport(b.x,b.y,b.z,b.w),Ce.copy(b))}function _e(b,ce){let Ae=u.get(ce);Ae===void 0&&(Ae=new WeakMap,u.set(ce,Ae));let W=Ae.get(b);W===void 0&&(W=n.getUniformBlockIndex(ce,b.name),Ae.set(b,W))}function Be(b,ce){const W=u.get(ce).get(b);c.get(ce)!==W&&(n.uniformBlockBinding(ce,W,b.__bindingPointIndex),c.set(ce,W))}function We(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),t===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},Q=null,O={},p={},g=new WeakMap,m=[],d=null,f=!1,v=null,w=null,C=null,x=null,U=null,y=null,R=null,B=new Ze(0,0,0),M=0,z=!1,J=null,Y=null,T=null,N=null,X=null,fe.set(0,0,n.canvas.width,n.canvas.height),Ce.set(0,0,n.canvas.width,n.canvas.height),a.reset(),o.reset(),l.reset()}return{buffers:{color:a,depth:o,stencil:l},enable:De,disable:nA,bindFramebuffer:Ge,drawBuffers:D,useProgram:MA,setBlending:Ie,setMaterial:rA,setFlipSided:Oe,setCullFace:He,setLineWidth:qe,setPolygonOffset:uA,setScissorTest:_A,activeTexture:S,bindTexture:_,unbindTexture:H,compressedTexImage2D:ne,compressedTexImage3D:$,texImage2D:j,texImage3D:Me,updateUBOMapping:_e,uniformBlockBinding:Be,texStorage2D:F,texStorage3D:se,texSubImage2D:ie,texSubImage3D:we,compressedTexSubImage2D:oe,compressedTexSubImage3D:pe,scissor:ve,viewport:ye,reset:We}}function xU(n,e,A,t,i,r,s){const a=i.isWebGL2,o=i.maxTextures,l=i.maxCubemapSize,c=i.maxTextureSize,u=i.maxSamples,h=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,p=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),g=new WeakMap;let m;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(S,_){return f?new OffscreenCanvas(S,_):Zs("canvas")}function w(S,_,H,ne){let $=1;if((S.width>ne||S.height>ne)&&($=ne/Math.max(S.width,S.height)),$<1||_===!0)if(typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&S instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&S instanceof ImageBitmap){const ie=_?qs:Math.floor,we=ie($*S.width),oe=ie($*S.height);m===void 0&&(m=v(we,oe));const pe=H?v(we,oe):m;return pe.width=we,pe.height=oe,pe.getContext("2d").drawImage(S,0,0,we,oe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+S.width+"x"+S.height+") to ("+we+"x"+oe+")."),pe}else return"data"in S&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+S.width+"x"+S.height+")."),S;return S}function C(S){return rl(S.width)&&rl(S.height)}function x(S){return a?!1:S.wrapS!==mt||S.wrapT!==mt||S.minFilter!==VA&&S.minFilter!==it}function U(S,_){return S.generateMipmaps&&_&&S.minFilter!==VA&&S.minFilter!==it}function y(S){n.generateMipmap(S)}function R(S,_,H,ne,$=!1){if(a===!1)return _;if(S!==null){if(n[S]!==void 0)return n[S];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+S+"'")}let ie=_;if(_===n.RED&&(H===n.FLOAT&&(ie=n.R32F),H===n.HALF_FLOAT&&(ie=n.R16F),H===n.UNSIGNED_BYTE&&(ie=n.R8)),_===n.RED_INTEGER&&(H===n.UNSIGNED_BYTE&&(ie=n.R8UI),H===n.UNSIGNED_SHORT&&(ie=n.R16UI),H===n.UNSIGNED_INT&&(ie=n.R32UI),H===n.BYTE&&(ie=n.R8I),H===n.SHORT&&(ie=n.R16I),H===n.INT&&(ie=n.R32I)),_===n.RG&&(H===n.FLOAT&&(ie=n.RG32F),H===n.HALF_FLOAT&&(ie=n.RG16F),H===n.UNSIGNED_BYTE&&(ie=n.RG8)),_===n.RGBA){const we=$?Ws:$e.getTransfer(ne);H===n.FLOAT&&(ie=n.RGBA32F),H===n.HALF_FLOAT&&(ie=n.RGBA16F),H===n.UNSIGNED_BYTE&&(ie=we===iA?n.SRGB8_ALPHA8:n.RGBA8),H===n.UNSIGNED_SHORT_4_4_4_4&&(ie=n.RGBA4),H===n.UNSIGNED_SHORT_5_5_5_1&&(ie=n.RGB5_A1)}return(ie===n.R16F||ie===n.R32F||ie===n.RG16F||ie===n.RG32F||ie===n.RGBA16F||ie===n.RGBA32F)&&e.get("EXT_color_buffer_float"),ie}function B(S,_,H){return U(S,H)===!0||S.isFramebufferTexture&&S.minFilter!==VA&&S.minFilter!==it?Math.log2(Math.max(_.width,_.height))+1:S.mipmaps!==void 0&&S.mipmaps.length>0?S.mipmaps.length:S.isCompressedTexture&&Array.isArray(S.image)?_.mipmaps.length:1}function M(S){return S===VA||S===zc||S===Ya?n.NEAREST:n.LINEAR}function z(S){const _=S.target;_.removeEventListener("dispose",z),Y(_),_.isVideoTexture&&g.delete(_)}function J(S){const _=S.target;_.removeEventListener("dispose",J),N(_)}function Y(S){const _=t.get(S);if(_.__webglInit===void 0)return;const H=S.source,ne=d.get(H);if(ne){const $=ne[_.__cacheKey];$.usedTimes--,$.usedTimes===0&&T(S),Object.keys(ne).length===0&&d.delete(H)}t.remove(S)}function T(S){const _=t.get(S);n.deleteTexture(_.__webglTexture);const H=S.source,ne=d.get(H);delete ne[_.__cacheKey],s.memory.textures--}function N(S){const _=S.texture,H=t.get(S),ne=t.get(_);if(ne.__webglTexture!==void 0&&(n.deleteTexture(ne.__webglTexture),s.memory.textures--),S.depthTexture&&S.depthTexture.dispose(),S.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(H.__webglFramebuffer[$]))for(let ie=0;ie<H.__webglFramebuffer[$].length;ie++)n.deleteFramebuffer(H.__webglFramebuffer[$][ie]);else n.deleteFramebuffer(H.__webglFramebuffer[$]);H.__webglDepthbuffer&&n.deleteRenderbuffer(H.__webglDepthbuffer[$])}else{if(Array.isArray(H.__webglFramebuffer))for(let $=0;$<H.__webglFramebuffer.length;$++)n.deleteFramebuffer(H.__webglFramebuffer[$]);else n.deleteFramebuffer(H.__webglFramebuffer);if(H.__webglDepthbuffer&&n.deleteRenderbuffer(H.__webglDepthbuffer),H.__webglMultisampledFramebuffer&&n.deleteFramebuffer(H.__webglMultisampledFramebuffer),H.__webglColorRenderbuffer)for(let $=0;$<H.__webglColorRenderbuffer.length;$++)H.__webglColorRenderbuffer[$]&&n.deleteRenderbuffer(H.__webglColorRenderbuffer[$]);H.__webglDepthRenderbuffer&&n.deleteRenderbuffer(H.__webglDepthRenderbuffer)}if(S.isWebGLMultipleRenderTargets)for(let $=0,ie=_.length;$<ie;$++){const we=t.get(_[$]);we.__webglTexture&&(n.deleteTexture(we.__webglTexture),s.memory.textures--),t.remove(_[$])}t.remove(_),t.remove(S)}let X=0;function K(){X=0}function ee(){const S=X;return S>=o&&console.warn("THREE.WebGLTextures: Trying to use "+S+" texture units while this GPU supports only "+o),X+=1,S}function Z(S){const _=[];return _.push(S.wrapS),_.push(S.wrapT),_.push(S.wrapR||0),_.push(S.magFilter),_.push(S.minFilter),_.push(S.anisotropy),_.push(S.internalFormat),_.push(S.format),_.push(S.type),_.push(S.generateMipmaps),_.push(S.premultiplyAlpha),_.push(S.flipY),_.push(S.unpackAlignment),_.push(S.colorSpace),_.join()}function q(S,_){const H=t.get(S);if(S.isVideoTexture&&uA(S),S.isRenderTargetTexture===!1&&S.version>0&&H.__version!==S.version){const ne=S.image;if(ne===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ne.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{De(H,S,_);return}}A.bindTexture(n.TEXTURE_2D,H.__webglTexture,n.TEXTURE0+_)}function Q(S,_){const H=t.get(S);if(S.version>0&&H.__version!==S.version){De(H,S,_);return}A.bindTexture(n.TEXTURE_2D_ARRAY,H.__webglTexture,n.TEXTURE0+_)}function O(S,_){const H=t.get(S);if(S.version>0&&H.__version!==S.version){De(H,S,_);return}A.bindTexture(n.TEXTURE_3D,H.__webglTexture,n.TEXTURE0+_)}function le(S,_){const H=t.get(S);if(S.version>0&&H.__version!==S.version){nA(H,S,_);return}A.bindTexture(n.TEXTURE_CUBE_MAP,H.__webglTexture,n.TEXTURE0+_)}const he={[tl]:n.REPEAT,[mt]:n.CLAMP_TO_EDGE,[nl]:n.MIRRORED_REPEAT},fe={[VA]:n.NEAREST,[zc]:n.NEAREST_MIPMAP_NEAREST,[Ya]:n.NEAREST_MIPMAP_LINEAR,[it]:n.LINEAR,[z_]:n.LINEAR_MIPMAP_NEAREST,[vr]:n.LINEAR_MIPMAP_LINEAR},Ce={[rw]:n.NEVER,[hw]:n.ALWAYS,[sw]:n.LESS,[ow]:n.LEQUAL,[aw]:n.EQUAL,[uw]:n.GEQUAL,[lw]:n.GREATER,[cw]:n.NOTEQUAL};function Re(S,_,H){if(H?(n.texParameteri(S,n.TEXTURE_WRAP_S,he[_.wrapS]),n.texParameteri(S,n.TEXTURE_WRAP_T,he[_.wrapT]),(S===n.TEXTURE_3D||S===n.TEXTURE_2D_ARRAY)&&n.texParameteri(S,n.TEXTURE_WRAP_R,he[_.wrapR]),n.texParameteri(S,n.TEXTURE_MAG_FILTER,fe[_.magFilter]),n.texParameteri(S,n.TEXTURE_MIN_FILTER,fe[_.minFilter])):(n.texParameteri(S,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(S,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(S===n.TEXTURE_3D||S===n.TEXTURE_2D_ARRAY)&&n.texParameteri(S,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(_.wrapS!==mt||_.wrapT!==mt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(S,n.TEXTURE_MAG_FILTER,M(_.magFilter)),n.texParameteri(S,n.TEXTURE_MIN_FILTER,M(_.minFilter)),_.minFilter!==VA&&_.minFilter!==it&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),_.compareFunction&&(n.texParameteri(S,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(S,n.TEXTURE_COMPARE_FUNC,Ce[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const ne=e.get("EXT_texture_filter_anisotropic");if(_.magFilter===VA||_.minFilter!==Ya&&_.minFilter!==vr||_.type===cn&&e.has("OES_texture_float_linear")===!1||a===!1&&_.type===Er&&e.has("OES_texture_half_float_linear")===!1)return;(_.anisotropy>1||t.get(_).__currentAnisotropy)&&(n.texParameterf(S,ne.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,i.getMaxAnisotropy())),t.get(_).__currentAnisotropy=_.anisotropy)}}function Te(S,_){let H=!1;S.__webglInit===void 0&&(S.__webglInit=!0,_.addEventListener("dispose",z));const ne=_.source;let $=d.get(ne);$===void 0&&($={},d.set(ne,$));const ie=Z(_);if(ie!==S.__cacheKey){$[ie]===void 0&&($[ie]={texture:n.createTexture(),usedTimes:0},s.memory.textures++,H=!0),$[ie].usedTimes++;const we=$[S.__cacheKey];we!==void 0&&($[S.__cacheKey].usedTimes--,we.usedTimes===0&&T(_)),S.__cacheKey=ie,S.__webglTexture=$[ie].texture}return H}function De(S,_,H){let ne=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(ne=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(ne=n.TEXTURE_3D);const $=Te(S,_),ie=_.source;A.bindTexture(ne,S.__webglTexture,n.TEXTURE0+H);const we=t.get(ie);if(ie.version!==we.__version||$===!0){A.activeTexture(n.TEXTURE0+H);const oe=$e.getPrimaries($e.workingColorSpace),pe=_.colorSpace===st?null:$e.getPrimaries(_.colorSpace),F=_.colorSpace===st||oe===pe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,F);const se=x(_)&&C(_.image)===!1;let j=w(_.image,se,!1,c);j=_A(_,j);const Me=C(j)||a,ve=r.convert(_.format,_.colorSpace);let ye=r.convert(_.type),_e=R(_.internalFormat,ve,ye,_.colorSpace,_.isVideoTexture);Re(ne,_,Me);let Be;const We=_.mipmaps,b=a&&_.isVideoTexture!==!0,ce=we.__version===void 0||$===!0,Ae=B(_,j,Me);if(_.isDepthTexture)_e=n.DEPTH_COMPONENT,a?_.type===cn?_e=n.DEPTH_COMPONENT32F:_.type===ln?_e=n.DEPTH_COMPONENT24:_.type===Gn?_e=n.DEPTH24_STENCIL8:_e=n.DEPTH_COMPONENT16:_.type===cn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),_.format===Vn&&_e===n.DEPTH_COMPONENT&&_.type!==_l&&_.type!==ln&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),_.type=ln,ye=r.convert(_.type)),_.format===Oi&&_e===n.DEPTH_COMPONENT&&(_e=n.DEPTH_STENCIL,_.type!==Gn&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),_.type=Gn,ye=r.convert(_.type))),ce&&(b?A.texStorage2D(n.TEXTURE_2D,1,_e,j.width,j.height):A.texImage2D(n.TEXTURE_2D,0,_e,j.width,j.height,0,ve,ye,null));else if(_.isDataTexture)if(We.length>0&&Me){b&&ce&&A.texStorage2D(n.TEXTURE_2D,Ae,_e,We[0].width,We[0].height);for(let W=0,re=We.length;W<re;W++)Be=We[W],b?A.texSubImage2D(n.TEXTURE_2D,W,0,0,Be.width,Be.height,ve,ye,Be.data):A.texImage2D(n.TEXTURE_2D,W,_e,Be.width,Be.height,0,ve,ye,Be.data);_.generateMipmaps=!1}else b?(ce&&A.texStorage2D(n.TEXTURE_2D,Ae,_e,j.width,j.height),A.texSubImage2D(n.TEXTURE_2D,0,0,0,j.width,j.height,ve,ye,j.data)):A.texImage2D(n.TEXTURE_2D,0,_e,j.width,j.height,0,ve,ye,j.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){b&&ce&&A.texStorage3D(n.TEXTURE_2D_ARRAY,Ae,_e,We[0].width,We[0].height,j.depth);for(let W=0,re=We.length;W<re;W++)Be=We[W],_.format!==Bt?ve!==null?b?A.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,W,0,0,0,Be.width,Be.height,j.depth,ve,Be.data,0,0):A.compressedTexImage3D(n.TEXTURE_2D_ARRAY,W,_e,Be.width,Be.height,j.depth,0,Be.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):b?A.texSubImage3D(n.TEXTURE_2D_ARRAY,W,0,0,0,Be.width,Be.height,j.depth,ve,ye,Be.data):A.texImage3D(n.TEXTURE_2D_ARRAY,W,_e,Be.width,Be.height,j.depth,0,ve,ye,Be.data)}else{b&&ce&&A.texStorage2D(n.TEXTURE_2D,Ae,_e,We[0].width,We[0].height);for(let W=0,re=We.length;W<re;W++)Be=We[W],_.format!==Bt?ve!==null?b?A.compressedTexSubImage2D(n.TEXTURE_2D,W,0,0,Be.width,Be.height,ve,Be.data):A.compressedTexImage2D(n.TEXTURE_2D,W,_e,Be.width,Be.height,0,Be.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):b?A.texSubImage2D(n.TEXTURE_2D,W,0,0,Be.width,Be.height,ve,ye,Be.data):A.texImage2D(n.TEXTURE_2D,W,_e,Be.width,Be.height,0,ve,ye,Be.data)}else if(_.isDataArrayTexture)b?(ce&&A.texStorage3D(n.TEXTURE_2D_ARRAY,Ae,_e,j.width,j.height,j.depth),A.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,ve,ye,j.data)):A.texImage3D(n.TEXTURE_2D_ARRAY,0,_e,j.width,j.height,j.depth,0,ve,ye,j.data);else if(_.isData3DTexture)b?(ce&&A.texStorage3D(n.TEXTURE_3D,Ae,_e,j.width,j.height,j.depth),A.texSubImage3D(n.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,ve,ye,j.data)):A.texImage3D(n.TEXTURE_3D,0,_e,j.width,j.height,j.depth,0,ve,ye,j.data);else if(_.isFramebufferTexture){if(ce)if(b)A.texStorage2D(n.TEXTURE_2D,Ae,_e,j.width,j.height);else{let W=j.width,re=j.height;for(let xe=0;xe<Ae;xe++)A.texImage2D(n.TEXTURE_2D,xe,_e,W,re,0,ve,ye,null),W>>=1,re>>=1}}else if(We.length>0&&Me){b&&ce&&A.texStorage2D(n.TEXTURE_2D,Ae,_e,We[0].width,We[0].height);for(let W=0,re=We.length;W<re;W++)Be=We[W],b?A.texSubImage2D(n.TEXTURE_2D,W,0,0,ve,ye,Be):A.texImage2D(n.TEXTURE_2D,W,_e,ve,ye,Be);_.generateMipmaps=!1}else b?(ce&&A.texStorage2D(n.TEXTURE_2D,Ae,_e,j.width,j.height),A.texSubImage2D(n.TEXTURE_2D,0,0,0,ve,ye,j)):A.texImage2D(n.TEXTURE_2D,0,_e,ve,ye,j);U(_,Me)&&y(ne),we.__version=ie.version,_.onUpdate&&_.onUpdate(_)}S.__version=_.version}function nA(S,_,H){if(_.image.length!==6)return;const ne=Te(S,_),$=_.source;A.bindTexture(n.TEXTURE_CUBE_MAP,S.__webglTexture,n.TEXTURE0+H);const ie=t.get($);if($.version!==ie.__version||ne===!0){A.activeTexture(n.TEXTURE0+H);const we=$e.getPrimaries($e.workingColorSpace),oe=_.colorSpace===st?null:$e.getPrimaries(_.colorSpace),pe=_.colorSpace===st||we===oe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,pe);const F=_.isCompressedTexture||_.image[0].isCompressedTexture,se=_.image[0]&&_.image[0].isDataTexture,j=[];for(let W=0;W<6;W++)!F&&!se?j[W]=w(_.image[W],!1,!0,l):j[W]=se?_.image[W].image:_.image[W],j[W]=_A(_,j[W]);const Me=j[0],ve=C(Me)||a,ye=r.convert(_.format,_.colorSpace),_e=r.convert(_.type),Be=R(_.internalFormat,ye,_e,_.colorSpace),We=a&&_.isVideoTexture!==!0,b=ie.__version===void 0||ne===!0;let ce=B(_,Me,ve);Re(n.TEXTURE_CUBE_MAP,_,ve);let Ae;if(F){We&&b&&A.texStorage2D(n.TEXTURE_CUBE_MAP,ce,Be,Me.width,Me.height);for(let W=0;W<6;W++){Ae=j[W].mipmaps;for(let re=0;re<Ae.length;re++){const xe=Ae[re];_.format!==Bt?ye!==null?We?A.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,re,0,0,xe.width,xe.height,ye,xe.data):A.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,re,Be,xe.width,xe.height,0,xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):We?A.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,re,0,0,xe.width,xe.height,ye,_e,xe.data):A.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,re,Be,xe.width,xe.height,0,ye,_e,xe.data)}}}else{Ae=_.mipmaps,We&&b&&(Ae.length>0&&ce++,A.texStorage2D(n.TEXTURE_CUBE_MAP,ce,Be,j[0].width,j[0].height));for(let W=0;W<6;W++)if(se){We?A.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,0,0,j[W].width,j[W].height,ye,_e,j[W].data):A.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,Be,j[W].width,j[W].height,0,ye,_e,j[W].data);for(let re=0;re<Ae.length;re++){const Xe=Ae[re].image[W].image;We?A.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,re+1,0,0,Xe.width,Xe.height,ye,_e,Xe.data):A.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,re+1,Be,Xe.width,Xe.height,0,ye,_e,Xe.data)}}else{We?A.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,0,0,ye,_e,j[W]):A.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,Be,ye,_e,j[W]);for(let re=0;re<Ae.length;re++){const xe=Ae[re];We?A.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,re+1,0,0,ye,_e,xe.image[W]):A.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+W,re+1,Be,ye,_e,xe.image[W])}}}U(_,ve)&&y(n.TEXTURE_CUBE_MAP),ie.__version=$.version,_.onUpdate&&_.onUpdate(_)}S.__version=_.version}function Ge(S,_,H,ne,$,ie){const we=r.convert(H.format,H.colorSpace),oe=r.convert(H.type),pe=R(H.internalFormat,we,oe,H.colorSpace);if(!t.get(_).__hasExternalTextures){const se=Math.max(1,_.width>>ie),j=Math.max(1,_.height>>ie);$===n.TEXTURE_3D||$===n.TEXTURE_2D_ARRAY?A.texImage3D($,ie,pe,se,j,_.depth,0,we,oe,null):A.texImage2D($,ie,pe,se,j,0,we,oe,null)}A.bindFramebuffer(n.FRAMEBUFFER,S),qe(_)?h.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ne,$,t.get(H).__webglTexture,0,He(_)):($===n.TEXTURE_2D||$>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,ne,$,t.get(H).__webglTexture,ie),A.bindFramebuffer(n.FRAMEBUFFER,null)}function D(S,_,H){if(n.bindRenderbuffer(n.RENDERBUFFER,S),_.depthBuffer&&!_.stencilBuffer){let ne=a===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(H||qe(_)){const $=_.depthTexture;$&&$.isDepthTexture&&($.type===cn?ne=n.DEPTH_COMPONENT32F:$.type===ln&&(ne=n.DEPTH_COMPONENT24));const ie=He(_);qe(_)?h.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ie,ne,_.width,_.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,ie,ne,_.width,_.height)}else n.renderbufferStorage(n.RENDERBUFFER,ne,_.width,_.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,S)}else if(_.depthBuffer&&_.stencilBuffer){const ne=He(_);H&&qe(_)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,ne,n.DEPTH24_STENCIL8,_.width,_.height):qe(_)?h.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ne,n.DEPTH24_STENCIL8,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,S)}else{const ne=_.isWebGLMultipleRenderTargets===!0?_.texture:[_.texture];for(let $=0;$<ne.length;$++){const ie=ne[$],we=r.convert(ie.format,ie.colorSpace),oe=r.convert(ie.type),pe=R(ie.internalFormat,we,oe,ie.colorSpace),F=He(_);H&&qe(_)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,F,pe,_.width,_.height):qe(_)?h.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,F,pe,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,pe,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function MA(S,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(A.bindFramebuffer(n.FRAMEBUFFER,S),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!t.get(_.depthTexture).__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),q(_.depthTexture,0);const ne=t.get(_.depthTexture).__webglTexture,$=He(_);if(_.depthTexture.format===Vn)qe(_)?h.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ne,0,$):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ne,0);else if(_.depthTexture.format===Oi)qe(_)?h.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ne,0,$):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ne,0);else throw new Error("Unknown depthTexture format")}function Ue(S){const _=t.get(S),H=S.isWebGLCubeRenderTarget===!0;if(S.depthTexture&&!_.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");MA(_.__webglFramebuffer,S)}else if(H){_.__webglDepthbuffer=[];for(let ne=0;ne<6;ne++)A.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[ne]),_.__webglDepthbuffer[ne]=n.createRenderbuffer(),D(_.__webglDepthbuffer[ne],S,!1)}else A.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer=n.createRenderbuffer(),D(_.__webglDepthbuffer,S,!1);A.bindFramebuffer(n.FRAMEBUFFER,null)}function Qe(S,_,H){const ne=t.get(S);_!==void 0&&Ge(ne.__webglFramebuffer,S,S.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),H!==void 0&&Ue(S)}function Ie(S){const _=S.texture,H=t.get(S),ne=t.get(_);S.addEventListener("dispose",J),S.isWebGLMultipleRenderTargets!==!0&&(ne.__webglTexture===void 0&&(ne.__webglTexture=n.createTexture()),ne.__version=_.version,s.memory.textures++);const $=S.isWebGLCubeRenderTarget===!0,ie=S.isWebGLMultipleRenderTargets===!0,we=C(S)||a;if($){H.__webglFramebuffer=[];for(let oe=0;oe<6;oe++)if(a&&_.mipmaps&&_.mipmaps.length>0){H.__webglFramebuffer[oe]=[];for(let pe=0;pe<_.mipmaps.length;pe++)H.__webglFramebuffer[oe][pe]=n.createFramebuffer()}else H.__webglFramebuffer[oe]=n.createFramebuffer()}else{if(a&&_.mipmaps&&_.mipmaps.length>0){H.__webglFramebuffer=[];for(let oe=0;oe<_.mipmaps.length;oe++)H.__webglFramebuffer[oe]=n.createFramebuffer()}else H.__webglFramebuffer=n.createFramebuffer();if(ie)if(i.drawBuffers){const oe=S.texture;for(let pe=0,F=oe.length;pe<F;pe++){const se=t.get(oe[pe]);se.__webglTexture===void 0&&(se.__webglTexture=n.createTexture(),s.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&S.samples>0&&qe(S)===!1){const oe=ie?_:[_];H.__webglMultisampledFramebuffer=n.createFramebuffer(),H.__webglColorRenderbuffer=[],A.bindFramebuffer(n.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let pe=0;pe<oe.length;pe++){const F=oe[pe];H.__webglColorRenderbuffer[pe]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,H.__webglColorRenderbuffer[pe]);const se=r.convert(F.format,F.colorSpace),j=r.convert(F.type),Me=R(F.internalFormat,se,j,F.colorSpace,S.isXRRenderTarget===!0),ve=He(S);n.renderbufferStorageMultisample(n.RENDERBUFFER,ve,Me,S.width,S.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.RENDERBUFFER,H.__webglColorRenderbuffer[pe])}n.bindRenderbuffer(n.RENDERBUFFER,null),S.depthBuffer&&(H.__webglDepthRenderbuffer=n.createRenderbuffer(),D(H.__webglDepthRenderbuffer,S,!0)),A.bindFramebuffer(n.FRAMEBUFFER,null)}}if($){A.bindTexture(n.TEXTURE_CUBE_MAP,ne.__webglTexture),Re(n.TEXTURE_CUBE_MAP,_,we);for(let oe=0;oe<6;oe++)if(a&&_.mipmaps&&_.mipmaps.length>0)for(let pe=0;pe<_.mipmaps.length;pe++)Ge(H.__webglFramebuffer[oe][pe],S,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,pe);else Ge(H.__webglFramebuffer[oe],S,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0);U(_,we)&&y(n.TEXTURE_CUBE_MAP),A.unbindTexture()}else if(ie){const oe=S.texture;for(let pe=0,F=oe.length;pe<F;pe++){const se=oe[pe],j=t.get(se);A.bindTexture(n.TEXTURE_2D,j.__webglTexture),Re(n.TEXTURE_2D,se,we),Ge(H.__webglFramebuffer,S,se,n.COLOR_ATTACHMENT0+pe,n.TEXTURE_2D,0),U(se,we)&&y(n.TEXTURE_2D)}A.unbindTexture()}else{let oe=n.TEXTURE_2D;if((S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(a?oe=S.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),A.bindTexture(oe,ne.__webglTexture),Re(oe,_,we),a&&_.mipmaps&&_.mipmaps.length>0)for(let pe=0;pe<_.mipmaps.length;pe++)Ge(H.__webglFramebuffer[pe],S,_,n.COLOR_ATTACHMENT0,oe,pe);else Ge(H.__webglFramebuffer,S,_,n.COLOR_ATTACHMENT0,oe,0);U(_,we)&&y(oe),A.unbindTexture()}S.depthBuffer&&Ue(S)}function rA(S){const _=C(S)||a,H=S.isWebGLMultipleRenderTargets===!0?S.texture:[S.texture];for(let ne=0,$=H.length;ne<$;ne++){const ie=H[ne];if(U(ie,_)){const we=S.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,oe=t.get(ie).__webglTexture;A.bindTexture(we,oe),y(we),A.unbindTexture()}}}function Oe(S){if(a&&S.samples>0&&qe(S)===!1){const _=S.isWebGLMultipleRenderTargets?S.texture:[S.texture],H=S.width,ne=S.height;let $=n.COLOR_BUFFER_BIT;const ie=[],we=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,oe=t.get(S),pe=S.isWebGLMultipleRenderTargets===!0;if(pe)for(let F=0;F<_.length;F++)A.bindFramebuffer(n.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+F,n.RENDERBUFFER,null),A.bindFramebuffer(n.FRAMEBUFFER,oe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+F,n.TEXTURE_2D,null,0);A.bindFramebuffer(n.READ_FRAMEBUFFER,oe.__webglMultisampledFramebuffer),A.bindFramebuffer(n.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let F=0;F<_.length;F++){ie.push(n.COLOR_ATTACHMENT0+F),S.depthBuffer&&ie.push(we);const se=oe.__ignoreDepthValues!==void 0?oe.__ignoreDepthValues:!1;if(se===!1&&(S.depthBuffer&&($|=n.DEPTH_BUFFER_BIT),S.stencilBuffer&&($|=n.STENCIL_BUFFER_BIT)),pe&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,oe.__webglColorRenderbuffer[F]),se===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[we]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[we])),pe){const j=t.get(_[F]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,j,0)}n.blitFramebuffer(0,0,H,ne,0,0,H,ne,$,n.NEAREST),p&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ie)}if(A.bindFramebuffer(n.READ_FRAMEBUFFER,null),A.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),pe)for(let F=0;F<_.length;F++){A.bindFramebuffer(n.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+F,n.RENDERBUFFER,oe.__webglColorRenderbuffer[F]);const se=t.get(_[F]).__webglTexture;A.bindFramebuffer(n.FRAMEBUFFER,oe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+F,n.TEXTURE_2D,se,0)}A.bindFramebuffer(n.DRAW_FRAMEBUFFER,oe.__webglMultisampledFramebuffer)}}function He(S){return Math.min(u,S.samples)}function qe(S){const _=t.get(S);return a&&S.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function uA(S){const _=s.render.frame;g.get(S)!==_&&(g.set(S,_),S.update())}function _A(S,_){const H=S.colorSpace,ne=S.format,$=S.type;return S.isCompressedTexture===!0||S.isVideoTexture===!0||S.format===il||H!==Xt&&H!==st&&($e.getTransfer(H)===iA?a===!1?e.has("EXT_sRGB")===!0&&ne===Bt?(S.format=il,S.minFilter=it,S.generateMipmaps=!1):_=Df.sRGBToLinear(_):(ne!==Bt||$!==pn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),_}this.allocateTextureUnit=ee,this.resetTextureUnits=K,this.setTexture2D=q,this.setTexture2DArray=Q,this.setTexture3D=O,this.setTextureCube=le,this.rebindTextures=Qe,this.setupRenderTarget=Ie,this.updateRenderTargetMipmap=rA,this.updateMultisampleRenderTarget=Oe,this.setupDepthRenderbuffer=Ue,this.setupFrameBufferTexture=Ge,this.useMultisampledRTT=qe}function UU(n,e,A){const t=A.isWebGL2;function i(r,s=st){let a;const o=$e.getTransfer(s);if(r===pn)return n.UNSIGNED_BYTE;if(r===Ff)return n.UNSIGNED_SHORT_4_4_4_4;if(r===bf)return n.UNSIGNED_SHORT_5_5_5_1;if(r===W_)return n.BYTE;if(r===X_)return n.SHORT;if(r===_l)return n.UNSIGNED_SHORT;if(r===Mf)return n.INT;if(r===ln)return n.UNSIGNED_INT;if(r===cn)return n.FLOAT;if(r===Er)return t?n.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===Y_)return n.ALPHA;if(r===Bt)return n.RGBA;if(r===J_)return n.LUMINANCE;if(r===q_)return n.LUMINANCE_ALPHA;if(r===Vn)return n.DEPTH_COMPONENT;if(r===Oi)return n.DEPTH_STENCIL;if(r===il)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===Z_)return n.RED;if(r===Tf)return n.RED_INTEGER;if(r===j_)return n.RG;if(r===Qf)return n.RG_INTEGER;if(r===If)return n.RGBA_INTEGER;if(r===Ja||r===qa||r===Za||r===ja)if(o===iA)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===Ja)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===qa)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Za)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===ja)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===Ja)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===qa)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Za)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===ja)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Wc||r===Xc||r===Yc||r===Jc)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===Wc)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Xc)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Yc)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Jc)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===$_)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===qc||r===Zc)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(r===qc)return o===iA?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===Zc)return o===iA?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===jc||r===$c||r===eu||r===Au||r===tu||r===nu||r===iu||r===ru||r===su||r===au||r===ou||r===lu||r===cu||r===uu)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(r===jc)return o===iA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===$c)return o===iA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===eu)return o===iA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Au)return o===iA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===tu)return o===iA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===nu)return o===iA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===iu)return o===iA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===ru)return o===iA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===su)return o===iA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===au)return o===iA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===ou)return o===iA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===lu)return o===iA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===cu)return o===iA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===uu)return o===iA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===$a||r===hu||r===fu)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(r===$a)return o===iA?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===hu)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===fu)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===ew||r===du||r===pu||r===gu)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(r===$a)return a.COMPRESSED_RED_RGTC1_EXT;if(r===du)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===pu)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===gu)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Gn?t?n.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):n[r]!==void 0?n[r]:null}return{convert:i}}class yU extends rt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class ar extends zA{constructor(){super(),this.isGroup=!0,this.type="Group"}}const SU={type:"move"};class Co{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ar,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ar,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ar,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const A=this._hand;if(A)for(const t of e.hand.values())this._getHandJoint(A,t)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,A,t){let i=null,r=null,s=null;const a=this._targetRay,o=this._grip,l=this._hand;if(e&&A.session.visibilityState!=="visible-blurred"){if(l&&e.hand){s=!0;for(const m of e.hand.values()){const d=A.getJointPose(m,t),f=this._getHandJoint(l,m);d!==null&&(f.matrix.fromArray(d.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=d.radius),f.visible=d!==null}const c=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],h=c.position.distanceTo(u.position),p=.02,g=.005;l.inputState.pinching&&h>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else o!==null&&e.gripSpace&&(r=A.getPose(e.gripSpace,t),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1));a!==null&&(i=A.getPose(e.targetRaySpace,t),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(SU)))}return a!==null&&(a.visible=i!==null),o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),this}_getHandJoint(e,A){if(e.joints[A.jointName]===void 0){const t=new ar;t.matrixAutoUpdate=!1,t.visible=!1,e.joints[A.jointName]=t,e.add(t)}return e.joints[A.jointName]}}class MU extends jA{constructor(e,A,t,i,r,s,a,o,l,c){if(c=c!==void 0?c:Vn,c!==Vn&&c!==Oi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");t===void 0&&c===Vn&&(t=ln),t===void 0&&c===Oi&&(t=Gn),super(null,i,r,s,a,o,c,t,l),this.isDepthTexture=!0,this.image={width:e,height:A},this.magFilter=a!==void 0?a:VA,this.minFilter=o!==void 0?o:VA,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const A=super.toJSON(e);return this.compareFunction!==null&&(A.compareFunction=this.compareFunction),A}}class FU extends Wn{constructor(e,A){super();const t=this;let i=null,r=1,s=null,a="local-floor",o=1,l=null,c=null,u=null,h=null,p=null,g=null;const m=A.getContextAttributes();let d=null,f=null;const v=[],w=[],C=new rt;C.layers.enable(1),C.viewport=new SA;const x=new rt;x.layers.enable(2),x.viewport=new SA;const U=[C,x],y=new yU;y.layers.enable(1),y.layers.enable(2);let R=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let O=v[Q];return O===void 0&&(O=new Co,v[Q]=O),O.getTargetRaySpace()},this.getControllerGrip=function(Q){let O=v[Q];return O===void 0&&(O=new Co,v[Q]=O),O.getGripSpace()},this.getHand=function(Q){let O=v[Q];return O===void 0&&(O=new Co,v[Q]=O),O.getHandSpace()};function M(Q){const O=w.indexOf(Q.inputSource);if(O===-1)return;const le=v[O];le!==void 0&&(le.update(Q.inputSource,Q.frame,l||s),le.dispatchEvent({type:Q.type,data:Q.inputSource}))}function z(){i.removeEventListener("select",M),i.removeEventListener("selectstart",M),i.removeEventListener("selectend",M),i.removeEventListener("squeeze",M),i.removeEventListener("squeezestart",M),i.removeEventListener("squeezeend",M),i.removeEventListener("end",z),i.removeEventListener("inputsourceschange",J);for(let Q=0;Q<v.length;Q++){const O=w[Q];O!==null&&(w[Q]=null,v[Q].disconnect(O))}R=null,B=null,e.setRenderTarget(d),p=null,h=null,u=null,i=null,f=null,q.stop(),t.isPresenting=!1,t.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){r=Q,t.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){a=Q,t.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||s},this.setReferenceSpace=function(Q){l=Q},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(Q){if(i=Q,i!==null){if(d=e.getRenderTarget(),i.addEventListener("select",M),i.addEventListener("selectstart",M),i.addEventListener("selectend",M),i.addEventListener("squeeze",M),i.addEventListener("squeezestart",M),i.addEventListener("squeezeend",M),i.addEventListener("end",z),i.addEventListener("inputsourceschange",J),m.xrCompatible!==!0&&await A.makeXRCompatible(),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const O={antialias:i.renderState.layers===void 0?m.antialias:!0,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(i,A,O),i.updateRenderState({baseLayer:p}),f=new kn(p.framebufferWidth,p.framebufferHeight,{format:Bt,type:pn,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let O=null,le=null,he=null;m.depth&&(he=m.stencil?A.DEPTH24_STENCIL8:A.DEPTH_COMPONENT24,O=m.stencil?Oi:Vn,le=m.stencil?Gn:ln);const fe={colorFormat:A.RGBA8,depthFormat:he,scaleFactor:r};u=new XRWebGLBinding(i,A),h=u.createProjectionLayer(fe),i.updateRenderState({layers:[h]}),f=new kn(h.textureWidth,h.textureHeight,{format:Bt,type:pn,depthTexture:new MU(h.textureWidth,h.textureHeight,le,void 0,void 0,void 0,void 0,void 0,void 0,O),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0});const Ce=e.properties.get(f);Ce.__ignoreDepthValues=h.ignoreDepthValues}f.isXRRenderTarget=!0,this.setFoveation(o),l=null,s=await i.requestReferenceSpace(a),q.setContext(i),q.start(),t.isPresenting=!0,t.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function J(Q){for(let O=0;O<Q.removed.length;O++){const le=Q.removed[O],he=w.indexOf(le);he>=0&&(w[he]=null,v[he].disconnect(le))}for(let O=0;O<Q.added.length;O++){const le=Q.added[O];let he=w.indexOf(le);if(he===-1){for(let Ce=0;Ce<v.length;Ce++)if(Ce>=w.length){w.push(le),he=Ce;break}else if(w[Ce]===null){w[Ce]=le,he=Ce;break}if(he===-1)break}const fe=v[he];fe&&fe.connect(le)}}const Y=new I,T=new I;function N(Q,O,le){Y.setFromMatrixPosition(O.matrixWorld),T.setFromMatrixPosition(le.matrixWorld);const he=Y.distanceTo(T),fe=O.projectionMatrix.elements,Ce=le.projectionMatrix.elements,Re=fe[14]/(fe[10]-1),Te=fe[14]/(fe[10]+1),De=(fe[9]+1)/fe[5],nA=(fe[9]-1)/fe[5],Ge=(fe[8]-1)/fe[0],D=(Ce[8]+1)/Ce[0],MA=Re*Ge,Ue=Re*D,Qe=he/(-Ge+D),Ie=Qe*-Ge;O.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(Ie),Q.translateZ(Qe),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert();const rA=Re+Qe,Oe=Te+Qe,He=MA-Ie,qe=Ue+(he-Ie),uA=De*Te/Oe*rA,_A=nA*Te/Oe*rA;Q.projectionMatrix.makePerspective(He,qe,uA,_A,rA,Oe),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}function X(Q,O){O===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(O.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(i===null)return;y.near=x.near=C.near=Q.near,y.far=x.far=C.far=Q.far,(R!==y.near||B!==y.far)&&(i.updateRenderState({depthNear:y.near,depthFar:y.far}),R=y.near,B=y.far);const O=Q.parent,le=y.cameras;X(y,O);for(let he=0;he<le.length;he++)X(le[he],O);le.length===2?N(y,C,x):y.projectionMatrix.copy(C.projectionMatrix),K(Q,y,O)};function K(Q,O,le){le===null?Q.matrix.copy(O.matrixWorld):(Q.matrix.copy(le.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(O.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(O.projectionMatrix),Q.projectionMatrixInverse.copy(O.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=Cr*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(h===null&&p===null))return o},this.setFoveation=function(Q){o=Q,h!==null&&(h.fixedFoveation=Q),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Q)};let ee=null;function Z(Q,O){if(c=O.getViewerPose(l||s),g=O,c!==null){const le=c.views;p!==null&&(e.setRenderTargetFramebuffer(f,p.framebuffer),e.setRenderTarget(f));let he=!1;le.length!==y.cameras.length&&(y.cameras.length=0,he=!0);for(let fe=0;fe<le.length;fe++){const Ce=le[fe];let Re=null;if(p!==null)Re=p.getViewport(Ce);else{const De=u.getViewSubImage(h,Ce);Re=De.viewport,fe===0&&(e.setRenderTargetTextures(f,De.colorTexture,h.ignoreDepthValues?void 0:De.depthStencilTexture),e.setRenderTarget(f))}let Te=U[fe];Te===void 0&&(Te=new rt,Te.layers.enable(fe),Te.viewport=new SA,U[fe]=Te),Te.matrix.fromArray(Ce.transform.matrix),Te.matrix.decompose(Te.position,Te.quaternion,Te.scale),Te.projectionMatrix.fromArray(Ce.projectionMatrix),Te.projectionMatrixInverse.copy(Te.projectionMatrix).invert(),Te.viewport.set(Re.x,Re.y,Re.width,Re.height),fe===0&&(y.matrix.copy(Te.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),he===!0&&y.cameras.push(Te)}}for(let le=0;le<v.length;le++){const he=w[le],fe=v[le];he!==null&&fe!==void 0&&fe.update(he,O,l||s)}ee&&ee(Q,O),O.detectedPlanes&&t.dispatchEvent({type:"planesdetected",data:O}),g=null}const q=new Wf;q.setAnimationLoop(Z),this.setAnimationLoop=function(Q){ee=Q},this.dispose=function(){}}}function bU(n,e){function A(d,f){d.matrixAutoUpdate===!0&&d.updateMatrix(),f.value.copy(d.matrix)}function t(d,f){f.color.getRGB(d.fogColor.value,Vf(n)),f.isFog?(d.fogNear.value=f.near,d.fogFar.value=f.far):f.isFogExp2&&(d.fogDensity.value=f.density)}function i(d,f,v,w,C){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(d,f):f.isMeshToonMaterial?(r(d,f),u(d,f)):f.isMeshPhongMaterial?(r(d,f),c(d,f)):f.isMeshStandardMaterial?(r(d,f),h(d,f),f.isMeshPhysicalMaterial&&p(d,f,C)):f.isMeshMatcapMaterial?(r(d,f),g(d,f)):f.isMeshDepthMaterial?r(d,f):f.isMeshDistanceMaterial?(r(d,f),m(d,f)):f.isMeshNormalMaterial?r(d,f):f.isLineBasicMaterial?(s(d,f),f.isLineDashedMaterial&&a(d,f)):f.isPointsMaterial?o(d,f,v,w):f.isSpriteMaterial?l(d,f):f.isShadowMaterial?(d.color.value.copy(f.color),d.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(d,f){d.opacity.value=f.opacity,f.color&&d.diffuse.value.copy(f.color),f.emissive&&d.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(d.map.value=f.map,A(f.map,d.mapTransform)),f.alphaMap&&(d.alphaMap.value=f.alphaMap,A(f.alphaMap,d.alphaMapTransform)),f.bumpMap&&(d.bumpMap.value=f.bumpMap,A(f.bumpMap,d.bumpMapTransform),d.bumpScale.value=f.bumpScale,f.side===kA&&(d.bumpScale.value*=-1)),f.normalMap&&(d.normalMap.value=f.normalMap,A(f.normalMap,d.normalMapTransform),d.normalScale.value.copy(f.normalScale),f.side===kA&&d.normalScale.value.negate()),f.displacementMap&&(d.displacementMap.value=f.displacementMap,A(f.displacementMap,d.displacementMapTransform),d.displacementScale.value=f.displacementScale,d.displacementBias.value=f.displacementBias),f.emissiveMap&&(d.emissiveMap.value=f.emissiveMap,A(f.emissiveMap,d.emissiveMapTransform)),f.specularMap&&(d.specularMap.value=f.specularMap,A(f.specularMap,d.specularMapTransform)),f.alphaTest>0&&(d.alphaTest.value=f.alphaTest);const v=e.get(f).envMap;if(v&&(d.envMap.value=v,d.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,d.reflectivity.value=f.reflectivity,d.ior.value=f.ior,d.refractionRatio.value=f.refractionRatio),f.lightMap){d.lightMap.value=f.lightMap;const w=n._useLegacyLights===!0?Math.PI:1;d.lightMapIntensity.value=f.lightMapIntensity*w,A(f.lightMap,d.lightMapTransform)}f.aoMap&&(d.aoMap.value=f.aoMap,d.aoMapIntensity.value=f.aoMapIntensity,A(f.aoMap,d.aoMapTransform))}function s(d,f){d.diffuse.value.copy(f.color),d.opacity.value=f.opacity,f.map&&(d.map.value=f.map,A(f.map,d.mapTransform))}function a(d,f){d.dashSize.value=f.dashSize,d.totalSize.value=f.dashSize+f.gapSize,d.scale.value=f.scale}function o(d,f,v,w){d.diffuse.value.copy(f.color),d.opacity.value=f.opacity,d.size.value=f.size*v,d.scale.value=w*.5,f.map&&(d.map.value=f.map,A(f.map,d.uvTransform)),f.alphaMap&&(d.alphaMap.value=f.alphaMap,A(f.alphaMap,d.alphaMapTransform)),f.alphaTest>0&&(d.alphaTest.value=f.alphaTest)}function l(d,f){d.diffuse.value.copy(f.color),d.opacity.value=f.opacity,d.rotation.value=f.rotation,f.map&&(d.map.value=f.map,A(f.map,d.mapTransform)),f.alphaMap&&(d.alphaMap.value=f.alphaMap,A(f.alphaMap,d.alphaMapTransform)),f.alphaTest>0&&(d.alphaTest.value=f.alphaTest)}function c(d,f){d.specular.value.copy(f.specular),d.shininess.value=Math.max(f.shininess,1e-4)}function u(d,f){f.gradientMap&&(d.gradientMap.value=f.gradientMap)}function h(d,f){d.metalness.value=f.metalness,f.metalnessMap&&(d.metalnessMap.value=f.metalnessMap,A(f.metalnessMap,d.metalnessMapTransform)),d.roughness.value=f.roughness,f.roughnessMap&&(d.roughnessMap.value=f.roughnessMap,A(f.roughnessMap,d.roughnessMapTransform)),e.get(f).envMap&&(d.envMapIntensity.value=f.envMapIntensity)}function p(d,f,v){d.ior.value=f.ior,f.sheen>0&&(d.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),d.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(d.sheenColorMap.value=f.sheenColorMap,A(f.sheenColorMap,d.sheenColorMapTransform)),f.sheenRoughnessMap&&(d.sheenRoughnessMap.value=f.sheenRoughnessMap,A(f.sheenRoughnessMap,d.sheenRoughnessMapTransform))),f.clearcoat>0&&(d.clearcoat.value=f.clearcoat,d.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(d.clearcoatMap.value=f.clearcoatMap,A(f.clearcoatMap,d.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(d.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,A(f.clearcoatRoughnessMap,d.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(d.clearcoatNormalMap.value=f.clearcoatNormalMap,A(f.clearcoatNormalMap,d.clearcoatNormalMapTransform),d.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===kA&&d.clearcoatNormalScale.value.negate())),f.iridescence>0&&(d.iridescence.value=f.iridescence,d.iridescenceIOR.value=f.iridescenceIOR,d.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],d.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(d.iridescenceMap.value=f.iridescenceMap,A(f.iridescenceMap,d.iridescenceMapTransform)),f.iridescenceThicknessMap&&(d.iridescenceThicknessMap.value=f.iridescenceThicknessMap,A(f.iridescenceThicknessMap,d.iridescenceThicknessMapTransform))),f.transmission>0&&(d.transmission.value=f.transmission,d.transmissionSamplerMap.value=v.texture,d.transmissionSamplerSize.value.set(v.width,v.height),f.transmissionMap&&(d.transmissionMap.value=f.transmissionMap,A(f.transmissionMap,d.transmissionMapTransform)),d.thickness.value=f.thickness,f.thicknessMap&&(d.thicknessMap.value=f.thicknessMap,A(f.thicknessMap,d.thicknessMapTransform)),d.attenuationDistance.value=f.attenuationDistance,d.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(d.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(d.anisotropyMap.value=f.anisotropyMap,A(f.anisotropyMap,d.anisotropyMapTransform))),d.specularIntensity.value=f.specularIntensity,d.specularColor.value.copy(f.specularColor),f.specularColorMap&&(d.specularColorMap.value=f.specularColorMap,A(f.specularColorMap,d.specularColorMapTransform)),f.specularIntensityMap&&(d.specularIntensityMap.value=f.specularIntensityMap,A(f.specularIntensityMap,d.specularIntensityMapTransform))}function g(d,f){f.matcap&&(d.matcap.value=f.matcap)}function m(d,f){const v=e.get(f).light;d.referencePosition.value.setFromMatrixPosition(v.matrixWorld),d.nearDistance.value=v.shadow.camera.near,d.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:t,refreshMaterialUniforms:i}}function TU(n,e,A,t){let i={},r={},s=[];const a=A.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function o(v,w){const C=w.program;t.uniformBlockBinding(v,C)}function l(v,w){let C=i[v.id];C===void 0&&(g(v),C=c(v),i[v.id]=C,v.addEventListener("dispose",d));const x=w.program;t.updateUBOMapping(v,x);const U=e.render.frame;r[v.id]!==U&&(h(v),r[v.id]=U)}function c(v){const w=u();v.__bindingPointIndex=w;const C=n.createBuffer(),x=v.__size,U=v.usage;return n.bindBuffer(n.UNIFORM_BUFFER,C),n.bufferData(n.UNIFORM_BUFFER,x,U),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,C),C}function u(){for(let v=0;v<a;v++)if(s.indexOf(v)===-1)return s.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(v){const w=i[v.id],C=v.uniforms,x=v.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let U=0,y=C.length;U<y;U++){const R=C[U];if(p(R,U,x)===!0){const B=R.__offset,M=Array.isArray(R.value)?R.value:[R.value];let z=0;for(let J=0;J<M.length;J++){const Y=M[J],T=m(Y);typeof Y=="number"?(R.__data[0]=Y,n.bufferSubData(n.UNIFORM_BUFFER,B+z,R.__data)):Y.isMatrix3?(R.__data[0]=Y.elements[0],R.__data[1]=Y.elements[1],R.__data[2]=Y.elements[2],R.__data[3]=Y.elements[0],R.__data[4]=Y.elements[3],R.__data[5]=Y.elements[4],R.__data[6]=Y.elements[5],R.__data[7]=Y.elements[0],R.__data[8]=Y.elements[6],R.__data[9]=Y.elements[7],R.__data[10]=Y.elements[8],R.__data[11]=Y.elements[0]):(Y.toArray(R.__data,z),z+=T.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,B,R.__data)}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(v,w,C){const x=v.value;if(C[w]===void 0){if(typeof x=="number")C[w]=x;else{const U=Array.isArray(x)?x:[x],y=[];for(let R=0;R<U.length;R++)y.push(U[R].clone());C[w]=y}return!0}else if(typeof x=="number"){if(C[w]!==x)return C[w]=x,!0}else{const U=Array.isArray(C[w])?C[w]:[C[w]],y=Array.isArray(x)?x:[x];for(let R=0;R<U.length;R++){const B=U[R];if(B.equals(y[R])===!1)return B.copy(y[R]),!0}}return!1}function g(v){const w=v.uniforms;let C=0;const x=16;let U=0;for(let y=0,R=w.length;y<R;y++){const B=w[y],M={boundary:0,storage:0},z=Array.isArray(B.value)?B.value:[B.value];for(let J=0,Y=z.length;J<Y;J++){const T=z[J],N=m(T);M.boundary+=N.boundary,M.storage+=N.storage}if(B.__data=new Float32Array(M.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=C,y>0){U=C%x;const J=x-U;U!==0&&J-M.boundary<0&&(C+=x-U,B.__offset=C)}C+=M.storage}return U=C%x,U>0&&(C+=x-U),v.__size=C,v.__cache={},this}function m(v){const w={boundary:0,storage:0};return typeof v=="number"?(w.boundary=4,w.storage=4):v.isVector2?(w.boundary=8,w.storage=8):v.isVector3||v.isColor?(w.boundary=16,w.storage=12):v.isVector4?(w.boundary=16,w.storage=16):v.isMatrix3?(w.boundary=48,w.storage=48):v.isMatrix4?(w.boundary=64,w.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),w}function d(v){const w=v.target;w.removeEventListener("dispose",d);const C=s.indexOf(w.__bindingPointIndex);s.splice(C,1),n.deleteBuffer(i[w.id]),delete i[w.id],delete r[w.id]}function f(){for(const v in i)n.deleteBuffer(i[v]);s=[],i={},r={}}return{bind:o,update:l,dispose:f}}class Zf{constructor(e={}){const{canvas:A=Mw(),context:t=null,depth:i=!0,stencil:r=!0,alpha:s=!1,antialias:a=!1,premultipliedAlpha:o=!0,preserveDrawingBuffer:l=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let h;t!==null?h=t.getContextAttributes().alpha:h=s;const p=new Uint32Array(4),g=new Int32Array(4);let m=null,d=null;const f=[],v=[];this.domElement=A,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=UA,this._useLegacyLights=!1,this.toneMapping=dn,this.toneMappingExposure=1;const w=this;let C=!1,x=0,U=0,y=null,R=-1,B=null;const M=new SA,z=new SA;let J=null;const Y=new Ze(0);let T=0,N=A.width,X=A.height,K=1,ee=null,Z=null;const q=new SA(0,0,N,X),Q=new SA(0,0,N,X);let O=!1;const le=new zf;let he=!1,fe=!1,Ce=null;const Re=new CA,Te=new Se,De=new I,nA={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ge(){return y===null?K:1}let D=t;function MA(E,L){for(let P=0;P<E.length;P++){const G=E[P],V=A.getContext(G,L);if(V!==null)return V}return null}try{const E={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:o,preserveDrawingBuffer:l,powerPreference:c,failIfMajorPerformanceCaveat:u};if("setAttribute"in A&&A.setAttribute("data-engine",`three.js r${Bl}`),A.addEventListener("webglcontextlost",We,!1),A.addEventListener("webglcontextrestored",b,!1),A.addEventListener("webglcontextcreationerror",ce,!1),D===null){const L=["webgl2","webgl","experimental-webgl"];if(w.isWebGL1Renderer===!0&&L.shift(),D=MA(L,E),D===null)throw MA(L)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&D instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),D.getShaderPrecisionFormat===void 0&&(D.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let Ue,Qe,Ie,rA,Oe,He,qe,uA,_A,S,_,H,ne,$,ie,we,oe,pe,F,se,j,Me,ve,ye;function _e(){Ue=new GC(D),Qe=new LC(D,Ue,e),Ue.init(Qe),Me=new UU(D,Ue,Qe),Ie=new CU(D,Ue,Qe),rA=new kC(D),Oe=new lU,He=new xU(D,Ue,Ie,Oe,Qe,Me,rA),qe=new DC(w),uA=new NC(w),_A=new $w(D,Qe),ve=new QC(D,Ue,_A,Qe),S=new VC(D,_A,rA,ve),_=new YC(D,S,_A,rA),F=new XC(D,Qe,He),we=new RC(Oe),H=new oU(w,qe,uA,Ue,Qe,ve,we),ne=new bU(w,Oe),$=new uU,ie=new mU(Ue,Qe),pe=new TC(w,qe,uA,Ie,_,h,o),oe=new EU(w,_,Qe),ye=new TU(D,rA,Qe,Ie),se=new IC(D,Ue,rA,Qe),j=new KC(D,Ue,rA,Qe),rA.programs=H.programs,w.capabilities=Qe,w.extensions=Ue,w.properties=Oe,w.renderLists=$,w.shadowMap=oe,w.state=Ie,w.info=rA}_e();const Be=new FU(w,D);this.xr=Be,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const E=Ue.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Ue.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(E){E!==void 0&&(K=E,this.setSize(N,X,!1))},this.getSize=function(E){return E.set(N,X)},this.setSize=function(E,L,P=!0){if(Be.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}N=E,X=L,A.width=Math.floor(E*K),A.height=Math.floor(L*K),P===!0&&(A.style.width=E+"px",A.style.height=L+"px"),this.setViewport(0,0,E,L)},this.getDrawingBufferSize=function(E){return E.set(N*K,X*K).floor()},this.setDrawingBufferSize=function(E,L,P){N=E,X=L,K=P,A.width=Math.floor(E*P),A.height=Math.floor(L*P),this.setViewport(0,0,E,L)},this.getCurrentViewport=function(E){return E.copy(M)},this.getViewport=function(E){return E.copy(q)},this.setViewport=function(E,L,P,G){E.isVector4?q.set(E.x,E.y,E.z,E.w):q.set(E,L,P,G),Ie.viewport(M.copy(q).multiplyScalar(K).floor())},this.getScissor=function(E){return E.copy(Q)},this.setScissor=function(E,L,P,G){E.isVector4?Q.set(E.x,E.y,E.z,E.w):Q.set(E,L,P,G),Ie.scissor(z.copy(Q).multiplyScalar(K).floor())},this.getScissorTest=function(){return O},this.setScissorTest=function(E){Ie.setScissorTest(O=E)},this.setOpaqueSort=function(E){ee=E},this.setTransparentSort=function(E){Z=E},this.getClearColor=function(E){return E.copy(pe.getClearColor())},this.setClearColor=function(){pe.setClearColor.apply(pe,arguments)},this.getClearAlpha=function(){return pe.getClearAlpha()},this.setClearAlpha=function(){pe.setClearAlpha.apply(pe,arguments)},this.clear=function(E=!0,L=!0,P=!0){let G=0;if(E){let V=!1;if(y!==null){const me=y.texture.format;V=me===If||me===Qf||me===Tf}if(V){const me=y.texture.type,Ee=me===pn||me===ln||me===_l||me===Gn||me===Ff||me===bf,Fe=pe.getClearColor(),Le=pe.getClearAlpha(),Ke=Fe.r,Pe=Fe.g,Ne=Fe.b;Ee?(p[0]=Ke,p[1]=Pe,p[2]=Ne,p[3]=Le,D.clearBufferuiv(D.COLOR,0,p)):(g[0]=Ke,g[1]=Pe,g[2]=Ne,g[3]=Le,D.clearBufferiv(D.COLOR,0,g))}else G|=D.COLOR_BUFFER_BIT}L&&(G|=D.DEPTH_BUFFER_BIT),P&&(G|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){A.removeEventListener("webglcontextlost",We,!1),A.removeEventListener("webglcontextrestored",b,!1),A.removeEventListener("webglcontextcreationerror",ce,!1),$.dispose(),ie.dispose(),Oe.dispose(),qe.dispose(),uA.dispose(),_.dispose(),ve.dispose(),ye.dispose(),H.dispose(),Be.dispose(),Be.removeEventListener("sessionstart",$A),Be.removeEventListener("sessionend",AA),Ce&&(Ce.dispose(),Ce=null),DA.stop()};function We(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function b(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const E=rA.autoReset,L=oe.enabled,P=oe.autoUpdate,G=oe.needsUpdate,V=oe.type;_e(),rA.autoReset=E,oe.enabled=L,oe.autoUpdate=P,oe.needsUpdate=G,oe.type=V}function ce(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Ae(E){const L=E.target;L.removeEventListener("dispose",Ae),W(L)}function W(E){re(E),Oe.remove(E)}function re(E){const L=Oe.get(E).programs;L!==void 0&&(L.forEach(function(P){H.releaseProgram(P)}),E.isShaderMaterial&&H.releaseShaderCache(E))}this.renderBufferDirect=function(E,L,P,G,V,me){L===null&&(L=nA);const Ee=V.isMesh&&V.matrixWorld.determinant()<0,Fe=sd(E,L,P,G,V);Ie.setMaterial(G,Ee);let Le=P.index,Ke=1;if(G.wireframe===!0){if(Le=S.getWireframeAttribute(P),Le===void 0)return;Ke=2}const Pe=P.drawRange,Ne=P.attributes.position;let oA=Pe.start*Ke,XA=(Pe.start+Pe.count)*Ke;me!==null&&(oA=Math.max(oA,me.start*Ke),XA=Math.min(XA,(me.start+me.count)*Ke)),Le!==null?(oA=Math.max(oA,0),XA=Math.min(XA,Le.count)):Ne!=null&&(oA=Math.max(oA,0),XA=Math.min(XA,Ne.count));const wA=XA-oA;if(wA<0||wA===1/0)return;ve.setup(V,G,Fe,P,Le);let Lt,aA=se;if(Le!==null&&(Lt=_A.get(Le),aA=j,aA.setIndex(Lt)),V.isMesh)G.wireframe===!0?(Ie.setLineWidth(G.wireframeLinewidth*Ge()),aA.setMode(D.LINES)):aA.setMode(D.TRIANGLES);else if(V.isLine){let Ye=G.linewidth;Ye===void 0&&(Ye=1),Ie.setLineWidth(Ye*Ge()),V.isLineSegments?aA.setMode(D.LINES):V.isLineLoop?aA.setMode(D.LINE_LOOP):aA.setMode(D.LINE_STRIP)}else V.isPoints?aA.setMode(D.POINTS):V.isSprite&&aA.setMode(D.TRIANGLES);if(V.isInstancedMesh)aA.renderInstances(oA,wA,V.count);else if(P.isInstancedBufferGeometry){const Ye=P._maxInstanceCount!==void 0?P._maxInstanceCount:1/0,ma=Math.min(P.instanceCount,Ye);aA.renderInstances(oA,wA,ma)}else aA.render(oA,wA)};function xe(E,L,P){E.transparent===!0&&E.side===gt&&E.forceSinglePass===!1?(E.side=kA,E.needsUpdate=!0,Lr(E,L,P),E.side=Bn,E.needsUpdate=!0,Lr(E,L,P),E.side=gt):Lr(E,L,P)}this.compile=function(E,L,P=null){P===null&&(P=E),d=ie.get(P),d.init(),v.push(d),P.traverseVisible(function(V){V.isLight&&V.layers.test(L.layers)&&(d.pushLight(V),V.castShadow&&d.pushShadow(V))}),E!==P&&E.traverseVisible(function(V){V.isLight&&V.layers.test(L.layers)&&(d.pushLight(V),V.castShadow&&d.pushShadow(V))}),d.setupLights(w._useLegacyLights);const G=new Set;return E.traverse(function(V){const me=V.material;if(me)if(Array.isArray(me))for(let Ee=0;Ee<me.length;Ee++){const Fe=me[Ee];xe(Fe,P,V),G.add(Fe)}else xe(me,P,V),G.add(me)}),v.pop(),d=null,G},this.compileAsync=function(E,L,P=null){const G=this.compile(E,L,P);return new Promise(V=>{function me(){if(G.forEach(function(Ee){Oe.get(Ee).currentProgram.isReady()&&G.delete(Ee)}),G.size===0){V(E);return}setTimeout(me,10)}Ue.get("KHR_parallel_shader_compile")!==null?me():setTimeout(me,10)})};let Xe=null;function hA(E){Xe&&Xe(E)}function $A(){DA.stop()}function AA(){DA.start()}const DA=new Wf;DA.setAnimationLoop(hA),typeof self<"u"&&DA.setContext(self),this.setAnimationLoop=function(E){Xe=E,Be.setAnimationLoop(E),E===null?DA.stop():DA.start()},Be.addEventListener("sessionstart",$A),Be.addEventListener("sessionend",AA),this.render=function(E,L){if(L!==void 0&&L.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),Be.enabled===!0&&Be.isPresenting===!0&&(Be.cameraAutoUpdate===!0&&Be.updateCamera(L),L=Be.getCamera()),E.isScene===!0&&E.onBeforeRender(w,E,L,y),d=ie.get(E,v.length),d.init(),v.push(d),Re.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),le.setFromProjectionMatrix(Re),fe=this.localClippingEnabled,he=we.init(this.clippingPlanes,fe),m=$.get(E,f.length),m.init(),f.push(m),wt(E,L,0,w.sortObjects),m.finish(),w.sortObjects===!0&&m.sort(ee,Z),this.info.render.frame++,he===!0&&we.beginShadows();const P=d.state.shadowsArray;if(oe.render(P,E,L),he===!0&&we.endShadows(),this.info.autoReset===!0&&this.info.reset(),pe.render(m,E),d.setupLights(w._useLegacyLights),L.isArrayCamera){const G=L.cameras;for(let V=0,me=G.length;V<me;V++){const Ee=G[V];Ml(m,E,Ee,Ee.viewport)}}else Ml(m,E,L);y!==null&&(He.updateMultisampleRenderTarget(y),He.updateRenderTargetMipmap(y)),E.isScene===!0&&E.onAfterRender(w,E,L),ve.resetDefaultState(),R=-1,B=null,v.pop(),v.length>0?d=v[v.length-1]:d=null,f.pop(),f.length>0?m=f[f.length-1]:m=null};function wt(E,L,P,G){if(E.visible===!1)return;if(E.layers.test(L.layers)){if(E.isGroup)P=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(L);else if(E.isLight)d.pushLight(E),E.castShadow&&d.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||le.intersectsSprite(E)){G&&De.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Re);const Ee=_.update(E),Fe=E.material;Fe.visible&&m.push(E,Ee,Fe,P,De.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||le.intersectsObject(E))){const Ee=_.update(E),Fe=E.material;if(G&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),De.copy(E.boundingSphere.center)):(Ee.boundingSphere===null&&Ee.computeBoundingSphere(),De.copy(Ee.boundingSphere.center)),De.applyMatrix4(E.matrixWorld).applyMatrix4(Re)),Array.isArray(Fe)){const Le=Ee.groups;for(let Ke=0,Pe=Le.length;Ke<Pe;Ke++){const Ne=Le[Ke],oA=Fe[Ne.materialIndex];oA&&oA.visible&&m.push(E,Ee,oA,P,De.z,Ne)}}else Fe.visible&&m.push(E,Ee,Fe,P,De.z,null)}}const me=E.children;for(let Ee=0,Fe=me.length;Ee<Fe;Ee++)wt(me[Ee],L,P,G)}function Ml(E,L,P,G){const V=E.opaque,me=E.transmissive,Ee=E.transparent;d.setupLightsView(P),he===!0&&we.setGlobalState(w.clippingPlanes,P),me.length>0&&rd(V,me,L,P),G&&Ie.viewport(M.copy(G)),V.length>0&&Ir(V,L,P),me.length>0&&Ir(me,L,P),Ee.length>0&&Ir(Ee,L,P),Ie.buffers.depth.setTest(!0),Ie.buffers.depth.setMask(!0),Ie.buffers.color.setMask(!0),Ie.setPolygonOffset(!1)}function rd(E,L,P,G){if((P.isScene===!0?P.overrideMaterial:null)!==null)return;const me=Qe.isWebGL2;Ce===null&&(Ce=new kn(1,1,{generateMipmaps:!0,type:Ue.has("EXT_color_buffer_half_float")?Er:pn,minFilter:vr,samples:me?4:0})),w.getDrawingBufferSize(Te),me?Ce.setSize(Te.x,Te.y):Ce.setSize(qs(Te.x),qs(Te.y));const Ee=w.getRenderTarget();w.setRenderTarget(Ce),w.getClearColor(Y),T=w.getClearAlpha(),T<1&&w.setClearColor(16777215,.5),w.clear();const Fe=w.toneMapping;w.toneMapping=dn,Ir(E,P,G),He.updateMultisampleRenderTarget(Ce),He.updateRenderTargetMipmap(Ce);let Le=!1;for(let Ke=0,Pe=L.length;Ke<Pe;Ke++){const Ne=L[Ke],oA=Ne.object,XA=Ne.geometry,wA=Ne.material,Lt=Ne.group;if(wA.side===gt&&oA.layers.test(G.layers)){const aA=wA.side;wA.side=kA,wA.needsUpdate=!0,Fl(oA,P,G,XA,wA,Lt),wA.side=aA,wA.needsUpdate=!0,Le=!0}}Le===!0&&(He.updateMultisampleRenderTarget(Ce),He.updateRenderTargetMipmap(Ce)),w.setRenderTarget(Ee),w.setClearColor(Y,T),w.toneMapping=Fe}function Ir(E,L,P){const G=L.isScene===!0?L.overrideMaterial:null;for(let V=0,me=E.length;V<me;V++){const Ee=E[V],Fe=Ee.object,Le=Ee.geometry,Ke=G===null?Ee.material:G,Pe=Ee.group;Fe.layers.test(P.layers)&&Fl(Fe,L,P,Le,Ke,Pe)}}function Fl(E,L,P,G,V,me){E.onBeforeRender(w,L,P,G,V,me),E.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),V.onBeforeRender(w,L,P,G,E,me),V.transparent===!0&&V.side===gt&&V.forceSinglePass===!1?(V.side=kA,V.needsUpdate=!0,w.renderBufferDirect(P,L,G,V,E,me),V.side=Bn,V.needsUpdate=!0,w.renderBufferDirect(P,L,G,V,E,me),V.side=gt):w.renderBufferDirect(P,L,G,V,E,me),E.onAfterRender(w,L,P,G,V,me)}function Lr(E,L,P){L.isScene!==!0&&(L=nA);const G=Oe.get(E),V=d.state.lights,me=d.state.shadowsArray,Ee=V.state.version,Fe=H.getParameters(E,V.state,me,L,P),Le=H.getProgramCacheKey(Fe);let Ke=G.programs;G.environment=E.isMeshStandardMaterial?L.environment:null,G.fog=L.fog,G.envMap=(E.isMeshStandardMaterial?uA:qe).get(E.envMap||G.environment),Ke===void 0&&(E.addEventListener("dispose",Ae),Ke=new Map,G.programs=Ke);let Pe=Ke.get(Le);if(Pe!==void 0){if(G.currentProgram===Pe&&G.lightsStateVersion===Ee)return Tl(E,Fe),Pe}else Fe.uniforms=H.getUniforms(E),E.onBuild(P,Fe,w),E.onBeforeCompile(Fe,w),Pe=H.acquireProgram(Fe,Le),Ke.set(Le,Pe),G.uniforms=Fe.uniforms;const Ne=G.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Ne.clippingPlanes=we.uniform),Tl(E,Fe),G.needsLights=od(E),G.lightsStateVersion=Ee,G.needsLights&&(Ne.ambientLightColor.value=V.state.ambient,Ne.lightProbe.value=V.state.probe,Ne.directionalLights.value=V.state.directional,Ne.directionalLightShadows.value=V.state.directionalShadow,Ne.spotLights.value=V.state.spot,Ne.spotLightShadows.value=V.state.spotShadow,Ne.rectAreaLights.value=V.state.rectArea,Ne.ltc_1.value=V.state.rectAreaLTC1,Ne.ltc_2.value=V.state.rectAreaLTC2,Ne.pointLights.value=V.state.point,Ne.pointLightShadows.value=V.state.pointShadow,Ne.hemisphereLights.value=V.state.hemi,Ne.directionalShadowMap.value=V.state.directionalShadowMap,Ne.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Ne.spotShadowMap.value=V.state.spotShadowMap,Ne.spotLightMatrix.value=V.state.spotLightMatrix,Ne.spotLightMap.value=V.state.spotLightMap,Ne.pointShadowMap.value=V.state.pointShadowMap,Ne.pointShadowMatrix.value=V.state.pointShadowMatrix),G.currentProgram=Pe,G.uniformsList=null,Pe}function bl(E){if(E.uniformsList===null){const L=E.currentProgram.getUniforms();E.uniformsList=Qs.seqWithValue(L.seq,E.uniforms)}return E.uniformsList}function Tl(E,L){const P=Oe.get(E);P.outputColorSpace=L.outputColorSpace,P.instancing=L.instancing,P.instancingColor=L.instancingColor,P.skinning=L.skinning,P.morphTargets=L.morphTargets,P.morphNormals=L.morphNormals,P.morphColors=L.morphColors,P.morphTargetsCount=L.morphTargetsCount,P.numClippingPlanes=L.numClippingPlanes,P.numIntersection=L.numClipIntersection,P.vertexAlphas=L.vertexAlphas,P.vertexTangents=L.vertexTangents,P.toneMapping=L.toneMapping}function sd(E,L,P,G,V){L.isScene!==!0&&(L=nA),He.resetTextureUnits();const me=L.fog,Ee=G.isMeshStandardMaterial?L.environment:null,Fe=y===null?w.outputColorSpace:y.isXRRenderTarget===!0?y.texture.colorSpace:Xt,Le=(G.isMeshStandardMaterial?uA:qe).get(G.envMap||Ee),Ke=G.vertexColors===!0&&!!P.attributes.color&&P.attributes.color.itemSize===4,Pe=!!P.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Ne=!!P.morphAttributes.position,oA=!!P.morphAttributes.normal,XA=!!P.morphAttributes.color;let wA=dn;G.toneMapped&&(y===null||y.isXRRenderTarget===!0)&&(wA=w.toneMapping);const Lt=P.morphAttributes.position||P.morphAttributes.normal||P.morphAttributes.color,aA=Lt!==void 0?Lt.length:0,Ye=Oe.get(G),ma=d.state.lights;if(he===!0&&(fe===!0||E!==B)){const YA=E===B&&G.id===R;we.setState(G,E,YA)}let fA=!1;G.version===Ye.__version?(Ye.needsLights&&Ye.lightsStateVersion!==ma.state.version||Ye.outputColorSpace!==Fe||V.isInstancedMesh&&Ye.instancing===!1||!V.isInstancedMesh&&Ye.instancing===!0||V.isSkinnedMesh&&Ye.skinning===!1||!V.isSkinnedMesh&&Ye.skinning===!0||V.isInstancedMesh&&Ye.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&Ye.instancingColor===!1&&V.instanceColor!==null||Ye.envMap!==Le||G.fog===!0&&Ye.fog!==me||Ye.numClippingPlanes!==void 0&&(Ye.numClippingPlanes!==we.numPlanes||Ye.numIntersection!==we.numIntersection)||Ye.vertexAlphas!==Ke||Ye.vertexTangents!==Pe||Ye.morphTargets!==Ne||Ye.morphNormals!==oA||Ye.morphColors!==XA||Ye.toneMapping!==wA||Qe.isWebGL2===!0&&Ye.morphTargetsCount!==aA)&&(fA=!0):(fA=!0,Ye.__version=G.version);let wn=Ye.currentProgram;fA===!0&&(wn=Lr(G,L,V));let Ql=!1,ki=!1,Ba=!1;const HA=wn.getUniforms(),vn=Ye.uniforms;if(Ie.useProgram(wn.program)&&(Ql=!0,ki=!0,Ba=!0),G.id!==R&&(R=G.id,ki=!0),Ql||B!==E){HA.setValue(D,"projectionMatrix",E.projectionMatrix),HA.setValue(D,"viewMatrix",E.matrixWorldInverse);const YA=HA.map.cameraPosition;YA!==void 0&&YA.setValue(D,De.setFromMatrixPosition(E.matrixWorld)),Qe.logarithmicDepthBuffer&&HA.setValue(D,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&HA.setValue(D,"isOrthographic",E.isOrthographicCamera===!0),B!==E&&(B=E,ki=!0,Ba=!0)}if(V.isSkinnedMesh){HA.setOptional(D,V,"bindMatrix"),HA.setOptional(D,V,"bindMatrixInverse");const YA=V.skeleton;YA&&(Qe.floatVertexTextures?(YA.boneTexture===null&&YA.computeBoneTexture(),HA.setValue(D,"boneTexture",YA.boneTexture,He),HA.setValue(D,"boneTextureSize",YA.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}const _a=P.morphAttributes;if((_a.position!==void 0||_a.normal!==void 0||_a.color!==void 0&&Qe.isWebGL2===!0)&&F.update(V,P,wn),(ki||Ye.receiveShadow!==V.receiveShadow)&&(Ye.receiveShadow=V.receiveShadow,HA.setValue(D,"receiveShadow",V.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(vn.envMap.value=Le,vn.flipEnvMap.value=Le.isCubeTexture&&Le.isRenderTargetTexture===!1?-1:1),ki&&(HA.setValue(D,"toneMappingExposure",w.toneMappingExposure),Ye.needsLights&&ad(vn,Ba),me&&G.fog===!0&&ne.refreshFogUniforms(vn,me),ne.refreshMaterialUniforms(vn,G,K,X,Ce),Qs.upload(D,bl(Ye),vn,He)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Qs.upload(D,bl(Ye),vn,He),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&HA.setValue(D,"center",V.center),HA.setValue(D,"modelViewMatrix",V.modelViewMatrix),HA.setValue(D,"normalMatrix",V.normalMatrix),HA.setValue(D,"modelMatrix",V.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const YA=G.uniformsGroups;for(let wa=0,ld=YA.length;wa<ld;wa++)if(Qe.isWebGL2){const Il=YA[wa];ye.update(Il,wn),ye.bind(Il,wn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return wn}function ad(E,L){E.ambientLightColor.needsUpdate=L,E.lightProbe.needsUpdate=L,E.directionalLights.needsUpdate=L,E.directionalLightShadows.needsUpdate=L,E.pointLights.needsUpdate=L,E.pointLightShadows.needsUpdate=L,E.spotLights.needsUpdate=L,E.spotLightShadows.needsUpdate=L,E.rectAreaLights.needsUpdate=L,E.hemisphereLights.needsUpdate=L}function od(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return x},this.getActiveMipmapLevel=function(){return U},this.getRenderTarget=function(){return y},this.setRenderTargetTextures=function(E,L,P){Oe.get(E.texture).__webglTexture=L,Oe.get(E.depthTexture).__webglTexture=P;const G=Oe.get(E);G.__hasExternalTextures=!0,G.__hasExternalTextures&&(G.__autoAllocateDepthBuffer=P===void 0,G.__autoAllocateDepthBuffer||Ue.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),G.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(E,L){const P=Oe.get(E);P.__webglFramebuffer=L,P.__useDefaultFramebuffer=L===void 0},this.setRenderTarget=function(E,L=0,P=0){y=E,x=L,U=P;let G=!0,V=null,me=!1,Ee=!1;if(E){const Le=Oe.get(E);Le.__useDefaultFramebuffer!==void 0?(Ie.bindFramebuffer(D.FRAMEBUFFER,null),G=!1):Le.__webglFramebuffer===void 0?He.setupRenderTarget(E):Le.__hasExternalTextures&&He.rebindTextures(E,Oe.get(E.texture).__webglTexture,Oe.get(E.depthTexture).__webglTexture);const Ke=E.texture;(Ke.isData3DTexture||Ke.isDataArrayTexture||Ke.isCompressedArrayTexture)&&(Ee=!0);const Pe=Oe.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Pe[L])?V=Pe[L][P]:V=Pe[L],me=!0):Qe.isWebGL2&&E.samples>0&&He.useMultisampledRTT(E)===!1?V=Oe.get(E).__webglMultisampledFramebuffer:Array.isArray(Pe)?V=Pe[P]:V=Pe,M.copy(E.viewport),z.copy(E.scissor),J=E.scissorTest}else M.copy(q).multiplyScalar(K).floor(),z.copy(Q).multiplyScalar(K).floor(),J=O;if(Ie.bindFramebuffer(D.FRAMEBUFFER,V)&&Qe.drawBuffers&&G&&Ie.drawBuffers(E,V),Ie.viewport(M),Ie.scissor(z),Ie.setScissorTest(J),me){const Le=Oe.get(E.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+L,Le.__webglTexture,P)}else if(Ee){const Le=Oe.get(E.texture),Ke=L||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,Le.__webglTexture,P||0,Ke)}R=-1},this.readRenderTargetPixels=function(E,L,P,G,V,me,Ee){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Fe=Oe.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ee!==void 0&&(Fe=Fe[Ee]),Fe){Ie.bindFramebuffer(D.FRAMEBUFFER,Fe);try{const Le=E.texture,Ke=Le.format,Pe=Le.type;if(Ke!==Bt&&Me.convert(Ke)!==D.getParameter(D.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Ne=Pe===Er&&(Ue.has("EXT_color_buffer_half_float")||Qe.isWebGL2&&Ue.has("EXT_color_buffer_float"));if(Pe!==pn&&Me.convert(Pe)!==D.getParameter(D.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Pe===cn&&(Qe.isWebGL2||Ue.has("OES_texture_float")||Ue.has("WEBGL_color_buffer_float")))&&!Ne){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=E.width-G&&P>=0&&P<=E.height-V&&D.readPixels(L,P,G,V,Me.convert(Ke),Me.convert(Pe),me)}finally{const Le=y!==null?Oe.get(y).__webglFramebuffer:null;Ie.bindFramebuffer(D.FRAMEBUFFER,Le)}}},this.copyFramebufferToTexture=function(E,L,P=0){const G=Math.pow(2,-P),V=Math.floor(L.image.width*G),me=Math.floor(L.image.height*G);He.setTexture2D(L,0),D.copyTexSubImage2D(D.TEXTURE_2D,P,0,0,E.x,E.y,V,me),Ie.unbindTexture()},this.copyTextureToTexture=function(E,L,P,G=0){const V=L.image.width,me=L.image.height,Ee=Me.convert(P.format),Fe=Me.convert(P.type);He.setTexture2D(P,0),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,P.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,P.unpackAlignment),L.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,G,E.x,E.y,V,me,Ee,Fe,L.image.data):L.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,G,E.x,E.y,L.mipmaps[0].width,L.mipmaps[0].height,Ee,L.mipmaps[0].data):D.texSubImage2D(D.TEXTURE_2D,G,E.x,E.y,Ee,Fe,L.image),G===0&&P.generateMipmaps&&D.generateMipmap(D.TEXTURE_2D),Ie.unbindTexture()},this.copyTextureToTexture3D=function(E,L,P,G,V=0){if(w.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const me=E.max.x-E.min.x+1,Ee=E.max.y-E.min.y+1,Fe=E.max.z-E.min.z+1,Le=Me.convert(G.format),Ke=Me.convert(G.type);let Pe;if(G.isData3DTexture)He.setTexture3D(G,0),Pe=D.TEXTURE_3D;else if(G.isDataArrayTexture)He.setTexture2DArray(G,0),Pe=D.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,G.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,G.unpackAlignment);const Ne=D.getParameter(D.UNPACK_ROW_LENGTH),oA=D.getParameter(D.UNPACK_IMAGE_HEIGHT),XA=D.getParameter(D.UNPACK_SKIP_PIXELS),wA=D.getParameter(D.UNPACK_SKIP_ROWS),Lt=D.getParameter(D.UNPACK_SKIP_IMAGES),aA=P.isCompressedTexture?P.mipmaps[0]:P.image;D.pixelStorei(D.UNPACK_ROW_LENGTH,aA.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,aA.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,E.min.x),D.pixelStorei(D.UNPACK_SKIP_ROWS,E.min.y),D.pixelStorei(D.UNPACK_SKIP_IMAGES,E.min.z),P.isDataTexture||P.isData3DTexture?D.texSubImage3D(Pe,V,L.x,L.y,L.z,me,Ee,Fe,Le,Ke,aA.data):P.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),D.compressedTexSubImage3D(Pe,V,L.x,L.y,L.z,me,Ee,Fe,Le,aA.data)):D.texSubImage3D(Pe,V,L.x,L.y,L.z,me,Ee,Fe,Le,Ke,aA),D.pixelStorei(D.UNPACK_ROW_LENGTH,Ne),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,oA),D.pixelStorei(D.UNPACK_SKIP_PIXELS,XA),D.pixelStorei(D.UNPACK_SKIP_ROWS,wA),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Lt),V===0&&G.generateMipmaps&&D.generateMipmap(Pe),Ie.unbindTexture()},this.initTexture=function(E){E.isCubeTexture?He.setTextureCube(E,0):E.isData3DTexture?He.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?He.setTexture2DArray(E,0):He.setTexture2D(E,0),Ie.unbindTexture()},this.resetState=function(){x=0,U=0,y=null,Ie.reset(),ve.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return kt}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const A=this.getContext();A.drawingBufferColorSpace=e===wl?"display-p3":"srgb",A.unpackColorSpace=$e.workingColorSpace===ha?"display-p3":"srgb"}get physicallyCorrectLights(){return console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),!this.useLegacyLights}set physicallyCorrectLights(e){console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),this.useLegacyLights=!e}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===UA?Kn:Lf}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Kn?UA:Xt}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class QU extends Zf{}QU.prototype.isWebGL1Renderer=!0;class IU extends zA{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,A){return super.copy(e,A),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const A=super.toJSON(e);return this.fog!==null&&(A.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(A.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(A.object.backgroundIntensity=this.backgroundIntensity),A}}class jf extends Tr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ze(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const rh=new I,sh=new I,ah=new CA,xo=new da,ys=new fa;class LU extends zA{constructor(e=new It,A=new jf){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=A,this.updateMorphTargets()}copy(e,A){return super.copy(e,A),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const A=e.attributes.position,t=[0];for(let i=1,r=A.count;i<r;i++)rh.fromBufferAttribute(A,i-1),sh.fromBufferAttribute(A,i),t[i]=t[i-1],t[i]+=rh.distanceTo(sh);e.setAttribute("lineDistance",new WA(t,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,A){const t=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,s=t.drawRange;if(t.boundingSphere===null&&t.computeBoundingSphere(),ys.copy(t.boundingSphere),ys.applyMatrix4(i),ys.radius+=r,e.ray.intersectsSphere(ys)===!1)return;ah.copy(i).invert(),xo.copy(e.ray).applyMatrix4(ah);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),o=a*a,l=new I,c=new I,u=new I,h=new I,p=this.isLineSegments?2:1,g=t.index,d=t.attributes.position;if(g!==null){const f=Math.max(0,s.start),v=Math.min(g.count,s.start+s.count);for(let w=f,C=v-1;w<C;w+=p){const x=g.getX(w),U=g.getX(w+1);if(l.fromBufferAttribute(d,x),c.fromBufferAttribute(d,U),xo.distanceSqToSegment(l,c,h,u)>o)continue;h.applyMatrix4(this.matrixWorld);const R=e.ray.origin.distanceTo(h);R<e.near||R>e.far||A.push({distance:R,point:u.clone().applyMatrix4(this.matrixWorld),index:w,face:null,faceIndex:null,object:this})}}else{const f=Math.max(0,s.start),v=Math.min(d.count,s.start+s.count);for(let w=f,C=v-1;w<C;w+=p){if(l.fromBufferAttribute(d,w),c.fromBufferAttribute(d,w+1),xo.distanceSqToSegment(l,c,h,u)>o)continue;h.applyMatrix4(this.matrixWorld);const U=e.ray.origin.distanceTo(h);U<e.near||U>e.far||A.push({distance:U,point:u.clone().applyMatrix4(this.matrixWorld),index:w,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const A=this.geometry.morphAttributes,t=Object.keys(A);if(t.length>0){const i=A[t[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=i.length;r<s;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}const oh=new I,lh=new I;class RU extends LU{constructor(e,A){super(e,A),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const A=e.attributes.position,t=[];for(let i=0,r=A.count;i<r;i+=2)oh.fromBufferAttribute(A,i),lh.fromBufferAttribute(A,i+1),t[i]=i===0?0:t[i-1],t[i+1]=t[i]+oh.distanceTo(lh);e.setAttribute("lineDistance",new WA(t,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class yl extends It{constructor(e=1,A=32,t=16,i=0,r=Math.PI*2,s=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:A,heightSegments:t,phiStart:i,phiLength:r,thetaStart:s,thetaLength:a},A=Math.max(3,Math.floor(A)),t=Math.max(2,Math.floor(t));const o=Math.min(s+a,Math.PI);let l=0;const c=[],u=new I,h=new I,p=[],g=[],m=[],d=[];for(let f=0;f<=t;f++){const v=[],w=f/t;let C=0;f===0&&s===0?C=.5/A:f===t&&o===Math.PI&&(C=-.5/A);for(let x=0;x<=A;x++){const U=x/A;u.x=-e*Math.cos(i+U*r)*Math.sin(s+w*a),u.y=e*Math.cos(s+w*a),u.z=e*Math.sin(i+U*r)*Math.sin(s+w*a),g.push(u.x,u.y,u.z),h.copy(u).normalize(),m.push(h.x,h.y,h.z),d.push(U+C,1-w),v.push(l++)}c.push(v)}for(let f=0;f<t;f++)for(let v=0;v<A;v++){const w=c[f][v+1],C=c[f][v],x=c[f+1][v],U=c[f+1][v+1];(f!==0||s>0)&&p.push(w,C,U),(f!==t-1||o<Math.PI)&&p.push(C,x,U)}this.setIndex(p),this.setAttribute("position",new WA(g,3)),this.setAttribute("normal",new WA(m,3)),this.setAttribute("uv",new WA(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yl(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class DU{constructor(e,A,t=0,i=1/0){this.ray=new da(e,A),this.near=t,this.far=i,this.camera=null,this.layers=new El,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,A){this.ray.set(e,A)}setFromCamera(e,A){A.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(A.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(A).sub(this.ray.origin).normalize(),this.camera=A):A.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(A.near+A.far)/(A.near-A.far)).unproject(A),this.ray.direction.set(0,0,-1).transformDirection(A.matrixWorld),this.camera=A):console.error("THREE.Raycaster: Unsupported camera type: "+A.type)}intersectObject(e,A=!0,t=[]){return al(e,this,t,A),t.sort(ch),t}intersectObjects(e,A=!0,t=[]){for(let i=0,r=e.length;i<r;i++)al(e[i],this,t,A);return t.sort(ch),t}}function ch(n,e){return n.distance-e.distance}function al(n,e,A,t){if(n.layers.test(e.layers)&&n.raycast(e,A),t===!0){const i=n.children;for(let r=0,s=i.length;r<s;r++)al(i[r],e,A,!0)}}class uh{constructor(e=1,A=0,t=0){return this.radius=e,this.phi=A,this.theta=t,this}set(e,A,t){return this.radius=e,this.phi=A,this.theta=t,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,A,t){return this.radius=Math.sqrt(e*e+A*A+t*t),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,t),this.phi=Math.acos(RA(A/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class HU extends RU{constructor(e=1){const A=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],t=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],i=new It;i.setAttribute("position",new WA(A,3)),i.setAttribute("color",new WA(t,3));const r=new jf({vertexColors:!0,toneMapped:!1});super(i,r),this.type="AxesHelper"}setColors(e,A,t){const i=new Ze,r=this.geometry.attributes.color.array;return i.set(e),i.toArray(r,0),i.toArray(r,3),i.set(A),i.toArray(r,6),i.toArray(r,9),i.set(t),i.toArray(r,12),i.toArray(r,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Bl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Bl);const hh={type:"change"},Uo={type:"start"},fh={type:"end"},Ss=new da,dh=new tn,PU=Math.cos(70*Sw.DEG2RAD);class OU extends Wn{constructor(e,A){super(),this.object=e,this.domElement=A,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new I,this.cursor=new I,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:$n.ROTATE,MIDDLE:$n.DOLLY,RIGHT:$n.PAN},this.touches={ONE:ei.ROTATE,TWO:ei.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return a.phi},this.getAzimuthalAngle=function(){return a.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(F){F.addEventListener("keydown",_),this._domElementKeyEvents=F},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",_),this._domElementKeyEvents=null},this.saveState=function(){t.target0.copy(t.target),t.position0.copy(t.object.position),t.zoom0=t.object.zoom},this.reset=function(){t.target.copy(t.target0),t.object.position.copy(t.position0),t.object.zoom=t.zoom0,t.object.updateProjectionMatrix(),t.dispatchEvent(hh),t.update(),r=i.NONE},this.update=function(){const F=new I,se=new zn().setFromUnitVectors(e.up,new I(0,1,0)),j=se.clone().invert(),Me=new I,ve=new zn,ye=new I,_e=2*Math.PI;return function(We=null){const b=t.object.position;F.copy(b).sub(t.target),F.applyQuaternion(se),a.setFromVector3(F),t.autoRotate&&r===i.NONE&&z(B(We)),t.enableDamping?(a.theta+=o.theta*t.dampingFactor,a.phi+=o.phi*t.dampingFactor):(a.theta+=o.theta,a.phi+=o.phi);let ce=t.minAzimuthAngle,Ae=t.maxAzimuthAngle;isFinite(ce)&&isFinite(Ae)&&(ce<-Math.PI?ce+=_e:ce>Math.PI&&(ce-=_e),Ae<-Math.PI?Ae+=_e:Ae>Math.PI&&(Ae-=_e),ce<=Ae?a.theta=Math.max(ce,Math.min(Ae,a.theta)):a.theta=a.theta>(ce+Ae)/2?Math.max(ce,a.theta):Math.min(Ae,a.theta)),a.phi=Math.max(t.minPolarAngle,Math.min(t.maxPolarAngle,a.phi)),a.makeSafe(),t.enableDamping===!0?t.target.addScaledVector(c,t.dampingFactor):t.target.add(c),t.target.sub(t.cursor),t.target.clampLength(t.minTargetRadius,t.maxTargetRadius),t.target.add(t.cursor),t.zoomToCursor&&U||t.object.isOrthographicCamera?a.radius=Z(a.radius):a.radius=Z(a.radius*l),F.setFromSpherical(a),F.applyQuaternion(j),b.copy(t.target).add(F),t.object.lookAt(t.target),t.enableDamping===!0?(o.theta*=1-t.dampingFactor,o.phi*=1-t.dampingFactor,c.multiplyScalar(1-t.dampingFactor)):(o.set(0,0,0),c.set(0,0,0));let W=!1;if(t.zoomToCursor&&U){let re=null;if(t.object.isPerspectiveCamera){const xe=F.length();re=Z(xe*l);const Xe=xe-re;t.object.position.addScaledVector(C,Xe),t.object.updateMatrixWorld()}else if(t.object.isOrthographicCamera){const xe=new I(x.x,x.y,0);xe.unproject(t.object),t.object.zoom=Math.max(t.minZoom,Math.min(t.maxZoom,t.object.zoom/l)),t.object.updateProjectionMatrix(),W=!0;const Xe=new I(x.x,x.y,0);Xe.unproject(t.object),t.object.position.sub(Xe).add(xe),t.object.updateMatrixWorld(),re=F.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),t.zoomToCursor=!1;re!==null&&(this.screenSpacePanning?t.target.set(0,0,-1).transformDirection(t.object.matrix).multiplyScalar(re).add(t.object.position):(Ss.origin.copy(t.object.position),Ss.direction.set(0,0,-1).transformDirection(t.object.matrix),Math.abs(t.object.up.dot(Ss.direction))<PU?e.lookAt(t.target):(dh.setFromNormalAndCoplanarPoint(t.object.up,t.target),Ss.intersectPlane(dh,t.target))))}else t.object.isOrthographicCamera&&(t.object.zoom=Math.max(t.minZoom,Math.min(t.maxZoom,t.object.zoom/l)),t.object.updateProjectionMatrix(),W=!0);return l=1,U=!1,W||Me.distanceToSquared(t.object.position)>s||8*(1-ve.dot(t.object.quaternion))>s||ye.distanceToSquared(t.target)>0?(t.dispatchEvent(hh),Me.copy(t.object.position),ve.copy(t.object.quaternion),ye.copy(t.target),W=!1,!0):!1}}(),this.dispose=function(){t.domElement.removeEventListener("contextmenu",$),t.domElement.removeEventListener("pointerdown",Oe),t.domElement.removeEventListener("pointercancel",qe),t.domElement.removeEventListener("wheel",S),t.domElement.removeEventListener("pointermove",He),t.domElement.removeEventListener("pointerup",qe),t._domElementKeyEvents!==null&&(t._domElementKeyEvents.removeEventListener("keydown",_),t._domElementKeyEvents=null)};const t=this,i={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let r=i.NONE;const s=1e-6,a=new uh,o=new uh;let l=1;const c=new I,u=new Se,h=new Se,p=new Se,g=new Se,m=new Se,d=new Se,f=new Se,v=new Se,w=new Se,C=new I,x=new Se;let U=!1;const y=[],R={};function B(F){return F!==null?2*Math.PI/60*t.autoRotateSpeed*F:2*Math.PI/60/60*t.autoRotateSpeed}function M(){return Math.pow(.95,t.zoomSpeed)}function z(F){o.theta-=F}function J(F){o.phi-=F}const Y=function(){const F=new I;return function(j,Me){F.setFromMatrixColumn(Me,0),F.multiplyScalar(-j),c.add(F)}}(),T=function(){const F=new I;return function(j,Me){t.screenSpacePanning===!0?F.setFromMatrixColumn(Me,1):(F.setFromMatrixColumn(Me,0),F.crossVectors(t.object.up,F)),F.multiplyScalar(j),c.add(F)}}(),N=function(){const F=new I;return function(j,Me){const ve=t.domElement;if(t.object.isPerspectiveCamera){const ye=t.object.position;F.copy(ye).sub(t.target);let _e=F.length();_e*=Math.tan(t.object.fov/2*Math.PI/180),Y(2*j*_e/ve.clientHeight,t.object.matrix),T(2*Me*_e/ve.clientHeight,t.object.matrix)}else t.object.isOrthographicCamera?(Y(j*(t.object.right-t.object.left)/t.object.zoom/ve.clientWidth,t.object.matrix),T(Me*(t.object.top-t.object.bottom)/t.object.zoom/ve.clientHeight,t.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),t.enablePan=!1)}}();function X(F){t.object.isPerspectiveCamera||t.object.isOrthographicCamera?l/=F:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),t.enableZoom=!1)}function K(F){t.object.isPerspectiveCamera||t.object.isOrthographicCamera?l*=F:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),t.enableZoom=!1)}function ee(F){if(!t.zoomToCursor)return;U=!0;const se=t.domElement.getBoundingClientRect(),j=F.clientX-se.left,Me=F.clientY-se.top,ve=se.width,ye=se.height;x.x=j/ve*2-1,x.y=-(Me/ye)*2+1,C.set(x.x,x.y,1).unproject(t.object).sub(t.object.position).normalize()}function Z(F){return Math.max(t.minDistance,Math.min(t.maxDistance,F))}function q(F){u.set(F.clientX,F.clientY)}function Q(F){ee(F),f.set(F.clientX,F.clientY)}function O(F){g.set(F.clientX,F.clientY)}function le(F){h.set(F.clientX,F.clientY),p.subVectors(h,u).multiplyScalar(t.rotateSpeed);const se=t.domElement;z(2*Math.PI*p.x/se.clientHeight),J(2*Math.PI*p.y/se.clientHeight),u.copy(h),t.update()}function he(F){v.set(F.clientX,F.clientY),w.subVectors(v,f),w.y>0?X(M()):w.y<0&&K(M()),f.copy(v),t.update()}function fe(F){m.set(F.clientX,F.clientY),d.subVectors(m,g).multiplyScalar(t.panSpeed),N(d.x,d.y),g.copy(m),t.update()}function Ce(F){ee(F),F.deltaY<0?K(M()):F.deltaY>0&&X(M()),t.update()}function Re(F){let se=!1;switch(F.code){case t.keys.UP:F.ctrlKey||F.metaKey||F.shiftKey?J(2*Math.PI*t.rotateSpeed/t.domElement.clientHeight):N(0,t.keyPanSpeed),se=!0;break;case t.keys.BOTTOM:F.ctrlKey||F.metaKey||F.shiftKey?J(-2*Math.PI*t.rotateSpeed/t.domElement.clientHeight):N(0,-t.keyPanSpeed),se=!0;break;case t.keys.LEFT:F.ctrlKey||F.metaKey||F.shiftKey?z(2*Math.PI*t.rotateSpeed/t.domElement.clientHeight):N(t.keyPanSpeed,0),se=!0;break;case t.keys.RIGHT:F.ctrlKey||F.metaKey||F.shiftKey?z(-2*Math.PI*t.rotateSpeed/t.domElement.clientHeight):N(-t.keyPanSpeed,0),se=!0;break}se&&(F.preventDefault(),t.update())}function Te(){if(y.length===1)u.set(y[0].pageX,y[0].pageY);else{const F=.5*(y[0].pageX+y[1].pageX),se=.5*(y[0].pageY+y[1].pageY);u.set(F,se)}}function De(){if(y.length===1)g.set(y[0].pageX,y[0].pageY);else{const F=.5*(y[0].pageX+y[1].pageX),se=.5*(y[0].pageY+y[1].pageY);g.set(F,se)}}function nA(){const F=y[0].pageX-y[1].pageX,se=y[0].pageY-y[1].pageY,j=Math.sqrt(F*F+se*se);f.set(0,j)}function Ge(){t.enableZoom&&nA(),t.enablePan&&De()}function D(){t.enableZoom&&nA(),t.enableRotate&&Te()}function MA(F){if(y.length==1)h.set(F.pageX,F.pageY);else{const j=pe(F),Me=.5*(F.pageX+j.x),ve=.5*(F.pageY+j.y);h.set(Me,ve)}p.subVectors(h,u).multiplyScalar(t.rotateSpeed);const se=t.domElement;z(2*Math.PI*p.x/se.clientHeight),J(2*Math.PI*p.y/se.clientHeight),u.copy(h)}function Ue(F){if(y.length===1)m.set(F.pageX,F.pageY);else{const se=pe(F),j=.5*(F.pageX+se.x),Me=.5*(F.pageY+se.y);m.set(j,Me)}d.subVectors(m,g).multiplyScalar(t.panSpeed),N(d.x,d.y),g.copy(m)}function Qe(F){const se=pe(F),j=F.pageX-se.x,Me=F.pageY-se.y,ve=Math.sqrt(j*j+Me*Me);v.set(0,ve),w.set(0,Math.pow(v.y/f.y,t.zoomSpeed)),X(w.y),f.copy(v)}function Ie(F){t.enableZoom&&Qe(F),t.enablePan&&Ue(F)}function rA(F){t.enableZoom&&Qe(F),t.enableRotate&&MA(F)}function Oe(F){t.enabled!==!1&&(y.length===0&&(t.domElement.setPointerCapture(F.pointerId),t.domElement.addEventListener("pointermove",He),t.domElement.addEventListener("pointerup",qe)),ie(F),F.pointerType==="touch"?H(F):uA(F))}function He(F){t.enabled!==!1&&(F.pointerType==="touch"?ne(F):_A(F))}function qe(F){we(F),y.length===0&&(t.domElement.releasePointerCapture(F.pointerId),t.domElement.removeEventListener("pointermove",He),t.domElement.removeEventListener("pointerup",qe)),t.dispatchEvent(fh),r=i.NONE}function uA(F){let se;switch(F.button){case 0:se=t.mouseButtons.LEFT;break;case 1:se=t.mouseButtons.MIDDLE;break;case 2:se=t.mouseButtons.RIGHT;break;default:se=-1}switch(se){case $n.DOLLY:if(t.enableZoom===!1)return;Q(F),r=i.DOLLY;break;case $n.ROTATE:if(F.ctrlKey||F.metaKey||F.shiftKey){if(t.enablePan===!1)return;O(F),r=i.PAN}else{if(t.enableRotate===!1)return;q(F),r=i.ROTATE}break;case $n.PAN:if(F.ctrlKey||F.metaKey||F.shiftKey){if(t.enableRotate===!1)return;q(F),r=i.ROTATE}else{if(t.enablePan===!1)return;O(F),r=i.PAN}break;default:r=i.NONE}r!==i.NONE&&t.dispatchEvent(Uo)}function _A(F){switch(r){case i.ROTATE:if(t.enableRotate===!1)return;le(F);break;case i.DOLLY:if(t.enableZoom===!1)return;he(F);break;case i.PAN:if(t.enablePan===!1)return;fe(F);break}}function S(F){t.enabled===!1||t.enableZoom===!1||r!==i.NONE||(F.preventDefault(),t.dispatchEvent(Uo),Ce(F),t.dispatchEvent(fh))}function _(F){t.enabled===!1||t.enablePan===!1||Re(F)}function H(F){switch(oe(F),y.length){case 1:switch(t.touches.ONE){case ei.ROTATE:if(t.enableRotate===!1)return;Te(),r=i.TOUCH_ROTATE;break;case ei.PAN:if(t.enablePan===!1)return;De(),r=i.TOUCH_PAN;break;default:r=i.NONE}break;case 2:switch(t.touches.TWO){case ei.DOLLY_PAN:if(t.enableZoom===!1&&t.enablePan===!1)return;Ge(),r=i.TOUCH_DOLLY_PAN;break;case ei.DOLLY_ROTATE:if(t.enableZoom===!1&&t.enableRotate===!1)return;D(),r=i.TOUCH_DOLLY_ROTATE;break;default:r=i.NONE}break;default:r=i.NONE}r!==i.NONE&&t.dispatchEvent(Uo)}function ne(F){switch(oe(F),r){case i.TOUCH_ROTATE:if(t.enableRotate===!1)return;MA(F),t.update();break;case i.TOUCH_PAN:if(t.enablePan===!1)return;Ue(F),t.update();break;case i.TOUCH_DOLLY_PAN:if(t.enableZoom===!1&&t.enablePan===!1)return;Ie(F),t.update();break;case i.TOUCH_DOLLY_ROTATE:if(t.enableZoom===!1&&t.enableRotate===!1)return;rA(F),t.update();break;default:r=i.NONE}}function $(F){t.enabled!==!1&&F.preventDefault()}function ie(F){y.push(F)}function we(F){delete R[F.pointerId];for(let se=0;se<y.length;se++)if(y[se].pointerId==F.pointerId){y.splice(se,1);return}}function oe(F){let se=R[F.pointerId];se===void 0&&(se=new Se,R[F.pointerId]=se),se.set(F.pageX,F.pageY)}function pe(F){const se=F.pointerId===y[0].pointerId?y[1]:y[0];return R[se.pointerId]}t.domElement.addEventListener("contextmenu",$),t.domElement.addEventListener("pointerdown",Oe),t.domElement.addEventListener("pointercancel",qe),t.domElement.addEventListener("wheel",S,{passive:!1}),this.update()}}var Qi,Ln,Ct,Sr;class $f{constructor(e,A={id:"canvas",container:document.body}){ke(this,Qi,void 0);ke(this,Ln,void 0);ke(this,Ct,void 0);ke(this,Sr,void 0);this.model=e,be(this,Qi,A.id),be(this,Ln,A.container)}get container(){return k(this,Ln)}get canvas(){return k(this,Ct)}set canvas(e){if(k(this,Ct)!==void 0)throw Error("Canvas already set");be(this,Ct,e)}get domElement(){if(k(this,Ct)===void 0){const e=this.initializeCanvas();k(this,Qi)!==void 0&&e.setAttribute("id",k(this,Qi)),e.classList.add("sphere");const A=this;let t=!1;return be(this,Sr,new MutationObserver(i=>{t&&i.forEach((r,s,a)=>{A.onMutation(r)})})),k(this,Sr).observe(k(this,Ln),{attributes:!0,attributeFilter:["class"]}),k(this,Ln).appendChild(e),t=!0,e}return k(this,Ct)}set visible(e){k(this,Ct)!==void 0&&(k(this,Ct).style.visibility=e?"visible":"hidden")}}Qi=new WeakMap,Ln=new WeakMap,Ct=new WeakMap,Sr=new WeakMap;class NU{constructor(e,A=void 0,t=void 0){this.setSize(e,A,t),window.addEventListener("resize",()=>{this.setSize(e,A,t),this.onResize()})}setSize(e,A,t){const i=Math.min(innerWidth,e.clientWidth),r=Math.min(innerHeight,e.clientHeight);A!==void 0&&(A.aspect=i/r,A.updateProjectionMatrix()),t!==void 0&&(t.setSize(i,r),t.setPixelRatio(window.devicePixelRatio))}onResize(){}}var gr=function(){var n=0,e=document.createElement("div");e.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",e.addEventListener("click",function(c){c.preventDefault(),t(++n%e.children.length)},!1);function A(c){return e.appendChild(c.dom),c}function t(c){for(var u=0;u<e.children.length;u++)e.children[u].style.display=u===c?"block":"none";n=c}var i=(performance||Date).now(),r=i,s=0,a=A(new gr.Panel("FPS","#0ff","#002")),o=A(new gr.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var l=A(new gr.Panel("MB","#f08","#201"));return t(0),{REVISION:16,dom:e,addPanel:A,showPanel:t,begin:function(){i=(performance||Date).now()},end:function(){s++;var c=(performance||Date).now();if(o.update(c-i,200),c>=r+1e3&&(a.update(s*1e3/(c-r),100),r=c,s=0,l)){var u=performance.memory;l.update(u.usedJSHeapSize/1048576,u.jsHeapSizeLimit/1048576)}return c},update:function(){i=this.end()},domElement:e,setMode:t}};gr.Panel=function(n,e,A){var t=1/0,i=0,r=Math.round,s=r(window.devicePixelRatio||1),a=80*s,o=48*s,l=3*s,c=2*s,u=3*s,h=15*s,p=74*s,g=30*s,m=document.createElement("canvas");m.width=a,m.height=o,m.style.cssText="width:80px;height:48px";var d=m.getContext("2d");return d.font="bold "+9*s+"px Helvetica,Arial,sans-serif",d.textBaseline="top",d.fillStyle=A,d.fillRect(0,0,a,o),d.fillStyle=e,d.fillText(n,l,c),d.fillRect(u,h,p,g),d.fillStyle=A,d.globalAlpha=.9,d.fillRect(u,h,p,g),{dom:m,update:function(f,v){t=Math.min(t,f),i=Math.max(i,f),d.fillStyle=A,d.globalAlpha=1,d.fillRect(0,0,a,h),d.fillStyle=e,d.fillText(r(f)+" "+n+" ("+r(t)+"-"+r(i)+")",l,c),d.drawImage(m,u+s,h,p-s,g,u,h,p-s,g),d.fillRect(u+p-s,h,s,g),d.fillStyle=A,d.globalAlpha=.9,d.fillRect(u+p-s,h,s,r((1-f/v)*g))}}};const GU=gr,ed="visible",gn=GU();gn[ed]=n=>{gn.domElement.style.visibility=n?"visible":"hidden"};gn.showPanel(0);document.body.appendChild(gn.dom);gn[ed](te.view.stats_monitor_visible);var VU=`uniform int u_mode;
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
}`,KU=`#define M_PI 3.1415926535897932384626433832795
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
}`;const yo={x:0,y:0};var Ii,Rn,Li,Kt,ft,NA,Ri,dt,tt,Dn,ea,Hn;class kU extends $f{constructor(A,t={id:"sphere",container:document.body}){super(A,t);ke(this,Ii,void 0);ke(this,Rn,void 0);ke(this,Li,void 0);ke(this,Kt,void 0);ke(this,ft,void 0);ke(this,NA,void 0);ke(this,Ri,void 0);ke(this,dt,void 0);ke(this,tt,void 0);ke(this,Dn,void 0);ke(this,ea,void 0);ke(this,Hn,void 0);this.canvas=this.domElement}initializeCanvas(){be(this,Ii,new I(-1,20,-30)),be(this,Rn,new IU),be(this,Li,new DU),be(this,Kt,new rt(75,this.container.clientWidth/this.container.clientHeight,.1,1e3)),be(this,ft,new Zf({antialias:!0}));const A=k(this,ft).domElement;return this.container.appendChild(A),be(this,ea,new NU(this.container,k(this,Kt),k(this,ft))),be(this,NA,new Mt(this.createSphereGeometry(),this.createSphereMaterial())),k(this,NA).visible=te.view.faces_visible,be(this,dt,new Mt(this.createSphereGeometry(),new Cl({wireframe:!0,side:gt,transparent:!0}))),k(this,dt).visible=te.view.mesh_visible,be(this,Dn,new HU(20)),k(this,Dn).visible=te.view.axes_visible,be(this,tt,new ar),k(this,tt).add(k(this,NA),k(this,dt),k(this,Dn)),k(this,Rn).add(k(this,tt)),be(this,Ri,new OU(k(this,Kt),k(this,ft).domElement)),k(this,Kt).position.z=50,k(this,Ri).update(),this.container.addEventListener(ae.CREATE_SPHERE.toString(),()=>this.createSphere()),this.container.addEventListener("mousemove",t=>{yo.x=t.clientX/this.container.clientWidth*2-1,yo.y=-(t.clientY/this.container.clientHeight)*2+1}),this.container.addEventListener(ae.UPDATE_SPHERE_MATERIAL.toString(),()=>this.updateSphereMaterial()),this.container.addEventListener(ae.UPDATE_VISIBLE.toString(),()=>this.updateVisibility()),this.container.addEventListener(ae.THEME_CHANGED.toString(),()=>this.updateVisibility()),A}onMutation(A){const i=window.getComputedStyle(this.container).getPropertyValue("background-color");k(this,Rn).background=new Ze(i)}get captureElement(){return k(this,ft).domElement}render(){const A=t=>{k(this,Hn)===void 0&&be(this,Hn,t),this._render(t-k(this,Hn)),be(this,Hn,t),requestAnimationFrame(A)};A((performance||Date).now())}_render(A){if(gn.begin(),k(this,Ri).update(),k(this,ft).render(k(this,Rn),k(this,Kt)),k(this,NA).visible||k(this,dt).visible){k(this,Li).setFromCamera(yo,k(this,Kt));const t=k(this,Li).intersectObject(k(this,NA)),i=k(this,NA).material.uniforms;if(t.length>0&&!te.animation.run){const r=t[0].point.clone();i.u_intersect.value=r,this._setIntersect(r)}else i.u_intersect.value=new I,this.domElement.style.cursor="auto"}if(te.animation.trigger_reset)te.animation.trigger_reset=!1,k(this,tt).rotation.x=0,k(this,tt).rotation.y=0,k(this,tt).rotation.z=0;else if(te.animation.run){const t=Math.PI*A/500;k(this,tt).rotation.x+=te.animation.rotation_x*t,k(this,tt).rotation.y+=te.animation.rotation_y*t,k(this,tt).rotation.z+=te.animation.rotation_z*t}gn.end()}_setIntersect(A){if(A.distanceToSquared(k(this,Ii))>n_){this.domElement.style.cursor="none",be(this,Ii,A);const t=te.sphere.radius||1;this.model.applyCut(A.clone().divideScalar(t))}}createSphere(){k(this,NA).geometry.dispose(),k(this,dt).geometry.dispose();const A=this.createSphereGeometry();k(this,NA).geometry=A,k(this,dt).geometry=A,this.updateSphereMaterial()}createSphereGeometry(){const A=te.sphere.segments;return new yl(te.sphere.radius,A,A/2)}createSphereMaterial(){return new _n({vertexShader:VU,fragmentShader:KU,side:gt,transparent:!0,defines:this.defines,uniforms:this.uniforms})}get defines(){return{MAX_JEWELS:Math.max(1,this.model.necklace.length),MODE_STOLEN_NECKLACE:St.STOLEN_NECKLACE,MODE_SHADER_LAMP:St.SHADER_LAMP,MODE_SPACE_COLOR:St.SPACE_COLOR,MODE_SINUSOID:St.SINUSOID}}get uniforms(){return te.sphere.offset_octant/te.sphere.radius,{u_mode:{type:"i",value:te.int_mode},u_necklace_discrete:{type:"b",value:te.necklace.discrete},u_input:{type:"i",value:this.model.necklace},u_count_0:{type:"i",value:this.model.count_0},u_count_1:{type:"i",value:this.model.count_1},u_offset_sphere_octant:{type:"f",value:te.sphere.offset_octant},u_use_bad_on_sphere_check:{type:"b",value:te.sphere.use_bad_on_sphere_check},u_show_borsuk_ulam_proof_shape:{type:"b",value:te.sphere.show_borsuk_ulam_proof_shape},u_radius_vector:{type:"v3",value:new I(te.sphere.radius,te.sphere.radius,te.sphere.radius)},u_scale_color:{type:"v3",value:new I(te.color.scale_red,te.color.scale_green,te.color.scale_blue)},u_epsilon:{type:"f",value:te.necklace.epsilon},u_show_solution_band:{type:"b",value:te.necklace.show_solution_band},u_show_solutions:{type:"b",value:te.necklace.show_solutions},u_show_single_thiefs_region:{type:"b",value:te.view.show_single_thiefs_region},u_alpha:{type:"f",value:te.color.alpha},u_time:{type:"f",value:1},u_resolution:{type:"v2",value:new Se(k(this,ft).domElement.width,k(this,ft).domElement.height)},u_intersect:{type:"v3",value:new I(0,0,0)}}}updateSphereMaterial(){k(this,NA)!==void 0&&k(this,NA).material.dispose(),k(this,NA).material=this.createSphereMaterial(),k(this,dt).material.transparent=te.color.alpha!=1,ae.dispatchEvent(ae.MODEL_CHANGED)}updateVisibility(){k(this,Dn).visible=te.view.axes_visible,k(this,dt).visible=te.view.mesh_visible,k(this,NA).visible=te.view.faces_visible,gn.visible(te.view.stats_monitor_visible),ae.dispatchEvent(ae.MODEL_CHANGED)}}Ii=new WeakMap,Rn=new WeakMap,Li=new WeakMap,Kt=new WeakMap,ft=new WeakMap,NA=new WeakMap,Ri=new WeakMap,dt=new WeakMap,tt=new WeakMap,Dn=new WeakMap,ea=new WeakMap,Hn=new WeakMap;const zU="--jewel-a-color",WU="--jewel-b-color",Ad="--thief-a-color",td="--thief-b-color",XU=`${Ad}-light`,YU=`${td}-light`,JU="--between-jewels-color",qU="--gauge-color",ZU="red",jU="green",$U="rgb(0,191,255)",mi=10,ph=20,ey=5,Ay=7;class ty extends $f{constructor(e,A={id:"necklace",container:document.body}){super(e,A),this.canvas=this.domElement,window.addEventListener("resize",()=>{const t=Math.min(innerWidth,this.container.clientWidth),i=Math.min(innerHeight,this.container.clientHeight);this.canvas.width=t,this.canvas.height=i,this.render()})}onMutation(e){this.render()}initializeCanvas(){const e=document.createElement("canvas");return e.setAttribute("id","necklace"),e.classList.add("necklace"),this.container.addEventListener(ae.NECKLACE_CUT.toString(),()=>this.render()),this.container.addEventListener(ae.MODEL_CHANGED.toString(),()=>this.render()),e}get size(){return this.model.size}get width(){return this.canvas.width}get height(){return this.canvas.height}get jewelWidth(){return this.width/this.size}get thief_a_color(){return getComputedStyle(document.body).getPropertyValue(Ad)}get thief_b_color(){return getComputedStyle(document.body).getPropertyValue(td)}get thief_a_color_light(){return getComputedStyle(document.body).getPropertyValue(XU)}get thief_b_color_light(){return getComputedStyle(document.body).getPropertyValue(YU)}get between_jewels_color(){return getComputedStyle(document.body).getPropertyValue(JU)}get jewel_a_color(){return getComputedStyle(document.body).getPropertyValue(zU)}get jewel_b_color(){return getComputedStyle(document.body).getPropertyValue(WU)}get gauge_color(){return getComputedStyle(document.body).getPropertyValue(qU)}get captureElement(){return this.domElement}get showNecklace(){return te.int_mode===St.STOLEN_NECKLACE&&te.view.necklace_visible}get showGauge(){return te.int_mode===St.STOLEN_NECKLACE&&te.view.gauge_visible}render(){this.canvas!==void 0&&this._render()}_render(){this.canvas.width=this.canvas.clientWidth,this.canvas.height=this.canvas.clientHeight;const e=this.canvas.getContext("2d");if(e!==null){const A=e,t=0,i=0;let r=t;const s=this.model.cuts;if(this.showNecklace&&(this.drawNecklace(A,r,i,s),s!==void 0&&this.drawSegments(A,s)),this.model.thief_a!==void 0&&this.showGauge){const a=this.model.canonicalThief(this.model.thief_a),o=this.model.canonicalThief(this.model.thief_b);this.drawGauge(A,50,a,o)}te.text&&(A.font="12px",A.fillStyle="rgb(255,255,255)",A.fillText(te.text,0,150))}}drawNecklace(e,A,t,i){const s=mi+ph;i===void 0&&(e.fillStyle=this.between_jewels_color,e.fillRect(A,t,this.width,mi));const a=this.jewel_a_color,o=this.jewel_b_color;let l=A;for(let c=0;c<this.size;c++){const u=this.model.necklace[Math.floor(c)];e.fillStyle=u===0?a:o,e.fillRect(l,t+this.yOffset(i,c/this.size,s),this.jewelWidth-2,mi),l+=this.jewelWidth}}drawSegments(e,A){let t=0;e.save(),e.lineWidth=this.showNecklace?1:mi,e.strokeStyle=ZU,t=this.drawSegment(e,t,A.x),e.strokeStyle=jU,t=this.drawSegment(e,t,A.y),e.strokeStyle=$U,t=this.drawSegment(e,t,A.z),e.restore()}drawSegment(e,A,t){e.beginPath();const i=this.yOffsetSegment(t)+e.lineWidth;e.moveTo(A,i);const r=A+Math.ceil(t*t*this.width);return e.lineTo(r,i),e.stroke(),r}yOffsetSegment(e){const A=this.showNecklace?ey:ph+mi;return(e<0?A:0)+(this.showNecklace?mi+Ay:0)}drawGauge(e,A,t,i){const r=this.height-A,s=3,o=r-2;if(o>=10){const l=Math.SQRT1_2*o,c=this.width/2-o,u=new Se(c+o,A+o),h=this.thief_a_color,p=this.thief_b_color,g=this.gauge_color;e.beginPath(),e.fillStyle=this.thief_a_color_light,e.moveTo(u.x,u.y),e.arc(u.x,u.y,o,-Math.PI,-Math.PI/2),e.lineTo(u.x,u.y),e.closePath(),e.fill(),e.beginPath(),e.fillStyle=this.thief_b_color_light,e.moveTo(u.x,u.y),e.arc(u.x,u.y,o,-Math.PI/2,0),e.lineTo(u.x,u.y),e.closePath(),e.fill(),e.beginPath(),e.lineWidth=1,e.setLineDash([1,1]),e.arc(u.x,u.y,o/2,0,-Math.PI,!0),e.stroke(),e.beginPath(),e.strokeStyle=h,e.setLineDash([]),e.moveTo(u.x,u.y),e.lineTo(u.x-t.x*l,u.y-t.y*l),e.stroke(),e.beginPath(),e.strokeStyle=p,e.moveTo(u.x,u.y),e.lineTo(u.x+i.x*l,u.y-i.y*l),e.stroke();const m=1-Math.SQRT1_2*t.distanceTo(i),d=255+(0-255)*m,f=0+(255-0)*m;e.beginPath(),e.lineWidth=s,e.strokeStyle=`rgb(${d},${f}, 0)`,e.arc(u.x,u.y,o,-Math.PI,-Math.PI*(1-m),!1),e.stroke(),e.beginPath(),e.lineWidth=s,e.strokeStyle=g,e.arc(u.x,u.y,o,-Math.PI*(1-m),0,!1),e.stroke()}}yOffset(e,A,t){if(e===void 0)return 0;const i=e.x*e.x,r=e.y*e.y;return A<i?e.x<0?t:0:A<i+r?e.y<0?t:0:e.z<0?t:0}}function gh(n){return n%1}var xt,QA,Pn,Ut;class ny{constructor(){ke(this,xt,void 0);ke(this,QA,void 0);ke(this,Pn,void 0);ke(this,Ut,void 0);this.initializeStatus(0),window.addEventListener(ae.SET_NECKLACE_CONFIGURATION_BY_NUMBER,()=>this.necklaceFromInt(te.necklace.configuration,te.necklace.number_of_jewels)),window.addEventListener(ae.SET_NECKLACE_CONFIGURATION_BY_STRING,()=>this.necklaceFromStr(te.necklace.string))}get necklace(){return[...k(this,xt)]}necklaceFromInt(e,A){this.initializeStatus(A);const t=e.toString(2);if(e!=0){const i=t.length-1;for(let r=i;r>=0;r--)k(this,xt)[i-r]=t[r]==="0"?0:1}for(const i of k(this,xt))i===0?k(this,QA).x+=1:k(this,QA).y+=1;ae.dispatchEvent(ae.UPDATE_SPHERE_MATERIAL)}necklaceFromStr(e){this.initializeStatus(1),be(this,xt,[]);for(let A=0;A<e.length;A++){const t=e.charCodeAt(A),i=t.toString(2);if(t!=0)for(const r of i)k(this,xt).push(r==="0"?0:1)}for(const A of k(this,xt))A===0?k(this,QA).x+=1:k(this,QA).y+=1;ae.dispatchEvent(ae.UPDATE_SPHERE_MATERIAL)}get size(){if(this.cnt.x<0||this.cnt.y<0)throw Error("Necklace not initialized");return this.cnt.x+this.cnt.y}applyCut(e){this.cuts=e,e!==void 0&&be(this,Ut,te.necklace.discrete?this.applyCutDiscrete(e):this.applyCutContinous(e)),ae.dispatchEvent(ae.NECKLACE_CUT)}applyCutDiscrete(e){if(this.cuts=e,e){const A=this.size,t=e.x*e.x*A,i=e.y*e.y*A,r=[0,0];for(let s=0;s<A;s++){const a=this.necklace[s],o=s;o<t?e.x>0&&r[a]++:o<t+i?e.y>0&&r[a]++:e.z>0&&r[a]++}return new Se(r[0],r[1])}return new Se(0,0)}applyCutContinous(e){if(this.cuts=e,e){const A=this.size,t=e.x*e.x*A,i=e.y*e.y*A,r=[0,0];for(let s=0;s<A;s++){const a=this.necklace[s],o=s+1;let l=0,c=0,u=0;o<=Math.ceil(t)?o<=Math.floor(t)?l=1:(l=gh(t),o>t+i?(c=i,u=1-l-c):c=1-l):o<=Math.ceil(t+i)?o<=Math.floor(t+i)?c=1:(c=gh(t+i),u=1-c):u=1,l!==0&&e.x>0&&(r[a]+=l),c!==0&&e.y>0&&(r[a]+=c),u!==0&&e.z>0&&(r[a]+=u)}return new Se(r[0],r[1])}return new Se(0,0)}initializeStatus(e){be(this,xt,Array(e).fill(0)),be(this,QA,new Se(0,0)),be(this,Pn,new I(0,0)),be(this,Ut,new Se(0,0))}get cnt(){return k(this,QA).clone()}set cnt(e){be(this,QA,e.clone())}get count_0(){return k(this,QA).x}get count_1(){return k(this,QA).y}get cuts(){return k(this,Pn)?k(this,Pn).clone():void 0}set cuts(e){e!==void 0&&(this.assertSphere(e),be(this,Pn,e.clone()))}assertSphere(e,A=1){if(e.length()-A>Zo)throw new Error(`Input vector ${e} not close enough to sphere with radius ${A}, dist to orgin: ${e.length()}`)}get thief_a(){return k(this,Ut)!==void 0?k(this,Ut).clone():new Se(0,0)}set thief_a(e){be(this,Ut,e.clone())}get thief_b(){return k(this,Ut)!==void 0?this.cnt.sub(k(this,Ut)):new Se(0,0)}canonicalThief(e){const A=k(this,QA).x!==0?e.x/k(this,QA).x:0,t=k(this,QA).y!==0?e.y/k(this,QA).y:0;return new Se(A,t)}}xt=new WeakMap,QA=new WeakMap,Pn=new WeakMap,Ut=new WeakMap;const iy=new ks,ry=new c_,nd=new ny,id=new kU(nd),sy=new ty(nd);ae.dispatchEvent(ae.SET_NECKLACE_CONFIGURATION_BY_NUMBER);id.render();new u_({folder:iy.captureFolder,property:te.capture},{all:document.body,sphere:id.captureElement,necklace:sy.captureElement});const Sl=document.createElement("SPAN");Sl.setAttribute("id","version-info");Sl.innerHTML="v0.4.9";document.body.insertAdjacentElement("beforeend",Sl);ry.initTheme();
