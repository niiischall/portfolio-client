import React, { useContext } from 'react';

import './style.css';
import { PortfolioContext } from '../../utils/hooks/useContext';

export interface TalksProps {}

const Talks: React.FC<TalksProps> = () => {
  const { talks } = useContext(PortfolioContext) ?? [];
  const { data } = talks ?? {};

  console.log('talks: ', data);
  return <div id="talks">{null}</div>;
};

export default Talks;
