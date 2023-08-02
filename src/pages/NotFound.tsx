import { Link } from 'react-router-dom';

//---------------------------------------------------------------------------------

const NotFound = () => {
  return (
    <div className="p-1">
      <h1 className="text-3xl">404 Not Found</h1>
      <Link to="/" className="text-blue-500 underline">
        Back home
      </Link>
    </div>
  );
};

export default NotFound;
