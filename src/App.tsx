import { useEffect, useState } from 'react'
import './App.css'
import { Client } from '@stomp/stompjs';
import ChartView from './Components/ChartView';

const stompClient = new Client({brokerURL: "ws://localhost:8080/gs-guide-websocket"})

interface Trader {
  name: String
}

function App() {
  const [connected, setConnected] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [trader, setTrader] = useState<Trader>()

  stompClient.onConnect = stompConnect;
  stompClient.onDisconnect = stompDisconnect;
  stompClient.onStompError = stompDisconnect;
  stompClient.onWebSocketClose = stompDisconnect;
  stompClient.onWebSocketError = stompDisconnect;
  
  useEffect(() => {
    stompClient.activate();
  }, [])

  function stompConnect(){
    setConnected(true);
    stompClient.subscribe('/topic/greetings', function(greeting){
      setGreeting(JSON.parse(greeting.body).content);
    })
    stompClient.subscribe('/topic/traders', function(msg){
      alert(JSON.parse(msg.body))
      setTrader(JSON.parse(msg.body).username)
    })
  }

  function stompDisconnect(){
    setConnected(false);
  }

  function sendName(){
    stompClient.publish({destination: "/hello",body:  JSON.stringify({'name': 'josh'})})
  }

  function requestTrader(){
    alert("clicked")
    stompClient.publish({destination: "/traders", body: JSON.stringify({'name': 'josh'})})
  }

  return (
    <div className="App">
      {connected ? <h3>connected</h3> : <h3>disconnected</h3>}
      <button onClick={sendName}>
        send name
      </button>
      <br/>
      {greeting}
      <br/>
      <button onClick={requestTrader}>
        send name
      </button>
      <br/>
      Trader: {trader?.name}

      <ChartView/>
    </div>
  )
}

export default App
