import { useEffect, useState } from "react";
import { Datapoint, Ticker } from "../Types/Stocks";
import ChartView from "./ChartView";
import TickerSelector from "./TickerSelector";

function ChartPage() {
  const [ticker, setTicker] = useState<string>("AAPL");
  const [datapoints, setDatapoints] = useState<Datapoint[]>();
  const [timeseries, setTimeseries] = useState<[number, number][]>([]);
  const [allTickers, setAllTickers] = useState<Ticker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!loading) {
      fetchDatapoints(ticker);
      fetchTickers();
    }
  }, []);

  function getNameFromTicker(ticker: string): string {
    const name = allTickers.find(entity => entity.ticker === ticker)?.name
    if(name == null){
      return "Name not found"
    }
    return name;
  }

  function fetchDatapoints(ticker: string) {
    setLoading(true);
    fetch("http://localhost:8080/" + ticker + "/timeseries", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setDatapoints(data);
        setTimeseries(reshapeDatapoints(data));
        setLoading(false);
      });
  }

  function fetchTickers() {
    fetch("http://localhost:8080/getAll", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAllTickers(data);
      });
  }

  function reshapeDatapoints(timeseries: Datapoint[]): [number, number][] {
    return timeseries.map((point) => {
      return [point.t, point.c];
    });
  }

  return (
    <div style={{ display: "flex" }}>
      {timeseries.length == 0 ? (
        <div className="chart-frame">
        <h3> no API data available</h3>
        </div>
      ) : (
        <div className="chart-frame">
        <ChartView data={timeseries} loading={loading} />
        </div>
      )}
      <div>
        {allTickers.length == 0 ? (
          <></>
        ) : (
          <>
            <TickerSelector
              allTickers={allTickers}
              fetchDatapoints={fetchDatapoints}
              setTicker={setTicker}
            />
            <div id="company-info-div">
              <h3>Name: {getNameFromTicker(ticker)}</h3>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ChartPage;
