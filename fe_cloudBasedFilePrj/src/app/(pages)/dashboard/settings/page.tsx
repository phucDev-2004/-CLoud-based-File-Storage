export default function SettingsPage() {
  return (
    <>
      <div className="max-w-xl space-y-6 text-white">
        <h1 className="text-3xl font-bold">Cài đặt mật khẩu</h1>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6 space-y-4">
          <input
            type="password"
            placeholder="Mật khẩu hiện tại"
            className="w-full px-4 py-3 rounded-lg bg-white/20 outline-none"
          />
          <input
            type="password"
            placeholder="Mật khẩu mới"
            className="w-full px-4 py-3 rounded-lg bg-white/20 outline-none"
          />
          <input
            type="password"
            placeholder="Xác nhận mật khẩu mới"
            className="w-full px-4 py-3 rounded-lg bg-white/20 outline-none"
          />
          <button className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold">
            Cập nhật mật khẩu
          </button>
        </div>
      </div>
    </>
  );
}
