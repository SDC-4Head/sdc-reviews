/* eslint-disable class-methods-use-this */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/extensions */
// This component is responsible for the search bar, filtering drop-down menu,
// each review, and finally, the pagination controls.
import React from 'react';
import $ from 'jquery';
import ReviewItem from './ReviewItem.jsx';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewsToDisplay: {},
      searchValue: '',
      page: 1
    };
    this.onSearch = this.onSearch.bind(this);
    this.onSort = this.onSort.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.findAndReplaceParam = this.findAndReplaceParam.bind(this);
  }

  componentDidMount() {
    this.getReviews(window.location.pathname + window.location.search);
  }

  // eslint-disable-next-line class-methods-use-this
  onSearch() {
    event.preventDefault();
    const url = window.location.href.split('?');
    const { searchValue } = this.state;

    const base = url[0]; // > "www.url.com"
    const qs = url[1]; // > "// > "sortby=relevant&&search=dolor""

    if (searchValue === '') {
      window.history.replaceState({}, '', base);
      this.getReviews(window.location.pathname + window.location.search);
    } else if (qs === undefined) {
      const newQs = `search=${searchValue}`;
      const newUrl = `${base}?${newQs}`;
      window.history.replaceState({}, '', newUrl);
    } else {
      const newQs = this.findAndReplaceParam('search', searchValue);
      const newUrl = `${base}?${newQs}`;
      window.history.replaceState({}, '', newUrl);
    }

    this.getReviews(window.location.pathname + window.location.search);
  }

  onSort() {
    event.preventDefault();
    const url = window.location.href.split('?');

    const selected = document.getElementById('sortby').value || 'relevant';
    const base = url[0]; // > "www.url.com"
    const qs = url[1]; // > "// > "sortby=relevant&&search=dolor""

    if (qs === undefined) {
      const newQs = `sortby=${selected}`;
      const newUrl = `${base}?${newQs}`;
      window.history.replaceState({}, '', newUrl);
    } else {
      const newQs = this.findAndReplaceParam('sortby', selected);
      const newUrl = `${base}?${newQs}`;
      window.history.replaceState({}, '', newUrl);
    }

    this.getReviews(window.location.pathname + window.location.search);
  }

  // onPageFlip(event) {}

  getReviews(path, searchterm = null) {
    $.ajax({
      url: `/api/reviews${path}`,
      type: 'GET',
      dataType: 'json',
      success: data => {
        this.setState({
          reviewsToDisplay: data
        });
      },
      error: (xhr, stat, err) => console.log('There was an error fetching the reviews', err)
    });
  }

  findAndReplaceParam(param, value) {
    const qs = window.location.search.slice(1).split('&&'); // > "[sortby=relevant, search=dolor]"
    let added = false;
    qs.forEach((parameter, i) => {
      if (parameter.includes(param)) {
        qs[i] = `${param}=${value}`;
        added = true;
      }
    });
    if (!added) {
      qs.push(`${param}=${value}`);
    }
    return qs.join('&&');
  }

  handleChange(event) {
    this.setState({
      searchValue: event.target.value
    });
  }

  render() {
    const { reviewsToDisplay } = this.state;
    const { searchValue } = this.state;

    return (
      <div>
        <form onSubmit={this.onSearch}>
          <input
            type="text"
            placeholder="Search Reviews"
            value={searchValue}
            onChange={this.handleChange}
          />
        </form>
        <select id="sortby" onChange={this.onSort}>
          <option value="relevant">Most Relevant</option>
          <option value="recent">Most Recent</option>
        </select>
        <div>
          {Array.isArray(reviewsToDisplay) ? (
            reviewsToDisplay.map(review => <ReviewItem review={review} />)
          ) : (
            <p>reviews loading...</p>
          )}
        </div>
      </div>
    );
  }
}

export default ReviewList;
