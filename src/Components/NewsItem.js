import React, { Component } from "react";

export default class NewsItem extends Component {

  render() {
    let {source, title, description, imageUrl, newsUrl, author, publishedAt} = this.props;
    return (
      <div>
        <div className="card h-100" >
          <img src={imageUrl} className="card-img-top" alt="..." />
         <div className="card-body">
         <span className=" badge rounded-pill bg-danger mb-1">{source}</span>
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p class="card-text"><small class="text-body-secondary">By {author} on {new Date(publishedAt).toGMTString()}</small></p>
            <a href={newsUrl} rel="noreferrer"  target="_blank" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    );
  }
}
