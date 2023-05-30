/** 
 * This class listens to changes on <style class> attribute. 
 */
class ClassMutationObserver {
    constructor(element: HTMLElement, callback: (value: MutationRecord, index: number|undefined) => void) {
        let initialized = false;
        const observer = new MutationObserver((mutations) => {
            if (initialized) {
                mutations.forEach((value: MutationRecord, index) => callback(value, index));
            }
        });
        observer.observe(element, {
            attributes: true,
            attributeFilter: ["class"],
        });
        initialized = true;
    }

}

export { ClassMutationObserver };