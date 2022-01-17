import Image from 'next/image';
import ProsCard from 'components/ProsCard';
import ConsCard from 'components/ConsCard';
import Gumroad from 'components/metrics/Gumroad';
import Unsplash from 'components/metrics/Unsplash';
import Analytics from 'components/metrics/Analytics';
import YouTube from 'components/metrics/Youtube';
import Step from 'components/Step';
import ImageWithTheme from 'components/ImageWithTheme';
import CustomLink from '@/components/CustomLink'
import CustomLinkSvg from '@/components/CustomLinkSvg'


function RoundedImage(props) {
  return <Image alt={props.alt} className="rounded-lg" {...props} />;
}

const MDXComponents = {
  Image: RoundedImage,
  ImageWithTheme,
  a: CustomLinkSvg,
  Analytics,
  ConsCard,
  Gumroad,
  ProsCard,
  Step,
  Unsplash,
  YouTube
};

export default MDXComponents;
