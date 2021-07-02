/* eslint-disable prettier/prettier */
import React from 'react';
import { connect } from 'react-redux';
import EntryDataMember from './component/EntryDataMember';

const EntryDataAKKScreen = (props) => {
  const { navigation } = props;
  return (
    <EntryDataMember
      navigation={navigation}
      childName="EntryDataAKKScreen"
      fromKtb={true}
    />
  );
};

export default connect(null)(EntryDataAKKScreen);
