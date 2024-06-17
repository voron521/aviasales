import './CreateArticle.scss';

// eslint-disable-next-line import/no-extraneous-dependencies
import { LoadingOutlined } from '@ant-design/icons';
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { fetchLogInUser, setUserInfo, setregistrationNewUserError, fetchEditUser, setMyArticles, fetchNewArticle, setTagsList, setTagsListChangeItem, setTagsListDeleteItem } from '../../store/BlogsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selecTagsList, selectRegistrationNewUserError, selectregistrationUserInfo } from '../../store/selectors';

function CreateArticle() {
  const tagsList = useSelector(selecTagsList);
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm();
  const registrationUserInfo = useSelector(selectregistrationUserInfo);

  const addNewArticle = async (event) => {
    const data = {
        "article": {
          "title": event.title,
          "description": event.description,
          "body": event.text,
          "tags": tagsList
        }
    };
    try {
      const apiKey = registrationUserInfo.token;
      const res = await dispatch(fetchNewArticle({ data, apiKey }));
      dispatch(setTagsList('clean'));
      if (res.error) {
      } else {
        dispatch(setMyArticles(data));
        reset({
          title: '',
          description: '',
          text: '',
          tagadd: '',
        });
      }
    } catch (error) {
      console.error('Error edit user:', error);
    }
  };
  
  const addTag = () => {
    const tagValue = watch('tagadd');
    // const titleValue = watch('title');
    if (tagValue) {
    
      const updatedTags = tagValue;
     
      dispatch(setTagsList(updatedTags));
      setValue('tagadd', '');
      
      console.log("tagsList:", updatedTags);
    }
  };

  const handleTagChange = (index, newValue) => {
    dispatch(setTagsListChangeItem({ index, item: newValue }));
  };
  const handleTagDelete = (indexForDel) => {
    dispatch(setTagsListDeleteItem(indexForDel));
  }
  console.log("tagsList, tagsList.length", tagsList, tagsList.length)
  return (
    <form className='create_article_form' onSubmit={handleSubmit(addNewArticle)}>
      <span className='login_form_title'>Create new article</span>

      <label className="label_form" htmlFor="title">
          Title
      </label>
      <input
        className="input_create_accouont input_article"
        type="input"
        id="title"
        name="title"
        placeholder='Title'
        {...register("title", { required: true })}
      />
      {errors.title && <span className='error_input'>поле title должно быть заполнено</span>}
      
      <label className="label_form" htmlFor="description">
        Short description
      </label>
      <input
        className="input_login_accouont input_article"
        type="input"
        id="description"
        placeholder='Description'
        name="description"
        {...register("description", { required: true })}
      />
      {errors.description && <span className='error_input'>поле description должно быть заполнено</span>}

      <label className="label_form" htmlFor="text">
        Text
      </label>
      <textarea
        className="input_login_accouont input_text input_article"
        id="text"
        placeholder='Text'
        name="text"
        {...register("text", { required: true })}
      />
     {errors.text && <span className='error_input'>поле text должно быть заполнено</span>}
    
      <div className='addTagWrapper'>
      <span className='tags_title_span'>Tags</span>
      { 
          tagsList.length > 0 && tagsList.map((tag, index) => (
            <div className='new_add_tag' key={index}>
              <div className='label_inupt_wrapper'>
                <input
                  className="input_tag input_article"
                  type="input"
                  placeholder='Tag'
                  name={`tags[${index}]`}
                  value={tag}
                  onChange={(e) => handleTagChange(index, e.target.value)}
                />
              </div>
              <button
              className='tags_button delete_article_button'
              type="button"
              onClick={() => handleTagDelete(index)}
              >
                Delete
              </button>
            </div>
          ))
        }


        <div className='first_teg_input'>
          <div className='label_inupt_wrapper'>
            <label className="label_form_tags" htmlFor="tagadd">
              
            </label>
            <input
              className="input_tag input_article"
              type="input"
              id="tagadd"
              placeholder='Tag'
              name="tagadd"
              {...register("tagadd")}
            />
          </div>
          <button className='tags_button delete_article_button' type="button">Delete</button>
          <button className='tags_button add_article_button' type="button" onClick={addTag}>Add tag</button>
        </div>

       
      </div>

      <button className='send_article_button' type="submit">Send</button>
    </form>
  );
}

export default CreateArticle;