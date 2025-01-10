import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loader from './Loader';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

  static defaultProps={
 country : 'us',
 category: 'general'
  }

  static propsTypes={
country: PropTypes.string, 
category: PropTypes.string,
  }

  capitalizeFirstLetter=(val)=> {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
  constructor(props){
    super(props);
    this.state={
      articles : [],
      loading : true,
      page : 1,
      totalResults: 0
    }
    document.title=`NewsMonkey - ${this.capitalizeFirstLetter(this.props.category)}`
  }

updateNews= async()=>{
  this.props.setProgress(10);
    try{ 
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}` ;      
      this.setState({loading: true}); 
      const res = await fetch(url);
      this.props.setProgress(40);
        const data = await res.json();
        this.props.setProgress(70);
        this.setState({
          loading:false,
          articles: data.articles,
          totalResults: data.totalResults,
        });
    }
    catch(e) {
        console.log("something is not working");
    }
    this.props.setProgress(100);
  }

componentDidMount(){
   this.updateNews();
}

// handleNextClick= async ()=>{
//   try{ 
//     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;      
//     this.setState({loading: true});  
//     const res = await fetch(url);
//       const data = await res.json();
//       this.setState({
//         loading: false,
//         page : this.state.page+1,
//         articles: data.articles
//       });
//   }
//   catch(e) {
//       console.log("something is not working");
//   }
// }
// handlePreviousClick= async ()=>{
//   try{ 
//     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;      
//     this.setState({loading: true}); 
//     const res = await fetch(url);
//       const data = await res.json();
//       this.setState({
//         page : this.state.page-1,
//         articles: data.articles,
//         loading: false,
//       });
//   }
//   catch(e) {
//       console.log("something is not working");
//   }

// }

fetchMoreData = async() => {
 this.setState({page:this.state.page+1});
 try{ 
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}` ;      
  const res = await fetch(url);
    const data = await res.json();
    this.setState({
      articles: this.state.articles.concat(data.articles),
      totalResults: data.totalResults,
    });
}
catch(e) {
    console.log("something is not working");
}
};

  render() {
    return (
     <>
      <h1 className='text-center my-5'>Top {this.capitalizeFirstLetter(this.props.category)} Headlines!</h1>
      {this.state.loading && <Loader/>}
      <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Loader/>}
        >
           <div className='container'>
      <div className="row">
        {this.state.articles.map((element) =>{
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
}

export default News
