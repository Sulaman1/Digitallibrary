import './App.css';
import MyNavbar from './MyNavbar';
import FetchAsset from './FetchAsset';
import FetchBundle from './FetchBundle';
import React, { useEffect, useState } from 'react';
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';


const options = { method: 'GET' };


function App() {
  const [metaData, setMetaData] = useState();
  const [metaDataList, setMetaDataList] = useState([]);

  useEffect(() => {
    async function loadData() {
      const response = await fetch('https://api.opensea.io/api/v1/assets?token_ids=1&token_ids=2&token_ids=127&token_ids=99&token_ids=5&token_ids=123&token_ids=210&token_ids=3&token_ids=77&asset_contract_address=0x06012c8cf97BEaD5deAe237070F9587f8E7A266d',
        {
          headers: { Accept: 'application/json' },
          options
        })

      const res = await response.json();
      const data1 = res.assets;
      console.log("Data 1: ", data1);
      setMetaData(data1);
    }
    loadData()
  }, []);

  async function singleAssetList() {
    for (var i = 1787909; i < 1787920; i++) {
      const response = await fetch('https://api.opensea.io/api/v1/asset/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d/' + i + '/',
        {
          headers: { Accept: 'application/json' },
          options
        })
      const res = await response.json();
      const data1 = res;
      console.log("Response: ", data1);
      setMetaDataList(metaDataList => [...metaDataList, data1]);
    }
  }

  async function fetchTokenId(tokenId) {
    const response = await fetch('https://api.opensea.io/api/v1/asset/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d/' + tokenId + '/',
      {
        headers: { Accept: 'application/json' },
        options
      })
    const res = await response.json();
    const data1 = res;
    console.log("Response: ", data1);
    setMetaDataList(metaDataList => [...metaDataList, data1]);

  }

  async function resetSingleAssetList() {
    setMetaDataList([])
  }

  async function songsMetadata() {
    const response = await fetch("https://deezerdevs-deezer.p.rapidapi.com/artist/2", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        "x-rapidapi-key": "d8d011d7b4msh5ddcb5d785c2aaep1ce2e6jsn31c7016682be"
      }
    })

    const res = await response.json();
    const data1 = res;
    console.log("Data 1: ", data1);
  }

  const [key, setKey] = useState('asset');

  return (
    <div className="App" style={{ backgroundImage: `linear-gradient(to bottom right, rgba(255,0,0,0), rgba(0, 133, 255, 1))` }}>
      <MyNavbar fetchTokenId={fetchTokenId} />

      <Container style={{ paddingTop: "100px" }}>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="asset" title="Asset">
            <FetchAsset
              singleAssetList={singleAssetList}
              metaDataList={metaDataList}
              fetchTokenId={fetchTokenId}
              resetSingleAssetList={resetSingleAssetList}
            />
          </Tab>
          <Tab eventKey="bundle" title="Bundle">
            <FetchBundle
              metaData={metaData}
              singleAssetList={singleAssetList}
              fetchTokenId={fetchTokenId}
              resetSingleAssetList={resetSingleAssetList}
            />
          </Tab>
        </Tabs>
      </Container>
    </div >
  );
}

export default App;
