import React, { useState, useEffect, useReducer , useContext} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../context/auth-context';
import Input from '../UI/Input/Input';

const emailReducer = (state , action)=> {
  if (action.type === 'USER_INPUT'){
     return {value : action.val , isValid : action.val.includes('@')}
  }
  if (action.type === 'INPUT_BLUR'){
    return {value : state.value , isValid : state.value.includes('@')}
  }
     return {value: '', isValid : false}
}

const passwordReducer = (state , action)=> {
  if (action.type === 'USER_PASSWORD'){
     return {value : action.val , isValid : action.val.length>6}
  }
  if (action.type === 'Password_BLUR'){
    return {value : state.value , isValid : state.value.length>6}
  }
     return {value: '', isValid : false}
}

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [enteredCollege , setEnteredCollege] = useState('');
  const [collegeIsValid, setCollegeIsValid] = useState();


  const [emailState , dispatchEmail] = useReducer(emailReducer,{
    value : '',
    isValid : null,

  });

  const [passwordState , dispatchPassword] = useReducer(passwordReducer,{
    value : '',
    isValid : null,

  });
  

  // useEffect( ()=> {

  //   const identifier = setTimeout ( ()=>{
  //     console.log('Check for validity')
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredCollege.trim().length >0
  //     );
  //   } , 500);
  //     return ()=> {
  //        console.log('CleanUp');
  //        clearTimeout(identifier)
  //     }
   
  // },
  // [enteredEmail,enteredPassword,enteredCollege])

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);

    dispatchEmail ( {
      type : 'USER_INPUT',
      val : event.target.value
    })

    setFormIsValid(
      event.target.value.includes('@') && enteredPassword.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);

    dispatchPassword({
      type : 'USER_PASSWORD',
      val : event.target.value
    })

    setFormIsValid(
      emailState.isValid && event.target.value.trim().length > 6
    );
  };

  const collegeChangeHandler = (event) => {
      setEnteredCollege(event.target.value);
  }

  const validateEmailHandler = () => {
    setEmailIsValid(emailState.isValid);
    dispatchEmail({type : 'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({type:'Password_BLUR'})
  };

  const validateCollegeHandler = () => {
    setCollegeIsValid(enteredCollege.trim().length >0);
  }


  const authCtx = useContext(AuthContext)

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogIn(emailState, passwordState);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        
        <Input 
               type="email"
               id="email"
               label = 'email'
               isValid = {emailIsValid}
               value={emailState.value}
               onChange={emailChangeHandler}
               onBlur={validateEmailHandler}
        ></Input>
        <Input 
               type="password"
               id="password"
               label = 'password'
               isValid = {passwordIsValid}
               value={passwordState.value}
               onChange={passwordChangeHandler}
               onBlur={validatePasswordHandler}
        ></Input>
        <Input 
               type="text"
               id="college"
               label = 'college'
               isValid = {collegeIsValid}
               value={enteredCollege}
               onChange={collegeChangeHandler}
               onBlur={validateCollegeHandler}
        ></Input>

        {/* <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />

        </div> */}
        {/* <div
          className={`${classes.control} ${
            passwordState.isValid=== false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        
        </div> */}
        {/* <div 
            className={`${classes.control} ${
              collegeIsValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="collegeName">College Name</label>
          <input
            type="text"
            id="college"
            value={enteredCollege}
            onChange={collegeChangeHandler}
            onBlur={validateCollegeHandler}
          />


        </div> */}
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
