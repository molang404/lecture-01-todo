import { useState } from "react";

function App() {
    // 사용자가 입력할 input의 값을 저장하기 위한 state
    // input 태그의 입력되는 값은 무조건 string
    const [todo, setTodo] = useState("");
    const [list, setList] = useState([]);

    const onChange = event => {
        // 저 todo라는 state에 input에 입력 받을 값을 저장 시켜야 함
        // event라고 하는 Javascript 엔진이 분석한 사건 내용을 가지고 보니
        // event.target.value 라는 값에 input에 입력된 값이 들어 있더라
        setTodo(event.target.value);
    };
    const onSubmit = event => {
        // chrome 같은 웹 브라우저는 기본적으로 onSubmit이 내장되어있는 기능이 이미 존재함
        // 무슨 기능?, input의 내용들을 전송하고 새로고침하는 기능
        // 그래서 이 기능을 무효화 시킬 필요가 있음 -> event.preventDefault();
        event.preventDefault();

        if (todo === "") {
            return;
        }

        // 1. todo에 저장되어 있는 값을 list로 옮기고
        // list = [...list, "ㄱㄴㄷ"]    => spread 문법(...) : 배열이나 객체의 내부 요소를 나열시키는 문법
        // list = [ ...["123"], "ㄱㄴㄷ"]
        // list = [ "123", "ㄱㄴㄷ"]
        setList([...list, todo]);
        // 2. todo의 값을 삭제 하고
        setTodo("");
        // 3. input에 입력된 값도 삭제해야함  -> input이라고 하는 태그의 value 속성을 비워줘야 되는 일
    };

    const deleteTodo = (index) => {
        // 우리가 삭제해야 되는 것은 index로 접근할 수 있음. 훨씬 위에 있는 list에서
        // 우리가 삭제하여는 list의 인덱스 번호 : index. filter를 통해 걸러내려는 인덱스 번호: 1;
        setList(
            list.filter((v, i) => {
                return i !== index;
            }),
        );
    };

    return (
        <div>
            <h1>My todo ({list.length})</h1>
            {/*
                form 태그 내부의 input에서 엔터를 치거나, button (정확히는 button의 type이 "submit"인 button) 을 누르면,
                form의 onSubmit 속성을 실행시킴
            */}
            <form onSubmit={onSubmit}>
                {/*
                    input에 입력이 될 때마다 실행하는 속성 : onChange
                    입력이 일어난 "사건 (이벤트)"이고,
                    그에 대해서 함수를 실행할 때, 매개변수 자리에 그 사건을
                    Javascript 엔진이 분석해서 객체로 전달해줌
                */}
                <input
                    placeholder={"Write your to do..."}
                    onChange={onChange}
                    value={todo}
                    // 1. input에서 엔터를 치면, onSubmit이 발동
                    // 2. onSubmit 안에 있는 setTodo를 실행시켜서 todo의 값을 ""(빈 스트링)으로 바꾸고
                    // 3. 리액트 엔진이 todo가 사용되고 있는 input의 value 값을 다시 그리고
                    // 4. input의 value가 ""인 상태로 화면에 출력됨
                />
                <button type={"submit"}>Add To Do</button>
            </form>
            <hr />
            <ul>
                {/*
                    list 라고 하는 array가 갖고 있는 요소의 갯수 만큼
                    <li> 태그가 찍히면서, 그 안에 요소(string)의 내용을 출력해주면 됨 => .map()메소드
                    .map(함수) : 요소를 순회하면서 함수 return 안의 내용을 반환함
                    .map((value, index, array) => {})
                    .map 메소드를 사용한다면, 반환되는 return에 나오는 최상단 태그에 key라는 이름의 속성을 부여하고
                                           그 값은 이 map이 반환하는 태그들 사이에서 겹치지 않는 유일값을 넣어줘야 함
                */}
                {list.map((value, index) => {
                    return (
                        <li key={index}>
                            {value}{" "}
                            <button
                                onClick={() => deleteTodo(index)}>
                                ❌
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default App;
