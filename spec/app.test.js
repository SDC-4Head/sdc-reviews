import query from '../db/querys';

describe('Server-side sorting functions', () => {
  test('Should sort reviews by Most Relevant', () => {
    const relevanceData = [{ relevance: 2 }, { relevance: 4 }, { relevance: 9 }];

    expect.assertions(1);
    return query.sortByRelevant(relevanceData).then(sortedReviews => {
      expect(sortedReviews).toEqual([{ relevance: 9 }, { relevance: 4 }, { relevance: 2 }]);
    });
  });

  test('Should sort reviews by Most Recent', () => {
    const recentData = [
      { dateStayed: 'Wed May 16 2018 20:13:58 GMT-0700 (Pacific Daylight Time)' },
      { dateStayed: 'Wed Feb 14 2004 20:13:58 GMT-0700 (Pacific Daylight Time)' },
      { dateStayed: 'Wed Jan 1 2014 20:13:58 GMT-0700 (Pacific Daylight Time)' }
    ];

    expect.assertions(1);
    return query.sortByRecent(recentData).then(sortedReviews => {
      expect(sortedReviews).toEqual([
        { dateStayed: 'Wed May 16 2018 20:13:58 GMT-0700 (Pacific Daylight Time)' },
        { dateStayed: 'Wed Jan 1 2014 20:13:58 GMT-0700 (Pacific Daylight Time)' },
        { dateStayed: 'Wed Feb 14 2004 20:13:58 GMT-0700 (Pacific Daylight Time)' }
      ]);
    });
  });

  test('Should properly paginate all reviews', () => {
    const allReviews = [
      { review: 1 },
      { review: 2 },
      { review: 3 },
      { review: 4 },
      { review: 5 },
      { review: 6 },
      { review: 7 },
      { review: 8 },
      { review: 9 },
      { review: 10 },
      { review: 11 },
      { review: 12 },
      { review: 13 },
      { review: 14 },
      { review: 15 },
      { review: 16 },
      { review: 17 }
    ];

    expect.assertions(1);
    return query.getPage(2, allReviews).then(page => {
      expect(page).toEqual([
        { review: 8 },
        { review: 9 },
        { review: 10 },
        { review: 11 },
        { review: 12 },
        { review: 13 },
        { review: 14 }
      ]);
    });
  });

  test('Should return reviews with a specified search term', () => {
    const reviewData = [
      { review: [{ body: 'the quick brown fox jumped over the lazy dog' }] },
      { review: [{ body: 'the quick brown fox jumped over the lazy cat' }] },
      { review: [{ body: 'the quick brown fox jumped over the lazy iguana' }] },
      { review: [{ body: 'the quick brown fox jumped over the lazy llama' }] }
    ];

    expect.assertions(1);
    return query.getBySearchTerm(reviewData, 'llama').then(sortedReviews => {
      expect(sortedReviews).toEqual([
        { review: [{ body: 'the quick brown fox jumped over the lazy llama' }] }
      ]);
    });
  });

  test('Should calculate the overall ratings of a given room', () => {
    const reviewData = [
      {
        review: [
          {
            accuracy: 4.5,
            communication: 1,
            cleanliness: 2,
            location: 4,
            checkin: 2.5,
            value: 3
          }
        ]
      },
      {
        review: [
          {
            accuracy: 3,
            communication: 2.5,
            cleanliness: 2,
            location: 4.5,
            checkin: 5,
            value: 3.5
          }
        ]
      },
      {
        review: [
          {
            accuracy: 2.5,
            communication: 3,
            cleanliness: 2.5,
            location: 1,
            checkin: 5,
            value: 1.5
          }
        ]
      }
    ];
    query.getBySearchTerm(reviewData, 'llama').then(sortedReviews => {
      expect(sortedReviews).toEqual([
        {
          quantity: 3,
          overall: 3.5,
          accuracy: 3.5,
          communication: 2,
          cleanliness: 2,
          location: 3,
          checkin: 4,
          value: 2.5
        }
      ]);
    });
  });
});
