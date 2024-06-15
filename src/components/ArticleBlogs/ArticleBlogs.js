import { useEffect, useRef } from 'react';
import './ArticleBlogs.scss';
import { useDispatch, useSelector } from 'react-redux';
import {selectblogs, selectchoseArticle} from '../../store/selectors';
import like from './Vector.svg';
import { Link, useParams } from 'react-router-dom';
import {
  setTickets,
  loadError,
  fetchPosts,
  addSearchId,
  setAllTickets,
  setAllTicketsLoad,
  setChoseArticle
  
  
} from '../../store/BlogsSlice';

setChoseArticle

function ArticleBlogs() {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const choseArticle = useSelector(selectchoseArticle);
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
                    
                </article>

            )
        
    })
  return <>{resultBlogs}</>;
}

export default ArticleBlogs;
