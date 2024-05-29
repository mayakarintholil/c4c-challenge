import React from 'react';

/*
  A block for a single partner, containing information for them
  along with any tools to manage said information
*/

function PartnerTile({ partnerData }) {

  return (
    <div className="partner-tile">
      <img className="partner-thumbnail" src='' />
      <hr />
      <div className="partner-info">
        This is some placeholder content - you'll need to replace the content here with actual partner information.
      </div>
    </div>
  )
}

export default PartnerTile;