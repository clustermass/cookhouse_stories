import React from 'react';
import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';



const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width :'480px',
    height: '510px',
    borderCollapse: 'collapsed',
    borderRadius: '10px',
  }
};



class LogInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      modalIsOpen: true,
      placeholderUsername: 'Username',
      placeholderPassword: 'Password',
      errors: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

  this.demoLogin = this.demoLogin.bind(this)


  }


  demoLogin(e){
      this.props.createSession({username:'demo',password:'password'})

  }

componentWillMount(){
  Modal.setAppElement(document.getElementById('root'));
}

componentWillReceiveProps(nextProps){
  this.setState({
    errors: {}
  })

  this.setState({
    errors: nextProps.errors
  })
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
    this.props.clearErrors();
    this.props.processForm(user);
  }


  render() {

    return (
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          overlayClassName="overlay"
        >
          <div className="login-form-container">
          <a href="#" className="close-cross" onClick={this.closeModal}>╳</a>
           <img  src={window.peace} className="peace-icon" alt="search"/>
           <p>Welcome back!</p>
           <div className='login-screen-text'>Log in to your account</div>
           <div className="errors">{this.state.errors}</div>
         <form  >

          <br/>


        <div className="login-form">
              <input type="text"
                value={this.state.username}
                onChange={this.update('username')}
                className="login-input"
                placeholder={this.state.placeholderUsername}
              />
          </div>

              <div className="login-form">

              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
                className="login-input"
                placeholder={this.state.placeholderPassword}
              />
          </div>
          <br/>


        </form>
        <button onClick={this.handleSubmit} className="session-submit" type="submit">Submit</button>
        <button onClick={this.demoLogin} className="session-submit" type="submit">DemoLogin</button>
        <br/>
        <div className='login-screen-text-2'>I don’t have an account.
          <Link to={{pathname:'/signup', state:{fromPath:this.props.fromPath}}}> Sign-up!</Link></div>
        </div>
 </Modal>

    );
  }
}

export default withRouter(LogInForm);
