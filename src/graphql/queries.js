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
      firstname
      lastname
      geoinfo {
        date
        lat
        lon
        speed
        createdAt
        updatedAt
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
        firstname
        lastname
        geoinfo {
          date
          lat
          lon
          speed
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getGeoinfo = /* GraphQL */ `
  query GetGeoinfo($id: ID!) {
    getGeoinfo(id: $id) {
      date
      lat
      lon
      speed
      createdAt
      updatedAt
    }
  }
`;
export const listGeoinfos = /* GraphQL */ `
  query ListGeoinfos(
    $filter: ModelgeoinfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGeoinfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        date
        lat
        lon
        speed
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
