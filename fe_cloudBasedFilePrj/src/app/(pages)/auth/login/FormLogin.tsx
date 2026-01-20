'use client';
import { motion } from 'framer-motion';
import JustValidate from 'just-validate';
import { Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
export const FormLogin = () => {
  const router = useRouter();
  useEffect(() => {
    const validator = new JustValidate('#loginForm');

    validator
      .addField('#userName', [
        { rule: 'required', errorMessage: 'Vui lòng nhập username!' },
        { rule: 'minLength', value: 4 },
      ])
      .addField('#password', [
        {
          rule: 'required',
          errorMessage: 'Vui lòng nhập mật khẩu!',
        },
        {
          validator: (value: string) => value.length >= 8,
          errorMessage: 'Mật khẩu phải chứa ít nhất 8 ký tự!',
        },
        {
          validator: (value: string) => /[A-Z]/.test(value),
          errorMessage: 'Mật khẩu phải chứa ít nhất một chữ cái in hoa!',
        },
        {
          validator: (value: string) => /[a-z]/.test(value),
          errorMessage: 'Mật khẩu phải chứa ít nhất một chữ cái thường!',
        },
        {
          validator: (value: string) => /\d/.test(value),
          errorMessage: 'Mật khẩu phải chứa ít nhất một chữ số!',
        },
        {
          validator: (value: string) => /[@$!%*?&]/.test(value),
          errorMessage: 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt!',
        },
      ])
      .onSuccess((event: any) => {
        const userName = event.target.userName.value;
        const password = event.target.password.value;

        const dataFinal = {
          user_name: userName,
          password: password,
        };

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataFinal),
          credentials: 'include', // Giữ cookie
        })
          .then((res) => res.json())
          .then((res) => {
            // console.log(res);
            if (res.success === false) {
              toast.error(res.message);
              return;
            }

            if (res.success === true) {
              router.push('/dashboard');
              cookieStore.set('access_token', res.tokens.access_token);
            }
          });
      });
  }, []);
  return (
    <>
      {' '}
      <form id="loginForm" className="space-y-4">
        <input
          placeholder="Username"
          id="userName"
          name="userName"
          className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <div className="relative">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <Lock className="absolute right-3 top-3 text-white/60" size={18} />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold shadow-lg"
        >
          Login
        </motion.button>
      </form>
    </>
  );
};
