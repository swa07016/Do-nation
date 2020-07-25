import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  Progress,
  Modal,
  ModalHeader,
  ModalBody,
  Container,
  Table,
  Spinner,
} from "reactstrap";
import {
  InputGroup,
  InputGroupAddon,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Input,
  Label,
} from "reactstrap";

const Covid = (props) => {
  const [activeTab, setActiveTab] = useState("1");
  const [recordId, setRecordId] = useState(1);
  const [donatorName, setDonatorName] = useState(null);
  const [donatedMoney, setDonatedMoney] = useState(0);
  const [phone, setPhone] = useState("");
  const [authNum, setAuthNum] = useState("");
  const [pickNum, setPickNum] = useState(0);
  const [pick, setPick] = useState("마스크 (KF94, KF80)");
  // donationTime

  const list = [
    {
      name: "마스크 (KF94, KF80)",
      price: 990,
    },
    {
      name: "일회용 라텍스장갑(100매)",
      price: 7000,
    },
    {
      name: "아이스조끼",
      price: 30000,
    },
    {
      name: "의료용방호복",
      price: 30000,
    },
    {
      name: "손소독제",
      price: 4000,
    },
    {
      name: "일회용 알코올솜(100매)",
      price: 2000,
    },
  ];

  const onChangedonatedMoney = () => {
    let target_price = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i].name === pick) {
        target_price = list[i].price;
        break;
      }
    }
    setDonatedMoney(target_price * pickNum);
  };

  useEffect(() => {
    console.log(pick);
    onChangedonatedMoney();
  }, [pick, pickNum]);

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const donateApi = (info) => {
    return fetch("/api/corona_donation_records", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(info),
    }).then((response) => response.json());
  };

  const getToday = () => {
    let today = new Date();
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1; // 월
    let date = today.getDate(); // 날짜
    let day = today.getDay(); // 요일
    return year + "-" + month + "-" + date;
  };

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const submitHandler = async () => {
    if (donatorName && donatedMoney && phone && authNum) {
      const response = await donateApi({
        cr_Id: recordId, //id로 추후에 교체
        donatorName,
        donatedMoney,
        donatedGoods: pick,
        donationTime: getToday(),
      });
      console.log(response);
      alert("결제가 완료되었습니다");
    } else {
      alert("본인정보, 금액을 모두 입력해주세요");
    }
  };

  const chageSelectedValue = (e) => {
    setPick(e.target.options[e.target.selectedIndex].value);
  };

  return (
    <>
      <div className="col-lg-9 col-md-12">
        <div className="single-job-items mb-30">
          <div className="job-items">
            <div className="company-img">
              <a onClick={toggle}>
                <img src={`assets/img/gallery/${props.title}.jpg`} style={{"max-width":"110%"}} alt="" />
              </a>
            </div>
            <div className="job-tittle">
              <a onClick={toggle}>
                <h4>{props.title}</h4>
              </a>
              <ul>
                <li>
                  <i className="fas fa-sort-amount-down"></i>07.25.2020
                </li>
                <li>Raised: 100000₩</li>
                <li>Goal: 200000₩</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Modal
        backdrop="static"
        keyboard={false}
        fade={false}
        style={{
          fontSize: "1.4rem",
        }}
        size="lg"
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>{props.title}</ModalHeader>
        <ModalBody>
          <h4>기부가능 물품</h4>
          <Row xs="1" sm="1" md="2">
            <Col>
              <Table>
                <thead>
                  <tr>
                    <th></th>
                    <th>항목</th>
                    <th>가격(￦)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>마스크 (KF94, KF80)</td>
                    <td>990</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>일회용 라텍스장갑(100매)</td>
                    <td>7000</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>아이스조끼</td>
                    <td>30000</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col>
              <Table>
                <thead>
                  <tr>
                    <th></th>
                    <th>항목</th>
                    <th>가격(￦)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">4</th>
                    <td>의료용방호복</td>
                    <td>30000</td>
                  </tr>
                  <tr>
                    <th scope="row">5</th>
                    <td>손소독제</td>
                    <td>4000</td>
                  </tr>
                  <tr>
                    <th scope="row">6</th>
                    <td>일회용 알코올솜(100매)</td>
                    <td>2000</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </ModalBody>
        <Container
          style={{
            height: "35rem",
          }}
        >
          <hr style={{ marginTop: "0.5rem", marginBottom: "0.7rem" }} />
          <Nav tabs>
            <NavItem
              style={{
                backgroundColor: activeTab === "1" ? "#002D5B" : null,
                color: activeTab === "1" ? "white" : null,
              }}
            >
              <NavLink
                onClick={(e) => {
                  toggleTab("1");
                }}
              >
                본인인증
              </NavLink>
            </NavItem>
            <NavItem
              style={{
                backgroundColor: activeTab === "2" ? "#002D5B" : null,
                color: activeTab === "2" ? "white" : null,
              }}
            >
              <NavLink
                onClick={(e) => {
                  toggleTab("2");
                }}
              >
                기부정보
              </NavLink>
            </NavItem>
            <NavItem
              style={{
                backgroundColor: activeTab === "3" ? "#002D5B" : null,
                color: activeTab === "3" ? "white" : null,
              }}
            >
              <NavLink
                onClick={(e) => {
                  toggleTab("3");
                }}
              >
                결제진행
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  <Container
                    style={{
                      paddingTop: "1rem",
                    }}
                  >
                    <Row>
                      <Col>
                        <Label>인증번호</Label>
                        <InputGroup>
                          <Input
                            value={authNum}
                            onChange={(e) => setAuthNum(e.target.value)}
                            required
                            size="lg"
                            type="authNum"
                            placeholder="인증번호를 입력하세요."
                          />
                          <InputGroupAddon
                            onClick={() => alert("인증되었습니다.")}
                            addonType="append"
                          >
                            인증
                          </InputGroupAddon>
                        </InputGroup>

                        <hr />
                        <p
                          style={{
                            fontSize: "1rem",
                          }}
                        >
                          ※ 개인정보는 처리 목적 달성 후에 파기하는 것을
                          기본으로 합니다.
                        </p>
                      </Col>
                      <Col>
                        <Label>이름</Label>
                        <Input
                          value={donatorName}
                          onChange={(e) => setDonatorName(e.target.value)}
                          required
                          size="lg"
                          type="name"
                          placeholder="이름을 입력하세요."
                        />
                        <hr />

                        <Label>전화번호</Label>
                        <InputGroup>
                          <Input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            size="lg"
                            type="phone"
                            placeholder="전화번호를 입력하세요."
                          />
                          <InputGroupAddon
                            addonType="append"
                            onClick={() => alert("인증번호가 전송되었습니다.")}
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
                  <Container
                    style={{
                      paddingTop: "1rem",
                    }}
                  >
                    <Row>
                      <Col>
                        기부 수량
                        <Input
                          value={pickNum}
                          onChange={(e) => setPickNum(Number(e.target.value))}
                          required
                          size="lg"
                          type="money"
                          placeholder="금액을 입력하세요."
                        />
                        <hr />
                        기부 물품
                        <Input
                          type="select"
                          name="select"
                          id="exampleSelect"
                          value={pick}
                          onChange={chageSelectedValue}
                        >
                          <option>마스크 (KF94, KF80)</option>
                          <option>일회용 라텍스장갑(100매)</option>
                          <option>아이스조끼</option>
                          <option>의료용방호복</option>
                          <option>손소독제</option>
                          <option>일회용 알코올솜(100매)</option>
                        </Input>
                      </Col>
                      <Col>
                        <Label>기부금액</Label>
                        <Input
                          value={donatedMoney}
                          disabled
                          required
                          size="lg"
                          type="money"
                          placeholder="금액을 입력하세요."
                        />
                        <hr />
                        <Label>기관에게 한마디</Label>
                        <Input
                          required
                          size="lg"
                          type="money"
                          placeholder="자유롭게 써주세요."
                        />
                      </Col>
                    </Row>
                  </Container>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="3">
              <Row>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    height: "100%",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <Container
                    style={{
                      paddingTop: "1rem",
                      maxWidth: "300px",
                    }}
                  >
                    결제수단 선택
                    <hr />
                    <Input type="select" name="select" id="exampleSelect">
                      <option>카카오페이</option>
                      <option>신용카드</option>
                      <option>무통장입금</option>
                      <option>페이코</option>
                    </Input>
                    <div
                      style={{
                        paddingTop: "5rem",
                      }}
                    >
                      <Button
                        onClick={submitHandler}
                        style={{
                          backgroundColor: "#09CC78",
                        }}
                      >
                        결제하기
                      </Button>
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
};

export default Covid;
