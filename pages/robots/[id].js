import Link from 'next/link';
import nodeFetch from 'node-fetch';
import Card from '../../components/Card'; 
import Header from '../../components/Header';

const robotPage = ({id, name, email}) => {
    return (
        <div className="tc">
            <Header />
            <div>
            <Link href="/">
                <button>&#x2B05;</button>
            </Link>
            </div>
           <Card name={name} id={id} email={email} />
        </div>
    )
}

export default robotPage;

export async function getStaticPaths () {
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
  let robotPaths = []
  if(!!robots.length){
    robotPaths = robots.map(rob =>{
        return {
            params: {
                id: rob.id.toString()
            }
        }
    })
  }

  
    return {
        paths: robotPaths,
        fallback: false
    }
}

export async function getStaticProps ({params}) {
    let robot;
    try{
      const res = await nodeFetch(`https://jsonplaceholder.typicode.com/users/${params.id}`);
      robot = await res.json();
    } catch (err) {
      robot = {}
    }

    return {
        props: {
            id: robot.id,
            name: robot.name,
            email: robot.email
        }
    }

}