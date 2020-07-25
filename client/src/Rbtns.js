import React, {useState, useEffect} from 'react';
import { Row, Col, Button, Progress, Modal, ModalHeader, ModalBody, Container,Table, Spinner } from 'reactstrap';
import { InputGroup, InputGroupAddon, Form, TabContent, TabPane, Nav, NavItem, NavLink, Input, Label} from 'reactstrap';

const Rbtns = () => {

    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [data, setData] = useState([]);
    const [fdata, setfdata] = useState([]);
    const [userInput, setUserInput] = useState('');
    const toggle = () => setModal(!modal);
    const toggle2 = () => setModal2(!modal2);
    const submitHandler = () => {
        alert('정상적으로 제출되었습니다.');
    }
    const getData = () => {
        return fetch('/api/datas', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'

            }
            
        }).then(response => response.json())
    }

    useEffect(async () => {
        const temp = await getData();
        setData(temp);
        console.log(temp);
    }, []);

    useEffect(()=> {
        let result = [];
        for(let i=0; data.length; i++) {
            if(data[i]["시도"] === userInput) {
                result.push(data[i]["의료기관명"]);
            }
        }
        setfdata(result);
    }, [userInput])


    return(
        <>
            <div class="col-xl-2 col-lg-3 col-md-4">
            <a onClick={toggle} class="btn white-btn f-right sm-left">등록하기 (donate)</a>
            </div>
            <div class="col-xl-2 col-lg-3 col-md-4">
            <a onClick={toggle2} class="btn white-btn f-right sm-left">등록하기 (covid-19)</a>
            </div>

        <Form>
        <Modal
            backdrop='static' keyboard={false}
            fade={false}
            style={{
                'fontSize':'1.4rem'
            }}
            size="lg" isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Donate 기관 등록하기</ModalHeader>
            <ModalBody>
            <Row>
            <Col>
                기관명
                <Input required placeholder="기관명을 입력해주세요."/>
                <hr/>
                등록자
                <Input required placeholder="이름을 입력해주세요."/>
                <hr/>
                전화번호
                <Input required placeholder="전화번호를 입력해주세요."/>
                <hr/>
                희망금액
                <Input required placeholder="총 희망금액을 입력해주세요."/>
            </Col>  
            <Col>  
                예산서
                <Input required type="textarea" rows={14} placeholder="항목 : 가격 형식으로 작성해주세요."/>
                <hr/>
                <Button type="submit" onClick={submitHandler} style={{float:'right'}}>제출</Button>
                </Col>
            </Row>
            <hr/>
            <p style={{
                                    'fontSize':'1rem'
                                }}>등록까지 1~3일이 소요됩니다.</p>
            </ModalBody>
            
        </Modal>
        </Form>


        <Form>
        <Modal
            backdrop='static' keyboard={false}
            fade={false}
            style={{
                'fontSize':'1.4rem'
            }}
            size="lg" isOpen={modal2} toggle={toggle2}>
            <ModalHeader toggle={toggle2}>Covid-19 등록하기</ModalHeader>
            <ModalBody>
            <Row>
            <Col>
                기관명
                <Input required placeholder="기관명을 입력해주세요."/>
                <hr/>
                등록자
                <Input required placeholder="이름을 입력해주세요."/>
                <hr/>
                전화번호
                <Input required placeholder="전화번호를 입력해주세요."/>
                <hr/>
                
            </Col>  
            <Col>  
                선별진료소 검색
                <hr/>
                <a style={{
                    'color':'#002D5B'
                }} href="https://www.mohw.go.kr/react/popup_200128_3.html"  target="_blank">선별 진료소 검색 링크</a>
                {/* <Input
                value={userInput} 
                onChange={(e) => setUserInput(e.target.value)}
                required placeholder="지역을 입력해주세요.(시, 도)"/>
                {fdata[0]} */}
                <hr/>
                <Button type="submit" onClick={submitHandler} style={{float:'right'}}>제출</Button>
                </Col>
            </Row>
            <hr/>
            <p style={{
                                    'fontSize':'1rem'
                                }}>등록까지 1~3일이 소요됩니다.</p>
            </ModalBody>
            
        </Modal>
        </Form>

        </>
    );
}

export default Rbtns;