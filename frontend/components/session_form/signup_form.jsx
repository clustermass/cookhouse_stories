import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width :'525px',
    height: '560px',
    backgroundColor: 'rgba(0,0,0,0.5)'
  }
};

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      name: '',
      modalIsOpen: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount(){
    Modal.setAppElement(document.getElementById('root'));
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // This gives wierd error... example was taken from github https://github.com/reactjs/react-modal
    // this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.props.history.push(this.props.fromPath);
    this.setState({modalIsOpen: false});

  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }


  render() {
    return (
      <div className="login-form-container">

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}

        >

        <form onSubmit={this.handleSubmit} className="login-form-box">
          Welcome to Cookhouse Stories!
          <br/>
          Please {this.props.formType} or <Link to={{pathname:'/login', state:{fromPath:this.props.fromPath}}}>log in instead</Link>
          <div className="login-form">
            <br/>
            <label>Username:
              <input type="text"
                value={this.state.username}
                onChange={this.update('username')}
                className="login-input"
              />
            </label>
            <br/>
            <label>Password:
              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
                className="login-input"
              />
            </label>
          <br/>
          <label>Name:
            <input type="text"
              value={this.state.name}
              onChange={this.update('name')}
              className="name-input"
            />
          </label>
            <br/>
            <input className="session-submit" type="submit" value={this.props.formType} />
          </div>
        </form>
      </Modal>

      </div>
    );
  }
}

export default withRouter(SignUpForm);
