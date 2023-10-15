var da=(n,e,A)=>{if(!e.has(n))throw TypeError("Cannot "+A)};var V=(n,e,A)=>(da(n,e,"read from private field"),A?A.call(n):e.get(n)),Xe=(n,e,A)=>{if(e.has(n))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(n):e.set(n,A)},He=(n,e,A,t)=>(da(n,e,"write to private field"),t?t.call(n,A):e.set(n,A),A);var _l=(n,e,A)=>(da(n,e,"access private method"),A);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))t(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&t(s)}).observe(document,{childList:!0,subtree:!0});function A(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(i){if(i.ep)return;i.ep=!0;const r=A(i);fetch(i.href,r)}})();/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.17.0
 * @author George Michael Brower
 * @license MIT
 */class yt{constructor(e,A,t,i,r="div"){this.parent=e,this.object=A,this.property=t,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement("div"),this.domElement.classList.add("controller"),this.domElement.classList.add(i),this.$name=document.createElement("div"),this.$name.classList.add("name"),yt.nextNameID=yt.nextNameID||0,this.$name.id="lil-gui-name-"+ ++yt.nextNameID,this.$widget=document.createElement(r),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(t)}name(e){return this._name=e,this.$name.innerHTML=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled||(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e)),this}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const A=this.parent.add(this.object,this.property,e);return A.name(this._name),this.destroy(),A}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.object[this.property]=e,this._callOnChange(),this.updateDisplay(),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}let Yf=class extends yt{constructor(e,A,t){super(e,A,t,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}};function po(n){let e,A;return(e=n.match(/(#|0x)?([a-f0-9]{6})/i))?A=e[2]:(e=n.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?A=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=n.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(A=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),!!A&&"#"+A}const Jf={isPrimitive:!0,match:n=>typeof n=="string",fromHexString:po,toHexString:po},fr={isPrimitive:!0,match:n=>typeof n=="number",fromHexString:n=>parseInt(n.substring(1),16),toHexString:n=>"#"+n.toString(16).padStart(6,0)},qf={isPrimitive:!1,match:Array.isArray,fromHexString(n,e,A=1){const t=fr.fromHexString(n);e[0]=(t>>16&255)/255*A,e[1]=(t>>8&255)/255*A,e[2]=(255&t)/255*A},toHexString:([n,e,A],t=1)=>fr.toHexString(n*(t=255/t)<<16^e*t<<8^A*t<<0)},Zf={isPrimitive:!1,match:n=>Object(n)===n,fromHexString(n,e,A=1){const t=fr.fromHexString(n);e.r=(t>>16&255)/255*A,e.g=(t>>8&255)/255*A,e.b=(255&t)/255*A},toHexString:({r:n,g:e,b:A},t=1)=>fr.toHexString(n*(t=255/t)<<16^e*t<<8^A*t<<0)},jf=[Jf,fr,qf,Zf];let $f=class extends yt{constructor(e,A,t,i){var r;super(e,A,t,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=(r=this.initialValue,jf.find(s=>s.match(r))),this._rgbScale=i,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const s=po(this.$text.value);s&&this._setValueFromHexString(s)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const A=this._format.fromHexString(e);this.setValue(A)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}};class pa extends yt{constructor(e,A,t){super(e,A,t,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",i=>{i.preventDefault(),this.getValue().call(this.object)}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class ed extends yt{constructor(e,A,t,i,r,s){super(e,A,t,"number"),this._initInput(),this.min(i),this.max(r);const a=s!==void 0;this.step(a?s:this._getImplicitStep(),a),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,A=!0){return this._step=e,this._stepExplicit=A,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let A=(e-this._min)/(this._max-this._min);A=Math.max(0,Math.min(A,1)),this.$fill.style.width=100*A+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$disable=this.$input;const e=c=>{const u=parseFloat(this.$input.value);isNaN(u)||(this._snapClampSetValue(u+c),this.$input.value=this.getValue())};let A,t,i,r,s,a=!1;const o=c=>{if(a){const u=c.clientX-A,h=c.clientY-t;Math.abs(h)>5?(c.preventDefault(),this.$input.blur(),a=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(u)>5&&l()}if(!a){const u=c.clientY-i;s-=u*this._step*this._arrowKeyMultiplier(c),r+s>this._max?s=this._max-r:r+s<this._min&&(s=this._min-r),this._snapClampSetValue(r+s)}i=c.clientY},l=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",o),window.removeEventListener("mouseup",l)};this.$input.addEventListener("input",()=>{let c=parseFloat(this.$input.value);isNaN(c)||(this._stepExplicit&&(c=this._snap(c)),this.setValue(this._clamp(c)))}),this.$input.addEventListener("keydown",c=>{c.code==="Enter"&&this.$input.blur(),c.code==="ArrowUp"&&(c.preventDefault(),e(this._step*this._arrowKeyMultiplier(c))),c.code==="ArrowDown"&&(c.preventDefault(),e(this._step*this._arrowKeyMultiplier(c)*-1))}),this.$input.addEventListener("wheel",c=>{this._inputFocused&&(c.preventDefault(),e(this._step*this._normalizeMouseWheel(c)))},{passive:!1}),this.$input.addEventListener("mousedown",c=>{A=c.clientX,t=i=c.clientY,a=!0,r=this.getValue(),s=0,window.addEventListener("mousemove",o),window.addEventListener("mouseup",l)}),this.$input.addEventListener("focus",()=>{this._inputFocused=!0}),this.$input.addEventListener("blur",()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()})}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const e=h=>{const p=this.$slider.getBoundingClientRect();let g=(m=h,d=p.left,f=p.right,v=this._min,w=this._max,(m-d)/(f-d)*(w-v)+v);var m,d,f,v,w;this._snapClampSetValue(g)},A=h=>{e(h.clientX)},t=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",A),window.removeEventListener("mouseup",t)};let i,r,s=!1;const a=h=>{h.preventDefault(),this._setDraggingStyle(!0),e(h.touches[0].clientX),s=!1},o=h=>{if(s){const p=h.touches[0].clientX-i,g=h.touches[0].clientY-r;Math.abs(p)>Math.abs(g)?a(h):(window.removeEventListener("touchmove",o),window.removeEventListener("touchend",l))}else h.preventDefault(),e(h.touches[0].clientX)},l=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",o),window.removeEventListener("touchend",l)},c=this._callOnFinishChange.bind(this);let u;this.$slider.addEventListener("mousedown",h=>{this._setDraggingStyle(!0),e(h.clientX),window.addEventListener("mousemove",A),window.addEventListener("mouseup",t)}),this.$slider.addEventListener("touchstart",h=>{h.touches.length>1||(this._hasScrollBar?(i=h.touches[0].clientX,r=h.touches[0].clientY,s=!0):a(h),window.addEventListener("touchmove",o,{passive:!1}),window.addEventListener("touchend",l))},{passive:!1}),this.$slider.addEventListener("wheel",h=>{if(Math.abs(h.deltaX)<Math.abs(h.deltaY)&&this._hasScrollBar)return;h.preventDefault();const p=this._normalizeMouseWheel(h)*this._step;this._snapClampSetValue(this.getValue()+p),this.$input.value=this.getValue(),clearTimeout(u),u=setTimeout(c,400)},{passive:!1})}_setDraggingStyle(e,A="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle("lil-gui-"+A,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:A,deltaY:t}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(A=0,t=-e.wheelDelta/120,t*=this._stepExplicit?1:10),A+-t}_arrowKeyMultiplier(e){let A=this._stepExplicit?1:10;return e.shiftKey?A*=10:e.altKey&&(A/=10),A}_snap(e){const A=Math.round(e/this._step)*this._step;return parseFloat(A.toPrecision(15))}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class Ad extends yt{constructor(e,A,t,i){super(e,A,t,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this._values=Array.isArray(i)?i:Object.values(i),this._names=Array.isArray(i)?i:Object.keys(i),this._names.forEach(r=>{const s=document.createElement("option");s.innerHTML=r,this.$select.appendChild(s)}),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.updateDisplay()}updateDisplay(){const e=this.getValue(),A=this._values.indexOf(e);return this.$select.selectedIndex=A,this.$display.innerHTML=A===-1?e:this._names[A],this}}let td=class extends yt{constructor(e,A,t){super(e,A,t,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",i=>{i.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}},wl=!1;class Jo{constructor({parent:e,autoPlace:A=e===void 0,container:t,width:i,title:r="Controls",injectStyles:s=!0,touchStyles:a=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("div"),this.$title.classList.add("title"),this.$title.setAttribute("role","button"),this.$title.setAttribute("aria-expanded",!0),this.$title.setAttribute("tabindex",0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("keydown",o=>{o.code!=="Enter"&&o.code!=="Space"||(o.preventDefault(),this.$title.click())}),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(r),a&&this.domElement.classList.add("allow-touch-styles"),this.parent)return this.parent.children.push(this),this.parent.folders.push(this),void this.parent.$children.appendChild(this.domElement);this.domElement.classList.add("root"),!wl&&s&&(function(o){const l=document.createElement("style");l.innerHTML=o;const c=document.querySelector("head link[rel=stylesheet], head style");c?document.head.insertBefore(l,c):document.head.appendChild(l)}('.lil-gui{--background-color:#1f1f1f;--text-color:#ebebeb;--title-background-color:#111;--title-text-color:#ebebeb;--widget-color:#424242;--hover-color:#4f4f4f;--focus-color:#595959;--number-color:#2cc9ff;--string-color:#a2db3c;--font-size:11px;--input-font-size:11px;--font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;--font-family-mono:Menlo,Monaco,Consolas,"Droid Sans Mono",monospace;--padding:4px;--spacing:4px;--widget-height:20px;--name-width:45%;--slider-knob-width:2px;--slider-input-width:27%;--color-input-width:27%;--slider-input-min-width:45px;--color-input-min-width:45px;--folder-indent:7px;--widget-padding:0 0 0 3px;--widget-border-radius:2px;--checkbox-size:calc(var(--widget-height)*0.75);--scrollbar-width:5px;background-color:var(--background-color);color:var(--text-color);font-family:var(--font-family);font-size:var(--font-size);font-style:normal;font-weight:400;line-height:1;text-align:left;touch-action:manipulation;user-select:none;-webkit-user-select:none}.lil-gui,.lil-gui *{box-sizing:border-box;margin:0;padding:0}.lil-gui.root{display:flex;flex-direction:column;width:var(--width,245px)}.lil-gui.root>.title{background:var(--title-background-color);color:var(--title-text-color)}.lil-gui.root>.children{overflow-x:hidden;overflow-y:auto}.lil-gui.root>.children::-webkit-scrollbar{background:var(--background-color);height:var(--scrollbar-width);width:var(--scrollbar-width)}.lil-gui.root>.children::-webkit-scrollbar-thumb{background:var(--focus-color);border-radius:var(--scrollbar-width)}.lil-gui.force-touch-styles{--widget-height:28px;--padding:6px;--spacing:6px;--font-size:13px;--input-font-size:16px;--folder-indent:10px;--scrollbar-width:7px;--slider-input-min-width:50px;--color-input-min-width:65px}.lil-gui.autoPlace{max-height:100%;position:fixed;right:15px;top:0;z-index:1001}.lil-gui .controller{align-items:center;display:flex;margin:var(--spacing) 0;padding:0 var(--padding)}.lil-gui .controller.disabled{opacity:.5}.lil-gui .controller.disabled,.lil-gui .controller.disabled *{pointer-events:none!important}.lil-gui .controller>.name{flex-shrink:0;line-height:var(--widget-height);min-width:var(--name-width);padding-right:var(--spacing);white-space:pre}.lil-gui .controller .widget{align-items:center;display:flex;min-height:var(--widget-height);position:relative;width:100%}.lil-gui .controller.string input{color:var(--string-color)}.lil-gui .controller.boolean .widget{cursor:pointer}.lil-gui .controller.color .display{border-radius:var(--widget-border-radius);height:var(--widget-height);position:relative;width:100%}.lil-gui .controller.color input[type=color]{cursor:pointer;height:100%;opacity:0;width:100%}.lil-gui .controller.color input[type=text]{flex-shrink:0;font-family:var(--font-family-mono);margin-left:var(--spacing);min-width:var(--color-input-min-width);width:var(--color-input-width)}.lil-gui .controller.option select{max-width:100%;opacity:0;position:absolute;width:100%}.lil-gui .controller.option .display{background:var(--widget-color);border-radius:var(--widget-border-radius);height:var(--widget-height);line-height:var(--widget-height);max-width:100%;overflow:hidden;padding-left:.55em;padding-right:1.75em;pointer-events:none;position:relative;word-break:break-all}.lil-gui .controller.option .display.active{background:var(--focus-color)}.lil-gui .controller.option .display:after{bottom:0;content:"↕";font-family:lil-gui;padding-right:.375em;position:absolute;right:0;top:0}.lil-gui .controller.option .widget,.lil-gui .controller.option select{cursor:pointer}.lil-gui .controller.number input{color:var(--number-color)}.lil-gui .controller.number.hasSlider input{flex-shrink:0;margin-left:var(--spacing);min-width:var(--slider-input-min-width);width:var(--slider-input-width)}.lil-gui .controller.number .slider{background-color:var(--widget-color);border-radius:var(--widget-border-radius);cursor:ew-resize;height:var(--widget-height);overflow:hidden;padding-right:var(--slider-knob-width);touch-action:pan-y;width:100%}.lil-gui .controller.number .slider.active{background-color:var(--focus-color)}.lil-gui .controller.number .slider.active .fill{opacity:.95}.lil-gui .controller.number .fill{border-right:var(--slider-knob-width) solid var(--number-color);box-sizing:content-box;height:100%}.lil-gui-dragging .lil-gui{--hover-color:var(--widget-color)}.lil-gui-dragging *{cursor:ew-resize!important}.lil-gui-dragging.lil-gui-vertical *{cursor:ns-resize!important}.lil-gui .title{--title-height:calc(var(--widget-height) + var(--spacing)*1.25);-webkit-tap-highlight-color:transparent;text-decoration-skip:objects;cursor:pointer;font-weight:600;height:var(--title-height);line-height:calc(var(--title-height) - 4px);outline:none;padding:0 var(--padding)}.lil-gui .title:before{content:"▾";display:inline-block;font-family:lil-gui;padding-right:2px}.lil-gui .title:active{background:var(--title-background-color);opacity:.75}.lil-gui.root>.title:focus{text-decoration:none!important}.lil-gui.closed>.title:before{content:"▸"}.lil-gui.closed>.children{opacity:0;transform:translateY(-7px)}.lil-gui.closed:not(.transition)>.children{display:none}.lil-gui.transition>.children{overflow:hidden;pointer-events:none;transition-duration:.3s;transition-property:height,opacity,transform;transition-timing-function:cubic-bezier(.2,.6,.35,1)}.lil-gui .children:empty:before{content:"Empty";display:block;font-style:italic;height:var(--widget-height);line-height:var(--widget-height);margin:var(--spacing) 0;opacity:.5;padding:0 var(--padding)}.lil-gui.root>.children>.lil-gui>.title{border-width:0;border-bottom:1px solid var(--widget-color);border-left:0 solid var(--widget-color);border-right:0 solid var(--widget-color);border-top:1px solid var(--widget-color);transition:border-color .3s}.lil-gui.root>.children>.lil-gui.closed>.title{border-bottom-color:transparent}.lil-gui+.controller{border-top:1px solid var(--widget-color);margin-top:0;padding-top:var(--spacing)}.lil-gui .lil-gui .lil-gui>.title{border:none}.lil-gui .lil-gui .lil-gui>.children{border:none;border-left:2px solid var(--widget-color);margin-left:var(--folder-indent)}.lil-gui .lil-gui .controller{border:none}.lil-gui input{-webkit-tap-highlight-color:transparent;background:var(--widget-color);border:0;border-radius:var(--widget-border-radius);color:var(--text-color);font-family:var(--font-family);font-size:var(--input-font-size);height:var(--widget-height);outline:none;width:100%}.lil-gui input:disabled{opacity:1}.lil-gui input[type=number],.lil-gui input[type=text]{padding:var(--widget-padding)}.lil-gui input[type=number]:focus,.lil-gui input[type=text]:focus{background:var(--focus-color)}.lil-gui input::-webkit-inner-spin-button,.lil-gui input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.lil-gui input[type=number]{-moz-appearance:textfield}.lil-gui input[type=checkbox]{appearance:none;-webkit-appearance:none;border-radius:var(--widget-border-radius);cursor:pointer;height:var(--checkbox-size);text-align:center;width:var(--checkbox-size)}.lil-gui input[type=checkbox]:checked:before{content:"✓";font-family:lil-gui;font-size:var(--checkbox-size);line-height:var(--checkbox-size)}.lil-gui button{-webkit-tap-highlight-color:transparent;background:var(--widget-color);border:1px solid var(--widget-color);border-radius:var(--widget-border-radius);color:var(--text-color);cursor:pointer;font-family:var(--font-family);font-size:var(--font-size);height:var(--widget-height);line-height:calc(var(--widget-height) - 4px);outline:none;text-align:center;text-transform:none;width:100%}.lil-gui button:active{background:var(--focus-color)}@font-face{font-family:lil-gui;src:url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff")}@media (pointer:coarse){.lil-gui.allow-touch-styles{--widget-height:28px;--padding:6px;--spacing:6px;--font-size:13px;--input-font-size:16px;--folder-indent:10px;--scrollbar-width:7px;--slider-input-min-width:50px;--color-input-min-width:65px}}@media (hover:hover){.lil-gui .controller.color .display:hover:before{border:1px solid #fff9;border-radius:var(--widget-border-radius);bottom:0;content:" ";display:block;left:0;position:absolute;right:0;top:0}.lil-gui .controller.option .display.focus{background:var(--focus-color)}.lil-gui .controller.option .widget:hover .display{background:var(--hover-color)}.lil-gui .controller.number .slider:hover{background-color:var(--hover-color)}body:not(.lil-gui-dragging) .lil-gui .title:hover{background:var(--title-background-color);opacity:.85}.lil-gui .title:focus{text-decoration:underline var(--focus-color)}.lil-gui input:hover{background:var(--hover-color)}.lil-gui input:active{background:var(--focus-color)}.lil-gui input[type=checkbox]:focus{box-shadow:inset 0 0 0 1px var(--focus-color)}.lil-gui button:hover{background:var(--hover-color);border-color:var(--hover-color)}.lil-gui button:focus{border-color:var(--focus-color)}}'),wl=!0),t?t.appendChild(this.domElement):A&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),i&&this.domElement.style.setProperty("--width",i+"px"),this.domElement.addEventListener("keydown",o=>o.stopPropagation()),this.domElement.addEventListener("keyup",o=>o.stopPropagation())}add(e,A,t,i,r){if(Object(t)===t)return new Ad(this,e,A,t);const s=e[A];switch(typeof s){case"number":return new ed(this,e,A,t,i,r);case"boolean":return new Yf(this,e,A);case"string":return new td(this,e,A);case"function":return new pa(this,e,A)}console.error(`gui.add failed
	property:`,A,`
	object:`,e,`
	value:`,s)}addColor(e,A,t=1){return new $f(this,e,A,t)}addFolder(e){return new Jo({parent:this,title:e})}load(e,A=!0){return e.controllers&&this.controllers.forEach(t=>{t instanceof pa||t._name in e.controllers&&t.load(e.controllers[t._name])}),A&&e.folders&&this.folders.forEach(t=>{t._title in e.folders&&t.load(e.folders[t._title])}),this}save(e=!0){const A={controllers:{},folders:{}};return this.controllers.forEach(t=>{if(!(t instanceof pa)){if(t._name in A.controllers)throw new Error(`Cannot save GUI with duplicate property "${t._name}"`);A.controllers[t._name]=t.save()}}),e&&this.folders.forEach(t=>{if(t._title in A.folders)throw new Error(`Cannot save GUI with duplicate folder "${t._title}"`);A.folders[t._title]=t.save()}),A}open(e=!0){return this._closed=!e,this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._closed=!e,this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const A=this.$children.clientHeight;this.$children.style.height=A+"px",this.domElement.classList.add("transition");const t=r=>{r.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",t))};this.$children.addEventListener("transitionend",t);const i=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=i+"px"})}),this}title(e){return this._title=e,this.$title.innerHTML=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(A=>A.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(A=>{e=e.concat(A.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(A=>{e=e.concat(A.foldersRecursive())}),e}}var xt=(n=>(n[n.STOLEN_NECKLACE=0]="STOLEN_NECKLACE",n[n.SHADER_LAMP=1]="SHADER_LAMP",n[n.SPACE_COLOR=2]="SPACE_COLOR",n[n.SINUSOID=3]="SINUSOID",n))(xt||{}),ce=(n=>(n.CREATE_SPHERE="create-sphere",n.SET_NECKLACE_CONFIGURATION_BY_NUMBER="necklace-configuration-by-number",n.SET_NECKLACE_CONFIGURATION_BY_STRING="necklace-configuration-by-string",n.UPDATE_SPHERE_MATERIAL="update-material",n.NECKLACE_CUT="necklace-cut",n.UPDATE_VISIBLE="update-visible",n.THEME_CHANGED="theme-changed",n.MODEL_CHANGED="model-changed",n.SHOW_IMPRINT="show-imprint",n.HIDE_IMPRINT="hide-imprint",n))(ce||{});(n=>{function e(A){const t=new Event(A.toString(),{bubbles:!0});document.body.dispatchEvent(t)}n.dispatchEvent=e})(ce||(ce={}));class $u{constructor(e,A){let t=!1;new MutationObserver(r=>{t&&r.forEach((s,a)=>A(s,a))}).observe(e,{attributes:!0,attributeFilter:["class"]}),t=!0}}const nd="modulepreload",id=function(n){return"/necklace-splitting/"+n},vl={},rd=function(e,A,t){if(!A||A.length===0)return e();const i=document.getElementsByTagName("link");return Promise.all(A.map(r=>{if(r=id(r),r in vl)return;vl[r]=!0;const s=r.endsWith(".css"),a=s?'[rel="stylesheet"]':"";if(!!t)for(let c=i.length-1;c>=0;c--){const u=i[c];if(u.href===r&&(!s||u.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${r}"]${a}`))return;const l=document.createElement("link");if(l.rel=s?"stylesheet":nd,s||(l.as="script",l.crossOrigin=""),l.href=r,document.head.appendChild(l),s)return new Promise((c,u)=>{l.addEventListener("load",c),l.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${r}`)))})})).then(()=>e()).catch(r=>{const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=r,window.dispatchEvent(s),!s.defaultPrevented)throw r})};/*!
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
***************************************************************************** */var go=function(n,e){return go=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(A,t){A.__proto__=t}||function(A,t){for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(A[i]=t[i])},go(n,e)};function gt(n,e){if(typeof e!="function"&&e!==null)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");go(n,e);function A(){this.constructor=n}n.prototype=e===null?Object.create(e):(A.prototype=e.prototype,new A)}var mo=function(){return mo=Object.assign||function(e){for(var A,t=1,i=arguments.length;t<i;t++){A=arguments[t];for(var r in A)Object.prototype.hasOwnProperty.call(A,r)&&(e[r]=A[r])}return e},mo.apply(this,arguments)};function NA(n,e,A,t){function i(r){return r instanceof A?r:new A(function(s){s(r)})}return new(A||(A=Promise))(function(r,s){function a(c){try{l(t.next(c))}catch(u){s(u)}}function o(c){try{l(t.throw(c))}catch(u){s(u)}}function l(c){c.done?r(c.value):i(c.value).then(a,o)}l((t=t.apply(n,e||[])).next())})}function QA(n,e){var A={label:0,sent:function(){if(r[0]&1)throw r[1];return r[1]},trys:[],ops:[]},t,i,r,s;return s={next:a(0),throw:a(1),return:a(2)},typeof Symbol=="function"&&(s[Symbol.iterator]=function(){return this}),s;function a(l){return function(c){return o([l,c])}}function o(l){if(t)throw new TypeError("Generator is already executing.");for(;A;)try{if(t=1,i&&(r=l[0]&2?i.return:l[0]?i.throw||((r=i.return)&&r.call(i),0):i.next)&&!(r=r.call(i,l[1])).done)return r;switch(i=0,r&&(l=[l[0]&2,r.value]),l[0]){case 0:case 1:r=l;break;case 4:return A.label++,{value:l[1],done:!1};case 5:A.label++,i=l[1],l=[0];continue;case 7:l=A.ops.pop(),A.trys.pop();continue;default:if(r=A.trys,!(r=r.length>0&&r[r.length-1])&&(l[0]===6||l[0]===2)){A=0;continue}if(l[0]===3&&(!r||l[1]>r[0]&&l[1]<r[3])){A.label=l[1];break}if(l[0]===6&&A.label<r[1]){A.label=r[1],r=l;break}if(r&&A.label<r[2]){A.label=r[2],A.ops.push(l);break}r[2]&&A.ops.pop(),A.trys.pop();continue}l=e.call(n,A)}catch(c){l=[6,c],i=0}finally{t=r=0}if(l[0]&5)throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}}function br(n,e,A){if(A||arguments.length===2)for(var t=0,i=e.length,r;t<i;t++)(r||!(t in e))&&(r||(r=Array.prototype.slice.call(e,0,t)),r[t]=e[t]);return n.concat(r||e)}var zt=function(){function n(e,A,t,i){this.left=e,this.top=A,this.width=t,this.height=i}return n.prototype.add=function(e,A,t,i){return new n(this.left+e,this.top+A,this.width+t,this.height+i)},n.fromClientRect=function(e,A){return new n(A.left+e.windowBounds.left,A.top+e.windowBounds.top,A.width,A.height)},n.fromDOMRectList=function(e,A){var t=Array.from(A).find(function(i){return i.width!==0});return t?new n(t.left+e.windowBounds.left,t.top+e.windowBounds.top,t.width,t.height):n.EMPTY},n.EMPTY=new n(0,0,0,0),n}(),Ys=function(n,e){return zt.fromClientRect(n,e.getBoundingClientRect())},sd=function(n){var e=n.body,A=n.documentElement;if(!e||!A)throw new Error("Unable to get document size");var t=Math.max(Math.max(e.scrollWidth,A.scrollWidth),Math.max(e.offsetWidth,A.offsetWidth),Math.max(e.clientWidth,A.clientWidth)),i=Math.max(Math.max(e.scrollHeight,A.scrollHeight),Math.max(e.offsetHeight,A.offsetHeight),Math.max(e.clientHeight,A.clientHeight));return new zt(0,0,t,i)},Js=function(n){for(var e=[],A=0,t=n.length;A<t;){var i=n.charCodeAt(A++);if(i>=55296&&i<=56319&&A<t){var r=n.charCodeAt(A++);(r&64512)===56320?e.push(((i&1023)<<10)+(r&1023)+65536):(e.push(i),A--)}else e.push(i)}return e},oA=function(){for(var n=[],e=0;e<arguments.length;e++)n[e]=arguments[e];if(String.fromCodePoint)return String.fromCodePoint.apply(String,n);var A=n.length;if(!A)return"";for(var t=[],i=-1,r="";++i<A;){var s=n[i];s<=65535?t.push(s):(s-=65536,t.push((s>>10)+55296,s%1024+56320)),(i+1===A||t.length>16384)&&(r+=String.fromCharCode.apply(String,t),t.length=0)}return r},El="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",ad=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(var Tr=0;Tr<El.length;Tr++)ad[El.charCodeAt(Tr)]=Tr;var Cl="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Ji=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(var Qr=0;Qr<Cl.length;Qr++)Ji[Cl.charCodeAt(Qr)]=Qr;var od=function(n){var e=n.length*.75,A=n.length,t,i=0,r,s,a,o;n[n.length-1]==="="&&(e--,n[n.length-2]==="="&&e--);var l=typeof ArrayBuffer<"u"&&typeof Uint8Array<"u"&&typeof Uint8Array.prototype.slice<"u"?new ArrayBuffer(e):new Array(e),c=Array.isArray(l)?l:new Uint8Array(l);for(t=0;t<A;t+=4)r=Ji[n.charCodeAt(t)],s=Ji[n.charCodeAt(t+1)],a=Ji[n.charCodeAt(t+2)],o=Ji[n.charCodeAt(t+3)],c[i++]=r<<2|s>>4,c[i++]=(s&15)<<4|a>>2,c[i++]=(a&3)<<6|o&63;return l},ld=function(n){for(var e=n.length,A=[],t=0;t<e;t+=2)A.push(n[t+1]<<8|n[t]);return A},cd=function(n){for(var e=n.length,A=[],t=0;t<e;t+=4)A.push(n[t+3]<<24|n[t+2]<<16|n[t+1]<<8|n[t]);return A},Rn=5,qo=6+5,ga=2,ud=qo-Rn,eh=65536>>Rn,hd=1<<Rn,ma=hd-1,fd=1024>>Rn,dd=eh+fd,pd=dd,gd=32,md=pd+gd,Bd=65536>>qo,_d=1<<ud,wd=_d-1,xl=function(n,e,A){return n.slice?n.slice(e,A):new Uint16Array(Array.prototype.slice.call(n,e,A))},vd=function(n,e,A){return n.slice?n.slice(e,A):new Uint32Array(Array.prototype.slice.call(n,e,A))},Ed=function(n,e){var A=od(n),t=Array.isArray(A)?cd(A):new Uint32Array(A),i=Array.isArray(A)?ld(A):new Uint16Array(A),r=24,s=xl(i,r/2,t[4]/2),a=t[5]===2?xl(i,(r+t[4])/2):vd(t,Math.ceil((r+t[4])/4));return new Cd(t[0],t[1],t[2],t[3],s,a)},Cd=function(){function n(e,A,t,i,r,s){this.initialValue=e,this.errorValue=A,this.highStart=t,this.highValueIndex=i,this.index=r,this.data=s}return n.prototype.get=function(e){var A;if(e>=0){if(e<55296||e>56319&&e<=65535)return A=this.index[e>>Rn],A=(A<<ga)+(e&ma),this.data[A];if(e<=65535)return A=this.index[eh+(e-55296>>Rn)],A=(A<<ga)+(e&ma),this.data[A];if(e<this.highStart)return A=md-Bd+(e>>qo),A=this.index[A],A+=e>>Rn&wd,A=this.index[A],A=(A<<ga)+(e&ma),this.data[A];if(e<=1114111)return this.data[this.highValueIndex]}return this.errorValue},n}(),Ul="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",xd=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(var Ir=0;Ir<Ul.length;Ir++)xd[Ul.charCodeAt(Ir)]=Ir;var Ud="KwAAAAAAAAAACA4AUD0AADAgAAACAAAAAAAIABAAGABAAEgAUABYAGAAaABgAGgAYgBqAF8AZwBgAGgAcQB5AHUAfQCFAI0AlQCdAKIAqgCyALoAYABoAGAAaABgAGgAwgDKAGAAaADGAM4A0wDbAOEA6QDxAPkAAQEJAQ8BFwF1AH0AHAEkASwBNAE6AUIBQQFJAVEBWQFhAWgBcAF4ATAAgAGGAY4BlQGXAZ8BpwGvAbUBvQHFAc0B0wHbAeMB6wHxAfkBAQIJAvEBEQIZAiECKQIxAjgCQAJGAk4CVgJeAmQCbAJ0AnwCgQKJApECmQKgAqgCsAK4ArwCxAIwAMwC0wLbAjAA4wLrAvMC+AIAAwcDDwMwABcDHQMlAy0DNQN1AD0DQQNJA0kDSQNRA1EDVwNZA1kDdQB1AGEDdQBpA20DdQN1AHsDdQCBA4kDkQN1AHUAmQOhA3UAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AKYDrgN1AHUAtgO+A8YDzgPWAxcD3gPjA+sD8wN1AHUA+wMDBAkEdQANBBUEHQQlBCoEFwMyBDgEYABABBcDSARQBFgEYARoBDAAcAQzAXgEgASIBJAEdQCXBHUAnwSnBK4EtgS6BMIEyAR1AHUAdQB1AHUAdQCVANAEYABgAGAAYABgAGAAYABgANgEYADcBOQEYADsBPQE/AQEBQwFFAUcBSQFLAU0BWQEPAVEBUsFUwVbBWAAYgVgAGoFcgV6BYIFigWRBWAAmQWfBaYFYABgAGAAYABgAKoFYACxBbAFuQW6BcEFwQXHBcEFwQXPBdMF2wXjBeoF8gX6BQIGCgYSBhoGIgYqBjIGOgZgAD4GRgZMBmAAUwZaBmAAYABgAGAAYABgAGAAYABgAGAAYABgAGIGYABpBnAGYABgAGAAYABgAGAAYABgAGAAYAB4Bn8GhQZgAGAAYAB1AHcDFQSLBmAAYABgAJMGdQA9A3UAmwajBqsGqwaVALMGuwbDBjAAywbSBtIG1QbSBtIG0gbSBtIG0gbdBuMG6wbzBvsGAwcLBxMHAwcbByMHJwcsBywHMQcsB9IGOAdAB0gHTgfSBkgHVgfSBtIG0gbSBtIG0gbSBtIG0gbSBiwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdgAGAALAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdbB2MHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB2kH0gZwB64EdQB1AHUAdQB1AHUAdQB1AHUHfQdgAIUHjQd1AHUAlQedB2AAYAClB6sHYACzB7YHvgfGB3UAzgfWBzMB3gfmB1EB7gf1B/0HlQENAQUIDQh1ABUIHQglCBcDLQg1CD0IRQhNCEEDUwh1AHUAdQBbCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIcAh3CHoIMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIgggwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAALAcsBywHLAcsBywHLAcsBywHLAcsB4oILAcsB44I0gaWCJ4Ipgh1AHUAqgiyCHUAdQB1AHUAdQB1AHUAdQB1AHUAtwh8AXUAvwh1AMUIyQjRCNkI4AjoCHUAdQB1AO4I9gj+CAYJDgkTCS0HGwkjCYIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiAAIAAAAFAAYABgAGIAXwBgAHEAdQBFAJUAogCyAKAAYABgAEIA4ABGANMA4QDxAMEBDwE1AFwBLAE6AQEBUQF4QkhCmEKoQrhCgAHIQsAB0MLAAcABwAHAAeDC6ABoAHDCwMMAAcABwAHAAdDDGMMAAcAB6MM4wwjDWMNow3jDaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAEjDqABWw6bDqABpg6gAaABoAHcDvwOPA+gAaABfA/8DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DpcPAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcAB9cPKwkyCToJMAB1AHUAdQBCCUoJTQl1AFUJXAljCWcJawkwADAAMAAwAHMJdQB2CX4JdQCECYoJjgmWCXUAngkwAGAAYABxAHUApgn3A64JtAl1ALkJdQDACTAAMAAwADAAdQB1AHUAdQB1AHUAdQB1AHUAowYNBMUIMAAwADAAMADICcsJ0wnZCRUE4QkwAOkJ8An4CTAAMAB1AAAKvwh1AAgKDwoXCh8KdQAwACcKLgp1ADYKqAmICT4KRgowADAAdQB1AE4KMAB1AFYKdQBeCnUAZQowADAAMAAwADAAMAAwADAAMAAVBHUAbQowADAAdQC5CXUKMAAwAHwBxAijBogEMgF9CoQKiASMCpQKmgqIBKIKqgquCogEDQG2Cr4KxgrLCjAAMADTCtsKCgHjCusK8Qr5CgELMAAwADAAMAB1AIsECQsRC3UANAEZCzAAMAAwADAAMAB1ACELKQswAHUANAExCzkLdQBBC0kLMABRC1kLMAAwADAAMAAwADAAdQBhCzAAMAAwAGAAYABpC3ELdwt/CzAAMACHC4sLkwubC58Lpwt1AK4Ltgt1APsDMAAwADAAMAAwADAAMAAwAL4LwwvLC9IL1wvdCzAAMADlC+kL8Qv5C/8LSQswADAAMAAwADAAMAAwADAAMAAHDDAAMAAwADAAMAAODBYMHgx1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1ACYMMAAwADAAdQB1AHUALgx1AHUAdQB1AHUAdQA2DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AD4MdQBGDHUAdQB1AHUAdQB1AEkMdQB1AHUAdQB1AFAMMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQBYDHUAdQB1AF8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUA+wMVBGcMMAAwAHwBbwx1AHcMfwyHDI8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAYABgAJcMMAAwADAAdQB1AJ8MlQClDDAAMACtDCwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB7UMLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AA0EMAC9DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAsBywHLAcsBywHLAcsBywHLQcwAMEMyAwsBywHLAcsBywHLAcsBywHLAcsBywHzAwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1ANQM2QzhDDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMABgAGAAYABgAGAAYABgAOkMYADxDGAA+AwADQYNYABhCWAAYAAODTAAMAAwADAAFg1gAGAAHg37AzAAMAAwADAAYABgACYNYAAsDTQNPA1gAEMNPg1LDWAAYABgAGAAYABgAGAAYABgAGAAUg1aDYsGVglhDV0NcQBnDW0NdQ15DWAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAlQCBDZUAiA2PDZcNMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAnw2nDTAAMAAwADAAMAAwAHUArw23DTAAMAAwADAAMAAwADAAMAAwADAAMAB1AL8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQDHDTAAYABgAM8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA1w11ANwNMAAwAD0B5A0wADAAMAAwADAAMADsDfQN/A0EDgwOFA4wABsOMAAwADAAMAAwADAAMAAwANIG0gbSBtIG0gbSBtIG0gYjDigOwQUuDsEFMw7SBjoO0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGQg5KDlIOVg7SBtIGXg5lDm0OdQ7SBtIGfQ6EDooOjQ6UDtIGmg6hDtIG0gaoDqwO0ga0DrwO0gZgAGAAYADEDmAAYAAkBtIGzA5gANIOYADaDokO0gbSBt8O5w7SBu8O0gb1DvwO0gZgAGAAxA7SBtIG0gbSBtIGYABgAGAAYAAED2AAsAUMD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHJA8sBywHLAcsBywHLAccDywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywPLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAc0D9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHPA/SBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gYUD0QPlQCVAJUAMAAwADAAMACVAJUAlQCVAJUAlQCVAEwPMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA//8EAAQABAAEAAQABAAEAAQABAANAAMAAQABAAIABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQACgATABcAHgAbABoAHgAXABYAEgAeABsAGAAPABgAHABLAEsASwBLAEsASwBLAEsASwBLABgAGAAeAB4AHgATAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYAGwASAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWAA0AEQAeAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAFAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJABYAGgAbABsAGwAeAB0AHQAeAE8AFwAeAA0AHgAeABoAGwBPAE8ADgBQAB0AHQAdAE8ATwAXAE8ATwBPABYAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAFAATwBAAE8ATwBPAEAATwBQAFAATwBQAB4AHgAeAB4AHgAeAB0AHQAdAB0AHgAdAB4ADgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgBQAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkACQAJAAkACQAJAAkABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAFAAHgAeAB4AKwArAFAAUABQAFAAGABQACsAKwArACsAHgAeAFAAHgBQAFAAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUAAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAYAA0AKwArAB4AHgAbACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAB4ABAAEAB4ABAAEABMABAArACsAKwArACsAKwArACsAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAKwArACsAKwBWAFYAVgBWAB4AHgArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AGgAaABoAGAAYAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQAEwAEACsAEwATAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABLAEsASwBLAEsASwBLAEsASwBLABoAGQAZAB4AUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABMAUAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABABQAFAABAAEAB4ABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUAAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAFAABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQAUABQAB4AHgAYABMAUAArACsABAAbABsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAFAABAAEAAQABAAEAFAABAAEAAQAUAAEAAQABAAEAAQAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArACsAHgArAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAUAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEAA0ADQBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUAArACsAKwBQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABABQACsAKwArACsAKwArACsAKwAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUAAaABoAUABQAFAAUABQAEwAHgAbAFAAHgAEACsAKwAEAAQABAArAFAAUABQAFAAUABQACsAKwArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQACsAUABQACsAKwAEACsABAAEAAQABAAEACsAKwArACsABAAEACsAKwAEAAQABAArACsAKwAEACsAKwArACsAKwArACsAUABQAFAAUAArAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLAAQABABQAFAAUAAEAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAArACsAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AGwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAKwArACsAKwArAAQABAAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAAQAUAArAFAAUABQAFAAUABQACsAKwArAFAAUABQACsAUABQAFAAUAArACsAKwBQAFAAKwBQACsAUABQACsAKwArAFAAUAArACsAKwBQAFAAUAArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAAQABAAEAAQABAArACsAKwAEAAQABAArAAQABAAEAAQAKwArAFAAKwArACsAKwArACsABAArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAHgAeAB4AHgAeAB4AGwAeACsAKwArACsAKwAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAUABQAFAAKwArACsAKwArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwAOAFAAUABQAFAAUABQAFAAHgBQAAQABAAEAA4AUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAKwArAAQAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAKwArACsAKwArACsAUAArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABABQAB4AKwArACsAKwBQAFAAUAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQABoAUABQAFAAUABQAFAAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQACsAUAArACsAUABQAFAAUABQAFAAUAArACsAKwAEACsAKwArACsABAAEAAQABAAEAAQAKwAEACsABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgAqACsAKwArACsAGwBcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAeAEsASwBLAEsASwBLAEsASwBLAEsADQANACsAKwArACsAKwBcAFwAKwBcACsAXABcAFwAXABcACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAXAArAFwAXABcAFwAXABcAFwAXABcAFwAKgBcAFwAKgAqACoAKgAqACoAKgAqACoAXAArACsAXABcAFwAXABcACsAXAArACoAKgAqACoAKgAqACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwBcAFwAXABcAFAADgAOAA4ADgAeAA4ADgAJAA4ADgANAAkAEwATABMAEwATAAkAHgATAB4AHgAeAAQABAAeAB4AHgAeAB4AHgBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQAFAADQAEAB4ABAAeAAQAFgARABYAEQAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAAQABAAEAAQADQAEAAQAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAA0ADQAeAB4AHgAeAB4AHgAEAB4AHgAeAB4AHgAeACsAHgAeAA4ADgANAA4AHgAeAB4AHgAeAAkACQArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgBcAEsASwBLAEsASwBLAEsASwBLAEsADQANAB4AHgAeAB4AXABcAFwAXABcAFwAKgAqACoAKgBcAFwAXABcACoAKgAqAFwAKgAqACoAXABcACoAKgAqACoAKgAqACoAXABcAFwAKgAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqAFwAKgBLAEsASwBLAEsASwBLAEsASwBLACoAKgAqACoAKgAqAFAAUABQAFAAUABQACsAUAArACsAKwArACsAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAKwBQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsABAAEAAQAHgANAB4AHgAeAB4AHgAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUAArACsADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWABEAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQANAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAANAA0AKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUAArAAQABAArACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqAA0ADQAVAFwADQAeAA0AGwBcACoAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwAeAB4AEwATAA0ADQAOAB4AEwATAB4ABAAEAAQACQArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAHgArACsAKwATABMASwBLAEsASwBLAEsASwBLAEsASwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAXABcAFwAXABcACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAXAArACsAKwAqACoAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsAHgAeAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKwAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKwArAAQASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACoAKgAqACoAKgAqACoAXAAqACoAKgAqACoAKgArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABABQAFAAUABQAFAAUABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwANAA0AHgANAA0ADQANAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwAeAB4AHgAeAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArAA0ADQANAA0ADQBLAEsASwBLAEsASwBLAEsASwBLACsAKwArAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUAAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAAQAUABQAFAAUABQAFAABABQAFAABAAEAAQAUAArACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQACsAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQACsAKwAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQACsAHgAeAB4AHgAeAB4AHgAOAB4AKwANAA0ADQANAA0ADQANAAkADQANAA0ACAAEAAsABAAEAA0ACQANAA0ADAAdAB0AHgAXABcAFgAXABcAFwAWABcAHQAdAB4AHgAUABQAFAANAAEAAQAEAAQABAAEAAQACQAaABoAGgAaABoAGgAaABoAHgAXABcAHQAVABUAHgAeAB4AHgAeAB4AGAAWABEAFQAVABUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ADQAeAA0ADQANAA0AHgANAA0ADQAHAB4AHgAeAB4AKwAEAAQABAAEAAQABAAEAAQABAAEAFAAUAArACsATwBQAFAAUABQAFAAHgAeAB4AFgARAE8AUABPAE8ATwBPAFAAUABQAFAAUAAeAB4AHgAWABEAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArABsAGwAbABsAGwAbABsAGgAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGgAbABsAGwAbABoAGwAbABoAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAHgAeAFAAGgAeAB0AHgBQAB4AGgAeAB4AHgAeAB4AHgAeAB4AHgBPAB4AUAAbAB4AHgBQAFAAUABQAFAAHgAeAB4AHQAdAB4AUAAeAFAAHgBQAB4AUABPAFAAUAAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgBQAFAAUABQAE8ATwBQAFAAUABQAFAATwBQAFAATwBQAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAUABQAFAATwBPAE8ATwBPAE8ATwBPAE8ATwBQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABPAB4AHgArACsAKwArAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHQAdAB4AHgAeAB0AHQAeAB4AHQAeAB4AHgAdAB4AHQAbABsAHgAdAB4AHgAeAB4AHQAeAB4AHQAdAB0AHQAeAB4AHQAeAB0AHgAdAB0AHQAdAB0AHQAeAB0AHgAeAB4AHgAeAB0AHQAdAB0AHgAeAB4AHgAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB0AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAdAB0AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAWABEAHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AHQAdAB0AHgAeAB0AHgAeAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlAB4AHQAdAB4AHgAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AJQAlAB0AHQAlAB4AJQAlACUAIAAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAdAB0AHQAeAB0AJQAdAB0AHgAdAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAdAB0AHQAdACUAHgAlACUAJQAdACUAJQAdAB0AHQAlACUAHQAdACUAHQAdACUAJQAlAB4AHQAeAB4AHgAeAB0AHQAlAB0AHQAdAB0AHQAdACUAJQAlACUAJQAdACUAJQAgACUAHQAdACUAJQAlACUAJQAlACUAJQAeAB4AHgAlACUAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AFwAXABcAFwAXABcAHgATABMAJQAeAB4AHgAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARABYAEQAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAeAB4AKwArACsAKwArABMADQANAA0AUAATAA0AUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUAANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAA0ADQANAA0ADQANAA0ADQAeAA0AFgANAB4AHgAXABcAHgAeABcAFwAWABEAFgARABYAEQAWABEADQANAA0ADQATAFAADQANAB4ADQANAB4AHgAeAB4AHgAMAAwADQANAA0AHgANAA0AFgANAA0ADQANAA0ADQANAA0AHgANAB4ADQANAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArAA0AEQARACUAJQBHAFcAVwAWABEAFgARABYAEQAWABEAFgARACUAJQAWABEAFgARABYAEQAWABEAFQAWABEAEQAlAFcAVwBXAFcAVwBXAFcAVwBXAAQABAAEAAQABAAEACUAVwBXAFcAVwA2ACUAJQBXAFcAVwBHAEcAJQAlACUAKwBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBRAFcAUQBXAFEAVwBXAFcAVwBXAFcAUQBXAFcAVwBXAFcAVwBRAFEAKwArAAQABAAVABUARwBHAFcAFQBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBRAFcAVwBXAFcAVwBXAFEAUQBXAFcAVwBXABUAUQBHAEcAVwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwAlACUAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACsAKwArACsAKwArACsAKwArACsAKwArAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBPAE8ATwBPAE8ATwBPAE8AJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADQATAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQAHgBQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAeAA0ADQANAA0ADQArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAAQAUABQAFAABABQAFAAUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAeAB4AHgAeAAQAKwArACsAUABQAFAAUABQAFAAHgAeABoAHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADgAOABMAEwArACsAKwArACsAKwArACsABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUAAeAB4AHgBQAA4AUABQAAQAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAB4AWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYACsAKwArAAQAHgAeAB4AHgAeAB4ADQANAA0AHgAeAB4AHgArAFAASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArAB4AHgBcAFwAXABcAFwAKgBcAFwAXABcAFwAXABcAFwAXABcAEsASwBLAEsASwBLAEsASwBLAEsAXABcAFwAXABcACsAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAFAAUABQAAQAUABQAFAAUABQAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAHgANAA0ADQBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAKgAqACoAXABcACoAKgBcAFwAXABcAFwAKgAqAFwAKgBcACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAA0ADQBQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQADQAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAVABVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBUAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVACsAKwArACsAKwArACsAKwArACsAKwArAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAKwArACsAKwBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAKwArACsAKwAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArACsAKwArAFYABABWAFYAVgBWAFYAVgBWAFYAVgBWAB4AVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgArAFYAVgBWAFYAVgArAFYAKwBWAFYAKwBWAFYAKwBWAFYAVgBWAFYAVgBWAFYAVgBWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAEQAWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAaAB4AKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAGAARABEAGAAYABMAEwAWABEAFAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACUAJQAlACUAJQAWABEAFgARABYAEQAWABEAFgARABYAEQAlACUAFgARACUAJQAlACUAJQAlACUAEQAlABEAKwAVABUAEwATACUAFgARABYAEQAWABEAJQAlACUAJQAlACUAJQAlACsAJQAbABoAJQArACsAKwArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAcAKwATACUAJQAbABoAJQAlABYAEQAlACUAEQAlABEAJQBXAFcAVwBXAFcAVwBXAFcAVwBXABUAFQAlACUAJQATACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXABYAJQARACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAWACUAEQAlABYAEQARABYAEQARABUAVwBRAFEAUQBRAFEAUQBRAFEAUQBRAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcARwArACsAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXACsAKwBXAFcAVwBXAFcAVwArACsAVwBXAFcAKwArACsAGgAbACUAJQAlABsAGwArAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAAQAB0AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsADQANAA0AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAA0AUABQAFAAUAArACsAKwArAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwBQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAUABQAFAAUABQAAQABAAEACsABAAEACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAKwBQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAA0ADQANAA0ADQANAA0ADQAeACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAArACsAKwArAFAAUABQAFAAUAANAA0ADQANAA0ADQAUACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsADQANAA0ADQANAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArAAQABAANACsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAB4AHgAeAB4AHgArACsAKwArACsAKwAEAAQABAAEAAQABAAEAA0ADQAeAB4AHgAeAB4AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsASwBLAEsASwBLAEsASwBLAEsASwANAA0ADQANAFAABAAEAFAAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAeAA4AUAArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAADQANAB4ADQAEAAQABAAEAB4ABAAEAEsASwBLAEsASwBLAEsASwBLAEsAUAAOAFAADQANAA0AKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAA0AHgANAA0AHgAEACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAA0AKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsABAAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAUAArACsAKwArACsAKwAEACsAKwArACsAKwBQAFAAUABQAFAABAAEACsAKwAEAAQABAAEAAQABAAEACsAKwArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABABQAFAAUABQAA0ADQANAA0AHgBLAEsASwBLAEsASwBLAEsASwBLAA0ADQArAB4ABABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUAAeAFAAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABAAEAAQADgANAA0AEwATAB4AHgAeAA0ADQANAA0ADQANAA0ADQANAA0ADQANAA0ADQANAFAAUABQAFAABAAEACsAKwAEAA0ADQAeAFAAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKwArACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBcAFwADQANAA0AKgBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQAKwAEAAQAKwArAAQABAAEAAQAUAAEAFAABAAEAA0ADQANACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABABQAA4AUAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAOAB4ADQANAA0ADQAOAB4ABAArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAA0ADQANAFAADgAOAA4ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAFAADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAOABMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAArACsAKwAEACsABAAEACsABAAEAAQABAAEAAQABABQAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAaABoAGgAaAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABIAEgAQwBDAEMAUABQAFAAUABDAFAAUABQAEgAQwBIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABDAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAJAAkACQAJAAkACQAJABYAEQArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwANAA0AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAANACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQANAB4AHgAeAB4AHgAeAFAAUABQAFAADQAeACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAA0AHgAeACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAARwBHABUARwAJACsAKwArACsAKwArACsAKwArACsAKwAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUQBRAFEAKwArACsAKwArACsAKwArACsAKwArACsAKwBRAFEAUQBRACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAHgAEAAQADQAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQABAAEAAQABAAeAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQAHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAKwArAFAAKwArAFAAUAArACsAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUAArAFAAUABQAFAAUABQAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAHgAeAFAAUABQAFAAUAArAFAAKwArACsAUABQAFAAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeACsAKwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4ABAAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAHgAeAA0ADQANAA0AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArAAQABAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwBQAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArABsAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAB4AHgAeAB4ABAAEAAQABAAEAAQABABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArABYAFgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAGgBQAFAAUAAaAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUAArACsAKwArACsAKwBQACsAKwArACsAUAArAFAAKwBQACsAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUAArAFAAKwBQACsAUAArAFAAUAArAFAAKwArAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAKwBQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AJQAlACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeACUAJQAlAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAlACUAJQAlACUAHgAlACUAJQAlACUAIAAgACAAJQAlACAAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACEAIQAhACEAIQAlACUAIAAgACUAJQAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAIAAlACUAJQAlACAAIAAgACUAIAAgACAAJQAlACUAJQAlACUAJQAgACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAlAB4AJQAeACUAJQAlACUAJQAgACUAJQAlACUAHgAlAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACAAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABcAFwAXABUAFQAVAB4AHgAeAB4AJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAgACUAJQAgACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAIAAgACUAJQAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACAAIAAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACAAIAAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAA==",yl=50,yd=1,Ah=2,th=3,Sd=4,Md=5,Sl=7,nh=8,Ml=9,tn=10,Bo=11,Fl=12,_o=13,Fd=14,qi=15,wo=16,Lr=17,Gi=18,bd=19,bl=20,vo=21,Vi=22,Ba=23,Kn=24,JA=25,Zi=26,ji=27,kn=28,Td=29,Un=30,Qd=31,Rr=32,Dr=33,Eo=34,Co=35,xo=36,dr=37,Uo=38,Es=39,Cs=40,_a=41,ih=42,Id=43,Ld=[9001,65288],rh="!",We="×",Hr="÷",yo=Ed(Ud),Qt=[Un,xo],So=[yd,Ah,th,Md],sh=[tn,nh],Tl=[ji,Zi],Rd=So.concat(sh),Ql=[Uo,Es,Cs,Eo,Co],Dd=[qi,_o],Hd=function(n,e){e===void 0&&(e="strict");var A=[],t=[],i=[];return n.forEach(function(r,s){var a=yo.get(r);if(a>yl?(i.push(!0),a-=yl):i.push(!1),["normal","auto","loose"].indexOf(e)!==-1&&[8208,8211,12316,12448].indexOf(r)!==-1)return t.push(s),A.push(wo);if(a===Sd||a===Bo){if(s===0)return t.push(s),A.push(Un);var o=A[s-1];return Rd.indexOf(o)===-1?(t.push(t[s-1]),A.push(o)):(t.push(s),A.push(Un))}if(t.push(s),a===Qd)return A.push(e==="strict"?vo:dr);if(a===ih||a===Td)return A.push(Un);if(a===Id)return r>=131072&&r<=196605||r>=196608&&r<=262141?A.push(dr):A.push(Un);A.push(a)}),[t,A,i]},wa=function(n,e,A,t){var i=t[A];if(Array.isArray(n)?n.indexOf(i)!==-1:n===i)for(var r=A;r<=t.length;){r++;var s=t[r];if(s===e)return!0;if(s!==tn)break}if(i===tn)for(var r=A;r>0;){r--;var a=t[r];if(Array.isArray(n)?n.indexOf(a)!==-1:n===a)for(var o=A;o<=t.length;){o++;var s=t[o];if(s===e)return!0;if(s!==tn)break}if(a!==tn)break}return!1},Il=function(n,e){for(var A=n;A>=0;){var t=e[A];if(t===tn)A--;else return t}return 0},Pd=function(n,e,A,t,i){if(A[t]===0)return We;var r=t-1;if(Array.isArray(i)&&i[r]===!0)return We;var s=r-1,a=r+1,o=e[r],l=s>=0?e[s]:0,c=e[a];if(o===Ah&&c===th)return We;if(So.indexOf(o)!==-1)return rh;if(So.indexOf(c)!==-1||sh.indexOf(c)!==-1)return We;if(Il(r,e)===nh)return Hr;if(yo.get(n[r])===Bo||(o===Rr||o===Dr)&&yo.get(n[a])===Bo||o===Sl||c===Sl||o===Ml||[tn,_o,qi].indexOf(o)===-1&&c===Ml||[Lr,Gi,bd,Kn,kn].indexOf(c)!==-1||Il(r,e)===Vi||wa(Ba,Vi,r,e)||wa([Lr,Gi],vo,r,e)||wa(Fl,Fl,r,e))return We;if(o===tn)return Hr;if(o===Ba||c===Ba)return We;if(c===wo||o===wo)return Hr;if([_o,qi,vo].indexOf(c)!==-1||o===Fd||l===xo&&Dd.indexOf(o)!==-1||o===kn&&c===xo||c===bl||Qt.indexOf(c)!==-1&&o===JA||Qt.indexOf(o)!==-1&&c===JA||o===ji&&[dr,Rr,Dr].indexOf(c)!==-1||[dr,Rr,Dr].indexOf(o)!==-1&&c===Zi||Qt.indexOf(o)!==-1&&Tl.indexOf(c)!==-1||Tl.indexOf(o)!==-1&&Qt.indexOf(c)!==-1||[ji,Zi].indexOf(o)!==-1&&(c===JA||[Vi,qi].indexOf(c)!==-1&&e[a+1]===JA)||[Vi,qi].indexOf(o)!==-1&&c===JA||o===JA&&[JA,kn,Kn].indexOf(c)!==-1)return We;if([JA,kn,Kn,Lr,Gi].indexOf(c)!==-1)for(var u=r;u>=0;){var h=e[u];if(h===JA)return We;if([kn,Kn].indexOf(h)!==-1)u--;else break}if([ji,Zi].indexOf(c)!==-1)for(var u=[Lr,Gi].indexOf(o)!==-1?s:r;u>=0;){var h=e[u];if(h===JA)return We;if([kn,Kn].indexOf(h)!==-1)u--;else break}if(Uo===o&&[Uo,Es,Eo,Co].indexOf(c)!==-1||[Es,Eo].indexOf(o)!==-1&&[Es,Cs].indexOf(c)!==-1||[Cs,Co].indexOf(o)!==-1&&c===Cs||Ql.indexOf(o)!==-1&&[bl,Zi].indexOf(c)!==-1||Ql.indexOf(c)!==-1&&o===ji||Qt.indexOf(o)!==-1&&Qt.indexOf(c)!==-1||o===Kn&&Qt.indexOf(c)!==-1||Qt.concat(JA).indexOf(o)!==-1&&c===Vi&&Ld.indexOf(n[a])===-1||Qt.concat(JA).indexOf(c)!==-1&&o===Gi)return We;if(o===_a&&c===_a){for(var p=A[r],g=1;p>0&&(p--,e[p]===_a);)g++;if(g%2!==0)return We}return o===Rr&&c===Dr?We:Hr},Od=function(n,e){e||(e={lineBreak:"normal",wordBreak:"normal"});var A=Hd(n,e.lineBreak),t=A[0],i=A[1],r=A[2];(e.wordBreak==="break-all"||e.wordBreak==="break-word")&&(i=i.map(function(a){return[JA,Un,ih].indexOf(a)!==-1?dr:a}));var s=e.wordBreak==="keep-all"?r.map(function(a,o){return a&&n[o]>=19968&&n[o]<=40959}):void 0;return[t,i,s]},Nd=function(){function n(e,A,t,i){this.codePoints=e,this.required=A===rh,this.start=t,this.end=i}return n.prototype.slice=function(){return oA.apply(void 0,this.codePoints.slice(this.start,this.end))},n}(),Gd=function(n,e){var A=Js(n),t=Od(A,e),i=t[0],r=t[1],s=t[2],a=A.length,o=0,l=0;return{next:function(){if(l>=a)return{done:!0,value:null};for(var c=We;l<a&&(c=Pd(A,r,i,++l,s))===We;);if(c!==We||l===a){var u=new Nd(A,c,o,l);return o=l,{value:u,done:!1}}return{done:!0,value:null}}}},Vd=1,Kd=2,Cr=4,Ll=8,Ss=10,Rl=47,ir=92,kd=9,zd=32,Pr=34,Ki=61,Wd=35,Xd=36,Yd=37,Or=39,Nr=40,ki=41,Jd=95,VA=45,qd=33,Zd=60,jd=62,$d=64,ep=91,Ap=93,tp=61,np=123,Gr=63,ip=125,Dl=124,rp=126,sp=128,Hl=65533,va=42,Sn=43,ap=44,op=58,lp=59,pr=46,cp=0,up=8,hp=11,fp=14,dp=31,pp=127,Bt=-1,ah=48,oh=97,lh=101,gp=102,mp=117,Bp=122,ch=65,uh=69,hh=70,_p=85,wp=90,IA=function(n){return n>=ah&&n<=57},vp=function(n){return n>=55296&&n<=57343},zn=function(n){return IA(n)||n>=ch&&n<=hh||n>=oh&&n<=gp},Ep=function(n){return n>=oh&&n<=Bp},Cp=function(n){return n>=ch&&n<=wp},xp=function(n){return Ep(n)||Cp(n)},Up=function(n){return n>=sp},Vr=function(n){return n===Ss||n===kd||n===zd},Ms=function(n){return xp(n)||Up(n)||n===Jd},Pl=function(n){return Ms(n)||IA(n)||n===VA},yp=function(n){return n>=cp&&n<=up||n===hp||n>=fp&&n<=dp||n===pp},en=function(n,e){return n!==ir?!1:e!==Ss},Kr=function(n,e,A){return n===VA?Ms(e)||en(e,A):Ms(n)?!0:!!(n===ir&&en(n,e))},Ea=function(n,e,A){return n===Sn||n===VA?IA(e)?!0:e===pr&&IA(A):IA(n===pr?e:n)},Sp=function(n){var e=0,A=1;(n[e]===Sn||n[e]===VA)&&(n[e]===VA&&(A=-1),e++);for(var t=[];IA(n[e]);)t.push(n[e++]);var i=t.length?parseInt(oA.apply(void 0,t),10):0;n[e]===pr&&e++;for(var r=[];IA(n[e]);)r.push(n[e++]);var s=r.length,a=s?parseInt(oA.apply(void 0,r),10):0;(n[e]===uh||n[e]===lh)&&e++;var o=1;(n[e]===Sn||n[e]===VA)&&(n[e]===VA&&(o=-1),e++);for(var l=[];IA(n[e]);)l.push(n[e++]);var c=l.length?parseInt(oA.apply(void 0,l),10):0;return A*(i+a*Math.pow(10,-s))*Math.pow(10,o*c)},Mp={type:2},Fp={type:3},bp={type:4},Tp={type:13},Qp={type:8},Ip={type:21},Lp={type:9},Rp={type:10},Dp={type:11},Hp={type:12},Pp={type:14},kr={type:23},Op={type:1},Np={type:25},Gp={type:24},Vp={type:26},Kp={type:27},kp={type:28},zp={type:29},Wp={type:31},Mo={type:32},fh=function(){function n(){this._value=[]}return n.prototype.write=function(e){this._value=this._value.concat(Js(e))},n.prototype.read=function(){for(var e=[],A=this.consumeToken();A!==Mo;)e.push(A),A=this.consumeToken();return e},n.prototype.consumeToken=function(){var e=this.consumeCodePoint();switch(e){case Pr:return this.consumeStringToken(Pr);case Wd:var A=this.peekCodePoint(0),t=this.peekCodePoint(1),i=this.peekCodePoint(2);if(Pl(A)||en(t,i)){var r=Kr(A,t,i)?Kd:Vd,s=this.consumeName();return{type:5,value:s,flags:r}}break;case Xd:if(this.peekCodePoint(0)===Ki)return this.consumeCodePoint(),Tp;break;case Or:return this.consumeStringToken(Or);case Nr:return Mp;case ki:return Fp;case va:if(this.peekCodePoint(0)===Ki)return this.consumeCodePoint(),Pp;break;case Sn:if(Ea(e,this.peekCodePoint(0),this.peekCodePoint(1)))return this.reconsumeCodePoint(e),this.consumeNumericToken();break;case ap:return bp;case VA:var a=e,o=this.peekCodePoint(0),l=this.peekCodePoint(1);if(Ea(a,o,l))return this.reconsumeCodePoint(e),this.consumeNumericToken();if(Kr(a,o,l))return this.reconsumeCodePoint(e),this.consumeIdentLikeToken();if(o===VA&&l===jd)return this.consumeCodePoint(),this.consumeCodePoint(),Gp;break;case pr:if(Ea(e,this.peekCodePoint(0),this.peekCodePoint(1)))return this.reconsumeCodePoint(e),this.consumeNumericToken();break;case Rl:if(this.peekCodePoint(0)===va)for(this.consumeCodePoint();;){var c=this.consumeCodePoint();if(c===va&&(c=this.consumeCodePoint(),c===Rl))return this.consumeToken();if(c===Bt)return this.consumeToken()}break;case op:return Vp;case lp:return Kp;case Zd:if(this.peekCodePoint(0)===qd&&this.peekCodePoint(1)===VA&&this.peekCodePoint(2)===VA)return this.consumeCodePoint(),this.consumeCodePoint(),Np;break;case $d:var u=this.peekCodePoint(0),h=this.peekCodePoint(1),p=this.peekCodePoint(2);if(Kr(u,h,p)){var s=this.consumeName();return{type:7,value:s}}break;case ep:return kp;case ir:if(en(e,this.peekCodePoint(0)))return this.reconsumeCodePoint(e),this.consumeIdentLikeToken();break;case Ap:return zp;case tp:if(this.peekCodePoint(0)===Ki)return this.consumeCodePoint(),Qp;break;case np:return Dp;case ip:return Hp;case mp:case _p:var g=this.peekCodePoint(0),m=this.peekCodePoint(1);return g===Sn&&(zn(m)||m===Gr)&&(this.consumeCodePoint(),this.consumeUnicodeRangeToken()),this.reconsumeCodePoint(e),this.consumeIdentLikeToken();case Dl:if(this.peekCodePoint(0)===Ki)return this.consumeCodePoint(),Lp;if(this.peekCodePoint(0)===Dl)return this.consumeCodePoint(),Ip;break;case rp:if(this.peekCodePoint(0)===Ki)return this.consumeCodePoint(),Rp;break;case Bt:return Mo}return Vr(e)?(this.consumeWhiteSpace(),Wp):IA(e)?(this.reconsumeCodePoint(e),this.consumeNumericToken()):Ms(e)?(this.reconsumeCodePoint(e),this.consumeIdentLikeToken()):{type:6,value:oA(e)}},n.prototype.consumeCodePoint=function(){var e=this._value.shift();return typeof e>"u"?-1:e},n.prototype.reconsumeCodePoint=function(e){this._value.unshift(e)},n.prototype.peekCodePoint=function(e){return e>=this._value.length?-1:this._value[e]},n.prototype.consumeUnicodeRangeToken=function(){for(var e=[],A=this.consumeCodePoint();zn(A)&&e.length<6;)e.push(A),A=this.consumeCodePoint();for(var t=!1;A===Gr&&e.length<6;)e.push(A),A=this.consumeCodePoint(),t=!0;if(t){var i=parseInt(oA.apply(void 0,e.map(function(o){return o===Gr?ah:o})),16),r=parseInt(oA.apply(void 0,e.map(function(o){return o===Gr?hh:o})),16);return{type:30,start:i,end:r}}var s=parseInt(oA.apply(void 0,e),16);if(this.peekCodePoint(0)===VA&&zn(this.peekCodePoint(1))){this.consumeCodePoint(),A=this.consumeCodePoint();for(var a=[];zn(A)&&a.length<6;)a.push(A),A=this.consumeCodePoint();var r=parseInt(oA.apply(void 0,a),16);return{type:30,start:s,end:r}}else return{type:30,start:s,end:s}},n.prototype.consumeIdentLikeToken=function(){var e=this.consumeName();return e.toLowerCase()==="url"&&this.peekCodePoint(0)===Nr?(this.consumeCodePoint(),this.consumeUrlToken()):this.peekCodePoint(0)===Nr?(this.consumeCodePoint(),{type:19,value:e}):{type:20,value:e}},n.prototype.consumeUrlToken=function(){var e=[];if(this.consumeWhiteSpace(),this.peekCodePoint(0)===Bt)return{type:22,value:""};var A=this.peekCodePoint(0);if(A===Or||A===Pr){var t=this.consumeStringToken(this.consumeCodePoint());return t.type===0&&(this.consumeWhiteSpace(),this.peekCodePoint(0)===Bt||this.peekCodePoint(0)===ki)?(this.consumeCodePoint(),{type:22,value:t.value}):(this.consumeBadUrlRemnants(),kr)}for(;;){var i=this.consumeCodePoint();if(i===Bt||i===ki)return{type:22,value:oA.apply(void 0,e)};if(Vr(i))return this.consumeWhiteSpace(),this.peekCodePoint(0)===Bt||this.peekCodePoint(0)===ki?(this.consumeCodePoint(),{type:22,value:oA.apply(void 0,e)}):(this.consumeBadUrlRemnants(),kr);if(i===Pr||i===Or||i===Nr||yp(i))return this.consumeBadUrlRemnants(),kr;if(i===ir)if(en(i,this.peekCodePoint(0)))e.push(this.consumeEscapedCodePoint());else return this.consumeBadUrlRemnants(),kr;else e.push(i)}},n.prototype.consumeWhiteSpace=function(){for(;Vr(this.peekCodePoint(0));)this.consumeCodePoint()},n.prototype.consumeBadUrlRemnants=function(){for(;;){var e=this.consumeCodePoint();if(e===ki||e===Bt)return;en(e,this.peekCodePoint(0))&&this.consumeEscapedCodePoint()}},n.prototype.consumeStringSlice=function(e){for(var A=5e4,t="";e>0;){var i=Math.min(A,e);t+=oA.apply(void 0,this._value.splice(0,i)),e-=i}return this._value.shift(),t},n.prototype.consumeStringToken=function(e){var A="",t=0;do{var i=this._value[t];if(i===Bt||i===void 0||i===e)return A+=this.consumeStringSlice(t),{type:0,value:A};if(i===Ss)return this._value.splice(0,t),Op;if(i===ir){var r=this._value[t+1];r!==Bt&&r!==void 0&&(r===Ss?(A+=this.consumeStringSlice(t),t=-1,this._value.shift()):en(i,r)&&(A+=this.consumeStringSlice(t),A+=oA(this.consumeEscapedCodePoint()),t=-1))}t++}while(!0)},n.prototype.consumeNumber=function(){var e=[],A=Cr,t=this.peekCodePoint(0);for((t===Sn||t===VA)&&e.push(this.consumeCodePoint());IA(this.peekCodePoint(0));)e.push(this.consumeCodePoint());t=this.peekCodePoint(0);var i=this.peekCodePoint(1);if(t===pr&&IA(i))for(e.push(this.consumeCodePoint(),this.consumeCodePoint()),A=Ll;IA(this.peekCodePoint(0));)e.push(this.consumeCodePoint());t=this.peekCodePoint(0),i=this.peekCodePoint(1);var r=this.peekCodePoint(2);if((t===uh||t===lh)&&((i===Sn||i===VA)&&IA(r)||IA(i)))for(e.push(this.consumeCodePoint(),this.consumeCodePoint()),A=Ll;IA(this.peekCodePoint(0));)e.push(this.consumeCodePoint());return[Sp(e),A]},n.prototype.consumeNumericToken=function(){var e=this.consumeNumber(),A=e[0],t=e[1],i=this.peekCodePoint(0),r=this.peekCodePoint(1),s=this.peekCodePoint(2);if(Kr(i,r,s)){var a=this.consumeName();return{type:15,number:A,flags:t,unit:a}}return i===Yd?(this.consumeCodePoint(),{type:16,number:A,flags:t}):{type:17,number:A,flags:t}},n.prototype.consumeEscapedCodePoint=function(){var e=this.consumeCodePoint();if(zn(e)){for(var A=oA(e);zn(this.peekCodePoint(0))&&A.length<6;)A+=oA(this.consumeCodePoint());Vr(this.peekCodePoint(0))&&this.consumeCodePoint();var t=parseInt(A,16);return t===0||vp(t)||t>1114111?Hl:t}return e===Bt?Hl:e},n.prototype.consumeName=function(){for(var e="";;){var A=this.consumeCodePoint();if(Pl(A))e+=oA(A);else if(en(A,this.peekCodePoint(0)))e+=oA(this.consumeEscapedCodePoint());else return this.reconsumeCodePoint(A),e}},n}(),dh=function(){function n(e){this._tokens=e}return n.create=function(e){var A=new fh;return A.write(e),new n(A.read())},n.parseValue=function(e){return n.create(e).parseComponentValue()},n.parseValues=function(e){return n.create(e).parseComponentValues()},n.prototype.parseComponentValue=function(){for(var e=this.consumeToken();e.type===31;)e=this.consumeToken();if(e.type===32)throw new SyntaxError("Error parsing CSS component value, unexpected EOF");this.reconsumeToken(e);var A=this.consumeComponentValue();do e=this.consumeToken();while(e.type===31);if(e.type===32)return A;throw new SyntaxError("Error parsing CSS component value, multiple values found when expecting only one")},n.prototype.parseComponentValues=function(){for(var e=[];;){var A=this.consumeComponentValue();if(A.type===32)return e;e.push(A),e.push()}},n.prototype.consumeComponentValue=function(){var e=this.consumeToken();switch(e.type){case 11:case 28:case 2:return this.consumeSimpleBlock(e.type);case 19:return this.consumeFunction(e)}return e},n.prototype.consumeSimpleBlock=function(e){for(var A={type:e,values:[]},t=this.consumeToken();;){if(t.type===32||Yp(t,e))return A;this.reconsumeToken(t),A.values.push(this.consumeComponentValue()),t=this.consumeToken()}},n.prototype.consumeFunction=function(e){for(var A={name:e.value,values:[],type:18};;){var t=this.consumeToken();if(t.type===32||t.type===3)return A;this.reconsumeToken(t),A.values.push(this.consumeComponentValue())}},n.prototype.consumeToken=function(){var e=this._tokens.shift();return typeof e>"u"?Mo:e},n.prototype.reconsumeToken=function(e){this._tokens.unshift(e)},n}(),xr=function(n){return n.type===15},Hi=function(n){return n.type===17},$e=function(n){return n.type===20},Xp=function(n){return n.type===0},Fo=function(n,e){return $e(n)&&n.value===e},ph=function(n){return n.type!==31},Qi=function(n){return n.type!==31&&n.type!==4},Mt=function(n){var e=[],A=[];return n.forEach(function(t){if(t.type===4){if(A.length===0)throw new Error("Error parsing function args, zero tokens for arg");e.push(A),A=[];return}t.type!==31&&A.push(t)}),A.length&&e.push(A),e},Yp=function(n,e){return e===11&&n.type===12||e===28&&n.type===29?!0:e===2&&n.type===3},dn=function(n){return n.type===17||n.type===15},dA=function(n){return n.type===16||dn(n)},gh=function(n){return n.length>1?[n[0],n[1]]:[n[0]]},SA={type:17,number:0,flags:Cr},Zo={type:16,number:50,flags:Cr},nn={type:16,number:100,flags:Cr},$i=function(n,e,A){var t=n[0],i=n[1];return[eA(t,e),eA(typeof i<"u"?i:t,A)]},eA=function(n,e){if(n.type===16)return n.number/100*e;if(xr(n))switch(n.unit){case"rem":case"em":return 16*n.number;case"px":default:return n.number}return n.number},mh="deg",Bh="grad",_h="rad",wh="turn",qs={name:"angle",parse:function(n,e){if(e.type===15)switch(e.unit){case mh:return Math.PI*e.number/180;case Bh:return Math.PI/200*e.number;case _h:return e.number;case wh:return Math.PI*2*e.number}throw new Error("Unsupported angle type")}},vh=function(n){return n.type===15&&(n.unit===mh||n.unit===Bh||n.unit===_h||n.unit===wh)},Eh=function(n){var e=n.filter($e).map(function(A){return A.value}).join(" ");switch(e){case"to bottom right":case"to right bottom":case"left top":case"top left":return[SA,SA];case"to top":case"bottom":return rt(0);case"to bottom left":case"to left bottom":case"right top":case"top right":return[SA,nn];case"to right":case"left":return rt(90);case"to top left":case"to left top":case"right bottom":case"bottom right":return[nn,nn];case"to bottom":case"top":return rt(180);case"to top right":case"to right top":case"left bottom":case"bottom left":return[nn,SA];case"to left":case"right":return rt(270)}return 0},rt=function(n){return Math.PI*n/180},on={name:"color",parse:function(n,e){if(e.type===18){var A=Jp[e.name];if(typeof A>"u")throw new Error('Attempting to parse an unsupported color function "'+e.name+'"');return A(n,e.values)}if(e.type===5){if(e.value.length===3){var t=e.value.substring(0,1),i=e.value.substring(1,2),r=e.value.substring(2,3);return rn(parseInt(t+t,16),parseInt(i+i,16),parseInt(r+r,16),1)}if(e.value.length===4){var t=e.value.substring(0,1),i=e.value.substring(1,2),r=e.value.substring(2,3),s=e.value.substring(3,4);return rn(parseInt(t+t,16),parseInt(i+i,16),parseInt(r+r,16),parseInt(s+s,16)/255)}if(e.value.length===6){var t=e.value.substring(0,2),i=e.value.substring(2,4),r=e.value.substring(4,6);return rn(parseInt(t,16),parseInt(i,16),parseInt(r,16),1)}if(e.value.length===8){var t=e.value.substring(0,2),i=e.value.substring(2,4),r=e.value.substring(4,6),s=e.value.substring(6,8);return rn(parseInt(t,16),parseInt(i,16),parseInt(r,16),parseInt(s,16)/255)}}if(e.type===20){var a=kt[e.value.toUpperCase()];if(typeof a<"u")return a}return kt.TRANSPARENT}},ln=function(n){return(255&n)===0},EA=function(n){var e=255&n,A=255&n>>8,t=255&n>>16,i=255&n>>24;return e<255?"rgba("+i+","+t+","+A+","+e/255+")":"rgb("+i+","+t+","+A+")"},rn=function(n,e,A,t){return(n<<24|e<<16|A<<8|Math.round(t*255)<<0)>>>0},Ol=function(n,e){if(n.type===17)return n.number;if(n.type===16){var A=e===3?1:255;return e===3?n.number/100*A:Math.round(n.number/100*A)}return 0},Nl=function(n,e){var A=e.filter(Qi);if(A.length===3){var t=A.map(Ol),i=t[0],r=t[1],s=t[2];return rn(i,r,s,1)}if(A.length===4){var a=A.map(Ol),i=a[0],r=a[1],s=a[2],o=a[3];return rn(i,r,s,o)}return 0};function Ca(n,e,A){return A<0&&(A+=1),A>=1&&(A-=1),A<1/6?(e-n)*A*6+n:A<1/2?e:A<2/3?(e-n)*6*(2/3-A)+n:n}var Gl=function(n,e){var A=e.filter(Qi),t=A[0],i=A[1],r=A[2],s=A[3],a=(t.type===17?rt(t.number):qs.parse(n,t))/(Math.PI*2),o=dA(i)?i.number/100:0,l=dA(r)?r.number/100:0,c=typeof s<"u"&&dA(s)?eA(s,1):1;if(o===0)return rn(l*255,l*255,l*255,1);var u=l<=.5?l*(o+1):l+o-l*o,h=l*2-u,p=Ca(h,u,a+1/3),g=Ca(h,u,a),m=Ca(h,u,a-1/3);return rn(p*255,g*255,m*255,c)},Jp={hsl:Gl,hsla:Gl,rgb:Nl,rgba:Nl},rr=function(n,e){return on.parse(n,dh.create(e).parseComponentValue())},kt={ALICEBLUE:4042850303,ANTIQUEWHITE:4209760255,AQUA:16777215,AQUAMARINE:2147472639,AZURE:4043309055,BEIGE:4126530815,BISQUE:4293182719,BLACK:255,BLANCHEDALMOND:4293643775,BLUE:65535,BLUEVIOLET:2318131967,BROWN:2771004159,BURLYWOOD:3736635391,CADETBLUE:1604231423,CHARTREUSE:2147418367,CHOCOLATE:3530104575,CORAL:4286533887,CORNFLOWERBLUE:1687547391,CORNSILK:4294499583,CRIMSON:3692313855,CYAN:16777215,DARKBLUE:35839,DARKCYAN:9145343,DARKGOLDENROD:3095837695,DARKGRAY:2846468607,DARKGREEN:6553855,DARKGREY:2846468607,DARKKHAKI:3182914559,DARKMAGENTA:2332068863,DARKOLIVEGREEN:1433087999,DARKORANGE:4287365375,DARKORCHID:2570243327,DARKRED:2332033279,DARKSALMON:3918953215,DARKSEAGREEN:2411499519,DARKSLATEBLUE:1211993087,DARKSLATEGRAY:793726975,DARKSLATEGREY:793726975,DARKTURQUOISE:13554175,DARKVIOLET:2483082239,DEEPPINK:4279538687,DEEPSKYBLUE:12582911,DIMGRAY:1768516095,DIMGREY:1768516095,DODGERBLUE:512819199,FIREBRICK:2988581631,FLORALWHITE:4294635775,FORESTGREEN:579543807,FUCHSIA:4278255615,GAINSBORO:3705462015,GHOSTWHITE:4177068031,GOLD:4292280575,GOLDENROD:3668254975,GRAY:2155905279,GREEN:8388863,GREENYELLOW:2919182335,GREY:2155905279,HONEYDEW:4043305215,HOTPINK:4285117695,INDIANRED:3445382399,INDIGO:1258324735,IVORY:4294963455,KHAKI:4041641215,LAVENDER:3873897215,LAVENDERBLUSH:4293981695,LAWNGREEN:2096890111,LEMONCHIFFON:4294626815,LIGHTBLUE:2916673279,LIGHTCORAL:4034953471,LIGHTCYAN:3774873599,LIGHTGOLDENRODYELLOW:4210742015,LIGHTGRAY:3553874943,LIGHTGREEN:2431553791,LIGHTGREY:3553874943,LIGHTPINK:4290167295,LIGHTSALMON:4288707327,LIGHTSEAGREEN:548580095,LIGHTSKYBLUE:2278488831,LIGHTSLATEGRAY:2005441023,LIGHTSLATEGREY:2005441023,LIGHTSTEELBLUE:2965692159,LIGHTYELLOW:4294959359,LIME:16711935,LIMEGREEN:852308735,LINEN:4210091775,MAGENTA:4278255615,MAROON:2147483903,MEDIUMAQUAMARINE:1724754687,MEDIUMBLUE:52735,MEDIUMORCHID:3126187007,MEDIUMPURPLE:2473647103,MEDIUMSEAGREEN:1018393087,MEDIUMSLATEBLUE:2070474495,MEDIUMSPRINGGREEN:16423679,MEDIUMTURQUOISE:1221709055,MEDIUMVIOLETRED:3340076543,MIDNIGHTBLUE:421097727,MINTCREAM:4127193855,MISTYROSE:4293190143,MOCCASIN:4293178879,NAVAJOWHITE:4292783615,NAVY:33023,OLDLACE:4260751103,OLIVE:2155872511,OLIVEDRAB:1804477439,ORANGE:4289003775,ORANGERED:4282712319,ORCHID:3664828159,PALEGOLDENROD:4008225535,PALEGREEN:2566625535,PALETURQUOISE:2951671551,PALEVIOLETRED:3681588223,PAPAYAWHIP:4293907967,PEACHPUFF:4292524543,PERU:3448061951,PINK:4290825215,PLUM:3718307327,POWDERBLUE:2967529215,PURPLE:2147516671,REBECCAPURPLE:1714657791,RED:4278190335,ROSYBROWN:3163525119,ROYALBLUE:1097458175,SADDLEBROWN:2336560127,SALMON:4202722047,SANDYBROWN:4104413439,SEAGREEN:780883967,SEASHELL:4294307583,SIENNA:2689740287,SILVER:3233857791,SKYBLUE:2278484991,SLATEBLUE:1784335871,SLATEGRAY:1887473919,SLATEGREY:1887473919,SNOW:4294638335,SPRINGGREEN:16744447,STEELBLUE:1182971135,TAN:3535047935,TEAL:8421631,THISTLE:3636451583,TOMATO:4284696575,TRANSPARENT:0,TURQUOISE:1088475391,VIOLET:4001558271,WHEAT:4125012991,WHITE:4294967295,WHITESMOKE:4126537215,YELLOW:4294902015,YELLOWGREEN:2597139199},qp={name:"background-clip",initialValue:"border-box",prefix:!1,type:1,parse:function(n,e){return e.map(function(A){if($e(A))switch(A.value){case"padding-box":return 1;case"content-box":return 2}return 0})}},Zp={name:"background-color",initialValue:"transparent",prefix:!1,type:3,format:"color"},Zs=function(n,e){var A=on.parse(n,e[0]),t=e[1];return t&&dA(t)?{color:A,stop:t}:{color:A,stop:null}},Vl=function(n,e){var A=n[0],t=n[n.length-1];A.stop===null&&(A.stop=SA),t.stop===null&&(t.stop=nn);for(var i=[],r=0,s=0;s<n.length;s++){var a=n[s].stop;if(a!==null){var o=eA(a,e);o>r?i.push(o):i.push(r),r=o}else i.push(null)}for(var l=null,s=0;s<i.length;s++){var c=i[s];if(c===null)l===null&&(l=s);else if(l!==null){for(var u=s-l,h=i[l-1],p=(c-h)/(u+1),g=1;g<=u;g++)i[l+g-1]=p*g;l=null}}return n.map(function(m,d){var f=m.color;return{color:f,stop:Math.max(Math.min(1,i[d]/e),0)}})},jp=function(n,e,A){var t=e/2,i=A/2,r=eA(n[0],e)-t,s=i-eA(n[1],A);return(Math.atan2(s,r)+Math.PI*2)%(Math.PI*2)},$p=function(n,e,A){var t=typeof n=="number"?n:jp(n,e,A),i=Math.abs(e*Math.sin(t))+Math.abs(A*Math.cos(t)),r=e/2,s=A/2,a=i/2,o=Math.sin(t-Math.PI/2)*a,l=Math.cos(t-Math.PI/2)*a;return[i,r-l,r+l,s-o,s+o]},lt=function(n,e){return Math.sqrt(n*n+e*e)},Kl=function(n,e,A,t,i){var r=[[0,0],[0,e],[n,0],[n,e]];return r.reduce(function(s,a){var o=a[0],l=a[1],c=lt(A-o,t-l);return(i?c<s.optimumDistance:c>s.optimumDistance)?{optimumCorner:a,optimumDistance:c}:s},{optimumDistance:i?1/0:-1/0,optimumCorner:null}).optimumCorner},eg=function(n,e,A,t,i){var r=0,s=0;switch(n.size){case 0:n.shape===0?r=s=Math.min(Math.abs(e),Math.abs(e-t),Math.abs(A),Math.abs(A-i)):n.shape===1&&(r=Math.min(Math.abs(e),Math.abs(e-t)),s=Math.min(Math.abs(A),Math.abs(A-i)));break;case 2:if(n.shape===0)r=s=Math.min(lt(e,A),lt(e,A-i),lt(e-t,A),lt(e-t,A-i));else if(n.shape===1){var a=Math.min(Math.abs(A),Math.abs(A-i))/Math.min(Math.abs(e),Math.abs(e-t)),o=Kl(t,i,e,A,!0),l=o[0],c=o[1];r=lt(l-e,(c-A)/a),s=a*r}break;case 1:n.shape===0?r=s=Math.max(Math.abs(e),Math.abs(e-t),Math.abs(A),Math.abs(A-i)):n.shape===1&&(r=Math.max(Math.abs(e),Math.abs(e-t)),s=Math.max(Math.abs(A),Math.abs(A-i)));break;case 3:if(n.shape===0)r=s=Math.max(lt(e,A),lt(e,A-i),lt(e-t,A),lt(e-t,A-i));else if(n.shape===1){var a=Math.max(Math.abs(A),Math.abs(A-i))/Math.max(Math.abs(e),Math.abs(e-t)),u=Kl(t,i,e,A,!1),l=u[0],c=u[1];r=lt(l-e,(c-A)/a),s=a*r}break}return Array.isArray(n.size)&&(r=eA(n.size[0],t),s=n.size.length===2?eA(n.size[1],i):r),[r,s]},Ag=function(n,e){var A=rt(180),t=[];return Mt(e).forEach(function(i,r){if(r===0){var s=i[0];if(s.type===20&&s.value==="to"){A=Eh(i);return}else if(vh(s)){A=qs.parse(n,s);return}}var a=Zs(n,i);t.push(a)}),{angle:A,stops:t,type:1}},zr=function(n,e){var A=rt(180),t=[];return Mt(e).forEach(function(i,r){if(r===0){var s=i[0];if(s.type===20&&["top","left","right","bottom"].indexOf(s.value)!==-1){A=Eh(i);return}else if(vh(s)){A=(qs.parse(n,s)+rt(270))%rt(360);return}}var a=Zs(n,i);t.push(a)}),{angle:A,stops:t,type:1}},tg=function(n,e){var A=rt(180),t=[],i=1,r=0,s=3,a=[];return Mt(e).forEach(function(o,l){var c=o[0];if(l===0){if($e(c)&&c.value==="linear"){i=1;return}else if($e(c)&&c.value==="radial"){i=2;return}}if(c.type===18){if(c.name==="from"){var u=on.parse(n,c.values[0]);t.push({stop:SA,color:u})}else if(c.name==="to"){var u=on.parse(n,c.values[0]);t.push({stop:nn,color:u})}else if(c.name==="color-stop"){var h=c.values.filter(Qi);if(h.length===2){var u=on.parse(n,h[1]),p=h[0];Hi(p)&&t.push({stop:{type:16,number:p.number*100,flags:p.flags},color:u})}}}}),i===1?{angle:(A+rt(180))%rt(360),stops:t,type:i}:{size:s,shape:r,stops:t,position:a,type:i}},Ch="closest-side",xh="farthest-side",Uh="closest-corner",yh="farthest-corner",Sh="circle",Mh="ellipse",Fh="cover",bh="contain",ng=function(n,e){var A=0,t=3,i=[],r=[];return Mt(e).forEach(function(s,a){var o=!0;if(a===0){var l=!1;o=s.reduce(function(u,h){if(l)if($e(h))switch(h.value){case"center":return r.push(Zo),u;case"top":case"left":return r.push(SA),u;case"right":case"bottom":return r.push(nn),u}else(dA(h)||dn(h))&&r.push(h);else if($e(h))switch(h.value){case Sh:return A=0,!1;case Mh:return A=1,!1;case"at":return l=!0,!1;case Ch:return t=0,!1;case Fh:case xh:return t=1,!1;case bh:case Uh:return t=2,!1;case yh:return t=3,!1}else if(dn(h)||dA(h))return Array.isArray(t)||(t=[]),t.push(h),!1;return u},o)}if(o){var c=Zs(n,s);i.push(c)}}),{size:t,shape:A,stops:i,position:r,type:2}},Wr=function(n,e){var A=0,t=3,i=[],r=[];return Mt(e).forEach(function(s,a){var o=!0;if(a===0?o=s.reduce(function(c,u){if($e(u))switch(u.value){case"center":return r.push(Zo),!1;case"top":case"left":return r.push(SA),!1;case"right":case"bottom":return r.push(nn),!1}else if(dA(u)||dn(u))return r.push(u),!1;return c},o):a===1&&(o=s.reduce(function(c,u){if($e(u))switch(u.value){case Sh:return A=0,!1;case Mh:return A=1,!1;case bh:case Ch:return t=0,!1;case xh:return t=1,!1;case Uh:return t=2,!1;case Fh:case yh:return t=3,!1}else if(dn(u)||dA(u))return Array.isArray(t)||(t=[]),t.push(u),!1;return c},o)),o){var l=Zs(n,s);i.push(l)}}),{size:t,shape:A,stops:i,position:r,type:2}},ig=function(n){return n.type===1},rg=function(n){return n.type===2},jo={name:"image",parse:function(n,e){if(e.type===22){var A={url:e.value,type:0};return n.cache.addImage(e.value),A}if(e.type===18){var t=Th[e.name];if(typeof t>"u")throw new Error('Attempting to parse an unsupported image function "'+e.name+'"');return t(n,e.values)}throw new Error("Unsupported image type "+e.type)}};function sg(n){return!(n.type===20&&n.value==="none")&&(n.type!==18||!!Th[n.name])}var Th={"linear-gradient":Ag,"-moz-linear-gradient":zr,"-ms-linear-gradient":zr,"-o-linear-gradient":zr,"-webkit-linear-gradient":zr,"radial-gradient":ng,"-moz-radial-gradient":Wr,"-ms-radial-gradient":Wr,"-o-radial-gradient":Wr,"-webkit-radial-gradient":Wr,"-webkit-gradient":tg},ag={name:"background-image",initialValue:"none",type:1,prefix:!1,parse:function(n,e){if(e.length===0)return[];var A=e[0];return A.type===20&&A.value==="none"?[]:e.filter(function(t){return Qi(t)&&sg(t)}).map(function(t){return jo.parse(n,t)})}},og={name:"background-origin",initialValue:"border-box",prefix:!1,type:1,parse:function(n,e){return e.map(function(A){if($e(A))switch(A.value){case"padding-box":return 1;case"content-box":return 2}return 0})}},lg={name:"background-position",initialValue:"0% 0%",type:1,prefix:!1,parse:function(n,e){return Mt(e).map(function(A){return A.filter(dA)}).map(gh)}},cg={name:"background-repeat",initialValue:"repeat",prefix:!1,type:1,parse:function(n,e){return Mt(e).map(function(A){return A.filter($e).map(function(t){return t.value}).join(" ")}).map(ug)}},ug=function(n){switch(n){case"no-repeat":return 1;case"repeat-x":case"repeat no-repeat":return 2;case"repeat-y":case"no-repeat repeat":return 3;case"repeat":default:return 0}},wi;(function(n){n.AUTO="auto",n.CONTAIN="contain",n.COVER="cover"})(wi||(wi={}));var hg={name:"background-size",initialValue:"0",prefix:!1,type:1,parse:function(n,e){return Mt(e).map(function(A){return A.filter(fg)})}},fg=function(n){return $e(n)||dA(n)},js=function(n){return{name:"border-"+n+"-color",initialValue:"transparent",prefix:!1,type:3,format:"color"}},dg=js("top"),pg=js("right"),gg=js("bottom"),mg=js("left"),$s=function(n){return{name:"border-radius-"+n,initialValue:"0 0",prefix:!1,type:1,parse:function(e,A){return gh(A.filter(dA))}}},Bg=$s("top-left"),_g=$s("top-right"),wg=$s("bottom-right"),vg=$s("bottom-left"),ea=function(n){return{name:"border-"+n+"-style",initialValue:"solid",prefix:!1,type:2,parse:function(e,A){switch(A){case"none":return 0;case"dashed":return 2;case"dotted":return 3;case"double":return 4}return 1}}},Eg=ea("top"),Cg=ea("right"),xg=ea("bottom"),Ug=ea("left"),Aa=function(n){return{name:"border-"+n+"-width",initialValue:"0",type:0,prefix:!1,parse:function(e,A){return xr(A)?A.number:0}}},yg=Aa("top"),Sg=Aa("right"),Mg=Aa("bottom"),Fg=Aa("left"),bg={name:"color",initialValue:"transparent",prefix:!1,type:3,format:"color"},Tg={name:"direction",initialValue:"ltr",prefix:!1,type:2,parse:function(n,e){switch(e){case"rtl":return 1;case"ltr":default:return 0}}},Qg={name:"display",initialValue:"inline-block",prefix:!1,type:1,parse:function(n,e){return e.filter($e).reduce(function(A,t){return A|Ig(t.value)},0)}},Ig=function(n){switch(n){case"block":case"-webkit-box":return 2;case"inline":return 4;case"run-in":return 8;case"flow":return 16;case"flow-root":return 32;case"table":return 64;case"flex":case"-webkit-flex":return 128;case"grid":case"-ms-grid":return 256;case"ruby":return 512;case"subgrid":return 1024;case"list-item":return 2048;case"table-row-group":return 4096;case"table-header-group":return 8192;case"table-footer-group":return 16384;case"table-row":return 32768;case"table-cell":return 65536;case"table-column-group":return 131072;case"table-column":return 262144;case"table-caption":return 524288;case"ruby-base":return 1048576;case"ruby-text":return 2097152;case"ruby-base-container":return 4194304;case"ruby-text-container":return 8388608;case"contents":return 16777216;case"inline-block":return 33554432;case"inline-list-item":return 67108864;case"inline-table":return 134217728;case"inline-flex":return 268435456;case"inline-grid":return 536870912}return 0},Lg={name:"float",initialValue:"none",prefix:!1,type:2,parse:function(n,e){switch(e){case"left":return 1;case"right":return 2;case"inline-start":return 3;case"inline-end":return 4}return 0}},Rg={name:"letter-spacing",initialValue:"0",prefix:!1,type:0,parse:function(n,e){return e.type===20&&e.value==="normal"?0:e.type===17||e.type===15?e.number:0}},Fs;(function(n){n.NORMAL="normal",n.STRICT="strict"})(Fs||(Fs={}));var Dg={name:"line-break",initialValue:"normal",prefix:!1,type:2,parse:function(n,e){switch(e){case"strict":return Fs.STRICT;case"normal":default:return Fs.NORMAL}}},Hg={name:"line-height",initialValue:"normal",prefix:!1,type:4},kl=function(n,e){return $e(n)&&n.value==="normal"?1.2*e:n.type===17?e*n.number:dA(n)?eA(n,e):e},Pg={name:"list-style-image",initialValue:"none",type:0,prefix:!1,parse:function(n,e){return e.type===20&&e.value==="none"?null:jo.parse(n,e)}},Og={name:"list-style-position",initialValue:"outside",prefix:!1,type:2,parse:function(n,e){switch(e){case"inside":return 0;case"outside":default:return 1}}},bo={name:"list-style-type",initialValue:"none",prefix:!1,type:2,parse:function(n,e){switch(e){case"disc":return 0;case"circle":return 1;case"square":return 2;case"decimal":return 3;case"cjk-decimal":return 4;case"decimal-leading-zero":return 5;case"lower-roman":return 6;case"upper-roman":return 7;case"lower-greek":return 8;case"lower-alpha":return 9;case"upper-alpha":return 10;case"arabic-indic":return 11;case"armenian":return 12;case"bengali":return 13;case"cambodian":return 14;case"cjk-earthly-branch":return 15;case"cjk-heavenly-stem":return 16;case"cjk-ideographic":return 17;case"devanagari":return 18;case"ethiopic-numeric":return 19;case"georgian":return 20;case"gujarati":return 21;case"gurmukhi":return 22;case"hebrew":return 22;case"hiragana":return 23;case"hiragana-iroha":return 24;case"japanese-formal":return 25;case"japanese-informal":return 26;case"kannada":return 27;case"katakana":return 28;case"katakana-iroha":return 29;case"khmer":return 30;case"korean-hangul-formal":return 31;case"korean-hanja-formal":return 32;case"korean-hanja-informal":return 33;case"lao":return 34;case"lower-armenian":return 35;case"malayalam":return 36;case"mongolian":return 37;case"myanmar":return 38;case"oriya":return 39;case"persian":return 40;case"simp-chinese-formal":return 41;case"simp-chinese-informal":return 42;case"tamil":return 43;case"telugu":return 44;case"thai":return 45;case"tibetan":return 46;case"trad-chinese-formal":return 47;case"trad-chinese-informal":return 48;case"upper-armenian":return 49;case"disclosure-open":return 50;case"disclosure-closed":return 51;case"none":default:return-1}}},ta=function(n){return{name:"margin-"+n,initialValue:"0",prefix:!1,type:4}},Ng=ta("top"),Gg=ta("right"),Vg=ta("bottom"),Kg=ta("left"),kg={name:"overflow",initialValue:"visible",prefix:!1,type:1,parse:function(n,e){return e.filter($e).map(function(A){switch(A.value){case"hidden":return 1;case"scroll":return 2;case"clip":return 3;case"auto":return 4;case"visible":default:return 0}})}},zg={name:"overflow-wrap",initialValue:"normal",prefix:!1,type:2,parse:function(n,e){switch(e){case"break-word":return"break-word";case"normal":default:return"normal"}}},na=function(n){return{name:"padding-"+n,initialValue:"0",prefix:!1,type:3,format:"length-percentage"}},Wg=na("top"),Xg=na("right"),Yg=na("bottom"),Jg=na("left"),qg={name:"text-align",initialValue:"left",prefix:!1,type:2,parse:function(n,e){switch(e){case"right":return 2;case"center":case"justify":return 1;case"left":default:return 0}}},Zg={name:"position",initialValue:"static",prefix:!1,type:2,parse:function(n,e){switch(e){case"relative":return 1;case"absolute":return 2;case"fixed":return 3;case"sticky":return 4}return 0}},jg={name:"text-shadow",initialValue:"none",type:1,prefix:!1,parse:function(n,e){return e.length===1&&Fo(e[0],"none")?[]:Mt(e).map(function(A){for(var t={color:kt.TRANSPARENT,offsetX:SA,offsetY:SA,blur:SA},i=0,r=0;r<A.length;r++){var s=A[r];dn(s)?(i===0?t.offsetX=s:i===1?t.offsetY=s:t.blur=s,i++):t.color=on.parse(n,s)}return t})}},$g={name:"text-transform",initialValue:"none",prefix:!1,type:2,parse:function(n,e){switch(e){case"uppercase":return 2;case"lowercase":return 1;case"capitalize":return 3}return 0}},em={name:"transform",initialValue:"none",prefix:!0,type:0,parse:function(n,e){if(e.type===20&&e.value==="none")return null;if(e.type===18){var A=nm[e.name];if(typeof A>"u")throw new Error('Attempting to parse an unsupported transform function "'+e.name+'"');return A(e.values)}return null}},Am=function(n){var e=n.filter(function(A){return A.type===17}).map(function(A){return A.number});return e.length===6?e:null},tm=function(n){var e=n.filter(function(o){return o.type===17}).map(function(o){return o.number}),A=e[0],t=e[1];e[2],e[3];var i=e[4],r=e[5];e[6],e[7],e[8],e[9],e[10],e[11];var s=e[12],a=e[13];return e[14],e[15],e.length===16?[A,t,i,r,s,a]:null},nm={matrix:Am,matrix3d:tm},zl={type:16,number:50,flags:Cr},im=[zl,zl],rm={name:"transform-origin",initialValue:"50% 50%",prefix:!0,type:1,parse:function(n,e){var A=e.filter(dA);return A.length!==2?im:[A[0],A[1]]}},sm={name:"visible",initialValue:"none",prefix:!1,type:2,parse:function(n,e){switch(e){case"hidden":return 1;case"collapse":return 2;case"visible":default:return 0}}},sr;(function(n){n.NORMAL="normal",n.BREAK_ALL="break-all",n.KEEP_ALL="keep-all"})(sr||(sr={}));var am={name:"word-break",initialValue:"normal",prefix:!1,type:2,parse:function(n,e){switch(e){case"break-all":return sr.BREAK_ALL;case"keep-all":return sr.KEEP_ALL;case"normal":default:return sr.NORMAL}}},om={name:"z-index",initialValue:"auto",prefix:!1,type:0,parse:function(n,e){if(e.type===20)return{auto:!0,order:0};if(Hi(e))return{auto:!1,order:e.number};throw new Error("Invalid z-index number parsed")}},Qh={name:"time",parse:function(n,e){if(e.type===15)switch(e.unit.toLowerCase()){case"s":return 1e3*e.number;case"ms":return e.number}throw new Error("Unsupported time type")}},lm={name:"opacity",initialValue:"1",type:0,prefix:!1,parse:function(n,e){return Hi(e)?e.number:1}},cm={name:"text-decoration-color",initialValue:"transparent",prefix:!1,type:3,format:"color"},um={name:"text-decoration-line",initialValue:"none",prefix:!1,type:1,parse:function(n,e){return e.filter($e).map(function(A){switch(A.value){case"underline":return 1;case"overline":return 2;case"line-through":return 3;case"none":return 4}return 0}).filter(function(A){return A!==0})}},hm={name:"font-family",initialValue:"",prefix:!1,type:1,parse:function(n,e){var A=[],t=[];return e.forEach(function(i){switch(i.type){case 20:case 0:A.push(i.value);break;case 17:A.push(i.number.toString());break;case 4:t.push(A.join(" ")),A.length=0;break}}),A.length&&t.push(A.join(" ")),t.map(function(i){return i.indexOf(" ")===-1?i:"'"+i+"'"})}},fm={name:"font-size",initialValue:"0",prefix:!1,type:3,format:"length"},dm={name:"font-weight",initialValue:"normal",type:0,prefix:!1,parse:function(n,e){if(Hi(e))return e.number;if($e(e))switch(e.value){case"bold":return 700;case"normal":default:return 400}return 400}},pm={name:"font-variant",initialValue:"none",type:1,prefix:!1,parse:function(n,e){return e.filter($e).map(function(A){return A.value})}},gm={name:"font-style",initialValue:"normal",prefix:!1,type:2,parse:function(n,e){switch(e){case"oblique":return"oblique";case"italic":return"italic";case"normal":default:return"normal"}}},mA=function(n,e){return(n&e)!==0},mm={name:"content",initialValue:"none",type:1,prefix:!1,parse:function(n,e){if(e.length===0)return[];var A=e[0];return A.type===20&&A.value==="none"?[]:e}},Bm={name:"counter-increment",initialValue:"none",prefix:!0,type:1,parse:function(n,e){if(e.length===0)return null;var A=e[0];if(A.type===20&&A.value==="none")return null;for(var t=[],i=e.filter(ph),r=0;r<i.length;r++){var s=i[r],a=i[r+1];if(s.type===20){var o=a&&Hi(a)?a.number:1;t.push({counter:s.value,increment:o})}}return t}},_m={name:"counter-reset",initialValue:"none",prefix:!0,type:1,parse:function(n,e){if(e.length===0)return[];for(var A=[],t=e.filter(ph),i=0;i<t.length;i++){var r=t[i],s=t[i+1];if($e(r)&&r.value!=="none"){var a=s&&Hi(s)?s.number:0;A.push({counter:r.value,reset:a})}}return A}},wm={name:"duration",initialValue:"0s",prefix:!1,type:1,parse:function(n,e){return e.filter(xr).map(function(A){return Qh.parse(n,A)})}},vm={name:"quotes",initialValue:"none",prefix:!0,type:1,parse:function(n,e){if(e.length===0)return null;var A=e[0];if(A.type===20&&A.value==="none")return null;var t=[],i=e.filter(Xp);if(i.length%2!==0)return null;for(var r=0;r<i.length;r+=2){var s=i[r].value,a=i[r+1].value;t.push({open:s,close:a})}return t}},Wl=function(n,e,A){if(!n)return"";var t=n[Math.min(e,n.length-1)];return t?A?t.open:t.close:""},Em={name:"box-shadow",initialValue:"none",type:1,prefix:!1,parse:function(n,e){return e.length===1&&Fo(e[0],"none")?[]:Mt(e).map(function(A){for(var t={color:255,offsetX:SA,offsetY:SA,blur:SA,spread:SA,inset:!1},i=0,r=0;r<A.length;r++){var s=A[r];Fo(s,"inset")?t.inset=!0:dn(s)?(i===0?t.offsetX=s:i===1?t.offsetY=s:i===2?t.blur=s:t.spread=s,i++):t.color=on.parse(n,s)}return t})}},Cm={name:"paint-order",initialValue:"normal",prefix:!1,type:1,parse:function(n,e){var A=[0,1,2],t=[];return e.filter($e).forEach(function(i){switch(i.value){case"stroke":t.push(1);break;case"fill":t.push(0);break;case"markers":t.push(2);break}}),A.forEach(function(i){t.indexOf(i)===-1&&t.push(i)}),t}},xm={name:"-webkit-text-stroke-color",initialValue:"currentcolor",prefix:!1,type:3,format:"color"},Um={name:"-webkit-text-stroke-width",initialValue:"0",type:0,prefix:!1,parse:function(n,e){return xr(e)?e.number:0}},ym=function(){function n(e,A){var t,i;this.animationDuration=me(e,wm,A.animationDuration),this.backgroundClip=me(e,qp,A.backgroundClip),this.backgroundColor=me(e,Zp,A.backgroundColor),this.backgroundImage=me(e,ag,A.backgroundImage),this.backgroundOrigin=me(e,og,A.backgroundOrigin),this.backgroundPosition=me(e,lg,A.backgroundPosition),this.backgroundRepeat=me(e,cg,A.backgroundRepeat),this.backgroundSize=me(e,hg,A.backgroundSize),this.borderTopColor=me(e,dg,A.borderTopColor),this.borderRightColor=me(e,pg,A.borderRightColor),this.borderBottomColor=me(e,gg,A.borderBottomColor),this.borderLeftColor=me(e,mg,A.borderLeftColor),this.borderTopLeftRadius=me(e,Bg,A.borderTopLeftRadius),this.borderTopRightRadius=me(e,_g,A.borderTopRightRadius),this.borderBottomRightRadius=me(e,wg,A.borderBottomRightRadius),this.borderBottomLeftRadius=me(e,vg,A.borderBottomLeftRadius),this.borderTopStyle=me(e,Eg,A.borderTopStyle),this.borderRightStyle=me(e,Cg,A.borderRightStyle),this.borderBottomStyle=me(e,xg,A.borderBottomStyle),this.borderLeftStyle=me(e,Ug,A.borderLeftStyle),this.borderTopWidth=me(e,yg,A.borderTopWidth),this.borderRightWidth=me(e,Sg,A.borderRightWidth),this.borderBottomWidth=me(e,Mg,A.borderBottomWidth),this.borderLeftWidth=me(e,Fg,A.borderLeftWidth),this.boxShadow=me(e,Em,A.boxShadow),this.color=me(e,bg,A.color),this.direction=me(e,Tg,A.direction),this.display=me(e,Qg,A.display),this.float=me(e,Lg,A.cssFloat),this.fontFamily=me(e,hm,A.fontFamily),this.fontSize=me(e,fm,A.fontSize),this.fontStyle=me(e,gm,A.fontStyle),this.fontVariant=me(e,pm,A.fontVariant),this.fontWeight=me(e,dm,A.fontWeight),this.letterSpacing=me(e,Rg,A.letterSpacing),this.lineBreak=me(e,Dg,A.lineBreak),this.lineHeight=me(e,Hg,A.lineHeight),this.listStyleImage=me(e,Pg,A.listStyleImage),this.listStylePosition=me(e,Og,A.listStylePosition),this.listStyleType=me(e,bo,A.listStyleType),this.marginTop=me(e,Ng,A.marginTop),this.marginRight=me(e,Gg,A.marginRight),this.marginBottom=me(e,Vg,A.marginBottom),this.marginLeft=me(e,Kg,A.marginLeft),this.opacity=me(e,lm,A.opacity);var r=me(e,kg,A.overflow);this.overflowX=r[0],this.overflowY=r[r.length>1?1:0],this.overflowWrap=me(e,zg,A.overflowWrap),this.paddingTop=me(e,Wg,A.paddingTop),this.paddingRight=me(e,Xg,A.paddingRight),this.paddingBottom=me(e,Yg,A.paddingBottom),this.paddingLeft=me(e,Jg,A.paddingLeft),this.paintOrder=me(e,Cm,A.paintOrder),this.position=me(e,Zg,A.position),this.textAlign=me(e,qg,A.textAlign),this.textDecorationColor=me(e,cm,(t=A.textDecorationColor)!==null&&t!==void 0?t:A.color),this.textDecorationLine=me(e,um,(i=A.textDecorationLine)!==null&&i!==void 0?i:A.textDecoration),this.textShadow=me(e,jg,A.textShadow),this.textTransform=me(e,$g,A.textTransform),this.transform=me(e,em,A.transform),this.transformOrigin=me(e,rm,A.transformOrigin),this.visibility=me(e,sm,A.visibility),this.webkitTextStrokeColor=me(e,xm,A.webkitTextStrokeColor),this.webkitTextStrokeWidth=me(e,Um,A.webkitTextStrokeWidth),this.wordBreak=me(e,am,A.wordBreak),this.zIndex=me(e,om,A.zIndex)}return n.prototype.isVisible=function(){return this.display>0&&this.opacity>0&&this.visibility===0},n.prototype.isTransparent=function(){return ln(this.backgroundColor)},n.prototype.isTransformed=function(){return this.transform!==null},n.prototype.isPositioned=function(){return this.position!==0},n.prototype.isPositionedWithZIndex=function(){return this.isPositioned()&&!this.zIndex.auto},n.prototype.isFloating=function(){return this.float!==0},n.prototype.isInlineLevel=function(){return mA(this.display,4)||mA(this.display,33554432)||mA(this.display,268435456)||mA(this.display,536870912)||mA(this.display,67108864)||mA(this.display,134217728)},n}(),Sm=function(){function n(e,A){this.content=me(e,mm,A.content),this.quotes=me(e,vm,A.quotes)}return n}(),Xl=function(){function n(e,A){this.counterIncrement=me(e,Bm,A.counterIncrement),this.counterReset=me(e,_m,A.counterReset)}return n}(),me=function(n,e,A){var t=new fh,i=A!==null&&typeof A<"u"?A.toString():e.initialValue;t.write(i);var r=new dh(t.read());switch(e.type){case 2:var s=r.parseComponentValue();return e.parse(n,$e(s)?s.value:e.initialValue);case 0:return e.parse(n,r.parseComponentValue());case 1:return e.parse(n,r.parseComponentValues());case 4:return r.parseComponentValue();case 3:switch(e.format){case"angle":return qs.parse(n,r.parseComponentValue());case"color":return on.parse(n,r.parseComponentValue());case"image":return jo.parse(n,r.parseComponentValue());case"length":var a=r.parseComponentValue();return dn(a)?a:SA;case"length-percentage":var o=r.parseComponentValue();return dA(o)?o:SA;case"time":return Qh.parse(n,r.parseComponentValue())}break}},Mm="data-html2canvas-debug",Fm=function(n){var e=n.getAttribute(Mm);switch(e){case"all":return 1;case"clone":return 2;case"parse":return 3;case"render":return 4;default:return 0}},To=function(n,e){var A=Fm(n);return A===1||e===A},Ft=function(){function n(e,A){if(this.context=e,this.textNodes=[],this.elements=[],this.flags=0,To(A,3))debugger;this.styles=new ym(e,window.getComputedStyle(A,null)),Lo(A)&&(this.styles.animationDuration.some(function(t){return t>0})&&(A.style.animationDuration="0s"),this.styles.transform!==null&&(A.style.transform="none")),this.bounds=Ys(this.context,A),To(A,4)&&(this.flags|=16)}return n}(),bm="AAAAAAAAAAAAEA4AGBkAAFAaAAACAAAAAAAIABAAGAAwADgACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAAQABIAEQATAAIABAACAAQAAgAEAAIABAAVABcAAgAEAAIABAACAAQAGAAaABwAHgAgACIAI4AlgAIABAAmwCjAKgAsAC2AL4AvQDFAMoA0gBPAVYBWgEIAAgACACMANoAYgFkAWwBdAF8AX0BhQGNAZUBlgGeAaMBlQGWAasBswF8AbsBwwF0AcsBYwHTAQgA2wG/AOMBdAF8AekB8QF0AfkB+wHiAHQBfAEIAAMC5gQIAAsCEgIIAAgAFgIeAggAIgIpAggAMQI5AkACygEIAAgASAJQAlgCYAIIAAgACAAKBQoFCgUTBRMFGQUrBSsFCAAIAAgACAAIAAgACAAIAAgACABdAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABoAmgCrwGvAQgAbgJ2AggAHgEIAAgACADnAXsCCAAIAAgAgwIIAAgACAAIAAgACACKAggAkQKZAggAPADJAAgAoQKkAqwCsgK6AsICCADJAggA0AIIAAgACAAIANYC3gIIAAgACAAIAAgACABAAOYCCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAkASoB+QIEAAgACAA8AEMCCABCBQgACABJBVAFCAAIAAgACAAIAAgACAAIAAgACABTBVoFCAAIAFoFCABfBWUFCAAIAAgACAAIAAgAbQUIAAgACAAIAAgACABzBXsFfQWFBYoFigWKBZEFigWKBYoFmAWfBaYFrgWxBbkFCAAIAAgACAAIAAgACAAIAAgACAAIAMEFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAMgFCADQBQgACAAIAAgACAAIAAgACAAIAAgACAAIAO4CCAAIAAgAiQAIAAgACABAAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAD0AggACAD8AggACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIANYFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAMDvwAIAAgAJAIIAAgACAAIAAgACAAIAAgACwMTAwgACAB9BOsEGwMjAwgAKwMyAwsFYgE3A/MEPwMIAEUDTQNRAwgAWQOsAGEDCAAIAAgACAAIAAgACABpAzQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFIQUoBSwFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABtAwgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABMAEwACAAIAAgACAAIABgACAAIAAgACAC/AAgACAAyAQgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACAAIAAwAAgACAAIAAgACAAIAAgACAAIAAAARABIAAgACAAIABQASAAIAAgAIABwAEAAjgCIABsAqAC2AL0AigDQAtwC+IJIQqVAZUBWQqVAZUBlQGVAZUBlQGrC5UBlQGVAZUBlQGVAZUBlQGVAXsKlQGVAbAK6wsrDGUMpQzlDJUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAfAKAAuZA64AtwCJALoC6ADwAAgAuACgA/oEpgO6AqsD+AAIAAgAswMIAAgACAAIAIkAuwP5AfsBwwPLAwgACAAIAAgACADRA9kDCAAIAOED6QMIAAgACAAIAAgACADuA/YDCAAIAP4DyQAIAAgABgQIAAgAXQAOBAgACAAIAAgACAAIABMECAAIAAgACAAIAAgACAD8AAQBCAAIAAgAGgQiBCoECAExBAgAEAEIAAgACAAIAAgACAAIAAgACAAIAAgACAA4BAgACABABEYECAAIAAgATAQYAQgAVAQIAAgACAAIAAgACAAIAAgACAAIAFoECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAOQEIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAB+BAcACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAEABhgSMBAgACAAIAAgAlAQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAwAEAAQABAADAAMAAwADAAQABAAEAAQABAAEAAQABHATAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAdQMIAAgACAAIAAgACAAIAMkACAAIAAgAfQMIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACFA4kDCAAIAAgACAAIAOcBCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAIcDCAAIAAgACAAIAAgACAAIAAgACAAIAJEDCAAIAAgACADFAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABgBAgAZgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAbAQCBXIECAAIAHkECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABAAJwEQACjBKoEsgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAC6BMIECAAIAAgACAAIAAgACABmBAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAxwQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAGYECAAIAAgAzgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBd0FXwUIAOIF6gXxBYoF3gT5BQAGCAaKBYoFigWKBYoFigWKBYoFigWKBYoFigXWBIoFigWKBYoFigWKBYoFigWKBYsFEAaKBYoFigWKBYoFigWKBRQGCACKBYoFigWKBQgACAAIANEECAAIABgGigUgBggAJgYIAC4GMwaKBYoF0wQ3Bj4GigWKBYoFigWKBYoFigWKBYoFigWKBYoFigUIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWLBf///////wQABAAEAAQABAAEAAQABAAEAAQAAwAEAAQAAgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAQADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUAAAAFAAUAAAAFAAUAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAQAAAAUABQAFAAUABQAFAAAAAAAFAAUAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAFAAUAAQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAAABwAHAAcAAAAHAAcABwAFAAEAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAcABwAFAAUAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAQABAAAAAAAAAAAAAAAFAAUABQAFAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAHAAcAAAAHAAcAAAAAAAUABQAHAAUAAQAHAAEABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwABAAUABQAFAAUAAAAAAAAAAAAAAAEAAQABAAEAAQABAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABQANAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAABQAHAAUABQAFAAAAAAAAAAcABQAFAAUABQAFAAQABAAEAAQABAAEAAQABAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUAAAAFAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAUAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAcABwAFAAcABwAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUABwAHAAUABQAFAAUAAAAAAAcABwAAAAAABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAAAAAAAAAAABQAFAAAAAAAFAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAFAAUABQAFAAUAAAAFAAUABwAAAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABwAFAAUABQAFAAAAAAAHAAcAAAAAAAcABwAFAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAAAAAAAAAHAAcABwAAAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAUABQAFAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAHAAcABQAHAAcAAAAFAAcABwAAAAcABwAFAAUAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAFAAcABwAFAAUABQAAAAUAAAAHAAcABwAHAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAHAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUAAAAFAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAUAAAAFAAUAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABwAFAAUABQAFAAUABQAAAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABQAFAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAFAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAHAAUABQAFAAUABQAFAAUABwAHAAcABwAHAAcABwAHAAUABwAHAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABwAHAAcABwAFAAUABwAHAAcAAAAAAAAAAAAHAAcABQAHAAcABwAHAAcABwAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAUABQAFAAUABQAFAAUAAAAFAAAABQAAAAAABQAFAAUABQAFAAUABQAFAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAUABQAFAAUABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABwAFAAcABwAHAAcABwAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAUABQAFAAUABwAHAAUABQAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABQAFAAcABwAHAAUABwAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAcABQAFAAUABQAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAAAAAABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAAAAAAAAAFAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAUABQAHAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAFAAUABQAFAAcABwAFAAUABwAHAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAcABwAFAAUABwAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABQAAAAAABQAFAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAcABwAAAAAAAAAAAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAcABwAFAAcABwAAAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAFAAUABQAAAAUABQAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABwAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAHAAcABQAHAAUABQAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAAABwAHAAAAAAAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAFAAUABwAFAAcABwAFAAcABQAFAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAAAAAABwAHAAcABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAFAAcABwAFAAUABQAFAAUABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAUABQAFAAcABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABQAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAAAAAAFAAUABwAHAAcABwAFAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAHAAUABQAFAAUABQAFAAUABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAABQAAAAUABQAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAHAAcAAAAFAAUAAAAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABQAFAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAABQAFAAUABQAFAAUABQAAAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAFAAUABQAFAAUADgAOAA4ADgAOAA4ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAMAAwADAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAAAAAAAAAAAAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAAAAAAAAAAAAsADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwACwAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAADgAOAA4AAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAAAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4AAAAOAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAAAAAAAAAAAA4AAAAOAAAAAAAAAAAADgAOAA4AAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAA=",Yl="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",er=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(var Xr=0;Xr<Yl.length;Xr++)er[Yl.charCodeAt(Xr)]=Xr;var Tm=function(n){var e=n.length*.75,A=n.length,t,i=0,r,s,a,o;n[n.length-1]==="="&&(e--,n[n.length-2]==="="&&e--);var l=typeof ArrayBuffer<"u"&&typeof Uint8Array<"u"&&typeof Uint8Array.prototype.slice<"u"?new ArrayBuffer(e):new Array(e),c=Array.isArray(l)?l:new Uint8Array(l);for(t=0;t<A;t+=4)r=er[n.charCodeAt(t)],s=er[n.charCodeAt(t+1)],a=er[n.charCodeAt(t+2)],o=er[n.charCodeAt(t+3)],c[i++]=r<<2|s>>4,c[i++]=(s&15)<<4|a>>2,c[i++]=(a&3)<<6|o&63;return l},Qm=function(n){for(var e=n.length,A=[],t=0;t<e;t+=2)A.push(n[t+1]<<8|n[t]);return A},Im=function(n){for(var e=n.length,A=[],t=0;t<e;t+=4)A.push(n[t+3]<<24|n[t+2]<<16|n[t+1]<<8|n[t]);return A},Dn=5,$o=6+5,xa=2,Lm=$o-Dn,Ih=65536>>Dn,Rm=1<<Dn,Ua=Rm-1,Dm=1024>>Dn,Hm=Ih+Dm,Pm=Hm,Om=32,Nm=Pm+Om,Gm=65536>>$o,Vm=1<<Lm,Km=Vm-1,Jl=function(n,e,A){return n.slice?n.slice(e,A):new Uint16Array(Array.prototype.slice.call(n,e,A))},km=function(n,e,A){return n.slice?n.slice(e,A):new Uint32Array(Array.prototype.slice.call(n,e,A))},zm=function(n,e){var A=Tm(n),t=Array.isArray(A)?Im(A):new Uint32Array(A),i=Array.isArray(A)?Qm(A):new Uint16Array(A),r=24,s=Jl(i,r/2,t[4]/2),a=t[5]===2?Jl(i,(r+t[4])/2):km(t,Math.ceil((r+t[4])/4));return new Wm(t[0],t[1],t[2],t[3],s,a)},Wm=function(){function n(e,A,t,i,r,s){this.initialValue=e,this.errorValue=A,this.highStart=t,this.highValueIndex=i,this.index=r,this.data=s}return n.prototype.get=function(e){var A;if(e>=0){if(e<55296||e>56319&&e<=65535)return A=this.index[e>>Dn],A=(A<<xa)+(e&Ua),this.data[A];if(e<=65535)return A=this.index[Ih+(e-55296>>Dn)],A=(A<<xa)+(e&Ua),this.data[A];if(e<this.highStart)return A=Nm-Gm+(e>>$o),A=this.index[A],A+=e>>Dn&Km,A=this.index[A],A=(A<<xa)+(e&Ua),this.data[A];if(e<=1114111)return this.data[this.highValueIndex]}return this.errorValue},n}(),ql="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Xm=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(var Yr=0;Yr<ql.length;Yr++)Xm[ql.charCodeAt(Yr)]=Yr;var Ym=1,ya=2,Sa=3,Zl=4,jl=5,Jm=7,$l=8,Ma=9,Fa=10,ec=11,Ac=12,tc=13,nc=14,ba=15,qm=function(n){for(var e=[],A=0,t=n.length;A<t;){var i=n.charCodeAt(A++);if(i>=55296&&i<=56319&&A<t){var r=n.charCodeAt(A++);(r&64512)===56320?e.push(((i&1023)<<10)+(r&1023)+65536):(e.push(i),A--)}else e.push(i)}return e},Zm=function(){for(var n=[],e=0;e<arguments.length;e++)n[e]=arguments[e];if(String.fromCodePoint)return String.fromCodePoint.apply(String,n);var A=n.length;if(!A)return"";for(var t=[],i=-1,r="";++i<A;){var s=n[i];s<=65535?t.push(s):(s-=65536,t.push((s>>10)+55296,s%1024+56320)),(i+1===A||t.length>16384)&&(r+=String.fromCharCode.apply(String,t),t.length=0)}return r},jm=zm(bm),$A="×",Ta="÷",$m=function(n){return jm.get(n)},eB=function(n,e,A){var t=A-2,i=e[t],r=e[A-1],s=e[A];if(r===ya&&s===Sa)return $A;if(r===ya||r===Sa||r===Zl||s===ya||s===Sa||s===Zl)return Ta;if(r===$l&&[$l,Ma,ec,Ac].indexOf(s)!==-1||(r===ec||r===Ma)&&(s===Ma||s===Fa)||(r===Ac||r===Fa)&&s===Fa||s===tc||s===jl||s===Jm||r===Ym)return $A;if(r===tc&&s===nc){for(;i===jl;)i=e[--t];if(i===nc)return $A}if(r===ba&&s===ba){for(var a=0;i===ba;)a++,i=e[--t];if(a%2===0)return $A}return Ta},AB=function(n){var e=qm(n),A=e.length,t=0,i=0,r=e.map($m);return{next:function(){if(t>=A)return{done:!0,value:null};for(var s=$A;t<A&&(s=eB(e,r,++t))===$A;);if(s!==$A||t===A){var a=Zm.apply(null,e.slice(i,t));return i=t,{value:a,done:!1}}return{done:!0,value:null}}}},tB=function(n){for(var e=AB(n),A=[],t;!(t=e.next()).done;)t.value&&A.push(t.value.slice());return A},nB=function(n){var e=123;if(n.createRange){var A=n.createRange();if(A.getBoundingClientRect){var t=n.createElement("boundtest");t.style.height=e+"px",t.style.display="block",n.body.appendChild(t),A.selectNode(t);var i=A.getBoundingClientRect(),r=Math.round(i.height);if(n.body.removeChild(t),r===e)return!0}}return!1},iB=function(n){var e=n.createElement("boundtest");e.style.width="50px",e.style.display="block",e.style.fontSize="12px",e.style.letterSpacing="0px",e.style.wordSpacing="0px",n.body.appendChild(e);var A=n.createRange();e.innerHTML=typeof"".repeat=="function"?"&#128104;".repeat(10):"";var t=e.firstChild,i=Js(t.data).map(function(o){return oA(o)}),r=0,s={},a=i.every(function(o,l){A.setStart(t,r),A.setEnd(t,r+o.length);var c=A.getBoundingClientRect();r+=o.length;var u=c.x>s.x||c.y>s.y;return s=c,l===0?!0:u});return n.body.removeChild(e),a},rB=function(){return typeof new Image().crossOrigin<"u"},sB=function(){return typeof new XMLHttpRequest().responseType=="string"},aB=function(n){var e=new Image,A=n.createElement("canvas"),t=A.getContext("2d");if(!t)return!1;e.src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";try{t.drawImage(e,0,0),A.toDataURL()}catch{return!1}return!0},ic=function(n){return n[0]===0&&n[1]===255&&n[2]===0&&n[3]===255},oB=function(n){var e=n.createElement("canvas"),A=100;e.width=A,e.height=A;var t=e.getContext("2d");if(!t)return Promise.reject(!1);t.fillStyle="rgb(0, 255, 0)",t.fillRect(0,0,A,A);var i=new Image,r=e.toDataURL();i.src=r;var s=Qo(A,A,0,0,i);return t.fillStyle="red",t.fillRect(0,0,A,A),rc(s).then(function(a){t.drawImage(a,0,0);var o=t.getImageData(0,0,A,A).data;t.fillStyle="red",t.fillRect(0,0,A,A);var l=n.createElement("div");return l.style.backgroundImage="url("+r+")",l.style.height=A+"px",ic(o)?rc(Qo(A,A,0,0,l)):Promise.reject(!1)}).then(function(a){return t.drawImage(a,0,0),ic(t.getImageData(0,0,A,A).data)}).catch(function(){return!1})},Qo=function(n,e,A,t,i){var r="http://www.w3.org/2000/svg",s=document.createElementNS(r,"svg"),a=document.createElementNS(r,"foreignObject");return s.setAttributeNS(null,"width",n.toString()),s.setAttributeNS(null,"height",e.toString()),a.setAttributeNS(null,"width","100%"),a.setAttributeNS(null,"height","100%"),a.setAttributeNS(null,"x",A.toString()),a.setAttributeNS(null,"y",t.toString()),a.setAttributeNS(null,"externalResourcesRequired","true"),s.appendChild(a),a.appendChild(i),s},rc=function(n){return new Promise(function(e,A){var t=new Image;t.onload=function(){return e(t)},t.onerror=A,t.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(new XMLSerializer().serializeToString(n))})},UA={get SUPPORT_RANGE_BOUNDS(){var n=nB(document);return Object.defineProperty(UA,"SUPPORT_RANGE_BOUNDS",{value:n}),n},get SUPPORT_WORD_BREAKING(){var n=UA.SUPPORT_RANGE_BOUNDS&&iB(document);return Object.defineProperty(UA,"SUPPORT_WORD_BREAKING",{value:n}),n},get SUPPORT_SVG_DRAWING(){var n=aB(document);return Object.defineProperty(UA,"SUPPORT_SVG_DRAWING",{value:n}),n},get SUPPORT_FOREIGNOBJECT_DRAWING(){var n=typeof Array.from=="function"&&typeof window.fetch=="function"?oB(document):Promise.resolve(!1);return Object.defineProperty(UA,"SUPPORT_FOREIGNOBJECT_DRAWING",{value:n}),n},get SUPPORT_CORS_IMAGES(){var n=rB();return Object.defineProperty(UA,"SUPPORT_CORS_IMAGES",{value:n}),n},get SUPPORT_RESPONSE_TYPE(){var n=sB();return Object.defineProperty(UA,"SUPPORT_RESPONSE_TYPE",{value:n}),n},get SUPPORT_CORS_XHR(){var n="withCredentials"in new XMLHttpRequest;return Object.defineProperty(UA,"SUPPORT_CORS_XHR",{value:n}),n},get SUPPORT_NATIVE_TEXT_SEGMENTATION(){var n=!!(typeof Intl<"u"&&Intl.Segmenter);return Object.defineProperty(UA,"SUPPORT_NATIVE_TEXT_SEGMENTATION",{value:n}),n}},ar=function(){function n(e,A){this.text=e,this.bounds=A}return n}(),lB=function(n,e,A,t){var i=hB(e,A),r=[],s=0;return i.forEach(function(a){if(A.textDecorationLine.length||a.trim().length>0)if(UA.SUPPORT_RANGE_BOUNDS){var o=sc(t,s,a.length).getClientRects();if(o.length>1){var l=el(a),c=0;l.forEach(function(h){r.push(new ar(h,zt.fromDOMRectList(n,sc(t,c+s,h.length).getClientRects()))),c+=h.length})}else r.push(new ar(a,zt.fromDOMRectList(n,o)))}else{var u=t.splitText(a.length);r.push(new ar(a,cB(n,t))),t=u}else UA.SUPPORT_RANGE_BOUNDS||(t=t.splitText(a.length));s+=a.length}),r},cB=function(n,e){var A=e.ownerDocument;if(A){var t=A.createElement("html2canvaswrapper");t.appendChild(e.cloneNode(!0));var i=e.parentNode;if(i){i.replaceChild(t,e);var r=Ys(n,t);return t.firstChild&&i.replaceChild(t.firstChild,t),r}}return zt.EMPTY},sc=function(n,e,A){var t=n.ownerDocument;if(!t)throw new Error("Node has no owner document");var i=t.createRange();return i.setStart(n,e),i.setEnd(n,e+A),i},el=function(n){if(UA.SUPPORT_NATIVE_TEXT_SEGMENTATION){var e=new Intl.Segmenter(void 0,{granularity:"grapheme"});return Array.from(e.segment(n)).map(function(A){return A.segment})}return tB(n)},uB=function(n,e){if(UA.SUPPORT_NATIVE_TEXT_SEGMENTATION){var A=new Intl.Segmenter(void 0,{granularity:"word"});return Array.from(A.segment(n)).map(function(t){return t.segment})}return dB(n,e)},hB=function(n,e){return e.letterSpacing!==0?el(n):uB(n,e)},fB=[32,160,4961,65792,65793,4153,4241],dB=function(n,e){for(var A=Gd(n,{lineBreak:e.lineBreak,wordBreak:e.overflowWrap==="break-word"?"break-word":e.wordBreak}),t=[],i,r=function(){if(i.value){var s=i.value.slice(),a=Js(s),o="";a.forEach(function(l){fB.indexOf(l)===-1?o+=oA(l):(o.length&&t.push(o),t.push(oA(l)),o="")}),o.length&&t.push(o)}};!(i=A.next()).done;)r();return t},pB=function(){function n(e,A,t){this.text=gB(A.data,t.textTransform),this.textBounds=lB(e,this.text,t,A)}return n}(),gB=function(n,e){switch(e){case 1:return n.toLowerCase();case 3:return n.replace(mB,BB);case 2:return n.toUpperCase();default:return n}},mB=/(^|\s|:|-|\(|\))([a-z])/g,BB=function(n,e,A){return n.length>0?e+A.toUpperCase():n},Lh=function(n){gt(e,n);function e(A,t){var i=n.call(this,A,t)||this;return i.src=t.currentSrc||t.src,i.intrinsicWidth=t.naturalWidth,i.intrinsicHeight=t.naturalHeight,i.context.cache.addImage(i.src),i}return e}(Ft),Rh=function(n){gt(e,n);function e(A,t){var i=n.call(this,A,t)||this;return i.canvas=t,i.intrinsicWidth=t.width,i.intrinsicHeight=t.height,i}return e}(Ft),Dh=function(n){gt(e,n);function e(A,t){var i=n.call(this,A,t)||this,r=new XMLSerializer,s=Ys(A,t);return t.setAttribute("width",s.width+"px"),t.setAttribute("height",s.height+"px"),i.svg="data:image/svg+xml,"+encodeURIComponent(r.serializeToString(t)),i.intrinsicWidth=t.width.baseVal.value,i.intrinsicHeight=t.height.baseVal.value,i.context.cache.addImage(i.svg),i}return e}(Ft),Hh=function(n){gt(e,n);function e(A,t){var i=n.call(this,A,t)||this;return i.value=t.value,i}return e}(Ft),Io=function(n){gt(e,n);function e(A,t){var i=n.call(this,A,t)||this;return i.start=t.start,i.reversed=typeof t.reversed=="boolean"&&t.reversed===!0,i}return e}(Ft),_B=[{type:15,flags:0,unit:"px",number:3}],wB=[{type:16,flags:0,number:50}],vB=function(n){return n.width>n.height?new zt(n.left+(n.width-n.height)/2,n.top,n.height,n.height):n.width<n.height?new zt(n.left,n.top+(n.height-n.width)/2,n.width,n.width):n},EB=function(n){var e=n.type===CB?new Array(n.value.length+1).join("•"):n.value;return e.length===0?n.placeholder||"":e},bs="checkbox",Ts="radio",CB="password",ac=707406591,Al=function(n){gt(e,n);function e(A,t){var i=n.call(this,A,t)||this;switch(i.type=t.type.toLowerCase(),i.checked=t.checked,i.value=EB(t),(i.type===bs||i.type===Ts)&&(i.styles.backgroundColor=3739148031,i.styles.borderTopColor=i.styles.borderRightColor=i.styles.borderBottomColor=i.styles.borderLeftColor=2779096575,i.styles.borderTopWidth=i.styles.borderRightWidth=i.styles.borderBottomWidth=i.styles.borderLeftWidth=1,i.styles.borderTopStyle=i.styles.borderRightStyle=i.styles.borderBottomStyle=i.styles.borderLeftStyle=1,i.styles.backgroundClip=[0],i.styles.backgroundOrigin=[0],i.bounds=vB(i.bounds)),i.type){case bs:i.styles.borderTopRightRadius=i.styles.borderTopLeftRadius=i.styles.borderBottomRightRadius=i.styles.borderBottomLeftRadius=_B;break;case Ts:i.styles.borderTopRightRadius=i.styles.borderTopLeftRadius=i.styles.borderBottomRightRadius=i.styles.borderBottomLeftRadius=wB;break}return i}return e}(Ft),Ph=function(n){gt(e,n);function e(A,t){var i=n.call(this,A,t)||this,r=t.options[t.selectedIndex||0];return i.value=r&&r.text||"",i}return e}(Ft),Oh=function(n){gt(e,n);function e(A,t){var i=n.call(this,A,t)||this;return i.value=t.value,i}return e}(Ft),Nh=function(n){gt(e,n);function e(A,t){var i=n.call(this,A,t)||this;i.src=t.src,i.width=parseInt(t.width,10)||0,i.height=parseInt(t.height,10)||0,i.backgroundColor=i.styles.backgroundColor;try{if(t.contentWindow&&t.contentWindow.document&&t.contentWindow.document.documentElement){i.tree=Vh(A,t.contentWindow.document.documentElement);var r=t.contentWindow.document.documentElement?rr(A,getComputedStyle(t.contentWindow.document.documentElement).backgroundColor):kt.TRANSPARENT,s=t.contentWindow.document.body?rr(A,getComputedStyle(t.contentWindow.document.body).backgroundColor):kt.TRANSPARENT;i.backgroundColor=ln(r)?ln(s)?i.styles.backgroundColor:s:r}}catch{}return i}return e}(Ft),xB=["OL","UL","MENU"],xs=function(n,e,A,t){for(var i=e.firstChild,r=void 0;i;i=r)if(r=i.nextSibling,Kh(i)&&i.data.trim().length>0)A.textNodes.push(new pB(n,i,A.styles));else if(Bi(i))if(Xh(i)&&i.assignedNodes)i.assignedNodes().forEach(function(a){return xs(n,a,A,t)});else{var s=Gh(n,i);s.styles.isVisible()&&(UB(i,s,t)?s.flags|=4:yB(s.styles)&&(s.flags|=2),xB.indexOf(i.tagName)!==-1&&(s.flags|=8),A.elements.push(s),i.slot,i.shadowRoot?xs(n,i.shadowRoot,s,t):!Qs(i)&&!kh(i)&&!Is(i)&&xs(n,i,s,t))}},Gh=function(n,e){return Ro(e)?new Lh(n,e):zh(e)?new Rh(n,e):kh(e)?new Dh(n,e):SB(e)?new Hh(n,e):MB(e)?new Io(n,e):FB(e)?new Al(n,e):Is(e)?new Ph(n,e):Qs(e)?new Oh(n,e):Wh(e)?new Nh(n,e):new Ft(n,e)},Vh=function(n,e){var A=Gh(n,e);return A.flags|=4,xs(n,e,A,A),A},UB=function(n,e,A){return e.styles.isPositionedWithZIndex()||e.styles.opacity<1||e.styles.isTransformed()||tl(n)&&A.styles.isTransparent()},yB=function(n){return n.isPositioned()||n.isFloating()},Kh=function(n){return n.nodeType===Node.TEXT_NODE},Bi=function(n){return n.nodeType===Node.ELEMENT_NODE},Lo=function(n){return Bi(n)&&typeof n.style<"u"&&!Us(n)},Us=function(n){return typeof n.className=="object"},SB=function(n){return n.tagName==="LI"},MB=function(n){return n.tagName==="OL"},FB=function(n){return n.tagName==="INPUT"},bB=function(n){return n.tagName==="HTML"},kh=function(n){return n.tagName==="svg"},tl=function(n){return n.tagName==="BODY"},zh=function(n){return n.tagName==="CANVAS"},oc=function(n){return n.tagName==="VIDEO"},Ro=function(n){return n.tagName==="IMG"},Wh=function(n){return n.tagName==="IFRAME"},lc=function(n){return n.tagName==="STYLE"},TB=function(n){return n.tagName==="SCRIPT"},Qs=function(n){return n.tagName==="TEXTAREA"},Is=function(n){return n.tagName==="SELECT"},Xh=function(n){return n.tagName==="SLOT"},cc=function(n){return n.tagName.indexOf("-")>0},QB=function(){function n(){this.counters={}}return n.prototype.getCounterValue=function(e){var A=this.counters[e];return A&&A.length?A[A.length-1]:1},n.prototype.getCounterValues=function(e){var A=this.counters[e];return A||[]},n.prototype.pop=function(e){var A=this;e.forEach(function(t){return A.counters[t].pop()})},n.prototype.parse=function(e){var A=this,t=e.counterIncrement,i=e.counterReset,r=!0;t!==null&&t.forEach(function(a){var o=A.counters[a.counter];o&&a.increment!==0&&(r=!1,o.length||o.push(1),o[Math.max(0,o.length-1)]+=a.increment)});var s=[];return r&&i.forEach(function(a){var o=A.counters[a.counter];s.push(a.counter),o||(o=A.counters[a.counter]=[]),o.push(a.reset)}),s},n}(),uc={integers:[1e3,900,500,400,100,90,50,40,10,9,5,4,1],values:["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"]},hc={integers:[9e3,8e3,7e3,6e3,5e3,4e3,3e3,2e3,1e3,900,800,700,600,500,400,300,200,100,90,80,70,60,50,40,30,20,10,9,8,7,6,5,4,3,2,1],values:["Ք","Փ","Ւ","Ց","Ր","Տ","Վ","Ս","Ռ","Ջ","Պ","Չ","Ո","Շ","Ն","Յ","Մ","Ճ","Ղ","Ձ","Հ","Կ","Ծ","Խ","Լ","Ի","Ժ","Թ","Ը","Է","Զ","Ե","Դ","Գ","Բ","Ա"]},IB={integers:[1e4,9e3,8e3,7e3,6e3,5e3,4e3,3e3,2e3,1e3,400,300,200,100,90,80,70,60,50,40,30,20,19,18,17,16,15,10,9,8,7,6,5,4,3,2,1],values:["י׳","ט׳","ח׳","ז׳","ו׳","ה׳","ד׳","ג׳","ב׳","א׳","ת","ש","ר","ק","צ","פ","ע","ס","נ","מ","ל","כ","יט","יח","יז","טז","טו","י","ט","ח","ז","ו","ה","ד","ג","ב","א"]},LB={integers:[1e4,9e3,8e3,7e3,6e3,5e3,4e3,3e3,2e3,1e3,900,800,700,600,500,400,300,200,100,90,80,70,60,50,40,30,20,10,9,8,7,6,5,4,3,2,1],values:["ჵ","ჰ","ჯ","ჴ","ხ","ჭ","წ","ძ","ც","ჩ","შ","ყ","ღ","ქ","ფ","ჳ","ტ","ს","რ","ჟ","პ","ო","ჲ","ნ","მ","ლ","კ","ი","თ","ჱ","ზ","ვ","ე","დ","გ","ბ","ა"]},Wn=function(n,e,A,t,i,r){return n<e||n>A?gr(n,i,r.length>0):t.integers.reduce(function(s,a,o){for(;n>=a;)n-=a,s+=t.values[o];return s},"")+r},Yh=function(n,e,A,t){var i="";do A||n--,i=t(n)+i,n/=e;while(n*e>=e);return i},aA=function(n,e,A,t,i){var r=A-e+1;return(n<0?"-":"")+(Yh(Math.abs(n),r,t,function(s){return oA(Math.floor(s%r)+e)})+i)},_n=function(n,e,A){A===void 0&&(A=". ");var t=e.length;return Yh(Math.abs(n),t,!1,function(i){return e[Math.floor(i%t)]})+A},di=1,jt=2,$t=4,Ar=8,It=function(n,e,A,t,i,r){if(n<-9999||n>9999)return gr(n,4,i.length>0);var s=Math.abs(n),a=i;if(s===0)return e[0]+a;for(var o=0;s>0&&o<=4;o++){var l=s%10;l===0&&mA(r,di)&&a!==""?a=e[l]+a:l>1||l===1&&o===0||l===1&&o===1&&mA(r,jt)||l===1&&o===1&&mA(r,$t)&&n>100||l===1&&o>1&&mA(r,Ar)?a=e[l]+(o>0?A[o-1]:"")+a:l===1&&o>0&&(a=A[o-1]+a),s=Math.floor(s/10)}return(n<0?t:"")+a},fc="十百千萬",dc="拾佰仟萬",pc="マイナス",Qa="마이너스",gr=function(n,e,A){var t=A?". ":"",i=A?"、":"",r=A?", ":"",s=A?" ":"";switch(e){case 0:return"•"+s;case 1:return"◦"+s;case 2:return"◾"+s;case 5:var a=aA(n,48,57,!0,t);return a.length<4?"0"+a:a;case 4:return _n(n,"〇一二三四五六七八九",i);case 6:return Wn(n,1,3999,uc,3,t).toLowerCase();case 7:return Wn(n,1,3999,uc,3,t);case 8:return aA(n,945,969,!1,t);case 9:return aA(n,97,122,!1,t);case 10:return aA(n,65,90,!1,t);case 11:return aA(n,1632,1641,!0,t);case 12:case 49:return Wn(n,1,9999,hc,3,t);case 35:return Wn(n,1,9999,hc,3,t).toLowerCase();case 13:return aA(n,2534,2543,!0,t);case 14:case 30:return aA(n,6112,6121,!0,t);case 15:return _n(n,"子丑寅卯辰巳午未申酉戌亥",i);case 16:return _n(n,"甲乙丙丁戊己庚辛壬癸",i);case 17:case 48:return It(n,"零一二三四五六七八九",fc,"負",i,jt|$t|Ar);case 47:return It(n,"零壹貳參肆伍陸柒捌玖",dc,"負",i,di|jt|$t|Ar);case 42:return It(n,"零一二三四五六七八九",fc,"负",i,jt|$t|Ar);case 41:return It(n,"零壹贰叁肆伍陆柒捌玖",dc,"负",i,di|jt|$t|Ar);case 26:return It(n,"〇一二三四五六七八九","十百千万",pc,i,0);case 25:return It(n,"零壱弐参四伍六七八九","拾百千万",pc,i,di|jt|$t);case 31:return It(n,"영일이삼사오육칠팔구","십백천만",Qa,r,di|jt|$t);case 33:return It(n,"零一二三四五六七八九","十百千萬",Qa,r,0);case 32:return It(n,"零壹貳參四五六七八九","拾百千",Qa,r,di|jt|$t);case 18:return aA(n,2406,2415,!0,t);case 20:return Wn(n,1,19999,LB,3,t);case 21:return aA(n,2790,2799,!0,t);case 22:return aA(n,2662,2671,!0,t);case 22:return Wn(n,1,10999,IB,3,t);case 23:return _n(n,"あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわゐゑをん");case 24:return _n(n,"いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせす");case 27:return aA(n,3302,3311,!0,t);case 28:return _n(n,"アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン",i);case 29:return _n(n,"イロハニホヘトチリヌルヲワカヨタレソツネナラムウヰノオクヤマケフコエテアサキユメミシヱヒモセス",i);case 34:return aA(n,3792,3801,!0,t);case 37:return aA(n,6160,6169,!0,t);case 38:return aA(n,4160,4169,!0,t);case 39:return aA(n,2918,2927,!0,t);case 40:return aA(n,1776,1785,!0,t);case 43:return aA(n,3046,3055,!0,t);case 44:return aA(n,3174,3183,!0,t);case 45:return aA(n,3664,3673,!0,t);case 46:return aA(n,3872,3881,!0,t);case 3:default:return aA(n,48,57,!0,t)}},Jh="data-html2canvas-ignore",gc=function(){function n(e,A,t){if(this.context=e,this.options=t,this.scrolledElements=[],this.referenceElement=A,this.counters=new QB,this.quoteDepth=0,!A.ownerDocument)throw new Error("Cloned element does not have an owner document");this.documentElement=this.cloneNode(A.ownerDocument.documentElement,!1)}return n.prototype.toIFrame=function(e,A){var t=this,i=RB(e,A);if(!i.contentWindow)return Promise.reject("Unable to find iframe window");var r=e.defaultView.pageXOffset,s=e.defaultView.pageYOffset,a=i.contentWindow,o=a.document,l=PB(i).then(function(){return NA(t,void 0,void 0,function(){var c,u;return QA(this,function(h){switch(h.label){case 0:return this.scrolledElements.forEach(VB),a&&(a.scrollTo(A.left,A.top),/(iPad|iPhone|iPod)/g.test(navigator.userAgent)&&(a.scrollY!==A.top||a.scrollX!==A.left)&&(this.context.logger.warn("Unable to restore scroll position for cloned document"),this.context.windowBounds=this.context.windowBounds.add(a.scrollX-A.left,a.scrollY-A.top,0,0))),c=this.options.onclone,u=this.clonedReferenceElement,typeof u>"u"?[2,Promise.reject("Error finding the "+this.referenceElement.nodeName+" in the cloned document")]:o.fonts&&o.fonts.ready?[4,o.fonts.ready]:[3,2];case 1:h.sent(),h.label=2;case 2:return/(AppleWebKit)/g.test(navigator.userAgent)?[4,HB(o)]:[3,4];case 3:h.sent(),h.label=4;case 4:return typeof c=="function"?[2,Promise.resolve().then(function(){return c(o,u)}).then(function(){return i})]:[2,i]}})})});return o.open(),o.write(NB(document.doctype)+"<html></html>"),GB(this.referenceElement.ownerDocument,r,s),o.replaceChild(o.adoptNode(this.documentElement),o.documentElement),o.close(),l},n.prototype.createElementClone=function(e){if(To(e,2))debugger;if(zh(e))return this.createCanvasClone(e);if(oc(e))return this.createVideoClone(e);if(lc(e))return this.createStyleClone(e);var A=e.cloneNode(!1);return Ro(A)&&(Ro(e)&&e.currentSrc&&e.currentSrc!==e.src&&(A.src=e.currentSrc,A.srcset=""),A.loading==="lazy"&&(A.loading="eager")),cc(A)?this.createCustomElementClone(A):A},n.prototype.createCustomElementClone=function(e){var A=document.createElement("html2canvascustomelement");return Ia(e.style,A),A},n.prototype.createStyleClone=function(e){try{var A=e.sheet;if(A&&A.cssRules){var t=[].slice.call(A.cssRules,0).reduce(function(r,s){return s&&typeof s.cssText=="string"?r+s.cssText:r},""),i=e.cloneNode(!1);return i.textContent=t,i}}catch(r){if(this.context.logger.error("Unable to access cssRules property",r),r.name!=="SecurityError")throw r}return e.cloneNode(!1)},n.prototype.createCanvasClone=function(e){var A;if(this.options.inlineImages&&e.ownerDocument){var t=e.ownerDocument.createElement("img");try{return t.src=e.toDataURL(),t}catch{this.context.logger.info("Unable to inline canvas contents, canvas is tainted",e)}}var i=e.cloneNode(!1);try{i.width=e.width,i.height=e.height;var r=e.getContext("2d"),s=i.getContext("2d");if(s)if(!this.options.allowTaint&&r)s.putImageData(r.getImageData(0,0,e.width,e.height),0,0);else{var a=(A=e.getContext("webgl2"))!==null&&A!==void 0?A:e.getContext("webgl");if(a){var o=a.getContextAttributes();(o==null?void 0:o.preserveDrawingBuffer)===!1&&this.context.logger.warn("Unable to clone WebGL context as it has preserveDrawingBuffer=false",e)}s.drawImage(e,0,0)}return i}catch{this.context.logger.info("Unable to clone canvas as it is tainted",e)}return i},n.prototype.createVideoClone=function(e){var A=e.ownerDocument.createElement("canvas");A.width=e.offsetWidth,A.height=e.offsetHeight;var t=A.getContext("2d");try{return t&&(t.drawImage(e,0,0,A.width,A.height),this.options.allowTaint||t.getImageData(0,0,A.width,A.height)),A}catch{this.context.logger.info("Unable to clone video as it is tainted",e)}var i=e.ownerDocument.createElement("canvas");return i.width=e.offsetWidth,i.height=e.offsetHeight,i},n.prototype.appendChildNode=function(e,A,t){(!Bi(A)||!TB(A)&&!A.hasAttribute(Jh)&&(typeof this.options.ignoreElements!="function"||!this.options.ignoreElements(A)))&&(!this.options.copyStyles||!Bi(A)||!lc(A))&&e.appendChild(this.cloneNode(A,t))},n.prototype.cloneChildNodes=function(e,A,t){for(var i=this,r=e.shadowRoot?e.shadowRoot.firstChild:e.firstChild;r;r=r.nextSibling)if(Bi(r)&&Xh(r)&&typeof r.assignedNodes=="function"){var s=r.assignedNodes();s.length&&s.forEach(function(a){return i.appendChildNode(A,a,t)})}else this.appendChildNode(A,r,t)},n.prototype.cloneNode=function(e,A){if(Kh(e))return document.createTextNode(e.data);if(!e.ownerDocument)return e.cloneNode(!1);var t=e.ownerDocument.defaultView;if(t&&Bi(e)&&(Lo(e)||Us(e))){var i=this.createElementClone(e);i.style.transitionProperty="none";var r=t.getComputedStyle(e),s=t.getComputedStyle(e,":before"),a=t.getComputedStyle(e,":after");this.referenceElement===e&&Lo(i)&&(this.clonedReferenceElement=i),tl(i)&&zB(i);var o=this.counters.parse(new Xl(this.context,r)),l=this.resolvePseudoContent(e,i,s,or.BEFORE);cc(e)&&(A=!0),oc(e)||this.cloneChildNodes(e,i,A),l&&i.insertBefore(l,i.firstChild);var c=this.resolvePseudoContent(e,i,a,or.AFTER);return c&&i.appendChild(c),this.counters.pop(o),(r&&(this.options.copyStyles||Us(e))&&!Wh(e)||A)&&Ia(r,i),(e.scrollTop!==0||e.scrollLeft!==0)&&this.scrolledElements.push([i,e.scrollLeft,e.scrollTop]),(Qs(e)||Is(e))&&(Qs(i)||Is(i))&&(i.value=e.value),i}return e.cloneNode(!1)},n.prototype.resolvePseudoContent=function(e,A,t,i){var r=this;if(t){var s=t.content,a=A.ownerDocument;if(!(!a||!s||s==="none"||s==="-moz-alt-content"||t.display==="none")){this.counters.parse(new Xl(this.context,t));var o=new Sm(this.context,t),l=a.createElement("html2canvaspseudoelement");Ia(t,l),o.content.forEach(function(u){if(u.type===0)l.appendChild(a.createTextNode(u.value));else if(u.type===22){var h=a.createElement("img");h.src=u.value,h.style.opacity="1",l.appendChild(h)}else if(u.type===18){if(u.name==="attr"){var p=u.values.filter($e);p.length&&l.appendChild(a.createTextNode(e.getAttribute(p[0].value)||""))}else if(u.name==="counter"){var g=u.values.filter(Qi),m=g[0],d=g[1];if(m&&$e(m)){var f=r.counters.getCounterValue(m.value),v=d&&$e(d)?bo.parse(r.context,d.value):3;l.appendChild(a.createTextNode(gr(f,v,!1)))}}else if(u.name==="counters"){var w=u.values.filter(Qi),m=w[0],E=w[1],d=w[2];if(m&&$e(m)){var x=r.counters.getCounterValues(m.value),U=d&&$e(d)?bo.parse(r.context,d.value):3,y=E&&E.type===0?E.value:"",R=x.map(function(z){return gr(z,U,!1)}).join(y);l.appendChild(a.createTextNode(R))}}}else if(u.type===20)switch(u.value){case"open-quote":l.appendChild(a.createTextNode(Wl(o.quotes,r.quoteDepth++,!0)));break;case"close-quote":l.appendChild(a.createTextNode(Wl(o.quotes,--r.quoteDepth,!1)));break;default:l.appendChild(a.createTextNode(u.value))}}),l.className=Do+" "+Ho;var c=i===or.BEFORE?" "+Do:" "+Ho;return Us(A)?A.className.baseValue+=c:A.className+=c,l}}},n.destroy=function(e){return e.parentNode?(e.parentNode.removeChild(e),!0):!1},n}(),or;(function(n){n[n.BEFORE=0]="BEFORE",n[n.AFTER=1]="AFTER"})(or||(or={}));var RB=function(n,e){var A=n.createElement("iframe");return A.className="html2canvas-container",A.style.visibility="hidden",A.style.position="fixed",A.style.left="-10000px",A.style.top="0px",A.style.border="0",A.width=e.width.toString(),A.height=e.height.toString(),A.scrolling="no",A.setAttribute(Jh,"true"),n.body.appendChild(A),A},DB=function(n){return new Promise(function(e){if(n.complete){e();return}if(!n.src){e();return}n.onload=e,n.onerror=e})},HB=function(n){return Promise.all([].slice.call(n.images,0).map(DB))},PB=function(n){return new Promise(function(e,A){var t=n.contentWindow;if(!t)return A("No window assigned for iframe");var i=t.document;t.onload=n.onload=function(){t.onload=n.onload=null;var r=setInterval(function(){i.body.childNodes.length>0&&i.readyState==="complete"&&(clearInterval(r),e(n))},50)}})},OB=["all","d","content"],Ia=function(n,e){for(var A=n.length-1;A>=0;A--){var t=n.item(A);OB.indexOf(t)===-1&&e.style.setProperty(t,n.getPropertyValue(t))}return e},NB=function(n){var e="";return n&&(e+="<!DOCTYPE ",n.name&&(e+=n.name),n.internalSubset&&(e+=n.internalSubset),n.publicId&&(e+='"'+n.publicId+'"'),n.systemId&&(e+='"'+n.systemId+'"'),e+=">"),e},GB=function(n,e,A){n&&n.defaultView&&(e!==n.defaultView.pageXOffset||A!==n.defaultView.pageYOffset)&&n.defaultView.scrollTo(e,A)},VB=function(n){var e=n[0],A=n[1],t=n[2];e.scrollLeft=A,e.scrollTop=t},KB=":before",kB=":after",Do="___html2canvas___pseudoelement_before",Ho="___html2canvas___pseudoelement_after",mc=`{
    content: "" !important;
    display: none !important;
}`,zB=function(n){WB(n,"."+Do+KB+mc+`
         .`+Ho+kB+mc)},WB=function(n,e){var A=n.ownerDocument;if(A){var t=A.createElement("style");t.textContent=e,n.appendChild(t)}},qh=function(){function n(){}return n.getOrigin=function(e){var A=n._link;return A?(A.href=e,A.href=A.href,A.protocol+A.hostname+A.port):"about:blank"},n.isSameOrigin=function(e){return n.getOrigin(e)===n._origin},n.setContext=function(e){n._link=e.document.createElement("a"),n._origin=n.getOrigin(e.location.href)},n._origin="about:blank",n}(),XB=function(){function n(e,A){this.context=e,this._options=A,this._cache={}}return n.prototype.addImage=function(e){var A=Promise.resolve();return this.has(e)||(Ra(e)||ZB(e))&&(this._cache[e]=this.loadImage(e)).catch(function(){}),A},n.prototype.match=function(e){return this._cache[e]},n.prototype.loadImage=function(e){return NA(this,void 0,void 0,function(){var A,t,i,r,s=this;return QA(this,function(a){switch(a.label){case 0:return A=qh.isSameOrigin(e),t=!La(e)&&this._options.useCORS===!0&&UA.SUPPORT_CORS_IMAGES&&!A,i=!La(e)&&!A&&!Ra(e)&&typeof this._options.proxy=="string"&&UA.SUPPORT_CORS_XHR&&!t,!A&&this._options.allowTaint===!1&&!La(e)&&!Ra(e)&&!i&&!t?[2]:(r=e,i?[4,this.proxy(r)]:[3,2]);case 1:r=a.sent(),a.label=2;case 2:return this.context.logger.debug("Added image "+e.substring(0,256)),[4,new Promise(function(o,l){var c=new Image;c.onload=function(){return o(c)},c.onerror=l,(jB(r)||t)&&(c.crossOrigin="anonymous"),c.src=r,c.complete===!0&&setTimeout(function(){return o(c)},500),s._options.imageTimeout>0&&setTimeout(function(){return l("Timed out ("+s._options.imageTimeout+"ms) loading image")},s._options.imageTimeout)})];case 3:return[2,a.sent()]}})})},n.prototype.has=function(e){return typeof this._cache[e]<"u"},n.prototype.keys=function(){return Promise.resolve(Object.keys(this._cache))},n.prototype.proxy=function(e){var A=this,t=this._options.proxy;if(!t)throw new Error("No proxy defined");var i=e.substring(0,256);return new Promise(function(r,s){var a=UA.SUPPORT_RESPONSE_TYPE?"blob":"text",o=new XMLHttpRequest;o.onload=function(){if(o.status===200)if(a==="text")r(o.response);else{var u=new FileReader;u.addEventListener("load",function(){return r(u.result)},!1),u.addEventListener("error",function(h){return s(h)},!1),u.readAsDataURL(o.response)}else s("Failed to proxy resource "+i+" with status code "+o.status)},o.onerror=s;var l=t.indexOf("?")>-1?"&":"?";if(o.open("GET",""+t+l+"url="+encodeURIComponent(e)+"&responseType="+a),a!=="text"&&o instanceof XMLHttpRequest&&(o.responseType=a),A._options.imageTimeout){var c=A._options.imageTimeout;o.timeout=c,o.ontimeout=function(){return s("Timed out ("+c+"ms) proxying "+i)}}o.send()})},n}(),YB=/^data:image\/svg\+xml/i,JB=/^data:image\/.*;base64,/i,qB=/^data:image\/.*/i,ZB=function(n){return UA.SUPPORT_SVG_DRAWING||!$B(n)},La=function(n){return qB.test(n)},jB=function(n){return JB.test(n)},Ra=function(n){return n.substr(0,4)==="blob"},$B=function(n){return n.substr(-3).toLowerCase()==="svg"||YB.test(n)},pe=function(){function n(e,A){this.type=0,this.x=e,this.y=A}return n.prototype.add=function(e,A){return new n(this.x+e,this.y+A)},n}(),Xn=function(n,e,A){return new pe(n.x+(e.x-n.x)*A,n.y+(e.y-n.y)*A)},Jr=function(){function n(e,A,t,i){this.type=1,this.start=e,this.startControl=A,this.endControl=t,this.end=i}return n.prototype.subdivide=function(e,A){var t=Xn(this.start,this.startControl,e),i=Xn(this.startControl,this.endControl,e),r=Xn(this.endControl,this.end,e),s=Xn(t,i,e),a=Xn(i,r,e),o=Xn(s,a,e);return A?new n(this.start,t,s,o):new n(o,a,r,this.end)},n.prototype.add=function(e,A){return new n(this.start.add(e,A),this.startControl.add(e,A),this.endControl.add(e,A),this.end.add(e,A))},n.prototype.reverse=function(){return new n(this.end,this.endControl,this.startControl,this.start)},n}(),At=function(n){return n.type===1},e0=function(){function n(e){var A=e.styles,t=e.bounds,i=$i(A.borderTopLeftRadius,t.width,t.height),r=i[0],s=i[1],a=$i(A.borderTopRightRadius,t.width,t.height),o=a[0],l=a[1],c=$i(A.borderBottomRightRadius,t.width,t.height),u=c[0],h=c[1],p=$i(A.borderBottomLeftRadius,t.width,t.height),g=p[0],m=p[1],d=[];d.push((r+o)/t.width),d.push((g+u)/t.width),d.push((s+m)/t.height),d.push((l+h)/t.height);var f=Math.max.apply(Math,d);f>1&&(r/=f,s/=f,o/=f,l/=f,u/=f,h/=f,g/=f,m/=f);var v=t.width-o,w=t.height-h,E=t.width-u,x=t.height-m,U=A.borderTopWidth,y=A.borderRightWidth,R=A.borderBottomWidth,B=A.borderLeftWidth,M=eA(A.paddingTop,e.bounds.width),z=eA(A.paddingRight,e.bounds.width),Y=eA(A.paddingBottom,e.bounds.width),W=eA(A.paddingLeft,e.bounds.width);this.topLeftBorderDoubleOuterBox=r>0||s>0?iA(t.left+B/3,t.top+U/3,r-B/3,s-U/3,qe.TOP_LEFT):new pe(t.left+B/3,t.top+U/3),this.topRightBorderDoubleOuterBox=r>0||s>0?iA(t.left+v,t.top+U/3,o-y/3,l-U/3,qe.TOP_RIGHT):new pe(t.left+t.width-y/3,t.top+U/3),this.bottomRightBorderDoubleOuterBox=u>0||h>0?iA(t.left+E,t.top+w,u-y/3,h-R/3,qe.BOTTOM_RIGHT):new pe(t.left+t.width-y/3,t.top+t.height-R/3),this.bottomLeftBorderDoubleOuterBox=g>0||m>0?iA(t.left+B/3,t.top+x,g-B/3,m-R/3,qe.BOTTOM_LEFT):new pe(t.left+B/3,t.top+t.height-R/3),this.topLeftBorderDoubleInnerBox=r>0||s>0?iA(t.left+B*2/3,t.top+U*2/3,r-B*2/3,s-U*2/3,qe.TOP_LEFT):new pe(t.left+B*2/3,t.top+U*2/3),this.topRightBorderDoubleInnerBox=r>0||s>0?iA(t.left+v,t.top+U*2/3,o-y*2/3,l-U*2/3,qe.TOP_RIGHT):new pe(t.left+t.width-y*2/3,t.top+U*2/3),this.bottomRightBorderDoubleInnerBox=u>0||h>0?iA(t.left+E,t.top+w,u-y*2/3,h-R*2/3,qe.BOTTOM_RIGHT):new pe(t.left+t.width-y*2/3,t.top+t.height-R*2/3),this.bottomLeftBorderDoubleInnerBox=g>0||m>0?iA(t.left+B*2/3,t.top+x,g-B*2/3,m-R*2/3,qe.BOTTOM_LEFT):new pe(t.left+B*2/3,t.top+t.height-R*2/3),this.topLeftBorderStroke=r>0||s>0?iA(t.left+B/2,t.top+U/2,r-B/2,s-U/2,qe.TOP_LEFT):new pe(t.left+B/2,t.top+U/2),this.topRightBorderStroke=r>0||s>0?iA(t.left+v,t.top+U/2,o-y/2,l-U/2,qe.TOP_RIGHT):new pe(t.left+t.width-y/2,t.top+U/2),this.bottomRightBorderStroke=u>0||h>0?iA(t.left+E,t.top+w,u-y/2,h-R/2,qe.BOTTOM_RIGHT):new pe(t.left+t.width-y/2,t.top+t.height-R/2),this.bottomLeftBorderStroke=g>0||m>0?iA(t.left+B/2,t.top+x,g-B/2,m-R/2,qe.BOTTOM_LEFT):new pe(t.left+B/2,t.top+t.height-R/2),this.topLeftBorderBox=r>0||s>0?iA(t.left,t.top,r,s,qe.TOP_LEFT):new pe(t.left,t.top),this.topRightBorderBox=o>0||l>0?iA(t.left+v,t.top,o,l,qe.TOP_RIGHT):new pe(t.left+t.width,t.top),this.bottomRightBorderBox=u>0||h>0?iA(t.left+E,t.top+w,u,h,qe.BOTTOM_RIGHT):new pe(t.left+t.width,t.top+t.height),this.bottomLeftBorderBox=g>0||m>0?iA(t.left,t.top+x,g,m,qe.BOTTOM_LEFT):new pe(t.left,t.top+t.height),this.topLeftPaddingBox=r>0||s>0?iA(t.left+B,t.top+U,Math.max(0,r-B),Math.max(0,s-U),qe.TOP_LEFT):new pe(t.left+B,t.top+U),this.topRightPaddingBox=o>0||l>0?iA(t.left+Math.min(v,t.width-y),t.top+U,v>t.width+y?0:Math.max(0,o-y),Math.max(0,l-U),qe.TOP_RIGHT):new pe(t.left+t.width-y,t.top+U),this.bottomRightPaddingBox=u>0||h>0?iA(t.left+Math.min(E,t.width-B),t.top+Math.min(w,t.height-R),Math.max(0,u-y),Math.max(0,h-R),qe.BOTTOM_RIGHT):new pe(t.left+t.width-y,t.top+t.height-R),this.bottomLeftPaddingBox=g>0||m>0?iA(t.left+B,t.top+Math.min(x,t.height-R),Math.max(0,g-B),Math.max(0,m-R),qe.BOTTOM_LEFT):new pe(t.left+B,t.top+t.height-R),this.topLeftContentBox=r>0||s>0?iA(t.left+B+W,t.top+U+M,Math.max(0,r-(B+W)),Math.max(0,s-(U+M)),qe.TOP_LEFT):new pe(t.left+B+W,t.top+U+M),this.topRightContentBox=o>0||l>0?iA(t.left+Math.min(v,t.width+B+W),t.top+U+M,v>t.width+B+W?0:o-B+W,l-(U+M),qe.TOP_RIGHT):new pe(t.left+t.width-(y+z),t.top+U+M),this.bottomRightContentBox=u>0||h>0?iA(t.left+Math.min(E,t.width-(B+W)),t.top+Math.min(w,t.height+U+M),Math.max(0,u-(y+z)),h-(R+Y),qe.BOTTOM_RIGHT):new pe(t.left+t.width-(y+z),t.top+t.height-(R+Y)),this.bottomLeftContentBox=g>0||m>0?iA(t.left+B+W,t.top+x,Math.max(0,g-(B+W)),m-(R+Y),qe.BOTTOM_LEFT):new pe(t.left+B+W,t.top+t.height-(R+Y))}return n}(),qe;(function(n){n[n.TOP_LEFT=0]="TOP_LEFT",n[n.TOP_RIGHT=1]="TOP_RIGHT",n[n.BOTTOM_RIGHT=2]="BOTTOM_RIGHT",n[n.BOTTOM_LEFT=3]="BOTTOM_LEFT"})(qe||(qe={}));var iA=function(n,e,A,t,i){var r=4*((Math.sqrt(2)-1)/3),s=A*r,a=t*r,o=n+A,l=e+t;switch(i){case qe.TOP_LEFT:return new Jr(new pe(n,l),new pe(n,l-a),new pe(o-s,e),new pe(o,e));case qe.TOP_RIGHT:return new Jr(new pe(n,e),new pe(n+s,e),new pe(o,l-a),new pe(o,l));case qe.BOTTOM_RIGHT:return new Jr(new pe(o,e),new pe(o,e+a),new pe(n+s,l),new pe(n,l));case qe.BOTTOM_LEFT:default:return new Jr(new pe(o,l),new pe(o-s,l),new pe(n,e+a),new pe(n,e))}},Ls=function(n){return[n.topLeftBorderBox,n.topRightBorderBox,n.bottomRightBorderBox,n.bottomLeftBorderBox]},A0=function(n){return[n.topLeftContentBox,n.topRightContentBox,n.bottomRightContentBox,n.bottomLeftContentBox]},Rs=function(n){return[n.topLeftPaddingBox,n.topRightPaddingBox,n.bottomRightPaddingBox,n.bottomLeftPaddingBox]},t0=function(){function n(e,A,t){this.offsetX=e,this.offsetY=A,this.matrix=t,this.type=0,this.target=6}return n}(),qr=function(){function n(e,A){this.path=e,this.target=A,this.type=1}return n}(),n0=function(){function n(e){this.opacity=e,this.type=2,this.target=6}return n}(),i0=function(n){return n.type===0},Zh=function(n){return n.type===1},r0=function(n){return n.type===2},Bc=function(n,e){return n.length===e.length?n.some(function(A,t){return A===e[t]}):!1},s0=function(n,e,A,t,i){return n.map(function(r,s){switch(s){case 0:return r.add(e,A);case 1:return r.add(e+t,A);case 2:return r.add(e+t,A+i);case 3:return r.add(e,A+i)}return r})},jh=function(){function n(e){this.element=e,this.inlineLevel=[],this.nonInlineLevel=[],this.negativeZIndex=[],this.zeroOrAutoZIndexOrTransformedOrOpacity=[],this.positiveZIndex=[],this.nonPositionedFloats=[],this.nonPositionedInlineLevel=[]}return n}(),$h=function(){function n(e,A){if(this.container=e,this.parent=A,this.effects=[],this.curves=new e0(this.container),this.container.styles.opacity<1&&this.effects.push(new n0(this.container.styles.opacity)),this.container.styles.transform!==null){var t=this.container.bounds.left+this.container.styles.transformOrigin[0].number,i=this.container.bounds.top+this.container.styles.transformOrigin[1].number,r=this.container.styles.transform;this.effects.push(new t0(t,i,r))}if(this.container.styles.overflowX!==0){var s=Ls(this.curves),a=Rs(this.curves);Bc(s,a)?this.effects.push(new qr(s,6)):(this.effects.push(new qr(s,2)),this.effects.push(new qr(a,4)))}}return n.prototype.getEffects=function(e){for(var A=[2,3].indexOf(this.container.styles.position)===-1,t=this.parent,i=this.effects.slice(0);t;){var r=t.effects.filter(function(o){return!Zh(o)});if(A||t.container.styles.position!==0||!t.parent){if(i.unshift.apply(i,r),A=[2,3].indexOf(t.container.styles.position)===-1,t.container.styles.overflowX!==0){var s=Ls(t.curves),a=Rs(t.curves);Bc(s,a)||i.unshift(new qr(a,6))}}else i.unshift.apply(i,r);t=t.parent}return i.filter(function(o){return mA(o.target,e)})},n}(),Po=function(n,e,A,t){n.container.elements.forEach(function(i){var r=mA(i.flags,4),s=mA(i.flags,2),a=new $h(i,n);mA(i.styles.display,2048)&&t.push(a);var o=mA(i.flags,8)?[]:t;if(r||s){var l=r||i.styles.isPositioned()?A:e,c=new jh(a);if(i.styles.isPositioned()||i.styles.opacity<1||i.styles.isTransformed()){var u=i.styles.zIndex.order;if(u<0){var h=0;l.negativeZIndex.some(function(g,m){return u>g.element.container.styles.zIndex.order?(h=m,!1):h>0}),l.negativeZIndex.splice(h,0,c)}else if(u>0){var p=0;l.positiveZIndex.some(function(g,m){return u>=g.element.container.styles.zIndex.order?(p=m+1,!1):p>0}),l.positiveZIndex.splice(p,0,c)}else l.zeroOrAutoZIndexOrTransformedOrOpacity.push(c)}else i.styles.isFloating()?l.nonPositionedFloats.push(c):l.nonPositionedInlineLevel.push(c);Po(a,c,r?c:A,o)}else i.styles.isInlineLevel()?e.inlineLevel.push(a):e.nonInlineLevel.push(a),Po(a,e,A,o);mA(i.flags,8)&&ef(i,o)})},ef=function(n,e){for(var A=n instanceof Io?n.start:1,t=n instanceof Io?n.reversed:!1,i=0;i<e.length;i++){var r=e[i];r.container instanceof Hh&&typeof r.container.value=="number"&&r.container.value!==0&&(A=r.container.value),r.listValue=gr(A,r.container.styles.listStyleType,!0),A+=t?-1:1}},a0=function(n){var e=new $h(n,null),A=new jh(e),t=[];return Po(e,A,A,t),ef(e.container,t),A},_c=function(n,e){switch(e){case 0:return st(n.topLeftBorderBox,n.topLeftPaddingBox,n.topRightBorderBox,n.topRightPaddingBox);case 1:return st(n.topRightBorderBox,n.topRightPaddingBox,n.bottomRightBorderBox,n.bottomRightPaddingBox);case 2:return st(n.bottomRightBorderBox,n.bottomRightPaddingBox,n.bottomLeftBorderBox,n.bottomLeftPaddingBox);case 3:default:return st(n.bottomLeftBorderBox,n.bottomLeftPaddingBox,n.topLeftBorderBox,n.topLeftPaddingBox)}},o0=function(n,e){switch(e){case 0:return st(n.topLeftBorderBox,n.topLeftBorderDoubleOuterBox,n.topRightBorderBox,n.topRightBorderDoubleOuterBox);case 1:return st(n.topRightBorderBox,n.topRightBorderDoubleOuterBox,n.bottomRightBorderBox,n.bottomRightBorderDoubleOuterBox);case 2:return st(n.bottomRightBorderBox,n.bottomRightBorderDoubleOuterBox,n.bottomLeftBorderBox,n.bottomLeftBorderDoubleOuterBox);case 3:default:return st(n.bottomLeftBorderBox,n.bottomLeftBorderDoubleOuterBox,n.topLeftBorderBox,n.topLeftBorderDoubleOuterBox)}},l0=function(n,e){switch(e){case 0:return st(n.topLeftBorderDoubleInnerBox,n.topLeftPaddingBox,n.topRightBorderDoubleInnerBox,n.topRightPaddingBox);case 1:return st(n.topRightBorderDoubleInnerBox,n.topRightPaddingBox,n.bottomRightBorderDoubleInnerBox,n.bottomRightPaddingBox);case 2:return st(n.bottomRightBorderDoubleInnerBox,n.bottomRightPaddingBox,n.bottomLeftBorderDoubleInnerBox,n.bottomLeftPaddingBox);case 3:default:return st(n.bottomLeftBorderDoubleInnerBox,n.bottomLeftPaddingBox,n.topLeftBorderDoubleInnerBox,n.topLeftPaddingBox)}},c0=function(n,e){switch(e){case 0:return Zr(n.topLeftBorderStroke,n.topRightBorderStroke);case 1:return Zr(n.topRightBorderStroke,n.bottomRightBorderStroke);case 2:return Zr(n.bottomRightBorderStroke,n.bottomLeftBorderStroke);case 3:default:return Zr(n.bottomLeftBorderStroke,n.topLeftBorderStroke)}},Zr=function(n,e){var A=[];return At(n)?A.push(n.subdivide(.5,!1)):A.push(n),At(e)?A.push(e.subdivide(.5,!0)):A.push(e),A},st=function(n,e,A,t){var i=[];return At(n)?i.push(n.subdivide(.5,!1)):i.push(n),At(A)?i.push(A.subdivide(.5,!0)):i.push(A),At(t)?i.push(t.subdivide(.5,!0).reverse()):i.push(t),At(e)?i.push(e.subdivide(.5,!1).reverse()):i.push(e),i},Af=function(n){var e=n.bounds,A=n.styles;return e.add(A.borderLeftWidth,A.borderTopWidth,-(A.borderRightWidth+A.borderLeftWidth),-(A.borderTopWidth+A.borderBottomWidth))},Ds=function(n){var e=n.styles,A=n.bounds,t=eA(e.paddingLeft,A.width),i=eA(e.paddingRight,A.width),r=eA(e.paddingTop,A.width),s=eA(e.paddingBottom,A.width);return A.add(t+e.borderLeftWidth,r+e.borderTopWidth,-(e.borderRightWidth+e.borderLeftWidth+t+i),-(e.borderTopWidth+e.borderBottomWidth+r+s))},u0=function(n,e){return n===0?e.bounds:n===2?Ds(e):Af(e)},h0=function(n,e){return n===0?e.bounds:n===2?Ds(e):Af(e)},Da=function(n,e,A){var t=u0(pi(n.styles.backgroundOrigin,e),n),i=h0(pi(n.styles.backgroundClip,e),n),r=f0(pi(n.styles.backgroundSize,e),A,t),s=r[0],a=r[1],o=$i(pi(n.styles.backgroundPosition,e),t.width-s,t.height-a),l=d0(pi(n.styles.backgroundRepeat,e),o,r,t,i),c=Math.round(t.left+o[0]),u=Math.round(t.top+o[1]);return[l,c,u,s,a]},Yn=function(n){return $e(n)&&n.value===wi.AUTO},jr=function(n){return typeof n=="number"},f0=function(n,e,A){var t=e[0],i=e[1],r=e[2],s=n[0],a=n[1];if(!s)return[0,0];if(dA(s)&&a&&dA(a))return[eA(s,A.width),eA(a,A.height)];var o=jr(r);if($e(s)&&(s.value===wi.CONTAIN||s.value===wi.COVER)){if(jr(r)){var l=A.width/A.height;return l<r!=(s.value===wi.COVER)?[A.width,A.width/r]:[A.height*r,A.height]}return[A.width,A.height]}var c=jr(t),u=jr(i),h=c||u;if(Yn(s)&&(!a||Yn(a))){if(c&&u)return[t,i];if(!o&&!h)return[A.width,A.height];if(h&&o){var p=c?t:i*r,g=u?i:t/r;return[p,g]}var m=c?t:A.width,d=u?i:A.height;return[m,d]}if(o){var f=0,v=0;return dA(s)?f=eA(s,A.width):dA(a)&&(v=eA(a,A.height)),Yn(s)?f=v*r:(!a||Yn(a))&&(v=f/r),[f,v]}var w=null,E=null;if(dA(s)?w=eA(s,A.width):a&&dA(a)&&(E=eA(a,A.height)),w!==null&&(!a||Yn(a))&&(E=c&&u?w/t*i:A.height),E!==null&&Yn(s)&&(w=c&&u?E/i*t:A.width),w!==null&&E!==null)return[w,E];throw new Error("Unable to calculate background-size for element")},pi=function(n,e){var A=n[e];return typeof A>"u"?n[0]:A},d0=function(n,e,A,t,i){var r=e[0],s=e[1],a=A[0],o=A[1];switch(n){case 2:return[new pe(Math.round(t.left),Math.round(t.top+s)),new pe(Math.round(t.left+t.width),Math.round(t.top+s)),new pe(Math.round(t.left+t.width),Math.round(o+t.top+s)),new pe(Math.round(t.left),Math.round(o+t.top+s))];case 3:return[new pe(Math.round(t.left+r),Math.round(t.top)),new pe(Math.round(t.left+r+a),Math.round(t.top)),new pe(Math.round(t.left+r+a),Math.round(t.height+t.top)),new pe(Math.round(t.left+r),Math.round(t.height+t.top))];case 1:return[new pe(Math.round(t.left+r),Math.round(t.top+s)),new pe(Math.round(t.left+r+a),Math.round(t.top+s)),new pe(Math.round(t.left+r+a),Math.round(t.top+s+o)),new pe(Math.round(t.left+r),Math.round(t.top+s+o))];default:return[new pe(Math.round(i.left),Math.round(i.top)),new pe(Math.round(i.left+i.width),Math.round(i.top)),new pe(Math.round(i.left+i.width),Math.round(i.height+i.top)),new pe(Math.round(i.left),Math.round(i.height+i.top))]}},p0="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",wc="Hidden Text",g0=function(){function n(e){this._data={},this._document=e}return n.prototype.parseMetrics=function(e,A){var t=this._document.createElement("div"),i=this._document.createElement("img"),r=this._document.createElement("span"),s=this._document.body;t.style.visibility="hidden",t.style.fontFamily=e,t.style.fontSize=A,t.style.margin="0",t.style.padding="0",t.style.whiteSpace="nowrap",s.appendChild(t),i.src=p0,i.width=1,i.height=1,i.style.margin="0",i.style.padding="0",i.style.verticalAlign="baseline",r.style.fontFamily=e,r.style.fontSize=A,r.style.margin="0",r.style.padding="0",r.appendChild(this._document.createTextNode(wc)),t.appendChild(r),t.appendChild(i);var a=i.offsetTop-r.offsetTop+2;t.removeChild(r),t.appendChild(this._document.createTextNode(wc)),t.style.lineHeight="normal",i.style.verticalAlign="super";var o=i.offsetTop-t.offsetTop+2;return s.removeChild(t),{baseline:a,middle:o}},n.prototype.getMetrics=function(e,A){var t=e+" "+A;return typeof this._data[t]>"u"&&(this._data[t]=this.parseMetrics(e,A)),this._data[t]},n}(),tf=function(){function n(e,A){this.context=e,this.options=A}return n}(),m0=1e4,B0=function(n){gt(e,n);function e(A,t){var i=n.call(this,A,t)||this;return i._activeEffects=[],i.canvas=t.canvas?t.canvas:document.createElement("canvas"),i.ctx=i.canvas.getContext("2d"),t.canvas||(i.canvas.width=Math.floor(t.width*t.scale),i.canvas.height=Math.floor(t.height*t.scale),i.canvas.style.width=t.width+"px",i.canvas.style.height=t.height+"px"),i.fontMetrics=new g0(document),i.ctx.scale(i.options.scale,i.options.scale),i.ctx.translate(-t.x,-t.y),i.ctx.textBaseline="bottom",i._activeEffects=[],i.context.logger.debug("Canvas renderer initialized ("+t.width+"x"+t.height+") with scale "+t.scale),i}return e.prototype.applyEffects=function(A){for(var t=this;this._activeEffects.length;)this.popEffect();A.forEach(function(i){return t.applyEffect(i)})},e.prototype.applyEffect=function(A){this.ctx.save(),r0(A)&&(this.ctx.globalAlpha=A.opacity),i0(A)&&(this.ctx.translate(A.offsetX,A.offsetY),this.ctx.transform(A.matrix[0],A.matrix[1],A.matrix[2],A.matrix[3],A.matrix[4],A.matrix[5]),this.ctx.translate(-A.offsetX,-A.offsetY)),Zh(A)&&(this.path(A.path),this.ctx.clip()),this._activeEffects.push(A)},e.prototype.popEffect=function(){this._activeEffects.pop(),this.ctx.restore()},e.prototype.renderStack=function(A){return NA(this,void 0,void 0,function(){var t;return QA(this,function(i){switch(i.label){case 0:return t=A.element.container.styles,t.isVisible()?[4,this.renderStackContent(A)]:[3,2];case 1:i.sent(),i.label=2;case 2:return[2]}})})},e.prototype.renderNode=function(A){return NA(this,void 0,void 0,function(){return QA(this,function(t){switch(t.label){case 0:if(mA(A.container.flags,16))debugger;return A.container.styles.isVisible()?[4,this.renderNodeBackgroundAndBorders(A)]:[3,3];case 1:return t.sent(),[4,this.renderNodeContent(A)];case 2:t.sent(),t.label=3;case 3:return[2]}})})},e.prototype.renderTextWithLetterSpacing=function(A,t,i){var r=this;if(t===0)this.ctx.fillText(A.text,A.bounds.left,A.bounds.top+i);else{var s=el(A.text);s.reduce(function(a,o){return r.ctx.fillText(o,a,A.bounds.top+i),a+r.ctx.measureText(o).width},A.bounds.left)}},e.prototype.createFontStyle=function(A){var t=A.fontVariant.filter(function(s){return s==="normal"||s==="small-caps"}).join(""),i=C0(A.fontFamily).join(", "),r=xr(A.fontSize)?""+A.fontSize.number+A.fontSize.unit:A.fontSize.number+"px";return[[A.fontStyle,t,A.fontWeight,r,i].join(" "),i,r]},e.prototype.renderTextNode=function(A,t){return NA(this,void 0,void 0,function(){var i,r,s,a,o,l,c,u,h=this;return QA(this,function(p){return i=this.createFontStyle(t),r=i[0],s=i[1],a=i[2],this.ctx.font=r,this.ctx.direction=t.direction===1?"rtl":"ltr",this.ctx.textAlign="left",this.ctx.textBaseline="alphabetic",o=this.fontMetrics.getMetrics(s,a),l=o.baseline,c=o.middle,u=t.paintOrder,A.textBounds.forEach(function(g){u.forEach(function(m){switch(m){case 0:h.ctx.fillStyle=EA(t.color),h.renderTextWithLetterSpacing(g,t.letterSpacing,l);var d=t.textShadow;d.length&&g.text.trim().length&&(d.slice(0).reverse().forEach(function(f){h.ctx.shadowColor=EA(f.color),h.ctx.shadowOffsetX=f.offsetX.number*h.options.scale,h.ctx.shadowOffsetY=f.offsetY.number*h.options.scale,h.ctx.shadowBlur=f.blur.number,h.renderTextWithLetterSpacing(g,t.letterSpacing,l)}),h.ctx.shadowColor="",h.ctx.shadowOffsetX=0,h.ctx.shadowOffsetY=0,h.ctx.shadowBlur=0),t.textDecorationLine.length&&(h.ctx.fillStyle=EA(t.textDecorationColor||t.color),t.textDecorationLine.forEach(function(f){switch(f){case 1:h.ctx.fillRect(g.bounds.left,Math.round(g.bounds.top+l),g.bounds.width,1);break;case 2:h.ctx.fillRect(g.bounds.left,Math.round(g.bounds.top),g.bounds.width,1);break;case 3:h.ctx.fillRect(g.bounds.left,Math.ceil(g.bounds.top+c),g.bounds.width,1);break}}));break;case 1:t.webkitTextStrokeWidth&&g.text.trim().length&&(h.ctx.strokeStyle=EA(t.webkitTextStrokeColor),h.ctx.lineWidth=t.webkitTextStrokeWidth,h.ctx.lineJoin=window.chrome?"miter":"round",h.ctx.strokeText(g.text,g.bounds.left,g.bounds.top+l)),h.ctx.strokeStyle="",h.ctx.lineWidth=0,h.ctx.lineJoin="miter";break}})}),[2]})})},e.prototype.renderReplacedElement=function(A,t,i){if(i&&A.intrinsicWidth>0&&A.intrinsicHeight>0){var r=Ds(A),s=Rs(t);this.path(s),this.ctx.save(),this.ctx.clip(),this.ctx.drawImage(i,0,0,A.intrinsicWidth,A.intrinsicHeight,r.left,r.top,r.width,r.height),this.ctx.restore()}},e.prototype.renderNodeContent=function(A){return NA(this,void 0,void 0,function(){var t,i,r,s,a,o,v,v,l,c,u,h,E,p,g,x,m,d,f,v,w,E,x;return QA(this,function(U){switch(U.label){case 0:this.applyEffects(A.getEffects(4)),t=A.container,i=A.curves,r=t.styles,s=0,a=t.textNodes,U.label=1;case 1:return s<a.length?(o=a[s],[4,this.renderTextNode(o,r)]):[3,4];case 2:U.sent(),U.label=3;case 3:return s++,[3,1];case 4:if(!(t instanceof Lh))return[3,8];U.label=5;case 5:return U.trys.push([5,7,,8]),[4,this.context.cache.match(t.src)];case 6:return v=U.sent(),this.renderReplacedElement(t,i,v),[3,8];case 7:return U.sent(),this.context.logger.error("Error loading image "+t.src),[3,8];case 8:if(t instanceof Rh&&this.renderReplacedElement(t,i,t.canvas),!(t instanceof Dh))return[3,12];U.label=9;case 9:return U.trys.push([9,11,,12]),[4,this.context.cache.match(t.svg)];case 10:return v=U.sent(),this.renderReplacedElement(t,i,v),[3,12];case 11:return U.sent(),this.context.logger.error("Error loading svg "+t.svg.substring(0,255)),[3,12];case 12:return t instanceof Nh&&t.tree?(l=new e(this.context,{scale:this.options.scale,backgroundColor:t.backgroundColor,x:0,y:0,width:t.width,height:t.height}),[4,l.render(t.tree)]):[3,14];case 13:c=U.sent(),t.width&&t.height&&this.ctx.drawImage(c,0,0,t.width,t.height,t.bounds.left,t.bounds.top,t.bounds.width,t.bounds.height),U.label=14;case 14:if(t instanceof Al&&(u=Math.min(t.bounds.width,t.bounds.height),t.type===bs?t.checked&&(this.ctx.save(),this.path([new pe(t.bounds.left+u*.39363,t.bounds.top+u*.79),new pe(t.bounds.left+u*.16,t.bounds.top+u*.5549),new pe(t.bounds.left+u*.27347,t.bounds.top+u*.44071),new pe(t.bounds.left+u*.39694,t.bounds.top+u*.5649),new pe(t.bounds.left+u*.72983,t.bounds.top+u*.23),new pe(t.bounds.left+u*.84,t.bounds.top+u*.34085),new pe(t.bounds.left+u*.39363,t.bounds.top+u*.79)]),this.ctx.fillStyle=EA(ac),this.ctx.fill(),this.ctx.restore()):t.type===Ts&&t.checked&&(this.ctx.save(),this.ctx.beginPath(),this.ctx.arc(t.bounds.left+u/2,t.bounds.top+u/2,u/4,0,Math.PI*2,!0),this.ctx.fillStyle=EA(ac),this.ctx.fill(),this.ctx.restore())),_0(t)&&t.value.length){switch(h=this.createFontStyle(r),E=h[0],p=h[1],g=this.fontMetrics.getMetrics(E,p).baseline,this.ctx.font=E,this.ctx.fillStyle=EA(r.color),this.ctx.textBaseline="alphabetic",this.ctx.textAlign=v0(t.styles.textAlign),x=Ds(t),m=0,t.styles.textAlign){case 1:m+=x.width/2;break;case 2:m+=x.width;break}d=x.add(m,0,0,-x.height/2+1),this.ctx.save(),this.path([new pe(x.left,x.top),new pe(x.left+x.width,x.top),new pe(x.left+x.width,x.top+x.height),new pe(x.left,x.top+x.height)]),this.ctx.clip(),this.renderTextWithLetterSpacing(new ar(t.value,d),r.letterSpacing,g),this.ctx.restore(),this.ctx.textBaseline="alphabetic",this.ctx.textAlign="left"}if(!mA(t.styles.display,2048))return[3,20];if(t.styles.listStyleImage===null)return[3,19];if(f=t.styles.listStyleImage,f.type!==0)return[3,18];v=void 0,w=f.url,U.label=15;case 15:return U.trys.push([15,17,,18]),[4,this.context.cache.match(w)];case 16:return v=U.sent(),this.ctx.drawImage(v,t.bounds.left-(v.width+10),t.bounds.top),[3,18];case 17:return U.sent(),this.context.logger.error("Error loading list-style-image "+w),[3,18];case 18:return[3,20];case 19:A.listValue&&t.styles.listStyleType!==-1&&(E=this.createFontStyle(r)[0],this.ctx.font=E,this.ctx.fillStyle=EA(r.color),this.ctx.textBaseline="middle",this.ctx.textAlign="right",x=new zt(t.bounds.left,t.bounds.top+eA(t.styles.paddingTop,t.bounds.width),t.bounds.width,kl(r.lineHeight,r.fontSize.number)/2+1),this.renderTextWithLetterSpacing(new ar(A.listValue,x),r.letterSpacing,kl(r.lineHeight,r.fontSize.number)/2+2),this.ctx.textBaseline="bottom",this.ctx.textAlign="left"),U.label=20;case 20:return[2]}})})},e.prototype.renderStackContent=function(A){return NA(this,void 0,void 0,function(){var t,i,f,r,s,f,a,o,f,l,c,f,u,h,f,p,g,f,m,d,f;return QA(this,function(v){switch(v.label){case 0:if(mA(A.element.container.flags,16))debugger;return[4,this.renderNodeBackgroundAndBorders(A.element)];case 1:v.sent(),t=0,i=A.negativeZIndex,v.label=2;case 2:return t<i.length?(f=i[t],[4,this.renderStack(f)]):[3,5];case 3:v.sent(),v.label=4;case 4:return t++,[3,2];case 5:return[4,this.renderNodeContent(A.element)];case 6:v.sent(),r=0,s=A.nonInlineLevel,v.label=7;case 7:return r<s.length?(f=s[r],[4,this.renderNode(f)]):[3,10];case 8:v.sent(),v.label=9;case 9:return r++,[3,7];case 10:a=0,o=A.nonPositionedFloats,v.label=11;case 11:return a<o.length?(f=o[a],[4,this.renderStack(f)]):[3,14];case 12:v.sent(),v.label=13;case 13:return a++,[3,11];case 14:l=0,c=A.nonPositionedInlineLevel,v.label=15;case 15:return l<c.length?(f=c[l],[4,this.renderStack(f)]):[3,18];case 16:v.sent(),v.label=17;case 17:return l++,[3,15];case 18:u=0,h=A.inlineLevel,v.label=19;case 19:return u<h.length?(f=h[u],[4,this.renderNode(f)]):[3,22];case 20:v.sent(),v.label=21;case 21:return u++,[3,19];case 22:p=0,g=A.zeroOrAutoZIndexOrTransformedOrOpacity,v.label=23;case 23:return p<g.length?(f=g[p],[4,this.renderStack(f)]):[3,26];case 24:v.sent(),v.label=25;case 25:return p++,[3,23];case 26:m=0,d=A.positiveZIndex,v.label=27;case 27:return m<d.length?(f=d[m],[4,this.renderStack(f)]):[3,30];case 28:v.sent(),v.label=29;case 29:return m++,[3,27];case 30:return[2]}})})},e.prototype.mask=function(A){this.ctx.beginPath(),this.ctx.moveTo(0,0),this.ctx.lineTo(this.canvas.width,0),this.ctx.lineTo(this.canvas.width,this.canvas.height),this.ctx.lineTo(0,this.canvas.height),this.ctx.lineTo(0,0),this.formatPath(A.slice(0).reverse()),this.ctx.closePath()},e.prototype.path=function(A){this.ctx.beginPath(),this.formatPath(A),this.ctx.closePath()},e.prototype.formatPath=function(A){var t=this;A.forEach(function(i,r){var s=At(i)?i.start:i;r===0?t.ctx.moveTo(s.x,s.y):t.ctx.lineTo(s.x,s.y),At(i)&&t.ctx.bezierCurveTo(i.startControl.x,i.startControl.y,i.endControl.x,i.endControl.y,i.end.x,i.end.y)})},e.prototype.renderRepeat=function(A,t,i,r){this.path(A),this.ctx.fillStyle=t,this.ctx.translate(i,r),this.ctx.fill(),this.ctx.translate(-i,-r)},e.prototype.resizeImage=function(A,t,i){var r;if(A.width===t&&A.height===i)return A;var s=(r=this.canvas.ownerDocument)!==null&&r!==void 0?r:document,a=s.createElement("canvas");a.width=Math.max(1,t),a.height=Math.max(1,i);var o=a.getContext("2d");return o.drawImage(A,0,0,A.width,A.height,0,0,t,i),a},e.prototype.renderBackgroundImage=function(A){return NA(this,void 0,void 0,function(){var t,i,r,s,a,o;return QA(this,function(l){switch(l.label){case 0:t=A.styles.backgroundImage.length-1,i=function(c){var u,h,p,M,X,G,W,T,R,g,M,X,G,W,T,m,d,f,v,w,E,x,U,y,R,B,M,z,Y,W,T,N,X,G,ee,J,q,I,O,se,ue,de;return QA(this,function(Ee){switch(Ee.label){case 0:if(c.type!==0)return[3,5];u=void 0,h=c.url,Ee.label=1;case 1:return Ee.trys.push([1,3,,4]),[4,r.context.cache.match(h)];case 2:return u=Ee.sent(),[3,4];case 3:return Ee.sent(),r.context.logger.error("Error loading background-image "+h),[3,4];case 4:return u&&(p=Da(A,t,[u.width,u.height,u.width/u.height]),M=p[0],X=p[1],G=p[2],W=p[3],T=p[4],R=r.ctx.createPattern(r.resizeImage(u,W,T),"repeat"),r.renderRepeat(M,R,X,G)),[3,6];case 5:ig(c)?(g=Da(A,t,[null,null,null]),M=g[0],X=g[1],G=g[2],W=g[3],T=g[4],m=$p(c.angle,W,T),d=m[0],f=m[1],v=m[2],w=m[3],E=m[4],x=document.createElement("canvas"),x.width=W,x.height=T,U=x.getContext("2d"),y=U.createLinearGradient(f,w,v,E),Vl(c.stops,d).forEach(function(Ue){return y.addColorStop(Ue.stop,EA(Ue.color))}),U.fillStyle=y,U.fillRect(0,0,W,T),W>0&&T>0&&(R=r.ctx.createPattern(x,"repeat"),r.renderRepeat(M,R,X,G))):rg(c)&&(B=Da(A,t,[null,null,null]),M=B[0],z=B[1],Y=B[2],W=B[3],T=B[4],N=c.position.length===0?[Zo]:c.position,X=eA(N[0],W),G=eA(N[N.length-1],T),ee=eg(c,X,G,W,T),J=ee[0],q=ee[1],J>0&&q>0&&(I=r.ctx.createRadialGradient(z+X,Y+G,0,z+X,Y+G,J),Vl(c.stops,J*2).forEach(function(Ue){return I.addColorStop(Ue.stop,EA(Ue.color))}),r.path(M),r.ctx.fillStyle=I,J!==q?(O=A.bounds.left+.5*A.bounds.width,se=A.bounds.top+.5*A.bounds.height,ue=q/J,de=1/ue,r.ctx.save(),r.ctx.translate(O,se),r.ctx.transform(1,0,0,ue,0,0),r.ctx.translate(-O,-se),r.ctx.fillRect(z,de*(Y-se)+se,W,T*de),r.ctx.restore()):r.ctx.fill())),Ee.label=6;case 6:return t--,[2]}})},r=this,s=0,a=A.styles.backgroundImage.slice(0).reverse(),l.label=1;case 1:return s<a.length?(o=a[s],[5,i(o)]):[3,4];case 2:l.sent(),l.label=3;case 3:return s++,[3,1];case 4:return[2]}})})},e.prototype.renderSolidBorder=function(A,t,i){return NA(this,void 0,void 0,function(){return QA(this,function(r){return this.path(_c(i,t)),this.ctx.fillStyle=EA(A),this.ctx.fill(),[2]})})},e.prototype.renderDoubleBorder=function(A,t,i,r){return NA(this,void 0,void 0,function(){var s,a;return QA(this,function(o){switch(o.label){case 0:return t<3?[4,this.renderSolidBorder(A,i,r)]:[3,2];case 1:return o.sent(),[2];case 2:return s=o0(r,i),this.path(s),this.ctx.fillStyle=EA(A),this.ctx.fill(),a=l0(r,i),this.path(a),this.ctx.fill(),[2]}})})},e.prototype.renderNodeBackgroundAndBorders=function(A){return NA(this,void 0,void 0,function(){var t,i,r,s,a,o,l,c,u=this;return QA(this,function(h){switch(h.label){case 0:return this.applyEffects(A.getEffects(2)),t=A.container.styles,i=!ln(t.backgroundColor)||t.backgroundImage.length,r=[{style:t.borderTopStyle,color:t.borderTopColor,width:t.borderTopWidth},{style:t.borderRightStyle,color:t.borderRightColor,width:t.borderRightWidth},{style:t.borderBottomStyle,color:t.borderBottomColor,width:t.borderBottomWidth},{style:t.borderLeftStyle,color:t.borderLeftColor,width:t.borderLeftWidth}],s=w0(pi(t.backgroundClip,0),A.curves),i||t.boxShadow.length?(this.ctx.save(),this.path(s),this.ctx.clip(),ln(t.backgroundColor)||(this.ctx.fillStyle=EA(t.backgroundColor),this.ctx.fill()),[4,this.renderBackgroundImage(A.container)]):[3,2];case 1:h.sent(),this.ctx.restore(),t.boxShadow.slice(0).reverse().forEach(function(p){u.ctx.save();var g=Ls(A.curves),m=p.inset?0:m0,d=s0(g,-m+(p.inset?1:-1)*p.spread.number,(p.inset?1:-1)*p.spread.number,p.spread.number*(p.inset?-2:2),p.spread.number*(p.inset?-2:2));p.inset?(u.path(g),u.ctx.clip(),u.mask(d)):(u.mask(g),u.ctx.clip(),u.path(d)),u.ctx.shadowOffsetX=p.offsetX.number+m,u.ctx.shadowOffsetY=p.offsetY.number,u.ctx.shadowColor=EA(p.color),u.ctx.shadowBlur=p.blur.number,u.ctx.fillStyle=p.inset?EA(p.color):"rgba(0,0,0,1)",u.ctx.fill(),u.ctx.restore()}),h.label=2;case 2:a=0,o=0,l=r,h.label=3;case 3:return o<l.length?(c=l[o],c.style!==0&&!ln(c.color)&&c.width>0?c.style!==2?[3,5]:[4,this.renderDashedDottedBorder(c.color,c.width,a,A.curves,2)]:[3,11]):[3,13];case 4:return h.sent(),[3,11];case 5:return c.style!==3?[3,7]:[4,this.renderDashedDottedBorder(c.color,c.width,a,A.curves,3)];case 6:return h.sent(),[3,11];case 7:return c.style!==4?[3,9]:[4,this.renderDoubleBorder(c.color,c.width,a,A.curves)];case 8:return h.sent(),[3,11];case 9:return[4,this.renderSolidBorder(c.color,a,A.curves)];case 10:h.sent(),h.label=11;case 11:a++,h.label=12;case 12:return o++,[3,3];case 13:return[2]}})})},e.prototype.renderDashedDottedBorder=function(A,t,i,r,s){return NA(this,void 0,void 0,function(){var a,o,l,c,u,h,p,g,m,d,f,v,w,E,x,U,x,U;return QA(this,function(y){return this.ctx.save(),a=c0(r,i),o=_c(r,i),s===2&&(this.path(o),this.ctx.clip()),At(o[0])?(l=o[0].start.x,c=o[0].start.y):(l=o[0].x,c=o[0].y),At(o[1])?(u=o[1].end.x,h=o[1].end.y):(u=o[1].x,h=o[1].y),i===0||i===2?p=Math.abs(l-u):p=Math.abs(c-h),this.ctx.beginPath(),s===3?this.formatPath(a):this.formatPath(o.slice(0,2)),g=t<3?t*3:t*2,m=t<3?t*2:t,s===3&&(g=t,m=t),d=!0,p<=g*2?d=!1:p<=g*2+m?(f=p/(2*g+m),g*=f,m*=f):(v=Math.floor((p+m)/(g+m)),w=(p-v*g)/(v-1),E=(p-(v+1)*g)/v,m=E<=0||Math.abs(m-w)<Math.abs(m-E)?w:E),d&&(s===3?this.ctx.setLineDash([0,g+m]):this.ctx.setLineDash([g,m])),s===3?(this.ctx.lineCap="round",this.ctx.lineWidth=t):this.ctx.lineWidth=t*2+1.1,this.ctx.strokeStyle=EA(A),this.ctx.stroke(),this.ctx.setLineDash([]),s===2&&(At(o[0])&&(x=o[3],U=o[0],this.ctx.beginPath(),this.formatPath([new pe(x.end.x,x.end.y),new pe(U.start.x,U.start.y)]),this.ctx.stroke()),At(o[1])&&(x=o[1],U=o[2],this.ctx.beginPath(),this.formatPath([new pe(x.end.x,x.end.y),new pe(U.start.x,U.start.y)]),this.ctx.stroke())),this.ctx.restore(),[2]})})},e.prototype.render=function(A){return NA(this,void 0,void 0,function(){var t;return QA(this,function(i){switch(i.label){case 0:return this.options.backgroundColor&&(this.ctx.fillStyle=EA(this.options.backgroundColor),this.ctx.fillRect(this.options.x,this.options.y,this.options.width,this.options.height)),t=a0(A),[4,this.renderStack(t)];case 1:return i.sent(),this.applyEffects([]),[2,this.canvas]}})})},e}(tf),_0=function(n){return n instanceof Oh||n instanceof Ph?!0:n instanceof Al&&n.type!==Ts&&n.type!==bs},w0=function(n,e){switch(n){case 0:return Ls(e);case 2:return A0(e);case 1:default:return Rs(e)}},v0=function(n){switch(n){case 1:return"center";case 2:return"right";case 0:default:return"left"}},E0=["-apple-system","system-ui"],C0=function(n){return/iPhone OS 15_(0|1)/.test(window.navigator.userAgent)?n.filter(function(e){return E0.indexOf(e)===-1}):n},x0=function(n){gt(e,n);function e(A,t){var i=n.call(this,A,t)||this;return i.canvas=t.canvas?t.canvas:document.createElement("canvas"),i.ctx=i.canvas.getContext("2d"),i.options=t,i.canvas.width=Math.floor(t.width*t.scale),i.canvas.height=Math.floor(t.height*t.scale),i.canvas.style.width=t.width+"px",i.canvas.style.height=t.height+"px",i.ctx.scale(i.options.scale,i.options.scale),i.ctx.translate(-t.x,-t.y),i.context.logger.debug("EXPERIMENTAL ForeignObject renderer initialized ("+t.width+"x"+t.height+" at "+t.x+","+t.y+") with scale "+t.scale),i}return e.prototype.render=function(A){return NA(this,void 0,void 0,function(){var t,i;return QA(this,function(r){switch(r.label){case 0:return t=Qo(this.options.width*this.options.scale,this.options.height*this.options.scale,this.options.scale,this.options.scale,A),[4,U0(t)];case 1:return i=r.sent(),this.options.backgroundColor&&(this.ctx.fillStyle=EA(this.options.backgroundColor),this.ctx.fillRect(0,0,this.options.width*this.options.scale,this.options.height*this.options.scale)),this.ctx.drawImage(i,-this.options.x*this.options.scale,-this.options.y*this.options.scale),[2,this.canvas]}})})},e}(tf),U0=function(n){return new Promise(function(e,A){var t=new Image;t.onload=function(){e(t)},t.onerror=A,t.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(new XMLSerializer().serializeToString(n))})},y0=function(){function n(e){var A=e.id,t=e.enabled;this.id=A,this.enabled=t,this.start=Date.now()}return n.prototype.debug=function(){for(var e=[],A=0;A<arguments.length;A++)e[A]=arguments[A];this.enabled&&(typeof window<"u"&&window.console&&typeof console.debug=="function"?console.debug.apply(console,br([this.id,this.getTime()+"ms"],e)):this.info.apply(this,e))},n.prototype.getTime=function(){return Date.now()-this.start},n.prototype.info=function(){for(var e=[],A=0;A<arguments.length;A++)e[A]=arguments[A];this.enabled&&typeof window<"u"&&window.console&&typeof console.info=="function"&&console.info.apply(console,br([this.id,this.getTime()+"ms"],e))},n.prototype.warn=function(){for(var e=[],A=0;A<arguments.length;A++)e[A]=arguments[A];this.enabled&&(typeof window<"u"&&window.console&&typeof console.warn=="function"?console.warn.apply(console,br([this.id,this.getTime()+"ms"],e)):this.info.apply(this,e))},n.prototype.error=function(){for(var e=[],A=0;A<arguments.length;A++)e[A]=arguments[A];this.enabled&&(typeof window<"u"&&window.console&&typeof console.error=="function"?console.error.apply(console,br([this.id,this.getTime()+"ms"],e)):this.info.apply(this,e))},n.instances={},n}(),S0=function(){function n(e,A){var t;this.windowBounds=A,this.instanceName="#"+n.instanceCount++,this.logger=new y0({id:this.instanceName,enabled:e.logging}),this.cache=(t=e.cache)!==null&&t!==void 0?t:new XB(this,e)}return n.instanceCount=1,n}(),nf=function(n,e){return e===void 0&&(e={}),M0(n,e)};typeof window<"u"&&qh.setContext(window);var M0=function(n,e){return NA(void 0,void 0,void 0,function(){var A,t,i,r,s,a,o,l,c,u,h,p,g,m,d,f,v,w,E,x,y,U,y,R,B,M,z,Y,W,T,N,X,G,ee,J,q,I,O,se,ue;return QA(this,function(de){switch(de.label){case 0:if(!n||typeof n!="object")return[2,Promise.reject("Invalid element provided as first argument")];if(A=n.ownerDocument,!A)throw new Error("Element is not attached to a Document");if(t=A.defaultView,!t)throw new Error("Document is not attached to a Window");return i={allowTaint:(R=e.allowTaint)!==null&&R!==void 0?R:!1,imageTimeout:(B=e.imageTimeout)!==null&&B!==void 0?B:15e3,proxy:e.proxy,useCORS:(M=e.useCORS)!==null&&M!==void 0?M:!1},r=mo({logging:(z=e.logging)!==null&&z!==void 0?z:!0,cache:e.cache},i),s={windowWidth:(Y=e.windowWidth)!==null&&Y!==void 0?Y:t.innerWidth,windowHeight:(W=e.windowHeight)!==null&&W!==void 0?W:t.innerHeight,scrollX:(T=e.scrollX)!==null&&T!==void 0?T:t.pageXOffset,scrollY:(N=e.scrollY)!==null&&N!==void 0?N:t.pageYOffset},a=new zt(s.scrollX,s.scrollY,s.windowWidth,s.windowHeight),o=new S0(r,a),l=(X=e.foreignObjectRendering)!==null&&X!==void 0?X:!1,c={allowTaint:(G=e.allowTaint)!==null&&G!==void 0?G:!1,onclone:e.onclone,ignoreElements:e.ignoreElements,inlineImages:l,copyStyles:l},o.logger.debug("Starting document clone with size "+a.width+"x"+a.height+" scrolled to "+-a.left+","+-a.top),u=new gc(o,n,c),h=u.clonedReferenceElement,h?[4,u.toIFrame(A,a)]:[2,Promise.reject("Unable to find element in cloned iframe")];case 1:return p=de.sent(),g=tl(h)||bB(h)?sd(h.ownerDocument):Ys(o,h),m=g.width,d=g.height,f=g.left,v=g.top,w=F0(o,h,e.backgroundColor),E={canvas:e.canvas,backgroundColor:w,scale:(J=(ee=e.scale)!==null&&ee!==void 0?ee:t.devicePixelRatio)!==null&&J!==void 0?J:1,x:((q=e.x)!==null&&q!==void 0?q:0)+f,y:((I=e.y)!==null&&I!==void 0?I:0)+v,width:(O=e.width)!==null&&O!==void 0?O:Math.ceil(m),height:(se=e.height)!==null&&se!==void 0?se:Math.ceil(d)},l?(o.logger.debug("Document cloned, using foreign object rendering"),y=new x0(o,E),[4,y.render(h)]):[3,3];case 2:return x=de.sent(),[3,5];case 3:return o.logger.debug("Document cloned, element located at "+f+","+v+" with size "+m+"x"+d+" using computed rendering"),o.logger.debug("Starting DOM parsing"),U=Vh(o,h),w===U.styles.backgroundColor&&(U.styles.backgroundColor=kt.TRANSPARENT),o.logger.debug("Starting renderer for element at "+E.x+","+E.y+" with size "+E.width+"x"+E.height),y=new B0(o,E),[4,y.render(U)];case 4:x=de.sent(),de.label=5;case 5:return(!((ue=e.removeContainer)!==null&&ue!==void 0)||ue)&&(gc.destroy(p)||o.logger.error("Cannot detach cloned iframe as it is not in the DOM anymore")),o.logger.debug("Finished rendering"),[2,x]}})})},F0=function(n,e,A){var t=e.ownerDocument,i=t.documentElement?rr(n,getComputedStyle(t.documentElement).backgroundColor):kt.TRANSPARENT,r=t.body?rr(n,getComputedStyle(t.body).backgroundColor):kt.TRANSPARENT,s=typeof A=="string"?rr(n,A):A===null?kt.TRANSPARENT:4294967295;return e===t.documentElement?ln(i)?ln(r)?s:r:i:s};const b0=async()=>await rd(()=>import("./imprint-gen-97f4f62e.js"),[]),T0='<hr><p style="opacity: 1.0;">Dieses Impressum wurde erstellt durch <a href="https://www.impressum-generator.de" rel="nofollow">impressum-generator.de</a>.</p>',Q0=`<hr><div class="center" width=100%>
<button id="hide-imprint" onclick="document.body.dispatchEvent(new Event('${ce.HIDE_IMPRINT.toString()}', { bubbles: true }))">Close</button></div>`;class I0{constructor(){window.addEventListener("resize",()=>this.redraw()),new $u(document.body,()=>this.redraw()),document.body.addEventListener(ce.SHOW_IMPRINT.toString(),e=>this.show()),document.body.addEventListener(ce.HIDE_IMPRINT.toString(),e=>this.hide()),document.body.addEventListener("keydown",e=>{(e.key==="Esc"||e.key==="Escape")&&this.hide()})}redraw(){this.div!==void 0&&(this.hide(),this.show())}async isAvailable(){const e=await b0();return this.decryptedAES=e.decryptedAES,this.decryptedAES()!==void 0}show(){if(this.div===void 0){this.div=document.createElement("div");const e=this.div;e.classList.add("imprint"),e.innerHTML=this.decryptedAES(),document.body.appendChild(e);const A=window.getComputedStyle(document.body),t=e.scrollWidth,i=e.scrollHeight,r=A.getPropertyValue("background-color");nf(e,{backgroundColor:r,windowWidth:t,windowHeight:i}).then(s=>{s.classList.add("padding"),e.innerHTML="",e.appendChild(s);const a=document.createElement("p");a.classList.add("padding"),a.innerHTML=T0+Q0,e.appendChild(a)})}}hide(){this.div!==void 0&&(document.body.removeChild(this.div),this.div=void 0)}}const L0=`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" id="settings-icon" class="settings-icon" viewBox="0 0 24 24" width="512" height="512">
    <path d="M12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z"/>
    <path d="M21.294,13.9l-.444-.256a9.1,9.1,0,0,0,0-3.29l.444-.256a3,3,0,1,0-3-5.2l-.445.257A8.977,8.977,0,0,0,15,3.513V3A3,3,0,0,0,9,3v.513A8.977,8.977,0,0,0,6.152,5.159L5.705,4.9a3,3,0,0,0-3,5.2l.444.256a9.1,9.1,0,0,0,0,3.29l-.444.256a3,3,0,1,0,3,5.2l.445-.257A8.977,8.977,0,0,0,9,20.487V21a3,3,0,0,0,6,0v-.513a8.977,8.977,0,0,0,2.848-1.646l.447.258a3,3,0,0,0,3-5.2Zm-2.548-3.776a7.048,7.048,0,0,1,0,3.75,1,1,0,0,0,.464,1.133l1.084.626a1,1,0,0,1-1,1.733l-1.086-.628a1,1,0,0,0-1.215.165,6.984,6.984,0,0,1-3.243,1.875,1,1,0,0,0-.751.969V21a1,1,0,0,1-2,0V19.748a1,1,0,0,0-.751-.969A6.984,6.984,0,0,1,7.006,16.9a1,1,0,0,0-1.215-.165l-1.084.627a1,1,0,1,1-1-1.732l1.084-.626a1,1,0,0,0,.464-1.133,7.048,7.048,0,0,1,0-3.75A1,1,0,0,0,4.79,8.992L3.706,8.366a1,1,0,0,1,1-1.733l1.086.628A1,1,0,0,0,7.006,7.1a6.984,6.984,0,0,1,3.243-1.875A1,1,0,0,0,11,4.252V3a1,1,0,0,1,2,0V4.252a1,1,0,0,0,.751.969A6.984,6.984,0,0,1,16.994,7.1a1,1,0,0,0,1.215.165l1.084-.627a1,1,0,1,1,1,1.732l-1.084.626A1,1,0,0,0,18.746,10.125Z"/>
</svg>
`,R0=`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" id="settings-close-icon" class="settings-icon" viewBox="0 0 24 24" width="512" height="512">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
</svg>`,Oo=.001,D0=Oo*Oo,H0=32,Hs=["Stolen Necklace","Shader Lamp","Space Colors","Sinusoid"],Ae={showcase:Hs[xt.STOLEN_NECKLACE],int_mode:xt.STOLEN_NECKLACE,necklace:{number_of_jewels:24,configuration:13579652,string:"",show_solution_band:!0,show_solutions:!0,epsilon:.01,discrete:!0},sphere:{radius:15,segments:128,offset_octant:0,use_bad_on_sphere_check:!1,show_borsuk_ulam_proof_shape:!1},animation:{rotation_x:0,rotation_y:0,rotation_z:0,reset_speed:P0,trigger_reset:!1,run:!1},view:{stats_monitor_visible:!1,necklace_visible:!0,gauge_visible:!0,show_single_thiefs_region:!0,axes_visible:!0,mesh_visible:!1,faces_visible:!0},color:{scale_red:1,scale_green:1,scale_blue:1,alpha:1},capture:{},imprint:()=>ce.dispatchEvent(ce.SHOW_IMPRINT),radio:Hs[xt.STOLEN_NECKLACE],text:void 0};var wr,Mn,Ci,fA,Gt,Fn;const zs=class zs{constructor(){Xe(this,wr,void 0);Xe(this,Mn,void 0);Xe(this,Ci,void 0);Xe(this,fA,void 0);Xe(this,Gt,void 0);Xe(this,Fn,void 0);He(this,fA,new Jo),V(this,fA).domElement.id="gui",this.createSettingsIcon(),this.createShowHideListener(),this.createShowcaseFolder(),this.createNecklaceFolder(),this.createViewFolder(),this.createCaptureFolder()}static addRadioButtonsFolder(e,A,t,i,r=(s,a,o)=>{}){const s=e.addFolder(A);return zs.addRadioButtons(s,t,i,r),s}static addRadioButtons(e,A,t,i=(r,s,a)=>{}){const r=A;A={},t.forEach((s,a)=>{const o=`option_${a}`;A[o]=r===s}),t.forEach((s,a)=>{const o=`option_${a}`;e.add(A,o).name(s).listen().onChange(()=>{for(let l in A)A[l]=o===l;i(A,o,a)})})}createSettingsIcon(){var A,t;const e=document.createElement("DIV");e.innerHTML=L0+R0,He(this,Gt,e.querySelector("#settings-icon")),He(this,Fn,e.querySelector("#settings-close-icon")),V(this,Gt).classList.add("show"),V(this,fA).hide(),V(this,fA).domElement.insertAdjacentElement("beforeBegin",V(this,Gt)),V(this,Gt).insertAdjacentElement("afterEnd",V(this,Fn)),new $u(V(this,fA).domElement,(i,r)=>{const s=i.target;r===0&&!(s!=null&&s.classList.contains("transition"))&&(s!=null&&s.classList.contains("closed"))&&(V(this,fA).hide(),V(this,fA).close(),this.toggleSettings())}),(A=V(this,Gt))==null||A.addEventListener("click",()=>{this.toggleSettings(),V(this,fA).show(),V(this,fA).open()}),(t=V(this,Fn))==null||t.addEventListener("click",()=>{V(this,fA).$title.click()})}toggleSettings(){V(this,Gt).classList.toggle("show"),V(this,Fn).classList.toggle("show")}createShowHideListener(){window.addEventListener("keydown",e=>{(e.key==="h"||e.key==="H")&&(V(this,Ci)?V(this,fA).show():V(this,fA).hide(),He(this,Ci,!V(this,Ci)))})}createShowcaseFolder(){He(this,Mn,zs.addRadioButtonsFolder(V(this,fA),`Showcase: ${Ae.radio}`,Ae.radio,Hs,(e,A,t)=>{Ae.int_mode=t,ce.dispatchEvent(ce.CREATE_SPHERE),V(this,Mn).title(`Showcase: ${Hs[t]}`),V(this,Mn).close()})),V(this,Mn).close()}createNecklaceFolder(){const e=V(this,fA).addFolder("Necklace");e.add(Ae.necklace,"number_of_jewels",0,H0,1).name("Jewels").onChange(()=>{const t=2**Ae.necklace.number_of_jewels-1;Ae.necklace.configuration=Math.min(t,Ae.necklace.configuration),A.min(0).max(t).setValue(Ae.necklace.configuration),ce.dispatchEvent(ce.UPDATE_SPHERE_MATERIAL)});const A=e.add(Ae.necklace,"configuration",0,2**Ae.necklace.number_of_jewels-1,1).name("Configuration").onChange(()=>ce.dispatchEvent(ce.SET_NECKLACE_CONFIGURATION_BY_NUMBER));e.add(Ae.necklace,"string").name("String").onChange(()=>ce.dispatchEvent(ce.SET_NECKLACE_CONFIGURATION_BY_STRING)),e.add(Ae.necklace,"discrete").name("Discrete").onChange(()=>ce.dispatchEvent(ce.UPDATE_SPHERE_MATERIAL)),e.add(Ae.necklace,"show_solution_band").name("Solution Band").onChange(()=>ce.dispatchEvent(ce.UPDATE_SPHERE_MATERIAL)),e.add(Ae.necklace,"show_solutions").name("Solutions").onChange(()=>ce.dispatchEvent(ce.UPDATE_SPHERE_MATERIAL)),e.add(Ae.necklace,"epsilon",0,.15).name("epsilon").onChange(()=>ce.dispatchEvent(ce.UPDATE_SPHERE_MATERIAL)),e.close()}createViewFolder(){const e=V(this,fA).addFolder("View");e.add(Ae.view,"show_single_thiefs_region").name("Single Thief's Area").onChange(()=>ce.dispatchEvent(ce.UPDATE_SPHERE_MATERIAL)),e.add(Ae.view,"axes_visible").name("Axes").onChange(()=>ce.dispatchEvent(ce.UPDATE_VISIBLE)),e.add(Ae.view,"mesh_visible").name("Mesh").onChange(()=>ce.dispatchEvent(ce.UPDATE_VISIBLE)),e.add(Ae.view,"faces_visible").name("Faces").onChange(()=>ce.dispatchEvent(ce.UPDATE_VISIBLE)),e.close(),this.createSphereSubFolder(e),this.createControlsSubFolder(e),this.createColorSubFolder(e),this.createAnimationSubFolder(e)}createSphereSubFolder(e){const A=e.addFolder("Sphere");A.add(Ae.sphere,"radius",1,50,1).name("Radius").onChange(()=>ce.dispatchEvent(ce.CREATE_SPHERE)),A.add(Ae.sphere,"offset_octant",0,5,.1).name("Octant Offset").onChange(()=>ce.dispatchEvent(ce.CREATE_SPHERE)),A.add(Ae.sphere,"use_bad_on_sphere_check").name("Bad Check").onChange(()=>ce.dispatchEvent(ce.UPDATE_SPHERE_MATERIAL)),A.add(Ae.sphere,"show_borsuk_ulam_proof_shape").name("Borsuk-Ulam Proof").onChange(()=>ce.dispatchEvent(ce.UPDATE_SPHERE_MATERIAL)),A.add(Ae.sphere,"segments",3,511,1).name("Segments").onChange(()=>ce.dispatchEvent(ce.CREATE_SPHERE)),A.close()}createControlsSubFolder(e){const A=e.addFolder("Other Controls");A.add(Ae.view,"stats_monitor_visible").name("Monitor").onChange(()=>ce.dispatchEvent(ce.UPDATE_VISIBLE)),A.add(Ae.view,"necklace_visible").name("Necklace").onChange(()=>ce.dispatchEvent(ce.UPDATE_VISIBLE)),A.add(Ae.view,"gauge_visible").name("Gauge").onChange(()=>ce.dispatchEvent(ce.UPDATE_VISIBLE)),A.close()}createColorSubFolder(e){const A=e.addFolder("Color");A.add(Ae.color,"scale_red",0,1).name("Red").onChange(()=>ce.dispatchEvent(ce.UPDATE_SPHERE_MATERIAL)),A.add(Ae.color,"scale_green",0,1).name("Green").onChange(()=>ce.dispatchEvent(ce.UPDATE_SPHERE_MATERIAL)),A.add(Ae.color,"scale_blue",0,1).name("Blue").onChange(()=>ce.dispatchEvent(ce.UPDATE_SPHERE_MATERIAL)),A.add(Ae.color,"alpha",0,1).name("Alpha").onChange(()=>ce.dispatchEvent(ce.CREATE_SPHERE)),A.close()}createAnimationSubFolder(e){const A=e.addFolder("Animation"),t=.5;A.add(Ae.animation,"run").name("Rotate [Hz]").listen(),A.add(Ae.animation,"rotation_x",-t,t,.1).name("X").listen(),A.add(Ae.animation,"rotation_y",-t,t,.1).name("Y").listen(),A.add(Ae.animation,"rotation_z",-t,t,.1).name("Z").listen(),A.add(Ae.animation,"reset_speed").name("Reset Rotation"),A.close()}createCaptureFolder(){const e=V(this,fA).addFolder("Screen capture");new I0().isAvailable().then(i=>{i&&V(this,fA).add(Ae,"imprint").name("Imprint")}),e.close(),He(this,wr,e)}get captureFolder(){return V(this,wr)}};wr=new WeakMap,Mn=new WeakMap,Ci=new WeakMap,fA=new WeakMap,Gt=new WeakMap,Fn=new WeakMap;let Ps=zs;function P0(){Ae.animation.trigger_reset=!0,Ae.animation.run=!1,Ae.animation.rotation_x=0,Ae.animation.rotation_y=0,Ae.animation.rotation_z=0}const O0=`<svg xmlns="http://www.w3.org/2000/svg" id="light-icon" class="themes-icon" viewBox="0 0 24 24" width="512" height="512">
    <path d="M12,9c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3S10.35,9,12,9 M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5 S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1 s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0 c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95 c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41 L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41 s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06 c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"/>
</svg>`,N0=`<svg xmlns="http://www.w3.org/2000/svg" id="dark-icon" class="themes-icon" viewBox="0 0 24 24" width="512" height="512">
    <rect fill="none" height="24" width="24"/>
    <path d="M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19 c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36 c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"/>
</svg>`;var _t,xi,Ui;class G0{constructor(){Xe(this,_t,void 0);Xe(this,xi,void 0);Xe(this,Ui,void 0);const e=document.createElement("DIV");e.innerHTML=O0+N0,He(this,xi,e.querySelector("#light-icon")),He(this,Ui,e.querySelector("#dark-icon")),document.body.appendChild(e),e.addEventListener("click",()=>ce.dispatchEvent(ce.THEME_CHANGED))}initTheme(){He(this,_t,window.matchMedia("(prefers-color-scheme: dark)").matches),document.body.classList.add(V(this,_t)?"dark":"light"),(V(this,_t)?V(this,xi):V(this,Ui)).classList.add("show")}registerOnThemeChange(e){e.addEventListener(ce.THEME_CHANGED.toString(),()=>{this.onThemeChange(e)})}onThemeChange(e){const A=V(this,_t)?"dark":"light",t=V(this,_t)?"light":"dark";console.log(`old-theme: ${A} new-theme: ${t}`),e.classList.replace(A,t)||e.classList.add(t),He(this,_t,!V(this,_t)),V(this,xi).classList.toggle("show"),V(this,Ui).classList.toggle("show")}}_t=new WeakMap,xi=new WeakMap,Ui=new WeakMap;HTMLCanvasElement.prototype.getContext=function(n){return function(e,A){return A=A||{},A.preserveDrawingBuffer=!0,n.call(this,e,A)}}(HTMLCanvasElement.prototype.getContext);const vc=["All","Sphere","Necklace"];var yi,vr,Si,Ws,rf;class V0{constructor(e,A={all:void 0,sphere:void 0,necklace:void 0}){Xe(this,Ws);Xe(this,yi,void 0);Xe(this,vr,void 0);Xe(this,Si,void 0);He(this,yi,()=>document.body),_l(this,Ws,rf).call(this,e,A),document.addEventListener("keydown",t=>{t.altKey&&t.key==="s"&&(t.stopPropagation(),t.preventDefault(),this.capture())})}capture(e=V(this,yi)){console.log(`screenCapture ${e}`);const A=e();if(!A)throw new Error("No element to capture");setTimeout(()=>{const i=window.getComputedStyle(document.body).getPropertyValue("background-color");nf(A,{backgroundColor:i}).then(r=>{const s=document.createElement("a");s.href=r.toDataURL(),s.download="necklace.png",s.click()})},100)}}yi=new WeakMap,vr=new WeakMap,Si=new WeakMap,Ws=new WeakSet,rf=function(e,A){He(this,vr,[A.all,A.sphere,A.necklace]);const t=e.folder,i=e.property;i.selection=vc[0],He(this,Si,0),He(this,yi,()=>V(this,vr)[V(this,Si)]),i.on_capture_clicked=()=>this.capture(),Ps.addRadioButtons(t,i.selection,vc,(r,s,a)=>{He(this,Si,a)}),t.add(i,"on_capture_clicked").name("Click or press 'alt s'")};/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const nl="157",Jn={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},qn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},K0=0,Ec=1,k0=2,sf=1,z0=2,Nt=3,pn=0,KA=1,ft=2,cn=0,vi=1,Cc=2,xc=3,Uc=4,W0=5,gi=100,X0=101,Y0=102,yc=103,Sc=104,J0=200,q0=201,Z0=202,j0=203,af=204,of=205,$0=206,e_=207,A_=208,t_=209,n_=210,i_=0,r_=1,s_=2,No=3,a_=4,o_=5,l_=6,c_=7,lf=0,u_=1,h_=2,un=0,f_=1,d_=2,p_=3,g_=4,m_=5,cf=300,Ii=301,Li=302,Go=303,Vo=304,ia=306,Ko=1e3,dt=1001,ko=1002,GA=1003,Mc=1004,Ha=1005,tt=1006,B_=1007,mr=1008,hn=1009,__=1010,w_=1011,il=1012,uf=1013,sn=1014,an=1015,Br=1016,hf=1017,ff=1018,Hn=1020,v_=1021,pt=1023,E_=1024,C_=1025,Pn=1026,Ri=1027,x_=1028,df=1029,U_=1030,pf=1031,gf=1033,Pa=33776,Oa=33777,Na=33778,Ga=33779,Fc=35840,bc=35841,Tc=35842,Qc=35843,y_=36196,Ic=37492,Lc=37496,Rc=37808,Dc=37809,Hc=37810,Pc=37811,Oc=37812,Nc=37813,Gc=37814,Vc=37815,Kc=37816,kc=37817,zc=37818,Wc=37819,Xc=37820,Yc=37821,Va=36492,Jc=36494,qc=36495,S_=36283,Zc=36284,jc=36285,$c=36286,mf=3e3,On=3001,M_=3200,F_=3201,b_=0,T_=1,it="",yA="srgb",Wt="srgb-linear",rl="display-p3",ra="display-p3-linear",Os="linear",nA="srgb",Ns="rec709",Gs="p3",Ka=7680,Q_=519,I_=512,L_=513,R_=514,D_=515,H_=516,P_=517,O_=518,N_=519,eu=35044,Au="300 es",zo=1035,Kt=2e3,Vs=2001;class Vn{addEventListener(e,A){this._listeners===void 0&&(this._listeners={});const t=this._listeners;t[e]===void 0&&(t[e]=[]),t[e].indexOf(A)===-1&&t[e].push(A)}hasEventListener(e,A){if(this._listeners===void 0)return!1;const t=this._listeners;return t[e]!==void 0&&t[e].indexOf(A)!==-1}removeEventListener(e,A){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const r=i.indexOf(A);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const t=this._listeners[e.type];if(t!==void 0){e.target=this;const i=t.slice(0);for(let r=0,s=i.length;r<s;r++)i[r].call(this,e);e.target=null}}}const FA=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let tu=1234567;const lr=Math.PI/180,_r=180/Math.PI;function Pi(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,A=Math.random()*4294967295|0,t=Math.random()*4294967295|0;return(FA[n&255]+FA[n>>8&255]+FA[n>>16&255]+FA[n>>24&255]+"-"+FA[e&255]+FA[e>>8&255]+"-"+FA[e>>16&15|64]+FA[e>>24&255]+"-"+FA[A&63|128]+FA[A>>8&255]+"-"+FA[A>>16&255]+FA[A>>24&255]+FA[t&255]+FA[t>>8&255]+FA[t>>16&255]+FA[t>>24&255]).toLowerCase()}function LA(n,e,A){return Math.max(e,Math.min(A,n))}function sl(n,e){return(n%e+e)%e}function G_(n,e,A,t,i){return t+(n-e)*(i-t)/(A-e)}function V_(n,e,A){return n!==e?(A-n)/(e-n):0}function cr(n,e,A){return(1-A)*n+A*e}function K_(n,e,A,t){return cr(n,e,1-Math.exp(-A*t))}function k_(n,e=1){return e-Math.abs(sl(n,e*2)-e)}function z_(n,e,A){return n<=e?0:n>=A?1:(n=(n-e)/(A-e),n*n*(3-2*n))}function W_(n,e,A){return n<=e?0:n>=A?1:(n=(n-e)/(A-e),n*n*n*(n*(n*6-15)+10))}function X_(n,e){return n+Math.floor(Math.random()*(e-n+1))}function Y_(n,e){return n+Math.random()*(e-n)}function J_(n){return n*(.5-Math.random())}function q_(n){n!==void 0&&(tu=n);let e=tu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Z_(n){return n*lr}function j_(n){return n*_r}function Wo(n){return(n&n-1)===0&&n!==0}function $_(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Ks(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function ew(n,e,A,t,i){const r=Math.cos,s=Math.sin,a=r(A/2),o=s(A/2),l=r((e+t)/2),c=s((e+t)/2),u=r((e-t)/2),h=s((e-t)/2),p=r((t-e)/2),g=s((t-e)/2);switch(i){case"XYX":n.set(a*c,o*u,o*h,a*l);break;case"YZY":n.set(o*h,a*c,o*u,a*l);break;case"ZXZ":n.set(o*u,o*h,a*c,a*l);break;case"XZX":n.set(a*c,o*g,o*p,a*l);break;case"YXY":n.set(o*p,a*c,o*g,a*l);break;case"ZYZ":n.set(o*g,o*p,a*c,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function mi(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function HA(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Aw={DEG2RAD:lr,RAD2DEG:_r,generateUUID:Pi,clamp:LA,euclideanModulo:sl,mapLinear:G_,inverseLerp:V_,lerp:cr,damp:K_,pingpong:k_,smoothstep:z_,smootherstep:W_,randInt:X_,randFloat:Y_,randFloatSpread:J_,seededRandom:q_,degToRad:Z_,radToDeg:j_,isPowerOfTwo:Wo,ceilPowerOfTwo:$_,floorPowerOfTwo:Ks,setQuaternionFromProperEuler:ew,normalize:HA,denormalize:mi};class Fe{constructor(e=0,A=0){Fe.prototype.isVector2=!0,this.x=e,this.y=A}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,A){return this.x=e,this.y=A,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,A){switch(e){case 0:this.x=A;break;case 1:this.y=A;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,A){return this.x=e.x+A.x,this.y=e.y+A.y,this}addScaledVector(e,A){return this.x+=e.x*A,this.y+=e.y*A,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,A){return this.x=e.x-A.x,this.y=e.y-A.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const A=this.x,t=this.y,i=e.elements;return this.x=i[0]*A+i[3]*t+i[6],this.y=i[1]*A+i[4]*t+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,A){return this.x=Math.max(e.x,Math.min(A.x,this.x)),this.y=Math.max(e.y,Math.min(A.y,this.y)),this}clampScalar(e,A){return this.x=Math.max(e,Math.min(A,this.x)),this.y=Math.max(e,Math.min(A,this.y)),this}clampLength(e,A){const t=this.length();return this.divideScalar(t||1).multiplyScalar(Math.max(e,Math.min(A,t)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const A=Math.sqrt(this.lengthSq()*e.lengthSq());if(A===0)return Math.PI/2;const t=this.dot(e)/A;return Math.acos(LA(t,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const A=this.x-e.x,t=this.y-e.y;return A*A+t*t}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,A){return this.x+=(e.x-this.x)*A,this.y+=(e.y-this.y)*A,this}lerpVectors(e,A,t){return this.x=e.x+(A.x-e.x)*t,this.y=e.y+(A.y-e.y)*t,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,A=0){return this.x=e[A],this.y=e[A+1],this}toArray(e=[],A=0){return e[A]=this.x,e[A+1]=this.y,e}fromBufferAttribute(e,A){return this.x=e.getX(A),this.y=e.getY(A),this}rotateAround(e,A){const t=Math.cos(A),i=Math.sin(A),r=this.x-e.x,s=this.y-e.y;return this.x=r*t-s*i+e.x,this.y=r*i+s*t+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ke{constructor(e,A,t,i,r,s,a,o,l){Ke.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,A,t,i,r,s,a,o,l)}set(e,A,t,i,r,s,a,o,l){const c=this.elements;return c[0]=e,c[1]=i,c[2]=a,c[3]=A,c[4]=r,c[5]=o,c[6]=t,c[7]=s,c[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const A=this.elements,t=e.elements;return A[0]=t[0],A[1]=t[1],A[2]=t[2],A[3]=t[3],A[4]=t[4],A[5]=t[5],A[6]=t[6],A[7]=t[7],A[8]=t[8],this}extractBasis(e,A,t){return e.setFromMatrix3Column(this,0),A.setFromMatrix3Column(this,1),t.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const A=e.elements;return this.set(A[0],A[4],A[8],A[1],A[5],A[9],A[2],A[6],A[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,A){const t=e.elements,i=A.elements,r=this.elements,s=t[0],a=t[3],o=t[6],l=t[1],c=t[4],u=t[7],h=t[2],p=t[5],g=t[8],m=i[0],d=i[3],f=i[6],v=i[1],w=i[4],E=i[7],x=i[2],U=i[5],y=i[8];return r[0]=s*m+a*v+o*x,r[3]=s*d+a*w+o*U,r[6]=s*f+a*E+o*y,r[1]=l*m+c*v+u*x,r[4]=l*d+c*w+u*U,r[7]=l*f+c*E+u*y,r[2]=h*m+p*v+g*x,r[5]=h*d+p*w+g*U,r[8]=h*f+p*E+g*y,this}multiplyScalar(e){const A=this.elements;return A[0]*=e,A[3]*=e,A[6]*=e,A[1]*=e,A[4]*=e,A[7]*=e,A[2]*=e,A[5]*=e,A[8]*=e,this}determinant(){const e=this.elements,A=e[0],t=e[1],i=e[2],r=e[3],s=e[4],a=e[5],o=e[6],l=e[7],c=e[8];return A*s*c-A*a*l-t*r*c+t*a*o+i*r*l-i*s*o}invert(){const e=this.elements,A=e[0],t=e[1],i=e[2],r=e[3],s=e[4],a=e[5],o=e[6],l=e[7],c=e[8],u=c*s-a*l,h=a*o-c*r,p=l*r-s*o,g=A*u+t*h+i*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const m=1/g;return e[0]=u*m,e[1]=(i*l-c*t)*m,e[2]=(a*t-i*s)*m,e[3]=h*m,e[4]=(c*A-i*o)*m,e[5]=(i*r-a*A)*m,e[6]=p*m,e[7]=(t*o-l*A)*m,e[8]=(s*A-t*r)*m,this}transpose(){let e;const A=this.elements;return e=A[1],A[1]=A[3],A[3]=e,e=A[2],A[2]=A[6],A[6]=e,e=A[5],A[5]=A[7],A[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const A=this.elements;return e[0]=A[0],e[1]=A[3],e[2]=A[6],e[3]=A[1],e[4]=A[4],e[5]=A[7],e[6]=A[2],e[7]=A[5],e[8]=A[8],this}setUvTransform(e,A,t,i,r,s,a){const o=Math.cos(r),l=Math.sin(r);return this.set(t*o,t*l,-t*(o*s+l*a)+s+e,-i*l,i*o,-i*(-l*s+o*a)+a+A,0,0,1),this}scale(e,A){return this.premultiply(ka.makeScale(e,A)),this}rotate(e){return this.premultiply(ka.makeRotation(-e)),this}translate(e,A){return this.premultiply(ka.makeTranslation(e,A)),this}makeTranslation(e,A){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,A,0,0,1),this}makeRotation(e){const A=Math.cos(e),t=Math.sin(e);return this.set(A,-t,0,t,A,0,0,0,1),this}makeScale(e,A){return this.set(e,0,0,0,A,0,0,0,1),this}equals(e){const A=this.elements,t=e.elements;for(let i=0;i<9;i++)if(A[i]!==t[i])return!1;return!0}fromArray(e,A=0){for(let t=0;t<9;t++)this.elements[t]=e[t+A];return this}toArray(e=[],A=0){const t=this.elements;return e[A]=t[0],e[A+1]=t[1],e[A+2]=t[2],e[A+3]=t[3],e[A+4]=t[4],e[A+5]=t[5],e[A+6]=t[6],e[A+7]=t[7],e[A+8]=t[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ka=new Ke;function Bf(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function ks(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function tw(){const n=ks("canvas");return n.style.display="block",n}const nu={};function ur(n){n in nu||(nu[n]=!0,console.warn(n))}const iu=new Ke().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),ru=new Ke().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),$r={[Wt]:{transfer:Os,primaries:Ns,toReference:n=>n,fromReference:n=>n},[yA]:{transfer:nA,primaries:Ns,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[ra]:{transfer:Os,primaries:Gs,toReference:n=>n.applyMatrix3(ru),fromReference:n=>n.applyMatrix3(iu)},[rl]:{transfer:nA,primaries:Gs,toReference:n=>n.convertSRGBToLinear().applyMatrix3(ru),fromReference:n=>n.applyMatrix3(iu).convertLinearToSRGB()}},nw=new Set([Wt,ra]),Ze={enabled:!0,_workingColorSpace:Wt,get legacyMode(){return console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),!this.enabled},set legacyMode(n){console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),this.enabled=!n},get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!nw.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,A){if(this.enabled===!1||e===A||!e||!A)return n;const t=$r[e].toReference,i=$r[A].fromReference;return i(t(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return $r[n].primaries},getTransfer:function(n){return n===it?Os:$r[n].transfer}};function Ei(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function za(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Zn;class _f{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let A;if(e instanceof HTMLCanvasElement)A=e;else{Zn===void 0&&(Zn=ks("canvas")),Zn.width=e.width,Zn.height=e.height;const t=Zn.getContext("2d");e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),A=Zn}return A.width>2048||A.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),A.toDataURL("image/jpeg",.6)):A.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const A=ks("canvas");A.width=e.width,A.height=e.height;const t=A.getContext("2d");t.drawImage(e,0,0,e.width,e.height);const i=t.getImageData(0,0,e.width,e.height),r=i.data;for(let s=0;s<r.length;s++)r[s]=Ei(r[s]/255)*255;return t.putImageData(i,0,0),A}else if(e.data){const A=e.data.slice(0);for(let t=0;t<A.length;t++)A instanceof Uint8Array||A instanceof Uint8ClampedArray?A[t]=Math.floor(Ei(A[t]/255)*255):A[t]=Ei(A[t]);return{data:A,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let iw=0;class wf{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:iw++}),this.uuid=Pi(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const A=e===void 0||typeof e=="string";if(!A&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const t={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let s=0,a=i.length;s<a;s++)i[s].isDataTexture?r.push(Wa(i[s].image)):r.push(Wa(i[s]))}else r=Wa(i);t.url=r}return A||(e.images[this.uuid]=t),t}}function Wa(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?_f.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let rw=0;class qA extends Vn{constructor(e=qA.DEFAULT_IMAGE,A=qA.DEFAULT_MAPPING,t=dt,i=dt,r=tt,s=mr,a=pt,o=hn,l=qA.DEFAULT_ANISOTROPY,c=it){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:rw++}),this.uuid=Pi(),this.name="",this.source=new wf(e),this.mipmaps=[],this.mapping=A,this.channel=0,this.wrapS=t,this.wrapT=i,this.magFilter=r,this.minFilter=s,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=o,this.offset=new Fe(0,0),this.repeat=new Fe(1,1),this.center=new Fe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof c=="string"?this.colorSpace=c:(ur("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=c===On?yA:it),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const A=e===void 0||typeof e=="string";if(!A&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const t={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(t.userData=this.userData),A||(e.textures[this.uuid]=t),t}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==cf)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ko:e.x=e.x-Math.floor(e.x);break;case dt:e.x=e.x<0?0:1;break;case ko:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ko:e.y=e.y-Math.floor(e.y);break;case dt:e.y=e.y<0?0:1;break;case ko:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return ur("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===yA?On:mf}set encoding(e){ur("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===On?yA:it}}qA.DEFAULT_IMAGE=null;qA.DEFAULT_MAPPING=cf;qA.DEFAULT_ANISOTROPY=1;class MA{constructor(e=0,A=0,t=0,i=1){MA.prototype.isVector4=!0,this.x=e,this.y=A,this.z=t,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,A,t,i){return this.x=e,this.y=A,this.z=t,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,A){switch(e){case 0:this.x=A;break;case 1:this.y=A;break;case 2:this.z=A;break;case 3:this.w=A;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,A){return this.x=e.x+A.x,this.y=e.y+A.y,this.z=e.z+A.z,this.w=e.w+A.w,this}addScaledVector(e,A){return this.x+=e.x*A,this.y+=e.y*A,this.z+=e.z*A,this.w+=e.w*A,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,A){return this.x=e.x-A.x,this.y=e.y-A.y,this.z=e.z-A.z,this.w=e.w-A.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const A=this.x,t=this.y,i=this.z,r=this.w,s=e.elements;return this.x=s[0]*A+s[4]*t+s[8]*i+s[12]*r,this.y=s[1]*A+s[5]*t+s[9]*i+s[13]*r,this.z=s[2]*A+s[6]*t+s[10]*i+s[14]*r,this.w=s[3]*A+s[7]*t+s[11]*i+s[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const A=Math.sqrt(1-e.w*e.w);return A<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/A,this.y=e.y/A,this.z=e.z/A),this}setAxisAngleFromRotationMatrix(e){let A,t,i,r;const o=e.elements,l=o[0],c=o[4],u=o[8],h=o[1],p=o[5],g=o[9],m=o[2],d=o[6],f=o[10];if(Math.abs(c-h)<.01&&Math.abs(u-m)<.01&&Math.abs(g-d)<.01){if(Math.abs(c+h)<.1&&Math.abs(u+m)<.1&&Math.abs(g+d)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;A=Math.PI;const w=(l+1)/2,E=(p+1)/2,x=(f+1)/2,U=(c+h)/4,y=(u+m)/4,R=(g+d)/4;return w>E&&w>x?w<.01?(t=0,i=.707106781,r=.707106781):(t=Math.sqrt(w),i=U/t,r=y/t):E>x?E<.01?(t=.707106781,i=0,r=.707106781):(i=Math.sqrt(E),t=U/i,r=R/i):x<.01?(t=.707106781,i=.707106781,r=0):(r=Math.sqrt(x),t=y/r,i=R/r),this.set(t,i,r,A),this}let v=Math.sqrt((d-g)*(d-g)+(u-m)*(u-m)+(h-c)*(h-c));return Math.abs(v)<.001&&(v=1),this.x=(d-g)/v,this.y=(u-m)/v,this.z=(h-c)/v,this.w=Math.acos((l+p+f-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,A){return this.x=Math.max(e.x,Math.min(A.x,this.x)),this.y=Math.max(e.y,Math.min(A.y,this.y)),this.z=Math.max(e.z,Math.min(A.z,this.z)),this.w=Math.max(e.w,Math.min(A.w,this.w)),this}clampScalar(e,A){return this.x=Math.max(e,Math.min(A,this.x)),this.y=Math.max(e,Math.min(A,this.y)),this.z=Math.max(e,Math.min(A,this.z)),this.w=Math.max(e,Math.min(A,this.w)),this}clampLength(e,A){const t=this.length();return this.divideScalar(t||1).multiplyScalar(Math.max(e,Math.min(A,t)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,A){return this.x+=(e.x-this.x)*A,this.y+=(e.y-this.y)*A,this.z+=(e.z-this.z)*A,this.w+=(e.w-this.w)*A,this}lerpVectors(e,A,t){return this.x=e.x+(A.x-e.x)*t,this.y=e.y+(A.y-e.y)*t,this.z=e.z+(A.z-e.z)*t,this.w=e.w+(A.w-e.w)*t,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,A=0){return this.x=e[A],this.y=e[A+1],this.z=e[A+2],this.w=e[A+3],this}toArray(e=[],A=0){return e[A]=this.x,e[A+1]=this.y,e[A+2]=this.z,e[A+3]=this.w,e}fromBufferAttribute(e,A){return this.x=e.getX(A),this.y=e.getY(A),this.z=e.getZ(A),this.w=e.getW(A),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class sw extends Vn{constructor(e=1,A=1,t={}){super(),this.isRenderTarget=!0,this.width=e,this.height=A,this.depth=1,this.scissor=new MA(0,0,e,A),this.scissorTest=!1,this.viewport=new MA(0,0,e,A);const i={width:e,height:A,depth:1};t.encoding!==void 0&&(ur("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===On?yA:it),t=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:tt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},t),this.texture=new qA(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=t.generateMipmaps,this.texture.internalFormat=t.internalFormat,this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.depthTexture=t.depthTexture,this.samples=t.samples}setSize(e,A,t=1){(this.width!==e||this.height!==A||this.depth!==t)&&(this.width=e,this.height=A,this.depth=t,this.texture.image.width=e,this.texture.image.height=A,this.texture.image.depth=t,this.dispose()),this.viewport.set(0,0,e,A),this.scissor.set(0,0,e,A)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const A=Object.assign({},e.texture.image);return this.texture.source=new wf(A),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Nn extends sw{constructor(e=1,A=1,t={}){super(e,A,t),this.isWebGLRenderTarget=!0}}class vf extends qA{constructor(e=null,A=1,t=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:A,height:t,depth:i},this.magFilter=GA,this.minFilter=GA,this.wrapR=dt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class aw extends qA{constructor(e=null,A=1,t=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:A,height:t,depth:i},this.magFilter=GA,this.minFilter=GA,this.wrapR=dt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Gn{constructor(e=0,A=0,t=0,i=1){this.isQuaternion=!0,this._x=e,this._y=A,this._z=t,this._w=i}static slerpFlat(e,A,t,i,r,s,a){let o=t[i+0],l=t[i+1],c=t[i+2],u=t[i+3];const h=r[s+0],p=r[s+1],g=r[s+2],m=r[s+3];if(a===0){e[A+0]=o,e[A+1]=l,e[A+2]=c,e[A+3]=u;return}if(a===1){e[A+0]=h,e[A+1]=p,e[A+2]=g,e[A+3]=m;return}if(u!==m||o!==h||l!==p||c!==g){let d=1-a;const f=o*h+l*p+c*g+u*m,v=f>=0?1:-1,w=1-f*f;if(w>Number.EPSILON){const x=Math.sqrt(w),U=Math.atan2(x,f*v);d=Math.sin(d*U)/x,a=Math.sin(a*U)/x}const E=a*v;if(o=o*d+h*E,l=l*d+p*E,c=c*d+g*E,u=u*d+m*E,d===1-a){const x=1/Math.sqrt(o*o+l*l+c*c+u*u);o*=x,l*=x,c*=x,u*=x}}e[A]=o,e[A+1]=l,e[A+2]=c,e[A+3]=u}static multiplyQuaternionsFlat(e,A,t,i,r,s){const a=t[i],o=t[i+1],l=t[i+2],c=t[i+3],u=r[s],h=r[s+1],p=r[s+2],g=r[s+3];return e[A]=a*g+c*u+o*p-l*h,e[A+1]=o*g+c*h+l*u-a*p,e[A+2]=l*g+c*p+a*h-o*u,e[A+3]=c*g-a*u-o*h-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,A,t,i){return this._x=e,this._y=A,this._z=t,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,A){const t=e._x,i=e._y,r=e._z,s=e._order,a=Math.cos,o=Math.sin,l=a(t/2),c=a(i/2),u=a(r/2),h=o(t/2),p=o(i/2),g=o(r/2);switch(s){case"XYZ":this._x=h*c*u+l*p*g,this._y=l*p*u-h*c*g,this._z=l*c*g+h*p*u,this._w=l*c*u-h*p*g;break;case"YXZ":this._x=h*c*u+l*p*g,this._y=l*p*u-h*c*g,this._z=l*c*g-h*p*u,this._w=l*c*u+h*p*g;break;case"ZXY":this._x=h*c*u-l*p*g,this._y=l*p*u+h*c*g,this._z=l*c*g+h*p*u,this._w=l*c*u-h*p*g;break;case"ZYX":this._x=h*c*u-l*p*g,this._y=l*p*u+h*c*g,this._z=l*c*g-h*p*u,this._w=l*c*u+h*p*g;break;case"YZX":this._x=h*c*u+l*p*g,this._y=l*p*u+h*c*g,this._z=l*c*g-h*p*u,this._w=l*c*u-h*p*g;break;case"XZY":this._x=h*c*u-l*p*g,this._y=l*p*u-h*c*g,this._z=l*c*g+h*p*u,this._w=l*c*u+h*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s)}return A!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,A){const t=A/2,i=Math.sin(t);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(t),this._onChangeCallback(),this}setFromRotationMatrix(e){const A=e.elements,t=A[0],i=A[4],r=A[8],s=A[1],a=A[5],o=A[9],l=A[2],c=A[6],u=A[10],h=t+a+u;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(c-o)*p,this._y=(r-l)*p,this._z=(s-i)*p}else if(t>a&&t>u){const p=2*Math.sqrt(1+t-a-u);this._w=(c-o)/p,this._x=.25*p,this._y=(i+s)/p,this._z=(r+l)/p}else if(a>u){const p=2*Math.sqrt(1+a-t-u);this._w=(r-l)/p,this._x=(i+s)/p,this._y=.25*p,this._z=(o+c)/p}else{const p=2*Math.sqrt(1+u-t-a);this._w=(s-i)/p,this._x=(r+l)/p,this._y=(o+c)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,A){let t=e.dot(A)+1;return t<Number.EPSILON?(t=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=t):(this._x=0,this._y=-e.z,this._z=e.y,this._w=t)):(this._x=e.y*A.z-e.z*A.y,this._y=e.z*A.x-e.x*A.z,this._z=e.x*A.y-e.y*A.x,this._w=t),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(LA(this.dot(e),-1,1)))}rotateTowards(e,A){const t=this.angleTo(e);if(t===0)return this;const i=Math.min(1,A/t);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,A){const t=e._x,i=e._y,r=e._z,s=e._w,a=A._x,o=A._y,l=A._z,c=A._w;return this._x=t*c+s*a+i*l-r*o,this._y=i*c+s*o+r*a-t*l,this._z=r*c+s*l+t*o-i*a,this._w=s*c-t*a-i*o-r*l,this._onChangeCallback(),this}slerp(e,A){if(A===0)return this;if(A===1)return this.copy(e);const t=this._x,i=this._y,r=this._z,s=this._w;let a=s*e._w+t*e._x+i*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=s,this._x=t,this._y=i,this._z=r,this;const o=1-a*a;if(o<=Number.EPSILON){const p=1-A;return this._w=p*s+A*this._w,this._x=p*t+A*this._x,this._y=p*i+A*this._y,this._z=p*r+A*this._z,this.normalize(),this._onChangeCallback(),this}const l=Math.sqrt(o),c=Math.atan2(l,a),u=Math.sin((1-A)*c)/l,h=Math.sin(A*c)/l;return this._w=s*u+this._w*h,this._x=t*u+this._x*h,this._y=i*u+this._y*h,this._z=r*u+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,A,t){return this.copy(e).slerp(A,t)}random(){const e=Math.random(),A=Math.sqrt(1-e),t=Math.sqrt(e),i=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(A*Math.cos(i),t*Math.sin(r),t*Math.cos(r),A*Math.sin(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,A=0){return this._x=e[A],this._y=e[A+1],this._z=e[A+2],this._w=e[A+3],this._onChangeCallback(),this}toArray(e=[],A=0){return e[A]=this._x,e[A+1]=this._y,e[A+2]=this._z,e[A+3]=this._w,e}fromBufferAttribute(e,A){return this._x=e.getX(A),this._y=e.getY(A),this._z=e.getZ(A),this._w=e.getW(A),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class Q{constructor(e=0,A=0,t=0){Q.prototype.isVector3=!0,this.x=e,this.y=A,this.z=t}set(e,A,t){return t===void 0&&(t=this.z),this.x=e,this.y=A,this.z=t,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,A){switch(e){case 0:this.x=A;break;case 1:this.y=A;break;case 2:this.z=A;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,A){return this.x=e.x+A.x,this.y=e.y+A.y,this.z=e.z+A.z,this}addScaledVector(e,A){return this.x+=e.x*A,this.y+=e.y*A,this.z+=e.z*A,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,A){return this.x=e.x-A.x,this.y=e.y-A.y,this.z=e.z-A.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,A){return this.x=e.x*A.x,this.y=e.y*A.y,this.z=e.z*A.z,this}applyEuler(e){return this.applyQuaternion(su.setFromEuler(e))}applyAxisAngle(e,A){return this.applyQuaternion(su.setFromAxisAngle(e,A))}applyMatrix3(e){const A=this.x,t=this.y,i=this.z,r=e.elements;return this.x=r[0]*A+r[3]*t+r[6]*i,this.y=r[1]*A+r[4]*t+r[7]*i,this.z=r[2]*A+r[5]*t+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const A=this.x,t=this.y,i=this.z,r=e.elements,s=1/(r[3]*A+r[7]*t+r[11]*i+r[15]);return this.x=(r[0]*A+r[4]*t+r[8]*i+r[12])*s,this.y=(r[1]*A+r[5]*t+r[9]*i+r[13])*s,this.z=(r[2]*A+r[6]*t+r[10]*i+r[14])*s,this}applyQuaternion(e){const A=this.x,t=this.y,i=this.z,r=e.x,s=e.y,a=e.z,o=e.w,l=o*A+s*i-a*t,c=o*t+a*A-r*i,u=o*i+r*t-s*A,h=-r*A-s*t-a*i;return this.x=l*o+h*-r+c*-a-u*-s,this.y=c*o+h*-s+u*-r-l*-a,this.z=u*o+h*-a+l*-s-c*-r,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const A=this.x,t=this.y,i=this.z,r=e.elements;return this.x=r[0]*A+r[4]*t+r[8]*i,this.y=r[1]*A+r[5]*t+r[9]*i,this.z=r[2]*A+r[6]*t+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,A){return this.x=Math.max(e.x,Math.min(A.x,this.x)),this.y=Math.max(e.y,Math.min(A.y,this.y)),this.z=Math.max(e.z,Math.min(A.z,this.z)),this}clampScalar(e,A){return this.x=Math.max(e,Math.min(A,this.x)),this.y=Math.max(e,Math.min(A,this.y)),this.z=Math.max(e,Math.min(A,this.z)),this}clampLength(e,A){const t=this.length();return this.divideScalar(t||1).multiplyScalar(Math.max(e,Math.min(A,t)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,A){return this.x+=(e.x-this.x)*A,this.y+=(e.y-this.y)*A,this.z+=(e.z-this.z)*A,this}lerpVectors(e,A,t){return this.x=e.x+(A.x-e.x)*t,this.y=e.y+(A.y-e.y)*t,this.z=e.z+(A.z-e.z)*t,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,A){const t=e.x,i=e.y,r=e.z,s=A.x,a=A.y,o=A.z;return this.x=i*o-r*a,this.y=r*s-t*o,this.z=t*a-i*s,this}projectOnVector(e){const A=e.lengthSq();if(A===0)return this.set(0,0,0);const t=e.dot(this)/A;return this.copy(e).multiplyScalar(t)}projectOnPlane(e){return Xa.copy(this).projectOnVector(e),this.sub(Xa)}reflect(e){return this.sub(Xa.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const A=Math.sqrt(this.lengthSq()*e.lengthSq());if(A===0)return Math.PI/2;const t=this.dot(e)/A;return Math.acos(LA(t,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const A=this.x-e.x,t=this.y-e.y,i=this.z-e.z;return A*A+t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,A,t){const i=Math.sin(A)*e;return this.x=i*Math.sin(t),this.y=Math.cos(A)*e,this.z=i*Math.cos(t),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,A,t){return this.x=e*Math.sin(A),this.y=t,this.z=e*Math.cos(A),this}setFromMatrixPosition(e){const A=e.elements;return this.x=A[12],this.y=A[13],this.z=A[14],this}setFromMatrixScale(e){const A=this.setFromMatrixColumn(e,0).length(),t=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=A,this.y=t,this.z=i,this}setFromMatrixColumn(e,A){return this.fromArray(e.elements,A*4)}setFromMatrix3Column(e,A){return this.fromArray(e.elements,A*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,A=0){return this.x=e[A],this.y=e[A+1],this.z=e[A+2],this}toArray(e=[],A=0){return e[A]=this.x,e[A+1]=this.y,e[A+2]=this.z,e}fromBufferAttribute(e,A){return this.x=e.getX(A),this.y=e.getY(A),this.z=e.getZ(A),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,A=Math.random()*Math.PI*2,t=Math.sqrt(1-e**2);return this.x=t*Math.cos(A),this.y=t*Math.sin(A),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Xa=new Q,su=new Gn;class Ur{constructor(e=new Q(1/0,1/0,1/0),A=new Q(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=A}set(e,A){return this.min.copy(e),this.max.copy(A),this}setFromArray(e){this.makeEmpty();for(let A=0,t=e.length;A<t;A+=3)this.expandByPoint(Rt.fromArray(e,A));return this}setFromBufferAttribute(e){this.makeEmpty();for(let A=0,t=e.count;A<t;A++)this.expandByPoint(Rt.fromBufferAttribute(e,A));return this}setFromPoints(e){this.makeEmpty();for(let A=0,t=e.length;A<t;A++)this.expandByPoint(e[A]);return this}setFromCenterAndSize(e,A){const t=Rt.copy(A).multiplyScalar(.5);return this.min.copy(e).sub(t),this.max.copy(e).add(t),this}setFromObject(e,A=!1){return this.makeEmpty(),this.expandByObject(e,A)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,A=!1){if(e.updateWorldMatrix(!1,!1),e.boundingBox!==void 0)e.boundingBox===null&&e.computeBoundingBox(),jn.copy(e.boundingBox),jn.applyMatrix4(e.matrixWorld),this.union(jn);else{const i=e.geometry;if(i!==void 0)if(A&&i.attributes!==void 0&&i.attributes.position!==void 0){const r=i.attributes.position;for(let s=0,a=r.count;s<a;s++)Rt.fromBufferAttribute(r,s).applyMatrix4(e.matrixWorld),this.expandByPoint(Rt)}else i.boundingBox===null&&i.computeBoundingBox(),jn.copy(i.boundingBox),jn.applyMatrix4(e.matrixWorld),this.union(jn)}const t=e.children;for(let i=0,r=t.length;i<r;i++)this.expandByObject(t[i],A);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,A){return A.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Rt),Rt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let A,t;return e.normal.x>0?(A=e.normal.x*this.min.x,t=e.normal.x*this.max.x):(A=e.normal.x*this.max.x,t=e.normal.x*this.min.x),e.normal.y>0?(A+=e.normal.y*this.min.y,t+=e.normal.y*this.max.y):(A+=e.normal.y*this.max.y,t+=e.normal.y*this.min.y),e.normal.z>0?(A+=e.normal.z*this.min.z,t+=e.normal.z*this.max.z):(A+=e.normal.z*this.max.z,t+=e.normal.z*this.min.z),A<=-e.constant&&t>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(zi),es.subVectors(this.max,zi),$n.subVectors(e.a,zi),ei.subVectors(e.b,zi),Ai.subVectors(e.c,zi),Xt.subVectors(ei,$n),Yt.subVectors(Ai,ei),wn.subVectors($n,Ai);let A=[0,-Xt.z,Xt.y,0,-Yt.z,Yt.y,0,-wn.z,wn.y,Xt.z,0,-Xt.x,Yt.z,0,-Yt.x,wn.z,0,-wn.x,-Xt.y,Xt.x,0,-Yt.y,Yt.x,0,-wn.y,wn.x,0];return!Ya(A,$n,ei,Ai,es)||(A=[1,0,0,0,1,0,0,0,1],!Ya(A,$n,ei,Ai,es))?!1:(As.crossVectors(Xt,Yt),A=[As.x,As.y,As.z],Ya(A,$n,ei,Ai,es))}clampPoint(e,A){return A.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Rt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Rt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Lt[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Lt[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Lt[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Lt[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Lt[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Lt[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Lt[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Lt[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Lt),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Lt=[new Q,new Q,new Q,new Q,new Q,new Q,new Q,new Q],Rt=new Q,jn=new Ur,$n=new Q,ei=new Q,Ai=new Q,Xt=new Q,Yt=new Q,wn=new Q,zi=new Q,es=new Q,As=new Q,vn=new Q;function Ya(n,e,A,t,i){for(let r=0,s=n.length-3;r<=s;r+=3){vn.fromArray(n,r);const a=i.x*Math.abs(vn.x)+i.y*Math.abs(vn.y)+i.z*Math.abs(vn.z),o=e.dot(vn),l=A.dot(vn),c=t.dot(vn);if(Math.max(-Math.max(o,l,c),Math.min(o,l,c))>a)return!1}return!0}const ow=new Ur,Wi=new Q,Ja=new Q;let sa=class{constructor(e=new Q,A=-1){this.center=e,this.radius=A}set(e,A){return this.center.copy(e),this.radius=A,this}setFromPoints(e,A){const t=this.center;A!==void 0?t.copy(A):ow.setFromPoints(e).getCenter(t);let i=0;for(let r=0,s=e.length;r<s;r++)i=Math.max(i,t.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const A=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=A*A}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,A){const t=this.center.distanceToSquared(e);return A.copy(e),t>this.radius*this.radius&&(A.sub(this.center).normalize(),A.multiplyScalar(this.radius).add(this.center)),A}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Wi.subVectors(e,this.center);const A=Wi.lengthSq();if(A>this.radius*this.radius){const t=Math.sqrt(A),i=(t-this.radius)*.5;this.center.addScaledVector(Wi,i/t),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ja.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Wi.copy(e.center).add(Ja)),this.expandByPoint(Wi.copy(e.center).sub(Ja))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}};const Dt=new Q,qa=new Q,ts=new Q,Jt=new Q,Za=new Q,ns=new Q,ja=new Q;class aa{constructor(e=new Q,A=new Q(0,0,-1)){this.origin=e,this.direction=A}set(e,A){return this.origin.copy(e),this.direction.copy(A),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,A){return A.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Dt)),this}closestPointToPoint(e,A){A.subVectors(e,this.origin);const t=A.dot(this.direction);return t<0?A.copy(this.origin):A.copy(this.origin).addScaledVector(this.direction,t)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const A=Dt.subVectors(e,this.origin).dot(this.direction);return A<0?this.origin.distanceToSquared(e):(Dt.copy(this.origin).addScaledVector(this.direction,A),Dt.distanceToSquared(e))}distanceSqToSegment(e,A,t,i){qa.copy(e).add(A).multiplyScalar(.5),ts.copy(A).sub(e).normalize(),Jt.copy(this.origin).sub(qa);const r=e.distanceTo(A)*.5,s=-this.direction.dot(ts),a=Jt.dot(this.direction),o=-Jt.dot(ts),l=Jt.lengthSq(),c=Math.abs(1-s*s);let u,h,p,g;if(c>0)if(u=s*o-a,h=s*a-o,g=r*c,u>=0)if(h>=-g)if(h<=g){const m=1/c;u*=m,h*=m,p=u*(u+s*h+2*a)+h*(s*u+h+2*o)+l}else h=r,u=Math.max(0,-(s*h+a)),p=-u*u+h*(h+2*o)+l;else h=-r,u=Math.max(0,-(s*h+a)),p=-u*u+h*(h+2*o)+l;else h<=-g?(u=Math.max(0,-(-s*r+a)),h=u>0?-r:Math.min(Math.max(-r,-o),r),p=-u*u+h*(h+2*o)+l):h<=g?(u=0,h=Math.min(Math.max(-r,-o),r),p=h*(h+2*o)+l):(u=Math.max(0,-(s*r+a)),h=u>0?r:Math.min(Math.max(-r,-o),r),p=-u*u+h*(h+2*o)+l);else h=s>0?-r:r,u=Math.max(0,-(s*h+a)),p=-u*u+h*(h+2*o)+l;return t&&t.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(qa).addScaledVector(ts,h),p}intersectSphere(e,A){Dt.subVectors(e.center,this.origin);const t=Dt.dot(this.direction),i=Dt.dot(Dt)-t*t,r=e.radius*e.radius;if(i>r)return null;const s=Math.sqrt(r-i),a=t-s,o=t+s;return o<0?null:a<0?this.at(o,A):this.at(a,A)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const A=e.normal.dot(this.direction);if(A===0)return e.distanceToPoint(this.origin)===0?0:null;const t=-(this.origin.dot(e.normal)+e.constant)/A;return t>=0?t:null}intersectPlane(e,A){const t=this.distanceToPlane(e);return t===null?null:this.at(t,A)}intersectsPlane(e){const A=e.distanceToPoint(this.origin);return A===0||e.normal.dot(this.direction)*A<0}intersectBox(e,A){let t,i,r,s,a,o;const l=1/this.direction.x,c=1/this.direction.y,u=1/this.direction.z,h=this.origin;return l>=0?(t=(e.min.x-h.x)*l,i=(e.max.x-h.x)*l):(t=(e.max.x-h.x)*l,i=(e.min.x-h.x)*l),c>=0?(r=(e.min.y-h.y)*c,s=(e.max.y-h.y)*c):(r=(e.max.y-h.y)*c,s=(e.min.y-h.y)*c),t>s||r>i||((r>t||isNaN(t))&&(t=r),(s<i||isNaN(i))&&(i=s),u>=0?(a=(e.min.z-h.z)*u,o=(e.max.z-h.z)*u):(a=(e.max.z-h.z)*u,o=(e.min.z-h.z)*u),t>o||a>i)||((a>t||t!==t)&&(t=a),(o<i||i!==i)&&(i=o),i<0)?null:this.at(t>=0?t:i,A)}intersectsBox(e){return this.intersectBox(e,Dt)!==null}intersectTriangle(e,A,t,i,r){Za.subVectors(A,e),ns.subVectors(t,e),ja.crossVectors(Za,ns);let s=this.direction.dot(ja),a;if(s>0){if(i)return null;a=1}else if(s<0)a=-1,s=-s;else return null;Jt.subVectors(this.origin,e);const o=a*this.direction.dot(ns.crossVectors(Jt,ns));if(o<0)return null;const l=a*this.direction.dot(Za.cross(Jt));if(l<0||o+l>s)return null;const c=-a*Jt.dot(ja);return c<0?null:this.at(c/s,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class CA{constructor(e,A,t,i,r,s,a,o,l,c,u,h,p,g,m,d){CA.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,A,t,i,r,s,a,o,l,c,u,h,p,g,m,d)}set(e,A,t,i,r,s,a,o,l,c,u,h,p,g,m,d){const f=this.elements;return f[0]=e,f[4]=A,f[8]=t,f[12]=i,f[1]=r,f[5]=s,f[9]=a,f[13]=o,f[2]=l,f[6]=c,f[10]=u,f[14]=h,f[3]=p,f[7]=g,f[11]=m,f[15]=d,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new CA().fromArray(this.elements)}copy(e){const A=this.elements,t=e.elements;return A[0]=t[0],A[1]=t[1],A[2]=t[2],A[3]=t[3],A[4]=t[4],A[5]=t[5],A[6]=t[6],A[7]=t[7],A[8]=t[8],A[9]=t[9],A[10]=t[10],A[11]=t[11],A[12]=t[12],A[13]=t[13],A[14]=t[14],A[15]=t[15],this}copyPosition(e){const A=this.elements,t=e.elements;return A[12]=t[12],A[13]=t[13],A[14]=t[14],this}setFromMatrix3(e){const A=e.elements;return this.set(A[0],A[3],A[6],0,A[1],A[4],A[7],0,A[2],A[5],A[8],0,0,0,0,1),this}extractBasis(e,A,t){return e.setFromMatrixColumn(this,0),A.setFromMatrixColumn(this,1),t.setFromMatrixColumn(this,2),this}makeBasis(e,A,t){return this.set(e.x,A.x,t.x,0,e.y,A.y,t.y,0,e.z,A.z,t.z,0,0,0,0,1),this}extractRotation(e){const A=this.elements,t=e.elements,i=1/ti.setFromMatrixColumn(e,0).length(),r=1/ti.setFromMatrixColumn(e,1).length(),s=1/ti.setFromMatrixColumn(e,2).length();return A[0]=t[0]*i,A[1]=t[1]*i,A[2]=t[2]*i,A[3]=0,A[4]=t[4]*r,A[5]=t[5]*r,A[6]=t[6]*r,A[7]=0,A[8]=t[8]*s,A[9]=t[9]*s,A[10]=t[10]*s,A[11]=0,A[12]=0,A[13]=0,A[14]=0,A[15]=1,this}makeRotationFromEuler(e){const A=this.elements,t=e.x,i=e.y,r=e.z,s=Math.cos(t),a=Math.sin(t),o=Math.cos(i),l=Math.sin(i),c=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const h=s*c,p=s*u,g=a*c,m=a*u;A[0]=o*c,A[4]=-o*u,A[8]=l,A[1]=p+g*l,A[5]=h-m*l,A[9]=-a*o,A[2]=m-h*l,A[6]=g+p*l,A[10]=s*o}else if(e.order==="YXZ"){const h=o*c,p=o*u,g=l*c,m=l*u;A[0]=h+m*a,A[4]=g*a-p,A[8]=s*l,A[1]=s*u,A[5]=s*c,A[9]=-a,A[2]=p*a-g,A[6]=m+h*a,A[10]=s*o}else if(e.order==="ZXY"){const h=o*c,p=o*u,g=l*c,m=l*u;A[0]=h-m*a,A[4]=-s*u,A[8]=g+p*a,A[1]=p+g*a,A[5]=s*c,A[9]=m-h*a,A[2]=-s*l,A[6]=a,A[10]=s*o}else if(e.order==="ZYX"){const h=s*c,p=s*u,g=a*c,m=a*u;A[0]=o*c,A[4]=g*l-p,A[8]=h*l+m,A[1]=o*u,A[5]=m*l+h,A[9]=p*l-g,A[2]=-l,A[6]=a*o,A[10]=s*o}else if(e.order==="YZX"){const h=s*o,p=s*l,g=a*o,m=a*l;A[0]=o*c,A[4]=m-h*u,A[8]=g*u+p,A[1]=u,A[5]=s*c,A[9]=-a*c,A[2]=-l*c,A[6]=p*u+g,A[10]=h-m*u}else if(e.order==="XZY"){const h=s*o,p=s*l,g=a*o,m=a*l;A[0]=o*c,A[4]=-u,A[8]=l*c,A[1]=h*u+m,A[5]=s*c,A[9]=p*u-g,A[2]=g*u-p,A[6]=a*c,A[10]=m*u+h}return A[3]=0,A[7]=0,A[11]=0,A[12]=0,A[13]=0,A[14]=0,A[15]=1,this}makeRotationFromQuaternion(e){return this.compose(lw,e,cw)}lookAt(e,A,t){const i=this.elements;return XA.subVectors(e,A),XA.lengthSq()===0&&(XA.z=1),XA.normalize(),qt.crossVectors(t,XA),qt.lengthSq()===0&&(Math.abs(t.z)===1?XA.x+=1e-4:XA.z+=1e-4,XA.normalize(),qt.crossVectors(t,XA)),qt.normalize(),is.crossVectors(XA,qt),i[0]=qt.x,i[4]=is.x,i[8]=XA.x,i[1]=qt.y,i[5]=is.y,i[9]=XA.y,i[2]=qt.z,i[6]=is.z,i[10]=XA.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,A){const t=e.elements,i=A.elements,r=this.elements,s=t[0],a=t[4],o=t[8],l=t[12],c=t[1],u=t[5],h=t[9],p=t[13],g=t[2],m=t[6],d=t[10],f=t[14],v=t[3],w=t[7],E=t[11],x=t[15],U=i[0],y=i[4],R=i[8],B=i[12],M=i[1],z=i[5],Y=i[9],W=i[13],T=i[2],N=i[6],X=i[10],G=i[14],ee=i[3],J=i[7],q=i[11],I=i[15];return r[0]=s*U+a*M+o*T+l*ee,r[4]=s*y+a*z+o*N+l*J,r[8]=s*R+a*Y+o*X+l*q,r[12]=s*B+a*W+o*G+l*I,r[1]=c*U+u*M+h*T+p*ee,r[5]=c*y+u*z+h*N+p*J,r[9]=c*R+u*Y+h*X+p*q,r[13]=c*B+u*W+h*G+p*I,r[2]=g*U+m*M+d*T+f*ee,r[6]=g*y+m*z+d*N+f*J,r[10]=g*R+m*Y+d*X+f*q,r[14]=g*B+m*W+d*G+f*I,r[3]=v*U+w*M+E*T+x*ee,r[7]=v*y+w*z+E*N+x*J,r[11]=v*R+w*Y+E*X+x*q,r[15]=v*B+w*W+E*G+x*I,this}multiplyScalar(e){const A=this.elements;return A[0]*=e,A[4]*=e,A[8]*=e,A[12]*=e,A[1]*=e,A[5]*=e,A[9]*=e,A[13]*=e,A[2]*=e,A[6]*=e,A[10]*=e,A[14]*=e,A[3]*=e,A[7]*=e,A[11]*=e,A[15]*=e,this}determinant(){const e=this.elements,A=e[0],t=e[4],i=e[8],r=e[12],s=e[1],a=e[5],o=e[9],l=e[13],c=e[2],u=e[6],h=e[10],p=e[14],g=e[3],m=e[7],d=e[11],f=e[15];return g*(+r*o*u-i*l*u-r*a*h+t*l*h+i*a*p-t*o*p)+m*(+A*o*p-A*l*h+r*s*h-i*s*p+i*l*c-r*o*c)+d*(+A*l*u-A*a*p-r*s*u+t*s*p+r*a*c-t*l*c)+f*(-i*a*c-A*o*u+A*a*h+i*s*u-t*s*h+t*o*c)}transpose(){const e=this.elements;let A;return A=e[1],e[1]=e[4],e[4]=A,A=e[2],e[2]=e[8],e[8]=A,A=e[6],e[6]=e[9],e[9]=A,A=e[3],e[3]=e[12],e[12]=A,A=e[7],e[7]=e[13],e[13]=A,A=e[11],e[11]=e[14],e[14]=A,this}setPosition(e,A,t){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=A,i[14]=t),this}invert(){const e=this.elements,A=e[0],t=e[1],i=e[2],r=e[3],s=e[4],a=e[5],o=e[6],l=e[7],c=e[8],u=e[9],h=e[10],p=e[11],g=e[12],m=e[13],d=e[14],f=e[15],v=u*d*l-m*h*l+m*o*p-a*d*p-u*o*f+a*h*f,w=g*h*l-c*d*l-g*o*p+s*d*p+c*o*f-s*h*f,E=c*m*l-g*u*l+g*a*p-s*m*p-c*a*f+s*u*f,x=g*u*o-c*m*o-g*a*h+s*m*h+c*a*d-s*u*d,U=A*v+t*w+i*E+r*x;if(U===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const y=1/U;return e[0]=v*y,e[1]=(m*h*r-u*d*r-m*i*p+t*d*p+u*i*f-t*h*f)*y,e[2]=(a*d*r-m*o*r+m*i*l-t*d*l-a*i*f+t*o*f)*y,e[3]=(u*o*r-a*h*r-u*i*l+t*h*l+a*i*p-t*o*p)*y,e[4]=w*y,e[5]=(c*d*r-g*h*r+g*i*p-A*d*p-c*i*f+A*h*f)*y,e[6]=(g*o*r-s*d*r-g*i*l+A*d*l+s*i*f-A*o*f)*y,e[7]=(s*h*r-c*o*r+c*i*l-A*h*l-s*i*p+A*o*p)*y,e[8]=E*y,e[9]=(g*u*r-c*m*r-g*t*p+A*m*p+c*t*f-A*u*f)*y,e[10]=(s*m*r-g*a*r+g*t*l-A*m*l-s*t*f+A*a*f)*y,e[11]=(c*a*r-s*u*r-c*t*l+A*u*l+s*t*p-A*a*p)*y,e[12]=x*y,e[13]=(c*m*i-g*u*i+g*t*h-A*m*h-c*t*d+A*u*d)*y,e[14]=(g*a*i-s*m*i-g*t*o+A*m*o+s*t*d-A*a*d)*y,e[15]=(s*u*i-c*a*i+c*t*o-A*u*o-s*t*h+A*a*h)*y,this}scale(e){const A=this.elements,t=e.x,i=e.y,r=e.z;return A[0]*=t,A[4]*=i,A[8]*=r,A[1]*=t,A[5]*=i,A[9]*=r,A[2]*=t,A[6]*=i,A[10]*=r,A[3]*=t,A[7]*=i,A[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,A=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],t=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(A,t,i))}makeTranslation(e,A,t){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,A,0,0,1,t,0,0,0,1),this}makeRotationX(e){const A=Math.cos(e),t=Math.sin(e);return this.set(1,0,0,0,0,A,-t,0,0,t,A,0,0,0,0,1),this}makeRotationY(e){const A=Math.cos(e),t=Math.sin(e);return this.set(A,0,t,0,0,1,0,0,-t,0,A,0,0,0,0,1),this}makeRotationZ(e){const A=Math.cos(e),t=Math.sin(e);return this.set(A,-t,0,0,t,A,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,A){const t=Math.cos(A),i=Math.sin(A),r=1-t,s=e.x,a=e.y,o=e.z,l=r*s,c=r*a;return this.set(l*s+t,l*a-i*o,l*o+i*a,0,l*a+i*o,c*a+t,c*o-i*s,0,l*o-i*a,c*o+i*s,r*o*o+t,0,0,0,0,1),this}makeScale(e,A,t){return this.set(e,0,0,0,0,A,0,0,0,0,t,0,0,0,0,1),this}makeShear(e,A,t,i,r,s){return this.set(1,t,r,0,e,1,s,0,A,i,1,0,0,0,0,1),this}compose(e,A,t){const i=this.elements,r=A._x,s=A._y,a=A._z,o=A._w,l=r+r,c=s+s,u=a+a,h=r*l,p=r*c,g=r*u,m=s*c,d=s*u,f=a*u,v=o*l,w=o*c,E=o*u,x=t.x,U=t.y,y=t.z;return i[0]=(1-(m+f))*x,i[1]=(p+E)*x,i[2]=(g-w)*x,i[3]=0,i[4]=(p-E)*U,i[5]=(1-(h+f))*U,i[6]=(d+v)*U,i[7]=0,i[8]=(g+w)*y,i[9]=(d-v)*y,i[10]=(1-(h+m))*y,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,A,t){const i=this.elements;let r=ti.set(i[0],i[1],i[2]).length();const s=ti.set(i[4],i[5],i[6]).length(),a=ti.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],at.copy(this);const l=1/r,c=1/s,u=1/a;return at.elements[0]*=l,at.elements[1]*=l,at.elements[2]*=l,at.elements[4]*=c,at.elements[5]*=c,at.elements[6]*=c,at.elements[8]*=u,at.elements[9]*=u,at.elements[10]*=u,A.setFromRotationMatrix(at),t.x=r,t.y=s,t.z=a,this}makePerspective(e,A,t,i,r,s,a=Kt){const o=this.elements,l=2*r/(A-e),c=2*r/(t-i),u=(A+e)/(A-e),h=(t+i)/(t-i);let p,g;if(a===Kt)p=-(s+r)/(s-r),g=-2*s*r/(s-r);else if(a===Vs)p=-s/(s-r),g=-s*r/(s-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return o[0]=l,o[4]=0,o[8]=u,o[12]=0,o[1]=0,o[5]=c,o[9]=h,o[13]=0,o[2]=0,o[6]=0,o[10]=p,o[14]=g,o[3]=0,o[7]=0,o[11]=-1,o[15]=0,this}makeOrthographic(e,A,t,i,r,s,a=Kt){const o=this.elements,l=1/(A-e),c=1/(t-i),u=1/(s-r),h=(A+e)*l,p=(t+i)*c;let g,m;if(a===Kt)g=(s+r)*u,m=-2*u;else if(a===Vs)g=r*u,m=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return o[0]=2*l,o[4]=0,o[8]=0,o[12]=-h,o[1]=0,o[5]=2*c,o[9]=0,o[13]=-p,o[2]=0,o[6]=0,o[10]=m,o[14]=-g,o[3]=0,o[7]=0,o[11]=0,o[15]=1,this}equals(e){const A=this.elements,t=e.elements;for(let i=0;i<16;i++)if(A[i]!==t[i])return!1;return!0}fromArray(e,A=0){for(let t=0;t<16;t++)this.elements[t]=e[t+A];return this}toArray(e=[],A=0){const t=this.elements;return e[A]=t[0],e[A+1]=t[1],e[A+2]=t[2],e[A+3]=t[3],e[A+4]=t[4],e[A+5]=t[5],e[A+6]=t[6],e[A+7]=t[7],e[A+8]=t[8],e[A+9]=t[9],e[A+10]=t[10],e[A+11]=t[11],e[A+12]=t[12],e[A+13]=t[13],e[A+14]=t[14],e[A+15]=t[15],e}}const ti=new Q,at=new CA,lw=new Q(0,0,0),cw=new Q(1,1,1),qt=new Q,is=new Q,XA=new Q,au=new CA,ou=new Gn;class oa{constructor(e=0,A=0,t=0,i=oa.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=A,this._z=t,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,A,t,i=this._order){return this._x=e,this._y=A,this._z=t,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,A=this._order,t=!0){const i=e.elements,r=i[0],s=i[4],a=i[8],o=i[1],l=i[5],c=i[9],u=i[2],h=i[6],p=i[10];switch(A){case"XYZ":this._y=Math.asin(LA(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-c,p),this._z=Math.atan2(-s,r)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-LA(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(o,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(LA(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-s,l)):(this._y=0,this._z=Math.atan2(o,r));break;case"ZYX":this._y=Math.asin(-LA(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(o,r)):(this._x=0,this._z=Math.atan2(-s,l));break;case"YZX":this._z=Math.asin(LA(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-c,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-LA(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-c,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+A)}return this._order=A,t===!0&&this._onChangeCallback(),this}setFromQuaternion(e,A,t){return au.makeRotationFromQuaternion(e),this.setFromRotationMatrix(au,A,t)}setFromVector3(e,A=this._order){return this.set(e.x,e.y,e.z,A)}reorder(e){return ou.setFromEuler(this),this.setFromQuaternion(ou,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],A=0){return e[A]=this._x,e[A+1]=this._y,e[A+2]=this._z,e[A+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}oa.DEFAULT_ORDER="XYZ";class al{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let uw=0;const lu=new Q,ni=new Gn,Ht=new CA,rs=new Q,Xi=new Q,hw=new Q,fw=new Gn,cu=new Q(1,0,0),uu=new Q(0,1,0),hu=new Q(0,0,1),dw={type:"added"},pw={type:"removed"};class kA extends Vn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:uw++}),this.uuid=Pi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=kA.DEFAULT_UP.clone();const e=new Q,A=new oa,t=new Gn,i=new Q(1,1,1);function r(){t.setFromEuler(A,!1)}function s(){A.setFromQuaternion(t,void 0,!1)}A._onChange(r),t._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:A},quaternion:{configurable:!0,enumerable:!0,value:t},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new CA},normalMatrix:{value:new Ke}}),this.matrix=new CA,this.matrixWorld=new CA,this.matrixAutoUpdate=kA.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=kA.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.layers=new al,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,A){this.quaternion.setFromAxisAngle(e,A)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,A){return ni.setFromAxisAngle(e,A),this.quaternion.multiply(ni),this}rotateOnWorldAxis(e,A){return ni.setFromAxisAngle(e,A),this.quaternion.premultiply(ni),this}rotateX(e){return this.rotateOnAxis(cu,e)}rotateY(e){return this.rotateOnAxis(uu,e)}rotateZ(e){return this.rotateOnAxis(hu,e)}translateOnAxis(e,A){return lu.copy(e).applyQuaternion(this.quaternion),this.position.add(lu.multiplyScalar(A)),this}translateX(e){return this.translateOnAxis(cu,e)}translateY(e){return this.translateOnAxis(uu,e)}translateZ(e){return this.translateOnAxis(hu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ht.copy(this.matrixWorld).invert())}lookAt(e,A,t){e.isVector3?rs.copy(e):rs.set(e,A,t);const i=this.parent;this.updateWorldMatrix(!0,!1),Xi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ht.lookAt(Xi,rs,this.up):Ht.lookAt(rs,Xi,this.up),this.quaternion.setFromRotationMatrix(Ht),i&&(Ht.extractRotation(i.matrixWorld),ni.setFromRotationMatrix(Ht),this.quaternion.premultiply(ni.invert()))}add(e){if(arguments.length>1){for(let A=0;A<arguments.length;A++)this.add(arguments[A]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(dw)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.remove(arguments[t]);return this}const A=this.children.indexOf(e);return A!==-1&&(e.parent=null,this.children.splice(A,1),e.dispatchEvent(pw)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ht.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ht.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ht),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,A){if(this[e]===A)return this;for(let t=0,i=this.children.length;t<i;t++){const s=this.children[t].getObjectByProperty(e,A);if(s!==void 0)return s}}getObjectsByProperty(e,A){let t=[];this[e]===A&&t.push(this);for(let i=0,r=this.children.length;i<r;i++){const s=this.children[i].getObjectsByProperty(e,A);s.length>0&&(t=t.concat(s))}return t}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Xi,e,hw),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Xi,fw,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const A=this.matrixWorld.elements;return e.set(A[8],A[9],A[10]).normalize()}raycast(){}traverse(e){e(this);const A=this.children;for(let t=0,i=A.length;t<i;t++)A[t].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const A=this.children;for(let t=0,i=A.length;t<i;t++)A[t].traverseVisible(e)}traverseAncestors(e){const A=this.parent;A!==null&&(e(A),A.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const A=this.children;for(let t=0,i=A.length;t<i;t++){const r=A[t];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,A){const t=this.parent;if(e===!0&&t!==null&&t.matrixWorldAutoUpdate===!0&&t.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),A===!0){const i=this.children;for(let r=0,s=i.length;r<s;r++){const a=i[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const A=e===void 0||typeof e=="string",t={};A&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},t.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON()));function r(a,o){return a[o.uuid]===void 0&&(a[o.uuid]=o.toJSON(e)),o.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const o=a.shapes;if(Array.isArray(o))for(let l=0,c=o.length;l<c;l++){const u=o[l];r(e.shapes,u)}else r(e.shapes,o)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let o=0,l=this.material.length;o<l;o++)a.push(r(e.materials,this.material[o]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const o=this.animations[a];i.animations.push(r(e.animations,o))}}if(A){const a=s(e.geometries),o=s(e.materials),l=s(e.textures),c=s(e.images),u=s(e.shapes),h=s(e.skeletons),p=s(e.animations),g=s(e.nodes);a.length>0&&(t.geometries=a),o.length>0&&(t.materials=o),l.length>0&&(t.textures=l),c.length>0&&(t.images=c),u.length>0&&(t.shapes=u),h.length>0&&(t.skeletons=h),p.length>0&&(t.animations=p),g.length>0&&(t.nodes=g)}return t.object=i,t;function s(a){const o=[];for(const l in a){const c=a[l];delete c.metadata,o.push(c)}return o}}clone(e){return new this.constructor().copy(this,e)}copy(e,A=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),A===!0)for(let t=0;t<e.children.length;t++){const i=e.children[t];this.add(i.clone())}return this}}kA.DEFAULT_UP=new Q(0,1,0);kA.DEFAULT_MATRIX_AUTO_UPDATE=!0;kA.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ot=new Q,Pt=new Q,$a=new Q,Ot=new Q,ii=new Q,ri=new Q,fu=new Q,eo=new Q,Ao=new Q,to=new Q;let ss=!1;class ht{constructor(e=new Q,A=new Q,t=new Q){this.a=e,this.b=A,this.c=t}static getNormal(e,A,t,i){i.subVectors(t,A),ot.subVectors(e,A),i.cross(ot);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,A,t,i,r){ot.subVectors(i,A),Pt.subVectors(t,A),$a.subVectors(e,A);const s=ot.dot(ot),a=ot.dot(Pt),o=ot.dot($a),l=Pt.dot(Pt),c=Pt.dot($a),u=s*l-a*a;if(u===0)return r.set(-2,-1,-1);const h=1/u,p=(l*o-a*c)*h,g=(s*c-a*o)*h;return r.set(1-p-g,g,p)}static containsPoint(e,A,t,i){return this.getBarycoord(e,A,t,i,Ot),Ot.x>=0&&Ot.y>=0&&Ot.x+Ot.y<=1}static getUV(e,A,t,i,r,s,a,o){return ss===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),ss=!0),this.getInterpolation(e,A,t,i,r,s,a,o)}static getInterpolation(e,A,t,i,r,s,a,o){return this.getBarycoord(e,A,t,i,Ot),o.setScalar(0),o.addScaledVector(r,Ot.x),o.addScaledVector(s,Ot.y),o.addScaledVector(a,Ot.z),o}static isFrontFacing(e,A,t,i){return ot.subVectors(t,A),Pt.subVectors(e,A),ot.cross(Pt).dot(i)<0}set(e,A,t){return this.a.copy(e),this.b.copy(A),this.c.copy(t),this}setFromPointsAndIndices(e,A,t,i){return this.a.copy(e[A]),this.b.copy(e[t]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,A,t,i){return this.a.fromBufferAttribute(e,A),this.b.fromBufferAttribute(e,t),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ot.subVectors(this.c,this.b),Pt.subVectors(this.a,this.b),ot.cross(Pt).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ht.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,A){return ht.getBarycoord(e,this.a,this.b,this.c,A)}getUV(e,A,t,i,r){return ss===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),ss=!0),ht.getInterpolation(e,this.a,this.b,this.c,A,t,i,r)}getInterpolation(e,A,t,i,r){return ht.getInterpolation(e,this.a,this.b,this.c,A,t,i,r)}containsPoint(e){return ht.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ht.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,A){const t=this.a,i=this.b,r=this.c;let s,a;ii.subVectors(i,t),ri.subVectors(r,t),eo.subVectors(e,t);const o=ii.dot(eo),l=ri.dot(eo);if(o<=0&&l<=0)return A.copy(t);Ao.subVectors(e,i);const c=ii.dot(Ao),u=ri.dot(Ao);if(c>=0&&u<=c)return A.copy(i);const h=o*u-c*l;if(h<=0&&o>=0&&c<=0)return s=o/(o-c),A.copy(t).addScaledVector(ii,s);to.subVectors(e,r);const p=ii.dot(to),g=ri.dot(to);if(g>=0&&p<=g)return A.copy(r);const m=p*l-o*g;if(m<=0&&l>=0&&g<=0)return a=l/(l-g),A.copy(t).addScaledVector(ri,a);const d=c*g-p*u;if(d<=0&&u-c>=0&&p-g>=0)return fu.subVectors(r,i),a=(u-c)/(u-c+(p-g)),A.copy(i).addScaledVector(fu,a);const f=1/(d+m+h);return s=m*f,a=h*f,A.copy(t).addScaledVector(ii,s).addScaledVector(ri,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}let gw=0;class yr extends Vn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:gw++}),this.uuid=Pi(),this.name="",this.type="Material",this.blending=vi,this.side=pn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=af,this.blendDst=of,this.blendEquation=gi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=No,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Q_,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ka,this.stencilZFail=Ka,this.stencilZPass=Ka,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const A in e){const t=e[A];if(t===void 0){console.warn(`THREE.Material: parameter '${A}' has value of undefined.`);continue}const i=this[A];if(i===void 0){console.warn(`THREE.Material: '${A}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(t):i&&i.isVector3&&t&&t.isVector3?i.copy(t):this[A]=t}}toJSON(e){const A=e===void 0||typeof e=="string";A&&(e={textures:{},images:{}});const t={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),this.color&&this.color.isColor&&(t.color=this.color.getHex()),this.roughness!==void 0&&(t.roughness=this.roughness),this.metalness!==void 0&&(t.metalness=this.metalness),this.sheen!==void 0&&(t.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(t.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(t.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(t.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(t.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(t.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(t.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(t.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(t.shininess=this.shininess),this.clearcoat!==void 0&&(t.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(t.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(t.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(t.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(t.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,t.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(t.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(t.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(t.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(t.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(t.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(t.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(t.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(t.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(t.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(t.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(t.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(t.lightMap=this.lightMap.toJSON(e).uuid,t.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(t.aoMap=this.aoMap.toJSON(e).uuid,t.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(t.bumpMap=this.bumpMap.toJSON(e).uuid,t.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(t.normalMap=this.normalMap.toJSON(e).uuid,t.normalMapType=this.normalMapType,t.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(t.displacementMap=this.displacementMap.toJSON(e).uuid,t.displacementScale=this.displacementScale,t.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(t.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(t.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(t.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(t.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(t.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(t.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(t.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(t.combine=this.combine)),this.envMapIntensity!==void 0&&(t.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(t.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(t.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(t.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(t.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(t.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(t.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(t.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(t.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(t.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(t.size=this.size),this.shadowSide!==null&&(t.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(t.sizeAttenuation=this.sizeAttenuation),this.blending!==vi&&(t.blending=this.blending),this.side!==pn&&(t.side=this.side),this.vertexColors===!0&&(t.vertexColors=!0),this.opacity<1&&(t.opacity=this.opacity),this.transparent===!0&&(t.transparent=!0),t.depthFunc=this.depthFunc,t.depthTest=this.depthTest,t.depthWrite=this.depthWrite,t.colorWrite=this.colorWrite,t.stencilWrite=this.stencilWrite,t.stencilWriteMask=this.stencilWriteMask,t.stencilFunc=this.stencilFunc,t.stencilRef=this.stencilRef,t.stencilFuncMask=this.stencilFuncMask,t.stencilFail=this.stencilFail,t.stencilZFail=this.stencilZFail,t.stencilZPass=this.stencilZPass,this.rotation!==void 0&&this.rotation!==0&&(t.rotation=this.rotation),this.polygonOffset===!0&&(t.polygonOffset=!0),this.polygonOffsetFactor!==0&&(t.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(t.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(t.linewidth=this.linewidth),this.dashSize!==void 0&&(t.dashSize=this.dashSize),this.gapSize!==void 0&&(t.gapSize=this.gapSize),this.scale!==void 0&&(t.scale=this.scale),this.dithering===!0&&(t.dithering=!0),this.alphaTest>0&&(t.alphaTest=this.alphaTest),this.alphaHash===!0&&(t.alphaHash=!0),this.alphaToCoverage===!0&&(t.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(t.premultipliedAlpha=!0),this.forceSinglePass===!0&&(t.forceSinglePass=!0),this.wireframe===!0&&(t.wireframe=!0),this.wireframeLinewidth>1&&(t.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(t.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(t.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(t.flatShading=!0),this.visible===!1&&(t.visible=!1),this.toneMapped===!1&&(t.toneMapped=!1),this.fog===!1&&(t.fog=!1),Object.keys(this.userData).length>0&&(t.userData=this.userData);function i(r){const s=[];for(const a in r){const o=r[a];delete o.metadata,s.push(o)}return s}if(A){const r=i(e.textures),s=i(e.images);r.length>0&&(t.textures=r),s.length>0&&(t.images=s)}return t}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const A=e.clippingPlanes;let t=null;if(A!==null){const i=A.length;t=new Array(i);for(let r=0;r!==i;++r)t[r]=A[r].clone()}return this.clippingPlanes=t,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Ef={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Zt={h:0,s:0,l:0},as={h:0,s:0,l:0};function no(n,e,A){return A<0&&(A+=1),A>1&&(A-=1),A<1/6?n+(e-n)*6*A:A<1/2?e:A<2/3?n+(e-n)*6*(2/3-A):n}class je{constructor(e,A,t){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,A,t)}set(e,A,t){if(A===void 0&&t===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,A,t);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,A=yA){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ze.toWorkingColorSpace(this,A),this}setRGB(e,A,t,i=Ze.workingColorSpace){return this.r=e,this.g=A,this.b=t,Ze.toWorkingColorSpace(this,i),this}setHSL(e,A,t,i=Ze.workingColorSpace){if(e=sl(e,1),A=LA(A,0,1),t=LA(t,0,1),A===0)this.r=this.g=this.b=t;else{const r=t<=.5?t*(1+A):t+A-t*A,s=2*t-r;this.r=no(s,r,e+1/3),this.g=no(s,r,e),this.b=no(s,r,e-1/3)}return Ze.toWorkingColorSpace(this,i),this}setStyle(e,A=yA){function t(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const s=i[1],a=i[2];switch(s){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return t(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,A);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return t(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,A);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return t(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,A);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],s=r.length;if(s===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,A);if(s===6)return this.setHex(parseInt(r,16),A);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,A);return this}setColorName(e,A=yA){const t=Ef[e.toLowerCase()];return t!==void 0?this.setHex(t,A):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ei(e.r),this.g=Ei(e.g),this.b=Ei(e.b),this}copyLinearToSRGB(e){return this.r=za(e.r),this.g=za(e.g),this.b=za(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=yA){return Ze.fromWorkingColorSpace(bA.copy(this),e),Math.round(LA(bA.r*255,0,255))*65536+Math.round(LA(bA.g*255,0,255))*256+Math.round(LA(bA.b*255,0,255))}getHexString(e=yA){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,A=Ze.workingColorSpace){Ze.fromWorkingColorSpace(bA.copy(this),A);const t=bA.r,i=bA.g,r=bA.b,s=Math.max(t,i,r),a=Math.min(t,i,r);let o,l;const c=(a+s)/2;if(a===s)o=0,l=0;else{const u=s-a;switch(l=c<=.5?u/(s+a):u/(2-s-a),s){case t:o=(i-r)/u+(i<r?6:0);break;case i:o=(r-t)/u+2;break;case r:o=(t-i)/u+4;break}o/=6}return e.h=o,e.s=l,e.l=c,e}getRGB(e,A=Ze.workingColorSpace){return Ze.fromWorkingColorSpace(bA.copy(this),A),e.r=bA.r,e.g=bA.g,e.b=bA.b,e}getStyle(e=yA){Ze.fromWorkingColorSpace(bA.copy(this),e);const A=bA.r,t=bA.g,i=bA.b;return e!==yA?`color(${e} ${A.toFixed(3)} ${t.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(A*255)},${Math.round(t*255)},${Math.round(i*255)})`}offsetHSL(e,A,t){return this.getHSL(Zt),this.setHSL(Zt.h+e,Zt.s+A,Zt.l+t)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,A){return this.r=e.r+A.r,this.g=e.g+A.g,this.b=e.b+A.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,A){return this.r+=(e.r-this.r)*A,this.g+=(e.g-this.g)*A,this.b+=(e.b-this.b)*A,this}lerpColors(e,A,t){return this.r=e.r+(A.r-e.r)*t,this.g=e.g+(A.g-e.g)*t,this.b=e.b+(A.b-e.b)*t,this}lerpHSL(e,A){this.getHSL(Zt),e.getHSL(as);const t=cr(Zt.h,as.h,A),i=cr(Zt.s,as.s,A),r=cr(Zt.l,as.l,A);return this.setHSL(t,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const A=this.r,t=this.g,i=this.b,r=e.elements;return this.r=r[0]*A+r[3]*t+r[6]*i,this.g=r[1]*A+r[4]*t+r[7]*i,this.b=r[2]*A+r[5]*t+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,A=0){return this.r=e[A],this.g=e[A+1],this.b=e[A+2],this}toArray(e=[],A=0){return e[A]=this.r,e[A+1]=this.g,e[A+2]=this.b,e}fromBufferAttribute(e,A){return this.r=e.getX(A),this.g=e.getY(A),this.b=e.getZ(A),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const bA=new je;je.NAMES=Ef;class ol extends yr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=lf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const hA=new Q,os=new Fe;class St{constructor(e,A,t=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=A,this.count=e!==void 0?e.length/A:0,this.normalized=t,this.usage=eu,this.updateRange={offset:0,count:-1},this.gpuType=an,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,A,t){e*=this.itemSize,t*=A.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=A.array[t+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let A=0,t=this.count;A<t;A++)os.fromBufferAttribute(this,A),os.applyMatrix3(e),this.setXY(A,os.x,os.y);else if(this.itemSize===3)for(let A=0,t=this.count;A<t;A++)hA.fromBufferAttribute(this,A),hA.applyMatrix3(e),this.setXYZ(A,hA.x,hA.y,hA.z);return this}applyMatrix4(e){for(let A=0,t=this.count;A<t;A++)hA.fromBufferAttribute(this,A),hA.applyMatrix4(e),this.setXYZ(A,hA.x,hA.y,hA.z);return this}applyNormalMatrix(e){for(let A=0,t=this.count;A<t;A++)hA.fromBufferAttribute(this,A),hA.applyNormalMatrix(e),this.setXYZ(A,hA.x,hA.y,hA.z);return this}transformDirection(e){for(let A=0,t=this.count;A<t;A++)hA.fromBufferAttribute(this,A),hA.transformDirection(e),this.setXYZ(A,hA.x,hA.y,hA.z);return this}set(e,A=0){return this.array.set(e,A),this}getComponent(e,A){let t=this.array[e*this.itemSize+A];return this.normalized&&(t=mi(t,this.array)),t}setComponent(e,A,t){return this.normalized&&(t=HA(t,this.array)),this.array[e*this.itemSize+A]=t,this}getX(e){let A=this.array[e*this.itemSize];return this.normalized&&(A=mi(A,this.array)),A}setX(e,A){return this.normalized&&(A=HA(A,this.array)),this.array[e*this.itemSize]=A,this}getY(e){let A=this.array[e*this.itemSize+1];return this.normalized&&(A=mi(A,this.array)),A}setY(e,A){return this.normalized&&(A=HA(A,this.array)),this.array[e*this.itemSize+1]=A,this}getZ(e){let A=this.array[e*this.itemSize+2];return this.normalized&&(A=mi(A,this.array)),A}setZ(e,A){return this.normalized&&(A=HA(A,this.array)),this.array[e*this.itemSize+2]=A,this}getW(e){let A=this.array[e*this.itemSize+3];return this.normalized&&(A=mi(A,this.array)),A}setW(e,A){return this.normalized&&(A=HA(A,this.array)),this.array[e*this.itemSize+3]=A,this}setXY(e,A,t){return e*=this.itemSize,this.normalized&&(A=HA(A,this.array),t=HA(t,this.array)),this.array[e+0]=A,this.array[e+1]=t,this}setXYZ(e,A,t,i){return e*=this.itemSize,this.normalized&&(A=HA(A,this.array),t=HA(t,this.array),i=HA(i,this.array)),this.array[e+0]=A,this.array[e+1]=t,this.array[e+2]=i,this}setXYZW(e,A,t,i,r){return e*=this.itemSize,this.normalized&&(A=HA(A,this.array),t=HA(t,this.array),i=HA(i,this.array),r=HA(r,this.array)),this.array[e+0]=A,this.array[e+1]=t,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==eu&&(e.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(e.updateRange=this.updateRange),e}}class Cf extends St{constructor(e,A,t){super(new Uint16Array(e),A,t)}}class xf extends St{constructor(e,A,t){super(new Uint32Array(e),A,t)}}class zA extends St{constructor(e,A,t){super(new Float32Array(e),A,t)}}let mw=0;const jA=new CA,io=new kA,si=new Q,YA=new Ur,Yi=new Ur,vA=new Q;class bt extends Vn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:mw++}),this.uuid=Pi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Bf(e)?xf:Cf)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,A){return this.attributes[e]=A,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,A,t=0){this.groups.push({start:e,count:A,materialIndex:t})}clearGroups(){this.groups=[]}setDrawRange(e,A){this.drawRange.start=e,this.drawRange.count=A}applyMatrix4(e){const A=this.attributes.position;A!==void 0&&(A.applyMatrix4(e),A.needsUpdate=!0);const t=this.attributes.normal;if(t!==void 0){const r=new Ke().getNormalMatrix(e);t.applyNormalMatrix(r),t.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return jA.makeRotationFromQuaternion(e),this.applyMatrix4(jA),this}rotateX(e){return jA.makeRotationX(e),this.applyMatrix4(jA),this}rotateY(e){return jA.makeRotationY(e),this.applyMatrix4(jA),this}rotateZ(e){return jA.makeRotationZ(e),this.applyMatrix4(jA),this}translate(e,A,t){return jA.makeTranslation(e,A,t),this.applyMatrix4(jA),this}scale(e,A,t){return jA.makeScale(e,A,t),this.applyMatrix4(jA),this}lookAt(e){return io.lookAt(e),io.updateMatrix(),this.applyMatrix4(io.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(si).negate(),this.translate(si.x,si.y,si.z),this}setFromPoints(e){const A=[];for(let t=0,i=e.length;t<i;t++){const r=e[t];A.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new zA(A,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ur);const e=this.attributes.position,A=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new Q(-1/0,-1/0,-1/0),new Q(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),A)for(let t=0,i=A.length;t<i;t++){const r=A[t];YA.setFromBufferAttribute(r),this.morphTargetsRelative?(vA.addVectors(this.boundingBox.min,YA.min),this.boundingBox.expandByPoint(vA),vA.addVectors(this.boundingBox.max,YA.max),this.boundingBox.expandByPoint(vA)):(this.boundingBox.expandByPoint(YA.min),this.boundingBox.expandByPoint(YA.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new sa);const e=this.attributes.position,A=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new Q,1/0);return}if(e){const t=this.boundingSphere.center;if(YA.setFromBufferAttribute(e),A)for(let r=0,s=A.length;r<s;r++){const a=A[r];Yi.setFromBufferAttribute(a),this.morphTargetsRelative?(vA.addVectors(YA.min,Yi.min),YA.expandByPoint(vA),vA.addVectors(YA.max,Yi.max),YA.expandByPoint(vA)):(YA.expandByPoint(Yi.min),YA.expandByPoint(Yi.max))}YA.getCenter(t);let i=0;for(let r=0,s=e.count;r<s;r++)vA.fromBufferAttribute(e,r),i=Math.max(i,t.distanceToSquared(vA));if(A)for(let r=0,s=A.length;r<s;r++){const a=A[r],o=this.morphTargetsRelative;for(let l=0,c=a.count;l<c;l++)vA.fromBufferAttribute(a,l),o&&(si.fromBufferAttribute(e,l),vA.add(si)),i=Math.max(i,t.distanceToSquared(vA))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,A=this.attributes;if(e===null||A.position===void 0||A.normal===void 0||A.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const t=e.array,i=A.position.array,r=A.normal.array,s=A.uv.array,a=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new St(new Float32Array(4*a),4));const o=this.getAttribute("tangent").array,l=[],c=[];for(let M=0;M<a;M++)l[M]=new Q,c[M]=new Q;const u=new Q,h=new Q,p=new Q,g=new Fe,m=new Fe,d=new Fe,f=new Q,v=new Q;function w(M,z,Y){u.fromArray(i,M*3),h.fromArray(i,z*3),p.fromArray(i,Y*3),g.fromArray(s,M*2),m.fromArray(s,z*2),d.fromArray(s,Y*2),h.sub(u),p.sub(u),m.sub(g),d.sub(g);const W=1/(m.x*d.y-d.x*m.y);isFinite(W)&&(f.copy(h).multiplyScalar(d.y).addScaledVector(p,-m.y).multiplyScalar(W),v.copy(p).multiplyScalar(m.x).addScaledVector(h,-d.x).multiplyScalar(W),l[M].add(f),l[z].add(f),l[Y].add(f),c[M].add(v),c[z].add(v),c[Y].add(v))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.length}]);for(let M=0,z=E.length;M<z;++M){const Y=E[M],W=Y.start,T=Y.count;for(let N=W,X=W+T;N<X;N+=3)w(t[N+0],t[N+1],t[N+2])}const x=new Q,U=new Q,y=new Q,R=new Q;function B(M){y.fromArray(r,M*3),R.copy(y);const z=l[M];x.copy(z),x.sub(y.multiplyScalar(y.dot(z))).normalize(),U.crossVectors(R,z);const W=U.dot(c[M])<0?-1:1;o[M*4]=x.x,o[M*4+1]=x.y,o[M*4+2]=x.z,o[M*4+3]=W}for(let M=0,z=E.length;M<z;++M){const Y=E[M],W=Y.start,T=Y.count;for(let N=W,X=W+T;N<X;N+=3)B(t[N+0]),B(t[N+1]),B(t[N+2])}}computeVertexNormals(){const e=this.index,A=this.getAttribute("position");if(A!==void 0){let t=this.getAttribute("normal");if(t===void 0)t=new St(new Float32Array(A.count*3),3),this.setAttribute("normal",t);else for(let h=0,p=t.count;h<p;h++)t.setXYZ(h,0,0,0);const i=new Q,r=new Q,s=new Q,a=new Q,o=new Q,l=new Q,c=new Q,u=new Q;if(e)for(let h=0,p=e.count;h<p;h+=3){const g=e.getX(h+0),m=e.getX(h+1),d=e.getX(h+2);i.fromBufferAttribute(A,g),r.fromBufferAttribute(A,m),s.fromBufferAttribute(A,d),c.subVectors(s,r),u.subVectors(i,r),c.cross(u),a.fromBufferAttribute(t,g),o.fromBufferAttribute(t,m),l.fromBufferAttribute(t,d),a.add(c),o.add(c),l.add(c),t.setXYZ(g,a.x,a.y,a.z),t.setXYZ(m,o.x,o.y,o.z),t.setXYZ(d,l.x,l.y,l.z)}else for(let h=0,p=A.count;h<p;h+=3)i.fromBufferAttribute(A,h+0),r.fromBufferAttribute(A,h+1),s.fromBufferAttribute(A,h+2),c.subVectors(s,r),u.subVectors(i,r),c.cross(u),t.setXYZ(h+0,c.x,c.y,c.z),t.setXYZ(h+1,c.x,c.y,c.z),t.setXYZ(h+2,c.x,c.y,c.z);this.normalizeNormals(),t.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let A=0,t=e.count;A<t;A++)vA.fromBufferAttribute(e,A),vA.normalize(),e.setXYZ(A,vA.x,vA.y,vA.z)}toNonIndexed(){function e(a,o){const l=a.array,c=a.itemSize,u=a.normalized,h=new l.constructor(o.length*c);let p=0,g=0;for(let m=0,d=o.length;m<d;m++){a.isInterleavedBufferAttribute?p=o[m]*a.data.stride+a.offset:p=o[m]*c;for(let f=0;f<c;f++)h[g++]=l[p++]}return new St(h,c,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const A=new bt,t=this.index.array,i=this.attributes;for(const a in i){const o=i[a],l=e(o,t);A.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const o=[],l=r[a];for(let c=0,u=l.length;c<u;c++){const h=l[c],p=e(h,t);o.push(p)}A.morphAttributes[a]=o}A.morphTargetsRelative=this.morphTargetsRelative;const s=this.groups;for(let a=0,o=s.length;a<o;a++){const l=s[a];A.addGroup(l.start,l.count,l.materialIndex)}return A}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const o=this.parameters;for(const l in o)o[l]!==void 0&&(e[l]=o[l]);return e}e.data={attributes:{}};const A=this.index;A!==null&&(e.data.index={type:A.array.constructor.name,array:Array.prototype.slice.call(A.array)});const t=this.attributes;for(const o in t){const l=t[o];e.data.attributes[o]=l.toJSON(e.data)}const i={};let r=!1;for(const o in this.morphAttributes){const l=this.morphAttributes[o],c=[];for(let u=0,h=l.length;u<h;u++){const p=l[u];c.push(p.toJSON(e.data))}c.length>0&&(i[o]=c,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const A={};this.name=e.name;const t=e.index;t!==null&&this.setIndex(t.clone(A));const i=e.attributes;for(const l in i){const c=i[l];this.setAttribute(l,c.clone(A))}const r=e.morphAttributes;for(const l in r){const c=[],u=r[l];for(let h=0,p=u.length;h<p;h++)c.push(u[h].clone(A));this.morphAttributes[l]=c}this.morphTargetsRelative=e.morphTargetsRelative;const s=e.groups;for(let l=0,c=s.length;l<c;l++){const u=s[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const o=e.boundingSphere;return o!==null&&(this.boundingSphere=o.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const du=new CA,En=new aa,ls=new sa,pu=new Q,ai=new Q,oi=new Q,li=new Q,ro=new Q,cs=new Q,us=new Fe,hs=new Fe,fs=new Fe,gu=new Q,mu=new Q,Bu=new Q,ds=new Q,ps=new Q;class Ut extends kA{constructor(e=new bt,A=new ol){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=A,this.updateMorphTargets()}copy(e,A){return super.copy(e,A),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const A=this.geometry.morphAttributes,t=Object.keys(A);if(t.length>0){const i=A[t[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=i.length;r<s;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,A){const t=this.geometry,i=t.attributes.position,r=t.morphAttributes.position,s=t.morphTargetsRelative;A.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(r&&a){cs.set(0,0,0);for(let o=0,l=r.length;o<l;o++){const c=a[o],u=r[o];c!==0&&(ro.fromBufferAttribute(u,e),s?cs.addScaledVector(ro,c):cs.addScaledVector(ro.sub(A),c))}A.add(cs)}return A}raycast(e,A){const t=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(t.boundingSphere===null&&t.computeBoundingSphere(),ls.copy(t.boundingSphere),ls.applyMatrix4(r),En.copy(e.ray).recast(e.near),!(ls.containsPoint(En.origin)===!1&&(En.intersectSphere(ls,pu)===null||En.origin.distanceToSquared(pu)>(e.far-e.near)**2))&&(du.copy(r).invert(),En.copy(e.ray).applyMatrix4(du),!(t.boundingBox!==null&&En.intersectsBox(t.boundingBox)===!1)&&this._computeIntersections(e,A,En)))}_computeIntersections(e,A,t){let i;const r=this.geometry,s=this.material,a=r.index,o=r.attributes.position,l=r.attributes.uv,c=r.attributes.uv1,u=r.attributes.normal,h=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(s))for(let g=0,m=h.length;g<m;g++){const d=h[g],f=s[d.materialIndex],v=Math.max(d.start,p.start),w=Math.min(a.count,Math.min(d.start+d.count,p.start+p.count));for(let E=v,x=w;E<x;E+=3){const U=a.getX(E),y=a.getX(E+1),R=a.getX(E+2);i=gs(this,f,e,t,l,c,u,U,y,R),i&&(i.faceIndex=Math.floor(E/3),i.face.materialIndex=d.materialIndex,A.push(i))}}else{const g=Math.max(0,p.start),m=Math.min(a.count,p.start+p.count);for(let d=g,f=m;d<f;d+=3){const v=a.getX(d),w=a.getX(d+1),E=a.getX(d+2);i=gs(this,s,e,t,l,c,u,v,w,E),i&&(i.faceIndex=Math.floor(d/3),A.push(i))}}else if(o!==void 0)if(Array.isArray(s))for(let g=0,m=h.length;g<m;g++){const d=h[g],f=s[d.materialIndex],v=Math.max(d.start,p.start),w=Math.min(o.count,Math.min(d.start+d.count,p.start+p.count));for(let E=v,x=w;E<x;E+=3){const U=E,y=E+1,R=E+2;i=gs(this,f,e,t,l,c,u,U,y,R),i&&(i.faceIndex=Math.floor(E/3),i.face.materialIndex=d.materialIndex,A.push(i))}}else{const g=Math.max(0,p.start),m=Math.min(o.count,p.start+p.count);for(let d=g,f=m;d<f;d+=3){const v=d,w=d+1,E=d+2;i=gs(this,s,e,t,l,c,u,v,w,E),i&&(i.faceIndex=Math.floor(d/3),A.push(i))}}}}function Bw(n,e,A,t,i,r,s,a){let o;if(e.side===KA?o=t.intersectTriangle(s,r,i,!0,a):o=t.intersectTriangle(i,r,s,e.side===pn,a),o===null)return null;ps.copy(a),ps.applyMatrix4(n.matrixWorld);const l=A.ray.origin.distanceTo(ps);return l<A.near||l>A.far?null:{distance:l,point:ps.clone(),object:n}}function gs(n,e,A,t,i,r,s,a,o,l){n.getVertexPosition(a,ai),n.getVertexPosition(o,oi),n.getVertexPosition(l,li);const c=Bw(n,e,A,t,ai,oi,li,ds);if(c){i&&(us.fromBufferAttribute(i,a),hs.fromBufferAttribute(i,o),fs.fromBufferAttribute(i,l),c.uv=ht.getInterpolation(ds,ai,oi,li,us,hs,fs,new Fe)),r&&(us.fromBufferAttribute(r,a),hs.fromBufferAttribute(r,o),fs.fromBufferAttribute(r,l),c.uv1=ht.getInterpolation(ds,ai,oi,li,us,hs,fs,new Fe),c.uv2=c.uv1),s&&(gu.fromBufferAttribute(s,a),mu.fromBufferAttribute(s,o),Bu.fromBufferAttribute(s,l),c.normal=ht.getInterpolation(ds,ai,oi,li,gu,mu,Bu,new Q),c.normal.dot(t.direction)>0&&c.normal.multiplyScalar(-1));const u={a,b:o,c:l,normal:new Q,materialIndex:0};ht.getNormal(ai,oi,li,u.normal),c.face=u}return c}class Sr extends bt{constructor(e=1,A=1,t=1,i=1,r=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:A,depth:t,widthSegments:i,heightSegments:r,depthSegments:s};const a=this;i=Math.floor(i),r=Math.floor(r),s=Math.floor(s);const o=[],l=[],c=[],u=[];let h=0,p=0;g("z","y","x",-1,-1,t,A,e,s,r,0),g("z","y","x",1,-1,t,A,-e,s,r,1),g("x","z","y",1,1,e,t,A,i,s,2),g("x","z","y",1,-1,e,t,-A,i,s,3),g("x","y","z",1,-1,e,A,t,i,r,4),g("x","y","z",-1,-1,e,A,-t,i,r,5),this.setIndex(o),this.setAttribute("position",new zA(l,3)),this.setAttribute("normal",new zA(c,3)),this.setAttribute("uv",new zA(u,2));function g(m,d,f,v,w,E,x,U,y,R,B){const M=E/y,z=x/R,Y=E/2,W=x/2,T=U/2,N=y+1,X=R+1;let G=0,ee=0;const J=new Q;for(let q=0;q<X;q++){const I=q*z-W;for(let O=0;O<N;O++){const se=O*M-Y;J[m]=se*v,J[d]=I*w,J[f]=T,l.push(J.x,J.y,J.z),J[m]=0,J[d]=0,J[f]=U>0?1:-1,c.push(J.x,J.y,J.z),u.push(O/y),u.push(1-q/R),G+=1}}for(let q=0;q<R;q++)for(let I=0;I<y;I++){const O=h+I+N*q,se=h+I+N*(q+1),ue=h+(I+1)+N*(q+1),de=h+(I+1)+N*q;o.push(O,se,de),o.push(se,ue,de),ee+=6}a.addGroup(p,ee,B),p+=ee,h+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Sr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Di(n){const e={};for(const A in n){e[A]={};for(const t in n[A]){const i=n[A][t];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[A][t]=null):e[A][t]=i.clone():Array.isArray(i)?e[A][t]=i.slice():e[A][t]=i}}return e}function PA(n){const e={};for(let A=0;A<n.length;A++){const t=Di(n[A]);for(const i in t)e[i]=t[i]}return e}function _w(n){const e=[];for(let A=0;A<n.length;A++)e.push(n[A].clone());return e}function Uf(n){return n.getRenderTarget()===null?n.outputColorSpace:Ze.workingColorSpace}const ww={clone:Di,merge:PA};var vw=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ew=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class gn extends yr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=vw,this.fragmentShader=Ew,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Di(e.uniforms),this.uniformsGroups=_w(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const A=super.toJSON(e);A.glslVersion=this.glslVersion,A.uniforms={};for(const i in this.uniforms){const s=this.uniforms[i].value;s&&s.isTexture?A.uniforms[i]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?A.uniforms[i]={type:"c",value:s.getHex()}:s&&s.isVector2?A.uniforms[i]={type:"v2",value:s.toArray()}:s&&s.isVector3?A.uniforms[i]={type:"v3",value:s.toArray()}:s&&s.isVector4?A.uniforms[i]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?A.uniforms[i]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?A.uniforms[i]={type:"m4",value:s.toArray()}:A.uniforms[i]={value:s}}Object.keys(this.defines).length>0&&(A.defines=this.defines),A.vertexShader=this.vertexShader,A.fragmentShader=this.fragmentShader,A.lights=this.lights,A.clipping=this.clipping;const t={};for(const i in this.extensions)this.extensions[i]===!0&&(t[i]=!0);return Object.keys(t).length>0&&(A.extensions=t),A}}class yf extends kA{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new CA,this.projectionMatrix=new CA,this.projectionMatrixInverse=new CA,this.coordinateSystem=Kt}copy(e,A){return super.copy(e,A),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,A){super.updateWorldMatrix(e,A),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class nt extends yf{constructor(e=50,A=1,t=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=t,this.far=i,this.focus=10,this.aspect=A,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,A){return super.copy(e,A),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const A=.5*this.getFilmHeight()/e;this.fov=_r*2*Math.atan(A),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(lr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return _r*2*Math.atan(Math.tan(lr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,A,t,i,r,s){this.aspect=e/A,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=A,this.view.offsetX=t,this.view.offsetY=i,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let A=e*Math.tan(lr*.5*this.fov)/this.zoom,t=2*A,i=this.aspect*t,r=-.5*i;const s=this.view;if(this.view!==null&&this.view.enabled){const o=s.fullWidth,l=s.fullHeight;r+=s.offsetX*i/o,A-=s.offsetY*t/l,i*=s.width/o,t*=s.height/l}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,A,A-t,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const A=super.toJSON(e);return A.object.fov=this.fov,A.object.zoom=this.zoom,A.object.near=this.near,A.object.far=this.far,A.object.focus=this.focus,A.object.aspect=this.aspect,this.view!==null&&(A.object.view=Object.assign({},this.view)),A.object.filmGauge=this.filmGauge,A.object.filmOffset=this.filmOffset,A}}const ci=-90,ui=1;class Cw extends kA{constructor(e,A,t){super(),this.type="CubeCamera",this.renderTarget=t,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new nt(ci,ui,e,A);i.layers=this.layers,this.add(i);const r=new nt(ci,ui,e,A);r.layers=this.layers,this.add(r);const s=new nt(ci,ui,e,A);s.layers=this.layers,this.add(s);const a=new nt(ci,ui,e,A);a.layers=this.layers,this.add(a);const o=new nt(ci,ui,e,A);o.layers=this.layers,this.add(o);const l=new nt(ci,ui,e,A);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,A=this.children.concat(),[t,i,r,s,a,o]=A;for(const l of A)this.remove(l);if(e===Kt)t.up.set(0,1,0),t.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),o.up.set(0,1,0),o.lookAt(0,0,-1);else if(e===Vs)t.up.set(0,-1,0),t.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),o.up.set(0,-1,0),o.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of A)this.add(l),l.updateMatrixWorld()}update(e,A){this.parent===null&&this.updateMatrixWorld();const{renderTarget:t,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,s,a,o,l,c]=this.children,u=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const m=t.texture.generateMipmaps;t.texture.generateMipmaps=!1,e.setRenderTarget(t,0,i),e.render(A,r),e.setRenderTarget(t,1,i),e.render(A,s),e.setRenderTarget(t,2,i),e.render(A,a),e.setRenderTarget(t,3,i),e.render(A,o),e.setRenderTarget(t,4,i),e.render(A,l),t.texture.generateMipmaps=m,e.setRenderTarget(t,5,i),e.render(A,c),e.setRenderTarget(u,h,p),e.xr.enabled=g,t.texture.needsPMREMUpdate=!0}}class Sf extends qA{constructor(e,A,t,i,r,s,a,o,l,c){e=e!==void 0?e:[],A=A!==void 0?A:Ii,super(e,A,t,i,r,s,a,o,l,c),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class xw extends Nn{constructor(e=1,A={}){super(e,e,A),this.isWebGLCubeRenderTarget=!0;const t={width:e,height:e,depth:1},i=[t,t,t,t,t,t];A.encoding!==void 0&&(ur("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),A.colorSpace=A.encoding===On?yA:it),this.texture=new Sf(i,A.mapping,A.wrapS,A.wrapT,A.magFilter,A.minFilter,A.format,A.type,A.anisotropy,A.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=A.generateMipmaps!==void 0?A.generateMipmaps:!1,this.texture.minFilter=A.minFilter!==void 0?A.minFilter:tt}fromEquirectangularTexture(e,A){this.texture.type=A.type,this.texture.colorSpace=A.colorSpace,this.texture.generateMipmaps=A.generateMipmaps,this.texture.minFilter=A.minFilter,this.texture.magFilter=A.magFilter;const t={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Sr(5,5,5),r=new gn({name:"CubemapFromEquirect",uniforms:Di(t.uniforms),vertexShader:t.vertexShader,fragmentShader:t.fragmentShader,side:KA,blending:cn});r.uniforms.tEquirect.value=A;const s=new Ut(i,r),a=A.minFilter;return A.minFilter===mr&&(A.minFilter=tt),new Cw(1,10,this).update(e,s),A.minFilter=a,s.geometry.dispose(),s.material.dispose(),this}clear(e,A,t,i){const r=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(A,t,i);e.setRenderTarget(r)}}const so=new Q,Uw=new Q,yw=new Ke;class An{constructor(e=new Q(1,0,0),A=0){this.isPlane=!0,this.normal=e,this.constant=A}set(e,A){return this.normal.copy(e),this.constant=A,this}setComponents(e,A,t,i){return this.normal.set(e,A,t),this.constant=i,this}setFromNormalAndCoplanarPoint(e,A){return this.normal.copy(e),this.constant=-A.dot(this.normal),this}setFromCoplanarPoints(e,A,t){const i=so.subVectors(t,A).cross(Uw.subVectors(e,A)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,A){return A.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,A){const t=e.delta(so),i=this.normal.dot(t);if(i===0)return this.distanceToPoint(e.start)===0?A.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:A.copy(e.start).addScaledVector(t,r)}intersectsLine(e){const A=this.distanceToPoint(e.start),t=this.distanceToPoint(e.end);return A<0&&t>0||t<0&&A>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,A){const t=A||yw.getNormalMatrix(e),i=this.coplanarPoint(so).applyMatrix4(e),r=this.normal.applyMatrix3(t).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Cn=new sa,ms=new Q;class Mf{constructor(e=new An,A=new An,t=new An,i=new An,r=new An,s=new An){this.planes=[e,A,t,i,r,s]}set(e,A,t,i,r,s){const a=this.planes;return a[0].copy(e),a[1].copy(A),a[2].copy(t),a[3].copy(i),a[4].copy(r),a[5].copy(s),this}copy(e){const A=this.planes;for(let t=0;t<6;t++)A[t].copy(e.planes[t]);return this}setFromProjectionMatrix(e,A=Kt){const t=this.planes,i=e.elements,r=i[0],s=i[1],a=i[2],o=i[3],l=i[4],c=i[5],u=i[6],h=i[7],p=i[8],g=i[9],m=i[10],d=i[11],f=i[12],v=i[13],w=i[14],E=i[15];if(t[0].setComponents(o-r,h-l,d-p,E-f).normalize(),t[1].setComponents(o+r,h+l,d+p,E+f).normalize(),t[2].setComponents(o+s,h+c,d+g,E+v).normalize(),t[3].setComponents(o-s,h-c,d-g,E-v).normalize(),t[4].setComponents(o-a,h-u,d-m,E-w).normalize(),A===Kt)t[5].setComponents(o+a,h+u,d+m,E+w).normalize();else if(A===Vs)t[5].setComponents(a,u,m,w).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+A);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Cn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const A=e.geometry;A.boundingSphere===null&&A.computeBoundingSphere(),Cn.copy(A.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Cn)}intersectsSprite(e){return Cn.center.set(0,0,0),Cn.radius=.7071067811865476,Cn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Cn)}intersectsSphere(e){const A=this.planes,t=e.center,i=-e.radius;for(let r=0;r<6;r++)if(A[r].distanceToPoint(t)<i)return!1;return!0}intersectsBox(e){const A=this.planes;for(let t=0;t<6;t++){const i=A[t];if(ms.x=i.normal.x>0?e.max.x:e.min.x,ms.y=i.normal.y>0?e.max.y:e.min.y,ms.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(ms)<0)return!1}return!0}containsPoint(e){const A=this.planes;for(let t=0;t<6;t++)if(A[t].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Ff(){let n=null,e=!1,A=null,t=null;function i(r,s){A(r,s),t=n.requestAnimationFrame(i)}return{start:function(){e!==!0&&A!==null&&(t=n.requestAnimationFrame(i),e=!0)},stop:function(){n.cancelAnimationFrame(t),e=!1},setAnimationLoop:function(r){A=r},setContext:function(r){n=r}}}function Sw(n,e){const A=e.isWebGL2,t=new WeakMap;function i(l,c){const u=l.array,h=l.usage,p=n.createBuffer();n.bindBuffer(c,p),n.bufferData(c,u,h),l.onUploadCallback();let g;if(u instanceof Float32Array)g=n.FLOAT;else if(u instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(A)g=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=n.UNSIGNED_SHORT;else if(u instanceof Int16Array)g=n.SHORT;else if(u instanceof Uint32Array)g=n.UNSIGNED_INT;else if(u instanceof Int32Array)g=n.INT;else if(u instanceof Int8Array)g=n.BYTE;else if(u instanceof Uint8Array)g=n.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)g=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:p,type:g,bytesPerElement:u.BYTES_PER_ELEMENT,version:l.version}}function r(l,c,u){const h=c.array,p=c.updateRange;n.bindBuffer(u,l),p.count===-1?n.bufferSubData(u,0,h):(A?n.bufferSubData(u,p.offset*h.BYTES_PER_ELEMENT,h,p.offset,p.count):n.bufferSubData(u,p.offset*h.BYTES_PER_ELEMENT,h.subarray(p.offset,p.offset+p.count)),p.count=-1),c.onUploadCallback()}function s(l){return l.isInterleavedBufferAttribute&&(l=l.data),t.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);const c=t.get(l);c&&(n.deleteBuffer(c.buffer),t.delete(l))}function o(l,c){if(l.isGLBufferAttribute){const h=t.get(l);(!h||h.version<l.version)&&t.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);const u=t.get(l);u===void 0?t.set(l,i(l,c)):u.version<l.version&&(r(u.buffer,l,c),u.version=l.version)}return{get:s,remove:a,update:o}}class ll extends bt{constructor(e=1,A=1,t=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:A,widthSegments:t,heightSegments:i};const r=e/2,s=A/2,a=Math.floor(t),o=Math.floor(i),l=a+1,c=o+1,u=e/a,h=A/o,p=[],g=[],m=[],d=[];for(let f=0;f<c;f++){const v=f*h-s;for(let w=0;w<l;w++){const E=w*u-r;g.push(E,-v,0),m.push(0,0,1),d.push(w/a),d.push(1-f/o)}}for(let f=0;f<o;f++)for(let v=0;v<a;v++){const w=v+l*f,E=v+l*(f+1),x=v+1+l*(f+1),U=v+1+l*f;p.push(w,E,U),p.push(E,x,U)}this.setIndex(p),this.setAttribute("position",new zA(g,3)),this.setAttribute("normal",new zA(m,3)),this.setAttribute("uv",new zA(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ll(e.width,e.height,e.widthSegments,e.heightSegments)}}var Mw=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Fw=`#ifdef USE_ALPHAHASH
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
#endif`,bw=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Tw=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Qw=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Iw=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Lw=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Rw=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Dw=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Hw=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Pw=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Ow=`#ifdef USE_IRIDESCENCE
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
#endif`,Nw=`#ifdef USE_BUMPMAP
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
		vec3 vSigmaX = dFdx( surf_pos.xyz );
		vec3 vSigmaY = dFdy( surf_pos.xyz );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Gw=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Vw=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Kw=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,kw=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,zw=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Ww=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Xw=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Yw=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Jw=`#define PI 3.141592653589793
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
} // validated`,qw=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Zw=`vec3 transformedNormal = objectNormal;
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
#endif`,jw=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,$w=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ev=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Av=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,tv="gl_FragColor = linearToOutputTexel( gl_FragColor );",nv=`
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
}`,iv=`#ifdef USE_ENVMAP
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
#endif`,rv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,sv=`#ifdef USE_ENVMAP
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
#endif`,av=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ov=`#ifdef USE_ENVMAP
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
#endif`,lv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,cv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,uv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,hv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,fv=`#ifdef USE_GRADIENTMAP
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
}`,dv=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,pv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,gv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,mv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Bv=`uniform bool receiveShadow;
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
#endif`,_v=`#ifdef USE_ENVMAP
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
#endif`,wv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,vv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ev=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Cv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,xv=`PhysicalMaterial material;
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
#endif`,Uv=`struct PhysicalMaterial {
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
vec3 clearcoatSpecular = vec3( 0.0 );
vec3 sheenSpecular = vec3( 0.0 );
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
		clearcoatSpecular += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
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
}`,yv=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal;
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
#endif`,Sv=`#if defined( RE_IndirectDiffuse )
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
#endif`,Mv=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Fv=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,bv=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Tv=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Qv=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Iv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Lv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Rv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Dv=`#if defined( USE_POINTS_UV )
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
#endif`,Hv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Pv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ov=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Nv=`#ifdef USE_MORPHNORMALS
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
#endif`,Gv=`#ifdef USE_MORPHTARGETS
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
#endif`,Vv=`#ifdef USE_MORPHTARGETS
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
#endif`,Kv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,kv=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,zv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Wv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Xv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Yv=`#ifdef USE_NORMALMAP
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
#endif`,Jv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,qv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Zv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,jv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,$v=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,eE=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,AE=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,tE=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,nE=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,iE=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,rE=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,sE=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,aE=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,oE=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,lE=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,cE=`float getShadowMask() {
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
}`,uE=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,hE=`#ifdef USE_SKINNING
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
#endif`,fE=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,dE=`#ifdef USE_SKINNING
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
#endif`,pE=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,gE=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,mE=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,BE=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,_E=`#ifdef USE_TRANSMISSION
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
#endif`,wE=`#ifdef USE_TRANSMISSION
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
#endif`,vE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,EE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,CE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,xE=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const UE=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,yE=`uniform sampler2D t2D;
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
}`,SE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ME=`#ifdef ENVMAP_TYPE_CUBE
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
}`,FE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bE=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,TE=`#include <common>
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
}`,QE=`#if DEPTH_PACKING == 3200
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
}`,IE=`#define DISTANCE
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
}`,LE=`#define DISTANCE
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
}`,RE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,DE=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,HE=`uniform float scale;
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
}`,PE=`uniform vec3 diffuse;
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
}`,OE=`#include <common>
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
}`,NE=`uniform vec3 diffuse;
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
}`,GE=`#define LAMBERT
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
}`,VE=`#define LAMBERT
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
}`,KE=`#define MATCAP
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
}`,kE=`#define MATCAP
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
}`,zE=`#define NORMAL
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
}`,WE=`#define NORMAL
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
}`,XE=`#define PHONG
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
}`,YE=`#define PHONG
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
}`,JE=`#define STANDARD
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
}`,qE=`#define STANDARD
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
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ZE=`#define TOON
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
}`,jE=`#define TOON
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
}`,$E=`uniform float size;
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
}`,eC=`uniform vec3 diffuse;
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
}`,AC=`#include <common>
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
}`,tC=`uniform vec3 color;
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
}`,nC=`uniform float rotation;
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
}`,iC=`uniform vec3 diffuse;
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
}`,Ge={alphahash_fragment:Mw,alphahash_pars_fragment:Fw,alphamap_fragment:bw,alphamap_pars_fragment:Tw,alphatest_fragment:Qw,alphatest_pars_fragment:Iw,aomap_fragment:Lw,aomap_pars_fragment:Rw,begin_vertex:Dw,beginnormal_vertex:Hw,bsdfs:Pw,iridescence_fragment:Ow,bumpmap_pars_fragment:Nw,clipping_planes_fragment:Gw,clipping_planes_pars_fragment:Vw,clipping_planes_pars_vertex:Kw,clipping_planes_vertex:kw,color_fragment:zw,color_pars_fragment:Ww,color_pars_vertex:Xw,color_vertex:Yw,common:Jw,cube_uv_reflection_fragment:qw,defaultnormal_vertex:Zw,displacementmap_pars_vertex:jw,displacementmap_vertex:$w,emissivemap_fragment:ev,emissivemap_pars_fragment:Av,colorspace_fragment:tv,colorspace_pars_fragment:nv,envmap_fragment:iv,envmap_common_pars_fragment:rv,envmap_pars_fragment:sv,envmap_pars_vertex:av,envmap_physical_pars_fragment:_v,envmap_vertex:ov,fog_vertex:lv,fog_pars_vertex:cv,fog_fragment:uv,fog_pars_fragment:hv,gradientmap_pars_fragment:fv,lightmap_fragment:dv,lightmap_pars_fragment:pv,lights_lambert_fragment:gv,lights_lambert_pars_fragment:mv,lights_pars_begin:Bv,lights_toon_fragment:wv,lights_toon_pars_fragment:vv,lights_phong_fragment:Ev,lights_phong_pars_fragment:Cv,lights_physical_fragment:xv,lights_physical_pars_fragment:Uv,lights_fragment_begin:yv,lights_fragment_maps:Sv,lights_fragment_end:Mv,logdepthbuf_fragment:Fv,logdepthbuf_pars_fragment:bv,logdepthbuf_pars_vertex:Tv,logdepthbuf_vertex:Qv,map_fragment:Iv,map_pars_fragment:Lv,map_particle_fragment:Rv,map_particle_pars_fragment:Dv,metalnessmap_fragment:Hv,metalnessmap_pars_fragment:Pv,morphcolor_vertex:Ov,morphnormal_vertex:Nv,morphtarget_pars_vertex:Gv,morphtarget_vertex:Vv,normal_fragment_begin:Kv,normal_fragment_maps:kv,normal_pars_fragment:zv,normal_pars_vertex:Wv,normal_vertex:Xv,normalmap_pars_fragment:Yv,clearcoat_normal_fragment_begin:Jv,clearcoat_normal_fragment_maps:qv,clearcoat_pars_fragment:Zv,iridescence_pars_fragment:jv,opaque_fragment:$v,packing:eE,premultiplied_alpha_fragment:AE,project_vertex:tE,dithering_fragment:nE,dithering_pars_fragment:iE,roughnessmap_fragment:rE,roughnessmap_pars_fragment:sE,shadowmap_pars_fragment:aE,shadowmap_pars_vertex:oE,shadowmap_vertex:lE,shadowmask_pars_fragment:cE,skinbase_vertex:uE,skinning_pars_vertex:hE,skinning_vertex:fE,skinnormal_vertex:dE,specularmap_fragment:pE,specularmap_pars_fragment:gE,tonemapping_fragment:mE,tonemapping_pars_fragment:BE,transmission_fragment:_E,transmission_pars_fragment:wE,uv_pars_fragment:vE,uv_pars_vertex:EE,uv_vertex:CE,worldpos_vertex:xE,background_vert:UE,background_frag:yE,backgroundCube_vert:SE,backgroundCube_frag:ME,cube_vert:FE,cube_frag:bE,depth_vert:TE,depth_frag:QE,distanceRGBA_vert:IE,distanceRGBA_frag:LE,equirect_vert:RE,equirect_frag:DE,linedashed_vert:HE,linedashed_frag:PE,meshbasic_vert:OE,meshbasic_frag:NE,meshlambert_vert:GE,meshlambert_frag:VE,meshmatcap_vert:KE,meshmatcap_frag:kE,meshnormal_vert:zE,meshnormal_frag:WE,meshphong_vert:XE,meshphong_frag:YE,meshphysical_vert:JE,meshphysical_frag:qE,meshtoon_vert:ZE,meshtoon_frag:jE,points_vert:$E,points_frag:eC,shadow_vert:AC,shadow_frag:tC,sprite_vert:nC,sprite_frag:iC},he={common:{diffuse:{value:new je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ke}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ke},normalScale:{value:new Fe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0},uvTransform:{value:new Ke}},sprite:{diffuse:{value:new je(16777215)},opacity:{value:1},center:{value:new Fe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}}},Ct={basic:{uniforms:PA([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:PA([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new je(0)}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:PA([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new je(0)},specular:{value:new je(1118481)},shininess:{value:30}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:PA([he.common,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.roughnessmap,he.metalnessmap,he.fog,he.lights,{emissive:{value:new je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:PA([he.common,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.gradientmap,he.fog,he.lights,{emissive:{value:new je(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:PA([he.common,he.bumpmap,he.normalmap,he.displacementmap,he.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:PA([he.points,he.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:PA([he.common,he.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:PA([he.common,he.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:PA([he.common,he.bumpmap,he.normalmap,he.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:PA([he.sprite,he.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new Ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distanceRGBA:{uniforms:PA([he.common,he.displacementmap,{referencePosition:{value:new Q},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distanceRGBA_vert,fragmentShader:Ge.distanceRGBA_frag},shadow:{uniforms:PA([he.lights,he.fog,{color:{value:new je(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};Ct.physical={uniforms:PA([Ct.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ke},clearcoatNormalScale:{value:new Fe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ke},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ke},sheen:{value:0},sheenColor:{value:new je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ke},transmissionSamplerSize:{value:new Fe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ke},attenuationDistance:{value:0},attenuationColor:{value:new je(0)},specularColor:{value:new je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ke},anisotropyVector:{value:new Fe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ke}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};const Bs={r:0,b:0,g:0};function rC(n,e,A,t,i,r,s){const a=new je(0);let o=r===!0?0:1,l,c,u=null,h=0,p=null;function g(d,f){let v=!1,w=f.isScene===!0?f.background:null;w&&w.isTexture&&(w=(f.backgroundBlurriness>0?A:e).get(w)),w===null?m(a,o):w&&w.isColor&&(m(w,1),v=!0);const E=n.xr.getEnvironmentBlendMode();E==="additive"?t.buffers.color.setClear(0,0,0,1,s):E==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||v)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),w&&(w.isCubeTexture||w.mapping===ia)?(c===void 0&&(c=new Ut(new Sr(1,1,1),new gn({name:"BackgroundCubeMaterial",uniforms:Di(Ct.backgroundCube.uniforms),vertexShader:Ct.backgroundCube.vertexShader,fragmentShader:Ct.backgroundCube.fragmentShader,side:KA,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(x,U,y){this.matrixWorld.copyPosition(y.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=w,c.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=f.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,c.material.toneMapped=Ze.getTransfer(w.colorSpace)!==nA,(u!==w||h!==w.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,u=w,h=w.version,p=n.toneMapping),c.layers.enableAll(),d.unshift(c,c.geometry,c.material,0,0,null)):w&&w.isTexture&&(l===void 0&&(l=new Ut(new ll(2,2),new gn({name:"BackgroundMaterial",uniforms:Di(Ct.background.uniforms),vertexShader:Ct.background.vertexShader,fragmentShader:Ct.background.fragmentShader,side:pn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=w,l.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,l.material.toneMapped=Ze.getTransfer(w.colorSpace)!==nA,w.matrixAutoUpdate===!0&&w.updateMatrix(),l.material.uniforms.uvTransform.value.copy(w.matrix),(u!==w||h!==w.version||p!==n.toneMapping)&&(l.material.needsUpdate=!0,u=w,h=w.version,p=n.toneMapping),l.layers.enableAll(),d.unshift(l,l.geometry,l.material,0,0,null))}function m(d,f){d.getRGB(Bs,Uf(n)),t.buffers.color.setClear(Bs.r,Bs.g,Bs.b,f,s)}return{getClearColor:function(){return a},setClearColor:function(d,f=1){a.set(d),o=f,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(d){o=d,m(a,o)},render:g}}function sC(n,e,A,t){const i=n.getParameter(n.MAX_VERTEX_ATTRIBS),r=t.isWebGL2?null:e.get("OES_vertex_array_object"),s=t.isWebGL2||r!==null,a={},o=d(null);let l=o,c=!1;function u(T,N,X,G,ee){let J=!1;if(s){const q=m(G,X,N);l!==q&&(l=q,p(l.object)),J=f(T,G,X,ee),J&&v(T,G,X,ee)}else{const q=N.wireframe===!0;(l.geometry!==G.id||l.program!==X.id||l.wireframe!==q)&&(l.geometry=G.id,l.program=X.id,l.wireframe=q,J=!0)}ee!==null&&A.update(ee,n.ELEMENT_ARRAY_BUFFER),(J||c)&&(c=!1,R(T,N,X,G),ee!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,A.get(ee).buffer))}function h(){return t.isWebGL2?n.createVertexArray():r.createVertexArrayOES()}function p(T){return t.isWebGL2?n.bindVertexArray(T):r.bindVertexArrayOES(T)}function g(T){return t.isWebGL2?n.deleteVertexArray(T):r.deleteVertexArrayOES(T)}function m(T,N,X){const G=X.wireframe===!0;let ee=a[T.id];ee===void 0&&(ee={},a[T.id]=ee);let J=ee[N.id];J===void 0&&(J={},ee[N.id]=J);let q=J[G];return q===void 0&&(q=d(h()),J[G]=q),q}function d(T){const N=[],X=[],G=[];for(let ee=0;ee<i;ee++)N[ee]=0,X[ee]=0,G[ee]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:X,attributeDivisors:G,object:T,attributes:{},index:null}}function f(T,N,X,G){const ee=l.attributes,J=N.attributes;let q=0;const I=X.getAttributes();for(const O in I)if(I[O].location>=0){const ue=ee[O];let de=J[O];if(de===void 0&&(O==="instanceMatrix"&&T.instanceMatrix&&(de=T.instanceMatrix),O==="instanceColor"&&T.instanceColor&&(de=T.instanceColor)),ue===void 0||ue.attribute!==de||de&&ue.data!==de.data)return!0;q++}return l.attributesNum!==q||l.index!==G}function v(T,N,X,G){const ee={},J=N.attributes;let q=0;const I=X.getAttributes();for(const O in I)if(I[O].location>=0){let ue=J[O];ue===void 0&&(O==="instanceMatrix"&&T.instanceMatrix&&(ue=T.instanceMatrix),O==="instanceColor"&&T.instanceColor&&(ue=T.instanceColor));const de={};de.attribute=ue,ue&&ue.data&&(de.data=ue.data),ee[O]=de,q++}l.attributes=ee,l.attributesNum=q,l.index=G}function w(){const T=l.newAttributes;for(let N=0,X=T.length;N<X;N++)T[N]=0}function E(T){x(T,0)}function x(T,N){const X=l.newAttributes,G=l.enabledAttributes,ee=l.attributeDivisors;X[T]=1,G[T]===0&&(n.enableVertexAttribArray(T),G[T]=1),ee[T]!==N&&((t.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[t.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](T,N),ee[T]=N)}function U(){const T=l.newAttributes,N=l.enabledAttributes;for(let X=0,G=N.length;X<G;X++)N[X]!==T[X]&&(n.disableVertexAttribArray(X),N[X]=0)}function y(T,N,X,G,ee,J,q){q===!0?n.vertexAttribIPointer(T,N,X,ee,J):n.vertexAttribPointer(T,N,X,G,ee,J)}function R(T,N,X,G){if(t.isWebGL2===!1&&(T.isInstancedMesh||G.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;w();const ee=G.attributes,J=X.getAttributes(),q=N.defaultAttributeValues;for(const I in J){const O=J[I];if(O.location>=0){let se=ee[I];if(se===void 0&&(I==="instanceMatrix"&&T.instanceMatrix&&(se=T.instanceMatrix),I==="instanceColor"&&T.instanceColor&&(se=T.instanceColor)),se!==void 0){const ue=se.normalized,de=se.itemSize,Ee=A.get(se);if(Ee===void 0)continue;const Ue=Ee.buffer,ye=Ee.type,Ye=Ee.bytesPerElement,xA=t.isWebGL2===!0&&(ye===n.INT||ye===n.UNSIGNED_INT||se.gpuType===uf);if(se.isInterleavedBufferAttribute){const Oe=se.data,D=Oe.stride,pA=se.offset;if(Oe.isInstancedInterleavedBuffer){for(let Se=0;Se<O.locationSize;Se++)x(O.location+Se,Oe.meshPerAttribute);T.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=Oe.meshPerAttribute*Oe.count)}else for(let Se=0;Se<O.locationSize;Se++)E(O.location+Se);n.bindBuffer(n.ARRAY_BUFFER,Ue);for(let Se=0;Se<O.locationSize;Se++)y(O.location+Se,de/O.locationSize,ye,ue,D*Ye,(pA+de/O.locationSize*Se)*Ye,xA)}else{if(se.isInstancedBufferAttribute){for(let Oe=0;Oe<O.locationSize;Oe++)x(O.location+Oe,se.meshPerAttribute);T.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let Oe=0;Oe<O.locationSize;Oe++)E(O.location+Oe);n.bindBuffer(n.ARRAY_BUFFER,Ue);for(let Oe=0;Oe<O.locationSize;Oe++)y(O.location+Oe,de/O.locationSize,ye,ue,de*Ye,de/O.locationSize*Oe*Ye,xA)}}else if(q!==void 0){const ue=q[I];if(ue!==void 0)switch(ue.length){case 2:n.vertexAttrib2fv(O.location,ue);break;case 3:n.vertexAttrib3fv(O.location,ue);break;case 4:n.vertexAttrib4fv(O.location,ue);break;default:n.vertexAttrib1fv(O.location,ue)}}}}U()}function B(){Y();for(const T in a){const N=a[T];for(const X in N){const G=N[X];for(const ee in G)g(G[ee].object),delete G[ee];delete N[X]}delete a[T]}}function M(T){if(a[T.id]===void 0)return;const N=a[T.id];for(const X in N){const G=N[X];for(const ee in G)g(G[ee].object),delete G[ee];delete N[X]}delete a[T.id]}function z(T){for(const N in a){const X=a[N];if(X[T.id]===void 0)continue;const G=X[T.id];for(const ee in G)g(G[ee].object),delete G[ee];delete X[T.id]}}function Y(){W(),c=!0,l!==o&&(l=o,p(l.object))}function W(){o.geometry=null,o.program=null,o.wireframe=!1}return{setup:u,reset:Y,resetDefaultState:W,dispose:B,releaseStatesOfGeometry:M,releaseStatesOfProgram:z,initAttributes:w,enableAttribute:E,disableUnusedAttributes:U}}function aC(n,e,A,t){const i=t.isWebGL2;let r;function s(l){r=l}function a(l,c){n.drawArrays(r,l,c),A.update(c,r,1)}function o(l,c,u){if(u===0)return;let h,p;if(i)h=n,p="drawArraysInstanced";else if(h=e.get("ANGLE_instanced_arrays"),p="drawArraysInstancedANGLE",h===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}h[p](r,l,c,u),A.update(c,r,u)}this.setMode=s,this.render=a,this.renderInstances=o}function oC(n,e,A){let t;function i(){if(t!==void 0)return t;if(e.has("EXT_texture_filter_anisotropic")===!0){const y=e.get("EXT_texture_filter_anisotropic");t=n.getParameter(y.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else t=0;return t}function r(y){if(y==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";y="mediump"}return y==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const s=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext";let a=A.precision!==void 0?A.precision:"highp";const o=r(a);o!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",o,"instead."),a=o);const l=s||e.has("WEBGL_draw_buffers"),c=A.logarithmicDepthBuffer===!0,u=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),h=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),d=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),f=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),w=h>0,E=s||e.has("OES_texture_float"),x=w&&E,U=s?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:s,drawBuffers:l,getMaxAnisotropy:i,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:c,maxTextures:u,maxVertexTextures:h,maxTextureSize:p,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:d,maxVaryings:f,maxFragmentUniforms:v,vertexTextures:w,floatFragmentTextures:E,floatVertexTextures:x,maxSamples:U}}function lC(n){const e=this;let A=null,t=0,i=!1,r=!1;const s=new An,a=new Ke,o={value:null,needsUpdate:!1};this.uniform=o,this.numPlanes=0,this.numIntersection=0,this.init=function(u,h){const p=u.length!==0||h||t!==0||i;return i=h,t=u.length,p},this.beginShadows=function(){r=!0,c(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,h){A=c(u,h,0)},this.setState=function(u,h,p){const g=u.clippingPlanes,m=u.clipIntersection,d=u.clipShadows,f=n.get(u);if(!i||g===null||g.length===0||r&&!d)r?c(null):l();else{const v=r?0:t,w=v*4;let E=f.clippingState||null;o.value=E,E=c(g,h,w,p);for(let x=0;x!==w;++x)E[x]=A[x];f.clippingState=E,this.numIntersection=m?this.numPlanes:0,this.numPlanes+=v}};function l(){o.value!==A&&(o.value=A,o.needsUpdate=t>0),e.numPlanes=t,e.numIntersection=0}function c(u,h,p,g){const m=u!==null?u.length:0;let d=null;if(m!==0){if(d=o.value,g!==!0||d===null){const f=p+m*4,v=h.matrixWorldInverse;a.getNormalMatrix(v),(d===null||d.length<f)&&(d=new Float32Array(f));for(let w=0,E=p;w!==m;++w,E+=4)s.copy(u[w]).applyMatrix4(v,a),s.normal.toArray(d,E),d[E+3]=s.constant}o.value=d,o.needsUpdate=!0}return e.numPlanes=m,e.numIntersection=0,d}}function cC(n){let e=new WeakMap;function A(s,a){return a===Go?s.mapping=Ii:a===Vo&&(s.mapping=Li),s}function t(s){if(s&&s.isTexture&&s.isRenderTargetTexture===!1){const a=s.mapping;if(a===Go||a===Vo)if(e.has(s)){const o=e.get(s).texture;return A(o,s.mapping)}else{const o=s.image;if(o&&o.height>0){const l=new xw(o.height/2);return l.fromEquirectangularTexture(n,s),e.set(s,l),s.addEventListener("dispose",i),A(l.texture,s.mapping)}else return null}}return s}function i(s){const a=s.target;a.removeEventListener("dispose",i);const o=e.get(a);o!==void 0&&(e.delete(a),o.dispose())}function r(){e=new WeakMap}return{get:t,dispose:r}}class uC extends yf{constructor(e=-1,A=1,t=1,i=-1,r=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=A,this.top=t,this.bottom=i,this.near=r,this.far=s,this.updateProjectionMatrix()}copy(e,A){return super.copy(e,A),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,A,t,i,r,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=A,this.view.offsetX=t,this.view.offsetY=i,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),A=(this.top-this.bottom)/(2*this.zoom),t=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=t-e,s=t+e,a=i+A,o=i-A;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,s=r+l*this.view.width,a-=c*this.view.offsetY,o=a-c*this.view.height}this.projectionMatrix.makeOrthographic(r,s,a,o,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const A=super.toJSON(e);return A.object.zoom=this.zoom,A.object.left=this.left,A.object.right=this.right,A.object.top=this.top,A.object.bottom=this.bottom,A.object.near=this.near,A.object.far=this.far,this.view!==null&&(A.object.view=Object.assign({},this.view)),A}}const _i=4,_u=[.125,.215,.35,.446,.526,.582],yn=20,ao=new uC,wu=new je;let oo=null;const xn=(1+Math.sqrt(5))/2,hi=1/xn,vu=[new Q(1,1,1),new Q(-1,1,1),new Q(1,1,-1),new Q(-1,1,-1),new Q(0,xn,hi),new Q(0,xn,-hi),new Q(hi,0,xn),new Q(-hi,0,xn),new Q(xn,hi,0),new Q(-xn,hi,0)];class Eu{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,A=0,t=.1,i=100){oo=this._renderer.getRenderTarget(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,t,i,r),A>0&&this._blur(r,0,0,A),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,A=null){return this._fromTexture(e,A)}fromCubemap(e,A=null){return this._fromTexture(e,A)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Uu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=xu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(oo),e.scissorTest=!1,_s(e,0,0,e.width,e.height)}_fromTexture(e,A){e.mapping===Ii||e.mapping===Li?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),oo=this._renderer.getRenderTarget();const t=A||this._allocateTargets();return this._textureToCubeUV(e,t),this._applyPMREM(t),this._cleanup(t),t}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),A=4*this._cubeSize,t={magFilter:tt,minFilter:tt,generateMipmaps:!1,type:Br,format:pt,colorSpace:Wt,depthBuffer:!1},i=Cu(e,A,t);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==A){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Cu(e,A,t);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=hC(r)),this._blurMaterial=fC(r,e,A)}return i}_compileMaterial(e){const A=new Ut(this._lodPlanes[0],e);this._renderer.compile(A,ao)}_sceneToCubeUV(e,A,t,i){const a=new nt(90,1,A,t),o=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],c=this._renderer,u=c.autoClear,h=c.toneMapping;c.getClearColor(wu),c.toneMapping=un,c.autoClear=!1;const p=new ol({name:"PMREM.Background",side:KA,depthWrite:!1,depthTest:!1}),g=new Ut(new Sr,p);let m=!1;const d=e.background;d?d.isColor&&(p.color.copy(d),e.background=null,m=!0):(p.color.copy(wu),m=!0);for(let f=0;f<6;f++){const v=f%3;v===0?(a.up.set(0,o[f],0),a.lookAt(l[f],0,0)):v===1?(a.up.set(0,0,o[f]),a.lookAt(0,l[f],0)):(a.up.set(0,o[f],0),a.lookAt(0,0,l[f]));const w=this._cubeSize;_s(i,v*w,f>2?w:0,w,w),c.setRenderTarget(i),m&&c.render(g,a),c.render(e,a)}g.geometry.dispose(),g.material.dispose(),c.toneMapping=h,c.autoClear=u,e.background=d}_textureToCubeUV(e,A){const t=this._renderer,i=e.mapping===Ii||e.mapping===Li;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Uu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=xu());const r=i?this._cubemapMaterial:this._equirectMaterial,s=new Ut(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const o=this._cubeSize;_s(A,0,0,3*o,2*o),t.setRenderTarget(A),t.render(s,ao)}_applyPMREM(e){const A=this._renderer,t=A.autoClear;A.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const r=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),s=vu[(i-1)%vu.length];this._blur(e,i-1,i,r,s)}A.autoClear=t}_blur(e,A,t,i,r){const s=this._pingPongRenderTarget;this._halfBlur(e,s,A,t,i,"latitudinal",r),this._halfBlur(s,e,t,t,i,"longitudinal",r)}_halfBlur(e,A,t,i,r,s,a){const o=this._renderer,l=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const c=3,u=new Ut(this._lodPlanes[i],l),h=l.uniforms,p=this._sizeLods[t]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*yn-1),m=r/g,d=isFinite(r)?1+Math.floor(c*m):yn;d>yn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${d} samples when the maximum is set to ${yn}`);const f=[];let v=0;for(let y=0;y<yn;++y){const R=y/m,B=Math.exp(-R*R/2);f.push(B),y===0?v+=B:y<d&&(v+=2*B)}for(let y=0;y<f.length;y++)f[y]=f[y]/v;h.envMap.value=e.texture,h.samples.value=d,h.weights.value=f,h.latitudinal.value=s==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:w}=this;h.dTheta.value=g,h.mipInt.value=w-t;const E=this._sizeLods[i],x=3*E*(i>w-_i?i-w+_i:0),U=4*(this._cubeSize-E);_s(A,x,U,3*E,2*E),o.setRenderTarget(A),o.render(u,ao)}}function hC(n){const e=[],A=[],t=[];let i=n;const r=n-_i+1+_u.length;for(let s=0;s<r;s++){const a=Math.pow(2,i);A.push(a);let o=1/a;s>n-_i?o=_u[s-n+_i-1]:s===0&&(o=0),t.push(o);const l=1/(a-2),c=-l,u=1+l,h=[c,c,u,c,u,u,c,c,u,u,c,u],p=6,g=6,m=3,d=2,f=1,v=new Float32Array(m*g*p),w=new Float32Array(d*g*p),E=new Float32Array(f*g*p);for(let U=0;U<p;U++){const y=U%3*2/3-1,R=U>2?0:-1,B=[y,R,0,y+2/3,R,0,y+2/3,R+1,0,y,R,0,y+2/3,R+1,0,y,R+1,0];v.set(B,m*g*U),w.set(h,d*g*U);const M=[U,U,U,U,U,U];E.set(M,f*g*U)}const x=new bt;x.setAttribute("position",new St(v,m)),x.setAttribute("uv",new St(w,d)),x.setAttribute("faceIndex",new St(E,f)),e.push(x),i>_i&&i--}return{lodPlanes:e,sizeLods:A,sigmas:t}}function Cu(n,e,A){const t=new Nn(n,e,A);return t.texture.mapping=ia,t.texture.name="PMREM.cubeUv",t.scissorTest=!0,t}function _s(n,e,A,t,i){n.viewport.set(e,A,t,i),n.scissor.set(e,A,t,i)}function fC(n,e,A){const t=new Float32Array(yn),i=new Q(0,1,0);return new gn({name:"SphericalGaussianBlur",defines:{n:yn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/A,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:t},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:cl(),fragmentShader:`

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
		`,blending:cn,depthTest:!1,depthWrite:!1})}function xu(){return new gn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:cl(),fragmentShader:`

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
		`,blending:cn,depthTest:!1,depthWrite:!1})}function Uu(){return new gn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:cl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:cn,depthTest:!1,depthWrite:!1})}function cl(){return`

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
	`}function dC(n){let e=new WeakMap,A=null;function t(a){if(a&&a.isTexture){const o=a.mapping,l=o===Go||o===Vo,c=o===Ii||o===Li;if(l||c)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let u=e.get(a);return A===null&&(A=new Eu(n)),u=l?A.fromEquirectangular(a,u):A.fromCubemap(a,u),e.set(a,u),u.texture}else{if(e.has(a))return e.get(a).texture;{const u=a.image;if(l&&u&&u.height>0||c&&u&&i(u)){A===null&&(A=new Eu(n));const h=l?A.fromEquirectangular(a):A.fromCubemap(a);return e.set(a,h),a.addEventListener("dispose",r),h.texture}else return null}}}return a}function i(a){let o=0;const l=6;for(let c=0;c<l;c++)a[c]!==void 0&&o++;return o===l}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap,A!==null&&(A.dispose(),A=null)}return{get:t,dispose:s}}function pC(n){const e={};function A(t){if(e[t]!==void 0)return e[t];let i;switch(t){case"WEBGL_depth_texture":i=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=n.getExtension(t)}return e[t]=i,i}return{has:function(t){return A(t)!==null},init:function(t){t.isWebGL2?A("EXT_color_buffer_float"):(A("WEBGL_depth_texture"),A("OES_texture_float"),A("OES_texture_half_float"),A("OES_texture_half_float_linear"),A("OES_standard_derivatives"),A("OES_element_index_uint"),A("OES_vertex_array_object"),A("ANGLE_instanced_arrays")),A("OES_texture_float_linear"),A("EXT_color_buffer_half_float"),A("WEBGL_multisampled_render_to_texture")},get:function(t){const i=A(t);return i===null&&console.warn("THREE.WebGLRenderer: "+t+" extension not supported."),i}}}function gC(n,e,A,t){const i={},r=new WeakMap;function s(u){const h=u.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);for(const g in h.morphAttributes){const m=h.morphAttributes[g];for(let d=0,f=m.length;d<f;d++)e.remove(m[d])}h.removeEventListener("dispose",s),delete i[h.id];const p=r.get(h);p&&(e.remove(p),r.delete(h)),t.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,A.memory.geometries--}function a(u,h){return i[h.id]===!0||(h.addEventListener("dispose",s),i[h.id]=!0,A.memory.geometries++),h}function o(u){const h=u.attributes;for(const g in h)e.update(h[g],n.ARRAY_BUFFER);const p=u.morphAttributes;for(const g in p){const m=p[g];for(let d=0,f=m.length;d<f;d++)e.update(m[d],n.ARRAY_BUFFER)}}function l(u){const h=[],p=u.index,g=u.attributes.position;let m=0;if(p!==null){const v=p.array;m=p.version;for(let w=0,E=v.length;w<E;w+=3){const x=v[w+0],U=v[w+1],y=v[w+2];h.push(x,U,U,y,y,x)}}else if(g!==void 0){const v=g.array;m=g.version;for(let w=0,E=v.length/3-1;w<E;w+=3){const x=w+0,U=w+1,y=w+2;h.push(x,U,U,y,y,x)}}else return;const d=new(Bf(h)?xf:Cf)(h,1);d.version=m;const f=r.get(u);f&&e.remove(f),r.set(u,d)}function c(u){const h=r.get(u);if(h){const p=u.index;p!==null&&h.version<p.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:o,getWireframeAttribute:c}}function mC(n,e,A,t){const i=t.isWebGL2;let r;function s(h){r=h}let a,o;function l(h){a=h.type,o=h.bytesPerElement}function c(h,p){n.drawElements(r,p,a,h*o),A.update(p,r,1)}function u(h,p,g){if(g===0)return;let m,d;if(i)m=n,d="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),d="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[d](r,p,a,h*o,g),A.update(p,r,g)}this.setMode=s,this.setIndex=l,this.render=c,this.renderInstances=u}function BC(n){const e={geometries:0,textures:0},A={frame:0,calls:0,triangles:0,points:0,lines:0};function t(r,s,a){switch(A.calls++,s){case n.TRIANGLES:A.triangles+=a*(r/3);break;case n.LINES:A.lines+=a*(r/2);break;case n.LINE_STRIP:A.lines+=a*(r-1);break;case n.LINE_LOOP:A.lines+=a*r;break;case n.POINTS:A.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",s);break}}function i(){A.calls=0,A.triangles=0,A.points=0,A.lines=0}return{memory:e,render:A,programs:null,autoReset:!0,reset:i,update:t}}function _C(n,e){return n[0]-e[0]}function wC(n,e){return Math.abs(e[1])-Math.abs(n[1])}function vC(n,e,A){const t={},i=new Float32Array(8),r=new WeakMap,s=new MA,a=[];for(let l=0;l<8;l++)a[l]=[l,0];function o(l,c,u){const h=l.morphTargetInfluences;if(e.isWebGL2===!0){const g=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,m=g!==void 0?g.length:0;let d=r.get(c);if(d===void 0||d.count!==m){let N=function(){W.dispose(),r.delete(c),c.removeEventListener("dispose",N)};var p=N;d!==void 0&&d.texture.dispose();const w=c.morphAttributes.position!==void 0,E=c.morphAttributes.normal!==void 0,x=c.morphAttributes.color!==void 0,U=c.morphAttributes.position||[],y=c.morphAttributes.normal||[],R=c.morphAttributes.color||[];let B=0;w===!0&&(B=1),E===!0&&(B=2),x===!0&&(B=3);let M=c.attributes.position.count*B,z=1;M>e.maxTextureSize&&(z=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const Y=new Float32Array(M*z*4*m),W=new vf(Y,M,z,m);W.type=an,W.needsUpdate=!0;const T=B*4;for(let X=0;X<m;X++){const G=U[X],ee=y[X],J=R[X],q=M*z*4*X;for(let I=0;I<G.count;I++){const O=I*T;w===!0&&(s.fromBufferAttribute(G,I),Y[q+O+0]=s.x,Y[q+O+1]=s.y,Y[q+O+2]=s.z,Y[q+O+3]=0),E===!0&&(s.fromBufferAttribute(ee,I),Y[q+O+4]=s.x,Y[q+O+5]=s.y,Y[q+O+6]=s.z,Y[q+O+7]=0),x===!0&&(s.fromBufferAttribute(J,I),Y[q+O+8]=s.x,Y[q+O+9]=s.y,Y[q+O+10]=s.z,Y[q+O+11]=J.itemSize===4?s.w:1)}}d={count:m,texture:W,size:new Fe(M,z)},r.set(c,d),c.addEventListener("dispose",N)}let f=0;for(let w=0;w<h.length;w++)f+=h[w];const v=c.morphTargetsRelative?1:1-f;u.getUniforms().setValue(n,"morphTargetBaseInfluence",v),u.getUniforms().setValue(n,"morphTargetInfluences",h),u.getUniforms().setValue(n,"morphTargetsTexture",d.texture,A),u.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}else{const g=h===void 0?0:h.length;let m=t[c.id];if(m===void 0||m.length!==g){m=[];for(let E=0;E<g;E++)m[E]=[E,0];t[c.id]=m}for(let E=0;E<g;E++){const x=m[E];x[0]=E,x[1]=h[E]}m.sort(wC);for(let E=0;E<8;E++)E<g&&m[E][1]?(a[E][0]=m[E][0],a[E][1]=m[E][1]):(a[E][0]=Number.MAX_SAFE_INTEGER,a[E][1]=0);a.sort(_C);const d=c.morphAttributes.position,f=c.morphAttributes.normal;let v=0;for(let E=0;E<8;E++){const x=a[E],U=x[0],y=x[1];U!==Number.MAX_SAFE_INTEGER&&y?(d&&c.getAttribute("morphTarget"+E)!==d[U]&&c.setAttribute("morphTarget"+E,d[U]),f&&c.getAttribute("morphNormal"+E)!==f[U]&&c.setAttribute("morphNormal"+E,f[U]),i[E]=y,v+=y):(d&&c.hasAttribute("morphTarget"+E)===!0&&c.deleteAttribute("morphTarget"+E),f&&c.hasAttribute("morphNormal"+E)===!0&&c.deleteAttribute("morphNormal"+E),i[E]=0)}const w=c.morphTargetsRelative?1:1-v;u.getUniforms().setValue(n,"morphTargetBaseInfluence",w),u.getUniforms().setValue(n,"morphTargetInfluences",i)}}return{update:o}}function EC(n,e,A,t){let i=new WeakMap;function r(o){const l=t.render.frame,c=o.geometry,u=e.get(o,c);if(i.get(u)!==l&&(e.update(u),i.set(u,l)),o.isInstancedMesh&&(o.hasEventListener("dispose",a)===!1&&o.addEventListener("dispose",a),i.get(o)!==l&&(A.update(o.instanceMatrix,n.ARRAY_BUFFER),o.instanceColor!==null&&A.update(o.instanceColor,n.ARRAY_BUFFER),i.set(o,l))),o.isSkinnedMesh){const h=o.skeleton;i.get(h)!==l&&(h.update(),i.set(h,l))}return u}function s(){i=new WeakMap}function a(o){const l=o.target;l.removeEventListener("dispose",a),A.remove(l.instanceMatrix),l.instanceColor!==null&&A.remove(l.instanceColor)}return{update:r,dispose:s}}const bf=new qA,Tf=new vf,Qf=new aw,If=new Sf,yu=[],Su=[],Mu=new Float32Array(16),Fu=new Float32Array(9),bu=new Float32Array(4);function Oi(n,e,A){const t=n[0];if(t<=0||t>0)return n;const i=e*A;let r=yu[i];if(r===void 0&&(r=new Float32Array(i),yu[i]=r),e!==0){t.toArray(r,0);for(let s=1,a=0;s!==e;++s)a+=A,n[s].toArray(r,a)}return r}function BA(n,e){if(n.length!==e.length)return!1;for(let A=0,t=n.length;A<t;A++)if(n[A]!==e[A])return!1;return!0}function _A(n,e){for(let A=0,t=e.length;A<t;A++)n[A]=e[A]}function la(n,e){let A=Su[e];A===void 0&&(A=new Int32Array(e),Su[e]=A);for(let t=0;t!==e;++t)A[t]=n.allocateTextureUnit();return A}function CC(n,e){const A=this.cache;A[0]!==e&&(n.uniform1f(this.addr,e),A[0]=e)}function xC(n,e){const A=this.cache;if(e.x!==void 0)(A[0]!==e.x||A[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),A[0]=e.x,A[1]=e.y);else{if(BA(A,e))return;n.uniform2fv(this.addr,e),_A(A,e)}}function UC(n,e){const A=this.cache;if(e.x!==void 0)(A[0]!==e.x||A[1]!==e.y||A[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),A[0]=e.x,A[1]=e.y,A[2]=e.z);else if(e.r!==void 0)(A[0]!==e.r||A[1]!==e.g||A[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),A[0]=e.r,A[1]=e.g,A[2]=e.b);else{if(BA(A,e))return;n.uniform3fv(this.addr,e),_A(A,e)}}function yC(n,e){const A=this.cache;if(e.x!==void 0)(A[0]!==e.x||A[1]!==e.y||A[2]!==e.z||A[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),A[0]=e.x,A[1]=e.y,A[2]=e.z,A[3]=e.w);else{if(BA(A,e))return;n.uniform4fv(this.addr,e),_A(A,e)}}function SC(n,e){const A=this.cache,t=e.elements;if(t===void 0){if(BA(A,e))return;n.uniformMatrix2fv(this.addr,!1,e),_A(A,e)}else{if(BA(A,t))return;bu.set(t),n.uniformMatrix2fv(this.addr,!1,bu),_A(A,t)}}function MC(n,e){const A=this.cache,t=e.elements;if(t===void 0){if(BA(A,e))return;n.uniformMatrix3fv(this.addr,!1,e),_A(A,e)}else{if(BA(A,t))return;Fu.set(t),n.uniformMatrix3fv(this.addr,!1,Fu),_A(A,t)}}function FC(n,e){const A=this.cache,t=e.elements;if(t===void 0){if(BA(A,e))return;n.uniformMatrix4fv(this.addr,!1,e),_A(A,e)}else{if(BA(A,t))return;Mu.set(t),n.uniformMatrix4fv(this.addr,!1,Mu),_A(A,t)}}function bC(n,e){const A=this.cache;A[0]!==e&&(n.uniform1i(this.addr,e),A[0]=e)}function TC(n,e){const A=this.cache;if(e.x!==void 0)(A[0]!==e.x||A[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),A[0]=e.x,A[1]=e.y);else{if(BA(A,e))return;n.uniform2iv(this.addr,e),_A(A,e)}}function QC(n,e){const A=this.cache;if(e.x!==void 0)(A[0]!==e.x||A[1]!==e.y||A[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),A[0]=e.x,A[1]=e.y,A[2]=e.z);else{if(BA(A,e))return;n.uniform3iv(this.addr,e),_A(A,e)}}function IC(n,e){const A=this.cache;if(e.x!==void 0)(A[0]!==e.x||A[1]!==e.y||A[2]!==e.z||A[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),A[0]=e.x,A[1]=e.y,A[2]=e.z,A[3]=e.w);else{if(BA(A,e))return;n.uniform4iv(this.addr,e),_A(A,e)}}function LC(n,e){const A=this.cache;A[0]!==e&&(n.uniform1ui(this.addr,e),A[0]=e)}function RC(n,e){const A=this.cache;if(e.x!==void 0)(A[0]!==e.x||A[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),A[0]=e.x,A[1]=e.y);else{if(BA(A,e))return;n.uniform2uiv(this.addr,e),_A(A,e)}}function DC(n,e){const A=this.cache;if(e.x!==void 0)(A[0]!==e.x||A[1]!==e.y||A[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),A[0]=e.x,A[1]=e.y,A[2]=e.z);else{if(BA(A,e))return;n.uniform3uiv(this.addr,e),_A(A,e)}}function HC(n,e){const A=this.cache;if(e.x!==void 0)(A[0]!==e.x||A[1]!==e.y||A[2]!==e.z||A[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),A[0]=e.x,A[1]=e.y,A[2]=e.z,A[3]=e.w);else{if(BA(A,e))return;n.uniform4uiv(this.addr,e),_A(A,e)}}function PC(n,e,A){const t=this.cache,i=A.allocateTextureUnit();t[0]!==i&&(n.uniform1i(this.addr,i),t[0]=i),A.setTexture2D(e||bf,i)}function OC(n,e,A){const t=this.cache,i=A.allocateTextureUnit();t[0]!==i&&(n.uniform1i(this.addr,i),t[0]=i),A.setTexture3D(e||Qf,i)}function NC(n,e,A){const t=this.cache,i=A.allocateTextureUnit();t[0]!==i&&(n.uniform1i(this.addr,i),t[0]=i),A.setTextureCube(e||If,i)}function GC(n,e,A){const t=this.cache,i=A.allocateTextureUnit();t[0]!==i&&(n.uniform1i(this.addr,i),t[0]=i),A.setTexture2DArray(e||Tf,i)}function VC(n){switch(n){case 5126:return CC;case 35664:return xC;case 35665:return UC;case 35666:return yC;case 35674:return SC;case 35675:return MC;case 35676:return FC;case 5124:case 35670:return bC;case 35667:case 35671:return TC;case 35668:case 35672:return QC;case 35669:case 35673:return IC;case 5125:return LC;case 36294:return RC;case 36295:return DC;case 36296:return HC;case 35678:case 36198:case 36298:case 36306:case 35682:return PC;case 35679:case 36299:case 36307:return OC;case 35680:case 36300:case 36308:case 36293:return NC;case 36289:case 36303:case 36311:case 36292:return GC}}function KC(n,e){n.uniform1fv(this.addr,e)}function kC(n,e){const A=Oi(e,this.size,2);n.uniform2fv(this.addr,A)}function zC(n,e){const A=Oi(e,this.size,3);n.uniform3fv(this.addr,A)}function WC(n,e){const A=Oi(e,this.size,4);n.uniform4fv(this.addr,A)}function XC(n,e){const A=Oi(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,A)}function YC(n,e){const A=Oi(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,A)}function JC(n,e){const A=Oi(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,A)}function qC(n,e){n.uniform1iv(this.addr,e)}function ZC(n,e){n.uniform2iv(this.addr,e)}function jC(n,e){n.uniform3iv(this.addr,e)}function $C(n,e){n.uniform4iv(this.addr,e)}function ex(n,e){n.uniform1uiv(this.addr,e)}function Ax(n,e){n.uniform2uiv(this.addr,e)}function tx(n,e){n.uniform3uiv(this.addr,e)}function nx(n,e){n.uniform4uiv(this.addr,e)}function ix(n,e,A){const t=this.cache,i=e.length,r=la(A,i);BA(t,r)||(n.uniform1iv(this.addr,r),_A(t,r));for(let s=0;s!==i;++s)A.setTexture2D(e[s]||bf,r[s])}function rx(n,e,A){const t=this.cache,i=e.length,r=la(A,i);BA(t,r)||(n.uniform1iv(this.addr,r),_A(t,r));for(let s=0;s!==i;++s)A.setTexture3D(e[s]||Qf,r[s])}function sx(n,e,A){const t=this.cache,i=e.length,r=la(A,i);BA(t,r)||(n.uniform1iv(this.addr,r),_A(t,r));for(let s=0;s!==i;++s)A.setTextureCube(e[s]||If,r[s])}function ax(n,e,A){const t=this.cache,i=e.length,r=la(A,i);BA(t,r)||(n.uniform1iv(this.addr,r),_A(t,r));for(let s=0;s!==i;++s)A.setTexture2DArray(e[s]||Tf,r[s])}function ox(n){switch(n){case 5126:return KC;case 35664:return kC;case 35665:return zC;case 35666:return WC;case 35674:return XC;case 35675:return YC;case 35676:return JC;case 5124:case 35670:return qC;case 35667:case 35671:return ZC;case 35668:case 35672:return jC;case 35669:case 35673:return $C;case 5125:return ex;case 36294:return Ax;case 36295:return tx;case 36296:return nx;case 35678:case 36198:case 36298:case 36306:case 35682:return ix;case 35679:case 36299:case 36307:return rx;case 35680:case 36300:case 36308:case 36293:return sx;case 36289:case 36303:case 36311:case 36292:return ax}}class lx{constructor(e,A,t){this.id=e,this.addr=t,this.cache=[],this.setValue=VC(A.type)}}class cx{constructor(e,A,t){this.id=e,this.addr=t,this.cache=[],this.size=A.size,this.setValue=ox(A.type)}}class ux{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,A,t){const i=this.seq;for(let r=0,s=i.length;r!==s;++r){const a=i[r];a.setValue(e,A[a.id],t)}}}const lo=/(\w+)(\])?(\[|\.)?/g;function Tu(n,e){n.seq.push(e),n.map[e.id]=e}function hx(n,e,A){const t=n.name,i=t.length;for(lo.lastIndex=0;;){const r=lo.exec(t),s=lo.lastIndex;let a=r[1];const o=r[2]==="]",l=r[3];if(o&&(a=a|0),l===void 0||l==="["&&s+2===i){Tu(A,l===void 0?new lx(a,n,e):new cx(a,n,e));break}else{let u=A.map[a];u===void 0&&(u=new ux(a),Tu(A,u)),A=u}}}class ys{constructor(e,A){this.seq=[],this.map={};const t=e.getProgramParameter(A,e.ACTIVE_UNIFORMS);for(let i=0;i<t;++i){const r=e.getActiveUniform(A,i),s=e.getUniformLocation(A,r.name);hx(r,s,this)}}setValue(e,A,t,i){const r=this.map[A];r!==void 0&&r.setValue(e,t,i)}setOptional(e,A,t){const i=A[t];i!==void 0&&this.setValue(e,t,i)}static upload(e,A,t,i){for(let r=0,s=A.length;r!==s;++r){const a=A[r],o=t[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,i)}}static seqWithValue(e,A){const t=[];for(let i=0,r=e.length;i!==r;++i){const s=e[i];s.id in A&&t.push(s)}return t}}function Qu(n,e,A){const t=n.createShader(e);return n.shaderSource(t,A),n.compileShader(t),t}let fx=0;function dx(n,e){const A=n.split(`
`),t=[],i=Math.max(e-6,0),r=Math.min(e+6,A.length);for(let s=i;s<r;s++){const a=s+1;t.push(`${a===e?">":" "} ${a}: ${A[s]}`)}return t.join(`
`)}function px(n){const e=Ze.getPrimaries(Ze.workingColorSpace),A=Ze.getPrimaries(n);let t;switch(e===A?t="":e===Gs&&A===Ns?t="LinearDisplayP3ToLinearSRGB":e===Ns&&A===Gs&&(t="LinearSRGBToLinearDisplayP3"),n){case Wt:case ra:return[t,"LinearTransferOETF"];case yA:case rl:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[t,"LinearTransferOETF"]}}function Iu(n,e,A){const t=n.getShaderParameter(e,n.COMPILE_STATUS),i=n.getShaderInfoLog(e).trim();if(t&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const s=parseInt(r[1]);return A.toUpperCase()+`

`+i+`

`+dx(n.getShaderSource(e),s)}else return i}function gx(n,e){const A=px(e);return`vec4 ${n}( vec4 value ) { return ${A[0]}( ${A[1]}( value ) ); }`}function mx(n,e){let A;switch(e){case f_:A="Linear";break;case d_:A="Reinhard";break;case p_:A="OptimizedCineon";break;case g_:A="ACESFilmic";break;case m_:A="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),A="Linear"}return"vec3 "+n+"( vec3 color ) { return "+A+"ToneMapping( color ); }"}function Bx(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(tr).join(`
`)}function _x(n){const e=[];for(const A in n){const t=n[A];t!==!1&&e.push("#define "+A+" "+t)}return e.join(`
`)}function wx(n,e){const A={},t=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let i=0;i<t;i++){const r=n.getActiveAttrib(e,i),s=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),A[s]={type:r.type,location:n.getAttribLocation(e,s),locationSize:a}}return A}function tr(n){return n!==""}function Lu(n,e){const A=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,A).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ru(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const vx=/^[ \t]*#include +<([\w\d./]+)>/gm;function Xo(n){return n.replace(vx,Cx)}const Ex=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Cx(n,e){let A=Ge[e];if(A===void 0){const t=Ex.get(e);if(t!==void 0)A=Ge[t],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,t);else throw new Error("Can not resolve #include <"+e+">")}return Xo(A)}const xx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Du(n){return n.replace(xx,Ux)}function Ux(n,e,A,t){let i="";for(let r=parseInt(e);r<parseInt(A);r++)i+=t.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Hu(n){let e="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function yx(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===sf?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===z0?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Nt&&(e="SHADOWMAP_TYPE_VSM"),e}function Sx(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Ii:case Li:e="ENVMAP_TYPE_CUBE";break;case ia:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Mx(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Li:e="ENVMAP_MODE_REFRACTION";break}return e}function Fx(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case lf:e="ENVMAP_BLENDING_MULTIPLY";break;case u_:e="ENVMAP_BLENDING_MIX";break;case h_:e="ENVMAP_BLENDING_ADD";break}return e}function bx(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const A=Math.log2(e)-2,t=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,A),7*16)),texelHeight:t,maxMip:A}}function Tx(n,e,A,t){const i=n.getContext(),r=A.defines;let s=A.vertexShader,a=A.fragmentShader;const o=yx(A),l=Sx(A),c=Mx(A),u=Fx(A),h=bx(A),p=A.isWebGL2?"":Bx(A),g=_x(r),m=i.createProgram();let d,f,v=A.glslVersion?"#version "+A.glslVersion+`
`:"";A.isRawShaderMaterial?(d=["#define SHADER_TYPE "+A.shaderType,"#define SHADER_NAME "+A.shaderName,g].filter(tr).join(`
`),d.length>0&&(d+=`
`),f=[p,"#define SHADER_TYPE "+A.shaderType,"#define SHADER_NAME "+A.shaderName,g].filter(tr).join(`
`),f.length>0&&(f+=`
`)):(d=[Hu(A),"#define SHADER_TYPE "+A.shaderType,"#define SHADER_NAME "+A.shaderName,g,A.instancing?"#define USE_INSTANCING":"",A.instancingColor?"#define USE_INSTANCING_COLOR":"",A.useFog&&A.fog?"#define USE_FOG":"",A.useFog&&A.fogExp2?"#define FOG_EXP2":"",A.map?"#define USE_MAP":"",A.envMap?"#define USE_ENVMAP":"",A.envMap?"#define "+c:"",A.lightMap?"#define USE_LIGHTMAP":"",A.aoMap?"#define USE_AOMAP":"",A.bumpMap?"#define USE_BUMPMAP":"",A.normalMap?"#define USE_NORMALMAP":"",A.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",A.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",A.displacementMap?"#define USE_DISPLACEMENTMAP":"",A.emissiveMap?"#define USE_EMISSIVEMAP":"",A.anisotropy?"#define USE_ANISOTROPY":"",A.anisotropyMap?"#define USE_ANISOTROPYMAP":"",A.clearcoatMap?"#define USE_CLEARCOATMAP":"",A.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",A.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",A.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",A.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",A.specularMap?"#define USE_SPECULARMAP":"",A.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",A.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",A.roughnessMap?"#define USE_ROUGHNESSMAP":"",A.metalnessMap?"#define USE_METALNESSMAP":"",A.alphaMap?"#define USE_ALPHAMAP":"",A.alphaHash?"#define USE_ALPHAHASH":"",A.transmission?"#define USE_TRANSMISSION":"",A.transmissionMap?"#define USE_TRANSMISSIONMAP":"",A.thicknessMap?"#define USE_THICKNESSMAP":"",A.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",A.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",A.mapUv?"#define MAP_UV "+A.mapUv:"",A.alphaMapUv?"#define ALPHAMAP_UV "+A.alphaMapUv:"",A.lightMapUv?"#define LIGHTMAP_UV "+A.lightMapUv:"",A.aoMapUv?"#define AOMAP_UV "+A.aoMapUv:"",A.emissiveMapUv?"#define EMISSIVEMAP_UV "+A.emissiveMapUv:"",A.bumpMapUv?"#define BUMPMAP_UV "+A.bumpMapUv:"",A.normalMapUv?"#define NORMALMAP_UV "+A.normalMapUv:"",A.displacementMapUv?"#define DISPLACEMENTMAP_UV "+A.displacementMapUv:"",A.metalnessMapUv?"#define METALNESSMAP_UV "+A.metalnessMapUv:"",A.roughnessMapUv?"#define ROUGHNESSMAP_UV "+A.roughnessMapUv:"",A.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+A.anisotropyMapUv:"",A.clearcoatMapUv?"#define CLEARCOATMAP_UV "+A.clearcoatMapUv:"",A.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+A.clearcoatNormalMapUv:"",A.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+A.clearcoatRoughnessMapUv:"",A.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+A.iridescenceMapUv:"",A.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+A.iridescenceThicknessMapUv:"",A.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+A.sheenColorMapUv:"",A.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+A.sheenRoughnessMapUv:"",A.specularMapUv?"#define SPECULARMAP_UV "+A.specularMapUv:"",A.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+A.specularColorMapUv:"",A.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+A.specularIntensityMapUv:"",A.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+A.transmissionMapUv:"",A.thicknessMapUv?"#define THICKNESSMAP_UV "+A.thicknessMapUv:"",A.vertexTangents&&A.flatShading===!1?"#define USE_TANGENT":"",A.vertexColors?"#define USE_COLOR":"",A.vertexAlphas?"#define USE_COLOR_ALPHA":"",A.vertexUv1s?"#define USE_UV1":"",A.vertexUv2s?"#define USE_UV2":"",A.vertexUv3s?"#define USE_UV3":"",A.pointsUvs?"#define USE_POINTS_UV":"",A.flatShading?"#define FLAT_SHADED":"",A.skinning?"#define USE_SKINNING":"",A.morphTargets?"#define USE_MORPHTARGETS":"",A.morphNormals&&A.flatShading===!1?"#define USE_MORPHNORMALS":"",A.morphColors&&A.isWebGL2?"#define USE_MORPHCOLORS":"",A.morphTargetsCount>0&&A.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",A.morphTargetsCount>0&&A.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+A.morphTextureStride:"",A.morphTargetsCount>0&&A.isWebGL2?"#define MORPHTARGETS_COUNT "+A.morphTargetsCount:"",A.doubleSided?"#define DOUBLE_SIDED":"",A.flipSided?"#define FLIP_SIDED":"",A.shadowMapEnabled?"#define USE_SHADOWMAP":"",A.shadowMapEnabled?"#define "+o:"",A.sizeAttenuation?"#define USE_SIZEATTENUATION":"",A.numLightProbes>0?"#define USE_LIGHT_PROBES":"",A.useLegacyLights?"#define LEGACY_LIGHTS":"",A.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",A.logarithmicDepthBuffer&&A.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(tr).join(`
`),f=[p,Hu(A),"#define SHADER_TYPE "+A.shaderType,"#define SHADER_NAME "+A.shaderName,g,A.useFog&&A.fog?"#define USE_FOG":"",A.useFog&&A.fogExp2?"#define FOG_EXP2":"",A.map?"#define USE_MAP":"",A.matcap?"#define USE_MATCAP":"",A.envMap?"#define USE_ENVMAP":"",A.envMap?"#define "+l:"",A.envMap?"#define "+c:"",A.envMap?"#define "+u:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",A.lightMap?"#define USE_LIGHTMAP":"",A.aoMap?"#define USE_AOMAP":"",A.bumpMap?"#define USE_BUMPMAP":"",A.normalMap?"#define USE_NORMALMAP":"",A.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",A.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",A.emissiveMap?"#define USE_EMISSIVEMAP":"",A.anisotropy?"#define USE_ANISOTROPY":"",A.anisotropyMap?"#define USE_ANISOTROPYMAP":"",A.clearcoat?"#define USE_CLEARCOAT":"",A.clearcoatMap?"#define USE_CLEARCOATMAP":"",A.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",A.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",A.iridescence?"#define USE_IRIDESCENCE":"",A.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",A.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",A.specularMap?"#define USE_SPECULARMAP":"",A.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",A.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",A.roughnessMap?"#define USE_ROUGHNESSMAP":"",A.metalnessMap?"#define USE_METALNESSMAP":"",A.alphaMap?"#define USE_ALPHAMAP":"",A.alphaTest?"#define USE_ALPHATEST":"",A.alphaHash?"#define USE_ALPHAHASH":"",A.sheen?"#define USE_SHEEN":"",A.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",A.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",A.transmission?"#define USE_TRANSMISSION":"",A.transmissionMap?"#define USE_TRANSMISSIONMAP":"",A.thicknessMap?"#define USE_THICKNESSMAP":"",A.vertexTangents&&A.flatShading===!1?"#define USE_TANGENT":"",A.vertexColors||A.instancingColor?"#define USE_COLOR":"",A.vertexAlphas?"#define USE_COLOR_ALPHA":"",A.vertexUv1s?"#define USE_UV1":"",A.vertexUv2s?"#define USE_UV2":"",A.vertexUv3s?"#define USE_UV3":"",A.pointsUvs?"#define USE_POINTS_UV":"",A.gradientMap?"#define USE_GRADIENTMAP":"",A.flatShading?"#define FLAT_SHADED":"",A.doubleSided?"#define DOUBLE_SIDED":"",A.flipSided?"#define FLIP_SIDED":"",A.shadowMapEnabled?"#define USE_SHADOWMAP":"",A.shadowMapEnabled?"#define "+o:"",A.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",A.numLightProbes>0?"#define USE_LIGHT_PROBES":"",A.useLegacyLights?"#define LEGACY_LIGHTS":"",A.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",A.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",A.logarithmicDepthBuffer&&A.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",A.toneMapping!==un?"#define TONE_MAPPING":"",A.toneMapping!==un?Ge.tonemapping_pars_fragment:"",A.toneMapping!==un?mx("toneMapping",A.toneMapping):"",A.dithering?"#define DITHERING":"",A.opaque?"#define OPAQUE":"",Ge.colorspace_pars_fragment,gx("linearToOutputTexel",A.outputColorSpace),A.useDepthPacking?"#define DEPTH_PACKING "+A.depthPacking:"",`
`].filter(tr).join(`
`)),s=Xo(s),s=Lu(s,A),s=Ru(s,A),a=Xo(a),a=Lu(a,A),a=Ru(a,A),s=Du(s),a=Du(a),A.isWebGL2&&A.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,d=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,f=["#define varying in",A.glslVersion===Au?"":"layout(location = 0) out highp vec4 pc_fragColor;",A.glslVersion===Au?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const w=v+d+s,E=v+f+a,x=Qu(i,i.VERTEX_SHADER,w),U=Qu(i,i.FRAGMENT_SHADER,E);if(i.attachShader(m,x),i.attachShader(m,U),A.index0AttributeName!==void 0?i.bindAttribLocation(m,0,A.index0AttributeName):A.morphTargets===!0&&i.bindAttribLocation(m,0,"position"),i.linkProgram(m),n.debug.checkShaderErrors){const B=i.getProgramInfoLog(m).trim(),M=i.getShaderInfoLog(x).trim(),z=i.getShaderInfoLog(U).trim();let Y=!0,W=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1)if(Y=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(i,m,x,U);else{const T=Iu(i,x,"vertex"),N=Iu(i,U,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Program Info Log: `+B+`
`+T+`
`+N)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(M===""||z==="")&&(W=!1);W&&(this.diagnostics={runnable:Y,programLog:B,vertexShader:{log:M,prefix:d},fragmentShader:{log:z,prefix:f}})}i.deleteShader(x),i.deleteShader(U);let y;this.getUniforms=function(){return y===void 0&&(y=new ys(i,m)),y};let R;return this.getAttributes=function(){return R===void 0&&(R=wx(i,m)),R},this.destroy=function(){t.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=A.shaderType,this.name=A.shaderName,this.id=fx++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=x,this.fragmentShader=U,this}let Qx=0;class Ix{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const A=e.vertexShader,t=e.fragmentShader,i=this._getShaderStage(A),r=this._getShaderStage(t),s=this._getShaderCacheForMaterial(e);return s.has(i)===!1&&(s.add(i),i.usedTimes++),s.has(r)===!1&&(s.add(r),r.usedTimes++),this}remove(e){const A=this.materialCache.get(e);for(const t of A)t.usedTimes--,t.usedTimes===0&&this.shaderCache.delete(t.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const A=this.materialCache;let t=A.get(e);return t===void 0&&(t=new Set,A.set(e,t)),t}_getShaderStage(e){const A=this.shaderCache;let t=A.get(e);return t===void 0&&(t=new Lx(e),A.set(e,t)),t}}class Lx{constructor(e){this.id=Qx++,this.code=e,this.usedTimes=0}}function Rx(n,e,A,t,i,r,s){const a=new al,o=new Ix,l=[],c=i.isWebGL2,u=i.logarithmicDepthBuffer,h=i.vertexTextures;let p=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(B){return B===0?"uv":`uv${B}`}function d(B,M,z,Y,W){const T=Y.fog,N=W.geometry,X=B.isMeshStandardMaterial?Y.environment:null,G=(B.isMeshStandardMaterial?A:e).get(B.envMap||X),ee=G&&G.mapping===ia?G.image.height:null,J=g[B.type];B.precision!==null&&(p=i.getMaxPrecision(B.precision),p!==B.precision&&console.warn("THREE.WebGLProgram.getParameters:",B.precision,"not supported, using",p,"instead."));const q=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,I=q!==void 0?q.length:0;let O=0;N.morphAttributes.position!==void 0&&(O=1),N.morphAttributes.normal!==void 0&&(O=2),N.morphAttributes.color!==void 0&&(O=3);let se,ue,de,Ee;if(J){const tA=Ct[J];se=tA.vertexShader,ue=tA.fragmentShader}else se=B.vertexShader,ue=B.fragmentShader,o.update(B),de=o.getVertexShaderID(B),Ee=o.getFragmentShaderID(B);const Ue=n.getRenderTarget(),ye=W.isInstancedMesh===!0,Ye=!!B.map,xA=!!B.matcap,Oe=!!G,D=!!B.aoMap,pA=!!B.lightMap,Se=!!B.bumpMap,De=!!B.normalMap,Ie=!!B.displacementMap,AA=!!B.emissiveMap,Ve=!!B.metalnessMap,Pe=!!B.roughnessMap,Je=B.anisotropy>0,gA=B.clearcoat>0,wA=B.iridescence>0,S=B.sheen>0,_=B.transmission>0,P=Je&&!!B.anisotropyMap,te=gA&&!!B.clearcoatMap,$=gA&&!!B.clearcoatNormalMap,ne=gA&&!!B.clearcoatRoughnessMap,ve=wA&&!!B.iridescenceMap,ae=wA&&!!B.iridescenceThicknessMap,ge=S&&!!B.sheenColorMap,b=S&&!!B.sheenRoughnessMap,ie=!!B.specularMap,Z=!!B.specularColorMap,be=!!B.specularIntensityMap,Ce=_&&!!B.transmissionMap,xe=_&&!!B.thicknessMap,we=!!B.gradientMap,F=!!B.alphaMap,oe=B.alphaTest>0,re=!!B.alphaHash,fe=!!B.extensions,le=!!N.attributes.uv1,j=!!N.attributes.uv2,_e=!!N.attributes.uv3;let Te=un;return B.toneMapped&&(Ue===null||Ue.isXRRenderTarget===!0)&&(Te=n.toneMapping),{isWebGL2:c,shaderID:J,shaderType:B.type,shaderName:B.name,vertexShader:se,fragmentShader:ue,defines:B.defines,customVertexShaderID:de,customFragmentShaderID:Ee,isRawShaderMaterial:B.isRawShaderMaterial===!0,glslVersion:B.glslVersion,precision:p,instancing:ye,instancingColor:ye&&W.instanceColor!==null,supportsVertexTextures:h,outputColorSpace:Ue===null?n.outputColorSpace:Ue.isXRRenderTarget===!0?Ue.texture.colorSpace:Wt,map:Ye,matcap:xA,envMap:Oe,envMapMode:Oe&&G.mapping,envMapCubeUVHeight:ee,aoMap:D,lightMap:pA,bumpMap:Se,normalMap:De,displacementMap:h&&Ie,emissiveMap:AA,normalMapObjectSpace:De&&B.normalMapType===T_,normalMapTangentSpace:De&&B.normalMapType===b_,metalnessMap:Ve,roughnessMap:Pe,anisotropy:Je,anisotropyMap:P,clearcoat:gA,clearcoatMap:te,clearcoatNormalMap:$,clearcoatRoughnessMap:ne,iridescence:wA,iridescenceMap:ve,iridescenceThicknessMap:ae,sheen:S,sheenColorMap:ge,sheenRoughnessMap:b,specularMap:ie,specularColorMap:Z,specularIntensityMap:be,transmission:_,transmissionMap:Ce,thicknessMap:xe,gradientMap:we,opaque:B.transparent===!1&&B.blending===vi,alphaMap:F,alphaTest:oe,alphaHash:re,combine:B.combine,mapUv:Ye&&m(B.map.channel),aoMapUv:D&&m(B.aoMap.channel),lightMapUv:pA&&m(B.lightMap.channel),bumpMapUv:Se&&m(B.bumpMap.channel),normalMapUv:De&&m(B.normalMap.channel),displacementMapUv:Ie&&m(B.displacementMap.channel),emissiveMapUv:AA&&m(B.emissiveMap.channel),metalnessMapUv:Ve&&m(B.metalnessMap.channel),roughnessMapUv:Pe&&m(B.roughnessMap.channel),anisotropyMapUv:P&&m(B.anisotropyMap.channel),clearcoatMapUv:te&&m(B.clearcoatMap.channel),clearcoatNormalMapUv:$&&m(B.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ne&&m(B.clearcoatRoughnessMap.channel),iridescenceMapUv:ve&&m(B.iridescenceMap.channel),iridescenceThicknessMapUv:ae&&m(B.iridescenceThicknessMap.channel),sheenColorMapUv:ge&&m(B.sheenColorMap.channel),sheenRoughnessMapUv:b&&m(B.sheenRoughnessMap.channel),specularMapUv:ie&&m(B.specularMap.channel),specularColorMapUv:Z&&m(B.specularColorMap.channel),specularIntensityMapUv:be&&m(B.specularIntensityMap.channel),transmissionMapUv:Ce&&m(B.transmissionMap.channel),thicknessMapUv:xe&&m(B.thicknessMap.channel),alphaMapUv:F&&m(B.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(De||Je),vertexColors:B.vertexColors,vertexAlphas:B.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,vertexUv1s:le,vertexUv2s:j,vertexUv3s:_e,pointsUvs:W.isPoints===!0&&!!N.attributes.uv&&(Ye||F),fog:!!T,useFog:B.fog===!0,fogExp2:T&&T.isFogExp2,flatShading:B.flatShading===!0,sizeAttenuation:B.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:W.isSkinnedMesh===!0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:I,morphTextureStride:O,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:B.dithering,shadowMapEnabled:n.shadowMap.enabled&&z.length>0,shadowMapType:n.shadowMap.type,toneMapping:Te,useLegacyLights:n._useLegacyLights,decodeVideoTexture:Ye&&B.map.isVideoTexture===!0&&Ze.getTransfer(B.map.colorSpace)===nA,premultipliedAlpha:B.premultipliedAlpha,doubleSided:B.side===ft,flipSided:B.side===KA,useDepthPacking:B.depthPacking>=0,depthPacking:B.depthPacking||0,index0AttributeName:B.index0AttributeName,extensionDerivatives:fe&&B.extensions.derivatives===!0,extensionFragDepth:fe&&B.extensions.fragDepth===!0,extensionDrawBuffers:fe&&B.extensions.drawBuffers===!0,extensionShaderTextureLOD:fe&&B.extensions.shaderTextureLOD===!0,rendererExtensionFragDepth:c||t.has("EXT_frag_depth"),rendererExtensionDrawBuffers:c||t.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:c||t.has("EXT_shader_texture_lod"),customProgramCacheKey:B.customProgramCacheKey()}}function f(B){const M=[];if(B.shaderID?M.push(B.shaderID):(M.push(B.customVertexShaderID),M.push(B.customFragmentShaderID)),B.defines!==void 0)for(const z in B.defines)M.push(z),M.push(B.defines[z]);return B.isRawShaderMaterial===!1&&(v(M,B),w(M,B),M.push(n.outputColorSpace)),M.push(B.customProgramCacheKey),M.join()}function v(B,M){B.push(M.precision),B.push(M.outputColorSpace),B.push(M.envMapMode),B.push(M.envMapCubeUVHeight),B.push(M.mapUv),B.push(M.alphaMapUv),B.push(M.lightMapUv),B.push(M.aoMapUv),B.push(M.bumpMapUv),B.push(M.normalMapUv),B.push(M.displacementMapUv),B.push(M.emissiveMapUv),B.push(M.metalnessMapUv),B.push(M.roughnessMapUv),B.push(M.anisotropyMapUv),B.push(M.clearcoatMapUv),B.push(M.clearcoatNormalMapUv),B.push(M.clearcoatRoughnessMapUv),B.push(M.iridescenceMapUv),B.push(M.iridescenceThicknessMapUv),B.push(M.sheenColorMapUv),B.push(M.sheenRoughnessMapUv),B.push(M.specularMapUv),B.push(M.specularColorMapUv),B.push(M.specularIntensityMapUv),B.push(M.transmissionMapUv),B.push(M.thicknessMapUv),B.push(M.combine),B.push(M.fogExp2),B.push(M.sizeAttenuation),B.push(M.morphTargetsCount),B.push(M.morphAttributeCount),B.push(M.numDirLights),B.push(M.numPointLights),B.push(M.numSpotLights),B.push(M.numSpotLightMaps),B.push(M.numHemiLights),B.push(M.numRectAreaLights),B.push(M.numDirLightShadows),B.push(M.numPointLightShadows),B.push(M.numSpotLightShadows),B.push(M.numSpotLightShadowsWithMaps),B.push(M.numLightProbes),B.push(M.shadowMapType),B.push(M.toneMapping),B.push(M.numClippingPlanes),B.push(M.numClipIntersection),B.push(M.depthPacking)}function w(B,M){a.disableAll(),M.isWebGL2&&a.enable(0),M.supportsVertexTextures&&a.enable(1),M.instancing&&a.enable(2),M.instancingColor&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),B.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.skinning&&a.enable(4),M.morphTargets&&a.enable(5),M.morphNormals&&a.enable(6),M.morphColors&&a.enable(7),M.premultipliedAlpha&&a.enable(8),M.shadowMapEnabled&&a.enable(9),M.useLegacyLights&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),B.push(a.mask)}function E(B){const M=g[B.type];let z;if(M){const Y=Ct[M];z=ww.clone(Y.uniforms)}else z=B.uniforms;return z}function x(B,M){let z;for(let Y=0,W=l.length;Y<W;Y++){const T=l[Y];if(T.cacheKey===M){z=T,++z.usedTimes;break}}return z===void 0&&(z=new Tx(n,M,B,r),l.push(z)),z}function U(B){if(--B.usedTimes===0){const M=l.indexOf(B);l[M]=l[l.length-1],l.pop(),B.destroy()}}function y(B){o.remove(B)}function R(){o.dispose()}return{getParameters:d,getProgramCacheKey:f,getUniforms:E,acquireProgram:x,releaseProgram:U,releaseShaderCache:y,programs:l,dispose:R}}function Dx(){let n=new WeakMap;function e(r){let s=n.get(r);return s===void 0&&(s={},n.set(r,s)),s}function A(r){n.delete(r)}function t(r,s,a){n.get(r)[s]=a}function i(){n=new WeakMap}return{get:e,remove:A,update:t,dispose:i}}function Hx(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Pu(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Ou(){const n=[];let e=0;const A=[],t=[],i=[];function r(){e=0,A.length=0,t.length=0,i.length=0}function s(u,h,p,g,m,d){let f=n[e];return f===void 0?(f={id:u.id,object:u,geometry:h,material:p,groupOrder:g,renderOrder:u.renderOrder,z:m,group:d},n[e]=f):(f.id=u.id,f.object=u,f.geometry=h,f.material=p,f.groupOrder=g,f.renderOrder=u.renderOrder,f.z=m,f.group=d),e++,f}function a(u,h,p,g,m,d){const f=s(u,h,p,g,m,d);p.transmission>0?t.push(f):p.transparent===!0?i.push(f):A.push(f)}function o(u,h,p,g,m,d){const f=s(u,h,p,g,m,d);p.transmission>0?t.unshift(f):p.transparent===!0?i.unshift(f):A.unshift(f)}function l(u,h){A.length>1&&A.sort(u||Hx),t.length>1&&t.sort(h||Pu),i.length>1&&i.sort(h||Pu)}function c(){for(let u=e,h=n.length;u<h;u++){const p=n[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:A,transmissive:t,transparent:i,init:r,push:a,unshift:o,finish:c,sort:l}}function Px(){let n=new WeakMap;function e(t,i){const r=n.get(t);let s;return r===void 0?(s=new Ou,n.set(t,[s])):i>=r.length?(s=new Ou,r.push(s)):s=r[i],s}function A(){n=new WeakMap}return{get:e,dispose:A}}function Ox(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let A;switch(e.type){case"DirectionalLight":A={direction:new Q,color:new je};break;case"SpotLight":A={position:new Q,direction:new Q,color:new je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":A={position:new Q,color:new je,distance:0,decay:0};break;case"HemisphereLight":A={direction:new Q,skyColor:new je,groundColor:new je};break;case"RectAreaLight":A={color:new je,position:new Q,halfWidth:new Q,halfHeight:new Q};break}return n[e.id]=A,A}}}function Nx(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let A;switch(e.type){case"DirectionalLight":A={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Fe};break;case"SpotLight":A={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Fe};break;case"PointLight":A={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Fe,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=A,A}}}let Gx=0;function Vx(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Kx(n,e){const A=new Ox,t=Nx(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new Q);const r=new Q,s=new CA,a=new CA;function o(c,u){let h=0,p=0,g=0;for(let Y=0;Y<9;Y++)i.probe[Y].set(0,0,0);let m=0,d=0,f=0,v=0,w=0,E=0,x=0,U=0,y=0,R=0,B=0;c.sort(Vx);const M=u===!0?Math.PI:1;for(let Y=0,W=c.length;Y<W;Y++){const T=c[Y],N=T.color,X=T.intensity,G=T.distance,ee=T.shadow&&T.shadow.map?T.shadow.map.texture:null;if(T.isAmbientLight)h+=N.r*X*M,p+=N.g*X*M,g+=N.b*X*M;else if(T.isLightProbe){for(let J=0;J<9;J++)i.probe[J].addScaledVector(T.sh.coefficients[J],X);B++}else if(T.isDirectionalLight){const J=A.get(T);if(J.color.copy(T.color).multiplyScalar(T.intensity*M),T.castShadow){const q=T.shadow,I=t.get(T);I.shadowBias=q.bias,I.shadowNormalBias=q.normalBias,I.shadowRadius=q.radius,I.shadowMapSize=q.mapSize,i.directionalShadow[m]=I,i.directionalShadowMap[m]=ee,i.directionalShadowMatrix[m]=T.shadow.matrix,E++}i.directional[m]=J,m++}else if(T.isSpotLight){const J=A.get(T);J.position.setFromMatrixPosition(T.matrixWorld),J.color.copy(N).multiplyScalar(X*M),J.distance=G,J.coneCos=Math.cos(T.angle),J.penumbraCos=Math.cos(T.angle*(1-T.penumbra)),J.decay=T.decay,i.spot[f]=J;const q=T.shadow;if(T.map&&(i.spotLightMap[y]=T.map,y++,q.updateMatrices(T),T.castShadow&&R++),i.spotLightMatrix[f]=q.matrix,T.castShadow){const I=t.get(T);I.shadowBias=q.bias,I.shadowNormalBias=q.normalBias,I.shadowRadius=q.radius,I.shadowMapSize=q.mapSize,i.spotShadow[f]=I,i.spotShadowMap[f]=ee,U++}f++}else if(T.isRectAreaLight){const J=A.get(T);J.color.copy(N).multiplyScalar(X),J.halfWidth.set(T.width*.5,0,0),J.halfHeight.set(0,T.height*.5,0),i.rectArea[v]=J,v++}else if(T.isPointLight){const J=A.get(T);if(J.color.copy(T.color).multiplyScalar(T.intensity*M),J.distance=T.distance,J.decay=T.decay,T.castShadow){const q=T.shadow,I=t.get(T);I.shadowBias=q.bias,I.shadowNormalBias=q.normalBias,I.shadowRadius=q.radius,I.shadowMapSize=q.mapSize,I.shadowCameraNear=q.camera.near,I.shadowCameraFar=q.camera.far,i.pointShadow[d]=I,i.pointShadowMap[d]=ee,i.pointShadowMatrix[d]=T.shadow.matrix,x++}i.point[d]=J,d++}else if(T.isHemisphereLight){const J=A.get(T);J.skyColor.copy(T.color).multiplyScalar(X*M),J.groundColor.copy(T.groundColor).multiplyScalar(X*M),i.hemi[w]=J,w++}}v>0&&(e.isWebGL2||n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=he.LTC_FLOAT_1,i.rectAreaLTC2=he.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=he.LTC_HALF_1,i.rectAreaLTC2=he.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=h,i.ambient[1]=p,i.ambient[2]=g;const z=i.hash;(z.directionalLength!==m||z.pointLength!==d||z.spotLength!==f||z.rectAreaLength!==v||z.hemiLength!==w||z.numDirectionalShadows!==E||z.numPointShadows!==x||z.numSpotShadows!==U||z.numSpotMaps!==y||z.numLightProbes!==B)&&(i.directional.length=m,i.spot.length=f,i.rectArea.length=v,i.point.length=d,i.hemi.length=w,i.directionalShadow.length=E,i.directionalShadowMap.length=E,i.pointShadow.length=x,i.pointShadowMap.length=x,i.spotShadow.length=U,i.spotShadowMap.length=U,i.directionalShadowMatrix.length=E,i.pointShadowMatrix.length=x,i.spotLightMatrix.length=U+y-R,i.spotLightMap.length=y,i.numSpotLightShadowsWithMaps=R,i.numLightProbes=B,z.directionalLength=m,z.pointLength=d,z.spotLength=f,z.rectAreaLength=v,z.hemiLength=w,z.numDirectionalShadows=E,z.numPointShadows=x,z.numSpotShadows=U,z.numSpotMaps=y,z.numLightProbes=B,i.version=Gx++)}function l(c,u){let h=0,p=0,g=0,m=0,d=0;const f=u.matrixWorldInverse;for(let v=0,w=c.length;v<w;v++){const E=c[v];if(E.isDirectionalLight){const x=i.directional[h];x.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(f),h++}else if(E.isSpotLight){const x=i.spot[g];x.position.setFromMatrixPosition(E.matrixWorld),x.position.applyMatrix4(f),x.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(f),g++}else if(E.isRectAreaLight){const x=i.rectArea[m];x.position.setFromMatrixPosition(E.matrixWorld),x.position.applyMatrix4(f),a.identity(),s.copy(E.matrixWorld),s.premultiply(f),a.extractRotation(s),x.halfWidth.set(E.width*.5,0,0),x.halfHeight.set(0,E.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),m++}else if(E.isPointLight){const x=i.point[p];x.position.setFromMatrixPosition(E.matrixWorld),x.position.applyMatrix4(f),p++}else if(E.isHemisphereLight){const x=i.hemi[d];x.direction.setFromMatrixPosition(E.matrixWorld),x.direction.transformDirection(f),d++}}}return{setup:o,setupView:l,state:i}}function Nu(n,e){const A=new Kx(n,e),t=[],i=[];function r(){t.length=0,i.length=0}function s(u){t.push(u)}function a(u){i.push(u)}function o(u){A.setup(t,u)}function l(u){A.setupView(t,u)}return{init:r,state:{lightsArray:t,shadowsArray:i,lights:A},setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function kx(n,e){let A=new WeakMap;function t(r,s=0){const a=A.get(r);let o;return a===void 0?(o=new Nu(n,e),A.set(r,[o])):s>=a.length?(o=new Nu(n,e),a.push(o)):o=a[s],o}function i(){A=new WeakMap}return{get:t,dispose:i}}class zx extends yr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=M_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Wx extends yr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Xx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Yx=`uniform sampler2D shadow_pass;
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
}`;function Jx(n,e,A){let t=new Mf;const i=new Fe,r=new Fe,s=new MA,a=new zx({depthPacking:F_}),o=new Wx,l={},c=A.maxTextureSize,u={[pn]:KA,[KA]:pn,[ft]:ft},h=new gn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Fe},radius:{value:4}},vertexShader:Xx,fragmentShader:Yx}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const g=new bt;g.setAttribute("position",new St(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const m=new Ut(g,h),d=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=sf;let f=this.type;this.render=function(x,U,y){if(d.enabled===!1||d.autoUpdate===!1&&d.needsUpdate===!1||x.length===0)return;const R=n.getRenderTarget(),B=n.getActiveCubeFace(),M=n.getActiveMipmapLevel(),z=n.state;z.setBlending(cn),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const Y=f!==Nt&&this.type===Nt,W=f===Nt&&this.type!==Nt;for(let T=0,N=x.length;T<N;T++){const X=x[T],G=X.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;i.copy(G.mapSize);const ee=G.getFrameExtents();if(i.multiply(ee),r.copy(G.mapSize),(i.x>c||i.y>c)&&(i.x>c&&(r.x=Math.floor(c/ee.x),i.x=r.x*ee.x,G.mapSize.x=r.x),i.y>c&&(r.y=Math.floor(c/ee.y),i.y=r.y*ee.y,G.mapSize.y=r.y)),G.map===null||Y===!0||W===!0){const q=this.type!==Nt?{minFilter:GA,magFilter:GA}:{};G.map!==null&&G.map.dispose(),G.map=new Nn(i.x,i.y,q),G.map.texture.name=X.name+".shadowMap",G.camera.updateProjectionMatrix()}n.setRenderTarget(G.map),n.clear();const J=G.getViewportCount();for(let q=0;q<J;q++){const I=G.getViewport(q);s.set(r.x*I.x,r.y*I.y,r.x*I.z,r.y*I.w),z.viewport(s),G.updateMatrices(X,q),t=G.getFrustum(),E(U,y,G.camera,X,this.type)}G.isPointLightShadow!==!0&&this.type===Nt&&v(G,y),G.needsUpdate=!1}f=this.type,d.needsUpdate=!1,n.setRenderTarget(R,B,M)};function v(x,U){const y=e.update(m);h.defines.VSM_SAMPLES!==x.blurSamples&&(h.defines.VSM_SAMPLES=x.blurSamples,p.defines.VSM_SAMPLES=x.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),x.mapPass===null&&(x.mapPass=new Nn(i.x,i.y)),h.uniforms.shadow_pass.value=x.map.texture,h.uniforms.resolution.value=x.mapSize,h.uniforms.radius.value=x.radius,n.setRenderTarget(x.mapPass),n.clear(),n.renderBufferDirect(U,null,y,h,m,null),p.uniforms.shadow_pass.value=x.mapPass.texture,p.uniforms.resolution.value=x.mapSize,p.uniforms.radius.value=x.radius,n.setRenderTarget(x.map),n.clear(),n.renderBufferDirect(U,null,y,p,m,null)}function w(x,U,y,R){let B=null;const M=y.isPointLight===!0?x.customDistanceMaterial:x.customDepthMaterial;if(M!==void 0)B=M;else if(B=y.isPointLight===!0?o:a,n.localClippingEnabled&&U.clipShadows===!0&&Array.isArray(U.clippingPlanes)&&U.clippingPlanes.length!==0||U.displacementMap&&U.displacementScale!==0||U.alphaMap&&U.alphaTest>0||U.map&&U.alphaTest>0){const z=B.uuid,Y=U.uuid;let W=l[z];W===void 0&&(W={},l[z]=W);let T=W[Y];T===void 0&&(T=B.clone(),W[Y]=T),B=T}if(B.visible=U.visible,B.wireframe=U.wireframe,R===Nt?B.side=U.shadowSide!==null?U.shadowSide:U.side:B.side=U.shadowSide!==null?U.shadowSide:u[U.side],B.alphaMap=U.alphaMap,B.alphaTest=U.alphaTest,B.map=U.map,B.clipShadows=U.clipShadows,B.clippingPlanes=U.clippingPlanes,B.clipIntersection=U.clipIntersection,B.displacementMap=U.displacementMap,B.displacementScale=U.displacementScale,B.displacementBias=U.displacementBias,B.wireframeLinewidth=U.wireframeLinewidth,B.linewidth=U.linewidth,y.isPointLight===!0&&B.isMeshDistanceMaterial===!0){const z=n.properties.get(B);z.light=y}return B}function E(x,U,y,R,B){if(x.visible===!1)return;if(x.layers.test(U.layers)&&(x.isMesh||x.isLine||x.isPoints)&&(x.castShadow||x.receiveShadow&&B===Nt)&&(!x.frustumCulled||t.intersectsObject(x))){x.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,x.matrixWorld);const Y=e.update(x),W=x.material;if(Array.isArray(W)){const T=Y.groups;for(let N=0,X=T.length;N<X;N++){const G=T[N],ee=W[G.materialIndex];if(ee&&ee.visible){const J=w(x,ee,R,B);n.renderBufferDirect(y,null,Y,J,x,G)}}}else if(W.visible){const T=w(x,W,R,B);n.renderBufferDirect(y,null,Y,T,x,null)}}const z=x.children;for(let Y=0,W=z.length;Y<W;Y++)E(z[Y],U,y,R,B)}}function qx(n,e,A){const t=A.isWebGL2;function i(){let F=!1;const oe=new MA;let re=null;const fe=new MA(0,0,0,0);return{setMask:function(le){re!==le&&!F&&(n.colorMask(le,le,le,le),re=le)},setLocked:function(le){F=le},setClear:function(le,j,_e,Te,lA){lA===!0&&(le*=Te,j*=Te,_e*=Te),oe.set(le,j,_e,Te),fe.equals(oe)===!1&&(n.clearColor(le,j,_e,Te),fe.copy(oe))},reset:function(){F=!1,re=null,fe.set(-1,0,0,0)}}}function r(){let F=!1,oe=null,re=null,fe=null;return{setTest:function(le){le?Ue(n.DEPTH_TEST):ye(n.DEPTH_TEST)},setMask:function(le){oe!==le&&!F&&(n.depthMask(le),oe=le)},setFunc:function(le){if(re!==le){switch(le){case i_:n.depthFunc(n.NEVER);break;case r_:n.depthFunc(n.ALWAYS);break;case s_:n.depthFunc(n.LESS);break;case No:n.depthFunc(n.LEQUAL);break;case a_:n.depthFunc(n.EQUAL);break;case o_:n.depthFunc(n.GEQUAL);break;case l_:n.depthFunc(n.GREATER);break;case c_:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}re=le}},setLocked:function(le){F=le},setClear:function(le){fe!==le&&(n.clearDepth(le),fe=le)},reset:function(){F=!1,oe=null,re=null,fe=null}}}function s(){let F=!1,oe=null,re=null,fe=null,le=null,j=null,_e=null,Te=null,lA=null;return{setTest:function(tA){F||(tA?Ue(n.STENCIL_TEST):ye(n.STENCIL_TEST))},setMask:function(tA){oe!==tA&&!F&&(n.stencilMask(tA),oe=tA)},setFunc:function(tA,mt,RA){(re!==tA||fe!==mt||le!==RA)&&(n.stencilFunc(tA,mt,RA),re=tA,fe=mt,le=RA)},setOp:function(tA,mt,RA){(j!==tA||_e!==mt||Te!==RA)&&(n.stencilOp(tA,mt,RA),j=tA,_e=mt,Te=RA)},setLocked:function(tA){F=tA},setClear:function(tA){lA!==tA&&(n.clearStencil(tA),lA=tA)},reset:function(){F=!1,oe=null,re=null,fe=null,le=null,j=null,_e=null,Te=null,lA=null}}}const a=new i,o=new r,l=new s,c=new WeakMap,u=new WeakMap;let h={},p={},g=new WeakMap,m=[],d=null,f=!1,v=null,w=null,E=null,x=null,U=null,y=null,R=null,B=!1,M=null,z=null,Y=null,W=null,T=null;const N=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,G=0;const ee=n.getParameter(n.VERSION);ee.indexOf("WebGL")!==-1?(G=parseFloat(/^WebGL (\d)/.exec(ee)[1]),X=G>=1):ee.indexOf("OpenGL ES")!==-1&&(G=parseFloat(/^OpenGL ES (\d)/.exec(ee)[1]),X=G>=2);let J=null,q={};const I=n.getParameter(n.SCISSOR_BOX),O=n.getParameter(n.VIEWPORT),se=new MA().fromArray(I),ue=new MA().fromArray(O);function de(F,oe,re,fe){const le=new Uint8Array(4),j=n.createTexture();n.bindTexture(F,j),n.texParameteri(F,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(F,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let _e=0;_e<re;_e++)t&&(F===n.TEXTURE_3D||F===n.TEXTURE_2D_ARRAY)?n.texImage3D(oe,0,n.RGBA,1,1,fe,0,n.RGBA,n.UNSIGNED_BYTE,le):n.texImage2D(oe+_e,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,le);return j}const Ee={};Ee[n.TEXTURE_2D]=de(n.TEXTURE_2D,n.TEXTURE_2D,1),Ee[n.TEXTURE_CUBE_MAP]=de(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),t&&(Ee[n.TEXTURE_2D_ARRAY]=de(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Ee[n.TEXTURE_3D]=de(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),o.setClear(1),l.setClear(0),Ue(n.DEPTH_TEST),o.setFunc(No),Ie(!1),AA(Ec),Ue(n.CULL_FACE),Se(cn);function Ue(F){h[F]!==!0&&(n.enable(F),h[F]=!0)}function ye(F){h[F]!==!1&&(n.disable(F),h[F]=!1)}function Ye(F,oe){return p[F]!==oe?(n.bindFramebuffer(F,oe),p[F]=oe,t&&(F===n.DRAW_FRAMEBUFFER&&(p[n.FRAMEBUFFER]=oe),F===n.FRAMEBUFFER&&(p[n.DRAW_FRAMEBUFFER]=oe)),!0):!1}function xA(F,oe){let re=m,fe=!1;if(F)if(re=g.get(oe),re===void 0&&(re=[],g.set(oe,re)),F.isWebGLMultipleRenderTargets){const le=F.texture;if(re.length!==le.length||re[0]!==n.COLOR_ATTACHMENT0){for(let j=0,_e=le.length;j<_e;j++)re[j]=n.COLOR_ATTACHMENT0+j;re.length=le.length,fe=!0}}else re[0]!==n.COLOR_ATTACHMENT0&&(re[0]=n.COLOR_ATTACHMENT0,fe=!0);else re[0]!==n.BACK&&(re[0]=n.BACK,fe=!0);fe&&(A.isWebGL2?n.drawBuffers(re):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(re))}function Oe(F){return d!==F?(n.useProgram(F),d=F,!0):!1}const D={[gi]:n.FUNC_ADD,[X0]:n.FUNC_SUBTRACT,[Y0]:n.FUNC_REVERSE_SUBTRACT};if(t)D[yc]=n.MIN,D[Sc]=n.MAX;else{const F=e.get("EXT_blend_minmax");F!==null&&(D[yc]=F.MIN_EXT,D[Sc]=F.MAX_EXT)}const pA={[J0]:n.ZERO,[q0]:n.ONE,[Z0]:n.SRC_COLOR,[af]:n.SRC_ALPHA,[n_]:n.SRC_ALPHA_SATURATE,[A_]:n.DST_COLOR,[$0]:n.DST_ALPHA,[j0]:n.ONE_MINUS_SRC_COLOR,[of]:n.ONE_MINUS_SRC_ALPHA,[t_]:n.ONE_MINUS_DST_COLOR,[e_]:n.ONE_MINUS_DST_ALPHA};function Se(F,oe,re,fe,le,j,_e,Te){if(F===cn){f===!0&&(ye(n.BLEND),f=!1);return}if(f===!1&&(Ue(n.BLEND),f=!0),F!==W0){if(F!==v||Te!==B){if((w!==gi||U!==gi)&&(n.blendEquation(n.FUNC_ADD),w=gi,U=gi),Te)switch(F){case vi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Cc:n.blendFunc(n.ONE,n.ONE);break;case xc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Uc:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case vi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Cc:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case xc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Uc:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}E=null,x=null,y=null,R=null,v=F,B=Te}return}le=le||oe,j=j||re,_e=_e||fe,(oe!==w||le!==U)&&(n.blendEquationSeparate(D[oe],D[le]),w=oe,U=le),(re!==E||fe!==x||j!==y||_e!==R)&&(n.blendFuncSeparate(pA[re],pA[fe],pA[j],pA[_e]),E=re,x=fe,y=j,R=_e),v=F,B=!1}function De(F,oe){F.side===ft?ye(n.CULL_FACE):Ue(n.CULL_FACE);let re=F.side===KA;oe&&(re=!re),Ie(re),F.blending===vi&&F.transparent===!1?Se(cn):Se(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.premultipliedAlpha),o.setFunc(F.depthFunc),o.setTest(F.depthTest),o.setMask(F.depthWrite),a.setMask(F.colorWrite);const fe=F.stencilWrite;l.setTest(fe),fe&&(l.setMask(F.stencilWriteMask),l.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),l.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),Pe(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?Ue(n.SAMPLE_ALPHA_TO_COVERAGE):ye(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ie(F){M!==F&&(F?n.frontFace(n.CW):n.frontFace(n.CCW),M=F)}function AA(F){F!==K0?(Ue(n.CULL_FACE),F!==z&&(F===Ec?n.cullFace(n.BACK):F===k0?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ye(n.CULL_FACE),z=F}function Ve(F){F!==Y&&(X&&n.lineWidth(F),Y=F)}function Pe(F,oe,re){F?(Ue(n.POLYGON_OFFSET_FILL),(W!==oe||T!==re)&&(n.polygonOffset(oe,re),W=oe,T=re)):ye(n.POLYGON_OFFSET_FILL)}function Je(F){F?Ue(n.SCISSOR_TEST):ye(n.SCISSOR_TEST)}function gA(F){F===void 0&&(F=n.TEXTURE0+N-1),J!==F&&(n.activeTexture(F),J=F)}function wA(F,oe,re){re===void 0&&(J===null?re=n.TEXTURE0+N-1:re=J);let fe=q[re];fe===void 0&&(fe={type:void 0,texture:void 0},q[re]=fe),(fe.type!==F||fe.texture!==oe)&&(J!==re&&(n.activeTexture(re),J=re),n.bindTexture(F,oe||Ee[F]),fe.type=F,fe.texture=oe)}function S(){const F=q[J];F!==void 0&&F.type!==void 0&&(n.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function _(){try{n.compressedTexImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function P(){try{n.compressedTexImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function te(){try{n.texSubImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function $(){try{n.texSubImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ne(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ve(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ae(){try{n.texStorage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ge(){try{n.texStorage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function b(){try{n.texImage2D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ie(){try{n.texImage3D.apply(n,arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Z(F){se.equals(F)===!1&&(n.scissor(F.x,F.y,F.z,F.w),se.copy(F))}function be(F){ue.equals(F)===!1&&(n.viewport(F.x,F.y,F.z,F.w),ue.copy(F))}function Ce(F,oe){let re=u.get(oe);re===void 0&&(re=new WeakMap,u.set(oe,re));let fe=re.get(F);fe===void 0&&(fe=n.getUniformBlockIndex(oe,F.name),re.set(F,fe))}function xe(F,oe){const fe=u.get(oe).get(F);c.get(oe)!==fe&&(n.uniformBlockBinding(oe,fe,F.__bindingPointIndex),c.set(oe,fe))}function we(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),t===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},J=null,q={},p={},g=new WeakMap,m=[],d=null,f=!1,v=null,w=null,E=null,x=null,U=null,y=null,R=null,B=!1,M=null,z=null,Y=null,W=null,T=null,se.set(0,0,n.canvas.width,n.canvas.height),ue.set(0,0,n.canvas.width,n.canvas.height),a.reset(),o.reset(),l.reset()}return{buffers:{color:a,depth:o,stencil:l},enable:Ue,disable:ye,bindFramebuffer:Ye,drawBuffers:xA,useProgram:Oe,setBlending:Se,setMaterial:De,setFlipSided:Ie,setCullFace:AA,setLineWidth:Ve,setPolygonOffset:Pe,setScissorTest:Je,activeTexture:gA,bindTexture:wA,unbindTexture:S,compressedTexImage2D:_,compressedTexImage3D:P,texImage2D:b,texImage3D:ie,updateUBOMapping:Ce,uniformBlockBinding:xe,texStorage2D:ae,texStorage3D:ge,texSubImage2D:te,texSubImage3D:$,compressedTexSubImage2D:ne,compressedTexSubImage3D:ve,scissor:Z,viewport:be,reset:we}}function Zx(n,e,A,t,i,r,s){const a=i.isWebGL2,o=i.maxTextures,l=i.maxCubemapSize,c=i.maxTextureSize,u=i.maxSamples,h=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,p=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),g=new WeakMap;let m;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(S,_){return f?new OffscreenCanvas(S,_):ks("canvas")}function w(S,_,P,te){let $=1;if((S.width>te||S.height>te)&&($=te/Math.max(S.width,S.height)),$<1||_===!0)if(typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&S instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&S instanceof ImageBitmap){const ne=_?Ks:Math.floor,ve=ne($*S.width),ae=ne($*S.height);m===void 0&&(m=v(ve,ae));const ge=P?v(ve,ae):m;return ge.width=ve,ge.height=ae,ge.getContext("2d").drawImage(S,0,0,ve,ae),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+S.width+"x"+S.height+") to ("+ve+"x"+ae+")."),ge}else return"data"in S&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+S.width+"x"+S.height+")."),S;return S}function E(S){return Wo(S.width)&&Wo(S.height)}function x(S){return a?!1:S.wrapS!==dt||S.wrapT!==dt||S.minFilter!==GA&&S.minFilter!==tt}function U(S,_){return S.generateMipmaps&&_&&S.minFilter!==GA&&S.minFilter!==tt}function y(S){n.generateMipmap(S)}function R(S,_,P,te,$=!1){if(a===!1)return _;if(S!==null){if(n[S]!==void 0)return n[S];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+S+"'")}let ne=_;if(_===n.RED&&(P===n.FLOAT&&(ne=n.R32F),P===n.HALF_FLOAT&&(ne=n.R16F),P===n.UNSIGNED_BYTE&&(ne=n.R8)),_===n.RED_INTEGER&&(P===n.UNSIGNED_BYTE&&(ne=n.R8UI),P===n.UNSIGNED_SHORT&&(ne=n.R16UI),P===n.UNSIGNED_INT&&(ne=n.R32UI),P===n.BYTE&&(ne=n.R8I),P===n.SHORT&&(ne=n.R16I),P===n.INT&&(ne=n.R32I)),_===n.RG&&(P===n.FLOAT&&(ne=n.RG32F),P===n.HALF_FLOAT&&(ne=n.RG16F),P===n.UNSIGNED_BYTE&&(ne=n.RG8)),_===n.RGBA){const ve=$?Os:Ze.getTransfer(te);P===n.FLOAT&&(ne=n.RGBA32F),P===n.HALF_FLOAT&&(ne=n.RGBA16F),P===n.UNSIGNED_BYTE&&(ne=ve===nA?n.SRGB8_ALPHA8:n.RGBA8),P===n.UNSIGNED_SHORT_4_4_4_4&&(ne=n.RGBA4),P===n.UNSIGNED_SHORT_5_5_5_1&&(ne=n.RGB5_A1)}return(ne===n.R16F||ne===n.R32F||ne===n.RG16F||ne===n.RG32F||ne===n.RGBA16F||ne===n.RGBA32F)&&e.get("EXT_color_buffer_float"),ne}function B(S,_,P){return U(S,P)===!0||S.isFramebufferTexture&&S.minFilter!==GA&&S.minFilter!==tt?Math.log2(Math.max(_.width,_.height))+1:S.mipmaps!==void 0&&S.mipmaps.length>0?S.mipmaps.length:S.isCompressedTexture&&Array.isArray(S.image)?_.mipmaps.length:1}function M(S){return S===GA||S===Mc||S===Ha?n.NEAREST:n.LINEAR}function z(S){const _=S.target;_.removeEventListener("dispose",z),W(_),_.isVideoTexture&&g.delete(_)}function Y(S){const _=S.target;_.removeEventListener("dispose",Y),N(_)}function W(S){const _=t.get(S);if(_.__webglInit===void 0)return;const P=S.source,te=d.get(P);if(te){const $=te[_.__cacheKey];$.usedTimes--,$.usedTimes===0&&T(S),Object.keys(te).length===0&&d.delete(P)}t.remove(S)}function T(S){const _=t.get(S);n.deleteTexture(_.__webglTexture);const P=S.source,te=d.get(P);delete te[_.__cacheKey],s.memory.textures--}function N(S){const _=S.texture,P=t.get(S),te=t.get(_);if(te.__webglTexture!==void 0&&(n.deleteTexture(te.__webglTexture),s.memory.textures--),S.depthTexture&&S.depthTexture.dispose(),S.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(P.__webglFramebuffer[$]))for(let ne=0;ne<P.__webglFramebuffer[$].length;ne++)n.deleteFramebuffer(P.__webglFramebuffer[$][ne]);else n.deleteFramebuffer(P.__webglFramebuffer[$]);P.__webglDepthbuffer&&n.deleteRenderbuffer(P.__webglDepthbuffer[$])}else{if(Array.isArray(P.__webglFramebuffer))for(let $=0;$<P.__webglFramebuffer.length;$++)n.deleteFramebuffer(P.__webglFramebuffer[$]);else n.deleteFramebuffer(P.__webglFramebuffer);if(P.__webglDepthbuffer&&n.deleteRenderbuffer(P.__webglDepthbuffer),P.__webglMultisampledFramebuffer&&n.deleteFramebuffer(P.__webglMultisampledFramebuffer),P.__webglColorRenderbuffer)for(let $=0;$<P.__webglColorRenderbuffer.length;$++)P.__webglColorRenderbuffer[$]&&n.deleteRenderbuffer(P.__webglColorRenderbuffer[$]);P.__webglDepthRenderbuffer&&n.deleteRenderbuffer(P.__webglDepthRenderbuffer)}if(S.isWebGLMultipleRenderTargets)for(let $=0,ne=_.length;$<ne;$++){const ve=t.get(_[$]);ve.__webglTexture&&(n.deleteTexture(ve.__webglTexture),s.memory.textures--),t.remove(_[$])}t.remove(_),t.remove(S)}let X=0;function G(){X=0}function ee(){const S=X;return S>=o&&console.warn("THREE.WebGLTextures: Trying to use "+S+" texture units while this GPU supports only "+o),X+=1,S}function J(S){const _=[];return _.push(S.wrapS),_.push(S.wrapT),_.push(S.wrapR||0),_.push(S.magFilter),_.push(S.minFilter),_.push(S.anisotropy),_.push(S.internalFormat),_.push(S.format),_.push(S.type),_.push(S.generateMipmaps),_.push(S.premultiplyAlpha),_.push(S.flipY),_.push(S.unpackAlignment),_.push(S.colorSpace),_.join()}function q(S,_){const P=t.get(S);if(S.isVideoTexture&&gA(S),S.isRenderTargetTexture===!1&&S.version>0&&P.__version!==S.version){const te=S.image;if(te===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(te.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Ye(P,S,_);return}}A.bindTexture(n.TEXTURE_2D,P.__webglTexture,n.TEXTURE0+_)}function I(S,_){const P=t.get(S);if(S.version>0&&P.__version!==S.version){Ye(P,S,_);return}A.bindTexture(n.TEXTURE_2D_ARRAY,P.__webglTexture,n.TEXTURE0+_)}function O(S,_){const P=t.get(S);if(S.version>0&&P.__version!==S.version){Ye(P,S,_);return}A.bindTexture(n.TEXTURE_3D,P.__webglTexture,n.TEXTURE0+_)}function se(S,_){const P=t.get(S);if(S.version>0&&P.__version!==S.version){xA(P,S,_);return}A.bindTexture(n.TEXTURE_CUBE_MAP,P.__webglTexture,n.TEXTURE0+_)}const ue={[Ko]:n.REPEAT,[dt]:n.CLAMP_TO_EDGE,[ko]:n.MIRRORED_REPEAT},de={[GA]:n.NEAREST,[Mc]:n.NEAREST_MIPMAP_NEAREST,[Ha]:n.NEAREST_MIPMAP_LINEAR,[tt]:n.LINEAR,[B_]:n.LINEAR_MIPMAP_NEAREST,[mr]:n.LINEAR_MIPMAP_LINEAR},Ee={[I_]:n.NEVER,[N_]:n.ALWAYS,[L_]:n.LESS,[D_]:n.LEQUAL,[R_]:n.EQUAL,[O_]:n.GEQUAL,[H_]:n.GREATER,[P_]:n.NOTEQUAL};function Ue(S,_,P){if(P?(n.texParameteri(S,n.TEXTURE_WRAP_S,ue[_.wrapS]),n.texParameteri(S,n.TEXTURE_WRAP_T,ue[_.wrapT]),(S===n.TEXTURE_3D||S===n.TEXTURE_2D_ARRAY)&&n.texParameteri(S,n.TEXTURE_WRAP_R,ue[_.wrapR]),n.texParameteri(S,n.TEXTURE_MAG_FILTER,de[_.magFilter]),n.texParameteri(S,n.TEXTURE_MIN_FILTER,de[_.minFilter])):(n.texParameteri(S,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(S,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(S===n.TEXTURE_3D||S===n.TEXTURE_2D_ARRAY)&&n.texParameteri(S,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(_.wrapS!==dt||_.wrapT!==dt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(S,n.TEXTURE_MAG_FILTER,M(_.magFilter)),n.texParameteri(S,n.TEXTURE_MIN_FILTER,M(_.minFilter)),_.minFilter!==GA&&_.minFilter!==tt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),_.compareFunction&&(n.texParameteri(S,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(S,n.TEXTURE_COMPARE_FUNC,Ee[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const te=e.get("EXT_texture_filter_anisotropic");if(_.magFilter===GA||_.minFilter!==Ha&&_.minFilter!==mr||_.type===an&&e.has("OES_texture_float_linear")===!1||a===!1&&_.type===Br&&e.has("OES_texture_half_float_linear")===!1)return;(_.anisotropy>1||t.get(_).__currentAnisotropy)&&(n.texParameterf(S,te.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,i.getMaxAnisotropy())),t.get(_).__currentAnisotropy=_.anisotropy)}}function ye(S,_){let P=!1;S.__webglInit===void 0&&(S.__webglInit=!0,_.addEventListener("dispose",z));const te=_.source;let $=d.get(te);$===void 0&&($={},d.set(te,$));const ne=J(_);if(ne!==S.__cacheKey){$[ne]===void 0&&($[ne]={texture:n.createTexture(),usedTimes:0},s.memory.textures++,P=!0),$[ne].usedTimes++;const ve=$[S.__cacheKey];ve!==void 0&&($[S.__cacheKey].usedTimes--,ve.usedTimes===0&&T(_)),S.__cacheKey=ne,S.__webglTexture=$[ne].texture}return P}function Ye(S,_,P){let te=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(te=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(te=n.TEXTURE_3D);const $=ye(S,_),ne=_.source;A.bindTexture(te,S.__webglTexture,n.TEXTURE0+P);const ve=t.get(ne);if(ne.version!==ve.__version||$===!0){A.activeTexture(n.TEXTURE0+P);const ae=Ze.getPrimaries(Ze.workingColorSpace),ge=_.colorSpace===it?null:Ze.getPrimaries(_.colorSpace),b=_.colorSpace===it||ae===ge?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,b);const ie=x(_)&&E(_.image)===!1;let Z=w(_.image,ie,!1,c);Z=wA(_,Z);const be=E(Z)||a,Ce=r.convert(_.format,_.colorSpace);let xe=r.convert(_.type),we=R(_.internalFormat,Ce,xe,_.colorSpace,_.isVideoTexture);Ue(te,_,be);let F;const oe=_.mipmaps,re=a&&_.isVideoTexture!==!0,fe=ve.__version===void 0||$===!0,le=B(_,Z,be);if(_.isDepthTexture)we=n.DEPTH_COMPONENT,a?_.type===an?we=n.DEPTH_COMPONENT32F:_.type===sn?we=n.DEPTH_COMPONENT24:_.type===Hn?we=n.DEPTH24_STENCIL8:we=n.DEPTH_COMPONENT16:_.type===an&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),_.format===Pn&&we===n.DEPTH_COMPONENT&&_.type!==il&&_.type!==sn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),_.type=sn,xe=r.convert(_.type)),_.format===Ri&&we===n.DEPTH_COMPONENT&&(we=n.DEPTH_STENCIL,_.type!==Hn&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),_.type=Hn,xe=r.convert(_.type))),fe&&(re?A.texStorage2D(n.TEXTURE_2D,1,we,Z.width,Z.height):A.texImage2D(n.TEXTURE_2D,0,we,Z.width,Z.height,0,Ce,xe,null));else if(_.isDataTexture)if(oe.length>0&&be){re&&fe&&A.texStorage2D(n.TEXTURE_2D,le,we,oe[0].width,oe[0].height);for(let j=0,_e=oe.length;j<_e;j++)F=oe[j],re?A.texSubImage2D(n.TEXTURE_2D,j,0,0,F.width,F.height,Ce,xe,F.data):A.texImage2D(n.TEXTURE_2D,j,we,F.width,F.height,0,Ce,xe,F.data);_.generateMipmaps=!1}else re?(fe&&A.texStorage2D(n.TEXTURE_2D,le,we,Z.width,Z.height),A.texSubImage2D(n.TEXTURE_2D,0,0,0,Z.width,Z.height,Ce,xe,Z.data)):A.texImage2D(n.TEXTURE_2D,0,we,Z.width,Z.height,0,Ce,xe,Z.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){re&&fe&&A.texStorage3D(n.TEXTURE_2D_ARRAY,le,we,oe[0].width,oe[0].height,Z.depth);for(let j=0,_e=oe.length;j<_e;j++)F=oe[j],_.format!==pt?Ce!==null?re?A.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,j,0,0,0,F.width,F.height,Z.depth,Ce,F.data,0,0):A.compressedTexImage3D(n.TEXTURE_2D_ARRAY,j,we,F.width,F.height,Z.depth,0,F.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):re?A.texSubImage3D(n.TEXTURE_2D_ARRAY,j,0,0,0,F.width,F.height,Z.depth,Ce,xe,F.data):A.texImage3D(n.TEXTURE_2D_ARRAY,j,we,F.width,F.height,Z.depth,0,Ce,xe,F.data)}else{re&&fe&&A.texStorage2D(n.TEXTURE_2D,le,we,oe[0].width,oe[0].height);for(let j=0,_e=oe.length;j<_e;j++)F=oe[j],_.format!==pt?Ce!==null?re?A.compressedTexSubImage2D(n.TEXTURE_2D,j,0,0,F.width,F.height,Ce,F.data):A.compressedTexImage2D(n.TEXTURE_2D,j,we,F.width,F.height,0,F.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):re?A.texSubImage2D(n.TEXTURE_2D,j,0,0,F.width,F.height,Ce,xe,F.data):A.texImage2D(n.TEXTURE_2D,j,we,F.width,F.height,0,Ce,xe,F.data)}else if(_.isDataArrayTexture)re?(fe&&A.texStorage3D(n.TEXTURE_2D_ARRAY,le,we,Z.width,Z.height,Z.depth),A.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,Ce,xe,Z.data)):A.texImage3D(n.TEXTURE_2D_ARRAY,0,we,Z.width,Z.height,Z.depth,0,Ce,xe,Z.data);else if(_.isData3DTexture)re?(fe&&A.texStorage3D(n.TEXTURE_3D,le,we,Z.width,Z.height,Z.depth),A.texSubImage3D(n.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,Ce,xe,Z.data)):A.texImage3D(n.TEXTURE_3D,0,we,Z.width,Z.height,Z.depth,0,Ce,xe,Z.data);else if(_.isFramebufferTexture){if(fe)if(re)A.texStorage2D(n.TEXTURE_2D,le,we,Z.width,Z.height);else{let j=Z.width,_e=Z.height;for(let Te=0;Te<le;Te++)A.texImage2D(n.TEXTURE_2D,Te,we,j,_e,0,Ce,xe,null),j>>=1,_e>>=1}}else if(oe.length>0&&be){re&&fe&&A.texStorage2D(n.TEXTURE_2D,le,we,oe[0].width,oe[0].height);for(let j=0,_e=oe.length;j<_e;j++)F=oe[j],re?A.texSubImage2D(n.TEXTURE_2D,j,0,0,Ce,xe,F):A.texImage2D(n.TEXTURE_2D,j,we,Ce,xe,F);_.generateMipmaps=!1}else re?(fe&&A.texStorage2D(n.TEXTURE_2D,le,we,Z.width,Z.height),A.texSubImage2D(n.TEXTURE_2D,0,0,0,Ce,xe,Z)):A.texImage2D(n.TEXTURE_2D,0,we,Ce,xe,Z);U(_,be)&&y(te),ve.__version=ne.version,_.onUpdate&&_.onUpdate(_)}S.__version=_.version}function xA(S,_,P){if(_.image.length!==6)return;const te=ye(S,_),$=_.source;A.bindTexture(n.TEXTURE_CUBE_MAP,S.__webglTexture,n.TEXTURE0+P);const ne=t.get($);if($.version!==ne.__version||te===!0){A.activeTexture(n.TEXTURE0+P);const ve=Ze.getPrimaries(Ze.workingColorSpace),ae=_.colorSpace===it?null:Ze.getPrimaries(_.colorSpace),ge=_.colorSpace===it||ve===ae?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ge);const b=_.isCompressedTexture||_.image[0].isCompressedTexture,ie=_.image[0]&&_.image[0].isDataTexture,Z=[];for(let j=0;j<6;j++)!b&&!ie?Z[j]=w(_.image[j],!1,!0,l):Z[j]=ie?_.image[j].image:_.image[j],Z[j]=wA(_,Z[j]);const be=Z[0],Ce=E(be)||a,xe=r.convert(_.format,_.colorSpace),we=r.convert(_.type),F=R(_.internalFormat,xe,we,_.colorSpace),oe=a&&_.isVideoTexture!==!0,re=ne.__version===void 0||te===!0;let fe=B(_,be,Ce);Ue(n.TEXTURE_CUBE_MAP,_,Ce);let le;if(b){oe&&re&&A.texStorage2D(n.TEXTURE_CUBE_MAP,fe,F,be.width,be.height);for(let j=0;j<6;j++){le=Z[j].mipmaps;for(let _e=0;_e<le.length;_e++){const Te=le[_e];_.format!==pt?xe!==null?oe?A.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,_e,0,0,Te.width,Te.height,xe,Te.data):A.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,_e,F,Te.width,Te.height,0,Te.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):oe?A.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,_e,0,0,Te.width,Te.height,xe,we,Te.data):A.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,_e,F,Te.width,Te.height,0,xe,we,Te.data)}}}else{le=_.mipmaps,oe&&re&&(le.length>0&&fe++,A.texStorage2D(n.TEXTURE_CUBE_MAP,fe,F,Z[0].width,Z[0].height));for(let j=0;j<6;j++)if(ie){oe?A.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Z[j].width,Z[j].height,xe,we,Z[j].data):A.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,F,Z[j].width,Z[j].height,0,xe,we,Z[j].data);for(let _e=0;_e<le.length;_e++){const lA=le[_e].image[j].image;oe?A.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,_e+1,0,0,lA.width,lA.height,xe,we,lA.data):A.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,_e+1,F,lA.width,lA.height,0,xe,we,lA.data)}}else{oe?A.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,xe,we,Z[j]):A.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,F,xe,we,Z[j]);for(let _e=0;_e<le.length;_e++){const Te=le[_e];oe?A.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,_e+1,0,0,xe,we,Te.image[j]):A.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,_e+1,F,xe,we,Te.image[j])}}}U(_,Ce)&&y(n.TEXTURE_CUBE_MAP),ne.__version=$.version,_.onUpdate&&_.onUpdate(_)}S.__version=_.version}function Oe(S,_,P,te,$,ne){const ve=r.convert(P.format,P.colorSpace),ae=r.convert(P.type),ge=R(P.internalFormat,ve,ae,P.colorSpace);if(!t.get(_).__hasExternalTextures){const ie=Math.max(1,_.width>>ne),Z=Math.max(1,_.height>>ne);$===n.TEXTURE_3D||$===n.TEXTURE_2D_ARRAY?A.texImage3D($,ne,ge,ie,Z,_.depth,0,ve,ae,null):A.texImage2D($,ne,ge,ie,Z,0,ve,ae,null)}A.bindFramebuffer(n.FRAMEBUFFER,S),Je(_)?h.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,te,$,t.get(P).__webglTexture,0,Pe(_)):($===n.TEXTURE_2D||$>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,te,$,t.get(P).__webglTexture,ne),A.bindFramebuffer(n.FRAMEBUFFER,null)}function D(S,_,P){if(n.bindRenderbuffer(n.RENDERBUFFER,S),_.depthBuffer&&!_.stencilBuffer){let te=a===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(P||Je(_)){const $=_.depthTexture;$&&$.isDepthTexture&&($.type===an?te=n.DEPTH_COMPONENT32F:$.type===sn&&(te=n.DEPTH_COMPONENT24));const ne=Pe(_);Je(_)?h.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ne,te,_.width,_.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,ne,te,_.width,_.height)}else n.renderbufferStorage(n.RENDERBUFFER,te,_.width,_.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,S)}else if(_.depthBuffer&&_.stencilBuffer){const te=Pe(_);P&&Je(_)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,te,n.DEPTH24_STENCIL8,_.width,_.height):Je(_)?h.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,te,n.DEPTH24_STENCIL8,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,S)}else{const te=_.isWebGLMultipleRenderTargets===!0?_.texture:[_.texture];for(let $=0;$<te.length;$++){const ne=te[$],ve=r.convert(ne.format,ne.colorSpace),ae=r.convert(ne.type),ge=R(ne.internalFormat,ve,ae,ne.colorSpace),b=Pe(_);P&&Je(_)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,b,ge,_.width,_.height):Je(_)?h.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,b,ge,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,ge,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function pA(S,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(A.bindFramebuffer(n.FRAMEBUFFER,S),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!t.get(_.depthTexture).__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),q(_.depthTexture,0);const te=t.get(_.depthTexture).__webglTexture,$=Pe(_);if(_.depthTexture.format===Pn)Je(_)?h.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,te,0,$):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,te,0);else if(_.depthTexture.format===Ri)Je(_)?h.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,te,0,$):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,te,0);else throw new Error("Unknown depthTexture format")}function Se(S){const _=t.get(S),P=S.isWebGLCubeRenderTarget===!0;if(S.depthTexture&&!_.__autoAllocateDepthBuffer){if(P)throw new Error("target.depthTexture not supported in Cube render targets");pA(_.__webglFramebuffer,S)}else if(P){_.__webglDepthbuffer=[];for(let te=0;te<6;te++)A.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[te]),_.__webglDepthbuffer[te]=n.createRenderbuffer(),D(_.__webglDepthbuffer[te],S,!1)}else A.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer=n.createRenderbuffer(),D(_.__webglDepthbuffer,S,!1);A.bindFramebuffer(n.FRAMEBUFFER,null)}function De(S,_,P){const te=t.get(S);_!==void 0&&Oe(te.__webglFramebuffer,S,S.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),P!==void 0&&Se(S)}function Ie(S){const _=S.texture,P=t.get(S),te=t.get(_);S.addEventListener("dispose",Y),S.isWebGLMultipleRenderTargets!==!0&&(te.__webglTexture===void 0&&(te.__webglTexture=n.createTexture()),te.__version=_.version,s.memory.textures++);const $=S.isWebGLCubeRenderTarget===!0,ne=S.isWebGLMultipleRenderTargets===!0,ve=E(S)||a;if($){P.__webglFramebuffer=[];for(let ae=0;ae<6;ae++)if(a&&_.mipmaps&&_.mipmaps.length>0){P.__webglFramebuffer[ae]=[];for(let ge=0;ge<_.mipmaps.length;ge++)P.__webglFramebuffer[ae][ge]=n.createFramebuffer()}else P.__webglFramebuffer[ae]=n.createFramebuffer()}else{if(a&&_.mipmaps&&_.mipmaps.length>0){P.__webglFramebuffer=[];for(let ae=0;ae<_.mipmaps.length;ae++)P.__webglFramebuffer[ae]=n.createFramebuffer()}else P.__webglFramebuffer=n.createFramebuffer();if(ne)if(i.drawBuffers){const ae=S.texture;for(let ge=0,b=ae.length;ge<b;ge++){const ie=t.get(ae[ge]);ie.__webglTexture===void 0&&(ie.__webglTexture=n.createTexture(),s.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&S.samples>0&&Je(S)===!1){const ae=ne?_:[_];P.__webglMultisampledFramebuffer=n.createFramebuffer(),P.__webglColorRenderbuffer=[],A.bindFramebuffer(n.FRAMEBUFFER,P.__webglMultisampledFramebuffer);for(let ge=0;ge<ae.length;ge++){const b=ae[ge];P.__webglColorRenderbuffer[ge]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,P.__webglColorRenderbuffer[ge]);const ie=r.convert(b.format,b.colorSpace),Z=r.convert(b.type),be=R(b.internalFormat,ie,Z,b.colorSpace,S.isXRRenderTarget===!0),Ce=Pe(S);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ce,be,S.width,S.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.RENDERBUFFER,P.__webglColorRenderbuffer[ge])}n.bindRenderbuffer(n.RENDERBUFFER,null),S.depthBuffer&&(P.__webglDepthRenderbuffer=n.createRenderbuffer(),D(P.__webglDepthRenderbuffer,S,!0)),A.bindFramebuffer(n.FRAMEBUFFER,null)}}if($){A.bindTexture(n.TEXTURE_CUBE_MAP,te.__webglTexture),Ue(n.TEXTURE_CUBE_MAP,_,ve);for(let ae=0;ae<6;ae++)if(a&&_.mipmaps&&_.mipmaps.length>0)for(let ge=0;ge<_.mipmaps.length;ge++)Oe(P.__webglFramebuffer[ae][ge],S,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,ge);else Oe(P.__webglFramebuffer[ae],S,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0);U(_,ve)&&y(n.TEXTURE_CUBE_MAP),A.unbindTexture()}else if(ne){const ae=S.texture;for(let ge=0,b=ae.length;ge<b;ge++){const ie=ae[ge],Z=t.get(ie);A.bindTexture(n.TEXTURE_2D,Z.__webglTexture),Ue(n.TEXTURE_2D,ie,ve),Oe(P.__webglFramebuffer,S,ie,n.COLOR_ATTACHMENT0+ge,n.TEXTURE_2D,0),U(ie,ve)&&y(n.TEXTURE_2D)}A.unbindTexture()}else{let ae=n.TEXTURE_2D;if((S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(a?ae=S.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),A.bindTexture(ae,te.__webglTexture),Ue(ae,_,ve),a&&_.mipmaps&&_.mipmaps.length>0)for(let ge=0;ge<_.mipmaps.length;ge++)Oe(P.__webglFramebuffer[ge],S,_,n.COLOR_ATTACHMENT0,ae,ge);else Oe(P.__webglFramebuffer,S,_,n.COLOR_ATTACHMENT0,ae,0);U(_,ve)&&y(ae),A.unbindTexture()}S.depthBuffer&&Se(S)}function AA(S){const _=E(S)||a,P=S.isWebGLMultipleRenderTargets===!0?S.texture:[S.texture];for(let te=0,$=P.length;te<$;te++){const ne=P[te];if(U(ne,_)){const ve=S.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,ae=t.get(ne).__webglTexture;A.bindTexture(ve,ae),y(ve),A.unbindTexture()}}}function Ve(S){if(a&&S.samples>0&&Je(S)===!1){const _=S.isWebGLMultipleRenderTargets?S.texture:[S.texture],P=S.width,te=S.height;let $=n.COLOR_BUFFER_BIT;const ne=[],ve=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ae=t.get(S),ge=S.isWebGLMultipleRenderTargets===!0;if(ge)for(let b=0;b<_.length;b++)A.bindFramebuffer(n.FRAMEBUFFER,ae.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+b,n.RENDERBUFFER,null),A.bindFramebuffer(n.FRAMEBUFFER,ae.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+b,n.TEXTURE_2D,null,0);A.bindFramebuffer(n.READ_FRAMEBUFFER,ae.__webglMultisampledFramebuffer),A.bindFramebuffer(n.DRAW_FRAMEBUFFER,ae.__webglFramebuffer);for(let b=0;b<_.length;b++){ne.push(n.COLOR_ATTACHMENT0+b),S.depthBuffer&&ne.push(ve);const ie=ae.__ignoreDepthValues!==void 0?ae.__ignoreDepthValues:!1;if(ie===!1&&(S.depthBuffer&&($|=n.DEPTH_BUFFER_BIT),S.stencilBuffer&&($|=n.STENCIL_BUFFER_BIT)),ge&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ae.__webglColorRenderbuffer[b]),ie===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[ve]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[ve])),ge){const Z=t.get(_[b]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Z,0)}n.blitFramebuffer(0,0,P,te,0,0,P,te,$,n.NEAREST),p&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ne)}if(A.bindFramebuffer(n.READ_FRAMEBUFFER,null),A.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ge)for(let b=0;b<_.length;b++){A.bindFramebuffer(n.FRAMEBUFFER,ae.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+b,n.RENDERBUFFER,ae.__webglColorRenderbuffer[b]);const ie=t.get(_[b]).__webglTexture;A.bindFramebuffer(n.FRAMEBUFFER,ae.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+b,n.TEXTURE_2D,ie,0)}A.bindFramebuffer(n.DRAW_FRAMEBUFFER,ae.__webglMultisampledFramebuffer)}}function Pe(S){return Math.min(u,S.samples)}function Je(S){const _=t.get(S);return a&&S.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function gA(S){const _=s.render.frame;g.get(S)!==_&&(g.set(S,_),S.update())}function wA(S,_){const P=S.colorSpace,te=S.format,$=S.type;return S.isCompressedTexture===!0||S.isVideoTexture===!0||S.format===zo||P!==Wt&&P!==it&&(Ze.getTransfer(P)===nA?a===!1?e.has("EXT_sRGB")===!0&&te===pt?(S.format=zo,S.minFilter=tt,S.generateMipmaps=!1):_=_f.sRGBToLinear(_):(te!==pt||$!==hn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",P)),_}this.allocateTextureUnit=ee,this.resetTextureUnits=G,this.setTexture2D=q,this.setTexture2DArray=I,this.setTexture3D=O,this.setTextureCube=se,this.rebindTextures=De,this.setupRenderTarget=Ie,this.updateRenderTargetMipmap=AA,this.updateMultisampleRenderTarget=Ve,this.setupDepthRenderbuffer=Se,this.setupFrameBufferTexture=Oe,this.useMultisampledRTT=Je}function jx(n,e,A){const t=A.isWebGL2;function i(r,s=it){let a;const o=Ze.getTransfer(s);if(r===hn)return n.UNSIGNED_BYTE;if(r===hf)return n.UNSIGNED_SHORT_4_4_4_4;if(r===ff)return n.UNSIGNED_SHORT_5_5_5_1;if(r===__)return n.BYTE;if(r===w_)return n.SHORT;if(r===il)return n.UNSIGNED_SHORT;if(r===uf)return n.INT;if(r===sn)return n.UNSIGNED_INT;if(r===an)return n.FLOAT;if(r===Br)return t?n.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===v_)return n.ALPHA;if(r===pt)return n.RGBA;if(r===E_)return n.LUMINANCE;if(r===C_)return n.LUMINANCE_ALPHA;if(r===Pn)return n.DEPTH_COMPONENT;if(r===Ri)return n.DEPTH_STENCIL;if(r===zo)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===x_)return n.RED;if(r===df)return n.RED_INTEGER;if(r===U_)return n.RG;if(r===pf)return n.RG_INTEGER;if(r===gf)return n.RGBA_INTEGER;if(r===Pa||r===Oa||r===Na||r===Ga)if(o===nA)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===Pa)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Oa)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Na)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Ga)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===Pa)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Oa)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Na)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Ga)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Fc||r===bc||r===Tc||r===Qc)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===Fc)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===bc)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Tc)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Qc)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===y_)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===Ic||r===Lc)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(r===Ic)return o===nA?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===Lc)return o===nA?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Rc||r===Dc||r===Hc||r===Pc||r===Oc||r===Nc||r===Gc||r===Vc||r===Kc||r===kc||r===zc||r===Wc||r===Xc||r===Yc)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(r===Rc)return o===nA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Dc)return o===nA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Hc)return o===nA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Pc)return o===nA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Oc)return o===nA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Nc)return o===nA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Gc)return o===nA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Vc)return o===nA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Kc)return o===nA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===kc)return o===nA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===zc)return o===nA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Wc)return o===nA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Xc)return o===nA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Yc)return o===nA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Va||r===Jc||r===qc)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(r===Va)return o===nA?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Jc)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===qc)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===S_||r===Zc||r===jc||r===$c)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(r===Va)return a.COMPRESSED_RED_RGTC1_EXT;if(r===Zc)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===jc)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===$c)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Hn?t?n.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):n[r]!==void 0?n[r]:null}return{convert:i}}class $x extends nt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class nr extends kA{constructor(){super(),this.isGroup=!0,this.type="Group"}}const eU={type:"move"};class co{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new nr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new nr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Q,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Q),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new nr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Q,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Q),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const A=this._hand;if(A)for(const t of e.hand.values())this._getHandJoint(A,t)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,A,t){let i=null,r=null,s=null;const a=this._targetRay,o=this._grip,l=this._hand;if(e&&A.session.visibilityState!=="visible-blurred"){if(l&&e.hand){s=!0;for(const m of e.hand.values()){const d=A.getJointPose(m,t),f=this._getHandJoint(l,m);d!==null&&(f.matrix.fromArray(d.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=d.radius),f.visible=d!==null}const c=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],h=c.position.distanceTo(u.position),p=.02,g=.005;l.inputState.pinching&&h>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else o!==null&&e.gripSpace&&(r=A.getPose(e.gripSpace,t),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1));a!==null&&(i=A.getPose(e.targetRaySpace,t),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(eU)))}return a!==null&&(a.visible=i!==null),o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),this}_getHandJoint(e,A){if(e.joints[A.jointName]===void 0){const t=new nr;t.matrixAutoUpdate=!1,t.visible=!1,e.joints[A.jointName]=t,e.add(t)}return e.joints[A.jointName]}}class AU extends qA{constructor(e,A,t,i,r,s,a,o,l,c){if(c=c!==void 0?c:Pn,c!==Pn&&c!==Ri)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");t===void 0&&c===Pn&&(t=sn),t===void 0&&c===Ri&&(t=Hn),super(null,i,r,s,a,o,c,t,l),this.isDepthTexture=!0,this.image={width:e,height:A},this.magFilter=a!==void 0?a:GA,this.minFilter=o!==void 0?o:GA,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const A=super.toJSON(e);return this.compareFunction!==null&&(A.compareFunction=this.compareFunction),A}}class tU extends Vn{constructor(e,A){super();const t=this;let i=null,r=1,s=null,a="local-floor",o=1,l=null,c=null,u=null,h=null,p=null,g=null;const m=A.getContextAttributes();let d=null,f=null;const v=[],w=[],E=new nt;E.layers.enable(1),E.viewport=new MA;const x=new nt;x.layers.enable(2),x.viewport=new MA;const U=[E,x],y=new $x;y.layers.enable(1),y.layers.enable(2);let R=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(I){let O=v[I];return O===void 0&&(O=new co,v[I]=O),O.getTargetRaySpace()},this.getControllerGrip=function(I){let O=v[I];return O===void 0&&(O=new co,v[I]=O),O.getGripSpace()},this.getHand=function(I){let O=v[I];return O===void 0&&(O=new co,v[I]=O),O.getHandSpace()};function M(I){const O=w.indexOf(I.inputSource);if(O===-1)return;const se=v[O];se!==void 0&&(se.update(I.inputSource,I.frame,l||s),se.dispatchEvent({type:I.type,data:I.inputSource}))}function z(){i.removeEventListener("select",M),i.removeEventListener("selectstart",M),i.removeEventListener("selectend",M),i.removeEventListener("squeeze",M),i.removeEventListener("squeezestart",M),i.removeEventListener("squeezeend",M),i.removeEventListener("end",z),i.removeEventListener("inputsourceschange",Y);for(let I=0;I<v.length;I++){const O=w[I];O!==null&&(w[I]=null,v[I].disconnect(O))}R=null,B=null,e.setRenderTarget(d),p=null,h=null,u=null,i=null,f=null,q.stop(),t.isPresenting=!1,t.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(I){r=I,t.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(I){a=I,t.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||s},this.setReferenceSpace=function(I){l=I},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(I){if(i=I,i!==null){if(d=e.getRenderTarget(),i.addEventListener("select",M),i.addEventListener("selectstart",M),i.addEventListener("selectend",M),i.addEventListener("squeeze",M),i.addEventListener("squeezestart",M),i.addEventListener("squeezeend",M),i.addEventListener("end",z),i.addEventListener("inputsourceschange",Y),m.xrCompatible!==!0&&await A.makeXRCompatible(),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const O={antialias:i.renderState.layers===void 0?m.antialias:!0,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(i,A,O),i.updateRenderState({baseLayer:p}),f=new Nn(p.framebufferWidth,p.framebufferHeight,{format:pt,type:hn,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let O=null,se=null,ue=null;m.depth&&(ue=m.stencil?A.DEPTH24_STENCIL8:A.DEPTH_COMPONENT24,O=m.stencil?Ri:Pn,se=m.stencil?Hn:sn);const de={colorFormat:A.RGBA8,depthFormat:ue,scaleFactor:r};u=new XRWebGLBinding(i,A),h=u.createProjectionLayer(de),i.updateRenderState({layers:[h]}),f=new Nn(h.textureWidth,h.textureHeight,{format:pt,type:hn,depthTexture:new AU(h.textureWidth,h.textureHeight,se,void 0,void 0,void 0,void 0,void 0,void 0,O),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0});const Ee=e.properties.get(f);Ee.__ignoreDepthValues=h.ignoreDepthValues}f.isXRRenderTarget=!0,this.setFoveation(o),l=null,s=await i.requestReferenceSpace(a),q.setContext(i),q.start(),t.isPresenting=!0,t.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function Y(I){for(let O=0;O<I.removed.length;O++){const se=I.removed[O],ue=w.indexOf(se);ue>=0&&(w[ue]=null,v[ue].disconnect(se))}for(let O=0;O<I.added.length;O++){const se=I.added[O];let ue=w.indexOf(se);if(ue===-1){for(let Ee=0;Ee<v.length;Ee++)if(Ee>=w.length){w.push(se),ue=Ee;break}else if(w[Ee]===null){w[Ee]=se,ue=Ee;break}if(ue===-1)break}const de=v[ue];de&&de.connect(se)}}const W=new Q,T=new Q;function N(I,O,se){W.setFromMatrixPosition(O.matrixWorld),T.setFromMatrixPosition(se.matrixWorld);const ue=W.distanceTo(T),de=O.projectionMatrix.elements,Ee=se.projectionMatrix.elements,Ue=de[14]/(de[10]-1),ye=de[14]/(de[10]+1),Ye=(de[9]+1)/de[5],xA=(de[9]-1)/de[5],Oe=(de[8]-1)/de[0],D=(Ee[8]+1)/Ee[0],pA=Ue*Oe,Se=Ue*D,De=ue/(-Oe+D),Ie=De*-Oe;O.matrixWorld.decompose(I.position,I.quaternion,I.scale),I.translateX(Ie),I.translateZ(De),I.matrixWorld.compose(I.position,I.quaternion,I.scale),I.matrixWorldInverse.copy(I.matrixWorld).invert();const AA=Ue+De,Ve=ye+De,Pe=pA-Ie,Je=Se+(ue-Ie),gA=Ye*ye/Ve*AA,wA=xA*ye/Ve*AA;I.projectionMatrix.makePerspective(Pe,Je,gA,wA,AA,Ve),I.projectionMatrixInverse.copy(I.projectionMatrix).invert()}function X(I,O){O===null?I.matrixWorld.copy(I.matrix):I.matrixWorld.multiplyMatrices(O.matrixWorld,I.matrix),I.matrixWorldInverse.copy(I.matrixWorld).invert()}this.updateCamera=function(I){if(i===null)return;y.near=x.near=E.near=I.near,y.far=x.far=E.far=I.far,(R!==y.near||B!==y.far)&&(i.updateRenderState({depthNear:y.near,depthFar:y.far}),R=y.near,B=y.far);const O=I.parent,se=y.cameras;X(y,O);for(let ue=0;ue<se.length;ue++)X(se[ue],O);se.length===2?N(y,E,x):y.projectionMatrix.copy(E.projectionMatrix),G(I,y,O)};function G(I,O,se){se===null?I.matrix.copy(O.matrixWorld):(I.matrix.copy(se.matrixWorld),I.matrix.invert(),I.matrix.multiply(O.matrixWorld)),I.matrix.decompose(I.position,I.quaternion,I.scale),I.updateMatrixWorld(!0),I.projectionMatrix.copy(O.projectionMatrix),I.projectionMatrixInverse.copy(O.projectionMatrixInverse),I.isPerspectiveCamera&&(I.fov=_r*2*Math.atan(1/I.projectionMatrix.elements[5]),I.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(h===null&&p===null))return o},this.setFoveation=function(I){o=I,h!==null&&(h.fixedFoveation=I),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=I)};let ee=null;function J(I,O){if(c=O.getViewerPose(l||s),g=O,c!==null){const se=c.views;p!==null&&(e.setRenderTargetFramebuffer(f,p.framebuffer),e.setRenderTarget(f));let ue=!1;se.length!==y.cameras.length&&(y.cameras.length=0,ue=!0);for(let de=0;de<se.length;de++){const Ee=se[de];let Ue=null;if(p!==null)Ue=p.getViewport(Ee);else{const Ye=u.getViewSubImage(h,Ee);Ue=Ye.viewport,de===0&&(e.setRenderTargetTextures(f,Ye.colorTexture,h.ignoreDepthValues?void 0:Ye.depthStencilTexture),e.setRenderTarget(f))}let ye=U[de];ye===void 0&&(ye=new nt,ye.layers.enable(de),ye.viewport=new MA,U[de]=ye),ye.matrix.fromArray(Ee.transform.matrix),ye.matrix.decompose(ye.position,ye.quaternion,ye.scale),ye.projectionMatrix.fromArray(Ee.projectionMatrix),ye.projectionMatrixInverse.copy(ye.projectionMatrix).invert(),ye.viewport.set(Ue.x,Ue.y,Ue.width,Ue.height),de===0&&(y.matrix.copy(ye.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),ue===!0&&y.cameras.push(ye)}}for(let se=0;se<v.length;se++){const ue=w[se],de=v[se];ue!==null&&de!==void 0&&de.update(ue,O,l||s)}ee&&ee(I,O),O.detectedPlanes&&t.dispatchEvent({type:"planesdetected",data:O}),g=null}const q=new Ff;q.setAnimationLoop(J),this.setAnimationLoop=function(I){ee=I},this.dispose=function(){}}}function nU(n,e){function A(d,f){d.matrixAutoUpdate===!0&&d.updateMatrix(),f.value.copy(d.matrix)}function t(d,f){f.color.getRGB(d.fogColor.value,Uf(n)),f.isFog?(d.fogNear.value=f.near,d.fogFar.value=f.far):f.isFogExp2&&(d.fogDensity.value=f.density)}function i(d,f,v,w,E){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(d,f):f.isMeshToonMaterial?(r(d,f),u(d,f)):f.isMeshPhongMaterial?(r(d,f),c(d,f)):f.isMeshStandardMaterial?(r(d,f),h(d,f),f.isMeshPhysicalMaterial&&p(d,f,E)):f.isMeshMatcapMaterial?(r(d,f),g(d,f)):f.isMeshDepthMaterial?r(d,f):f.isMeshDistanceMaterial?(r(d,f),m(d,f)):f.isMeshNormalMaterial?r(d,f):f.isLineBasicMaterial?(s(d,f),f.isLineDashedMaterial&&a(d,f)):f.isPointsMaterial?o(d,f,v,w):f.isSpriteMaterial?l(d,f):f.isShadowMaterial?(d.color.value.copy(f.color),d.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(d,f){d.opacity.value=f.opacity,f.color&&d.diffuse.value.copy(f.color),f.emissive&&d.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(d.map.value=f.map,A(f.map,d.mapTransform)),f.alphaMap&&(d.alphaMap.value=f.alphaMap,A(f.alphaMap,d.alphaMapTransform)),f.bumpMap&&(d.bumpMap.value=f.bumpMap,A(f.bumpMap,d.bumpMapTransform),d.bumpScale.value=f.bumpScale,f.side===KA&&(d.bumpScale.value*=-1)),f.normalMap&&(d.normalMap.value=f.normalMap,A(f.normalMap,d.normalMapTransform),d.normalScale.value.copy(f.normalScale),f.side===KA&&d.normalScale.value.negate()),f.displacementMap&&(d.displacementMap.value=f.displacementMap,A(f.displacementMap,d.displacementMapTransform),d.displacementScale.value=f.displacementScale,d.displacementBias.value=f.displacementBias),f.emissiveMap&&(d.emissiveMap.value=f.emissiveMap,A(f.emissiveMap,d.emissiveMapTransform)),f.specularMap&&(d.specularMap.value=f.specularMap,A(f.specularMap,d.specularMapTransform)),f.alphaTest>0&&(d.alphaTest.value=f.alphaTest);const v=e.get(f).envMap;if(v&&(d.envMap.value=v,d.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,d.reflectivity.value=f.reflectivity,d.ior.value=f.ior,d.refractionRatio.value=f.refractionRatio),f.lightMap){d.lightMap.value=f.lightMap;const w=n._useLegacyLights===!0?Math.PI:1;d.lightMapIntensity.value=f.lightMapIntensity*w,A(f.lightMap,d.lightMapTransform)}f.aoMap&&(d.aoMap.value=f.aoMap,d.aoMapIntensity.value=f.aoMapIntensity,A(f.aoMap,d.aoMapTransform))}function s(d,f){d.diffuse.value.copy(f.color),d.opacity.value=f.opacity,f.map&&(d.map.value=f.map,A(f.map,d.mapTransform))}function a(d,f){d.dashSize.value=f.dashSize,d.totalSize.value=f.dashSize+f.gapSize,d.scale.value=f.scale}function o(d,f,v,w){d.diffuse.value.copy(f.color),d.opacity.value=f.opacity,d.size.value=f.size*v,d.scale.value=w*.5,f.map&&(d.map.value=f.map,A(f.map,d.uvTransform)),f.alphaMap&&(d.alphaMap.value=f.alphaMap,A(f.alphaMap,d.alphaMapTransform)),f.alphaTest>0&&(d.alphaTest.value=f.alphaTest)}function l(d,f){d.diffuse.value.copy(f.color),d.opacity.value=f.opacity,d.rotation.value=f.rotation,f.map&&(d.map.value=f.map,A(f.map,d.mapTransform)),f.alphaMap&&(d.alphaMap.value=f.alphaMap,A(f.alphaMap,d.alphaMapTransform)),f.alphaTest>0&&(d.alphaTest.value=f.alphaTest)}function c(d,f){d.specular.value.copy(f.specular),d.shininess.value=Math.max(f.shininess,1e-4)}function u(d,f){f.gradientMap&&(d.gradientMap.value=f.gradientMap)}function h(d,f){d.metalness.value=f.metalness,f.metalnessMap&&(d.metalnessMap.value=f.metalnessMap,A(f.metalnessMap,d.metalnessMapTransform)),d.roughness.value=f.roughness,f.roughnessMap&&(d.roughnessMap.value=f.roughnessMap,A(f.roughnessMap,d.roughnessMapTransform)),e.get(f).envMap&&(d.envMapIntensity.value=f.envMapIntensity)}function p(d,f,v){d.ior.value=f.ior,f.sheen>0&&(d.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),d.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(d.sheenColorMap.value=f.sheenColorMap,A(f.sheenColorMap,d.sheenColorMapTransform)),f.sheenRoughnessMap&&(d.sheenRoughnessMap.value=f.sheenRoughnessMap,A(f.sheenRoughnessMap,d.sheenRoughnessMapTransform))),f.clearcoat>0&&(d.clearcoat.value=f.clearcoat,d.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(d.clearcoatMap.value=f.clearcoatMap,A(f.clearcoatMap,d.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(d.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,A(f.clearcoatRoughnessMap,d.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(d.clearcoatNormalMap.value=f.clearcoatNormalMap,A(f.clearcoatNormalMap,d.clearcoatNormalMapTransform),d.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===KA&&d.clearcoatNormalScale.value.negate())),f.iridescence>0&&(d.iridescence.value=f.iridescence,d.iridescenceIOR.value=f.iridescenceIOR,d.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],d.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(d.iridescenceMap.value=f.iridescenceMap,A(f.iridescenceMap,d.iridescenceMapTransform)),f.iridescenceThicknessMap&&(d.iridescenceThicknessMap.value=f.iridescenceThicknessMap,A(f.iridescenceThicknessMap,d.iridescenceThicknessMapTransform))),f.transmission>0&&(d.transmission.value=f.transmission,d.transmissionSamplerMap.value=v.texture,d.transmissionSamplerSize.value.set(v.width,v.height),f.transmissionMap&&(d.transmissionMap.value=f.transmissionMap,A(f.transmissionMap,d.transmissionMapTransform)),d.thickness.value=f.thickness,f.thicknessMap&&(d.thicknessMap.value=f.thicknessMap,A(f.thicknessMap,d.thicknessMapTransform)),d.attenuationDistance.value=f.attenuationDistance,d.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(d.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(d.anisotropyMap.value=f.anisotropyMap,A(f.anisotropyMap,d.anisotropyMapTransform))),d.specularIntensity.value=f.specularIntensity,d.specularColor.value.copy(f.specularColor),f.specularColorMap&&(d.specularColorMap.value=f.specularColorMap,A(f.specularColorMap,d.specularColorMapTransform)),f.specularIntensityMap&&(d.specularIntensityMap.value=f.specularIntensityMap,A(f.specularIntensityMap,d.specularIntensityMapTransform))}function g(d,f){f.matcap&&(d.matcap.value=f.matcap)}function m(d,f){const v=e.get(f).light;d.referencePosition.value.setFromMatrixPosition(v.matrixWorld),d.nearDistance.value=v.shadow.camera.near,d.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:t,refreshMaterialUniforms:i}}function iU(n,e,A,t){let i={},r={},s=[];const a=A.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function o(v,w){const E=w.program;t.uniformBlockBinding(v,E)}function l(v,w){let E=i[v.id];E===void 0&&(g(v),E=c(v),i[v.id]=E,v.addEventListener("dispose",d));const x=w.program;t.updateUBOMapping(v,x);const U=e.render.frame;r[v.id]!==U&&(h(v),r[v.id]=U)}function c(v){const w=u();v.__bindingPointIndex=w;const E=n.createBuffer(),x=v.__size,U=v.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,x,U),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,E),E}function u(){for(let v=0;v<a;v++)if(s.indexOf(v)===-1)return s.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(v){const w=i[v.id],E=v.uniforms,x=v.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let U=0,y=E.length;U<y;U++){const R=E[U];if(p(R,U,x)===!0){const B=R.__offset,M=Array.isArray(R.value)?R.value:[R.value];let z=0;for(let Y=0;Y<M.length;Y++){const W=M[Y],T=m(W);typeof W=="number"?(R.__data[0]=W,n.bufferSubData(n.UNIFORM_BUFFER,B+z,R.__data)):W.isMatrix3?(R.__data[0]=W.elements[0],R.__data[1]=W.elements[1],R.__data[2]=W.elements[2],R.__data[3]=W.elements[0],R.__data[4]=W.elements[3],R.__data[5]=W.elements[4],R.__data[6]=W.elements[5],R.__data[7]=W.elements[0],R.__data[8]=W.elements[6],R.__data[9]=W.elements[7],R.__data[10]=W.elements[8],R.__data[11]=W.elements[0]):(W.toArray(R.__data,z),z+=T.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,B,R.__data)}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(v,w,E){const x=v.value;if(E[w]===void 0){if(typeof x=="number")E[w]=x;else{const U=Array.isArray(x)?x:[x],y=[];for(let R=0;R<U.length;R++)y.push(U[R].clone());E[w]=y}return!0}else if(typeof x=="number"){if(E[w]!==x)return E[w]=x,!0}else{const U=Array.isArray(E[w])?E[w]:[E[w]],y=Array.isArray(x)?x:[x];for(let R=0;R<U.length;R++){const B=U[R];if(B.equals(y[R])===!1)return B.copy(y[R]),!0}}return!1}function g(v){const w=v.uniforms;let E=0;const x=16;let U=0;for(let y=0,R=w.length;y<R;y++){const B=w[y],M={boundary:0,storage:0},z=Array.isArray(B.value)?B.value:[B.value];for(let Y=0,W=z.length;Y<W;Y++){const T=z[Y],N=m(T);M.boundary+=N.boundary,M.storage+=N.storage}if(B.__data=new Float32Array(M.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=E,y>0){U=E%x;const Y=x-U;U!==0&&Y-M.boundary<0&&(E+=x-U,B.__offset=E)}E+=M.storage}return U=E%x,U>0&&(E+=x-U),v.__size=E,v.__cache={},this}function m(v){const w={boundary:0,storage:0};return typeof v=="number"?(w.boundary=4,w.storage=4):v.isVector2?(w.boundary=8,w.storage=8):v.isVector3||v.isColor?(w.boundary=16,w.storage=12):v.isVector4?(w.boundary=16,w.storage=16):v.isMatrix3?(w.boundary=48,w.storage=48):v.isMatrix4?(w.boundary=64,w.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),w}function d(v){const w=v.target;w.removeEventListener("dispose",d);const E=s.indexOf(w.__bindingPointIndex);s.splice(E,1),n.deleteBuffer(i[w.id]),delete i[w.id],delete r[w.id]}function f(){for(const v in i)n.deleteBuffer(i[v]);s=[],i={},r={}}return{bind:o,update:l,dispose:f}}class Lf{constructor(e={}){const{canvas:A=tw(),context:t=null,depth:i=!0,stencil:r=!0,alpha:s=!1,antialias:a=!1,premultipliedAlpha:o=!0,preserveDrawingBuffer:l=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let h;t!==null?h=t.getContextAttributes().alpha:h=s;const p=new Uint32Array(4),g=new Int32Array(4);let m=null,d=null;const f=[],v=[];this.domElement=A,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=yA,this._useLegacyLights=!1,this.toneMapping=un,this.toneMappingExposure=1;const w=this;let E=!1,x=0,U=0,y=null,R=-1,B=null;const M=new MA,z=new MA;let Y=null;const W=new je(0);let T=0,N=A.width,X=A.height,G=1,ee=null,J=null;const q=new MA(0,0,N,X),I=new MA(0,0,N,X);let O=!1;const se=new Mf;let ue=!1,de=!1,Ee=null;const Ue=new CA,ye=new Fe,Ye=new Q,xA={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Oe(){return y===null?G:1}let D=t;function pA(C,L){for(let K=0;K<C.length;K++){const H=C[K],k=A.getContext(H,L);if(k!==null)return k}return null}try{const C={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:o,preserveDrawingBuffer:l,powerPreference:c,failIfMajorPerformanceCaveat:u};if("setAttribute"in A&&A.setAttribute("data-engine",`three.js r${nl}`),A.addEventListener("webglcontextlost",oe,!1),A.addEventListener("webglcontextrestored",re,!1),A.addEventListener("webglcontextcreationerror",fe,!1),D===null){const L=["webgl2","webgl","experimental-webgl"];if(w.isWebGL1Renderer===!0&&L.shift(),D=pA(L,C),D===null)throw pA(L)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&D instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),D.getShaderPrecisionFormat===void 0&&(D.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let Se,De,Ie,AA,Ve,Pe,Je,gA,wA,S,_,P,te,$,ne,ve,ae,ge,b,ie,Z,be,Ce,xe;function we(){Se=new pC(D),De=new oC(D,Se,e),Se.init(De),be=new jx(D,Se,De),Ie=new qx(D,Se,De),AA=new BC(D),Ve=new Dx,Pe=new Zx(D,Se,Ie,Ve,De,be,AA),Je=new cC(w),gA=new dC(w),wA=new Sw(D,De),Ce=new sC(D,Se,wA,De),S=new gC(D,wA,AA,Ce),_=new EC(D,S,wA,AA),b=new vC(D,De,Pe),ve=new lC(Ve),P=new Rx(w,Je,gA,Se,De,Ce,ve),te=new nU(w,Ve),$=new Px,ne=new kx(Se,De),ge=new rC(w,Je,gA,Ie,_,h,o),ae=new Jx(w,_,De),xe=new iU(D,AA,De,Ie),ie=new aC(D,Se,AA,De),Z=new mC(D,Se,AA,De),AA.programs=P.programs,w.capabilities=De,w.extensions=Se,w.properties=Ve,w.renderLists=$,w.shadowMap=ae,w.state=Ie,w.info=AA}we();const F=new tU(w,D);this.xr=F,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const C=Se.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=Se.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(C){C!==void 0&&(G=C,this.setSize(N,X,!1))},this.getSize=function(C){return C.set(N,X)},this.setSize=function(C,L,K=!0){if(F.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}N=C,X=L,A.width=Math.floor(C*G),A.height=Math.floor(L*G),K===!0&&(A.style.width=C+"px",A.style.height=L+"px"),this.setViewport(0,0,C,L)},this.getDrawingBufferSize=function(C){return C.set(N*G,X*G).floor()},this.setDrawingBufferSize=function(C,L,K){N=C,X=L,G=K,A.width=Math.floor(C*K),A.height=Math.floor(L*K),this.setViewport(0,0,C,L)},this.getCurrentViewport=function(C){return C.copy(M)},this.getViewport=function(C){return C.copy(q)},this.setViewport=function(C,L,K,H){C.isVector4?q.set(C.x,C.y,C.z,C.w):q.set(C,L,K,H),Ie.viewport(M.copy(q).multiplyScalar(G).floor())},this.getScissor=function(C){return C.copy(I)},this.setScissor=function(C,L,K,H){C.isVector4?I.set(C.x,C.y,C.z,C.w):I.set(C,L,K,H),Ie.scissor(z.copy(I).multiplyScalar(G).floor())},this.getScissorTest=function(){return O},this.setScissorTest=function(C){Ie.setScissorTest(O=C)},this.setOpaqueSort=function(C){ee=C},this.setTransparentSort=function(C){J=C},this.getClearColor=function(C){return C.copy(ge.getClearColor())},this.setClearColor=function(){ge.setClearColor.apply(ge,arguments)},this.getClearAlpha=function(){return ge.getClearAlpha()},this.setClearAlpha=function(){ge.setClearAlpha.apply(ge,arguments)},this.clear=function(C=!0,L=!0,K=!0){let H=0;if(C){let k=!1;if(y!==null){const Be=y.texture.format;k=Be===gf||Be===pf||Be===df}if(k){const Be=y.texture.type,Me=Be===hn||Be===sn||Be===il||Be===Hn||Be===hf||Be===ff,Le=ge.getClearColor(),Re=ge.getClearAlpha(),ke=Le.r,Qe=Le.g,Ne=Le.b;Me?(p[0]=ke,p[1]=Qe,p[2]=Ne,p[3]=Re,D.clearBufferuiv(D.COLOR,0,p)):(g[0]=ke,g[1]=Qe,g[2]=Ne,g[3]=Re,D.clearBufferiv(D.COLOR,0,g))}else H|=D.COLOR_BUFFER_BIT}L&&(H|=D.DEPTH_BUFFER_BIT),K&&(H|=D.STENCIL_BUFFER_BIT),D.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){A.removeEventListener("webglcontextlost",oe,!1),A.removeEventListener("webglcontextrestored",re,!1),A.removeEventListener("webglcontextcreationerror",fe,!1),$.dispose(),ne.dispose(),Ve.dispose(),Je.dispose(),gA.dispose(),_.dispose(),Ce.dispose(),xe.dispose(),P.dispose(),F.dispose(),F.removeEventListener("sessionstart",tA),F.removeEventListener("sessionend",mt),Ee&&(Ee.dispose(),Ee=null),RA.stop()};function oe(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function re(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const C=AA.autoReset,L=ae.enabled,K=ae.autoUpdate,H=ae.needsUpdate,k=ae.type;we(),AA.autoReset=C,ae.enabled=L,ae.autoUpdate=K,ae.needsUpdate=H,ae.type=k}function fe(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function le(C){const L=C.target;L.removeEventListener("dispose",le),j(L)}function j(C){_e(C),Ve.remove(C)}function _e(C){const L=Ve.get(C).programs;L!==void 0&&(L.forEach(function(K){P.releaseProgram(K)}),C.isShaderMaterial&&P.releaseShaderCache(C))}this.renderBufferDirect=function(C,L,K,H,k,Be){L===null&&(L=xA);const Me=k.isMesh&&k.matrixWorld.determinant()<0,Le=kf(C,L,K,H,k);Ie.setMaterial(H,Me);let Re=K.index,ke=1;if(H.wireframe===!0){if(Re=S.getWireframeAttribute(K),Re===void 0)return;ke=2}const Qe=K.drawRange,Ne=K.attributes.position;let rA=Qe.start*ke,sA=(Qe.start+Qe.count)*ke;Be!==null&&(rA=Math.max(rA,Be.start*ke),sA=Math.min(sA,(Be.start+Be.count)*ke)),Re!==null?(rA=Math.max(rA,0),sA=Math.min(sA,Re.count)):Ne!=null&&(rA=Math.max(rA,0),sA=Math.min(sA,Ne.count));const ZA=sA-rA;if(ZA<0||ZA===1/0)return;Ce.setup(k,H,Le,K,Re);let Tt,cA=ie;if(Re!==null&&(Tt=wA.get(Re),cA=Z,cA.setIndex(Tt)),k.isMesh)H.wireframe===!0?(Ie.setLineWidth(H.wireframeLinewidth*Oe()),cA.setMode(D.LINES)):cA.setMode(D.TRIANGLES);else if(k.isLine){let ze=H.linewidth;ze===void 0&&(ze=1),Ie.setLineWidth(ze*Oe()),k.isLineSegments?cA.setMode(D.LINES):k.isLineLoop?cA.setMode(D.LINE_LOOP):cA.setMode(D.LINE_STRIP)}else k.isPoints?cA.setMode(D.POINTS):k.isSprite&&cA.setMode(D.TRIANGLES);if(k.isInstancedMesh)cA.renderInstances(rA,ZA,k.count);else if(K.isInstancedBufferGeometry){const ze=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,ca=Math.min(K.instanceCount,ze);cA.renderInstances(rA,ZA,ca)}else cA.render(rA,ZA)},this.compile=function(C,L){function K(H,k,Be){H.transparent===!0&&H.side===ft&&H.forceSinglePass===!1?(H.side=KA,H.needsUpdate=!0,Fr(H,k,Be),H.side=pn,H.needsUpdate=!0,Fr(H,k,Be),H.side=ft):Fr(H,k,Be)}d=ne.get(C),d.init(),v.push(d),C.traverseVisible(function(H){H.isLight&&H.layers.test(L.layers)&&(d.pushLight(H),H.castShadow&&d.pushShadow(H))}),d.setupLights(w._useLegacyLights),C.traverse(function(H){const k=H.material;if(k)if(Array.isArray(k))for(let Be=0;Be<k.length;Be++){const Me=k[Be];K(Me,C,H)}else K(k,C,H)}),v.pop(),d=null};let Te=null;function lA(C){Te&&Te(C)}function tA(){RA.stop()}function mt(){RA.start()}const RA=new Ff;RA.setAnimationLoop(lA),typeof self<"u"&&RA.setContext(self),this.setAnimationLoop=function(C){Te=C,F.setAnimationLoop(C),C===null?RA.stop():RA.start()},F.addEventListener("sessionstart",tA),F.addEventListener("sessionend",mt),this.render=function(C,L){if(L!==void 0&&L.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),F.enabled===!0&&F.isPresenting===!0&&(F.cameraAutoUpdate===!0&&F.updateCamera(L),L=F.getCamera()),C.isScene===!0&&C.onBeforeRender(w,C,L,y),d=ne.get(C,v.length),d.init(),v.push(d),Ue.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),se.setFromProjectionMatrix(Ue),de=this.localClippingEnabled,ue=ve.init(this.clippingPlanes,de),m=$.get(C,f.length),m.init(),f.push(m),fl(C,L,0,w.sortObjects),m.finish(),w.sortObjects===!0&&m.sort(ee,J),this.info.render.frame++,ue===!0&&ve.beginShadows();const K=d.state.shadowsArray;if(ae.render(K,C,L),ue===!0&&ve.endShadows(),this.info.autoReset===!0&&this.info.reset(),ge.render(m,C),d.setupLights(w._useLegacyLights),L.isArrayCamera){const H=L.cameras;for(let k=0,Be=H.length;k<Be;k++){const Me=H[k];dl(m,C,Me,Me.viewport)}}else dl(m,C,L);y!==null&&(Pe.updateMultisampleRenderTarget(y),Pe.updateRenderTargetMipmap(y)),C.isScene===!0&&C.onAfterRender(w,C,L),Ce.resetDefaultState(),R=-1,B=null,v.pop(),v.length>0?d=v[v.length-1]:d=null,f.pop(),f.length>0?m=f[f.length-1]:m=null};function fl(C,L,K,H){if(C.visible===!1)return;if(C.layers.test(L.layers)){if(C.isGroup)K=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(L);else if(C.isLight)d.pushLight(C),C.castShadow&&d.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||se.intersectsSprite(C)){H&&Ye.setFromMatrixPosition(C.matrixWorld).applyMatrix4(Ue);const Me=_.update(C),Le=C.material;Le.visible&&m.push(C,Me,Le,K,Ye.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||se.intersectsObject(C))){const Me=_.update(C),Le=C.material;if(H&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),Ye.copy(C.boundingSphere.center)):(Me.boundingSphere===null&&Me.computeBoundingSphere(),Ye.copy(Me.boundingSphere.center)),Ye.applyMatrix4(C.matrixWorld).applyMatrix4(Ue)),Array.isArray(Le)){const Re=Me.groups;for(let ke=0,Qe=Re.length;ke<Qe;ke++){const Ne=Re[ke],rA=Le[Ne.materialIndex];rA&&rA.visible&&m.push(C,Me,rA,K,Ye.z,Ne)}}else Le.visible&&m.push(C,Me,Le,K,Ye.z,null)}}const Be=C.children;for(let Me=0,Le=Be.length;Me<Le;Me++)fl(Be[Me],L,K,H)}function dl(C,L,K,H){const k=C.opaque,Be=C.transmissive,Me=C.transparent;d.setupLightsView(K),ue===!0&&ve.setGlobalState(w.clippingPlanes,K),Be.length>0&&Kf(k,Be,L,K),H&&Ie.viewport(M.copy(H)),k.length>0&&Mr(k,L,K),Be.length>0&&Mr(Be,L,K),Me.length>0&&Mr(Me,L,K),Ie.buffers.depth.setTest(!0),Ie.buffers.depth.setMask(!0),Ie.buffers.color.setMask(!0),Ie.setPolygonOffset(!1)}function Kf(C,L,K,H){const k=De.isWebGL2;Ee===null&&(Ee=new Nn(1,1,{generateMipmaps:!0,type:Se.has("EXT_color_buffer_half_float")?Br:hn,minFilter:mr,samples:k?4:0})),w.getDrawingBufferSize(ye),k?Ee.setSize(ye.x,ye.y):Ee.setSize(Ks(ye.x),Ks(ye.y));const Be=w.getRenderTarget();w.setRenderTarget(Ee),w.getClearColor(W),T=w.getClearAlpha(),T<1&&w.setClearColor(16777215,.5),w.clear();const Me=w.toneMapping;w.toneMapping=un,Mr(C,K,H),Pe.updateMultisampleRenderTarget(Ee),Pe.updateRenderTargetMipmap(Ee);let Le=!1;for(let Re=0,ke=L.length;Re<ke;Re++){const Qe=L[Re],Ne=Qe.object,rA=Qe.geometry,sA=Qe.material,ZA=Qe.group;if(sA.side===ft&&Ne.layers.test(H.layers)){const Tt=sA.side;sA.side=KA,sA.needsUpdate=!0,pl(Ne,K,H,rA,sA,ZA),sA.side=Tt,sA.needsUpdate=!0,Le=!0}}Le===!0&&(Pe.updateMultisampleRenderTarget(Ee),Pe.updateRenderTargetMipmap(Ee)),w.setRenderTarget(Be),w.setClearColor(W,T),w.toneMapping=Me}function Mr(C,L,K){const H=L.isScene===!0?L.overrideMaterial:null;for(let k=0,Be=C.length;k<Be;k++){const Me=C[k],Le=Me.object,Re=Me.geometry,ke=H===null?Me.material:H,Qe=Me.group;Le.layers.test(K.layers)&&pl(Le,L,K,Re,ke,Qe)}}function pl(C,L,K,H,k,Be){C.onBeforeRender(w,L,K,H,k,Be),C.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),k.onBeforeRender(w,L,K,H,C,Be),k.transparent===!0&&k.side===ft&&k.forceSinglePass===!1?(k.side=KA,k.needsUpdate=!0,w.renderBufferDirect(K,L,H,k,C,Be),k.side=pn,k.needsUpdate=!0,w.renderBufferDirect(K,L,H,k,C,Be),k.side=ft):w.renderBufferDirect(K,L,H,k,C,Be),C.onAfterRender(w,L,K,H,k,Be)}function Fr(C,L,K){L.isScene!==!0&&(L=xA);const H=Ve.get(C),k=d.state.lights,Be=d.state.shadowsArray,Me=k.state.version,Le=P.getParameters(C,k.state,Be,L,K),Re=P.getProgramCacheKey(Le);let ke=H.programs;H.environment=C.isMeshStandardMaterial?L.environment:null,H.fog=L.fog,H.envMap=(C.isMeshStandardMaterial?gA:Je).get(C.envMap||H.environment),ke===void 0&&(C.addEventListener("dispose",le),ke=new Map,H.programs=ke);let Qe=ke.get(Re);if(Qe!==void 0){if(H.currentProgram===Qe&&H.lightsStateVersion===Me)return gl(C,Le),Qe}else Le.uniforms=P.getUniforms(C),C.onBuild(K,Le,w),C.onBeforeCompile(Le,w),Qe=P.acquireProgram(Le,Re),ke.set(Re,Qe),H.uniforms=Le.uniforms;const Ne=H.uniforms;(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Ne.clippingPlanes=ve.uniform),gl(C,Le),H.needsLights=Wf(C),H.lightsStateVersion=Me,H.needsLights&&(Ne.ambientLightColor.value=k.state.ambient,Ne.lightProbe.value=k.state.probe,Ne.directionalLights.value=k.state.directional,Ne.directionalLightShadows.value=k.state.directionalShadow,Ne.spotLights.value=k.state.spot,Ne.spotLightShadows.value=k.state.spotShadow,Ne.rectAreaLights.value=k.state.rectArea,Ne.ltc_1.value=k.state.rectAreaLTC1,Ne.ltc_2.value=k.state.rectAreaLTC2,Ne.pointLights.value=k.state.point,Ne.pointLightShadows.value=k.state.pointShadow,Ne.hemisphereLights.value=k.state.hemi,Ne.directionalShadowMap.value=k.state.directionalShadowMap,Ne.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Ne.spotShadowMap.value=k.state.spotShadowMap,Ne.spotLightMatrix.value=k.state.spotLightMatrix,Ne.spotLightMap.value=k.state.spotLightMap,Ne.pointShadowMap.value=k.state.pointShadowMap,Ne.pointShadowMatrix.value=k.state.pointShadowMatrix);const rA=Qe.getUniforms(),sA=ys.seqWithValue(rA.seq,Ne);return H.currentProgram=Qe,H.uniformsList=sA,Qe}function gl(C,L){const K=Ve.get(C);K.outputColorSpace=L.outputColorSpace,K.instancing=L.instancing,K.instancingColor=L.instancingColor,K.skinning=L.skinning,K.morphTargets=L.morphTargets,K.morphNormals=L.morphNormals,K.morphColors=L.morphColors,K.morphTargetsCount=L.morphTargetsCount,K.numClippingPlanes=L.numClippingPlanes,K.numIntersection=L.numClipIntersection,K.vertexAlphas=L.vertexAlphas,K.vertexTangents=L.vertexTangents,K.toneMapping=L.toneMapping}function kf(C,L,K,H,k){L.isScene!==!0&&(L=xA),Pe.resetTextureUnits();const Be=L.fog,Me=H.isMeshStandardMaterial?L.environment:null,Le=y===null?w.outputColorSpace:y.isXRRenderTarget===!0?y.texture.colorSpace:Wt,Re=(H.isMeshStandardMaterial?gA:Je).get(H.envMap||Me),ke=H.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,Qe=!!K.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Ne=!!K.morphAttributes.position,rA=!!K.morphAttributes.normal,sA=!!K.morphAttributes.color;let ZA=un;H.toneMapped&&(y===null||y.isXRRenderTarget===!0)&&(ZA=w.toneMapping);const Tt=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,cA=Tt!==void 0?Tt.length:0,ze=Ve.get(H),ca=d.state.lights;if(ue===!0&&(de===!0||C!==B)){const WA=C===B&&H.id===R;ve.setState(H,C,WA)}let uA=!1;H.version===ze.__version?(ze.needsLights&&ze.lightsStateVersion!==ca.state.version||ze.outputColorSpace!==Le||k.isInstancedMesh&&ze.instancing===!1||!k.isInstancedMesh&&ze.instancing===!0||k.isSkinnedMesh&&ze.skinning===!1||!k.isSkinnedMesh&&ze.skinning===!0||k.isInstancedMesh&&ze.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&ze.instancingColor===!1&&k.instanceColor!==null||ze.envMap!==Re||H.fog===!0&&ze.fog!==Be||ze.numClippingPlanes!==void 0&&(ze.numClippingPlanes!==ve.numPlanes||ze.numIntersection!==ve.numIntersection)||ze.vertexAlphas!==ke||ze.vertexTangents!==Qe||ze.morphTargets!==Ne||ze.morphNormals!==rA||ze.morphColors!==sA||ze.toneMapping!==ZA||De.isWebGL2===!0&&ze.morphTargetsCount!==cA)&&(uA=!0):(uA=!0,ze.__version=H.version);let mn=ze.currentProgram;uA===!0&&(mn=Fr(H,L,k));let ml=!1,Ni=!1,ua=!1;const DA=mn.getUniforms(),Bn=ze.uniforms;if(Ie.useProgram(mn.program)&&(ml=!0,Ni=!0,ua=!0),H.id!==R&&(R=H.id,Ni=!0),ml||B!==C){DA.setValue(D,"projectionMatrix",C.projectionMatrix),DA.setValue(D,"viewMatrix",C.matrixWorldInverse);const WA=DA.map.cameraPosition;WA!==void 0&&WA.setValue(D,Ye.setFromMatrixPosition(C.matrixWorld)),De.logarithmicDepthBuffer&&DA.setValue(D,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&DA.setValue(D,"isOrthographic",C.isOrthographicCamera===!0),B!==C&&(B=C,Ni=!0,ua=!0)}if(k.isSkinnedMesh){DA.setOptional(D,k,"bindMatrix"),DA.setOptional(D,k,"bindMatrixInverse");const WA=k.skeleton;WA&&(De.floatVertexTextures?(WA.boneTexture===null&&WA.computeBoneTexture(),DA.setValue(D,"boneTexture",WA.boneTexture,Pe),DA.setValue(D,"boneTextureSize",WA.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}const ha=K.morphAttributes;if((ha.position!==void 0||ha.normal!==void 0||ha.color!==void 0&&De.isWebGL2===!0)&&b.update(k,K,mn),(Ni||ze.receiveShadow!==k.receiveShadow)&&(ze.receiveShadow=k.receiveShadow,DA.setValue(D,"receiveShadow",k.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(Bn.envMap.value=Re,Bn.flipEnvMap.value=Re.isCubeTexture&&Re.isRenderTargetTexture===!1?-1:1),Ni&&(DA.setValue(D,"toneMappingExposure",w.toneMappingExposure),ze.needsLights&&zf(Bn,ua),Be&&H.fog===!0&&te.refreshFogUniforms(Bn,Be),te.refreshMaterialUniforms(Bn,H,G,X,Ee),ys.upload(D,ze.uniformsList,Bn,Pe)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(ys.upload(D,ze.uniformsList,Bn,Pe),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&DA.setValue(D,"center",k.center),DA.setValue(D,"modelViewMatrix",k.modelViewMatrix),DA.setValue(D,"normalMatrix",k.normalMatrix),DA.setValue(D,"modelMatrix",k.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const WA=H.uniformsGroups;for(let fa=0,Xf=WA.length;fa<Xf;fa++)if(De.isWebGL2){const Bl=WA[fa];xe.update(Bl,mn),xe.bind(Bl,mn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return mn}function zf(C,L){C.ambientLightColor.needsUpdate=L,C.lightProbe.needsUpdate=L,C.directionalLights.needsUpdate=L,C.directionalLightShadows.needsUpdate=L,C.pointLights.needsUpdate=L,C.pointLightShadows.needsUpdate=L,C.spotLights.needsUpdate=L,C.spotLightShadows.needsUpdate=L,C.rectAreaLights.needsUpdate=L,C.hemisphereLights.needsUpdate=L}function Wf(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return x},this.getActiveMipmapLevel=function(){return U},this.getRenderTarget=function(){return y},this.setRenderTargetTextures=function(C,L,K){Ve.get(C.texture).__webglTexture=L,Ve.get(C.depthTexture).__webglTexture=K;const H=Ve.get(C);H.__hasExternalTextures=!0,H.__hasExternalTextures&&(H.__autoAllocateDepthBuffer=K===void 0,H.__autoAllocateDepthBuffer||Se.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(C,L){const K=Ve.get(C);K.__webglFramebuffer=L,K.__useDefaultFramebuffer=L===void 0},this.setRenderTarget=function(C,L=0,K=0){y=C,x=L,U=K;let H=!0,k=null,Be=!1,Me=!1;if(C){const Re=Ve.get(C);Re.__useDefaultFramebuffer!==void 0?(Ie.bindFramebuffer(D.FRAMEBUFFER,null),H=!1):Re.__webglFramebuffer===void 0?Pe.setupRenderTarget(C):Re.__hasExternalTextures&&Pe.rebindTextures(C,Ve.get(C.texture).__webglTexture,Ve.get(C.depthTexture).__webglTexture);const ke=C.texture;(ke.isData3DTexture||ke.isDataArrayTexture||ke.isCompressedArrayTexture)&&(Me=!0);const Qe=Ve.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(Qe[L])?k=Qe[L][K]:k=Qe[L],Be=!0):De.isWebGL2&&C.samples>0&&Pe.useMultisampledRTT(C)===!1?k=Ve.get(C).__webglMultisampledFramebuffer:Array.isArray(Qe)?k=Qe[K]:k=Qe,M.copy(C.viewport),z.copy(C.scissor),Y=C.scissorTest}else M.copy(q).multiplyScalar(G).floor(),z.copy(I).multiplyScalar(G).floor(),Y=O;if(Ie.bindFramebuffer(D.FRAMEBUFFER,k)&&De.drawBuffers&&H&&Ie.drawBuffers(C,k),Ie.viewport(M),Ie.scissor(z),Ie.setScissorTest(Y),Be){const Re=Ve.get(C.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+L,Re.__webglTexture,K)}else if(Me){const Re=Ve.get(C.texture),ke=L||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,Re.__webglTexture,K||0,ke)}R=-1},this.readRenderTargetPixels=function(C,L,K,H,k,Be,Me){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Le=Ve.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Me!==void 0&&(Le=Le[Me]),Le){Ie.bindFramebuffer(D.FRAMEBUFFER,Le);try{const Re=C.texture,ke=Re.format,Qe=Re.type;if(ke!==pt&&be.convert(ke)!==D.getParameter(D.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Ne=Qe===Br&&(Se.has("EXT_color_buffer_half_float")||De.isWebGL2&&Se.has("EXT_color_buffer_float"));if(Qe!==hn&&be.convert(Qe)!==D.getParameter(D.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Qe===an&&(De.isWebGL2||Se.has("OES_texture_float")||Se.has("WEBGL_color_buffer_float")))&&!Ne){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=C.width-H&&K>=0&&K<=C.height-k&&D.readPixels(L,K,H,k,be.convert(ke),be.convert(Qe),Be)}finally{const Re=y!==null?Ve.get(y).__webglFramebuffer:null;Ie.bindFramebuffer(D.FRAMEBUFFER,Re)}}},this.copyFramebufferToTexture=function(C,L,K=0){const H=Math.pow(2,-K),k=Math.floor(L.image.width*H),Be=Math.floor(L.image.height*H);Pe.setTexture2D(L,0),D.copyTexSubImage2D(D.TEXTURE_2D,K,0,0,C.x,C.y,k,Be),Ie.unbindTexture()},this.copyTextureToTexture=function(C,L,K,H=0){const k=L.image.width,Be=L.image.height,Me=be.convert(K.format),Le=be.convert(K.type);Pe.setTexture2D(K,0),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,K.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,K.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,K.unpackAlignment),L.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,H,C.x,C.y,k,Be,Me,Le,L.image.data):L.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,H,C.x,C.y,L.mipmaps[0].width,L.mipmaps[0].height,Me,L.mipmaps[0].data):D.texSubImage2D(D.TEXTURE_2D,H,C.x,C.y,Me,Le,L.image),H===0&&K.generateMipmaps&&D.generateMipmap(D.TEXTURE_2D),Ie.unbindTexture()},this.copyTextureToTexture3D=function(C,L,K,H,k=0){if(w.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Be=C.max.x-C.min.x+1,Me=C.max.y-C.min.y+1,Le=C.max.z-C.min.z+1,Re=be.convert(H.format),ke=be.convert(H.type);let Qe;if(H.isData3DTexture)Pe.setTexture3D(H,0),Qe=D.TEXTURE_3D;else if(H.isDataArrayTexture)Pe.setTexture2DArray(H,0),Qe=D.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,H.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,H.unpackAlignment);const Ne=D.getParameter(D.UNPACK_ROW_LENGTH),rA=D.getParameter(D.UNPACK_IMAGE_HEIGHT),sA=D.getParameter(D.UNPACK_SKIP_PIXELS),ZA=D.getParameter(D.UNPACK_SKIP_ROWS),Tt=D.getParameter(D.UNPACK_SKIP_IMAGES),cA=K.isCompressedTexture?K.mipmaps[0]:K.image;D.pixelStorei(D.UNPACK_ROW_LENGTH,cA.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,cA.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,C.min.x),D.pixelStorei(D.UNPACK_SKIP_ROWS,C.min.y),D.pixelStorei(D.UNPACK_SKIP_IMAGES,C.min.z),K.isDataTexture||K.isData3DTexture?D.texSubImage3D(Qe,k,L.x,L.y,L.z,Be,Me,Le,Re,ke,cA.data):K.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),D.compressedTexSubImage3D(Qe,k,L.x,L.y,L.z,Be,Me,Le,Re,cA.data)):D.texSubImage3D(Qe,k,L.x,L.y,L.z,Be,Me,Le,Re,ke,cA),D.pixelStorei(D.UNPACK_ROW_LENGTH,Ne),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,rA),D.pixelStorei(D.UNPACK_SKIP_PIXELS,sA),D.pixelStorei(D.UNPACK_SKIP_ROWS,ZA),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Tt),k===0&&H.generateMipmaps&&D.generateMipmap(Qe),Ie.unbindTexture()},this.initTexture=function(C){C.isCubeTexture?Pe.setTextureCube(C,0):C.isData3DTexture?Pe.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?Pe.setTexture2DArray(C,0):Pe.setTexture2D(C,0),Ie.unbindTexture()},this.resetState=function(){x=0,U=0,y=null,Ie.reset(),Ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Kt}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const A=this.getContext();A.drawingBufferColorSpace=e===rl?"display-p3":"srgb",A.unpackColorSpace=Ze.workingColorSpace===ra?"display-p3":"srgb"}get physicallyCorrectLights(){return console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),!this.useLegacyLights}set physicallyCorrectLights(e){console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),this.useLegacyLights=!e}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===yA?On:mf}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===On?yA:Wt}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class rU extends Lf{}rU.prototype.isWebGL1Renderer=!0;class sU extends kA{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,A){return super.copy(e,A),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const A=super.toJSON(e);return this.fog!==null&&(A.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(A.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(A.object.backgroundIntensity=this.backgroundIntensity),A}}class Rf extends yr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new je(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Gu=new Q,Vu=new Q,Ku=new CA,uo=new aa,ws=new sa;class aU extends kA{constructor(e=new bt,A=new Rf){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=A,this.updateMorphTargets()}copy(e,A){return super.copy(e,A),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const A=e.attributes.position,t=[0];for(let i=1,r=A.count;i<r;i++)Gu.fromBufferAttribute(A,i-1),Vu.fromBufferAttribute(A,i),t[i]=t[i-1],t[i]+=Gu.distanceTo(Vu);e.setAttribute("lineDistance",new zA(t,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,A){const t=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,s=t.drawRange;if(t.boundingSphere===null&&t.computeBoundingSphere(),ws.copy(t.boundingSphere),ws.applyMatrix4(i),ws.radius+=r,e.ray.intersectsSphere(ws)===!1)return;Ku.copy(i).invert(),uo.copy(e.ray).applyMatrix4(Ku);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),o=a*a,l=new Q,c=new Q,u=new Q,h=new Q,p=this.isLineSegments?2:1,g=t.index,d=t.attributes.position;if(g!==null){const f=Math.max(0,s.start),v=Math.min(g.count,s.start+s.count);for(let w=f,E=v-1;w<E;w+=p){const x=g.getX(w),U=g.getX(w+1);if(l.fromBufferAttribute(d,x),c.fromBufferAttribute(d,U),uo.distanceSqToSegment(l,c,h,u)>o)continue;h.applyMatrix4(this.matrixWorld);const R=e.ray.origin.distanceTo(h);R<e.near||R>e.far||A.push({distance:R,point:u.clone().applyMatrix4(this.matrixWorld),index:w,face:null,faceIndex:null,object:this})}}else{const f=Math.max(0,s.start),v=Math.min(d.count,s.start+s.count);for(let w=f,E=v-1;w<E;w+=p){if(l.fromBufferAttribute(d,w),c.fromBufferAttribute(d,w+1),uo.distanceSqToSegment(l,c,h,u)>o)continue;h.applyMatrix4(this.matrixWorld);const U=e.ray.origin.distanceTo(h);U<e.near||U>e.far||A.push({distance:U,point:u.clone().applyMatrix4(this.matrixWorld),index:w,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const A=this.geometry.morphAttributes,t=Object.keys(A);if(t.length>0){const i=A[t[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=i.length;r<s;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}const ku=new Q,zu=new Q;class oU extends aU{constructor(e,A){super(e,A),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const A=e.attributes.position,t=[];for(let i=0,r=A.count;i<r;i+=2)ku.fromBufferAttribute(A,i),zu.fromBufferAttribute(A,i+1),t[i]=i===0?0:t[i-1],t[i+1]=t[i]+ku.distanceTo(zu);e.setAttribute("lineDistance",new zA(t,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class ul extends bt{constructor(e=1,A=32,t=16,i=0,r=Math.PI*2,s=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:A,heightSegments:t,phiStart:i,phiLength:r,thetaStart:s,thetaLength:a},A=Math.max(3,Math.floor(A)),t=Math.max(2,Math.floor(t));const o=Math.min(s+a,Math.PI);let l=0;const c=[],u=new Q,h=new Q,p=[],g=[],m=[],d=[];for(let f=0;f<=t;f++){const v=[],w=f/t;let E=0;f===0&&s===0?E=.5/A:f===t&&o===Math.PI&&(E=-.5/A);for(let x=0;x<=A;x++){const U=x/A;u.x=-e*Math.cos(i+U*r)*Math.sin(s+w*a),u.y=e*Math.cos(s+w*a),u.z=e*Math.sin(i+U*r)*Math.sin(s+w*a),g.push(u.x,u.y,u.z),h.copy(u).normalize(),m.push(h.x,h.y,h.z),d.push(U+E,1-w),v.push(l++)}c.push(v)}for(let f=0;f<t;f++)for(let v=0;v<A;v++){const w=c[f][v+1],E=c[f][v],x=c[f+1][v],U=c[f+1][v+1];(f!==0||s>0)&&p.push(w,E,U),(f!==t-1||o<Math.PI)&&p.push(E,x,U)}this.setIndex(p),this.setAttribute("position",new zA(g,3)),this.setAttribute("normal",new zA(m,3)),this.setAttribute("uv",new zA(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ul(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class lU{constructor(e,A,t=0,i=1/0){this.ray=new aa(e,A),this.near=t,this.far=i,this.camera=null,this.layers=new al,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,A){this.ray.set(e,A)}setFromCamera(e,A){A.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(A.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(A).sub(this.ray.origin).normalize(),this.camera=A):A.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(A.near+A.far)/(A.near-A.far)).unproject(A),this.ray.direction.set(0,0,-1).transformDirection(A.matrixWorld),this.camera=A):console.error("THREE.Raycaster: Unsupported camera type: "+A.type)}intersectObject(e,A=!0,t=[]){return Yo(e,this,t,A),t.sort(Wu),t}intersectObjects(e,A=!0,t=[]){for(let i=0,r=e.length;i<r;i++)Yo(e[i],this,t,A);return t.sort(Wu),t}}function Wu(n,e){return n.distance-e.distance}function Yo(n,e,A,t){if(n.layers.test(e.layers)&&n.raycast(e,A),t===!0){const i=n.children;for(let r=0,s=i.length;r<s;r++)Yo(i[r],e,A,!0)}}class Xu{constructor(e=1,A=0,t=0){return this.radius=e,this.phi=A,this.theta=t,this}set(e,A,t){return this.radius=e,this.phi=A,this.theta=t,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,A,t){return this.radius=Math.sqrt(e*e+A*A+t*t),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,t),this.phi=Math.acos(LA(A/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class cU extends oU{constructor(e=1){const A=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],t=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],i=new bt;i.setAttribute("position",new zA(A,3)),i.setAttribute("color",new zA(t,3));const r=new Rf({vertexColors:!0,toneMapped:!1});super(i,r),this.type="AxesHelper"}setColors(e,A,t){const i=new je,r=this.geometry.attributes.color.array;return i.set(e),i.toArray(r,0),i.toArray(r,3),i.set(A),i.toArray(r,6),i.toArray(r,9),i.set(t),i.toArray(r,12),i.toArray(r,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:nl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=nl);const Yu={type:"change"},ho={type:"start"},Ju={type:"end"},vs=new aa,qu=new An,uU=Math.cos(70*Aw.DEG2RAD);class hU extends Vn{constructor(e,A){super(),this.object=e,this.domElement=A,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new Q,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Jn.ROTATE,MIDDLE:Jn.DOLLY,RIGHT:Jn.PAN},this.touches={ONE:qn.ROTATE,TWO:qn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return a.phi},this.getAzimuthalAngle=function(){return a.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(b){b.addEventListener("keydown",_),this._domElementKeyEvents=b},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",_),this._domElementKeyEvents=null},this.saveState=function(){t.target0.copy(t.target),t.position0.copy(t.object.position),t.zoom0=t.object.zoom},this.reset=function(){t.target.copy(t.target0),t.object.position.copy(t.position0),t.object.zoom=t.zoom0,t.object.updateProjectionMatrix(),t.dispatchEvent(Yu),t.update(),r=i.NONE},this.update=function(){const b=new Q,ie=new Gn().setFromUnitVectors(e.up,new Q(0,1,0)),Z=ie.clone().invert(),be=new Q,Ce=new Gn,xe=new Q,we=2*Math.PI;return function(oe=null){const re=t.object.position;b.copy(re).sub(t.target),b.applyQuaternion(ie),a.setFromVector3(b),t.autoRotate&&r===i.NONE&&z(B(oe)),t.enableDamping?(a.theta+=o.theta*t.dampingFactor,a.phi+=o.phi*t.dampingFactor):(a.theta+=o.theta,a.phi+=o.phi);let fe=t.minAzimuthAngle,le=t.maxAzimuthAngle;isFinite(fe)&&isFinite(le)&&(fe<-Math.PI?fe+=we:fe>Math.PI&&(fe-=we),le<-Math.PI?le+=we:le>Math.PI&&(le-=we),fe<=le?a.theta=Math.max(fe,Math.min(le,a.theta)):a.theta=a.theta>(fe+le)/2?Math.max(fe,a.theta):Math.min(le,a.theta)),a.phi=Math.max(t.minPolarAngle,Math.min(t.maxPolarAngle,a.phi)),a.makeSafe(),t.enableDamping===!0?t.target.addScaledVector(c,t.dampingFactor):t.target.add(c),t.zoomToCursor&&U||t.object.isOrthographicCamera?a.radius=J(a.radius):a.radius=J(a.radius*l),b.setFromSpherical(a),b.applyQuaternion(Z),re.copy(t.target).add(b),t.object.lookAt(t.target),t.enableDamping===!0?(o.theta*=1-t.dampingFactor,o.phi*=1-t.dampingFactor,c.multiplyScalar(1-t.dampingFactor)):(o.set(0,0,0),c.set(0,0,0));let j=!1;if(t.zoomToCursor&&U){let _e=null;if(t.object.isPerspectiveCamera){const Te=b.length();_e=J(Te*l);const lA=Te-_e;t.object.position.addScaledVector(E,lA),t.object.updateMatrixWorld()}else if(t.object.isOrthographicCamera){const Te=new Q(x.x,x.y,0);Te.unproject(t.object),t.object.zoom=Math.max(t.minZoom,Math.min(t.maxZoom,t.object.zoom/l)),t.object.updateProjectionMatrix(),j=!0;const lA=new Q(x.x,x.y,0);lA.unproject(t.object),t.object.position.sub(lA).add(Te),t.object.updateMatrixWorld(),_e=b.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),t.zoomToCursor=!1;_e!==null&&(this.screenSpacePanning?t.target.set(0,0,-1).transformDirection(t.object.matrix).multiplyScalar(_e).add(t.object.position):(vs.origin.copy(t.object.position),vs.direction.set(0,0,-1).transformDirection(t.object.matrix),Math.abs(t.object.up.dot(vs.direction))<uU?e.lookAt(t.target):(qu.setFromNormalAndCoplanarPoint(t.object.up,t.target),vs.intersectPlane(qu,t.target))))}else t.object.isOrthographicCamera&&(t.object.zoom=Math.max(t.minZoom,Math.min(t.maxZoom,t.object.zoom/l)),t.object.updateProjectionMatrix(),j=!0);return l=1,U=!1,j||be.distanceToSquared(t.object.position)>s||8*(1-Ce.dot(t.object.quaternion))>s||xe.distanceToSquared(t.target)>0?(t.dispatchEvent(Yu),be.copy(t.object.position),Ce.copy(t.object.quaternion),xe.copy(t.target),j=!1,!0):!1}}(),this.dispose=function(){t.domElement.removeEventListener("contextmenu",$),t.domElement.removeEventListener("pointerdown",Ve),t.domElement.removeEventListener("pointercancel",Je),t.domElement.removeEventListener("wheel",S),t.domElement.removeEventListener("pointermove",Pe),t.domElement.removeEventListener("pointerup",Je),t._domElementKeyEvents!==null&&(t._domElementKeyEvents.removeEventListener("keydown",_),t._domElementKeyEvents=null)};const t=this,i={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let r=i.NONE;const s=1e-6,a=new Xu,o=new Xu;let l=1;const c=new Q,u=new Fe,h=new Fe,p=new Fe,g=new Fe,m=new Fe,d=new Fe,f=new Fe,v=new Fe,w=new Fe,E=new Q,x=new Fe;let U=!1;const y=[],R={};function B(b){return b!==null?2*Math.PI/60*t.autoRotateSpeed*b:2*Math.PI/60/60*t.autoRotateSpeed}function M(){return Math.pow(.95,t.zoomSpeed)}function z(b){o.theta-=b}function Y(b){o.phi-=b}const W=function(){const b=new Q;return function(Z,be){b.setFromMatrixColumn(be,0),b.multiplyScalar(-Z),c.add(b)}}(),T=function(){const b=new Q;return function(Z,be){t.screenSpacePanning===!0?b.setFromMatrixColumn(be,1):(b.setFromMatrixColumn(be,0),b.crossVectors(t.object.up,b)),b.multiplyScalar(Z),c.add(b)}}(),N=function(){const b=new Q;return function(Z,be){const Ce=t.domElement;if(t.object.isPerspectiveCamera){const xe=t.object.position;b.copy(xe).sub(t.target);let we=b.length();we*=Math.tan(t.object.fov/2*Math.PI/180),W(2*Z*we/Ce.clientHeight,t.object.matrix),T(2*be*we/Ce.clientHeight,t.object.matrix)}else t.object.isOrthographicCamera?(W(Z*(t.object.right-t.object.left)/t.object.zoom/Ce.clientWidth,t.object.matrix),T(be*(t.object.top-t.object.bottom)/t.object.zoom/Ce.clientHeight,t.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),t.enablePan=!1)}}();function X(b){t.object.isPerspectiveCamera||t.object.isOrthographicCamera?l/=b:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),t.enableZoom=!1)}function G(b){t.object.isPerspectiveCamera||t.object.isOrthographicCamera?l*=b:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),t.enableZoom=!1)}function ee(b){if(!t.zoomToCursor)return;U=!0;const ie=t.domElement.getBoundingClientRect(),Z=b.clientX-ie.left,be=b.clientY-ie.top,Ce=ie.width,xe=ie.height;x.x=Z/Ce*2-1,x.y=-(be/xe)*2+1,E.set(x.x,x.y,1).unproject(t.object).sub(t.object.position).normalize()}function J(b){return Math.max(t.minDistance,Math.min(t.maxDistance,b))}function q(b){u.set(b.clientX,b.clientY)}function I(b){ee(b),f.set(b.clientX,b.clientY)}function O(b){g.set(b.clientX,b.clientY)}function se(b){h.set(b.clientX,b.clientY),p.subVectors(h,u).multiplyScalar(t.rotateSpeed);const ie=t.domElement;z(2*Math.PI*p.x/ie.clientHeight),Y(2*Math.PI*p.y/ie.clientHeight),u.copy(h),t.update()}function ue(b){v.set(b.clientX,b.clientY),w.subVectors(v,f),w.y>0?X(M()):w.y<0&&G(M()),f.copy(v),t.update()}function de(b){m.set(b.clientX,b.clientY),d.subVectors(m,g).multiplyScalar(t.panSpeed),N(d.x,d.y),g.copy(m),t.update()}function Ee(b){ee(b),b.deltaY<0?G(M()):b.deltaY>0&&X(M()),t.update()}function Ue(b){let ie=!1;switch(b.code){case t.keys.UP:b.ctrlKey||b.metaKey||b.shiftKey?Y(2*Math.PI*t.rotateSpeed/t.domElement.clientHeight):N(0,t.keyPanSpeed),ie=!0;break;case t.keys.BOTTOM:b.ctrlKey||b.metaKey||b.shiftKey?Y(-2*Math.PI*t.rotateSpeed/t.domElement.clientHeight):N(0,-t.keyPanSpeed),ie=!0;break;case t.keys.LEFT:b.ctrlKey||b.metaKey||b.shiftKey?z(2*Math.PI*t.rotateSpeed/t.domElement.clientHeight):N(t.keyPanSpeed,0),ie=!0;break;case t.keys.RIGHT:b.ctrlKey||b.metaKey||b.shiftKey?z(-2*Math.PI*t.rotateSpeed/t.domElement.clientHeight):N(-t.keyPanSpeed,0),ie=!0;break}ie&&(b.preventDefault(),t.update())}function ye(){if(y.length===1)u.set(y[0].pageX,y[0].pageY);else{const b=.5*(y[0].pageX+y[1].pageX),ie=.5*(y[0].pageY+y[1].pageY);u.set(b,ie)}}function Ye(){if(y.length===1)g.set(y[0].pageX,y[0].pageY);else{const b=.5*(y[0].pageX+y[1].pageX),ie=.5*(y[0].pageY+y[1].pageY);g.set(b,ie)}}function xA(){const b=y[0].pageX-y[1].pageX,ie=y[0].pageY-y[1].pageY,Z=Math.sqrt(b*b+ie*ie);f.set(0,Z)}function Oe(){t.enableZoom&&xA(),t.enablePan&&Ye()}function D(){t.enableZoom&&xA(),t.enableRotate&&ye()}function pA(b){if(y.length==1)h.set(b.pageX,b.pageY);else{const Z=ge(b),be=.5*(b.pageX+Z.x),Ce=.5*(b.pageY+Z.y);h.set(be,Ce)}p.subVectors(h,u).multiplyScalar(t.rotateSpeed);const ie=t.domElement;z(2*Math.PI*p.x/ie.clientHeight),Y(2*Math.PI*p.y/ie.clientHeight),u.copy(h)}function Se(b){if(y.length===1)m.set(b.pageX,b.pageY);else{const ie=ge(b),Z=.5*(b.pageX+ie.x),be=.5*(b.pageY+ie.y);m.set(Z,be)}d.subVectors(m,g).multiplyScalar(t.panSpeed),N(d.x,d.y),g.copy(m)}function De(b){const ie=ge(b),Z=b.pageX-ie.x,be=b.pageY-ie.y,Ce=Math.sqrt(Z*Z+be*be);v.set(0,Ce),w.set(0,Math.pow(v.y/f.y,t.zoomSpeed)),X(w.y),f.copy(v)}function Ie(b){t.enableZoom&&De(b),t.enablePan&&Se(b)}function AA(b){t.enableZoom&&De(b),t.enableRotate&&pA(b)}function Ve(b){t.enabled!==!1&&(y.length===0&&(t.domElement.setPointerCapture(b.pointerId),t.domElement.addEventListener("pointermove",Pe),t.domElement.addEventListener("pointerup",Je)),ne(b),b.pointerType==="touch"?P(b):gA(b))}function Pe(b){t.enabled!==!1&&(b.pointerType==="touch"?te(b):wA(b))}function Je(b){ve(b),y.length===0&&(t.domElement.releasePointerCapture(b.pointerId),t.domElement.removeEventListener("pointermove",Pe),t.domElement.removeEventListener("pointerup",Je)),t.dispatchEvent(Ju),r=i.NONE}function gA(b){let ie;switch(b.button){case 0:ie=t.mouseButtons.LEFT;break;case 1:ie=t.mouseButtons.MIDDLE;break;case 2:ie=t.mouseButtons.RIGHT;break;default:ie=-1}switch(ie){case Jn.DOLLY:if(t.enableZoom===!1)return;I(b),r=i.DOLLY;break;case Jn.ROTATE:if(b.ctrlKey||b.metaKey||b.shiftKey){if(t.enablePan===!1)return;O(b),r=i.PAN}else{if(t.enableRotate===!1)return;q(b),r=i.ROTATE}break;case Jn.PAN:if(b.ctrlKey||b.metaKey||b.shiftKey){if(t.enableRotate===!1)return;q(b),r=i.ROTATE}else{if(t.enablePan===!1)return;O(b),r=i.PAN}break;default:r=i.NONE}r!==i.NONE&&t.dispatchEvent(ho)}function wA(b){switch(r){case i.ROTATE:if(t.enableRotate===!1)return;se(b);break;case i.DOLLY:if(t.enableZoom===!1)return;ue(b);break;case i.PAN:if(t.enablePan===!1)return;de(b);break}}function S(b){t.enabled===!1||t.enableZoom===!1||r!==i.NONE||(b.preventDefault(),t.dispatchEvent(ho),Ee(b),t.dispatchEvent(Ju))}function _(b){t.enabled===!1||t.enablePan===!1||Ue(b)}function P(b){switch(ae(b),y.length){case 1:switch(t.touches.ONE){case qn.ROTATE:if(t.enableRotate===!1)return;ye(),r=i.TOUCH_ROTATE;break;case qn.PAN:if(t.enablePan===!1)return;Ye(),r=i.TOUCH_PAN;break;default:r=i.NONE}break;case 2:switch(t.touches.TWO){case qn.DOLLY_PAN:if(t.enableZoom===!1&&t.enablePan===!1)return;Oe(),r=i.TOUCH_DOLLY_PAN;break;case qn.DOLLY_ROTATE:if(t.enableZoom===!1&&t.enableRotate===!1)return;D(),r=i.TOUCH_DOLLY_ROTATE;break;default:r=i.NONE}break;default:r=i.NONE}r!==i.NONE&&t.dispatchEvent(ho)}function te(b){switch(ae(b),r){case i.TOUCH_ROTATE:if(t.enableRotate===!1)return;pA(b),t.update();break;case i.TOUCH_PAN:if(t.enablePan===!1)return;Se(b),t.update();break;case i.TOUCH_DOLLY_PAN:if(t.enableZoom===!1&&t.enablePan===!1)return;Ie(b),t.update();break;case i.TOUCH_DOLLY_ROTATE:if(t.enableZoom===!1&&t.enableRotate===!1)return;AA(b),t.update();break;default:r=i.NONE}}function $(b){t.enabled!==!1&&b.preventDefault()}function ne(b){y.push(b)}function ve(b){delete R[b.pointerId];for(let ie=0;ie<y.length;ie++)if(y[ie].pointerId==b.pointerId){y.splice(ie,1);return}}function ae(b){let ie=R[b.pointerId];ie===void 0&&(ie=new Fe,R[b.pointerId]=ie),ie.set(b.pageX,b.pageY)}function ge(b){const ie=b.pointerId===y[0].pointerId?y[1]:y[0];return R[ie.pointerId]}t.domElement.addEventListener("contextmenu",$),t.domElement.addEventListener("pointerdown",Ve),t.domElement.addEventListener("pointercancel",Je),t.domElement.addEventListener("wheel",S,{passive:!1}),this.update()}}var Mi,bn,wt,Er;class Df{constructor(e,A={id:"canvas",container:document.body}){Xe(this,Mi,void 0);Xe(this,bn,void 0);Xe(this,wt,void 0);Xe(this,Er,void 0);this.model=e,He(this,Mi,A.id),He(this,bn,A.container)}get container(){return V(this,bn)}get canvas(){return V(this,wt)}set canvas(e){if(V(this,wt)!==void 0)throw Error("Canvas already set");He(this,wt,e)}get domElement(){if(V(this,wt)===void 0){const e=this.initializeCanvas();V(this,Mi)!==void 0&&e.setAttribute("id",V(this,Mi)),e.classList.add("sphere");const A=this;let t=!1;return He(this,Er,new MutationObserver(i=>{t&&i.forEach((r,s,a)=>{A.onMutation(r)})})),V(this,Er).observe(V(this,bn),{attributes:!0,attributeFilter:["class"]}),V(this,bn).appendChild(e),t=!0,e}return V(this,wt)}set visible(e){V(this,wt)!==void 0&&(V(this,wt).style.visibility=e?"visible":"hidden")}}Mi=new WeakMap,bn=new WeakMap,wt=new WeakMap,Er=new WeakMap;class fU{constructor(e,A=void 0,t=void 0){this.setSize(e,A,t),window.addEventListener("resize",()=>{this.setSize(e,A,t),this.onResize()})}setSize(e,A,t){const i=Math.min(innerWidth,e.clientWidth),r=Math.min(innerHeight,e.clientHeight);A!==void 0&&(A.aspect=i/r,A.updateProjectionMatrix()),t!==void 0&&(t.setSize(i,r),t.setPixelRatio(window.devicePixelRatio))}onResize(){}}var hr=function(){var n=0,e=document.createElement("div");e.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",e.addEventListener("click",function(c){c.preventDefault(),t(++n%e.children.length)},!1);function A(c){return e.appendChild(c.dom),c}function t(c){for(var u=0;u<e.children.length;u++)e.children[u].style.display=u===c?"block":"none";n=c}var i=(performance||Date).now(),r=i,s=0,a=A(new hr.Panel("FPS","#0ff","#002")),o=A(new hr.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var l=A(new hr.Panel("MB","#f08","#201"));return t(0),{REVISION:16,dom:e,addPanel:A,showPanel:t,begin:function(){i=(performance||Date).now()},end:function(){s++;var c=(performance||Date).now();if(o.update(c-i,200),c>=r+1e3&&(a.update(s*1e3/(c-r),100),r=c,s=0,l)){var u=performance.memory;l.update(u.usedJSHeapSize/1048576,u.jsHeapSizeLimit/1048576)}return c},update:function(){i=this.end()},domElement:e,setMode:t}};hr.Panel=function(n,e,A){var t=1/0,i=0,r=Math.round,s=r(window.devicePixelRatio||1),a=80*s,o=48*s,l=3*s,c=2*s,u=3*s,h=15*s,p=74*s,g=30*s,m=document.createElement("canvas");m.width=a,m.height=o,m.style.cssText="width:80px;height:48px";var d=m.getContext("2d");return d.font="bold "+9*s+"px Helvetica,Arial,sans-serif",d.textBaseline="top",d.fillStyle=A,d.fillRect(0,0,a,o),d.fillStyle=e,d.fillText(n,l,c),d.fillRect(u,h,p,g),d.fillStyle=A,d.globalAlpha=.9,d.fillRect(u,h,p,g),{dom:m,update:function(f,v){t=Math.min(t,f),i=Math.max(i,f),d.fillStyle=A,d.globalAlpha=1,d.fillRect(0,0,a,h),d.fillStyle=e,d.fillText(r(f)+" "+n+" ("+r(t)+"-"+r(i)+")",l,c),d.drawImage(m,u+s,h,p-s,g,u,h,p-s,g),d.fillRect(u+p-s,h,s,g),d.fillStyle=A,d.globalAlpha=.9,d.fillRect(u+p-s,h,s,r((1-f/v)*g))}}};const dU=hr,Hf="visible",fn=dU();fn[Hf]=n=>{fn.domElement.style.visibility=n?"visible":"hidden"};fn.showPanel(0);document.body.appendChild(fn.dom);fn[Hf](Ae.view.stats_monitor_visible);var pU=`uniform int u_mode;
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
}`,gU=`#define M_PI 3.1415926535897932384626433832795
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
}`;const fo={x:0,y:0};var Fi,Tn,bi,Vt,ct,OA,Ti,ut,et,Qn,Xs,In;class mU extends Df{constructor(A,t={id:"sphere",container:document.body}){super(A,t);Xe(this,Fi,void 0);Xe(this,Tn,void 0);Xe(this,bi,void 0);Xe(this,Vt,void 0);Xe(this,ct,void 0);Xe(this,OA,void 0);Xe(this,Ti,void 0);Xe(this,ut,void 0);Xe(this,et,void 0);Xe(this,Qn,void 0);Xe(this,Xs,void 0);Xe(this,In,void 0);this.canvas=this.domElement}initializeCanvas(){He(this,Fi,new Q(-1,20,-30)),He(this,Tn,new sU),He(this,bi,new lU),He(this,Vt,new nt(75,this.container.clientWidth/this.container.clientHeight,.1,1e3)),He(this,ct,new Lf({antialias:!0}));const A=V(this,ct).domElement;return this.container.appendChild(A),He(this,Xs,new fU(this.container,V(this,Vt),V(this,ct))),He(this,OA,new Ut(this.createSphereGeometry(),this.createSphereMaterial())),V(this,OA).visible=Ae.view.faces_visible,He(this,ut,new Ut(this.createSphereGeometry(),new ol({wireframe:!0,side:ft,transparent:!0}))),V(this,ut).visible=Ae.view.mesh_visible,He(this,Qn,new cU(20)),V(this,Qn).visible=Ae.view.axes_visible,He(this,et,new nr),V(this,et).add(V(this,OA),V(this,ut),V(this,Qn)),V(this,Tn).add(V(this,et)),He(this,Ti,new hU(V(this,Vt),V(this,ct).domElement)),V(this,Vt).position.z=50,V(this,Ti).update(),this.container.addEventListener(ce.CREATE_SPHERE.toString(),()=>this.createSphere()),this.container.addEventListener("mousemove",t=>{fo.x=t.clientX/this.container.clientWidth*2-1,fo.y=-(t.clientY/this.container.clientHeight)*2+1}),this.container.addEventListener(ce.UPDATE_SPHERE_MATERIAL.toString(),()=>this.updateSphereMaterial()),this.container.addEventListener(ce.UPDATE_VISIBLE.toString(),()=>this.updateVisibility()),this.container.addEventListener(ce.THEME_CHANGED.toString(),()=>this.updateVisibility()),A}onMutation(A){const i=window.getComputedStyle(this.container).getPropertyValue("background-color");V(this,Tn).background=new je(i)}get captureElement(){return V(this,ct).domElement}render(){const A=t=>{V(this,In)===void 0&&He(this,In,t),this._render(t-V(this,In)),He(this,In,t),requestAnimationFrame(A)};A((performance||Date).now())}_render(A){if(fn.begin(),V(this,Ti).update(),V(this,ct).render(V(this,Tn),V(this,Vt)),V(this,OA).visible||V(this,ut).visible){V(this,bi).setFromCamera(fo,V(this,Vt));const t=V(this,bi).intersectObject(V(this,OA)),i=V(this,OA).material.uniforms;if(t.length>0&&!Ae.animation.run){const r=t[0].point.clone();i.u_intersect.value=r,this._setIntersect(r)}else i.u_intersect.value=new Q,this.domElement.style.cursor="auto"}if(Ae.animation.trigger_reset)Ae.animation.trigger_reset=!1,V(this,et).rotation.x=0,V(this,et).rotation.y=0,V(this,et).rotation.z=0;else if(Ae.animation.run){const t=Math.PI*A/500;V(this,et).rotation.x+=Ae.animation.rotation_x*t,V(this,et).rotation.y+=Ae.animation.rotation_y*t,V(this,et).rotation.z+=Ae.animation.rotation_z*t}fn.end()}_setIntersect(A){if(A.distanceToSquared(V(this,Fi))>D0){this.domElement.style.cursor="none",He(this,Fi,A);const t=Ae.sphere.radius||1;this.model.applyCut(A.clone().divideScalar(t))}}createSphere(){V(this,OA).geometry.dispose(),V(this,ut).geometry.dispose();const A=this.createSphereGeometry();V(this,OA).geometry=A,V(this,ut).geometry=A,this.updateSphereMaterial()}createSphereGeometry(){const A=Ae.sphere.segments;return new ul(Ae.sphere.radius,A,A/2)}createSphereMaterial(){return new gn({vertexShader:pU,fragmentShader:gU,side:ft,transparent:!0,defines:this.defines,uniforms:this.uniforms})}get defines(){return{MAX_JEWELS:Math.max(1,this.model.necklace.length),MODE_STOLEN_NECKLACE:xt.STOLEN_NECKLACE,MODE_SHADER_LAMP:xt.SHADER_LAMP,MODE_SPACE_COLOR:xt.SPACE_COLOR,MODE_SINUSOID:xt.SINUSOID}}get uniforms(){return Ae.sphere.offset_octant/Ae.sphere.radius,{u_mode:{type:"i",value:Ae.int_mode},u_necklace_discrete:{type:"b",value:Ae.necklace.discrete},u_input:{type:"i",value:this.model.necklace},u_count_0:{type:"i",value:this.model.count_0},u_count_1:{type:"i",value:this.model.count_1},u_offset_sphere_octant:{type:"f",value:Ae.sphere.offset_octant},u_use_bad_on_sphere_check:{type:"b",value:Ae.sphere.use_bad_on_sphere_check},u_show_borsuk_ulam_proof_shape:{type:"b",value:Ae.sphere.show_borsuk_ulam_proof_shape},u_radius_vector:{type:"v3",value:new Q(Ae.sphere.radius,Ae.sphere.radius,Ae.sphere.radius)},u_scale_color:{type:"v3",value:new Q(Ae.color.scale_red,Ae.color.scale_green,Ae.color.scale_blue)},u_epsilon:{type:"f",value:Ae.necklace.epsilon},u_show_solution_band:{type:"b",value:Ae.necklace.show_solution_band},u_show_solutions:{type:"b",value:Ae.necklace.show_solutions},u_show_single_thiefs_region:{type:"b",value:Ae.view.show_single_thiefs_region},u_alpha:{type:"f",value:Ae.color.alpha},u_time:{type:"f",value:1},u_resolution:{type:"v2",value:new Fe(V(this,ct).domElement.width,V(this,ct).domElement.height)},u_intersect:{type:"v3",value:new Q(0,0,0)}}}updateSphereMaterial(){V(this,OA)!==void 0&&V(this,OA).material.dispose(),V(this,OA).material=this.createSphereMaterial(),V(this,ut).material.transparent=Ae.color.alpha!=1,ce.dispatchEvent(ce.MODEL_CHANGED)}updateVisibility(){V(this,Qn).visible=Ae.view.axes_visible,V(this,ut).visible=Ae.view.mesh_visible,V(this,OA).visible=Ae.view.faces_visible,fn.visible(Ae.view.stats_monitor_visible),ce.dispatchEvent(ce.MODEL_CHANGED)}}Fi=new WeakMap,Tn=new WeakMap,bi=new WeakMap,Vt=new WeakMap,ct=new WeakMap,OA=new WeakMap,Ti=new WeakMap,ut=new WeakMap,et=new WeakMap,Qn=new WeakMap,Xs=new WeakMap,In=new WeakMap;const BU="--jewel-a-color",_U="--jewel-b-color",Pf="--thief-a-color",Of="--thief-b-color",wU=`${Pf}-light`,vU=`${Of}-light`,EU="--between-jewels-color",CU="--gauge-color",xU="red",UU="green",yU="rgb(0,191,255)",fi=10,Zu=20,SU=5,MU=7;class FU extends Df{constructor(e,A={id:"necklace",container:document.body}){super(e,A),this.canvas=this.domElement,window.addEventListener("resize",()=>{const t=Math.min(innerWidth,this.container.clientWidth),i=Math.min(innerHeight,this.container.clientHeight);this.canvas.width=t,this.canvas.height=i,this.render()})}onMutation(e){this.render()}initializeCanvas(){const e=document.createElement("canvas");return e.setAttribute("id","necklace"),e.classList.add("necklace"),this.container.addEventListener(ce.NECKLACE_CUT.toString(),()=>this.render()),this.container.addEventListener(ce.MODEL_CHANGED.toString(),()=>this.render()),e}get size(){return this.model.size}get width(){return this.canvas.width}get height(){return this.canvas.height}get jewelWidth(){return this.width/this.size}get thief_a_color(){return getComputedStyle(document.body).getPropertyValue(Pf)}get thief_b_color(){return getComputedStyle(document.body).getPropertyValue(Of)}get thief_a_color_light(){return getComputedStyle(document.body).getPropertyValue(wU)}get thief_b_color_light(){return getComputedStyle(document.body).getPropertyValue(vU)}get between_jewels_color(){return getComputedStyle(document.body).getPropertyValue(EU)}get jewel_a_color(){return getComputedStyle(document.body).getPropertyValue(BU)}get jewel_b_color(){return getComputedStyle(document.body).getPropertyValue(_U)}get gauge_color(){return getComputedStyle(document.body).getPropertyValue(CU)}get captureElement(){return this.domElement}get showNecklace(){return Ae.int_mode===xt.STOLEN_NECKLACE&&Ae.view.necklace_visible}get showGauge(){return Ae.int_mode===xt.STOLEN_NECKLACE&&Ae.view.gauge_visible}render(){this.canvas!==void 0&&this._render()}_render(){this.canvas.width=this.canvas.clientWidth,this.canvas.height=this.canvas.clientHeight;const e=this.canvas.getContext("2d");if(e!==null){const A=e,t=0,i=0;let r=t;const s=this.model.cuts;if(this.showNecklace&&(this.drawNecklace(A,r,i,s),s!==void 0&&this.drawSegments(A,s)),this.model.thief_a!==void 0&&this.showGauge){const a=this.model.canonicalThief(this.model.thief_a),o=this.model.canonicalThief(this.model.thief_b);this.drawGauge(A,50,a,o)}Ae.text&&(A.font="12px",A.fillStyle="rgb(255,255,255)",A.fillText(Ae.text,0,150))}}drawNecklace(e,A,t,i){const s=fi+Zu;i===void 0&&(e.fillStyle=this.between_jewels_color,e.fillRect(A,t,this.width,fi));const a=this.jewel_a_color,o=this.jewel_b_color;let l=A;for(let c=0;c<this.size;c++){const u=this.model.necklace[Math.floor(c)];e.fillStyle=u===0?a:o,e.fillRect(l,t+this.yOffset(i,c/this.size,s),this.jewelWidth-2,fi),l+=this.jewelWidth}}drawSegments(e,A){let t=0;e.save(),e.lineWidth=this.showNecklace?1:fi,e.strokeStyle=xU,t=this.drawSegment(e,t,A.x),e.strokeStyle=UU,t=this.drawSegment(e,t,A.y),e.strokeStyle=yU,t=this.drawSegment(e,t,A.z),e.restore()}drawSegment(e,A,t){e.beginPath();const i=this.yOffsetSegment(t)+e.lineWidth;e.moveTo(A,i);const r=A+Math.ceil(t*t*this.width);return e.lineTo(r,i),e.stroke(),r}yOffsetSegment(e){const A=this.showNecklace?SU:Zu+fi;return(e<0?A:0)+(this.showNecklace?fi+MU:0)}drawGauge(e,A,t,i){const r=this.height-A,s=3,o=r-2;if(o>=10){const l=Math.SQRT1_2*o,c=this.width/2-o,u=new Fe(c+o,A+o),h=this.thief_a_color,p=this.thief_b_color,g=this.gauge_color;e.beginPath(),e.fillStyle=this.thief_a_color_light,e.moveTo(u.x,u.y),e.arc(u.x,u.y,o,-Math.PI,-Math.PI/2),e.lineTo(u.x,u.y),e.closePath(),e.fill(),e.beginPath(),e.fillStyle=this.thief_b_color_light,e.moveTo(u.x,u.y),e.arc(u.x,u.y,o,-Math.PI/2,0),e.lineTo(u.x,u.y),e.closePath(),e.fill(),e.beginPath(),e.lineWidth=1,e.setLineDash([1,1]),e.arc(u.x,u.y,o/2,0,-Math.PI,!0),e.stroke(),e.beginPath(),e.strokeStyle=h,e.setLineDash([]),e.moveTo(u.x,u.y),e.lineTo(u.x-t.x*l,u.y-t.y*l),e.stroke(),e.beginPath(),e.strokeStyle=p,e.moveTo(u.x,u.y),e.lineTo(u.x+i.x*l,u.y-i.y*l),e.stroke();const m=1-Math.SQRT1_2*t.distanceTo(i),d=255+(0-255)*m,f=0+(255-0)*m;e.beginPath(),e.lineWidth=s,e.strokeStyle=`rgb(${d},${f}, 0)`,e.arc(u.x,u.y,o,-Math.PI,-Math.PI*(1-m),!1),e.stroke(),e.beginPath(),e.lineWidth=s,e.strokeStyle=g,e.arc(u.x,u.y,o,-Math.PI*(1-m),0,!1),e.stroke()}}yOffset(e,A,t){if(e===void 0)return 0;const i=e.x*e.x,r=e.y*e.y;return A<i?e.x<0?t:0:A<i+r?e.y<0?t:0:e.z<0?t:0}}function ju(n){return n%1}var vt,TA,Ln,Et;class bU{constructor(){Xe(this,vt,void 0);Xe(this,TA,void 0);Xe(this,Ln,void 0);Xe(this,Et,void 0);this.initializeStatus(0),window.addEventListener(ce.SET_NECKLACE_CONFIGURATION_BY_NUMBER,()=>this.necklaceFromInt(Ae.necklace.configuration,Ae.necklace.number_of_jewels)),window.addEventListener(ce.SET_NECKLACE_CONFIGURATION_BY_STRING,()=>this.necklaceFromStr(Ae.necklace.string))}get necklace(){return[...V(this,vt)]}necklaceFromInt(e,A){this.initializeStatus(A);const t=e.toString(2);if(e!=0){const i=t.length-1;for(let r=i;r>=0;r--)V(this,vt)[i-r]=t[r]==="0"?0:1}for(const i of V(this,vt))i===0?V(this,TA).x+=1:V(this,TA).y+=1;ce.dispatchEvent(ce.UPDATE_SPHERE_MATERIAL)}necklaceFromStr(e){this.initializeStatus(1),He(this,vt,[]);for(let A=0;A<e.length;A++){const t=e.charCodeAt(A),i=t.toString(2);if(t!=0)for(const r of i)V(this,vt).push(r==="0"?0:1)}for(const A of V(this,vt))A===0?V(this,TA).x+=1:V(this,TA).y+=1;ce.dispatchEvent(ce.UPDATE_SPHERE_MATERIAL)}get size(){if(this.cnt.x<0||this.cnt.y<0)throw Error("Necklace not initialized");return this.cnt.x+this.cnt.y}applyCut(e){this.cuts=e,e!==void 0&&He(this,Et,Ae.necklace.discrete?this.applyCutDiscrete(e):this.applyCutContinous(e)),ce.dispatchEvent(ce.NECKLACE_CUT)}applyCutDiscrete(e){if(this.cuts=e,e){const A=this.size,t=e.x*e.x*A,i=e.y*e.y*A,r=[0,0];for(let s=0;s<A;s++){const a=this.necklace[s],o=s;o<t?e.x>0&&r[a]++:o<t+i?e.y>0&&r[a]++:e.z>0&&r[a]++}return new Fe(r[0],r[1])}return new Fe(0,0)}applyCutContinous(e){if(this.cuts=e,e){const A=this.size,t=e.x*e.x*A,i=e.y*e.y*A,r=[0,0];for(let s=0;s<A;s++){const a=this.necklace[s],o=s+1;let l=0,c=0,u=0;o<=Math.ceil(t)?o<=Math.floor(t)?l=1:(l=ju(t),o>t+i?(c=i,u=1-l-c):c=1-l):o<=Math.ceil(t+i)?o<=Math.floor(t+i)?c=1:(c=ju(t+i),u=1-c):u=1,l!==0&&e.x>0&&(r[a]+=l),c!==0&&e.y>0&&(r[a]+=c),u!==0&&e.z>0&&(r[a]+=u)}return new Fe(r[0],r[1])}return new Fe(0,0)}initializeStatus(e){He(this,vt,Array(e).fill(0)),He(this,TA,new Fe(0,0)),He(this,Ln,new Q(0,0)),He(this,Et,new Fe(0,0))}get cnt(){return V(this,TA).clone()}set cnt(e){He(this,TA,e.clone())}get count_0(){return V(this,TA).x}get count_1(){return V(this,TA).y}get cuts(){return V(this,Ln)?V(this,Ln).clone():void 0}set cuts(e){e!==void 0&&(this.assertSphere(e),He(this,Ln,e.clone()))}assertSphere(e,A=1){if(e.length()-A>Oo)throw new Error(`Input vector ${e} not close enough to sphere with radius ${A}, dist to orgin: ${e.length()}`)}get thief_a(){return V(this,Et)!==void 0?V(this,Et).clone():new Fe(0,0)}set thief_a(e){He(this,Et,e.clone())}get thief_b(){return V(this,Et)!==void 0?this.cnt.sub(V(this,Et)):new Fe(0,0)}canonicalThief(e){const A=V(this,TA).x!==0?e.x/V(this,TA).x:0,t=V(this,TA).y!==0?e.y/V(this,TA).y:0;return new Fe(A,t)}}vt=new WeakMap,TA=new WeakMap,Ln=new WeakMap,Et=new WeakMap;const TU=new Ps,Nf=new G0,Gf=new bU,Vf=new mU(Gf),QU=new FU(Gf);Nf.initTheme();Nf.registerOnThemeChange(document.body);ce.dispatchEvent(ce.SET_NECKLACE_CONFIGURATION_BY_NUMBER);Vf.render();new V0({folder:TU.captureFolder,property:Ae.capture},{all:document.body,sphere:Vf.captureElement,necklace:QU.captureElement});const hl=document.createElement("SPAN");hl.setAttribute("id","version-info");hl.innerHTML="v0.4.7";document.body.insertAdjacentElement("beforeend",hl);
