import permission from './permission'
import focus from './focus'
import resize from './resize'
// import debounce from "./debounce";
// import throttle from "./throttle";
// import scrollLoad from "./scrollLoad";
// import lazyLoad from "./lazyLoad";
// import regRule from "./regRule";
// import draggable from "./draggable";
// import waterMarker from "./waterMarker";

// 自定义指令
const directives:any = {
    permission,
    focus,
    resize
    // debounce,
    // throttle,
    // scrollLoad,
    // lazyLoad,
    // regRule,
    // draggable,
    // waterMarker
}

export default {
    install(app:any) {
        Object.keys(directives).forEach((key) => {
            app.directive(key, directives[key])
        })
    },
}