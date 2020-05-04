import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AppFilterItem = (props) => {
  const {
    caption,
    enabled,
    filterAction,
    id
  } = props;

  var className = 'menu-item text-success';
  var iconName = 'check';
  if (!enabled) {
    iconName = 'circle';
    className = 'menu-item text-secondary';
  }

  return (
    <React.Fragment>
      <li className={className} onClick={() => filterAction(id)}>
            <FontAwesomeIcon icon={['fal', iconName]} className="mt-1 mr-3"/>
            {caption}
      </li>
    </React.Fragment>
  );
}

export default AppFilterItem;
