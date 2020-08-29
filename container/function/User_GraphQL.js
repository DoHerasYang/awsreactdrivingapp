import Amplify from '@aws-amplify/core'
import API, { graphqlOperation } from '@aws-amplify/api'
import awsconfig from '../../aws-exports';
Amplify.configure(awsconfig);

// Query the remote database
const listName = `
  query {
    listUserinfos{
      items{
        id
        account
        firstname
        lastname
      }
    }
 }
`

const uploadGeo = `
  mutation CreateUsergeoinfo(
    $input: CreateUsergeoinfoInput!
    $condition: ModelusergeoinfoConditionInput
  ) {
    createUsergeoinfo(input: $input, condition: $condition) {
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
`

// Mutation the New data to remote server
export async function Query_UserName(cur_account){
    try {
        const gql = await API.graphql(graphqlOperation(listName));
        return gql.data.listUserinfos.items
    }catch (e) {
        console.log(e);
    }
}

export async function Mutation_GEO(info) {
    try{
        const gql = await API.graphql(graphqlOperation(uploadGeo,{input:info}));
        console.log("Successfully!");
    }catch (e) {
        console.log(e);
    }
}
