import { useEffect, useRef } from 'react';
import './ChoseArticle.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectblogs, selectLimitArticles, selectCurrentPage, selectTotalResults } from '../../store/selectors';




function ChoseArticle() {


  return (
        <article key={blog.slug} className="blog_artickl">
            <div className='left_artickl'>
                <div className='left_artickl_top'>
                    <Link to={`/${blog.slug}`} className='link_title'><span className="title">{blog.title}</span></Link>
                    
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
  );
}

export default ChoseArticle;
