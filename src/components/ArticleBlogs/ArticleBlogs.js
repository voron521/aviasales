import { useEffect, useRef } from 'react';
import './ArticleBlogs.scss';
import { useDispatch, useSelector } from 'react-redux';
import {selectblogs, selectchoseArticle, selectregistrationUserInfo, selectDeleteArticleWindow} from '../../store/selectors';
import like from './Vector.svg';
import { Link, useParams } from 'react-router-dom';
import deleteArticleImage from '../../assets/DeleteArticleWindow/removeicon.svg'
import {
  setTickets,
  loadError,
  fetchPosts,
  addSearchId,
  setAllTickets,
  fetchDeleteArticle,
  setChoseArticle,
  setDeleteArticleWindow
  
  
} from '../../store/BlogsSlice';



function ArticleBlogs() {
    const userInfo = useSelector(selectregistrationUserInfo)
    const { slug } = useParams();
    const dispatch = useDispatch();
    const choseArticle = useSelector(selectchoseArticle);
    const deleteArticleWindow = useSelector(selectDeleteArticleWindow);
    const deleteWindowRef = useRef(null);
    const formatDate = (dateString) => {
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
      }

      useEffect(() => {
        setSlug(slug);
      }, [slug]);
    
    const makeTags = (tagsArr) => {
        let resultTags = []
    
        if (tagsArr.length > 0) {
            resultTags = tagsArr.map((tag) => {
                return <div className='tags'>{tag}</div>
            })
        } 
    return resultTags
    }
    const setSlug = (slug) => {
        dispatch(setChoseArticle(slug))
        // console.log("slug", slug)
    }
   const deleteArticle = (slugToDelete) => {
    
    console.log("slugToDelete:", slugToDelete)
        const apiKey = userInfo.token
        console.log("slugToDelete:", slugToDelete, apiKey)
        dispatch(fetchDeleteArticle({slugToDelete, apiKey}))
        deleteWindow()
   }

   const deleteWindow = () => {
    dispatch(setDeleteArticleWindow())

   }

   useEffect(() => {
    const handleClickOutside = (event) => {
      if (deleteWindowRef.current && !deleteWindowRef.current.contains(event.target)) {
        deleteWindow();
      }
    };

    if (deleteArticleWindow) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [deleteArticleWindow]);

   const blogs = useSelector(selectblogs);
   console.log(blogs)
    const resultBlogs = blogs.map((blog) => {
        if (choseArticle && choseArticle!==blog.slug) {
            return
        }

        
            return (
                <article key={blog.slug} className="blog_artickl">

                    <div className='left_artickl'>
                        <div className='left_artickl_top'>
                            <Link to={`/articles/${blog.slug}`} className='link_title'><span data-slug={blog.slug} onClick={(event) => setSlug(event.target.getAttribute('data-slug'))} className="title">{blog.title}></span></Link>
                            
                            <img className='like_img' src={like} alt="" />
                            <span className='count_like'>{blog.favoritesCount}</span>
                        </div>
                        <div className='left_artickl_middle'>
                            {makeTags(blog.tagList)}
                        </div>
                        <div className='left_artickl_bottom'>
                            <span>{blog.description}</span>
                        </div>
                    </div>
                    <div className='right_artickl'>
                        <div className='right_artickl_text'>
                            <div className='name_and_picture_wrapper'>
                                <div className='name_and_date_wrapper'>
                                    <span className='name_author'>
                                        {blog.author.username}
                                    </span>
                                    <span>
                                        {formatDate(blog.createdAt)}
                                    </span>
                                </div>
                                <div className='right_artickl_avatar'>
                                    <img className='image_avatar' src={blog.author.image}/>
                                </div>
                                
                            </div>
             
                            {userInfo!==null && userInfo.username===blog.author.username && slug ?
                                        <div className='button_article_wrapper'>
                                {deleteArticleWindow?
                                    <div className='delete_window_wrapper'>

                                    
                                        <div className='delete_article_window' ref={deleteWindowRef}>
                                            <div className='delete_article_window_top'>
                                                <img className='delete_img' src={deleteArticleImage} />
                                                <span className='span_delete_window'>Are you sure to delete this article?</span>
                                            </div>
                                            <div className='delete_article_window_bottom'>
                                                <button className='modal_window_button no_button' onClick={deleteWindow}>No</button>
                                                <button className='modal_window_button yes_button' onClick={()=> {deleteArticle(blog.slug)}}>Yes</button>
                                            </div>
                                        </div>
                                    </div>
                                : null}
                                <button className='article_button delete_article' onClick={deleteWindow}>delete</button>
                                <Link to={`/articles/${blog.slug}/edit`} className='article_button edit_article'>edit</Link>
                            </div>
                            : null}

                        </div>

                        
                    </div>
                    
                </article>

            )
        
    })
  return <>{resultBlogs}</>;
}

export default ArticleBlogs;
