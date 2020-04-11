import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AppMenuItem = (props) => {
  const {
    url,
    iconName,
    caption,
    location
  } = props;

  var className = 'menu-item';
  var isActive = false;
  if (location.pathname === url) {
    className += ' menu-item-active';
    isActive = true;
  }

  return (
    <React.Fragment>
      <li className={className}>
        <Link to={url} className="d-flex justify-content-between">
          <span>
            <FontAwesomeIcon icon={['fal',iconName]} className="mt-1 mr-3"/>
            {caption}
          </span>
          { isActive && (
            <FontAwesomeIcon icon={['fal','chevron-right']} className="mt-1 text-primary"/>
          )}
        </Link>
      </li>
    </React.Fragment>
  );
}

export default AppMenuItem;
