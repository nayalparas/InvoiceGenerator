import { useState } from "react";
import createPDF from "./createPDF";

import { Col, Row, Form, Button, Container, InputGroup } from "react-bootstrap";

const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const curDate = `${year}-${month}-${day}`;

const packageNames = [
  "Special Vitamin Health Care Package",
  "Special Female Health Care Package",
  "Special Male Health Care Package",
  "Standart Health Care Package",
  "Classic Health Care Package",
  "Extended Health Care Package",
  "Comprehensive Allergy Panel with Drugs"
];

const packagePrices = [2450, 2450, 2450, 999, 2950, 3500, 12000];

export default function InvoiceForm() {
  const [checkedBox, setCheckedBox] = useState([false, false, false, false, false, false, false]);

  const [formData, setFormData] = useState({
    invoiceNum: '',
    invoiceDate: curDate,
    sampleDate: curDate,
    custTitle: '',
    custName: '',
    custAge: '',
    custGender: '',
    custAddress: '',
    packageName: [],
    packagePrice: [],
    discount: '',
    paymentMode: 'Online',
    paymentDate: curDate
  })

  let total = 0;
  formData.packagePrice.forEach(num => total += num);

  function handleChange(e) {
    setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }))
  }

  function handleChangePackage(e) {
    const i = parseInt(e.target.name);
    const updatedState = checkedBox.map((item, idx) => idx === i ? !item : item);
    setCheckedBox(updatedState);

    let updatedPakcageName = [];
    let updatedPackagePrice = [];
    for (let i = 0; i < packageNames.length; i++) {
      if (updatedState[i]) {
        updatedPakcageName.push(packageNames[i]);
        updatedPackagePrice.push(packagePrices[i]);
      }
    }
    setFormData((curData) => ({ ...curData, packageName: updatedPakcageName, packagePrice: updatedPackagePrice }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    createPDF(formData);
  }

  return (
    <>
      <Container className="mb-5">
        <h1 className="my-4">Enter Details</h1>
        <div className="mainForm">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="invoiceNo">
                  <Form.Label>Invoice Number</Form.Label>
                  <Form.Control type="text" value={formData.invoiceNum} name="invoiceNum" onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="invoiceDate">
                  <Form.Label>Invoice Date</Form.Label>
                  <Form.Control type="text" value={formData.invoiceDate} name="invoiceDate" onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="sampleDate">
                  <Form.Label>Sample Collection Date</Form.Label>
                  <Form.Control type="text" value={formData.sampleDate} name="sampleDate" onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Title:</Form.Label>
                <Form.Select value={formData.custTitle} name='custTitle' onChange={handleChange}>
                  <option value="" disabled>--Select Title--</option>
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Ms.">Ms.</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="custName">
                  <Form.Label>Customer Name</Form.Label>
                  <Form.Control type="text" value={formData.custName} name="custName" onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="custName">
                  <Form.Label>Age</Form.Label>
                  <Form.Control type="text" value={formData.custAge} name="custAge" onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="custName">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select value={formData.custGender} name='custGender' onChange={handleChange}>
                    <option value="" disabled>--Select Gender--</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="custAddress">
              <Form.Label>Customer Address</Form.Label>
              <Form.Control type="text" value={formData.custAddress} name="custAddress" onChange={handleChange} />
            </Form.Group>
            <div className="mb-1">
              Packages:
            </div>
            <div className="mb-3">
              {
                packageNames.map((pkg, i) => {
                  return <Form.Check key={i} type="checkbox" id={`box${i}`} name={`${i}`} checked={checkedBox[i]} onChange={handleChangePackage}
                  label={`${packageNames[i]}, Price: ₹ ${packagePrices[i]}`} />
                })
              }
              {/* <Form.Check type="checkbox" id="box1" name='0' checked={checkedBox[0]} onChange={handleChangePackage}
                label={`${packageNames[0]}, Price: ₹ ${packagePrices[0]}`} />
              <Form.Check type="checkbox" id="box2" name='1' checked={checkedBox[1]} onChange={handleChangePackage}
                label={`${packageNames[1]}, Price: ₹ ${packagePrices[1]}`} />
              <Form.Check type="checkbox" id="box3" name='2' checked={checkedBox[2]} onChange={handleChangePackage}
                label={`${packageNames[2]}, Price: ₹ ${packagePrices[2]}`} />
              <Form.Check type="checkbox" id="box4" name='3' checked={checkedBox[3]} onChange={handleChangePackage}
                label={`${packageNames[3]}, Price: ₹ ${packagePrices[3]}`} />
              <Form.Check type="checkbox" id="box5" name='4' checked={checkedBox[4]} onChange={handleChangePackage}
                label={`${packageNames[4]}, Price: ₹ ${packagePrices[4]}`} />
              <Form.Check type="checkbox" id="box6" name='5' checked={checkedBox[5]} onChange={handleChangePackage}
                label={`${packageNames[5]}, Price: ₹ ${packagePrices[5]}`} /> */}

            </div>

            <Row>
              <Col md={{ span: 6, offset: 3 }}>
                <Row>
                  <Col className="my-auto">
                    <div style={{ 'fontWeight': 'bold' }}>
                      Total: ₹ {total}
                    </div>
                  </Col>
                  <Col className="my-auto">
                    <Form.Group className="mb-3" controlId="discount">
                      <Form.Label>Discount :</Form.Label>
                      <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">- ₹</InputGroup.Text>
                        <Form.Control
                          placeholder="0"
                          aria-label="dicsount"
                          aria-describedby="basic-addon1"
                          type="text" value={formData.discount} name="discount" onChange={handleChange}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col className="my-auto">
                    <div style={{ 'fontWeight': 'bold' }}>
                      Grand Total: ₹ {total - formData.discount}
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>

            <div className="mb-3">
              Payment Mode : <Form.Check inline label="Online" type="radio" id="online" value="Online" name="paymentMode" checked={formData.paymentMode === "Online"} onChange={handleChange} />
              <Form.Check inline label="Debit Card" type="radio" id="debit" value="Debit Card" name="paymentMode" checked={formData.paymentMode === "Debit Card"} onChange={handleChange} />
              <Form.Check inline label="Credit Card" type="radio" id="credit" value="Credit Card" name="paymentMode" checked={formData.paymentMode === "Credit Card"} onChange={handleChange} />
              <Form.Check inline label="Cash" type="radio" id="cash" value="Cash" name="paymentMode" checked={formData.paymentMode === "Cash"} onChange={handleChange} />
            </div>

            <Form.Group as={Row} className="mb-3" controlId="paymentDate">
              <Form.Label column xs={4} sm={3} lg={2}>
                Payment Date
              </Form.Label>
              <Col xs={6} sm={4} md={3}>
                <Form.Control type="text" value={formData.paymentDate} name="paymentDate" onChange={handleChange} />
              </Col>
            </Form.Group>

            <Button onClick={handleSubmit}>Download PDF</Button>
            {/* <div>
            <label htmlFor="invoiceNo">Invoice Number</label>
            <input type="text" id="invoiceNo" value={formData.invoiceNum} name="invoiceNum" onChange={handleChange} />
            <label htmlFor="invoiceDate">Invoice Date</label>
            <input type="text" id="invoiceDate" value={formData.invoiceDate} name="invoiceDate" onChange={handleChange} />
            <label htmlFor="sampleDate">Sample Collection Date</label>
            <input type="text" id="sampleDate" value={formData.sampleDate} name="sampleDate" onChange={handleChange} />
          </div>
            <div>
              <label htmlFor="custName">Customer Name</label>
              <input type="text" id="custName" value={formData.custName} name="custName" onChange={handleChange} />
              <label htmlFor="custAddress">Customer Address</label>
              <input type="text" id="custAddress" value={formData.custAddress} name="custAddress" onChange={handleChange} />
            </div>
            <div>
              <div>Select Packages:</div>
              <div>
                <input type="checkbox" id="box1" name='0' checked={checkedBox[0]} onChange={handleChangePackage} />
                <label htmlFor="box1">{packageNames[0]}, Price: ₹{packagePrices[0]}</label>
              </div>
              <div>
                <input type="checkbox" id="box2" name='1' checked={checkedBox[1]} onChange={handleChangePackage} />
                <label htmlFor="box2">{packageNames[1]}, Price: ₹{packagePrices[1]}</label>
              </div>
              <div>
                <input type="checkbox" id="box3" name='2' checked={checkedBox[2]} onChange={handleChangePackage} />
                <label htmlFor="box3">{packageNames[2]}, Price: ₹{packagePrices[2]}</label>
              </div>
              <div>
                <input type="checkbox" id="box4" name='3' checked={checkedBox[3]} onChange={handleChangePackage} />
                <label htmlFor="box4">{packageNames[3]}, Price: ₹{packagePrices[3]}</label>
              </div>
              <div>
                <input type="checkbox" id="box5" name='4' checked={checkedBox[4]} onChange={handleChangePackage} />
                <label htmlFor="box5">{packageNames[4]}, Price: ₹{packagePrices[4]}</label>
              </div>
              <div>
                <input type="checkbox" id="box6" name='5' checked={checkedBox[5]} onChange={handleChangePackage} />
                <label htmlFor="box6">{packageNames[5]}, Price: ₹{packagePrices[5]}</label>
              </div>
              <div>
                Total: {total}
              </div>
            </div> 
            <div>
              <label htmlFor="discount">Discount</label>
              <input type="text" id="discount" value={formData.discount} name="discount" onChange={handleChange} />
            </div>
            <div>
              Grand Total: {total - formData.discount}
            </div>
            <div>
              Payment Mode :
              <label htmlFor="online">Online</label>
              <input type="radio" id="online" value="Online" name="paymentMode" checked={formData.paymentMode === "Online"} onChange={handleChange} />
              <label htmlFor="debit">Debit</label>
              <input type="radio" id="debit" value="Debit Card" name="paymentMode" checked={formData.paymentMode === "Debit Card"} onChange={handleChange} />
              <label htmlFor="credit">Credit</label>
              <input type="radio" id="credit" value="Credit Card" name="paymentMode" checked={formData.paymentMode === "Credit Card"} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="paymentDate">Payment Date</label>
              <input type="text" id="paymentDate" value={formData.paymentDate} name="paymentDate" onChange={handleChange} />
            </div>
  */}
          </Form>
        </div>
      </Container>
    </>
  );
}
