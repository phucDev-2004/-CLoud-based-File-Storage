'use client';
import { motion } from 'framer-motion';
import JustValidate from 'just-validate';
import { Cloud, User, Mail, Lock, UserRoundPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12, // mỗi field hiện cách nhau 0.12s
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
export const FormRegister = () => {
  const router = useRouter();
  useEffect(() => {
    const validator = new JustValidate('#registerForm');

    validator
      .addField('#fullName', [
        {
          rule: 'required',
          errorMessage: 'Vui lòng nhập họ tên!',
        },
        {
          rule: 'minLength',
          value: 5,
          errorMessage: 'Họ tên phải có ít nhất 5 ký tự!',
        },
        {
          rule: 'maxLength',
          value: 50,
          errorMessage: 'Họ tên không được vượt quá 50 ký tự!',
        },
      ])
      .addField('#userName', [
        { rule: 'required', errorMessage: 'Vui lòng nhập username!' },
        { rule: 'minLength', value: 4 },
      ])

      .addField('#email', [
        {
          rule: 'required',
          errorMessage: 'Vui lòng nhập email của bạn!',
        },
        {
          rule: 'email',
          errorMessage: 'Email không đúng định dạng!',
        },
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
      //   .addField('#confirmPassword', [
      //     {
      //       validator: (value: any, fields: any) => {
      //         return value === fields['#password'].elem.value;
      //       },
      //       errorMessage: 'Mật khẩu xác nhận không khớp!',
      //     },
      //   ])

      .onSuccess((event: any) => {
        const fullName = event.target.fullName.value;
        const userName = event.target.userName.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        // console.log(fullName, email, password);

        const dataFinal = {
          full_name: fullName,
          user_name: userName,
          email: email,
          password: password,
        };

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataFinal),
        })
          .then((res) => res.json())
          .then((res: any) => {
            if (res.success === false) {
              toast.error(res.message || 'Đăng ký thất bại!');
              return;
            }

            if (res.success === true) {
              router.push('/auth/login');
            }
          });
      });
  }, []);
  return (
    <>
      <motion.form id="registerForm" variants={container} className="space-y-4">
        <motion.div variants={item} className="relative">
          <User className="absolute left-3 top-3 text-white/60" size={18} />
          <input
            placeholder="Full name"
            id="fullName"
            name="fullName"
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </motion.div>
        <motion.div variants={item} className="relative">
          <UserRoundPlus
            className="absolute left-3 top-3 text-white/60"
            size={18}
          />
          <input
            placeholder="Username"
            id="userName"
            name="userName"
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </motion.div>

        <motion.div variants={item} className="relative">
          <Mail className="absolute left-3 top-3 text-white/60" size={18} />
          <input
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </motion.div>

        <motion.div variants={item} className="relative">
          <Lock className="absolute left-3 top-3 text-white/60" size={18} />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </motion.div>

        <motion.div variants={item} className="relative">
          <Lock className="absolute left-3 top-3 text-white/60" size={18} />
          <input
            type="password"
            placeholder="Confirm password"
            id="confirmPassword"
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </motion.div>

        <motion.button
          variants={item}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold shadow-lg"
        >
          Create Account
        </motion.button>
      </motion.form>
    </>
  );
};
