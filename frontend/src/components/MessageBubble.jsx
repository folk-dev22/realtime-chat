export default function MessageBubble({ message, isOwn }) {
  const getAvatar = (name) => name ? name.charAt(0).toUpperCase() : '?';

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4 gap-2`}>
      
      {/* Avatar ฝั่งซ้าย (คนอื่น) */}
      {!isOwn && (
        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-1">
          {getAvatar(message.sender?.username)}
        </div>
      )}

      <div className={`max-w-xs lg:max-w-md`}>
        {/* ชื่อผู้ส่ง */}
        {!isOwn && (
          <p className="text-xs text-gray-400 mb-1 ml-1">
            {message.sender?.username}
          </p>
        )}

        {/* ข้อความ */}
        <div className={`px-4 py-2.5 rounded-2xl ${
          isOwn
            ? 'bg-indigo-600 text-white rounded-tr-sm'
            : 'bg-gray-700 text-gray-100 rounded-tl-sm'
        }`}>
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>

        {/* เวลา */}
        <p className={`text-xs text-gray-500 mt-1 ${isOwn ? 'text-right' : 'text-left'} mx-1`}>
          {new Date(message.createdAt).toLocaleTimeString('th-TH', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </div>

      {/* Avatar ฝั่งขวา (ตัวเอง) */}
      {isOwn && (
        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-1">
          {getAvatar(message.sender?.username)}
        </div>
      )}
    </div>
  );
}