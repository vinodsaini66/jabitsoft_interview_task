import React, { useEffect } from 'react'
import { getUser } from '../services/auth';
import { message } from 'antd';

function Dashboard() { 
 
  const [user, setUser] = React.useState<any>(null);

  const getData = async () => {
    
    try {
      const res = await getUser();
      if (res?.data) {
        setUser(res.data.user);
      } else {
        message.error('Something went wrong!');
      }
    } catch (error) {
      message.error('Login failed!');
    }
   
  }; 

  useEffect(() => {
    getData();
  }, []);

  return (
    <h3 className='text-white h2'>{user?.name}  successfully logged in !</h3>
  )
}

export default Dashboard