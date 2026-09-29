import Stats from "three/addons/libs/stats.module.js";
import { SETTINGS } from "../settings/settingsValues";

// The little statistics box at the upper left corner
const stats = new Stats();
/** Shows or hides the statistics box (Advanced › Frame rate monitor). */
function showStats(visible: boolean): void {
    stats.dom.style.visibility = visible ? "visible" : "hidden";
}
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);
showStats(SETTINGS.view.stats_monitor_visible);

export { showStats, stats };
