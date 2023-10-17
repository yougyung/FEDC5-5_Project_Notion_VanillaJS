export const createNewElement = (tag, properties = [], text = "") => {
    const $element = document.createElement(tag);

    if(text) {
        $element.innerText = text;
    }

    properties.forEach(({ property, value }) => {
        $element[property] = value;
    });

    return $element;
}
