import './loaderAllTickets.css';

import { Flex, Spin } from 'antd';

function LoaderAllTickets() {
  const contentStyle = {
    padding: 50,
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
  };
  const content = <div style={contentStyle} />;
  return (
    <div className="loader_all_tickets">
      <Flex gap="small" vertical>
        <Flex gap="small">
          <Spin tip="Loading" size="large">
            {content}
            <span>Догружаем все билеты из базы</span>
          </Spin>
        </Flex>
      </Flex>
    </div>
  );
}

export default LoaderAllTickets;
