import { useEffect, useState } from 'react'
import './App.css'
import { Client } from '@stomp/stompjs';
import ChartView from './Components/ChartView';
import ChartPage from './Components/ChartPage'

//const stompClient = new Client({brokerURL: "ws://localhost:8080/gs-guide-websocket"})

interface Trader {
  name: String
}

function App() {
  const [greeting, setGreeting] = useState("");
  const [trader, setTrader] = useState<Trader>()

  return (
    <div className="App" id="background">
      <br/>
      Trader: {trader?.name}
      <ChartPage />
    </div>
  )
}

export default App
