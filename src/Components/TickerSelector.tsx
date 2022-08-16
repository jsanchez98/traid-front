import React, { useEffect, useState } from "react";
import { Ticker } from "../Types/Stocks";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

interface InputProps {
  allTickers: Ticker[];
  fetchDatapoints: (ticker:string) => void;
  setTicker: React.Dispatch<React.SetStateAction<string>>;
}

function TickerSelector(props: InputProps) {
  const [tickeroptions, setTickeroptions] = useState<{ label: string }[]>([]);
  const [value, setValue] = useState<{ label: string } | null>({label: 'AAPL'});

  useEffect(() => {
    setTickeroptions(listTickers(props.allTickers));
  }, []);

  /**
   * Fetch time series data upon ticker select
   */
  useEffect(() => {
    if (value != null){
      props.fetchDatapoints(value.label);
      props.setTicker(value.label)
    }
  }, [value])

  function listTickers(tickers: Ticker[]): { label: string }[] {
    return tickers.map((ticker) => ({ label: ticker.ticker }));
  }

  return tickeroptions.length == 0 ? (
    <div> not loaded tickers </div>
  ) : (
    <div className="ticker-search">
      <Autocomplete
        isOptionEqualToValue={(option, value) => option.label === value.label}
        value={value}
        onChange={(event:any, newValue:{ label: string } | null) => {
          setValue(newValue)
        }}
        style={{"backgroundColor": "white"}}
        disablePortal
        id="combobox-tickers"
        options={tickeroptions}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="" />}
      />
    </div>
  );
}

export default TickerSelector;
