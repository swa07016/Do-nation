import React, { useState } from 'react';
import { Row, Col, Button, Progress, Modal, ModalHeader, ModalBody, Container,Table, Spinner } from 'reactstrap';
import { InputGroup, InputGroupAddon, TabContent, TabPane, Nav, NavItem, NavLink, Input, Label} from 'reactstrap';

const Donation = (props) => {

    const [activeTab, setActiveTab] = useState('1');
    const [recordId, setRecordId] = useState(1);
    const [donatorName, setDonatorName] = useState(null);
    const [donatedMoney, setDonatedMoney] = useState(0);
    const [phone, setPhone] = useState('');
    const [authNum, setAuthNum] = useState('');
    
    // donationTime

    const toggleTab = tab => {
      if(activeTab !== tab) setActiveTab(tab);
    }

    const donateApi = (info) => {
        return fetch('/api/general_donation_records', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'

            },
            body: JSON.stringify(info),
            
        }).then(response => response.json())
    }

    const getToday = () => {
        let today = new Date();   
        let year = today.getFullYear(); // 년도
        let month = today.getMonth() + 1;  // 월
        let date = today.getDate();  // 날짜
        let day = today.getDay();  // 요일
        return (year + '-' + month + '-' + date);
    }

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const submitHandler = async () => {
        if(donatorName && donatedMoney && phone && authNum ) {
            const response = await donateApi({
                gr_Id:recordId, //id로 추후에 교체
                donatorName,
                donatedMoney,
                donationTime: getToday()
            });
            console.log(response);
            alert('결제가 완료되었습니다');
        }
        else {
            alert('본인정보, 금액을 모두 입력해주세요');
        }
    }


    return(
        <>
        <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="single-cases mb-40">
                <div className="cases-img">
                    <img onClick={toggle} src="assets/img/gallery/서병.jpg" alt=""/>
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
            <Container style={{
                height:'35rem'
            }}>
            <hr style={{'marginTop':'0.5rem', marginBottom:'0.7rem'}}/>
            <Nav tabs>
                <NavItem style={{
                    'backgroundColor': (activeTab === '1') ? '#002D5B' : null,
                    'color': (activeTab === '1') ? 'white' : null
                }}>
                <NavLink
                    onClick={(e) => { toggleTab('1'); }}
                >
                    본인인증
                </NavLink>
                </NavItem>
                <NavItem style={{
                    'backgroundColor': (activeTab === '2') ? '#002D5B' : null,
                    'color': (activeTab === '2') ? 'white' : null
                }}>
                <NavLink
                    onClick={(e) => { toggleTab('2'); }}
                >
                    기부정보
                </NavLink>
                </NavItem>
                <NavItem style={{
                    'backgroundColor': (activeTab === '3') ? '#002D5B' : null,
                    'color': (activeTab === '3') ? 'white' : null
                }}>
                <NavLink
                    onClick={(e) => { toggleTab('3'); }}
                >
                    결제진행
                </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                <Row>
                    <Col sm="12">
                        <Container   style={{
                                'paddingTop':'1rem'
                            }}>
                            <Row>
                                <Col>
                                <Label>인증번호</Label>
                                <InputGroup>
                                <Input 
                                value={authNum}
                                onChange={(e)=>setAuthNum(e.target.value)}
                                required  size="lg" type="authNum" placeholder="인증번호를 입력하세요."/> 
                                    <InputGroupAddon 
                                    onClick={()=>alert('인증되었습니다.')}
                                    addonType="append">
                                    인증
                                    </InputGroupAddon>
                                </InputGroup>
                                
                                <hr/>
                                <p style={{
                                    'fontSize':'1rem'
                                }}>※ 개인정보는 처리 목적 달성 후에 파기하는 것을 기본으로 합니다.</p>
                                </Col>
                                <Col>
                                    <Label>이름</Label>
                                    <Input value={donatorName} onChange={(e)=>setDonatorName(e.target.value)} required  size="lg" type="name" placeholder="이름을 입력하세요."/> 
                                    <hr/>
                                    
                                    <Label>전화번호</Label>
                                    <InputGroup>
                                        <Input
                                        value={phone}
                                        onChange={(e)=>setPhone(e.target.value)}
                                         required  size="lg" type="phone" placeholder="전화번호를 입력하세요."/>
                                        <InputGroupAddon addonType="append"
                                        onClick={()=>alert('인증번호가 전송되었습니다.')}
                                        >
                                        전송
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
                </TabPane>
                <TabPane tabId="2">
                <Row>
                    <Col sm="12">
                        <Container  style={{
                                'paddingTop':'1rem'
                            }}>
                            <Row>
                                <Col>
                                기관 : 강동 경희대학교 병원
                                <hr/>
                                <p>" 모두를 위한 모두의 참여 "</p>
                                <hr/>
                                오늘도 감사합니다
                                </Col>
                                <Col>
                                    <Label>기부금액</Label>
                                    <Input 
                                    value={donatedMoney}
                                    onChange={(e)=>setDonatedMoney(Number(e.target.value))}
                                    required  size="lg" type="money" placeholder="금액을 입력하세요."/> 
                                    <hr/>
                                    <Label>기관에게 한마디</Label>
                                    <Input required  size="lg" type="money" placeholder="자유롭게 써주세요."/>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
                </TabPane>
                <TabPane tabId="3">
                <Row>
                <div style={{ 'display':'flex', 'width':'100%', "height":'100%', 'textAlign':'center', 'alignItems':'center'}}>
                    <Container  style={{
                                'paddingTop':'1rem', maxWidth:'300px',
                            }}>
                        
                            
                            결제수단 선택
                            <hr/>
                            <Input type="select" name="select" id="exampleSelect">
                                <option>카카오페이</option>
                                <option>신용카드</option>
                                <option>무통장입금</option>
                                <option>페이코</option>
                            </Input>
                            <div style={{
                                'paddingTop':'5rem',
                               
                            }}>
                            <Button 
                            onClick={submitHandler}
                            style={{
                                'backgroundColor':'#09CC78'
                            }}>결제하기</Button>
                            </div>
                            
                        
                    </Container>
                    </div>
                </Row>
                </TabPane>
            </TabContent>
        </Container>
        </Modal>
      </>
    );
}

export default Donation;