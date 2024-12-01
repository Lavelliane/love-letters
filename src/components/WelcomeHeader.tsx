import { TypeAnimation } from 'react-type-animation';
import { Fragment } from 'react';

const WelcomeHeader = () => {
  return (
    <h1 className="text-2xl font-semibold text-primary">
      Love, {' '}
      <TypeAnimation
        sequence={[
          // Orange text for Ginger
          'Ginger',
          3000,
          '',
          1000,
          // Black text for Oreo
          'Oreo',
          3000,
          '',
          1000,
        ]}
        wrapper='span'
        cursor={true}
        repeat={Infinity}
        speed={30}
      />
    </h1>
  );
};

export default WelcomeHeader;