import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";


function FetchAsset(props) {

    async function downloadObject(myData) {
        console.log("MYDATA : ", myData);
        const fileName = myData.name;
        const json = JSON.stringify(myData, null, 4);
        const blob = new Blob([json], { type: 'application/json' });
        const href = await URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = fileName + ".json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    async function resetSingleAssetList() {
        props.resetSingleAssetList()
    }

    return (
        <div className="App" style={{ backgroundImage: `linear-gradient(to bottom right, rgba(255,0,0,0), rgba(0, 133, 255, 1))` }}>

            <Row style={{ paddingTop: "100px", paddingLeft: "20px" }}>
                {
                    (props.metaDataList)
                        ? props.metaDataList.map(
                            (item, index) => {
                                return (
                                    <Col style={{ paddingBottom: "20px" }}>
                                        <Card key={index} style={{ width: '18rem' }}>
                                            <Card.Img variant="top" src={item.image_preview_url} />
                                            <Accordion>
                                                <Accordion.Item eventKey="0" style={{ clear: 'both' }}>
                                                    <Accordion.Header>{item.name} <b style={{ marginLeft: '10%' }}>Metadata</b></Accordion.Header>
                                                    <Accordion.Body>
                                                        <Card.Body>
                                                            <Card.Title>Metadata of NFT</Card.Title>
                                                            <Card.Text>{item.name}</Card.Text>
                                                            <Card.Text>{item.description}</Card.Text>
                                                        </Card.Body>
                                                        <ListGroup className="list-group-flush">
                                                            <ListGroupItem>ID: {item.id}</ListGroupItem>
                                                            <ListGroupItem>Sales: {item.num_sales}</ListGroupItem>
                                                            <ListGroupItem>Date Created: {item.collection.created_date}</ListGroupItem>
                                                            <ListGroupItem>Price in USD: {item?.last_sale?.payment_token?.usd_price}</ListGroupItem>
                                                        </ListGroup>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                            <Accordion>
                                                <Accordion.Item eventKey="0">
                                                    <Accordion.Header>Characteristics Metadata</Accordion.Header>
                                                    <Accordion.Body>
                                                        <Card.Body>
                                                            {(item.traits) ? (item.traits).map((d, i) => {
                                                                return (
                                                                    <Card.Text key={i}>
                                                                        {d.trait_type} : {d.value}
                                                                    </Card.Text>
                                                                )
                                                            })
                                                                : <h2>nothing</h2>
                                                            }
                                                        </Card.Body>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                            <Card.Body>
                                                <Card.Link className="btn btn-primary" onClick={() => { downloadObject(item) }}>Download</Card.Link>
                                            </Card.Body>
                                            {/* <Card.Body>
                                                <Card.Link className="btn btn-primary" href={item.token_metadata} target="_blank">Metadata</Card.Link>
                                            </Card.Body> */}
                                        </Card>
                                    </Col>
                                )
                            }
                        )
                        : null
                }
            </Row>
            <button style={{ margin: "10px" }} className="btn btn-primary" onClick={() => { props.singleAssetList() }}>Fetch Data</button>
            <button className="btn btn-danger" onClick={() => { resetSingleAssetList() }}>Reset</button>
        </div >
    );
}

export default FetchAsset;