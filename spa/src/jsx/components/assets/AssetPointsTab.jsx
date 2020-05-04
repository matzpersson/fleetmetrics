import React from 'react';
import { 
  Table,
  TabPane,
  Button
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import AssetPointsTable from './AssetPointsTable';

const AssetPointsTab = (props) => {
  const {
    asset,
    tabId,
    currentUser,
    onDeletePoint
  } = props;

  const canCreate = currentUser.permissions.find(permission => permission.tag === 'postAssets') || false;

  const baseUrl = `/asset/${asset._id}/points`;
  const newLink = `${baseUrl}/new`

  return (
    <React.Fragment>
      <TabPane tabId={tabId} className="mb-2 p-3">
        { canCreate && (
          <div className="d-flex justify-content-end">
            <Link to={newLink} exact={false}>
              <Button size="sm" color="success" >Add Gauge</Button>
            </Link>
          </div>
        )}
        <AssetPointsTable asset={asset} currentUser={currentUser} onDeletePoint={onDeletePoint} />
      </TabPane>
    </React.Fragment>
  );
}

export default AssetPointsTab;
