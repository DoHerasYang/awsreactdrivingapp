/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUserinfo = /* GraphQL */ `
  mutation CreateUserinfo(
    $input: CreateUserinfoInput!
    $condition: ModeluserinfoConditionInput
  ) {
    createUserinfo(input: $input, condition: $condition) {
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
export const updateUserinfo = /* GraphQL */ `
  mutation UpdateUserinfo(
    $input: UpdateUserinfoInput!
    $condition: ModeluserinfoConditionInput
  ) {
    updateUserinfo(input: $input, condition: $condition) {
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
export const deleteUserinfo = /* GraphQL */ `
  mutation DeleteUserinfo(
    $input: DeleteUserinfoInput!
    $condition: ModeluserinfoConditionInput
  ) {
    deleteUserinfo(input: $input, condition: $condition) {
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
export const createUsergeoinfo = /* GraphQL */ `
  mutation CreateUsergeoinfo(
    $input: CreateUsergeoinfoInput!
    $condition: ModelusergeoinfoConditionInput
  ) {
    createUsergeoinfo(input: $input, condition: $condition) {
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
export const updateUsergeoinfo = /* GraphQL */ `
  mutation UpdateUsergeoinfo(
    $input: UpdateUsergeoinfoInput!
    $condition: ModelusergeoinfoConditionInput
  ) {
    updateUsergeoinfo(input: $input, condition: $condition) {
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
export const deleteUsergeoinfo = /* GraphQL */ `
  mutation DeleteUsergeoinfo(
    $input: DeleteUsergeoinfoInput!
    $condition: ModelusergeoinfoConditionInput
  ) {
    deleteUsergeoinfo(input: $input, condition: $condition) {
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
export const createGeoinfo = /* GraphQL */ `
  mutation CreateGeoinfo(
    $input: CreateGeoinfoInput!
    $condition: ModelgeoinfoConditionInput
  ) {
    createGeoinfo(input: $input, condition: $condition) {
      date
      lat
      lon
      speed
      createdAt
      updatedAt
    }
  }
`;
export const updateGeoinfo = /* GraphQL */ `
  mutation UpdateGeoinfo(
    $input: UpdateGeoinfoInput!
    $condition: ModelgeoinfoConditionInput
  ) {
    updateGeoinfo(input: $input, condition: $condition) {
      date
      lat
      lon
      speed
      createdAt
      updatedAt
    }
  }
`;
export const deleteGeoinfo = /* GraphQL */ `
  mutation DeleteGeoinfo(
    $input: DeleteGeoinfoInput!
    $condition: ModelgeoinfoConditionInput
  ) {
    deleteGeoinfo(input: $input, condition: $condition) {
      date
      lat
      lon
      speed
      createdAt
      updatedAt
    }
  }
`;
