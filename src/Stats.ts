import Stats from "three/addons/libs/stats.module.js";
import { SETTINGS } from "./Settings";

// The little statistics box at the upper left corner
const VISIBLE_ATTRIBUTE = "visible"
const stats = new Stats();
stats[VISIBLE_ATTRIBUTE] = (visible: boolean) => {
    stats.domElement.style.visibility = visible ? "visible" : "hidden";
};
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);
stats[VISIBLE_ATTRIBUTE](SETTINGS.view.stats_monitor_visible);

export { stats };
