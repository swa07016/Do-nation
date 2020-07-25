import React, {useState} from 'react';
import { Row, Col, Button, Progress, Modal, ModalHeader, ModalBody, Container,Table, Spinner } from 'reactstrap';
import { InputGroup, InputGroupAddon, Form, TabContent, TabPane, Nav, NavItem, NavLink, Input, Label} from 'reactstrap';

const Rbtns = () => {

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
  
    const submitHandler = () => {
        alert('정상적으로 제출되었습니다.');
    }

    return(
        <>
            <div class="col-xl-2 col-lg-3 col-md-4">
            <a onClick={toggle} class="btn white-btn f-right sm-left">등록하기 (donate)</a>
            </div>
            <div class="col-xl-2 col-lg-3 col-md-4">
            <a href="#" class="btn white-btn f-right sm-left">등록하기 (covid-19)</a>
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
        </>
    );
}

export default Rbtns;