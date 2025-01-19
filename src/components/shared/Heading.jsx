

import PropTypes from 'prop-types';

const Heading = ({heading, subHeading}) => {
  return (
    <div className='flex flex-col justify-center items-center mb-8'>
      <h1 className="text-2xl lg:text-4xl text-white font-bold text-center">{heading|| ""}</h1>
      <p className="text-text-muted mt-2 lg:w-[70%] text-center">{subHeading ||""}</p>
    </div>
  )
}
Heading.propTypes = {
  heading: PropTypes.string,
  subHeading: PropTypes.string
};

export default Heading


