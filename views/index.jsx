var React = require('react');
var Layout = require('./layout');

var Homepage = React.createClass({
  render: function() {
    return (
      <Layout>
      <h1>Welcome</h1>
        <LogoutPanel userEmail={this.props.userEmail} />
        <a href="/log_in">Log In</a>
        <b> or </b>
        <a href="/sign_up">Sign Up</a>
      </Layout>
    );
  }
})

var LogoutPanel = React.createClass({
  render: function(){
    return (
      <div className="logout_panel">
        <em>Logged in as: {this.props.userEmail} </em>
        <a href="/log_out">Logout</a>
        <br/>
      </div>
    )
  }
})

module.exports = Homepage;
