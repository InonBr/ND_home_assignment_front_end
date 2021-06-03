import React, { useEffect, useState } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import TextField from '@material-ui/core/TextField';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardAvatar from 'components/Card/CardAvatar.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import localForage from 'localforage';
import jwt_decode from 'jwt-decode';
import { updateUserApi } from '../../lib/api';

import avatar from 'assets/img/faces/marc.jpg';

const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0px',
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
  textFieldMargin: {
    marginTop: '27px',
  },
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState({});

  useEffect(() => {
    localForage.getItem('userToken').then((data) => {
      if (data) {
        setToken(data);
        const decodedToken = jwt_decode(data);
        setUserData(decodedToken);
        setShow(true);
      } else {
        window.location = 'admin/dashboard';
      }
    });
  }, []);

  const formSubmit = (event) => {
    updateUserApi(userData, token).then((response) => {
      localForage.setItem('userToken', response.data.token).then(() => {
        window.location = 'admin/dashboard';
      });
    });
  };

  const pageData = () => {
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color='primary'>
                <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
                <p className={classes.cardCategoryWhite}>
                  Complete your profile
                </p>
              </CardHeader>

              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={5}>
                    <CustomInput
                      labelText='Company (disabled)'
                      id='company-disabled'
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        disabled: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <TextField
                      className={classes.textFieldMargin}
                      defaultValue={userData.username}
                      margin='normal'
                      label='Username'
                      id='username'
                      type='text'
                      fullWidth={true}
                      required
                      onInput={(event) => {
                        event.persist();
                        setUserData((userData) => ({
                          ...userData,
                          username: event.target.value,
                        }));
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      className={classes.textFieldMargin}
                      label='Email address'
                      id='email-address'
                      required
                      type='email'
                      defaultValue={userData.email}
                      fullWidth={true}
                      onInput={(event) => {
                        event.persist();
                        setUserData((userData) => ({
                          ...userData,
                          email: event.target.value,
                        }));
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      className={classes.textFieldMargin}
                      defaultValue={userData.firstName}
                      label='First Name'
                      id='first-name'
                      type='text'
                      required
                      fullWidth={true}
                      onInput={(event) => {
                        event.persist();
                        setUserData((userData) => ({
                          ...userData,
                          firstName: event.target.value,
                        }));
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <TextField
                      className={classes.textFieldMargin}
                      defaultValue={userData.lastName}
                      label='Last Name'
                      type='text'
                      required
                      id='last-name'
                      fullWidth={true}
                      onInput={(event) => {
                        event.persist();
                        setUserData((userData) => ({
                          ...userData,
                          lastName: event.target.value,
                        }));
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      className={classes.textFieldMargin}
                      defaultValue={userData.city}
                      label='City'
                      id='city'
                      fullWidth={true}
                      onInput={(event) => {
                        event.persist();
                        setUserData((userData) => ({
                          ...userData,
                          city: event.target.value,
                        }));
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      className={classes.textFieldMargin}
                      defaultValue={userData.country}
                      label='Country'
                      id='country'
                      fullWidth={true}
                      onInput={(event) => {
                        event.persist();
                        setUserData((userData) => ({
                          ...userData,
                          country: event.target.value,
                        }));
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      className={classes.textFieldMargin}
                      defaultValue={userData.postalCode}
                      label='Postal Code'
                      id='postal-code'
                      fullWidth={true}
                      onInput={(event) => {
                        event.persist();
                        setUserData((userData) => ({
                          ...userData,
                          postalCode: event.target.value,
                        }));
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <InputLabel style={{ color: '#AAAAAA', marginTop: '18px' }}>
                      About me
                    </InputLabel>
                    <TextField
                      defaultValue={userData.aboutMe}
                      label="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                      id='about-me'
                      fullWidth={true}
                      onInput={(event) => {
                        event.persist();
                        setUserData((userData) => ({
                          ...userData,
                          aboutMe: event.target.value,
                        }));
                      }}
                      rows='5'
                      multiline={true}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>

              <CardFooter>
                <Button color='primary' onClick={(event) => formSubmit(event)}>
                  Update Profile
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card profile>
              <CardAvatar profile>
                <a href='#pablo' onClick={(e) => e.preventDefault()}>
                  <img src={avatar} alt='...' />
                </a>
              </CardAvatar>
              <CardBody profile>
                <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
                <h4 className={classes.cardTitle}>Alec Thompson</h4>
                <p className={classes.description}>
                  Don{"'"}t be scared of the truth because we need to restart
                  the human foundation in truth And I love you like Kanye loves
                  Kanye I love Rick Owens’ bed design but the back is...
                </p>
                <Button color='primary' round>
                  Follow
                </Button>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  };

  return <>{show && pageData()}</>;
}
