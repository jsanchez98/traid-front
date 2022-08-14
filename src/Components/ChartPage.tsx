import { useEffect, useState } from "react";
import ChartView from "./ChartView";
import TickerSelector from "./TickerSelector";

interface Datapoint {
    c: number,
    h:number,
    l:number,
    n:number,
    o:number,
    t:number,  
    v:number,
    vw:number,
}


function ChartPage(){
    const [ticker, setTicker] = useState<String>("AAPL");
    const [datapoints, setDatapoints] = useState<Datapoint[]>();
    const [timeseries, setTimeseries] = useState<[number, number][]>([]);
    const [allTickers, setAllTickers] = useState();

    useEffect(() => {
        fetchDatapoints();
        fetchTickers();
    }, [])

    function fetchDatapoints(){
        fetch("http://localhost:8080/"+ticker+"/timeseries", {
            method: "GET"
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                setDatapoints(data);
                setTimeseries(reshapeDatapoints(data));
            });
    }

    function fetchTickers(){
        fetch("http://localhost:8080/allTickers", {
            method: "GET"
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            setAllTickers(data)
        })
    }

    function reshapeDatapoints(timeseries: Datapoint[]): [number, number][]{
        return timeseries.map(point => {
            return [point.t, point.c]
        })
    }

    return(
        <div>
            <br/>
            { timeseries.length == 0 ? <h3> no data </h3> : <ChartView data={timeseries}/> }
            <TickerSelector />
        </div>
    )
}

export default ChartPage