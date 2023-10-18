export default function DocumentHeader({ $target, initialState }) {
  //title, updatedAt필요
  //title을 보여주는 컴포넌트가 중복된다 => 중복되는 기능 모아서 하나의 컴포넌트로 추상화 필요
  this.state = initialState;
  const $documentHeader = document.createElement("header");
}
