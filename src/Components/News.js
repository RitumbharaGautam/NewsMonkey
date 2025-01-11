import React, {useEffect, useState} from 'react';
import NewsItem from './NewsItem';
import Loader from './Loader';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


function News(props){
  const [articles, setArticles] = useState([])
  const [loading, setloading] = useState(true)
  const [page, setpage] = useState(1)
  const [totalResults, settotalResults] = useState(0)
  
    const capitalizeFirstLetter=(val)=> {
      return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }
  document.title=`NewsMonkey - ${capitalizeFirstLetter(props.category)}`;
  
const updateNews= async()=>{
  props.Progress(10);
    try{ 
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}` ;      
        setloading(true); 
        const res = await fetch(url);
        props.Progress(40);
        const data = await res.json();
        props.Progress(70);
        setArticles(data.articles);
        settotalResults(data.totalResults);
        setloading(false);
        
    }
    catch(e) {
        console.log("something is not working");
    }
    props.Progress(100);
  }
useEffect(() =>{
  updateNews();
  //eslint-disable-next-line
},[]);

const fetchMoreData = async() => {
 setpage(page+1);
 try{ 
  let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}` ;      
  const res = await fetch(url);
    const data = await res.json();
    setArticles(articles.concat(data.articles));
    settotalResults(data.totalResults);
}
catch(e) {
    console.log("something is not working");
}
}
    return (
     <>
      <h1 className='text-center my-5 pt-5'>Top {capitalizeFirstLetter(props.category)} Headlines!</h1>
      {loading && <Loader/>}
      <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Loader/>}
        >
           <div className='container'>
      <div className="row">
        {articles.map((element) =>{
          return(
            <div className="col-md-4 col-sm-12 d-flex justify-content-center mb-3"  key={element.url}> 
            <NewsItem source={element.source.name} title={(element.title)?element.title.substring(0, 45) : ""} description={(element.description)?element.description.substring(0, 100):""} imageUrl={(element.urlToImage)?element.urlToImage:"https://www.northampton.ac.uk/wp-content/uploads/2018/11/default-svp_news.jpg"} newsUrl={element.url} author={element.author?element.author:"Unknown"} publishedAt={element.publishedAt}/> 
            </div>
          );
        })}
        </div ></div>
        </InfiniteScroll>
      </>
    )
  }
News.callerdefaultProps={
  country : 'us',
  category: 'general'
   }
 
News.propsTypes={
 country: PropTypes.string, 
 category: PropTypes.string,
   }

export default News
