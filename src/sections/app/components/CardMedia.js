import PropTypes from 'prop-types';

function CardMedia({ image }) {
  return (
    <div className="card-media">
      {typeof image === 'string' ? <img src={image} alt="card media" /> : <img src={image.src} alt={image.alt} />}
    </div>
  );
}

CardMedia.propTypes = {
  image: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    }),
  ]).isRequired,
};

export default CardMedia;
