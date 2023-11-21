import request from '../common/Requestor'
import {
    useAuthenticator,
    Collection,
    Card,
    Expander,
    ExpanderItem,
    Button,
    Flex,
    Text,
    Alert
  } from '@aws-amplify/ui-react';
  import '@aws-amplify/ui-react/styles.css';
  import { useState, useEffect } from 'react';
  import './../App.css';
  import { useParams } from 'react-router';


  export default function ListStoreManagers() {

    const { user } = useAuthenticator((context) => [context.user]);
    let { storeId } = useParams();
    const [storeManagers, setStoreManagers] = useState(undefined);
    async function loadAndSetStoreManagers() {
        const storeManagerResult = await request( '/store_manager', 'GET', storeId);
        setStoreManagers(storeManagerResult);
    }

    useEffect(() => {
        loadAndSetStoreManagers();
    });
      
    let storeManagerContent = <p>loading...</p>;
    if (Array.isArray(storeManagers)) {
        const items = storeManagers.map(storeManagerStr => ({title: storeManagerStr}));
        storeManagerContent = (
        <Collection type="list" items={items} gap="1.5rem">
            {(item, index) => (
            <Card key={index} padding="0.1rem" textAlign={'left'}>
                <Text>{item.title}</Text>
            </Card>
            )}
        </Collection>
        );
    } else if (typeof storeManagers === 'string'){
        storeManagerContent = (
        <Alert
            variation={'error'}
            isDismissible={true}
            heading='Not Authorized'
            >
            User {user.username} un-authorized to access listing store managers in store {storeId}
        </Alert>
        );
    } else {
        storeManagerContent = (
        <Alert
            variation={'error'}
            isDismissible={true}
            heading='Something went wrong'
            >
        Error: {storeManagers}
        </Alert>
        );
    }
    
    return (
        <div>
            <header align='left'> <h4>Store Manager</h4></header>
              <Flex gap={'1.25rem'} direction={'column'}>
                <Expander marginBottom={'1rem'}>
                  <ExpanderItem title="Store Managers" value="expander-item">
                    {storeManagerContent}
                  </ExpanderItem>
                </Expander>
                <Button onClick={loadAndSetStoreManagers} >Refresh Store Managers  </Button> <br/>
              </Flex>
        </div>
    );
  }