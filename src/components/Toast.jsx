function Toast({ notification }) {
  if (!notification) return null;

  return (
    <div
      className={`fixed right-4 top-20 z-50 rounded-lg p-3 text-white shadow-lg transition-transform duration-300 ${
        notification.type === "add" ? "bg-green-500" : "bg-red-500"
      }`}
      style={{ zIndex: 9999 }}
    >
      {notification.message}
    </div>
  );
}

export default Toast;
