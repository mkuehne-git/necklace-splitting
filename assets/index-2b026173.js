(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))t(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&t(s)}).observe(document,{childList:!0,subtree:!0});function A(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(i){if(i.ep)return;i.ep=!0;const r=A(i);fetch(i.href,r)}})();/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.17.0
 * @author George Michael Brower
 * @license MIT
 */class gt{constructor(e,A,t,i,r="div"){this.parent=e,this.object=A,this.property=t,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement("div"),this.domElement.classList.add("controller"),this.domElement.classList.add(i),this.$name=document.createElement("div"),this.$name.classList.add("name"),gt.nextNameID=gt.nextNameID||0,this.$name.id="lil-gui-name-"+ ++gt.nextNameID,this.$widget=document.createElement(r),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(t)}name(e){return this._name=e,this.$name.innerHTML=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled||(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e)),this}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const A=this.parent.add(this.object,this.property,e);return A.name(this._name),this.destroy(),A}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.object[this.property]=e,this._callOnChange(),this.updateDisplay(),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}let vf=class extends gt{constructor(e,A,t){super(e,A,t,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}};function Pa(n){let e,A;return(e=n.match(/(#|0x)?([a-f0-9]{6})/i))?A=e[2]:(e=n.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?A=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=n.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(A=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),!!A&&"#"+A}const Ef={isPrimitive:!0,match:n=>typeof n=="string",fromHexString:Pa,toHexString:Pa},Pi={isPrimitive:!0,match:n=>typeof n=="number",fromHexString:n=>parseInt(n.substring(1),16),toHexString:n=>"#"+n.toString(16).padStart(6,0)},Cf={isPrimitive:!1,match:Array.isArray,fromHexString(n,e,A=1){const t=Pi.fromHexString(n);e[0]=(t>>16&255)/255*A,e[1]=(t>>8&255)/255*A,e[2]=(255&t)/255*A},toHexString:([n,e,A],t=1)=>Pi.toHexString(n*(t=255/t)<<16^e*t<<8^A*t<<0)},xf={isPrimitive:!1,match:n=>Object(n)===n,fromHexString(n,e,A=1){const t=Pi.fromHexString(n);e.r=(t>>16&255)/255*A,e.g=(t>>8&255)/255*A,e.b=(255&t)/255*A},toHexString:({r:n,g:e,b:A},t=1)=>Pi.toHexString(n*(t=255/t)<<16^e*t<<8^A*t<<0)},Uf=[Ef,Pi,Cf,xf];let yf=class extends gt{constructor(e,A,t,i){var r;super(e,A,t,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=(r=this.initialValue,Uf.find(s=>s.match(r))),this._rgbScale=i,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const s=Pa(this.$text.value);s&&this._setValueFromHexString(s)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const A=this._format.fromHexString(e);this.setValue(A)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}};class Ds extends gt{constructor(e,A,t){super(e,A,t,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",i=>{i.preventDefault(),this.getValue().call(this.object)}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class Sf extends gt{constructor(e,A,t,i,r,s){super(e,A,t,"number"),this._initInput(),this.min(i),this.max(r);const a=s!==void 0;this.step(a?s:this._getImplicitStep(),a),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,A=!0){return this._step=e,this._stepExplicit=A,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let A=(e-this._min)/(this._max-this._min);A=Math.max(0,Math.min(A,1)),this.$fill.style.width=100*A+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$disable=this.$input;const e=c=>{const u=parseFloat(this.$input.value);isNaN(u)||(this._snapClampSetValue(u+c),this.$input.value=this.getValue())};let A,t,i,r,s,a=!1;const o=c=>{if(a){const u=c.clientX-A,h=c.clientY-t;Math.abs(h)>5?(c.preventDefault(),this.$input.blur(),a=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(u)>5&&l()}if(!a){const u=c.clientY-i;s-=u*this._step*this._arrowKeyMultiplier(c),r+s>this._max?s=this._max-r:r+s<this._min&&(s=this._min-r),this._snapClampSetValue(r+s)}i=c.clientY},l=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",o),window.removeEventListener("mouseup",l)};this.$input.addEventListener("input",()=>{let c=parseFloat(this.$input.value);isNaN(c)||(this._stepExplicit&&(c=this._snap(c)),this.setValue(this._clamp(c)))}),this.$input.addEventListener("keydown",c=>{c.code==="Enter"&&this.$input.blur(),c.code==="ArrowUp"&&(c.preventDefault(),e(this._step*this._arrowKeyMultiplier(c))),c.code==="ArrowDown"&&(c.preventDefault(),e(this._step*this._arrowKeyMultiplier(c)*-1))}),this.$input.addEventListener("wheel",c=>{this._inputFocused&&(c.preventDefault(),e(this._step*this._normalizeMouseWheel(c)))},{passive:!1}),this.$input.addEventListener("mousedown",c=>{A=c.clientX,t=i=c.clientY,a=!0,r=this.getValue(),s=0,window.addEventListener("mousemove",o),window.addEventListener("mouseup",l)}),this.$input.addEventListener("focus",()=>{this._inputFocused=!0}),this.$input.addEventListener("blur",()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()})}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const e=h=>{const p=this.$slider.getBoundingClientRect();let g=(m=h,d=p.left,f=p.right,v=this._min,B=this._max,(m-d)/(f-d)*(B-v)+v);var m,d,f,v,B;this._snapClampSetValue(g)},A=h=>{e(h.clientX)},t=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",A),window.removeEventListener("mouseup",t)};let i,r,s=!1;const a=h=>{h.preventDefault(),this._setDraggingStyle(!0),e(h.touches[0].clientX),s=!1},o=h=>{if(s){const p=h.touches[0].clientX-i,g=h.touches[0].clientY-r;Math.abs(p)>Math.abs(g)?a(h):(window.removeEventListener("touchmove",o),window.removeEventListener("touchend",l))}else h.preventDefault(),e(h.touches[0].clientX)},l=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",o),window.removeEventListener("touchend",l)},c=this._callOnFinishChange.bind(this);let u;this.$slider.addEventListener("mousedown",h=>{this._setDraggingStyle(!0),e(h.clientX),window.addEventListener("mousemove",A),window.addEventListener("mouseup",t)}),this.$slider.addEventListener("touchstart",h=>{h.touches.length>1||(this._hasScrollBar?(i=h.touches[0].clientX,r=h.touches[0].clientY,s=!0):a(h),window.addEventListener("touchmove",o,{passive:!1}),window.addEventListener("touchend",l))},{passive:!1}),this.$slider.addEventListener("wheel",h=>{if(Math.abs(h.deltaX)<Math.abs(h.deltaY)&&this._hasScrollBar)return;h.preventDefault();const p=this._normalizeMouseWheel(h)*this._step;this._snapClampSetValue(this.getValue()+p),this.$input.value=this.getValue(),clearTimeout(u),u=setTimeout(c,400)},{passive:!1})}_setDraggingStyle(e,A="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle("lil-gui-"+A,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:A,deltaY:t}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(A=0,t=-e.wheelDelta/120,t*=this._stepExplicit?1:10),A+-t}_arrowKeyMultiplier(e){let A=this._stepExplicit?1:10;return e.shiftKey?A*=10:e.altKey&&(A/=10),A}_snap(e){const A=Math.round(e/this._step)*this._step;return parseFloat(A.toPrecision(15))}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class Mf extends gt{constructor(e,A,t,i){super(e,A,t,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this._values=Array.isArray(i)?i:Object.values(i),this._names=Array.isArray(i)?i:Object.keys(i),this._names.forEach(r=>{const s=document.createElement("option");s.innerHTML=r,this.$select.appendChild(s)}),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.updateDisplay()}updateDisplay(){const e=this.getValue(),A=this._values.indexOf(e);return this.$select.selectedIndex=A,this.$display.innerHTML=A===-1?e:this._names[A],this}}let Ff=class extends gt{constructor(e,A,t){super(e,A,t,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",i=>{i.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}},Xo=!1;class vo{constructor({parent:e,autoPlace:A=e===void 0,container:t,width:i,title:r="Controls",injectStyles:s=!0,touchStyles:a=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("div"),this.$title.classList.add("title"),this.$title.setAttribute("role","button"),this.$title.setAttribute("aria-expanded",!0),this.$title.setAttribute("tabindex",0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("keydown",o=>{o.code!=="Enter"&&o.code!=="Space"||(o.preventDefault(),this.$title.click())}),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(r),a&&this.domElement.classList.add("allow-touch-styles"),this.parent)return this.parent.children.push(this),this.parent.folders.push(this),void this.parent.$children.appendChild(this.domElement);this.domElement.classList.add("root"),!Xo&&s&&(function(o){const l=document.createElement("style");l.innerHTML=o;const c=document.querySelector("head link[rel=stylesheet], head style");c?document.head.insertBefore(l,c):document.head.appendChild(l)}('.lil-gui{--background-color:#1f1f1f;--text-color:#ebebeb;--title-background-color:#111;--title-text-color:#ebebeb;--widget-color:#424242;--hover-color:#4f4f4f;--focus-color:#595959;--number-color:#2cc9ff;--string-color:#a2db3c;--font-size:11px;--input-font-size:11px;--font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;--font-family-mono:Menlo,Monaco,Consolas,"Droid Sans Mono",monospace;--padding:4px;--spacing:4px;--widget-height:20px;--name-width:45%;--slider-knob-width:2px;--slider-input-width:27%;--color-input-width:27%;--slider-input-min-width:45px;--color-input-min-width:45px;--folder-indent:7px;--widget-padding:0 0 0 3px;--widget-border-radius:2px;--checkbox-size:calc(var(--widget-height)*0.75);--scrollbar-width:5px;background-color:var(--background-color);color:var(--text-color);font-family:var(--font-family);font-size:var(--font-size);font-style:normal;font-weight:400;line-height:1;text-align:left;touch-action:manipulation;user-select:none;-webkit-user-select:none}.lil-gui,.lil-gui *{box-sizing:border-box;margin:0;padding:0}.lil-gui.root{display:flex;flex-direction:column;width:var(--width,245px)}.lil-gui.root>.title{background:var(--title-background-color);color:var(--title-text-color)}.lil-gui.root>.children{overflow-x:hidden;overflow-y:auto}.lil-gui.root>.children::-webkit-scrollbar{background:var(--background-color);height:var(--scrollbar-width);width:var(--scrollbar-width)}.lil-gui.root>.children::-webkit-scrollbar-thumb{background:var(--focus-color);border-radius:var(--scrollbar-width)}.lil-gui.force-touch-styles{--widget-height:28px;--padding:6px;--spacing:6px;--font-size:13px;--input-font-size:16px;--folder-indent:10px;--scrollbar-width:7px;--slider-input-min-width:50px;--color-input-min-width:65px}.lil-gui.autoPlace{max-height:100%;position:fixed;right:15px;top:0;z-index:1001}.lil-gui .controller{align-items:center;display:flex;margin:var(--spacing) 0;padding:0 var(--padding)}.lil-gui .controller.disabled{opacity:.5}.lil-gui .controller.disabled,.lil-gui .controller.disabled *{pointer-events:none!important}.lil-gui .controller>.name{flex-shrink:0;line-height:var(--widget-height);min-width:var(--name-width);padding-right:var(--spacing);white-space:pre}.lil-gui .controller .widget{align-items:center;display:flex;min-height:var(--widget-height);position:relative;width:100%}.lil-gui .controller.string input{color:var(--string-color)}.lil-gui .controller.boolean .widget{cursor:pointer}.lil-gui .controller.color .display{border-radius:var(--widget-border-radius);height:var(--widget-height);position:relative;width:100%}.lil-gui .controller.color input[type=color]{cursor:pointer;height:100%;opacity:0;width:100%}.lil-gui .controller.color input[type=text]{flex-shrink:0;font-family:var(--font-family-mono);margin-left:var(--spacing);min-width:var(--color-input-min-width);width:var(--color-input-width)}.lil-gui .controller.option select{max-width:100%;opacity:0;position:absolute;width:100%}.lil-gui .controller.option .display{background:var(--widget-color);border-radius:var(--widget-border-radius);height:var(--widget-height);line-height:var(--widget-height);max-width:100%;overflow:hidden;padding-left:.55em;padding-right:1.75em;pointer-events:none;position:relative;word-break:break-all}.lil-gui .controller.option .display.active{background:var(--focus-color)}.lil-gui .controller.option .display:after{bottom:0;content:"↕";font-family:lil-gui;padding-right:.375em;position:absolute;right:0;top:0}.lil-gui .controller.option .widget,.lil-gui .controller.option select{cursor:pointer}.lil-gui .controller.number input{color:var(--number-color)}.lil-gui .controller.number.hasSlider input{flex-shrink:0;margin-left:var(--spacing);min-width:var(--slider-input-min-width);width:var(--slider-input-width)}.lil-gui .controller.number .slider{background-color:var(--widget-color);border-radius:var(--widget-border-radius);cursor:ew-resize;height:var(--widget-height);overflow:hidden;padding-right:var(--slider-knob-width);touch-action:pan-y;width:100%}.lil-gui .controller.number .slider.active{background-color:var(--focus-color)}.lil-gui .controller.number .slider.active .fill{opacity:.95}.lil-gui .controller.number .fill{border-right:var(--slider-knob-width) solid var(--number-color);box-sizing:content-box;height:100%}.lil-gui-dragging .lil-gui{--hover-color:var(--widget-color)}.lil-gui-dragging *{cursor:ew-resize!important}.lil-gui-dragging.lil-gui-vertical *{cursor:ns-resize!important}.lil-gui .title{--title-height:calc(var(--widget-height) + var(--spacing)*1.25);-webkit-tap-highlight-color:transparent;text-decoration-skip:objects;cursor:pointer;font-weight:600;height:var(--title-height);line-height:calc(var(--title-height) - 4px);outline:none;padding:0 var(--padding)}.lil-gui .title:before{content:"▾";display:inline-block;font-family:lil-gui;padding-right:2px}.lil-gui .title:active{background:var(--title-background-color);opacity:.75}.lil-gui.root>.title:focus{text-decoration:none!important}.lil-gui.closed>.title:before{content:"▸"}.lil-gui.closed>.children{opacity:0;transform:translateY(-7px)}.lil-gui.closed:not(.transition)>.children{display:none}.lil-gui.transition>.children{overflow:hidden;pointer-events:none;transition-duration:.3s;transition-property:height,opacity,transform;transition-timing-function:cubic-bezier(.2,.6,.35,1)}.lil-gui .children:empty:before{content:"Empty";display:block;font-style:italic;height:var(--widget-height);line-height:var(--widget-height);margin:var(--spacing) 0;opacity:.5;padding:0 var(--padding)}.lil-gui.root>.children>.lil-gui>.title{border-width:0;border-bottom:1px solid var(--widget-color);border-left:0 solid var(--widget-color);border-right:0 solid var(--widget-color);border-top:1px solid var(--widget-color);transition:border-color .3s}.lil-gui.root>.children>.lil-gui.closed>.title{border-bottom-color:transparent}.lil-gui+.controller{border-top:1px solid var(--widget-color);margin-top:0;padding-top:var(--spacing)}.lil-gui .lil-gui .lil-gui>.title{border:none}.lil-gui .lil-gui .lil-gui>.children{border:none;border-left:2px solid var(--widget-color);margin-left:var(--folder-indent)}.lil-gui .lil-gui .controller{border:none}.lil-gui input{-webkit-tap-highlight-color:transparent;background:var(--widget-color);border:0;border-radius:var(--widget-border-radius);color:var(--text-color);font-family:var(--font-family);font-size:var(--input-font-size);height:var(--widget-height);outline:none;width:100%}.lil-gui input:disabled{opacity:1}.lil-gui input[type=number],.lil-gui input[type=text]{padding:var(--widget-padding)}.lil-gui input[type=number]:focus,.lil-gui input[type=text]:focus{background:var(--focus-color)}.lil-gui input::-webkit-inner-spin-button,.lil-gui input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.lil-gui input[type=number]{-moz-appearance:textfield}.lil-gui input[type=checkbox]{appearance:none;-webkit-appearance:none;border-radius:var(--widget-border-radius);cursor:pointer;height:var(--checkbox-size);text-align:center;width:var(--checkbox-size)}.lil-gui input[type=checkbox]:checked:before{content:"✓";font-family:lil-gui;font-size:var(--checkbox-size);line-height:var(--checkbox-size)}.lil-gui button{-webkit-tap-highlight-color:transparent;background:var(--widget-color);border:1px solid var(--widget-color);border-radius:var(--widget-border-radius);color:var(--text-color);cursor:pointer;font-family:var(--font-family);font-size:var(--font-size);height:var(--widget-height);line-height:calc(var(--widget-height) - 4px);outline:none;text-align:center;text-transform:none;width:100%}.lil-gui button:active{background:var(--focus-color)}@font-face{font-family:lil-gui;src:url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff")}@media (pointer:coarse){.lil-gui.allow-touch-styles{--widget-height:28px;--padding:6px;--spacing:6px;--font-size:13px;--input-font-size:16px;--folder-indent:10px;--scrollbar-width:7px;--slider-input-min-width:50px;--color-input-min-width:65px}}@media (hover:hover){.lil-gui .controller.color .display:hover:before{border:1px solid #fff9;border-radius:var(--widget-border-radius);bottom:0;content:" ";display:block;left:0;position:absolute;right:0;top:0}.lil-gui .controller.option .display.focus{background:var(--focus-color)}.lil-gui .controller.option .widget:hover .display{background:var(--hover-color)}.lil-gui .controller.number .slider:hover{background-color:var(--hover-color)}body:not(.lil-gui-dragging) .lil-gui .title:hover{background:var(--title-background-color);opacity:.85}.lil-gui .title:focus{text-decoration:underline var(--focus-color)}.lil-gui input:hover{background:var(--hover-color)}.lil-gui input:active{background:var(--focus-color)}.lil-gui input[type=checkbox]:focus{box-shadow:inset 0 0 0 1px var(--focus-color)}.lil-gui button:hover{background:var(--hover-color);border-color:var(--hover-color)}.lil-gui button:focus{border-color:var(--focus-color)}}'),Xo=!0),t?t.appendChild(this.domElement):A&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),i&&this.domElement.style.setProperty("--width",i+"px"),this.domElement.addEventListener("keydown",o=>o.stopPropagation()),this.domElement.addEventListener("keyup",o=>o.stopPropagation())}add(e,A,t,i,r){if(Object(t)===t)return new Mf(this,e,A,t);const s=e[A];switch(typeof s){case"number":return new Sf(this,e,A,t,i,r);case"boolean":return new vf(this,e,A);case"string":return new Ff(this,e,A);case"function":return new Ds(this,e,A)}console.error(`gui.add failed
	property:`,A,`
	object:`,e,`
	value:`,s)}addColor(e,A,t=1){return new yf(this,e,A,t)}addFolder(e){return new vo({parent:this,title:e})}load(e,A=!0){return e.controllers&&this.controllers.forEach(t=>{t instanceof Ds||t._name in e.controllers&&t.load(e.controllers[t._name])}),A&&e.folders&&this.folders.forEach(t=>{t._title in e.folders&&t.load(e.folders[t._title])}),this}save(e=!0){const A={controllers:{},folders:{}};return this.controllers.forEach(t=>{if(!(t instanceof Ds)){if(t._name in A.controllers)throw new Error(`Cannot save GUI with duplicate property "${t._name}"`);A.controllers[t._name]=t.save()}}),e&&this.folders.forEach(t=>{if(t._title in A.folders)throw new Error(`Cannot save GUI with duplicate folder "${t._title}"`);A.folders[t._title]=t.save()}),A}open(e=!0){return this._closed=!e,this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._closed=!e,this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const A=this.$children.clientHeight;this.$children.style.height=A+"px",this.domElement.classList.add("transition");const t=r=>{r.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",t))};this.$children.addEventListener("transitionend",t);const i=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=i+"px"})}),this}title(e){return this._title=e,this.$title.innerHTML=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(A=>A.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(A=>{e=e.concat(A.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(A=>{e=e.concat(A.foldersRecursive())}),e}}var dt=(n=>(n[n.STOLEN_NECKLACE=0]="STOLEN_NECKLACE",n[n.SHADER_LAMP=1]="SHADER_LAMP",n[n.SPACE_COLOR=2]="SPACE_COLOR",n[n.SINUSOID=3]="SINUSOID",n))(dt||{}),le=(n=>(n.CREATE_SPHERE="create-sphere",n.SET_NECKLACE_CONFIGURATION_BY_NUMBER="necklace-configuration-by-number",n.SET_NECKLACE_CONFIGURATION_BY_STRING="necklace-configuration-by-string",n.UPDATE_SPHERE_MATERIAL="update-material",n.NECKLACE_CUT="necklace-cut",n.UPDATE_VISIBLE="update-visible",n.SETTINGS_CHANGED="settings-changed",n.THEME_CHANGED="theme-changed",n.MODEL_CHANGED="model-changed",n.SHOW_IMPRINT="show-imprint",n.HIDE_IMPRINT="hide-imprint",n))(le||{});(n=>{function e(A){const t=new Event(A.toString(),{bubbles:!0});document.body.dispatchEvent(t)}n.dispatchEvent=e})(le||(le={}));class Oa{constructor(e,A){let t=!1;new MutationObserver(r=>{t&&r.forEach((s,a)=>A(s,a))}).observe(e,{attributes:!0,attributeFilter:["class"]}),t=!0}}const bf="modulepreload",Tf=function(n){return"/necklace-splitting/"+n},Yo={},Fu=function(e,A,t){if(!A||A.length===0)return e();const i=document.getElementsByTagName("link");return Promise.all(A.map(r=>{if(r=Tf(r),r in Yo)return;Yo[r]=!0;const s=r.endsWith(".css"),a=s?'[rel="stylesheet"]':"";if(!!t)for(let c=i.length-1;c>=0;c--){const u=i[c];if(u.href===r&&(!s||u.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${r}"]${a}`))return;const l=document.createElement("link");if(l.rel=s?"stylesheet":bf,s||(l.as="script",l.crossOrigin=""),l.href=r,document.head.appendChild(l),s)return new Promise((c,u)=>{l.addEventListener("load",c),l.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${r}`)))})})).then(()=>e()).catch(r=>{const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=r,window.dispatchEvent(s),!s.defaultPrevented)throw r})};/*!
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
***************************************************************************** */var Na=function(n,e){return Na=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(A,t){A.__proto__=t}||function(A,t){for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(A[i]=t[i])},Na(n,e)};function ct(n,e){if(typeof e!="function"&&e!==null)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");Na(n,e);function A(){this.constructor=n}n.prototype=e===null?Object.create(e):(A.prototype=e.prototype,new A)}var Ga=function(){return Ga=Object.assign||function(e){for(var A,t=1,i=arguments.length;t<i;t++){A=arguments[t];for(var r in A)Object.prototype.hasOwnProperty.call(A,r)&&(e[r]=A[r])}return e},Ga.apply(this,arguments)};function RA(n,e,A,t){function i(r){return r instanceof A?r:new A(function(s){s(r)})}return new(A||(A=Promise))(function(r,s){function a(c){try{l(t.next(c))}catch(u){s(u)}}function o(c){try{l(t.throw(c))}catch(u){s(u)}}function l(c){c.done?r(c.value):i(c.value).then(a,o)}l((t=t.apply(n,e||[])).next())})}function MA(n,e){var A={label:0,sent:function(){if(r[0]&1)throw r[1];return r[1]},trys:[],ops:[]},t,i,r,s;return s={next:a(0),throw:a(1),return:a(2)},typeof Symbol=="function"&&(s[Symbol.iterator]=function(){return this}),s;function a(l){return function(c){return o([l,c])}}function o(l){if(t)throw new TypeError("Generator is already executing.");for(;A;)try{if(t=1,i&&(r=l[0]&2?i.return:l[0]?i.throw||((r=i.return)&&r.call(i),0):i.next)&&!(r=r.call(i,l[1])).done)return r;switch(i=0,r&&(l=[l[0]&2,r.value]),l[0]){case 0:case 1:r=l;break;case 4:return A.label++,{value:l[1],done:!1};case 5:A.label++,i=l[1],l=[0];continue;case 7:l=A.ops.pop(),A.trys.pop();continue;default:if(r=A.trys,!(r=r.length>0&&r[r.length-1])&&(l[0]===6||l[0]===2)){A=0;continue}if(l[0]===3&&(!r||l[1]>r[0]&&l[1]<r[3])){A.label=l[1];break}if(l[0]===6&&A.label<r[1]){A.label=r[1],r=l;break}if(r&&A.label<r[2]){A.label=r[2],A.ops.push(l);break}r[2]&&A.ops.pop(),A.trys.pop();continue}l=e.call(n,A)}catch(c){l=[6,c],i=0}finally{t=r=0}if(l[0]&5)throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}}function $i(n,e,A){if(A||arguments.length===2)for(var t=0,i=e.length,r;t<i;t++)(r||!(t in e))&&(r||(r=Array.prototype.slice.call(e,0,t)),r[t]=e[t]);return n.concat(r||e)}var Qt=function(){function n(e,A,t,i){this.left=e,this.top=A,this.width=t,this.height=i}return n.prototype.add=function(e,A,t,i){return new n(this.left+e,this.top+A,this.width+t,this.height+i)},n.fromClientRect=function(e,A){return new n(A.left+e.windowBounds.left,A.top+e.windowBounds.top,A.width,A.height)},n.fromDOMRectList=function(e,A){var t=Array.from(A).find(function(i){return i.width!==0});return t?new n(t.left+e.windowBounds.left,t.top+e.windowBounds.top,t.width,t.height):n.EMPTY},n.EMPTY=new n(0,0,0,0),n}(),ps=function(n,e){return Qt.fromClientRect(n,e.getBoundingClientRect())},Qf=function(n){var e=n.body,A=n.documentElement;if(!e||!A)throw new Error("Unable to get document size");var t=Math.max(Math.max(e.scrollWidth,A.scrollWidth),Math.max(e.offsetWidth,A.offsetWidth),Math.max(e.clientWidth,A.clientWidth)),i=Math.max(Math.max(e.scrollHeight,A.scrollHeight),Math.max(e.offsetHeight,A.offsetHeight),Math.max(e.clientHeight,A.clientHeight));return new Qt(0,0,t,i)},gs=function(n){for(var e=[],A=0,t=n.length;A<t;){var i=n.charCodeAt(A++);if(i>=55296&&i<=56319&&A<t){var r=n.charCodeAt(A++);(r&64512)===56320?e.push(((i&1023)<<10)+(r&1023)+65536):(e.push(i),A--)}else e.push(i)}return e},aA=function(){for(var n=[],e=0;e<arguments.length;e++)n[e]=arguments[e];if(String.fromCodePoint)return String.fromCodePoint.apply(String,n);var A=n.length;if(!A)return"";for(var t=[],i=-1,r="";++i<A;){var s=n[i];s<=65535?t.push(s):(s-=65536,t.push((s>>10)+55296,s%1024+56320)),(i+1===A||t.length>16384)&&(r+=String.fromCharCode.apply(String,t),t.length=0)}return r},Jo="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",If=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(var er=0;er<Jo.length;er++)If[Jo.charCodeAt(er)]=er;var qo="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",wi=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(var Ar=0;Ar<qo.length;Ar++)wi[qo.charCodeAt(Ar)]=Ar;var Lf=function(n){var e=n.length*.75,A=n.length,t,i=0,r,s,a,o;n[n.length-1]==="="&&(e--,n[n.length-2]==="="&&e--);var l=typeof ArrayBuffer<"u"&&typeof Uint8Array<"u"&&typeof Uint8Array.prototype.slice<"u"?new ArrayBuffer(e):new Array(e),c=Array.isArray(l)?l:new Uint8Array(l);for(t=0;t<A;t+=4)r=wi[n.charCodeAt(t)],s=wi[n.charCodeAt(t+1)],a=wi[n.charCodeAt(t+2)],o=wi[n.charCodeAt(t+3)],c[i++]=r<<2|s>>4,c[i++]=(s&15)<<4|a>>2,c[i++]=(a&3)<<6|o&63;return l},Rf=function(n){for(var e=n.length,A=[],t=0;t<e;t+=2)A.push(n[t+1]<<8|n[t]);return A},Df=function(n){for(var e=n.length,A=[],t=0;t<e;t+=4)A.push(n[t+3]<<24|n[t+2]<<16|n[t+1]<<8|n[t]);return A},gn=5,Eo=6+5,Hs=2,Hf=Eo-gn,bu=65536>>gn,Pf=1<<gn,Ps=Pf-1,Of=1024>>gn,Nf=bu+Of,Gf=Nf,Vf=32,kf=Gf+Vf,Kf=65536>>Eo,zf=1<<Hf,Wf=zf-1,Zo=function(n,e,A){return n.slice?n.slice(e,A):new Uint16Array(Array.prototype.slice.call(n,e,A))},Xf=function(n,e,A){return n.slice?n.slice(e,A):new Uint32Array(Array.prototype.slice.call(n,e,A))},Yf=function(n,e){var A=Lf(n),t=Array.isArray(A)?Df(A):new Uint32Array(A),i=Array.isArray(A)?Rf(A):new Uint16Array(A),r=24,s=Zo(i,r/2,t[4]/2),a=t[5]===2?Zo(i,(r+t[4])/2):Xf(t,Math.ceil((r+t[4])/4));return new Jf(t[0],t[1],t[2],t[3],s,a)},Jf=function(){function n(e,A,t,i,r,s){this.initialValue=e,this.errorValue=A,this.highStart=t,this.highValueIndex=i,this.index=r,this.data=s}return n.prototype.get=function(e){var A;if(e>=0){if(e<55296||e>56319&&e<=65535)return A=this.index[e>>gn],A=(A<<Hs)+(e&Ps),this.data[A];if(e<=65535)return A=this.index[bu+(e-55296>>gn)],A=(A<<Hs)+(e&Ps),this.data[A];if(e<this.highStart)return A=kf-Kf+(e>>Eo),A=this.index[A],A+=e>>gn&Wf,A=this.index[A],A=(A<<Hs)+(e&Ps),this.data[A];if(e<=1114111)return this.data[this.highValueIndex]}return this.errorValue},n}(),jo="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",qf=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(var tr=0;tr<jo.length;tr++)qf[jo.charCodeAt(tr)]=tr;var Zf="KwAAAAAAAAAACA4AUD0AADAgAAACAAAAAAAIABAAGABAAEgAUABYAGAAaABgAGgAYgBqAF8AZwBgAGgAcQB5AHUAfQCFAI0AlQCdAKIAqgCyALoAYABoAGAAaABgAGgAwgDKAGAAaADGAM4A0wDbAOEA6QDxAPkAAQEJAQ8BFwF1AH0AHAEkASwBNAE6AUIBQQFJAVEBWQFhAWgBcAF4ATAAgAGGAY4BlQGXAZ8BpwGvAbUBvQHFAc0B0wHbAeMB6wHxAfkBAQIJAvEBEQIZAiECKQIxAjgCQAJGAk4CVgJeAmQCbAJ0AnwCgQKJApECmQKgAqgCsAK4ArwCxAIwAMwC0wLbAjAA4wLrAvMC+AIAAwcDDwMwABcDHQMlAy0DNQN1AD0DQQNJA0kDSQNRA1EDVwNZA1kDdQB1AGEDdQBpA20DdQN1AHsDdQCBA4kDkQN1AHUAmQOhA3UAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AKYDrgN1AHUAtgO+A8YDzgPWAxcD3gPjA+sD8wN1AHUA+wMDBAkEdQANBBUEHQQlBCoEFwMyBDgEYABABBcDSARQBFgEYARoBDAAcAQzAXgEgASIBJAEdQCXBHUAnwSnBK4EtgS6BMIEyAR1AHUAdQB1AHUAdQCVANAEYABgAGAAYABgAGAAYABgANgEYADcBOQEYADsBPQE/AQEBQwFFAUcBSQFLAU0BWQEPAVEBUsFUwVbBWAAYgVgAGoFcgV6BYIFigWRBWAAmQWfBaYFYABgAGAAYABgAKoFYACxBbAFuQW6BcEFwQXHBcEFwQXPBdMF2wXjBeoF8gX6BQIGCgYSBhoGIgYqBjIGOgZgAD4GRgZMBmAAUwZaBmAAYABgAGAAYABgAGAAYABgAGAAYABgAGIGYABpBnAGYABgAGAAYABgAGAAYABgAGAAYAB4Bn8GhQZgAGAAYAB1AHcDFQSLBmAAYABgAJMGdQA9A3UAmwajBqsGqwaVALMGuwbDBjAAywbSBtIG1QbSBtIG0gbSBtIG0gbdBuMG6wbzBvsGAwcLBxMHAwcbByMHJwcsBywHMQcsB9IGOAdAB0gHTgfSBkgHVgfSBtIG0gbSBtIG0gbSBtIG0gbSBiwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdgAGAALAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdbB2MHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB2kH0gZwB64EdQB1AHUAdQB1AHUAdQB1AHUHfQdgAIUHjQd1AHUAlQedB2AAYAClB6sHYACzB7YHvgfGB3UAzgfWBzMB3gfmB1EB7gf1B/0HlQENAQUIDQh1ABUIHQglCBcDLQg1CD0IRQhNCEEDUwh1AHUAdQBbCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIcAh3CHoIMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIgggwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAALAcsBywHLAcsBywHLAcsBywHLAcsB4oILAcsB44I0gaWCJ4Ipgh1AHUAqgiyCHUAdQB1AHUAdQB1AHUAdQB1AHUAtwh8AXUAvwh1AMUIyQjRCNkI4AjoCHUAdQB1AO4I9gj+CAYJDgkTCS0HGwkjCYIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiAAIAAAAFAAYABgAGIAXwBgAHEAdQBFAJUAogCyAKAAYABgAEIA4ABGANMA4QDxAMEBDwE1AFwBLAE6AQEBUQF4QkhCmEKoQrhCgAHIQsAB0MLAAcABwAHAAeDC6ABoAHDCwMMAAcABwAHAAdDDGMMAAcAB6MM4wwjDWMNow3jDaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAEjDqABWw6bDqABpg6gAaABoAHcDvwOPA+gAaABfA/8DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DpcPAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcAB9cPKwkyCToJMAB1AHUAdQBCCUoJTQl1AFUJXAljCWcJawkwADAAMAAwAHMJdQB2CX4JdQCECYoJjgmWCXUAngkwAGAAYABxAHUApgn3A64JtAl1ALkJdQDACTAAMAAwADAAdQB1AHUAdQB1AHUAdQB1AHUAowYNBMUIMAAwADAAMADICcsJ0wnZCRUE4QkwAOkJ8An4CTAAMAB1AAAKvwh1AAgKDwoXCh8KdQAwACcKLgp1ADYKqAmICT4KRgowADAAdQB1AE4KMAB1AFYKdQBeCnUAZQowADAAMAAwADAAMAAwADAAMAAVBHUAbQowADAAdQC5CXUKMAAwAHwBxAijBogEMgF9CoQKiASMCpQKmgqIBKIKqgquCogEDQG2Cr4KxgrLCjAAMADTCtsKCgHjCusK8Qr5CgELMAAwADAAMAB1AIsECQsRC3UANAEZCzAAMAAwADAAMAB1ACELKQswAHUANAExCzkLdQBBC0kLMABRC1kLMAAwADAAMAAwADAAdQBhCzAAMAAwAGAAYABpC3ELdwt/CzAAMACHC4sLkwubC58Lpwt1AK4Ltgt1APsDMAAwADAAMAAwADAAMAAwAL4LwwvLC9IL1wvdCzAAMADlC+kL8Qv5C/8LSQswADAAMAAwADAAMAAwADAAMAAHDDAAMAAwADAAMAAODBYMHgx1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1ACYMMAAwADAAdQB1AHUALgx1AHUAdQB1AHUAdQA2DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AD4MdQBGDHUAdQB1AHUAdQB1AEkMdQB1AHUAdQB1AFAMMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQBYDHUAdQB1AF8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUA+wMVBGcMMAAwAHwBbwx1AHcMfwyHDI8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAYABgAJcMMAAwADAAdQB1AJ8MlQClDDAAMACtDCwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB7UMLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AA0EMAC9DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAsBywHLAcsBywHLAcsBywHLQcwAMEMyAwsBywHLAcsBywHLAcsBywHLAcsBywHzAwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1ANQM2QzhDDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMABgAGAAYABgAGAAYABgAOkMYADxDGAA+AwADQYNYABhCWAAYAAODTAAMAAwADAAFg1gAGAAHg37AzAAMAAwADAAYABgACYNYAAsDTQNPA1gAEMNPg1LDWAAYABgAGAAYABgAGAAYABgAGAAUg1aDYsGVglhDV0NcQBnDW0NdQ15DWAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAlQCBDZUAiA2PDZcNMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAnw2nDTAAMAAwADAAMAAwAHUArw23DTAAMAAwADAAMAAwADAAMAAwADAAMAB1AL8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQDHDTAAYABgAM8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA1w11ANwNMAAwAD0B5A0wADAAMAAwADAAMADsDfQN/A0EDgwOFA4wABsOMAAwADAAMAAwADAAMAAwANIG0gbSBtIG0gbSBtIG0gYjDigOwQUuDsEFMw7SBjoO0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGQg5KDlIOVg7SBtIGXg5lDm0OdQ7SBtIGfQ6EDooOjQ6UDtIGmg6hDtIG0gaoDqwO0ga0DrwO0gZgAGAAYADEDmAAYAAkBtIGzA5gANIOYADaDokO0gbSBt8O5w7SBu8O0gb1DvwO0gZgAGAAxA7SBtIG0gbSBtIGYABgAGAAYAAED2AAsAUMD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHJA8sBywHLAcsBywHLAccDywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywPLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAc0D9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHPA/SBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gYUD0QPlQCVAJUAMAAwADAAMACVAJUAlQCVAJUAlQCVAEwPMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA//8EAAQABAAEAAQABAAEAAQABAANAAMAAQABAAIABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQACgATABcAHgAbABoAHgAXABYAEgAeABsAGAAPABgAHABLAEsASwBLAEsASwBLAEsASwBLABgAGAAeAB4AHgATAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYAGwASAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWAA0AEQAeAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAFAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJABYAGgAbABsAGwAeAB0AHQAeAE8AFwAeAA0AHgAeABoAGwBPAE8ADgBQAB0AHQAdAE8ATwAXAE8ATwBPABYAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAFAATwBAAE8ATwBPAEAATwBQAFAATwBQAB4AHgAeAB4AHgAeAB0AHQAdAB0AHgAdAB4ADgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgBQAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkACQAJAAkACQAJAAkABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAFAAHgAeAB4AKwArAFAAUABQAFAAGABQACsAKwArACsAHgAeAFAAHgBQAFAAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUAAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAYAA0AKwArAB4AHgAbACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAB4ABAAEAB4ABAAEABMABAArACsAKwArACsAKwArACsAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAKwArACsAKwBWAFYAVgBWAB4AHgArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AGgAaABoAGAAYAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQAEwAEACsAEwATAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABLAEsASwBLAEsASwBLAEsASwBLABoAGQAZAB4AUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABMAUAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABABQAFAABAAEAB4ABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUAAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAFAABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQAUABQAB4AHgAYABMAUAArACsABAAbABsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAFAABAAEAAQABAAEAFAABAAEAAQAUAAEAAQABAAEAAQAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArACsAHgArAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAUAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEAA0ADQBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUAArACsAKwBQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABABQACsAKwArACsAKwArACsAKwAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUAAaABoAUABQAFAAUABQAEwAHgAbAFAAHgAEACsAKwAEAAQABAArAFAAUABQAFAAUABQACsAKwArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQACsAUABQACsAKwAEACsABAAEAAQABAAEACsAKwArACsABAAEACsAKwAEAAQABAArACsAKwAEACsAKwArACsAKwArACsAUABQAFAAUAArAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLAAQABABQAFAAUAAEAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAArACsAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AGwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAKwArACsAKwArAAQABAAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAAQAUAArAFAAUABQAFAAUABQACsAKwArAFAAUABQACsAUABQAFAAUAArACsAKwBQAFAAKwBQACsAUABQACsAKwArAFAAUAArACsAKwBQAFAAUAArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAAQABAAEAAQABAArACsAKwAEAAQABAArAAQABAAEAAQAKwArAFAAKwArACsAKwArACsABAArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAHgAeAB4AHgAeAB4AGwAeACsAKwArACsAKwAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAUABQAFAAKwArACsAKwArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwAOAFAAUABQAFAAUABQAFAAHgBQAAQABAAEAA4AUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAKwArAAQAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAKwArACsAKwArACsAUAArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABABQAB4AKwArACsAKwBQAFAAUAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQABoAUABQAFAAUABQAFAAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQACsAUAArACsAUABQAFAAUABQAFAAUAArACsAKwAEACsAKwArACsABAAEAAQABAAEAAQAKwAEACsABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgAqACsAKwArACsAGwBcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAeAEsASwBLAEsASwBLAEsASwBLAEsADQANACsAKwArACsAKwBcAFwAKwBcACsAXABcAFwAXABcACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAXAArAFwAXABcAFwAXABcAFwAXABcAFwAKgBcAFwAKgAqACoAKgAqACoAKgAqACoAXAArACsAXABcAFwAXABcACsAXAArACoAKgAqACoAKgAqACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwBcAFwAXABcAFAADgAOAA4ADgAeAA4ADgAJAA4ADgANAAkAEwATABMAEwATAAkAHgATAB4AHgAeAAQABAAeAB4AHgAeAB4AHgBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQAFAADQAEAB4ABAAeAAQAFgARABYAEQAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAAQABAAEAAQADQAEAAQAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAA0ADQAeAB4AHgAeAB4AHgAEAB4AHgAeAB4AHgAeACsAHgAeAA4ADgANAA4AHgAeAB4AHgAeAAkACQArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgBcAEsASwBLAEsASwBLAEsASwBLAEsADQANAB4AHgAeAB4AXABcAFwAXABcAFwAKgAqACoAKgBcAFwAXABcACoAKgAqAFwAKgAqACoAXABcACoAKgAqACoAKgAqACoAXABcAFwAKgAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqAFwAKgBLAEsASwBLAEsASwBLAEsASwBLACoAKgAqACoAKgAqAFAAUABQAFAAUABQACsAUAArACsAKwArACsAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAKwBQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsABAAEAAQAHgANAB4AHgAeAB4AHgAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUAArACsADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWABEAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQANAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAANAA0AKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUAArAAQABAArACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqAA0ADQAVAFwADQAeAA0AGwBcACoAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwAeAB4AEwATAA0ADQAOAB4AEwATAB4ABAAEAAQACQArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAHgArACsAKwATABMASwBLAEsASwBLAEsASwBLAEsASwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAXABcAFwAXABcACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAXAArACsAKwAqACoAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsAHgAeAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKwAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKwArAAQASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACoAKgAqACoAKgAqACoAXAAqACoAKgAqACoAKgArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABABQAFAAUABQAFAAUABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwANAA0AHgANAA0ADQANAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwAeAB4AHgAeAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArAA0ADQANAA0ADQBLAEsASwBLAEsASwBLAEsASwBLACsAKwArAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUAAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAAQAUABQAFAAUABQAFAABABQAFAABAAEAAQAUAArACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQACsAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQACsAKwAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQACsAHgAeAB4AHgAeAB4AHgAOAB4AKwANAA0ADQANAA0ADQANAAkADQANAA0ACAAEAAsABAAEAA0ACQANAA0ADAAdAB0AHgAXABcAFgAXABcAFwAWABcAHQAdAB4AHgAUABQAFAANAAEAAQAEAAQABAAEAAQACQAaABoAGgAaABoAGgAaABoAHgAXABcAHQAVABUAHgAeAB4AHgAeAB4AGAAWABEAFQAVABUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ADQAeAA0ADQANAA0AHgANAA0ADQAHAB4AHgAeAB4AKwAEAAQABAAEAAQABAAEAAQABAAEAFAAUAArACsATwBQAFAAUABQAFAAHgAeAB4AFgARAE8AUABPAE8ATwBPAFAAUABQAFAAUAAeAB4AHgAWABEAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArABsAGwAbABsAGwAbABsAGgAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGgAbABsAGwAbABoAGwAbABoAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAHgAeAFAAGgAeAB0AHgBQAB4AGgAeAB4AHgAeAB4AHgAeAB4AHgBPAB4AUAAbAB4AHgBQAFAAUABQAFAAHgAeAB4AHQAdAB4AUAAeAFAAHgBQAB4AUABPAFAAUAAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgBQAFAAUABQAE8ATwBQAFAAUABQAFAATwBQAFAATwBQAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAUABQAFAATwBPAE8ATwBPAE8ATwBPAE8ATwBQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABPAB4AHgArACsAKwArAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHQAdAB4AHgAeAB0AHQAeAB4AHQAeAB4AHgAdAB4AHQAbABsAHgAdAB4AHgAeAB4AHQAeAB4AHQAdAB0AHQAeAB4AHQAeAB0AHgAdAB0AHQAdAB0AHQAeAB0AHgAeAB4AHgAeAB0AHQAdAB0AHgAeAB4AHgAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB0AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAdAB0AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAWABEAHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AHQAdAB0AHgAeAB0AHgAeAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlAB4AHQAdAB4AHgAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AJQAlAB0AHQAlAB4AJQAlACUAIAAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAdAB0AHQAeAB0AJQAdAB0AHgAdAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAdAB0AHQAdACUAHgAlACUAJQAdACUAJQAdAB0AHQAlACUAHQAdACUAHQAdACUAJQAlAB4AHQAeAB4AHgAeAB0AHQAlAB0AHQAdAB0AHQAdACUAJQAlACUAJQAdACUAJQAgACUAHQAdACUAJQAlACUAJQAlACUAJQAeAB4AHgAlACUAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AFwAXABcAFwAXABcAHgATABMAJQAeAB4AHgAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARABYAEQAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAeAB4AKwArACsAKwArABMADQANAA0AUAATAA0AUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUAANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAA0ADQANAA0ADQANAA0ADQAeAA0AFgANAB4AHgAXABcAHgAeABcAFwAWABEAFgARABYAEQAWABEADQANAA0ADQATAFAADQANAB4ADQANAB4AHgAeAB4AHgAMAAwADQANAA0AHgANAA0AFgANAA0ADQANAA0ADQANAA0AHgANAB4ADQANAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArAA0AEQARACUAJQBHAFcAVwAWABEAFgARABYAEQAWABEAFgARACUAJQAWABEAFgARABYAEQAWABEAFQAWABEAEQAlAFcAVwBXAFcAVwBXAFcAVwBXAAQABAAEAAQABAAEACUAVwBXAFcAVwA2ACUAJQBXAFcAVwBHAEcAJQAlACUAKwBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBRAFcAUQBXAFEAVwBXAFcAVwBXAFcAUQBXAFcAVwBXAFcAVwBRAFEAKwArAAQABAAVABUARwBHAFcAFQBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBRAFcAVwBXAFcAVwBXAFEAUQBXAFcAVwBXABUAUQBHAEcAVwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwAlACUAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACsAKwArACsAKwArACsAKwArACsAKwArAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBPAE8ATwBPAE8ATwBPAE8AJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADQATAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQAHgBQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAeAA0ADQANAA0ADQArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAAQAUABQAFAABABQAFAAUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAeAB4AHgAeAAQAKwArACsAUABQAFAAUABQAFAAHgAeABoAHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADgAOABMAEwArACsAKwArACsAKwArACsABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUAAeAB4AHgBQAA4AUABQAAQAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAB4AWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYACsAKwArAAQAHgAeAB4AHgAeAB4ADQANAA0AHgAeAB4AHgArAFAASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArAB4AHgBcAFwAXABcAFwAKgBcAFwAXABcAFwAXABcAFwAXABcAEsASwBLAEsASwBLAEsASwBLAEsAXABcAFwAXABcACsAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAFAAUABQAAQAUABQAFAAUABQAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAHgANAA0ADQBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAKgAqACoAXABcACoAKgBcAFwAXABcAFwAKgAqAFwAKgBcACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAA0ADQBQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQADQAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAVABVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBUAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVACsAKwArACsAKwArACsAKwArACsAKwArAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAKwArACsAKwBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAKwArACsAKwAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArACsAKwArAFYABABWAFYAVgBWAFYAVgBWAFYAVgBWAB4AVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgArAFYAVgBWAFYAVgArAFYAKwBWAFYAKwBWAFYAKwBWAFYAVgBWAFYAVgBWAFYAVgBWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAEQAWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAaAB4AKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAGAARABEAGAAYABMAEwAWABEAFAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACUAJQAlACUAJQAWABEAFgARABYAEQAWABEAFgARABYAEQAlACUAFgARACUAJQAlACUAJQAlACUAEQAlABEAKwAVABUAEwATACUAFgARABYAEQAWABEAJQAlACUAJQAlACUAJQAlACsAJQAbABoAJQArACsAKwArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAcAKwATACUAJQAbABoAJQAlABYAEQAlACUAEQAlABEAJQBXAFcAVwBXAFcAVwBXAFcAVwBXABUAFQAlACUAJQATACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXABYAJQARACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAWACUAEQAlABYAEQARABYAEQARABUAVwBRAFEAUQBRAFEAUQBRAFEAUQBRAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcARwArACsAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXACsAKwBXAFcAVwBXAFcAVwArACsAVwBXAFcAKwArACsAGgAbACUAJQAlABsAGwArAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAAQAB0AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsADQANAA0AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAA0AUABQAFAAUAArACsAKwArAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwBQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAUABQAFAAUABQAAQABAAEACsABAAEACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAKwBQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAA0ADQANAA0ADQANAA0ADQAeACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAArACsAKwArAFAAUABQAFAAUAANAA0ADQANAA0ADQAUACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsADQANAA0ADQANAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArAAQABAANACsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAB4AHgAeAB4AHgArACsAKwArACsAKwAEAAQABAAEAAQABAAEAA0ADQAeAB4AHgAeAB4AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsASwBLAEsASwBLAEsASwBLAEsASwANAA0ADQANAFAABAAEAFAAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAeAA4AUAArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAADQANAB4ADQAEAAQABAAEAB4ABAAEAEsASwBLAEsASwBLAEsASwBLAEsAUAAOAFAADQANAA0AKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAA0AHgANAA0AHgAEACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAA0AKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsABAAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAUAArACsAKwArACsAKwAEACsAKwArACsAKwBQAFAAUABQAFAABAAEACsAKwAEAAQABAAEAAQABAAEACsAKwArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABABQAFAAUABQAA0ADQANAA0AHgBLAEsASwBLAEsASwBLAEsASwBLAA0ADQArAB4ABABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUAAeAFAAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABAAEAAQADgANAA0AEwATAB4AHgAeAA0ADQANAA0ADQANAA0ADQANAA0ADQANAA0ADQANAFAAUABQAFAABAAEACsAKwAEAA0ADQAeAFAAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKwArACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBcAFwADQANAA0AKgBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQAKwAEAAQAKwArAAQABAAEAAQAUAAEAFAABAAEAA0ADQANACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABABQAA4AUAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAOAB4ADQANAA0ADQAOAB4ABAArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAA0ADQANAFAADgAOAA4ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAFAADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAOABMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAArACsAKwAEACsABAAEACsABAAEAAQABAAEAAQABABQAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAaABoAGgAaAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABIAEgAQwBDAEMAUABQAFAAUABDAFAAUABQAEgAQwBIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABDAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAJAAkACQAJAAkACQAJABYAEQArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwANAA0AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAANACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQANAB4AHgAeAB4AHgAeAFAAUABQAFAADQAeACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAA0AHgAeACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAARwBHABUARwAJACsAKwArACsAKwArACsAKwArACsAKwAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUQBRAFEAKwArACsAKwArACsAKwArACsAKwArACsAKwBRAFEAUQBRACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAHgAEAAQADQAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQABAAEAAQABAAeAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQAHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAKwArAFAAKwArAFAAUAArACsAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUAArAFAAUABQAFAAUABQAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAHgAeAFAAUABQAFAAUAArAFAAKwArACsAUABQAFAAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeACsAKwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4ABAAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAHgAeAA0ADQANAA0AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArAAQABAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwBQAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArABsAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAB4AHgAeAB4ABAAEAAQABAAEAAQABABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArABYAFgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAGgBQAFAAUAAaAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUAArACsAKwArACsAKwBQACsAKwArACsAUAArAFAAKwBQACsAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUAArAFAAKwBQACsAUAArAFAAUAArAFAAKwArAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAKwBQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AJQAlACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeACUAJQAlAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAlACUAJQAlACUAHgAlACUAJQAlACUAIAAgACAAJQAlACAAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACEAIQAhACEAIQAlACUAIAAgACUAJQAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAIAAlACUAJQAlACAAIAAgACUAIAAgACAAJQAlACUAJQAlACUAJQAgACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAlAB4AJQAeACUAJQAlACUAJQAgACUAJQAlACUAHgAlAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACAAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABcAFwAXABUAFQAVAB4AHgAeAB4AJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAgACUAJQAgACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAIAAgACUAJQAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACAAIAAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACAAIAAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAA==",$o=50,jf=1,Tu=2,Qu=3,$f=4,ed=5,el=7,Iu=8,Al=9,kt=10,Va=11,tl=12,ka=13,Ad=14,vi=15,Ka=16,nr=17,hi=18,td=19,nl=20,za=21,fi=22,Os=23,xn=24,zA=25,Ei=26,Ci=27,Un=28,nd=29,hn=30,id=31,ir=32,rr=33,Wa=34,Xa=35,Ya=36,Oi=37,Ja=38,Wr=39,Xr=40,Ns=41,Lu=42,rd=43,sd=[9001,65288],Ru="!",We="×",sr="÷",qa=Yf(Zf),Et=[hn,Ya],Za=[jf,Tu,Qu,ed],Du=[kt,Iu],il=[Ci,Ei],ad=Za.concat(Du),rl=[Ja,Wr,Xr,Wa,Xa],od=[vi,ka],ld=function(n,e){e===void 0&&(e="strict");var A=[],t=[],i=[];return n.forEach(function(r,s){var a=qa.get(r);if(a>$o?(i.push(!0),a-=$o):i.push(!1),["normal","auto","loose"].indexOf(e)!==-1&&[8208,8211,12316,12448].indexOf(r)!==-1)return t.push(s),A.push(Ka);if(a===$f||a===Va){if(s===0)return t.push(s),A.push(hn);var o=A[s-1];return ad.indexOf(o)===-1?(t.push(t[s-1]),A.push(o)):(t.push(s),A.push(hn))}if(t.push(s),a===id)return A.push(e==="strict"?za:Oi);if(a===Lu||a===nd)return A.push(hn);if(a===rd)return r>=131072&&r<=196605||r>=196608&&r<=262141?A.push(Oi):A.push(hn);A.push(a)}),[t,A,i]},Gs=function(n,e,A,t){var i=t[A];if(Array.isArray(n)?n.indexOf(i)!==-1:n===i)for(var r=A;r<=t.length;){r++;var s=t[r];if(s===e)return!0;if(s!==kt)break}if(i===kt)for(var r=A;r>0;){r--;var a=t[r];if(Array.isArray(n)?n.indexOf(a)!==-1:n===a)for(var o=A;o<=t.length;){o++;var s=t[o];if(s===e)return!0;if(s!==kt)break}if(a!==kt)break}return!1},sl=function(n,e){for(var A=n;A>=0;){var t=e[A];if(t===kt)A--;else return t}return 0},cd=function(n,e,A,t,i){if(A[t]===0)return We;var r=t-1;if(Array.isArray(i)&&i[r]===!0)return We;var s=r-1,a=r+1,o=e[r],l=s>=0?e[s]:0,c=e[a];if(o===Tu&&c===Qu)return We;if(Za.indexOf(o)!==-1)return Ru;if(Za.indexOf(c)!==-1||Du.indexOf(c)!==-1)return We;if(sl(r,e)===Iu)return sr;if(qa.get(n[r])===Va||(o===ir||o===rr)&&qa.get(n[a])===Va||o===el||c===el||o===Al||[kt,ka,vi].indexOf(o)===-1&&c===Al||[nr,hi,td,xn,Un].indexOf(c)!==-1||sl(r,e)===fi||Gs(Os,fi,r,e)||Gs([nr,hi],za,r,e)||Gs(tl,tl,r,e))return We;if(o===kt)return sr;if(o===Os||c===Os)return We;if(c===Ka||o===Ka)return sr;if([ka,vi,za].indexOf(c)!==-1||o===Ad||l===Ya&&od.indexOf(o)!==-1||o===Un&&c===Ya||c===nl||Et.indexOf(c)!==-1&&o===zA||Et.indexOf(o)!==-1&&c===zA||o===Ci&&[Oi,ir,rr].indexOf(c)!==-1||[Oi,ir,rr].indexOf(o)!==-1&&c===Ei||Et.indexOf(o)!==-1&&il.indexOf(c)!==-1||il.indexOf(o)!==-1&&Et.indexOf(c)!==-1||[Ci,Ei].indexOf(o)!==-1&&(c===zA||[fi,vi].indexOf(c)!==-1&&e[a+1]===zA)||[fi,vi].indexOf(o)!==-1&&c===zA||o===zA&&[zA,Un,xn].indexOf(c)!==-1)return We;if([zA,Un,xn,nr,hi].indexOf(c)!==-1)for(var u=r;u>=0;){var h=e[u];if(h===zA)return We;if([Un,xn].indexOf(h)!==-1)u--;else break}if([Ci,Ei].indexOf(c)!==-1)for(var u=[nr,hi].indexOf(o)!==-1?s:r;u>=0;){var h=e[u];if(h===zA)return We;if([Un,xn].indexOf(h)!==-1)u--;else break}if(Ja===o&&[Ja,Wr,Wa,Xa].indexOf(c)!==-1||[Wr,Wa].indexOf(o)!==-1&&[Wr,Xr].indexOf(c)!==-1||[Xr,Xa].indexOf(o)!==-1&&c===Xr||rl.indexOf(o)!==-1&&[nl,Ei].indexOf(c)!==-1||rl.indexOf(c)!==-1&&o===Ci||Et.indexOf(o)!==-1&&Et.indexOf(c)!==-1||o===xn&&Et.indexOf(c)!==-1||Et.concat(zA).indexOf(o)!==-1&&c===fi&&sd.indexOf(n[a])===-1||Et.concat(zA).indexOf(c)!==-1&&o===hi)return We;if(o===Ns&&c===Ns){for(var p=A[r],g=1;p>0&&(p--,e[p]===Ns);)g++;if(g%2!==0)return We}return o===ir&&c===rr?We:sr},ud=function(n,e){e||(e={lineBreak:"normal",wordBreak:"normal"});var A=ld(n,e.lineBreak),t=A[0],i=A[1],r=A[2];(e.wordBreak==="break-all"||e.wordBreak==="break-word")&&(i=i.map(function(a){return[zA,hn,Lu].indexOf(a)!==-1?Oi:a}));var s=e.wordBreak==="keep-all"?r.map(function(a,o){return a&&n[o]>=19968&&n[o]<=40959}):void 0;return[t,i,s]},hd=function(){function n(e,A,t,i){this.codePoints=e,this.required=A===Ru,this.start=t,this.end=i}return n.prototype.slice=function(){return aA.apply(void 0,this.codePoints.slice(this.start,this.end))},n}(),fd=function(n,e){var A=gs(n),t=ud(A,e),i=t[0],r=t[1],s=t[2],a=A.length,o=0,l=0;return{next:function(){if(l>=a)return{done:!0,value:null};for(var c=We;l<a&&(c=cd(A,r,i,++l,s))===We;);if(c!==We||l===a){var u=new hd(A,c,o,l);return o=l,{value:u,done:!1}}return{done:!0,value:null}}}},dd=1,pd=2,Wi=4,al=8,Zr=10,ol=47,Fi=92,gd=9,md=32,ar=34,di=61,Bd=35,_d=36,wd=37,or=39,lr=40,pi=41,vd=95,HA=45,Ed=33,Cd=60,xd=62,Ud=64,yd=91,Sd=93,Md=61,Fd=123,cr=63,bd=125,ll=124,Td=126,Qd=128,cl=65533,Vs=42,pn=43,Id=44,Ld=58,Rd=59,Ni=46,Dd=0,Hd=8,Pd=11,Od=14,Nd=31,Gd=127,ht=-1,Hu=48,Pu=97,Ou=101,Vd=102,kd=117,Kd=122,Nu=65,Gu=69,Vu=70,zd=85,Wd=90,FA=function(n){return n>=Hu&&n<=57},Xd=function(n){return n>=55296&&n<=57343},yn=function(n){return FA(n)||n>=Nu&&n<=Vu||n>=Pu&&n<=Vd},Yd=function(n){return n>=Pu&&n<=Kd},Jd=function(n){return n>=Nu&&n<=Wd},qd=function(n){return Yd(n)||Jd(n)},Zd=function(n){return n>=Qd},ur=function(n){return n===Zr||n===gd||n===md},jr=function(n){return qd(n)||Zd(n)||n===vd},ul=function(n){return jr(n)||FA(n)||n===HA},jd=function(n){return n>=Dd&&n<=Hd||n===Pd||n>=Od&&n<=Nd||n===Gd},Gt=function(n,e){return n!==Fi?!1:e!==Zr},hr=function(n,e,A){return n===HA?jr(e)||Gt(e,A):jr(n)?!0:!!(n===Fi&&Gt(n,e))},ks=function(n,e,A){return n===pn||n===HA?FA(e)?!0:e===Ni&&FA(A):FA(n===Ni?e:n)},$d=function(n){var e=0,A=1;(n[e]===pn||n[e]===HA)&&(n[e]===HA&&(A=-1),e++);for(var t=[];FA(n[e]);)t.push(n[e++]);var i=t.length?parseInt(aA.apply(void 0,t),10):0;n[e]===Ni&&e++;for(var r=[];FA(n[e]);)r.push(n[e++]);var s=r.length,a=s?parseInt(aA.apply(void 0,r),10):0;(n[e]===Gu||n[e]===Ou)&&e++;var o=1;(n[e]===pn||n[e]===HA)&&(n[e]===HA&&(o=-1),e++);for(var l=[];FA(n[e]);)l.push(n[e++]);var c=l.length?parseInt(aA.apply(void 0,l),10):0;return A*(i+a*Math.pow(10,-s))*Math.pow(10,o*c)},ep={type:2},Ap={type:3},tp={type:4},np={type:13},ip={type:8},rp={type:21},sp={type:9},ap={type:10},op={type:11},lp={type:12},cp={type:14},fr={type:23},up={type:1},hp={type:25},fp={type:24},dp={type:26},pp={type:27},gp={type:28},mp={type:29},Bp={type:31},ja={type:32},ku=function(){function n(){this._value=[]}return n.prototype.write=function(e){this._value=this._value.concat(gs(e))},n.prototype.read=function(){for(var e=[],A=this.consumeToken();A!==ja;)e.push(A),A=this.consumeToken();return e},n.prototype.consumeToken=function(){var e=this.consumeCodePoint();switch(e){case ar:return this.consumeStringToken(ar);case Bd:var A=this.peekCodePoint(0),t=this.peekCodePoint(1),i=this.peekCodePoint(2);if(ul(A)||Gt(t,i)){var r=hr(A,t,i)?pd:dd,s=this.consumeName();return{type:5,value:s,flags:r}}break;case _d:if(this.peekCodePoint(0)===di)return this.consumeCodePoint(),np;break;case or:return this.consumeStringToken(or);case lr:return ep;case pi:return Ap;case Vs:if(this.peekCodePoint(0)===di)return this.consumeCodePoint(),cp;break;case pn:if(ks(e,this.peekCodePoint(0),this.peekCodePoint(1)))return this.reconsumeCodePoint(e),this.consumeNumericToken();break;case Id:return tp;case HA:var a=e,o=this.peekCodePoint(0),l=this.peekCodePoint(1);if(ks(a,o,l))return this.reconsumeCodePoint(e),this.consumeNumericToken();if(hr(a,o,l))return this.reconsumeCodePoint(e),this.consumeIdentLikeToken();if(o===HA&&l===xd)return this.consumeCodePoint(),this.consumeCodePoint(),fp;break;case Ni:if(ks(e,this.peekCodePoint(0),this.peekCodePoint(1)))return this.reconsumeCodePoint(e),this.consumeNumericToken();break;case ol:if(this.peekCodePoint(0)===Vs)for(this.consumeCodePoint();;){var c=this.consumeCodePoint();if(c===Vs&&(c=this.consumeCodePoint(),c===ol))return this.consumeToken();if(c===ht)return this.consumeToken()}break;case Ld:return dp;case Rd:return pp;case Cd:if(this.peekCodePoint(0)===Ed&&this.peekCodePoint(1)===HA&&this.peekCodePoint(2)===HA)return this.consumeCodePoint(),this.consumeCodePoint(),hp;break;case Ud:var u=this.peekCodePoint(0),h=this.peekCodePoint(1),p=this.peekCodePoint(2);if(hr(u,h,p)){var s=this.consumeName();return{type:7,value:s}}break;case yd:return gp;case Fi:if(Gt(e,this.peekCodePoint(0)))return this.reconsumeCodePoint(e),this.consumeIdentLikeToken();break;case Sd:return mp;case Md:if(this.peekCodePoint(0)===di)return this.consumeCodePoint(),ip;break;case Fd:return op;case bd:return lp;case kd:case zd:var g=this.peekCodePoint(0),m=this.peekCodePoint(1);return g===pn&&(yn(m)||m===cr)&&(this.consumeCodePoint(),this.consumeUnicodeRangeToken()),this.reconsumeCodePoint(e),this.consumeIdentLikeToken();case ll:if(this.peekCodePoint(0)===di)return this.consumeCodePoint(),sp;if(this.peekCodePoint(0)===ll)return this.consumeCodePoint(),rp;break;case Td:if(this.peekCodePoint(0)===di)return this.consumeCodePoint(),ap;break;case ht:return ja}return ur(e)?(this.consumeWhiteSpace(),Bp):FA(e)?(this.reconsumeCodePoint(e),this.consumeNumericToken()):jr(e)?(this.reconsumeCodePoint(e),this.consumeIdentLikeToken()):{type:6,value:aA(e)}},n.prototype.consumeCodePoint=function(){var e=this._value.shift();return typeof e>"u"?-1:e},n.prototype.reconsumeCodePoint=function(e){this._value.unshift(e)},n.prototype.peekCodePoint=function(e){return e>=this._value.length?-1:this._value[e]},n.prototype.consumeUnicodeRangeToken=function(){for(var e=[],A=this.consumeCodePoint();yn(A)&&e.length<6;)e.push(A),A=this.consumeCodePoint();for(var t=!1;A===cr&&e.length<6;)e.push(A),A=this.consumeCodePoint(),t=!0;if(t){var i=parseInt(aA.apply(void 0,e.map(function(o){return o===cr?Hu:o})),16),r=parseInt(aA.apply(void 0,e.map(function(o){return o===cr?Vu:o})),16);return{type:30,start:i,end:r}}var s=parseInt(aA.apply(void 0,e),16);if(this.peekCodePoint(0)===HA&&yn(this.peekCodePoint(1))){this.consumeCodePoint(),A=this.consumeCodePoint();for(var a=[];yn(A)&&a.length<6;)a.push(A),A=this.consumeCodePoint();var r=parseInt(aA.apply(void 0,a),16);return{type:30,start:s,end:r}}else return{type:30,start:s,end:s}},n.prototype.consumeIdentLikeToken=function(){var e=this.consumeName();return e.toLowerCase()==="url"&&this.peekCodePoint(0)===lr?(this.consumeCodePoint(),this.consumeUrlToken()):this.peekCodePoint(0)===lr?(this.consumeCodePoint(),{type:19,value:e}):{type:20,value:e}},n.prototype.consumeUrlToken=function(){var e=[];if(this.consumeWhiteSpace(),this.peekCodePoint(0)===ht)return{type:22,value:""};var A=this.peekCodePoint(0);if(A===or||A===ar){var t=this.consumeStringToken(this.consumeCodePoint());return t.type===0&&(this.consumeWhiteSpace(),this.peekCodePoint(0)===ht||this.peekCodePoint(0)===pi)?(this.consumeCodePoint(),{type:22,value:t.value}):(this.consumeBadUrlRemnants(),fr)}for(;;){var i=this.consumeCodePoint();if(i===ht||i===pi)return{type:22,value:aA.apply(void 0,e)};if(ur(i))return this.consumeWhiteSpace(),this.peekCodePoint(0)===ht||this.peekCodePoint(0)===pi?(this.consumeCodePoint(),{type:22,value:aA.apply(void 0,e)}):(this.consumeBadUrlRemnants(),fr);if(i===ar||i===or||i===lr||jd(i))return this.consumeBadUrlRemnants(),fr;if(i===Fi)if(Gt(i,this.peekCodePoint(0)))e.push(this.consumeEscapedCodePoint());else return this.consumeBadUrlRemnants(),fr;else e.push(i)}},n.prototype.consumeWhiteSpace=function(){for(;ur(this.peekCodePoint(0));)this.consumeCodePoint()},n.prototype.consumeBadUrlRemnants=function(){for(;;){var e=this.consumeCodePoint();if(e===pi||e===ht)return;Gt(e,this.peekCodePoint(0))&&this.consumeEscapedCodePoint()}},n.prototype.consumeStringSlice=function(e){for(var A=5e4,t="";e>0;){var i=Math.min(A,e);t+=aA.apply(void 0,this._value.splice(0,i)),e-=i}return this._value.shift(),t},n.prototype.consumeStringToken=function(e){var A="",t=0;do{var i=this._value[t];if(i===ht||i===void 0||i===e)return A+=this.consumeStringSlice(t),{type:0,value:A};if(i===Zr)return this._value.splice(0,t),up;if(i===Fi){var r=this._value[t+1];r!==ht&&r!==void 0&&(r===Zr?(A+=this.consumeStringSlice(t),t=-1,this._value.shift()):Gt(i,r)&&(A+=this.consumeStringSlice(t),A+=aA(this.consumeEscapedCodePoint()),t=-1))}t++}while(!0)},n.prototype.consumeNumber=function(){var e=[],A=Wi,t=this.peekCodePoint(0);for((t===pn||t===HA)&&e.push(this.consumeCodePoint());FA(this.peekCodePoint(0));)e.push(this.consumeCodePoint());t=this.peekCodePoint(0);var i=this.peekCodePoint(1);if(t===Ni&&FA(i))for(e.push(this.consumeCodePoint(),this.consumeCodePoint()),A=al;FA(this.peekCodePoint(0));)e.push(this.consumeCodePoint());t=this.peekCodePoint(0),i=this.peekCodePoint(1);var r=this.peekCodePoint(2);if((t===Gu||t===Ou)&&((i===pn||i===HA)&&FA(r)||FA(i)))for(e.push(this.consumeCodePoint(),this.consumeCodePoint()),A=al;FA(this.peekCodePoint(0));)e.push(this.consumeCodePoint());return[$d(e),A]},n.prototype.consumeNumericToken=function(){var e=this.consumeNumber(),A=e[0],t=e[1],i=this.peekCodePoint(0),r=this.peekCodePoint(1),s=this.peekCodePoint(2);if(hr(i,r,s)){var a=this.consumeName();return{type:15,number:A,flags:t,unit:a}}return i===wd?(this.consumeCodePoint(),{type:16,number:A,flags:t}):{type:17,number:A,flags:t}},n.prototype.consumeEscapedCodePoint=function(){var e=this.consumeCodePoint();if(yn(e)){for(var A=aA(e);yn(this.peekCodePoint(0))&&A.length<6;)A+=aA(this.consumeCodePoint());ur(this.peekCodePoint(0))&&this.consumeCodePoint();var t=parseInt(A,16);return t===0||Xd(t)||t>1114111?cl:t}return e===ht?cl:e},n.prototype.consumeName=function(){for(var e="";;){var A=this.consumeCodePoint();if(ul(A))e+=aA(A);else if(Gt(A,this.peekCodePoint(0)))e+=aA(this.consumeEscapedCodePoint());else return this.reconsumeCodePoint(A),e}},n}(),Ku=function(){function n(e){this._tokens=e}return n.create=function(e){var A=new ku;return A.write(e),new n(A.read())},n.parseValue=function(e){return n.create(e).parseComponentValue()},n.parseValues=function(e){return n.create(e).parseComponentValues()},n.prototype.parseComponentValue=function(){for(var e=this.consumeToken();e.type===31;)e=this.consumeToken();if(e.type===32)throw new SyntaxError("Error parsing CSS component value, unexpected EOF");this.reconsumeToken(e);var A=this.consumeComponentValue();do e=this.consumeToken();while(e.type===31);if(e.type===32)return A;throw new SyntaxError("Error parsing CSS component value, multiple values found when expecting only one")},n.prototype.parseComponentValues=function(){for(var e=[];;){var A=this.consumeComponentValue();if(A.type===32)return e;e.push(A),e.push()}},n.prototype.consumeComponentValue=function(){var e=this.consumeToken();switch(e.type){case 11:case 28:case 2:return this.consumeSimpleBlock(e.type);case 19:return this.consumeFunction(e)}return e},n.prototype.consumeSimpleBlock=function(e){for(var A={type:e,values:[]},t=this.consumeToken();;){if(t.type===32||wp(t,e))return A;this.reconsumeToken(t),A.values.push(this.consumeComponentValue()),t=this.consumeToken()}},n.prototype.consumeFunction=function(e){for(var A={name:e.value,values:[],type:18};;){var t=this.consumeToken();if(t.type===32||t.type===3)return A;this.reconsumeToken(t),A.values.push(this.consumeComponentValue())}},n.prototype.consumeToken=function(){var e=this._tokens.shift();return typeof e>"u"?ja:e},n.prototype.reconsumeToken=function(e){this._tokens.unshift(e)},n}(),Xi=function(n){return n.type===15},oi=function(n){return n.type===17},Ze=function(n){return n.type===20},_p=function(n){return n.type===0},$a=function(n,e){return Ze(n)&&n.value===e},zu=function(n){return n.type!==31},ni=function(n){return n.type!==31&&n.type!==4},Bt=function(n){var e=[],A=[];return n.forEach(function(t){if(t.type===4){if(A.length===0)throw new Error("Error parsing function args, zero tokens for arg");e.push(A),A=[];return}t.type!==31&&A.push(t)}),A.length&&e.push(A),e},wp=function(n,e){return e===11&&n.type===12||e===28&&n.type===29?!0:e===2&&n.type===3},en=function(n){return n.type===17||n.type===15},hA=function(n){return n.type===16||en(n)},Wu=function(n){return n.length>1?[n[0],n[1]]:[n[0]]},CA={type:17,number:0,flags:Wi},Co={type:16,number:50,flags:Wi},Kt={type:16,number:100,flags:Wi},xi=function(n,e,A){var t=n[0],i=n[1];return[$e(t,e),$e(typeof i<"u"?i:t,A)]},$e=function(n,e){if(n.type===16)return n.number/100*e;if(Xi(n))switch(n.unit){case"rem":case"em":return 16*n.number;case"px":default:return n.number}return n.number},Xu="deg",Yu="grad",Ju="rad",qu="turn",ms={name:"angle",parse:function(n,e){if(e.type===15)switch(e.unit){case Xu:return Math.PI*e.number/180;case Yu:return Math.PI/200*e.number;case Ju:return e.number;case qu:return Math.PI*2*e.number}throw new Error("Unsupported angle type")}},Zu=function(n){return n.type===15&&(n.unit===Xu||n.unit===Yu||n.unit===Ju||n.unit===qu)},ju=function(n){var e=n.filter(Ze).map(function(A){return A.value}).join(" ");switch(e){case"to bottom right":case"to right bottom":case"left top":case"top left":return[CA,CA];case"to top":case"bottom":return et(0);case"to bottom left":case"to left bottom":case"right top":case"top right":return[CA,Kt];case"to right":case"left":return et(90);case"to top left":case"to left top":case"right bottom":case"bottom right":return[Kt,Kt];case"to bottom":case"top":return et(180);case"to top right":case"to right top":case"left bottom":case"bottom left":return[Kt,CA];case"to left":case"right":return et(270)}return 0},et=function(n){return Math.PI*n/180},Yt={name:"color",parse:function(n,e){if(e.type===18){var A=vp[e.name];if(typeof A>"u")throw new Error('Attempting to parse an unsupported color function "'+e.name+'"');return A(n,e.values)}if(e.type===5){if(e.value.length===3){var t=e.value.substring(0,1),i=e.value.substring(1,2),r=e.value.substring(2,3);return zt(parseInt(t+t,16),parseInt(i+i,16),parseInt(r+r,16),1)}if(e.value.length===4){var t=e.value.substring(0,1),i=e.value.substring(1,2),r=e.value.substring(2,3),s=e.value.substring(3,4);return zt(parseInt(t+t,16),parseInt(i+i,16),parseInt(r+r,16),parseInt(s+s,16)/255)}if(e.value.length===6){var t=e.value.substring(0,2),i=e.value.substring(2,4),r=e.value.substring(4,6);return zt(parseInt(t,16),parseInt(i,16),parseInt(r,16),1)}if(e.value.length===8){var t=e.value.substring(0,2),i=e.value.substring(2,4),r=e.value.substring(4,6),s=e.value.substring(6,8);return zt(parseInt(t,16),parseInt(i,16),parseInt(r,16),parseInt(s,16)/255)}}if(e.type===20){var a=Tt[e.value.toUpperCase()];if(typeof a<"u")return a}return Tt.TRANSPARENT}},Jt=function(n){return(255&n)===0},_A=function(n){var e=255&n,A=255&n>>8,t=255&n>>16,i=255&n>>24;return e<255?"rgba("+i+","+t+","+A+","+e/255+")":"rgb("+i+","+t+","+A+")"},zt=function(n,e,A,t){return(n<<24|e<<16|A<<8|Math.round(t*255)<<0)>>>0},hl=function(n,e){if(n.type===17)return n.number;if(n.type===16){var A=e===3?1:255;return e===3?n.number/100*A:Math.round(n.number/100*A)}return 0},fl=function(n,e){var A=e.filter(ni);if(A.length===3){var t=A.map(hl),i=t[0],r=t[1],s=t[2];return zt(i,r,s,1)}if(A.length===4){var a=A.map(hl),i=a[0],r=a[1],s=a[2],o=a[3];return zt(i,r,s,o)}return 0};function Ks(n,e,A){return A<0&&(A+=1),A>=1&&(A-=1),A<1/6?(e-n)*A*6+n:A<1/2?e:A<2/3?(e-n)*6*(2/3-A)+n:n}var dl=function(n,e){var A=e.filter(ni),t=A[0],i=A[1],r=A[2],s=A[3],a=(t.type===17?et(t.number):ms.parse(n,t))/(Math.PI*2),o=hA(i)?i.number/100:0,l=hA(r)?r.number/100:0,c=typeof s<"u"&&hA(s)?$e(s,1):1;if(o===0)return zt(l*255,l*255,l*255,1);var u=l<=.5?l*(o+1):l+o-l*o,h=l*2-u,p=Ks(h,u,a+1/3),g=Ks(h,u,a),m=Ks(h,u,a-1/3);return zt(p*255,g*255,m*255,c)},vp={hsl:dl,hsla:dl,rgb:fl,rgba:fl},bi=function(n,e){return Yt.parse(n,Ku.create(e).parseComponentValue())},Tt={ALICEBLUE:4042850303,ANTIQUEWHITE:4209760255,AQUA:16777215,AQUAMARINE:2147472639,AZURE:4043309055,BEIGE:4126530815,BISQUE:4293182719,BLACK:255,BLANCHEDALMOND:4293643775,BLUE:65535,BLUEVIOLET:2318131967,BROWN:2771004159,BURLYWOOD:3736635391,CADETBLUE:1604231423,CHARTREUSE:2147418367,CHOCOLATE:3530104575,CORAL:4286533887,CORNFLOWERBLUE:1687547391,CORNSILK:4294499583,CRIMSON:3692313855,CYAN:16777215,DARKBLUE:35839,DARKCYAN:9145343,DARKGOLDENROD:3095837695,DARKGRAY:2846468607,DARKGREEN:6553855,DARKGREY:2846468607,DARKKHAKI:3182914559,DARKMAGENTA:2332068863,DARKOLIVEGREEN:1433087999,DARKORANGE:4287365375,DARKORCHID:2570243327,DARKRED:2332033279,DARKSALMON:3918953215,DARKSEAGREEN:2411499519,DARKSLATEBLUE:1211993087,DARKSLATEGRAY:793726975,DARKSLATEGREY:793726975,DARKTURQUOISE:13554175,DARKVIOLET:2483082239,DEEPPINK:4279538687,DEEPSKYBLUE:12582911,DIMGRAY:1768516095,DIMGREY:1768516095,DODGERBLUE:512819199,FIREBRICK:2988581631,FLORALWHITE:4294635775,FORESTGREEN:579543807,FUCHSIA:4278255615,GAINSBORO:3705462015,GHOSTWHITE:4177068031,GOLD:4292280575,GOLDENROD:3668254975,GRAY:2155905279,GREEN:8388863,GREENYELLOW:2919182335,GREY:2155905279,HONEYDEW:4043305215,HOTPINK:4285117695,INDIANRED:3445382399,INDIGO:1258324735,IVORY:4294963455,KHAKI:4041641215,LAVENDER:3873897215,LAVENDERBLUSH:4293981695,LAWNGREEN:2096890111,LEMONCHIFFON:4294626815,LIGHTBLUE:2916673279,LIGHTCORAL:4034953471,LIGHTCYAN:3774873599,LIGHTGOLDENRODYELLOW:4210742015,LIGHTGRAY:3553874943,LIGHTGREEN:2431553791,LIGHTGREY:3553874943,LIGHTPINK:4290167295,LIGHTSALMON:4288707327,LIGHTSEAGREEN:548580095,LIGHTSKYBLUE:2278488831,LIGHTSLATEGRAY:2005441023,LIGHTSLATEGREY:2005441023,LIGHTSTEELBLUE:2965692159,LIGHTYELLOW:4294959359,LIME:16711935,LIMEGREEN:852308735,LINEN:4210091775,MAGENTA:4278255615,MAROON:2147483903,MEDIUMAQUAMARINE:1724754687,MEDIUMBLUE:52735,MEDIUMORCHID:3126187007,MEDIUMPURPLE:2473647103,MEDIUMSEAGREEN:1018393087,MEDIUMSLATEBLUE:2070474495,MEDIUMSPRINGGREEN:16423679,MEDIUMTURQUOISE:1221709055,MEDIUMVIOLETRED:3340076543,MIDNIGHTBLUE:421097727,MINTCREAM:4127193855,MISTYROSE:4293190143,MOCCASIN:4293178879,NAVAJOWHITE:4292783615,NAVY:33023,OLDLACE:4260751103,OLIVE:2155872511,OLIVEDRAB:1804477439,ORANGE:4289003775,ORANGERED:4282712319,ORCHID:3664828159,PALEGOLDENROD:4008225535,PALEGREEN:2566625535,PALETURQUOISE:2951671551,PALEVIOLETRED:3681588223,PAPAYAWHIP:4293907967,PEACHPUFF:4292524543,PERU:3448061951,PINK:4290825215,PLUM:3718307327,POWDERBLUE:2967529215,PURPLE:2147516671,REBECCAPURPLE:1714657791,RED:4278190335,ROSYBROWN:3163525119,ROYALBLUE:1097458175,SADDLEBROWN:2336560127,SALMON:4202722047,SANDYBROWN:4104413439,SEAGREEN:780883967,SEASHELL:4294307583,SIENNA:2689740287,SILVER:3233857791,SKYBLUE:2278484991,SLATEBLUE:1784335871,SLATEGRAY:1887473919,SLATEGREY:1887473919,SNOW:4294638335,SPRINGGREEN:16744447,STEELBLUE:1182971135,TAN:3535047935,TEAL:8421631,THISTLE:3636451583,TOMATO:4284696575,TRANSPARENT:0,TURQUOISE:1088475391,VIOLET:4001558271,WHEAT:4125012991,WHITE:4294967295,WHITESMOKE:4126537215,YELLOW:4294902015,YELLOWGREEN:2597139199},Ep={name:"background-clip",initialValue:"border-box",prefix:!1,type:1,parse:function(n,e){return e.map(function(A){if(Ze(A))switch(A.value){case"padding-box":return 1;case"content-box":return 2}return 0})}},Cp={name:"background-color",initialValue:"transparent",prefix:!1,type:3,format:"color"},Bs=function(n,e){var A=Yt.parse(n,e[0]),t=e[1];return t&&hA(t)?{color:A,stop:t}:{color:A,stop:null}},pl=function(n,e){var A=n[0],t=n[n.length-1];A.stop===null&&(A.stop=CA),t.stop===null&&(t.stop=Kt);for(var i=[],r=0,s=0;s<n.length;s++){var a=n[s].stop;if(a!==null){var o=$e(a,e);o>r?i.push(o):i.push(r),r=o}else i.push(null)}for(var l=null,s=0;s<i.length;s++){var c=i[s];if(c===null)l===null&&(l=s);else if(l!==null){for(var u=s-l,h=i[l-1],p=(c-h)/(u+1),g=1;g<=u;g++)i[l+g-1]=p*g;l=null}}return n.map(function(m,d){var f=m.color;return{color:f,stop:Math.max(Math.min(1,i[d]/e),0)}})},xp=function(n,e,A){var t=e/2,i=A/2,r=$e(n[0],e)-t,s=i-$e(n[1],A);return(Math.atan2(s,r)+Math.PI*2)%(Math.PI*2)},Up=function(n,e,A){var t=typeof n=="number"?n:xp(n,e,A),i=Math.abs(e*Math.sin(t))+Math.abs(A*Math.cos(t)),r=e/2,s=A/2,a=i/2,o=Math.sin(t-Math.PI/2)*a,l=Math.cos(t-Math.PI/2)*a;return[i,r-l,r+l,s-o,s+o]},rt=function(n,e){return Math.sqrt(n*n+e*e)},gl=function(n,e,A,t,i){var r=[[0,0],[0,e],[n,0],[n,e]];return r.reduce(function(s,a){var o=a[0],l=a[1],c=rt(A-o,t-l);return(i?c<s.optimumDistance:c>s.optimumDistance)?{optimumCorner:a,optimumDistance:c}:s},{optimumDistance:i?1/0:-1/0,optimumCorner:null}).optimumCorner},yp=function(n,e,A,t,i){var r=0,s=0;switch(n.size){case 0:n.shape===0?r=s=Math.min(Math.abs(e),Math.abs(e-t),Math.abs(A),Math.abs(A-i)):n.shape===1&&(r=Math.min(Math.abs(e),Math.abs(e-t)),s=Math.min(Math.abs(A),Math.abs(A-i)));break;case 2:if(n.shape===0)r=s=Math.min(rt(e,A),rt(e,A-i),rt(e-t,A),rt(e-t,A-i));else if(n.shape===1){var a=Math.min(Math.abs(A),Math.abs(A-i))/Math.min(Math.abs(e),Math.abs(e-t)),o=gl(t,i,e,A,!0),l=o[0],c=o[1];r=rt(l-e,(c-A)/a),s=a*r}break;case 1:n.shape===0?r=s=Math.max(Math.abs(e),Math.abs(e-t),Math.abs(A),Math.abs(A-i)):n.shape===1&&(r=Math.max(Math.abs(e),Math.abs(e-t)),s=Math.max(Math.abs(A),Math.abs(A-i)));break;case 3:if(n.shape===0)r=s=Math.max(rt(e,A),rt(e,A-i),rt(e-t,A),rt(e-t,A-i));else if(n.shape===1){var a=Math.max(Math.abs(A),Math.abs(A-i))/Math.max(Math.abs(e),Math.abs(e-t)),u=gl(t,i,e,A,!1),l=u[0],c=u[1];r=rt(l-e,(c-A)/a),s=a*r}break}return Array.isArray(n.size)&&(r=$e(n.size[0],t),s=n.size.length===2?$e(n.size[1],i):r),[r,s]},Sp=function(n,e){var A=et(180),t=[];return Bt(e).forEach(function(i,r){if(r===0){var s=i[0];if(s.type===20&&s.value==="to"){A=ju(i);return}else if(Zu(s)){A=ms.parse(n,s);return}}var a=Bs(n,i);t.push(a)}),{angle:A,stops:t,type:1}},dr=function(n,e){var A=et(180),t=[];return Bt(e).forEach(function(i,r){if(r===0){var s=i[0];if(s.type===20&&["top","left","right","bottom"].indexOf(s.value)!==-1){A=ju(i);return}else if(Zu(s)){A=(ms.parse(n,s)+et(270))%et(360);return}}var a=Bs(n,i);t.push(a)}),{angle:A,stops:t,type:1}},Mp=function(n,e){var A=et(180),t=[],i=1,r=0,s=3,a=[];return Bt(e).forEach(function(o,l){var c=o[0];if(l===0){if(Ze(c)&&c.value==="linear"){i=1;return}else if(Ze(c)&&c.value==="radial"){i=2;return}}if(c.type===18){if(c.name==="from"){var u=Yt.parse(n,c.values[0]);t.push({stop:CA,color:u})}else if(c.name==="to"){var u=Yt.parse(n,c.values[0]);t.push({stop:Kt,color:u})}else if(c.name==="color-stop"){var h=c.values.filter(ni);if(h.length===2){var u=Yt.parse(n,h[1]),p=h[0];oi(p)&&t.push({stop:{type:16,number:p.number*100,flags:p.flags},color:u})}}}}),i===1?{angle:(A+et(180))%et(360),stops:t,type:i}:{size:s,shape:r,stops:t,position:a,type:i}},$u="closest-side",eh="farthest-side",Ah="closest-corner",th="farthest-corner",nh="circle",ih="ellipse",rh="cover",sh="contain",Fp=function(n,e){var A=0,t=3,i=[],r=[];return Bt(e).forEach(function(s,a){var o=!0;if(a===0){var l=!1;o=s.reduce(function(u,h){if(l)if(Ze(h))switch(h.value){case"center":return r.push(Co),u;case"top":case"left":return r.push(CA),u;case"right":case"bottom":return r.push(Kt),u}else(hA(h)||en(h))&&r.push(h);else if(Ze(h))switch(h.value){case nh:return A=0,!1;case ih:return A=1,!1;case"at":return l=!0,!1;case $u:return t=0,!1;case rh:case eh:return t=1,!1;case sh:case Ah:return t=2,!1;case th:return t=3,!1}else if(en(h)||hA(h))return Array.isArray(t)||(t=[]),t.push(h),!1;return u},o)}if(o){var c=Bs(n,s);i.push(c)}}),{size:t,shape:A,stops:i,position:r,type:2}},pr=function(n,e){var A=0,t=3,i=[],r=[];return Bt(e).forEach(function(s,a){var o=!0;if(a===0?o=s.reduce(function(c,u){if(Ze(u))switch(u.value){case"center":return r.push(Co),!1;case"top":case"left":return r.push(CA),!1;case"right":case"bottom":return r.push(Kt),!1}else if(hA(u)||en(u))return r.push(u),!1;return c},o):a===1&&(o=s.reduce(function(c,u){if(Ze(u))switch(u.value){case nh:return A=0,!1;case ih:return A=1,!1;case sh:case $u:return t=0,!1;case eh:return t=1,!1;case Ah:return t=2,!1;case rh:case th:return t=3,!1}else if(en(u)||hA(u))return Array.isArray(t)||(t=[]),t.push(u),!1;return c},o)),o){var l=Bs(n,s);i.push(l)}}),{size:t,shape:A,stops:i,position:r,type:2}},bp=function(n){return n.type===1},Tp=function(n){return n.type===2},xo={name:"image",parse:function(n,e){if(e.type===22){var A={url:e.value,type:0};return n.cache.addImage(e.value),A}if(e.type===18){var t=ah[e.name];if(typeof t>"u")throw new Error('Attempting to parse an unsupported image function "'+e.name+'"');return t(n,e.values)}throw new Error("Unsupported image type "+e.type)}};function Qp(n){return!(n.type===20&&n.value==="none")&&(n.type!==18||!!ah[n.name])}var ah={"linear-gradient":Sp,"-moz-linear-gradient":dr,"-ms-linear-gradient":dr,"-o-linear-gradient":dr,"-webkit-linear-gradient":dr,"radial-gradient":Fp,"-moz-radial-gradient":pr,"-ms-radial-gradient":pr,"-o-radial-gradient":pr,"-webkit-radial-gradient":pr,"-webkit-gradient":Mp},Ip={name:"background-image",initialValue:"none",type:1,prefix:!1,parse:function(n,e){if(e.length===0)return[];var A=e[0];return A.type===20&&A.value==="none"?[]:e.filter(function(t){return ni(t)&&Qp(t)}).map(function(t){return xo.parse(n,t)})}},Lp={name:"background-origin",initialValue:"border-box",prefix:!1,type:1,parse:function(n,e){return e.map(function(A){if(Ze(A))switch(A.value){case"padding-box":return 1;case"content-box":return 2}return 0})}},Rp={name:"background-position",initialValue:"0% 0%",type:1,prefix:!1,parse:function(n,e){return Bt(e).map(function(A){return A.filter(hA)}).map(Wu)}},Dp={name:"background-repeat",initialValue:"repeat",prefix:!1,type:1,parse:function(n,e){return Bt(e).map(function(A){return A.filter(Ze).map(function(t){return t.value}).join(" ")}).map(Hp)}},Hp=function(n){switch(n){case"no-repeat":return 1;case"repeat-x":case"repeat no-repeat":return 2;case"repeat-y":case"no-repeat repeat":return 3;case"repeat":default:return 0}},ei;(function(n){n.AUTO="auto",n.CONTAIN="contain",n.COVER="cover"})(ei||(ei={}));var Pp={name:"background-size",initialValue:"0",prefix:!1,type:1,parse:function(n,e){return Bt(e).map(function(A){return A.filter(Op)})}},Op=function(n){return Ze(n)||hA(n)},_s=function(n){return{name:"border-"+n+"-color",initialValue:"transparent",prefix:!1,type:3,format:"color"}},Np=_s("top"),Gp=_s("right"),Vp=_s("bottom"),kp=_s("left"),ws=function(n){return{name:"border-radius-"+n,initialValue:"0 0",prefix:!1,type:1,parse:function(e,A){return Wu(A.filter(hA))}}},Kp=ws("top-left"),zp=ws("top-right"),Wp=ws("bottom-right"),Xp=ws("bottom-left"),vs=function(n){return{name:"border-"+n+"-style",initialValue:"solid",prefix:!1,type:2,parse:function(e,A){switch(A){case"none":return 0;case"dashed":return 2;case"dotted":return 3;case"double":return 4}return 1}}},Yp=vs("top"),Jp=vs("right"),qp=vs("bottom"),Zp=vs("left"),Es=function(n){return{name:"border-"+n+"-width",initialValue:"0",type:0,prefix:!1,parse:function(e,A){return Xi(A)?A.number:0}}},jp=Es("top"),$p=Es("right"),eg=Es("bottom"),Ag=Es("left"),tg={name:"color",initialValue:"transparent",prefix:!1,type:3,format:"color"},ng={name:"direction",initialValue:"ltr",prefix:!1,type:2,parse:function(n,e){switch(e){case"rtl":return 1;case"ltr":default:return 0}}},ig={name:"display",initialValue:"inline-block",prefix:!1,type:1,parse:function(n,e){return e.filter(Ze).reduce(function(A,t){return A|rg(t.value)},0)}},rg=function(n){switch(n){case"block":case"-webkit-box":return 2;case"inline":return 4;case"run-in":return 8;case"flow":return 16;case"flow-root":return 32;case"table":return 64;case"flex":case"-webkit-flex":return 128;case"grid":case"-ms-grid":return 256;case"ruby":return 512;case"subgrid":return 1024;case"list-item":return 2048;case"table-row-group":return 4096;case"table-header-group":return 8192;case"table-footer-group":return 16384;case"table-row":return 32768;case"table-cell":return 65536;case"table-column-group":return 131072;case"table-column":return 262144;case"table-caption":return 524288;case"ruby-base":return 1048576;case"ruby-text":return 2097152;case"ruby-base-container":return 4194304;case"ruby-text-container":return 8388608;case"contents":return 16777216;case"inline-block":return 33554432;case"inline-list-item":return 67108864;case"inline-table":return 134217728;case"inline-flex":return 268435456;case"inline-grid":return 536870912}return 0},sg={name:"float",initialValue:"none",prefix:!1,type:2,parse:function(n,e){switch(e){case"left":return 1;case"right":return 2;case"inline-start":return 3;case"inline-end":return 4}return 0}},ag={name:"letter-spacing",initialValue:"0",prefix:!1,type:0,parse:function(n,e){return e.type===20&&e.value==="normal"?0:e.type===17||e.type===15?e.number:0}},$r;(function(n){n.NORMAL="normal",n.STRICT="strict"})($r||($r={}));var og={name:"line-break",initialValue:"normal",prefix:!1,type:2,parse:function(n,e){switch(e){case"strict":return $r.STRICT;case"normal":default:return $r.NORMAL}}},lg={name:"line-height",initialValue:"normal",prefix:!1,type:4},ml=function(n,e){return Ze(n)&&n.value==="normal"?1.2*e:n.type===17?e*n.number:hA(n)?$e(n,e):e},cg={name:"list-style-image",initialValue:"none",type:0,prefix:!1,parse:function(n,e){return e.type===20&&e.value==="none"?null:xo.parse(n,e)}},ug={name:"list-style-position",initialValue:"outside",prefix:!1,type:2,parse:function(n,e){switch(e){case"inside":return 0;case"outside":default:return 1}}},eo={name:"list-style-type",initialValue:"none",prefix:!1,type:2,parse:function(n,e){switch(e){case"disc":return 0;case"circle":return 1;case"square":return 2;case"decimal":return 3;case"cjk-decimal":return 4;case"decimal-leading-zero":return 5;case"lower-roman":return 6;case"upper-roman":return 7;case"lower-greek":return 8;case"lower-alpha":return 9;case"upper-alpha":return 10;case"arabic-indic":return 11;case"armenian":return 12;case"bengali":return 13;case"cambodian":return 14;case"cjk-earthly-branch":return 15;case"cjk-heavenly-stem":return 16;case"cjk-ideographic":return 17;case"devanagari":return 18;case"ethiopic-numeric":return 19;case"georgian":return 20;case"gujarati":return 21;case"gurmukhi":return 22;case"hebrew":return 22;case"hiragana":return 23;case"hiragana-iroha":return 24;case"japanese-formal":return 25;case"japanese-informal":return 26;case"kannada":return 27;case"katakana":return 28;case"katakana-iroha":return 29;case"khmer":return 30;case"korean-hangul-formal":return 31;case"korean-hanja-formal":return 32;case"korean-hanja-informal":return 33;case"lao":return 34;case"lower-armenian":return 35;case"malayalam":return 36;case"mongolian":return 37;case"myanmar":return 38;case"oriya":return 39;case"persian":return 40;case"simp-chinese-formal":return 41;case"simp-chinese-informal":return 42;case"tamil":return 43;case"telugu":return 44;case"thai":return 45;case"tibetan":return 46;case"trad-chinese-formal":return 47;case"trad-chinese-informal":return 48;case"upper-armenian":return 49;case"disclosure-open":return 50;case"disclosure-closed":return 51;case"none":default:return-1}}},Cs=function(n){return{name:"margin-"+n,initialValue:"0",prefix:!1,type:4}},hg=Cs("top"),fg=Cs("right"),dg=Cs("bottom"),pg=Cs("left"),gg={name:"overflow",initialValue:"visible",prefix:!1,type:1,parse:function(n,e){return e.filter(Ze).map(function(A){switch(A.value){case"hidden":return 1;case"scroll":return 2;case"clip":return 3;case"auto":return 4;case"visible":default:return 0}})}},mg={name:"overflow-wrap",initialValue:"normal",prefix:!1,type:2,parse:function(n,e){switch(e){case"break-word":return"break-word";case"normal":default:return"normal"}}},xs=function(n){return{name:"padding-"+n,initialValue:"0",prefix:!1,type:3,format:"length-percentage"}},Bg=xs("top"),_g=xs("right"),wg=xs("bottom"),vg=xs("left"),Eg={name:"text-align",initialValue:"left",prefix:!1,type:2,parse:function(n,e){switch(e){case"right":return 2;case"center":case"justify":return 1;case"left":default:return 0}}},Cg={name:"position",initialValue:"static",prefix:!1,type:2,parse:function(n,e){switch(e){case"relative":return 1;case"absolute":return 2;case"fixed":return 3;case"sticky":return 4}return 0}},xg={name:"text-shadow",initialValue:"none",type:1,prefix:!1,parse:function(n,e){return e.length===1&&$a(e[0],"none")?[]:Bt(e).map(function(A){for(var t={color:Tt.TRANSPARENT,offsetX:CA,offsetY:CA,blur:CA},i=0,r=0;r<A.length;r++){var s=A[r];en(s)?(i===0?t.offsetX=s:i===1?t.offsetY=s:t.blur=s,i++):t.color=Yt.parse(n,s)}return t})}},Ug={name:"text-transform",initialValue:"none",prefix:!1,type:2,parse:function(n,e){switch(e){case"uppercase":return 2;case"lowercase":return 1;case"capitalize":return 3}return 0}},yg={name:"transform",initialValue:"none",prefix:!0,type:0,parse:function(n,e){if(e.type===20&&e.value==="none")return null;if(e.type===18){var A=Fg[e.name];if(typeof A>"u")throw new Error('Attempting to parse an unsupported transform function "'+e.name+'"');return A(e.values)}return null}},Sg=function(n){var e=n.filter(function(A){return A.type===17}).map(function(A){return A.number});return e.length===6?e:null},Mg=function(n){var e=n.filter(function(o){return o.type===17}).map(function(o){return o.number}),A=e[0],t=e[1];e[2],e[3];var i=e[4],r=e[5];e[6],e[7],e[8],e[9],e[10],e[11];var s=e[12],a=e[13];return e[14],e[15],e.length===16?[A,t,i,r,s,a]:null},Fg={matrix:Sg,matrix3d:Mg},Bl={type:16,number:50,flags:Wi},bg=[Bl,Bl],Tg={name:"transform-origin",initialValue:"50% 50%",prefix:!0,type:1,parse:function(n,e){var A=e.filter(hA);return A.length!==2?bg:[A[0],A[1]]}},Qg={name:"visible",initialValue:"none",prefix:!1,type:2,parse:function(n,e){switch(e){case"hidden":return 1;case"collapse":return 2;case"visible":default:return 0}}},Ti;(function(n){n.NORMAL="normal",n.BREAK_ALL="break-all",n.KEEP_ALL="keep-all"})(Ti||(Ti={}));var Ig={name:"word-break",initialValue:"normal",prefix:!1,type:2,parse:function(n,e){switch(e){case"break-all":return Ti.BREAK_ALL;case"keep-all":return Ti.KEEP_ALL;case"normal":default:return Ti.NORMAL}}},Lg={name:"z-index",initialValue:"auto",prefix:!1,type:0,parse:function(n,e){if(e.type===20)return{auto:!0,order:0};if(oi(e))return{auto:!1,order:e.number};throw new Error("Invalid z-index number parsed")}},oh={name:"time",parse:function(n,e){if(e.type===15)switch(e.unit.toLowerCase()){case"s":return 1e3*e.number;case"ms":return e.number}throw new Error("Unsupported time type")}},Rg={name:"opacity",initialValue:"1",type:0,prefix:!1,parse:function(n,e){return oi(e)?e.number:1}},Dg={name:"text-decoration-color",initialValue:"transparent",prefix:!1,type:3,format:"color"},Hg={name:"text-decoration-line",initialValue:"none",prefix:!1,type:1,parse:function(n,e){return e.filter(Ze).map(function(A){switch(A.value){case"underline":return 1;case"overline":return 2;case"line-through":return 3;case"none":return 4}return 0}).filter(function(A){return A!==0})}},Pg={name:"font-family",initialValue:"",prefix:!1,type:1,parse:function(n,e){var A=[],t=[];return e.forEach(function(i){switch(i.type){case 20:case 0:A.push(i.value);break;case 17:A.push(i.number.toString());break;case 4:t.push(A.join(" ")),A.length=0;break}}),A.length&&t.push(A.join(" ")),t.map(function(i){return i.indexOf(" ")===-1?i:"'"+i+"'"})}},Og={name:"font-size",initialValue:"0",prefix:!1,type:3,format:"length"},Ng={name:"font-weight",initialValue:"normal",type:0,prefix:!1,parse:function(n,e){if(oi(e))return e.number;if(Ze(e))switch(e.value){case"bold":return 700;case"normal":default:return 400}return 400}},Gg={name:"font-variant",initialValue:"none",type:1,prefix:!1,parse:function(n,e){return e.filter(Ze).map(function(A){return A.value})}},Vg={name:"font-style",initialValue:"normal",prefix:!1,type:2,parse:function(n,e){switch(e){case"oblique":return"oblique";case"italic":return"italic";case"normal":default:return"normal"}}},fA=function(n,e){return(n&e)!==0},kg={name:"content",initialValue:"none",type:1,prefix:!1,parse:function(n,e){if(e.length===0)return[];var A=e[0];return A.type===20&&A.value==="none"?[]:e}},Kg={name:"counter-increment",initialValue:"none",prefix:!0,type:1,parse:function(n,e){if(e.length===0)return null;var A=e[0];if(A.type===20&&A.value==="none")return null;for(var t=[],i=e.filter(zu),r=0;r<i.length;r++){var s=i[r],a=i[r+1];if(s.type===20){var o=a&&oi(a)?a.number:1;t.push({counter:s.value,increment:o})}}return t}},zg={name:"counter-reset",initialValue:"none",prefix:!0,type:1,parse:function(n,e){if(e.length===0)return[];for(var A=[],t=e.filter(zu),i=0;i<t.length;i++){var r=t[i],s=t[i+1];if(Ze(r)&&r.value!=="none"){var a=s&&oi(s)?s.number:0;A.push({counter:r.value,reset:a})}}return A}},Wg={name:"duration",initialValue:"0s",prefix:!1,type:1,parse:function(n,e){return e.filter(Xi).map(function(A){return oh.parse(n,A)})}},Xg={name:"quotes",initialValue:"none",prefix:!0,type:1,parse:function(n,e){if(e.length===0)return null;var A=e[0];if(A.type===20&&A.value==="none")return null;var t=[],i=e.filter(_p);if(i.length%2!==0)return null;for(var r=0;r<i.length;r+=2){var s=i[r].value,a=i[r+1].value;t.push({open:s,close:a})}return t}},_l=function(n,e,A){if(!n)return"";var t=n[Math.min(e,n.length-1)];return t?A?t.open:t.close:""},Yg={name:"box-shadow",initialValue:"none",type:1,prefix:!1,parse:function(n,e){return e.length===1&&$a(e[0],"none")?[]:Bt(e).map(function(A){for(var t={color:255,offsetX:CA,offsetY:CA,blur:CA,spread:CA,inset:!1},i=0,r=0;r<A.length;r++){var s=A[r];$a(s,"inset")?t.inset=!0:en(s)?(i===0?t.offsetX=s:i===1?t.offsetY=s:i===2?t.blur=s:t.spread=s,i++):t.color=Yt.parse(n,s)}return t})}},Jg={name:"paint-order",initialValue:"normal",prefix:!1,type:1,parse:function(n,e){var A=[0,1,2],t=[];return e.filter(Ze).forEach(function(i){switch(i.value){case"stroke":t.push(1);break;case"fill":t.push(0);break;case"markers":t.push(2);break}}),A.forEach(function(i){t.indexOf(i)===-1&&t.push(i)}),t}},qg={name:"-webkit-text-stroke-color",initialValue:"currentcolor",prefix:!1,type:3,format:"color"},Zg={name:"-webkit-text-stroke-width",initialValue:"0",type:0,prefix:!1,parse:function(n,e){return Xi(e)?e.number:0}},jg=function(){function n(e,A){var t,i;this.animationDuration=pe(e,Wg,A.animationDuration),this.backgroundClip=pe(e,Ep,A.backgroundClip),this.backgroundColor=pe(e,Cp,A.backgroundColor),this.backgroundImage=pe(e,Ip,A.backgroundImage),this.backgroundOrigin=pe(e,Lp,A.backgroundOrigin),this.backgroundPosition=pe(e,Rp,A.backgroundPosition),this.backgroundRepeat=pe(e,Dp,A.backgroundRepeat),this.backgroundSize=pe(e,Pp,A.backgroundSize),this.borderTopColor=pe(e,Np,A.borderTopColor),this.borderRightColor=pe(e,Gp,A.borderRightColor),this.borderBottomColor=pe(e,Vp,A.borderBottomColor),this.borderLeftColor=pe(e,kp,A.borderLeftColor),this.borderTopLeftRadius=pe(e,Kp,A.borderTopLeftRadius),this.borderTopRightRadius=pe(e,zp,A.borderTopRightRadius),this.borderBottomRightRadius=pe(e,Wp,A.borderBottomRightRadius),this.borderBottomLeftRadius=pe(e,Xp,A.borderBottomLeftRadius),this.borderTopStyle=pe(e,Yp,A.borderTopStyle),this.borderRightStyle=pe(e,Jp,A.borderRightStyle),this.borderBottomStyle=pe(e,qp,A.borderBottomStyle),this.borderLeftStyle=pe(e,Zp,A.borderLeftStyle),this.borderTopWidth=pe(e,jp,A.borderTopWidth),this.borderRightWidth=pe(e,$p,A.borderRightWidth),this.borderBottomWidth=pe(e,eg,A.borderBottomWidth),this.borderLeftWidth=pe(e,Ag,A.borderLeftWidth),this.boxShadow=pe(e,Yg,A.boxShadow),this.color=pe(e,tg,A.color),this.direction=pe(e,ng,A.direction),this.display=pe(e,ig,A.display),this.float=pe(e,sg,A.cssFloat),this.fontFamily=pe(e,Pg,A.fontFamily),this.fontSize=pe(e,Og,A.fontSize),this.fontStyle=pe(e,Vg,A.fontStyle),this.fontVariant=pe(e,Gg,A.fontVariant),this.fontWeight=pe(e,Ng,A.fontWeight),this.letterSpacing=pe(e,ag,A.letterSpacing),this.lineBreak=pe(e,og,A.lineBreak),this.lineHeight=pe(e,lg,A.lineHeight),this.listStyleImage=pe(e,cg,A.listStyleImage),this.listStylePosition=pe(e,ug,A.listStylePosition),this.listStyleType=pe(e,eo,A.listStyleType),this.marginTop=pe(e,hg,A.marginTop),this.marginRight=pe(e,fg,A.marginRight),this.marginBottom=pe(e,dg,A.marginBottom),this.marginLeft=pe(e,pg,A.marginLeft),this.opacity=pe(e,Rg,A.opacity);var r=pe(e,gg,A.overflow);this.overflowX=r[0],this.overflowY=r[r.length>1?1:0],this.overflowWrap=pe(e,mg,A.overflowWrap),this.paddingTop=pe(e,Bg,A.paddingTop),this.paddingRight=pe(e,_g,A.paddingRight),this.paddingBottom=pe(e,wg,A.paddingBottom),this.paddingLeft=pe(e,vg,A.paddingLeft),this.paintOrder=pe(e,Jg,A.paintOrder),this.position=pe(e,Cg,A.position),this.textAlign=pe(e,Eg,A.textAlign),this.textDecorationColor=pe(e,Dg,(t=A.textDecorationColor)!==null&&t!==void 0?t:A.color),this.textDecorationLine=pe(e,Hg,(i=A.textDecorationLine)!==null&&i!==void 0?i:A.textDecoration),this.textShadow=pe(e,xg,A.textShadow),this.textTransform=pe(e,Ug,A.textTransform),this.transform=pe(e,yg,A.transform),this.transformOrigin=pe(e,Tg,A.transformOrigin),this.visibility=pe(e,Qg,A.visibility),this.webkitTextStrokeColor=pe(e,qg,A.webkitTextStrokeColor),this.webkitTextStrokeWidth=pe(e,Zg,A.webkitTextStrokeWidth),this.wordBreak=pe(e,Ig,A.wordBreak),this.zIndex=pe(e,Lg,A.zIndex)}return n.prototype.isVisible=function(){return this.display>0&&this.opacity>0&&this.visibility===0},n.prototype.isTransparent=function(){return Jt(this.backgroundColor)},n.prototype.isTransformed=function(){return this.transform!==null},n.prototype.isPositioned=function(){return this.position!==0},n.prototype.isPositionedWithZIndex=function(){return this.isPositioned()&&!this.zIndex.auto},n.prototype.isFloating=function(){return this.float!==0},n.prototype.isInlineLevel=function(){return fA(this.display,4)||fA(this.display,33554432)||fA(this.display,268435456)||fA(this.display,536870912)||fA(this.display,67108864)||fA(this.display,134217728)},n}(),$g=function(){function n(e,A){this.content=pe(e,kg,A.content),this.quotes=pe(e,Xg,A.quotes)}return n}(),wl=function(){function n(e,A){this.counterIncrement=pe(e,Kg,A.counterIncrement),this.counterReset=pe(e,zg,A.counterReset)}return n}(),pe=function(n,e,A){var t=new ku,i=A!==null&&typeof A<"u"?A.toString():e.initialValue;t.write(i);var r=new Ku(t.read());switch(e.type){case 2:var s=r.parseComponentValue();return e.parse(n,Ze(s)?s.value:e.initialValue);case 0:return e.parse(n,r.parseComponentValue());case 1:return e.parse(n,r.parseComponentValues());case 4:return r.parseComponentValue();case 3:switch(e.format){case"angle":return ms.parse(n,r.parseComponentValue());case"color":return Yt.parse(n,r.parseComponentValue());case"image":return xo.parse(n,r.parseComponentValue());case"length":var a=r.parseComponentValue();return en(a)?a:CA;case"length-percentage":var o=r.parseComponentValue();return hA(o)?o:CA;case"time":return oh.parse(n,r.parseComponentValue())}break}},em="data-html2canvas-debug",Am=function(n){var e=n.getAttribute(em);switch(e){case"all":return 1;case"clone":return 2;case"parse":return 3;case"render":return 4;default:return 0}},Ao=function(n,e){var A=Am(n);return A===1||e===A},_t=function(){function n(e,A){if(this.context=e,this.textNodes=[],this.elements=[],this.flags=0,Ao(A,3))debugger;this.styles=new jg(e,window.getComputedStyle(A,null)),io(A)&&(this.styles.animationDuration.some(function(t){return t>0})&&(A.style.animationDuration="0s"),this.styles.transform!==null&&(A.style.transform="none")),this.bounds=ps(this.context,A),Ao(A,4)&&(this.flags|=16)}return n}(),tm="AAAAAAAAAAAAEA4AGBkAAFAaAAACAAAAAAAIABAAGAAwADgACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAAQABIAEQATAAIABAACAAQAAgAEAAIABAAVABcAAgAEAAIABAACAAQAGAAaABwAHgAgACIAI4AlgAIABAAmwCjAKgAsAC2AL4AvQDFAMoA0gBPAVYBWgEIAAgACACMANoAYgFkAWwBdAF8AX0BhQGNAZUBlgGeAaMBlQGWAasBswF8AbsBwwF0AcsBYwHTAQgA2wG/AOMBdAF8AekB8QF0AfkB+wHiAHQBfAEIAAMC5gQIAAsCEgIIAAgAFgIeAggAIgIpAggAMQI5AkACygEIAAgASAJQAlgCYAIIAAgACAAKBQoFCgUTBRMFGQUrBSsFCAAIAAgACAAIAAgACAAIAAgACABdAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABoAmgCrwGvAQgAbgJ2AggAHgEIAAgACADnAXsCCAAIAAgAgwIIAAgACAAIAAgACACKAggAkQKZAggAPADJAAgAoQKkAqwCsgK6AsICCADJAggA0AIIAAgACAAIANYC3gIIAAgACAAIAAgACABAAOYCCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAkASoB+QIEAAgACAA8AEMCCABCBQgACABJBVAFCAAIAAgACAAIAAgACAAIAAgACABTBVoFCAAIAFoFCABfBWUFCAAIAAgACAAIAAgAbQUIAAgACAAIAAgACABzBXsFfQWFBYoFigWKBZEFigWKBYoFmAWfBaYFrgWxBbkFCAAIAAgACAAIAAgACAAIAAgACAAIAMEFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAMgFCADQBQgACAAIAAgACAAIAAgACAAIAAgACAAIAO4CCAAIAAgAiQAIAAgACABAAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAD0AggACAD8AggACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIANYFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAMDvwAIAAgAJAIIAAgACAAIAAgACAAIAAgACwMTAwgACAB9BOsEGwMjAwgAKwMyAwsFYgE3A/MEPwMIAEUDTQNRAwgAWQOsAGEDCAAIAAgACAAIAAgACABpAzQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFIQUoBSwFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABtAwgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABMAEwACAAIAAgACAAIABgACAAIAAgACAC/AAgACAAyAQgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACAAIAAwAAgACAAIAAgACAAIAAgACAAIAAAARABIAAgACAAIABQASAAIAAgAIABwAEAAjgCIABsAqAC2AL0AigDQAtwC+IJIQqVAZUBWQqVAZUBlQGVAZUBlQGrC5UBlQGVAZUBlQGVAZUBlQGVAXsKlQGVAbAK6wsrDGUMpQzlDJUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAfAKAAuZA64AtwCJALoC6ADwAAgAuACgA/oEpgO6AqsD+AAIAAgAswMIAAgACAAIAIkAuwP5AfsBwwPLAwgACAAIAAgACADRA9kDCAAIAOED6QMIAAgACAAIAAgACADuA/YDCAAIAP4DyQAIAAgABgQIAAgAXQAOBAgACAAIAAgACAAIABMECAAIAAgACAAIAAgACAD8AAQBCAAIAAgAGgQiBCoECAExBAgAEAEIAAgACAAIAAgACAAIAAgACAAIAAgACAA4BAgACABABEYECAAIAAgATAQYAQgAVAQIAAgACAAIAAgACAAIAAgACAAIAFoECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAOQEIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAB+BAcACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAEABhgSMBAgACAAIAAgAlAQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAwAEAAQABAADAAMAAwADAAQABAAEAAQABAAEAAQABHATAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAdQMIAAgACAAIAAgACAAIAMkACAAIAAgAfQMIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACFA4kDCAAIAAgACAAIAOcBCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAIcDCAAIAAgACAAIAAgACAAIAAgACAAIAJEDCAAIAAgACADFAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABgBAgAZgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAbAQCBXIECAAIAHkECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABAAJwEQACjBKoEsgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAC6BMIECAAIAAgACAAIAAgACABmBAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAxwQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAGYECAAIAAgAzgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBd0FXwUIAOIF6gXxBYoF3gT5BQAGCAaKBYoFigWKBYoFigWKBYoFigWKBYoFigXWBIoFigWKBYoFigWKBYoFigWKBYsFEAaKBYoFigWKBYoFigWKBRQGCACKBYoFigWKBQgACAAIANEECAAIABgGigUgBggAJgYIAC4GMwaKBYoF0wQ3Bj4GigWKBYoFigWKBYoFigWKBYoFigWKBYoFigUIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWLBf///////wQABAAEAAQABAAEAAQABAAEAAQAAwAEAAQAAgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAQADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUAAAAFAAUAAAAFAAUAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAQAAAAUABQAFAAUABQAFAAAAAAAFAAUAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAFAAUAAQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAAABwAHAAcAAAAHAAcABwAFAAEAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAcABwAFAAUAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAQABAAAAAAAAAAAAAAAFAAUABQAFAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAHAAcAAAAHAAcAAAAAAAUABQAHAAUAAQAHAAEABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwABAAUABQAFAAUAAAAAAAAAAAAAAAEAAQABAAEAAQABAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABQANAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAABQAHAAUABQAFAAAAAAAAAAcABQAFAAUABQAFAAQABAAEAAQABAAEAAQABAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUAAAAFAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAUAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAcABwAFAAcABwAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUABwAHAAUABQAFAAUAAAAAAAcABwAAAAAABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAAAAAAAAAAABQAFAAAAAAAFAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAFAAUABQAFAAUAAAAFAAUABwAAAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABwAFAAUABQAFAAAAAAAHAAcAAAAAAAcABwAFAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAAAAAAAAAHAAcABwAAAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAUABQAFAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAHAAcABQAHAAcAAAAFAAcABwAAAAcABwAFAAUAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAFAAcABwAFAAUABQAAAAUAAAAHAAcABwAHAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAHAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUAAAAFAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAUAAAAFAAUAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABwAFAAUABQAFAAUABQAAAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABQAFAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAFAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAHAAUABQAFAAUABQAFAAUABwAHAAcABwAHAAcABwAHAAUABwAHAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABwAHAAcABwAFAAUABwAHAAcAAAAAAAAAAAAHAAcABQAHAAcABwAHAAcABwAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAUABQAFAAUABQAFAAUAAAAFAAAABQAAAAAABQAFAAUABQAFAAUABQAFAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAUABQAFAAUABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABwAFAAcABwAHAAcABwAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAUABQAFAAUABwAHAAUABQAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABQAFAAcABwAHAAUABwAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAcABQAFAAUABQAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAAAAAABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAAAAAAAAAFAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAUABQAHAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAFAAUABQAFAAcABwAFAAUABwAHAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAcABwAFAAUABwAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABQAAAAAABQAFAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAcABwAAAAAAAAAAAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAcABwAFAAcABwAAAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAFAAUABQAAAAUABQAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABwAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAHAAcABQAHAAUABQAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAAABwAHAAAAAAAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAFAAUABwAFAAcABwAFAAcABQAFAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAAAAAABwAHAAcABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAFAAcABwAFAAUABQAFAAUABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAUABQAFAAcABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABQAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAAAAAAFAAUABwAHAAcABwAFAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAHAAUABQAFAAUABQAFAAUABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAABQAAAAUABQAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAHAAcAAAAFAAUAAAAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABQAFAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAABQAFAAUABQAFAAUABQAAAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAFAAUABQAFAAUADgAOAA4ADgAOAA4ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAMAAwADAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAAAAAAAAAAAAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAAAAAAAAAAAAsADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwACwAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAADgAOAA4AAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAAAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4AAAAOAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAAAAAAAAAAAA4AAAAOAAAAAAAAAAAADgAOAA4AAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAA=",vl="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Ui=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(var gr=0;gr<vl.length;gr++)Ui[vl.charCodeAt(gr)]=gr;var nm=function(n){var e=n.length*.75,A=n.length,t,i=0,r,s,a,o;n[n.length-1]==="="&&(e--,n[n.length-2]==="="&&e--);var l=typeof ArrayBuffer<"u"&&typeof Uint8Array<"u"&&typeof Uint8Array.prototype.slice<"u"?new ArrayBuffer(e):new Array(e),c=Array.isArray(l)?l:new Uint8Array(l);for(t=0;t<A;t+=4)r=Ui[n.charCodeAt(t)],s=Ui[n.charCodeAt(t+1)],a=Ui[n.charCodeAt(t+2)],o=Ui[n.charCodeAt(t+3)],c[i++]=r<<2|s>>4,c[i++]=(s&15)<<4|a>>2,c[i++]=(a&3)<<6|o&63;return l},im=function(n){for(var e=n.length,A=[],t=0;t<e;t+=2)A.push(n[t+1]<<8|n[t]);return A},rm=function(n){for(var e=n.length,A=[],t=0;t<e;t+=4)A.push(n[t+3]<<24|n[t+2]<<16|n[t+1]<<8|n[t]);return A},mn=5,Uo=6+5,zs=2,sm=Uo-mn,lh=65536>>mn,am=1<<mn,Ws=am-1,om=1024>>mn,lm=lh+om,cm=lm,um=32,hm=cm+um,fm=65536>>Uo,dm=1<<sm,pm=dm-1,El=function(n,e,A){return n.slice?n.slice(e,A):new Uint16Array(Array.prototype.slice.call(n,e,A))},gm=function(n,e,A){return n.slice?n.slice(e,A):new Uint32Array(Array.prototype.slice.call(n,e,A))},mm=function(n,e){var A=nm(n),t=Array.isArray(A)?rm(A):new Uint32Array(A),i=Array.isArray(A)?im(A):new Uint16Array(A),r=24,s=El(i,r/2,t[4]/2),a=t[5]===2?El(i,(r+t[4])/2):gm(t,Math.ceil((r+t[4])/4));return new Bm(t[0],t[1],t[2],t[3],s,a)},Bm=function(){function n(e,A,t,i,r,s){this.initialValue=e,this.errorValue=A,this.highStart=t,this.highValueIndex=i,this.index=r,this.data=s}return n.prototype.get=function(e){var A;if(e>=0){if(e<55296||e>56319&&e<=65535)return A=this.index[e>>mn],A=(A<<zs)+(e&Ws),this.data[A];if(e<=65535)return A=this.index[lh+(e-55296>>mn)],A=(A<<zs)+(e&Ws),this.data[A];if(e<this.highStart)return A=hm-fm+(e>>Uo),A=this.index[A],A+=e>>mn&pm,A=this.index[A],A=(A<<zs)+(e&Ws),this.data[A];if(e<=1114111)return this.data[this.highValueIndex]}return this.errorValue},n}(),Cl="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",_m=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(var mr=0;mr<Cl.length;mr++)_m[Cl.charCodeAt(mr)]=mr;var wm=1,Xs=2,Ys=3,xl=4,Ul=5,vm=7,yl=8,Js=9,qs=10,Sl=11,Ml=12,Fl=13,bl=14,Zs=15,Em=function(n){for(var e=[],A=0,t=n.length;A<t;){var i=n.charCodeAt(A++);if(i>=55296&&i<=56319&&A<t){var r=n.charCodeAt(A++);(r&64512)===56320?e.push(((i&1023)<<10)+(r&1023)+65536):(e.push(i),A--)}else e.push(i)}return e},Cm=function(){for(var n=[],e=0;e<arguments.length;e++)n[e]=arguments[e];if(String.fromCodePoint)return String.fromCodePoint.apply(String,n);var A=n.length;if(!A)return"";for(var t=[],i=-1,r="";++i<A;){var s=n[i];s<=65535?t.push(s):(s-=65536,t.push((s>>10)+55296,s%1024+56320)),(i+1===A||t.length>16384)&&(r+=String.fromCharCode.apply(String,t),t.length=0)}return r},xm=mm(tm),JA="×",js="÷",Um=function(n){return xm.get(n)},ym=function(n,e,A){var t=A-2,i=e[t],r=e[A-1],s=e[A];if(r===Xs&&s===Ys)return JA;if(r===Xs||r===Ys||r===xl||s===Xs||s===Ys||s===xl)return js;if(r===yl&&[yl,Js,Sl,Ml].indexOf(s)!==-1||(r===Sl||r===Js)&&(s===Js||s===qs)||(r===Ml||r===qs)&&s===qs||s===Fl||s===Ul||s===vm||r===wm)return JA;if(r===Fl&&s===bl){for(;i===Ul;)i=e[--t];if(i===bl)return JA}if(r===Zs&&s===Zs){for(var a=0;i===Zs;)a++,i=e[--t];if(a%2===0)return JA}return js},Sm=function(n){var e=Em(n),A=e.length,t=0,i=0,r=e.map(Um);return{next:function(){if(t>=A)return{done:!0,value:null};for(var s=JA;t<A&&(s=ym(e,r,++t))===JA;);if(s!==JA||t===A){var a=Cm.apply(null,e.slice(i,t));return i=t,{value:a,done:!1}}return{done:!0,value:null}}}},Mm=function(n){for(var e=Sm(n),A=[],t;!(t=e.next()).done;)t.value&&A.push(t.value.slice());return A},Fm=function(n){var e=123;if(n.createRange){var A=n.createRange();if(A.getBoundingClientRect){var t=n.createElement("boundtest");t.style.height=e+"px",t.style.display="block",n.body.appendChild(t),A.selectNode(t);var i=A.getBoundingClientRect(),r=Math.round(i.height);if(n.body.removeChild(t),r===e)return!0}}return!1},bm=function(n){var e=n.createElement("boundtest");e.style.width="50px",e.style.display="block",e.style.fontSize="12px",e.style.letterSpacing="0px",e.style.wordSpacing="0px",n.body.appendChild(e);var A=n.createRange();e.innerHTML=typeof"".repeat=="function"?"&#128104;".repeat(10):"";var t=e.firstChild,i=gs(t.data).map(function(o){return aA(o)}),r=0,s={},a=i.every(function(o,l){A.setStart(t,r),A.setEnd(t,r+o.length);var c=A.getBoundingClientRect();r+=o.length;var u=c.x>s.x||c.y>s.y;return s=c,l===0?!0:u});return n.body.removeChild(e),a},Tm=function(){return typeof new Image().crossOrigin<"u"},Qm=function(){return typeof new XMLHttpRequest().responseType=="string"},Im=function(n){var e=new Image,A=n.createElement("canvas"),t=A.getContext("2d");if(!t)return!1;e.src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";try{t.drawImage(e,0,0),A.toDataURL()}catch{return!1}return!0},Tl=function(n){return n[0]===0&&n[1]===255&&n[2]===0&&n[3]===255},Lm=function(n){var e=n.createElement("canvas"),A=100;e.width=A,e.height=A;var t=e.getContext("2d");if(!t)return Promise.reject(!1);t.fillStyle="rgb(0, 255, 0)",t.fillRect(0,0,A,A);var i=new Image,r=e.toDataURL();i.src=r;var s=to(A,A,0,0,i);return t.fillStyle="red",t.fillRect(0,0,A,A),Ql(s).then(function(a){t.drawImage(a,0,0);var o=t.getImageData(0,0,A,A).data;t.fillStyle="red",t.fillRect(0,0,A,A);var l=n.createElement("div");return l.style.backgroundImage="url("+r+")",l.style.height=A+"px",Tl(o)?Ql(to(A,A,0,0,l)):Promise.reject(!1)}).then(function(a){return t.drawImage(a,0,0),Tl(t.getImageData(0,0,A,A).data)}).catch(function(){return!1})},to=function(n,e,A,t,i){var r="http://www.w3.org/2000/svg",s=document.createElementNS(r,"svg"),a=document.createElementNS(r,"foreignObject");return s.setAttributeNS(null,"width",n.toString()),s.setAttributeNS(null,"height",e.toString()),a.setAttributeNS(null,"width","100%"),a.setAttributeNS(null,"height","100%"),a.setAttributeNS(null,"x",A.toString()),a.setAttributeNS(null,"y",t.toString()),a.setAttributeNS(null,"externalResourcesRequired","true"),s.appendChild(a),a.appendChild(i),s},Ql=function(n){return new Promise(function(e,A){var t=new Image;t.onload=function(){return e(t)},t.onerror=A,t.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(new XMLSerializer().serializeToString(n))})},vA={get SUPPORT_RANGE_BOUNDS(){var n=Fm(document);return Object.defineProperty(vA,"SUPPORT_RANGE_BOUNDS",{value:n}),n},get SUPPORT_WORD_BREAKING(){var n=vA.SUPPORT_RANGE_BOUNDS&&bm(document);return Object.defineProperty(vA,"SUPPORT_WORD_BREAKING",{value:n}),n},get SUPPORT_SVG_DRAWING(){var n=Im(document);return Object.defineProperty(vA,"SUPPORT_SVG_DRAWING",{value:n}),n},get SUPPORT_FOREIGNOBJECT_DRAWING(){var n=typeof Array.from=="function"&&typeof window.fetch=="function"?Lm(document):Promise.resolve(!1);return Object.defineProperty(vA,"SUPPORT_FOREIGNOBJECT_DRAWING",{value:n}),n},get SUPPORT_CORS_IMAGES(){var n=Tm();return Object.defineProperty(vA,"SUPPORT_CORS_IMAGES",{value:n}),n},get SUPPORT_RESPONSE_TYPE(){var n=Qm();return Object.defineProperty(vA,"SUPPORT_RESPONSE_TYPE",{value:n}),n},get SUPPORT_CORS_XHR(){var n="withCredentials"in new XMLHttpRequest;return Object.defineProperty(vA,"SUPPORT_CORS_XHR",{value:n}),n},get SUPPORT_NATIVE_TEXT_SEGMENTATION(){var n=!!(typeof Intl<"u"&&Intl.Segmenter);return Object.defineProperty(vA,"SUPPORT_NATIVE_TEXT_SEGMENTATION",{value:n}),n}},Qi=function(){function n(e,A){this.text=e,this.bounds=A}return n}(),Rm=function(n,e,A,t){var i=Pm(e,A),r=[],s=0;return i.forEach(function(a){if(A.textDecorationLine.length||a.trim().length>0)if(vA.SUPPORT_RANGE_BOUNDS){var o=Il(t,s,a.length).getClientRects();if(o.length>1){var l=yo(a),c=0;l.forEach(function(h){r.push(new Qi(h,Qt.fromDOMRectList(n,Il(t,c+s,h.length).getClientRects()))),c+=h.length})}else r.push(new Qi(a,Qt.fromDOMRectList(n,o)))}else{var u=t.splitText(a.length);r.push(new Qi(a,Dm(n,t))),t=u}else vA.SUPPORT_RANGE_BOUNDS||(t=t.splitText(a.length));s+=a.length}),r},Dm=function(n,e){var A=e.ownerDocument;if(A){var t=A.createElement("html2canvaswrapper");t.appendChild(e.cloneNode(!0));var i=e.parentNode;if(i){i.replaceChild(t,e);var r=ps(n,t);return t.firstChild&&i.replaceChild(t.firstChild,t),r}}return Qt.EMPTY},Il=function(n,e,A){var t=n.ownerDocument;if(!t)throw new Error("Node has no owner document");var i=t.createRange();return i.setStart(n,e),i.setEnd(n,e+A),i},yo=function(n){if(vA.SUPPORT_NATIVE_TEXT_SEGMENTATION){var e=new Intl.Segmenter(void 0,{granularity:"grapheme"});return Array.from(e.segment(n)).map(function(A){return A.segment})}return Mm(n)},Hm=function(n,e){if(vA.SUPPORT_NATIVE_TEXT_SEGMENTATION){var A=new Intl.Segmenter(void 0,{granularity:"word"});return Array.from(A.segment(n)).map(function(t){return t.segment})}return Nm(n,e)},Pm=function(n,e){return e.letterSpacing!==0?yo(n):Hm(n,e)},Om=[32,160,4961,65792,65793,4153,4241],Nm=function(n,e){for(var A=fd(n,{lineBreak:e.lineBreak,wordBreak:e.overflowWrap==="break-word"?"break-word":e.wordBreak}),t=[],i,r=function(){if(i.value){var s=i.value.slice(),a=gs(s),o="";a.forEach(function(l){Om.indexOf(l)===-1?o+=aA(l):(o.length&&t.push(o),t.push(aA(l)),o="")}),o.length&&t.push(o)}};!(i=A.next()).done;)r();return t},Gm=function(){function n(e,A,t){this.text=Vm(A.data,t.textTransform),this.textBounds=Rm(e,this.text,t,A)}return n}(),Vm=function(n,e){switch(e){case 1:return n.toLowerCase();case 3:return n.replace(km,Km);case 2:return n.toUpperCase();default:return n}},km=/(^|\s|:|-|\(|\))([a-z])/g,Km=function(n,e,A){return n.length>0?e+A.toUpperCase():n},ch=function(n){ct(e,n);function e(A,t){var i=n.call(this,A,t)||this;return i.src=t.currentSrc||t.src,i.intrinsicWidth=t.naturalWidth,i.intrinsicHeight=t.naturalHeight,i.context.cache.addImage(i.src),i}return e}(_t),uh=function(n){ct(e,n);function e(A,t){var i=n.call(this,A,t)||this;return i.canvas=t,i.intrinsicWidth=t.width,i.intrinsicHeight=t.height,i}return e}(_t),hh=function(n){ct(e,n);function e(A,t){var i=n.call(this,A,t)||this,r=new XMLSerializer,s=ps(A,t);return t.setAttribute("width",s.width+"px"),t.setAttribute("height",s.height+"px"),i.svg="data:image/svg+xml,"+encodeURIComponent(r.serializeToString(t)),i.intrinsicWidth=t.width.baseVal.value,i.intrinsicHeight=t.height.baseVal.value,i.context.cache.addImage(i.svg),i}return e}(_t),fh=function(n){ct(e,n);function e(A,t){var i=n.call(this,A,t)||this;return i.value=t.value,i}return e}(_t),no=function(n){ct(e,n);function e(A,t){var i=n.call(this,A,t)||this;return i.start=t.start,i.reversed=typeof t.reversed=="boolean"&&t.reversed===!0,i}return e}(_t),zm=[{type:15,flags:0,unit:"px",number:3}],Wm=[{type:16,flags:0,number:50}],Xm=function(n){return n.width>n.height?new Qt(n.left+(n.width-n.height)/2,n.top,n.height,n.height):n.width<n.height?new Qt(n.left,n.top+(n.height-n.width)/2,n.width,n.width):n},Ym=function(n){var e=n.type===Jm?new Array(n.value.length+1).join("•"):n.value;return e.length===0?n.placeholder||"":e},es="checkbox",As="radio",Jm="password",Ll=707406591,So=function(n){ct(e,n);function e(A,t){var i=n.call(this,A,t)||this;switch(i.type=t.type.toLowerCase(),i.checked=t.checked,i.value=Ym(t),(i.type===es||i.type===As)&&(i.styles.backgroundColor=3739148031,i.styles.borderTopColor=i.styles.borderRightColor=i.styles.borderBottomColor=i.styles.borderLeftColor=2779096575,i.styles.borderTopWidth=i.styles.borderRightWidth=i.styles.borderBottomWidth=i.styles.borderLeftWidth=1,i.styles.borderTopStyle=i.styles.borderRightStyle=i.styles.borderBottomStyle=i.styles.borderLeftStyle=1,i.styles.backgroundClip=[0],i.styles.backgroundOrigin=[0],i.bounds=Xm(i.bounds)),i.type){case es:i.styles.borderTopRightRadius=i.styles.borderTopLeftRadius=i.styles.borderBottomRightRadius=i.styles.borderBottomLeftRadius=zm;break;case As:i.styles.borderTopRightRadius=i.styles.borderTopLeftRadius=i.styles.borderBottomRightRadius=i.styles.borderBottomLeftRadius=Wm;break}return i}return e}(_t),dh=function(n){ct(e,n);function e(A,t){var i=n.call(this,A,t)||this,r=t.options[t.selectedIndex||0];return i.value=r&&r.text||"",i}return e}(_t),ph=function(n){ct(e,n);function e(A,t){var i=n.call(this,A,t)||this;return i.value=t.value,i}return e}(_t),gh=function(n){ct(e,n);function e(A,t){var i=n.call(this,A,t)||this;i.src=t.src,i.width=parseInt(t.width,10)||0,i.height=parseInt(t.height,10)||0,i.backgroundColor=i.styles.backgroundColor;try{if(t.contentWindow&&t.contentWindow.document&&t.contentWindow.document.documentElement){i.tree=Bh(A,t.contentWindow.document.documentElement);var r=t.contentWindow.document.documentElement?bi(A,getComputedStyle(t.contentWindow.document.documentElement).backgroundColor):Tt.TRANSPARENT,s=t.contentWindow.document.body?bi(A,getComputedStyle(t.contentWindow.document.body).backgroundColor):Tt.TRANSPARENT;i.backgroundColor=Jt(r)?Jt(s)?i.styles.backgroundColor:s:r}}catch{}return i}return e}(_t),qm=["OL","UL","MENU"],Yr=function(n,e,A,t){for(var i=e.firstChild,r=void 0;i;i=r)if(r=i.nextSibling,_h(i)&&i.data.trim().length>0)A.textNodes.push(new Gm(n,i,A.styles));else if(jn(i))if(Ch(i)&&i.assignedNodes)i.assignedNodes().forEach(function(a){return Yr(n,a,A,t)});else{var s=mh(n,i);s.styles.isVisible()&&(Zm(i,s,t)?s.flags|=4:jm(s.styles)&&(s.flags|=2),qm.indexOf(i.tagName)!==-1&&(s.flags|=8),A.elements.push(s),i.slot,i.shadowRoot?Yr(n,i.shadowRoot,s,t):!ts(i)&&!wh(i)&&!ns(i)&&Yr(n,i,s,t))}},mh=function(n,e){return ro(e)?new ch(n,e):vh(e)?new uh(n,e):wh(e)?new hh(n,e):$m(e)?new fh(n,e):eB(e)?new no(n,e):AB(e)?new So(n,e):ns(e)?new dh(n,e):ts(e)?new ph(n,e):Eh(e)?new gh(n,e):new _t(n,e)},Bh=function(n,e){var A=mh(n,e);return A.flags|=4,Yr(n,e,A,A),A},Zm=function(n,e,A){return e.styles.isPositionedWithZIndex()||e.styles.opacity<1||e.styles.isTransformed()||Mo(n)&&A.styles.isTransparent()},jm=function(n){return n.isPositioned()||n.isFloating()},_h=function(n){return n.nodeType===Node.TEXT_NODE},jn=function(n){return n.nodeType===Node.ELEMENT_NODE},io=function(n){return jn(n)&&typeof n.style<"u"&&!Jr(n)},Jr=function(n){return typeof n.className=="object"},$m=function(n){return n.tagName==="LI"},eB=function(n){return n.tagName==="OL"},AB=function(n){return n.tagName==="INPUT"},tB=function(n){return n.tagName==="HTML"},wh=function(n){return n.tagName==="svg"},Mo=function(n){return n.tagName==="BODY"},vh=function(n){return n.tagName==="CANVAS"},Rl=function(n){return n.tagName==="VIDEO"},ro=function(n){return n.tagName==="IMG"},Eh=function(n){return n.tagName==="IFRAME"},Dl=function(n){return n.tagName==="STYLE"},nB=function(n){return n.tagName==="SCRIPT"},ts=function(n){return n.tagName==="TEXTAREA"},ns=function(n){return n.tagName==="SELECT"},Ch=function(n){return n.tagName==="SLOT"},Hl=function(n){return n.tagName.indexOf("-")>0},iB=function(){function n(){this.counters={}}return n.prototype.getCounterValue=function(e){var A=this.counters[e];return A&&A.length?A[A.length-1]:1},n.prototype.getCounterValues=function(e){var A=this.counters[e];return A||[]},n.prototype.pop=function(e){var A=this;e.forEach(function(t){return A.counters[t].pop()})},n.prototype.parse=function(e){var A=this,t=e.counterIncrement,i=e.counterReset,r=!0;t!==null&&t.forEach(function(a){var o=A.counters[a.counter];o&&a.increment!==0&&(r=!1,o.length||o.push(1),o[Math.max(0,o.length-1)]+=a.increment)});var s=[];return r&&i.forEach(function(a){var o=A.counters[a.counter];s.push(a.counter),o||(o=A.counters[a.counter]=[]),o.push(a.reset)}),s},n}(),Pl={integers:[1e3,900,500,400,100,90,50,40,10,9,5,4,1],values:["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"]},Ol={integers:[9e3,8e3,7e3,6e3,5e3,4e3,3e3,2e3,1e3,900,800,700,600,500,400,300,200,100,90,80,70,60,50,40,30,20,10,9,8,7,6,5,4,3,2,1],values:["Ք","Փ","Ւ","Ց","Ր","Տ","Վ","Ս","Ռ","Ջ","Պ","Չ","Ո","Շ","Ն","Յ","Մ","Ճ","Ղ","Ձ","Հ","Կ","Ծ","Խ","Լ","Ի","Ժ","Թ","Ը","Է","Զ","Ե","Դ","Գ","Բ","Ա"]},rB={integers:[1e4,9e3,8e3,7e3,6e3,5e3,4e3,3e3,2e3,1e3,400,300,200,100,90,80,70,60,50,40,30,20,19,18,17,16,15,10,9,8,7,6,5,4,3,2,1],values:["י׳","ט׳","ח׳","ז׳","ו׳","ה׳","ד׳","ג׳","ב׳","א׳","ת","ש","ר","ק","צ","פ","ע","ס","נ","מ","ל","כ","יט","יח","יז","טז","טו","י","ט","ח","ז","ו","ה","ד","ג","ב","א"]},sB={integers:[1e4,9e3,8e3,7e3,6e3,5e3,4e3,3e3,2e3,1e3,900,800,700,600,500,400,300,200,100,90,80,70,60,50,40,30,20,10,9,8,7,6,5,4,3,2,1],values:["ჵ","ჰ","ჯ","ჴ","ხ","ჭ","წ","ძ","ც","ჩ","შ","ყ","ღ","ქ","ფ","ჳ","ტ","ს","რ","ჟ","პ","ო","ჲ","ნ","მ","ლ","კ","ი","თ","ჱ","ზ","ვ","ე","დ","გ","ბ","ა"]},Sn=function(n,e,A,t,i,r){return n<e||n>A?Gi(n,i,r.length>0):t.integers.reduce(function(s,a,o){for(;n>=a;)n-=a,s+=t.values[o];return s},"")+r},xh=function(n,e,A,t){var i="";do A||n--,i=t(n)+i,n/=e;while(n*e>=e);return i},sA=function(n,e,A,t,i){var r=A-e+1;return(n<0?"-":"")+(xh(Math.abs(n),r,t,function(s){return aA(Math.floor(s%r)+e)})+i)},sn=function(n,e,A){A===void 0&&(A=". ");var t=e.length;return xh(Math.abs(n),t,!1,function(i){return e[Math.floor(i%t)]})+A},Jn=1,Ot=2,Nt=4,yi=8,Ct=function(n,e,A,t,i,r){if(n<-9999||n>9999)return Gi(n,4,i.length>0);var s=Math.abs(n),a=i;if(s===0)return e[0]+a;for(var o=0;s>0&&o<=4;o++){var l=s%10;l===0&&fA(r,Jn)&&a!==""?a=e[l]+a:l>1||l===1&&o===0||l===1&&o===1&&fA(r,Ot)||l===1&&o===1&&fA(r,Nt)&&n>100||l===1&&o>1&&fA(r,yi)?a=e[l]+(o>0?A[o-1]:"")+a:l===1&&o>0&&(a=A[o-1]+a),s=Math.floor(s/10)}return(n<0?t:"")+a},Nl="十百千萬",Gl="拾佰仟萬",Vl="マイナス",$s="마이너스",Gi=function(n,e,A){var t=A?". ":"",i=A?"、":"",r=A?", ":"",s=A?" ":"";switch(e){case 0:return"•"+s;case 1:return"◦"+s;case 2:return"◾"+s;case 5:var a=sA(n,48,57,!0,t);return a.length<4?"0"+a:a;case 4:return sn(n,"〇一二三四五六七八九",i);case 6:return Sn(n,1,3999,Pl,3,t).toLowerCase();case 7:return Sn(n,1,3999,Pl,3,t);case 8:return sA(n,945,969,!1,t);case 9:return sA(n,97,122,!1,t);case 10:return sA(n,65,90,!1,t);case 11:return sA(n,1632,1641,!0,t);case 12:case 49:return Sn(n,1,9999,Ol,3,t);case 35:return Sn(n,1,9999,Ol,3,t).toLowerCase();case 13:return sA(n,2534,2543,!0,t);case 14:case 30:return sA(n,6112,6121,!0,t);case 15:return sn(n,"子丑寅卯辰巳午未申酉戌亥",i);case 16:return sn(n,"甲乙丙丁戊己庚辛壬癸",i);case 17:case 48:return Ct(n,"零一二三四五六七八九",Nl,"負",i,Ot|Nt|yi);case 47:return Ct(n,"零壹貳參肆伍陸柒捌玖",Gl,"負",i,Jn|Ot|Nt|yi);case 42:return Ct(n,"零一二三四五六七八九",Nl,"负",i,Ot|Nt|yi);case 41:return Ct(n,"零壹贰叁肆伍陆柒捌玖",Gl,"负",i,Jn|Ot|Nt|yi);case 26:return Ct(n,"〇一二三四五六七八九","十百千万",Vl,i,0);case 25:return Ct(n,"零壱弐参四伍六七八九","拾百千万",Vl,i,Jn|Ot|Nt);case 31:return Ct(n,"영일이삼사오육칠팔구","십백천만",$s,r,Jn|Ot|Nt);case 33:return Ct(n,"零一二三四五六七八九","十百千萬",$s,r,0);case 32:return Ct(n,"零壹貳參四五六七八九","拾百千",$s,r,Jn|Ot|Nt);case 18:return sA(n,2406,2415,!0,t);case 20:return Sn(n,1,19999,sB,3,t);case 21:return sA(n,2790,2799,!0,t);case 22:return sA(n,2662,2671,!0,t);case 22:return Sn(n,1,10999,rB,3,t);case 23:return sn(n,"あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわゐゑをん");case 24:return sn(n,"いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせす");case 27:return sA(n,3302,3311,!0,t);case 28:return sn(n,"アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン",i);case 29:return sn(n,"イロハニホヘトチリヌルヲワカヨタレソツネナラムウヰノオクヤマケフコエテアサキユメミシヱヒモセス",i);case 34:return sA(n,3792,3801,!0,t);case 37:return sA(n,6160,6169,!0,t);case 38:return sA(n,4160,4169,!0,t);case 39:return sA(n,2918,2927,!0,t);case 40:return sA(n,1776,1785,!0,t);case 43:return sA(n,3046,3055,!0,t);case 44:return sA(n,3174,3183,!0,t);case 45:return sA(n,3664,3673,!0,t);case 46:return sA(n,3872,3881,!0,t);case 3:default:return sA(n,48,57,!0,t)}},Uh="data-html2canvas-ignore",kl=function(){function n(e,A,t){if(this.context=e,this.options=t,this.scrolledElements=[],this.referenceElement=A,this.counters=new iB,this.quoteDepth=0,!A.ownerDocument)throw new Error("Cloned element does not have an owner document");this.documentElement=this.cloneNode(A.ownerDocument.documentElement,!1)}return n.prototype.toIFrame=function(e,A){var t=this,i=aB(e,A);if(!i.contentWindow)return Promise.reject("Unable to find iframe window");var r=e.defaultView.pageXOffset,s=e.defaultView.pageYOffset,a=i.contentWindow,o=a.document,l=cB(i).then(function(){return RA(t,void 0,void 0,function(){var c,u;return MA(this,function(h){switch(h.label){case 0:return this.scrolledElements.forEach(dB),a&&(a.scrollTo(A.left,A.top),/(iPad|iPhone|iPod)/g.test(navigator.userAgent)&&(a.scrollY!==A.top||a.scrollX!==A.left)&&(this.context.logger.warn("Unable to restore scroll position for cloned document"),this.context.windowBounds=this.context.windowBounds.add(a.scrollX-A.left,a.scrollY-A.top,0,0))),c=this.options.onclone,u=this.clonedReferenceElement,typeof u>"u"?[2,Promise.reject("Error finding the "+this.referenceElement.nodeName+" in the cloned document")]:o.fonts&&o.fonts.ready?[4,o.fonts.ready]:[3,2];case 1:h.sent(),h.label=2;case 2:return/(AppleWebKit)/g.test(navigator.userAgent)?[4,lB(o)]:[3,4];case 3:h.sent(),h.label=4;case 4:return typeof c=="function"?[2,Promise.resolve().then(function(){return c(o,u)}).then(function(){return i})]:[2,i]}})})});return o.open(),o.write(hB(document.doctype)+"<html></html>"),fB(this.referenceElement.ownerDocument,r,s),o.replaceChild(o.adoptNode(this.documentElement),o.documentElement),o.close(),l},n.prototype.createElementClone=function(e){if(Ao(e,2))debugger;if(vh(e))return this.createCanvasClone(e);if(Rl(e))return this.createVideoClone(e);if(Dl(e))return this.createStyleClone(e);var A=e.cloneNode(!1);return ro(A)&&(ro(e)&&e.currentSrc&&e.currentSrc!==e.src&&(A.src=e.currentSrc,A.srcset=""),A.loading==="lazy"&&(A.loading="eager")),Hl(A)?this.createCustomElementClone(A):A},n.prototype.createCustomElementClone=function(e){var A=document.createElement("html2canvascustomelement");return ea(e.style,A),A},n.prototype.createStyleClone=function(e){try{var A=e.sheet;if(A&&A.cssRules){var t=[].slice.call(A.cssRules,0).reduce(function(r,s){return s&&typeof s.cssText=="string"?r+s.cssText:r},""),i=e.cloneNode(!1);return i.textContent=t,i}}catch(r){if(this.context.logger.error("Unable to access cssRules property",r),r.name!=="SecurityError")throw r}return e.cloneNode(!1)},n.prototype.createCanvasClone=function(e){var A;if(this.options.inlineImages&&e.ownerDocument){var t=e.ownerDocument.createElement("img");try{return t.src=e.toDataURL(),t}catch{this.context.logger.info("Unable to inline canvas contents, canvas is tainted",e)}}var i=e.cloneNode(!1);try{i.width=e.width,i.height=e.height;var r=e.getContext("2d"),s=i.getContext("2d");if(s)if(!this.options.allowTaint&&r)s.putImageData(r.getImageData(0,0,e.width,e.height),0,0);else{var a=(A=e.getContext("webgl2"))!==null&&A!==void 0?A:e.getContext("webgl");if(a){var o=a.getContextAttributes();o?.preserveDrawingBuffer===!1&&this.context.logger.warn("Unable to clone WebGL context as it has preserveDrawingBuffer=false",e)}s.drawImage(e,0,0)}return i}catch{this.context.logger.info("Unable to clone canvas as it is tainted",e)}return i},n.prototype.createVideoClone=function(e){var A=e.ownerDocument.createElement("canvas");A.width=e.offsetWidth,A.height=e.offsetHeight;var t=A.getContext("2d");try{return t&&(t.drawImage(e,0,0,A.width,A.height),this.options.allowTaint||t.getImageData(0,0,A.width,A.height)),A}catch{this.context.logger.info("Unable to clone video as it is tainted",e)}var i=e.ownerDocument.createElement("canvas");return i.width=e.offsetWidth,i.height=e.offsetHeight,i},n.prototype.appendChildNode=function(e,A,t){(!jn(A)||!nB(A)&&!A.hasAttribute(Uh)&&(typeof this.options.ignoreElements!="function"||!this.options.ignoreElements(A)))&&(!this.options.copyStyles||!jn(A)||!Dl(A))&&e.appendChild(this.cloneNode(A,t))},n.prototype.cloneChildNodes=function(e,A,t){for(var i=this,r=e.shadowRoot?e.shadowRoot.firstChild:e.firstChild;r;r=r.nextSibling)if(jn(r)&&Ch(r)&&typeof r.assignedNodes=="function"){var s=r.assignedNodes();s.length&&s.forEach(function(a){return i.appendChildNode(A,a,t)})}else this.appendChildNode(A,r,t)},n.prototype.cloneNode=function(e,A){if(_h(e))return document.createTextNode(e.data);if(!e.ownerDocument)return e.cloneNode(!1);var t=e.ownerDocument.defaultView;if(t&&jn(e)&&(io(e)||Jr(e))){var i=this.createElementClone(e);i.style.transitionProperty="none";var r=t.getComputedStyle(e),s=t.getComputedStyle(e,":before"),a=t.getComputedStyle(e,":after");this.referenceElement===e&&io(i)&&(this.clonedReferenceElement=i),Mo(i)&&mB(i);var o=this.counters.parse(new wl(this.context,r)),l=this.resolvePseudoContent(e,i,s,Ii.BEFORE);Hl(e)&&(A=!0),Rl(e)||this.cloneChildNodes(e,i,A),l&&i.insertBefore(l,i.firstChild);var c=this.resolvePseudoContent(e,i,a,Ii.AFTER);return c&&i.appendChild(c),this.counters.pop(o),(r&&(this.options.copyStyles||Jr(e))&&!Eh(e)||A)&&ea(r,i),(e.scrollTop!==0||e.scrollLeft!==0)&&this.scrolledElements.push([i,e.scrollLeft,e.scrollTop]),(ts(e)||ns(e))&&(ts(i)||ns(i))&&(i.value=e.value),i}return e.cloneNode(!1)},n.prototype.resolvePseudoContent=function(e,A,t,i){var r=this;if(t){var s=t.content,a=A.ownerDocument;if(!(!a||!s||s==="none"||s==="-moz-alt-content"||t.display==="none")){this.counters.parse(new wl(this.context,t));var o=new $g(this.context,t),l=a.createElement("html2canvaspseudoelement");ea(t,l),o.content.forEach(function(u){if(u.type===0)l.appendChild(a.createTextNode(u.value));else if(u.type===22){var h=a.createElement("img");h.src=u.value,h.style.opacity="1",l.appendChild(h)}else if(u.type===18){if(u.name==="attr"){var p=u.values.filter(Ze);p.length&&l.appendChild(a.createTextNode(e.getAttribute(p[0].value)||""))}else if(u.name==="counter"){var g=u.values.filter(ni),m=g[0],d=g[1];if(m&&Ze(m)){var f=r.counters.getCounterValue(m.value),v=d&&Ze(d)?eo.parse(r.context,d.value):3;l.appendChild(a.createTextNode(Gi(f,v,!1)))}}else if(u.name==="counters"){var B=u.values.filter(ni),m=B[0],y=B[1],d=B[2];if(m&&Ze(m)){var C=r.counters.getCounterValues(m.value),x=d&&Ze(d)?eo.parse(r.context,d.value):3,S=y&&y.type===0?y.value:"",R=C.map(function(G){return Gi(G,x,!1)}).join(S);l.appendChild(a.createTextNode(R))}}}else if(u.type===20)switch(u.value){case"open-quote":l.appendChild(a.createTextNode(_l(o.quotes,r.quoteDepth++,!0)));break;case"close-quote":l.appendChild(a.createTextNode(_l(o.quotes,--r.quoteDepth,!1)));break;default:l.appendChild(a.createTextNode(u.value))}}),l.className=so+" "+ao;var c=i===Ii.BEFORE?" "+so:" "+ao;return Jr(A)?A.className.baseValue+=c:A.className+=c,l}}},n.destroy=function(e){return e.parentNode?(e.parentNode.removeChild(e),!0):!1},n}(),Ii;(function(n){n[n.BEFORE=0]="BEFORE",n[n.AFTER=1]="AFTER"})(Ii||(Ii={}));var aB=function(n,e){var A=n.createElement("iframe");return A.className="html2canvas-container",A.style.visibility="hidden",A.style.position="fixed",A.style.left="-10000px",A.style.top="0px",A.style.border="0",A.width=e.width.toString(),A.height=e.height.toString(),A.scrolling="no",A.setAttribute(Uh,"true"),n.body.appendChild(A),A},oB=function(n){return new Promise(function(e){if(n.complete){e();return}if(!n.src){e();return}n.onload=e,n.onerror=e})},lB=function(n){return Promise.all([].slice.call(n.images,0).map(oB))},cB=function(n){return new Promise(function(e,A){var t=n.contentWindow;if(!t)return A("No window assigned for iframe");var i=t.document;t.onload=n.onload=function(){t.onload=n.onload=null;var r=setInterval(function(){i.body.childNodes.length>0&&i.readyState==="complete"&&(clearInterval(r),e(n))},50)}})},uB=["all","d","content"],ea=function(n,e){for(var A=n.length-1;A>=0;A--){var t=n.item(A);uB.indexOf(t)===-1&&e.style.setProperty(t,n.getPropertyValue(t))}return e},hB=function(n){var e="";return n&&(e+="<!DOCTYPE ",n.name&&(e+=n.name),n.internalSubset&&(e+=n.internalSubset),n.publicId&&(e+='"'+n.publicId+'"'),n.systemId&&(e+='"'+n.systemId+'"'),e+=">"),e},fB=function(n,e,A){n&&n.defaultView&&(e!==n.defaultView.pageXOffset||A!==n.defaultView.pageYOffset)&&n.defaultView.scrollTo(e,A)},dB=function(n){var e=n[0],A=n[1],t=n[2];e.scrollLeft=A,e.scrollTop=t},pB=":before",gB=":after",so="___html2canvas___pseudoelement_before",ao="___html2canvas___pseudoelement_after",Kl=`{
    content: "" !important;
    display: none !important;
}`,mB=function(n){BB(n,"."+so+pB+Kl+`
         .`+ao+gB+Kl)},BB=function(n,e){var A=n.ownerDocument;if(A){var t=A.createElement("style");t.textContent=e,n.appendChild(t)}},yh=function(){function n(){}return n.getOrigin=function(e){var A=n._link;return A?(A.href=e,A.href=A.href,A.protocol+A.hostname+A.port):"about:blank"},n.isSameOrigin=function(e){return n.getOrigin(e)===n._origin},n.setContext=function(e){n._link=e.document.createElement("a"),n._origin=n.getOrigin(e.location.href)},n._origin="about:blank",n}(),_B=function(){function n(e,A){this.context=e,this._options=A,this._cache={}}return n.prototype.addImage=function(e){var A=Promise.resolve();return this.has(e)||(ta(e)||CB(e))&&(this._cache[e]=this.loadImage(e)).catch(function(){}),A},n.prototype.match=function(e){return this._cache[e]},n.prototype.loadImage=function(e){return RA(this,void 0,void 0,function(){var A,t,i,r,s=this;return MA(this,function(a){switch(a.label){case 0:return A=yh.isSameOrigin(e),t=!Aa(e)&&this._options.useCORS===!0&&vA.SUPPORT_CORS_IMAGES&&!A,i=!Aa(e)&&!A&&!ta(e)&&typeof this._options.proxy=="string"&&vA.SUPPORT_CORS_XHR&&!t,!A&&this._options.allowTaint===!1&&!Aa(e)&&!ta(e)&&!i&&!t?[2]:(r=e,i?[4,this.proxy(r)]:[3,2]);case 1:r=a.sent(),a.label=2;case 2:return this.context.logger.debug("Added image "+e.substring(0,256)),[4,new Promise(function(o,l){var c=new Image;c.onload=function(){return o(c)},c.onerror=l,(xB(r)||t)&&(c.crossOrigin="anonymous"),c.src=r,c.complete===!0&&setTimeout(function(){return o(c)},500),s._options.imageTimeout>0&&setTimeout(function(){return l("Timed out ("+s._options.imageTimeout+"ms) loading image")},s._options.imageTimeout)})];case 3:return[2,a.sent()]}})})},n.prototype.has=function(e){return typeof this._cache[e]<"u"},n.prototype.keys=function(){return Promise.resolve(Object.keys(this._cache))},n.prototype.proxy=function(e){var A=this,t=this._options.proxy;if(!t)throw new Error("No proxy defined");var i=e.substring(0,256);return new Promise(function(r,s){var a=vA.SUPPORT_RESPONSE_TYPE?"blob":"text",o=new XMLHttpRequest;o.onload=function(){if(o.status===200)if(a==="text")r(o.response);else{var u=new FileReader;u.addEventListener("load",function(){return r(u.result)},!1),u.addEventListener("error",function(h){return s(h)},!1),u.readAsDataURL(o.response)}else s("Failed to proxy resource "+i+" with status code "+o.status)},o.onerror=s;var l=t.indexOf("?")>-1?"&":"?";if(o.open("GET",""+t+l+"url="+encodeURIComponent(e)+"&responseType="+a),a!=="text"&&o instanceof XMLHttpRequest&&(o.responseType=a),A._options.imageTimeout){var c=A._options.imageTimeout;o.timeout=c,o.ontimeout=function(){return s("Timed out ("+c+"ms) proxying "+i)}}o.send()})},n}(),wB=/^data:image\/svg\+xml/i,vB=/^data:image\/.*;base64,/i,EB=/^data:image\/.*/i,CB=function(n){return vA.SUPPORT_SVG_DRAWING||!UB(n)},Aa=function(n){return EB.test(n)},xB=function(n){return vB.test(n)},ta=function(n){return n.substr(0,4)==="blob"},UB=function(n){return n.substr(-3).toLowerCase()==="svg"||wB.test(n)},fe=function(){function n(e,A){this.type=0,this.x=e,this.y=A}return n.prototype.add=function(e,A){return new n(this.x+e,this.y+A)},n}(),Mn=function(n,e,A){return new fe(n.x+(e.x-n.x)*A,n.y+(e.y-n.y)*A)},Br=function(){function n(e,A,t,i){this.type=1,this.start=e,this.startControl=A,this.endControl=t,this.end=i}return n.prototype.subdivide=function(e,A){var t=Mn(this.start,this.startControl,e),i=Mn(this.startControl,this.endControl,e),r=Mn(this.endControl,this.end,e),s=Mn(t,i,e),a=Mn(i,r,e),o=Mn(s,a,e);return A?new n(this.start,t,s,o):new n(o,a,r,this.end)},n.prototype.add=function(e,A){return new n(this.start.add(e,A),this.startControl.add(e,A),this.endControl.add(e,A),this.end.add(e,A))},n.prototype.reverse=function(){return new n(this.end,this.endControl,this.startControl,this.start)},n}(),qA=function(n){return n.type===1},yB=function(){function n(e){var A=e.styles,t=e.bounds,i=xi(A.borderTopLeftRadius,t.width,t.height),r=i[0],s=i[1],a=xi(A.borderTopRightRadius,t.width,t.height),o=a[0],l=a[1],c=xi(A.borderBottomRightRadius,t.width,t.height),u=c[0],h=c[1],p=xi(A.borderBottomLeftRadius,t.width,t.height),g=p[0],m=p[1],d=[];d.push((r+o)/t.width),d.push((g+u)/t.width),d.push((s+m)/t.height),d.push((l+h)/t.height);var f=Math.max.apply(Math,d);f>1&&(r/=f,s/=f,o/=f,l/=f,u/=f,h/=f,g/=f,m/=f);var v=t.width-o,B=t.height-h,y=t.width-u,C=t.height-m,x=A.borderTopWidth,S=A.borderRightWidth,R=A.borderBottomWidth,_=A.borderLeftWidth,M=$e(A.paddingTop,e.bounds.width),G=$e(A.paddingRight,e.bounds.width),Z=$e(A.paddingBottom,e.bounds.width),Y=$e(A.paddingLeft,e.bounds.width);this.topLeftBorderDoubleOuterBox=r>0||s>0?nA(t.left+_/3,t.top+x/3,r-_/3,s-x/3,Je.TOP_LEFT):new fe(t.left+_/3,t.top+x/3),this.topRightBorderDoubleOuterBox=r>0||s>0?nA(t.left+v,t.top+x/3,o-S/3,l-x/3,Je.TOP_RIGHT):new fe(t.left+t.width-S/3,t.top+x/3),this.bottomRightBorderDoubleOuterBox=u>0||h>0?nA(t.left+y,t.top+B,u-S/3,h-R/3,Je.BOTTOM_RIGHT):new fe(t.left+t.width-S/3,t.top+t.height-R/3),this.bottomLeftBorderDoubleOuterBox=g>0||m>0?nA(t.left+_/3,t.top+C,g-_/3,m-R/3,Je.BOTTOM_LEFT):new fe(t.left+_/3,t.top+t.height-R/3),this.topLeftBorderDoubleInnerBox=r>0||s>0?nA(t.left+_*2/3,t.top+x*2/3,r-_*2/3,s-x*2/3,Je.TOP_LEFT):new fe(t.left+_*2/3,t.top+x*2/3),this.topRightBorderDoubleInnerBox=r>0||s>0?nA(t.left+v,t.top+x*2/3,o-S*2/3,l-x*2/3,Je.TOP_RIGHT):new fe(t.left+t.width-S*2/3,t.top+x*2/3),this.bottomRightBorderDoubleInnerBox=u>0||h>0?nA(t.left+y,t.top+B,u-S*2/3,h-R*2/3,Je.BOTTOM_RIGHT):new fe(t.left+t.width-S*2/3,t.top+t.height-R*2/3),this.bottomLeftBorderDoubleInnerBox=g>0||m>0?nA(t.left+_*2/3,t.top+C,g-_*2/3,m-R*2/3,Je.BOTTOM_LEFT):new fe(t.left+_*2/3,t.top+t.height-R*2/3),this.topLeftBorderStroke=r>0||s>0?nA(t.left+_/2,t.top+x/2,r-_/2,s-x/2,Je.TOP_LEFT):new fe(t.left+_/2,t.top+x/2),this.topRightBorderStroke=r>0||s>0?nA(t.left+v,t.top+x/2,o-S/2,l-x/2,Je.TOP_RIGHT):new fe(t.left+t.width-S/2,t.top+x/2),this.bottomRightBorderStroke=u>0||h>0?nA(t.left+y,t.top+B,u-S/2,h-R/2,Je.BOTTOM_RIGHT):new fe(t.left+t.width-S/2,t.top+t.height-R/2),this.bottomLeftBorderStroke=g>0||m>0?nA(t.left+_/2,t.top+C,g-_/2,m-R/2,Je.BOTTOM_LEFT):new fe(t.left+_/2,t.top+t.height-R/2),this.topLeftBorderBox=r>0||s>0?nA(t.left,t.top,r,s,Je.TOP_LEFT):new fe(t.left,t.top),this.topRightBorderBox=o>0||l>0?nA(t.left+v,t.top,o,l,Je.TOP_RIGHT):new fe(t.left+t.width,t.top),this.bottomRightBorderBox=u>0||h>0?nA(t.left+y,t.top+B,u,h,Je.BOTTOM_RIGHT):new fe(t.left+t.width,t.top+t.height),this.bottomLeftBorderBox=g>0||m>0?nA(t.left,t.top+C,g,m,Je.BOTTOM_LEFT):new fe(t.left,t.top+t.height),this.topLeftPaddingBox=r>0||s>0?nA(t.left+_,t.top+x,Math.max(0,r-_),Math.max(0,s-x),Je.TOP_LEFT):new fe(t.left+_,t.top+x),this.topRightPaddingBox=o>0||l>0?nA(t.left+Math.min(v,t.width-S),t.top+x,v>t.width+S?0:Math.max(0,o-S),Math.max(0,l-x),Je.TOP_RIGHT):new fe(t.left+t.width-S,t.top+x),this.bottomRightPaddingBox=u>0||h>0?nA(t.left+Math.min(y,t.width-_),t.top+Math.min(B,t.height-R),Math.max(0,u-S),Math.max(0,h-R),Je.BOTTOM_RIGHT):new fe(t.left+t.width-S,t.top+t.height-R),this.bottomLeftPaddingBox=g>0||m>0?nA(t.left+_,t.top+Math.min(C,t.height-R),Math.max(0,g-_),Math.max(0,m-R),Je.BOTTOM_LEFT):new fe(t.left+_,t.top+t.height-R),this.topLeftContentBox=r>0||s>0?nA(t.left+_+Y,t.top+x+M,Math.max(0,r-(_+Y)),Math.max(0,s-(x+M)),Je.TOP_LEFT):new fe(t.left+_+Y,t.top+x+M),this.topRightContentBox=o>0||l>0?nA(t.left+Math.min(v,t.width+_+Y),t.top+x+M,v>t.width+_+Y?0:o-_+Y,l-(x+M),Je.TOP_RIGHT):new fe(t.left+t.width-(S+G),t.top+x+M),this.bottomRightContentBox=u>0||h>0?nA(t.left+Math.min(y,t.width-(_+Y)),t.top+Math.min(B,t.height+x+M),Math.max(0,u-(S+G)),h-(R+Z),Je.BOTTOM_RIGHT):new fe(t.left+t.width-(S+G),t.top+t.height-(R+Z)),this.bottomLeftContentBox=g>0||m>0?nA(t.left+_+Y,t.top+C,Math.max(0,g-(_+Y)),m-(R+Z),Je.BOTTOM_LEFT):new fe(t.left+_+Y,t.top+t.height-(R+Z))}return n}(),Je;(function(n){n[n.TOP_LEFT=0]="TOP_LEFT",n[n.TOP_RIGHT=1]="TOP_RIGHT",n[n.BOTTOM_RIGHT=2]="BOTTOM_RIGHT",n[n.BOTTOM_LEFT=3]="BOTTOM_LEFT"})(Je||(Je={}));var nA=function(n,e,A,t,i){var r=4*((Math.sqrt(2)-1)/3),s=A*r,a=t*r,o=n+A,l=e+t;switch(i){case Je.TOP_LEFT:return new Br(new fe(n,l),new fe(n,l-a),new fe(o-s,e),new fe(o,e));case Je.TOP_RIGHT:return new Br(new fe(n,e),new fe(n+s,e),new fe(o,l-a),new fe(o,l));case Je.BOTTOM_RIGHT:return new Br(new fe(o,e),new fe(o,e+a),new fe(n+s,l),new fe(n,l));case Je.BOTTOM_LEFT:default:return new Br(new fe(o,l),new fe(o-s,l),new fe(n,e+a),new fe(n,e))}},is=function(n){return[n.topLeftBorderBox,n.topRightBorderBox,n.bottomRightBorderBox,n.bottomLeftBorderBox]},SB=function(n){return[n.topLeftContentBox,n.topRightContentBox,n.bottomRightContentBox,n.bottomLeftContentBox]},rs=function(n){return[n.topLeftPaddingBox,n.topRightPaddingBox,n.bottomRightPaddingBox,n.bottomLeftPaddingBox]},MB=function(){function n(e,A,t){this.offsetX=e,this.offsetY=A,this.matrix=t,this.type=0,this.target=6}return n}(),_r=function(){function n(e,A){this.path=e,this.target=A,this.type=1}return n}(),FB=function(){function n(e){this.opacity=e,this.type=2,this.target=6}return n}(),bB=function(n){return n.type===0},Sh=function(n){return n.type===1},TB=function(n){return n.type===2},zl=function(n,e){return n.length===e.length?n.some(function(A,t){return A===e[t]}):!1},QB=function(n,e,A,t,i){return n.map(function(r,s){switch(s){case 0:return r.add(e,A);case 1:return r.add(e+t,A);case 2:return r.add(e+t,A+i);case 3:return r.add(e,A+i)}return r})},Mh=function(){function n(e){this.element=e,this.inlineLevel=[],this.nonInlineLevel=[],this.negativeZIndex=[],this.zeroOrAutoZIndexOrTransformedOrOpacity=[],this.positiveZIndex=[],this.nonPositionedFloats=[],this.nonPositionedInlineLevel=[]}return n}(),Fh=function(){function n(e,A){if(this.container=e,this.parent=A,this.effects=[],this.curves=new yB(this.container),this.container.styles.opacity<1&&this.effects.push(new FB(this.container.styles.opacity)),this.container.styles.transform!==null){var t=this.container.bounds.left+this.container.styles.transformOrigin[0].number,i=this.container.bounds.top+this.container.styles.transformOrigin[1].number,r=this.container.styles.transform;this.effects.push(new MB(t,i,r))}if(this.container.styles.overflowX!==0){var s=is(this.curves),a=rs(this.curves);zl(s,a)?this.effects.push(new _r(s,6)):(this.effects.push(new _r(s,2)),this.effects.push(new _r(a,4)))}}return n.prototype.getEffects=function(e){for(var A=[2,3].indexOf(this.container.styles.position)===-1,t=this.parent,i=this.effects.slice(0);t;){var r=t.effects.filter(function(o){return!Sh(o)});if(A||t.container.styles.position!==0||!t.parent){if(i.unshift.apply(i,r),A=[2,3].indexOf(t.container.styles.position)===-1,t.container.styles.overflowX!==0){var s=is(t.curves),a=rs(t.curves);zl(s,a)||i.unshift(new _r(a,6))}}else i.unshift.apply(i,r);t=t.parent}return i.filter(function(o){return fA(o.target,e)})},n}(),oo=function(n,e,A,t){n.container.elements.forEach(function(i){var r=fA(i.flags,4),s=fA(i.flags,2),a=new Fh(i,n);fA(i.styles.display,2048)&&t.push(a);var o=fA(i.flags,8)?[]:t;if(r||s){var l=r||i.styles.isPositioned()?A:e,c=new Mh(a);if(i.styles.isPositioned()||i.styles.opacity<1||i.styles.isTransformed()){var u=i.styles.zIndex.order;if(u<0){var h=0;l.negativeZIndex.some(function(g,m){return u>g.element.container.styles.zIndex.order?(h=m,!1):h>0}),l.negativeZIndex.splice(h,0,c)}else if(u>0){var p=0;l.positiveZIndex.some(function(g,m){return u>=g.element.container.styles.zIndex.order?(p=m+1,!1):p>0}),l.positiveZIndex.splice(p,0,c)}else l.zeroOrAutoZIndexOrTransformedOrOpacity.push(c)}else i.styles.isFloating()?l.nonPositionedFloats.push(c):l.nonPositionedInlineLevel.push(c);oo(a,c,r?c:A,o)}else i.styles.isInlineLevel()?e.inlineLevel.push(a):e.nonInlineLevel.push(a),oo(a,e,A,o);fA(i.flags,8)&&bh(i,o)})},bh=function(n,e){for(var A=n instanceof no?n.start:1,t=n instanceof no?n.reversed:!1,i=0;i<e.length;i++){var r=e[i];r.container instanceof fh&&typeof r.container.value=="number"&&r.container.value!==0&&(A=r.container.value),r.listValue=Gi(A,r.container.styles.listStyleType,!0),A+=t?-1:1}},IB=function(n){var e=new Fh(n,null),A=new Mh(e),t=[];return oo(e,A,A,t),bh(e.container,t),A},Wl=function(n,e){switch(e){case 0:return At(n.topLeftBorderBox,n.topLeftPaddingBox,n.topRightBorderBox,n.topRightPaddingBox);case 1:return At(n.topRightBorderBox,n.topRightPaddingBox,n.bottomRightBorderBox,n.bottomRightPaddingBox);case 2:return At(n.bottomRightBorderBox,n.bottomRightPaddingBox,n.bottomLeftBorderBox,n.bottomLeftPaddingBox);case 3:default:return At(n.bottomLeftBorderBox,n.bottomLeftPaddingBox,n.topLeftBorderBox,n.topLeftPaddingBox)}},LB=function(n,e){switch(e){case 0:return At(n.topLeftBorderBox,n.topLeftBorderDoubleOuterBox,n.topRightBorderBox,n.topRightBorderDoubleOuterBox);case 1:return At(n.topRightBorderBox,n.topRightBorderDoubleOuterBox,n.bottomRightBorderBox,n.bottomRightBorderDoubleOuterBox);case 2:return At(n.bottomRightBorderBox,n.bottomRightBorderDoubleOuterBox,n.bottomLeftBorderBox,n.bottomLeftBorderDoubleOuterBox);case 3:default:return At(n.bottomLeftBorderBox,n.bottomLeftBorderDoubleOuterBox,n.topLeftBorderBox,n.topLeftBorderDoubleOuterBox)}},RB=function(n,e){switch(e){case 0:return At(n.topLeftBorderDoubleInnerBox,n.topLeftPaddingBox,n.topRightBorderDoubleInnerBox,n.topRightPaddingBox);case 1:return At(n.topRightBorderDoubleInnerBox,n.topRightPaddingBox,n.bottomRightBorderDoubleInnerBox,n.bottomRightPaddingBox);case 2:return At(n.bottomRightBorderDoubleInnerBox,n.bottomRightPaddingBox,n.bottomLeftBorderDoubleInnerBox,n.bottomLeftPaddingBox);case 3:default:return At(n.bottomLeftBorderDoubleInnerBox,n.bottomLeftPaddingBox,n.topLeftBorderDoubleInnerBox,n.topLeftPaddingBox)}},DB=function(n,e){switch(e){case 0:return wr(n.topLeftBorderStroke,n.topRightBorderStroke);case 1:return wr(n.topRightBorderStroke,n.bottomRightBorderStroke);case 2:return wr(n.bottomRightBorderStroke,n.bottomLeftBorderStroke);case 3:default:return wr(n.bottomLeftBorderStroke,n.topLeftBorderStroke)}},wr=function(n,e){var A=[];return qA(n)?A.push(n.subdivide(.5,!1)):A.push(n),qA(e)?A.push(e.subdivide(.5,!0)):A.push(e),A},At=function(n,e,A,t){var i=[];return qA(n)?i.push(n.subdivide(.5,!1)):i.push(n),qA(A)?i.push(A.subdivide(.5,!0)):i.push(A),qA(t)?i.push(t.subdivide(.5,!0).reverse()):i.push(t),qA(e)?i.push(e.subdivide(.5,!1).reverse()):i.push(e),i},Th=function(n){var e=n.bounds,A=n.styles;return e.add(A.borderLeftWidth,A.borderTopWidth,-(A.borderRightWidth+A.borderLeftWidth),-(A.borderTopWidth+A.borderBottomWidth))},ss=function(n){var e=n.styles,A=n.bounds,t=$e(e.paddingLeft,A.width),i=$e(e.paddingRight,A.width),r=$e(e.paddingTop,A.width),s=$e(e.paddingBottom,A.width);return A.add(t+e.borderLeftWidth,r+e.borderTopWidth,-(e.borderRightWidth+e.borderLeftWidth+t+i),-(e.borderTopWidth+e.borderBottomWidth+r+s))},HB=function(n,e){return n===0?e.bounds:n===2?ss(e):Th(e)},PB=function(n,e){return n===0?e.bounds:n===2?ss(e):Th(e)},na=function(n,e,A){var t=HB(qn(n.styles.backgroundOrigin,e),n),i=PB(qn(n.styles.backgroundClip,e),n),r=OB(qn(n.styles.backgroundSize,e),A,t),s=r[0],a=r[1],o=xi(qn(n.styles.backgroundPosition,e),t.width-s,t.height-a),l=NB(qn(n.styles.backgroundRepeat,e),o,r,t,i),c=Math.round(t.left+o[0]),u=Math.round(t.top+o[1]);return[l,c,u,s,a]},Fn=function(n){return Ze(n)&&n.value===ei.AUTO},vr=function(n){return typeof n=="number"},OB=function(n,e,A){var t=e[0],i=e[1],r=e[2],s=n[0],a=n[1];if(!s)return[0,0];if(hA(s)&&a&&hA(a))return[$e(s,A.width),$e(a,A.height)];var o=vr(r);if(Ze(s)&&(s.value===ei.CONTAIN||s.value===ei.COVER)){if(vr(r)){var l=A.width/A.height;return l<r!=(s.value===ei.COVER)?[A.width,A.width/r]:[A.height*r,A.height]}return[A.width,A.height]}var c=vr(t),u=vr(i),h=c||u;if(Fn(s)&&(!a||Fn(a))){if(c&&u)return[t,i];if(!o&&!h)return[A.width,A.height];if(h&&o){var p=c?t:i*r,g=u?i:t/r;return[p,g]}var m=c?t:A.width,d=u?i:A.height;return[m,d]}if(o){var f=0,v=0;return hA(s)?f=$e(s,A.width):hA(a)&&(v=$e(a,A.height)),Fn(s)?f=v*r:(!a||Fn(a))&&(v=f/r),[f,v]}var B=null,y=null;if(hA(s)?B=$e(s,A.width):a&&hA(a)&&(y=$e(a,A.height)),B!==null&&(!a||Fn(a))&&(y=c&&u?B/t*i:A.height),y!==null&&Fn(s)&&(B=c&&u?y/i*t:A.width),B!==null&&y!==null)return[B,y];throw new Error("Unable to calculate background-size for element")},qn=function(n,e){var A=n[e];return typeof A>"u"?n[0]:A},NB=function(n,e,A,t,i){var r=e[0],s=e[1],a=A[0],o=A[1];switch(n){case 2:return[new fe(Math.round(t.left),Math.round(t.top+s)),new fe(Math.round(t.left+t.width),Math.round(t.top+s)),new fe(Math.round(t.left+t.width),Math.round(o+t.top+s)),new fe(Math.round(t.left),Math.round(o+t.top+s))];case 3:return[new fe(Math.round(t.left+r),Math.round(t.top)),new fe(Math.round(t.left+r+a),Math.round(t.top)),new fe(Math.round(t.left+r+a),Math.round(t.height+t.top)),new fe(Math.round(t.left+r),Math.round(t.height+t.top))];case 1:return[new fe(Math.round(t.left+r),Math.round(t.top+s)),new fe(Math.round(t.left+r+a),Math.round(t.top+s)),new fe(Math.round(t.left+r+a),Math.round(t.top+s+o)),new fe(Math.round(t.left+r),Math.round(t.top+s+o))];default:return[new fe(Math.round(i.left),Math.round(i.top)),new fe(Math.round(i.left+i.width),Math.round(i.top)),new fe(Math.round(i.left+i.width),Math.round(i.height+i.top)),new fe(Math.round(i.left),Math.round(i.height+i.top))]}},GB="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",Xl="Hidden Text",VB=function(){function n(e){this._data={},this._document=e}return n.prototype.parseMetrics=function(e,A){var t=this._document.createElement("div"),i=this._document.createElement("img"),r=this._document.createElement("span"),s=this._document.body;t.style.visibility="hidden",t.style.fontFamily=e,t.style.fontSize=A,t.style.margin="0",t.style.padding="0",t.style.whiteSpace="nowrap",s.appendChild(t),i.src=GB,i.width=1,i.height=1,i.style.margin="0",i.style.padding="0",i.style.verticalAlign="baseline",r.style.fontFamily=e,r.style.fontSize=A,r.style.margin="0",r.style.padding="0",r.appendChild(this._document.createTextNode(Xl)),t.appendChild(r),t.appendChild(i);var a=i.offsetTop-r.offsetTop+2;t.removeChild(r),t.appendChild(this._document.createTextNode(Xl)),t.style.lineHeight="normal",i.style.verticalAlign="super";var o=i.offsetTop-t.offsetTop+2;return s.removeChild(t),{baseline:a,middle:o}},n.prototype.getMetrics=function(e,A){var t=e+" "+A;return typeof this._data[t]>"u"&&(this._data[t]=this.parseMetrics(e,A)),this._data[t]},n}(),Qh=function(){function n(e,A){this.context=e,this.options=A}return n}(),kB=1e4,KB=function(n){ct(e,n);function e(A,t){var i=n.call(this,A,t)||this;return i._activeEffects=[],i.canvas=t.canvas?t.canvas:document.createElement("canvas"),i.ctx=i.canvas.getContext("2d"),t.canvas||(i.canvas.width=Math.floor(t.width*t.scale),i.canvas.height=Math.floor(t.height*t.scale),i.canvas.style.width=t.width+"px",i.canvas.style.height=t.height+"px"),i.fontMetrics=new VB(document),i.ctx.scale(i.options.scale,i.options.scale),i.ctx.translate(-t.x,-t.y),i.ctx.textBaseline="bottom",i._activeEffects=[],i.context.logger.debug("Canvas renderer initialized ("+t.width+"x"+t.height+") with scale "+t.scale),i}return e.prototype.applyEffects=function(A){for(var t=this;this._activeEffects.length;)this.popEffect();A.forEach(function(i){return t.applyEffect(i)})},e.prototype.applyEffect=function(A){this.ctx.save(),TB(A)&&(this.ctx.globalAlpha=A.opacity),bB(A)&&(this.ctx.translate(A.offsetX,A.offsetY),this.ctx.transform(A.matrix[0],A.matrix[1],A.matrix[2],A.matrix[3],A.matrix[4],A.matrix[5]),this.ctx.translate(-A.offsetX,-A.offsetY)),Sh(A)&&(this.path(A.path),this.ctx.clip()),this._activeEffects.push(A)},e.prototype.popEffect=function(){this._activeEffects.pop(),this.ctx.restore()},e.prototype.renderStack=function(A){return RA(this,void 0,void 0,function(){var t;return MA(this,function(i){switch(i.label){case 0:return t=A.element.container.styles,t.isVisible()?[4,this.renderStackContent(A)]:[3,2];case 1:i.sent(),i.label=2;case 2:return[2]}})})},e.prototype.renderNode=function(A){return RA(this,void 0,void 0,function(){return MA(this,function(t){switch(t.label){case 0:if(fA(A.container.flags,16))debugger;return A.container.styles.isVisible()?[4,this.renderNodeBackgroundAndBorders(A)]:[3,3];case 1:return t.sent(),[4,this.renderNodeContent(A)];case 2:t.sent(),t.label=3;case 3:return[2]}})})},e.prototype.renderTextWithLetterSpacing=function(A,t,i){var r=this;if(t===0)this.ctx.fillText(A.text,A.bounds.left,A.bounds.top+i);else{var s=yo(A.text);s.reduce(function(a,o){return r.ctx.fillText(o,a,A.bounds.top+i),a+r.ctx.measureText(o).width},A.bounds.left)}},e.prototype.createFontStyle=function(A){var t=A.fontVariant.filter(function(s){return s==="normal"||s==="small-caps"}).join(""),i=JB(A.fontFamily).join(", "),r=Xi(A.fontSize)?""+A.fontSize.number+A.fontSize.unit:A.fontSize.number+"px";return[[A.fontStyle,t,A.fontWeight,r,i].join(" "),i,r]},e.prototype.renderTextNode=function(A,t){return RA(this,void 0,void 0,function(){var i,r,s,a,o,l,c,u,h=this;return MA(this,function(p){return i=this.createFontStyle(t),r=i[0],s=i[1],a=i[2],this.ctx.font=r,this.ctx.direction=t.direction===1?"rtl":"ltr",this.ctx.textAlign="left",this.ctx.textBaseline="alphabetic",o=this.fontMetrics.getMetrics(s,a),l=o.baseline,c=o.middle,u=t.paintOrder,A.textBounds.forEach(function(g){u.forEach(function(m){switch(m){case 0:h.ctx.fillStyle=_A(t.color),h.renderTextWithLetterSpacing(g,t.letterSpacing,l);var d=t.textShadow;d.length&&g.text.trim().length&&(d.slice(0).reverse().forEach(function(f){h.ctx.shadowColor=_A(f.color),h.ctx.shadowOffsetX=f.offsetX.number*h.options.scale,h.ctx.shadowOffsetY=f.offsetY.number*h.options.scale,h.ctx.shadowBlur=f.blur.number,h.renderTextWithLetterSpacing(g,t.letterSpacing,l)}),h.ctx.shadowColor="",h.ctx.shadowOffsetX=0,h.ctx.shadowOffsetY=0,h.ctx.shadowBlur=0),t.textDecorationLine.length&&(h.ctx.fillStyle=_A(t.textDecorationColor||t.color),t.textDecorationLine.forEach(function(f){switch(f){case 1:h.ctx.fillRect(g.bounds.left,Math.round(g.bounds.top+l),g.bounds.width,1);break;case 2:h.ctx.fillRect(g.bounds.left,Math.round(g.bounds.top),g.bounds.width,1);break;case 3:h.ctx.fillRect(g.bounds.left,Math.ceil(g.bounds.top+c),g.bounds.width,1);break}}));break;case 1:t.webkitTextStrokeWidth&&g.text.trim().length&&(h.ctx.strokeStyle=_A(t.webkitTextStrokeColor),h.ctx.lineWidth=t.webkitTextStrokeWidth,h.ctx.lineJoin=window.chrome?"miter":"round",h.ctx.strokeText(g.text,g.bounds.left,g.bounds.top+l)),h.ctx.strokeStyle="",h.ctx.lineWidth=0,h.ctx.lineJoin="miter";break}})}),[2]})})},e.prototype.renderReplacedElement=function(A,t,i){if(i&&A.intrinsicWidth>0&&A.intrinsicHeight>0){var r=ss(A),s=rs(t);this.path(s),this.ctx.save(),this.ctx.clip(),this.ctx.drawImage(i,0,0,A.intrinsicWidth,A.intrinsicHeight,r.left,r.top,r.width,r.height),this.ctx.restore()}},e.prototype.renderNodeContent=function(A){return RA(this,void 0,void 0,function(){var t,i,r,s,a,o,v,v,l,c,u,h,y,p,g,C,m,d,f,v,B,y,C;return MA(this,function(x){switch(x.label){case 0:this.applyEffects(A.getEffects(4)),t=A.container,i=A.curves,r=t.styles,s=0,a=t.textNodes,x.label=1;case 1:return s<a.length?(o=a[s],[4,this.renderTextNode(o,r)]):[3,4];case 2:x.sent(),x.label=3;case 3:return s++,[3,1];case 4:if(!(t instanceof ch))return[3,8];x.label=5;case 5:return x.trys.push([5,7,,8]),[4,this.context.cache.match(t.src)];case 6:return v=x.sent(),this.renderReplacedElement(t,i,v),[3,8];case 7:return x.sent(),this.context.logger.error("Error loading image "+t.src),[3,8];case 8:if(t instanceof uh&&this.renderReplacedElement(t,i,t.canvas),!(t instanceof hh))return[3,12];x.label=9;case 9:return x.trys.push([9,11,,12]),[4,this.context.cache.match(t.svg)];case 10:return v=x.sent(),this.renderReplacedElement(t,i,v),[3,12];case 11:return x.sent(),this.context.logger.error("Error loading svg "+t.svg.substring(0,255)),[3,12];case 12:return t instanceof gh&&t.tree?(l=new e(this.context,{scale:this.options.scale,backgroundColor:t.backgroundColor,x:0,y:0,width:t.width,height:t.height}),[4,l.render(t.tree)]):[3,14];case 13:c=x.sent(),t.width&&t.height&&this.ctx.drawImage(c,0,0,t.width,t.height,t.bounds.left,t.bounds.top,t.bounds.width,t.bounds.height),x.label=14;case 14:if(t instanceof So&&(u=Math.min(t.bounds.width,t.bounds.height),t.type===es?t.checked&&(this.ctx.save(),this.path([new fe(t.bounds.left+u*.39363,t.bounds.top+u*.79),new fe(t.bounds.left+u*.16,t.bounds.top+u*.5549),new fe(t.bounds.left+u*.27347,t.bounds.top+u*.44071),new fe(t.bounds.left+u*.39694,t.bounds.top+u*.5649),new fe(t.bounds.left+u*.72983,t.bounds.top+u*.23),new fe(t.bounds.left+u*.84,t.bounds.top+u*.34085),new fe(t.bounds.left+u*.39363,t.bounds.top+u*.79)]),this.ctx.fillStyle=_A(Ll),this.ctx.fill(),this.ctx.restore()):t.type===As&&t.checked&&(this.ctx.save(),this.ctx.beginPath(),this.ctx.arc(t.bounds.left+u/2,t.bounds.top+u/2,u/4,0,Math.PI*2,!0),this.ctx.fillStyle=_A(Ll),this.ctx.fill(),this.ctx.restore())),zB(t)&&t.value.length){switch(h=this.createFontStyle(r),y=h[0],p=h[1],g=this.fontMetrics.getMetrics(y,p).baseline,this.ctx.font=y,this.ctx.fillStyle=_A(r.color),this.ctx.textBaseline="alphabetic",this.ctx.textAlign=XB(t.styles.textAlign),C=ss(t),m=0,t.styles.textAlign){case 1:m+=C.width/2;break;case 2:m+=C.width;break}d=C.add(m,0,0,-C.height/2+1),this.ctx.save(),this.path([new fe(C.left,C.top),new fe(C.left+C.width,C.top),new fe(C.left+C.width,C.top+C.height),new fe(C.left,C.top+C.height)]),this.ctx.clip(),this.renderTextWithLetterSpacing(new Qi(t.value,d),r.letterSpacing,g),this.ctx.restore(),this.ctx.textBaseline="alphabetic",this.ctx.textAlign="left"}if(!fA(t.styles.display,2048))return[3,20];if(t.styles.listStyleImage===null)return[3,19];if(f=t.styles.listStyleImage,f.type!==0)return[3,18];v=void 0,B=f.url,x.label=15;case 15:return x.trys.push([15,17,,18]),[4,this.context.cache.match(B)];case 16:return v=x.sent(),this.ctx.drawImage(v,t.bounds.left-(v.width+10),t.bounds.top),[3,18];case 17:return x.sent(),this.context.logger.error("Error loading list-style-image "+B),[3,18];case 18:return[3,20];case 19:A.listValue&&t.styles.listStyleType!==-1&&(y=this.createFontStyle(r)[0],this.ctx.font=y,this.ctx.fillStyle=_A(r.color),this.ctx.textBaseline="middle",this.ctx.textAlign="right",C=new Qt(t.bounds.left,t.bounds.top+$e(t.styles.paddingTop,t.bounds.width),t.bounds.width,ml(r.lineHeight,r.fontSize.number)/2+1),this.renderTextWithLetterSpacing(new Qi(A.listValue,C),r.letterSpacing,ml(r.lineHeight,r.fontSize.number)/2+2),this.ctx.textBaseline="bottom",this.ctx.textAlign="left"),x.label=20;case 20:return[2]}})})},e.prototype.renderStackContent=function(A){return RA(this,void 0,void 0,function(){var t,i,f,r,s,f,a,o,f,l,c,f,u,h,f,p,g,f,m,d,f;return MA(this,function(v){switch(v.label){case 0:if(fA(A.element.container.flags,16))debugger;return[4,this.renderNodeBackgroundAndBorders(A.element)];case 1:v.sent(),t=0,i=A.negativeZIndex,v.label=2;case 2:return t<i.length?(f=i[t],[4,this.renderStack(f)]):[3,5];case 3:v.sent(),v.label=4;case 4:return t++,[3,2];case 5:return[4,this.renderNodeContent(A.element)];case 6:v.sent(),r=0,s=A.nonInlineLevel,v.label=7;case 7:return r<s.length?(f=s[r],[4,this.renderNode(f)]):[3,10];case 8:v.sent(),v.label=9;case 9:return r++,[3,7];case 10:a=0,o=A.nonPositionedFloats,v.label=11;case 11:return a<o.length?(f=o[a],[4,this.renderStack(f)]):[3,14];case 12:v.sent(),v.label=13;case 13:return a++,[3,11];case 14:l=0,c=A.nonPositionedInlineLevel,v.label=15;case 15:return l<c.length?(f=c[l],[4,this.renderStack(f)]):[3,18];case 16:v.sent(),v.label=17;case 17:return l++,[3,15];case 18:u=0,h=A.inlineLevel,v.label=19;case 19:return u<h.length?(f=h[u],[4,this.renderNode(f)]):[3,22];case 20:v.sent(),v.label=21;case 21:return u++,[3,19];case 22:p=0,g=A.zeroOrAutoZIndexOrTransformedOrOpacity,v.label=23;case 23:return p<g.length?(f=g[p],[4,this.renderStack(f)]):[3,26];case 24:v.sent(),v.label=25;case 25:return p++,[3,23];case 26:m=0,d=A.positiveZIndex,v.label=27;case 27:return m<d.length?(f=d[m],[4,this.renderStack(f)]):[3,30];case 28:v.sent(),v.label=29;case 29:return m++,[3,27];case 30:return[2]}})})},e.prototype.mask=function(A){this.ctx.beginPath(),this.ctx.moveTo(0,0),this.ctx.lineTo(this.canvas.width,0),this.ctx.lineTo(this.canvas.width,this.canvas.height),this.ctx.lineTo(0,this.canvas.height),this.ctx.lineTo(0,0),this.formatPath(A.slice(0).reverse()),this.ctx.closePath()},e.prototype.path=function(A){this.ctx.beginPath(),this.formatPath(A),this.ctx.closePath()},e.prototype.formatPath=function(A){var t=this;A.forEach(function(i,r){var s=qA(i)?i.start:i;r===0?t.ctx.moveTo(s.x,s.y):t.ctx.lineTo(s.x,s.y),qA(i)&&t.ctx.bezierCurveTo(i.startControl.x,i.startControl.y,i.endControl.x,i.endControl.y,i.end.x,i.end.y)})},e.prototype.renderRepeat=function(A,t,i,r){this.path(A),this.ctx.fillStyle=t,this.ctx.translate(i,r),this.ctx.fill(),this.ctx.translate(-i,-r)},e.prototype.resizeImage=function(A,t,i){var r;if(A.width===t&&A.height===i)return A;var s=(r=this.canvas.ownerDocument)!==null&&r!==void 0?r:document,a=s.createElement("canvas");a.width=Math.max(1,t),a.height=Math.max(1,i);var o=a.getContext("2d");return o.drawImage(A,0,0,A.width,A.height,0,0,t,i),a},e.prototype.renderBackgroundImage=function(A){return RA(this,void 0,void 0,function(){var t,i,r,s,a,o;return MA(this,function(l){switch(l.label){case 0:t=A.styles.backgroundImage.length-1,i=function(c){var u,h,p,M,X,k,Y,T,R,g,M,X,k,Y,T,m,d,f,v,B,y,C,x,S,R,_,M,G,Z,Y,T,O,X,k,j,W,q,Q,K,ae,ue,he;return MA(this,function(Ee){switch(Ee.label){case 0:if(c.type!==0)return[3,5];u=void 0,h=c.url,Ee.label=1;case 1:return Ee.trys.push([1,3,,4]),[4,r.context.cache.match(h)];case 2:return u=Ee.sent(),[3,4];case 3:return Ee.sent(),r.context.logger.error("Error loading background-image "+h),[3,4];case 4:return u&&(p=na(A,t,[u.width,u.height,u.width/u.height]),M=p[0],X=p[1],k=p[2],Y=p[3],T=p[4],R=r.ctx.createPattern(r.resizeImage(u,Y,T),"repeat"),r.renderRepeat(M,R,X,k)),[3,6];case 5:bp(c)?(g=na(A,t,[null,null,null]),M=g[0],X=g[1],k=g[2],Y=g[3],T=g[4],m=Up(c.angle,Y,T),d=m[0],f=m[1],v=m[2],B=m[3],y=m[4],C=document.createElement("canvas"),C.width=Y,C.height=T,x=C.getContext("2d"),S=x.createLinearGradient(f,B,v,y),pl(c.stops,d).forEach(function(Ie){return S.addColorStop(Ie.stop,_A(Ie.color))}),x.fillStyle=S,x.fillRect(0,0,Y,T),Y>0&&T>0&&(R=r.ctx.createPattern(C,"repeat"),r.renderRepeat(M,R,X,k))):Tp(c)&&(_=na(A,t,[null,null,null]),M=_[0],G=_[1],Z=_[2],Y=_[3],T=_[4],O=c.position.length===0?[Co]:c.position,X=$e(O[0],Y),k=$e(O[O.length-1],T),j=yp(c,X,k,Y,T),W=j[0],q=j[1],W>0&&q>0&&(Q=r.ctx.createRadialGradient(G+X,Z+k,0,G+X,Z+k,W),pl(c.stops,W*2).forEach(function(Ie){return Q.addColorStop(Ie.stop,_A(Ie.color))}),r.path(M),r.ctx.fillStyle=Q,W!==q?(K=A.bounds.left+.5*A.bounds.width,ae=A.bounds.top+.5*A.bounds.height,ue=q/W,he=1/ue,r.ctx.save(),r.ctx.translate(K,ae),r.ctx.transform(1,0,0,ue,0,0),r.ctx.translate(-K,-ae),r.ctx.fillRect(G,he*(Z-ae)+ae,Y,T*he),r.ctx.restore()):r.ctx.fill())),Ee.label=6;case 6:return t--,[2]}})},r=this,s=0,a=A.styles.backgroundImage.slice(0).reverse(),l.label=1;case 1:return s<a.length?(o=a[s],[5,i(o)]):[3,4];case 2:l.sent(),l.label=3;case 3:return s++,[3,1];case 4:return[2]}})})},e.prototype.renderSolidBorder=function(A,t,i){return RA(this,void 0,void 0,function(){return MA(this,function(r){return this.path(Wl(i,t)),this.ctx.fillStyle=_A(A),this.ctx.fill(),[2]})})},e.prototype.renderDoubleBorder=function(A,t,i,r){return RA(this,void 0,void 0,function(){var s,a;return MA(this,function(o){switch(o.label){case 0:return t<3?[4,this.renderSolidBorder(A,i,r)]:[3,2];case 1:return o.sent(),[2];case 2:return s=LB(r,i),this.path(s),this.ctx.fillStyle=_A(A),this.ctx.fill(),a=RB(r,i),this.path(a),this.ctx.fill(),[2]}})})},e.prototype.renderNodeBackgroundAndBorders=function(A){return RA(this,void 0,void 0,function(){var t,i,r,s,a,o,l,c,u=this;return MA(this,function(h){switch(h.label){case 0:return this.applyEffects(A.getEffects(2)),t=A.container.styles,i=!Jt(t.backgroundColor)||t.backgroundImage.length,r=[{style:t.borderTopStyle,color:t.borderTopColor,width:t.borderTopWidth},{style:t.borderRightStyle,color:t.borderRightColor,width:t.borderRightWidth},{style:t.borderBottomStyle,color:t.borderBottomColor,width:t.borderBottomWidth},{style:t.borderLeftStyle,color:t.borderLeftColor,width:t.borderLeftWidth}],s=WB(qn(t.backgroundClip,0),A.curves),i||t.boxShadow.length?(this.ctx.save(),this.path(s),this.ctx.clip(),Jt(t.backgroundColor)||(this.ctx.fillStyle=_A(t.backgroundColor),this.ctx.fill()),[4,this.renderBackgroundImage(A.container)]):[3,2];case 1:h.sent(),this.ctx.restore(),t.boxShadow.slice(0).reverse().forEach(function(p){u.ctx.save();var g=is(A.curves),m=p.inset?0:kB,d=QB(g,-m+(p.inset?1:-1)*p.spread.number,(p.inset?1:-1)*p.spread.number,p.spread.number*(p.inset?-2:2),p.spread.number*(p.inset?-2:2));p.inset?(u.path(g),u.ctx.clip(),u.mask(d)):(u.mask(g),u.ctx.clip(),u.path(d)),u.ctx.shadowOffsetX=p.offsetX.number+m,u.ctx.shadowOffsetY=p.offsetY.number,u.ctx.shadowColor=_A(p.color),u.ctx.shadowBlur=p.blur.number,u.ctx.fillStyle=p.inset?_A(p.color):"rgba(0,0,0,1)",u.ctx.fill(),u.ctx.restore()}),h.label=2;case 2:a=0,o=0,l=r,h.label=3;case 3:return o<l.length?(c=l[o],c.style!==0&&!Jt(c.color)&&c.width>0?c.style!==2?[3,5]:[4,this.renderDashedDottedBorder(c.color,c.width,a,A.curves,2)]:[3,11]):[3,13];case 4:return h.sent(),[3,11];case 5:return c.style!==3?[3,7]:[4,this.renderDashedDottedBorder(c.color,c.width,a,A.curves,3)];case 6:return h.sent(),[3,11];case 7:return c.style!==4?[3,9]:[4,this.renderDoubleBorder(c.color,c.width,a,A.curves)];case 8:return h.sent(),[3,11];case 9:return[4,this.renderSolidBorder(c.color,a,A.curves)];case 10:h.sent(),h.label=11;case 11:a++,h.label=12;case 12:return o++,[3,3];case 13:return[2]}})})},e.prototype.renderDashedDottedBorder=function(A,t,i,r,s){return RA(this,void 0,void 0,function(){var a,o,l,c,u,h,p,g,m,d,f,v,B,y,C,x,C,x;return MA(this,function(S){return this.ctx.save(),a=DB(r,i),o=Wl(r,i),s===2&&(this.path(o),this.ctx.clip()),qA(o[0])?(l=o[0].start.x,c=o[0].start.y):(l=o[0].x,c=o[0].y),qA(o[1])?(u=o[1].end.x,h=o[1].end.y):(u=o[1].x,h=o[1].y),i===0||i===2?p=Math.abs(l-u):p=Math.abs(c-h),this.ctx.beginPath(),s===3?this.formatPath(a):this.formatPath(o.slice(0,2)),g=t<3?t*3:t*2,m=t<3?t*2:t,s===3&&(g=t,m=t),d=!0,p<=g*2?d=!1:p<=g*2+m?(f=p/(2*g+m),g*=f,m*=f):(v=Math.floor((p+m)/(g+m)),B=(p-v*g)/(v-1),y=(p-(v+1)*g)/v,m=y<=0||Math.abs(m-B)<Math.abs(m-y)?B:y),d&&(s===3?this.ctx.setLineDash([0,g+m]):this.ctx.setLineDash([g,m])),s===3?(this.ctx.lineCap="round",this.ctx.lineWidth=t):this.ctx.lineWidth=t*2+1.1,this.ctx.strokeStyle=_A(A),this.ctx.stroke(),this.ctx.setLineDash([]),s===2&&(qA(o[0])&&(C=o[3],x=o[0],this.ctx.beginPath(),this.formatPath([new fe(C.end.x,C.end.y),new fe(x.start.x,x.start.y)]),this.ctx.stroke()),qA(o[1])&&(C=o[1],x=o[2],this.ctx.beginPath(),this.formatPath([new fe(C.end.x,C.end.y),new fe(x.start.x,x.start.y)]),this.ctx.stroke())),this.ctx.restore(),[2]})})},e.prototype.render=function(A){return RA(this,void 0,void 0,function(){var t;return MA(this,function(i){switch(i.label){case 0:return this.options.backgroundColor&&(this.ctx.fillStyle=_A(this.options.backgroundColor),this.ctx.fillRect(this.options.x,this.options.y,this.options.width,this.options.height)),t=IB(A),[4,this.renderStack(t)];case 1:return i.sent(),this.applyEffects([]),[2,this.canvas]}})})},e}(Qh),zB=function(n){return n instanceof ph||n instanceof dh?!0:n instanceof So&&n.type!==As&&n.type!==es},WB=function(n,e){switch(n){case 0:return is(e);case 2:return SB(e);case 1:default:return rs(e)}},XB=function(n){switch(n){case 1:return"center";case 2:return"right";case 0:default:return"left"}},YB=["-apple-system","system-ui"],JB=function(n){return/iPhone OS 15_(0|1)/.test(window.navigator.userAgent)?n.filter(function(e){return YB.indexOf(e)===-1}):n},qB=function(n){ct(e,n);function e(A,t){var i=n.call(this,A,t)||this;return i.canvas=t.canvas?t.canvas:document.createElement("canvas"),i.ctx=i.canvas.getContext("2d"),i.options=t,i.canvas.width=Math.floor(t.width*t.scale),i.canvas.height=Math.floor(t.height*t.scale),i.canvas.style.width=t.width+"px",i.canvas.style.height=t.height+"px",i.ctx.scale(i.options.scale,i.options.scale),i.ctx.translate(-t.x,-t.y),i.context.logger.debug("EXPERIMENTAL ForeignObject renderer initialized ("+t.width+"x"+t.height+" at "+t.x+","+t.y+") with scale "+t.scale),i}return e.prototype.render=function(A){return RA(this,void 0,void 0,function(){var t,i;return MA(this,function(r){switch(r.label){case 0:return t=to(this.options.width*this.options.scale,this.options.height*this.options.scale,this.options.scale,this.options.scale,A),[4,ZB(t)];case 1:return i=r.sent(),this.options.backgroundColor&&(this.ctx.fillStyle=_A(this.options.backgroundColor),this.ctx.fillRect(0,0,this.options.width*this.options.scale,this.options.height*this.options.scale)),this.ctx.drawImage(i,-this.options.x*this.options.scale,-this.options.y*this.options.scale),[2,this.canvas]}})})},e}(Qh),ZB=function(n){return new Promise(function(e,A){var t=new Image;t.onload=function(){e(t)},t.onerror=A,t.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(new XMLSerializer().serializeToString(n))})},jB=function(){function n(e){var A=e.id,t=e.enabled;this.id=A,this.enabled=t,this.start=Date.now()}return n.prototype.debug=function(){for(var e=[],A=0;A<arguments.length;A++)e[A]=arguments[A];this.enabled&&(typeof window<"u"&&window.console&&typeof console.debug=="function"?console.debug.apply(console,$i([this.id,this.getTime()+"ms"],e)):this.info.apply(this,e))},n.prototype.getTime=function(){return Date.now()-this.start},n.prototype.info=function(){for(var e=[],A=0;A<arguments.length;A++)e[A]=arguments[A];this.enabled&&typeof window<"u"&&window.console&&typeof console.info=="function"&&console.info.apply(console,$i([this.id,this.getTime()+"ms"],e))},n.prototype.warn=function(){for(var e=[],A=0;A<arguments.length;A++)e[A]=arguments[A];this.enabled&&(typeof window<"u"&&window.console&&typeof console.warn=="function"?console.warn.apply(console,$i([this.id,this.getTime()+"ms"],e)):this.info.apply(this,e))},n.prototype.error=function(){for(var e=[],A=0;A<arguments.length;A++)e[A]=arguments[A];this.enabled&&(typeof window<"u"&&window.console&&typeof console.error=="function"?console.error.apply(console,$i([this.id,this.getTime()+"ms"],e)):this.info.apply(this,e))},n.instances={},n}(),$B=function(){function n(e,A){var t;this.windowBounds=A,this.instanceName="#"+n.instanceCount++,this.logger=new jB({id:this.instanceName,enabled:e.logging}),this.cache=(t=e.cache)!==null&&t!==void 0?t:new _B(this,e)}return n.instanceCount=1,n}(),Ih=function(n,e){return e===void 0&&(e={}),e0(n,e)};typeof window<"u"&&yh.setContext(window);var e0=function(n,e){return RA(void 0,void 0,void 0,function(){var A,t,i,r,s,a,o,l,c,u,h,p,g,m,d,f,v,B,y,C,S,x,S,R,_,M,G,Z,Y,T,O,X,k,j,W,q,Q,K,ae,ue;return MA(this,function(he){switch(he.label){case 0:if(!n||typeof n!="object")return[2,Promise.reject("Invalid element provided as first argument")];if(A=n.ownerDocument,!A)throw new Error("Element is not attached to a Document");if(t=A.defaultView,!t)throw new Error("Document is not attached to a Window");return i={allowTaint:(R=e.allowTaint)!==null&&R!==void 0?R:!1,imageTimeout:(_=e.imageTimeout)!==null&&_!==void 0?_:15e3,proxy:e.proxy,useCORS:(M=e.useCORS)!==null&&M!==void 0?M:!1},r=Ga({logging:(G=e.logging)!==null&&G!==void 0?G:!0,cache:e.cache},i),s={windowWidth:(Z=e.windowWidth)!==null&&Z!==void 0?Z:t.innerWidth,windowHeight:(Y=e.windowHeight)!==null&&Y!==void 0?Y:t.innerHeight,scrollX:(T=e.scrollX)!==null&&T!==void 0?T:t.pageXOffset,scrollY:(O=e.scrollY)!==null&&O!==void 0?O:t.pageYOffset},a=new Qt(s.scrollX,s.scrollY,s.windowWidth,s.windowHeight),o=new $B(r,a),l=(X=e.foreignObjectRendering)!==null&&X!==void 0?X:!1,c={allowTaint:(k=e.allowTaint)!==null&&k!==void 0?k:!1,onclone:e.onclone,ignoreElements:e.ignoreElements,inlineImages:l,copyStyles:l},o.logger.debug("Starting document clone with size "+a.width+"x"+a.height+" scrolled to "+-a.left+","+-a.top),u=new kl(o,n,c),h=u.clonedReferenceElement,h?[4,u.toIFrame(A,a)]:[2,Promise.reject("Unable to find element in cloned iframe")];case 1:return p=he.sent(),g=Mo(h)||tB(h)?Qf(h.ownerDocument):ps(o,h),m=g.width,d=g.height,f=g.left,v=g.top,B=A0(o,h,e.backgroundColor),y={canvas:e.canvas,backgroundColor:B,scale:(W=(j=e.scale)!==null&&j!==void 0?j:t.devicePixelRatio)!==null&&W!==void 0?W:1,x:((q=e.x)!==null&&q!==void 0?q:0)+f,y:((Q=e.y)!==null&&Q!==void 0?Q:0)+v,width:(K=e.width)!==null&&K!==void 0?K:Math.ceil(m),height:(ae=e.height)!==null&&ae!==void 0?ae:Math.ceil(d)},l?(o.logger.debug("Document cloned, using foreign object rendering"),S=new qB(o,y),[4,S.render(h)]):[3,3];case 2:return C=he.sent(),[3,5];case 3:return o.logger.debug("Document cloned, element located at "+f+","+v+" with size "+m+"x"+d+" using computed rendering"),o.logger.debug("Starting DOM parsing"),x=Bh(o,h),B===x.styles.backgroundColor&&(x.styles.backgroundColor=Tt.TRANSPARENT),o.logger.debug("Starting renderer for element at "+y.x+","+y.y+" with size "+y.width+"x"+y.height),S=new KB(o,y),[4,S.render(x)];case 4:C=he.sent(),he.label=5;case 5:return(!((ue=e.removeContainer)!==null&&ue!==void 0)||ue)&&(kl.destroy(p)||o.logger.error("Cannot detach cloned iframe as it is not in the DOM anymore")),o.logger.debug("Finished rendering"),[2,C]}})})},A0=function(n,e,A){var t=e.ownerDocument,i=t.documentElement?bi(n,getComputedStyle(t.documentElement).backgroundColor):Tt.TRANSPARENT,r=t.body?bi(n,getComputedStyle(t.body).backgroundColor):Tt.TRANSPARENT,s=typeof A=="string"?bi(n,A):A===null?Tt.TRANSPARENT:4294967295;return e===t.documentElement?Jt(i)?Jt(r)?s:r:i:s};const t0=async()=>await Fu(()=>import("./imprint-gen-3e61d80c.js"),[]),n0='<hr><p style="opacity: 1.0;">Dieses Impressum wurde erstellt durch <a href="https://www.impressum-generator.de" rel="nofollow">impressum-generator.de</a>.</p>',i0=`<hr><div class="center" width=100%>
<button id="hide-imprint" onclick="document.body.dispatchEvent(new Event('${le.HIDE_IMPRINT.toString()}', { bubbles: true }))">Close</button></div>`;class r0{constructor(){window.addEventListener("resize",()=>this.redraw()),new Oa(document.body,()=>this.redraw()),document.body.addEventListener(le.SHOW_IMPRINT.toString(),e=>this.show()),document.body.addEventListener(le.HIDE_IMPRINT.toString(),e=>this.hide()),document.body.addEventListener("keydown",e=>{(e.key==="Esc"||e.key==="Escape")&&this.hide()})}redraw(){this.div!==void 0&&(this.hide(),this.show())}async isAvailable(){const e=await t0();return this.decryptedAES=e.decryptedAES,this.decryptedAES()!==void 0}show(){if(this.div===void 0){this.div=document.createElement("div");const e=this.div;e.classList.add("imprint"),e.innerHTML=this.decryptedAES(),document.body.appendChild(e);const A=window.getComputedStyle(document.body),t=e.scrollWidth,i=e.scrollHeight,r=A.getPropertyValue("background-color");Ih(e,{backgroundColor:r,windowWidth:t,windowHeight:i}).then(s=>{s.classList.add("padding"),e.innerHTML="",e.appendChild(s);const a=document.createElement("p");a.classList.add("padding"),a.innerHTML=n0+i0,e.appendChild(a)})}}hide(){this.div!==void 0&&(document.body.removeChild(this.div),this.div=void 0)}}const s0=async n=>(await Fu(()=>import(n+"?raw",{assert:{type:"html"}}),[])).default,Yl="toggle",a0="div",ia="clicked",o0="-div",ra="-icon",Jl="show";class Us{static async create(e){return await new Us().build(e)}#t;#e=[];#n;show(e){this.icon(e)?.classList.add(Jl)}toggle(){for(let e=0;e<this.#e.length;e++)this.icon(e)?.classList.toggle(Jl)}icon(e){return this.#t.querySelector(`#${this.#e[e]}${ra}`)}async build(e){this.#n=e.event;const A=document.createElement(a0);A.classList.add(`${Yl}${o0}`),A.classList.add(e.classToken);for await(const t of e.icons){this.#e.push(t);const i=await this.createSVGElement(`${e.path}/${t}.svg`,`${t}${ra}`,e.classToken);A.innerHTML+=i}return document.body.appendChild(A),A.addEventListener("click",()=>A.classList.add(ia)),A.addEventListener("animationend",()=>{if(A.classList.contains(ia)){console.log(`dispatchEvent ${e.event}`),A.classList.remove(ia);const t=new Event(e.event,{bubbles:!0});A.dispatchEvent(t)}}),this.#t=A,this}async createSVGElement(e,A,t){const i=document.createElement("template"),r=await s0(e);i.innerHTML=r;const s=i.content.firstElementChild;return s.id=A,s.classList.add(`${Yl}${ra}`),s.classList.add(t),s.outerHTML}addOnClickListener(e){console.log(`callback ${this.#n}`),this.#t.addEventListener(this.#n,e)}}class Fo{#t;#e;#n;static async create(e){const A=await Us.create({path:"./icons/settings",icons:["open","close"],classToken:"settings",event:le.SETTINGS_CHANGED});return new Fo(e,A)}constructor(e,A){this.#t=!0,this.#e=A,this.#n=e,this.#n.hide(),this.#e.show(this.#t?0:1),this.#e.addOnClickListener(()=>this.guiShowHide())}guiShowHide(){this.#t?(this.toggle(),this.#n.show(),this.#n.open()):this.#n.$title.click()}toggle(){this.#t=!this.#t,this.#e.toggle()}}const lo=.001,l0=lo*lo,c0=32,as=["Stolen Necklace","Shader Lamp","Space Colors","Sinusoid"],Ae={showcase:as[dt.STOLEN_NECKLACE],int_mode:dt.STOLEN_NECKLACE,necklace:{number_of_jewels:24,configuration:13579652,string:"",show_solution_band:!0,show_solutions:!0,epsilon:.01,discrete:!0},sphere:{radius:15,segments:128,offset_octant:0,use_bad_on_sphere_check:!1,show_borsuk_ulam_proof_shape:!1},animation:{rotation_x:0,rotation_y:0,rotation_z:0,reset_speed:u0,trigger_reset:!1,run:!1},view:{stats_monitor_visible:!1,necklace_visible:!0,gauge_visible:!0,show_single_thiefs_region:!0,axes_visible:!0,mesh_visible:!1,faces_visible:!0},color:{scale_red:1,scale_green:1,scale_blue:1,alpha:1},capture:{},imprint:()=>le.dispatchEvent(le.SHOW_IMPRINT),radio:as[dt.STOLEN_NECKLACE],text:void 0};class Vi{#t;#e;#n;#A;#r;#i;static addRadioButtonsFolder(e,A,t,i,r=(s,a,o)=>{}){const s=e.addFolder(A);return Vi.addRadioButtons(s,t,i,r),s}static addRadioButtons(e,A,t,i=(r,s,a)=>{}){const r=A;A={},t.forEach((s,a)=>{const o=`option_${a}`;A[o]=r===s}),t.forEach((s,a)=>{const o=`option_${a}`;e.add(A,o).name(s).listen().onChange(()=>{for(let l in A)A[l]=o===l;i(A,o,a)})})}constructor(){this.#A=new vo,this.#A.domElement.id="gui",this.createSettingsIcon(),this.createShowHideListener(),this.createShowcaseFolder(),this.createNecklaceFolder(),this.createViewFolder(),this.createCaptureFolder()}createSettingsIconOrg(){const e=document.createElement("DIV");e.classList.add("toggle-div"),e.id="settings-div",e.innerHTML=svgSettingsOpenAsString+svgSettingsCloseAsString,this.#r=e.querySelector("#settings-icon"),this.#i=e.querySelector("#settings-close-icon"),this.#r.classList.add("show"),this.#A.hide(),this.#A.domElement.insertAdjacentElement("beforeBegin",e),new Oa(this.#A.domElement,(A,t)=>{const i=A.target;t===0&&!i?.classList.contains("transition")&&i?.classList.contains("closed")&&(this.#A.hide(),this.#A.close(),this.toggleSettings())}),e.addEventListener("click",()=>e.classList.add("clicked")),e.addEventListener("animationend",()=>{e.classList.contains("clicked")&&(e.classList.remove("clicked"),this.#r.classList.contains("show")?(this.toggleSettings(),this.#A.show(),this.#A.open()):this.#A.$title.click())})}async createSettingsIcon(){const e=await Fo.create(this.#A);new Oa(this.#A.domElement,(A,t)=>{const i=A.target;t===0&&!i?.classList.contains("transition")&&i?.classList.contains("closed")&&(this.#A.hide(),this.#A.close(),e.toggle())})}toggleSettings(){this.#r.classList.toggle("show"),this.#i.classList.toggle("show")}createShowHideListener(){window.addEventListener("keydown",e=>{(e.key==="h"||e.key==="H")&&(this.#n?this.#A.show():this.#A.hide(),this.#n=!this.#n)})}createShowcaseFolder(){this.#e=Vi.addRadioButtonsFolder(this.#A,`Showcase: ${Ae.radio}`,Ae.radio,as,(e,A,t)=>{Ae.int_mode=t,le.dispatchEvent(le.CREATE_SPHERE),this.#e.title(`Showcase: ${as[t]}`),this.#e.close()}),this.#e.close()}createNecklaceFolder(){const e=this.#A.addFolder("Necklace");e.add(Ae.necklace,"number_of_jewels",0,c0,1).name("Jewels").onChange(()=>{const t=2**Ae.necklace.number_of_jewels-1;Ae.necklace.configuration=Math.min(t,Ae.necklace.configuration),A.min(0).max(t).setValue(Ae.necklace.configuration),le.dispatchEvent(le.UPDATE_SPHERE_MATERIAL)});const A=e.add(Ae.necklace,"configuration",0,2**Ae.necklace.number_of_jewels-1,1).name("Configuration").onChange(()=>le.dispatchEvent(le.SET_NECKLACE_CONFIGURATION_BY_NUMBER));e.add(Ae.necklace,"string").name("String").onChange(()=>le.dispatchEvent(le.SET_NECKLACE_CONFIGURATION_BY_STRING)),e.add(Ae.necklace,"discrete").name("Discrete").onChange(()=>le.dispatchEvent(le.UPDATE_SPHERE_MATERIAL)),e.add(Ae.necklace,"show_solution_band").name("Solution Band").onChange(()=>le.dispatchEvent(le.UPDATE_SPHERE_MATERIAL)),e.add(Ae.necklace,"show_solutions").name("Solutions").onChange(()=>le.dispatchEvent(le.UPDATE_SPHERE_MATERIAL)),e.add(Ae.necklace,"epsilon",0,.15).name("epsilon").onChange(()=>le.dispatchEvent(le.UPDATE_SPHERE_MATERIAL)),e.close()}createViewFolder(){const e=this.#A.addFolder("View");e.add(Ae.view,"show_single_thiefs_region").name("Single Thief's Area").onChange(()=>le.dispatchEvent(le.UPDATE_SPHERE_MATERIAL)),e.add(Ae.view,"axes_visible").name("Axes").onChange(()=>le.dispatchEvent(le.UPDATE_VISIBLE)),e.add(Ae.view,"mesh_visible").name("Mesh").onChange(()=>le.dispatchEvent(le.UPDATE_VISIBLE)),e.add(Ae.view,"faces_visible").name("Faces").onChange(()=>le.dispatchEvent(le.UPDATE_VISIBLE)),e.close(),this.createSphereSubFolder(e),this.createControlsSubFolder(e),this.createColorSubFolder(e),this.createAnimationSubFolder(e)}createSphereSubFolder(e){const A=e.addFolder("Sphere");A.add(Ae.sphere,"radius",1,50,1).name("Radius").onChange(()=>le.dispatchEvent(le.CREATE_SPHERE)),A.add(Ae.sphere,"offset_octant",0,5,.1).name("Octant Offset").onChange(()=>le.dispatchEvent(le.CREATE_SPHERE)),A.add(Ae.sphere,"use_bad_on_sphere_check").name("Bad Check").onChange(()=>le.dispatchEvent(le.UPDATE_SPHERE_MATERIAL)),A.add(Ae.sphere,"show_borsuk_ulam_proof_shape").name("Borsuk-Ulam Proof").onChange(()=>le.dispatchEvent(le.UPDATE_SPHERE_MATERIAL)),A.add(Ae.sphere,"segments",3,511,1).name("Segments").onChange(()=>le.dispatchEvent(le.CREATE_SPHERE)),A.close()}createControlsSubFolder(e){const A=e.addFolder("Other Controls");A.add(Ae.view,"stats_monitor_visible").name("Monitor").onChange(()=>le.dispatchEvent(le.UPDATE_VISIBLE)),A.add(Ae.view,"necklace_visible").name("Necklace").onChange(()=>le.dispatchEvent(le.UPDATE_VISIBLE)),A.add(Ae.view,"gauge_visible").name("Gauge").onChange(()=>le.dispatchEvent(le.UPDATE_VISIBLE)),A.close()}createColorSubFolder(e){const A=e.addFolder("Color");A.add(Ae.color,"scale_red",0,1).name("Red").onChange(()=>le.dispatchEvent(le.UPDATE_SPHERE_MATERIAL)),A.add(Ae.color,"scale_green",0,1).name("Green").onChange(()=>le.dispatchEvent(le.UPDATE_SPHERE_MATERIAL)),A.add(Ae.color,"scale_blue",0,1).name("Blue").onChange(()=>le.dispatchEvent(le.UPDATE_SPHERE_MATERIAL)),A.add(Ae.color,"alpha",0,1).name("Alpha").onChange(()=>le.dispatchEvent(le.CREATE_SPHERE)),A.close()}createAnimationSubFolder(e){const A=e.addFolder("Animation"),t=.5;A.add(Ae.animation,"run").name("Rotate [Hz]").listen(),A.add(Ae.animation,"rotation_x",-t,t,.1).name("X").listen(),A.add(Ae.animation,"rotation_y",-t,t,.1).name("Y").listen(),A.add(Ae.animation,"rotation_z",-t,t,.1).name("Z").listen(),A.add(Ae.animation,"reset_speed").name("Reset Rotation"),A.close()}createCaptureFolder(){const e=this.#A.addFolder("Screen capture");new r0().isAvailable().then(i=>{i&&this.#A.add(Ae,"imprint").name("Imprint")}),e.close(),this.#t=e}get captureFolder(){return this.#t}}function u0(){Ae.animation.trigger_reset=!0,Ae.animation.run=!1,Ae.animation.rotation_x=0,Ae.animation.rotation_y=0,Ae.animation.rotation_z=0}class bo{#t;#e;static async create(){const e=await Us.create({path:"./icons/themes",icons:["light","dark"],classToken:"themes",event:le.THEME_CHANGED.toString()});return new bo(e)}constructor(e){this.#e=e}initTheme(){this.#t=this.preferredTheme(),document.body.classList.add(this.#t?"dark":"light"),this.#e.show(this.#t?0:1)}preferredTheme(){return window.matchMedia("(prefers-color-scheme: dark)").matches}registerOnThemeChange(e){e.addEventListener(le.THEME_CHANGED.toString(),()=>{this.onThemeChange(e)})}onThemeChange(e){const A=this.#t?"dark":"light",t=this.#t?"light":"dark";e.classList.replace(A,t)||e.classList.add(t),this.#t=!this.#t,this.#e.toggle()}}HTMLCanvasElement.prototype.getContext=function(n){return function(e,A){return A=A||{},A.preserveDrawingBuffer=!0,n.call(this,e,A)}}(HTMLCanvasElement.prototype.getContext);const ql=["All","Sphere","Necklace"];class h0{#t;#e;#n;constructor(e,A={all:void 0,sphere:void 0,necklace:void 0}){this.#t=()=>document.body,this.#A(e,A),document.addEventListener("keydown",t=>{t.altKey&&t.key==="s"&&(t.stopPropagation(),t.preventDefault(),this.capture())})}#A(e,A){this.#e=[A.all,A.sphere,A.necklace];const t=e.folder,i=e.property;i.selection=ql[0],this.#n=0,this.#t=()=>this.#e[this.#n],i.on_capture_clicked=()=>this.capture(),Vi.addRadioButtons(t,i.selection,ql,(r,s,a)=>{this.#n=a}),t.add(i,"on_capture_clicked").name("Click or press 'alt s'")}capture(e=this.#t){console.log(`screenCapture ${e}`);const A=e();if(!A)throw new Error("No element to capture");setTimeout(()=>{const i=window.getComputedStyle(document.body).getPropertyValue("background-color");Ih(A,{backgroundColor:i}).then(r=>{const s=document.createElement("a");s.href=r.toDataURL(),s.download="necklace.png",s.click()})},100)}}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const To="158",bn={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Tn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},f0=0,Zl=1,d0=2,Lh=1,p0=2,Ft=3,An=0,PA=1,at=2,qt=0,Ai=1,jl=2,$l=3,ec=4,g0=5,fn=100,m0=101,B0=102,Ac=103,tc=104,_0=200,w0=201,v0=202,E0=203,co=204,uo=205,C0=206,x0=207,U0=208,y0=209,S0=210,M0=211,F0=212,b0=213,T0=214,Q0=0,I0=1,L0=2,os=3,R0=4,D0=5,H0=6,P0=7,Rh=0,O0=1,N0=2,Zt=0,G0=1,V0=2,k0=3,K0=4,z0=5,Dh=300,ii=301,ri=302,ho=303,fo=304,ys=306,po=1e3,ot=1001,go=1002,DA=1003,nc=1004,sa=1005,ZA=1006,W0=1007,ki=1008,jt=1009,X0=1010,Y0=1011,Qo=1012,Hh=1013,Wt=1014,Xt=1015,Ki=1016,Ph=1017,Oh=1018,Bn=1020,J0=1021,lt=1023,q0=1024,Z0=1025,_n=1026,si=1027,j0=1028,Nh=1029,$0=1030,Gh=1031,Vh=1033,aa=33776,oa=33777,la=33778,ca=33779,ic=35840,rc=35841,sc=35842,ac=35843,e_=36196,oc=37492,lc=37496,cc=37808,uc=37809,hc=37810,fc=37811,dc=37812,pc=37813,gc=37814,mc=37815,Bc=37816,_c=37817,wc=37818,vc=37819,Ec=37820,Cc=37821,ua=36492,xc=36494,Uc=36495,A_=36283,yc=36284,Sc=36285,Mc=36286,kh=3e3,wn=3001,t_=3200,n_=3201,i_=0,r_=1,$A="",EA="srgb",It="srgb-linear",Io="display-p3",Ss="display-p3-linear",ls="linear",AA="srgb",cs="rec709",us="p3",Qn=7680,Fc=519,s_=512,a_=513,o_=514,l_=515,c_=516,u_=517,h_=518,f_=519,bc=35044,Tc="300 es",mo=1035,bt=2e3,hs=2001;class Cn{addEventListener(e,A){this._listeners===void 0&&(this._listeners={});const t=this._listeners;t[e]===void 0&&(t[e]=[]),t[e].indexOf(A)===-1&&t[e].push(A)}hasEventListener(e,A){if(this._listeners===void 0)return!1;const t=this._listeners;return t[e]!==void 0&&t[e].indexOf(A)!==-1}removeEventListener(e,A){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const r=i.indexOf(A);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const t=this._listeners[e.type];if(t!==void 0){e.target=this;const i=t.slice(0);for(let r=0,s=i.length;r<s;r++)i[r].call(this,e);e.target=null}}}const yA=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Qc=1234567;const Li=Math.PI/180,zi=180/Math.PI;function li(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,A=Math.random()*4294967295|0,t=Math.random()*4294967295|0;return(yA[n&255]+yA[n>>8&255]+yA[n>>16&255]+yA[n>>24&255]+"-"+yA[e&255]+yA[e>>8&255]+"-"+yA[e>>16&15|64]+yA[e>>24&255]+"-"+yA[A&63|128]+yA[A>>8&255]+"-"+yA[A>>16&255]+yA[A>>24&255]+yA[t&255]+yA[t>>8&255]+yA[t>>16&255]+yA[t>>24&255]).toLowerCase()}function bA(n,e,A){return Math.max(e,Math.min(A,n))}function Lo(n,e){return(n%e+e)%e}function d_(n,e,A,t,i){return t+(n-e)*(i-t)/(A-e)}function p_(n,e,A){return n!==e?(A-n)/(e-n):0}function Ri(n,e,A){return(1-A)*n+A*e}function g_(n,e,A,t){return Ri(n,e,1-Math.exp(-A*t))}function m_(n,e=1){return e-Math.abs(Lo(n,e*2)-e)}function B_(n,e,A){return n<=e?0:n>=A?1:(n=(n-e)/(A-e),n*n*(3-2*n))}function __(n,e,A){return n<=e?0:n>=A?1:(n=(n-e)/(A-e),n*n*n*(n*(n*6-15)+10))}function w_(n,e){return n+Math.floor(Math.random()*(e-n+1))}function v_(n,e){return n+Math.random()*(e-n)}function E_(n){return n*(.5-Math.random())}function C_(n){n!==void 0&&(Qc=n);let e=Qc+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function x_(n){return n*Li}function U_(n){return n*zi}function Bo(n){return(n&n-1)===0&&n!==0}function y_(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function fs(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function S_(n,e,A,t,i){const r=Math.cos,s=Math.sin,a=r(A/2),o=s(A/2),l=r((e+t)/2),c=s((e+t)/2),u=r((e-t)/2),h=s((e-t)/2),p=r((t-e)/2),g=s((t-e)/2);switch(i){case"XYX":n.set(a*c,o*u,o*h,a*l);break;case"YZY":n.set(o*h,a*c,o*u,a*l);break;case"ZXZ":n.set(o*u,o*h,a*c,a*l);break;case"XZX":n.set(a*c,o*g,o*p,a*l);break;case"YXY":n.set(o*p,a*c,o*g,a*l);break;case"ZYZ":n.set(o*g,o*p,a*c,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Zn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function IA(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const M_={DEG2RAD:Li,RAD2DEG:zi,generateUUID:li,clamp:bA,euclideanModulo:Lo,mapLinear:d_,inverseLerp:p_,lerp:Ri,damp:g_,pingpong:m_,smoothstep:B_,smootherstep:__,randInt:w_,randFloat:v_,randFloatSpread:E_,seededRandom:C_,degToRad:x_,radToDeg:U_,isPowerOfTwo:Bo,ceilPowerOfTwo:y_,floorPowerOfTwo:fs,setQuaternionFromProperEuler:S_,normalize:IA,denormalize:Zn};class ye{constructor(e=0,A=0){ye.prototype.isVector2=!0,this.x=e,this.y=A}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,A){return this.x=e,this.y=A,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,A){switch(e){case 0:this.x=A;break;case 1:this.y=A;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,A){return this.x=e.x+A.x,this.y=e.y+A.y,this}addScaledVector(e,A){return this.x+=e.x*A,this.y+=e.y*A,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,A){return this.x=e.x-A.x,this.y=e.y-A.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const A=this.x,t=this.y,i=e.elements;return this.x=i[0]*A+i[3]*t+i[6],this.y=i[1]*A+i[4]*t+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,A){return this.x=Math.max(e.x,Math.min(A.x,this.x)),this.y=Math.max(e.y,Math.min(A.y,this.y)),this}clampScalar(e,A){return this.x=Math.max(e,Math.min(A,this.x)),this.y=Math.max(e,Math.min(A,this.y)),this}clampLength(e,A){const t=this.length();return this.divideScalar(t||1).multiplyScalar(Math.max(e,Math.min(A,t)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const A=Math.sqrt(this.lengthSq()*e.lengthSq());if(A===0)return Math.PI/2;const t=this.dot(e)/A;return Math.acos(bA(t,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const A=this.x-e.x,t=this.y-e.y;return A*A+t*t}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,A){return this.x+=(e.x-this.x)*A,this.y+=(e.y-this.y)*A,this}lerpVectors(e,A,t){return this.x=e.x+(A.x-e.x)*t,this.y=e.y+(A.y-e.y)*t,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,A=0){return this.x=e[A],this.y=e[A+1],this}toArray(e=[],A=0){return e[A]=this.x,e[A+1]=this.y,e}fromBufferAttribute(e,A){return this.x=e.getX(A),this.y=e.getY(A),this}rotateAround(e,A){const t=Math.cos(A),i=Math.sin(A),r=this.x-e.x,s=this.y-e.y;return this.x=r*t-s*i+e.x,this.y=r*i+s*t+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ve{constructor(e,A,t,i,r,s,a,o,l){Ve.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,A,t,i,r,s,a,o,l)}set(e,A,t,i,r,s,a,o,l){const c=this.elements;return c[0]=e,c[1]=i,c[2]=a,c[3]=A,c[4]=r,c[5]=o,c[6]=t,c[7]=s,c[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const A=this.elements,t=e.elements;return A[0]=t[0],A[1]=t[1],A[2]=t[2],A[3]=t[3],A[4]=t[4],A[5]=t[5],A[6]=t[6],A[7]=t[7],A[8]=t[8],this}extractBasis(e,A,t){return e.setFromMatrix3Column(this,0),A.setFromMatrix3Column(this,1),t.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const A=e.elements;return this.set(A[0],A[4],A[8],A[1],A[5],A[9],A[2],A[6],A[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,A){const t=e.elements,i=A.elements,r=this.elements,s=t[0],a=t[3],o=t[6],l=t[1],c=t[4],u=t[7],h=t[2],p=t[5],g=t[8],m=i[0],d=i[3],f=i[6],v=i[1],B=i[4],y=i[7],C=i[2],x=i[5],S=i[8];return r[0]=s*m+a*v+o*C,r[3]=s*d+a*B+o*x,r[6]=s*f+a*y+o*S,r[1]=l*m+c*v+u*C,r[4]=l*d+c*B+u*x,r[7]=l*f+c*y+u*S,r[2]=h*m+p*v+g*C,r[5]=h*d+p*B+g*x,r[8]=h*f+p*y+g*S,this}multiplyScalar(e){const A=this.elements;return A[0]*=e,A[3]*=e,A[6]*=e,A[1]*=e,A[4]*=e,A[7]*=e,A[2]*=e,A[5]*=e,A[8]*=e,this}determinant(){const e=this.elements,A=e[0],t=e[1],i=e[2],r=e[3],s=e[4],a=e[5],o=e[6],l=e[7],c=e[8];return A*s*c-A*a*l-t*r*c+t*a*o+i*r*l-i*s*o}invert(){const e=this.elements,A=e[0],t=e[1],i=e[2],r=e[3],s=e[4],a=e[5],o=e[6],l=e[7],c=e[8],u=c*s-a*l,h=a*o-c*r,p=l*r-s*o,g=A*u+t*h+i*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const m=1/g;return e[0]=u*m,e[1]=(i*l-c*t)*m,e[2]=(a*t-i*s)*m,e[3]=h*m,e[4]=(c*A-i*o)*m,e[5]=(i*r-a*A)*m,e[6]=p*m,e[7]=(t*o-l*A)*m,e[8]=(s*A-t*r)*m,this}transpose(){let e;const A=this.elements;return e=A[1],A[1]=A[3],A[3]=e,e=A[2],A[2]=A[6],A[6]=e,e=A[5],A[5]=A[7],A[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const A=this.elements;return e[0]=A[0],e[1]=A[3],e[2]=A[6],e[3]=A[1],e[4]=A[4],e[5]=A[7],e[6]=A[2],e[7]=A[5],e[8]=A[8],this}setUvTransform(e,A,t,i,r,s,a){const o=Math.cos(r),l=Math.sin(r);return this.set(t*o,t*l,-t*(o*s+l*a)+s+e,-i*l,i*o,-i*(-l*s+o*a)+a+A,0,0,1),this}scale(e,A){return this.premultiply(ha.makeScale(e,A)),this}rotate(e){return this.premultiply(ha.makeRotation(-e)),this}translate(e,A){return this.premultiply(ha.makeTranslation(e,A)),this}makeTranslation(e,A){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,A,0,0,1),this}makeRotation(e){const A=Math.cos(e),t=Math.sin(e);return this.set(A,-t,0,t,A,0,0,0,1),this}makeScale(e,A){return this.set(e,0,0,0,A,0,0,0,1),this}equals(e){const A=this.elements,t=e.elements;for(let i=0;i<9;i++)if(A[i]!==t[i])return!1;return!0}fromArray(e,A=0){for(let t=0;t<9;t++)this.elements[t]=e[t+A];return this}toArray(e=[],A=0){const t=this.elements;return e[A]=t[0],e[A+1]=t[1],e[A+2]=t[2],e[A+3]=t[3],e[A+4]=t[4],e[A+5]=t[5],e[A+6]=t[6],e[A+7]=t[7],e[A+8]=t[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ha=new Ve;function Kh(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function ds(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function F_(){const n=ds("canvas");return n.style.display="block",n}const Ic={};function Di(n){n in Ic||(Ic[n]=!0,console.warn(n))}const Lc=new Ve().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Rc=new Ve().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Er={[It]:{transfer:ls,primaries:cs,toReference:n=>n,fromReference:n=>n},[EA]:{transfer:AA,primaries:cs,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[Ss]:{transfer:ls,primaries:us,toReference:n=>n.applyMatrix3(Rc),fromReference:n=>n.applyMatrix3(Lc)},[Io]:{transfer:AA,primaries:us,toReference:n=>n.convertSRGBToLinear().applyMatrix3(Rc),fromReference:n=>n.applyMatrix3(Lc).convertLinearToSRGB()}},b_=new Set([It,Ss]),qe={enabled:!0,_workingColorSpace:It,get legacyMode(){return console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),!this.enabled},set legacyMode(n){console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),this.enabled=!n},get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!b_.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,A){if(this.enabled===!1||e===A||!e||!A)return n;const t=Er[e].toReference,i=Er[A].fromReference;return i(t(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return Er[n].primaries},getTransfer:function(n){return n===$A?ls:Er[n].transfer}};function ti(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function fa(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let In;class zh{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let A;if(e instanceof HTMLCanvasElement)A=e;else{In===void 0&&(In=ds("canvas")),In.width=e.width,In.height=e.height;const t=In.getContext("2d");e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),A=In}return A.width>2048||A.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),A.toDataURL("image/jpeg",.6)):A.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const A=ds("canvas");A.width=e.width,A.height=e.height;const t=A.getContext("2d");t.drawImage(e,0,0,e.width,e.height);const i=t.getImageData(0,0,e.width,e.height),r=i.data;for(let s=0;s<r.length;s++)r[s]=ti(r[s]/255)*255;return t.putImageData(i,0,0),A}else if(e.data){const A=e.data.slice(0);for(let t=0;t<A.length;t++)A instanceof Uint8Array||A instanceof Uint8ClampedArray?A[t]=Math.floor(ti(A[t]/255)*255):A[t]=ti(A[t]);return{data:A,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let T_=0;class Wh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:T_++}),this.uuid=li(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const A=e===void 0||typeof e=="string";if(!A&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const t={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let s=0,a=i.length;s<a;s++)i[s].isDataTexture?r.push(da(i[s].image)):r.push(da(i[s]))}else r=da(i);t.url=r}return A||(e.images[this.uuid]=t),t}}function da(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?zh.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Q_=0;class WA extends Cn{constructor(e=WA.DEFAULT_IMAGE,A=WA.DEFAULT_MAPPING,t=ot,i=ot,r=ZA,s=ki,a=lt,o=jt,l=WA.DEFAULT_ANISOTROPY,c=$A){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Q_++}),this.uuid=li(),this.name="",this.source=new Wh(e),this.mipmaps=[],this.mapping=A,this.channel=0,this.wrapS=t,this.wrapT=i,this.magFilter=r,this.minFilter=s,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=o,this.offset=new ye(0,0),this.repeat=new ye(1,1),this.center=new ye(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof c=="string"?this.colorSpace=c:(Di("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=c===wn?EA:$A),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const A=e===void 0||typeof e=="string";if(!A&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const t={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(t.userData=this.userData),A||(e.textures[this.uuid]=t),t}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Dh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case po:e.x=e.x-Math.floor(e.x);break;case ot:e.x=e.x<0?0:1;break;case go:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case po:e.y=e.y-Math.floor(e.y);break;case ot:e.y=e.y<0?0:1;break;case go:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Di("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===EA?wn:kh}set encoding(e){Di("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===wn?EA:$A}}WA.DEFAULT_IMAGE=null;WA.DEFAULT_MAPPING=Dh;WA.DEFAULT_ANISOTROPY=1;class xA{constructor(e=0,A=0,t=0,i=1){xA.prototype.isVector4=!0,this.x=e,this.y=A,this.z=t,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,A,t,i){return this.x=e,this.y=A,this.z=t,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,A){switch(e){case 0:this.x=A;break;case 1:this.y=A;break;case 2:this.z=A;break;case 3:this.w=A;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,A){return this.x=e.x+A.x,this.y=e.y+A.y,this.z=e.z+A.z,this.w=e.w+A.w,this}addScaledVector(e,A){return this.x+=e.x*A,this.y+=e.y*A,this.z+=e.z*A,this.w+=e.w*A,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,A){return this.x=e.x-A.x,this.y=e.y-A.y,this.z=e.z-A.z,this.w=e.w-A.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const A=this.x,t=this.y,i=this.z,r=this.w,s=e.elements;return this.x=s[0]*A+s[4]*t+s[8]*i+s[12]*r,this.y=s[1]*A+s[5]*t+s[9]*i+s[13]*r,this.z=s[2]*A+s[6]*t+s[10]*i+s[14]*r,this.w=s[3]*A+s[7]*t+s[11]*i+s[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const A=Math.sqrt(1-e.w*e.w);return A<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/A,this.y=e.y/A,this.z=e.z/A),this}setAxisAngleFromRotationMatrix(e){let A,t,i,r;const o=e.elements,l=o[0],c=o[4],u=o[8],h=o[1],p=o[5],g=o[9],m=o[2],d=o[6],f=o[10];if(Math.abs(c-h)<.01&&Math.abs(u-m)<.01&&Math.abs(g-d)<.01){if(Math.abs(c+h)<.1&&Math.abs(u+m)<.1&&Math.abs(g+d)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;A=Math.PI;const B=(l+1)/2,y=(p+1)/2,C=(f+1)/2,x=(c+h)/4,S=(u+m)/4,R=(g+d)/4;return B>y&&B>C?B<.01?(t=0,i=.707106781,r=.707106781):(t=Math.sqrt(B),i=x/t,r=S/t):y>C?y<.01?(t=.707106781,i=0,r=.707106781):(i=Math.sqrt(y),t=x/i,r=R/i):C<.01?(t=.707106781,i=.707106781,r=0):(r=Math.sqrt(C),t=S/r,i=R/r),this.set(t,i,r,A),this}let v=Math.sqrt((d-g)*(d-g)+(u-m)*(u-m)+(h-c)*(h-c));return Math.abs(v)<.001&&(v=1),this.x=(d-g)/v,this.y=(u-m)/v,this.z=(h-c)/v,this.w=Math.acos((l+p+f-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,A){return this.x=Math.max(e.x,Math.min(A.x,this.x)),this.y=Math.max(e.y,Math.min(A.y,this.y)),this.z=Math.max(e.z,Math.min(A.z,this.z)),this.w=Math.max(e.w,Math.min(A.w,this.w)),this}clampScalar(e,A){return this.x=Math.max(e,Math.min(A,this.x)),this.y=Math.max(e,Math.min(A,this.y)),this.z=Math.max(e,Math.min(A,this.z)),this.w=Math.max(e,Math.min(A,this.w)),this}clampLength(e,A){const t=this.length();return this.divideScalar(t||1).multiplyScalar(Math.max(e,Math.min(A,t)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,A){return this.x+=(e.x-this.x)*A,this.y+=(e.y-this.y)*A,this.z+=(e.z-this.z)*A,this.w+=(e.w-this.w)*A,this}lerpVectors(e,A,t){return this.x=e.x+(A.x-e.x)*t,this.y=e.y+(A.y-e.y)*t,this.z=e.z+(A.z-e.z)*t,this.w=e.w+(A.w-e.w)*t,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,A=0){return this.x=e[A],this.y=e[A+1],this.z=e[A+2],this.w=e[A+3],this}toArray(e=[],A=0){return e[A]=this.x,e[A+1]=this.y,e[A+2]=this.z,e[A+3]=this.w,e}fromBufferAttribute(e,A){return this.x=e.getX(A),this.y=e.getY(A),this.z=e.getZ(A),this.w=e.getW(A),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class I_ extends Cn{constructor(e=1,A=1,t={}){super(),this.isRenderTarget=!0,this.width=e,this.height=A,this.depth=1,this.scissor=new xA(0,0,e,A),this.scissorTest=!1,this.viewport=new xA(0,0,e,A);const i={width:e,height:A,depth:1};t.encoding!==void 0&&(Di("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===wn?EA:$A),t=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ZA,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},t),this.texture=new WA(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=t.generateMipmaps,this.texture.internalFormat=t.internalFormat,this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.depthTexture=t.depthTexture,this.samples=t.samples}setSize(e,A,t=1){(this.width!==e||this.height!==A||this.depth!==t)&&(this.width=e,this.height=A,this.depth=t,this.texture.image.width=e,this.texture.image.height=A,this.texture.image.depth=t,this.dispose()),this.viewport.set(0,0,e,A),this.scissor.set(0,0,e,A)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const A=Object.assign({},e.texture.image);return this.texture.source=new Wh(A),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class vn extends I_{constructor(e=1,A=1,t={}){super(e,A,t),this.isWebGLRenderTarget=!0}}class Xh extends WA{constructor(e=null,A=1,t=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:A,height:t,depth:i},this.magFilter=DA,this.minFilter=DA,this.wrapR=ot,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class L_ extends WA{constructor(e=null,A=1,t=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:A,height:t,depth:i},this.magFilter=DA,this.minFilter=DA,this.wrapR=ot,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class En{constructor(e=0,A=0,t=0,i=1){this.isQuaternion=!0,this._x=e,this._y=A,this._z=t,this._w=i}static slerpFlat(e,A,t,i,r,s,a){let o=t[i+0],l=t[i+1],c=t[i+2],u=t[i+3];const h=r[s+0],p=r[s+1],g=r[s+2],m=r[s+3];if(a===0){e[A+0]=o,e[A+1]=l,e[A+2]=c,e[A+3]=u;return}if(a===1){e[A+0]=h,e[A+1]=p,e[A+2]=g,e[A+3]=m;return}if(u!==m||o!==h||l!==p||c!==g){let d=1-a;const f=o*h+l*p+c*g+u*m,v=f>=0?1:-1,B=1-f*f;if(B>Number.EPSILON){const C=Math.sqrt(B),x=Math.atan2(C,f*v);d=Math.sin(d*x)/C,a=Math.sin(a*x)/C}const y=a*v;if(o=o*d+h*y,l=l*d+p*y,c=c*d+g*y,u=u*d+m*y,d===1-a){const C=1/Math.sqrt(o*o+l*l+c*c+u*u);o*=C,l*=C,c*=C,u*=C}}e[A]=o,e[A+1]=l,e[A+2]=c,e[A+3]=u}static multiplyQuaternionsFlat(e,A,t,i,r,s){const a=t[i],o=t[i+1],l=t[i+2],c=t[i+3],u=r[s],h=r[s+1],p=r[s+2],g=r[s+3];return e[A]=a*g+c*u+o*p-l*h,e[A+1]=o*g+c*h+l*u-a*p,e[A+2]=l*g+c*p+a*h-o*u,e[A+3]=c*g-a*u-o*h-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,A,t,i){return this._x=e,this._y=A,this._z=t,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,A){const t=e._x,i=e._y,r=e._z,s=e._order,a=Math.cos,o=Math.sin,l=a(t/2),c=a(i/2),u=a(r/2),h=o(t/2),p=o(i/2),g=o(r/2);switch(s){case"XYZ":this._x=h*c*u+l*p*g,this._y=l*p*u-h*c*g,this._z=l*c*g+h*p*u,this._w=l*c*u-h*p*g;break;case"YXZ":this._x=h*c*u+l*p*g,this._y=l*p*u-h*c*g,this._z=l*c*g-h*p*u,this._w=l*c*u+h*p*g;break;case"ZXY":this._x=h*c*u-l*p*g,this._y=l*p*u+h*c*g,this._z=l*c*g+h*p*u,this._w=l*c*u-h*p*g;break;case"ZYX":this._x=h*c*u-l*p*g,this._y=l*p*u+h*c*g,this._z=l*c*g-h*p*u,this._w=l*c*u+h*p*g;break;case"YZX":this._x=h*c*u+l*p*g,this._y=l*p*u+h*c*g,this._z=l*c*g-h*p*u,this._w=l*c*u-h*p*g;break;case"XZY":this._x=h*c*u-l*p*g,this._y=l*p*u-h*c*g,this._z=l*c*g+h*p*u,this._w=l*c*u+h*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s)}return A!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,A){const t=A/2,i=Math.sin(t);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(t),this._onChangeCallback(),this}setFromRotationMatrix(e){const A=e.elements,t=A[0],i=A[4],r=A[8],s=A[1],a=A[5],o=A[9],l=A[2],c=A[6],u=A[10],h=t+a+u;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(c-o)*p,this._y=(r-l)*p,this._z=(s-i)*p}else if(t>a&&t>u){const p=2*Math.sqrt(1+t-a-u);this._w=(c-o)/p,this._x=.25*p,this._y=(i+s)/p,this._z=(r+l)/p}else if(a>u){const p=2*Math.sqrt(1+a-t-u);this._w=(r-l)/p,this._x=(i+s)/p,this._y=.25*p,this._z=(o+c)/p}else{const p=2*Math.sqrt(1+u-t-a);this._w=(s-i)/p,this._x=(r+l)/p,this._y=(o+c)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,A){let t=e.dot(A)+1;return t<Number.EPSILON?(t=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=t):(this._x=0,this._y=-e.z,this._z=e.y,this._w=t)):(this._x=e.y*A.z-e.z*A.y,this._y=e.z*A.x-e.x*A.z,this._z=e.x*A.y-e.y*A.x,this._w=t),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(bA(this.dot(e),-1,1)))}rotateTowards(e,A){const t=this.angleTo(e);if(t===0)return this;const i=Math.min(1,A/t);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,A){const t=e._x,i=e._y,r=e._z,s=e._w,a=A._x,o=A._y,l=A._z,c=A._w;return this._x=t*c+s*a+i*l-r*o,this._y=i*c+s*o+r*a-t*l,this._z=r*c+s*l+t*o-i*a,this._w=s*c-t*a-i*o-r*l,this._onChangeCallback(),this}slerp(e,A){if(A===0)return this;if(A===1)return this.copy(e);const t=this._x,i=this._y,r=this._z,s=this._w;let a=s*e._w+t*e._x+i*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=s,this._x=t,this._y=i,this._z=r,this;const o=1-a*a;if(o<=Number.EPSILON){const p=1-A;return this._w=p*s+A*this._w,this._x=p*t+A*this._x,this._y=p*i+A*this._y,this._z=p*r+A*this._z,this.normalize(),this._onChangeCallback(),this}const l=Math.sqrt(o),c=Math.atan2(l,a),u=Math.sin((1-A)*c)/l,h=Math.sin(A*c)/l;return this._w=s*u+this._w*h,this._x=t*u+this._x*h,this._y=i*u+this._y*h,this._z=r*u+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,A,t){return this.copy(e).slerp(A,t)}random(){const e=Math.random(),A=Math.sqrt(1-e),t=Math.sqrt(e),i=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(A*Math.cos(i),t*Math.sin(r),t*Math.cos(r),A*Math.sin(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,A=0){return this._x=e[A],this._y=e[A+1],this._z=e[A+2],this._w=e[A+3],this._onChangeCallback(),this}toArray(e=[],A=0){return e[A]=this._x,e[A+1]=this._y,e[A+2]=this._z,e[A+3]=this._w,e}fromBufferAttribute(e,A){return this._x=e.getX(A),this._y=e.getY(A),this._z=e.getZ(A),this._w=e.getW(A),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(e=0,A=0,t=0){I.prototype.isVector3=!0,this.x=e,this.y=A,this.z=t}set(e,A,t){return t===void 0&&(t=this.z),this.x=e,this.y=A,this.z=t,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,A){switch(e){case 0:this.x=A;break;case 1:this.y=A;break;case 2:this.z=A;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,A){return this.x=e.x+A.x,this.y=e.y+A.y,this.z=e.z+A.z,this}addScaledVector(e,A){return this.x+=e.x*A,this.y+=e.y*A,this.z+=e.z*A,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,A){return this.x=e.x-A.x,this.y=e.y-A.y,this.z=e.z-A.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,A){return this.x=e.x*A.x,this.y=e.y*A.y,this.z=e.z*A.z,this}applyEuler(e){return this.applyQuaternion(Dc.setFromEuler(e))}applyAxisAngle(e,A){return this.applyQuaternion(Dc.setFromAxisAngle(e,A))}applyMatrix3(e){const A=this.x,t=this.y,i=this.z,r=e.elements;return this.x=r[0]*A+r[3]*t+r[6]*i,this.y=r[1]*A+r[4]*t+r[7]*i,this.z=r[2]*A+r[5]*t+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const A=this.x,t=this.y,i=this.z,r=e.elements,s=1/(r[3]*A+r[7]*t+r[11]*i+r[15]);return this.x=(r[0]*A+r[4]*t+r[8]*i+r[12])*s,this.y=(r[1]*A+r[5]*t+r[9]*i+r[13])*s,this.z=(r[2]*A+r[6]*t+r[10]*i+r[14])*s,this}applyQuaternion(e){const A=this.x,t=this.y,i=this.z,r=e.x,s=e.y,a=e.z,o=e.w,l=2*(s*i-a*t),c=2*(a*A-r*i),u=2*(r*t-s*A);return this.x=A+o*l+s*u-a*c,this.y=t+o*c+a*l-r*u,this.z=i+o*u+r*c-s*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const A=this.x,t=this.y,i=this.z,r=e.elements;return this.x=r[0]*A+r[4]*t+r[8]*i,this.y=r[1]*A+r[5]*t+r[9]*i,this.z=r[2]*A+r[6]*t+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,A){return this.x=Math.max(e.x,Math.min(A.x,this.x)),this.y=Math.max(e.y,Math.min(A.y,this.y)),this.z=Math.max(e.z,Math.min(A.z,this.z)),this}clampScalar(e,A){return this.x=Math.max(e,Math.min(A,this.x)),this.y=Math.max(e,Math.min(A,this.y)),this.z=Math.max(e,Math.min(A,this.z)),this}clampLength(e,A){const t=this.length();return this.divideScalar(t||1).multiplyScalar(Math.max(e,Math.min(A,t)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,A){return this.x+=(e.x-this.x)*A,this.y+=(e.y-this.y)*A,this.z+=(e.z-this.z)*A,this}lerpVectors(e,A,t){return this.x=e.x+(A.x-e.x)*t,this.y=e.y+(A.y-e.y)*t,this.z=e.z+(A.z-e.z)*t,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,A){const t=e.x,i=e.y,r=e.z,s=A.x,a=A.y,o=A.z;return this.x=i*o-r*a,this.y=r*s-t*o,this.z=t*a-i*s,this}projectOnVector(e){const A=e.lengthSq();if(A===0)return this.set(0,0,0);const t=e.dot(this)/A;return this.copy(e).multiplyScalar(t)}projectOnPlane(e){return pa.copy(this).projectOnVector(e),this.sub(pa)}reflect(e){return this.sub(pa.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const A=Math.sqrt(this.lengthSq()*e.lengthSq());if(A===0)return Math.PI/2;const t=this.dot(e)/A;return Math.acos(bA(t,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const A=this.x-e.x,t=this.y-e.y,i=this.z-e.z;return A*A+t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,A,t){const i=Math.sin(A)*e;return this.x=i*Math.sin(t),this.y=Math.cos(A)*e,this.z=i*Math.cos(t),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,A,t){return this.x=e*Math.sin(A),this.y=t,this.z=e*Math.cos(A),this}setFromMatrixPosition(e){const A=e.elements;return this.x=A[12],this.y=A[13],this.z=A[14],this}setFromMatrixScale(e){const A=this.setFromMatrixColumn(e,0).length(),t=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=A,this.y=t,this.z=i,this}setFromMatrixColumn(e,A){return this.fromArray(e.elements,A*4)}setFromMatrix3Column(e,A){return this.fromArray(e.elements,A*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,A=0){return this.x=e[A],this.y=e[A+1],this.z=e[A+2],this}toArray(e=[],A=0){return e[A]=this.x,e[A+1]=this.y,e[A+2]=this.z,e}fromBufferAttribute(e,A){return this.x=e.getX(A),this.y=e.getY(A),this.z=e.getZ(A),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,A=Math.random()*Math.PI*2,t=Math.sqrt(1-e**2);return this.x=t*Math.cos(A),this.y=t*Math.sin(A),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const pa=new I,Dc=new En;class Yi{constructor(e=new I(1/0,1/0,1/0),A=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=A}set(e,A){return this.min.copy(e),this.max.copy(A),this}setFromArray(e){this.makeEmpty();for(let A=0,t=e.length;A<t;A+=3)this.expandByPoint(tt.fromArray(e,A));return this}setFromBufferAttribute(e){this.makeEmpty();for(let A=0,t=e.count;A<t;A++)this.expandByPoint(tt.fromBufferAttribute(e,A));return this}setFromPoints(e){this.makeEmpty();for(let A=0,t=e.length;A<t;A++)this.expandByPoint(e[A]);return this}setFromCenterAndSize(e,A){const t=tt.copy(A).multiplyScalar(.5);return this.min.copy(e).sub(t),this.max.copy(e).add(t),this}setFromObject(e,A=!1){return this.makeEmpty(),this.expandByObject(e,A)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,A=!1){e.updateWorldMatrix(!1,!1);const t=e.geometry;if(t!==void 0){const r=t.getAttribute("position");if(A===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let s=0,a=r.count;s<a;s++)e.isMesh===!0?e.getVertexPosition(s,tt):tt.fromBufferAttribute(r,s),tt.applyMatrix4(e.matrixWorld),this.expandByPoint(tt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Cr.copy(e.boundingBox)):(t.boundingBox===null&&t.computeBoundingBox(),Cr.copy(t.boundingBox)),Cr.applyMatrix4(e.matrixWorld),this.union(Cr)}const i=e.children;for(let r=0,s=i.length;r<s;r++)this.expandByObject(i[r],A);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,A){return A.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,tt),tt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let A,t;return e.normal.x>0?(A=e.normal.x*this.min.x,t=e.normal.x*this.max.x):(A=e.normal.x*this.max.x,t=e.normal.x*this.min.x),e.normal.y>0?(A+=e.normal.y*this.min.y,t+=e.normal.y*this.max.y):(A+=e.normal.y*this.max.y,t+=e.normal.y*this.min.y),e.normal.z>0?(A+=e.normal.z*this.min.z,t+=e.normal.z*this.max.z):(A+=e.normal.z*this.max.z,t+=e.normal.z*this.min.z),A<=-e.constant&&t>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(gi),xr.subVectors(this.max,gi),Ln.subVectors(e.a,gi),Rn.subVectors(e.b,gi),Dn.subVectors(e.c,gi),Lt.subVectors(Rn,Ln),Rt.subVectors(Dn,Rn),an.subVectors(Ln,Dn);let A=[0,-Lt.z,Lt.y,0,-Rt.z,Rt.y,0,-an.z,an.y,Lt.z,0,-Lt.x,Rt.z,0,-Rt.x,an.z,0,-an.x,-Lt.y,Lt.x,0,-Rt.y,Rt.x,0,-an.y,an.x,0];return!ga(A,Ln,Rn,Dn,xr)||(A=[1,0,0,0,1,0,0,0,1],!ga(A,Ln,Rn,Dn,xr))?!1:(Ur.crossVectors(Lt,Rt),A=[Ur.x,Ur.y,Ur.z],ga(A,Ln,Rn,Dn,xr))}clampPoint(e,A){return A.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,tt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(tt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(xt[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),xt[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),xt[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),xt[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),xt[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),xt[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),xt[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),xt[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(xt),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const xt=[new I,new I,new I,new I,new I,new I,new I,new I],tt=new I,Cr=new Yi,Ln=new I,Rn=new I,Dn=new I,Lt=new I,Rt=new I,an=new I,gi=new I,xr=new I,Ur=new I,on=new I;function ga(n,e,A,t,i){for(let r=0,s=n.length-3;r<=s;r+=3){on.fromArray(n,r);const a=i.x*Math.abs(on.x)+i.y*Math.abs(on.y)+i.z*Math.abs(on.z),o=e.dot(on),l=A.dot(on),c=t.dot(on);if(Math.max(-Math.max(o,l,c),Math.min(o,l,c))>a)return!1}return!0}const R_=new Yi,mi=new I,ma=new I;let Ms=class{constructor(e=new I,A=-1){this.center=e,this.radius=A}set(e,A){return this.center.copy(e),this.radius=A,this}setFromPoints(e,A){const t=this.center;A!==void 0?t.copy(A):R_.setFromPoints(e).getCenter(t);let i=0;for(let r=0,s=e.length;r<s;r++)i=Math.max(i,t.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const A=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=A*A}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,A){const t=this.center.distanceToSquared(e);return A.copy(e),t>this.radius*this.radius&&(A.sub(this.center).normalize(),A.multiplyScalar(this.radius).add(this.center)),A}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;mi.subVectors(e,this.center);const A=mi.lengthSq();if(A>this.radius*this.radius){const t=Math.sqrt(A),i=(t-this.radius)*.5;this.center.addScaledVector(mi,i/t),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ma.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(mi.copy(e.center).add(ma)),this.expandByPoint(mi.copy(e.center).sub(ma))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}};const Ut=new I,Ba=new I,yr=new I,Dt=new I,_a=new I,Sr=new I,wa=new I;class Fs{constructor(e=new I,A=new I(0,0,-1)){this.origin=e,this.direction=A}set(e,A){return this.origin.copy(e),this.direction.copy(A),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,A){return A.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ut)),this}closestPointToPoint(e,A){A.subVectors(e,this.origin);const t=A.dot(this.direction);return t<0?A.copy(this.origin):A.copy(this.origin).addScaledVector(this.direction,t)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const A=Ut.subVectors(e,this.origin).dot(this.direction);return A<0?this.origin.distanceToSquared(e):(Ut.copy(this.origin).addScaledVector(this.direction,A),Ut.distanceToSquared(e))}distanceSqToSegment(e,A,t,i){Ba.copy(e).add(A).multiplyScalar(.5),yr.copy(A).sub(e).normalize(),Dt.copy(this.origin).sub(Ba);const r=e.distanceTo(A)*.5,s=-this.direction.dot(yr),a=Dt.dot(this.direction),o=-Dt.dot(yr),l=Dt.lengthSq(),c=Math.abs(1-s*s);let u,h,p,g;if(c>0)if(u=s*o-a,h=s*a-o,g=r*c,u>=0)if(h>=-g)if(h<=g){const m=1/c;u*=m,h*=m,p=u*(u+s*h+2*a)+h*(s*u+h+2*o)+l}else h=r,u=Math.max(0,-(s*h+a)),p=-u*u+h*(h+2*o)+l;else h=-r,u=Math.max(0,-(s*h+a)),p=-u*u+h*(h+2*o)+l;else h<=-g?(u=Math.max(0,-(-s*r+a)),h=u>0?-r:Math.min(Math.max(-r,-o),r),p=-u*u+h*(h+2*o)+l):h<=g?(u=0,h=Math.min(Math.max(-r,-o),r),p=h*(h+2*o)+l):(u=Math.max(0,-(s*r+a)),h=u>0?r:Math.min(Math.max(-r,-o),r),p=-u*u+h*(h+2*o)+l);else h=s>0?-r:r,u=Math.max(0,-(s*h+a)),p=-u*u+h*(h+2*o)+l;return t&&t.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Ba).addScaledVector(yr,h),p}intersectSphere(e,A){Ut.subVectors(e.center,this.origin);const t=Ut.dot(this.direction),i=Ut.dot(Ut)-t*t,r=e.radius*e.radius;if(i>r)return null;const s=Math.sqrt(r-i),a=t-s,o=t+s;return o<0?null:a<0?this.at(o,A):this.at(a,A)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const A=e.normal.dot(this.direction);if(A===0)return e.distanceToPoint(this.origin)===0?0:null;const t=-(this.origin.dot(e.normal)+e.constant)/A;return t>=0?t:null}intersectPlane(e,A){const t=this.distanceToPlane(e);return t===null?null:this.at(t,A)}intersectsPlane(e){const A=e.distanceToPoint(this.origin);return A===0||e.normal.dot(this.direction)*A<0}intersectBox(e,A){let t,i,r,s,a,o;const l=1/this.direction.x,c=1/this.direction.y,u=1/this.direction.z,h=this.origin;return l>=0?(t=(e.min.x-h.x)*l,i=(e.max.x-h.x)*l):(t=(e.max.x-h.x)*l,i=(e.min.x-h.x)*l),c>=0?(r=(e.min.y-h.y)*c,s=(e.max.y-h.y)*c):(r=(e.max.y-h.y)*c,s=(e.min.y-h.y)*c),t>s||r>i||((r>t||isNaN(t))&&(t=r),(s<i||isNaN(i))&&(i=s),u>=0?(a=(e.min.z-h.z)*u,o=(e.max.z-h.z)*u):(a=(e.max.z-h.z)*u,o=(e.min.z-h.z)*u),t>o||a>i)||((a>t||t!==t)&&(t=a),(o<i||i!==i)&&(i=o),i<0)?null:this.at(t>=0?t:i,A)}intersectsBox(e){return this.intersectBox(e,Ut)!==null}intersectTriangle(e,A,t,i,r){_a.subVectors(A,e),Sr.subVectors(t,e),wa.crossVectors(_a,Sr);let s=this.direction.dot(wa),a;if(s>0){if(i)return null;a=1}else if(s<0)a=-1,s=-s;else return null;Dt.subVectors(this.origin,e);const o=a*this.direction.dot(Sr.crossVectors(Dt,Sr));if(o<0)return null;const l=a*this.direction.dot(_a.cross(Dt));if(l<0||o+l>s)return null;const c=-a*Dt.dot(wa);return c<0?null:this.at(c/s,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class wA{constructor(e,A,t,i,r,s,a,o,l,c,u,h,p,g,m,d){wA.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,A,t,i,r,s,a,o,l,c,u,h,p,g,m,d)}set(e,A,t,i,r,s,a,o,l,c,u,h,p,g,m,d){const f=this.elements;return f[0]=e,f[4]=A,f[8]=t,f[12]=i,f[1]=r,f[5]=s,f[9]=a,f[13]=o,f[2]=l,f[6]=c,f[10]=u,f[14]=h,f[3]=p,f[7]=g,f[11]=m,f[15]=d,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new wA().fromArray(this.elements)}copy(e){const A=this.elements,t=e.elements;return A[0]=t[0],A[1]=t[1],A[2]=t[2],A[3]=t[3],A[4]=t[4],A[5]=t[5],A[6]=t[6],A[7]=t[7],A[8]=t[8],A[9]=t[9],A[10]=t[10],A[11]=t[11],A[12]=t[12],A[13]=t[13],A[14]=t[14],A[15]=t[15],this}copyPosition(e){const A=this.elements,t=e.elements;return A[12]=t[12],A[13]=t[13],A[14]=t[14],this}setFromMatrix3(e){const A=e.elements;return this.set(A[0],A[3],A[6],0,A[1],A[4],A[7],0,A[2],A[5],A[8],0,0,0,0,1),this}extractBasis(e,A,t){return e.setFromMatrixColumn(this,0),A.setFromMatrixColumn(this,1),t.setFromMatrixColumn(this,2),this}makeBasis(e,A,t){return this.set(e.x,A.x,t.x,0,e.y,A.y,t.y,0,e.z,A.z,t.z,0,0,0,0,1),this}extractRotation(e){const A=this.elements,t=e.elements,i=1/Hn.setFromMatrixColumn(e,0).length(),r=1/Hn.setFromMatrixColumn(e,1).length(),s=1/Hn.setFromMatrixColumn(e,2).length();return A[0]=t[0]*i,A[1]=t[1]*i,A[2]=t[2]*i,A[3]=0,A[4]=t[4]*r,A[5]=t[5]*r,A[6]=t[6]*r,A[7]=0,A[8]=t[8]*s,A[9]=t[9]*s,A[10]=t[10]*s,A[11]=0,A[12]=0,A[13]=0,A[14]=0,A[15]=1,this}makeRotationFromEuler(e){const A=this.elements,t=e.x,i=e.y,r=e.z,s=Math.cos(t),a=Math.sin(t),o=Math.cos(i),l=Math.sin(i),c=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const h=s*c,p=s*u,g=a*c,m=a*u;A[0]=o*c,A[4]=-o*u,A[8]=l,A[1]=p+g*l,A[5]=h-m*l,A[9]=-a*o,A[2]=m-h*l,A[6]=g+p*l,A[10]=s*o}else if(e.order==="YXZ"){const h=o*c,p=o*u,g=l*c,m=l*u;A[0]=h+m*a,A[4]=g*a-p,A[8]=s*l,A[1]=s*u,A[5]=s*c,A[9]=-a,A[2]=p*a-g,A[6]=m+h*a,A[10]=s*o}else if(e.order==="ZXY"){const h=o*c,p=o*u,g=l*c,m=l*u;A[0]=h-m*a,A[4]=-s*u,A[8]=g+p*a,A[1]=p+g*a,A[5]=s*c,A[9]=m-h*a,A[2]=-s*l,A[6]=a,A[10]=s*o}else if(e.order==="ZYX"){const h=s*c,p=s*u,g=a*c,m=a*u;A[0]=o*c,A[4]=g*l-p,A[8]=h*l+m,A[1]=o*u,A[5]=m*l+h,A[9]=p*l-g,A[2]=-l,A[6]=a*o,A[10]=s*o}else if(e.order==="YZX"){const h=s*o,p=s*l,g=a*o,m=a*l;A[0]=o*c,A[4]=m-h*u,A[8]=g*u+p,A[1]=u,A[5]=s*c,A[9]=-a*c,A[2]=-l*c,A[6]=p*u+g,A[10]=h-m*u}else if(e.order==="XZY"){const h=s*o,p=s*l,g=a*o,m=a*l;A[0]=o*c,A[4]=-u,A[8]=l*c,A[1]=h*u+m,A[5]=s*c,A[9]=p*u-g,A[2]=g*u-p,A[6]=a*c,A[10]=m*u+h}return A[3]=0,A[7]=0,A[11]=0,A[12]=0,A[13]=0,A[14]=0,A[15]=1,this}makeRotationFromQuaternion(e){return this.compose(D_,e,H_)}lookAt(e,A,t){const i=this.elements;return kA.subVectors(e,A),kA.lengthSq()===0&&(kA.z=1),kA.normalize(),Ht.crossVectors(t,kA),Ht.lengthSq()===0&&(Math.abs(t.z)===1?kA.x+=1e-4:kA.z+=1e-4,kA.normalize(),Ht.crossVectors(t,kA)),Ht.normalize(),Mr.crossVectors(kA,Ht),i[0]=Ht.x,i[4]=Mr.x,i[8]=kA.x,i[1]=Ht.y,i[5]=Mr.y,i[9]=kA.y,i[2]=Ht.z,i[6]=Mr.z,i[10]=kA.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,A){const t=e.elements,i=A.elements,r=this.elements,s=t[0],a=t[4],o=t[8],l=t[12],c=t[1],u=t[5],h=t[9],p=t[13],g=t[2],m=t[6],d=t[10],f=t[14],v=t[3],B=t[7],y=t[11],C=t[15],x=i[0],S=i[4],R=i[8],_=i[12],M=i[1],G=i[5],Z=i[9],Y=i[13],T=i[2],O=i[6],X=i[10],k=i[14],j=i[3],W=i[7],q=i[11],Q=i[15];return r[0]=s*x+a*M+o*T+l*j,r[4]=s*S+a*G+o*O+l*W,r[8]=s*R+a*Z+o*X+l*q,r[12]=s*_+a*Y+o*k+l*Q,r[1]=c*x+u*M+h*T+p*j,r[5]=c*S+u*G+h*O+p*W,r[9]=c*R+u*Z+h*X+p*q,r[13]=c*_+u*Y+h*k+p*Q,r[2]=g*x+m*M+d*T+f*j,r[6]=g*S+m*G+d*O+f*W,r[10]=g*R+m*Z+d*X+f*q,r[14]=g*_+m*Y+d*k+f*Q,r[3]=v*x+B*M+y*T+C*j,r[7]=v*S+B*G+y*O+C*W,r[11]=v*R+B*Z+y*X+C*q,r[15]=v*_+B*Y+y*k+C*Q,this}multiplyScalar(e){const A=this.elements;return A[0]*=e,A[4]*=e,A[8]*=e,A[12]*=e,A[1]*=e,A[5]*=e,A[9]*=e,A[13]*=e,A[2]*=e,A[6]*=e,A[10]*=e,A[14]*=e,A[3]*=e,A[7]*=e,A[11]*=e,A[15]*=e,this}determinant(){const e=this.elements,A=e[0],t=e[4],i=e[8],r=e[12],s=e[1],a=e[5],o=e[9],l=e[13],c=e[2],u=e[6],h=e[10],p=e[14],g=e[3],m=e[7],d=e[11],f=e[15];return g*(+r*o*u-i*l*u-r*a*h+t*l*h+i*a*p-t*o*p)+m*(+A*o*p-A*l*h+r*s*h-i*s*p+i*l*c-r*o*c)+d*(+A*l*u-A*a*p-r*s*u+t*s*p+r*a*c-t*l*c)+f*(-i*a*c-A*o*u+A*a*h+i*s*u-t*s*h+t*o*c)}transpose(){const e=this.elements;let A;return A=e[1],e[1]=e[4],e[4]=A,A=e[2],e[2]=e[8],e[8]=A,A=e[6],e[6]=e[9],e[9]=A,A=e[3],e[3]=e[12],e[12]=A,A=e[7],e[7]=e[13],e[13]=A,A=e[11],e[11]=e[14],e[14]=A,this}setPosition(e,A,t){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=A,i[14]=t),this}invert(){const e=this.elements,A=e[0],t=e[1],i=e[2],r=e[3],s=e[4],a=e[5],o=e[6],l=e[7],c=e[8],u=e[9],h=e[10],p=e[11],g=e[12],m=e[13],d=e[14],f=e[15],v=u*d*l-m*h*l+m*o*p-a*d*p-u*o*f+a*h*f,B=g*h*l-c*d*l-g*o*p+s*d*p+c*o*f-s*h*f,y=c*m*l-g*u*l+g*a*p-s*m*p-c*a*f+s*u*f,C=g*u*o-c*m*o-g*a*h+s*m*h+c*a*d-s*u*d,x=A*v+t*B+i*y+r*C;if(x===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const S=1/x;return e[0]=v*S,e[1]=(m*h*r-u*d*r-m*i*p+t*d*p+u*i*f-t*h*f)*S,e[2]=(a*d*r-m*o*r+m*i*l-t*d*l-a*i*f+t*o*f)*S,e[3]=(u*o*r-a*h*r-u*i*l+t*h*l+a*i*p-t*o*p)*S,e[4]=B*S,e[5]=(c*d*r-g*h*r+g*i*p-A*d*p-c*i*f+A*h*f)*S,e[6]=(g*o*r-s*d*r-g*i*l+A*d*l+s*i*f-A*o*f)*S,e[7]=(s*h*r-c*o*r+c*i*l-A*h*l-s*i*p+A*o*p)*S,e[8]=y*S,e[9]=(g*u*r-c*m*r-g*t*p+A*m*p+c*t*f-A*u*f)*S,e[10]=(s*m*r-g*a*r+g*t*l-A*m*l-s*t*f+A*a*f)*S,e[11]=(c*a*r-s*u*r-c*t*l+A*u*l+s*t*p-A*a*p)*S,e[12]=C*S,e[13]=(c*m*i-g*u*i+g*t*h-A*m*h-c*t*d+A*u*d)*S,e[14]=(g*a*i-s*m*i-g*t*o+A*m*o+s*t*d-A*a*d)*S,e[15]=(s*u*i-c*a*i+c*t*o-A*u*o-s*t*h+A*a*h)*S,this}scale(e){const A=this.elements,t=e.x,i=e.y,r=e.z;return A[0]*=t,A[4]*=i,A[8]*=r,A[1]*=t,A[5]*=i,A[9]*=r,A[2]*=t,A[6]*=i,A[10]*=r,A[3]*=t,A[7]*=i,A[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,A=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],t=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(A,t,i))}makeTranslation(e,A,t){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,A,0,0,1,t,0,0,0,1),this}makeRotationX(e){const A=Math.cos(e),t=Math.sin(e);return this.set(1,0,0,0,0,A,-t,0,0,t,A,0,0,0,0,1),this}makeRotationY(e){const A=Math.cos(e),t=Math.sin(e);return this.set(A,0,t,0,0,1,0,0,-t,0,A,0,0,0,0,1),this}makeRotationZ(e){const A=Math.cos(e),t=Math.sin(e);return this.set(A,-t,0,0,t,A,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,A){const t=Math.cos(A),i=Math.sin(A),r=1-t,s=e.x,a=e.y,o=e.z,l=r*s,c=r*a;return this.set(l*s+t,l*a-i*o,l*o+i*a,0,l*a+i*o,c*a+t,c*o-i*s,0,l*o-i*a,c*o+i*s,r*o*o+t,0,0,0,0,1),this}makeScale(e,A,t){return this.set(e,0,0,0,0,A,0,0,0,0,t,0,0,0,0,1),this}makeShear(e,A,t,i,r,s){return this.set(1,t,r,0,e,1,s,0,A,i,1,0,0,0,0,1),this}compose(e,A,t){const i=this.elements,r=A._x,s=A._y,a=A._z,o=A._w,l=r+r,c=s+s,u=a+a,h=r*l,p=r*c,g=r*u,m=s*c,d=s*u,f=a*u,v=o*l,B=o*c,y=o*u,C=t.x,x=t.y,S=t.z;return i[0]=(1-(m+f))*C,i[1]=(p+y)*C,i[2]=(g-B)*C,i[3]=0,i[4]=(p-y)*x,i[5]=(1-(h+f))*x,i[6]=(d+v)*x,i[7]=0,i[8]=(g+B)*S,i[9]=(d-v)*S,i[10]=(1-(h+m))*S,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,A,t){const i=this.elements;let r=Hn.set(i[0],i[1],i[2]).length();const s=Hn.set(i[4],i[5],i[6]).length(),a=Hn.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],nt.copy(this);const l=1/r,c=1/s,u=1/a;return nt.elements[0]*=l,nt.elements[1]*=l,nt.elements[2]*=l,nt.elements[4]*=c,nt.elements[5]*=c,nt.elements[6]*=c,nt.elements[8]*=u,nt.elements[9]*=u,nt.elements[10]*=u,A.setFromRotationMatrix(nt),t.x=r,t.y=s,t.z=a,this}makePerspective(e,A,t,i,r,s,a=bt){const o=this.elements,l=2*r/(A-e),c=2*r/(t-i),u=(A+e)/(A-e),h=(t+i)/(t-i);let p,g;if(a===bt)p=-(s+r)/(s-r),g=-2*s*r/(s-r);else if(a===hs)p=-s/(s-r),g=-s*r/(s-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return o[0]=l,o[4]=0,o[8]=u,o[12]=0,o[1]=0,o[5]=c,o[9]=h,o[13]=0,o[2]=0,o[6]=0,o[10]=p,o[14]=g,o[3]=0,o[7]=0,o[11]=-1,o[15]=0,this}makeOrthographic(e,A,t,i,r,s,a=bt){const o=this.elements,l=1/(A-e),c=1/(t-i),u=1/(s-r),h=(A+e)*l,p=(t+i)*c;let g,m;if(a===bt)g=(s+r)*u,m=-2*u;else if(a===hs)g=r*u,m=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return o[0]=2*l,o[4]=0,o[8]=0,o[12]=-h,o[1]=0,o[5]=2*c,o[9]=0,o[13]=-p,o[2]=0,o[6]=0,o[10]=m,o[14]=-g,o[3]=0,o[7]=0,o[11]=0,o[15]=1,this}equals(e){const A=this.elements,t=e.elements;for(let i=0;i<16;i++)if(A[i]!==t[i])return!1;return!0}fromArray(e,A=0){for(let t=0;t<16;t++)this.elements[t]=e[t+A];return this}toArray(e=[],A=0){const t=this.elements;return e[A]=t[0],e[A+1]=t[1],e[A+2]=t[2],e[A+3]=t[3],e[A+4]=t[4],e[A+5]=t[5],e[A+6]=t[6],e[A+7]=t[7],e[A+8]=t[8],e[A+9]=t[9],e[A+10]=t[10],e[A+11]=t[11],e[A+12]=t[12],e[A+13]=t[13],e[A+14]=t[14],e[A+15]=t[15],e}}const Hn=new I,nt=new wA,D_=new I(0,0,0),H_=new I(1,1,1),Ht=new I,Mr=new I,kA=new I,Hc=new wA,Pc=new En;class bs{constructor(e=0,A=0,t=0,i=bs.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=A,this._z=t,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,A,t,i=this._order){return this._x=e,this._y=A,this._z=t,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,A=this._order,t=!0){const i=e.elements,r=i[0],s=i[4],a=i[8],o=i[1],l=i[5],c=i[9],u=i[2],h=i[6],p=i[10];switch(A){case"XYZ":this._y=Math.asin(bA(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-c,p),this._z=Math.atan2(-s,r)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-bA(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(o,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(bA(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-s,l)):(this._y=0,this._z=Math.atan2(o,r));break;case"ZYX":this._y=Math.asin(-bA(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(o,r)):(this._x=0,this._z=Math.atan2(-s,l));break;case"YZX":this._z=Math.asin(bA(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-c,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-bA(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-c,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+A)}return this._order=A,t===!0&&this._onChangeCallback(),this}setFromQuaternion(e,A,t){return Hc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Hc,A,t)}setFromVector3(e,A=this._order){return this.set(e.x,e.y,e.z,A)}reorder(e){return Pc.setFromEuler(this),this.setFromQuaternion(Pc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],A=0){return e[A]=this._x,e[A+1]=this._y,e[A+2]=this._z,e[A+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}bs.DEFAULT_ORDER="XYZ";class Ro{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let P_=0;const Oc=new I,Pn=new En,yt=new wA,Fr=new I,Bi=new I,O_=new I,N_=new En,Nc=new I(1,0,0),Gc=new I(0,1,0),Vc=new I(0,0,1),G_={type:"added"},V_={type:"removed"};class OA extends Cn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:P_++}),this.uuid=li(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=OA.DEFAULT_UP.clone();const e=new I,A=new bs,t=new En,i=new I(1,1,1);function r(){t.setFromEuler(A,!1)}function s(){A.setFromQuaternion(t,void 0,!1)}A._onChange(r),t._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:A},quaternion:{configurable:!0,enumerable:!0,value:t},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new wA},normalMatrix:{value:new Ve}}),this.matrix=new wA,this.matrixWorld=new wA,this.matrixAutoUpdate=OA.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=OA.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.layers=new Ro,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,A){this.quaternion.setFromAxisAngle(e,A)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,A){return Pn.setFromAxisAngle(e,A),this.quaternion.multiply(Pn),this}rotateOnWorldAxis(e,A){return Pn.setFromAxisAngle(e,A),this.quaternion.premultiply(Pn),this}rotateX(e){return this.rotateOnAxis(Nc,e)}rotateY(e){return this.rotateOnAxis(Gc,e)}rotateZ(e){return this.rotateOnAxis(Vc,e)}translateOnAxis(e,A){return Oc.copy(e).applyQuaternion(this.quaternion),this.position.add(Oc.multiplyScalar(A)),this}translateX(e){return this.translateOnAxis(Nc,e)}translateY(e){return this.translateOnAxis(Gc,e)}translateZ(e){return this.translateOnAxis(Vc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(yt.copy(this.matrixWorld).invert())}lookAt(e,A,t){e.isVector3?Fr.copy(e):Fr.set(e,A,t);const i=this.parent;this.updateWorldMatrix(!0,!1),Bi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?yt.lookAt(Bi,Fr,this.up):yt.lookAt(Fr,Bi,this.up),this.quaternion.setFromRotationMatrix(yt),i&&(yt.extractRotation(i.matrixWorld),Pn.setFromRotationMatrix(yt),this.quaternion.premultiply(Pn.invert()))}add(e){if(arguments.length>1){for(let A=0;A<arguments.length;A++)this.add(arguments[A]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(G_)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.remove(arguments[t]);return this}const A=this.children.indexOf(e);return A!==-1&&(e.parent=null,this.children.splice(A,1),e.dispatchEvent(V_)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),yt.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),yt.multiply(e.parent.matrixWorld)),e.applyMatrix4(yt),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,A){if(this[e]===A)return this;for(let t=0,i=this.children.length;t<i;t++){const s=this.children[t].getObjectByProperty(e,A);if(s!==void 0)return s}}getObjectsByProperty(e,A){let t=[];this[e]===A&&t.push(this);for(let i=0,r=this.children.length;i<r;i++){const s=this.children[i].getObjectsByProperty(e,A);s.length>0&&(t=t.concat(s))}return t}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bi,e,O_),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bi,N_,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const A=this.matrixWorld.elements;return e.set(A[8],A[9],A[10]).normalize()}raycast(){}traverse(e){e(this);const A=this.children;for(let t=0,i=A.length;t<i;t++)A[t].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const A=this.children;for(let t=0,i=A.length;t<i;t++)A[t].traverseVisible(e)}traverseAncestors(e){const A=this.parent;A!==null&&(e(A),A.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const A=this.children;for(let t=0,i=A.length;t<i;t++){const r=A[t];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,A){const t=this.parent;if(e===!0&&t!==null&&t.matrixWorldAutoUpdate===!0&&t.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),A===!0){const i=this.children;for(let r=0,s=i.length;r<s;r++){const a=i[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const A=e===void 0||typeof e=="string",t={};A&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},t.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON()));function r(a,o){return a[o.uuid]===void 0&&(a[o.uuid]=o.toJSON(e)),o.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const o=a.shapes;if(Array.isArray(o))for(let l=0,c=o.length;l<c;l++){const u=o[l];r(e.shapes,u)}else r(e.shapes,o)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let o=0,l=this.material.length;o<l;o++)a.push(r(e.materials,this.material[o]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const o=this.animations[a];i.animations.push(r(e.animations,o))}}if(A){const a=s(e.geometries),o=s(e.materials),l=s(e.textures),c=s(e.images),u=s(e.shapes),h=s(e.skeletons),p=s(e.animations),g=s(e.nodes);a.length>0&&(t.geometries=a),o.length>0&&(t.materials=o),l.length>0&&(t.textures=l),c.length>0&&(t.images=c),u.length>0&&(t.shapes=u),h.length>0&&(t.skeletons=h),p.length>0&&(t.animations=p),g.length>0&&(t.nodes=g)}return t.object=i,t;function s(a){const o=[];for(const l in a){const c=a[l];delete c.metadata,o.push(c)}return o}}clone(e){return new this.constructor().copy(this,e)}copy(e,A=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),A===!0)for(let t=0;t<e.children.length;t++){const i=e.children[t];this.add(i.clone())}return this}}OA.DEFAULT_UP=new I(0,1,0);OA.DEFAULT_MATRIX_AUTO_UPDATE=!0;OA.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const it=new I,St=new I,va=new I,Mt=new I,On=new I,Nn=new I,kc=new I,Ea=new I,Ca=new I,xa=new I;let br=!1;class st{constructor(e=new I,A=new I,t=new I){this.a=e,this.b=A,this.c=t}static getNormal(e,A,t,i){i.subVectors(t,A),it.subVectors(e,A),i.cross(it);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,A,t,i,r){it.subVectors(i,A),St.subVectors(t,A),va.subVectors(e,A);const s=it.dot(it),a=it.dot(St),o=it.dot(va),l=St.dot(St),c=St.dot(va),u=s*l-a*a;if(u===0)return r.set(-2,-1,-1);const h=1/u,p=(l*o-a*c)*h,g=(s*c-a*o)*h;return r.set(1-p-g,g,p)}static containsPoint(e,A,t,i){return this.getBarycoord(e,A,t,i,Mt),Mt.x>=0&&Mt.y>=0&&Mt.x+Mt.y<=1}static getUV(e,A,t,i,r,s,a,o){return br===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),br=!0),this.getInterpolation(e,A,t,i,r,s,a,o)}static getInterpolation(e,A,t,i,r,s,a,o){return this.getBarycoord(e,A,t,i,Mt),o.setScalar(0),o.addScaledVector(r,Mt.x),o.addScaledVector(s,Mt.y),o.addScaledVector(a,Mt.z),o}static isFrontFacing(e,A,t,i){return it.subVectors(t,A),St.subVectors(e,A),it.cross(St).dot(i)<0}set(e,A,t){return this.a.copy(e),this.b.copy(A),this.c.copy(t),this}setFromPointsAndIndices(e,A,t,i){return this.a.copy(e[A]),this.b.copy(e[t]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,A,t,i){return this.a.fromBufferAttribute(e,A),this.b.fromBufferAttribute(e,t),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return it.subVectors(this.c,this.b),St.subVectors(this.a,this.b),it.cross(St).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return st.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,A){return st.getBarycoord(e,this.a,this.b,this.c,A)}getUV(e,A,t,i,r){return br===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),br=!0),st.getInterpolation(e,this.a,this.b,this.c,A,t,i,r)}getInterpolation(e,A,t,i,r){return st.getInterpolation(e,this.a,this.b,this.c,A,t,i,r)}containsPoint(e){return st.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return st.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,A){const t=this.a,i=this.b,r=this.c;let s,a;On.subVectors(i,t),Nn.subVectors(r,t),Ea.subVectors(e,t);const o=On.dot(Ea),l=Nn.dot(Ea);if(o<=0&&l<=0)return A.copy(t);Ca.subVectors(e,i);const c=On.dot(Ca),u=Nn.dot(Ca);if(c>=0&&u<=c)return A.copy(i);const h=o*u-c*l;if(h<=0&&o>=0&&c<=0)return s=o/(o-c),A.copy(t).addScaledVector(On,s);xa.subVectors(e,r);const p=On.dot(xa),g=Nn.dot(xa);if(g>=0&&p<=g)return A.copy(r);const m=p*l-o*g;if(m<=0&&l>=0&&g<=0)return a=l/(l-g),A.copy(t).addScaledVector(Nn,a);const d=c*g-p*u;if(d<=0&&u-c>=0&&p-g>=0)return kc.subVectors(r,i),a=(u-c)/(u-c+(p-g)),A.copy(i).addScaledVector(kc,a);const f=1/(d+m+h);return s=m*f,a=h*f,A.copy(t).addScaledVector(On,s).addScaledVector(Nn,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Yh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Pt={h:0,s:0,l:0},Tr={h:0,s:0,l:0};function Ua(n,e,A){return A<0&&(A+=1),A>1&&(A-=1),A<1/6?n+(e-n)*6*A:A<1/2?e:A<2/3?n+(e-n)*6*(2/3-A):n}class Ye{constructor(e,A,t){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,A,t)}set(e,A,t){if(A===void 0&&t===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,A,t);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,A=EA){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,qe.toWorkingColorSpace(this,A),this}setRGB(e,A,t,i=qe.workingColorSpace){return this.r=e,this.g=A,this.b=t,qe.toWorkingColorSpace(this,i),this}setHSL(e,A,t,i=qe.workingColorSpace){if(e=Lo(e,1),A=bA(A,0,1),t=bA(t,0,1),A===0)this.r=this.g=this.b=t;else{const r=t<=.5?t*(1+A):t+A-t*A,s=2*t-r;this.r=Ua(s,r,e+1/3),this.g=Ua(s,r,e),this.b=Ua(s,r,e-1/3)}return qe.toWorkingColorSpace(this,i),this}setStyle(e,A=EA){function t(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const s=i[1],a=i[2];switch(s){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return t(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,A);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return t(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,A);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return t(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,A);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],s=r.length;if(s===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,A);if(s===6)return this.setHex(parseInt(r,16),A);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,A);return this}setColorName(e,A=EA){const t=Yh[e.toLowerCase()];return t!==void 0?this.setHex(t,A):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ti(e.r),this.g=ti(e.g),this.b=ti(e.b),this}copyLinearToSRGB(e){return this.r=fa(e.r),this.g=fa(e.g),this.b=fa(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=EA){return qe.fromWorkingColorSpace(SA.copy(this),e),Math.round(bA(SA.r*255,0,255))*65536+Math.round(bA(SA.g*255,0,255))*256+Math.round(bA(SA.b*255,0,255))}getHexString(e=EA){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,A=qe.workingColorSpace){qe.fromWorkingColorSpace(SA.copy(this),A);const t=SA.r,i=SA.g,r=SA.b,s=Math.max(t,i,r),a=Math.min(t,i,r);let o,l;const c=(a+s)/2;if(a===s)o=0,l=0;else{const u=s-a;switch(l=c<=.5?u/(s+a):u/(2-s-a),s){case t:o=(i-r)/u+(i<r?6:0);break;case i:o=(r-t)/u+2;break;case r:o=(t-i)/u+4;break}o/=6}return e.h=o,e.s=l,e.l=c,e}getRGB(e,A=qe.workingColorSpace){return qe.fromWorkingColorSpace(SA.copy(this),A),e.r=SA.r,e.g=SA.g,e.b=SA.b,e}getStyle(e=EA){qe.fromWorkingColorSpace(SA.copy(this),e);const A=SA.r,t=SA.g,i=SA.b;return e!==EA?`color(${e} ${A.toFixed(3)} ${t.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(A*255)},${Math.round(t*255)},${Math.round(i*255)})`}offsetHSL(e,A,t){return this.getHSL(Pt),this.setHSL(Pt.h+e,Pt.s+A,Pt.l+t)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,A){return this.r=e.r+A.r,this.g=e.g+A.g,this.b=e.b+A.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,A){return this.r+=(e.r-this.r)*A,this.g+=(e.g-this.g)*A,this.b+=(e.b-this.b)*A,this}lerpColors(e,A,t){return this.r=e.r+(A.r-e.r)*t,this.g=e.g+(A.g-e.g)*t,this.b=e.b+(A.b-e.b)*t,this}lerpHSL(e,A){this.getHSL(Pt),e.getHSL(Tr);const t=Ri(Pt.h,Tr.h,A),i=Ri(Pt.s,Tr.s,A),r=Ri(Pt.l,Tr.l,A);return this.setHSL(t,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const A=this.r,t=this.g,i=this.b,r=e.elements;return this.r=r[0]*A+r[3]*t+r[6]*i,this.g=r[1]*A+r[4]*t+r[7]*i,this.b=r[2]*A+r[5]*t+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,A=0){return this.r=e[A],this.g=e[A+1],this.b=e[A+2],this}toArray(e=[],A=0){return e[A]=this.r,e[A+1]=this.g,e[A+2]=this.b,e}fromBufferAttribute(e,A){return this.r=e.getX(A),this.g=e.getY(A),this.b=e.getZ(A),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const SA=new Ye;Ye.NAMES=Yh;let k_=0;class Ji extends Cn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:k_++}),this.uuid=li(),this.name="",this.type="Material",this.blending=Ai,this.side=An,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=co,this.blendDst=uo,this.blendEquation=fn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ye(0,0,0),this.blendAlpha=0,this.depthFunc=os,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Fc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Qn,this.stencilZFail=Qn,this.stencilZPass=Qn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const A in e){const t=e[A];if(t===void 0){console.warn(`THREE.Material: parameter '${A}' has value of undefined.`);continue}const i=this[A];if(i===void 0){console.warn(`THREE.Material: '${A}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(t):i&&i.isVector3&&t&&t.isVector3?i.copy(t):this[A]=t}}toJSON(e){const A=e===void 0||typeof e=="string";A&&(e={textures:{},images:{}});const t={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),this.color&&this.color.isColor&&(t.color=this.color.getHex()),this.roughness!==void 0&&(t.roughness=this.roughness),this.metalness!==void 0&&(t.metalness=this.metalness),this.sheen!==void 0&&(t.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(t.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(t.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(t.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(t.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(t.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(t.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(t.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(t.shininess=this.shininess),this.clearcoat!==void 0&&(t.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(t.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(t.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(t.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(t.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,t.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(t.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(t.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(t.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(t.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(t.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(t.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(t.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(t.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(t.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(t.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(t.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(t.lightMap=this.lightMap.toJSON(e).uuid,t.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(t.aoMap=this.aoMap.toJSON(e).uuid,t.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(t.bumpMap=this.bumpMap.toJSON(e).uuid,t.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(t.normalMap=this.normalMap.toJSON(e).uuid,t.normalMapType=this.normalMapType,t.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(t.displacementMap=this.displacementMap.toJSON(e).uuid,t.displacementScale=this.displacementScale,t.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(t.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(t.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(t.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(t.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(t.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(t.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(t.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(t.combine=this.combine)),this.envMapIntensity!==void 0&&(t.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(t.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(t.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(t.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(t.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(t.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(t.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(t.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(t.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(t.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(t.size=this.size),this.shadowSide!==null&&(t.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(t.sizeAttenuation=this.sizeAttenuation),this.blending!==Ai&&(t.blending=this.blending),this.side!==An&&(t.side=this.side),this.vertexColors===!0&&(t.vertexColors=!0),this.opacity<1&&(t.opacity=this.opacity),this.transparent===!0&&(t.transparent=!0),this.blendSrc!==co&&(t.blendSrc=this.blendSrc),this.blendDst!==uo&&(t.blendDst=this.blendDst),this.blendEquation!==fn&&(t.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(t.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(t.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(t.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(t.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(t.blendAlpha=this.blendAlpha),this.depthFunc!==os&&(t.depthFunc=this.depthFunc),this.depthTest===!1&&(t.depthTest=this.depthTest),this.depthWrite===!1&&(t.depthWrite=this.depthWrite),this.colorWrite===!1&&(t.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(t.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Fc&&(t.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(t.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(t.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Qn&&(t.stencilFail=this.stencilFail),this.stencilZFail!==Qn&&(t.stencilZFail=this.stencilZFail),this.stencilZPass!==Qn&&(t.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(t.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(t.rotation=this.rotation),this.polygonOffset===!0&&(t.polygonOffset=!0),this.polygonOffsetFactor!==0&&(t.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(t.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(t.linewidth=this.linewidth),this.dashSize!==void 0&&(t.dashSize=this.dashSize),this.gapSize!==void 0&&(t.gapSize=this.gapSize),this.scale!==void 0&&(t.scale=this.scale),this.dithering===!0&&(t.dithering=!0),this.alphaTest>0&&(t.alphaTest=this.alphaTest),this.alphaHash===!0&&(t.alphaHash=!0),this.alphaToCoverage===!0&&(t.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(t.premultipliedAlpha=!0),this.forceSinglePass===!0&&(t.forceSinglePass=!0),this.wireframe===!0&&(t.wireframe=!0),this.wireframeLinewidth>1&&(t.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(t.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(t.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(t.flatShading=!0),this.visible===!1&&(t.visible=!1),this.toneMapped===!1&&(t.toneMapped=!1),this.fog===!1&&(t.fog=!1),Object.keys(this.userData).length>0&&(t.userData=this.userData);function i(r){const s=[];for(const a in r){const o=r[a];delete o.metadata,s.push(o)}return s}if(A){const r=i(e.textures),s=i(e.images);r.length>0&&(t.textures=r),s.length>0&&(t.images=s)}return t}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const A=e.clippingPlanes;let t=null;if(A!==null){const i=A.length;t=new Array(i);for(let r=0;r!==i;++r)t[r]=A[r].clone()}return this.clippingPlanes=t,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Do extends Ji{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ye(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Rh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const uA=new I,Qr=new ye;class mt{constructor(e,A,t=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=A,this.count=e!==void 0?e.length/A:0,this.normalized=t,this.usage=bc,this.updateRange={offset:0,count:-1},this.gpuType=Xt,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,A,t){e*=this.itemSize,t*=A.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=A.array[t+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let A=0,t=this.count;A<t;A++)Qr.fromBufferAttribute(this,A),Qr.applyMatrix3(e),this.setXY(A,Qr.x,Qr.y);else if(this.itemSize===3)for(let A=0,t=this.count;A<t;A++)uA.fromBufferAttribute(this,A),uA.applyMatrix3(e),this.setXYZ(A,uA.x,uA.y,uA.z);return this}applyMatrix4(e){for(let A=0,t=this.count;A<t;A++)uA.fromBufferAttribute(this,A),uA.applyMatrix4(e),this.setXYZ(A,uA.x,uA.y,uA.z);return this}applyNormalMatrix(e){for(let A=0,t=this.count;A<t;A++)uA.fromBufferAttribute(this,A),uA.applyNormalMatrix(e),this.setXYZ(A,uA.x,uA.y,uA.z);return this}transformDirection(e){for(let A=0,t=this.count;A<t;A++)uA.fromBufferAttribute(this,A),uA.transformDirection(e),this.setXYZ(A,uA.x,uA.y,uA.z);return this}set(e,A=0){return this.array.set(e,A),this}getComponent(e,A){let t=this.array[e*this.itemSize+A];return this.normalized&&(t=Zn(t,this.array)),t}setComponent(e,A,t){return this.normalized&&(t=IA(t,this.array)),this.array[e*this.itemSize+A]=t,this}getX(e){let A=this.array[e*this.itemSize];return this.normalized&&(A=Zn(A,this.array)),A}setX(e,A){return this.normalized&&(A=IA(A,this.array)),this.array[e*this.itemSize]=A,this}getY(e){let A=this.array[e*this.itemSize+1];return this.normalized&&(A=Zn(A,this.array)),A}setY(e,A){return this.normalized&&(A=IA(A,this.array)),this.array[e*this.itemSize+1]=A,this}getZ(e){let A=this.array[e*this.itemSize+2];return this.normalized&&(A=Zn(A,this.array)),A}setZ(e,A){return this.normalized&&(A=IA(A,this.array)),this.array[e*this.itemSize+2]=A,this}getW(e){let A=this.array[e*this.itemSize+3];return this.normalized&&(A=Zn(A,this.array)),A}setW(e,A){return this.normalized&&(A=IA(A,this.array)),this.array[e*this.itemSize+3]=A,this}setXY(e,A,t){return e*=this.itemSize,this.normalized&&(A=IA(A,this.array),t=IA(t,this.array)),this.array[e+0]=A,this.array[e+1]=t,this}setXYZ(e,A,t,i){return e*=this.itemSize,this.normalized&&(A=IA(A,this.array),t=IA(t,this.array),i=IA(i,this.array)),this.array[e+0]=A,this.array[e+1]=t,this.array[e+2]=i,this}setXYZW(e,A,t,i,r){return e*=this.itemSize,this.normalized&&(A=IA(A,this.array),t=IA(t,this.array),i=IA(i,this.array),r=IA(r,this.array)),this.array[e+0]=A,this.array[e+1]=t,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==bc&&(e.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(e.updateRange=this.updateRange),e}}class Jh extends mt{constructor(e,A,t){super(new Uint16Array(e),A,t)}}class qh extends mt{constructor(e,A,t){super(new Uint32Array(e),A,t)}}class NA extends mt{constructor(e,A,t){super(new Float32Array(e),A,t)}}let K_=0;const YA=new wA,ya=new OA,Gn=new I,KA=new Yi,_i=new Yi,BA=new I;class wt extends Cn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:K_++}),this.uuid=li(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Kh(e)?qh:Jh)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,A){return this.attributes[e]=A,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,A,t=0){this.groups.push({start:e,count:A,materialIndex:t})}clearGroups(){this.groups=[]}setDrawRange(e,A){this.drawRange.start=e,this.drawRange.count=A}applyMatrix4(e){const A=this.attributes.position;A!==void 0&&(A.applyMatrix4(e),A.needsUpdate=!0);const t=this.attributes.normal;if(t!==void 0){const r=new Ve().getNormalMatrix(e);t.applyNormalMatrix(r),t.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return YA.makeRotationFromQuaternion(e),this.applyMatrix4(YA),this}rotateX(e){return YA.makeRotationX(e),this.applyMatrix4(YA),this}rotateY(e){return YA.makeRotationY(e),this.applyMatrix4(YA),this}rotateZ(e){return YA.makeRotationZ(e),this.applyMatrix4(YA),this}translate(e,A,t){return YA.makeTranslation(e,A,t),this.applyMatrix4(YA),this}scale(e,A,t){return YA.makeScale(e,A,t),this.applyMatrix4(YA),this}lookAt(e){return ya.lookAt(e),ya.updateMatrix(),this.applyMatrix4(ya.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Gn).negate(),this.translate(Gn.x,Gn.y,Gn.z),this}setFromPoints(e){const A=[];for(let t=0,i=e.length;t<i;t++){const r=e[t];A.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new NA(A,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Yi);const e=this.attributes.position,A=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),A)for(let t=0,i=A.length;t<i;t++){const r=A[t];KA.setFromBufferAttribute(r),this.morphTargetsRelative?(BA.addVectors(this.boundingBox.min,KA.min),this.boundingBox.expandByPoint(BA),BA.addVectors(this.boundingBox.max,KA.max),this.boundingBox.expandByPoint(BA)):(this.boundingBox.expandByPoint(KA.min),this.boundingBox.expandByPoint(KA.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ms);const e=this.attributes.position,A=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new I,1/0);return}if(e){const t=this.boundingSphere.center;if(KA.setFromBufferAttribute(e),A)for(let r=0,s=A.length;r<s;r++){const a=A[r];_i.setFromBufferAttribute(a),this.morphTargetsRelative?(BA.addVectors(KA.min,_i.min),KA.expandByPoint(BA),BA.addVectors(KA.max,_i.max),KA.expandByPoint(BA)):(KA.expandByPoint(_i.min),KA.expandByPoint(_i.max))}KA.getCenter(t);let i=0;for(let r=0,s=e.count;r<s;r++)BA.fromBufferAttribute(e,r),i=Math.max(i,t.distanceToSquared(BA));if(A)for(let r=0,s=A.length;r<s;r++){const a=A[r],o=this.morphTargetsRelative;for(let l=0,c=a.count;l<c;l++)BA.fromBufferAttribute(a,l),o&&(Gn.fromBufferAttribute(e,l),BA.add(Gn)),i=Math.max(i,t.distanceToSquared(BA))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,A=this.attributes;if(e===null||A.position===void 0||A.normal===void 0||A.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const t=e.array,i=A.position.array,r=A.normal.array,s=A.uv.array,a=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new mt(new Float32Array(4*a),4));const o=this.getAttribute("tangent").array,l=[],c=[];for(let M=0;M<a;M++)l[M]=new I,c[M]=new I;const u=new I,h=new I,p=new I,g=new ye,m=new ye,d=new ye,f=new I,v=new I;function B(M,G,Z){u.fromArray(i,M*3),h.fromArray(i,G*3),p.fromArray(i,Z*3),g.fromArray(s,M*2),m.fromArray(s,G*2),d.fromArray(s,Z*2),h.sub(u),p.sub(u),m.sub(g),d.sub(g);const Y=1/(m.x*d.y-d.x*m.y);isFinite(Y)&&(f.copy(h).multiplyScalar(d.y).addScaledVector(p,-m.y).multiplyScalar(Y),v.copy(p).multiplyScalar(m.x).addScaledVector(h,-d.x).multiplyScalar(Y),l[M].add(f),l[G].add(f),l[Z].add(f),c[M].add(v),c[G].add(v),c[Z].add(v))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.length}]);for(let M=0,G=y.length;M<G;++M){const Z=y[M],Y=Z.start,T=Z.count;for(let O=Y,X=Y+T;O<X;O+=3)B(t[O+0],t[O+1],t[O+2])}const C=new I,x=new I,S=new I,R=new I;function _(M){S.fromArray(r,M*3),R.copy(S);const G=l[M];C.copy(G),C.sub(S.multiplyScalar(S.dot(G))).normalize(),x.crossVectors(R,G);const Y=x.dot(c[M])<0?-1:1;o[M*4]=C.x,o[M*4+1]=C.y,o[M*4+2]=C.z,o[M*4+3]=Y}for(let M=0,G=y.length;M<G;++M){const Z=y[M],Y=Z.start,T=Z.count;for(let O=Y,X=Y+T;O<X;O+=3)_(t[O+0]),_(t[O+1]),_(t[O+2])}}computeVertexNormals(){const e=this.index,A=this.getAttribute("position");if(A!==void 0){let t=this.getAttribute("normal");if(t===void 0)t=new mt(new Float32Array(A.count*3),3),this.setAttribute("normal",t);else for(let h=0,p=t.count;h<p;h++)t.setXYZ(h,0,0,0);const i=new I,r=new I,s=new I,a=new I,o=new I,l=new I,c=new I,u=new I;if(e)for(let h=0,p=e.count;h<p;h+=3){const g=e.getX(h+0),m=e.getX(h+1),d=e.getX(h+2);i.fromBufferAttribute(A,g),r.fromBufferAttribute(A,m),s.fromBufferAttribute(A,d),c.subVectors(s,r),u.subVectors(i,r),c.cross(u),a.fromBufferAttribute(t,g),o.fromBufferAttribute(t,m),l.fromBufferAttribute(t,d),a.add(c),o.add(c),l.add(c),t.setXYZ(g,a.x,a.y,a.z),t.setXYZ(m,o.x,o.y,o.z),t.setXYZ(d,l.x,l.y,l.z)}else for(let h=0,p=A.count;h<p;h+=3)i.fromBufferAttribute(A,h+0),r.fromBufferAttribute(A,h+1),s.fromBufferAttribute(A,h+2),c.subVectors(s,r),u.subVectors(i,r),c.cross(u),t.setXYZ(h+0,c.x,c.y,c.z),t.setXYZ(h+1,c.x,c.y,c.z),t.setXYZ(h+2,c.x,c.y,c.z);this.normalizeNormals(),t.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let A=0,t=e.count;A<t;A++)BA.fromBufferAttribute(e,A),BA.normalize(),e.setXYZ(A,BA.x,BA.y,BA.z)}toNonIndexed(){function e(a,o){const l=a.array,c=a.itemSize,u=a.normalized,h=new l.constructor(o.length*c);let p=0,g=0;for(let m=0,d=o.length;m<d;m++){a.isInterleavedBufferAttribute?p=o[m]*a.data.stride+a.offset:p=o[m]*c;for(let f=0;f<c;f++)h[g++]=l[p++]}return new mt(h,c,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const A=new wt,t=this.index.array,i=this.attributes;for(const a in i){const o=i[a],l=e(o,t);A.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const o=[],l=r[a];for(let c=0,u=l.length;c<u;c++){const h=l[c],p=e(h,t);o.push(p)}A.morphAttributes[a]=o}A.morphTargetsRelative=this.morphTargetsRelative;const s=this.groups;for(let a=0,o=s.length;a<o;a++){const l=s[a];A.addGroup(l.start,l.count,l.materialIndex)}return A}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const o=this.parameters;for(const l in o)o[l]!==void 0&&(e[l]=o[l]);return e}e.data={attributes:{}};const A=this.index;A!==null&&(e.data.index={type:A.array.constructor.name,array:Array.prototype.slice.call(A.array)});const t=this.attributes;for(const o in t){const l=t[o];e.data.attributes[o]=l.toJSON(e.data)}const i={};let r=!1;for(const o in this.morphAttributes){const l=this.morphAttributes[o],c=[];for(let u=0,h=l.length;u<h;u++){const p=l[u];c.push(p.toJSON(e.data))}c.length>0&&(i[o]=c,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const A={};this.name=e.name;const t=e.index;t!==null&&this.setIndex(t.clone(A));const i=e.attributes;for(const l in i){const c=i[l];this.setAttribute(l,c.clone(A))}const r=e.morphAttributes;for(const l in r){const c=[],u=r[l];for(let h=0,p=u.length;h<p;h++)c.push(u[h].clone(A));this.morphAttributes[l]=c}this.morphTargetsRelative=e.morphTargetsRelative;const s=e.groups;for(let l=0,c=s.length;l<c;l++){const u=s[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const o=e.boundingSphere;return o!==null&&(this.boundingSphere=o.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Kc=new wA,ln=new Fs,Ir=new Ms,zc=new I,Vn=new I,kn=new I,Kn=new I,Sa=new I,Lr=new I,Rr=new ye,Dr=new ye,Hr=new ye,Wc=new I,Xc=new I,Yc=new I,Pr=new I,Or=new I;class pt extends OA{constructor(e=new wt,A=new Do){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=A,this.updateMorphTargets()}copy(e,A){return super.copy(e,A),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const A=this.geometry.morphAttributes,t=Object.keys(A);if(t.length>0){const i=A[t[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=i.length;r<s;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,A){const t=this.geometry,i=t.attributes.position,r=t.morphAttributes.position,s=t.morphTargetsRelative;A.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(r&&a){Lr.set(0,0,0);for(let o=0,l=r.length;o<l;o++){const c=a[o],u=r[o];c!==0&&(Sa.fromBufferAttribute(u,e),s?Lr.addScaledVector(Sa,c):Lr.addScaledVector(Sa.sub(A),c))}A.add(Lr)}return A}raycast(e,A){const t=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(t.boundingSphere===null&&t.computeBoundingSphere(),Ir.copy(t.boundingSphere),Ir.applyMatrix4(r),ln.copy(e.ray).recast(e.near),!(Ir.containsPoint(ln.origin)===!1&&(ln.intersectSphere(Ir,zc)===null||ln.origin.distanceToSquared(zc)>(e.far-e.near)**2))&&(Kc.copy(r).invert(),ln.copy(e.ray).applyMatrix4(Kc),!(t.boundingBox!==null&&ln.intersectsBox(t.boundingBox)===!1)&&this._computeIntersections(e,A,ln)))}_computeIntersections(e,A,t){let i;const r=this.geometry,s=this.material,a=r.index,o=r.attributes.position,l=r.attributes.uv,c=r.attributes.uv1,u=r.attributes.normal,h=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(s))for(let g=0,m=h.length;g<m;g++){const d=h[g],f=s[d.materialIndex],v=Math.max(d.start,p.start),B=Math.min(a.count,Math.min(d.start+d.count,p.start+p.count));for(let y=v,C=B;y<C;y+=3){const x=a.getX(y),S=a.getX(y+1),R=a.getX(y+2);i=Nr(this,f,e,t,l,c,u,x,S,R),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=d.materialIndex,A.push(i))}}else{const g=Math.max(0,p.start),m=Math.min(a.count,p.start+p.count);for(let d=g,f=m;d<f;d+=3){const v=a.getX(d),B=a.getX(d+1),y=a.getX(d+2);i=Nr(this,s,e,t,l,c,u,v,B,y),i&&(i.faceIndex=Math.floor(d/3),A.push(i))}}else if(o!==void 0)if(Array.isArray(s))for(let g=0,m=h.length;g<m;g++){const d=h[g],f=s[d.materialIndex],v=Math.max(d.start,p.start),B=Math.min(o.count,Math.min(d.start+d.count,p.start+p.count));for(let y=v,C=B;y<C;y+=3){const x=y,S=y+1,R=y+2;i=Nr(this,f,e,t,l,c,u,x,S,R),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=d.materialIndex,A.push(i))}}else{const g=Math.max(0,p.start),m=Math.min(o.count,p.start+p.count);for(let d=g,f=m;d<f;d+=3){const v=d,B=d+1,y=d+2;i=Nr(this,s,e,t,l,c,u,v,B,y),i&&(i.faceIndex=Math.floor(d/3),A.push(i))}}}}function z_(n,e,A,t,i,r,s,a){let o;if(e.side===PA?o=t.intersectTriangle(s,r,i,!0,a):o=t.intersectTriangle(i,r,s,e.side===An,a),o===null)return null;Or.copy(a),Or.applyMatrix4(n.matrixWorld);const l=A.ray.origin.distanceTo(Or);return l<A.near||l>A.far?null:{distance:l,point:Or.clone(),object:n}}function Nr(n,e,A,t,i,r,s,a,o,l){n.getVertexPosition(a,Vn),n.getVertexPosition(o,kn),n.getVertexPosition(l,Kn);const c=z_(n,e,A,t,Vn,kn,Kn,Pr);if(c){i&&(Rr.fromBufferAttribute(i,a),Dr.fromBufferAttribute(i,o),Hr.fromBufferAttribute(i,l),c.uv=st.getInterpolation(Pr,Vn,kn,Kn,Rr,Dr,Hr,new ye)),r&&(Rr.fromBufferAttribute(r,a),Dr.fromBufferAttribute(r,o),Hr.fromBufferAttribute(r,l),c.uv1=st.getInterpolation(Pr,Vn,kn,Kn,Rr,Dr,Hr,new ye),c.uv2=c.uv1),s&&(Wc.fromBufferAttribute(s,a),Xc.fromBufferAttribute(s,o),Yc.fromBufferAttribute(s,l),c.normal=st.getInterpolation(Pr,Vn,kn,Kn,Wc,Xc,Yc,new I),c.normal.dot(t.direction)>0&&c.normal.multiplyScalar(-1));const u={a,b:o,c:l,normal:new I,materialIndex:0};st.getNormal(Vn,kn,Kn,u.normal),c.face=u}return c}class qi extends wt{constructor(e=1,A=1,t=1,i=1,r=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:A,depth:t,widthSegments:i,heightSegments:r,depthSegments:s};const a=this;i=Math.floor(i),r=Math.floor(r),s=Math.floor(s);const o=[],l=[],c=[],u=[];let h=0,p=0;g("z","y","x",-1,-1,t,A,e,s,r,0),g("z","y","x",1,-1,t,A,-e,s,r,1),g("x","z","y",1,1,e,t,A,i,s,2),g("x","z","y",1,-1,e,t,-A,i,s,3),g("x","y","z",1,-1,e,A,t,i,r,4),g("x","y","z",-1,-1,e,A,-t,i,r,5),this.setIndex(o),this.setAttribute("position",new NA(l,3)),this.setAttribute("normal",new NA(c,3)),this.setAttribute("uv",new NA(u,2));function g(m,d,f,v,B,y,C,x,S,R,_){const M=y/S,G=C/R,Z=y/2,Y=C/2,T=x/2,O=S+1,X=R+1;let k=0,j=0;const W=new I;for(let q=0;q<X;q++){const Q=q*G-Y;for(let K=0;K<O;K++){const ae=K*M-Z;W[m]=ae*v,W[d]=Q*B,W[f]=T,l.push(W.x,W.y,W.z),W[m]=0,W[d]=0,W[f]=x>0?1:-1,c.push(W.x,W.y,W.z),u.push(K/S),u.push(1-q/R),k+=1}}for(let q=0;q<R;q++)for(let Q=0;Q<S;Q++){const K=h+Q+O*q,ae=h+Q+O*(q+1),ue=h+(Q+1)+O*(q+1),he=h+(Q+1)+O*q;o.push(K,ae,he),o.push(ae,ue,he),j+=6}a.addGroup(p,j,_),p+=j,h+=k}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ai(n){const e={};for(const A in n){e[A]={};for(const t in n[A]){const i=n[A][t];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[A][t]=null):e[A][t]=i.clone():Array.isArray(i)?e[A][t]=i.slice():e[A][t]=i}}return e}function LA(n){const e={};for(let A=0;A<n.length;A++){const t=ai(n[A]);for(const i in t)e[i]=t[i]}return e}function W_(n){const e=[];for(let A=0;A<n.length;A++)e.push(n[A].clone());return e}function Zh(n){return n.getRenderTarget()===null?n.outputColorSpace:qe.workingColorSpace}const X_={clone:ai,merge:LA};var Y_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,J_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class tn extends Ji{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Y_,this.fragmentShader=J_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ai(e.uniforms),this.uniformsGroups=W_(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const A=super.toJSON(e);A.glslVersion=this.glslVersion,A.uniforms={};for(const i in this.uniforms){const s=this.uniforms[i].value;s&&s.isTexture?A.uniforms[i]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?A.uniforms[i]={type:"c",value:s.getHex()}:s&&s.isVector2?A.uniforms[i]={type:"v2",value:s.toArray()}:s&&s.isVector3?A.uniforms[i]={type:"v3",value:s.toArray()}:s&&s.isVector4?A.uniforms[i]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?A.uniforms[i]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?A.uniforms[i]={type:"m4",value:s.toArray()}:A.uniforms[i]={value:s}}Object.keys(this.defines).length>0&&(A.defines=this.defines),A.vertexShader=this.vertexShader,A.fragmentShader=this.fragmentShader,A.lights=this.lights,A.clipping=this.clipping;const t={};for(const i in this.extensions)this.extensions[i]===!0&&(t[i]=!0);return Object.keys(t).length>0&&(A.extensions=t),A}}class jh extends OA{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new wA,this.projectionMatrix=new wA,this.projectionMatrixInverse=new wA,this.coordinateSystem=bt}copy(e,A){return super.copy(e,A),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,A){super.updateWorldMatrix(e,A),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class jA extends jh{constructor(e=50,A=1,t=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=t,this.far=i,this.focus=10,this.aspect=A,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,A){return super.copy(e,A),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const A=.5*this.getFilmHeight()/e;this.fov=zi*2*Math.atan(A),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Li*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return zi*2*Math.atan(Math.tan(Li*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,A,t,i,r,s){this.aspect=e/A,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=A,this.view.offsetX=t,this.view.offsetY=i,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let A=e*Math.tan(Li*.5*this.fov)/this.zoom,t=2*A,i=this.aspect*t,r=-.5*i;const s=this.view;if(this.view!==null&&this.view.enabled){const o=s.fullWidth,l=s.fullHeight;r+=s.offsetX*i/o,A-=s.offsetY*t/l,i*=s.width/o,t*=s.height/l}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,A,A-t,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const A=super.toJSON(e);return A.object.fov=this.fov,A.object.zoom=this.zoom,A.object.near=this.near,A.object.far=this.far,A.object.focus=this.focus,A.object.aspect=this.aspect,this.view!==null&&(A.object.view=Object.assign({},this.view)),A.object.filmGauge=this.filmGauge,A.object.filmOffset=this.filmOffset,A}}const zn=-90,Wn=1;class q_ extends OA{constructor(e,A,t){super(),this.type="CubeCamera",this.renderTarget=t,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new jA(zn,Wn,e,A);i.layers=this.layers,this.add(i);const r=new jA(zn,Wn,e,A);r.layers=this.layers,this.add(r);const s=new jA(zn,Wn,e,A);s.layers=this.layers,this.add(s);const a=new jA(zn,Wn,e,A);a.layers=this.layers,this.add(a);const o=new jA(zn,Wn,e,A);o.layers=this.layers,this.add(o);const l=new jA(zn,Wn,e,A);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,A=this.children.concat(),[t,i,r,s,a,o]=A;for(const l of A)this.remove(l);if(e===bt)t.up.set(0,1,0),t.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),o.up.set(0,1,0),o.lookAt(0,0,-1);else if(e===hs)t.up.set(0,-1,0),t.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),o.up.set(0,-1,0),o.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of A)this.add(l),l.updateMatrixWorld()}update(e,A){this.parent===null&&this.updateMatrixWorld();const{renderTarget:t,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,s,a,o,l,c]=this.children,u=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const m=t.texture.generateMipmaps;t.texture.generateMipmaps=!1,e.setRenderTarget(t,0,i),e.render(A,r),e.setRenderTarget(t,1,i),e.render(A,s),e.setRenderTarget(t,2,i),e.render(A,a),e.setRenderTarget(t,3,i),e.render(A,o),e.setRenderTarget(t,4,i),e.render(A,l),t.texture.generateMipmaps=m,e.setRenderTarget(t,5,i),e.render(A,c),e.setRenderTarget(u,h,p),e.xr.enabled=g,t.texture.needsPMREMUpdate=!0}}class $h extends WA{constructor(e,A,t,i,r,s,a,o,l,c){e=e!==void 0?e:[],A=A!==void 0?A:ii,super(e,A,t,i,r,s,a,o,l,c),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Z_ extends vn{constructor(e=1,A={}){super(e,e,A),this.isWebGLCubeRenderTarget=!0;const t={width:e,height:e,depth:1},i=[t,t,t,t,t,t];A.encoding!==void 0&&(Di("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),A.colorSpace=A.encoding===wn?EA:$A),this.texture=new $h(i,A.mapping,A.wrapS,A.wrapT,A.magFilter,A.minFilter,A.format,A.type,A.anisotropy,A.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=A.generateMipmaps!==void 0?A.generateMipmaps:!1,this.texture.minFilter=A.minFilter!==void 0?A.minFilter:ZA}fromEquirectangularTexture(e,A){this.texture.type=A.type,this.texture.colorSpace=A.colorSpace,this.texture.generateMipmaps=A.generateMipmaps,this.texture.minFilter=A.minFilter,this.texture.magFilter=A.magFilter;const t={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new qi(5,5,5),r=new tn({name:"CubemapFromEquirect",uniforms:ai(t.uniforms),vertexShader:t.vertexShader,fragmentShader:t.fragmentShader,side:PA,blending:qt});r.uniforms.tEquirect.value=A;const s=new pt(i,r),a=A.minFilter;return A.minFilter===ki&&(A.minFilter=ZA),new q_(1,10,this).update(e,s),A.minFilter=a,s.geometry.dispose(),s.material.dispose(),this}clear(e,A,t,i){const r=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(A,t,i);e.setRenderTarget(r)}}const Ma=new I,j_=new I,$_=new Ve;class Vt{constructor(e=new I(1,0,0),A=0){this.isPlane=!0,this.normal=e,this.constant=A}set(e,A){return this.normal.copy(e),this.constant=A,this}setComponents(e,A,t,i){return this.normal.set(e,A,t),this.constant=i,this}setFromNormalAndCoplanarPoint(e,A){return this.normal.copy(e),this.constant=-A.dot(this.normal),this}setFromCoplanarPoints(e,A,t){const i=Ma.subVectors(t,A).cross(j_.subVectors(e,A)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,A){return A.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,A){const t=e.delta(Ma),i=this.normal.dot(t);if(i===0)return this.distanceToPoint(e.start)===0?A.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:A.copy(e.start).addScaledVector(t,r)}intersectsLine(e){const A=this.distanceToPoint(e.start),t=this.distanceToPoint(e.end);return A<0&&t>0||t<0&&A>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,A){const t=A||$_.getNormalMatrix(e),i=this.coplanarPoint(Ma).applyMatrix4(e),r=this.normal.applyMatrix3(t).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const cn=new Ms,Gr=new I;class ef{constructor(e=new Vt,A=new Vt,t=new Vt,i=new Vt,r=new Vt,s=new Vt){this.planes=[e,A,t,i,r,s]}set(e,A,t,i,r,s){const a=this.planes;return a[0].copy(e),a[1].copy(A),a[2].copy(t),a[3].copy(i),a[4].copy(r),a[5].copy(s),this}copy(e){const A=this.planes;for(let t=0;t<6;t++)A[t].copy(e.planes[t]);return this}setFromProjectionMatrix(e,A=bt){const t=this.planes,i=e.elements,r=i[0],s=i[1],a=i[2],o=i[3],l=i[4],c=i[5],u=i[6],h=i[7],p=i[8],g=i[9],m=i[10],d=i[11],f=i[12],v=i[13],B=i[14],y=i[15];if(t[0].setComponents(o-r,h-l,d-p,y-f).normalize(),t[1].setComponents(o+r,h+l,d+p,y+f).normalize(),t[2].setComponents(o+s,h+c,d+g,y+v).normalize(),t[3].setComponents(o-s,h-c,d-g,y-v).normalize(),t[4].setComponents(o-a,h-u,d-m,y-B).normalize(),A===bt)t[5].setComponents(o+a,h+u,d+m,y+B).normalize();else if(A===hs)t[5].setComponents(a,u,m,B).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+A);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),cn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const A=e.geometry;A.boundingSphere===null&&A.computeBoundingSphere(),cn.copy(A.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(cn)}intersectsSprite(e){return cn.center.set(0,0,0),cn.radius=.7071067811865476,cn.applyMatrix4(e.matrixWorld),this.intersectsSphere(cn)}intersectsSphere(e){const A=this.planes,t=e.center,i=-e.radius;for(let r=0;r<6;r++)if(A[r].distanceToPoint(t)<i)return!1;return!0}intersectsBox(e){const A=this.planes;for(let t=0;t<6;t++){const i=A[t];if(Gr.x=i.normal.x>0?e.max.x:e.min.x,Gr.y=i.normal.y>0?e.max.y:e.min.y,Gr.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Gr)<0)return!1}return!0}containsPoint(e){const A=this.planes;for(let t=0;t<6;t++)if(A[t].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Af(){let n=null,e=!1,A=null,t=null;function i(r,s){A(r,s),t=n.requestAnimationFrame(i)}return{start:function(){e!==!0&&A!==null&&(t=n.requestAnimationFrame(i),e=!0)},stop:function(){n.cancelAnimationFrame(t),e=!1},setAnimationLoop:function(r){A=r},setContext:function(r){n=r}}}function ew(n,e){const A=e.isWebGL2,t=new WeakMap;function i(l,c){const u=l.array,h=l.usage,p=n.createBuffer();n.bindBuffer(c,p),n.bufferData(c,u,h),l.onUploadCallback();let g;if(u instanceof Float32Array)g=n.FLOAT;else if(u instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(A)g=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=n.UNSIGNED_SHORT;else if(u instanceof Int16Array)g=n.SHORT;else if(u instanceof Uint32Array)g=n.UNSIGNED_INT;else if(u instanceof Int32Array)g=n.INT;else if(u instanceof Int8Array)g=n.BYTE;else if(u instanceof Uint8Array)g=n.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)g=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:p,type:g,bytesPerElement:u.BYTES_PER_ELEMENT,version:l.version}}function r(l,c,u){const h=c.array,p=c.updateRange;n.bindBuffer(u,l),p.count===-1?n.bufferSubData(u,0,h):(A?n.bufferSubData(u,p.offset*h.BYTES_PER_ELEMENT,h,p.offset,p.count):n.bufferSubData(u,p.offset*h.BYTES_PER_ELEMENT,h.subarray(p.offset,p.offset+p.count)),p.count=-1),c.onUploadCallback()}function s(l){return l.isInterleavedBufferAttribute&&(l=l.data),t.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);const c=t.get(l);c&&(n.deleteBuffer(c.buffer),t.delete(l))}function o(l,c){if(l.isGLBufferAttribute){const h=t.get(l);(!h||h.version<l.version)&&t.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);const u=t.get(l);u===void 0?t.set(l,i(l,c)):u.version<l.version&&(r(u.buffer,l,c),u.version=l.version)}return{get:s,remove:a,update:o}}class Ho extends wt{constructor(e=1,A=1,t=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:A,widthSegments:t,heightSegments:i};const r=e/2,s=A/2,a=Math.floor(t),o=Math.floor(i),l=a+1,c=o+1,u=e/a,h=A/o,p=[],g=[],m=[],d=[];for(let f=0;f<c;f++){const v=f*h-s;for(let B=0;B<l;B++){const y=B*u-r;g.push(y,-v,0),m.push(0,0,1),d.push(B/a),d.push(1-f/o)}}for(let f=0;f<o;f++)for(let v=0;v<a;v++){const B=v+l*f,y=v+l*(f+1),C=v+1+l*(f+1),x=v+1+l*f;p.push(B,y,x),p.push(y,C,x)}this.setIndex(p),this.setAttribute("position",new NA(g,3)),this.setAttribute("normal",new NA(m,3)),this.setAttribute("uv",new NA(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ho(e.width,e.height,e.widthSegments,e.heightSegments)}}var Aw=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,tw=`#ifdef USE_ALPHAHASH
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
#endif`,nw=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,iw=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,rw=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,sw=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aw=`#ifdef USE_AOMAP
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
#endif`,ow=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,lw=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,cw=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,uw=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,hw=`#ifdef USE_IRIDESCENCE
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
#endif`,fw=`#ifdef USE_BUMPMAP
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
#endif`,dw=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,pw=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,gw=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,mw=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Bw=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,_w=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ww=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,vw=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Ew=`#define PI 3.141592653589793
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
} // validated`,Cw=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,xw=`vec3 transformedNormal = objectNormal;
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
#endif`,Uw=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,yw=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Sw=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Mw=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Fw="gl_FragColor = linearToOutputTexel( gl_FragColor );",bw=`
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
}`,Tw=`#ifdef USE_ENVMAP
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
#endif`,Qw=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Iw=`#ifdef USE_ENVMAP
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
#endif`,Lw=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Rw=`#ifdef USE_ENVMAP
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
#endif`,Dw=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Hw=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Pw=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ow=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Nw=`#ifdef USE_GRADIENTMAP
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
}`,Gw=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Vw=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,kw=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Kw=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,zw=`uniform bool receiveShadow;
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
#endif`,Ww=`#ifdef USE_ENVMAP
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
#endif`,Xw=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Yw=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Jw=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,qw=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Zw=`PhysicalMaterial material;
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
#endif`,jw=`struct PhysicalMaterial {
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
}`,$w=`
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
#endif`,ev=`#if defined( RE_IndirectDiffuse )
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
#endif`,Av=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,tv=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,nv=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,iv=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,rv=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,sv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,av=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ov=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,lv=`#if defined( USE_POINTS_UV )
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
#endif`,cv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,uv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,hv=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,fv=`#ifdef USE_MORPHNORMALS
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
#endif`,dv=`#ifdef USE_MORPHTARGETS
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
#endif`,pv=`#ifdef USE_MORPHTARGETS
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
#endif`,gv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,mv=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Bv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_v=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,wv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,vv=`#ifdef USE_NORMALMAP
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
#endif`,Ev=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Cv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,xv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Uv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,yv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Sv=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Mv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Fv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,bv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Tv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Qv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Iv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Lv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Rv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Dv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Hv=`float getShadowMask() {
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
}`,Pv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ov=`#ifdef USE_SKINNING
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
#endif`,Nv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Gv=`#ifdef USE_SKINNING
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
#endif`,Vv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,kv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Kv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,zv=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Wv=`#ifdef USE_TRANSMISSION
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
#endif`,Xv=`#ifdef USE_TRANSMISSION
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
#endif`,Yv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Jv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,qv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Zv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const jv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,$v=`uniform sampler2D t2D;
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
}`,eE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,AE=`#ifdef ENVMAP_TYPE_CUBE
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
}`,tE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,nE=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,iE=`#include <common>
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
}`,rE=`#if DEPTH_PACKING == 3200
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
}`,sE=`#define DISTANCE
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
}`,aE=`#define DISTANCE
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
}`,oE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,lE=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cE=`uniform float scale;
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
}`,uE=`uniform vec3 diffuse;
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
}`,hE=`#include <common>
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
}`,fE=`uniform vec3 diffuse;
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
}`,dE=`#define LAMBERT
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
}`,pE=`#define LAMBERT
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
}`,gE=`#define MATCAP
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
}`,mE=`#define MATCAP
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
}`,BE=`#define NORMAL
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
}`,_E=`#define NORMAL
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
}`,wE=`#define PHONG
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
}`,vE=`#define PHONG
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
}`,EE=`#define STANDARD
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
}`,CE=`#define STANDARD
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
}`,xE=`#define TOON
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
}`,UE=`#define TOON
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
}`,yE=`uniform float size;
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
}`,SE=`uniform vec3 diffuse;
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
}`,ME=`#include <common>
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
}`,FE=`uniform vec3 color;
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
}`,bE=`uniform float rotation;
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
}`,TE=`uniform vec3 diffuse;
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
}`,Ne={alphahash_fragment:Aw,alphahash_pars_fragment:tw,alphamap_fragment:nw,alphamap_pars_fragment:iw,alphatest_fragment:rw,alphatest_pars_fragment:sw,aomap_fragment:aw,aomap_pars_fragment:ow,begin_vertex:lw,beginnormal_vertex:cw,bsdfs:uw,iridescence_fragment:hw,bumpmap_pars_fragment:fw,clipping_planes_fragment:dw,clipping_planes_pars_fragment:pw,clipping_planes_pars_vertex:gw,clipping_planes_vertex:mw,color_fragment:Bw,color_pars_fragment:_w,color_pars_vertex:ww,color_vertex:vw,common:Ew,cube_uv_reflection_fragment:Cw,defaultnormal_vertex:xw,displacementmap_pars_vertex:Uw,displacementmap_vertex:yw,emissivemap_fragment:Sw,emissivemap_pars_fragment:Mw,colorspace_fragment:Fw,colorspace_pars_fragment:bw,envmap_fragment:Tw,envmap_common_pars_fragment:Qw,envmap_pars_fragment:Iw,envmap_pars_vertex:Lw,envmap_physical_pars_fragment:Ww,envmap_vertex:Rw,fog_vertex:Dw,fog_pars_vertex:Hw,fog_fragment:Pw,fog_pars_fragment:Ow,gradientmap_pars_fragment:Nw,lightmap_fragment:Gw,lightmap_pars_fragment:Vw,lights_lambert_fragment:kw,lights_lambert_pars_fragment:Kw,lights_pars_begin:zw,lights_toon_fragment:Xw,lights_toon_pars_fragment:Yw,lights_phong_fragment:Jw,lights_phong_pars_fragment:qw,lights_physical_fragment:Zw,lights_physical_pars_fragment:jw,lights_fragment_begin:$w,lights_fragment_maps:ev,lights_fragment_end:Av,logdepthbuf_fragment:tv,logdepthbuf_pars_fragment:nv,logdepthbuf_pars_vertex:iv,logdepthbuf_vertex:rv,map_fragment:sv,map_pars_fragment:av,map_particle_fragment:ov,map_particle_pars_fragment:lv,metalnessmap_fragment:cv,metalnessmap_pars_fragment:uv,morphcolor_vertex:hv,morphnormal_vertex:fv,morphtarget_pars_vertex:dv,morphtarget_vertex:pv,normal_fragment_begin:gv,normal_fragment_maps:mv,normal_pars_fragment:Bv,normal_pars_vertex:_v,normal_vertex:wv,normalmap_pars_fragment:vv,clearcoat_normal_fragment_begin:Ev,clearcoat_normal_fragment_maps:Cv,clearcoat_pars_fragment:xv,iridescence_pars_fragment:Uv,opaque_fragment:yv,packing:Sv,premultiplied_alpha_fragment:Mv,project_vertex:Fv,dithering_fragment:bv,dithering_pars_fragment:Tv,roughnessmap_fragment:Qv,roughnessmap_pars_fragment:Iv,shadowmap_pars_fragment:Lv,shadowmap_pars_vertex:Rv,shadowmap_vertex:Dv,shadowmask_pars_fragment:Hv,skinbase_vertex:Pv,skinning_pars_vertex:Ov,skinning_vertex:Nv,skinnormal_vertex:Gv,specularmap_fragment:Vv,specularmap_pars_fragment:kv,tonemapping_fragment:Kv,tonemapping_pars_fragment:zv,transmission_fragment:Wv,transmission_pars_fragment:Xv,uv_pars_fragment:Yv,uv_pars_vertex:Jv,uv_vertex:qv,worldpos_vertex:Zv,background_vert:jv,background_frag:$v,backgroundCube_vert:eE,backgroundCube_frag:AE,cube_vert:tE,cube_frag:nE,depth_vert:iE,depth_frag:rE,distanceRGBA_vert:sE,distanceRGBA_frag:aE,equirect_vert:oE,equirect_frag:lE,linedashed_vert:cE,linedashed_frag:uE,meshbasic_vert:hE,meshbasic_frag:fE,meshlambert_vert:dE,meshlambert_frag:pE,meshmatcap_vert:gE,meshmatcap_frag:mE,meshnormal_vert:BE,meshnormal_frag:_E,meshphong_vert:wE,meshphong_frag:vE,meshphysical_vert:EE,meshphysical_frag:CE,meshtoon_vert:xE,meshtoon_frag:UE,points_vert:yE,points_frag:SE,shadow_vert:ME,shadow_frag:FE,sprite_vert:bE,sprite_frag:TE},ce={common:{diffuse:{value:new Ye(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new ye(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ye(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ye(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new Ye(16777215)},opacity:{value:1},center:{value:new ye(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},ft={basic:{uniforms:LA([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.fog]),vertexShader:Ne.meshbasic_vert,fragmentShader:Ne.meshbasic_frag},lambert:{uniforms:LA([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new Ye(0)}}]),vertexShader:Ne.meshlambert_vert,fragmentShader:Ne.meshlambert_frag},phong:{uniforms:LA([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new Ye(0)},specular:{value:new Ye(1118481)},shininess:{value:30}}]),vertexShader:Ne.meshphong_vert,fragmentShader:Ne.meshphong_frag},standard:{uniforms:LA([ce.common,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.roughnessmap,ce.metalnessmap,ce.fog,ce.lights,{emissive:{value:new Ye(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag},toon:{uniforms:LA([ce.common,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.gradientmap,ce.fog,ce.lights,{emissive:{value:new Ye(0)}}]),vertexShader:Ne.meshtoon_vert,fragmentShader:Ne.meshtoon_frag},matcap:{uniforms:LA([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,{matcap:{value:null}}]),vertexShader:Ne.meshmatcap_vert,fragmentShader:Ne.meshmatcap_frag},points:{uniforms:LA([ce.points,ce.fog]),vertexShader:Ne.points_vert,fragmentShader:Ne.points_frag},dashed:{uniforms:LA([ce.common,ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ne.linedashed_vert,fragmentShader:Ne.linedashed_frag},depth:{uniforms:LA([ce.common,ce.displacementmap]),vertexShader:Ne.depth_vert,fragmentShader:Ne.depth_frag},normal:{uniforms:LA([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,{opacity:{value:1}}]),vertexShader:Ne.meshnormal_vert,fragmentShader:Ne.meshnormal_frag},sprite:{uniforms:LA([ce.sprite,ce.fog]),vertexShader:Ne.sprite_vert,fragmentShader:Ne.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ne.background_vert,fragmentShader:Ne.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ne.backgroundCube_vert,fragmentShader:Ne.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ne.cube_vert,fragmentShader:Ne.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ne.equirect_vert,fragmentShader:Ne.equirect_frag},distanceRGBA:{uniforms:LA([ce.common,ce.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ne.distanceRGBA_vert,fragmentShader:Ne.distanceRGBA_frag},shadow:{uniforms:LA([ce.lights,ce.fog,{color:{value:new Ye(0)},opacity:{value:1}}]),vertexShader:Ne.shadow_vert,fragmentShader:Ne.shadow_frag}};ft.physical={uniforms:LA([ft.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new ye(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new Ye(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new ye},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new Ye(0)},specularColor:{value:new Ye(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new ye},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag};const Vr={r:0,b:0,g:0};function QE(n,e,A,t,i,r,s){const a=new Ye(0);let o=r===!0?0:1,l,c,u=null,h=0,p=null;function g(d,f){let v=!1,B=f.isScene===!0?f.background:null;B&&B.isTexture&&(B=(f.backgroundBlurriness>0?A:e).get(B)),B===null?m(a,o):B&&B.isColor&&(m(B,1),v=!0);const y=n.xr.getEnvironmentBlendMode();y==="additive"?t.buffers.color.setClear(0,0,0,1,s):y==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||v)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),B&&(B.isCubeTexture||B.mapping===ys)?(c===void 0&&(c=new pt(new qi(1,1,1),new tn({name:"BackgroundCubeMaterial",uniforms:ai(ft.backgroundCube.uniforms),vertexShader:ft.backgroundCube.vertexShader,fragmentShader:ft.backgroundCube.fragmentShader,side:PA,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(C,x,S){this.matrixWorld.copyPosition(S.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=B,c.material.uniforms.flipEnvMap.value=B.isCubeTexture&&B.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=f.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,c.material.toneMapped=qe.getTransfer(B.colorSpace)!==AA,(u!==B||h!==B.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,u=B,h=B.version,p=n.toneMapping),c.layers.enableAll(),d.unshift(c,c.geometry,c.material,0,0,null)):B&&B.isTexture&&(l===void 0&&(l=new pt(new Ho(2,2),new tn({name:"BackgroundMaterial",uniforms:ai(ft.background.uniforms),vertexShader:ft.background.vertexShader,fragmentShader:ft.background.fragmentShader,side:An,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=B,l.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,l.material.toneMapped=qe.getTransfer(B.colorSpace)!==AA,B.matrixAutoUpdate===!0&&B.updateMatrix(),l.material.uniforms.uvTransform.value.copy(B.matrix),(u!==B||h!==B.version||p!==n.toneMapping)&&(l.material.needsUpdate=!0,u=B,h=B.version,p=n.toneMapping),l.layers.enableAll(),d.unshift(l,l.geometry,l.material,0,0,null))}function m(d,f){d.getRGB(Vr,Zh(n)),t.buffers.color.setClear(Vr.r,Vr.g,Vr.b,f,s)}return{getClearColor:function(){return a},setClearColor:function(d,f=1){a.set(d),o=f,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(d){o=d,m(a,o)},render:g}}function IE(n,e,A,t){const i=n.getParameter(n.MAX_VERTEX_ATTRIBS),r=t.isWebGL2?null:e.get("OES_vertex_array_object"),s=t.isWebGL2||r!==null,a={},o=d(null);let l=o,c=!1;function u(T,O,X,k,j){let W=!1;if(s){const q=m(k,X,O);l!==q&&(l=q,p(l.object)),W=f(T,k,X,j),W&&v(T,k,X,j)}else{const q=O.wireframe===!0;(l.geometry!==k.id||l.program!==X.id||l.wireframe!==q)&&(l.geometry=k.id,l.program=X.id,l.wireframe=q,W=!0)}j!==null&&A.update(j,n.ELEMENT_ARRAY_BUFFER),(W||c)&&(c=!1,R(T,O,X,k),j!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,A.get(j).buffer))}function h(){return t.isWebGL2?n.createVertexArray():r.createVertexArrayOES()}function p(T){return t.isWebGL2?n.bindVertexArray(T):r.bindVertexArrayOES(T)}function g(T){return t.isWebGL2?n.deleteVertexArray(T):r.deleteVertexArrayOES(T)}function m(T,O,X){const k=X.wireframe===!0;let j=a[T.id];j===void 0&&(j={},a[T.id]=j);let W=j[O.id];W===void 0&&(W={},j[O.id]=W);let q=W[k];return q===void 0&&(q=d(h()),W[k]=q),q}function d(T){const O=[],X=[],k=[];for(let j=0;j<i;j++)O[j]=0,X[j]=0,k[j]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:X,attributeDivisors:k,object:T,attributes:{},index:null}}function f(T,O,X,k){const j=l.attributes,W=O.attributes;let q=0;const Q=X.getAttributes();for(const K in Q)if(Q[K].location>=0){const ue=j[K];let he=W[K];if(he===void 0&&(K==="instanceMatrix"&&T.instanceMatrix&&(he=T.instanceMatrix),K==="instanceColor"&&T.instanceColor&&(he=T.instanceColor)),ue===void 0||ue.attribute!==he||he&&ue.data!==he.data)return!0;q++}return l.attributesNum!==q||l.index!==k}function v(T,O,X,k){const j={},W=O.attributes;let q=0;const Q=X.getAttributes();for(const K in Q)if(Q[K].location>=0){let ue=W[K];ue===void 0&&(K==="instanceMatrix"&&T.instanceMatrix&&(ue=T.instanceMatrix),K==="instanceColor"&&T.instanceColor&&(ue=T.instanceColor));const he={};he.attribute=ue,ue&&ue.data&&(he.data=ue.data),j[K]=he,q++}l.attributes=j,l.attributesNum=q,l.index=k}function B(){const T=l.newAttributes;for(let O=0,X=T.length;O<X;O++)T[O]=0}function y(T){C(T,0)}function C(T,O){const X=l.newAttributes,k=l.enabledAttributes,j=l.attributeDivisors;X[T]=1,k[T]===0&&(n.enableVertexAttribArray(T),k[T]=1),j[T]!==O&&((t.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[t.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](T,O),j[T]=O)}function x(){const T=l.newAttributes,O=l.enabledAttributes;for(let X=0,k=O.length;X<k;X++)O[X]!==T[X]&&(n.disableVertexAttribArray(X),O[X]=0)}function S(T,O,X,k,j,W,q){q===!0?n.vertexAttribIPointer(T,O,X,j,W):n.vertexAttribPointer(T,O,X,k,j,W)}function R(T,O,X,k){if(t.isWebGL2===!1&&(T.isInstancedMesh||k.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;B();const j=k.attributes,W=X.getAttributes(),q=O.defaultAttributeValues;for(const Q in W){const K=W[Q];if(K.location>=0){let ae=j[Q];if(ae===void 0&&(Q==="instanceMatrix"&&T.instanceMatrix&&(ae=T.instanceMatrix),Q==="instanceColor"&&T.instanceColor&&(ae=T.instanceColor)),ae!==void 0){const ue=ae.normalized,he=ae.itemSize,Ee=A.get(ae);if(Ee===void 0)continue;const Ie=Ee.buffer,Fe=Ee.type,Le=Ee.bytesPerElement,eA=t.isWebGL2===!0&&(Fe===n.INT||Fe===n.UNSIGNED_INT||ae.gpuType===Hh);if(ae.isInterleavedBufferAttribute){const Oe=ae.data,D=Oe.stride,UA=ae.offset;if(Oe.isInstancedInterleavedBuffer){for(let xe=0;xe<K.locationSize;xe++)C(K.location+xe,Oe.meshPerAttribute);T.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=Oe.meshPerAttribute*Oe.count)}else for(let xe=0;xe<K.locationSize;xe++)y(K.location+xe);n.bindBuffer(n.ARRAY_BUFFER,Ie);for(let xe=0;xe<K.locationSize;xe++)S(K.location+xe,he/K.locationSize,Fe,ue,D*Le,(UA+he/K.locationSize*xe)*Le,eA)}else{if(ae.isInstancedBufferAttribute){for(let Oe=0;Oe<K.locationSize;Oe++)C(K.location+Oe,ae.meshPerAttribute);T.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let Oe=0;Oe<K.locationSize;Oe++)y(K.location+Oe);n.bindBuffer(n.ARRAY_BUFFER,Ie);for(let Oe=0;Oe<K.locationSize;Oe++)S(K.location+Oe,he/K.locationSize,Fe,ue,he*Le,he/K.locationSize*Oe*Le,eA)}}else if(q!==void 0){const ue=q[Q];if(ue!==void 0)switch(ue.length){case 2:n.vertexAttrib2fv(K.location,ue);break;case 3:n.vertexAttrib3fv(K.location,ue);break;case 4:n.vertexAttrib4fv(K.location,ue);break;default:n.vertexAttrib1fv(K.location,ue)}}}}x()}function _(){Z();for(const T in a){const O=a[T];for(const X in O){const k=O[X];for(const j in k)g(k[j].object),delete k[j];delete O[X]}delete a[T]}}function M(T){if(a[T.id]===void 0)return;const O=a[T.id];for(const X in O){const k=O[X];for(const j in k)g(k[j].object),delete k[j];delete O[X]}delete a[T.id]}function G(T){for(const O in a){const X=a[O];if(X[T.id]===void 0)continue;const k=X[T.id];for(const j in k)g(k[j].object),delete k[j];delete X[T.id]}}function Z(){Y(),c=!0,l!==o&&(l=o,p(l.object))}function Y(){o.geometry=null,o.program=null,o.wireframe=!1}return{setup:u,reset:Z,resetDefaultState:Y,dispose:_,releaseStatesOfGeometry:M,releaseStatesOfProgram:G,initAttributes:B,enableAttribute:y,disableUnusedAttributes:x}}function LE(n,e,A,t){const i=t.isWebGL2;let r;function s(l){r=l}function a(l,c){n.drawArrays(r,l,c),A.update(c,r,1)}function o(l,c,u){if(u===0)return;let h,p;if(i)h=n,p="drawArraysInstanced";else if(h=e.get("ANGLE_instanced_arrays"),p="drawArraysInstancedANGLE",h===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}h[p](r,l,c,u),A.update(c,r,u)}this.setMode=s,this.render=a,this.renderInstances=o}function RE(n,e,A){let t;function i(){if(t!==void 0)return t;if(e.has("EXT_texture_filter_anisotropic")===!0){const S=e.get("EXT_texture_filter_anisotropic");t=n.getParameter(S.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else t=0;return t}function r(S){if(S==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";S="mediump"}return S==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const s=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext";let a=A.precision!==void 0?A.precision:"highp";const o=r(a);o!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",o,"instead."),a=o);const l=s||e.has("WEBGL_draw_buffers"),c=A.logarithmicDepthBuffer===!0,u=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),h=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),d=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),f=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),B=h>0,y=s||e.has("OES_texture_float"),C=B&&y,x=s?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:s,drawBuffers:l,getMaxAnisotropy:i,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:c,maxTextures:u,maxVertexTextures:h,maxTextureSize:p,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:d,maxVaryings:f,maxFragmentUniforms:v,vertexTextures:B,floatFragmentTextures:y,floatVertexTextures:C,maxSamples:x}}function DE(n){const e=this;let A=null,t=0,i=!1,r=!1;const s=new Vt,a=new Ve,o={value:null,needsUpdate:!1};this.uniform=o,this.numPlanes=0,this.numIntersection=0,this.init=function(u,h){const p=u.length!==0||h||t!==0||i;return i=h,t=u.length,p},this.beginShadows=function(){r=!0,c(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,h){A=c(u,h,0)},this.setState=function(u,h,p){const g=u.clippingPlanes,m=u.clipIntersection,d=u.clipShadows,f=n.get(u);if(!i||g===null||g.length===0||r&&!d)r?c(null):l();else{const v=r?0:t,B=v*4;let y=f.clippingState||null;o.value=y,y=c(g,h,B,p);for(let C=0;C!==B;++C)y[C]=A[C];f.clippingState=y,this.numIntersection=m?this.numPlanes:0,this.numPlanes+=v}};function l(){o.value!==A&&(o.value=A,o.needsUpdate=t>0),e.numPlanes=t,e.numIntersection=0}function c(u,h,p,g){const m=u!==null?u.length:0;let d=null;if(m!==0){if(d=o.value,g!==!0||d===null){const f=p+m*4,v=h.matrixWorldInverse;a.getNormalMatrix(v),(d===null||d.length<f)&&(d=new Float32Array(f));for(let B=0,y=p;B!==m;++B,y+=4)s.copy(u[B]).applyMatrix4(v,a),s.normal.toArray(d,y),d[y+3]=s.constant}o.value=d,o.needsUpdate=!0}return e.numPlanes=m,e.numIntersection=0,d}}function HE(n){let e=new WeakMap;function A(s,a){return a===ho?s.mapping=ii:a===fo&&(s.mapping=ri),s}function t(s){if(s&&s.isTexture&&s.isRenderTargetTexture===!1){const a=s.mapping;if(a===ho||a===fo)if(e.has(s)){const o=e.get(s).texture;return A(o,s.mapping)}else{const o=s.image;if(o&&o.height>0){const l=new Z_(o.height/2);return l.fromEquirectangularTexture(n,s),e.set(s,l),s.addEventListener("dispose",i),A(l.texture,s.mapping)}else return null}}return s}function i(s){const a=s.target;a.removeEventListener("dispose",i);const o=e.get(a);o!==void 0&&(e.delete(a),o.dispose())}function r(){e=new WeakMap}return{get:t,dispose:r}}class PE extends jh{constructor(e=-1,A=1,t=1,i=-1,r=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=A,this.top=t,this.bottom=i,this.near=r,this.far=s,this.updateProjectionMatrix()}copy(e,A){return super.copy(e,A),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,A,t,i,r,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=A,this.view.offsetX=t,this.view.offsetY=i,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),A=(this.top-this.bottom)/(2*this.zoom),t=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=t-e,s=t+e,a=i+A,o=i-A;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,s=r+l*this.view.width,a-=c*this.view.offsetY,o=a-c*this.view.height}this.projectionMatrix.makeOrthographic(r,s,a,o,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const A=super.toJSON(e);return A.object.zoom=this.zoom,A.object.left=this.left,A.object.right=this.right,A.object.top=this.top,A.object.bottom=this.bottom,A.object.near=this.near,A.object.far=this.far,this.view!==null&&(A.object.view=Object.assign({},this.view)),A}}const $n=4,Jc=[.125,.215,.35,.446,.526,.582],dn=20,Fa=new PE,qc=new Ye;let ba=null,Ta=0,Qa=0;const un=(1+Math.sqrt(5))/2,Xn=1/un,Zc=[new I(1,1,1),new I(-1,1,1),new I(1,1,-1),new I(-1,1,-1),new I(0,un,Xn),new I(0,un,-Xn),new I(Xn,0,un),new I(-Xn,0,un),new I(un,Xn,0),new I(-un,Xn,0)];class jc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,A=0,t=.1,i=100){ba=this._renderer.getRenderTarget(),Ta=this._renderer.getActiveCubeFace(),Qa=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,t,i,r),A>0&&this._blur(r,0,0,A),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,A=null){return this._fromTexture(e,A)}fromCubemap(e,A=null){return this._fromTexture(e,A)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Au(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=eu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ba,Ta,Qa),e.scissorTest=!1,kr(e,0,0,e.width,e.height)}_fromTexture(e,A){e.mapping===ii||e.mapping===ri?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ba=this._renderer.getRenderTarget(),Ta=this._renderer.getActiveCubeFace(),Qa=this._renderer.getActiveMipmapLevel();const t=A||this._allocateTargets();return this._textureToCubeUV(e,t),this._applyPMREM(t),this._cleanup(t),t}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),A=4*this._cubeSize,t={magFilter:ZA,minFilter:ZA,generateMipmaps:!1,type:Ki,format:lt,colorSpace:It,depthBuffer:!1},i=$c(e,A,t);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==A){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=$c(e,A,t);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=OE(r)),this._blurMaterial=NE(r,e,A)}return i}_compileMaterial(e){const A=new pt(this._lodPlanes[0],e);this._renderer.compile(A,Fa)}_sceneToCubeUV(e,A,t,i){const a=new jA(90,1,A,t),o=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],c=this._renderer,u=c.autoClear,h=c.toneMapping;c.getClearColor(qc),c.toneMapping=Zt,c.autoClear=!1;const p=new Do({name:"PMREM.Background",side:PA,depthWrite:!1,depthTest:!1}),g=new pt(new qi,p);let m=!1;const d=e.background;d?d.isColor&&(p.color.copy(d),e.background=null,m=!0):(p.color.copy(qc),m=!0);for(let f=0;f<6;f++){const v=f%3;v===0?(a.up.set(0,o[f],0),a.lookAt(l[f],0,0)):v===1?(a.up.set(0,0,o[f]),a.lookAt(0,l[f],0)):(a.up.set(0,o[f],0),a.lookAt(0,0,l[f]));const B=this._cubeSize;kr(i,v*B,f>2?B:0,B,B),c.setRenderTarget(i),m&&c.render(g,a),c.render(e,a)}g.geometry.dispose(),g.material.dispose(),c.toneMapping=h,c.autoClear=u,e.background=d}_textureToCubeUV(e,A){const t=this._renderer,i=e.mapping===ii||e.mapping===ri;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Au()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=eu());const r=i?this._cubemapMaterial:this._equirectMaterial,s=new pt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const o=this._cubeSize;kr(A,0,0,3*o,2*o),t.setRenderTarget(A),t.render(s,Fa)}_applyPMREM(e){const A=this._renderer,t=A.autoClear;A.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const r=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),s=Zc[(i-1)%Zc.length];this._blur(e,i-1,i,r,s)}A.autoClear=t}_blur(e,A,t,i,r){const s=this._pingPongRenderTarget;this._halfBlur(e,s,A,t,i,"latitudinal",r),this._halfBlur(s,e,t,t,i,"longitudinal",r)}_halfBlur(e,A,t,i,r,s,a){const o=this._renderer,l=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const c=3,u=new pt(this._lodPlanes[i],l),h=l.uniforms,p=this._sizeLods[t]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*dn-1),m=r/g,d=isFinite(r)?1+Math.floor(c*m):dn;d>dn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${d} samples when the maximum is set to ${dn}`);const f=[];let v=0;for(let S=0;S<dn;++S){const R=S/m,_=Math.exp(-R*R/2);f.push(_),S===0?v+=_:S<d&&(v+=2*_)}for(let S=0;S<f.length;S++)f[S]=f[S]/v;h.envMap.value=e.texture,h.samples.value=d,h.weights.value=f,h.latitudinal.value=s==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:B}=this;h.dTheta.value=g,h.mipInt.value=B-t;const y=this._sizeLods[i],C=3*y*(i>B-$n?i-B+$n:0),x=4*(this._cubeSize-y);kr(A,C,x,3*y,2*y),o.setRenderTarget(A),o.render(u,Fa)}}function OE(n){const e=[],A=[],t=[];let i=n;const r=n-$n+1+Jc.length;for(let s=0;s<r;s++){const a=Math.pow(2,i);A.push(a);let o=1/a;s>n-$n?o=Jc[s-n+$n-1]:s===0&&(o=0),t.push(o);const l=1/(a-2),c=-l,u=1+l,h=[c,c,u,c,u,u,c,c,u,u,c,u],p=6,g=6,m=3,d=2,f=1,v=new Float32Array(m*g*p),B=new Float32Array(d*g*p),y=new Float32Array(f*g*p);for(let x=0;x<p;x++){const S=x%3*2/3-1,R=x>2?0:-1,_=[S,R,0,S+2/3,R,0,S+2/3,R+1,0,S,R,0,S+2/3,R+1,0,S,R+1,0];v.set(_,m*g*x),B.set(h,d*g*x);const M=[x,x,x,x,x,x];y.set(M,f*g*x)}const C=new wt;C.setAttribute("position",new mt(v,m)),C.setAttribute("uv",new mt(B,d)),C.setAttribute("faceIndex",new mt(y,f)),e.push(C),i>$n&&i--}return{lodPlanes:e,sizeLods:A,sigmas:t}}function $c(n,e,A){const t=new vn(n,e,A);return t.texture.mapping=ys,t.texture.name="PMREM.cubeUv",t.scissorTest=!0,t}function kr(n,e,A,t,i){n.viewport.set(e,A,t,i),n.scissor.set(e,A,t,i)}function NE(n,e,A){const t=new Float32Array(dn),i=new I(0,1,0);return new tn({name:"SphericalGaussianBlur",defines:{n:dn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/A,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:t},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Po(),fragmentShader:`

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
		`,blending:qt,depthTest:!1,depthWrite:!1})}function eu(){return new tn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Po(),fragmentShader:`

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
		`,blending:qt,depthTest:!1,depthWrite:!1})}function Au(){return new tn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Po(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:qt,depthTest:!1,depthWrite:!1})}function Po(){return`

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
	`}function GE(n){let e=new WeakMap,A=null;function t(a){if(a&&a.isTexture){const o=a.mapping,l=o===ho||o===fo,c=o===ii||o===ri;if(l||c)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let u=e.get(a);return A===null&&(A=new jc(n)),u=l?A.fromEquirectangular(a,u):A.fromCubemap(a,u),e.set(a,u),u.texture}else{if(e.has(a))return e.get(a).texture;{const u=a.image;if(l&&u&&u.height>0||c&&u&&i(u)){A===null&&(A=new jc(n));const h=l?A.fromEquirectangular(a):A.fromCubemap(a);return e.set(a,h),a.addEventListener("dispose",r),h.texture}else return null}}}return a}function i(a){let o=0;const l=6;for(let c=0;c<l;c++)a[c]!==void 0&&o++;return o===l}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap,A!==null&&(A.dispose(),A=null)}return{get:t,dispose:s}}function VE(n){const e={};function A(t){if(e[t]!==void 0)return e[t];let i;switch(t){case"WEBGL_depth_texture":i=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=n.getExtension(t)}return e[t]=i,i}return{has:function(t){return A(t)!==null},init:function(t){t.isWebGL2?A("EXT_color_buffer_float"):(A("WEBGL_depth_texture"),A("OES_texture_float"),A("OES_texture_half_float"),A("OES_texture_half_float_linear"),A("OES_standard_derivatives"),A("OES_element_index_uint"),A("OES_vertex_array_object"),A("ANGLE_instanced_arrays")),A("OES_texture_float_linear"),A("EXT_color_buffer_half_float"),A("WEBGL_multisampled_render_to_texture")},get:function(t){const i=A(t);return i===null&&console.warn("THREE.WebGLRenderer: "+t+" extension not supported."),i}}}function kE(n,e,A,t){const i={},r=new WeakMap;function s(u){const h=u.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);for(const g in h.morphAttributes){const m=h.morphAttributes[g];for(let d=0,f=m.length;d<f;d++)e.remove(m[d])}h.removeEventListener("dispose",s),delete i[h.id];const p=r.get(h);p&&(e.remove(p),r.delete(h)),t.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,A.memory.geometries--}function a(u,h){return i[h.id]===!0||(h.addEventListener("dispose",s),i[h.id]=!0,A.memory.geometries++),h}function o(u){const h=u.attributes;for(const g in h)e.update(h[g],n.ARRAY_BUFFER);const p=u.morphAttributes;for(const g in p){const m=p[g];for(let d=0,f=m.length;d<f;d++)e.update(m[d],n.ARRAY_BUFFER)}}function l(u){const h=[],p=u.index,g=u.attributes.position;let m=0;if(p!==null){const v=p.array;m=p.version;for(let B=0,y=v.length;B<y;B+=3){const C=v[B+0],x=v[B+1],S=v[B+2];h.push(C,x,x,S,S,C)}}else if(g!==void 0){const v=g.array;m=g.version;for(let B=0,y=v.length/3-1;B<y;B+=3){const C=B+0,x=B+1,S=B+2;h.push(C,x,x,S,S,C)}}else return;const d=new(Kh(h)?qh:Jh)(h,1);d.version=m;const f=r.get(u);f&&e.remove(f),r.set(u,d)}function c(u){const h=r.get(u);if(h){const p=u.index;p!==null&&h.version<p.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:o,getWireframeAttribute:c}}function KE(n,e,A,t){const i=t.isWebGL2;let r;function s(h){r=h}let a,o;function l(h){a=h.type,o=h.bytesPerElement}function c(h,p){n.drawElements(r,p,a,h*o),A.update(p,r,1)}function u(h,p,g){if(g===0)return;let m,d;if(i)m=n,d="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),d="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[d](r,p,a,h*o,g),A.update(p,r,g)}this.setMode=s,this.setIndex=l,this.render=c,this.renderInstances=u}function zE(n){const e={geometries:0,textures:0},A={frame:0,calls:0,triangles:0,points:0,lines:0};function t(r,s,a){switch(A.calls++,s){case n.TRIANGLES:A.triangles+=a*(r/3);break;case n.LINES:A.lines+=a*(r/2);break;case n.LINE_STRIP:A.lines+=a*(r-1);break;case n.LINE_LOOP:A.lines+=a*r;break;case n.POINTS:A.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",s);break}}function i(){A.calls=0,A.triangles=0,A.points=0,A.lines=0}return{memory:e,render:A,programs:null,autoReset:!0,reset:i,update:t}}function WE(n,e){return n[0]-e[0]}function XE(n,e){return Math.abs(e[1])-Math.abs(n[1])}function YE(n,e,A){const t={},i=new Float32Array(8),r=new WeakMap,s=new xA,a=[];for(let l=0;l<8;l++)a[l]=[l,0];function o(l,c,u){const h=l.morphTargetInfluences;if(e.isWebGL2===!0){const p=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,g=p!==void 0?p.length:0;let m=r.get(c);if(m===void 0||m.count!==g){let T=function(){Z.dispose(),r.delete(c),c.removeEventListener("dispose",T)};m!==void 0&&m.texture.dispose();const v=c.morphAttributes.position!==void 0,B=c.morphAttributes.normal!==void 0,y=c.morphAttributes.color!==void 0,C=c.morphAttributes.position||[],x=c.morphAttributes.normal||[],S=c.morphAttributes.color||[];let R=0;v===!0&&(R=1),B===!0&&(R=2),y===!0&&(R=3);let _=c.attributes.position.count*R,M=1;_>e.maxTextureSize&&(M=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);const G=new Float32Array(_*M*4*g),Z=new Xh(G,_,M,g);Z.type=Xt,Z.needsUpdate=!0;const Y=R*4;for(let O=0;O<g;O++){const X=C[O],k=x[O],j=S[O],W=_*M*4*O;for(let q=0;q<X.count;q++){const Q=q*Y;v===!0&&(s.fromBufferAttribute(X,q),G[W+Q+0]=s.x,G[W+Q+1]=s.y,G[W+Q+2]=s.z,G[W+Q+3]=0),B===!0&&(s.fromBufferAttribute(k,q),G[W+Q+4]=s.x,G[W+Q+5]=s.y,G[W+Q+6]=s.z,G[W+Q+7]=0),y===!0&&(s.fromBufferAttribute(j,q),G[W+Q+8]=s.x,G[W+Q+9]=s.y,G[W+Q+10]=s.z,G[W+Q+11]=j.itemSize===4?s.w:1)}}m={count:g,texture:Z,size:new ye(_,M)},r.set(c,m),c.addEventListener("dispose",T)}let d=0;for(let v=0;v<h.length;v++)d+=h[v];const f=c.morphTargetsRelative?1:1-d;u.getUniforms().setValue(n,"morphTargetBaseInfluence",f),u.getUniforms().setValue(n,"morphTargetInfluences",h),u.getUniforms().setValue(n,"morphTargetsTexture",m.texture,A),u.getUniforms().setValue(n,"morphTargetsTextureSize",m.size)}else{const p=h===void 0?0:h.length;let g=t[c.id];if(g===void 0||g.length!==p){g=[];for(let B=0;B<p;B++)g[B]=[B,0];t[c.id]=g}for(let B=0;B<p;B++){const y=g[B];y[0]=B,y[1]=h[B]}g.sort(XE);for(let B=0;B<8;B++)B<p&&g[B][1]?(a[B][0]=g[B][0],a[B][1]=g[B][1]):(a[B][0]=Number.MAX_SAFE_INTEGER,a[B][1]=0);a.sort(WE);const m=c.morphAttributes.position,d=c.morphAttributes.normal;let f=0;for(let B=0;B<8;B++){const y=a[B],C=y[0],x=y[1];C!==Number.MAX_SAFE_INTEGER&&x?(m&&c.getAttribute("morphTarget"+B)!==m[C]&&c.setAttribute("morphTarget"+B,m[C]),d&&c.getAttribute("morphNormal"+B)!==d[C]&&c.setAttribute("morphNormal"+B,d[C]),i[B]=x,f+=x):(m&&c.hasAttribute("morphTarget"+B)===!0&&c.deleteAttribute("morphTarget"+B),d&&c.hasAttribute("morphNormal"+B)===!0&&c.deleteAttribute("morphNormal"+B),i[B]=0)}const v=c.morphTargetsRelative?1:1-f;u.getUniforms().setValue(n,"morphTargetBaseInfluence",v),u.getUniforms().setValue(n,"morphTargetInfluences",i)}}return{update:o}}function JE(n,e,A,t){let i=new WeakMap;function r(o){const l=t.render.frame,c=o.geometry,u=e.get(o,c);if(i.get(u)!==l&&(e.update(u),i.set(u,l)),o.isInstancedMesh&&(o.hasEventListener("dispose",a)===!1&&o.addEventListener("dispose",a),i.get(o)!==l&&(A.update(o.instanceMatrix,n.ARRAY_BUFFER),o.instanceColor!==null&&A.update(o.instanceColor,n.ARRAY_BUFFER),i.set(o,l))),o.isSkinnedMesh){const h=o.skeleton;i.get(h)!==l&&(h.update(),i.set(h,l))}return u}function s(){i=new WeakMap}function a(o){const l=o.target;l.removeEventListener("dispose",a),A.remove(l.instanceMatrix),l.instanceColor!==null&&A.remove(l.instanceColor)}return{update:r,dispose:s}}const tf=new WA,nf=new Xh,rf=new L_,sf=new $h,tu=[],nu=[],iu=new Float32Array(16),ru=new Float32Array(9),su=new Float32Array(4);function ci(n,e,A){const t=n[0];if(t<=0||t>0)return n;const i=e*A;let r=tu[i];if(r===void 0&&(r=new Float32Array(i),tu[i]=r),e!==0){t.toArray(r,0);for(let s=1,a=0;s!==e;++s)a+=A,n[s].toArray(r,a)}return r}function dA(n,e){if(n.length!==e.length)return!1;for(let A=0,t=n.length;A<t;A++)if(n[A]!==e[A])return!1;return!0}function pA(n,e){for(let A=0,t=e.length;A<t;A++)n[A]=e[A]}function Ts(n,e){let A=nu[e];A===void 0&&(A=new Int32Array(e),nu[e]=A);for(let t=0;t!==e;++t)A[t]=n.allocateTextureUnit();return A}function qE(n,e){const A=this.cache;A[0]!==e&&(n.uniform1f(this.addr,e),A[0]=e)}function ZE(n,e){const A=this.cache;if(e.x!==void 0)(A[0]!==e.x||A[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),A[0]=e.x,A[1]=e.y);else{if(dA(A,e))return;n.uniform2fv(this.addr,e),pA(A,e)}}function jE(n,e){const A=this.cache;if(e.x!==void 0)(A[0]!==e.x||A[1]!==e.y||A[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),A[0]=e.x,A[1]=e.y,A[2]=e.z);else if(e.r!==void 0)(A[0]!==e.r||A[1]!==e.g||A[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),A[0]=e.r,A[1]=e.g,A[2]=e.b);else{if(dA(A,e))return;n.uniform3fv(this.addr,e),pA(A,e)}}function $E(n,e){const A=this.cache;if(e.x!==void 0)(A[0]!==e.x||A[1]!==e.y||A[2]!==e.z||A[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),A[0]=e.x,A[1]=e.y,A[2]=e.z,A[3]=e.w);else{if(dA(A,e))return;n.uniform4fv(this.addr,e),pA(A,e)}}function eC(n,e){const A=this.cache,t=e.elements;if(t===void 0){if(dA(A,e))return;n.uniformMatrix2fv(this.addr,!1,e),pA(A,e)}else{if(dA(A,t))return;su.set(t),n.uniformMatrix2fv(this.addr,!1,su),pA(A,t)}}function AC(n,e){const A=this.cache,t=e.elements;if(t===void 0){if(dA(A,e))return;n.uniformMatrix3fv(this.addr,!1,e),pA(A,e)}else{if(dA(A,t))return;ru.set(t),n.uniformMatrix3fv(this.addr,!1,ru),pA(A,t)}}function tC(n,e){const A=this.cache,t=e.elements;if(t===void 0){if(dA(A,e))return;n.uniformMatrix4fv(this.addr,!1,e),pA(A,e)}else{if(dA(A,t))return;iu.set(t),n.uniformMatrix4fv(this.addr,!1,iu),pA(A,t)}}function nC(n,e){const A=this.cache;A[0]!==e&&(n.uniform1i(this.addr,e),A[0]=e)}function iC(n,e){const A=this.cache;if(e.x!==void 0)(A[0]!==e.x||A[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),A[0]=e.x,A[1]=e.y);else{if(dA(A,e))return;n.uniform2iv(this.addr,e),pA(A,e)}}function rC(n,e){const A=this.cache;if(e.x!==void 0)(A[0]!==e.x||A[1]!==e.y||A[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),A[0]=e.x,A[1]=e.y,A[2]=e.z);else{if(dA(A,e))return;n.uniform3iv(this.addr,e),pA(A,e)}}function sC(n,e){const A=this.cache;if(e.x!==void 0)(A[0]!==e.x||A[1]!==e.y||A[2]!==e.z||A[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),A[0]=e.x,A[1]=e.y,A[2]=e.z,A[3]=e.w);else{if(dA(A,e))return;n.uniform4iv(this.addr,e),pA(A,e)}}function aC(n,e){const A=this.cache;A[0]!==e&&(n.uniform1ui(this.addr,e),A[0]=e)}function oC(n,e){const A=this.cache;if(e.x!==void 0)(A[0]!==e.x||A[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),A[0]=e.x,A[1]=e.y);else{if(dA(A,e))return;n.uniform2uiv(this.addr,e),pA(A,e)}}function lC(n,e){const A=this.cache;if(e.x!==void 0)(A[0]!==e.x||A[1]!==e.y||A[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),A[0]=e.x,A[1]=e.y,A[2]=e.z);else{if(dA(A,e))return;n.uniform3uiv(this.addr,e),pA(A,e)}}function cC(n,e){const A=this.cache;if(e.x!==void 0)(A[0]!==e.x||A[1]!==e.y||A[2]!==e.z||A[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),A[0]=e.x,A[1]=e.y,A[2]=e.z,A[3]=e.w);else{if(dA(A,e))return;n.uniform4uiv(this.addr,e),pA(A,e)}}function uC(n,e,A){const t=this.cache,i=A.allocateTextureUnit();t[0]!==i&&(n.uniform1i(this.addr,i),t[0]=i),A.setTexture2D(e||tf,i)}function hC(n,e,A){const t=this.cache,i=A.allocateTextureUnit();t[0]!==i&&(n.uniform1i(this.addr,i),t[0]=i),A.setTexture3D(e||rf,i)}function fC(n,e,A){const t=this.cache,i=A.allocateTextureUnit();t[0]!==i&&(n.uniform1i(this.addr,i),t[0]=i),A.setTextureCube(e||sf,i)}function dC(n,e,A){const t=this.cache,i=A.allocateTextureUnit();t[0]!==i&&(n.uniform1i(this.addr,i),t[0]=i),A.setTexture2DArray(e||nf,i)}function pC(n){switch(n){case 5126:return qE;case 35664:return ZE;case 35665:return jE;case 35666:return $E;case 35674:return eC;case 35675:return AC;case 35676:return tC;case 5124:case 35670:return nC;case 35667:case 35671:return iC;case 35668:case 35672:return rC;case 35669:case 35673:return sC;case 5125:return aC;case 36294:return oC;case 36295:return lC;case 36296:return cC;case 35678:case 36198:case 36298:case 36306:case 35682:return uC;case 35679:case 36299:case 36307:return hC;case 35680:case 36300:case 36308:case 36293:return fC;case 36289:case 36303:case 36311:case 36292:return dC}}function gC(n,e){n.uniform1fv(this.addr,e)}function mC(n,e){const A=ci(e,this.size,2);n.uniform2fv(this.addr,A)}function BC(n,e){const A=ci(e,this.size,3);n.uniform3fv(this.addr,A)}function _C(n,e){const A=ci(e,this.size,4);n.uniform4fv(this.addr,A)}function wC(n,e){const A=ci(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,A)}function vC(n,e){const A=ci(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,A)}function EC(n,e){const A=ci(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,A)}function CC(n,e){n.uniform1iv(this.addr,e)}function xC(n,e){n.uniform2iv(this.addr,e)}function UC(n,e){n.uniform3iv(this.addr,e)}function yC(n,e){n.uniform4iv(this.addr,e)}function SC(n,e){n.uniform1uiv(this.addr,e)}function MC(n,e){n.uniform2uiv(this.addr,e)}function FC(n,e){n.uniform3uiv(this.addr,e)}function bC(n,e){n.uniform4uiv(this.addr,e)}function TC(n,e,A){const t=this.cache,i=e.length,r=Ts(A,i);dA(t,r)||(n.uniform1iv(this.addr,r),pA(t,r));for(let s=0;s!==i;++s)A.setTexture2D(e[s]||tf,r[s])}function QC(n,e,A){const t=this.cache,i=e.length,r=Ts(A,i);dA(t,r)||(n.uniform1iv(this.addr,r),pA(t,r));for(let s=0;s!==i;++s)A.setTexture3D(e[s]||rf,r[s])}function IC(n,e,A){const t=this.cache,i=e.length,r=Ts(A,i);dA(t,r)||(n.uniform1iv(this.addr,r),pA(t,r));for(let s=0;s!==i;++s)A.setTextureCube(e[s]||sf,r[s])}function LC(n,e,A){const t=this.cache,i=e.length,r=Ts(A,i);dA(t,r)||(n.uniform1iv(this.addr,r),pA(t,r));for(let s=0;s!==i;++s)A.setTexture2DArray(e[s]||nf,r[s])}function RC(n){switch(n){case 5126:return gC;case 35664:return mC;case 35665:return BC;case 35666:return _C;case 35674:return wC;case 35675:return vC;case 35676:return EC;case 5124:case 35670:return CC;case 35667:case 35671:return xC;case 35668:case 35672:return UC;case 35669:case 35673:return yC;case 5125:return SC;case 36294:return MC;case 36295:return FC;case 36296:return bC;case 35678:case 36198:case 36298:case 36306:case 35682:return TC;case 35679:case 36299:case 36307:return QC;case 35680:case 36300:case 36308:case 36293:return IC;case 36289:case 36303:case 36311:case 36292:return LC}}class DC{constructor(e,A,t){this.id=e,this.addr=t,this.cache=[],this.setValue=pC(A.type)}}class HC{constructor(e,A,t){this.id=e,this.addr=t,this.cache=[],this.size=A.size,this.setValue=RC(A.type)}}class PC{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,A,t){const i=this.seq;for(let r=0,s=i.length;r!==s;++r){const a=i[r];a.setValue(e,A[a.id],t)}}}const Ia=/(\w+)(\])?(\[|\.)?/g;function au(n,e){n.seq.push(e),n.map[e.id]=e}function OC(n,e,A){const t=n.name,i=t.length;for(Ia.lastIndex=0;;){const r=Ia.exec(t),s=Ia.lastIndex;let a=r[1];const o=r[2]==="]",l=r[3];if(o&&(a=a|0),l===void 0||l==="["&&s+2===i){au(A,l===void 0?new DC(a,n,e):new HC(a,n,e));break}else{let u=A.map[a];u===void 0&&(u=new PC(a),au(A,u)),A=u}}}class qr{constructor(e,A){this.seq=[],this.map={};const t=e.getProgramParameter(A,e.ACTIVE_UNIFORMS);for(let i=0;i<t;++i){const r=e.getActiveUniform(A,i),s=e.getUniformLocation(A,r.name);OC(r,s,this)}}setValue(e,A,t,i){const r=this.map[A];r!==void 0&&r.setValue(e,t,i)}setOptional(e,A,t){const i=A[t];i!==void 0&&this.setValue(e,t,i)}static upload(e,A,t,i){for(let r=0,s=A.length;r!==s;++r){const a=A[r],o=t[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,i)}}static seqWithValue(e,A){const t=[];for(let i=0,r=e.length;i!==r;++i){const s=e[i];s.id in A&&t.push(s)}return t}}function ou(n,e,A){const t=n.createShader(e);return n.shaderSource(t,A),n.compileShader(t),t}const NC=37297;let GC=0;function VC(n,e){const A=n.split(`
`),t=[],i=Math.max(e-6,0),r=Math.min(e+6,A.length);for(let s=i;s<r;s++){const a=s+1;t.push(`${a===e?">":" "} ${a}: ${A[s]}`)}return t.join(`
`)}function kC(n){const e=qe.getPrimaries(qe.workingColorSpace),A=qe.getPrimaries(n);let t;switch(e===A?t="":e===us&&A===cs?t="LinearDisplayP3ToLinearSRGB":e===cs&&A===us&&(t="LinearSRGBToLinearDisplayP3"),n){case It:case Ss:return[t,"LinearTransferOETF"];case EA:case Io:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[t,"LinearTransferOETF"]}}function lu(n,e,A){const t=n.getShaderParameter(e,n.COMPILE_STATUS),i=n.getShaderInfoLog(e).trim();if(t&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const s=parseInt(r[1]);return A.toUpperCase()+`

`+i+`

`+VC(n.getShaderSource(e),s)}else return i}function KC(n,e){const A=kC(e);return`vec4 ${n}( vec4 value ) { return ${A[0]}( ${A[1]}( value ) ); }`}function zC(n,e){let A;switch(e){case G0:A="Linear";break;case V0:A="Reinhard";break;case k0:A="OptimizedCineon";break;case K0:A="ACESFilmic";break;case z0:A="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),A="Linear"}return"vec3 "+n+"( vec3 color ) { return "+A+"ToneMapping( color ); }"}function WC(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Si).join(`
`)}function XC(n){const e=[];for(const A in n){const t=n[A];t!==!1&&e.push("#define "+A+" "+t)}return e.join(`
`)}function YC(n,e){const A={},t=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let i=0;i<t;i++){const r=n.getActiveAttrib(e,i),s=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),A[s]={type:r.type,location:n.getAttribLocation(e,s),locationSize:a}}return A}function Si(n){return n!==""}function cu(n,e){const A=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,A).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function uu(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const JC=/^[ \t]*#include +<([\w\d./]+)>/gm;function _o(n){return n.replace(JC,ZC)}const qC=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function ZC(n,e){let A=Ne[e];if(A===void 0){const t=qC.get(e);if(t!==void 0)A=Ne[t],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,t);else throw new Error("Can not resolve #include <"+e+">")}return _o(A)}const jC=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function hu(n){return n.replace(jC,$C)}function $C(n,e,A,t){let i="";for(let r=parseInt(e);r<parseInt(A);r++)i+=t.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function fu(n){let e="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function ex(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Lh?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===p0?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Ft&&(e="SHADOWMAP_TYPE_VSM"),e}function Ax(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case ii:case ri:e="ENVMAP_TYPE_CUBE";break;case ys:e="ENVMAP_TYPE_CUBE_UV";break}return e}function tx(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case ri:e="ENVMAP_MODE_REFRACTION";break}return e}function nx(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Rh:e="ENVMAP_BLENDING_MULTIPLY";break;case O0:e="ENVMAP_BLENDING_MIX";break;case N0:e="ENVMAP_BLENDING_ADD";break}return e}function ix(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const A=Math.log2(e)-2,t=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,A),7*16)),texelHeight:t,maxMip:A}}function rx(n,e,A,t){const i=n.getContext(),r=A.defines;let s=A.vertexShader,a=A.fragmentShader;const o=ex(A),l=Ax(A),c=tx(A),u=nx(A),h=ix(A),p=A.isWebGL2?"":WC(A),g=XC(r),m=i.createProgram();let d,f,v=A.glslVersion?"#version "+A.glslVersion+`
`:"";A.isRawShaderMaterial?(d=["#define SHADER_TYPE "+A.shaderType,"#define SHADER_NAME "+A.shaderName,g].filter(Si).join(`
`),d.length>0&&(d+=`
`),f=[p,"#define SHADER_TYPE "+A.shaderType,"#define SHADER_NAME "+A.shaderName,g].filter(Si).join(`
`),f.length>0&&(f+=`
`)):(d=[fu(A),"#define SHADER_TYPE "+A.shaderType,"#define SHADER_NAME "+A.shaderName,g,A.instancing?"#define USE_INSTANCING":"",A.instancingColor?"#define USE_INSTANCING_COLOR":"",A.useFog&&A.fog?"#define USE_FOG":"",A.useFog&&A.fogExp2?"#define FOG_EXP2":"",A.map?"#define USE_MAP":"",A.envMap?"#define USE_ENVMAP":"",A.envMap?"#define "+c:"",A.lightMap?"#define USE_LIGHTMAP":"",A.aoMap?"#define USE_AOMAP":"",A.bumpMap?"#define USE_BUMPMAP":"",A.normalMap?"#define USE_NORMALMAP":"",A.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",A.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",A.displacementMap?"#define USE_DISPLACEMENTMAP":"",A.emissiveMap?"#define USE_EMISSIVEMAP":"",A.anisotropy?"#define USE_ANISOTROPY":"",A.anisotropyMap?"#define USE_ANISOTROPYMAP":"",A.clearcoatMap?"#define USE_CLEARCOATMAP":"",A.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",A.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",A.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",A.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",A.specularMap?"#define USE_SPECULARMAP":"",A.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",A.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",A.roughnessMap?"#define USE_ROUGHNESSMAP":"",A.metalnessMap?"#define USE_METALNESSMAP":"",A.alphaMap?"#define USE_ALPHAMAP":"",A.alphaHash?"#define USE_ALPHAHASH":"",A.transmission?"#define USE_TRANSMISSION":"",A.transmissionMap?"#define USE_TRANSMISSIONMAP":"",A.thicknessMap?"#define USE_THICKNESSMAP":"",A.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",A.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",A.mapUv?"#define MAP_UV "+A.mapUv:"",A.alphaMapUv?"#define ALPHAMAP_UV "+A.alphaMapUv:"",A.lightMapUv?"#define LIGHTMAP_UV "+A.lightMapUv:"",A.aoMapUv?"#define AOMAP_UV "+A.aoMapUv:"",A.emissiveMapUv?"#define EMISSIVEMAP_UV "+A.emissiveMapUv:"",A.bumpMapUv?"#define BUMPMAP_UV "+A.bumpMapUv:"",A.normalMapUv?"#define NORMALMAP_UV "+A.normalMapUv:"",A.displacementMapUv?"#define DISPLACEMENTMAP_UV "+A.displacementMapUv:"",A.metalnessMapUv?"#define METALNESSMAP_UV "+A.metalnessMapUv:"",A.roughnessMapUv?"#define ROUGHNESSMAP_UV "+A.roughnessMapUv:"",A.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+A.anisotropyMapUv:"",A.clearcoatMapUv?"#define CLEARCOATMAP_UV "+A.clearcoatMapUv:"",A.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+A.clearcoatNormalMapUv:"",A.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+A.clearcoatRoughnessMapUv:"",A.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+A.iridescenceMapUv:"",A.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+A.iridescenceThicknessMapUv:"",A.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+A.sheenColorMapUv:"",A.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+A.sheenRoughnessMapUv:"",A.specularMapUv?"#define SPECULARMAP_UV "+A.specularMapUv:"",A.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+A.specularColorMapUv:"",A.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+A.specularIntensityMapUv:"",A.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+A.transmissionMapUv:"",A.thicknessMapUv?"#define THICKNESSMAP_UV "+A.thicknessMapUv:"",A.vertexTangents&&A.flatShading===!1?"#define USE_TANGENT":"",A.vertexColors?"#define USE_COLOR":"",A.vertexAlphas?"#define USE_COLOR_ALPHA":"",A.vertexUv1s?"#define USE_UV1":"",A.vertexUv2s?"#define USE_UV2":"",A.vertexUv3s?"#define USE_UV3":"",A.pointsUvs?"#define USE_POINTS_UV":"",A.flatShading?"#define FLAT_SHADED":"",A.skinning?"#define USE_SKINNING":"",A.morphTargets?"#define USE_MORPHTARGETS":"",A.morphNormals&&A.flatShading===!1?"#define USE_MORPHNORMALS":"",A.morphColors&&A.isWebGL2?"#define USE_MORPHCOLORS":"",A.morphTargetsCount>0&&A.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",A.morphTargetsCount>0&&A.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+A.morphTextureStride:"",A.morphTargetsCount>0&&A.isWebGL2?"#define MORPHTARGETS_COUNT "+A.morphTargetsCount:"",A.doubleSided?"#define DOUBLE_SIDED":"",A.flipSided?"#define FLIP_SIDED":"",A.shadowMapEnabled?"#define USE_SHADOWMAP":"",A.shadowMapEnabled?"#define "+o:"",A.sizeAttenuation?"#define USE_SIZEATTENUATION":"",A.numLightProbes>0?"#define USE_LIGHT_PROBES":"",A.useLegacyLights?"#define LEGACY_LIGHTS":"",A.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",A.logarithmicDepthBuffer&&A.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Si).join(`
`),f=[p,fu(A),"#define SHADER_TYPE "+A.shaderType,"#define SHADER_NAME "+A.shaderName,g,A.useFog&&A.fog?"#define USE_FOG":"",A.useFog&&A.fogExp2?"#define FOG_EXP2":"",A.map?"#define USE_MAP":"",A.matcap?"#define USE_MATCAP":"",A.envMap?"#define USE_ENVMAP":"",A.envMap?"#define "+l:"",A.envMap?"#define "+c:"",A.envMap?"#define "+u:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",A.lightMap?"#define USE_LIGHTMAP":"",A.aoMap?"#define USE_AOMAP":"",A.bumpMap?"#define USE_BUMPMAP":"",A.normalMap?"#define USE_NORMALMAP":"",A.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",A.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",A.emissiveMap?"#define USE_EMISSIVEMAP":"",A.anisotropy?"#define USE_ANISOTROPY":"",A.anisotropyMap?"#define USE_ANISOTROPYMAP":"",A.clearcoat?"#define USE_CLEARCOAT":"",A.clearcoatMap?"#define USE_CLEARCOATMAP":"",A.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",A.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",A.iridescence?"#define USE_IRIDESCENCE":"",A.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",A.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",A.specularMap?"#define USE_SPECULARMAP":"",A.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",A.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",A.roughnessMap?"#define USE_ROUGHNESSMAP":"",A.metalnessMap?"#define USE_METALNESSMAP":"",A.alphaMap?"#define USE_ALPHAMAP":"",A.alphaTest?"#define USE_ALPHATEST":"",A.alphaHash?"#define USE_ALPHAHASH":"",A.sheen?"#define USE_SHEEN":"",A.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",A.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",A.transmission?"#define USE_TRANSMISSION":"",A.transmissionMap?"#define USE_TRANSMISSIONMAP":"",A.thicknessMap?"#define USE_THICKNESSMAP":"",A.vertexTangents&&A.flatShading===!1?"#define USE_TANGENT":"",A.vertexColors||A.instancingColor?"#define USE_COLOR":"",A.vertexAlphas?"#define USE_COLOR_ALPHA":"",A.vertexUv1s?"#define USE_UV1":"",A.vertexUv2s?"#define USE_UV2":"",A.vertexUv3s?"#define USE_UV3":"",A.pointsUvs?"#define USE_POINTS_UV":"",A.gradientMap?"#define USE_GRADIENTMAP":"",A.flatShading?"#define FLAT_SHADED":"",A.doubleSided?"#define DOUBLE_SIDED":"",A.flipSided?"#define FLIP_SIDED":"",A.shadowMapEnabled?"#define USE_SHADOWMAP":"",A.shadowMapEnabled?"#define "+o:"",A.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",A.numLightProbes>0?"#define USE_LIGHT_PROBES":"",A.useLegacyLights?"#define LEGACY_LIGHTS":"",A.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",A.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",A.logarithmicDepthBuffer&&A.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",A.toneMapping!==Zt?"#define TONE_MAPPING":"",A.toneMapping!==Zt?Ne.tonemapping_pars_fragment:"",A.toneMapping!==Zt?zC("toneMapping",A.toneMapping):"",A.dithering?"#define DITHERING":"",A.opaque?"#define OPAQUE":"",Ne.colorspace_pars_fragment,KC("linearToOutputTexel",A.outputColorSpace),A.useDepthPacking?"#define DEPTH_PACKING "+A.depthPacking:"",`
`].filter(Si).join(`
`)),s=_o(s),s=cu(s,A),s=uu(s,A),a=_o(a),a=cu(a,A),a=uu(a,A),s=hu(s),a=hu(a),A.isWebGL2&&A.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,d=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,f=["precision mediump sampler2DArray;","#define varying in",A.glslVersion===Tc?"":"layout(location = 0) out highp vec4 pc_fragColor;",A.glslVersion===Tc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const B=v+d+s,y=v+f+a,C=ou(i,i.VERTEX_SHADER,B),x=ou(i,i.FRAGMENT_SHADER,y);i.attachShader(m,C),i.attachShader(m,x),A.index0AttributeName!==void 0?i.bindAttribLocation(m,0,A.index0AttributeName):A.morphTargets===!0&&i.bindAttribLocation(m,0,"position"),i.linkProgram(m);function S(G){if(n.debug.checkShaderErrors){const Z=i.getProgramInfoLog(m).trim(),Y=i.getShaderInfoLog(C).trim(),T=i.getShaderInfoLog(x).trim();let O=!0,X=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1)if(O=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(i,m,C,x);else{const k=lu(i,C,"vertex"),j=lu(i,x,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Program Info Log: `+Z+`
`+k+`
`+j)}else Z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Z):(Y===""||T==="")&&(X=!1);X&&(G.diagnostics={runnable:O,programLog:Z,vertexShader:{log:Y,prefix:d},fragmentShader:{log:T,prefix:f}})}i.deleteShader(C),i.deleteShader(x),R=new qr(i,m),_=YC(i,m)}let R;this.getUniforms=function(){return R===void 0&&S(this),R};let _;this.getAttributes=function(){return _===void 0&&S(this),_};let M=A.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(m,NC)),M},this.destroy=function(){t.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=A.shaderType,this.name=A.shaderName,this.id=GC++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=C,this.fragmentShader=x,this}let sx=0;class ax{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const A=e.vertexShader,t=e.fragmentShader,i=this._getShaderStage(A),r=this._getShaderStage(t),s=this._getShaderCacheForMaterial(e);return s.has(i)===!1&&(s.add(i),i.usedTimes++),s.has(r)===!1&&(s.add(r),r.usedTimes++),this}remove(e){const A=this.materialCache.get(e);for(const t of A)t.usedTimes--,t.usedTimes===0&&this.shaderCache.delete(t.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const A=this.materialCache;let t=A.get(e);return t===void 0&&(t=new Set,A.set(e,t)),t}_getShaderStage(e){const A=this.shaderCache;let t=A.get(e);return t===void 0&&(t=new ox(e),A.set(e,t)),t}}class ox{constructor(e){this.id=sx++,this.code=e,this.usedTimes=0}}function lx(n,e,A,t,i,r,s){const a=new Ro,o=new ax,l=[],c=i.isWebGL2,u=i.logarithmicDepthBuffer,h=i.vertexTextures;let p=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(_){return _===0?"uv":`uv${_}`}function d(_,M,G,Z,Y){const T=Z.fog,O=Y.geometry,X=_.isMeshStandardMaterial?Z.environment:null,k=(_.isMeshStandardMaterial?A:e).get(_.envMap||X),j=k&&k.mapping===ys?k.image.height:null,W=g[_.type];_.precision!==null&&(p=i.getMaxPrecision(_.precision),p!==_.precision&&console.warn("THREE.WebGLProgram.getParameters:",_.precision,"not supported, using",p,"instead."));const q=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,Q=q!==void 0?q.length:0;let K=0;O.morphAttributes.position!==void 0&&(K=1),O.morphAttributes.normal!==void 0&&(K=2),O.morphAttributes.color!==void 0&&(K=3);let ae,ue,he,Ee;if(W){const lA=ft[W];ae=lA.vertexShader,ue=lA.fragmentShader}else ae=_.vertexShader,ue=_.fragmentShader,o.update(_),he=o.getVertexShaderID(_),Ee=o.getFragmentShaderID(_);const Ie=n.getRenderTarget(),Fe=Y.isInstancedMesh===!0,Le=!!_.map,eA=!!_.matcap,Oe=!!k,D=!!_.aoMap,UA=!!_.lightMap,xe=!!_.bumpMap,be=!!_.normalMap,Te=!!_.displacementMap,tA=!!_.emissiveMap,He=!!_.metalnessMap,Re=!!_.roughnessMap,Xe=_.anisotropy>0,oA=_.clearcoat>0,gA=_.iridescence>0,U=_.sheen>0,w=_.transmission>0,H=Xe&&!!_.anisotropyMap,te=oA&&!!_.clearcoatMap,$=oA&&!!_.clearcoatNormalMap,ne=oA&&!!_.clearcoatRoughnessMap,_e=gA&&!!_.iridescenceMap,se=gA&&!!_.iridescenceThicknessMap,de=U&&!!_.sheenColorMap,F=U&&!!_.sheenRoughnessMap,re=!!_.specularMap,J=!!_.specularColorMap,Se=!!_.specularIntensityMap,we=w&&!!_.transmissionMap,Ue=w&&!!_.thicknessMap,Be=!!_.gradientMap,me=!!_.alphaMap,ke=_.alphaTest>0,b=!!_.alphaHash,oe=!!_.extensions,ee=!!O.attributes.uv1,z=!!O.attributes.uv2,ie=!!O.attributes.uv3;let Ce=Zt;return _.toneMapped&&(Ie===null||Ie.isXRRenderTarget===!0)&&(Ce=n.toneMapping),{isWebGL2:c,shaderID:W,shaderType:_.type,shaderName:_.name,vertexShader:ae,fragmentShader:ue,defines:_.defines,customVertexShaderID:he,customFragmentShaderID:Ee,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:p,instancing:Fe,instancingColor:Fe&&Y.instanceColor!==null,supportsVertexTextures:h,outputColorSpace:Ie===null?n.outputColorSpace:Ie.isXRRenderTarget===!0?Ie.texture.colorSpace:It,map:Le,matcap:eA,envMap:Oe,envMapMode:Oe&&k.mapping,envMapCubeUVHeight:j,aoMap:D,lightMap:UA,bumpMap:xe,normalMap:be,displacementMap:h&&Te,emissiveMap:tA,normalMapObjectSpace:be&&_.normalMapType===r_,normalMapTangentSpace:be&&_.normalMapType===i_,metalnessMap:He,roughnessMap:Re,anisotropy:Xe,anisotropyMap:H,clearcoat:oA,clearcoatMap:te,clearcoatNormalMap:$,clearcoatRoughnessMap:ne,iridescence:gA,iridescenceMap:_e,iridescenceThicknessMap:se,sheen:U,sheenColorMap:de,sheenRoughnessMap:F,specularMap:re,specularColorMap:J,specularIntensityMap:Se,transmission:w,transmissionMap:we,thicknessMap:Ue,gradientMap:Be,opaque:_.transparent===!1&&_.blending===Ai,alphaMap:me,alphaTest:ke,alphaHash:b,combine:_.combine,mapUv:Le&&m(_.map.channel),aoMapUv:D&&m(_.aoMap.channel),lightMapUv:UA&&m(_.lightMap.channel),bumpMapUv:xe&&m(_.bumpMap.channel),normalMapUv:be&&m(_.normalMap.channel),displacementMapUv:Te&&m(_.displacementMap.channel),emissiveMapUv:tA&&m(_.emissiveMap.channel),metalnessMapUv:He&&m(_.metalnessMap.channel),roughnessMapUv:Re&&m(_.roughnessMap.channel),anisotropyMapUv:H&&m(_.anisotropyMap.channel),clearcoatMapUv:te&&m(_.clearcoatMap.channel),clearcoatNormalMapUv:$&&m(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ne&&m(_.clearcoatRoughnessMap.channel),iridescenceMapUv:_e&&m(_.iridescenceMap.channel),iridescenceThicknessMapUv:se&&m(_.iridescenceThicknessMap.channel),sheenColorMapUv:de&&m(_.sheenColorMap.channel),sheenRoughnessMapUv:F&&m(_.sheenRoughnessMap.channel),specularMapUv:re&&m(_.specularMap.channel),specularColorMapUv:J&&m(_.specularColorMap.channel),specularIntensityMapUv:Se&&m(_.specularIntensityMap.channel),transmissionMapUv:we&&m(_.transmissionMap.channel),thicknessMapUv:Ue&&m(_.thicknessMap.channel),alphaMapUv:me&&m(_.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(be||Xe),vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,vertexUv1s:ee,vertexUv2s:z,vertexUv3s:ie,pointsUvs:Y.isPoints===!0&&!!O.attributes.uv&&(Le||me),fog:!!T,useFog:_.fog===!0,fogExp2:T&&T.isFogExp2,flatShading:_.flatShading===!0,sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:Y.isSkinnedMesh===!0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:Q,morphTextureStride:K,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:_.dithering,shadowMapEnabled:n.shadowMap.enabled&&G.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ce,useLegacyLights:n._useLegacyLights,decodeVideoTexture:Le&&_.map.isVideoTexture===!0&&qe.getTransfer(_.map.colorSpace)===AA,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===at,flipSided:_.side===PA,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionDerivatives:oe&&_.extensions.derivatives===!0,extensionFragDepth:oe&&_.extensions.fragDepth===!0,extensionDrawBuffers:oe&&_.extensions.drawBuffers===!0,extensionShaderTextureLOD:oe&&_.extensions.shaderTextureLOD===!0,rendererExtensionFragDepth:c||t.has("EXT_frag_depth"),rendererExtensionDrawBuffers:c||t.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:c||t.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()}}function f(_){const M=[];if(_.shaderID?M.push(_.shaderID):(M.push(_.customVertexShaderID),M.push(_.customFragmentShaderID)),_.defines!==void 0)for(const G in _.defines)M.push(G),M.push(_.defines[G]);return _.isRawShaderMaterial===!1&&(v(M,_),B(M,_),M.push(n.outputColorSpace)),M.push(_.customProgramCacheKey),M.join()}function v(_,M){_.push(M.precision),_.push(M.outputColorSpace),_.push(M.envMapMode),_.push(M.envMapCubeUVHeight),_.push(M.mapUv),_.push(M.alphaMapUv),_.push(M.lightMapUv),_.push(M.aoMapUv),_.push(M.bumpMapUv),_.push(M.normalMapUv),_.push(M.displacementMapUv),_.push(M.emissiveMapUv),_.push(M.metalnessMapUv),_.push(M.roughnessMapUv),_.push(M.anisotropyMapUv),_.push(M.clearcoatMapUv),_.push(M.clearcoatNormalMapUv),_.push(M.clearcoatRoughnessMapUv),_.push(M.iridescenceMapUv),_.push(M.iridescenceThicknessMapUv),_.push(M.sheenColorMapUv),_.push(M.sheenRoughnessMapUv),_.push(M.specularMapUv),_.push(M.specularColorMapUv),_.push(M.specularIntensityMapUv),_.push(M.transmissionMapUv),_.push(M.thicknessMapUv),_.push(M.combine),_.push(M.fogExp2),_.push(M.sizeAttenuation),_.push(M.morphTargetsCount),_.push(M.morphAttributeCount),_.push(M.numDirLights),_.push(M.numPointLights),_.push(M.numSpotLights),_.push(M.numSpotLightMaps),_.push(M.numHemiLights),_.push(M.numRectAreaLights),_.push(M.numDirLightShadows),_.push(M.numPointLightShadows),_.push(M.numSpotLightShadows),_.push(M.numSpotLightShadowsWithMaps),_.push(M.numLightProbes),_.push(M.shadowMapType),_.push(M.toneMapping),_.push(M.numClippingPlanes),_.push(M.numClipIntersection),_.push(M.depthPacking)}function B(_,M){a.disableAll(),M.isWebGL2&&a.enable(0),M.supportsVertexTextures&&a.enable(1),M.instancing&&a.enable(2),M.instancingColor&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),_.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.skinning&&a.enable(4),M.morphTargets&&a.enable(5),M.morphNormals&&a.enable(6),M.morphColors&&a.enable(7),M.premultipliedAlpha&&a.enable(8),M.shadowMapEnabled&&a.enable(9),M.useLegacyLights&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),_.push(a.mask)}function y(_){const M=g[_.type];let G;if(M){const Z=ft[M];G=X_.clone(Z.uniforms)}else G=_.uniforms;return G}function C(_,M){let G;for(let Z=0,Y=l.length;Z<Y;Z++){const T=l[Z];if(T.cacheKey===M){G=T,++G.usedTimes;break}}return G===void 0&&(G=new rx(n,M,_,r),l.push(G)),G}function x(_){if(--_.usedTimes===0){const M=l.indexOf(_);l[M]=l[l.length-1],l.pop(),_.destroy()}}function S(_){o.remove(_)}function R(){o.dispose()}return{getParameters:d,getProgramCacheKey:f,getUniforms:y,acquireProgram:C,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:R}}function cx(){let n=new WeakMap;function e(r){let s=n.get(r);return s===void 0&&(s={},n.set(r,s)),s}function A(r){n.delete(r)}function t(r,s,a){n.get(r)[s]=a}function i(){n=new WeakMap}return{get:e,remove:A,update:t,dispose:i}}function ux(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function du(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function pu(){const n=[];let e=0;const A=[],t=[],i=[];function r(){e=0,A.length=0,t.length=0,i.length=0}function s(u,h,p,g,m,d){let f=n[e];return f===void 0?(f={id:u.id,object:u,geometry:h,material:p,groupOrder:g,renderOrder:u.renderOrder,z:m,group:d},n[e]=f):(f.id=u.id,f.object=u,f.geometry=h,f.material=p,f.groupOrder=g,f.renderOrder=u.renderOrder,f.z=m,f.group=d),e++,f}function a(u,h,p,g,m,d){const f=s(u,h,p,g,m,d);p.transmission>0?t.push(f):p.transparent===!0?i.push(f):A.push(f)}function o(u,h,p,g,m,d){const f=s(u,h,p,g,m,d);p.transmission>0?t.unshift(f):p.transparent===!0?i.unshift(f):A.unshift(f)}function l(u,h){A.length>1&&A.sort(u||ux),t.length>1&&t.sort(h||du),i.length>1&&i.sort(h||du)}function c(){for(let u=e,h=n.length;u<h;u++){const p=n[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:A,transmissive:t,transparent:i,init:r,push:a,unshift:o,finish:c,sort:l}}function hx(){let n=new WeakMap;function e(t,i){const r=n.get(t);let s;return r===void 0?(s=new pu,n.set(t,[s])):i>=r.length?(s=new pu,r.push(s)):s=r[i],s}function A(){n=new WeakMap}return{get:e,dispose:A}}function fx(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let A;switch(e.type){case"DirectionalLight":A={direction:new I,color:new Ye};break;case"SpotLight":A={position:new I,direction:new I,color:new Ye,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":A={position:new I,color:new Ye,distance:0,decay:0};break;case"HemisphereLight":A={direction:new I,skyColor:new Ye,groundColor:new Ye};break;case"RectAreaLight":A={color:new Ye,position:new I,halfWidth:new I,halfHeight:new I};break}return n[e.id]=A,A}}}function dx(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let A;switch(e.type){case"DirectionalLight":A={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye};break;case"SpotLight":A={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye};break;case"PointLight":A={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=A,A}}}let px=0;function gx(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function mx(n,e){const A=new fx,t=dx(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new I);const r=new I,s=new wA,a=new wA;function o(c,u){let h=0,p=0,g=0;for(let Z=0;Z<9;Z++)i.probe[Z].set(0,0,0);let m=0,d=0,f=0,v=0,B=0,y=0,C=0,x=0,S=0,R=0,_=0;c.sort(gx);const M=u===!0?Math.PI:1;for(let Z=0,Y=c.length;Z<Y;Z++){const T=c[Z],O=T.color,X=T.intensity,k=T.distance,j=T.shadow&&T.shadow.map?T.shadow.map.texture:null;if(T.isAmbientLight)h+=O.r*X*M,p+=O.g*X*M,g+=O.b*X*M;else if(T.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(T.sh.coefficients[W],X);_++}else if(T.isDirectionalLight){const W=A.get(T);if(W.color.copy(T.color).multiplyScalar(T.intensity*M),T.castShadow){const q=T.shadow,Q=t.get(T);Q.shadowBias=q.bias,Q.shadowNormalBias=q.normalBias,Q.shadowRadius=q.radius,Q.shadowMapSize=q.mapSize,i.directionalShadow[m]=Q,i.directionalShadowMap[m]=j,i.directionalShadowMatrix[m]=T.shadow.matrix,y++}i.directional[m]=W,m++}else if(T.isSpotLight){const W=A.get(T);W.position.setFromMatrixPosition(T.matrixWorld),W.color.copy(O).multiplyScalar(X*M),W.distance=k,W.coneCos=Math.cos(T.angle),W.penumbraCos=Math.cos(T.angle*(1-T.penumbra)),W.decay=T.decay,i.spot[f]=W;const q=T.shadow;if(T.map&&(i.spotLightMap[S]=T.map,S++,q.updateMatrices(T),T.castShadow&&R++),i.spotLightMatrix[f]=q.matrix,T.castShadow){const Q=t.get(T);Q.shadowBias=q.bias,Q.shadowNormalBias=q.normalBias,Q.shadowRadius=q.radius,Q.shadowMapSize=q.mapSize,i.spotShadow[f]=Q,i.spotShadowMap[f]=j,x++}f++}else if(T.isRectAreaLight){const W=A.get(T);W.color.copy(O).multiplyScalar(X),W.halfWidth.set(T.width*.5,0,0),W.halfHeight.set(0,T.height*.5,0),i.rectArea[v]=W,v++}else if(T.isPointLight){const W=A.get(T);if(W.color.copy(T.color).multiplyScalar(T.intensity*M),W.distance=T.distance,W.decay=T.decay,T.castShadow){const q=T.shadow,Q=t.get(T);Q.shadowBias=q.bias,Q.shadowNormalBias=q.normalBias,Q.shadowRadius=q.radius,Q.shadowMapSize=q.mapSize,Q.shadowCameraNear=q.camera.near,Q.shadowCameraFar=q.camera.far,i.pointShadow[d]=Q,i.pointShadowMap[d]=j,i.pointShadowMatrix[d]=T.shadow.matrix,C++}i.point[d]=W,d++}else if(T.isHemisphereLight){const W=A.get(T);W.skyColor.copy(T.color).multiplyScalar(X*M),W.groundColor.copy(T.groundColor).multiplyScalar(X*M),i.hemi[B]=W,B++}}v>0&&(e.isWebGL2||n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ce.LTC_FLOAT_1,i.rectAreaLTC2=ce.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=ce.LTC_HALF_1,i.rectAreaLTC2=ce.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=h,i.ambient[1]=p,i.ambient[2]=g;const G=i.hash;(G.directionalLength!==m||G.pointLength!==d||G.spotLength!==f||G.rectAreaLength!==v||G.hemiLength!==B||G.numDirectionalShadows!==y||G.numPointShadows!==C||G.numSpotShadows!==x||G.numSpotMaps!==S||G.numLightProbes!==_)&&(i.directional.length=m,i.spot.length=f,i.rectArea.length=v,i.point.length=d,i.hemi.length=B,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=C,i.pointShadowMap.length=C,i.spotShadow.length=x,i.spotShadowMap.length=x,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=C,i.spotLightMatrix.length=x+S-R,i.spotLightMap.length=S,i.numSpotLightShadowsWithMaps=R,i.numLightProbes=_,G.directionalLength=m,G.pointLength=d,G.spotLength=f,G.rectAreaLength=v,G.hemiLength=B,G.numDirectionalShadows=y,G.numPointShadows=C,G.numSpotShadows=x,G.numSpotMaps=S,G.numLightProbes=_,i.version=px++)}function l(c,u){let h=0,p=0,g=0,m=0,d=0;const f=u.matrixWorldInverse;for(let v=0,B=c.length;v<B;v++){const y=c[v];if(y.isDirectionalLight){const C=i.directional[h];C.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),C.direction.sub(r),C.direction.transformDirection(f),h++}else if(y.isSpotLight){const C=i.spot[g];C.position.setFromMatrixPosition(y.matrixWorld),C.position.applyMatrix4(f),C.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),C.direction.sub(r),C.direction.transformDirection(f),g++}else if(y.isRectAreaLight){const C=i.rectArea[m];C.position.setFromMatrixPosition(y.matrixWorld),C.position.applyMatrix4(f),a.identity(),s.copy(y.matrixWorld),s.premultiply(f),a.extractRotation(s),C.halfWidth.set(y.width*.5,0,0),C.halfHeight.set(0,y.height*.5,0),C.halfWidth.applyMatrix4(a),C.halfHeight.applyMatrix4(a),m++}else if(y.isPointLight){const C=i.point[p];C.position.setFromMatrixPosition(y.matrixWorld),C.position.applyMatrix4(f),p++}else if(y.isHemisphereLight){const C=i.hemi[d];C.direction.setFromMatrixPosition(y.matrixWorld),C.direction.transformDirection(f),d++}}}return{setup:o,setupView:l,state:i}}function gu(n,e){const A=new mx(n,e),t=[],i=[];function r(){t.length=0,i.length=0}function s(u){t.push(u)}function a(u){i.push(u)}function o(u){A.setup(t,u)}function l(u){A.setupView(t,u)}return{init:r,state:{lightsArray:t,shadowsArray:i,lights:A},setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function Bx(n,e){let A=new WeakMap;function t(r,s=0){const a=A.get(r);let o;return a===void 0?(o=new gu(n,e),A.set(r,[o])):s>=a.length?(o=new gu(n,e),a.push(o)):o=a[s],o}function i(){A=new WeakMap}return{get:t,dispose:i}}class _x extends Ji{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=t_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class wx extends Ji{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const vx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ex=`uniform sampler2D shadow_pass;
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
}`;function Cx(n,e,A){let t=new ef;const i=new ye,r=new ye,s=new xA,a=new _x({depthPacking:n_}),o=new wx,l={},c=A.maxTextureSize,u={[An]:PA,[PA]:An,[at]:at},h=new tn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ye},radius:{value:4}},vertexShader:vx,fragmentShader:Ex}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const g=new wt;g.setAttribute("position",new mt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const m=new pt(g,h),d=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Lh;let f=this.type;this.render=function(C,x,S){if(d.enabled===!1||d.autoUpdate===!1&&d.needsUpdate===!1||C.length===0)return;const R=n.getRenderTarget(),_=n.getActiveCubeFace(),M=n.getActiveMipmapLevel(),G=n.state;G.setBlending(qt),G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);const Z=f!==Ft&&this.type===Ft,Y=f===Ft&&this.type!==Ft;for(let T=0,O=C.length;T<O;T++){const X=C[T],k=X.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;i.copy(k.mapSize);const j=k.getFrameExtents();if(i.multiply(j),r.copy(k.mapSize),(i.x>c||i.y>c)&&(i.x>c&&(r.x=Math.floor(c/j.x),i.x=r.x*j.x,k.mapSize.x=r.x),i.y>c&&(r.y=Math.floor(c/j.y),i.y=r.y*j.y,k.mapSize.y=r.y)),k.map===null||Z===!0||Y===!0){const q=this.type!==Ft?{minFilter:DA,magFilter:DA}:{};k.map!==null&&k.map.dispose(),k.map=new vn(i.x,i.y,q),k.map.texture.name=X.name+".shadowMap",k.camera.updateProjectionMatrix()}n.setRenderTarget(k.map),n.clear();const W=k.getViewportCount();for(let q=0;q<W;q++){const Q=k.getViewport(q);s.set(r.x*Q.x,r.y*Q.y,r.x*Q.z,r.y*Q.w),G.viewport(s),k.updateMatrices(X,q),t=k.getFrustum(),y(x,S,k.camera,X,this.type)}k.isPointLightShadow!==!0&&this.type===Ft&&v(k,S),k.needsUpdate=!1}f=this.type,d.needsUpdate=!1,n.setRenderTarget(R,_,M)};function v(C,x){const S=e.update(m);h.defines.VSM_SAMPLES!==C.blurSamples&&(h.defines.VSM_SAMPLES=C.blurSamples,p.defines.VSM_SAMPLES=C.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new vn(i.x,i.y)),h.uniforms.shadow_pass.value=C.map.texture,h.uniforms.resolution.value=C.mapSize,h.uniforms.radius.value=C.radius,n.setRenderTarget(C.mapPass),n.clear(),n.renderBufferDirect(x,null,S,h,m,null),p.uniforms.shadow_pass.value=C.mapPass.texture,p.uniforms.resolution.value=C.mapSize,p.uniforms.radius.value=C.radius,n.setRenderTarget(C.map),n.clear(),n.renderBufferDirect(x,null,S,p,m,null)}function B(C,x,S,R){let _=null;const M=S.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(M!==void 0)_=M;else if(_=S.isPointLight===!0?o:a,n.localClippingEnabled&&x.clipShadows===!0&&Array.isArray(x.clippingPlanes)&&x.clippingPlanes.length!==0||x.displacementMap&&x.displacementScale!==0||x.alphaMap&&x.alphaTest>0||x.map&&x.alphaTest>0){const G=_.uuid,Z=x.uuid;let Y=l[G];Y===void 0&&(Y={},l[G]=Y);let T=Y[Z];T===void 0&&(T=_.clone(),Y[Z]=T),_=T}if(_.visible=x.visible,_.wireframe=x.wireframe,R===Ft?_.side=x.shadowSide!==null?x.shadowSide:x.side:_.side=x.shadowSide!==null?x.shadowSide:u[x.side],_.alphaMap=x.alphaMap,_.alphaTest=x.alphaTest,_.map=x.map,_.clipShadows=x.clipShadows,_.clippingPlanes=x.clippingPlanes,_.clipIntersection=x.clipIntersection,_.displacementMap=x.displacementMap,_.displacementScale=x.displacementScale,_.displacementBias=x.displacementBias,_.wireframeLinewidth=x.wireframeLinewidth,_.linewidth=x.linewidth,S.isPointLight===!0&&_.isMeshDistanceMaterial===!0){const G=n.properties.get(_);G.light=S}return _}function y(C,x,S,R,_){if(C.visible===!1)return;if(C.layers.test(x.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&_===Ft)&&(!C.frustumCulled||t.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,C.matrixWorld);const Z=e.update(C),Y=C.material;if(Array.isArray(Y)){const T=Z.groups;for(let O=0,X=T.length;O<X;O++){const k=T[O],j=Y[k.materialIndex];if(j&&j.visible){const W=B(C,j,R,_);n.renderBufferDirect(S,null,Z,W,C,k)}}}else if(Y.visible){const T=B(C,Y,R,_);n.renderBufferDirect(S,null,Z,T,C,null)}}const G=C.children;for(let Z=0,Y=G.length;Z<Y;Z++)y(G[Z],x,S,R,_)}}function xx(n,e,A){const t=A.isWebGL2;function i(){let b=!1;const oe=new xA;let ee=null;const z=new xA(0,0,0,0);return{setMask:function(ie){ee!==ie&&!b&&(n.colorMask(ie,ie,ie,ie),ee=ie)},setLocked:function(ie){b=ie},setClear:function(ie,Ce,Ke,lA,XA){XA===!0&&(ie*=lA,Ce*=lA,Ke*=lA),oe.set(ie,Ce,Ke,lA),z.equals(oe)===!1&&(n.clearColor(ie,Ce,Ke,lA),z.copy(oe))},reset:function(){b=!1,ee=null,z.set(-1,0,0,0)}}}function r(){let b=!1,oe=null,ee=null,z=null;return{setTest:function(ie){ie?Le(n.DEPTH_TEST):eA(n.DEPTH_TEST)},setMask:function(ie){oe!==ie&&!b&&(n.depthMask(ie),oe=ie)},setFunc:function(ie){if(ee!==ie){switch(ie){case Q0:n.depthFunc(n.NEVER);break;case I0:n.depthFunc(n.ALWAYS);break;case L0:n.depthFunc(n.LESS);break;case os:n.depthFunc(n.LEQUAL);break;case R0:n.depthFunc(n.EQUAL);break;case D0:n.depthFunc(n.GEQUAL);break;case H0:n.depthFunc(n.GREATER);break;case P0:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ee=ie}},setLocked:function(ie){b=ie},setClear:function(ie){z!==ie&&(n.clearDepth(ie),z=ie)},reset:function(){b=!1,oe=null,ee=null,z=null}}}function s(){let b=!1,oe=null,ee=null,z=null,ie=null,Ce=null,Ke=null,lA=null,XA=null;return{setTest:function(je){b||(je?Le(n.STENCIL_TEST):eA(n.STENCIL_TEST))},setMask:function(je){oe!==je&&!b&&(n.stencilMask(je),oe=je)},setFunc:function(je,TA,ut){(ee!==je||z!==TA||ie!==ut)&&(n.stencilFunc(je,TA,ut),ee=je,z=TA,ie=ut)},setOp:function(je,TA,ut){(Ce!==je||Ke!==TA||lA!==ut)&&(n.stencilOp(je,TA,ut),Ce=je,Ke=TA,lA=ut)},setLocked:function(je){b=je},setClear:function(je){XA!==je&&(n.clearStencil(je),XA=je)},reset:function(){b=!1,oe=null,ee=null,z=null,ie=null,Ce=null,Ke=null,lA=null,XA=null}}}const a=new i,o=new r,l=new s,c=new WeakMap,u=new WeakMap;let h={},p={},g=new WeakMap,m=[],d=null,f=!1,v=null,B=null,y=null,C=null,x=null,S=null,R=null,_=new Ye(0,0,0),M=0,G=!1,Z=null,Y=null,T=null,O=null,X=null;const k=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let j=!1,W=0;const q=n.getParameter(n.VERSION);q.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec(q)[1]),j=W>=1):q.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),j=W>=2);let Q=null,K={};const ae=n.getParameter(n.SCISSOR_BOX),ue=n.getParameter(n.VIEWPORT),he=new xA().fromArray(ae),Ee=new xA().fromArray(ue);function Ie(b,oe,ee,z){const ie=new Uint8Array(4),Ce=n.createTexture();n.bindTexture(b,Ce),n.texParameteri(b,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(b,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ke=0;Ke<ee;Ke++)t&&(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)?n.texImage3D(oe,0,n.RGBA,1,1,z,0,n.RGBA,n.UNSIGNED_BYTE,ie):n.texImage2D(oe+Ke,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ie);return Ce}const Fe={};Fe[n.TEXTURE_2D]=Ie(n.TEXTURE_2D,n.TEXTURE_2D,1),Fe[n.TEXTURE_CUBE_MAP]=Ie(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),t&&(Fe[n.TEXTURE_2D_ARRAY]=Ie(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Fe[n.TEXTURE_3D]=Ie(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),o.setClear(1),l.setClear(0),Le(n.DEPTH_TEST),o.setFunc(os),He(!1),Re(Zl),Le(n.CULL_FACE),Te(qt);function Le(b){h[b]!==!0&&(n.enable(b),h[b]=!0)}function eA(b){h[b]!==!1&&(n.disable(b),h[b]=!1)}function Oe(b,oe){return p[b]!==oe?(n.bindFramebuffer(b,oe),p[b]=oe,t&&(b===n.DRAW_FRAMEBUFFER&&(p[n.FRAMEBUFFER]=oe),b===n.FRAMEBUFFER&&(p[n.DRAW_FRAMEBUFFER]=oe)),!0):!1}function D(b,oe){let ee=m,z=!1;if(b)if(ee=g.get(oe),ee===void 0&&(ee=[],g.set(oe,ee)),b.isWebGLMultipleRenderTargets){const ie=b.texture;if(ee.length!==ie.length||ee[0]!==n.COLOR_ATTACHMENT0){for(let Ce=0,Ke=ie.length;Ce<Ke;Ce++)ee[Ce]=n.COLOR_ATTACHMENT0+Ce;ee.length=ie.length,z=!0}}else ee[0]!==n.COLOR_ATTACHMENT0&&(ee[0]=n.COLOR_ATTACHMENT0,z=!0);else ee[0]!==n.BACK&&(ee[0]=n.BACK,z=!0);z&&(A.isWebGL2?n.drawBuffers(ee):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ee))}function UA(b){return d!==b?(n.useProgram(b),d=b,!0):!1}const xe={[fn]:n.FUNC_ADD,[m0]:n.FUNC_SUBTRACT,[B0]:n.FUNC_REVERSE_SUBTRACT};if(t)xe[Ac]=n.MIN,xe[tc]=n.MAX;else{const b=e.get("EXT_blend_minmax");b!==null&&(xe[Ac]=b.MIN_EXT,xe[tc]=b.MAX_EXT)}const be={[_0]:n.ZERO,[w0]:n.ONE,[v0]:n.SRC_COLOR,[co]:n.SRC_ALPHA,[S0]:n.SRC_ALPHA_SATURATE,[U0]:n.DST_COLOR,[C0]:n.DST_ALPHA,[E0]:n.ONE_MINUS_SRC_COLOR,[uo]:n.ONE_MINUS_SRC_ALPHA,[y0]:n.ONE_MINUS_DST_COLOR,[x0]:n.ONE_MINUS_DST_ALPHA,[M0]:n.CONSTANT_COLOR,[F0]:n.ONE_MINUS_CONSTANT_COLOR,[b0]:n.CONSTANT_ALPHA,[T0]:n.ONE_MINUS_CONSTANT_ALPHA};function Te(b,oe,ee,z,ie,Ce,Ke,lA,XA,je){if(b===qt){f===!0&&(eA(n.BLEND),f=!1);return}if(f===!1&&(Le(n.BLEND),f=!0),b!==g0){if(b!==v||je!==G){if((B!==fn||x!==fn)&&(n.blendEquation(n.FUNC_ADD),B=fn,x=fn),je)switch(b){case Ai:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case jl:n.blendFunc(n.ONE,n.ONE);break;case $l:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case ec:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",b);break}else switch(b){case Ai:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case jl:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case $l:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case ec:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",b);break}y=null,C=null,S=null,R=null,_.set(0,0,0),M=0,v=b,G=je}return}ie=ie||oe,Ce=Ce||ee,Ke=Ke||z,(oe!==B||ie!==x)&&(n.blendEquationSeparate(xe[oe],xe[ie]),B=oe,x=ie),(ee!==y||z!==C||Ce!==S||Ke!==R)&&(n.blendFuncSeparate(be[ee],be[z],be[Ce],be[Ke]),y=ee,C=z,S=Ce,R=Ke),(lA.equals(_)===!1||XA!==M)&&(n.blendColor(lA.r,lA.g,lA.b,XA),_.copy(lA),M=XA),v=b,G=!1}function tA(b,oe){b.side===at?eA(n.CULL_FACE):Le(n.CULL_FACE);let ee=b.side===PA;oe&&(ee=!ee),He(ee),b.blending===Ai&&b.transparent===!1?Te(qt):Te(b.blending,b.blendEquation,b.blendSrc,b.blendDst,b.blendEquationAlpha,b.blendSrcAlpha,b.blendDstAlpha,b.blendColor,b.blendAlpha,b.premultipliedAlpha),o.setFunc(b.depthFunc),o.setTest(b.depthTest),o.setMask(b.depthWrite),a.setMask(b.colorWrite);const z=b.stencilWrite;l.setTest(z),z&&(l.setMask(b.stencilWriteMask),l.setFunc(b.stencilFunc,b.stencilRef,b.stencilFuncMask),l.setOp(b.stencilFail,b.stencilZFail,b.stencilZPass)),oA(b.polygonOffset,b.polygonOffsetFactor,b.polygonOffsetUnits),b.alphaToCoverage===!0?Le(n.SAMPLE_ALPHA_TO_COVERAGE):eA(n.SAMPLE_ALPHA_TO_COVERAGE)}function He(b){Z!==b&&(b?n.frontFace(n.CW):n.frontFace(n.CCW),Z=b)}function Re(b){b!==f0?(Le(n.CULL_FACE),b!==Y&&(b===Zl?n.cullFace(n.BACK):b===d0?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):eA(n.CULL_FACE),Y=b}function Xe(b){b!==T&&(j&&n.lineWidth(b),T=b)}function oA(b,oe,ee){b?(Le(n.POLYGON_OFFSET_FILL),(O!==oe||X!==ee)&&(n.polygonOffset(oe,ee),O=oe,X=ee)):eA(n.POLYGON_OFFSET_FILL)}function gA(b){b?Le(n.SCISSOR_TEST):eA(n.SCISSOR_TEST)}function U(b){b===void 0&&(b=n.TEXTURE0+k-1),Q!==b&&(n.activeTexture(b),Q=b)}function w(b,oe,ee){ee===void 0&&(Q===null?ee=n.TEXTURE0+k-1:ee=Q);let z=K[ee];z===void 0&&(z={type:void 0,texture:void 0},K[ee]=z),(z.type!==b||z.texture!==oe)&&(Q!==ee&&(n.activeTexture(ee),Q=ee),n.bindTexture(b,oe||Fe[b]),z.type=b,z.texture=oe)}function H(){const b=K[Q];b!==void 0&&b.type!==void 0&&(n.bindTexture(b.type,null),b.type=void 0,b.texture=void 0)}function te(){try{n.compressedTexImage2D.apply(n,arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function $(){try{n.compressedTexImage3D.apply(n,arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function ne(){try{n.texSubImage2D.apply(n,arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function _e(){try{n.texSubImage3D.apply(n,arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function se(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function de(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function F(){try{n.texStorage2D.apply(n,arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function re(){try{n.texStorage3D.apply(n,arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function J(){try{n.texImage2D.apply(n,arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function Se(){try{n.texImage3D.apply(n,arguments)}catch(b){console.error("THREE.WebGLState:",b)}}function we(b){he.equals(b)===!1&&(n.scissor(b.x,b.y,b.z,b.w),he.copy(b))}function Ue(b){Ee.equals(b)===!1&&(n.viewport(b.x,b.y,b.z,b.w),Ee.copy(b))}function Be(b,oe){let ee=u.get(oe);ee===void 0&&(ee=new WeakMap,u.set(oe,ee));let z=ee.get(b);z===void 0&&(z=n.getUniformBlockIndex(oe,b.name),ee.set(b,z))}function me(b,oe){const z=u.get(oe).get(b);c.get(oe)!==z&&(n.uniformBlockBinding(oe,z,b.__bindingPointIndex),c.set(oe,z))}function ke(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),t===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},Q=null,K={},p={},g=new WeakMap,m=[],d=null,f=!1,v=null,B=null,y=null,C=null,x=null,S=null,R=null,_=new Ye(0,0,0),M=0,G=!1,Z=null,Y=null,T=null,O=null,X=null,he.set(0,0,n.canvas.width,n.canvas.height),Ee.set(0,0,n.canvas.width,n.canvas.height),a.reset(),o.reset(),l.reset()}return{buffers:{color:a,depth:o,stencil:l},enable:Le,disable:eA,bindFramebuffer:Oe,drawBuffers:D,useProgram:UA,setBlending:Te,setMaterial:tA,setFlipSided:He,setCullFace:Re,setLineWidth:Xe,setPolygonOffset:oA,setScissorTest:gA,activeTexture:U,bindTexture:w,unbindTexture:H,compressedTexImage2D:te,compressedTexImage3D:$,texImage2D:J,texImage3D:Se,updateUBOMapping:Be,uniformBlockBinding:me,texStorage2D:F,texStorage3D:re,texSubImage2D:ne,texSubImage3D:_e,compressedTexSubImage2D:se,compressedTexSubImage3D:de,scissor:we,viewport:Ue,reset:ke}}function Ux(n,e,A,t,i,r,s){const a=i.isWebGL2,o=i.maxTextures,l=i.maxCubemapSize,c=i.maxTextureSize,u=i.maxSamples,h=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,p=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),g=new WeakMap;let m;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(U,w){return f?new OffscreenCanvas(U,w):ds("canvas")}function B(U,w,H,te){let $=1;if((U.width>te||U.height>te)&&($=te/Math.max(U.width,U.height)),$<1||w===!0)if(typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&U instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&U instanceof ImageBitmap){const ne=w?fs:Math.floor,_e=ne($*U.width),se=ne($*U.height);m===void 0&&(m=v(_e,se));const de=H?v(_e,se):m;return de.width=_e,de.height=se,de.getContext("2d").drawImage(U,0,0,_e,se),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+U.width+"x"+U.height+") to ("+_e+"x"+se+")."),de}else return"data"in U&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+U.width+"x"+U.height+")."),U;return U}function y(U){return Bo(U.width)&&Bo(U.height)}function C(U){return a?!1:U.wrapS!==ot||U.wrapT!==ot||U.minFilter!==DA&&U.minFilter!==ZA}function x(U,w){return U.generateMipmaps&&w&&U.minFilter!==DA&&U.minFilter!==ZA}function S(U){n.generateMipmap(U)}function R(U,w,H,te,$=!1){if(a===!1)return w;if(U!==null){if(n[U]!==void 0)return n[U];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+U+"'")}let ne=w;if(w===n.RED&&(H===n.FLOAT&&(ne=n.R32F),H===n.HALF_FLOAT&&(ne=n.R16F),H===n.UNSIGNED_BYTE&&(ne=n.R8)),w===n.RED_INTEGER&&(H===n.UNSIGNED_BYTE&&(ne=n.R8UI),H===n.UNSIGNED_SHORT&&(ne=n.R16UI),H===n.UNSIGNED_INT&&(ne=n.R32UI),H===n.BYTE&&(ne=n.R8I),H===n.SHORT&&(ne=n.R16I),H===n.INT&&(ne=n.R32I)),w===n.RG&&(H===n.FLOAT&&(ne=n.RG32F),H===n.HALF_FLOAT&&(ne=n.RG16F),H===n.UNSIGNED_BYTE&&(ne=n.RG8)),w===n.RGBA){const _e=$?ls:qe.getTransfer(te);H===n.FLOAT&&(ne=n.RGBA32F),H===n.HALF_FLOAT&&(ne=n.RGBA16F),H===n.UNSIGNED_BYTE&&(ne=_e===AA?n.SRGB8_ALPHA8:n.RGBA8),H===n.UNSIGNED_SHORT_4_4_4_4&&(ne=n.RGBA4),H===n.UNSIGNED_SHORT_5_5_5_1&&(ne=n.RGB5_A1)}return(ne===n.R16F||ne===n.R32F||ne===n.RG16F||ne===n.RG32F||ne===n.RGBA16F||ne===n.RGBA32F)&&e.get("EXT_color_buffer_float"),ne}function _(U,w,H){return x(U,H)===!0||U.isFramebufferTexture&&U.minFilter!==DA&&U.minFilter!==ZA?Math.log2(Math.max(w.width,w.height))+1:U.mipmaps!==void 0&&U.mipmaps.length>0?U.mipmaps.length:U.isCompressedTexture&&Array.isArray(U.image)?w.mipmaps.length:1}function M(U){return U===DA||U===nc||U===sa?n.NEAREST:n.LINEAR}function G(U){const w=U.target;w.removeEventListener("dispose",G),Y(w),w.isVideoTexture&&g.delete(w)}function Z(U){const w=U.target;w.removeEventListener("dispose",Z),O(w)}function Y(U){const w=t.get(U);if(w.__webglInit===void 0)return;const H=U.source,te=d.get(H);if(te){const $=te[w.__cacheKey];$.usedTimes--,$.usedTimes===0&&T(U),Object.keys(te).length===0&&d.delete(H)}t.remove(U)}function T(U){const w=t.get(U);n.deleteTexture(w.__webglTexture);const H=U.source,te=d.get(H);delete te[w.__cacheKey],s.memory.textures--}function O(U){const w=U.texture,H=t.get(U),te=t.get(w);if(te.__webglTexture!==void 0&&(n.deleteTexture(te.__webglTexture),s.memory.textures--),U.depthTexture&&U.depthTexture.dispose(),U.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(H.__webglFramebuffer[$]))for(let ne=0;ne<H.__webglFramebuffer[$].length;ne++)n.deleteFramebuffer(H.__webglFramebuffer[$][ne]);else n.deleteFramebuffer(H.__webglFramebuffer[$]);H.__webglDepthbuffer&&n.deleteRenderbuffer(H.__webglDepthbuffer[$])}else{if(Array.isArray(H.__webglFramebuffer))for(let $=0;$<H.__webglFramebuffer.length;$++)n.deleteFramebuffer(H.__webglFramebuffer[$]);else n.deleteFramebuffer(H.__webglFramebuffer);if(H.__webglDepthbuffer&&n.deleteRenderbuffer(H.__webglDepthbuffer),H.__webglMultisampledFramebuffer&&n.deleteFramebuffer(H.__webglMultisampledFramebuffer),H.__webglColorRenderbuffer)for(let $=0;$<H.__webglColorRenderbuffer.length;$++)H.__webglColorRenderbuffer[$]&&n.deleteRenderbuffer(H.__webglColorRenderbuffer[$]);H.__webglDepthRenderbuffer&&n.deleteRenderbuffer(H.__webglDepthRenderbuffer)}if(U.isWebGLMultipleRenderTargets)for(let $=0,ne=w.length;$<ne;$++){const _e=t.get(w[$]);_e.__webglTexture&&(n.deleteTexture(_e.__webglTexture),s.memory.textures--),t.remove(w[$])}t.remove(w),t.remove(U)}let X=0;function k(){X=0}function j(){const U=X;return U>=o&&console.warn("THREE.WebGLTextures: Trying to use "+U+" texture units while this GPU supports only "+o),X+=1,U}function W(U){const w=[];return w.push(U.wrapS),w.push(U.wrapT),w.push(U.wrapR||0),w.push(U.magFilter),w.push(U.minFilter),w.push(U.anisotropy),w.push(U.internalFormat),w.push(U.format),w.push(U.type),w.push(U.generateMipmaps),w.push(U.premultiplyAlpha),w.push(U.flipY),w.push(U.unpackAlignment),w.push(U.colorSpace),w.join()}function q(U,w){const H=t.get(U);if(U.isVideoTexture&&oA(U),U.isRenderTargetTexture===!1&&U.version>0&&H.__version!==U.version){const te=U.image;if(te===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(te.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Le(H,U,w);return}}A.bindTexture(n.TEXTURE_2D,H.__webglTexture,n.TEXTURE0+w)}function Q(U,w){const H=t.get(U);if(U.version>0&&H.__version!==U.version){Le(H,U,w);return}A.bindTexture(n.TEXTURE_2D_ARRAY,H.__webglTexture,n.TEXTURE0+w)}function K(U,w){const H=t.get(U);if(U.version>0&&H.__version!==U.version){Le(H,U,w);return}A.bindTexture(n.TEXTURE_3D,H.__webglTexture,n.TEXTURE0+w)}function ae(U,w){const H=t.get(U);if(U.version>0&&H.__version!==U.version){eA(H,U,w);return}A.bindTexture(n.TEXTURE_CUBE_MAP,H.__webglTexture,n.TEXTURE0+w)}const ue={[po]:n.REPEAT,[ot]:n.CLAMP_TO_EDGE,[go]:n.MIRRORED_REPEAT},he={[DA]:n.NEAREST,[nc]:n.NEAREST_MIPMAP_NEAREST,[sa]:n.NEAREST_MIPMAP_LINEAR,[ZA]:n.LINEAR,[W0]:n.LINEAR_MIPMAP_NEAREST,[ki]:n.LINEAR_MIPMAP_LINEAR},Ee={[s_]:n.NEVER,[f_]:n.ALWAYS,[a_]:n.LESS,[l_]:n.LEQUAL,[o_]:n.EQUAL,[h_]:n.GEQUAL,[c_]:n.GREATER,[u_]:n.NOTEQUAL};function Ie(U,w,H){if(H?(n.texParameteri(U,n.TEXTURE_WRAP_S,ue[w.wrapS]),n.texParameteri(U,n.TEXTURE_WRAP_T,ue[w.wrapT]),(U===n.TEXTURE_3D||U===n.TEXTURE_2D_ARRAY)&&n.texParameteri(U,n.TEXTURE_WRAP_R,ue[w.wrapR]),n.texParameteri(U,n.TEXTURE_MAG_FILTER,he[w.magFilter]),n.texParameteri(U,n.TEXTURE_MIN_FILTER,he[w.minFilter])):(n.texParameteri(U,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(U,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(U===n.TEXTURE_3D||U===n.TEXTURE_2D_ARRAY)&&n.texParameteri(U,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(w.wrapS!==ot||w.wrapT!==ot)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(U,n.TEXTURE_MAG_FILTER,M(w.magFilter)),n.texParameteri(U,n.TEXTURE_MIN_FILTER,M(w.minFilter)),w.minFilter!==DA&&w.minFilter!==ZA&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),w.compareFunction&&(n.texParameteri(U,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(U,n.TEXTURE_COMPARE_FUNC,Ee[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const te=e.get("EXT_texture_filter_anisotropic");if(w.magFilter===DA||w.minFilter!==sa&&w.minFilter!==ki||w.type===Xt&&e.has("OES_texture_float_linear")===!1||a===!1&&w.type===Ki&&e.has("OES_texture_half_float_linear")===!1)return;(w.anisotropy>1||t.get(w).__currentAnisotropy)&&(n.texParameterf(U,te.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,i.getMaxAnisotropy())),t.get(w).__currentAnisotropy=w.anisotropy)}}function Fe(U,w){let H=!1;U.__webglInit===void 0&&(U.__webglInit=!0,w.addEventListener("dispose",G));const te=w.source;let $=d.get(te);$===void 0&&($={},d.set(te,$));const ne=W(w);if(ne!==U.__cacheKey){$[ne]===void 0&&($[ne]={texture:n.createTexture(),usedTimes:0},s.memory.textures++,H=!0),$[ne].usedTimes++;const _e=$[U.__cacheKey];_e!==void 0&&($[U.__cacheKey].usedTimes--,_e.usedTimes===0&&T(w)),U.__cacheKey=ne,U.__webglTexture=$[ne].texture}return H}function Le(U,w,H){let te=n.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(te=n.TEXTURE_2D_ARRAY),w.isData3DTexture&&(te=n.TEXTURE_3D);const $=Fe(U,w),ne=w.source;A.bindTexture(te,U.__webglTexture,n.TEXTURE0+H);const _e=t.get(ne);if(ne.version!==_e.__version||$===!0){A.activeTexture(n.TEXTURE0+H);const se=qe.getPrimaries(qe.workingColorSpace),de=w.colorSpace===$A?null:qe.getPrimaries(w.colorSpace),F=w.colorSpace===$A||se===de?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,w.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,w.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,F);const re=C(w)&&y(w.image)===!1;let J=B(w.image,re,!1,c);J=gA(w,J);const Se=y(J)||a,we=r.convert(w.format,w.colorSpace);let Ue=r.convert(w.type),Be=R(w.internalFormat,we,Ue,w.colorSpace,w.isVideoTexture);Ie(te,w,Se);let me;const ke=w.mipmaps,b=a&&w.isVideoTexture!==!0,oe=_e.__version===void 0||$===!0,ee=_(w,J,Se);if(w.isDepthTexture)Be=n.DEPTH_COMPONENT,a?w.type===Xt?Be=n.DEPTH_COMPONENT32F:w.type===Wt?Be=n.DEPTH_COMPONENT24:w.type===Bn?Be=n.DEPTH24_STENCIL8:Be=n.DEPTH_COMPONENT16:w.type===Xt&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),w.format===_n&&Be===n.DEPTH_COMPONENT&&w.type!==Qo&&w.type!==Wt&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),w.type=Wt,Ue=r.convert(w.type)),w.format===si&&Be===n.DEPTH_COMPONENT&&(Be=n.DEPTH_STENCIL,w.type!==Bn&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),w.type=Bn,Ue=r.convert(w.type))),oe&&(b?A.texStorage2D(n.TEXTURE_2D,1,Be,J.width,J.height):A.texImage2D(n.TEXTURE_2D,0,Be,J.width,J.height,0,we,Ue,null));else if(w.isDataTexture)if(ke.length>0&&Se){b&&oe&&A.texStorage2D(n.TEXTURE_2D,ee,Be,ke[0].width,ke[0].height);for(let z=0,ie=ke.length;z<ie;z++)me=ke[z],b?A.texSubImage2D(n.TEXTURE_2D,z,0,0,me.width,me.height,we,Ue,me.data):A.texImage2D(n.TEXTURE_2D,z,Be,me.width,me.height,0,we,Ue,me.data);w.generateMipmaps=!1}else b?(oe&&A.texStorage2D(n.TEXTURE_2D,ee,Be,J.width,J.height),A.texSubImage2D(n.TEXTURE_2D,0,0,0,J.width,J.height,we,Ue,J.data)):A.texImage2D(n.TEXTURE_2D,0,Be,J.width,J.height,0,we,Ue,J.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){b&&oe&&A.texStorage3D(n.TEXTURE_2D_ARRAY,ee,Be,ke[0].width,ke[0].height,J.depth);for(let z=0,ie=ke.length;z<ie;z++)me=ke[z],w.format!==lt?we!==null?b?A.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,z,0,0,0,me.width,me.height,J.depth,we,me.data,0,0):A.compressedTexImage3D(n.TEXTURE_2D_ARRAY,z,Be,me.width,me.height,J.depth,0,me.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):b?A.texSubImage3D(n.TEXTURE_2D_ARRAY,z,0,0,0,me.width,me.height,J.depth,we,Ue,me.data):A.texImage3D(n.TEXTURE_2D_ARRAY,z,Be,me.width,me.height,J.depth,0,we,Ue,me.data)}else{b&&oe&&A.texStorage2D(n.TEXTURE_2D,ee,Be,ke[0].width,ke[0].height);for(let z=0,ie=ke.length;z<ie;z++)me=ke[z],w.format!==lt?we!==null?b?A.compressedTexSubImage2D(n.TEXTURE_2D,z,0,0,me.width,me.height,we,me.data):A.compressedTexImage2D(n.TEXTURE_2D,z,Be,me.width,me.height,0,me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):b?A.texSubImage2D(n.TEXTURE_2D,z,0,0,me.width,me.height,we,Ue,me.data):A.texImage2D(n.TEXTURE_2D,z,Be,me.width,me.height,0,we,Ue,me.data)}else if(w.isDataArrayTexture)b?(oe&&A.texStorage3D(n.TEXTURE_2D_ARRAY,ee,Be,J.width,J.height,J.depth),A.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,we,Ue,J.data)):A.texImage3D(n.TEXTURE_2D_ARRAY,0,Be,J.width,J.height,J.depth,0,we,Ue,J.data);else if(w.isData3DTexture)b?(oe&&A.texStorage3D(n.TEXTURE_3D,ee,Be,J.width,J.height,J.depth),A.texSubImage3D(n.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,we,Ue,J.data)):A.texImage3D(n.TEXTURE_3D,0,Be,J.width,J.height,J.depth,0,we,Ue,J.data);else if(w.isFramebufferTexture){if(oe)if(b)A.texStorage2D(n.TEXTURE_2D,ee,Be,J.width,J.height);else{let z=J.width,ie=J.height;for(let Ce=0;Ce<ee;Ce++)A.texImage2D(n.TEXTURE_2D,Ce,Be,z,ie,0,we,Ue,null),z>>=1,ie>>=1}}else if(ke.length>0&&Se){b&&oe&&A.texStorage2D(n.TEXTURE_2D,ee,Be,ke[0].width,ke[0].height);for(let z=0,ie=ke.length;z<ie;z++)me=ke[z],b?A.texSubImage2D(n.TEXTURE_2D,z,0,0,we,Ue,me):A.texImage2D(n.TEXTURE_2D,z,Be,we,Ue,me);w.generateMipmaps=!1}else b?(oe&&A.texStorage2D(n.TEXTURE_2D,ee,Be,J.width,J.height),A.texSubImage2D(n.TEXTURE_2D,0,0,0,we,Ue,J)):A.texImage2D(n.TEXTURE_2D,0,Be,we,Ue,J);x(w,Se)&&S(te),_e.__version=ne.version,w.onUpdate&&w.onUpdate(w)}U.__version=w.version}function eA(U,w,H){if(w.image.length!==6)return;const te=Fe(U,w),$=w.source;A.bindTexture(n.TEXTURE_CUBE_MAP,U.__webglTexture,n.TEXTURE0+H);const ne=t.get($);if($.version!==ne.__version||te===!0){A.activeTexture(n.TEXTURE0+H);const _e=qe.getPrimaries(qe.workingColorSpace),se=w.colorSpace===$A?null:qe.getPrimaries(w.colorSpace),de=w.colorSpace===$A||_e===se?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,w.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,w.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,de);const F=w.isCompressedTexture||w.image[0].isCompressedTexture,re=w.image[0]&&w.image[0].isDataTexture,J=[];for(let z=0;z<6;z++)!F&&!re?J[z]=B(w.image[z],!1,!0,l):J[z]=re?w.image[z].image:w.image[z],J[z]=gA(w,J[z]);const Se=J[0],we=y(Se)||a,Ue=r.convert(w.format,w.colorSpace),Be=r.convert(w.type),me=R(w.internalFormat,Ue,Be,w.colorSpace),ke=a&&w.isVideoTexture!==!0,b=ne.__version===void 0||te===!0;let oe=_(w,Se,we);Ie(n.TEXTURE_CUBE_MAP,w,we);let ee;if(F){ke&&b&&A.texStorage2D(n.TEXTURE_CUBE_MAP,oe,me,Se.width,Se.height);for(let z=0;z<6;z++){ee=J[z].mipmaps;for(let ie=0;ie<ee.length;ie++){const Ce=ee[ie];w.format!==lt?Ue!==null?ke?A.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+z,ie,0,0,Ce.width,Ce.height,Ue,Ce.data):A.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+z,ie,me,Ce.width,Ce.height,0,Ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ke?A.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+z,ie,0,0,Ce.width,Ce.height,Ue,Be,Ce.data):A.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+z,ie,me,Ce.width,Ce.height,0,Ue,Be,Ce.data)}}}else{ee=w.mipmaps,ke&&b&&(ee.length>0&&oe++,A.texStorage2D(n.TEXTURE_CUBE_MAP,oe,me,J[0].width,J[0].height));for(let z=0;z<6;z++)if(re){ke?A.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+z,0,0,0,J[z].width,J[z].height,Ue,Be,J[z].data):A.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+z,0,me,J[z].width,J[z].height,0,Ue,Be,J[z].data);for(let ie=0;ie<ee.length;ie++){const Ke=ee[ie].image[z].image;ke?A.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+z,ie+1,0,0,Ke.width,Ke.height,Ue,Be,Ke.data):A.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+z,ie+1,me,Ke.width,Ke.height,0,Ue,Be,Ke.data)}}else{ke?A.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+z,0,0,0,Ue,Be,J[z]):A.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+z,0,me,Ue,Be,J[z]);for(let ie=0;ie<ee.length;ie++){const Ce=ee[ie];ke?A.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+z,ie+1,0,0,Ue,Be,Ce.image[z]):A.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+z,ie+1,me,Ue,Be,Ce.image[z])}}}x(w,we)&&S(n.TEXTURE_CUBE_MAP),ne.__version=$.version,w.onUpdate&&w.onUpdate(w)}U.__version=w.version}function Oe(U,w,H,te,$,ne){const _e=r.convert(H.format,H.colorSpace),se=r.convert(H.type),de=R(H.internalFormat,_e,se,H.colorSpace);if(!t.get(w).__hasExternalTextures){const re=Math.max(1,w.width>>ne),J=Math.max(1,w.height>>ne);$===n.TEXTURE_3D||$===n.TEXTURE_2D_ARRAY?A.texImage3D($,ne,de,re,J,w.depth,0,_e,se,null):A.texImage2D($,ne,de,re,J,0,_e,se,null)}A.bindFramebuffer(n.FRAMEBUFFER,U),Xe(w)?h.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,te,$,t.get(H).__webglTexture,0,Re(w)):($===n.TEXTURE_2D||$>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,te,$,t.get(H).__webglTexture,ne),A.bindFramebuffer(n.FRAMEBUFFER,null)}function D(U,w,H){if(n.bindRenderbuffer(n.RENDERBUFFER,U),w.depthBuffer&&!w.stencilBuffer){let te=a===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(H||Xe(w)){const $=w.depthTexture;$&&$.isDepthTexture&&($.type===Xt?te=n.DEPTH_COMPONENT32F:$.type===Wt&&(te=n.DEPTH_COMPONENT24));const ne=Re(w);Xe(w)?h.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ne,te,w.width,w.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,ne,te,w.width,w.height)}else n.renderbufferStorage(n.RENDERBUFFER,te,w.width,w.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,U)}else if(w.depthBuffer&&w.stencilBuffer){const te=Re(w);H&&Xe(w)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,te,n.DEPTH24_STENCIL8,w.width,w.height):Xe(w)?h.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,te,n.DEPTH24_STENCIL8,w.width,w.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,w.width,w.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,U)}else{const te=w.isWebGLMultipleRenderTargets===!0?w.texture:[w.texture];for(let $=0;$<te.length;$++){const ne=te[$],_e=r.convert(ne.format,ne.colorSpace),se=r.convert(ne.type),de=R(ne.internalFormat,_e,se,ne.colorSpace),F=Re(w);H&&Xe(w)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,F,de,w.width,w.height):Xe(w)?h.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,F,de,w.width,w.height):n.renderbufferStorage(n.RENDERBUFFER,de,w.width,w.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function UA(U,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(A.bindFramebuffer(n.FRAMEBUFFER,U),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!t.get(w.depthTexture).__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),q(w.depthTexture,0);const te=t.get(w.depthTexture).__webglTexture,$=Re(w);if(w.depthTexture.format===_n)Xe(w)?h.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,te,0,$):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,te,0);else if(w.depthTexture.format===si)Xe(w)?h.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,te,0,$):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,te,0);else throw new Error("Unknown depthTexture format")}function xe(U){const w=t.get(U),H=U.isWebGLCubeRenderTarget===!0;if(U.depthTexture&&!w.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");UA(w.__webglFramebuffer,U)}else if(H){w.__webglDepthbuffer=[];for(let te=0;te<6;te++)A.bindFramebuffer(n.FRAMEBUFFER,w.__webglFramebuffer[te]),w.__webglDepthbuffer[te]=n.createRenderbuffer(),D(w.__webglDepthbuffer[te],U,!1)}else A.bindFramebuffer(n.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer=n.createRenderbuffer(),D(w.__webglDepthbuffer,U,!1);A.bindFramebuffer(n.FRAMEBUFFER,null)}function be(U,w,H){const te=t.get(U);w!==void 0&&Oe(te.__webglFramebuffer,U,U.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),H!==void 0&&xe(U)}function Te(U){const w=U.texture,H=t.get(U),te=t.get(w);U.addEventListener("dispose",Z),U.isWebGLMultipleRenderTargets!==!0&&(te.__webglTexture===void 0&&(te.__webglTexture=n.createTexture()),te.__version=w.version,s.memory.textures++);const $=U.isWebGLCubeRenderTarget===!0,ne=U.isWebGLMultipleRenderTargets===!0,_e=y(U)||a;if($){H.__webglFramebuffer=[];for(let se=0;se<6;se++)if(a&&w.mipmaps&&w.mipmaps.length>0){H.__webglFramebuffer[se]=[];for(let de=0;de<w.mipmaps.length;de++)H.__webglFramebuffer[se][de]=n.createFramebuffer()}else H.__webglFramebuffer[se]=n.createFramebuffer()}else{if(a&&w.mipmaps&&w.mipmaps.length>0){H.__webglFramebuffer=[];for(let se=0;se<w.mipmaps.length;se++)H.__webglFramebuffer[se]=n.createFramebuffer()}else H.__webglFramebuffer=n.createFramebuffer();if(ne)if(i.drawBuffers){const se=U.texture;for(let de=0,F=se.length;de<F;de++){const re=t.get(se[de]);re.__webglTexture===void 0&&(re.__webglTexture=n.createTexture(),s.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&U.samples>0&&Xe(U)===!1){const se=ne?w:[w];H.__webglMultisampledFramebuffer=n.createFramebuffer(),H.__webglColorRenderbuffer=[],A.bindFramebuffer(n.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let de=0;de<se.length;de++){const F=se[de];H.__webglColorRenderbuffer[de]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,H.__webglColorRenderbuffer[de]);const re=r.convert(F.format,F.colorSpace),J=r.convert(F.type),Se=R(F.internalFormat,re,J,F.colorSpace,U.isXRRenderTarget===!0),we=Re(U);n.renderbufferStorageMultisample(n.RENDERBUFFER,we,Se,U.width,U.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.RENDERBUFFER,H.__webglColorRenderbuffer[de])}n.bindRenderbuffer(n.RENDERBUFFER,null),U.depthBuffer&&(H.__webglDepthRenderbuffer=n.createRenderbuffer(),D(H.__webglDepthRenderbuffer,U,!0)),A.bindFramebuffer(n.FRAMEBUFFER,null)}}if($){A.bindTexture(n.TEXTURE_CUBE_MAP,te.__webglTexture),Ie(n.TEXTURE_CUBE_MAP,w,_e);for(let se=0;se<6;se++)if(a&&w.mipmaps&&w.mipmaps.length>0)for(let de=0;de<w.mipmaps.length;de++)Oe(H.__webglFramebuffer[se][de],U,w,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+se,de);else Oe(H.__webglFramebuffer[se],U,w,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0);x(w,_e)&&S(n.TEXTURE_CUBE_MAP),A.unbindTexture()}else if(ne){const se=U.texture;for(let de=0,F=se.length;de<F;de++){const re=se[de],J=t.get(re);A.bindTexture(n.TEXTURE_2D,J.__webglTexture),Ie(n.TEXTURE_2D,re,_e),Oe(H.__webglFramebuffer,U,re,n.COLOR_ATTACHMENT0+de,n.TEXTURE_2D,0),x(re,_e)&&S(n.TEXTURE_2D)}A.unbindTexture()}else{let se=n.TEXTURE_2D;if((U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(a?se=U.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),A.bindTexture(se,te.__webglTexture),Ie(se,w,_e),a&&w.mipmaps&&w.mipmaps.length>0)for(let de=0;de<w.mipmaps.length;de++)Oe(H.__webglFramebuffer[de],U,w,n.COLOR_ATTACHMENT0,se,de);else Oe(H.__webglFramebuffer,U,w,n.COLOR_ATTACHMENT0,se,0);x(w,_e)&&S(se),A.unbindTexture()}U.depthBuffer&&xe(U)}function tA(U){const w=y(U)||a,H=U.isWebGLMultipleRenderTargets===!0?U.texture:[U.texture];for(let te=0,$=H.length;te<$;te++){const ne=H[te];if(x(ne,w)){const _e=U.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,se=t.get(ne).__webglTexture;A.bindTexture(_e,se),S(_e),A.unbindTexture()}}}function He(U){if(a&&U.samples>0&&Xe(U)===!1){const w=U.isWebGLMultipleRenderTargets?U.texture:[U.texture],H=U.width,te=U.height;let $=n.COLOR_BUFFER_BIT;const ne=[],_e=U.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,se=t.get(U),de=U.isWebGLMultipleRenderTargets===!0;if(de)for(let F=0;F<w.length;F++)A.bindFramebuffer(n.FRAMEBUFFER,se.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+F,n.RENDERBUFFER,null),A.bindFramebuffer(n.FRAMEBUFFER,se.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+F,n.TEXTURE_2D,null,0);A.bindFramebuffer(n.READ_FRAMEBUFFER,se.__webglMultisampledFramebuffer),A.bindFramebuffer(n.DRAW_FRAMEBUFFER,se.__webglFramebuffer);for(let F=0;F<w.length;F++){ne.push(n.COLOR_ATTACHMENT0+F),U.depthBuffer&&ne.push(_e);const re=se.__ignoreDepthValues!==void 0?se.__ignoreDepthValues:!1;if(re===!1&&(U.depthBuffer&&($|=n.DEPTH_BUFFER_BIT),U.stencilBuffer&&($|=n.STENCIL_BUFFER_BIT)),de&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,se.__webglColorRenderbuffer[F]),re===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[_e]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_e])),de){const J=t.get(w[F]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,J,0)}n.blitFramebuffer(0,0,H,te,0,0,H,te,$,n.NEAREST),p&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ne)}if(A.bindFramebuffer(n.READ_FRAMEBUFFER,null),A.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),de)for(let F=0;F<w.length;F++){A.bindFramebuffer(n.FRAMEBUFFER,se.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+F,n.RENDERBUFFER,se.__webglColorRenderbuffer[F]);const re=t.get(w[F]).__webglTexture;A.bindFramebuffer(n.FRAMEBUFFER,se.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+F,n.TEXTURE_2D,re,0)}A.bindFramebuffer(n.DRAW_FRAMEBUFFER,se.__webglMultisampledFramebuffer)}}function Re(U){return Math.min(u,U.samples)}function Xe(U){const w=t.get(U);return a&&U.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function oA(U){const w=s.render.frame;g.get(U)!==w&&(g.set(U,w),U.update())}function gA(U,w){const H=U.colorSpace,te=U.format,$=U.type;return U.isCompressedTexture===!0||U.isVideoTexture===!0||U.format===mo||H!==It&&H!==$A&&(qe.getTransfer(H)===AA?a===!1?e.has("EXT_sRGB")===!0&&te===lt?(U.format=mo,U.minFilter=ZA,U.generateMipmaps=!1):w=zh.sRGBToLinear(w):(te!==lt||$!==jt)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),w}this.allocateTextureUnit=j,this.resetTextureUnits=k,this.setTexture2D=q,this.setTexture2DArray=Q,this.setTexture3D=K,this.setTextureCube=ae,this.rebindTextures=be,this.setupRenderTarget=Te,this.updateRenderTargetMipmap=tA,this.updateMultisampleRenderTarget=He,this.setupDepthRenderbuffer=xe,this.setupFrameBufferTexture=Oe,this.useMultisampledRTT=Xe}function yx(n,e,A){const t=A.isWebGL2;function i(r,s=$A){let a;const o=qe.getTransfer(s);if(r===jt)return n.UNSIGNED_BYTE;if(r===Ph)return n.UNSIGNED_SHORT_4_4_4_4;if(r===Oh)return n.UNSIGNED_SHORT_5_5_5_1;if(r===X0)return n.BYTE;if(r===Y0)return n.SHORT;if(r===Qo)return n.UNSIGNED_SHORT;if(r===Hh)return n.INT;if(r===Wt)return n.UNSIGNED_INT;if(r===Xt)return n.FLOAT;if(r===Ki)return t?n.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===J0)return n.ALPHA;if(r===lt)return n.RGBA;if(r===q0)return n.LUMINANCE;if(r===Z0)return n.LUMINANCE_ALPHA;if(r===_n)return n.DEPTH_COMPONENT;if(r===si)return n.DEPTH_STENCIL;if(r===mo)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===j0)return n.RED;if(r===Nh)return n.RED_INTEGER;if(r===$0)return n.RG;if(r===Gh)return n.RG_INTEGER;if(r===Vh)return n.RGBA_INTEGER;if(r===aa||r===oa||r===la||r===ca)if(o===AA)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===aa)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===oa)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===la)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===ca)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===aa)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===oa)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===la)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===ca)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===ic||r===rc||r===sc||r===ac)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===ic)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===rc)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===sc)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===ac)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===e_)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===oc||r===lc)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(r===oc)return o===AA?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===lc)return o===AA?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===cc||r===uc||r===hc||r===fc||r===dc||r===pc||r===gc||r===mc||r===Bc||r===_c||r===wc||r===vc||r===Ec||r===Cc)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(r===cc)return o===AA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===uc)return o===AA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===hc)return o===AA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===fc)return o===AA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===dc)return o===AA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===pc)return o===AA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===gc)return o===AA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===mc)return o===AA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Bc)return o===AA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===_c)return o===AA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===wc)return o===AA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===vc)return o===AA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Ec)return o===AA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Cc)return o===AA?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===ua||r===xc||r===Uc)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(r===ua)return o===AA?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===xc)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Uc)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===A_||r===yc||r===Sc||r===Mc)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(r===ua)return a.COMPRESSED_RED_RGTC1_EXT;if(r===yc)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Sc)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Mc)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Bn?t?n.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):n[r]!==void 0?n[r]:null}return{convert:i}}class Sx extends jA{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Mi extends OA{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Mx={type:"move"};class La{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Mi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Mi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Mi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const A=this._hand;if(A)for(const t of e.hand.values())this._getHandJoint(A,t)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,A,t){let i=null,r=null,s=null;const a=this._targetRay,o=this._grip,l=this._hand;if(e&&A.session.visibilityState!=="visible-blurred"){if(l&&e.hand){s=!0;for(const m of e.hand.values()){const d=A.getJointPose(m,t),f=this._getHandJoint(l,m);d!==null&&(f.matrix.fromArray(d.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=d.radius),f.visible=d!==null}const c=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],h=c.position.distanceTo(u.position),p=.02,g=.005;l.inputState.pinching&&h>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else o!==null&&e.gripSpace&&(r=A.getPose(e.gripSpace,t),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1));a!==null&&(i=A.getPose(e.targetRaySpace,t),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Mx)))}return a!==null&&(a.visible=i!==null),o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),this}_getHandJoint(e,A){if(e.joints[A.jointName]===void 0){const t=new Mi;t.matrixAutoUpdate=!1,t.visible=!1,e.joints[A.jointName]=t,e.add(t)}return e.joints[A.jointName]}}class Fx extends WA{constructor(e,A,t,i,r,s,a,o,l,c){if(c=c!==void 0?c:_n,c!==_n&&c!==si)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");t===void 0&&c===_n&&(t=Wt),t===void 0&&c===si&&(t=Bn),super(null,i,r,s,a,o,c,t,l),this.isDepthTexture=!0,this.image={width:e,height:A},this.magFilter=a!==void 0?a:DA,this.minFilter=o!==void 0?o:DA,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const A=super.toJSON(e);return this.compareFunction!==null&&(A.compareFunction=this.compareFunction),A}}class bx extends Cn{constructor(e,A){super();const t=this;let i=null,r=1,s=null,a="local-floor",o=1,l=null,c=null,u=null,h=null,p=null,g=null;const m=A.getContextAttributes();let d=null,f=null;const v=[],B=[],y=new jA;y.layers.enable(1),y.viewport=new xA;const C=new jA;C.layers.enable(2),C.viewport=new xA;const x=[y,C],S=new Sx;S.layers.enable(1),S.layers.enable(2);let R=null,_=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let K=v[Q];return K===void 0&&(K=new La,v[Q]=K),K.getTargetRaySpace()},this.getControllerGrip=function(Q){let K=v[Q];return K===void 0&&(K=new La,v[Q]=K),K.getGripSpace()},this.getHand=function(Q){let K=v[Q];return K===void 0&&(K=new La,v[Q]=K),K.getHandSpace()};function M(Q){const K=B.indexOf(Q.inputSource);if(K===-1)return;const ae=v[K];ae!==void 0&&(ae.update(Q.inputSource,Q.frame,l||s),ae.dispatchEvent({type:Q.type,data:Q.inputSource}))}function G(){i.removeEventListener("select",M),i.removeEventListener("selectstart",M),i.removeEventListener("selectend",M),i.removeEventListener("squeeze",M),i.removeEventListener("squeezestart",M),i.removeEventListener("squeezeend",M),i.removeEventListener("end",G),i.removeEventListener("inputsourceschange",Z);for(let Q=0;Q<v.length;Q++){const K=B[Q];K!==null&&(B[Q]=null,v[Q].disconnect(K))}R=null,_=null,e.setRenderTarget(d),p=null,h=null,u=null,i=null,f=null,q.stop(),t.isPresenting=!1,t.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){r=Q,t.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){a=Q,t.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||s},this.setReferenceSpace=function(Q){l=Q},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(Q){if(i=Q,i!==null){if(d=e.getRenderTarget(),i.addEventListener("select",M),i.addEventListener("selectstart",M),i.addEventListener("selectend",M),i.addEventListener("squeeze",M),i.addEventListener("squeezestart",M),i.addEventListener("squeezeend",M),i.addEventListener("end",G),i.addEventListener("inputsourceschange",Z),m.xrCompatible!==!0&&await A.makeXRCompatible(),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const K={antialias:i.renderState.layers===void 0?m.antialias:!0,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(i,A,K),i.updateRenderState({baseLayer:p}),f=new vn(p.framebufferWidth,p.framebufferHeight,{format:lt,type:jt,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let K=null,ae=null,ue=null;m.depth&&(ue=m.stencil?A.DEPTH24_STENCIL8:A.DEPTH_COMPONENT24,K=m.stencil?si:_n,ae=m.stencil?Bn:Wt);const he={colorFormat:A.RGBA8,depthFormat:ue,scaleFactor:r};u=new XRWebGLBinding(i,A),h=u.createProjectionLayer(he),i.updateRenderState({layers:[h]}),f=new vn(h.textureWidth,h.textureHeight,{format:lt,type:jt,depthTexture:new Fx(h.textureWidth,h.textureHeight,ae,void 0,void 0,void 0,void 0,void 0,void 0,K),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0});const Ee=e.properties.get(f);Ee.__ignoreDepthValues=h.ignoreDepthValues}f.isXRRenderTarget=!0,this.setFoveation(o),l=null,s=await i.requestReferenceSpace(a),q.setContext(i),q.start(),t.isPresenting=!0,t.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function Z(Q){for(let K=0;K<Q.removed.length;K++){const ae=Q.removed[K],ue=B.indexOf(ae);ue>=0&&(B[ue]=null,v[ue].disconnect(ae))}for(let K=0;K<Q.added.length;K++){const ae=Q.added[K];let ue=B.indexOf(ae);if(ue===-1){for(let Ee=0;Ee<v.length;Ee++)if(Ee>=B.length){B.push(ae),ue=Ee;break}else if(B[Ee]===null){B[Ee]=ae,ue=Ee;break}if(ue===-1)break}const he=v[ue];he&&he.connect(ae)}}const Y=new I,T=new I;function O(Q,K,ae){Y.setFromMatrixPosition(K.matrixWorld),T.setFromMatrixPosition(ae.matrixWorld);const ue=Y.distanceTo(T),he=K.projectionMatrix.elements,Ee=ae.projectionMatrix.elements,Ie=he[14]/(he[10]-1),Fe=he[14]/(he[10]+1),Le=(he[9]+1)/he[5],eA=(he[9]-1)/he[5],Oe=(he[8]-1)/he[0],D=(Ee[8]+1)/Ee[0],UA=Ie*Oe,xe=Ie*D,be=ue/(-Oe+D),Te=be*-Oe;K.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(Te),Q.translateZ(be),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert();const tA=Ie+be,He=Fe+be,Re=UA-Te,Xe=xe+(ue-Te),oA=Le*Fe/He*tA,gA=eA*Fe/He*tA;Q.projectionMatrix.makePerspective(Re,Xe,oA,gA,tA,He),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}function X(Q,K){K===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(K.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(i===null)return;S.near=C.near=y.near=Q.near,S.far=C.far=y.far=Q.far,(R!==S.near||_!==S.far)&&(i.updateRenderState({depthNear:S.near,depthFar:S.far}),R=S.near,_=S.far);const K=Q.parent,ae=S.cameras;X(S,K);for(let ue=0;ue<ae.length;ue++)X(ae[ue],K);ae.length===2?O(S,y,C):S.projectionMatrix.copy(y.projectionMatrix),k(Q,S,K)};function k(Q,K,ae){ae===null?Q.matrix.copy(K.matrixWorld):(Q.matrix.copy(ae.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(K.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(K.projectionMatrix),Q.projectionMatrixInverse.copy(K.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=zi*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(h===null&&p===null))return o},this.setFoveation=function(Q){o=Q,h!==null&&(h.fixedFoveation=Q),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Q)};let j=null;function W(Q,K){if(c=K.getViewerPose(l||s),g=K,c!==null){const ae=c.views;p!==null&&(e.setRenderTargetFramebuffer(f,p.framebuffer),e.setRenderTarget(f));let ue=!1;ae.length!==S.cameras.length&&(S.cameras.length=0,ue=!0);for(let he=0;he<ae.length;he++){const Ee=ae[he];let Ie=null;if(p!==null)Ie=p.getViewport(Ee);else{const Le=u.getViewSubImage(h,Ee);Ie=Le.viewport,he===0&&(e.setRenderTargetTextures(f,Le.colorTexture,h.ignoreDepthValues?void 0:Le.depthStencilTexture),e.setRenderTarget(f))}let Fe=x[he];Fe===void 0&&(Fe=new jA,Fe.layers.enable(he),Fe.viewport=new xA,x[he]=Fe),Fe.matrix.fromArray(Ee.transform.matrix),Fe.matrix.decompose(Fe.position,Fe.quaternion,Fe.scale),Fe.projectionMatrix.fromArray(Ee.projectionMatrix),Fe.projectionMatrixInverse.copy(Fe.projectionMatrix).invert(),Fe.viewport.set(Ie.x,Ie.y,Ie.width,Ie.height),he===0&&(S.matrix.copy(Fe.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),ue===!0&&S.cameras.push(Fe)}}for(let ae=0;ae<v.length;ae++){const ue=B[ae],he=v[ae];ue!==null&&he!==void 0&&he.update(ue,K,l||s)}j&&j(Q,K),K.detectedPlanes&&t.dispatchEvent({type:"planesdetected",data:K}),g=null}const q=new Af;q.setAnimationLoop(W),this.setAnimationLoop=function(Q){j=Q},this.dispose=function(){}}}function Tx(n,e){function A(d,f){d.matrixAutoUpdate===!0&&d.updateMatrix(),f.value.copy(d.matrix)}function t(d,f){f.color.getRGB(d.fogColor.value,Zh(n)),f.isFog?(d.fogNear.value=f.near,d.fogFar.value=f.far):f.isFogExp2&&(d.fogDensity.value=f.density)}function i(d,f,v,B,y){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(d,f):f.isMeshToonMaterial?(r(d,f),u(d,f)):f.isMeshPhongMaterial?(r(d,f),c(d,f)):f.isMeshStandardMaterial?(r(d,f),h(d,f),f.isMeshPhysicalMaterial&&p(d,f,y)):f.isMeshMatcapMaterial?(r(d,f),g(d,f)):f.isMeshDepthMaterial?r(d,f):f.isMeshDistanceMaterial?(r(d,f),m(d,f)):f.isMeshNormalMaterial?r(d,f):f.isLineBasicMaterial?(s(d,f),f.isLineDashedMaterial&&a(d,f)):f.isPointsMaterial?o(d,f,v,B):f.isSpriteMaterial?l(d,f):f.isShadowMaterial?(d.color.value.copy(f.color),d.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(d,f){d.opacity.value=f.opacity,f.color&&d.diffuse.value.copy(f.color),f.emissive&&d.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(d.map.value=f.map,A(f.map,d.mapTransform)),f.alphaMap&&(d.alphaMap.value=f.alphaMap,A(f.alphaMap,d.alphaMapTransform)),f.bumpMap&&(d.bumpMap.value=f.bumpMap,A(f.bumpMap,d.bumpMapTransform),d.bumpScale.value=f.bumpScale,f.side===PA&&(d.bumpScale.value*=-1)),f.normalMap&&(d.normalMap.value=f.normalMap,A(f.normalMap,d.normalMapTransform),d.normalScale.value.copy(f.normalScale),f.side===PA&&d.normalScale.value.negate()),f.displacementMap&&(d.displacementMap.value=f.displacementMap,A(f.displacementMap,d.displacementMapTransform),d.displacementScale.value=f.displacementScale,d.displacementBias.value=f.displacementBias),f.emissiveMap&&(d.emissiveMap.value=f.emissiveMap,A(f.emissiveMap,d.emissiveMapTransform)),f.specularMap&&(d.specularMap.value=f.specularMap,A(f.specularMap,d.specularMapTransform)),f.alphaTest>0&&(d.alphaTest.value=f.alphaTest);const v=e.get(f).envMap;if(v&&(d.envMap.value=v,d.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,d.reflectivity.value=f.reflectivity,d.ior.value=f.ior,d.refractionRatio.value=f.refractionRatio),f.lightMap){d.lightMap.value=f.lightMap;const B=n._useLegacyLights===!0?Math.PI:1;d.lightMapIntensity.value=f.lightMapIntensity*B,A(f.lightMap,d.lightMapTransform)}f.aoMap&&(d.aoMap.value=f.aoMap,d.aoMapIntensity.value=f.aoMapIntensity,A(f.aoMap,d.aoMapTransform))}function s(d,f){d.diffuse.value.copy(f.color),d.opacity.value=f.opacity,f.map&&(d.map.value=f.map,A(f.map,d.mapTransform))}function a(d,f){d.dashSize.value=f.dashSize,d.totalSize.value=f.dashSize+f.gapSize,d.scale.value=f.scale}function o(d,f,v,B){d.diffuse.value.copy(f.color),d.opacity.value=f.opacity,d.size.value=f.size*v,d.scale.value=B*.5,f.map&&(d.map.value=f.map,A(f.map,d.uvTransform)),f.alphaMap&&(d.alphaMap.value=f.alphaMap,A(f.alphaMap,d.alphaMapTransform)),f.alphaTest>0&&(d.alphaTest.value=f.alphaTest)}function l(d,f){d.diffuse.value.copy(f.color),d.opacity.value=f.opacity,d.rotation.value=f.rotation,f.map&&(d.map.value=f.map,A(f.map,d.mapTransform)),f.alphaMap&&(d.alphaMap.value=f.alphaMap,A(f.alphaMap,d.alphaMapTransform)),f.alphaTest>0&&(d.alphaTest.value=f.alphaTest)}function c(d,f){d.specular.value.copy(f.specular),d.shininess.value=Math.max(f.shininess,1e-4)}function u(d,f){f.gradientMap&&(d.gradientMap.value=f.gradientMap)}function h(d,f){d.metalness.value=f.metalness,f.metalnessMap&&(d.metalnessMap.value=f.metalnessMap,A(f.metalnessMap,d.metalnessMapTransform)),d.roughness.value=f.roughness,f.roughnessMap&&(d.roughnessMap.value=f.roughnessMap,A(f.roughnessMap,d.roughnessMapTransform)),e.get(f).envMap&&(d.envMapIntensity.value=f.envMapIntensity)}function p(d,f,v){d.ior.value=f.ior,f.sheen>0&&(d.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),d.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(d.sheenColorMap.value=f.sheenColorMap,A(f.sheenColorMap,d.sheenColorMapTransform)),f.sheenRoughnessMap&&(d.sheenRoughnessMap.value=f.sheenRoughnessMap,A(f.sheenRoughnessMap,d.sheenRoughnessMapTransform))),f.clearcoat>0&&(d.clearcoat.value=f.clearcoat,d.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(d.clearcoatMap.value=f.clearcoatMap,A(f.clearcoatMap,d.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(d.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,A(f.clearcoatRoughnessMap,d.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(d.clearcoatNormalMap.value=f.clearcoatNormalMap,A(f.clearcoatNormalMap,d.clearcoatNormalMapTransform),d.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===PA&&d.clearcoatNormalScale.value.negate())),f.iridescence>0&&(d.iridescence.value=f.iridescence,d.iridescenceIOR.value=f.iridescenceIOR,d.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],d.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(d.iridescenceMap.value=f.iridescenceMap,A(f.iridescenceMap,d.iridescenceMapTransform)),f.iridescenceThicknessMap&&(d.iridescenceThicknessMap.value=f.iridescenceThicknessMap,A(f.iridescenceThicknessMap,d.iridescenceThicknessMapTransform))),f.transmission>0&&(d.transmission.value=f.transmission,d.transmissionSamplerMap.value=v.texture,d.transmissionSamplerSize.value.set(v.width,v.height),f.transmissionMap&&(d.transmissionMap.value=f.transmissionMap,A(f.transmissionMap,d.transmissionMapTransform)),d.thickness.value=f.thickness,f.thicknessMap&&(d.thicknessMap.value=f.thicknessMap,A(f.thicknessMap,d.thicknessMapTransform)),d.attenuationDistance.value=f.attenuationDistance,d.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(d.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(d.anisotropyMap.value=f.anisotropyMap,A(f.anisotropyMap,d.anisotropyMapTransform))),d.specularIntensity.value=f.specularIntensity,d.specularColor.value.copy(f.specularColor),f.specularColorMap&&(d.specularColorMap.value=f.specularColorMap,A(f.specularColorMap,d.specularColorMapTransform)),f.specularIntensityMap&&(d.specularIntensityMap.value=f.specularIntensityMap,A(f.specularIntensityMap,d.specularIntensityMapTransform))}function g(d,f){f.matcap&&(d.matcap.value=f.matcap)}function m(d,f){const v=e.get(f).light;d.referencePosition.value.setFromMatrixPosition(v.matrixWorld),d.nearDistance.value=v.shadow.camera.near,d.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:t,refreshMaterialUniforms:i}}function Qx(n,e,A,t){let i={},r={},s=[];const a=A.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function o(v,B){const y=B.program;t.uniformBlockBinding(v,y)}function l(v,B){let y=i[v.id];y===void 0&&(g(v),y=c(v),i[v.id]=y,v.addEventListener("dispose",d));const C=B.program;t.updateUBOMapping(v,C);const x=e.render.frame;r[v.id]!==x&&(h(v),r[v.id]=x)}function c(v){const B=u();v.__bindingPointIndex=B;const y=n.createBuffer(),C=v.__size,x=v.usage;return n.bindBuffer(n.UNIFORM_BUFFER,y),n.bufferData(n.UNIFORM_BUFFER,C,x),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,B,y),y}function u(){for(let v=0;v<a;v++)if(s.indexOf(v)===-1)return s.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(v){const B=i[v.id],y=v.uniforms,C=v.__cache;n.bindBuffer(n.UNIFORM_BUFFER,B);for(let x=0,S=y.length;x<S;x++){const R=y[x];if(p(R,x,C)===!0){const _=R.__offset,M=Array.isArray(R.value)?R.value:[R.value];let G=0;for(let Z=0;Z<M.length;Z++){const Y=M[Z],T=m(Y);typeof Y=="number"?(R.__data[0]=Y,n.bufferSubData(n.UNIFORM_BUFFER,_+G,R.__data)):Y.isMatrix3?(R.__data[0]=Y.elements[0],R.__data[1]=Y.elements[1],R.__data[2]=Y.elements[2],R.__data[3]=Y.elements[0],R.__data[4]=Y.elements[3],R.__data[5]=Y.elements[4],R.__data[6]=Y.elements[5],R.__data[7]=Y.elements[0],R.__data[8]=Y.elements[6],R.__data[9]=Y.elements[7],R.__data[10]=Y.elements[8],R.__data[11]=Y.elements[0]):(Y.toArray(R.__data,G),G+=T.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,_,R.__data)}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(v,B,y){const C=v.value;if(y[B]===void 0){if(typeof C=="number")y[B]=C;else{const x=Array.isArray(C)?C:[C],S=[];for(let R=0;R<x.length;R++)S.push(x[R].clone());y[B]=S}return!0}else if(typeof C=="number"){if(y[B]!==C)return y[B]=C,!0}else{const x=Array.isArray(y[B])?y[B]:[y[B]],S=Array.isArray(C)?C:[C];for(let R=0;R<x.length;R++){const _=x[R];if(_.equals(S[R])===!1)return _.copy(S[R]),!0}}return!1}function g(v){const B=v.uniforms;let y=0;const C=16;let x=0;for(let S=0,R=B.length;S<R;S++){const _=B[S],M={boundary:0,storage:0},G=Array.isArray(_.value)?_.value:[_.value];for(let Z=0,Y=G.length;Z<Y;Z++){const T=G[Z],O=m(T);M.boundary+=O.boundary,M.storage+=O.storage}if(_.__data=new Float32Array(M.storage/Float32Array.BYTES_PER_ELEMENT),_.__offset=y,S>0){x=y%C;const Z=C-x;x!==0&&Z-M.boundary<0&&(y+=C-x,_.__offset=y)}y+=M.storage}return x=y%C,x>0&&(y+=C-x),v.__size=y,v.__cache={},this}function m(v){const B={boundary:0,storage:0};return typeof v=="number"?(B.boundary=4,B.storage=4):v.isVector2?(B.boundary=8,B.storage=8):v.isVector3||v.isColor?(B.boundary=16,B.storage=12):v.isVector4?(B.boundary=16,B.storage=16):v.isMatrix3?(B.boundary=48,B.storage=48):v.isMatrix4?(B.boundary=64,B.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),B}function d(v){const B=v.target;B.removeEventListener("dispose",d);const y=s.indexOf(B.__bindingPointIndex);s.splice(y,1),n.deleteBuffer(i[B.id]),delete i[B.id],delete r[B.id]}function f(){for(const v in i)n.deleteBuffer(i[v]);s=[],i={},r={}}return{bind:o,update:l,dispose:f}}class af{constructor(e={}){const{canvas:A=F_(),context:t=null,depth:i=!0,stencil:r=!0,alpha:s=!1,antialias:a=!1,premultipliedAlpha:o=!0,preserveDrawingBuffer:l=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let h;t!==null?h=t.getContextAttributes().alpha:h=s;const p=new Uint32Array(4),g=new Int32Array(4);let m=null,d=null;const f=[],v=[];this.domElement=A,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=EA,this._useLegacyLights=!1,this.toneMapping=Zt,this.toneMappingExposure=1;const B=this;let y=!1,C=0,x=0,S=null,R=-1,_=null;const M=new xA,G=new xA;let Z=null;const Y=new Ye(0);let T=0,O=A.width,X=A.height,k=1,j=null,W=null;const q=new xA(0,0,O,X),Q=new xA(0,0,O,X);let K=!1;const ae=new ef;let ue=!1,he=!1,Ee=null;const Ie=new wA,Fe=new ye,Le=new I,eA={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Oe(){return S===null?k:1}let D=t;function UA(E,L){for(let P=0;P<E.length;P++){const N=E[P],V=A.getContext(N,L);if(V!==null)return V}return null}try{const E={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:o,preserveDrawingBuffer:l,powerPreference:c,failIfMajorPerformanceCaveat:u};if("setAttribute"in A&&A.setAttribute("data-engine",`three.js r${To}`),A.addEventListener("webglcontextlost",ke,!1),A.addEventListener("webglcontextrestored",b,!1),A.addEventListener("webglcontextcreationerror",oe,!1),D===null){const L=["webgl2","webgl","experimental-webgl"];if(B.isWebGL1Renderer===!0&&L.shift(),D=UA(L,E),D===null)throw UA(L)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&D instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),D.getShaderPrecisionFormat===void 0&&(D.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let xe,be,Te,tA,He,Re,Xe,oA,gA,U,w,H,te,$,ne,_e,se,de,F,re,J,Se,we,Ue;function Be(){xe=new VE(D),be=new RE(D,xe,e),xe.init(be),Se=new yx(D,xe,be),Te=new xx(D,xe,be),tA=new zE(D),He=new cx,Re=new Ux(D,xe,Te,He,be,Se,tA),Xe=new HE(B),oA=new GE(B),gA=new ew(D,be),we=new IE(D,xe,gA,be),U=new kE(D,gA,tA,we),w=new JE(D,U,gA,tA),F=new YE(D,be,Re),_e=new DE(He),H=new lx(B,Xe,oA,xe,be,we,_e),te=new Tx(B,He),$=new hx,ne=new Bx(xe,be),de=new QE(B,Xe,oA,Te,w,h,o),se=new Cx(B,w,be),Ue=new Qx(D,tA,be,Te),re=new LE(D,xe,tA,be),J=new KE(D,xe,tA,be),tA.programs=H.programs,B.capabilities=be,B.extensions=xe,B.properties=He,B.renderLists=$,B.shadowMap=se,B.state=Te,B.info=tA}Be();const me=new bx(B,D);this.xr=me,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const E=xe.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=xe.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(E){E!==void 0&&(k=E,this.setSize(O,X,!1))},this.getSize=function(E){return E.set(O,X)},this.setSize=function(E,L,P=!0){if(me.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}O=E,X=L,A.width=Math.floor(E*k),A.height=Math.floor(L*k),P===!0&&(A.style.width=E+"px",A.style.height=L+"px"),this.setViewport(0,0,E,L)},this.getDrawingBufferSize=function(E){return E.set(O*k,X*k).floor()},this.setDrawingBufferSize=function(E,L,P){O=E,X=L,k=P,A.width=Math.floor(E*P),A.height=Math.floor(L*P),this.setViewport(0,0,E,L)},this.getCurrentViewport=function(E){return E.copy(M)},this.getViewport=function(E){return E.copy(q)},this.setViewport=function(E,L,P,N){E.isVector4?q.set(E.x,E.y,E.z,E.w):q.set(E,L,P,N),Te.viewport(M.copy(q).multiplyScalar(k).floor())},this.getScissor=function(E){return E.copy(Q)},this.setScissor=function(E,L,P,N){E.isVector4?Q.set(E.x,E.y,E.z,E.w):Q.set(E,L,P,N),Te.scissor(G.copy(Q).multiplyScalar(k).floor())},this.getScissorTest=function(){return K},this.setScissorTest=function(E){Te.setScissorTest(K=E)},this.setOpaqueSort=function(E){j=E},this.setTransparentSort=function(E){W=E},this.getClearColor=function(E){return E.copy(de.getClearColor())},this.setClearColor=function(){de.setClearColor.apply(de,arguments)},this.getClearAlpha=function(){return de.getClearAlpha()},this.setClearAlpha=function(){de.setClearAlpha.apply(de,arguments)},this.clear=function(E=!0,L=!0,P=!0){let N=0;if(E){let V=!1;if(S!==null){const ge=S.texture.format;V=ge===Vh||ge===Gh||ge===Nh}if(V){const ge=S.texture.type,ve=ge===jt||ge===Wt||ge===Qo||ge===Bn||ge===Ph||ge===Oh,Me=de.getClearColor(),Qe=de.getClearAlpha(),Ge=Me.r,De=Me.g,Pe=Me.b;ve?(p[0]=Ge,p[1]=De,p[2]=Pe,p[3]=Qe,D.clearBufferuiv(D.COLOR,0,p)):(g[0]=Ge,g[1]=De,g[2]=Pe,g[3]=Qe,D.clearBufferiv(D.COLOR,0,g))}else N|=D.COLOR_BUFFER_BIT}L&&(N|=D.DEPTH_BUFFER_BIT),P&&(N|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(N)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){A.removeEventListener("webglcontextlost",ke,!1),A.removeEventListener("webglcontextrestored",b,!1),A.removeEventListener("webglcontextcreationerror",oe,!1),$.dispose(),ne.dispose(),He.dispose(),Xe.dispose(),oA.dispose(),w.dispose(),we.dispose(),Ue.dispose(),H.dispose(),me.dispose(),me.removeEventListener("sessionstart",XA),me.removeEventListener("sessionend",je),Ee&&(Ee.dispose(),Ee=null),TA.stop()};function ke(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),y=!0}function b(){console.log("THREE.WebGLRenderer: Context Restored."),y=!1;const E=tA.autoReset,L=se.enabled,P=se.autoUpdate,N=se.needsUpdate,V=se.type;Be(),tA.autoReset=E,se.enabled=L,se.autoUpdate=P,se.needsUpdate=N,se.type=V}function oe(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function ee(E){const L=E.target;L.removeEventListener("dispose",ee),z(L)}function z(E){ie(E),He.remove(E)}function ie(E){const L=He.get(E).programs;L!==void 0&&(L.forEach(function(P){H.releaseProgram(P)}),E.isShaderMaterial&&H.releaseShaderCache(E))}this.renderBufferDirect=function(E,L,P,N,V,ge){L===null&&(L=eA);const ve=V.isMesh&&V.matrixWorld.determinant()<0,Me=mf(E,L,P,N,V);Te.setMaterial(N,ve);let Qe=P.index,Ge=1;if(N.wireframe===!0){if(Qe=U.getWireframeAttribute(P),Qe===void 0)return;Ge=2}const De=P.drawRange,Pe=P.attributes.position;let rA=De.start*Ge,GA=(De.start+De.count)*Ge;ge!==null&&(rA=Math.max(rA,ge.start*Ge),GA=Math.min(GA,(ge.start+ge.count)*Ge)),Qe!==null?(rA=Math.max(rA,0),GA=Math.min(GA,Qe.count)):Pe!=null&&(rA=Math.max(rA,0),GA=Math.min(GA,Pe.count));const mA=GA-rA;if(mA<0||mA===1/0)return;we.setup(V,N,Me,P,Qe);let vt,iA=re;if(Qe!==null&&(vt=gA.get(Qe),iA=J,iA.setIndex(vt)),V.isMesh)N.wireframe===!0?(Te.setLineWidth(N.wireframeLinewidth*Oe()),iA.setMode(D.LINES)):iA.setMode(D.TRIANGLES);else if(V.isLine){let ze=N.linewidth;ze===void 0&&(ze=1),Te.setLineWidth(ze*Oe()),V.isLineSegments?iA.setMode(D.LINES):V.isLineLoop?iA.setMode(D.LINE_LOOP):iA.setMode(D.LINE_STRIP)}else V.isPoints?iA.setMode(D.POINTS):V.isSprite&&iA.setMode(D.TRIANGLES);if(V.isInstancedMesh)iA.renderInstances(rA,mA,V.count);else if(P.isInstancedBufferGeometry){const ze=P._maxInstanceCount!==void 0?P._maxInstanceCount:1/0,Qs=Math.min(P.instanceCount,ze);iA.renderInstances(rA,mA,Qs)}else iA.render(rA,mA)};function Ce(E,L,P){E.transparent===!0&&E.side===at&&E.forceSinglePass===!1?(E.side=PA,E.needsUpdate=!0,ji(E,L,P),E.side=An,E.needsUpdate=!0,ji(E,L,P),E.side=at):ji(E,L,P)}this.compile=function(E,L,P=null){P===null&&(P=E),d=ne.get(P),d.init(),v.push(d),P.traverseVisible(function(V){V.isLight&&V.layers.test(L.layers)&&(d.pushLight(V),V.castShadow&&d.pushShadow(V))}),E!==P&&E.traverseVisible(function(V){V.isLight&&V.layers.test(L.layers)&&(d.pushLight(V),V.castShadow&&d.pushShadow(V))}),d.setupLights(B._useLegacyLights);const N=new Set;return E.traverse(function(V){const ge=V.material;if(ge)if(Array.isArray(ge))for(let ve=0;ve<ge.length;ve++){const Me=ge[ve];Ce(Me,P,V),N.add(Me)}else Ce(ge,P,V),N.add(ge)}),v.pop(),d=null,N},this.compileAsync=function(E,L,P=null){const N=this.compile(E,L,P);return new Promise(V=>{function ge(){if(N.forEach(function(ve){He.get(ve).currentProgram.isReady()&&N.delete(ve)}),N.size===0){V(E);return}setTimeout(ge,10)}xe.get("KHR_parallel_shader_compile")!==null?ge():setTimeout(ge,10)})};let Ke=null;function lA(E){Ke&&Ke(E)}function XA(){TA.stop()}function je(){TA.start()}const TA=new Af;TA.setAnimationLoop(lA),typeof self<"u"&&TA.setContext(self),this.setAnimationLoop=function(E){Ke=E,me.setAnimationLoop(E),E===null?TA.stop():TA.start()},me.addEventListener("sessionstart",XA),me.addEventListener("sessionend",je),this.render=function(E,L){if(L!==void 0&&L.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(y===!0)return;E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),me.enabled===!0&&me.isPresenting===!0&&(me.cameraAutoUpdate===!0&&me.updateCamera(L),L=me.getCamera()),E.isScene===!0&&E.onBeforeRender(B,E,L,S),d=ne.get(E,v.length),d.init(),v.push(d),Ie.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),ae.setFromProjectionMatrix(Ie),he=this.localClippingEnabled,ue=_e.init(this.clippingPlanes,he),m=$.get(E,f.length),m.init(),f.push(m),ut(E,L,0,B.sortObjects),m.finish(),B.sortObjects===!0&&m.sort(j,W),this.info.render.frame++,ue===!0&&_e.beginShadows();const P=d.state.shadowsArray;if(se.render(P,E,L),ue===!0&&_e.endShadows(),this.info.autoReset===!0&&this.info.reset(),de.render(m,E),d.setupLights(B._useLegacyLights),L.isArrayCamera){const N=L.cameras;for(let V=0,ge=N.length;V<ge;V++){const ve=N[V];Go(m,E,ve,ve.viewport)}}else Go(m,E,L);S!==null&&(Re.updateMultisampleRenderTarget(S),Re.updateRenderTargetMipmap(S)),E.isScene===!0&&E.onAfterRender(B,E,L),we.resetDefaultState(),R=-1,_=null,v.pop(),v.length>0?d=v[v.length-1]:d=null,f.pop(),f.length>0?m=f[f.length-1]:m=null};function ut(E,L,P,N){if(E.visible===!1)return;if(E.layers.test(L.layers)){if(E.isGroup)P=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(L);else if(E.isLight)d.pushLight(E),E.castShadow&&d.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||ae.intersectsSprite(E)){N&&Le.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Ie);const ve=w.update(E),Me=E.material;Me.visible&&m.push(E,ve,Me,P,Le.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||ae.intersectsObject(E))){const ve=w.update(E),Me=E.material;if(N&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Le.copy(E.boundingSphere.center)):(ve.boundingSphere===null&&ve.computeBoundingSphere(),Le.copy(ve.boundingSphere.center)),Le.applyMatrix4(E.matrixWorld).applyMatrix4(Ie)),Array.isArray(Me)){const Qe=ve.groups;for(let Ge=0,De=Qe.length;Ge<De;Ge++){const Pe=Qe[Ge],rA=Me[Pe.materialIndex];rA&&rA.visible&&m.push(E,ve,rA,P,Le.z,Pe)}}else Me.visible&&m.push(E,ve,Me,P,Le.z,null)}}const ge=E.children;for(let ve=0,Me=ge.length;ve<Me;ve++)ut(ge[ve],L,P,N)}function Go(E,L,P,N){const V=E.opaque,ge=E.transmissive,ve=E.transparent;d.setupLightsView(P),ue===!0&&_e.setGlobalState(B.clippingPlanes,P),ge.length>0&&gf(V,ge,L,P),N&&Te.viewport(M.copy(N)),V.length>0&&Zi(V,L,P),ge.length>0&&Zi(ge,L,P),ve.length>0&&Zi(ve,L,P),Te.buffers.depth.setTest(!0),Te.buffers.depth.setMask(!0),Te.buffers.color.setMask(!0),Te.setPolygonOffset(!1)}function gf(E,L,P,N){if((P.isScene===!0?P.overrideMaterial:null)!==null)return;const ge=be.isWebGL2;Ee===null&&(Ee=new vn(1,1,{generateMipmaps:!0,type:xe.has("EXT_color_buffer_half_float")?Ki:jt,minFilter:ki,samples:ge?4:0})),B.getDrawingBufferSize(Fe),ge?Ee.setSize(Fe.x,Fe.y):Ee.setSize(fs(Fe.x),fs(Fe.y));const ve=B.getRenderTarget();B.setRenderTarget(Ee),B.getClearColor(Y),T=B.getClearAlpha(),T<1&&B.setClearColor(16777215,.5),B.clear();const Me=B.toneMapping;B.toneMapping=Zt,Zi(E,P,N),Re.updateMultisampleRenderTarget(Ee),Re.updateRenderTargetMipmap(Ee);let Qe=!1;for(let Ge=0,De=L.length;Ge<De;Ge++){const Pe=L[Ge],rA=Pe.object,GA=Pe.geometry,mA=Pe.material,vt=Pe.group;if(mA.side===at&&rA.layers.test(N.layers)){const iA=mA.side;mA.side=PA,mA.needsUpdate=!0,Vo(rA,P,N,GA,mA,vt),mA.side=iA,mA.needsUpdate=!0,Qe=!0}}Qe===!0&&(Re.updateMultisampleRenderTarget(Ee),Re.updateRenderTargetMipmap(Ee)),B.setRenderTarget(ve),B.setClearColor(Y,T),B.toneMapping=Me}function Zi(E,L,P){const N=L.isScene===!0?L.overrideMaterial:null;for(let V=0,ge=E.length;V<ge;V++){const ve=E[V],Me=ve.object,Qe=ve.geometry,Ge=N===null?ve.material:N,De=ve.group;Me.layers.test(P.layers)&&Vo(Me,L,P,Qe,Ge,De)}}function Vo(E,L,P,N,V,ge){E.onBeforeRender(B,L,P,N,V,ge),E.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),V.onBeforeRender(B,L,P,N,E,ge),V.transparent===!0&&V.side===at&&V.forceSinglePass===!1?(V.side=PA,V.needsUpdate=!0,B.renderBufferDirect(P,L,N,V,E,ge),V.side=An,V.needsUpdate=!0,B.renderBufferDirect(P,L,N,V,E,ge),V.side=at):B.renderBufferDirect(P,L,N,V,E,ge),E.onAfterRender(B,L,P,N,V,ge)}function ji(E,L,P){L.isScene!==!0&&(L=eA);const N=He.get(E),V=d.state.lights,ge=d.state.shadowsArray,ve=V.state.version,Me=H.getParameters(E,V.state,ge,L,P),Qe=H.getProgramCacheKey(Me);let Ge=N.programs;N.environment=E.isMeshStandardMaterial?L.environment:null,N.fog=L.fog,N.envMap=(E.isMeshStandardMaterial?oA:Xe).get(E.envMap||N.environment),Ge===void 0&&(E.addEventListener("dispose",ee),Ge=new Map,N.programs=Ge);let De=Ge.get(Qe);if(De!==void 0){if(N.currentProgram===De&&N.lightsStateVersion===ve)return Ko(E,Me),De}else Me.uniforms=H.getUniforms(E),E.onBuild(P,Me,B),E.onBeforeCompile(Me,B),De=H.acquireProgram(Me,Qe),Ge.set(Qe,De),N.uniforms=Me.uniforms;const Pe=N.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Pe.clippingPlanes=_e.uniform),Ko(E,Me),N.needsLights=_f(E),N.lightsStateVersion=ve,N.needsLights&&(Pe.ambientLightColor.value=V.state.ambient,Pe.lightProbe.value=V.state.probe,Pe.directionalLights.value=V.state.directional,Pe.directionalLightShadows.value=V.state.directionalShadow,Pe.spotLights.value=V.state.spot,Pe.spotLightShadows.value=V.state.spotShadow,Pe.rectAreaLights.value=V.state.rectArea,Pe.ltc_1.value=V.state.rectAreaLTC1,Pe.ltc_2.value=V.state.rectAreaLTC2,Pe.pointLights.value=V.state.point,Pe.pointLightShadows.value=V.state.pointShadow,Pe.hemisphereLights.value=V.state.hemi,Pe.directionalShadowMap.value=V.state.directionalShadowMap,Pe.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Pe.spotShadowMap.value=V.state.spotShadowMap,Pe.spotLightMatrix.value=V.state.spotLightMatrix,Pe.spotLightMap.value=V.state.spotLightMap,Pe.pointShadowMap.value=V.state.pointShadowMap,Pe.pointShadowMatrix.value=V.state.pointShadowMatrix),N.currentProgram=De,N.uniformsList=null,De}function ko(E){if(E.uniformsList===null){const L=E.currentProgram.getUniforms();E.uniformsList=qr.seqWithValue(L.seq,E.uniforms)}return E.uniformsList}function Ko(E,L){const P=He.get(E);P.outputColorSpace=L.outputColorSpace,P.instancing=L.instancing,P.instancingColor=L.instancingColor,P.skinning=L.skinning,P.morphTargets=L.morphTargets,P.morphNormals=L.morphNormals,P.morphColors=L.morphColors,P.morphTargetsCount=L.morphTargetsCount,P.numClippingPlanes=L.numClippingPlanes,P.numIntersection=L.numClipIntersection,P.vertexAlphas=L.vertexAlphas,P.vertexTangents=L.vertexTangents,P.toneMapping=L.toneMapping}function mf(E,L,P,N,V){L.isScene!==!0&&(L=eA),Re.resetTextureUnits();const ge=L.fog,ve=N.isMeshStandardMaterial?L.environment:null,Me=S===null?B.outputColorSpace:S.isXRRenderTarget===!0?S.texture.colorSpace:It,Qe=(N.isMeshStandardMaterial?oA:Xe).get(N.envMap||ve),Ge=N.vertexColors===!0&&!!P.attributes.color&&P.attributes.color.itemSize===4,De=!!P.attributes.tangent&&(!!N.normalMap||N.anisotropy>0),Pe=!!P.morphAttributes.position,rA=!!P.morphAttributes.normal,GA=!!P.morphAttributes.color;let mA=Zt;N.toneMapped&&(S===null||S.isXRRenderTarget===!0)&&(mA=B.toneMapping);const vt=P.morphAttributes.position||P.morphAttributes.normal||P.morphAttributes.color,iA=vt!==void 0?vt.length:0,ze=He.get(N),Qs=d.state.lights;if(ue===!0&&(he===!0||E!==_)){const VA=E===_&&N.id===R;_e.setState(N,E,VA)}let cA=!1;N.version===ze.__version?(ze.needsLights&&ze.lightsStateVersion!==Qs.state.version||ze.outputColorSpace!==Me||V.isInstancedMesh&&ze.instancing===!1||!V.isInstancedMesh&&ze.instancing===!0||V.isSkinnedMesh&&ze.skinning===!1||!V.isSkinnedMesh&&ze.skinning===!0||V.isInstancedMesh&&ze.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&ze.instancingColor===!1&&V.instanceColor!==null||ze.envMap!==Qe||N.fog===!0&&ze.fog!==ge||ze.numClippingPlanes!==void 0&&(ze.numClippingPlanes!==_e.numPlanes||ze.numIntersection!==_e.numIntersection)||ze.vertexAlphas!==Ge||ze.vertexTangents!==De||ze.morphTargets!==Pe||ze.morphNormals!==rA||ze.morphColors!==GA||ze.toneMapping!==mA||be.isWebGL2===!0&&ze.morphTargetsCount!==iA)&&(cA=!0):(cA=!0,ze.__version=N.version);let nn=ze.currentProgram;cA===!0&&(nn=ji(N,L,V));let zo=!1,ui=!1,Is=!1;const QA=nn.getUniforms(),rn=ze.uniforms;if(Te.useProgram(nn.program)&&(zo=!0,ui=!0,Is=!0),N.id!==R&&(R=N.id,ui=!0),zo||_!==E){QA.setValue(D,"projectionMatrix",E.projectionMatrix),QA.setValue(D,"viewMatrix",E.matrixWorldInverse);const VA=QA.map.cameraPosition;VA!==void 0&&VA.setValue(D,Le.setFromMatrixPosition(E.matrixWorld)),be.logarithmicDepthBuffer&&QA.setValue(D,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(N.isMeshPhongMaterial||N.isMeshToonMaterial||N.isMeshLambertMaterial||N.isMeshBasicMaterial||N.isMeshStandardMaterial||N.isShaderMaterial)&&QA.setValue(D,"isOrthographic",E.isOrthographicCamera===!0),_!==E&&(_=E,ui=!0,Is=!0)}if(V.isSkinnedMesh){QA.setOptional(D,V,"bindMatrix"),QA.setOptional(D,V,"bindMatrixInverse");const VA=V.skeleton;VA&&(be.floatVertexTextures?(VA.boneTexture===null&&VA.computeBoneTexture(),QA.setValue(D,"boneTexture",VA.boneTexture,Re),QA.setValue(D,"boneTextureSize",VA.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}const Ls=P.morphAttributes;if((Ls.position!==void 0||Ls.normal!==void 0||Ls.color!==void 0&&be.isWebGL2===!0)&&F.update(V,P,nn),(ui||ze.receiveShadow!==V.receiveShadow)&&(ze.receiveShadow=V.receiveShadow,QA.setValue(D,"receiveShadow",V.receiveShadow)),N.isMeshGouraudMaterial&&N.envMap!==null&&(rn.envMap.value=Qe,rn.flipEnvMap.value=Qe.isCubeTexture&&Qe.isRenderTargetTexture===!1?-1:1),ui&&(QA.setValue(D,"toneMappingExposure",B.toneMappingExposure),ze.needsLights&&Bf(rn,Is),ge&&N.fog===!0&&te.refreshFogUniforms(rn,ge),te.refreshMaterialUniforms(rn,N,k,X,Ee),qr.upload(D,ko(ze),rn,Re)),N.isShaderMaterial&&N.uniformsNeedUpdate===!0&&(qr.upload(D,ko(ze),rn,Re),N.uniformsNeedUpdate=!1),N.isSpriteMaterial&&QA.setValue(D,"center",V.center),QA.setValue(D,"modelViewMatrix",V.modelViewMatrix),QA.setValue(D,"normalMatrix",V.normalMatrix),QA.setValue(D,"modelMatrix",V.matrixWorld),N.isShaderMaterial||N.isRawShaderMaterial){const VA=N.uniformsGroups;for(let Rs=0,wf=VA.length;Rs<wf;Rs++)if(be.isWebGL2){const Wo=VA[Rs];Ue.update(Wo,nn),Ue.bind(Wo,nn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return nn}function Bf(E,L){E.ambientLightColor.needsUpdate=L,E.lightProbe.needsUpdate=L,E.directionalLights.needsUpdate=L,E.directionalLightShadows.needsUpdate=L,E.pointLights.needsUpdate=L,E.pointLightShadows.needsUpdate=L,E.spotLights.needsUpdate=L,E.spotLightShadows.needsUpdate=L,E.rectAreaLights.needsUpdate=L,E.hemisphereLights.needsUpdate=L}function _f(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return x},this.getRenderTarget=function(){return S},this.setRenderTargetTextures=function(E,L,P){He.get(E.texture).__webglTexture=L,He.get(E.depthTexture).__webglTexture=P;const N=He.get(E);N.__hasExternalTextures=!0,N.__hasExternalTextures&&(N.__autoAllocateDepthBuffer=P===void 0,N.__autoAllocateDepthBuffer||xe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),N.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(E,L){const P=He.get(E);P.__webglFramebuffer=L,P.__useDefaultFramebuffer=L===void 0},this.setRenderTarget=function(E,L=0,P=0){S=E,C=L,x=P;let N=!0,V=null,ge=!1,ve=!1;if(E){const Qe=He.get(E);Qe.__useDefaultFramebuffer!==void 0?(Te.bindFramebuffer(D.FRAMEBUFFER,null),N=!1):Qe.__webglFramebuffer===void 0?Re.setupRenderTarget(E):Qe.__hasExternalTextures&&Re.rebindTextures(E,He.get(E.texture).__webglTexture,He.get(E.depthTexture).__webglTexture);const Ge=E.texture;(Ge.isData3DTexture||Ge.isDataArrayTexture||Ge.isCompressedArrayTexture)&&(ve=!0);const De=He.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(De[L])?V=De[L][P]:V=De[L],ge=!0):be.isWebGL2&&E.samples>0&&Re.useMultisampledRTT(E)===!1?V=He.get(E).__webglMultisampledFramebuffer:Array.isArray(De)?V=De[P]:V=De,M.copy(E.viewport),G.copy(E.scissor),Z=E.scissorTest}else M.copy(q).multiplyScalar(k).floor(),G.copy(Q).multiplyScalar(k).floor(),Z=K;if(Te.bindFramebuffer(D.FRAMEBUFFER,V)&&be.drawBuffers&&N&&Te.drawBuffers(E,V),Te.viewport(M),Te.scissor(G),Te.setScissorTest(Z),ge){const Qe=He.get(E.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+L,Qe.__webglTexture,P)}else if(ve){const Qe=He.get(E.texture),Ge=L||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,Qe.__webglTexture,P||0,Ge)}R=-1},this.readRenderTargetPixels=function(E,L,P,N,V,ge,ve){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Me=He.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ve!==void 0&&(Me=Me[ve]),Me){Te.bindFramebuffer(D.FRAMEBUFFER,Me);try{const Qe=E.texture,Ge=Qe.format,De=Qe.type;if(Ge!==lt&&Se.convert(Ge)!==D.getParameter(D.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Pe=De===Ki&&(xe.has("EXT_color_buffer_half_float")||be.isWebGL2&&xe.has("EXT_color_buffer_float"));if(De!==jt&&Se.convert(De)!==D.getParameter(D.IMPLEMENTATION_COLOR_READ_TYPE)&&!(De===Xt&&(be.isWebGL2||xe.has("OES_texture_float")||xe.has("WEBGL_color_buffer_float")))&&!Pe){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=E.width-N&&P>=0&&P<=E.height-V&&D.readPixels(L,P,N,V,Se.convert(Ge),Se.convert(De),ge)}finally{const Qe=S!==null?He.get(S).__webglFramebuffer:null;Te.bindFramebuffer(D.FRAMEBUFFER,Qe)}}},this.copyFramebufferToTexture=function(E,L,P=0){const N=Math.pow(2,-P),V=Math.floor(L.image.width*N),ge=Math.floor(L.image.height*N);Re.setTexture2D(L,0),D.copyTexSubImage2D(D.TEXTURE_2D,P,0,0,E.x,E.y,V,ge),Te.unbindTexture()},this.copyTextureToTexture=function(E,L,P,N=0){const V=L.image.width,ge=L.image.height,ve=Se.convert(P.format),Me=Se.convert(P.type);Re.setTexture2D(P,0),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,P.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,P.unpackAlignment),L.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,N,E.x,E.y,V,ge,ve,Me,L.image.data):L.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,N,E.x,E.y,L.mipmaps[0].width,L.mipmaps[0].height,ve,L.mipmaps[0].data):D.texSubImage2D(D.TEXTURE_2D,N,E.x,E.y,ve,Me,L.image),N===0&&P.generateMipmaps&&D.generateMipmap(D.TEXTURE_2D),Te.unbindTexture()},this.copyTextureToTexture3D=function(E,L,P,N,V=0){if(B.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const ge=E.max.x-E.min.x+1,ve=E.max.y-E.min.y+1,Me=E.max.z-E.min.z+1,Qe=Se.convert(N.format),Ge=Se.convert(N.type);let De;if(N.isData3DTexture)Re.setTexture3D(N,0),De=D.TEXTURE_3D;else if(N.isDataArrayTexture)Re.setTexture2DArray(N,0),De=D.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,N.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,N.unpackAlignment);const Pe=D.getParameter(D.UNPACK_ROW_LENGTH),rA=D.getParameter(D.UNPACK_IMAGE_HEIGHT),GA=D.getParameter(D.UNPACK_SKIP_PIXELS),mA=D.getParameter(D.UNPACK_SKIP_ROWS),vt=D.getParameter(D.UNPACK_SKIP_IMAGES),iA=P.isCompressedTexture?P.mipmaps[0]:P.image;D.pixelStorei(D.UNPACK_ROW_LENGTH,iA.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,iA.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,E.min.x),D.pixelStorei(D.UNPACK_SKIP_ROWS,E.min.y),D.pixelStorei(D.UNPACK_SKIP_IMAGES,E.min.z),P.isDataTexture||P.isData3DTexture?D.texSubImage3D(De,V,L.x,L.y,L.z,ge,ve,Me,Qe,Ge,iA.data):P.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),D.compressedTexSubImage3D(De,V,L.x,L.y,L.z,ge,ve,Me,Qe,iA.data)):D.texSubImage3D(De,V,L.x,L.y,L.z,ge,ve,Me,Qe,Ge,iA),D.pixelStorei(D.UNPACK_ROW_LENGTH,Pe),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,rA),D.pixelStorei(D.UNPACK_SKIP_PIXELS,GA),D.pixelStorei(D.UNPACK_SKIP_ROWS,mA),D.pixelStorei(D.UNPACK_SKIP_IMAGES,vt),V===0&&N.generateMipmaps&&D.generateMipmap(De),Te.unbindTexture()},this.initTexture=function(E){E.isCubeTexture?Re.setTextureCube(E,0):E.isData3DTexture?Re.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?Re.setTexture2DArray(E,0):Re.setTexture2D(E,0),Te.unbindTexture()},this.resetState=function(){C=0,x=0,S=null,Te.reset(),we.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return bt}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const A=this.getContext();A.drawingBufferColorSpace=e===Io?"display-p3":"srgb",A.unpackColorSpace=qe.workingColorSpace===Ss?"display-p3":"srgb"}get physicallyCorrectLights(){return console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),!this.useLegacyLights}set physicallyCorrectLights(e){console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),this.useLegacyLights=!e}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===EA?wn:kh}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===wn?EA:It}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class Ix extends af{}Ix.prototype.isWebGL1Renderer=!0;class Lx extends OA{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,A){return super.copy(e,A),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const A=super.toJSON(e);return this.fog!==null&&(A.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(A.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(A.object.backgroundIntensity=this.backgroundIntensity),A}}class of extends Ji{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ye(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const mu=new I,Bu=new I,_u=new wA,Ra=new Fs,Kr=new Ms;class Rx extends OA{constructor(e=new wt,A=new of){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=A,this.updateMorphTargets()}copy(e,A){return super.copy(e,A),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const A=e.attributes.position,t=[0];for(let i=1,r=A.count;i<r;i++)mu.fromBufferAttribute(A,i-1),Bu.fromBufferAttribute(A,i),t[i]=t[i-1],t[i]+=mu.distanceTo(Bu);e.setAttribute("lineDistance",new NA(t,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,A){const t=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,s=t.drawRange;if(t.boundingSphere===null&&t.computeBoundingSphere(),Kr.copy(t.boundingSphere),Kr.applyMatrix4(i),Kr.radius+=r,e.ray.intersectsSphere(Kr)===!1)return;_u.copy(i).invert(),Ra.copy(e.ray).applyMatrix4(_u);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),o=a*a,l=new I,c=new I,u=new I,h=new I,p=this.isLineSegments?2:1,g=t.index,d=t.attributes.position;if(g!==null){const f=Math.max(0,s.start),v=Math.min(g.count,s.start+s.count);for(let B=f,y=v-1;B<y;B+=p){const C=g.getX(B),x=g.getX(B+1);if(l.fromBufferAttribute(d,C),c.fromBufferAttribute(d,x),Ra.distanceSqToSegment(l,c,h,u)>o)continue;h.applyMatrix4(this.matrixWorld);const R=e.ray.origin.distanceTo(h);R<e.near||R>e.far||A.push({distance:R,point:u.clone().applyMatrix4(this.matrixWorld),index:B,face:null,faceIndex:null,object:this})}}else{const f=Math.max(0,s.start),v=Math.min(d.count,s.start+s.count);for(let B=f,y=v-1;B<y;B+=p){if(l.fromBufferAttribute(d,B),c.fromBufferAttribute(d,B+1),Ra.distanceSqToSegment(l,c,h,u)>o)continue;h.applyMatrix4(this.matrixWorld);const x=e.ray.origin.distanceTo(h);x<e.near||x>e.far||A.push({distance:x,point:u.clone().applyMatrix4(this.matrixWorld),index:B,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const A=this.geometry.morphAttributes,t=Object.keys(A);if(t.length>0){const i=A[t[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=i.length;r<s;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}const wu=new I,vu=new I;class Dx extends Rx{constructor(e,A){super(e,A),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const A=e.attributes.position,t=[];for(let i=0,r=A.count;i<r;i+=2)wu.fromBufferAttribute(A,i),vu.fromBufferAttribute(A,i+1),t[i]=i===0?0:t[i-1],t[i+1]=t[i]+wu.distanceTo(vu);e.setAttribute("lineDistance",new NA(t,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Oo extends wt{constructor(e=1,A=32,t=16,i=0,r=Math.PI*2,s=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:A,heightSegments:t,phiStart:i,phiLength:r,thetaStart:s,thetaLength:a},A=Math.max(3,Math.floor(A)),t=Math.max(2,Math.floor(t));const o=Math.min(s+a,Math.PI);let l=0;const c=[],u=new I,h=new I,p=[],g=[],m=[],d=[];for(let f=0;f<=t;f++){const v=[],B=f/t;let y=0;f===0&&s===0?y=.5/A:f===t&&o===Math.PI&&(y=-.5/A);for(let C=0;C<=A;C++){const x=C/A;u.x=-e*Math.cos(i+x*r)*Math.sin(s+B*a),u.y=e*Math.cos(s+B*a),u.z=e*Math.sin(i+x*r)*Math.sin(s+B*a),g.push(u.x,u.y,u.z),h.copy(u).normalize(),m.push(h.x,h.y,h.z),d.push(x+y,1-B),v.push(l++)}c.push(v)}for(let f=0;f<t;f++)for(let v=0;v<A;v++){const B=c[f][v+1],y=c[f][v],C=c[f+1][v],x=c[f+1][v+1];(f!==0||s>0)&&p.push(B,y,x),(f!==t-1||o<Math.PI)&&p.push(y,C,x)}this.setIndex(p),this.setAttribute("position",new NA(g,3)),this.setAttribute("normal",new NA(m,3)),this.setAttribute("uv",new NA(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Oo(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Hx{constructor(e,A,t=0,i=1/0){this.ray=new Fs(e,A),this.near=t,this.far=i,this.camera=null,this.layers=new Ro,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,A){this.ray.set(e,A)}setFromCamera(e,A){A.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(A.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(A).sub(this.ray.origin).normalize(),this.camera=A):A.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(A.near+A.far)/(A.near-A.far)).unproject(A),this.ray.direction.set(0,0,-1).transformDirection(A.matrixWorld),this.camera=A):console.error("THREE.Raycaster: Unsupported camera type: "+A.type)}intersectObject(e,A=!0,t=[]){return wo(e,this,t,A),t.sort(Eu),t}intersectObjects(e,A=!0,t=[]){for(let i=0,r=e.length;i<r;i++)wo(e[i],this,t,A);return t.sort(Eu),t}}function Eu(n,e){return n.distance-e.distance}function wo(n,e,A,t){if(n.layers.test(e.layers)&&n.raycast(e,A),t===!0){const i=n.children;for(let r=0,s=i.length;r<s;r++)wo(i[r],e,A,!0)}}class Cu{constructor(e=1,A=0,t=0){return this.radius=e,this.phi=A,this.theta=t,this}set(e,A,t){return this.radius=e,this.phi=A,this.theta=t,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,A,t){return this.radius=Math.sqrt(e*e+A*A+t*t),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,t),this.phi=Math.acos(bA(A/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Px extends Dx{constructor(e=1){const A=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],t=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],i=new wt;i.setAttribute("position",new NA(A,3)),i.setAttribute("color",new NA(t,3));const r=new of({vertexColors:!0,toneMapped:!1});super(i,r),this.type="AxesHelper"}setColors(e,A,t){const i=new Ye,r=this.geometry.attributes.color.array;return i.set(e),i.toArray(r,0),i.toArray(r,3),i.set(A),i.toArray(r,6),i.toArray(r,9),i.set(t),i.toArray(r,12),i.toArray(r,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:To}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=To);const xu={type:"change"},Da={type:"start"},Uu={type:"end"},zr=new Fs,yu=new Vt,Ox=Math.cos(70*M_.DEG2RAD);class Nx extends Cn{constructor(e,A){super(),this.object=e,this.domElement=A,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new I,this.cursor=new I,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:bn.ROTATE,MIDDLE:bn.DOLLY,RIGHT:bn.PAN},this.touches={ONE:Tn.ROTATE,TWO:Tn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return a.phi},this.getAzimuthalAngle=function(){return a.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(F){F.addEventListener("keydown",w),this._domElementKeyEvents=F},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",w),this._domElementKeyEvents=null},this.saveState=function(){t.target0.copy(t.target),t.position0.copy(t.object.position),t.zoom0=t.object.zoom},this.reset=function(){t.target.copy(t.target0),t.object.position.copy(t.position0),t.object.zoom=t.zoom0,t.object.updateProjectionMatrix(),t.dispatchEvent(xu),t.update(),r=i.NONE},this.update=function(){const F=new I,re=new En().setFromUnitVectors(e.up,new I(0,1,0)),J=re.clone().invert(),Se=new I,we=new En,Ue=new I,Be=2*Math.PI;return function(ke=null){const b=t.object.position;F.copy(b).sub(t.target),F.applyQuaternion(re),a.setFromVector3(F),t.autoRotate&&r===i.NONE&&G(_(ke)),t.enableDamping?(a.theta+=o.theta*t.dampingFactor,a.phi+=o.phi*t.dampingFactor):(a.theta+=o.theta,a.phi+=o.phi);let oe=t.minAzimuthAngle,ee=t.maxAzimuthAngle;isFinite(oe)&&isFinite(ee)&&(oe<-Math.PI?oe+=Be:oe>Math.PI&&(oe-=Be),ee<-Math.PI?ee+=Be:ee>Math.PI&&(ee-=Be),oe<=ee?a.theta=Math.max(oe,Math.min(ee,a.theta)):a.theta=a.theta>(oe+ee)/2?Math.max(oe,a.theta):Math.min(ee,a.theta)),a.phi=Math.max(t.minPolarAngle,Math.min(t.maxPolarAngle,a.phi)),a.makeSafe(),t.enableDamping===!0?t.target.addScaledVector(c,t.dampingFactor):t.target.add(c),t.target.sub(t.cursor),t.target.clampLength(t.minTargetRadius,t.maxTargetRadius),t.target.add(t.cursor),t.zoomToCursor&&x||t.object.isOrthographicCamera?a.radius=W(a.radius):a.radius=W(a.radius*l),F.setFromSpherical(a),F.applyQuaternion(J),b.copy(t.target).add(F),t.object.lookAt(t.target),t.enableDamping===!0?(o.theta*=1-t.dampingFactor,o.phi*=1-t.dampingFactor,c.multiplyScalar(1-t.dampingFactor)):(o.set(0,0,0),c.set(0,0,0));let z=!1;if(t.zoomToCursor&&x){let ie=null;if(t.object.isPerspectiveCamera){const Ce=F.length();ie=W(Ce*l);const Ke=Ce-ie;t.object.position.addScaledVector(y,Ke),t.object.updateMatrixWorld()}else if(t.object.isOrthographicCamera){const Ce=new I(C.x,C.y,0);Ce.unproject(t.object),t.object.zoom=Math.max(t.minZoom,Math.min(t.maxZoom,t.object.zoom/l)),t.object.updateProjectionMatrix(),z=!0;const Ke=new I(C.x,C.y,0);Ke.unproject(t.object),t.object.position.sub(Ke).add(Ce),t.object.updateMatrixWorld(),ie=F.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),t.zoomToCursor=!1;ie!==null&&(this.screenSpacePanning?t.target.set(0,0,-1).transformDirection(t.object.matrix).multiplyScalar(ie).add(t.object.position):(zr.origin.copy(t.object.position),zr.direction.set(0,0,-1).transformDirection(t.object.matrix),Math.abs(t.object.up.dot(zr.direction))<Ox?e.lookAt(t.target):(yu.setFromNormalAndCoplanarPoint(t.object.up,t.target),zr.intersectPlane(yu,t.target))))}else t.object.isOrthographicCamera&&(t.object.zoom=Math.max(t.minZoom,Math.min(t.maxZoom,t.object.zoom/l)),t.object.updateProjectionMatrix(),z=!0);return l=1,x=!1,z||Se.distanceToSquared(t.object.position)>s||8*(1-we.dot(t.object.quaternion))>s||Ue.distanceToSquared(t.target)>0?(t.dispatchEvent(xu),Se.copy(t.object.position),we.copy(t.object.quaternion),Ue.copy(t.target),z=!1,!0):!1}}(),this.dispose=function(){t.domElement.removeEventListener("contextmenu",$),t.domElement.removeEventListener("pointerdown",He),t.domElement.removeEventListener("pointercancel",Xe),t.domElement.removeEventListener("wheel",U),t.domElement.removeEventListener("pointermove",Re),t.domElement.removeEventListener("pointerup",Xe),t._domElementKeyEvents!==null&&(t._domElementKeyEvents.removeEventListener("keydown",w),t._domElementKeyEvents=null)};const t=this,i={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let r=i.NONE;const s=1e-6,a=new Cu,o=new Cu;let l=1;const c=new I,u=new ye,h=new ye,p=new ye,g=new ye,m=new ye,d=new ye,f=new ye,v=new ye,B=new ye,y=new I,C=new ye;let x=!1;const S=[],R={};function _(F){return F!==null?2*Math.PI/60*t.autoRotateSpeed*F:2*Math.PI/60/60*t.autoRotateSpeed}function M(){return Math.pow(.95,t.zoomSpeed)}function G(F){o.theta-=F}function Z(F){o.phi-=F}const Y=function(){const F=new I;return function(J,Se){F.setFromMatrixColumn(Se,0),F.multiplyScalar(-J),c.add(F)}}(),T=function(){const F=new I;return function(J,Se){t.screenSpacePanning===!0?F.setFromMatrixColumn(Se,1):(F.setFromMatrixColumn(Se,0),F.crossVectors(t.object.up,F)),F.multiplyScalar(J),c.add(F)}}(),O=function(){const F=new I;return function(J,Se){const we=t.domElement;if(t.object.isPerspectiveCamera){const Ue=t.object.position;F.copy(Ue).sub(t.target);let Be=F.length();Be*=Math.tan(t.object.fov/2*Math.PI/180),Y(2*J*Be/we.clientHeight,t.object.matrix),T(2*Se*Be/we.clientHeight,t.object.matrix)}else t.object.isOrthographicCamera?(Y(J*(t.object.right-t.object.left)/t.object.zoom/we.clientWidth,t.object.matrix),T(Se*(t.object.top-t.object.bottom)/t.object.zoom/we.clientHeight,t.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),t.enablePan=!1)}}();function X(F){t.object.isPerspectiveCamera||t.object.isOrthographicCamera?l/=F:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),t.enableZoom=!1)}function k(F){t.object.isPerspectiveCamera||t.object.isOrthographicCamera?l*=F:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),t.enableZoom=!1)}function j(F){if(!t.zoomToCursor)return;x=!0;const re=t.domElement.getBoundingClientRect(),J=F.clientX-re.left,Se=F.clientY-re.top,we=re.width,Ue=re.height;C.x=J/we*2-1,C.y=-(Se/Ue)*2+1,y.set(C.x,C.y,1).unproject(t.object).sub(t.object.position).normalize()}function W(F){return Math.max(t.minDistance,Math.min(t.maxDistance,F))}function q(F){u.set(F.clientX,F.clientY)}function Q(F){j(F),f.set(F.clientX,F.clientY)}function K(F){g.set(F.clientX,F.clientY)}function ae(F){h.set(F.clientX,F.clientY),p.subVectors(h,u).multiplyScalar(t.rotateSpeed);const re=t.domElement;G(2*Math.PI*p.x/re.clientHeight),Z(2*Math.PI*p.y/re.clientHeight),u.copy(h),t.update()}function ue(F){v.set(F.clientX,F.clientY),B.subVectors(v,f),B.y>0?X(M()):B.y<0&&k(M()),f.copy(v),t.update()}function he(F){m.set(F.clientX,F.clientY),d.subVectors(m,g).multiplyScalar(t.panSpeed),O(d.x,d.y),g.copy(m),t.update()}function Ee(F){j(F),F.deltaY<0?k(M()):F.deltaY>0&&X(M()),t.update()}function Ie(F){let re=!1;switch(F.code){case t.keys.UP:F.ctrlKey||F.metaKey||F.shiftKey?Z(2*Math.PI*t.rotateSpeed/t.domElement.clientHeight):O(0,t.keyPanSpeed),re=!0;break;case t.keys.BOTTOM:F.ctrlKey||F.metaKey||F.shiftKey?Z(-2*Math.PI*t.rotateSpeed/t.domElement.clientHeight):O(0,-t.keyPanSpeed),re=!0;break;case t.keys.LEFT:F.ctrlKey||F.metaKey||F.shiftKey?G(2*Math.PI*t.rotateSpeed/t.domElement.clientHeight):O(t.keyPanSpeed,0),re=!0;break;case t.keys.RIGHT:F.ctrlKey||F.metaKey||F.shiftKey?G(-2*Math.PI*t.rotateSpeed/t.domElement.clientHeight):O(-t.keyPanSpeed,0),re=!0;break}re&&(F.preventDefault(),t.update())}function Fe(){if(S.length===1)u.set(S[0].pageX,S[0].pageY);else{const F=.5*(S[0].pageX+S[1].pageX),re=.5*(S[0].pageY+S[1].pageY);u.set(F,re)}}function Le(){if(S.length===1)g.set(S[0].pageX,S[0].pageY);else{const F=.5*(S[0].pageX+S[1].pageX),re=.5*(S[0].pageY+S[1].pageY);g.set(F,re)}}function eA(){const F=S[0].pageX-S[1].pageX,re=S[0].pageY-S[1].pageY,J=Math.sqrt(F*F+re*re);f.set(0,J)}function Oe(){t.enableZoom&&eA(),t.enablePan&&Le()}function D(){t.enableZoom&&eA(),t.enableRotate&&Fe()}function UA(F){if(S.length==1)h.set(F.pageX,F.pageY);else{const J=de(F),Se=.5*(F.pageX+J.x),we=.5*(F.pageY+J.y);h.set(Se,we)}p.subVectors(h,u).multiplyScalar(t.rotateSpeed);const re=t.domElement;G(2*Math.PI*p.x/re.clientHeight),Z(2*Math.PI*p.y/re.clientHeight),u.copy(h)}function xe(F){if(S.length===1)m.set(F.pageX,F.pageY);else{const re=de(F),J=.5*(F.pageX+re.x),Se=.5*(F.pageY+re.y);m.set(J,Se)}d.subVectors(m,g).multiplyScalar(t.panSpeed),O(d.x,d.y),g.copy(m)}function be(F){const re=de(F),J=F.pageX-re.x,Se=F.pageY-re.y,we=Math.sqrt(J*J+Se*Se);v.set(0,we),B.set(0,Math.pow(v.y/f.y,t.zoomSpeed)),X(B.y),f.copy(v)}function Te(F){t.enableZoom&&be(F),t.enablePan&&xe(F)}function tA(F){t.enableZoom&&be(F),t.enableRotate&&UA(F)}function He(F){t.enabled!==!1&&(S.length===0&&(t.domElement.setPointerCapture(F.pointerId),t.domElement.addEventListener("pointermove",Re),t.domElement.addEventListener("pointerup",Xe)),ne(F),F.pointerType==="touch"?H(F):oA(F))}function Re(F){t.enabled!==!1&&(F.pointerType==="touch"?te(F):gA(F))}function Xe(F){_e(F),S.length===0&&(t.domElement.releasePointerCapture(F.pointerId),t.domElement.removeEventListener("pointermove",Re),t.domElement.removeEventListener("pointerup",Xe)),t.dispatchEvent(Uu),r=i.NONE}function oA(F){let re;switch(F.button){case 0:re=t.mouseButtons.LEFT;break;case 1:re=t.mouseButtons.MIDDLE;break;case 2:re=t.mouseButtons.RIGHT;break;default:re=-1}switch(re){case bn.DOLLY:if(t.enableZoom===!1)return;Q(F),r=i.DOLLY;break;case bn.ROTATE:if(F.ctrlKey||F.metaKey||F.shiftKey){if(t.enablePan===!1)return;K(F),r=i.PAN}else{if(t.enableRotate===!1)return;q(F),r=i.ROTATE}break;case bn.PAN:if(F.ctrlKey||F.metaKey||F.shiftKey){if(t.enableRotate===!1)return;q(F),r=i.ROTATE}else{if(t.enablePan===!1)return;K(F),r=i.PAN}break;default:r=i.NONE}r!==i.NONE&&t.dispatchEvent(Da)}function gA(F){switch(r){case i.ROTATE:if(t.enableRotate===!1)return;ae(F);break;case i.DOLLY:if(t.enableZoom===!1)return;ue(F);break;case i.PAN:if(t.enablePan===!1)return;he(F);break}}function U(F){t.enabled===!1||t.enableZoom===!1||r!==i.NONE||(F.preventDefault(),t.dispatchEvent(Da),Ee(F),t.dispatchEvent(Uu))}function w(F){t.enabled===!1||t.enablePan===!1||Ie(F)}function H(F){switch(se(F),S.length){case 1:switch(t.touches.ONE){case Tn.ROTATE:if(t.enableRotate===!1)return;Fe(),r=i.TOUCH_ROTATE;break;case Tn.PAN:if(t.enablePan===!1)return;Le(),r=i.TOUCH_PAN;break;default:r=i.NONE}break;case 2:switch(t.touches.TWO){case Tn.DOLLY_PAN:if(t.enableZoom===!1&&t.enablePan===!1)return;Oe(),r=i.TOUCH_DOLLY_PAN;break;case Tn.DOLLY_ROTATE:if(t.enableZoom===!1&&t.enableRotate===!1)return;D(),r=i.TOUCH_DOLLY_ROTATE;break;default:r=i.NONE}break;default:r=i.NONE}r!==i.NONE&&t.dispatchEvent(Da)}function te(F){switch(se(F),r){case i.TOUCH_ROTATE:if(t.enableRotate===!1)return;UA(F),t.update();break;case i.TOUCH_PAN:if(t.enablePan===!1)return;xe(F),t.update();break;case i.TOUCH_DOLLY_PAN:if(t.enableZoom===!1&&t.enablePan===!1)return;Te(F),t.update();break;case i.TOUCH_DOLLY_ROTATE:if(t.enableZoom===!1&&t.enableRotate===!1)return;tA(F),t.update();break;default:r=i.NONE}}function $(F){t.enabled!==!1&&F.preventDefault()}function ne(F){S.push(F)}function _e(F){delete R[F.pointerId];for(let re=0;re<S.length;re++)if(S[re].pointerId==F.pointerId){S.splice(re,1);return}}function se(F){let re=R[F.pointerId];re===void 0&&(re=new ye,R[F.pointerId]=re),re.set(F.pageX,F.pageY)}function de(F){const re=F.pointerId===S[0].pointerId?S[1]:S[0];return R[re.pointerId]}t.domElement.addEventListener("contextmenu",$),t.domElement.addEventListener("pointerdown",He),t.domElement.addEventListener("pointercancel",Xe),t.domElement.addEventListener("wheel",U,{passive:!1}),this.update()}}class lf{#t;#e;#n;#A;constructor(e,A={id:"canvas",container:document.body}){this.model=e,this.#t=A.id,this.#e=A.container}get container(){return this.#e}get canvas(){return this.#n}set canvas(e){if(this.#n!==void 0)throw Error("Canvas already set");this.#n=e}get domElement(){if(this.#n===void 0){const e=this.initializeCanvas();this.#t!==void 0&&e.setAttribute("id",this.#t),e.classList.add("sphere");const A=this;let t=!1;return this.#A=new MutationObserver(i=>{t&&i.forEach((r,s,a)=>{A.onMutation(r)})}),this.#A.observe(this.#e,{attributes:!0,attributeFilter:["class"]}),this.#e.appendChild(e),t=!0,e}return this.#n}set visible(e){this.#n!==void 0&&(this.#n.style.visibility=e?"visible":"hidden")}}class Gx{constructor(e,A=void 0,t=void 0){this.setSize(e,A,t),window.addEventListener("resize",()=>{this.setSize(e,A,t),this.onResize()})}setSize(e,A,t){const i=Math.min(innerWidth,e.clientWidth),r=Math.min(innerHeight,e.clientHeight);A!==void 0&&(A.aspect=i/r,A.updateProjectionMatrix()),t!==void 0&&(t.setSize(i,r),t.setPixelRatio(window.devicePixelRatio))}onResize(){}}var Hi=function(){var n=0,e=document.createElement("div");e.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",e.addEventListener("click",function(c){c.preventDefault(),t(++n%e.children.length)},!1);function A(c){return e.appendChild(c.dom),c}function t(c){for(var u=0;u<e.children.length;u++)e.children[u].style.display=u===c?"block":"none";n=c}var i=(performance||Date).now(),r=i,s=0,a=A(new Hi.Panel("FPS","#0ff","#002")),o=A(new Hi.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var l=A(new Hi.Panel("MB","#f08","#201"));return t(0),{REVISION:16,dom:e,addPanel:A,showPanel:t,begin:function(){i=(performance||Date).now()},end:function(){s++;var c=(performance||Date).now();if(o.update(c-i,200),c>=r+1e3&&(a.update(s*1e3/(c-r),100),r=c,s=0,l)){var u=performance.memory;l.update(u.usedJSHeapSize/1048576,u.jsHeapSizeLimit/1048576)}return c},update:function(){i=this.end()},domElement:e,setMode:t}};Hi.Panel=function(n,e,A){var t=1/0,i=0,r=Math.round,s=r(window.devicePixelRatio||1),a=80*s,o=48*s,l=3*s,c=2*s,u=3*s,h=15*s,p=74*s,g=30*s,m=document.createElement("canvas");m.width=a,m.height=o,m.style.cssText="width:80px;height:48px";var d=m.getContext("2d");return d.font="bold "+9*s+"px Helvetica,Arial,sans-serif",d.textBaseline="top",d.fillStyle=A,d.fillRect(0,0,a,o),d.fillStyle=e,d.fillText(n,l,c),d.fillRect(u,h,p,g),d.fillStyle=A,d.globalAlpha=.9,d.fillRect(u,h,p,g),{dom:m,update:function(f,v){t=Math.min(t,f),i=Math.max(i,f),d.fillStyle=A,d.globalAlpha=1,d.fillRect(0,0,a,h),d.fillStyle=e,d.fillText(r(f)+" "+n+" ("+r(t)+"-"+r(i)+")",l,c),d.drawImage(m,u+s,h,p-s,g,u,h,p-s,g),d.fillRect(u+p-s,h,s,g),d.fillStyle=A,d.globalAlpha=.9,d.fillRect(u+p-s,h,s,r((1-f/v)*g))}}};const Vx=Hi,cf="visible",$t=Vx();$t[cf]=n=>{$t.domElement.style.visibility=n?"visible":"hidden"};$t.showPanel(0);document.body.appendChild($t.dom);$t[cf](Ae.view.stats_monitor_visible);var kx=`uniform int u_mode;
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
}`,Kx=`#define M_PI 3.1415926535897932384626433832795
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
}`;const Ha={x:0,y:0};class zx extends lf{#t;#e;#n;#A;#r;#i;#c;#a;#s;#o;#u;#l;constructor(e,A={id:"sphere",container:document.body}){super(e,A),this.canvas=this.domElement}initializeCanvas(){this.#t=new I(-1,20,-30),this.#e=new Lx,this.#n=new Hx,this.#A=new jA(75,this.container.clientWidth/this.container.clientHeight,.1,1e3),this.#r=new af({antialias:!0});const e=this.#r.domElement;return this.container.appendChild(e),this.#u=new Gx(this.container,this.#A,this.#r),this.#i=new pt(this.createSphereGeometry(),this.createSphereMaterial()),this.#i.visible=Ae.view.faces_visible,this.#a=new pt(this.createSphereGeometry(),new Do({wireframe:!0,side:at,transparent:!0})),this.#a.visible=Ae.view.mesh_visible,this.#o=new Px(20),this.#o.visible=Ae.view.axes_visible,this.#s=new Mi,this.#s.add(this.#i,this.#a,this.#o),this.#e.add(this.#s),this.#c=new Nx(this.#A,this.#r.domElement),this.#A.position.z=50,this.#c.update(),this.container.addEventListener(le.CREATE_SPHERE.toString(),()=>this.createSphere()),this.container.addEventListener("mousemove",A=>{Ha.x=A.clientX/this.container.clientWidth*2-1,Ha.y=-(A.clientY/this.container.clientHeight)*2+1}),this.container.addEventListener(le.UPDATE_SPHERE_MATERIAL.toString(),()=>this.updateSphereMaterial()),this.container.addEventListener(le.UPDATE_VISIBLE.toString(),()=>this.updateVisibility()),this.container.addEventListener(le.THEME_CHANGED.toString(),()=>this.updateVisibility()),e}onMutation(e){const t=window.getComputedStyle(this.container).getPropertyValue("background-color");this.#e.background=new Ye(t)}get captureElement(){return this.#r.domElement}render(){const e=A=>{this.#l===void 0&&(this.#l=A),this._render(A-this.#l),this.#l=A,requestAnimationFrame(e)};e((performance||Date).now())}_render(e){if($t.begin(),this.#c.update(),this.#r.render(this.#e,this.#A),this.#i.visible||this.#a.visible){this.#n.setFromCamera(Ha,this.#A);const A=this.#n.intersectObject(this.#i),t=this.#i.material.uniforms;if(A.length>0&&!Ae.animation.run){const i=A[0].point.clone();t.u_intersect.value=i,this._setIntersect(i)}else t.u_intersect.value=new I,this.domElement.style.cursor="auto"}if(Ae.animation.trigger_reset)Ae.animation.trigger_reset=!1,this.#s.rotation.x=0,this.#s.rotation.y=0,this.#s.rotation.z=0;else if(Ae.animation.run){const A=Math.PI*e/500;this.#s.rotation.x+=Ae.animation.rotation_x*A,this.#s.rotation.y+=Ae.animation.rotation_y*A,this.#s.rotation.z+=Ae.animation.rotation_z*A}$t.end()}_setIntersect(e){if(e.distanceToSquared(this.#t)>l0){this.domElement.style.cursor="none",this.#t=e;const A=Ae.sphere.radius||1;this.model.applyCut(e.clone().divideScalar(A))}}createSphere(){this.#i.geometry.dispose(),this.#a.geometry.dispose();const e=this.createSphereGeometry();this.#i.geometry=e,this.#a.geometry=e,this.updateSphereMaterial()}createSphereGeometry(){const e=Ae.sphere.segments;return new Oo(Ae.sphere.radius,e,e/2)}createSphereMaterial(){return new tn({vertexShader:kx,fragmentShader:Kx,side:at,transparent:!0,defines:this.defines,uniforms:this.uniforms})}get defines(){return{MAX_JEWELS:Math.max(1,this.model.necklace.length),MODE_STOLEN_NECKLACE:dt.STOLEN_NECKLACE,MODE_SHADER_LAMP:dt.SHADER_LAMP,MODE_SPACE_COLOR:dt.SPACE_COLOR,MODE_SINUSOID:dt.SINUSOID}}get uniforms(){return Ae.sphere.offset_octant/Ae.sphere.radius,{u_mode:{type:"i",value:Ae.int_mode},u_necklace_discrete:{type:"b",value:Ae.necklace.discrete},u_input:{type:"i",value:this.model.necklace},u_count_0:{type:"i",value:this.model.count_0},u_count_1:{type:"i",value:this.model.count_1},u_offset_sphere_octant:{type:"f",value:Ae.sphere.offset_octant},u_use_bad_on_sphere_check:{type:"b",value:Ae.sphere.use_bad_on_sphere_check},u_show_borsuk_ulam_proof_shape:{type:"b",value:Ae.sphere.show_borsuk_ulam_proof_shape},u_radius_vector:{type:"v3",value:new I(Ae.sphere.radius,Ae.sphere.radius,Ae.sphere.radius)},u_scale_color:{type:"v3",value:new I(Ae.color.scale_red,Ae.color.scale_green,Ae.color.scale_blue)},u_epsilon:{type:"f",value:Ae.necklace.epsilon},u_show_solution_band:{type:"b",value:Ae.necklace.show_solution_band},u_show_solutions:{type:"b",value:Ae.necklace.show_solutions},u_show_single_thiefs_region:{type:"b",value:Ae.view.show_single_thiefs_region},u_alpha:{type:"f",value:Ae.color.alpha},u_time:{type:"f",value:1},u_resolution:{type:"v2",value:new ye(this.#r.domElement.width,this.#r.domElement.height)},u_intersect:{type:"v3",value:new I(0,0,0)}}}updateSphereMaterial(){this.#i!==void 0&&this.#i.material.dispose(),this.#i.material=this.createSphereMaterial(),this.#a.material.transparent=Ae.color.alpha!=1,le.dispatchEvent(le.MODEL_CHANGED)}updateVisibility(){this.#o.visible=Ae.view.axes_visible,this.#a.visible=Ae.view.mesh_visible,this.#i.visible=Ae.view.faces_visible,$t.visible(Ae.view.stats_monitor_visible),le.dispatchEvent(le.MODEL_CHANGED)}}const Wx="--jewel-a-color",Xx="--jewel-b-color",uf="--thief-a-color",hf="--thief-b-color",Yx=`${uf}-light`,Jx=`${hf}-light`,qx="--between-jewels-color",Zx="--gauge-color",jx="red",$x="green",eU="rgb(0,191,255)",Yn=10,Su=20,AU=5,tU=7;class nU extends lf{constructor(e,A={id:"necklace",container:document.body}){super(e,A),this.canvas=this.domElement,window.addEventListener("resize",()=>{const t=Math.min(innerWidth,this.container.clientWidth),i=Math.min(innerHeight,this.container.clientHeight);this.canvas.width=t,this.canvas.height=i,this.render()})}onMutation(e){this.render()}initializeCanvas(){const e=document.createElement("canvas");return e.setAttribute("id","necklace"),e.classList.add("necklace"),this.container.addEventListener(le.NECKLACE_CUT.toString(),()=>this.render()),this.container.addEventListener(le.MODEL_CHANGED.toString(),()=>this.render()),e}get size(){return this.model.size}get width(){return this.canvas.width}get height(){return this.canvas.height}get jewelWidth(){return this.width/this.size}get thief_a_color(){return getComputedStyle(document.body).getPropertyValue(uf)}get thief_b_color(){return getComputedStyle(document.body).getPropertyValue(hf)}get thief_a_color_light(){return getComputedStyle(document.body).getPropertyValue(Yx)}get thief_b_color_light(){return getComputedStyle(document.body).getPropertyValue(Jx)}get between_jewels_color(){return getComputedStyle(document.body).getPropertyValue(qx)}get jewel_a_color(){return getComputedStyle(document.body).getPropertyValue(Wx)}get jewel_b_color(){return getComputedStyle(document.body).getPropertyValue(Xx)}get gauge_color(){return getComputedStyle(document.body).getPropertyValue(Zx)}get captureElement(){return this.domElement}get showNecklace(){return Ae.int_mode===dt.STOLEN_NECKLACE&&Ae.view.necklace_visible}get showGauge(){return Ae.int_mode===dt.STOLEN_NECKLACE&&Ae.view.gauge_visible}render(){this.canvas!==void 0&&this._render()}_render(){this.canvas.width=this.canvas.clientWidth,this.canvas.height=this.canvas.clientHeight;const e=this.canvas.getContext("2d");if(e!==null){const A=e,t=0,i=0;let r=t;const s=this.model.cuts;if(this.showNecklace&&(this.drawNecklace(A,r,i,s),s!==void 0&&this.drawSegments(A,s)),this.model.thief_a!==void 0&&this.showGauge){const a=this.model.canonicalThief(this.model.thief_a),o=this.model.canonicalThief(this.model.thief_b);this.drawGauge(A,50,a,o)}Ae.text&&(A.font="12px",A.fillStyle="rgb(255,255,255)",A.fillText(Ae.text,0,150))}}drawNecklace(e,A,t,i){const s=Yn+Su;i===void 0&&(e.fillStyle=this.between_jewels_color,e.fillRect(A,t,this.width,Yn));const a=this.jewel_a_color,o=this.jewel_b_color;let l=A;for(let c=0;c<this.size;c++){const u=this.model.necklace[Math.floor(c)];e.fillStyle=u===0?a:o,e.fillRect(l,t+this.yOffset(i,c/this.size,s),this.jewelWidth-2,Yn),l+=this.jewelWidth}}drawSegments(e,A){let t=0;e.save(),e.lineWidth=this.showNecklace?1:Yn,e.strokeStyle=jx,t=this.drawSegment(e,t,A.x),e.strokeStyle=$x,t=this.drawSegment(e,t,A.y),e.strokeStyle=eU,t=this.drawSegment(e,t,A.z),e.restore()}drawSegment(e,A,t){e.beginPath();const i=this.yOffsetSegment(t)+e.lineWidth;e.moveTo(A,i);const r=A+Math.ceil(t*t*this.width);return e.lineTo(r,i),e.stroke(),r}yOffsetSegment(e){const A=this.showNecklace?AU:Su+Yn;return(e<0?A:0)+(this.showNecklace?Yn+tU:0)}drawGauge(e,A,t,i){const r=this.height-A,s=3,o=r-2;if(o>=10){const l=Math.SQRT1_2*o,c=this.width/2-o,u=new ye(c+o,A+o),h=this.thief_a_color,p=this.thief_b_color,g=this.gauge_color;e.beginPath(),e.fillStyle=this.thief_a_color_light,e.moveTo(u.x,u.y),e.arc(u.x,u.y,o,-Math.PI,-Math.PI/2),e.lineTo(u.x,u.y),e.closePath(),e.fill(),e.beginPath(),e.fillStyle=this.thief_b_color_light,e.moveTo(u.x,u.y),e.arc(u.x,u.y,o,-Math.PI/2,0),e.lineTo(u.x,u.y),e.closePath(),e.fill(),e.beginPath(),e.lineWidth=1,e.setLineDash([1,1]),e.arc(u.x,u.y,o/2,0,-Math.PI,!0),e.stroke(),e.beginPath(),e.strokeStyle=h,e.setLineDash([]),e.moveTo(u.x,u.y),e.lineTo(u.x-t.x*l,u.y-t.y*l),e.stroke(),e.beginPath(),e.strokeStyle=p,e.moveTo(u.x,u.y),e.lineTo(u.x+i.x*l,u.y-i.y*l),e.stroke();const m=1-Math.SQRT1_2*t.distanceTo(i),d=255+(0-255)*m,f=0+(255-0)*m;e.beginPath(),e.lineWidth=s,e.strokeStyle=`rgb(${d},${f}, 0)`,e.arc(u.x,u.y,o,-Math.PI,-Math.PI*(1-m),!1),e.stroke(),e.beginPath(),e.lineWidth=s,e.strokeStyle=g,e.arc(u.x,u.y,o,-Math.PI*(1-m),0,!1),e.stroke()}}yOffset(e,A,t){if(e===void 0)return 0;const i=e.x*e.x,r=e.y*e.y;return A<i?e.x<0?t:0:A<i+r?e.y<0?t:0:e.z<0?t:0}}function Mu(n){return n%1}class iU{#t;#e;#n;#A;constructor(){this.initializeStatus(0),window.addEventListener(le.SET_NECKLACE_CONFIGURATION_BY_NUMBER,()=>this.necklaceFromInt(Ae.necklace.configuration,Ae.necklace.number_of_jewels)),window.addEventListener(le.SET_NECKLACE_CONFIGURATION_BY_STRING,()=>this.necklaceFromStr(Ae.necklace.string))}get necklace(){return[...this.#t]}necklaceFromInt(e,A){this.initializeStatus(A);const t=e.toString(2);if(e!=0){const i=t.length-1;for(let r=i;r>=0;r--)this.#t[i-r]=t[r]==="0"?0:1}for(const i of this.#t)i===0?this.#e.x+=1:this.#e.y+=1;le.dispatchEvent(le.UPDATE_SPHERE_MATERIAL)}necklaceFromStr(e){this.initializeStatus(1),this.#t=[];for(let A=0;A<e.length;A++){const t=e.charCodeAt(A),i=t.toString(2);if(t!=0)for(const r of i)this.#t.push(r==="0"?0:1)}for(const A of this.#t)A===0?this.#e.x+=1:this.#e.y+=1;le.dispatchEvent(le.UPDATE_SPHERE_MATERIAL)}get size(){if(this.cnt.x<0||this.cnt.y<0)throw Error("Necklace not initialized");return this.cnt.x+this.cnt.y}applyCut(e){this.cuts=e,e!==void 0&&(this.#A=Ae.necklace.discrete?this.applyCutDiscrete(e):this.applyCutContinous(e)),le.dispatchEvent(le.NECKLACE_CUT)}applyCutDiscrete(e){if(this.cuts=e,e){const A=this.size,t=e.x*e.x*A,i=e.y*e.y*A,r=[0,0];for(let s=0;s<A;s++){const a=this.necklace[s],o=s;o<t?e.x>0&&r[a]++:o<t+i?e.y>0&&r[a]++:e.z>0&&r[a]++}return new ye(r[0],r[1])}return new ye(0,0)}applyCutContinous(e){if(this.cuts=e,e){const A=this.size,t=e.x*e.x*A,i=e.y*e.y*A,r=[0,0];for(let s=0;s<A;s++){const a=this.necklace[s],o=s+1;let l=0,c=0,u=0;o<=Math.ceil(t)?o<=Math.floor(t)?l=1:(l=Mu(t),o>t+i?(c=i,u=1-l-c):c=1-l):o<=Math.ceil(t+i)?o<=Math.floor(t+i)?c=1:(c=Mu(t+i),u=1-c):u=1,l!==0&&e.x>0&&(r[a]+=l),c!==0&&e.y>0&&(r[a]+=c),u!==0&&e.z>0&&(r[a]+=u)}return new ye(r[0],r[1])}return new ye(0,0)}initializeStatus(e){this.#t=Array(e).fill(0),this.#e=new ye(0,0),this.#n=new I(0,0),this.#A=new ye(0,0)}get cnt(){return this.#e.clone()}set cnt(e){this.#e=e.clone()}get count_0(){return this.#e.x}get count_1(){return this.#e.y}get cuts(){return this.#n?this.#n.clone():void 0}set cuts(e){e!==void 0&&(this.assertSphere(e),this.#n=e.clone())}assertSphere(e,A=1){if(e.length()-A>lo)throw new Error(`Input vector ${e} not close enough to sphere with radius ${A}, dist to orgin: ${e.length()}`)}get thief_a(){return this.#A!==void 0?this.#A.clone():new ye(0,0)}set thief_a(e){this.#A=e.clone()}get thief_b(){return this.#A!==void 0?this.cnt.sub(this.#A):new ye(0,0)}canonicalThief(e){const A=this.#e.x!==0?e.x/this.#e.x:0,t=this.#e.y!==0?e.y/this.#e.y:0;return new ye(A,t)}}const rU=new Vi,ff=await bo.create(),df=new iU,pf=new zx(df),sU=new nU(df);ff.initTheme();ff.registerOnThemeChange(document.body);le.dispatchEvent(le.SET_NECKLACE_CONFIGURATION_BY_NUMBER);pf.render();new h0({folder:rU.captureFolder,property:Ae.capture},{all:document.body,sphere:pf.captureElement,necklace:sU.captureElement});const No=document.createElement("SPAN");No.setAttribute("id","version-info");No.innerHTML="v0.4.9";document.body.insertAdjacentElement("beforeend",No);
