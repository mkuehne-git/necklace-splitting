import{h as L,G as F,S as U,V as y,a as j,R as W,P as B,W as V,M as k,b as K,D as I,A as $,c as Y,O as J,C as X,d as Q,e as Z,f as E}from"./vendor.3fb9c798.js";const ee=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerpolicy&&(o.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?o.credentials="include":s.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}};ee();var p;(function(c){c[c.STOLEN_NECKLACE=0]="STOLEN_NECKLACE",c[c.SHADER_LAMP=1]="SHADER_LAMP",c[c.SPACE_COLOR=2]="SPACE_COLOR",c[c.SINUSOID=3]="SINUSOID"})(p||(p={}));var r;(function(c){c.CREATE_SPHERE="create-sphere",c.SET_NECKLACE_CONFIGURATION_BY_NUMBER="necklace-configuration-by-number",c.SET_NECKLACE_CONFIGURATION_BY_STRING="necklace-configuration-by-string",c.UPDATE_SPHERE_MATERIAL="update-material",c.NECKLACE_CUT="necklace-cut",c.UPDATE_VISIBLE="update-visible",c.THEME_CHANGED="theme-changed",c.MODEL_CHANGED="model-changed",c.SHOW_IMPRINT="show-imprint",c.HIDE_IMPRINT="hide-imprint"})(r||(r={}));const te="modulepreload",R={},ne="/necklace-splitting/",ie=function(e,t){return!t||t.length===0?e():Promise.all(t.map(i=>{if(i=`${ne}${i}`,i in R)return;R[i]=!0;const s=i.endsWith(".css"),o=s?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${i}"]${o}`))return;const a=document.createElement("link");if(a.rel=s?"stylesheet":te,s||(a.as="script",a.crossOrigin=""),a.href=i,document.head.appendChild(a),s)return new Promise((_,l)=>{a.addEventListener("load",_),a.addEventListener("error",l)})})).then(()=>e())},se=async()=>await ie(()=>import("./imprint-gen.e21e9e5f.js"),[]),oe='<hr><p style="opacity: 1.0;">Dieses Impressum wurde erstellt durch <a href="https://www.impressum-generator.de" rel="nofollow">impressum-generator.de</a>.</p>',ae=`<hr><div class="center" width=100%>
<button id="hide-imprint" onclick="document.body.dispatchEvent(new Event('${r.HIDE_IMPRINT.toString()}', { bubbles: true }))">Close</button></div>`;class re{constructor(){window.addEventListener("resize",()=>{this._div!==void 0&&(this.hide(),this.show())}),document.body.addEventListener(r.SHOW_IMPRINT.toString(),()=>{this.show()}),document.body.addEventListener(r.HIDE_IMPRINT.toString(),()=>{this.hide()}),document.body.addEventListener("keydown",e=>{(e.key==="Esc"||e.key==="Escape")&&this.hide()})}async isAvailable(){const e=await se();return this._decryptedAES=e.decryptedAES,this._decryptedAES()!==void 0}show(){this._div=document.createElement("div"),this._div.classList.add("imprint"),this._div.classList.add("padding"),this._div.innerHTML=this._decryptedAES();const e=this._div;document.body.appendChild(e);const t=window.getComputedStyle(document.body),i=e.scrollWidth-10,s=e.scrollHeight,o=t.getPropertyValue("background-color");L(e,{backgroundColor:o,windowWidth:i,windowHeight:s}).then(a=>{e.classList.remove("padding"),e.innerHTML="",e.appendChild(a);const _=document.createElement("p");_.classList.add("padding"),_.innerHTML=oe+ae,e.appendChild(_)})}hide(){this._div!==void 0&&(document.body.removeChild(this._div),this._div=void 0)}}const C=.001,ce=C*C,le=32,b=["Stolen Necklace","Shader Lamp","Space Colors","Sinusoid"],n={showcase:b[p.STOLEN_NECKLACE],int_mode:p.STOLEN_NECKLACE,necklace:{number_of_jewels:24,configuration:13579652,string:"",show_solution_band:!0,show_solutions:!0,epsilon:.01,discrete:!0},sphere:{radius:15,segments:128,offset_octant:0,use_bad_on_sphere_check:!1},animation:{rotation_x:0,rotation_y:0,rotation_z:0,reset_speed:he,trigger_reset:!1,run:!1},view:{dark_theme:!0,stats_monitor_visible:!1,necklace_visible:!0,gauge_visible:!0,show_single_thiefs_region:!0,axes_visible:!0,mesh_visible:!1,faces_visible:!0},color:{scale_red:1,scale_green:1,scale_blue:1,alpha:1},capture:{},imprint:de,radio:b[p.STOLEN_NECKLACE],text:void 0};class h{static addRadioButtonsFolder(e,t,i,s,o=(a,_,l)=>{}){const a=e.addFolder(t);return h.addRadioButtons(a,i,s,o)}static addRadioButtons(e,t,i,s=(o,a,_)=>{}){const o=t;return t={},i.forEach((a,_)=>{const l=`option_${_}`;t[l]=o===a}),i.forEach((a,_)=>{const l=`option_${_}`;e.add(t,l).name(a).listen().onChange(()=>{for(let u in t)t[u]=l===u;s(t,l,_)})}),e}constructor(){this.gui=new F,this.gui.domElement.id="gui";const e=h.addRadioButtonsFolder(this.gui,`Showcase: ${n.radio}`,n.radio,b,(m,T,S)=>{n.int_mode=S,h.dispatchEvent(r.CREATE_SPHERE),e.name=`Showcase: ${b[S]}`,e.close()}),t=this.gui.addFolder("Necklace");t.add(n.necklace,"number_of_jewels",0,le,1).name("Jewels").onChange(()=>{const m=2**n.necklace.number_of_jewels-1;n.necklace.configuration=Math.min(m,n.necklace.configuration),i.min(0).max(m).setValue(n.necklace.configuration),h.dispatchEvent(r.UPDATE_SPHERE_MATERIAL)});const i=t.add(n.necklace,"configuration",0,2**n.necklace.number_of_jewels-1,1).name("Configuration").onChange(()=>h.dispatchEvent(r.SET_NECKLACE_CONFIGURATION_BY_NUMBER));t.add(n.necklace,"string").name("String").onChange(()=>h.dispatchEvent(r.SET_NECKLACE_CONFIGURATION_BY_STRING)),t.add(n.necklace,"discrete").name("Discrete").onChange(()=>h.dispatchEvent(r.UPDATE_SPHERE_MATERIAL)),t.add(n.necklace,"show_solution_band").name("Solution Band").onChange(()=>h.dispatchEvent(r.UPDATE_SPHERE_MATERIAL)),t.add(n.necklace,"show_solutions").name("Solutions").onChange(()=>h.dispatchEvent(r.UPDATE_SPHERE_MATERIAL)),t.add(n.necklace,"epsilon",0,.15).name("epsilon").onChange(()=>h.dispatchEvent(r.UPDATE_SPHERE_MATERIAL));const s=this.gui.addFolder("View");s.add(n.view,"dark_theme").name("Dark theme").onChange(()=>h.dispatchEvent(r.THEME_CHANGED)),s.add(n.view,"show_single_thiefs_region").name("Single Thief's Area").onChange(()=>h.dispatchEvent(r.UPDATE_SPHERE_MATERIAL)),s.add(n.view,"axes_visible").name("Axes").onChange(()=>h.dispatchEvent(r.UPDATE_VISIBLE)),s.add(n.view,"mesh_visible").name("Mesh").onChange(()=>h.dispatchEvent(r.UPDATE_VISIBLE)),s.add(n.view,"faces_visible").name("Faces").onChange(()=>h.dispatchEvent(r.UPDATE_VISIBLE));const o=s.addFolder("Sphere");o.add(n.sphere,"radius",1,50,1).name("Radius").onChange(()=>h.dispatchEvent(r.CREATE_SPHERE)),o.add(n.sphere,"offset_octant",0,5,.1).name("Octant Offset").onChange(()=>h.dispatchEvent(r.CREATE_SPHERE)),o.add(n.sphere,"use_bad_on_sphere_check").name("Bad Check").onChange(()=>h.dispatchEvent(r.UPDATE_SPHERE_MATERIAL)),o.add(n.sphere,"segments",3,511,1).name("Segments").onChange(()=>h.dispatchEvent(r.CREATE_SPHERE));const a=s.addFolder("Other Controls");a.add(n.view,"stats_monitor_visible").name("Monitor").onChange(()=>h.dispatchEvent(r.UPDATE_VISIBLE)),a.add(n.view,"necklace_visible").name("Necklace").onChange(()=>h.dispatchEvent(r.UPDATE_VISIBLE)),a.add(n.view,"gauge_visible").name("Gauge").onChange(()=>h.dispatchEvent(r.UPDATE_VISIBLE));const _=s.addFolder("Color");_.add(n.color,"scale_red",0,1).name("Red").onChange(()=>h.dispatchEvent(r.UPDATE_SPHERE_MATERIAL)),_.add(n.color,"scale_green",0,1).name("Green").onChange(()=>h.dispatchEvent(r.UPDATE_SPHERE_MATERIAL)),_.add(n.color,"scale_blue",0,1).name("Blue").onChange(()=>h.dispatchEvent(r.UPDATE_SPHERE_MATERIAL)),_.add(n.color,"alpha",0,1).name("Alpha").onChange(()=>h.dispatchEvent(r.CREATE_SPHERE));const l=s.addFolder("Animation"),u=.5;l.add(n.animation,"run").name("Rotate [Hz]").listen(),l.add(n.animation,"rotation_x",-u,u,.1).name("X").listen(),l.add(n.animation,"rotation_y",-u,u,.1).name("Y").listen(),l.add(n.animation,"rotation_z",-u,u,.1).name("Z").listen(),l.add(n.animation,"reset_speed").name("Reset Rotation"),this._captureFolder=this.gui.addFolder("Screen capture"),new re().isAvailable().then(m=>{m&&this.gui.add(n,"imprint").name("Imprint")})}static dispatchEvent(e){const t=new Event(e.toString(),{bubbles:!0});document.body.dispatchEvent(t)}get captureFolder(){return this._captureFolder}}function he(){n.animation.trigger_reset=!0,n.animation.run=!1,n.animation.rotation_x=0,n.animation.rotation_y=0,n.animation.rotation_z=0}function de(){h.dispatchEvent(r.SHOW_IMPRINT)}HTMLCanvasElement.prototype.getContext=function(c){return function(e,t){return t=t||{},t.preserveDrawingBuffer=!0,c.call(this,e,t)}}(HTMLCanvasElement.prototype.getContext);const M=["All","Sphere","Necklace"];class _e{constructor(e,t={all:HTMLElement=void 0,sphere:HTMLElement=void 0,necklace:HTMLElement=void 0}){this._fBeforeCapture=()=>document.body,this._configureSettings(e,t),document.addEventListener("keydown",i=>{i.ctrlKey&&i.key==="#"&&this.capture()})}_configureSettings(e,t){this._optionsArray=[t.all,t.sphere,t.necklace];const i=e.folder,s=e.property;s.selection=M[0],this._captionIndex=0,this._fBeforeCapture=()=>this._optionsArray[this._captionIndex],s.on_capture_clicked=()=>this.capture(),h.addRadioButtons(i,s.selection,M,(o,a,_)=>{this._captionIndex=_}),i.add(s,"on_capture_clicked").name("Click or press 's'")}capture(e=this._fBeforeCapture){console.log(`screenCapture ${e}`);const t=e();if(!t)throw new Error("No element to capture");setTimeout(()=>{const s=window.getComputedStyle(document.body).getPropertyValue("background-color");L(t,{backgroundColor:s}).then(o=>{const a=document.createElement("a");a.href=o.toDataURL(),a.download="necklace.png",a.click()})},100)}}class ue{constructor(e,t=void 0,i=void 0){this.setSize(e,t,i),window.addEventListener("resize",()=>{this.setSize(e,t,i),this.onResize()})}setSize(e,t,i){const s=Math.min(innerWidth,e.clientWidth),o=Math.min(innerHeight,e.clientHeight);t!==void 0&&(t.aspect=s/o,t.updateProjectionMatrix()),i!==void 0&&(i.setSize(s,o),i.setPixelRatio(window.devicePixelRatio))}onResize(){}}var fe=`uniform int u_mode;
uniform bool u_necklace_absolute;
uniform bool u_necklace_discrete;
uniform bool u_show_solution_band;
uniform bool u_show_solutions;
uniform bool u_show_single_thiefs_region;
uniform float u_epsilon;
uniform vec3 u_radius_vector;
uniform float u_offset_sphere_octant;
uniform bool u_use_bad_on_sphere_check;
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

struct SphereData {
    vec3 p;
    float octant;
    bool valid;
};

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
    
    SphereData sd_shader = displace_octant(position, u_offset_sphere_octant);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(sd_shader.p, 1.0);

    v_pos = position / u_radius_vector;

    
    SphereData sd_out = displace_octant(v_pos, u_offset_sphere_octant / u_radius_vector.x);
    v_sphereData_p = sd_out.p;
    v_sphereData_octant = sd_out.octant;
    v_sphereData_valid = sd_out.valid ? 1.0 : 0.0;
}`,pe=`#define M_PI 3.1415926535897932384626433832795
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

/**
 * The canonical target value for each jewel type is 1/2, except if one jewel type
 * has is zero. In this case the target value is 0.
 * 
 * @returns {vec2} the target vector for each jewel type
 */
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
/** 
 * Calculate the discrete distribution of the jewels 
 * based on the squared (x,y,z) values of the given cut positions.
 * 
 * @param cuts {vec3} the given position representing the two cuts
 * @returns {vec2} the number jewels (per type) assigned to first thief
 */
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
}`;class P{constructor(e,t={id:"canvas",container:document.body}){this.model=e,this._id=t.id,this._container=t.container,this._canvas=this.domElement}get container(){return this._container}get canvas(){return this._canvas}get domElement(){if(this._canvas===void 0){const e=this.initializeCanvas();this._id!==void 0&&e.setAttribute("id",this._id),e.classList.add("sphere");const t=this;let i=!1;return this._observer=new MutationObserver(s=>{i&&s.forEach((o,a,_)=>{t.onMutation(o)})}),this._observer.observe(this._container,{attributes:!0,attributeFilter:["class"]}),this._container.appendChild(e),i=!0,e}return this._canvas}set visible(e){this._canvas!==void 0&&(this._canvas.style.visibility=e?"visible":"hidden")}}const v=U();v.visible=c=>{v.domElement.style.visibility=c?"visible":"hidden"};v.showPanel(0);document.body.appendChild(v.dom);v.visible(n.view.stats_monitor_visible);const A={x:0,y:0};class ve extends P{constructor(e,t={id:"sphere",container:document.body}){super(e,t);this.onThemeChange()}initializeCanvas(){this._lastInterSect=new y(-1,20,-30),this._scene=new j,this._raycaster=new W,this._camera=new B(75,this.container.clientWidth/this.container.clientHeight,.1,1e3),this._renderer=new V({antialias:!0});const e=this._renderer.domElement;return this.container.appendChild(e),this._resizer=new ue(this.container,this._camera,this._renderer),this._sphere=new k(this.createSphereGeometry(),this.createSphereMaterial()),this._sphere.visible=n.view.faces_visible,this._sphereMesh=new k(this.createSphereGeometry(),new K({wireframe:!0,side:I,transparent:!0})),this._sphereMesh.visible=n.view.mesh_visible,this._axesHelper=new $(20),this._axesHelper.visible=n.view.axes_visible,this._group=new Y,this._group.add(this._sphere,this._sphereMesh,this._axesHelper),this._scene.add(this._group),this._orbitControls=new J(this._camera,this._renderer.domElement),this._camera.position.z=50,this._orbitControls.update(),this.container.addEventListener(r.CREATE_SPHERE.toString(),()=>this.createSphere()),this.container.addEventListener("mousemove",t=>{A.x=t.clientX/this.container.clientWidth*2-1,A.y=-(t.clientY/this.container.clientHeight)*2+1}),this.container.addEventListener(r.UPDATE_SPHERE_MATERIAL.toString(),()=>this.updateSphereMaterial()),this.container.addEventListener(r.UPDATE_VISIBLE.toString(),()=>this.updateVisibility()),this.container.addEventListener(r.THEME_CHANGED.toString(),()=>this.updateVisibility()),e}onMutation(e){const i=window.getComputedStyle(this.container).getPropertyValue("background-color");this._scene.background=new X(i)}get captureElement(){return this._renderer.domElement}render(){const e=t=>{this._lastRender===void 0&&(this._lastRender=t),this._render(t-this._lastRender),this._lastRender=t,requestAnimationFrame(e)};e((performance||Date).now())}_render(e){if(v.begin(),this._orbitControls.update(),this._renderer.render(this._scene,this._camera),this._sphere.visible||this._sphereMesh.visible){this._raycaster.setFromCamera(A,this._camera);const t=this._raycaster.intersectObject(this._sphere),i=this._sphere.material.uniforms;if(t.length>0&&!n.animation.run){const s=t[0].point.clone();i.u_intersect.value=s,this._setIntersect(s)}else i.u_intersect.value=new y,this.domElement.style.cursor="auto"}if(n.animation.trigger_reset)n.animation.trigger_reset=!1,this._group.rotation.x=0,this._group.rotation.y=0,this._group.rotation.z=0;else if(n.animation.run){const t=Math.PI*e/500;this._group.rotation.x+=n.animation.rotation_x*t,this._group.rotation.y+=n.animation.rotation_y*t,this._group.rotation.z+=n.animation.rotation_z*t}v.end()}_setIntersect(e){if(e.distanceToSquared(this._lastInterSect)>ce){this.domElement.style.cursor="none",this._lastInterSect=e;const t=n.sphere.radius||1;this.model.applyCut(e.clone().divideScalar(t))}}onThemeChange(){const e=n.view.dark_theme?"light":"dark",t=n.view.dark_theme?"dark":"light";this.container.classList.contains(e)&&this.container.classList.remove(e),this.container.classList.add(t)}createSphere(){this._sphere.geometry.dispose(),this._sphereMesh.geometry.dispose();const e=this.createSphereGeometry();this._sphere.geometry=e,this._sphereMesh.geometry=e,this.updateSphereMaterial()}createSphereGeometry(){const e=n.sphere.segments;return new Q(n.sphere.radius,e,e/2)}createSphereMaterial(){return new Z({vertexShader:fe,fragmentShader:pe,side:I,transparent:!0,defines:this.defines,uniforms:this.uniforms})}get defines(){return{MAX_JEWELS:Math.max(1,this.model.necklace.length),MODE_STOLEN_NECKLACE:p.STOLEN_NECKLACE,MODE_SHADER_LAMP:p.SHADER_LAMP,MODE_SPACE_COLOR:p.SPACE_COLOR,MODE_SINUSOID:p.SINUSOID}}get uniforms(){return n.sphere.offset_octant/n.sphere.radius,{u_mode:{type:"i",value:n.int_mode},u_necklace_discrete:{type:"b",value:n.necklace.discrete},u_input:{type:"i",value:this.model.necklace},u_count_0:{type:"i",value:this.model.count_0},u_count_1:{type:"i",value:this.model.count_1},u_offset_sphere_octant:{type:"f",value:n.sphere.offset_octant},u_use_bad_on_sphere_check:{type:"b",value:n.sphere.use_bad_on_sphere_check},u_radius_vector:{type:"v3",value:new y(n.sphere.radius,n.sphere.radius,n.sphere.radius)},u_scale_color:{type:"v3",value:new y(n.color.scale_red,n.color.scale_green,n.color.scale_blue)},u_epsilon:{type:"f",value:n.necklace.epsilon},u_show_solution_band:{type:"b",value:n.necklace.show_solution_band},u_show_solutions:{type:"b",value:n.necklace.show_solutions},u_show_single_thiefs_region:{type:"b",value:n.view.show_single_thiefs_region},u_alpha:{type:"f",value:n.color.alpha},u_time:{type:"f",value:1},u_resolution:{type:"v2",value:new E(this._renderer.domElement.width,this._renderer.domElement.height)},u_intersect:{type:"v3",value:new y(0,0,0)}}}updateSphereMaterial(){this._sphere!==void 0&&this._sphere.material.dispose(),this._sphere.material=this.createSphereMaterial(),this._sphereMesh.material.transparent=n.color.alpha!=1,h.dispatchEvent(r.MODEL_CHANGED)}updateVisibility(){this._axesHelper.visible=n.view.axes_visible,this._sphereMesh.visible=n.view.mesh_visible,this._sphere.visible=n.view.faces_visible,v.visible(n.view.stats_monitor_visible),h.dispatchEvent(r.MODEL_CHANGED)}}const me="--jewel-a-color",Ee="--jewel-b-color",O="--thief-a-color",N="--thief-b-color",ge=`${O}-light`,ye=`${N}-light`,Se="--between-jewels-color",we="--gauge-color",be="red",Ce="green",Ae="rgb(0,191,255)",g=10,D=20,Te=5,Le=7;class ke extends P{constructor(e,t={id:"necklace",container:document.body}){super(e,t);window.addEventListener("resize",()=>{const i=Math.min(innerWidth,this.container.clientWidth),s=Math.min(innerHeight,this.container.clientHeight);this.canvas.width=i,this.canvas.height=s,this.render()})}onMutation(e){this.render()}initializeCanvas(){const e=document.createElement("canvas");return e.setAttribute("id","necklace"),e.classList.add("necklace"),this.container.addEventListener(r.NECKLACE_CUT.toString(),()=>this.render()),this.container.addEventListener(r.MODEL_CHANGED.toString(),()=>this.render()),e}get size(){return this.model.size}get scaledKnife(){if(this.model.cuts===void 0)return this.model.cuts.clone().multiplyScalar(this.size)}get width(){return this.canvas.width}get height(){return this.canvas.height}get jewelWidth(){return this.width/this.size}get thief_a_color(){return getComputedStyle(document.body).getPropertyValue(O)}get thief_b_color(){return getComputedStyle(document.body).getPropertyValue(N)}get thief_a_color_light(){return getComputedStyle(document.body).getPropertyValue(ge)}get thief_b_color_light(){return getComputedStyle(document.body).getPropertyValue(ye)}get between_jewels_color(){return getComputedStyle(document.body).getPropertyValue(Se)}get jewel_a_color(){return getComputedStyle(document.body).getPropertyValue(me)}get jewel_b_color(){return getComputedStyle(document.body).getPropertyValue(Ee)}get gauge_color(){return getComputedStyle(document.body).getPropertyValue(we)}get captureElement(){return this.domElement}get showNecklace(){return n.int_mode===p.STOLEN_NECKLACE&&n.view.necklace_visible}get showGauge(){return n.int_mode===p.STOLEN_NECKLACE&&n.view.gauge_visible}render(){this.canvas!==void 0&&this._render()}_render(){this.canvas.width=this.canvas.clientWidth,this.canvas.height=this.canvas.clientHeight;const e=this.canvas.getContext("2d"),t=0,i=0;let s=t;const o=this.model.cuts;if(this.showNecklace&&(this.drawNecklace(e,s,i,o),o!==void 0&&this.drawSegments(e,o)),this.model.thief_a!==void 0&&this.showGauge){const a=this.model.canonicalThief(this.model.thief_a),_=this.model.canonicalThief(this.model.thief_b);this.drawGauge(e,50,a,_)}n.text&&(e.font="12px",e.fillStyle="rgb(255,255,255)",e.fillText(n.text,0,150))}drawNecklace(e,t,i,s){const o=2,a=g+D;s||(e.fillStyle=this.between_jewels_color,e.fillRect(t,i,this.width,g));const _=this.jewel_a_color,l=this.jewel_b_color;let u=t;for(let f=0;f<this.size;f++){const d=this.model.necklace[Math.floor(f)];e.fillStyle=d===0?_:l,e.fillRect(u,i+this.yOffset(s,f/this.size,a),this.jewelWidth-o,g),u+=this.jewelWidth}}drawSegments(e,t){let i=0;e.save(),e.lineWidth=this.showNecklace?1:g,e.strokeStyle=be,i=this.drawSegment(e,i,t.x),e.strokeStyle=Ce,i=this.drawSegment(e,i,t.y),e.strokeStyle=Ae,i=this.drawSegment(e,i,t.z),e.restore()}drawSegment(e,t,i){e.beginPath();const s=this.yOffsetSegment(i)+e.lineWidth;e.moveTo(t,s);const o=t+Math.ceil(i*i*this.width);return e.lineTo(o,s),e.stroke(),o}yOffsetSegment(e){const t=this.showNecklace?Te:D+g;return(e<0?t:0)+(this.showNecklace?g+Le:0)}drawGauge(e,t,i,s){const o=this.height-t,a=3,l=o-2;if(l>=10){const u=Math.SQRT1_2*l,f=this.width/2-l,d=new E(f+l,t+l),m=this.thief_a_color,T=this.thief_b_color,S=this.gauge_color;e.beginPath(),e.fillStyle=this.thief_a_color_light,e.moveTo(d.x,d.y),e.arc(d.x,d.y,l,-Math.PI,-Math.PI/2),e.lineTo(d.x,d.y),e.closePath(),e.fill(),e.beginPath(),e.fillStyle=this.thief_b_color_light,e.moveTo(d.x,d.y),e.arc(d.x,d.y,l,-Math.PI/2,0),e.lineTo(d.x,d.y),e.closePath(),e.fill(),e.beginPath(),e.lineWidth=1,e.setLineDash([1,1]),e.arc(d.x,d.y,l/2,0,-Math.PI,!0),e.stroke(),e.beginPath(),e.strokeStyle=m,e.setLineDash([]),e.moveTo(d.x,d.y),e.lineTo(d.x-i.x*u,d.y-i.y*u),e.stroke(),e.beginPath(),e.strokeStyle=T,e.moveTo(d.x,d.y),e.lineTo(d.x+s.x*u,d.y-s.y*u),e.stroke();const w=1-Math.SQRT1_2*i.distanceTo(s),q=255+(0-255)*w,G=0+(255-0)*w;e.beginPath(),e.lineWidth=a,e.strokeStyle=`rgb(${q},${G}, 0)`,e.arc(d.x,d.y,l,-Math.PI,-Math.PI*(1-w),!1),e.stroke(),e.beginPath(),e.lineWidth=a,e.strokeStyle=S,e.arc(d.x,d.y,l,-Math.PI*(1-w),0,!1),e.stroke()}}yOffset(e,t,i){if(e===void 0)return 0;const s=e.x*e.x,o=e.y*e.y;return t<s?e.x<0?i:0:t<s+o?e.y<0?i:0:e.z<0?i:0}}function x(c){return c%1}class Ie{constructor(){this._necklace=void 0,this._cnt=void 0,this._cuts=void 0,this._thief=void 0,this.initializeStatus(0),window.addEventListener(r.SET_NECKLACE_CONFIGURATION_BY_NUMBER,()=>this.necklaceFromInt(n.necklace.configuration,n.necklace.number_of_jewels)),window.addEventListener(r.SET_NECKLACE_CONFIGURATION_BY_STRING,()=>this.necklaceFromStr(n.necklace.string))}get necklace(){return[...this._necklace]}necklaceFromInt(e,t){this.initializeStatus(t);const i=e.toString(2);if(e!=0){let s=0;for(const o of i)this._necklace[s++]=o==="0"?0:1}for(const s of this._necklace)s===0?this._cnt.x+=1:this._cnt.y+=1;h.dispatchEvent(r.UPDATE_SPHERE_MATERIAL)}necklaceFromStr(e){this.initializeStatus(1),this._necklace=[];for(let t=0;t<e.length;t++){const i=e.charCodeAt(t),s=i.toString(2);if(i!=0)for(const o of s)this._necklace.push(o==="0"?0:1)}for(const t of this._necklace)t===0?this._cnt.x+=1:this._cnt.y+=1;console.log(`necklaceFromString: ${e}: ${this._necklace} ${this._cnt.x},${this._cnt.y}`),h.dispatchEvent(r.UPDATE_SPHERE_MATERIAL)}get size(){if(this.cnt.x<0||this.cnt.y<0)throw Error("Necklace not initialized");return this.cnt.x+this.cnt.y}applyCut(e){this.cuts=e,e!==void 0&&(this.thief_a=n.necklace.discrete?this.applyCutDiscrete(e):this.applyCutContinous(e)),h.dispatchEvent(r.NECKLACE_CUT)}applyCutDiscrete(e){if(this.cuts=e,e){const t=this.size,i=e.x*e.x*t,s=e.y*e.y*t,o=[0,0];for(let a=0;a<t;a++){const _=this.necklace[a],l=a;l<i?e.x>0&&o[_]++:l<i+s?e.y>0&&o[_]++:e.z>0&&o[_]++}return new E(o[0],o[1])}}applyCutContinous(e){if(this.cuts=e,e){const t=this.size,i=e.x*e.x*t,s=e.y*e.y*t,o=[0,0];for(let a=0;a<t;a++){const _=this.necklace[a],l=a+1;let u=0,f=0,d=0;l<=Math.ceil(i)?l<=Math.floor(i)?u=1:(u=x(i),l>i+s?(f=s,d=1-u-f):f=1-u):l<=Math.ceil(i+s)?l<=Math.floor(i+s)?f=1:(f=x(i+s),d=1-f):d=1,u!==0&&e.x>0&&(o[_]+=u),f!==0&&e.y>0&&(o[_]+=f),d!==0&&e.z>0&&(o[_]+=d)}return new E(o[0],o[1])}}initializeStatus(e){this._necklace=Array(e).fill(0),this._cnt=new E(0,0),this._cuts=void 0,this._thief=void 0}get cnt(){return this._cnt.clone()}set cnt(e){this._cnt=e.clone()}get count_0(){return this._cnt.x}get count_1(){return this._cnt.y}get cuts(){return this._cuts?this._cuts.clone():void 0}set cuts(e){e!==void 0?(this.assertSphere(e),this._cuts=e.clone()):this._cuts=void 0}assertSphere(e,t=1){if(e.length()-t>C)throw new Error(`Input vector ${e} not close enough to sphere with radius ${t}, dist to orgin: ${e.length()}`)}get thief_a(){return this._thief!==void 0?this._thief.clone():void 0}set thief_a(e){this._thief=e.clone()}get thief_b(){return this._thief!==void 0?this.cnt.sub(this._thief):void 0}canonicalThief(e){const t=this._cnt.x!==0?e.x/this._cnt.x:0,i=this._cnt.y!==0?e.y/this._cnt.y:0;return new E(t,i)}}const Re=new h,z=new Ie,H=new ve(z),Me=new ke(z);document.body.addEventListener(r.THEME_CHANGED.toString(),Pe);function Pe(){const c=n.view.dark_theme?"light":"dark",e=n.view.dark_theme?"dark":"light";document.body.classList.contains(c)&&document.body.classList.remove(c),document.body.classList.add(e)}h.dispatchEvent(r.SET_NECKLACE_CONFIGURATION_BY_NUMBER);H.render();new _e({folder:Re.captureFolder,property:n.capture},{all:document.body,sphere:H.captureElement,necklace:Me.captureElement});
