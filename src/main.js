import App from "./App.js"

const $app = document.querySelector('.app')

const initialState = {
    documents: [],
    selectedDocument: {}
}

new App({
    $target: $app,
    initialState
})