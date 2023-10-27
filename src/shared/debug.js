// 브라우저에서만 없음
if (window) {
    window.process = {};
    window.process.env = {};
    window.process.env.DEBUG = true;
    window.process.env.DEBUG_ENABLED = {};
    console.log("monkey patched");
}

export const enableDebugModule = (moduleName) => {
    window.process.env.DEBUG_ENABLED[moduleName] = true;
};

export const createDebug =
    (moduleName) =>
    (...args) => {
        if (!process.env.DEBUG) {
            return;
        }
        if (!process.env.DEBUG_ENABLED[moduleName]) {
            return;
        }
        console.log(`[${moduleName}]`, ...args);
    };
