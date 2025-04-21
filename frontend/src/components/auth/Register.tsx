import { Button, Typography, message, Form, Input } from 'antd';
import { Mail, Lock } from 'lucide-react';
import { register } from '../../services/auth';
import { RuleObject } from 'antd/es/form';
import { StoreValue } from 'antd/es/form/interface';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type RegisterFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  name?: string;
};

function Register() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [form] = Form.useForm<RegisterFormValues>();
  const navigate = useNavigate();

  const handleSubmit = async (data: RegisterFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await register(data.email, data.password, data.name);
      if (res.data) {
        message.success('Registration successful!');
        message.info('Redirecting to dashboard page in 2 seconds...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        message.error(res.error || 'Something went wrong!');
      }
    } catch (err) {
      message.error('Registration failed.');
    }
    setIsSubmitting(false);
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      size="large"
      className="w-full max-w-md"
    >
      <Typography.Title level={3} className="mb-4 text-center">
        Register
      </Typography.Title>

      <Form.Item
        name="name"
        rules={[
          { required: true, message: 'Please input your name!' },
         
        ]}
      >
        <Input
          prefix={<Mail className="text-gray-400" />}
          placeholder={'Enter Name'}
        />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[
          { required: true, message: 'Please input your email!' },
          { type: 'email', message: 'Please enter a valid email!' },
        ]}
      >
        <Input
          prefix={<Mail className="text-gray-400" />}
          placeholder={'Enter Email'}
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          { required: true, message: 'Please input your password!' },
          { min: 6, message: 'Password must be at least 6 characters!' },
          { max: 20, message: 'Password cannot exceed 20 characters!' },
          {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/,
            message:
              'Password must contain at least one uppercase letter, one lowercase letter, and one number!',
          },

        ]}
      >
        <Input.Password
          prefix={<Lock className="text-gray-400" />}
          placeholder={'Enter Password'}
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        dependencies={['password']}
        rules={[
          { required: true, message: 'Please confirm your password!' },
          ({ getFieldValue }) => ({
            validator(_: RuleObject, value: StoreValue) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('Passwords do not match!');
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<Lock className="text-gray-400" />}
          placeholder={'Enter Password Again'}
        />
      </Form.Item>


      <Form.Item>
        <Button loading={isSubmitting} type="primary" htmlType="submit" block danger>
          Register
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Register;
