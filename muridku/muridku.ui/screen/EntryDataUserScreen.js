/* eslint-disable prettier/prettier */
import React from 'react';
import { connect } from 'react-redux';
import EntryDataMember from './component/EntryDataMember';

const EntryDataUserScreen = (props) => {
  const { navigation } = props;
  return (
    <EntryDataMember
      navigation={navigation}
      childName="EntryDataUserScreen"
      fromKtb={false}
      returnPage="UpdateDataUserScreen"
    />
  );
};

export default connect(null)(EntryDataUserScreen);
