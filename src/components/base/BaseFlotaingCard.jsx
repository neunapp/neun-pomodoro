import './BaseFlotaingCard.scss'

function BaseFlotaingCard(props) {
  return ( 
    <div className="flotaing-card">
      <div className="flotaing-card__body">
        {props.children}
      </div>
    </div>

  );
}

export default BaseFlotaingCard;