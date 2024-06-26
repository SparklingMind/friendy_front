import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useState } from "react"
import { useNavigate , useParams } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form'; 
import { Button } from "react-bootstrap";
import '../../assets/css/compare.css';


const FindEmailVerification = () => {
  let { pathname } = useLocation();

  const navigator = useNavigate();

  const [formData, setFormData] = useState({
    userId:"",
    email:""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 데이터를 서버로 전송하는 로직 작성
   // 에러 메시지 초기화
   let errorMessage = "";

   // 필드 검증
   if (!formData.email) {
     errorMessage = "이메일을 입력해주세요.";
   }else if(!formData.userId){
    errorMessage = "아이디를 입력해주세요.";
   }
   
   if (errorMessage !=="") {
     alert(errorMessage);
     return;
   }
   // 전송
   axios({ 
    method:"POST", 
    url : "http://localhost:9000/email/reissue",
    data : formData, 
    }) 
     .then((res)=>{ 
        alert(res.data);
        navigator("/emailVerification")
    }) 
    .catch((err)=>{ 
      alert(err.response.data.title ); 
    });
   
  };

  return (
    <Fragment>
      <SEO
        titleTemplate="인증번호 재발급"
        description="해당 이메일로 인증 코드를 보냈습니다!"
      />
        <LayoutOne headerTop="visible">
            {/* breadcrumb */}
            <Breadcrumb
                pages={[
                    {label: "Home", path: process.env.PUBLIC_URL + "/"},
                    {label: "Re-issuance", path: process.env.PUBLIC_URL + pathname}
                ]}
            />
            <br></br>
            <br></br>
            <div className="form-container">
                <Form>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            id="userId"
                            name="userId"
                            placeholder="ID"
                            onChange={handleInputChange}
                            className="input-field"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Email"
                            onChange={handleInputChange}
                            className="input-field"
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        onClick={handleSubmit}
                        className="submit-button"
                    >
                        코드 받기
                    </Button>
                </Form>
            </div>
            <br></br>
            <br></br>
        </LayoutOne>
    </Fragment>
  );
};

export default FindEmailVerification;

