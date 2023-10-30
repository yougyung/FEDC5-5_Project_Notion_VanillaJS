import { parseTag } from "./Parser.js";
import { renderIntoHTML } from "./Renderer.js";

// tagged tempalte literal로 호출하게
/**
 * @returns {HTMLElement}
 */
export const $ = (strings, ...values) => renderIntoHTML(parseTag(strings, ...values));
