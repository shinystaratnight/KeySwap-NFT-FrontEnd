import React from 'react';

function ProcessCard(props) {
    const {title, content, thumb} = props;
  
    return (
        <div className="nft-item">
            <div className="nft-inner">
                <div className="nft-thumb">
                    <img src={thumb} alt="nft-img" />
                </div>
                <div className="nft-content">
                    <div className="author-details">
                        <h4>{title}</h4>
                        <p>{content}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProcessCard;
