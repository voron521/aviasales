import './loaderAllTickets.css';

import { Alert, Flex, Spin } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { LoadingOutlined } from '@ant-design/icons';
// eslint-disable-next-line no-unused-vars
import React from 'react';

function LoaderAllTickets() {
  const contentStyle = {
    padding: 50,
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
  };
  const content = <div style={contentStyle} />;
  return (
    <div className='loader_all_tickets' >
      <Flex gap="small" vertical>
      <Flex gap="small">
        {/* <Spin tip="Loading" size="small">
          {content}
        </Spin> */}
        {/* <Spin tip="Loading">{content}</Spin> */}
        <Spin tip="Loading" size="large">
          
          {content}
          <span>Догружаем все билеты из базы</span>
        </Spin>
      </Flex>
      {/* <Spin tip="Загружаем все билеты...">
        <Alert
          message="Alert message title"
          description="Further details about the context of this alert."
          type="info"
        />
      </Spin> */}
    </Flex>
  </div>
  );
}

export default LoaderAllTickets;
