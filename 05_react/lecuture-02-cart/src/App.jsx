import { useState } from "react";

function App() {
    const [name, setName] = useState(""); // input 관리용 state
    const [cart, setCart] = useState([]); // 장바구니 관리용 state

    const cnChange = e => {
        setName(e.target.value);
        };

    const onAdd = event => {
        event.preventDefault();

        if (name === "") return;
        setCart([...cart, { name: name, quantity: 1 }]);
        setName("");
    };

    const onUpdateCount = (index, number) => {
            // 1가지 기능을 하는 함수를 만드는건데,
            // 1을 더하는 함수가 아니라, '수량을 변경하는' 함수를 만든 것
            // 얼마를 바꿀 것인가는 함수를 실행할 때 매개변수를 통해 제어함

            // cart라고 하는 것의 안 쪽에 존재하는 요소를 수정
            // 일반 변수라면, cart[index].quantity++
            // 계산은 위에서
            const newCart = [...cart];
            const nextCount = newCart[index].quantity + number;
            if (nextCount > 0) {
                // 저장은 if문 안에서
                newCart[index].quantity = nextCount;
                setCart(newCart);
            }
        };

    return (
        <div>
            <h2>🛒 Simple Shop</h2>
            <fieldset>
                <legend>상품 추가</legend>
                <form
                    onSubmit={onAdd}>
                    <input
                        placeholder={"상품명을 입력하세요"}
                        onChange={onChange}
                        value={name}
                    />
                    <button type={"submit"}>카트에 담기</button>
                </form>
            </fieldset>
            <br />
            {/*
                react에서 inline 방식으로 스타일을 적용하는 방법은
                style={} 속성을 동일하게 이용,
                단! 이 안에 들어가는 값은 "객체"를 작성함
                css : backgroundColor
            */}
            <table border={1} cellPadding={10} cellSpacing={0} style={{ width: "100%" }}>
                <thead>
                    <tr style={{ backgroundColor: "#f2f2f2" }}>
                        <th>상품명</th>
                        <th>수량 제어</th>
                        <th>관리</th>
                    </tr>
                </thead>
                <tbody>
                {cart.map((value, index) => {
                    return (
                    <tr key={index}>
                        <td>{value.name}</td>
                        <td>
                            <button onClick={() => { onUpdateCount(index, -1)}>-</button>
                            {value.quantity}
                            <button onClick={() => onUpdateCount(index, +1)}>+</button>
                        </td>
                        <td>
                            <button onClick={() => {
                                setCart(
                                        cart.filter((v, i) => {
                                            return i !== index;
                                        }),
                                    );
                                }}>
                                삭제
                            </button>
                        </td>
                    </tr>
                    );
                })}

                </tbody>
            </table>
            <h3>총 품목 : {cart.length}개 / 총 수량 : 0개</h3>
        </div>
    );
};

export default App;
