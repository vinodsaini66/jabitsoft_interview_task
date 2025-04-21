import React from 'react';
import { Result, Button, ResultProps } from 'antd';
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  InfoCircleTwoTone,
} from '@ant-design/icons';
import { DynamicConfirmationProps } from '../../types/common';

const statusIcons: Record<string, React.ReactNode> = {
  success: <CheckCircleTwoTone twoToneColor="#52c41a" />,
  error: <CloseCircleTwoTone twoToneColor="#ff4d4f" />,
  info: <InfoCircleTwoTone twoToneColor="#1890ff" />,
  warning: <InfoCircleTwoTone twoToneColor="#faad14" />,
};

const DynamicConfirmation: React.FC<DynamicConfirmationProps> = ({
  status = 'info',
  title = 'Status',
  subTitle = 'Additional information goes here.',
  buttonText = 'Back to Login',
  hideButton = false,
  onButtonClick,
  customIcon,
}) => {
  return (
    <div className="flex justify-center items-center px-4">
      <Result
        status={status as ResultProps['status']}
        icon={customIcon ?? statusIcons[status]}
        title={title}
        subTitle={subTitle}
        extra={
          !hideButton && (
            <Button type={'primary'} onClick={onButtonClick}>
              {buttonText}
            </Button>
          )
        }
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md"
      />
    </div>
  );
};

export default DynamicConfirmation;
