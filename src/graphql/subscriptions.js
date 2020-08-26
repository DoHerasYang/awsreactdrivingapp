/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUserinfo = /* GraphQL */ `
  subscription OnCreateUserinfo {
    onCreateUserinfo {
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
export const onUpdateUserinfo = /* GraphQL */ `
  subscription OnUpdateUserinfo {
    onUpdateUserinfo {
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
export const onDeleteUserinfo = /* GraphQL */ `
  subscription OnDeleteUserinfo {
    onDeleteUserinfo {
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
export const onCreateUsergeoinfo = /* GraphQL */ `
  subscription OnCreateUsergeoinfo {
    onCreateUsergeoinfo {
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
export const onUpdateUsergeoinfo = /* GraphQL */ `
  subscription OnUpdateUsergeoinfo {
    onUpdateUsergeoinfo {
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
export const onDeleteUsergeoinfo = /* GraphQL */ `
  subscription OnDeleteUsergeoinfo {
    onDeleteUsergeoinfo {
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
export const onCreateGeoinfo = /* GraphQL */ `
  subscription OnCreateGeoinfo {
    onCreateGeoinfo {
      date
      lat
      lon
      speed
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateGeoinfo = /* GraphQL */ `
  subscription OnUpdateGeoinfo {
    onUpdateGeoinfo {
      date
      lat
      lon
      speed
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteGeoinfo = /* GraphQL */ `
  subscription OnDeleteGeoinfo {
    onDeleteGeoinfo {
      date
      lat
      lon
      speed
      createdAt
      updatedAt
    }
  }
`;
