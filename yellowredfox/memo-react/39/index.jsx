'use strict';

const Photos = ({ photo }) => {
  return (
    <figure className="thumbnail">
      <img src={photo.thumbnailUrl} alt={photo.title} className="thumbnail__img" />
      <figcaption className="thumbnail__title">{photo.title}</figcaption>
    </figure>
  );
};

const App = () => {
  const [photos, setPhotos] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [errors, setError] = React.useState(null);
  React.useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/photos?id=1`)
      .then(response => response.json())
      .then(data => {
        setPhotos(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      })
  }, []);

  return (
    <section className="section">
      <div className="container">
        {!isLoading ? (
          photos.map(photo => {
            return <Photos key={photo.id} photo={photo} />;
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </section>
  );

};

ReactDOM.render(<App />, document.getElementById("root"));
