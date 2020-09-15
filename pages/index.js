import {useState} from 'react';

import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import Header from '../components/Header';
import nodeFetch from 'node-fetch';

const  App = ({ robots }) => {
  const [searchField, setSearchField] = useState('');

  const onSearchChange = (event) =>{
    setSearchField(event.target.value);
  }
  
  const isPending = (robots.length > 0)? false : true;

    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    })
    return (
      <div className='tc'>
        <Header />
        <SearchBox searchChange={onSearchChange}/>
        <Scroll>
          { isPending ? <h1 id="loading-robots">Loading</h1> :
            <ErrorBoundry>
              <CardList robots={filteredRobots} />
            </ErrorBoundry>
          }
        </Scroll>
      </div>
    );
}

export async function getStaticProps(){
  let robots;
  try{
    const res = await nodeFetch('https://jsonplaceholder.typicode.com/users');
    robots = await res.json();
  } catch (err) {
    robots = []
  }
  if(!robots.length){
    robots = [];
  }
  return {
    props:{
      robots
    }
  }
}

export default App;
