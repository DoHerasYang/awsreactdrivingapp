/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserinfo = /* GraphQL */ `
  query GetUserinfo($id: ID!) {
    getUserinfo(id: $id) {
      id
      account
      title
      firstname
      lastname
      agegroup
      ethnicity
      postcode
      date_of_birth
      email
      driving_period
      commuting_behavior
      createdAt
      updatedAt
    }
  }
`;
export const listUserinfos = /* GraphQL */ `
  query ListUserinfos(
    $filter: ModeluserinfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserinfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        account
        title
        firstname
        lastname
        agegroup
        ethnicity
        postcode
        date_of_birth
        email
        driving_period
        commuting_behavior
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUsergeoinfo = /* GraphQL */ `
  query GetUsergeoinfo($id: ID!) {
    getUsergeoinfo(id: $id) {
      id
      userid
      name
      geodetailedinfo {
        date
        lat
        lon
        speed
        distance
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsergeoinfos = /* GraphQL */ `
  query ListUsergeoinfos(
    $filter: ModelusergeoinfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsergeoinfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userid
        name
        geodetailedinfo {
          date
          lat
          lon
          speed
          distance
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
