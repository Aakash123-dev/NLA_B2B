import React from 'react';
import { useInsightsContext } from '../contexts';
import { useSmartInsightsDrawerProps } from '../hooks';
import { PasswordProtectedShare, SmartInsightsDrawer } from '../components';

export const InsightsModalsSection: React.FC = () => {
  const { state, actions } = useInsightsContext();
  const smartInsightsDrawerProps = useSmartInsightsDrawerProps();

  return (
    <>
      {state.showPasswordShare && (
        <PasswordProtectedShare onClose={() => actions.setShowPasswordShare(false)} />
      )}
      <SmartInsightsDrawer {...smartInsightsDrawerProps} />
    </>
  );
};
