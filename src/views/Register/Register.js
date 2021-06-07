import React, { useState, useEffect } from 'react';
import Card from '../../components/Card/Card';
import Button from 'components/CustomButtons/Button';
import GridItem from 'components/Grid/GridItem';
import CardFooter from 'components/Card/CardFooter';
import CardHeader from 'components/Card/CardHeader';
import { makeStyles } from '@material-ui/core/styles';
import CardBody from 'components/Card/CardBody';
import GridContainer from 'components/Grid/GridContainer';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { registerApi } from '../../lib/api';
import localForage from 'localforage';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
};

const useStyles = makeStyles(styles);

const Register = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [lessThenSix, setLessThenSix] = useState(false);
  const [passwordConfirmNoMatch, setPasswordConfirmNoMatch] = useState(false);
  const [userExist, setUserExist] = useState(false);
  const [show, setShow] = useState(false);
  const state = useSelector((state) => state);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (state.logedin) {
      history.push('admin/dashboard');
    } else {
      setShow(true);
    }
  }, [history, state.logedin]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = passwordErrors();

    if (errors) {
      return;
    }

    const newUser = {
      username,
      email,
      firstName,
      lastName,
      password,
      passwordConfirm,
    };

    registerApi(newUser)
      .then((response) => {
        const userToken = 'userToken';

        localForage.setItem(userToken, response.data.token).then(() => {
          dispatch({ type: 'login' });
          history.push('admin/dashboard');
        });
      })
      .catch((err) => {
        if (err.response.data.message.includes('duplicate')) {
          setUserExist(true);
        }
      });
  };

  const passwordErrors = () => {
    let errors = false;

    setLessThenSix(false);
    setPasswordConfirmNoMatch(false);
    setUserExist(false);

    if (password.length < 6) {
      setLessThenSix(true);
      errors = true;
    } else if (passwordConfirm !== password) {
      setPasswordConfirmNoMatch(true);
      errors = true;
    }

    return errors;
  };

  const atLeastSixMassage = () => {
    return (
      <Typography
        variant='p'
        color='error'
        noWrap
        className={classes.toolbarTitle}
      >
        *Password must contain at least 6 characters
      </Typography>
    );
  };

  const passwordConfirmFail = () => {
    return (
      <Typography
        variant='p'
        color='error'
        noWrap
        className={classes.toolbarTitle}
      >
        *Passwords must match
      </Typography>
    );
  };

  const userAlreadyExists = () => {
    return (
      <Typography
        variant='h4'
        color='error'
        noWrap
        className={classes.toolbarTitle}
      >
        User already exists
      </Typography>
    );
  };

  const registerForm = () => {
    return (
      <>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color='primary'>
              <h4 className={classes.cardTitleWhite}>Register Form</h4>
            </CardHeader>

            <CardBody>
              <form onSubmit={(event) => handleSubmit(event)}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      name='username'
                      label='Username'
                      type='text'
                      id='username'
                      formControlProps={{
                        fullWidth: true,
                      }}
                      onInput={(event) => setUsername(event.target.value)}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      name='email'
                      label='Email Address'
                      type='email'
                      id='email'
                      pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
                      formControlProps={{
                        fullWidth: true,
                      }}
                      onInput={(event) => setEmail(event.target.value)}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      name='firstName'
                      label='First Name'
                      type='text'
                      id='firstName'
                      formControlProps={{
                        fullWidth: true,
                      }}
                      onInput={(event) => setFirstName(event.target.value)}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      name='lastName'
                      label='Last Name'
                      type='text'
                      id='lastName'
                      formControlProps={{
                        fullWidth: true,
                      }}
                      onInput={(event) => setLastName(event.target.value)}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      name='password'
                      label='Password'
                      type='password'
                      id='password'
                      formControlProps={{
                        fullWidth: true,
                      }}
                      onInput={(event) => setPassword(event.target.value)}
                    />

                    {lessThenSix && atLeastSixMassage()}
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                      margin='normal'
                      required
                      fullWidth
                      name='passwordConfirm'
                      label='Password Confirm'
                      type='password'
                      id='passwordConfirm'
                      formControlProps={{
                        fullWidth: true,
                      }}
                      onInput={(event) =>
                        setPasswordConfirm(event.target.value)
                      }
                    />

                    {passwordConfirmNoMatch && passwordConfirmFail()}
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  {userExist && userAlreadyExists()}

                  <Grid item xs={12} sm={6}>
                    <CardFooter>
                      <GridContainer>
                        <Button color='primary' type='submit'>
                          Register
                        </Button>
                      </GridContainer>
                    </CardFooter>
                  </Grid>
                </GridContainer>
              </form>
            </CardBody>
          </Card>
        </GridItem>
      </>
    );
  };

  return (
    <>
      {show && registerForm()}
      {!show && <h1>Loading...</h1>}
    </>
  );
};

export default Register;
