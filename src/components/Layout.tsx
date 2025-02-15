import { Routes, Route } from 'react-router-dom';

import Navigation from '../sections/Navigation';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Work from '../sections/Work';
import Experiments from '../sections/Experiments';
import Writings from '../sections/Writings';
import Contact from '../sections/Contact';
import Talks from '../sections/Talks';

import { useSanityData } from '../lib/sanity-client';

export const Layout = () => {
  const { data, isLoading, isError } = useSanityData();

  if (isLoading || isError) {
    return null;
  }

  return (
    <>
      <Navigation data={data?.navigation} hero={data?.hero} />
      <Routes>
        <Route path="/" Component={() => <Hero data={data?.hero} />} />
        <Route path="/about" Component={() => <About data={data?.about} />} />
        <Route path="/work" Component={() => <Work data={data?.work} />} />
        <Route path="/experiments" Component={() => <Experiments data={data?.experiments} />} />
        <Route path="/writings" Component={() => <Writings data={data?.writings} />} />
        <Route path="/talks" Component={() => <Talks data={data?.talks} />} />
        <Route path="/contact" Component={() => <Contact data={data?.contact} />} />
      </Routes>
    </>
  );
};

export default Layout;
