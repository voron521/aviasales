import './EditUser.scss';

// eslint-disable-next-line import/no-extraneous-dependencies
import { LoadingOutlined } from '@ant-design/icons';
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { fetchLogInUser, setUserInfo, setregistrationNewUserError, fetchEditUser } from '../../store/BlogsSlice';
import { useDispatch, useSelector } from 'react-redux';

import { selectRegistrationNewUserError, selectregistrationUserInfo } from '../../store/selectors';

function EditUser() {

  const dispatch = useDispatch();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const registrationUserInfo = useSelector(selectregistrationUserInfo);
  const submitLogInUser = async (event) => {
    console.log("event в Edit",event)

    const data = {
      username: event.username,
      email: event.email,
      password: event.password,
      avatarImage: event.avatarImage,
    };
    try {
      console.log("registrationUserInfo перед редактированием: ",registrationUserInfo)
      const apiKey = registrationUserInfo.token
      const res = await dispatch(fetchEditUser({ data, apiKey }));
      console.log("res edit user:", res)
      if (res.error) {
        dispatch(setregistrationNewUserError(true));
      } else {
        // data.token = res.meta.arg.apiKey
        // let newUserinfo = res.meta.arg.data.
        const userJson = JSON.stringify(res.payload.user);
        localStorage.setItem('user', userJson);
        dispatch(setUserInfo(res.payload.user));
        dispatch(setregistrationNewUserError(false));

      }
    } catch (error) {
      console.error('Error edit user:', error);
      dispatch(setregistrationNewUserError(true));
    }

    
  };


  return (
    <form className='edit_form' onSubmit={handleSubmit(submitLogInUser)}>
      <span className='login_form_title'>Edit Profile</span>

      <label className="label_form" htmlFor="username">
          Username
        </label>
        <input
          className="input_create_accouont"
          type="input"
          id="username"
          name="username"
          placeholder='Username'
          {...register("username", { required: true, minLength: 3, maxLength: 20 })}
          
        />
    
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
        New password
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

      <label className="label_form" htmlFor="avatar_image">
        Avatar image (url)
      </label>
      <input
        className="input_login_accouont"
        type="input"
        id="avatarImage"
        placeholder='Avatar image'
        name="avatarImage"
        {...register("avatarImage", { required: true, pattern:  /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i } )}
        
      />
      {errors.avatar_image && <span className='error_input'>url должен быть корректным</span>}

    
      <button className='login_button' type="submit">Save</button>
      {/* <span className='signin_span'>Don’t have an account?<Link to="/signup" className="signin_link">Sign Up</Link></span>
      <span className='error_registration'>{registrationUserInfo ? `${registrationUserInfo.username} Вы успешно вошли в аккаунт` : null}</span> */}


    </form>
  );
}

export default EditUser;
