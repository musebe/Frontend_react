/* eslint-disable quotes */
/* eslint-disable no-console */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-max-props-per-line */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
// Externals
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import validate from 'validate.js';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  Button,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@material-ui/core';

// Material icons
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';

// Shared utilities
import validators from 'common/validators';

// Component styles
import styles from './styles';

validate.validators.checked = validators.checked;

class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      password: '',
      errors: ''
    };
  }

  handleBack = () => {
    const { history } = this.props;

    history.goBack();
  };

  clickSubmit = event => {
    event.preventDefault();
    const { name, email, password } = this.state;
    const user = {
      name,
      email,
      password
    };
    // console.log(user);
    axios
      .post(`https://backend.saadabot.com/api/business`, { ...user })
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { name, email, password } = this.state;
    return (
      <div className={classes.root}>
        <Grid className={classes.grid} container>
          <Grid className={classes.quoteWrapper} item lg={5}>
            <div className={classes.quote}>
              <div className={classes.quoteInner}>
                <Typography className={classes.quoteText} variant="h1">
                  Attend To Your Customers Anytime, Anywhere.
                </Typography>
                <div className={classes.person}>
                  <Typography className={classes.name} variant="body1">
                    Saadabot
                  </Typography>
                  <Typography className={classes.bio} variant="body2">
                    Dedicated to serving you
                  </Typography>
                </div>
              </div>
            </div>
          </Grid>
          <Grid className={classes.content} item lg={7} xs={12}>
            <div className={classes.content}>
              <div className={classes.contentHeader}>
                <IconButton
                  className={classes.backButton}
                  onClick={this.handleBack}>
                  <ArrowBackIcon />
                </IconButton>
              </div>
              <div className={classes.contentBody}>
                <form className={classes.form}>
                  <Typography variant="h2">Create new account</Typography>

                  <Typography variant="body1">
                    Use your business email to create new account... it's free.
                  </Typography>

                  <div className={classes.fields}>
                    <TextField
                      className={classes.textField}
                      label="Business Name"
                      name="name"
                      onChange={this.handleChange('name')}
                      value={name}
                      variant="outlined"
                    />

                    <TextField
                      className={classes.textField}
                      label="Email address"
                      name="email"
                      onChange={this.handleChange('email')}
                      value={email}
                      variant="outlined"
                    />

                    <TextField
                      className={classes.textField}
                      label="Password"
                      onChange={this.handleChange('password')}
                      type="password"
                      value={password}
                      variant="outlined"
                    />
                  </div>

                  <Button
                    className={classes.signUpButton}
                    color="primary"
                    onClick={this.clickSubmit}
                    size="large"
                    variant="contained">
                    Sign up now
                  </Button>

                  <Typography className={classes.signIn} variant="body1">
                    Have an account?{' '}
                    <Link className={classes.signInUrl} to="/sign-in">
                      Sign In
                    </Link>
                  </Typography>
                </form>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

SignUp.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  withStyles(styles)
)(SignUp);
