import { useState } from "react";

function App() {
    // state라고 하는 특수 변수를 만들 때 useState()
    // const [앞으로 사용할 변수명, 그 변수의 값을 변경할 수 잇는 함수명] = useState(초기값)
    const [count, setCount] = useState(100);

    return (
        <div>
            <h1>counter : {count}</h1>
            {/*
                    태그의 속성을 적어줄 때 그 안에 Javascript를 작성해야 한다면,
                    "" 로 써주는게 아니라, {} 로 써줘야 함
                    ==> 컨포넌트의 return문 안에 작성하는 {} 는
                        이 안에 javascript를 쓰겠다는 의미
            */}
            <button
                onClick={() => {
                    // count라고 하는 변수에 지금 현재 count의 값 -1개 저장되면 됨
                    // 일반 변수라면, count = count - 1;
                    setCount(count - 1);
                }}>
                -
            </button>
            <button
                onClick={() => {
                    setCount(0);
                }}>
                Reset
            </button>
            <button
                onClick={() => {
                    setCount(count + 1);
                }}>
                +
            </button>
        </div>
    );
}

export default App;
