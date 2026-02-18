import { useParams, useNavigate } from 'react-router-dom';

const FilmDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-black/90 border border-primary rounded-xl max-w-content w-full mx-8 p-6">
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-2 right-2 text-primary hover:text-accent"
        >
          ✕
        </button>
        <h2 className="text-2xl">Film Detail - ID: {id}</h2>
        <p>Coming soon...</p>
      </div>
    </div>
  );
};

export default FilmDetail;