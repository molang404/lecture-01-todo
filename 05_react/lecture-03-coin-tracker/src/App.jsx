import { useEffect, useState } from "react";

function App() {
    // 외부에서 대이터를 받아다가 화면을 출력해주는 프로그램
    // 초기 랜더링 => 데이터를 받아오고 => 데이터로 화면을 갱신

    // state, 우리는 이 화면을 갱신할 때 어떤 state가 필요할까?
    const [loading, setLoading] = useState(true);   // 어떠한 목적의 state : loading 관리용 state
                                                            // 데이터를 불러오는 중에는 true, 데이터가 도착되면 false
    const [coins,setCoins] =useState([]);    // 어떠한 목적의 state : 외부에서 받아오는 데이터를 저장할 목적의 state

    useEffect(() => {
        // 외부에서 데이터를 받아와서 coins에 저장하는 일
        // fetch(함수, [의존성]) : 외부에서 데이터를 받아오는 비동기 함수, 비동기 함수는 .then()과 .catch()로 처리해야 함
        // .then((결과) => {}) : fetch()가 완료되면 실행되는 함수를 적어줘야 함     => then()은 메소드 체인으로 여러 개를 적어줄 수 있음
        // .catch(함수) : fetch()가 실패하면 실행되는 함수를 적어줘야 함            => catch()는 한 번만 적어줄 수 있음(보통)
        fetch("https://api.coinlore.net/api/tickers/")
            .then((response) => { return response.json() })    // 성공하면, 그 데이터를 json으로 가공
            .then((json) => {
                setCoins(json.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log("데이터 로드 실패 :", error);
                setLoading(false);
            })

    }, []);    // 최초 렌더링이 끝난 이후 1회 무조건 실행됨

    return (
        <div>
              <h1>The Coins! ({coins.length})</h1>
              <hr />
              {loading ? <strong>데이터를 불러오는 중입니다...</strong> : (<div>
                  <select>
                      {coins.map((value, index) => {
                          return <option key={index}>{value.name} ({value.symbol})</option>
                      })}
                  </select>
              </div>) }
        </div>
    );
}

export default App;