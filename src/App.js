
// Importing modules
import React, { useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import { Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import {Container} from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";

function App() {

// usetstate for storing and retrieving wallet details
const [data, setdata] = useState({
	address: "0x9db46E55A1cB4B3bFb89A418f812df8ca8D81224",
	Balance: null,
});

// Button handler button for handling a
// request event for metamask
const btnhandler = () => {

	// Asking if metamask is already present or not
	if (window.ethereum) {

	// res[0] for fetching a first wallet
	window.ethereum
		.request({ method: "eth_requestAccounts" })
		.then((res) => accountChangeHandler(res[0]));
	} else {
	alert("install metamask extension!!");
	}
};

// getbalance function for getting a balance in
// a right format with help of ethers
const getbalance = (address) => {

	// Requesting balance method
	window.ethereum
	.request({
		method: "eth_getBalance",
		params: [address, "latest"]
	})
	.then((balance,address) => {
		// Setting balance
		setdata({
		Balance: ethers.utils.formatEther(balance),
    
		});
	});
};

// Function for getting handling all events
const accountChangeHandler = (account) => {
	// Setting an address data
	setdata({
	address: account,
	});

	// Setting a balance
	getbalance(account);
};

return (
	<div className="App" >
     
	{/* Calling all values which we
	have stored in usestate */}
  
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand href="#home">React-Ethereum</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
      <Nav.Link href="#features">Home</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
      <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Nav>
      <Nav.Link href="#deets">More deets</Nav.Link>
      <Nav.Link eventKey={2} href="#memes">
        Dank memes
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>

	<Card className="text-center" bg="black" >

		<Card.Header>
      <h2>
		<strong>Ether Public Address: </strong>
		{data.address}</h2>
		</Card.Header>
		<Card.Body>
      
		<Card.Text><h3>
			<strong><b>Balance: </b>  </strong>
			{data.Balance} ETH</h3>
      <br/>
      
		</Card.Text>
		<Button onClick={btnhandler} variant="primary">
      <h3>Connect to wallet</h3>
		</Button>
		</Card.Body>
	</Card>
  
  </div>

	
);
}

export default App;
