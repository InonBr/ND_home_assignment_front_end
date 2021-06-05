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
import { loginApi } from '../../lib/api';
import localForage from 'localforage';

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

const Login = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [wrongCredentialsShow, setWrongCredentialsShow] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    localForage.getItem('userToken').then((data) => {
      if (data) {
        window.location = 'admin/dashboard';
      } else {
        setShow(true);
      }
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    setWrongCredentialsShow(false);

    const userData = {
      email,
      password,
    };

    loginApi(userData)
      .then((response) => {
        localForage.setItem('userToken', response.data.token).then(() => {
          localStorage.setItem('loggedIn', true);
          window.location = 'admin/dashboard';
        });
      })
      .catch((err) => {
        if (err.response.data.message === 'invalid credentials') {
          setWrongCredentialsShow(true);
        }
      });
  };

  const wrongCredentials = () => {
    return (
      <Typography
        variant='h4'
        color='error'
        noWrap
        className={classes.toolbarTitle}
      >
        Wrong credentials
      </Typography>
    );
  };

  const pageForm = () => {
    return (
      <>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color='primary'>
              <h4 className={classes.cardTitleWhite}>Login Form</h4>
            </CardHeader>

            <CardBody>
              <form onSubmit={(event) => handleSubmit(event)}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
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

                    {wrongCredentialsShow && wrongCredentials()}
                  </GridItem>
                </GridContainer>

                <GridContainer>
                  <Grid item xs={12} sm={6}>
                    <CardFooter>
                      <GridContainer>
                        <Button color='primary' type='submit'>
                          Login
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
      {show && pageForm()}
      {!show && <h1>Loading...</h1>}
    </>
  );
};

export default Login;
