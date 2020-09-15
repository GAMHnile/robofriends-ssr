import Card from './Card';
import Link from 'next/link';


const CardList = ({ robots }) => {
  return (
    <div>
      {
        robots.map((user, i) => {
          return (
            <Link key={i} href="/robots/[id]" as={`/robots/${user.id}`} >
              <a >
            <Card
              id={robots[i].id}
              name={robots[i].name}
              email={robots[i].email}
              />
              </a>
              </Link>
          );
        })
      }
    </div>
  );
}

export default CardList;