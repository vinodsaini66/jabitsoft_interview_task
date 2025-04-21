import { Form, Input, Button, message } from 'antd';
import { Mail, Lock } from 'lucide-react';
import { login } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';

type LoginFormValues = {
  email: string;
  password: string;
  remember?: boolean;
};

function Login() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { login: baseLogin } = useAuth();
  const navigate = useNavigate();

  const [form] = Form.useForm<LoginFormValues>();

  const handleSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await login(data.email, data.password);
      if (res?.data.token) {
        baseLogin(res.data.token, res.data.user);
        message.success('Login successfully!');
        navigate('/dashboard');
      } else {
        message.error('Something went wrong!');
      }
    } catch (error) {
      message.error('Login failed!');
    }
    setIsSubmitting(false);
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      layout="vertical"
      size="large"
      className="w-full max-w-[400px]"
    >
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
        rules={[{ required: true, message: 'Please input your password!' }]
      }
      >
        <Input.Password
          prefix={<Lock className="text-gray-400" />}
          placeholder={'Enter Password'}
        />
      </Form.Item>

      <Form.Item>
        <Button loading={isSubmitting} type="primary" htmlType="submit" block danger>
          Sign In
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Login;
