import React from "react";
import { post } from "axios";

class CustomerAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            userName: "",
            birthDay: "",
            gender: "",
            job: "",
            fileName:""
        }
    }

    handleValueChange = (event) => {
        let nextState = {};
        nextState[event.target.name] = event.target.value;
        this.setState(nextState);
    }

    handleFileChange = (event) => {
        this.setState({
            file: event.target.files[0],
            fileName: event.target.value
        })
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        this.addCustomer()
            .then(( response ) => {
                console.log(response);
            })
        // react 는 전체 페이지가 새로고쳐지는게 아니라 변화하는 데이터만 새로고침함
        // 즉...서버데이터는 다시 받아서 새로고침이 되어야한다
        // 추가 후 추가된 데이터를 다시 보이게 하는 기능을 추가해줘야하 함
        this.setState({
            file: null,
            userName: "",
            birthDay: "",
            gender: "",
            job: "",
            fileName:""
        })

        // 추후에 삭제 전체 새로고침은 개발단계에서 테스트 목적
        window.location.reload();
    }

    addCustomer = () => {
        const url = "/api/customers";
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('userName', this.state.userName);
        formData.append('birthDay', this.state.birthDay);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);

        // 기본적으로 파일이 포함된 데이터를 서버로 전송시
        // 웹 표준에 맞는 헤더를 추가 해줘야한다
        const config = {
            headers: {
                'content-type': "multipart/form-data"
            }
        }

        return post(url, formData, config);
    }


    // onChange 이벤트 = 값이 변할때
    // file 속성 = 바이트를 가진 real file 
    // value 속성 = 문자열로 된 값
    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객 추가</h1>
                프로필 이미지: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}></input>
                이름: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}></input>
                생년월일: <input type="text" name="birthDay" value={this.state.birthDay} onChange={this.handleValueChange}></input>
                성별: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}></input>
                직업: <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}></input>
                <button type="submit">Add Customer</button>
            </form>
        )
    }
}

export default CustomerAdd;