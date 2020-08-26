import Amplify from '@aws-amplify/core'
import API, { graphqlOperation } from '@aws-amplify/api'
import awsconfig from '../../aws-exports';
Amplify.configure(awsconfig);

// Create the mutation function
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

export async function Query_UserName(cur_account){
    try {
        const gql = await API.graphql(graphqlOperation(listName));
        return gql.data.listUserinfos.items
    }catch (e) {
        console.log(e);
    }
}
