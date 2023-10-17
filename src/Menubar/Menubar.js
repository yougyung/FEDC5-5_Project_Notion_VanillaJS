import DocListBox from './DocList.js'

export default function Menubar({ target, state }) {
  const menubarElement = document.createElement('article')
  target.appendChild(menubarElement)

  this.state = state

  this.render = () => {
    new DocListBox({
      target: menubarElement,
      state: this.state
    })
  }

  this.render()
}
