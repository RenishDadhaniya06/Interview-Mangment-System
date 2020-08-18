import React, { Component } from "react";
import axios from "axios";
import Modal from "./Modal/DeleteModal.js";
import EditModal from "./Modal/EditModal.js";
import {connect} from 'react-redux'

class Home extends Component {
  state = {
    users: "",
    show: false,
    showModal: false,
    showEditModal: false,
  };

  logoutHandler = async (e) => {
    e.preventDefault();
    axios.defaults.headers.common["Authorization"] = await localStorage.getItem(
      "Auth1"
    );
    await axios
      .post("http://localhost:3000/users/logout")
      .then((response) => {
        localStorage.clear();
        this.props.history.push("/");
      })
      .catch((e) => {
        console.log("Error:", e);
      });
  };

  logoutAllHandler = async (e) => {
    e.preventDefault();
    axios.defaults.headers.common["Authorization"] = await localStorage.getItem(
      "Auth1"
    );
    await axios
      .post("http://localhost:3000/users/logoutAll")
      .then((response) => {
        localStorage.clear();
        this.props.history.push("/");
      })
      .catch((e) => {
        console.log("Error:", e);
      });
  };

  listUserHandler = async (e) => {
    axios.defaults.headers.common["Authorization"] = await localStorage.getItem(
      "Auth1"
    );
    axios
      .get("http://localhost:3000/users/me")
      .then((response) => {
        let x = this.state.show;
        this.setState({ users: response.data, show: !x });
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  deleteHandler = async () => {
    this.setState({ showModal: true });
    await axios
      .delete("http://localhost:3000/users/me")
      .then((response) => {
        this.props.history.push("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  showModalHandler = () => {
    let x = this.state.showModal;
    this.setState({ showModal: !x });
  };

  showEditModalHandler = async () => {
    let x = this.state.showEditModal;
    this.setState({ showEditModal: !x });
    axios.defaults.headers.common["Authorization"] = await localStorage.getItem(
      "Auth1"
    );
    axios
      .get("http://localhost:3000/users/me")
      .then((response) => {
        this.setState({ users: response.data });
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    const Auth = localStorage.getItem("Auth");
    let x = null;
    if (Auth === null) {
      x = this.props.history.push("/");
    }
    return (
      <div style={{ fontSize: "larger" }}>
        {x}
        <p>Hello {this.props.name?this.props.name:this.state.users.name}</p>
        <button
          className="btn btn-success"
          onClick={(e) => this.logoutHandler(e)}
        >
          Logout
        </button>
        &ensp;
        <button
          className="btn btn-danger"
          onClick={(e) => this.logoutAllHandler(e)}
        >
          LogOut From All Devices
        </button>
        &ensp;
        <button
          className="btn btn-primary"
          onClick={(e) => this.listUserHandler(e)}
        >
          About User
        </button>
        <br />
        {this.state.show ? (
          <>
            <br />
            <table className="table">
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>{this.state.users.name}</td>
                  <td>{this.state.users.email}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={this.showEditModalHandler}
                    >
                      Edit User
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={this.showModalHandler}
                    >
                      Delete User
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        ) : null}
        <br />
        <div>
          <Modal
            show={this.state.showModal}
            deleteUser={this.deleteHandler}
            cancel={this.showModalHandler}
          >
            Sure Want To Delete User
          </Modal>
          <EditModal
            name={this.state.users.name}
            email={this.state.users.email}
            show={this.state.showEditModal}
            cancel={this.showEditModalHandler}
            listUser={this.listUserHandler}
          >
            Edit User
            <br />
          </EditModal>
        </div>
        {this.props.ll}
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return{
    name : state.name,
    email: state.email
  }
}
const mapActionToProps = (dispatch) =>{
  return{
    load :()=> dispatch({type:"Loading"})
  }
}

export default connect(mapStateToProps,mapActionToProps)(Home);
