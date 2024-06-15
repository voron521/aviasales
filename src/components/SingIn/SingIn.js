import './SingIn.scss';

// eslint-disable-next-line import/no-extraneous-dependencies
import { LoadingOutlined } from '@ant-design/icons';
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { fetchLogInUser, setUserInfo, setregistrationNewUserError } from '../../store/BlogsSlice';
import { useDispatch, useSelector } from 'react-redux';

import { selectRegistrationNewUserError, selectregistrationUserInfo } from '../../store/selectors';

function SingIn() {

  const dispatch = useDispatch();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const registrationUserInfo = useSelector(selectregistrationUserInfo);
  const submitLogInUser = async (event) => {
    console.log("event",event)
    // event.preventDefault();
    // const formData = new FormData(event.target);
    const data = {
      email: event.email,
      password: event.password,
    };
    try {
      const res = await dispatch(fetchLogInUser({ data }));
      console.log("res Log In:", res)
      if (res.error) {
        dispatch(setregistrationNewUserError(true));
      } else {
        dispatch(setUserInfo(res.payload.user));
        dispatch(setregistrationNewUserError(false));

      }
    } catch (error) {
      console.error('Error registering new user:', error);
      dispatch(setregistrationNewUserError(true));
    }

    
  };


  return (
    <form className='log_in_form' onSubmit={handleSubmit(submitLogInUser)}>
      <span className='login_form_title'>Sing In</span>
    
      <label className="label_form" htmlFor="email">
        Email address
      </label>
      <input
        className="input_login_accouont"
        type="input"
        id="email"
        placeholder='Email address'
        name="email"
        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        
      />
      {errors.email && <span className='error_input'>email должен быть корректным</span>}
      <label className="label_form" htmlFor="Password">
        Password
      </label>
      <input
        className="input_login_accouont"
        type="password"
        id="Password"
        placeholder='Password'
        name="password"
        {...register("password", { required: true, minLength: 6, maxLength: 40 })}
      />
      {errors.password && <span className='error_input'>password должен быть от 6 до 40 символов</span>}

    
      <button className='login_button' type="submit">Login</button>
      <span className='signin_span'>Don’t have an account?<Link to="/signup" className="signin_link">Sign Up</Link></span>
      <span className='error_registration'>{registrationUserInfo ? `${registrationUserInfo.username} Вы успешно вошли в аккаунт` : null}</span>


    </form>
  );
}

export default SingIn;
