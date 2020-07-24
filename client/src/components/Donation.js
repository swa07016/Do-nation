import React, { useState } from 'react';
import { Row, Col, Button, Progress, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText} from 'reactstrap';
const Donation = (props) => {

    const [activeTab, setActiveTab] = useState('1');

    const toggleTab = tab => {
      if(activeTab !== tab) setActiveTab(tab);
    }

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return(
        <>
        <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="single-cases mb-40">
                <div className="cases-img">
                    <img onClick={toggle} src="assets/img/gallery/case3.png" alt=""/>
                </div>
                <div className="cases-caption">
                    <h3><a onClick={toggle}>{props.title}</a></h3>
                    <div className="single-skill mb-15">
                        <div className="bar-progress">
                            <div className="text-center">50%</div>
                            <Progress value={50} style={{backgroundColor : '#09CC78'}}/>
                        </div>
                    </div>
                    <div className="prices d-flex justify-content-between">
                        <p>Raised:<span> {props.raised}￦</span></p>
                        <p>Goal:<span> {props.goal}￦</span></p>
                    </div>
                </div>
            </div>
        </div>
        <Modal
        backdrop='static' keyboard={false}
             fade={false}
            style={{
                'fontSize':'1.4rem'
            }}
         size="lg" isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>{props.title}</ModalHeader>
            <ModalBody>
            <Row xs="1" sm="1" md="2">
                <Col>
                <Table>
                    <thead>
                        <tr>
                        <th>예산서</th>
                        <th>항목</th>
                        <th>가격(￦)</th>
                        
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row">1</th>
                        <td>마스크</td>
                        <td>50000</td>
                        
                        </tr>
                        <tr>
                        <th scope="row">2</th>
                        <td>의료기기</td>
                        <td>100000</td>
                        
                        </tr>
                        <tr>
                        <th scope="row">3</th>
                        <td>연구비</td>
                        <td>50000</td>
                        
                        </tr>
                    </tbody>
                    </Table>
                </Col>
                <Col>
                <Table borderless>
                    <thead>
                        <tr>
                        
                        <th>세부정보</th>
                        <th></th>
                        
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        
                        <td>등록인</td>
                        <td>정성훈</td>
                        
                        </tr>
                        <tr>
                        
                        <td>등록일자</td>
                        <td>2020.07.24</td>
                        
                        </tr>
                        <tr>
                        
                        <td>희망금액(￦)</td>
                        <td>200000</td>
                        
                        </tr>
                    </tbody>
                    </Table>
                </Col>
            </Row>
            </ModalBody>
            <ModalFooter>
                <Nav tabs>
            <NavItem>
            <NavLink
                onClick={() => { toggleTab('1'); }}
            >
                Tab1
            </NavLink>
            </NavItem>
            <NavItem>
            <NavLink
                onClick={() => { toggleTab('2'); }}
            >
                More Tabs
            </NavLink>
            </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
            <Row>
                <Col sm="12">
                <h4>Tab 1 Contents</h4>
                </Col>
            </Row>
            </TabPane>
            <TabPane tabId="2">
            <Row>
                <Col sm="6">
                <Card body>
                    <CardTitle>Special Title Treatment</CardTitle>
                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                    <Button>Go somewhere</Button>
                </Card>
                </Col>
                <Col sm="6">
                <Card body>
                    <CardTitle>Special Title Treatment</CardTitle>
                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                    <Button>Go somewhere</Button>
                </Card>
                </Col>
            </Row>
            </TabPane>
        </TabContent>
            </ModalFooter>
        </Modal>
      </>
    );
}

export default Donation;