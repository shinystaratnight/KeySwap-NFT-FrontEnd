import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel';
import './index.scss';
import '@brainhubeu/react-carousel/lib/style.css';

import Trendings from './Trendings.json';
import TrendingCollectionItem from './TrendingCollectionItem';
export default function TrendingCollections() {
  return (
    <div className="trending-collections">
      <h3 className="text-center title-font">trending Collections</h3>
      <Carousel
        plugins={[
          {
            resolve: slidesToShowPlugin,
            options: {
              numberOfSlides: 2,
            },
          },
        ]}
      >
        {Trendings.map(trending => (
          <TrendingCollectionItem title={trending.title} info={trending.info} image={trending.image} />
        ))}
      </Carousel>
    </div>
  );
}
