/* eslint-disable class-methods-use-this */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/extensions */
// This component is responsible for the search bar, filtering drop-down menu,
// each review, and finally, the pagination controls.
import React from 'react';
import $ from 'jquery';
import queryString from 'query-string';
import ReviewItem from './ReviewItem.jsx';
import Styles from '../styles/ReviewList.css';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewsToDisplay: {},
      searchValue: '',
      page: Number(queryString.parse(location.search).page) || 1
    };

    this.onSearch = this.onSearch.bind(this);
    this.onSort = this.onSort.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.findAndReplaceParam = this.findAndReplaceParam.bind(this);
    this.goToPage = this.goToPage.bind(this);
    this.fetchNewReviews = this.fetchNewReviews.bind(this);
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
      const newQs = this.findAndReplaceParam('search', '', true);
      const newUrl = `${base}?${newQs}`;
      window.history.replaceState({}, '', newUrl);
    } else if (qs === undefined) {
      const newQs = `search=${searchValue}`;
      const newUrl = `${base}?${newQs}`;
      window.history.replaceState({}, '', newUrl);
    } else {
      const newQs = this.findAndReplaceParam('search', searchValue, false);
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

  sortByRelevant(allReviews) {
    new Promise(resolve => {
      const byRelevance = (a, b) => b.relevance - a.relevance;
      resolve(allReviews.sort(byRelevance));
    })
  }

  sortByRecent(allReviews) {
    new Promise(resolve => {
      const byDate = (a, b) => new Date(b.dateStayed) - new Date(a.dateStayed);
      resolve(allReviews.sort(byDate));
    })
  }

  getPage(page = 1, allReviews) {
    new Promise(resolve => {
      const firstReview = page === 1 ? 0 : (page - 1) * 7;
      const lastReview = firstReview + 7;

      resolve(
        lastReview < allReviews.length
          ? allReviews.slice(firstReview, lastReview)
          : allReviews.slice(firstReview)
      );
    })
  }

  getBySearchTerm(allReviews, query = null) {
    new Promise(resolve => {
      query === null
        ? resolve(allReviews)
        : resolve(allReviews.filter(review => review.review[0].body.includes(query)));
    })
  }

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

  findAndReplaceParam(param, value, remove) {
    const qs = window.location.search.slice(1).split('&&'); // > "[sortby=relevant, search=dolor]"
    let added = false;
    if (!remove) {
      qs.forEach((parameter, i) => {
        if (parameter.includes(param)) {
          qs[i] = `${param}=${value}`;
          added = true;
        }
      });
      if (!added) {
        qs.push(`${param}=${value}`);
      }
    } else if (remove) {
      qs.forEach((parameter, i) => {
        if (parameter.includes(param)) {
          qs.splice(i, 1);
        }
      });
    }
    return qs.length > 1 ? qs.join('&&') : qs.join();
  }

  handleChange(event) {
    this.setState({
      searchValue: event.target.value
    });
  }

  fetchNewReviews() {
    const url = window.location.href.split('?');
    const { page } = this.state;
    const base = url[0]; // > "www.url.com"
    const qs = url[1]; // > "// > "sortby=relevant&&search=dolor""

    if (qs === undefined) {
      const newQs = `page=${page}`;
      const newUrl = `${base}?${newQs}`;
      window.history.replaceState({}, '', newUrl);
    } else {
      const newQs = this.findAndReplaceParam('page', page);
      const newUrl = `${base}?${newQs}`;
      window.history.replaceState({}, '', newUrl);
    }
    this.getReviews(window.location.pathname + window.location.search);
  }

  goToPage(value) {
    this.setState({ page: value }, this.fetchNewReviews);
  }

  renderPaginationButtons() {
    const { reviewQty } = this.props;
    const { page } = this.state;
    const lastPage = Math.ceil(reviewQty / 7);
    const back = <div className="pageBtn navArrow" onClick={() => {this.goToPage(page - 1)}}>«</div>;
    const forward = <div className="pageBtn navArrow" onClick={() => {this.goToPage(page + 1)}}>»</div>;
    const first = <div className="pageBtn navArrow" onClick={() => {this.goToPage(1)}}>1</div>;
    const last = <div className="pageBtn navArrow" onClick={() => {this.goToPage(lastPage)}}>{lastPage}</div>;
    const buttons = [];

    if (page > 1) {
      buttons.push(back);
    }

    buttons.push(first);

    if (page < 3) {
      buttons.push(<div className="pageBtn navArrow" onClick={() => {this.goToPage(2)}}>2</div>);
      buttons.push(<div className="pageBtn navArrow" onClick={() => {this.goToPage(3)}}>3</div>);
    }

    if (page > 4) {
      buttons.push(<div className="pageBtn">...</div>);
    }

    if (page >= 3 && page < lastPage - 3) {
      for (let i = page - 1; i <= page + 1; i += 1) {
        buttons.push(<div className="pageBtn navArrow" onClick={() => {this.goToPage(i)}}>{i}</div>);
      }
    }

    if (page < lastPage - 3) {
      buttons.push(<div className="pageBtn">...</div>);
    }

    if (page >= lastPage - 3) {
      buttons.push(<div className="pageBtn navArrow" onClick={() => {this.goToPage(lastPage - 2)}}>{lastPage - 2}</div>);
      buttons.push(<div className="pageBtn navArrow" onClick={() => {this.goToPage(lastPage - 1)}}>{lastPage - 1}</div>);
    }

    buttons.push(last);

    if (page < lastPage) {
      buttons.push(forward);
    }

    return buttons;
  }

  render() {
    const { reviewsToDisplay } = this.state;
    const { searchValue } = this.state;
    const { page } = this.state;
    const { reviewQty } = this.props;
    const lastPage = Math.floor(reviewQty / 7);

    return (
      <div>
        <div id="sorting">
          <form className="searchBar" onSubmit={this.onSearch}>
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
        </div>
        {/* <div id="searchSummary">
          <p>{reviewQty} guests have mentioned "{searchValue}"</p>
        </div> */}
        <div>
          {Array.isArray(reviewsToDisplay) ? (
            reviewsToDisplay.map((review, index) => <ReviewItem review={review} id={index} />)
          ) : (
            <p>reviews loading...</p>
          )}
        </div>
        <div id="pagination">{this.renderPaginationButtons()}</div>
      </div>
    );
  }
}

export default ReviewList;
