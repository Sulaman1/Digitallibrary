import React, { useState, useEffect } from 'react'
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import './MyNavbar.css';
import Container from "react-bootstrap/Container";
import kitti from './kitti2.png'


function MyNavbar(props) {
  const [tId, setTid] = useState();

  const fetchId = (e) => {
    e.preventDefault();
    console.log("ID : ", tId);
    props.fetchTokenId(tId);
  }

  return (
    <Navbar className="color-nav" variant="light" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="https://opensea.io/collection/cryptokitties" target="_blank">
          <img src={kitti} width="50" height="50" className="d-inline-block align-top" alt="" />
        </Navbar.Brand>
        <Navbar.Brand href="https://www.cryptokitties.co/" target="_blank">
          <b style={{ color: "white" }}>NFTs Digital Library</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">

          <Form onSubmit={e => fetchId(e)} className="d-flex ms-auto">
            <FormControl
              type="text"
              placeholder="Fetch"
              className="mr-2"
              aria-label="Fetch"
              onChange={e => (setTid(e.target.value))}
            />
            <Button type="submit" variant="info">Fetch</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
