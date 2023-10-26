# 📌 5주차 프로젝트[Project1]

## 필수 프로젝트

- 프로젝트 기한
  - 프로젝트 수행 기간 : 2023년 10월 17일(화) ~ 2023년 10월 26일(목)
  - 멘티 코드 리뷰 기간 : 2023년 10월 27일(금) ~ 2023년 10월 30일(월)
  - 멘토 코드 리뷰 기간 : 2023년 10월 27일(금) ~ 2023년 11월 2일(목)
  - 코드 리뷰 반영 기간 : 2023년 11월 3일(금) ~ 2023년 11월 6일(월)
- 내용
  - [Day 21] 노션 클로닝 요구사항을 확인해 주세요.

## 고민한 부분들

### 리렌더링 vs localStorage.getItem

화면을 새로 그리는 것보다는 local storage에서 값을 받아 오는 것이 경제적일 것이라 판단했습니다. 때문에 화면이 렌더링 될 때 한 번만 저장소에서 값을 받아오고, 이후 onToggle 시 값을 업데이트 하기만 할 뿐 새로 데이터를 내려받고 있지는 않습니다. 어차피 현재 list-item이 folded인지, unfolded인지는 클래스로 관리하면 되기 때문이라고 생각했습니다. 하지만 현재 상태와 저장소에서 초기에 내려 받은 데이터와 동기화가 되어 있지 않다는 점에서 예상치 못한 문제가 발생할 수 있지 않을까 하는 생각이 들어 질문드립니다. 이런 식의 동작 흐름은 위험한 방식일까요?

### documentList의 상태 변경

documentList에서 add-page 버튼을 클릭했을 때 새 document를 추가하고 새로 전체 document를 패치했습니다. 그리고 이 동작은 MainPage에서 documentList에 props로 넘겨주고 있습니다. 이 때 add-page를 클릭 시 document를 리패치 하는 것이 아니라, [...this.documentList.state, newData]와 같은 방식으로 상태만 변경해주는 것은 위험한 코드일까요? MainPage에서 documentList의 상태를 가져온 뒤 append 하여 다시 setState 시켜주는 것이라서 위험할 수 있겠다고 생각이 들었습니다. 하지만 이렇게 했을 경우 리패치가 발생하지 않아서 화면이 깜빡이지 않고, 네트워크 통신을 줄일 수 있어 경제적이라고 생각했습니다.

### 에러 처리

api 함수를 추상화하는 단계에서 try-catch 문을 사용한 것이 아니라, 실제 api를 호출하는 단계에서 try-catch를 사용했습니다. 이 경우 실패에 따른 핸들링을 좀 더 상황에 맞게 커스텀할 수 있다고 느꼈기 때문입니다. 이런 방식에 대한 아쉬운 점이나 문제가 될 수 있는 점이 궁금합니다. 이를 통해 에러 핸들링을 좀 더 적절하게 하고 개선하고 싶습니다!
