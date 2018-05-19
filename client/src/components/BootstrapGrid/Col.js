import React from 'react'

const Col = ({children, size, span = 12, offset}) => {
  let className = size ? `col-${size}-${span}` : `col-${span}`;

  className = offset ? `${className} offset-${offset}` : className;

  return (
    <div className={className}>
      {children}
    </div>
  );
}

export default Col;