import React, { useEffect } from 'react';
import { Button } from 'semantic-ui-react';

// Required for email sending
// import { toast } from 'react-toastify';
// import { Toast } from '@plone/volto/components';
// import { useSelector } from 'react-redux';

const SubmitView = (props) => {
  // const { loaded, error } = useSelector((state) => ({
  //   loaded: state.emailNotification.emailSend.loaded,
  //   error: state.emailNotification.emailSend.error,
  // }));
  // useEffect(() => {
  //   toast.success(<Toast success title="Success" content="Email Sent" />);
  // }, [loaded]);
  return (
    <>
      <div>
        <Button
          primary
          className="submit-block-button view"
          onClick={() => props.onSubmit(props.data.email)}
        >
          {props.data.submit}
        </Button>
      </div>
    </>
  );
};

export default SubmitView;
