export const handleRouteChange = () => {
    const path = location.pathname;
    for (const [route, handler] of Object.entries(routes)) {
        const reg = new RegExp(route);
        console.log(reg, handler);
        if (reg.test(path)) {
            handler();
            return null;
        }
    }
};

export const homeHandler = () => {
    const pathname = location.pathname;
    console.log(pathname);
};

export const documentIdHandler = () => {
    const pathname = location.pathname;
    console.log(pathname);
};

const routes = {
    "/": homeHandler,
    "/document/\\w+": documentIdHandler,
};
