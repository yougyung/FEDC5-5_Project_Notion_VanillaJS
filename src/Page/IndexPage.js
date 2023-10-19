export default function IndexPage({ target }) {
  const TestElement = document.createElement('h1')
  TestElement.textContent = 'IndexPage'

  target.appendChild(TestElement)
}
