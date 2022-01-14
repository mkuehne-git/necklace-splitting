import{h as L,G as q,S as F,V as y,a as j,R as W,P as V,W as K,M as k,b as $,D as O,A as Y,c as J,O as X,C as Q,d as Z,e as ee,f as E}from"./vendor.518a8179.js";const te=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerpolicy&&(o.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?o.credentials="include":s.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}};te();var p;(function(r){r[r.STOLEN_NECKLACE=0]="STOLEN_NECKLACE",r[r.SEGMENTS=1]="SEGMENTS",r[r.SHADER_LAMP=2]="SHADER_LAMP",r[r.SPACE_COLOR=3]="SPACE_COLOR",r[r.SINUSOID=4]="SINUSOID",r[r.ASSERT_POSITION_BOUNDARY=5]="ASSERT_POSITION_BOUNDARY"})(p||(p={}));var b;(function(r){r[r.ABSOLUTE=0]="ABSOLUTE",r[r.DELTA=1]="DELTA"})(b||(b={}));var c;(function(r){r.CREATE_SPHERE="create-sphere",r.SET_NECKLACE_CONFIGURATION_BY_NUMBER="necklace-configuration-by-number",r.SET_NECKLACE_CONFIGURATION_BY_STRING="necklace-configuration-by-string",r.UPDATE_SPHERE_MATERIAL="update-material",r.NECKLACE_CUT="necklace-cut",r.UPDATE_VISIBLE="update-visible",r.THEME_CHANGED="theme-changed",r.MODEL_CHANGED="model-changed",r.SHOW_IMPRINT="show-imprint",r.HIDE_IMPRINT="hide-imprint"})(c||(c={}));const ne="modulepreload",I={},ie="/necklace-splitting/",se=function(e,t){return!t||t.length===0?e():Promise.all(t.map(i=>{if(i=`${ie}${i}`,i in I)return;I[i]=!0;const s=i.endsWith(".css"),o=s?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${i}"]${o}`))return;const a=document.createElement("link");if(a.rel=s?"stylesheet":ne,s||(a.as="script",a.crossOrigin=""),a.href=i,document.head.appendChild(a),s)return new Promise((_,h)=>{a.addEventListener("load",_),a.addEventListener("error",h)})})).then(()=>e())},oe=async()=>await se(()=>import("./imprint-gen.e21e9e5f.js"),[]),ae='<hr><p style="opacity: 1.0;">Dieses Impressum wurde erstellt durch <a href="https://www.impressum-generator.de" rel="nofollow">impressum-generator.de</a>.</p>',re=`<hr><div class="center" width=100%>
<button id="hide-imprint" onclick="document.body.dispatchEvent(new Event('${c.HIDE_IMPRINT.toString()}', { bubbles: true }))">Close</button></div>`;class ce{constructor(){window.addEventListener("resize",()=>{this._div!==void 0&&(this.hide(),this.show())}),document.body.addEventListener(c.SHOW_IMPRINT.toString(),()=>{this.show()}),document.body.addEventListener(c.HIDE_IMPRINT.toString(),()=>{this.hide()}),document.body.addEventListener("keydown",e=>{(e.key==="Esc"||e.key==="Escape")&&this.hide()})}async isAvailable(){const e=await oe();return this._decryptedAES=e.decryptedAES,this._decryptedAES()!==void 0}show(){this._div=document.createElement("div"),this._div.classList.add("imprint"),this._div.classList.add("padding"),this._div.innerHTML=this._decryptedAES();const e=this._div;document.body.appendChild(e);const t=window.getComputedStyle(document.body),i=e.scrollWidth-10,s=e.scrollHeight,o=t.getPropertyValue("background-color");L(e,{backgroundColor:o,windowWidth:i,windowHeight:s}).then(a=>{e.classList.remove("padding"),e.innerHTML="",e.appendChild(a);const _=document.createElement("p");_.classList.add("padding"),_.innerHTML=ae+re,e.appendChild(_)})}hide(){this._div!==void 0&&(document.body.removeChild(this._div),this._div=void 0)}}const w=.001,le=w*w,de=32,C=["Stolen Necklace","Segments only","Shader Lamp","Space Colors","Sinusoid","Test Position Ranges"],n={showcase:C[p.STOLEN_NECKLACE],int_mode:p.STOLEN_NECKLACE,necklace:{number_of_jewels:24,configuration:13579652,string:"",absolute_distribution:!0,epsilon:.01,discrete:!0},sphere:{radius:15,segments:128,radius_factor:1,offset_octant:0,use_bad_on_sphere_check:!1},animation:{rotation_x:0,rotation_y:0,rotation_z:0,reset_speed:he,trigger_reset:!1,run:!1},view:{dark_theme:!0,stats_monitor_visible:!1,necklace_visible:!0,gauge_visible:!0,show_single_thiefs_region:!0,assert_boundary:!0,axes_visible:!0,mesh_visible:!1,faces_visible:!0},color:{scale_red:1,scale_green:1,scale_blue:1,alpha:1},capture:{},imprint:_e,radio:C[p.STOLEN_NECKLACE],text:void 0};class d{static addRadioButtonsFolder(e,t,i,s,o=(a,_,h)=>{}){const a=e.addFolder(t);return d.addRadioButtons(a,i,s,o)}static addRadioButtons(e,t,i,s=(o,a,_)=>{}){const o=t;return t={},i.forEach((a,_)=>{const h=`option_${_}`;t[h]=o===a}),i.forEach((a,_)=>{const h=`option_${_}`;e.add(t,h).name(a).listen().onChange(()=>{for(let u in t)t[u]=h===u;s(t,h,_)})}),e}constructor(){this.gui=new q,this.gui.domElement.id="gui";const e=d.addRadioButtonsFolder(this.gui,`Showcase: ${n.radio}`,n.radio,C,(l,T,g)=>{n.int_mode=g,d.dispatchEvent(c.CREATE_SPHERE),e.name=`Showcase: ${C[g]}`,e.close()}),t=this.gui.addFolder("Necklace");t.add(n.necklace,"number_of_jewels",0,de,1).name("Jewels").onChange(()=>{const l=2**n.necklace.number_of_jewels-1;n.necklace.configuration=Math.min(l,n.necklace.configuration),i.min(0).max(l).setValue(n.necklace.configuration),d.dispatchEvent(c.UPDATE_SPHERE_MATERIAL)});const i=t.add(n.necklace,"configuration",0,2**n.necklace.number_of_jewels-1,1).name("Configuration").onChange(()=>d.dispatchEvent(c.SET_NECKLACE_CONFIGURATION_BY_NUMBER));t.add(n.necklace,"string").name("String").onChange(()=>d.dispatchEvent(c.SET_NECKLACE_CONFIGURATION_BY_STRING)),t.add(n.necklace,"absolute_distribution").name("Absolute/Relative").onChange(()=>d.dispatchEvent(c.CREATE_SPHERE)),t.add(n.necklace,"epsilon",0,.15).name("epsilon").onChange(()=>d.dispatchEvent(c.UPDATE_SPHERE_MATERIAL)),t.add(n.necklace,"discrete").name("Discrete").onChange(()=>d.dispatchEvent(c.UPDATE_SPHERE_MATERIAL));const s=this.gui.addFolder("View");s.add(n.view,"dark_theme").name("Dark theme").onChange(()=>d.dispatchEvent(c.THEME_CHANGED)),s.add(n.view,"show_single_thiefs_region").name("Single thief's area").onChange(()=>d.dispatchEvent(c.UPDATE_SPHERE_MATERIAL)),s.add(n.view,"axes_visible").name("Axes").onChange(()=>d.dispatchEvent(c.UPDATE_VISIBLE)),s.add(n.view,"mesh_visible").name("Mesh").onChange(()=>d.dispatchEvent(c.UPDATE_VISIBLE)),s.add(n.view,"faces_visible").name("Faces").onChange(()=>d.dispatchEvent(c.UPDATE_VISIBLE));const o=s.addFolder("Sphere");o.add(n.sphere,"radius",1,50,1).name("Radius").onChange(()=>d.dispatchEvent(c.CREATE_SPHERE)),o.add(n.sphere,"offset_octant",0,5,.1).name("Octant Offset").onChange(()=>d.dispatchEvent(c.CREATE_SPHERE)),o.add(n.sphere,"use_bad_on_sphere_check").name("Bad Check").onChange(()=>d.dispatchEvent(c.UPDATE_SPHERE_MATERIAL)),o.add(n.sphere,"segments",3,511,1).name("Segments").onChange(()=>d.dispatchEvent(c.CREATE_SPHERE)),o.add(n.sphere,"radius_factor",.01,1.5,.01).name("Scaling").onChange(()=>d.dispatchEvent(c.CREATE_SPHERE));const a=s.addFolder("Other Controls");a.add(n.view,"stats_monitor_visible").name("Monitor").onChange(()=>d.dispatchEvent(c.UPDATE_VISIBLE)),a.add(n.view,"necklace_visible").name("Necklace").onChange(()=>d.dispatchEvent(c.UPDATE_VISIBLE)),a.add(n.view,"gauge_visible").name("Gauge").onChange(()=>d.dispatchEvent(c.UPDATE_VISIBLE)),a.add(n.view,"assert_boundary").name("Assert ranges").onChange(()=>d.dispatchEvent(c.CREATE_SPHERE));const _=s.addFolder("Color");_.add(n.color,"scale_red",0,1).name("Red").onChange(()=>d.dispatchEvent(c.UPDATE_SPHERE_MATERIAL)),_.add(n.color,"scale_green",0,1).name("Green").onChange(()=>d.dispatchEvent(c.UPDATE_SPHERE_MATERIAL)),_.add(n.color,"scale_blue",0,1).name("Blue").onChange(()=>d.dispatchEvent(c.UPDATE_SPHERE_MATERIAL)),_.add(n.color,"alpha",0,1).name("Alpha").onChange(()=>d.dispatchEvent(c.CREATE_SPHERE));const h=s.addFolder("Animation");h.add(n.animation,"run").name("Animate").listen(),h.add(n.animation,"rotation_x",-1,1,.1).name("Rot-X").listen(),h.add(n.animation,"rotation_y",-1,1,.1).name("Rot-Y").listen(),h.add(n.animation,"rotation_z",-1,1,.1).name("Rot-Z").listen(),h.add(n.animation,"reset_speed").name("Reset Rot"),this._captureFolder=this.gui.addFolder("Screen capture"),new ce().isAvailable().then(l=>{l&&this.gui.add(n,"imprint").name("Imprint")})}static dispatchEvent(e){const t=new Event(e.toString(),{bubbles:!0});document.body.dispatchEvent(t)}get captureFolder(){return this._captureFolder}}function he(){n.animation.trigger_reset=!0,n.animation.run=!1,n.animation.rotation_x=0,n.animation.rotation_y=0,n.animation.rotation_z=0}function _e(){d.dispatchEvent(c.SHOW_IMPRINT)}HTMLCanvasElement.prototype.getContext=function(r){return function(e,t){return t=t||{},t.preserveDrawingBuffer=!0,r.call(this,e,t)}}(HTMLCanvasElement.prototype.getContext);const R=["All","Sphere","Necklace"];class ue{constructor(e,t={all:HTMLElement=void 0,sphere:HTMLElement=void 0,necklace:HTMLElement=void 0}){this._fBeforeCapture=()=>document.body,this._configureSettings(e,t),document.addEventListener("keydown",i=>{i.ctrlKey&&i.key==="#"&&this.capture()})}_configureSettings(e,t){this._optionsArray=[t.all,t.sphere,t.necklace];const i=e.folder,s=e.property;s.selection=R[0],this._captionIndex=0,this._fBeforeCapture=()=>this._optionsArray[this._captionIndex],s.on_capture_clicked=()=>this.capture(),d.addRadioButtons(i,s.selection,R,(o,a,_)=>{this._captionIndex=_}),i.add(s,"on_capture_clicked").name("Click or press 's'")}capture(e=this._fBeforeCapture){console.log(`screenCapture ${e}`);const t=e();if(!t)throw new Error("No element to capture");setTimeout(()=>{const s=window.getComputedStyle(document.body).getPropertyValue("background-color");L(t,{backgroundColor:s}).then(o=>{const a=document.createElement("a");a.href=o.toDataURL(),a.download="necklace.png",a.click()})},100)}}class fe{constructor(e,t=void 0,i=void 0){this.setSize(e,t,i),window.addEventListener("resize",()=>{this.setSize(e,t,i),this.onResize()})}setSize(e,t,i){const s=Math.min(innerWidth,e.clientWidth),o=Math.min(innerHeight,e.clientHeight);t!==void 0&&(t.aspect=s/o,t.updateProjectionMatrix()),i!==void 0&&(i.setSize(s,o),i.setPixelRatio(window.devicePixelRatio))}onResize(){}}var pe=`uniform int u_mode;
uniform bool u_necklace_absolute;
uniform bool u_necklace_discrete;
uniform bool u_assert_boundary;
uniform bool u_show_single_thiefs_region;
uniform float u_epsilon;
uniform float u_radius;
uniform float u_radius_factor;
uniform vec3 u_scaled_radius;
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

    v_pos = position / u_scaled_radius;

    
    SphereData sd_out = displace_octant(v_pos, u_offset_sphere_octant / u_scaled_radius.x);
    v_sphereData_p = sd_out.p;
    v_sphereData_octant = sd_out.octant;
    v_sphereData_valid = sd_out.valid ? 1.0 : 0.0;
}`,ve=`#define M_PI 3.1415926535897932384626433832795
uniform int u_mode;
uniform bool u_necklace_absolute;
uniform bool u_necklace_discrete;
uniform bool u_assert_boundary;
uniform bool u_show_single_thiefs_region;
uniform float u_epsilon;
uniform float u_radius;
uniform float u_radius_factor;
uniform vec3 u_scaled_radius;
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
vec3 delta(vec2 thief_a, vec2 thief_b) {
    vec2 target = deltaTarget();
    float dist_thief_a = distance(thief_a, target);
    float dist_thief_b = distance(thief_b, target);
    float blue = dist_thief_a < u_epsilon ? 1.0 - dist_thief_a : 0.0;
    return vec3(dist_thief_a, dist_thief_b, blue);
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
 * @returns {vec3} the distribution of the jewels as color
 */
vec3 calculate_stolen_necklace(vec3 cuts) {
    vec2 thief_a = u_necklace_discrete ? calculate_stolen_necklace_discrete(cuts) : calculate_stolen_necklace_continous(cuts);

    thief_a = canonicalThief(thief_a);
    if(u_mode == MODE_STOLEN_NECKLACE && u_necklace_absolute) {
        return vec3(thief_a, 0.0);
    }

    vec2 thief_b = vec2(1.0) - thief_a;

    if(u_mode == MODE_SHADER_LAMP) {
        return ((thief_a - thief_b).xyy * 0.5) + vec3(0.5);
    }
    return delta(thief_a, thief_b);
}

vec3 calculate_segment_distribution(vec3 cuts) {
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
    if(u_necklace_absolute) {
        return vec3(thief_a, 0.0);
    }

    vec2 thief_b = vec2(1.0) - thief_a;
    return delta(thief_a, thief_b);
}

vec3 assertBoundary(vec3 v, float min, float max) {
    if(!u_assert_boundary) {
        return v;
    }
    if(v.x < min || v.y < min || v.z < min) {
        return vec3(1.0, 0.0, 0.0);
    }
    if(v.x > max || v.y > max || v.z > max) {
        return vec3(0.0, 0.0, 1.0);
    }
    return v;
}

vec3 assertPositionBoundary(vec3 v) {
    return assertBoundary(v, -1.0, 1.0);
}

vec3 assertColorBoundary(vec3 v) {
    return assertBoundary(v, 0.0, 1.0);
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
    float scaled_radius = u_radius_factor * u_radius;
    float offset = u_offset_sphere_octant / scaled_radius;
    return (valid != 0.0) && (abs(p.x) >= offset) && (abs(p.y) >= offset) && (abs(p.z) >= offset);

}
bool isValidSphereData() {
    if(u_use_bad_on_sphere_check) {
        return v_sphereData_valid == 1.0;
    }
    return v_sphereData_valid != 0.0;
}

void fragColorWithIntersect(vec3 colorIn) {
    vec3 intersect = u_intersect / u_scaled_radius;

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
            vec3 color = calculate_stolen_necklace(v_pos);
            fragColorWithIntersect(color);
        }
        return;
    } else if(u_mode == MODE_SEGMENTS) {
        if(isActiveRegion()) {
            vec3 color = calculate_segment_distribution(v_pos);
            fragColorWithIntersect(color);
        }
        return;
    } else if(u_mode == MODE_SPACE_COLOR) {
        fragColorWithIntersect(v_pos);
        return;
    } else if(u_mode == MODE_SINUSOID) {
        if(isValidSphereData()) {
            vec3 color = vec3(sin(M_PI * v_pos.x), sin(M_PI * v_pos.y), sin(M_PI * v_pos.z));
            fragColorWithIntersect(color);
        }
        return;
    } else {
        gl_FragColor = vec4(assertPositionBoundary(v_pos), u_alpha);
        return;
    }
}`;class M{constructor(e,t={id:"canvas",container:document.body}){this.model=e,this._id=t.id,this._container=t.container,this._canvas=this.domElement}get container(){return this._container}get canvas(){return this._canvas}get domElement(){if(this._canvas===void 0){const e=this.initializeCanvas();this._id!==void 0&&e.setAttribute("id",this._id),e.classList.add("sphere");const t=this;let i=!1;return this._observer=new MutationObserver(s=>{i&&s.forEach((o,a,_)=>{t.onMutation(o)})}),this._observer.observe(this._container,{attributes:!0,attributeFilter:["class"]}),this._container.appendChild(e),i=!0,e}return this._canvas}set visible(e){this._canvas!==void 0&&(this._canvas.style.visibility=e?"visible":"hidden")}}const v=F();v.visible=r=>{v.domElement.style.visibility=r?"visible":"hidden"};v.showPanel(0);document.body.appendChild(v.dom);v.visible(n.view.stats_monitor_visible);const A={x:0,y:0};class Ee extends M{constructor(e,t={id:"sphere",container:document.body}){super(e,t);this.onThemeChange()}initializeCanvas(){this._lastInterSect=new y(-1,20,-30),this._scene=new j,this._raycaster=new W,this._camera=new V(75,this.container.clientWidth/this.container.clientHeight,.1,1e3),this._renderer=new K({antialias:!0});const e=this._renderer.domElement;return this.container.appendChild(e),this._resizer=new fe(this.container,this._camera,this._renderer),this._sphere=new k(this.createSphereGeometry(),this.createSphereMaterial()),this._sphere.visible=n.view.faces_visible,this._sphereMesh=new k(this.createSphereGeometry(),new $({wireframe:!0,side:O,transparent:!0})),this._sphereMesh.visible=n.view.mesh_visible,this._axesHelper=new Y(20),this._axesHelper.visible=n.view.axes_visible,this._group=new J,this._group.add(this._sphere,this._sphereMesh,this._axesHelper),this._scene.add(this._group),this._orbitControls=new X(this._camera,this._renderer.domElement),this._camera.position.z=50,this._orbitControls.update(),this.container.addEventListener(c.CREATE_SPHERE.toString(),()=>this.createSphere()),this.container.addEventListener("mousemove",t=>{A.x=t.clientX/this.container.clientWidth*2-1,A.y=-(t.clientY/this.container.clientHeight)*2+1}),this.container.addEventListener(c.UPDATE_SPHERE_MATERIAL.toString(),()=>this.updateSphereMaterial()),this.container.addEventListener(c.UPDATE_VISIBLE.toString(),()=>this.updateVisibility()),this.container.addEventListener(c.THEME_CHANGED.toString(),()=>this.updateVisibility()),e}onMutation(e){const i=window.getComputedStyle(this.container).getPropertyValue("background-color");this._scene.background=new Q(i)}get captureElement(){return this._renderer.domElement}render(){const e=()=>{this._render(),requestAnimationFrame(e)};e()}_render(){if(v.begin(),this._orbitControls.update(),this._renderer.render(this._scene,this._camera),this._sphere.visible||this._sphereMesh.visible){this._raycaster.setFromCamera(A,this._camera);const e=this._raycaster.intersectObject(this._sphere),t=this._sphere.material.uniforms;if(e.length>0&&!n.animation.run){const i=e[0].point.clone();t.u_intersect.value=i,this._setIntersect(i)}else t.u_intersect.value=new y,this.domElement.style.cursor="auto"}n.animation.trigger_reset?(n.animation.trigger_reset=!1,this._group.rotation.x=0,this._group.rotation.y=0,this._group.rotation.z=0):n.animation.run&&(this._group.rotation.x+=n.animation.rotation_x,this._group.rotation.y+=n.animation.rotation_y,this._group.rotation.z+=n.animation.rotation_z),v.end()}_setIntersect(e){if(e.distanceToSquared(this._lastInterSect)>le){this.domElement.style.cursor="none",this._lastInterSect=e;const t=n.sphere.radius||1;this.model.applyCut(e.clone().divideScalar(t))}}onThemeChange(){const e=n.view.dark_theme?"light":"dark",t=n.view.dark_theme?"dark":"light";this.container.classList.contains(e)&&this.container.classList.remove(e),this.container.classList.add(t)}createSphere(){this._sphere.geometry.dispose(),this._sphereMesh.geometry.dispose();const e=this.createSphereGeometry();this._sphere.geometry=e,this._sphereMesh.geometry=e,this.updateSphereMaterial()}createSphereGeometry(){const e=n.sphere.segments;return new Z(n.sphere.radius,e,e/2)}createSphereMaterial(){return new ee({vertexShader:pe,fragmentShader:ve,side:O,transparent:!0,defines:this.defines,uniforms:this.uniforms})}get defines(){return{MAX_JEWELS:Math.max(1,this.model.necklace.length),MODE_STOLEN_NECKLACE:p.STOLEN_NECKLACE,MODE_SEGMENTS:p.SEGMENTS,MODE_SHADER_LAMP:p.SHADER_LAMP,MODE_SPACE_COLOR:p.SPACE_COLOR,MODE_SINUSOID:p.SINUSOID,MODE_ASSERT_POSITION_BOUNDARY:p.ASSERT_POSITION_BOUNDARY,NECKLACE_ABSOLUTE:b.ABSOLUTE,NECKLACE_DELTA:b.DELTA}}get uniforms(){const e=n.sphere.radius_factor*n.sphere.radius;return n.sphere.offset_octant/e,{u_mode:{type:"i",value:n.int_mode},u_necklace_absolute:{type:"b",value:n.necklace.absolute_distribution},u_necklace_discrete:{type:"b",value:n.necklace.discrete},u_assert_boundary:{type:"b",value:n.view.assert_boundary},u_input:{type:"i",value:this.model.necklace},u_count_0:{type:"i",value:this.model.count_0},u_count_1:{type:"i",value:this.model.count_1},u_radius:{type:"f",value:n.sphere.radius},u_offset_sphere_octant:{type:"f",value:n.sphere.offset_octant},u_use_bad_on_sphere_check:{type:"b",value:n.sphere.use_bad_on_sphere_check},u_radius_factor:{type:"f",value:n.sphere.radius_factor},u_scaled_radius:{type:"v3",value:new y(e,e,e)},u_scale_color:{type:"v3",value:new y(n.color.scale_red,n.color.scale_green,n.color.scale_blue)},u_epsilon:{type:"f",value:n.necklace.epsilon},u_show_single_thiefs_region:{type:"b",value:n.view.show_single_thiefs_region},u_alpha:{type:"f",value:n.color.alpha},u_time:{type:"f",value:1},u_resolution:{type:"v2",value:new E(this._renderer.domElement.width,this._renderer.domElement.height)},u_intersect:{type:"v3",value:new y(0,0,0)}}}updateSphereMaterial(){this._sphere!==void 0&&this._sphere.material.dispose(),this._sphere.material=this.createSphereMaterial(),this._sphereMesh.material.transparent=n.color.alpha!=1,d.dispatchEvent(c.MODEL_CHANGED)}updateVisibility(){this._axesHelper.visible=n.view.axes_visible,this._sphereMesh.visible=n.view.mesh_visible,this._sphere.visible=n.view.faces_visible,v.visible(n.view.stats_monitor_visible),d.dispatchEvent(c.MODEL_CHANGED)}}const me="--jewel-a-color",ye="--jewel-b-color",P="--thief-a-color",N="--thief-b-color",ge=`${P}-light`,Se=`${N}-light`,be="--between-jewels-color",Ce="--gauge-color",we="red",Ae="green",Te="rgb(0,191,255)",m=10,D=20,Le=5,ke=7;class Oe extends M{constructor(e,t={id:"necklace",container:document.body}){super(e,t);window.addEventListener("resize",()=>{const i=Math.min(innerWidth,this.container.clientWidth),s=Math.min(innerHeight,this.container.clientHeight);this.canvas.width=i,this.canvas.height=s,this.render()})}onMutation(e){this.render()}initializeCanvas(){const e=document.createElement("canvas");return e.setAttribute("id","necklace"),e.classList.add("necklace"),this.container.addEventListener(c.NECKLACE_CUT.toString(),()=>this.render()),this.container.addEventListener(c.MODEL_CHANGED.toString(),()=>this.render()),e}get size(){return this.model.size}get scaledKnife(){if(this.model.cuts===void 0)return this.model.cuts.clone().multiplyScalar(this.size)}get width(){return this.canvas.width}get height(){return this.canvas.height}get jewelWidth(){return this.width/this.size}get thief_a_color(){return getComputedStyle(document.body).getPropertyValue(P)}get thief_b_color(){return getComputedStyle(document.body).getPropertyValue(N)}get thief_a_color_light(){return getComputedStyle(document.body).getPropertyValue(ge)}get thief_b_color_light(){return getComputedStyle(document.body).getPropertyValue(Se)}get between_jewels_color(){return getComputedStyle(document.body).getPropertyValue(be)}get jewel_a_color(){return getComputedStyle(document.body).getPropertyValue(me)}get jewel_b_color(){return getComputedStyle(document.body).getPropertyValue(ye)}get gauge_color(){return getComputedStyle(document.body).getPropertyValue(Ce)}get captureElement(){return this.domElement}get showNecklace(){return n.int_mode===p.STOLEN_NECKLACE&&n.view.necklace_visible}get showGauge(){return(n.int_mode===p.STOLEN_NECKLACE||n.int_mode===p.SEGMENTS)&&n.view.gauge_visible}render(){this.canvas!==void 0&&this._render()}_render(){this.canvas.width=this.canvas.clientWidth,this.canvas.height=this.canvas.clientHeight;const e=this.canvas.getContext("2d"),t=0,i=0;let s=t;const o=this.model.cuts;if(this.showNecklace&&(this.drawNecklace(e,s,i,o),o!==void 0&&this.drawSegments(e,o)),this.model.thief_a!==void 0&&this.showGauge){const a=this.model.canonicalThief(this.model.thief_a),_=this.model.canonicalThief(this.model.thief_b);this.drawGauge(e,50,a,_)}n.text&&(e.font="12px",e.fillStyle="rgb(255,255,255)",e.fillText(n.text,0,150))}drawNecklace(e,t,i,s){const o=2,a=m+D;s||(e.fillStyle=this.between_jewels_color,e.fillRect(t,i,this.width,m));const _=this.jewel_a_color,h=this.jewel_b_color;let u=t;for(let f=0;f<this.size;f++){const l=this.model.necklace[Math.floor(f)];e.fillStyle=l===0?_:h,e.fillRect(u,i+this.yOffset(s,f/this.size,a),this.jewelWidth-o,m),u+=this.jewelWidth}}drawSegments(e,t){let i=0;e.save(),e.lineWidth=this.showNecklace?1:m,e.strokeStyle=we,i=this.drawSegment(e,i,t.x),e.strokeStyle=Ae,i=this.drawSegment(e,i,t.y),e.strokeStyle=Te,i=this.drawSegment(e,i,t.z),e.restore()}drawSegment(e,t,i){e.beginPath();const s=this.yOffsetSegment(i)+e.lineWidth;e.moveTo(t,s);const o=t+Math.ceil(i*i*this.width);return e.lineTo(o,s),e.stroke(),o}yOffsetSegment(e){const t=this.showNecklace?Le:D+m;return(e<0?t:0)+(this.showNecklace?m+ke:0)}drawGauge(e,t,i,s){const o=this.height-t,a=3,h=o-2;if(h>=10){const u=Math.SQRT1_2*h,f=this.width/2-h,l=new E(f+h,t+h),T=this.thief_a_color,g=this.thief_b_color,G=this.gauge_color;e.beginPath(),e.fillStyle=this.thief_a_color_light,e.moveTo(l.x,l.y),e.arc(l.x,l.y,h,-Math.PI,-Math.PI/2),e.lineTo(l.x,l.y),e.closePath(),e.fill(),e.beginPath(),e.fillStyle=this.thief_b_color_light,e.moveTo(l.x,l.y),e.arc(l.x,l.y,h,-Math.PI/2,0),e.lineTo(l.x,l.y),e.closePath(),e.fill(),e.beginPath(),e.lineWidth=1,e.setLineDash([1,1]),e.arc(l.x,l.y,h/2,0,-Math.PI,!0),e.stroke(),e.beginPath(),e.strokeStyle=T,e.setLineDash([]),e.moveTo(l.x,l.y),e.lineTo(l.x-i.x*u,l.y-i.y*u),e.stroke(),e.beginPath(),e.strokeStyle=g,e.moveTo(l.x,l.y),e.lineTo(l.x+s.x*u,l.y-s.y*u),e.stroke();const S=1-Math.SQRT1_2*i.distanceTo(s),B=255+(0-255)*S,U=0+(255-0)*S;e.beginPath(),e.lineWidth=a,e.strokeStyle=`rgb(${B},${U}, 0)`,e.arc(l.x,l.y,h,-Math.PI,-Math.PI*(1-S),!1),e.stroke(),e.beginPath(),e.lineWidth=a,e.strokeStyle=G,e.arc(l.x,l.y,h,-Math.PI*(1-S),0,!1),e.stroke()}}yOffset(e,t,i){if(e===void 0)return 0;const s=e.x*e.x,o=e.y*e.y;return t<s?e.x<0?i:0:t<s+o?e.y<0?i:0:e.z<0?i:0}}function x(r){return r%1}class Ie{constructor(){this._necklace=void 0,this._cnt=void 0,this._cuts=void 0,this._thief=void 0,this.initializeStatus(0),window.addEventListener(c.SET_NECKLACE_CONFIGURATION_BY_NUMBER,()=>this.necklaceFromInt(n.necklace.configuration,n.necklace.number_of_jewels)),window.addEventListener(c.SET_NECKLACE_CONFIGURATION_BY_STRING,()=>this.necklaceFromStr(n.necklace.string))}get necklace(){return[...this._necklace]}necklaceFromInt(e,t){this.initializeStatus(t);const i=e.toString(2);if(e!=0){let s=0;for(const o of i)this._necklace[s++]=o==="0"?0:1}for(const s of this._necklace)s===0?this._cnt.x+=1:this._cnt.y+=1;d.dispatchEvent(c.UPDATE_SPHERE_MATERIAL)}necklaceFromStr(e){this.initializeStatus(1),this._necklace=[];for(let t=0;t<e.length;t++){const i=e.charCodeAt(t),s=i.toString(2);if(i!=0)for(const o of s)this._necklace.push(o==="0"?0:1)}for(const t of this._necklace)t===0?this._cnt.x+=1:this._cnt.y+=1;console.log(`necklaceFromString: ${e}: ${this._necklace} ${this._cnt.x},${this._cnt.y}`),d.dispatchEvent(c.UPDATE_SPHERE_MATERIAL)}get size(){if(this.cnt.x<0||this.cnt.y<0)throw Error("Necklace not initialized");return this.cnt.x+this.cnt.y}applyCut(e){this.cuts=e,e!==void 0&&(this.thief_a=n.necklace.discrete?this.applyCutDiscrete(e):this.applyCutContinous(e)),d.dispatchEvent(c.NECKLACE_CUT)}applyCutDiscrete(e){if(this.cuts=e,e){const t=this.size,i=e.x*e.x*t,s=e.y*e.y*t,o=[0,0];for(let a=0;a<t;a++){const _=this.necklace[a],h=a;h<i?e.x>0&&o[_]++:h<i+s?e.y>0&&o[_]++:e.z>0&&o[_]++}return new E(o[0],o[1])}}applyCutContinous(e){if(this.cuts=e,e){const t=this.size,i=e.x*e.x*t,s=e.y*e.y*t,o=[0,0];for(let a=0;a<t;a++){const _=this.necklace[a],h=a+1;let u=0,f=0,l=0;h<=Math.ceil(i)?h<=Math.floor(i)?u=1:(u=x(i),h>i+s?(f=s,l=1-u-f):f=1-u):h<=Math.ceil(i+s)?h<=Math.floor(i+s)?f=1:(f=x(i+s),l=1-f):l=1,u!==0&&e.x>0&&(o[_]+=u),f!==0&&e.y>0&&(o[_]+=f),l!==0&&e.z>0&&(o[_]+=l)}return new E(o[0],o[1])}}initializeStatus(e){this._necklace=Array(e).fill(0),this._cnt=new E(0,0),this._cuts=void 0,this._thief=void 0}get cnt(){return this._cnt.clone()}set cnt(e){this._cnt=e.clone()}get count_0(){return this._cnt.x}get count_1(){return this._cnt.y}get cuts(){return this._cuts?this._cuts.clone():void 0}set cuts(e){e!==void 0?(this.assertSphere(e),this._cuts=e.clone()):this._cuts=void 0}assertSphere(e,t=1){if(e.length()-t>w)throw new Error(`Input vector ${e} not close enough to sphere with radius ${t}, dist to orgin: ${e.length()}`)}get thief_a(){return this._thief!==void 0?this._thief.clone():void 0}set thief_a(e){this._thief=e.clone()}get thief_b(){return this._thief!==void 0?this.cnt.sub(this._thief):void 0}canonicalThief(e){const t=this._cnt.x!==0?e.x/this._cnt.x:0,i=this._cnt.y!==0?e.y/this._cnt.y:0;return new E(t,i)}}const Re=new d,z=new Ie,H=new Ee(z),Me=new Oe(z);document.body.addEventListener(c.THEME_CHANGED.toString(),Pe);function Pe(){const r=n.view.dark_theme?"light":"dark",e=n.view.dark_theme?"dark":"light";document.body.classList.contains(r)&&document.body.classList.remove(r),document.body.classList.add(e)}d.dispatchEvent(c.SET_NECKLACE_CONFIGURATION_BY_NUMBER);H.render();new ue({folder:Re.captureFolder,property:n.capture},{all:document.body,sphere:H.captureElement,necklace:Me.captureElement});
